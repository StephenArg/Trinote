import Foundation

/// Inlines Trilium `api/attachments` and `api/images` URLs as data URIs for device-to-device transfer.
@MainActor
enum LocalNoteTransferHTMLInlining {
    private static let imageURLPattern = try! NSRegularExpression(
        pattern: #"(?i)(src|data-src|data-cke-saved-src)=(["'])([^"']*?)api/(attachments|images)/([a-zA-Z0-9_-]+)/[^"']*\2"#,
        options: []
    )

    static func inlineAttachmentImages(
        in html: String,
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        serverProfileId: String
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

            guard let imageData = await loadImageData(
                routeType: routeType,
                entityId: entityId,
                client: client,
                persistence: persistence,
                serverProfileId: serverProfileId
            ), imageData.isPlausibleInlineImagePayload else {
                continue
            }

            let mime = imageData.detectImageMIME()
            let dataURI = "data:\(mime);base64,\(imageData.base64EncodedString())"
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

    private static func loadImageData(
        routeType: String,
        entityId: String,
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        serverProfileId: String
    ) async -> Data? {
        if let cached = try? persistence.fetchCachedImage(
            entityId: entityId,
            entityType: routeType,
            serverProfileId: serverProfileId
        ) {
            return cached.data
        }

        guard let client else { return nil }

        do {
            let data: Data
            if routeType.lowercased() == "attachments" {
                data = try await client.getAttachmentContent(entityId)
            } else {
                data = try await client.getNoteContent(entityId)
            }
            if data.isPlausibleInlineImagePayload {
                let mime = data.detectImageMIME()
                try? persistence.cacheImage(
                    entityId: entityId,
                    entityType: routeType,
                    data: data,
                    mime: mime,
                    serverProfileId: serverProfileId
                )
            }
            return data
        } catch {
            Log.api.error("Local transfer failed to load inline image \(routeType)/\(entityId): \(error)")
            return nil
        }
    }
}
