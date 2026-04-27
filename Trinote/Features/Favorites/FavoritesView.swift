import SwiftUI
import SwiftData

private enum FavoritesSortOrder: String, CaseIterable {
    case titleAscending = "A–Z"
    case titleDescending = "Z–A"
}

/// One top-level notebook (child of `root`) and its favorited descendants.
private struct FavoriteNotebookSection: Identifiable {
    let id: String
    let title: String
    let items: [FavoriteNote]
}

struct FavoritesView: View {
    var onNoteDeleted: (() -> Void)?

    @Environment(AppState.self) private var appState
    @State private var favorites: [FavoriteNote] = []
    /// Same row chrome as Recents: path from cache, tree “notebook” icon, last-open time when known.
    @State private var pathByNoteId: [String: String] = [:]
    @State private var displayTitleByNoteId: [String: String] = [:]
    @State private var iconByNoteId: [String: String] = [:]
    @State private var lastAccessByNoteId: [String: Date] = [:]
    @State private var navigateToNote: (String, String)?
    @State private var isEditMode = false
    @State private var selectedIds: Set<String> = []
    @State private var sortOrder: FavoritesSortOrder = .titleAscending
    @State private var deleteError: String?

    @State private var confirmRemoveFromFavorites = false
    @State private var confirmBulkDelete = false
    @State private var confirmOpenDuplicatePicker = false
    @State private var confirmRunDuplicate = false
    @State private var showDuplicateParentPicker = false
    @State private var duplicateTargetParent: DuplicateParent?
    @State private var isBulkWorking = false

    private struct DuplicateParent: Equatable {
        let id: String
        let title: String
    }

    private var selectedCount: Int { selectedIds.count }

    private var bulkDuplicateConfirmMessage: String {
        guard let p = duplicateTargetParent else { return "" }
        return String(localized: "Create \(selectedCount) duplicate(s) under “\(p.title)”?", comment: "Favorites bulk duplicate confirm")
    }

    private var groupedFavoriteSections: [FavoriteNotebookSection] {
        guard let profileId = appState.activeProfile?.id, !favorites.isEmpty else { return [] }
        let pm = PersistenceManager.shared
        var buckets: [String: [FavoriteNote]] = [:]
        var titles: [String: String] = [:]

        for fav in favorites {
            let key: String
            if let topId = pm.topLevelNotebookId(noteId: fav.noteId, serverProfileId: profileId) {
                key = topId
                if titles[key] == nil {
                    if let cached = try? pm.fetchCachedNote(id: topId, serverProfileId: profileId) {
                        let t = cached.title.trimmingCharacters(in: .whitespacesAndNewlines)
                        let raw = t.isEmpty ? String(localized: "Notebook", comment: "Default notebook title") : t
                        titles[key] = NoteItem.maskedStoredTitle(
                            raw,
                            isProtected: cached.isProtected,
                            protectedSessionActive: appState.protectedSessionActive
                        )
                    } else {
                        titles[key] = "Notebook"
                    }
                }
            } else {
                key = "__other__"
                titles[key] = String(localized: "Other", comment: "Favorites grouping")
            }
            buckets[key, default: []].append(fav)
        }

        let session = appState.protectedSessionActive
        let sortKey: (FavoriteNote) -> String = { fav in
            let prot = (try? pm.fetchCachedNote(id: fav.noteId, serverProfileId: profileId))?.isProtected ?? false
            return NoteItem.maskedStoredTitle(fav.title, isProtected: prot, protectedSessionActive: session)
        }
        let sortedItems: ([FavoriteNote]) -> [FavoriteNote] = { notes in
            switch sortOrder {
            case .titleAscending:
                notes.sorted { sortKey($0).localizedCaseInsensitiveCompare(sortKey($1)) == .orderedAscending }
            case .titleDescending:
                notes.sorted { sortKey($0).localizedCaseInsensitiveCompare(sortKey($1)) == .orderedDescending }
            }
        }

        let keys = buckets.keys.sorted { a, b in
            if a == "__other__" { return false }
            if b == "__other__" { return true }
            return (titles[a] ?? "").localizedCaseInsensitiveCompare(titles[b] ?? "") == .orderedAscending
        }

        return keys.map { k in
            FavoriteNotebookSection(id: k, title: titles[k] ?? k, items: sortedItems(buckets[k] ?? []))
        }
    }

