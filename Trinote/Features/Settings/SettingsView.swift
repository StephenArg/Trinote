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

    @AppStorage("noteEditorLongPressToEdit") private var noteEditorLongPressToEdit: Bool = false
    @State private var showClearCacheConfirm = false
    @State private var showClearAllInstancesCacheConfirm = false
    @State private var showResetColorsConfirm = false
    @State private var appInfo: AppInfoResponse?
    @State private var isLoadingInfo = false
    @State private var cacheEntityCount = 0
    @State private var cacheSizeBytes: Int?
    @State private var syncStatuses: [SyncStatus] = []
    @State private var showSyncDetails = false
    @AppStorage("appPinEnabled") private var appPinEnabled = false
    @AppStorage("appBiometricEnabled") private var appBiometricEnabled = false
    @State private var showPinSetup = false
    @State private var deviceBiometryKind: BiometricKind = .none
    @State private var serverProfiles: [ServerProfile] = []
    @State private var showAddInstance = false
    @State private var profileIdPendingSignOut: String?
    @State private var cacheSizeBytesAllInstances: Int?

    var body: some View {
        List {
            appearanceSection
            treeViewSection
            noteEditorSection
            securitySection
            instancesSection
            connectionSection
            cacheSection
            aboutSection
        }
        .navigationTitle(String(localized: "Settings", comment: "Settings screen title"))
        .task { await loadDiagnostics() }
        .sheet(isPresented: $showPinSetup) {
            PinSetupSheet(isCurrentlyEnabled: appPinEnabled) {}
        }
        .sheet(isPresented: $showAddInstance) {
            AddInstanceView()
                .environment(appState)
        }
        .onAppear {
            deviceBiometryKind = BiometricAuthenticator.availability().kind
            reloadServerProfiles()
        }
        .onChange(of: appState.activeProfile?.id) { _, _ in
            reloadServerProfiles()
            Task { await loadDiagnostics() }
        }
        .onChange(of: showAddInstance) { _, isPresented in
            if !isPresented { reloadServerProfiles() }
        }
        .onChange(of: appPinEnabled) { _, isOn in
            if !isOn { appBiometricEnabled = false }
        }
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

    private var noteEditorSection: some View {
        Section {
            Toggle(
                String(localized: "Long-Press to Edit", comment: "Settings toggle: replace the floating edit button with a long-press gesture"),
                isOn: $noteEditorLongPressToEdit
            )
        } header: {
            Text(String(localized: "Note Editor", comment: "Settings section header"))
        } footer: {
            Text(String(
                localized: "Hide the floating edit button on read-only notes. Press and hold the note for 1.5 seconds to start editing.",
                comment: "Explains the long-press-to-edit option"
            ))
        }
    }

    private var securitySection: some View {
        Section {
            Button {
                showPinSetup = true
            } label: {
                HStack {
                    Text(String(localized: "App PIN", comment: "Settings: app PIN lock"))
                        .foregroundStyle(.primary)
                    Spacer()
                    Text(appPinEnabled
                         ? String(localized: "On", comment: "PIN status")
                         : String(localized: "Off", comment: "PIN status"))
                        .foregroundStyle(.secondary)
                }
            }

            if deviceBiometryKind != .none {
                Toggle(deviceBiometryKind.localizedUnlockToggleTitle, isOn: biometricUnlockBinding)
                    .disabled(!appPinEnabled)
            }
        } header: {
            Text(String(localized: "Security", comment: "Settings section"))
        } footer: {
            if deviceBiometryKind != .none, !appPinEnabled {
                Text(
                    String(
                        format: String(
                            localized: "Enable App PIN to use %@.",
                            comment: "Settings footer: %@ is Face ID, Touch ID, or Optic ID"
                        ),
                        locale: .current,
                        deviceBiometryKind.localizedShortName
                    )
                )
            }
        }
    }

    private var biometricUnlockBinding: Binding<Bool> {
        Binding(
            get: { appBiometricEnabled },
            set: { newValue in
                if !newValue {
                    appBiometricEnabled = false
                } else {
                    Task { @MainActor in
                        let reason = String(
                            localized: "Confirm to enable biometric unlock for Trinote.",
                            comment: "System biometric prompt when turning on biometric unlock in Settings"
                        )
                        let result = await BiometricAuthenticator.authenticate(localizedReason: reason)
                        if case .success = result {
                            appBiometricEnabled = true
                        }
                    }
                }
            }
        )
    }

    private var instancesSection: some View {
        Section {
            if serverProfiles.isEmpty {
                Text(String(localized: "No instances", comment: "Settings when no server profiles"))
                    .foregroundStyle(.secondary)
            } else {
                ForEach(serverProfiles, id: \.id) { profile in
                    let isActive = profile.id == appState.activeProfile?.id
                    HStack(alignment: .center, spacing: 10) {
                        Button {
                            if !isActive {
                                Task {
                                    do {
                                        try await appState.activateProfile(profile)
                                    } catch {
                                        appState.connectionError = APIError.from(error).localizedDescription
                                    }
                                }
                            }
                        } label: {
                            VStack(alignment: .leading, spacing: 4) {
                                HStack(spacing: 6) {
                                    Text(profile.name)
                                        .font(.body.weight(.medium))
                                        .foregroundStyle(.primary)
                                    if isActive {
                                        Image(systemName: "checkmark.circle.fill")
                                            .foregroundStyle(.green)
                                            .font(.caption)
                                            .accessibilityLabel(String(localized: "Active instance", comment: "VoiceOver: current server"))
                                    }
                                }
                                Text(profile.normalizedBaseURL)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                                    .lineLimit(1)
                                if isActive {
                                    Text(String(localized: "Active", comment: "Label on current instance row"))
                                        .font(.caption2.weight(.semibold))
                                        .foregroundStyle(.green)
                                }
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                        .disabled(isActive)

                        Button {
                            profileIdPendingSignOut = profile.id
                        } label: {
                            Text(String(localized: "Sign Out", comment: "Per-instance sign out in settings"))
                                .font(.subheadline.weight(.medium))
                        }
                        .buttonStyle(.bordered)
                        .tint(.red)
                        .accessibilityLabel(
                            String(
                                format: String(localized: "Sign out from %@", comment: "VoiceOver: sign out server; %@ is name"),
                                locale: .current,
                                profile.name
                            )
                        )
                    }
                }
            }

            Button {
                showAddInstance = true
            } label: {
                Label(String(localized: "Add Instance", comment: "Settings: sign in to another server"), systemImage: "plus.circle.fill")
            }
            .disabled(serverProfiles.count >= PersistenceManager.maxServerProfiles)
        } header: {
            Text(String(localized: "Instances", comment: "Settings section: multiple servers"))
        } footer: {
            if serverProfiles.count >= PersistenceManager.maxServerProfiles {
                Text(
                    String(
                        format: String(
                            localized: "You can sign in to at most %lld instances. Sign out from one to add another.",
                            comment: "Settings footer when instance limit reached; %lld is max count"
                        ),
                        locale: .current,
                        Int64(PersistenceManager.maxServerProfiles)
                    )
                )
            }
        }
        .confirmationDialog(
            String(localized: "Sign Out?", comment: "Confirm sign out instance title"),
            isPresented: Binding(
                get: { profileIdPendingSignOut != nil },
                set: { if !$0 { profileIdPendingSignOut = nil } }
            ),
            titleVisibility: .visible
        ) {
            Button(String(localized: "Sign Out", comment: "Confirm sign out"), role: .destructive) {
                if let id = profileIdPendingSignOut,
                   let profile = serverProfiles.first(where: { $0.id == id }) {
                    Task { await signOutInstance(profile) }
                }
                profileIdPendingSignOut = nil
            }
            Button(String(localized: "Cancel", comment: "Cancel sign out"), role: .cancel) {
                profileIdPendingSignOut = nil
            }
        } message: {
            if let id = profileIdPendingSignOut,
               let name = serverProfiles.first(where: { $0.id == id })?.name {
                Text(
                    String(
                        format: String(
                            localized: "Sign out from \"%@\"? This removes the instance, cached notes, and saved session from this device. Data on the server is not deleted.",
                            comment: "Confirm sign out instance; %@ is server display name"
                        ),
                        locale: .current,
                        name
                    )
                )
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

            if let bytesAll = cacheSizeBytesAllInstances {
                LabeledContent(
                    String(localized: "Cache Size (all instances)", comment: "Settings cache across all signed-in servers"),
                    value: ByteCountFormatter.string(fromByteCount: Int64(bytesAll), countStyle: .file)
                )
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

            Button(String(localized: "Clear Cache (all instances)", comment: "Settings: clear cache for every server"), role: .destructive) {
                showClearAllInstancesCacheConfirm = true
            }
            .disabled(serverProfiles.isEmpty)
            .confirmationDialog(
                String(localized: "Clear Cache (all instances)?", comment: "Confirm clear all instances cache"),
                isPresented: $showClearAllInstancesCacheConfirm
            ) {
                Button(String(localized: "Clear All Instances", comment: "Confirm clear all caches"), role: .destructive) {
                    clearCacheAllInstances()
                }
                Button(String(localized: "Cancel", comment: "Cancel"), role: .cancel) {}
            } message: {
                Text(
                    String(
                        localized: "This removes locally cached notes, branches, and attributes for every signed-in instance. Profiles and sessions stay signed in. Server data is not affected.",
                        comment: "Message for clear cache all instances"
                    )
                )
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
                if let syncVersion = info.syncVersion {
                    LabeledContent(String(localized: "Sync Version", comment: "Server info"), value: String(syncVersion))
                }
                if let buildDate = info.buildDate {
                    LabeledContent(String(localized: "Build Date", comment: "Server info"), value: buildDate)
                }
                serverCompatibilityRow(for: info)
            }
        }

        Section(String(localized: "App", comment: "Settings about section")) {
            LabeledContent(String(localized: "Version", comment: "App version label"), value: Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "—")
            LabeledContent(String(localized: "Build", comment: "App build number"), value: Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "—")
        }
    }

    /// Non-blocking notice when the connected Trilium server is newer than what this build
    /// of Trinote was tested against. Pulled from `TriliumServerCompatibility`.
    @ViewBuilder
    private func serverCompatibilityRow(for info: AppInfoResponse) -> some View {
        switch TriliumServerCompatibility.evaluate(info) {
        case .withinTestedRange, .unknown:
            EmptyView()
        case .syncVersionAhead(let serverSync, let testedSync):
            CompatibilityBanner(
                title: String(localized: "Server newer than tested", comment: "Settings: server compatibility banner title"),
                message: String(
                    format: String(
                        localized: "This server's sync protocol (v%1$d) is newer than what this build of Trinote (tested through Trilium %2$@, sync v%3$d) has been verified against. Incremental sync may misbehave; full-sync from Settings if you see stale data.",
                        comment: "Settings: server sync version warning. %1$d server sync, %2$@ tested Trilium tag, %3$d tested sync."
                    ),
                    serverSync,
                    TriliumServerCompatibility.testedMaxAppVersion,
                    testedSync
                )
            )
        case .dbVersionAhead(let serverDb, let testedDb):
            CompatibilityBanner(
                title: String(localized: "Server newer than tested", comment: "Settings: server compatibility banner title"),
                message: String(
                    format: String(
                        localized: "This server's database schema (v%1$d) is newer than what this build of Trinote (tested through Trilium %2$@, db v%3$d) has been verified against. New note types or fields may not display correctly until Trinote is updated.",
                        comment: "Settings: server db version warning. %1$d server db, %2$@ tested Trilium tag, %3$d tested db."
                    ),
                    serverDb,
                    TriliumServerCompatibility.testedMaxAppVersion,
                    testedDb
                )
            )
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
        } else {
            cacheEntityCount = 0
            cacheSizeBytes = nil
            syncStatuses = []
        }
        cacheSizeBytesAllInstances = try? PersistenceManager.shared.estimateCacheSizeInBytesAllInstances()
    }

    private func reloadServerProfiles() {
        serverProfiles = (try? PersistenceManager.shared.fetchServerProfiles()) ?? []
    }

    private func signOutInstance(_ profile: ServerProfile) async {
        await appState.signOutAndRemoveProfile(profile)
        reloadServerProfiles()
        await loadDiagnostics()
    }

    private func clearCacheAllInstances() {
        do {
            try PersistenceManager.shared.clearCacheAllInstances()
            cacheSizeBytesAllInstances = 0
            if let profileId = appState.activeProfile?.id {
                cacheEntityCount = (try? PersistenceManager.shared.estimateCacheSize(for: profileId)) ?? 0
                cacheSizeBytes = try? PersistenceManager.shared.estimateCacheSizeInBytes(for: profileId)
                syncStatuses = (try? PersistenceManager.shared.fetchSyncStatuses(serverProfileId: profileId)) ?? []
            } else {
                cacheEntityCount = 0
                cacheSizeBytes = nil
                syncStatuses = []
            }
        } catch {
            Log.persistence.error("Failed to clear all-instance cache: \(error)")
        }
    }

    private func clearCache() {
        guard let profileId = appState.activeProfile?.id else { return }
        do {
            try PersistenceManager.shared.clearCache(for: profileId)
            cacheEntityCount = 0
            cacheSizeBytes = 0
            syncStatuses = []
            cacheSizeBytesAllInstances = try? PersistenceManager.shared.estimateCacheSizeInBytesAllInstances()
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

private struct CompatibilityBanner: View {
    let title: String
    let message: String

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: "exclamationmark.triangle.fill")
                .foregroundStyle(.orange)
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                Text(message)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            Spacer(minLength: 0)
        }
        .padding(.vertical, 4)
        .accessibilityElement(children: .combine)
    }
}

#Preview {
    NavigationStack {
        SettingsView()
    }
    .environment(AppState())
}
