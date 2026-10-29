import Foundation
import Observation

/// The active server's to-do task states (Trilium v0.104+), read from its hidden `_taskStates` note, and Trinote's own
/// choice of what a plain tap on a checkbox sets.
///
/// Trinote never syncs `_hidden`, so the last list read is remembered per server (UserDefaults) for offline use and
/// launches. Reads happen on sign-in and reconnect, when the Task States screen opens, after each edit made there,
/// and when a sync pull touches the definitions (`TaskStateSyncSignal`).
@Observable
@MainActor
final class TaskStateStore {
    /// The valid states, in the server's order. Trilium's defaults until the server's list is known.
    private(set) var states: [TaskStateDefinition] = TaskStateCatalog.defaults
    /// Every definition the server holds, invalid ones included (the Task States screen lists them all).
    private(set) var serverDefinitions: [TaskStateDefinition] = []
    /// Definitions the server's own validation drops.
    private(set) var validationErrors: [TaskStateCatalog.ValidationError] = []
    /// Whether the server has task states (Trilium v0.104+), as of the last read; text notes only get the state menu
    /// then, since an older server's editor would drop the attribute.
    private(set) var isServerBacked = false
    /// The state a plain tap sets (`done` by default), per server.
    private(set) var tapStateName = TaskStateCatalog.doneName
    /// Bumped whenever `states` or `tapStateName` change, so open notes and editors redraw.
    private(set) var revision = 0
    private(set) var isRefreshing = false

