import Foundation

/// Images a note points at on the Trilium server's own domain but outside Trilium itself, such as
/// `<img src="/media/image/example.png">` served by a reverse proxy in front of the server (issue #40).
///
/// Trilium's web UI loads those with the browser's session. Trinote's web views can't: the reading view's
/// WebKit has none of the app's cookies or Cloudflare Access headers, and the editor page comes from the
/// app bundle, where `/media/…` means `file:///media/…`. So qualifying `src` values are swapped for
/// `trinote-img://server/file?path=…` references. `TriliumImageSchemeHandler` serves those through the
/// profile's authenticated session and the offline image cache, keyed by the path on the server.
///
/// Only display copies are rewritten. The editor keeps the written value in `data-trinote-original-src`,
/// which `NoteDetailViewModel.undecorateLinkedImagesFromEditor` puts back before anything is saved.
enum ServerFileImageURLs {
    /// `TriliumImageScheme` host and cache `entityType` for these images.
    static let route = "server"

    private static let schemePath = "/file"

    /// Characters left as they are inside one query value of a scheme URL; everything else is percent-encoded,
    /// including `%`, `&`, `=`, `+` and `?`, so the stored path comes back byte for byte.
    private static let queryValueAllowed = CharacterSet(
        charactersIn: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~/"
    )

