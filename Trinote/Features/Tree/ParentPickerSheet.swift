import SwiftUI

/// Tree navigation that picks a **parent note** (and its branch row) for duplicate / move flows.
struct ParentPickerSheet: View {
    let navigationTitle: String
    let instruction: String
    let topLevelButtonTitle: String
    /// `(parentNoteId, displayTitle, parentBranchId)` — `parentBranchId` is the tree branch for the chosen parent (see `TriliumTreeConstants.rootBranchId` for top level).
    let onPick: (String, String, String) -> Void

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 0) {
                Text(instruction)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding()

                Button {
                    onPick(
                        TriliumTreeConstants.rootNoteId,
                        String(localized: "Notes", comment: "Root notebook screen title"),
                        TriliumTreeConstants.rootBranchId
                    )
                } label: {
                    Label(topLevelButtonTitle, systemImage: "tray.full")
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .buttonStyle(.bordered)
                .padding(.horizontal)
                .padding(.bottom, 8)

                TreeView(
                    parentNoteId: TriliumTreeConstants.rootNoteId,
                    parentTitle: String(localized: "Notes", comment: "Root notebook screen title"),
                    onPickParent: { noteId, title, parentBranchId in
                        onPick(noteId, title, parentBranchId)
                    }
                )
            }
            .navigationTitle(navigationTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss sheet")) { dismiss() }
                }
            }
        }
    }
}
