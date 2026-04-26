import SwiftUI

/// Search-driven sheet to pick a note for “include note” in the rich text editor.
struct NotePickerSheet: View {
    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss

    /// Hide the note being edited (cannot include self).
    var excludeNoteId: String?
    let onPick: (_ noteId: String, _ title: String) -> Void

    @State private var viewModel: SearchViewModel?

    var body: some View {
        NavigationStack {
            Group {
                if let vm = viewModel {
                    pickerContent(vm)
                } else {
                    ProgressView()
                }
            }
            .navigationTitle(String(localized: "Include note", comment: "Include note picker title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss sheet")) { dismiss() }
                }
            }
        }
        .task {
            if viewModel == nil {
                viewModel = SearchViewModel(appState: appState)
            }
        }
    }

    @ViewBuilder
    private func pickerContent(_ vm: SearchViewModel) -> some View {
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
                                Image(systemName: note.resolvedIconName)
                                    .foregroundStyle(.secondary)
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
