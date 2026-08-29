import Foundation

/// Reorders `<details>` collapsible blocks among their parent’s element children,
/// and toggles the HTML `open` attribute.
///
/// Indices match the read-only WKWebView: document order among `details` elements
/// outside `.trinote-include` previews. Nested collapsibles move among siblings
/// inside their parent body (not across parents). `beforeChildIndex` is the index
/// among the parent’s non-summary element children (scripts/styles excluded).
enum HTMLCollapsibleReorder {

    /// Moves the `details` at `fromIndex` so it sits immediately before the sibling
    /// at `beforeChildIndex`. When `beforeChildIndex` is `nil`, appends after the last sibling.
    /// Returns `nil` when the move is invalid or would not change order.
    static func movingDetails(in html: String, fromIndex: Int, beforeChildIndex: Int?) -> String? {
        let items = interactiveDetails(in: html)
        guard fromIndex >= 0, fromIndex < items.count else { return nil }

        let fromEl = items[fromIndex]
        let all = findAllElements(in: html)
        let parent = innermostParent(of: fromEl, in: all)
        let siblings = directChildSiblings(parent: parent, all: all)
        guard siblings.count >= 2 else { return nil }

        guard let fromPos = siblings.firstIndex(where: { $0.openStart == fromEl.openStart }) else {
            return nil
        }

        let beforePos: Int
        if let beforeChildIndex {
            guard beforeChildIndex >= 0, beforeChildIndex < siblings.count else { return nil }
            beforePos = beforeChildIndex
        } else {
            beforePos = siblings.count
        }

        if fromPos == beforePos || fromPos + 1 == beforePos { return nil }

        var ordered = siblings
        let moving = ordered.remove(at: fromPos)
        let insertAt = fromPos < beforePos ? beforePos - 1 : beforePos
        ordered.insert(moving, at: insertAt)

        let ns = html as NSString
        let replaceStart = siblings[0].openStart
        let replaceEnd = siblings[siblings.count - 1].closeEnd
        let joined = ordered.map { el in
            ns.substring(with: NSRange(location: el.openStart, length: el.closeEnd - el.openStart))
        }.joined()

        return ns.replacingCharacters(
            in: NSRange(location: replaceStart, length: replaceEnd - replaceStart),
            with: joined
        )
    }

    /// Adds or removes the `open` attribute on the `index`-th interactive `<details>`.
    /// Returns `nil` when the index is invalid or the attribute is already in the requested state.
    static func settingOpen(in html: String, index: Int, open: Bool) -> String? {
        let items = interactiveDetails(in: html)
        guard index >= 0, index < items.count else { return nil }
        let el = items[index]
        let ns = html as NSString
        let openTag = ns.substring(with: NSRange(location: el.openStart, length: el.openEnd - el.openStart))
        let hasOpen = openAttributePresent(in: openTag)
        if hasOpen == open { return nil }
        let newTag: String
        if open {
            newTag = insertingOpenAttribute(in: openTag)
        } else {
            newTag = removingOpenAttribute(in: openTag)
        }
        guard newTag != openTag else { return nil }
        return ns.replacingCharacters(
            in: NSRange(location: el.openStart, length: el.openEnd - el.openStart),
            with: newTag
        )
    }

    /// Document-order `<details>` elements outside include-note previews.
    static func interactiveDetails(in html: String) -> [ElementRange] {
        let includeBlocks = includeBlockRanges(in: html)
        return findAllElements(in: html).filter { el in
            guard el.tag == "details" else { return false }
            return !includeBlocks.contains(where: { NSLocationInRange(el.openStart, $0) })
        }
    }

    // MARK: - Element ranges

    struct ElementRange: Equatable {
        let tag: String
        let openStart: Int
        let openEnd: Int
        let closeStart: Int
        let closeEnd: Int
    }

    private static let voidTags: Set<String> = [
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"
    ]

    private static let skippedSiblingTags: Set<String> = [
        "summary", "script", "style", "link", "meta"
    ]

    private static let tokenPattern = try! NSRegularExpression(
        pattern: #"<!--[\s\S]*?-->|</([A-Za-z][\w:-]*)\s*>|<([A-Za-z][\w:-]*)(\s[^>]*?)?(/)?>"#,
        options: []
    )

