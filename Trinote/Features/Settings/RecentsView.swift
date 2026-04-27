import SwiftUI

struct RecentsView: View {
    @Environment(AppState.self) private var appState
    @Environment(\.colorScheme) private var colorScheme
    @AppStorage("useTriliumNoteColors") private var useTriliumNoteColors: Bool = true
    /// Mirrors the tree's background settings so the Recents list shares the same chrome
    /// (in particular when the user has chosen a custom tree background colour).
    @AppStorage("useCustomTreeColors") private var useCustomTreeColors: Bool = false
    @AppStorage("treeLightBgColor") private var treeLightBgColor: String = "#F2F2F7"
    @AppStorage("treeDarkBgColor") private var treeDarkBgColor: String = "#1c1c1e"
    @State private var recentNotes: [RecentNote] = []
    /// Cached breadcrumb path per note (from SwiftData); empty string if unavailable.
    @State private var pathByNoteId: [String: String] = [:]
    /// Row title with protected-note masking (SwiftData may still hold decrypted titles after restart).
    @State private var displayTitleByNoteId: [String: String] = [:]
    /// SF Symbol for the top-level-under-root note (same visual grouping as tree).
    @State private var iconByNoteId: [String: String] = [:]
    /// Raw value of the leaf note's `#color` label (Trilium tree color), per note id.
    @State private var colorLabelByNoteId: [String: String] = [:]
    @State private var navigateToNote: (String, String)?

    private var treeBgColor: Color? {
        guard useCustomTreeColors else { return nil }
        return colorScheme == .dark ? Color(hex: treeDarkBgColor) : Color(hex: treeLightBgColor)
    }

    /// Same fallback as `TreeView.treeChromeBackground` so both views land on the system grouped
    /// background when no custom colour is configured.
    private var treeChromeBackground: Color {
        treeBgColor ?? Color(.systemGroupedBackground)
    }

    var body: some View {
        Group {
            if recentNotes.isEmpty {
                ContentUnavailableView {
                    Label(String(localized: "No Recent Notes", comment: "Recents empty"), systemImage: "clock")
                } description: {
                    Text(String(localized: "Notes you open will appear here for quick access.", comment: "Recents empty hint"))
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(treeChromeBackground)
            } else {
                List {
                    ForEach(recentNotes, id: \.id) { recent in
                        Button {
                            let navTitle = displayTitleByNoteId[recent.noteId] ?? recent.title
                            navigateToNote = (recent.noteId, navTitle)
                        } label: {
                            HStack(spacing: 12) {
                                Image(systemName: recentsRowIcon(for: recent))
                                    .foregroundStyle(resolvedIconColor(for: recent))
                                    .frame(width: 24)
                                    .accessibilityHidden(true)

                                VStack(alignment: .leading, spacing: 2) {
                                    Text(displayTitleByNoteId[recent.noteId] ?? recent.title)
                                        .font(.body)
                                        .lineLimit(2)
                                        .foregroundStyle(resolvedTitleColor(for: recent))
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
                        .listRowBackground(treeBgColor ?? Color(.systemBackground))
                    }
                }
                .listStyle(.insetGrouped)
                .scrollContentBackground(.hidden)
                .background(treeChromeBackground)
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
            var colors: [String: String] = [:]
            var visible: [RecentNote] = []
            visible.reserveCapacity(raw.count)
            paths.reserveCapacity(raw.count)
            icons.reserveCapacity(raw.count)
            colors.reserveCapacity(raw.count)

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
                if let colorRaw = pm.cachedNoteColorLabel(noteId: recent.noteId, serverProfileId: profileId) {
                    colors[recent.noteId] = colorRaw
                }
            }

            recentNotes = visible
            pathByNoteId = paths
            displayTitleByNoteId = titlesOut
            iconByNoteId = icons
            colorLabelByNoteId = colors
        } catch {
            Log.persistence.error("Failed to load recents: \(error)")
            recentNotes = []
            pathByNoteId = [:]
            displayTitleByNoteId = [:]
            iconByNoteId = [:]
            colorLabelByNoteId = [:]
        }
    }

    /// Persisted icon from last open, then live recompute from cache, then note type.
    private func recentsRowIcon(for recent: RecentNote) -> String {
        if let s = recent.listIconSystemName, !s.isEmpty { return s }
        if let s = iconByNoteId[recent.noteId], !s.isEmpty { return s }
        return (NoteType(rawValue: recent.noteType) ?? .text).iconName
    }

    /// Trilium `#color` label wins when the global setting is on and the value is recognized.
    /// Suppressed for protected notes while the session is locked (so masked rows keep their muted look).
    private func triliumColor(for recent: RecentNote) -> Color? {
        guard useTriliumNoteColors else { return nil }
        if let profileId = appState.activeProfile?.id,
           let cached = try? PersistenceManager.shared.fetchCachedNote(id: recent.noteId, serverProfileId: profileId),
           cached.isProtected,
           !appState.protectedSessionActive {
            return nil
        }
        return TriliumNoteColorMapper.swiftUIColor(for: colorLabelByNoteId[recent.noteId])
    }

    private func resolvedTitleColor(for recent: RecentNote) -> Color {
        triliumColor(for: recent) ?? .primary
    }

    private func resolvedIconColor(for recent: RecentNote) -> Color {
        triliumColor(for: recent) ?? .secondary
    }
}

#Preview {
    NavigationStack {
        RecentsView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
