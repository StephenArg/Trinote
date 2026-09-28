import Foundation
import SwiftData

@MainActor
final class PersistenceManager {
    private static var _shared: PersistenceManager?
    /// Use after `initializeShared()` has completed. Accessing before init causes a fatalError.
    static var shared: PersistenceManager {
        guard let s = _shared else {
            fatalError("PersistenceManager not initialized. Ensure TrinoteApp has completed startup.")
        }
        return s
    }

    /// `shared` is ready (app startup has created the store).
    static var isInitialized: Bool { _shared != nil }

    let container: ModelContainer
    private let isMemoryOnly: Bool

    /// Creates the ModelContainer on a background thread to avoid blocking the main thread
    /// (which causes UI freezes on physical devices with slower storage).
    static func initializeShared() async throws {
        let (container, isMemoryOnly) = try await Task.detached(priority: .userInitiated) {
            let schema = Schema([
                ServerProfile.self,
                CachedNote.self,
                CachedBranch.self,
                CachedAttribute.self,
                RecentNote.self,
                OpenNoteTab.self,
                FavoriteNote.self,
                RecentSearch.self,
                DraftContent.self,
                PendingNoteCreation.self,
                PendingNoteBodyUpload.self,
                PendingNotePatch.self,
                PendingNoteDeletion.self,
                PendingBranchMove.self,
                PendingAttachmentImport.self,
                SyncStatus.self,
                CachedImageData.self,
                EntityPullCursor.self,
                CacheExcludedRootNote.self,
            ])

            let config = ModelConfiguration(
                "Trinote",
                schema: schema,
                isStoredInMemoryOnly: false,
                allowsSave: true
            )

            do {
                let container = try ModelContainer(for: schema, configurations: [config])
                return (container, false)
            } catch {
                Log.persistence.error("Persistent store failed, using in-memory fallback: \(error)")
                let memConfig = ModelConfiguration(
                    "TrinoteFallback",
                    schema: schema,
                    isStoredInMemoryOnly: true,
                    allowsSave: true
                )
                let container = try ModelContainer(for: schema, configurations: [memConfig])
                return (container, true)
            }
        }.value

        _shared = PersistenceManager(container: container, isMemoryOnly: isMemoryOnly)
    }

    private init(container: ModelContainer, isMemoryOnly: Bool = true) {
        self.container = container
        self.isMemoryOnly = isMemoryOnly
        observeSaves()
    }

    /// For testing: create with a specific container
    init(container: ModelContainer) {
        self.container = container
        self.isMemoryOnly = true
        observeSaves()
    }

    /// Answers derived from cached rows (icons walked up the tree), dropped whenever the store changes.
    private var effectiveIconClassMemo: [IconMemoKey: String?] = [:]
    private var saveObserver: NSObjectProtocol?

    private func observeSaves() {
        saveObserver = NotificationCenter.default.addObserver(
            forName: ModelContext.didSave,
            object: container.mainContext,
            queue: nil
        ) { [weak self] _ in
            // Posted during `save()` on the saving thread, which for the main context is the main thread; clear right
            // away so a read just after the save doesn't get the old answer.
            if Thread.isMainThread {
                MainActor.assumeIsolated { self?.invalidateDerivedCaches() }
            } else {
                Task { @MainActor in self?.invalidateDerivedCaches() }
            }
        }
    }

    /// Drops answers derived from cached rows. Runs after every save of the main context; call it after changing the
    /// store any other way.
    func invalidateDerivedCaches() {
        effectiveIconClassMemo.removeAll(keepingCapacity: true)
    }

    var context: ModelContext { container.mainContext }

    // MARK: - Sync-shared cache operations (on the main context)

    /// The cache operations sync shares with `SyncStore`, which runs them on a background context. These forward to
    /// them on the main context, for everything else in the app.
    var cache: CacheStore { CacheStore(context: context) }
    static let idQueryChunkSize = CacheStore.idQueryChunkSize

    func fetchCachedNote(id: String, serverProfileId: String) throws -> CachedNote? {
        try cache.fetchCachedNote(id: id, serverProfileId: serverProfileId)
    }

    func fetchCachedNotes(ids: some Collection<String>, serverProfileId: String) throws -> [String: CachedNote] {
        try cache.fetchCachedNotes(ids: ids, serverProfileId: serverProfileId)
    }

    func fetchCachedBranches(ids: some Collection<String>, serverProfileId: String) throws -> [String: CachedBranch] {
        try cache.fetchCachedBranches(ids: ids, serverProfileId: serverProfileId)
    }

    func fetchCachedAttributes(ids: some Collection<String>, serverProfileId: String) throws -> [String: CachedAttribute] {
        try cache.fetchCachedAttributes(ids: ids, serverProfileId: serverProfileId)
    }

    func fetchCachedBranch(branchId: String, serverProfileId: String) throws -> CachedBranch? {
        try cache.fetchCachedBranch(branchId: branchId, serverProfileId: serverProfileId)
    }

    func fetchCachedChildren(parentNoteId: String, serverProfileId: String) throws -> [(CachedBranch, CachedNote)] {
        try cache.fetchCachedChildren(parentNoteId: parentNoteId, serverProfileId: serverProfileId)
    }

    func fetchAllCachedNoteIds(serverProfileId: String) throws -> [String] {
        try cache.fetchAllCachedNoteIds(serverProfileId: serverProfileId)
    }

    func cacheNote(from response: NoteResponse, serverProfileId: String) throws {
        try cache.cacheNote(from: response, serverProfileId: serverProfileId)
    }

    func cacheNoteBatch(from response: NoteResponse, serverProfileId: String) throws {
        try cache.cacheNoteBatch(from: response, serverProfileId: serverProfileId)
    }

    func cacheBranchBatch(from response: BranchResponse, serverProfileId: String) throws {
        try cache.cacheBranchBatch(from: response, serverProfileId: serverProfileId)
    }

    func cacheAttributeBatch(from response: AttributeResponse, serverProfileId: String) throws {
        try cache.cacheAttributeBatch(from: response, serverProfileId: serverProfileId)
    }

    func cacheNoteContent(
        _ noteId: String,
        content: Data,
        serverProfileId: String,
        utcDateModified: String? = nil,
        contentBlobId: String? = nil
    ) throws {
        try cache.cacheNoteContent(
            noteId,
            content: content,
            serverProfileId: serverProfileId,
            utcDateModified: utcDateModified,
            contentBlobId: contentBlobId
        )
    }

    func commitBatch() throws {
        try cache.commitBatch()
    }

    @discardableResult
    func upsertNoteForFullSync(_ response: NoteResponse, existing: CachedNote?, serverProfileId: String) -> Bool {
        cache.upsertNoteForFullSync(response, existing: existing, serverProfileId: serverProfileId)
    }

    @discardableResult
    func upsertBranchForFullSync(_ response: BranchResponse, existing: CachedBranch?, serverProfileId: String) -> Bool {
        cache.upsertBranchForFullSync(response, existing: existing, serverProfileId: serverProfileId)
    }

    @discardableResult
    func upsertAttributeForFullSync(_ response: AttributeResponse, existing: CachedAttribute?, serverProfileId: String) -> Bool {
        cache.upsertAttributeForFullSync(response, existing: existing, serverProfileId: serverProfileId)
    }

    func updateSyncStatus(domain: String, serverProfileId: String) throws {
        try cache.updateSyncStatus(domain: domain, serverProfileId: serverProfileId)
    }

    func recordSyncError(domain: String, error: String, serverProfileId: String) throws {
        try cache.recordSyncError(domain: domain, error: error, serverProfileId: serverProfileId)
    }

    func getEntityPullCursor(serverProfileId: String) throws -> Int64 {
        try cache.getEntityPullCursor(serverProfileId: serverProfileId)
    }

    func setEntityPullCursor(serverProfileId: String, lastEntityChangeId: Int64) throws {
        try cache.setEntityPullCursor(serverProfileId: serverProfileId, lastEntityChangeId: lastEntityChangeId)
    }

    func deleteCachedBranch(branchId: String, serverProfileId: String) throws {
        try cache.deleteCachedBranch(branchId: branchId, serverProfileId: serverProfileId)
    }

    func deleteCachedAttribute(attributeId: String, serverProfileId: String) throws {
        try cache.deleteCachedAttribute(attributeId: attributeId, serverProfileId: serverProfileId)
    }

    func deleteCachedNotes(noteIds: [String], serverProfileId: String, clearGhost: Bool = true) throws {
        try cache.deleteCachedNotes(noteIds: noteIds, serverProfileId: serverProfileId, clearGhost: clearGhost)
    }

    func deleteCachedNotes(noteIds: Set<String>, serverProfileId: String, clearGhost: Bool = true) throws {
        try cache.deleteCachedNotes(noteIds: noteIds, serverProfileId: serverProfileId, clearGhost: clearGhost)
    }

    @discardableResult
    func purgeNoteFromAuxiliaryStores(noteId: String, serverProfileId: String, clearGhost: Bool = true) throws -> Bool {
        try cache.purgeNoteFromAuxiliaryStores(noteId: noteId, serverProfileId: serverProfileId, clearGhost: clearGhost)
    }

    func pendingDeletionNoteIds(serverProfileId: String) throws -> Set<String> {
        try cache.pendingDeletionNoteIds(serverProfileId: serverProfileId)
    }

    func fetchPendingNoteDeletions(serverProfileId: String) throws -> [PendingNoteDeletion] {
        try cache.fetchPendingNoteDeletions(serverProfileId: serverProfileId)
    }

    @discardableResult
    func pruneStaleBranchesUnderParent(
        parentNoteId: String,
        liveBranchIds: Set<String>,
        serverProfileId: String,
        hiddenNoteIds: Set<String>
    ) throws -> Int {
        try cache.pruneStaleBranchesUnderParent(
            parentNoteId: parentNoteId,
            liveBranchIds: liveBranchIds,
            serverProfileId: serverProfileId,
            hiddenNoteIds: hiddenNoteIds
        )
    }

    func applyChildBranchPositions(_ positions: [String: Int], parentNoteId: String, serverProfileId: String) throws {
        try cache.applyChildBranchPositions(positions, parentNoteId: parentNoteId, serverProfileId: serverProfileId)
    }

    func deleteCachedBranchAndReconcilePlacement(
        branchId: String,
        noteId: String,
        parentNoteId: String,
        serverProfileId: String,
        hiddenNoteIds: Set<String>
    ) throws {
        try cache.deleteCachedBranchAndReconcilePlacement(
            branchId: branchId,
            noteId: noteId,
            parentNoteId: parentNoteId,
            serverProfileId: serverProfileId,
            hiddenNoteIds: hiddenNoteIds
        )
    }

    func reconcileCachedNoteBranchesMetadata(forNoteId noteId: String, serverProfileId: String) throws {
        try cache.reconcileCachedNoteBranchesMetadata(forNoteId: noteId, serverProfileId: serverProfileId)
    }

    @discardableResult
    func reconcileCachedNoteBranchesMetadata(serverProfileId: String) throws -> Int {
        try cache.reconcileCachedNoteBranchesMetadata(serverProfileId: serverProfileId)
    }

    func fetchNotesNeedingContent(serverProfileId: String, serverModifiedAfter: [String: String]) throws -> [String] {
        try cache.fetchNotesNeedingContent(serverProfileId: serverProfileId, serverModifiedAfter: serverModifiedAfter)
    }

    func fetchProtectedNotesNeedingContent(serverProfileId: String, serverModifiedAfter: [String: String]) throws -> [String] {
        try cache.fetchProtectedNotesNeedingContent(serverProfileId: serverProfileId, serverModifiedAfter: serverModifiedAfter)
    }

