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

    // Lookup caches only (`visibleNodes` drives the rows): observing them would redraw every row on each insert.
    @ObservationIgnored private var noteCache: [String: NoteItem] = [:]
    @ObservationIgnored private var branchCache: [String: BranchItem] = [:]
    private var expandedBranches: Set<String> = []
    private var _rootChildren: [TreeNode] = []
    /// When true, `rootChildren` updates rebuild `visibleNodes` without animation (reveal-in-tree).
    private var suppressVisibleNodeAnimation = false
    /// Main Notes tree only: calendar-root rows hide their descendants and expand chevron.
    var hidesCalendarRootChildrenInTree = false {
        didSet {
            guard oldValue != hidesCalendarRootChildrenInTree else { return }
            rebuildVisibleNodes(animated: true)
        }
    }
    /// Notes with Trilium's "Hide child notes in tree" (`#subtreeHidden`, own, inherited or from a template) show no
    /// descendants or expand chevron, as in Trilium's tree. Off in pickers, so their children can still be chosen.
    var hidesSubtreeHiddenChildren = false {
        didSet {
            guard oldValue != hidesSubtreeHiddenChildren else { return }
            rebuildVisibleNodes(animated: true)
        }
    }
    /// Label lookups for the current pass over the tree; dropped whenever the rows are rebuilt.
    @ObservationIgnored private var labelResolver: TriliumLabelResolver?
    /// Row icons for the current pass over the tree (a row's `body` asks on every render; the answer can walk every
    /// ancestor); dropped whenever the rows are rebuilt.
    @ObservationIgnored private var iconClassMemo: [String: String?] = [:]
    /// Loaded notes by lowercased title, for `~template` relations that name their target by title; built on first use
    /// per pass.
    @ObservationIgnored private var loadedNotesByTitle: [String: NoteItem]?

    private let appState: AppState
    private let parentNoteId: String
    private let persistence: PersistenceManager
    private let cacheExclusion: CacheExclusionPolicy

    init(appState: AppState, parentNoteId: String = "root", persistence: PersistenceManager? = nil) {
        self.appState = appState
        self.parentNoteId = parentNoteId
        let persistence = persistence ?? .shared
        self.persistence = persistence
        self.cacheExclusion = CacheExclusionPolicy(persistence: persistence)
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }
    var isOnline: Bool { appState.isOnline }
    /// The note whose children are this page's top-level rows.
    var treeParentNoteId: String { parentNoteId }

    var rootChildren: [TreeNode] {
        get { _rootChildren }
        set {
            _rootChildren = newValue
            rebuildVisibleNodes(animated: !suppressVisibleNodeAnimation)
        }
    }

    private func rebuildVisibleNodes(animated: Bool = true) {
        labelResolver = nil
        iconClassMemo.removeAll(keepingCapacity: true)
        loadedNotesByTitle = nil
        let result = Self.flatten(
            _rootChildren,
            hideCalendarRootChildren: hidesCalendarRootChildrenInTree,
            hidesChildren: { [unowned self] in isSubtreeHidden($0) }
        )
        if animated {
            withAnimation(.easeInOut(duration: 0.15)) {
                visibleNodes = result
            }
        } else {
            visibleNodes = result
        }
    }

    /// Emits visible tree rows. When `hideCalendarRootChildren` is on, calendar roots are leaves (descendants omitted);
    /// so is any note `hidesChildren` names.
    nonisolated static func flatten(
        _ nodes: [TreeNode],
        depth: Int = 0,
        hideCalendarRootChildren: Bool = false,
        hidesChildren: (NoteItem) -> Bool = { _ in false }
    ) -> [FlatTreeNode] {
        var result: [FlatTreeNode] = []
        appendFlattened(
            nodes,
            depth: depth,
            hideCalendarRootChildren: hideCalendarRootChildren,
            hidesChildren: hidesChildren,
            into: &result
        )
        return result
    }

    nonisolated private static func appendFlattened(
        _ nodes: [TreeNode],
        depth: Int,
        hideCalendarRootChildren: Bool,
        hidesChildren: (NoteItem) -> Bool,
        into result: inout [FlatTreeNode]
    ) {
        for node in nodes {
            result.append(FlatTreeNode(node: node, depth: depth))
            if hideCalendarRootChildren && node.note.isCalendarRoot {
                continue
            }
            if let children = node.children, !hidesChildren(node.note) {
                appendFlattened(
                    children,
                    depth: depth + 1,
                    hideCalendarRootChildren: hideCalendarRootChildren,
                    hidesChildren: hidesChildren,
                    into: &result
                )
            }
        }
    }

    nonisolated static func showsExpandChevron(
        hasChildren: Bool,
        isCalendarRoot: Bool,
        hideCalendarRootChildren: Bool
    ) -> Bool {
        if hideCalendarRootChildren && isCalendarRoot { return false }
        return hasChildren
    }

    func showsExpandChevron(for note: NoteItem) -> Bool {
        Self.showsExpandChevron(
            hasChildren: note.hasChildren,
            isCalendarRoot: note.isCalendarRoot,
            hideCalendarRootChildren: hidesCalendarRootChildrenInTree
        ) && !isSubtreeHidden(note)
    }

    /// Whether the row hides its children for "Hide child notes in tree" (only while `hidesSubtreeHiddenChildren`).
    func isSubtreeHidden(_ note: NoteItem) -> Bool {
        guard hidesSubtreeHiddenChildren, note.hasChildren else { return false }
        let resolver = labelResolver ?? makeLabelResolver()
        labelResolver = resolver
        return resolver.isTruthy("subtreeHidden", noteId: note.noteId)
    }

    /// Children this row does not show: a calendar root's (when that preference is on) or a hidden subtree's.
    private func hidesChildrenInTree(_ note: NoteItem) -> Bool {
        (hidesCalendarRootChildrenInTree && note.isCalendarRoot) || isSubtreeHidden(note)
    }

    private func makeLabelResolver() -> TriliumLabelResolver {
        let profileId = serverProfileId
        let boardHidesChildren = TriliumServerCompatibility.supportsBoardOverhaul(appState.serverAppInfo)
        return TriliumLabelResolver(
            context: { [unowned self] noteId in
                // Freshly loaded rows first, then the cache (ancestors, templates) for notes not on screen.
                if let note = noteCache[noteId] {
                    return TriliumLabelResolver.NoteContext(attributes: note.attributes, parentNoteIds: note.parentNoteIds)
                }
                guard let profileId else { return nil }
                return persistence.labelResolverContext(noteId: noteId, serverProfileId: profileId)
            },
            builtinTemplateLabel: { templateNoteId, name in
                TriliumBuiltinTemplateLabels.value(of: name, templateNoteId: templateNoteId, boardHidesChildren: boardHidesChildren)
            }
        )
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

    /// Where a List drag of flat row `fromIndex`, dropped before flat row `destination`, lands among the dragged row's
    /// siblings. A drop anywhere in its parent's block of rows (its siblings and their open subtrees) reorders it among
    /// those siblings; anywhere else is `nil`, since moving a note to another parent is not a reorder.
    struct SiblingMove: Equatable {
        /// Flat index of the parent row; `nil` for this page's top-level rows.
        let parentIndex: Int?
        let fromSibling: Int
        let toSibling: Int
    }

    nonisolated static func siblingMove(in rows: [FlatTreeNode], from fromIndex: Int, to destination: Int) -> SiblingMove? {
        guard rows.indices.contains(fromIndex) else { return nil }
        let depth = rows[fromIndex].depth
        var parentIndex: Int?
        if depth > 0 {
            guard let found = (0..<fromIndex).last(where: { rows[$0].depth == depth - 1 }) else { return nil }
            parentIndex = found
        }
        let blockStart = (parentIndex ?? -1) + 1
        var blockEnd = blockStart
        while blockEnd < rows.count, rows[blockEnd].depth >= depth { blockEnd += 1 }
        guard destination >= blockStart, destination <= blockEnd else { return nil }

        let siblings = (blockStart..<blockEnd).filter { rows[$0].depth == depth }
        guard let fromSibling = siblings.firstIndex(of: fromIndex) else { return nil }
        var toSibling = siblings.filter { $0 < destination }.count
        if destination > fromIndex { toSibling -= 1 }
        return SiblingMove(parentIndex: parentIndex, fromSibling: fromSibling, toSibling: max(0, min(toSibling, siblings.count - 1)))
    }

    /// List reorder (`onMove`) at any depth: a note moves among its siblings and the new order is saved to the server.
    func reorderNodes(from source: IndexSet, to destination: Int) {
        guard let fromIndex = source.first else { return }
        guard let client, isOnline else {
            error = String(localized: "Connect to the server to reorder notes.", comment: "Tree reorder while offline")
            putRowsBack(after: source, destination)
            return
        }
        let rows = visibleNodes
        guard let move = Self.siblingMove(in: rows, from: fromIndex, to: destination), move.fromSibling != move.toSibling else {
            putRowsBack(after: source, destination)
            return
        }
        let parent = move.parentIndex.map { rows[$0].node }
        let siblings: [TreeNode]
        if let parent {
            siblings = Self.findTreeNode(branchId: parent.branch.branchId, in: rootChildren)?.children ?? []
        } else {
            siblings = rootChildren
        }
        guard siblings.indices.contains(move.fromSibling), siblings.indices.contains(move.toSibling) else {
            putRowsBack(after: source, destination)
            return
        }

        var newChildren = siblings
        let moved = newChildren.remove(at: move.fromSibling)
        newChildren.insert(moved, at: move.toSibling)
        if let parent {
            rootChildren = updateChildrenInTree(parentBranchId: parent.branch.branchId, newChildren: newChildren, in: rootChildren)
        } else {
            rootChildren = newChildren
        }
        Log.api.info("Tree reorder: branch \(moved.branch.branchId) to position \(move.toSibling) under \(parent?.note.noteId ?? self.parentNoteId)")
        saveSiblingMove(
            movedBranchId: moved.branch.branchId,
            newOrder: newChildren.map(\.branch.branchId),
            parentNoteId: parent?.note.noteId ?? parentNoteId,
            parentBranchId: parent?.branch.branchId,
            client: client
        )
    }

    /// The List has already drawn a drop that is not saved. Mirror it in the rows, then rebuild them, so the list
    /// animates the row back instead of keeping an order the tree does not have.
    private func putRowsBack(after source: IndexSet, _ destination: Int) {
        var shown = visibleNodes
        shown.move(fromOffsets: source, toOffset: destination)
        visibleNodes = shown
        DispatchQueue.main.async { [weak self] in
            self?.rebuildVisibleNodes(animated: true)
        }
    }

    /// Saves a drag among one parent's children. Trilium needs only the dragged branch placed beside its new
    /// neighbour: the siblings in between keep their order. (Placing every shifted sibling in turn, as this used to,
    /// scrambles longer moves, since each request lands against positions the previous one already changed.)
    /// The parent's positions are then read back, so the cache matches the server and a re-sort by the server
    /// (`#sorted`) shows at once.
    func saveSiblingMove(
        movedBranchId: String,
        newOrder: [String],
        parentNoteId: String,
        parentBranchId: String?,
        client: any TriliumClientProtocol
    ) {
        Task {
            do {
                try await client.placeBranchInSiblingOrder(movedBranchId, orderedSiblingBranchIds: newOrder)
            } catch {
                Log.api.error("Failed to update branch position: \(error)")
                self.error = APIError.from(error).localizedDescription
                await refresh()
                return
            }
            await applyServerChildOrder(parentNoteId: parentNoteId, parentBranchId: parentBranchId, client: client)
        }
    }

    /// Reads a parent's child positions from the server into the cache and the rows on screen.
    private func applyServerChildOrder(
        parentNoteId: String,
        parentBranchId: String?,
        client: any TriliumClientProtocol
    ) async {
        guard let (parent, liveBranches) = try? await client.getNoteWithBranches(parentNoteId) else { return }
        let positions = Dictionary(liveBranches.map { ($0.branchId, $0.notePosition) }, uniquingKeysWith: { first, _ in first })
        if let profileId = serverProfileId {
            try? persistence.applyChildBranchPositions(positions, parentNoteId: parentNoteId, serverProfileId: profileId)
            try? persistence.commitBatch()
        }

        func serverOrdered(_ nodes: [TreeNode]) -> [TreeNode] {
            nodes.enumerated().sorted { lhs, rhs in
                let left = positions[lhs.element.branch.branchId] ?? Int.max
                let right = positions[rhs.element.branch.branchId] ?? Int.max
                return left != right ? left < right : lhs.offset < rhs.offset
            }.map(\.element)
        }
        let shown: [TreeNode]
        if let parentBranchId {
            shown = Self.findTreeNode(branchId: parentBranchId, in: rootChildren)?.children ?? []
        } else {
            shown = rootChildren
        }
        let ordered = serverOrdered(shown)
        guard ordered.map(\.branch.branchId) != shown.map(\.branch.branchId) else { return }
        if let parentBranchId {
            rootChildren = updateChildrenInTree(parentBranchId: parentBranchId, newChildren: ordered, in: rootChildren)
        } else {
            rootChildren = ordered
        }
        if parent.attributes.contains(where: { $0.type == "label" && $0.name == "sorted" }) {
            error = String(
                localized: "This note sorts its sub-notes automatically (#sorted), so they can’t be reordered by hand.",
                comment: "Tree reorder undone by the parent's #sorted label"
            )
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
        if hidesChildrenInTree(node.note) { return }
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

    /// Expands `node` only if it is currently collapsed (does not collapse an already-open branch).
    func expandIfCollapsed(_ node: TreeNode) async {
        guard !expandedBranches.contains(node.branch.branchId) else { return }
        await toggleExpand(node)
    }

    /// Collapses every expanded branch on this tree page.
    private func collapseAllExpanded() {
        guard !expandedBranches.isEmpty else { return }
        expandedBranches = []
        rootChildren = rootChildren.map {
            TreeNode(branch: $0.branch, note: $0.note, children: nil, isLoading: false)
        }
    }

    /// Reveals `noteId` on this tree page: collapses every other open path, then expands only this note’s
    /// ancestors (up to `maxInlineDepth`), without drilling deeper.
    /// Returns the branch id and note id of the deepest visible path row for scrolling / highlighting.
    /// List updates are unanimated so returning from a note does not whip scroll top↔bottom.
    @discardableResult
    func expandAncestorsTowardNote(_ noteId: String) async -> (branchId: String, noteId: String)? {
        let path = await resolvePathUnderThisTree(to: noteId)
        let (expandNoteIds, revealNoteId) = TreePathReveal.ancestorsToExpandAndRevealNoteId(
            pathFromTreeChildrenToTarget: path
        )
        guard revealNoteId != nil, !path.isEmpty else { return nil }

        suppressVisibleNodeAnimation = true
        defer { suppressVisibleNodeAnimation = false }

        // Exclusive: only the active note’s path may stay open.
        collapseAllExpanded()

        // Expand level-by-level along the path (avoids expanding a shallow clone elsewhere in the tree).
        var level = rootChildren
        for ancestorId in expandNoteIds {
            guard let node = level.first(where: { $0.note.noteId == ancestorId }) else { break }
            await expandIfCollapsed(node)
            level = Self.findTreeNode(noteId: ancestorId, in: rootChildren)?.children ?? []
        }

        // Deepest path note that is actually attached after expansion (C3 for deep notes, not C1).
        let visiblePath = Array(path.prefix(min(path.count, TriliumTreeConstants.maxInlineDepth + 1)))
        var deepest: TreeNode?
        level = rootChildren
        for id in visiblePath {
            guard let node = level.first(where: { $0.note.noteId == id }) else { break }
            deepest = node
            level = node.children ?? []
        }
        guard let deepest else { return nil }
        return (deepest.branch.branchId, deepest.note.noteId)
    }

    /// Path from this tree’s direct children down to `noteId`, using SwiftData first, then breadcrumbs when online.
    private func resolvePathUnderThisTree(to noteId: String) async -> [String] {
        if let profileId = serverProfileId {
            let cached = persistence.notePathUnderTreeParent(
                noteId: noteId,
                treeParentNoteId: parentNoteId,
                serverProfileId: profileId
            )
            if !cached.isEmpty { return cached }
        }

        guard client != nil else { return [] }
        let crumbs = await breadcrumbs(for: noteId)
        guard let parentIndex = crumbs.firstIndex(where: { $0.noteId == parentNoteId }) else {
            // Root tree: breadcrumbs may start with Root; drop it. Or note may not be under this parent.
            if parentNoteId == TriliumTreeConstants.rootNoteId,
               let first = crumbs.first, first.noteId == TriliumTreeConstants.rootNoteId {
                let withoutRoot = Array(crumbs.dropFirst()).map(\.noteId)
                return withoutRoot
            }
            return []
        }
        let afterParent = crumbs.suffix(from: parentIndex + 1).map(\.noteId)
        return Array(afterParent)
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

    func deleteNoteAndSubnotes(noteId: String, eraseNotes: Bool = false) async -> Bool {
        guard await deleteNoteAndSubnotesWithoutRefresh(noteId: noteId, eraseNotes: eraseNotes) else { return false }
        await refresh()
        return true
    }

    /// How far a multi-note delete has got, in notes (subnotes included); `nil` when none is running.
    struct DeletionProgress: Equatable {
        var completed: Int
        /// Unknown until the notes to delete are counted.
        var total: Int?
    }

    private(set) var deletionProgress: DeletionProgress?

    /// Deletes each note with its subnotes, everywhere it's cloned (as `deleteNoteAndSubnotes` does for one), then
    /// refreshes the tree once. Trilium 0.106+ takes the selection in one `POST /api/delete-notes`, so all of it goes
    /// or none; older servers, offline, and notes created offline go one by one. Returns how many could not be deleted.
    func deleteNotesAndSubnotes(noteIds: [String], eraseNotes: Bool) async -> Int {
        let noteIds = noteIds.filter { $0 != "root" }
        guard !noteIds.isEmpty else { return 0 }
        deletionProgress = DeletionProgress(completed: 0, total: nil)
        defer { deletionProgress = nil }

        var failures = 0
        var oneByOne = noteIds
        if let client, appState.isOnline, let profileId = serverProfileId,
           TriliumServerCompatibility.supportsBulkNoteDeletion(appState.serverAppInfo) {
            let result = await deleteInOneRequest(noteIds: noteIds, eraseNotes: eraseNotes, client: client, profileId: profileId)
            failures += result.failures
            oneByOne = result.notSent
        }

        if !oneByOne.isEmpty {
            let sizes = oneByOne.map { noteId in
                serverProfileId.map { persistence.cachedDescendantNoteIds(rootNoteId: noteId, serverProfileId: $0).count } ?? 1
            }
            let total = sizes.reduce(0, +)
            var completed = 0
            deletionProgress = DeletionProgress(completed: 0, total: total)
            for (noteId, size) in zip(oneByOne, sizes) {
                if !(await deleteNoteAndSubnotesWithoutRefresh(noteId: noteId, eraseNotes: eraseNotes)) {
                    failures += 1
                }
                completed += size
                deletionProgress = DeletionProgress(completed: completed, total: total)
            }
        }

        await refresh()
        return failures
    }

    /// The part of a multi-note delete that goes in one request. Each note is named by a cached branch, which the
    /// delete preview confirms; notes it can't confirm (created offline, or a stale cache) come back in `notSent`.
    private func deleteInOneRequest(
        noteIds: [String],
        eraseNotes: Bool,
        client: any TriliumClientProtocol,
        profileId: String
    ) async -> (failures: Int, notSent: [String]) {
        var branchIdByNoteId: [String: String] = [:]
        for noteId in noteIds where !noteId.isOfflineLocalNoteId {
            branchIdByNoteId[noteId] = persistence.cachedBranchIdForDeletion(noteId: noteId, serverProfileId: profileId)
        }
        guard !branchIdByNoteId.isEmpty else { return (0, noteIds) }

        let previewed: Set<String>
        do {
            let branchIds = noteIds.compactMap { branchIdByNoteId[$0] }
            previewed = Set(try await client.previewNoteDeletion(branchIds: branchIds, deleteAllClones: true))
        } catch {
            Log.api.warning("delete-notes-preview failed, deleting notes one by one: \(error)")
            return (0, noteIds)
        }
        let (sending, notSent) = Self.splitForOneRequest(noteIds: noteIds, branchIdByNoteId: branchIdByNoteId, previewed: previewed)
        guard !sending.isEmpty else { return (0, noteIds) }

        let total = previewed.count
        deletionProgress = DeletionProgress(completed: 0, total: total)
        let taskId = String(UUID().uuidString.replacingOccurrences(of: "-", with: "").prefix(10))
        appState.trackServerTask(taskId) { [weak self] progress in
            // Trilium counts deleted branches, so clones can take the count past the notes.
            self?.deletionProgress = DeletionProgress(completed: min(progress.progressCount, total), total: total)
        }
        defer { appState.stopTrackingServerTask(taskId) }

        do {
            try await client.deleteNotes(
                branchIds: sending.compactMap { branchIdByNoteId[$0] },
                deleteAllClones: true,
                eraseNotes: eraseNotes,
                totalCount: total,
                taskId: taskId
            )
            forgetDeletedNotes(sending)
            deletionProgress = DeletionProgress(completed: total, total: total)
            return (0, notSent)
        } catch {
            // The request is one transaction, so none of it was deleted.
            self.error = APIError.from(error).localizedDescription
            Log.api.error("delete-notes failed: \(error)")
            return (sending.count, notSent)
        }
    }

    /// Notes sent in the one request: those with a branch the delete preview confirmed. `notSent` go one by one,
    /// except notes the preview counts anyway (a subnote of another), which the request deletes with their parent.
    nonisolated static func splitForOneRequest(
        noteIds: [String],
        branchIdByNoteId: [String: String],
        previewed: Set<String>
    ) -> (sending: [String], notSent: [String]) {
        let sending = noteIds.filter { branchIdByNoteId[$0] != nil && previewed.contains($0) }
        let notSent = noteIds.filter { !previewed.contains($0) }
        return (sending, notSent)
    }

    /// `deleteNoteAndSubnotes` without the tree refresh, so a multi-note delete refreshes once at the end.
    private func deleteNoteAndSubnotesWithoutRefresh(noteId: String, eraseNotes: Bool) async -> Bool {
        guard noteId != "root" else { return false }

        // A note created offline isn't on the server yet: the offline path cancels its upload instead.
        if let client, appState.isOnline, !noteId.isOfflineLocalNoteId {
            do {
                try await client.deleteNote(noteId, eraseNotes: eraseNotes)
                forgetDeletedNotes([noteId])
                return true
            } catch {
                self.error = APIError.from(error).localizedDescription
                Log.api.error("Failed to delete note: \(error)")
                return false
            }
        }

        guard let profileId = serverProfileId else { return false }
        do {
            try persistence.enqueueOfflineNoteDeletion(noteId: noteId, serverProfileId: profileId, eraseNotes: eraseNotes)
            appState.backgroundSyncPendingChanges()
            return true
        } catch {
            self.error = APIError.from(error).localizedDescription
            Log.api.error("Failed to enqueue offline deletion: \(error)")
            return false
        }
    }

    /// Local cleanup once the server has deleted these notes and their subnotes.
    private func forgetDeletedNotes(_ noteIds: [String]) {
        guard let profileId = serverProfileId else { return }
        for noteId in noteIds {
            GhostNoteTracker.shared.add(noteId, serverProfileId: profileId)
            persistence.removeFavoritesForCachedSubtree(rootNoteId: noteId, serverProfileId: profileId)
            persistence.closeOpenNoteTabs(forDeletedNoteId: noteId, serverProfileId: profileId)
        }
        try? persistence.deleteCachedNotes(noteIds: noteIds, serverProfileId: profileId)
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
                initialAttributes: attrs,
                useParentTitleTemplate: title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
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

    /// Creates a note from a user template (see `NoteTemplates.createNote`).
    func createNoteFromTemplate(_ template: UserNoteTemplate, parentNoteId: String, title: String) async -> String? {
        guard appState.isAuthenticated else { return nil }
        do {
            let noteId = try NoteTemplates.createNote(from: template, parentNoteId: parentNoteId, title: title, appState: appState)
            reloadFromCache()
            appState.backgroundSyncPendingChanges()
            return noteId
        } catch {
            self.error = APIError.from(error).localizedDescription
            Log.api.error("Failed to create note from template: \(error)")
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
            if hidesChildrenInTree(node.note) {
                return node
            }
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
            // Only the branches on screen need checking, not every cached branch.
            validBranchIds = try persistence.fetchExistingBranchIds(
                among: Self.branchIds(in: rootChildren),
                serverProfileId: profileId
            )
        } catch {
            Log.cache.error("pruneDeletedNodes: failed to fetch branch IDs: \(error)")
            return
        }
        rootChildren = Self.pruneTree(rootChildren, validBranchIds: validBranchIds)
    }

    private static func branchIds(in nodes: [TreeNode]) -> [String] {
        nodes.flatMap { node in [node.branch.branchId] + branchIds(in: node.children ?? []) }
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
        if hidesChildrenInTree(note) { return [] }
        guard !note.childBranchIds.isEmpty else { return [] }

        var localBranchCache = branchCache
        var localNoteCache = noteCache
        try await TreeChildBatchLoader.populateCachesIfNeeded(
            parentNote: note,
            client: client,
            branchCache: &localBranchCache,
            noteCache: &localNoteCache
        )
        branchCache = localBranchCache
        noteCache = localNoteCache

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
            if let children = result[i].children, Self.containsBranch(branchId, in: children) {
                result[i].children = setNodeState(branchId: branchId, in: children, update: update)
                return result
            }
        }
        return result
    }

    private static func containsBranch(_ branchId: String, in nodes: [TreeNode]) -> Bool {
        for node in nodes {
            if node.branch.branchId == branchId { return true }
            if let kids = node.children, containsBranch(branchId, in: kids) { return true }
        }
        return false
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

    // MARK: - Today's journal note

    /// Today's journal note, as Trilium's "Open Today's Journal Note" finds it (see `TodaysJournalNote.find`).
    func todaysJournalNote(now: Date = Date()) async throws -> NoteNavItem {
        try await TodaysJournalNote.find(appState: appState, now: now)
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

    /// Own, template, or inherited `#iconClass` for tree display.
    func effectiveIconClass(for note: NoteItem) -> String? {
        if let memo = iconClassMemo[note.noteId] { return memo }
        let icon = resolveEffectiveIconClass(for: note)
        iconClassMemo[note.noteId] = icon
        return icon
    }

    private func resolveEffectiveIconClass(for note: NoteItem) -> String? {
        if let resolved = NoteIconClassResolver.effectiveIconClass(
            noteId: note.noteId,
            ownIconClass: note.iconClass,
            templateRelationValue: note.templateRelationValue,
            parentNoteProvider: { [self] parentId in
                parentIconContext(noteId: parentId)
            },
            templateIconClassProvider: { [self] target in
                templateIconClass(for: target)
            }
        ) {
            return resolved
        }
        guard let profileId = serverProfileId else { return note.resolvedIconClass }
        return persistence.cachedEffectiveNoteIconClass(noteId: note.noteId, serverProfileId: profileId)
            ?? note.resolvedIconClass
    }

    private func templateIconClass(for target: String) -> String? {
        if let templateNote = noteCache[target],
           let icon = BoxiconsResolver.usableIconClass(from: templateNote.iconClass) {
            return icon
        }
        if loadedNotesByTitle == nil {
            loadedNotesByTitle = Dictionary(noteCache.values.map { ($0.title.lowercased(), $0) }, uniquingKeysWith: { first, _ in first })
        }
        if let match = loadedNotesByTitle?[target.lowercased()],
           let icon = BoxiconsResolver.usableIconClass(from: match.iconClass) {
            return icon
        }
        guard let profileId = serverProfileId else {
            return TriliumBuiltinTemplateIcons.iconClass(for: target)
        }
        return persistence.cachedTemplateIconClass(templateTarget: target, serverProfileId: profileId)
    }

    private func parentIconContext(noteId: String) -> NoteIconClassResolver.ParentNoteContext? {
        if let note = noteCache[noteId] {
            return NoteIconClassResolver.ParentNoteContext(
                attributes: note.attributes,
                parentNoteIds: note.parentNoteIds
            )
        }
        guard let profileId = serverProfileId else { return nil }
        return persistence.parentNoteContextForIconWalk(noteId: noteId, serverProfileId: profileId)
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
            // No branch rows under it: fall back to the note's own child list. A leaf has none, so tapping one doesn't
            // scan every cached note's parent list.
            ids = (try? persistence.fetchCachedNote(id: parentNoteId, serverProfileId: profileId))?.childNoteIds ?? []
        }
        guard !ids.isEmpty else { return nil }
        let notes = (try? persistence.fetchCachedNotes(ids: ids, serverProfileId: profileId)) ?? [:]
        let attributesByNote = (try? persistence.fetchCachedAttributesByNote(noteIds: ids, serverProfileId: profileId)) ?? [:]
        return ids.map { childId in
            if let n = notes[childId] {
                let cachedAttrs = attributesByNote[childId] ?? []
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

    private static func findTreeNode(branchId: String, in nodes: [TreeNode]) -> TreeNode? {
        for node in nodes {
            if node.branch.branchId == branchId { return node }
            if let found = findTreeNode(branchId: branchId, in: node.children ?? []) { return found }
        }
        return nil
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
                try persistLoadedTree(rootNote: rootNote, profileId: profileId)
            } catch {
                Log.persistence.error("Batch tree persist failed: \(error)")
            }
        }
    }

    /// Caches the loaded tree in one pass: exclusion rules read once, existing rows fetched by id in bulk, only rows
    /// that differ written, one save.
    private func persistLoadedTree(rootNote: NoteResponse, profileId: String) throws {
        let rules = cacheExclusion.snapshot(serverProfileId: profileId)
        let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)
        var notes: [NoteResponse] = []
        var branches: [BranchResponse] = []
        var attributes: [AttributeResponse] = []

        if !rules.isNoteExcludedFromCache(noteId: rootNote.noteId, parentNoteIds: rootNote.parentNoteIds) {
            notes.append(rootNote)
        }
        func collect(_ nodes: [TreeNode]) {
            for node in nodes where !ghosts.contains(node.note.noteId) {
                let note = Self.noteResponse(for: node.note)
                if !rules.isNoteExcludedFromCache(noteId: note.noteId, parentNoteIds: note.parentNoteIds) {
                    notes.append(note)
                    attributes.append(contentsOf: note.attributes)
                    branches.append(
                        BranchResponse(
                            branchId: node.branch.branchId,
                            noteId: node.branch.noteId,
                            parentNoteId: node.branch.parentNoteId,
                            prefix: node.branch.prefix,
                            notePosition: node.branch.notePosition,
                            isExpanded: node.branch.isExpanded,
                            utcDateModified: nil
                        )
                    )
                }
                if let children = node.children {
                    collect(children)
                }
            }
        }
        collect(rootChildren)

        let cachedNotes = try persistence.fetchCachedNotes(ids: notes.map(\.noteId), serverProfileId: profileId)
        let cachedBranches = try persistence.fetchCachedBranches(ids: branches.map(\.branchId), serverProfileId: profileId)
        let cachedAttributes = try persistence.fetchCachedAttributes(ids: attributes.map(\.attributeId), serverProfileId: profileId)
        var seenNotes = Set<String>()
        for note in notes where seenNotes.insert(note.noteId).inserted {
            persistence.upsertNoteForFullSync(note, existing: cachedNotes[note.noteId], serverProfileId: profileId)
        }
        var seenBranches = Set<String>()
        for branch in branches where seenBranches.insert(branch.branchId).inserted {
            persistence.upsertBranchForFullSync(branch, existing: cachedBranches[branch.branchId], serverProfileId: profileId)
        }
        var seenAttributes = Set<String>()
        for attribute in attributes where seenAttributes.insert(attribute.attributeId).inserted {
            persistence.upsertAttributeForFullSync(attribute, existing: cachedAttributes[attribute.attributeId], serverProfileId: profileId)
        }
        if persistence.context.hasChanges {
            try persistence.commitBatch()
        }
    }

    private static func noteResponse(for note: NoteItem) -> NoteResponse {
        NoteResponse(
            noteId: note.noteId,
            isProtected: note.isProtected,
            title: note.title,
            type: note.type.rawValue,
            mime: note.mime,
            blobId: nil,
            isDeleted: false,
            dateCreated: note.dateCreated,
            dateModified: note.dateModified,
            utcDateCreated: "",
            utcDateModified: "",
            parentNoteIds: note.parentNoteIds,
            childNoteIds: note.childNoteIds,
            parentBranchIds: note.parentBranchIds,
            childBranchIds: note.childBranchIds,
            attributes: note.attributes.map { attr in
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

    /// Children of `parentNoteId` from SwiftData in four queries: the parent's branches, the child notes, their
    /// attributes and their own child branches (not three queries per child).
    private func loadCachedChildren(parentNoteId: String) -> [TreeNode] {
        guard let profileId = serverProfileId else {
            return []
        }
        let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)
        do {
            let pairs = try persistence.fetchCachedChildren(parentNoteId: parentNoteId, serverProfileId: profileId)
                .filter { !Self.hiddenNoteIds.contains($0.1.noteId) && !ghosts.contains($0.1.noteId) }
            let childIds = pairs.map(\.1.noteId)
            let attributesByNote = try persistence.fetchCachedAttributesByNote(noteIds: childIds, serverProfileId: profileId)
            let grandchildBranches = try persistence.fetchCachedChildBranchesByParent(parentNoteIds: childIds, serverProfileId: profileId)

            return pairs.map { branch, note -> TreeNode in
                let branchItem = BranchItem(
                    branchId: branch.branchId,
                    noteId: branch.noteId,
                    parentNoteId: branch.parentNoteId,
                    prefix: branch.prefix,
                    notePosition: branch.notePosition,
                    isExpanded: false
                )
                let attrs = (attributesByNote[note.noteId] ?? []).map { a in
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
                let ownChildBranches = grandchildBranches[note.noteId] ?? []
                var seenChildren = Set<String>()
                let noteItem = NoteItem(
                    noteId: note.noteId,
                    title: note.title,
                    type: NoteType(rawValue: note.noteType) ?? .text,
                    mime: note.mime,
                    isProtected: note.isProtected,
                    dateCreated: "",
                    dateModified: "",
                    parentNoteIds: note.parentNoteIds,
                    childNoteIds: ownChildBranches.map(\.noteId).filter { seenChildren.insert($0).inserted },
                    parentBranchIds: note.parentBranchIds,
                    childBranchIds: ownChildBranches.isEmpty ? note.childBranchIds : ownChildBranches.map(\.branchId),
                    attributes: attrs
                )

                // Populate in-memory caches
                self.noteCache[note.noteId] = noteItem
                self.branchCache[branch.branchId] = branchItem

                return TreeNode(branch: branchItem, note: noteItem)
            }
        } catch {
            Log.cache.error("Failed to load cached children for \(parentNoteId): \(error)")
            return []
        }
    }
}
