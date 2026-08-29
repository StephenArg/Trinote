import Foundation

/// Prepares Trilium `/office-preview` HTML for a WKWebView. The server fragment is unsanitized;
/// Trilium’s web client runs DOMPurify, and Trinote strips active content plus default hyperlink
/// colors so the theme’s link color can apply (see `office_renderer.ts` `stripLinkColors`).
///
/// Word/DOCX conversion also stamps automatic text as `color:#000000` (or `black` / `windowtext`)
/// on nearly every run. That inline color wins over theme CSS and is invisible on a transparent
/// dark WKWebView. Author-chosen colors are left intact.
enum OfficeHTMLSanitizer {
    private static let dangerousTagPattern = try! NSRegularExpression(
        pattern: #"<(script|iframe|object|embed)(\s[^>]*)?>[\s\S]*?</\1\s*>|<(script|iframe|object|embed)(\s[^>]*)?/?>"#,
        options: [.caseInsensitive]
    )

    private static let eventHandlerPattern = try! NSRegularExpression(
        pattern: #"\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)"#,
        options: [.caseInsensitive]
    )

    private static let anchorBlockPattern = try! NSRegularExpression(
        pattern: #"<a\b[^>]*>[\s\S]*?</a>"#,
        options: [.caseInsensitive]
    )

    private static let defaultLinkColorPattern = try! NSRegularExpression(
        pattern: #"(?<![\w-])color\s*:\s*(?:#0563c1|#000080|#0000ff|#0000ee|rgb\(\s*5\s*,\s*99\s*,\s*193\s*\)|rgb\(\s*0\s*,\s*0\s*,\s*128\s*\)|rgb\(\s*0\s*,\s*0\s*,\s*255\s*\)|rgb\(\s*0\s*,\s*0\s*,\s*238\s*\))\s*;?"#,
        options: [.caseInsensitive]
    )

    /// Word “Automatic”, HTML `black`, and `windowtext`/`CanvasText`. `#000080` (navy) must not match.
    private static let defaultDocumentTextColorPattern = try! NSRegularExpression(
        pattern: #"(?<![\w-])color\s*:\s*(?:black|windowtext|canvastext|#000(?:000)?(?:ff)?(?![\da-f])|rgb\(\s*0\s*(?:,|\s)\s*0\s*(?:,|\s)\s*0\s*(?:/\s*1(?:\.0+)?)?\)|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*1(?:\.0+)?\s*\))\s*(?:!important)?\s*;?"#,
        options: [.caseInsensitive]
    )

    /// officeparser’s desktop “premium” stylesheet (`standalone !== false` on older builds, or
    /// `styles: 'full'`). EPUB chapter CSS does not include `--container-width`.
    private static let officeParserPremiumStylePattern = try! NSRegularExpression(
        pattern: #"<style\b[^>]*>[\s\S]*?--container-width[\s\S]*?</style\s*>"#,
        options: [.caseInsensitive]
    )

    static func prepareForPreview(_ html: String) -> String {
        var out = html
        out = stripDangerousTags(out)
        out = stripEventHandlers(out)
        out = stripOfficeParserPremiumStylesheets(out)
        out = stripDefaultHyperlinkColors(out)
        out = stripDefaultDocumentTextColors(out)
        return out
    }

    static func stripDangerousTags(_ html: String) -> String {
        let range = NSRange(html.startIndex..<html.endIndex, in: html)
        return dangerousTagPattern.stringByReplacingMatches(in: html, options: [], range: range, withTemplate: "")
    }

    static func stripEventHandlers(_ html: String) -> String {
        let range = NSRange(html.startIndex..<html.endIndex, in: html)
        return eventHandlerPattern.stringByReplacingMatches(in: html, options: [], range: range, withTemplate: "")
    }

    /// Removes word-processor default hyperlink colors on `<a>` and descendants so theme CSS wins.
    static func stripDefaultHyperlinkColors(_ html: String) -> String {
        let ns = html as NSString
        let full = NSRange(location: 0, length: ns.length)
        let matches = anchorBlockPattern.matches(in: html, options: [], range: full)
        guard !matches.isEmpty else { return html }

        var result = html
        for match in matches.reversed() {
            guard let swiftRange = Range(match.range, in: result) else { continue }
            let block = String(result[swiftRange])
            let cleaned = stripDefaultLinkColorsInStyles(block)
            result.replaceSubrange(swiftRange, with: cleaned)
        }
        return result
    }

    /// Drops automatic/default document text colors so the preview theme can apply.
    static func stripDefaultDocumentTextColors(_ html: String) -> String {
        let range = NSRange(html.startIndex..<html.endIndex, in: html)
        return defaultDocumentTextColorPattern.stringByReplacingMatches(
            in: html,
            options: [],
            range: range,
            withTemplate: ""
        )
    }

    static func stripOfficeParserPremiumStylesheets(_ html: String) -> String {
        let range = NSRange(html.startIndex..<html.endIndex, in: html)
        return officeParserPremiumStylePattern.stringByReplacingMatches(
            in: html,
            options: [],
            range: range,
            withTemplate: ""
        )
    }

    private static func stripDefaultLinkColorsInStyles(_ html: String) -> String {
        let range = NSRange(html.startIndex..<html.endIndex, in: html)
        return defaultLinkColorPattern.stringByReplacingMatches(in: html, options: [], range: range, withTemplate: "")
    }
}
