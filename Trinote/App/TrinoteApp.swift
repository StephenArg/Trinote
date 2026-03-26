import SwiftUI
import SwiftData

enum AppearanceMode: String, CaseIterable, Identifiable {
    case device = "Device"
    case light = "Light"
    case dark = "Dark"

    var id: String { rawValue }

    /// Localized label for pickers (stored value remains English).
    var localizedTitle: String {
        switch self {
        case .device: String(localized: "Device", comment: "Appearance: follow system")
        case .light: String(localized: "Light", comment: "Appearance mode")
        case .dark: String(localized: "Dark", comment: "Appearance mode")
        }
    }

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

// MARK: - Launch loading (pulsing icon + accessible status)

private struct AppLaunchLoadingPanel: View {
    /// Shown under the icon.
    let message: String
    /// Spoken by VoiceOver (icon is decorative).
    let accessibilityLabelText: String

    @State private var pulse: CGFloat = 0

    var body: some View {
        VStack(spacing: 16) {
            LaunchAppMark(size: 72, useTransparentGlyphForBootstrap: true)
                .scaleEffect(1 + pulse * 0.055)
                .opacity(0.9 + pulse * 0.1)
                .onAppear {
                    withAnimation(.easeInOut(duration: 1.25).repeatForever(autoreverses: true)) {
                        pulse = 1
                    }
                }

            Text(message)
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(accessibilityLabelText)
        .accessibilityAddTraits(.updatesFrequently)
    }
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
                            } else if newPhase == .background {
                                Task { await appState.endServerProtectedSessionAndPersistCookies() }
                            }
                        }
                } else if let persistenceError {
                    VStack(spacing: 16) {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.system(size: 48))
                            .foregroundStyle(.orange)
                        Text(String(localized: "Could not load database", comment: "Persistence startup failure"))
                            .font(.headline)
                        Text(persistenceError)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding()
                } else {
                    AppLaunchLoadingPanel(
                        message: String(localized: "Starting…", comment: "Launch loading"),
                        accessibilityLabelText: String(localized: "Starting. Loading, please wait.", comment: "VoiceOver launch")
                    )
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(.systemBackground))
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
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemBackground))
        .animation(.easeInOut(duration: 0.3), value: appState.isAuthenticated)
        .animation(.easeInOut(duration: 0.3), value: appState.isLoading)
    }
}

struct LaunchView: View {
    var body: some View {
        AppLaunchLoadingPanel(
            message: String(localized: "Connecting…", comment: "Launch connecting"),
            accessibilityLabelText: String(localized: "Connecting. Loading, please wait.", comment: "VoiceOver connecting")
        )
    }
}
