import SwiftUI

/// Native Kanban board for Trilium `#viewType=board` collections.
struct KanbanBoardView: View {
    @Bindable var viewModel: NoteDetailViewModel
    let note: NoteItem
    var onOpenCard: (String) -> Void

    @Environment(AppState.self) private var appState
    @AppStorage("useTriliumNoteColors") private var useTriliumNoteColors: Bool = true

    @State private var columns: [KanbanBoardModels.Column] = []
    @State private var groupBy: String = KanbanBoardModels.defaultGroupByAttribute
    @State private var columnWidthSetting: String?
    @State private var filterQuery: String?
    @State private var cardProperties: [KanbanBoardModels.CardProperty] = []
    @State private var relationTitles: [String: String] = [:]
    @State private var boardSort: KanbanBoardModels.ColumnSort?
    /// The column "Add Existing Note as Card" puts the picked note in.
    @State private var addExistingNoteColumn: KanbanColumnTarget?
    /// A card that is only on this board, awaiting delete confirmation.
    @State private var cardToDelete: KanbanBoardModels.Card?
    /// A card whose note is cloned elsewhere, awaiting confirmation (with the "Also remove clones" switch).
    @State private var clonedCardToDelete: KanbanBoardModels.Card?
    @State private var alsoRemoveClones = false
    /// The column whose card limit is being edited.
    @State private var columnLimitEdit: KanbanColumnLimitRequest?
    /// Collapsed (`true`) or open (`false`) for this session, over what `board.json` stores: a kept-collapsed
    /// column opened here, or a collapse made while offline.
    @State private var collapseOverrides: [String: Bool] = [:]
    /// Collapse saves run one after another, and other board edits wait for them, so none reads a stale `board.json`.
    @State private var collapseSaveTask: Task<Void, Never>?
    @State private var isLoading = true
    @State private var isMutating = false

    @State private var showAddColumn = false
    @State private var newColumnName = ""
    /// Where Add Column puts the new column; `nil` adds it at the end.
    @State private var newColumnPlacement: KanbanNewColumnPlacement?
    @State private var showAddCardForColumn: String?
    @State private var newCardTitle = ""
    @State private var renameColumnTarget: String?
    @State private var renameColumnText = ""
    @State private var columnToDelete: String?
    @State private var showDeleteColumnConfirm = false
    @State private var columnReorder: KanbanColumnReorderRequest?

    /// A relation grouping's columns are target notes, so they can't be named or renamed as text here.
    private var groupsByRelation: Bool { KanbanBoardModels.GroupBy(groupBy).isRelation }

