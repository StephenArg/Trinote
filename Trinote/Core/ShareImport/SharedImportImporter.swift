import Foundation

enum SharedImportImporter {
    enum ImportError: LocalizedError, Equatable {
        case noActiveProfile
        case emptyPayload
        case missingFileData

        var errorDescription: String? {
            switch self {
            case .noActiveProfile:
                String(localized: "No server profile is active.", comment: "Share import error")
            case .emptyPayload:
                String(localized: "Shared content could not be read.", comment: "Share import error")
            case .missingFileData:
                String(localized: "The shared file could not be read.", comment: "Share import error")
            }
        }
    }

    struct Result: Sendable {
        let noteId: String
        let title: String
        /// Non-nil when a non-image file was queued for upload (same path as toolbar attachments).
        let pendingAttachmentTitle: String?
        /// False for an image or file note: there's nothing to edit, so it opens to read.
        var opensInEditor = true
    }

    /// The note types a share can become, in the order they're offered. A picture or file can be a note of its own
    /// (Trilium's image or file note) or go into a text note; text and Markdown always become a text note.
    static func noteTypeChoices(for kind: SharedImportKind) -> [NoteType] {
        switch kind {
        case .image: [.image, .text]
        case .file: [.file, .text]
        case .plainText, .markdown: [.text]
        }
    }

    /// Shared bytes as an image or file note of their own, as Trilium's import makes one from a single picture or file:
    /// the bytes are the note's body, and `#originalFileName` keeps the file's name.
    struct ContentNote: Equatable, Sendable {
        /// `.image` or `.file`.
        let noteType: NoteType
        let mime: String
        let filename: String
        let data: Data
    }

    /// The image or file note `package` becomes. `title` names the file when the share carried no filename.
    static func contentNote(for package: SharedImportPackage, noteType: NoteType, title: String) throws -> ContentNote {
        guard let data = package.binaryData, !data.isEmpty else {
            throw ImportError.missingFileData
        }
        let payload = package.payload
        let mime: String
        if noteType == .image {
            mime = resolvedImageMIME(payload: payload, data: data)
        } else {
            let declared = payload.mimeType?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            mime = declared.isEmpty ? "application/octet-stream" : declared
        }
        let name = payload.filename?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let filename = name.isEmpty ? OfficeMimeTypes.filename(fromTitle: title, mime: mime) : name
        return ContentNote(noteType: noteType, mime: mime, filename: filename, data: data)
    }

    /// Makes the image or file note on the device, as a text share is made: it shows at once, and the creation queue
    /// makes it on the server later. Its bytes follow as a pending body upload once the note exists there.
    @MainActor
    static func queueContentNote(
        _ note: ContentNote,
        title: String,
        parentNoteId: String,
        persistence: PersistenceManager,
        serverProfileId: String
    ) throws -> Result {
        let (noteId, _) = try persistence.createOfflineChildNote(
            parentNoteId: parentNoteId,
            title: title,
            noteType: note.noteType.triliumStorageType,
            mime: note.mime,
            initialContent: "",
            serverProfileId: serverProfileId,
            initialAttributes: [NoteCreationAttribute(type: "label", name: originalFileNameLabel, value: note.filename)],
            cachedContent: note.data
        )
        try persistence.upsertPendingNoteBodyUpload(
            noteId: noteId,
            body: note.data,
            mime: note.mime,
            serverProfileId: serverProfileId
        )
        return Result(noteId: noteId, title: title, pendingAttachmentTitle: nil, opensInEditor: false)
    }

    /// Makes the image or file note on the server right away and caches it, so the note opens without another round
    /// trip. A note whose upload fails is deleted again (to Trilium's trash) rather than left empty.
    @MainActor
    static func createContentNoteOnServer(
        _ note: ContentNote,
        title: String,
        parentNoteId: String,
        client: any TriliumClientProtocol,
        persistence: PersistenceManager,
        serverProfileId: String
    ) async throws -> Result {
        let created = try await client.createNote(CreateNoteRequest(
            parentNoteId: parentNoteId,
            title: title,
            type: note.noteType.triliumStorageType,
            mime: note.mime,
            content: "",
            notePosition: nil,
            prefix: nil,
            isProtected: nil,
            noteId: nil,
            branchId: nil,
            templateNoteId: nil
        ))
        let noteId = created.note.noteId
        do {
            try await client.uploadNoteFileContent(
                noteId: noteId,
                data: note.data,
                filename: note.filename,
                contentType: note.mime,
                savesRevision: false
            )
        } catch {
            try? await client.deleteNote(noteId, eraseNotes: false)
            throw error
        }
        // The upload set the mime and `#originalFileName`; read them back for the cache.
        let saved = (try? await client.getNote(noteId)) ?? created.note
        let policy = CacheExclusionPolicy(persistence: persistence)
        try? persistence.cacheNoteIfAllowed(from: saved, serverProfileId: serverProfileId, policy: policy)
        for attribute in saved.attributes {
            try? persistence.cacheAttributeBatchIfAllowed(
                from: attribute,
                parentNoteIds: saved.parentNoteIds,
                serverProfileId: serverProfileId,
                policy: policy
            )
        }
        try? persistence.cacheBranchIfAllowed(
            from: created.branch,
            parentNoteIdsForNote: saved.parentNoteIds,
            serverProfileId: serverProfileId,
            policy: policy
        )
        try? persistence.cacheNoteContentIfAllowed(
            noteId,
            content: note.data,
            parentNoteIds: saved.parentNoteIds,
            serverProfileId: serverProfileId,
            utcDateModified: saved.utcDateModified,
            policy: policy
        )
        try? persistence.commitBatch()
        return Result(noteId: noteId, title: saved.title, pendingAttachmentTitle: nil, opensInEditor: false)
    }

