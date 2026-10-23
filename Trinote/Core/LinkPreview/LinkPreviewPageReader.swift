import Foundation

/// What a web page says about itself for a link preview, as read on the device.
struct LinkPreviewPage: Equatable, Sendable {
    var title: String
    var description: String?
    var siteName: String?
    /// Cover image candidates, best first (`og:image`, `twitter:image`, then a large home-screen icon).
    var imageURLs: [URL]
    /// Favicon candidates, best first, always ending with the site's `/favicon.ico`.
    var faviconURLs: [URL]
}

/// Reads web pages for link previews from the phone itself.
///
/// Trilium normally reads the page on the server (`POST /api/link-embed/metadata`). A server with no way out to the
/// internet, or one a site refuses, answers that it couldn't read the page, and the link would stay a plain link.
/// The phone usually can read it, so Trinote asks it instead and stores the pictures on the server itself.
protocol LinkPreviewPageReading: Sendable {
    func read(_ url: URL) async -> LinkPreviewPage?
    /// A picture's bytes, or nil when it can't be had or is larger than `maxBytes`.
    func download(_ url: URL, maxBytes: Int) async -> Data?
}

final class LinkPreviewPageReader: LinkPreviewPageReading {
    static let shared = LinkPreviewPageReader()

    /// How much of a page to read. The tags a preview needs sit in the head.
    static let maxPageBytes = 1_000_000

    /// Tried in order. A browser's agent gets the page most sites serve people; Trilium's own is the one a site that
    /// serves link previews to bots expects, and is what the server would have sent.
    private static let userAgents = [
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
        "TriliumNotes/1.0 (Link Preview; +https://triliumnotes.org/)",
    ]

    private let session: URLSession

    init() {
        let config = URLSessionConfiguration.ephemeral
        config.timeoutIntervalForRequest = 15
        config.timeoutIntervalForResource = 30
        config.httpCookieAcceptPolicy = .never
        config.httpShouldSetCookies = false
        session = URLSession(configuration: config)
    }

    func read(_ url: URL) async -> LinkPreviewPage? {
        for agent in Self.userAgents {
            guard let (html, pageURL) = await fetchHTML(url, userAgent: agent) else { continue }
            if let page = LinkPreviewHTMLParser.parse(html: html, pageURL: pageURL) { return page }
        }
        return nil
    }

    func download(_ url: URL, maxBytes: Int) async -> Data? {
        var request = URLRequest(url: url)
        request.setValue(Self.userAgents[0], forHTTPHeaderField: "User-Agent")
        request.setValue("image/*,*/*;q=0.8", forHTTPHeaderField: "Accept")
        return await read(request, maxBytes: maxBytes)?.data
    }

    private func fetchHTML(_ url: URL, userAgent: String) async -> (String, URL)? {
        var request = URLRequest(url: url)
        request.setValue(userAgent, forHTTPHeaderField: "User-Agent")
        request.setValue("text/html,application/xhtml+xml;q=0.9,*/*;q=0.5", forHTTPHeaderField: "Accept")
        if let language = Locale.preferredLanguages.first {
            request.setValue("\(language),en;q=0.5", forHTTPHeaderField: "Accept-Language")
        }
        guard let result = await read(request, maxBytes: Self.maxPageBytes, truncate: true) else { return nil }
        if let mime = result.response.mimeType?.lowercased(), !mime.contains("html") { return nil }
        // Read as UTF-8 whatever the page declares, as Trilium does: the tags are ASCII either way.
        return (String(decoding: result.data, as: UTF8.self), result.response.url ?? url)
    }

    /// The body of a successful response, cut at `maxBytes` when `truncate`, refused above it otherwise.
    private func read(
        _ request: URLRequest,
        maxBytes: Int,
        truncate: Bool = false
    ) async -> (data: Data, response: HTTPURLResponse)? {
        guard let scheme = request.url?.scheme?.lowercased(), scheme == "http" || scheme == "https" else { return nil }
        do {
            let (bytes, response) = try await session.bytes(for: request)
            guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else { return nil }
            if !truncate, http.expectedContentLength > Int64(maxBytes) { return nil }
            var data = Data()
            data.reserveCapacity(min(maxBytes, max(0, Int(http.expectedContentLength))))
            for try await byte in bytes {
                data.append(byte)
                if data.count >= maxBytes {
                    if truncate { break }
                    return nil
                }
            }
            return (data, http)
        } catch {
            return nil
        }
    }
}

