import Foundation

/// When note metadata (`utcDateModified`) matches the cache, decides whether `getNoteContent` is still needed.
enum TriliumNoteBodyPolicy {
    /// Trilium’s canonical empty-note blob id (SHA256 of empty string).
    static let emptyBlobId = "z4PhNX7vuL3xVChQ1m2A"

    static func isKnownEmptyBlobId(_ blobId: String?) -> Bool {
        blobId == emptyBlobId
    }

    /// SwiftData row with `contentFetchedAt` and zero (or missing) bytes means the server body was confirmed empty.
    static func isConfirmedEmptyCachedBody(content: Data?, contentFetchedAt: Date?) -> Bool {
        guard contentFetchedAt != nil else { return false }
        guard let content else { return true }
        return content.isEmpty
    }

    static func isBodyConfirmedEmpty(
        serverBlobId: String?,
        cachedContent: Data?,
        contentFetchedAt: Date?
    ) -> Bool {
        isKnownEmptyBlobId(serverBlobId)
            || isConfirmedEmptyCachedBody(content: cachedContent, contentFetchedAt: contentFetchedAt)
    }

    /// Geo maps and book/collection parents may store JSON in the blob even when the rendered body looks empty.
    static func shouldFetchBodyDespiteFreshMeta(
        note: NoteItem,
        hasUsableBody: Bool,
        childNoteIds: [String]
    ) -> Bool {
        !hasUsableBody && (
            note.isSemanticGeoMap
            || ((note.type == .book || note.type == .collection) && !childNoteIds.isEmpty)
        )
    }

    static func shouldSkipGetNoteContentWhenMetaIsFresh(
        serverUtc: String?,
        cachedUtc: String?,
        serverBlobId: String?,
        cachedContent: Data?,
        contentFetchedAt: Date?,
        hasUsableBody: Bool,
        shouldFetchDespiteFreshMeta: Bool,
        forceFetchProtected: Bool
    ) -> Bool {
        guard let serverUtc, let cachedUtc, serverUtc <= cachedUtc, !forceFetchProtected else {
            return false
        }
        if shouldFetchDespiteFreshMeta { return false }
        if hasUsableBody { return true }
        return isBodyConfirmedEmpty(
            serverBlobId: serverBlobId,
            cachedContent: cachedContent,
            contentFetchedAt: contentFetchedAt
        )
    }
}
