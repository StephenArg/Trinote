import Foundation
import SwiftData

/// Per-server rules for which top-level notebooks (children of Trilium `root`) are excluded from offline cache.
@MainActor
final class CacheExclusionPolicy {
    private let persistence: PersistenceManager

    init(persistence: PersistenceManager = .shared) {
        self.persistence = persistence
    }

    func excludedRootNoteIds(serverProfileId: String) -> Set<String> {
        (try? persistence.fetchExcludedRootNoteIds(serverProfileId: serverProfileId)) ?? []
    }

    func setExcludedRootNoteIds(_ ids: Set<String>, serverProfileId: String) throws {
        try persistence.setExcludedRootNoteIds(ids, serverProfileId: serverProfileId)
    }

    /// Drops exclusions for notebooks that are no longer direct children of `root` (deleted or moved).
    /// Only runs when `authoritativeLiveList` is true (e.g. live ids from `getNoteWithBranches(root)`).
    /// Branch-derived or reconciled `childNoteIds` omit cache-excluded notebooks and must not drive pruning.
    func pruneStaleExcludedRoots(
        liveRootChildIds: Set<String>,
        serverProfileId: String,
        authoritativeLiveList: Bool = false
    ) throws {
        guard authoritativeLiveList else { return }

        let current = excludedRootNoteIds(serverProfileId: serverProfileId)
        guard !current.isEmpty else { return }

        let pruned = current.intersection(liveRootChildIds)
        if pruned != current {
            try setExcludedRootNoteIds(pruned, serverProfileId: serverProfileId)
        }
    }

    /// Top-level notebook ids under Trilium `root` (prefer `root` note `childNoteIds` so excluded roots stay listed).
    func liveRootChildNoteIds(serverProfileId: String) -> Set<String> {
        let hidden = TriliumSharing.hiddenSystemChildNoteIds
        if let root = try? persistence.fetchCachedNote(
            id: TriliumTreeConstants.rootNoteId,
            serverProfileId: serverProfileId
        ) {
            return Set(root.childNoteIds.filter { !hidden.contains($0) })
        }
        let pairs = (try? persistence.fetchCachedChildren(
            parentNoteId: TriliumTreeConstants.rootNoteId,
            serverProfileId: serverProfileId
        )) ?? []
        return Set(pairs.map(\.1.noteId).filter { !hidden.contains($0) })
    }

    /// Removes one exclusion row when a top-level notebook was deleted on the server.
    func removeExcludedRootNoteIfNeeded(noteId: String, serverProfileId: String) throws {
        var excluded = excludedRootNoteIds(serverProfileId: serverProfileId)
        guard excluded.remove(noteId) != nil else { return }
        try setExcludedRootNoteIds(excluded, serverProfileId: serverProfileId)
    }

    func isNoteExcludedFromCache(
        noteId: String,
        parentNoteIds: [String],
        serverProfileId: String
    ) -> Bool {
        let excludedRoots = excludedRootNoteIds(serverProfileId: serverProfileId)
        guard !excludedRoots.isEmpty else { return false }

        if excludedRoots.contains(noteId) { return true }

        let descendants = descendantNoteIds(ofExcludedRoots: excludedRoots, serverProfileId: serverProfileId)
        guard descendants.contains(noteId) else { return false }

        return !hasParentOutsideExcludedSubtrees(
            parentNoteIds: parentNoteIds,
            excludedRoots: excludedRoots,
            serverProfileId: serverProfileId
        )
    }

    /// All note ids in excluded roots' subtrees (union), including the roots themselves.
    func descendantNoteIds(ofExcludedRoots: Set<String>, serverProfileId: String) -> Set<String> {
        var result = Set<String>()
        for rootId in ofExcludedRoots {
            result.formUnion(
                persistence.cachedDescendantNoteIds(rootNoteId: rootId, serverProfileId: serverProfileId)
            )
        }
        return result
    }

    /// True when this id is an excluded root (do not traverse children during full sync walk).
    func isExcludedRootNote(_ noteId: String, serverProfileId: String) -> Bool {
        excludedRootNoteIds(serverProfileId: serverProfileId).contains(noteId)
    }

    // MARK: - Private

    private func hasParentOutsideExcludedSubtrees(
        parentNoteIds: [String],
        excludedRoots: Set<String>,
        serverProfileId: String
    ) -> Bool {
        for parentId in parentNoteIds {
            if parentId == TriliumTreeConstants.rootNoteId { return true }
            if excludedRoots.contains(parentId) { continue }
            var inAnyExcludedSubtree = false
            for rootId in excludedRoots {
                let subtree = persistence.cachedDescendantNoteIds(
                    rootNoteId: rootId,
                    serverProfileId: serverProfileId
                )
                if subtree.contains(parentId) {
                    inAnyExcludedSubtree = true
                    break
                }
            }
            if !inAnyExcludedSubtree { return true }
        }
        return false
    }
}
