import Foundation

/// Trilium server-side sharing (public `/share/…` URLs).
///
/// Trilium / TriliumNext enable sharing by **cloning the note under the hidden `_share` root** (`PUT …/clone-to-note/_share`), not by adding a `shared` label. The web app’s switch uses `hasAncestor("_share")`.
/// See [BasicPropertiesTab.tsx](https://github.com/TriliumNext/Trilium/blob/main/apps/client/src/widgets/ribbon/BasicPropertiesTab.tsx) (`useShareState`).
enum TriliumSharing {
    /// Hidden subtree root where shared clones are attached (same ID as Trilium’s `share_root`).
    static let shareRootNoteId = "_share"

    /// Trilium system note IDs: hide when listing normal tree children (and when walking the `_share` subtree).
    static let hiddenSystemChildNoteIds: Set<String> = [
        "_hidden", "_share", "_lbRoot", "_lbAvailableLaunchers", "_lbVisibleLaunchers",
    ]

    /// Legacy / optional promoted label; sharing is defined by placement under `_share`, not this label.
    static let sharedLabelName = "shared"
    /// Optional human-readable path segment for the share URL.
    static let shareAliasLabelName = "shareAlias"

    static func isLabelShared(_ attr: AttributeItem) -> Bool {
        attr.type == .label && attr.name.caseInsensitiveCompare(Self.sharedLabelName) == .orderedSame
    }

    /// True when this note appears in the shared subtree (clone under `_share`), matching the desktop “Shared” switch.
    static func isPublishedUnderShareRoot(note: NoteItem) -> Bool {
        note.parentNoteIds.contains(shareRootNoteId)
    }

    /// Parent placeholders Trilium may emit; must not be passed to `getNote` (would 404 as “Note 'none' doesn't exist”).
    private static func sanitizedParentNoteId(_ raw: String) -> String? {
        let p = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !p.isEmpty else { return nil }
        if p.caseInsensitiveCompare("none") == .orderedSame { return nil }
        return p
    }

    /// Walks parent links via `getNote` until `_share` is found (handles clones nested under folders inside `_share`).
    static func noteHasShareAncestor(noteId: String, client: any TriliumClientProtocol) async throws -> Bool {
        var visited = Set<String>()
        var queue: [String] = [noteId]
        visited.insert(noteId)
        while let id = queue.first {
            queue.removeFirst()
            let response = try await client.getNote(id)
            for rawParent in response.parentNoteIds {
                guard let parentId = sanitizedParentNoteId(rawParent) else { continue }
                if parentId == shareRootNoteId { return true }
                if visited.insert(parentId).inserted {
                    queue.append(parentId)
                }
            }
        }
        return false
    }

    static func sharedLabelAttributeId(note: NoteItem) -> String? {
        note.attributes.first { isLabelShared($0) }?.attributeId
    }

    static func shareAliasSegment(note: NoteItem) -> String? {
        guard let attr = note.attributes.first(where: {
            $0.type == .label && $0.name.caseInsensitiveCompare(Self.shareAliasLabelName) == .orderedSame
        }) else { return nil }
        let t = attr.value.trimmingCharacters(in: .whitespacesAndNewlines)
        return t.isEmpty ? nil : t
    }

    /// Public read-only URL for this note when shared (`…/share/{noteId}` or `…/share/{alias}`).
    static func publicShareURL(baseURL: URL, note: NoteItem) -> URL? {
        let segment = shareAliasSegment(note: note) ?? note.noteId
        let encoded = segment.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? segment
        return baseURL.appendingPathComponent("share").appendingPathComponent(encoded)
    }

    // MARK: - Public sharing mutations (note detail + tree)

    enum PublicSharingMutationError: LocalizedError {
        case protectedNote
        case forbiddenNoteType

        var errorDescription: String? {
            switch self {
            case .protectedNote:
                String(localized: "Protected notes cannot be shared.", comment: "Share disabled for protected note")
            case .forbiddenNoteType:
                String(localized: "This note cannot be shared.", comment: "Share disabled for system notes")
            }
        }
    }

    /// Whether the note has a public `/share/…` placement (direct `_share` parent or ancestor).
    static func resolveIsPubliclyShared(note: NoteItem, client: any TriliumClientProtocol) async throws -> Bool {
        if isPublishedUnderShareRoot(note: note) { return true }
        return try await noteHasShareAncestor(noteId: note.noteId, client: client)
    }

    /// Clone to `_share` or remove that branch (same as the web “Shared” switch). Caller should refetch note/tree afterward.
    static func mutatePublicSharing(
        noteId: String,
        noteForAttributes: NoteItem,
        enable: Bool,
        client: any TriliumClientProtocol
    ) async throws {
        if noteForAttributes.isProtected { throw PublicSharingMutationError.protectedNote }
        guard ![shareRootNoteId, "_hidden", "root"].contains(noteId), !noteId.hasPrefix("_options") else {
            throw PublicSharingMutationError.forbiddenNoteType
        }
        if enable {
            if try await noteHasShareAncestor(noteId: noteId, client: client) { return }
            try await client.cloneNoteToParentNote(noteId, parentNoteId: shareRootNoteId)
        } else {
            guard let branchId = try await client.branchId(
                fromParentNoteId: shareRootNoteId,
                toChildNoteId: noteId
            ) else { return }
            try await client.deleteBranchWithNoProgressTask(branchId)
            if let attrId = sharedLabelAttributeId(note: noteForAttributes) {
                try? await client.deleteAttribute(noteId: noteId, attributeId: attrId)
            }
        }
    }
}

// MARK: - UI placement (clone vs share)

extension NoteItem {
    /// Note has a branch whose parent is `_share` (public link placement).
    var hasShareParentInTree: Bool {
        parentNoteIds.contains(TriliumSharing.shareRootNoteId)
    }

    /// `_share` plus exactly one other parent — sharing only; don’t show the generic “cloned” badge.
    var isSharedMinimalPlacement: Bool {
        hasShareParentInTree && parentNoteIds.count == 2
    }

    /// `_share` and three or more parents — multiple tree placements; show both share and clone affordances.
    var isSharedWithMultipleTreePlacements: Bool {
        hasShareParentInTree && parentNoteIds.count >= 3
    }

    /// Orange “cloned” branch badge (exclude share-only two-parent case).
    var showsMultiCloneBadge: Bool {
        if isSharedMinimalPlacement { return false }
        return parentNoteIds.count > 1
    }

    /// Green `scale.3d` / “Sharing” row when the note is under `_share`.
    var showsSharingBadge: Bool {
        hasShareParentInTree
    }
}
