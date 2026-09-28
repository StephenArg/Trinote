import SwiftUI

/// A user note marked `#template`, offered when creating a note.
struct UserNoteTemplate: Identifiable, Hashable, Sendable {
    let noteId: String
    let title: String
    /// Trilium storage type and MIME, which the new note takes from the template.
    let type: String
    let mime: String
    var id: String { noteId }
}

/// A note a template sends new notes to (`~template:newNoteDefaultParent`).
struct TemplateDestination: Hashable, Sendable {
    let noteId: String
    let title: String
}

/// A new-note sheet's template choice: the template, where it sends its notes, and whether to follow it there.
struct NewNoteTemplateChoice: Equatable {
    var template: UserNoteTemplate?
    /// The template's `~template:newNoteDefaultParent` targets.
    var destinations: [TemplateDestination] = []
    /// Create in the template's destination (Trilium's behaviour) rather than where the sheet was opened.
    var followsDestination = true

    /// Where the note is created: the template's first destination, or `defaultParentNoteId`.
    func parentNoteId(defaultParentNoteId: String) -> String {
        followsDestination ? (destinations.first?.noteId ?? defaultParentNoteId) : defaultParentNoteId
    }

    /// Further destinations the note is cloned into once it is on the server.
    var cloneParentNoteIds: [String] {
        followsDestination ? destinations.dropFirst().map(\.noteId) : []
    }
}

/// The "Template" row of a new-note sheet, and where the chosen template sends its notes.
struct NewNoteTemplateSection: View {
    @Binding var choice: NewNoteTemplateChoice

    @Environment(AppState.self) private var appState
    @State private var templates: [UserNoteTemplate] = []
    @State private var isLoading = true

    private var selection: Binding<String?> {
        Binding(
            get: { choice.template?.noteId },
            set: { id in
                choice = NewNoteTemplateChoice(template: templates.first { $0.noteId == id })
                guard let id else { return }
                Task {
                    let found = await NoteTemplates.destinations(forTemplate: id, appState: appState)
                    if choice.template?.noteId == id { choice.destinations = found }
                }
            }
        )
    }

    var body: some View {
        Group {
            // Always shown, so a list with no templates reads as "none found" rather than as a missing feature.
            Section {
                if templates.isEmpty {
                    LabeledContent(String(localized: "Template", comment: "New note from a user template")) {
                        Text(isLoading
                            ? String(localized: "Loading…", comment: "New note: templates loading")
                            : String(localized: "None found", comment: "New note: no #template notes"))
                    }
                    .foregroundStyle(.secondary)
                } else {
                    Picker(String(localized: "Template", comment: "New note from a user template"), selection: selection) {
                        Text(String(localized: "None", comment: "New note: no template")).tag(String?.none)
                        ForEach(templates) { template in
                            Text(template.title).tag(Optional(template.noteId))
                        }
                    }
                }
            } footer: {
                if !isLoading, templates.isEmpty {
                    Text(String(
                        localized: "Notes labelled #template in Trilium appear here.",
                        comment: "New note: how to add templates"
                    ))
                }
            }
            // On the Section, not the Group: a Group's modifiers go to the rows it renders, so a task on it never runs
            // while it renders none, and runs once per row when it renders several.
            .task {
                templates = await NoteTemplates.load(appState: appState)
                isLoading = false
            }
            if let first = choice.destinations.first {
                Section {
                    Toggle(isOn: $choice.followsDestination) {
                        Text(String(
                            format: String(localized: "Create in “%@”", comment: "New note goes to the template's default parent"),
                            first.title
                        ))
                    }
                    if choice.followsDestination, choice.destinations.count > 1 {
                        Text(String(
                            format: String(localized: "Also cloned into %@", comment: "New note: the template's further destinations"),
                            choice.destinations.dropFirst().map { "“\($0.title)”" }.joined(separator: ", ")
                        ))
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                    }
                } footer: {
                    Text(String(
                        localized: "The template chooses where its notes go (~template:newNoteDefaultParent).",
                        comment: "New note: why the destination changed"
                    ))
                }
            }
        }
    }
}

/// The user's templates and where each wants its notes, as Trilium's new-note dialog finds them.
@MainActor
enum NoteTemplates {
    /// Creates a note from a user template (queued like any new note; the server copies the template's content,
    /// attributes and children, and adds `~template`). The note takes the template's type. Returns the new note id.
    static func createNote(from template: UserNoteTemplate, parentNoteId: String, title: String, appState: AppState) throws -> String {
        guard let profileId = appState.activeProfile?.id else { throw APIError.noToken }
        let (noteId, _) = try PersistenceManager.shared.createOfflineChildNote(
            parentNoteId: parentNoteId,
            title: NoteCreationTitle.resolved(from: title),
            noteType: template.type,
            mime: template.mime,
            initialContent: "",
            serverProfileId: profileId,
            initialAttributes: [NoteCreationAttribute(type: "relation", name: "template", value: template.noteId)],
            useParentTitleTemplate: title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
        )
        return noteId
    }

