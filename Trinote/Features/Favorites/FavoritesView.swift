import SwiftUI
import SwiftData

private enum FavoritesSortOrder: String, CaseIterable {
    case titleAscending = "A–Z"
    case titleDescending = "Z–A"
}

struct FavoritesView: View {
    var onNoteDeleted: (() -> Void)?

    @Environment(AppState.self) private var appState
    @State private var favorites: [FavoriteNote] = []
    /// Same row chrome as Recents: path from cache, tree “notebook” icon, last-open time when known.
    @State private var pathByNoteId: [String: String] = [:]
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
        return "Create \(selectedCount) duplicate(s) under “\(p.title)”?"
    }

    private var sortedFavorites: [FavoriteNote] {
        switch sortOrder {
        case .titleAscending:
            favorites.sorted { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }
        case .titleDescending:
            favorites.sorted { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedDescending }
        }
    }

    var body: some View {
        mainContent
            .navigationTitle("Favorites")
            .toolbar { toolbarContent }
            .task { loadFavorites() }
            .onAppear { loadFavorites() }
            .refreshable { loadFavorites() }
            .onChange(of: appState.activeProfile?.id) { _, _ in loadFavorites() }
            .alert("Delete Failed", isPresented: deleteErrorBinding) {
                Button("OK", role: .cancel) { deleteError = nil }
            } message: {
                Text(deleteError ?? "")
            }
            .alert("Remove from Favorites?", isPresented: $confirmRemoveFromFavorites) {
                Button("Cancel", role: .cancel) {}
                Button("Remove", role: .destructive) {
                    performBulkRemoveFromFavorites()
                }
            } message: {
                Text("Remove \(selectedCount) note(s) from Favorites? They will not be deleted from the server.")
            }
            .alert("Delete Notes?", isPresented: $confirmBulkDelete) {
                Button("Cancel", role: .cancel) {}
                Button("Delete", role: .destructive) {
                    Task { await performBulkDeleteNotes() }
                }
            } message: {
                Text("Permanently delete \(selectedCount) note(s) and all of their sub-notes? This cannot be undone easily.")
            }
            .alert("Duplicate Notes", isPresented: $confirmOpenDuplicatePicker) {
                Button("Cancel", role: .cancel) {}
                Button("Continue") {
                    showDuplicateParentPicker = true
                }
            } message: {
                Text("Next, choose a parent in the tree. \(selectedCount) duplicate(s) will be created as children of that note, or you can place them at the top level under Notes.")
            }
            .alert("Create Duplicates?", isPresented: $confirmRunDuplicate) {
                Button("Cancel", role: .cancel) {
                    duplicateTargetParent = nil
                }
                Button("Create") {
                    Task { await performBulkDuplicate() }
                }
            } message: {
                Text(bulkDuplicateConfirmMessage)
            }
            .navigationDestination(item: navigateToNoteBinding) { item in
                NoteDetailView(noteId: item.noteId, title: item.title)
            }
            .sheet(isPresented: $showDuplicateParentPicker) {
                DuplicateParentPickerSheet { parentId, title in
                    duplicateTargetParent = DuplicateParent(id: parentId, title: title)
                    showDuplicateParentPicker = false
                    confirmRunDuplicate = true
                }
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
                Label("No Favorites", systemImage: "star")
            } description: {
                Text("Long-press a note in the tree and choose \"Add to Favorites\" to add it here.")
            }
        } else {
            favoritesList
        }
    }

    private var favoritesList: some View {
        List {
            ForEach(sortedFavorites, id: \.id) { fav in
                favoriteListItem(fav)
            }
        }
        .listStyle(.insetGrouped)
        .disabled(isBulkWorking)
    }

    @ViewBuilder
    private func favoriteListItem(_ fav: FavoriteNote) -> some View {
        Group {
            if isEditMode {
                Button { toggleSelection(fav.noteId) } label: { favoriteRow(fav) }
                    .buttonStyle(.plain)
            } else {
                Button { navigateToNote = (fav.noteId, fav.title) } label: { favoriteRow(fav) }
                    .buttonStyle(.plain)
            }
        }
        .contentShape(Rectangle())
        .contextMenu { contextMenuContent(for: fav) }
    }

    @ViewBuilder
    private func contextMenuContent(for fav: FavoriteNote) -> some View {
        Button { sortOrder = .titleAscending } label: {
            Label("Sort by Title (A–Z)", systemImage: "arrow.up")
        }
        Button { sortOrder = .titleDescending } label: {
            Label("Sort by Title (Z–A)", systemImage: "arrow.down")
        }
        Divider()
        Button(role: .destructive) {
            Task { await deleteNote(fav) }
        } label: {
            Label("Delete Note", systemImage: "trash")
        }
        Button { removeFavorite(fav) } label: {
            Label("Remove from Favorites", systemImage: "star.slash")
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
                            Label("Remove from Favorites", systemImage: "star.slash")
                        }
                        .disabled(isBulkWorking)

                        Button(role: .destructive) {
                            confirmBulkDelete = true
                        } label: {
                            Label("Delete Notes", systemImage: "trash")
                        }
                        .disabled(isBulkWorking)

                        Button {
                            confirmOpenDuplicatePicker = true
                        } label: {
                            Label("Duplicate under Parent…", systemImage: "doc.on.doc")
                        }
                        .disabled(isBulkWorking)
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                    .accessibilityLabel("Bulk actions")
                }
                if !favorites.isEmpty {
                    Button(isEditMode ? "Done" : "Edit") {
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
                Text(fav.title)
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
            iconByNoteId = [:]
            lastAccessByNoteId = [:]
            return
        }
        let pm = PersistenceManager.shared
        do {
            let raw = try pm.fetchFavorites(serverProfileId: profileId)
            var paths: [String: String] = [:]
            var icons: [String: String] = [:]
            var access: [String: Date] = [:]
            var visible: [FavoriteNote] = []
            visible.reserveCapacity(raw.count)

            for fav in raw {
                if GhostNoteTracker.shared.contains(fav.noteId, serverProfileId: profileId) {
                    continue
                }

                let pathFull = pm.cachedNotePathDisplay(
                    noteId: fav.noteId,
                    leafTitle: fav.title,
                    serverProfileId: profileId
                )
                let pathUI = (pathFull == fav.title) ? "" : pathFull

                let hasCachedLeaf = (try? pm.fetchCachedNote(id: fav.noteId, serverProfileId: profileId)) != nil
                if !hasCachedLeaf && pathUI.isEmpty {
                    continue
                }

                visible.append(fav)
                paths[fav.noteId] = pathUI

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
            iconByNoteId = icons
            lastAccessByNoteId = access
        } catch {
            Log.persistence.error("Failed to load favorites: \(error)")
            favorites = []
            pathByNoteId = [:]
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

// MARK: - Parent picker for bulk duplicate

private struct DuplicateParentPickerSheet: View {
    let onPick: (String, String) -> Void

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 0) {
                Text("Choose where to place the duplicates. Use the tree to open folders, then tap a note to select it as the parent.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding()

                Button {
                    onPick("root", "Notes")
                } label: {
                    Label("Top level (under Notes)", systemImage: "tray.full")
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .buttonStyle(.bordered)
                .padding(.horizontal)
                .padding(.bottom, 8)

                TreeView(parentNoteId: "root", parentTitle: "Notes", onPickParent: { noteId, title in
                    onPick(noteId, title)
                })
            }
            .navigationTitle("Choose Parent")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
            }
        }
    }
}

private struct NoteNavItem: Identifiable, Hashable {
    let noteId: String
    let title: String
    var id: String { noteId }
}

#Preview {
    NavigationStack {
        FavoritesView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
