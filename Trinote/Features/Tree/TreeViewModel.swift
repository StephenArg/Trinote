import Foundation
import Observation
import SwiftData
import SwiftUI

struct FlatTreeNode: Identifiable, Equatable {
    let node: TreeNode
    let depth: Int
    var id: String { node.id }
}

@Observable
@MainActor
final class TreeViewModel {
    private(set) var visibleNodes: [FlatTreeNode] = []
    var isLoading = false
    var isRefreshing = false
    var error: String?
    var isFromCache = false

    /// Trilium system notes that should not appear in the tree.
    private static let hiddenNoteIds: Set<String> = TriliumSharing.hiddenSystemChildNoteIds

    private var noteCache: [String: NoteItem] = [:]
    private var branchCache: [String: BranchItem] = [:]
    private var expandedBranches: Set<String> = []
    private var _rootChildren: [TreeNode] = []

    private let appState: AppState
    private let parentNoteId: String
    private let persistence = PersistenceManager.shared
    private let cacheExclusion = CacheExclusionPolicy()

    init(appState: AppState, parentNoteId: String = "root") {
        self.appState = appState
        self.parentNoteId = parentNoteId
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }

    var rootChildren: [TreeNode] {
        get { _rootChildren }
        set {
            _rootChildren = newValue
            rebuildVisibleNodes(animated: true)
        }
    }

    private func rebuildVisibleNodes(animated: Bool = true) {
        var result: [FlatTreeNode] = []
        flatten(_rootChildren, depth: 0, into: &result)
        if animated {
            withAnimation(.easeInOut(duration: 0.15)) {
                visibleNodes = result
            }
        } else {
            visibleNodes = result
        }
    }

    /// Updates one note’s metadata everywhere it appears (e.g. `parentNoteIds` after share) without reloading the whole tree.
    /// Also writes through to SwiftData when a profile is active so `reloadFromCache()` after sync does not resurrect stale parents/labels.
    func applyNoteMetadataPatch(noteId: String, newNote: NoteItem, animateList: Bool = false) {
        noteCache[noteId] = newNote
        _rootChildren = Self.replaceNoteInTreeNodes(_rootChildren, noteId: noteId, newNote: newNote)
        rebuildVisibleNodes(animated: animateList)
        if let profileId = serverProfileId {
            let response = NoteResponse(forSwiftDataCache: newNote)
            try? persistence.cacheNoteIfAllowed(from: response, serverProfileId: profileId, policy: cacheExclusion)
            try? persistence.commitBatch()
            for attr in response.attributes {
                try? persistence.cacheAttributeBatchIfAllowed(
                    from: attr,
                    parentNoteIds: response.parentNoteIds,
                    serverProfileId: profileId,
                    policy: cacheExclusion
                )
            }
            try? persistence.commitBatch()
        }
    }

    /// Toggles public sharing for a note and patches the in-memory tree (no full reload).
    func performPublicShareToggle(noteId: String, client: any TriliumClientProtocol) async throws -> NoteItem {
        let fresh = try await client.getNote(noteId)
        let item = NoteItem(from: fresh)
        let shared = try await TriliumSharing.resolveIsPubliclyShared(note: item, client: client)
        try await TriliumSharing.mutatePublicSharing(
            noteId: item.noteId,
            noteForAttributes: item,
            enable: !shared,
            client: client
        )
        let after = try await client.getNote(noteId)
        let patched = NoteItem(from: after)
        applyNoteMetadataPatch(noteId: patched.noteId, newNote: patched, animateList: false)
        return patched
    }

    private static func replaceNoteInTreeNodes(_ nodes: [TreeNode], noteId: String, newNote: NoteItem) -> [TreeNode] {
        nodes.map { node in
            let nextChildren: [TreeNode]? = node.children.map { replaceNoteInTreeNodes($0, noteId: noteId, newNote: newNote) }
            if node.note.noteId == noteId {
                return TreeNode(branch: node.branch, note: newNote, children: nextChildren, isLoading: node.isLoading)
            }
            return TreeNode(branch: node.branch, note: node.note, children: nextChildren, isLoading: node.isLoading)
        }
    }

    private func flatten(_ nodes: [TreeNode], depth: Int, into result: inout [FlatTreeNode]) {
        for node in nodes {
            result.append(FlatTreeNode(node: node, depth: depth))
            if let children = node.children {
                flatten(children, depth: depth + 1, into: &result)
            }
        }
    }

