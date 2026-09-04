import Foundation

/// Visibility rules for “Copy to Instance…” (tree long-press and note overflow).
@MainActor
enum CrossInstanceCopyAvailability {
    /// Hide for the tree root and Trilium system notes.
    static func isMenuHidden(forNoteId noteId: String) -> Bool {
        if noteId == TriliumTreeConstants.rootNoteId { return true }
        if noteId.hasPrefix("_options") { return true }
        if TriliumSharing.hiddenSystemChildNoteIds.contains(noteId) { return true }
        return false
    }

    /// Shown only with multiple signed-in instances and a copyable note.
    static func shouldShowMenuItem(
        noteId: String,
        persistence: PersistenceManager = .shared
    ) -> Bool {
        persistence.hasMultipleServerProfiles() && !isMenuHidden(forNoteId: noteId)
    }

    /// System / hidden notes that must not be copied as subtree children.
    static func shouldSkipAsChild(noteId: String) -> Bool {
        isMenuHidden(forNoteId: noteId)
    }
}
