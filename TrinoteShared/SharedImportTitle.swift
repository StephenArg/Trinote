import Foundation
import ImageIO

/// Shared naming helpers for share-import note titles / image filenames.
enum SharedImportTitle {
    /// `Image dd-MM-yyyy HH:mm:ss` — unique when Photos (etc.) provides no real filename.
    static func timestampedImageTitle(at date: Date = Date()) -> String {
        "Image \(formattedTimestamp(at: date))"
    }

    static func formattedTimestamp(at date: Date = Date()) -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_GB_POSIX")
        formatter.timeZone = .current
        formatter.dateFormat = "dd-MM-yyyy HH:mm:ss"
        return formatter.string(from: date)
    }

    /// Capture time from EXIF/TIFF when present (typical for Photos camera shots); otherwise `nil`.
    static func captureDate(fromImageData data: Data) -> Date? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil),
              let props = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [CFString: Any]
        else { return nil }

        if let exif = props[kCGImagePropertyExifDictionary] as? [CFString: Any] {
            if let raw = exif[kCGImagePropertyExifDateTimeOriginal] as? String,
               let date = parseEXIFDateTime(raw) {
                return date
            }
            if let raw = exif[kCGImagePropertyExifDateTimeDigitized] as? String,
               let date = parseEXIFDateTime(raw) {
                return date
            }
        }
        if let tiff = props[kCGImagePropertyTIFFDictionary] as? [CFString: Any],
           let raw = tiff[kCGImagePropertyTIFFDateTime] as? String,
           let date = parseEXIFDateTime(raw) {
            return date
        }
        return nil
    }

    /// Prefer EXIF capture time when available; otherwise “now”.
    static func preferredImageTitleDate(fromImageData data: Data?) -> Date {
        if let data, let captured = captureDate(fromImageData: data) {
            return captured
        }
        return Date()
    }

    /// Basenames that are placeholders, not useful note titles.
    static func isGenericPlaceholderBasename(_ base: String) -> Bool {
        let trimmed = base.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return true }
        switch trimmed.lowercased() {
        case "shared-image", "shared-file", "shared-note", "image", "photo", "img", "file", "attachment":
            return true
        default:
            break
        }
        // Temp / UUID-style names from loadFileRepresentation.
        if trimmed.range(
            of: #"^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$"#,
            options: .regularExpression
        ) != nil {
            return true
        }
        return false
    }

    /// Prefer a real suggested name; otherwise a timestamped `Image …` filename with extension.
    /// - Parameter at: Prefer EXIF capture time when naming without a real filename.
    static func imageFilename(
        suggestedName: String?,
        existingFilename: String? = nil,
        mime: String,
        at date: Date = Date()
    ) -> String {
        let ext = preferredImageExtension(forMIME: mime)
        if let suggested = cleanedFilename(suggestedName), !isGenericPlaceholderBasename((suggested as NSString).deletingPathExtension) {
            return ensuringExtension(suggested, ext: ext)
        }
        if let existing = cleanedFilename(existingFilename), !isGenericPlaceholderBasename((existing as NSString).deletingPathExtension) {
            return ensuringExtension(existing, ext: ext)
        }
        return "\(timestampedImageTitle(at: date)).\(ext)"
    }

    /// EXIF/TIFF dates are typically `yyyy:MM:dd HH:mm:ss` in the camera’s local time (no zone).
    private static func parseEXIFDateTime(_ raw: String) -> Date? {
        let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return nil }
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = .current
        formatter.dateFormat = "yyyy:MM:dd HH:mm:ss"
        if let date = formatter.date(from: trimmed) { return date }
        // Some pipelines use a regular dash/space form.
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        return formatter.date(from: trimmed)
    }

    private static func cleanedFilename(_ name: String?) -> String? {
        guard let name else { return nil }
        let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }

    private static func ensuringExtension(_ filename: String, ext: String) -> String {
        let ns = filename as NSString
        if ns.pathExtension.isEmpty {
            return "\(filename).\(ext)"
        }
        return filename
    }

    private static func preferredImageExtension(forMIME mime: String) -> String {
        switch mime.lowercased() {
        case "image/png": return "png"
        case "image/gif": return "gif"
        case "image/webp": return "webp"
        case "image/heic": return "heic"
        case "image/heif": return "heif"
        default: return "jpg"
        }
    }
}
