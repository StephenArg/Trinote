import Foundation

/// Converts Markdown into TipTap/CK-friendly HTML for text notes.
/// Coverage targets common markdown-it demo constructs that map cleanly to editor HTML.
enum MarkdownToNoteHTML {
    /// Controls preview-only extras that must not change share-import HTML.
    struct Options: Equatable {
        /// Turn ` ```mermaid ` fences into `<div class="mermaid">` for HTMLNoteView’s inline renderer.
        var mermaidFencesAsDiagrams = false
        /// Parse GFM / Trilium task items (`[ ]`/`[x]`/`[/]`/`[?]`/`[-]`) into `ul.todo-list` markup.
        var taskLists = false

        static let noteImport = Options()
        static let preview = Options(mermaidFencesAsDiagrams: true, taskLists: true)
    }

    /// Cycle order for interactive Markdown todos: `[ ]` → `[x]` → `[/]` → `[?]` → `[-]` → `[ ]`.
    static let taskStateCycleMarkers: [Character] = [" ", "x", "/", "?", "-"]

    /// Advances the `index`-th unordered task marker (`- [ ]` / `- [x]` / …) one step in
    /// ``taskStateCycleMarkers``. Returns `nil` when `index` is out of range.
    static func cyclingTaskState(in markdown: String, at index: Int) -> String? {
        guard index >= 0 else { return nil }
        let pattern = try! NSRegularExpression(
            pattern: #"(?m)^([ \t]*[-*+][ \t]+)\[([ Xx/\?-])\]"#
        )
        let ns = markdown as NSString
        let matches = pattern.matches(in: markdown, range: NSRange(location: 0, length: ns.length))
        guard index < matches.count else { return nil }
        let midRange = matches[index].range(at: 2)
        guard midRange.location != NSNotFound, midRange.length == 1 else { return nil }
        let current = ns.substring(with: midRange)
        let next = nextTaskStateMarker(current)
        return ns.replacingCharacters(in: midRange, with: String(next))
    }

    /// True when `a` and `b` are identical after normalizing GFM/Trilium task markers to `[ ]`.
    /// Used to skip Markdown→HTML reconvert (and WebView reload) on checkbox state cycles.
    static func equalsIgnoringTaskMarkers(_ a: String, _ b: String) -> Bool {
        if a == b { return true }
        return normalizingTaskMarkers(a) == normalizingTaskMarkers(b)
    }

