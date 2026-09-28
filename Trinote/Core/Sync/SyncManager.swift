import Foundation
import Observation
import UIKit

@Observable
@MainActor
final class SyncManager {
    private(set) var isSyncing = false
    /// Progress as the UI sees it: published from the working counters below at most every 200 ms or when the whole
    /// percent changes, so a 40k-note sync doesn't redraw its banner thousands of times.
    private(set) var syncProgress: Double = 0
    private(set) var syncedNoteCount = 0
    private(set) var totalNoteCount = 0

    @ObservationIgnored private var progressDone = 0
    @ObservationIgnored private var progressTotal = 0
    @ObservationIgnored private var progressFraction: Double = 0
    @ObservationIgnored private var progressPublishedAt = ContinuousClock.now

    /// Sets the working counters (`nil` keeps a value) and publishes them when due; `force` for phase changes.
    private func reportProgress(done: Int? = nil, total: Int? = nil, fraction: Double? = nil, force: Bool = false) {
        if let done { progressDone = done }
        if let total { progressTotal = total }
        if let fraction { progressFraction = fraction }
        let now = ContinuousClock.now
        let percentChanged = Int(progressFraction * 100) != Int(syncProgress * 100)
        guard force || percentChanged || now - progressPublishedAt >= .milliseconds(200) else { return }
        progressPublishedAt = now
        if syncedNoteCount != progressDone { syncedNoteCount = progressDone }
        if totalNoteCount != progressTotal { totalNoteCount = progressTotal }
        if syncProgress != progressFraction { syncProgress = progressFraction }
    }
    private(set) var lastFullSyncDate: Date?
    private(set) var lastIncrementalSyncDate: Date?
    private(set) var syncError: String?
    private(set) var phase: SyncPhase = .idle

    /// True when the most recently **finished** sync applied incoming entity rows to SwiftData (read on `phase == .done`).
    private(set) var lastCompletedSyncUpdatedLocalDatabase = false
    /// True when the most recently finished sync actually wrote rows or bodies. A full sync that found nothing new leaves
    /// this `false`, so the tree can skip reloading from the cache.
    private(set) var lastCompletedSyncChangedLocalDatabase = false

    var hasCompletedFullSync: Bool { self.lastFullSyncDate != nil }

    /// How far the server is through pulling from its own sync server (Trilium's `sync-pull-in-progress` progress),
    /// or `nil` when it is not pulling. Only an instance that syncs with an upstream server sends this.
    struct ServerPullProgress: Equatable, Sendable {
        let pulled: Int
        let total: Int
        var fraction: Double { total > 0 ? min(1, Double(pulled) / Double(total)) : 0 }
    }
    private(set) var serverPullProgress: ServerPullProgress?

    func setServerPullProgress(_ progress: ServerPullProgress?) {
        guard progress != serverPullProgress else { return }
        serverPullProgress = progress
    }

    /// Quick syncs stay a spinner; a progress bar is worth showing from this many changes or notes.
    static let incrementalProgressMinimum = 100

    /// A quick (incremental) sync large enough for a progress bar: `syncedNoteCount` of `totalNoteCount` changes
    /// while pulling (`.fetchingChanges`), then notes while downloading their bodies (`.downloadingContent`).
    var showsIncrementalProgress: Bool {
        isSyncing && hasCompletedFullSync
            && (phase == .fetchingChanges || phase == .downloadingContent)
            && totalNoteCount >= Self.incrementalProgressMinimum
    }

    enum SyncPhase: Equatable {
        case idle
        case walkingTree
        case downloadingContent
        case fetchingChanges
        case cleaningUp
        case done
    }

    private var syncTask: Task<Void, Never>?
    private var syncGeneration: UInt64 = 0
    private let persistence: PersistenceManager
    private let cacheExclusion: CacheExclusionPolicy
    /// Where sync reads and writes SwiftData: a background context, so large syncs don't block the UI.
    private let syncStore: SyncStore

    init(persistence: PersistenceManager? = nil) {
        let persistence = persistence ?? .shared
        self.persistence = persistence
        self.cacheExclusion = CacheExclusionPolicy(persistence: persistence)
        self.syncStore = SyncStore(modelContainer: persistence.container)
    }

    var store: SyncStore {
        get async { syncStore }
    }
    private static let maxConcurrency = 8
    /// `POST /api/tree/load` note IDs per request during full-sync BFS (split on failure). Siblings share ancestors,
    /// which each response repeats, so bigger batches cost fewer requests and less repeated payload.
    private static let treeWalkBatchSize = 200
    private static let pullBatchLimit = 1000

    private var backgroundTaskId: UIBackgroundTaskIdentifier = .invalid

    /// Best-effort background time extension for in-flight sync.
    /// iOS will still suspend us eventually; this usually provides a short grace period
    /// to finish the current work and persist progress.
    func beginBackgroundTimeExtensionIfNeeded() {
        guard isSyncing else { return }
        guard backgroundTaskId == .invalid else { return }
        backgroundTaskId = UIApplication.shared.beginBackgroundTask(withName: "TrinoteSync") { [weak self] in
            Task { @MainActor in
                self?.cancel()
                self?.endBackgroundTimeExtension()
            }
        }
    }

    func endBackgroundTimeExtension() {
        guard backgroundTaskId != .invalid else { return }
        UIApplication.shared.endBackgroundTask(backgroundTaskId)
        backgroundTaskId = .invalid
    }

    private static var hiddenNoteIds: Set<String> { SyncStore.hiddenNoteIds }

    /// Upper bound on `GET /api/sync/changed` calls per incremental run (Trilium batches changes).
    private static let maxSyncPullIterations = 2_000
    /// If the server keeps returning empty batches with `outstandingPullCount > 0` and does not advance `lastEntityChangeId`, stop to avoid spinning.
    private static let maxConsecutiveEmptyPullsWithoutAdvance = 8

