import UIKit
import UniformTypeIdentifiers

/// Reads image bytes and URL strings from `UIPasteboard` for rich-text editor paste.
enum EditorPasteboardImage {
    private static let imagePasteboardTypes = [
        UTType.png.identifier,
        UTType.jpeg.identifier,
        UTType.heic.identifier,
        UTType.webP.identifier,
        "public.png",
        "public.jpeg",
        "public.heic",
        "org.webmproject.webp",
    ]

    /// JPEG-compressed payload suitable for `data:image/jpeg;base64,…` (matches photo picker insert).
    static func loadPasteboardImageData() -> (data: Data, mime: String)? {
        let pasteboard = UIPasteboard.general

        if let image = pasteboard.image,
           let jpeg = image.jpegData(compressionQuality: 0.8) {
            return (jpeg, "image/jpeg")
        }

        for item in pasteboard.items {
            for type in imagePasteboardTypes {
                guard let data = item[type] as? Data, !data.isEmpty else { continue }
                if let image = UIImage(data: data), let jpeg = image.jpegData(compressionQuality: 0.8) {
                    return (jpeg, "image/jpeg")
                }
                let mime = mimeType(forPasteboardType: type) ?? "image/png"
                return (data, mime)
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

        for item in pasteboard.items {
            if let string = item[UTType.plainText.identifier] as? String
                ?? item["public.utf8-plain-text"] as? String
                ?? item["public.text"] as? String {
                let trimmed = string.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty, looksLikePasteableURL(trimmed) {
                    return trimmed
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
        default: return nil
        }
    }
}
