import Foundation
import SwiftUI
import UIKit
import Observation

@Observable
@MainActor
final class AppState {
    /// The app's state once its window has started, for Shortcuts that run in the same process (`ShortcutSession`):
    /// they use its signed-in client instead of building a second one. Set by `TrinoteApp`; tests leave it nil.
    static weak var current: AppState?

    var activeProfile: ServerProfile?
    var client: (any TriliumClientProtocol)?
    var isAuthenticated = false {
        didSet {
            // Builds the offline search index for a cache synced before it existed, and catches it up on sign-in and
            // server switches (sync keeps it current after that).
            if isAuthenticated, let profileId = activeProfile?.id {
                OfflineSearchIndex.shared.scheduleRefresh(profileId: profileId, minimumInterval: 60)
                Task { await self.refreshAIConfig() }
            }
        }
    }
    var isLoading = true
    var connectionError: String?
    var lastRefreshed: Date?
    /// Cached from the latest successful `restoreSession()` (`/api/app-info`). Used for server capability gates (e.g. spreadsheet note type).
    private(set) var serverAppInfo: AppInfoResponse?
    /// Trilium's AI options for the active profile (`GET /api/options`), kept in memory only; see `TriliumAIConfig`.
    private(set) var aiConfig: TriliumAIConfig?
    /// Trilium's "auto link previews" option (`textNoteAutoLinkPreviewsEnabled`), read with the server's other options.
    /// On until the server says otherwise; it only decides whether pasted or typed URLs become link previews.
    private(set) var serverAutoLinkPreviewsEnabled = true
    /// In-memory: whether the user has unlocked protected notes. The session ends when Trinote leaves the foreground
    /// or, with Lock Protected Notes set to After Server Timeout, once the server's timeout passes without a protected
    /// note being opened or saved (`ProtectedSessionLockPolicy`). It also ends after restoring the main login (see
    /// `endServerProtectedSessionAndPersistCookies()`) and when the server ends it.
    var protectedSessionActive = false {
        didSet {
            guard protectedSessionActive != oldValue else { return }
            if protectedSessionActive {
                protectedSessionDidStart()
            } else {
                protectedSessionExpiryTask?.cancel()
                protectedSessionExpiryTask = nil
                lastProtectedSessionActivity = nil
                // Ended on purpose (lock, timeout, sign-out, server switch): a relaunch must not reopen it.
                if let profileId = protectedSessionProfileId ?? activeProfile?.id {
                    ProtectedSessionTimeout.forgetLastActivity(profileId: profileId)
                }
                protectedSessionProfileId = nil
            }
        }
    }

    /// The server the protected session was opened on (it is per server).
    @ObservationIgnored private var protectedSessionProfileId: String?
    /// Set while a relaunch reopens a session, so it keeps its last activity instead of starting the clock again.
    @ObservationIgnored private var resumedProtectedSessionLastActivity: Date?
    @ObservationIgnored private var protectedNotesSyncedObserver: NSObjectProtocol?
    /// The server's `protectedSessionTimeout` in seconds by server profile id, as read this run (`GET /api/options`).
    private var serverProtectedSessionTimeouts: [String: TimeInterval] = [:]
    /// When Trinote last unlocked, opened, or saved a protected note; nil while no session is active.
    @ObservationIgnored private var lastProtectedSessionActivity: Date?
    /// When this run last told the server about protected-note activity (`login/protected/touch`).
    @ObservationIgnored private var lastServerProtectedSessionTouch: Date?
    /// After Server Timeout: sleeps until protected notes are due to lock, then `enforceProtectedSessionTimeoutIfNeeded`.
    @ObservationIgnored private var protectedSessionExpiryTask: Task<Void, Never>?

    /// Bumped **before** `activeProfile` changes to another instance so `MainTabView` can recreate `NavigationStack`s while the outgoing profile is still current (avoids stale `NoteDetailView` briefly adopting the new profile).
    private(set) var tabNavigationResetGeneration: Int = 0

    let networkMonitor = NetworkMonitor.shared
    let syncManager = SyncManager()
    let imageCachePrefetcher = ImageCachePrefetcher()
    let localTransfer = LocalNoteTransferService()
    let shareImport = ShareImportCoordinator()
    /// A note the Open Today's Journal Shortcut asked for, for the notes tree to open (`handleExternalOpenRequests`).
    var pendingExternalOpen: ExternalOpenResult?
    private let persistence = PersistenceManager.shared
    private let cacheExclusion = CacheExclusionPolicy()
    private let keychain = KeychainManager.shared

    private var realtime: TriliumWebSocketConnection?
    /// Progress handlers for the server tasks this app started, by task id (see `trackServerTask`).
    @ObservationIgnored private var serverTaskProgressHandlers: [String: @MainActor (ServerTaskProgress) -> Void] = [:]

    /// Ensures only one offline queue flush runs at a time. Concurrent callers await the same run (then return without duplicating work).
    private var offlineFlushInFlight = false
    private var offlineFlushWaiters: [CheckedContinuation<Void, Never>] = []

    /// Tracks server timestamps resulting from our own successful uploads, keyed by noteId.
    /// Used to distinguish "server changed because we uploaded" from "another client changed the note"
    /// when the post-upload getNote call fails on a flaky connection.
    private var lastOwnUploadTimestamps: [String: String] = [:]

    /// Background time for uploading local changes, above all notes Autosave saves as the app leaves the foreground.
    /// Without it iOS can suspend the app mid-request (issue #26).
    @ObservationIgnored private var uploadBackgroundTask: UIBackgroundTaskIdentifier = .invalid
    @ObservationIgnored private var uploadBackgroundTaskUsers = 0
    /// How long leaving the app waits for queued uploads before ending the protected session (which protected notes'
    /// uploads need). Uploads still running then carry on in the background time left.
    static let backgroundUploadWaitSeconds: Double = 10

    var isOnline: Bool { networkMonitor.isConnected }

    /// A server search that timed out or couldn't connect: until `until`, search looks on this device first so each
    /// keystroke doesn't wait out another timeout (issue #29).
    struct ServerSearchBackoff {
        let until: Date
        let message: String
    }

    /// Per server profile; shared by the Search tab and the note picker. Retry clears it.
    @ObservationIgnored private var serverSearchBackoffs: [String: ServerSearchBackoff] = [:]

    static let serverSearchBackoffDuration: TimeInterval = 60

    /// The active server's back-off, while it lasts.
    var activeServerSearchBackoff: ServerSearchBackoff? {
        guard let profileId = activeProfile?.id,
              let backoff = serverSearchBackoffs[profileId], backoff.until > .now else { return nil }
        return backoff
    }

    func beginServerSearchBackoff(message: String) {
        guard let profileId = activeProfile?.id else { return }
        serverSearchBackoffs[profileId] = ServerSearchBackoff(
            until: .now.addingTimeInterval(Self.serverSearchBackoffDuration),
            message: message
        )
    }

    func clearServerSearchBackoff() {
        guard let profileId = activeProfile?.id else { return }
        serverSearchBackoffs[profileId] = nil
    }

    /// Ends the Trilium protected-note session on the server and persists cookies. Call after restoring the main session and when the app goes to the background so the document password is required again.
    func endServerProtectedSessionAndPersistCookies() async {
        protectedSessionActive = false
        // Signed out (the login screen keeps the profile's client), there is no session to end or cookie to keep.
        guard isAuthenticated, let client, activeProfile != nil else { return }
        try? await client.exitProtectedSession()
        await persistSessionCookies(reason: "end protected session")
    }

    /// Saves the active profile's session cookies to the Keychain (what the next launch restores from).
    private func persistSessionCookies(reason: String) async {
        guard isAuthenticated, let tc = client as? TriliumClient, let profile = activeProfile else { return }
        await saveSessionCookies(of: tc, profileId: profile.id, reason: reason)
    }

    /// Stores `client`'s cookies as the profile's login, but only while they carry the session the server confirmed
    /// as signed in. Otherwise the stored login is left alone: replacing it with a jar that lost its `trilium.sid`, or
    /// holds an anonymous one, is what sent a relaunch to the server login page.
    private func saveSessionCookies(of client: TriliumClient, profileId: String, reason: String) async {
        await TriliumSessionFactory.saveSessionCookies(of: client, profileId: profileId, reason: reason, keychain: keychain)
    }

    /// Called when the app enters background.
    /// Starts a short background execution window if a sync is running, and persists cookies.
    func onBackground() async {
        SessionCookieTrace.log("background: authenticated=\(isAuthenticated) protected=\(protectedSessionActive) policy=\(ProtectedSessionLockPolicy.current.rawValue)")
        localTransfer.onBackground()
        syncManager.beginBackgroundTimeExtensionIfNeeded()
        imageCachePrefetcher.beginBackgroundTimeExtensionIfNeeded()
        // Notes saved as the app left go up before the protected session ends: a protected note can't be saved without it.
        if isAuthenticated, networkMonitor.isConnected, let pid = activeProfile?.id, hasPendingLocalChanges(serverProfileId: pid) {
            beginUploadBackgroundTime()
            await flushPendingLocalChanges(waitingAtMost: Self.backgroundUploadWaitSeconds)
            endUploadBackgroundTime()
        }
        if protectedSessionActive, ProtectedSessionLockPolicy.current == .serverTimeout {
            // After Server Timeout: the session runs on in the background; `onForegroundResume` catches up on a
            // timeout that passed meanwhile.
            await persistSessionCookies(reason: "background")
        } else {
            await endServerProtectedSessionAndPersistCookies()
        }
    }

