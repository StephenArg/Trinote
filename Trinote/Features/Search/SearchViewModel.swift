import Foundation
import Observation
import os
import SwiftData

// MARK: - In-note match previews (file-level: not on any @Observable tracked property)

/// One occurrence of the search query in a note, with a 1-based index aligned with in-page find (order of matches in plain text).
struct SearchInNoteMatch: Identifiable, Hashable, Sendable {
    var id: Int { matchIndex1Based }
    let matchIndex1Based: Int
    /// Single-line preview; query substring can be highlighted in UI.
    let previewLine: String
}

private enum SearchNoteMatchExtractor {
    private static let maxPreviewLength = 200

    static func matches(noteType: NoteType, rawContent: String, searchText: String) -> [SearchInNoteMatch] {
        let trimmed = searchText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return [] }

        let plain: String
        switch noteType {
        case .text:
            plain = plainTextFromHTML(rawContent)
        case .code:
            plain = rawContent
        default:
            return []
        }

        guard !plain.isEmpty else {
            Log.search.debug("matches: plain text is empty for \(noteType.rawValue) note")
            return []
        }

        Log.search.debug("matches: noteType=\(noteType.rawValue), query len=\(trimmed.count), plainLen=\(plain.count)")

        let ns = plain as NSString
        let len = ns.length
        var results: [SearchInNoteMatch] = []
        var searchLoc = 0
        var index = 1

        while searchLoc < len {
            let r = ns.range(of: trimmed, options: [.caseInsensitive], range: NSRange(location: searchLoc, length: len - searchLoc))
            if r.location == NSNotFound { break }
            let preview = previewSnippet(around: r, query: trimmed, inPlainText: ns, length: len)
            results.append(SearchInNoteMatch(matchIndex1Based: index, previewLine: preview))
            index += 1
            searchLoc = r.location + max(r.length, 1)
        }

