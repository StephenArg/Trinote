import Foundation
import Observation

@Observable
@MainActor
final class SyncManager {
    private(set) var isSyncing = false
    private(set) var syncProgress: Double = 0
    private(set) var syncedNoteCount = 0
    private(set) var totalNoteCount = 0
    private(set) var lastFullSyncDate: Date?
    private(set) var lastIncrementalSyncDate: Date?
    private(set) var syncError: String?
    private(set) var phase: SyncPhase = .idle

    /// True when the most recently **finished** sync applied incoming entity rows to SwiftData (read on `phase == .done`).
    private(set) var lastCompletedSyncUpdatedLocalDatabase = false

    var hasCompletedFullSync: Bool { self.lastFullSyncDate != nil }

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
    private let persistence = PersistenceManager.shared
    private static let maxConcurrency = 8
    private static let pullBatchLimit = 1000

    private static let hiddenNoteIds: Set<String> = [
        "_hidden", "_share", "_lbRoot",
        "_lbAvailableLaunchers", "_lbVisibleLaunchers"
    ]

    /// Upper bound on `GET /api/sync/changed` calls per incremental run (Trilium batches changes).
    private static let maxSyncPullIterations = 2_000
    /// If the server keeps returning empty batches with `outstandingPullCount > 0` and does not advance `lastEntityChangeId`, stop to avoid spinning.
    private static let maxConsecutiveEmptyPullsWithoutAdvance = 8

    // MARK: - Public API

