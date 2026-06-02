import Foundation

enum LocalNoteTransferBundleBuilder {
    enum BuildError: LocalizedError {
        case noteNotFound
        case contentUnavailable
        case protectedNote

        var errorDescription: String? {
            switch self {
            case .noteNotFound:
                String(localized: "Note not found.", comment: "Local transfer bundle build")
            case .contentUnavailable:
                String(
                    localized: "Note content is not available offline. Open the note while connected, then try again.",
                    comment: "Local transfer needs cached content"
                )
            case .protectedNote:
                String(localized: "Protected notes cannot be shared locally.", comment: "Local transfer protected")
            }
        }
    }

    @MainActor
    static func build(
        noteId: String,
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        serverProfileId: String,
        protectedSessionActive: Bool
    ) async throws -> NoteTransferBundle {
        let cached = try persistence.fetchCachedNote(id: noteId, serverProfileId: serverProfileId)
        guard let cached else { throw BuildError.noteNotFound }
        if cached.isProtected, !protectedSessionActive { throw BuildError.protectedNote }

        var bodyData: Data?
        if let cachedBody = cached.content, !cachedBody.isEmpty {
            bodyData = cachedBody
        } else if let client {
            bodyData = try await client.getNoteContent(noteId)
        }

        guard let bodyData else { throw BuildError.contentUnavailable }

        var (textContent, binaryContent) = splitContent(
            data: bodyData,
            type: cached.noteType,
            mime: cached.mime
        )

        if var html = textContent,
           html.localizedCaseInsensitiveContains("api/attachments/")
               || html.localizedCaseInsensitiveContains("api/images/") {
            html = await LocalNoteTransferHTMLInlining.inlineAttachmentImages(
                in: html,
                client: client,
                persistence: persistence,
                serverProfileId: serverProfileId
            )
            textContent = html
        }

        var attachments: [LocalTransferAttachmentPayload] = []
        if let client {
            let attachmentList = try await client.getNoteAttachments(noteId)
            for item in attachmentList {
                let bytes = try await client.getAttachmentContent(item.attachmentId)
                attachments.append(
                    LocalTransferAttachmentPayload(
                        role: item.role,
                        mime: item.mime,
                        title: item.title,
                        position: item.position,
                        data: bytes
                    )
                )
            }
        }

        return NoteTransferBundle(
            transferVersion: LocalNoteTransferConstants.transferProtocolVersion,
            title: cached.title,
            noteType: cached.noteType,
            mime: cached.mime,
            textContent: textContent,
            binaryContent: binaryContent,
            attachments: attachments
        )
    }

    /// Mirrors `TriliumClient.initialCreateContentForDuplicate`.
    static func splitContent(data: Data, type: String, mime: String) -> (String?, Data?) {
        let textLike = mime.hasPrefix("text/")
            || mime.contains("json")
            || type == "code"
            || type == "text"
            || type == "relation"
            || type == "mermaid"
        if textLike, let s = String(data: data, encoding: .utf8) {
            return (s, nil)
        }
        if data.isEmpty {
            return ("", nil)
        }
        return (nil, data)
    }
}
