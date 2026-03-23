import Foundation
import Observation
import UIKit

@Observable
@MainActor
final class NoteDetailViewModel {
    var note: NoteItem?
    var content: Data?
    var contentString: String?
    private var rawContentString: String?
    var attachments: [AttachmentItem] = []
    var breadcrumbs: [BreadcrumbItem] = []
    var isLoading = false
    var isLoadingContent = false
    var error: String?
    /// True once any server call has succeeded for this note.
    /// Only false when the initial load couldn't reach the server
    /// and only cached data is showing. Never reset to false once true.
    var serverVerified = false

    // Editing
    var isEditing = false
    var editableContent = ""
    @ObservationIgnored private var _pendingEditorHTML: String?
    var isSaving = false
    var saveError: String?
    var showSaveError = false
    var hasDraft = false

    // Title edit
    var editingTitle = false
    var editedTitle = ""

    // Create child
    var showCreateChild = false
    var newNoteTitle = ""
    var newNoteType: NoteType = .text

    // Delete
    var showDeleteConfirm = false

    // Details panel
    var showDetails = false

    // Draft discard
    var showDiscardDraft = false

    // Protected notes
    var needsProtectedSession = false
    var protectedUnlockError: String?
    var isUnlockingProtected = false

    // Child notes
    var childNotes: [ChildNoteSummary] = []
    var isLoadingChildren = false

    let noteId: String
    private let appState: AppState
    private let persistence = PersistenceManager.shared
    private var draftAutoSaveTask: Task<Void, Never>?
    private var serverContentHash: Int?
    /// The server's utcDateModified for the current note, set during metadata fetch.
    private var serverUtcDateModified: String?

    init(noteId: String, appState: AppState) {
        self.noteId = noteId
        self.appState = appState
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }
    var isOnline: Bool { appState.isOnline }
    var serverBaseURL: URL? { (appState.client as? TriliumClient)?.baseURL }

    private static func persistNoteResponse(_ response: NoteResponse, profileId: String, persistence: PersistenceManager) {
        try? persistence.cacheNote(from: response, serverProfileId: profileId)
        for attr in response.attributes {
            try? persistence.cacheAttributeBatch(from: attr, serverProfileId: profileId)
        }
    }

    /// Refetches this note, ancestors, and direct children so titles match the current protected session (decrypted vs encrypted).
    func resyncNoteTitlesWithProtectedSession() async {
        guard let client, let profileId = serverProfileId else { return }
        var visited = Set<String>()
        var currentId: String? = noteId

        while let nid = currentId, nid != "root", !visited.contains(nid) {
            visited.insert(nid)
            do {
                let response = try await client.getNote(nid)
                Self.persistNoteResponse(response, profileId: profileId, persistence: persistence)
                if nid == noteId {
                    self.note = NoteItem(from: response)
                    self.serverUtcDateModified = response.utcDateModified
                }
                currentId = response.parentNoteIds.first
            } catch {
                Log.api.warning("Protected title resync: getNote failed for \(nid): \(error)")
                break
            }
        }
        try? persistence.commitBatch()

        if let n = self.note {
            for childId in n.childNoteIds where !visited.contains(childId) {
                do {
                    let response = try await client.getNote(childId)
                    Self.persistNoteResponse(response, profileId: profileId, persistence: persistence)
                } catch {
                    Log.api.debug("Protected title resync: child getNote failed for \(childId)")
                }
            }
            try? persistence.commitBatch()
            try? persistence.recordRecentNote(
                noteId: n.noteId, title: n.title,
                noteType: n.type.rawValue, serverProfileId: profileId
            )
        }

        rebuildBreadcrumbsFromCache()
        await loadChildNotes()
    }