    var body: some View {
        mainContent
            .navigationTitle(String(localized: "Favorites", comment: "Favorites tab title"))
            .toolbar { toolbarContent }
            .task { loadFavorites() }
            .onAppear { loadFavorites() }
            .refreshable { loadFavorites() }
            .onChange(of: appState.protectedSessionActive) { _, _ in loadFavorites() }
            .onChange(of: appState.activeProfile?.id) { _, _ in loadFavorites() }
            .alert(String(localized: "Delete Failed", comment: "Favorites error"), isPresented: deleteErrorBinding) {
                Button(String(localized: "OK", comment: "Dismiss"), role: .cancel) { deleteError = nil }
            } message: {
                Text(deleteError ?? "")
            }
            .alert(String(localized: "Remove from Favorites?", comment: "Favorites bulk confirm"), isPresented: $confirmRemoveFromFavorites) {
                Button(String(localized: "Cancel", comment: "Favorites alert"), role: .cancel) {}
                Button(String(localized: "Remove", comment: "Favorites alert"), role: .destructive) {
                    performBulkRemoveFromFavorites()
                }
            } message: {
                Text(String(localized: "Remove \(selectedCount) note(s) from Favorites? They will not be deleted from the server.", comment: "Favorites bulk remove"))
            }
            .alert(String(localized: "Delete Notes?", comment: "Favorites bulk delete"), isPresented: $confirmBulkDelete) {
                Button(String(localized: "Cancel", comment: "Favorites alert"), role: .cancel) {}
                Button(String(localized: "Delete", comment: "Favorites alert"), role: .destructive) {
                    Task { await performBulkDeleteNotes() }
                }
            } message: {
                Text(String(localized: "Permanently delete \(selectedCount) note(s) and all of their sub-notes? This cannot be undone easily.", comment: "Favorites bulk delete"))
            }
            .alert(String(localized: "Duplicate Notes", comment: "Favorites duplicate flow"), isPresented: $confirmOpenDuplicatePicker) {
                Button(String(localized: "Cancel", comment: "Favorites alert"), role: .cancel) {}
                Button(String(localized: "Continue", comment: "Favorites duplicate")) {
                    showDuplicateParentPicker = true
                }
            } message: {
                Text(String(localized: "Next, choose a parent in the tree. \(selectedCount) duplicate(s) will be created as children of that note, or you can place them at the top level under Notes.", comment: "Favorites duplicate hint"))
            }
            .alert(String(localized: "Create Duplicates?", comment: "Favorites duplicate confirm"), isPresented: $confirmRunDuplicate) {
                Button(String(localized: "Cancel", comment: "Favorites alert"), role: .cancel) {
                    duplicateTargetParent = nil
                }
                Button(String(localized: "Create", comment: "Favorites duplicate")) {
                    Task { await performBulkDuplicate() }
                }
            } message: {
                Text(bulkDuplicateConfirmMessage)
            }
            .navigationDestination(item: navigateToNoteBinding) { item in
                NoteDetailView(noteId: item.noteId, title: item.title)
            }
            .sheet(isPresented: $showDuplicateParentPicker) {
                ParentPickerSheet(
                    navigationTitle: String(localized: "Choose Parent"),
                    instruction: String(localized: "Choose where to place the duplicates. Use the tree to open folders, then tap a note to select it as the parent."),
                    topLevelButtonTitle: String(localized: "Top level (under Notes)"),
                    onPick: { parentId, title, _ in
                        duplicateTargetParent = DuplicateParent(id: parentId, title: title)
                        showDuplicateParentPicker = false
                        confirmRunDuplicate = true
                    }
                )
                .environment(appState)
            }
    }

    private var deleteErrorBinding: Binding<Bool> {
        Binding(
            get: { deleteError != nil },
            set: { if !$0 { deleteError = nil } }
        )
    }

    private var navigateToNoteBinding: Binding<NoteNavItem?> {
        Binding(
            get: { navigateToNote.map { NoteNavItem(noteId: $0.0, title: $0.1) } },
            set: { navigateToNote = $0.map { ($0.noteId, $0.title) } }
        )
    }