    // MARK: - Protected session timeout (Settings → Security → Lock Protected Notes)

    /// The server is told about protected-note activity at most this often (desktop touches on every protected
    /// note it shows; the server's own expiry check runs every 30 s).
    static let serverProtectedSessionTouchInterval: TimeInterval = 30

    /// The active server's protected session timeout: the value read this run, else the one remembered from an
    /// earlier run, else nil (never read).
    var serverProtectedSessionTimeout: TimeInterval? {
        guard let profileId = activeProfile?.id else { return nil }
        return serverProtectedSessionTimeouts[profileId] ?? ProtectedSessionTimeout.rememberedServerValue(profileId: profileId)
    }

    /// The timeout After Server Timeout locks with: the server's, or Trilium's default until it has been read.
    private var effectiveProtectedSessionTimeout: TimeInterval {
        serverProtectedSessionTimeout ?? ProtectedSessionTimeout.triliumDefaultSeconds
    }

    /// Reads `protectedSessionTimeout` from the server (`GET /api/options`) and remembers it for the profile.
    @discardableResult
    func refreshServerProtectedSessionTimeout() async -> TimeInterval? {
        guard networkMonitor.isConnected, isAuthenticated, let client, let profile = activeProfile else {
            return serverProtectedSessionTimeout
        }
        do {
            let options = try await client.getOptions()
            guard activeProfile?.id == profile.id else { return serverProtectedSessionTimeout }
            serverAutoLinkPreviewsEnabled = options.autoLinkPreviewsEnabled
            if let seconds = options.protectedSessionTimeoutSeconds {
                serverProtectedSessionTimeouts[profile.id] = seconds
                ProtectedSessionTimeout.rememberServerValue(seconds, profileId: profile.id)
            } else {
                Log.api.warning("The server sent no usable protectedSessionTimeout option")
            }
        } catch {
            Log.api.warning("Could not read the server's protected session timeout: \(error)")
        }
        return serverProtectedSessionTimeout
    }

    /// Settings calls this when Lock Protected Notes changes, so an active session follows the new choice at once.
    func protectedSessionLockPolicyDidChange() {
        guard protectedSessionActive else { return }
        switch ProtectedSessionLockPolicy.current {
        case .whenLeavingApp:
            protectedSessionExpiryTask?.cancel()
            protectedSessionExpiryTask = nil
        case .serverTimeout:
            if lastProtectedSessionActivity == nil { lastProtectedSessionActivity = .now }
            scheduleProtectedSessionExpiry()
            Task { @MainActor in
                await refreshServerProtectedSessionTimeout()
                scheduleProtectedSessionExpiry()
            }
        }
    }

    /// Trinote opened or saved a protected note: the countdown to locking starts over, and the server hears about
    /// it (throttled) so its own timeout keeps pace, as it does for Trilium desktop.
    func recordProtectedNoteActivity() {
        guard protectedSessionActive else { return }
        lastProtectedSessionActivity = .now
        rememberProtectedSessionActivity()
        if ProtectedSessionLockPolicy.current == .serverTimeout {
            scheduleProtectedSessionExpiry()
        }
        if let last = lastServerProtectedSessionTouch,
           Date.now.timeIntervalSince(last) < Self.serverProtectedSessionTouchInterval {
            return
        }
        Task { @MainActor in await touchServerProtectedSession() }
    }

    /// Ends the protected session once the server's timeout has passed since the last protected-note activity
    /// (After Server Timeout). Runs when the expiry task wakes and on return to the foreground, which catches up on
    /// a sleep that ran out while Trinote was suspended.
    func enforceProtectedSessionTimeoutIfNeeded() async {
        guard protectedSessionActive, ProtectedSessionLockPolicy.current == .serverTimeout,
              let lastActivity = lastProtectedSessionActivity
        else { return }
        if ProtectedSessionTimeout.hasExpired(lastActivity: lastActivity, timeout: effectiveProtectedSessionTimeout) {
            Log.auth.info("Protected notes locked: the server's timeout passed without protected-note activity")
            await endServerProtectedSessionAndPersistCookies()
        } else {
            scheduleProtectedSessionExpiry()
        }
    }

    private func protectedSessionDidStart() {
        let resumedActivity = resumedProtectedSessionLastActivity
        resumedProtectedSessionLastActivity = nil
        protectedSessionProfileId = activeProfile?.id
        lastProtectedSessionActivity = resumedActivity ?? .now
        lastServerProtectedSessionTouch = .now
        rememberProtectedSessionActivity()
        observeProtectedNotesSyncedIfNeeded()
        Task { @MainActor in
            // Like desktop's enableProtectedSession(): a touch right away, so a last-operation date the server kept
            // from a session that expired long ago can't make its 30 s check end this one at once. A reopened session
            // keeps the server's clock as it was, so it ends when the timeout counted from the last activity says.
            if resumedActivity == nil {
                await touchServerProtectedSession()
            }
            // The session is the server's, not one note's: every protected note becomes readable, so fetch all of
            // their titles, not only those on the page the password was entered from.
            await refreshProtectedNoteTitles()
            // Captures that waited for a protected journal can go in now.
            await flushShortcutJournalCaptures()
            guard ProtectedSessionLockPolicy.current == .serverTimeout else { return }
            scheduleProtectedSessionExpiry()
            await refreshServerProtectedSessionTimeout()
            scheduleProtectedSessionExpiry()
        }
    }

    private func scheduleProtectedSessionExpiry() {
        protectedSessionExpiryTask?.cancel()
        protectedSessionExpiryTask = nil
        guard protectedSessionActive, ProtectedSessionLockPolicy.current == .serverTimeout,
              let lastActivity = lastProtectedSessionActivity
        else { return }
        let lockDate = ProtectedSessionTimeout.lockDate(lastActivity: lastActivity, timeout: effectiveProtectedSessionTimeout)
        protectedSessionExpiryTask = Task { @MainActor [weak self] in
            let wait = max(0, lockDate.timeIntervalSinceNow)
            try? await Task.sleep(for: .seconds(wait), clock: .continuous)
            guard !Task.isCancelled else { return }
            await self?.enforceProtectedSessionTimeoutIfNeeded()
        }
    }

    /// Keeps the last protected-note activity on the device while the session is open, for a relaunch to reopen it.
    private func rememberProtectedSessionActivity() {
        guard protectedSessionActive, let profileId = protectedSessionProfileId ?? activeProfile?.id,
              let lastActivity = lastProtectedSessionActivity else { return }
        ProtectedSessionTimeout.rememberLastActivity(lastActivity, profileId: profileId)
    }

    /// After a cold launch: with After Server Timeout, a session that was open when Trinote closed reopens without
    /// the password while its timeout hasn't passed and the server still has it (another device or the server's own
    /// timeout may have ended it). Otherwise it ends, as it always did.
    private func resumeOrEndProtectedSessionAfterLaunch(profileId: String) async {
        let lastActivity = ProtectedSessionTimeout.rememberedLastActivity(profileId: profileId)
        if lastActivity != nil, ProtectedSessionLockPolicy.current == .serverTimeout {
            await refreshServerProtectedSessionTimeout()
        }
        if ProtectedSessionTimeout.canResume(
            lastActivity: lastActivity,
            timeout: effectiveProtectedSessionTimeout,
            policy: ProtectedSessionLockPolicy.current
        ), await serverHasProtectedSession() == true, activeProfile?.id == profileId {
            resumedProtectedSessionLastActivity = lastActivity
            protectedSessionActive = true
            await persistSessionCookies(reason: "protected session resumed")
            Log.auth.info("Protected notes stay unlocked after relaunch: the server's timeout hasn't passed")
            return
        }
        await endServerProtectedSessionAndPersistCookies()
    }

    /// Whether the server's protected session is open, read from a cached protected note's title: `tree/load` gives
    /// it readable while the session is open and `[protected]` while it isn't. nil when nothing can tell.
    private func serverHasProtectedSession() async -> Bool? {
        guard let client, let profileId = activeProfile?.id,
              let probeId = (try? persistence.cachedProtectedNoteIds(serverProfileId: profileId))?.first,
              let tree = try? await client.batchTreeLoad(noteIds: [probeId]),
              let row = tree.notes.first(where: { $0.noteId == probeId }), row.isProtected
        else { return nil }
        return row.title != Self.lockedProtectedTitle
    }

    /// What Trilium sends as a protected note's title while the protected session is closed (`getTitleOrProtected`).
    static let lockedProtectedTitle = "[protected]"

    /// Fetches readable titles of protected notes (all cached ones, or `noteIds`) while the session is open, in
    /// batched `tree/load` requests, writes them to the cache and redraws the tree. Sync stores these titles
    /// encrypted, and unlocking used to refresh only the notes around the one the password was entered for.
    func refreshProtectedNoteTitles(noteIds: [String]? = nil) async {
        guard protectedSessionActive, networkMonitor.isConnected, let client, let profileId = activeProfile?.id else { return }
        let ids = noteIds ?? ((try? persistence.cachedProtectedNoteIds(serverProfileId: profileId)) ?? [])
        guard !ids.isEmpty else { return }
        var titles: [String: String] = [:]
        for chunk in ids.chunked(into: 100) {
            guard protectedSessionActive, activeProfile?.id == profileId else { return }
            do {
                let tree = try await client.batchTreeLoad(noteIds: chunk)
                // `tree/load` also returns ancestors; their readable titles are as good.
                for row in tree.notes where row.isProtected && row.title != Self.lockedProtectedTitle {
                    titles[row.noteId] = row.title
                }
            } catch {
                Log.api.warning("Protected titles: tree/load failed for \(chunk.count) notes: \(error)")
            }
        }
        guard protectedSessionActive, activeProfile?.id == profileId else { return }
        let changed = (try? persistence.updateCachedNoteTitles(titles, serverProfileId: profileId)) ?? 0
        if changed > 0 {
            Log.api.info("Protected titles: \(changed) of \(ids.count) updated")
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        }
    }

