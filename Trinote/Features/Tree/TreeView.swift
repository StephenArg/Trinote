import SwiftUI

private struct SubTreeTarget: Hashable {
    let noteId: String
    let title: String
}

private struct NoteEditTarget: Hashable {
    let noteId: String
    let title: String
}

private struct CreateNoteSheetContext: Identifiable {
    let id = UUID()
    let parentNote: NoteItem
    let viewModel: TreeViewModel
}

struct TreeView: View {
    let parentNoteId: String
    let parentTitle: String

    init(parentNoteId: String = "root", parentTitle: String = "Notes") {
        self.parentNoteId = parentNoteId
        self.parentTitle = parentTitle
    }

    @Environment(AppState.self) private var appState
    @Environment(\.colorScheme) private var colorScheme
    @State private var viewModel: TreeViewModel?
    @State private var navigateToNote: NoteItem?
    @State private var drillDownTarget: SubTreeTarget?
    @State private var createSheetContext: CreateNoteSheetContext?
    @State private var navigateToNoteForEdit: NoteEditTarget?
    @State private var noteToDelete: (note: NoteItem, vm: TreeViewModel)?
    @State private var showFavoritesSheet = false
    @State private var favoriteNoteIds: Set<String> = []

    @AppStorage("useCustomTreeColors") private var useCustomTreeColors: Bool = false
    @AppStorage("treeLightTextColor") private var treeLightTextColor: String = "#1c1c1e"
    @AppStorage("treeDarkTextColor") private var treeDarkTextColor: String = "#e5e5e7"
    @AppStorage("treeLightBgColor") private var treeLightBgColor: String = "#ffffff"
    @AppStorage("treeDarkBgColor") private var treeDarkBgColor: String = "#1c1c1e"

    private var treeTextColor: Color? {
        guard useCustomTreeColors else { return nil }
        return colorScheme == .dark ? Color(hex: treeDarkTextColor) : Color(hex: treeLightTextColor)
    }

    private var treeBgColor: Color? {
        guard useCustomTreeColors else { return nil }
        return colorScheme == .dark ? Color(hex: treeDarkBgColor) : Color(hex: treeLightBgColor)
    }

