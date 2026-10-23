import Foundation
import ImageIO
import UniformTypeIdentifiers

/// One of a link preview's pictures, ready to store.
struct LinkPreviewPicture: Equatable, Sendable {
    let data: Data
    let mime: String
}

/// Shapes a downloaded favicon or cover image the way Trilium's server does before it keeps one.
enum LinkPreviewPictureEncoder {
    /// Trilium's limits (`routes/api/link_embed.ts`).
    static let maxFaviconDownload = 256 * 1024
    static let maxFaviconSize = 64 * 1024
    static let faviconTargetEdge = 48
    static let maxImageDownload = 5 * 1024 * 1024
    static let imageMaxDimension = 256
    static let imageJPEGQuality = 0.75
    static let maxVerbatimImageSize = 100 * 1024

    /// A favicon to keep: an SVG as it is, or the frame of an icon file that suits a 16pt drawing on a 3x screen
    /// (the smallest of at least 48px, else the largest) as PNG. Nil for anything that isn't a picture.
    static func favicon(from data: Data) -> LinkPreviewPicture? {
        if data.isSVG {
            return data.count <= maxFaviconSize ? LinkPreviewPicture(data: data, mime: "image/svg+xml") : nil
        }
        guard let source = CGImageSourceCreateWithData(data as CFData, nil), CGImageSourceGetCount(source) > 0 else { return nil }
        var best: (index: Int, edge: Int)?
        for index in 0..<CGImageSourceGetCount(source) {
            guard let properties = CGImageSourceCopyPropertiesAtIndex(source, index, nil) as? [CFString: Any],
                  let width = properties[kCGImagePropertyPixelWidth] as? Int,
                  let height = properties[kCGImagePropertyPixelHeight] as? Int
            else { continue }
            let edge = max(width, height)
            guard let current = best else { best = (index, edge); continue }
            let fits = edge >= faviconTargetEdge
            let currentFits = current.edge >= faviconTargetEdge
            if (fits && (!currentFits || edge < current.edge)) || (!fits && !currentFits && edge > current.edge) {
                best = (index, edge)
            }
        }
        guard let best,
              let image = thumbnail(of: source, index: best.index, maxPixelSize: max(faviconTargetEdge, min(best.edge, 96))),
              let png = encode(image, type: .png, quality: nil),
              png.count <= maxFaviconSize
        else { return nil }
        return LinkPreviewPicture(data: png, mime: "image/png")
    }

    /// A cover image to keep: scaled to fit 256px and re-encoded (JPEG when opaque, PNG otherwise); an SVG of up to
    /// 100KB as it is. Nil for anything that isn't a picture.
    static func cover(from data: Data) -> LinkPreviewPicture? {
        if data.isSVG {
            return data.count <= maxVerbatimImageSize ? LinkPreviewPicture(data: data, mime: "image/svg+xml") : nil
        }
        guard let source = CGImageSourceCreateWithData(data as CFData, nil), CGImageSourceGetCount(source) > 0,
              let image = thumbnail(of: source, index: 0, maxPixelSize: imageMaxDimension)
        else { return nil }
        if hasAlpha(image) {
            return encode(image, type: .png, quality: nil).map { LinkPreviewPicture(data: $0, mime: "image/png") }
        }
        return encode(image, type: .jpeg, quality: imageJPEGQuality).map { LinkPreviewPicture(data: $0, mime: "image/jpeg") }
    }

    private static func thumbnail(of source: CGImageSource, index: Int, maxPixelSize: Int) -> CGImage? {
        let options: [CFString: Any] = [
            kCGImageSourceCreateThumbnailFromImageAlways: true,
            kCGImageSourceCreateThumbnailWithTransform: true,
            kCGImageSourceThumbnailMaxPixelSize: maxPixelSize,
        ]
        return CGImageSourceCreateThumbnailAtIndex(source, index, options as CFDictionary)
    }

    private static func hasAlpha(_ image: CGImage) -> Bool {
        switch image.alphaInfo {
        case .none, .noneSkipFirst, .noneSkipLast: return false
        default: return true
        }
    }

