import SwiftUI
import SwiftData

enum AppearanceMode: String, CaseIterable, Identifiable {
    case device = "Device"
    case light = "Light"
    case dark = "Dark"

    var id: String { rawValue }

    var colorScheme: ColorScheme? {
        switch self {
        case .device: return nil
        case .light: return .light
        case .dark: return .dark
        }
    }
}

extension Color {
    static let appText = Color("AppText")
}

extension ShapeStyle where Self == Color {
    static var appText: Color { Color.appText }
}

@main
struct TrinoteApp: App {
    @State private var appState: AppState?
    @State private var persistenceError: String?
    @Environment(\.scenePhase) private var scenePhase
    @AppStorage("appearanceMode") private var appearanceMode: String = AppearanceMode.device.rawValue
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue

    private var resolvedColorScheme: ColorScheme? {
        AppearanceMode(rawValue: appearanceMode)?.colorScheme
    }

    private var resolvedAccentColor: Color {
        (ColorTheme(rawValue: colorTheme) ?? .default).accentColor
    }

    var body: some Scene {
        WindowGroup {
            Group {
                if let appState {
                    RootView()
                        .environment(appState)
                        .modelContainer(PersistenceManager.shared.container)
                        .task { await appState.bootstrap() }
                        .onChange(of: scenePhase) { _, newPhase in
                            if newPhase == .active {
                                Task { await appState.onForegroundResume() }
                            }
                        }
                } else if let persistenceError {
                    VStack(spacing: 16) {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.system(size: 48))
                            .foregroundStyle(.orange)
                        Text("Could not load database")
                            .font(.headline)
                        Text(persistenceError)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding()
                } else {
                    VStack(spacing: 16) {
                        Image(systemName: "note.text")
                            .font(.system(size: 56))
                            .foregroundStyle(.tint)
                        ProgressView()
                        Text("Starting…")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .preferredColorScheme(resolvedColorScheme)
            .tint(resolvedAccentColor)
            .foregroundStyle(Color.appText)
            .task {
                guard appState == nil else { return }
                do {
                    try await PersistenceManager.initializeShared()
                    appState = AppState()
                } catch {
                    persistenceError = error.localizedDescription
                }
            }
        }
    }
}

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
        .animation(.easeInOut(duration: 0.3), value: appState.isAuthenticated)
        .animation(.easeInOut(duration: 0.3), value: appState.isLoading)
    }
}

struct LaunchView: View {
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "note.text")
                .font(.system(size: 56))
                .foregroundStyle(.tint)
                .accessibilityHidden(true)
            ProgressView()
            Text("Connecting…")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
    }
}
