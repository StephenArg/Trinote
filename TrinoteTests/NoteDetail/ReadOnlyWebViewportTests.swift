import XCTest
@testable import Trinote

final class ReadOnlyWebViewportTests: XCTestCase {
    func testNoteThatFitsOnScreenKeepsAFullHeightWebView() {
        let layout = ReadOnlyWebViewport.layout(containerHeight: 500, visibleMinY: -200, viewportHeight: 800)
        XCTAssertEqual(layout, .init(frameY: 0, frameHeight: 500, innerOffsetY: 0, pinned: false))
    }

    func testNoteExactlyAsTallAsTheScreenIsNotPinned() {
        let layout = ReadOnlyWebViewport.layout(containerHeight: 800, visibleMinY: 0, viewportHeight: 800)
        XCTAssertFalse(layout.pinned)
        XCTAssertEqual(layout.frameHeight, 800)
    }

    func testWithoutAnEnclosingScrollViewTheWebViewIsFullHeight() {
        let layout = ReadOnlyWebViewport.layout(containerHeight: 20_000, visibleMinY: 300, viewportHeight: nil)
        XCTAssertEqual(layout, .init(frameY: 0, frameHeight: 20_000, innerOffsetY: 0, pinned: false))
    }

    func testWhileTheHeaderIsOnScreenTheWebViewStartsAtTheTop() {
        let layout = ReadOnlyWebViewport.layout(containerHeight: 20_000, visibleMinY: -250, viewportHeight: 800)
        XCTAssertEqual(layout, .init(frameY: 0, frameHeight: 800, innerOffsetY: 0, pinned: true))
    }

    func testMidNoteTheWebViewCoversTheVisibleAreaAndScrollsItsPageToMatch() {
        let layout = ReadOnlyWebViewport.layout(containerHeight: 20_000, visibleMinY: 6_400, viewportHeight: 800)
        XCTAssertEqual(layout, .init(frameY: 6_400, frameHeight: 800, innerOffsetY: 6_400, pinned: true))
    }

    func testNearTheEndTheWebViewStopsAtTheBottomOfTheNote() {
        // The child notes and metadata below the body are on screen.
        let layout = ReadOnlyWebViewport.layout(containerHeight: 20_000, visibleMinY: 19_700, viewportHeight: 800)
        XCTAssertEqual(layout, .init(frameY: 19_200, frameHeight: 800, innerOffsetY: 19_200, pinned: true))
    }

    func testRubberBandingPastEitherEndStaysClamped() {
        let top = ReadOnlyWebViewport.layout(containerHeight: 5_000, visibleMinY: -900, viewportHeight: 800)
        XCTAssertEqual(top.frameY, 0)
        let bottom = ReadOnlyWebViewport.layout(containerHeight: 5_000, visibleMinY: 5_300, viewportHeight: 800)
        XCTAssertEqual(bottom.frameY, 4_200)
        XCTAssertEqual(bottom.innerOffsetY, 4_200)
    }

    func testFractionalOffsetsAreKeptSoTheVisibleAreaStaysCovered() {
        let layout = ReadOnlyWebViewport.layout(containerHeight: 5_000, visibleMinY: 1_234.4, viewportHeight: 800)
        XCTAssertEqual(layout.frameY, 1_234.4, accuracy: 0.0001)
        XCTAssertEqual(layout.innerOffsetY, layout.frameY)
    }
}
