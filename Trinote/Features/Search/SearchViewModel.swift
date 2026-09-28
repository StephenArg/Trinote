import Foundation
import Observation
import os
import SwiftData
import UIKit

// MARK: - Server snippets (quick search)

/// Trilium's own snippet for a search result: the matched text around the query and the note's breadcrumb. Offline
/// results carry the same kind of snippet, cut from the cached body.
struct SearchResultSnippet: Equatable, Sendable {
    let pathTitle: String?
    let content: AttributedString?
    let attribute: AttributedString?

    init(pathTitle: String? = nil, content: AttributedString?, attribute: AttributedString? = nil) {
        self.pathTitle = pathTitle
        self.content = content
        self.attribute = attribute
    }

    init?(_ result: QuickSearchResult) {
        let path = result.notePathTitle?.trimmingCharacters(in: .whitespacesAndNewlines)
        pathTitle = path?.isEmpty == false ? path : nil
        content = SearchSnippetFormatter.attributed(
            highlightedHTML: result.highlightedContentSnippet,
            plain: result.contentSnippet
        )
        attribute = SearchSnippetFormatter.attributed(
            highlightedHTML: result.highlightedAttributeSnippet,
            plain: result.attributeSnippet
        )
        if pathTitle == nil, content == nil, attribute == nil { return nil }
    }
}

/// Turns Trilium's highlighted snippets (escaped text, `<b>` around matches, `<br>` between lines) into styled text.
enum SearchSnippetFormatter {
    private static let tagPattern = try? NSRegularExpression(pattern: #"<(/?)(b|br)\b([^>]*)>"#, options: [.caseInsensitive])

    static func attributed(highlightedHTML: String?, plain: String?) -> AttributedString? {
        if let html = highlightedHTML?.trimmingCharacters(in: .whitespacesAndNewlines), !html.isEmpty,
           let tagPattern {
            let result = NSMutableAttributedString()
            var highlight: UIColor?
            var cursor = html.startIndex
            for match in tagPattern.matches(in: html, range: NSRange(html.startIndex..., in: html)) {
                guard let range = Range(match.range, in: html) else { continue }
                append(String(html[cursor..<range.lowerBound]), highlight: highlight, to: result)
                cursor = range.upperBound
                let isClosing = Range(match.range(at: 1), in: html).map { !html[$0].isEmpty } ?? false
                let tag = Range(match.range(at: 2), in: html).map { html[$0].lowercased() } ?? ""
                if tag == "br" {
                    append(" ", highlight: nil, to: result)
                } else if isClosing {
                    highlight = nil
                } else {
                    let attributes = Range(match.range(at: 3), in: html).map { String(html[$0]) } ?? ""
                    // v0.106 marks fuzzy matches with a class; they get a paler highlight than exact ones.
                    highlight = attributes.contains("class=")
                        ? UIColor.systemOrange.withAlphaComponent(0.25)
                        : UIColor.systemYellow.withAlphaComponent(0.38)
                }
            }
            append(String(html[cursor...]), highlight: highlight, to: result)
            let text = result.string.trimmingCharacters(in: .whitespacesAndNewlines)
            return text.isEmpty ? nil : AttributedString(result)
        }
        let text = plain?
            .replacingOccurrences(of: "\n", with: " ")
            .trimmingCharacters(in: .whitespacesAndNewlines)
        guard let text, !text.isEmpty else { return nil }
        return AttributedString(text)
    }

    private static func append(_ escaped: String, highlight: UIColor?, to result: NSMutableAttributedString) {
        let text = unescape(escaped)
        guard !text.isEmpty else { return }
        var attributes: [NSAttributedString.Key: Any] = [:]
        if let highlight {
            attributes[.backgroundColor] = highlight
            attributes[.inlinePresentationIntent] = InlinePresentationIntent.stronglyEmphasized.rawValue
        }
        result.append(NSAttributedString(string: text, attributes: attributes))
    }

    private static func unescape(_ text: String) -> String {
        guard text.contains("&") else { return text }
        var out = text
        for (entity, char) in [("&lt;", "<"), ("&gt;", ">"), ("&quot;", "\""), ("&#39;", "'"), ("&#039;", "'"),
                               ("&#x27;", "'"), ("&nbsp;", " "), ("&amp;", "&")] {
            out = out.replacingOccurrences(of: entity, with: char)
        }
        return out
    }
}

/// Why the list shows results from this device instead of the server's.
enum LocalResultsReason: Equatable, Sendable {
    /// The device has no network connection.
    case noConnection
    /// The server didn't answer in time or couldn't be reached (also while `AppState.activeServerSearchBackoff` lasts).
    case serverUnreachable
    /// The server answered with an error; the message says which.
    case serverFailed(String)
    /// Not connected to a server.
    case noClient
}

@Observable
@MainActor
final class SearchViewModel {
    var query = ""
    var results: [NoteItem] = []
    var isSearching = false
    var error: String?
    var recentSearches: [RecentSearch] = []
    var hasSearched = false
    /// Set when `results` came from this device instead of the server.
    var localResultsReason: LocalResultsReason?
    var isOfflineResults: Bool { localResultsReason != nil }
    /// Local results only: the query used operators only the server understands, which were left out.
    var localQueryIsLimited = false
    /// Local results only: how far the offline search index has got while it's still being built.
    var localIndexProgress: OfflineSearchIndex.Progress?
    /// Trilium's snippet and breadcrumb per result note, when the server provides them.
    var snippetsByNoteId: [String: SearchResultSnippet] = [:]
    /// What's wrong with the query, as Trilium 0.106+ reads it (`POST /api/search/lint`); nil when nothing is.
    var queryProblem: String?

