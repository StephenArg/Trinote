import Foundation
import Observation
import UIKit

@Observable
@MainActor
final class NoteDetailViewModel {
    var note: NoteItem?
    var content: Data?
    var contentString: String?
    var attachments: [AttachmentItem] = []
    var breadcrumbs: [BreadcrumbItem] = []
    var isLoading = false
    var isLoadingContent = false
    var error: String?
    var isFromCache = false

    // Editing
    var isEditing = false
    var editableContent = ""
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

    let noteId: String
    private let appState: AppState
    private let persistence = PersistenceManager.shared
    private var draftAutoSaveTask: Task<Void, Never>?
    private var serverContentHash: Int?

    init(noteId: String, appState: AppState) {
        self.noteId = noteId
        self.appState = appState
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }
    var isOnline: Bool { appState.isOnline }
    var serverBaseURL: URL? { (appState.client as? TriliumClient)?.baseURL }

    // MARK: - Loading

    func load() async {
        let nid = self.noteId
        guard let client else {
            loadFromCache()
            return
        }
        isLoading = true
        error = nil
        defer { isLoading = false }

        do {
            let response = try await client.getNote(nid)
            self.note = NoteItem(from: response)
            self.isFromCache = false

            if let profileId = self.serverProfileId {
                try? self.persistence.cacheNote(from: response, serverProfileId: profileId)
                try? self.persistence.commitBatch()
                try? self.persistence.recordRecentNote(
                    noteId: nid,
                    title: response.title,
                    noteType: response.type,
                    serverProfileId: profileId
                )

                for attr in response.attributes {
                    try? self.persistence.cacheAttributeBatch(from: attr, serverProfileId: profileId)
                }
                try? self.persistence.commitBatch()
            }
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            self.error = apiError.localizedDescription
            self.loadFromCache()
        }
    }

    func loadContent() async {
        let nid = self.noteId
        guard let client else {
            loadContentFromCache()
            return
        }

        if let note = self.note, note.isProtected {
            self.needsProtectedSession = true
            return
        }

        isLoadingContent = true
        defer { isLoadingContent = false }

        do {
            let data = try await client.getNoteContent(nid)
            self.content = data
            var htmlString = String(data: data, encoding: .utf8)
            self.serverContentHash = htmlString?.hashValue

            if let html = htmlString {
                htmlString = await self.inlineAttachmentImages(in: html, client: client)
            }
            self.contentString = htmlString

            if let profileId = self.serverProfileId {
                try? self.persistence.cacheNoteContent(nid, content: data, serverProfileId: profileId)
            }

            self.checkForDraft()

        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            Log.api.error("Failed to load note content")
            self.loadContentFromCache()
        }
    }

    /// Finds Trilium image `src` URLs in HTML and replaces them with
    /// base64 data URIs downloaded via the authenticated API client.
    ///
    /// Handles two formats:
    ///   - `api/attachments/{attachmentId}/image/{filename}` (attachment images)
    ///   - `api/images/{noteId}/{filename}` (image notes)
    private func inlineAttachmentImages(in html: String, client: any TriliumClientProtocol) async -> String {
        var result = html

        // Match both attachment images and note images
        let pattern = try! NSRegularExpression(
            pattern: #"src=["'](?:/?api/(attachments|images)/([a-zA-Z0-9_]+)/[^"']*)["']"#,
            options: []
        )
        let nsHTML = html as NSString
        let matches = pattern.matches(in: html, range: NSRange(location: 0, length: nsHTML.length))

        for match in matches.reversed() {
            guard match.numberOfRanges >= 3 else { continue }
            let routeType = nsHTML.substring(with: match.range(at: 1))
            let entityId = nsHTML.substring(with: match.range(at: 2))
            let fullMatch = nsHTML.substring(with: match.range)

            do {
                let imageData: Data
                if routeType == "attachments" {
                    imageData = try await client.getAttachmentContent(entityId)
                } else {
                    imageData = try await client.getNoteContent(entityId)
                }
                let mime = imageData.detectImageMIME()
                let b64 = imageData.base64EncodedString()
                let dataURI = "data:\(mime);base64,\(b64)"
                let replacement = "src=\"\(dataURI)\""
                result = (result as NSString).replacingCharacters(
                    in: (result as NSString).range(of: fullMatch),
                    with: replacement
                )
            } catch {
                Log.api.error("Failed to download image \(routeType)/\(entityId)")
            }
        }

        return result
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

    func startEditing() {
        if !hasDraft {
            editableContent = contentString ?? ""
        }
        isEditing = true
        startDraftAutoSave()
    }

    func cancelEditing() {
        draftAutoSaveTask?.cancel()
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
        guard let profileId = self.serverProfileId else { return }
        try? self.persistence.saveDraft(noteId: self.noteId, content: self.editableContent, serverProfileId: profileId)
    }

    // MARK: - Saving

    func saveContent() async {
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
                Log.api.warning("Could not verify server content before save")
            }
        }

        do {
            let data = Data(self.editableContent.utf8)
            try await client.updateNoteContent(nid, content: data, contentType: note.mime)
            self.content = data
            self.contentString = self.editableContent
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
            self.saveError = APIError.from(error).localizedDescription
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
            return true
        } catch {
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

    // MARK: - Cache Fallback

    private func loadFromCache() {
        guard let profileId = self.serverProfileId else { return }
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
            isFromCache = true
        }
    }

    private func loadContentFromCache() {
        guard let profileId = self.serverProfileId else { return }
        let nid = self.noteId
        if let cached = try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId),
           let data = cached.content {
            content = data
            contentString = String(data: data, encoding: .utf8)
            isFromCache = true
            checkForDraft()
        }
    }
}
