import SwiftUI

/// Keyboard shortcuts for the iPad split layout. They show in the iPadOS menu bar and in the list you
/// get by holding ⌘. Each sends a `WorkspaceCommand`; the view that owns the action handles it (and
/// ignores it when it doesn't apply, e.g. Save while not editing).
struct TrinoteCommands: Commands {
    @FocusedValue(\.noteWorkspace) private var workspace

    var body: some Commands {
        CommandMenu(String(localized: "Note", comment: "iPad menu bar: note commands menu")) {
            command(String(localized: "New Note", comment: "iPad menu bar: new child of the open note, or top-level note"), .newNote)
                .keyboardShortcut("n")
            command(String(localized: "Jump to Note…", comment: "iPad menu bar: open a note by searching its title (Trilium's Ctrl+J)"), .jumpToNote)
                .keyboardShortcut("j")
            Divider()
            command(String(localized: "Edit Note", comment: "iPad menu bar: start editing the open note"), .editNote)
                .keyboardShortcut("e")
            command(String(localized: "Save Note", comment: "iPad menu bar: save the note being edited"), .saveNote)
                .keyboardShortcut("s")
            command(String(localized: "Find in Note…", comment: "iPad menu bar: find text in the open note"), .findInNote)
                .keyboardShortcut("f")
            Divider()
            command(String(localized: "Back", comment: "iPad menu bar: go back from a linked note"), .back)
                .keyboardShortcut("[")
        }

        CommandMenu(String(localized: "Go", comment: "iPad menu bar: navigation commands menu")) {
            ForEach(Array(LauncherSection.allCases.enumerated()), id: \.element) { index, section in
                command(section.title, .showSection(section))
                    .keyboardShortcut(KeyEquivalent(Character(String(index + 1))))
            }
            command(String(localized: "Search Notes", comment: "iPad menu bar: show Search and focus its field"), .focusSearch)
                .keyboardShortcut("f", modifiers: [.command, .shift])
            command(String(localized: "Show or Hide Sidebar", comment: "iPad menu bar: toggle the tree sidebar"), .toggleSidebar)
                .keyboardShortcut("s", modifiers: [.command, .control])
            Divider()
            command(String(localized: "Next Tab", comment: "iPad menu bar: next open-note tab"), .nextTab)
                .keyboardShortcut(.tab, modifiers: .control)
            command(String(localized: "Previous Tab", comment: "iPad menu bar: previous open-note tab"), .previousTab)
                .keyboardShortcut(.tab, modifiers: [.control, .shift])
            command(String(localized: "Close Tab", comment: "iPad menu bar: close the open-note tab on screen"), .closeTab)
                .keyboardShortcut("w")
        }
    }

    private func command(_ title: String, _ command: WorkspaceCommand) -> some View {
        Button(title) { workspace?.send(command) }
            .disabled(workspace == nil)
    }
}
