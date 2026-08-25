import SwiftUI
import UIKit

// MARK: - Shared login form (main screen + Add Instance sheet)

private enum LoginFormField: Hashable {
    case displayName
    case serverURL
    case password
    case cloudflareClientId
    case cloudflareClientSecret
}

/// Header, server URL, password, Connect button, errors, and TOTP — shared by `LoginView` and `AddInstanceView`.
struct LoginFormContent: View {
    @Bindable var viewModel: AuthViewModel
    let appState: AppState
    /// When `true` (Add Instance sheet), block login if the URL matches an existing `ServerProfile`.
    var rejectIfServerAlreadyAdded: Bool = false
    @State private var isPasswordVisible = false
    @State private var showAdvanced = false
    @FocusState private var focusedField: LoginFormField?

    var body: some View {
        VStack(spacing: 24) {
            header
            serverForm
            credentialForm
            actionButtons
            advancedForm
        }
        .alert(String(localized: "Error", comment: "Login error"), isPresented: $viewModel.showError) {
            Button(String(localized: "OK", comment: "Dismiss alert")) { viewModel.showError = false }
        } message: {
            Text(viewModel.errorMessage ?? String(localized: "An unknown error occurred.", comment: "Generic error"))
        }
        .fullScreenCover(isPresented: $viewModel.isWaitingForSafariHandoff) {
            SSOSafariHandoffWaitingView(
                onOpenSafariAgain: { viewModel.reopenSSOSafari() },
                onCopySetupScript: {
                    UIPasteboard.general.string = TriliumSSOHandoff.handlerNoteSource
                },
                onCancel: { viewModel.cancelSSOLogin() }
            )
        }
        .sheet(isPresented: $viewModel.showTotpEntry) {
            TotpEntrySheet(viewModel: viewModel, appState: appState)
        }
        .toolbar {
            ToolbarItemGroup(placement: .keyboard) {
                Spacer()
                Button(String(localized: "Done", comment: "Dismiss keyboard")) {
                    focusedField = nil
                }
            }
        }
    }

    private var header: some View {
        VStack(spacing: 8) {
            Image("BootstrapAppIcon")
                .resizable()
                .scaledToFit()
                .frame(width: 72, height: 72)
                .accessibilityHidden(true)
            Text(String(localized: "Trinote", comment: "App name"))
                .font(.title.bold())
            Text(String(localized: "Same login as the Trilium web app (session, not ETAPI)", comment: "Login subtitle"))
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .padding(.top, 20)
    }

    private var serverForm: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(String(localized: "Server", comment: "Login section"))
                .font(.headline)

            TextField(String(localized: "Display name (optional)", comment: "Server field"), text: $viewModel.serverName)
                .textContentType(.organizationName)
                .textInputAutocapitalization(.words)
                .focused($focusedField, equals: .displayName)
                .accessibilityLabel(String(localized: "Server display name", comment: "VoiceOver"))

            HStack(spacing: 8) {
                Picker(String(localized: "Scheme", comment: "URL scheme picker"), selection: $viewModel.urlScheme) {
                    ForEach(AuthViewModel.URLScheme.allCases, id: \.self) { scheme in
                        Text(scheme.rawValue).tag(scheme)
                    }
                }
                .pickerStyle(.menu)
                .frame(width: 100)

                TextField(String(localized: "Server URL", comment: "Login field"), text: $viewModel.serverURL)
                    .textContentType(.URL)
                    .keyboardType(.URL)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .focused($focusedField, equals: .serverURL)
                    .accessibilityLabel(String(localized: "Server URL", comment: "VoiceOver"))
            }

            Text(String(localized: "e.g. trilium.example.com or 192.168.1.100:8080", comment: "URL hint"))
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .textFieldStyle(.roundedBorder)
    }

    private var credentialForm: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(String(localized: "Authentication", comment: "Login section"))
                .font(.headline)

            HStack {
                Group {
                    if isPasswordVisible {
                        TextField(String(localized: "Password", comment: "Login field"), text: $viewModel.password)
                            .textContentType(.password)
                            .autocorrectionDisabled()
                            .focused($focusedField, equals: .password)
                    } else {
                        SecureField(String(localized: "Password", comment: "Login field"), text: $viewModel.password)
                            .textContentType(.password)
                            .focused($focusedField, equals: .password)
                    }
                }
                .accessibilityLabel(String(localized: "Server password", comment: "VoiceOver"))

                Button {
                    isPasswordVisible.toggle()
                } label: {
                    Image(systemName: isPasswordVisible ? "eye.slash" : "eye")
                        .foregroundStyle(.secondary)
                        .accessibilityLabel(isPasswordVisible ? String(localized: "Hide password", comment: "VoiceOver") : String(localized: "Reveal password", comment: "VoiceOver"))
                }
            }

