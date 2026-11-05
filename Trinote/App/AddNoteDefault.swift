import Foundation

/// Where the Add Note tab puts a new note without asking: Trilium's inbox rule, or one note. Kept per server profile;
/// nothing stored means the tab asks each time.
enum AddNoteDefault: Codable, Equatable {
    /// Trilium's inbox rule (`InboxDestination`): the `#inbox` note, else today's journal note, else the top.
    case inbox
    case note(id: String, title: String)

    /// Names the destination in Settings.
    var displayTitle: String {
        switch self {
        case .inbox:
            String(localized: "Inbox", comment: "Inbox destination without a title")
        case .note(let id, let title):
            if id == TriliumTreeConstants.rootNoteId {
                String(localized: "Notes", comment: "Root notebook screen title")
            } else {
                title.isEmpty ? id : title
            }
        }
    }

    /// The top of the tree was chosen outright (the inbox rule may still land there, but that isn't known yet).
    var isRootNote: Bool {
        if case .note(let id, _) = self { return id == TriliumTreeConstants.rootNoteId }
        return false
    }

    /// The note to create under; today's journal note is made when the inbox rule needs it.
    @MainActor
    func parentNoteId(appState: AppState) async throws -> String {
        switch self {
        case .inbox:
            try await InboxDestination.resolve(appState: appState).parentNoteId(appState: appState)
        case .note(let id, _):
            id
        }
    }

    // MARK: - Storage (UserDefaults, per server profile)

    private static func key(profileId: String) -> String {
        "trinote.addNoteDefault." + profileId
    }

    static func load(profileId: String, defaults: UserDefaults = .standard) -> AddNoteDefault? {
        guard let data = defaults.data(forKey: key(profileId: profileId)) else { return nil }
        return try? JSONDecoder().decode(AddNoteDefault.self, from: data)
    }

    func save(profileId: String, defaults: UserDefaults = .standard) {
        guard let data = try? JSONEncoder().encode(self) else { return }
        defaults.set(data, forKey: Self.key(profileId: profileId))
    }

    static func remove(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: key(profileId: profileId))
    }

    /// A note made offline got its server id: keep pointing at it.
    static func remapOfflineId(from: String, to: String, profileId: String, defaults: UserDefaults = .standard) {
        guard case .note(let id, let title)? = load(profileId: profileId, defaults: defaults), id == from else { return }
        AddNoteDefault.note(id: to, title: title).save(profileId: profileId, defaults: defaults)
    }
}
