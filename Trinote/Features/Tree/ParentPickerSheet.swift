import SwiftUI

/// Tree navigation that picks a **parent note** (and its branch row) for duplicate / move flows.
struct ParentPickerSheet: View {
    let navigationTitle: String
    let instruction: String
    let topLevelButtonTitle: String
    /// When `false`, rely on `rootHeaderPlacementTitle` on the embedded tree instead of the bordered top button.
    var showsTopLevelButton: Bool = true
    /// Shown on the root tree header instead of **+** when picking a parent (local transfer).
    var rootHeaderPlacementTitle: String? = nil
    /// `(parentNoteId, displayTitle, parentBranchId)` — `parentBranchId` is the tree branch for the chosen parent (see `TriliumTreeConstants.rootBranchId` for top level).
    let onPick: (String, String, String) -> Void
    /// A one-tap destination above the tree (share import's "Add to Inbox").
    var quickDestination: QuickDestination? = nil

    struct QuickDestination {
        let title: String
        /// Where it goes; nil while that's being worked out.
        let subtitle: String?
        let systemImage: String
        let isBusy: Bool
        let action: () -> Void
    }

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 0) {
                Text(instruction)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
                    .padding()

                if let quick = quickDestination {
                    Button(action: quick.action) {
                        HStack(spacing: 10) {
                            Image(systemName: quick.systemImage)
                                .font(.title3)
                            VStack(alignment: .leading, spacing: 2) {
                                Text(quick.title)
                                    .font(.body.weight(.semibold))
                                Text(quick.subtitle ?? " ")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                                    .lineLimit(1)
                            }
                            Spacer()
                            if quick.isBusy {
                                ProgressView()
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .buttonStyle(.bordered)
                    .disabled(quick.isBusy)
                    .padding(.horizontal)
                    .padding(.bottom, 8)
                }

                if showsTopLevelButton {
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
                }

                TreeView(
                    parentNoteId: TriliumTreeConstants.rootNoteId,
                    parentTitle: String(localized: "Notes", comment: "Root notebook screen title"),
                    onPickParent: { noteId, title, parentBranchId in
                        onPick(noteId, title, parentBranchId)
                    },
                    rootPlacementButtonTitle: rootHeaderPlacementTitle
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
