import SwiftUI
import UIKit

/// The PIN / Face ID app lock. Its screen lives in a window of its own above everything the app presents — sheets,
/// popovers, menus, full-screen editors — so nothing that was open when the app locked stays visible or usable over
/// it. What's underneath stays in place, unsaved editor work included, and the iPad menu-bar commands are off while
/// it's up.
@Observable
@MainActor
final class AppLock {
    static let shared = AppLock()

    private(set) var isLocked = false
    var pinErrorMessage: String?
    /// After Face ID fails or is cancelled, the keypad shows until the lock engages again.
    var preferPinKeypadVisible = false
    private var biometricInProgress = false
    /// Set when the lock engages with biometrics on; the one automatic attempt runs once the scene is active (the
    /// lock engages in the background, where Face ID fails at once and would skip straight to the PIN).
    private var biometricAutoAttemptPending = false
    @ObservationIgnored private var window: UIWindow?

    var isPinEnabled: Bool { UserDefaults.standard.bool(forKey: "appPinEnabled") }
    var isBiometricEnabled: Bool { UserDefaults.standard.bool(forKey: "appBiometricEnabled") }
    var pinLength: Int { (UserDefaults.standard.object(forKey: AppPinLength.storageKey) as? Int) ?? AppPinLength.default }

    var biometryKind: BiometricKind { BiometricAuthenticator.availability().kind }

    /// Face ID / Touch ID is on and the device can use it, and the user hasn't fallen back to the keypad.
    var showsBiometricPlaceholder: Bool {
        isBiometricEnabled && BiometricAuthenticator.availability().available && !preferPinKeypadVisible
    }

    /// Locks the app when a PIN is set.
    func engage(sceneIsActive: Bool) {
        guard isPinEnabled else { return }
        let offerBiometricFirst = isBiometricEnabled && BiometricAuthenticator.availability().available
        preferPinKeypadVisible = !offerBiometricFirst
        biometricAutoAttemptPending = offerBiometricFirst
        pinErrorMessage = nil
        isLocked = true
        dismissKeyboard()
        showWindow()
        // Cold launch can engage after the scene is already active, so no `.active` change follows.
        if sceneIsActive {
            runPendingBiometricAutoAttempt()
        }
    }

    /// On becoming active: makes sure the lock screen is up (the scene may not have existed when the lock engaged)
    /// and runs the one automatic Face ID attempt.
    func sceneBecameActive() {
        if isLocked {
            showWindow()
        }
        runPendingBiometricAutoAttempt()
    }

    private func runPendingBiometricAutoAttempt() {
        guard biometricAutoAttemptPending, isLocked else { return }
        biometricAutoAttemptPending = false
        Task { await attemptBiometricUnlock(isUserInitiated: false) }
    }

    func attemptBiometricUnlock(isUserInitiated: Bool) async {
        guard isBiometricEnabled, isLocked else { return }
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
            unlock()
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

    func verify(pin: String) async -> PinEntryResult {
        let match = (try? await KeychainManager.shared.verifyAppPin(pin)) ?? false
        guard match else {
            pinErrorMessage = String(localized: "Incorrect PIN", comment: "PIN entry: wrong PIN")
            return .rejected
        }
        unlock()
        return .done
    }

    func showPinKeypad() {
        withAnimation(.easeOut(duration: 0.2)) {
            preferPinKeypadVisible = true
        }
    }

    private func unlock() {
        isLocked = false
        preferPinKeypadVisible = false
        hideWindow()
    }

    // MARK: Window

    private func showWindow() {
        guard let scene = Self.windowScene() else { return }
        if window == nil || window?.windowScene !== scene {
            window?.isHidden = true
            let lockWindow = UIWindow(windowScene: scene)
            // Above alerts too: everything the app shows sits underneath.
            lockWindow.windowLevel = .alert + 1
            let host = UIHostingController(rootView: AppLockScreen(lock: self))
            host.view.backgroundColor = .systemBackground
            lockWindow.rootViewController = host
            window = lockWindow
        }
        window?.alpha = 1
        window?.makeKeyAndVisible()
    }

    private func hideWindow() {
        guard let lockWindow = window else { return }
        window = nil
        UIView.animate(withDuration: 0.25) {
            lockWindow.alpha = 0
        } completion: { _ in
            lockWindow.isHidden = true
            // Back to the app's own window, so its keyboard shortcuts and focus work again.
            lockWindow.windowScene?.windows
                .first { $0 !== lockWindow && !$0.isHidden && $0.windowLevel == .normal }?
                .makeKey()
        }
    }

    private static func windowScene() -> UIWindowScene? {
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        return scenes.first { $0.activationState == .foregroundActive } ?? scenes.first
    }

    /// The note editor keeps first responder while the app is in the background, so iOS would bring its keyboard
    /// back over the lock screen on return.
    private func dismissKeyboard() {
        for scene in UIApplication.shared.connectedScenes {
            guard let windowScene = scene as? UIWindowScene else { continue }
            for window in windowScene.windows where window !== self.window {
                window.endEditing(true)
            }
        }
    }
}

/// What the lock window shows: Face ID's waiting screen or the PIN keypad.
private struct AppLockScreen: View {
    let lock: AppLock

    @AppStorage("appearanceMode") private var appearanceMode: String = AppearanceMode.device.rawValue
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue

    var body: some View {
        Group {
            if lock.showsBiometricPlaceholder {
                biometricPlaceholder
            } else {
                PinEntryView(
                    title: String(localized: "Enter PIN", comment: "Lock screen title"),
                    subtitle: String(localized: "Trinote is locked", comment: "Lock screen subtitle above the PIN keypad"),
                    errorMessage: Binding(get: { lock.pinErrorMessage }, set: { lock.pinErrorMessage = $0 }),
                    pinLength: lock.pinLength,
                    biometricKind: lock.isBiometricEnabled ? lock.biometryKind : .none,
                    onBiometric: { Task { await lock.attemptBiometricUnlock(isUserInitiated: true) } },
                    onComplete: { pin in await lock.verify(pin: pin) }
                )
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemBackground))
        .preferredColorScheme(AppearanceMode(rawValue: appearanceMode)?.colorScheme)
        .tint((ColorTheme(rawValue: colorTheme) ?? .default).accentColor)
        .foregroundStyle(Color.appText)
    }

    private var biometricPlaceholder: some View {
        VStack(spacing: 0) {
            Spacer()

            VStack(spacing: 14) {
                LaunchAppMark(size: 72)
                    .shadow(color: .black.opacity(0.12), radius: 8, y: 3)

                Text(String(localized: "Trinote Is Locked", comment: "Lock screen title while Face ID or Touch ID runs"))
                    .font(.title2.weight(.semibold))

                Label(
                    String(localized: "Confirm to unlock", comment: "Hint while system Face ID or Touch ID sheet is shown"),
                    systemImage: lock.biometryKind.symbolName
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
                lock.showPinKeypad()
            }
            .font(.body.weight(.medium))
            .padding(.bottom, 32)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background { PinEntryBackground() }
    }
}
