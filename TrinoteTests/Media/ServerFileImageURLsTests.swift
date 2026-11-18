import XCTest
@testable import Trinote

/// Issue #40: `<img src="/media/…">` on the server's own domain, outside Trilium.
@MainActor
final class ServerFileImageURLsTests: XCTestCase {
    private let base = URL(string: "https://notes.example.com")!
    private let subpathBase = URL(string: "https://host.test/trilium")!

    private func path(_ src: String, base: URL? = nil) -> String? {
        ServerFileImageURLs.originPath(forSrc: src, serverBase: base ?? self.base)
    }

    func testSameOriginForms() {
        XCTAssertEqual(path("/media/image/example.png"), "/media/image/example.png")
        XCTAssertEqual(path("media/image/example.png"), "/media/image/example.png")
        XCTAssertEqual(path("//notes.example.com/a.png"), "/a.png")
        XCTAssertEqual(path("https://notes.example.com/a.png"), "/a.png")
        XCTAssertEqual(path("HTTPS://Notes.Example.COM/a.png"), "/a.png")
        XCTAssertEqual(path("https://notes.example.com:443/a.png"), "/a.png")
        XCTAssertEqual(path("  /media/a.png  "), "/media/a.png")
    }

    /// Relative values resolve the way they do on Trilium's own page, under the base path.
    func testSubpathServer() {
        XCTAssertEqual(path("media/x.png", base: subpathBase), "/trilium/media/x.png")
        XCTAssertEqual(path("/media/x.png", base: subpathBase), "/media/x.png")
        XCTAssertEqual(path("https://host.test/trilium/media/x.png", base: subpathBase), "/trilium/media/x.png")
    }

    func testQueryAndEncoding() {
        XCTAssertEqual(path("/media/x.png?a=1&amp;b=2"), "/media/x.png?a=1&b=2")
        XCTAssertEqual(path("/media/my photo.png"), "/media/my%20photo.png")
        XCTAssertEqual(path("/media/x.png#frag"), "/media/x.png")
    }

    func testOtherOriginsAndSchemesDoNotQualify() {
        XCTAssertNil(path("https://other.example.com/a.png"))
        XCTAssertNil(path("https://notes.example.com:8443/a.png"))
        XCTAssertNil(path("http://notes.example.com/a.png"))
        XCTAssertNil(path("data:image/png;base64,AAAA"))
        XCTAssertNil(path("blob:https://notes.example.com/123"))
        XCTAssertNil(path("trinote-img://attachments/att1"))
        XCTAssertNil(path("file:///media/a.png"))
        XCTAssertNil(path(""))
        XCTAssertNil(path("#top"))
        XCTAssertEqual(
            ServerFileImageURLs.originPath(forSrc: "/a.png", serverBase: URL(string: "https://notes.example.com:8443")!),
            "/a.png"
        )
    }

    func testTriliumRoutesAreLeftToTheirOwnHandling() {
        XCTAssertNil(path("api/images/n1/x.png"))
        XCTAssertNil(path("/api/attachments/a1/image/x.png"))
        XCTAssertNil(path("https://notes.example.com/api/images/n1/x.png"))
        XCTAssertNil(path("assets/v0.107.0/images/icon.png"))
        XCTAssertNil(path("assets/x.png", base: subpathBase))
    }

    func testSchemeURLRoundTrip() throws {
        let original = "/media/x y.png?a=1&b=%20+c"
        let encoded = try XCTUnwrap(path(original))
        for version in [0, 3] {
            let string = ServerFileImageURLs.schemeURL(path: encoded, version: version)
            XCTAssertTrue(string.hasPrefix("trinote-img://server/file?path="), string)
            XCTAssertEqual(string.hasSuffix("&v=3"), version == 3, string)
            XCTAssertEqual(ServerFileImageURLs.path(from: URL(string: string)), encoded)
            let reference = TriliumImageScheme.anyReference(fromURLString: string)
            XCTAssertEqual(reference?.routeType, "server")
            XCTAssertEqual(reference?.entityId, encoded)
            // Spreadsheet code turns strict references back into `api/…` URLs, so these must stay out of it.
            XCTAssertNil(TriliumImageScheme.reference(fromURLString: string))
        }
    }