    private static func encode(_ image: CGImage, type: UTType, quality: Double?) -> Data? {
        let data = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(data, type.identifier as CFString, 1, nil) else { return nil }
        var properties: [CFString: Any] = [:]
        if let quality { properties[kCGImageDestinationLossyCompressionQuality] = quality }
        CGImageDestinationAddImage(destination, image, properties as CFDictionary)
        guard CGImageDestinationFinalize(destination) else { return nil }
        return data as Data
    }
}

/// The names Trilium gives a link preview's pictures (`packages/commons/src/lib/link_embed.ts`). A deduplicating role
/// reuses an attachment by its title, so matching them lets a picture Trinote stored and one the server stored for
/// the same site or page be one attachment.
enum LinkPreviewPictureNames {
    /// The favicon's title before its extension: the site's host.
    static func faviconBaseName(url: String) -> String {
        URLComponents(string: url)?.host?.lowercased() ?? url
    }

    /// The cover's title before its extension: `{host}-{last path segment}` (at most 60 characters) and an fnv1a digest
    /// of the address without its fragment.
    static func coverBaseName(url: String) -> String {
        var canonical = url
        var readable = fileNamePart(url)
        if var components = URLComponents(string: url), let host = components.host?.lowercased(), !host.isEmpty {
            components.fragment = nil
            components.scheme = components.scheme?.lowercased()
            components.host = host
            if components.path.isEmpty { components.path = "/" }
            canonical = components.string ?? url
            let lastSegment = fileNamePart(components.path.split(separator: "/").last.map(String.init) ?? "")
            readable = lastSegment.isEmpty ? host : "\(host)-\(lastSegment)"
        }
        let capped = String(readable.prefix(60)).replacingOccurrences(of: #"^[-.]+|[-.]+$"#, with: "", options: .regularExpression)
        return "\(capped.isEmpty ? "image" : capped)-\(String(format: "%08x", fnv1a(canonical)))"
    }

    /// Trilium's `fnv1a` over UTF-16 code units, as JavaScript's `charCodeAt` reads a string.
    static func fnv1a(_ value: String) -> UInt32 {
        var hash: UInt32 = 0x811c9dc5
        for unit in value.utf16 {
            hash ^= UInt32(unit)
            hash = hash &* 0x01000193
        }
        return hash
    }

    /// Trilium's `imageExtensionForMime`.
    static func fileExtension(mime: String) -> String {
        let normalized = mime.trimmingCharacters(in: .whitespaces).lowercased()
        switch normalized {
        case "image/svg+xml": return "svg"
        case "image/x-icon", "image/vnd.microsoft.icon": return "ico"
        default:
            let subtype = normalized.split(separator: "/").dropFirst().first.map(String.init) ?? ""
            let cleaned = subtype.filter { $0.isLetter || $0.isNumber }
            return cleaned.isEmpty ? "png" : cleaned
        }
    }

    private static func fileNamePart(_ value: String) -> String {
        value.replacingOccurrences(of: #"[^a-zA-Z0-9]+"#, with: "-", options: .regularExpression)
            .replacingOccurrences(of: #"^-|-$"#, with: "", options: .regularExpression)
    }
}

/// Keeps a link preview's pictures on the server, answering with what the preview's `data-favicon` / `data-image`
/// hold: `api/attachments/{id}/image/{title}` on Trilium v0.105+ (a `favicon` or `coverImage` attachment of the
/// note, reused when the note already has one of that title), or an inline `data:` URI on v0.104, which is how
/// Trilium v0.104 itself stored them.
///
/// Stored before the note's content names them, as the server's own previews are: the attachments are in place by
/// the time the content is saved, so Trilium never rewrites the content after Trinote uploads it.
struct LinkPreviewPictureStore {
    let client: any TriliumClientProtocol
    let noteId: String
    let usesAttachments: Bool

    /// The note's attachments, read once for every picture of one preview.
    private var knownAttachments: [AttachmentResponse]?

    init(client: any TriliumClientProtocol, noteId: String, usesAttachments: Bool) {
        self.client = client
        self.noteId = noteId
        self.usesAttachments = usesAttachments
    }

    mutating func store(_ picture: LinkPreviewPicture, role: String, baseName: String) async -> String? {
        guard usesAttachments else {
            return "data:\(picture.mime);base64,\(picture.data.base64EncodedString())"
        }
        let title = "\(baseName).\(LinkPreviewPictureNames.fileExtension(mime: picture.mime))"
        do {
            if knownAttachments == nil {
                knownAttachments = (try? await client.getNoteAttachments(noteId)) ?? []
            }
            if let existing = knownAttachments?.first(where: {
                $0.role == role && $0.title == title && $0.utcDateScheduledForErasureSince == nil
            }) {
                return Self.reference(attachmentId: existing.attachmentId, title: title)
            }
            let isSVG = picture.mime == "image/svg+xml"
            let created = try await client.createAttachment(CreateAttachmentRequest(
                ownerId: noteId,
                role: role,
                mime: picture.mime,
                title: title,
                // The server keeps `content` as sent: text for an SVG; a raster picture's bytes follow as a file.
                content: isSVG ? String(decoding: picture.data, as: UTF8.self) : "",
                position: nil
            ))
            if !isSVG {
                try await client.uploadAttachmentContent(created.attachmentId, data: picture.data, contentType: picture.mime)
            }
            knownAttachments?.append(created)
            return Self.reference(attachmentId: created.attachmentId, title: title)
        } catch {
            Log.api.warning("Could not store a link preview picture: \(error)")
            return nil
        }
    }

    /// JavaScript's `encodeURIComponent` keeps these as they are.
    private static let uriComponentAllowed = CharacterSet(
        charactersIn: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~*'()"
    )

    static func reference(attachmentId: String, title: String) -> String {
        let encoded = title.addingPercentEncoding(withAllowedCharacters: uriComponentAllowed) ?? title
        return "api/attachments/\(attachmentId)/image/\(encoded)"
    }
}

/// A link preview read on the phone: the page's details, with its pictures stored on the server.
enum LinkPreviewOnDevice {
    /// Trilium's `YOUTUBE_REGEX`: a YouTube URL is a video, drawn as a player rather than a card.
    private static let youTubePattern = try! NSRegularExpression(
        pattern: #"(?:youtube\.com/watch\?[^\s#]*v=|youtu\.be/|youtube(?:-nocookie)?\.com/embed/|youtube\.com/shorts/)([a-zA-Z0-9_-]{11})"#
    )

    static func isYouTube(_ url: String) -> Bool {
        youTubePattern.firstMatch(in: url, range: NSRange(location: 0, length: (url as NSString).length)) != nil
    }

    static func metadata(
        for url: String,
        reader: any LinkPreviewPageReading,
        client: any TriliumClientProtocol,
        noteId: String,
        usesAttachments: Bool
    ) async -> LinkPreviewMetadata? {
        guard let pageURL = URL(string: url), let page = await reader.read(pageURL) else { return nil }
        var metadata = LinkPreviewMetadata(
            url: url,
            title: page.title,
            description: page.description,
            siteName: page.siteName,
            embedType: isYouTube(url) ? "youtube" : "opengraph"
        )
        var store = LinkPreviewPictureStore(client: client, noteId: noteId, usesAttachments: usesAttachments)

        for candidate in page.faviconURLs.prefix(4) {
            guard let bytes = await reader.download(candidate, maxBytes: LinkPreviewPictureEncoder.maxFaviconDownload),
                  let picture = LinkPreviewPictureEncoder.favicon(from: bytes)
            else { continue }
            metadata.favicon = await store.store(picture, role: "favicon", baseName: LinkPreviewPictureNames.faviconBaseName(url: url))
            break
        }
        for candidate in page.imageURLs.prefix(3) {
            guard let bytes = await reader.download(candidate, maxBytes: LinkPreviewPictureEncoder.maxImageDownload),
                  let picture = LinkPreviewPictureEncoder.cover(from: bytes)
            else { continue }
            metadata.image = await store.store(picture, role: "coverImage", baseName: LinkPreviewPictureNames.coverBaseName(url: url))
            break
        }
        return metadata
    }
}