    @ObservationIgnored private(set) var profileId: String?
    @ObservationIgnored private let defaults: UserDefaults

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
    }

    /// The states the menu offers: the visible ones, in order.
    var menuStates: [TaskStateDefinition] { states.filter { !$0.isHidden } }

    /// What a tap sets right now (a hidden or deleted choice falls back to `done`).
    var effectiveTapStateName: String { TaskStateCatalog.effectiveTapState(tapStateName, states: states) }

    func definition(named name: String) -> TaskStateDefinition? {
        states.first { $0.name == name }
    }

    // MARK: - Profile

    /// Switches to `profileId`'s remembered list and tap state (or the defaults when there are none).
    func activate(profileId: String?) {
        guard profileId != self.profileId else { return }
        self.profileId = profileId
        let snapshot = profileId.flatMap { Self.loadSnapshot(profileId: $0, defaults: defaults) }
        apply(definitions: snapshot?.definitions ?? [], serverBacked: snapshot?.serverBacked ?? false)
        tapStateName = profileId.flatMap { defaults.string(forKey: Self.tapStateKey(profileId: $0)) } ?? TaskStateCatalog.doneName
        revision += 1
    }

    func setTapStateName(_ name: String) {
        guard name != tapStateName else { return }
        tapStateName = name
        if let profileId { defaults.set(name, forKey: Self.tapStateKey(profileId: profileId)) }
        revision += 1
    }

    // MARK: - Reading the server

    /// Reads `_taskStates` from the server. `serverInfo` gates it: an older server has no task states. A failed read
    /// keeps the list already held.
    func refresh(client: any TriliumClientProtocol, serverInfo: AppInfoResponse?, profileId: String) async {
        activate(profileId: profileId)
        if let serverInfo, !TriliumServerCompatibility.supportsCustomTaskStates(serverInfo) {
            store(definitions: [], serverBacked: false, profileId: profileId)
            return
        }
        isRefreshing = true
        defer { isRefreshing = false }
        do {
            let definitions = try await Self.fetchDefinitions(client: client)
            guard self.profileId == profileId else { return }
            store(definitions: definitions ?? [], serverBacked: definitions != nil, profileId: profileId)
        } catch {
            Log.api.warning("Could not read the server's task states: \(error)")
        }
    }

    /// The definitions under `_taskStates` in order, or nil when the server has no such note.
    static func fetchDefinitions(client: any TriliumClientProtocol) async throws -> [TaskStateDefinition]? {
        let containerId = TaskStateCatalog.containerNoteId
        let container = try await client.batchTreeLoad(noteIds: [containerId])
        guard container.notes.contains(where: { $0.noteId == containerId && $0.isDeleted != true }) else { return nil }
        let branches = container.branches.filter { $0.parentNoteId == containerId && $0.isDeleted != true }
        guard !branches.isEmpty else { return [] }
        let children = try await client.batchTreeLoad(noteIds: branches.map(\.noteId))
        return TaskStateCatalog.parse(childBranches: branches, children: children)
    }

    private func store(definitions: [TaskStateDefinition], serverBacked: Bool, profileId: String) {
        let snapshot = Snapshot(definitions: definitions, serverBacked: serverBacked)
        if let data = try? JSONEncoder().encode(snapshot) {
            defaults.set(data, forKey: Self.snapshotKey(profileId: profileId))
        }
        let before = (states, isServerBacked, serverDefinitions)
        apply(definitions: definitions, serverBacked: serverBacked)
        if before != (states, isServerBacked, serverDefinitions) { revision += 1 }
    }

    private func apply(definitions: [TaskStateDefinition], serverBacked: Bool) {
        let (valid, errors) = TaskStateCatalog.validate(definitions)
        serverDefinitions = definitions
        validationErrors = errors
        isServerBacked = serverBacked
        // Like Trilium, nothing valid means the defaults.
        states = valid.isEmpty ? TaskStateCatalog.defaults : valid
    }

    // MARK: - Remembered per server

    private nonisolated struct Snapshot: Codable {
        let definitions: [TaskStateDefinition]
        let serverBacked: Bool
    }

    private nonisolated static func snapshotKey(profileId: String) -> String { "taskStates.\(profileId)" }
    private nonisolated static func tapStateKey(profileId: String) -> String { "taskStateTapState.\(profileId)" }

    private static func loadSnapshot(profileId: String, defaults: UserDefaults) -> Snapshot? {
        guard let data = defaults.data(forKey: snapshotKey(profileId: profileId)) else { return nil }
        return try? JSONDecoder().decode(Snapshot.self, from: data)
    }

    /// The definition note ids last read from `profileId`'s server; safe off the main actor (sync reads it).
    nonisolated static func rememberedNoteIds(profileId: String, defaults: UserDefaults = .standard) -> Set<String> {
        guard let data = defaults.data(forKey: snapshotKey(profileId: profileId)),
              let snapshot = try? JSONDecoder().decode(Snapshot.self, from: data)
        else { return [] }
        return Set(snapshot.definitions.compactMap(\.noteId))
    }

    /// Drops what is remembered for a removed server.
    nonisolated static func forget(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: snapshotKey(profileId: profileId))
        defaults.removeObject(forKey: tapStateKey(profileId: profileId))
    }
}

/// Whether a pulled sync change touches the task-state definitions, so the app re-reads them.
struct TaskStateSyncSignal: Sendable {
    /// The definition notes last read from this server.
    let knownNoteIds: Set<String>

    private static let stateLabels: Set<String> = [
        TaskStateCatalog.Label.stateId, TaskStateCatalog.Label.markdownSymbol,
        TaskStateCatalog.Label.isCompleted, TaskStateCatalog.Label.isHidden,
    ]

    private func isStateNote(_ noteId: String?) -> Bool {
        guard let noteId else { return false }
        return knownNoteIds.contains(noteId) || noteId.hasPrefix("_taskState")
    }

    func touches(entityName: String, entityId: String, row: [String: Any]?) -> Bool {
        switch entityName {
        case "notes":
            return isStateNote(entityId)
        case "branches":
            return (row?["parentNoteId"] as? String) == TaskStateCatalog.containerNoteId || isStateNote(row?["noteId"] as? String)
        case "attributes":
            if isStateNote(row?["noteId"] as? String) { return true }
            return (row?["name"] as? String).map(Self.stateLabels.contains) ?? false
        case "note_reordering":
            return entityId == TaskStateCatalog.containerNoteId
        default:
            return false
        }
    }
}