    func serverModifiedMapForUnprotectedNotesMissingContent(serverProfileId: String) throws -> [String: String] {
        try cache.serverModifiedMapForUnprotectedNotesMissingContent(serverProfileId: serverProfileId)
    }

    func serverModifiedMapForProtectedNotesMissingContent(serverProfileId: String) throws -> [String: String] {
        try cache.serverModifiedMapForProtectedNotesMissingContent(serverProfileId: serverProfileId)
    }

    @discardableResult
    func clearCachedMediaBodies(serverProfileId: String) throws -> Int {
        try cache.clearCachedMediaBodies(serverProfileId: serverProfileId)
    }
    var isUsingMemoryFallback: Bool { isMemoryOnly }

    // MARK: - Server Profiles

    func fetchServerProfiles() throws -> [ServerProfile] {
        let descriptor = FetchDescriptor<ServerProfile>(sortBy: [SortDescriptor(\.dateAdded)])
        return try context.fetch(descriptor)
    }

    /// True when more than one Trilium instance is signed in on this device.
    func hasMultipleServerProfiles() -> Bool {
        ((try? fetchServerProfiles())?.count ?? 0) > 1
    }

    /// Signed-in instances other than `activeId` (the current session).
    func otherServerProfiles(excluding activeId: String?) -> [ServerProfile] {
        let all = (try? fetchServerProfiles()) ?? []
        guard let activeId, !activeId.isEmpty else { return all }
        return all.filter { $0.id != activeId }
    }

