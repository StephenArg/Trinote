import XCTest
@testable import Trinote

final class TriliumInlineIconStylesTests: XCTestCase {

    func testNoteWithoutIconsGetsNoStyles() {
        XCTAssertNil(TriliumInlineIconStyles.glyphRules(forHTML: "<p>Plain <span class=\"text-big\">text</span></p>"))
        XCTAssertEqual(TriliumInlineIconStyles.css(forHTML: "<p>Plain</p>"), "")
    }

    func testOneRulePerDistinctGlyphIgnoringTransformClasses() throws {
        let html = """
        <p><span class="tn-icon bx bx-star bx-rotate-90"></span> and <span style="color:red;"><span class="tn-icon bx bx-star"></span></span>
        <span class='tn-icon bx bxs-heart'></span></p>
        """
        let rules = try XCTUnwrap(TriliumInlineIconStyles.glyphRules(forHTML: html))
        let star = try XCTUnwrap(BoxiconsCatalog.codepoints["bx-star"])
        XCTAssertEqual(rules.count, 2)
        XCTAssertTrue(rules.contains(".tn-icon.bx-star::before{content:\"\\\(String(star, radix: 16))\";opacity:1}"))
        XCTAssertTrue(rules.contains { $0.hasPrefix(".tn-icon.bxs-heart::before") })
    }

    func testIconFromUnbundledPackKeepsPlaceholderWithoutFont() {
        let html = #"<p><span class="tn-icon mdi mdi-rocket"></span></p>"#
        XCTAssertEqual(TriliumInlineIconStyles.glyphRules(forHTML: html), [])
        let css = TriliumInlineIconStyles.css(forHTML: html)
        XCTAssertTrue(css.contains(".tn-icon::before"))
        XCTAssertFalse(css.contains("@font-face"))
    }
}
