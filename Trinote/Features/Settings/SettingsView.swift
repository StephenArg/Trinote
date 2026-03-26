import SwiftUI

struct SettingsView: View {
    @Environment(AppState.self) private var appState
    @AppStorage("appearanceMode") private var appearanceMode: String = AppearanceMode.device.rawValue
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue
    @AppStorage("useCustomTextColor") private var useCustomTextColor: Bool = false
    @AppStorage("customLightTextColor") private var customLightTextColor: String = "#1c1c1e"
    @AppStorage("customDarkTextColor") private var customDarkTextColor: String = "#aaaaaa"

    @AppStorage("useCustomTreeColors") private var useCustomTreeColors: Bool = false
    @AppStorage("useTriliumNoteColors") private var useTriliumNoteColors: Bool = true
    @AppStorage("treeLightTextColor") private var treeLightTextColor: String = "#1c1c1e"
    @AppStorage("treeDarkTextColor") private var treeDarkTextColor: String = "#e5e5e7"
    @AppStorage("treeLightBgColor") private var treeLightBgColor: String = "#ffffff"
    @AppStorage("treeDarkBgColor") private var treeDarkBgColor: String = "#1c1c1e"
    @State private var showLogoutConfirm = false
    @State private var showClearCacheConfirm = false
    @State private var showResetColorsConfirm = false
    @State private var appInfo: AppInfoResponse?
    @State private var isLoadingInfo = false
    @State private var cacheEntityCount = 0
    @State private var cacheSizeBytes: Int?
    @State private var syncStatuses: [SyncStatus] = []
    @State private var showSyncDetails = false

    var body: some View {
        List {
            appearanceSection
            treeViewSection
            serverSection
            connectionSection
            cacheSection
            aboutSection
            accountSection
        }
        .navigationTitle(String(localized: "Settings", comment: "Settings screen title"))
        .task { await loadDiagnostics() }
    }

