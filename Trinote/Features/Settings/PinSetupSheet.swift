import SwiftUI

struct PinSetupSheet: View {
    /// `true` when PIN is currently enabled (flow = verify to remove).
    let isCurrentlyEnabled: Bool
    let onComplete: () -> Void

    @Environment(\.dismiss) private var dismiss
    @AppStorage("appPinEnabled") private var appPinEnabled = false
    @AppStorage("appBiometricEnabled") private var appBiometricEnabled = false
    @AppStorage(AppPinLength.storageKey) private var appPinLength = AppPinLength.default

    @State private var step: Step = .initial
    @State private var firstEntry = ""
    /// Length chosen for the new PIN; saved to `appPinLength` only once the PIN is saved.
    @State private var newPinLength = AppPinLength.default
    @State private var entryError: String?
    @State private var error: String?

    private let keychain = KeychainManager.shared

    private enum Step {
        case initial
        case confirm
    }

    var body: some View {
        NavigationStack {
            Group {
                if isCurrentlyEnabled {
                    removeFlow
                } else {
                    setupFlow
                }
            }
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "PIN setup sheet")) {
                        dismiss()
                    }
                }
            }
            .alert(
                String(localized: "Error", comment: "PIN error alert title"),
                isPresented: .init(get: { error != nil }, set: { if !$0 { error = nil } })
            ) {
                Button("OK", role: .cancel) { error = nil }
            } message: {
                Text(error ?? "")
            }
        }
        .interactiveDismissDisabled()
        .onAppear {
            newPinLength = appPinLength
        }
    }

    // MARK: - Setup Flow (choose length + set, then confirm)

    private var setupFlow: some View {
        PinEntryView(
            title: step == .initial
                ? String(localized: "Create a PIN", comment: "PIN setup: first entry")
                : String(localized: "Confirm PIN", comment: "PIN setup: confirm entry"),
            subtitle: step == .initial
                ? String(localized: "Choose a \(newPinLength)-digit PIN to lock Trinote", comment: "PIN setup hint; the number is 4 or 6")
                : String(localized: "Enter the same PIN again", comment: "PIN confirm hint"),
            errorMessage: $entryError,
            pinLength: newPinLength,
            icon: .symbol(step == .initial ? "lock.fill" : "checkmark.shield.fill"),
            onComplete: { pin in
                switch step {
                case .initial:
                    firstEntry = pin
                    step = .confirm
                    return .advance
                case .confirm:
                    guard pin == firstEntry else {
                        firstEntry = ""
                        step = .initial
                        entryError = String(localized: "PINs didn't match. Try again.", comment: "PIN setup: confirm mismatch")
                        return .rejected
                    }
                    return await savePin(pin)
                }
            }
        ) {
            Picker(String(localized: "PIN length", comment: "PIN setup: length picker"), selection: $newPinLength) {
                ForEach(AppPinLength.options, id: \.self) { length in
                    Text(String(localized: "\(length) Digits", comment: "PIN setup: length option; the number is 4 or 6"))
                        .tag(length)
                }
            }
            .pickerStyle(.segmented)
            .frame(width: 220)
            // Keep its space on the confirm step so the keypad doesn't jump.
            .opacity(step == .initial ? 1 : 0)
            .disabled(step != .initial)
            .accessibilityHidden(step != .initial)
            .animation(.easeInOut(duration: 0.2), value: step)
        }
        .onChange(of: newPinLength) { _, _ in
            entryError = nil
        }
    }

    // MARK: - Remove Flow (verify current)

    private var removeFlow: some View {
        PinEntryView(
            title: String(localized: "Enter Current PIN", comment: "PIN remove: verify"),
            subtitle: String(localized: "Enter your current PIN to turn it off", comment: "PIN remove hint"),
            errorMessage: $entryError,
            pinLength: appPinLength,
            icon: .symbol("lock.open.fill"),
            onComplete: { pin in
                do {
                    guard try await keychain.verifyAppPin(pin) else {
                        entryError = String(localized: "Incorrect PIN", comment: "PIN entry: wrong PIN")
                        return .rejected
                    }
                    try await keychain.deleteAppPin()
                    appPinEnabled = false
                    appBiometricEnabled = false
                    onComplete()
                    dismiss()
                    return .done
                } catch {
                    self.error = error.localizedDescription
                    return .rejected
                }
            }
        )
    }

    // MARK: - Helpers

    private func savePin(_ pin: String) async -> PinEntryResult {
        do {
            try await keychain.saveAppPin(pin)
            appPinLength = pin.count
            appPinEnabled = true
            onComplete()
            dismiss()
            return .done
        } catch {
            firstEntry = ""
            step = .initial
            self.error = error.localizedDescription
            return .rejected
        }
    }
}