    /// Disclosure rows: note IDs expanded to show in-note match lines.
    var expandedMatchNoteIds: Set<String> = []

    /// Cached match previews per note (not tracked by Observation — avoids macro/type issues; UI refreshes via other fields).
    @ObservationIgnored private var matchLinesByNoteIdStorage: [String: [SearchInNoteMatch]] = [:]

    var loadingMatchNoteIds: Set<String> = []
    private(set) var matchLoadErrorByNoteId: [String: String] = [:]

    /// Bumped whenever match expansion cache is cleared so in-flight loads skip stale writes.
    private var matchLinesLoadGeneration: Int = 0
    /// Query string used for the last committed `matchLinesByNoteIdStorage` entry per note (whitespace-trimmed).
    @ObservationIgnored private var lastCommittedMatchQueryByNoteId: [String: String] = [:]

    private var searchTask: Task<Void, Never>?
    @ObservationIgnored private var lintTask: Task<Void, Never>?
    /// Bumped per search, so an older one finishing late can't touch the newer one's state.
    @ObservationIgnored private var searchGeneration = 0
    /// The note picker shows no snippets, so it skips the second search (`quick-search`) that fetches them.
    private let fetchesSnippets: Bool
    /// How long a server search may take before the device's own results are shown instead (issue #29).
    private let serverTimeout: TimeInterval
    private let appState: AppState
    private let localIndex: OfflineSearchIndex
    private let persistence = PersistenceManager.shared

    static let serverSearchTimeout: TimeInterval = 15
    static let resultLimit = 50

    init(
        appState: AppState,
        fetchesSnippets: Bool = true,
        serverTimeout: TimeInterval = SearchViewModel.serverSearchTimeout,
        localIndex: OfflineSearchIndex = .shared
    ) {
        self.appState = appState
        self.fetchesSnippets = fetchesSnippets
        self.serverTimeout = serverTimeout
        self.localIndex = localIndex
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }

    func matchLines(for noteId: String) -> [SearchInNoteMatch] {
        matchLinesByNoteIdStorage[noteId] ?? []
    }

    func onQueryChanged() {
        searchTask?.cancel()
        lintTask?.cancel()
        clearMatchExpansionState()
        guard !query.trimmingCharacters(in: .whitespaces).isEmpty else {
            results = []
            hasSearched = false
            clearLocalResultsState()
            queryProblem = nil
            return
        }

        searchTask = Task {
            try? await Task.sleep(milliseconds: 400)
            guard !Task.isCancelled else { return }
            await performSearch()
        }
    }

    /// Searches right away (Return, a recent search, Retry), replacing any search still pending or running, so a
    /// query never runs twice. `forceServer` (Retry) asks the server even while a recent failure has it skipped.
    func searchNow(forceServer: Bool = false) {
        searchTask?.cancel()
        lintTask?.cancel()
        searchTask = Task { await performSearch(forceServer: forceServer) }
    }

    func performSearch(forceServer: Bool = false) async {
        let trimmed = query.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }

        searchGeneration += 1
        let generation = searchGeneration
        isSearching = true
        error = nil
        hasSearched = true
        clearLocalResultsState()
        snippetsByNoteId = [:]
        clearMatchExpansionState()
        defer {
            if generation == searchGeneration { isSearching = false }
        }

