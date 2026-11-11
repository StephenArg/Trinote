import Foundation

/// What one embed in a note's stored HTML says about itself, for its menu.
struct ContentEmbedState: Equatable, Sendable {
    let markup: ContentEmbedMarkup
    /// `data-box-size` as stored, which on servers before Trilium v0.107 is one of the older sizes.
    let storedBoxSize: String?
    let isEditable: Bool
}

/// Changes one embed in a note's stored HTML, found by its order among the note's embeds, following what Trilium's
/// embed commands do (`content_embed.ts`). Only that embed's markup changes.
enum ContentEmbedEdit {
    enum Change: Equatable, Sendable {
        case size(String)
        /// The size a new embed of this content starts with, without a resized width or height.
        case defaultSize(String)
        /// `nil` is centered.
        case position(String?)
        case showTitle(Bool)
        /// Plain text; `nil` removes the caption.
        case caption(String?)
        case editable(Bool)
        case delete
        case convertToLink(title: String)
    }

    static func state(ofEmbedAt index: Int, in html: String) -> ContentEmbedState? {
        guard let block = IncludeNoteResolver.embedBlock(at: index, in: html) else { return nil }
        return ContentEmbedState(
            markup: ContentEmbedMarkup(openTag: block.openTag, innerHTML: block.innerHTML),
            storedBoxSize: ContentEmbedMarkup.attribute("data-box-size", in: block.openTag),
            isEditable: ContentEmbedMarkup.attribute("data-editable", in: block.openTag) == "true"
        )
    }

    /// `html` with every excerpt of `noteId` that points at the range `from` pointing at `to`, and nothing else touched.
    static func movingExcerpts(of noteId: String, from: String, to: String, in html: String) -> String {
        var result = html
        var index = 0
        while let block = IncludeNoteResolver.embedBlock(at: index, in: result) {
            index += 1
            let markup = ContentEmbedMarkup(openTag: block.openTag, innerHTML: block.innerHTML)
            guard markup.noteId == noteId, markup.block == from else { continue }
            let tagEnd = result.index(block.fullRange.lowerBound, offsetBy: block.openTag.count)
            result.replaceSubrange(block.fullRange.lowerBound..<tagEnd, with: settingAttribute("data-block", to: to, in: block.openTag))
        }
        return result
    }

    /// The HTML with the change made, or `nil` when there's no such embed.
    static func applying(_ change: Change, toEmbedAt index: Int, in html: String) -> String? {
        guard let block = IncludeNoteResolver.embedBlock(at: index, in: html) else { return nil }
        let replacement: String
        switch change {
        case .delete:
            replacement = ""
        case .convertToLink(let title):
            let markup = ContentEmbedMarkup(openTag: block.openTag, innerHTML: block.innerHTML)
            guard let noteId = markup.noteId else { return nil }
            let query = markup.block.map { "?block=" + encodedBlockParameter($0) } ?? ""
            replacement = "<p><a class=\"reference-link\" href=\"#root/\(noteId)\(query)\">\(IncludeNoteResolver.escapeHTML(title))</a></p>"
        default:
            replacement = editedEmbed(block, change: change)
        }
        var result = html
        result.replaceSubrange(block.fullRange, with: replacement)
        return result
    }

    private static func editedEmbed(_ block: IncludeNoteResolver.IncludeBlock, change: Change) -> String {
        let markup = ContentEmbedMarkup(openTag: block.openTag, innerHTML: block.innerHTML)
        var tag = block.openTag
        var boxSize = markup.boxSize
        var width = markup.width
        var height = markup.height
        var captionHTML = markup.captionHTML

        func applySize(_ size: String) {
            boxSize = size
            if size != "resizable" { width = nil }
            if size == "compact" || size == "full" { height = nil }
            // A compact box is its title row alone.
            if size == "compact" {
                captionHTML = nil
                tag = settingAttribute("data-hide-title", to: nil, in: tag)
            }
        }

        switch change {
        case .size(let size):
            applySize(size)
        case .defaultSize(let size):
            applySize(size)
            width = nil
            height = nil
        case .position(let position):
            tag = settingAttribute("data-position", to: position, in: tag)
        case .showTitle(let isShown):
            tag = settingAttribute("data-hide-title", to: isShown ? nil : "true", in: tag)
        case .caption(let text):
            let trimmed = text?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            captionHTML = trimmed.isEmpty ? nil : IncludeNoteResolver.escapeHTML(trimmed)
        case .editable(let isOn):
            tag = settingAttribute("data-editable", to: isOn ? "true" : nil, in: tag)
        case .delete, .convertToLink:
            break
        }

        // Also what turns a size from before v0.107 into the one it reads as.
        tag = settingAttribute("data-box-size", to: boxSize, in: tag)
        tag = settingSize(width: width, height: height, in: tag)

        let oldName = tagName(of: tag)
        if oldName != "figure" {
            tag = "<figure" + tag.dropFirst(oldName.count + 1)
        }
        var inner = block.innerHTML
        if oldName != "figure" || captionHTML != markup.captionHTML {
            inner = captionHTML.map { "<figcaption>\($0)</figcaption>" } ?? ""
        }
        return tag + inner + "</figure>"
    }

    private static func tagName(of openTag: String) -> String {
        String(openTag.dropFirst().prefix { $0.isLetter || $0.isNumber }).lowercased()
    }

    private static func encodedBlockParameter(_ value: String) -> String {
        value.split(separator: ":", omittingEmptySubsequences: false)
            .map { $0.addingPercentEncoding(withAllowedCharacters: .alphanumerics) ?? String($0) }
            .joined(separator: ":")
    }

