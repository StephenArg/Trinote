import Foundation

/// What kind of note the Add Note tab makes without asking: a note type, a collection view, or a user template.
/// Kept per server profile; nothing stored means the tab asks each time.
enum AddNoteKindDefault: Codable, Equatable {
    /// A `NoteType` raw value.
    case type(String)
    /// A `NoteTypeChange.CollectionView` raw value.
    case collection(String)
    /// A `#template` note, and whether its `~template:newNoteDefaultParent` wins over the chosen place.
    case template(noteId: String, title: String, type: String, mime: String, followsDestination: Bool)

    init(kind: NewNoteKind) {
        switch kind {
        case .type(let type): self = .type(type.rawValue)
        case .collection(let view): self = .collection(view.rawValue)
        }
    }

    init(template: UserNoteTemplate, followsDestination: Bool) {
        self = .template(
            noteId: template.noteId, title: template.title, type: template.type, mime: template.mime,
            followsDestination: followsDestination
        )
    }

    /// The type or collection to make; nil for a template, or for a stored type this build doesn't know.
    var newNoteKind: NewNoteKind? {
        switch self {
        case .type(let raw): NoteType(rawValue: raw).map { .type($0) }
        case .collection(let raw): NoteTypeChange.CollectionView(rawValue: raw).map { .collection($0) }
        case .template: nil
        }
    }

    var template: UserNoteTemplate? {
        guard case .template(let noteId, let title, let type, let mime, _) = self else { return nil }
        return UserNoteTemplate(noteId: noteId, title: title, type: type, mime: mime)
    }

    var followsTemplateDestination: Bool {
        guard case .template(_, _, _, _, let follows) = self else { return false }
        return follows
    }

    /// Names the kind in Settings.
    var displayTitle: String {
        switch self {
        case .template(_, let title, _, _, _):
            title.isEmpty ? String(localized: "Template", comment: "New note from a user template") : title
        case .type, .collection:
            newNoteKind?.title ?? String(localized: "Text", comment: "Note type")
        }
    }

    // MARK: - Storage (UserDefaults, per server profile)

    private static func key(profileId: String) -> String {
        "trinote.addNoteKind." + profileId
    }

    static func load(profileId: String, defaults: UserDefaults = .standard) -> AddNoteKindDefault? {
        guard let data = defaults.data(forKey: key(profileId: profileId)) else { return nil }
        return try? JSONDecoder().decode(AddNoteKindDefault.self, from: data)
    }

    func save(profileId: String, defaults: UserDefaults = .standard) {
        guard let data = try? JSONEncoder().encode(self) else { return }
        defaults.set(data, forKey: Self.key(profileId: profileId))
    }

    static func remove(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: key(profileId: profileId))
    }

    /// A template made offline got its server id: keep pointing at it.
    static func remapOfflineId(from: String, to: String, profileId: String, defaults: UserDefaults = .standard) {
        guard case .template(let noteId, let title, let type, let mime, let follows)? = load(profileId: profileId, defaults: defaults),
              noteId == from
        else { return }
        AddNoteKindDefault.template(noteId: to, title: title, type: type, mime: mime, followsDestination: follows)
            .save(profileId: profileId, defaults: defaults)
    }
}

/// Makes the Add Note tab's note the way the tree's New Note sheet does: on the device first (it works offline), then
/// uploaded in the background. Returns the note with the title it was given (a parent's title template may name it).
@MainActor
enum AddNoteCreation {
    static func create(parentNoteId: String, title: String, kind: AddNoteKindDefault?, appState: AppState) async throws -> NoteNavItem {
        guard let profileId = appState.activeProfile?.id else { throw ShortcutError.notSignedIn }
        let persistence = PersistenceManager.shared
        let noteId: String
        if let template = kind?.template {
            var parent = parentNoteId
            var clones: [String] = []
            if kind?.followsTemplateDestination == true {
                let destinations = await NoteTemplates.destinations(forTemplate: template.noteId, appState: appState)
                if let first = destinations.first {
                    parent = first.noteId
                    clones = destinations.dropFirst().map(\.noteId)
                }
            }
            noteId = try NoteTemplates.createNote(from: template, parentNoteId: parent, title: title, appState: appState)
            if !clones.isEmpty {
                Task { await NoteTemplates.cloneNewNote(noteId, into: clones, appState: appState) }
            }
        } else {
            let newNoteKind = kind?.newNoteKind ?? .text
            let (id, _) = try persistence.createOfflineChildNote(
                parentNoteId: parentNoteId,
                title: NoteCreationTitle.resolved(from: title),
                noteType: newNoteKind.triliumStorageType,
                mime: newNoteKind.creationMime,
                initialContent: newNoteKind.creationInitialContent,
                serverProfileId: profileId,
                initialAttributes: newNoteKind.creationInitialAttributes,
                useParentTitleTemplate: title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            )
            noteId = id
        }
        let savedTitle = (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.title
        return NoteNavItem(noteId: noteId, title: savedTitle ?? NoteCreationTitle.resolved(from: title))
    }
}
