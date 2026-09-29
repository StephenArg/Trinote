import SwiftUI

struct RootView: View {
    @Environment(AppState.self) private var appState
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    /// Outlives layout switches as an iPad window is resized, so the open note comes back.
    @State private var workspace = NoteWorkspace()

    /// Trilium-desktop-style panes on iPad when the window is wide enough; narrow iPad windows and
    /// iPhone keep the tab layout.
    private var usesSplitLayout: Bool {
        UIDevice.current.userInterfaceIdiom == .pad && horizontalSizeClass == .regular
    }

    var body: some View {
        Group {
            if appState.isLoading {
                LaunchView()
            } else if appState.isAuthenticated {
                if usesSplitLayout {
                    SplitWorkspaceView(workspace: workspace)
                } else {
                    MainTabView()
                }
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
            } else {
                workspace.close()
            }
        }
        .onChange(of: appState.isLoading) { _, loading in
            if !loading {
                appState.shareImport.checkForPendingPayload()
            }
        }
    }
}