    var body: some View {
        Group {
            if let viewModel {
                treeContent(viewModel)
            } else {
                ProgressView("Loading…")
            }
        }
        .navigationTitle(parentTitle)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    triggerSyncAndReload()
                } label: {
                    Image(systemName: "arrow.trianglehead.2.clockwise")
                }
                .disabled(viewModel?.isRefreshing ?? false || appState.syncManager.isSyncing)
                .accessibilityLabel("Refresh tree")
            }
            if parentNoteId == "root" {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showFavoritesSheet = true
                    } label: {
                        Image(systemName: "star")
                    }
                    .accessibilityLabel("Favorites")
                }
                if let vm = viewModel {
                    ToolbarItem(placement: .topBarTrailing) {
                        Button {
                            let rootNote = NoteItem(
                                noteId: "root",
                                title: "Notes",
                                type: .text,
                                mime: "text/html",
                                isProtected: false,
                                dateCreated: "",
                                dateModified: "",
                                parentNoteIds: [],
                                childNoteIds: [],
                                parentBranchIds: [],
                                childBranchIds: [],
                                attributes: []
                            )
                            createSheetContext = CreateNoteSheetContext(parentNote: rootNote, viewModel: vm)
                        } label: {
                            Image(systemName: "plus")
                        }
                        .accessibilityLabel("New top-level note")
                    }
                }
            }
        }
        .task {
            if viewModel == nil {
                let vm = TreeViewModel(appState: appState, parentNoteId: parentNoteId)
                viewModel = vm
                await vm.loadTree()
            }
            loadFavoriteIds()
        }
        .navigationDestination(item: $navigateToNote) { note in
            NoteDetailView(noteId: note.noteId, title: note.title)
        }
        .navigationDestination(item: $navigateToNoteForEdit) { target in
            NoteDetailView(noteId: target.noteId, title: target.title, startInEditMode: true)
        }
        .navigationDestination(item: $drillDownTarget) { target in
            TreeView(parentNoteId: target.noteId, parentTitle: target.title)
        }
        .alert("Delete Note", isPresented: Binding(
            get: { noteToDelete != nil },
            set: { if !$0 { noteToDelete = nil } }
        )) {
            Button("Delete Note and Subnotes", role: .destructive) {
                guard let (note, treeVm) = noteToDelete else { return }
                Task {
                    _ = await treeVm.deleteNoteAndSubnotes(noteId: note.noteId)
                }
                noteToDelete = nil
            }
            Button("Cancel", role: .cancel) {
                noteToDelete = nil
            }
        } message: {
            if let (note, _) = noteToDelete {
                Text("\"\(note.title)\" and all its subnotes will be permanently deleted. This cannot be undone.")
            }
        }
        .sheet(isPresented: $showFavoritesSheet, onDismiss: loadFavoriteIds) {
            FavoritesView(onNoteDeleted: { triggerSyncAndReload() })
                .environment(appState)
        }
        .onChange(of: appState.activeProfile?.id) { _, _ in loadFavoriteIds() }
        .onChange(of: appState.syncManager.phase) { _, phase in
            if phase == .done {
                // When pull applied rows to SwiftData, rebuild from DB (Trilium desktop applies Froca then reads it).
                if self.appState.syncManager.lastCompletedSyncUpdatedLocalDatabase {
                    self.viewModel?.reloadFromCache()
                } else {
                    self.viewModel?.pruneDeletedNodes()
                    Task { await self.viewModel?.refresh() }
                }
            }
        }
        .onReceive(NotificationCenter.default.publisher(for: .noteDeleted)) { _ in
            triggerSyncAndReload()
        }
        .onReceive(NotificationCenter.default.publisher(for: .ghostNoteDetected)) { _ in
            Task { await self.viewModel?.refresh() }
        }
        .sheet(item: $createSheetContext) { ctx in
            CreateChildNoteFromTreeSheet(
                parentNote: ctx.parentNote,
                viewModel: ctx.viewModel,
                onDismiss: { createSheetContext = nil },
                onNoteCreated: { noteId, title in
                    navigateToNoteForEdit = NoteEditTarget(noteId: noteId, title: title)
                }
            )
        }
    }

    @ViewBuilder
    private var syncProgressBanner: some View {
        let sync = appState.syncManager
        if sync.isSyncing {
            HStack(spacing: 8) {
                ProgressView()
                    .controlSize(.mini)
                Group {
                    switch sync.phase {
                    case .walkingTree:
                        Text("Discovering notes…")
                    case .fetchingChanges:
                        Text("Checking for changes…")
                    case .downloadingContent:
                        if sync.totalNoteCount > 0 {
                            Text("Syncing \(sync.syncedNoteCount)/\(sync.totalNoteCount) notes…")
                        } else {
                            Text("Downloading content…")
                        }
                    case .cleaningUp:
                        Text("Cleaning up…")
                    default:
                        Text("Syncing…")
                    }
                }
                .font(.caption)

                Spacer()

                if sync.totalNoteCount > 0 && sync.phase == .downloadingContent {
                    Text("\(Int(sync.syncProgress * 100))%")
                        .font(.caption.monospacedDigit())
                        .foregroundStyle(.secondary)
                }
            }
            .foregroundStyle(.blue)
            .padding(.horizontal)
            .padding(.vertical, 6)
            .background(.blue.opacity(0.08))
        }
    }

    private func toggleFavorite(_ note: NoteItem, isFav: Bool, onFavoriteChanged: @escaping () -> Void) {
        guard let profileId = appState.activeProfile?.id else { return }
        do {
            if isFav {
                try PersistenceManager.shared.removeFavorite(noteId: note.noteId, serverProfileId: profileId)
            } else {
                try PersistenceManager.shared.addFavorite(noteId: note.noteId, title: note.title, noteType: note.type.rawValue, serverProfileId: profileId)
            }
            onFavoriteChanged()
        } catch {
            Log.persistence.error("Failed to toggle favorite: \(error)")
        }
    }

    private func loadFavoriteIds() {
        guard let profileId = appState.activeProfile?.id else {
            favoriteNoteIds = []
            return
        }
        do {
            let favs = try PersistenceManager.shared.fetchFavorites(serverProfileId: profileId)
            favoriteNoteIds = Set(favs.map(\.noteId))
        } catch {
            Log.persistence.error("Failed to load favorite IDs: \(error)")
        }
    }

    private func triggerSyncAndReload() {
        Task {
            await self.appState.runIncrementalSync()
            // refresh() is triggered by onChange(of: phase == .done)
        }
    }

    private func refreshWithSync() async {
        await self.appState.runIncrementalSync()
        await self.viewModel?.refresh()
    }

    @ViewBuilder
    private func treeContent(_ vm: TreeViewModel) -> some View {
        if vm.isLoading && vm.rootChildren.isEmpty {
            loadingView
        } else if let error = vm.error, vm.rootChildren.isEmpty {
            connectionErrorView(vm: vm, error: error)
        } else {
            treeListView(vm)
        }
    }

    private var loadingView: some View {
        VStack(spacing: 12) {
            ProgressView()
            Text("Loading note tree…")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
    }

    private func connectionErrorView(vm: TreeViewModel, error: String) -> some View {
        ContentUnavailableView {
            Label("Connection Error", systemImage: "wifi.exclamationmark")
        } description: {
            Text(error)
        } actions: {
            Button("Retry") {
                Task { await vm.loadTree() }
            }
            .buttonStyle(.bordered)
        }
    }

    @ViewBuilder
    private func treeListView(_ vm: TreeViewModel) -> some View {
        VStack(spacing: 0) {
            if vm.isFromCache && !appState.syncManager.isSyncing {
                cachedBanner(vm)
            }
            syncProgressBanner
            if let error = vm.error, !vm.rootChildren.isEmpty {
                errorBanner(error)
            }
            treeList(vm)
        }
        .background(treeBgColor ?? Color.clear)
        .overlay {
            if vm.isRefreshing && !vm.isFromCache {
                ProgressView()
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
                    .padding()
            }
        }
    }

    private func cachedBanner(_ vm: TreeViewModel) -> some View {
        HStack(spacing: 6) {
            Image(systemName: "icloud.slash")
                .font(.caption)
            Text("Showing cached data")
                .font(.caption)
            if vm.isRefreshing {
                ProgressView()
                    .controlSize(.mini)
            }
        }
        .foregroundStyle(.orange)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 6)
        .background(.orange.opacity(0.1))
    }

    private func errorBanner(_ error: String) -> some View {
        HStack(spacing: 6) {
            Image(systemName: "exclamationmark.triangle")
                .font(.caption)
            Text(error)
                .font(.caption)
                .lineLimit(1)
        }
        .foregroundStyle(.red)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 4)
        .padding(.horizontal)
        .background(.red.opacity(0.08))
    }

    private func treeList(_ vm: TreeViewModel) -> some View {
        List {
            ForEach(vm.visibleNodes) { flat in
                treeNodeRow(flat: flat, vm: vm, favoriteNoteIds: favoriteNoteIds, onFavoriteChanged: loadFavoriteIds)
            }
            .onMove(perform: vm.handleMove)
        }
        .listStyle(.plain)
        .scrollContentBackground(.hidden)
        .refreshable { await refreshWithSync() }
        .background(treeBgColor ?? Color.clear)
    }

    private func treeNodeRow(flat: FlatTreeNode, vm: TreeViewModel, favoriteNoteIds: Set<String>, onFavoriteChanged: @escaping () -> Void) -> some View {
        let leading = CGFloat(flat.depth) * 20 + 16
        let isFav = favoriteNoteIds.contains(flat.node.note.noteId)
        return TreeNodeRow(
            node: flat.node,
            depth: flat.depth,
            viewModel: vm,
            customTextColor: treeTextColor,
            onSelect: { note in navigateToNote = note },
            onDrillDown: { noteId, title in
                drillDownTarget = SubTreeTarget(noteId: noteId, title: title)
            }
        )
        .contextMenu {
            Button {
                createSheetContext = CreateNoteSheetContext(parentNote: flat.node.note, viewModel: vm)
            } label: {
                Label("New Note", systemImage: "plus")
            }
            if flat.node.note.noteId != "root" {
                if !flat.node.note.isProtected {
                    Button {
                        Task {
                            let parentId = flat.node.branch.parentNoteId
                            if let newNote = await vm.duplicateNote(
                                sourceNoteId: flat.node.note.noteId,
                                parentNoteId: parentId
                            ) {
                                navigateToNote = newNote
                            }
                        }
                    } label: {
                        Label("Duplicate Note", systemImage: "doc.on.doc")
                    }
                }
                Button {
                    toggleFavorite(flat.node.note, isFav: isFav, onFavoriteChanged: onFavoriteChanged)
                } label: {
                    Label(isFav ? "Remove from Favorites" : "Add to Favorites", systemImage: isFav ? "star.slash" : "star")
                }
                Button(role: .destructive) {
                    noteToDelete = (flat.node.note, vm)
                } label: {
                    Label("Delete Note", systemImage: "trash")
                }
            }
        }
        .listRowInsets(EdgeInsets(top: 8, leading: leading, bottom: 8, trailing: 16))
        .listRowBackground(treeBgColor ?? Color(.systemBackground))
        .listRowSeparatorTint(Color(.separator))
    }
}

