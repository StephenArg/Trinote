import SwiftUI

struct LoginView: View {
    @Environment(AppState.self) private var appState
    @State private var viewModel = AuthViewModel()

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
            .navigationTitle("Connect")
            .alert("Error", isPresented: $viewModel.showError) {
                Button("OK") { viewModel.showError = false }
            } message: {
                Text(viewModel.errorMessage ?? "An unknown error occurred.")
            }
            .onAppear { viewModel.loadProfiles() }
        }
    }

    private var header: some View {
        VStack(spacing: 8) {
            Image(systemName: "note.text")
                .font(.system(size: 48))
                .foregroundStyle(.tint)
                .accessibilityHidden(true)
            Text("Trilium Notes")
                .font(.title.bold())
            Text("Connect to your self-hosted server")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .padding(.top, 20)
    }

    private var serverForm: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Server")
                .font(.headline)

            TextField("Display name (optional)", text: $viewModel.serverName)
                .textContentType(.organizationName)
                .textInputAutocapitalization(.words)
                .accessibilityLabel("Server display name")

            TextField("Server URL", text: $viewModel.serverURL)
                .textContentType(.URL)
                .keyboardType(.URL)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .accessibilityLabel("Server URL")

            Text("e.g. https://trilium.example.com or http://192.168.1.100:8080")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .textFieldStyle(.roundedBorder)
    }

    private var credentialForm: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Authentication")
                .font(.headline)

            Picker("Login method", selection: $viewModel.loginMode) {
                ForEach(AuthViewModel.LoginMode.allCases, id: \.self) { mode in
                    Text(mode.rawValue).tag(mode)
                }
            }
            .pickerStyle(.segmented)
            .accessibilityLabel("Authentication method")

            switch viewModel.loginMode {
            case .password:
                SecureField("Password", text: $viewModel.password)
                    .textContentType(.password)
                    .accessibilityLabel("Server password")
            case .token:
                SecureField("ETAPI Token", text: $viewModel.token)
                    .textContentType(.password)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .accessibilityLabel("ETAPI token")
                Text("Generate a token in Trilium → Options → ETAPI")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .textFieldStyle(.roundedBorder)
    }

    private var loginButton: some View {
        Button {
            Task { await viewModel.login(appState: appState) }
        } label: {
            Group {
                if viewModel.isLoading {
                    ProgressView()
                        .tint(.white)
                } else {
                    Text("Connect")
                        .fontWeight(.semibold)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 4)
        }
        .buttonStyle(.borderedProminent)
        .controlSize(.large)
        .disabled(!viewModel.canSubmit || viewModel.isLoading)
        .accessibilityLabel("Connect to server")
    }

    @ViewBuilder
    private var savedProfilesList: some View {
        if !viewModel.profiles.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                Text("Saved Servers")
                    .font(.headline)

                ForEach(viewModel.profiles, id: \.id) { profile in
                    SavedProfileRow(
                        profile: profile,
                        isActive: profile.id == appState.activeProfile?.id,
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

private struct SavedProfileRow: View {
    let profile: ServerProfile
    let isActive: Bool
    let onConnect: () -> Void
    let onDelete: () -> Void

    @State private var showDeleteConfirm = false

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 6) {
                    Text(profile.name)
                        .font(.body.weight(.medium))
                    if isActive {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundStyle(.green)
                            .font(.caption)
                            .accessibilityLabel("Active")
                    }
                }
                Text(profile.normalizedBaseURL)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }

            Spacer()

            if !isActive {
                Button("Connect", action: onConnect)
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
            .accessibilityLabel("Remove server")
        }
        .padding(12)
        .background(.fill.quaternary, in: RoundedRectangle(cornerRadius: 10))
        .confirmationDialog("Remove \(profile.name)?", isPresented: $showDeleteConfirm) {
            Button("Remove Server", role: .destructive, action: onDelete)
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("This will remove the server profile and sign out. Your notes on the server will not be affected.")
        }
    }
}

#Preview {
    LoginView()
        .environment(AppState())
}
