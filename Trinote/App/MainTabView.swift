import SwiftUI

struct MainTabView: View {
    @Environment(AppState.self) private var appState
    @State private var selectedTab: Tab = .notes

    enum Tab: String, CaseIterable {
        case notes = "Notes"
        case favorites = "Favorites"
        case search = "Search"
        case recents = "Recents"
        case settings = "Settings"

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
                        Label(tab.rawValue, systemImage: tab.icon)
                    }
                    .tag(tab)
            }
        }
        .onChange(of: appState.networkMonitor.isConnected) { _, online in
            guard online, appState.isAuthenticated else { return }
            Task {
                let refreshed = await appState.refreshTriliumSession()
                await appState.flushPendingLocalChangesIfPossible(assumeSessionIsReady: refreshed)
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
        case .favorites:
            NavigationStack {
                FavoritesView(onNoteDeleted: {
                    Task { await appState.refreshSessionThenIncrementalSync(maxWaitSeconds: 120, downloadChangedBodies: false) }
                })
            }
        case .search:
            NavigationStack {
                SearchView()
            }
        case .recents:
            NavigationStack {
                RecentsView()
            }
        case .settings:
            NavigationStack {
                SettingsView()
            }
        }
    }
}

#Preview {
    MainTabView()
        .environment(AppState())
        .modelContainer(PersistenceManager.shared.container)
}
