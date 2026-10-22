import SwiftUI

/// Adding or editing one attribute, as desktop's attribute detail does: the name with suggestions and Trilium's
/// explanation of built-in names, a value input that fits the label (or a note for a relation), Inheritable, and for
/// `#label:` / `#relation:` definitions desktop's definition form.
struct NoteAttributeForm: View {
    let model: NoteAttributesModel
    let kind: AttributeFormKind
    let existing: AttributeItem?

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var name: String
    @State private var value: String
    @State private var isInheritable: Bool
    @State private var definition: PromotedAttributeDefinition
    /// For a definition: whether it defines a label or a relation (desktop switches between them by type).
    @State private var definedType: AttributeItem.AttributeKind
    @State private var usedNames: [String] = []
    @State private var usedValues: [String] = []
    @State private var showTargetPicker = false
    @State private var showIconPicker = false
    @State private var showColorPicker = false
    @State private var confirmation: Confirmation?
    @State private var newOption = ""
    @FocusState private var nameFocused: Bool

    private enum Confirmation: Identifiable {
        case delete, changeSecret
        var id: Self { self }
    }

    init(model: NoteAttributesModel, kind: AttributeFormKind, existing: AttributeItem?) {
        self.model = model
        self.kind = kind
        self.existing = existing
        let defined = existing.flatMap { AttributeNames.definedAttribute(byDefinitionName: $0.name) }
        if let definedType = kind.definedType {
            _name = State(initialValue: defined?.name ?? "")
            _definedType = State(initialValue: defined?.type ?? definedType)
            // A new definition starts as desktop's does: promoted, single, text, inheritable.
            _definition = State(initialValue: PromotedAttributeDefinition(parsing: existing?.value ?? "promoted,single,text"))
            _isInheritable = State(initialValue: existing?.isInheritable ?? true)
        } else {
            _name = State(initialValue: existing?.name ?? "")
            _definedType = State(initialValue: kind.type)
            _definition = State(initialValue: PromotedAttributeDefinition())
            _isInheritable = State(initialValue: existing?.isInheritable ?? false)
        }
        _value = State(initialValue: existing?.value ?? "")
    }

    // MARK: Derived

    private var isDefinition: Bool { kind.definedType != nil }

    private var storedName: String {
        isDefinition ? AttributeNames.definitionName(for: definedType, name: name) : name
    }

    private var builtin: TriliumAttributeCatalog.Builtin? {
        isDefinition ? nil : TriliumAttributeCatalog.shared.builtin(kind.type, name)
    }

    private var isSecret: Bool { AttributeSecrets.isSecret(type: kind.type, name: name) }

    /// Desktop's names for a new attribute, as an example rather than a value.
    private var namePlaceholder: String {
        let isRelation = isDefinition ? definedType == .relation : kind.type == .relation
        return isRelation ? "myRelation" : "myLabel"
    }

    private var draft: AttributeDraft {
        AttributeDraft(
            type: kind.type,
            name: storedName,
            value: isDefinition ? definition.serialized(for: definedType) : value,
            isInheritable: isInheritable
        )
    }

    private var isValid: Bool {
        AttributeNames.isValid(storedName) && (kind != .relation || TriliumEntityId.isValid(value))
    }

    private var hasChanges: Bool {
        existing.map { AttributeDraft($0) != draft } ?? true
    }

    /// Desktop gives a built-in label a typed input only for these kinds; the rest keep a text field with the values
    /// the label has elsewhere.
    private var valueInputType: TriliumLabelType? {
        guard let type = builtin?.valueType else { return nil }
        switch type {
        case .text, .boolean: return nil
        default: return type
        }
    }

    // MARK: Body

