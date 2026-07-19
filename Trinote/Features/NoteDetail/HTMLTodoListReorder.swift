import Foundation

/// Reorders sibling `<li>` elements in CKEditor/Trilium `ul` / `ol` lists (including `ul.todo-list`).
///
/// Indices match the read-only WKWebView: document order among list items outside
/// `.trinote-include` previews. Reorder is sibling-only (nested items move with their parent).
enum HTMLTodoListReorder {

    /// Moves the list `<li>` at `fromIndex` so it sits immediately before the `<li>` at
    /// `beforeIndex`. When `beforeIndex` is `nil`, appends after the last sibling.
    /// Returns `nil` when the move is invalid or would not change order.
    static func movingListItem(in html: String, fromIndex: Int, beforeIndex: Int?) -> String? {
        let items = interactiveListItems(in: html)
        guard fromIndex >= 0, fromIndex < items.count else { return nil }
        if let beforeIndex, (beforeIndex < 0 || beforeIndex >= items.count) { return nil }
        if let beforeIndex, beforeIndex == fromIndex { return nil }

        let lis = findAllElements(in: html, tag: "li")
        let lists = findAllElements(in: html, tag: "ul") + findAllElements(in: html, tag: "ol")
        guard !lis.isEmpty else { return nil }

        let fromLI = items[fromIndex]
        guard let parent = directParentList(of: fromLI, lists: lists) else { return nil }

        let siblings = directChildLIs(of: parent, allLIs: lis, allLists: lists)
        guard siblings.count >= 2 else { return nil }

        guard let fromPos = siblings.firstIndex(where: { $0.openStart == fromLI.openStart }) else {
            return nil
        }

        let beforePos: Int
        if let beforeIndex {
            let beforeLI = items[beforeIndex]
            guard let pos = siblings.firstIndex(where: { $0.openStart == beforeLI.openStart }) else {
                return nil
            }
            beforePos = pos
        } else {
            beforePos = siblings.count
        }

        // Already in the requested place (immediately before `beforePos`).
        if fromPos == beforePos || fromPos + 1 == beforePos { return nil }

        var ordered = siblings
        let moving = ordered.remove(at: fromPos)
        let insertAt = fromPos < beforePos ? beforePos - 1 : beforePos
        ordered.insert(moving, at: insertAt)

        let ns = html as NSString
        let replaceStart = siblings[0].openStart
        let replaceEnd = siblings[siblings.count - 1].closeEnd
        let joined = ordered.map { li in
            ns.substring(with: NSRange(location: li.openStart, length: li.closeEnd - li.openStart))
        }.joined()

        return ns.replacingCharacters(
            in: NSRange(location: replaceStart, length: replaceEnd - replaceStart),
            with: joined
        )
    }

    /// Legacy name used by older call sites / tests that targeted todo checkboxes.
    /// For notes that only contain todo items, checkbox order matches list-item order.
    static func movingCheckboxItem(in html: String, fromIndex: Int, beforeIndex: Int?) -> String? {
        movingListItem(in: html, fromIndex: fromIndex, beforeIndex: beforeIndex)
    }

    // MARK: - List item indexing

    /// Document-order `<li>` elements that belong to a `ul`/`ol` and are outside include previews.
    static func interactiveListItems(in html: String) -> [ElementRange] {
        let lis = findAllElements(in: html, tag: "li")
        let lists = findAllElements(in: html, tag: "ul") + findAllElements(in: html, tag: "ol")
        let includeBlocks = includeBlockRanges(in: html)
        return lis.filter { li in
            if includeBlocks.contains(where: { NSLocationInRange(li.openStart, $0) }) {
                return false
            }
            return directParentList(of: li, lists: lists) != nil
        }
    }

    static func interactiveCheckboxRanges(in html: String) -> [NSRange] {
        let ns = html as NSString
        let matches = checkboxPattern.matches(in: html, range: NSRange(location: 0, length: ns.length))
        let includeBlocks = includeBlockRanges(in: html)
        return matches.map(\.range).filter { range in
            !includeBlocks.contains { NSLocationInRange(range.location, $0) }
        }
    }

    private static let checkboxPattern = try! NSRegularExpression(
        pattern: #"<input\s+[^>]*type\s*=\s*["']checkbox["'][^>]*/?\s*>"#,
        options: .caseInsensitive
    )

    private static func includeBlockRanges(in html: String) -> [NSRange] {
        let opens = findAllElements(in: html, tag: "div").filter { el in
            let ns = html as NSString
            let openTag = ns.substring(with: NSRange(location: el.openStart, length: el.openEnd - el.openStart))
            return openTag.range(of: "trinote-include", options: .caseInsensitive) != nil
        }
        return opens.map { NSRange(location: $0.openStart, length: $0.closeEnd - $0.openStart) }
    }

    // MARK: - Element ranges

    struct ElementRange: Equatable {
        let openStart: Int
        let openEnd: Int
        let closeStart: Int
        let closeEnd: Int
    }

    static func findAllElements(in html: String, tag: String) -> [ElementRange] {
        let escaped = NSRegularExpression.escapedPattern(for: tag)
        let openPattern = try! NSRegularExpression(
            pattern: "<\(escaped)\\b[^>]*>",
            options: .caseInsensitive
        )
        let closePattern = try! NSRegularExpression(
            pattern: "</\(escaped)\\s*>",
            options: .caseInsensitive
        )
        let nsLen = (html as NSString).length
        let full = NSRange(location: 0, length: nsLen)

        struct Event {
            enum Kind { case open, close }
            let kind: Kind
            let start: Int
            let end: Int
        }

        var events: [Event] = []
        for m in openPattern.matches(in: html, range: full) {
            events.append(Event(kind: .open, start: m.range.location, end: m.range.location + m.range.length))
        }
        for m in closePattern.matches(in: html, range: full) {
            events.append(Event(kind: .close, start: m.range.location, end: m.range.location + m.range.length))
        }
        events.sort { a, b in
            if a.start != b.start { return a.start < b.start }
            switch (a.kind, b.kind) {
            case (.close, .open): return true
            case (.open, .close): return false
            default: return false
            }
        }

        var stack: [(openStart: Int, openEnd: Int)] = []
        var result: [ElementRange] = []
        for event in events {
            switch event.kind {
            case .open:
                stack.append((event.start, event.end))
            case .close:
                guard let open = stack.popLast() else { continue }
                result.append(ElementRange(
                    openStart: open.openStart,
                    openEnd: open.openEnd,
                    closeStart: event.start,
                    closeEnd: event.end
                ))
            }
        }
        return result.sorted { $0.openStart < $1.openStart }
    }

    private static func directParentList(of li: ElementRange, lists: [ElementRange]) -> ElementRange? {
        lists
            .filter { list in li.openStart >= list.openEnd && li.closeEnd <= list.closeStart }
            .min(by: { ($0.closeEnd - $0.openStart) < ($1.closeEnd - $1.openStart) })
    }

    private static func directChildLIs(
        of list: ElementRange,
        allLIs: [ElementRange],
        allLists: [ElementRange]
    ) -> [ElementRange] {
        allLIs.filter { li in
            guard li.openStart >= list.openEnd && li.closeEnd <= list.closeStart else { return false }
            let insideNestedList = allLists.contains { nested in
                nested.openStart > list.openStart
                    && nested.closeEnd < list.closeEnd
                    && li.openStart >= nested.openEnd
                    && li.closeEnd <= nested.closeStart
            }
            return !insideNestedList
        }
        .sorted { $0.openStart < $1.openStart }
    }
}
