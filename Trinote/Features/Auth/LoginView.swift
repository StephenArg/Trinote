import SwiftUI

struct LoginView: View {
    private enum Field: Hashable {
        case displayName
        case serverURL
        case password
    }

    @Environment(AppState.self) private var appState
    @State private var viewModel = AuthViewModel()
    @State private var isPasswordVisible = false
    @FocusState private var focusedField: Field?

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    header
                    serverForm
                    credentialForm
                    loginButton
                    savedProfilesList
                }
                .padding()
            }
            .scrollDismissesKeyboard(.interactively)
            .navigationTitle(String(localized: "Connect", comment: "Login screen title"))
            .navigationBarTitleDisplayMode(.inline)
            .alert(String(localized: "Error", comment: "Login error"), isPresented: $viewModel.showError) {
                Button(String(localized: "OK", comment: "Dismiss alert")) { viewModel.showError = false }
            } message: {
                Text(viewModel.errorMessage ?? String(localized: "An unknown error occurred.", comment: "Generic error"))
            }
            .sheet(isPresented: $viewModel.showTotpEntry) {
                TotpEntrySheet(viewModel: viewModel, appState: appState)
            }
            .onAppear { viewModel.loadProfiles() }
            .toolbar {
                ToolbarItemGroup(placement: .keyboard) {
                    Spacer()
                    Button(String(localized: "Done", comment: "Dismiss keyboard")) {
                        focusedField = nil
                    }
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

            Text(String(localized: "TOTP is supported. SSO must be completed in the browser.", comment: "Login hint"))
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .textFieldStyle(.roundedBorder)
    }

    private var loginButton: some View {
        Button {
            focusedField = nil
            Task { await viewModel.login(appState: appState) }
        } label: {
            Group {
                if viewModel.isLoading {
                    ProgressView()
                        .tint(.white)
                } else {
                    Text(String(localized: "Connect", comment: "Login button"))
                        .fontWeight(.semibold)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 10)
        }
        .buttonStyle(.borderedProminent)
        .controlSize(.large)
        .disabled(!viewModel.canSubmit || viewModel.isLoading)
        .accessibilityLabel(String(localized: "Connect to server", comment: "VoiceOver"))
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
                        viewModel.cancelTotp()
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
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(String(localized: "Use \(profile.name) server", comment: "VoiceOver profile row"))
            .accessibilityHint(String(localized: "Fills server URL and name", comment: "VoiceOver hint"))

            Spacer()

            if !isActive {
                Button(String(localized: "Connect", comment: "Login profile row"), action: onConnect)
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

#Preview {
    LoginView()
        .environment(AppState())
}
