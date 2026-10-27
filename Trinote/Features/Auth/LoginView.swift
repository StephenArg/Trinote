import SwiftUI
import UIKit

// MARK: - Shared login form (main screen + Add Instance sheet)

private enum LoginFormField: Hashable {
    case serverURL
    case displayName
    case password
    case cloudflareClientId
    case cloudflareClientSecret
}

/// Corner radii and insets shared by the login cards, rows and buttons.
private enum LoginMetrics {
    static let cardRadius: CGFloat = 16
    static let buttonRadius: CGFloat = 14
    static let rowInset: CGFloat = 16
    /// Every field fills its row, so a tap anywhere on the row focuses it.
    static let rowHeight: CGFloat = 50
    static let iconWidth: CGFloat = 24
    static let iconSpacing: CGFloat = 12
    /// Dividers start under the field, not the icon.
    static let dividerInset: CGFloat = rowInset + iconWidth + iconSpacing
    /// Keeps the form readable in wide iPad windows.
    static let maxWidth: CGFloat = 520
}

/// Header, server URL, password, Connect / SSO buttons, errors, and TOTP — shared by `LoginView` and `AddInstanceView`.
struct LoginFormContent: View {
    @Bindable var viewModel: AuthViewModel
    let appState: AppState
    /// When `true` (Add Instance sheet), block login if the URL matches an existing `ServerProfile`.
    var rejectIfServerAlreadyAdded: Bool = false
    /// The Add Instance sheet has its own title, so it gets a smaller header without the app name.
    var compactHeader: Bool = false
    @State private var isPasswordVisible = false
    @State private var showAdvanced = false
    @FocusState private var focusedField: LoginFormField?

