import SwiftUI
import UIKit

struct MainTabView: View {
    @Environment(AppState.self) private var appState
    @State private var selectedTab: MainTab = .notes
    @AppStorage(MainTabPreferences.shownTabsKey) private var shownTabsRaw: String = ""
    @AppStorage(MainTabPreferences.customIconsKey) private var customIconsRaw: String = ""
    /// The tabs in the bar. Normally `configuredTabs`; a tab removed while it is selected stays until the user
    /// switches away (see `reconcileDisplayedTabs`).
    @State private var displayedTabs: [MainTab] = MainTabPreferences.defaultTabs
    /// Per-profile choices behind the Pinned Note and Add Note tabs; reloaded when Settings changes them.
    @State private var pinnedNote: NoteReference?
    @State private var addNoteDefault: AddNoteDefault?
    @State private var addNoteKindDefault: AddNoteKindDefault?
    // The Add Note tab.
    @State private var addNoteStep: AddNoteStep?
    @State private var rememberAddNoteParent = false
    @State private var rememberAddNoteKind = false
    @State private var addNoteInboxDestination: InboxDestination?
    @State private var isCreatingNote = false
    @State private var addNoteError: String?

    /// The Add Note tab's steps: where the note goes, then what kind it is. Each is skipped when remembered.
    private enum AddNoteStep: Identifiable {
        case pickParent
        case pickKind(destination: AddNoteDefault, rememberParent: Bool)

        var id: String {
            switch self {
            case .pickParent: "parent"
            case .pickKind: "kind"
            }
        }
    }

    /// Recreates each tab’s `NavigationStack` when the active instance or `tabNavigationResetGeneration` changes so pushed `NoteDetailView`s cannot survive with the wrong `serverProfileId`.
    private var navigationStackInstanceId: String {
        let pid = appState.activeProfile?.id ?? "__trinote_no_profile__"
        return "\(pid)-\(appState.tabNavigationResetGeneration)"
    }

    /// The saved tabs, less AI Chat while the server offers no AI.
    private var configuredTabs: [MainTab] {
        MainTabPreferences.tabs(fromStored: shownTabsRaw).filter { $0 != .aiChat || appState.showsAIEntryPoints }
    }

    /// The tab bar's selection. A tap on the tab that is already selected still comes through the setter, which is
    /// how tapping Notes again takes the notes stack back to the tree, like a navigation controller's tab.
    private var tabSelection: Binding<MainTab> {
        Binding(
            get: { selectedTab },
            set: { newValue in
                if newValue == selectedTab, newValue == .notes {
                    NotificationCenter.default.post(name: .trinoteNotesTabReselected, object: nil)
                }
                selectedTab = newValue
            }
        )
    }

    var body: some View {
        TabView(selection: tabSelection) {
            ForEach(displayedTabs) { tab in
                tabContent(for: tab)
                    .tabItem {
                        Label(label(for: tab), systemImage: icon(for: tab))
                    }
                    .tag(tab)
            }
        }
        .modifier(MainShellModifiers(onShareImportActivated: { selectedTab = .notes }))
        .onChange(of: configuredTabs, initial: true) { _, _ in reconcileDisplayedTabs() }
        .onChange(of: selectedTab) { previous, current in
            // An action tab runs its action and gives the selection back, so the user never lands on it.
            if current.isAction {
                selectedTab = previous
                perform(current)
            } else if displayedTabs != configuredTabs {
                displayedTabs = configuredTabs
            }
        }
        .task(id: appState.activeProfile?.id) { loadTabNotePreferences() }
        .onReceive(NotificationCenter.default.publisher(for: .trinoteTabNotePreferencesChanged)) { _ in
            loadTabNotePreferences()
        }
        .onReceive(NotificationCenter.default.publisher(for: .trinoteOfflineNoteIdReplaced)) { notification in
            guard let from = notification.userInfo?["from"] as? String,
                  let to = notification.userInfo?["to"] as? String,
                  let profileId = appState.activeProfile?.id
            else { return }
            AddNoteDefault.remapOfflineId(from: from, to: to, profileId: profileId)
            AddNoteKindDefault.remapOfflineId(from: from, to: to, profileId: profileId)
            PinnedNoteTab.remapOfflineId(from: from, to: to, profileId: profileId)
            loadTabNotePreferences()
        }
        .sheet(item: $addNoteStep) { step in addNoteSheet(for: step) }
        .alert(
            String(localized: "Couldn't Create Note", comment: "Add Note tab: creation failed alert title"),
            isPresented: addNoteErrorBinding(whileSheetShown: false),
            actions: { Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {} },
            message: { Text(addNoteError ?? "") }
        )
    }

