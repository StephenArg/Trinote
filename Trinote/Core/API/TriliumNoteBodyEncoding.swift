import Foundation

/// How a note body is sent to Trilium: UTF-8 JSON `{ content }` vs raw file upload.
enum TriliumNoteBodyEncoding {
    /// Image/file bytes (and similar) must not go through UTF-8 JSON — that path empties non-UTF-8 payloads.
    static func usesUTF8JSONContent(type: String, mime: String) -> Bool {
        let t = type.trimmingCharacters(in: .whitespacesAndNewlines)
        let m = mime.lowercased()
        if t.caseInsensitiveCompare("image") == .orderedSame {
            return m.contains("svg") || m.contains("xml")
        }
        if t.caseInsensitiveCompare("file") == .orderedSame {
            return m.hasPrefix("text/")
                || m.contains("json")
                || m.contains("xml")
                || m.contains("svg")
        }
        return usesUTF8JSONContent(mime: mime)
    }

    static func usesUTF8JSONContent(mime: String, data: Data) -> Bool {
        if usesUTF8JSONContent(mime: mime) { return true }
        if isClearlyBinaryMIME(mime) { return false }
        return String(data: data, encoding: .utf8) != nil
    }

    static func usesUTF8JSONContent(mime: String) -> Bool {
        let m = mime.lowercased()
        if isClearlyBinaryMIME(m) { return false }
        return m.hasPrefix("text/")
            || m.contains("json")
            || m.contains("xml")
            || m.contains("svg")
            || m.isEmpty
    }

    private static func isClearlyBinaryMIME(_ mime: String) -> Bool {
        let m = mime.lowercased()
        if m.hasPrefix("image/"), !m.contains("svg"), !m.contains("xml") { return true }
        if m.hasPrefix("audio/") || m.hasPrefix("video/") { return true }
        if m == "application/octet-stream" || m == "application/pdf" { return true }
        if m.hasPrefix("application/zip") || m.hasPrefix("application/x-zip") { return true }
        return false
    }
}
