import SwiftUI
import UIKit

/// Navigation from search, optionally deep-linking into find-on-page at a specific match.
private struct SearchNoteDestination: Hashable {
    let noteId: String
    let title: String
    var findQuery: String?
    var findMatchIndex1Based: Int?
}

struct SearchView: View {
    @Environment(AppState.self) private var appState
    @State private var viewModel: SearchViewModel?
    @State private var navigateTo: SearchNoteDestination?

    var body: some View {
        Group {
            if let viewModel {
                searchContent(viewModel)
            } else {
                ProgressView()
            }
        }
        .navigationTitle(String(localized: "Search", comment: "Search tab title"))
        .task {
            if viewModel == nil {
                let vm = SearchViewModel(appState: appState)
                viewModel = vm
                vm.loadRecentSearches()
            }
        }
        .navigationDestination(item: $navigateTo) { dest in
            NoteDetailView(
                noteId: dest.noteId,
                title: dest.title,
                pendingFindQuery: dest.findQuery,
                pendingFindMatchIndex: dest.findMatchIndex1Based
            )
        }
    }

    @ViewBuilder
    private func searchContent(_ vm: SearchViewModel) -> some View {
        VStack(spacing: 0) {
            searchBar(vm)

            if vm.isSearching {
                Spacer()
                ProgressView(String(localized: "Searching…", comment: "Search in progress"))
                Spacer()
            } else if let error = vm.error, vm.results.isEmpty {
                Spacer()
                ContentUnavailableView {
                    Label(String(localized: "Search Error", comment: "Search failure title"), systemImage: "exclamationmark.triangle")
                } description: {
                    Text(error)
                } actions: {
                    Button(String(localized: "Retry", comment: "Retry search")) { Task { await vm.performSearch() } }
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
                TextField(String(localized: "Search notes…", comment: "Search field placeholder"), text: Binding(
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
                .accessibilityLabel(String(localized: "Search notes", comment: "VoiceOver search field"))

                if !vm.query.isEmpty {
                    Button {
                        vm.clearSearch()
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundStyle(.secondary)
                    }
                    .accessibilityLabel(String(localized: "Clear search", comment: "VoiceOver"))
                }
            }
            .padding(10)
            .background(Color(.systemGray6))
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }
        .padding()
    }

    private func openNote(_ note: NoteItem, findQuery: String?, matchIndex1Based: Int?) {
        navigateTo = SearchNoteDestination(
            noteId: note.noteId,
            title: note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive),
            findQuery: findQuery,
            findMatchIndex1Based: matchIndex1Based
        )
    }

    private func resultsList(_ vm: SearchViewModel) -> some View {
        List {
            if vm.isOfflineResults {
                Section {
                    HStack(spacing: 6) {
                        Image(systemName: "icloud.slash")
                            .font(.caption)
                        Text(String(localized: "Showing cached results (title match only)", comment: "Offline search banner"))
                            .font(.caption)
                    }
                    .foregroundStyle(.orange)
                    .listRowBackground(Color.orange.opacity(0.08))
                }
            }

            Section {
                ForEach(vm.results) { note in
                    searchResultSection(note: note, vm: vm)
                }
            } header: {
                Text(
                    vm.results.count == 1
                        ? String(localized: "1 result", comment: "Search results count")
                        : String(localized: "\(vm.results.count) results", comment: "Search results count")
                )
            }
        }
        .listStyle(.insetGrouped)
    }

    private static let maxVisibleMatches = 20

    @ViewBuilder
    private func searchResultSection(note: NoteItem, vm: SearchViewModel) -> some View {
        let canExpand = note.type.supportsReadOnlyOnPageFind
        let expanded = vm.expandedMatchNoteIds.contains(note.noteId)

        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .top, spacing: 8) {
                if canExpand {
                    Button {
                        vm.toggleMatchExpansion(for: note)
                    } label: {
                        Image(systemName: expanded ? "chevron.down" : "chevron.right")
                            .font(.body.weight(.semibold))
                            .foregroundStyle(.secondary)
                            .frame(width: 22, height: 28)
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                }

                Button {
                    openNote(note, findQuery: nil, matchIndex1Based: nil)
                } label: {
                    SearchResultRow(note: note, searchQuery: vm.query, showTrailingChevron: true)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
            }
            .padding(.vertical, 4)

            if expanded && canExpand {
                matchExpansionContent(note: note, vm: vm)
            }
        }
        .environment(appState)
    }

    @ViewBuilder
    private func matchExpansionContent(note: NoteItem, vm: SearchViewModel) -> some View {
        let allMatches = vm.matchLines(for: note.noteId)
        let visibleMatches = Array(allMatches.prefix(Self.maxVisibleMatches))
        let hasMore = allMatches.count > Self.maxVisibleMatches

        if vm.loadingMatchNoteIds.contains(note.noteId) {
            HStack(spacing: 8) {
                ProgressView()
                    .controlSize(.small)
                Text(String(localized: "Loading matches…", comment: "Search expansion"))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(.leading, 30)
            .padding(.bottom, 8)
        } else if let err = vm.matchLoadErrorByNoteId[note.noteId],
                  allMatches.isEmpty {
            Text(err)
                .font(.caption)
                .foregroundStyle(.secondary)
                .padding(.leading, 30)
                .padding(.bottom, 8)
        }

        ForEach(visibleMatches) { match in
            Button {
                let q = vm.query.trimmingCharacters(in: .whitespacesAndNewlines)
                openNote(note, findQuery: q, matchIndex1Based: match.matchIndex1Based)
            } label: {
                HStack(alignment: .top, spacing: 6) {
                    Text("–")
                        .font(.caption)
                        .foregroundStyle(.tertiary)
                    SearchMatchPreviewLine(text: match.previewLine, query: vm.query)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .padding(.vertical, 4)
                .padding(.leading, 30)
            }
            .buttonStyle(.plain)
        }

        if hasMore {
            HStack(spacing: 6) {
                Text("–")
                    .font(.caption)
                    .foregroundStyle(.tertiary)
                Text(String(localized: "more references in note", comment: "Search match truncation"))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .italic()
            }
            .padding(.vertical, 4)
            .padding(.leading, 30)
        }
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
                Text(String(localized: "Search your notes", comment: "Search empty state title"))
                    .font(.headline)
                    .foregroundStyle(.secondary)
                Text(String(localized: "Type to search by title, content, or attributes", comment: "Search empty state hint"))
                    .font(.subheadline)
                    .foregroundStyle(.tertiary)
                    .multilineTextAlignment(.center)
            }
            .padding()
            Spacer()
        } else {
            List {
                Section(String(localized: "Recent Searches", comment: "Search history section")) {
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

// MARK: - Query highlight (titles + previews)

enum SearchQueryHighlight {
    static func attributedString(text: String, query: String) -> AttributedString {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        let mutable = NSMutableAttributedString(string: text)
        guard !trimmed.isEmpty else {
            return AttributedString(mutable)
        }

        let nsText = text as NSString
        let len = nsText.length
        let bg = UIColor.systemYellow.withAlphaComponent(0.38)
        var loc = 0
        while loc < len {
            let r = nsText.range(of: trimmed, options: [.caseInsensitive], range: NSRange(location: loc, length: len - loc))
            if r.location == NSNotFound { break }
            mutable.addAttribute(.backgroundColor, value: bg, range: r)
            loc = r.location + max(r.length, 1)
        }
        return AttributedString(mutable)
    }
}

struct SearchMatchPreviewLine: View {
    let text: String
    let query: String

    var body: some View {
        Text(SearchQueryHighlight.attributedString(text: text, query: query))
            .font(.caption)
            .foregroundStyle(.primary)
            .lineLimit(2)
            .multilineTextAlignment(.leading)
    }
}

struct SearchResultRow: View {
    let note: NoteItem
    /// Current search query; title matches are highlighted (case-insensitive).
    var searchQuery: String = ""
    var showTrailingChevron: Bool = true

    @Environment(AppState.self) private var appState

    private var displayTitle: String {
        note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
    }

    private var titleHighlightQuery: String {
        searchQuery.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    @ViewBuilder
    private var titleView: some View {
        if titleHighlightQuery.isEmpty {
            Text(displayTitle)
                .font(.body)
                .lineLimit(2)
        } else {
            Text(SearchQueryHighlight.attributedString(text: displayTitle, query: titleHighlightQuery))
                .font(.body)
                .lineLimit(2)
        }
    }

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: note.resolvedIconName)
                .foregroundStyle(.secondary)
                .frame(width: 24)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 4) {
                titleView

                if note.showsSharingBadge || note.showsMultiCloneBadge || note.isProtected {
                    HStack(spacing: 8) {
                        if note.isSharedWithMultipleTreePlacements {
                            Label(String(localized: "Sharing", comment: "Search result badge"), systemImage: "scale.3d")
                                .font(.caption2)
                                .foregroundStyle(Color.green)
                            Label(String(localized: "Cloned", comment: "Search result badge"), systemImage: "arrow.triangle.branch")
                                .font(.caption2)
                                .foregroundStyle(.orange)
                        } else if note.showsSharingBadge {
                            Label(String(localized: "Sharing", comment: "Search result badge"), systemImage: "scale.3d")
                                .font(.caption2)
                                .foregroundStyle(Color.green)
                        } else if note.showsMultiCloneBadge {
                            Label(String(localized: "Cloned", comment: "Search result badge"), systemImage: "arrow.triangle.branch")
                                .font(.caption2)
                                .foregroundStyle(.orange)
                        }

                        if note.isProtected {
                            Label(String(localized: "Protected", comment: "Search result badge"), systemImage: "lock.fill")
                                .font(.caption2)
                                .foregroundStyle(.yellow)
                        }
                    }
                }

                if !note.dateModified.isEmpty {
                    Text(String(localized: "Modified \(note.dateModified.triliumDate()?.relativeDisplay ?? note.dateModified)", comment: "Search result date"))
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                }
            }

            Spacer()

            if showTrailingChevron {
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.quaternary)
            }
        }
        .accessibilityLabel("\(displayTitle), \(note.type.displayName)")
    }
}

#Preview {
    NavigationStack {
        SearchView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