    // MARK: - Public API

    func restoreSyncState(profileId: String) {
        let statuses = (try? self.persistence.fetchSyncStatuses(serverProfileId: profileId)) ?? []
        self.lastFullSyncDate = nil
        self.lastIncrementalSyncDate = nil
        for status in statuses {
            if status.domain == "fullSync" {
                self.lastFullSyncDate = status.lastSyncedAt
            }
            if status.domain == "incrementalSync" {
                self.lastIncrementalSyncDate = status.lastSyncedAt
            }
        }
    }

    /// Initial full sync: tree walk + content download + reconciliation.
    /// Also seeds the pull cursor so incremental sync can take over.
    /// - Parameter triliumInstanceId: Lets the sync finish with an entity pull from the saved cursor, which catches
    ///   changes made during the walk. Without it the cursor is only seeded (first sync) or left for incremental sync.
    /// - Parameter countsAsFallback: Started because a quick sync couldn't follow the server's history; if it doesn't
    ///   finish, it gives back its `fallbackFullSyncInterval` slot.
    /// - Parameter reseedsCursor: The server's history restarted: take a new pull cursor from the server (as a first
    ///   sync does) instead of pulling from the saved one. The saved cursor stays until the new one is stored, so a
    ///   failed attempt never leaves quick syncs pulling the server's whole history.
    func fullSync(
        client: any TriliumClientProtocol,
        profileId: String,
        triliumInstanceId: String? = nil,
        countsAsFallback: Bool = false,
        reseedsCursor: Bool = false
    ) {
        // A server's first full sync waits for its first-sync choices (what to keep offline).
        if !hasCompletedFullSync, !OfflineCacheSettings.load(profileId: profileId).hasChosenFirstSync {
            if pendingFirstSync?.profileId != profileId {
                pendingFirstSync = FirstSyncRequest(profileId: profileId, client: client, triliumInstanceId: triliumInstanceId)
            }
            return
        }
        self.syncTask?.cancel()
        self.syncGeneration &+= 1
        let gen = self.syncGeneration
        self.isSyncing = true
        self.syncError = nil
        self.phase = .walkingTree
        self.syncTask = Task { [self] in
            await self.performFullSync(
                client: client,
                profileId: profileId,
                instanceId: triliumInstanceId,
                countsAsFallback: countsAsFallback,
                reseedsCursor: reseedsCursor,
                generation: gen
            )
        }
    }

    // MARK: - First sync

    /// A server's first full sync, waiting for its first-sync choices (`FirstSyncChoiceSheet`).
    struct FirstSyncRequest: Identifiable {
        let profileId: String
        let client: any TriliumClientProtocol
        let triliumInstanceId: String?
        var id: String { profileId }
    }

    private(set) var pendingFirstSync: FirstSyncRequest?

    /// Saves the first-sync choices and starts the full sync that waited for them. With `onlyTopLevelNotebooks`, every
    /// notebook under root starts out excluded from the offline cache (the tree still shows them online). Returns
    /// `false`, starting nothing, when the notebooks couldn't be listed.
    func startFirstSync(settings: OfflineCacheSettings, onlyTopLevelNotebooks: Bool) async -> Bool {
        guard let request = pendingFirstSync else { return false }
        if onlyTopLevelNotebooks {
            do {
                let (_, branches) = try await request.client.getNoteWithBranches(TriliumTreeConstants.rootNoteId)
                let notebooks = Set(branches.map(\.noteId))
                    .subtracting(TriliumSharing.hiddenSystemChildNoteIds)
                    .subtracting(Self.hiddenNoteIds)
                try cacheExclusion.setExcludedRootNoteIds(notebooks, serverProfileId: request.profileId)
            } catch {
                Log.sync.warning("First sync: couldn't list the top-level notebooks: \(error)")
                return false
            }
        }
        var settings = settings
        settings.hasChosenFirstSync = true
        settings.save(profileId: request.profileId)
        pendingFirstSync = nil
        fullSync(client: request.client, profileId: request.profileId, triliumInstanceId: request.triliumInstanceId)
        return true
    }

    /// The least time between two full syncs started because a quick sync couldn't follow the server's history.
    static let fallbackFullSyncInterval: TimeInterval = 3 * 60 * 60

    private static func fallbackFullSyncKey(profileId: String) -> String {
        "trinote.fallbackFullSyncAt." + profileId
    }

    /// Whether a fallback full sync may start now for this server; when it may, records the time.
    static func claimFallbackFullSync(profileId: String, now: Date = .now, defaults: UserDefaults = .standard) -> Bool {
        let key = fallbackFullSyncKey(profileId: profileId)
        if let last = defaults.object(forKey: key) as? Date, now.timeIntervalSince(last) < fallbackFullSyncInterval {
            return false
        }
        defaults.set(now, forKey: key)
        return true
    }

