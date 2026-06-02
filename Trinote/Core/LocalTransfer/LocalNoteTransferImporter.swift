import Foundation

enum LocalNoteTransferImporter {
    enum ImportError: LocalizedError {
        case noActiveProfile

        var errorDescription: String? {
            switch self {
            case .noActiveProfile:
                String(localized: "No server profile is active.", comment: "Local transfer import")
            }
        }
    }

    @MainActor
    static func importBundle(
        _ bundle: NoteTransferBundle,
        parentNoteId: String,
        persistence: PersistenceManager,
        serverProfileId: String
    ) throws -> String {
        let initialContent: String
        if let text = bundle.textContent {
            initialContent = text
        } else {
            initialContent = ""
        }

        let (noteId, _) = try persistence.createOfflineChildNote(
            parentNoteId: parentNoteId,
            title: bundle.title,
            noteType: bundle.noteType,
            mime: bundle.mime,
            initialContent: initialContent,
            serverProfileId: serverProfileId
        )

        if let binary = bundle.binaryContent, !binary.isEmpty {
            try persistence.upsertPendingNoteBodyUpload(
                noteId: noteId,
                body: binary,
                mime: bundle.mime,
                serverProfileId: serverProfileId
            )
        } else if initialContent.isEmpty,
                  bundle.textContent == nil,
                  bundle.binaryContent == nil {
            // Empty note — nothing extra.
        }

        for attachment in bundle.attachments {
            try persistence.enqueuePendingAttachmentImport(
                noteId: noteId,
                role: attachment.role,
                mime: attachment.mime,
                title: attachment.title,
                position: attachment.position,
                data: attachment.data,
                serverProfileId: serverProfileId
            )
        }

        return noteId
    }
}
