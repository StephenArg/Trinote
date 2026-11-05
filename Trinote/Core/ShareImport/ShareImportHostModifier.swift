import SwiftUI

/// Presents share-import explanation / parent picker / new-note sheet / errors above the main UI.
struct ShareImportHostModifier: ViewModifier {
    @Bindable var appState: AppState

    func body(content: Content) -> some View {
        let _ = appState.shareImport.activationToken
        let phase = appState.shareImport.phase

        content
            .alert(
                String(localized: "Add Shared Content", comment: "Share import explanation title"),
                isPresented: explanationBinding(phase),
                actions: {
                    Button(String(localized: "Continue", comment: "Share import continue to picker")) {
                        appState.shareImport.continueFromExplanation()
                    }
                    Button(String(localized: "Cancel", comment: "Dismiss sheet"), role: .cancel) {
                        appState.shareImport.cancel()
                    }
                },
                message: {
                    Text(
                        String(
                            localized: "Trinote will create a new note from what you shared. Next, choose where that note should go in your tree.",
                            comment: "Share import explanation message"
                        )
                    )
                }
            )
            .alert(
                String(localized: "Sign In Required", comment: "Share import needs login title"),
                isPresented: needsSignInBinding(phase),
                actions: {
                    Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {
                        appState.shareImport.acknowledgeNeedsSignIn()
                    }
                },
                message: {
                    Text(
                        String(
                            localized: "Sign in to Trinote to create a note from the shared content.",
                            comment: "Share import needs login message"
                        )
                    )
                }
            )
            .alert(
                String(localized: "Couldn’t Import", comment: "Share import failure title"),
                isPresented: failureBinding(phase),
                actions: {
                    Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {
                        appState.shareImport.dismissFailure()
                    }
                },
                message: {
                    if case .failed(let message) = appState.shareImport.phase {
                        Text(message)
                    }
                }
            )
            .sheet(isPresented: parentPickerBinding(phase)) {
                ParentPickerSheet(
                    navigationTitle: String(localized: "Place Note", comment: "Share import parent picker title"),
                    instruction: String(
                        localized: "Choose where to add the new note from the shared content.",
                        comment: "Share import parent picker instruction"
                    ),
                    topLevelButtonTitle: "",
                    showsTopLevelButton: false,
                    rootHeaderPlacementTitle: String(
                        localized: "Add as root note",
                        comment: "Share import: place note at top level"
                    ),
                    onPick: { parentNoteId, _, _ in
                        appState.shareImport.parentDidSelect(parentNoteId)
                    },
                    quickDestination: ParentPickerSheet.QuickDestination(
                        title: String(localized: "Add to Inbox", comment: "Share import: put the note where Trilium puts captures"),
                        subtitle: appState.shareImport.inboxDestination?.displayTitle,
                        systemImage: "tray.and.arrow.down",
                        isBusy: appState.shareImport.isPlacingInInbox,
                        action: { Task { await appState.shareImport.inboxDidSelect() } }
                    )
                )
                .environment(appState)
                .task { await appState.shareImport.refreshInboxDestination() }
            }
            .sheet(isPresented: createNoteBinding(phase)) {
                ShareImportCreateNoteSheet(
                    initialTitle: appState.shareImport.suggestedNoteTitle,
                    kind: appState.shareImport.pendingKind,
                    noteTypeChoices: appState.shareImport.noteTypeChoices,
                    initialNoteType: appState.shareImport.preferredNoteType,
                    isOnline: appState.isOnline,
                    createsRootNote: appState.shareImport.selectedParentNoteId == TriliumTreeConstants.rootNoteId,
                    onCancel: {
                        appState.shareImport.createNoteSheetWasDismissedWithoutCreating()
                    },
                    onBeginCreate: {
                        appState.shareImport.beginCreateNote()
                    },
                    onCreate: { title, noteType in
                        await appState.shareImport.createNote(title: title, as: noteType)
                    }
                )
            }
    }

    private func explanationBinding(_ phase: ShareImportUIPhase) -> Binding<Bool> {
        Binding(
            get: { appState.shareImport.phase == .showExplanation || phase == .showExplanation },
            set: { newValue in
                if !newValue, appState.shareImport.phase == .showExplanation {
                    appState.shareImport.cancel()
                }
            }
        )
    }

    private func needsSignInBinding(_ phase: ShareImportUIPhase) -> Binding<Bool> {
        Binding(
            get: { appState.shareImport.phase == .needsSignIn || phase == .needsSignIn },
            set: { newValue in
                if !newValue, appState.shareImport.phase == .needsSignIn {
                    appState.shareImport.acknowledgeNeedsSignIn()
                }
            }
        )
    }

    private func failureBinding(_ phase: ShareImportUIPhase) -> Binding<Bool> {
        Binding(
            get: {
                if case .failed = appState.shareImport.phase { return true }
                if case .failed = phase { return true }
                return false
            },
            set: { newValue in
                if !newValue {
                    appState.shareImport.dismissFailure()
                }
            }
        )
    }

