import Foundation

/// Snapshots a note (optionally with subnotes) from one Trilium instance and recreates it under another.
@MainActor
enum CrossInstanceNoteCopyService {
    struct CopyableLabel: Equatable, Sendable {
        var name: String
        var value: String
        var isInheritable: Bool
        var position: Int
    }

    struct CopyableAttachment: Equatable, Sendable {
        var sourceAttachmentId: String?
        var sourceImageNoteId: String?
        var role: String
        var mime: String
        var title: String
        var position: Int
        var data: Data
    }

    struct SnapshotNode: Equatable, Sendable {
        var sourceNoteId: String
        var title: String
        var noteType: String
        var mime: String
        var body: Data
        var attachments: [CopyableAttachment]
        var labels: [CopyableLabel]
        var children: [SnapshotNode]

        var totalCount: Int {
            1 + children.reduce(0) { $0 + $1.totalCount }
        }
    }

    struct Snapshot: Equatable, Sendable {
        var root: SnapshotNode
        var skippedProtectedCount: Int

        var noteCount: Int { root.totalCount }
    }

    struct CopyResult: Equatable, Sendable {
        var destRootNoteId: String
        var copiedCount: Int
        var skippedProtectedCount: Int
    }

    enum CopyError: LocalizedError {
        case protectedNote
        case noteNotFound
        case contentUnavailable
        case cancelled
        case partial(copied: Int, total: Int, underlying: Error)

        var errorDescription: String? {
            switch self {
            case .protectedNote:
                return String(localized: "Protected notes cannot be copied to another instance.", comment: "Cross-instance copy protected")
            case .noteNotFound:
                return String(localized: "Note not found.", comment: "Cross-instance copy missing note")
            case .contentUnavailable:
                return String(
                    localized: "Note content is not available offline. Open the note while connected, then try again.",
                    comment: "Cross-instance copy needs content"
                )
            case .cancelled:
                return String(localized: "Copy was cancelled.", comment: "Cross-instance copy cancelled")
            case .partial(let copied, let total, let underlying):
                let detail = underlying.localizedDescription
                return String(
                    format: String(
                        localized: "Copied %lld of %lld notes, then failed: %@",
                        comment: "Partial cross-instance copy; counts then error"
                    ),
                    locale: .current,
                    copied,
                    total,
                    detail
                )
            }
        }
    }

    // MARK: - Snapshot (source instance only)

    static func snapshot(
        sourceNoteId: String,
        includeSubtree: Bool,
        sourceClient: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        sourceProfileId: String,
        protectedSessionActive: Bool
    ) async throws -> Snapshot {
        var visited = Set<String>()
        var skippedProtected = 0
        guard var root = try await snapshotNode(
            noteId: sourceNoteId,
            isCopyRoot: true,
            includeSubtree: includeSubtree,
            sourceClient: sourceClient,
            persistence: persistence,
            sourceProfileId: sourceProfileId,
            protectedSessionActive: protectedSessionActive,
            visited: &visited,
            skippedProtected: &skippedProtected
        ) else {
            throw CopyError.noteNotFound
        }
        try await promoteUncopiedImageReferences(
            &root,
            copiedNoteIds: snapshotNoteIds(root),
            sourceClient: sourceClient,
            persistence: persistence,
            sourceProfileId: sourceProfileId
        )
        return Snapshot(root: root, skippedProtectedCount: skippedProtected)
    }

    // MARK: - Recreate (destination instance only)

    static func recreate(
        _ snapshot: Snapshot,
        destClient: any TriliumClientProtocol,
        destParentNoteId: String = TriliumTreeConstants.rootNoteId,
        progress: ((Int, Int) -> Void)? = nil
    ) async throws -> CopyResult {
        let total = snapshot.noteCount
        var copied = 0
        progress?(0, total)
        do {
            var root = snapshot.root
            if destParentNoteId == TriliumTreeConstants.rootNoteId {
                let existing = await siblingTitles(parentNoteId: destParentNoteId, destClient: destClient)
                root.title = disambiguatedTitle(root.title, existingSiblingTitles: existing)
            }
            var noteIdMap: [String: String] = [:]
            var attachmentIdMap: [String: String] = [:]
            var imageNoteToAttachmentId: [String: String] = [:]
            let destId = try await recreateNode(
                root,
                destParentNoteId: destParentNoteId,
                destClient: destClient,
                copied: &copied,
                total: total,
                progress: progress,
                noteIdMap: &noteIdMap,
                attachmentIdMap: &attachmentIdMap,
                imageNoteToAttachmentId: &imageNoteToAttachmentId
            )
            return CopyResult(
                destRootNoteId: destId,
                copiedCount: copied,
                skippedProtectedCount: snapshot.skippedProtectedCount
            )
        } catch is CancellationError {
            throw CopyError.cancelled
        } catch let error as CopyError {
            throw error
        } catch {
            throw CopyError.partial(copied: copied, total: total, underlying: error)
        }
    }