    func testSchemeURLParsingRejectsOtherShapes() {
        XCTAssertNil(ServerFileImageURLs.path(from: URL(string: "trinote-img://server/file?path=media/x.png")))
        XCTAssertNil(ServerFileImageURLs.path(from: URL(string: "trinote-img://server/file?path=%2F%2Fevil.test%2Fx")))
        XCTAssertNil(ServerFileImageURLs.path(from: URL(string: "trinote-img://server/other?path=%2Fx.png")))
        XCTAssertNil(ServerFileImageURLs.path(from: URL(string: "trinote-img://attachments/file?path=%2Fx.png")))
        XCTAssertNil(ServerFileImageURLs.path(from: URL(string: "https://server/file?path=%2Fx.png")))
        // Trilium's own references still parse as before.
        XCTAssertEqual(TriliumImageScheme.anyReference(fromURLString: "trinote-img://attachments/att1")?.entityId, "att1")
    }

    func testRewriteTouchesOnlyQualifyingImageSources() {
        let html = #"<p><img src="/media/a.png" alt="A"><img src="api/images/n1/x.png"><img src="https://other.test/b.png"><img data-src="/media/c.png"><a href="/media/d.png">d</a></p>"#
        let out = ServerFileImageURLs.rewriteImageSources(in: html, serverBase: base, keepingOriginal: false)
        XCTAssertEqual(
            out,
            #"<p><img src="trinote-img://server/file?path=/media/a.png" alt="A"><img src="api/images/n1/x.png"><img src="https://other.test/b.png"><img data-src="/media/c.png"><a href="/media/d.png">d</a></p>"#
        )
        XCTAssertEqual(ServerFileImageURLs.rewriteImageSources(in: html, serverBase: nil, keepingOriginal: false), html)
    }

    func testRewriteEscapesTheVersionAmpersand() {
        let out = ServerFileImageURLs.rewriteImageSources(
            in: #"<img src="/media/a.png">"#, serverBase: base, version: 2, keepingOriginal: false
        )
        XCTAssertEqual(out, #"<img src="trinote-img://server/file?path=/media/a.png&amp;v=2">"#)
    }

    func testRewriteSkipsAlreadyDecoratedTags() {
        let html = #"<img src="/media/a.png" data-trinote-original-src="/media/a.png">"#
        XCTAssertEqual(ServerFileImageURLs.rewriteImageSources(in: html, serverBase: base, keepingOriginal: true), html)
    }

    /// The editor's decoration comes back as exactly what was written, quotes and entities included.
    func testKeepingOriginalRoundTripsThroughUndecorate() {
        let bodies = [
            #"<figure class="image"><img src="/media/image/example.png" alt="x"></figure>"#,
            #"<p><img src="/media/x.png?a=1&amp;b=2" width="40"></p>"#,
            #"<p><img alt='q' src='media/it&#39;s.png'></p>"#,
            #"<p><img src="https://notes.example.com/m/a.png"><img src="api/images/n1/x.png"></p>"#,
        ]
        for body in bodies {
            let decorated = ServerFileImageURLs.rewriteImageSources(in: body, serverBase: base, version: 4, keepingOriginal: true)
            XCTAssertNotEqual(decorated, body)
            XCTAssertTrue(decorated.contains("trinote-img://server/file"), decorated)
            XCTAssertEqual(NoteDetailViewModel.undecorateLinkedImagesFromEditor(in: decorated), body)
        }
    }

    func testCandidatesAndPaths() {
        XCTAssertTrue(ServerFileImageURLs.containsCandidates(in: #"<IMG SRC="/media/a.png">"#, serverBase: base))
        XCTAssertFalse(ServerFileImageURLs.containsCandidates(in: #"<img src="api/images/n1/a.png">"#, serverBase: base))
        XCTAssertFalse(ServerFileImageURLs.containsCandidates(in: #"<img src="/media/a.png">"#, serverBase: nil))
        XCTAssertFalse(ServerFileImageURLs.containsCandidates(in: "<p>/media/a.png</p>", serverBase: base))
        XCTAssertEqual(
            ServerFileImageURLs.paths(in: #"<img src="/a.png"><img src="a.png"><img src="/b.png?x=1">"#, serverBase: base),
            ["/a.png", "/b.png?x=1"]
        )
    }
}
