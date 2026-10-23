import Foundation

/// Trilium link previews (v0.104+) outside the editor.
///
/// Trilium stores a preview as an empty element whose whole content is in `data-*` attributes: inline
/// `<span class="link-mention" data-url=… data-title=… data-favicon=…></span>`, or a block
/// `<section class="link-embed" data-url=… data-embed-type="opengraph|youtube" …></section>` drawn as a card or a
/// video. The visible markup is drawn from those attributes each time the note is shown, by the bundled
/// `link-preview.js` and `link-preview.css` (shared with the rich text editor).
enum LinkPreviewHTML {
    /// Cheap probe: a body naming neither class holds no previews.
    static func bodyHasLinkPreviews(_ html: String) -> Bool {
        html.containsASCII("link-mention") || html.containsASCII("link-embed")
    }

    /// The `<style>` and `<script>` that draw the previews in a read-only note, placed right after the body so they
    /// are drawn before the page measures its height. Empty when the body has no previews.
    static func readingViewSnippet(forBody body: String) -> String {
        guard bodyHasLinkPreviews(body), let script = bundledScript else { return "" }
        let style = bundledStylesheet.map { "<style>\n\($0)\n</style>\n" } ?? ""
        return style + "<script>\n" + script + "\ntrinoteLinkPreview.render(document.body);\n</script>"
    }

    // MARK: - Plain text

    /// Matches one stored preview element (empty, or with the drawn children Trilium's editing view adds).
    private static let elementPattern = try? NSRegularExpression(
        pattern: #"<(span|section)\b([^>]*\bclass\s*=\s*["'][^"']*\blink-(?:mention|embed)\b[^"']*["'][^>]*)>"#,
        options: [.caseInsensitive]
    )

    /// Replaces each preview element's opening tag with the text it shows: its title (the URL's host when there is
    /// none), and for a block also its description. The offline search index and match previews strip tags, which
    /// would otherwise leave nothing where a preview was. Trilium's own search indexes the same attributes.
    static func replacingPreviewsWithText(_ html: String) -> String {
        guard bodyHasLinkPreviews(html), let elementPattern else { return html }
        let ns = html as NSString
        let matches = elementPattern.matches(in: html, range: NSRange(location: 0, length: ns.length))
        guard !matches.isEmpty else { return html }
        let result = NSMutableString(string: html)
        for match in matches.reversed() {
            let tag = ns.substring(with: match.range(at: 1)).lowercased()
            let attributes = ns.substring(with: match.range(at: 2))
            guard let url = attribute("data-url", in: attributes), !url.isEmpty else { continue }
            var parts = [attribute("data-title", in: attributes).flatMap { $0.isEmpty ? nil : $0 } ?? host(of: url)]
            if tag == "section", let description = attribute("data-description", in: attributes), !description.isEmpty {
                parts.append(description)
            }
            result.replaceCharacters(in: match.range, with: "<\(tag)>" + parts.joined(separator: " "))
        }
        return result as String
    }

    /// The raw (still entity-encoded) value of `name` in a tag's attribute text.
    static func attribute(_ name: String, in attributes: String) -> String? {
        let escaped = NSRegularExpression.escapedPattern(for: name)
        guard let regex = try? NSRegularExpression(
            pattern: #"(?:^|\s)"# + escaped + #"\s*=\s*(?:"([^"]*)"|'([^']*)')"#,
            options: [.caseInsensitive]
        ) else { return nil }
        let ns = attributes as NSString
        guard let match = regex.firstMatch(in: attributes, range: NSRange(location: 0, length: ns.length)) else {
            return nil
        }
        for group in 1...2 where match.range(at: group).location != NSNotFound {
            return ns.substring(with: match.range(at: group))
        }
        return nil
    }

    private static func host(of url: String) -> String {
        let decoded = url.replacingOccurrences(of: "&amp;", with: "&")
        return URL(string: decoded)?.host ?? url
    }

    // MARK: - Bundled renderer

    private static let bundledScript: String? = bundleText(resource: "link-preview", extension: "js")
    private static let bundledStylesheet: String? = bundleText(resource: "link-preview", extension: "css")

    private static func bundleText(resource: String, extension ext: String) -> String? {
        guard let url = Bundle.main.url(forResource: resource, withExtension: ext),
              let text = try? String(contentsOf: url, encoding: .utf8),
              !text.isEmpty
        else { return nil }
        // An inline <script> ends at the first `</script`, wherever it appears.
        if ext == "js", text.range(of: "</script", options: .caseInsensitive) != nil { return nil }
        return text
    }
}