    @ViewBuilder
    private func tabContent(for tab: MainTab) -> some View {
        switch tab {
        case .notes:
            NavigationStack {
                TreeView()
            }
            .id(navigationStackInstanceId)
            // With Notes alone in the bar there is nothing to switch to, so the bar goes. The enforcer sits outside
            // the stack: a push inside Notes must not fire its viewWillDisappear, which would bring the bar back.
            .background { TabBarHiddenEnforcer(hidden: displayedTabs.count == 1) }
        case .favorites:
            NavigationStack {
                FavoritesView(onNoteDeleted: {
                    Task { await appState.refreshSessionThenIncrementalSync(maxWaitSeconds: 120, downloadChangedBodies: false) }
                })
            }
            .id(navigationStackInstanceId)
        case .search:
            NavigationStack {
                SearchView()
            }
            .id(navigationStackInstanceId)
        case .recents:
            NavigationStack {
                RecentsView()
            }
            .id(navigationStackInstanceId)
        case .settings:
            NavigationStack {
                SettingsView()
            }
            .id(navigationStackInstanceId)
        case .aiChat:
            NavigationStack {
                AIChatsView()
            }
            .id(navigationStackInstanceId)
        case .calendar:
            NavigationStack {
                JournalCalendarTabView()
            }
            .id(navigationStackInstanceId)
            // Day notes and links open on the Notes tab; this tab keeps the calendar.
            .environment(\.opensNotesOnNotesTab, true)
        case .pinnedNote:
            NavigationStack {
                PinnedNoteTabView(note: pinnedNote)
            }
            .id("\(navigationStackInstanceId)-\(pinnedNote?.noteId ?? "")")
            // Links and open tabs show on the Notes tab; this tab keeps the pinned note.
            .environment(\.opensNotesOnNotesTab, true)
        case .todaysJournal:
            NavigationStack {
                TodayJournalTabView()
            }
            .id(navigationStackInstanceId)
            // Links and open tabs show on the Notes tab; this tab keeps today's note.
            .environment(\.opensNotesOnNotesTab, true)
        case .addNote:
            // Never shown: the selection goes back as soon as it lands here (see `body`).
            Color.clear
        }
    }

    private func icon(for tab: MainTab) -> String {
        MainTabPreferences.icon(for: tab, customIcons: MainTabPreferences.customIcons(fromStored: customIconsRaw))
    }

    private func label(for tab: MainTab) -> String {
        if tab == .pinnedNote, let pinnedNote, !pinnedNote.title.isEmpty {
            return pinnedNote.title
        }
        return tab.title
    }

    /// Keeps `displayedTabs` in step with the saved tabs. A tab removed while it is the selected one (Settings, from
    /// inside its own editor) stays in its place so the screen survives; it leaves the bar on the next tab switch.
    private func reconcileDisplayedTabs() {
        let configured = configuredTabs
        guard !configured.contains(selectedTab) else {
            displayedTabs = configured
            return
        }
        var kept = configured
        let oldIndex = displayedTabs.firstIndex(of: selectedTab) ?? kept.count
        kept.insert(selectedTab, at: min(oldIndex, kept.count))
        displayedTabs = kept
    }

    private func loadTabNotePreferences() {
        guard let profileId = appState.activeProfile?.id else {
            pinnedNote = nil
            addNoteDefault = nil
            addNoteKindDefault = nil
            return
        }
        pinnedNote = PinnedNoteTab.load(profileId: profileId)
        addNoteDefault = AddNoteDefault.load(profileId: profileId)
        addNoteKindDefault = AddNoteKindDefault.load(profileId: profileId)
    }

    // MARK: - Add Note tab

    private func perform(_ tab: MainTab) {
        switch tab {
        case .addNote:
            addNote()
        default:
            break
        }
    }

    private func addNote() {
        guard !isCreatingNote else { return }
        rememberAddNoteParent = false
        rememberAddNoteKind = false
        if let addNoteDefault {
            continueAddNote(destination: addNoteDefault, rememberParent: false)
        } else {
            addNoteStep = .pickParent
        }
    }

