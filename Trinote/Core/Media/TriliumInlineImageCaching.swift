import Foundation

/// Shared Trilium `api/attachments` / `api/images` resolution and `CachedImageData` persistence.
@MainActor
enum TriliumInlineImageCaching {
    struct Reference: Hashable, Sendable {
        let routeType: String
        let entityId: String
    }

    private static let imageURLPattern = try! NSRegularExpression(
        pattern: #"(?i)(src|data-src|data-cke-saved-src)=(["'])([^"']*?)api/(attachments|images)/([a-zA-Z0-9_-]+)/[^"']*\2"#,
        options: []
    )

    static func hasResolvableInlineImageURLs(in html: String) -> Bool {
        html.localizedCaseInsensitiveContains("api/attachments/")
            || html.localizedCaseInsensitiveContains("api/images/")
    }

    /// Unique `(routeType, entityId)` pairs referenced in HTML attributes.
    static func extractImageReferences(from html: String) -> Set<Reference> {
        let htmlNS = html as NSString
        let fullRange = NSRange(location: 0, length: htmlNS.length)
        let matches = imageURLPattern.matches(in: html, options: [], range: fullRange)
        var refs = Set<Reference>()
        refs.reserveCapacity(matches.count)
        for match in matches {
            guard match.numberOfRanges >= 6 else { continue }
            let routeType = htmlNS.substring(with: match.range(at: 4))
            let entityId = htmlNS.substring(with: match.range(at: 5))
            refs.insert(Reference(routeType: routeType, entityId: entityId))
        }
        return refs
    }

    /// Rewrites matching attributes to base64 data URIs where image bytes are available locally or online.
    static func inlineAttachmentImages(
        in html: String,
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        serverProfileId: String,
        sourceNoteId: String,
        parentNoteIds: [String]
    ) async -> String {
        let htmlNS = html as NSString
        let fullRange = NSRange(location: 0, length: htmlNS.length)
        let matches = imageURLPattern.matches(in: html, options: [], range: fullRange)
        guard !matches.isEmpty else { return html }

        let ms = NSMutableString(string: html)
        for match in matches.sorted(by: { $0.range.location > $1.range.location }) {
            guard match.numberOfRanges >= 6 else { continue }
            let attr = htmlNS.substring(with: match.range(at: 1))
            let quote = htmlNS.substring(with: match.range(at: 2))
            let routeType = htmlNS.substring(with: match.range(at: 4))
            let entityId = htmlNS.substring(with: match.range(at: 5))

            guard let data = await loadImageData(
                routeType: routeType,
                entityId: entityId,
                client: client,
                persistence: persistence,
                serverProfileId: serverProfileId,
                sourceNoteId: sourceNoteId,
                parentNoteIds: parentNoteIds
            ), data.isPlausibleInlineImagePayload else {
                continue
            }

            let mime = data.detectImageMIME()
            let b64 = data.base64EncodedString()
            let dataURI = "data:\(mime);base64,\(b64)"
            let replacement: String
            if routeType.lowercased() == "images" {
                let escId = entityId
                    .replacingOccurrences(of: "&", with: "&amp;")
                    .replacingOccurrences(of: "\"", with: "&quot;")
                replacement = "\(attr)=\(quote)\(dataURI)\(quote) data-trinote-image-note-id=\(quote)\(escId)\(quote)"
            } else {
                replacement = "\(attr)=\(quote)\(dataURI)\(quote)"
            }
            ms.replaceCharacters(in: match.range, with: replacement)
        }

        return ms as String
    }

    /// Loads image bytes from cache or network and persists plausible payloads. Returns nil when unavailable.
    static func loadImageData(
        routeType: String,
        entityId: String,
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        serverProfileId: String,
        sourceNoteId: String? = nil,
        parentNoteIds: [String] = []
    ) async -> Data? {
        if let cached = plausibleCachedImage(
            entityId: entityId,
            entityType: routeType,
            serverProfileId: serverProfileId,
            persistence: persistence
        ) {
            Log.api.debug("Image cache hit: \(routeType)/\(entityId)")
            return cached
        }

        guard let client else { return nil }
        if shouldSkipImageCaching(
            sourceNoteId: sourceNoteId,
            parentNoteIds: parentNoteIds,
            serverProfileId: serverProfileId
        ) {
            return nil
        }

        if let data = await downloadAndCache(
            routeType: routeType,
            entityId: entityId,
            client: client,
            persistence: persistence,
            serverProfileId: serverProfileId,
            sourceNoteId: sourceNoteId,
            parentNoteIds: parentNoteIds
        ) {
            return data
        }
        return nil
    }

    /// Downloads and caches a single reference when not already cached. Returns true when plausible bytes are stored.
    @discardableResult
    static func fetchAndCache(
        reference: Reference,
        client: any TriliumClientProtocol,
        persistence: PersistenceManager,
        serverProfileId: String,
        sourceNoteId: String,
        parentNoteIds: [String]
    ) async -> Bool {
        if plausibleCachedImage(
            entityId: reference.entityId,
            entityType: reference.routeType,
            serverProfileId: serverProfileId,
            persistence: persistence
        ) != nil {
            return true
        }
        if shouldSkipImageCaching(
            sourceNoteId: sourceNoteId,
            parentNoteIds: parentNoteIds,
            serverProfileId: serverProfileId
        ) {
            return false
        }
        return await downloadAndCache(
            routeType: reference.routeType,
            entityId: reference.entityId,
            client: client,
            persistence: persistence,
            serverProfileId: serverProfileId,
            sourceNoteId: sourceNoteId,
            parentNoteIds: parentNoteIds
        ) != nil
    }