    // MARK: - Loading

    /// Prevents a hung `getNote` / child fetch after reconnect from leaving `isRefreshing` stuck indefinitely.
    private func loadTreeFromServerWithTimeout(client: any TriliumClientProtocol, seconds: TimeInterval) async throws -> (NoteResponse, [TreeNode]) {
        try await withThrowingTaskGroup(of: (NoteResponse, [TreeNode]).self) { group in
            group.addTask { @MainActor [self] in
                let pn = try await client.getNote(parentNoteId)
                let pi = NoteItem(from: pn)
                noteCache[parentNoteId] = pi
                let ch = try await loadChildren(of: pi, client: client)
                return (pn, ch)
            }
            group.addTask {
                try await Task.sleep(nanoseconds: UInt64(seconds * 1_000_000_000))
                throw APIError.timeout
            }
            defer { group.cancelAll() }
            return try await group.next()!
        }
    }

    func loadTree() async {
        let isFirstLoad = rootChildren.isEmpty
        if isFirstLoad {
            loadTreeFromCache()
            isLoading = rootChildren.isEmpty
        } else {
            isRefreshing = true
        }
        error = nil

        defer {
            isLoading = false
            isRefreshing = false
        }

        if !appState.isOnline {
            // First load already called `loadTreeFromCache` above; on pull-to-refresh, re-read SwiftData.
            if !isFirstLoad {
                reloadFromCache()
            }
            return
        }

        guard client != nil else {
            if rootChildren.isEmpty { error = "Not connected" }
            return
        }

        // First paint: show SwiftData immediately; fetch the live tree in the background so launch is not blocked.
        if isFirstLoad {
            Task { @MainActor in
                await self.loadFreshTreeFromServer()
            }
            return
        }

        await loadFreshTreeFromServer()
    }