    @ViewBuilder
    private var mainContent: some View {
        if favorites.isEmpty {
            ContentUnavailableView {
                Label(String(localized: "No Favorites", comment: "Favorites empty"), systemImage: "star")
            } description: {
                Text(String(localized: "Long-press a note in the tree and choose “Add to Favorites” to add it here.", comment: "Favorites empty hint"))
            }
        } else {
            favoritesList
        }
    }

    private var favoritesList: some View {
        List {
            ForEach(groupedFavoriteSections) { section in
                Section {
                    ForEach(section.items, id: \.id) { fav in
                        favoriteListItem(fav)
                    }
                } header: {
                    HStack(spacing: 8) {
                        Image(systemName: sectionHeaderIcon(for: section))
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                            .frame(width: 22, alignment: .center)
                            .accessibilityHidden(true)
                        Text(section.title)
                            .font(.subheadline.weight(.semibold))
                            .foregroundStyle(.primary)
                    }
                    .textCase(nil)
                }
            }
        }
        .listStyle(.insetGrouped)
        .disabled(isBulkWorking)
    }

    private func sectionHeaderIcon(for section: FavoriteNotebookSection) -> String {
        guard let profileId = appState.activeProfile?.id else { return "folder" }
        if section.id == "__other__" {
            return "square.grid.2x2"
        }
        return PersistenceManager.shared.recentsRowIconSystemName(
            noteId: section.id,
            fallbackNoteType: NoteType.text.rawValue,
            serverProfileId: profileId
        )
    }

    @ViewBuilder
    private func favoriteListItem(_ fav: FavoriteNote) -> some View {
        Group {
            if isEditMode {
                Button { toggleSelection(fav.noteId) } label: { favoriteRow(fav) }
                    .buttonStyle(.plain)
            } else {
                Button {
                    let navTitle = displayTitleByNoteId[fav.noteId] ?? fav.title
                    navigateToNote = (fav.noteId, navTitle)
                } label: { favoriteRow(fav) }
                    .buttonStyle(.plain)
            }
        }
        .contentShape(Rectangle())
        .contextMenu { contextMenuContent(for: fav) }
    }

    @ViewBuilder
    private func contextMenuContent(for fav: FavoriteNote) -> some View {
        Button { sortOrder = .titleAscending } label: {
            Label(String(localized: "Sort by Title (A–Z)", comment: "Favorites context menu"), systemImage: "arrow.up")
        }
        Button { sortOrder = .titleDescending } label: {
            Label(String(localized: "Sort by Title (Z–A)", comment: "Favorites context menu"), systemImage: "arrow.down")
        }
        Divider()
        Button(role: .destructive) {
            Task { await deleteNote(fav) }
        } label: {
            Label(String(localized: "Delete Note", comment: "Favorites context menu"), systemImage: "trash")
        }
        Button { removeFavorite(fav) } label: {
            Label(String(localized: "Remove from Favorites", comment: "Favorites context menu"), systemImage: "star.slash")
        }
    }