        Log.search.debug("matches: found \(results.count) matches")
        return results
    }

    // MARK: - HTML → plain text (thread-safe, no WebKit/NSAttributedString)

    private static let htmlEntityMap: [String: String] = [
        "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": "\"", "&apos;": "'",
        "&nbsp;": " ", "&ndash;": "–", "&mdash;": "—", "&hellip;": "…",
        "&lsquo;": "\u{2018}", "&rsquo;": "\u{2019}",
        "&ldquo;": "\u{201C}", "&rdquo;": "\u{201D}",
    ]

    private static func plainTextFromHTML(_ html: String) -> String {
        var text = html

        // Remove script/style blocks entirely (content + tags)
        text = text.replacingOccurrences(of: "<style[^>]*>[\\s\\S]*?</style>", with: "", options: [.regularExpression, .caseInsensitive])
        text = text.replacingOccurrences(of: "<script[^>]*>[\\s\\S]*?</script>", with: "", options: [.regularExpression, .caseInsensitive])
        // Remove HTML comments
        text = text.replacingOccurrences(of: "<!--[\\s\\S]*?-->", with: "", options: .regularExpression)

        // Insert newlines for block-level boundaries
        let blockTags = "p|div|br|h[1-6]|li|tr|blockquote|pre|hr|section|article|header|footer|figcaption|ul|ol|table|thead|tbody|tfoot|dd|dt"
        text = text.replacingOccurrences(of: "<\\s*(?:\(blockTags))\\b[^>]*>", with: "\n", options: [.regularExpression, .caseInsensitive])
        text = text.replacingOccurrences(of: "</\\s*(?:\(blockTags))\\s*>", with: "\n", options: [.regularExpression, .caseInsensitive])

        // Checkbox inputs
        text = text.replacingOccurrences(
            of: "<input[^>]*checked[^>]*>",
            with: "☑ ",
            options: [.regularExpression, .caseInsensitive]
        )
        text = text.replacingOccurrences(
            of: "<input[^>]*type\\s*=\\s*[\"']checkbox[\"'][^>]*>",
            with: "☐ ",
            options: [.regularExpression, .caseInsensitive]
        )

        // Strip all remaining tags
        text = text.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)

        // Decode HTML entities
        for (entity, replacement) in htmlEntityMap {
            text = text.replacingOccurrences(of: entity, with: replacement)
        }
        text = decodeNumericEntities(text)

        // Normalize whitespace within lines (keep newlines)
        text = text.replacingOccurrences(of: "[^\\S\\n]+", with: " ", options: .regularExpression)
        // Collapse excessive blank lines
        text = text.replacingOccurrences(of: "\\n{3,}", with: "\n\n", options: .regularExpression)
        text = text.trimmingCharacters(in: .whitespacesAndNewlines)

        return text
    }

    private static func decodeNumericEntities(_ text: String) -> String {
        var result = text
        // &#xHEX; (must come before decimal to avoid partial matching)
        while let range = result.range(of: "&#x[0-9a-fA-F]+;", options: .regularExpression) {
            let entity = String(result[range])
            let hex = entity.dropFirst(3).dropLast()
            if let code = UInt32(hex, radix: 16), let scalar = Unicode.Scalar(code) {
                result.replaceSubrange(range, with: String(scalar))
            } else {
                result.replaceSubrange(range, with: "")
            }
        }
        // &#decimal;
        while let range = result.range(of: "&#\\d+;", options: .regularExpression) {
            let entity = String(result[range])
            let digits = entity.dropFirst(2).dropLast()
            if let code = UInt32(digits), let scalar = Unicode.Scalar(code) {
                result.replaceSubrange(range, with: String(scalar))
            } else {
                result.replaceSubrange(range, with: "")
            }
        }
        return result
    }

    // MARK: - Snippet extraction

    private static func previewSnippet(around matchRange: NSRange, query: String, inPlainText ns: NSString, length len: Int) -> String {
        let matchMid = matchRange.location + matchRange.length / 2
        let half = maxPreviewLength / 2

        var windowStart = max(0, matchMid - half)
        var windowEnd = min(len, windowStart + maxPreviewLength)
        if windowEnd - windowStart < maxPreviewLength {
            windowStart = max(0, windowEnd - maxPreviewLength)
        }

        // Ensure the entire match fits inside the window
        if matchRange.location < windowStart {
            windowStart = matchRange.location
            windowEnd = min(len, windowStart + maxPreviewLength)
        }
        let matchEnd = matchRange.location + matchRange.length
        if matchEnd > windowEnd {
            windowEnd = min(len, matchEnd)
            windowStart = max(0, windowEnd - maxPreviewLength)
        }

        var snippet = ns.substring(with: NSRange(location: windowStart, length: windowEnd - windowStart))
        snippet = cleanSnippet(snippet)

        // Safety check: if the query got lost during cleaning, return the raw match with context
        if (snippet as NSString).range(of: query, options: .caseInsensitive).location == NSNotFound {
            let raw = ns.substring(with: matchRange)
            snippet = cleanSnippet(raw)
        }

        if snippet.isEmpty {
            return String(localized: "(empty line)", comment: "Search match preview when line has no visible text")
        }

        if windowStart > 0 { snippet = "…" + snippet }
        if windowEnd < len { snippet = snippet + "…" }
        return snippet
    }

    private static func cleanSnippet(_ raw: String) -> String {
        var s = raw
        s = s.replacingOccurrences(of: "\t", with: " ")
        s = s.replacingOccurrences(of: "\r", with: "")
        s = s.replacingOccurrences(of: "\n", with: " ")
        s = s.replacingOccurrences(of: " {2,}", with: " ", options: .regularExpression)
        s = s.trimmingCharacters(in: .whitespaces)
        return s
    }
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
    var isOfflineResults = false

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
    private let appState: AppState
    private let persistence = PersistenceManager.shared

    init(appState: AppState) {
        self.appState = appState
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }

    func matchLines(for noteId: String) -> [SearchInNoteMatch] {
        matchLinesByNoteIdStorage[noteId] ?? []
    }

    func onQueryChanged() {
        searchTask?.cancel()
        clearMatchExpansionState()
        guard !query.trimmingCharacters(in: .whitespaces).isEmpty else {
            results = []
            hasSearched = false
            isOfflineResults = false
            return
        }

        searchTask = Task {
            try? await Task.sleep(milliseconds: 400)
            guard !Task.isCancelled else { return }
            await performSearch()
        }
    }

    func performSearch() async {
        let trimmed = query.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }

        isSearching = true
        error = nil
        hasSearched = true
        isOfflineResults = false
        clearMatchExpansionState()
        defer { isSearching = false }

        if let client {
            do {
                let response = try await client.searchNotes(query: trimmed, fastSearch: false, includeArchived: false, ancestorNoteId: nil, orderBy: nil, orderDirection: nil, limit: 50)
                guard !Task.isCancelled else { return }
                results = response.results.map(NoteItem.init)

                if let profileId = serverProfileId {
                    try? persistence.recordRecentSearch(query: trimmed, serverProfileId: profileId)
                    loadRecentSearches()
                }
            } catch {
                guard !Task.isCancelled else { return }
                let apiError = APIError.from(error)
                if case .cancelled = apiError { return }

                self.error = apiError.localizedDescription
                Log.api.error("Search failed: \(error)")

                // Fall back to local title search
                performOfflineSearch(trimmed)
            }
        } else {
            performOfflineSearch(trimmed)
        }
    }

    private func performOfflineSearch(_ query: String) {
        guard let profileId = serverProfileId else { return }
        let lowered = query.lowercased()
        do {
            let allNotes = try persistence.context.fetch(
                FetchDescriptor<CachedNote>(
                    predicate: #Predicate<CachedNote> { $0.serverProfileId == profileId }
                )
            )
            let matched = allNotes
                .filter { $0.title.lowercased().contains(lowered) }
                .prefix(30)
                .map { cached in
                    NoteItem(
                        noteId: cached.noteId,
                        title: cached.title,
                        type: NoteType(rawValue: cached.noteType) ?? .text,
                        mime: cached.mime,
                        isProtected: cached.isProtected,
                        dateCreated: "",
                        dateModified: "",
                        parentNoteIds: cached.parentNoteIds,
                        childNoteIds: cached.childNoteIds,
                        parentBranchIds: cached.parentBranchIds,
                        childBranchIds: cached.childBranchIds,
                        attributes: []
                    )
                }
            results = Array(matched)
            isOfflineResults = true
        } catch {
            Log.persistence.error("Offline search failed: \(error)")
        }
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
        searchTask?.cancel()
        Task { await performSearch() }
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
        hasSearched = false
        isOfflineResults = false
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
        if let client {
            do {
                let data = try await client.getNoteContent(note.noteId)
                guard !Task.isCancelled else { return }
                raw = String(data: data, encoding: .utf8)
            } catch {
                guard !Task.isCancelled else { return }
                Log.api.error("Search match preview: getNoteContent failed: \(error)")
                raw = nil
            }
        }

        if raw == nil, let profileId = serverProfileId {
            if let cached = try? persistence.fetchCachedNote(id: note.noteId, serverProfileId: profileId),
               let data = cached.content,
               let s = String(data: data, encoding: .utf8) {
                raw = s
            }
        }

        guard matchLoadStillValid(generation: generation, trimmedQuery: trimmed) else { return }

        guard let content = raw, !content.isEmpty else {
            guard matchLoadStillValid(generation: generation, trimmedQuery: trimmed) else { return }
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

    private func matchLoadStillValid(generation: Int, trimmedQuery: String) -> Bool {
        generation == matchLinesLoadGeneration
            && query.trimmingCharacters(in: .whitespaces) == trimmedQuery
    }
}
