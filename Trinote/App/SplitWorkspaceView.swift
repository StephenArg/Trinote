import SwiftUI

/// iPad layout modelled on Trilium desktop: launcher rail, a sidebar with the note tree (or favorites,
/// search, recents), and the open note beside it. Used only while the window is regular width;
/// narrow windows (Slide Over, ⅓ Split View) use `MainTabView`.
///
/// Built from sibling `NavigationStack`s rather than `NavigationSplitView` so each sidebar section keeps
/// its own stack (tree drill-downs stay in the sidebar) and the Notes tree stays mounted while another
/// section is showing: it hosts local-transfer alerts, share-import opening and open-tab restore.
struct SplitWorkspaceView: View {
    @Environment(AppState.self) private var appState
    @Bindable var workspace: NoteWorkspace

    @AppStorage("splitSidebarVisible") private var isSidebarVisible = true
    @AppStorage("splitSidebarWidth") private var sidebarWidth: Double = 340
    /// Width when a divider drag began.
    @State private var dragStartWidth: Double?
    /// Sidebar sections shown at least once, kept mounted afterwards (see `sidebar`).
    @State private var mountedSections: Set<LauncherSection> = [.notes]
    @AppStorage("showNoteTabsBarPad") private var showNoteTabsBar = true
    /// Mirrors `LastActiveOpenTabStore` for the active profile so the tab strip marks the active tab.
    @State private var activeOpenTabId = ""
    /// ⌘J "Jump to Note" search sheet.
    @State private var showJumpToNote = false

    private static let sidebarWidthRange: ClosedRange<Double> = 260...520
    /// The note pane keeps at least this share of the space right of the rail.
    private static let maxSidebarFraction: Double = 0.5

    /// Recreates the stacks when the active instance or `tabNavigationResetGeneration` changes so pushed
    /// `NoteDetailView`s cannot survive with the wrong `serverProfileId` (same as `MainTabView`).
    private var navigationStackInstanceId: String {
        let pid = appState.activeProfile?.id ?? "__trinote_no_profile__"
        return "\(pid)-\(appState.tabNavigationResetGeneration)"
    }

    var body: some View {
        GeometryReader { geo in
            let available = max(0, geo.size.width - LauncherRail.width)
            let width = effectiveSidebarWidth(available: available)
            HStack(spacing: 0) {
                LauncherRail(
                    selection: workspace.section,
                    isSidebarVisible: isSidebarVisible,
                    onSelect: selectSection,
                    onToggleSidebar: toggleSidebar,
                    onSettings: { workspace.showSettings = true }
                )
                Divider().ignoresSafeArea()
                if isSidebarVisible {
                    sidebar
                        .frame(width: width)
                        .transition(.move(edge: .leading).combined(with: .opacity))
                    sidebarDivider(available: available)
                }
                notePane
                    .frame(maxWidth: .infinity)
            }
        }
        .environment(\.noteWorkspace, workspace)
        .focusedSceneValue(\.noteWorkspace, workspace)
        .modifier(MainShellModifiers(onShareImportActivated: { selectSection(.notes, forceShow: true) }))
        .onChange(of: workspace.commandRequest) { _, request in
            if let request { handle(request.command) }
        }
        .sheet(isPresented: $showJumpToNote) {
            NotePickerSheet(
                excludeNoteId: nil,
                navigationTitleOverride: String(localized: "Jump to Note", comment: "iPad ⌘J note search sheet title")
            ) { noteId, title in
                workspace.open(NoteRoute(noteId: noteId, title: title))
            }
            .environment(appState)
        }
        .sheet(isPresented: $workspace.showSettings) {
            NavigationStack {
                SettingsView()
                    .toolbar {
                        ToolbarItem(placement: .confirmationAction) {
                            Button(String(localized: "Done", comment: "Close the Settings sheet on iPad")) {
                                workspace.showSettings = false
                            }
                        }
                    }
            }
            .environment(appState)
            .environment(\.noteWorkspace, workspace)
            .presentationSizing(.page)
        }
        .onReceive(NotificationCenter.default.publisher(for: .trinoteWillSwitchServerProfile)) { _ in
            workspace.close()
        }
        .onAppear { workspace.restoreVisibleNote() }
    }

    // MARK: - Sidebar

