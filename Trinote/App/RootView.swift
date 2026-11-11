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
        .alert(
            String(localized: "Signed Out", comment: "Alert title: the server ended this session"),
            isPresented: Binding(
                get: { appState.sessionEndedByServer && appState.isAuthenticated },
                set: { if !$0 { appState.sessionEndedByServer = false } }
            )
        ) {
            Button(String(localized: "Sign In", comment: "Alert button: go to the sign-in screen")) { appState.signInAgainAfterSessionEnded() }
            Button(String(localized: "Not Now", comment: "Alert button: keep using cached notes"), role: .cancel) {}
        } message: {
            Text(String(localized: "The server ended this session, which usually means its password changed. Sign in again to keep syncing. Your notes stay on this device until you do.", comment: "Alert message when the server ended the session"))
        }
        .alert(
            String(localized: "Changes Not Saved", comment: "Alert title: the server refused offline changes to notes it keeps read-only"),
            isPresented: Binding(
                get: { !appState.refusedChangesNoteTitles.isEmpty },
                set: { if !$0 { appState.refusedChangesNoteTitles = [] } }
            )
        ) {
            Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
        } message: {
            Text(refusedChangesMessage)
        }
    }

    private var refusedChangesMessage: String {
        let titles = appState.refusedChangesNoteTitles.map { "“\($0)”" }
        return String(
            format: String(localized: "The server doesn't allow changes to %@, so your edits weren't saved.", comment: "Alert message: offline edits the server refused; %@ is a list of note titles"),
            locale: .current,
            ListFormatter.localizedString(byJoining: titles)
        )
    }
}
