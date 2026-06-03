import Foundation

/// Applies cache-exclusion preference changes: purge excluded subtrees and re-sync re-included roots.
@MainActor
enum CacheExclusionCoordinator {
    static func applyPreferenceChanges(
        newlyExcluded: Set<String>,
        newlyIncluded: Set<String>,
        profileId: String,
        client: any TriliumClientProtocol,
        syncManager: SyncManager,
        persistence: PersistenceManager = .shared,
        policy: CacheExclusionPolicy = CacheExclusionPolicy()
    ) async {
        for rootId in newlyExcluded {
            try? persistence.purgeCachedSubtreeIfRootCached(rootNoteId: rootId, serverProfileId: profileId)
        }

        for rootId in newlyIncluded {
            while syncManager.isSyncing {
                try? await Task.sleep(nanoseconds: 200_000_000)
            }
            syncManager.syncSubtree(client: client, profileId: profileId, rootNoteId: rootId)
            while syncManager.isSyncing {
                try? await Task.sleep(nanoseconds: 200_000_000)
            }
        }

        if !newlyIncluded.isEmpty {
            await cacheTopLevelPlacementBranchesUnderTriliumRoot(
                notebookIds: newlyIncluded,
                client: client,
                profileId: profileId,
                persistence: persistence
            )
        }

        await pruneExcludedRootsAgainstServerRootChildren(
            client: client,
            profileId: profileId,
            policy: policy
        )

        var userInfo: [String: Any]?
        if !newlyIncluded.isEmpty {
            userInfo = [Notification.Name.trinoteTreeReloadFromServerUserInfoKey: true]
        }
        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil, userInfo: userInfo)
    }

    private static func pruneExcludedRootsAgainstServerRootChildren(
        client: any TriliumClientProtocol,
        profileId: String,
        policy: CacheExclusionPolicy
    ) async {
        do {
            let (_, branches) = try await client.getNoteWithBranches(TriliumTreeConstants.rootNoteId)
            let hidden = TriliumSharing.hiddenSystemChildNoteIds
            let live = Set(branches.map(\.noteId).filter { !hidden.contains($0) })
            try policy.pruneStaleExcludedRoots(
                liveRootChildIds: live,
                serverProfileId: profileId,
                authoritativeLiveList: true
            )
        } catch {
            Log.sync.debug("pruneExcludedRootsAgainstServerRootChildren skipped: \(error)")
        }
    }

    /// Subtree sync walks from the notebook downward; restore `root` → notebook branches so the tree list can load re-included notebooks from cache.
    private static func cacheTopLevelPlacementBranchesUnderTriliumRoot(
        notebookIds: Set<String>,
        client: any TriliumClientProtocol,
        profileId: String,
        persistence: PersistenceManager
    ) async {
        do {
            let (_, branches) = try await client.getNoteWithBranches(TriliumTreeConstants.rootNoteId)
            var knownBranchIds = (try? persistence.prefetchExistingBranchIds(serverProfileId: profileId)) ?? []
            var knownNoteIds = (try? persistence.prefetchExistingNoteIds(serverProfileId: profileId)) ?? []
            for branch in branches where notebookIds.contains(branch.noteId) {
                try? persistence.cacheBranchBatchForFullSync(
                    from: branch,
                    serverProfileId: profileId,
                    knownExisting: &knownBranchIds
                )
                if !knownNoteIds.contains(branch.noteId) {
                    let note = try await client.getNote(branch.noteId)
                    try? persistence.cacheNoteBatchForFullSync(
                        from: note,
                        serverProfileId: profileId,
                        knownExisting: &knownNoteIds
                    )
                }
            }
            try? persistence.commitBatch()
            try? persistence.reconcileCachedNoteBranchesMetadata(
                forNoteId: TriliumTreeConstants.rootNoteId,
                serverProfileId: profileId
            )
        } catch {
            Log.sync.warning("cacheTopLevelPlacementBranchesUnderTriliumRoot failed: \(error)")
        }
    }
}
