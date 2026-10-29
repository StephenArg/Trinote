import Foundation

/// One to-do task state as Trilium (v0.104+) defines it: a child note of the hidden `_taskStates` note whose title is
/// the state's name in menus and whose labels hold the rest (`#stateId`, `#markdownSymbol`, `#isCompleted`, `#color`,
/// `#iconClass`, `#isHidden`). Mirrors `TaskStateDef` in Trilium's `packages/commons/src/lib/task_states.ts`.
///
/// A to-do item stores the state as `data-trilium-task-state="<name>"` (plus a `title` tooltip) on its `<li>`; `none`
/// and `done` are never written, they are the checkbox's own `checked`.
struct TaskStateDefinition: Codable, Hashable, Sendable, Identifiable {
    /// The definition note; nil for the built-in fallbacks.
    var noteId: String?
    /// The branch under `_taskStates`, for reordering; nil when unknown.
    var branchId: String?
    /// The `stateId` label: what notes store in `data-trilium-task-state`.
    var name: String
    var title: String
    /// One character for Markdown (`/` makes `- [/]`); empty when the state has none.
    var markdownSymbol: String
    /// Whether an item in this state counts as done: its checkbox is stored `checked`.
    var isCompleted: Bool
    /// Any CSS color, or empty.
    var color: String
    /// Icon class, e.g. `bx bx-loader`.
    var iconClass: String
    /// Left out of the menu (and Trilium's toolbar and keyboard cycle); items already in it still draw.
    var isHidden: Bool

    var id: String { noteId ?? name }

    /// `none` or `done`: Trilium's fixed states, which only the order of can change.
    var isAnchor: Bool { TaskStateCatalog.isAnchor(name) }

    /// The title, or the identifier when the title is empty (as Trilium's toolbar labels it).
    var displayTitle: String { title.isEmpty ? name : title }
}

/// Trilium's built-in task states, how its `_taskStates` notes become definitions, and its validation.
enum TaskStateCatalog {
    static let containerNoteId = "_taskStates"
    static let noneNoteId = "_taskStateNone"
    static let doneNoteId = "_taskStateDone"
    static let noneName = "none"
    static let doneName = "done"

    /// The labels a state note keeps its fields in.
    enum Label {
        static let stateId = "stateId"
        static let markdownSymbol = "markdownSymbol"
        static let isCompleted = "isCompleted"
        static let color = "color"
        static let iconClass = "iconClass"
        static let isHidden = "isHidden"
        /// Trilium's help page for the note (`task_state` for custom states).
        static let docName = "docName"
        static let archived = "archived"
    }

    static let none = TaskStateDefinition(
        noteId: noneNoteId, name: noneName, title: "None", markdownSymbol: " ",
        isCompleted: false, color: "", iconClass: "bx bx-checkbox", isHidden: false
    )

    static let done = TaskStateDefinition(
        noteId: doneNoteId, name: doneName, title: "Done", markdownSymbol: "x",
        isCompleted: true, color: "#4de64d", iconClass: "bx bx-check", isHidden: false
    )

    /// The customizable states Trilium seeds on a new database.
    static let defaultCustom: [TaskStateDefinition] = [
        TaskStateDefinition(
            noteId: "_taskStateDoing", name: "doing", title: "Doing", markdownSymbol: "/",
            isCompleted: false, color: "#e6a23c", iconClass: "bx bx-loader", isHidden: false
        ),
        TaskStateDefinition(
            noteId: "_taskStateMaybe", name: "maybe", title: "Maybe", markdownSymbol: "?",
            isCompleted: false, color: "", iconClass: "bx bx-question-mark", isHidden: false
        ),
        TaskStateDefinition(
            noteId: "_taskStateCancelled", name: "cancelled", title: "Cancelled", markdownSymbol: "-",
            isCompleted: false, color: "#e64d4d", iconClass: "bx bx-block", isHidden: false
        ),
    ]

