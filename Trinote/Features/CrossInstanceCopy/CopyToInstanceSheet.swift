import SwiftUI

/// Pick a signed-in instance and copy the current note (optionally with subnotes) to its tree root.
struct CopyToInstanceSheet: View {
    let note: NoteItem
    let sourceClient: (any TriliumClientProtocol)?

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss

    @State private var destinations: [ServerProfile] = []
    @State private var selectedProfileId: String?
    @State private var includeSubtree = false
    @State private var isWorking = false
    @State private var progressCopied = 0
    @State private var progressTotal = 0
    @State private var errorMessage: String?
    @State private var successPayload: SuccessPayload?
    @State private var isSwitching = false

    private struct SuccessPayload: Identifiable {
        let id = UUID()
        let destProfileId: String
        let destName: String
        let copiedCount: Int
        let skippedProtectedCount: Int
    }

    private var selectedProfile: ServerProfile? {
        destinations.first { $0.id == selectedProfileId }
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Text(
                        String(
                            localized: "The copy will appear at the top of the destination instance’s note tree. You will stay on this instance.",
                            comment: "Copy to instance explanation"
                        )
                    )
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                }

                Section(String(localized: "Destination", comment: "Copy to instance destination section")) {
                    if destinations.isEmpty {
                        Text(String(localized: "No other signed-in instances.", comment: "Copy to instance empty dest"))
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(destinations, id: \.id) { profile in
                            Button {
                                selectedProfileId = profile.id
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
                                    if selectedProfileId == profile.id {
                                        Image(systemName: "checkmark.circle.fill")
                                            .foregroundStyle(Color.accentColor)
                                    }
                                }
                            }
                        }
                    }
                }

                if note.hasChildren {
                    Section {
                        Toggle(
                            String(localized: "Include all subnotes", comment: "Copy to instance subtree toggle"),
                            isOn: $includeSubtree
                        )
                    } footer: {
                        Text(
                            String(
                                localized: "When off, only this note is copied. When on, the full subtree is recreated on the destination.",
                                comment: "Copy to instance subtree footer"
                            )
                        )
                    }
                }

                if isWorking {
                    Section {
                        HStack(spacing: 12) {
                            ProgressView()
                            if progressTotal > 0 {
                                Text(
                                    String(
                                        format: String(
                                            localized: "Copying %lld of %lld…",
                                            comment: "Copy to instance progress"
                                        ),
                                        locale: .current,
                                        progressCopied,
                                        progressTotal
                                    )
                                )
                            } else {
                                Text(String(localized: "Preparing…", comment: "Copy to instance preparing"))
                            }
                        }
                    }
                }

                if let errorMessage {
                    Section {
                        Text(errorMessage)
                            .foregroundStyle(.red)
                    }
                }
            }
            .navigationTitle(String(localized: "Copy to Instance", comment: "Copy to instance sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss sheet")) {
                        dismiss()
                    }
                    .disabled(isWorking || isSwitching)
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Copy", comment: "Copy to instance confirm")) {
                        Task { await performCopy() }
                    }
                    .disabled(isWorking || isSwitching || selectedProfile == nil)
                }
            }
            .onAppear {
                loadDestinations()
            }
            .alert(
                String(localized: "Copied", comment: "Copy to instance success title"),
                isPresented: Binding(
                    get: { successPayload != nil },
                    set: { if !$0 { successPayload = nil } }
                )
            ) {
                Button(String(localized: "OK", comment: "Dismiss copy success"), role: .cancel) {
                    dismiss()
                }
                Button(String(localized: "Switch to Instance", comment: "Copy success: activate dest profile")) {
                    // Capture before the alert binding clears `successPayload` on dismiss.
                    let profileId = successPayload?.destProfileId ?? selectedProfileId
                    successPayload = nil
                    isSwitching = true
                    dismiss()
                    if let profileId {
                        appState.scheduleActivateProfile(id: profileId)
                    }
                }
            } message: {
                if let successPayload {
                    Text(successMessage(successPayload))
                }
            }
        }
        .interactiveDismissDisabled(isWorking || isSwitching)
    }

    private func loadDestinations() {
        let others = PersistenceManager.shared.otherServerProfiles(excluding: appState.activeProfile?.id)
        destinations = others
        if others.count == 1 {
            selectedProfileId = others[0].id
        }
    }

    private func successMessage(_ payload: SuccessPayload) -> String {
        var text = String(
            format: String(
                localized: "Copied %lld note(s) to “%@”. Open that instance to see them at the top of the tree.",
                comment: "Copy to instance success; count then instance name"
            ),
            locale: .current,
            payload.copiedCount,
            payload.destName
        )
        if payload.skippedProtectedCount > 0 {
            text += " "
            text += String(
                format: String(
                    localized: "Skipped %lld protected note(s).",
                    comment: "Copy to instance skipped protected count"
                ),
                locale: .current,
                payload.skippedProtectedCount
            )
        }
        return text
    }

    private func performCopy() async {
        guard let dest = selectedProfile else { return }
        guard let sourceProfileId = appState.activeProfile?.id else {
            errorMessage = String(localized: "No active server profile.", comment: "Copy to instance no source profile")
            return
        }
        isWorking = true
        errorMessage = nil
        progressCopied = 0
        progressTotal = 0
        defer { isWorking = false }

        do {
            let snap = try await CrossInstanceNoteCopyService.snapshot(
                sourceNoteId: note.noteId,
                includeSubtree: includeSubtree && note.hasChildren,
                sourceClient: sourceClient,
                persistence: PersistenceManager.shared,
                sourceProfileId: sourceProfileId,
                protectedSessionActive: appState.protectedSessionActive
            )
            progressTotal = snap.noteCount
            let destClient: TriliumClient
            do {
                destClient = try await appState.makeRestoredClient(for: dest)
            } catch {
                errorMessage = reconnectMessage(for: dest.name, error: error)
                return
            }
            let result = try await CrossInstanceNoteCopyService.recreate(
                snap,
                destClient: destClient,
                destParentNoteId: TriliumTreeConstants.rootNoteId,
                progress: { copied, total in
                    progressCopied = copied
                    progressTotal = total
                }
            )
            successPayload = SuccessPayload(
                destProfileId: dest.id,
                destName: dest.name,
                copiedCount: result.copiedCount,
                skippedProtectedCount: result.skippedProtectedCount
            )
        } catch {
            errorMessage = mapCopyError(error, destName: dest.name)
        }
    }

    private func reconnectMessage(for destName: String, error: Error) -> String {
        let api = APIError.from(error)
        if api.isAuthError {
            return String(
                format: String(
                    localized: "Reconnect to “%@” in Settings, then try again.",
                    comment: "Copy to instance dest session expired; %@ instance name"
                ),
                locale: .current,
                destName
            )
        }
        return api.localizedDescription
    }

    private func mapCopyError(_ error: Error, destName: String) -> String {
        if let copy = error as? CrossInstanceNoteCopyService.CopyError {
            return copy.localizedDescription
        }
        return reconnectMessage(for: destName, error: error)
    }

}