    /// With the place known: ask what kind of note, or make it.
    private func continueAddNote(destination: AddNoteDefault, rememberParent: Bool) {
        if let addNoteKindDefault {
            createNote(under: destination, title: "", kind: addNoteKindDefault, rememberParent: rememberParent, rememberKind: false)
        } else {
            addNoteStep = .pickKind(destination: destination, rememberParent: rememberParent)
        }
    }

    /// Makes the note on the device (uploaded in the background) and hands it to the notes tree, which opens the editor.
    private func createNote(
        under destination: AddNoteDefault,
        title: String,
        kind: AddNoteKindDefault,
        rememberParent: Bool,
        rememberKind: Bool
    ) {
        guard !isCreatingNote else { return }
        isCreatingNote = true
        Task {
            defer { isCreatingNote = false }
            do {
                let parentNoteId = try await destination.parentNoteId(appState: appState)
                let note = try await AddNoteCreation.create(parentNoteId: parentNoteId, title: title, kind: kind, appState: appState)
                if let profileId = appState.activeProfile?.id {
                    if rememberParent {
                        destination.save(profileId: profileId)
                        addNoteDefault = destination
                    }
                    if rememberKind {
                        kind.save(profileId: profileId)
                        addNoteKindDefault = kind
                    }
                    if rememberParent || rememberKind {
                        NotificationCenter.default.post(name: .trinoteTabNotePreferencesChanged, object: nil)
                    }
                }
                NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
                appState.backgroundSyncPendingChanges()
                addNoteStep = nil
                appState.pendingExternalOpen = .edit(note)
            } catch {
                addNoteError = error.localizedDescription
            }
        }
    }

    @ViewBuilder
    private func addNoteSheet(for step: AddNoteStep) -> some View {
        switch step {
        case .pickParent:
            addNoteParentPicker
        case .pickKind(let destination, let rememberParent):
            AddNoteKindSheet(
                isCreating: true,
                rememberKind: $rememberAddNoteKind,
                createsRootNote: destination.isRootNote
            ) { title, kind in
                createNote(under: destination, title: title, kind: kind, rememberParent: rememberParent, rememberKind: rememberAddNoteKind)
            }
            .environment(appState)
        }
    }

    private var addNoteParentPicker: some View {
        ParentPickerSheet(
            navigationTitle: String(localized: "New Note", comment: "Add Note tab: parent picker title"),
            instruction: String(localized: "Choose where to create the new note.", comment: "Add Note tab: parent picker instruction"),
            topLevelButtonTitle: "",
            showsTopLevelButton: false,
            rootHeaderPlacementTitle: String(localized: "Add as root note", comment: "Share import: place note at top level"),
            onPick: { parentNoteId, title, _ in
                continueAddNote(destination: .note(id: parentNoteId, title: title), rememberParent: rememberAddNoteParent)
            },
            quickDestination: ParentPickerSheet.QuickDestination(
                title: String(localized: "Add to Inbox", comment: "Share import: put the note where Trilium puts captures"),
                subtitle: addNoteInboxDestination?.displayTitle,
                systemImage: "tray.and.arrow.down",
                isBusy: isCreatingNote,
                action: { continueAddNote(destination: .inbox, rememberParent: rememberAddNoteParent) }
            ),
            rememberToggle: ParentPickerSheet.RememberToggle(
                title: String(localized: "Remember this choice", comment: "Add Note tab: keep the chosen place as the default"),
                isOn: $rememberAddNoteParent
            )
        )
        .environment(appState)
        .task { addNoteInboxDestination = await InboxDestination.resolve(appState: appState) }
        .alert(
            String(localized: "Couldn't Create Note", comment: "Add Note tab: creation failed alert title"),
            isPresented: addNoteErrorBinding(whileSheetShown: true),
            actions: { Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {} },
            message: { Text(addNoteError ?? "") }
        )
    }

    /// The error alert belongs to the sheet while one is up (an alert under a sheet can't show), else to the tab bar.
    private func addNoteErrorBinding(whileSheetShown: Bool) -> Binding<Bool> {
        Binding(
            get: { addNoteError != nil && (addNoteStep != nil) == whileSheetShown },
            set: { if !$0 { addNoteError = nil } }
        )
    }
}

/// Signed-in app chrome shared by the tab layout (`MainTabView`) and the iPad split layout
/// (`SplitWorkspaceView`): local-transfer banner, catch-up sync when back online, share-import
/// activation, and the first-sync choice sheet.
struct MainShellModifiers: ViewModifier {
    @Environment(AppState.self) private var appState
    /// Called when a share arrives, so the layout can bring the notes tree forward.
    let onShareImportActivated: () -> Void

