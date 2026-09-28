import SwiftUI

/// The media and launch-sync choices of `OfflineCacheSettings`, shared by Settings and the first-sync sheet.
struct OfflineCacheOptionSections: View {
    @Binding var settings: OfflineCacheSettings

    var body: some View {
        Section {
            Toggle(
                String(localized: "Keep Images, Videos & Files", comment: "Offline cache: cache bodies of image and file notes"),
                isOn: $settings.cachesMediaBodies
            )
            Toggle(
                String(localized: "Include Files over 5 MB", comment: "Offline cache: also cache large image/file bodies"),
                isOn: $settings.cachesLargeMediaBodies
            )
            .disabled(!settings.cachesMediaBodies)
        } header: {
            Text(String(localized: "Images, Videos & Files", comment: "Offline cache section header"))
        } footer: {
            Text(String(localized: "Files left out download when you open them.", comment: "Offline cache media footer"))
        }

        Section {
            Toggle(
                String(localized: "Full Sync on Every Launch", comment: "Offline cache: walk every note at each cold launch"),
                isOn: $settings.fullSyncOnLaunch
            )
        } footer: {
            Text(
                String(
                    localized: "Checks every note each time the app starts. For very large vaults, turn this off: changes still arrive while the app is open and whenever it comes back, and a full sync still runs once a week.",
                    comment: "Offline cache full sync on launch footer"
                )
            )
        }
    }
}

/// Asked before a server's first full sync: what to keep offline, and how launch syncs.
struct FirstSyncChoiceSheet: View {
    @Environment(AppState.self) private var appState
    let request: SyncManager.FirstSyncRequest

    @State private var settings = OfflineCacheSettings()
    @State private var onlyTopLevelNotebooks = false
    @State private var serverSize: SubtreeSizeResponse?
    @State private var isCounting = true
    @State private var isStarting = false
    @State private var startError: String?

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Text(
                        String(
                            localized: "Trinote keeps a copy of your notes on this device so they open quickly and work offline. Choose what to keep before the first sync.",
                            comment: "First sync sheet intro"
                        )
                    )
                    if let serverSize {
                        LabeledContent(
                            String(localized: "Notes on This Server", comment: "First sync sheet: note count"),
                            value: serverSize.subTreeNoteCount.formatted()
                        )
                        LabeledContent(
                            String(localized: "Content Size", comment: "First sync sheet: size of note content on the server"),
                            value: ByteCountFormatter.string(fromByteCount: serverSize.subTreeSize, countStyle: .file)
                        )
                    } else if isCounting {
                        HStack(spacing: 8) {
                            ProgressView()
                                .controlSize(.small)
                            Text(String(localized: "Counting notes…", comment: "First sync sheet: loading note count"))
                                .foregroundStyle(.secondary)
                        }
                    }
                }

                Section {
                    Picker(
                        String(localized: "Keep Offline", comment: "First sync sheet: which notes to cache"),
                        selection: $onlyTopLevelNotebooks
                    ) {
                        Text(String(localized: "All Notes", comment: "First sync sheet: cache every note")).tag(false)
                        Text(String(localized: "Only Top-Level Notebooks", comment: "First sync sheet: cache no notebook contents"))
                            .tag(true)
                    }
                    .pickerStyle(.inline)
                    .labelsHidden()
                } header: {
                    Text(String(localized: "Keep Offline", comment: "First sync sheet: which notes to cache"))
                } footer: {
                    if onlyTopLevelNotebooks {
                        Text(
                            String(
                                localized: "Every notebook starts out online-only; turn on the ones you want in Settings → Cached Notebooks. Online, the tree shows every note either way.",
                                comment: "First sync sheet: top-level only footer"
                            )
                        )
                    }
                }

                OfflineCacheOptionSections(settings: $settings)

                if let startError {
                    Section {
                        Text(startError)
                            .foregroundStyle(.red)
                    }
                }
            }
            .navigationTitle(String(localized: "Offline Notes", comment: "First sync sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Start Sync", comment: "First sync sheet: confirm and start the first full sync")) {
                        Task { await start() }
                    }
                    .disabled(isStarting)
                }
            }
            .interactiveDismissDisabled()
            .task { await countNotes() }
        }
    }

    private func countNotes() async {
        defer { isCounting = false }
        // Summing sizes can take a while on a large server; the sheet works without it.
        serverSize = try? await request.client.getSubtreeSize(TriliumTreeConstants.rootNoteId)
    }

    private func start() async {
        isStarting = true
        startError = nil
        defer { isStarting = false }
        let started = await appState.syncManager.startFirstSync(
            settings: settings,
            onlyTopLevelNotebooks: onlyTopLevelNotebooks
        )
        if !started {
            startError = String(
                localized: "Couldn’t list your notebooks. Check the connection and try again.",
                comment: "First sync sheet: listing top-level notebooks failed"
            )
        }
    }
}
