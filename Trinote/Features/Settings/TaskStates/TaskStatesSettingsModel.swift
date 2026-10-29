import Foundation
import Observation

/// Settings → To-do Task States: edits the server's task states the way Trilium's own Task States pane does. Each state
/// is a note under the hidden `_taskStates` note; its title is the state's name and its labels hold the rest, so a save
/// is a title change plus one `PUT /api/notes/:id/attribute` per changed label (other labels stay). New states are made
/// like Trilium's `createTaskStateNote`, and the order is the notes' branch order.
@Observable
@MainActor
final class TaskStatesSettingsModel {
    private let appState: AppState
    private(set) var isWorking = false
    var errorMessage: String?

    init(appState: AppState) {
        self.appState = appState
    }

    private var store: TaskStateStore { appState.taskStates }

    /// Every state the server holds, in order (invalid ones too, so they can be fixed); Trilium's defaults when the
    /// server's list isn't known.
    var rows: [TaskStateDefinition] {
        store.isServerBacked && !store.serverDefinitions.isEmpty ? store.serverDefinitions : store.states
    }

    var tapChoices: [TaskStateDefinition] {
        store.states.filter { !$0.isHidden && $0.name != TaskStateCatalog.noneName }
    }

    var serverSupportsTaskStates: Bool {
        guard let info = appState.serverAppInfo else { return store.isServerBacked }
        return TriliumServerCompatibility.supportsCustomTaskStates(info)
    }

    var canEdit: Bool {
        appState.isOnline && appState.client != nil && serverSupportsTaskStates && store.isServerBacked && !isWorking
    }

    /// Why the states can't be edited right now; nil when they can.
    var readOnlyReason: String? {
        if !serverSupportsTaskStates {
            return String(
                format: String(localized: "Custom task states need Trilium %@ or newer.", comment: "Task states settings: server too old; %@ is the version"),
                locale: .current,
                TriliumServerCompatibility.customTaskStatesMinAppVersion
            )
        }
        if !appState.isOnline || appState.client == nil {
            return String(localized: "Connect to your server to change the task states.", comment: "Task states settings: offline")
        }
        if !store.isServerBacked {
            return String(localized: "The server's task states couldn't be read.", comment: "Task states settings: read failed")
        }
        return nil
    }

    func validationError(for state: TaskStateDefinition) -> TaskStateCatalog.ValidationReason? {
        store.validationErrors.first { $0.noteId == state.noteId }?.reason
    }

    func refresh() async {
        await appState.refreshTaskStates()
    }

    // MARK: - Writes

    /// Saves `edited` over `original` (same note): the title, then each label that changed.
    func save(_ edited: TaskStateDefinition, original: TaskStateDefinition) async -> Bool {
        guard let noteId = original.noteId, !original.isAnchor else { return false }
        return await perform { client in
            if edited.title != original.title {
                _ = try await client.updateNote(noteId, request: UpdateNoteRequest(title: edited.title, type: nil, mime: nil))
            }
            let changed = Self.labelValues(of: edited).filter { name, value in
                Self.labelValues(of: original)[name] != value
            }
            guard !changed.isEmpty else { return }
            let attributeIds = try await self.ownedLabelIds(noteId: noteId, client: client)
            for (name, value) in changed.sorted(by: { $0.key < $1.key }) {
                _ = try await client.updateNoteAttribute(UpdateNoteAttributeRequest(
                    noteId: noteId, attributeId: attributeIds[name], type: "label", name: name, value: value
                ))
            }
        }
    }

    /// Adds `state` at the end of the list, as Trilium's `createTaskStateNote` makes one.
    func create(_ state: TaskStateDefinition) async -> Bool {
        await perform { client in
            let response = try await client.createNote(CreateNoteRequest(
                parentNoteId: TaskStateCatalog.containerNoteId,
                title: state.title,
                type: "doc",
                mime: nil,
                content: "",
                notePosition: nil,
                prefix: nil,
                isProtected: nil,
                noteId: nil,
                branchId: nil,
                templateNoteId: nil
            ))
            let noteId = response.note.noteId
            // `_taskStates` copies its `child:` label definitions onto the new note; these are the values.
            let attributeIds = try await self.ownedLabelIds(noteId: noteId, client: client)
            var labels = Self.labelValues(of: state)
            labels[TaskStateCatalog.Label.docName] = "task_state"
            for name in Self.creationLabelOrder where labels[name] != nil {
                _ = try await client.updateNoteAttribute(UpdateNoteAttributeRequest(
                    noteId: noteId, attributeId: attributeIds[name], type: "label", name: name, value: labels[name] ?? ""
                ))
            }
        }
    }

