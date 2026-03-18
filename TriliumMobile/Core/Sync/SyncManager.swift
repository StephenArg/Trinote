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

    /// Whether a full sync has ever completed for the current profile.
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
    private let persistence = PersistenceManager.shared
    private static let maxConcurrency = 8

    private static let hiddenNoteIds: Set<String> = [
        "_hidden", "_share", "_lbRoot",
        "_lbAvailableLaunchers", "_lbVisibleLaunchers"
    ]

    /// UTC date formatter matching Trilium's format (YYYY-MM-DD HH:mm:ss.SSSZ)
    private static let utcFormatter: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "yyyy-MM-dd HH:mm:ss"
        f.timeZone = TimeZone(identifier: "UTC")
        return f
    }()

    // MARK: - Public API

    /// Restores sync dates from SwiftData so `hasCompletedFullSync` survives app restarts.
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

    func fullSync(client: any TriliumClientProtocol, profileId: String) {
        self.syncTask?.cancel()
        self.syncTask = Task { [self] in
            await self.performFullSync(client: client, profileId: profileId)
        }
    }

    /// Lightweight sync: uses the search API to find notes modified since
    /// the last sync, then fetches only those notes' metadata and content.
    func incrementalSync(client: any TriliumClientProtocol, profileId: String) {
        guard self.hasCompletedFullSync else {
            self.fullSync(client: client, profileId: profileId)
            return
        }
        self.syncTask?.cancel()
        self.syncTask = Task { [self] in
            await self.performIncrementalSync(client: client, profileId: profileId)
        }
    }

    func cancel() {
        self.syncTask?.cancel()
        self.syncTask = nil
        self.isSyncing = false
        self.phase = .idle
    }

    // MARK: - Full Sync

    private func performFullSync(client: any TriliumClientProtocol, profileId: String) async {
        guard !self.isSyncing else { return }

        self.isSyncing = true
        self.syncError = nil
        self.syncProgress = 0
        self.syncedNoteCount = 0
        self.totalNoteCount = 0
        self.phase = .walkingTree

        let syncStartedAt = Date.now

        do {
            let serverNotes = try await self.walkTree(client: client, profileId: profileId)
            if Task.isCancelled { self.resetState(); return }

            let serverNoteIds = Set(serverNotes.keys)
            self.totalNoteCount = serverNoteIds.count
            Log.sync.info("Tree walk complete: \(serverNoteIds.count) notes found")

            self.phase = .downloadingContent
            try await self.downloadContent(
                serverNotes: serverNotes,
                client: client,
                profileId: profileId
            )
            if Task.isCancelled { self.resetState(); return }

            self.phase = .cleaningUp
            try self.reconcileDeletions(
                serverNoteIds: serverNoteIds,
                profileId: profileId,
                syncStartedAt: syncStartedAt
            )

            try? self.persistence.updateSyncStatus(domain: "fullSync", serverProfileId: profileId)
            self.lastFullSyncDate = .now
            self.lastIncrementalSyncDate = .now
            self.phase = .done
            self.syncProgress = 1.0
            Log.sync.info("Full sync complete: \(self.syncedNoteCount) notes synced")

        } catch {
            if Task.isCancelled { self.resetState(); return }
            let apiError = APIError.from(error)
            if case .cancelled = apiError { self.resetState(); return }
            self.syncError = apiError.localizedDescription
            Log.sync.error("Sync failed: \(error)")
            try? self.persistence.recordSyncError(
                domain: "fullSync",
                error: apiError.localizedDescription ?? "Unknown",
                serverProfileId: profileId
            )
        }

        self.isSyncing = false
    }

    // MARK: - Incremental Sync

    private func performIncrementalSync(client: any TriliumClientProtocol, profileId: String) async {
        guard !self.isSyncing else { return }

        self.isSyncing = true
        self.syncError = nil
        self.syncProgress = 0
        self.syncedNoteCount = 0
        self.totalNoteCount = 0
        self.phase = .fetchingChanges

        do {
            // Use a 25-hour buffer to account for timezone differences between
            // the device (UTC) and the server's local `dateModified` field.
            // The content download phase skips notes that haven't actually changed,
            // so extra search results are cheap (metadata only).
            let sinceDate = (self.lastIncrementalSyncDate ?? self.lastFullSyncDate)?
                .addingTimeInterval(-90000) ?? Date.distantPast
            let sinceDateString = Self.utcFormatter.string(from: sinceDate)

            let searchQuery = "note.dateModified >= '\(sinceDateString)'"
            let response = try await client.searchNotes(
                query: searchQuery, fastSearch: false, includeArchived: true,
                ancestorNoteId: nil, orderBy: "dateModified", orderDirection: "desc",
                limit: 10000
            )
            if Task.isCancelled { self.resetState(); return }

            let changedNotes = response.results.filter { !Self.hiddenNoteIds.contains($0.noteId) }
            self.totalNoteCount = changedNotes.count
            Log.sync.info("Incremental sync: \(changedNotes.count) notes changed since \(sinceDateString)")

            if changedNotes.isEmpty {
                self.lastIncrementalSyncDate = .now
                self.phase = .done
                self.syncProgress = 1.0
                self.isSyncing = false
                return
            }

            // Cache metadata + attributes for changed notes
            for noteResponse in changedNotes {
                try self.persistence.cacheNoteBatch(from: noteResponse, serverProfileId: profileId)
                for attr in noteResponse.attributes {
                    try? self.persistence.cacheAttributeBatch(from: attr, serverProfileId: profileId)
                }
            }
            try? self.persistence.commitBatch()

            // Fetch branches for changed notes that have children
            self.phase = .downloadingContent
            let branchIds = changedNotes.flatMap(\.childBranchIds)
            if !branchIds.isEmpty {
                let branchResponses = try await self.fetchInParallel(
                    ids: branchIds, maxConcurrency: Self.maxConcurrency
                ) { branchId in
                    try await client.getBranch(branchId)
                }
                for br in branchResponses {
                    try? self.persistence.cacheBranchBatch(from: br, serverProfileId: profileId)
                }
                try? self.persistence.commitBatch()
            }

            // Build a map for content comparison and download only changed content
            var serverNotes: [String: String] = [:]
            for note in changedNotes {
                serverNotes[note.noteId] = note.utcDateModified
            }

            try await self.downloadContent(
                serverNotes: serverNotes, client: client, profileId: profileId
            )
            if Task.isCancelled { self.resetState(); return }

            try? self.persistence.updateSyncStatus(domain: "incrementalSync", serverProfileId: profileId)
            self.lastIncrementalSyncDate = .now
            self.phase = .done
            self.syncProgress = 1.0
            Log.sync.info("Incremental sync complete: \(self.syncedNoteCount) notes updated")

        } catch {
            if Task.isCancelled { self.resetState(); return }
            let apiError = APIError.from(error)
            if case .cancelled = apiError { self.resetState(); return }
            self.syncError = apiError.localizedDescription
            Log.sync.error("Incremental sync failed: \(error)")
            try? self.persistence.recordSyncError(
                domain: "incrementalSync",
                error: apiError.localizedDescription ?? "Unknown",
                serverProfileId: profileId
            )
        }

        self.isSyncing = false
    }

    private func resetState() {
        self.isSyncing = false
        self.phase = .idle
    }

    // MARK: - Phase 1: Tree Walk

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
            try await client.getBranch(branchId)
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

    private func downloadContent(
        serverNotes: [String: String],
        client: any TriliumClientProtocol,
        profileId: String
    ) async throws {
        let noteIdsNeedingContent = try self.persistence.fetchNotesNeedingContent(
            serverProfileId: profileId,
            serverModifiedAfter: serverNotes
        )

        let alreadyUpToDate = self.totalNoteCount - noteIdsNeedingContent.count
        self.syncedNoteCount = max(alreadyUpToDate, 0)

        if noteIdsNeedingContent.isEmpty {
            self.syncProgress = 1.0
            return
        }

        Log.sync.info("Downloading content for \(noteIdsNeedingContent.count) of \(self.totalNoteCount) notes")

        for batchStart in stride(from: 0, to: noteIdsNeedingContent.count, by: Self.maxConcurrency) {
            if Task.isCancelled { return }

            let batchEnd = min(batchStart + Self.maxConcurrency, noteIdsNeedingContent.count)
            let batch = Array(noteIdsNeedingContent[batchStart..<batchEnd])

            let results = try await self.fetchInParallel(
                ids: batch,
                maxConcurrency: Self.maxConcurrency
            ) { noteId -> (String, Data)? in
                do {
                    let data = try await client.getNoteContent(noteId)
                    return (noteId, data)
                } catch {
                    Log.sync.warning("Failed to download content for \(noteId): \(error)")
                    return nil
                }
            }

            for result in results {
                guard let (noteId, data) = result else { continue }
                try? self.persistence.cacheNoteContent(
                    noteId, content: data, serverProfileId: profileId,
                    utcDateModified: serverNotes[noteId]
                )
            }

            self.syncedNoteCount += batch.count
            self.syncProgress = Double(self.syncedNoteCount) / Double(max(self.totalNoteCount, 1))
        }
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
