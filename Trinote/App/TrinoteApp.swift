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
    @State private var isAppLocked = false
    @State private var pinShake = false
    @Environment(\.scenePhase) private var scenePhase
    @AppStorage("appearanceMode") private var appearanceMode: String = AppearanceMode.device.rawValue
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue
    @AppStorage("appPinEnabled") private var appPinEnabled = false
    @AppStorage("appBiometricEnabled") private var appBiometricEnabled = false
    @State private var biometricInProgress = false
    /// After biometric fails or the user cancels, show the PIN keypad until the next time the app lock engages.
    @State private var preferPinKeypadVisible = false
    /// Changes when the lock engages so `.task` runs one automatic biometric attempt per lock (no cancel/retry loops).
    @State private var lockSessionID = UUID()

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
                            .task { await appState.bootstrap() }
                            .onChange(of: appearanceMode) { _, _ in
                                MermaidRenderer.shared.onAppearanceModeChanged()
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

                if isAppLocked {
                    pinLockOverlay
                        .transition(.opacity)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(.systemBackground))
            .preferredColorScheme(resolvedColorScheme)
            .tint(resolvedAccentColor)
            .foregroundStyle(Color.appText)
            .onChange(of: scenePhase) { _, newPhase in
                if newPhase == .active {
                    if let appState {
                        Task { await appState.onForegroundResume() }
                    }
                } else if newPhase == .background {
                    if let appState {
                        Task { await appState.onBackground() }
                    }
                    if appPinEnabled { engageAppLock() }
                }
            }
            .task {
                guard appState == nil else { return }
                if appPinEnabled { engageAppLock() }
                do {
                    try await PersistenceManager.initializeShared()
                    appState = AppState()
                } catch {
                    persistenceError = error.localizedDescription
                }
            }
        }
    }

    private var lockScreenBiometryKind: BiometricKind {
        BiometricAuthenticator.availability().kind
    }

    private var lockScreenBiometricHardwareAvailable: Bool {
        BiometricAuthenticator.availability().available
    }

    private var shouldShowBiometricPlaceholder: Bool {
        appBiometricEnabled && lockScreenBiometricHardwareAvailable && !preferPinKeypadVisible
    }

    private func engageAppLock() {
        guard appPinEnabled else { return }
        let offerBiometricFirst = appBiometricEnabled && lockScreenBiometricHardwareAvailable
        preferPinKeypadVisible = !offerBiometricFirst
        isAppLocked = true
        lockSessionID = UUID()
    }

    private func attemptBiometricUnlockFromUserButton() {
        Task { @MainActor in
            await attemptBiometricUnlockAsync(isUserInitiated: true)
        }
    }

    @MainActor
    private func attemptBiometricUnlockAsync(isUserInitiated: Bool) async {
        guard appBiometricEnabled, isAppLocked else { return }
        let (_, available, _) = BiometricAuthenticator.availability()
        if !available {
            preferPinKeypadVisible = true
            return
        }
        if !isUserInitiated && preferPinKeypadVisible { return }
        guard !biometricInProgress else { return }

        biometricInProgress = true
        defer { biometricInProgress = false }

        let reason = String(localized: "Unlock Trinote", comment: "Lock screen biometric prompt")
        let result = await BiometricAuthenticator.authenticate(localizedReason: reason)
        if case .success = result {
            withAnimation(.easeOut(duration: 0.25)) {
                isAppLocked = false
                preferPinKeypadVisible = false
            }
        } else {
            withAnimation(.easeOut(duration: 0.2)) {
                preferPinKeypadVisible = true
            }
        }
    }

    private var biometricLockPlaceholder: some View {
        VStack(spacing: 24) {
            Spacer()

            VStack(spacing: 16) {
                Image(systemName: "lock.fill")
                    .font(.system(size: 52, weight: .medium))
                    .foregroundStyle(.secondary)
                Image(systemName: "key.fill")
                    .font(.system(size: 30, weight: .semibold))
                    .foregroundStyle(Color.accentColor)
            }
            .accessibilityElement(children: .combine)
            .accessibilityLabel(String(localized: "Locked. Confirm your identity to unlock.", comment: "VoiceOver lock placeholder"))

            Text(String(localized: "Confirm to unlock", comment: "Hint while system Face ID or Touch ID sheet is shown"))
                .font(.subheadline)
                .foregroundStyle(.tertiary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)

            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var pinLockOverlay: some View {
        Group {
            if shouldShowBiometricPlaceholder {
                biometricLockPlaceholder
                    .task(id: lockSessionID) {
                        guard isAppLocked else { return }
                        await attemptBiometricUnlockAsync(isUserInitiated: false)
                    }
            } else {
                VStack(spacing: 20) {
                    ManagedPinEntryView(
                        title: String(localized: "Enter PIN", comment: "Lock screen title"),
                        subtitle: nil,
                        onComplete: { pin in
                            Task {
                                let match = (try? await KeychainManager.shared.verifyAppPin(pin)) ?? false
                                if match {
                                    withAnimation(.easeOut(duration: 0.25)) {
                                        isAppLocked = false
                                        preferPinKeypadVisible = false
                                    }
                                } else {
                                    pinShake = true
                                }
                            }
                        },
                        triggerShake: $pinShake
                    )

                    if appBiometricEnabled, lockScreenBiometryKind != .none {
                        Button {
                            attemptBiometricUnlockFromUserButton()
                        } label: {
                            Text(lockScreenBiometryKind.localizedUseButtonTitle)
                        }
                        .buttonStyle(.bordered)
                    }
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemBackground))
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