    /// While the session is open, notes a sync wrote get their readable titles (sync rows carry them encrypted).
    private func observeProtectedNotesSyncedIfNeeded() {
        guard protectedNotesSyncedObserver == nil else { return }
        protectedNotesSyncedObserver = NotificationCenter.default.addObserver(
            forName: .trinoteProtectedNotesSynced, object: nil, queue: .main
        ) { [weak self] notification in
            let ids = notification.userInfo?["noteIds"] as? [String] ?? []
            let profileId = notification.userInfo?["profileId"] as? String
            Task { @MainActor in
                guard let self, self.protectedSessionActive, profileId == self.activeProfile?.id else { return }
                await self.refreshProtectedNoteTitles(noteIds: ids)
            }
        }
    }

    /// `POST /api/login/protected/touch`: keeps the server's protected session timeout from running out.
    private func touchServerProtectedSession() async {
        guard protectedSessionActive, let client else { return }
        lastServerProtectedSessionTouch = .now
        try? await client.touchProtectedSession()
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

    /// Vault-wide tree walk + body download (same as Settings → Full Sync). Used on cold launch.
    func runFullSync(maxWaitSeconds: TimeInterval = 0) async {
        guard networkMonitor.isConnected else { return }
        guard let client, let profile = activeProfile else { return }
        let instanceId = try? await keychain.loadTriliumInstanceId(forServer: profile.id)
        imageCachePrefetcher.cancel()
        syncManager.fullSync(client: client, profileId: profile.id, triliumInstanceId: instanceId)
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
                await saveSessionCookies(of: tc, profileId: profile.id, reason: "session refresh")
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
    }

    /// Creates notes queued while offline (`PendingNoteCreation`), then pushes pending body uploads. Order matters for nested offline children.
    /// - Parameter assumeSessionIsReady: Set `true` when this is called immediately after `restoreSession` / login so we don’t repeat a network round-trip for the creation phase.
    /// Server ids given this session to notes created offline (`ol_…`), for work that needs the note on the server.
    @ObservationIgnored private var offlineNoteIdReplacements: [String: String] = [:]

    /// The server id of a note created offline once it has been uploaded; any other id is returned as it is.
    func serverNoteId(for noteId: String) -> String {
        offlineNoteIdReplacements[noteId] ?? noteId
    }

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
        await flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)
        await flushPendingAttachmentImportsIfPossible(assumeSessionIsReady: true)
        await flushPendingNotePatchesIfPossible(assumeSessionIsReady: true)
        await flushPendingNoteDeletionsIfPossible(assumeSessionIsReady: true)
        await flushPendingBranchMovesIfPossible(assumeSessionIsReady: true)
        // Journal captures Shortcuts saved on the device go once the session is known to work.
        if assumeSessionIsReady {
            await flushShortcutJournalCaptures()
        }
    }

    /// Fire-and-forget: tries to push all pending local changes to the server in the background.
    /// Safe to call at any time; returns immediately. The flush serializes itself, respects
    /// network availability, and leaves pending rows in SwiftData on failure for later retry.
    /// Re-runs automatically if new changes arrived while a flush was in flight.
    func backgroundSyncPendingChanges() {
        if CheckboxPerf.lastToggleID > 0,
           CheckboxPerf.lastToggleEndedAt > 0,
           CFAbsoluteTimeGetCurrent() - CheckboxPerf.lastToggleEndedAt < 10 {
            CheckboxPerf.log("backgroundSyncPendingChanges kickoff lastToggle=#\(CheckboxPerf.lastToggleID)")
        }
        // Often called as the app leaves the foreground (Autosave saves then), so ask for time to finish.
        beginUploadBackgroundTime()
        Task { [weak self] in
            defer { self?.endUploadBackgroundTime() }
            guard let self else { return }
            await self.flushPendingLocalChangesIfPossible()
            // If new writes landed while we were flushing (conditional delete kept them),
            // run one more pass so the latest content reaches the server.
            guard let pid = self.activeProfile?.id else { return }
            if self.hasPendingLocalChanges(serverProfileId: pid) {
                await self.flushPendingLocalChangesIfPossible()
            }
        }
    }

    /// Whether anything made on this device is still waiting to reach the server.
    private func hasPendingLocalChanges(serverProfileId pid: String) -> Bool {
        let hasCreations = (try? persistence.fetchPendingNoteCreations(serverProfileId: pid))?.isEmpty == false
        let hasPatches = (try? persistence.fetchPendingNotePatches(serverProfileId: pid))?.isEmpty == false
        let hasDeletions = (try? persistence.fetchPendingNoteDeletions(serverProfileId: pid))?.isEmpty == false
        let hasUploads = (try? persistence.fetchPendingNoteBodyUploads(serverProfileId: pid))?.isEmpty == false
        let hasAttachments = (try? persistence.fetchPendingAttachmentImports(serverProfileId: pid))?.isEmpty == false
        return hasCreations || hasPatches || hasDeletions || hasUploads || hasAttachments
    }

    /// Flushes local changes but returns after `seconds` at most; a flush still running then carries on.
    private func flushPendingLocalChanges(waitingAtMost seconds: Double) async {
        let gate = FirstToFinish()
        Task { [weak self] in
            await self?.flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            gate.finish()
        }
        let timer = Task {
            try? await Task.sleep(for: .seconds(seconds))
            gate.finish()
        }
        await gate.wait()
        timer.cancel()
    }

    /// Counted, so overlapping uploads share one background task, ended when the last finishes.
    private func beginUploadBackgroundTime() {
        uploadBackgroundTaskUsers += 1
        guard uploadBackgroundTask == .invalid else { return }
        uploadBackgroundTask = UIApplication.shared.beginBackgroundTask(withName: "TrinoteNoteUpload") { [weak self] in
            // Runs on the main thread, and the task has to end before this returns or iOS ends the app.
            MainActor.assumeIsolated { self?.endUploadBackgroundTime(expired: true) }
        }
    }

    private func endUploadBackgroundTime(expired: Bool = false) {
        uploadBackgroundTaskUsers = expired ? 0 : max(0, uploadBackgroundTaskUsers - 1)
        guard uploadBackgroundTaskUsers == 0, uploadBackgroundTask != .invalid else { return }
        if expired { Log.sync.warning("Background time for uploads ran out; what's left uploads on the next launch or return") }
        UIApplication.shared.endBackgroundTask(uploadBackgroundTask)
        uploadBackgroundTask = .invalid
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
        await touchServerProtectedSession()
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

            // Pre-parse attributes to find & resolve ~template before createNote.
            var parsedAttrs: [[String: Any]] = []
            var resolvedTemplateNoteId: String?
            var templateTitleFromAttrs: String?
            let attrsJSON = row.initialAttributesJSON
            if attrsJSON != "[]", !attrsJSON.isEmpty,
               let data = attrsJSON.data(using: .utf8),
               let raw = try? JSONSerialization.jsonObject(with: data) as? [Any] {
                for item in raw {
                    guard let attr = item as? [String: Any] else { continue }
                    parsedAttrs.append(attr)
                }
                for attr in parsedAttrs {
                    guard let type = attr["type"] as? String, type == "relation",
                          let name = attr["name"] as? String, name == "template",
                          let value = attr["value"] as? String else { continue }
                    templateTitleFromAttrs = value
                    resolvedTemplateNoteId = await Self.resolveTemplateTitle(client: client, title: value)
                    break
                }
            }
            if let templateTitleFromAttrs, resolvedTemplateNoteId == nil {
                Log.sync.warning(
                    "Could not resolve template title '\(templateTitleFromAttrs)' for pending note \(row.localNoteId); falling back to non-template create."
                )
            }

            // Templates only clone attributes; the create request's content is always the
            // note's own body. Sending empty content here used to discard the initial
            // viewport JSON for geo maps (and any other initial body).
            let contentToSend = row.initialContent

            let request = CreateNoteRequest(
                parentNoteId: resolvedParent,
                title: row.titleFromTemplate ? nil : row.title,
                type: row.noteType,
                mime: row.mime,
                content: contentToSend,
                notePosition: nil,
                prefix: nil,
                isProtected: nil,
                noteId: nil,
                branchId: nil,
                templateNoteId: resolvedTemplateNoteId
            )
            let attrsForLog: String = {
                let raw = row.initialAttributesJSON
                if raw.count > 2800 {
                    return String(raw.prefix(2800)) + "…(+\(raw.count - 2800) chars)"
                }
                return raw
            }()
            let flushCreateLog = NoteDiagnostics.describeFlushPendingCreate(
                localNoteId: row.localNoteId,
                resolvedParent: resolvedParent,
                title: row.title,
                noteType: row.noteType,
                mime: row.mime,
                initialContentLen: row.initialContent.count,
                contentToSendLen: contentToSend.count,
                templateTitleFromAttrs: templateTitleFromAttrs,
                resolvedTemplateNoteId: resolvedTemplateNoteId,
                attrsJSONTruncated: attrsForLog,
                willPostCreateAttributes: resolvedTemplateNoteId == nil
            )
            Log.noteDiag.info("\(flushCreateLog)")
            Log.sync.info(
                "Flushing pending create \(row.localNoteId) type=\(row.noteType) templateNoteId=\(resolvedTemplateNoteId ?? "nil")"
            )
            do {
                let response = try await client.createNote(request)
                let newId = response.note.noteId
                idMap[row.localNoteId] = newId

                // Apply cache + dequeue **before** attributes. If any `createAttribute` fails, we must not
                // leave the row queued or the next flush would call `createNote` again (duplicate notes).
                try persistence.applyOfflineNoteCreationServerResult(
                    queueRowId: row.id,
                    localNoteId: row.localNoteId,
                    localBranchId: row.localBranchId,
                    response: response,
                    serverProfileId: profileId
                )
                offlineNoteIdReplacements[row.localNoteId] = newId
                NotificationCenter.default.post(
                    name: .trinoteOfflineNoteIdReplaced,
                    object: nil,
                    userInfo: ["from": row.localNoteId, "to": newId]
                )

                // When templateNoteId was provided, the server handles everything:
                // ~template relation, content, type/mime, and child subtree. All other
                // attributes are inherited from the template — adding them directly
                // creates duplicates that break the desktop layout system.
                // Only add attributes when no template was resolved (plain note).
                if resolvedTemplateNoteId != nil {
                    Log.noteDiag.info(
                        "NoteDiag CREATE flush skipPostAttributes noteId=\(newId) reason=templateNoteId_applied_on_server parsedAttrCount=\(parsedAttrs.count)"
                    )
                    await Self.applyCalendarJournalLabelsAfterTemplateCreateIfNeeded(
                        client: client,
                        noteId: newId,
                        parsedAttrs: parsedAttrs
                    )
                    for attr in parsedAttrs where (attr["applyAfterTemplate"] as? Bool) == true {
                        guard let type = attr["type"] as? String,
                              let name = attr["name"] as? String,
                              let value = attr["value"] as? String else { continue }
                        do {
                            try await client.createAttribute(CreateAttributeRequest(
                                noteId: newId, type: type, name: name,
                                value: value, isInheritable: nil, position: nil
                            ))
                        } catch {
                            Log.sync.warning("createAttribute after template failed for \(newId) (\(type)/\(name)): \(error)")
                        }
                    }
                }
                if resolvedTemplateNoteId == nil {
                    for attr in parsedAttrs {
                        guard let type = attr["type"] as? String,
                              let name = attr["name"] as? String else { continue }
                        if type == "relation", name == "template" {
                            guard let value = attr["value"] as? String else { continue }
                            let fallbackId = await Self.resolveTemplateTitle(client: client, title: value)
                            guard let resolvedId = fallbackId else {
                                Log.sync.warning("Skipping unresolvable ~template for note \(newId) (title: \(value))")
                                continue
                            }
                            do {
                                try await client.createAttribute(CreateAttributeRequest(
                                    noteId: newId, type: type, name: name,
                                    value: resolvedId, isInheritable: nil, position: nil
                                ))
                            } catch {
                                Log.sync.warning("createAttribute failed for ~template on \(newId): \(error)")
                            }
                            continue
                        }
                        let value: String
                        if let s = attr["value"] as? String {
                            value = s
                        } else if let n = attr["value"] as? NSNumber {
                            value = n.stringValue
                        } else {
                            continue
                        }
                        let inheritable = (attr["isInheritable"] as? Bool) ?? false
                        do {
                            try await client.createAttribute(CreateAttributeRequest(
                                noteId: newId, type: type, name: name,
                                value: value,
                                isInheritable: inheritable ? true : nil,
                                position: nil
                            ))
                        } catch {
                            Log.sync.warning(
                                "createAttribute failed for flushed note \(newId) (\(type)/\(name)): \(error)"
                            )
                        }
                    }
                }

                if let fresh = try? await client.getNote(newId) {
                    let postCreatePhase = "create.flush.postGetNote serverId=\(newId)"
                    Log.noteDiag.info("\(NoteDiagnostics.describeNoteResponse(fresh, phase: postCreatePhase))")
                    persistNoteResponseToCache(fresh, profileId: profileId)
                } else {
                    Log.noteDiag.warning("NoteDiag CREATE flush postGetNote failed for serverId=\(newId)")
                }

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

    /// Pushes queued title changes (`PendingNotePatch`) to the server.
    func flushPendingNotePatchesIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingNotePatch]
        do {
            pending = try persistence.fetchPendingNotePatches(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending note patches: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending note patch flush skipped — session refresh failed: \(error)")
                return
            }
        }
        await touchServerProtectedSession()
        var didAny = false
        for row in pending {
            do {
                let updated = try await client.updateNote(
                    row.noteId,
                    request: UpdateNoteRequest(
                        title: row.title,
                        type: row.mime != nil ? "code" : nil,
                        mime: row.mime
                    )
                )
                if let cached = try? persistence.fetchCachedNote(id: row.noteId, serverProfileId: profileId) {
                    cached.title = updated.title
                    cached.mime = updated.mime
                }
                try persistence.deletePendingNotePatch(noteId: row.noteId, serverProfileId: profileId)
                didAny = true
                Log.sync.info("Flushed offline note patch for note \(row.noteId)")
            } catch {
                let apiErr = APIError.from(error)
                if case .notFound = apiErr {
                    try? persistence.deletePendingNotePatch(noteId: row.noteId, serverProfileId: profileId)
                    didAny = true
                } else {
                    Log.sync.warning("Pending note patch failed for \(row.noteId): \(error)")
                    break
                }
            }
        }
        if didAny {
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        }
    }

    /// Pushes queued note deletions (`PendingNoteDeletion`) to the server. Treats 404 (already gone) as success.
    func flushPendingNoteDeletionsIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingNoteDeletion]
        do {
            pending = try persistence.fetchPendingNoteDeletions(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending note deletions: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending note deletion flush skipped — session refresh failed: \(error)")
                return
            }
        }
        await touchServerProtectedSession()
        var didAny = false
        for row in pending {
            do {
                try await client.deleteNote(row.noteId, eraseNotes: row.eraseNotes)
                try persistence.deletePendingNoteDeletion(id: row.id, serverProfileId: profileId)
                GhostNoteTracker.shared.add(row.noteId, serverProfileId: profileId)
                try? persistence.deleteCachedNotes(noteIds: [row.noteId], serverProfileId: profileId, clearGhost: false)
                didAny = true
                Log.sync.info("Flushed offline-queued deletion for note \(row.noteId)")
            } catch {
                let apiErr = APIError.from(error)
                if case .notFound = apiErr {
                    try? persistence.deletePendingNoteDeletion(id: row.id, serverProfileId: profileId)
                    GhostNoteTracker.shared.add(row.noteId, serverProfileId: profileId)
                    try? persistence.deleteCachedNotes(noteIds: [row.noteId], serverProfileId: profileId, clearGhost: false)
                    didAny = true
                    Log.sync.info("Note \(row.noteId) already deleted on server, removed queue entry")
                } else {
                    Log.sync.warning("Pending note deletion failed for \(row.noteId): \(error)")
                    break
                }
            }
        }
        if didAny {
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
        await touchServerProtectedSession()
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
        CheckboxPerf.log(
            "flushBodies start count=\(pending.count) lastToggle=#\(CheckboxPerf.lastToggleID) sizes=[\(pending.map { "\($0.noteId):\($0.body.count)B" }.joined(separator: ","))]"
        )
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending body upload flush skipped — session refresh failed: \(error)")
                return
            }
        }
        await touchServerProtectedSession()
        for row in pending {
            let snapshotDate = row.queuedAt
            let tRow = CFAbsoluteTimeGetCurrent()
            // Read once up front: the row is deleted below, and touching its attributes afterwards traps
            // with "backing data was detached from a context without resolving attribute faults".
            let rowNoteId = row.noteId
            let rowBodyBytes = row.body.count
            // A note made offline keeps its temporary id until its creation reaches the server, which renames this
            // row; until then every request for it fails, so it waits without holding up the rows after it.
            if rowNoteId.isOfflineLocalNoteId { continue }
            /// Trilium says the note doesn't exist (not just that the request failed).
            var noteMissingOnServer = false
            do {
                let fresh: NoteResponse?
                do {
                    fresh = try await client.getNote(row.noteId)
                } catch {
                    if case .notFound = APIError.from(error) { noteMissingOnServer = true }
                    fresh = nil
                }
                let base = row.baseUtcDateModified.trimmingCharacters(in: .whitespacesAndNewlines)
                var isRealConflict = false
                if let fresh {
                    let serverMod = fresh.utcDateModified.trimmingCharacters(in: .whitespacesAndNewlines)
                    let canDetectConflict = !base.isEmpty && !serverMod.isEmpty
                    if canDetectConflict, serverMod != base {
                        // Check whether the timestamp mismatch was caused by our own previous upload.
                        let ownUpload = lastOwnUploadTimestamps[row.noteId] ?? ""
                        isRealConflict = (ownUpload != serverMod)
                    }
                    if isRealConflict, !fresh.isProtected,
                       let serverBody = try? await client.getNoteContent(row.noteId),
                       PendingNoteBodyUpload.serverAlreadyHas(serverBody, queued: row.body) {
                        // An earlier upload of this body landed, but the app was suspended or killed before it
                        // heard back, so the row stayed (and the record of our own upload went with the app).
                        // The server already has these edits: nothing to copy.
                        lastOwnUploadTimestamps[rowNoteId] = serverMod
                        let parentNoteIds = (try? persistence.fetchCachedNote(id: rowNoteId, serverProfileId: profileId))?.parentNoteIds ?? []
                        try? persistence.cacheNoteContentIfAllowed(
                            rowNoteId,
                            content: serverBody,
                            parentNoteIds: parentNoteIds,
                            serverProfileId: profileId,
                            utcDateModified: serverMod,
                            policy: cacheExclusion
                        )
                        let deleted = (try? persistence.deletePendingNoteBodyUploadIfUnchanged(noteId: rowNoteId, serverProfileId: profileId, snapshotDate: snapshotDate)) ?? true
                        if !deleted {
                            // Edited again since: that body still goes up, measured against the server as it is now.
                            try? persistence.updatePendingBodyUploadBase(noteId: rowNoteId, serverProfileId: profileId, newBase: serverMod)
                        }
                        Log.sync.info("Pending body for note \(rowNoteId) was already on the server (an upload cut off before its reply)")
                        continue
                    }
                    if isRealConflict {
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
                            try? persistence.cacheNoteIfAllowed(from: response.note, serverProfileId: profileId, policy: cacheExclusion)
                            try? persistence.cacheBranchIfAllowed(
                                from: response.branch,
                                parentNoteIdsForNote: response.note.parentNoteIds,
                                serverProfileId: profileId,
                                policy: cacheExclusion
                            )
                            try? persistence.commitBatch()
                            Log.sync.info(
                                "Offline body conflict for \(row.noteId): saved iOS copy as new note \(response.note.noteId) under \(parentId)"
                            )
                        }
                        try? persistence.deletePendingNoteBodyUploadIfUnchanged(noteId: row.noteId, serverProfileId: profileId, snapshotDate: snapshotDate)
                        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
                        CheckboxPerf.log(
                            "flushBodies conflict note=\(rowNoteId) bytes=\(rowBodyBytes) ms=\(CheckboxPerf.ms(tRow)) lastToggle=#\(CheckboxPerf.lastToggleID)"
                        )
                        continue
                    }
                }
                CheckboxPerf.log(
                    "flushBodies updateNoteContent start note=\(rowNoteId) bytes=\(rowBodyBytes) lastToggle=#\(CheckboxPerf.lastToggleID)"
                )
                try await client.updateNoteContent(row.noteId, content: row.body, contentType: row.mime)
                // Fetch the server's new utcDateModified after our upload so that
                // (a) the cache is current for future pending rows, and
                // (b) any surviving pending row won't false-conflict against our own upload.
                let afterUpload = try? await client.getNote(row.noteId)
                let newServerMod = afterUpload?.utcDateModified ?? ""
                if !newServerMod.isEmpty {
                    lastOwnUploadTimestamps[row.noteId] = newServerMod
                    let parentNoteIds = (try? persistence.fetchCachedNote(id: row.noteId, serverProfileId: profileId))?.parentNoteIds ?? []
                    try? persistence.cacheNoteContentIfAllowed(
                        row.noteId,
                        content: row.body,
                        parentNoteIds: parentNoteIds,
                        serverProfileId: profileId,
                        utcDateModified: newServerMod,
                        policy: cacheExclusion
                    )
                }
                let deleted = (try? persistence.deletePendingNoteBodyUploadIfUnchanged(noteId: row.noteId, serverProfileId: profileId, snapshotDate: snapshotDate)) ?? true
                if !deleted, !newServerMod.isEmpty {
                    try? persistence.updatePendingBodyUploadBase(noteId: row.noteId, serverProfileId: profileId, newBase: newServerMod)
                }
                Log.sync.info("Flushed offline-edited body for note \(row.noteId)")
                CheckboxPerf.log(
                    "flushBodies done note=\(rowNoteId) bytes=\(rowBodyBytes) ms=\(CheckboxPerf.ms(tRow)) lastToggle=#\(CheckboxPerf.lastToggleID)"
                )
            } catch {
                if noteMissingOnServer, case .notFound = APIError.from(error) {
                    // Deleted on the server: the upload can never succeed, and it would hold up every row after it.
                    try? persistence.deletePendingNoteBodyUpload(noteId: rowNoteId, serverProfileId: profileId)
                    Log.sync.warning("Dropped pending body upload for \(rowNoteId): the note no longer exists on the server")
                    continue
                }
                Log.sync.warning("Pending body upload failed for \(rowNoteId): \(error)")
                CheckboxPerf.log(
                    "flushBodies failed note=\(rowNoteId) bytes=\(rowBodyBytes) ms=\(CheckboxPerf.ms(tRow)) lastToggle=#\(CheckboxPerf.lastToggleID)"
                )
                break
            }
        }
    }

    /// Uploads attachments queued from local note transfer after the owning note has a server id.
    func flushPendingAttachmentImportsIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingAttachmentImport]
        do {
            pending = try persistence.fetchPendingAttachmentImports(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending attachment imports: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending attachment import flush skipped — session refresh failed: \(error)")
                return
            }
        }
        await touchServerProtectedSession()
        for row in pending {
            if row.noteId.isOfflineLocalNoteId {
                let stillPending = (try? persistence.hasPendingNoteCreation(noteId: row.noteId, serverProfileId: profileId)) ?? true
                if stillPending { continue }
            }
            do {
                _ = try await client.uploadNoteAttachment(
                    noteId: row.noteId,
                    data: row.data,
                    filename: row.title,
                    contentType: row.mime
                )
                try persistence.deletePendingAttachmentImport(id: row.id, serverProfileId: profileId)
                Log.sync.info("Flushed local-transfer attachment for note \(row.noteId)")
            } catch {
                Log.sync.warning("Pending attachment import failed for note \(row.noteId): \(error)")
                break
            }
        }
    }

    func bootstrap() async {
        isLoading = true
        defer { isLoading = false }
        localTransfer.configure(appState: self)
        shareImport.configure(appState: self)

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
        shareImport.checkForPendingPayload()
        // After `isLoading` clears: a Shortcut that opened the app may be waiting for a note.
        Task { @MainActor in await self.handleExternalOpenRequests() }
    }

    private func triliumInstanceId(for profile: ServerProfile) async throws -> String {
        if let existing = try await keychain.loadTriliumInstanceId(forServer: profile.id) {
            return existing
        }
        let fresh = UUID().uuidString
        try await keychain.saveTriliumInstanceId(fresh, forServer: profile.id)
        return fresh
    }

    private func makeTriliumClient(
        baseURL: URL,
        profileId: String,
        persistedCookieData: Data?,
        pendingCloudflareAccessCredentials: CloudflareAccessCredentials? = nil,
        skipBootstrapWithoutOIDCSession: Bool? = nil
    ) async -> TriliumClient {
        let skipBootstrap: Bool
        if let skipBootstrapWithoutOIDCSession {
            skipBootstrap = skipBootstrapWithoutOIDCSession
        } else if let profile = (try? persistence.fetchServerProfiles())?.first(where: { $0.id == profileId }) {
            skipBootstrap = profile.authMethod == .sso
        } else {
            skipBootstrap = false
        }
        return await TriliumSessionFactory.makeClient(
            baseURL: baseURL,
            profileId: profileId,
            persistedCookieData: persistedCookieData,
            pendingCloudflareAccessCredentials: pendingCloudflareAccessCredentials,
            skipBootstrapWithoutOIDCSession: skipBootstrap,
            keychain: keychain
        )
    }

    /// Short-lived client for another signed-in profile. Does not change `activeProfile`, sync, or UI.
    func makeRestoredClient(for profile: ServerProfile) async throws -> TriliumClient {
        guard let url = profile.url else { throw APIError.invalidURL }
        let cookieData = try await keychain.loadSessionCookies(forServer: profile.id)
        guard let cookieData, !cookieData.isEmpty else { throw APIError.noToken }
        let newClient = await makeTriliumClient(baseURL: url, profileId: profile.id, persistedCookieData: cookieData)
        try await restoreSessionWithTimeout(client: newClient, seconds: 12)
        await saveSessionCookies(of: newClient, profileId: profile.id, reason: "restored client")
        return newClient
    }

    /// Switches instance after the current UI (sheet/alert) has dismissed. The work is owned by `AppState` so tearing down `NavigationStack`s cannot cancel it.
    func scheduleActivateProfile(id profileId: String, after milliseconds: Int = 350) {
        Task { @MainActor in
            if milliseconds > 0 {
                try? await Task.sleep(for: .milliseconds(milliseconds))
            }
            guard let profile = (try? persistence.fetchServerProfiles())?.first(where: { $0.id == profileId }) else {
                connectionError = String(
                    localized: "That instance is no longer signed in.",
                    comment: "Scheduled profile switch missing instance"
                )
                return
            }
            do {
                try await activateProfile(profile)
            } catch {
                let api = APIError.from(error)
                if case .cancelled = api { return }
                connectionError = api.localizedDescription
            }
        }
    }

    func hasCloudflareAccessCredentials(for profile: ServerProfile) async -> Bool {
        (try? await keychain.hasCloudflareAccessCredentials(forServer: profile.id)) ?? false
    }

    /// Recreates the active `TriliumClient` after Cloudflare Access settings change.
    func rebuildActiveClientIfNeeded() async {
        guard isAuthenticated, let profile = activeProfile, let url = profile.url else { return }
        let cookieData = try? await keychain.loadSessionCookies(forServer: profile.id)
        let newClient = await makeTriliumClient(baseURL: url, profileId: profile.id, persistedCookieData: cookieData)
        self.client = newClient
        do {
            try await restoreSessionWithTimeout(client: newClient, seconds: 12)
            connectionError = nil
            lastRefreshed = .now
            await saveSessionCookies(of: newClient, profileId: profile.id, reason: "client rebuilt")
        } catch {
            connectionError = APIError.from(error).localizedDescription
        }
        startRealtimeIfPossible()
    }

    private func startRealtimeIfPossible() {
        realtime?.stop()
        guard let client = client as? TriliumClient,
              activeProfile?.id != nil else { return }

        let storage = client.httpCookieStorage
        let base = client.baseURL
        let cfCredentials = client.cloudflareAccessCredentials
        realtime = TriliumWebSocketConnection(
            baseURL: base,
            cookieStorage: storage,
            cloudflareAccessCredentials: cfCredentials,
            onEvent: { [weak self] in
                guard let self else { return }
                Task { @MainActor in
                    guard let c = self.client, let pid = self.activeProfile?.id else { return }
                    await self.flushPendingNoteDeletionsIfPossible(assumeSessionIsReady: true)
                    if let iid = try? await self.keychain.loadTriliumInstanceId(forServer: pid) {
                        self.syncManager.incrementalSync(client: c, profileId: pid, triliumInstanceId: iid)
                    }
                }
            },
            onProtectedSessionLogout: { [weak self] in
                Task { @MainActor in
                    self?.protectedSessionActive = false
                }
            },
            onServerPullProgress: { [weak self] progress in
                Task { @MainActor in
                    self?.syncManager.setServerPullProgress(
                        progress.map { SyncManager.ServerPullProgress(pulled: $0.pulled, total: $0.total) }
                    )
                }
            },
            onTaskProgress: { [weak self] progress in
                Task { @MainActor in
                    self?.serverTaskProgressHandlers[progress.taskId]?(progress)
                }
            },
            onReconnected: { [weak self] in
                // The server restarted (an upgrade does that), so its version may have changed.
                Task { @MainActor in
                    await self?.refreshServerAppInfo()
                    await self?.refreshAIConfig()
                }
            }
        )
        realtime?.start()
    }

    /// Re-reads the server's version (`/api/app-info`) for the `TriliumServerCompatibility` gates, which otherwise
    /// only refresh with the session. A server upgraded while Trinote stays open is picked up here.
    func refreshServerAppInfo() async {
        guard networkMonitor.isConnected, let client else { return }
        do {
            let info = try await client.getAppInfo()
            if info.appVersion != serverAppInfo?.appVersion {
                Log.api.info("Server version now \(info.appVersion) (was \(self.serverAppInfo?.appVersion ?? "unknown"))")
            }
            serverAppInfo = info
        } catch {
            Log.api.warning("Could not re-read the server version: \(error)")
        }
    }

    // MARK: - AI chat

    /// Whether the AI chat can be used right now (see `AIFeatureAvailability`).
    var aiAvailability: AIFeatureAvailability {
        AIFeatureAvailability(serverInfo: serverAppInfo, isOnline: isOnline, config: aiConfig)
    }

    /// Whether to offer the AI screens: the server supports the chat and Trilium's AI switch was on at the last read.
    var showsAIEntryPoints: Bool {
        AIFeatureAvailability.showsEntryPoints(serverInfo: serverAppInfo, config: aiConfig)
    }

    /// Re-reads Trilium's AI options (`GET /api/options`): after sign-in, on reconnect, when an AI screen appears and
    /// after every option write. A failed read keeps the last reading. API keys never leave the parse.
    @discardableResult
    func refreshAIConfig() async -> TriliumAIConfig? {
        guard networkMonitor.isConnected, isAuthenticated, let client, let profile = activeProfile else { return aiConfig }
        do {
            let options = try await client.getOptions()
            guard activeProfile?.id == profile.id else { return aiConfig }
            aiConfig = TriliumAIConfig(options: options)
            serverAutoLinkPreviewsEnabled = options.autoLinkPreviewsEnabled
        } catch {
            Log.api.warning("Could not read the server's AI options: \(error)")
        }
        return aiConfig
    }

    /// Writes AI options (`PUT /api/options`), then re-reads them so the screens show what the server holds.
    func updateAIOptions(_ values: [String: String]) async throws {
        guard let client else { throw APIError.noToken }
        try await client.updateOptions(values)
        await refreshAIConfig()
    }

    /// Calls `onProgress` with each WebSocket progress message for `taskId` until `stopTrackingServerTask`.
    func trackServerTask(_ taskId: String, onProgress: @escaping @MainActor (ServerTaskProgress) -> Void) {
        serverTaskProgressHandlers[taskId] = onProgress
    }

    func stopTrackingServerTask(_ taskId: String) {
        serverTaskProgressHandlers[taskId] = nil
    }

    /// Bounded wait so offline / captive networks don’t leave bootstrap on “Connecting…” until URLSession’s default timeout.
    private func restoreSessionWithTimeout(client: TriliumClient, seconds: TimeInterval = 12) async throws {
        try await TriliumSessionFactory.restoreSession(of: client, timeout: seconds)
        serverAppInfo = await client.lastFetchedAppInfo
    }

    /// Use SwiftData branch rows to repopulate `CachedNote` parent/child id lists (fixes detail sub-notes when incremental rows omitted tree fields).
    private func enterOfflineCacheMode(profile: ServerProfile) async {
        self.isAuthenticated = true
        self.connectionError = String(localized: "Offline — showing cached notes. Connect to refresh.", comment: "Banner when launch continues without server")
        self.lastRefreshed = nil
        try? persistence.setActiveProfile(profile)
        Log.auth.info("Proceeding offline with persisted session cookies for \(profile.name)")
        _ = try? await triliumInstanceId(for: profile)
        await runIncrementalSync(maxWaitSeconds: 0)
        startRealtimeIfPossible()
        let profileId = profile.id
        Task { @MainActor in
            try? persistence.reconcileCachedNoteBranchesMetadata(serverProfileId: profileId)
        }
    }

    /// Fast path for cold launch: attach client + profile, show cached UI when cookies exist, then validate session and sync in the background.
    private func quickActivateProfileForLaunch(_ profile: ServerProfile) async {
        guard let url = profile.url else { return }
        let cookieData = try? await keychain.loadSessionCookies(forServer: profile.id)
        SessionCookieTrace.log("launch: keychain sid \(SessionCookieTrace.tag(archive: cookieData)) for \(profile.name)")
        let newClient = await makeTriliumClient(baseURL: url, profileId: profile.id, persistedCookieData: cookieData)
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

    /// Runs after launch: `restoreSession`, offline queues, a full or quick sync (`OfflineCacheSettings.fullSyncOnLaunch`),
    /// WebSocket — without blocking the main tab / cached tree.
    private func finishOnlineProfileActivationAfterLaunch(profile: ServerProfile, hadPersistedSessionCookies: Bool) async {
        guard let client = self.client as? TriliumClient else { return }
        do {
            try await restoreSessionWithTimeout(client: client, seconds: 12)
            await resumeOrEndProtectedSessionAfterLaunch(profileId: profile.id)
            self.connectionError = nil
            self.lastRefreshed = .now
            await saveSessionCookies(of: client, profileId: profile.id, reason: "launch")
            Log.auth.info("Connected to \(profile.name)")
            syncManager.restoreSyncState(profileId: profile.id)
            _ = try await triliumInstanceId(for: profile)
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            // With "Full sync on every launch" off (for large vaults), pull only what changed, unless there's been no
            // full sync, it's over a week old, or there's no cursor to pull from.
            var fullSyncNow = OfflineCacheSettings.load(profileId: profile.id).fullSyncOnLaunch
            if !fullSyncNow {
                fullSyncNow = await syncManager.launchNeedsFullSync(profileId: profile.id)
            }
            if fullSyncNow {
                await runFullSync(maxWaitSeconds: 0)
            } else {
                await runIncrementalSync(maxWaitSeconds: 0)
            }
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
                SessionCookieTrace.log("launch: session restore failed: \(error)")
                Log.auth.warning("Session restore failed: \(error)")
            }
        }
    }

    func activateProfile(_ profile: ServerProfile) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        let cookieData = try? await keychain.loadSessionCookies(forServer: profile.id)
        let hadPersistedSessionCookies = cookieData.map { !$0.isEmpty } ?? false
        guard hadPersistedSessionCookies else {
            throw APIError.noToken
        }

        if activeProfile?.id != profile.id {
            NotificationCenter.default.post(name: .trinoteWillSwitchServerProfile, object: nil)
            tabNavigationResetGeneration += 1
            serverAppInfo = nil
            aiConfig = nil
            await Task.yield()
        }

        syncManager.cancel()
        realtime?.stop()

        let newClient = await makeTriliumClient(baseURL: url, profileId: profile.id, persistedCookieData: cookieData)

        let previousClient = self.client
        let previousProfile = self.activeProfile
        let previousAuthenticated = self.isAuthenticated
        let previousConnectionError = self.connectionError
        let previousLastRefreshed = self.lastRefreshed
        let previousProtectedSession = self.protectedSessionActive

        if !networkMonitor.isConnected {
            self.client = newClient
            self.activeProfile = profile
            self.protectedSessionActive = false
            syncManager.restoreSyncState(profileId: profile.id)
            await enterOfflineCacheMode(profile: profile)
            return
        }

        do {
            try await restoreSessionWithTimeout(client: newClient, seconds: 12)
            self.client = newClient
            self.activeProfile = profile
            self.protectedSessionActive = false
            await endServerProtectedSessionAndPersistCookies()
            self.isAuthenticated = true
            self.connectionError = nil
            self.lastRefreshed = .now
            try persistence.setActiveProfile(profile)
            await saveSessionCookies(of: newClient, profileId: profile.id, reason: "profile activated")
            syncManager.restoreSyncState(profileId: profile.id)
            _ = try await triliumInstanceId(for: profile)
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            await runIncrementalSync(maxWaitSeconds: 30)
            startRealtimeIfPossible()
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                revertProfileActivation(
                    previousClient: previousClient,
                    previousProfile: previousProfile,
                    previousAuthenticated: previousAuthenticated,
                    previousConnectionError: previousConnectionError,
                    previousLastRefreshed: previousLastRefreshed,
                    previousProtectedSession: previousProtectedSession
                )
                throw error
            }

            let canUseCacheOffline = !apiError.isAuthError
                && (apiError.isNetworkError || !networkMonitor.isConnected)

            if canUseCacheOffline {
                self.client = newClient
                self.activeProfile = profile
                self.protectedSessionActive = false
                syncManager.restoreSyncState(profileId: profile.id)
                await enterOfflineCacheMode(profile: profile)
                return
            }

            revertProfileActivation(
                previousClient: previousClient,
                previousProfile: previousProfile,
                previousAuthenticated: previousAuthenticated,
                previousConnectionError: previousConnectionError,
                previousLastRefreshed: previousLastRefreshed,
                previousProtectedSession: previousProtectedSession
            )
            throw error
        }
    }

    private func revertProfileActivation(
        previousClient: (any TriliumClientProtocol)?,
        previousProfile: ServerProfile?,
        previousAuthenticated: Bool,
        previousConnectionError: String?,
        previousLastRefreshed: Date?,
        previousProtectedSession: Bool
    ) {
        self.client = previousClient
        self.activeProfile = previousProfile
        self.isAuthenticated = previousAuthenticated
        self.connectionError = previousConnectionError
        self.lastRefreshed = previousLastRefreshed
        self.protectedSessionActive = previousProtectedSession
        if let p = previousProfile {
            syncManager.restoreSyncState(profileId: p.id)
        }
        startRealtimeIfPossible()
    }

    /// Client from a password login that stopped at `totpRequired`; reused on the TOTP step.
    private var pendingPasswordLoginClient: TriliumClient?

    func loginWithPassword(
        _ password: String,
        rememberMe: Bool,
        totpToken: String? = nil,
        profile: ServerProfile,
        cloudflareAccessCredentials: CloudflareAccessCredentials? = nil,
        isContinuingPendingLogin: Bool = false
    ) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        let newClient: TriliumClient
        if isContinuingPendingLogin, let pending = pendingPasswordLoginClient {
            newClient = pending
        } else {
            pendingPasswordLoginClient = nil
            try await keychain.clearServerAuthArtifacts(forServer: profile.id)
            newClient = await makeTriliumClient(
                baseURL: url,
                profileId: profile.id,
                persistedCookieData: nil,
                pendingCloudflareAccessCredentials: cloudflareAccessCredentials
            )
        }

        do {
            try await newClient.login(password: password, rememberMe: rememberMe, totpToken: totpToken)
        } catch APIError.totpRequired {
            pendingPasswordLoginClient = newClient
            throw APIError.totpRequired
        } catch {
            pendingPasswordLoginClient = nil
            throw error
        }

        pendingPasswordLoginClient = nil
        try await finalizeSuccessfulLogin(
            profile: profile,
            client: newClient,
            cloudflareAccessCredentials: cloudflareAccessCredentials,
            authMethod: .password
        )
    }

    func clearPendingPasswordLogin() {
        pendingPasswordLoginClient = nil
    }

    func loginWithImportedSession(
        cookieData: Data,
        profile: ServerProfile,
        cloudflareAccessCredentials: CloudflareAccessCredentials?,
        authMethod: ServerAuthMethod
    ) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        try await keychain.clearServerAuthArtifacts(forServer: profile.id)
        let newClient = await makeTriliumClient(
            baseURL: url,
            profileId: profile.id,
            persistedCookieData: cookieData,
            pendingCloudflareAccessCredentials: cloudflareAccessCredentials,
            skipBootstrapWithoutOIDCSession: true
        )
        try await restoreSessionWithTimeout(client: newClient, seconds: 12)

        try await finalizeSuccessfulLogin(
            profile: profile,
            client: newClient,
            cloudflareAccessCredentials: cloudflareAccessCredentials,
            authMethod: authMethod
        )
    }

    private func finalizeSuccessfulLogin(
        profile: ServerProfile,
        client newClient: TriliumClient,
        cloudflareAccessCredentials: CloudflareAccessCredentials?,
        authMethod: ServerAuthMethod
    ) async throws {
        try await activateLoggedInSession(
            profile: profile,
            client: newClient,
            cloudflareAccessCredentials: cloudflareAccessCredentials,
            authMethod: authMethod
        )
        finishLoginInBackground(profileId: profile.id)
    }

    /// Persists session cookies and switches the active profile — fast path so login UI can dismiss immediately.
    private func activateLoggedInSession(
        profile: ServerProfile,
        client newClient: TriliumClient,
        cloudflareAccessCredentials: CloudflareAccessCredentials?,
        authMethod: ServerAuthMethod
    ) async throws {
        if activeProfile?.id != profile.id {
            NotificationCenter.default.post(name: .trinoteWillSwitchServerProfile, object: nil)
            tabNavigationResetGeneration += 1
            serverAppInfo = nil
            aiConfig = nil
            await Task.yield()
        }

        await saveSessionCookies(of: newClient, profileId: profile.id, reason: "login")
        _ = try await triliumInstanceId(for: profile)

        profile.authMethod = authMethod
        try persistence.saveProfile(profile)
        if let cloudflareAccessCredentials {
            try await keychain.saveCloudflareAccessCredentials(cloudflareAccessCredentials, forServer: profile.id)
        }

        self.client = newClient
        self.activeProfile = profile
        self.protectedSessionActive = false
        self.isAuthenticated = true
        self.connectionError = nil
        self.lastRefreshed = .now
        self.serverAppInfo = await newClient.lastFetchedAppInfo
        try persistence.setActiveProfile(profile)
        Log.auth.info("Logged in to \(profile.name) (session, \(authMethod.rawValue))")
        syncManager.restoreSyncState(profileId: profile.id)
    }

    /// Flush queues, incremental sync, and WebSocket — same work as launch, without blocking login UI.
    private func finishLoginInBackground(profileId: String) {
        Task { @MainActor in
            guard self.activeProfile?.id == profileId, self.isAuthenticated else { return }
            await self.flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            guard self.activeProfile?.id == profileId else { return }
            await self.runIncrementalSync(maxWaitSeconds: 30)
            guard self.activeProfile?.id == profileId else { return }
            self.startRealtimeIfPossible()
        }
    }

    func logout() async {
        await clearLocalSessionState(notifyServer: true)
        Log.auth.info("Logged out")
    }

    /// Tears down the in-app session and clears local auth artifacts. Optionally notifies the server (explicit logout only).
    private func clearLocalSessionState(notifyServer: Bool) async {
        SessionCookieTrace.log("clear local session state (notifyServer: \(notifyServer))")
        syncManager.cancel()
        realtime?.stop()
        realtime = nil
        protectedSessionActive = false

        if notifyServer, let client {
            if let tc = client as? TriliumClient {
                try? await tc.exitProtectedSession()
            }
            try? await client.logout()
        }

        if let profile = activeProfile {
            try? await keychain.clearServerAuthArtifacts(forServer: profile.id)
            try? persistence.deleteSyncStatus(domain: "fullSync", serverProfileId: profile.id)
            // Refresh in-memory sync state after removing the persisted full-sync marker.
            syncManager.restoreSyncState(profileId: profile.id)
        }

        client = nil
        isAuthenticated = false
        connectionError = nil
        lastRefreshed = nil
        serverAppInfo = nil
        aiConfig = nil
    }

    func signOutAndRemoveProfile(_ profile: ServerProfile) async {
        let wasActive = profile.id == activeProfile?.id
        if wasActive {
            await clearLocalSessionState(notifyServer: false)
            activeProfile = nil
        } else {
            try? await keychain.clearServerAuthArtifacts(forServer: profile.id)
        }
        try? await keychain.deleteCloudflareAccessCredentials(forServer: profile.id)
        OfflineCacheSettings.remove(profileId: profile.id)
        ProtectedSessionTimeout.forgetServerValue(profileId: profile.id)
        do {
            try persistence.clearCache(for: profile.id)
            try persistence.deleteProfile(profile)
        } catch {
            Log.auth.error("Failed to remove profile: \(error)")
        }
        if wasActive {
            let remaining = (try? persistence.fetchServerProfiles()) ?? []
            let next = remaining.sorted {
                ($0.lastConnected ?? .distantPast) > ($1.lastConnected ?? .distantPast)
            }.first
            if let next {
                do {
                    try await activateProfile(next)
                } catch {
                    Log.auth.warning("Could not activate next instance after sign-out: \(error)")
                }
            }
        }
    }

    /// Called when app returns to foreground
    func onForegroundResume() async {
        SessionCookieTrace.log("foreground: authenticated=\(isAuthenticated) protected=\(protectedSessionActive)")
        syncManager.endBackgroundTimeExtension()
        shareImport.checkForPendingPayload()
        await enforceProtectedSessionTimeoutIfNeeded()
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
                await saveSessionCookies(of: tc, profileId: profile.id, reason: "foreground")
            }
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            await runIncrementalSync(maxWaitSeconds: 15)
            startRealtimeIfPossible()
        } catch {
            connectionError = APIError.from(error).localizedDescription
        }
    }

    /// Handles `trinote://` URLs opened by the Share Extension or Safari SSO handoff.
    func handleIncomingURL(_ url: URL) {
        if SSOHandoffInbox.deliver(url) { return }
        shareImport.handleOpenURL(url)
    }

    // MARK: - Offline flush helpers

    private func persistNoteResponseToCache(_ response: NoteResponse, profileId: String) {
        try? persistence.cacheNoteIfAllowed(from: response, serverProfileId: profileId, policy: cacheExclusion)
        for attr in response.attributes {
            try? persistence.cacheAttributeBatchIfAllowed(
                from: attr,
                parentNoteIds: response.parentNoteIds,
                serverProfileId: profileId,
                policy: cacheExclusion
            )
        }
        try? persistence.commitBatch()
    }

    /// After `createNote` with `templateNoteId`, the server clones the template but the new note often lacks Trilium journal labels `#calendarRoot` and `#sorted`. Those remain in `parsedAttrs` from `NoteType.calendar.creationInitialAttributes`; apply them here so desktop and search treat the note as a calendar root.
    private static func applyCalendarJournalLabelsAfterTemplateCreateIfNeeded(
        client: any TriliumClientProtocol,
        noteId: String,
        parsedAttrs: [[String: Any]]
    ) async {
        let journalLabelNames: Set<String> = ["calendarRoot", "sorted"]
        for attr in parsedAttrs {
            guard (attr["type"] as? String) == "label",
                  let name = attr["name"] as? String,
                  journalLabelNames.contains(name)
            else { continue }
            let value: String
            if let s = attr["value"] as? String {
                value = s
            } else if let n = attr["value"] as? NSNumber {
                value = n.stringValue
            } else {
                value = ""
            }
            let inheritable = (attr["isInheritable"] as? Bool) ?? false
            do {
                try await client.createAttribute(CreateAttributeRequest(
                    noteId: noteId,
                    type: "label",
                    name: name,
                    value: value,
                    isInheritable: inheritable ? true : nil,
                    position: nil
                ))
            } catch {
                Log.sync.warning(
                    "createAttribute failed for journal label \(name) on \(noteId) after template create: \(error)"
                )
            }
        }
    }

    /// Resolves a human-readable template title to a concrete note ID.
    /// Uses fast search first, then falls back to scanning `_templates` children directly.
    /// This handles title variants across Trilium versions (e.g. "Geo Map", "GeoMap", "Geo Map (beta)").
    private static func resolveTemplateTitle(client: any TriliumClientProtocol, title: String) async -> String? {
        let raw = title.trimmingCharacters(in: .whitespacesAndNewlines)
        let normalized = normalizeTemplateTitle(raw)

        // A note id: a built-in `_template_*` (stable across locales, so preferred over title search) or a template
        // picked by id, such as a board's card template. A title that isn't an id just misses and falls through.
        if raw.range(of: #"^[A-Za-z0-9_]{4,128}$"#, options: .regularExpression) != nil,
           let note = try? await client.getNote(raw),
           !note.isDeleted {
            return note.noteId
        }
        if normalized == "kanbanboard" || normalized == "kanban" || normalized == "board",
           let note = try? await client.getNote("_template_board"),
           !note.isDeleted {
            return note.noteId
        }
        if normalized == "presentation",
           let note = try? await client.getNote("_template_presentation"),
           !note.isDeleted {
            return note.noteId
        }

        var titlesToTry: [String] = [raw]
        var preferredType: String?
        if normalized == "geomap" {
            titlesToTry = ["Geo Map", "GeoMap", "Geo Map (beta)"]
            preferredType = "geoMap"
        } else if normalized == "calendar" {
            titlesToTry = ["Calendar"]
        } else if normalized == "kanbanboard" || normalized == "kanban" || normalized == "board" {
            titlesToTry = ["Kanban Board", "Board", "Kanban"]
        } else if normalized == "presentation" {
            titlesToTry = ["Presentation"]
        }

        // 1) Fast search by title (cheap and usually enough).
        for t in titlesToTry {
            if let id = await resolveTemplateRelationTargetNoteId(client: client, title: t) {
                return id
            }
        }

        // 2) Fallback: desktop's own endpoint (`/api/search-templates`) + note fetch.
        if let id = await resolveTemplateFromSearchTemplates(client: client, preferredTitles: titlesToTry, preferredType: preferredType) {
            return id
        }

        // 3) Fallback: inspect `_templates` children directly and match by title/type.
        if let id = await resolveTemplateFromTemplatesRoot(
            client: client,
            preferredTitles: titlesToTry,
            preferredType: preferredType
        ) {
            return id
        }

        return nil
    }

    private static func resolveTemplateFromSearchTemplates(
        client: any TriliumClientProtocol,
        preferredTitles: [String],
        preferredType: String?
    ) async -> String? {
        guard let tc = client as? TriliumClient,
              let ids = try? await tc.searchTemplateNoteIds(),
              !ids.isEmpty
        else {
            return nil
        }

        var candidates: [NoteResponse] = []
        for id in ids {
            if let note = try? await client.getNote(id), !note.isDeleted {
                candidates.append(note)
            }
        }
        guard !candidates.isEmpty else { return nil }

        for wanted in preferredTitles {
            if let match = candidates.first(where: { $0.title.caseInsensitiveCompare(wanted) == .orderedSame }) {
                return match.noteId
            }
        }

        let normalizedWanted = Set(preferredTitles.map(normalizeTemplateTitle))
        if let match = candidates.first(where: { normalizedWanted.contains(normalizeTemplateTitle($0.title)) }) {
            return match.noteId
        }

        if let preferredType, let match = candidates.first(where: { $0.type == preferredType }) {
            return match.noteId
        }
        return nil
    }

    private static func resolveTemplateFromTemplatesRoot(
        client: any TriliumClientProtocol,
        preferredTitles: [String],
        preferredType: String?
    ) async -> String? {
        guard let templatesRoot = try? await client.getNote("_templates") else {
            return nil
        }
        var children: [NoteResponse] = []
        for childId in templatesRoot.childNoteIds {
            if let child = try? await client.getNote(childId), !child.isDeleted {
                children.append(child)
            }
        }
        guard !children.isEmpty else { return nil }

        // Exact case-insensitive title match first.
        for wanted in preferredTitles {
            if let match = children.first(where: { $0.title.caseInsensitiveCompare(wanted) == .orderedSame }) {
                return match.noteId
            }
        }

        // Normalized title match (ignores spaces/punctuation/case).
        let normalizedWanted = Set(preferredTitles.map(normalizeTemplateTitle))
        if let match = children.first(where: { normalizedWanted.contains(normalizeTemplateTitle($0.title)) }) {
            return match.noteId
        }

        // Last resort for geo map variants: pick first `_templates` child with matching note type.
        if let preferredType, let match = children.first(where: { $0.type == preferredType }) {
            return match.noteId
        }
        return nil
    }

    private static func normalizeTemplateTitle(_ title: String) -> String {
        let lower = title.lowercased()
        let filtered = lower.unicodeScalars.filter {
            CharacterSet.alphanumerics.contains($0)
        }
        return String(String.UnicodeScalarView(filtered))
    }

    /// Trilium relation `template` values are note ids; resolve from the built-in template title when possible.
    /// `note.title` is the note's own title (`#title` would be a label named "title"), and `#template` keeps an
    /// ordinary note that shares the title — e.g. a journal root called "Calendar" — from being picked.
    private static func resolveTemplateRelationTargetNoteId(client: any TriliumClientProtocol, title: String) async -> String? {
        let q = templateTitleSearchQuery(title: title)
        do {
            let resp = try await client.searchNotes(
                query: q,
                fastSearch: true,
                includeArchived: false,
                ancestorNoteId: nil,
                orderBy: nil,
                orderDirection: nil,
                limit: 30
            )
            // Require an exact (case-insensitive) title match — never fall back to an arbitrary hit
            // (that previously could resolve "Presentation" to the wrong built-in template).
            return resp.results.first(where: { $0.title.caseInsensitiveCompare(title) == .orderedSame })?.noteId
        } catch {
            return nil
        }
    }

    /// Multi-word titles must be quoted in search (e.g. `#template note.title = "Geo Map"`).
    nonisolated static func templateTitleSearchQuery(title: String) -> String {
        let escaped = title
            .replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "\"", with: "\\\"")
        return "#template note.title = \"\(escaped)\""
    }
}

/// Resumes one waiter when the first of several tasks finishes.
@MainActor
private final class FirstToFinish {
    private var finished = false
    private var waiter: CheckedContinuation<Void, Never>?

    func finish() {
        guard !finished else { return }
        finished = true
        waiter?.resume()
        waiter = nil
    }

    func wait() async {
        guard !finished else { return }
        await withCheckedContinuation { waiter = $0 }
    }
}
