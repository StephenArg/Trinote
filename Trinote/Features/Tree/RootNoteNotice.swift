import SwiftUI

/// A line at the top of a new-note sheet when the note goes at the top of the tree, where that isn't obvious from the
/// sheet itself (the tree's "+", the Add Note tab after "Add as root note", a share placed at the top).
struct RootNoteNotice: View {
    var body: some View {
        Section {
            Label(
                String(localized: "This will be a root note, at the top of the tree.", comment: "New note sheet: the note is added under the root"),
                systemImage: "tray.full"
            )
            .font(.subheadline)
            .foregroundStyle(.secondary)
        }
    }
}
