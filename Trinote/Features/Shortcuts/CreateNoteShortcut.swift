import Foundation

/// Where the Create Note Shortcut puts the new note.
enum CaptureDestination: String, Sendable, CaseIterable {
    /// Trilium's inbox rule: the `#inbox` note, else today's journal note when there is a journal, else the top.
    case inbox
    case todaysJournal
    case topLevel
}

/// The work behind "Create Note", apart from the App Intents types so it can be tested. The action opens Trinote, so
/// the note is made the way the tree makes one: on the device first (it works offline), then uploaded, and opened in
/// the editor.
@MainActor
enum CreateNoteShortcut {
    /// Creates a text note in the running app and opens it for editing. Returns its title.
    static func createAndOpen(title: String?, text: String?, destination: CaptureDestination) async throws -> String {
        let appState = try await ShortcutSession.runningApp()
        let parentNoteId: String
        do {
            parentNoteId = try await self.parentNoteId(for: destination, appState: appState)
        } catch {
            throw ShortcutError.from(error)
        }
        let note = try createLocalNote(title: title, text: text, parentNoteId: parentNoteId, appState: appState)
        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        appState.backgroundSyncPendingChanges()
        appState.pendingExternalOpen = .edit(note)
        return note.title
    }

    /// The parent for `destination`, by the rules the share sheet's Add to Inbox and the tree's Open Today's Journal
    /// Note follow (both also work offline from the synced notes).
    static func parentNoteId(for destination: CaptureDestination, appState: AppState) async throws -> String {
        switch destination {
        case .topLevel:
            return TriliumTreeConstants.rootNoteId
        case .todaysJournal:
            return try await TodaysJournalNote.find(appState: appState).noteId
        case .inbox:
            return try await InboxDestination.resolve(appState: appState).parentNoteId(appState: appState)
        }
    }

    /// A text note made on the device, as the tree's New Note makes one; the app uploads it in the background.
    static func createLocalNote(title: String?, text: String?, parentNoteId: String, appState: AppState) throws -> NoteNavItem {
        guard let profileId = appState.activeProfile?.id else { throw ShortcutError.notSignedIn }
        let rawTitle = title ?? ""
        let resolvedTitle = NoteCreationTitle.resolved(from: rawTitle)
        let trimmedText = text?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let type = NoteType.text
        do {
            let (noteId, _) = try PersistenceManager.shared.createOfflineChildNote(
                parentNoteId: parentNoteId,
                title: resolvedTitle,
                noteType: type.triliumStorageType,
                mime: type.creationMime,
                initialContent: trimmedText.isEmpty ? type.creationInitialContent : PlainTextToNoteHTML.convert(trimmedText),
                serverProfileId: profileId,
                initialAttributes: type.creationInitialAttributes,
                useParentTitleTemplate: rawTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            )
            // A parent's title template may have named it.
            let savedTitle = (try? PersistenceManager.shared.fetchCachedNote(id: noteId, serverProfileId: profileId))?.title
            return NoteNavItem(noteId: noteId, title: savedTitle ?? resolvedTitle)
        } catch {
            throw ShortcutError.server(APIError.from(error).localizedDescription)
        }
    }
}
