import XCTest
@testable import Trinote

final class TriliumMathHTMLSupportTests: XCTestCase {

    func testBodyContainsMathTexScript() {
        let html = #"<p><script type="math/tex">x^2</script></p>"#
        XCTAssertTrue(TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(html))
    }

    func testBodyContainsMathTexScriptDisplay() {
        let html = #"<script type="math/tex; mode=display">\frac{1}{2}</script>"#
        XCTAssertTrue(TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(html))
    }

    func testBodyContainsMathTexClass() {
        let html = #"<span class="math-tex">\(a\)</span>"#
        XCTAssertTrue(TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(html))
    }

    func testBodyContainsEditorBridgeSpan() {
        let html = #"<p><span data-trinote-math-tex="x" data-trinote-math-display="0"></span></p>"#
        XCTAssertTrue(TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(html))
    }

    func testPlainParagraphDoesNotTriggerMathMarkers() {
        let html = "<p>No math here, just \\alpha in text.</p>"
        XCTAssertFalse(TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(html))
    }

    func testKatexBundledInAppHostBundle() {
        let bundle = Bundle(for: TrinoteApp.self)
        XCTAssertNotNil(
            bundle.url(forResource: "katex.min", withExtension: "js", subdirectory: "vendor/katex"),
            "KaTeX should be bundled under vendor/katex for read-only and editor"
        )
    }
}