    private func rebuildBreadcrumbsFromCache() {
        guard let profileId = serverProfileId else {
            breadcrumbs = []
            return
        }
        var crumbs: [BreadcrumbItem] = []
        var currentId = noteId
        var visited = Set<String>()
        while currentId != "root", !visited.contains(currentId) {
            visited.insert(currentId)
            guard let cached = try? persistence.fetchCachedNote(id: currentId, serverProfileId: profileId) else { break }
            let displayTitle: String
            if !appState.protectedSessionActive, cached.isProtected {
                displayTitle = NoteItem.protectedTitlePlaceholder
            } else {
                displayTitle = cached.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? currentId : cached.title
            }
            guard let parentNoteId = cached.parentNoteIds.first, !parentNoteId.isEmpty else { break }
            let branchId = cached.parentBranchIds.first
            crumbs.insert(BreadcrumbItem(noteId: currentId, title: displayTitle, branchId: branchId), at: 0)
            currentId = parentNoteId
        }
        if currentId == "root" {
            crumbs.insert(BreadcrumbItem(noteId: "root", title: "Root", branchId: nil), at: 0)
        }
        breadcrumbs = crumbs
    }

    /// Path under title — same format as Recents (`Parent -> … -> note`, no `Root`). Hidden when it would only repeat the title.
    var noteTreePathCaption: String? {
        guard let profileId = serverProfileId, let note else { return nil }
        let full = persistence.cachedNotePathDisplay(
            noteId: note.noteId,
            leafTitle: note.title,
            leafIsProtected: note.isProtected,
            serverProfileId: profileId,
            protectedSessionActive: appState.protectedSessionActive
        )
        let leafUI = note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
        let condensed = (full == leafUI) ? "" : full
        return condensed.isEmpty ? nil : condensed
    }

    // MARK: - Loading

    /// Loads note from cache instantly, then refreshes from server in the background.
    func load() async {
        let nid = self.noteId

        // Show cached data immediately
        loadFromCache()

        if let note, let profileId = self.serverProfileId {
            try? self.persistence.recordRecentNote(
                noteId: nid, title: note.title,
                noteType: note.type.rawValue, serverProfileId: profileId
            )
        }

        // Background server refresh
        guard let client else { return }
        let hadCachedNote = self.note != nil
        if !hadCachedNote { isLoading = true; error = nil }
        defer { if !hadCachedNote { isLoading = false } }

        do {
            let response = try await client.getNote(nid)
            let fresh = NoteItem(from: response)
            self.note = fresh
            self.serverUtcDateModified = response.utcDateModified
            self.serverVerified = true

            if let profileId = self.serverProfileId {
                Self.persistNoteResponse(response, profileId: profileId, persistence: self.persistence)
                try? self.persistence.commitBatch()
                try? self.persistence.recordRecentNote(
                    noteId: nid, title: response.title,
                    noteType: response.type, serverProfileId: profileId
                )
            }
            rebuildBreadcrumbsFromCache()
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            Log.api.error("Failed to load note: \(error)")
            if !hadCachedNote {
                self.error = apiError.localizedDescription
            }
        }
    }

    /// Loads content from cache instantly, then checks the server timestamp.
    /// Only downloads content if the server's `utcDateModified` is newer than
    /// the cached version. Images are inlined from the local cache.
    func loadContent() async {
        let nid = self.noteId

        loadContentFromCache()

        if let raw = self.rawContentString,
           raw.contains("api/attachments/") || raw.contains("api/images/") {
            let inlined = await self.inlineAttachmentImages(in: raw)
            if inlined != self.contentString {
                self.contentString = inlined
            }
        }

        guard let note = self.note else { return }

        if !note.isProtected {
            self.needsProtectedSession = false
        }

        self.checkForDraft()

        guard let client else { return }
        let profileId = self.serverProfileId ?? ""
        let cachedDate = (try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId))?.utcDateModified

        let forceFetchProtected = note.isProtected && !appState.protectedSessionActive
        if let serverDate = self.serverUtcDateModified, let cachedDate, serverDate <= cachedDate, !forceFetchProtected {
            self.serverVerified = true
            if note.isProtected {
                self.needsProtectedSession = false
                if appState.protectedSessionActive {
                    await resyncNoteTitlesWithProtectedSession()
                }
            }
            return
        }

        let hadCachedContent = self.contentString != nil
        if !hadCachedContent { isLoadingContent = true }
        defer { if !hadCachedContent { isLoadingContent = false } }