    var body: some View {
        VStack(spacing: 24) {
            LoginHero(compact: compactHeader)
            serverCard
            credentialsCard
            actionButtons
            advancedCard
        }
        .alert(String(localized: "Error", comment: "Login error"), isPresented: $viewModel.showError) {
            Button(String(localized: "OK", comment: "Dismiss alert")) { viewModel.showError = false }
        } message: {
            Text(viewModel.errorMessage ?? String(localized: "An unknown error occurred.", comment: "Generic error"))
        }
        .fullScreenCover(isPresented: ssoFlowPresented) {
            SSOFlowCover(viewModel: viewModel, appState: appState)
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
        .onChange(of: viewModel.serverURL) { _, _ in
            viewModel.serverURLDidChange()
        }
    }

    private var ssoFlowPresented: Binding<Bool> {
        Binding(
            get: { viewModel.ssoFlowPresentation != nil },
            set: { presented in
                if !presented {
                    viewModel.cancelSSOLogin()
                }
            }
        )
    }

    // MARK: Server

    private var serverCard: some View {
        LoginCard(
            title: String(localized: "Server", comment: "Login section"),
            footer: String(localized: "e.g. trilium.example.com or 192.168.1.100:8080", comment: "URL hint")
        ) {
            LoginFieldRow(systemImage: "server.rack") {
                Picker(String(localized: "Scheme", comment: "URL scheme picker"), selection: $viewModel.urlScheme) {
                    ForEach(AuthViewModel.URLScheme.allCases, id: \.self) { scheme in
                        Text(scheme.rawValue).tag(scheme)
                    }
                }
                .pickerStyle(.menu)
                .labelsHidden()
                .fixedSize()

                TextField(String(localized: "Server address", comment: "Login field placeholder"), text: $viewModel.serverURL)
                    .textContentType(.URL)
                    .keyboardType(.URL)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .submitLabel(.next)
                    .focused($focusedField, equals: .serverURL)
                    .onSubmit { focusedField = .displayName }
                    .loginFieldTapArea { focusedField = .serverURL }
                    .accessibilityLabel(String(localized: "Server URL", comment: "VoiceOver"))
            }

            LoginRowDivider()

            LoginFieldRow(systemImage: "tag") {
                TextField(String(localized: "Display name (optional)", comment: "Server field"), text: $viewModel.serverName)
                    .textContentType(.organizationName)
                    .textInputAutocapitalization(.words)
                    .submitLabel(.next)
                    .focused($focusedField, equals: .displayName)
                    .onSubmit { focusedField = .password }
                    .loginFieldTapArea { focusedField = .displayName }
                    .accessibilityLabel(String(localized: "Server display name", comment: "VoiceOver"))
            }
        }
    }

    // MARK: Credentials

    private var credentialsCard: some View {
        LoginCard(
            title: String(localized: "Sign In", comment: "Login section"),
            footer: String(localized: "Your Trilium password, not an ETAPI token. Two-factor codes are supported.", comment: "Login hint")
        ) {
            LoginFieldRow(systemImage: "lock") {
                passwordField

                Button {
                    isPasswordVisible.toggle()
                } label: {
                    Image(systemName: isPasswordVisible ? "eye.slash" : "eye")
                        .foregroundStyle(.secondary)
                        .frame(minWidth: 32, minHeight: 32)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(isPasswordVisible ? String(localized: "Hide password", comment: "VoiceOver") : String(localized: "Reveal password", comment: "VoiceOver"))
            }

            LoginRowDivider()

            LoginFieldRow(systemImage: "person.badge.clock") {
                Toggle(String(localized: "Stay signed in", comment: "Login toggle (Trilium's Remember me)"), isOn: $viewModel.rememberMe)
            }
        }
    }

    @ViewBuilder
    private var passwordField: some View {
        Group {
            if isPasswordVisible {
                TextField(String(localized: "Password", comment: "Login field"), text: $viewModel.password)
                    .textContentType(.password)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
            } else {
                SecureField(String(localized: "Password", comment: "Login field"), text: $viewModel.password)
                    .textContentType(.password)
            }
        }
        .submitLabel(.go)
        .focused($focusedField, equals: .password)
        .onSubmit {
            if viewModel.canSubmit, !viewModel.isLoading { connect() }
        }
        .loginFieldTapArea { focusedField = .password }
        .accessibilityLabel(String(localized: "Server password", comment: "VoiceOver"))
    }

    // MARK: Actions

    private var actionButtons: some View {
        VStack(spacing: 14) {
            Button(action: connect) {
                Text(String(localized: "Connect", comment: "Login button"))
                    .fontWeight(.semibold)
                    .frame(maxWidth: .infinity, minHeight: 50)
            }
            .buttonStyle(.borderedProminent)
            .buttonBorderShape(.roundedRectangle(radius: LoginMetrics.buttonRadius))
            .disabled(!viewModel.canSubmit || viewModel.isLoading)
            .accessibilityLabel(String(localized: "Connect to server", comment: "VoiceOver"))

            LoginOrDivider()

            VStack(spacing: 10) {
                Button(action: signInWithSSO) {
                    Label(String(localized: "Sign in with SSO", comment: "SSO login button"), systemImage: "person.badge.key")
                        .fontWeight(.semibold)
                        .frame(maxWidth: .infinity, minHeight: 50)
                }
                .buttonStyle(.bordered)
                .buttonBorderShape(.roundedRectangle(radius: LoginMetrics.buttonRadius))
                .disabled(!viewModel.canSubmitSSO || viewModel.isLoading)
                .accessibilityLabel(String(localized: "Sign in with SSO", comment: "VoiceOver"))

                Text(String(localized: "Opens Safari for Authelia, Authentik, Keycloak, and other providers (Face ID and security keys work). After your notes load, return here and tap Continue.", comment: "SSO login hint"))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 8)
            }
        }
    }

    private func connect() {
        focusedField = nil
        viewModel.startLogin(appState: appState, rejectIfServerAlreadyAdded: rejectIfServerAlreadyAdded)
    }

    private func signInWithSSO() {
        focusedField = nil
        viewModel.beginSSOLogin(appState: appState, rejectIfServerAlreadyAdded: rejectIfServerAlreadyAdded)
    }

    // MARK: Advanced (Cloudflare Access)

    private var advancedCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            VStack(spacing: 0) {
                Button {
                    withAnimation(.snappy(duration: 0.25)) { showAdvanced.toggle() }
                } label: {
                    HStack(spacing: LoginMetrics.iconSpacing) {
                        Image(systemName: "cloud")
                            .foregroundStyle(.tint)
                            .frame(width: LoginMetrics.iconWidth)
                            .accessibilityHidden(true)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(String(localized: "Advanced", comment: "Login advanced section"))
                            Text(String(localized: "Cloudflare Access / Zero Trust", comment: "Login advanced section subtitle"))
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        Spacer(minLength: 8)
                        Image(systemName: "chevron.down")
                            .font(.footnote.weight(.semibold))
                            .foregroundStyle(.tertiary)
                            .rotationEffect(.degrees(showAdvanced ? 180 : 0))
                            .accessibilityHidden(true)
                    }
                    .padding(.horizontal, LoginMetrics.rowInset)
                    .frame(minHeight: 56)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityHint(String(localized: "Shows the Cloudflare Access fields", comment: "VoiceOver"))

                if showAdvanced {
                    LoginRowDivider()

                    LoginFieldRow(systemImage: "person.text.rectangle") {
                        TextField(
                            String(localized: "Cloudflare Access Client ID", comment: "Cloudflare Access field; header CF-Access-Client-Id"),
                            text: $viewModel.cloudflareClientId
                        )
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .submitLabel(.next)
                        .focused($focusedField, equals: .cloudflareClientId)
                        .onSubmit { focusedField = .cloudflareClientSecret }
                        .loginFieldTapArea { focusedField = .cloudflareClientId }
                        .accessibilityLabel(String(localized: "Cloudflare Access Client ID", comment: "VoiceOver"))
                    }

                    LoginRowDivider()

                    LoginFieldRow(systemImage: "key") {
                        SecureField(
                            String(localized: "Cloudflare Access Client Secret", comment: "Cloudflare Access field; header CF-Access-Client-Secret"),
                            text: $viewModel.cloudflareClientSecret
                        )
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .submitLabel(.done)
                        .focused($focusedField, equals: .cloudflareClientSecret)
                        .onSubmit { focusedField = nil }
                        .loginFieldTapArea { focusedField = .cloudflareClientSecret }
                        .accessibilityLabel(String(localized: "Cloudflare Access Client Secret", comment: "VoiceOver"))
                    }
                }
            }
            .background(LoginCardBackground())

            if showAdvanced {
                Text(String(localized: "Optional. Required only if your Trilium server is behind Cloudflare Access / Zero Trust.", comment: "Cloudflare Access hint"))
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, LoginMetrics.rowInset)
            }
        }
    }
}