    /// Sends a custom state's note to Trilium's trash. Items in that state then draw as None or Done.
    func delete(_ state: TaskStateDefinition) async -> Bool {
        guard let noteId = state.noteId, !state.isAnchor else { return false }
        return await perform { client in
            try await client.deleteNote(noteId, eraseNotes: false)
        }
    }

    /// Moves the rows at `offsets` to `destination` (List's `onMove`), placing the moved state's branch among the others.
    func move(fromOffsets offsets: IndexSet, toOffset destination: Int) async {
        var ordered = rows
        let moving = offsets.map { ordered[$0] }
        ordered.move(fromOffsets: offsets, toOffset: destination)
        let branchIds = ordered.compactMap(\.branchId)
        guard branchIds.count == ordered.count, moving.count == 1, let branchId = moving[0].branchId else {
            await refresh()
            return
        }
        _ = await perform { client in
            try await client.placeBranchInSiblingOrder(branchId, orderedSiblingBranchIds: branchIds)
        }
    }

    // MARK: - Helpers

    /// Trilium's label order for a new state (`createTaskStateNote`).
    static let creationLabelOrder = [
        TaskStateCatalog.Label.iconClass, TaskStateCatalog.Label.stateId, TaskStateCatalog.Label.markdownSymbol,
        TaskStateCatalog.Label.isCompleted, TaskStateCatalog.Label.color, TaskStateCatalog.Label.isHidden,
        TaskStateCatalog.Label.docName,
    ]

    /// The label values a state is stored as.
    static func labelValues(of state: TaskStateDefinition) -> [String: String] {
        [
            TaskStateCatalog.Label.stateId: state.name,
            TaskStateCatalog.Label.markdownSymbol: state.markdownSymbol,
            TaskStateCatalog.Label.isCompleted: state.isCompleted ? "true" : "false",
            TaskStateCatalog.Label.color: state.color,
            TaskStateCatalog.Label.iconClass: state.iconClass,
            TaskStateCatalog.Label.isHidden: state.isHidden ? "true" : "false",
        ]
    }

    /// The note's own labels by name (the first of each), for updating them in place.
    private func ownedLabelIds(noteId: String, client: any TriliumClientProtocol) async throws -> [String: String] {
        let tree = try await client.batchTreeLoad(noteIds: [noteId])
        var ids: [String: String] = [:]
        for attribute in tree.attributes.sorted(by: { $0.position < $1.position })
        where attribute.noteId == noteId && attribute.type == "label" && ids[attribute.name] == nil {
            ids[attribute.name] = attribute.attributeId
        }
        return ids
    }

    /// Runs one write, then re-reads the states (also after a failure, so the list shows what the server holds).
    private func perform(_ work: (any TriliumClientProtocol) async throws -> Void) async -> Bool {
        guard let client = appState.client else { return false }
        isWorking = true
        errorMessage = nil
        defer { isWorking = false }
        var succeeded = true
        do {
            try await work(client)
        } catch {
            succeeded = false
            errorMessage = APIError.from(error).localizedDescription
        }
        await appState.refreshTaskStates()
        return succeeded
    }

    /// A Trilium-safe identifier from a title: lowercase letters, digits and hyphens, with the `_` prefix Trilium's docs
    /// recommend for custom states.
    static func suggestedIdentifier(forTitle title: String) -> String {
        var slug = ""
        for scalar in title.lowercased().unicodeScalars {
            if scalar.isASCII, CharacterSet.alphanumerics.contains(scalar) {
                slug.unicodeScalars.append(scalar)
            } else if !slug.hasSuffix("-"), !slug.isEmpty {
                slug.append("-")
            }
        }
        while slug.hasSuffix("-") { slug.removeLast() }
        return slug.isEmpty ? "" : "_" + slug
    }
}
