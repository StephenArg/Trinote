import SwiftUI

struct SettingsView: View {
    @Environment(AppState.self) private var appState
    @AppStorage("appearanceMode") private var appearanceMode: String = AppearanceMode.device.rawValue
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue
    @AppStorage("useCustomTextColor") private var useCustomTextColor: Bool = false
    @AppStorage("customLightTextColor") private var customLightTextColor: String = "#1c1c1e"
    @AppStorage("customDarkTextColor") private var customDarkTextColor: String = "#aaaaaa"

    @AppStorage("useCustomTreeColors") private var useCustomTreeColors: Bool = false
    @AppStorage("treeLightTextColor") private var treeLightTextColor: String = "#1c1c1e"
    @AppStorage("treeDarkTextColor") private var treeDarkTextColor: String = "#e5e5e7"
    @AppStorage("treeLightBgColor") private var treeLightBgColor: String = "#ffffff"
    @AppStorage("treeDarkBgColor") private var treeDarkBgColor: String = "#1c1c1e"
    @State private var showLogoutConfirm = false
    @State private var showClearCacheConfirm = false
    @State private var appInfo: AppInfoResponse?
    @State private var isLoadingInfo = false
    @State private var cacheEntityCount = 0
    @State private var syncStatuses: [SyncStatus] = []

    var body: some View {
        List {
            appearanceSection
            treeViewSection
            serverSection
            connectionSection
            cacheSection
            diagnosticsSection
            aboutSection
            accountSection
        }
        .navigationTitle("Settings")
        .task { await loadDiagnostics() }
    }

    private var appearanceSection: some View {
        Section("Appearance") {
            Picker("Mode", selection: $appearanceMode) {
                ForEach(AppearanceMode.allCases) { mode in
                    Text(mode.rawValue).tag(mode.rawValue)
                }
            }
            .pickerStyle(.segmented)

            Picker("Color Theme", selection: $colorTheme) {
                ForEach(ColorTheme.allCases) { theme in
                    HStack {
                        Text(theme.rawValue)
                        Spacer()
                        HStack(spacing: 4) {
                            Circle().fill(theme.accentColor).frame(width: 12, height: 12)
                        }
                    }
                    .tag(theme.rawValue)
                }
            }

            Toggle("Custom Text Colors", isOn: $useCustomTextColor)

            if useCustomTextColor {
                HStack {
                    Text("Light Mode Text")
                    Spacer()
                    ColorPicker("", selection: lightTextColorBinding)
                        .labelsHidden()
                }

                HStack {
                    Text("Dark Mode Text")
                    Spacer()
                    ColorPicker("", selection: darkTextColorBinding)
                        .labelsHidden()
                }
            }
        }
    }

    private var lightTextColorBinding: Binding<Color> {
        Binding(
            get: { Color(hex: customLightTextColor) },
            set: { customLightTextColor = $0.hexString }
        )
    }

    private var darkTextColorBinding: Binding<Color> {
        Binding(
            get: { Color(hex: customDarkTextColor) },
            set: { customDarkTextColor = $0.hexString }
        )
    }

    private var treeViewSection: some View {
        Section("Tree View") {
            Toggle("Custom Tree Colors", isOn: $useCustomTreeColors)

            if useCustomTreeColors {
                HStack {
                    Text("Light Text")
                    Spacer()
                    ColorPicker("", selection: treeLightTextBinding)
                        .labelsHidden()
                }

                HStack {
                    Text("Dark Text")
                    Spacer()
                    ColorPicker("", selection: treeDarkTextBinding)
                        .labelsHidden()
                }

                HStack {
                    Text("Light Background")
                    Spacer()
                    ColorPicker("", selection: treeLightBgBinding)
                        .labelsHidden()
                }

                HStack {
                    Text("Dark Background")
                    Spacer()
                    ColorPicker("", selection: treeDarkBgBinding)
                        .labelsHidden()
                }
            }
        }
    }