@MainActor
extension TreeViewModel {
    /// Handles List row reordering for top-level tree notes.
    /// Nested rows are ignored here to avoid flat-index/child-index mismatches.
    func handleMove(_ source: IndexSet, _ destination: Int) {
        guard let fromFlatIndex = source.first, fromFlatIndex < visibleNodes.count, let client else { return }
        guard visibleNodes[fromFlatIndex].depth == 0 else { return }

        let topLevelFlatIndices = visibleNodes.indices.filter { visibleNodes[$0].depth == 0 }
        guard let fromTopIndex = topLevelFlatIndices.firstIndex(of: fromFlatIndex) else { return }

        let firstTopFlat = topLevelFlatIndices.first ?? fromFlatIndex
        let lastTopFlat = topLevelFlatIndices.last ?? fromFlatIndex
        guard destination >= firstTopFlat && destination <= lastTopFlat + 1 else { return }

        var toTopIndex = topLevelFlatIndices.reduce(0) { count, idx in
            count + (idx < destination ? 1 : 0)
        }
        if destination > fromFlatIndex && toTopIndex > 0 { toTopIndex -= 1 }
        guard toTopIndex >= 0, toTopIndex < rootChildren.count, fromTopIndex != toTopIndex else { return }

        let oldChildren = rootChildren
        var newChildren = rootChildren
        let moved = newChildren.remove(at: fromTopIndex)
        newChildren.insert(moved, at: toTopIndex)
        rootChildren = newChildren

        let oldPositions = Dictionary(uniqueKeysWithValues: oldChildren.enumerated().map { ($1.branch.branchId, $0) })
        let updates = newChildren.enumerated().compactMap { (newIdx, node) -> (String, Int)? in
            guard let oldIdx = oldPositions[node.branch.branchId], oldIdx != newIdx else { return nil }
            return (node.branch.branchId, newIdx)
        }
        guard !updates.isEmpty else { return }

        let newOrder = newChildren.map(\.branch.branchId)
        Task {
            for (branchId, _) in updates {
                do {
                    try await client.placeBranchInSiblingOrder(branchId, orderedSiblingBranchIds: newOrder)
                } catch {
                    Log.api.error("Failed to update branch position: \(error)")
                    await MainActor.run { self.error = APIError.from(error).localizedDescription }
                    await refresh()
                    return
                }
            }
        }
    }
}

