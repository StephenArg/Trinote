import Foundation

/// A note remembered by id, with the title it had when chosen.
struct NoteReference: Codable, Equatable {
    let noteId: String
    let title: String
}

/// The note behind the Pinned Note tab, kept per server profile. Nothing stored means the tab shows a hint.
enum PinnedNoteTab {
    private static func key(profileId: String) -> String {
        "trinote.pinnedNote." + profileId
    }

    static func load(profileId: String, defaults: UserDefaults = .standard) -> NoteReference? {
        guard let data = defaults.data(forKey: key(profileId: profileId)) else { return nil }
        return try? JSONDecoder().decode(NoteReference.self, from: data)
    }

    static func save(_ note: NoteReference, profileId: String, defaults: UserDefaults = .standard) {
        guard let data = try? JSONEncoder().encode(note) else { return }
        defaults.set(data, forKey: key(profileId: profileId))
    }

    static func remove(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: key(profileId: profileId))
    }

    /// A note made offline got its server id: keep pointing at it.
    static func remapOfflineId(from: String, to: String, profileId: String, defaults: UserDefaults = .standard) {
        guard let pinned = load(profileId: profileId, defaults: defaults), pinned.noteId == from else { return }
        save(NoteReference(noteId: to, title: pinned.title), profileId: profileId, defaults: defaults)
    }
}
