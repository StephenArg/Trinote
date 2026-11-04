import SwiftUI

/// A collection's Grid, List or Dashboard view (issue #38): the children drawn as one document in the read-only
/// web view, with a bar above it for the view switcher and the pager, like Trilium's collection properties bar.
struct CollectionNoteView: View {
    typealias Models = CollectionNoteModels
    typealias Builder = CollectionNoteHTMLBuilder

    let viewModel: NoteDetailViewModel
    let note: NoteItem
    let view: NoteTypeChange.CollectionView
    var findControl: FindOnPageControl? = nil
    let onOpenNote: (String) -> Void

    @Environment(AppState.self) private var appState

    @State private var loaded: NoteDetailViewModel.CollectionChildren?
    @State private var loadedKey: String?
    @State private var page = 1
    @State private var pageHTML: String?
    @State private var listRows: [Models.ListRow] = []
    @State private var dashboardLayout: Models.DashboardLayout?
    @State private var isLoading = false
    @State private var inPlaceRevision = 0

    /// Changes whenever the children must be loaded again: another note or view, the sub-notes reloaded
    /// (pull-to-refresh, sync, a created child), or the protected session opened or closed.
    private var childrenKey: String {
        "\(note.noteId)|\(view.rawValue)|\(viewModel.childrenRevision)|\(appState.protectedSessionActive)"
    }