    private func parentPickerBinding(_ phase: ShareImportUIPhase) -> Binding<Bool> {
        Binding(
            get: {
                let live = appState.shareImport.phase
                return live == .showParentPicker || phase == .showParentPicker
            },
            set: { newValue in
                if !newValue, appState.shareImport.phase == .showParentPicker {
                    appState.shareImport.parentPickerWasDismissedWithoutSelection()
                }
            }
        )
    }

    private func createNoteBinding(_ phase: ShareImportUIPhase) -> Binding<Bool> {
        Binding(
            get: {
                let live = appState.shareImport.phase
                return live == .showCreateNote || live == .importing
                    || phase == .showCreateNote || phase == .importing
            },
            set: { newValue in
                if !newValue, appState.shareImport.phase == .showCreateNote {
                    appState.shareImport.createNoteSheetWasDismissedWithoutCreating()
                }
            }
        )
    }
}

/// New-note sheet for share import: title editable. A shared picture or file can become an image or file note of its
/// own or go into a text note; anything else is a text note, shown as a locked Type row.
/// Prefills from the shared filename (or content hint). Clear the field to get
/// the same default as elsewhere (`Note dd-MM-yyyy HH:mm:ss`).
private struct ShareImportCreateNoteSheet: View {
    let initialTitle: String
    let kind: SharedImportKind?
    let noteTypeChoices: [NoteType]
    let initialNoteType: NoteType
    let isOnline: Bool
    /// The share was placed at the top of the tree, so the sheet says the note will be a root note.
    let createsRootNote: Bool
    let onCancel: () -> Void
    let onBeginCreate: () -> Void
    let onCreate: (String, NoteType) async -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var noteTitle: String = ""
    @State private var noteType: NoteType = .text
    @State private var isCreating = false

    var body: some View {
        NavigationStack {
            Form {
                if createsRootNote {
                    RootNoteNotice()
                }

                TextField(
                    String(localized: "Note Title (leave blank for default)", comment: "Share import new note"),
                    text: $noteTitle,
                    prompt: Text(String(localized: "Note Title (leave blank for default)", comment: "Share import new note"))
                )
                .textInputAutocapitalization(.sentences)

                if noteTypeChoices.count > 1 {
                    Section {
                        Picker(String(localized: "Type", comment: "New note type"), selection: $noteType) {
                            ForEach(noteTypeChoices, id: \.self) { type in
                                Text(Self.choiceTitle(type)).tag(type)
                            }
                        }
                        .pickerStyle(.segmented)
                        .disabled(isCreating)
                    } footer: {
                        Text(choiceExplanation)
                    }
                } else {
                    NewNoteTypePicker(
                        selection: .constant(.text),
                        supportsSpreadsheet: false,
                        isEnabled: false
                    )
                }
            }
            .navigationTitle(String(localized: "New Note", comment: "New child sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "New note sheet")) {
                        onCancel()
                        dismiss()
                    }
                    .disabled(isCreating)
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Create", comment: "New note sheet")) {
                        let titleToCreate = noteTitle
                        let typeToCreate = noteType
                        // Mark importing synchronously so a sheet dismiss cannot cancel the share payload
                        // before the async create runs (common when clearing the title / dismissing keyboard).
                        isCreating = true
                        onBeginCreate()
                        Task {
                            defer { isCreating = false }
                            await onCreate(titleToCreate, typeToCreate)
                            dismiss()
                        }
                    }
                    .disabled(isCreating)
                }
            }
        }
        .presentationDetents([.medium])
        .interactiveDismissDisabled(isCreating)
        .onAppear {
            noteTitle = initialTitle.trimmingCharacters(in: .whitespacesAndNewlines)
            noteType = noteTypeChoices.contains(initialNoteType) ? initialNoteType : .text
        }
    }

    private static func choiceTitle(_ type: NoteType) -> String {
        switch type {
        case .image: String(localized: "Image Note", comment: "Share import: the shared picture becomes an image note")
        case .file: String(localized: "File Note", comment: "Share import: the shared file becomes a file note")
        default: String(localized: "Text Note", comment: "Share import: the shared content goes into a text note")
        }
    }

    /// What the selected choice makes, under the choice.
    private var choiceExplanation: String {
        switch (kind, noteType) {
        case (.image, .image):
            return String(
                localized: "The picture becomes the note itself, like an image note in Trilium.",
                comment: "Share import: explains the Image Note choice"
            )
        case (.image, _):
            return String(
                localized: "The picture goes into a new text note, where you can write around it.",
                comment: "Share import: explains the Text Note choice for a picture"
            )
        case (_, .file):
            return String(
                localized: "The file becomes the note itself, like a file note in Trilium.",
                comment: "Share import: explains the File Note choice"
            )
        default:
            let attached = String(
                localized: "The file is attached to a new text note, where you can write around it.",
                comment: "Share import: explains the Text Note choice for a file"
            )
            guard !isOnline else { return attached }
            let needsConnection = String(
                localized: "Attaching the file needs a connection.",
                comment: "Share import: a file can only go into a text note while online"
            )
            return "\(attached) \(needsConnection)"
        }
    }
}

extension View {
    func shareImportHost(appState: AppState) -> some View {
        modifier(ShareImportHostModifier(appState: appState))
    }
}
