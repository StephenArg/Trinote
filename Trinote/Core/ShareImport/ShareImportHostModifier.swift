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
                    }
                )
                .environment(appState)
            }
            .sheet(isPresented: createNoteBinding(phase)) {
                ShareImportCreateNoteSheet(
                    initialTitle: appState.shareImport.suggestedNoteTitle,
                    onCancel: {
                        appState.shareImport.createNoteSheetWasDismissedWithoutCreating()
                    },
                    onBeginCreate: {
                        appState.shareImport.beginCreateNote()
                    },
                    onCreate: { title in
                        await appState.shareImport.createNote(title: title)
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

/// New-note sheet for share import: title editable, type locked to Text.
/// Prefills from the shared filename (or content hint). Clear the field to get
/// the same default as elsewhere (`Note dd-MM-yyyy HH:mm:ss`).
private struct ShareImportCreateNoteSheet: View {
    let initialTitle: String
    let onCancel: () -> Void
    let onBeginCreate: () -> Void
    let onCreate: (String) async -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var noteTitle: String = ""
    @State private var noteType: NoteType = .text
    @State private var isCreating = false

    var body: some View {
        NavigationStack {
            Form {
                TextField(
                    String(localized: "Note Title (leave blank for default)", comment: "Share import new note"),
                    text: $noteTitle,
                    prompt: Text(String(localized: "Note Title (leave blank for default)", comment: "Share import new note"))
                )
                .textInputAutocapitalization(.sentences)

                NewNoteTypePicker(
                    selection: $noteType,
                    supportsSpreadsheet: false,
                    isEnabled: false
                )
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
                        // Mark importing synchronously so a sheet dismiss cannot cancel the share payload
                        // before the async create runs (common when clearing the title / dismissing keyboard).
                        isCreating = true
                        onBeginCreate()
                        Task {
                            defer { isCreating = false }
                            await onCreate(titleToCreate)
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
            noteType = .text
        }
    }
}

extension View {
    func shareImportHost(appState: AppState) -> some View {
        modifier(ShareImportHostModifier(appState: appState))
    }
}
