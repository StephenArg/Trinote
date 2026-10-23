import AppIntents
import SwiftUI

/// Settings → Shortcuts: where Trinote's Shortcuts actions are, how to put Add to Today's Journal on the Action
/// Button, and the journal captures still waiting on this device.
struct ShortcutsSettingsSection: View {
    @Environment(AppState.self) private var appState
    @State private var waitingCount = 0

    var body: some View {
        Section {
            ShortcutsLink()
                .frame(maxWidth: .infinity)
                .listRowBackground(Color.clear)
            if waitingCount > 0 {
                NavigationLink {
                    WaitingJournalCapturesView()
                        .environment(appState)
                } label: {
                    LabeledContent(
                        String(localized: "Journal captures waiting", comment: "Settings → Shortcuts: journal text saved on the device, not yet added"),
                        value: String(waitingCount)
                    )
                }
            }
        } header: {
            Text(String(localized: "Shortcuts", comment: "Settings section: Siri and Shortcuts actions"))
        } footer: {
            // Side effects sit on the footer, as in `AISettingsSection`: List draws a plain Section reliably.
            Text(String(
                localized: "Trinote's actions in the Shortcuts app: Add to Today's Journal, Create Note and Open Today's Journal. To add to your journal with the Action Button, choose Settings → Action Button → Shortcut, then Add to Today's Journal.",
                comment: "Settings → Shortcuts footer"
            ))
            .task(id: appState.activeProfile?.id) {
                await reloadWaitingCount()
            }
            .onReceive(NotificationCenter.default.publisher(for: .trinoteJournalCapturesChanged).receive(on: RunLoop.main)) { _ in
                Task { await reloadWaitingCount() }
            }
        }
    }

    private func reloadWaitingCount() async {
        guard let profileId = appState.activeProfile?.id else {
            waitingCount = 0
            return
        }
        waitingCount = await JournalCaptureQueue.shared.count(profileId: profileId)
    }
}

/// The journal captures kept on this device: each is added to the journal day it was captured on once Trinote can
/// reach the server. They can be added now or deleted.
struct WaitingJournalCapturesView: View {
    @Environment(AppState.self) private var appState
    @State private var entries: [JournalCapture.Entry] = []
    @State private var isAdding = false

    var body: some View {
        List {
            Section {
                if entries.isEmpty {
                    Text(String(localized: "Nothing is waiting.", comment: "Waiting journal captures: the list is empty"))
                        .foregroundStyle(.secondary)
                }
                ForEach(entries) { entry in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(entry.text)
                            .lineLimit(6)
                            .textSelection(.enabled)
                        Text(entry.capturedAt.formatted(date: .abbreviated, time: .shortened))
                            .font(.caption)
                            .foregroundStyle(.secondary)
                        if let lastError = entry.lastError {
                            Text(lastError)
                                .font(.caption)
                                .foregroundStyle(.red)
                        }
                    }
                }
                .onDelete(perform: delete)
            } footer: {
                Text(String(
                    localized: "Saved by Add to Today's Journal while the server couldn't be reached, the login had expired, or protected notes were locked. Each is added to the journal day it was captured on.",
                    comment: "Waiting journal captures footer"
                ))
            }
        }
        .navigationTitle(String(localized: "Journal captures waiting", comment: "Settings → Shortcuts: journal text saved on the device, not yet added"))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                if isAdding {
                    ProgressView()
                } else {
                    Button(String(localized: "Add Now", comment: "Waiting journal captures: add them to the journal now")) {
                        Task { await addNow() }
                    }
                    .disabled(!appState.isOnline || entries.isEmpty)
                }
            }
        }
        .task { await reload() }
    }

    private func reload() async {
        guard let profileId = appState.activeProfile?.id else {
            entries = []
            return
        }
        entries = await JournalCaptureQueue.shared.pending(profileId: profileId)
    }

    private func addNow() async {
        isAdding = true
        await appState.flushShortcutJournalCaptures()
        await reload()
        isAdding = false
    }

    private func delete(at offsets: IndexSet) {
        let ids = offsets.map { entries[$0].id }
        entries.remove(atOffsets: offsets)
        Task {
            for id in ids {
                try? await JournalCaptureQueue.shared.remove(id: id)
            }
        }
    }
}
