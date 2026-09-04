import SwiftUI

/// Pick another signed-in instance and make it the active session.
struct SwitchUserSheet: View {
    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss

    @State private var profiles: [ServerProfile] = []
    @State private var isSwitching = false

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Text(
                        String(
                            localized: "Choose which signed-in instance to use. Notes, tabs, and sync belong to that instance.",
                            comment: "Switch user sheet explanation"
                        )
                    )
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                }

                Section(String(localized: "Instances", comment: "Switch user instance list")) {
                    if profiles.isEmpty {
                        Text(String(localized: "No signed-in instances.", comment: "Switch user empty"))
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(profiles, id: \.id) { profile in
                            instanceRow(profile)
                        }
                    }
                }
            }
            .navigationTitle(String(localized: "Switch user", comment: "Switch user sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Switch user cancel")) {
                        dismiss()
                    }
                    .disabled(isSwitching)
                }
            }
            .interactiveDismissDisabled(isSwitching)
            .overlay {
                if isSwitching {
                    ProgressView()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(.ultraThinMaterial)
                }
            }
        }
        .presentationDetents([.medium, .large])
        .onAppear(perform: loadProfiles)
    }

    @ViewBuilder
    private func instanceRow(_ profile: ServerProfile) -> some View {
        let isActive = profile.id == appState.activeProfile?.id
        Button {
            guard !isActive, !isSwitching else { return }
            let profileId = profile.id
            isSwitching = true
            dismiss()
            appState.scheduleActivateProfile(id: profileId)
        } label: {
            HStack(alignment: .center, spacing: 10) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(profile.name)
                        .foregroundStyle(.primary)
                    Text(profile.normalizedBaseURL)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
                Spacer()
                if isActive {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundStyle(Color.accentColor)
                        .accessibilityLabel(String(localized: "Current instance", comment: "Switch user: active row"))
                }
            }
        }
        .disabled(isActive || isSwitching)
    }

    private func loadProfiles() {
        profiles = (try? PersistenceManager.shared.fetchServerProfiles()) ?? []
    }
}
