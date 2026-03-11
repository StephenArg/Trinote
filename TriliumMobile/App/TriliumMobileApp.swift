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
struct TriliumMobileApp: App {
    @State private var appState = AppState()
    @Environment(\.scenePhase) private var scenePhase
    @AppStorage("appearanceMode") private var appearanceMode: String = AppearanceMode.device.rawValue

    private var resolvedColorScheme: ColorScheme? {
        AppearanceMode(rawValue: appearanceMode)?.colorScheme
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(appState)
                .modelContainer(PersistenceManager.shared.container)
                .preferredColorScheme(resolvedColorScheme)
                .foregroundStyle(Color.appText)
                .task { await appState.bootstrap() }
                .onChange(of: scenePhase) { _, newPhase in
                    if newPhase == .active {
                        Task { await appState.onForegroundResume() }
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
