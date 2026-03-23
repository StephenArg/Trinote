import Foundation
import SwiftUI
import Observation

@Observable
@MainActor
final class AppState {
    var activeProfile: ServerProfile?
    var client: (any TriliumClientProtocol)?
    var isAuthenticated = false
    var isLoading = false
    var connectionError: String?
    var lastRefreshed: Date?
    /// In-memory: whether the user has unlocked protected notes this foreground session. Server session is cleared on background and after restoring the main login (see `endServerProtectedSessionAndPersistCookies()`).
    var protectedSessionActive = false

    let networkMonitor = NetworkMonitor.shared
    let syncManager = SyncManager()
    private let persistence = PersistenceManager.shared
    private let keychain = KeychainManager.shared

    private var realtime: TriliumWebSocketConnection?

    var isOnline: Bool { networkMonitor.isConnected }

    /// Ends the Trilium protected-note session on the server and persists cookies. Call after restoring the main session and when the app goes to the background so the document password is required again.
    func endServerProtectedSessionAndPersistCookies() async {
        protectedSessionActive = false
        guard let client, let profile = activeProfile else { return }
        try? await client.exitProtectedSession()
        if let tc = client as? TriliumClient {
            let data = await tc.exportSessionCookieData()
            try? await keychain.saveSessionCookies(data, forServer: profile.id)
        }
    }

    /// Runs entity-pull incremental sync (or full sync if none completed yet) when session + instance id exist.
    /// Waits until the sync task finishes or `maxWaitSeconds` elapses so callers (e.g. tree reload) see fresh data.
    func runIncrementalSync(maxWaitSeconds: TimeInterval = 180) async {
        guard let client, let profile = activeProfile else { return }
        guard let iid = try? await keychain.loadTriliumInstanceId(forServer: profile.id) else { return }
        self.syncManager.incrementalSync(client: client, profileId: profile.id, triliumInstanceId: iid)
        await waitWhileSyncing(atMost: maxWaitSeconds)
    }

    private func waitWhileSyncing(atMost seconds: TimeInterval) async {
        let deadline = Date().addingTimeInterval(seconds)
        while syncManager.isSyncing, Date() < deadline {
            try? await Task.sleep(nanoseconds: 100_000_000)
        }
    }

    func bootstrap() async {
        isLoading = true
        defer { isLoading = false }

        do {
            if let profile = try persistence.activeProfile() {
                activeProfile = profile
                syncManager.restoreSyncState(profileId: profile.id)
                await activateProfileSilently(profile)
            }
        } catch {
            Log.auth.error("Bootstrap failed: \(error)")
            connectionError = error.localizedDescription
        }
    }

    private func triliumInstanceId(for profile: ServerProfile) async throws -> String {
        if let existing = try await keychain.loadTriliumInstanceId(forServer: profile.id) {
            return existing
        }
        let fresh = UUID().uuidString
        try await keychain.saveTriliumInstanceId(fresh, forServer: profile.id)
        return fresh
    }

    private func startRealtimeIfPossible() {
        realtime?.stop()
        guard let client = client as? TriliumClient,
              activeProfile?.id != nil else { return }

        let storage = client.httpCookieStorage
        let base = client.baseURL
        realtime = TriliumWebSocketConnection(
            baseURL: base,
            cookieStorage: storage,
            onEvent: { [weak self] in
                guard let self else { return }
                Task { @MainActor in
                    guard let c = self.client, let pid = self.activeProfile?.id else { return }
                    if let iid = try? await self.keychain.loadTriliumInstanceId(forServer: pid) {
                        self.syncManager.incrementalSync(client: c, profileId: pid, triliumInstanceId: iid)
                    }
                }
            },
            onProtectedSessionLogout: { [weak self] in
                Task { @MainActor in
                    self?.protectedSessionActive = false
                }
            }
        )
        realtime?.start()
    }