    private var treeLightTextBinding: Binding<Color> {
        Binding(
            get: { Color(hex: treeLightTextColor) },
            set: { treeLightTextColor = $0.hexString }
        )
    }

    private var treeDarkTextBinding: Binding<Color> {
        Binding(
            get: { Color(hex: treeDarkTextColor) },
            set: { treeDarkTextColor = $0.hexString }
        )
    }

    private var treeLightBgBinding: Binding<Color> {
        Binding(
            get: { Color(hex: treeLightBgColor) },
            set: { treeLightBgColor = $0.hexString }
        )
    }

    private var treeDarkBgBinding: Binding<Color> {
        Binding(
            get: { Color(hex: treeDarkBgColor) },
            set: { treeDarkBgColor = $0.hexString }
        )
    }

    private var serverSection: some View {
        Section("Server") {
            if let profile = appState.activeProfile {
                LabeledContent("Name", value: profile.name)
                LabeledContent("URL", value: profile.normalizedBaseURL)
                if let lastConnected = profile.lastConnected {
                    LabeledContent("Last Connected", value: lastConnected.shortDisplay)
                }
            } else {
                Text("No server connected")
                    .foregroundStyle(.secondary)
            }
        }
    }

    private var connectionSection: some View {
        Section("Connection") {
            HStack {
                Label("Network", systemImage: appState.isOnline ? "wifi" : "wifi.slash")
                Spacer()
                Text(appState.isOnline ? "Online (\(appState.networkMonitor.connectionType.rawValue))" : "Offline")
                    .foregroundStyle(appState.isOnline ? .green : .red)
                    .font(.callout)
            }

            HStack {
                Label("Server Status", systemImage: appState.connectionError == nil ? "checkmark.circle.fill" : "xmark.circle.fill")
                Spacer()
                Text(appState.connectionError == nil ? "Connected" : "Error")
                    .foregroundStyle(appState.connectionError == nil ? .green : .red)
                    .font(.callout)
            }

            if let error = appState.connectionError {
                HStack(alignment: .top) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(.yellow)
                    Text(error)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            if let lastRefreshed = appState.lastRefreshed {
                LabeledContent("Last Refreshed", value: lastRefreshed.relativeDisplay)
            }

            Button("Test Connection") {
                Task { await testConnection() }
            }
            .disabled(isLoadingInfo)
        }
    }

    private var cacheSection: some View {
        Section("Cache & Sync") {
            LabeledContent("Cached Entities", value: "\(cacheEntityCount)")

            if let lastSync = appState.syncManager.lastFullSyncDate {
                LabeledContent("Last Full Sync", value: lastSync.relativeDisplay)
            }

            if let lastIncr = appState.syncManager.lastIncrementalSyncDate,
               lastIncr != appState.syncManager.lastFullSyncDate {
                LabeledContent("Last Quick Sync", value: lastIncr.relativeDisplay)
            }

            if appState.syncManager.isSyncing {
                HStack(spacing: 8) {
                    ProgressView()
                        .controlSize(.small)
                    switch appState.syncManager.phase {
                    case .walkingTree:
                        Text("Discovering notes…")
                    case .fetchingChanges:
                        Text("Checking for changes…")
                    case .downloadingContent:
                        let sm = appState.syncManager
                        if sm.totalNoteCount > 0 {
                            Text("Syncing \(sm.syncedNoteCount)/\(sm.totalNoteCount) notes…")
                        } else {
                            Text("Downloading content…")
                        }
                    case .cleaningUp:
                        Text("Cleaning up…")
                    default:
                        Text("Syncing…")
                    }
                }
                .font(.callout)
                .foregroundStyle(.blue)
            }

            Button {
                if let client = appState.client, let profileId = appState.activeProfile?.id {
                    appState.syncManager.fullSync(client: client, profileId: profileId)
                }
            } label: {
                Label("Full Sync (All Notes)", systemImage: "arrow.triangle.2.circlepath")
            }
            .disabled(appState.syncManager.isSyncing || appState.client == nil)

            if let error = appState.syncManager.syncError {
                HStack(alignment: .top, spacing: 6) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(.red)
                    Text(error)
                        .font(.caption)
                        .foregroundStyle(.red)
                }
            }

            if PersistenceManager.shared.isUsingMemoryFallback {
                HStack {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(.orange)
                    Text("Using in-memory fallback (data won't persist)")
                        .font(.caption)
                        .foregroundStyle(.orange)
                }
            }

            Button("Clear Cache", role: .destructive) {
                showClearCacheConfirm = true
            }
            .disabled(appState.activeProfile == nil)
            .confirmationDialog("Clear Cache?", isPresented: $showClearCacheConfirm) {
                Button("Clear All Cached Data", role: .destructive) {
                    clearCache()
                }
            } message: {
                Text("This will remove all locally cached notes, branches, and attributes for this server. Your data on the server is not affected.")
            }
        }
    }

