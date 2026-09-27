import SwiftUI

/// Native Kanban board for Trilium `#viewType=board` collections.
struct KanbanBoardView: View {
    @Bindable var viewModel: NoteDetailViewModel
    let note: NoteItem
    var onOpenCard: (String) -> Void

    @AppStorage("useTriliumNoteColors") private var useTriliumNoteColors: Bool = true

    @State private var columns: [KanbanBoardModels.Column] = []
    @State private var groupBy: String = KanbanBoardModels.defaultGroupByAttribute
    @State private var isLoading = true
    @State private var isMutating = false

    @State private var showAddColumn = false
    @State private var newColumnName = ""
    @State private var showAddCardForColumn: String?
    @State private var newCardTitle = ""
    @State private var renameColumnTarget: String?
    @State private var renameColumnText = ""
    @State private var columnToDelete: String?
    @State private var showDeleteColumnConfirm = false
    @State private var columnReorder: KanbanColumnReorderRequest?

    /// A relation grouping's columns are target notes, so they can't be named or renamed as text here.
    private var groupsByRelation: Bool { KanbanBoardModels.GroupBy(groupBy).isRelation }

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
                            showAddColumn = true
                        }
                        .buttonStyle(.borderedProminent)
                    }
                }
            } else {
                ScrollView(.horizontal, showsIndicators: true) {
                    HStack(alignment: .top, spacing: 12) {
                        ForEach(columns) { column in
                            kanbanColumn(column)
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
        .alert(
            String(localized: "Add Column", comment: "Kanban add column"),
            isPresented: $showAddColumn
        ) {
            TextField(String(localized: "Column name", comment: "Kanban column name field"), text: $newColumnName)
            Button(String(localized: "Cancel", comment: "Cancel")) { newColumnName = "" }
            Button(String(localized: "Add", comment: "Add")) {
                Task { await addColumn() }
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
    }

    @ViewBuilder
    private var toolbar: some View {
        HStack(spacing: 12) {
            Text(String(localized: "Kanban Board", comment: "Kanban toolbar label"))
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.secondary)
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
            HStack {
                Text(column.displayTitle)
                    .font(.headline)
                    .lineLimit(1)
                Spacer()
                Text("\(column.cards.count)")
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(.secondary)
                Menu {
                    Button(String(localized: "Add Card", comment: "Kanban add card")) {
                        newCardTitle = ""
                        showAddCardForColumn = column.value
                    }
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
                    if !column.isInbox && !groupsByRelation {
                        Button(String(localized: "Rename Column", comment: "Kanban rename column")) {
                            renameColumnText = column.value
                            renameColumnTarget = column.value
                        }
                    }
                    if !column.isInbox {
                        Button(String(localized: "Delete Column", comment: "Kanban delete column"), role: .destructive) {
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
        .frame(width: 260)
        .frame(maxHeight: .infinity, alignment: .top)
        .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 12))
    }

    @ViewBuilder
    private func cardCell(_ card: KanbanBoardModels.Card, in column: KanbanBoardModels.Column) -> some View {
        Button {
            onOpenCard(card.noteId)
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
                Text(card.title)
                    .font(.body)
                    .foregroundStyle(cardColor(card))
                    .multilineTextAlignment(.leading)
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
            ForEach(columns.filter { $0.value != column.value }) { target in
                Button {
                    Task { await moveCard(card, to: target.value) }
                } label: {
                    Label(
                        String(format: String(localized: "Move to %@", comment: "Kanban move card to column"), target.displayTitle),
                        systemImage: "arrow.right"
                    )
                }
            }
            if let idx = column.cards.firstIndex(where: { $0.noteId == card.noteId }) {
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
        // Avoid a no-op reassignment flash when optimistic UI already matches the server.
        guard result.columns != columns || result.groupBy != groupBy else { return }
        withAnimation(.easeInOut(duration: 0.2)) {
            columns = result.columns
            groupBy = result.groupBy
        }
    }

    private func addColumn() async {
        let name = newColumnName.trimmingCharacters(in: .whitespacesAndNewlines)
        newColumnName = ""
        guard !name.isEmpty else { return }
        guard !columns.contains(where: { $0.value.caseInsensitiveCompare(name) == .orderedSame }) else { return }
        var values = columns.map(\.value)
        values.append(name)
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
        let previous = columns
        withAnimation(.easeInOut(duration: 0.2)) {
            columns = columns.map { col in
                if col.value != old { return col }
                let renamedCards = col.cards.map { card in
                    var renamed = card
                    renamed.columnValue = trimmed
                    return renamed
                }
                return KanbanBoardModels.Column(value: trimmed, cards: renamedCards)
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