    /// Restore session cookies; validate with `/api/app-info`.
    private func activateProfileSilently(_ profile: ServerProfile) async {
        guard let url = profile.url else { return }
        let cookieData = try? await keychain.loadSessionCookies(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url, persistedCookieData: cookieData)

        self.client = newClient
        self.activeProfile = profile

        do {
            try await newClient.restoreSession()
            await endServerProtectedSessionAndPersistCookies()
            self.isAuthenticated = true
            self.connectionError = nil
            self.lastRefreshed = .now
            try persistence.setActiveProfile(profile)
            let exported = await newClient.exportSessionCookieData()
            try? await keychain.saveSessionCookies(exported, forServer: profile.id)
            Log.auth.info("Connected to \(profile.name)")
            _ = try await triliumInstanceId(for: profile)
            await runIncrementalSync(maxWaitSeconds: 180)
            startRealtimeIfPossible()
        } catch {
            self.isAuthenticated = false
            self.connectionError = APIError.from(error).localizedDescription
            Log.auth.warning("Session restore failed: \(error)")
        }
    }

    func activateProfile(_ profile: ServerProfile) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        let cookieData = try? await keychain.loadSessionCookies(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url, persistedCookieData: cookieData)

        do {
            try await newClient.restoreSession()
            self.client = newClient
            self.activeProfile = profile
            await endServerProtectedSessionAndPersistCookies()
            self.isAuthenticated = true
            self.connectionError = nil
            self.lastRefreshed = .now
            try persistence.setActiveProfile(profile)
            let exported = await newClient.exportSessionCookieData()
            try? await keychain.saveSessionCookies(exported, forServer: profile.id)
            syncManager.restoreSyncState(profileId: profile.id)
            _ = try await triliumInstanceId(for: profile)
            await runIncrementalSync(maxWaitSeconds: 180)
            startRealtimeIfPossible()
        } catch {
            self.client = newClient
            self.activeProfile = profile
            self.isAuthenticated = false
            throw error
        }
    }

    func loginWithPassword(_ password: String, rememberMe: Bool, profile: ServerProfile) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        try await keychain.clearServerAuthArtifacts(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url)
        try await newClient.login(password: password, rememberMe: rememberMe)

        let exportedLogin = await newClient.exportSessionCookieData()
        try? await keychain.saveSessionCookies(exportedLogin, forServer: profile.id)
        _ = try await triliumInstanceId(for: profile)

        self.client = newClient
        self.activeProfile = profile
        self.protectedSessionActive = false
        self.isAuthenticated = true
        self.connectionError = nil
        self.lastRefreshed = .now
        try persistence.setActiveProfile(profile)
        Log.auth.info("Logged in to \(profile.name) (session)")
        syncManager.restoreSyncState(profileId: profile.id)
        _ = try await triliumInstanceId(for: profile)
        await runIncrementalSync(maxWaitSeconds: 180)
        startRealtimeIfPossible()
    }

    func logout() async {
        syncManager.cancel()
        realtime?.stop()
        realtime = nil
        protectedSessionActive = false

        if let client {
            if let tc = client as? TriliumClient {
                try? await tc.exitProtectedSession()
            }
            try? await client.logout()
        }

        if let profile = activeProfile {
            try? await keychain.clearServerAuthArtifacts(forServer: profile.id)
        }

        client = nil
        isAuthenticated = false
        connectionError = nil
        lastRefreshed = nil
        Log.auth.info("Logged out")
    }

    func signOutAndRemoveProfile(_ profile: ServerProfile) async {
        if profile.id == activeProfile?.id {
            await logout()
            activeProfile = nil
        } else {
            try? await keychain.clearServerAuthArtifacts(forServer: profile.id)
        }
        do {
            try persistence.clearCache(for: profile.id)
            try persistence.deleteProfile(profile)
        } catch {
            Log.auth.error("Failed to remove profile: \(error)")
        }
    }

    /// Called when app returns to foreground
    func onForegroundResume() async {
        guard isAuthenticated, let client, let profile = activeProfile else { return }
        do {
            try await client.restoreSession()
            connectionError = nil
            lastRefreshed = .now
            if let tc = client as? TriliumClient {
                let data = await tc.exportSessionCookieData()
                try? await keychain.saveSessionCookies(data, forServer: profile.id)
            }
            await runIncrementalSync(maxWaitSeconds: 90)
            startRealtimeIfPossible()
        } catch {
            connectionError = APIError.from(error).localizedDescription
        }
    }
}
