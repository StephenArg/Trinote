import SwiftUI
import UIKit

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

private struct TreeShareSheetPayload: Identifiable {
    let id = UUID()
    let url: URL
}

private struct MoveNoteSheetContext: Identifiable {
    let id = UUID()
    let sourceBranchId: String
    let sourceNoteId: String
    let sourceTitle: String
    let oldParentNoteId: String
}

private struct MoveNoteConfirmPayload {
    let sourceBranchId: String
    let sourceNoteId: String
    let sourceTitle: String
    let oldParentNoteId: String
    let targetParentNoteId: String
    let targetTitle: String
    let targetParentBranchId: String
}

struct TreeView: View {
    let parentNoteId: String
    let parentTitle: String
    /// When set, tapping a note row selects it: parent for duplicate/move, or any note in the note / open-tab pickers. `(parentNoteId, displayTitle, parentBranchId)`.
    var onPickParent: ((String, String, String) -> Void)?

    init(
        parentNoteId: String = "root",
        parentTitle: String = "Notes",
        onPickParent: ((String, String, String) -> Void)? = nil
    ) {
        self.parentNoteId = parentNoteId
        self.parentTitle = parentTitle
        self.onPickParent = onPickParent
    }

    @Environment(AppState.self) private var appState
    @Environment(\.colorScheme) private var colorScheme
    @State private var viewModel: TreeViewModel?
    @State private var navigateToNote: NoteItem?
    @State private var drillDownTarget: SubTreeTarget?
    @State private var createSheetContext: CreateNoteSheetContext?
    @State private var navigateToNoteForEdit: NoteEditTarget?
    @State private var noteToDelete: (note: NoteItem, vm: TreeViewModel)?
    @State private var favoriteNoteIds: Set<String> = []
    @State private var showSharedNotesManagement = false
    @State private var treeShareSheetPayload: TreeShareSheetPayload?
    @State private var treeSharingError: String?
    @State private var moveNoteSheetContext: MoveNoteSheetContext?
    @State private var moveNoteConfirmPayload: MoveNoteConfirmPayload?
    @State private var moveNoteError: String?
    @State private var tabsBarNav: NoteNavItem?
    @AppStorage("lastActiveOpenTabId") private var lastActiveOpenTabIdStorage: String = ""

    @AppStorage("showNoteTabsBar") private var showNoteTabsBar: Bool = false
    @AppStorage("useCustomTreeColors") private var useCustomTreeColors: Bool = false
    @AppStorage("useTriliumNoteColors") private var useTriliumNoteColors: Bool = true
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

    /// Trilium `#color` label wins when enabled and recognized; else custom tree text color (if on); else `.primary`.
    private func resolvedTreeTitleColor(for note: NoteItem) -> Color {
        if useTriliumNoteColors, let c = TriliumNoteColorMapper.swiftUIColor(for: note.colorLabelValue) {
            return c
        }
        return treeTextColor ?? .primary
    }

    /// Fills space behind the tree list (scroll content is hidden); must not be `.clear` or the nav host shows white.
    private var treeChromeBackground: Color {
        treeBgColor ?? Color(.systemGroupedBackground)
    }

    /// Keep refresh disabled during active refresh/sync, except allow retry after failures (sync or session).
    private var canTriggerRefresh: Bool {
        let sync = appState.syncManager
        if sync.syncError != nil { return true }
        if appState.connectionError != nil { return true }
        if sync.isSyncing { return false }
        return !(viewModel?.isRefreshing ?? false)
    }

    var body: some View {
        treeViewWithSharedSheetsAndAlerts
            .sheet(item: $moveNoteSheetContext, content: moveNoteParentPickerSheet)
            .alert(
                String(localized: "Move Note", comment: "Move confirmation title"),
                isPresented: moveNoteConfirmBinding,
                actions: moveNoteConfirmActions,
                message: moveNoteConfirmMessage
            )
            .alert(
                "Error",
                isPresented: moveNoteErrorBinding,
                actions: moveNoteErrorActions,
                message: moveNoteErrorMessage
            )
    }

