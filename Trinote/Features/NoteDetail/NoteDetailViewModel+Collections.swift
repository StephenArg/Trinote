import Foundation

/// Grid, List and Dashboard collection views (issue #38): the children a collection shows, their content previews,
/// the dashboard's saved layout and the rows a list opens on demand. Mirrors Trilium's `NoteList.tsx`,
/// `legacy/ListOrGridView.tsx` and `dashboard/index.tsx`.
extension NoteDetailViewModel {
    /// What a collection note shows: its children after Trilium's filtering, and the labels that shape the view.
    struct CollectionChildren: Sendable {
        var children: [CollectionNoteModels.Child] = []
        var includeArchived = false
        var expandedLabel: String?
        var pageSizeLabel: String?
        /// `#maxNestingDepth`, for the table's nested rows.
        var maxNestingDepthLabel: String?
    }

    /// Grid cards and dashboard widgets don't download bodies larger than this.
    static let collectionPreviewMaxBytes = 512 * 1024

    // MARK: Children

    /// The collection's direct children in branch order, minus what Trilium hides (system notes, notes the
    /// collection's own image or include links embed, archived notes unless `#includeArchived`).
    ///
    /// Reads the sub-notes `loadChildNotes()` already fetched, so a collection costs no second round-trip; children
    /// the cache excludes come from the server in one batch.
    /// `embedsHidden` leaves out the notes the collection's own image and include links embed, as the grid, list
    /// and dashboard do; the table shows every child branch.
    func loadCollectionChildren(for requestedNote: NoteItem, embedsHidden: Bool = true) async -> CollectionChildren {
        guard let profileId = serverProfileId else { return CollectionChildren() }
        let collection = note?.noteId == requestedNote.noteId ? (note ?? requestedNote) : requestedNote
        var ids = childNotes.map(\.noteId)
        if ids.isEmpty { ids = resolvedChildNoteIdsForDetail() }
        let summaries = Dictionary(childNotes.map { ($0.noteId, $0) }, uniquingKeysWith: { first, _ in first })

        let loaded = await collectionNoteItems(ids: ids, profileId: profileId)
        if Task.isCancelled { return CollectionChildren() }
        let resolver = collectionLabelResolver(fresh: loaded.fresh, known: [collection])
        let includeArchived = CollectionNoteModels.isTruthyLabel(resolver.value(of: "includeArchived", noteId: collection.noteId))
        let visible = CollectionNoteModels.filterTopLevel(
            childIds: ids,
            collectionRelations: embedsHidden ? collection.attributes : [],
            includeArchived: includeArchived,
            isArchived: { resolver.value(of: "archived", noteId: $0) != nil }
        )
        var children: [CollectionNoteModels.Child] = []
        for id in visible {
            if let item = loaded.items[id] {
                children.append(collectionChild(from: item, hasChildren: loaded.hasChildren[id] ?? item.hasChildren, resolver: resolver))
            } else if let summary = summaries[id] {
                children.append(collectionChild(fromSummary: summary))
            }
        }
        return CollectionChildren(
            children: children,
            includeArchived: includeArchived,
            expandedLabel: resolver.value(of: "expanded", noteId: collection.noteId),
            pageSizeLabel: resolver.value(of: "pageSize", noteId: collection.noteId),
            maxNestingDepthLabel: resolver.value(of: "maxNestingDepth", noteId: collection.noteId)
        )
    }

    private struct LoadedCollectionNotes {
        var items: [String: NoteItem] = [:]
        /// Children that came from the server just now (their attributes feed the label resolver).
        var fresh: [String: NoteResponse] = [:]
        var hasChildren: [String: Bool] = [:]
    }

