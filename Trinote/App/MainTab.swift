import Foundation
import UIKit

/// A tab the iPhone tab bar (`MainTabView`) can show. Which ones show, and in what order, is `MainTabPreferences`.
///
/// Top level rather than nested in `MainTabView` so the name doesn't shadow SwiftUI's `Tab` in other files.
enum MainTab: String, CaseIterable, Identifiable {
    case notes
    case favorites
    case search
    case recents
    case settings
    /// Trilium's AI chats (offered only while the server supports them, see `AppState.showsAIEntryPoints`).
    case aiChat
    /// The journal's calendar (`#calendarRoot`).
    case calendar
    /// One note chosen in Settings, shown as the tab's screen.
    case pinnedNote
    /// Action: creates a note (under the remembered parent, or after asking where) and opens the editor.
    case addNote
    /// Today's journal day note as the tab's screen (found or made as Open Today's Journal Note finds it).
    case todaysJournal

    var id: String { rawValue }

    /// Notes hosts share imports, Shortcut opens, local transfers and open-tab restore, so it is always in the bar.
    var isRequired: Bool { self == .notes }

    /// Tapping performs an action instead of showing a screen; the selected tab stays where it was.
    var isAction: Bool { self == .addNote }

    /// Tab bar label (localized).
    var title: String {
        switch self {
        case .notes: String(localized: "Notes", comment: "Main tab: notes tree")
        case .favorites: String(localized: "Favorites", comment: "Main tab")
        case .search: String(localized: "Search", comment: "Main tab")
        case .recents: String(localized: "Recents", comment: "Main tab")
        case .settings: String(localized: "Settings", comment: "Main tab")
        case .aiChat: String(localized: "AI Chat", comment: "Note type")
        case .calendar: String(localized: "Calendar", comment: "Main tab: the journal's calendar")
        case .pinnedNote: String(localized: "Pinned Note", comment: "Main tab: one note chosen in Settings")
        case .addNote: String(localized: "Add Note", comment: "Main tab: create a note")
        case .todaysJournal: String(localized: "Today", comment: "Main tab: today's journal day note")
        }
    }

    var icon: String {
        switch self {
        case .notes: "folder.fill"
        case .favorites: "star.fill"
        case .search: "magnifyingglass"
        case .recents: "clock.fill"
        case .settings: "gearshape.fill"
        case .aiChat: "sparkles"
        case .calendar: "calendar"
        case .pinnedNote: "pin.fill"
        case .addNote: "square.and.pencil"
        case .todaysJournal: "book.fill"
        }
    }
}

/// Which tabs the iPhone tab bar shows, in order. Stored in `UserDefaults.standard` as comma-joined raw values so
/// `@AppStorage` can watch the one key. Missing or unreadable values mean `defaultTabs`. More than five is allowed:
/// iPhone then puts the rest under its More tab, which the defaults rely on.
enum MainTabPreferences {
    static let shownTabsKey = "mainTabBarShownTabs"
    /// Notes, Recents, Search and Add Note in the bar; the rest under More.
    static let defaultTabs: [MainTab] = [
        .notes, .recents, .search, .addNote,
        .favorites, .todaysJournal, .calendar, .pinnedNote, .aiChat, .settings,
    ]

    static var shownTabs: [MainTab] {
        get { tabs(fromStored: UserDefaults.standard.string(forKey: shownTabsKey)) }
        set { UserDefaults.standard.set(encode(newValue), forKey: shownTabsKey) }
    }

    /// The tabs a stored value names. Unknown names are dropped; nothing recognisable means the defaults, so a
    /// corrupted value never leaves a bare Notes tab.
    static func tabs(fromStored raw: String?) -> [MainTab] {
        guard let raw else { return defaultTabs }
        let known = raw.split(separator: ",").compactMap { MainTab(rawValue: $0.trimmingCharacters(in: .whitespaces)) }
        return known.isEmpty ? defaultTabs : normalized(known)
    }

    /// Duplicates removed (first wins), Notes added at the front when missing.
    static func normalized(_ tabs: [MainTab]) -> [MainTab] {
        var seen = Set<MainTab>()
        var result = tabs.filter { seen.insert($0).inserted }
        if !result.contains(.notes) {
            result.insert(.notes, at: 0)
        }
        return result
    }

    static func encode(_ tabs: [MainTab]) -> String {
        normalized(tabs).map(\.rawValue).joined(separator: ",")
    }

    // MARK: - One-time migration

    /// The build whose launch last brought the saved tabs up to date.
    static let migratedBuildKey = "mainTabBarMigratedBuild"
    /// Build 25 (1.23.0) introduced the configurable bar and new defaults: tabs saved by an earlier build are replaced.
    static let tabsResetBuild = 25

    /// Called once per launch. A device coming from a build before `tabsResetBuild` gets the new default tabs; a fresh
    /// install, and every later launch, keeps what is saved.
    static func migrateIfNeeded(currentBuild: Int = bundleBuild, defaults: UserDefaults = .standard) {
        let migrated = defaults.integer(forKey: migratedBuildKey)
        if migrated < tabsResetBuild {
            defaults.removeObject(forKey: shownTabsKey)
        }
        if migrated != currentBuild {
            defaults.set(currentBuild, forKey: migratedBuildKey)
        }
    }

    /// `CFBundleVersion` as a number; the reset build when it can't be read.
    static var bundleBuild: Int {
        Int(Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "") ?? tabsResetBuild
    }

    // MARK: - Custom icons

    /// SF Symbol names chosen for tabs, as a JSON object keyed by tab raw value, under one key `@AppStorage` can watch.
    static let customIconsKey = "mainTabBarIcons"

    static func customIcons(fromStored raw: String?) -> [MainTab: String] {
        guard let raw, let data = raw.data(using: .utf8),
              let object = try? JSONDecoder().decode([String: String].self, from: data)
        else { return [:] }
        var icons: [MainTab: String] = [:]
        for (key, name) in object {
            guard let tab = MainTab(rawValue: key), isSymbol(name) else { continue }
            icons[tab] = name
        }
        return icons
    }

    static func encodeIcons(_ icons: [MainTab: String]) -> String {
        let object = Dictionary(uniqueKeysWithValues: icons.map { ($0.key.rawValue, $0.value) })
        guard let data = try? JSONEncoder().encode(object) else { return "" }
        return String(decoding: data, as: UTF8.self)
    }

    /// The tab's icon: its chosen symbol when that name exists on this device, else its own.
    static func icon(for tab: MainTab, customIcons: [MainTab: String]) -> String {
        if let name = customIcons[tab], isSymbol(name) {
            return name
        }
        return tab.icon
    }

    /// Whether `name` is an SF Symbol this device knows.
    static func isSymbol(_ name: String) -> Bool {
        !name.isEmpty && UIImage(systemName: name) != nil
    }
}
