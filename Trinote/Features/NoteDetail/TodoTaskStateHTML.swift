import Foundation

/// Sets a to-do item's task state in stored text-note HTML, as Trilium's editor writes it:
/// `<li data-trilium-task-state="doing" title="Doing">…<input type="checkbox" disabled="disabled">…`, with the
/// checkbox `checked` when the state counts as completed. None and Done carry no attribute (only `checked`).
///
/// Items are found by checkbox, in document order, leaving out the ones inside included-note cards
/// (`.trinote-include`), which is how the read-only page numbers them.
enum TodoTaskStateHTML {
    /// The note with the `index`-th checkbox's item set to `state`; nil when there is no such checkbox or nothing
    /// changes. `title` is the state's display name (the tooltip Trilium stores); ignored for None and Done.
    static func settingState(
        _ state: String,
        isCompleted: Bool,
        title: String?,
        checkboxIndex index: Int,
        in html: String
    ) -> String? {
        let ns = html as NSString
        let checkboxes = interactiveCheckboxRanges(in: html)
        guard index >= 0, index < checkboxes.count else { return nil }
        let checkbox = checkboxes[index]

        let newInput = settingChecked(isCompleted, inInputTag: ns.substring(with: checkbox))
        var result = ns.replacingCharacters(in: checkbox, with: newInput) as NSString

        if let li = owningListItem(ofLocation: checkbox.location, in: html) {
            // The `<li>` opens before the checkbox, so its range is unchanged by the input edit above.
            let openRange = NSRange(location: li.openStart, length: li.openEnd - li.openStart)
            let newOpen = settingState(state, title: title, inListItemTag: result.substring(with: openRange))
            result = result.replacingCharacters(in: openRange, with: newOpen) as NSString
        }

        let updated = result as String
        return updated == html ? nil : updated
    }

    // MARK: - Pieces

    private static let checkboxPattern = try! NSRegularExpression(
        pattern: #"<input\b[^>]*\btype\s*=\s*["']?checkbox["']?[^>]*>"#,
        options: .caseInsensitive
    )

    private static let checkedAttributePattern = try! NSRegularExpression(
        pattern: #"\s+checked(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s/>]+))?(?=[\s/>])"#,
        options: .caseInsensitive
    )

    private static let stateAttributePattern = try! NSRegularExpression(
        pattern: #"\s+(?:data-trilium-task-state|title)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)"#,
        options: .caseInsensitive
    )

    /// Checkbox ranges in document order, without those inside included-note cards.
    static func interactiveCheckboxRanges(in html: String) -> [NSRange] {
        let ns = html as NSString
        let matches = checkboxPattern.matches(in: html, range: NSRange(location: 0, length: ns.length))
        guard !matches.isEmpty else { return [] }
        let includes = includeRanges(in: html)
        return matches.map(\.range).filter { range in
            !includes.contains { NSLocationInRange(range.location, $0) }
        }
    }

    private static func includeRanges(in html: String) -> [NSRange] {
        guard html.range(of: "trinote-include", options: .caseInsensitive) != nil else { return [] }
        let ns = html as NSString
        return HTMLTodoListReorder.findAllElements(in: html, tag: "section")
            .filter { element in
                ns.substring(with: NSRange(location: element.openStart, length: element.openEnd - element.openStart))
                    .range(of: "trinote-include", options: .caseInsensitive) != nil
            }
            .map { NSRange(location: $0.openStart, length: $0.closeEnd - $0.openStart) }
    }

    /// The innermost `<li>` holding `location`.
    private static func owningListItem(ofLocation location: Int, in html: String) -> HTMLTodoListReorder.ElementRange? {
        HTMLTodoListReorder.findAllElements(in: html, tag: "li")
            .filter { $0.openEnd <= location && location < $0.closeStart }
            .max { $0.openStart < $1.openStart }
    }

    static func settingChecked(_ checked: Bool, inInputTag tag: String) -> String {
        let ns = tag as NSString
        let stripped = checkedAttributePattern.stringByReplacingMatches(
            in: tag, range: NSRange(location: 0, length: ns.length), withTemplate: ""
        )
        guard checked else { return stripped }
        let selfClosing = stripped.hasSuffix("/>")
        var base = String(stripped.dropLast(selfClosing ? 2 : 1))
        while base.last?.isWhitespace == true { base.removeLast() }
        return base + " checked=\"checked\"" + (selfClosing ? " />" : ">")
    }

    static func settingState(_ state: String, title: String?, inListItemTag tag: String) -> String {
        let ns = tag as NSString
        let stripped = stateAttributePattern.stringByReplacingMatches(
            in: tag, range: NSRange(location: 0, length: ns.length), withTemplate: ""
        )
        guard !TaskStateCatalog.isAnchor(state), stripped.lowercased().hasPrefix("<li") else { return stripped }
        var attributes = " data-trilium-task-state=\"\(escapeAttribute(state))\""
        if let title, !title.isEmpty { attributes += " title=\"\(escapeAttribute(title))\"" }
        var out = stripped
        out.insert(contentsOf: attributes, at: out.index(out.startIndex, offsetBy: 3))
        return out
    }

    private static func escapeAttribute(_ value: String) -> String {
        value
            .replacingOccurrences(of: "&", with: "&amp;")
            .replacingOccurrences(of: "\"", with: "&quot;")
            .replacingOccurrences(of: "<", with: "&lt;")
            .replacingOccurrences(of: ">", with: "&gt;")
    }
}
