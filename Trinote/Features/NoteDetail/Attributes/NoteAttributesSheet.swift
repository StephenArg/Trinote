import SwiftUI

/// What the Add menu creates: desktop's four kinds.
enum AttributeFormKind: String, Hashable, CaseIterable {
    case label, relation, labelDefinition, relationDefinition

    var type: AttributeItem.AttributeKind {
        self == .relation ? .relation : .label
    }

    /// The attribute a definition describes (`label:x` defines the label `x`).
    var definedType: AttributeItem.AttributeKind? {
        switch self {
        case .labelDefinition: return .label
        case .relationDefinition: return .relation
        default: return nil
        }
    }

    var title: String {
        switch self {
        case .label: return String(localized: "Label", comment: "Attribute kind")
        case .relation: return String(localized: "Relation", comment: "Attribute kind")
        case .labelDefinition: return String(localized: "Label Definition", comment: "Attribute kind: promoted label definition")
        case .relationDefinition: return String(localized: "Relation Definition", comment: "Attribute kind: promoted relation definition")
        }
    }

    var systemImage: String {
        switch self {
        case .label: return "tag"
        case .relation: return "arrow.right"
        case .labelDefinition, .relationDefinition: return "list.bullet.rectangle"
        }
    }

    /// The kind an existing attribute is edited as.
    init(_ attribute: AttributeItem) {
        if let defined = AttributeNames.definedAttribute(byDefinitionName: attribute.name), attribute.type == .label {
            self = defined.type == .label ? .labelDefinition : .relationDefinition
        } else {
            self = attribute.type == .label ? .label : .relation
        }
    }
}

enum AttributeRoute: Hashable {
    case add(AttributeFormKind)
    case edit(AttributeItem)
    case inherited(AttributeItem)
}

/// Desktop's Owned and Inherited attributes tabs as a sheet: own attributes to add, edit, reorder and delete, and the
/// ones the note inherits from parents and templates, read-only.
struct NoteAttributesSheet: View {
    let viewModel: NoteDetailViewModel
    /// Opens straight onto a new attribute of this kind (the iPad menu bar's Add Label / Add Relation).
    var startAdding: AttributeFormKind? = nil

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var model: NoteAttributesModel?
    @State private var path: [AttributeRoute] = []
    @State private var pendingDelete: AttributeItem?
    @State private var editMode: EditMode = .inactive

