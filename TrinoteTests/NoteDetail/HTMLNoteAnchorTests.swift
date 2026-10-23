import XCTest
@testable import Trinote

/// Locks in the URL classification used by the read-only HTML viewer to decide whether
/// a tapped link is a same-document `#anchor` jump (scroll within the WKWebView) versus
/// an external/inter-note navigation (forwarded to the app or to UIApplication).
///
/// Routing helper lives at module scope as `HTMLNoteAnchorRouting` so the private nested
/// `Coordinator` doesn't have to be exposed publicly.
final class HTMLNoteAnchorTests: XCTestCase {

    func testFragmentOnlyUrlWithoutHost() throws {
        let url = try XCTUnwrap(URL(string: "#Rights"))
        XCTAssertTrue(HTMLNoteAnchorRouting.urlIsFragmentOnly(url, against: nil))
    }

    func testFragmentOnlyUrlMatchesCurrentDocument() throws {
        let url = try XCTUnwrap(URL(string: "https://trilium.test/note/abc#Section1"))
        let current = try XCTUnwrap(URL(string: "https://trilium.test/note/abc"))
        XCTAssertTrue(HTMLNoteAnchorRouting.urlIsFragmentOnly(url, against: current))
    }

    func testFragmentToDifferentPathIsNotFragmentOnly() throws {
        let url = try XCTUnwrap(URL(string: "https://trilium.test/note/other#Section1"))
        let current = try XCTUnwrap(URL(string: "https://trilium.test/note/abc"))
        XCTAssertFalse(HTMLNoteAnchorRouting.urlIsFragmentOnly(url, against: current))
    }

    func testFragmentToDifferentHostIsNotFragmentOnly() throws {
        let url = try XCTUnwrap(URL(string: "https://other.test/note/abc#Section1"))
        let current = try XCTUnwrap(URL(string: "https://trilium.test/note/abc"))
        XCTAssertFalse(HTMLNoteAnchorRouting.urlIsFragmentOnly(url, against: current))
    }

    // MARK: - Trilium 0.107 help pages

    func testHelpPageAssetsPointAtTheServer() throws {
        let page = ##"<img src="assets/v0.107.0/help/User%20Guide/a.png"><a href="assets/v0.107.0/help/User%20Guide/b.pdf">PDF</a><img src="api/images/n1/x.png"><a href="#root/_help_x">Next</a>"##
        let onSubPath = TriliumServerAssetURLs.resolving(in: page, serverBase: URL(string: "https://host.test/trilium"))
        XCTAssertEqual(
            onSubPath,
            ##"<img src="https://host.test/trilium/assets/v0.107.0/help/User%20Guide/a.png"><a href="https://host.test/trilium/assets/v0.107.0/help/User%20Guide/b.pdf">PDF</a><img src="api/images/n1/x.png"><a href="#root/_help_x">Next</a>"##
        )
        let atRoot = TriliumServerAssetURLs.resolving(in: page, serverBase: URL(string: "https://host.test/"))
        XCTAssertTrue(atRoot.hasPrefix(#"<img src="https://host.test/assets/v0.107.0/help/"#))
        XCTAssertEqual(TriliumServerAssetURLs.resolving(in: page, serverBase: nil), page)
        XCTAssertEqual(TriliumServerAssetURLs.resolving(in: "<p>assets/ only in text</p>", serverBase: URL(string: "https://host.test")), "<p>assets/ only in text</p>")
    }
}
