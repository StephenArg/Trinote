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

    /// Ensures only one offline queue flush runs at a time. Concurrent callers await the same run (then return without duplicating work).
    private var offlineFlushInFlight = false
    private var offlineFlushWaiters: [CheckedContinuation<Void, Never>] = []

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
    /// - Parameter downloadChangedBodies: Pass `false` for pull-to-refresh / tree toolbar: metadata updates only; bodies load on note open.
    func runIncrementalSync(maxWaitSeconds: TimeInterval = 180, downloadChangedBodies: Bool = true) async {
        guard networkMonitor.isConnected else { return }
        guard let client, let profile = activeProfile else { return }
        guard let iid = try? await keychain.loadTriliumInstanceId(forServer: profile.id) else { return }
        self.syncManager.incrementalSync(
            client: client,
            profileId: profile.id,
            triliumInstanceId: iid,
            downloadChangedBodies: downloadChangedBodies
        )
        await waitWhileSyncing(atMost: maxWaitSeconds)
    }

    /// Re-validates cookies (`/api/app-info`) and refreshes CSRF. Use after the network returns so the next API calls don’t use a stale session from when the device was offline.
    @discardableResult
    func refreshTriliumSession(timeoutSeconds: TimeInterval = 18) async -> Bool {
        guard networkMonitor.isConnected,
              let client,
              activeProfile != nil,
              isAuthenticated
        else { return false }
        do {
            if let tc = client as? TriliumClient {
                try await restoreSessionWithTimeout(client: tc, seconds: timeoutSeconds)
            } else {
                try await client.restoreSession()
            }
            connectionError = nil
            lastRefreshed = .now
            if let tc = client as? TriliumClient, let profile = activeProfile {
                let data = await tc.exportSessionCookieData()
                try? await keychain.saveSessionCookies(data, forServer: profile.id)
            }
            return true
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return false }
            connectionError = apiError.localizedDescription
            Log.auth.warning("Trilium session refresh failed: \(error)")
            return false
        }
    }

    /// Refreshes the server session, pushes offline queues, incremental sync, then WebSocket. Prefer this for the tree toolbar / manual quick sync right after reconnect.
    func refreshSessionThenIncrementalSync(maxWaitSeconds: TimeInterval = 180, downloadChangedBodies: Bool = true) async {
        guard networkMonitor.isConnected,
              client != nil,
              activeProfile != nil,
              isAuthenticated
        else { return }
        connectionError = nil
        let ok = await refreshTriliumSession()
        guard ok else { return }
        await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
        await runIncrementalSync(maxWaitSeconds: maxWaitSeconds, downloadChangedBodies: downloadChangedBodies)
        startRealtimeIfPossible()
    }

    private func waitWhileSyncing(atMost seconds: TimeInterval) async {
        guard seconds > 0 else { return }
        let deadline = Date().addingTimeInterval(seconds)
        while syncManager.isSyncing, Date() < deadline {
            try? await Task.sleep(nanoseconds: 100_000_000)
        }
        if syncManager.isSyncing {
            Log.sync.warning("Sync still running after \(Int(seconds))s wait — cancelling so the user can retry")
            syncManager.cancel()
        }
    }

    /// Creates notes queued while offline (`PendingNoteCreation`), then pushes pending body uploads. Order matters for nested offline children.
    /// - Parameter assumeSessionIsReady: Set `true` when this is called immediately after `restoreSession` / login so we don’t repeat a network round-trip for the creation phase.
    func flushPendingLocalChangesIfPossible(assumeSessionIsReady: Bool = false) async {
        if offlineFlushInFlight {
            await withCheckedContinuation { offlineFlushWaiters.append($0) }
            return
        }
        offlineFlushInFlight = true
        defer {
            offlineFlushInFlight = false
            let waiters = offlineFlushWaiters
            offlineFlushWaiters.removeAll()
            for w in waiters { w.resume() }
        }
        await flushPendingNoteCreationsIfPossible(assumeSessionIsReady: assumeSessionIsReady)
        await flushPendingBranchMovesIfPossible(assumeSessionIsReady: true)
        await flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)
    }

    func flushPendingNoteCreationsIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        do {
            let pending = try persistence.fetchPendingNoteCreations(serverProfileId: profileId)
            guard !pending.isEmpty else { return }
        } catch {
            Log.sync.warning("Failed to read pending note creations: \(error)")
            return
        }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending note creation flush skipped — session refresh failed: \(error)")
                return
            }
        }
        if protectedSessionActive {
            try? await client.touchProtectedSession()
        }
        var idMap: [String: String] = [:]
        var didApplyAny = false
        // Re-fetch after each success so parent→child order and parent id rewrites from SwiftData are always current.
        // A single snapshot `for row in rows` plus concurrent flushes caused duplicate `createNote` calls and crashes.
        while true {
            let rows: [PendingNoteCreation]
            do {
                rows = try persistence.fetchPendingNoteCreations(serverProfileId: profileId)
            } catch {
                Log.sync.warning("Failed to read pending note creations: \(error)")
                return
            }
            guard let row = rows.first else { break }
            let resolvedParent = idMap[row.parentNoteId] ?? row.parentNoteId
            let request = CreateNoteRequest(
                parentNoteId: resolvedParent,
                title: row.title,
                type: row.noteType,
                mime: row.mime,
                content: row.initialContent,
                notePosition: nil,
                prefix: nil,
                isProtected: nil,
                noteId: nil,
                branchId: nil
            )
            do {
                let response = try await client.createNote(request)
                let newId = response.note.noteId
                idMap[row.localNoteId] = newId
                try persistence.applyOfflineNoteCreationServerResult(
                    queueRowId: row.id,
                    localNoteId: row.localNoteId,
                    localBranchId: row.localBranchId,
                    response: response,
                    serverProfileId: profileId
                )
                NotificationCenter.default.post(
                    name: .trinoteOfflineNoteIdReplaced,
                    object: nil,
                    userInfo: ["from": row.localNoteId, "to": newId]
                )
                didApplyAny = true
                Log.sync.info("Flushed offline-created note \(row.localNoteId) → \(newId)")
            } catch {
                Log.sync.warning("Pending note creation failed for \(row.localNoteId): \(error)")
                break
            }
        }
        if didApplyAny {
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        }
    }

    /// Applies queued tree moves (`PendingBranchMove`) after offline note creations (branch ids may remap).
    func flushPendingBranchMovesIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingBranchMove]
        do {
            pending = try persistence.fetchPendingBranchMoves(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending branch moves: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending branch move flush skipped — session refresh failed: \(error)")
                return
            }
        }
        if protectedSessionActive {
            try? await client.touchProtectedSession()
        }
        var didAny = false
        for row in pending {
            do {
                try await client.moveBranchToParent(branchId: row.sourceBranchId, parentBranchId: row.targetParentBranchId)
                try persistence.deletePendingBranchMove(id: row.id, serverProfileId: profileId)
                didAny = true
                Log.sync.info(
                    "Flushed queued branch move note \(row.sourceNoteId) (branch \(row.sourceBranchId) → parent branch \(row.targetParentBranchId))"
                )
            } catch {
                Log.sync.warning("Pending branch move failed for note \(row.sourceNoteId): \(error)")
                NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
                break
            }
        }
        if didAny {
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        }
    }

    /// Pushes bodies queued while offline (`PendingNoteBodyUpload`) after `restoreSession` has obtained CSRF.
    /// - Parameter assumeSessionIsReady: Set `true` when this is called immediately after `restoreSession` / login so we don’t repeat a network round-trip.
    func flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingNoteBodyUpload]
        do {
            pending = try persistence.fetchPendingNoteBodyUploads(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending body uploads: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending body upload flush skipped — session refresh failed: \(error)")
                return
            }
        }
        if protectedSessionActive {
            try? await client.touchProtectedSession()
        }
        for row in pending {
            do {
                let fresh = try? await client.getNote(row.noteId)
                let base = row.baseUtcDateModified.trimmingCharacters(in: .whitespacesAndNewlines)
                if let fresh {
                    let serverMod = fresh.utcDateModified.trimmingCharacters(in: .whitespacesAndNewlines)
                    let canDetectConflict = !base.isEmpty && !serverMod.isEmpty
                    if canDetectConflict, serverMod != base {
                        if fresh.isProtected {
                            try await client.updateNoteContent(row.noteId, content: row.body, contentType: row.mime)
                            Log.sync.warning(
                                "Offline body conflict for protected note \(row.noteId): applied overwrite (duplicate not supported)."
                            )
                        } else {
                            let parentId = fresh.parentNoteIds.first ?? "root"
                            let trimmedTitle = fresh.title.trimmingCharacters(in: .whitespacesAndNewlines)
                            let conflictSuffix = String(localized: " (ios-sync-conflict)", comment: "Appended to note title for offline/server merge conflict sibling")
                            let newTitle: String
                            if trimmedTitle.isEmpty {
                                newTitle = String(localized: "Note (ios-sync-conflict)", comment: "Title when original note has no title and iOS saved a conflict copy")
                            } else {
                                newTitle = "\(trimmedTitle)\(conflictSuffix)"
                            }
                            let response = try await client.createChildNoteWithContent(
                                parentNoteId: parentId,
                                title: newTitle,
                                noteType: fresh.type,
                                mime: fresh.mime,
                                body: row.body
                            )
                            try? persistence.cacheNote(from: response.note, serverProfileId: profileId)
                            try? persistence.cacheBranch(from: response.branch, serverProfileId: profileId)
                            try? persistence.commitBatch()
                            Log.sync.info(
                                "Offline body conflict for \(row.noteId): saved iOS copy as new note \(response.note.noteId) under \(parentId)"
                            )
                        }
                        try? persistence.deletePendingNoteBodyUpload(noteId: row.noteId, serverProfileId: profileId)
                        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
                        continue
                    }
                }
                try await client.updateNoteContent(row.noteId, content: row.body, contentType: row.mime)
                try? persistence.deletePendingNoteBodyUpload(noteId: row.noteId, serverProfileId: profileId)
                Log.sync.info("Flushed offline-edited body for note \(row.noteId)")
            } catch {
                Log.sync.warning("Pending body upload failed for \(row.noteId): \(error)")
                break
            }
        }
    }

    func bootstrap() async {
        isLoading = true
        defer { isLoading = false }

        do {
            if let profile = try persistence.activeProfile() {
                activeProfile = profile
                syncManager.restoreSyncState(profileId: profile.id)
                await quickActivateProfileForLaunch(profile)
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

    /// Bounded wait so offline / captive networks don’t leave bootstrap on “Connecting…” until URLSession’s default timeout.
    private func restoreSessionWithTimeout(client: TriliumClient, seconds: TimeInterval = 12) async throws {
        try await withThrowingTaskGroup(of: Void.self) { group in
            group.addTask {
                try await client.restoreSession()
            }
            group.addTask {
                let ns = UInt64(seconds * 1_000_000_000)
                try await Task.sleep(nanoseconds: ns)
                throw APIError.timeout
            }
            try await group.next()!
            group.cancelAll()
        }
    }

    /// Use SwiftData branch rows to repopulate `CachedNote` parent/child id lists (fixes detail sub-notes when incremental rows omitted tree fields).
    private func enterOfflineCacheMode(profile: ServerProfile) async {
        self.isAuthenticated = true
        self.connectionError = String(localized: "Offline — showing cached notes. Connect to refresh.", comment: "Banner when launch continues without server")
        self.lastRefreshed = nil
        try? persistence.setActiveProfile(profile)
        Log.auth.info("Proceeding offline with persisted session cookies for \(profile.name)")
        _ = try? await triliumInstanceId(for: profile)
        try? persistence.reconcileCachedNoteBranchesMetadata(serverProfileId: profile.id)
        await runIncrementalSync(maxWaitSeconds: 0)
        startRealtimeIfPossible()
    }

    /// Fast path for cold launch: attach client + profile, show cached UI when cookies exist, then validate session and sync in the background.
    private func quickActivateProfileForLaunch(_ profile: ServerProfile) async {
        guard let url = profile.url else { return }
        let cookieData = try? await keychain.loadSessionCookies(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url, persistedCookieData: cookieData)
        let hadPersistedSessionCookies = cookieData.map { !$0.isEmpty } ?? false

        self.client = newClient
        self.activeProfile = profile

        guard hadPersistedSessionCookies else {
            self.isAuthenticated = false
            return
        }

        self.isAuthenticated = true
        self.connectionError = nil
        try? persistence.setActiveProfile(profile)

        if !networkMonitor.isConnected {
            Task { @MainActor in
                await self.enterOfflineCacheMode(profile: profile)
            }
            return
        }

        Task { @MainActor in
            await self.finishOnlineProfileActivationAfterLaunch(profile: profile, hadPersistedSessionCookies: hadPersistedSessionCookies)
        }
    }

    /// Runs after launch: `restoreSession`, offline queues, incremental sync, WebSocket — without blocking the main tab / cached tree.
    private func finishOnlineProfileActivationAfterLaunch(profile: ServerProfile, hadPersistedSessionCookies: Bool) async {
        guard let client = self.client as? TriliumClient else { return }
        do {
            try await restoreSessionWithTimeout(client: client, seconds: 12)
            await endServerProtectedSessionAndPersistCookies()
            self.connectionError = nil
            self.lastRefreshed = .now
            let exported = await client.exportSessionCookieData()
            try? await keychain.saveSessionCookies(exported, forServer: profile.id)
            Log.auth.info("Connected to \(profile.name)")
            _ = try await triliumInstanceId(for: profile)
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            await runIncrementalSync(maxWaitSeconds: 0)
            startRealtimeIfPossible()
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            let canUseCacheOffline = hadPersistedSessionCookies && !apiError.isAuthError && apiError.isNetworkError
            if canUseCacheOffline {
                await enterOfflineCacheMode(profile: profile)
            } else {
                self.isAuthenticated = false
                self.connectionError = apiError.localizedDescription
                Log.auth.warning("Session restore failed: \(error)")
            }
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
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            await runIncrementalSync(maxWaitSeconds: 30)
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
        await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
        await runIncrementalSync(maxWaitSeconds: 30)
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
        guard networkMonitor.isConnected else { return }
        do {
            if let tc = client as? TriliumClient {
                try await restoreSessionWithTimeout(client: tc, seconds: 12)
            } else {
                try await client.restoreSession()
            }
            connectionError = nil
            lastRefreshed = .now
            if let tc = client as? TriliumClient {
                let data = await tc.exportSessionCookieData()
                try? await keychain.saveSessionCookies(data, forServer: profile.id)
            }
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            await runIncrementalSync(maxWaitSeconds: 15)
            startRealtimeIfPossible()
        } catch {
            connectionError = APIError.from(error).localizedDescription
        }
    }
}
