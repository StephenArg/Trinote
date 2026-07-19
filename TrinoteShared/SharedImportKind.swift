import Foundation

/// How shared content should be applied to a new Trinote note.
enum SharedImportKind: String, Codable, Sendable, Equatable {
    case image
    case plainText
    case markdown
    case file
}

enum SharedImportClassifier {
    /// Classifies shared content from filename / MIME / UTI hints.
    static func classify(
        filename: String?,
        mimeType: String?,
        uti: String?,
        hasText: Bool,
        hasBinary: Bool
    ) -> SharedImportKind {
        let ext = (filename as NSString?)?.pathExtension.lowercased() ?? ""
        let mime = (mimeType ?? "").lowercased()
        let typeId = (uti ?? "").lowercased()

        if isMarkdown(extension: ext, mime: mime, uti: typeId) {
            return .markdown
        }
        if isPlainText(extension: ext, mime: mime, uti: typeId, hasText: hasText, hasBinary: hasBinary) {
            return .plainText
        }
        if isImage(extension: ext, mime: mime, uti: typeId) {
            return .image
        }
        if hasBinary {
            return .file
        }
        if hasText {
            return .plainText
        }
        return .file
    }

    private static func isMarkdown(extension ext: String, mime: String, uti: String) -> Bool {
        if ext == "md" || ext == "markdown" || ext == "mdown" { return true }
        if mime.contains("markdown") || mime == "text/x-markdown" { return true }
        if uti.contains("markdown") { return true }
        return false
    }

    private static func isPlainText(
        extension ext: String,
        mime: String,
        uti: String,
        hasText: Bool,
        hasBinary: Bool
    ) -> Bool {
        if ext == "txt" || ext == "text" { return true }
        if mime == "text/plain" { return true }
        if uti == "public.plain-text" || uti == "public.text" || uti == "public.utf8-plain-text" {
            // Prefer file/binary when a non-text file also claims a text UTI.
            if hasBinary, !ext.isEmpty, ext != "txt", ext != "text" { return false }
            return true
        }
        // Shared snippet with no filename (e.g. selected text) — treat as plain text.
        if hasText, !hasBinary, ext.isEmpty, mime.isEmpty || mime.hasPrefix("text/") {
            return true
        }
        return false
    }

    private static func isImage(extension ext: String, mime: String, uti: String) -> Bool {
        let imageExts: Set<String> = ["png", "jpg", "jpeg", "gif", "webp", "heic", "heif", "bmp", "tif", "tiff"]
        if imageExts.contains(ext) { return true }
        if mime.hasPrefix("image/") { return true }
        if uti.hasPrefix("public.image") || uti.hasPrefix("public.jpeg") || uti.hasPrefix("public.png")
            || uti.contains("public.heic") || uti.contains("public.heif") {
            return true
        }
        return false
    }
}
