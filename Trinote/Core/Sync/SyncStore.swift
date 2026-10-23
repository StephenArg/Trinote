import Foundation
import SwiftData

/// Sync's SwiftData reads and writes, on a background context of the shared container, so walking and caching tens
/// of thousands of notes doesn't block the UI. `SyncManager` keeps the control flow and progress on the main actor and
/// hands this only `Sendable` values. Saves here merge into the main context; the tree refetches on
/// `.trinoteTreeShouldRefresh`.
///
/// Not a `@ModelActor`: its default executor runs each call on the thread that enqueues it, which for `SyncManager`
/// is the main thread. This actor runs on its own serial queue instead, and makes its contexts there, so they only
/// ever live on that queue (a context made on the main thread would act as a main context).
///
/// Each call works in a context of its own and drops it when it returns (`releaseContext()`). A `ModelContext` keeps
/// every model it reads, small bodies included, until it next saves, so one context kept across a full sync with
/// nothing to write held every note it walked at once.
actor SyncStore {
    private let queue = DispatchSerialQueue(label: "com.trinote.sync-store", qos: .userInitiated)
    private let modelContainer: ModelContainer
    private var contextStorage: ModelContext?

    nonisolated var unownedExecutor: UnownedSerialExecutor {
        queue.asUnownedSerialExecutor()
    }

    init(modelContainer: ModelContainer) {
        self.modelContainer = modelContainer
    }

    /// Made on first use in a call, which is always on `queue`.
    private var modelContext: ModelContext {
        if let contextStorage { return contextStorage }
        let context = ModelContext(modelContainer)
        context.autosaveEnabled = false
        contextStorage = context
        return context
    }

    /// Ends a call: saves anything it left unsaved (as the next save on a kept context used to) and drops the
    /// context, which frees the models it read.
    private func releaseContext() {
        guard let context = contextStorage else { return }
        contextStorage = nil
        guard context.hasChanges else { return }
        do {
            try context.save()
        } catch {
            Log.sync.error("SyncStore: saving before dropping its context failed: \(error)")
        }
    }

    /// Whether a context outlived the last call (it shouldn't). For tests.
    var hasLiveContext: Bool {
        contextStorage != nil
    }

    /// System subtrees sync neither walks nor deletes.
    static let hiddenNoteIds: Set<String> = [
        "_hidden", "_share", "_lbRoot",
        "_lbAvailableLaunchers", "_lbVisibleLaunchers"
    ]

    private var cache: CacheStore { CacheStore(context: modelContext) }

    /// Whether this store's work runs on the main thread (it shouldn't; see the type's note). For tests.
    func runsOnMainThread() -> Bool {
        Thread.isMainThread
    }

    // MARK: - Pull cursor and sync status

    func pullCursor(profileId: String) throws -> Int64 {
        defer { releaseContext() }
        return try cache.getEntityPullCursor(serverProfileId: profileId)
    }

    func setPullCursor(_ lastEntityChangeId: Int64, profileId: String) throws {
        defer { releaseContext() }
        try cache.setEntityPullCursor(serverProfileId: profileId, lastEntityChangeId: lastEntityChangeId)
    }

    func recordSyncSuccess(domain: String, profileId: String) throws {
        defer { releaseContext() }
        try cache.updateSyncStatus(domain: domain, serverProfileId: profileId)
    }

    func recordSyncError(domain: String, error: String, profileId: String) throws {
        defer { releaseContext() }
        try cache.recordSyncError(domain: domain, error: error, serverProfileId: profileId)
    }

    // MARK: - Full-sync walk

    /// What the cache holds for these notes, for `fullSyncFetchTreeBatch` to skip unchanged ones.
    func cachedStates(noteIds: [String], profileId: String) throws -> [String: FullSyncCachedNoteState] {
        defer { releaseContext() }
        return try cache.fetchCachedNotes(ids: noteIds, serverProfileId: profileId).mapValues { row in
            FullSyncCachedNoteState(
                blobId: row.blobId,
                title: row.title,
                type: row.noteType,
                mime: row.mime,
                isProtected: row.isProtected,
                utcDateModified: row.utcDateModified
            )
        }
    }

    /// Caches walked notes with their attributes and child branches: existing rows fetched together, only rows that
    /// differ written, one save. Returns how many rows it inserted or changed.
    func cacheWalkEntries(_ entries: [FullSyncTreeBatchEntry], profileId: String) throws -> Int {
        defer { releaseContext() }
        guard !entries.isEmpty else { return 0 }
        let cache = self.cache
        let notes = try cache.fetchCachedNotes(ids: entries.map(\.note.noteId), serverProfileId: profileId)
        let branches = try cache.fetchCachedBranches(
            ids: entries.flatMap { $0.childBranches.map(\.branchId) },
            serverProfileId: profileId
        )
        let attributes = try cache.fetchCachedAttributes(
            ids: entries.flatMap { $0.note.attributes.map(\.attributeId) },
            serverProfileId: profileId
        )
        var written = 0
        for entry in entries {
            let note = entry.note
            if cache.upsertNoteForFullSync(note, existing: notes[note.noteId], serverProfileId: profileId) {
                written += 1
            }
            for attribute in note.attributes
            where cache.upsertAttributeForFullSync(attribute, existing: attributes[attribute.attributeId], serverProfileId: profileId) {
                written += 1
            }
            for branch in entry.childBranches
            where cache.upsertBranchForFullSync(branch, existing: branches[branch.branchId], serverProfileId: profileId) {
                written += 1
            }
        }
        if modelContext.hasChanges { try modelContext.save() }
        return written
    }

    /// Rebuilds every note's parent/child lists from branch rows; returns how many notes changed.
    func reconcileTreeLists(profileId: String) throws -> Int {
        defer { releaseContext() }
        return try cache.reconcileCachedNoteBranchesMetadata(serverProfileId: profileId)
    }

    func reconcileTreeLists(forNoteId noteId: String, profileId: String) throws {
        defer { releaseContext() }
        try cache.reconcileCachedNoteBranchesMetadata(forNoteId: noteId, serverProfileId: profileId)
        if modelContext.hasChanges { try modelContext.save() }
    }

    // MARK: - Note bodies

    /// Bodies a content pass should download.
    struct ContentCandidates: Sendable {
        var noteIds: [String] = []
        /// Image and file notes among them (downloaded with the size limit, when there is one).
        var mediaNoteIds: Set<String> = []
        /// Cached parent ids, for cache-exclusion checks.
        var parentNoteIds: [String: [String]] = [:]
    }

    /// The candidates whose cached body is stale or missing and that `media` allows.
    func contentCandidates(
        candidates: [String: String],
        isProtected: Bool,
        media: MediaBodyPolicy,
        profileId: String
    ) throws -> ContentCandidates {
        defer { releaseContext() }
        let cache = self.cache
        let stale = isProtected
            ? try cache.fetchProtectedNotesNeedingContent(serverProfileId: profileId, serverModifiedAfter: candidates)
            : try cache.fetchNotesNeedingContent(serverProfileId: profileId, serverModifiedAfter: candidates)
        let rows = try cache.fetchCachedNotes(ids: stale, serverProfileId: profileId)
        var result = ContentCandidates()
        for noteId in stale {
            guard let row = rows[noteId],
                  media.allowsBody(type: row.noteType, blobId: row.blobId, skippedBlobId: row.contentSkippedBlobId)
            else { continue }
            result.noteIds.append(noteId)
            result.parentNoteIds[noteId] = row.parentNoteIds
            if OfflineCacheSettings.isMediaNote(type: row.noteType) {
                result.mediaNoteIds.insert(noteId)
            }
        }
        return result
    }

    /// Remembers bodies left out for their size, by blob id, so sync doesn't download them again until they change.
    func markBodiesSkipped(_ noteIds: [String], profileId: String) throws {
        defer { releaseContext() }
        for row in try cache.fetchCachedNotes(ids: noteIds, serverProfileId: profileId).values {
            row.contentSkippedBlobId = row.blobId
        }
        if modelContext.hasChanges { try modelContext.save() }
    }

    /// Notes with no cached body yet: note id → "" (date unknown).
    func notesMissingContent(isProtected: Bool, profileId: String) throws -> [String: String] {
        defer { releaseContext() }
        return isProtected
            ? try cache.serverModifiedMapForProtectedNotesMissingContent(serverProfileId: profileId)
            : try cache.serverModifiedMapForUnprotectedNotesMissingContent(serverProfileId: profileId)
    }

    /// Stores downloaded bodies on their rows, each marked with the blob id the walk or pull just recorded, and saves
    /// once. Notes the exclusion rules leave out, or no longer cached, are skipped. Returns how many it stored.
    func storeBodies(
        _ bodies: [(noteId: String, data: Data)],
        serverDates: [String: String],
        exclusion: CacheExclusionSnapshot?,
        profileId: String
    ) throws -> Int {
        defer { releaseContext() }
        let rows = try cache.fetchCachedNotes(ids: bodies.map(\.noteId), serverProfileId: profileId)
        var stored = 0
        for (noteId, data) in bodies {
            guard let row = rows[noteId] else { continue }
            if let exclusion, exclusion.isNoteExcludedFromCache(noteId: noteId, parentNoteIds: row.parentNoteIds) {
                continue
            }
            CacheStore.storeBody(data, in: row, utcDateModified: serverDates[noteId], contentBlobId: row.blobId)
            stored += 1
        }
        if modelContext.hasChanges { try modelContext.save() }
        return stored
    }

    // MARK: - Deletions

    /// Removes cached notes the full walk didn't find on the server, except `keep` (hidden system notes) and rows
    /// written since the sync started (created locally meanwhile). Returns how many it removed.
    func deleteNotesGoneFromServer(
        serverNoteIds: Set<String>,
        syncStartedAt: Date,
        profileId: String
    ) throws -> Int {
        defer { releaseContext() }
        let cache = self.cache
        let local = Set(try cache.fetchAllCachedNoteIds(serverProfileId: profileId))
        let gone = local.subtracting(serverNoteIds).subtracting(Self.hiddenNoteIds)
        guard !gone.isEmpty else { return 0 }
        let rows = try cache.fetchCachedNotes(ids: gone, serverProfileId: profileId)
        let safeToDelete = Set(rows.values.filter { $0.metadataFetchedAt < syncStartedAt }.map(\.noteId))
        guard !safeToDelete.isEmpty else { return 0 }
        try cache.deleteCachedNotes(noteIds: safeToDelete, serverProfileId: profileId)
        return safeToDelete.count
    }

    func deleteNotes(_ noteIds: Set<String>, profileId: String) throws {
        defer { releaseContext() }
        try cache.deleteCachedNotes(noteIds: noteIds, serverProfileId: profileId)
    }

    /// Drops cached branches under `parentNoteId` the server no longer has (and notes left without any). Returns how
    /// many rows it pruned and how many children the cache had before.
    func pruneStaleBranches(
        parentNoteId: String,
        liveBranchIds: Set<String>,
        profileId: String
    ) throws -> (pruned: Int, cachedChildCount: Int) {
        defer { releaseContext() }
        let cache = self.cache
        let cachedChildCount = try cache.fetchCachedChildren(parentNoteId: parentNoteId, serverProfileId: profileId).count
        let pruned = try cache.pruneStaleBranchesUnderParent(
            parentNoteId: parentNoteId,
            liveBranchIds: liveBranchIds,
            serverProfileId: profileId,
            hiddenNoteIds: Self.hiddenNoteIds
        )
        return (pruned, cachedChildCount)
    }

    // MARK: - Entity pull (`GET /api/sync/changed`)

    struct PullBatchResult: Sendable {
        var deletionCount = 0
        /// Note id → server `utcDateModified` for content staleness (empty string = unknown, still refreshes when body missing).
        var notesToRefreshContent: [String: String] = [:]
        /// Notes erased on the server, for the caller to drop from the cache-exclusion list.
        var erasedNoteIds: [String] = []
        /// Protected notes this batch wrote. Sync rows carry their titles encrypted, so the cache kept the title it
        /// had; while the protected session is open the caller fetches the readable ones.
        var protectedNoteIds: Set<String> = []
    }

    /// Applies one pulled batch of entity changes (notes, branches, attributes, blobs, reorderings, erasures) and
    /// saves. `notesToRefreshContent` carries on from earlier batches of the same pull.
    func applyPullBatch(
        _ pull: SyncPullResponse,
        exclusion: CacheExclusionSnapshot,
        media: MediaBodyPolicy,
        notesToRefreshContent: [String: String],
        profileId: String
    ) throws -> PullBatchResult {
        defer { releaseContext() }
        var result = PullBatchResult(notesToRefreshContent: notesToRefreshContent)
        let pendingDeletions = (try? cache.pendingDeletionNoteIds(serverProfileId: profileId)) ?? []
        let context = PullContext(profileId: profileId, exclusion: exclusion, media: media, pendingDeletions: pendingDeletions)

        // Index the entity rows by (entityName, entityId) for quick lookup.
        let noteIndex = Self.indexEntities(pull.notes, idKey: "noteId")
        let branchIndex = Self.indexEntities(pull.branches, idKey: "branchId")
        let attrIndex = Self.indexEntities(pull.attributes, idKey: "attributeId")
        let blobIndex = Self.indexEntities(pull.blobs, idKey: "blobId")

        for ec in pull.entityChanges {
            if ec.isErased {
                try applyErasedEntity(entityName: ec.entityName, entityId: ec.entityId, context: context, result: &result)
                result.deletionCount += 1
                continue
            }

            switch ec.entityName {
            case "notes":
                if let row = noteIndex[ec.entityId],
                   try applyNoteRow(row, context: context, notesToRefreshUtc: &result.notesToRefreshContent, protectedNoteIds: &result.protectedNoteIds) {
                    result.deletionCount += 1
                }
            case "branches":
                if let row = branchIndex[ec.entityId], try applyBranchRow(row, context: context) {
                    result.deletionCount += 1
                }
            case "attributes":
                if let row = attrIndex[ec.entityId], try applyAttributeRow(row, context: context) {
                    result.deletionCount += 1
                }
            case "blobs":
                if let row = blobIndex[ec.entityId] {
                    try applyBlobRow(row, context: context, notesToRefreshUtc: &result.notesToRefreshContent)
                }
            case "note_reordering":
                if let positions = pull.noteReorderings[ec.entityId] {
                    try cache.applyChildBranchPositions(positions, parentNoteId: ec.entityId, serverProfileId: profileId)
                }
            default:
                break
            }
        }
        if modelContext.hasChanges { try modelContext.save() }
        return result
    }

    /// What applying one pull batch needs to know about the account.
    private struct PullContext {
        let profileId: String
        let exclusion: CacheExclusionSnapshot
        let media: MediaBodyPolicy
        let pendingDeletions: Set<String>
    }

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

    /// Client-deleted notes (ghost / offline queue) must not be resurrected by stale sync rows.
    private func shouldSuppressIncomingNote(_ noteId: String, context: PullContext) -> Bool {
        GhostNoteTracker.shared.contains(noteId, serverProfileId: context.profileId) || context.pendingDeletions.contains(noteId)
    }

    private func cachedParentNoteIds(noteId: String, profileId: String) -> [String] {
        (try? cache.fetchCachedNote(id: noteId, serverProfileId: profileId))?.parentNoteIds ?? []
    }

    private func applyErasedEntity(
        entityName: String,
        entityId: String,
        context: PullContext,
        result: inout PullBatchResult
    ) throws {
        let profileId = context.profileId
        switch entityName {
        case "notes":
            let parentIds = cachedParentNoteIds(noteId: entityId, profileId: profileId)
            GhostNoteTracker.shared.add(entityId, serverProfileId: profileId)
            try cache.deleteCachedNotes(noteIds: [entityId], serverProfileId: profileId)
            result.erasedNoteIds.append(entityId)
            for parentId in parentIds {
                try? cache.reconcileCachedNoteBranchesMetadata(forNoteId: parentId, serverProfileId: profileId)
            }
            try? cache.commitBatch()
        case "branches":
            if let branch = try? cache.fetchCachedBranch(branchId: entityId, serverProfileId: profileId) {
                try cache.deleteCachedBranchAndReconcilePlacement(
                    branchId: entityId,
                    noteId: branch.noteId,
                    parentNoteId: branch.parentNoteId,
                    serverProfileId: profileId,
                    hiddenNoteIds: Self.hiddenNoteIds
                )
            } else {
                try cache.deleteCachedBranch(branchId: entityId, serverProfileId: profileId)
            }
        case "attributes":
            try cache.deleteCachedAttribute(attributeId: entityId, serverProfileId: profileId)
        default:
            break
        }
    }

    /// Returns whether the row deleted the note.
    private func applyNoteRow(
        _ d: [String: Any],
        context: PullContext,
        notesToRefreshUtc: inout [String: String],
        protectedNoteIds: inout Set<String>
    ) throws -> Bool {
        guard let noteId = FlexJSON.string(d["noteId"]) else { return false }
        let profileId = context.profileId

        if FlexJSON.bool(d["isDeleted"]) {
            let parentIds = cachedParentNoteIds(noteId: noteId, profileId: profileId)
            GhostNoteTracker.shared.add(noteId, serverProfileId: profileId)
            try cache.deleteCachedNotes(noteIds: [noteId], serverProfileId: profileId)
            for parentId in parentIds {
                try? cache.reconcileCachedNoteBranchesMetadata(forNoteId: parentId, serverProfileId: profileId)
            }
            try? cache.commitBatch()
            return true
        }

        if shouldSuppressIncomingNote(noteId, context: context) {
            return false
        }

        let existing = try? cache.fetchCachedNote(id: noteId, serverProfileId: profileId)
        let parentNoteIds = Self.treeStringArrayField(d, key: "parentNoteIds", existing: existing?.parentNoteIds)
        if context.exclusion.isNoteExcludedFromCache(noteId: noteId, parentNoteIds: parentNoteIds) {
            return false
        }

        let utc = d["utcDateModified"] as? String ?? ""
        let isProtected = FlexJSON.bool(d["isProtected"])
        // A protected note's sync row carries its title encrypted: keep the title the cache has (readable once it
        // was fetched in a protected session) rather than replace it with ciphertext.
        var title = d["title"] as? String ?? ""
        if isProtected {
            protectedNoteIds.insert(noteId)
            if let existing, existing.isProtected, !existing.title.isEmpty {
                title = existing.title
            }
        }
        let response = NoteResponse(
            noteId: noteId,
            isProtected: isProtected,
            title: title,
            type: d["type"] as? String ?? "text",
            mime: d["mime"] as? String ?? "text/html",
            blobId: d["blobId"] as? String,
            isDeleted: false,
            dateCreated: d["dateCreated"] as? String ?? "",
            dateModified: d["dateModified"] as? String ?? "",
            utcDateCreated: d["utcDateCreated"] as? String ?? "",
            utcDateModified: utc,
            parentNoteIds: parentNoteIds,
            childNoteIds: Self.treeStringArrayField(d, key: "childNoteIds", existing: existing?.childNoteIds),
            parentBranchIds: Self.treeStringArrayField(d, key: "parentBranchIds", existing: existing?.parentBranchIds),
            childBranchIds: Self.treeStringArrayField(d, key: "childBranchIds", existing: existing?.childBranchIds),
            attributes: []
        )
        try cache.cacheNoteBatch(from: response, serverProfileId: profileId)
        notesToRefreshUtc[noteId] = utc.isEmpty ? (notesToRefreshUtc[noteId] ?? "") : utc
        return false
    }

    /// Returns whether the row deleted a branch.
    private func applyBranchRow(_ d: [String: Any], context: PullContext) throws -> Bool {
        guard let branchId = FlexJSON.string(d["branchId"]),
              let noteId = FlexJSON.string(d["noteId"]),
              let parentNoteId = FlexJSON.string(d["parentNoteId"]) else { return false }
        let profileId = context.profileId

        if FlexJSON.bool(d["isDeleted"]) {
            try cache.deleteCachedBranchAndReconcilePlacement(
                branchId: branchId,
                noteId: noteId,
                parentNoteId: parentNoteId,
                serverProfileId: profileId,
                hiddenNoteIds: Self.hiddenNoteIds
            )
            return true
        }

        if shouldSuppressIncomingNote(noteId, context: context) {
            return false
        }
        let parentNoteIds = cachedParentNoteIds(noteId: noteId, profileId: profileId)
        if context.exclusion.isNoteExcludedFromCache(noteId: noteId, parentNoteIds: parentNoteIds) {
            return false
        }

        let branch = BranchResponse(
            branchId: branchId,
            noteId: noteId,
            parentNoteId: parentNoteId,
            prefix: d["prefix"] as? String,
            notePosition: FlexJSON.int(d["notePosition"]) ?? 0,
            isExpanded: FlexJSON.bool(d["isExpanded"]),
            utcDateModified: d["utcDateModified"] as? String
        )
        try cache.cacheBranchBatch(from: branch, serverProfileId: profileId)
        return false
    }

    /// Returns whether the row deleted an attribute.
    private func applyAttributeRow(_ d: [String: Any], context: PullContext) throws -> Bool {
        guard let attributeId = FlexJSON.string(d["attributeId"]),
              let noteId = FlexJSON.string(d["noteId"]) else { return false }
        let profileId = context.profileId

        if FlexJSON.bool(d["isDeleted"]) {
            try cache.deleteCachedAttribute(attributeId: attributeId, serverProfileId: profileId)
            return true
        }

        if shouldSuppressIncomingNote(noteId, context: context) {
            return false
        }
        let parentNoteIds = cachedParentNoteIds(noteId: noteId, profileId: profileId)
        if context.exclusion.isNoteExcludedFromCache(noteId: noteId, parentNoteIds: parentNoteIds) {
            return false
        }

        let attribute = AttributeResponse(
            attributeId: attributeId,
            noteId: noteId,
            type: d["type"] as? String ?? "label",
            name: d["name"] as? String ?? "",
            value: d["value"] as? String ?? "",
            position: FlexJSON.int(d["position"]) ?? 0,
            isInheritable: FlexJSON.bool(d["isInheritable"]),
            utcDateModified: d["utcDateModified"] as? String
        )
        try cache.cacheAttributeBatch(from: attribute, serverProfileId: profileId)
        return false
    }

    private func applyBlobRow(_ d: [String: Any], context: PullContext, notesToRefreshUtc: inout [String: String]) throws {
        guard let blobId = FlexJSON.string(d["blobId"]) else { return }
        let profileId = context.profileId

        // If the blob content is included, find the note(s) that reference
        // this blobId and cache it directly. Otherwise mark for download.
        if let contentStr = d["content"] as? String,
           let data = Data(base64Encoded: contentStr) ?? contentStr.data(using: .utf8),
           let noteId = d["noteId"] as? String,
           !shouldSuppressIncomingNote(noteId, context: context) {
            let note = try? cache.fetchCachedNote(id: noteId, serverProfileId: profileId)
            let mediaAllowed = note.map {
                context.media.allowsBody(type: $0.noteType, blobId: blobId, skippedBlobId: $0.contentSkippedBlobId)
            } ?? true
            if mediaAllowed, !context.exclusion.isNoteExcludedFromCache(noteId: noteId, parentNoteIds: note?.parentNoteIds ?? []) {
                try? cache.cacheNoteContent(
                    noteId,
                    content: data,
                    serverProfileId: profileId,
                    utcDateModified: nil,
                    contentBlobId: blobId
                )
            }
        }
        if let noteId = FlexJSON.string(d["noteId"]),
           !shouldSuppressIncomingNote(noteId, context: context) {
            let parentNoteIds = cachedParentNoteIds(noteId: noteId, profileId: profileId)
            if !context.exclusion.isNoteExcludedFromCache(noteId: noteId, parentNoteIds: parentNoteIds) {
                notesToRefreshUtc[noteId] = notesToRefreshUtc[noteId] ?? ""
            }
        }
    }
}