    /// Clones a new note into a template's further destinations once it is on the server. Online-only.
    static func cloneNewNote(_ noteId: String, into parentNoteIds: [String], appState: AppState) async {
        guard !parentNoteIds.isEmpty, let client = appState.client, appState.isOnline else { return }
        await appState.flushPendingLocalChangesIfPossible()
        let serverId = appState.serverNoteId(for: noteId)
        guard !serverId.isOfflineLocalNoteId else { return }
        for parentId in parentNoteIds {
            do {
                let result = try await client.cloneNote(serverId, toParentNoteId: parentId)
                if !result.success, let message = result.message {
                    Log.api.warning("Template clone into \(parentId) refused: \(message)")
                }
            } catch {
                Log.api.error("Template clone into \(parentId) failed: \(error)")
            }
        }
        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
    }

    static let defaultParentRelation = "template:newNoteDefaultParent"

    /// `#template` notes outside the hidden subtree (the built-in ones are the note types), by title. Asks the server
    /// when online, so a template just made in Trilium shows; offline, or when the server can't answer, uses the
    /// synced notes.
    static func load(appState: AppState) async -> [UserNoteTemplate] {
        guard let profileId = appState.activeProfile?.id else { return [] }
        var templates: [UserNoteTemplate]?
        if let client = appState.client, appState.isOnline {
            do {
                templates = try await serverTemplates(client: client)
            } catch {
                Log.api.warning("Template lookup failed, using synced templates: \(error)")
            }
        }
        var seen = Set<String>()
        return (templates ?? cachedTemplates(profileId: profileId))
            .filter { seen.insert($0.noteId).inserted }
            .sorted { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }
    }

    private static func serverTemplates(client: any TriliumClientProtocol) async throws -> [UserNoteTemplate] {
        let ids = try await client.searchNoteIds(query: "#template", ancestorNoteId: nil).filter { !$0.hasPrefix("_") }
        guard !ids.isEmpty else { return [] }
        let tree = try await client.batchTreeLoad(noteIds: ids)
        let wanted = Set(ids)
        return tree.notes
            .filter { wanted.contains($0.noteId) && $0.isDeleted != true }
            .map { UserNoteTemplate(noteId: $0.noteId, title: $0.title, type: $0.type, mime: $0.mime) }
    }

    private static func cachedTemplates(profileId: String) -> [UserNoteTemplate] {
        let persistence = PersistenceManager.shared
        return persistence.cachedNoteIds(withLabel: "template", serverProfileId: profileId)
            .filter { !$0.hasPrefix("_") }
            .compactMap { id in
                guard let note = try? persistence.fetchCachedNote(id: id, serverProfileId: profileId) else { return nil }
                return UserNoteTemplate(noteId: id, title: note.title, type: note.noteType, mime: note.mime)
            }
    }

    /// Where notes made from `templateNoteId` go, as Trilium's `getTemplateDefaultParents`: the template's own
    /// `~template:newNoteDefaultParent` relations, or else the inheritable ones on the folders above it (never ones
    /// reaching it through a `~template`). Empty when it has none.
    static func destinations(forTemplate templateNoteId: String, appState: AppState) async -> [TemplateDestination] {
        guard let profileId = appState.activeProfile?.id else { return [] }
        let persistence = PersistenceManager.shared

        var ownAttributes = persistence.labelResolverContext(noteId: templateNoteId, serverProfileId: profileId)?.attributes ?? []
        var parentIds = persistence.labelResolverContext(noteId: templateNoteId, serverProfileId: profileId)?.parentNoteIds ?? []
        if let client = appState.client, appState.isOnline, let response = try? await client.getNote(templateNoteId) {
            let item = NoteItem(from: response)
            ownAttributes = item.attributes
            parentIds = item.parentNoteIds
        }

        let targets = destinationIds(
            templateNoteId: templateNoteId,
            ownAttributes: ownAttributes,
            parentNoteIds: parentIds,
            ancestor: { persistence.labelResolverContext(noteId: $0, serverProfileId: profileId) }
        )
        return targets.map { targetId in
            let cached = try? persistence.fetchCachedNote(id: targetId, serverProfileId: profileId)
            let title = cached?.title.isEmpty == false ? cached!.title : targetId
            return TemplateDestination(noteId: targetId, title: title)
        }
    }

    /// The rule on its own: the template's own relations win; otherwise every inheritable one on its ancestors counts.
    static func destinationIds(
        templateNoteId: String,
        ownAttributes: [AttributeItem],
        parentNoteIds: [String],
        ancestor: (String) -> TriliumLabelResolver.NoteContext?
    ) -> [String] {
        var targets = relationTargets(in: ownAttributes, inheritableOnly: false)
        guard targets.isEmpty else { return targets }
        var visited: Set<String> = [templateNoteId]
        var queue = parentNoteIds
        while let ancestorId = queue.first {
            queue.removeFirst()
            guard visited.insert(ancestorId).inserted, let context = ancestor(ancestorId) else { continue }
            for target in relationTargets(in: context.attributes, inheritableOnly: true) where !targets.contains(target) {
                targets.append(target)
            }
            queue.append(contentsOf: context.parentNoteIds)
        }
        return targets
    }

    private static func relationTargets(in attributes: [AttributeItem], inheritableOnly: Bool) -> [String] {
        var targets: [String] = []
        for attribute in attributes.sorted(by: { $0.position < $1.position })
        where attribute.type == .relation && attribute.name == defaultParentRelation && (!inheritableOnly || attribute.isInheritable) {
            let target = attribute.value.trimmingCharacters(in: .whitespacesAndNewlines)
            if !target.isEmpty, !targets.contains(target) { targets.append(target) }
        }
        return targets
    }
}