    var body: some View {
        NavigationStack(path: $path) {
            Group {
                if let model {
                    list(model)
                } else {
                    ProgressView()
                }
            }
            .navigationTitle(String(localized: "Attributes", comment: "Attributes sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .navigationDestination(for: AttributeRoute.self) { route in
                if let model {
                    destination(route, model: model)
                }
            }
        }
        .task {
            if model == nil {
                let created = NoteAttributesModel(viewModel: viewModel, appState: appState)
                model = created
                if let startAdding, created.canEdit {
                    path = [.add(startAdding)]
                }
                await created.loadTitles()
            }
        }
        .onReceive(NotificationCenter.default.publisher(for: .trinoteWillSwitchServerProfile)) { _ in
            dismiss()
        }
    }

    @ViewBuilder
    private func list(_ model: NoteAttributesModel) -> some View {
        List {
            if !model.canEdit {
                Section {
                    Label(
                        model.isProtectedNoteLocked
                            ? String(localized: "Unlock this protected note to change its attributes.", comment: "Attributes sheet: protected note locked")
                            : String(localized: "Connect to your server to change attributes.", comment: "Attributes sheet offline"),
                        systemImage: model.isProtectedNoteLocked ? "lock.fill" : "wifi.slash"
                    )
                    .foregroundStyle(.secondary)
                }
            }

            Section {
                if model.owned.isEmpty {
                    Text(String(localized: "No attributes yet.", comment: "Attributes sheet: note has none of its own"))
                        .foregroundStyle(.secondary)
                }
                ForEach(model.owned) { attribute in
                    NavigationLink(value: AttributeRoute.edit(attribute)) {
                        AttributeRowLabel(
                            attribute: attribute,
                            targetTitle: attribute.type == .relation ? model.title(of: attribute.value) : nil
                        )
                    }
                }
                .onDelete { offsets in
                    guard model.canEdit, let index = offsets.first else { return }
                    pendingDelete = model.owned[index]
                }
                .onMove { source, destination in
                    guard model.canEdit, let from = source.first else { return }
                    let attribute = model.owned[from]
                    // `destination` counts the row being moved; the edit wants its index once it's out.
                    let toIndex = destination > from ? destination - 1 : destination
                    Task { await model.save(.move(attributeId: attribute.attributeId, toIndex: toIndex)) }
                }
                .deleteDisabled(!model.canEdit)
                .moveDisabled(!model.canEdit)
            } header: {
                Text(String(localized: "Owned Attributes", comment: "Attributes sheet section, as in Trilium"))
            }

            if !model.inherited.isEmpty {
                ForEach(inheritedGroups(model), id: \.ownerId) { group in
                    Section {
                        ForEach(group.attributes) { attribute in
                            NavigationLink(value: AttributeRoute.inherited(attribute)) {
                                AttributeRowLabel(
                                    attribute: attribute,
                                    targetTitle: attribute.type == .relation ? model.title(of: attribute.value) : nil
                                )
                            }
                        }
                    } header: {
                        Text(String(
                            format: String(localized: "Inherited from %@", comment: "Attributes sheet: section of attributes from another note"),
                            model.title(of: group.ownerId)
                        ))
                    }
                }
            }
        }
        .environment(\.editMode, $editMode)
        .disabled(model.isSaving)
        .overlay {
            if model.isSaving {
                ProgressView()
            }
        }
        .toolbar {
            ToolbarItem(placement: .cancellationAction) {
                if model.canEdit, model.owned.count > 1 {
                    Button(editMode.isEditing
                        ? String(localized: "Done", comment: "Finish reordering")
                        : String(localized: "Reorder", comment: "Attributes sheet: start reordering")) {
                        withAnimation { editMode = editMode.isEditing ? .inactive : .active }
                    }
                }
            }
            ToolbarItem(placement: .primaryAction) {
                Menu {
                    ForEach(AttributeFormKind.allCases, id: \.self) { kind in
                        Button {
                            path.append(.add(kind))
                        } label: {
                            Label(kind.title, systemImage: kind.systemImage)
                        }
                    }
                } label: {
                    Image(systemName: "plus")
                        .accessibilityLabel(String(localized: "Add Attribute", comment: "Attributes sheet: add menu"))
                }
                .disabled(!model.canEdit)
            }
            ToolbarItem(placement: .confirmationAction) {
                Button(String(localized: "Done", comment: "Dismiss sheet")) { dismiss() }
            }
        }
        .alert(
            pendingDelete.map { deleteTitle($0) } ?? "",
            isPresented: Binding(get: { pendingDelete != nil }, set: { if !$0 { pendingDelete = nil } }),
            presenting: pendingDelete
        ) { attribute in
            Button(String(localized: "Delete", comment: "Delete"), role: .destructive) {
                Task { await model.save(.delete(attributeId: attribute.attributeId)) }
            }
            Button(String(localized: "Cancel", comment: "Dismiss sheet"), role: .cancel) {}
        } message: { attribute in
            Text(deleteMessage(attribute))
        }
        .alert(
            String(localized: "Error", comment: "Generic error title"),
            isPresented: Binding(get: { model.errorMessage != nil }, set: { if !$0 { model.errorMessage = nil } })
        ) {
            Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
        } message: {
            Text(model.errorMessage ?? "")
        }
    }

    @ViewBuilder
    private func destination(_ route: AttributeRoute, model: NoteAttributesModel) -> some View {
        switch route {
        case .add(let kind):
            NoteAttributeForm(model: model, kind: kind, existing: nil)
        case .edit(let attribute):
            NoteAttributeForm(model: model, kind: AttributeFormKind(attribute), existing: attribute)
        case .inherited(let attribute):
            InheritedAttributeDetail(attribute: attribute, model: model)
        }
    }

    private struct InheritedGroup {
        let ownerId: String
        let attributes: [AttributeItem]
    }

    private func inheritedGroups(_ model: NoteAttributesModel) -> [InheritedGroup] {
        var groups: [InheritedGroup] = []
        for attribute in model.inherited {
            if let last = groups.last, last.ownerId == attribute.noteId {
                groups[groups.count - 1] = InheritedGroup(ownerId: last.ownerId, attributes: last.attributes + [attribute])
            } else {
                groups.append(InheritedGroup(ownerId: attribute.noteId, attributes: [attribute]))
            }
        }
        return groups
    }

    private func deleteTitle(_ attribute: AttributeItem) -> String {
        String(
            format: String(localized: "Delete %@?", comment: "Attributes sheet: confirm deleting an attribute"),
            AttributeRowLabel.displayName(attribute)
        )
    }

    private func deleteMessage(_ attribute: AttributeItem) -> String {
        if AttributeSecrets.isSecret(type: attribute.type, name: attribute.name) {
            return String(
                localized: "Visitors to the shared page won't need this password any more.",
                comment: "Attributes: removing #shareCredentials"
            )
        }
        if attribute.isInheritable {
            return String(
                localized: "Notes below this one inherit it too, so they'll lose it as well.",
                comment: "Attributes: deleting an inheritable attribute"
            )
        }
        return String(localized: "Trilium will remove it from this note.", comment: "Attributes: deleting an attribute")
    }
}

/// One attribute in a list: `#name` / `~name`, its value or target, and markers for built-in and inheritable.
struct AttributeRowLabel: View {
    let attribute: AttributeItem
    var targetTitle: String?