            Toggle(String(localized: "Stay signed in (Remember me)", comment: "Login toggle"), isOn: $viewModel.rememberMe)
                .font(.subheadline)

            Text(String(localized: "TOTP is supported for password sign-in.", comment: "Login hint"))
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .textFieldStyle(.roundedBorder)
    }

    private var advancedForm: some View {
        DisclosureGroup(String(localized: "Advanced", comment: "Login advanced section"), isExpanded: $showAdvanced) {
            VStack(alignment: .leading, spacing: 12) {
                Text(String(localized: "Optional. Required only if your Trilium server is behind Cloudflare Access / Zero Trust.", comment: "Cloudflare Access hint"))
                    .font(.caption)
                    .foregroundStyle(.secondary)

                TextField(
                    String(localized: "Cloudflare Access Client ID", comment: "Cloudflare Access field; header CF-Access-Client-Id"),
                    text: $viewModel.cloudflareClientId
                )
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .focused($focusedField, equals: .cloudflareClientId)
                .accessibilityLabel(String(localized: "Cloudflare Access Client ID", comment: "VoiceOver"))

                SecureField(
                    String(localized: "Cloudflare Access Client Secret", comment: "Cloudflare Access field; header CF-Access-Client-Secret"),
                    text: $viewModel.cloudflareClientSecret
                )
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .focused($focusedField, equals: .cloudflareClientSecret)
                .accessibilityLabel(String(localized: "Cloudflare Access Client Secret", comment: "VoiceOver"))
            }
            .padding(.top, 4)
        }
        .textFieldStyle(.roundedBorder)
    }

    private var actionButtons: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .center, spacing: 12) {
                Button {
                    focusedField = nil
                    viewModel.beginSSOLogin(appState: appState, rejectIfServerAlreadyAdded: rejectIfServerAlreadyAdded)
                } label: {
                    Group {
                        if viewModel.isLoading {
                            ProgressView()
                        } else {
                            Text(String(localized: "Sign in with SSO", comment: "SSO login button"))
                                .fontWeight(.semibold)
                                .multilineTextAlignment(.center)
                                .lineLimit(2)
                                .minimumScaleFactor(0.8)
                        }
                    }
                    .frame(maxWidth: .infinity, minHeight: 44)
                }
                .buttonStyle(.bordered)
                .controlSize(.large)
                .disabled(!viewModel.canSubmitSSO || viewModel.isLoading)
                .accessibilityLabel(String(localized: "Sign in with SSO", comment: "VoiceOver"))

                Button {
                    focusedField = nil
                    Task { await viewModel.login(appState: appState, rejectIfServerAlreadyAdded: rejectIfServerAlreadyAdded) }
                } label: {
                    Group {
                        if viewModel.isLoading {
                            ProgressView()
                                .tint(.white)
                        } else {
                            Text(String(localized: "Connect", comment: "Login button"))
                                .fontWeight(.semibold)
                                .lineLimit(1)
                                .minimumScaleFactor(0.85)
                        }
                    }
                    .frame(maxWidth: .infinity, minHeight: 44)
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .disabled(!viewModel.canSubmit || viewModel.isLoading)
                .accessibilityLabel(String(localized: "Connect to server", comment: "VoiceOver"))
            }

            Text(String(localized: "Opens Safari for Authelia, Authentik, Keycloak, and other providers (Face ID and security keys work). After your notes load, return here and tap Continue. Requires a one-time custom request handler on your server.", comment: "SSO login hint"))
                .font(.caption)
                .foregroundStyle(.secondary)
        }
    }
}

// MARK: - Add Instance (from Settings)

struct AddInstanceView: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(AppState.self) private var appState
    @State private var viewModel = AuthViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                LoginFormContent(viewModel: viewModel, appState: appState, rejectIfServerAlreadyAdded: true)
                    .padding()
            }
            .scrollDismissesKeyboard(.interactively)
            .navigationTitle(String(localized: "Add Instance", comment: "Sheet title: sign in to another server"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss add instance")) {
                        dismiss()
                    }
                }
            }
            .onAppear {
                viewModel.didFinishSuccessfulLogin = false
                viewModel.loadProfiles()
            }
            .onChange(of: viewModel.didFinishSuccessfulLogin) { _, finished in
                if finished { dismiss() }
            }
        }
    }
}

