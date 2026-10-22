import SwiftUI

/// Desktop's promoted attributes under the note title: a field for each promoted definition the note has or inherits
/// (`#label:status="promoted,single,select,…"`), filled in right there. Changes go straight to the server; offline the
/// fields are read-only.
struct PromotedAttributesSection: View {
    let viewModel: NoteDetailViewModel

    @State private var isExpanded = true

    private var canEdit: Bool {
        viewModel.client != nil && viewModel.isOnline && !viewModel.needsProtectedSession
    }

    var body: some View {
        if let note = viewModel.note, !viewModel.needsProtectedSession {
            let cells = PromotedAttributeCells.cells(for: note)
            if !cells.isEmpty {
                DisclosureGroup(isExpanded: $isExpanded) {
                    VStack(alignment: .leading, spacing: 12) {
                        ForEach(cells) { cell in
                            PromotedFieldRow(cell: cell, viewModel: viewModel, canEdit: canEdit)
                        }
                        if !canEdit {
                            Label(
                                String(localized: "Connect to your server to edit these fields.", comment: "Promoted attributes offline"),
                                systemImage: "wifi.slash"
                            )
                            .font(.caption)
                            .foregroundStyle(.secondary)
                        }
                    }
                    .padding(.top, 8)
                } label: {
                    Text(String(localized: "Promoted Attributes", comment: "Note section with promoted attribute fields, as in Trilium"))
                        .font(.subheadline.weight(.semibold))
                }
                .padding(.horizontal)
                .padding(.bottom, 12)
            }
        }
    }
}

/// One promoted field: its name (or display name) and the input its definition asks for.
private struct PromotedFieldRow: View {
    let cell: PromotedAttributeCell
    let viewModel: NoteDetailViewModel
    let canEdit: Bool

    @Environment(AppState.self) private var appState
    @State private var draft: String
    @State private var suggestions: [String] = []
    @State private var titles: [String: String] = [:]
    @State private var showNotePicker = false
    @State private var newValue = ""

    init(cell: PromotedAttributeCell, viewModel: NoteDetailViewModel, canEdit: Bool) {
        self.cell = cell
        self.viewModel = viewModel
        self.canEdit = canEdit
        _draft = State(initialValue: cell.value)
    }

    var body: some View {
        Group {
            if cell.type == .label, !cell.isMulti, cell.labelType == .boolean {
                // A switch reads as its own sentence, with the name after it, as on desktop.
                singleLabel
            } else {
                VStack(alignment: .leading, spacing: 4) {
                    Text(verbatim: cell.title)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    field
                }
            }
        }
        .disabled(!canEdit)
        .onChange(of: cell.value) { _, value in draft = value }
        .task(id: cell.name) {
            guard canEdit, cell.type == .label, cell.labelType == .text else { return }
            suggestions = await viewModel.promotedValueSuggestions(cell.name)
        }
        .task(id: relationTargets) {
            for target in relationTargets where titles[target] == nil {
                titles[target] = await viewModel.noteTitle(target)
            }
        }
        .sheet(isPresented: $showNotePicker) {
            NotePickerSheet(
                excludeNoteId: nil,
                navigationTitleOverride: cell.title,
                onPick: { noteId, title in
                    titles[noteId] = title
                    Task {
                        if cell.isMulti {
                            await viewModel.savePromotedValues(cell, values: cell.values + [noteId])
                        } else {
                            await viewModel.savePromotedValue(cell, value: noteId)
                        }
                    }
                }
            )
            .environment(appState)
        }
    }

    private var relationTargets: [String] {
        guard cell.type == .relation else { return [] }
        return cell.isMulti ? cell.values : (cell.value.isEmpty ? [] : [cell.value])
    }

    @ViewBuilder
    private var field: some View {
        switch (cell.type, cell.isMulti) {
        case (.label, false):
            singleLabel
        case (.label, true):
            multiLabel
        case (.relation, false):
            singleRelation
        case (.relation, true):
            multiRelation
        }
    }

