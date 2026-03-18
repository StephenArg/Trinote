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
                RecentSearch.self,
                DraftContent.self,
                SyncStatus.self,
                CachedImageData.self,
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
            let recent = RecentNote(noteId: noteId, title: title, noteType: noteType, serverProfileId: serverProfileId)
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

        return serverModifiedAfter.compactMap { (noteId, serverDate) in
            guard let cached = notesByID[noteId] else {
                return noteId
            }
            if cached.content == nil { return noteId }
            guard let cachedDate = cached.utcDateModified else { return noteId }
            return serverDate > cachedDate ? noteId : nil
        }
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

        let syncs = try context.fetch(FetchDescriptor<SyncStatus>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        syncs.forEach { context.delete($0) }

        let images = try context.fetch(FetchDescriptor<CachedImageData>(
            predicate: #Predicate { $0.serverProfileId == profileId }
        ))
        images.forEach { context.delete($0) }

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