        guard let client else {
            queryProblem = nil
            await performLocalSearch(trimmed, reason: .noClient, generation: generation)
            return
        }
        // No network: the request would wait for one (up to two minutes) before failing.
        guard appState.isOnline else {
            lintTask?.cancel()
            queryProblem = nil
            await performLocalSearch(trimmed, reason: .noConnection, generation: generation)
            return
        }
        if forceServer {
            appState.clearServerSearchBackoff()
        } else if appState.activeServerSearchBackoff != nil {
            lintTask?.cancel()
            queryProblem = nil
            await performLocalSearch(trimmed, reason: .serverUnreachable, generation: generation)
            return
        }

        // Checked beside the search, which still runs: the message only explains a query that finds nothing.
        let checksQuery = TriliumServerCompatibility.supportsSearchLint(appState.serverAppInfo)
        lintTask?.cancel()
        lintTask = Task { [weak self] in
            var problem: String?
            if checksQuery {
                do {
                    problem = try await client.lintSearchQuery(trimmed)
                    Log.api.info("Search lint: \(problem ?? "no problem")")
                } catch {
                    Log.api.warning("Search lint failed: \(error)")
                }
            } else {
                Log.api.info("Search lint skipped: server \(self?.appState.serverAppInfo?.appVersion ?? "unknown")")
            }
            guard !Task.isCancelled, let self, self.query.trimmingCharacters(in: .whitespaces) == trimmed else { return }
            self.queryProblem = problem
        }
        let timeout = serverTimeout
        do {
            let response = try await withTimeout(seconds: timeout) {
                try await client.searchNotes(query: trimmed, fastSearch: false, includeArchived: false, ancestorNoteId: nil, orderBy: nil, orderDirection: nil, limit: Self.resultLimit)
            }
            guard !Task.isCancelled, generation == searchGeneration else { return }
            results = response.results.map(NoteItem.init)
            // The list is ready: stop the spinner now, snippets fill in when they arrive.
            isSearching = false

            if let profileId = serverProfileId {
                try? persistence.recordRecentSearch(query: trimmed, serverProfileId: profileId)
                loadRecentSearches()
            }

            // Snippets come from a second full search (so the list and its ranking stay the first's). Trilium
            // runs searches one at a time, so asking only now gets the list back first.
            guard fetchesSnippets else { return }
            let snippets = await Self.fetchSnippets(client: client, query: trimmed, timeout: timeout)
            guard !Task.isCancelled, generation == searchGeneration,
                  query.trimmingCharacters(in: .whitespaces) == trimmed else { return }
            snippetsByNoteId = snippets
        } catch {
            guard !Task.isCancelled, generation == searchGeneration else { return }
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            Log.api.error("Search failed, searching this device instead: \(error)")

            let reason: LocalResultsReason
            if apiError.isNetworkError {
                // The lint request goes to the same unreachable server.
                lintTask?.cancel()
                appState.beginServerSearchBackoff(message: apiError.localizedDescription)
                reason = .serverUnreachable
            } else {
                reason = .serverFailed(apiError.localizedDescription)
            }
            await performLocalSearch(trimmed, reason: reason, generation: generation)
        }
    }

    /// Empty when the server has no quick search or its results carry no snippets: rows then show as before.
    nonisolated private static func fetchSnippets(
        client: any TriliumClientProtocol,
        query: String,
        timeout: TimeInterval
    ) async -> [String: SearchResultSnippet] {
        guard let results = try? await withTimeout(seconds: timeout, operation: {
            try await client.quickSearchResults(query: query)
        }) else { return [:] }
        var snippets: [String: SearchResultSnippet] = [:]
        for result in results {
            guard let noteId = result.resolvedNoteId, snippets[noteId] == nil,
                  let snippet = SearchResultSnippet(result) else { continue }
            snippets[noteId] = snippet
        }
        return snippets
    }