    func body(content: Content) -> some View {
        // Observe share-import activation so we can switch to Notes when a share arrives.
        let _ = appState.shareImport.activationToken

        content
            .overlay(alignment: .top) {
                if let message = appState.localTransfer.successNotification {
                    LocalTransferSuccessBanner(message: message)
                        .padding(.horizontal, 16)
                        .padding(.top, 8)
                        .transition(.move(edge: .top).combined(with: .opacity))
                }
            }
            .animation(.easeInOut(duration: 0.25), value: appState.localTransfer.successNotification)
            .onChange(of: appState.networkMonitor.isConnected) { _, online in
                guard online, appState.isAuthenticated else { return }
                Task {
                    let refreshed = await appState.refreshTriliumSession()
                    await appState.flushPendingLocalChangesIfPossible(assumeSessionIsReady: refreshed)
                    await appState.runIncrementalSync(maxWaitSeconds: 120, downloadChangedBodies: false)
                }
            }
            .onChange(of: appState.shareImport.activationToken) { _, _ in
                if appState.shareImport.phase != .idle {
                    onShareImportActivated()
                }
            }
            // The Open Today's Journal Shortcut: bring the notes tree forward to open it.
            .onChange(of: appState.pendingExternalOpen) { _, request in
                if request != nil {
                    onShareImportActivated()
                }
            }
            .sheet(item: firstSyncRequest) { request in
                FirstSyncChoiceSheet(request: request)
                    .environment(appState)
            }
    }

    /// A server's first full sync waits here for what to keep offline.
    private var firstSyncRequest: Binding<SyncManager.FirstSyncRequest?> {
        Binding(get: { appState.syncManager.pendingFirstSync }, set: { _ in })
    }
}

/// Hides the enclosing tab bar through UIKit while `hidden` is true, and brings it back when `hidden`
/// turns false or the host leaves the screen.
///
/// `.toolbar(.hidden, for: .tabBar)` toggled on a view that is already on screen can leave the floating
/// tab bar drawn over content that is already laid out as if it were gone, cutting off bottom-pinned
/// toolbars (e.g. the note editor's formatting bar while the keyboard is down).
struct TabBarHiddenEnforcer: UIViewControllerRepresentable {
    let hidden: Bool

    func makeUIViewController(context: Context) -> Controller {
        Controller()
    }

    func updateUIViewController(_ controller: Controller, context: Context) {
        controller.wantsHidden = hidden
    }

    final class Controller: UIViewController {
        var wantsHidden = false {
            didSet {
                guard wantsHidden != oldValue else { return }
                apply(animated: true)
            }
        }

        /// Set only while this host is the one keeping the tab bar hidden.
        private weak var hiddenTabBarController: UITabBarController?

        override func viewDidLoad() {
            super.viewDidLoad()
            view.isUserInteractionEnabled = false
            view.backgroundColor = .clear
            view.isOpaque = false
        }

        override func viewDidAppear(_ animated: Bool) {
            super.viewDidAppear(animated)
            apply(animated: false)
        }

        override func viewWillDisappear(_ animated: Bool) {
            super.viewWillDisappear(animated)
            showTabBarIfHidden(animated: animated)
        }

        private func apply(animated: Bool) {
            guard wantsHidden else {
                showTabBarIfHidden(animated: animated)
                return
            }
            guard viewIfLoaded?.window != nil, let tabs = enclosingTabBarController, !tabs.isTabBarHidden else { return }
            tabs.setTabBarHidden(true, animated: animated)
            hiddenTabBarController = tabs
        }

        private func showTabBarIfHidden(animated: Bool) {
            guard let tabs = hiddenTabBarController else { return }
            hiddenTabBarController = nil
            if tabs.isTabBarHidden {
                tabs.setTabBarHidden(false, animated: animated)
            }
        }

        private var enclosingTabBarController: UITabBarController? {
            if let tabBarController { return tabBarController }
            var responder: UIResponder? = view
            while let current = responder {
                if let tabs = current as? UITabBarController { return tabs }
                responder = current.next
            }
            return nil
        }
    }
}

#Preview {
    MainTabView()
        .environment(AppState())
        .modelContainer(PersistenceManager.shared.container)
}