    /// Rewrites only the embed's own size properties; anything else in its `style` stays.
    private static func settingSize(width: String?, height: String?, in tag: String) -> String {
        let others = (ContentEmbedMarkup.attribute("style", in: tag) ?? "")
            .split(separator: ";")
            .map { $0.trimmingCharacters(in: .whitespaces) }
            .filter { !$0.isEmpty && !$0.hasPrefix("--include-note-width") && !$0.hasPrefix("--include-note-height") }
        var declarations = others
        if let width { declarations.append("--include-note-width:\(width)") }
        if let height { declarations.append("--include-note-height:\(height)") }
        return settingAttribute("style", to: declarations.isEmpty ? nil : declarations.joined(separator: ";"), in: tag)
    }

    private static func settingAttribute(_ name: String, to value: String?, in tag: String) -> String {
        let escaped = NSRegularExpression.escapedPattern(for: name)
        guard let pattern = try? NSRegularExpression(pattern: "\\s*(?<![\\w-])\(escaped)\\s*=\\s*(?:\"[^\"]*\"|'[^']*')") else { return tag }
        let ns = tag as NSString
        let written = value.map { " \(name)=\"\($0)\"" }
        if let match = pattern.firstMatch(in: tag, range: NSRange(location: 0, length: ns.length)) {
            return ns.replacingCharacters(in: match.range, with: written ?? "")
        }
        guard let written else { return tag }
        let end = tag.hasSuffix("/>") ? tag.index(tag.endIndex, offsetBy: -2) : tag.index(before: tag.endIndex)
        return tag[..<end] + written + tag[end...]
    }

    /// The size a new embed of a note starts with (Trilium's `getBoxSize`).
    /// A new embed of a note, or of blocks of it, as Trilium v0.107 stores one.
    static func embedHTML(noteId: String, block: String?, boxSize: String) -> String {
        var attributes = #"class="include-note" data-note-id="\#(IncludeNoteResolver.escapeHTML(noteId))""#
        if let block, !block.isEmpty {
            attributes += #" data-block="\#(IncludeNoteResolver.escapeHTML(block))""#
        }
        attributes += #" data-box-size="\#(IncludeNoteResolver.escapeHTML(boxSize))""#
        return "<figure \(attributes)></figure>"
    }

    static func defaultBoxSize(noteType: String, isExcerpt: Bool) -> String {
        if isExcerpt || noteType == "code" { return "full" }
        let previewed: Set<String> = [
            "book", "collection", "search", "text", "markdown", "image", "canvas", "mermaid", "mindMap", "spreadsheet",
            "render", "doc", "llmChat", "file", "webView", "geoMap", "kanban", "presentation", "calendar",
        ]
        return previewed.contains(noteType) ? "resizable" : "compact"
    }
}

/// What the ⋮ menu of a note excerpt offers, following Trilium's (`link_context_menu.ts`).
struct IncludeEmbedMenuModel: Equatable {
    struct Option: Equatable {
        let value: String
        let title: String
    }

    var canOpenInNewTab: Bool
    var canChange = false
    var sizes: [Option] = []
    var currentSize = ""
    var defaultSize: String?
    var isAtDefaultSize = false
    var breakPositions: [Option] = []
    var wrapPositions: [Option] = []
    var currentPosition: String?
    var offersTitleAndCaption = false
    var isTitleShown = true
    var canToggleTitle = false
    var hasCaption = false
    var canToggleCaption = false
    var offersEditable = false
    var isEditable = false

    private static let editableTypes: Set<String> = ["text", "code", "markdown", "mermaid", "canvas", "mindMap", "spreadsheet"]

    private static func sizeOption(_ value: String) -> Option {
        switch value {
        case "compact": return Option(value: value, title: String(localized: "Compact", comment: "Included note size"))
        case "resizable": return Option(value: value, title: String(localized: "Resizable", comment: "Included note size"))
        case "full": return Option(value: value, title: String(localized: "Full", comment: "Included note size"))
        default: return Option(value: value, title: String(localized: "Expandable", comment: "Included note size"))
        }
    }

    init(state: ContentEmbedState?, noteType: String, canChange: Bool, canOpenInNewTab: Bool) {
        self.canOpenInNewTab = canOpenInNewTab
        guard canChange, let state else { return }
        self.canChange = true
        let markup = state.markup

        sizes = ["compact", "resizable", "full", "expandable"].map(Self.sizeOption)
        currentSize = markup.boxSize
        let startingSize = ContentEmbedEdit.defaultBoxSize(noteType: noteType, isExcerpt: markup.block != nil)
        defaultSize = startingSize
        isAtDefaultSize = markup.boxSize == startingSize && markup.width == nil && markup.height == nil

        if markup.boxSize == "resizable" || markup.boxSize == "expandable" {
            breakPositions = [
                Option(value: "left", title: String(localized: "Align Left", comment: "Included note position")),
                Option(value: "center", title: String(localized: "Align Center", comment: "Included note position")),
                Option(value: "right", title: String(localized: "Align Right", comment: "Included note position")),
            ]
        }
        if markup.boxSize == "resizable" {
            wrapPositions = [
                Option(value: "wrap-left", title: String(localized: "Align Left", comment: "Included note position")),
                Option(value: "wrap-right", title: String(localized: "Align Right", comment: "Included note position")),
            ]
        }
        currentPosition = markup.position

        offersTitleAndCaption = true
        canToggleTitle = markup.boxSize != "compact" && markup.boxSize != "expandable"
        isTitleShown = !canToggleTitle || !markup.isTitleHidden
        canToggleCaption = markup.boxSize != "compact"
        hasCaption = markup.captionHTML != nil
        offersEditable = Self.editableTypes.contains(noteType)
        isEditable = state.isEditable
    }
}
