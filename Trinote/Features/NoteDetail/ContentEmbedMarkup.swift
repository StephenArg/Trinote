import Foundation

/// What a stored embed says about itself: Trilium v0.107's `<figure class="include-note">`, or the older
/// `<section class="include-note">` every version still reads.
struct ContentEmbedMarkup: Equatable, Sendable {
    var noteId: String?
    var attachmentId: String?
    /// `id` or `startId:endId`: only those blocks of the note show.
    var block: String?
    /// One of `compact`, `resizable`, `full`, `expandable`.
    var boxSize: String
    var height: String?
    var width: String?
    /// `left`, `right`, `wrap-left` or `wrap-right`; `nil` is centered.
    var position: String?
    var isTitleHidden: Bool
    var captionHTML: String?
    /// A kind of embed added after this version, which readers can only show a placeholder for.
    var isUnknownKind: Bool

    private static let positions: Set<String> = ["left", "right", "wrap-left", "wrap-right"]

    init(openTag: String, innerHTML: String) {
        func trimmed(_ name: String) -> String? {
            let value = Self.attribute(name, in: openTag)?.trimmingCharacters(in: .whitespacesAndNewlines)
            return value?.isEmpty == false ? value : nil
        }
        noteId = trimmed("data-note-id")
        attachmentId = trimmed("data-attachment-id")
        block = trimmed("data-block")
        isUnknownKind = trimmed("data-trilium-embed") != nil

        // Sizes older versions saved, read as Trilium v0.107 reads them.
        var legacyHeight: String?
        switch trimmed("data-box-size")?.lowercased() {
        case "tiny", "compact": boxSize = "compact"
        case "small": boxSize = "resizable"; legacyHeight = "10em"
        case "medium": boxSize = "resizable"; legacyHeight = "20em"
        case "resizable": boxSize = "resizable"
        case "expandable": boxSize = "expandable"
        default: boxSize = "full"
        }

        let style = trimmed("style") ?? ""
        width = Self.length(named: "--include-note-width", in: style)
        height = Self.length(named: "--include-note-height", in: style) ?? legacyHeight

        let stored = trimmed("data-position")?.lowercased()
        // Kept on the embed for the sizes that can use it; only a resizable box can have text beside it.
        position = stored.flatMap { Self.positions.contains($0) ? $0 : nil }
        if boxSize == "compact" || boxSize == "full" || (boxSize == "expandable" && position?.hasPrefix("wrap-") == true) {
            position = nil
        }
        // A compact box is its title row, and an expandable one opens from it.
        isTitleHidden = trimmed("data-hide-title") == "true" && boxSize != "compact" && boxSize != "expandable"
        captionHTML = Self.caption(in: innerHTML)
    }

    /// The value of attribute `name` in an opening tag; a longer name that merely ends in `name` doesn't count.
    nonisolated static func attribute(_ name: String, in tag: String) -> String? {
        let escaped = NSRegularExpression.escapedPattern(for: name)
        guard let pattern = try? NSRegularExpression(pattern: "(?<![\\w-])\(escaped)\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)')", options: [.caseInsensitive]) else { return nil }
        let ns = tag as NSString
        guard let match = pattern.firstMatch(in: tag, range: NSRange(location: 0, length: ns.length)) else { return nil }
        for group in 1...2 where match.range(at: group).location != NSNotFound {
            return ns.substring(with: match.range(at: group))
        }
        return nil
    }

    /// A CSS length Trilium would have saved, so nothing else from a note's markup reaches a style attribute.
    private static func length(named property: String, in style: String) -> String? {
        let escaped = NSRegularExpression.escapedPattern(for: property)
        guard let pattern = try? NSRegularExpression(pattern: "\(escaped)\\s*:\\s*(\\d+(?:\\.\\d+)?(?:px|em|%))") else { return nil }
        let ns = style as NSString
        guard let match = pattern.firstMatch(in: style, range: NSRange(location: 0, length: ns.length)) else { return nil }
        return ns.substring(with: match.range(at: 1))
    }

    private static func caption(in innerHTML: String) -> String? {
        guard let pattern = try? NSRegularExpression(pattern: "(?is)<figcaption\\b[^>]*>(.*)</figcaption>") else { return nil }
        let ns = innerHTML as NSString
        guard let match = pattern.firstMatch(in: innerHTML, range: NSRange(location: 0, length: ns.length)) else { return nil }
        let caption = ns.substring(with: match.range(at: 1))
        return caption.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? nil : caption
    }
}

/// What Trilium v0.107's stored layouts need outside the editor, placed right after a read-only note's body so
/// it runs before the page measures its height: excerpts trimmed to their blocks, tabs, diagrams and adaptive colours.
enum ContentEmbedHTML {
    static func readingViewSnippet(forBody body: String) -> String {
        var snippet = ""
        if body.containsASCII("data-trinote-block"), let blockSliceScript {
            snippet += "<script>\n" + blockSliceScript + "\ntrinoteBlockSlice.apply(document);\n</script>\n"
        }
        if usesContentBlocks(body), let contentBlocksScript {
            if let contentBlocksStylesheet { snippet += "<style>\n" + contentBlocksStylesheet + "\n</style>\n" }
            snippet += "<script>\n" + contentBlocksScript + "\ntrinoteContentBlocks.apply(document);\n</script>"
        }
        return snippet
    }

    /// Cheap probe for anything `content-blocks.{js,css}` acts on.
    static func usesContentBlocks(_ body: String) -> Bool {
        body.containsASCII("trilium-multicolumn-layout")
            || body.containsASCII("trilium-tabs")
            || body.containsASCII("language-mermaid")
            || body.containsASCII("--tn-")
    }

    static let blockSliceScript = bundleText(resource: "block-slice", extension: "js")
    static let contentBlocksScript = bundleText(resource: "content-blocks", extension: "js")
    static let contentBlocksStylesheet = bundleText(resource: "content-blocks", extension: "css")

    private static func bundleText(resource: String, extension ext: String) -> String? {
        guard let url = Bundle.main.url(forResource: resource, withExtension: ext) else { return nil }
        return try? String(contentsOf: url, encoding: .utf8)
    }
}
