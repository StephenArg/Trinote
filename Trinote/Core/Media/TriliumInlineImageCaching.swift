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

    /// Concurrent `getAttachmentContent` / `getNoteContent` fetches while inlining one note.
    private static let maxConcurrentImageFetches = 4

    static func hasResolvableInlineImageURLs(in html: String) -> Bool {
        html.containsASCIICaseInsensitive("api/attachments/")
            || html.containsASCIICaseInsensitive("api/images/")
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

    /// Rewrites Trilium image attributes into URLs the read-only `WKWebView` can actually load.
    ///
    /// Attachments become `trinote-img://` references served by `TriliumImageSchemeHandler`, which needs no
    /// bytes here at all: the body stays the size of its text and the note paints without waiting on a single
    /// download. `api/images/{noteId}` is different — it can point at a mermaid, canvas, or text note whose
    /// content is not image bytes, and the read-only view card-wraps those instead of rendering them, a
    /// decision that can only be made with the bytes in hand. Those are still resolved (once per reference,
    /// a bounded number of fetches in flight) and rewritten to `trinote-img://` off the main actor.
    static func inlineAttachmentImages(
        in html: String,
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        serverProfileId: String,
        sourceNoteId: String,
        parentNoteIds: [String]
    ) async -> String {
        let matches = inlineImageMatches(in: html)
        guard !matches.isEmpty else { return html }

        var seen = Set<Reference>()
        let noteImageReferences = matches.map(\.reference)
            .filter { $0.routeType.lowercased() == "images" }
            .filter { seen.insert($0).inserted }

        var resolvedImages: [Reference: Data] = [:]
        if !noteImageReferences.isEmpty {
            resolvedImages = await imageData(
                for: noteImageReferences,
                client: client,
                persistence: persistence,
                serverProfileId: serverProfileId,
                sourceNoteId: sourceNoteId,
                parentNoteIds: parentNoteIds
            )
        }

        return await Task.detached(priority: .userInitiated) {
            rewritingImageURLs(html: html, matches: matches, imageData: resolvedImages)
        }.value
    }

    /// One matched attribute, resolved to the image it points at.
    private struct InlineImageMatch: Sendable {
        let range: NSRange
        let attribute: String
        let quote: String
        let reference: Reference
    }

    private static func inlineImageMatches(in html: String) -> [InlineImageMatch] {
        let htmlNS = html as NSString
        let fullRange = NSRange(location: 0, length: htmlNS.length)
        return imageURLPattern.matches(in: html, options: [], range: fullRange).compactMap { match in
            guard match.numberOfRanges >= 6 else { return nil }
            return InlineImageMatch(
                range: match.range,
                attribute: htmlNS.substring(with: match.range(at: 1)),
                quote: htmlNS.substring(with: match.range(at: 2)),
                reference: Reference(
                    routeType: htmlNS.substring(with: match.range(at: 4)),
                    entityId: htmlNS.substring(with: match.range(at: 5))
                )
            )
        }
    }

    /// Bytes for every reference that resolves, cache first and then a bounded number of fetches in flight.
    /// References that resolve to nothing are simply absent, leaving their URLs untouched.
    private static func imageData(
        for references: [Reference],
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        serverProfileId: String,
        sourceNoteId: String,
        parentNoteIds: [String]
    ) async -> [Reference: Data] {
        var resolved: [Reference: Data] = [:]
        var needsFetch: [Reference] = []
        for reference in references {
            if let cached = plausibleCachedImage(
                entityId: reference.entityId,
                entityType: reference.routeType,
                serverProfileId: serverProfileId,
                persistence: persistence
            ) {
                resolved[reference] = cached
            } else {
                needsFetch.append(reference)
            }
        }

        guard let client, !needsFetch.isEmpty else { return resolved }
        guard !shouldSkipImageCaching(
            sourceNoteId: sourceNoteId,
            parentNoteIds: parentNoteIds,
            serverProfileId: serverProfileId
        ) else {
            return resolved
        }

        let fetch: @Sendable (Reference) async -> (Reference, Data?) = { reference in
            let data = await downloadAndCache(
                routeType: reference.routeType,
                entityId: reference.entityId,
                client: client,
                persistence: persistence,
                serverProfileId: serverProfileId,
                sourceNoteId: sourceNoteId,
                parentNoteIds: parentNoteIds
            )
            return (reference, data)
        }

        await withTaskGroup(of: (Reference, Data?).self) { group in
            var started = 0
            while started < min(maxConcurrentImageFetches, needsFetch.count) {
                let reference = needsFetch[started]
                group.addTask { await fetch(reference) }
                started += 1
            }
            while let (reference, data) = await group.next() {
                if let data { resolved[reference] = data }
                guard started < needsFetch.count else { continue }
                let next = needsFetch[started]
                started += 1
                group.addTask { await fetch(next) }
            }
        }
        return resolved
    }

    /// Replaces from the end of the body so earlier ranges stay valid as lengths change.
    ///
    /// Note-image references with no resolved bytes are left untouched, which is what lets
    /// `annotateImageLinkApiImageTagsMissingNoteId` recognise and card-wrap them afterwards.
    private nonisolated static func rewritingImageURLs(
        html: String,
        matches: [InlineImageMatch],
        imageData: [Reference: Data]
    ) -> String {
        let result = NSMutableString(string: html)
        for match in matches.reversed() {
            let replacement: String
            if match.reference.routeType.lowercased() == "images" {
                // Only rewrite when we already know this note is image bytes. Mermaid/canvas/text
                // targets stay as `api/images/…` so `annotateImageLinkApiImageTagsMissingNoteId`
                // can card-wrap them afterwards.
                guard imageData[match.reference] != nil else { continue }
                let escapedId = match.reference.entityId
                    .replacingOccurrences(of: "&", with: "&amp;")
                    .replacingOccurrences(of: "\"", with: "&quot;")
                let url = TriliumImageScheme.url(
                    routeType: match.reference.routeType,
                    entityId: match.reference.entityId
                )
                replacement = "\(match.attribute)=\(match.quote)\(url)\(match.quote)"
                    + " data-trinote-image-note-id=\(match.quote)\(escapedId)\(match.quote)"
            } else {
                let url = TriliumImageScheme.url(
                    routeType: match.reference.routeType,
                    entityId: match.reference.entityId
                )
                replacement = "\(match.attribute)=\(match.quote)\(url)\(match.quote)"
            }
            result.replaceCharacters(in: match.range, with: replacement)
        }
        return result as String
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

    /// Seeds the cache with bytes we just uploaded, so the read-only render that follows a save shows
    /// the image without downloading what we already had in hand.
    static func cacheUploadedImage(
        routeType: String,
        entityId: String,
        data: Data,
        persistence: PersistenceManager,
        serverProfileId: String,
        sourceNoteId: String?,
        parentNoteIds: [String]
    ) {
        persistPlausibleImage(
            entityId: entityId,
            entityType: routeType,
            data: data,
            serverProfileId: serverProfileId,
            persistence: persistence,
            sourceNoteId: sourceNoteId,
            parentNoteIds: parentNoteIds
        )
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