    /// The Notes tree and Search keep their state while another section shows; Favorites and Recents are
    /// rebuilt each time they show so their lists reload (as when their tab reappears on iPhone).
    private var sidebar: some View {
        ZStack {
            sidebarStack(for: .notes) { TreeView() }
            sidebarStack(for: .search) { SearchView() }
            if workspace.section == .favorites {
                NavigationStack {
                    FavoritesView(onNoteDeleted: {
                        Task { await appState.refreshSessionThenIncrementalSync(maxWaitSeconds: 120, downloadChangedBodies: false) }
                    })
                }
                .id("\(navigationStackInstanceId)-favorites")
            }
            if workspace.section == .recents {
                NavigationStack { RecentsView() }
                    .id("\(navigationStackInstanceId)-recents")
            }
        }
    }

    @ViewBuilder
    private func sidebarStack<Content: View>(
        for section: LauncherSection,
        @ViewBuilder content: () -> Content
    ) -> some View {
        if mountedSections.contains(section) || workspace.section == section {
            let isShown = workspace.section == section
            NavigationStack { content() }
                .id("\(navigationStackInstanceId)-\(section.rawValue)")
                .opacity(isShown ? 1 : 0)
                .allowsHitTesting(isShown)
                .accessibilityHidden(!isShown)
                .onAppear { mountedSections.insert(section) }
        }
    }

    /// Drag to resize, like Trilium's pane splitter.
    private func sidebarDivider(available: Double) -> some View {
        Divider()
            .ignoresSafeArea()
            .overlay {
                Color.clear
                    .frame(width: 12)
                    .contentShape(Rectangle())
                    .hoverEffect(.highlight)
                    .gesture(
                        DragGesture(minimumDistance: 1, coordinateSpace: .global)
                            .onChanged { value in
                                let start = dragStartWidth ?? effectiveSidebarWidth(available: available)
                                if dragStartWidth == nil { dragStartWidth = start }
                                sidebarWidth = clampedSidebarWidth(start + value.translation.width, available: available)
                            }
                            .onEnded { _ in dragStartWidth = nil }
                    )
                    .accessibilityHidden(true)
            }
    }

    private func effectiveSidebarWidth(available: Double) -> Double {
        clampedSidebarWidth(sidebarWidth, available: available)
    }

    private func clampedSidebarWidth(_ width: Double, available: Double) -> Double {
        let upper = max(Self.sidebarWidthRange.lowerBound, min(Self.sidebarWidthRange.upperBound, available * Self.maxSidebarFraction))
        return min(max(width, Self.sidebarWidthRange.lowerBound), upper)
    }

    private func selectSection(_ section: LauncherSection) {
        selectSection(section, forceShow: false)
    }

    /// Tapping the section already showing hides the sidebar (and shows it again), like Trilium's launcher.
    private func selectSection(_ section: LauncherSection, forceShow: Bool) {
        withAnimation(.easeInOut(duration: 0.2)) {
            if section == workspace.section, isSidebarVisible, !forceShow {
                isSidebarVisible = false
            } else {
                workspace.section = section
                isSidebarVisible = true
            }
        }
    }

    private func toggleSidebar() {
        withAnimation(.easeInOut(duration: 0.2)) { isSidebarVisible.toggle() }
    }

    // MARK: - Keyboard commands

    /// Layout-level commands; note-level ones are handled by the note on screen (or the tree).
    private func handle(_ command: WorkspaceCommand) {
        switch command {
        case .showSection(let section):
            selectSection(section, forceShow: true)
        case .focusSearch:
            // SearchView focuses its field on the same command.
            selectSection(.search, forceShow: true)
        case .toggleSidebar:
            toggleSidebar()
        case .jumpToNote:
            showJumpToNote = true
        case .nextTab:
            selectAdjacentTab(offset: 1)
        case .previousTab:
            selectAdjacentTab(offset: -1)
        case .closeTab:
            closeActiveTab()
        case .newNote, .editNote, .saveNote, .findInNote, .back, .saveBeforeLeaving:
            break
        }
    }

    private var openTabs: [OpenNoteTab] {
        guard let profileId = appState.activeProfile?.id else { return [] }
        return (try? PersistenceManager.shared.fetchOpenNoteTabs(serverProfileId: profileId)) ?? []
    }

    /// ⌃Tab / ⌃⇧Tab, wrapping around like Trilium. Not while editing: the strip is hidden then.
    private func selectAdjacentTab(offset: Int) {
        guard showNoteTabsBar, !workspace.isEditingNote else { return }
        let tabs = openTabs
        guard !tabs.isEmpty else { return }
        let current = tabs.firstIndex(where: { $0.id == activeOpenTabId }) ?? (offset > 0 ? -1 : tabs.count)
        let next = ((current + offset) % tabs.count + tabs.count) % tabs.count
        selectOpenTab(tabs[next])
    }