// MARK: - Building blocks

/// App mark with a soft glow in the icon's own colors, the app name and a one-line invitation.
private struct LoginHero: View {
    var compact: Bool

    private var iconSize: CGFloat { compact ? 56 : 88 }

    var body: some View {
        VStack(spacing: compact ? 8 : 12) {
            ZStack {
                Image("BootstrapAppIcon")
                    .resizable()
                    .scaledToFit()
                    .frame(width: iconSize, height: iconSize)
                    .scaleEffect(1.3)
                    .blur(radius: compact ? 14 : 22)
                    .opacity(0.5)
                Image("BootstrapAppIcon")
                    .resizable()
                    .scaledToFit()
                    .frame(width: iconSize, height: iconSize)
            }
            .padding(.bottom, compact ? 0 : 4)
            .accessibilityHidden(true)

            if !compact {
                Text(String(localized: "Trinote", comment: "App name"))
                    .font(.largeTitle.bold())
            }

            Text(compact
                 ? String(localized: "Sign in to another Trilium server.", comment: "Add Instance subtitle")
                 : String(localized: "Sign in to your Trilium server.", comment: "Login subtitle"))
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, compact ? 4 : 16)
    }
}

/// Grouped-style card: uppercase caption title, rows on a raised background, footnote under it.
private struct LoginCard<Content: View>: View {
    var title: String? = nil
    var footer: String? = nil
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let title {
                Text(title)
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(.secondary)
                    .textCase(.uppercase)
                    .padding(.horizontal, LoginMetrics.rowInset)
            }

            VStack(spacing: 0) {
                content
            }
            .background(LoginCardBackground())

            if let footer {
                Text(footer)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, LoginMetrics.rowInset)
            }
        }
    }
}

private struct LoginCardBackground: View {
    var body: some View {
        RoundedRectangle(cornerRadius: LoginMetrics.cardRadius, style: .continuous)
            .fill(Color(.secondarySystemGroupedBackground))
    }
}

/// One row of a card: a tinted symbol, then the field(s).
private struct LoginFieldRow<Field: View>: View {
    let systemImage: String
    @ViewBuilder let field: Field

    var body: some View {
        HStack(spacing: LoginMetrics.iconSpacing) {
            Image(systemName: systemImage)
                .font(.body)
                .foregroundStyle(.tint)
                .frame(width: LoginMetrics.iconWidth)
                .accessibilityHidden(true)
            field
        }
        .padding(.horizontal, LoginMetrics.rowInset)
        .frame(minHeight: LoginMetrics.rowHeight)
    }
}