/// Pulls a link preview's details out of a page's HTML, the way Trilium's server does: `og:` tags first, then
/// Twitter's, then the plain `<title>` and `description`.
enum LinkPreviewHTMLParser {
    static func parse(html: String, pageURL: URL) -> LinkPreviewPage? {
        let head = headSection(of: html)
        var meta: [String: String] = [:]
        for tag in matches(of: metaTagPattern, in: head) {
            guard let content = attribute("content", in: tag) else { continue }
            for keyAttribute in ["property", "name", "itemprop"] {
                guard let key = attribute(keyAttribute, in: tag)?.lowercased(), !key.isEmpty else { continue }
                if meta[key] == nil { meta[key] = decodeEntities(content) }
            }
        }

        let documentTitle = firstMatch(of: titlePattern, in: head).map(decodeEntities)
        let title = [meta["og:title"], meta["twitter:title"], documentTitle]
            .compactMap { $0.map(collapsingWhitespace) }
            .first { !$0.isEmpty }
        guard let title else { return nil }

        let description = [meta["og:description"], meta["twitter:description"], meta["description"]]
            .compactMap { $0.map(collapsingWhitespace) }
            .first { !$0.isEmpty }
        let siteName = meta["og:site_name"].map(collapsingWhitespace).flatMap { $0.isEmpty ? nil : $0 }

        var icons: [(url: URL, rel: String, size: Int?, isSVG: Bool)] = []
        for tag in matches(of: linkTagPattern, in: head) {
            guard let rel = attribute("rel", in: tag)?.lowercased(),
                  let href = attribute("href", in: tag),
                  let url = resolve(decodeEntities(href), against: pageURL)
            else { continue }
            let tokens = rel.split(whereSeparator: \.isWhitespace)
            guard tokens.contains("icon") || tokens.contains(where: { $0.hasPrefix("apple-touch-icon") }) else { continue }
            let size = attribute("sizes", in: tag).flatMap(largestSize)
            let type = attribute("type", in: tag)?.lowercased() ?? ""
            icons.append((url, rel, size, type.contains("svg") || url.path.lowercased().hasSuffix(".svg")))
        }

        var imageURLs: [URL] = []
        for key in ["og:image", "og:image:url", "og:image:secure_url", "twitter:image", "twitter:image:src"] {
            guard let value = meta[key], let url = resolve(value, against: pageURL), !imageURLs.contains(url) else { continue }
            imageURLs.append(url)
        }
        // Like Trilium: a large home-screen icon stands in for a missing cover.
        for icon in icons where icon.rel.contains("apple-touch-icon") && (icon.size ?? 180) >= 96 {
            if !imageURLs.contains(icon.url) { imageURLs.append(icon.url) }
        }

        // Favicons: a page's own icons, best for a 16pt drawing on a 3x screen (48px) first, then the home-screen
        // icon, then the site's `/favicon.ico`.
        let pageIcons = icons.filter { !$0.rel.contains("apple-touch-icon") && !$0.rel.contains("mask-icon") }
        let ranked = pageIcons.sorted { faviconRank($0.size, $0.isSVG) < faviconRank($1.size, $1.isSVG) }
        var faviconURLs: [URL] = []
        for icon in ranked.prefix(3) where !faviconURLs.contains(icon.url) { faviconURLs.append(icon.url) }
        if let touch = icons.first(where: { $0.rel.contains("apple-touch-icon") }), faviconURLs.count < 3,
           !faviconURLs.contains(touch.url) {
            faviconURLs.append(touch.url)
        }
        if let fallback = resolve("/favicon.ico", against: pageURL), !faviconURLs.contains(fallback) {
            faviconURLs.append(fallback)
        }

        return LinkPreviewPage(
            title: title,
            description: description,
            siteName: siteName,
            imageURLs: imageURLs,
            faviconURLs: faviconURLs
        )
    }

    // MARK: - Helpers