    /// `#board:columnWidth`, a little narrower than the web board's 275 / 325 / 400 pt to suit a phone.
    private var columnWidth: CGFloat {
        switch columnWidthSetting?.trimmingCharacters(in: .whitespaces).lowercased() {
        case "medium": return 305
        case "wide": return 375
        default: return 260
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            toolbar
            Divider()
            if isLoading {
                ProgressView()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else if columns.isEmpty {
                ContentUnavailableView {
                    Label(
                        String(localized: "Empty Board", comment: "Kanban empty title"),
                        systemImage: "rectangle.split.3x1"
                    )
                } description: {
                    Text(String(localized: "Add a column to get started.", comment: "Kanban empty description"))
                } actions: {
                    if !groupsByRelation {
                        Button(String(localized: "Add Column", comment: "Kanban add column")) {
                            newColumnPlacement = nil
                            showAddColumn = true
                        }
                        .buttonStyle(.borderedProminent)
                    }
                }
            } else {
                ScrollView(.horizontal, showsIndicators: true) {
                    HStack(alignment: .top, spacing: 12) {
                        ForEach(columns) { column in
                            if isShownCollapsed(column) {
                                collapsedColumn(column)
                            } else {
                                kanbanColumn(column)
                            }
                        }
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 12)
                }
            }
        }
        .disabled(isMutating)
        .opacity(isMutating ? 0.92 : 1)
        .animation(.easeOut(duration: 0.15), value: isMutating)
        .task(id: note.noteId) {
            await reload(showSpinner: true)
        }
        .onChange(of: note.noteId) {
            collapseOverrides = [:]
        }
        .alert(
            String(localized: "Add Column", comment: "Kanban add column"),
            isPresented: $showAddColumn
        ) {
            TextField(String(localized: "Column name", comment: "Kanban column name field"), text: $newColumnName)
            Button(String(localized: "Cancel", comment: "Cancel")) {
                newColumnName = ""
                newColumnPlacement = nil
            }
            Button(String(localized: "Add", comment: "Add")) {
                let placement = newColumnPlacement
                newColumnPlacement = nil
                Task { await addColumn(placement: placement) }
            }
        } message: {
            if let placement = newColumnPlacement {
                Text(String(
                    format: placement.toTheRight
                        ? String(localized: "To the right of “%@”", comment: "Kanban add column placement message")
                        : String(localized: "To the left of “%@”", comment: "Kanban add column placement message"),
                    placement.anchorTitle
                ))
            }
        }
        .alert(
            String(localized: "Add Card", comment: "Kanban add card"),
            isPresented: Binding(
                get: { showAddCardForColumn != nil },
                set: { if !$0 { showAddCardForColumn = nil } }
            )
        ) {
            TextField(String(localized: "Card title", comment: "Kanban card title field"), text: $newCardTitle)
            Button(String(localized: "Cancel", comment: "Cancel")) {
                newCardTitle = ""
                showAddCardForColumn = nil
            }
            Button(String(localized: "Add", comment: "Add")) {
                // Capture before the alert dismisses — SwiftUI clears the binding first, which
                // previously made `addCard()` no-op (`showAddCardForColumn` was already nil).
                let column = showAddCardForColumn
                let title = newCardTitle
                newCardTitle = ""
                showAddCardForColumn = nil
                guard let column else { return }
                Task { await addCard(title: title, to: column) }
            }
        }
        .alert(
            String(localized: "Rename Column", comment: "Kanban rename column"),
            isPresented: Binding(
                get: { renameColumnTarget != nil },
                set: { if !$0 { renameColumnTarget = nil } }
            )
        ) {
            TextField(String(localized: "Column name", comment: "Kanban column name field"), text: $renameColumnText)
            Button(String(localized: "Cancel", comment: "Cancel")) { renameColumnTarget = nil }
            Button(String(localized: "Rename", comment: "Rename")) {
                let old = renameColumnTarget
                let newName = renameColumnText
                renameColumnTarget = nil
                guard let old else { return }
                Task { await renameColumn(from: old, to: newName) }
            }
        }
        .confirmationDialog(
            String(localized: "Delete Column?", comment: "Kanban delete column title"),
            isPresented: $showDeleteColumnConfirm,
            titleVisibility: .visible
        ) {
            Button(String(localized: "Delete", comment: "Delete"), role: .destructive) {
                Task { await deleteColumn() }
            }
            Button(String(localized: "Cancel", comment: "Cancel"), role: .cancel) {}
        } message: {
            Text(String(localized: "Only empty columns can be deleted.", comment: "Kanban delete column message"))
        }
        // The column snapshot travels as the sheet's item: filling a separate draft right before an
        // `isPresented` sheet could present it built from the previous, empty draft.
        .sheet(item: $columnReorder) { request in
            KanbanColumnReorderSheet(request: request) { values in
                columnReorder = nil
                Task { await saveReorderedColumns(values) }
            } onCancel: {
                columnReorder = nil
            }
        }
        .sheet(item: $columnLimitEdit) { request in
            KanbanColumnLimitSheet(request: request) { limit in
                columnLimitEdit = nil
                setColumnLimit(request.value, limit: limit)
            } onCancel: {
                columnLimitEdit = nil
            }
        }
        .sheet(item: $addExistingNoteColumn) { target in
            NotePickerSheet(
                excludeNoteId: note.noteId,
                navigationTitleOverride: String(
                    format: String(localized: "Add a Note to “%@”", comment: "Kanban add existing note picker title"),
                    target.title
                ),
                hidesEmbeddedTreeToolbar: true,
                hidesEmbeddedTreeRootHeader: true,
                hidesEmbeddedTreeTabsBar: true
            ) { pickedId, _ in
                Task { await addExistingNote(pickedId, to: target) }
            }
            .environment(appState)
        }
        .alert(
            String(localized: "Delete Card?", comment: "Kanban delete card title"),
            isPresented: Binding(
                get: { cardToDelete != nil },
                set: { if !$0 { cardToDelete = nil } }
            ),
            presenting: cardToDelete
        ) { card in
            Button(String(localized: "Delete", comment: "Delete"), role: .destructive) {
                cardToDelete = nil
                Task { await deleteCard(card, alsoRemoveClones: false) }
            }
            Button(String(localized: "Cancel", comment: "Cancel"), role: .cancel) {}
        } message: { card in
            Text(NoteDeleteConfirmationCopy.singleNoteMessage(title: card.title))
        }
        .noteDeleteConfirmationAlert(
            isPresented: Binding(
                get: { clonedCardToDelete != nil },
                set: { if !$0 { clonedCardToDelete = nil } }
            ),
            title: String(localized: "Remove from Board", comment: "Kanban remove a cloned card from the board"),
            message: clonedCardToDelete.map {
                String(
                    format: String(
                        localized: "“%@” is also cloned elsewhere in the tree. Removing it from the board keeps those clones.",
                        comment: "Kanban remove cloned card message"
                    ),
                    $0.title
                )
            } ?? "",
            confirmTitle: String(localized: "Remove", comment: "Kanban remove card confirm"),
            toggleTitle: String(localized: "Also remove clones", comment: "Kanban remove card: delete the note everywhere"),
            erasePermanently: $alsoRemoveClones,
            onConfirm: {
                guard let card = clonedCardToDelete else { return }
                let removeClones = alsoRemoveClones
                clonedCardToDelete = nil
                alsoRemoveClones = false
                Task { await deleteCard(card, alsoRemoveClones: removeClones) }
            },
            onCancel: {
                alsoRemoveClones = false
                clonedCardToDelete = nil
            }
        )
    }

    @ViewBuilder
    private var toolbar: some View {
        HStack(spacing: 12) {
            Text(String(localized: "Kanban Board", comment: "Kanban toolbar label"))
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.secondary)
            if let filterQuery {
                Label(filterQuery, systemImage: "line.3.horizontal.decrease.circle")
                    .font(.caption)
                    .lineLimit(1)
                    .truncationMode(.tail)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(Color(.tertiarySystemFill), in: Capsule())
                    .accessibilityLabel(String(
                        format: String(localized: "Filtered by %@", comment: "Kanban board filter chip accessibility label"),
                        filterQuery
                    ))
            }
            Spacer()
            if columns.count > 1 {
                Button {
                    columnReorder = KanbanColumnReorderRequest(
                        values: columns.map(\.value),
                        titles: Dictionary(columns.map { ($0.value, $0.displayTitle) }, uniquingKeysWith: { first, _ in first })
                    )
                } label: {
                    Label(
                        String(localized: "Reorder Columns", comment: "Kanban reorder columns"),
                        systemImage: "arrow.left.arrow.right"
                    )
                }
                .labelStyle(.iconOnly)
                .accessibilityLabel(String(localized: "Reorder Columns", comment: "Kanban reorder columns"))
            }
            if !groupsByRelation {
                Button {
                    newColumnPlacement = nil
                    showAddColumn = true
                } label: {
                    Label(String(localized: "Column", comment: "Kanban add column short"), systemImage: "plus.rectangle.on.rectangle")
                }
                .labelStyle(.iconOnly)
            }
            Button {
                Task { await reload(showSpinner: false) }
            } label: {
                Label(String(localized: "Refresh", comment: "Refresh"), systemImage: "arrow.clockwise")
            }
            .labelStyle(.iconOnly)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
    }

    @ViewBuilder
    private func kanbanColumn(_ column: KanbanBoardModels.Column) -> some View {
        let columnIndex = columns.firstIndex(where: { $0.value == column.value })
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 6) {
                // Double-tapping the header (title through count) collapses the column, as on the web board.
                HStack(spacing: 6) {
                    columnIcon(column)
                    Text(column.displayTitle)
                        .font(.headline)
                        .lineLimit(1)
                    Spacer()
                    columnCount(column)
                }
                .contentShape(Rectangle())
                .onTapGesture(count: 2) {
                    collapse(column)
                }
                .accessibilityAction(named: Text(String(localized: "Collapse", comment: "Kanban collapse column"))) {
                    collapse(column)
                }
                Menu {
                    Button {
                        newCardTitle = ""
                        showAddCardForColumn = column.value
                    } label: {
                        Label(String(localized: "Add Card", comment: "Kanban add card"), systemImage: "plus")
                    }
                    Button {
                        addExistingNoteColumn = KanbanColumnTarget(value: column.value, title: column.displayTitle)
                    } label: {
                        Label(
                            String(localized: "Add Existing Note as Card", comment: "Kanban clone an existing note into the column"),
                            systemImage: "rectangle.stack.badge.plus"
                        )
                    }
                    addNewColumnMenu(next: column)
                    if let columnIndex {
                        if columnIndex > 0 {
                            Button {
                                Task { await moveColumn(at: columnIndex, by: -1) }
                            } label: {
                                Label(
                                    String(localized: "Move Left", comment: "Kanban move column left"),
                                    systemImage: "arrow.left"
                                )
                            }
                        }
                        if columnIndex < columns.count - 1 {
                            Button {
                                Task { await moveColumn(at: columnIndex, by: 1) }
                            } label: {
                                Label(
                                    String(localized: "Move Right", comment: "Kanban move column right"),
                                    systemImage: "arrow.right"
                                )
                            }
                        }
                    }
                    Divider()
                    Button {
                        collapse(column)
                    } label: {
                        Label(
                            String(localized: "Collapse", comment: "Kanban collapse column"),
                            systemImage: "arrow.right.and.line.vertical.and.arrow.left"
                        )
                    }
                    keepCollapsedToggle(column)
                    sortMenu(column)
                    if !column.isInbox {
                        Button {
                            columnLimitEdit = KanbanColumnLimitRequest(value: column.value, title: column.displayTitle, limit: column.limit)
                        } label: {
                            Label(
                                String(localized: "Set Limit…", comment: "Kanban column card limit menu item"),
                                systemImage: "gauge.with.dots.needle.67percent"
                            )
                        }
                    }
                    Divider()
                    if !column.isInbox && !groupsByRelation {
                        Button {
                            renameColumnText = column.value
                            renameColumnTarget = column.value
                        } label: {
                            Label(String(localized: "Rename Column", comment: "Kanban rename column"), systemImage: "pencil")
                        }
                    }
                    if !column.isInbox {
                        Button(role: .destructive) {
                            columnToDelete = column.value
                            if column.cards.isEmpty {
                                showDeleteColumnConfirm = true
                            } else {
                                viewModel.saveError = String(
                                    localized: "Move or delete cards in this column before deleting it.",
                                    comment: "Kanban delete non-empty column"
                                )
                                viewModel.showSaveError = true
                            }
                        } label: {
                            Label(String(localized: "Delete Column", comment: "Kanban delete column"), systemImage: "trash")
                        }
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                }
            }
            .padding(.horizontal, 4)

            ScrollView {
                LazyVStack(spacing: 8) {
                    ForEach(column.cards) { card in
                        cardCell(card, in: column)
                    }
                }
                .padding(.bottom, 8)
            }
            .frame(maxHeight: .infinity)

            Button {
                newCardTitle = ""
                showAddCardForColumn = column.value
            } label: {
                Label(String(localized: "Add Card", comment: "Kanban add card"), systemImage: "plus")
                    .font(.subheadline)
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.bordered)
        }
        .padding(10)
        .frame(width: columnWidth)
        .frame(maxHeight: .infinity, alignment: .top)
        .background(columnBackground(column))
    }