    func restoreSyncState(profileId: String) {
        let statuses = (try? self.persistence.fetchSyncStatuses(serverProfileId: profileId)) ?? []
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
    func fullSync(client: any TriliumClientProtocol, profileId: String) {
        self.syncTask?.cancel()
        self.syncGeneration &+= 1
        let gen = self.syncGeneration
        self.isSyncing = true
        self.syncError = nil
        self.phase = .walkingTree
        self.syncTask = Task { [self] in
            await self.performFullSync(client: client, profileId: profileId, generation: gen)
        }
    }

    /// After unlock, downloads bodies for protected notes (skipped during normal sync until a protected session exists).
    func prefetchProtectedNoteBodies(client: any TriliumClientProtocol, profileId: String) async {
        if isSyncing {
            Log.sync.debug("Deferring protected body prefetch — sync in progress")
            return
        }
        let map = (try? persistence.serverModifiedMapForProtectedNotesMissingContent(serverProfileId: profileId)) ?? [:]
        guard !map.isEmpty else { return }
        do {
            _ = try await downloadContent(
                serverNotes: map,
                client: client,
                profileId: profileId,
                protectedBodiesOnly: true
            )
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
            self.fullSync(client: client, profileId: profileId)
            return
        }
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
        self.syncTask?.cancel()
        self.syncTask = nil
        self.syncGeneration &+= 1
        self.isSyncing = false
        self.phase = .idle
    }

    private func isStale(_ generation: UInt64) -> Bool {
        Task.isCancelled || self.syncGeneration != generation
    }

    // MARK: - Full Sync (tree walk — unchanged approach for initial data)

    private func performFullSync(client: any TriliumClientProtocol, profileId: String, generation: UInt64) async {
        defer {
            if !isStale(generation) {
                self.isSyncing = false
            }
        }
        self.syncProgress = 0
        self.syncedNoteCount = 0
        self.totalNoteCount = 0
        self.lastCompletedSyncUpdatedLocalDatabase = false

        let syncStartedAt = Date.now

        do {
            let serverNotes = try await self.walkTree(client: client, profileId: profileId)
            if isStale(generation) { return }

            try? self.persistence.reconcileCachedNoteBranchesMetadata(serverProfileId: profileId)

            let allServerNoteIds = Set(serverNotes.keys)
            var serverNoteIds = allServerNoteIds
            self.totalNoteCount = serverNoteIds.count
            Log.sync.info("Tree walk complete: \(serverNoteIds.count) notes found")

            self.phase = .downloadingContent
            var ghostIds = try await self.downloadContent(
                serverNotes: serverNotes,
                client: client,
                profileId: profileId,
                protectedBodiesOnly: false
            )
            let backfillRetry = (try? self.persistence.serverModifiedMapForUnprotectedNotesMissingContent(serverProfileId: profileId)) ?? [:]
            if !backfillRetry.isEmpty {
                let ghost2 = try await self.downloadContent(
                    serverNotes: backfillRetry,
                    client: client,
                    profileId: profileId,
                    protectedBodiesOnly: false
                )
                ghostIds.formUnion(ghost2)
            }
            if isStale(generation) { return }

            if !ghostIds.isEmpty {
                for gid in ghostIds { GhostNoteTracker.shared.add(gid, serverProfileId: profileId) }
                serverNoteIds.subtract(ghostIds)
            }

            // Drop ghost IDs for notes the server no longer has; keep hiding notes
            // still on the server (client deletes not yet replicated, blob ghosts, etc.).
            GhostNoteTracker.shared.retainOnlyNotesStillOnServer(allServerNoteIds, serverProfileId: profileId)

            self.phase = .cleaningUp
            try self.reconcileDeletions(
                serverNoteIds: serverNoteIds,
                profileId: profileId,
                syncStartedAt: syncStartedAt
            )

            // Seed the pull cursor from the server's current max change ID
            // so incremental sync picks up from here.
            let check = try await client.syncCheck()
            try? self.persistence.setEntityPullCursor(serverProfileId: profileId, lastEntityChangeId: check.maxEntityChangeId)

            try? self.persistence.updateSyncStatus(domain: "fullSync", serverProfileId: profileId)
            self.lastFullSyncDate = .now
            self.lastIncrementalSyncDate = .now
            self.lastCompletedSyncUpdatedLocalDatabase = true
            self.phase = .done
            self.syncProgress = 1.0
            Log.sync.info("Full sync complete: \(self.syncedNoteCount) notes synced")

        } catch {
            if isStale(generation) { return }
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            self.syncError = apiError.localizedDescription
            self.phase = .idle
            Log.sync.error("Sync failed: \(error)")
            try? self.persistence.recordSyncError(
                domain: "fullSync",
                error: apiError.localizedDescription ?? "Unknown",
                serverProfileId: profileId
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
        }
        self.syncProgress = 0
        self.syncedNoteCount = 0
        self.totalNoteCount = 0

        do {
            var cursor = try self.persistence.getEntityPullCursor(serverProfileId: profileId)
            var lastPullMaxId: Int64 = cursor
            var totalApplied = 0
            var deletionCount = 0
            /// Note id → server `utcDateModified` for content staleness (empty string = unknown, still refreshes when body missing).
            var notesToRefreshContent: [String: String] = [:]
            var pullIterations = 0
            /// Empty batches with `outstandingPullCount > 0` but no cursor advance (server stuck).
            var consecutiveEmptyWithoutCursorAdvance = 0
            self.lastCompletedSyncUpdatedLocalDatabase = false

            // Trilium-style: repeat GET /api/sync/changed until an empty entityChanges batch AND
            // outstandingPullCount is 0. Do not stop early when outstandingPullCount == 0 after a
            // non-empty batch — the server may have more rows after the next cursor bump.
            while pullIterations < Self.maxSyncPullIterations {
                if isStale(generation) { return }
                pullIterations += 1

                let pull = try await client.syncPull(
                    instanceId: instanceId,
                    lastEntityChangeId: cursor
                )
                lastPullMaxId = pull.maxEntityChangeId

                if pull.entityChanges.isEmpty {
                    let advancedCursor = pull.maxEntityChangeId > cursor
                    if advancedCursor {
                        cursor = pull.maxEntityChangeId
                        try? self.persistence.setEntityPullCursor(serverProfileId: profileId, lastEntityChangeId: cursor)
                        consecutiveEmptyWithoutCursorAdvance = 0
                    }

                    if pull.outstandingPullCount > 0 {
                        if !advancedCursor {
                            consecutiveEmptyWithoutCursorAdvance += 1
                            if consecutiveEmptyWithoutCursorAdvance >= Self.maxConsecutiveEmptyPullsWithoutAdvance {
                                Log.sync.error("Incremental sync: aborting pull loop — empty batches with outstanding=\(pull.outstandingPullCount) but lastEntityChangeId not advancing (cursor=\(cursor))")
                                break
                            }
                        }
                        continue
                    }
                    break
                }

                consecutiveEmptyWithoutCursorAdvance = 0

                // Index the entity rows by (entityName, entityId) for quick lookup.
                let noteIndex  = Self.indexEntities(pull.notes, idKey: "noteId")
                let branchIndex = Self.indexEntities(pull.branches, idKey: "branchId")
                let attrIndex  = Self.indexEntities(pull.attributes, idKey: "attributeId")
                let blobIndex  = Self.indexEntities(pull.blobs, idKey: "blobId")

                for ec in pull.entityChanges {
                    if ec.isErased {
                        try applyErasedEntity(entityName: ec.entityName, entityId: ec.entityId, profileId: profileId)
                        deletionCount += 1
                        continue
                    }

                    switch ec.entityName {
                    case "notes":
                        if let row = noteIndex[ec.entityId] {
                            let wasDeletion = try applyNoteRow(row, profileId: profileId, notesToRefreshUtc: &notesToRefreshContent)
                            if wasDeletion { deletionCount += 1 }
                        }
                    case "branches":
                        if let row = branchIndex[ec.entityId] {
                            let wasDeletion = try applyBranchRow(row, profileId: profileId)
                            if wasDeletion { deletionCount += 1 }
                        }
                    case "attributes":
                        if let row = attrIndex[ec.entityId] {
                            let wasDeletion = try applyAttributeRow(row, profileId: profileId)
                            if wasDeletion { deletionCount += 1 }
                        }
                    case "blobs":
                        if let row = blobIndex[ec.entityId] {
                            try applyBlobRow(row, profileId: profileId, notesToRefreshUtc: &notesToRefreshContent)
                        }
                    default:
                        break
                    }
                }
                try? self.persistence.commitBatch()

                totalApplied += pull.entityChanges.count
                cursor = pull.maxEntityChangeId
                try? self.persistence.setEntityPullCursor(serverProfileId: profileId, lastEntityChangeId: cursor)
                // Always pull again; only an empty batch + outstanding==0 exits the loop.
            }

            if pullIterations >= Self.maxSyncPullIterations {
                Log.sync.warning("Incremental sync: stopped after \(Self.maxSyncPullIterations) pull iterations (safety cap)")
            }

            // Do not run `reconcileCachedNoteBranchesMetadata` here — it walks the entire branch/note tables on every
            // incremental run and can block the main actor for a long time. Full sync already reconciles; incremental
            // updates come from `applyBranchRow` / `applyNoteRow`.

            // Content downloads only for notes touched in this pull (not a full backfill of every missing body).
            let serverNotesForContent = notesToRefreshContent

            let ranContentPass: Bool
            if downloadChangedBodies {
                self.totalNoteCount = max(serverNotesForContent.count, totalApplied, 1)
                if !serverNotesForContent.isEmpty {
                    self.phase = .downloadingContent
                    let ghostIds = try await self.downloadContent(
                        serverNotes: serverNotesForContent,
                        client: client,
                        profileId: profileId,
                        protectedBodiesOnly: false
                    )
                    if !ghostIds.isEmpty {
                        for gid in ghostIds {
                            GhostNoteTracker.shared.add(gid, serverProfileId: profileId)
                            try? self.persistence.deleteCachedNotes(noteIds: [gid], serverProfileId: profileId)
                        }
                    }
                }
                ranContentPass = !serverNotesForContent.isEmpty
            } else {
                self.totalNoteCount = max(totalApplied, 1)
                ranContentPass = false
            }

            if isStale(generation) { return }
            self.lastCompletedSyncUpdatedLocalDatabase = (totalApplied > 0 || deletionCount > 0 || ranContentPass)

            try? self.persistence.updateSyncStatus(domain: "incrementalSync", serverProfileId: profileId)
            self.lastIncrementalSyncDate = .now
            self.phase = .done
            self.syncProgress = 1.0
            Log.sync.info(
                "Incremental sync complete: \(self.syncedNoteCount) notes updated, \(deletionCount) deletions\(downloadChangedBodies ? "" : " (metadata only)")"
            )

        } catch {
            if isStale(generation) { return }
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            self.syncError = apiError.localizedDescription
            self.phase = .idle
            Log.sync.error("Incremental sync failed: \(error)")
            try? self.persistence.recordSyncError(
                domain: "incrementalSync",
                error: apiError.localizedDescription ?? "Unknown",
                serverProfileId: profileId
            )
        }
    }

    // MARK: - Entity Application (from sync/pull rows)

    /// When the key is absent or JSON null, keep `existing`. When present (including `[]`), use the decoded array.
    /// Sync entity rows often omit tree fields; treating omission as “clear” wiped `childNoteIds` and broke offline sub-note lists.
    private static func treeStringArrayField(_ d: [String: Any], key: String, existing: [String]?) -> [String] {
        guard let raw = d[key], !(raw is NSNull) else {
            return existing ?? []
        }
        return FlexJSON.stringArray(raw) ?? []
    }

    private static func indexEntities(_ rows: [[String: Any]], idKey: String) -> [String: [String: Any]] {
        var index: [String: [String: Any]] = [:]
        for row in rows {
            if let id = FlexJSON.string(row[idKey]) {
                index[id] = row
            }
        }
        return index
    }

    private func applyErasedEntity(entityName: String, entityId: String, profileId: String) throws {
        switch entityName {
        case "notes":
            GhostNoteTracker.shared.add(entityId, serverProfileId: profileId)
            try persistence.deleteCachedNotes(noteIds: [entityId], serverProfileId: profileId)
        case "branches":
            try persistence.deleteCachedBranch(branchId: entityId, serverProfileId: profileId)
        case "attributes":
            try persistence.deleteCachedAttribute(attributeId: entityId, serverProfileId: profileId)
        default:
            break
        }
    }

    @discardableResult
    private func applyNoteRow(_ d: [String: Any], profileId: String, notesToRefreshUtc: inout [String: String]) throws -> Bool {
        guard let noteId = FlexJSON.string(d["noteId"]) else { return false }

        if FlexJSON.bool(d["isDeleted"]) {
            GhostNoteTracker.shared.add(noteId, serverProfileId: profileId)
            try persistence.deleteCachedNotes(noteIds: [noteId], serverProfileId: profileId)
            return true
        }

        let title = d["title"] as? String ?? ""
        let type = d["type"] as? String ?? "text"
        let mime = d["mime"] as? String ?? "text/html"
        let isProtected = FlexJSON.bool(d["isProtected"])
        let utc = d["utcDateModified"] as? String ?? ""

        let existing = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId)
        let parentNoteIds = Self.treeStringArrayField(d, key: "parentNoteIds", existing: existing?.parentNoteIds)
        let childNoteIds = Self.treeStringArrayField(d, key: "childNoteIds", existing: existing?.childNoteIds)
        let parentBranchIds = Self.treeStringArrayField(d, key: "parentBranchIds", existing: existing?.parentBranchIds)
        let childBranchIds = Self.treeStringArrayField(d, key: "childBranchIds", existing: existing?.childBranchIds)
        let response = NoteResponse(
            noteId: noteId,
            isProtected: isProtected,
            title: title,
            type: type,
            mime: mime,
            blobId: d["blobId"] as? String,
            isDeleted: false,
            dateCreated: d["dateCreated"] as? String ?? "",
            dateModified: d["dateModified"] as? String ?? "",
            utcDateCreated: d["utcDateCreated"] as? String ?? "",
            utcDateModified: utc,
            parentNoteIds: parentNoteIds,
            childNoteIds: childNoteIds,
            parentBranchIds: parentBranchIds,
            childBranchIds: childBranchIds,
            attributes: []
        )
        try persistence.cacheNoteBatch(from: response, serverProfileId: profileId)
        notesToRefreshUtc[noteId] = utc.isEmpty ? (notesToRefreshUtc[noteId] ?? "") : utc
        return false
    }

    @discardableResult
    private func applyBranchRow(_ d: [String: Any], profileId: String) throws -> Bool {
        guard let branchId = FlexJSON.string(d["branchId"]),
              let noteId = FlexJSON.string(d["noteId"]),
              let parentNoteId = FlexJSON.string(d["parentNoteId"]) else { return false }

        if FlexJSON.bool(d["isDeleted"]) {
            // Branch-only delete: remove this placement; do not ghost the note (it may exist under other parents/clones).
            try persistence.deleteCachedBranch(branchId: branchId, serverProfileId: profileId)
            return true
        }

        let notePosition = FlexJSON.int(d["notePosition"]) ?? 0
        let isExpanded = FlexJSON.bool(d["isExpanded"])
        let prefix = d["prefix"] as? String

        let br = BranchResponse(
            branchId: branchId,
            noteId: noteId,
            parentNoteId: parentNoteId,
            prefix: prefix,
            notePosition: notePosition,
            isExpanded: isExpanded,
            utcDateModified: d["utcDateModified"] as? String
        )
        try persistence.cacheBranchBatch(from: br, serverProfileId: profileId)
        return false
    }

    @discardableResult
    private func applyAttributeRow(_ d: [String: Any], profileId: String) throws -> Bool {
        guard let attributeId = FlexJSON.string(d["attributeId"]),
              let noteId = FlexJSON.string(d["noteId"]) else { return false }

        if FlexJSON.bool(d["isDeleted"]) {
            try persistence.deleteCachedAttribute(attributeId: attributeId, serverProfileId: profileId)
            return true
        }

        let ar = AttributeResponse(
            attributeId: attributeId,
            noteId: noteId,
            type: d["type"] as? String ?? "label",
            name: d["name"] as? String ?? "",
            value: d["value"] as? String ?? "",
            position: FlexJSON.int(d["position"]) ?? 0,
            isInheritable: FlexJSON.bool(d["isInheritable"]),
            utcDateModified: d["utcDateModified"] as? String
        )
        try persistence.cacheAttributeBatch(from: ar, serverProfileId: profileId)
        return false
    }

    private func applyBlobRow(_ d: [String: Any], profileId: String, notesToRefreshUtc: inout [String: String]) throws {
        guard let blobId = FlexJSON.string(d["blobId"]) else { return }

        // If the blob content is included, find the note(s) that reference
        // this blobId and cache it directly. Otherwise mark for download.
        if let contentStr = d["content"] as? String,
           let data = Data(base64Encoded: contentStr) ?? contentStr.data(using: .utf8) {
            let noteId = d["noteId"] as? String
            if let noteId {
                try? persistence.cacheNoteContent(noteId, content: data, serverProfileId: profileId, utcDateModified: nil)
            }
        }
        if let noteId = FlexJSON.string(d["noteId"]) {
            notesToRefreshUtc[noteId] = notesToRefreshUtc[noteId] ?? ""
        }
        _ = blobId
    }

    // MARK: - Phase 1: Tree Walk (full sync only)

    private func walkTree(
        client: any TriliumClientProtocol,
        profileId: String
    ) async throws -> [String: String] {
        var serverNotes: [String: String] = [:]
        var visited = Set<String>()

        try await self.walkNote(
            noteId: "root",
            client: client,
            profileId: profileId,
            serverNotes: &serverNotes,
            visited: &visited
        )

        return serverNotes
    }

    private func walkNote(
        noteId: String,
        client: any TriliumClientProtocol,
        profileId: String,
        serverNotes: inout [String: String],
        visited: inout Set<String>
    ) async throws {
        guard !visited.contains(noteId) else { return }
        visited.insert(noteId)
        if Task.isCancelled { return }
        if Self.hiddenNoteIds.contains(noteId) { return }

        let response = try await client.getNote(noteId)
        if response.isDeleted {
            return
        }
        serverNotes[response.noteId] = response.utcDateModified

        try self.persistence.cacheNoteBatch(from: response, serverProfileId: profileId)
        for attr in response.attributes {
            try? self.persistence.cacheAttributeBatch(from: attr, serverProfileId: profileId)
        }

        let childBranchIds = response.childBranchIds
        if childBranchIds.isEmpty {
            try? self.persistence.commitBatch()
            return
        }

        let branchResponses = try await self.fetchInParallel(
            ids: childBranchIds,
            maxConcurrency: Self.maxConcurrency
        ) { branchId in
            try await client.getBranch(branchId, parentNoteId: noteId)
        }

        for br in branchResponses {
            try? self.persistence.cacheBranchBatch(from: br, serverProfileId: profileId)
        }
        try? self.persistence.commitBatch()

        let childNoteIds = branchResponses.map(\.noteId)
        for childId in childNoteIds {
            if Task.isCancelled { return }
            if Self.hiddenNoteIds.contains(childId) { continue }
            try await self.walkNote(
                noteId: childId,
                client: client,
                profileId: profileId,
                serverNotes: &serverNotes,
                visited: &visited
            )
        }
    }

    // MARK: - Phase 2: Content Download

    /// Returns the set of "ghost" note IDs where the server returned
    /// 500 "Cannot find content" (blob erased but metadata still present).
    private func downloadContent(
        serverNotes: [String: String],
        client: any TriliumClientProtocol,
        profileId: String,
        protectedBodiesOnly: Bool
    ) async throws -> Set<String> {
        let noteIdsNeedingContent: [String]
        if protectedBodiesOnly {
            noteIdsNeedingContent = try self.persistence.fetchProtectedNotesNeedingContent(
                serverProfileId: profileId,
                serverModifiedAfter: serverNotes
            )
        } else {
            noteIdsNeedingContent = try self.persistence.fetchNotesNeedingContent(
                serverProfileId: profileId,
                serverModifiedAfter: serverNotes
            )
        }

        let alreadyUpToDate = self.totalNoteCount - noteIdsNeedingContent.count
        self.syncedNoteCount = max(alreadyUpToDate, 0)
        var ghostNoteIds = Set<String>()

        if noteIdsNeedingContent.isEmpty {
            self.syncProgress = 1.0
            return ghostNoteIds
        }

        Log.sync.info("Downloading content for \(noteIdsNeedingContent.count) of \(self.totalNoteCount) notes")

        for batchStart in stride(from: 0, to: noteIdsNeedingContent.count, by: Self.maxConcurrency) {
            if Task.isCancelled { return ghostNoteIds }

            let batchEnd = min(batchStart + Self.maxConcurrency, noteIdsNeedingContent.count)
            let batch = Array(noteIdsNeedingContent[batchStart..<batchEnd])

            let results = try await self.fetchInParallel(
                ids: batch,
                maxConcurrency: Self.maxConcurrency
            ) { noteId -> (String, Data?, Bool) in
                do {
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

            for (noteId, data, isGhost) in results {
                if isGhost {
                    ghostNoteIds.insert(noteId)
                } else if let data {
                    try? self.persistence.cacheNoteContent(
                        noteId, content: data, serverProfileId: profileId,
                        utcDateModified: serverNotes[noteId]
                    )
                }
            }

            self.syncedNoteCount += batch.count
            self.syncProgress = Double(self.syncedNoteCount) / Double(max(self.totalNoteCount, 1))
        }
        return ghostNoteIds
    }

    // MARK: - Phase 3: Deletion Reconciliation

    private func reconcileDeletions(
        serverNoteIds: Set<String>,
        profileId: String,
        syncStartedAt: Date
    ) throws {
        let localNoteIds = try self.persistence.fetchAllCachedNoteIds(serverProfileId: profileId)
        let localSet = Set(localNoteIds)
        let toDelete = localSet.subtracting(serverNoteIds).subtracting(Self.hiddenNoteIds)

        if toDelete.isEmpty { return }

        var safeToDelete = Set<String>()
        for noteId in toDelete {
            if let cached = try? self.persistence.fetchCachedNote(id: noteId, serverProfileId: profileId) {
                if cached.metadataFetchedAt < syncStartedAt {
                    safeToDelete.insert(noteId)
                }
            }
        }

        if !safeToDelete.isEmpty {
            try self.persistence.deleteCachedNotes(noteIds: safeToDelete, serverProfileId: profileId)
            Log.sync.info("Removed \(safeToDelete.count) locally cached notes deleted on server")
        }
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
