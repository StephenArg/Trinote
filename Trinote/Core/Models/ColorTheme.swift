import SwiftUI

enum ColorTheme: String, CaseIterable, Identifiable {
    case `default` = "Default"
    case ocean = "Ocean"
    case forest = "Forest"
    case sunset = "Sunset"
    case lavender = "Lavender"
    case slate = "Slate"
    case rose = "Rose"

    var id: String { rawValue }

    /// Localized theme name for pickers (stored value remains English `rawValue`).
    var localizedTitle: String {
        switch self {
        case .default: String(localized: "Default", comment: "Color theme name")
        case .ocean: String(localized: "Ocean", comment: "Color theme name")
        case .forest: String(localized: "Forest", comment: "Color theme name")
        case .sunset: String(localized: "Sunset", comment: "Color theme name")
        case .lavender: String(localized: "Lavender", comment: "Color theme name")
        case .slate: String(localized: "Slate", comment: "Color theme name")
        case .rose: String(localized: "Rose", comment: "Color theme name")
        }
    }

    var accentColor: Color {
        switch self {
        case .default: return Color.blue
        case .ocean: return Color(hex: "0077B6")
        case .forest: return Color(hex: "2D6A4F")
        case .sunset: return Color(hex: "E85D04")
        case .lavender: return Color(hex: "7B2CBF")
        case .slate: return Color(hex: "475569")
        case .rose: return Color(hex: "BE185D")
        }
    }

    var lightTextColor: String {
        switch self {
        case .default: return "#1c1c1e"
        case .ocean: return "#023E8A"
        case .forest: return "#1B4332"
        case .sunset: return "#370617"
        case .lavender: return "#3C096C"
        case .slate: return "#1e293b"
        case .rose: return "#500724"
        }
    }

    var darkTextColor: String {
        switch self {
        case .default: return "#aaaaaa"
        case .ocean: return "#90E0EF"
        case .forest: return "#95D5B2"
        case .sunset: return "#FFBA08"
        case .lavender: return "#E0AAFF"
        case .slate: return "#cbd5e1"
        case .rose: return "#FDA4AF"
        }
    }

    var lightLinkColor: String {
        switch self {
        case .default: return "#007AFF"
        case .ocean: return "#0096C7"
        case .forest: return "#40916C"
        case .sunset: return "#DC2F02"
        case .lavender: return "#9D4EDD"
        case .slate: return "#3b82f6"
        case .rose: return "#DB2777"
        }
    }

    var darkLinkColor: String {
        switch self {
        case .default: return "#5ac8fa"
        case .ocean: return "#48CAE4"
        case .forest: return "#74C69D"
        case .sunset: return "#FAA307"
        case .lavender: return "#C77DFF"
        case .slate: return "#60a5fa"
        case .rose: return "#F472B6"
        }
    }

    var previewColors: [Color] {
        [accentColor, Color(hex: lightTextColor), Color(hex: darkTextColor)]
    }
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r, g, b: UInt64
        switch hex.count {
        case 3:
            (r, g, b) = ((int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (r, g, b) = (int >> 16, int >> 8 & 0xFF, int & 0xFF)
        default:
            (r, g, b) = (0, 0, 0)
        }
        self.init(red: Double(r) / 255, green: Double(g) / 255, blue: Double(b) / 255)
    }

    var hexString: String {
        guard let components = UIColor(self).cgColor.components, components.count >= 3 else {
            return "#000000"
        }
        let r = Int(components[0] * 255)
        let g = Int(components[1] * 255)
        let b = Int(components[2] * 255)
        return String(format: "#%02X%02X%02X", r, g, b)
    }
}
