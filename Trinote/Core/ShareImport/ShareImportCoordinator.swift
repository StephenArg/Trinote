import Foundation
import Observation

enum ShareImportUIPhase: Equatable {
    case idle
    case needsSignIn
    case showExplanation
    case showParentPicker
    case showCreateNote
    case importing
    case failed(String)
}

struct PendingOpenSharedNote: Equatable, Sendable {
    let noteId: String
    let title: String
    /// When set, the editor inserts this attachment chip (same as toolbar file upload).
    let attachmentIdToInsert: String?
    let attachmentTitleToInsert: String?
    /// A text note opens in the editor so the user can review and Save; an image or file note has nothing to edit,
    /// so it opens to read.
    let startInEditMode: Bool

    init(
        noteId: String,
        title: String,
        attachmentIdToInsert: String? = nil,
        attachmentTitleToInsert: String? = nil,
        startInEditMode: Bool = true
    ) {
        self.noteId = noteId
        self.title = title
        self.attachmentIdToInsert = attachmentIdToInsert
        self.attachmentTitleToInsert = attachmentTitleToInsert
        self.startInEditMode = startInEditMode
    }
}

/// The note type each kind of share became last time, chosen first the next time. Text until the user picks another.
enum SharedImportNoteTypePreference {
    static func key(for kind: SharedImportKind) -> String {
        "shareImport.noteType.\(kind.rawValue)"
    }

    static func preferred(for kind: SharedImportKind, defaults: UserDefaults = .standard) -> NoteType {
        let choices = SharedImportImporter.noteTypeChoices(for: kind)
        guard let raw = defaults.string(forKey: key(for: kind)),
              let type = NoteType(rawValue: raw),
              choices.contains(type)
        else { return .text }
        return type
    }

    static func remember(_ type: NoteType, for kind: SharedImportKind, defaults: UserDefaults = .standard) {
        guard SharedImportImporter.noteTypeChoices(for: kind).count > 1 else { return }
        defaults.set(type.rawValue, forKey: key(for: kind))
    }
}

private final class ShareImportNoteIdRemapCapture: @unchecked Sendable {
    var remapped: String?
}

/// Coordinates inbound share-sheet imports after the Share Extension writes the App Group.
@Observable
@MainActor
final class ShareImportCoordinator {
    private(set) var phase: ShareImportUIPhase = .idle
    private(set) var pendingPackage: SharedImportPackage?
    /// Parent chosen in `ParentPickerSheet` before the new-note sheet.
    private(set) var selectedParentNoteId: String?
    /// Suggested title for the create-note sheet (from filename / content).
    private(set) var suggestedNoteTitle: String = ""
    /// Set after a successful import so the Notes tab can open the new note.
    private(set) var pendingOpenNote: PendingOpenSharedNote?
    /// Where "Add to Inbox" puts the note; nil until worked out (see `refreshInboxDestination`).
    private(set) var inboxDestination: InboxDestination?
    /// While "Add to Inbox" finds (or makes) today's journal note.
    private(set) var isPlacingInInbox = false
    /// Bumped whenever UI-relevant share-import state changes (for reliable SwiftUI refresh).
    private(set) var activationToken: Int = 0

    /// What the pending share is (a picture, a file, text), for the create sheet's choices and wording.
    var pendingKind: SharedImportKind? { pendingPackage?.payload.kind }

    /// The note types the pending share can become; the create sheet offers a choice when there's more than one.
    var noteTypeChoices: [NoteType] {
        pendingKind.map(SharedImportImporter.noteTypeChoices(for:)) ?? [.text]
    }

    /// The choice the create sheet starts on: what this kind of share became last time.
    var preferredNoteType: NoteType {
        pendingKind.map { SharedImportNoteTypePreference.preferred(for: $0) } ?? .text
    }

    private weak var appState: AppState?
    private var retryTask: Task<Void, Never>?

    func configure(appState: AppState) {
        self.appState = appState
    }

    func handleOpenURL(_ url: URL) {
        guard url.scheme == SharedImportConstants.hostURLScheme,
              url.host == SharedImportConstants.hostURLHost
        else { return }
        bumpActivation()
        beginFromPendingStoreIfPossible()
        scheduleRetriesIfNeeded()
    }