    /// Searches the notes cached on this device: titles, bodies (through the offline index) and `#labels`.
    private func performLocalSearch(_ query: String, reason: LocalResultsReason, generation: Int) async {
        let parsed = LocalSearchQuery(query)
        localResultsReason = reason
        localQueryIsLimited = parsed.hasUnsupportedOperators
        guard let profileId = serverProfileId else {
            results = []
            return
        }
        do {
            let outcome = try await localIndex.search(parsed, profileId: profileId, limit: Self.resultLimit)
            guard !Task.isCancelled, generation == searchGeneration else { return }
            results = outcome.hits.map(NoteItem.init(localHit:))
            localIndexProgress = outcome.indexProgress
            if fetchesSnippets {
                var snippets: [String: SearchResultSnippet] = [:]
                for hit in outcome.hits {
                    guard let preview = hit.snippet else { continue }
                    snippets[hit.noteId] = SearchResultSnippet(
                        content: SearchQueryHighlight.attributedString(text: preview, terms: parsed.highlightTerms)
                    )
                }
                snippetsByNoteId = snippets
            }
        } catch {
            guard !Task.isCancelled, generation == searchGeneration else { return }
            Log.search.error("Offline search failed: \(error)")
            results = []
            self.error = String(localized: "Couldn’t search the notes on this device.", comment: "Offline search failure")
        }
        // Picks up notes opened or edited on this device since the last sync.
        localIndex.scheduleRefresh(profileId: profileId)
    }

    /// Lines explaining local results: why they aren't the server's first, then what they may be missing. Empty for
    /// server results.
    var localResultsDetails: [String] {
        guard let localResultsReason else { return [] }
        var lines: [String] = []
        switch localResultsReason {
        case .noConnection:
            lines.append(String(localized: "No connection — showing results from this device", comment: "Offline search banner: no network"))
        case .serverUnreachable:
            lines.append(String(localized: "Server didn’t respond — showing results from this device", comment: "Offline search banner: server timed out or unreachable"))
        case .serverFailed(let message):
            lines.append(String(localized: "Server search failed — showing results from this device", comment: "Offline search banner: server returned an error"))
            lines.append(message)
        case .noClient:
            lines.append(String(localized: "Showing results from this device", comment: "Offline search banner: no server connection"))
        }
        if let localIndexProgress {
            lines.append(String(
                localized: "Offline search index is still being built (\(localIndexProgress.done) of \(localIndexProgress.total) notes)",
                comment: "Offline search banner: index build progress"
            ))
        }
        if localQueryIsLimited {
            lines.append(String(localized: "Only words and #labels are searched on this device", comment: "Offline search banner: query used server-only operators"))
        }
        return lines
    }

    /// Whether Retry can ask the server again (the device has a connection, but the server failed or was skipped).
    var localResultsCanRetryServer: Bool {
        switch localResultsReason {
        case .serverUnreachable, .serverFailed: return client != nil
        default: return false
        }
    }

    private func clearLocalResultsState() {
        localResultsReason = nil
        localQueryIsLimited = false
        localIndexProgress = nil
    }

    func loadRecentSearches() {
        guard let profileId = serverProfileId else { return }
        do {
            recentSearches = try persistence.fetchRecentSearches(serverProfileId: profileId)
        } catch {
            Log.persistence.error("Failed to load recent searches: \(error)")
        }
    }

    func selectRecentSearch(_ search: RecentSearch) {
        query = search.query
        searchNow()
    }

    func deleteRecentSearches(at offsets: IndexSet) {
        let toDelete = offsets.compactMap { recentSearches.indices.contains($0) ? recentSearches[$0] : nil }
        for search in toDelete {
            do {
                try persistence.deleteRecentSearch(id: search.id)
            } catch {
                Log.persistence.error("Failed to delete recent search: \(error)")
            }
        }
        loadRecentSearches()
    }

    func clearRecentSearches() {
        guard let profileId = serverProfileId else { return }
        do {
            try persistence.clearRecentSearches(serverProfileId: profileId)
            recentSearches = []
        } catch {
            Log.persistence.error("Failed to clear recent searches: \(error)")
        }
    }

    func clearSearch() {
        query = ""
        results = []
        snippetsByNoteId = [:]
        queryProblem = nil
        hasSearched = false
        clearLocalResultsState()
        clearMatchExpansionState()
        searchTask?.cancel()
    }

    func clearMatchExpansionState() {
        matchLinesLoadGeneration += 1
        expandedMatchNoteIds.removeAll()
        matchLinesByNoteIdStorage.removeAll()
        matchLoadErrorByNoteId.removeAll()
        loadingMatchNoteIds.removeAll()
        lastCommittedMatchQueryByNoteId.removeAll()
    }

