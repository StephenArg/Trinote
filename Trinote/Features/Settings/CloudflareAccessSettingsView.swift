import SwiftUI

struct CloudflareAccessSettingsView: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(AppState.self) private var appState

    let profile: ServerProfile

    @State private var clientId = ""
    @State private var clientSecret = ""
    @State private var hasStoredSecret = false
    @State private var isSaving = false
    @State private var errorMessage: String?
    @State private var showError = false

    private let keychain = KeychainManager.shared

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Text(String(
                        localized: "These optional headers let Trinote reach a Trilium server protected by Cloudflare Access / Zero Trust.",
                        comment: "Cloudflare Access settings intro"
                    ))
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                }

                Section(String(localized: "Cloudflare Access", comment: "Settings section")) {
                    TextField(
                        String(localized: "Cloudflare Access Client ID", comment: "Cloudflare Access field; header CF-Access-Client-Id"),
                        text: $clientId
                    )
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()

                    SecureField(
                        String(localized: "Cloudflare Access Client Secret", comment: "Cloudflare Access field; header CF-Access-Client-Secret"),
                        text: $clientSecret
                    )
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()

                    if hasStoredSecret && clientSecret.isEmpty {
                        Text(String(
                            localized: "A client secret is saved. Enter a new secret only to change it, or clear both fields to remove Cloudflare Access headers.",
                            comment: "Cloudflare Access secret hint"
                        ))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    }
                }
            }
            .navigationTitle(String(localized: "Cloudflare Access", comment: "Cloudflare Access settings title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss sheet")) {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Save", comment: "Save Cloudflare Access settings")) {
                        Task { await save() }
                    }
                    .disabled(isSaving)
                }
            }
            .task { await loadExisting() }
            .alert(String(localized: "Error", comment: "Settings error"), isPresented: $showError) {
                Button(String(localized: "OK", comment: "Dismiss alert")) { showError = false }
            } message: {
                Text(errorMessage ?? String(localized: "An unknown error occurred.", comment: "Generic error"))
            }
        }
    }

    private func loadExisting() async {
        hasStoredSecret = await appState.hasCloudflareAccessCredentials(for: profile)
        if let existing = try? await keychain.loadCloudflareAccessCredentials(forServer: profile.id) {
            clientId = existing.clientId
        }
    }

    private func save() async {
        isSaving = true
        defer { isSaving = false }

        let trimmedId = clientId.trimmingCharacters(in: .whitespacesAndNewlines)
        let trimmedSecret = clientSecret.trimmingCharacters(in: .whitespacesAndNewlines)
        let effectiveSecret: String
        if trimmedSecret.isEmpty, hasStoredSecret {
            if let existing = try? await keychain.loadCloudflareAccessCredentials(forServer: profile.id) {
                effectiveSecret = existing.clientSecret
            } else {
                effectiveSecret = ""
            }
        } else {
            effectiveSecret = trimmedSecret
        }

        if let validationError = CloudflareAccessValidation.errorMessage(clientId: trimmedId, clientSecret: effectiveSecret) {
            errorMessage = validationError
            showError = true
            return
        }

        do {
            if trimmedId.isEmpty && effectiveSecret.isEmpty {
                try await keychain.saveCloudflareAccessCredentials(nil, forServer: profile.id)
            } else {
                let credentials = CloudflareAccessCredentials(clientId: trimmedId, clientSecret: effectiveSecret)
                try await keychain.saveCloudflareAccessCredentials(credentials, forServer: profile.id)
            }

            if profile.id == appState.activeProfile?.id {
                await appState.rebuildActiveClientIfNeeded()
            }
            dismiss()
        } catch {
            errorMessage = error.localizedDescription
            showError = true
        }
    }
}
