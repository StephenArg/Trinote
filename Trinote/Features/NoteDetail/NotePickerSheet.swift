import SwiftUI

/// Pick a note from the tree (browse) or from search. Used for “include note” in the editor and
/// for the open-tabs bar “+” button.
struct NotePickerSheet: View {
    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss

    /// Hide the note being edited (cannot include self), or from another flow (e.g. not applicable).
    var excludeNoteId: String?
    /// If non-nil, overrides the default “Include note” title (e.g. add open tab from the bar).
    var navigationTitleOverride: String? = nil
    /// Hides sync / overflow toolbar on the embedded tree (link-note picker).
    var hidesEmbeddedTreeToolbar: Bool = false
    /// Hides the large “Notes” header row on the embedded tree root (link-note picker).
    var hidesEmbeddedTreeRootHeader: Bool = false
    /// Hides the open-note tab bar on the embedded tree (link-note picker).
    var hidesEmbeddedTreeTabsBar: Bool = false
    let onPick: (_ noteId: String, _ title: String) -> Void

    @AppStorage("notePickerMode") private var modeRaw: String = PickerMode.search.rawValue
    @State private var searchViewModel: SearchViewModel?

    private var modeSelection: Binding<PickerMode> {
        Binding(
            get: { PickerMode(rawValue: modeRaw) ?? .search },
            set: { modeRaw = $0.rawValue }
        )
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                Picker("", selection: modeSelection) {
                    Label {
                        Text(String(localized: "Tree", comment: "Note picker: pick from tree"))
                    } icon: {
                        Image(systemName: "list.bullet.indent")
                    }
                    .tag(PickerMode.tree)
                    Label {
                        Text(String(localized: "Search", comment: "Note picker: pick from search"))
                    } icon: {
                        Image(systemName: "magnifyingglass")
                    }
                    .tag(PickerMode.search)
                }
                .accessibilityLabel(String(localized: "Source", comment: "Note picker: Tree vs Search"))
                .pickerStyle(.segmented)
                .padding(.horizontal, 14)
                .padding(.top, 8)
                .padding(.bottom, 4)

                Group {
                    switch PickerMode(rawValue: modeRaw) ?? .search {
                    case .tree:
                        treeContent
                    case .search:
                        if let vm = searchViewModel {
                            searchContent(vm)
                        } else {
                            ProgressView()
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                        }
                    }
                }
            }
            .navigationTitle(
                navigationTitleOverride
                    ?? String(localized: "Include note", comment: "Include note picker title")
            )
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss sheet")) { dismiss() }
                }
            }
            .toolbar(hidesEmbeddedTreeTabsBar ? .hidden : .visible, for: .tabBar)
        }
        .task(id: modeRaw) {
            if PickerMode(rawValue: modeRaw) == .search, searchViewModel == nil {
                searchViewModel = SearchViewModel(appState: appState)
            }
        }
    }

    @ViewBuilder
    private var treeContent: some View {
        TreeView(
            parentNoteId: TriliumTreeConstants.rootNoteId,
            parentTitle: String(localized: "Notes", comment: "Root notebook / tree title"),
            onPickParent: { noteId, title, _ in
                guard noteId != excludeNoteId else { return }
                onPick(noteId, title)
                dismiss()
            },
            showsNavigationToolbar: !hidesEmbeddedTreeToolbar,
            showsRootNotebookHeader: !hidesEmbeddedTreeRootHeader,
            showsNoteTabsBarInset: !hidesEmbeddedTreeTabsBar
        )
    }

    @ViewBuilder
    private func searchContent(_ vm: SearchViewModel) -> some View {
        VStack(spacing: 0) {
            HStack(spacing: 8) {
                Image(systemName: "magnifyingglass")
                    .foregroundStyle(.secondary)
                TextField(String(localized: "Search notes…", comment: "Include picker search"), text: Binding(
                    get: { vm.query },
                    set: { newValue in
                        vm.query = newValue
                        vm.onQueryChanged()
                    }
                ))
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .submitLabel(.search)
                .onSubmit { Task { await vm.performSearch() } }

                if !vm.query.isEmpty {
                    Button {
                        vm.clearSearch()
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundStyle(.secondary)
                    }
                    .accessibilityLabel(String(localized: "Clear search", comment: ""))
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 10)

            Divider()

            if vm.isSearching {
                Spacer()
                ProgressView(String(localized: "Searching…", comment: ""))
                Spacer()
            } else if let err = vm.error, vm.results.isEmpty {
                ContentUnavailableView {
                    Label(String(localized: "Search Error", comment: ""), systemImage: "exclamationmark.triangle")
                } description: {
                    Text(err)
                }
                Spacer()
            } else if vm.hasSearched && vm.results.isEmpty {
                Spacer()
                ContentUnavailableView.search(text: vm.query)
                Spacer()
            } else if vm.hasSearched {
                List {
                    ForEach(vm.results.filter { $0.noteId != excludeNoteId }) { note in
                        Button {
                            let t = note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
                            onPick(note.noteId, t)
                            dismiss()
                        } label: {
                            HStack(spacing: 10) {
                                NoteIconView(
                                    iconClass: note.resolvedIconClass,
                                    fallbackNoteType: note.iconFallbackNoteType,
                                    size: .regular,
                                    foregroundStyle: .secondary
                                )
                                .frame(width: 24)
                                Text(note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive))
                                    .lineLimit(2)
                                Spacer()
                            }
                        }
                    }
                }
                .listStyle(.plain)
            } else {
                Spacer()
                Text(String(localized: "Type to search your notes.", comment: "Include picker empty state"))
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .padding()
                Spacer()
            }
        }
    }
}

// MARK: - PickerMode

private enum PickerMode: String, CaseIterable {
    case tree
    case search
}