    private static let openAttributePattern = try! NSRegularExpression(
        pattern: #"\sopen(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?"#,
        options: [.caseInsensitive]
    )

    static func findAllElements(in html: String) -> [ElementRange] {
        let nsLen = (html as NSString).length
        let full = NSRange(location: 0, length: nsLen)
        let matches = tokenPattern.matches(in: html, range: full)

        var stack: [(tag: String, openStart: Int, openEnd: Int)] = []
        var result: [ElementRange] = []

        for m in matches {
            let loc = m.range.location
            let end = loc + m.range.length
            let ns = html as NSString
            let token = ns.substring(with: m.range)
            if token.hasPrefix("<!--") { continue }

            if m.range(at: 1).location != NSNotFound {
                let tag = ns.substring(with: m.range(at: 1)).lowercased()
                var matched: (tag: String, openStart: Int, openEnd: Int)?
                while let last = stack.last {
                    stack.removeLast()
                    if last.tag == tag {
                        matched = last
                        break
                    }
                }
                guard let open = matched else { continue }
                result.append(ElementRange(
                    tag: tag,
                    openStart: open.openStart,
                    openEnd: open.openEnd,
                    closeStart: loc,
                    closeEnd: end
                ))
                continue
            }

            guard m.range(at: 2).location != NSNotFound else { continue }
            let tag = ns.substring(with: m.range(at: 2)).lowercased()
            let selfClosing = m.range(at: 4).location != NSNotFound
            if selfClosing || voidTags.contains(tag) {
                result.append(ElementRange(
                    tag: tag,
                    openStart: loc,
                    openEnd: end,
                    closeStart: loc,
                    closeEnd: end
                ))
            } else {
                stack.append((tag, loc, end))
            }
        }
        return result.sorted { $0.openStart < $1.openStart }
    }

    private static func includeBlockRanges(in html: String) -> [NSRange] {
        findAllElements(in: html).filter { el in
            guard el.tag == "div" else { return false }
            let ns = html as NSString
            let openTag = ns.substring(with: NSRange(location: el.openStart, length: el.openEnd - el.openStart))
            return openTag.range(of: "trinote-include", options: .caseInsensitive) != nil
        }
        .map { NSRange(location: $0.openStart, length: $0.closeEnd - $0.openStart) }
    }

    private static func innermostParent(of el: ElementRange, in all: [ElementRange]) -> ElementRange? {
        all
            .filter { outer in
                outer.openStart != el.openStart
                    && el.openStart >= outer.openEnd
                    && el.closeEnd <= outer.closeStart
            }
            .min(by: { ($0.closeEnd - $0.openStart) < ($1.closeEnd - $1.openStart) })
    }

    private static func directChildSiblings(
        parent: ElementRange?,
        all: [ElementRange]
    ) -> [ElementRange] {
        let candidates: [ElementRange]
        if let parent {
            candidates = all.filter { child in
                child.openStart >= parent.openEnd && child.closeEnd <= parent.closeStart
            }
        } else {
            candidates = all.filter { child in
                innermostParent(of: child, in: all) == nil
            }
        }
        let direct = candidates.filter { child in
            !candidates.contains { mid in
                mid.openStart != child.openStart
                    && child.openStart >= mid.openEnd
                    && child.closeEnd <= mid.closeStart
            }
        }
        return direct
            .filter { !skippedSiblingTags.contains($0.tag) }
            .sorted { $0.openStart < $1.openStart }
    }

    private static func openAttributePresent(in openTag: String) -> Bool {
        openAttributePattern.firstMatch(
            in: openTag,
            range: NSRange(location: 0, length: (openTag as NSString).length)
        ) != nil
    }

    private static func insertingOpenAttribute(in openTag: String) -> String {
        guard let gt = openTag.lastIndex(of: ">") else { return openTag }
        var prefix = String(openTag[..<gt])
        if prefix.hasSuffix("/") {
            prefix.removeLast()
            return prefix + " open />"
        }
        return prefix + " open>"
    }

    private static func removingOpenAttribute(in openTag: String) -> String {
        let ns = openTag as NSString
        let full = NSRange(location: 0, length: ns.length)
        return openAttributePattern.stringByReplacingMatches(
            in: openTag,
            range: full,
            withTemplate: ""
        )
    }
}