    /// Call on foreground / after auth / after launch so a leftover App Group payload is still consumed.
    func checkForPendingPayload() {
        switch phase {
        case .showExplanation, .showParentPicker, .showCreateNote, .importing:
            return
        case .idle, .needsSignIn, .failed:
            break
        }
        guard SharedImportStore.peekExists() else { return }
        beginFromPendingStoreIfPossible()
    }

    func continueFromExplanation() {
        guard phase == .showExplanation, pendingPackage != nil else { return }
        phase = .showParentPicker
        bumpActivation()
    }

    func cancel() {
        retryTask?.cancel()
        retryTask = nil
        SharedImportStore.clear()
        pendingPackage = nil
        selectedParentNoteId = nil
        suggestedNoteTitle = ""
        phase = .idle
        bumpActivation()
    }

    func parentPickerWasDismissedWithoutSelection() {
        guard phase == .showParentPicker else { return }
        cancel()
    }

    /// Works out where "Add to Inbox" goes, for its button to name.
    func refreshInboxDestination() async {
        guard let appState else { return }
        inboxDestination = await InboxDestination.resolve(appState: appState)
    }

    /// "Add to Inbox": Trilium's capture destination becomes the parent.
    func inboxDidSelect() async {
        guard phase == .showParentPicker, !isPlacingInInbox, let appState else { return }
        isPlacingInInbox = true
        defer { isPlacingInInbox = false }
        do {
            let destination: InboxDestination
            if let known = inboxDestination {
                destination = known
            } else {
                destination = await InboxDestination.resolve(appState: appState)
            }
            let parentNoteId = try await destination.parentNoteId(appState: appState)
            guard phase == .showParentPicker else { return }
            parentDidSelect(parentNoteId)
        } catch {
            phase = .failed(error.localizedDescription)
            bumpActivation()
        }
    }

    /// Parent chosen — next show the new-note naming sheet (text type only).
    func parentDidSelect(_ parentNoteId: String) {
        guard pendingPackage != nil else {
            phase = .failed(String(localized: "Shared content could not be read.", comment: "Share import error"))
            bumpActivation()
            return
        }
        selectedParentNoteId = parentNoteId
        if let package = pendingPackage {
            suggestedNoteTitle = SharedImportImporter.resolvedTitle(
                for: package.payload,
                imageData: package.binaryData
            )
        }
        phase = .showCreateNote
        bumpActivation()
    }

    func createNoteSheetWasDismissedWithoutCreating() {
        // Only cancel when the user backs out of naming — not after Create has started
        // (phase moves to `.importing`) or finished (`.idle`).
        guard phase == .showCreateNote else { return }
        cancel()
    }

    /// Call synchronously when the user taps Create so a sheet dismiss cannot cancel the import
    /// before `createNote` runs.
    func beginCreateNote() {
        guard phase == .showCreateNote, pendingPackage != nil, selectedParentNoteId != nil else { return }
        phase = .importing
        bumpActivation()
    }