    /// A collapsed column: a narrow strip with its icon, count and name. Tapping opens it.
    private func collapsedColumn(_ column: KanbanBoardModels.Column) -> some View {
        Button {
            expand(column)
        } label: {
            VStack(spacing: 10) {
                columnIcon(column)
                columnCount(column)
                Text(column.displayTitle)
                    .font(.subheadline.weight(.semibold))
                    .lineLimit(1)
                    .fixedSize()
                    .rotationEffect(.degrees(90))
                    .frame(width: 24, height: 160, alignment: .center)
                Spacer(minLength: 0)
            }
            .padding(.vertical, 12)
            .frame(width: 44)
            .frame(maxHeight: .infinity, alignment: .top)
            .background(columnBackground(column))
            .contentShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
        .contextMenu {
            Button {
                expand(column)
            } label: {
                Label(
                    String(localized: "Expand", comment: "Kanban expand collapsed column"),
                    systemImage: "arrow.left.and.line.vertical.and.arrow.right"
                )
            }
            addNewColumnMenu(next: column)
            keepCollapsedToggle(column)
        }
        .accessibilityLabel(String(
            format: String(localized: "%@, collapsed", comment: "Kanban collapsed column accessibility label"),
            column.displayTitle
        ))
        .accessibilityHint(String(localized: "Expands the column", comment: "Kanban collapsed column accessibility hint"))
    }

    /// "Add New Column" › To the Left / To the Right of `column`. Hidden for relation groupings, whose columns are notes.
    @ViewBuilder
    private func addNewColumnMenu(next column: KanbanBoardModels.Column) -> some View {
        if !groupsByRelation {
            Menu {
                Button {
                    startAddingColumn(next: column, toTheRight: false)
                } label: {
                    Label(String(localized: "To the Left", comment: "Kanban add column to the left"), systemImage: "arrow.left")
                }
                Button {
                    startAddingColumn(next: column, toTheRight: true)
                } label: {
                    Label(String(localized: "To the Right", comment: "Kanban add column to the right"), systemImage: "arrow.right")
                }
            } label: {
                Label(
                    String(localized: "Add New Column", comment: "Kanban add column next to this one"),
                    systemImage: "plus.rectangle.on.rectangle"
                )
            }
        }
    }

    private func startAddingColumn(next column: KanbanBoardModels.Column, toTheRight: Bool) {
        newColumnName = ""
        newColumnPlacement = KanbanNewColumnPlacement(anchor: column.value, anchorTitle: column.displayTitle, toTheRight: toTheRight)
        showAddColumn = true
    }

    /// Checked while the column is kept collapsed; toggling it saves the setting to the board.
    private func keepCollapsedToggle(_ column: KanbanBoardModels.Column) -> some View {
        Toggle(isOn: Binding(
            get: { column.isKeptCollapsed },
            set: { _ in toggleKeepCollapsed(column.value) }
        )) {
            Label(
                String(localized: "Keep Column Collapsed", comment: "Kanban keep column collapsed toggle"),
                systemImage: "lock"
            )
        }
    }

    // MARK: - Collapsing (Trilium v0.106 board semantics)

    private func isShownCollapsed(_ column: KanbanBoardModels.Column) -> Bool {
        collapseOverrides[column.value] ?? column.isCollapsed
    }

    private func updateColumn(_ value: String, _ change: (inout KanbanBoardModels.Column) -> Void) {
        guard let index = columns.firstIndex(where: { $0.value == value }) else { return }
        change(&columns[index])
    }

    /// Collapses the column and saves `collapsed` (a kept-collapsed column is stored collapsed already).
    private func collapse(_ column: KanbanBoardModels.Column) {
        withAnimation(.easeInOut(duration: 0.2)) {
            collapseOverrides[column.value] = true
        }
        let current = columns.first { $0.value == column.value } ?? column
        guard !(current.isKeptCollapsed && current.isCollapsed) else { return }
        saveCollapse(column.value, collapsed: true, keepCollapsed: nil) { saved in
            if saved { updateColumn(column.value) { $0.isCollapsed = true } }
        }
    }

    /// Opens the column. A kept-collapsed one opens for this session only; any other also clears `collapsed`.
    private func expand(_ column: KanbanBoardModels.Column) {
        withAnimation(.easeInOut(duration: 0.2)) {
            collapseOverrides[column.value] = false
        }
        let current = columns.first { $0.value == column.value } ?? column
        guard current.isCollapsed, !current.isKeptCollapsed else { return }
        saveCollapse(column.value, collapsed: false, keepCollapsed: nil) { saved in
            if saved { updateColumn(column.value) { $0.isCollapsed = false } }
        }
    }

    /// Turning "Keep Column Collapsed" on also collapses the column; turning it off on an open column clears
    /// `collapsed` too, so the column stays open. Needs the server.
    private func toggleKeepCollapsed(_ value: String) {
        guard let column = columns.first(where: { $0.value == value }) else { return }
        guard viewModel.isOnline else {
            viewModel.saveError = String(localized: "Connect to the server to edit board columns.", comment: "Kanban offline column edit")
            viewModel.showSaveError = true
            return
        }
        let keep = !column.isKeptCollapsed
        let isOpen = !isShownCollapsed(column)
        let previousOverride = collapseOverrides[value]
        withAnimation(.easeInOut(duration: 0.2)) {
            updateColumn(value) { column in
                column.isKeptCollapsed = keep
                if keep { column.isCollapsed = true } else if isOpen { column.isCollapsed = false }
            }
            if keep { collapseOverrides[value] = true }
        }
        let collapsed: Bool? = keep ? true : (isOpen ? false : nil)
        saveCollapse(value, collapsed: collapsed, keepCollapsed: keep) { saved in
            guard !saved else { return }
            withAnimation(.easeInOut(duration: 0.2)) {
                updateColumn(value) { $0 = column }
                collapseOverrides[value] = previousOverride
            }
        }
    }

    private func saveCollapse(
        _ value: String,
        collapsed: Bool?,
        keepCollapsed: Bool?,
        then apply: @escaping @MainActor (Bool) -> Void
    ) {
        var patch: [String: KanbanBoardModels.JSONValue?] = [:]
        if let collapsed { patch["collapsed"] = .bool(collapsed) }
        if let keepCollapsed { patch["keepCollapsed"] = .bool(keepCollapsed) }
        saveColumnFields(value, patch: patch, then: apply)
    }

    /// Column saves run one after another (and other board edits wait for them), each reading `board.json` afresh.
    private func saveColumnFields(
        _ value: String,
        patch: [String: KanbanBoardModels.JSONValue?],
        then apply: @escaping @MainActor (Bool) -> Void
    ) {
        let previous = collapseSaveTask
        let shownOrder = columns.map(\.value)
        collapseSaveTask = Task { @MainActor in
            await previous?.value
            let saved = await viewModel.saveKanbanColumnFields(
                value: value,
                patch: patch,
                for: note,
                groupBy: groupBy,
                shownOrder: shownOrder
            )
            apply(saved)
        }
    }

    // MARK: - Sorting (Trilium v0.106 column Sort menu)

    /// Board's Default / Manually / Title / Creation Date & Time / card properties, then the direction, which only a
    /// column's own key can set.
    private func sortMenu(_ column: KanbanBoardModels.Column) -> some View {
        let selection = column.sortSelection
        let canPickDirection = selection != "default" && selection != "manual"
        let isDescending = column.effectiveSort?.descending ?? false
        let propertyKeys = Set(cardProperties.map { "attr:\($0.name)" })
        return Menu {
            Picker(selection: Binding(get: { selection }, set: { setColumnSort(column.value, orderBy: $0) })) {
                Label(String(localized: "Board’s Default", comment: "Kanban column sort: follow the board"), systemImage: "square.stack")
                    .tag("default")
                Label(String(localized: "Manually", comment: "Kanban column sort: tree order"), systemImage: "arrow.up.and.down")
                    .tag("manual")
                Label(String(localized: "Title", comment: "Kanban column sort by title"), systemImage: "textformat")
                    .tag("title")
                Label(String(localized: "Creation Date & Time", comment: "Kanban column sort by creation date"), systemImage: "calendar.badge.plus")
                    .tag("creationDate")
                ForEach(cardProperties, id: \.self) { property in
                    Label(property.title, systemImage: property.isRelation ? "link" : "tag")
                        .tag("attr:\(property.name)")
                }
                // A key naming a property the board no longer shows still orders the column; it keeps its bare name.
                if selection.hasPrefix("attr:"), !propertyKeys.contains(selection) {
                    Label(String(selection.dropFirst("attr:".count)), systemImage: "tag")
                        .tag(selection)
                }
            } label: {
                EmptyView()
            }
            .pickerStyle(.inline)
            Section {
                Toggle(isOn: Binding(
                    get: { selection != "manual" && !isDescending },
                    set: { _ in setColumnSortDirection(column.value, descending: false) }
                )) {
                    Label(String(localized: "Ascending", comment: "Kanban column sort direction"), systemImage: "arrow.up")
                }
                .disabled(!canPickDirection)
                Toggle(isOn: Binding(
                    get: { selection != "manual" && isDescending },
                    set: { _ in setColumnSortDirection(column.value, descending: true) }
                )) {
                    Label(String(localized: "Descending", comment: "Kanban column sort direction"), systemImage: "arrow.down")
                }
                .disabled(!canPickDirection)
            }
        } label: {
            Label(String(localized: "Sort", comment: "Kanban column sort menu"), systemImage: "arrow.up.arrow.down")
        }
    }

    private func setColumnSort(_ value: String, orderBy: String) {
        guard let column = columns.first(where: { $0.value == value }), column.sortSelection != orderBy else { return }
        applySort(to: column, orderBy: orderBy, descending: column.isStoredDescending, patch: ["orderBy": .string(orderBy)])
    }

    private func setColumnSortDirection(_ value: String, descending: Bool) {
        guard let column = columns.first(where: { $0.value == value }), column.isStoredDescending != descending else { return }
        applySort(to: column, orderBy: column.storedOrderBy, descending: descending, patch: ["descendingOrder": .bool(descending)])
    }

    /// Re-sorts the column at once and saves the choice to the board; a failed save puts the column back.
    private func applySort(
        to column: KanbanBoardModels.Column,
        orderBy: String?,
        descending: Bool,
        patch: [String: KanbanBoardModels.JSONValue?]
    ) {
        guard viewModel.isOnline else {
            viewModel.saveError = String(localized: "Connect to the server to edit board columns.", comment: "Kanban offline column edit")
            viewModel.showSaveError = true
            return
        }
        let titles = relationTitles
        withAnimation(.easeInOut(duration: 0.2)) {
            updateColumn(column.value) {
                $0 = KanbanBoardModels.resorted(
                    $0, orderBy: orderBy, descending: descending, boardSort: boardSort, relationTitle: { titles[$0] }
                )
            }
        }
        saveColumnFields(column.value, patch: patch) { saved in
            guard !saved else { return }
            withAnimation(.easeInOut(duration: 0.2)) {
                updateColumn(column.value) {
                    $0 = KanbanBoardModels.resorted(
                        $0,
                        orderBy: column.storedOrderBy,
                        descending: column.isStoredDescending,
                        boardSort: boardSort,
                        relationTitle: { titles[$0] }
                    )
                }
            }
        }
    }

    // MARK: - Card limit

    /// Shows the new limit at once and saves it to the board (`nil` removes it); a failed save puts the old one back.
    private func setColumnLimit(_ value: String, limit: Int?) {
        guard let column = columns.first(where: { $0.value == value }), column.limit != limit else { return }
        guard viewModel.isOnline else {
            viewModel.saveError = String(localized: "Connect to the server to edit board columns.", comment: "Kanban offline column edit")
            viewModel.showSaveError = true
            return
        }
        let previous = column.limit
        withAnimation(.easeInOut(duration: 0.2)) {
            updateColumn(value) { $0.limit = limit }
        }
        saveColumnFields(value, patch: ["limit": limit.map { .int($0) }]) { saved in
            guard !saved else { return }
            withAnimation(.easeInOut(duration: 0.2)) {
                updateColumn(value) { $0.limit = previous }
            }
        }
    }

    // MARK: - Existing notes and card removal

    private func addExistingNote(_ pickedNoteId: String, to column: KanbanColumnTarget) async {
        await collapseSaveTask?.value
        isMutating = true
        defer { isMutating = false }
        if await viewModel.addExistingNoteAsKanbanCard(noteId: pickedNoteId, column: column.value, groupBy: groupBy) {
            await reload(showSpinner: false)
        }
    }

    private func deleteCard(_ card: KanbanBoardModels.Card, alsoRemoveClones: Bool) async {
        let previous = columns
        withAnimation(.easeInOut(duration: 0.2)) {
            for index in columns.indices {
                columns[index].cards.removeAll { $0.noteId == card.noteId }
            }
        }
        isMutating = true
        defer { isMutating = false }
        if await viewModel.deleteKanbanCard(noteId: card.noteId, branchId: card.branchId, alsoRemoveClones: alsoRemoveClones) {
            await reload(showSpinner: false)
        } else {
            withAnimation(.easeInOut(duration: 0.2)) {
                columns = previous
            }
        }
    }

    @ViewBuilder
    private func columnIcon(_ column: KanbanBoardModels.Column) -> some View {
        if BoxiconsResolver.isCatalogIcon(column.icon) {
            NoteIconView(
                iconClass: column.icon,
                fallbackNoteType: .book,
                size: .compact,
                foregroundStyle: columnColor(column) ?? .secondary
            )
            .accessibilityHidden(true)
        }
    }

    /// Card count, as `count/limit` in red once the column holds more cards than its limit.
    private func columnCount(_ column: KanbanBoardModels.Column) -> some View {
        let text = column.limit.map { "\(column.cards.count)/\($0)" } ?? "\(column.cards.count)"
        return Text(text)
            .font(.caption.monospacedDigit())
            .fontWeight(column.isOverLimit ? .semibold : .regular)
            .foregroundStyle(column.isOverLimit ? Color.red : Color.secondary)
            .accessibilityLabel(column.isOverLimit
                ? String(
                    format: String(localized: "%1$lld cards, over the limit of %2$lld", comment: "Kanban column over its card limit"),
                    column.cards.count,
                    column.limit ?? 0
                )
                : String(
                    format: String(localized: "%lld cards", comment: "Kanban column card count"),
                    column.cards.count
                ))
    }

    private func columnColor(_ column: KanbanBoardModels.Column) -> Color? {
        TriliumNoteColorMapper.swiftUIColor(for: column.color)
    }

    /// The column's color tints its background, as on the web board.
    private func columnBackground(_ column: KanbanBoardModels.Column) -> some View {
        let shape = RoundedRectangle(cornerRadius: 12)
        return shape
            .fill(Color(.secondarySystemGroupedBackground))
            .overlay {
                if let tint = columnColor(column) {
                    shape.fill(tint.opacity(0.14))
                }
            }
    }

    @ViewBuilder
    private func cardCell(_ card: KanbanBoardModels.Card, in column: KanbanBoardModels.Column) -> some View {
        Button {
            onOpenCard(card.redirectNoteId ?? card.noteId)
        } label: {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                NoteIconView(
                    iconClass: card.iconClass,
                    fallbackNoteType: card.fallbackNoteType,
                    size: .compact,
                    foregroundStyle: cardColor(card)
                )
                .frame(width: 20)
                .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 4) {
                    Text(card.title)
                        .font(.body)
                        .foregroundStyle(cardColor(card))
                        .multilineTextAlignment(.leading)
                    let properties = propertyValues(for: card)
                    if !properties.isEmpty {
                        VStack(alignment: .leading, spacing: 2) {
                            ForEach(properties, id: \.title) { property in
                                Text("\(Text(property.title + ": ").foregroundStyle(.secondary))\(property.value)")
                                    .font(.caption)
                                    .lineLimit(2)
                            }
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.tertiary)
            }
            .padding(12)
            .background(Color(.systemBackground), in: RoundedRectangle(cornerRadius: 10))
        }
        .buttonStyle(.plain)
        .contextMenu {
            let currentIndex = columns.firstIndex { $0.value == column.value } ?? 0
            ForEach(Array(columns.enumerated()), id: \.element.id) { index, target in
                if target.value != column.value {
                    Button {
                        Task { await moveCard(card, to: target.value) }
                    } label: {
                        Label(
                            String(format: String(localized: "Move to “%@”", comment: "Kanban move card to column"), target.displayTitle),
                            // Points toward the target column on the board.
                            systemImage: index < currentIndex ? "arrow.left" : "arrow.right"
                        )
                    }
                }
            }
            // A sorted column decides the order itself, so cards only move up and down in a manual one.
            if column.effectiveSort == nil, let idx = column.cards.firstIndex(where: { $0.noteId == card.noteId }) {
                if idx > 0 {
                    Button {
                        Task { await reorderCard(card, in: column, toIndex: idx - 1) }
                    } label: {
                        Label(String(localized: "Move Up", comment: "Kanban move card up"), systemImage: "arrow.up")
                    }
                }
                if idx < column.cards.count - 1 {
                    Button {
                        Task { await reorderCard(card, in: column, toIndex: idx + 1) }
                    } label: {
                        Label(String(localized: "Move Down", comment: "Kanban move card down"), systemImage: "arrow.down")
                    }
                }
            }
            Divider()
            Button(role: .destructive) {
                if card.isClonedElsewhere {
                    alsoRemoveClones = false
                    clonedCardToDelete = card
                } else {
                    cardToDelete = card
                }
            } label: {
                Label(
                    card.isClonedElsewhere
                        ? String(localized: "Remove from Board", comment: "Kanban remove a cloned card from the board")
                        : String(localized: "Delete Card", comment: "Kanban delete card"),
                    systemImage: "trash"
                )
            }
        }
    }

    /// The board's card properties this card has a value for; relations show the target note's title.
    private func propertyValues(for card: KanbanBoardModels.Card) -> [(title: String, value: String)] {
        cardProperties.compactMap { property in
            if property.isRelation {
                guard let target = card.relations[property.name], !target.isEmpty else { return nil }
                return (property.title, relationTitles[target] ?? target)
            }
            guard let value = card.labels[property.name]?.trimmingCharacters(in: .whitespacesAndNewlines),
                  !value.isEmpty else { return nil }
            return (property.title, value)
        }
    }

    /// The card's `#color`, as the note tree tints its rows when Trilium note colors are enabled.
    private func cardColor(_ card: KanbanBoardModels.Card) -> Color {
        guard useTriliumNoteColors else { return .primary }
        return TriliumNoteColorMapper.swiftUIColor(for: card.colorLabel) ?? .primary
    }

    /// Reloads board data. Spinner only on the first empty load — never tears down an existing board.
    private func reload(showSpinner: Bool) async {
        let shouldSpin = showSpinner && columns.isEmpty
        if shouldSpin { isLoading = true }
        defer { if shouldSpin { isLoading = false } }
        let result = await viewModel.loadKanbanBoard(for: note)
        columnWidthSetting = result.columnWidth
        filterQuery = result.filterQuery
        cardProperties = result.cardProperties
        relationTitles = result.relationTitles
        boardSort = result.boardSort
        // Avoid a no-op reassignment flash when optimistic UI already matches the server.
        guard result.columns != columns || result.groupBy != groupBy else { return }
        withAnimation(.easeInOut(duration: 0.2)) {
            columns = result.columns
            groupBy = result.groupBy
        }
    }

    /// Adds the named column next to `placement`'s column, or at the end of the board.
    private func addColumn(placement: KanbanNewColumnPlacement?) async {
        let name = newColumnName.trimmingCharacters(in: .whitespacesAndNewlines)
        newColumnName = ""
        guard !name.isEmpty else { return }
        guard !columns.contains(where: { $0.value.caseInsensitiveCompare(name) == .orderedSame }) else { return }
        var values = columns.map(\.value)
        if let placement, let index = values.firstIndex(of: placement.anchor) {
            values.insert(name, at: placement.toTheRight ? index + 1 : index)
        } else {
            values.append(name)
        }
        await persistColumnOrder(values)
    }

    /// Moves a column one step left (`by: -1`) or right (`by: 1`) and saves `board.json`.
    private func moveColumn(at index: Int, by offset: Int) async {
        let newIndex = index + offset
        guard columns.indices.contains(index), columns.indices.contains(newIndex) else { return }
        var values = columns.map(\.value)
        values.swapAt(index, newIndex)
        await persistColumnOrder(values)
    }

    private func saveReorderedColumns(_ values: [String]) async {
        guard values != columns.map(\.value) else { return }
        await persistColumnOrder(values)
    }

    /// Persists column order via `board.json`. Updates UI immediately; keeps the board on screen.
    private func persistColumnOrder(_ values: [String]) async {
        await collapseSaveTask?.value
        let previous = columns
        let columnsByValue = Dictionary(columns.map { ($0.value, $0) }, uniquingKeysWith: { first, _ in first })
        withAnimation(.easeInOut(duration: 0.2)) {
            columns = values.map { columnsByValue[$0] ?? KanbanBoardModels.Column(value: $0, cards: []) }
        }
        isMutating = true
        defer { isMutating = false }
        if !(await viewModel.saveKanbanColumns(shownOrder: values, for: note, groupBy: groupBy)) {
            withAnimation(.easeInOut(duration: 0.2)) {
                columns = previous
            }
        }
    }

    private func addCard(title: String, to column: String) async {
        isMutating = true
        defer { isMutating = false }
        guard let newId = await viewModel.createKanbanCard(title: title, column: column, groupBy: groupBy) else {
            return
        }
        let resolvedTitle = NoteCreationTitle.resolved(from: title)
        let optimistic = KanbanBoardModels.Card(
            noteId: newId,
            branchId: "",
            title: resolvedTitle,
            columnValue: column,
            notePosition: Int.max
        )
        withAnimation(.easeInOut(duration: 0.2)) {
            if let idx = columns.firstIndex(where: { $0.value == column }) {
                columns[idx].cards.append(optimistic)
            }
        }
        // Quiet sync for branch ids / server identity — board stays mounted.
        await reload(showSpinner: false)
    }

    private func renameColumn(from old: String, to newName: String) async {
        let trimmed = newName.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, trimmed != old else { return }
        await collapseSaveTask?.value
        let previous = columns
        if let override = collapseOverrides.removeValue(forKey: old) {
            collapseOverrides[trimmed] = override
        }
        withAnimation(.easeInOut(duration: 0.2)) {
            columns = columns.map { col in
                if col.value != old { return col }
                let renamedCards = col.cards.map { card in
                    var renamed = card
                    renamed.columnValue = trimmed
                    return renamed
                }
                return KanbanBoardModels.Column(
                    value: trimmed,
                    cards: renamedCards,
                    icon: col.icon,
                    color: col.color,
                    limit: col.limit,
                    isCollapsed: col.isCollapsed,
                    isKeptCollapsed: col.isKeptCollapsed
                )
            }
        }
        isMutating = true
        defer { isMutating = false }
        let allCards = previous.flatMap(\.cards)
        if await viewModel.renameKanbanColumn(
            from: old,
            to: trimmed,
            for: note,
            groupBy: groupBy,
            cards: allCards,
            shownOrder: previous.map(\.value)
        ) {
            // Keep optimistic UI; only pull if labels/config diverge.
            await reload(showSpinner: false)
        } else {
            withAnimation(.easeInOut(duration: 0.2)) {
                columns = previous
            }
        }
    }

    private func deleteColumn() async {
        guard let value = columnToDelete else { return }
        columnToDelete = nil
        guard let column = columns.first(where: { $0.value == value }), column.cards.isEmpty else { return }
        let values = columns.map(\.value).filter { $0 != value }
        await persistColumnOrder(values)
    }

    private func moveCard(_ card: KanbanBoardModels.Card, to column: String) async {
        let previous = columns
        withAnimation(.easeInOut(duration: 0.2)) {
            applyLocalCardMove(card, to: column)
        }
        isMutating = true
        defer { isMutating = false }
        if !(await viewModel.moveKanbanCard(noteId: card.noteId, toColumn: column, groupBy: groupBy)) {
            withAnimation(.easeInOut(duration: 0.2)) {
                columns = previous
            }
        }
    }

    private func applyLocalCardMove(_ card: KanbanBoardModels.Card, to column: String) {
        var next = columns
        for i in next.indices {
            next[i].cards.removeAll { $0.noteId == card.noteId }
        }
        var moved = card
        moved.columnValue = column
        if let idx = next.firstIndex(where: { $0.value == column }) {
            next[idx].cards.append(moved)
        }
        columns = next
    }

    private func reorderCard(_ card: KanbanBoardModels.Card, in column: KanbanBoardModels.Column, toIndex: Int) async {
        guard !card.branchId.isEmpty else { return }
        var ordered = column.cards
        guard let from = ordered.firstIndex(where: { $0.noteId == card.noteId }) else { return }
        ordered.move(fromOffsets: IndexSet(integer: from), toOffset: toIndex > from ? toIndex + 1 : toIndex)

        let previous = columns
        withAnimation(.easeInOut(duration: 0.2)) {
            if let colIdx = columns.firstIndex(where: { $0.value == column.value }) {
                columns[colIdx].cards = ordered
            }
        }

        var rebuilt: [String] = []
        for col in columns {
            if col.value == column.value {
                rebuilt.append(contentsOf: ordered.map(\.branchId).filter { !$0.isEmpty })
            } else {
                rebuilt.append(contentsOf: col.cards.map(\.branchId).filter { !$0.isEmpty })
            }
        }
        var seen = Set<String>()
        let allBranchIds = rebuilt.filter { seen.insert($0).inserted }

        isMutating = true
        defer { isMutating = false }
        if !(await viewModel.reorderKanbanCard(branchId: card.branchId, orderedSiblingBranchIds: allBranchIds)) {
            withAnimation(.easeInOut(duration: 0.2)) {
                columns = previous
            }
        }
    }
}

/// The column Set Limit… was opened on, with its limit at that moment.
private struct KanbanColumnLimitRequest: Identifiable {
    let value: String
    let title: String
    let limit: Int?
    var id: String { value }
}

/// Turns a column's card limit on or off and sets it, as Trilium's board does: a switch rather than a
/// "no limit" number, at least 1, starting from 5.
private struct KanbanColumnLimitSheet: View {
    let request: KanbanColumnLimitRequest
    let onSave: (Int?) -> Void
    let onCancel: () -> Void