    private static let metaTagPattern = try! NSRegularExpression(pattern: #"<meta\b[^>]*>"#, options: [.caseInsensitive])
    private static let linkTagPattern = try! NSRegularExpression(pattern: #"<link\b[^>]*>"#, options: [.caseInsensitive])
    private static let titlePattern = try! NSRegularExpression(
        pattern: #"<title\b[^>]*>([\s\S]*?)</title\s*>"#,
        options: [.caseInsensitive]
    )

    /// Up to `</head>`, where the tags live; the whole page when it has no head.
    private static func headSection(of html: String) -> String {
        if let end = html.range(of: "</head", options: .caseInsensitive) {
            return String(html[..<end.lowerBound])
        }
        return html
    }

    private static func matches(of pattern: NSRegularExpression, in text: String) -> [String] {
        let ns = text as NSString
        return pattern.matches(in: text, range: NSRange(location: 0, length: ns.length)).map { ns.substring(with: $0.range) }
    }

    private static func firstMatch(of pattern: NSRegularExpression, in text: String) -> String? {
        let ns = text as NSString
        guard let match = pattern.firstMatch(in: text, range: NSRange(location: 0, length: ns.length)),
              match.numberOfRanges > 1, match.range(at: 1).location != NSNotFound
        else { return nil }
        return ns.substring(with: match.range(at: 1))
    }

    /// An attribute's raw value in one tag, quoted or not.
    static func attribute(_ name: String, in tag: String) -> String? {
        let escaped = NSRegularExpression.escapedPattern(for: name)
        guard let regex = try? NSRegularExpression(
            pattern: #"[\s"'/]"# + escaped + #"\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))"#,
            options: [.caseInsensitive]
        ) else { return nil }
        let ns = tag as NSString
        guard let match = regex.firstMatch(in: tag, range: NSRange(location: 0, length: ns.length)) else { return nil }
        for group in 1...3 where match.range(at: group).location != NSNotFound {
            return ns.substring(with: match.range(at: group))
        }
        return nil
    }

    private static func resolve(_ value: String, against base: URL) -> URL? {
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty,
              let url = URL(string: trimmed, relativeTo: base)?.absoluteURL
                ?? trimmed.addingPercentEncoding(withAllowedCharacters: .urlFragmentAllowed)
                    .flatMap({ URL(string: $0, relativeTo: base)?.absoluteURL }),
              let scheme = url.scheme?.lowercased(), scheme == "http" || scheme == "https"
        else { return nil }
        return url
    }

    /// The largest edge in a `sizes` attribute (`"16x16 32x32"`); nil for `any` or nothing usable.
    private static func largestSize(_ sizes: String) -> Int? {
        sizes.lowercased().split(whereSeparator: \.isWhitespace)
            .compactMap { $0.split(separator: "x").first.flatMap { Int($0) } }
            .max()
    }

    /// Lower ranks first: the smallest icon of at least 48px, then an SVG, then one of unknown size, then smaller ones.
    private static func faviconRank(_ size: Int?, _ isSVG: Bool) -> Int {
        if let size, size >= 48 { return size }
        if isSVG { return 10_000 }
        guard let size else { return 20_000 }
        return 30_000 - size
    }

    private static func collapsingWhitespace(_ text: String) -> String {
        text.replacingOccurrences(of: #"\s+"#, with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private static let namedEntities: [String: String] = [
        "amp": "&", "lt": "<", "gt": ">", "quot": "\"", "apos": "'", "nbsp": " ", "ndash": "–", "mdash": "—",
        "hellip": "…", "lsquo": "\u{2018}", "rsquo": "\u{2019}", "ldquo": "\u{201C}", "rdquo": "\u{201D}",
        "middot": "·", "bull": "•", "copy": "©", "reg": "®", "trade": "™",
    ]
    private static let entityPattern = try! NSRegularExpression(pattern: #"&(#[xX][0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);"#)

    static func decodeEntities(_ text: String) -> String {
        guard text.contains("&") else { return text }
        let ns = text as NSString
        var result = ""
        var cursor = 0
        for match in entityPattern.matches(in: text, range: NSRange(location: 0, length: ns.length)) {
            result += ns.substring(with: NSRange(location: cursor, length: match.range.location - cursor))
            cursor = match.range.location + match.range.length
            let body = ns.substring(with: match.range(at: 1))
            if body.hasPrefix("#") {
                let digits = body.dropFirst()
                let value = digits.first == "x" || digits.first == "X"
                    ? UInt32(digits.dropFirst(), radix: 16)
                    : UInt32(digits, radix: 10)
                if let value, let scalar = Unicode.Scalar(value) { result.unicodeScalars.append(scalar) }
            } else if let named = namedEntities[body.lowercased()] {
                result += named
            } else {
                result += ns.substring(with: match.range)
            }
        }
        result += ns.substring(from: cursor)
        return result
    }
}
