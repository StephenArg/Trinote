import WebKit
import XCTest
@testable import Trinote

/// Trilium link previews in the read-only note view and in plain text (issue #35).
@MainActor
final class LinkPreviewHTMLTests: XCTestCase {

    private static let mention = #"<span class="link-mention" data-url="https://github.com/StephenArg/Trinote/issues" data-embed-type="opengraph" data-title="Issues · StephenArg/Trinote" data-favicon="api/attachments/BBpmlSGq6Ibw/image/github.com.svg" data-site-name="GitHub"></span>"#

    // MARK: - Reading view snippet

    func testOnlyBodiesWithPreviewsGetTheRenderer() {
        XCTAssertEqual(LinkPreviewHTML.readingViewSnippet(forBody: "<p>Plain note</p>"), "")
        let snippet = LinkPreviewHTML.readingViewSnippet(forBody: "<p>\(Self.mention)</p>")
        XCTAssertTrue(snippet.contains("window.trinoteLinkPreview"), "the bundled link-preview.js is missing")
        XCTAssertTrue(snippet.contains("trinoteLinkPreview.render(document.body)"))
        XCTAssertTrue(snippet.contains(".link-embed-card"), "the bundled link-preview.css is missing")
    }

    func testTheReadingViewDrawsPreviewsSafely() async throws {
        final class LoadWaiter: NSObject, WKNavigationDelegate {
            var continuation: CheckedContinuation<Void, Never>?
            func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
                continuation?.resume()
                continuation = nil
            }
        }
        let card = #"<section class="link-embed" data-url="javascript:alert(1)" data-embed-type="opengraph" data-title="Hostile" data-image="https://tracker.example/pixel.png"></section>"#
        let video = #"<section class="link-embed" data-url="https://youtu.be/dQw4w9WgXcQ" data-embed-type="youtube" data-title="Video" data-image="api/attachments/thumb1/image/youtube.jpeg"></section>"#
        let body = "<p>See \(Self.mention) now</p>\(card)\(video)"
        // Each value is recorded when the page's own script runs, before any picture can fail to load and remove itself.
        let probe = """
        <script>
        window.probe = {
          title: document.querySelector('span.link-mention .link-embed-mention-title').textContent,
          mentionHref: document.querySelector('span.link-mention a').getAttribute('href'),
          favicon: document.querySelector('span.link-mention img').getAttribute('src'),
          hostileHref: document.querySelector('section.link-embed a.link-embed-card').getAttribute('href'),
          hostileImages: document.querySelectorAll('section.link-embed a.link-embed-card img.link-embed-card-image').length,
          videoHref: document.querySelector('a.link-embed-video').getAttribute('href'),
          thumbnail: document.querySelector('a.link-embed-video img').getAttribute('src'),
          stored: document.querySelector('span.link-mention').getAttribute('data-favicon'),
        };
        </script>
        """
        let page = "<html><body>\(body)\(LinkPreviewHTML.readingViewSnippet(forBody: body))\(probe)</body></html>"
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800))
        let waiter = LoadWaiter()
        webView.navigationDelegate = waiter
        await withCheckedContinuation { continuation in
            waiter.continuation = continuation
            webView.loadHTMLString(page, baseURL: nil)
        }
        let probed = try await webView.evaluateJavaScript("window.probe")
        let result = try XCTUnwrap(probed as? [String: Any])
        XCTAssertEqual(result["title"] as? String, "Issues · StephenArg/Trinote")
        XCTAssertEqual(result["mentionHref"] as? String, "https://github.com/StephenArg/Trinote/issues")
        XCTAssertEqual(result["favicon"] as? String, "trinote-img://attachments/BBpmlSGq6Ibw")
        XCTAssertEqual(result["hostileHref"] as? String, "about:blank")
        XCTAssertEqual(result["hostileImages"] as? Int, 0)
        XCTAssertEqual(result["videoHref"] as? String, "https://youtu.be/dQw4w9WgXcQ")
        XCTAssertEqual(result["thumbnail"] as? String, "trinote-img://attachments/thumb1")
        // Drawing never rewrites what Trilium stored.
        XCTAssertEqual(result["stored"] as? String, "api/attachments/BBpmlSGq6Ibw/image/github.com.svg")
    }

    func testFaviconsServedByTheImageSchemeAreMeasuredAndMarked() async throws {
        final class LoadWaiter: NSObject, WKNavigationDelegate {
            var continuation: CheckedContinuation<Void, Never>?
            func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
                continuation?.resume()
                continuation = nil
            }
        }
        func icon(_ fill: String) -> Data {
            Data("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='\(fill)'/></svg>".utf8)
        }
        let icons = ["blackIcon": icon("#000"), "whiteIcon": icon("#fff"), "redIcon": icon("#e33")]
        let config = WKWebViewConfiguration()
        config.setURLSchemeHandler(
            TriliumImageSchemeHandler(provider: { _, id in icons[id] }),
            forURLScheme: TriliumImageScheme.scheme
        )
        let body = ["blackIcon", "whiteIcon", "redIcon"].map {
            #"<span class="link-mention" data-url="https://\#($0).example/" data-favicon="api/attachments/\#($0)/image/x.svg"></span>"#
        }.joined(separator: " ")
        let page = "<html><body><p>\(body)</p>\(LinkPreviewHTML.readingViewSnippet(forBody: body))</body></html>"
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800), configuration: config)
        let waiter = LoadWaiter()
        webView.navigationDelegate = waiter
        await withCheckedContinuation { continuation in
            waiter.continuation = continuation
            webView.loadHTMLString(page, baseURL: URL(string: "https://trilium.example/"))
        }
        var classes: [String] = []
        for _ in 0..<50 {
            let value = try await webView.evaluateJavaScript(
                "Array.from(document.querySelectorAll('img.link-embed-mention-favicon')).map(i => i.className)"
            )
            classes = value as? [String] ?? []
            if classes.filter({ $0.contains("link-embed-favicon-") }).count >= 2 { break }
            try await Task.sleep(for: .milliseconds(100))
        }
        XCTAssertEqual(classes, [
            "link-embed-mention-favicon link-embed-favicon-dark",
            "link-embed-mention-favicon link-embed-favicon-light",
            "link-embed-mention-favicon",
        ])
    }

    // MARK: - Plain text

    func testPreviewsBecomeTheirTitlesInPlainText() {
        let html = "<p>See \(Self.mention) now</p>"
            + #"<section class="link-embed" data-url="https://example.com/post" data-embed-type="opengraph" data-title="A &amp; B" data-description="About things"></section>"#
            + #"<p><span class="link-mention" data-url="https://news.example.org/a"></span></p>"#
        XCTAssertEqual(
            NotePlainText.fromHTML(html),
            "See Issues · StephenArg/Trinote now\n\nA & B About things\n\nnews.example.org"
        )
    }

    func testAPreviewWithoutAUrlAddsNothing() {
        XCTAssertEqual(NotePlainText.fromHTML(#"<p>a<span class="link-mention"></span>b</p>"#), "ab")
    }
}
