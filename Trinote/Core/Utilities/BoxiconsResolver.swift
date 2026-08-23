import Foundation

/// Parses Trilium `#iconClass` values and resolves Boxicons v2 glyphs.
enum BoxiconsResolver {

    /// Extracts the icon key from a Trilium `iconClass` string.
    /// `"bx bx-calendar"` → `"bx-calendar"`, `"bx bxs-sushi"` → `"bxs-sushi"`.
    /// Malformed values such as `"bx bx bx-list-ul"` or quoted tokens are normalized.
    static func iconKey(from iconClass: String?) -> String? {
        let tokens = sanitizedTokens(from: iconClass)
        guard !tokens.isEmpty else { return nil }

        guard let key = tokens.last(where: { isIconKey($0) }) else { return nil }
        if key == "bx-empty" { return nil }
        return key
    }

    /// Returns a canonical Trilium `#iconClass` when the value is non-empty and in the Boxicons catalog.
    static func usableIconClass(from iconClass: String?) -> String? {
        guard isCatalogIcon(iconClass), let key = iconKey(from: iconClass) else { return nil }
        return triliumIconClass(for: key)
    }

    /// True when `iconClass` maps to a known Boxicons catalog glyph.
    static func isCatalogIcon(_ iconClass: String?) -> Bool {
        guard let key = iconKey(from: iconClass) else { return false }
        return codepoint(for: key) != nil
    }

    /// Returns the Unicode scalar for a Boxicons class key, or nil when unknown.
    static func codepoint(for iconKey: String) -> UInt32? {
        BoxiconsCatalog.codepoints[iconKey]
    }

    /// Full parse: `iconClass` → renderable character, or nil when empty/unknown.
    static func glyphCharacter(from iconClass: String?) -> Character? {
        guard let key = iconKey(from: iconClass),
              let scalarValue = codepoint(for: key),
              let scalar = Unicode.Scalar(scalarValue)
        else { return nil }
        return Character(scalar)
    }

    /// Trilium-canonical `#iconClass` label value for a catalog key.
    static func triliumIconClass(for iconKey: String) -> String {
        "bx \(iconKey)"
    }

    private static let quoteTrimSet = CharacterSet(charactersIn: "\"'")

    private static func sanitizedTokens(from iconClass: String?) -> [String] {
        guard let iconClass else { return [] }
        let trimmed = iconClass
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .trimmingCharacters(in: quoteTrimSet)
        guard !trimmed.isEmpty else { return [] }

        return trimmed
            .split(whereSeparator: \.isWhitespace)
            .map { String($0).trimmingCharacters(in: quoteTrimSet) }
            .filter { !$0.isEmpty }
    }

    private static func isIconKey(_ token: String) -> Bool {
        token.hasPrefix("bx-") || token.hasPrefix("bxs-") || token.hasPrefix("bxl-")
    }
}