        do {
            let data = try await client.getNoteContent(nid)
            let htmlString = String(data: data, encoding: .utf8)

            self.content = data
            self.serverContentHash = htmlString?.hashValue
            self.rawContentString = htmlString

            var displayHTML = htmlString
            if let html = displayHTML,
               html.contains("api/attachments/") || html.contains("api/images/") {
                displayHTML = await self.inlineAttachmentImages(in: html)
            }

            self.contentString = displayHTML
            self.serverVerified = true

            if note.isProtected {
                self.appState.protectedSessionActive = true
                self.needsProtectedSession = false
                self.protectedUnlockError = nil
            }

            if let profileId = self.serverProfileId {
                try? self.persistence.cacheNoteContent(
                    nid, content: data, serverProfileId: profileId,
                    utcDateModified: self.serverUtcDateModified
                )
            }

            self.checkForDraft()

            if note.isProtected {
                await resyncNoteTitlesWithProtectedSession()
            }

        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            Log.api.error("Failed to load note content")

            if note.isProtected {
                if Self.protectedSessionLikelyEnded(error) {
                    self.appState.protectedSessionActive = false
                    self.needsProtectedSession = true
                    await resyncNoteTitlesWithProtectedSession()
                } else if !self.appState.protectedSessionActive {
                    // No server-side session yet — show unlock (wrong password will be handled after unlock attempt).
                    self.needsProtectedSession = true
                }
            }

            // "Cannot find content for noteId" means the blob was erased —
            // the note is effectively deleted on the server.
            if case .serverError(let code, let msg) = apiError, code == 500,
               let msg, msg.contains("Cannot find content") {
                self.error = "This note was deleted on the server."
                if let profileId = self.serverProfileId {
                    GhostNoteTracker.shared.add(nid, serverProfileId: profileId)
                    try? self.persistence.deleteCachedNotes(noteIds: [nid], serverProfileId: profileId)
                }
                NotificationCenter.default.post(name: .ghostNoteDetected, object: nil, userInfo: ["noteId": nid])
            }
        }
    }

    /// Finds Trilium image `src` URLs in HTML and replaces them with
    /// base64 data URIs. Checks local image cache first; falls back to
    /// network (and caches the result) only on cache miss.
    private func inlineAttachmentImages(in html: String) async -> String {
        var result = html

        let pattern = try! NSRegularExpression(
            pattern: #"src=["'](?:/?api/(attachments|images)/([a-zA-Z0-9_]+)/[^"']*)["']"#,
            options: []
        )
        let nsHTML = html as NSString
        let matches = pattern.matches(in: html, range: NSRange(location: 0, length: nsHTML.length))

        let profileId = self.serverProfileId ?? ""

        for match in matches.reversed() {
            guard match.numberOfRanges >= 3 else { continue }
            let routeType = nsHTML.substring(with: match.range(at: 1))
            let entityId = nsHTML.substring(with: match.range(at: 2))
            let fullMatch = nsHTML.substring(with: match.range)

            var imageData: Data?

            // Check local image cache first
            do {
                if let cached = try self.persistence.fetchCachedImage(
                    entityId: entityId, entityType: routeType, serverProfileId: profileId
                ) {
                    imageData = cached.data
                    Log.api.debug("Image cache hit: \(routeType)/\(entityId)")
                }
            } catch {
                Log.api.warning("Image cache lookup failed: \(error)")
            }

            // Network fallback on cache miss
            if imageData == nil, let client {
                do {
                    if routeType == "attachments" {
                        imageData = try await client.getAttachmentContent(entityId)
                    } else {
                        imageData = try await client.getNoteContent(entityId)
                    }
                    if let data = imageData {
                        let mime = data.detectImageMIME()
                        do {
                            try self.persistence.cacheImage(
                                entityId: entityId, entityType: routeType,
                                data: data, mime: mime, serverProfileId: profileId
                            )
                            Log.api.debug("Cached image: \(routeType)/\(entityId)")
                        } catch {
                            Log.api.warning("Failed to cache image: \(error)")
                        }
                    }
                } catch {
                    Log.api.error("Failed to download image \(routeType)/\(entityId)")
                }
            }

            if let data = imageData {
                let mime = data.detectImageMIME()
                let b64 = data.base64EncodedString()
                let dataURI = "data:\(mime);base64,\(b64)"
                let replacement = "src=\"\(dataURI)\""
                result = (result as NSString).replacingCharacters(
                    in: (result as NSString).range(of: fullMatch),
                    with: replacement
                )
            }
        }

        return result
    }

    /// Pull-to-refresh: fetches metadata + content into local vars first,
    /// then applies everything to @Observable state in one batch. This
    /// prevents mid-flight SwiftUI re-evaluation from cancelling the
    /// URLSession content request.
    func refresh() async {
        guard let client else { return }
        let nid = self.noteId
        let profileId = self.serverProfileId ?? ""

        // 1) Fetch metadata into local vars (no @Observable writes yet)
        var metaResponse: NoteResponse?
        var serverDate: String?
        do {
            let response = try await client.getNote(nid)
            metaResponse = response
            serverDate = response.utcDateModified
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            Log.api.error("Note detail refresh: getNote failed — leaving UI unchanged")
        }

        // 2) Compare timestamps
        let cachedDate = (try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId))?.utcDateModified
        let serverIsNewer = serverDate != nil && (cachedDate == nil || serverDate! > cachedDate!)

        if !serverIsNewer {
            if let response = metaResponse {
                self.note = NoteItem(from: response)
                self.serverUtcDateModified = serverDate
                self.serverVerified = true
            }
            if let note, !note.childNoteIds.isEmpty {
                loadChildNotesFromCache(childNoteIds: note.childNoteIds)
            }
            return
        }

        // 3) Fetch content into local vars (still no @Observable writes)
        var fetchedData: Data?
        var fetchedHTML: String?
        var skipApplyingStaleMetaNote = false
        do {
            let data = try await client.getNoteContent(nid)
            fetchedData = data
            fetchedHTML = String(data: data, encoding: .utf8)
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            Log.api.error("Note detail refresh: getNoteContent failed — will apply meta only; content may stay stale or empty")
            if let meta = metaResponse, meta.isProtected, Self.protectedSessionLikelyEnded(error) {
                self.appState.protectedSessionActive = false
                self.needsProtectedSession = true
                skipApplyingStaleMetaNote = true
                await resyncNoteTitlesWithProtectedSession()
            }
        }

        // 4) All network done — apply everything to @Observable state
        if let response = metaResponse {
            if !skipApplyingStaleMetaNote {
                self.note = NoteItem(from: response)
                self.serverUtcDateModified = serverDate
                self.serverVerified = true
                if let pid = self.serverProfileId {
                    Self.persistNoteResponse(response, profileId: pid, persistence: persistence)
                    try? persistence.commitBatch()
                }
            } else {
                self.serverUtcDateModified = serverDate
                self.serverVerified = true
            }
        }

        guard let data = fetchedData else {
            return
        }
        self.content = data
        self.serverContentHash = fetchedHTML?.hashValue
        self.rawContentString = fetchedHTML

        var displayHTML = fetchedHTML
        if let html = displayHTML,
           html.contains("api/attachments/") || html.contains("api/images/") {
            displayHTML = await self.inlineAttachmentImages(in: html)
        }
        self.contentString = displayHTML

        if let pid = self.serverProfileId {
            try? self.persistence.cacheNoteContent(
                nid, content: data, serverProfileId: pid,
                utcDateModified: serverDate
            )
        }
        self.checkForDraft()

        if let note, !note.childNoteIds.isEmpty {
            loadChildNotesFromCache(childNoteIds: note.childNoteIds)
        }
    }

    func loadAttachments() async {
        let nid = self.noteId
        guard let client else { return }
        do {
            let responses = try await client.getNoteAttachments(nid)
            self.attachments = responses.map(AttachmentItem.init)
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            Log.api.error("Failed to load attachments")
        }
    }

    func loadBreadcrumbs(treeVM: TreeViewModel?) async {
        let nid = self.noteId
        if let treeVM {
            self.breadcrumbs = await treeVM.breadcrumbs(for: nid)
        }
    }

    // MARK: - Checkbox Toggle

    func toggleCheckbox(index: Int, checked: Bool) {
        guard let raw = rawContentString else { return }

        let checkboxPattern = try! NSRegularExpression(
            pattern: #"<input\s+[^>]*type\s*=\s*["']checkbox["'][^>]*/?\s*>"#,
            options: .caseInsensitive
        )
        let nsRaw = raw as NSString
        let matches = checkboxPattern.matches(in: raw, range: NSRange(location: 0, length: nsRaw.length))

        guard index < matches.count else { return }
        let matchRange = matches[index].range
        let original = nsRaw.substring(with: matchRange)

        var updated: String
        if checked {
            if original.contains("checked") { return }
            updated = original.replacingOccurrences(of: ">", with: " checked=\"checked\">")
            // Handle self-closing tags
            updated = updated.replacingOccurrences(of: "/ checked=\"checked\">", with: " checked=\"checked\" />")
        } else {
            updated = original
                .replacingOccurrences(of: " checked=\"checked\"", with: "")
                .replacingOccurrences(of: " checked", with: "")
                .replacingOccurrences(of: "checked=\"checked\" ", with: "")
                .replacingOccurrences(of: "checked ", with: "")
        }

        let newRaw = (raw as NSString).replacingCharacters(in: matchRange, with: updated)
        self.rawContentString = newRaw
        self.serverContentHash = newRaw.hashValue

        if let display = contentString {
            let nsDisplay = display as NSString
            let displayMatches = checkboxPattern.matches(in: display, range: NSRange(location: 0, length: nsDisplay.length))
            if index < displayMatches.count {
                let displayOriginal = nsDisplay.substring(with: displayMatches[index].range)
                var displayUpdated: String
                if checked {
                    displayUpdated = displayOriginal.replacingOccurrences(of: ">", with: " checked=\"checked\">")
                    displayUpdated = displayUpdated.replacingOccurrences(of: "/ checked=\"checked\">", with: " checked=\"checked\" />")
                } else {
                    displayUpdated = displayOriginal
                        .replacingOccurrences(of: " checked=\"checked\"", with: "")
                        .replacingOccurrences(of: " checked", with: "")
                        .replacingOccurrences(of: "checked=\"checked\" ", with: "")
                        .replacingOccurrences(of: "checked ", with: "")
                }
                self.contentString = (display as NSString).replacingCharacters(in: displayMatches[index].range, with: displayUpdated)
            }
        }

        Task {
            await saveCheckboxChange(newRaw)
        }
    }

    private func saveCheckboxChange(_ html: String) async {
        guard let client, note != nil else { return }
        let nid = self.noteId
        do {
            let data = Data(html.utf8)
            try await client.updateNoteContent(nid, content: data, contentType: "text/html")
            self.content = data
            if let profileId = self.serverProfileId {
                try? self.persistence.cacheNoteContent(nid, content: data, serverProfileId: profileId)
            }
        } catch {
            Log.api.error("Failed to save checkbox state: \(error)")
        }
    }

    // MARK: - Drafts

    private func checkForDraft() {
        guard let profileId = self.serverProfileId else { return }
        let nid = self.noteId
        if let draft = try? self.persistence.loadDraft(noteId: nid, serverProfileId: profileId) {
            if draft.content != self.contentString {
                self.hasDraft = true
                self.editableContent = draft.content
            } else {
                try? self.persistence.deleteDraft(noteId: nid, serverProfileId: profileId)
                self.hasDraft = false
            }
        }
    }

    func restoreDraft() {
        isEditing = true
    }

    func discardDraft() {
        guard let profileId = self.serverProfileId else { return }
        try? self.persistence.deleteDraft(noteId: self.noteId, serverProfileId: profileId)
        self.hasDraft = false
        self.editableContent = self.contentString ?? ""
    }

    /// Called from the rich text editor's JS bridge on every debounced keystroke.
    /// Updates a non-observable backing store to avoid SwiftUI re-evaluation.
    func receiveEditorUpdate(_ html: String) {
        _pendingEditorHTML = html
    }

    /// Flushes any pending editor HTML into the observable `editableContent`.
    private func flushPendingEditorContent() {
        if let pending = _pendingEditorHTML {
            editableContent = pending
            _pendingEditorHTML = nil
        }
    }

    func startEditing() {
        _pendingEditorHTML = nil
        if !hasDraft {
            editableContent = contentString ?? ""
        }
        isEditing = true
        startDraftAutoSave()
    }

    func cancelEditing() {
        draftAutoSaveTask?.cancel()
        flushPendingEditorContent()
        if editableContent != contentString {
            saveDraftLocally()
            hasDraft = true
        }
        isEditing = false
    }

    private func startDraftAutoSave() {
        draftAutoSaveTask?.cancel()
        draftAutoSaveTask = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(milliseconds: 5000)
                guard !Task.isCancelled else { return }
                await self?.saveDraftLocally()
            }
        }
    }

    private func saveDraftLocally() {
        flushPendingEditorContent()
        guard let profileId = self.serverProfileId else { return }
        try? self.persistence.saveDraft(noteId: self.noteId, content: self.editableContent, serverProfileId: profileId)
    }

    // MARK: - Saving

    func unlockProtectedNote(documentPassword: String) async {
        guard let client, let note, note.isProtected else { return }
        let trimmed = documentPassword.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else {
            protectedUnlockError = "Enter the document password used for protected notes in Trilium."
            return
        }
        isUnlockingProtected = true
        protectedUnlockError = nil
        defer { isUnlockingProtected = false }
        do {
            try await client.enterProtectedSession(password: trimmed)
            appState.protectedSessionActive = true
            needsProtectedSession = false
            await loadContent()
        } catch {
            protectedUnlockError = APIError.from(error).localizedDescription
        }
    }

    func saveContent() async {
        flushPendingEditorContent()
        guard let client, let note else {
            self.saveError = "Cannot save while offline. Your draft has been preserved."
            self.showSaveError = true
            self.saveDraftLocally()
            return
        }
        let nid = self.noteId
        self.isSaving = true
        self.saveError = nil
        defer { self.isSaving = false }

        // Conflict check: reload server content and compare
        if let serverHash = self.serverContentHash {
            do {
                let freshData = try await client.getNoteContent(nid)
                let freshString = String(data: freshData, encoding: .utf8)
                if freshString?.hashValue != serverHash && freshString != self.contentString {
                    self.saveError = "Note was modified on the server since you started editing. Your draft has been preserved locally. Please review the changes."
                    self.showSaveError = true
                    self.saveDraftLocally()
                    return
                }
            } catch {
                if note.isProtected, Self.protectedSessionLikelyEnded(error) {
                    self.appState.protectedSessionActive = false
                    self.needsProtectedSession = true
                    await resyncNoteTitlesWithProtectedSession()
                    self.saveError = "Protected session expired. Unlock the note again to save."
                    self.showSaveError = true
                    self.saveDraftLocally()
                    return
                }
                Log.api.warning("Could not verify server content before save")
            }
        }

        if note.isProtected, appState.protectedSessionActive {
            try? await client.touchProtectedSession()
        }

        do {
            let data = Data(self.editableContent.utf8)
            try await client.updateNoteContent(nid, content: data, contentType: note.mime)
            self.content = data
            self.contentString = self.editableContent
            // Keep in sync with contentString so read-only checkbox toggles patch the saved body,
            // not stale HTML from the last network load (see toggleCheckbox / saveCheckboxChange).
            self.rawContentString = self.editableContent
            self.serverContentHash = self.editableContent.hashValue
            self.isEditing = false
            self.hasDraft = false
            self.draftAutoSaveTask?.cancel()

            if let profileId = self.serverProfileId {
                try? self.persistence.deleteDraft(noteId: nid, serverProfileId: profileId)
                try? self.persistence.cacheNoteContent(nid, content: data, serverProfileId: profileId)
            }
            Log.api.info("Saved content for note")
        } catch {
            if note.isProtected, Self.protectedSessionLikelyEnded(error) {
                self.appState.protectedSessionActive = false
                self.needsProtectedSession = true
                await resyncNoteTitlesWithProtectedSession()
                self.saveError = "Protected session expired. Unlock the note again, then save."
            } else {
                self.saveError = APIError.from(error).localizedDescription
            }
            self.showSaveError = true
            self.saveDraftLocally()
            Log.api.error("Failed to save content")
        }
    }

    func renameNote() async {
        let nid = self.noteId
        guard let client, !self.editedTitle.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        self.isSaving = true
        defer { self.isSaving = false }

        do {
            let updated = try await client.updateNote(nid, request: UpdateNoteRequest(title: self.editedTitle, type: nil, mime: nil))
            self.note = NoteItem(from: updated)
            self.editingTitle = false
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
        }
    }

    /// Duplicate this note as a sibling under the same parent (first parent if cloned). Opens via navigation from the view.
    func duplicateNote() async -> (noteId: String, title: String)? {
        let nid = self.noteId
        guard let client, let note else {
            self.saveError = "Cannot duplicate while offline."
            self.showSaveError = true
            return nil
        }
        if note.isProtected, !appState.protectedSessionActive {
            self.saveError = "Unlock this protected note before duplicating."
            self.showSaveError = true
            return nil
        }
        let parentId = note.parentNoteIds.first ?? "root"
        self.isSaving = true
        defer { self.isSaving = false }

        do {
            let response = try await client.duplicateNoteAsChild(sourceNoteId: nid, parentNoteId: parentId)
            if let profileId = serverProfileId {
                try? persistence.cacheNote(from: response.note, serverProfileId: profileId)
                try? persistence.cacheBranch(from: response.branch, serverProfileId: profileId)
                try? persistence.commitBatch()
            }
            return (response.note.noteId, response.note.title)
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            Log.api.error("Failed to duplicate note: \(error)")
            return nil
        }
    }

    func createChildNote() async -> String? {
        let nid = self.noteId
        guard let client, !self.newNoteTitle.trimmingCharacters(in: .whitespaces).isEmpty else { return nil }
        self.isSaving = true
        defer { self.isSaving = false }

        do {
            let mime: String
            switch self.newNoteType {
            case .code: mime = "text/plain"
            case .file: mime = "application/octet-stream"
            default: mime = "text/html"
            }

            let request = CreateNoteRequest(
                parentNoteId: nid,
                title: self.newNoteTitle,
                type: self.newNoteType.rawValue,
                mime: mime,
                content: "",
                notePosition: nil,
                prefix: nil,
                isProtected: nil,
                noteId: nil,
                branchId: nil
            )
            let response = try await client.createNote(request)
            self.showCreateChild = false
            self.newNoteTitle = ""
            await self.load()
            return response.note.noteId
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            return nil
        }
    }

    func deleteNote() async -> Bool {
        let nid = self.noteId
        guard let client else {
            self.saveError = "Cannot delete while offline."
            self.showSaveError = true
            return false
        }
        self.isSaving = true
        defer { self.isSaving = false }

        do {
            try await client.deleteNote(nid)
            if let profileId = serverProfileId {
                GhostNoteTracker.shared.add(nid, serverProfileId: profileId)
                persistence.removeFavoritesForCachedSubtree(rootNoteId: nid, serverProfileId: profileId)
                try? persistence.deleteCachedNotes(noteIds: [nid], serverProfileId: profileId)
            }
            NotificationCenter.default.post(name: .noteDeleted, object: nil)
            return true
        } catch {
            Log.api.error("Failed to delete note: \(error)")
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            return false
        }
    }

    // MARK: - Attachments

    func downloadAttachment(_ attachment: AttachmentItem) async -> (Data, String)? {
        guard let client else { return nil }
        do {
            let data = try await client.getAttachmentContent(attachment.attachmentId)
            return (data, attachment.title)
        } catch {
            Log.api.error("Failed to download attachment")
            return nil
        }
    }

    func uploadAttachment(data: Data, filename: String, mime: String) async -> Bool {
        let nid = self.noteId
        guard let client else {
            self.saveError = "Cannot upload while offline."
            self.showSaveError = true
            return false
        }
        self.isSaving = true
        defer { self.isSaving = false }

        do {
            let base64 = data.base64EncodedString()
            let request = CreateAttachmentRequest(
                ownerId: nid,
                role: "file",
                mime: mime,
                title: filename,
                content: base64,
                position: nil
            )
            _ = try await client.createAttachment(request)
            await self.loadAttachments()
            return true
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            return false
        }
    }

    // MARK: - Child Notes

    /// Loads child notes purely from cache. The sync keeps the cache fresh.
    func loadChildNotes() async {
        guard let note, !note.childNoteIds.isEmpty else { return }
        loadChildNotesFromCache(childNoteIds: note.childNoteIds)
    }

    private func loadChildNotesFromCache(childNoteIds: [String]) {
        guard let profileId = self.serverProfileId else { return }
        var results: [ChildNoteSummary] = []
        for childId in childNoteIds {
            if let cached = try? self.persistence.fetchCachedNote(id: childId, serverProfileId: profileId) {
                let cachedAttrs = (try? self.persistence.fetchCachedAttributes(noteId: childId, serverProfileId: profileId)) ?? []
                let iconClass = cachedAttrs.first { $0.name == "iconClass" }?.value
                results.append(ChildNoteSummary(
                    noteId: cached.noteId,
                    title: cached.title,
                    isProtected: cached.isProtected,
                    type: NoteType(rawValue: cached.noteType) ?? .text,
                    iconClass: iconClass,
                    childCount: cached.childNoteIds.count
                ))
            }
        }
        if !results.isEmpty {
            self.childNotes = results
        }
    }

    // MARK: - Cache Fallback

    private func loadFromCache() {
        guard let profileId = self.serverProfileId else {
            return
        }
        let nid = self.noteId
        if let cached = try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId) {
            let cachedAttrs = (try? self.persistence.fetchCachedAttributes(noteId: nid, serverProfileId: profileId)) ?? []
            let attrs = cachedAttrs.map { a in
                AttributeItem(
                    attributeId: a.attributeId,
                    noteId: a.noteId,
                    type: AttributeItem.AttributeKind(rawValue: a.type) ?? .label,
                    name: a.name,
                    value: a.value,
                    position: a.position,
                    isInheritable: a.isInheritable
                )
            }
            note = NoteItem(
                noteId: cached.noteId,
                title: cached.title,
                type: NoteType(rawValue: cached.noteType) ?? .text,
                mime: cached.mime,
                isProtected: cached.isProtected,
                dateCreated: "",
                dateModified: "",
                parentNoteIds: cached.parentNoteIds,
                childNoteIds: cached.childNoteIds,
                parentBranchIds: cached.parentBranchIds,
                childBranchIds: cached.childBranchIds,
                attributes: attrs
            )
        }
    }

    private static func protectedSessionLikelyEnded(_ error: Error) -> Bool {
        let apiError = APIError.from(error)
        switch apiError {
        case .unauthorized:
            return true
        case .serverError(let code, let msg):
            if code == 401 || code == 403 { return true }
            if let msg, msg.localizedCaseInsensitiveContains("protect") { return true }
            return false
        default:
            return false
        }
    }

    private func loadContentFromCache() {
        guard let profileId = self.serverProfileId else { return }
        let nid = self.noteId
        if let cached = try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId),
           let data = cached.content {
            if cached.isProtected, !appState.protectedSessionActive {
                return
            }
            content = data
            let html = String(data: data, encoding: .utf8)
            rawContentString = html
            contentString = html
            checkForDraft()
        }
    }
}

struct ChildNoteSummary: Identifiable, Sendable {
    let noteId: String
    let title: String
    let isProtected: Bool
    let type: NoteType
    let iconClass: String?
    let childCount: Int

    var id: String { noteId }

    var resolvedIconName: String {
        NoteIconMapper.sfSymbol(for: iconClass) ?? type.iconName
    }
}
