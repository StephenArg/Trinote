import SwiftUI
import UIKit

/// Settings → To-do Task States: what tapping a checkbox sets (Trinote's own choice), and the server's task states
/// (Trilium v0.104+), which can be edited, added, deleted and reordered here as in Trilium's Task States pane.
struct TaskStatesSettingsView: View {
    /// Shown as a sheet from a note's state menu.
    var showsDoneButton = false

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var model: TaskStatesSettingsModel?
    @State private var editing: TaskStateDefinition?
    @State private var isCreating = false

    var body: some View {
        Group {
            if let model {
                content(model)
            } else {
                ProgressView()
            }
        }
        .navigationTitle(String(localized: "To-do Task States", comment: "Task states settings screen title"))
        .navigationBarTitleDisplayMode(.inline)
        .task {
            if model == nil { model = TaskStatesSettingsModel(appState: appState) }
            await model?.refresh()
        }
    }

    private func content(_ model: TaskStatesSettingsModel) -> some View {
        List {
            tapSection(model)
            statesSection(model)
            if !appState.taskStates.validationErrors.isEmpty {
                invalidSection(model)
            }
        }
        .listStyle(.insetGrouped)
        .refreshable { await model.refresh() }
        .toolbar {
            if showsDoneButton {
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Done", comment: "Close the task states settings")) { dismiss() }
                }
            }
            if model.canEdit {
                ToolbarItemGroup(placement: .topBarTrailing) {
                    EditButton()
                    Button {
                        isCreating = true
                    } label: {
                        Image(systemName: "plus")
                    }
                    .accessibilityLabel(String(localized: "Add Task State", comment: "Task states settings: add button"))
                }
            }
        }
        .sheet(item: $editing) { state in
            NavigationStack {
                TaskStateEditorView(model: model, original: state)
            }
        }
        .sheet(isPresented: $isCreating) {
            NavigationStack {
                TaskStateEditorView(model: model, original: nil)
            }
        }
        .alert(
            String(localized: "Couldn't Save", comment: "Task states settings: write failed alert title"),
            isPresented: Binding(get: { model.errorMessage != nil }, set: { if !$0 { model.errorMessage = nil } })
        ) {
            Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
        } message: {
            Text(model.errorMessage ?? "")
        }
    }

    // MARK: - Sections

    private func tapSection(_ model: TaskStatesSettingsModel) -> some View {
        Section {
            Picker(
                String(localized: "Tapping a Checkbox Sets", comment: "Task states settings: picker for the state a plain tap sets"),
                selection: Binding(
                    get: { appState.taskStates.effectiveTapStateName },
                    set: { appState.taskStates.setTapStateName($0) }
                )
            ) {
                ForEach(model.tapChoices) { state in
                    Text(state.displayTitle).tag(state.name)
                }
            }
        } footer: {
            Text(String(localized: "A tap toggles between None and this state; an item that counts as completed goes back to None. Hold a checkbox to pick any state. This choice is kept on this device.", comment: "Task states settings: footer under the tap picker"))
        }
    }

    private func statesSection(_ model: TaskStatesSettingsModel) -> some View {
        Section {
            if let reason = model.readOnlyReason {
                Label(reason, systemImage: "info.circle")
                    .foregroundStyle(.secondary)
            }
            ForEach(model.rows) { state in
                Button {
                    editing = state
                } label: {
                    TaskStateSettingsRow(state: state, invalid: model.validationError(for: state) != nil)
                }
                .buttonStyle(.plain)
                .deleteDisabled(state.isAnchor || !model.canEdit)
                .moveDisabled(!model.canEdit)
            }
            .onDelete { offsets in
                let targets = offsets.map { model.rows[$0] }
                Task {
                    for state in targets { _ = await model.delete(state) }
                }
            }
            .onMove { offsets, destination in
                Task { await model.move(fromOffsets: offsets, toOffset: destination) }
            }
        } header: {
            HStack {
                Text(String(localized: "Task States", comment: "Task states settings: list header"))
                if model.isWorking || appState.taskStates.isRefreshing {
                    Spacer()
                    ProgressView().controlSize(.small)
                }
            }
        } footer: {
            Text(String(localized: "These live on your Trilium server, in this order in the menu a held checkbox opens. None and Done are built in; only their place can change. Trilium's desktop and web apps show changes after a restart.", comment: "Task states settings: footer under the list"))
        }
    }

    private func invalidSection(_ model: TaskStatesSettingsModel) -> some View {
        Section {
            ForEach(appState.taskStates.validationErrors, id: \.self) { error in
                VStack(alignment: .leading, spacing: 2) {
                    Text(error.title.isEmpty ? error.noteId : error.title)
                    Text(error.reason.message)
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                }
            }
        } header: {
            Text(String(localized: "Ignored States", comment: "Task states settings: header for states Trilium drops as invalid"))
        } footer: {
            Text(String(localized: "Trilium ignores these until they are fixed.", comment: "Task states settings: footer for invalid states"))
        }
    }
}