    /// Notes by id from the cache, the rest from the server in batches (and into the cache).
    private func collectionNoteItems(ids: [String], profileId: String) async -> LoadedCollectionNotes {
        var loaded = LoadedCollectionNotes()
        guard !ids.isEmpty else { return loaded }
        let cached = (try? persistence.fetchCachedNotes(ids: ids, serverProfileId: profileId)) ?? [:]
        let attributesByNote = (try? persistence.fetchCachedAttributesByNote(noteIds: Array(cached.keys), serverProfileId: profileId)) ?? [:]
        let branchesByParent = (try? persistence.fetchCachedChildBranchesByParent(parentNoteIds: Array(cached.keys), serverProfileId: profileId)) ?? [:]
        for (id, row) in cached {
            let attributes = (attributesByNote[id] ?? []).map { a in
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
            loaded.items[id] = NoteItem(
                noteId: row.noteId,
                title: row.title,
                type: NoteType(rawValue: row.noteType) ?? .text,
                mime: row.mime,
                isProtected: row.isProtected,
                dateCreated: "",
                dateModified: "",
                parentNoteIds: row.parentNoteIds,
                childNoteIds: row.childNoteIds,
                parentBranchIds: row.parentBranchIds,
                childBranchIds: row.childBranchIds,
                attributes: attributes,
                serverTypeName: row.noteType
            )
            loaded.hasChildren[id] = !(branchesByParent[id] ?? []).isEmpty || !row.childBranchIds.isEmpty
        }
        let missing = ids.filter { cached[$0] == nil }
        if !missing.isEmpty, let client, isOnline {
            for response in await fetchNotesBatched(missing, client: client) where !response.isDeleted {
                persistNoteResponse(response, profileId: profileId)
                loaded.fresh[response.noteId] = response
                loaded.items[response.noteId] = NoteItem(from: response)
                loaded.hasChildren[response.noteId] = !response.childBranchIds.isEmpty
            }
            try? persistence.commitBatch()
        }
        return loaded
    }

    /// Labels the way Trilium reads them (own, inherited, template's), from notes just loaded first and the cache
    /// for everything else.
    private func collectionLabelResolver(fresh: [String: NoteResponse], known: [NoteItem]) -> TriliumLabelResolver {
        var contexts: [String: TriliumLabelResolver.NoteContext] = [:]
        for (id, response) in fresh {
            contexts[id] = TriliumLabelResolver.NoteContext(
                attributes: response.attributes.map(AttributeItem.init),
                parentNoteIds: response.parentNoteIds
            )
        }
        for item in known where contexts[item.noteId] == nil {
            contexts[item.noteId] = TriliumLabelResolver.NoteContext(attributes: item.attributes, parentNoteIds: item.parentNoteIds)
        }
        return labelResolver(contexts: contexts)
    }

    /// A label resolver that reads `contexts` first and the cache for any other note.
    func labelResolver(contexts: [String: TriliumLabelResolver.NoteContext]) -> TriliumLabelResolver {
        let profileId = serverProfileId
        let persistence = self.persistence
        let boardHidesChildren = TriliumServerCompatibility.supportsBoardOverhaul(appState.serverAppInfo)
        return TriliumLabelResolver(
            context: { noteId in
                if let context = contexts[noteId] { return context }
                guard let profileId else { return nil }
                return persistence.labelResolverContext(noteId: noteId, serverProfileId: profileId)
            },
            builtinTemplateLabel: { templateNoteId, name in
                TriliumBuiltinTemplateLabels.value(of: name, templateNoteId: templateNoteId, boardHidesChildren: boardHidesChildren)
            }
        )
    }

    private func collectionChild(from item: NoteItem, hasChildren: Bool, resolver: TriliumLabelResolver) -> CollectionNoteModels.Child {
        let icon = BoxiconsResolver.usableIconClass(from: effectiveIconClass(for: item))
            ?? CollectionNoteModels.defaultIconClass(type: item.type, hasChildren: hasChildren)
        let stored = item.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? item.noteId : item.title
        return CollectionNoteModels.Child(
            noteId: item.noteId,
            title: NoteItem.maskedStoredTitle(stored, isProtected: item.isProtected, protectedSessionActive: appState.protectedSessionActive),
            type: item.type,
            mime: item.mime,
            isProtected: item.isProtected,
            iconClass: icon,
            isArchived: resolver.value(of: "archived", noteId: item.noteId) != nil,
            hasChildren: hasChildren,
            colorLabel: item.colorLabelValue
        )
    }

    /// A child known only from the sub-notes list (its metadata is neither cached nor fetched yet).
    private func collectionChild(fromSummary summary: ChildNoteSummary) -> CollectionNoteModels.Child {
        let icon = BoxiconsResolver.usableIconClass(from: summary.iconClass)
            ?? CollectionNoteModels.defaultIconClass(type: summary.type, hasChildren: summary.childCount > 0)
        return CollectionNoteModels.Child(
            noteId: summary.noteId,
            title: NoteItem.maskedStoredTitle(summary.title, isProtected: summary.isProtected, protectedSessionActive: appState.protectedSessionActive),
            type: summary.type,
            mime: "",
            isProtected: summary.isProtected,
            iconClass: icon,
            isArchived: false,
            hasChildren: summary.childCount > 0,
            colorLabel: nil
        )
    }

    // MARK: Previews

    /// The preview under each child's header. `trim` is Trilium's card preview (styles and embeds dropped, an
    /// empty note lists its children); `capped` leaves out bodies over `collectionPreviewMaxBytes`.
    func loadCollectionPreviewBodies(
        for children: [CollectionNoteModels.Child],
        trim: Bool,
        noChildrenList: Bool,
        includeArchived: Bool,
        capped: Bool
    ) async -> [String: CollectionNoteModels.PreviewBody] {
        guard let profileId = serverProfileId else { return [:] }
        let sessionActive = appState.protectedSessionActive
        var bodies: [String: CollectionNoteModels.PreviewBody] = [:]
        var toRender: [CollectionNoteModels.Child] = []
        for child in children {
            if child.isProtected, !sessionActive {
                bodies[child.noteId] = .protected
            } else {
                toRender.append(child)
            }
        }
        // The bodies the previews read, a few downloads at a time rather than one after another.
        let bodyTypes: Set<NoteType> = [.text, .code, .markdown, .mermaid, .mindMap]
        let wanted = toRender.filter { bodyTypes.contains($0.type) }.map(\.noteId)
        let maxBytes = capped ? Self.collectionPreviewMaxBytes : nil
        let prefetched = await prefetchCollectionBodies(wanted, profileId: profileId, maxBytes: maxBytes)
        if Task.isCancelled { return bodies }

        let resolver = IncludeNoteResolver(
            client: client,
            persistence: persistence,
            profileId: profileId,
            protectedSessionActive: sessionActive,
            isOnline: isOnline,
            inlineAttachmentImages: { [weak self] html in
                await self?.htmlForReadOnlyDisplay(html) ?? html
            }
        )
        var options = IncludeNoteResolver.PreviewOptions()
        options.trim = trim
        options.noChildrenList = noChildrenList
        options.includeArchived = includeArchived
        options.maxBytes = maxBytes
        options.bodies = prefetched.bodies
        options.tooLargeNoteIds = prefetched.tooLarge
        options.inlineMermaid = true

        for child in toRender {
            if Task.isCancelled { break }
            let item = Self.cachedNoteItem(noteId: child.noteId, serverProfileId: profileId, persistence: persistence)
                ?? NoteItem(
                    noteId: child.noteId,
                    title: child.title,
                    type: child.type,
                    mime: child.mime,
                    isProtected: child.isProtected,
                    dateCreated: "",
                    dateModified: "",
                    parentNoteIds: [noteId],
                    childNoteIds: [],
                    parentBranchIds: [],
                    childBranchIds: [],
                    attributes: []
                )
            switch await resolver.previewBody(for: item, options: options) {
            case .html(let kind, let html): bodies[child.noteId] = .html(kind: kind, html: html)
            case .protected: bodies[child.noteId] = .protected
            case .tooLarge: bodies[child.noteId] = .tooLarge
            case .unavailable: bodies[child.noteId] = (client != nil && isOnline) ? .none : .notDownloaded
            case .noPreview: bodies[child.noteId] = .none
            }
        }
        return bodies
    }

    private struct PrefetchedBodies {
        var bodies: [String: Data] = [:]
        var tooLarge: Set<String> = []
    }

    /// Bodies from the cache, the rest downloaded six at a time (and cached). A cached body whose blob id no longer
    /// matches the note's is downloaded again.
    private func prefetchCollectionBodies(_ ids: [String], profileId: String, maxBytes: Int?) async -> PrefetchedBodies {
        var result = PrefetchedBodies()
        guard !ids.isEmpty else { return result }
        let cached = (try? persistence.fetchCachedNotes(ids: ids, serverProfileId: profileId)) ?? [:]
        var missing: [String] = []
        for id in ids {
            if let row = cached[id], let content = row.content, !content.isEmpty || row.contentFetchedAt != nil,
               !(row.blobId != nil && row.contentBlobId != nil && row.blobId != row.contentBlobId) {
                result.bodies[id] = content
            } else {
                missing.append(id)
            }
        }
        guard !missing.isEmpty, let client, isOnline else { return result }

        enum Fetched { case data(Data), tooLarge, failed }
        let fetched = await withTaskGroup(of: (String, Fetched).self) { group in
            var out: [String: Fetched] = [:]
            var next = 0
            func startNext() {
                guard next < missing.count else { return }
                let id = missing[next]
                next += 1
                group.addTask {
                    do {
                        if let maxBytes {
                            guard let data = try await client.getNoteContent(id, maxBytes: maxBytes) else { return (id, .tooLarge) }
                            return (id, .data(data))
                        }
                        return (id, .data(try await client.getNoteContent(id)))
                    } catch {
                        return (id, .failed)
                    }
                }
            }
            for _ in 0..<min(6, missing.count) { startNext() }
            for await (id, body) in group {
                out[id] = body
                startNext()
            }
            return out
        }
        for (id, body) in fetched {
            switch body {
            case .data(let data):
                result.bodies[id] = data
                cacheNoteContentIfAllowed(id, content: data, profileId: profileId, utcDateModified: cached[id]?.utcDateModified)
            case .tooLarge:
                result.tooLarge.insert(id)
            case .failed:
                break
            }
        }
        try? persistence.commitBatch()
        return result
    }

    // MARK: Dashboard

    /// The dashboard's saved widget geometry (`dashboard.json`, a `viewConfig` attachment on the collection), or nil
    /// when there is none or it can't be read offline: widgets then take the default size in branch order.
    func loadDashboardLayout(for note: NoteItem) async -> CollectionNoteModels.DashboardLayout? {
        await loadViewConfigData(for: note, title: CollectionNoteModels.Dashboard.attachmentTitle)
            .flatMap(CollectionNoteModels.DashboardLayout.decode)
    }

    /// A view's saved configuration: the `viewConfig` attachment titled `title`, from the server when online, else
    /// from the attachments already loaded for the note.
    func loadViewConfigData(for note: NoteItem, title: String) async -> Data? {
        if let client, isOnline {
            do {
                let attachments = try await client.getNoteAttachments(note.noteId)
                self.attachments = attachments.map(AttachmentItem.init)
                guard let attachment = attachments.first(where: { $0.title == title }) else { return nil }
                return try await client.getAttachmentContent(attachment.attachmentId)
            } catch {
                Log.api.debug("loadViewConfigData(\(title)) online failed: \(error)")
            }
        }
        if let attachment = attachments.first(where: { $0.title == title }), let client,
           let data = try? await client.getAttachmentContent(attachment.attachmentId) {
            return data
        }
        return nil
    }

    // MARK: Table

    struct CollectionTable: Sendable {
        var columns: [CollectionNoteModels.TableColumn] = []
        var rows: [CollectionNoteModels.TableRow] = []
    }

    /// Nested rows go this many levels down per load, however deep `#maxNestingDepth` allows.
    static let tableDepthBudget = 6

    /// Trilium's table view: a column per attribute definition the collection carries (its own and inherited ones),
    /// a row per child with its values, rows for their children down to `#maxNestingDepth`, in the order, widths and
    /// sort `table.json` saved.
    func loadCollectionTable(for requestedNote: NoteItem, children: CollectionChildren) async -> CollectionTable {
        guard let profileId = serverProfileId else { return CollectionTable() }
        let collection = note?.noteId == requestedNote.noteId ? (note ?? requestedNote) : requestedNote
        var inherited = collection.inheritedAttributes
        if inherited.isEmpty {
            inherited = TriliumAttributeInheritance.cachedInheritedAttributes(
                of: collection.noteId, serverProfileId: profileId, persistence: persistence
            )
        }
        let own = collection.attributes.sorted { $0.position < $1.position }
        let definitions = CollectionNoteModels.tableDefinitions(from: own + inherited)
        let config = await loadViewConfigData(for: collection, title: CollectionNoteModels.TableConfig.attachmentTitle)
            .flatMap(CollectionNoteModels.TableConfig.decode)
        if Task.isCancelled { return CollectionTable() }
        let columns = CollectionNoteModels.tableColumns(definitions: definitions, config: config)
        let maxDepth = CollectionNoteModels.maxNestingDepth(label: children.maxNestingDepthLabel)

        var rows = await tableRows(
            childIds: children.children.map(\.noteId), level: 0, maxDepth: maxDepth, depthBudget: Self.tableDepthBudget,
            includeArchived: children.includeArchived, definitions: definitions, known: [collection], profileId: profileId
        )
        if Task.isCancelled { return CollectionTable() }
        var targetIds = Set<String>()
        func collect(_ rows: [CollectionNoteModels.TableRow]) {
            for row in rows {
                for targets in row.relations.values { targetIds.formUnion(targets.map(\.noteId)) }
                collect(row.children)
            }
        }
        collect(rows)
        let targets = await tableTargets(ids: Array(targetIds), profileId: profileId)
        if Task.isCancelled { return CollectionTable() }
        rows = CollectionNoteModels.resolvingTargets(rows, targets)
        rows = CollectionNoteModels.sortedTableRows(rows, by: config?.sort ?? [], columns: columns)
        return CollectionTable(columns: columns, rows: rows)
    }

    /// A row per note of `childIds`, each with the values the definitions name: a single label through inheritance
    /// (as `getLabelValue` reads it), a set from the note's own labels, relations by target (resolved later, in one
    /// batch); then rows for their children while the depth allows.
    private func tableRows(
        childIds: [String], level: Int, maxDepth: Int, depthBudget: Int, includeArchived: Bool,
        definitions: [CollectionNoteModels.TableDefinition], known: [NoteItem], profileId: String
    ) async -> [CollectionNoteModels.TableRow] {
        guard !childIds.isEmpty else { return [] }
        let loaded = await collectionNoteItems(ids: childIds, profileId: profileId)
        if Task.isCancelled { return [] }
        let resolver = collectionLabelResolver(fresh: loaded.fresh, known: known)
        var rows: [CollectionNoteModels.TableRow] = []
        for id in childIds {
            guard let item = loaded.items[id] else { continue }
            let hasChildren = loaded.hasChildren[id] ?? item.hasChildren
            let child = collectionChild(from: item, hasChildren: hasChildren, resolver: resolver)
            var row = CollectionNoteModels.TableRow(child: child, level: level)
            for definition in definitions {
                let held = item.attributes
                    .filter { $0.type == definition.kind && $0.name == definition.name }
                    .sorted { $0.position < $1.position }
                switch definition.kind {
                case .relation:
                    row.relations[definition.name] = held.map(\.value).filter { !$0.isEmpty }
                        .map { CollectionNoteModels.TableTarget(noteId: $0, title: "", iconClass: "", colorLabel: nil) }
                case .label:
                    if definition.isMulti {
                        row.labels[definition.name] = held.map(\.value).filter { !$0.isEmpty }
                    } else if let value = resolver.value(of: definition.name, noteId: id) {
                        row.labels[definition.name] = [value]
                    }
                }
            }
            row.dateCreated = item.dateCreated.isEmpty ? nil : item.dateCreated
            row.dateModified = item.dateModified.isEmpty ? nil : item.dateModified
            if hasChildren, maxDepth < 0 || level < maxDepth, depthBudget > 1 {
                let nested = await collectionNestedChildIds(of: item, includeArchived: includeArchived, profileId: profileId)
                if Task.isCancelled { return [] }
                row.children = await tableRows(
                    childIds: nested.ids, level: level + 1, maxDepth: maxDepth, depthBudget: depthBudget - 1,
                    includeArchived: includeArchived, definitions: definitions, known: known + [nested.parent], profileId: profileId
                )
            }
            rows.append(row)
        }
        return rows
    }

    /// A note's children for nested rows: its branches from the server when online (cached as they come), else
    /// from the cache; minus hidden system notes, ghosts and, unless included, archived notes.
    private func collectionNestedChildIds(
        of parent: NoteItem, includeArchived: Bool, profileId: String
    ) async -> (parent: NoteItem, ids: [String]) {
        var parentItem = parent
        var childIds: [String] = []
        var fetched = false
        if let client, isOnline, !parent.noteId.isOfflineLocalNoteId {
            do {
                let (response, branches) = try await client.getNoteWithBranches(parent.noteId)
                persistNoteResponse(response, profileId: profileId)
                parentItem = NoteItem(from: response)
                let ordered = branches.sorted { $0.notePosition < $1.notePosition }
                let rules = cacheExclusion.snapshot(serverProfileId: profileId)
                let cachedBranches = (try? persistence.fetchCachedBranches(ids: ordered.map(\.branchId), serverProfileId: profileId)) ?? [:]
                for branch in ordered where !rules.isNoteExcludedFromCache(noteId: branch.noteId, parentNoteIds: [parent.noteId]) {
                    persistence.upsertBranchForFullSync(branch, existing: cachedBranches[branch.branchId], serverProfileId: profileId)
                }
                try? persistence.commitBatch()
                childIds = ordered.map(\.noteId)
                fetched = true
            } catch {
                Log.api.debug("collectionNestedChildIds: server load failed for \(parent.noteId): \(error)")
            }
        }
        if !fetched {
            childIds = (try? persistence.fetchChildNoteIdsOrderedFromBranches(parentNoteId: parent.noteId, serverProfileId: profileId)) ?? []
        }
        let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)
        childIds = childIds.filter { !ghosts.contains($0) && !TriliumSharing.hiddenSystemChildNoteIds.contains($0) }
        guard !includeArchived, !childIds.isEmpty else { return (parentItem, childIds) }
        let loaded = await collectionNoteItems(ids: childIds, profileId: profileId)
        let resolver = collectionLabelResolver(fresh: loaded.fresh, known: [parentItem])
        return (parentItem, childIds.filter { resolver.value(of: "archived", noteId: $0) == nil })
    }

