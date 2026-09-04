import Foundation

/// UserDefaults keys for SSO sign-in UI. The setup warning defaults to **on**.
enum SSOLoginPreferences {
    static let showSetupWarningKey = "showSSOSetupWarning"

    /// When `true`, Sign in with SSO shows the JS Backend handler confirmation first.
    static var showSetupWarning: Bool {
        get {
            guard UserDefaults.standard.object(forKey: showSetupWarningKey) != nil else {
                return true
            }
            return UserDefaults.standard.bool(forKey: showSetupWarningKey)
        }
        set {
            UserDefaults.standard.set(newValue, forKey: showSetupWarningKey)
        }
    }
}