    /// Trilium's default order (None, Doing, Done, Maybe, Cancelled), used wherever the server's list isn't known.
    static let defaults: [TaskStateDefinition] = [none, defaultCustom[0], done, defaultCustom[1], defaultCustom[2]]

    static func isAnchor(_ name: String) -> Bool {
        name == noneName || name == doneName
    }

    static func isAnchorNote(_ noteId: String?) -> Bool {
        noteId == noneNoteId || noteId == doneNoteId
    }

    // MARK: - Reading `_taskStates`

    /// The definitions under `_taskStates`, in branch order and before validation. `children` is `tree/load` for the
    /// child note ids (their notes and owned labels). Deleted and `#archived` children are left out; the anchors keep
    /// their fixed fields and take only their title from the server.
    static func parse(childBranches: [TreeLoadBranchRow], children: TreeLoadResponse) -> [TaskStateDefinition] {
        let notesById = Dictionary(children.notes.map { ($0.noteId, $0) }, uniquingKeysWith: { first, _ in first })
        var labelsByNote: [String: [TreeLoadAttributeRow]] = [:]
        for attribute in children.attributes where attribute.type == "label" {
            labelsByNote[attribute.noteId, default: []].append(attribute)
        }

        let ordered = childBranches
            .filter { $0.parentNoteId == containerNoteId && $0.isDeleted != true }
            .sorted { $0.notePosition < $1.notePosition }

        return ordered.compactMap { branch -> TaskStateDefinition? in
            guard let note = notesById[branch.noteId], note.isDeleted != true else { return nil }
            let labels = (labelsByNote[branch.noteId] ?? []).sorted { $0.position < $1.position }
            func value(_ name: String) -> String? { labels.first { $0.name == name }?.value }

            if branch.noteId == noneNoteId || branch.noteId == doneNoteId {
                var anchor = branch.noteId == noneNoteId ? none : done
                anchor.branchId = branch.branchId
                if !note.title.isEmpty { anchor.title = note.title }
                return anchor
            }
            if value(Label.archived) != nil { return nil }
            return TaskStateDefinition(
                noteId: branch.noteId,
                branchId: branch.branchId,
                name: value(Label.stateId) ?? "",
                title: note.title,
                markdownSymbol: value(Label.markdownSymbol) ?? "",
                isCompleted: value(Label.isCompleted) == "true",
                color: value(Label.color) ?? "",
                iconClass: value(Label.iconClass) ?? "",
                isHidden: value(Label.isHidden) == "true"
            )
        }
    }

    // MARK: - Validation (Trilium's `validateTaskStates`)

    enum ValidationReason: String, Hashable, Sendable {
        case undefinedName = "undefined-name"
        case invalidName = "invalid-name"
        case duplicateName = "duplicate-name"
        case missingTitle = "missing-title"
        case missingIcon = "missing-icon"
        case invalidSymbol = "invalid-symbol"
        case duplicateSymbol = "duplicate-symbol"

        /// What to tell the user, worded like Trilium's validation messages.
        var message: String {
            switch self {
            case .undefinedName:
                return String(localized: "The identifier is missing.", comment: "Task state validation: no identifier")
            case .invalidName:
                return String(localized: "The identifier may only contain letters, digits, “-” and “_”.", comment: "Task state validation: bad identifier characters")
            case .duplicateName:
                return String(localized: "Another task state already uses this identifier.", comment: "Task state validation: identifier taken")
            case .missingTitle:
                return String(localized: "The title is missing.", comment: "Task state validation: no title")
            case .missingIcon:
                return String(localized: "The icon is missing.", comment: "Task state validation: no icon")
            case .invalidSymbol:
                return String(localized: "The Markdown symbol must be a single character other than “[”, “]”, a space or “x”.", comment: "Task state validation: bad Markdown symbol")
            case .duplicateSymbol:
                return String(localized: "Another task state already uses this Markdown symbol.", comment: "Task state validation: Markdown symbol taken")
            }
        }
    }

    struct ValidationError: Hashable, Sendable {
        let noteId: String
        let title: String
        let reason: ValidationReason
    }

