import Foundation

/// A search query as offline search reads it: words and "quoted phrases", each of which must appear in the note's
/// title or body, and `#label` / `#label=value` filters. Trilium's other operators (`~relation`, `note.…`, `or`,
/// parentheses, comparisons, `orderBy`, `limit`) need the server: they're left out and `hasUnsupportedOperators` says so.
struct LocalSearchQuery: Equatable, Sendable {
    struct LabelFilter: Equatable, Sendable {
        let name: String
        /// nil: the note only needs the label.
        let value: String?
    }

    /// Words and phrases as typed (not folded), without duplicates.
    private(set) var terms: [String] = []
    private(set) var labels: [LabelFilter] = []
    private(set) var hasUnsupportedOperators = false

    /// What to highlight in titles and snippets.
    var highlightTerms: [String] { terms }
    var isEmpty: Bool { terms.isEmpty && labels.isEmpty }

    private static let comparisonOperators = ["!=", "*=*", "=*", "*=", "%=", ">=", "<=", "=", ">", "<"]
    private static let labelNameCharacters = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "_:-"))

    init(_ query: String) {
        let tokens = Self.tokenize(query)
        var index = 0
        var seenTerms: Set<String> = []

        /// Skips a spaced-out comparison after a label, relation or property (`#year >= 2020`): the operator and
        /// value tokens. Returns them when there were any.
        func takeSpacedComparison() -> (op: String, value: String)? {
            guard index + 1 < tokens.count, !tokens[index + 1].quoted,
                  Self.comparisonOperators.contains(tokens[index + 1].text) else { return nil }
            let op = tokens[index + 1].text
            let value = index + 2 < tokens.count ? tokens[index + 2].text : ""
            index += min(2, tokens.count - 1 - index)
            return (op, value)
        }

        func addTerm(_ term: String) {
            let trimmed = term.trimmingCharacters(in: .whitespacesAndNewlines)
            guard !trimmed.isEmpty else { return }
            let key = NotePlainText.fold(trimmed)
            guard seenTerms.insert(key).inserted else { return }
            terms.append(trimmed)
        }

        while index < tokens.count {
            defer { index += 1 }
            let token = tokens[index]
            if token.quoted {
                addTerm(token.text)
                continue
            }
            var text = token.text
            if text.contains("(") || text.contains(")") {
                hasUnsupportedOperators = true
                text = text.replacingOccurrences(of: "(", with: "").replacingOccurrences(of: ")", with: "")
                if text.isEmpty { continue }
            }
            let lower = text.lowercased()

            if text.hasPrefix("#") {
                let body = String(text.dropFirst())
                if body.hasPrefix("!") || body.isEmpty {
                    hasUnsupportedOperators = true
                    _ = takeSpacedComparison()
                    continue
                }
                if let (name, op, value) = Self.splitComparison(body) {
                    if op == "=", !value.isEmpty, Self.isLabelName(name) {
                        labels.append(LabelFilter(name: name, value: value))
                    } else {
                        hasUnsupportedOperators = true
                    }
                    continue
                }
                guard Self.isLabelName(body) else {
                    hasUnsupportedOperators = true
                    continue
                }
                if let (op, value) = takeSpacedComparison() {
                    if op == "=", !value.isEmpty {
                        labels.append(LabelFilter(name: body, value: value))
                    } else {
                        hasUnsupportedOperators = true
                    }
                } else {
                    labels.append(LabelFilter(name: body, value: nil))
                }
                continue
            }
            if text.hasPrefix("~") || lower.hasPrefix("note.") {
                hasUnsupportedOperators = true
                if Self.splitComparison(text) == nil { _ = takeSpacedComparison() }
                continue
            }
            if lower == "orderby" || lower == "limit" {
                hasUnsupportedOperators = true
                // The field or count, then an optional direction.
                if index + 1 < tokens.count { index += 1 }
                if index + 1 < tokens.count, ["asc", "desc"].contains(tokens[index + 1].text.lowercased()) { index += 1 }
                continue
            }
            if lower == "or" || lower == "not" || Self.comparisonOperators.contains(text) {
                hasUnsupportedOperators = true
                continue
            }
            // Words must all match anyway.
            if lower == "and" { continue }
            addTerm(text)
        }
    }

    // MARK: - Lexing

    private struct Token {
        var text: String
        /// The whole token was one quoted string: a phrase, never an operator.
        var quoted: Bool
    }

    /// Splits on whitespace outside quotes (`"`, `'` or `` ` ``). Quotes inside a token (`#name="two words"`) keep
    /// its spaces and are dropped from the text.
    private static func tokenize(_ query: String) -> [Token] {
        var tokens: [Token] = []
        var current = ""
        var quote: Character?
        var tokenStartedQuoted = false
        var tokenHasUnquotedText = false

        func flush() {
            if !current.isEmpty || tokenStartedQuoted {
                tokens.append(Token(text: current, quoted: tokenStartedQuoted && !tokenHasUnquotedText))
            }
            current = ""
            tokenStartedQuoted = false
            tokenHasUnquotedText = false
        }

        for character in query {
            if let open = quote {
                if character == open {
                    quote = nil
                } else {
                    current.append(character)
                }
                continue
            }
            if character == "\"" || character == "'" || character == "`" {
                if current.isEmpty && !tokenHasUnquotedText { tokenStartedQuoted = true }
                quote = character
                continue
            }
            if character.isWhitespace {
                flush()
                continue
            }
            tokenHasUnquotedText = true
            current.append(character)
        }
        flush()
        return tokens.filter { !$0.text.isEmpty }
    }

    /// `name<op>value` split at its first comparison operator; nil when there is none.
    private static func splitComparison(_ text: String) -> (name: String, op: String, value: String)? {
        var best: (range: Range<String.Index>, op: String)?
        for op in comparisonOperators {
            guard let range = text.range(of: op) else { continue }
            // The earliest operator wins; at the same spot, the one listed first (`*=*` before `*=`).
            if let found = best, range.lowerBound >= found.range.lowerBound { continue }
            best = (range, op)
        }
        guard let best else { return nil }
        return (String(text[..<best.range.lowerBound]), best.op, String(text[best.range.upperBound...]))
    }

    private static func isLabelName(_ name: String) -> Bool {
        !name.isEmpty && name.unicodeScalars.allSatisfy { labelNameCharacters.contains($0) }
    }
}