    /// Split from `body` so Swift can type-check the tree without timing out on one huge expression.
    private var treeViewWithSharedSheetsAndAlerts: some View {
        treeViewChromeAndDestinations
            .alert(String(localized: "Delete Note", comment: "Tree delete alert title"), isPresented: noteToDeleteBinding, actions: deleteNoteActions, message: deleteNoteMessage)
            .onChange(of: appState.activeProfile?.id) { _, _ in loadFavoriteIds() }
            .onReceive(NotificationCenter.default.publisher(for: .noteDeleted)) { _ in
                triggerSyncAndReload()
            }
            .onReceive(NotificationCenter.default.publisher(for: .trinoteTreeShouldRefresh), perform: handleTreeShouldRefresh)
            .onReceive(NotificationCenter.default.publisher(for: .ghostNoteDetected)) { _ in
                self.viewModel?.reloadFromCache()
            }
            .sheet(item: $createSheetContext, content: createChildNoteSheet)
            .sheet(isPresented: $showSharedNotesManagement) {
                SharedNotesManagementView()
                    .environment(appState)
            }
            .sheet(item: $treeShareSheetPayload, content: treeShareSheet)
            .alert(
                "Error",
                isPresented: treeSharingErrorBinding,
                actions: treeSharingErrorActions,
                message: treeSharingErrorMessage
            )
    }

    private var treeViewChromeAndDestinations: some View {
        Group {
            if let viewModel {
                treeContent(viewModel)
                    .onChange(of: appState.protectedSessionActive) { _, _ in
                        Task { await viewModel.refresh() }
                    }
            } else {
                ProgressView("Loading…")
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(treeChromeBackground)
            }
        }
        .background(treeChromeBackground)
        .navigationTitle(parentNoteId == "root" ? "" : parentTitle)
        .toolbarTitleDisplayMode(parentNoteId == "root" ? .inline : .automatic)
        .toolbar { treeToolbarContent }
        .task {
            if viewModel == nil {
                let vm = TreeViewModel(appState: appState, parentNoteId: parentNoteId)
                viewModel = vm
                await vm.loadTree()
            }
            loadFavoriteIds()
            autoRestoreOpenTabOnLaunchIfNeeded()
        }
        .onChange(of: appState.activeProfile?.id) { _, _ in
            autoRestoreOpenTabOnLaunchIfNeeded()
        }
        .navigationDestination(item: $navigateToNote, destination: noteDetailDestination)
        .navigationDestination(item: $navigateToNoteForEdit, destination: noteEditDestination)
        .navigationDestination(item: $drillDownTarget, destination: subtreeDestination)
        .navigationDestination(item: $tabsBarNav) { item in
            NoteDetailView(noteId: item.noteId, title: item.title, openTabId: item.openTabId)
        }
        .safeAreaInset(edge: .bottom, spacing: 0) {
            if showNoteTabsBar {
                NoteTabsBar(
                    currentOpenTabId: lastActiveOpenTabIdStorage.isEmpty ? nil : lastActiveOpenTabIdStorage,
                    onSelect: { tab in
                        lastActiveOpenTabIdStorage = tab.id
                        tabsBarNav = NoteNavItem(
                            noteId: tab.noteId, title: tab.title, openTabId: tab.id
                        )
                    },
                    onOpenTabRemoved: { _ in },
                    onTabsBecameEmpty: {
                        lastActiveOpenTabIdStorage = ""
                    }
                )
            }
        }
    }