    private static let forbiddenMarkdownSymbols: Set<String> = ["[", "]", " ", "x", "X"]

    static func isValidName(_ name: String) -> Bool {
        !name.isEmpty && name.unicodeScalars.allSatisfy { scalar in
            scalar.isASCII && (CharacterSet.alphanumerics.contains(scalar) || scalar == "-" || scalar == "_")
        }
    }

    /// Why `state` fails Trilium's checks given the names and symbols of the states before it; nil when it passes.
    static func reason(
        for state: TaskStateDefinition,
        seenNames: Set<String>,
        seenSymbols: Set<String>
    ) -> ValidationReason? {
        if state.name.isEmpty { return .undefinedName }
        if !isValidName(state.name) { return .invalidName }
        if seenNames.contains(state.name) { return .duplicateName }
        if state.title.isEmpty { return .missingTitle }
        if state.iconClass.isEmpty { return .missingIcon }
        if !state.markdownSymbol.isEmpty {
            if state.markdownSymbol.count != 1 || forbiddenMarkdownSymbols.contains(state.markdownSymbol) {
                return .invalidSymbol
            }
            if seenSymbols.contains(state.markdownSymbol) { return .duplicateSymbol }
        }
        return nil
    }

    /// Drops invalid custom states in one pass, in order (a later duplicate loses); the anchors always pass.
    static func validate(_ states: [TaskStateDefinition]) -> (valid: [TaskStateDefinition], errors: [ValidationError]) {
        var valid: [TaskStateDefinition] = []
        var errors: [ValidationError] = []
        var seenNames: Set<String> = [noneName, doneName]
        var seenSymbols: Set<String> = []

        for state in states {
            if isAnchorNote(state.noteId) {
                valid.append(state)
                continue
            }
            if let reason = reason(for: state, seenNames: seenNames, seenSymbols: seenSymbols) {
                errors.append(ValidationError(noteId: state.noteId ?? "", title: state.title.isEmpty ? state.name : state.title, reason: reason))
                continue
            }
            seenNames.insert(state.name)
            if !state.markdownSymbol.isEmpty { seenSymbols.insert(state.markdownSymbol) }
            valid.append(state)
        }
        return (valid, errors)
    }

    /// What `state` would fail if saved among `others` (the full list, which may include `state` itself by note id):
    /// for the edit form, which checks the name and symbol against every other state, wherever it sits.
    static func reason(for state: TaskStateDefinition, among others: [TaskStateDefinition]) -> ValidationReason? {
        if isAnchorNote(state.noteId) { return nil }
        let rest = others.filter { $0.id != state.id }
        let names = Set(rest.map(\.name)).union([noneName, doneName])
        let symbols = Set(rest.filter { !$0.isAnchor }.map(\.markdownSymbol).filter { !$0.isEmpty })
        return reason(for: state, seenNames: names, seenSymbols: symbols)
    }

    // MARK: - Tapping

    /// The state a plain tap moves an item to. With `done` as the tap state this is Trilium's toggle: a completed item
    /// goes back to None, anything else becomes Done. Another tap state makes the box toggle between None and it.
    /// A tap state that no longer exists, or is hidden, falls back to `done`. `isChecked` is the box's stored `checked`,
    /// which decides for a state this server doesn't define (as it does in Trilium).
    static func stateAfterTap(current: String, isChecked: Bool, tapState: String, states: [TaskStateDefinition]) -> String {
        let tap = effectiveTapState(tapState, states: states)
        let definition = states.first { $0.name == current }
        let currentIsCompleted = current == doneName || (definition?.isCompleted ?? (current != noneName && isChecked))
        if current == tap || currentIsCompleted { return noneName }
        return tap
    }

    /// `tapState` when it is a visible state other than None; otherwise `done`.
    static func effectiveTapState(_ tapState: String, states: [TaskStateDefinition]) -> String {
        guard tapState != noneName,
              tapState == doneName || states.contains(where: { $0.name == tapState && !$0.isHidden })
        else { return doneName }
        return tapState
    }
}
