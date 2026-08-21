import Foundation

/// Loads missing child branches + notes for a parent via one (or chunked) `fullSyncFetchTreeBatch`
/// instead of N parallel `getBranch` + N `getNote` calls (each of which fires its own `tree/load`).
enum TreeChildBatchLoader {
    /// Matches `SyncManager.treeWalkBatchSize`.
    static let chunkSize = 50

    /// Populates `branchCache` / `noteCache` for `parentNote`'s direct children when anything is missing.
    /// No-ops when every child branch and note is already cached.
    static func populateCachesIfNeeded(
        parentNote: NoteItem,
        client: any TriliumClientProtocol,
        branchCache: inout [String: BranchItem],
        noteCache: inout [String: NoteItem]
    ) async throws {
        guard !parentNote.childBranchIds.isEmpty else { return }

        let needsBranches = parentNote.childBranchIds.contains { branchCache[$0] == nil }
        let missingNoteIds = parentNote.childNoteIds.filter { noteCache[$0] == nil }
        guard needsBranches || !missingNoteIds.isEmpty else { return }

        var remainingChildren = missingNoteIds.filter { $0 != parentNote.noteId }
        var isFirstChunk = true

        while isFirstChunk || !remainingChildren.isEmpty {
            var chunk: [String] = []
            if isFirstChunk {
                chunk.append(parentNote.noteId)
                let childCapacity = chunkSize - 1
                let take = min(childCapacity, remainingChildren.count)
                chunk.append(contentsOf: remainingChildren.prefix(take))
                remainingChildren.removeFirst(take)
                isFirstChunk = false
            } else {
                let take = min(chunkSize, remainingChildren.count)
                chunk.append(contentsOf: remainingChildren.prefix(take))
                remainingChildren.removeFirst(take)
            }

            let entries = try await client.fullSyncFetchTreeBatch(noteIds: chunk)
            apply(entries: entries, parentNoteId: parentNote.noteId, branchCache: &branchCache, noteCache: &noteCache)
        }
    }

    private static func apply(
        entries: [FullSyncTreeBatchEntry],
        parentNoteId: String,
        branchCache: inout [String: BranchItem],
        noteCache: inout [String: NoteItem]
    ) {
        for entry in entries {
            if entry.note.noteId == parentNoteId {
                for branch in entry.childBranches {
                    branchCache[branch.branchId] = BranchItem(from: branch)
                }
            }
            if entry.note.isDeleted { continue }
            noteCache[entry.note.noteId] = NoteItem(from: entry.note)
        }
    }
}