    /// Snapshot from the source, then create on the destination (no interleaved HTTP).
    static func copy(
        sourceNoteId: String,
        includeSubtree: Bool,
        sourceClient: (any TriliumClientProtocol)?,
        destClient: any TriliumClientProtocol,
        persistence: PersistenceManager,
        sourceProfileId: String,
        protectedSessionActive: Bool,
        destParentNoteId: String = TriliumTreeConstants.rootNoteId,
        progress: ((Int, Int) -> Void)? = nil
    ) async throws -> CopyResult {
        let snap = try await snapshot(
            sourceNoteId: sourceNoteId,
            includeSubtree: includeSubtree,
            sourceClient: sourceClient,
            persistence: persistence,
            sourceProfileId: sourceProfileId,
            protectedSessionActive: protectedSessionActive
        )
        return try await recreate(
            snap,
            destClient: destClient,
            destParentNoteId: destParentNoteId,
            progress: progress
        )
    }

    // MARK: - Private snapshot

    private static func snapshotNode(
        noteId: String,
        isCopyRoot: Bool,
        includeSubtree: Bool,
        sourceClient: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        sourceProfileId: String,
        protectedSessionActive: Bool,
        visited: inout Set<String>,
        skippedProtected: inout Int
    ) async throws -> SnapshotNode? {
        if CrossInstanceCopyAvailability.shouldSkipAsChild(noteId: noteId) {
            return nil
        }
        if !visited.insert(noteId).inserted {
            return nil
        }

        let meta = try await loadMetadata(
            noteId: noteId,
            sourceClient: sourceClient,
            persistence: persistence,
            sourceProfileId: sourceProfileId
        )
        if meta.isProtected, !protectedSessionActive {
            if isCopyRoot {
                throw CopyError.protectedNote
            }
            skippedProtected += 1
            return nil
        }

        let body = try await loadBody(
            noteId: noteId,
            sourceClient: sourceClient,
            persistence: persistence,
            sourceProfileId: sourceProfileId
        )

        let attachments = try await loadAttachments(noteId: noteId, sourceClient: sourceClient)
        let labels = labelsToCopy(from: meta.attributes)

        var children: [SnapshotNode] = []
        if includeSubtree {
            let childIds = try await orderedChildNoteIds(
                noteId: noteId,
                note: meta,
                sourceClient: sourceClient,
                persistence: persistence,
                sourceProfileId: sourceProfileId
            )
            for childId in childIds {
                if Task.isCancelled { throw CopyError.cancelled }
                if let child = try await snapshotNode(
                    noteId: childId,
                    isCopyRoot: false,
                    includeSubtree: true,
                    sourceClient: sourceClient,
                    persistence: persistence,
                    sourceProfileId: sourceProfileId,
                    protectedSessionActive: protectedSessionActive,
                    visited: &visited,
                    skippedProtected: &skippedProtected
                ) {
                    children.append(child)
                }
            }
        }

        return SnapshotNode(
            sourceNoteId: noteId,
            title: meta.title,
            noteType: meta.noteType,
            mime: meta.mime,
            body: body,
            attachments: attachments,
            labels: labels,
            children: children
        )
    }

    private struct NoteMeta {
        var title: String
        var noteType: String
        var mime: String
        var isProtected: Bool
        var parentNoteIds: [String]
        var childNoteIds: [String]
        var childBranchIds: [String]
        var attributes: [AttributeItem]
        var asNoteItem: NoteItem
    }

