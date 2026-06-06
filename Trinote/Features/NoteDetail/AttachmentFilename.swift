import Foundation

/// Helpers for attachment display names (basename + extension).
enum AttachmentFilename {
    static func split(_ filename: String) -> (basename: String, ext: String) {
        let trimmed = filename.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return ("", "") }
        let url = URL(fileURLWithPath: trimmed)
        let ext = url.pathExtension
        if ext.isEmpty {
            return (trimmed, "")
        }
        let suffix = ".\(ext)"
        if trimmed.lowercased().hasSuffix(suffix.lowercased()) {
            let base = String(trimmed.dropLast(suffix.count))
            return (base.isEmpty ? trimmed : base, ext)
        }
        return (trimmed, ext)
    }

    static func join(basename: String, ext: String) -> String {
        let base = basename.trimmingCharacters(in: .whitespacesAndNewlines)
        let trimmedExt = ext.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !base.isEmpty else { return trimmedExt.isEmpty ? "attachment" : "attachment.\(trimmedExt)" }
        guard !trimmedExt.isEmpty else { return base }
        if base.lowercased().hasSuffix(".\(trimmedExt.lowercased())") { return base }
        return "\(base).\(trimmedExt)"
    }
}