    static func displayName(_ attribute: AttributeItem) -> String {
        (attribute.type == .label ? "#" : "~") + attribute.name
    }

    private var detail: String? {
        if attribute.type == .relation {
            return targetTitle.map { "→ \($0)" }
        }
        guard !attribute.value.isEmpty else { return nil }
        return AttributeSecrets.isSecret(type: attribute.type, name: attribute.name)
            ? String(repeating: "•", count: 8)
            : attribute.value
    }

    var body: some View {
        HStack(alignment: .firstTextBaseline, spacing: 10) {
            Image(systemName: attribute.type == .label ? "tag" : "arrow.right")
                .foregroundStyle(.secondary)
                .frame(width: 18)
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 3) {
                HStack(spacing: 6) {
                    Text(verbatim: Self.displayName(attribute))
                        .font(.body.monospaced())
                        .lineLimit(1)
                    if TriliumAttributeCatalog.shared.builtin(attribute.type, attribute.name) != nil {
                        AttributeBadge(text: String(localized: "System", comment: "Badge: an attribute Trilium itself gives a meaning to"))
                    }
                    if attribute.isInheritable {
                        Image(systemName: "arrow.down.forward.circle")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .accessibilityLabel(String(localized: "Inheritable", comment: "Attribute flag, as in Trilium"))
                    }
                }
                if let detail {
                    Text(verbatim: detail)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                }
            }
        }
    }
}

struct AttributeBadge: View {
    let text: String
    var tint: Color = .secondary

    var body: some View {
        Text(text)
            .font(.caption2.weight(.medium))
            .padding(.horizontal, 6)
            .padding(.vertical, 1)
            .foregroundStyle(tint)
            .overlay(Capsule().strokeBorder(tint.opacity(0.5)))
    }
}

/// An inherited attribute: read-only here, edited on the note it comes from.
private struct InheritedAttributeDetail: View {
    let attribute: AttributeItem
    let model: NoteAttributesModel

    var body: some View {
        List {
            Section {
                AttributeRowLabel(
                    attribute: attribute,
                    targetTitle: attribute.type == .relation ? model.title(of: attribute.value) : nil
                )
                LabeledContent(
                    String(localized: "Owned by", comment: "Inherited attribute: the note it belongs to"),
                    value: model.title(of: attribute.noteId)
                )
            } footer: {
                Text(String(
                    localized: "This attribute belongs to another note. Change it there.",
                    comment: "Inherited attribute detail footer"
                ))
            }
            if let help = TriliumAttributeCatalog.shared.attributedHelp(attribute.type, attribute.name) {
                Section(String(localized: "About", comment: "Attribute explanation section")) {
                    Text(help)
                        .font(.subheadline)
                }
            }
        }
        .navigationTitle(Text(verbatim: AttributeRowLabel.displayName(attribute)))
        .navigationBarTitleDisplayMode(.inline)
    }
}