    private static let imgTagPattern = try! NSRegularExpression(pattern: #"<img\b[^>]*>"#, options: [.caseInsensitive])
    /// `\s` before `src` keeps `data-src` and `data-cke-saved-src` out.
    private static let srcAttributePattern = try! NSRegularExpression(
        pattern: #"(\s)src(\s*=\s*)(["'])([^"']*)\3"#,
        options: [.caseInsensitive]
    )

    // MARK: - Which URLs qualify

    /// The percent-encoded path (plus `?query`) on the server that `src` names, or nil unless it is a same-origin
    /// URL outside Trilium's own image and asset routes. `src` is the attribute text as written in the HTML.
    ///
    /// Relative values resolve against the server base with a trailing slash, as they do on Trilium's own page:
    /// `media/x.png` under `https://host/trilium` is `/trilium/media/x.png`, while `/media/x.png` is `/media/x.png`.
    static func originPath(forSrc src: String, serverBase: URL) -> String? {
        let value = decodingHTMLEntities(src).trimmingCharacters(in: .whitespacesAndNewlines)
        guard !value.isEmpty, !value.hasPrefix("#") else { return nil }
        // Trilium's own images are rewritten (or deliberately card-wrapped) by `TriliumInlineImageCaching`.
        guard !value.containsASCIICaseInsensitive("api/attachments/"),
              !value.containsASCIICaseInsensitive("api/images/")
        else { return nil }

        guard let base = baseWithTrailingSlash(serverBase),
              let resolved = resolve(value, against: base),
              isSameOrigin(resolved, as: base),
              let components = URLComponents(url: resolved, resolvingAgainstBaseURL: false)
        else { return nil }

        var path = components.percentEncodedPath
        if path.isEmpty { path = "/" }
        guard path.hasPrefix("/"), !path.hasPrefix("//") else { return nil }
        // Trilium's static files keep going through `TriliumServerAssetURLs`, as before.
        let basePath = URLComponents(url: base, resolvingAgainstBaseURL: false)?.percentEncodedPath ?? "/"
        if path.hasPrefix(basePath + "assets/") { return nil }

        if let query = components.percentEncodedQuery, !query.isEmpty {
            path += "?" + query
        }
        return path
    }

    /// Same scheme, host and port (default ports filled in).
    static func isSameOrigin(_ url: URL, as base: URL) -> Bool {
        guard let scheme = url.scheme?.lowercased(),
              scheme == "http" || scheme == "https",
              scheme == base.scheme?.lowercased(),
              let host = url.host?.lowercased(), !host.isEmpty,
              host == base.host?.lowercased()
        else { return false }
        return effectivePort(of: url) == effectivePort(of: base)
    }

    private static func effectivePort(of url: URL) -> Int? {
        if let port = url.port { return port }
        switch url.scheme?.lowercased() {
        case "https": return 443
        case "http": return 80
        default: return nil
        }
    }

    /// Characters a written `src` may already contain unencoded and still mean the same URL.
    private static let lenientURLCharacters = CharacterSet.urlQueryAllowed
        .union(.urlPathAllowed)
        .union(CharacterSet(charactersIn: "%#"))

    /// Browsers accept spaces and non-ASCII in `src`; encode those when `URL(string:)` won't take the value as is.
    private static func resolve(_ value: String, against base: URL) -> URL? {
        if let url = URL(string: value, relativeTo: base) { return url.absoluteURL }
        guard let encoded = value.addingPercentEncoding(withAllowedCharacters: lenientURLCharacters) else { return nil }
        return URL(string: encoded, relativeTo: base)?.absoluteURL
    }

    private static func baseWithTrailingSlash(_ base: URL) -> URL? {
        let string = base.absoluteString
        return string.hasSuffix("/") ? base : URL(string: string + "/")
    }

    private static func decodingHTMLEntities(_ string: String) -> String {
        guard string.contains("&") else { return string }
        return string
            .replacingOccurrences(of: "&quot;", with: "\"")
            .replacingOccurrences(of: "&#39;", with: "'")
            .replacingOccurrences(of: "&#x27;", with: "'")
            .replacingOccurrences(of: "&apos;", with: "'")
            .replacingOccurrences(of: "&lt;", with: "<")
            .replacingOccurrences(of: "&gt;", with: ">")
            .replacingOccurrences(of: "&amp;", with: "&")
    }

    // MARK: - Scheme URLs

    /// `trinote-img://server/file?path=…`, plus `&v=…` once a pull-to-refresh asks for fresh copies: a new URL is
    /// what makes WebKit ask the scheme handler again instead of reusing the picture it already holds.
    static func schemeURL(path: String, version: Int = 0) -> String {
        let encoded = path.addingPercentEncoding(withAllowedCharacters: queryValueAllowed) ?? ""
        var url = "\(TriliumImageScheme.scheme)://\(route)\(schemePath)?path=\(encoded)"
        if version > 0 { url += "&v=\(version)" }
        return url
    }

    /// The server path a `schemeURL(path:version:)` names, or nil for anything else.
    static func path(from url: URL?) -> String? {
        guard let url,
              url.scheme?.lowercased() == TriliumImageScheme.scheme,
              url.host?.lowercased() == route,
              url.path == schemePath,
              let items = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems,
              let path = items.first(where: { $0.name == "path" })?.value,
              path.hasPrefix("/"), !path.hasPrefix("//")
        else { return nil }
        return path
    }

    // MARK: - HTML

    /// Whether any `<img>` in `html` would be rewritten. Cheap when there are no images at all.
    static func containsCandidates(in html: String, serverBase: URL?) -> Bool {
        guard let serverBase, html.containsASCIICaseInsensitive("<img") else { return false }
        var found = false
        forEachImageSource(in: html) { _, _, value in
            if originPath(forSrc: value, serverBase: serverBase) != nil {
                found = true
                return false
            }
            return true
        }
        return found
    }

    /// Server paths of every qualifying `<img src>` in `html`.
    static func paths(in html: String, serverBase: URL?) -> Set<String> {
        guard let serverBase, html.containsASCIICaseInsensitive("<img") else { return [] }
        var paths = Set<String>()
        forEachImageSource(in: html) { _, _, value in
            if let path = originPath(forSrc: value, serverBase: serverBase) { paths.insert(path) }
            return true
        }
        return paths
    }

    /// Replaces each qualifying `<img src>` with its scheme URL. Tags already carrying `data-trinote-original-src`
    /// are left alone (they were decorated before). With `keepingOriginal`, the written value goes into
    /// `data-trinote-original-src`, escaped the way `decorateLinkedImagesForEditor` escapes it, so
    /// `undecorateLinkedImagesFromEditor` restores the exact text.
    static func rewriteImageSources(
        in html: String,
        serverBase: URL?,
        version: Int = 0,
        keepingOriginal: Bool
    ) -> String {
        guard let serverBase, html.containsASCIICaseInsensitive("<img") else { return html }
        var edits: [(range: NSRange, replacement: String)] = []
        forEachImageSource(in: html) { tag, srcMatch, value in
            guard !tag.containsASCIICaseInsensitive("data-trinote-original-src"),
                  let path = originPath(forSrc: value, serverBase: serverBase)
            else { return true }
            let htmlNS = html as NSString
            let leading = htmlNS.substring(with: srcMatch.range(at: 1))
            let equals = htmlNS.substring(with: srcMatch.range(at: 2))
            let quote = htmlNS.substring(with: srcMatch.range(at: 3))
            let display = schemeURL(path: path, version: version).replacingOccurrences(of: "&", with: "&amp;")
            var replacement = "\(leading)src\(equals)\(quote)\(display)\(quote)"
            if keepingOriginal {
                let escaped = value
                    .replacingOccurrences(of: "&", with: "&amp;")
                    .replacingOccurrences(of: "\"", with: "&quot;")
                replacement += " data-trinote-original-src=\"\(escaped)\""
            }
            edits.append((srcMatch.range, replacement))
            return true
        }
        guard !edits.isEmpty else { return html }
        let result = NSMutableString(string: html)
        for edit in edits.reversed() {
            result.replaceCharacters(in: edit.range, with: edit.replacement)
        }
        return result as String
    }

    /// Calls `body` with each `<img>` tag's text, its `src` match (ranges in `html`), and the raw `src` value,
    /// in document order, until `body` returns false.
    private static func forEachImageSource(
        in html: String,
        _ body: (_ tag: String, _ srcMatch: NSTextCheckingResult, _ value: String) -> Bool
    ) {
        let htmlNS = html as NSString
        let full = NSRange(location: 0, length: htmlNS.length)
        for tagMatch in imgTagPattern.matches(in: html, options: [], range: full) {
            guard let srcMatch = srcAttributePattern.firstMatch(in: html, options: [], range: tagMatch.range),
                  srcMatch.numberOfRanges >= 5
            else { continue }
            let tag = htmlNS.substring(with: tagMatch.range)
            let value = htmlNS.substring(with: srcMatch.range(at: 4))
            if !body(tag, srcMatch, value) { return }
        }
    }
}