    @ToolbarContentBuilder
    private var toolbarContent: some ToolbarContent {
        ToolbarItem(placement: .topBarTrailing) {
            HStack(spacing: 16) {
                if isEditMode, !selectedIds.isEmpty {
                    Menu {
                        Button {
                            confirmRemoveFromFavorites = true
                        } label: {
                            Label(String(localized: "Remove from Favorites", comment: "Favorites bulk menu"), systemImage: "star.slash")
                        }
                        .disabled(isBulkWorking)

                        Button(role: .destructive) {
                            confirmBulkDelete = true
                        } label: {
                            Label(String(localized: "Delete Notes", comment: "Favorites bulk menu"), systemImage: "trash")
                        }
                        .disabled(isBulkWorking)

                        Button {
                            confirmOpenDuplicatePicker = true
                        } label: {
                            Label(String(localized: "Duplicate under Parent…", comment: "Favorites bulk menu"), systemImage: "doc.on.doc")
                        }
                        .disabled(isBulkWorking)
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                    .accessibilityLabel(String(localized: "Bulk actions", comment: "Favorites toolbar"))
                }
                if !favorites.isEmpty {
                    Button(isEditMode ? String(localized: "Done", comment: "Favorites edit mode") : String(localized: "Edit", comment: "Favorites edit mode")) {
                        isEditMode.toggle()
                        if !isEditMode { selectedIds.removeAll() }
                    }
                    .disabled(isBulkWorking)
                }
            }
        }
    }

    private func favoriteRow(_ fav: FavoriteNote) -> some View {
        HStack(spacing: 12) {
            if isEditMode {
                Image(systemName: selectedIds.contains(fav.noteId) ? "checkmark.circle.fill" : "circle")
                    .foregroundStyle(selectedIds.contains(fav.noteId) ? Color.accentColor : Color.secondary)
            }
            Image(systemName: favoritesRowIcon(for: fav))
                .foregroundStyle(.secondary)
                .frame(width: 24)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                Text(displayTitleByNoteId[fav.noteId] ?? fav.title)
                    .font(.body)
                    .lineLimit(2)
                    .foregroundStyle(.primary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .multilineTextAlignment(.leading)
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Text(favoritesAccessLabel(for: fav))
                        .font(.caption)
                        .foregroundStyle(.tertiary)
                        .fixedSize(horizontal: true, vertical: false)
                    if let path = pathByNoteId[fav.noteId], !path.isEmpty {
                        Text(path)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                            .truncationMode(.middle)
                            .minimumScaleFactor(0.85)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            if !isEditMode {
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.quaternary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .contentShape(Rectangle())
    }

    private func favoritesRowIcon(for fav: FavoriteNote) -> String {
        if let s = iconByNoteId[fav.noteId], !s.isEmpty { return s }
        return (NoteType(rawValue: fav.noteType) ?? .text).iconName
    }

    private func favoritesAccessLabel(for fav: FavoriteNote) -> String {
        if let d = lastAccessByNoteId[fav.noteId] {
            return d.relativeDisplay
        }
        return "Not opened recently"
    }

    private func toggleSelection(_ noteId: String) {
        if selectedIds.contains(noteId) {
            selectedIds.remove(noteId)
        } else {
            selectedIds.insert(noteId)
        }
    }

    private func loadFavorites() {
        guard let profileId = appState.activeProfile?.id else {
            favorites = []
            pathByNoteId = [:]
            displayTitleByNoteId = [:]
            iconByNoteId = [:]
            lastAccessByNoteId = [:]
            return
        }
        let pm = PersistenceManager.shared
        do {
            let raw = try pm.fetchFavorites(serverProfileId: profileId)
            var paths: [String: String] = [:]
            var titlesOut: [String: String] = [:]
            var icons: [String: String] = [:]
            var access: [String: Date] = [:]
            var visible: [FavoriteNote] = []
            visible.reserveCapacity(raw.count)

            for fav in raw {
                if GhostNoteTracker.shared.contains(fav.noteId, serverProfileId: profileId) {
                    continue
                }

                let leafProtected = (try? pm.fetchCachedNote(id: fav.noteId, serverProfileId: profileId))?.isProtected ?? false
                let rowTitle = NoteItem.maskedStoredTitle(
                    fav.title,
                    isProtected: leafProtected,
                    protectedSessionActive: appState.protectedSessionActive
                )

                let pathFull = pm.cachedNotePathDisplay(
                    noteId: fav.noteId,
                    leafTitle: fav.title,
                    leafIsProtected: leafProtected,
                    serverProfileId: profileId,
                    protectedSessionActive: appState.protectedSessionActive
                )
                let pathUI = (pathFull == rowTitle) ? "" : pathFull

                let hasCachedLeaf = (try? pm.fetchCachedNote(id: fav.noteId, serverProfileId: profileId)) != nil
                if !hasCachedLeaf && pathUI.isEmpty {
                    continue
                }

                visible.append(fav)
                paths[fav.noteId] = pathUI
                titlesOut[fav.noteId] = rowTitle

                let recent = try? pm.fetchRecentNote(noteId: fav.noteId, serverProfileId: profileId)
                if let recent {
                    access[fav.noteId] = recent.accessedAt
                    if let s = recent.listIconSystemName, !s.isEmpty {
                        icons[fav.noteId] = s
                    } else {
                        icons[fav.noteId] = pm.recentsRowIconSystemName(
                            noteId: fav.noteId,
                            fallbackNoteType: fav.noteType,
                            serverProfileId: profileId
                        )
                    }
                } else {
                    icons[fav.noteId] = pm.recentsRowIconSystemName(
                        noteId: fav.noteId,
                        fallbackNoteType: fav.noteType,
                        serverProfileId: profileId
                    )
                }
            }

            favorites = visible
            pathByNoteId = paths
            displayTitleByNoteId = titlesOut
            iconByNoteId = icons
            lastAccessByNoteId = access
        } catch {
            Log.persistence.error("Failed to load favorites: \(error)")
            favorites = []
            pathByNoteId = [:]
            displayTitleByNoteId = [:]
            iconByNoteId = [:]
            lastAccessByNoteId = [:]
        }
    }

    private func performBulkRemoveFromFavorites() {
        guard let profileId = appState.activeProfile?.id else { return }
        do {
            try PersistenceManager.shared.removeFavorites(noteIds: selectedIds, serverProfileId: profileId)
            loadFavorites()
            selectedIds.removeAll()
            isEditMode = false
        } catch {
            Log.persistence.error("Failed to remove favorites: \(error)")
        }
    }

    private func performBulkDeleteNotes() async {
        guard appState.client != nil, appState.activeProfile?.id != nil else {
            deleteError = "Cannot delete while offline."
            return
        }
        isBulkWorking = true
        defer { isBulkWorking = false }
        let ids = Array(selectedIds)
        for noteId in ids where noteId != "root" {
            if let fav = favorites.first(where: { $0.noteId == noteId }) {
                await deleteFavoriteNoteOnServer(fav, postSync: false)
            }
        }
        selectedIds.removeAll()
        isEditMode = false
        loadFavorites()
        onNoteDeleted?()
    }

    private func performBulkDuplicate() async {
        guard let client = appState.client, let parent = duplicateTargetParent, let profileId = appState.activeProfile?.id else {
            duplicateTargetParent = nil
            return
        }
        isBulkWorking = true
        defer {
            isBulkWorking = false
            duplicateTargetParent = nil
            confirmRunDuplicate = false
        }
        let ids = Array(selectedIds)
        var failures = 0
        for noteId in ids {
            do {
                let response = try await client.duplicateNoteAsChild(sourceNoteId: noteId, parentNoteId: parent.id)
                try? PersistenceManager.shared.cacheNote(from: response.note, serverProfileId: profileId)
                try? PersistenceManager.shared.cacheBranch(from: response.branch, serverProfileId: profileId)
                try? PersistenceManager.shared.commitBatch()
            } catch {
                failures += 1
                Log.api.error("Bulk duplicate failed for \(noteId): \(error)")
            }
        }
        if failures > 0 {
            deleteError = failures == ids.count
                ? "Could not duplicate the selected notes."
                : "\(failures) of \(ids.count) notes could not be duplicated (e.g. protected notes)."
        }
        selectedIds.removeAll()
        isEditMode = false
        loadFavorites()
        onNoteDeleted?()
    }

    private func removeFavorite(_ fav: FavoriteNote) {
        guard let profileId = appState.activeProfile?.id else { return }
        do {
            try PersistenceManager.shared.removeFavorite(noteId: fav.noteId, serverProfileId: profileId)
            loadFavorites()
        } catch {
            Log.persistence.error("Failed to remove favorite: \(error)")
        }
    }

    private func deleteNote(_ fav: FavoriteNote) async {
        await deleteFavoriteNoteOnServer(fav, postSync: true)
    }

    private func deleteFavoriteNoteOnServer(_ fav: FavoriteNote, postSync: Bool) async {
        guard let client = appState.client, let profileId = appState.activeProfile?.id else {
            if postSync { deleteError = "Cannot delete while offline." }
            return
        }
        guard fav.noteId != "root" else { return }
        do {
            try await client.deleteNote(fav.noteId)
            GhostNoteTracker.shared.add(fav.noteId, serverProfileId: profileId)
            PersistenceManager.shared.removeFavoritesForCachedSubtree(rootNoteId: fav.noteId, serverProfileId: profileId)
            try? PersistenceManager.shared.deleteCachedNotes(noteIds: [fav.noteId], serverProfileId: profileId)
            loadFavorites()
            if postSync { onNoteDeleted?() }
        } catch {
            if postSync {
                deleteError = APIError.from(error).localizedDescription
            }
            Log.api.error("Failed to delete note: \(error)")
        }
    }
}

#Preview {
    NavigationStack {
        FavoritesView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