    var body: some View {
        Form {
            nameSection
            if let builtin, let help = TriliumAttributeCatalog.shared.attributedHelp(builtin.type, builtin.name) {
                Section(String(localized: "About", comment: "Attribute explanation section")) {
                    Text(help)
                        .font(.subheadline)
                    if builtin.isDangerous {
                        Label(
                            String(
                                localized: "This attribute makes Trilium run code or embed content, including on shared pages. Only use it with notes you trust.",
                                comment: "Attribute form: Trilium marks this built-in attribute as dangerous"
                            ),
                            systemImage: "exclamationmark.triangle"
                        )
                        .font(.footnote)
                        .foregroundStyle(.orange)
                    }
                }
            }
            if isDefinition {
                definitionSections
            } else if kind == .relation {
                targetSection
            } else {
                valueSection
            }
            Section {
                Toggle(String(localized: "Inheritable", comment: "Attribute flag, as in Trilium"), isOn: $isInheritable)
            } footer: {
                Text(String(
                    localized: "Applies to this note and to everything below it in the tree.",
                    comment: "Attribute form: what Inheritable means (Trilium's wording)"
                ))
            }
            if existing != nil {
                Section {
                    Button(String(localized: "Delete Attribute", comment: "Attribute form: delete"), role: .destructive) {
                        confirmation = .delete
                    }
                }
            }
        }
        .disabled(!model.canEdit || model.isSaving)
        .navigationTitle(existing.map(AttributeRowLabel.displayName) ?? kind.title)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button(String(localized: "Save", comment: "Save")) {
                    if isSecret, let existing, existing.value != value {
                        confirmation = .changeSecret
                    } else {
                        Task { await save() }
                    }
                }
                .disabled(!model.canEdit || model.isSaving || !isValid || !hasChanges)
            }
        }
        .overlay {
            if model.isSaving {
                ProgressView()
            }
        }
        .alert(
            confirmationTitle,
            isPresented: Binding(get: { confirmation != nil }, set: { if !$0 { confirmation = nil } }),
            presenting: confirmation
        ) { confirmation in
            switch confirmation {
            case .delete:
                Button(String(localized: "Delete", comment: "Delete"), role: .destructive) {
                    Task { await delete() }
                }
            case .changeSecret:
                Button(String(localized: "Save", comment: "Save")) {
                    Task { await save() }
                }
            }
            Button(String(localized: "Cancel", comment: "Dismiss sheet"), role: .cancel) {}
        } message: { confirmation in
            Text(confirmationMessage(confirmation))
        }
        .sheet(isPresented: $showTargetPicker) {
            NotePickerSheet(
                excludeNoteId: nil,
                navigationTitleOverride: String(localized: "Target Note", comment: "Relation target picker title, as in Trilium"),
                onPick: { noteId, title in
                    value = noteId
                    model.rememberTitle(title, of: noteId)
                }
            )
            .environment(appState)
        }
        .sheet(isPresented: $showIconPicker) {
            NavigationStack {
                NoteIconPickerContent(currentIconClass: value) { iconClass in
                    value = iconClass ?? ""
                    showIconPicker = false
                }
                .navigationTitle(String(localized: "Icon", comment: "Icon picker title"))
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button(String(localized: "Cancel", comment: "Dismiss sheet")) { showIconPicker = false }
                    }
                }
            }
        }
        .sheet(isPresented: $showColorPicker) {
            NavigationStack {
                NoteColorPickerContent(currentColorLabel: value) { colorLabel in
                    value = colorLabel ?? ""
                    showColorPicker = false
                }
                .navigationTitle(String(localized: "Color", comment: "Color picker title"))
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button(String(localized: "Cancel", comment: "Dismiss sheet")) { showColorPicker = false }
                    }
                }
            }
        }
        .task(id: "\(kind.type.rawValue)-\(name)") {
            guard !isDefinition, kind == .label, !name.isEmpty else {
                usedValues = []
                return
            }
            try? await Task.sleep(for: .milliseconds(300))
            usedValues = await model.usedValues(forLabel: name)
        }
        .task(id: "names-\(name)-\(nameFocused)") {
            guard nameFocused else { return }
            try? await Task.sleep(for: .milliseconds(250))
            guard !Task.isCancelled else { return }
            usedNames = await model.usedNames(isDefinition ? definedType : kind.type, matching: name)
        }
    }

    // MARK: Name

    private var nameSection: some View {
        Section {
            HStack {
                if isDefinition {
                    Text(verbatim: "\(definedType.rawValue):")
                        .font(.body.monospaced())
                        .foregroundStyle(.secondary)
                } else {
                    Text(verbatim: kind.type == .label ? "#" : "~")
                        .font(.body.monospaced())
                        .foregroundStyle(.secondary)
                }
                TextField(
                    namePlaceholder,
                    text: Binding(get: { name }, set: { name = AttributeNames.filter($0) })
                )
                .font(.body.monospaced())
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .focused($nameFocused)
                if builtin != nil {
                    AttributeBadge(text: String(localized: "System", comment: "Badge: an attribute Trilium itself gives a meaning to"))
                }
            }
            if nameFocused {
                suggestionRows
            }
            if !isDefinition {
                NavigationLink {
                    BuiltinAttributeBrowser(type: kind.type) { picked in
                        name = picked
                    }
                } label: {
                    Label(
                        kind.type == .label
                            ? String(localized: "Browse Built-in Labels", comment: "Attribute form: list Trilium's labels with explanations")
                            : String(localized: "Browse Built-in Relations", comment: "Attribute form: list Trilium's relations with explanations"),
                        systemImage: "books.vertical"
                    )
                }
            }
        } header: {
            Text(String(localized: "Name", comment: "Attribute form field"))
        } footer: {
            if !name.isEmpty, !AttributeNames.isValid(storedName) {
                Text(String(localized: "Names can only hold letters, numbers, _ and :.", comment: "Attribute form: invalid name"))
            } else {
                Text(String(localized: "Letters, numbers, _ and : only.", comment: "Attribute form: name rules"))
            }
        }
    }

    @ViewBuilder
    private var suggestionRows: some View {
        let builtins = isDefinition ? [] : Array(TriliumAttributeCatalog.shared.suggestions(kind.type, matching: name).prefix(8))
        ForEach(builtins) { builtin in
            Button {
                name = builtin.name
                nameFocused = false
            } label: {
                VStack(alignment: .leading, spacing: 2) {
                    HStack(spacing: 6) {
                        Text(verbatim: builtin.name)
                            .font(.callout.monospaced())
                            .foregroundStyle(.primary)
                        AttributeBadge(text: String(localized: "System", comment: "Badge: an attribute Trilium itself gives a meaning to"))
                    }
                    if let summary = TriliumAttributeCatalog.shared.helpSummary(builtin.type, builtin.name) {
                        Text(summary)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(2)
                    }
                }
            }
        }
        ForEach(usedNames.prefix(8), id: \.self) { used in
            Button {
                name = used
                nameFocused = false
            } label: {
                HStack {
                    Text(verbatim: used)
                        .font(.callout.monospaced())
                        .foregroundStyle(.primary)
                    Spacer()
                    Text(String(localized: "In use", comment: "Attribute name suggestion: a name used in the user's notes"))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }

    // MARK: Value

    private var valueSection: some View {
        Section {
            AttributeValueField(
                labelType: valueInputType,
                value: $value,
                selectOptions: builtin?.selectOptions ?? [],
                suggestions: valueInputType == nil ? usedValues : [],
                isSecret: isSecret,
                placeholder: String(localized: "No value", comment: "Attribute form: value placeholder")
            )
            if name == "iconClass" {
                Button(String(localized: "Choose Icon…", comment: "Attribute form: pick an icon for #iconClass")) {
                    showIconPicker = true
                }
            } else if name == "color" {
                Button(String(localized: "Choose Color…", comment: "Attribute form: pick a color for #color")) {
                    showColorPicker = true
                }
            }
        } header: {
            Text(String(localized: "Value", comment: "Attribute form field"))
        }
    }

    private var targetSection: some View {
        Section {
            Button {
                showTargetPicker = true
            } label: {
                HStack {
                    Text(value.isEmpty
                        ? String(localized: "Choose a Note…", comment: "Relation target: none picked yet")
                        : model.title(of: value))
                    Spacer()
                    Image(systemName: "chevron.right")
                        .font(.caption)
                        .foregroundStyle(.tertiary)
                }
            }
        } header: {
            Text(String(localized: "Target Note", comment: "Relation target picker title, as in Trilium"))
        } footer: {
            Text(String(localized: "The note this relation points to.", comment: "Relation target hint, as in Trilium"))
        }
    }

    // MARK: Definition

    /// The definition's type: a label type, or Relation (which makes it a `#relation:` definition).
    private var definitionTypeSelection: Binding<String> {
        Binding(
            get: { definedType == .relation ? "relation" : (definition.labelType ?? .text).rawValue },
            set: { picked in
                if picked == "relation" {
                    definedType = .relation
                } else {
                    definedType = .label
                    definition.labelType = TriliumLabelType(rawValue: picked)
                }
            }
        )
    }

    @ViewBuilder
    private var definitionSections: some View {
        Section {
            Picker(String(localized: "Type", comment: "Metadata field"), selection: definitionTypeSelection) {
                ForEach(TriliumLabelType.allCases, id: \.self) { type in
                    Text(Self.title(of: type)).tag(type.rawValue)
                }
                Text(String(localized: "Relation", comment: "Attribute kind")).tag("relation")
            }
            if definedType == .label, (definition.labelType ?? .text) == .number {
                Stepper(
                    value: Binding(get: { definition.numberPrecision ?? 0 }, set: { definition.numberPrecision = $0 }),
                    in: 0...10
                ) {
                    LabeledContent(
                        String(localized: "Precision", comment: "Definition: decimal places, as in Trilium"),
                        value: definition.numberPrecision.map(String.init) ?? "–"
                    )
                }
            }
            if definedType == .relation {
                TextField(
                    String(localized: "Inverse Relation", comment: "Definition: relation pointing back, as in Trilium"),
                    text: Binding(
                        get: { definition.inverseRelation ?? "" },
                        set: { definition.inverseRelation = AttributeNames.filter($0) }
                    )
                )
                .font(.body.monospaced())
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
            }
            TextField(
                String(localized: "Display Name", comment: "Definition: alias shown instead of the name, as in Trilium"),
                text: Binding(get: { definition.promotedAlias ?? "" }, set: { definition.promotedAlias = $0.isEmpty ? nil : $0 })
            )
            Toggle(
                String(localized: "Multiple Values", comment: "Definition: multiplicity, as in Trilium"),
                isOn: Binding(get: { definition.multiplicity == .multi }, set: { definition.multiplicity = $0 ? .multi : .single })
            )
            Toggle(
                String(localized: "Promoted", comment: "Definition: shown as a field on notes, as in Trilium"),
                isOn: $definition.isPromoted
            )
        } header: {
            Text(String(localized: "Definition", comment: "Attribute form: promoted attribute definition section"))
        } footer: {
            Text(String(
                localized: "Promoted attributes show as fields at the top of every note that has them. Multiple Values lets a note hold more than one.",
                comment: "Definition form footer"
            ))
        }
        if definedType == .label, definition.labelType == .select {
            Section {
                ForEach(Array((definition.selectOptions ?? []).enumerated()), id: \.offset) { _, option in
                    Text(verbatim: option)
                }
                .onDelete { offsets in
                    definition.selectOptions?.remove(atOffsets: offsets)
                }
                .onMove { source, destination in
                    definition.selectOptions?.move(fromOffsets: source, toOffset: destination)
                }
                HStack {
                    TextField(String(localized: "New Option", comment: "Promoted select field: add a choice"), text: $newOption)
                        .onSubmit(addOption)
                    Button(String(localized: "Add", comment: "Add"), action: addOption)
                        .disabled(newOption.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            } header: {
                Text(String(localized: "Options", comment: "Definition: select choices, as in Trilium"))
            } footer: {
                Text(String(localized: "The options the field offers, in this order.", comment: "Definition: select choices hint, as in Trilium"))
            }
        }
    }

    private func addOption() {
        let option = newOption.trimmingCharacters(in: .whitespaces)
        guard !option.isEmpty, definition.selectOptions?.contains(option) != true else { return }
        definition.selectOptions = (definition.selectOptions ?? []) + [option]
        newOption = ""
    }

    static func title(of type: TriliumLabelType) -> String {
        switch type {
        case .text: return String(localized: "Text", comment: "Note type")
        case .textarea: return String(localized: "Multi-line Text", comment: "Label type, as in Trilium")
        case .number: return String(localized: "Number", comment: "Label type, as in Trilium")
        case .boolean: return String(localized: "Checkbox", comment: "Label type, as in Trilium")
        case .select: return String(localized: "Select", comment: "Label type, as in Trilium")
        case .date: return String(localized: "Date", comment: "Label type, as in Trilium")
        case .datetime: return String(localized: "Date & Time", comment: "Label type, as in Trilium")
        case .time: return String(localized: "Time", comment: "Label type, as in Trilium")
        case .url: return String(localized: "URL", comment: "Label type, as in Trilium")
        case .email: return String(localized: "Email", comment: "Label type, as in Trilium")
        case .phone: return String(localized: "Phone", comment: "Label type, as in Trilium")
        case .color: return String(localized: "Color", comment: "Color picker title")
        }
    }

    // MARK: Saving

    private var confirmationTitle: String {
        switch confirmation {
        case .delete?:
            return String(
                format: String(localized: "Delete %@?", comment: "Attributes sheet: confirm deleting an attribute"),
                existing.map(AttributeRowLabel.displayName) ?? ""
            )
        case .changeSecret?:
            return String(localized: "Change the Shared Page Password?", comment: "Attributes: changing #shareCredentials")
        case nil:
            return ""
        }
    }

    private func confirmationMessage(_ confirmation: Confirmation) -> String {
        switch confirmation {
        case .changeSecret:
            return String(
                localized: "Visitors to the shared page will need the new password; the old one stops working.",
                comment: "Attributes: changing #shareCredentials"
            )
        case .delete:
            if isSecret {
                return String(
                    localized: "Visitors to the shared page won't need this password any more.",
                    comment: "Attributes: removing #shareCredentials"
                )
            }
            if existing?.isInheritable == true {
                return String(
                    localized: "Notes below this one inherit it too, so they'll lose it as well.",
                    comment: "Attributes: deleting an inheritable attribute"
                )
            }
            return String(localized: "Trilium will remove it from this note.", comment: "Attributes: deleting an attribute")
        }
    }

    private func save() async {
        let edit: OwnedAttributeEdit = existing.map { .update(attributeId: $0.attributeId, draft) } ?? .add(draft)
        if await model.save(edit) {
            dismiss()
        }
    }

    private func delete() async {
        guard let existing else { return }
        if await model.save(.delete(attributeId: existing.attributeId)) {
            dismiss()
        }
    }
}

/// Trilium's built-in labels or relations with desktop's explanation of each, searchable by name or explanation.
struct BuiltinAttributeBrowser: View {
    let type: AttributeItem.AttributeKind
    let onPick: (String) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var query = ""

    var body: some View {
        List(TriliumAttributeCatalog.shared.suggestions(type, matching: query)) { builtin in
            Button {
                onPick(builtin.name)
                dismiss()
            } label: {
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 6) {
                        Text(verbatim: (type == .label ? "#" : "~") + builtin.name)
                            .font(.body.monospaced())
                            .foregroundStyle(.primary)
                        if builtin.isDangerous {
                            Image(systemName: "exclamationmark.triangle")
                                .font(.caption)
                                .foregroundStyle(.orange)
                                .accessibilityLabel(String(localized: "Runs code", comment: "Built-in attribute that runs code or embeds content"))
                        }
                    }
                    if let help = TriliumAttributeCatalog.shared.attributedHelp(builtin.type, builtin.name) {
                        Text(help)
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                            .lineLimit(4)
                    }
                }
                .padding(.vertical, 2)
            }
        }
        .searchable(
            text: $query,
            prompt: String(localized: "Search names and explanations", comment: "Built-in attribute browser search prompt")
        )
        .navigationTitle(type == .label
            ? String(localized: "Built-in Labels", comment: "Built-in attribute browser title")
            : String(localized: "Built-in Relations", comment: "Built-in attribute browser title"))
        .navigationBarTitleDisplayMode(.inline)
    }
}
