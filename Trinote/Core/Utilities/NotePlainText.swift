import Foundation

/// Note bodies as plain text, for search match previews and the offline search index. Thread-safe (no WebKit or
/// `NSAttributedString`), so the index can run it off the main thread.
enum NotePlainText {
    /// Longest text the offline index keeps per note (UTF-16 units); longer notes are indexed up to here.
    static let maxSearchableLength = 1_000_000

    /// Note types whose body is text the offline index can search.
    static func isSearchable(noteType: String) -> Bool {
        switch NoteType(rawValue: noteType) {
        case .text, .code, .markdown, .mermaid: return true
        default: return false
        }
    }

    /// The body as plain text for the offline index, or nil for types it doesn't search and bodies that aren't UTF-8.
    static func searchableText(noteType: String, data: Data) -> String? {
        guard isSearchable(noteType: noteType), !data.isEmpty,
              let raw = String(data: data, encoding: .utf8)
        else { return nil }
        var text = NoteType(rawValue: noteType) == .text ? fromHTML(withoutDataURIs(raw)) : raw
        if text.utf16.count > maxSearchableLength {
            text = String(text.utf16.prefix(maxSearchableLength)) ?? String(text.prefix(maxSearchableLength / 2))
        }
        return text
    }

    /// Lowercased, without accents or width variants, whitespace runs as one space: the index stores text this way
    /// and folds each query term the same way, so "Café" matches "cafe". (SQLite's trigram tokenizer only folds
    /// accents from 3.45, newer than iOS 18's.)
    static func fold(_ text: String) -> String {
        text.folding(options: [.caseInsensitive, .diacriticInsensitive, .widthInsensitive], locale: nil)
            .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
    }

    // MARK: - HTML → plain text

    private static let htmlEntityMap: [String: String] = [
        "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": "\"", "&apos;": "'",
        "&nbsp;": " ", "&ndash;": "–", "&mdash;": "—", "&hellip;": "…",
        "&lsquo;": "\u{2018}", "&rsquo;": "\u{2019}",
        "&ldquo;": "\u{201C}", "&rdquo;": "\u{201D}",
    ]

    /// Inline images and files as `data:` URIs make up most of some bodies and hold no searchable text.
    private static func withoutDataURIs(_ html: String) -> String {
        guard html.containsASCII("data:") else { return html }
        return html
            .replacingOccurrences(of: "\"data:[^\"]*\"", with: "\"\"", options: .regularExpression)
            .replacingOccurrences(of: "'data:[^']*'", with: "''", options: .regularExpression)
    }

    static func fromHTML(_ html: String) -> String {
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

    private static let numericEntityPattern = try? NSRegularExpression(pattern: "&#(?:[xX]([0-9a-fA-F]+)|(\\d+));")

    /// `&#xHEX;` and `&#DEC;` in one pass; an entity that isn't a valid scalar is dropped.
    private static func decodeNumericEntities(_ text: String) -> String {
        guard text.contains("&#"), let pattern = numericEntityPattern else { return text }
        let ns = text as NSString
        var result = ""
        var cursor = 0
        for match in pattern.matches(in: text, range: NSRange(location: 0, length: ns.length)) {
            result += ns.substring(with: NSRange(location: cursor, length: match.range.location - cursor))
            cursor = match.range.location + match.range.length
            let hex = match.range(at: 1)
            let code = hex.location != NSNotFound
                ? UInt32(ns.substring(with: hex), radix: 16)
                : UInt32(ns.substring(with: match.range(at: 2)))
            if let code, let scalar = Unicode.Scalar(code) {
                result.unicodeScalars.append(scalar)
            }
        }
        result += ns.substring(from: cursor)
        return result
    }
}