    /// The notes relation cells point at, by id: title (masked while protected), icon and colour.
    private func tableTargets(ids: [String], profileId: String) async -> [String: CollectionNoteModels.TableTarget] {
        guard !ids.isEmpty else { return [:] }
        let loaded = await collectionNoteItems(ids: ids, profileId: profileId)
        let resolver = collectionLabelResolver(fresh: loaded.fresh, known: [])
        var targets: [String: CollectionNoteModels.TableTarget] = [:]
        for (id, item) in loaded.items {
            let child = collectionChild(from: item, hasChildren: loaded.hasChildren[id] ?? item.hasChildren, resolver: resolver)
            targets[id] = CollectionNoteModels.TableTarget(noteId: id, title: child.title, iconClass: child.iconClass, colorLabel: child.colorLabel)
        }
        return targets
    }

    // MARK: List rows

    /// A list row opened: its full content preview and its nested rows at `level + 1`, collapsed unless they fall
    /// within `#expanded` (then they open too, down to `depthBudget` levels per request).
    func loadCollectionListRow(
        noteId rowNoteId: String,
        level: Int,
        includeArchived: Bool,
        expandDepth: Int,
        depthBudget: Int = 6
    ) async -> CollectionNoteModels.ListRow? {
        guard let profileId = serverProfileId else { return nil }
        var fresh: [String: NoteResponse] = [:]
        var rowItem: NoteItem?
        var childIds: [String] = []
        if let client, isOnline, !rowNoteId.isOfflineLocalNoteId {
            do {
                let (response, branches) = try await client.getNoteWithBranches(rowNoteId)
                persistNoteResponse(response, profileId: profileId)
                fresh[rowNoteId] = response
                rowItem = NoteItem(from: response)
                let ordered = branches.sorted { $0.notePosition < $1.notePosition }
                let rules = cacheExclusion.snapshot(serverProfileId: profileId)
                let cachedBranches = (try? persistence.fetchCachedBranches(ids: ordered.map(\.branchId), serverProfileId: profileId)) ?? [:]
                for branch in ordered where !rules.isNoteExcludedFromCache(noteId: branch.noteId, parentNoteIds: [rowNoteId]) {
                    persistence.upsertBranchForFullSync(branch, existing: cachedBranches[branch.branchId], serverProfileId: profileId)
                }
                try? persistence.commitBatch()
                childIds = ordered.map(\.noteId)
            } catch {
                if case .cancelled = APIError.from(error) { return nil }
                Log.api.debug("loadCollectionListRow: server load failed for \(rowNoteId): \(error)")
            }
        }
        if rowItem == nil {
            rowItem = Self.cachedNoteItem(noteId: rowNoteId, serverProfileId: profileId, persistence: persistence)
            childIds = (try? persistence.fetchChildNoteIdsOrderedFromBranches(parentNoteId: rowNoteId, serverProfileId: profileId)) ?? []
        }
        guard let rowItem else { return nil }
        if Task.isCancelled { return nil }

        let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)
        childIds = childIds.filter { !ghosts.contains($0) && !TriliumSharing.hiddenSystemChildNoteIds.contains($0) }
        let loaded = await collectionNoteItems(ids: childIds, profileId: profileId)
        let resolver = collectionLabelResolver(fresh: loaded.fresh.merging(fresh) { first, _ in first }, known: [rowItem])
        let visible = CollectionNoteModels.filterNested(
            childIds: childIds,
            parentRelations: rowItem.attributes,
            includeArchived: includeArchived,
            isArchived: { resolver.value(of: "archived", noteId: $0) != nil }
        )
        let rowChild = collectionChild(from: rowItem, hasChildren: !visible.isEmpty || rowItem.hasChildren, resolver: resolver)
        let body = await loadCollectionPreviewBodies(
            for: [rowChild], trim: false, noChildrenList: true, includeArchived: includeArchived, capped: false
        )[rowNoteId] ?? .none
        if Task.isCancelled { return nil }

        var children: [CollectionNoteModels.ListRow] = []
        for id in visible {
            guard let item = loaded.items[id] else { continue }
            let nextLevel = level + 1
            if nextLevel <= expandDepth, depthBudget > 1,
               let nested = await loadCollectionListRow(
                   noteId: id, level: nextLevel, includeArchived: includeArchived, expandDepth: expandDepth, depthBudget: depthBudget - 1
               ) {
                children.append(nested)
            } else {
                let child = collectionChild(from: item, hasChildren: loaded.hasChildren[id] ?? item.hasChildren, resolver: resolver)
                children.append(CollectionNoteModels.ListRow(child: child, level: nextLevel))
            }
        }
        return CollectionNoteModels.ListRow(child: rowChild, level: level, isExpanded: true, isHydrated: true, body: body, children: children)
    }
}