    @ViewBuilder
    private var diagnosticsSection: some View {
        if !syncStatuses.isEmpty {
            Section("Sync Status") {
                ForEach(syncStatuses, id: \.id) { status in
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(status.domain.capitalized)
                                .font(.callout.weight(.medium))
                            Spacer()
                            Text(status.lastSyncedAt.relativeDisplay)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        if let error = status.lastError {
                            Text(error)
                                .font(.caption)
                                .foregroundStyle(.red)
                                .lineLimit(2)
                        }
                    }
                }
            }
        }
    }

    @ViewBuilder
    private var aboutSection: some View {
        if let info = appInfo {
            Section("Trilium Server") {
                LabeledContent("Version", value: info.appVersion)
                if let dbVersion = info.dbVersion {
                    LabeledContent("DB Version", value: String(dbVersion))
                }
                if let buildDate = info.buildDate {
                    LabeledContent("Build Date", value: buildDate)
                }
            }
        }

        Section("App") {
            LabeledContent("Version", value: Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "—")
            LabeledContent("Build", value: Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "—")
        }
    }

    private var accountSection: some View {
        Section {
            Button("Sign Out", role: .destructive) {
                showLogoutConfirm = true
            }
            .disabled(!appState.isAuthenticated)
        }
        .confirmationDialog("Sign Out?", isPresented: $showLogoutConfirm) {
            Button("Sign Out", role: .destructive) {
                Task { await appState.logout() }
            }
        } message: {
            Text("You will need to re-enter your credentials to reconnect.")
        }
    }

    private func testConnection() async {
        guard let client = appState.client else { return }
        isLoadingInfo = true
        defer { isLoadingInfo = false }
        do {
            appInfo = try await client.getAppInfo()
            appState.connectionError = nil
            appState.lastRefreshed = .now
        } catch {
            appState.connectionError = APIError.from(error).localizedDescription
            Log.api.error("Failed to load app info: \(error)")
        }
    }

    private func loadDiagnostics() async {
        if let client = appState.client {
            isLoadingInfo = true
            appInfo = try? await client.getAppInfo()
            isLoadingInfo = false
        }

        if let profileId = appState.activeProfile?.id {
            cacheEntityCount = (try? PersistenceManager.shared.estimateCacheSize(for: profileId)) ?? 0
            syncStatuses = (try? PersistenceManager.shared.fetchSyncStatuses(serverProfileId: profileId)) ?? []
        }
    }

    private func clearCache() {
        guard let profileId = appState.activeProfile?.id else { return }
        do {
            try PersistenceManager.shared.clearCache(for: profileId)
            cacheEntityCount = 0
            syncStatuses = []
        } catch {
            Log.persistence.error("Failed to clear cache: \(error)")
        }
    }
}

#Preview {
    NavigationStack {
        SettingsView()
    }
    .environment(AppState())
}
