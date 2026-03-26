import SwiftUI

struct RecentsView: View {
    @Environment(AppState.self) private var appState
    @State private var recentNotes: [RecentNote] = []
    /// Cached breadcrumb path per note (from SwiftData); empty string if unavailable.
    @State private var pathByNoteId: [String: String] = [:]
    /// Row title with protected-note masking (SwiftData may still hold decrypted titles after restart).
    @State private var displayTitleByNoteId: [String: String] = [:]
    /// SF Symbol for the top-level-under-root note (same visual grouping as tree).
    @State private var iconByNoteId: [String: String] = [:]
    @State private var navigateToNote: (String, String)?

    var body: some View {
        Group {
            if recentNotes.isEmpty {
                ContentUnavailableView {
                    Label(String(localized: "No Recent Notes", comment: "Recents empty"), systemImage: "clock")
                } description: {
                    Text(String(localized: "Notes you open will appear here for quick access.", comment: "Recents empty hint"))
                }
            } else {
                List {
                    ForEach(recentNotes, id: \.id) { recent in
                        Button {
                            let navTitle = displayTitleByNoteId[recent.noteId] ?? recent.title
                            navigateToNote = (recent.noteId, navTitle)
                        } label: {
                            HStack(spacing: 12) {
                                Image(systemName: recentsRowIcon(for: recent))
                                    .foregroundStyle(.secondary)
                                    .frame(width: 24)
                                    .accessibilityHidden(true)

                                VStack(alignment: .leading, spacing: 2) {
                                    Text(displayTitleByNoteId[recent.noteId] ?? recent.title)
                                        .font(.body)
                                        .lineLimit(2)
                                        .foregroundStyle(.primary)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                        .multilineTextAlignment(.leading)
                                    HStack(alignment: .firstTextBaseline, spacing: 8) {
                                        Text(recent.accessedAt.relativeDisplay)
                                            .font(.caption)
                                            .foregroundStyle(.tertiary)
                                            .fixedSize(horizontal: true, vertical: false)
                                        if let path = pathByNoteId[recent.noteId], !path.isEmpty {
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

                                Image(systemName: "chevron.right")
                                    .font(.caption)
                                    .foregroundStyle(.quaternary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                    }
                }
                .listStyle(.insetGrouped)
            }
        }
        .navigationTitle(String(localized: "Recents", comment: "Recents tab title"))
        .task { loadRecents() }
        .refreshable { loadRecents() }
        .onChange(of: appState.protectedSessionActive) { _, _ in loadRecents() }
        .navigationDestination(item: Binding(
            get: { navigateToNote.map { NoteNavItem(noteId: $0.0, title: $0.1) } },
            set: { navigateToNote = $0.map { ($0.noteId, $0.title) } }
        )) { item in
            NoteDetailView(noteId: item.noteId, title: item.title)
        }
    }

    private func loadRecents() {
        guard let profileId = appState.activeProfile?.id else { return }
        let pm = PersistenceManager.shared
        do {
            let raw = try pm.fetchRecentNotes(serverProfileId: profileId)
            var paths: [String: String] = [:]
            var titlesOut: [String: String] = [:]
            var icons: [String: String] = [:]
            var visible: [RecentNote] = []
            visible.reserveCapacity(raw.count)
            paths.reserveCapacity(raw.count)
            icons.reserveCapacity(raw.count)

            for recent in raw {
                if GhostNoteTracker.shared.contains(recent.noteId, serverProfileId: profileId) {
                    continue
                }

                let leafProtected = (try? pm.fetchCachedNote(id: recent.noteId, serverProfileId: profileId))?.isProtected ?? false
                let rowTitle = NoteItem.maskedStoredTitle(
                    recent.title,
                    isProtected: leafProtected,
                    protectedSessionActive: appState.protectedSessionActive
                )

                let pathFull = pm.cachedNotePathDisplay(
                    noteId: recent.noteId,
                    leafTitle: recent.title,
                    leafIsProtected: leafProtected,
                    serverProfileId: profileId,
                    protectedSessionActive: appState.protectedSessionActive
                )
                // Avoid duplicating the title line when cache has no ancestors.
                let pathUI = (pathFull == rowTitle) ? "" : pathFull

                let hasCachedLeaf = (try? pm.fetchCachedNote(id: recent.noteId, serverProfileId: profileId)) != nil
                // Deleted / purged notes: no cache row and no breadcrumb trail — drop from list.
                if !hasCachedLeaf && pathUI.isEmpty {
                    continue
                }

                visible.append(recent)
                paths[recent.noteId] = pathUI
                titlesOut[recent.noteId] = rowTitle
                icons[recent.noteId] = pm.recentsRowIconSystemName(
                    noteId: recent.noteId,
                    fallbackNoteType: recent.noteType,
                    serverProfileId: profileId
                )
            }

            recentNotes = visible
            pathByNoteId = paths
            displayTitleByNoteId = titlesOut
            iconByNoteId = icons
        } catch {
            Log.persistence.error("Failed to load recents: \(error)")
            recentNotes = []
            pathByNoteId = [:]
            displayTitleByNoteId = [:]
            iconByNoteId = [:]
        }
    }

    /// Persisted icon from last open, then live recompute from cache, then note type.
    private func recentsRowIcon(for recent: RecentNote) -> String {
        if let s = recent.listIconSystemName, !s.isEmpty { return s }
        if let s = iconByNoteId[recent.noteId], !s.isEmpty { return s }
        return (NoteType(rawValue: recent.noteType) ?? .text).iconName
    }
}

private struct NoteNavItem: Identifiable, Hashable {
    let noteId: String
    let title: String
    var id: String { noteId }
}

#Preview {
    NavigationStack {
        RecentsView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
