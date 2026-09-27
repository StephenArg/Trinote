import Foundation

/// CSS that draws Trilium v0.106+ inline icons (`<span class="tn-icon bx bx-star"></span>`) in note web views.
///
/// Glyph rules are generated only for the icons a note holds, and the Boxicons font is embedded as a data URL
/// because `file://` font loads fail in WKWebView (see `GeoMapWebViewBoxiconsInjection`). A note without icons
/// gets an empty string, so ordinary notes don't carry the font.
enum TriliumInlineIconStyles {
    static let markerClass = "tn-icon"

    /// Transform classes CKEditor's icon toolbar writes beside the pack's own (`boxicons-compat.css`).
    private static let transformRules = """
    .tn-icon.bx-rotate-90{transform:rotate(90deg)}
    .tn-icon.bx-rotate-180{transform:rotate(180deg)}
    .tn-icon.bx-rotate-270{transform:rotate(270deg)}
    .tn-icon.bx-flip-horizontal{transform:scaleX(-1)}
    .tn-icon.bx-flip-vertical{transform:scaleY(-1)}
    """

    /// An icon from a pack Trinote doesn't bundle keeps a faint placeholder rather than vanishing.
    private static let baseRules = """
    .tn-icon{display:inline-block;font-family:'boxicons'!important;font-style:normal;font-weight:normal;\
    font-variant:normal;line-height:1;vertical-align:-0.125em;text-rendering:auto;-webkit-font-smoothing:antialiased}
    .tn-icon::before{content:"\\25C6";opacity:.45}
    """

    private static let fontFace: String? = {
        let url = Bundle.main.url(forResource: "boxicons", withExtension: "ttf", subdirectory: "Fonts")
            ?? Bundle.main.url(forResource: "boxicons", withExtension: "ttf")
        guard let url, let data = try? Data(contentsOf: url) else { return nil }
        return "@font-face{font-family:'boxicons';src:url('data:font/ttf;base64,\(data.base64EncodedString())') "
            + "format('truetype');font-weight:normal;font-style:normal}"
    }()

    private static let iconClassPattern = try? NSRegularExpression(
        pattern: #"class\s*=\s*["']([^"']*\btn-icon\b[^"']*)["']"#,
        options: [.caseInsensitive]
    )

    /// The stylesheet for the icons in `html`, or `""` when it has none.
    static func css(forHTML html: String) -> String {
        let rules = glyphRules(forHTML: html)
        guard let rules else { return "" }
        var parts = [baseRules, transformRules]
        if !rules.isEmpty, let fontFace {
            parts.append(fontFace)
        }
        parts.append(contentsOf: rules)
        return parts.joined(separator: "\n")
    }

    /// One `::before` rule per distinct Boxicons glyph in `html`; `nil` when `html` holds no inline icon.
    static func glyphRules(forHTML html: String) -> [String]? {
        guard html.contains(markerClass), let iconClassPattern else { return nil }
        let range = NSRange(html.startIndex..., in: html)
        let matches = iconClassPattern.matches(in: html, range: range)
        guard !matches.isEmpty else { return nil }

        var rules: [String] = []
        var seen = Set<String>()
        for match in matches {
            guard let classRange = Range(match.range(at: 1), in: html) else { continue }
            let tokens = html[classRange].split(whereSeparator: \.isWhitespace).map(String.init)
            guard tokens.contains(markerClass) else { continue }
            // The glyph class, not a transform class such as `bx-rotate-90`: only catalog keys have a codepoint.
            guard let key = tokens.last(where: { BoxiconsCatalog.codepoints[$0] != nil }),
                  seen.insert(key).inserted,
                  let codepoint = BoxiconsCatalog.codepoints[key]
            else { continue }
            rules.append(".tn-icon.\(key)::before{content:\"\\\(String(codepoint, radix: 16))\";opacity:1}")
        }
        return rules
    }
}