private extension View {
    /// Lets a tap anywhere on the field's row focus it, like a bordered field would. SwiftUI keeps the UIKit text
    /// field one text line tall whatever frame it gets, so the row itself has to hand the tap over to focus.
    func loginFieldTapArea(focus: @escaping () -> Void) -> some View {
        frame(maxWidth: .infinity, minHeight: LoginMetrics.rowHeight)
            .contentShape(Rectangle())
            .onTapGesture(perform: focus)
    }
}

private struct LoginRowDivider: View {
    var inset: CGFloat = LoginMetrics.dividerInset

    var body: some View {
        Divider()
            .padding(.leading, inset)
    }
}

private struct LoginOrDivider: View {
    var body: some View {
        HStack(spacing: 12) {
            Rectangle()
                .fill(.separator)
                .frame(height: 1)
            Text(String(localized: "or", comment: "Between the Connect and SSO buttons"))
                .font(.footnote)
                .foregroundStyle(.secondary)
            Rectangle()
                .fill(.separator)
                .frame(height: 1)
        }
        .padding(.horizontal, 8)
        .accessibilityHidden(true)
    }
}

private extension View {
    /// The full-screen connecting page over this view while the view model signs in or reconnects.
    func connectingOverlay(_ viewModel: AuthViewModel) -> some View {
        overlay {
            if let connecting = viewModel.connecting {
                ConnectingView(state: connecting, onCancel: { viewModel.cancelConnecting() })
                    .transition(.opacity)
            }
        }
        .animation(.easeInOut(duration: 0.25), value: viewModel.connecting)
    }
}

// MARK: - SSO flow cover (setup warning → Safari waiting → connecting)

private struct SSOFlowCover: View {
    @Bindable var viewModel: AuthViewModel
    let appState: AppState