    private var appearanceSection: some View {
        Section(String(localized: "Appearance", comment: "Settings section")) {
            Picker(String(localized: "Mode", comment: "Appearance mode picker"), selection: $appearanceMode) {
                ForEach(AppearanceMode.allCases) { mode in
                    Text(mode.localizedTitle).tag(mode.rawValue)
                }
            }
            .pickerStyle(.segmented)

            Picker(String(localized: "Color Theme", comment: "Accent theme picker"), selection: $colorTheme) {
                ForEach(ColorTheme.allCases) { theme in
                    HStack {
                        Text(theme.localizedTitle)
                        Spacer()
                        HStack(spacing: 4) {
                            Circle().fill(theme.accentColor).frame(width: 12, height: 12)
                        }
                    }
                    .tag(theme.rawValue)
                }
            }

            Toggle(String(localized: "Custom Text Colors", comment: "Settings"), isOn: $useCustomTextColor)

            if useCustomTextColor {
                HStack {
                    Text(String(localized: "Light Mode Text", comment: "Settings color row"))
                    Spacer()
                    ColorPicker("", selection: lightTextColorBinding)
                        .labelsHidden()
                }

                HStack {
                    Text(String(localized: "Dark Mode Text", comment: "Settings color row"))
                    Spacer()
                    ColorPicker("", selection: darkTextColorBinding)
                        .labelsHidden()
                }
            }

            Button(String(localized: "Reset Colors to Default…", comment: "Settings button")) {
                showResetColorsConfirm = true
            }
            .foregroundStyle(.tint)
        }
        .alert(String(localized: "Reset Colors to Default?", comment: "Settings alert title"), isPresented: $showResetColorsConfirm) {
            Button(String(localized: "Cancel", comment: "Alert dismiss"), role: .cancel) {}
            Button(String(localized: "Reset", comment: "Confirm reset colors")) {
                resetAllColorSettingsToDefaults()
            }
        } message: {
            Text(String(localized: "This restores the default accent theme, turns off custom app and tree colors, and resets every custom color to its default value.", comment: "Reset colors alert"))
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
        Section(String(localized: "Tree View", comment: "Settings section")) {
            Toggle(String(localized: "Use Trilium Note Colors", comment: "Settings: per-note colors from server"), isOn: $useTriliumNoteColors)

            Toggle(String(localized: "Custom Tree Colors", comment: "Settings"), isOn: $useCustomTreeColors)

            if useCustomTreeColors {
                HStack {
                    Text(String(localized: "Light Text", comment: "Tree color row"))
                    Spacer()
                    ColorPicker("", selection: treeLightTextBinding)
                        .labelsHidden()
                }

                HStack {
                    Text(String(localized: "Dark Text", comment: "Tree color row"))
                    Spacer()
                    ColorPicker("", selection: treeDarkTextBinding)
                        .labelsHidden()
                }

                HStack {
                    Text(String(localized: "Light Background", comment: "Tree color row"))
                    Spacer()
                    ColorPicker("", selection: treeLightBgBinding)
                        .labelsHidden()
                }

                HStack {
                    Text(String(localized: "Dark Background", comment: "Tree color row"))
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
        Section(String(localized: "Server", comment: "Settings section")) {
            if let profile = appState.activeProfile {
                LabeledContent(String(localized: "Name", comment: "Server profile field"), value: profile.name)
                LabeledContent(String(localized: "URL", comment: "Server profile field"), value: profile.normalizedBaseURL)
                if let lastConnected = profile.lastConnected {
                    LabeledContent(String(localized: "Last Connected", comment: "Server profile field"), value: lastConnected.shortDisplay)
                }
            } else {
                Text(String(localized: "No server connected", comment: "Settings empty server"))
                    .foregroundStyle(.secondary)
            }
        }
    }

    private var connectionSection: some View {
        Section(String(localized: "Connection", comment: "Settings section")) {
            HStack {
                Label(String(localized: "Network", comment: "Settings connection row"), systemImage: appState.isOnline ? "wifi" : "wifi.slash")
                Spacer()
                Text(
                    appState.isOnline
                        ? String(localized: "Online (\(appState.networkMonitor.connectionType.rawValue))", comment: "Network status with type")
                        : String(localized: "Offline", comment: "Network status")
                )
                    .foregroundStyle(appState.isOnline ? .green : .red)
                    .font(.callout)
            }

            HStack {
                Label(String(localized: "Server Status", comment: "Settings connection row"), systemImage: appState.connectionError == nil ? "checkmark.circle.fill" : "xmark.circle.fill")
                Spacer()
                Text(appState.connectionError == nil ? String(localized: "Connected", comment: "Server OK") : String(localized: "Error", comment: "Server error state"))
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
                LabeledContent(String(localized: "Last Refreshed", comment: "Settings"), value: lastRefreshed.relativeDisplay)
            }

            Button(String(localized: "Test Connection", comment: "Settings button")) {
                Task { await testConnection() }
            }
            .disabled(isLoadingInfo)
        }
    }

    private var cacheSection: some View {
        Section(String(localized: "Cache & Sync", comment: "Settings section")) {
            LabeledContent(String(localized: "Cached Entities", comment: "Settings cache"), value: "\(cacheEntityCount)")

            if let bytes = cacheSizeBytes {
                LabeledContent(String(localized: "Cache Size", comment: "Settings cache"), value: ByteCountFormatter.string(fromByteCount: Int64(bytes), countStyle: .file))
            }

            if let lastSync = appState.syncManager.lastFullSyncDate {
                LabeledContent(String(localized: "Last Full Sync", comment: "Settings sync"), value: lastSync.relativeDisplay)
            }

            if let lastIncr = appState.syncManager.lastIncrementalSyncDate,
               lastIncr != appState.syncManager.lastFullSyncDate {
                LabeledContent(String(localized: "Last Quick Sync", comment: "Settings sync"), value: lastIncr.relativeDisplay)
            }

            if appState.syncManager.isSyncing {
                HStack(spacing: 8) {
                    ProgressView()
                        .controlSize(.small)
                    switch appState.syncManager.phase {
                    case .walkingTree:
                        Text(String(localized: "Discovering notes…", comment: "Sync phase"))
                    case .fetchingChanges:
                        Text(String(localized: "Checking for changes…", comment: "Sync phase"))
                    case .downloadingContent:
                        let sm = appState.syncManager
                        if sm.totalNoteCount > 0 {
                            Text(String(localized: "Syncing \(sm.syncedNoteCount)/\(sm.totalNoteCount) notes…", comment: "Sync progress"))
                        } else {
                            Text(String(localized: "Downloading content…", comment: "Sync phase"))
                        }
                    case .cleaningUp:
                        Text(String(localized: "Cleaning up…", comment: "Sync phase"))
                    default:
                        Text(String(localized: "Syncing…", comment: "Sync phase"))
                    }
                }
                .font(.callout)
                .foregroundStyle(.blue)
            }

            Button {
                Task {
                    guard await appState.refreshTriliumSession() else { return }
                    if let client = appState.client, let profileId = appState.activeProfile?.id {
                        appState.syncManager.fullSync(client: client, profileId: profileId)
                    }
                }
            } label: {
                Label(String(localized: "Full Sync (All Notes)", comment: "Settings sync button"), systemImage: "arrow.triangle.2.circlepath")
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
                    Text(String(localized: "Using in-memory fallback (data won't persist)", comment: "Settings warning"))
                        .font(.caption)
                        .foregroundStyle(.orange)
                }
            }

            if !syncStatuses.isEmpty {
                DisclosureGroup(String(localized: "Sync Details", comment: "Settings disclosure"), isExpanded: $showSyncDetails) {
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

            Button(String(localized: "Clear Cache", comment: "Settings destructive"), role: .destructive) {
                showClearCacheConfirm = true
            }
            .disabled(appState.activeProfile == nil)
            .confirmationDialog(String(localized: "Clear Cache?", comment: "Settings confirm"), isPresented: $showClearCacheConfirm) {
                Button(String(localized: "Clear All Cached Data", comment: "Settings confirm"), role: .destructive) {
                    clearCache()
                }
            } message: {
                Text(String(localized: "This will remove all locally cached notes, branches, and attributes for this server. Your data on the server is not affected.", comment: "Clear cache message"))
            }
        }
    }

    @ViewBuilder
    private var aboutSection: some View {
        if let info = appInfo {
            Section(String(localized: "Trilium Server", comment: "Settings about section")) {
                LabeledContent(String(localized: "Version", comment: "App version label"), value: info.appVersion)
                if let dbVersion = info.dbVersion {
                    LabeledContent(String(localized: "DB Version", comment: "Server info"), value: String(dbVersion))
                }
                if let buildDate = info.buildDate {
                    LabeledContent(String(localized: "Build Date", comment: "Server info"), value: buildDate)
                }
            }
        }

        Section(String(localized: "App", comment: "Settings about section")) {
            LabeledContent(String(localized: "Version", comment: "App version label"), value: Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "—")
            LabeledContent(String(localized: "Build", comment: "App build number"), value: Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "—")
        }
    }

    private var accountSection: some View {
        Section {
            Button(String(localized: "Sign Out", comment: "Settings account"), role: .destructive) {
                showLogoutConfirm = true
            }
            .disabled(!appState.isAuthenticated)
        }
        .confirmationDialog(String(localized: "Sign Out?", comment: "Settings confirm"), isPresented: $showLogoutConfirm) {
            Button(String(localized: "Sign Out", comment: "Settings account"), role: .destructive) {
                Task { await appState.logout() }
            }
        } message: {
            Text(String(localized: "You will need to re-enter your credentials to reconnect.", comment: "Sign out message"))
        }
    }

    private func testConnection() async {
        guard appState.client != nil else { return }
        isLoadingInfo = true
        defer { isLoadingInfo = false }
        let ok = await appState.refreshTriliumSession()
        guard ok, let client = appState.client else { return }
        do {
            appInfo = try await client.getAppInfo()
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
            cacheSizeBytes = try? PersistenceManager.shared.estimateCacheSizeInBytes(for: profileId)
            syncStatuses = (try? PersistenceManager.shared.fetchSyncStatuses(serverProfileId: profileId)) ?? []
        }
    }

    private func clearCache() {
        guard let profileId = appState.activeProfile?.id else { return }
        do {
            try PersistenceManager.shared.clearCache(for: profileId)
            cacheEntityCount = 0
            cacheSizeBytes = 0
            syncStatuses = []
        } catch {
            Log.persistence.error("Failed to clear cache: \(error)")
        }
    }

    /// Matches initial `@AppStorage` defaults in this view and `TreeView`.
    private func resetAllColorSettingsToDefaults() {
        colorTheme = ColorTheme.default.rawValue
        useCustomTextColor = false
        customLightTextColor = "#1c1c1e"
        customDarkTextColor = "#aaaaaa"
        useCustomTreeColors = false
        useTriliumNoteColors = true
        treeLightTextColor = "#1c1c1e"
        treeDarkTextColor = "#e5e5e7"
        treeLightBgColor = "#ffffff"
        treeDarkBgColor = "#1c1c1e"
    }
}

#Preview {
    NavigationStack {
        SettingsView()
    }
    .environment(AppState())
}
