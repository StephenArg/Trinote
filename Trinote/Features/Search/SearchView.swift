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
    @Environment(\.colorScheme) private var colorScheme
    @AppStorage("useCustomTreeColors") private var useCustomTreeColors: Bool = false
    @AppStorage("treeLightBgColor") private var treeLightBgColor: String = "#F2F2F7"
    @AppStorage("treeDarkBgColor") private var treeDarkBgColor: String = "#1c1c1e"
    @State private var viewModel: SearchViewModel?
    @State private var navigateTo: SearchNoteDestination?
    @FocusState private var isSearchFieldFocused: Bool

    private var treeBgColor: Color? {
        guard useCustomTreeColors else { return nil }
        return colorScheme == .dark ? Color(hex: treeDarkBgColor) : Color(hex: treeLightBgColor)
    }

    private var treeChromeBackground: Color {
        treeBgColor ?? Color(.systemGroupedBackground)
    }

    private var listRowBackgroundColor: Color {
        treeBgColor ?? Color(.systemBackground)
    }

    var body: some View {
        Group {
            if let viewModel {
                searchContent(viewModel)
            } else {
                ProgressView()
            }
        }
        .background(treeChromeBackground)
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
        .onReceive(NotificationCenter.default.publisher(for: .trinoteWillSwitchServerProfile)) { _ in
            navigateTo = nil
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
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(treeChromeBackground)
    }

    private var searchFieldBackground: Color {
        colorScheme == .dark
            ? Color(.tertiarySystemFill)
            : Color.accentColor.opacity(0.12)
    }

    private var searchFieldBorder: Color {
        colorScheme == .dark
            ? Color(.separator)
            : Color.accentColor.opacity(0.35)
    }

    private func searchBar(_ vm: SearchViewModel) -> some View {
        HStack(spacing: 8) {
            HStack(spacing: 8) {
                Image(systemName: "magnifyingglass")
                    .foregroundStyle(.secondary)
                TextField(String(localized: "Search notes…", comment: "Search field placeholder"), text: Binding(
                    get: { vm.query },
                    set: { newValue in
                        let wasEmpty = vm.query.isEmpty
                        vm.query = newValue
                        vm.onQueryChanged()
                        if !wasEmpty, newValue.isEmpty {
                            isSearchFieldFocused = false
                        }
                    }
                ))
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .submitLabel(.search)
                .focused($isSearchFieldFocused)
                .onSubmit { Task { await vm.performSearch() } }
                .accessibilityLabel(String(localized: "Search notes", comment: "VoiceOver search field"))

                if !vm.query.isEmpty {
                    Button {
                        vm.clearSearch()
                        isSearchFieldFocused = false
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundStyle(.secondary)
                    }
                    .accessibilityLabel(String(localized: "Clear search", comment: "VoiceOver"))
                }
            }
            .padding(10)
            .background(searchFieldBackground, in: RoundedRectangle(cornerRadius: 10))
            .overlay {
                RoundedRectangle(cornerRadius: 10)
                    .strokeBorder(searchFieldBorder, lineWidth: 1)
            }
        }
        .padding(.horizontal)
        .padding(.top)
        .padding(.bottom, 4)
        .background(treeChromeBackground)
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
                        .listRowBackground(listRowBackgroundColor)
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
        .scrollContentBackground(.hidden)
        .background(treeChromeBackground)
    }

    private static let maxVisibleMatches = 20

    @ViewBuilder
    private func searchResultSection(note: NoteItem, vm: SearchViewModel) -> some View {
        let canExpand = note.type.supportsReadOnlyOnPageFind
        let expanded = vm.expandedMatchNoteIds.contains(note.noteId)

        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .center, spacing: 8) {
                if canExpand {
                    Button {
                        vm.toggleMatchExpansion(for: note)
                    } label: {
                        Image(systemName: expanded ? "chevron.down" : "chevron.right")
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(.secondary)
                            .frame(width: 22, height: 28)
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel(
                        expanded
                            ? String(localized: "Hide matches", comment: "Search result expand")
                            : String(localized: "Show matches", comment: "Search result expand")
                    )
                }

                Button {
                    openNote(note, findQuery: nil, matchIndex1Based: nil)
                } label: {
                    SearchResultRow(note: note, searchQuery: vm.query, showTrailingChevron: true)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
            }

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
                ForEach(vm.recentSearches, id: \.id) { search in
                    Button {
                        vm.selectRecentSearch(search)
                    } label: {
                        HStack(spacing: 12) {
                            Image(systemName: "magnifyingglass")
                                .foregroundStyle(.secondary)
                                .frame(width: 24)
                                .accessibilityHidden(true)

                            VStack(alignment: .leading, spacing: 2) {
                                Text(search.query)
                                    .font(.body)
                                    .lineLimit(2)
                                    .foregroundStyle(.primary)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .multilineTextAlignment(.leading)
                                Text(search.searchedAt.relativeDisplay)
                                    .font(.caption)
                                    .foregroundStyle(.tertiary)
                                    .fixedSize(horizontal: true, vertical: false)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)

                            Image(systemName: "chevron.right")
                                .font(.caption)
                                .foregroundStyle(.quaternary)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .listRowBackground(listRowBackgroundColor)
                }
                .onDelete { offsets in
                    vm.deleteRecentSearches(at: offsets)
                }
            }
            .listStyle(.insetGrouped)
            .contentMargins(.top, 0, for: .scrollContent)
            .scrollContentBackground(.hidden)
            .background(treeChromeBackground)
            .safeAreaInset(edge: .top, spacing: 0) {
                HStack {
                    Text(String(localized: "Recent Searches", comment: "Search history section"))
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(.secondary)
                        .textCase(nil)
                    Spacer()
                    Button(String(localized: "Clear", comment: "Clear all recent searches")) {
                        vm.clearRecentSearches()
                    }
                    .font(.subheadline)
                    .accessibilityHint(String(localized: "Clears all recent searches", comment: "Clear recent searches accessibility hint"))
                }
                .padding(.horizontal, 20)
                .padding(.top, 2)
                .padding(.bottom, 4)
                .frame(maxWidth: .infinity)
                .background(treeChromeBackground)
            }
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
    @AppStorage("useTriliumNoteColors") private var useTriliumNoteColors: Bool = true

    private var displayTitle: String {
        note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
    }

    private var titleHighlightQuery: String {
        searchQuery.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    /// Breadcrumb under root (same as Recents); empty when it would only repeat the title.
    private var pathDisplay: String {
        guard let profileId = appState.activeProfile?.id else { return "" }
        let pathFull = PersistenceManager.shared.cachedNotePathDisplay(
            noteId: note.noteId,
            leafTitle: note.title,
            leafIsProtected: note.isProtected,
            serverProfileId: profileId,
            protectedSessionActive: appState.protectedSessionActive
        )
        return (pathFull == displayTitle) ? "" : pathFull
    }

    private var modifiedLabel: String? {
        let raw = note.dateModified.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !raw.isEmpty else { return nil }
        return raw.triliumDate()?.relativeDisplay ?? raw
    }

    /// Trilium `#color` when enabled; suppressed for locked protected notes (matches Recents).
    private var triliumColor: Color? {
        guard useTriliumNoteColors else { return nil }
        if note.isProtected, !appState.protectedSessionActive { return nil }
        return TriliumNoteColorMapper.swiftUIColor(for: note.colorLabelValue)
    }

    @ViewBuilder
    private var titleView: some View {
        let color = triliumColor ?? Color.primary
        Group {
            if titleHighlightQuery.isEmpty {
                Text(displayTitle)
            } else {
                Text(SearchQueryHighlight.attributedString(text: displayTitle, query: titleHighlightQuery))
            }
        }
        .font(.body)
        .lineLimit(2)
        .foregroundStyle(color)
        .frame(maxWidth: .infinity, alignment: .leading)
        .multilineTextAlignment(.leading)
    }

    private var effectiveIconClass: String? {
        let profileId = appState.activeProfile?.id
        if let resolved = NoteIconClassResolver.effectiveIconClass(
            noteId: note.noteId,
            ownIconClass: note.iconClass,
            templateRelationValue: note.templateRelationValue,
            parentNoteProvider: { parentId in
                guard let profileId else { return nil }
                return PersistenceManager.shared.parentNoteContextForIconWalk(
                    noteId: parentId,
                    serverProfileId: profileId
                )
            },
            templateIconClassProvider: { target in
                guard let profileId else {
                    return TriliumBuiltinTemplateIcons.iconClass(for: target)
                }
                return PersistenceManager.shared.cachedTemplateIconClass(
                    templateTarget: target,
                    serverProfileId: profileId
                )
            }
        ) {
            return resolved
        }
        guard let profileId else { return note.resolvedIconClass }
        return PersistenceManager.shared.cachedEffectiveNoteIconClass(noteId: note.noteId, serverProfileId: profileId)
            ?? note.resolvedIconClass
    }

    var body: some View {
        HStack(spacing: 12) {
            NoteIconView(
                iconClass: effectiveIconClass,
                fallbackNoteType: note.iconFallbackNoteType,
                size: .regular,
                foregroundStyle: triliumColor ?? .secondary
            )
            .frame(width: 24)
            .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                titleView

                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    if let modifiedLabel {
                        Text(modifiedLabel)
                            .font(.caption)
                            .foregroundStyle(.tertiary)
                            .fixedSize(horizontal: true, vertical: false)
                    }
                    if !pathDisplay.isEmpty {
                        Text(pathDisplay)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                            .truncationMode(.middle)
                            .minimumScaleFactor(0.85)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            if showTrailingChevron {
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.quaternary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .accessibilityLabel("\(displayTitle), \(note.uiNoteTypeDisplayName)")
    }
}

#Preview {
    NavigationStack {
        SearchView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
