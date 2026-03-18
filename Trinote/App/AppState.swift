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

    var isOnline: Bool { networkMonitor.isConnected }

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

    /// Activate profile: if token exists, try validation. On failure, still set up client
    /// so cached data can be browsed offline.
    private func activateProfileSilently(_ profile: ServerProfile) async {
        guard let url = profile.url else { return }
        let token = try? await keychain.loadToken(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url, token: token)

        self.client = newClient
        self.activeProfile = profile

        if token != nil {
            do {
                _ = try await newClient.getAppInfo()
                self.isAuthenticated = true
                self.connectionError = nil
                self.lastRefreshed = .now
                try persistence.setActiveProfile(profile)
                Log.auth.info("Connected to \(profile.name)")
                if syncManager.hasCompletedFullSync {
                    syncManager.incrementalSync(client: newClient, profileId: profile.id)
                } else {
                    syncManager.fullSync(client: newClient, profileId: profile.id)
                }
            } catch {
                self.isAuthenticated = true
                self.connectionError = APIError.from(error).localizedDescription
                Log.auth.warning("Validation failed but token exists, allowing cached browsing: \(error)")
            }
        } else {
            self.isAuthenticated = false
        }
    }

    func activateProfile(_ profile: ServerProfile) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        let token = try await keychain.loadToken(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url, token: token)

        if token != nil {
            _ = try await newClient.getAppInfo()
            self.client = newClient
            self.activeProfile = profile
            self.isAuthenticated = true
            self.connectionError = nil
            self.lastRefreshed = .now
            try persistence.setActiveProfile(profile)
        } else {
            self.client = newClient
            self.activeProfile = profile
            self.isAuthenticated = false
        }
    }

    func loginWithPassword(_ password: String, profile: ServerProfile) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        let newClient = TriliumClient(baseURL: url)
        let token = try await newClient.login(password: password)

        try await keychain.saveToken(token, forServer: profile.id)
        self.client = newClient
        self.activeProfile = profile
        self.isAuthenticated = true
        self.connectionError = nil
        self.lastRefreshed = .now
        try persistence.setActiveProfile(profile)
        Log.auth.info("Logged in to \(profile.name) with password")
        syncManager.restoreSyncState(profileId: profile.id)
        if syncManager.hasCompletedFullSync {
            syncManager.incrementalSync(client: newClient, profileId: profile.id)
        } else {
            syncManager.fullSync(client: newClient, profileId: profile.id)
        }
    }

    func loginWithToken(_ token: String, profile: ServerProfile) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        let newClient = TriliumClient(baseURL: url, token: token)
        _ = try await newClient.getAppInfo()

        try await keychain.saveToken(token, forServer: profile.id)
        self.client = newClient
        self.activeProfile = profile
        self.isAuthenticated = true
        self.connectionError = nil
        self.lastRefreshed = .now
        try persistence.setActiveProfile(profile)
        Log.auth.info("Logged in to \(profile.name) with token")
        syncManager.restoreSyncState(profileId: profile.id)
        if syncManager.hasCompletedFullSync {
            syncManager.incrementalSync(client: newClient, profileId: profile.id)
        } else {
            syncManager.fullSync(client: newClient, profileId: profile.id)
        }
    }

    func logout() async {
        syncManager.cancel()

        if let client {
            try? await client.logout()
        }

        if let profile = activeProfile {
            try? await keychain.deleteToken(forServer: profile.id)
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
        }
        do {
            try await keychain.deleteToken(forServer: profile.id)
            try persistence.clearCache(for: profile.id)
            try persistence.deleteProfile(profile)
        } catch {
            Log.auth.error("Failed to remove profile: \(error)")
        }
    }

    /// Called when app returns to foreground
    func onForegroundResume() async {
        guard isAuthenticated, let client else { return }
        do {
            _ = try await client.getAppInfo()
            connectionError = nil
            lastRefreshed = .now
            if let profileId = activeProfile?.id {
                syncManager.incrementalSync(client: client, profileId: profileId)
            }
        } catch {
            connectionError = APIError.from(error).localizedDescription
        }
    }
}