    /// Loads root children from the server, updates the in-memory tree, and persists to SwiftData.
    private func loadFreshTreeFromServer() async {
        guard let client else {
            if rootChildren.isEmpty { error = "Not connected" }
            return
        }

        do {
            // Cold launch runs this in parallel with bootstrap’s `restoreSession`; tree APIs need CSRF (`postJSON` csrf: true) or they throw `noToken` while cookies are valid.
            try await client.restoreSession()
            let (parentNote, children) = try await loadTreeFromServerWithTimeout(client: client, seconds: 120)
            error = nil
            rootChildren = children
            isFromCache = false

            if let profileId = serverProfileId {
                let liveBranchIds = Set(children.map(\.branch.branchId))
                try? persistence.pruneStaleBranchesUnderParent(
                    parentNoteId: parentNoteId,
                    liveBranchIds: liveBranchIds,
                    serverProfileId: profileId,
                    hiddenNoteIds: Self.hiddenNoteIds
                )
            }

            persistTreeBatch(rootNote: parentNote)

            if let profileId = serverProfileId {
                try? persistence.updateSyncStatus(domain: "tree", serverProfileId: profileId)
            }
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }

            self.error = apiError.localizedDescription
            Log.api.error("Failed to load tree: \(error)")

            // Server fetch failed — show the latest cached data (sync may have
            // applied deletions that the stale in-memory tree doesn't reflect).
            let cached = loadCachedChildren(parentNoteId: parentNoteId)
            if !cached.isEmpty {
                rootChildren = attachExpandedCachedChildren(nodes: cached)
                isFromCache = true
            }

            if let profileId = serverProfileId {
                try? persistence.recordSyncError(domain: "tree", error: apiError.localizedDescription ?? "Unknown", serverProfileId: profileId)
            }
        }
    }

    func reorderNodes(from source: IndexSet, to destination: Int) {
        guard let fromIndex = source.first, let client else { return }

        let nodes = visibleNodes
        guard fromIndex < nodes.count else { return }

        let movedDepth: Int = nodes[fromIndex].depth
        let movedBranchId: String = nodes[fromIndex].node.branch.branchId

        let parentNode: TreeNode? = findParentNode(at: fromIndex, depth: movedDepth, in: nodes)

        let oldChildren: [TreeNode] = resolveChildren(parent: parentNode)
        guard !oldChildren.isEmpty else { return }

        guard let fromChildIdx = oldChildren.firstIndex(where: { $0.branch.branchId == movedBranchId }) else { return }

        let siblingFlatIndices: [Int] = findSiblingFlatIndices(depth: movedDepth, parent: parentNode, in: nodes)
        guard !siblingFlatIndices.isEmpty else { return }

        let firstSiblingFlat: Int = siblingFlatIndices[0]
        let lastSiblingFlat: Int = siblingFlatIndices[siblingFlatIndices.count - 1]
        guard destination >= firstSiblingFlat && destination <= lastSiblingFlat + 1 else { return }

        let toChildIdx: Int = computeDestChildIndex(
            siblingFlatIndices: siblingFlatIndices,
            destination: destination,
            fromIndex: fromIndex
        )

        guard fromChildIdx != toChildIdx, toChildIdx >= 0, toChildIdx < oldChildren.count else { return }

        var newChildren = oldChildren
        let moved = newChildren.remove(at: fromChildIdx)
        newChildren.insert(moved, at: toChildIdx)

        if let parent = parentNode {
            rootChildren = updateChildrenInTree(parentBranchId: parent.branch.branchId, newChildren: newChildren, in: rootChildren)
        } else {
            rootChildren = newChildren
        }

        sendReorderUpdates(oldChildren: oldChildren, newChildren: newChildren, client: client)
    }

    private func findParentNode(at fromIndex: Int, depth: Int, in nodes: [FlatTreeNode]) -> TreeNode? {
        guard depth > 0 else { return nil }
        for j in (0..<fromIndex).reversed() {
            if nodes[j].depth == depth - 1 { return nodes[j].node }
        }
        return nil
    }

    private func resolveChildren(parent: TreeNode?) -> [TreeNode] {
        if let parent {
            return parent.children ?? []
        }
        return rootChildren
    }

    private func findSiblingFlatIndices(depth: Int, parent: TreeNode?, in nodes: [FlatTreeNode]) -> [Int] {
        let parentBranchId: String? = parent?.branch.branchId
        var result: [Int] = []
        for idx in nodes.indices {
            guard nodes[idx].depth == depth else { continue }
            if depth == 0 {
                result.append(idx)
                continue
            }
            guard let targetId = parentBranchId else { continue }
            for j in (0..<idx).reversed() {
                if nodes[j].depth == depth - 1 {
                    if nodes[j].node.branch.branchId == targetId {
                        result.append(idx)
                    }
                    break
                }
            }
        }
        return result
    }

    private func computeDestChildIndex(siblingFlatIndices: [Int], destination: Int, fromIndex: Int) -> Int {
        var toChildIdx = 0
        for flatIdx in siblingFlatIndices {
            if flatIdx >= destination { break }
            toChildIdx += 1
        }
        if destination > fromIndex && toChildIdx > 0 { toChildIdx -= 1 }
        return toChildIdx
    }

    private func sendReorderUpdates(oldChildren: [TreeNode], newChildren: [TreeNode], client: any TriliumClientProtocol) {
        var updates: [(String, Int)] = []
        for (newIdx, node) in newChildren.enumerated() {
            if let oldIdx = oldChildren.firstIndex(where: { $0.branch.branchId == node.branch.branchId }), oldIdx != newIdx {
                updates.append((node.branch.branchId, newIdx))
            }
        }
        guard !updates.isEmpty else { return }
        let newOrder = newChildren.map(\.branch.branchId)
        Task {
            for (branchId, _) in updates {
                do {
                    try await client.placeBranchInSiblingOrder(branchId, orderedSiblingBranchIds: newOrder)
                } catch {
                    Log.api.error("Failed to update branch position: \(error)")
                    await MainActor.run { self.error = APIError.from(error).localizedDescription }
                    await refresh()
                    return
                }
            }
        }
    }

    private func updateChildrenInTree(parentBranchId: String, newChildren: [TreeNode], in nodes: [TreeNode]) -> [TreeNode] {
        nodes.map { node in
            if node.branch.branchId == parentBranchId {
                var updated = node
                updated.children = newChildren
                return updated
            }
            guard let children = node.children else { return node }
            var updated = node
            updated.children = updateChildrenInTree(parentBranchId: parentBranchId, newChildren: newChildren, in: children)
            return updated
        }
    }

    func toggleExpand(_ node: TreeNode) async {
        let branchId = node.branch.branchId
        if expandedBranches.contains(branchId) {
            expandedBranches.remove(branchId)
            rootChildren = collapseNode(branchId: branchId, in: rootChildren)
            return
        }

        expandedBranches.insert(branchId)
        rootChildren = setNodeState(branchId: branchId, in: rootChildren) { $0.isLoading = true }

        // Prefer SwiftData (updated by incremental sync) like Trilium’s local Becca/Froca read path.
        // When online, verify cached branch IDs match the live API so server-deleted children do not reappear.
        var cached = loadCachedChildren(parentNoteId: node.note.noteId)
        if let client, appState.isOnline, !cached.isEmpty {
            if let (_, liveBranches) = try? await client.getNoteWithBranches(node.note.noteId) {
                let liveBranchIds = Set(liveBranches.map(\.branchId))
                let cachedBranchIds = Set(cached.map { $0.branch.branchId })
                if cachedBranchIds != liveBranchIds, let profileId = serverProfileId {
                    try? persistence.pruneStaleBranchesUnderParent(
                        parentNoteId: node.note.noteId,
                        liveBranchIds: liveBranchIds,
                        serverProfileId: profileId,
                        hiddenNoteIds: Self.hiddenNoteIds
                    )
                    cached = loadCachedChildren(parentNoteId: node.note.noteId)
                }
            }
        }
        if !cached.isEmpty {
            rootChildren = setNodeState(branchId: branchId, in: rootChildren) {
                $0.children = cached
                $0.isLoading = false
            }
            return
        }

        guard let client else {
            expandedBranches.remove(branchId)
            rootChildren = setNodeState(branchId: branchId, in: rootChildren) { $0.isLoading = false }
            return
        }

        do {
            let children = try await loadChildren(of: node.note, client: client)
            rootChildren = setNodeState(branchId: branchId, in: rootChildren) {
                $0.children = children
                $0.isLoading = false
            }
        } catch {
            Log.api.error("Failed to expand node: \(error)")
            expandedBranches.remove(branchId)
            rootChildren = setNodeState(branchId: branchId, in: rootChildren) { $0.isLoading = false }
        }
    }

    /// Pull-to-refresh / toolbar after sync: always prefer a live server tree load when online.
    func refreshFromServerIfOnline() async {
        noteCache.removeAll()
        branchCache.removeAll()
        if !appState.isOnline {
            reloadFromCache()
            return
        }
        await loadTree()
    }

    func refresh() async {
        noteCache.removeAll()
        branchCache.removeAll()
        if !appState.isOnline {
            reloadFromCache()
            return
        }
        if appState.syncManager.lastCompletedSyncUpdatedLocalDatabase {
            reloadFromCache()
            return
        }
        await loadTree()
    }

    func deleteNoteAndSubnotes(noteId: String) async -> Bool {
        guard noteId != "root" else { return false }

        if let client, appState.isOnline {
            do {
                try await client.deleteNote(noteId)
                if let profileId = serverProfileId {
                    GhostNoteTracker.shared.add(noteId, serverProfileId: profileId)
                    persistence.removeFavoritesForCachedSubtree(rootNoteId: noteId, serverProfileId: profileId)
                    try? persistence.deleteCachedNotes(noteIds: [noteId], serverProfileId: profileId)
                }
                await refresh()
                return true
            } catch {
                self.error = APIError.from(error).localizedDescription
                Log.api.error("Failed to delete note: \(error)")
                return false
            }
        }

        guard let profileId = serverProfileId else { return false }
        do {
            try persistence.enqueueOfflineNoteDeletion(noteId: noteId, serverProfileId: profileId)
            appState.backgroundSyncPendingChanges()
            await refresh()
            return true
        } catch {
            self.error = APIError.from(error).localizedDescription
            Log.api.error("Failed to enqueue offline deletion: \(error)")
            return false
        }
    }

    /// Copies note content into a new sibling under the same parent (same placement as in the tree). Returns the new note for navigation.
    func duplicateNote(sourceNoteId: String, parentNoteId: String) async -> NoteItem? {
        guard let client, sourceNoteId != "root" else { return nil }
        do {
            let response = try await client.duplicateNoteAsChild(sourceNoteId: sourceNoteId, parentNoteId: parentNoteId)
            if let profileId = serverProfileId {
                try? persistence.cacheNoteIfAllowed(from: response.note, serverProfileId: profileId, policy: cacheExclusion)
                try? persistence.cacheBranchIfAllowed(
                    from: response.branch,
                    parentNoteIdsForNote: response.note.parentNoteIds,
                    serverProfileId: profileId,
                    policy: cacheExclusion
                )
                try? persistence.commitBatch()
            }
            await refresh()
            return NoteItem(from: response.note)
        } catch {
            self.error = APIError.from(error).localizedDescription
            Log.api.error("Failed to duplicate note: \(error)")
            return nil
        }
    }

    func createChildNote(parentNoteId: String, title: String, type: NoteType = .text) async -> String? {
        let resolvedTitle = NoteCreationTitle.resolved(from: title)
        guard let profileId = serverProfileId, appState.isAuthenticated else { return nil }

        let mime = type.creationMime
        let initial = type.creationInitialContent
        let storageType = type.triliumStorageType
        let attrs = type.creationInitialAttributes

        do {
            let (noteId, _) = try persistence.createOfflineChildNote(
                parentNoteId: parentNoteId,
                title: resolvedTitle,
                noteType: storageType,
                mime: mime,
                initialContent: initial,
                serverProfileId: profileId,
                initialAttributes: attrs
            )
            reloadFromCache()
            appState.backgroundSyncPendingChanges()
            return noteId
        } catch {
            self.error = APIError.from(error).localizedDescription
            Log.api.error("Failed to create child note locally: \(error)")
            return nil
        }
    }

    func reloadFromCache() {
        let savedExpansion = expandedBranches
        noteCache.removeAll()
        branchCache.removeAll()
        expandedBranches = savedExpansion
        let nodes = loadCachedChildren(parentNoteId: parentNoteId)
        guard !nodes.isEmpty else {
            expandedBranches = []
            _rootChildren = []
            rebuildVisibleNodes(animated: false)
            isFromCache = false
            return
        }
        let withExpanded = attachExpandedCachedChildren(nodes: nodes)
        _rootChildren = withExpanded
        isFromCache = true
        rebuildVisibleNodes(animated: false)
    }

    /// Re-attaches cached subtrees for branch IDs still marked expanded (used after `reloadFromCache`).
    private func attachExpandedCachedChildren(nodes: [TreeNode]) -> [TreeNode] {
        nodes.map { node in
            guard expandedBranches.contains(node.branch.branchId), node.note.hasChildren else {
                return node
            }
            let rawKids = loadCachedChildren(parentNoteId: node.note.noteId)
            let kids = attachExpandedCachedChildren(nodes: rawKids)
            return TreeNode(branch: node.branch, note: node.note, children: kids.isEmpty ? nil : kids, isLoading: false)
        }
    }

    /// Walk the in-memory tree and remove nodes whose branch no longer exists
    /// in the SwiftData cache (i.e. the branch was deleted during sync).
    /// Preserves expand/collapse state of surviving nodes.
    func pruneDeletedNodes() {
        guard let profileId = serverProfileId else { return }
        let validBranchIds: Set<String>
        do {
            let pid = profileId
            let all = try persistence.fetchAllCachedBranchIds(serverProfileId: pid)
            validBranchIds = Set(all)
        } catch {
            Log.cache.error("pruneDeletedNodes: failed to fetch branch IDs: \(error)")
            return
        }
        rootChildren = Self.pruneTree(rootChildren, validBranchIds: validBranchIds)
    }

    private static func pruneTree(_ nodes: [TreeNode], validBranchIds: Set<String>) -> [TreeNode] {
        nodes.compactMap { node -> TreeNode? in
            guard validBranchIds.contains(node.branch.branchId) else { return nil }
            var pruned = node
            if let children = node.children {
                pruned.children = pruneTree(children, validBranchIds: validBranchIds)
            }
            return pruned
        }
    }

    // MARK: - Breadcrumbs

    func breadcrumbs(for noteId: String) async -> [BreadcrumbItem] {
        var crumbs: [BreadcrumbItem] = []
        var currentId = noteId
        var visited = Set<String>()

        while currentId != "root" && !visited.contains(currentId) {
            visited.insert(currentId)

            let note: NoteItem?
            if let cached = noteCache[currentId] {
                note = cached
            } else {
                note = try? await fetchAndCacheNote(currentId)
            }
            guard let note else { break }
            guard let parentNoteId = note.parentNoteIds.first else { break }

            let parentBranchId = note.parentBranchIds.first
            let crumbTitle = note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
            crumbs.insert(BreadcrumbItem(noteId: currentId, title: crumbTitle, branchId: parentBranchId), at: 0)
            currentId = parentNoteId
        }

        if currentId == "root" {
            crumbs.insert(BreadcrumbItem(noteId: "root", title: "Root", branchId: nil), at: 0)
        }

        return crumbs
    }

    // MARK: - Child Loading

    private func loadChildren(of note: NoteItem, client: any TriliumClientProtocol) async throws -> [TreeNode] {
        guard !note.childBranchIds.isEmpty else { return [] }

        // Fetch branches we don't have cached
        let missingBranchIds = note.childBranchIds.filter { branchCache[$0] == nil }
        if !missingBranchIds.isEmpty {
            let responses = try await withThrowingTaskGroup(of: BranchResponse.self) { group in
                for branchId in missingBranchIds {
                    group.addTask { try await client.getBranch(branchId, parentNoteId: note.noteId) }
                }
                var results: [BranchResponse] = []
                for try await response in group { results.append(response) }
                return results
            }
            for response in responses {
                branchCache[response.branchId] = BranchItem(from: response)
            }
        }

        // Determine which note IDs we need from the branches we now have
        let childNoteIds = note.childBranchIds.compactMap { branchCache[$0]?.noteId }
        let missingNoteIds = Set(childNoteIds).subtracting(noteCache.keys)

        if !missingNoteIds.isEmpty {
            let responses = try await withThrowingTaskGroup(of: NoteResponse?.self) { group in
                for noteId in missingNoteIds {
                    group.addTask {
                        do {
                            return try await client.getNote(noteId)
                        } catch {
                            return nil
                        }
                    }
                }
                var results: [NoteResponse] = []
                for try await response in group {
                    if let r = response { results.append(r) }
                }
                return results
            }
            for response in responses {
                if response.isDeleted { continue }
                noteCache[response.noteId] = NoteItem(from: response)
            }
        }

        // Assemble tree nodes, preserving branch order.
        // Filter out ghost notes (server still lists them but their blobs are erased).
        let ghosts: Set<String> = serverProfileId.map { GhostNoteTracker.shared.all(serverProfileId: $0) } ?? []

        var nodes: [TreeNode] = []
        for branchId in note.childBranchIds {
            guard let branch = branchCache[branchId] else { continue }
            guard let childNote = noteCache[branch.noteId] else { continue }

            if Self.hiddenNoteIds.contains(childNote.noteId) {
                continue
            }
            if ghosts.contains(childNote.noteId) {
                continue
            }

            var node = TreeNode(branch: branch, note: childNote)
            if expandedBranches.contains(branchId), childNote.hasChildren {
                node.children = try await loadChildren(of: childNote, client: client)
            }
            nodes.append(node)
        }

        nodes.sort { $0.branch.notePosition < $1.branch.notePosition }

        return nodes
    }

    // MARK: - Expand / Collapse

    private func setNodeState(branchId: String, in nodes: [TreeNode], update: (inout TreeNode) -> Void) -> [TreeNode] {
        var result = nodes
        for i in result.indices {
            if result[i].branch.branchId == branchId {
                update(&result[i])
                return result
            }
            if let children = result[i].children {
                result[i].children = setNodeState(branchId: branchId, in: children, update: update)
            }
        }
        return result
    }

    private func collapseNode(branchId: String, in nodes: [TreeNode]) -> [TreeNode] {
        var result = nodes
        for i in result.indices {
            if result[i].branch.branchId == branchId {
                result[i].children = nil
                return result
            }
            if let children = result[i].children {
                result[i].children = collapseNode(branchId: branchId, in: children)
            }
        }
        return result
    }

    // MARK: - Helpers

    private func fetchAndCacheNote(_ noteId: String) async throws -> NoteItem? {
        guard let client else { return nil }
        let response = try await client.getNote(noteId)
        let item = NoteItem(from: response)
        noteCache[noteId] = item
        if let profileId = serverProfileId {
            try? persistence.cacheNoteIfAllowed(from: response, serverProfileId: profileId, policy: cacheExclusion)
            try? persistence.commitBatch()
            for attr in response.attributes {
                try? persistence.cacheAttributeBatchIfAllowed(
                    from: attr,
                    parentNoteIds: response.parentNoteIds,
                    serverProfileId: profileId,
                    policy: cacheExclusion
                )
            }
            try? persistence.commitBatch()
        }
        return item
    }

    func noteItem(for noteId: String) -> NoteItem? {
        noteCache[noteId]
    }

    /// Sub-notes already loaded in the in-memory tree (expanded parent). Used to seed note detail when SwiftData has no branch/child rows yet (common offline).
    func childNoteSummariesForDetailSeed(parentNoteId: String) -> [ChildNoteSummary]? {
        guard let node = Self.findTreeNode(noteId: parentNoteId, in: rootChildren),
              let children = node.children, !children.isEmpty
        else { return nil }
        return children.map { n in
            let iconClass = n.note.attributes.first { $0.name == "iconClass" }?.value
            return ChildNoteSummary(
                noteId: n.note.noteId,
                title: n.note.title,
                isProtected: n.note.isProtected,
                type: n.note.type,
                iconClass: iconClass,
                childCount: n.note.childNoteIds.count
            )
        }
    }

    /// Seeds note-detail sub-notes from the expanded tree, else from SwiftData (branch rows + parent pointers) so sub-notes appear offline without expanding the parent first.
    func childNoteSummariesForDetailNavigation(parentNoteId: String) -> [ChildNoteSummary]? {
        if let fromExpanded = childNoteSummariesForDetailSeed(parentNoteId: parentNoteId) {
            return fromExpanded
        }
        guard let profileId = serverProfileId else { return nil }
        let placeholder = String(localized: "Sub-note", comment: "Child row title when this note is not in the local database yet (offline or not synced)")
        var ids: [String] = (try? persistence.fetchChildNoteIdsOrderedFromBranches(
            parentNoteId: parentNoteId,
            serverProfileId: profileId
        )) ?? []
        if ids.isEmpty {
            ids = (try? persistence.fetchChildNoteIdsReferencingParent(
                parentNoteId: parentNoteId,
                serverProfileId: profileId
            )) ?? []
        }
        guard !ids.isEmpty else { return nil }
        return ids.map { childId in
            if let n = try? persistence.fetchCachedNote(id: childId, serverProfileId: profileId) {
                let cachedAttrs = (try? persistence.fetchCachedAttributes(noteId: childId, serverProfileId: profileId)) ?? []
                let iconClass = cachedAttrs.first { $0.name == "iconClass" }?.value
                return ChildNoteSummary(
                    noteId: n.noteId,
                    title: n.title,
                    isProtected: n.isProtected,
                    type: NoteType(rawValue: n.noteType) ?? .text,
                    iconClass: iconClass,
                    childCount: n.childNoteIds.count
                )
            }
            return ChildNoteSummary(
                noteId: childId,
                title: placeholder,
                isProtected: false,
                type: .text,
                iconClass: nil,
                childCount: 0
            )
        }
    }

    private static func findTreeNode(noteId: String, in nodes: [TreeNode]) -> TreeNode? {
        for node in nodes {
            if node.note.noteId == noteId { return node }
            if let kids = node.children, let found = findTreeNode(noteId: noteId, in: kids) {
                return found
            }
        }
        return nil
    }

    // MARK: - Batch Persistence

    private func persistTreeBatch(rootNote: NoteResponse) {
        guard let profileId = serverProfileId else { return }
        Task {
            do {
                try persistence.cacheNoteBatchIfAllowed(from: rootNote, serverProfileId: profileId, policy: cacheExclusion)
                persistNodesRecursive(rootChildren, profileId: profileId)
                try persistence.commitBatch()
            } catch {
                Log.persistence.error("Batch tree persist failed: \(error)")
            }
        }
    }

    private func persistNodesRecursive(_ nodes: [TreeNode], profileId: String) {
        let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)
        for node in nodes where !ghosts.contains(node.note.noteId) {
            let noteResponse = NoteResponse(
                noteId: node.note.noteId,
                isProtected: node.note.isProtected,
                title: node.note.title,
                type: node.note.type.rawValue,
                mime: node.note.mime,
                blobId: nil,
                isDeleted: false,
                dateCreated: node.note.dateCreated,
                dateModified: node.note.dateModified,
                utcDateCreated: "",
                utcDateModified: "",
                parentNoteIds: node.note.parentNoteIds,
                childNoteIds: node.note.childNoteIds,
                parentBranchIds: node.note.parentBranchIds,
                childBranchIds: node.note.childBranchIds,
                attributes: node.note.attributes.map { attr in
                    AttributeResponse(
                        attributeId: attr.attributeId,
                        noteId: attr.noteId,
                        type: attr.type.rawValue,
                        name: attr.name,
                        value: attr.value,
                        position: attr.position,
                        isInheritable: attr.isInheritable,
                        utcDateModified: nil
                    )
                }
            )
            try? persistence.cacheNoteBatchIfAllowed(from: noteResponse, serverProfileId: profileId, policy: cacheExclusion)

            // Cache attributes
            for attr in node.note.attributes {
                let attrResp = AttributeResponse(
                    attributeId: attr.attributeId,
                    noteId: attr.noteId,
                    type: attr.type.rawValue,
                    name: attr.name,
                    value: attr.value,
                    position: attr.position,
                    isInheritable: attr.isInheritable,
                    utcDateModified: nil
                )
                try? persistence.cacheAttributeBatchIfAllowed(
                    from: attrResp,
                    parentNoteIds: noteResponse.parentNoteIds,
                    serverProfileId: profileId,
                    policy: cacheExclusion
                )
            }

            let branchResponse = BranchResponse(
                branchId: node.branch.branchId,
                noteId: node.branch.noteId,
                parentNoteId: node.branch.parentNoteId,
                prefix: node.branch.prefix,
                notePosition: node.branch.notePosition,
                isExpanded: node.branch.isExpanded,
                utcDateModified: nil
            )
            try? persistence.cacheBranchBatchIfAllowed(
                from: branchResponse,
                parentNoteIdsForNote: noteResponse.parentNoteIds,
                serverProfileId: profileId,
                policy: cacheExclusion
            )

            if let children = node.children {
                persistNodesRecursive(children, profileId: profileId)
            }
        }
    }

    // MARK: - Cache Fallback (recursive)

    private func loadTreeFromCache() {
        let nodes = loadCachedChildren(parentNoteId: parentNoteId)
        if !nodes.isEmpty {
            let withExpanded = attachExpandedCachedChildren(nodes: nodes)
            rootChildren = withExpanded
            isFromCache = true
            Log.cache.info("Loaded \(nodes.count) cached root children")
        }
    }

    private func loadCachedChildren(parentNoteId: String) -> [TreeNode] {
        guard let profileId = serverProfileId else {
            return []
        }
        let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)
        do {
            let pairs = try persistence.fetchCachedChildren(parentNoteId: parentNoteId, serverProfileId: profileId)
            let nodes: [TreeNode] = pairs.compactMap { branch, note -> TreeNode? in
                if Self.hiddenNoteIds.contains(note.noteId) {
                    return nil
                }
                if ghosts.contains(note.noteId) {
                    return nil
                }
                let branchItem = BranchItem(
                    branchId: branch.branchId,
                    noteId: branch.noteId,
                    parentNoteId: branch.parentNoteId,
                    prefix: branch.prefix,
                    notePosition: branch.notePosition,
                    isExpanded: false
                )

                let cachedAttrs = (try? persistence.fetchCachedAttributes(noteId: note.noteId, serverProfileId: profileId)) ?? []
                let attrs = cachedAttrs.map { a in
                    AttributeItem(
                        attributeId: a.attributeId,
                        noteId: a.noteId,
                        type: AttributeItem.AttributeKind(rawValue: a.type) ?? .label,
                        name: a.name,
                        value: a.value,
                        position: a.position,
                        isInheritable: a.isInheritable
                    )
                }

                let noteItem = NoteItem(
                    noteId: note.noteId,
                    title: note.title,
                    type: NoteType(rawValue: note.noteType) ?? .text,
                    mime: note.mime,
                    isProtected: note.isProtected,
                    dateCreated: "",
                    dateModified: "",
                    parentNoteIds: note.parentNoteIds,
                    childNoteIds: (try? persistence.fetchChildNoteIdsOrderedFromBranches(
                        parentNoteId: note.noteId,
                        serverProfileId: profileId
                    )) ?? note.childNoteIds,
                    parentBranchIds: note.parentBranchIds,
                    childBranchIds: {
                        let pid = profileId
                        let nid = note.noteId
                        let branches = (try? persistence.context.fetch(
                            FetchDescriptor<CachedBranch>(
                                predicate: #Predicate { $0.parentNoteId == nid && $0.serverProfileId == pid },
                                sortBy: [SortDescriptor(\.notePosition)]
                            )
                        )) ?? []
                        return branches.isEmpty ? note.childBranchIds : branches.map(\.branchId)
                    }(),
                    attributes: attrs
                )

                // Populate in-memory caches
                self.noteCache[note.noteId] = noteItem
                self.branchCache[branch.branchId] = branchItem

                return TreeNode(branch: branchItem, note: noteItem)
            }
            return nodes
        } catch {
            Log.cache.error("Failed to load cached children for \(parentNoteId): \(error)")
            return []
        }
    }
}