    private static func loadMetadata(
        noteId: String,
        sourceClient: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        sourceProfileId: String
    ) async throws -> NoteMeta {
        if let sourceClient {
            do {
                let response = try await sourceClient.getNote(noteId)
                if response.isDeleted { throw CopyError.noteNotFound }
                let item = NoteItem(from: response)
                return NoteMeta(
                    title: response.title,
                    noteType: response.type,
                    mime: response.mime,
                    isProtected: response.isProtected,
                    parentNoteIds: response.parentNoteIds,
                    childNoteIds: response.childNoteIds,
                    childBranchIds: response.childBranchIds,
                    attributes: item.attributes,
                    asNoteItem: item
                )
            } catch let error as CopyError {
                throw error
            } catch {
                // Fall through to cache.
            }
        }
        guard let cached = try persistence.fetchCachedNote(id: noteId, serverProfileId: sourceProfileId) else {
            throw CopyError.noteNotFound
        }
        let cachedAttrs = (try? persistence.fetchCachedAttributes(noteId: noteId, serverProfileId: sourceProfileId)) ?? []
        let attributes = cachedAttrs.map { row in
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
        let item = NoteItem(
            noteId: cached.noteId,
            title: cached.title,
            type: NoteType(rawValue: cached.noteType) ?? .text,
            mime: cached.mime,
            isProtected: cached.isProtected,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: cached.parentNoteIds,
            childNoteIds: cached.childNoteIds,
            parentBranchIds: cached.parentBranchIds,
            childBranchIds: cached.childBranchIds,
            attributes: attributes
        )
        return NoteMeta(
            title: cached.title,
            noteType: cached.noteType,
            mime: cached.mime,
            isProtected: cached.isProtected,
            parentNoteIds: cached.parentNoteIds,
            childNoteIds: cached.childNoteIds,
            childBranchIds: cached.childBranchIds,
            attributes: attributes,
            asNoteItem: item
        )
    }

    private static func loadBody(
        noteId: String,
        sourceClient: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        sourceProfileId: String
    ) async throws -> Data {
        if let sourceClient {
            do {
                return try await sourceClient.getNoteContent(noteId)
            } catch {
                // Fall through to cache.
            }
        }
        if let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: sourceProfileId),
           let content = cached.content {
            return content
        }
        throw CopyError.contentUnavailable
    }

    private static func loadAttachments(
        noteId: String,
        sourceClient: (any TriliumClientProtocol)?
    ) async throws -> [CopyableAttachment] {
        guard let sourceClient else { return [] }
        let list = try await sourceClient.getNoteAttachments(noteId)
        var out: [CopyableAttachment] = []
        out.reserveCapacity(list.count)
        for item in list {
            do {
                let bytes = try await sourceClient.getAttachmentContent(item.attachmentId)
                out.append(
                    CopyableAttachment(
                        sourceAttachmentId: item.attachmentId,
                        sourceImageNoteId: nil,
                        role: item.role,
                        mime: item.mime,
                        title: item.title,
                        position: item.position,
                        data: bytes
                    )
                )
            } catch {
                Log.api.warning("Skipping attachment \(item.attachmentId) during instance copy: \(error)")
            }
        }
        return out
    }

    private static func snapshotNoteIds(_ node: SnapshotNode) -> Set<String> {
        var ids: Set<String> = [node.sourceNoteId]
        for child in node.children {
            ids.formUnion(snapshotNoteIds(child))
        }
        return ids
    }

    /// Image notes referenced as `api/images/{id}` that are not in the copied subtree become dest attachments.
    private static func promoteUncopiedImageReferences(
        _ node: inout SnapshotNode,
        copiedNoteIds: Set<String>,
        sourceClient: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        sourceProfileId: String
    ) async throws {
        let refs = CrossInstanceCopyBodyRewriter.referencedEntityIDs(in: node.body)
        for imageNoteId in refs.imageNoteIds where !copiedNoteIds.contains(imageNoteId) {
            if CrossInstanceCopyAvailability.shouldSkipAsChild(noteId: imageNoteId) { continue }
            if node.attachments.contains(where: { $0.sourceImageNoteId == imageNoteId }) { continue }
            guard let payload = try await loadPromotedImageNote(
                noteId: imageNoteId,
                sourceClient: sourceClient,
                persistence: persistence,
                sourceProfileId: sourceProfileId
            ) else { continue }
            node.attachments.append(payload)
        }
        for i in node.children.indices {
            try await promoteUncopiedImageReferences(
                &node.children[i],
                copiedNoteIds: copiedNoteIds,
                sourceClient: sourceClient,
                persistence: persistence,
                sourceProfileId: sourceProfileId
            )
        }
    }

