import SwiftUI
import UIKit

struct MainTabView: View {
    @Environment(AppState.self) private var appState
    @State private var selectedTab: Tab = .notes

    /// Recreates each tab’s `NavigationStack` when the active instance or `tabNavigationResetGeneration` changes so pushed `NoteDetailView`s cannot survive with the wrong `serverProfileId`.
    private var navigationStackInstanceId: String {
        let pid = appState.activeProfile?.id ?? "__trinote_no_profile__"
        return "\(pid)-\(appState.tabNavigationResetGeneration)"
    }

    enum Tab: String, CaseIterable {
        case notes
        case favorites
        case search
        case recents
        case settings

        /// Tab bar label (localized).
        var title: String {
            switch self {
            case .notes: String(localized: "Notes", comment: "Main tab: notes tree")
            case .favorites: String(localized: "Favorites", comment: "Main tab")
            case .search: String(localized: "Search", comment: "Main tab")
            case .recents: String(localized: "Recents", comment: "Main tab")
            case .settings: String(localized: "Settings", comment: "Main tab")
            }
        }

        var icon: String {
            switch self {
            case .notes: return "folder.fill"
            case .favorites: return "star.fill"
            case .search: return "magnifyingglass"
            case .recents: return "clock.fill"
            case .settings: return "gearshape.fill"
            }
        }
    }

    var body: some View {
        // Observe share-import activation so we can switch to Notes when a share arrives.
        let _ = appState.shareImport.activationToken

        TabView(selection: $selectedTab) {
            ForEach(Tab.allCases, id: \.self) { tab in
                tabContent(for: tab)
                    .tabItem {
                        Label(tab.title, systemImage: tab.icon)
                    }
                    .tag(tab)
            }
        }
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
                selectedTab = .notes
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

    @ViewBuilder
    private func tabContent(for tab: Tab) -> some View {
        switch tab {
        case .notes:
            NavigationStack {
                TreeView()
            }
            .id(navigationStackInstanceId)
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
        }
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