    private static let defaultLimit = 5

    @State private var isLimited: Bool
    @State private var limit: Int

    init(request: KanbanColumnLimitRequest, onSave: @escaping (Int?) -> Void, onCancel: @escaping () -> Void) {
        self.request = request
        self.onSave = onSave
        self.onCancel = onCancel
        _isLimited = State(initialValue: request.limit != nil)
        _limit = State(initialValue: request.limit ?? Self.defaultLimit)
    }

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Toggle(String(localized: "Limit Cards", comment: "Kanban column limit switch"), isOn: $isLimited.animation())
                    if isLimited {
                        HStack {
                            Text(String(localized: "Maximum", comment: "Kanban column limit number label"))
                            Spacer()
                            TextField("", value: $limit, format: .number)
                                .keyboardType(.numberPad)
                                .multilineTextAlignment(.trailing)
                                .frame(width: 64)
                                .accessibilityLabel(String(localized: "Maximum cards", comment: "Kanban column limit field"))
                            Stepper("", value: $limit, in: 1...9999)
                                .labelsHidden()
                        }
                    }
                } footer: {
                    Text(String(
                        localized: "The card count turns red when the column holds more cards than its limit.",
                        comment: "Kanban column limit explanation"
                    ))
                }
            }
            .navigationTitle(request.title)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Cancel")) { onCancel() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Save", comment: "Save")) {
                        onSave(isLimited ? max(1, limit) : nil)
                    }
                }
            }
        }
        .presentationDetents([.medium])
    }
}

