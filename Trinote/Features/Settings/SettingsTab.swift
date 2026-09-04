import Foundation

/// In-Settings category shown by the segmented control on `SettingsView`.
enum SettingsTab: String, CaseIterable, Identifiable {
    case appearance
    case account
    case data

    var id: String { rawValue }

    /// Localized label for the Settings section picker (stored value remains English).
    var localizedTitle: String {
        switch self {
        case .appearance:
            String(localized: "Appearance / UX", comment: "Settings tab")
        case .account:
            String(localized: "Account", comment: "Settings tab")
        case .data:
            String(localized: "Data", comment: "Settings tab")
        }
    }
}

/// UserDefaults keys for which Settings tab was last opened. Defaults to **Appearance**.
enum SettingsTabPreferences {
    static let lastOpenedTabKey = "settingsLastOpenedTab"

    /// Last Settings category the user viewed. Unknown or missing values fall back to `.appearance` (Appearance / UX).
    static var lastOpenedTab: SettingsTab {
        get {
            SettingsTab(rawValue: UserDefaults.standard.string(forKey: lastOpenedTabKey) ?? "") ?? .appearance
        }
        set {
            UserDefaults.standard.set(newValue.rawValue, forKey: lastOpenedTabKey)
        }
    }
}