    private var singleLabel: some View {
        AttributeValueField(
            labelType: cell.labelType,
            value: $draft,
            selectOptions: cell.definition.selectOptions ?? [],
            suggestions: suggestions,
            isSecret: AttributeSecrets.isSecret(type: cell.type, name: cell.name),
            placeholder: String(localized: "Not Set", comment: "Attribute value: no choice made"),
            toggleTitle: cell.title,
            onCommit: commitSingle,
            onCreateOption: cell.labelType == .select ? { option in
                draft = option
                Task {
                    if await viewModel.addPromotedOption(cell, option: option) {
                        await viewModel.savePromotedValue(cell, value: option)
                    }
                }
            } : nil
        )
    }

    private func commitSingle() {
        let value = draft
        guard value != cell.value else { return }
        Task { await viewModel.savePromotedValue(cell, value: value) }
    }

    private var multiLabel: some View {
        VStack(alignment: .leading, spacing: 6) {
            ForEach(Array(cell.values.enumerated()), id: \.offset) { index, value in
                valueRow(Text(verbatim: value)) {
                    var values = cell.values
                    values.remove(at: index)
                    Task { await viewModel.savePromotedValues(cell, values: values) }
                }
            }
            if cell.labelType == .select {
                let remaining = (cell.definition.selectOptions ?? []).filter { !cell.values.contains($0) }
                Menu {
                    ForEach(remaining, id: \.self) { option in
                        Button {
                            Task { await viewModel.savePromotedValues(cell, values: cell.values + [option]) }
                        } label: {
                            Text(verbatim: option)
                        }
                    }
                } label: {
                    Label(String(localized: "Add", comment: "Add"), systemImage: "plus.circle")
                        .font(.subheadline)
                }
                .disabled(remaining.isEmpty)
            } else {
                HStack {
                    TextField(String(localized: "New Value", comment: "Promoted multi-value field: add a value"), text: $newValue)
                        .keyboardType(keyboard)
                        .textInputAutocapitalization(cell.labelType == .text ? .sentences : .never)
                        .onSubmit(addValue)
                    Button(String(localized: "Add", comment: "Add"), action: addValue)
                        .buttonStyle(.borderless)
                        .disabled(newValue.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }
        }
    }

    private var keyboard: UIKeyboardType {
        switch cell.labelType {
        case .number: return .decimalPad
        case .url: return .URL
        case .email: return .emailAddress
        case .phone: return .phonePad
        default: return .default
        }
    }

    private func addValue() {
        let value = newValue.trimmingCharacters(in: .whitespaces)
        guard !value.isEmpty else { return }
        newValue = ""
        Task { await viewModel.savePromotedValues(cell, values: cell.values + [value]) }
    }

    private var singleRelation: some View {
        HStack {
            Button {
                showNotePicker = true
            } label: {
                Text(cell.value.isEmpty
                    ? String(localized: "Choose a Note…", comment: "Relation target: none picked yet")
                    : titles[cell.value] ?? cell.value)
                    .lineLimit(1)
            }
            .buttonStyle(.borderless)
            Spacer(minLength: 0)
            if !cell.value.isEmpty {
                Button {
                    Task { await viewModel.savePromotedValue(cell, value: "") }
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundStyle(.secondary)
                }
                .buttonStyle(.borderless)
                .accessibilityLabel(String(localized: "Clear", comment: "Appearance picker clear"))
            }
        }
    }

    private var multiRelation: some View {
        VStack(alignment: .leading, spacing: 6) {
            ForEach(Array(cell.values.enumerated()), id: \.offset) { index, target in
                valueRow(Text(verbatim: titles[target] ?? target)) {
                    var values = cell.values
                    values.remove(at: index)
                    Task { await viewModel.savePromotedValues(cell, values: values) }
                }
            }
            Button {
                showNotePicker = true
            } label: {
                Label(String(localized: "Add", comment: "Add"), systemImage: "plus.circle")
                    .font(.subheadline)
            }
            .buttonStyle(.borderless)
        }
    }

    private func valueRow(_ text: Text, remove: @escaping () -> Void) -> some View {
        HStack {
            text
                .lineLimit(1)
            Spacer(minLength: 0)
            Button(action: remove) {
                Image(systemName: "xmark.circle.fill")
                    .foregroundStyle(.secondary)
            }
            .buttonStyle(.borderless)
            .accessibilityLabel(String(localized: "Remove", comment: "Promoted field: remove a value"))
        }
        .padding(.vertical, 4)
        .padding(.horizontal, 10)
        .background(Color(uiColor: .secondarySystemBackground), in: RoundedRectangle(cornerRadius: 8))
    }
}
