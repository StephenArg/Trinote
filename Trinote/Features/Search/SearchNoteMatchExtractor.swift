import Foundation
import os

/// One occurrence of the search query in a note, with a 1-based index aligned with in-page find (order of matches in plain text).
struct SearchInNoteMatch: Identifiable, Hashable, Sendable {
    var id: Int { matchIndex1Based }
    let matchIndex1Based: Int
    /// Single-line preview; query substring can be highlighted in UI.
    let previewLine: String
}

enum SearchNoteMatchExtractor {
    private static let maxPreviewLength = 200

    static func matches(noteType: NoteType, rawContent: String, searchText: String) -> [SearchInNoteMatch] {
        let trimmed = searchText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return [] }

        let plain: String
        switch noteType {
        case .text:
            plain = NotePlainText.fromHTML(rawContent)
        case .code, .markdown:
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

    /// Preview around the first match of `term` in `plainText`, ignoring case and accents (as offline search matches);
    /// nil when there is none.
    static func firstMatchPreview(inPlainText plainText: String, term: String) -> String? {
        guard !term.isEmpty else { return nil }
        let ns = plainText as NSString
        let r = ns.range(of: term, options: [.caseInsensitive, .diacriticInsensitive, .widthInsensitive])
        guard r.location != NSNotFound else { return nil }
        return previewSnippet(around: r, query: term, inPlainText: ns, length: ns.length)
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
        if (snippet as NSString).range(of: query, options: [.caseInsensitive, .diacriticInsensitive]).location == NSNotFound {
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
