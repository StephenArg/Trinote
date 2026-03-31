import SwiftUI

struct PinSetupSheet: View {
    /// `true` when PIN is currently enabled (flow = verify to remove).
    let isCurrentlyEnabled: Bool
    let onComplete: () -> Void

    @Environment(\.dismiss) private var dismiss
    @AppStorage("appPinEnabled") private var appPinEnabled = false

    @State private var step: Step = .initial
    @State private var firstEntry = ""
    @State private var triggerShake = false
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
    }

    // MARK: - Setup Flow (set + confirm)

    @ViewBuilder
    private var setupFlow: some View {
        switch step {
        case .initial:
            ManagedPinEntryView(
                title: String(localized: "Set PIN", comment: "PIN setup: first entry"),
                subtitle: String(localized: "Enter a 4-digit PIN", comment: "PIN setup hint"),
                onComplete: { pin in
                    firstEntry = pin
                    step = .confirm
                },
                triggerShake: $triggerShake
            )
            .navigationTitle(String(localized: "Set PIN", comment: "PIN setup nav title"))
            .navigationBarTitleDisplayMode(.inline)

        case .confirm:
            ManagedPinEntryView(
                title: String(localized: "Confirm PIN", comment: "PIN setup: confirm entry"),
                subtitle: String(localized: "Re-enter your PIN", comment: "PIN confirm hint"),
                onComplete: { pin in
                    if pin == firstEntry {
                        savePin(pin)
                    } else {
                        firstEntry = ""
                        step = .initial
                        triggerShake = true
                    }
                },
                triggerShake: $triggerShake
            )
            .navigationTitle(String(localized: "Confirm PIN", comment: "PIN confirm nav title"))
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    // MARK: - Remove Flow (verify current)

    private var removeFlow: some View {
        ManagedPinEntryView(
            title: String(localized: "Enter PIN", comment: "PIN remove: verify"),
            subtitle: String(localized: "Enter your current PIN to remove it", comment: "PIN remove hint"),
            onComplete: { pin in
                Task {
                    do {
                        let match = try await keychain.verifyAppPin(pin)
                        if match {
                            try await keychain.deleteAppPin()
                            appPinEnabled = false
                            onComplete()
                            dismiss()
                        } else {
                            triggerShake = true
                        }
                    } catch {
                        self.error = error.localizedDescription
                    }
                }
            },
            triggerShake: $triggerShake
        )
        .navigationTitle(String(localized: "Remove PIN", comment: "PIN remove nav title"))
        .navigationBarTitleDisplayMode(.inline)
    }

    // MARK: - Helpers

    private func savePin(_ pin: String) {
        Task {
            do {
                try await keychain.saveAppPin(pin)
                appPinEnabled = true
                onComplete()
                dismiss()
            } catch {
                self.error = error.localizedDescription
            }
        }
    }
}
