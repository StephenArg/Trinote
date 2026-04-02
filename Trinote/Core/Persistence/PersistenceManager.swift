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
                FavoriteNote.self,
                RecentSearch.self,
                DraftContent.self,
                PendingNoteCreation.self,
                PendingNoteBodyUpload.self,
                PendingNotePatch.self,
                PendingNoteDeletion.self,
                PendingBranchMove.self,
                SyncStatus.self,
                CachedImageData.self,
                EntityPullCursor.self,
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
    }

    /// For testing: create with a specific container
    init(container: ModelContainer) {
        self.container = container
        self.isMemoryOnly = true
    }

    var context: ModelContext { container.mainContext }
    var isUsingMemoryFallback: Bool { isMemoryOnly }

    // MARK: - Server Profiles

    func fetchServerProfiles() throws -> [ServerProfile] {
        let descriptor = FetchDescriptor<ServerProfile>(sortBy: [SortDescriptor(\.dateAdded)])
        return try context.fetch(descriptor)
    }

    func activeProfile() throws -> ServerProfile? {
        var descriptor = FetchDescriptor<ServerProfile>(predicate: #Predicate { $0.isActive })
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    func saveProfile(_ profile: ServerProfile) throws {
        context.insert(profile)
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
                serverProfileId: serverProfileId
            )
            context.insert(cached)
        }
    }

    func cacheNoteContent(_ noteId: String, content: Data, serverProfileId: String, utcDateModified: String? = nil) throws {
        if let existing = try fetchCachedNote(id: noteId, serverProfileId: serverProfileId) {
            existing.content = content
            existing.contentFetchedAt = .now
            if let date = utcDateModified {
                existing.utcDateModified = date
            }
            try context.save()
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

    // MARK: - Batch Cache (no save per-item; caller calls commitBatch)

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

    // MARK: - Full sync tree walk (prefetch + upsert without redundant existence checks)

    func prefetchExistingNoteIds(serverProfileId: String) throws -> Set<String> {
        let profileId = serverProfileId
        let rows = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        return Set(rows.map(\.noteId))
    }

    func prefetchExistingBranchIds(serverProfileId: String) throws -> Set<String> {
        let profileId = serverProfileId
        let rows = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        return Set(rows.map(\.branchId))
    }

    func prefetchExistingAttributeIds(serverProfileId: String) throws -> Set<String> {
        let profileId = serverProfileId
        let rows = try context.fetch(
            FetchDescriptor<CachedAttribute>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        return Set(rows.map(\.attributeId))
    }

    func cacheNoteBatchForFullSync(from response: NoteResponse, serverProfileId: String, knownExisting: inout Set<String>) throws {
        if knownExisting.contains(response.noteId) {
            guard let existing = try fetchCachedNote(id: response.noteId, serverProfileId: serverProfileId) else {
                knownExisting.remove(response.noteId)
                try cacheNoteBatchForFullSync(from: response, serverProfileId: serverProfileId, knownExisting: &knownExisting)
                return
            }
            existing.title = response.title
            existing.noteType = response.type
            existing.mime = response.mime
            existing.isProtected = response.isProtected
            existing.parentNoteIds = response.parentNoteIds
            existing.childNoteIds = response.childNoteIds
            existing.parentBranchIds = response.parentBranchIds
            existing.childBranchIds = response.childBranchIds
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
                serverProfileId: serverProfileId
            )
            context.insert(cached)
            knownExisting.insert(response.noteId)
        }
    }

    func cacheBranchBatchForFullSync(from response: BranchResponse, serverProfileId: String, knownExisting: inout Set<String>) throws {
        if knownExisting.contains(response.branchId) {
            guard let existing = try fetchCachedBranchById(branchId: response.branchId, serverProfileId: serverProfileId) else {
                knownExisting.remove(response.branchId)
                try cacheBranchBatchForFullSync(from: response, serverProfileId: serverProfileId, knownExisting: &knownExisting)
                return
            }
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
            knownExisting.insert(response.branchId)
        }
    }

    func cacheAttributeBatchForFullSync(from response: AttributeResponse, serverProfileId: String, knownExisting: inout Set<String>) throws {
        if knownExisting.contains(response.attributeId) {
            guard let existing = try fetchCachedAttributeById(attributeId: response.attributeId, serverProfileId: serverProfileId) else {
                knownExisting.remove(response.attributeId)
                try cacheAttributeBatchForFullSync(from: response, serverProfileId: serverProfileId, knownExisting: &knownExisting)
                return
            }
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
            knownExisting.insert(response.attributeId)
        }
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

    private func fetchCachedAttributeById(attributeId: String, serverProfileId: String) throws -> CachedAttribute? {
        let aid = attributeId
        let profileId = serverProfileId
        var descriptor = FetchDescriptor<CachedAttribute>(
            predicate: #Predicate { $0.attributeId == aid && $0.serverProfileId == profileId }
        )
        descriptor.fetchLimit = 1
        return try context.fetch(descriptor).first
    }

    // MARK: - Cached Branches

    func cacheBranch(from response: BranchResponse, serverProfileId: String) throws {
        try cacheBranchInternal(from: response, serverProfileId: serverProfileId)
        try context.save()
    }

    private func cacheBranchInternal(from response: BranchResponse, serverProfileId: String) throws {
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

    // MARK: - Cached Tree (recursive retrieval)

    func fetchCachedChildren(parentNoteId: String, serverProfileId: String) throws -> [(CachedBranch, CachedNote)] {
        let parentId = parentNoteId
        let profileId = serverProfileId
        let branches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.parentNoteId == parentId && $0.serverProfileId == profileId },
                sortBy: [SortDescriptor(\.notePosition)]
            )
        )

        var results: [(CachedBranch, CachedNote)] = []
        for branch in branches {
            let noteId = branch.noteId
            let pid = profileId
            if let note = try context.fetch(
                FetchDescriptor<CachedNote>(
                    predicate: #Predicate { $0.noteId == noteId && $0.serverProfileId == pid }
                )
            ).first {
                results.append((branch, note))
            }
        }
        return results
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

    /// Child note ids whose cached `parentNoteIds` includes `parentNoteId` (ordered by title).
    /// Used when `CachedNote.childNoteIds` and `CachedBranch` under the parent are both empty after incremental sync, but child rows were synced with parent pointers.
    /// Fetches by profile then filters in memory — SwiftData `#Predicate` + `.contains` on persisted `[String]` is unreliable across OS versions.
    func fetchChildNoteIdsReferencingParent(parentNoteId: String, serverProfileId: String) throws -> [String] {
        let parentId = parentNoteId
        let profileId = serverProfileId
        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        return notes
            .filter { $0.parentNoteIds.contains(parentId) }
            .sorted { $0.title.localizedStandardCompare($1.title) == .orderedAscending }
            .map(\.noteId)
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
        // Fresh cache + parentNoteIds from getNote — best time to resolve top-level notebook icon.
        let rowIcon = recentsRowIconSystemName(noteId: noteId, fallbackNoteType: noteType, serverProfileId: serverProfileId)
        if let existing = try context.fetch(descriptor).first {
            existing.accessedAt = .now
            existing.title = title
            existing.listIconSystemName = rowIcon
        } else {
            let recent = RecentNote(
                noteId: noteId,
                title: title,
                noteType: noteType,
                serverProfileId: serverProfileId,
                listIconSystemName: rowIcon
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

        return segments.joined(separator: " -> ")
    }

    /// SF Symbol for a recents row: matches the note directly under `root` on the path to `noteId`
    /// (Trilium “top-level” notebook). Uses that note’s `iconClass` + type; falls back to `fallbackNoteType` if cache is missing.
    func recentsRowIconSystemName(noteId: String, fallbackNoteType: String, serverProfileId: String) -> String {
        guard let topId = topLevelNoteIdUnderRoot(noteId: noteId, serverProfileId: serverProfileId),
              let cached = try? fetchCachedNote(id: topId, serverProfileId: serverProfileId)
        else {
            return (NoteType(rawValue: fallbackNoteType) ?? .text).iconName
        }
        let type = NoteType(rawValue: cached.noteType) ?? .text
        let attrs = (try? fetchCachedAttributes(noteId: topId, serverProfileId: serverProfileId)) ?? []
        // Match `NoteItem` / tree: iconClass is a label attribute.
        let iconClass = attrs.first { $0.name == "iconClass" && $0.type == "label" }?.value
            ?? attrs.first { $0.name == "iconClass" }?.value
        return NoteIconMapper.sfSymbol(for: iconClass) ?? type.iconName
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

    /// `rootNoteId` plus any descendant note IDs reachable via cached `childNoteIds` (BFS).
    func cachedDescendantNoteIds(rootNoteId: String, serverProfileId: String) -> Set<String> {
        var result: Set<String> = [rootNoteId]
        var queue: [String] = [rootNoteId]
        while !queue.isEmpty {
            let id = queue.removeFirst()
            guard let note = try? fetchCachedNote(id: id, serverProfileId: serverProfileId) else { continue }
            for child in note.childNoteIds where !result.contains(child) {
                result.insert(child)
                queue.append(child)
            }
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
        initialAttributes: [NoteCreationAttribute] = []
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
                if a.isInheritable {
                    return ["type": a.type, "name": a.name, "value": a.value, "isInheritable": true]
                }
                return ["type": a.type, "name": a.name, "value": a.value]
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
            initialAttributesJSON: attrsJSON
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

    /// Moves drafts, favorites, recents, and pending body uploads from a placeholder id to the server id.
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

        let oldDraftId = "\(profileId):\(from)"
        var draftDesc = FetchDescriptor<DraftContent>(predicate: #Predicate { $0.id == oldDraftId })
        draftDesc.fetchLimit = 1
        if let d = try context.fetch(draftDesc).first {
            d.noteId = newId
            d.id = "\(profileId):\(newId)"
        }

        let oldFavId = "\(profileId):\(from)"
        var favDesc = FetchDescriptor<FavoriteNote>(predicate: #Predicate { $0.id == oldFavId })
        favDesc.fetchLimit = 1
        if let f = try context.fetch(favDesc).first {
            f.noteId = newId
            f.id = "\(profileId):\(newId)"
        }

        let oldRecentId = "\(profileId):\(from)"
        var recentDesc = FetchDescriptor<RecentNote>(predicate: #Predicate { $0.id == oldRecentId })
        recentDesc.fetchLimit = 1
        if let r = try context.fetch(recentDesc).first {
            r.noteId = newId
            r.id = "\(profileId):\(newId)"
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
    func enqueueOfflineNoteDeletion(noteId: String, serverProfileId: String) throws {
        let profileId = serverProfileId

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
        try deleteCachedNotes(noteIds: [noteId], serverProfileId: profileId)

        let pending = PendingNoteDeletion(
            serverProfileId: profileId,
            noteId: noteId
        )
        context.insert(pending)
        try context.save()
        try reconcileCachedNoteBranchesMetadata(serverProfileId: profileId)
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

    /// Saves a pending title change. Upserts: last title wins per note.
    func upsertPendingNotePatch(noteId: String, title: String, serverProfileId: String) throws {
        let rowId = "\(serverProfileId):\(noteId)"
        var descriptor = FetchDescriptor<PendingNotePatch>(predicate: #Predicate { $0.id == rowId })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            existing.title = title
            existing.queuedAt = .now
        } else {
            let row = PendingNotePatch(
                serverProfileId: serverProfileId,
                noteId: noteId,
                title: title
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
        if let existing = try context.fetch(descriptor).first {
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

    // MARK: - Sync Status

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

    func deleteSyncStatus(domain: String, serverProfileId: String) throws {
        let id = "\(serverProfileId):\(domain)"
        var descriptor = FetchDescriptor<SyncStatus>(predicate: #Predicate { $0.id == id })
        descriptor.fetchLimit = 1
        if let existing = try context.fetch(descriptor).first {
            context.delete(existing)
            try context.save()
        }
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

    func fetchSyncStatuses(serverProfileId: String) throws -> [SyncStatus] {
        let profileId = serverProfileId
        return try context.fetch(
            FetchDescriptor<SyncStatus>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
    }

    // MARK: - Entity pull cursor (`/api/sync/changed`)

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

    // MARK: - Sync Helpers

    func fetchAllCachedNoteIds(serverProfileId: String) throws -> [String] {
        let profileId = serverProfileId
        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        return notes.map(\.noteId)
    }

    func fetchAllCachedBranchIds(serverProfileId: String) throws -> [String] {
        let profileId = serverProfileId
        let branches = try context.fetch(
            FetchDescriptor<CachedBranch>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        return branches.map(\.branchId)
    }

    /// Deletes cached notes (and their branches/attributes) for the profile.
    func deleteCachedNotes(noteIds: [String], serverProfileId: String) throws {
        try deleteCachedNotes(noteIds: Set(noteIds), serverProfileId: serverProfileId)
    }

    func deleteCachedNotes(noteIds: Set<String>, serverProfileId: String) throws {
        let profileId = serverProfileId
        for noteId in noteIds {
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

    /// Returns note IDs from `serverModifiedAfter` that need their content downloaded.
    /// A note needs content if: it has no cached content, or the server's
    /// `utcDateModified` is newer than the cached version.
    func fetchNotesNeedingContent(serverProfileId: String, serverModifiedAfter: [String: String]) throws -> [String] {
        let profileId = serverProfileId
        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId && $0.isProtected == false }
            )
        )
        let notesByID = Dictionary(uniqueKeysWithValues: notes.map { ($0.noteId, $0) })

        // Use `contentFetchedAt`, not `content == nil`, so SwiftData does not fault every `@Attribute(.externalStorage)` blob during sync.
        return serverModifiedAfter.compactMap { (noteId, serverDate) in
            guard let cached = notesByID[noteId] else {
                return noteId
            }
            if cached.contentFetchedAt == nil { return noteId }
            guard let cachedDate = cached.utcDateModified else { return noteId }
            return serverDate > cachedDate ? noteId : nil
        }
    }

    /// Same staleness rules as `fetchNotesNeedingContent`, for **protected** notes (after a protected session exists on the server).
    func fetchProtectedNotesNeedingContent(serverProfileId: String, serverModifiedAfter: [String: String]) throws -> [String] {
        let profileId = serverProfileId
        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId && $0.isProtected == true }
            )
        )
        let notesByID = Dictionary(uniqueKeysWithValues: notes.map { ($0.noteId, $0) })

        return serverModifiedAfter.compactMap { (noteId, serverDate) in
            guard let cached = notesByID[noteId] else {
                return noteId
            }
            if cached.contentFetchedAt == nil { return noteId }
            guard let cachedDate = cached.utcDateModified else { return noteId }
            return serverDate > cachedDate ? noteId : nil
        }
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
    func reconcileCachedNoteBranchesMetadata(serverProfileId: String) throws {
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
            byParent[key]?.sort { $0.pos < $1.pos }
        }

        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )

        for n in notes {
            let outs = byParent[n.noteId] ?? []
            n.childBranchIds = outs.map(\.branchId)
            n.childNoteIds = outs.map(\.noteId)

            let ins = (byChild[n.noteId] ?? []).sorted { $0.branchId < $1.branchId }
            n.parentBranchIds = ins.map(\.branchId)
            n.parentNoteIds = ins.map(\.parentNoteId)
        }

        try context.save()
    }

    // MARK: - Image Cache

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
    func estimateCacheSizeInBytes(for serverProfileId: String) throws -> Int {
        let profileId = serverProfileId
        let notes = try context.fetch(
            FetchDescriptor<CachedNote>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        var total = 0
        for note in notes {
            total += note.content?.count ?? 0
        }
        let images = try context.fetch(
            FetchDescriptor<CachedImageData>(
                predicate: #Predicate { $0.serverProfileId == profileId }
            )
        )
        for img in images {
            total += img.data.count
        }
        return total
    }
}
