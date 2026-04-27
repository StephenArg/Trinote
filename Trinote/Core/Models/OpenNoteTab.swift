import CoreGraphics
import Foundation
import SwiftData

/// Persists which `OpenNoteTab` row is selected in the tab bar, **per `serverProfileId`**, so switching instances does not leak tab selection.
enum LastActiveOpenTabStore {
    private static let legacyGlobalKey = "lastActiveOpenTabId"

    private static func key(forServerProfileId profileId: String) -> String {
        "trinote.lastActiveOpenTabId." + profileId
    }

    static func get(profileId: String?) -> String {
        guard let p = profileId else { return "" }
        let k = key(forServerProfileId: p)
        if let v = UserDefaults.standard.string(forKey: k), !v.isEmpty { return v }
        if let legacy = UserDefaults.standard.string(forKey: legacyGlobalKey), !legacy.isEmpty {
            UserDefaults.standard.set(legacy, forKey: k)
            UserDefaults.standard.removeObject(forKey: legacyGlobalKey)
            return legacy
        }
        return ""
    }

    static func set(_ value: String, profileId: String?) {
        guard let p = profileId else { return }
        let k = key(forServerProfileId: p)
        let old = UserDefaults.standard.string(forKey: k) ?? ""
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty {
            UserDefaults.standard.removeObject(forKey: k)
        } else {
            UserDefaults.standard.set(trimmed, forKey: k)
        }
        let newVal = UserDefaults.standard.string(forKey: k) ?? ""
        if old != newVal {
            NotificationCenter.default.post(
                name: .trinoteLastActiveOpenTabIdChanged,
                object: nil,
                userInfo: ["serverProfileId": p]
            )
        }
    }
}

/// Persists read-only scroll-fraction (0…1) per `OpenNoteTab` row, so tab switches restore the reading position.
/// Keys are the tab’s unique `id` (not `noteId` — the same note may be open in multiple tabs).
enum OpenTabSessionStore {
    private static let keyPrefix = "trinote.openTab.readScrollFraction."
    private static func key(_ openTabId: String) -> String { keyPrefix + openTabId }

    static func saveReadScrollFraction(_ fraction: CGFloat, for openTabId: String) {
        let f = min(max(fraction, 0), 1)
        UserDefaults.standard.set(f, forKey: key(openTabId))
    }

    static func readReadScrollFraction(for openTabId: String) -> CGFloat? {
        guard UserDefaults.standard.object(forKey: key(openTabId)) != nil else { return nil }
        return CGFloat(UserDefaults.standard.double(forKey: key(openTabId)))
    }

    static func clearReadScrollState(for openTabId: String) {
        UserDefaults.standard.removeObject(forKey: key(openTabId))
    }
}

@Model
final class OpenNoteTab {
    /// Client-owned row id. Multiple open tabs can reference the same `noteId` (e.g. different scroll positions).
    @Attribute(.unique) var id: String
    var noteId: String
    var title: String
    var noteType: String
    /// SF Symbol for the top-level-under-root notebook (same as recents / tree row icon).
    var listIconSystemName: String?
    var addedAt: Date
    var serverProfileId: String

    init(
        id: String? = nil,
        noteId: String,
        title: String,
        noteType: String,
        serverProfileId: String,
        listIconSystemName: String? = nil,
        addedAt: Date = .now
    ) {
        self.id = id ?? UUID().uuidString
        self.noteId = noteId
        self.title = title
        self.noteType = noteType
        self.addedAt = addedAt
        self.serverProfileId = serverProfileId
        self.listIconSystemName = listIconSystemName
    }
}

extension OpenNoteTab: Identifiable {}
