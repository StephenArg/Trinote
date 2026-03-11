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
    private static let hiddenNoteIds: Set<String> = ["_hidden", "_share", "_lbRoot", "_lbAvailableLaunchers", "_lbVisibleLaunchers"]

    private var noteCache: [String: NoteItem] = [:]
    private var branchCache: [String: BranchItem] = [:]
    private var expandedBranches: Set<String> = []
    private var _rootChildren: [TreeNode] = []

    private let appState: AppState
    private let parentNoteId: String
    private let persistence = PersistenceManager.shared

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
            rebuildVisibleNodes()
        }
    }

    private func rebuildVisibleNodes() {
        var result: [FlatTreeNode] = []
        flatten(_rootChildren, depth: 0, into: &result)
        withAnimation(.easeInOut(duration: 0.15)) {
            visibleNodes = result
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

        guard let client else {
            if rootChildren.isEmpty { error = "Not connected" }
            return
        }

        do {
            let parentNote = try await client.getNote(parentNoteId)
            let parentItem = NoteItem(from: parentNote)
            noteCache[parentNoteId] = parentItem

            let children = try await loadChildren(of: parentItem, client: client)
            rootChildren = children
            isFromCache = false

            persistTreeBatch(rootNote: parentNote)

            if let profileId = serverProfileId {
                try? persistence.updateSyncStatus(domain: "tree", serverProfileId: profileId)
            }
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }

            self.error = apiError.localizedDescription
            Log.api.error("Failed to load tree: \(error)")

            if let profileId = serverProfileId {
                try? persistence.recordSyncError(domain: "tree", error: apiError.localizedDescription ?? "Unknown", serverProfileId: profileId)
            }
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

        guard let client else { return }

        do {
            let children = try await loadChildren(of: node.note, client: client)
            rootChildren = setNodeState(branchId: branchId, in: rootChildren) {
                $0.children = children
                $0.isLoading = false
            }
        } catch {
            Log.api.error("Failed to expand node: \(error)")
            let cached = loadCachedChildren(parentNoteId: node.note.noteId)
            if cached.isEmpty {
                expandedBranches.remove(branchId)
                rootChildren = setNodeState(branchId: branchId, in: rootChildren) { $0.isLoading = false }
            } else {
                rootChildren = setNodeState(branchId: branchId, in: rootChildren) {
                    $0.children = cached
                    $0.isLoading = false
                }
            }
        }
    }

    func refresh() async {
        noteCache.removeAll()
        branchCache.removeAll()
        await loadTree()
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
            crumbs.insert(BreadcrumbItem(noteId: currentId, title: note.title, branchId: parentBranchId), at: 0)
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
                    group.addTask { try await client.getBranch(branchId) }
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
            let responses = try await withThrowingTaskGroup(of: NoteResponse.self) { group in
                for noteId in missingNoteIds {
                    group.addTask { try await client.getNote(noteId) }
                }
                var results: [NoteResponse] = []
                for try await response in group { results.append(response) }
                return results
            }
            for response in responses {
                noteCache[response.noteId] = NoteItem(from: response)
            }
        }

        // Assemble tree nodes, preserving branch order
        var nodes: [TreeNode] = []
        for branchId in note.childBranchIds {
            guard let branch = branchCache[branchId],
                  let childNote = noteCache[branch.noteId] else { continue }

            if Self.hiddenNoteIds.contains(childNote.noteId) { continue }

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
        return item
    }

    func noteItem(for noteId: String) -> NoteItem? {
        noteCache[noteId]
    }

    // MARK: - Batch Persistence

    private func persistTreeBatch(rootNote: NoteResponse) {
        guard let profileId = serverProfileId else { return }
        Task {
            do {
                try persistence.cacheNoteBatch(from: rootNote, serverProfileId: profileId)
                persistNodesRecursive(rootChildren, profileId: profileId)
                try persistence.commitBatch()
            } catch {
                Log.persistence.error("Batch tree persist failed: \(error)")
            }
        }
    }

    private func persistNodesRecursive(_ nodes: [TreeNode], profileId: String) {
        for node in nodes {
            let noteResponse = NoteResponse(
                noteId: node.note.noteId,
                isProtected: node.note.isProtected,
                title: node.note.title,
                type: node.note.type.rawValue,
                mime: node.note.mime,
                blobId: nil,
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
                        utcDateModified: ""
                    )
                }
            )
            try? persistence.cacheNoteBatch(from: noteResponse, serverProfileId: profileId)

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
                    utcDateModified: ""
                )
                try? persistence.cacheAttributeBatch(from: attrResp, serverProfileId: profileId)
            }

            let branchResponse = BranchResponse(
                branchId: node.branch.branchId,
                noteId: node.branch.noteId,
                parentNoteId: node.branch.parentNoteId,
                prefix: node.branch.prefix,
                notePosition: node.branch.notePosition,
                isExpanded: node.branch.isExpanded,
                utcDateModified: ""
            )
            try? persistence.cacheBranchBatch(from: branchResponse, serverProfileId: profileId)

            if let children = node.children {
                persistNodesRecursive(children, profileId: profileId)
            }
        }
    }

    // MARK: - Cache Fallback (recursive)

    private func loadTreeFromCache() {
        let nodes = loadCachedChildren(parentNoteId: parentNoteId)
        if !nodes.isEmpty {
            rootChildren = nodes
            isFromCache = true
            Log.cache.info("Loaded \(nodes.count) cached root children")
        }
    }

    private func loadCachedChildren(parentNoteId: String) -> [TreeNode] {
        guard let profileId = serverProfileId else { return [] }
        do {
            let pairs = try persistence.fetchCachedChildren(parentNoteId: parentNoteId, serverProfileId: profileId)
            return pairs.compactMap { branch, note -> TreeNode? in
                if Self.hiddenNoteIds.contains(note.noteId) { return nil }
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
                    childNoteIds: note.childNoteIds,
                    parentBranchIds: note.parentBranchIds,
                    childBranchIds: note.childBranchIds,
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