    /// Creates the note under the selected parent with the shared content applied, then opens it: a text note in the
    /// editor, an image or file note to read. `requestedType` is one of `noteTypeChoices`; anything else makes a text note.
    func createNote(title rawTitle: String, as requestedType: NoteType = .text) async {
        // `beginCreateNote()` normally moves us to `.importing` first; allow a direct call too.
        if phase == .showCreateNote {
            beginCreateNote()
        }
        guard phase == .importing else {
            if phase != .needsSignIn {
                if case .failed = phase {
                    // Keep existing failure.
                } else {
                    phase = .failed(String(localized: "Shared content could not be read.", comment: "Share import error"))
                    bumpActivation()
                }
            }
            return
        }
        guard let package = pendingPackage else {
            phase = .failed(String(localized: "Shared content could not be read.", comment: "Share import error"))
            bumpActivation()
            return
        }
        guard let parentNoteId = selectedParentNoteId else {
            phase = .failed(String(localized: "Choose where to place the note first.", comment: "Share import error"))
            bumpActivation()
            return
        }
        guard let appState, let profileId = appState.activeProfile?.id, appState.isAuthenticated else {
            phase = .needsSignIn
            bumpActivation()
            return
        }

        do {
            // Same as tree/detail new-note: blank title → "Note dd-MM-yyyy HH:mm:ss".
            let title = NoteCreationTitle.resolved(from: rawTitle)
            let kind = package.payload.kind
            let noteType = SharedImportImporter.noteTypeChoices(for: kind).contains(requestedType) ? requestedType : .text
            let needsAttachmentUpload = kind == .file && noteType == .text
            if needsAttachmentUpload {
                guard appState.networkMonitor.isConnected, appState.client != nil else {
                    phase = .failed(String(localized: "Cannot upload while offline.", comment: "Share import error"))
                    bumpActivation()
                    return
                }
            }

            // HEIC becomes JPEG first, off the main thread: re-encoding a large photo takes a moment.
            let shared = await Task.detached(priority: .userInitiated) {
                SharedImportImageConverter.convertingHEIC(package)
            }.value

            if noteType != .text {
                try await createContentNote(
                    shared,
                    noteType: noteType,
                    title: title,
                    parentNoteId: parentNoteId,
                    appState: appState,
                    profileId: profileId
                )
                SharedImportNoteTypePreference.remember(noteType, for: kind)
                return
            }

            let result = try SharedImportImporter.importPackage(
                shared,
                parentNoteId: parentNoteId,
                persistence: PersistenceManager.shared,
                serverProfileId: profileId,
                titleOverride: title
            )
            SharedImportNoteTypePreference.remember(.text, for: kind)
            SharedImportStore.clear()
            pendingPackage = nil
            selectedParentNoteId = nil
            suggestedNoteTitle = ""

            var openNoteId = result.noteId
            var attachmentId: String?
            var attachmentTitle: String?
            if let pendingTitle = result.pendingAttachmentTitle {
                do {
                    let finalized = try await finalizeSharedFileAttachment(
                        localNoteId: result.noteId,
                        preferredTitle: pendingTitle,
                        appState: appState
                    )
                    openNoteId = finalized.noteId
                    attachmentId = finalized.attachmentId
                    attachmentTitle = finalized.title
                } catch {
                    phase = .failed(error.localizedDescription)
                    bumpActivation()
                    NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
                    return
                }
            }

            pendingOpenNote = PendingOpenSharedNote(
                noteId: openNoteId,
                title: result.title,
                attachmentIdToInsert: attachmentId,
                attachmentTitleToInsert: attachmentTitle
            )
            phase = .idle
            bumpActivation()
            // Text/image shares stay local until the user Saves. File shares already synced the note
            // and uploaded the attachment so the editor can insert the same chip as the toolbar.
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        } catch {
            phase = .failed(error.localizedDescription)
            bumpActivation()
        }
    }

    func dismissFailure() {
        if SharedImportStore.peekExists() {
            phase = .showExplanation
        } else {
            pendingPackage = nil
            selectedParentNoteId = nil
            suggestedNoteTitle = ""
            phase = .idle
        }
        bumpActivation()
    }

    /// Dismisses the sign-in prompt while keeping the App Group payload for after login.
    func acknowledgeNeedsSignIn() {
        guard phase == .needsSignIn else { return }
        phase = .idle
        bumpActivation()
    }

    /// Clears `pendingOpenNote` after the Notes tab has consumed it.
    func consumePendingOpenNote() {
        pendingOpenNote = nil
        bumpActivation()
    }

    /// Called when authentication becomes available so a deferred share can continue.
    func onAuthenticated() {
        if pendingPackage != nil {
            phase = .showExplanation
            bumpActivation()
            return
        }
        checkForPendingPayload()
        scheduleRetriesIfNeeded()
    }

    // MARK: - Private

    private enum FinalizeAttachmentError: LocalizedError {
        case noteNotSynced
        case offline
        case uploadFailed

        var errorDescription: String? {
            switch self {
            case .noteNotSynced:
                String(localized: "Could not create the note on the server.", comment: "Share import error")
            case .offline:
                String(localized: "Cannot upload while offline.", comment: "Share import error")
            case .uploadFailed:
                String(localized: "Could not upload the shared file.", comment: "Share import error")
            }
        }
    }

    /// An image or file note: made on the server while online, otherwise on the device to go up later. A parent made
    /// offline that hasn't reached the server yet means the device too, since the server can't place a note under it.
    private func createContentNote(
        _ package: SharedImportPackage,
        noteType: NoteType,
        title: String,
        parentNoteId: String,
        appState: AppState,
        profileId: String
    ) async throws {
        let content = try SharedImportImporter.contentNote(for: package, noteType: noteType, title: title)
        let result: SharedImportImporter.Result
        if appState.isOnline, let client = appState.client, !parentNoteId.isOfflineLocalNoteId {
            result = try await SharedImportImporter.createContentNoteOnServer(
                content,
                title: title,
                parentNoteId: parentNoteId,
                client: client,
                persistence: PersistenceManager.shared,
                serverProfileId: profileId
            )
        } else {
            result = try SharedImportImporter.queueContentNote(
                content,
                title: title,
                parentNoteId: parentNoteId,
                persistence: PersistenceManager.shared,
                serverProfileId: profileId
            )
        }
        SharedImportStore.clear()
        pendingPackage = nil
        selectedParentNoteId = nil
        suggestedNoteTitle = ""
        pendingOpenNote = PendingOpenSharedNote(
            noteId: result.noteId,
            title: result.title,
            startInEditMode: result.opensInEditor
        )
        phase = .idle
        bumpActivation()
        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
    }

