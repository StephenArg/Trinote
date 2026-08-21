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
        // If the user re-typed the locked extension, don't duplicate it.
        if base.lowercased().hasSuffix(".\(trimmedExt.lowercased())") { return base }
        return "\(base).\(trimmedExt)"
    }

    /// When `existingTitle` has an extension, the replacement must use the same one (case-insensitive).
    static func replacementExtensionMatches(existingTitle: String, replacementFilename: String) -> Bool {
        let required = split(existingTitle).ext
        guard !required.isEmpty else { return true }
        return split(replacementFilename).ext.caseInsensitiveCompare(required) == .orderedSame
    }
}
