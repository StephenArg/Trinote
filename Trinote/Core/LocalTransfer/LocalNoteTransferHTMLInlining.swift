import Foundation

/// Inlines Trilium `api/attachments` and `api/images` URLs as data URIs for device-to-device transfer.
@MainActor
enum LocalNoteTransferHTMLInlining {
    static func inlineAttachmentImages(
        in html: String,
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        serverProfileId: String,
        hostNoteId: String,
        parentNoteIds: [String]
    ) async -> String {
        await TriliumInlineImageCaching.inlineAttachmentImages(
            in: html,
            client: client,
            persistence: persistence,
            serverProfileId: serverProfileId,
            sourceNoteId: hostNoteId,
            parentNoteIds: parentNoteIds
        )
    }
}