    /// Syncs the offline note, uploads the queued file attachment, and returns server ids for the editor chip.
    private func finalizeSharedFileAttachment(
        localNoteId: String,
        preferredTitle: String,
        appState: AppState
    ) async throws -> (noteId: String, attachmentId: String, title: String) {
        let capture = ShareImportNoteIdRemapCapture()
        let observer = NotificationCenter.default.addObserver(
            forName: .trinoteOfflineNoteIdReplaced,
            object: nil,
            queue: .main
        ) { notification in
            guard let from = notification.userInfo?["from"] as? String,
                  let to = notification.userInfo?["to"] as? String,
                  from == localNoteId
            else { return }
            capture.remapped = to
        }
        defer { NotificationCenter.default.removeObserver(observer) }

        await appState.flushPendingNoteCreationsIfPossible(assumeSessionIsReady: true)

        let noteId = capture.remapped ?? localNoteId
        guard !noteId.isOfflineLocalNoteId else {
            throw FinalizeAttachmentError.noteNotSynced
        }
        guard let client = appState.client,
              let profileId = appState.activeProfile?.id
        else {
            throw FinalizeAttachmentError.offline
        }

        let pending = try PersistenceManager.shared.fetchPendingAttachmentImports(
            noteId: noteId,
            serverProfileId: profileId
        )
        if let row = pending.first(where: { $0.title == preferredTitle }) ?? pending.first {
            // Read up front: the attachment flush can delete this row during the upload, and a deleted model's
            // attributes can't be read afterwards.
            let rowId = row.id
            let rowTitle = row.title
            let attachmentId = try await client.uploadNoteAttachment(
                noteId: noteId,
                data: row.data,
                filename: rowTitle,
                contentType: row.mime
            )
            try? PersistenceManager.shared.deletePendingAttachmentImport(
                id: rowId,
                serverProfileId: profileId
            )
            return (noteId, attachmentId, rowTitle)
        }

        // Concurrent flush may have already uploaded it.
        if let attachments = try? await client.getNoteAttachments(noteId),
           let match = attachments.first(where: { $0.title == preferredTitle }) ?? attachments.last {
            return (noteId, match.attachmentId, match.title)
        }
        throw FinalizeAttachmentError.uploadFailed
    }

    private func bumpActivation() {
        activationToken &+= 1
    }

    private func beginFromPendingStoreIfPossible() {
        do {
            let package = try SharedImportStore.load()
            pendingPackage = package
            suggestedNoteTitle = SharedImportImporter.resolvedTitle(
                for: package.payload,
                imageData: package.binaryData
            )
            retryTask?.cancel()
            retryTask = nil
            if let appState, appState.isAuthenticated, appState.activeProfile != nil {
                phase = .showExplanation
            } else {
                phase = .needsSignIn
            }
            bumpActivation()
        } catch SharedImportStoreError.noPendingPayload {
            // Ignore — URL open can race the extension write.
        } catch {
            phase = .failed(error.localizedDescription)
            bumpActivation()
        }
    }

    private func scheduleRetriesIfNeeded() {
        guard pendingPackage == nil, phase == .idle || phase == .needsSignIn else { return }
        retryTask?.cancel()
        retryTask = Task { @MainActor [weak self] in
            let delays: [UInt64] = [150, 350, 700, 1_200, 2_000]
            for delay in delays {
                try? await Task.sleep(nanoseconds: delay * 1_000_000)
                guard let self, !Task.isCancelled else { return }
                if self.pendingPackage != nil { return }
                switch self.phase {
                case .showExplanation, .showParentPicker, .showCreateNote, .importing:
                    return
                case .idle, .needsSignIn, .failed:
                    break
                }
                self.beginFromPendingStoreIfPossible()
                if self.pendingPackage != nil { return }
            }
        }
    }
}
