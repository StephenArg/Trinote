import SwiftUI

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
        TabView(selection: $selectedTab) {
            ForEach(Tab.allCases, id: \.self) { tab in
                tabContent(for: tab)
                    .tabItem {
                        Label(tab.title, systemImage: tab.icon)
                    }
                    .tag(tab)
            }
        }
        .onChange(of: appState.networkMonitor.isConnected) { _, online in
            guard online, appState.isAuthenticated else { return }
            Task {
                let refreshed = await appState.refreshTriliumSession()
                await appState.flushPendingLocalChangesIfPossible(assumeSessionIsReady: refreshed)
                await appState.runIncrementalSync(maxWaitSeconds: 120, downloadChangedBodies: false)
            }
        }
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

#Preview {
    MainTabView()
        .environment(AppState())
        .modelContainer(PersistenceManager.shared.container)
}