/// One state in the settings list: its box, title, identifier and flags.
private struct TaskStateSettingsRow: View {
    let state: TaskStateDefinition
    let invalid: Bool

    var body: some View {
        HStack(spacing: 12) {
            TaskStateBoxView(state: state, size: 22)
            VStack(alignment: .leading, spacing: 2) {
                Text(state.displayTitle)
                    .foregroundStyle(.primary)
                HStack(spacing: 6) {
                    Text(state.name.isEmpty ? "—" : state.name)
                        .font(.caption.monospaced())
                    if !state.isAnchor, !state.markdownSymbol.isEmpty {
                        Text("[\(state.markdownSymbol)]")
                            .font(.caption.monospaced())
                    }
                }
                .foregroundStyle(.secondary)
            }
            Spacer(minLength: 8)
            if invalid {
                Image(systemName: "exclamationmark.triangle.fill")
                    .foregroundStyle(.orange)
                    .accessibilityLabel(String(localized: "Ignored by Trilium", comment: "Task states settings: invalid state badge"))
            }
            if state.isCompleted {
                badge(String(localized: "Completed", comment: "Task states settings: badge for a state that counts as completed"))
            }
            if state.isHidden {
                badge(String(localized: "Hidden", comment: "Task states settings: badge for a state left out of the menu"))
            }
            if state.isAnchor {
                Image(systemName: "lock.fill")
                    .font(.caption)
                    .foregroundStyle(.tertiary)
                    .accessibilityLabel(String(localized: "Built in", comment: "Task states settings: None and Done can't be edited"))
            }
        }
        .contentShape(Rectangle())
        .padding(.vertical, 2)
    }

    private func badge(_ text: String) -> some View {
        Text(text)
            .font(.caption2.weight(.semibold))
            .padding(.horizontal, 6)
            .padding(.vertical, 2)
            .background(Capsule().fill(Color.secondary.opacity(0.15)))
            .foregroundStyle(.secondary)
    }
}

/// Edits one state's fields (or a new state's), checked against Trilium's rules as they are typed.
struct TaskStateEditorView: View {
    let model: TaskStatesSettingsModel
    /// Nil for a new state.
    let original: TaskStateDefinition?

    @Environment(\.dismiss) private var dismiss
    @State private var draft: TaskStateDefinition
    @State private var color: Color?
    @State private var identifierEdited: Bool
    @State private var showIconPicker = false
    @State private var isSaving = false

    init(model: TaskStatesSettingsModel, original: TaskStateDefinition?) {
        self.model = model
        self.original = original
        let start = original ?? TaskStateDefinition(
            noteId: nil, name: "", title: "", markdownSymbol: "", isCompleted: false,
            color: "", iconClass: "bx bx-circle", isHidden: false
        )
        _draft = State(initialValue: start)
        _color = State(initialValue: CSSColorHue.rgb(of: start.color).map { Color(red: $0.0, green: $0.1, blue: $0.2) })
        _identifierEdited = State(initialValue: original != nil)
    }

    private var isAnchor: Bool { original?.isAnchor == true }
    private var isEditable: Bool { model.canEdit && !isAnchor }

    private var problem: TaskStateCatalog.ValidationReason? {
        guard !isAnchor else { return nil }
        return TaskStateCatalog.reason(for: draft, among: model.rows)
    }

    private var hasChanges: Bool { original.map { $0 != draft } ?? true }

