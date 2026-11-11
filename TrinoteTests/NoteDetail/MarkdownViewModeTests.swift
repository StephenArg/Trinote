import XCTest
@testable import Trinote

/// The Markdown view a note opens in: what's remembered, and what each place offers.
final class MarkdownViewModeTests: XCTestCase {
    func testReadingOffersAllThreeAndTheEditorSourceOrSplit() {
        XCTAssertEqual(MarkdownViewMode.readingModes, [.source, .split, .preview])
        XCTAssertEqual(MarkdownViewMode.editingModes, [.source, .split])
    }

    func testARememberedChoiceComesBackAndAnythingElseFallsBack() {
        XCTAssertEqual(MarkdownViewMode.stored("split", offering: MarkdownViewMode.editingModes, fallback: .source), .split)
        XCTAssertEqual(MarkdownViewMode.stored("", offering: MarkdownViewMode.editingModes, fallback: .source), .source, "nothing chosen yet")
        XCTAssertEqual(MarkdownViewMode.stored("preview", offering: MarkdownViewMode.editingModes, fallback: .source), .source, "the editor has no preview-only view")
        XCTAssertEqual(MarkdownViewMode.stored("bogus", offering: MarkdownViewMode.readingModes, fallback: .preview), .preview)
    }
}
