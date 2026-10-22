import Foundation

/// When protected notes lock again after the document password was entered (Settings → Security → Lock Protected
/// Notes). A choice for this device, kept in UserDefaults; it applies to every server.
enum ProtectedSessionLockPolicy: String, CaseIterable, Identifiable {
    /// Protected notes lock as soon as Trinote leaves the foreground: what Trinote has always done.
    case whenLeavingApp
    /// Protected notes lock once the server's protected session timeout (`protectedSessionTimeout`, set in Trilium
    /// under Options → Password) passes without Trinote opening or saving a protected note, as on Trilium desktop,
    /// even while Trinote is in the background or closed: a relaunch within the timeout reopens the session
    /// when the server still has it.
    case serverTimeout

    static let storageKey = "protectedSessionLockPolicy"
    static let `default`: ProtectedSessionLockPolicy = .whenLeavingApp

    var id: String { rawValue }

    /// The stored choice; unknown or missing values mean the default.
    static func current(defaults: UserDefaults = .standard) -> ProtectedSessionLockPolicy {
        ProtectedSessionLockPolicy(rawValue: defaults.string(forKey: storageKey) ?? "") ?? .default
    }

    static var current: ProtectedSessionLockPolicy { current() }
}

/// The Trilium server's protected session timeout: how it is read from `GET /api/options`, remembered per server,
/// and turned into the moment protected notes lock.
enum ProtectedSessionTimeout {
    /// Trilium's own default for `protectedSessionTimeout` (10 minutes); used until the server's value has been read.
    static let triliumDefaultSeconds: TimeInterval = 600

    /// Seconds from the option as Trilium stores it (`"600"`); nil for anything that isn't a positive number.
    static func seconds(fromOptionValue value: String?) -> TimeInterval? {
        guard let value = value?.trimmingCharacters(in: .whitespacesAndNewlines), !value.isEmpty,
              let number = Double(value), number.isFinite, number > 0
        else { return nil }
        return number
    }

    /// When protected notes lock: `timeout` after the last protected-note activity.
    static func lockDate(lastActivity: Date, timeout: TimeInterval) -> Date {
        lastActivity.addingTimeInterval(timeout)
    }

    static func hasExpired(lastActivity: Date, timeout: TimeInterval, now: Date = .now) -> Bool {
        now >= lockDate(lastActivity: lastActivity, timeout: timeout)
    }

    // MARK: Remembered per server

    private static func storageKey(profileId: String) -> String { "protectedSessionServerTimeout.\(profileId)" }

    /// The value last read from this server, so Settings can show it before the next read and a session that
    /// starts while the read fails still follows the server's last known setting.
    static func rememberedServerValue(profileId: String, defaults: UserDefaults = .standard) -> TimeInterval? {
        let stored = defaults.double(forKey: storageKey(profileId: profileId))
        return stored > 0 ? stored : nil
    }

    static func rememberServerValue(_ seconds: TimeInterval, profileId: String, defaults: UserDefaults = .standard) {
        defaults.set(seconds, forKey: storageKey(profileId: profileId))
    }

    static func forgetServerValue(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: storageKey(profileId: profileId))
    }

    // MARK: An open session, across relaunches (After Server Timeout)

    private static func activityKey(profileId: String) -> String { "protectedSessionLastActivity.\(profileId)" }

    /// When protected notes were last unlocked, opened or saved on this server while the session is open; nil once
    /// it ended. A relaunch reopens the session from it while the timeout hasn't passed.
    static func rememberedLastActivity(profileId: String, defaults: UserDefaults = .standard) -> Date? {
        let stored = defaults.double(forKey: activityKey(profileId: profileId))
        return stored > 0 ? Date(timeIntervalSince1970: stored) : nil
    }

    static func rememberLastActivity(_ date: Date, profileId: String, defaults: UserDefaults = .standard) {
        defaults.set(date.timeIntervalSince1970, forKey: activityKey(profileId: profileId))
    }

    static func forgetLastActivity(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: activityKey(profileId: profileId))
    }

    /// Whether a session open at `lastActivity` may be reopened now: the policy keeps sessions across launches
    /// and the timeout hasn't passed. (The server is asked separately whether it still has the session.)
    static func canResume(lastActivity: Date?, timeout: TimeInterval, policy: ProtectedSessionLockPolicy, now: Date = .now) -> Bool {
        guard policy == .serverTimeout, let lastActivity else { return false }
        return !hasExpired(lastActivity: lastActivity, timeout: timeout, now: now)
    }

    // MARK: Display

    /// "10 minutes", "1 hour, 30 minutes": the timeout as the Settings footer says it.
    static func localizedDuration(_ seconds: TimeInterval, locale: Locale = .current) -> String {
        let formatter = DateComponentsFormatter()
        var calendar = Calendar(identifier: .gregorian)
        calendar.locale = locale
        formatter.calendar = calendar
        formatter.unitsStyle = .full
        formatter.allowedUnits = [.day, .hour, .minute, .second]
        formatter.maximumUnitCount = 2
        formatter.zeroFormattingBehavior = .dropAll
        return formatter.string(from: seconds) ?? "\(Int(seconds)) s"
    }
}
