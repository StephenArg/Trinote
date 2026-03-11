import SwiftUI

struct SearchView: View {
    @Environment(AppState.self) private var appState
    @State private var viewModel: SearchViewModel?
    @State private var navigateToNote: NoteItem?

    var body: some View {
        Group {
            if let viewModel {
                searchContent(viewModel)
            } else {
                ProgressView()
            }
        }
        .navigationTitle("Search")
        .task {
            if viewModel == nil {
                let vm = SearchViewModel(appState: appState)
                viewModel = vm
                vm.loadRecentSearches()
            }
        }
        .navigationDestination(item: $navigateToNote) { note in
            NoteDetailView(noteId: note.noteId, title: note.title)
        }
    }

    @ViewBuilder
    private func searchContent(_ vm: SearchViewModel) -> some View {
        VStack(spacing: 0) {
            searchBar(vm)

            if vm.isSearching {
                Spacer()
                ProgressView("Searching…")
                Spacer()
            } else if let error = vm.error, vm.results.isEmpty {
                Spacer()
                ContentUnavailableView {
                    Label("Search Error", systemImage: "exclamationmark.triangle")
                } description: {
                    Text(error)
                } actions: {
                    Button("Retry") { Task { await vm.performSearch() } }
                        .buttonStyle(.bordered)
                }
                Spacer()
            } else if vm.hasSearched && vm.results.isEmpty {
                Spacer()
                ContentUnavailableView.search(text: vm.query)
                Spacer()
            } else if vm.hasSearched {
                resultsList(vm)
            } else {
                recentSearchesList(vm)
            }
        }
    }

    private func searchBar(_ vm: SearchViewModel) -> some View {
        HStack(spacing: 8) {
            HStack(spacing: 8) {
                Image(systemName: "magnifyingglass")
                    .foregroundStyle(.secondary)
                TextField("Search notes…", text: Binding(
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
                .accessibilityLabel("Search notes")

                if !vm.query.isEmpty {
                    Button {
                        vm.clearSearch()
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundStyle(.secondary)
                    }
                    .accessibilityLabel("Clear search")
                }
            }
            .padding(10)
            .background(Color(.systemGray6))
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }
        .padding()
    }

    private func resultsList(_ vm: SearchViewModel) -> some View {
        List {
            if vm.isOfflineResults {
                Section {
                    HStack(spacing: 6) {
                        Image(systemName: "icloud.slash")
                            .font(.caption)
                        Text("Showing cached results (title match only)")
                            .font(.caption)
                    }
                    .foregroundStyle(.orange)
                    .listRowBackground(Color.orange.opacity(0.08))
                }
            }

            Section {
                ForEach(vm.results) { note in
                    Button {
                        navigateToNote = note
                    } label: {
                        SearchResultRow(note: note)
                    }
                    .buttonStyle(.plain)
                }
            } header: {
                Text("\(vm.results.count) result\(vm.results.count == 1 ? "" : "s")")
            }
        }
        .listStyle(.insetGrouped)
    }

    @ViewBuilder
    private func recentSearchesList(_ vm: SearchViewModel) -> some View {
        if vm.recentSearches.isEmpty {
            Spacer()
            VStack(spacing: 12) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 36))
                    .foregroundStyle(.secondary)
                    .accessibilityHidden(true)
                Text("Search your notes")
                    .font(.headline)
                    .foregroundStyle(.secondary)
                Text("Type to search by title, content, or attributes")
                    .font(.subheadline)
                    .foregroundStyle(.tertiary)
                    .multilineTextAlignment(.center)
            }
            .padding()
            Spacer()
        } else {
            List {
                Section("Recent Searches") {
                    ForEach(vm.recentSearches, id: \.id) { search in
                        Button {
                            vm.selectRecentSearch(search)
                        } label: {
                            HStack(spacing: 12) {
                                Image(systemName: "clock")
                                    .foregroundStyle(.secondary)
                                VStack(alignment: .leading) {
                                    Text(search.query)
                                        .foregroundStyle(.primary)
                                    Text(search.searchedAt.relativeDisplay)
                                        .font(.caption)
                                        .foregroundStyle(.tertiary)
                                }
                            }
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .listStyle(.insetGrouped)
        }
    }
}

struct SearchResultRow: View {
    let note: NoteItem

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: note.type.iconName)
                .foregroundStyle(.secondary)
                .frame(width: 24)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 4) {
                Text(note.title)
                    .font(.body)
                    .lineLimit(2)

                HStack(spacing: 8) {
                    Text(note.type.displayName)
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    if note.parentNoteIds.count > 1 {
                        Label("Cloned", systemImage: "arrow.triangle.branch")
                            .font(.caption2)
                            .foregroundStyle(.orange)
                    }

                    if note.isProtected {
                        Label("Protected", systemImage: "lock.fill")
                            .font(.caption2)
                            .foregroundStyle(.yellow)
                    }
                }

                if !note.dateModified.isEmpty {
                    Text("Modified \(note.dateModified.triliumDate()?.relativeDisplay ?? note.dateModified)")
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                }
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.caption)
                .foregroundStyle(.quaternary)
        }
        .padding(.vertical, 4)
        .accessibilityLabel("\(note.title), \(note.type.displayName)")
    }
}

#Preview {
    NavigationStack {
        SearchView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
