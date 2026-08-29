import Foundation

/// Office / EPUB MIME types Trilium v0.105+ can convert via `/office-preview`.
/// Mirrors `OFFICE_MIME_TYPES` in Trilium `packages/commons/src/lib/office.ts`.
enum OfficeMimeTypes {
    /// Server refuses conversion above this size (`MAX_OFFICE_PREVIEW_BYTES`).
    static let maxPreviewBytes = 20 * 1024 * 1024

    static let mimeTypes: Set<String> = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/vnd.oasis.opendocument.presentation",
        "application/rtf",
        "text/rtf",
        "application/epub+zip",
        "application/x-epub+zip"
    ]

    /// True for DOCX/XLSX/PPTX, ODT/ODS/ODP, RTF, and EPUB. Legacy `.doc`/`.xls`/`.ppt` are not included.
    static func isOfficeMimeType(_ mime: String?) -> Bool {
        guard let normalized = normalizedMIME(mime) else { return false }
        return mimeTypes.contains(normalized)
    }

    static func preferredExtension(for mime: String?) -> String? {
        switch normalizedMIME(mime) {
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "docx"
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return "xlsx"
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return "pptx"
        case "application/vnd.oasis.opendocument.text":
            return "odt"
        case "application/vnd.oasis.opendocument.spreadsheet":
            return "ods"
        case "application/vnd.oasis.opendocument.presentation":
            return "odp"
        case "application/rtf", "text/rtf":
            return "rtf"
        case "application/epub+zip", "application/x-epub+zip":
            return "epub"
        default:
            return nil
        }
    }

    /// Filename with an extension matching `mime`, reusing a title that already has that extension.
    static func filename(fromTitle title: String, mime: String?) -> String {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)
        guard let ext = preferredExtension(for: mime) else {
            return trimmed.isEmpty ? "document" : trimmed
        }
        if trimmed.isEmpty {
            return "document.\(ext)"
        }
        let split = AttachmentFilename.split(trimmed)
        if split.ext.lowercased() == ext {
            return trimmed
        }
        let basename = split.basename.isEmpty ? "document" : split.basename
        return AttachmentFilename.join(basename: basename, ext: ext)
    }

    static func exceedsPreviewSize(_ byteCount: Int?) -> Bool {
        guard let byteCount else { return false }
        return byteCount > maxPreviewBytes
    }

    /// Lowercased type/subtype without RFC 2045 parameters (`text/rtf; charset=utf-8` → `text/rtf`).
    static func normalizedMIME(_ mime: String?) -> String? {
        guard let mime else { return nil }
        let trimmed = mime.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return nil }
        guard let rawType = trimmed.split(separator: ";", maxSplits: 1, omittingEmptySubsequences: true).first else {
            return nil
        }
        let typeSubtype = String(rawType).trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return typeSubtype.isEmpty ? nil : typeSubtype
    }
}
