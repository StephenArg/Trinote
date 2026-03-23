import SwiftUI
import SwiftData

private enum FavoritesSortOrder: String, CaseIterable {
    case titleAscending = "A–Z"
    case titleDescending = "Z–A"
}

struct FavoritesView: View {
    var onNoteDeleted: (() -> Void)?

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var favorites: [FavoriteNote] = []
    @State private var navigateToNote: (String, String)?
    @State private var isEditMode = false
    @State private var selectedIds: Set<String> = []
    @State private var sortOrder: FavoritesSortOrder = .titleAscending
    @State private var deleteError: String?

    private var sortedFavorites: [FavoriteNote] {
        switch sortOrder {
        case .titleAscending:
            favorites.sorted { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }
        case .titleDescending:
            favorites.sorted { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedDescending }
        }
    }

    var body: some View {
        NavigationStack {
            mainContent
                .navigationTitle("Favorites")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar { toolbarContent }
                .task { loadFavorites() }
                .onChange(of: appState.activeProfile?.id) { _, _ in loadFavorites() }
                .alert("Delete Failed", isPresented: deleteErrorBinding) {
                    Button("OK", role: .cancel) { deleteError = nil }
                } message: {
                    Text(deleteError ?? "")
                }
                .navigationDestination(item: navigateToNoteBinding) { item in
                    NoteDetailView(noteId: item.noteId, title: item.title)
                }
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
        ToolbarItem(placement: .cancellationAction) {
            Button("Done") { dismiss() }
        }
        ToolbarItem(placement: .topBarTrailing) {
            if !favorites.isEmpty {
                Button(isEditMode ? "Done" : "Edit") {
                    isEditMode.toggle()
                    if !isEditMode { selectedIds.removeAll() }
                }
            }
        }
        if isEditMode && !selectedIds.isEmpty {
            ToolbarItem(placement: .bottomBar) {
                Button("Remove from Favorites", role: .destructive) {
                    removeSelected()
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
            Image(systemName: (NoteType(rawValue: fav.noteType) ?? .text).iconName)
                .foregroundStyle(.secondary)
                .frame(width: 24)
                .accessibilityHidden(true)

            Text(fav.title)
                .font(.body)
                .lineLimit(2)
                .foregroundStyle(.primary)

            Spacer()

            if !isEditMode {
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.quaternary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .contentShape(Rectangle())
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
            return
        }
        do {
            favorites = try PersistenceManager.shared.fetchFavorites(serverProfileId: profileId)
        } catch {
            Log.persistence.error("Failed to load favorites: \(error)")
        }
    }

    private func removeSelected() {
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
        guard let client = appState.client, let profileId = appState.activeProfile?.id else {
            deleteError = "Cannot delete while offline."
            return
        }
        guard fav.noteId != "root" else { return }
        do {
            try await client.deleteNote(fav.noteId)
            GhostNoteTracker.shared.add(fav.noteId, serverProfileId: profileId)
            try? PersistenceManager.shared.deleteCachedNotes(noteIds: [fav.noteId], serverProfileId: profileId)
            try? PersistenceManager.shared.removeFavorite(noteId: fav.noteId, serverProfileId: profileId)
            loadFavorites()
            onNoteDeleted?()
        } catch {
            deleteError = APIError.from(error).localizedDescription
            Log.api.error("Failed to delete note: \(error)")
        }
    }
}

private struct NoteNavItem: Identifiable, Hashable {
    let noteId: String
    let title: String
    var id: String { noteId }
}

#Preview {
    FavoritesView()
        .environment(AppState())
        .modelContainer(PersistenceManager.shared.container)
}
