import UIKit
import UniformTypeIdentifiers

/// Reads image bytes, file payloads, and URL strings from `UIPasteboard` for rich-text editor paste.
enum EditorPasteboardImage {
    private static let imagePasteboardTypes = [
        UTType.png.identifier,
        UTType.jpeg.identifier,
        UTType.heic.identifier,
        UTType.webP.identifier,
        UTType.gif.identifier,
        UTType.tiff.identifier,
        UTType.bmp.identifier,
        UTType.svg.identifier,
        "public.png",
        "public.jpeg",
        "public.heic",
        "org.webmproject.webp",
        "com.compuserve.gif",
        "public.gif",
        "public.tiff",
        "com.microsoft.bmp",
        "public.bmp",
        "public.svg-image",
        "public.image",
    ]

    private static let fileURLPasteboardTypes = [
        UTType.fileURL.identifier,
        "public.file-url",
    ]

    private static let genericDataPasteboardTypes = [
        UTType.data.identifier,
        "public.data",
        UTType.pdf.identifier,
        "com.adobe.pdf",
    ]

    private static let preserveOriginalImageMimes: Set<String> = [
        "image/gif",
        "image/svg+xml",
        "image/tiff",
        "image/bmp",
        "image/x-ms-bmp",
    ]

    /// JPEG-compressed payload suitable for `data:image/jpeg;base64,…` (matches photo picker insert).
    /// GIF, SVG, TIFF, and BMP keep their original bytes so animation/vector/raster fidelity is preserved.
    static func loadPasteboardImageData() -> (data: Data, mime: String)? {
        let pasteboard = UIPasteboard.general

        if let image = pasteboard.image,
           let jpeg = image.jpegData(compressionQuality: 0.8) {
            return (jpeg, "image/jpeg")
        }

        for item in pasteboard.items {
            for type in imagePasteboardTypes {
                guard let data = item[type] as? Data, !data.isEmpty else { continue }
                let mime = mimeType(forPasteboardType: type) ?? "image/png"
                if prefersOriginalImageBytes(pasteboardType: type, mime: mime) {
                    return (data, mime)
                }
                if let image = UIImage(data: data), let jpeg = image.jpegData(compressionQuality: 0.8) {
                    return (jpeg, "image/jpeg")
                }
                return (data, mime)
            }
        }

        if let fromFileURL = loadImageFromPasteboardFileURLs() {
            return fromFileURL
        }

        return nil
    }

    /// Non-image file bytes from the pasteboard (PDF, documents, etc.).
    static func loadPasteboardFileData() -> (data: Data, filename: String, mime: String)? {
        if let fromURL = loadFilePayloadFromPasteboardURLs() {
            return fromURL
        }

        let pasteboard = UIPasteboard.general
        for item in pasteboard.items {
            if let payload = loadFilePayloadFromPasteboardItem(item) {
                return payload
            }
        }

        return nil
    }

    /// First http(s) or file URL string on the pasteboard (for explicit “Paste URL”).
    static func pasteboardURLString() -> String? {
        let pasteboard = UIPasteboard.general
        if let string = pasteboard.string?.trimmingCharacters(in: .whitespacesAndNewlines),
           !string.isEmpty,
           looksLikePasteableURL(string) {
            return string
        }

        if let urls = pasteboard.urls {
            for url in urls {
                let absolute = url.absoluteString.trimmingCharacters(in: .whitespacesAndNewlines)
                if !absolute.isEmpty, looksLikePasteableURL(absolute) {
                    return absolute
                }
            }
        }

        for item in pasteboard.items {
            if let url = item[UTType.url.identifier] as? URL {
                let absolute = url.absoluteString.trimmingCharacters(in: .whitespacesAndNewlines)
                if !absolute.isEmpty, looksLikePasteableURL(absolute) {
                    return absolute
                }
            }
            if let string = item[UTType.plainText.identifier] as? String
                ?? item["public.utf8-plain-text"] as? String
                ?? item["public.text"] as? String {
                let trimmed = string.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty, looksLikePasteableURL(trimmed) {
                    return trimmed
                }
            }
            for type in fileURLPasteboardTypes {
                if let url = item[type] as? URL {
                    let absolute = url.absoluteString.trimmingCharacters(in: .whitespacesAndNewlines)
                    if !absolute.isEmpty, looksLikePasteableURL(absolute) {
                        return absolute
                    }
                }
                if let string = item[type] as? String {
                    let trimmed = string.trimmingCharacters(in: .whitespacesAndNewlines)
                    if !trimmed.isEmpty, looksLikePasteableURL(trimmed) {
                        return trimmed
                    }
                }
            }
        }
        return nil
    }