    func toggleMatchExpansion(for note: NoteItem) {
        guard note.type.supportsReadOnlyOnPageFind else { return }
        if expandedMatchNoteIds.contains(note.noteId) {
            expandedMatchNoteIds.remove(note.noteId)
            return
        }
        let trimmed = query.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }

        expandedMatchNoteIds.insert(note.noteId)
        if lastCommittedMatchQueryByNoteId[note.noteId] == trimmed,
           matchLinesByNoteIdStorage[note.noteId] != nil {
            return
        }

        matchLoadErrorByNoteId[note.noteId] = nil
        Task { await loadMatchLines(for: note) }
    }

    private func loadMatchLines(for note: NoteItem) async {
        let trimmed = query.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }

        if note.isProtected, !appState.protectedSessionActive {
            matchLoadErrorByNoteId[note.noteId] = String(
                localized: "Unlock the note to preview matches in the body.",
                comment: "Search expansion when protected session is locked"
            )
            return
        }

        let generation = matchLinesLoadGeneration

        loadingMatchNoteIds.insert(note.noteId)
        matchLoadErrorByNoteId[note.noteId] = nil
        defer { loadingMatchNoteIds.remove(note.noteId) }

        var raw: String?
        // Offline, or the server just failed: the cached body, without waiting on the server again.
        let cacheFirst = isOfflineResults || !appState.isOnline
        if cacheFirst {
            raw = cachedBody(noteId: note.noteId)
        }
        if raw == nil, let client {
            do {
                let noteId = note.noteId
                let data = try await withTimeout(seconds: serverTimeout) {
                    try await client.getNoteContent(noteId)
                }
                guard !Task.isCancelled else { return }
                raw = String(data: data, encoding: .utf8)
            } catch {
                guard !Task.isCancelled else { return }
                Log.api.error("Search match preview: getNoteContent failed: \(error)")
                raw = nil
            }
        }
        if raw == nil, !cacheFirst {
            raw = cachedBody(noteId: note.noteId)
        }

        guard matchLoadStillValid(generation: generation, trimmedQuery: trimmed) else { return }

        guard let content = raw, !content.isEmpty else {
            matchLoadErrorByNoteId[note.noteId] = String(
                localized: "Couldn’t load note content for previews.",
                comment: "Search expansion when body fetch fails"
            )
            return
        }

        Log.search.debug("loadMatchLines: noteId=\(note.noteId), type=\(note.type.rawValue), query len=\(trimmed.count), rawLen=\(content.count)")

        let noteType = note.type
        let matches = await Task.detached(priority: .utility) {
            SearchNoteMatchExtractor.matches(noteType: noteType, rawContent: content, searchText: trimmed)
        }.value

        guard matchLoadStillValid(generation: generation, trimmedQuery: trimmed) else { return }

        matchLinesByNoteIdStorage[note.noteId] = matches
        lastCommittedMatchQueryByNoteId[note.noteId] = trimmed
        Log.search.debug("loadMatchLines: stored \(matches.count) matches")
        if matches.isEmpty {
            matchLoadErrorByNoteId[note.noteId] = String(
                localized: "No matching lines in the loaded text (previews use plain text; very long notes may differ slightly from in-page find).",
                comment: "Search expansion empty hint"
            )
        } else {
            matchLoadErrorByNoteId[note.noteId] = nil
        }
    }

    private func cachedBody(noteId: String) -> String? {
        guard let profileId = serverProfileId,
              let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId),
              let data = cached.content
        else { return nil }
        return String(data: data, encoding: .utf8)
    }

    private func matchLoadStillValid(generation: Int, trimmedQuery: String) -> Bool {
        generation == matchLinesLoadGeneration
            && query.trimmingCharacters(in: .whitespaces) == trimmedQuery
    }
}

private extension NoteItem {
    init(localHit hit: LocalSearchHit) {
        self.init(
            noteId: hit.noteId,
            title: hit.title,
            type: NoteType(rawValue: hit.noteType) ?? .text,
            mime: hit.mime,
            isProtected: hit.isProtected,
            dateCreated: "",
            // `utcDateModified` is "yyyy-MM-dd HH:mm:ss.SSSZ"; with a "T" it parses as ISO 8601 for the row's date.
            dateModified: hit.utcDateModified?.replacingOccurrences(of: " ", with: "T") ?? "",
            parentNoteIds: hit.parentNoteIds,
            childNoteIds: hit.childNoteIds,
            parentBranchIds: hit.parentBranchIds,
            childBranchIds: hit.childBranchIds,
            attributes: []
        )
    }
}