    /// ⌘W closes the tab on screen (or the note, when tabs are off).
    private func closeActiveTab() {
        guard !workspace.isEditingNote else { return }
        guard showNoteTabsBar,
              let profileId = appState.activeProfile?.id,
              let tab = openTabs.first(where: { $0.id == activeOpenTabId })
        else {
            workspace.close()
            return
        }
        try? PersistenceManager.shared.removeOpenNoteTab(id: tab.id, serverProfileId: profileId)
        openTabRemoved(tab)
        if openTabs.isEmpty {
            LastActiveOpenTabStore.set("", profileId: profileId)
        }
    }

    // MARK: - Note pane

    /// Tab row above the note, like Trilium's. Hidden while editing so a tab switch can't drop the edit.
    private var notePane: some View {
        VStack(spacing: 0) {
            if showNoteTabsBar, !workspace.isEditingNote {
                NoteTabsBar(
                    currentOpenTabId: activeOpenTabId.isEmpty ? nil : activeOpenTabId,
                    onSelect: selectOpenTab,
                    onOpenTabRemoved: openTabRemoved,
                    onTabsBecameEmpty: {
                        LastActiveOpenTabStore.set("", profileId: appState.activeProfile?.id)
                    },
                    isAtTop: true
                )
            }
            noteStack
        }
        .animation(.easeInOut(duration: 0.2), value: workspace.isEditingNote)
        .onAppear {
            activeOpenTabId = LastActiveOpenTabStore.get(profileId: appState.activeProfile?.id)
        }
        .onReceive(NotificationCenter.default.publisher(for: .trinoteLastActiveOpenTabIdChanged)) { note in
            guard let pid = note.userInfo?["serverProfileId"] as? String,
                  pid == appState.activeProfile?.id
            else { return }
            activeOpenTabId = LastActiveOpenTabStore.get(profileId: pid)
        }
    }

    /// Shows `tab`'s note in the pane; the note restores that tab's scroll position.
    private func selectOpenTab(_ tab: OpenNoteTab) {
        guard appState.activeProfile?.id == tab.serverProfileId else { return }
        let alreadyShowing = tab.id == activeOpenTabId && workspace.visibleNoteId == tab.noteId
        LastActiveOpenTabStore.set(tab.id, profileId: tab.serverProfileId)
        activeOpenTabId = tab.id
        guard !alreadyShowing else { return }
        workspace.open(NoteRoute(noteId: tab.noteId, title: tab.title, openTabId: tab.id))
    }

    /// Closing the tab of the note on screen shows the most recently opened remaining tab, or no note.
    /// (If the note still has another tab, `NoteDetailView` switches to it in place.)
    private func openTabRemoved(_ removed: OpenNoteTab) {
        OpenTabSessionStore.clearReadScrollState(for: removed.id)
        guard let profileId = appState.activeProfile?.id, removed.noteId == workspace.visibleNoteId else { return }
        let remaining = (try? PersistenceManager.shared.fetchOpenNoteTabs(serverProfileId: profileId)) ?? []
        guard !remaining.contains(where: { $0.noteId == removed.noteId }) else { return }
        if let next = remaining.max(by: { $0.addedAt < $1.addedAt }) {
            selectOpenTab(next)
        } else {
            LastActiveOpenTabStore.set("", profileId: profileId)
            workspace.close()
        }
    }

    private var noteStack: some View {
        NavigationStack {
            if let route = workspace.route {
                NoteDetailView(
                    noteId: route.noteId,
                    title: route.title,
                    seedChildSummaries: route.seedChildSummaries,
                    startInEditMode: route.startInEditMode,
                    pendingFindQuery: route.pendingFindQuery,
                    pendingFindMatchIndex: route.pendingFindMatchIndex,
                    openTabId: route.openTabId,
                    attachmentIdToInsert: route.attachmentIdToInsert,
                    attachmentTitleToInsert: route.attachmentTitleToInsert,
                    onClose: { next in
                        if let next {
                            workspace.open(next)
                        } else {
                            workspace.close()
                        }
                    }
                )
            } else {
                ContentUnavailableView {
                    Label(String(localized: "No Note Open", comment: "iPad note pane with nothing selected"), systemImage: "doc.text")
                } description: {
                    Text(String(localized: "Choose a note from the tree.", comment: "iPad note pane empty state hint"))
                }
            }
        }
        // A new route starts a fresh stack, so linked notes pushed on the previous note don't linger.
        .id("\(navigationStackInstanceId)-\(workspace.route?.id.uuidString ?? "empty")")
    }
}