    static func pasteboardPlainText() -> String? {
        let pasteboard = UIPasteboard.general
        if let string = pasteboard.string?.trimmingCharacters(in: .whitespacesAndNewlines), !string.isEmpty {
            return string
        }
        for item in pasteboard.items {
            if let string = item[UTType.plainText.identifier] as? String
                ?? item["public.utf8-plain-text"] as? String
                ?? item["public.text"] as? String {
                let trimmed = string.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty { return trimmed }
            }
        }
        return nil
    }

    static func pasteboardHTML() -> String? {
        let pasteboard = UIPasteboard.general
        let htmlTypes = [UTType.html.identifier, "public.html", "Apple HTML pasteboard type"]
        for type in htmlTypes {
            if let html = pasteboard.value(forPasteboardType: type) as? String {
                let trimmed = html.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty { return trimmed }
            }
        }
        for item in pasteboard.items {
            for type in htmlTypes {
                if let html = item[type] as? String {
                    let trimmed = html.trimmingCharacters(in: .whitespacesAndNewlines)
                    if !trimmed.isEmpty { return trimmed }
                }
            }
        }
        return nil
    }

    static func pasteboardHasAmbiguousImageAndURL() -> Bool {
        loadPasteboardImageData() != nil && pasteboardURLString() != nil
    }

    private static func loadFilePayloadFromPasteboardURLs() -> (data: Data, filename: String, mime: String)? {
        let pasteboard = UIPasteboard.general
        for url in fileURLsOnPasteboard() {
            guard url.isFileURL else { continue }
            guard let meta = fileMetadata(forFileURL: url) else { continue }

            if let data = readData(fromFileURL: url), !data.isEmpty {
                return (data, meta.filename, meta.mime)
            }

            for item in pasteboard.items where pasteboardItemReferences(url, in: item) {
                if let data = firstNonImageFileData(in: item), !data.isEmpty {
                    return (data, meta.filename, meta.mime)
                }
            }
        }
        return nil
    }

    private static func loadFilePayloadFromPasteboardItem(_ item: [String: Any]) -> (data: Data, filename: String, mime: String)? {
        guard let data = firstNonImageFileData(in: item), !data.isEmpty else { return nil }

        let filenameFromURL = filenameFromPasteboardItem(item)
        let dataType = pasteboardTypeForFileData(in: item) ?? UTType.data.identifier
        let ut = UTType(dataType) ?? .data
        let mime = ut.preferredMIMEType ?? "application/octet-stream"
        let ext = ut.preferredFilenameExtension ?? extensionForMime(mime)

        let filename: String
        if let filenameFromURL {
            filename = ensureFilenameExtension(filenameFromURL, defaultExtension: ext)
        } else if let plain = plainTextFilename(in: item) {
            filename = ensureFilenameExtension(plain, defaultExtension: ext)
        } else {
            filename = defaultFilename(extension: ext)
        }

        return (data, filename, mime)
    }

    private static func loadImageFromPasteboardFileURLs() -> (data: Data, mime: String)? {
        for url in fileURLsOnPasteboard() where url.isFileURL {
            guard let ut = UTType(filenameExtension: url.pathExtension),
                  ut.conforms(to: .image),
                  let data = readData(fromFileURL: url), !data.isEmpty else { continue }
            let mime = ut.preferredMIMEType ?? "image/png"
            if prefersOriginalImageBytes(pasteboardType: ut.identifier, mime: mime) {
                return (data, mime)
            }
            if let image = UIImage(data: data), let jpeg = image.jpegData(compressionQuality: 0.8) {
                return (jpeg, "image/jpeg")
            }
            return (data, mime)
        }
        return nil
    }

    private static func fileURLsOnPasteboard() -> [URL] {
        var urls: [URL] = []
        var seen = Set<String>()

        func append(_ url: URL) {
            let key = url.absoluteString
            guard !key.isEmpty, seen.insert(key).inserted else { return }
            urls.append(url)
        }

        let pasteboard = UIPasteboard.general
        if let boardURLs = pasteboard.urls {
            for url in boardURLs { append(url) }
        }

        for item in pasteboard.items {
            for type in fileURLPasteboardTypes {
                if let url = item[type] as? URL {
                    append(url)
                } else if let string = item[type] as? String, let url = URL(string: string) {
                    append(url)
                }
            }
            if let url = item[UTType.url.identifier] as? URL {
                append(url)
            }
        }

        return urls
    }

    private struct FileMetadata {
        let filename: String
        let mime: String
    }

    private static func fileMetadata(forFileURL url: URL) -> FileMetadata? {
        let filename = sanitizedFilename(url.lastPathComponent)
        guard !filename.isEmpty else { return nil }
        let ext = url.pathExtension
        guard let ut = UTType(filenameExtension: ext.isEmpty ? "bin" : ext),
              !ut.conforms(to: .image) else { return nil }
        let mime = ut.preferredMIMEType ?? "application/octet-stream"
        return FileMetadata(filename: filename, mime: mime)
    }

