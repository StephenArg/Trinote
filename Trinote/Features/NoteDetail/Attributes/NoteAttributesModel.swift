import Foundation

/// The Attributes sheet's state: the note's own and inherited attributes, the titles of the notes they point at or
/// come from, and saving changes. Changes need the server (they aren't queued offline).
///
/// The client and server profile are fixed when the sheet opens: a reply arriving after a switch to another server
/// is dropped rather than written into that server's cache.
@Observable
@MainActor
final class NoteAttributesModel {
    private(set) var owned: [AttributeItem] = []
    private(set) var inherited: [AttributeItem] = []
    /// Titles of the notes inherited attributes come from and relations point at.
    private(set) var titles: [String: String] = [:]
    private(set) var isSaving = false
    var errorMessage: String?

    let noteId: String
    private let viewModel: NoteDetailViewModel
    private let appState: AppState
    private let client: (any TriliumClientProtocol)?
    private let profileId: String?
    @ObservationIgnored private var valuesByName: [String: [String]] = [:]

    init(viewModel: NoteDetailViewModel, appState: AppState) {
        self.viewModel = viewModel
        self.appState = appState
        self.noteId = viewModel.noteId
        self.client = appState.client
        self.profileId = appState.activeProfile?.id
        reload()
    }

    /// Changes go straight to the server: online, on the server the sheet was opened for, not while a protected
    /// note is locked, and not on a note the server keeps read-only (Trilium 0.107+'s help pages).
    var canEdit: Bool {
        client != nil && appState.isOnline && !isStale && !viewModel.needsProtectedSession
            && viewModel.note?.isContentWritable != false
    }

    /// Signed in to another server since the sheet opened.
    var isStale: Bool { appState.activeProfile?.id != profileId }

    var isProtectedNoteLocked: Bool { viewModel.needsProtectedSession }

    func reload() {
        guard let note = viewModel.note else { return }
        owned = OwnedAttributeEdits.editable(note.attributes)
        // Grouped by the note they come from, as desktop's Inherited attributes tab lists them.
        inherited = note.inheritedAttributes.sorted {
            $0.noteId == $1.noteId ? $0.position < $1.position : $0.noteId < $1.noteId
        }
    }

    // MARK: Titles

    /// What to call the note `noteId` (an owner or relation target): its cached title, or the server's. A protected
    /// note's title stays hidden while the protected session is locked.
    func title(of noteId: String) -> String {
        titles[noteId] ?? noteId
    }

    func loadTitles() async {
        var ids = Set(inherited.map(\.noteId))
        ids.formUnion((owned + inherited).filter { $0.type == .relation }.map(\.value))
        ids.subtract(titles.keys)
        var unknown: [String] = []
        for id in ids {
            if let title = cachedTitle(of: id) {
                titles[id] = title
            } else {
                unknown.append(id)
            }
        }
        guard let client, appState.isOnline else { return }
        // A note's few owners and targets; the cap keeps a huge relation list from fanning out.
        for id in unknown.prefix(20) where TriliumEntityId.isValid(id) {
            guard let response = try? await client.getNote(id), !isStale else { continue }
            titles[id] = response.isProtected && !appState.protectedSessionActive
                ? NoteItem.protectedTitlePlaceholder
                : response.title
        }
    }

    private func cachedTitle(of noteId: String) -> String? {
        guard let profileId,
              let cached = try? PersistenceManager.shared.fetchCachedNote(id: noteId, serverProfileId: profileId) else {
            return nil
        }
        if cached.isProtected && !appState.protectedSessionActive {
            return NoteItem.protectedTitlePlaceholder
        }
        return cached.title
    }

    /// Remembers a relation target picked in the note picker, so its row shows the title straight away.
    func rememberTitle(_ title: String, of noteId: String) {
        titles[noteId] = title
    }

    // MARK: Saving

    /// Applies `edit` and saves the note's whole list of own attributes, as desktop's attribute editor does. The list
    /// is fetched again first, so attributes changed on another device meanwhile are kept.
    @discardableResult
    func save(_ edit: OwnedAttributeEdit) async -> Bool {
        guard canEdit, let client, let profileId, !isSaving else {
            if !isSaving { errorMessage = offlineMessage }
            return false
        }
        isSaving = true
        errorMessage = nil
        defer { isSaving = false }
        do {
            let current = try await client.getNote(noteId)
            let list = try OwnedAttributeEdits.apply(edit, to: current.attributes.map(AttributeItem.init))
            try await client.replaceOwnedAttributes(noteId: noteId, list)
            let updated = try await client.getNote(noteId)
            guard !isStale else { return false }
            await viewModel.applyServerNoteUpdate(updated, profileId: profileId)
            reload()
            if case let .add(draft) = edit, draft.type == .relation, !hasRelation(draft, in: updated) {
                errorMessage = missingTargetMessage
            } else if case let .update(_, draft) = edit, draft.type == .relation, !hasRelation(draft, in: updated) {
                errorMessage = missingTargetMessage
            }
            await loadTitles()
            return errorMessage == nil
        } catch OwnedAttributeEdits.Failure.changedElsewhere {
            errorMessage = String(
                localized: "This attribute was changed on another device. The list now shows what the note has.",
                comment: "Attributes sheet: the edited attribute is gone"
            )
            if let fresh = try? await client.getNote(noteId), !isStale {
                await viewModel.applyServerNoteUpdate(fresh, profileId: profileId)
                reload()
            }
            return false
        } catch {
            errorMessage = APIError.from(error).localizedDescription
            return false
        }
    }

    private var offlineMessage: String {
        String(localized: "Connect to your server to change attributes.", comment: "Attributes sheet offline")
    }

    private var missingTargetMessage: String {
        String(
            localized: "The relation wasn't added because its target note couldn't be found.",
            comment: "Attributes sheet: Trilium skipped a relation whose target is missing"
        )
    }

    /// Trilium silently skips a relation whose target note doesn't exist.
    private func hasRelation(_ draft: AttributeDraft, in response: NoteResponse) -> Bool {
        response.attributes.contains { $0.type == "relation" && $0.name == draft.name && $0.value == draft.value }
    }

    // MARK: Suggestions

    /// Names in use on the server containing `query`, leaving out Trilium's built-ins (the sheet lists those itself,
    /// with their explanations). Kept only while the sheet is open.
    func usedNames(_ type: AttributeItem.AttributeKind, matching query: String) async -> [String] {
        guard let client, appState.isOnline, !isStale else { return [] }
        let names = (try? await client.attributeNames(type: type.rawValue, query: query)) ?? []
        return names.filter {
            TriliumAttributeCatalog.shared.builtin(type, $0) == nil
                && !$0.hasPrefix("label:") && !$0.hasPrefix("relation:")
        }
    }

    /// Values the label `name` already has on the server. Never offered for secrets.
    func usedValues(forLabel name: String) async -> [String] {
        guard !AttributeSecrets.isSecret(type: .label, name: name) else { return [] }
        if let cached = valuesByName[name] { return cached }
        guard let client, appState.isOnline, !isStale else { return [] }
        let values = (try? await client.attributeValues(name: name)) ?? []
        valuesByName[name] = values
        return values
    }
}

/// Attributes whose value is a secret (security: masked on screen, never suggested or logged).
enum AttributeSecrets {
    static func isSecret(type: AttributeItem.AttributeKind, name: String) -> Bool {
        type == .label && name == "shareCredentials"
    }
}
