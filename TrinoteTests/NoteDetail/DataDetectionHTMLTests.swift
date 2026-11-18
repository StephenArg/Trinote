import WebKit
import XCTest
@testable import Trinote

/// Detected phone numbers, addresses and tracking numbers in the reading view's page: the page's script, the native
/// reply handler and the wrapping, together.
@MainActor
final class DataDetectionHTMLTests: XCTestCase {
    private final class LoadWaiter: NSObject, WKNavigationDelegate {
        var continuation: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            continuation?.resume()
            continuation = nil
        }
    }

    private static let theme = HTMLThemeColors(lightText: "#1c1c1e", darkText: "#aaaaaa", lightLink: "#007aff", darkLink: "#0a84ff")

    func testSnippetOnlyWhenOn() {
        XCTAssertEqual(DataDetectionHTML.readingViewSnippet(nil), "")
        XCTAssertFalse(HTMLNoteWebView.wrapHTML("<p>x</p>", theme: Self.theme).contains("trinote-detected"))
        XCTAssertTrue(
            HTMLNoteWebView.wrapHTML("<p>x</p>", theme: Self.theme, dataDetection: DataDetectionConfig(mapsApp: .google))
                .contains("var MAPS = 'google'")
        )
    }

    private func loadedPage(_ body: String, mapsApp: DetectedDataSettings.MapsApp = .apple) async -> WKWebView {
        let page = HTMLNoteWebView.wrapHTML(body, theme: Self.theme, dataDetection: DataDetectionConfig(mapsApp: mapsApp))
        let config = WKWebViewConfiguration()
        config.userContentController.addScriptMessageHandler(
            DetectedDataMessageHandler(), contentWorld: .page, name: DataDetectionHTML.messageHandlerName
        )
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800), configuration: config)
        let waiter = LoadWaiter()
        webView.navigationDelegate = waiter
        await withCheckedContinuation { continuation in
            waiter.continuation = continuation
            webView.loadHTMLString(page, baseURL: nil)
        }
        return webView
    }

    /// `[text, href]` of every detected link, once at least `count` are there (or after about 5 s).
    private func detectedLinks(in webView: WKWebView, atLeast count: Int) async throws -> [[String]] {
        let script = """
        Array.from(document.querySelectorAll('a.trinote-detected')).map(function(a) {
            return [a.textContent, a.getAttribute('href')];
        })
        """
        var links: [[String]] = []
        for _ in 0..<50 {
            links = try await webView.evaluateJavaScript(script) as? [[String]] ?? []
            if links.count >= count { break }
            try await Task.sleep(for: .milliseconds(100))
        }
        return links
    }

    func testPhoneAddressAndTrackingBecomeLinks() async throws {
        let body = """
        <p>Call <b>(555) 123-4567</b> or write to:</p>
        <p>1 Infinite Loop<br>Cupertino, CA 95014</p>
        <p>Parcel 1Z999AA10123456784 ships today.</p>
        <pre><code>555-987-6543</code></pre>
        <p><a href="https://example.com/">555-222-3333</a></p>
        """
        let webView = await loadedPage(body)
        let links = try await detectedLinks(in: webView, atLeast: 4)

        XCTAssertTrue(links.contains(["(555) 123-4567", "tel:5551234567"]), "\(links)")
        XCTAssertTrue(links.contains(["1Z999AA10123456784", "https://www.ups.com/track?tracknum=1Z999AA10123456784"]), "\(links)")
        // The address spans a <br>: one link per line, both to the same search.
        let addressLinks = links.filter { $0[1].hasPrefix("https://maps.apple.com/") }
        XCTAssertEqual(addressLinks.map { $0[0] }, ["1 Infinite Loop", "Cupertino, CA 95014"], "\(links)")
        XCTAssertEqual(Set(addressLinks.map { $0[1] }).count, 1)
        // Code and existing links are left alone.
        XCTAssertFalse(links.contains { $0[0].contains("987") || $0[0].contains("222") }, "\(links)")
        // The bold phone number stays bold, now inside the link.
        let boldWrapped = try await webView.evaluateJavaScript("document.querySelector('b > a.trinote-detected') !== null") as? Bool
        XCTAssertEqual(boldWrapped, true)
    }

    func testTextAddedLaterIsScanned() async throws {
        let webView = await loadedPage("<p>Nothing yet</p>")
        _ = try await webView.evaluateJavaScript("""
        var p = document.createElement('p');
        p.textContent = 'New number: 555-765-4321';
        document.body.appendChild(p);
        true
        """)
        let links = try await detectedLinks(in: webView, atLeast: 1)
        XCTAssertEqual(links, [["555-765-4321", "tel:5557654321"]])
    }
}
