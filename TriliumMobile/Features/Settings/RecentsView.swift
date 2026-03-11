import SwiftUI

struct RecentsView: View {
    @Environment(AppState.self) private var appState
    @State private var recentNotes: [RecentNote] = []
    @State private var navigateToNote: (String, String)?

    var body: some View {
        Group {
            if recentNotes.isEmpty {
                ContentUnavailableView {
                    Label("No Recent Notes", systemImage: "clock")
                } description: {
                    Text("Notes you open will appear here for quick access.")
                }
            } else {
                List {
                    ForEach(recentNotes, id: \.id) { recent in
                        Button {
                            navigateToNote = (recent.noteId, recent.title)
                        } label: {
                            HStack(spacing: 12) {
                                Image(systemName: (NoteType(rawValue: recent.noteType) ?? .text).iconName)
                                    .foregroundStyle(.secondary)
                                    .frame(width: 24)
                                    .accessibilityHidden(true)

                                VStack(alignment: .leading, spacing: 2) {
                                    Text(recent.title)
                                        .font(.body)
                                        .lineLimit(2)
                                        .foregroundStyle(.primary)
                                    Text(recent.accessedAt.relativeDisplay)
                                        .font(.caption)
                                        .foregroundStyle(.tertiary)
                                }

                                Spacer()

                                Image(systemName: "chevron.right")
                                    .font(.caption)
                                    .foregroundStyle(.quaternary)
                            }
                        }
                        .buttonStyle(.plain)
                    }
                }
                .listStyle(.insetGrouped)
            }
        }
        .navigationTitle("Recents")
        .task { loadRecents() }
        .refreshable { loadRecents() }
        .navigationDestination(item: Binding(
            get: { navigateToNote.map { NoteNavItem(noteId: $0.0, title: $0.1) } },
            set: { navigateToNote = $0.map { ($0.noteId, $0.title) } }
        )) { item in
            NoteDetailView(noteId: item.noteId, title: item.title)
        }
    }

    private func loadRecents() {
        guard let profileId = appState.activeProfile?.id else { return }
        do {
            recentNotes = try PersistenceManager.shared.fetchRecentNotes(serverProfileId: profileId)
        } catch {
            Log.persistence.error("Failed to load recents: \(error)")
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
        RecentsView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
