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
    @State private var isAppLocked = false
    @State private var pinErrorMessage: String?
    /// URL opened before `appState` exists (cold start from Share Extension).
    @State private var pendingIncomingURL: URL?
    @Environment(\.scenePhase) private var scenePhase
    @AppStorage("appearanceMode") private var appearanceMode: String = AppearanceMode.device.rawValue
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue
    @AppStorage("appPinEnabled") private var appPinEnabled = false
    @AppStorage("appBiometricEnabled") private var appBiometricEnabled = false
    @AppStorage(AppPinLength.storageKey) private var appPinLength = AppPinLength.default
    @State private var biometricInProgress = false
    /// After biometric fails or the user cancels, show the PIN keypad until the next time the app lock engages.
    @State private var preferPinKeypadVisible = false
    /// Set when the lock engages with biometrics on; the one automatic attempt runs once the scene is active
    /// (the lock engages in the background, where Face ID fails at once and would skip straight to the PIN).
    @State private var biometricAutoAttemptPending = false

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
                    runPendingBiometricAutoAttempt()
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
    }

    private func deliverPendingIncomingURLIfNeeded(to appState: AppState) {
        guard let url = pendingIncomingURL else { return }
        pendingIncomingURL = nil
        appState.handleIncomingURL(url)
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
        biometricAutoAttemptPending = offerBiometricFirst
        pinErrorMessage = nil
        isAppLocked = true
        dismissKeyboardForAppLock()
        // Cold launch can engage after the scene is already active, so no `.active` change follows.
        if scenePhase == .active {
            runPendingBiometricAutoAttempt()
        }
    }

    private func runPendingBiometricAutoAttempt() {
        guard biometricAutoAttemptPending, isAppLocked else { return }
        biometricAutoAttemptPending = false
        Task { @MainActor in
            await attemptBiometricUnlockAsync(isUserInitiated: false)
        }
    }

    /// The lock overlay sits above the note editor, which keeps first responder while the app is in the
    /// background — so iOS would bring its keyboard back over the PIN screen on return. Resign it instead.
    private func dismissKeyboardForAppLock() {
        for scene in UIApplication.shared.connectedScenes {
            guard let windowScene = scene as? UIWindowScene else { continue }
            for window in windowScene.windows {
                window.endEditing(true)
            }
        }
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
        let result = await BiometricAuthenticator.authenticate(
            localizedReason: reason,
            fallbackTitle: String(localized: "Enter PIN", comment: "Lock screen title")
        )
        if case .success = result {
            withAnimation(.easeOut(duration: 0.25)) {
                isAppLocked = false
                preferPinKeypadVisible = false
            }
        } else if case .failure(let error) = result,
                  !isUserInitiated,
                  [.systemCancel, .appCancel, .notInteractive].contains(error.code),
                  UIApplication.shared.applicationState != .active {
            // Leaving the app interrupted the scan (not a failed scan or Cancel): try again on return.
            biometricAutoAttemptPending = true
        } else {
            withAnimation(.easeOut(duration: 0.2)) {
                preferPinKeypadVisible = true
            }
        }
    }

    private var biometricLockPlaceholder: some View {
        VStack(spacing: 0) {
            Spacer()

            VStack(spacing: 14) {
                LaunchAppMark(size: 72)
                    .shadow(color: .black.opacity(0.12), radius: 8, y: 3)

                Text(String(localized: "Trinote Is Locked", comment: "Lock screen title while Face ID or Touch ID runs"))
                    .font(.title2.weight(.semibold))

                Label(
                    String(localized: "Confirm to unlock", comment: "Hint while system Face ID or Touch ID sheet is shown"),
                    systemImage: lockScreenBiometryKind.symbolName
                )
                .font(.subheadline)
                .foregroundStyle(.secondary)
            }
            .multilineTextAlignment(.center)
            .padding(.horizontal, 32)
            .accessibilityElement(children: .combine)
            .accessibilityLabel(String(localized: "Locked. Confirm your identity to unlock.", comment: "VoiceOver lock placeholder"))

            Spacer()

            // Way out if the system sheet was dismissed without a result.
            Button(String(localized: "Enter PIN", comment: "Lock screen title")) {
                withAnimation(.easeOut(duration: 0.2)) {
                    preferPinKeypadVisible = true
                }
            }
            .font(.body.weight(.medium))
            .padding(.bottom, 32)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background { PinEntryBackground() }
    }

    private var pinLockOverlay: some View {
        Group {
            if shouldShowBiometricPlaceholder {
                biometricLockPlaceholder
            } else {
                PinEntryView(
                    title: String(localized: "Enter PIN", comment: "Lock screen title"),
                    subtitle: String(localized: "Trinote is locked", comment: "Lock screen subtitle above the PIN keypad"),
                    errorMessage: $pinErrorMessage,
                    pinLength: appPinLength,
                    biometricKind: appBiometricEnabled ? lockScreenBiometryKind : .none,
                    onBiometric: attemptBiometricUnlockFromUserButton,
                    onComplete: { pin in
                        let match = (try? await KeychainManager.shared.verifyAppPin(pin)) ?? false
                        guard match else {
                            pinErrorMessage = String(localized: "Incorrect PIN", comment: "PIN entry: wrong PIN")
                            return .rejected
                        }
                        withAnimation(.easeOut(duration: 0.25)) {
                            isAppLocked = false
                            preferPinKeypadVisible = false
                        }
                        return .done
                    }
                )
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemBackground))
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
