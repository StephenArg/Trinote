import SwiftUI

/// Sender sheet: browse nearby Trinote devices in receive mode and offer the current note.
struct ShareLocallyView: View {
    let note: NoteItem
    let client: (any TriliumClientProtocol)?

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss

    @State private var isWorking = false
    @State private var errorMessage: String?
    @State private var didConnect = false

    private var transfer: LocalNoteTransferService { appState.localTransfer }

    private var selectedPeer: LocalTransferPeer? { transfer.selectedPeer }

    private var compatibility: LocalNoteTransferCompatibility.Result {
        guard let peer = selectedPeer else {
            return LocalNoteTransferCompatibility.Result(allowed: false, reason: nil)
        }
        return LocalNoteTransferCompatibility.canSend(note: note, receiverServerInfo: peer.serverInfo)
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Text(
                        String(
                            localized: "Ask the other person to open Notes, tap ⋯, and turn on “Receive note locally”. Their device will appear below when ready.",
                            comment: "Share locally instructions"
                        )
                    )
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                }

                Section(String(localized: "Nearby receivers", comment: "Share locally peer list")) {
                    if transfer.discoveredPeers.isEmpty {
                        HStack {
                            ProgressView()
                            Text(String(localized: "Searching…", comment: "Share locally browsing"))
                                .foregroundStyle(.secondary)
                        }
                    } else {
                        ForEach(transfer.discoveredPeers) { peer in
                            Button {
                                transfer.selectPeer(peer)
                                didConnect = false
                            } label: {
                                HStack {
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(peer.displayName)
                                            .foregroundStyle(.primary)
                                        if let info = peer.serverInfo {
                                            Text(
                                                String(
                                                    format: String(
                                                        localized: "Trilium %@",
                                                        comment: "Share locally peer server version. %@ version."
                                                    ),
                                                    info.appVersion
                                                )
                                            )
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                        } else {
                                            Text(String(localized: "Connecting for server version…", comment: "Share locally peer pending hello"))
                                                .font(.caption)
                                                .foregroundStyle(.secondary)
                                        }
                                    }
                                    Spacer()
                                    if transfer.selectedPeer?.id == peer.id {
                                        Image(systemName: "checkmark.circle.fill")
                                            .foregroundStyle(Color.accentColor)
                                    }
                                }
                            }
                        }
                    }
                }

                if let peer = selectedPeer {
                    Section(String(localized: "Compatible with receiver ✅", comment: "Share locally compatibility section")) {
                        if let reason = compatibility.reason {
                            Label(reason, systemImage: compatibility.allowed ? "checkmark.circle" : "xmark.circle")
                                .foregroundStyle(compatibility.allowed ? .green : .orange)
                        } else if peer.serverInfo == nil {
                            Text(String(localized: "Tap Send to connect and verify compatibility.", comment: "Share locally hint"))
                                .foregroundStyle(.secondary)
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
            .navigationTitle(String(localized: "Share locally", comment: "Share locally sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss sheet")) {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Send", comment: "Share locally send button")) {
                        Task { await sendNote() }
                    }
                    .disabled(isWorking || selectedPeer == nil || (didConnect && !compatibility.allowed))
                }
            }
            .onAppear {
                transfer.startBrowsing()
            }
            .onDisappear {
                transfer.stopBrowsing()
                transfer.disconnectSession()
            }
            .onChange(of: transfer.phase) { _, phase in
                switch phase {
                case .completed:
                    dismiss()
                case .failed(let message):
                    errorMessage = message
                    isWorking = false
                default:
                    break
                }
            }
        }
    }

    private func sendNote() async {
        guard let peer = selectedPeer else { return }
        isWorking = true
        errorMessage = nil
        defer { isWorking = false }

        if transfer.connectedPeerName != peer.displayName {
            let connected = await transfer.ensureConnected(to: peer.displayName)
            guard connected else {
                errorMessage = String(localized: "Could not connect to the receiver.", comment: "Share locally connect failed")
                return
            }
            didConnect = true
        }

        if let updated = transfer.discoveredPeers.first(where: { $0.displayName == peer.displayName }) {
            transfer.selectPeer(updated)
        }

        let check = LocalNoteTransferCompatibility.canSend(
            note: note,
            receiverServerInfo: transfer.selectedPeer?.serverInfo
        )
        guard check.allowed else {
            errorMessage = check.reason
            return
        }

        guard let profileId = appState.activeProfile?.id else {
            errorMessage = String(localized: "No active server profile.", comment: "Share locally error")
            return
        }

        do {
            let bundle = try await LocalNoteTransferBundleBuilder.build(
                noteId: note.noteId,
                client: client,
                persistence: PersistenceManager.shared,
                serverProfileId: profileId,
                protectedSessionActive: appState.protectedSessionActive
            )
            await transfer.sendOffer(for: note, bundle: bundle)
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}