    func activeProfile() throws -> ServerProfile? {
        var descriptor = FetchDescriptor<ServerProfile>(predicate: #Predicate { $0.isActive })
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    /// Maximum number of distinct server profiles (signed-in instances) allowed on device.
    static let maxServerProfiles = 7

    func saveProfile(_ profile: ServerProfile) throws {
        let all = try fetchServerProfiles()
        let isNew = !all.contains(where: { $0.id == profile.id })
        if isNew, all.count >= Self.maxServerProfiles {
            throw PersistenceError.tooManyServerProfiles(max: Self.maxServerProfiles)
        }
        if isNew {
            context.insert(profile)
        }
        try context.save()
    }

    func setActiveProfile(_ profile: ServerProfile) throws {
        let all = try fetchServerProfiles()
        for p in all { p.isActive = false }
        profile.isActive = true
        profile.lastConnected = .now
        try context.save()
    }

    func deleteProfile(_ profile: ServerProfile) throws {
        context.delete(profile)
        try context.save()
    }

    // MARK: - Cached Notes

    /// Up to `limit` cached notes whose title contains `text` (case- and diacritic-insensitive). The store does the
    /// matching and stops at `limit`, so offline search doesn't load every cached note.
    func fetchCachedNotes(titleContaining text: String, serverProfileId: String, limit: Int) throws -> [CachedNote] {
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedNote>(
            predicate: #Predicate { $0.serverProfileId == profileId && $0.title.localizedStandardContains(text) }
        )
        descriptor.fetchLimit = limit
        return try context.fetch(descriptor)
    }

    /// Cached notes whose `utcDateModified` falls on `dayISO` (`yyyy-MM-dd`). UTC-day only — prefer `GET /api/edited-notes/{date}` when online.
    func fetchCachedNotesEditedOnISODay(
        dayISO: String,
        excludingNoteId: String,
        serverProfileId: String,
        limit: Int
    ) throws -> [NoteIdTitle] {
        guard JournalDayEditedNotes.isISODay(dayISO) else { return [] }
        let pid = serverProfileId
        let exclude = excludingNoteId
        // `utcDateModified` starts with the day (`yyyy-MM-dd` then `T` or a space), so an indexed string range
        // narrows the rows to that day before the exact check below.
        let dayStart: String = dayISO
        let dayEnd: String = dayISO + "\u{7F}"
        let onDay = #Predicate<CachedNote> { note in
            note.utcDateModified.flatMap { utc in utc >= dayStart && utc < dayEnd } == true
        }
        let rows = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate<CachedNote> { note in
                    note.serverProfileId == pid && note.noteId != exclude && onDay.evaluate(note)
                }
            )
        )
        let matches = rows.compactMap { cached -> NoteIdTitle? in
            guard let utc = cached.utcDateModified,
                  JournalDayEditedNotes.utcDateModifiedFallsOnDay(utc, dayISO: dayISO)
            else { return nil }
            return NoteIdTitle(noteId: cached.noteId, title: cached.title, isProtected: cached.isProtected)
        }
        .sorted { $0.title.localizedStandardCompare($1.title) == .orderedAscending }
        return JournalDayEditedNotes.displayList(from: matches, excludingNoteId: exclude, limit: limit)
    }

    // MARK: - Batch Cache (no save per-item; caller calls commitBatch)

    // MARK: - Full sync tree walk (one lookup per batch; unchanged rows stay untouched)

    // MARK: - Cached Branches

    func cacheBranch(from response: BranchResponse, serverProfileId: String) throws {
        try cache.cacheBranchInternal(from: response, serverProfileId: serverProfileId)
        try context.save()
    }

    // MARK: - Cached Tree (recursive retrieval)

    /// Attributes of each of `noteIds` in `position` order, keyed by note id (one query per 500 notes).
    func fetchCachedAttributesByNote(noteIds: some Collection<String>, serverProfileId: String) throws -> [String: [CachedAttribute]] {
        let profileId = serverProfileId
        var byNote: [String: [CachedAttribute]] = [:]
        for chunk in Array(noteIds).chunked(into: Self.idQueryChunkSize) {
            let rows = try context.fetch(
                FetchDescriptor<CachedAttribute>(
                    predicate: #Predicate { chunk.contains($0.noteId) && $0.serverProfileId == profileId },
                    sortBy: [SortDescriptor(\.position)]
                )
            )
            for row in rows { byNote[row.noteId, default: []].append(row) }
        }
        return byNote
    }

    /// Child branches of each of `parentNoteIds` in tree order (`notePosition`, then branch id), keyed by parent.
    func fetchCachedChildBranchesByParent(parentNoteIds: some Collection<String>, serverProfileId: String) throws -> [String: [CachedBranch]] {
        let profileId = serverProfileId
        var byParent: [String: [CachedBranch]] = [:]
        for chunk in Array(parentNoteIds).chunked(into: Self.idQueryChunkSize) {
            let rows = try context.fetch(
                FetchDescriptor<CachedBranch>(
                    predicate: #Predicate { chunk.contains($0.parentNoteId) && $0.serverProfileId == profileId },
                    sortBy: [SortDescriptor(\.notePosition), SortDescriptor(\.branchId)]
                )
            )
            for row in rows { byParent[row.parentNoteId, default: []].append(row) }
        }
        return byParent
    }

    /// Branch row linking `noteId` as a child of `parentNoteId` (one clone per parent).
    func fetchCachedBranch(noteId: String, parentNoteId: String, serverProfileId: String) throws -> CachedBranch? {
        let nid = noteId
        let pid = parentNoteId
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.noteId == nid && $0.parentNoteId == pid && $0.serverProfileId == profileId }
        )
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    /// Branches Trilium calls weak: its delete preview skips them, and they don't count as a clone.
    static let weakBranchParentNoteIds: Set<String> = ["_share", "_lbBookmarks"]

    /// A cached branch of `noteId` to name the note in `POST /api/delete-notes`: one the server has (not created
    /// offline) and not weak. `nil` when there is none.
    func cachedBranchIdForDeletion(noteId: String, serverProfileId: String) -> String? {
        let nid = noteId
        let profileId = serverProfileId
        let descriptor = FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId },
            sortBy: [SortDescriptor(\.branchId)]
        )
        let branches = (try? context.fetch(descriptor)) ?? []
        return branches.first { branch in
            !Self.weakBranchParentNoteIds.contains(branch.parentNoteId)
                && !branch.branchId.hasPrefix("olb_")
                && !branch.parentNoteId.isOfflineLocalNoteId
        }?.branchId
    }

    /// Child note ids under `parentNoteId` from `CachedBranch` only, tree order (`notePosition`).
    /// Use when `CachedNote.childNoteIds` is empty (common after incremental sync) but branches are present.
    func fetchChildNoteIdsOrderedFromBranches(parentNoteId: String, serverProfileId: String) throws -> [String] {
        let parentId = parentNoteId
        let profileId = serverProfileId
        let branches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.parentNoteId == parentId && $0.serverProfileId == profileId },
                sortBy: [SortDescriptor(\.notePosition)]
            )
        )
        var seen = Set<String>()
        var ordered: [String] = []
        for b in branches where seen.insert(b.noteId).inserted {
            ordered.append(b.noteId)
        }
        return ordered
    }

    /// Resolves `CachedNote.childBranchIds` (branch id list on the parent) to child note ids in list order.
    func fetchNoteIdsForChildBranchIds(branchIds: [String], serverProfileId: String) throws -> [String] {
        guard !branchIds.isEmpty else { return [] }
        let profileId = serverProfileId
        var result: [String] = []
        for bid in branchIds {
            let branchId = bid
            var descriptor = FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.branchId == branchId && $0.serverProfileId == profileId }
            )
            descriptor.fetchLimit = 1
            if let row = try context.fetch(descriptor).first {
                result.append(row.noteId)
            }
        }
        return result
    }

    /// Cached notes carrying an own label `name` (e.g. `#template`).
    func cachedNoteIds(withLabel name: String, serverProfileId: String) -> [String] {
        let labelName = name
        let pid = serverProfileId
        let rows = (try? context.fetch(FetchDescriptor<CachedAttribute>(
            predicate: #Predicate { $0.name == labelName && $0.type == "label" && $0.serverProfileId == pid }
        ))) ?? []
        var seen = Set<String>()
        return rows.map(\.noteId).filter { seen.insert($0).inserted }
    }

    /// Cached notes carrying an own label `name` with exactly `value` (e.g. `#dateNote=2026-09-27`), still cached.
    func cachedNoteIds(withLabel name: String, value: String, serverProfileId: String) -> [String] {
        let labelName = name
        let labelValue = value
        let pid = serverProfileId
        let rows = (try? context.fetch(FetchDescriptor<CachedAttribute>(
            predicate: #Predicate {
                $0.name == labelName && $0.value == labelValue && $0.type == "label" && $0.serverProfileId == pid
            }
        ))) ?? []
        var seen = Set<String>()
        return rows.map(\.noteId).filter { noteId in
            seen.insert(noteId).inserted && (try? fetchCachedNote(id: noteId, serverProfileId: pid)) != nil
        }
    }

    func fetchCachedAttributes(noteId: String, serverProfileId: String) throws -> [CachedAttribute] {
        let nid = noteId
        let pid = serverProfileId
        return try context.fetch(
            FetchDescriptor<CachedAttribute>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == pid },
                sortBy: [SortDescriptor(\.position)]
            )
        )
    }

    // MARK: - Recent Notes

    func recordRecentNote(noteId: String, title: String, noteType: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<RecentNote>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.accessedAt = .now
            existing.title = title
        } else {
            let recent = RecentNote(
                noteId: noteId,
                title: title,
                noteType: noteType,
                serverProfileId: serverProfileId
            )
            context.insert(recent)
        }
        try context.save()
        try pruneRecents(serverProfileId: serverProfileId, keep: 50)
    }

    func fetchRecentNotes(serverProfileId: String, limit: Int = 30) throws -> [RecentNote] {
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<RecentNote>(
            predicate: #Predicate { $0.serverProfileId == profileId },
            sortBy: [SortDescriptor(\.accessedAt, order: .reverse)]
        )
        descriptor.fetchLimit = limit
        return try context.fetch(descriptor)
    }

    /// Single recent row for a note, if it exists (same composite id as favorites).
    func fetchRecentNote(noteId: String, serverProfileId: String) throws -> RecentNote? {
        let compositeId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<RecentNote>(predicate: #Predicate { $0.id == compositeId })
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    // MARK: - Open note tabs (user-managed strip, max 30 per profile; explicit add, not auto on every open)

    /// Maximum tabs per profile. Oldest (by `addedAt`) is evicted when this would be exceeded.
    private static let openNoteTabMaxCount = 30

    /// Inserts a new tab; the same `noteId` can appear in multiple open tabs. Evicts the oldest when over the cap.
    @discardableResult
    func addOpenNoteTab(noteId: String, title: String, noteType: String, serverProfileId: String) throws -> String {
        let tab = OpenNoteTab(
            noteId: noteId,
            title: title,
            noteType: noteType,
            serverProfileId: serverProfileId,
            addedAt: .now
        )
        context.insert(tab)
        try context.save()
        try pruneOpenNoteTabs(serverProfileId: serverProfileId, keep: Self.openNoteTabMaxCount)
        NotificationCenter.default.post(name: .openNoteTabsChanged, object: nil)
        return tab.id
    }

    /// When the list is empty and the user opens a note, creates a single starting tab. Returns the new row id, or `nil` if a tab already existed.
    @discardableResult
    func ensureFirstOpenNoteTabIfEmpty(noteId: String, title: String, noteType: String, serverProfileId: String) throws -> String? {
        guard openNoteTabCount(serverProfileId: serverProfileId) == 0 else { return nil }
        return try addOpenNoteTab(noteId: noteId, title: title, noteType: noteType, serverProfileId: serverProfileId)
    }

    /// Picks a tab for `noteId` (newest by `addedAt`); used when deep-linking into a note that already has open tab(s).
    func findPreferredOpenTabId(for noteId: String, serverProfileId: String) throws -> String? {
        let all = try fetchOpenNoteTabs(serverProfileId: serverProfileId)
        let matches = all.filter { $0.noteId == noteId }
        return matches.max(by: { $0.addedAt < $1.addedAt })?.id
    }

    func fetchOpenNoteTab(id: String, serverProfileId: String) throws -> OpenNoteTab? {
        var descriptor = FetchDescriptor<OpenNoteTab>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        let row = try context.fetch(descriptor).first
        guard let row, row.serverProfileId == serverProfileId else { return nil }
        return row
    }

    /// Updates an existing open-tab row to point at a different note (same `id`); order in the strip is unchanged.
    func retargetOpenNoteTab(
        id: String,
        to noteId: String,
        title: String,
        noteType: String,
        serverProfileId: String
    ) throws {
        guard let row = try fetchOpenNoteTab(id: id, serverProfileId: serverProfileId) else { return }
        row.noteId = noteId
        row.title = title
        row.noteType = noteType
        try context.save()
        NotificationCenter.default.post(name: .openNoteTabsChanged, object: nil)
    }

    /// Newest open tab in the profile (largest `addedAt`), if any; used to pick a row to retarget when `lastActive` is unknown.
    func mostRecentlyAddedOpenNoteTabId(serverProfileId: String) throws -> String? {
        let all = try fetchOpenNoteTabs(serverProfileId: serverProfileId)
        return all.max(by: { $0.addedAt < $1.addedAt })?.id
    }

    func openNoteTabCount(serverProfileId: String) -> Int {
        (try? fetchOpenNoteTabs(serverProfileId: serverProfileId))?.count ?? 0
    }

    func fetchOpenNoteTabs(serverProfileId: String) throws -> [OpenNoteTab] {
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<OpenNoteTab>(
            predicate: #Predicate { $0.serverProfileId == profileId },
            sortBy: [SortDescriptor(\.addedAt, order: .forward)]
        )
        return try context.fetch(descriptor)
    }

    /// Persists a new left-to-right order for the tab strip by rewriting `addedAt` (strip sorts by `addedAt` ascending).
    func reorderOpenNoteTabs(orderedIds: [String], serverProfileId: String) throws {
        let base = Date(timeIntervalSince1970: 0)
        for (index, id) in orderedIds.enumerated() {
            guard let row = try fetchOpenNoteTab(id: id, serverProfileId: serverProfileId) else { continue }
            row.addedAt = base.addingTimeInterval(TimeInterval(index))
        }
        try context.save()
        NotificationCenter.default.post(name: .openNoteTabsChanged, object: nil)
    }

    func removeOpenNoteTab(id: String, serverProfileId: String) throws {
        var descriptor = FetchDescriptor<OpenNoteTab>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        guard let row = try context.fetch(descriptor).first, row.serverProfileId == serverProfileId else { return }
        context.delete(row)
        try context.save()
        NotificationCenter.default.post(name: .openNoteTabsChanged, object: nil)
    }

    /// Closes the open tabs of a note being deleted and of the cached subnotes deleted with it. Trilium deletes a
    /// subnote along with its last parent, so a tab closes when every parent of its note leads back to `noteId`; a
    /// note that is also cloned elsewhere keeps its tabs. Returns how many closed, telling the tab strip if any did.
    @discardableResult
    func closeOpenNoteTabs(forDeletedNoteId noteId: String, serverProfileId: String) -> Int {
        guard let tabs = try? fetchOpenNoteTabs(serverProfileId: serverProfileId), !tabs.isEmpty else { return 0 }
        let profileId = serverProfileId
        var memo: [String: Bool] = [:]
        func isDeletedWithNote(_ id: String, visiting: Set<String>) -> Bool {
            if id == noteId { return true }
            if let known = memo[id] { return known }
            guard !visiting.contains(id) else { return false }
            let nid = id
            let branches = (try? context.fetch(FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId }
            ))) ?? []
            let parentIds = Set(branches.map(\.parentNoteId))
            // No cached parents (root, or a note outside the cache): nothing says it goes with the deleted note.
            let result = !parentIds.isEmpty && parentIds.allSatisfy { isDeletedWithNote($0, visiting: visiting.union([id])) }
            memo[id] = result
            return result
        }
        let closing = tabs.filter { isDeletedWithNote($0.noteId, visiting: []) }
        guard !closing.isEmpty else { return 0 }
        closing.forEach { context.delete($0) }
        try? context.save()
        NotificationCenter.default.post(name: .openNoteTabsChanged, object: nil)
        return closing.count
    }

    /// Points every open tab of `oldNoteId` at `newNoteId` (an offline note given its server id).
    func retargetOpenNoteTabs(fromNoteId oldNoteId: String, toNoteId newNoteId: String, serverProfileId: String) throws {
        let oldId = oldNoteId
        let profileId = serverProfileId
        let rows = try context.fetch(FetchDescriptor<OpenNoteTab>(
            predicate: #Predicate { $0.noteId == oldId && $0.serverProfileId == profileId }
        ))
        guard !rows.isEmpty else { return }
        rows.forEach { $0.noteId = newNoteId }
        try context.save()
        NotificationCenter.default.post(name: .openNoteTabsChanged, object: nil)
    }

    /// Deletes the oldest rows (by `addedAt`) until at most `keep` remain.
    func pruneOpenNoteTabs(serverProfileId: String, keep: Int) throws {
        var descriptor = FetchDescriptor<OpenNoteTab>(
            predicate: #Predicate { $0.serverProfileId == serverProfileId },
            sortBy: [SortDescriptor(\.addedAt, order: .forward)]
        )
        let all = try context.fetch(descriptor)
        guard all.count > keep else { return }
        for row in all.prefix(all.count - keep) {
            context.delete(row)
        }
        try context.save()
    }

    /// Breadcrumb-style path from cached parent chain under root: `Parent -> … -> note` (no `Root` prefix).
    /// Uses `leafTitle` when the leaf row is missing from the cache.
    /// When `protectedSessionActive` is false, protected notes show a placeholder instead of possibly stale decrypted titles in SwiftData.
    func cachedNotePathDisplay(
        noteId: String,
        leafTitle: String,
        leafIsProtected: Bool,
        serverProfileId: String,
        protectedSessionActive: Bool
    ) -> String {
        cachedNotePathSegments(
            noteId: noteId,
            leafTitle: leafTitle,
            leafIsProtected: leafIsProtected,
            serverProfileId: serverProfileId,
            protectedSessionActive: protectedSessionActive
        ).joined(separator: " -> ")
    }

    /// Slash-style path under root: `/Parent/…/note` (no `Root` segment).
    func cachedNoteSlashPathDisplay(
        noteId: String,
        leafTitle: String = "",
        leafIsProtected: Bool = false,
        serverProfileId: String,
        protectedSessionActive: Bool
    ) -> String {
        let segments = cachedNotePathSegments(
            noteId: noteId,
            leafTitle: leafTitle,
            leafIsProtected: leafIsProtected,
            serverProfileId: serverProfileId,
            protectedSessionActive: protectedSessionActive
        )
        guard !segments.isEmpty else { return "/\(noteId)" }
        return "/" + segments.joined(separator: "/")
    }

    /// Slash paths for `selectedNoteIds` and every cached descendant, sorted lexicographically.
    func slashPathsForNotesAndDescendants(
        selectedNoteIds: Set<String>,
        serverProfileId: String,
        protectedSessionActive: Bool
    ) -> [String] {
        var allIds = Set<String>()
        for id in selectedNoteIds where id != "root" {
            allIds.formUnion(cachedDescendantNoteIds(rootNoteId: id, serverProfileId: serverProfileId))
        }
        return allIds
            .map {
                cachedNoteSlashPathDisplay(
                    noteId: $0,
                    serverProfileId: serverProfileId,
                    protectedSessionActive: protectedSessionActive
                )
            }
            .sorted { $0.localizedCaseInsensitiveCompare($1) == .orderedAscending }
    }

    /// Selected note IDs whose ancestors are not also selected (safe roots for cascade delete).
    func maximalSelectedAncestorNoteIds(
        selectedNoteIds: Set<String>,
        serverProfileId: String
    ) -> [String] {
        selectedNoteIds.filter { id in
            guard id != "root" else { return false }
            return !hasSelectedAncestor(
                noteId: id,
                selectedNoteIds: selectedNoteIds,
                serverProfileId: serverProfileId
            )
        }
        .sorted()
    }

    private func hasSelectedAncestor(
        noteId: String,
        selectedNoteIds: Set<String>,
        serverProfileId: String
    ) -> Bool {
        var currentId = noteId
        var visited = Set<String>()
        while currentId != "root", !visited.contains(currentId) {
            visited.insert(currentId)
            guard let cached = try? fetchCachedNote(id: currentId, serverProfileId: serverProfileId),
                  let parentId = parentNoteIdForTreeWalk(
                    noteId: currentId,
                    serverProfileId: serverProfileId,
                    cached: cached
                  ),
                  !parentId.isEmpty
            else { return false }
            if parentId != "root", selectedNoteIds.contains(parentId) {
                return true
            }
            currentId = parentId
        }
        return false
    }

    private func cachedNotePathSegments(
        noteId: String,
        leafTitle: String,
        leafIsProtected: Bool,
        serverProfileId: String,
        protectedSessionActive: Bool
    ) -> [String] {
        let maskProtected = !protectedSessionActive
        let placeholder = NoteItem.protectedTitlePlaceholder
        var segments: [String] = []
        var currentId = noteId
        var visited = Set<String>()

        while currentId != "root", !visited.contains(currentId) {
            visited.insert(currentId)

            let cached = try? fetchCachedNote(id: currentId, serverProfileId: serverProfileId)
            let displayTitle: String
            if let cached {
                if maskProtected, cached.isProtected {
                    displayTitle = placeholder
                } else {
                    displayTitle = cached.title.isEmpty ? currentId : cached.title
                }
            } else if currentId == noteId {
                let t = leafTitle.trimmingCharacters(in: .whitespacesAndNewlines)
                if maskProtected, leafIsProtected {
                    displayTitle = placeholder
                } else {
                    displayTitle = t.isEmpty ? noteId : t
                }
            } else {
                break
            }

            segments.insert(displayTitle, at: 0)

            guard let cached,
                  let parentId = parentNoteIdForTreeWalk(noteId: currentId, serverProfileId: serverProfileId, cached: cached),
                  !parentId.isEmpty
            else { break }

            currentId = parentId
        }

        return segments
    }

    /// Legacy SF Symbol helper retained for callers that still expect a string; icons resolve from cache at display time.
    func cachedNoteIconSystemName(noteId: String, fallbackNoteType: String, serverProfileId: String) -> String {
        (NoteType(rawValue: fallbackNoteType) ?? .text).iconName
    }

    /// `#iconClass` for a cached note, if set on that note only.
    func cachedNoteIconClass(noteId: String, serverProfileId: String) -> String? {
        let attrs = (try? fetchCachedAttributes(noteId: noteId, serverProfileId: serverProfileId)) ?? []
        let iconClass = attrs.first { $0.name == "iconClass" && $0.type == "label" }?.value
            ?? attrs.first { $0.name == "iconClass" }?.value
        return BoxiconsResolver.usableIconClass(from: iconClass)
    }

    /// Effective `#iconClass` including template targets and inheritable labels from ancestors.
    /// Remembered until the next save: rows ask on every render, and the answer can walk every ancestor.
    func cachedEffectiveNoteIconClass(noteId: String, serverProfileId: String) -> String? {
        let key = IconMemoKey(serverProfileId: serverProfileId, noteId: noteId)
        if let memo = effectiveIconClassMemo[key] { return memo }
        let icon = resolveCachedEffectiveNoteIconClass(noteId: noteId, serverProfileId: serverProfileId)
        effectiveIconClassMemo[key] = icon
        return icon
    }

    private struct IconMemoKey: Hashable {
        let serverProfileId: String
        let noteId: String
    }

    private func resolveCachedEffectiveNoteIconClass(noteId: String, serverProfileId: String) -> String? {
        let attrs = (try? fetchCachedAttributes(noteId: noteId, serverProfileId: serverProfileId)) ?? []
        let ownRaw = attrs.first { $0.name == "iconClass" && $0.type == "label" }?.value
            ?? attrs.first { $0.name == "iconClass" }?.value
        let templateTarget = attrs.first { $0.name == "template" && $0.type == "relation" }?.value

        let resolved = NoteIconClassResolver.effectiveIconClass(
            noteId: noteId,
            ownIconClass: ownRaw,
            templateRelationValue: templateTarget,
            parentNoteProvider: { [self] targetId in
                guard let note = try? fetchCachedNote(id: targetId, serverProfileId: serverProfileId) else {
                    return nil
                }
                let targetAttrs = (try? fetchCachedAttributes(noteId: targetId, serverProfileId: serverProfileId)) ?? []
                let parentIds = allParentNoteIdsForTreeWalk(
                    noteId: targetId,
                    serverProfileId: serverProfileId,
                    cached: note
                )
                return NoteIconClassResolver.ParentNoteContext(
                    attributes: attributeItems(from: targetAttrs),
                    parentNoteIds: parentIds
                )
            },
            templateIconClassProvider: { [self] target in
                cachedTemplateIconClass(templateTarget: target, serverProfileId: serverProfileId)
            }
        )
        if let resolved { return resolved }
        let isTextNote = (try? fetchCachedNote(id: noteId, serverProfileId: serverProfileId))?.noteType == NoteType.text.rawValue
        return NoteIconClassResolver.geoDefaultIconClass(isTextNote: isTextNote) { name in
            attrs.first { $0.type == "label" && $0.name == name }?.value
        }
    }

    /// `#iconClass` from a `~template` target note, with built-in template fallbacks.
    func cachedTemplateIconClass(templateTarget: String, serverProfileId: String) -> String? {
        let target = templateTarget.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !target.isEmpty else { return nil }

        let attrs = (try? fetchCachedAttributes(noteId: target, serverProfileId: serverProfileId)) ?? []
        let raw = attrs.first { $0.name == "iconClass" && $0.type == "label" }?.value
            ?? attrs.first { $0.name == "iconClass" }?.value
        if let usable = BoxiconsResolver.usableIconClass(from: raw) {
            return usable
        }

        return TriliumBuiltinTemplateIcons.iconClass(for: target)
    }

    /// Parent metadata for walking inheritable `#iconClass` labels.
    func parentNoteContextForIconWalk(noteId: String, serverProfileId: String) -> NoteIconClassResolver.ParentNoteContext? {
        guard let note = try? fetchCachedNote(id: noteId, serverProfileId: serverProfileId) else {
            return nil
        }
        let attrs = (try? fetchCachedAttributes(noteId: noteId, serverProfileId: serverProfileId)) ?? []
        return NoteIconClassResolver.ParentNoteContext(
            attributes: attributeItems(from: attrs),
            parentNoteIds: allParentNoteIdsForTreeWalk(noteId: noteId, serverProfileId: serverProfileId, cached: note)
        )
    }

    /// A cached note's own attributes and parents, for `TriliumLabelResolver`.
    func labelResolverContext(noteId: String, serverProfileId: String) -> TriliumLabelResolver.NoteContext? {
        guard let note = try? fetchCachedNote(id: noteId, serverProfileId: serverProfileId) else { return nil }
        let attrs = (try? fetchCachedAttributes(noteId: noteId, serverProfileId: serverProfileId)) ?? []
        return TriliumLabelResolver.NoteContext(
            attributes: attributeItems(from: attrs),
            parentNoteIds: allParentNoteIdsForTreeWalk(noteId: noteId, serverProfileId: serverProfileId, cached: note)
        )
    }

    private func attributeItems(from cached: [CachedAttribute]) -> [AttributeItem] {
        cached.map { row in
            AttributeItem(
                attributeId: row.attributeId,
                noteId: row.noteId,
                type: AttributeItem.AttributeKind(rawValue: row.type) ?? .label,
                name: row.name,
                value: row.value,
                position: row.position,
                isInheritable: row.isInheritable
            )
        }
    }

    /// `#iconClass` for a recents row: top-level notebook under `root` on the path to `noteId`.
    func recentsRowIconClass(noteId: String, serverProfileId: String) -> String? {
        guard let topId = topLevelNoteIdUnderRoot(noteId: noteId, serverProfileId: serverProfileId) else {
            return nil
        }
        return cachedNoteIconClass(noteId: topId, serverProfileId: serverProfileId)
    }

    /// Icon context for a recents/favorites row (top-level notebook under root).
    func recentsRowIconContext(
        noteId: String,
        fallbackNoteType: String,
        serverProfileId: String
    ) -> NoteRowIconContext {
        let fallback = NoteType(rawValue: fallbackNoteType) ?? .text
        guard let topId = topLevelNoteIdUnderRoot(noteId: noteId, serverProfileId: serverProfileId) else {
            return NoteRowIconContext(iconClass: nil, fallbackNoteType: fallback)
        }
        let topType = (try? fetchCachedNote(id: topId, serverProfileId: serverProfileId))
            .flatMap { NoteType(rawValue: $0.noteType) } ?? fallback
        let iconClass = cachedNoteIconClass(noteId: topId, serverProfileId: serverProfileId)
        return NoteRowIconContext(iconClass: iconClass, fallbackNoteType: topType)
    }

    /// Icon context for an open tab row (the tab note’s own icon).
    func tabRowIconContext(
        noteId: String,
        fallbackNoteType: String,
        serverProfileId: String
    ) -> NoteRowIconContext {
        let fallback = NoteType(rawValue: fallbackNoteType) ?? .text
        let noteType = (try? fetchCachedNote(id: noteId, serverProfileId: serverProfileId))
            .flatMap { NoteType(rawValue: $0.noteType) } ?? fallback
        let iconClass = cachedEffectiveNoteIconClass(noteId: noteId, serverProfileId: serverProfileId)
        return NoteRowIconContext(iconClass: iconClass, fallbackNoteType: noteType)
    }

    /// Updates or removes the cached `#iconClass` label for offline / optimistic UI.
    func setCachedIconClass(_ iconClass: String?, noteId: String, serverProfileId: String) throws {
        let attrs = try fetchCachedAttributes(noteId: noteId, serverProfileId: serverProfileId)
        let existing = attrs.filter { $0.type == "label" && $0.name == "iconClass" }
        for row in existing {
            try deleteCachedAttribute(attributeId: row.attributeId, serverProfileId: serverProfileId)
        }
        guard let iconClass, !iconClass.isEmpty, iconClass != "bx bx-empty" else {
            try commitBatch()
            return
        }
        let localId = "local-iconClass-\(noteId)"
        let cached = CachedAttribute(
            attributeId: localId,
            noteId: noteId,
            type: "label",
            name: "iconClass",
            value: iconClass,
            serverProfileId: serverProfileId
        )
        context.insert(cached)
        try commitBatch()
    }

    /// Updates or removes the cached Trilium `#color` label for offline / optimistic UI.
    func setCachedColorLabel(_ colorLabel: String?, noteId: String, serverProfileId: String) throws {
        let attrs = try fetchCachedAttributes(noteId: noteId, serverProfileId: serverProfileId)
        let existing = attrs.filter {
            $0.type == "label" && $0.name.caseInsensitiveCompare("color") == .orderedSame
        }
        for row in existing {
            try deleteCachedAttribute(attributeId: row.attributeId, serverProfileId: serverProfileId)
        }
        guard let colorLabel,
              let normalized = TriliumNoteColorMapper.canonicalColorLabel(from: colorLabel)
        else {
            try commitBatch()
            return
        }
        let localId = "local-color-\(noteId)"
        let cached = CachedAttribute(
            attributeId: localId,
            noteId: noteId,
            type: "label",
            name: "color",
            value: normalized,
            serverProfileId: serverProfileId
        )
        context.insert(cached)
        try commitBatch()
    }

    /// Raw value of a cached note's `#color` label (Trilium tree color), or `nil` when absent.
    /// Mirrors `NoteItem.colorLabelValue` for callers that only have a `noteId`.
    func cachedNoteColorLabel(noteId: String, serverProfileId: String) -> String? {
        let attrs = (try? fetchCachedAttributes(noteId: noteId, serverProfileId: serverProfileId)) ?? []
        guard let raw = attrs.first(where: {
            $0.type == "label" && $0.name.caseInsensitiveCompare("color") == .orderedSame
        })?.value else { return nil }
        let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }

    /// Top-level child of `root` on the path to `noteId` (the notebook / root segment used for tree grouping).
    func topLevelNotebookId(noteId: String, serverProfileId: String) -> String? {
        topLevelNoteIdUnderRoot(noteId: noteId, serverProfileId: serverProfileId)
    }

    /// Walks parents from `noteId` until the parent is `root`; returns that note’s id (the top-level child of root on this branch).
    /// Uses `CachedBranch` when `parentNoteIds` is empty (common after incremental sync).
    private func topLevelNoteIdUnderRoot(noteId: String, serverProfileId: String) -> String? {
        var current = noteId
        var visited = Set<String>()
        while !visited.contains(current) {
            visited.insert(current)
            guard let cached = try? fetchCachedNote(id: current, serverProfileId: serverProfileId) else {
                return nil
            }
            guard let parent = parentNoteIdForTreeWalk(noteId: current, serverProfileId: serverProfileId, cached: cached)
            else {
                return current
            }
            if parent == "root" {
                return current
            }
            current = parent
        }
        return nil
    }

    /// Prefer `CachedNote.parentNoteIds`; fall back to the first `CachedBranch` row (same idea as tree/load).
    private func parentNoteIdForTreeWalk(noteId: String, serverProfileId: String, cached: CachedNote) -> String? {
        if let p = cached.parentNoteIds.first, !p.isEmpty {
            return p
        }
        return parentNoteIdFromFirstBranch(noteId: noteId, serverProfileId: serverProfileId)
    }

    /// All known parent note ids for `noteId` (cached `parentNoteIds` plus every `CachedBranch` parent).
    private func allParentNoteIdsForTreeWalk(noteId: String, serverProfileId: String, cached: CachedNote) -> [String] {
        var ordered: [String] = []
        var seen = Set<String>()
        for p in cached.parentNoteIds where !p.isEmpty && seen.insert(p).inserted {
            ordered.append(p)
        }
        let nid = noteId
        let pid = serverProfileId
        let branches = (try? context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == pid },
                sortBy: [SortDescriptor(\.branchId)]
            )
        )) ?? []
        for b in branches where !b.parentNoteId.isEmpty && seen.insert(b.parentNoteId).inserted {
            ordered.append(b.parentNoteId)
        }
        return ordered
    }

    /// Note ids from a direct child of `treeParentNoteId` down to `noteId` (inclusive).
    /// When a note has multiple parents (clones), prefers the **longest** path that stays under `treeParentNoteId`
    /// so a shallow clone under root does not hide the real nested tree placement.
    /// Returns `[]` when `noteId` is not under `treeParentNoteId`, or when `noteId` equals `treeParentNoteId`.
    func notePathUnderTreeParent(
        noteId: String,
        treeParentNoteId: String,
        serverProfileId: String
    ) -> [String] {
        guard noteId != treeParentNoteId else { return [] }

        func dfs(current: String, visited: Set<String>) -> [String]? {
            if current == treeParentNoteId { return [] }
            guard !visited.contains(current) else { return nil }

            guard let cached = try? fetchCachedNote(id: current, serverProfileId: serverProfileId) else {
                return nil
            }
            var nextVisited = visited
            nextVisited.insert(current)

            let parents = allParentNoteIdsForTreeWalk(
                noteId: current,
                serverProfileId: serverProfileId,
                cached: cached
            )
            var best: [String]?
            for parent in parents {
                if let prefix = dfs(current: parent, visited: nextVisited) {
                    let candidate = prefix + [current]
                    if best == nil || candidate.count > best!.count {
                        best = candidate
                    }
                }
            }
            return best
        }

        return dfs(current: noteId, visited: []) ?? []
    }

    private func parentNoteIdFromFirstBranch(noteId: String, serverProfileId: String) -> String? {
        let nid = noteId
        let pid = serverProfileId
        var descriptor = FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == pid },
            sortBy: [SortDescriptor(\.branchId)]
        )
        descriptor.fetchLimit = 1
        return try? context.fetch(descriptor).first?.parentNoteId
    }

    private func pruneRecents(serverProfileId: String, keep: Int) throws {
        let profileId = serverProfileId
        let descriptor = FetchDescriptor<RecentNote>(
            predicate: #Predicate { $0.serverProfileId == profileId },
            sortBy: [SortDescriptor(\.accessedAt, order: .reverse)]
        )
        let all = try context.fetch(descriptor)
        if all.count > keep {
            for item in all.dropFirst(keep) {
                context.delete(item)
            }
            try context.save()
        }
    }

    // MARK: - Favorites

    func addFavorite(noteId: String, title: String, noteType: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<FavoriteNote>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if try context.fetch(descriptor).first == nil {
            let fav = FavoriteNote(noteId: noteId, title: title, noteType: noteType, serverProfileId: serverProfileId)
            context.insert(fav)
            try context.save()
        }
    }

    func removeFavorite(noteId: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<FavoriteNote>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            context.delete(existing)
            try context.save()
        }
    }

    func isFavorite(noteId: String, serverProfileId: String) throws -> Bool {
        let id = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<FavoriteNote>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first != nil
    }

    func fetchFavorites(serverProfileId: String) throws -> [FavoriteNote] {
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<FavoriteNote>(
            predicate: #Predicate { $0.serverProfileId == profileId },
            sortBy: [SortDescriptor(\.title)]
        )
        return try context.fetch(descriptor)
    }

    func removeFavorites(noteIds: Set<String>, serverProfileId: String) throws {
        let profileId = serverProfileId
        for noteId in noteIds {
            try removeFavorite(noteId: noteId, serverProfileId: profileId)
        }
    }

    /// `rootNoteId` plus any descendant note IDs reachable via cached `childNoteIds` (BFS, one query per level).
    func cachedDescendantNoteIds(rootNoteId: String, serverProfileId: String) -> Set<String> {
        var result: Set<String> = [rootNoteId]
        var level: [String] = [rootNoteId]
        while !level.isEmpty {
            let notes = (try? fetchCachedNotes(ids: level, serverProfileId: serverProfileId)) ?? [:]
            var next: [String] = []
            for id in level {
                guard let note = notes[id] else { continue }
                for child in note.childNoteIds where result.insert(child).inserted {
                    next.append(child)
                }
            }
            level = next
        }
        return result
    }

    /// Removes favorite rows for the root and cached descendants (e.g. after deleting a subtree on the server).
    func removeFavoritesForCachedSubtree(rootNoteId: String, serverProfileId: String) {
        let ids = cachedDescendantNoteIds(rootNoteId: rootNoteId, serverProfileId: serverProfileId)
        for id in ids {
            try? removeFavorite(noteId: id, serverProfileId: serverProfileId)
        }
    }

    // MARK: - Recent Searches

    func recordRecentSearch(query: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(query)"
        var descriptor = FetchDescriptor<RecentSearch>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.searchedAt = .now
        } else {
            let recent = RecentSearch(query: query, serverProfileId: serverProfileId)
            context.insert(recent)
        }
        try context.save()
    }

    func fetchRecentSearches(serverProfileId: String, limit: Int = 20) throws -> [RecentSearch] {
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<RecentSearch>(
            predicate: #Predicate { $0.serverProfileId == profileId },
            sortBy: [SortDescriptor(\.searchedAt, order: .reverse)]
        )
        descriptor.fetchLimit = limit
        return try context.fetch(descriptor)
    }

    func deleteRecentSearch(id: String) throws {
        var descriptor = FetchDescriptor<RecentSearch>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        guard let existing = try context.fetch(descriptor).first else { return }
        context.delete(existing)
        try context.save()
    }

    func clearRecentSearches(serverProfileId: String) throws {
        let profileId = serverProfileId
        let descriptor = FetchDescriptor<RecentSearch>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        )
        let rows = try context.fetch(descriptor)
        guard !rows.isEmpty else { return }
        rows.forEach { context.delete($0) }
        try context.save()
    }

    // MARK: - Drafts

    func saveDraft(noteId: String, content: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<DraftContent>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.content = content
            existing.savedAt = .now
        } else {
            let draft = DraftContent(noteId: noteId, content: content, serverProfileId: serverProfileId)
            context.insert(draft)
        }
        try context.save()
    }

    func loadDraft(noteId: String, serverProfileId: String) throws -> DraftContent? {
        let id = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<DraftContent>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    func deleteDraft(noteId: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<DraftContent>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            context.delete(existing)
            try context.save()
        }
    }

    // MARK: - Offline note creation queue

    /// Inserts a placeholder note + branch, enqueues `PendingNoteCreation`, and reconciles tree metadata.
    /// Pass `initialAttributes` for labels that should be created alongside the note (e.g. geolocation).
    func createOfflineChildNote(
        parentNoteId: String,
        title: String,
        noteType: String,
        mime: String,
        initialContent: String,
        serverProfileId: String,
        initialAttributes: [NoteCreationAttribute] = [],
        useParentTitleTemplate: Bool = false
    ) throws -> (noteId: String, branchId: String) {
        let profileId = serverProfileId
        let pid = parentNoteId
        let branches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.parentNoteId == pid && $0.serverProfileId == profileId },
                sortBy: [SortDescriptor(\.notePosition, order: .reverse)]
            )
        )
        let nextPos = (branches.first.map(\.notePosition) ?? -1) + 1

        let noteId = "ol_\(UUID().uuidString.replacingOccurrences(of: "-", with: ""))"
        let branchId = "olb_\(UUID().uuidString.replacingOccurrences(of: "-", with: ""))"

        let contentData = Data(initialContent.utf8)
        let cached = CachedNote(
            noteId: noteId,
            title: title,
            noteType: noteType,
            mime: mime,
            isProtected: false,
            parentNoteIds: [parentNoteId],
            childNoteIds: [],
            parentBranchIds: [branchId],
            childBranchIds: [],
            content: contentData.isEmpty ? nil : contentData,
            contentFetchedAt: contentData.isEmpty ? nil : .now,
            serverProfileId: serverProfileId
        )
        context.insert(cached)

        let branch = CachedBranch(
            branchId: branchId,
            noteId: noteId,
            parentNoteId: parentNoteId,
            prefix: nil,
            notePosition: nextPos,
            isExpanded: false,
            serverProfileId: serverProfileId
        )
        context.insert(branch)

        if let parent = try fetchCachedNote(id: parentNoteId, serverProfileId: serverProfileId) {
            if !parent.childNoteIds.contains(noteId) {
                parent.childNoteIds.append(noteId)
            }
            if !parent.childBranchIds.contains(branchId) {
                parent.childBranchIds.append(branchId)
            }
        }

        for (idx, attr) in initialAttributes.enumerated() {
            let attrId = "ol_attr_\(UUID().uuidString.replacingOccurrences(of: "-", with: ""))"
            let cachedAttr = CachedAttribute(
                attributeId: attrId,
                noteId: noteId,
                type: attr.type,
                name: attr.name,
                value: attr.value,
                position: idx * 10,
                isInheritable: attr.isInheritable,
                serverProfileId: serverProfileId
            )
            context.insert(cachedAttr)
        }

        var attrsJSON = "[]"
        if !initialAttributes.isEmpty {
            let arr: [[String: Any]] = initialAttributes.map { a in
                var entry: [String: Any] = ["type": a.type, "name": a.name, "value": a.value]
                if a.isInheritable { entry["isInheritable"] = true }
                if a.applyAfterTemplate { entry["applyAfterTemplate"] = true }
                return entry
            }
            if let data = try? JSONSerialization.data(withJSONObject: arr),
               let str = String(data: data, encoding: .utf8) {
                attrsJSON = str
            }
        }

        let pending = PendingNoteCreation(
            serverProfileId: serverProfileId,
            localNoteId: noteId,
            localBranchId: branchId,
            parentNoteId: parentNoteId,
            title: title,
            noteType: noteType,
            mime: mime,
            initialContent: initialContent,
            initialAttributesJSON: attrsJSON,
            titleFromTemplate: useParentTitleTemplate
                && hasEffectiveTitleTemplate(noteId: parentNoteId, serverProfileId: serverProfileId)
        )
        context.insert(pending)
        try context.save()
        try reconcileCachedNoteBranchesMetadata(serverProfileId: serverProfileId)
        let offlineQueuedLog = NoteDiagnostics.describeOfflineCreateQueued(
            parentNoteId: parentNoteId,
            localNoteId: noteId,
            localBranchId: branchId,
            title: title,
            noteType: noteType,
            mime: mime,
            contentByteCount: contentData.count,
            initialAttributesCount: initialAttributes.count,
            attrsJSON: attrsJSON
        )
        Log.noteDiag.info("\(offlineQueuedLog)")
        return (noteId, branchId)
    }

    func fetchPendingNoteCreations(serverProfileId: String) throws -> [PendingNoteCreation] {
        let pid = serverProfileId
        return try context.fetch(
            FetchDescriptor<PendingNoteCreation>(
                predicate: #Predicate { $0.serverProfileId == pid },
                sortBy: [SortDescriptor(\.queuedAt, order: .forward)]
            )
        )
    }

    /// After a successful `createNote` for an offline placeholder: swap cache rows, remap ids, remove the queue entry.
    func applyOfflineNoteCreationServerResult(
        queueRowId: String,
        localNoteId: String,
        localBranchId: String,
        response: CreateNoteResponse,
        serverProfileId: String
    ) throws {
        let profileId = serverProfileId
        let oldId = localNoteId
        let newId = response.note.noteId

        try rewriteCachedBranchParentPointers(from: oldId, to: newId, serverProfileId: profileId)
        try rewritePendingNoteCreationParentPointers(from: oldId, to: newId, serverProfileId: profileId)
        try rewritePendingBranchMoveLocalBranchIds(from: localBranchId, to: response.branch.branchId, serverProfileId: profileId)

        try deleteCachedBranch(branchId: localBranchId, serverProfileId: profileId)
        // The note lives on under its server id: what the user keeps for it moves across before the placeholder's
        // cache rows go, since dropping those also drops its tabs, favorite, recents entry and draft.
        try remapUserNoteReferences(from: oldId, to: newId, serverProfileId: profileId)
        try deleteCachedNotes(noteIds: [localNoteId], serverProfileId: profileId)

        try cacheNote(from: response.note, serverProfileId: profileId)
        try cacheBranch(from: response.branch, serverProfileId: profileId)
        try remapLocalNoteIdReferences(from: oldId, to: newId, serverProfileId: profileId)

        let qid = queueRowId
        let queued = try context.fetch(
            FetchDescriptor<PendingNoteCreation>(
                predicate: #Predicate { $0.id == qid && $0.serverProfileId == profileId }
            )
        )
        queued.forEach { context.delete($0) }

        try context.save()
        try reconcileCachedNoteBranchesMetadata(serverProfileId: profileId)
    }

    private func rewriteCachedBranchParentPointers(from oldParentNoteId: String, to newParentNoteId: String, serverProfileId: String) throws {
        let oldP = oldParentNoteId
        let newP = newParentNoteId
        let profileId = serverProfileId
        let rows = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.parentNoteId == oldP && $0.serverProfileId == profileId }
            )
        )
        for b in rows {
            b.parentNoteId = newP
        }
    }

    private func rewritePendingNoteCreationParentPointers(from oldParentNoteId: String, to newParentNoteId: String, serverProfileId: String) throws {
        let profileId = serverProfileId
        let oldP = oldParentNoteId
        let rows = try context.fetch(
            FetchDescriptor<PendingNoteCreation>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        for r in rows where r.parentNoteId == oldP {
            r.parentNoteId = newParentNoteId
        }
    }

    private func rewritePendingBranchMoveLocalBranchIds(from oldBranchId: String, to newBranchId: String, serverProfileId: String) throws {
        let profileId = serverProfileId
        let oldB = oldBranchId
        let newB = newBranchId
        let rows = try context.fetch(
            FetchDescriptor<PendingBranchMove>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        for r in rows {
            if r.sourceBranchId == oldB { r.sourceBranchId = newB }
            if r.targetParentBranchId == oldB { r.targetParentBranchId = newB }
        }
    }

    /// Moves the open tabs, favorite, recents entry and unsaved draft of a placeholder id to the server id.
    private func remapUserNoteReferences(from oldId: String, to newId: String, serverProfileId: String) throws {
        let profileId = serverProfileId
        try retargetOpenNoteTabs(fromNoteId: oldId, toNoteId: newId, serverProfileId: profileId)

        let oldCompositeId = "\(profileId):\(oldId)"
        let newCompositeId = "\(profileId):\(newId)"

        var draftDesc = FetchDescriptor<DraftContent>(predicate: #Predicate { $0.id == oldCompositeId })
        draftDesc.fetchLimit = 1
        if let draft = try context.fetch(draftDesc).first {
            draft.noteId = newId
            draft.id = newCompositeId
        }

        var favDesc = FetchDescriptor<FavoriteNote>(predicate: #Predicate { $0.id == oldCompositeId })
        favDesc.fetchLimit = 1
        if let favorite = try context.fetch(favDesc).first {
            favorite.noteId = newId
            favorite.id = newCompositeId
        }

        var recentDesc = FetchDescriptor<RecentNote>(predicate: #Predicate { $0.id == oldCompositeId })
        recentDesc.fetchLimit = 1
        if let recent = try context.fetch(recentDesc).first {
            recent.noteId = newId
            recent.id = newCompositeId
        }

        try context.save()
    }

    /// Moves pending body uploads, title patches, branch moves, deletions, attachment imports and cached attributes
    /// from a placeholder id to the server id. (Tabs, favorites, recents and drafts move in `remapUserNoteReferences`.)
    func remapLocalNoteIdReferences(from oldId: String, to newId: String, serverProfileId: String) throws {
        let profileId = serverProfileId
        let from = oldId

        let nid = from
        var bodyRows = try context.fetch(
            FetchDescriptor<PendingNoteBodyUpload>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId }
            )
        )
        if let row = bodyRows.first {
            let body = row.body
            let mime = row.mime
            let baseUtc = row.baseUtcDateModified
            context.delete(row)
            try context.save()
            try upsertPendingNoteBodyUpload(
                noteId: newId,
                body: body,
                mime: mime,
                serverProfileId: profileId,
                baseUtcDateModified: baseUtc
            )
        }

        let moveRows = try context.fetch(
            FetchDescriptor<PendingBranchMove>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        for m in moveRows {
            if m.sourceNoteId == from { m.sourceNoteId = newId }
            if m.oldParentNoteId == from { m.oldParentNoteId = newId }
            if m.targetParentNoteId == from { m.targetParentNoteId = newId }
        }

        let attrRows = try context.fetch(
            FetchDescriptor<CachedAttribute>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId }
            )
        )
        for a in attrRows {
            a.noteId = newId
        }

        let delRows = try context.fetch(
            FetchDescriptor<PendingNoteDeletion>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        for d in delRows where d.noteId == from {
            d.noteId = newId
        }

        let oldPatchId = "\(profileId):\(from)"
        var patchDesc = FetchDescriptor<PendingNotePatch>(predicate: #Predicate { $0.id == oldPatchId })
        patchDesc.fetchLimit = 1
        if let p = try context.fetch(patchDesc).first {
            let title = p.title
            context.delete(p)
            try context.save()
            try upsertPendingNotePatch(noteId: newId, title: title, serverProfileId: profileId)
        }

        let attachRows = try context.fetch(
            FetchDescriptor<PendingAttachmentImport>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId }
            )
        )
        for row in attachRows {
            row.noteId = newId
        }

        try context.save()
    }

    // MARK: - Offline branch move (optimistic cache + queue)

    /// Updates SwiftData tree rows so the note appears under `targetParentNoteId` before the server confirms. `noteId` is unchanged so edits and pending body uploads keep working.
    func applyOptimisticBranchMove(
        sourceBranchId: String,
        sourceNoteId: String,
        targetParentNoteId: String,
        serverProfileId: String
    ) throws {
        let profileId = serverProfileId
        let bid = sourceBranchId
        var branchDesc = FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.branchId == bid && $0.serverProfileId == profileId }
        )
        branchDesc.fetchLimit = 1
        guard let branch = try context.fetch(branchDesc).first else {
            throw NSError(
                domain: "PersistenceManager",
                code: 1,
                userInfo: [NSLocalizedDescriptionKey: "Cached branch not found for optimistic move"]
            )
        }
        guard branch.noteId == sourceNoteId else {
            throw NSError(
                domain: "PersistenceManager",
                code: 2,
                userInfo: [NSLocalizedDescriptionKey: "Branch/note mismatch for optimistic move"]
            )
        }

        let targetPid = targetParentNoteId
        let siblings = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.parentNoteId == targetPid && $0.serverProfileId == profileId }
            )
        )
        let nextPos = (siblings.map(\.notePosition).max() ?? -1) + 10

        branch.parentNoteId = targetParentNoteId
        branch.notePosition = nextPos

        try context.save()
        try reconcileCachedNoteBranchesMetadata(serverProfileId: profileId)
    }

    func enqueuePendingBranchMove(
        sourceBranchId: String,
        targetParentBranchId: String,
        sourceNoteId: String,
        oldParentNoteId: String,
        targetParentNoteId: String,
        serverProfileId: String
    ) throws {
        let profileId = serverProfileId
        let sbid = sourceBranchId
        let existing = try context.fetch(
            FetchDescriptor<PendingBranchMove>(
                predicate: #Predicate { $0.serverProfileId == profileId && $0.sourceBranchId == sbid }
            )
        )
        existing.forEach { context.delete($0) }
        let row = PendingBranchMove(
            serverProfileId: profileId,
            sourceBranchId: sourceBranchId,
            targetParentBranchId: targetParentBranchId,
            sourceNoteId: sourceNoteId,
            oldParentNoteId: oldParentNoteId,
            targetParentNoteId: targetParentNoteId
        )
        context.insert(row)
        try context.save()
    }

    func fetchPendingBranchMoves(serverProfileId: String) throws -> [PendingBranchMove] {
        let pid = serverProfileId
        return try context.fetch(
            FetchDescriptor<PendingBranchMove>(
                predicate: #Predicate { $0.serverProfileId == pid },
                sortBy: [SortDescriptor(\.queuedAt, order: .forward)]
            )
        )
    }

    func deletePendingBranchMove(id: String, serverProfileId: String) throws {
        let mid = id
        let pid = serverProfileId
        let rows = try context.fetch(
            FetchDescriptor<PendingBranchMove>(
                predicate: #Predicate { $0.id == mid && $0.serverProfileId == pid }
            )
        )
        rows.forEach { context.delete($0) }
        try context.save()
    }

    // MARK: - Offline note deletion queue

    /// Queues a note for server-side deletion when connectivity returns.
    /// If the note was created offline (`ol_` prefix), cancels the pending creation instead.
    func enqueueOfflineNoteDeletion(noteId: String, serverProfileId: String, eraseNotes: Bool = false) throws {
        let profileId = serverProfileId
        // The note leaves the tree now, so its tabs (and its subnotes') close now too, not when the queue uploads.
        closeOpenNoteTabs(forDeletedNoteId: noteId, serverProfileId: profileId)

        if noteId.hasPrefix("ol_") {
            let nid = noteId
            let creations = try context.fetch(
                FetchDescriptor<PendingNoteCreation>(
                    predicate: #Predicate { $0.localNoteId == nid && $0.serverProfileId == profileId }
                )
            )
            creations.forEach { context.delete($0) }

            let childCreations = try context.fetch(
                FetchDescriptor<PendingNoteCreation>(
                    predicate: #Predicate { $0.parentNoteId == nid && $0.serverProfileId == profileId }
                )
            )
            childCreations.forEach { context.delete($0) }

            try deletePendingNoteBodyUpload(noteId: noteId, serverProfileId: profileId)
            try deletePendingNotePatch(noteId: noteId, serverProfileId: profileId)
            try deleteCachedNotes(noteIds: [noteId], serverProfileId: profileId)

            if let parent = try findParentOfCachedNote(noteId: noteId, serverProfileId: profileId) {
                parent.childNoteIds.removeAll { $0 == noteId }
            }

            try context.save()
            try reconcileCachedNoteBranchesMetadata(serverProfileId: profileId)
            return
        }

        GhostNoteTracker.shared.add(noteId, serverProfileId: profileId)
        removeFavoritesForCachedSubtree(rootNoteId: noteId, serverProfileId: profileId)

        if let parent = try findParentOfCachedNote(noteId: noteId, serverProfileId: profileId) {
            parent.childNoteIds.removeAll { $0 == noteId }
        }

        try deletePendingNoteBodyUpload(noteId: noteId, serverProfileId: profileId)
        try deletePendingNotePatch(noteId: noteId, serverProfileId: profileId)
        try deleteCachedNotes(noteIds: [noteId], serverProfileId: profileId, clearGhost: false)

        let pending = PendingNoteDeletion(
            serverProfileId: profileId,
            noteId: noteId,
            eraseNotes: eraseNotes
        )
        context.insert(pending)
        try context.save()
        try reconcileCachedNoteBranchesMetadata(serverProfileId: profileId)
    }

    func deletePendingNoteDeletion(id: String, serverProfileId: String) throws {
        let did = id
        let pid = serverProfileId
        let rows = try context.fetch(
            FetchDescriptor<PendingNoteDeletion>(
                predicate: #Predicate { $0.id == did && $0.serverProfileId == pid }
            )
        )
        rows.forEach { context.delete($0) }
        try context.save()
    }

    /// Finds the cached parent note for a given child note id (first parent from branches or parentNoteIds).
    private func findParentOfCachedNote(noteId: String, serverProfileId: String) throws -> CachedNote? {
        let nid = noteId
        let pid = serverProfileId
        let branches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == pid }
            )
        )
        if let parentId = branches.first?.parentNoteId {
            return try fetchCachedNote(id: parentId, serverProfileId: serverProfileId)
        }
        if let cached = try fetchCachedNote(id: noteId, serverProfileId: serverProfileId),
           let parentId = cached.parentNoteIds.first {
            return try fetchCachedNote(id: parentId, serverProfileId: serverProfileId)
        }
        return nil
    }

    // MARK: - Offline note title patch queue

    /// Saves a pending title change (and optional MIME). Upserts: last values win per note.
    /// Pass `mime` to queue a code-language change; omit it to leave any previously queued MIME alone.
    func upsertPendingNotePatch(noteId: String, title: String, mime: String? = nil, serverProfileId: String) throws {
        let rowId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<PendingNotePatch>(predicate: #Predicate { $0.id == rowId })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.title = title
            if let mime {
                existing.mime = mime
            }
            existing.queuedAt = .now
        } else {
            let row = PendingNotePatch(
                serverProfileId: serverProfileId,
                noteId: noteId,
                title: title,
                mime: mime
            )
            context.insert(row)
        }
        try context.save()
    }

    func fetchPendingNotePatches(serverProfileId: String) throws -> [PendingNotePatch] {
        let pid = serverProfileId
        return try context.fetch(
            FetchDescriptor<PendingNotePatch>(
                predicate: #Predicate { $0.serverProfileId == pid },
                sortBy: [SortDescriptor(\.queuedAt, order: .forward)]
            )
        )
    }

    func deletePendingNotePatch(noteId: String, serverProfileId: String) throws {
        let rowId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<PendingNotePatch>(predicate: #Predicate { $0.id == rowId })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            context.delete(existing)
            try context.save()
        }
    }

    // MARK: - Offline note body upload queue

    func upsertPendingNoteBodyUpload(
        noteId: String,
        body: Data,
        mime: String,
        serverProfileId: String,
        baseUtcDateModified: String? = nil
    ) throws {
        let rowId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<PendingNoteBodyUpload>(predicate: #Predicate { $0.id == rowId })
        descriptor.fetchLimit = 1
        let tFetch = CFAbsoluteTimeGetCurrent()
        let existingRow = try context.fetch(descriptor).first
        let fetchMs = CheckboxPerf.ms(tFetch)
        let tRest = CFAbsoluteTimeGetCurrent()
        defer {
            CheckboxPerf.log(
                "upsertPendingUpload note=\(noteId) bytes=\(body.count) existing=\(existingRow != nil) fetchMs=\(fetchMs) saveMs=\(CheckboxPerf.ms(tRest))"
            )
        }
        if let existing = existingRow {
            existing.body = body
            existing.mime = mime
            existing.queuedAt = .now
        } else {
            let trimmedBase = baseUtcDateModified?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            let base: String
            if !trimmedBase.isEmpty {
                base = trimmedBase
            } else {
                let cachedRaw = try fetchCachedNote(id: noteId, serverProfileId: serverProfileId)?.utcDateModified
                let cached = (cachedRaw ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
                base = cached.isEmpty ? "" : cached
            }
            let row = PendingNoteBodyUpload(
                noteId: noteId,
                serverProfileId: serverProfileId,
                body: body,
                mime: mime,
                baseUtcDateModified: base
            )
            context.insert(row)
        }
        try context.save()
    }

    func fetchPendingNoteBodyUploads(serverProfileId: String) throws -> [PendingNoteBodyUpload] {
        let pid = serverProfileId
        return try context.fetch(
            FetchDescriptor<PendingNoteBodyUpload>(
                predicate: #Predicate { $0.serverProfileId == pid },
                sortBy: [SortDescriptor(\.queuedAt, order: .forward)]
            )
        )
    }

    /// Whether a saved body for `noteId` is still waiting to be uploaded.
    func hasPendingNoteBodyUpload(noteId: String, serverProfileId: String) -> Bool {
        let rowId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<PendingNoteBodyUpload>(predicate: #Predicate { $0.id == rowId })
        descriptor.fetchLimit = 1
        return ((try? context.fetchCount(descriptor)) ?? 0) > 0
    }

    func deletePendingNoteBodyUpload(noteId: String, serverProfileId: String) throws {
        let rowId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<PendingNoteBodyUpload>(predicate: #Predicate { $0.id == rowId })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            context.delete(existing)
            try context.save()
        }
    }

    /// Updates the `baseUtcDateModified` on a pending body upload row (if it still exists).
    /// Called after a successful server upload so that a surviving row (new local save arrived
    /// mid-flight) uses the fresh server timestamp for its next conflict check.
    func updatePendingBodyUploadBase(noteId: String, serverProfileId: String, newBase: String) throws {
        let rowId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<PendingNoteBodyUpload>(predicate: #Predicate { $0.id == rowId })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.baseUtcDateModified = newBase
            try context.save()
        }
    }

    /// Deletes the pending body upload only if it hasn't been updated since `snapshotDate`.
    /// Returns `true` if the row was deleted, `false` if a newer write superseded it.
    @discardableResult
    func deletePendingNoteBodyUploadIfUnchanged(noteId: String, serverProfileId: String, snapshotDate: Date) throws -> Bool {
        let rowId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<PendingNoteBodyUpload>(predicate: #Predicate { $0.id == rowId })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            if existing.queuedAt > snapshotDate {
                return false
            }
            context.delete(existing)
            try context.save()
            return true
        }
        return true
    }

    // MARK: - Local transfer attachment import queue

    func enqueuePendingAttachmentImport(
        noteId: String,
        role: String,
        mime: String,
        title: String,
        position: Int,
        data: Data,
        serverProfileId: String
    ) throws {
        let row = PendingAttachmentImport(
            serverProfileId: serverProfileId,
            noteId: noteId,
            role: role,
            mime: mime,
            title: title,
            position: position,
            data: data
        )
        context.insert(row)
        try context.save()
    }

    func fetchPendingAttachmentImports(serverProfileId: String) throws -> [PendingAttachmentImport] {
        let profileId = serverProfileId
        return try context.fetch(
            FetchDescriptor<PendingAttachmentImport>(
                predicate: #Predicate { $0.serverProfileId == profileId },
                sortBy: [SortDescriptor(\.queuedAt, order: .forward)]
            )
        )
    }

    func fetchPendingAttachmentImports(noteId: String, serverProfileId: String) throws -> [PendingAttachmentImport] {
        let profileId = serverProfileId
        let nid = noteId
        return try context.fetch(
            FetchDescriptor<PendingAttachmentImport>(
                predicate: #Predicate { $0.noteId == nid && $0.serverProfileId == profileId },
                sortBy: [SortDescriptor(\.position, order: .forward)]
            )
        )
    }

    func deletePendingAttachmentImport(id: String, serverProfileId: String) throws {
        let profileId = serverProfileId
        let rowId = id
        var descriptor = FetchDescriptor<PendingAttachmentImport>(
            predicate: #Predicate { $0.id == rowId && $0.serverProfileId == profileId }
        )
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            context.delete(existing)
            try context.save()
        }
    }

    /// True when `noteId` still has a pending offline creation row (attachments must wait for server id).
    func hasPendingNoteCreation(noteId: String, serverProfileId: String) throws -> Bool {
        let profileId = serverProfileId
        let localId = noteId
        let rows = try context.fetch(
            FetchDescriptor<PendingNoteCreation>(
                predicate: #Predicate { $0.localNoteId == localId && $0.serverProfileId == profileId }
            )
        )
        return !rows.isEmpty
    }

    // MARK: - Sync Status

    func deleteSyncStatus(domain: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(domain)"
        var descriptor = FetchDescriptor<SyncStatus>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            context.delete(existing)
            try context.save()
        }
    }

    func fetchSyncStatuses(serverProfileId: String) throws -> [SyncStatus] {
        let profileId = serverProfileId
        return try context.fetch(
            FetchDescriptor<SyncStatus>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
    }

    // MARK: - Entity pull cursor (`/api/sync/changed`)

    // MARK: - Sync Helpers

    /// Which of `branchIds` are still cached (one indexed query per 500 ids, id column only).
    func fetchExistingBranchIds(among branchIds: some Collection<String>, serverProfileId: String) throws -> Set<String> {
        let profileId = serverProfileId
        var existing = Set<String>()
        for chunk in Array(branchIds).chunked(into: Self.idQueryChunkSize) {
            var descriptor = FetchDescriptor<CachedBranch>(
                predicate: #Predicate { chunk.contains($0.branchId) && $0.serverProfileId == profileId }
            )
            descriptor.propertiesToFetch = [\.branchId]
            existing.formUnion(try context.fetch(descriptor).map(\.branchId))
        }
        return existing
    }

    /// Whether notes created under `noteId` take their title from a `#titleTemplate`. Trilium reads it off the parent
    /// with inheritance: the parent's own label, one on the parent's `~template`, or an inheritable one on an ancestor.
    func hasEffectiveTitleTemplate(noteId: String, serverProfileId: String) -> Bool {
        func titleTemplateLabels(_ id: String) -> [CachedAttribute] {
            ((try? fetchCachedAttributes(noteId: id, serverProfileId: serverProfileId)) ?? [])
                .filter { $0.type == "label" && $0.name == "titleTemplate" }
        }

        let own = (try? fetchCachedAttributes(noteId: noteId, serverProfileId: serverProfileId)) ?? []
        if own.contains(where: { $0.type == "label" && $0.name == "titleTemplate" }) { return true }
        if let template = own.first(where: { $0.type == "relation" && $0.name == "template" })?.value,
           !titleTemplateLabels(template).isEmpty {
            return true
        }

        var visited: Set<String> = [noteId]
        var frontier = [noteId]
        while !frontier.isEmpty, visited.count < 200 {
            var next: [String] = []
            for id in frontier {
                let childId = id
                let profileId = serverProfileId
                let parents = ((try? context.fetch(FetchDescriptor<CachedBranch>(
                    predicate: #Predicate { $0.noteId == childId && $0.serverProfileId == profileId }
                ))) ?? []).map(\.parentNoteId)
                for parent in parents where visited.insert(parent).inserted {
                    if titleTemplateLabels(parent).contains(where: \.isInheritable) { return true }
                    next.append(parent)
                }
            }
            frontier = next
        }
        return false
    }

    // MARK: - Cache exclusion preferences

    func fetchExcludedRootNoteIds(serverProfileId: String) throws -> Set<String> {
        let profileId = serverProfileId
        let rows = try context.fetch(
            FetchDescriptor<CacheExcludedRootNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        return Set(rows.map(\.rootNoteId))
    }

    func setExcludedRootNoteIds(_ ids: Set<String>, serverProfileId: String) throws {
        let profileId = serverProfileId
        let existing = try context.fetch(
            FetchDescriptor<CacheExcludedRootNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        existing.forEach { context.delete($0) }
        for rootId in ids {
            context.insert(CacheExcludedRootNote(rootNoteId: rootId, serverProfileId: profileId))
        }
        try context.save()
    }

    /// Removes inline attachment/image rows referenced in cached HTML bodies for the given notes.
    func deleteCachedImagesReferencedInBodies(noteIds: Set<String>, serverProfileId: String) throws {
        let profileId = serverProfileId
        for noteId in noteIds {
            let nid = noteId
            guard let note = try fetchCachedNote(id: noteId, serverProfileId: profileId),
                  let content = note.content,
                  !content.isEmpty,
                  let html = String(data: content, encoding: .utf8)
            else { continue }

            let refs = TriliumInlineImageCaching.extractImageReferences(from: html)
            for ref in refs {
                let compositeId = "\(profileId):\(ref.routeType):\(ref.entityId)"
                var descriptor = FetchDescriptor<CachedImageData>(predicate: #Predicate { $0.id == compositeId })
                descriptor.fetchLimit = 1
                if let row = try context.fetch(descriptor).first {
                    context.delete(row)
                }
            }
        }
        try context.save()
    }

    /// Purges cached subtree when the root row exists locally; no-op if the root is not cached.
    func purgeCachedSubtreeIfRootCached(rootNoteId: String, serverProfileId: String) throws {
        guard try fetchCachedNote(id: rootNoteId, serverProfileId: serverProfileId) != nil else { return }
        let ids = cachedDescendantNoteIds(rootNoteId: rootNoteId, serverProfileId: serverProfileId)
        try deleteCachedImagesReferencedInBodies(noteIds: ids, serverProfileId: serverProfileId)
        try deleteCachedNotes(noteIds: ids, serverProfileId: serverProfileId)
    }

    // MARK: - Cache-if-allowed (cache exclusion)

    func cacheNoteIfAllowed(
        from response: NoteResponse,
        serverProfileId: String,
        policy: CacheExclusionPolicy
    ) throws {
        guard !policy.isNoteExcludedFromCache(
            noteId: response.noteId,
            parentNoteIds: response.parentNoteIds,
            serverProfileId: serverProfileId
        ) else { return }
        try cacheNote(from: response, serverProfileId: serverProfileId)
    }

    func cacheNoteContentIfAllowed(
        _ noteId: String,
        content: Data,
        parentNoteIds: [String],
        serverProfileId: String,
        utcDateModified: String? = nil,
        policy: CacheExclusionPolicy
    ) throws {
        guard !policy.isNoteExcludedFromCache(
            noteId: noteId,
            parentNoteIds: parentNoteIds,
            serverProfileId: serverProfileId
        ) else { return }
        try cacheNoteContent(noteId, content: content, serverProfileId: serverProfileId, utcDateModified: utcDateModified)
    }

    func cacheNoteBatchIfAllowed(
        from response: NoteResponse,
        serverProfileId: String,
        policy: CacheExclusionPolicy
    ) throws {
        try cacheNoteIfAllowed(from: response, serverProfileId: serverProfileId, policy: policy)
    }

    func cacheBranchIfAllowed(
        from response: BranchResponse,
        parentNoteIdsForNote: [String],
        serverProfileId: String,
        policy: CacheExclusionPolicy
    ) throws {
        guard !policy.isNoteExcludedFromCache(
            noteId: response.noteId,
            parentNoteIds: parentNoteIdsForNote,
            serverProfileId: serverProfileId
        ) else { return }
        try cacheBranch(from: response, serverProfileId: serverProfileId)
    }

    func cacheBranchBatchIfAllowed(
        from response: BranchResponse,
        parentNoteIdsForNote: [String],
        serverProfileId: String,
        policy: CacheExclusionPolicy
    ) throws {
        try cacheBranchIfAllowed(
            from: response,
            parentNoteIdsForNote: parentNoteIdsForNote,
            serverProfileId: serverProfileId,
            policy: policy
        )
    }

    func cacheAttributeBatchIfAllowed(
        from response: AttributeResponse,
        parentNoteIds: [String],
        serverProfileId: String,
        policy: CacheExclusionPolicy
    ) throws {
        guard !policy.isNoteExcludedFromCache(
            noteId: response.noteId,
            parentNoteIds: parentNoteIds,
            serverProfileId: serverProfileId
        ) else { return }
        try cacheAttributeBatch(from: response, serverProfileId: serverProfileId)
    }

    func cacheImageIfAllowed(
        entityId: String,
        entityType: String,
        data: Data,
        mime: String,
        sourceNoteId: String,
        parentNoteIds: [String],
        serverProfileId: String,
        policy: CacheExclusionPolicy
    ) throws {
        guard !policy.isNoteExcludedFromCache(
            noteId: sourceNoteId,
            parentNoteIds: parentNoteIds,
            serverProfileId: serverProfileId
        ) else { return }
        try cacheImage(
            entityId: entityId,
            entityType: entityType,
            data: data,
            mime: mime,
            serverProfileId: serverProfileId
        )
    }

    // MARK: - Image Cache

    /// Note bodies already stored locally (non-empty), for bulk image prefetch.
    func cachedNoteBodies(serverProfileId: String) throws -> [(noteId: String, content: Data)] {
        let profileId = serverProfileId
        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        var result: [(noteId: String, content: Data)] = []
        result.reserveCapacity(notes.count)
        for note in notes {
            guard let content = note.content, !content.isEmpty else { continue }
            result.append((note.noteId, content))
        }
        return result
    }

    func fetchCachedImage(entityId: String, entityType: String, serverProfileId: String) throws -> CachedImageData? {
        let id = "\(serverProfileId):\(entityType):\(entityId)"
        var descriptor = FetchDescriptor<CachedImageData>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    func cacheImage(entityId: String, entityType: String, data: Data, mime: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(entityType):\(entityId)"
        var descriptor = FetchDescriptor<CachedImageData>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.data = data
            existing.byteCount = data.count
            existing.mime = mime
            existing.fetchedAt = .now
        } else {
            let cached = CachedImageData(
                entityId: entityId, entityType: entityType,
                data: data, mime: mime, serverProfileId: serverProfileId
            )
            context.insert(cached)
        }
        try context.save()
    }

    // MARK: - Cleanup

    func clearCache(for serverProfileId: String) throws {
        let profileId = serverProfileId

        let notes = try context.fetch(FetchDescriptor<CachedNote>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        notes.forEach { context.delete($0) }

        let branches = try context.fetch(FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        branches.forEach { context.delete($0) }

        let attrs = try context.fetch(FetchDescriptor<CachedAttribute>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        attrs.forEach { context.delete($0) }

        let drafts = try context.fetch(FetchDescriptor<DraftContent>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        drafts.forEach { context.delete($0) }

        let pendingCreates = try context.fetch(FetchDescriptor<PendingNoteCreation>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        pendingCreates.forEach { context.delete($0) }

        let pendingBodies = try context.fetch(FetchDescriptor<PendingNoteBodyUpload>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        pendingBodies.forEach { context.delete($0) }

        let pendingMoves = try context.fetch(FetchDescriptor<PendingBranchMove>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        pendingMoves.forEach { context.delete($0) }

        let pendingDeletions = try context.fetch(FetchDescriptor<PendingNoteDeletion>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        pendingDeletions.forEach { context.delete($0) }

        let pendingPatches = try context.fetch(FetchDescriptor<PendingNotePatch>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        pendingPatches.forEach { context.delete($0) }

        let syncs = try context.fetch(FetchDescriptor<SyncStatus>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        syncs.forEach { context.delete($0) }

        let images = try context.fetch(FetchDescriptor<CachedImageData>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        images.forEach { context.delete($0) }

        let cursors = try context.fetch(FetchDescriptor<EntityPullCursor>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        cursors.forEach { context.delete($0) }

        try context.save()
    }

    func estimateCacheSize(for serverProfileId: String) throws -> Int {
        let profileId = serverProfileId
        let noteCount = try context.fetchCount(FetchDescriptor<CachedNote>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        let branchCount = try context.fetchCount(FetchDescriptor<CachedBranch>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        let attrCount = try context.fetchCount(FetchDescriptor<CachedAttribute>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        return noteCount + branchCount + attrCount
    }

    /// Estimates total size in bytes of cached note content and images.
    /// Sums the recorded body and image sizes, so the bodies themselves aren't read. Rows cached before sizes were
    /// recorded are measured (and their size recorded) once.
    func estimateCacheSizeInBytes(for serverProfileId: String) throws -> Int {
        let profileId = serverProfileId
        var total = 0
        var recordedSizes = false

        var noteDescriptor = FetchDescriptor<CachedNote>(
            predicate: #Predicate { $0.serverProfileId == profileId && $0.contentFetchedAt != nil }
        )
        noteDescriptor.propertiesToFetch = [\.contentByteCount]
        for note in try context.fetch(noteDescriptor) {
            if let count = note.contentByteCount {
                total += count
            } else {
                let count = note.content?.count ?? 0
                note.contentByteCount = count
                total += count
                recordedSizes = true
            }
        }

        var imageDescriptor = FetchDescriptor<CachedImageData>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        )
        imageDescriptor.propertiesToFetch = [\.byteCount]
        for image in try context.fetch(imageDescriptor) {
            if let count = image.byteCount {
                total += count
            } else {
                let count = image.data.count
                image.byteCount = count
                total += count
                recordedSizes = true
            }
        }

        if recordedSizes { try context.save() }
        return total
    }

    /// Sum of `estimateCacheSizeInBytes` across every saved `ServerProfile`.
    func estimateCacheSizeInBytesAllInstances() throws -> Int {
        let profiles = try fetchServerProfiles()
        return try profiles.reduce(0) { try $0 + estimateCacheSizeInBytes(for: $1.id) }
    }

    /// Runs `clearCache(for:)` for each profile (does not delete profiles or keychain sessions).
    func clearCacheAllInstances() throws {
        for p in try fetchServerProfiles() {
            try clearCache(for: p.id)
        }
    }
}

// MARK: - Persistence errors

enum PersistenceError: LocalizedError {
    case tooManyServerProfiles(max: Int)

    var errorDescription: String? {
        switch self {
        case .tooManyServerProfiles(let max):
            String(
                localized: "You can sign in to at most \(max) server instances.",
                comment: "Error when adding another Trilium server profile beyond the limit"
            )
        }
    }
}