// MARK: - Main login

struct LoginView: View {
    @Environment(AppState.self) private var appState
    @State private var viewModel = AuthViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    LoginFormContent(viewModel: viewModel, appState: appState)
                    savedProfilesList
                }
                .padding()
            }
            .scrollDismissesKeyboard(.interactively)
            .navigationTitle(String(localized: "Connect", comment: "Login screen title"))
            .navigationBarTitleDisplayMode(.inline)
            .onAppear { viewModel.loadProfiles() }
        }
    }

    @ViewBuilder
    private var savedProfilesList: some View {
        if !viewModel.profiles.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                Text(String(localized: "Saved Servers", comment: "Login section"))
                    .font(.headline)

                ForEach(viewModel.profiles, id: \.id) { profile in
                    SavedProfileRow(
                        profile: profile,
                        isActive: profile.id == appState.activeProfile?.id,
                        onSelect: { viewModel.fillFromProfile(profile) },
                        onConnect: {
                            Task { await viewModel.connectToProfile(profile, appState: appState) }
                        },
                        onDelete: {
                            Task { await viewModel.deleteProfile(profile, appState: appState) }
                        }
                    )
                }
            }
        }
    }
}

// MARK: - TOTP Entry Sheet

private struct TotpEntrySheet: View {
    @Bindable var viewModel: AuthViewModel
    let appState: AppState
    @FocusState private var isTotpFocused: Bool

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                VStack(spacing: 8) {
                    Image(systemName: "lock.shield")
                        .font(.system(size: 48))
                        .foregroundStyle(.tint)
                        .accessibilityHidden(true)
                    Text(String(localized: "Two-Factor Authentication", comment: "TOTP sheet title"))
                        .font(.title2.bold())
                    Text(String(localized: "Enter the code from your authenticator app.", comment: "TOTP sheet subtitle"))
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding(.top, 20)

                TextField(String(localized: "6-digit code", comment: "TOTP field"), text: $viewModel.totpCode)
                    .keyboardType(.numberPad)
                    .textContentType(.oneTimeCode)
                    .multilineTextAlignment(.center)
                    .font(.title2.monospaced())
                    .textFieldStyle(.roundedBorder)
                    .frame(maxWidth: 200)
                    .focused($isTotpFocused)
                    .accessibilityLabel(String(localized: "TOTP code", comment: "VoiceOver"))
                    .onSubmit { submit() }
                    .onChange(of: viewModel.totpCode) { _, newValue in
                        let trimmed = newValue.trimmingCharacters(in: .whitespaces)
                        if trimmed.count == 6, trimmed.allSatisfy(\.isNumber) {
                            submit()
                        }
                    }

                Button {
                    submit()
                } label: {
                    Group {
                        if viewModel.isLoading {
                            ProgressView()
                                .tint(.white)
                        } else {
                            Text(String(localized: "Verify", comment: "TOTP submit button"))
                                .fontWeight(.semibold)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 10)
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .disabled(viewModel.totpCode.trimmingCharacters(in: .whitespaces).isEmpty || viewModel.isLoading)
                .accessibilityLabel(String(localized: "Verify TOTP code", comment: "VoiceOver"))

                Text(String(localized: "You can also enter a recovery code.", comment: "TOTP recovery hint"))
                    .font(.caption)
                    .foregroundStyle(.secondary)

                Spacer()
            }
            .padding()
            .navigationTitle(String(localized: "Verify Identity", comment: "TOTP nav title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "TOTP cancel")) {
                        viewModel.cancelTotp(appState: appState)
                    }
                }
            }
            .alert(String(localized: "Error", comment: "TOTP error"), isPresented: $viewModel.showError) {
                Button(String(localized: "OK", comment: "Dismiss alert")) { viewModel.showError = false }
            } message: {
                Text(viewModel.errorMessage ?? String(localized: "An unknown error occurred.", comment: "Generic error"))
            }
            .onAppear { isTotpFocused = true }
        }
        .interactiveDismissDisabled(viewModel.isLoading)
        .presentationDetents([.medium])
    }

    private func submit() {
        guard !viewModel.isLoading else { return }
        let trimmed = viewModel.totpCode.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        Task { await viewModel.submitTotp(appState: appState) }
    }
}

// MARK: - Saved Profile Row