    /// Gives back a claimed slot, when the fallback full sync that claimed it didn't finish.
    static func releaseFallbackFullSync(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: fallbackFullSyncKey(profileId: profileId))
    }

    /// With "Full sync on every launch" off, a full sync still runs when there's none yet, the last is older than
    /// this, or there's no saved pull cursor.
    static let fullSyncBackstopInterval: TimeInterval = 7 * 24 * 60 * 60

    /// Whether launch has to walk the whole tree even though "Full sync on every launch" is off.
    func launchNeedsFullSync(profileId: String) async -> Bool {
        guard let lastFullSyncDate, Date.now.timeIntervalSince(lastFullSyncDate) < Self.fullSyncBackstopInterval else {
            return true
        }
        let cursor = (try? await store.pullCursor(profileId: profileId)) ?? 0
        return cursor == 0
    }

    /// After unlock, downloads bodies for protected notes (skipped during normal sync until a protected session exists).
    func prefetchProtectedNoteBodies(client: any TriliumClientProtocol, profileId: String) async {
        if isSyncing {
            Log.sync.debug("Deferring protected body prefetch — sync in progress")
            return
        }
        let map = (try? await store.notesMissingContent(isProtected: true, profileId: profileId)) ?? [:]
        guard !map.isEmpty else { return }
        exclusionSnapshot = nil
        do {
            _ = try await downloadContent(
                serverNotes: map,
                client: client,
                profileId: profileId,
                protectedBodiesOnly: true,
                respectCacheExclusion: true
            )
            persistence.invalidateDerivedCaches()
            Log.sync.info("Protected note body prefetch finished (\(map.count) candidates)")
        } catch {
            Log.sync.warning("Protected body prefetch failed: \(error)")
        }
    }

    /// Incremental sync via `GET /api/sync/changed` (Trilium desktop–style pull).
    /// Loops until the server returns an empty `entityChanges` batch (and keeps pulling when
    /// `outstandingPullCount > 0` even if a batch is empty, matching ETAPI behavior).
    /// Applies notes, branches, attributes, blobs to SwiftData, including `isErased` / `isDeleted`.
    /// Only downloads note **bodies** for ids referenced in this pull (changed notes / blobs)—not a vault-wide backfill (that is `fullSync`).
    /// - Parameter downloadChangedBodies: When `false`, applies entity rows only; bodies refresh when notes are opened (faster tree / toolbar refresh).
    func incrementalSync(
        client: any TriliumClientProtocol,
        profileId: String,
        triliumInstanceId: String,
        downloadChangedBodies: Bool = true
    ) {
        guard self.hasCompletedFullSync else {
            if isSyncing { return }
            self.fullSync(client: client, profileId: profileId, triliumInstanceId: triliumInstanceId)
            return
        }
        if isSyncing { return }
        self.syncTask?.cancel()
        self.syncGeneration &+= 1
        let gen = self.syncGeneration
        self.isSyncing = true
        self.syncError = nil
        self.phase = .fetchingChanges
        self.syncTask = Task { [self] in
            await self.performIncrementalSync(
                client: client,
                profileId: profileId,
                instanceId: triliumInstanceId,
                generation: gen,
                downloadChangedBodies: downloadChangedBodies
            )
        }
    }

    func cancel() {
        // Switching servers or signing out: a first-sync sheet for the old server no longer applies.
        self.pendingFirstSync = nil
        self.syncTask?.cancel()
        self.syncTask = nil
        self.syncGeneration &+= 1
        self.isSyncing = false
        self.phase = .idle
        self.endBackgroundTimeExtension()
    }

    /// Walks and caches one top-level notebook subtree (after re-enabling cache exclusion).
    func syncSubtree(client: any TriliumClientProtocol, profileId: String, rootNoteId: String) {
        guard !isSyncing else { return }
        self.syncTask?.cancel()
        self.syncGeneration &+= 1
        let gen = self.syncGeneration
        self.isSyncing = true
        self.syncError = nil
        self.phase = .walkingTree
        self.syncTask = Task { [self] in
            await self.performSubtreeSync(
                client: client,
                profileId: profileId,
                rootNoteId: rootNoteId,
                generation: gen
            )
        }
    }

    /// Tells the tree (and open notes) to reload from the cache, only when the sync just finished changed it: a sync
    /// that found nothing new would make every listener reload for nothing.
    private func postTreeRefreshIfCacheChanged() {
        guard lastCompletedSyncChangedLocalDatabase else { return }
        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
    }

    private func isStale(_ generation: UInt64) -> Bool {
        Task.isCancelled || self.syncGeneration != generation
    }

    // MARK: - Full Sync (batched BFS tree walk + content + reconciliation)

    private func performFullSync(
        client: any TriliumClientProtocol,
        profileId: String,
        instanceId: String?,
        countsAsFallback: Bool,
        reseedsCursor: Bool,
        generation: UInt64
    ) async {
        var finished = false
        defer {
            if countsAsFallback, !finished {
                // Failed or cut short: a later quick sync may try again without waiting out the interval.
                Self.releaseFallbackFullSync(profileId: profileId)
            }
            if !isStale(generation) {
                self.isSyncing = false
            }
            self.endBackgroundTimeExtension()
            // The store saved on its own context; answers derived from the main one may be stale.
            self.persistence.invalidateDerivedCaches()
        }
        self.exclusionSnapshot = nil
        self.reportProgress(done: 0, total: 0, fraction: 0, force: true)
        self.lastCompletedSyncUpdatedLocalDatabase = false
        self.lastCompletedSyncChangedLocalDatabase = false

        let syncStartedAt = Date.now

        do {
            // A first sync has no cursor: take the server's newest change id before the walk, so changes made while
            // walking are pulled afterwards instead of skipped. `sync/check` hashes every entity change on the
            // server, so later full syncs pull from their saved cursor instead.
            let store = await self.store
            let savedCursor = (try? await store.pullCursor(profileId: profileId)) ?? 0
            let seededCursor: Int64? = savedCursor > 0 && !reseedsCursor ? nil : try await client.syncCheck().maxEntityChangeId

            let walk = try await self.walkTree(
                client: client,
                profileId: profileId,
                generation: generation,
                startNoteIds: ["root"],
                respectCacheExclusion: true
            )
            let serverNotes = walk.serverNotes
            if isStale(generation) { return }

            let reconciledNotes = (try? await store.reconcileTreeLists(profileId: profileId)) ?? 0
            var changedLocalDatabase = walk.changedRowCount > 0 || reconciledNotes > 0

            let allServerNoteIds = Set(serverNotes.keys)
            self.reportProgress(total: allServerNoteIds.count, force: true)
            Log.sync.info("Tree walk complete: \(allServerNoteIds.count) notes found")

            self.phase = .downloadingContent
            let contentPass = try await self.downloadContent(
                serverNotes: serverNotes,
                client: client,
                profileId: profileId,
                protectedBodiesOnly: false,
                respectCacheExclusion: true
            )
            var ghostIds = contentPass.ghostNoteIds
            var storedBodies = contentPass.storedCount
            let backfillRetry = (try? await store.notesMissingContent(isProtected: false, profileId: profileId)) ?? [:]
            if !backfillRetry.isEmpty {
                let retryPass = try await self.downloadContent(
                    serverNotes: backfillRetry,
                    client: client,
                    profileId: profileId,
                    protectedBodiesOnly: false,
                    respectCacheExclusion: true
                )
                ghostIds.formUnion(retryPass.ghostNoteIds)
                storedBodies += retryPass.storedCount
            }
            if isStale(generation) { return }
            if storedBodies > 0 { changedLocalDatabase = true }

            for gid in ghostIds { GhostNoteTracker.shared.add(gid, serverProfileId: profileId) }

            // Drop ghost IDs for notes the server no longer has; keep hiding notes
            // still on the server (client deletes not yet replicated, blob ghosts, etc.).
            GhostNoteTracker.shared.retainOnlyNotesStillOnServer(allServerNoteIds, serverProfileId: profileId)

            self.phase = .cleaningUp
            // Every note the walk found counts as on the server, ghosts included: they stay cached and hidden
            // (deleting one would also drop it from the ghost list, so it would reappear next sync).
            let deletedNotes = try await self.reconcileDeletions(
                serverNoteIds: allServerNoteIds,
                profileId: profileId,
                syncStartedAt: syncStartedAt
            )
            if deletedNotes > 0 || !ghostIds.isEmpty { changedLocalDatabase = true }

            if let seededCursor {
                try await store.setPullCursor(seededCursor, profileId: profileId)
            }
            if let instanceId {
                guard let pull = try await self.pullEntityChanges(
                    client: client,
                    profileId: profileId,
                    instanceId: instanceId,
                    generation: generation,
                    reportsProgress: false
                ) else { return }
                if pull.appliedCount > 0 || pull.deletionCount > 0 { changedLocalDatabase = true }
                if pull.serverBehindCursor {
                    // The server's history restarted (restored or replaced); the walk just read everything, so
                    // continue from its newest change.
                    try await store.setPullCursor(try await client.syncCheck().maxEntityChangeId, profileId: profileId)
                }
                if !pull.notesToRefreshContent.isEmpty {
                    let pullBodies = try await self.downloadContent(
                        serverNotes: pull.notesToRefreshContent,
                        client: client,
                        profileId: profileId,
                        protectedBodiesOnly: false,
                        respectCacheExclusion: true
                    )
                    if pullBodies.storedCount > 0 { changedLocalDatabase = true }
                }
            }
            if isStale(generation) { return }

            // Only mark the full sync as completed if we successfully persist the status.
            try await store.recordSyncSuccess(domain: "fullSync", profileId: profileId)
            self.lastFullSyncDate = .now
            self.lastCompletedSyncUpdatedLocalDatabase = true
            self.lastCompletedSyncChangedLocalDatabase = changedLocalDatabase
            self.phase = .done
            self.reportProgress(fraction: 1.0, force: true)
            await self.pruneCacheExclusions(client: client, profileId: profileId)
            finished = true
            self.postTreeRefreshIfCacheChanged()
            Log.sync.info("Full sync complete: \(self.progressDone) notes synced, \(changedLocalDatabase ? "cache updated" : "no changes")")

        } catch {
            if isStale(generation) { return }
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            self.syncError = apiError.localizedDescription
            self.phase = .idle
            Log.sync.error("Sync failed: \(error)")
            try? await self.store.recordSyncError(
                domain: "fullSync",
                error: apiError.localizedDescription ?? "Unknown",
                profileId: profileId
            )
        }
    }

    // MARK: - Incremental Sync via GET /api/sync/changed

    private func performIncrementalSync(
        client: any TriliumClientProtocol,
        profileId: String,
        instanceId: String,
        generation: UInt64,
        downloadChangedBodies: Bool
    ) async {
        defer {
            if !isStale(generation) {
                self.isSyncing = false
            }
            self.endBackgroundTimeExtension()
            self.persistence.invalidateDerivedCaches()
        }
        self.exclusionSnapshot = nil
        self.reportProgress(done: 0, total: 0, fraction: 0, force: true)

        do {
            self.lastCompletedSyncUpdatedLocalDatabase = false
            self.lastCompletedSyncChangedLocalDatabase = false
            guard let pull = try await self.pullEntityChanges(
                client: client,
                profileId: profileId,
                instanceId: instanceId,
                generation: generation,
                reportsProgress: true
            ) else { return }
            let totalApplied = pull.appliedCount
            var deletionCount = pull.deletionCount
            let notesToRefreshContent = pull.notesToRefreshContent

            // Lightweight safety net: compare live API branches under root with cache so deletions
            // missed by the entity-change stream (cursor gaps, etc.) still purge local rows.
            var reconcilePruned = 0
            do {
                reconcilePruned = try await self.reconcileScopedBranchPlacements(
                    client: client,
                    profileId: profileId,
                    parentNoteIds: ["root"]
                )
                if reconcilePruned > 0 {
                    deletionCount += reconcilePruned
                }
            } catch {
                let apiError = APIError.from(error)
                if case .cancelled = apiError { return }
                Log.sync.warning("Incremental sync: scoped branch reconcile failed: \(error)")
            }

            // Do not run `reconcileCachedNoteBranchesMetadata` here — it walks the entire branch/note tables on every
            // incremental run and can block the main actor for a long time. Full sync already reconciles; incremental
            // updates come from `applyBranchRow` / `applyNoteRow`.

            // Content downloads only for notes touched in this pull (not a full backfill of every missing body).
            let serverNotesForContent = notesToRefreshContent

            let ranContentPass: Bool
            var storedBodies = 0
            if downloadChangedBodies {
                // Counts notes from here on (`downloadContent` counts up from those already current).
                self.reportProgress(done: 0, total: max(serverNotesForContent.count, 1), fraction: 0, force: true)
                if !serverNotesForContent.isEmpty {
                    self.phase = .downloadingContent
                    let contentPass = try await self.downloadContent(
                        serverNotes: serverNotesForContent,
                        client: client,
                        profileId: profileId,
                        protectedBodiesOnly: false,
                        respectCacheExclusion: true
                    )
                    storedBodies = contentPass.storedCount
                    let ghostIds = contentPass.ghostNoteIds
                    if !ghostIds.isEmpty {
                        for gid in ghostIds {
                            GhostNoteTracker.shared.add(gid, serverProfileId: profileId)
                        }
                        try? await self.store.deleteNotes(ghostIds, profileId: profileId)
                    }
                }
                ranContentPass = !serverNotesForContent.isEmpty
            } else {
                self.reportProgress(total: max(totalApplied, 1), force: true)
                ranContentPass = false
            }

            if isStale(generation) { return }
            self.lastCompletedSyncUpdatedLocalDatabase = (totalApplied > 0 || deletionCount > 0 || ranContentPass)
            self.lastCompletedSyncChangedLocalDatabase = (totalApplied > 0 || deletionCount > 0 || storedBodies > 0)

            await self.pruneCacheExclusions(client: client, profileId: profileId)
            try? await self.store.recordSyncSuccess(domain: "incrementalSync", profileId: profileId)
            self.lastIncrementalSyncDate = .now
            self.phase = .done
            self.reportProgress(fraction: 1.0, force: true)
            self.postTreeRefreshIfCacheChanged()
            Log.sync.info(
                "Incremental sync complete: \(self.progressDone) notes updated, \(deletionCount) deletions\(downloadChangedBodies ? "" : " (metadata only)")"
            )

            // The change history couldn't be followed to the end: walk the whole tree instead, at most once per
            // `fallbackFullSyncInterval` so a server that keeps stalling doesn't get a full sync after every quick one.
            if pull.serverBehindCursor || pull.gaveUp {
                let reason = pull.serverBehindCursor ? "server history restarted" : "pull gave up"
                if Self.claimFallbackFullSync(profileId: profileId) {
                    Log.sync.warning("Incremental sync: \(reason), starting a full sync")
                    self.fullSync(
                        client: client,
                        profileId: profileId,
                        triliumInstanceId: instanceId,
                        countsAsFallback: true,
                        // The saved cursor points past the server's history; the full sync seeds a new one.
                        reseedsCursor: pull.serverBehindCursor
                    )
                } else {
                    Log.sync.warning("Incremental sync: \(reason); a fallback full sync already ran in the last few hours")
                }
            }

        } catch {
            if isStale(generation) { return }
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            self.syncError = apiError.localizedDescription
            self.phase = .idle
            Log.sync.error("Incremental sync failed: \(error)")
            try? await self.store.recordSyncError(
                domain: "incrementalSync",
                error: apiError.localizedDescription ?? "Unknown",
                profileId: profileId
            )
        }
    }

    /// What one run of the entity-change pull loop did.
    private struct EntityPullResult {
        var appliedCount = 0
        var deletionCount = 0
        /// Note id → server `utcDateModified` for content staleness (empty string = unknown, still refreshes when body missing).
        var notesToRefreshContent: [String: String] = [:]
        /// The loop stopped before the server said it was done (iteration cap, or empty batches that never advance).
        var gaveUp = false
        /// The server's newest change id is below the saved cursor: its database was restored or replaced.
        var serverBehindCursor = false
    }

    /// Trilium-style pull: repeats `GET /api/sync/changed` from the saved cursor until an empty batch with nothing
    /// outstanding, applying each batch to SwiftData and saving the cursor as it goes. `nil` when a newer sync
    /// superseded this one.
    private func pullEntityChanges(
        client: any TriliumClientProtocol,
        profileId: String,
        instanceId: String,
        generation: UInt64,
        reportsProgress: Bool
    ) async throws -> EntityPullResult? {
        var result = EntityPullResult()
        let store = await self.store
        var cursor = try await store.pullCursor(profileId: profileId)
        var pullIterations = 0
        /// Empty batches with `outstandingPullCount > 0` but no cursor advance (server stuck).
        var consecutiveEmptyWithoutCursorAdvance = 0

        // Do not stop early when outstandingPullCount == 0 after a non-empty batch — the server may have more rows
        // after the next cursor bump.
        while pullIterations < Self.maxSyncPullIterations {
            if isStale(generation) { return nil }
            pullIterations += 1

            // The first request starts one change early. Trilium echoes the requested id when it has nothing after it,
            // so a server whose history reaches the saved cursor answers with the cursor (or later), and one whose
            // history restarted (restored or replaced database) echoes `cursor - 1`. The change at the cursor was
            // applied last time, so it's dropped by its number.
            let probesHistory = pullIterations == 1 && cursor > 0
            let response = try await client.syncPull(
                instanceId: instanceId,
                lastEntityChangeId: probesHistory ? cursor - 1 : cursor
            )
            if probesHistory, response.entityChanges.isEmpty, response.maxEntityChangeId < cursor {
                result.serverBehindCursor = true
                Log.sync.error("Entity pull: the server has no changes at or after the saved cursor \(cursor); its history restarted")
            }
            let pull = probesHistory ? response.droppingChanges(through: cursor) : response

            if pull.entityChanges.isEmpty {
                let advancedCursor = pull.maxEntityChangeId > cursor
                if advancedCursor {
                    cursor = pull.maxEntityChangeId
                    try? await store.setPullCursor(cursor, profileId: profileId)
                    consecutiveEmptyWithoutCursorAdvance = 0
                }

                if pull.outstandingPullCount > 0 {
                    if !advancedCursor {
                        consecutiveEmptyWithoutCursorAdvance += 1
                        if consecutiveEmptyWithoutCursorAdvance >= Self.maxConsecutiveEmptyPullsWithoutAdvance {
                            Log.sync.error("Entity pull: aborting — empty batches with outstanding=\(pull.outstandingPullCount) but lastEntityChangeId not advancing (cursor=\(cursor))")
                            result.gaveUp = true
                            break
                        }
                    }
                    continue
                }
                break
            }

            consecutiveEmptyWithoutCursorAdvance = 0

            let applied = try await store.applyPullBatch(
                pull,
                exclusion: exclusionRules(profileId),
                media: MediaBodyPolicy(OfflineCacheSettings.load(profileId: profileId)),
                notesToRefreshContent: result.notesToRefreshContent,
                profileId: profileId
            )
            result.deletionCount += applied.deletionCount
            result.notesToRefreshContent = applied.notesToRefreshContent
            for erasedNoteId in applied.erasedNoteIds {
                try? cacheExclusion.removeExcludedRootNoteIfNeeded(noteId: erasedNoteId, serverProfileId: profileId)
            }
            if !applied.erasedNoteIds.isEmpty { exclusionSnapshot = nil }

            result.appliedCount += pull.entityChanges.count
            if reportsProgress {
                // `outstandingPullCount` is what is still waiting after this batch, so the pull's total is known
                // from the first batch on.
                let total = result.appliedCount + max(0, pull.outstandingPullCount)
                self.reportProgress(
                    done: result.appliedCount,
                    total: total,
                    fraction: Double(result.appliedCount) / Double(max(total, 1))
                )
            }
            cursor = pull.maxEntityChangeId
            try? await store.setPullCursor(cursor, profileId: profileId)
            // Always pull again; only an empty batch + outstanding==0 exits the loop.
        }

        if pullIterations >= Self.maxSyncPullIterations {
            Log.sync.warning("Entity pull: stopped after \(Self.maxSyncPullIterations) pull iterations (safety cap)")
            result.gaveUp = true
        }
        return result
    }

    /// Compares live API child branches with SwiftData under each parent and prunes stale placements.
    private func reconcileScopedBranchPlacements(
        client: any TriliumClientProtocol,
        profileId: String,
        parentNoteIds: [String]
    ) async throws -> Int {
        var totalPruned = 0
        for parentId in parentNoteIds {
            let (_, liveBranches) = try await client.getNoteWithBranches(parentId)
            let liveBranchIds = Set(liveBranches.map(\.branchId))
            let (pruned, cachedCount) = try await store.pruneStaleBranches(
                parentNoteId: parentId,
                liveBranchIds: liveBranchIds,
                profileId: profileId
            )
            if pruned > 0 {
                Log.sync.info("Scoped reconcile under \(parentId): pruned \(pruned) stale branch/note row(s)")
            } else if cachedCount > liveBranchIds.count {
                Log.sync.warning(
                    "Scoped reconcile under \(parentId): cache has \(cachedCount) children but API has \(liveBranchIds.count) — no rows pruned"
                )
            }
            totalPruned += pruned
        }
        return totalPruned
    }

    private func shouldSuppressCaching(
        noteId: String,
        parentNoteIds: [String],
        profileId: String
    ) -> Bool {
        exclusionRules(profileId).isNoteExcludedFromCache(noteId: noteId, parentNoteIds: parentNoteIds)
    }

    /// Cache-exclusion rules read once per sync run (each run clears them) instead of once per note.
    private var exclusionSnapshot: CacheExclusionSnapshot?

    private func exclusionRules(_ profileId: String) -> CacheExclusionSnapshot {
        if let exclusionSnapshot, exclusionSnapshot.serverProfileId == profileId { return exclusionSnapshot }
        let rules = cacheExclusion.snapshot(serverProfileId: profileId)
        exclusionSnapshot = rules
        return rules
    }

    private func pruneCacheExclusions(client: any TriliumClientProtocol, profileId: String) async {
        do {
            let (_, branches) = try await client.getNoteWithBranches(TriliumTreeConstants.rootNoteId)
            let live = Set(branches.map(\.noteId).filter { !Self.hiddenNoteIds.contains($0) })
            try cacheExclusion.pruneStaleExcludedRoots(
                liveRootChildIds: live,
                serverProfileId: profileId,
                authoritativeLiveList: true
            )
            exclusionSnapshot = nil
        } catch {
            Log.sync.debug("pruneCacheExclusions skipped: \(error)")
        }
    }

    private func performSubtreeSync(
        client: any TriliumClientProtocol,
        profileId: String,
        rootNoteId: String,
        generation: UInt64
    ) async {
        defer {
            if !isStale(generation) {
                self.isSyncing = false
            }
            self.endBackgroundTimeExtension()
        }
        self.exclusionSnapshot = nil
        self.reportProgress(done: 0, total: 0, fraction: 0, force: true)

        do {
            let serverNotes = try await self.walkTree(
                client: client,
                profileId: profileId,
                generation: generation,
                startNoteIds: [rootNoteId],
                respectCacheExclusion: false
            ).serverNotes
            if isStale(generation) { return }

            self.phase = .downloadingContent
            _ = try await self.downloadContent(
                serverNotes: serverNotes,
                client: client,
                profileId: profileId,
                protectedBodiesOnly: false,
                respectCacheExclusion: false
            )
            if isStale(generation) { return }

            try? await self.store.reconcileTreeLists(forNoteId: rootNoteId, profileId: profileId)
            self.persistence.invalidateDerivedCaches()
            self.phase = .done
            self.reportProgress(fraction: 1.0, force: true)
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
            Log.sync.info("Subtree sync complete for \(rootNoteId): \(serverNotes.count) notes")
        } catch {
            if isStale(generation) { return }
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            self.syncError = apiError.localizedDescription
            self.phase = .idle
            Log.sync.error("Subtree sync failed: \(error)")
        }
    }

    // MARK: - Phase 1: Tree Walk (full sync only, batched BFS)

    private func fullSyncFetchTreeBatchWithSplit(
        client: any TriliumClientProtocol,
        noteIds: [String],
        cached: [String: FullSyncCachedNoteState]
    ) async throws -> [FullSyncTreeBatchEntry] {
        do {
            return try await client.fullSyncFetchTreeBatch(noteIds: noteIds, cached: cached)
        } catch {
            if noteIds.count > 1 {
                let mid = noteIds.count / 2
                let left = try await fullSyncFetchTreeBatchWithSplit(client: client, noteIds: Array(noteIds[..<mid]), cached: cached)
                let right = try await fullSyncFetchTreeBatchWithSplit(client: client, noteIds: Array(noteIds[mid...]), cached: cached)
                return left + right
            }
            throw error
        }
    }

    /// What a tree walk found: the cached notes' server dates, and how many rows it inserted or changed.
    private struct TreeWalkResult {
        var serverNotes: [String: String] = [:]
        var changedRowCount = 0
    }

    private func walkTree(
        client: any TriliumClientProtocol,
        profileId: String,
        generation: UInt64,
        startNoteIds: [String],
        respectCacheExclusion: Bool
    ) async throws -> TreeWalkResult {
        var result = TreeWalkResult()
        let store = await self.store
        var visited = Set<String>()
        // Breadth-first queue read from `frontierHead`; removing from the front of an array is O(n) per note.
        var frontier: [String] = startNoteIds
        var frontierHead = 0
        var maxTotalEstimate = 1

        let walkStartedAt = ContinuousClock.now
        var batchRequests = 0
        defer {
            Log.sync.info(
                "Tree walk: \(visited.count) notes in \(batchRequests) batches, \(result.changedRowCount) rows written, \(ContinuousClock.now - walkStartedAt)"
            )
        }

        while frontierHead < frontier.count {
            if isStale(generation) { return result }
            if Task.isCancelled { return result }

            maxTotalEstimate = max(maxTotalEstimate, visited.count + frontier.count - frontierHead)
            self.reportProgress(
                total: maxTotalEstimate,
                fraction: min(0.99, Double(visited.count) / Double(max(maxTotalEstimate, 1)))
            )

            var batch: [String] = []
            var batchIds = Set<String>()
            while batch.count < Self.treeWalkBatchSize, frontierHead < frontier.count {
                let id = frontier[frontierHead]
                frontierHead += 1
                guard !visited.contains(id), !Self.hiddenNoteIds.contains(id), batchIds.insert(id).inserted else { continue }
                batch.append(id)
            }
            if frontierHead > 4_096, frontierHead * 2 > frontier.count {
                frontier.removeFirst(frontierHead)
                frontierHead = 0
            }
            if batch.isEmpty { continue }

            let cachedStates = try await store.cachedStates(noteIds: batch, profileId: profileId)
            batchRequests += 1
            var entries = try await fullSyncFetchTreeBatchWithSplit(client: client, noteIds: batch, cached: cachedStates)
            var returnedIds = Set(entries.map(\.note.noteId))
            for id in batch where !returnedIds.contains(id) {
                guard !visited.contains(id), !Self.hiddenNoteIds.contains(id) else { continue }
                do {
                    let (note, branches) = try await client.getNoteWithBranches(id)
                    if note.isDeleted {
                        visited.insert(id)
                        returnedIds.insert(id)
                        continue
                    }
                    entries.append(FullSyncTreeBatchEntry(note: note, childBranches: branches))
                    returnedIds.insert(note.noteId)
                } catch {
                    Log.sync.warning("Full sync tree walk: could not load note \(id): \(error)")
                }
            }
            if isStale(generation) { return result }

            var toCache: [FullSyncTreeBatchEntry] = []
            var nextNoteIds: [String] = []
            for entry in entries {
                let response = entry.note
                if response.isDeleted {
                    visited.insert(response.noteId)
                    continue
                }
                if visited.contains(response.noteId) { continue }
                visited.insert(response.noteId)

                let isExcludedRoot = respectCacheExclusion && exclusionRules(profileId).isExcludedRoot(response.noteId)
                let shouldCacheThisNote = !respectCacheExclusion
                    || (!isExcludedRoot && !shouldSuppressCaching(
                        noteId: response.noteId,
                        parentNoteIds: response.parentNoteIds,
                        profileId: profileId
                    ))

                if shouldCacheThisNote {
                    result.serverNotes[response.noteId] = response.utcDateModified
                    toCache.append(entry)
                }

                if !isExcludedRoot {
                    for cid in response.childNoteIds where !Self.hiddenNoteIds.contains(cid) {
                        if !visited.contains(cid) {
                            nextNoteIds.append(cid)
                        }
                    }
                }
            }

            result.changedRowCount += try await store.cacheWalkEntries(toCache, profileId: profileId)
            frontier.append(contentsOf: nextNoteIds)

            maxTotalEstimate = max(maxTotalEstimate, visited.count + frontier.count - frontierHead)
            self.reportProgress(
                done: visited.count,
                total: maxTotalEstimate,
                fraction: min(0.99, Double(visited.count) / Double(max(maxTotalEstimate, 1)))
            )
        }

        return result
    }

    // MARK: - Phase 2: Content Download

    /// What a content pass did: "ghost" note IDs where the server returned 500 "Cannot find content" (blob erased but
    /// metadata still present), and how many bodies it stored.
    private struct ContentPassResult {
        var ghostNoteIds = Set<String>()
        var storedCount = 0
    }

    private func downloadContent(
        serverNotes: [String: String],
        client: any TriliumClientProtocol,
        profileId: String,
        protectedBodiesOnly: Bool,
        respectCacheExclusion: Bool
    ) async throws -> ContentPassResult {
        let store = await self.store
        let settings = OfflineCacheSettings.load(profileId: profileId)
        let candidates = try await store.contentCandidates(
            candidates: serverNotes,
            isProtected: protectedBodiesOnly,
            media: MediaBodyPolicy(settings),
            profileId: profileId
        )

        let filteredNoteIds: [String]
        if respectCacheExclusion {
            filteredNoteIds = candidates.noteIds.filter { noteId in
                !shouldSuppressCaching(noteId: noteId, parentNoteIds: candidates.parentNoteIds[noteId] ?? [], profileId: profileId)
            }
        } else {
            filteredNoteIds = candidates.noteIds
        }
        // Image and file bodies over the limit (when large ones are off) stop downloading as soon as that shows.
        let mediaLimit = settings.maxMediaBodyBytes
        let cappedNoteIds = mediaLimit == nil ? Set<String>() : candidates.mediaNoteIds

        let alreadyUpToDate = self.progressTotal - filteredNoteIds.count
        self.reportProgress(done: max(alreadyUpToDate, 0), force: true)
        var result = ContentPassResult()

        if filteredNoteIds.isEmpty {
            self.reportProgress(fraction: 1.0, force: true)
            return result
        }

        Log.sync.info("Downloading content for \(filteredNoteIds.count) of \(self.progressTotal) notes")

        for batchStart in stride(from: 0, to: filteredNoteIds.count, by: Self.maxConcurrency) {
            if Task.isCancelled { return result }

            let batchEnd = min(batchStart + Self.maxConcurrency, filteredNoteIds.count)
            let batch = Array(filteredNoteIds[batchStart..<batchEnd])

            let results = try await self.fetchInParallel(
                ids: batch,
                maxConcurrency: Self.maxConcurrency
            ) { noteId -> (String, Data?, Bool) in
                do {
                    if let mediaLimit, cappedNoteIds.contains(noteId) {
                        // `nil` data and no ghost: too large, left out.
                        return (noteId, try await client.getNoteContent(noteId, maxBytes: mediaLimit), false)
                    }
                    let data = try await client.getNoteContent(noteId)
                    return (noteId, data, false)
                } catch {
                    let isGhost: Bool
                    if case .serverError(let code, let msg) = APIError.from(error),
                       code == 500, let msg, msg.contains("Cannot find content") {
                        isGhost = true
                    } else {
                        isGhost = false
                    }
                    Log.sync.warning("Failed to download content for \(noteId): \(error)")
                    return (noteId, nil, isGhost)
                }
            }

            var downloaded: [(noteId: String, data: Data)] = []
            var tooLarge: [String] = []
            for (noteId, data, isGhost) in results {
                if isGhost {
                    result.ghostNoteIds.insert(noteId)
                } else if let data {
                    downloaded.append((noteId, data))
                } else if cappedNoteIds.contains(noteId) {
                    tooLarge.append(noteId)
                }
            }
            if !tooLarge.isEmpty {
                try await store.markBodiesSkipped(tooLarge, profileId: profileId)
                Log.sync.info("Left \(tooLarge.count) bodies over the media size limit uncached")
            }
            result.storedCount += try await store.storeBodies(
                downloaded,
                serverDates: serverNotes,
                exclusion: respectCacheExclusion ? exclusionRules(profileId) : nil,
                profileId: profileId
            )

            let done = self.progressDone + batch.count
            self.reportProgress(done: done, fraction: Double(done) / Double(max(self.progressTotal, 1)))
        }
        return result
    }

    // MARK: - Phase 3: Deletion Reconciliation

    /// Removes cached notes the walk no longer found on the server; returns how many.
    private func reconcileDeletions(
        serverNoteIds: Set<String>,
        profileId: String,
        syncStartedAt: Date
    ) async throws -> Int {
        let removed = try await store.deleteNotesGoneFromServer(
            serverNoteIds: serverNoteIds,
            syncStartedAt: syncStartedAt,
            profileId: profileId
        )
        if removed > 0 {
            Log.sync.info("Removed \(removed) locally cached notes deleted on server")
        }
        return removed
    }

    // MARK: - Concurrency Helper

    private func fetchInParallel<ID: Sendable, T: Sendable>(
        ids: [ID],
        maxConcurrency: Int,
        fetch: @Sendable @escaping (ID) async throws -> T
    ) async throws -> [T] {
        try await withThrowingTaskGroup(of: T.self) { group in
            var results: [T] = []
            var index = 0

            for _ in 0..<min(maxConcurrency, ids.count) {
                let id = ids[index]
                index += 1
                group.addTask { try await fetch(id) }
            }

            for try await result in group {
                results.append(result)
                if index < ids.count {
                    let id = ids[index]
                    index += 1
                    group.addTask { try await fetch(id) }
                }
            }

            return results
        }
    }
}
