import SwiftUI

/// Trilium desktop's Note type menu as a sheet: the types the server can make, the code languages, and the views a
/// collection can show. Picking one asks first when desktop would (the note has content) or the note is publicly
/// shared, and says what happens to the content.
struct NoteTypePickerSheet: View {
    let viewModel: NoteDetailViewModel

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var pending: PendingChange?
    @State private var isWorking = false
    @State private var errorMessage: String?

    private enum Action {
        case type(NoteTypeChange.Target, title: String)
        case view(NoteTypeChange.CollectionView)

        var target: NoteTypeChange.Target {
            switch self {
            case .type(let target, _): return target
            case .view: return NoteTypeChange.Entry.collection.target
            }
        }

        var title: String {
            switch self {
            case .type(_, let title): return title
            case .view(let view): return view.title
            }
        }
    }

    private struct PendingChange: Identifiable {
        let id = UUID()
        let action: Action
        let confirmation: NoteTypeChange.Confirmation
    }

    private var serverType: String { viewModel.serverNoteType ?? "" }
    private var mime: String { viewModel.note?.mime ?? "" }
    private var currentEntry: NoteTypeChange.Entry? { NoteTypeChange.currentEntry(serverType: serverType, mime: mime) }
    private var currentView: NoteTypeChange.CollectionView? {
        guard currentEntry == .collection else { return nil }
        let label = viewModel.note?.attributes.first { $0.type == .label && $0.name == "viewType" }?.value
        return NoteTypeChange.currentView(viewTypeLabel: label)
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    ForEach(NoteTypeChange.entries(serverInfo: appState.serverAppInfo, aiEnabled: appState.aiConfig?.aiEnabled == true)) { entry in
                        switch entry {
                        case .code:
                            NavigationLink {
                                CodeNoteLanguageList(currentMime: currentEntry == .code ? mime : "") { picked in
                                    choose(.type(NoteTypeChange.Target(serverType: "code", mime: picked), title: entry.title))
                                }
                            } label: {
                                entryRow(entry)
                            }
                        case .collection:
                            NavigationLink {
                                collectionViews
                            } label: {
                                entryRow(entry)
                            }
                        default:
                            Button {
                                choose(.type(entry.target, title: entry.title))
                            } label: {
                                entryRow(entry)
                            }
                        }
                    }
                } footer: {
                    Text(String(
                        localized: "Trilium keeps the note's content when its type changes, but not every type can show content from another.",
                        comment: "Change note type sheet footer"
                    ))
                }
            }
            .navigationTitle(String(localized: "Note Type", comment: "Change note type sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss sheet")) { dismiss() }
                }
            }
            .disabled(isWorking)
            .overlay {
                if isWorking {
                    ProgressView()
                }
            }
        }
        .alert(
            pending?.confirmation.title ?? "",
            isPresented: Binding(get: { pending != nil }, set: { if !$0 { pending = nil } }),
            presenting: pending
        ) { change in
            Button(
                String(localized: "Change Type", comment: "Confirm changing the note type"),
                role: change.confirmation.replacesContent ? .destructive : nil
            ) {
                Task { await perform(change.action) }
            }
            Button(String(localized: "Cancel", comment: "Dismiss sheet"), role: .cancel) {}
        } message: { change in
            Text(change.confirmation.message)
        }
        .alert(
            String(localized: "Error", comment: "Generic error title"),
            isPresented: Binding(get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } })
        ) {
            Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
        } message: {
            Text(errorMessage ?? "")
        }
        // Another server's sign-in replaces this note: nothing here applies any more.
        .onReceive(NotificationCenter.default.publisher(for: .trinoteWillSwitchServerProfile)) { _ in
            dismiss()
        }
    }

    private var collectionViews: some View {
        List {
            Section {
                ForEach(NoteTypeChange.collectionViews(serverInfo: appState.serverAppInfo)) { view in
                    Button {
                        choose(.view(view))
                    } label: {
                        row(
                            title: view.title,
                            iconClass: view.iconClass,
                            fallback: view.noteType,
                            captions: view.isShownInApp ? [] : [notShownCaption],
                            isCurrent: view == currentView
                        )
                    }
                }
            } footer: {
                Text(String(
                    localized: "A collection shows its child notes. The view is saved as the note's #viewType label.",
                    comment: "Collection view picker footer"
                ))
            }
        }
        .navigationTitle(String(localized: "Collection", comment: "Note type: Trilium collection container"))
        .navigationBarTitleDisplayMode(.inline)
        .disabled(isWorking)
    }

    private var notShownCaption: String {
        String(localized: "Not shown in this app", comment: "Note type or collection view Trinote can't display")
    }

    private func entryRow(_ entry: NoteTypeChange.Entry) -> some View {
        var captions: [String] = []
        if entry.isBeta {
            captions.append(String(localized: "Beta", comment: "Note type badge, as in Trilium"))
        }
        if !entry.isShownInApp {
            captions.append(notShownCaption)
        }
        if entry == .code, currentEntry == .code {
            captions.append(CodeNoteLanguage.displayTitle(for: mime))
        }
        return row(
            title: entry.title,
            iconClass: entry.iconClass,
            fallback: entry.noteType,
            captions: captions,
            isCurrent: entry == currentEntry
        )
    }

    private func row(title: String, iconClass: String, fallback: NoteType, captions: [String], isCurrent: Bool) -> some View {
        HStack(spacing: 12) {
            NoteIconView(iconClass: iconClass, fallbackNoteType: fallback, foregroundStyle: .accentColor)
                .frame(width: 26)
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .foregroundStyle(.primary)
                if !captions.isEmpty {
                    Text(captions.joined(separator: " · "))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            Spacer(minLength: 0)
            if isCurrent {
                Image(systemName: "checkmark")
                    .foregroundStyle(Color.accentColor)
                    .accessibilityLabel(String(localized: "Current", comment: "Code language picker: current MIME not in defaults"))
            }
        }
        .contentShape(Rectangle())
    }

    private func choose(_ action: Action) {
        guard !isWorking else { return }
        if case .type(let target, _) = action, target.serverType == serverType, target.mime == mime {
            dismiss()
            return
        }
        if case .view(let view) = action, view == currentView {
            dismiss()
            return
        }
        Task {
            isWorking = true
            let confirmation = await viewModel.typeChangeConfirmation(to: action.target, targetTitle: action.title)
            isWorking = false
            if let confirmation {
                pending = PendingChange(action: action, confirmation: confirmation)
            } else {
                await perform(action)
            }
        }
    }

    private func perform(_ action: Action) async {
        isWorking = true
        let changed: Bool
        switch action {
        case .type(let target, _):
            changed = await viewModel.changeNoteType(to: target)
        case .view(let view):
            changed = await viewModel.setCollectionView(view)
        }
        isWorking = false
        if changed {
            dismiss()
        } else if viewModel.showSaveError {
            // Shown here: the note screen's own error alert can't appear over this sheet.
            errorMessage = viewModel.saveError
            viewModel.showSaveError = false
        }
    }
}