    private static func loadPromotedImageNote(
        noteId: String,
        sourceClient: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        sourceProfileId: String
    ) async throws -> CopyableAttachment? {
        let meta: NoteMeta
        do {
            meta = try await loadMetadata(
                noteId: noteId,
                sourceClient: sourceClient,
                persistence: persistence,
                sourceProfileId: sourceProfileId
            )
        } catch {
            return nil
        }
        let isImageNote = meta.noteType.caseInsensitiveCompare("image") == .orderedSame
            || meta.mime.lowercased().hasPrefix("image/")
        guard isImageNote else { return nil }
        let body: Data
        do {
            body = try await loadBody(
                noteId: noteId,
                sourceClient: sourceClient,
                persistence: persistence,
                sourceProfileId: sourceProfileId
            )
        } catch {
            return nil
        }
        guard !body.isEmpty else { return nil }
        let filename = meta.title.trimmingCharacters(in: .whitespacesAndNewlines)
        let title = filename.isEmpty ? "image.png" : filename
        return CopyableAttachment(
            sourceAttachmentId: nil,
            sourceImageNoteId: noteId,
            role: "image",
            mime: meta.mime.isEmpty ? "image/png" : meta.mime,
            title: title,
            position: 0,
            data: body
        )
    }

    private static func orderedChildNoteIds(
        noteId: String,
        note: NoteMeta,
        sourceClient: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        sourceProfileId: String
    ) async throws -> [String] {
        if let sourceClient {
            var branchCache: [String: BranchItem] = [:]
            var noteCache: [String: NoteItem] = [noteId: note.asNoteItem]
            try await TreeChildBatchLoader.populateCachesIfNeeded(
                parentNote: note.asNoteItem,
                client: sourceClient,
                branchCache: &branchCache,
                noteCache: &noteCache
            )
            var pairs: [(Int, String)] = []
            for branchId in note.childBranchIds {
                guard let branch = branchCache[branchId] else { continue }
                if CrossInstanceCopyAvailability.shouldSkipAsChild(noteId: branch.noteId) { continue }
                pairs.append((branch.notePosition, branch.noteId))
            }
            if pairs.isEmpty {
                return note.childNoteIds.filter { !CrossInstanceCopyAvailability.shouldSkipAsChild(noteId: $0) }
            }
            pairs.sort { $0.0 < $1.0 }
            return pairs.map(\.1)
        }
        if let ordered = try? persistence.fetchChildNoteIdsOrderedFromBranches(
            parentNoteId: noteId,
            serverProfileId: sourceProfileId
        ), !ordered.isEmpty {
            return ordered.filter { !CrossInstanceCopyAvailability.shouldSkipAsChild(noteId: $0) }
        }
        return note.childNoteIds.filter { !CrossInstanceCopyAvailability.shouldSkipAsChild(noteId: $0) }
    }

    private static func labelsToCopy(from attributes: [AttributeItem]) -> [CopyableLabel] {
        attributes.compactMap { attr in
            guard attr.type == .label else { return nil }
            let name = attr.name.trimmingCharacters(in: .whitespacesAndNewlines)
            guard !name.isEmpty else { return nil }
            if name.caseInsensitiveCompare(TriliumSharing.sharedLabelName) == .orderedSame { return nil }
            if name.caseInsensitiveCompare(TriliumSharing.shareAliasLabelName) == .orderedSame { return nil }
            return CopyableLabel(
                name: attr.name,
                value: attr.value,
                isInheritable: attr.isInheritable,
                position: attr.position
            )
        }
    }

    // MARK: - Title disambiguation

    /// Random 7-digit suffix (`0000000`…`9999999`) appended when a dest top-level title already exists.
    static func randomSevenDigitId() -> String {
        String(format: "%07d", Int.random(in: 0...9_999_999))
    }

