import Foundation

/// Where Trilium puts a captured note (its "inbox"): the `#inbox` note, else today's journal note when there is a
/// journal, else the top of the tree.
enum InboxDestination: Equatable, Sendable {
    case inbox(noteId: String, title: String)
    case todaysJournalNote
    case topLevel

    /// Names the destination for the "Add to Inbox" button.
    var displayTitle: String {
        switch self {
        case .inbox(_, let title):
            title.isEmpty ? String(localized: "Inbox", comment: "Inbox destination without a title") : title
        case .todaysJournalNote:
            String(localized: "Today's journal note", comment: "Inbox destination: the journal's day note")
        case .topLevel:
            String(localized: "Top of the tree", comment: "Inbox destination: the root note")
        }
    }

    /// The server's answer (`inbox-target`) as a destination.
    init(_ target: InboxTargetResponse) {
        switch target.kind {
        case "inbox", "workspaceInbox":
            if let noteId = target.noteId {
                self = .inbox(noteId: noteId, title: target.title ?? "")
            } else {
                self = .topLevel
            }
        case "dayNote":
            self = .todaysJournalNote
        default:
            self = .topLevel
        }
    }

    /// Trilium's rule applied to the synced notes: the first `#inbox` note, else the journal when one exists.
    static func fromSyncedNotes(inboxNoteId: String?, inboxTitle: String, hasJournal: Bool) -> InboxDestination {
        if let inboxNoteId { return .inbox(noteId: inboxNoteId, title: inboxTitle) }
        return hasJournal ? .todaysJournalNote : .topLevel
    }

    /// Where a captured note goes, without making anything. Trilium 0.106+ answers online; otherwise the synced notes
    /// decide, which also keeps Trilium 0.105 from building a journal for a capture (its inbox request would).
    @MainActor
    static func resolve(appState: AppState) async -> InboxDestination {
        if let client = appState.client, appState.isOnline,
           TriliumServerCompatibility.supportsInboxTarget(appState.serverAppInfo) {
            do {
                return InboxDestination(try await client.getInboxTarget())
            } catch {
                Log.api.warning("inbox-target failed, using synced notes: \(error)")
            }
        }
        guard let profileId = appState.activeProfile?.id else { return .topLevel }
        let persistence = PersistenceManager.shared
        let inbox = persistence.cachedNoteIds(withLabel: "inbox", serverProfileId: profileId).lazy
            .compactMap { try? persistence.fetchCachedNote(id: $0, serverProfileId: profileId) }
            .first
        let inboxId = inbox?.noteId
        let inboxTitle = inbox?.title ?? ""
        return fromSyncedNotes(
            inboxNoteId: inboxId,
            inboxTitle: inboxTitle,
            hasJournal: TodaysJournalNote.cachedJournalRootId(profileId: profileId) != nil
        )
    }

    /// The note to create the capture under; today's journal note is made when it doesn't exist yet.
    @MainActor
    func parentNoteId(appState: AppState) async throws -> String {
        switch self {
        case .inbox(let noteId, _):
            return noteId
        case .todaysJournalNote:
            return try await TodaysJournalNote.find(appState: appState).noteId
        case .topLevel:
            return TriliumTreeConstants.rootNoteId
        }
    }
}
