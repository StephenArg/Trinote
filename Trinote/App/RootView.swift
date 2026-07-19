import SwiftUI

struct RootView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        Group {
            if appState.isLoading {
                LaunchView()
            } else if appState.isAuthenticated {
                MainTabView()
            } else {
                LoginView()
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemBackground))
        .animation(.easeInOut(duration: 0.3), value: appState.isAuthenticated)
        .animation(.easeInOut(duration: 0.3), value: appState.isLoading)
        .onChange(of: appState.isAuthenticated) { _, authenticated in
            if authenticated {
                appState.shareImport.onAuthenticated()
            }
        }
        .onChange(of: appState.isLoading) { _, loading in
            if !loading {
                appState.shareImport.checkForPendingPayload()
            }
        }
    }
}