    private static func normalizingTaskMarkers(_ markdown: String) -> String {
        let pattern = try! NSRegularExpression(pattern: #"\[([ Xx/\?-])\]"#)
        let ns = markdown as NSString
        return pattern.stringByReplacingMatches(
            in: markdown,
            range: NSRange(location: 0, length: ns.length),
            withTemplate: "[ ]"
        )
    }

    private static func nextTaskStateMarker(_ current: String) -> Character {
        let ch = current.first ?? " "
        let normalized: Character = (ch == "X") ? "x" : ch
        if let i = taskStateCycleMarkers.firstIndex(of: normalized) {
            return taskStateCycleMarkers[(i + 1) % taskStateCycleMarkers.count]
        }
        return "x"
    }

    static func convert(_ markdown: String, options: Options = .noteImport) -> String {
        let normalized = markdown
            .replacingOccurrences(of: "\r\n", with: "\n")
            .replacingOccurrences(of: "\r", with: "\n")
        var lines = normalized.split(separator: "\n", omittingEmptySubsequences: false).map(String.init)

        var linkRefs: [String: (url: String, title: String?)] = [:]
        var footnoteDefs: [String: String] = [:]
        var abbrDefs: [String: String] = [:]
        extractDefinitions(from: &lines, linkRefs: &linkRefs, footnoteDefs: &footnoteDefs, abbrDefs: &abbrDefs)

        let ctx = InlineContext(linkRefs: linkRefs, footnoteDefs: footnoteDefs, abbrDefs: abbrDefs)
        var html: [String] = []
        var i = 0
        var paragraphLines: [String] = []
        var openListStack: [ListFrame] = []

        func flushParagraph() {
            guard !paragraphLines.isEmpty else { return }
            var rendered = ""
            for i in 0..<paragraphLines.count {
                let raw = paragraphLines[i]
                let text = Self.paragraphLineContent(raw)
                if i > 0 {
                    // CommonMark hard break: previous line ended with two spaces or a backslash.
                    rendered += Self.hasTrailingHardBreak(paragraphLines[i - 1]) ? "<br>" : " "
                }
                rendered += renderInline(text, ctx: ctx)
            }
            html.append("<p>\(rendered)</p>")
            paragraphLines.removeAll()
        }

        func closeLists(downTo depth: Int = 0) {
            while openListStack.count > depth {
                let frame = openListStack.removeLast()
                html.append("</li></\(frame.tag)>")
            }
        }

        func flushAllLists() {
            closeLists(downTo: 0)
        }

        func openListMarkup(tag: String, startAttr: String, isTodoList: Bool) -> String {
            if isTodoList {
                return "<ul class=\"todo-list\">"
            }
            return "<\(tag)\(startAttr)>"
        }

        while i < lines.count {
            let line = lines[i]
            let trimmed = line.trimmingCharacters(in: .whitespaces)

            // Fenced code
            if trimmed.hasPrefix("```") || trimmed.hasPrefix("~~~") {
                flushParagraph()
                flushAllLists()
                let fenceChar = trimmed.first!
                let fence = String(trimmed.prefix(while: { $0 == fenceChar }))
                let lang = String(trimmed.dropFirst(fence.count)).trimmingCharacters(in: .whitespaces)
                i += 1
                var codeLines: [String] = []
                while i < lines.count {
                    let close = lines[i].trimmingCharacters(in: .whitespaces)
                    if close.hasPrefix(fence) { i += 1; break }
                    codeLines.append(lines[i])
                    i += 1
                }
                let code = codeLines.map(escapeHTML).joined(separator: "\n")
                let langKey = lang.split(whereSeparator: { $0.isWhitespace }).first.map(String.init) ?? lang
                if options.mermaidFencesAsDiagrams, langKey.lowercased() == "mermaid" {
                    // Exact class="mermaid" so HTMLNoteView’s detector injects vendor/mermaid.min.js.
                    html.append("<div class=\"mermaid\">\(code)</div>")
                } else if lang.isEmpty {
                    html.append("<pre><code>\(code)</code></pre>")
                } else {
                    let safeLang = escapeAttribute(lang)
                    html.append("<pre><code class=\"language-\(safeLang)\">\(code)</code></pre>")
                }
                continue
            }

            // Indented code block (4 spaces / tab), not a nested list continuation
            if isIndentedCodeLine(line), openListStack.isEmpty,
               paragraphLines.isEmpty || looksLikeIndentedCodeStart(line) {
                flushParagraph()
                flushAllLists()
                var codeLines: [String] = []
                while i < lines.count, isIndentedCodeLine(lines[i]) || (lines[i].trimmingCharacters(in: .whitespaces).isEmpty && i + 1 < lines.count && isIndentedCodeLine(lines[i + 1])) {
                    if lines[i].trimmingCharacters(in: .whitespaces).isEmpty {
                        codeLines.append("")
                    } else {
                        codeLines.append(stripIndent(lines[i], spaces: 4))
                    }
                    i += 1
                }
                while codeLines.last?.isEmpty == true { codeLines.removeLast() }
                let code = codeLines.map(escapeHTML).joined(separator: "\n")
                html.append("<pre><code>\(code)</code></pre>")
                continue
            }

            // Custom container ::: name
            if trimmed.hasPrefix(":::"), !trimmed.hasPrefix("::::") {
                flushParagraph()
                flushAllLists()
                let name = String(trimmed.dropFirst(3)).trimmingCharacters(in: .whitespaces)
                i += 1
                var bodyLines: [String] = []
                while i < lines.count, !lines[i].trimmingCharacters(in: .whitespaces).hasPrefix(":::") {
                    bodyLines.append(lines[i])
                    i += 1
                }
                if i < lines.count { i += 1 }
                let inner = convert(bodyLines.joined(separator: "\n"), options: options)
                let cls = name.isEmpty ? "container" : escapeAttribute(name)
                html.append("<blockquote class=\"markdown-container markdown-container-\(cls)\">\(inner)</blockquote>")
                continue
            }

            if trimmed.isEmpty {
                flushParagraph()
                flushAllLists()
                i += 1
                continue
            }

            // Horizontal rule
            if isHorizontalRule(trimmed) {
                flushParagraph()
                flushAllLists()
                html.append("<hr>")
                i += 1
                continue
            }

            // ATX heading
            if let heading = matchHeading(trimmed) {
                flushParagraph()
                flushAllLists()
                html.append("<h\(heading.level)>\(renderInline(heading.text, ctx: ctx))</h\(heading.level)>")
                i += 1
                continue
            }

            // Setext heading
            if i + 1 < lines.count, let level = matchSetextUnderline(lines[i + 1]), !trimmed.isEmpty {
                flushParagraph()
                flushAllLists()
                html.append("<h\(level)>\(renderInline(trimmed, ctx: ctx))</h\(level)>")
                i += 2
                continue
            }

            // Table
            if looksLikeTableRow(trimmed), i + 1 < lines.count, isTableSeparator(lines[i + 1].trimmingCharacters(in: .whitespaces)) {
                flushParagraph()
                flushAllLists()
                let (tableHTML, consumed) = parseTable(lines: lines, start: i, ctx: ctx)
                html.append(tableHTML)
                i += consumed
                continue
            }

            // Blockquote
            if trimmed.hasPrefix(">") {
                flushParagraph()
                flushAllLists()
                var quoteLines: [String] = []
                while i < lines.count {
                    let t = lines[i].trimmingCharacters(in: .whitespaces)
                    if t.hasPrefix(">") {
                        quoteLines.append(stripBlockquotePrefix(lines[i]))
                        i += 1
                    } else if t.isEmpty, i + 1 < lines.count,
                              lines[i + 1].trimmingCharacters(in: .whitespaces).hasPrefix(">") {
                        quoteLines.append("")
                        i += 1
                    } else {
                        break
                    }
                }
                let inner = convert(quoteLines.joined(separator: "\n"), options: options)
                html.append("<blockquote>\(inner)</blockquote>")
                continue
            }

            // Definition list (term + optional blank lines + ": definition" / "~ definition")
            if !trimmed.isEmpty {
                var lookAhead = i + 1
                while lookAhead < lines.count, lines[lookAhead].trimmingCharacters(in: .whitespaces).isEmpty {
                    lookAhead += 1
                }
                if lookAhead < lines.count, matchDefinitionStart(lines[lookAhead]) != nil {
                    flushParagraph()
                    flushAllLists()
                    var dl = "<dl>"
                    var j = i
                    while j < lines.count {
                        while j < lines.count, lines[j].trimmingCharacters(in: .whitespaces).isEmpty {
                            j += 1
                        }
                        guard j < lines.count else { break }
                        let termLine = lines[j].trimmingCharacters(in: .whitespaces)
                        if matchDefinitionStart(lines[j]) != nil { break }
                        // Peek for a definition after this term (skip blanks)
                        var defIdx = j + 1
                        while defIdx < lines.count, lines[defIdx].trimmingCharacters(in: .whitespaces).isEmpty {
                            defIdx += 1
                        }
                        guard defIdx < lines.count, matchDefinitionStart(lines[defIdx]) != nil else { break }

                        j = defIdx
                        while j < lines.count, let defText = matchDefinitionStart(lines[j]) {
                            var defParts = [defText]
                            j += 1
                            while j < lines.count {
                                let cont = lines[j]
                                let ct = cont.trimmingCharacters(in: .whitespaces)
                                if ct.isEmpty { break }
                                if matchDefinitionStart(cont) != nil { break }
                                if cont.hasPrefix("    ") || cont.hasPrefix("\t") || cont.hasPrefix(" ") {
                                    defParts.append(ct)
                                    j += 1
                                } else {
                                    break
                                }
                            }
                            dl += "<dt>\(renderInline(termLine, ctx: ctx))</dt>"
                            dl += "<dd>\(renderInline(defParts.joined(separator: " "), ctx: ctx))</dd>"
                        }
                    }
                    dl += "</dl>"
                    if dl != "<dl></dl>" {
                        html.append(dl)
                        i = j
                        continue
                    }
                }
            }

            // Lists (ordered / unordered), including nested via indent
            if var listItem = matchListItem(line) {
                flushParagraph()
                if options.taskLists, !listItem.ordered, let task = matchTaskListMarker(listItem.text) {
                    listItem.taskState = task.state
                    listItem.text = task.rest
                }
                let depth = listItem.depth
                let isTodoList = listItem.taskState != nil
                // Todo items always live in `<ul class="todo-list">` (CKEditor/TipTap shape).
                let tag = isTodoList ? "ul" : (listItem.ordered ? "ol" : "ul")
                let startAttr: String = {
                    guard listItem.ordered, !isTodoList, let n = listItem.number, n != 1 else { return "" }
                    return " start=\"\(n)\""
                }()
                let openMarkup = openListMarkup(tag: tag, startAttr: startAttr, isTodoList: isTodoList)
                let liOpen = openListItemMarkup(taskState: listItem.taskState)

                if openListStack.isEmpty {
                    html.append("\(openMarkup)\(liOpen)")
                    openListStack.append(ListFrame(tag: tag, depth: depth, isTodoList: isTodoList))
                } else if depth > openListStack.last!.depth {
                    html.append("\(openMarkup)\(liOpen)")
                    openListStack.append(ListFrame(tag: tag, depth: depth, isTodoList: isTodoList))
                } else {
                    while let last = openListStack.last, depth < last.depth {
                        html.append("</li></\(last.tag)>")
                        openListStack.removeLast()
                    }
                    if let last = openListStack.last {
                        if last.tag != tag || last.isTodoList != isTodoList {
                            html.append("</li></\(last.tag)>\(openMarkup)\(liOpen)")
                            openListStack[openListStack.count - 1] = ListFrame(tag: tag, depth: depth, isTodoList: isTodoList)
                        } else {
                            html.append("</li>\(liOpen)")
                        }
                    } else {
                        html.append("\(openMarkup)\(liOpen)")
                        openListStack.append(ListFrame(tag: tag, depth: depth, isTodoList: isTodoList))
                    }
                }

                // Collect continuation lines for this item (indented more than marker, not a new sibling item)
                var itemText = listItem.text
                i += 1
                while i < lines.count {
                    let next = lines[i]
                    let nt = next.trimmingCharacters(in: .whitespaces)
                    if nt.isEmpty { break }
                    // Any list marker (sibling, nested, or outdent) belongs to the outer loop —
                    // never fold nested `- child` lines into the parent item's text.
                    if matchListItem(next) != nil {
                        break
                    }
                    if leadingWhitespaceCount(next) > listItem.markerColumn {
                        itemText += " " + nt
                        i += 1
                        continue
                    }
                    break
                }
                let rendered = renderInline(itemText, ctx: ctx)
                if let state = listItem.taskState {
                    html.append(renderTodoListLabel(state: state, descriptionHTML: rendered))
                } else {
                    html.append(rendered)
                }
                continue
            }

            flushAllLists()
            // Keep trailing spaces / `\` so CommonMark hard line breaks survive flushParagraph.
            paragraphLines.append(Self.stripLeadingWhitespaceOnly(line))
            i += 1
        }

        flushParagraph()
        flushAllLists()

        var body = html.isEmpty ? "<p></p>" : html.joined()

        if !footnoteDefs.isEmpty {
            body += renderFootnotesAppendix(footnoteDefs, ctx: ctx)
        }
        return body
    }

    // MARK: - Definition extraction

    private static func extractDefinitions(
        from lines: inout [String],
        linkRefs: inout [String: (url: String, title: String?)],
        footnoteDefs: inout [String: String],
        abbrDefs: inout [String: String]
    ) {
        var kept: [String] = []
        var i = 0
        while i < lines.count {
            let trimmed = lines[i].trimmingCharacters(in: .whitespaces)

            if let abbr = matchAbbreviationDef(trimmed) {
                abbrDefs[abbr.term] = abbr.meaning
                i += 1
                continue
            }

            if let foot = matchFootnoteDefStart(trimmed) {
                var text = foot.text
                i += 1
                while i < lines.count {
                    let cont = lines[i]
                    if cont.trimmingCharacters(in: .whitespaces).isEmpty { break }
                    if leadingWhitespaceCount(cont) >= 4 || cont.hasPrefix("    ") || cont.hasPrefix("\t") {
                        text += "\n" + cont.trimmingCharacters(in: .whitespaces)
                        i += 1
                    } else if matchFootnoteDefStart(cont.trimmingCharacters(in: .whitespaces)) != nil {
                        break
                    } else if cont.hasPrefix(" ") {
                        text += " " + cont.trimmingCharacters(in: .whitespaces)
                        i += 1
                    } else {
                        break
                    }
                }
                footnoteDefs[foot.id.lowercased()] = text
                continue
            }

            if let link = matchLinkReferenceDef(trimmed) {
                linkRefs[link.id.lowercased()] = (link.url, link.title)
                i += 1
                continue
            }

            kept.append(lines[i])
            i += 1
        }
        lines = kept
    }

    // MARK: - Block matchers

    private struct ListFrame {
        let tag: String
        let depth: Int
        let isTodoList: Bool
    }

    /// Trilium/GFM task-list states. Custom states use `data-trilium-task-state`.
    private enum TaskListState: Equatable {
        case unchecked
        case checked
        case doing
        case maybe
        case cancelled

        var dataAttributeValue: String? {
            switch self {
            case .doing: return "doing"
            case .maybe: return "maybe"
            case .cancelled: return "cancelled"
            case .unchecked, .checked: return nil
            }
        }

        var title: String? {
            switch self {
            case .doing: return "Doing"
            case .maybe: return "Maybe"
            case .cancelled: return "Cancelled"
            case .unchecked, .checked: return nil
            }
        }
    }

    private struct ListItemMatch {
        let ordered: Bool
        let number: Int?
        var text: String
        let depth: Int
        let markerColumn: Int
        /// `nil` = not a task item.
        var taskState: TaskListState? = nil
    }

    private static func openListItemMarkup(taskState: TaskListState?) -> String {
        if let name = taskState?.dataAttributeValue {
            return "<li data-trilium-task-state=\"\(name)\">"
        }
        return "<li>"
    }

    private static func renderTodoListLabel(state: TaskListState, descriptionHTML: String) -> String {
        switch state {
        case .unchecked, .checked:
            let checkedAttr = state == .checked ? " checked" : ""
            let checkedClass = state == .checked ? " todo-list__label--checked" : ""
            // `disabled` until interactive JS enables them (text notes / Markdown cycle mode).
            return "<label class=\"todo-list__label\(checkedClass)\">"
                + "<input type=\"checkbox\"\(checkedAttr) disabled>"
                + "<span class=\"todo-list__label__description\">\(descriptionHTML)</span>"
                + "</label>"
        case .doing, .maybe, .cancelled:
            let name = state.dataAttributeValue!
            let title = state.title!
            return "<label class=\"todo-list__label\" title=\"\(title)\">"
                + "<input type=\"checkbox\" data-trilium-task-state=\"\(name)\" disabled title=\"\(title)\">"
                + "<span class=\"todo-list__label__description\">\(descriptionHTML)</span>"
                + "</label>"
        }
    }

    private static func matchHeading(_ line: String) -> (level: Int, text: String)? {
        guard line.hasPrefix("#") else { return nil }
        var level = 0
        for ch in line {
            if ch == "#" { level += 1 } else { break }
        }
        guard level >= 1, level <= 6 else { return nil }
        let rest = line.dropFirst(level)
        guard rest.first == " " || rest.isEmpty else { return nil }
        var text = String(rest.drop(while: { $0 == " " }))
        while text.hasSuffix("#") {
            text = String(text.dropLast()).trimmingCharacters(in: .whitespaces)
        }
        return (level, text)
    }

    private static func matchSetextUnderline(_ line: String) -> Int? {
        let t = line.trimmingCharacters(in: .whitespaces)
        guard !t.isEmpty else { return nil }
        if t.allSatisfy({ $0 == "=" }) { return 1 }
        if t.allSatisfy({ $0 == "-" }) && t.count >= 2 { return 2 }
        return nil
    }

    private static func isHorizontalRule(_ line: String) -> Bool {
        let t = line.replacingOccurrences(of: " ", with: "")
        guard t.count >= 3 else { return false }
        return t.allSatisfy({ $0 == "-" }) || t.allSatisfy({ $0 == "*" }) || t.allSatisfy({ $0 == "_" })
    }

    /// GFM / Trilium task-list marker: `[ ]` / `[x]` / `[/]` / `[?]` / `[-]`.
    private static func matchTaskListMarker(_ text: String) -> (state: TaskListState, rest: String)? {
        guard text.count >= 3 else { return nil }
        var idx = text.startIndex
        guard text[idx] == "[" else { return nil }
        idx = text.index(after: idx)
        guard idx < text.endIndex else { return nil }
        let mid = text[idx]
        idx = text.index(after: idx)
        guard idx < text.endIndex, text[idx] == "]" else { return nil }
        let state: TaskListState
        switch mid {
        case " ": state = .unchecked
        case "x", "X": state = .checked
        case "/": state = .doing
        case "?": state = .maybe
        case "-": state = .cancelled
        default: return nil
        }
        idx = text.index(after: idx)
        if idx < text.endIndex, text[idx] == " " {
            idx = text.index(after: idx)
        }
        return (state, String(text[idx...]))
    }

    private static func matchListItem(_ line: String) -> ListItemMatch? {
        let ws = leadingWhitespaceCount(line)
        let depth = ws / 2
        let restStart = line.index(line.startIndex, offsetBy: ws)
        let rest = String(line[restStart...])

        if rest.hasPrefix("- ") || rest.hasPrefix("* ") || rest.hasPrefix("+ ") {
            return ListItemMatch(
                ordered: false,
                number: nil,
                text: String(rest.dropFirst(2)),
                depth: depth,
                markerColumn: ws
            )
        }

        var idx = rest.startIndex
        var numStr = ""
        while idx < rest.endIndex, rest[idx].isNumber {
            numStr.append(rest[idx])
            idx = rest.index(after: idx)
        }
        guard !numStr.isEmpty, idx < rest.endIndex, rest[idx] == "." else { return nil }
        idx = rest.index(after: idx)
        guard idx < rest.endIndex, rest[idx] == " " else { return nil }
        idx = rest.index(after: idx)
        return ListItemMatch(
            ordered: true,
            number: Int(numStr),
            text: String(rest[idx...]),
            depth: depth,
            markerColumn: ws
        )
    }

    private static func matchDefinitionStart(_ line: String) -> String? {
        let t = line.trimmingCharacters(in: .whitespaces)
        if t.hasPrefix(":"), t.count > 1 {
            let body = t.dropFirst().trimmingCharacters(in: .whitespaces)
            if !body.isEmpty { return String(body) }
        }
        if t.hasPrefix("~"), !t.hasPrefix("~~"), t.count > 1 {
            let body = t.dropFirst().trimmingCharacters(in: .whitespaces)
            if !body.isEmpty { return String(body) }
        }
        // Indented ": definition"
        if line.hasPrefix(" "), t.hasPrefix(":") {
            let body = t.dropFirst().trimmingCharacters(in: .whitespaces)
            if !body.isEmpty { return String(body) }
        }
        return nil
    }

    private static func stripBlockquotePrefix(_ line: String) -> String {
        var s = line
        if let idx = s.firstIndex(where: { !$0.isWhitespace }) {
            s = String(s[idx...])
        }
        if s.hasPrefix(">") {
            s = String(s.dropFirst())
            if s.hasPrefix(" ") { s = String(s.dropFirst()) }
        }
        return s
    }

    /// Leading indent only — trailing spaces must remain for hard-break detection.
    private static func stripLeadingWhitespaceOnly(_ line: String) -> String {
        String(line.drop(while: { $0 == " " || $0 == "\t" }))
    }

    /// CommonMark hard line break: two or more trailing spaces, or a trailing backslash.
    private static func hasTrailingHardBreak(_ line: String) -> Bool {
        if line.hasSuffix("\\") { return true }
        var n = 0
        for ch in line.reversed() {
            if ch == " " { n += 1 } else { break }
        }
        return n >= 2
    }

    private static func paragraphLineContent(_ line: String) -> String {
        var s = line
        if s.hasSuffix("\\") {
            s = String(s.dropLast())
        } else {
            while s.hasSuffix(" ") { s = String(s.dropLast()) }
        }
        return s.trimmingCharacters(in: .whitespaces)
    }

    private static func isIndentedCodeLine(_ line: String) -> Bool {
        line.hasPrefix("    ") || line.hasPrefix("\t")
    }

    private static func looksLikeIndentedCodeStart(_ line: String) -> Bool {
        isIndentedCodeLine(line)
    }

    private static func stripIndent(_ line: String, spaces: Int) -> String {
        if line.hasPrefix("\t") { return String(line.dropFirst()) }
        var count = 0
        var idx = line.startIndex
        while idx < line.endIndex, count < spaces, line[idx] == " " {
            count += 1
            idx = line.index(after: idx)
        }
        return String(line[idx...])
    }

    private static func leadingWhitespaceCount(_ line: String) -> Int {
        var count = 0
        for ch in line {
            if ch == " " { count += 1 }
            else if ch == "\t" { count += 4 }
            else { break }
        }
        return count
    }

    // MARK: - Tables

    private static func looksLikeTableRow(_ line: String) -> Bool {
        line.contains("|")
    }

    private static func isTableSeparator(_ line: String) -> Bool {
        let t = line.trimmingCharacters(in: .whitespaces)
        guard t.contains("|") || t.contains("-") else { return false }
        let cells = splitTableRow(t)
        guard !cells.isEmpty else { return false }
        return cells.allSatisfy { cell in
            let c = cell.trimmingCharacters(in: .whitespaces)
            guard !c.isEmpty else { return false }
            return c.allSatisfy({ $0 == "-" || $0 == ":" || $0 == " " })
        }
    }

    private static func splitTableRow(_ line: String) -> [String] {
        var s = line.trimmingCharacters(in: .whitespaces)
        if s.hasPrefix("|") { s = String(s.dropFirst()) }
        if s.hasSuffix("|") { s = String(s.dropLast()) }
        return s.split(separator: "|", omittingEmptySubsequences: false).map {
            String($0).trimmingCharacters(in: .whitespaces)
        }
    }

    private static func parseTableAlignments(_ separator: String) -> [String?] {
        splitTableRow(separator).map { cell in
            let c = cell.trimmingCharacters(in: .whitespaces)
            let left = c.hasPrefix(":")
            let right = c.hasSuffix(":")
            if left && right { return "center" }
            if right { return "right" }
            if left { return "left" }
            return nil
        }
    }

    private static func parseTable(lines: [String], start: Int, ctx: InlineContext) -> (String, Int) {
        let header = splitTableRow(lines[start].trimmingCharacters(in: .whitespaces))
        let aligns = parseTableAlignments(lines[start + 1].trimmingCharacters(in: .whitespaces))
        var rowIndex = start + 2
        var bodyRows: [[String]] = []
        while rowIndex < lines.count {
            let t = lines[rowIndex].trimmingCharacters(in: .whitespaces)
            if t.isEmpty || !t.contains("|") { break }
            bodyRows.append(splitTableRow(t))
            rowIndex += 1
        }

        func cell(_ text: String, tag: String, align: String?) -> String {
            let style = align.map { " style=\"text-align:\($0)\"" } ?? ""
            return "<\(tag)\(style)>\(renderInline(text, ctx: ctx))</\(tag)>"
        }

        var html = "<table><thead><tr>"
        for (idx, h) in header.enumerated() {
            html += cell(h, tag: "th", align: idx < aligns.count ? aligns[idx] : nil)
        }
        html += "</tr></thead><tbody>"
        for row in bodyRows {
            html += "<tr>"
            for (idx, c) in row.enumerated() {
                html += cell(c, tag: "td", align: idx < aligns.count ? aligns[idx] : nil)
            }
            html += "</tr>"
        }
        html += "</tbody></table>"
        return (html, rowIndex - start)
    }

    // MARK: - Reference / footnote / abbr defs

    private static func matchLinkReferenceDef(_ line: String) -> (id: String, url: String, title: String?)? {
        // [id]: url "title"
        guard line.hasPrefix("["), let close = line.firstIndex(of: "]") else { return nil }
        let after = line.index(after: close)
        guard after < line.endIndex, line[after] == ":" else { return nil }
        let id = String(line[line.index(after: line.startIndex)..<close])
        var rest = String(line[line.index(after: after)...]).trimmingCharacters(in: .whitespaces)
        guard !rest.isEmpty else { return nil }

        var url = ""
        var title: String?
        if rest.hasPrefix("<"), let end = rest.firstIndex(of: ">") {
            url = String(rest[rest.index(after: rest.startIndex)..<end])
            rest = String(rest[rest.index(after: end)...]).trimmingCharacters(in: .whitespaces)
        } else {
            let parts = rest.split(whereSeparator: { $0.isWhitespace })
            guard let first = parts.first else { return nil }
            url = String(first)
            rest = parts.dropFirst().joined(separator: " ").trimmingCharacters(in: .whitespaces)
        }
        if rest.count >= 2 {
            let q = rest.first!
            if (q == "\"" || q == "'"), rest.last == q {
                title = String(rest.dropFirst().dropLast())
            }
        }
        return (id, url, title)
    }

    private static func matchFootnoteDefStart(_ line: String) -> (id: String, text: String)? {
        // [^id]: text
        guard line.hasPrefix("[^"), let close = line.firstIndex(of: "]") else { return nil }
        let after = line.index(after: close)
        guard after < line.endIndex, line[after] == ":" else { return nil }
        let id = String(line[line.index(line.startIndex, offsetBy: 2)..<close])
        let text = String(line[line.index(after: after)...]).trimmingCharacters(in: .whitespaces)
        return (id, text)
    }

    private static func matchAbbreviationDef(_ line: String) -> (term: String, meaning: String)? {
        // *[HTML]: Hyper Text Markup Language
        guard line.hasPrefix("*[") , let close = line.firstIndex(of: "]") else { return nil }
        let after = line.index(after: close)
        guard after < line.endIndex, line[after] == ":" else { return nil }
        let term = String(line[line.index(line.startIndex, offsetBy: 2)..<close])
        let meaning = String(line[line.index(after: after)...]).trimmingCharacters(in: .whitespaces)
        guard !term.isEmpty, !meaning.isEmpty else { return nil }
        return (term, meaning)
    }

    private static func renderFootnotesAppendix(
        _ defs: [String: String],
        ctx: InlineContext
    ) -> String {
        var html = "<hr><section class=\"footnotes\"><ol>"
        let keys = defs.keys.sorted()
        for key in keys {
            let text = defs[key] ?? ""
            let id = escapeAttribute(key)
            html += "<li id=\"fn-\(id)\">\(renderInline(text, ctx: ctx)) <a href=\"#fnref-\(id)\">↩</a></li>"
        }
        html += "</ol></section>"
        return html
    }

    // MARK: - Inline

    struct InlineContext {
        var linkRefs: [String: (url: String, title: String?)]
        var footnoteDefs: [String: String]
        var abbrDefs: [String: String]
    }

    static func renderInline(_ text: String, ctx: InlineContext = InlineContext(linkRefs: [:], footnoteDefs: [:], abbrDefs: [:])) -> String {
        var result = ""
        var i = text.startIndex

        while i < text.endIndex {
            // Inline code
            if text[i] == "`" {
                if let end = text[i...].dropFirst().firstIndex(of: "`") {
                    let code = text[text.index(after: i)..<end]
                    result += "<code>\(escapeHTML(String(code)))</code>"
                    i = text.index(after: end)
                    continue
                }
            }

            // Images ![alt](url "title") or ![alt][ref]
            if text[i] == "!", text.index(after: i) < text.endIndex, text[text.index(after: i)] == "[" {
                if let img = parseImage(from: text, at: i, ctx: ctx) {
                    result += img.html
                    i = img.endIndex
                    continue
                }
            }

            // Footnote ref [^id] or inline footnote ^[text]
            if text[i] == "[", text.index(after: i) < text.endIndex, text[text.index(after: i)] == "^" {
                if let fn = parseFootnoteRef(from: text, at: i) {
                    let id = escapeAttribute(fn.id)
                    result += "<sup class=\"footnote-ref\"><a href=\"#fn-\(id)\" id=\"fnref-\(id)\">[\(escapeHTML(fn.id))]</a></sup>"
                    i = fn.endIndex
                    continue
                }
            }
            if text[i] == "^", text.index(after: i) < text.endIndex, text[text.index(after: i)] == "[" {
                if let inline = parseInlineFootnote(from: text, at: i) {
                    result += "<sup class=\"footnote-ref\">\(renderInline(inline.text, ctx: ctx))</sup>"
                    i = inline.endIndex
                    continue
                }
            }

            // Links [text](url) / [text][ref] / [text]
            if text[i] == "[", let link = parseLink(from: text, at: i, ctx: ctx) {
                var attrs = "href=\"\(escapeAttribute(link.url))\""
                if let title = link.title, !title.isEmpty {
                    attrs += " title=\"\(escapeAttribute(title))\""
                }
                result += "<a \(attrs)>\(renderInline(link.label, ctx: ctx))</a>"
                i = link.endIndex
                continue
            }

            // Autolink bare URL
            if let auto = parseAutolink(from: text, at: i) {
                result += "<a href=\"\(escapeAttribute(auto.url))\">\(escapeHTML(auto.url))</a>"
                i = auto.endIndex
                continue
            }

            // Emoji :name:
            if text[i] == ":", let emoji = parseEmoji(from: text, at: i) {
                result += emoji.char
                i = emoji.endIndex
                continue
            }

            // Delimited marks
            if let strike = parseDelimited(from: text, at: i, delimiter: "~~", openTag: "s", ctx: ctx) {
                result += strike.html
                i = strike.endIndex
                continue
            }
            if let mark = parseDelimited(from: text, at: i, delimiter: "==", openTag: "mark", ctx: ctx) {
                result += mark.html
                i = mark.endIndex
                continue
            }
            if let ins = parseDelimited(from: text, at: i, delimiter: "++", openTag: "u", ctx: ctx) {
                result += ins.html
                i = ins.endIndex
                continue
            }
            if let strong = parseDelimited(from: text, at: i, delimiter: "**", openTag: "strong", ctx: ctx) {
                result += strong.html
                i = strong.endIndex
                continue
            }
            if let strong = parseDelimited(from: text, at: i, delimiter: "__", openTag: "strong", ctx: ctx) {
                result += strong.html
                i = strong.endIndex
                continue
            }
            if let em = parseDelimited(from: text, at: i, delimiter: "*", openTag: "em", ctx: ctx) {
                result += em.html
                i = em.endIndex
                continue
            }
            if let em = parseDelimited(from: text, at: i, delimiter: "_", openTag: "em", ctx: ctx) {
                result += em.html
                i = em.endIndex
                continue
            }

            // Superscript 19^th^
            if text[i] == "^", let sup = parseWrapped(from: text, at: i, open: "^", close: "^", tag: "sup") {
                result += sup.html
                i = sup.endIndex
                continue
            }
            // Subscript H~2~O (single ~, not ~~)
            if text[i] == "~",
               !(text[i...].hasPrefix("~~")),
               let sub = parseWrapped(from: text, at: i, open: "~", close: "~", tag: "sub") {
                result += sub.html
                i = sub.endIndex
                continue
            }

            // Typographic replacements
            if let typo = matchTypographic(from: text, at: i) {
                result += typo.html
                i = typo.endIndex
                continue
            }

            // Abbreviation wrap for known terms (word boundary)
            if let abbr = matchAbbreviation(from: text, at: i, defs: ctx.abbrDefs) {
                result += "<abbr title=\"\(escapeAttribute(abbr.meaning))\">\(escapeHTML(abbr.term))</abbr>"
                i = abbr.endIndex
                continue
            }

            result += escapeHTML(String(text[i]))
            i = text.index(after: i)
        }
        return result
    }

    // Convenience for tests / simple call sites
    static func renderInline(_ text: String) -> String {
        renderInline(text, ctx: InlineContext(linkRefs: [:], footnoteDefs: [:], abbrDefs: [:]))
    }

    private static func parseDelimited(
        from text: String,
        at start: String.Index,
        delimiter: String,
        openTag: String,
        ctx: InlineContext
    ) -> (html: String, endIndex: String.Index)? {
        guard text[start...].hasPrefix(delimiter) else { return nil }
        let contentStart = text.index(start, offsetBy: delimiter.count)
        guard contentStart < text.endIndex else { return nil }
        var search = contentStart
        while let found = text[search...].range(of: delimiter)?.lowerBound {
            if found == contentStart {
                search = text.index(after: found)
                continue
            }
            let inner = String(text[contentStart..<found])
            guard !inner.isEmpty else { return nil }
            // Don't match across newlines for emphasis
            if inner.contains("\n") { return nil }
            let html = "<\(openTag)>\(renderInline(inner, ctx: ctx))</\(openTag)>"
            return (html, text.index(found, offsetBy: delimiter.count))
        }
        return nil
    }

    private static func parseWrapped(
        from text: String,
        at start: String.Index,
        open: String,
        close: String,
        tag: String
    ) -> (html: String, endIndex: String.Index)? {
        guard text[start...].hasPrefix(open) else { return nil }
        let contentStart = text.index(start, offsetBy: open.count)
        guard contentStart < text.endIndex else { return nil }
        guard let found = text[contentStart...].range(of: close)?.lowerBound, found != contentStart else { return nil }
        let inner = String(text[contentStart..<found])
        guard !inner.isEmpty, !inner.contains(" ") else { return nil }
        return ("<\(tag)>\(escapeHTML(inner))</\(tag)>", text.index(found, offsetBy: close.count))
    }

    private static func parseLink(
        from text: String,
        at start: String.Index,
        ctx: InlineContext
    ) -> (label: String, url: String, title: String?, endIndex: String.Index)? {
        guard text[start] == "[" else { return nil }
        guard let labelEnd = findBalancedClose(in: text, open: start, openChar: "[", closeChar: "]") else { return nil }
        let label = String(text[text.index(after: start)..<labelEnd])
        let afterLabel = text.index(after: labelEnd)

        // Inline (url "title")
        if afterLabel < text.endIndex, text[afterLabel] == "(" {
            guard let closeParen = findBalancedClose(in: text, open: afterLabel, openChar: "(", closeChar: ")") else { return nil }
            let inside = String(text[text.index(after: afterLabel)..<closeParen]).trimmingCharacters(in: .whitespaces)
            let (url, title) = splitURLAndTitle(inside)
            guard !url.isEmpty else { return nil }
            return (label, url, title, text.index(after: closeParen))
        }

        // Reference [label][id] or [label][]
        if afterLabel < text.endIndex, text[afterLabel] == "[" {
            guard let refEnd = findBalancedClose(in: text, open: afterLabel, openChar: "[", closeChar: "]") else { return nil }
            var refId = String(text[text.index(after: afterLabel)..<refEnd])
            if refId.isEmpty { refId = label }
            if let ref = ctx.linkRefs[refId.lowercased()] {
                return (label, ref.url, ref.title, text.index(after: refEnd))
            }
            return nil
        }

        // Shortcut reference [label]
        if let ref = ctx.linkRefs[label.lowercased()] {
            return (label, ref.url, ref.title, afterLabel)
        }
        return nil
    }

    private static func parseImage(
        from text: String,
        at start: String.Index,
        ctx: InlineContext
    ) -> (html: String, endIndex: String.Index)? {
        guard text[start] == "!" else { return nil }
        let bracket = text.index(after: start)
        guard bracket < text.endIndex, text[bracket] == "[" else { return nil }
        guard let labelEnd = findBalancedClose(in: text, open: bracket, openChar: "[", closeChar: "]") else { return nil }
        let alt = String(text[text.index(after: bracket)..<labelEnd])
        let afterLabel = text.index(after: labelEnd)

        func figure(src: String, title: String?) -> String {
            var img = "<img src=\"\(escapeAttribute(src))\" alt=\"\(escapeAttribute(alt))\""
            if let title, !title.isEmpty {
                img += " title=\"\(escapeAttribute(title))\""
            }
            img += ">"
            return "<figure class=\"image\">\(img)</figure>"
        }

        if afterLabel < text.endIndex, text[afterLabel] == "(" {
            guard let closeParen = findBalancedClose(in: text, open: afterLabel, openChar: "(", closeChar: ")") else { return nil }
            let inside = String(text[text.index(after: afterLabel)..<closeParen]).trimmingCharacters(in: .whitespaces)
            let (url, title) = splitURLAndTitle(inside)
            guard !url.isEmpty else { return nil }
            return (figure(src: url, title: title), text.index(after: closeParen))
        }

        if afterLabel < text.endIndex, text[afterLabel] == "[" {
            guard let refEnd = findBalancedClose(in: text, open: afterLabel, openChar: "[", closeChar: "]") else { return nil }
            var refId = String(text[text.index(after: afterLabel)..<refEnd])
            if refId.isEmpty { refId = alt }
            if let ref = ctx.linkRefs[refId.lowercased()] {
                return (figure(src: ref.url, title: ref.title), text.index(after: refEnd))
            }
        }
        return nil
    }

    private static func parseFootnoteRef(from text: String, at start: String.Index) -> (id: String, endIndex: String.Index)? {
        guard text[start...].hasPrefix("[^") else { return nil }
        guard let close = text[text.index(start, offsetBy: 2)...].firstIndex(of: "]") else { return nil }
        let id = String(text[text.index(start, offsetBy: 2)..<close])
        guard !id.isEmpty else { return nil }
        return (id, text.index(after: close))
    }

    private static func parseInlineFootnote(from text: String, at start: String.Index) -> (text: String, endIndex: String.Index)? {
        guard text[start...].hasPrefix("^[") else { return nil }
        let open = text.index(after: start)
        guard let close = findBalancedClose(in: text, open: open, openChar: "[", closeChar: "]") else { return nil }
        let inner = String(text[text.index(after: open)..<close])
        return (inner, text.index(after: close))
    }

    private static func parseAutolink(from text: String, at start: String.Index) -> (url: String, endIndex: String.Index)? {
        let rest = text[start...]
        let prefixes = ["https://", "http://"]
        for prefix in prefixes where rest.lowercased().hasPrefix(prefix) {
            var end = start
            while end < text.endIndex {
                let ch = text[end]
                if ch.isWhitespace || ch == ")" || ch == "]" || ch == "<" || ch == ">" || ch == "\"" { break }
                // Trim trailing punctuation
                end = text.index(after: end)
            }
            var url = String(text[start..<end])
            while let last = url.last, ".,;:!?".contains(last) {
                url = String(url.dropLast())
                end = text.index(before: end)
            }
            guard url.count > prefix.count else { return nil }
            return (url, end)
        }
        return nil
    }

    private static func parseEmoji(from text: String, at start: String.Index) -> (char: String, endIndex: String.Index)? {
        guard text[start] == ":" else { return nil }
        let nameStart = text.index(after: start)
        guard let nameEnd = text[nameStart...].firstIndex(of: ":"), nameEnd != nameStart else { return nil }
        let name = String(text[nameStart..<nameEnd])
        guard let emoji = emojiMap[name] else { return nil }
        return (emoji, text.index(after: nameEnd))
    }

    private static func matchTypographic(from text: String, at start: String.Index) -> (html: String, endIndex: String.Index)? {
        let rest = text[start...]
        let replacements: [(String, String)] = [
            ("(c)", "&copy;"), ("(C)", "&copy;"),
            ("(r)", "&reg;"), ("(R)", "&reg;"),
            ("(tm)", "&trade;"), ("(TM)", "&trade;"),
            ("+-", "&plusmn;"),
            ("---", "&mdash;"),
            ("--", "&ndash;"),
            ("...", "&hellip;"),
        ]
        for (needle, entity) in replacements where rest.hasPrefix(needle) {
            return (entity, text.index(start, offsetBy: needle.count))
        }
        // Smart double quotes "..."
        if text[start] == "\"" {
            if let close = text[text.index(after: start)...].firstIndex(of: "\"") {
                let inner = String(text[text.index(after: start)..<close])
                if !inner.contains("\n"), inner.count < 200 {
                    return ("&ldquo;\(escapeHTML(inner))&rdquo;", text.index(after: close))
                }
            }
        }
        return nil
    }

    private static func matchAbbreviation(
        from text: String,
        at start: String.Index,
        defs: [String: String]
    ) -> (term: String, meaning: String, endIndex: String.Index)? {
        guard !defs.isEmpty else { return nil }
        // Prefer longer terms first
        for (term, meaning) in defs.sorted(by: { $0.key.count > $1.key.count }) {
            guard text[start...].hasPrefix(term) else { continue }
            let end = text.index(start, offsetBy: term.count)
            let beforeOK = start == text.startIndex || !text[text.index(before: start)].isLetter
            let afterOK = end == text.endIndex || !text[end].isLetter
            if beforeOK && afterOK {
                return (term, meaning, end)
            }
        }
        return nil
    }

    private static func splitURLAndTitle(_ inside: String) -> (url: String, title: String?) {
        let trimmed = inside.trimmingCharacters(in: .whitespaces)
        guard let qStart = trimmed.firstIndex(where: { $0 == "\"" || $0 == "'" }) else {
            return (trimmed, nil)
        }
        let url = String(trimmed[..<qStart]).trimmingCharacters(in: .whitespaces)
        let q = trimmed[qStart]
        let afterQ = trimmed.index(after: qStart)
        guard let qEnd = trimmed[afterQ...].lastIndex(of: q) else { return (trimmed, nil) }
        let title = String(trimmed[afterQ..<qEnd])
        return (url, title)
    }

    private static func findBalancedClose(
        in text: String,
        open: String.Index,
        openChar: Character,
        closeChar: Character
    ) -> String.Index? {
        guard open < text.endIndex, text[open] == openChar else { return nil }
        var depth = 0
        var i = open
        while i < text.endIndex {
            let ch = text[i]
            if ch == openChar { depth += 1 }
            else if ch == closeChar {
                depth -= 1
                if depth == 0 { return i }
            }
            i = text.index(after: i)
        }
        return nil
    }

    static func escapeHTML(_ text: String) -> String {
        text
            .replacingOccurrences(of: "&", with: "&amp;")
            .replacingOccurrences(of: "<", with: "&lt;")
            .replacingOccurrences(of: ">", with: "&gt;")
            .replacingOccurrences(of: "\"", with: "&quot;")
    }

    private static func escapeAttribute(_ text: String) -> String {
        escapeHTML(text).replacingOccurrences(of: "'", with: "&#39;")
    }

    /// Small emoji shortcode map (markdown-it-emoji subset used in the demo).
    private static let emojiMap: [String: String] = [
        "wink": "😉",
        "cry": "😢",
        "laughing": "😆",
        "yum": "😋",
        "smile": "😄",
        "smiley": "😃",
        "grinning": "😀",
        "blush": "😊",
        "heart": "❤️",
        "thumbsup": "👍",
        "thumbsdown": "👎",
        "fire": "🔥",
        "star": "⭐",
        "check": "✅",
        "x": "❌",
        "warning": "⚠️",
        "rocket": "🚀",
        "tada": "🎉",
    ]
}

/// Escapes plain text and wraps each non-empty paragraph for a text note body.
enum PlainTextToNoteHTML {
    static func convert(_ text: String) -> String {
        let normalized = text.replacingOccurrences(of: "\r\n", with: "\n")
            .replacingOccurrences(of: "\r", with: "\n")
        let paragraphs = normalized
            .components(separatedBy: "\n\n")
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
        if paragraphs.isEmpty {
            let single = normalized.trimmingCharacters(in: .whitespacesAndNewlines)
            if single.isEmpty { return "<p></p>" }
            return "<p>\(MarkdownToNoteHTML.escapeHTML(single).replacingOccurrences(of: "\n", with: "<br>"))</p>"
        }
        return paragraphs.map { para in
            let escaped = MarkdownToNoteHTML.escapeHTML(para).replacingOccurrences(of: "\n", with: "<br>")
            return "<p>\(escaped)</p>"
        }.joined()
    }
}
