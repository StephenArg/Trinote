import SwiftUI
import SwiftData
import UIKit

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

    static var stored: AppearanceMode {
        AppearanceMode(rawValue: UserDefaults.standard.string(forKey: "appearanceMode") ?? "") ?? .device
    }

    /// Mermaid's `dark` vs `default` theme for the current Settings appearance.
    var usesDarkMermaidTheme: Bool {
        switch self {
        case .dark: return true
        case .light: return false
        case .device: return UITraitCollection.current.userInterfaceStyle == .dark
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
    @UIApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
    @State private var appState: AppState?
    @State private var persistenceError: String?
    /// URL opened before `appState` exists (cold start from Share Extension).
    @State private var pendingIncomingURL: URL?
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
            ZStack {
                Group {
                    if let appState {
                        RootView()
                            .environment(appState)
                            .modelContainer(PersistenceManager.shared.container)
                            .background {
                                MermaidRendererHost()
                                    .frame(width: 0, height: 0)
                                    .allowsHitTesting(false)
                                    .accessibilityHidden(true)
                            }
                            .background {
                                MermaidDeviceAppearanceBridge()
                            }
                            .shareImportHost(appState: appState)
                            .task {
                                await appState.bootstrap()
                                deliverPendingIncomingURLIfNeeded(to: appState)
                                appState.shareImport.checkForPendingPayload()
                            }
                            .onChange(of: appearanceMode) { _, _ in
                                Task { @MainActor in
                                    await MermaidRenderer.shared.onAppearanceModeChanged()
                                    NotificationCenter.default.post(name: .trinoteAppearanceModeDidChange, object: nil)
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

                // The lock screen is a window above everything the app presents (`AppLock`). This cover keeps the
                // app's own content hidden under it, in case that window isn't up yet.
                if AppLock.shared.isLocked {
                    Color(.systemBackground)
                        .ignoresSafeArea()
                        .transition(.opacity)
                        .accessibilityHidden(true)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(.systemBackground))
            .preferredColorScheme(resolvedColorScheme)
            .tint(resolvedAccentColor)
            .foregroundStyle(Color.appText)
            .onOpenURL { url in
                if let appState {
                    appState.handleIncomingURL(url)
                } else {
                    pendingIncomingURL = url
                }
            }
            .onChange(of: scenePhase) { _, newPhase in
                if newPhase == .active {
                    if let appState {
                        Task { await appState.onForegroundResume() }
                    }
                    AppLock.shared.sceneBecameActive()
                } else if newPhase == .background {
                    if let appState {
                        Task { await appState.onBackground() }
                    }
                    AppLock.shared.engage(sceneIsActive: false)
                }
            }
            .task {
                guard appState == nil else { return }
                AppLock.shared.engage(sceneIsActive: scenePhase == .active)
                do {
                    try await PersistenceManager.initializeShared()
                    // As the unit tests' host, stay out of their way: a second AppState would share the cookie jar,
                    // Keychain and defaults with the ones the tests build, and race them.
                    guard ProcessInfo.processInfo.environment["XCTestConfigurationFilePath"] == nil else { return }
                    let state = AppState()
                    appState = state
                    deliverPendingIncomingURLIfNeeded(to: state)
                } catch {
                    persistenceError = error.localizedDescription
                }
            }
            .onAppear {
                AppDelegate.applyUserOrientationPreference()
            }
        }
        .commands { TrinoteCommands() }
    }

    private func deliverPendingIncomingURLIfNeeded(to appState: AppState) {
        guard let url = pendingIncomingURL else { return }
        pendingIncomingURL = nil
        appState.handleIncomingURL(url)
    }
}

/// Reloads mermaid when iOS light/dark flips while Settings appearance is Device.
/// Choosing Light or Dark in Settings is handled by `onChange(of: appearanceMode)` on `RootView`.
private struct MermaidDeviceAppearanceBridge: View {
    @Environment(\.colorScheme) private var colorScheme

    var body: some View {
        Color.clear
            .accessibilityHidden(true)
            .onChange(of: colorScheme) { _, _ in
                guard AppearanceMode.stored == .device else { return }
                Task { @MainActor in
                    await MermaidRenderer.shared.onAppearanceModeChanged()
                    NotificationCenter.default.post(name: .trinoteAppearanceModeDidChange, object: nil)
                }
            }
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