private struct SavedProfileRow: View {
    let profile: ServerProfile
    let isActive: Bool
    let onSelect: () -> Void
    let onConnect: () -> Void
    let onDelete: () -> Void

    @State private var showDeleteConfirm = false

    var body: some View {
        HStack {
            Button(action: onSelect) {
                VStack(alignment: .leading, spacing: 2) {
                    HStack(spacing: 6) {
                        Text(profile.name)
                            .font(.body.weight(.medium))
                        if isActive {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundStyle(.green)
                                .font(.caption)
                                .accessibilityLabel(String(localized: "Active", comment: "Server profile active"))
                        }
                    }
                    Text(profile.normalizedBaseURL)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                    if profile.authMethod == .sso {
                        Text(String(localized: "SSO", comment: "Saved server uses SSO"))
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(String(localized: "Use \(profile.name) server", comment: "VoiceOver profile row"))
            .accessibilityHint(String(localized: "Fills server URL and name", comment: "VoiceOver hint"))

            Spacer()

            if !isActive {
                Button(
                    profile.authMethod == .sso
                        ? String(localized: "Sign in with SSO", comment: "Reconnect SSO profile")
                        : String(localized: "Connect", comment: "Login profile row"),
                    action: onConnect
                )
                .buttonStyle(.bordered)
                .controlSize(.small)
            }

            Button(role: .destructive) {
                showDeleteConfirm = true
            } label: {
                Image(systemName: "trash")
                    .font(.caption)
            }
            .buttonStyle(.bordered)
            .controlSize(.small)
            .accessibilityLabel(String(localized: "Remove server", comment: "VoiceOver"))
        }
        .padding(12)
        .background(.fill.quaternary, in: RoundedRectangle(cornerRadius: 10))
        .confirmationDialog(String(localized: "Remove \(profile.name)?", comment: "Remove profile confirm"), isPresented: $showDeleteConfirm) {
            Button(String(localized: "Remove Server", comment: "Remove profile"), role: .destructive, action: onDelete)
            Button(String(localized: "Cancel", comment: "Cancel remove profile"), role: .cancel) {}
        } message: {
            Text(String(localized: "This will remove the server profile and sign out. Your notes on the server will not be affected.", comment: "Remove profile message"))
        }
    }
}

// MARK: - Safari SSO waiting

private struct SSOSafariHandoffWaitingView: View {
    let onOpenSafariAgain: () -> Void
    let onCopySetupScript: () -> Void
    let onCancel: () -> Void

    @State private var didCopySetup = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    ProgressView()
                        .frame(maxWidth: .infinity)
                    Text(String(localized: "Complete sign-in in Safari", comment: "SSO Safari waiting title"))
                        .font(.title3.bold())
                        .frame(maxWidth: .infinity)
                    Text(String(localized: "Safari should open your SSO sign-in page. Finish Face ID or your provider there. When your notes load, return here and tap Continue.", comment: "SSO Safari waiting body"))
                        .font(.subheadline)
                        .foregroundStyle(.secondary)

                    Button(String(localized: "Continue", comment: "SSO reopen Safari after sign-in"), action: onOpenSafariAgain)
                        .buttonStyle(.borderedProminent)
                        .frame(maxWidth: .infinity)

                    VStack(alignment: .leading, spacing: 10) {
                        Text(String(localized: "First-time setup", comment: "SSO handoff setup heading"))
                            .font(.headline)
                        Text(String(localized: "If Safari says “No handler matched”, create a JS Backend note in Trilium, add the label below, paste the script, then try again.", comment: "SSO handoff setup steps"))
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                        Text("#customRequestHandler=trinote-sso-handoff")
                            .font(.footnote.monospaced())
                            .textSelection(.enabled)
                        Button {
                            onCopySetupScript()
                            didCopySetup = true
                        } label: {
                            Text(didCopySetup
                                 ? String(localized: "Copied handler script", comment: "SSO setup copied")
                                 : String(localized: "Copy handler script", comment: "SSO copy setup"))
                        }
                        .buttonStyle(.bordered)
                    }
                }
                .padding()
            }
            .navigationTitle(String(localized: "Sign in with SSO", comment: "SSO sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "SSO cancel"), action: onCancel)
                }
            }
        }
        .interactiveDismissDisabled()
    }
}

#Preview("Login") {
    LoginView()
        .environment(AppState())
}

#Preview("Add Instance") {
    AddInstanceView()
        .environment(AppState())
}