    var body: some View {
        if let connecting = viewModel.connecting {
            ConnectingView(state: connecting)
        } else {
            switch viewModel.ssoFlowPresentation {
            case .setupWarning:
                SSOSetupWarningView(
                    onContinue: { skipFutureWarnings in
                        viewModel.confirmSSOSetupWarning(appState: appState, skipFutureWarnings: skipFutureWarnings)
                    },
                    onCancel: { viewModel.cancelSSOLogin() }
                )
            case .waitingForSafari, nil:
                SSOSafariHandoffWaitingView(
                    onOpenSafariAgain: { viewModel.reopenSSOSafari() },
                    onCopySetupScript: {
                        UIPasteboard.general.string = TriliumSSOHandoff.handlerNoteSource
                    },
                    onCancel: { viewModel.cancelSSOLogin() }
                )
            }
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
                LoginFormContent(viewModel: viewModel, appState: appState, rejectIfServerAlreadyAdded: true, compactHeader: true)
                    .padding(.horizontal)
                    .padding(.bottom, 32)
                    .frame(maxWidth: LoginMetrics.maxWidth)
                    .frame(maxWidth: .infinity)
            }
            .background(Color(.systemGroupedBackground))
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
                viewModel.connecting = nil
                viewModel.loadProfiles()
            }
            .onChange(of: viewModel.didFinishSuccessfulLogin) { _, finished in
                if finished { dismiss() }
            }
        }
        .connectingOverlay(viewModel)
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
                .padding(.horizontal)
                .padding(.bottom, 32)
                .frame(maxWidth: LoginMetrics.maxWidth)
                .frame(maxWidth: .infinity)
            }
            .background(Color(.systemGroupedBackground))
            .scrollDismissesKeyboard(.interactively)
            .toolbar(.hidden, for: .navigationBar)
            .onAppear { viewModel.loadProfiles() }
        }
        .connectingOverlay(viewModel)
    }

    @ViewBuilder
    private var savedProfilesList: some View {
        if !viewModel.profiles.isEmpty {
            LoginCard(title: String(localized: "Saved Servers", comment: "Login section")) {
                ForEach(Array(viewModel.profiles.enumerated()), id: \.element.id) { index, profile in
                    if index > 0 {
                        LoginRowDivider(inset: LoginMetrics.rowInset + 36 + LoginMetrics.iconSpacing)
                    }
                    SavedProfileRow(
                        profile: profile,
                        isActive: profile.id == appState.activeProfile?.id,
                        onSelect: { viewModel.fillFromProfile(profile) },
                        onConnect: { viewModel.startConnect(to: profile, appState: appState) },
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
                    .padding(.vertical, 12)
                    .padding(.horizontal, 16)
                    .background(LoginCardBackground())
                    .frame(maxWidth: 240)
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
                    .frame(maxWidth: .infinity, minHeight: 50)
                }
                .buttonStyle(.borderedProminent)
                .buttonBorderShape(.roundedRectangle(radius: LoginMetrics.buttonRadius))
                .disabled(viewModel.totpCode.trimmingCharacters(in: .whitespaces).isEmpty || viewModel.isLoading)
                .accessibilityLabel(String(localized: "Verify TOTP code", comment: "VoiceOver"))

                Text(String(localized: "You can also enter a recovery code.", comment: "TOTP recovery hint"))
                    .font(.caption)
                    .foregroundStyle(.secondary)

                Spacer()
            }
            .padding()
            .frame(maxWidth: LoginMetrics.maxWidth)
            .frame(maxWidth: .infinity)
            .background(Color(.systemGroupedBackground))
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
        HStack(spacing: LoginMetrics.iconSpacing) {
            Button(action: onSelect) {
                HStack(spacing: LoginMetrics.iconSpacing) {
                    ZStack {
                        Circle()
                            .fill(.tint.opacity(0.15))
                        Image(systemName: "server.rack")
                            .font(.body)
                            .foregroundStyle(.tint)
                    }
                    .frame(width: 36, height: 36)
                    .accessibilityHidden(true)

                    VStack(alignment: .leading, spacing: 2) {
                        HStack(spacing: 6) {
                            Text(profile.name)
                                .font(.body.weight(.medium))
                                .lineLimit(1)
                            if profile.authMethod == .sso {
                                Text(String(localized: "SSO", comment: "Saved server uses SSO"))
                                    .font(.caption2.weight(.semibold))
                                    .foregroundStyle(.secondary)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(.fill.tertiary, in: Capsule())
                            }
                        }
                        Text(AuthViewModel.displayAddress(profile.normalizedBaseURL))
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                            .truncationMode(.middle)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(String(localized: "Use \(profile.name) server", comment: "VoiceOver profile row"))
            .accessibilityHint(String(localized: "Fills server URL and name", comment: "VoiceOver hint"))

            if isActive {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundStyle(.green)
                    .accessibilityLabel(String(localized: "Active", comment: "Server profile active"))
            } else {
                Button(String(localized: "Connect", comment: "Login profile row"), action: onConnect)
                    .buttonStyle(.borderedProminent)
                    .buttonBorderShape(.capsule)
                    .controlSize(.small)
                    .fontWeight(.semibold)
            }

            Menu {
                Button(action: onSelect) {
                    Label(String(localized: "Fill In Details", comment: "Saved server menu: copy its URL and name into the form"), systemImage: "square.and.pencil")
                }
                Button(role: .destructive) {
                    showDeleteConfirm = true
                } label: {
                    Label(String(localized: "Remove Server", comment: "Remove profile"), systemImage: "trash")
                }
            } label: {
                Image(systemName: "ellipsis.circle")
                    .font(.title3)
                    .foregroundStyle(.secondary)
                    .frame(minWidth: 32, minHeight: 32)
                    .contentShape(Rectangle())
            }
            .accessibilityLabel(String(localized: "Server options", comment: "VoiceOver: saved server menu"))
        }
        .padding(.horizontal, LoginMetrics.rowInset)
        .padding(.vertical, 10)
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

                    Button(action: onOpenSafariAgain) {
                        Text(String(localized: "Continue", comment: "SSO reopen Safari after sign-in"))
                            .fontWeight(.semibold)
                            .frame(maxWidth: .infinity, minHeight: 50)
                    }
                    .buttonStyle(.borderedProminent)
                    .buttonBorderShape(.roundedRectangle(radius: LoginMetrics.buttonRadius))

                    VStack(alignment: .leading, spacing: 10) {
                        Label(
                            String(localized: "If Safari says “No handler matched”", comment: "SSO waiting troubleshooting heading"),
                            systemImage: "wrench.and.screwdriver"
                        )
                        .font(.subheadline.weight(.semibold))
                        Text(String(localized: "The JS Backend handler is missing on Trilium. Create that note, add the label below, paste the script, then tap Continue.", comment: "SSO waiting troubleshooting body"))
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
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(.fill.quaternary, in: RoundedRectangle(cornerRadius: 12))
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
