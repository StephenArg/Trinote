import SwiftUI

/// Maps Trilium’s `#color` label (named tokens or `#RRGGBB` / `#RGB`) to SwiftUI colors for the note tree.
enum TriliumNoteColorMapper {
    /// Returns a color when `raw` is a recognized hex or palette name; otherwise `nil` so callers fall back to app theme colors.
    static func swiftUIColor(for raw: String?) -> Color? {
        guard let raw else { return nil }
        let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty { return nil }

        if let hex = parseHexColor(trimmed) {
            return Color(hex: hex)
        }

        let key = trimmed.lowercased()
        if let hex = namedHex[key] {
            return Color(hex: hex)
        }
        return nil
    }

    // MARK: - Hex

    /// Accepts `#RGB`, `#RRGGBB`, `#RRGGBBAA` (alpha ignored), with or without `#`.
    private static func parseHexColor(_ s: String) -> String? {
        var t = s
        if t.hasPrefix("#") { t.removeFirst() }
        guard !t.isEmpty else { return nil }
        guard t.unicodeScalars.allSatisfy({ CharacterSet.hexDigits.contains($0) }) else { return nil }

        switch t.count {
        case 3:
            let chars = Array(t)
            return chars.map { String([$0, $0]) }.joined()
        case 6:
            return t
        case 8:
            return String(t.prefix(6))
        default:
            return nil
        }
    }

    // MARK: - Named palette

    /// Trilium’s picker uses short names and CSS-like labels; hex values align with common Trilium / Bootstrap presets.
    private static let namedHex: [String: String] = [
        // Core Trilium-style presets
        "red": "E74C3C",
        "orange": "E67E22",
        "yellow": "F1C40F",
        "green": "27AE60",
        "cyan": "1ABC9C",
        "blue": "3498DB",
        "purple": "9B59B6",
        "pink": "E91E63",
        "brown": "795548",
        "gray": "95A5A6",
        "grey": "95A5A6",
        "black": "000000",
        "white": "FFFFFF",
        // Extended names often seen in themes / CSS
        "magenta": "E91E63",
        "lime": "32CD32",
        "teal": "008080",
        "indigo": "4B0082",
        "violet": "8B5CF6",
        "amber": "F59E0B",
        "emerald": "10B981",
        "sky": "0EA5E9",
        "fuchsia": "D946EF",
        "rose": "F43F5E",
        "slate": "64748B",
        "zinc": "71717A",
        "neutral": "737373",
        "stone": "78716C",
        "lightgreen": "90EE90",
        "darkblue": "00008B",
        "darkgreen": "006400",
        "darkred": "8B0000",
        "darkorange": "FF8C00",
        "gold": "FFD700",
        "silver": "C0C0C0",
        "navy": "000080",
        "maroon": "800000",
        "olive": "808000",
        "aqua": "00FFFF",
        "lightgray": "D3D3D3",
        "lightgrey": "D3D3D3",
        "darkgray": "A9A9A9",
        "darkgrey": "A9A9A9",
    ]
}

private extension CharacterSet {
    static let hexDigits = CharacterSet(charactersIn: "0123456789abcdefABCDEF")
}
