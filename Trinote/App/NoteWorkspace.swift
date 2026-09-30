import SwiftUI

/// What the iPad launcher rail shows in the sidebar next to the note pane.
enum LauncherSection: String, CaseIterable, Identifiable {
    case notes
    case favorites
    case search
    case recents

    var id: String { rawValue }

    var title: String {
        switch self {
        case .notes: String(localized: "Notes", comment: "Main tab: notes tree")
        case .favorites: String(localized: "Favorites", comment: "Main tab")
        case .search: String(localized: "Search", comment: "Main tab")
        case .recents: String(localized: "Recents", comment: "Main tab")
        }
    }

    var icon: String {
        switch self {
        case .notes: "folder.fill"
        case .favorites: "star.fill"
        case .search: "magnifyingglass"
        case .recents: "clock.fill"
        }
    }
}

/// A note to show in the iPad note pane, carrying `NoteDetailView`'s init arguments.
struct NoteRoute: Identifiable {
    /// Fresh per open, so opening the same note again rebuilds the pane (new find query, edit mode, …).
    let id = UUID()
    let noteId: String
    let title: String
    var openTabId: String? = nil
    var startInEditMode = false
    var seedChildSummaries: [ChildNoteSummary]? = nil
    var pendingFindQuery: String? = nil
    var pendingFindMatchIndex: Int? = nil
    var attachmentIdToInsert: String? = nil
    var attachmentTitleToInsert: String? = nil
}

/// Keyboard and menu-bar commands in the iPad split layout (`TrinoteCommands`). Sent through
/// `NoteWorkspace.send(_:)`; the view that owns each action handles it.
enum WorkspaceCommand: Equatable {
    // The note on screen (`NoteDetailView`), or the tree when no note is open.
    case newNote
    case editNote
    case saveNote
    case findInNote
    case back
    /// Sent by `NoteWorkspace.open(_:)` while a note is being edited: save it if Autosave or Back Button Saves
    /// is on, then call `finishLeavingEditor()` (or `stayInEditor()` when saving failed).
    case saveBeforeLeaving
    // The layout (`SplitWorkspaceView`).
    case jumpToNote
    case showSection(LauncherSection)
    case focusSearch
    case toggleSidebar
    case nextTab
    case previousTab
    case closeTab
}

struct WorkspaceCommandRequest: Equatable {
    /// Distinguishes repeats of the same command.
    let id = UUID()
    let command: WorkspaceCommand
}

/// iPad two-pane state (Trilium desktop layout): the note in the right pane and what the sidebar shows.
///
/// Present in the environment only while the split layout is on screen. Views that open notes check
/// `\.noteWorkspace` and fall back to pushing onto their own `NavigationStack` when it is `nil`
/// (iPhone, and narrow iPad windows that use the tab layout).
@Observable
@MainActor
final class NoteWorkspace {
    /// The note at the root of the right pane.
    private(set) var route: NoteRoute?
    /// The note actually on screen: the pane root, a linked note pushed on top of it, or an open tab
    /// switched to in place. The tree highlights and reveals it.
    var visibleNoteId: String?
    var section: LauncherSection = .notes
    var showSettings = false
    /// The note on screen is in edit mode; the tab strip hides so switching tabs can't drop the edit.
    var isEditingNote = false
    /// The `NoteDetailView` on screen in the pane. Note commands go only to it, not to a note hidden
    /// under a pushed link.
    var visibleNoteInstanceId: UUID?
    /// Latest keyboard / menu-bar command; handlers react to changes.
    private(set) var commandRequest: WorkspaceCommandRequest?
    /// Where `open(_:)` goes once the note being edited has saved.
    @ObservationIgnored private var routeAfterLeavingEditor: NoteRoute?
    /// Goes there anyway if the note doesn't answer in time.
    @ObservationIgnored private var leaveEditorFallback: Task<Void, Never>?

    func send(_ command: WorkspaceCommand) {
        commandRequest = WorkspaceCommandRequest(command: command)
    }

    /// Shows `route` in the pane. Every pane switch (tree, Favorites, Recents, Search, ⌘J, new notes…) comes
    /// through here, so while a note is being edited it first gets the chance to save; the pane is rebuilt
    /// even for the same note, which would otherwise leave the edit as just a draft.
    func open(_ route: NoteRoute) {
        guard isEditingNote else {
            show(route)
            return
        }
        let alreadyWaiting = routeAfterLeavingEditor != nil
        // The latest pick wins if more arrive while the note saves.
        routeAfterLeavingEditor = route
        guard !alreadyWaiting else { return }
        send(.saveBeforeLeaving)
        // Don't strand the pick if the note never answers.
        leaveEditorFallback = Task { @MainActor [weak self] in
            try? await Task.sleep(for: .seconds(3))
            guard !Task.isCancelled else { return }
            self?.finishLeavingEditor()
        }
    }

    /// The edited note saved (or had nothing to save): show what `open(_:)` asked for.
    func finishLeavingEditor() {
        leaveEditorFallback?.cancel()
        leaveEditorFallback = nil
        guard let route = routeAfterLeavingEditor else { return }
        routeAfterLeavingEditor = nil
        show(route)
    }

    /// Saving failed and the note shows the error; stay in the editor.
    func stayInEditor() {
        leaveEditorFallback?.cancel()
        leaveEditorFallback = nil
        routeAfterLeavingEditor = nil
    }

    private func show(_ route: NoteRoute) {
        self.route = route
        visibleNoteId = route.noteId
    }

    func close() {
        route = nil
        visibleNoteId = nil
        isEditingNote = false
        visibleNoteInstanceId = nil
    }

    /// After the layout is rebuilt (the window grew back to regular width), shows the note that was
    /// last on screen as the pane root. A linked note that was pushed on top loses its Back history.
    func restoreVisibleNote() {
        guard let noteId = visibleNoteId, noteId != route?.noteId else { return }
        route = NoteRoute(noteId: noteId, title: "")
    }
}

extension EnvironmentValues {
    /// Set only inside the iPad split layout; see `NoteWorkspace`.
    @Entry var noteWorkspace: NoteWorkspace? = nil
}

extension FocusedValues {
    /// Published by the iPad split layout so `TrinoteCommands` can reach it.
    @Entry var noteWorkspace: NoteWorkspace?
}