    var body: some View {
        Form {
            Section {
                HStack {
                    Spacer()
                    TaskStateBoxView(state: draft, size: 44)
                    Spacer()
                }
                .listRowBackground(Color.clear)
            }
            if isAnchor {
                Section {
                    Label(
                        String(localized: "This is one of Trilium's built-in states. Only its place in the list can change.", comment: "Task state editor: None/Done notice"),
                        systemImage: "lock.fill"
                    )
                    .foregroundStyle(.secondary)
                }
            } else if let reason = model.readOnlyReason {
                Section {
                    Label(reason, systemImage: "info.circle").foregroundStyle(.secondary)
                }
            }
            Section {
                Button {
                    showIconPicker = true
                } label: {
                    HStack {
                        Text(String(localized: "Icon", comment: "Task state editor: icon row"))
                            .foregroundStyle(.primary)
                        Spacer()
                        NoteIconView(iconClass: draft.iconClass, fallbackNoteType: .text)
                            .foregroundStyle(.secondary)
                        Image(systemName: "chevron.right")
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(.tertiary)
                    }
                }
                .disabled(!isEditable)
                LabeledContent(String(localized: "Title", comment: "Task state editor: title field")) {
                    TextField(String(localized: "Doing", comment: "Task state editor: title placeholder"), text: titleBinding)
                        .multilineTextAlignment(.trailing)
                }
                LabeledContent(String(localized: "Identifier", comment: "Task state editor: identifier (stateId) field")) {
                    TextField("_postponed", text: identifierBinding)
                        .multilineTextAlignment(.trailing)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .font(.body.monospaced())
                }
                LabeledContent(String(localized: "Markdown Symbol", comment: "Task state editor: Markdown symbol field")) {
                    TextField("/", text: symbolBinding)
                        .multilineTextAlignment(.trailing)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .font(.body.monospaced())
                }
            } footer: {
                Text(String(localized: "The identifier is stored in your notes; use letters, digits, “-” and “_”, and start it with “_” so it won't clash with states Trilium adds later. The Markdown symbol writes the state as - [symbol].", comment: "Task state editor: footer explaining identifier and symbol"))
            }
            .disabled(!isEditable)
            Section {
                Toggle(String(localized: "Counts as Completed", comment: "Task state editor: isCompleted toggle"), isOn: $draft.isCompleted)
                HStack {
                    ColorPicker(
                        String(localized: "Color", comment: "Task state editor: color picker"),
                        selection: colorBinding,
                        supportsOpacity: false
                    )
                    if color != nil {
                        Button(String(localized: "None", comment: "Task state editor: clear the color")) {
                            color = nil
                            draft.color = ""
                        }
                        .buttonStyle(.borderless)
                    }
                }
                Toggle(String(localized: "Hidden from Menu", comment: "Task state editor: isHidden toggle"), isOn: $draft.isHidden)
            } footer: {
                Text(String(localized: "A completed state checks the box and strikes the item through. A hidden state still shows in notes but can't be picked.", comment: "Task state editor: footer explaining completed and hidden"))
            }
            .disabled(!isEditable)
            if let problem {
                Section {
                    Label(problem.message, systemImage: "exclamationmark.triangle.fill")
                        .foregroundStyle(.orange)
                }
            }
            if let error = model.errorMessage {
                Section {
                    Label(error, systemImage: "xmark.octagon.fill")
                        .foregroundStyle(.red)
                }
            }
        }
        .navigationTitle(original == nil
            ? String(localized: "New Task State", comment: "Task state editor title for a new state")
            : draft.displayTitle)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .cancellationAction) {
                Button(String(localized: "Cancel", comment: "Task state editor: cancel")) { dismiss() }
            }
            if isEditable {
                ToolbarItem(placement: .confirmationAction) {
                    if isSaving {
                        ProgressView()
                    } else {
                        Button(original == nil
                            ? String(localized: "Add", comment: "Task state editor: add a new state")
                            : String(localized: "Save", comment: "Task state editor: save changes")) {
                            save()
                        }
                        .disabled(problem != nil || !hasChanges)
                    }
                }
            }
        }
        .sheet(isPresented: $showIconPicker) {
            NavigationStack {
                NoteIconPickerContent(currentIconClass: draft.iconClass) { iconClass in
                    if let iconClass { draft.iconClass = iconClass }
                    showIconPicker = false
                }
                .navigationTitle(String(localized: "Icon", comment: "Task state editor: icon picker title"))
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button(String(localized: "Cancel", comment: "Dismiss icon picker")) { showIconPicker = false }
                    }
                }
            }
        }
        .interactiveDismissDisabled(isSaving)
    }

    // MARK: - Bindings

    private var titleBinding: Binding<String> {
        Binding(
            get: { draft.title },
            set: { title in
                draft.title = title
                if !identifierEdited { draft.name = TaskStatesSettingsModel.suggestedIdentifier(forTitle: title) }
            }
        )
    }

    private var identifierBinding: Binding<String> {
        Binding(
            get: { draft.name },
            set: { name in
                draft.name = name.trimmingCharacters(in: .whitespaces)
                identifierEdited = true
            }
        )
    }

    private var symbolBinding: Binding<String> {
        Binding(
            get: { draft.markdownSymbol },
            set: { symbol in
                let trimmed = symbol.trimmingCharacters(in: .whitespaces)
                draft.markdownSymbol = trimmed.isEmpty ? "" : String(trimmed.suffix(1))
            }
        )
    }

    private var colorBinding: Binding<Color> {
        Binding(
            get: { color ?? .gray },
            set: { newColor in
                color = newColor
                draft.color = Self.hex(newColor)
            }
        )
    }

    private static func hex(_ color: Color) -> String {
        let ui = UIColor(color)
        var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
        ui.getRed(&r, green: &g, blue: &b, alpha: &a)
        func byte(_ value: CGFloat) -> Int { Int((min(max(value, 0), 1) * 255).rounded()) }
        return String(format: "#%02x%02x%02x", byte(r), byte(g), byte(b))
    }

    private func save() {
        isSaving = true
        Task {
            let saved: Bool
            if let original {
                saved = await model.save(draft, original: original)
            } else {
                saved = await model.create(draft)
            }
            isSaving = false
            if saved { dismiss() }
        }
    }
}