    @ToolbarContentBuilder
    private var treeToolbarContent: some ToolbarContent {
        if parentNoteId == "root", viewModel != nil {
            ToolbarItemGroup(placement: .topBarTrailing) {
                Button {
                    triggerSyncAndReload()
                } label: {
                    SyncToolbarIcon(isSyncing: appState.syncManager.isSyncing)
                }
                .disabled(!canTriggerRefresh)
                .accessibilityLabel(
                    appState.syncManager.isSyncing
                        ? String(localized: "Syncing…", comment: "Accessibility: tree sync in progress")
                        : String(localized: "Refresh tree", comment: "Toolbar sync tree")
                )

                Menu {
                    Button {
                        showSharedNotesManagement = true
                    } label: {
                        Label(String(localized: "Shared notes…", comment: "Open shared notes manager"), systemImage: "scale.3d")
                    }
                    Button {
                        showNoteTabsBar.toggle()
                    } label: {
                        if showNoteTabsBar {
                            Label(
                                String(localized: "Hide tab bar", comment: "Root tree menu: hide open-note tab strip"),
                                systemImage: "rectangle.split.1x2"
                            )
                        } else {
                            Label(
                                String(localized: "Show tab bar", comment: "Root tree menu: show open-note tab strip"),
                                systemImage: "rectangle.split.1x2"
                            )
                        }
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                }
                .accessibilityLabel(String(localized: "More", comment: "Root tree overflow menu"))
            }
        } else {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    triggerSyncAndReload()
                } label: {
                    SyncToolbarIcon(isSyncing: appState.syncManager.isSyncing)
                }
                .disabled(!canTriggerRefresh)
                .accessibilityLabel(
                    appState.syncManager.isSyncing
                        ? String(localized: "Syncing…", comment: "Accessibility: tree sync in progress")
                        : String(localized: "Refresh tree", comment: "Toolbar sync subtree")
                )
            }
        }
    }

    private var noteToDeleteBinding: Binding<Bool> {
        Binding(
            get: { noteToDelete != nil },
            set: { if !$0 { noteToDelete = nil } }
        )
    }

    @ViewBuilder
    private func deleteNoteActions() -> some View {
        Button(String(localized: "Delete Note and Subnotes", comment: "Tree delete confirm"), role: .destructive) {
            guard let (note, treeVm) = noteToDelete else { return }
            Task {
                _ = await treeVm.deleteNoteAndSubnotes(noteId: note.noteId)
            }
            noteToDelete = nil
        }
        Button(String(localized: "Cancel", comment: "Tree delete alert"), role: .cancel) {
            noteToDelete = nil
        }
    }

    @ViewBuilder
    private func deleteNoteMessage() -> some View {
        if let (note, _) = noteToDelete {
            Text(
                String(
                    localized: "“\(note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive))” and all its subnotes will be permanently deleted. This cannot be undone.",
                    comment: "Tree delete message"
                )
            )
        }
    }

    private func handleTreeShouldRefresh(_ notification: Notification) {
        let nid = notification.userInfo?["noteId"] as? String
        guard let nid else {
            self.viewModel?.pruneDeletedNodes()
            self.viewModel?.reloadFromCache()
            return
        }
        Task {
            guard let client = appState.client, let vm = viewModel else {
                self.viewModel?.reloadFromCache()
                return
            }
            do {
                let response = try await client.getNote(nid)
                let item = NoteItem(from: response)
                vm.applyNoteMetadataPatch(noteId: nid, newNote: item, animateList: false)
            } catch {
                vm.reloadFromCache()
            }
        }
    }

    private func noteDetailDestination(_ note: NoteItem) -> some View {
        NoteDetailView(
            noteId: note.noteId,
            title: note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive),
            seedChildSummaries: viewModel?.childNoteSummariesForDetailNavigation(parentNoteId: note.noteId)
        )
    }

    private func noteEditDestination(_ target: NoteEditTarget) -> some View {
        NoteDetailView(noteId: target.noteId, title: target.title, startInEditMode: true)
    }

    private func subtreeDestination(_ target: SubTreeTarget) -> some View {
        TreeView(parentNoteId: target.noteId, parentTitle: target.title, onPickParent: onPickParent)
    }

    private func createChildNoteSheet(_ ctx: CreateNoteSheetContext) -> some View {
        CreateChildNoteFromTreeSheet(
            parentNote: ctx.parentNote,
            viewModel: ctx.viewModel,
            onDismiss: { createSheetContext = nil },
            onNoteCreated: { noteId, title in
                navigateToNoteForEdit = NoteEditTarget(noteId: noteId, title: title)
            }
        )
    }

    private func treeShareSheet(_ payload: TreeShareSheetPayload) -> some View {
        ShareSheet(items: [payload.url])
            .presentationDetents([.large])
            .presentationDragIndicator(.visible)
    }

    private var treeSharingErrorBinding: Binding<Bool> {
        Binding(
            get: { treeSharingError != nil },
            set: { if !$0 { treeSharingError = nil } }
        )
    }

    @ViewBuilder
    private func treeSharingErrorActions() -> some View {
        Button(String(localized: "OK", comment: "Dismiss error"), role: .cancel) { treeSharingError = nil }
    }

    private func treeSharingErrorMessage() -> Text {
        Text(treeSharingError ?? String(localized: "An unknown error occurred.", comment: "Generic error"))
    }

    private func moveNoteParentPickerSheet(_ ctx: MoveNoteSheetContext) -> some View {
        ParentPickerSheet(
            navigationTitle: String(localized: "Move to…", comment: "Sheet title: pick parent for move"),
            instruction: String(
                localized: "Choose where to move the note. Open folders, then tap a note to select it as the new parent.",
                comment: "Instructions for move-note parent picker"
            ),
            topLevelButtonTitle: String(localized: "Top level (under Notes)", comment: "Move note under root"),
            onPick: { parentNoteId, title, parentBranchId in
                if parentNoteId == ctx.sourceNoteId {
                    moveNoteError = String(localized: "A note cannot be moved under itself.", comment: "Move validation")
                    moveNoteSheetContext = nil
                    return
                }
                moveNoteConfirmPayload = MoveNoteConfirmPayload(
                    sourceBranchId: ctx.sourceBranchId,
                    sourceNoteId: ctx.sourceNoteId,
                    sourceTitle: ctx.sourceTitle,
                    oldParentNoteId: ctx.oldParentNoteId,
                    targetParentNoteId: parentNoteId,
                    targetTitle: title,
                    targetParentBranchId: parentBranchId
                )
                moveNoteSheetContext = nil
            }
        )
        .environment(appState)
    }

    private var moveNoteConfirmBinding: Binding<Bool> {
        Binding(
            get: { moveNoteConfirmPayload != nil },
            set: { if !$0 { moveNoteConfirmPayload = nil } }
        )
    }

    @ViewBuilder
    private func moveNoteConfirmActions() -> some View {
        Button(String(localized: "Cancel", comment: "Cancel move"), role: .cancel) {
            moveNoteConfirmPayload = nil
        }
        Button(String(localized: "Move", comment: "Confirm move note")) {
            // Capture before the alert dismisses — `isPresented` can clear `moveNoteConfirmPayload` before the Task runs.
            guard let p = moveNoteConfirmPayload else { return }
            moveNoteConfirmPayload = nil
            Task { await performConfirmedTreeMove(payload: p) }
        }
    }

    @ViewBuilder
    private func moveNoteConfirmMessage() -> some View {
        if let p = moveNoteConfirmPayload {
            Text(
                String(
                    localized: "Move “\(p.sourceTitle)” under “\(p.targetTitle)”? The note will appear in the new location in the tree.",
                    comment: "Move confirmation: source and destination titles"
                )
            )
        }
    }

    private var moveNoteErrorBinding: Binding<Bool> {
        Binding(
            get: { moveNoteError != nil },
            set: { if !$0 { moveNoteError = nil } }
        )
    }

    @ViewBuilder
    private func moveNoteErrorActions() -> some View {
        Button(String(localized: "OK", comment: "Dismiss error"), role: .cancel) { moveNoteError = nil }
    }

    private func moveNoteErrorMessage() -> Text {
        Text(moveNoteError ?? "")
    }

    private func performConfirmedTreeMove(payload p: MoveNoteConfirmPayload) async {
        let persistence = PersistenceManager.shared
        if let profileId = appState.activeProfile?.id, !appState.isOnline {
            do {
                try persistence.applyOptimisticBranchMove(
                    sourceBranchId: p.sourceBranchId,
                    sourceNoteId: p.sourceNoteId,
                    targetParentNoteId: p.targetParentNoteId,
                    serverProfileId: profileId
                )
                try persistence.enqueuePendingBranchMove(
                    sourceBranchId: p.sourceBranchId,
                    targetParentBranchId: p.targetParentBranchId,
                    sourceNoteId: p.sourceNoteId,
                    oldParentNoteId: p.oldParentNoteId,
                    targetParentNoteId: p.targetParentNoteId,
                    serverProfileId: profileId
                )
                NotificationCenter.default.post(
                    name: .trinoteTreeShouldRefresh,
                    object: nil,
                    userInfo: ["noteId": p.sourceNoteId]
                )
                viewModel?.reloadFromCache()
            } catch {
                moveNoteError = APIError.from(error).localizedDescription
            }
            return
        }

        guard let client = appState.client else { return }
        do {
            try await client.moveBranchToParent(branchId: p.sourceBranchId, parentBranchId: p.targetParentBranchId)
            NotificationCenter.default.post(
                name: .trinoteTreeShouldRefresh,
                object: nil,
                userInfo: ["noteId": p.sourceNoteId]
            )
            await viewModel?.refresh()
        } catch {
            moveNoteError = APIError.from(error).localizedDescription
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
        Task { await refreshWithSync() }
    }

    /// Process-wide flag so we only auto-open a tab on the first qualifying root-tree appearance per app launch.
    /// Re-arms when the profile changes (multi-account switch) so the new profile gets its own one-shot restore.
    private static var autoRestoreOpenTabHandledForProfileId: String?

    /// On app launch, when the open-tab bar is enabled and the current profile has at least one tab,
    /// push the last active tab (or fall back to the most recently added — same precedence as
    /// `eagerRetargetActiveOpenTabFromCache` / `reconcileOpenTabsAfterLoad`).
    private func autoRestoreOpenTabOnLaunchIfNeeded() {
        guard parentNoteId == "root" else { return }
        guard showNoteTabsBar else { return }
        guard let profileId = appState.activeProfile?.id else { return }
        if Self.autoRestoreOpenTabHandledForProfileId == profileId { return }

        let pm = PersistenceManager.shared
        guard pm.openNoteTabCount(serverProfileId: profileId) > 0 else {
            // No tabs to restore — still mark as handled so we don't keep retrying this launch.
            Self.autoRestoreOpenTabHandledForProfileId = profileId
            return
        }

        var resolved: OpenNoteTab?
        if !lastActiveOpenTabIdStorage.isEmpty,
           let row = try? pm.fetchOpenNoteTab(id: lastActiveOpenTabIdStorage, serverProfileId: profileId) {
            resolved = row
        } else if let mostRecentId = try? pm.mostRecentlyAddedOpenNoteTabId(serverProfileId: profileId),
                  let row = try? pm.fetchOpenNoteTab(id: mostRecentId, serverProfileId: profileId) {
            resolved = row
        }
        guard let tab = resolved else {
            Self.autoRestoreOpenTabHandledForProfileId = profileId
            return
        }

        Self.autoRestoreOpenTabHandledForProfileId = profileId
        lastActiveOpenTabIdStorage = tab.id
        // Only push if we're not already showing a destination from this stack.
        if navigateToNote == nil, navigateToNoteForEdit == nil, drillDownTarget == nil, tabsBarNav == nil {
            tabsBarNav = NoteNavItem(noteId: tab.noteId, title: tab.title, openTabId: tab.id)
        }
    }

    private func refreshWithSync() async {
        await self.appState.refreshSessionThenIncrementalSync(maxWaitSeconds: 120, downloadChangedBodies: false)
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
        VStack(spacing: 16) {
            LaunchAppMark(size: 56)
            ProgressView()
            Text("Loading note tree…")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(treeChromeBackground)
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
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(treeChromeBackground)
    }

    @ViewBuilder
    private func treeListView(_ vm: TreeViewModel) -> some View {
        treeList(vm)
            .background(treeChromeBackground)
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
    }

    private func fullSyncBanner(_ sync: SyncManager) -> some View {
        VStack(spacing: 6) {
            HStack(spacing: 8) {
                ProgressView()
                    .controlSize(.small)
                VStack(alignment: .leading, spacing: 2) {
                    Text(fullSyncPhaseLabel(sync))
                        .font(.subheadline.weight(.medium))
                    Text("Please keep the app open while syncing")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                if sync.totalNoteCount > 0 {
                    Text("\(sync.syncedNoteCount)/\(sync.totalNoteCount)")
                        .font(.caption.monospacedDigit())
                        .foregroundStyle(.secondary)
                }
            }
            if sync.totalNoteCount > 0 {
                ProgressView(value: sync.syncProgress)
                    .tint(.accentColor)
            }
        }
        .padding(.horizontal)
        .padding(.vertical, 10)
    }

    private func fullSyncPhaseLabel(_ sync: SyncManager) -> String {
        switch sync.phase {
        case .walkingTree:       String(localized: "Building note tree…", comment: "Full sync phase")
        case .downloadingContent: String(localized: "Downloading notes…", comment: "Full sync phase")
        case .cleaningUp:        String(localized: "Finishing up…", comment: "Full sync phase")
        default:                 String(localized: "Syncing…", comment: "Full sync phase")
        }
    }

    private func rootNotebookHeaderRow(viewModel vm: TreeViewModel) -> some View {
        HStack(alignment: .firstTextBaseline, spacing: 12) {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(String(localized: "Notes", comment: "Root notebook screen title"))
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundStyle(.primary)
                    .accessibilityAddTraits(.isHeader)
                if !appState.isOnline, vm.isFromCache {
                    Image(systemName: "icloud.slash")
                        .font(.headline)
                        .accessibilityLabel(String(localized: "Showing cached data", comment: "Offline cached data indicator"))
                }
            }
            Spacer(minLength: 0)
            Button {
                createSheetContext = CreateNoteSheetContext(parentNote: syntheticRootNoteItem(), viewModel: vm)
            } label: {
                Image(systemName: "plus")
                    .font(.title2.weight(.semibold))
                    .foregroundStyle(Color.accentColor)
            }
            .buttonStyle(.borderless)
            .accessibilityLabel(String(localized: "New top-level note", comment: "Toolbar add note"))
        }
    }

    /// Placeholder for the Trilium `root` note when presenting “new child” flows from the root tree.
    private func syntheticRootNoteItem() -> NoteItem {
        NoteItem(
            noteId: "root",
            title: String(localized: "Notes", comment: "Root notebook screen title"),
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
    }

    private func treeList(_ vm: TreeViewModel) -> some View {
        let sync = appState.syncManager
        return List {
            if let error = vm.error, !vm.rootChildren.isEmpty {
                errorBanner(error)
                    .listRowInsets(EdgeInsets())
                    .listRowSeparator(.hidden)
                    .listRowBackground(Color.red.opacity(0.08))
            }
            if sync.isSyncing, !sync.hasCompletedFullSync {
                fullSyncBanner(sync)
                    .listRowInsets(EdgeInsets())
                    .listRowSeparator(.hidden)
                    .listRowBackground(Color.accentColor.opacity(0.08))
            }
            if parentNoteId == "root" {
                rootNotebookHeaderRow(viewModel: vm)
                    .listRowInsets(EdgeInsets(top: 8, leading: 20, bottom: 8, trailing: 20))
                    .listRowSeparator(.hidden)
                    .listRowBackground(treeBgColor ?? Color(.systemGroupedBackground))
            }
            ForEach(vm.visibleNodes) { flat in
                treeNodeRow(flat: flat, vm: vm, favoriteNoteIds: favoriteNoteIds, onFavoriteChanged: loadFavoriteIds)
            }
            .if(onPickParent == nil) { view in
                view.onMove(perform: vm.handleMove)
            }
        }
        .listStyle(.plain)
        .scrollContentBackground(.hidden)
        .refreshable { await refreshWithSync() }
        .background(treeChromeBackground)
    }

    /// Defers past UIKit context-menu dismissal and cold-launch window timing (`TrinoteDeferredSystemShareSheet`).
    private func scheduleTreeShareSheet(url: URL) {
        TrinoteDeferredSystemShareSheet.schedulePresentation {
            var t = Transaction()
            t.disablesAnimations = true
            withTransaction(t) {
                treeShareSheetPayload = TreeShareSheetPayload(url: url)
            }
        }
    }

    private func buildTreeNodeRow(node: TreeNode, depth: Int, vm: TreeViewModel) -> TreeNodeRow {
        TreeNodeRow(
            node: node,
            depth: depth,
            viewModel: vm,
            resolvedTitleColor: resolvedTreeTitleColor(for: node.note),
            onSelect: { note, parentBranchId in
                if let pick = onPickParent {
                    pick(note.noteId, note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive), parentBranchId)
                } else {
                    navigateToNote = note
                }
            },
            onDrillDown: { noteId, title in
                drillDownTarget = SubTreeTarget(noteId: noteId, title: title)
            }
        )
    }

    private func treeRowContextMenuModel(
        flat: FlatTreeNode,
        vm: TreeViewModel,
        isFav: Bool,
        onFavoriteChanged: @escaping () -> Void
    ) -> TreeListRowContextMenuModel {
        TreeListRowContextMenuModel(
            note: flat.node.note,
            vm: vm,
            isFavorite: isFav,
            duplicateParentNoteId: flat.node.branch.parentNoteId,
            isRootRow: flat.node.note.noteId == "root",
            client: appState.client,
            onNewNote: {
                createSheetContext = CreateNoteSheetContext(parentNote: flat.node.note, viewModel: vm)
            },
            onDuplicateSuccess: { navigateToNote = $0 },
            onFavoriteToggle: {
                toggleFavorite(flat.node.note, isFav: isFav, onFavoriteChanged: onFavoriteChanged)
            },
            onDelete: {
                noteToDelete = (flat.node.note, vm)
            },
            onPresentShareSheet: { scheduleTreeShareSheet(url: $0) },
            onSharingError: { treeSharingError = $0 },
            onMove: {
                moveNoteSheetContext = MoveNoteSheetContext(
                    sourceBranchId: flat.node.branch.branchId,
                    sourceNoteId: flat.node.note.noteId,
                    sourceTitle: flat.node.displayTitle(protectedSessionActive: appState.protectedSessionActive),
                    oldParentNoteId: flat.node.branch.parentNoteId
                )
            }
        )
    }

    private func treeNodeRow(flat: FlatTreeNode, vm: TreeViewModel, favoriteNoteIds: Set<String>, onFavoriteChanged: @escaping () -> Void) -> some View {
        let leading = CGFloat(flat.depth) * 20 + 16
        let isFav = favoriteNoteIds.contains(flat.node.note.noteId)
        let row = buildTreeNodeRow(node: flat.node, depth: flat.depth, vm: vm)

        return Group {
            if onPickParent == nil {
                TreeListRowUIKitContextMenu(
                    model: treeRowContextMenuModel(flat: flat, vm: vm, isFav: isFav, onFavoriteChanged: onFavoriteChanged)
                ) {
                    row
                }
            } else {
                row
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
    /// Reserves space so share/clone badges do not change row intrinsic size when they appear (avoids `List` self-sizing jumps).
    private static let badgeTrayWidth: CGFloat = 40
    private static let badgeTrayHeight: CGFloat = 18

    @Environment(AppState.self) private var appState

    let node: TreeNode
    let depth: Int
    let viewModel: TreeViewModel
    var resolvedTitleColor: Color
    let onSelect: (NoteItem, String) -> Void
    let onDrillDown: (String, String) -> Void

    private var isExpanded: Bool { node.children != nil }
    private var shouldDrillDown: Bool { depth >= Self.maxInlineDepth }
    private var titleForegroundColor: Color {
        if node.note.isProtected, !appState.protectedSessionActive { return .secondary }
        return resolvedTitleColor
    }

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
                    onDrillDown(node.note.noteId, node.displayTitle(protectedSessionActive: appState.protectedSessionActive))
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
        node.displayTitle(protectedSessionActive: appState.protectedSessionActive)
    }

    private var noteLabel: some View {
        Button {
            onSelect(node.note, node.branch.branchId)
        } label: {
            HStack(spacing: 8) {
                ZStack(alignment: .bottomTrailing) {
                    Image(systemName: node.note.resolvedIconName)
                        .foregroundStyle(titleForegroundColor)
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
                        .foregroundStyle(titleForegroundColor)
                }

                Spacer()

                Group {
                    if node.note.isSharedWithMultipleTreePlacements {
                        HStack(spacing: 4) {
                            Image(systemName: "scale.3d")
                                .font(.caption2)
                                .foregroundStyle(Color.green)
                                .accessibilityLabel(String(localized: "Shared note", comment: "Tree row: note has public share link"))
                            Image(systemName: "arrow.triangle.branch")
                                .font(.caption2)
                                .foregroundStyle(.orange)
                                .accessibilityLabel(String(localized: "Cloned note", comment: "Tree row: note has multiple parents"))
                        }
                        .accessibilityElement(children: .combine)
                    } else {
                        HStack(spacing: 4) {
                            if node.note.showsSharingBadge {
                                Image(systemName: "scale.3d")
                                    .font(.caption2)
                                    .foregroundStyle(Color.green)
                                    .accessibilityLabel(String(localized: "Shared note", comment: "Tree row: note has public share link"))
                            } else if node.note.showsMultiCloneBadge {
                                Image(systemName: "arrow.triangle.branch")
                                    .font(.caption2)
                                    .foregroundStyle(.orange)
                                    .accessibilityLabel(String(localized: "Cloned note", comment: "Tree row: note has multiple parents"))
                            }
                        }
                    }
                }
                .frame(width: Self.badgeTrayWidth, height: Self.badgeTrayHeight, alignment: .center)

                Image(systemName: "chevron.right")
                    .font(.caption2)
                    .foregroundStyle(.quaternary)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.borderless)
        .accessibilityLabel("\(displayTitle), \(node.note.uiNoteTypeDisplayName) note")
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
                TextField(String(localized: "Note Title", comment: "New note from tree"), text: $newNoteTitle)
                    .textInputAutocapitalization(.sentences)

                Picker(String(localized: "Type", comment: "New note type"), selection: $newNoteType) {
                    Text(String(localized: "Text", comment: "Note type")).tag(NoteType.text)
                    Text(String(localized: "Code", comment: "Note type")).tag(NoteType.code)
                    Text(String(localized: "Canvas", comment: "Note type")).tag(NoteType.canvas)
                    Text(String(localized: "Mermaid", comment: "Note type")).tag(NoteType.mermaid)
                    Text(String(localized: "Mind Map", comment: "Note type")).tag(NoteType.mindMap)
                    Text(String(localized: "Geo Map", comment: "Note type")).tag(NoteType.geoMap)
                    Text(String(localized: "Calendar", comment: "Note type: Trilium journal / calendar root")).tag(NoteType.calendar)
                }
            }
            .navigationTitle(String(localized: "New Note", comment: "New child sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "New note sheet")) {
                        onDismiss()
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Create", comment: "New note sheet")) {
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

/// Spinning sync arrow in the nav bar while `SyncManager` is syncing (replaces the former blue list banner).
private struct SyncToolbarIcon: View {
    let isSyncing: Bool

    var body: some View {
        if isSyncing {
            TimelineView(.animation(minimumInterval: 1 / 45.0, paused: false)) { context in
                Image(systemName: "arrow.trianglehead.2.clockwise")
                    .rotationEffect(.degrees(context.date.timeIntervalSinceReferenceDate * 320))
            }
        } else {
            Image(systemName: "arrow.trianglehead.2.clockwise")
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
