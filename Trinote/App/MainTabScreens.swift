import SwiftUI

/// The Calendar tab: the journal root (`#calendarRoot`) as the note screen, which draws its calendar.
struct JournalCalendarTabView: View {
    @Environment(AppState.self) private var appState
    @State private var journal: NoteReference?
    @State private var resolved = false

    var body: some View {
        Group {
            if let journal {
                NoteDetailView(noteId: journal.noteId, title: journal.title, retargetActiveOpenTab: false)
                    .id(journal.noteId)
            } else if resolved {
                ContentUnavailableView {
                    Label(
                        String(localized: "No Journal", comment: "Calendar tab: no journal root is synced"),
                        systemImage: "calendar"
                    )
                } description: {
                    Text(String(
                        localized: "Create a Calendar note in Trilium and sync; it appears here.",
                        comment: "Calendar tab empty state hint"
                    ))
                }
                .navigationTitle(MainTab.calendar.title)
            } else {
                ProgressView()
            }
        }
        .task(id: appState.activeProfile?.id) { resolve() }
        // A sync may have brought the journal in.
        .onReceive(NotificationCenter.default.publisher(for: .trinoteTreeShouldRefresh)) { _ in
            if journal == nil { resolve() }
        }
    }

    private func resolve() {
        defer { resolved = true }
        guard let profileId = appState.activeProfile?.id,
              let rootId = TodaysJournalNote.cachedJournalRootId(profileId: profileId)
        else {
            journal = nil
            return
        }
        guard journal?.noteId != rootId else { return }
        let title = (try? PersistenceManager.shared.fetchCachedNote(id: rootId, serverProfileId: profileId))?.title ?? ""
        journal = NoteReference(noteId: rootId, title: title)
    }
}

/// The Pinned Note tab: the chosen note as the screen, or a hint when none is chosen.
struct PinnedNoteTabView: View {
    let note: NoteReference?

    var body: some View {
        if let note {
            NoteDetailView(noteId: note.noteId, title: note.title, retargetActiveOpenTab: false)
        } else {
            ContentUnavailableView {
                Label(
                    String(localized: "No Pinned Note", comment: "Pinned Note tab: nothing chosen yet"),
                    systemImage: "pin"
                )
            } description: {
                Text(String(
                    localized: "Choose a note in Settings → Navigation Tabs.",
                    comment: "Pinned Note tab empty state hint"
                ))
            }
            .navigationTitle(MainTab.pinnedNote.title)
        }
    }
}

/// The Today tab: today's journal day note as the screen, found or made as Open Today's Journal Note finds it.
struct TodayJournalTabView: View {
    @Environment(AppState.self) private var appState
    @State private var note: NoteNavItem?
    @State private var failure: String?
    @State private var isResolving = false
    /// The day `note` is for, so a new day (the app left open overnight) gets its own note.
    @State private var resolvedDay = ""

    var body: some View {
        Group {
            if let note {
                NoteDetailView(noteId: note.noteId, title: note.title, retargetActiveOpenTab: false)
                    .id(note.noteId)
            } else if let failure {
                ContentUnavailableView {
                    Label(
                        String(localized: "Couldn't Open Today's Journal Note", comment: "Today's journal note error title"),
                        systemImage: "sun.max"
                    )
                } description: {
                    Text(failure)
                } actions: {
                    Button(String(localized: "Retry", comment: "Today tab: look for today's journal note again")) {
                        Task { await resolve(force: true) }
                    }
                }
                .navigationTitle(MainTab.todaysJournal.title)
            } else {
                ProgressView()
                    .navigationTitle(MainTab.todaysJournal.title)
            }
        }
        .task(id: appState.activeProfile?.id) { await resolve(force: true) }
        .onReceive(NotificationCenter.default.publisher(for: UIApplication.willEnterForegroundNotification)) { _ in
            Task { await resolve(force: false) }
        }
        .onChange(of: appState.isOnline) { _, online in
            if online, note == nil { Task { await resolve(force: true) } }
        }
    }

    /// Today's note: at once from the synced notes, else as the Shortcut finds it (made on the server, or offline
    /// under a cached journal). `force` looks again even for the same day.
    private func resolve(force: Bool) async {
        let day = TodaysJournalNote.localISODay(Date())
        guard force || day != resolvedDay, !isResolving else { return }
        isResolving = true
        defer { isResolving = false }
        guard let profileId = appState.activeProfile?.id else {
            note = nil
            return
        }
        failure = nil
        let persistence = PersistenceManager.shared
        if let noteId = persistence.cachedNoteIds(withLabel: "dateNote", value: day, serverProfileId: profileId).first {
            let title = (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.title ?? ""
            note = NoteNavItem(noteId: noteId, title: title)
            resolvedDay = day
            return
        }
        await appState.waitForSessionRestore()
        do {
            note = try await TodaysJournalNote.find(appState: appState)
            resolvedDay = day
        } catch {
            note = nil
            failure = error.localizedDescription
        }
    }
}
