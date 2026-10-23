import Foundation

/// A note to open that was asked for from outside the app's screens (the Open Today's Journal Shortcut).
enum ExternalOpenRequest: Sendable, Equatable {
    case todaysJournal
}

/// What the notes tree opens for a Shortcut: a note to read, a note to edit (one Create Note just made), or why it
/// couldn't be found.
enum ExternalOpenResult: Equatable {
    case note(NoteNavItem)
    case edit(NoteNavItem)
    case failed(String)
}

/// Holds an open request until the app can act on it. A Shortcut that opens Trinote can run before the app's state
/// exists (a cold launch), so the request waits here; `AppState` picks it up once it has started.
@MainActor
enum ExternalOpenInbox {
    private static var pending: ExternalOpenRequest?

    static func post(_ request: ExternalOpenRequest) {
        pending = request
    }

    static func take() -> ExternalOpenRequest? {
        defer { pending = nil }
        return pending
    }
}

extension AppState {
    /// Finds the note an outside request asked for and hands it to the notes tree (`pendingExternalOpen`). Runs after
    /// launch and when the Shortcut runs in an app that has already started.
    func handleExternalOpenRequests() async {
        guard !isLoading, let request = ExternalOpenInbox.take() else { return }
        // Signed out, the login screen is what shows.
        guard isAuthenticated, let profileId = activeProfile?.id else { return }
        switch request {
        case .todaysJournal:
            // Already synced: open it at once, even while a cold launch is still restoring the session.
            let day = TodaysJournalNote.localISODay(Date())
            let persistence = PersistenceManager.shared
            if let noteId = persistence.cachedNoteIds(withLabel: "dateNote", value: day, serverProfileId: profileId).first {
                let title = (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.title ?? ""
                pendingExternalOpen = .note(NoteNavItem(noteId: noteId, title: title))
                return
            }
            await waitForSessionRestore()
            do {
                pendingExternalOpen = .note(try await TodaysJournalNote.find(appState: self))
            } catch {
                pendingExternalOpen = .failed(error.localizedDescription)
            }
        }
    }

    /// The notes tree has opened (or reported) `pendingExternalOpen`.
    func consumePendingExternalOpen() {
        pendingExternalOpen = nil
    }

    /// A cold launch shows the cached tree while the session is restored in the background; the server can only make
    /// today's note once that is done. Waits up to 10 s.
    func waitForSessionRestore() async {
        for _ in 0..<40 {
            guard isOnline, let client else { return }
            if await client.isSessionValid { return }
            try? await Task.sleep(for: .milliseconds(250))
        }
    }
}