    static func canvasExportSVGAttachmentId(noteId: String, client: any TriliumClientProtocol) async -> String? {
        do {
            let list = try await client.getNoteAttachments(noteId)
            if let hit = list.first(where: { $0.title == "canvas-export.svg" && $0.mime == "image/svg+xml" }) {
                return hit.attachmentId
            }
            return list.first { $0.title == "canvas-export.svg" }?.attachmentId
        } catch {
            Log.api.debug("canvas-export.svg lookup failed for \(noteId): \(error)")
            return nil
        }
    }

    // MARK: - Private

    private static func shouldSkipImageCaching(
        sourceNoteId: String?,
        parentNoteIds: [String],
        serverProfileId: String
    ) -> Bool {
        guard let sourceNoteId, !serverProfileId.isEmpty else { return false }
        return CacheExclusionPolicy().isNoteExcludedFromCache(
            noteId: sourceNoteId,
            parentNoteIds: parentNoteIds,
            serverProfileId: serverProfileId
        )
    }

    private static func plausibleCachedImage(
        entityId: String,
        entityType: String,
        serverProfileId: String,
        persistence: PersistenceManager
    ) -> Data? {
        guard let cached = try? persistence.fetchCachedImage(
            entityId: entityId,
            entityType: entityType,
            serverProfileId: serverProfileId
        ) else {
            return nil
        }
        guard cached.data.isPlausibleInlineImagePayload else { return nil }
        return cached.data
    }

    private static func persistPlausibleImage(
        entityId: String,
        entityType: String,
        data: Data,
        serverProfileId: String,
        persistence: PersistenceManager,
        sourceNoteId: String?,
        parentNoteIds: [String]
    ) {
        guard data.isPlausibleInlineImagePayload else { return }
        let mime = data.detectImageMIME()
        do {
            if let sourceNoteId {
                try persistence.cacheImageIfAllowed(
                    entityId: entityId,
                    entityType: entityType,
                    data: data,
                    mime: mime,
                    sourceNoteId: sourceNoteId,
                    parentNoteIds: parentNoteIds,
                    serverProfileId: serverProfileId,
                    policy: CacheExclusionPolicy()
                )
            } else {
                try persistence.cacheImage(
                    entityId: entityId,
                    entityType: entityType,
                    data: data,
                    mime: mime,
                    serverProfileId: serverProfileId
                )
            }
            Log.api.debug("Cached image: \(entityType)/\(entityId)")
        } catch {
            Log.api.warning("Failed to cache image: \(error)")
        }
    }

    @discardableResult
    private static func downloadAndCache(
        routeType: String,
        entityId: String,
        client: any TriliumClientProtocol,
        persistence: PersistenceManager,
        serverProfileId: String,
        sourceNoteId: String?,
        parentNoteIds: [String]
    ) async -> Data? {
        do {
            if routeType.lowercased() == "attachments" {
                let data = try await client.getAttachmentContent(entityId)
                persistPlausibleImage(
                    entityId: entityId,
                    entityType: routeType,
                    data: data,
                    serverProfileId: serverProfileId,
                    persistence: persistence,
                    sourceNoteId: sourceNoteId,
                    parentNoteIds: parentNoteIds
                )
                return data.isPlausibleInlineImagePayload ? data : nil
            }

            let noteBody = try await client.getNoteContent(entityId)
            if noteBody.isPlausibleInlineImagePayload {
                persistPlausibleImage(
                    entityId: entityId,
                    entityType: routeType,
                    data: noteBody,
                    serverProfileId: serverProfileId,
                    persistence: persistence,
                    sourceNoteId: sourceNoteId,
                    parentNoteIds: parentNoteIds
                )
                return noteBody
            }

            if isCanvasLinkedNote(entityId: entityId, serverProfileId: serverProfileId, persistence: persistence),
               let attachmentId = await canvasExportSVGAttachmentId(noteId: entityId, client: client) {
                let svgData = try await client.getAttachmentContent(attachmentId)
                persistPlausibleImage(
                    entityId: attachmentId,
                    entityType: "attachments",
                    data: svgData,
                    serverProfileId: serverProfileId,
                    persistence: persistence,
                    sourceNoteId: sourceNoteId,
                    parentNoteIds: parentNoteIds
                )
                return svgData.isPlausibleInlineImagePayload ? svgData : nil
            }

            return nil
        } catch {
            Log.api.error("Failed to download image \(routeType)/\(entityId): \(error)")
            return nil
        }
    }

    private static func isCanvasLinkedNote(
        entityId: String,
        serverProfileId: String,
        persistence: PersistenceManager
    ) -> Bool {
        guard let cached = try? persistence.fetchCachedNote(id: entityId, serverProfileId: serverProfileId) else {
            return false
        }
        return cached.noteType == NoteType.canvas.rawValue
    }
}
