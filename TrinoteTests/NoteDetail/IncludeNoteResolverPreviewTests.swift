import XCTest
@testable import Trinote

final class IncludeNoteResolverPreviewTests: XCTestCase {
    func testStripIncludeSectionsRemovesNestedBlocks() {
        let html = """
        <p>a</p><section class="include-note" data-note-id="x"><section class="nested"><p>in</p></section></section><p>b</p>\
        <section class="include-note" data-note-id="y"></section>
        """
        XCTAssertEqual(IncludeNoteResolver.stripIncludeSections(html), "<p>a</p><p>b</p>")
    }

    func testStripStyleTagsKeepsSVGStyles() {
        let html = "<style>p{color:red}</style><p>x</p><svg><style>.a{fill:red}</style><rect/></svg><STYLE type=\"text/css\">b{}</STYLE>"
        XCTAssertEqual(IncludeNoteResolver.stripStyleTags(html), "<p>x</p><svg><style>.a{fill:red}</style><rect/></svg>")
        XCTAssertEqual(IncludeNoteResolver.stripStyleTags("<p>plain</p>"), "<p>plain</p>")
    }

    func testEmptyHTMLRule() {
        XCTAssertTrue(IncludeNoteResolver.isHTMLEmpty(""))
        XCTAssertTrue(IncludeNoteResolver.isHTMLEmpty("<p></p>\n<p> </p><br>"))
        XCTAssertTrue(IncludeNoteResolver.isHTMLEmpty("<p>&nbsp;</p>"))
        XCTAssertFalse(IncludeNoteResolver.isHTMLEmpty("<p>x</p>"))
        XCTAssertTrue(IncludeNoteResolver.isHTMLEmpty("<h2></h2><ul><li></li></ul>"))
        XCTAssertFalse(IncludeNoteResolver.isHTMLEmpty("<figure class=\"image\"><img src=\"a\"></figure>"))
    }

    /// Indices from a lowercased copy drifted after "İ" (two UTF-8 bytes, three once lowercased) and cut the
    /// section's tag apart.
    func testStripIncludeSectionsAfterDottedCapitalI() {
        let html = #"<p>İİİ</p><section class="include-note" data-note-id="n"><p>x</p></section><p>b</p>"#
        XCTAssertEqual(IncludeNoteResolver.stripIncludeSections(html), "<p>İİİ</p><p>b</p>")
    }

    func testStripIncludeSectionsIgnoresTagCase() {
        let html = #"<p>a</p><SECTION class="include-note" data-note-id="n"></SECTION><p>b</p>"#
        XCTAssertEqual(IncludeNoteResolver.stripIncludeSections(html), "<p>a</p><p>b</p>")
    }
}
