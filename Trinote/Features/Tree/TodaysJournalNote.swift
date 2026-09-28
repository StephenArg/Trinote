import Foundation

/// Today's journal day note, for "Open Today's Journal Note" and for captures that go to the journal.
@MainActor
enum TodaysJournalNote {
    enum Failure: LocalizedError {
        case offlineWithoutJournal
        case offlineWithWeekNotes

        var errorDescription: String? {
            switch self {
            case .offlineWithoutJournal:
                String(localized: "Connect to the server to create your journal.", comment: "Today's journal note offline with no journal cached")
            case .offlineWithWeekNotes:
                String(localized: "Connect to the server to create today's journal note. Journals with week notes can't be added to offline.", comment: "Today's journal note offline under a journal with #enableWeekNote")
            }
        }
    }

    /// Found as Trilium's "Open Today's Journal Note" finds it. Online the server finds or makes it
    /// (`getOrCreateDayNote`), so the journal's title patterns, templates and week notes apply. Offline, a cached note
    /// with today's `#dateNote` is used, or one is made under the cached journal the way the calendar view makes day notes.
    static func find(appState: AppState, now: Date = Date()) async throws -> NoteNavItem {
        let day = localISODay(now)
        if let client = appState.client, appState.isOnline {
            let note = try await client.getOrCreateDayNote(onISODay: day)
            // The server may have just made the day, month and year notes: bring them into the tree.
            Task { await appState.runIncrementalSync(maxWaitSeconds: 0, downloadChangedBodies: false) }
            return NoteNavItem(noteId: note.noteId, title: note.title)
        }

        guard let profileId = appState.activeProfile?.id else { throw APIError.noToken }
        let persistence = PersistenceManager.shared
        func cachedTitle(_ noteId: String) -> String {
            (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.title ?? ""
        }
        if let noteId = persistence.cachedNoteIds(withLabel: "dateNote", value: day, serverProfileId: profileId).first {
            return NoteNavItem(noteId: noteId, title: cachedTitle(noteId))
        }
        guard let rootId = cachedJournalRootId(profileId: profileId) else {
            throw Failure.offlineWithoutJournal
        }
        // Day notes then sit under week notes, which the offline path doesn't make.
        let rootLabels = (try? persistence.fetchCachedAttributes(noteId: rootId, serverProfileId: profileId)) ?? []
        if rootLabels.contains(where: { $0.type == "label" && $0.name == "enableWeekNote" }) {
            throw Failure.offlineWithWeekNotes
        }
        let calendar = CalendarNoteViewModel(calendarRootId: rootId, appState: appState)
        guard let noteId = await calendar.ensureDayNote(for: now) else {
            throw APIError.unknown(calendar.error ?? String(localized: "Could not create today's journal note.", comment: "Today's journal note offline creation failed"))
        }
        return NoteNavItem(noteId: noteId, title: cachedTitle(noteId))
    }

    /// A synced journal (`#calendarRoot`). Trilium takes the first one it finds; the cache can't know which that is,
    /// so any cached one will do.
    static func cachedJournalRootId(profileId: String) -> String? {
        let persistence = PersistenceManager.shared
        return persistence.cachedNoteIds(withLabel: "calendarRoot", serverProfileId: profileId).sorted().first {
            (try? persistence.fetchCachedNote(id: $0, serverProfileId: profileId)) != nil
        }
    }

    /// `yyyy-MM-dd` of `date` in the device's time zone, as Trilium's client asks for today's note.
    nonisolated static func localISODay(_ date: Date, timeZone: TimeZone = .current) -> String {
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = timeZone
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: date)
    }
}