    private var pageSize: Int { Models.pageSize(label: loaded?.pageSizeLabel) }
    /// Dashboards and tables show every child at once.
    private var isSinglePage: Bool { view == .dashboard || view == .table }
    private var pageCount: Int {
        isSinglePage ? 1 : Models.pageCount(total: loaded?.children.count ?? 0, pageSize: pageSize)
    }
    private var expandDepth: Int { Models.expandDepth(label: loaded?.expandedLabel) }
    private var canEditCollection: Bool { viewModel.isOnline && note.isContentWritable && !viewModel.needsProtectedSession }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            propertiesBar
            content
            if pageCount > 1 {
                pager
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 8)
            }
        }
        .task(id: "\(childrenKey)|\(page)") { await load() }
        .onChange(of: note.noteId) { _, _ in
            page = 1
            loaded = nil
            loadedKey = nil
            pageHTML = nil
            listRows = []
        }
        .onChange(of: view) { _, _ in
            // Another view of the same collection: its document is built afresh, and the old one isn't shown
            // meanwhile (`inPlaceRevision` stays, the web view compares it with the last one it took).
            page = 1
            pageHTML = nil
            listRows = []
            isLoading = true
        }
    }

    // MARK: Chrome

    private var propertiesBar: some View {
        HStack(spacing: 12) {
            viewMenu
            if view == .list {
                expandMenu
            }
            Spacer(minLength: 0)
            if pageCount > 1 {
                pager
            }
        }
        .padding(.horizontal)
        .padding(.vertical, 8)
    }

    private var viewMenu: some View {
        Menu {
            ForEach(NoteTypeChange.switcherCollectionViews(serverInfo: appState.serverAppInfo)) { option in
                Button {
                    guard option != view else { return }
                    Task { await viewModel.setCollectionView(option) }
                } label: {
                    if option == view {
                        // A text check mark: menu rows drop an inline symbol, and put a label's symbol where the
                        // system likes (before the name on recent iOS).
                        Text(verbatim: "\(option.title) \u{2713}")
                    } else {
                        Text(option.title)
                    }
                }
            }
        } label: {
            HStack(spacing: 6) {
                NoteIconView(iconClass: view.iconClass, fallbackNoteType: view.noteType, size: .compact, foregroundStyle: .secondary)
                Text(view.title)
                    .font(.subheadline.weight(.medium))
                Image(systemName: "chevron.down")
                    .font(.caption2.weight(.semibold))
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(Color(.secondarySystemGroupedBackground), in: Capsule())
        }
        .disabled(!canEditCollection)
        .accessibilityLabel(String(localized: "Collection view", comment: "Collection view switcher"))
    }

    /// Trilium's list expand controls: how many levels start open is the collection's `#expanded` label.
    private var expandMenu: some View {
        Menu {
            Button(String(localized: "Expand", comment: "Collection list: open the first level of rows")) {
                Task { await viewModel.setNoteLabel(noteId: note.noteId, name: "expanded", value: "") }
            }
            Button(String(localized: "Expand Two Levels", comment: "Collection list expand depth")) {
                Task { await viewModel.setNoteLabel(noteId: note.noteId, name: "expanded", value: "2") }
            }
            Button(String(localized: "Expand Three Levels", comment: "Collection list expand depth")) {
                Task { await viewModel.setNoteLabel(noteId: note.noteId, name: "expanded", value: "3") }
            }
            Button(String(localized: "Expand All", comment: "Collection list: open every level of rows")) {
                Task { await viewModel.setNoteLabel(noteId: note.noteId, name: "expanded", value: "all") }
            }
            Button(String(localized: "Collapse All", comment: "Collection list: close every row")) {
                Task { await viewModel.removeNoteLabel(noteId: note.noteId, name: "expanded") }
            }
        } label: {
            Image(systemName: expandDepth > 0 ? "arrow.down.right.and.arrow.up.left" : "arrow.up.left.and.arrow.down.right")
                .font(.subheadline)
                .padding(8)
                .background(Color(.secondarySystemGroupedBackground), in: Circle())
        }
        .disabled(!canEditCollection)
        .accessibilityLabel(String(localized: "Expand rows", comment: "Collection list expand menu"))
    }

    private var pager: some View {
        HStack(spacing: 4) {
            Button {
                page = max(1, page - 1)
            } label: {
                Image(systemName: "chevron.left")
                    .frame(width: 32, height: 32)
                    .contentShape(Rectangle())
            }
            .disabled(page <= 1)
            .accessibilityLabel(String(localized: "Previous page", comment: "Collection pager"))
            Text(verbatim: "\(page) / \(pageCount)")
                .font(.subheadline.monospacedDigit())
                .foregroundStyle(.secondary)
            Button {
                page = min(pageCount, page + 1)
            } label: {
                Image(systemName: "chevron.right")
                    .frame(width: 32, height: 32)
                    .contentShape(Rectangle())
            }
            .disabled(page >= pageCount)
            .accessibilityLabel(String(localized: "Next page", comment: "Collection pager"))
        }
        .buttonStyle(.plain)
    }

    @ViewBuilder
    private var content: some View {
        if let html = pageHTML {
            HTMLNoteView(
                html: html,
                baseURL: viewModel.serverBaseURL,
                onNoteLinkTapped: onOpenNote,
                loadAttachmentPreview: { attachmentId in
                    await viewModel.prepareAttachmentPreview(attachmentId: attachmentId)
                },
                imageBytes: { routeType, entityId in
                    await viewModel.loadImageBytes(routeType: routeType, entityId: entityId)
                },
                findControl: findControl,
                listInteractionEnabled: false,
                allowListReorder: false,
                allowCollapsibleReorder: false,
                layoutCacheKey: viewModel.serverProfileId.map { "\($0)/\(note.noteId)/collection/\(view.rawValue)/\(page)" },
                inPlaceRevision: inPlaceRevision,
                collectionRowExpand: view == .list ? { noteId in await hydrateRow(noteId) } : nil,
                onCollectionRowToggled: view == .list ? { noteId, expanded in rowToggled(noteId, expanded: expanded) } : nil
            )
        } else if isLoading {
            ProgressView()
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
        } else if loaded != nil {
            ContentUnavailableView {
                Label(String(localized: "No Notes", comment: "Empty collection"), systemImage: "square.grid.2x2")
            } description: {
                Text(String(localized: "Notes added under this collection appear here.", comment: "Empty collection description"))
            }
            .padding(.vertical, 24)
        }
    }

    // MARK: Loading

    private func load() async {
        let key = childrenKey
        if loadedKey != key {
            if loaded == nil { isLoading = true }
            let result = await viewModel.loadCollectionChildren(for: note, embedsHidden: view != .table)
            if Task.isCancelled { return }
            var layout: Models.DashboardLayout?
            if view == .dashboard {
                layout = await viewModel.loadDashboardLayout(for: note)
                if Task.isCancelled { return }
            }
            loaded = result
            dashboardLayout = layout
            loadedKey = key
            let pages = isSinglePage ? 1 : Models.pageCount(total: result.children.count, pageSize: Models.pageSize(label: result.pageSizeLabel))
            if page > pages {
                // Restarts this task with the page that still exists.
                page = pages
                return
            }
        }
        await loadPage()
    }

    private func loadPage() async {
        guard let loaded else { return }
        let children = isSinglePage ? loaded.children : Models.pageItems(loaded.children, page: page, pageSize: pageSize)
        guard !children.isEmpty else {
            pageHTML = nil
            listRows = []
            isLoading = false
            return
        }
        switch view {
        case .grid, .dashboard:
            let bodies = await viewModel.loadCollectionPreviewBodies(
                for: children, trim: true, noChildrenList: false, includeArchived: loaded.includeArchived, capped: true
            )
            if Task.isCancelled { return }
            let items = children.map { Models.PageItem(child: $0, body: bodies[$0.noteId] ?? .none) }
            pageHTML = view == .grid ? Builder.grid(items: items) : Builder.dashboard(items: items, layout: dashboardLayout)
        case .list:
            let depth = expandDepth
            var rows: [Models.ListRow] = []
            for child in children {
                if depth >= 1, let row = await viewModel.loadCollectionListRow(
                    noteId: child.noteId, level: 1, includeArchived: loaded.includeArchived, expandDepth: depth
                ) {
                    rows.append(row)
                } else {
                    rows.append(Models.ListRow(child: child, level: 1))
                }
                if Task.isCancelled { return }
            }
            listRows = rows
            pageHTML = Builder.list(rows: rows)
        case .table:
            let table = await viewModel.loadCollectionTable(for: note, children: loaded)
            if Task.isCancelled { return }
            pageHTML = Builder.table(columns: table.columns, rows: table.rows)
        case .calendar, .geoMap, .board, .presentation:
            pageHTML = nil
        }
        isLoading = false
    }

    // MARK: List rows

    /// The page asked for a collapsed row's content: loads it, keeps the rows in step, and hands back what the page
    /// inserts under the title.
    private func hydrateRow(_ noteId: String) async -> String? {
        guard let loaded, let level = Self.level(of: noteId, in: listRows) else { return nil }
        guard let row = await viewModel.loadCollectionListRow(
            noteId: noteId, level: level, includeArchived: loaded.includeArchived, expandDepth: expandDepth
        ) else { return nil }
        listRows = Self.replacing(row, in: listRows)
        pageHTML = Builder.list(rows: listRows)
        inPlaceRevision &+= 1
        return Builder.listRowInner(row)
    }

    private func rowToggled(_ noteId: String, expanded: Bool) {
        listRows = Self.updating(noteId, in: listRows) { $0.isExpanded = expanded }
        pageHTML = Builder.list(rows: listRows)
        inPlaceRevision &+= 1
    }

    static func level(of noteId: String, in rows: [Models.ListRow]) -> Int? {
        for row in rows {
            if row.id == noteId { return row.level }
            if let found = level(of: noteId, in: row.children) { return found }
        }
        return nil
    }

    static func replacing(_ replacement: Models.ListRow, in rows: [Models.ListRow]) -> [Models.ListRow] {
        rows.map { row in
            if row.id == replacement.id { return replacement }
            var copy = row
            copy.children = replacing(replacement, in: row.children)
            return copy
        }
    }

    static func updating(_ noteId: String, in rows: [Models.ListRow], _ change: (inout Models.ListRow) -> Void) -> [Models.ListRow] {
        rows.map { row in
            var copy = row
            if row.id == noteId {
                change(&copy)
            } else {
                copy.children = updating(noteId, in: row.children, change)
            }
            return copy
        }
    }
}