    /// Keeps `title` when no sibling uses it; otherwise `"Title 4829103"`.
    static func disambiguatedTitle(
        _ title: String,
        existingSiblingTitles: Set<String>,
        makeSuffix: () -> String = { randomSevenDigitId() }
    ) -> String {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)
        let existing = Set(existingSiblingTitles.map { $0.trimmingCharacters(in: .whitespacesAndNewlines) })
        guard existing.contains(trimmed) else { return title }

        let base = trimmed.isEmpty ? title : trimmed
        for _ in 0..<32 {
            let suffix = makeSuffix()
            let candidate = "\(base) \(suffix)".trimmingCharacters(in: .whitespacesAndNewlines)
            if !existing.contains(candidate) { return candidate }
        }
        return "\(base) \(String(UUID().uuidString.prefix(7)))"
    }

    private static func siblingTitles(
        parentNoteId: String,
        destClient: any TriliumClientProtocol
    ) async -> Set<String> {
        do {
            let (parent, _) = try await destClient.getNoteWithBranches(parentNoteId)
            let childIds = parent.childNoteIds
            guard !childIds.isEmpty else { return [] }
            let tree = try await destClient.batchTreeLoad(noteIds: childIds)
            return Set(
                tree.notes.compactMap { row in
                    guard row.isDeleted != true else { return nil }
                    return row.title.trimmingCharacters(in: .whitespacesAndNewlines)
                }
            )
        } catch {
            Log.api.warning("Could not list destination siblings for copy title disambiguation: \(error)")
            return []
        }
    }

    // MARK: - Private recreate

    private static func recreateNode(
        _ node: SnapshotNode,
        destParentNoteId: String,
        destClient: any TriliumClientProtocol,
        copied: inout Int,
        total: Int,
        progress: ((Int, Int) -> Void)?,
        noteIdMap: inout [String: String],
        attachmentIdMap: inout [String: String],
        imageNoteToAttachmentId: inout [String: String]
    ) async throws -> String {
        if Task.isCancelled { throw CopyError.cancelled }
        let created = try await destClient.createChildNoteWithContent(
            parentNoteId: destParentNoteId,
            title: node.title,
            noteType: node.noteType,
            mime: node.mime,
            body: node.body
        )
        let destId = created.note.noteId
        noteIdMap[node.sourceNoteId] = destId
        for attachment in node.attachments {
            if Task.isCancelled { throw CopyError.cancelled }
            let newAttId = try await destClient.uploadNoteAttachment(
                noteId: destId,
                data: attachment.data,
                filename: attachment.title,
                contentType: attachment.mime
            )
            if let oldAttId = attachment.sourceAttachmentId {
                attachmentIdMap[oldAttId] = newAttId
            }
            if let oldImageNoteId = attachment.sourceImageNoteId {
                imageNoteToAttachmentId[oldImageNoteId] = newAttId
            }
        }
        for label in node.labels {
            do {
                try await destClient.createAttribute(
                    CreateAttributeRequest(
                        noteId: destId,
                        type: "label",
                        name: label.name,
                        value: label.value,
                        isInheritable: label.isInheritable,
                        position: label.position
                    )
                )
            } catch {
                Log.api.warning("createAttribute failed during instance copy for \(destId) (\(label.name)): \(error)")
            }
        }
        copied += 1
        progress?(copied, total)
        for child in node.children {
            _ = try await recreateNode(
                child,
                destParentNoteId: destId,
                destClient: destClient,
                copied: &copied,
                total: total,
                progress: progress,
                noteIdMap: &noteIdMap,
                attachmentIdMap: &attachmentIdMap,
                imageNoteToAttachmentId: &imageNoteToAttachmentId
            )
        }
        let rewritten = CrossInstanceCopyBodyRewriter.rewrite(
            node.body,
            attachmentIdMap: attachmentIdMap,
            imageNoteIdMap: noteIdMap,
            imageNoteToAttachmentId: imageNoteToAttachmentId
        )
        if rewritten != node.body {
            try await destClient.updateNoteContent(destId, content: rewritten, contentType: node.mime)
        }
        return destId
    }
}
