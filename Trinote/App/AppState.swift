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

    let networkMonitor = NetworkMonitor.shared
    let syncManager = SyncManager()
    private let persistence = PersistenceManager.shared
    private let keychain = KeychainManager.shared

    private var realtime: TriliumWebSocketConnection?

    var isOnline: Bool { networkMonitor.isConnected }

    /// Runs entity-pull incremental sync when session + instance id exist.
    /// Waits until the sync task finishes so callers (e.g. tree reload) see deletions applied.
    func runIncrementalSync() async {
        guard let client, let profile = activeProfile else { return }
        guard let iid = try? await keychain.loadTriliumInstanceId(forServer: profile.id) else { return }
        self.syncManager.incrementalSync(client: client, profileId: profile.id, triliumInstanceId: iid)
        let deadline = Date().addingTimeInterval(180)
        while self.syncManager.isSyncing, Date() < deadline {
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
              let profileId = activeProfile?.id else { return }

        let storage = client.httpCookieStorage
        let base = client.baseURL
        realtime = TriliumWebSocketConnection(baseURL: base, cookieStorage: storage) { [weak self] in
            guard let self else { return }
            Task { @MainActor in
                guard let c = self.client, let pid = self.activeProfile?.id else { return }
                if let iid = try? await self.keychain.loadTriliumInstanceId(forServer: pid) {
                    self.syncManager.incrementalSync(client: c, profileId: pid, triliumInstanceId: iid)
                }
            }
        }
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
            self.isAuthenticated = true
            self.connectionError = nil
            self.lastRefreshed = .now
            try persistence.setActiveProfile(profile)
            let exported = await newClient.exportSessionCookieData()
            try? await keychain.saveSessionCookies(exported, forServer: profile.id)
            Log.auth.info("Connected to \(profile.name)")
            let iid = try await triliumInstanceId(for: profile)
            if syncManager.hasCompletedFullSync {
                syncManager.incrementalSync(client: newClient, profileId: profile.id, triliumInstanceId: iid)
            } else {
                syncManager.fullSync(client: newClient, profileId: profile.id)
            }
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
            self.isAuthenticated = true
            self.connectionError = nil
            self.lastRefreshed = .now
            try persistence.setActiveProfile(profile)
            let exported = await newClient.exportSessionCookieData()
            try? await keychain.saveSessionCookies(exported, forServer: profile.id)
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
        self.isAuthenticated = true
        self.connectionError = nil
        self.lastRefreshed = .now
        try persistence.setActiveProfile(profile)
        Log.auth.info("Logged in to \(profile.name) (session)")
        syncManager.restoreSyncState(profileId: profile.id)
        let iid = try await triliumInstanceId(for: profile)
        if syncManager.hasCompletedFullSync {
            syncManager.incrementalSync(client: newClient, profileId: profile.id, triliumInstanceId: iid)
        } else {
            syncManager.fullSync(client: newClient, profileId: profile.id)
        }
        startRealtimeIfPossible()
    }

    func logout() async {
        syncManager.cancel()
        realtime?.stop()
        realtime = nil

        if let client {
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
            if let iid = try? await keychain.loadTriliumInstanceId(forServer: profile.id) {
                syncManager.incrementalSync(client: client, profileId: profile.id, triliumInstanceId: iid)
            }
            startRealtimeIfPossible()
        } catch {
            connectionError = APIError.from(error).localizedDescription
        }
    }
}