    /// Trilium's label for the name of the file an image or file note was made from.
    static let originalFileNameLabel = "originalFileName"

    /// Creates a text note under `parentNoteId` and applies shared content by kind.
    /// - Parameter titleOverride: When non-nil/non-empty after trimming, used as the note title.
    @MainActor
    static func importPackage(
        _ package: SharedImportPackage,
        parentNoteId: String,
        persistence: PersistenceManager,
        serverProfileId: String,
        titleOverride: String? = nil
    ) throws -> Result {
        let payload = package.payload
        let title: String = {
            if let override = titleOverride?.trimmingCharacters(in: .whitespacesAndNewlines), !override.isEmpty {
                return override
            }
            return resolvedTitle(for: payload, imageData: package.binaryData)
        }()
        let initialContent: String
        let attachment: (data: Data, filename: String, mime: String)?
        switch payload.kind {
        case .image:
            if let data = package.binaryData, !data.isEmpty {
                let mime = resolvedImageMIME(payload: payload, data: data)
                let base64 = data.base64EncodedString()
                // Use figure-wrapped img (Trilium/TipTap image block). A bare `<p><img>` becomes an
                // empty paragraph above the image in the editor.
                initialContent = "<figure class=\"image\"><img src=\"data:\(mime);base64,\(base64)\"></figure>"
            } else {
                initialContent = "<p></p>"
            }
            attachment = nil

        case .plainText:
            let text = payload.text
                ?? package.binaryData.flatMap { String(data: $0, encoding: .utf8) }
                ?? ""
            initialContent = PlainTextToNoteHTML.convert(text)
            attachment = nil

        case .markdown:
            let text = payload.text
                ?? package.binaryData.flatMap { String(data: $0, encoding: .utf8) }
                ?? ""
            initialContent = MarkdownToNoteHTML.convert(text)
            attachment = nil

        case .file:
            guard let data = package.binaryData, !data.isEmpty else {
                throw ImportError.missingFileData
            }
            let filename = payload.filename?.trimmingCharacters(in: .whitespacesAndNewlines)
            let resolvedName = (filename?.isEmpty == false) ? filename! : "attachment"
            let mime = payload.mimeType?.trimmingCharacters(in: .whitespacesAndNewlines)
            let resolvedMIME = (mime?.isEmpty == false) ? mime! : "application/octet-stream"
            initialContent = ""
            attachment = (data, resolvedName, resolvedMIME)
        }

        if initialContent.isEmpty, attachment == nil, payload.text == nil, package.binaryData == nil {
            throw ImportError.emptyPayload
        }

        let (noteId, _) = try persistence.createOfflineChildNote(
            parentNoteId: parentNoteId,
            title: title,
            noteType: NoteType.text.triliumStorageType,
            mime: NoteType.text.creationMime,
            initialContent: initialContent,
            serverProfileId: serverProfileId
        )

        var pendingAttachmentTitle: String?
        if let attachment {
            try persistence.enqueuePendingAttachmentImport(
                noteId: noteId,
                role: "file",
                mime: attachment.mime,
                title: attachment.filename,
                position: 0,
                data: attachment.data,
                serverProfileId: serverProfileId
            )
            pendingAttachmentTitle = attachment.filename
        }

        return Result(noteId: noteId, title: title, pendingAttachmentTitle: pendingAttachmentTitle)
    }

    static func resolvedTitle(for payload: SharedImportPayload, imageData: Data? = nil) -> String {
        if let name = payload.filename?.trimmingCharacters(in: .whitespacesAndNewlines), !name.isEmpty {
            let base = (name as NSString).deletingPathExtension
            let trimmed = base.trimmingCharacters(in: .whitespacesAndNewlines)
            if !trimmed.isEmpty {
                if !SharedImportTitle.isGenericPlaceholderBasename(trimmed) {
                    return trimmed
                }
                // Generic placeholders like "shared-image.jpg" fall through to kind-based defaults.
            } else if !SharedImportTitle.isGenericPlaceholderBasename(name) {
                return name
            }
        }
        switch payload.kind {
        case .image:
            let date = SharedImportTitle.preferredImageTitleDate(fromImageData: imageData)
            return SharedImportTitle.timestampedImageTitle(at: date)
        case .plainText, .markdown:
            if let text = payload.text?.trimmingCharacters(in: .whitespacesAndNewlines), !text.isEmpty {
                let firstLine = text.split(whereSeparator: \.isNewline).first.map(String.init) ?? text
                if firstLine.count <= 60 { return firstLine }
                return String(firstLine.prefix(57)) + "…"
            }
            return String(localized: "Shared note", comment: "Default title for shared text note")
        case .file:
            return String(localized: "Shared file", comment: "Default title for shared file note")
        }
    }

    private static func resolvedImageMIME(payload: SharedImportPayload, data: Data) -> String {
        if let mime = payload.mimeType?.trimmingCharacters(in: .whitespacesAndNewlines),
           mime.hasPrefix("image/") {
            return mime
        }
        return data.detectImageMIME()
    }
}