// MARK: - Tree Node Row

struct TreeNodeRow: View {
    static let maxInlineDepth = 2

    let node: TreeNode
    let depth: Int
    let viewModel: TreeViewModel
    var customTextColor: Color?
    let onSelect: (NoteItem) -> Void
    let onDrillDown: (String, String) -> Void

    private var isExpanded: Bool { node.children != nil }
    private var shouldDrillDown: Bool { depth >= Self.maxInlineDepth }
    private var textColor: Color { customTextColor ?? .primary }

    var body: some View {
        HStack(spacing: 0) {
            expandChevron

            noteLabel
        }
    }

    @ViewBuilder
    private var expandChevron: some View {
        if node.note.hasChildren {
            Button {
                if shouldDrillDown {
                    onDrillDown(node.note.noteId, node.title)
                } else {
                    Task { await viewModel.toggleExpand(node) }
                }
            } label: {
                Group {
                    if node.isLoading {
                        ProgressView()
                            .controlSize(.small)
                    } else if shouldDrillDown {
                        Image(systemName: "chevron.right")
                            .font(.caption2.weight(.semibold))
                            .foregroundStyle(.secondary)
                    } else {
                        Image(systemName: isExpanded ? "chevron.down" : "chevron.right")
                            .font(.caption2.weight(.semibold))
                            .foregroundStyle(.secondary)
                    }
                }
                .frame(width: 32, height: 32)
                .contentShape(Rectangle())
            }
            .buttonStyle(.borderless)
            .accessibilityLabel(shouldDrillDown ? "Open sub-notes" : (isExpanded ? "Collapse" : "Expand"))
        } else {
            Spacer()
                .frame(width: 32)
        }
    }