/// A column a sheet acts on (value plus its shown title).
private struct KanbanColumnTarget: Identifiable {
    let value: String
    let title: String
    var id: String { value }
}

/// Where a column added from a column's menu goes: beside `anchor` (a column value).
private struct KanbanNewColumnPlacement: Equatable {
    let anchor: String
    let anchorTitle: String
    let toTheRight: Bool
}

/// The board's columns as they stood when Reorder Columns was opened.
private struct KanbanColumnReorderRequest: Identifiable {
    let id = UUID()
    let values: [String]
    /// Header text per column value (the inbox's name, a relation target's title).
    let titles: [String: String]
}

/// Drag-to-reorder list for a board's columns; owns its draft so it always opens with the columns it was given.
private struct KanbanColumnReorderSheet: View {
    let request: KanbanColumnReorderRequest
    let onSave: ([String]) -> Void
    let onCancel: () -> Void

    @State private var draft: [String]

    init(request: KanbanColumnReorderRequest, onSave: @escaping ([String]) -> Void, onCancel: @escaping () -> Void) {
        self.request = request
        self.onSave = onSave
        self.onCancel = onCancel
        _draft = State(initialValue: request.values)
    }

    var body: some View {
        NavigationStack {
            List {
                ForEach(draft, id: \.self) { value in
                    Text(request.titles[value] ?? value)
                }
                .onMove { source, destination in
                    draft.move(fromOffsets: source, toOffset: destination)
                }
            }
            .environment(\.editMode, .constant(.active))
            .navigationTitle(String(localized: "Reorder Columns", comment: "Kanban reorder columns"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Cancel")) {
                        onCancel()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Save", comment: "Save")) {
                        onSave(draft)
                    }
                }
            }
        }
        .presentationDetents([.medium, .large])
    }
}
