import Foundation

/// Shallow navigation handle for `NoteDetailView` from lists and the open-note tab bar.
struct NoteNavItem: Identifiable, Hashable {
    let noteId: String
    let title: String
    /// When set, the destination is scoped to a specific `OpenNoteTab` row (scroll / duplicate tabs).
    let openTabId: String?
    /// Distinguishes multiple tabs for the same `noteId`; falls back to `noteId` for recents and search.
    var id: String { openTabId ?? noteId }

    init(noteId: String, title: String, openTabId: String? = nil) {
        self.noteId = noteId
        self.title = title
        self.openTabId = openTabId
    }
}