    private var displayTitle: String {
        guard node.note.isProtected else { return node.title }
        let t = node.title.trimmingCharacters(in: .whitespaces)
        let hasNonASCII = t.unicodeScalars.contains { !$0.isASCII && !CharacterSet.whitespaces.contains($0) }
        return (t.isEmpty || hasNonASCII) ? "Protected note" : t
    }

    private var noteLabel: some View {
        Button {
            onSelect(node.note)
        } label: {
            HStack(spacing: 8) {
                ZStack(alignment: .bottomTrailing) {
                    Image(systemName: node.note.resolvedIconName)
                        .foregroundStyle(.secondary)
                        .font(.callout)
                        .frame(width: 20)
                        .accessibilityHidden(true)

                    if node.note.isProtected {
                        Image(systemName: "lock.fill")
                            .font(.system(size: 8))
                            .foregroundStyle(.yellow)
                            .offset(x: 4, y: 2)
                    }
                }

                VStack(alignment: .leading, spacing: 1) {
                    Text(displayTitle)
                        .font(.body)
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                        .foregroundStyle(node.note.isProtected ? .secondary : textColor)
                }

                Spacer()

                if node.note.parentNoteIds.count > 1 {
                    Image(systemName: "arrow.triangle.branch")
                        .font(.caption2)
                        .foregroundStyle(.orange)
                        .accessibilityLabel("Cloned note")
                }

                Image(systemName: "chevron.right")
                    .font(.caption2)
                    .foregroundStyle(.quaternary)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.borderless)
        .accessibilityLabel("\(displayTitle), \(node.note.type.displayName) note")
    }
}

// MARK: - Create Child Note Sheet (from Tree)

private struct CreateChildNoteFromTreeSheet: View {
    let parentNote: NoteItem
    let viewModel: TreeViewModel
    let onDismiss: () -> Void
    var onNoteCreated: ((String, String) -> Void)?

    @Environment(\.dismiss) private var dismiss
    @State private var newNoteTitle = ""
    @State private var newNoteType: NoteType = .text
    @State private var isCreating = false

    var body: some View {
        NavigationStack {
            Form {
                TextField("Note Title", text: $newNoteTitle)
                    .textInputAutocapitalization(.sentences)

                Picker("Type", selection: $newNoteType) {
                    Text("Text").tag(NoteType.text)
                    Text("Code").tag(NoteType.code)
                }
            }
            .navigationTitle("New Note")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        onDismiss()
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Create") {
                        Task { await createAndDismiss() }
                    }
                    .disabled(newNoteTitle.trimmingCharacters(in: .whitespaces).isEmpty || isCreating)
                }
            }
        }
        .presentationDetents([.medium])
    }

    private func createAndDismiss() async {
        guard !newNoteTitle.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        isCreating = true
        defer { isCreating = false }

        let noteId = await viewModel.createChildNote(
            parentNoteId: parentNote.noteId,
            title: newNoteTitle,
            type: newNoteType
        )
        onDismiss()
        dismiss()
        if let noteId {
            onNoteCreated?(noteId, newNoteTitle)
        }
    }
}

#Preview {
    NavigationStack {
        TreeView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
