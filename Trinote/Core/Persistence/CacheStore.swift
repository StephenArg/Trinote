import Foundation
import SwiftData

/// The offline cache's SwiftData operations that sync needs, on whichever `ModelContext` it's given: the main one
/// through `PersistenceManager` (which forwards to this), or `SyncStore`'s background one, so that walking and caching
/// tens of thousands of notes doesn't block the UI.
struct CacheStore {
    let context: ModelContext

    /// Posts on the main thread, where the UI observes, even when the caller is a background context.
    static func postOnMainThread(_ name: Notification.Name) {
        if Thread.isMainThread {
            NotificationCenter.default.post(name: name, object: nil)
        } else {
            DispatchQueue.main.async { NotificationCenter.default.post(name: name, object: nil) }
        }
    }

    func fetchCachedNote(id: String, serverProfileId: String) throws -> CachedNote? {
        let noteId = id
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedNote>(
            predicate: #Predicate { $0.noteId == noteId && $0.serverProfileId == profileId }
        )
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    func cacheNote(from response: NoteResponse, serverProfileId: String) throws {
        let existing = try fetchCachedNote(id: response.noteId, serverProfileId: serverProfileId)
        if let existing {
            existing.title = response.title
            existing.noteType = response.type
            existing.mime = response.mime
            existing.isProtected = response.isProtected
            existing.parentNoteIds = response.parentNoteIds
            existing.childNoteIds = response.childNoteIds
            existing.parentBranchIds = response.parentBranchIds
            existing.childBranchIds = response.childBranchIds
            // Don't update utcDateModified here — it's updated in
            // cacheNoteContent so that fetchNotesNeedingContent can
            // correctly detect stale content by comparing dates.
            if let blobId = response.blobId, existing.blobId != blobId {
                existing.blobId = blobId
            }
            existing.metadataFetchedAt = .now
        } else {
            let cached = CachedNote(
                noteId: response.noteId,
                title: response.title,
                noteType: response.type,
                mime: response.mime,
                isProtected: response.isProtected,
                parentNoteIds: response.parentNoteIds,
                childNoteIds: response.childNoteIds,
                parentBranchIds: response.parentBranchIds,
                childBranchIds: response.childBranchIds,
                utcDateModified: nil,
                serverProfileId: serverProfileId,
                blobId: response.blobId
            )
            context.insert(cached)
        }
    }

    /// - Parameter contentBlobId: The blob id this body was downloaded for, when known (sync). `nil` leaves the next
    ///   sync to compare dates for this body.
    func cacheNoteContent(
        _ noteId: String,
        content: Data,
        serverProfileId: String,
        utcDateModified: String? = nil,
        contentBlobId: String? = nil
    ) throws {
        if let existing = try fetchCachedNote(id: noteId, serverProfileId: serverProfileId) {
            Self.storeBody(content, in: existing, utcDateModified: utcDateModified, contentBlobId: contentBlobId)
            try context.save()
        }
    }

    /// Writes a downloaded body onto its row (the caller saves).
    static func storeBody(_ content: Data, in note: CachedNote, utcDateModified: String?, contentBlobId: String?) {
        note.content = content
        note.contentByteCount = content.count
        note.contentFetchedAt = .now
        if let date = utcDateModified {
            note.utcDateModified = date
        }
        note.contentBlobId = contentBlobId
        note.contentSkippedBlobId = nil
    }

    /// Cached notes for `ids` keyed by note id: one query per 500 ids instead of one per note.
    func fetchCachedNotes(ids: some Collection<String>, serverProfileId: String) throws -> [String: CachedNote] {
        let profileId = serverProfileId
        var byId: [String: CachedNote] = [:]
        byId.reserveCapacity(ids.count)
        for chunk in Array(ids).chunked(into: Self.idQueryChunkSize) {
            let rows = try context.fetch(
                FetchDescriptor<CachedNote>(
                    predicate: #Predicate { chunk.contains($0.noteId) && $0.serverProfileId == profileId }
                )
            )
            for row in rows { byId[row.noteId] = row }
        }
        return byId
    }

    /// Ids per `IN (…)` query, well under SQLite's bound-parameter limit.
    static let idQueryChunkSize = 500

    func cacheNoteBatch(from response: NoteResponse, serverProfileId: String) throws {
        try cacheNote(from: response, serverProfileId: serverProfileId)
    }

    func cacheBranchBatch(from response: BranchResponse, serverProfileId: String) throws {
        try cacheBranchInternal(from: response, serverProfileId: serverProfileId)
    }

    func cacheAttributeBatch(from response: AttributeResponse, serverProfileId: String) throws {
        let attrId = response.attributeId
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedAttribute>(
            predicate: #Predicate { $0.attributeId == attrId && $0.serverProfileId == profileId }
        )
        descriptor.fetchLimit = 1
        let existing = try context.fetch(descriptor).first

        if let existing {
            existing.noteId = response.noteId
            existing.type = response.type
            existing.name = response.name
            existing.value = response.value
            existing.position = response.position
            existing.isInheritable = response.isInheritable
        } else {
            let cached = CachedAttribute(
                attributeId: response.attributeId,
                noteId: response.noteId,
                type: response.type,
                name: response.name,
                value: response.value,
                position: response.position,
                isInheritable: response.isInheritable,
                serverProfileId: serverProfileId
            )
            context.insert(cached)
        }
    }

    func commitBatch() throws {
        try context.save()
    }

    /// A batch's existing branch and attribute rows, keyed by id (one query per 500 ids of each kind).
    func fetchCachedBranches(ids: some Collection<String>, serverProfileId: String) throws -> [String: CachedBranch] {
        let profileId = serverProfileId
        var byId: [String: CachedBranch] = [:]
        for chunk in Array(ids).chunked(into: Self.idQueryChunkSize) {
            let rows = try context.fetch(
                FetchDescriptor<CachedBranch>(
                    predicate: #Predicate { chunk.contains($0.branchId) && $0.serverProfileId == profileId }
                )
            )
            for row in rows { byId[row.branchId] = row }
        }
        return byId
    }

    func fetchCachedAttributes(ids: some Collection<String>, serverProfileId: String) throws -> [String: CachedAttribute] {
        let profileId = serverProfileId
        var byId: [String: CachedAttribute] = [:]
        for chunk in Array(ids).chunked(into: Self.idQueryChunkSize) {
            let rows = try context.fetch(
                FetchDescriptor<CachedAttribute>(
                    predicate: #Predicate { chunk.contains($0.attributeId) && $0.serverProfileId == profileId }
                )
            )
            for row in rows { byId[row.attributeId] = row }
        }
        return byId
    }

    /// Inserts or updates a note row from a full-sync response, assigning only fields that differ so an unchanged
    /// note isn't rewritten. Returns whether anything was written. The caller saves.
    @discardableResult
    func upsertNoteForFullSync(_ response: NoteResponse, existing: CachedNote?, serverProfileId: String) -> Bool {
        guard let existing else {
            context.insert(
                CachedNote(
                    noteId: response.noteId,
                    title: response.title,
                    noteType: response.type,
                    mime: response.mime,
                    isProtected: response.isProtected,
                    parentNoteIds: response.parentNoteIds,
                    childNoteIds: response.childNoteIds,
                    parentBranchIds: response.parentBranchIds,
                    childBranchIds: response.childBranchIds,
                    utcDateModified: nil,
                    serverProfileId: serverProfileId,
                    blobId: response.blobId
                )
            )
            return true
        }
        var changed = false
        func set<T: Equatable>(_ keyPath: ReferenceWritableKeyPath<CachedNote, T>, _ value: T) {
            if existing[keyPath: keyPath] != value {
                existing[keyPath: keyPath] = value
                changed = true
            }
        }
        set(\.title, response.title)
        set(\.noteType, response.type)
        set(\.mime, response.mime)
        set(\.isProtected, response.isProtected)
        set(\.parentNoteIds, response.parentNoteIds)
        set(\.childNoteIds, response.childNoteIds)
        set(\.parentBranchIds, response.parentBranchIds)
        set(\.childBranchIds, response.childBranchIds)
        if let blobId = response.blobId { set(\.blobId, Optional(blobId)) }
        if changed { existing.metadataFetchedAt = .now }
        return changed
    }

    /// Branch counterpart of `upsertNoteForFullSync`.
    @discardableResult
    func upsertBranchForFullSync(_ response: BranchResponse, existing: CachedBranch?, serverProfileId: String) -> Bool {
        guard let existing else {
            context.insert(
                CachedBranch(
                    branchId: response.branchId,
                    noteId: response.noteId,
                    parentNoteId: response.parentNoteId,
                    prefix: response.prefix,
                    notePosition: response.notePosition,
                    isExpanded: response.isExpanded,
                    serverProfileId: serverProfileId
                )
            )
            return true
        }
        var changed = false
        func set<T: Equatable>(_ keyPath: ReferenceWritableKeyPath<CachedBranch, T>, _ value: T) {
            if existing[keyPath: keyPath] != value {
                existing[keyPath: keyPath] = value
                changed = true
            }
        }
        set(\.noteId, response.noteId)
        set(\.parentNoteId, response.parentNoteId)
        set(\.prefix, response.prefix)
        set(\.notePosition, response.notePosition)
        set(\.isExpanded, response.isExpanded)
        if changed { existing.fetchedAt = .now }
        return changed
    }

    /// Attribute counterpart of `upsertNoteForFullSync`.
    @discardableResult
    func upsertAttributeForFullSync(_ response: AttributeResponse, existing: CachedAttribute?, serverProfileId: String) -> Bool {
        guard let existing else {
            context.insert(
                CachedAttribute(
                    attributeId: response.attributeId,
                    noteId: response.noteId,
                    type: response.type,
                    name: response.name,
                    value: response.value,
                    position: response.position,
                    isInheritable: response.isInheritable,
                    serverProfileId: serverProfileId
                )
            )
            return true
        }
        var changed = false
        func set<T: Equatable>(_ keyPath: ReferenceWritableKeyPath<CachedAttribute, T>, _ value: T) {
            if existing[keyPath: keyPath] != value {
                existing[keyPath: keyPath] = value
                changed = true
            }
        }
        set(\.noteId, response.noteId)
        set(\.type, response.type)
        set(\.name, response.name)
        set(\.value, response.value)
        set(\.position, response.position)
        set(\.isInheritable, response.isInheritable)
        return changed
    }

    func fetchCachedBranch(branchId: String, serverProfileId: String) throws -> CachedBranch? {
        try fetchCachedBranchById(branchId: branchId, serverProfileId: serverProfileId)
    }

    private func fetchCachedBranchById(branchId: String, serverProfileId: String) throws -> CachedBranch? {
        let bid = branchId
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.branchId == bid && $0.serverProfileId == profileId }
        )
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    /// Upserts a branch row without saving.
    func cacheBranchInternal(from response: BranchResponse, serverProfileId: String) throws {
        let branchId = response.branchId
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.branchId == branchId && $0.serverProfileId == profileId }
        )
        descriptor.fetchLimit = 1
        let existing = try context.fetch(descriptor).first

        if let existing {
            existing.noteId = response.noteId
            existing.parentNoteId = response.parentNoteId
            existing.prefix = response.prefix
            existing.notePosition = response.notePosition
            existing.isExpanded = response.isExpanded
            existing.fetchedAt = .now
        } else {
            let cached = CachedBranch(
                branchId: response.branchId,
                noteId: response.noteId,
                parentNoteId: response.parentNoteId,
                prefix: response.prefix,
                notePosition: response.notePosition,
                isExpanded: response.isExpanded,
                serverProfileId: serverProfileId
            )
            context.insert(cached)
        }
    }

    func fetchCachedChildren(parentNoteId: String, serverProfileId: String) throws -> [(CachedBranch, CachedNote)] {
        let parentId = parentNoteId
        let profileId = serverProfileId
        let branches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.parentNoteId == parentId && $0.serverProfileId == profileId },
                sortBy: [SortDescriptor(\.notePosition), SortDescriptor(\.branchId)]
            )
        )
        let notes = try fetchCachedNotes(ids: branches.map(\.noteId), serverProfileId: profileId)
        return branches.compactMap { branch in
            notes[branch.noteId].map { (branch, $0) }
        }
    }

    func updateSyncStatus(domain: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(domain)"
        var descriptor = FetchDescriptor<SyncStatus>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.lastSyncedAt = .now
            existing.lastError = nil
        } else {
            let status = SyncStatus(domain: domain, serverProfileId: serverProfileId)
            context.insert(status)
        }
        try context.save()
    }

    func recordSyncError(domain: String, error: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(domain)"
        var descriptor = FetchDescriptor<SyncStatus>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.lastError = error
        } else {
            let status = SyncStatus(domain: domain, serverProfileId: serverProfileId)
            status.lastError = error
            context.insert(status)
        }
        try context.save()
    }

    func getEntityPullCursor(serverProfileId: String) throws -> Int64 {
        let pid = serverProfileId
        var descriptor = FetchDescriptor<EntityPullCursor>(
            predicate: #Predicate { $0.serverProfileId == pid }
        )
        descriptor.fetchLimit = 1
        if let row = try context.fetch(descriptor).first {
            return row.lastEntityChangeId
        }
        let row = EntityPullCursor(serverProfileId: serverProfileId, lastEntityChangeId: 0)
        context.insert(row)
        try context.save()
        return 0
    }

    func setEntityPullCursor(serverProfileId: String, lastEntityChangeId: Int64) throws {
        let pid = serverProfileId
        var descriptor = FetchDescriptor<EntityPullCursor>(
            predicate: #Predicate { $0.serverProfileId == pid }
        )
        descriptor.fetchLimit = 1
        if let row = try context.fetch(descriptor).first {
            row.lastEntityChangeId = lastEntityChangeId
        } else {
            context.insert(EntityPullCursor(serverProfileId: serverProfileId, lastEntityChangeId: lastEntityChangeId))
        }
        try context.save()
    }

    func deleteCachedBranch(branchId: String, serverProfileId: String) throws {
        let bid = branchId
        let pid = serverProfileId
        let rows = try context.fetch(FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.branchId == bid && $0.serverProfileId == pid }
        ))
        rows.forEach { context.delete($0) }
        try context.save()
    }

    func deleteCachedAttribute(attributeId: String, serverProfileId: String) throws {
        let aid = attributeId
        let pid = serverProfileId
        let rows = try context.fetch(FetchDescriptor<CachedAttribute>(
            predicate: #Predicate { $0.attributeId == aid && $0.serverProfileId == pid }
        ))
        rows.forEach { context.delete($0) }
        try context.save()
    }

    func fetchAllCachedNoteIds(serverProfileId: String) throws -> [String] {
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedNote>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        )
        // Only the id column: the rest (tree lists, small inline bodies) stays unread.
        descriptor.propertiesToFetch = [\.noteId]
        return try context.fetch(descriptor).map(\.noteId)
    }

    // MARK: - Offline search

    /// What the offline search index needs to know about a cached body, without loading it.
    struct CachedBodyStamp: Sendable {
        let noteId: String
        let noteType: String
        let isProtected: Bool
        /// When the body was stored; every body write (`storeBody`) sets it, so it changes whenever the body does.
        let contentFetchedAt: Date
    }

    /// Every cached note with a body, as stamps.
    func fetchCachedBodyStamps(serverProfileId: String) throws -> [CachedBodyStamp] {
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedNote>(
            predicate: #Predicate { $0.serverProfileId == profileId && $0.contentFetchedAt != nil }
        )
        descriptor.propertiesToFetch = [\.noteId, \.noteType, \.isProtected, \.contentFetchedAt]
        return try context.fetch(descriptor).compactMap { row in
            guard let fetchedAt = row.contentFetchedAt else { return nil }
            return CachedBodyStamp(
                noteId: row.noteId,
                noteType: row.noteType,
                isProtected: row.isProtected,
                contentFetchedAt: fetchedAt
            )
        }
    }

    /// Ids of every cached note whose title contains `text` (case- and diacritic-insensitive, as
    /// `PersistenceManager.fetchCachedNotes(titleContaining:)` matches).
    func fetchCachedNoteIds(titleContaining text: String, serverProfileId: String) throws -> Set<String> {
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedNote>(
            predicate: #Predicate { $0.serverProfileId == profileId && $0.title.localizedStandardContains(text) }
        )
        descriptor.propertiesToFetch = [\.noteId]
        return Set(try context.fetch(descriptor).map(\.noteId))
    }

    /// Ids of notes that have the label `name` themselves (not inherited), with `value` when given (compared
    /// ignoring case).
    func fetchNoteIds(withLabel name: String, value: String?, serverProfileId: String) throws -> Set<String> {
        let profileId = serverProfileId
        let labelName = name
        let labelType = "label"
        let rows = try context.fetch(
            FetchDescriptor<CachedAttribute>(
                predicate: #Predicate {
                    $0.name == labelName && $0.type == labelType && $0.serverProfileId == profileId
                }
            )
        )
        guard let value else { return Set(rows.map(\.noteId)) }
        return Set(rows.filter { $0.value.compare(value, options: [.caseInsensitive, .diacriticInsensitive]) == .orderedSame }.map(\.noteId))
    }

    /// Deletes cached notes (and their branches/attributes) for the profile.
    func deleteCachedNotes(noteIds: [String], serverProfileId: String, clearGhost: Bool = true) throws {
        try deleteCachedNotes(noteIds: Set(noteIds), serverProfileId: serverProfileId, clearGhost: clearGhost)
    }

    func deleteCachedNotes(noteIds: Set<String>, serverProfileId: String, clearGhost: Bool = true) throws {
        let profileId = serverProfileId
        var closedTabs = false
        defer {
            // The tab strip reads its rows once; tell it they changed (a note deleted here, by sync or on another device).
            if closedTabs { Self.postOnMainThread(.openNoteTabsChanged) }
        }
        for noteId in noteIds {
            if try purgeNoteFromAuxiliaryStores(noteId: noteId, serverProfileId: profileId, clearGhost: clearGhost) {
                closedTabs = true
            }

            let nid = noteId
            let pid = profileId

            let notes = try context.fetch(FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == pid }
            ))
            notes.forEach { context.delete($0) }

            let branches = try context.fetch(FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == pid }
            ))
            branches.forEach { context.delete($0) }

            let attrs = try context.fetch(FetchDescriptor<CachedAttribute>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == pid }
            ))
            attrs.forEach { context.delete($0) }
        }
        try context.save()
    }

    func pendingDeletionNoteIds(serverProfileId: String) throws -> Set<String> {
        Set(try fetchPendingNoteDeletions(serverProfileId: serverProfileId).map(\.noteId))
    }

    /// Removes recents, favorites, tabs, drafts, images, and optionally ghost IDs for a note (no save).
    /// Returns whether any open tab was removed.
    @discardableResult
    func purgeNoteFromAuxiliaryStores(noteId: String, serverProfileId: String, clearGhost: Bool = true) throws -> Bool {
        let compositeId = "\(serverProfileId):\(noteId)"
        let profileId = serverProfileId
        let nid = noteId

        var recentDesc = FetchDescriptor<RecentNote>(predicate: #Predicate { $0.id == compositeId })
        recentDesc.fetchLimit = 1
        if let recent = try context.fetch(recentDesc).first {
            context.delete(recent)
        }

        var favDesc = FetchDescriptor<FavoriteNote>(predicate: #Predicate { $0.id == compositeId })
        favDesc.fetchLimit = 1
        if let fav = try context.fetch(favDesc).first {
            context.delete(fav)
        }

        let tabs = try context.fetch(
            FetchDescriptor<OpenNoteTab>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId }
            )
        )
        tabs.forEach { context.delete($0) }
        let closedTabs = !tabs.isEmpty

        var draftDesc = FetchDescriptor<DraftContent>(predicate: #Predicate { $0.id == compositeId })
        draftDesc.fetchLimit = 1
        if let draft = try context.fetch(draftDesc).first {
            context.delete(draft)
        }

        let images = try context.fetch(
            FetchDescriptor<CachedImageData>(
                predicate: #Predicate { $0.entityId == nid && $0.serverProfileId == profileId }
            )
        )
        images.forEach { context.delete($0) }

        if clearGhost {
            GhostNoteTracker.shared.remove(noteId, serverProfileId: serverProfileId)
        }
        return closedTabs
    }

    /// Removes cached branches under `parentNoteId` absent from the live API tree, then deletes
    /// note rows that no longer have any branch placements (unless listed in `hiddenNoteIds`).
    @discardableResult
    func pruneStaleBranchesUnderParent(
        parentNoteId: String,
        liveBranchIds: Set<String>,
        serverProfileId: String,
        hiddenNoteIds: Set<String>
    ) throws -> Int {
        let parentId = parentNoteId
        let profileId = serverProfileId
        let cachedPairs = try fetchCachedChildren(parentNoteId: parentId, serverProfileId: profileId)
        var pruned = 0
        var noteIdsToCheck: Set<String> = []

        for (branch, _) in cachedPairs where !liveBranchIds.contains(branch.branchId) {
            let branchId = branch.branchId
            let rows = try context.fetch(
                FetchDescriptor<CachedBranch>(
                    predicate: #Predicate { $0.branchId == branchId && $0.serverProfileId == profileId }
                )
            )
            rows.forEach { context.delete($0) }
            pruned += 1
            noteIdsToCheck.insert(branch.noteId)
        }

        var notesDeleted = 0
        for noteId in noteIdsToCheck where !hiddenNoteIds.contains(noteId) {
            let nid = noteId
            let remaining = try context.fetch(
                FetchDescriptor<CachedBranch>(
                    predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId }
                )
            )
            if remaining.isEmpty {
                try deleteCachedNotes(noteIds: [noteId], serverProfileId: profileId)
                notesDeleted += 1
            }
        }

        if pruned > 0 {
            try reconcileCachedNoteBranchesMetadata(forNoteId: parentNoteId, serverProfileId: profileId)
        } else if notesDeleted > 0 {
            try reconcileCachedNoteBranchesMetadata(forNoteId: parentNoteId, serverProfileId: profileId)
        }

        if pruned > 0 || notesDeleted > 0 {
            try context.save()
        }
        return pruned + notesDeleted
    }

    /// Applies a server `note_reordering` change: new positions for the children of `parentNoteId`, then
    /// re-derives the parent's ordered child id lists. Branches not cached locally are skipped.
    func applyChildBranchPositions(
        _ positions: [String: Int],
        parentNoteId: String,
        serverProfileId: String
    ) throws {
        let pid = parentNoteId
        let profileId = serverProfileId
        let childBranches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.parentNoteId == pid && $0.serverProfileId == profileId }
            )
        )
        var changed = false
        for branch in childBranches {
            guard let position = positions[branch.branchId], branch.notePosition != position else { continue }
            branch.notePosition = position
            changed = true
        }
        guard changed else { return }
        try reconcileCachedNoteBranchesMetadata(forNoteId: parentNoteId, serverProfileId: serverProfileId)
    }

    /// Removes one branch placement, refreshes the parent's tree id lists, and deletes the note row when it has no branches left.
    func deleteCachedBranchAndReconcilePlacement(
        branchId: String,
        noteId: String,
        parentNoteId: String,
        serverProfileId: String,
        hiddenNoteIds: Set<String>
    ) throws {
        try deleteCachedBranch(branchId: branchId, serverProfileId: serverProfileId)
        try reconcileCachedNoteBranchesMetadata(forNoteId: parentNoteId, serverProfileId: serverProfileId)
        let nid = noteId
        let pid = serverProfileId
        let remaining = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == pid }
            )
        )
        if remaining.isEmpty, !hiddenNoteIds.contains(noteId) {
            try deleteCachedNotes(noteIds: [noteId], serverProfileId: serverProfileId)
        } else {
            try context.save()
        }
    }

    /// Rebuilds one note's parent/child id lists from `CachedBranch` rows (cheap targeted reconcile).
    func reconcileCachedNoteBranchesMetadata(forNoteId noteId: String, serverProfileId: String) throws {
        guard let note = try fetchCachedNote(id: noteId, serverProfileId: serverProfileId) else { return }
        let profileId = serverProfileId
        let nid = noteId

        let childBranches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.parentNoteId == nid && $0.serverProfileId == profileId },
                sortBy: [SortDescriptor(\.notePosition), SortDescriptor(\.branchId)]
            )
        )
        let parentBranches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId },
                sortBy: [SortDescriptor(\.branchId)]
            )
        )
        Self.assignTreeLists(
            to: note,
            childBranchIds: childBranches.map(\.branchId),
            childNoteIds: childBranches.map(\.noteId),
            parentBranchIds: parentBranches.map(\.branchId),
            parentNoteIds: parentBranches.map(\.parentNoteId)
        )
    }

    /// Sets a note's four tree lists, touching only the ones that differ (an assignment dirties the row even when
    /// equal). Returns whether any changed.
    @discardableResult
    static func assignTreeLists(
        to note: CachedNote,
        childBranchIds: [String],
        childNoteIds: [String],
        parentBranchIds: [String],
        parentNoteIds: [String]
    ) -> Bool {
        var changed = false
        if note.childBranchIds != childBranchIds { note.childBranchIds = childBranchIds; changed = true }
        if note.childNoteIds != childNoteIds { note.childNoteIds = childNoteIds; changed = true }
        if note.parentBranchIds != parentBranchIds { note.parentBranchIds = parentBranchIds; changed = true }
        if note.parentNoteIds != parentNoteIds { note.parentNoteIds = parentNoteIds; changed = true }
        return changed
    }

    /// Returns note IDs from `serverModifiedAfter` that need their content downloaded (see `bodyNeedsDownload`).
    /// Only notes already cached count: a body can't be stored without its row.
    func fetchNotesNeedingContent(serverProfileId: String, serverModifiedAfter: [String: String]) throws -> [String] {
        try notesNeedingContent(serverProfileId: serverProfileId, candidates: serverModifiedAfter, isProtected: false)
    }

    /// Same staleness rules as `fetchNotesNeedingContent`, for **protected** notes (after a protected session exists on the server).
    func fetchProtectedNotesNeedingContent(serverProfileId: String, serverModifiedAfter: [String: String]) throws -> [String] {
        try notesNeedingContent(serverProfileId: serverProfileId, candidates: serverModifiedAfter, isProtected: true)
    }

    private func notesNeedingContent(serverProfileId: String, candidates: [String: String], isProtected: Bool) throws -> [String] {
        let cached = try fetchCachedNotes(ids: candidates.keys, serverProfileId: serverProfileId)
        var needing: [String] = []
        for (noteId, serverDate) in candidates {
            guard let note = cached[noteId], note.isProtected == isProtected else { continue }
            if Self.bodyNeedsDownload(note, serverUtcDateModified: serverDate) {
                needing.append(noteId)
            }
        }
        if context.hasChanges { try context.save() }
        return needing
    }

    /// A body is stale when it was never downloaded or its blob id differs from the note's current one.
    /// Bodies cached before blob ids were tracked compare `utcDateModified` once; when that shows them current they
    /// adopt the note's blob id, so later syncs compare ids (the caller saves).
    /// Reads `contentFetchedAt`, not `content`, so SwiftData doesn't fault every `.externalStorage` blob during sync.
    static func bodyNeedsDownload(_ note: CachedNote, serverUtcDateModified serverDate: String) -> Bool {
        if note.contentFetchedAt == nil { return true }
        if let blobId = note.blobId, let contentBlobId = note.contentBlobId {
            return blobId != contentBlobId
        }
        guard let cachedDate = note.utcDateModified else { return true }
        if serverDate > cachedDate { return true }
        if let blobId = note.blobId {
            note.contentBlobId = blobId
        }
        return false
    }

    /// `noteId` → server `utcDateModified` (empty string ok) for notes that still have no cached body blob.
    func serverModifiedMapForUnprotectedNotesMissingContent(serverProfileId: String) throws -> [String: String] {
        let profileId = serverProfileId
        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate {
                    $0.serverProfileId == profileId && $0.isProtected == false && $0.contentFetchedAt == nil
                }
            )
        )
        return Dictionary(uniqueKeysWithValues: notes.map { ($0.noteId, "") })
    }

    /// Protected notes with no body cached yet (requires an active server protected session to download).
    func serverModifiedMapForProtectedNotesMissingContent(serverProfileId: String) throws -> [String: String] {
        let profileId = serverProfileId
        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate {
                    $0.serverProfileId == profileId && $0.isProtected == true && $0.contentFetchedAt == nil
                }
            )
        )
        return Dictionary(uniqueKeysWithValues: notes.map { ($0.noteId, "") })
    }

    /// Rebuilds each `CachedNote`’s parent/child id lists from `CachedBranch` rows (fixes incremental sync rows that omit tree fields).
    /// Only notes whose lists differ are written. Returns how many notes changed.
    @discardableResult
    func reconcileCachedNoteBranchesMetadata(serverProfileId: String) throws -> Int {
        let profileId = serverProfileId
        let branches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )

        var byParent: [String: [(branchId: String, noteId: String, pos: Int)]] = [:]
        var byChild: [String: [(parentNoteId: String, branchId: String)]] = [:]

        for b in branches {
            byParent[b.parentNoteId, default: []].append((branchId: b.branchId, noteId: b.noteId, pos: b.notePosition))
            byChild[b.noteId, default: []].append((parentNoteId: b.parentNoteId, branchId: b.branchId))
        }

        for key in byParent.keys {
            byParent[key]?.sort { $0.pos != $1.pos ? $0.pos < $1.pos : $0.branchId < $1.branchId }
        }

        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )

        var changedNotes = 0
        for n in notes {
            let outs = byParent[n.noteId] ?? []
            let ins = (byChild[n.noteId] ?? []).sorted { $0.branchId < $1.branchId }
            if Self.assignTreeLists(
                to: n,
                childBranchIds: outs.map(\.branchId),
                childNoteIds: outs.map(\.noteId),
                parentBranchIds: ins.map(\.branchId),
                parentNoteIds: ins.map(\.parentNoteId)
            ) {
                changedNotes += 1
            }
        }

        if context.hasChanges { try context.save() }
        return changedNotes
    }

    func fetchPendingNoteDeletions(serverProfileId: String) throws -> [PendingNoteDeletion] {
        let pid = serverProfileId
        return try context.fetch(
            FetchDescriptor<PendingNoteDeletion>(
                predicate: #Predicate { $0.serverProfileId == pid },
                sortBy: [SortDescriptor(\.queuedAt, order: .forward)]
            )
        )
    }

    /// Drops the downloaded bodies of image and file notes (they load again when opened, or on the next sync once media
    /// caching is back on). Returns how many it dropped.
    @discardableResult
    func clearCachedMediaBodies(serverProfileId: String) throws -> Int {
        let profileId = serverProfileId
        let image = NoteType.image.rawValue
        let file = NoteType.file.rawValue
        let rows = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate {
                    $0.serverProfileId == profileId && $0.contentFetchedAt != nil
                        && ($0.noteType == image || $0.noteType == file)
                }
            )
        )
        for row in rows {
            row.content = nil
            row.contentByteCount = nil
            row.contentFetchedAt = nil
            row.contentBlobId = nil
            row.contentSkippedBlobId = nil
        }
        if context.hasChanges { try context.save() }
        return rows.count
    }
}