    private static func readData(fromFileURL url: URL) -> Data? {
        let accessed = url.startAccessingSecurityScopedResource()
        defer { if accessed { url.stopAccessingSecurityScopedResource() } }
        return try? Data(contentsOf: url)
    }

    private static func pasteboardItemReferences(_ url: URL, in item: [String: Any]) -> Bool {
        for type in fileURLPasteboardTypes + [UTType.url.identifier] {
            if let itemURL = item[type] as? URL, itemURL == url { return true }
            if let string = item[type] as? String,
               let itemURL = URL(string: string.trimmingCharacters(in: .whitespacesAndNewlines)),
               itemURL == url {
                return true
            }
        }
        return false
    }

    private static func filenameFromPasteboardItem(_ item: [String: Any]) -> String? {
        for type in fileURLPasteboardTypes + [UTType.url.identifier] {
            if let url = item[type] as? URL, url.isFileURL {
                let name = sanitizedFilename(url.lastPathComponent)
                if !name.isEmpty { return name }
            } else if let string = item[type] as? String {
                let trimmed = string.trimmingCharacters(in: .whitespacesAndNewlines)
                if let url = URL(string: trimmed), url.isFileURL {
                    let name = sanitizedFilename(url.lastPathComponent)
                    if !name.isEmpty { return name }
                }
            }
        }
        return plainTextFilename(in: item)
    }

    private static func plainTextFilename(in item: [String: Any]) -> String? {
        let plainTypes = [UTType.plainText.identifier, "public.utf8-plain-text", "public.text"]
        for type in plainTypes {
            guard let name = item[type] as? String else { continue }
            let trimmed = sanitizedFilename(name)
            guard !trimmed.isEmpty else { continue }
            if trimmed.contains("/") || trimmed.contains("\\") { continue }
            if looksLikePasteableURL(trimmed) { continue }
            return trimmed
        }
        return nil
    }

    private static func pasteboardTypeForFileData(in item: [String: Any]) -> String? {
        for type in genericDataPasteboardTypes {
            if let data = item[type] as? Data, !data.isEmpty {
                return type
            }
        }
        return nil
    }

    private static func firstNonImageFileData(in item: [String: Any]) -> Data? {
        for type in genericDataPasteboardTypes {
            guard let data = item[type] as? Data, !data.isEmpty else { continue }
            let ut = UTType(type) ?? .data
            guard !ut.conforms(to: .image) else { continue }
            return data
        }
        return nil
    }

    private static func sanitizedFilename(_ raw: String) -> String {
        raw.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private static func defaultFilename(extension ext: String?) -> String {
        if let ext, !ext.isEmpty { return "attachment.\(ext)" }
        return "attachment"
    }

    private static func ensureFilenameExtension(_ filename: String, defaultExtension ext: String?) -> String {
        let trimmed = sanitizedFilename(filename)
        guard !trimmed.isEmpty else { return defaultFilename(extension: ext) }
        if URL(fileURLWithPath: trimmed).pathExtension.isEmpty, let ext, !ext.isEmpty {
            return "\(trimmed).\(ext)"
        }
        return trimmed
    }

    private static func extensionForMime(_ mime: String) -> String? {
        UTType(mimeType: mime)?.preferredFilenameExtension
    }

    private static func prefersOriginalImageBytes(pasteboardType type: String, mime: String) -> Bool {
        if preserveOriginalImageMimes.contains(mime) { return true }
        let lowered = type.lowercased()
        return lowered.contains("gif")
            || lowered.contains("svg")
            || lowered.contains("tiff")
            || lowered.contains("bmp")
    }

    private static func looksLikePasteableURL(_ string: String) -> Bool {
        if string.hasPrefix("http://") || string.hasPrefix("https://") { return true }
        if string.hasPrefix("file://") { return true }
        return false
    }

    private static func mimeType(forPasteboardType type: String) -> String? {
        if let ut = UTType(type) {
            return ut.preferredMIMEType
        }
        switch type {
        case UTType.png.identifier, "public.png": return "image/png"
        case UTType.jpeg.identifier, "public.jpeg": return "image/jpeg"
        case UTType.heic.identifier, "public.heic": return "image/heic"
        case UTType.webP.identifier, "org.webmproject.webp": return "image/webp"
        case UTType.gif.identifier, "com.compuserve.gif", "public.gif": return "image/gif"
        case UTType.tiff.identifier, "public.tiff": return "image/tiff"
        case UTType.bmp.identifier, "com.microsoft.bmp", "public.bmp": return "image/bmp"
        case UTType.svg.identifier, "public.svg-image": return "image/svg+xml"
        default: return nil
        }
    }
}
