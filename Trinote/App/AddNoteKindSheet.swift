import SwiftUI

/// The Add Note tab's "New Note" sheet: a title and a type or template, as the tree's New Note sheet offers, plus a
/// switch to keep the kind for next time. Settings uses it without the title to choose the default kind.
struct AddNoteKindSheet: View {
    /// Shows the title field (the tab flow); off when Settings picks the default kind.
    var isCreating: Bool
    /// The "Remember this choice" switch; nil hides it.
    var rememberKind: Binding<Bool>?
    /// The chosen place is the top of the tree, so the sheet says the note will be a root note.
    var createsRootNote = false
    let onConfirm: (_ title: String, _ kind: AddNoteKindDefault) -> Void

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var title = ""
    @State private var kind: NewNoteKind = .text
    @State private var templateChoice = NewNoteTemplateChoice()

    var body: some View {
        NavigationStack {
            Form {
                if createsRootNote,
                   templateChoice.parentNoteId(defaultParentNoteId: TriliumTreeConstants.rootNoteId) == TriliumTreeConstants.rootNoteId {
                    RootNoteNotice()
                }

                if isCreating {
                    TextField(
                        String(localized: "Note Title (leave blank for default)", comment: "New note from tree"),
                        text: $title
                    )
                    .textInputAutocapitalization(.sentences)
                }

                if templateChoice.template == nil {
                    NewNoteTypePicker(
                        selection: $kind,
                        supportsSpreadsheet: TriliumServerCompatibility.supportsSpreadsheetNotes(appState.serverAppInfo),
                        supportsKanban: TriliumServerCompatibility.supportsKanbanNotes(appState.serverAppInfo),
                        supportsPresentation: TriliumServerCompatibility.supportsPresentationNotes(appState.serverAppInfo),
                        supportsAIChat: appState.showsAIEntryPoints,
                        supportsDashboard: TriliumServerCompatibility.supportsDashboardView(appState.serverAppInfo)
                    )
                }

                NewNoteTemplateSection(choice: $templateChoice)

                if let rememberKind {
                    Section {
                        Toggle(
                            String(localized: "Remember this choice", comment: "Add Note tab: keep the chosen place as the default"),
                            isOn: rememberKind
                        )
                    } footer: {
                        Text(String(
                            localized: "The Add Note tab then makes this kind of note without asking. Change it in Settings → Navigation Tabs.",
                            comment: "Add Note tab: footer under the remember-kind switch"
                        ))
                    }
                }
            }
            .navigationTitle(isCreating
                ? String(localized: "New Note", comment: "Add Note tab: new note sheet title")
                : String(localized: "Note Type", comment: "Navigation tabs: the Add Note tab's default kind"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "New note sheet")) { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(isCreating
                        ? String(localized: "Create", comment: "New note sheet")
                        : String(localized: "Done", comment: "Navigation tabs: keep the chosen default kind")) {
                        let chosen = templateChoice.template.map {
                            AddNoteKindDefault(template: $0, followsDestination: templateChoice.followsDestination)
                        } ?? AddNoteKindDefault(kind: kind)
                        onConfirm(title, chosen)
                        dismiss()
                    }
                }
            }
        }
        .presentationDetents([.medium, .large])
    }
}
