import XCTest
@testable import Trinote

final class ExtensionsTests: XCTestCase {

    // MARK: - String.nilIfEmpty

    func testNilIfEmpty() {
        XCTAssertNil("".nilIfEmpty)
        XCTAssertEqual("hello".nilIfEmpty, "hello")
        XCTAssertEqual(" ".nilIfEmpty, " ")
    }

    // MARK: - String.truncated

    func testTruncated() {
        XCTAssertEqual("Hello World".truncated(to: 5), "Hello…")
        XCTAssertEqual("Hi".truncated(to: 10), "Hi")
        XCTAssertEqual("Exact".truncated(to: 5), "Exact")
    }

    // MARK: - Date Parsing

    func testTriliumDateISO8601WithFractional() {
        let date = "2024-01-15T12:30:45.123Z".triliumDate()
        XCTAssertNotNil(date)
    }

    func testTriliumDateISO8601Plain() {
        let date = "2024-01-15T12:30:45Z".triliumDate()
        XCTAssertNotNil(date)
    }

    func testTriliumDateLocalFormat() {
        let date = "2024-01-15 12:30:45".triliumDate()
        XCTAssertNotNil(date)
    }

    func testTriliumDateInvalid() {
        let date = "not-a-date".triliumDate()
        XCTAssertNil(date)
    }

    func testTriliumDateEmpty() {
        let date = "".triliumDate()
        XCTAssertNil(date)
    }

    // MARK: - Date Display

    func testRelativeDisplay() {
        let recent = Date().relativeDisplay
        XCTAssertFalse(recent.isEmpty)
    }

    func testShortDisplay() {
        let display = Date().shortDisplay
        XCTAssertFalse(display.isEmpty)
    }

    // MARK: - Offline local note ids

    func testIsOfflineLocalNoteId() {
        XCTAssertTrue("ol_abc123".isOfflineLocalNoteId)
        XCTAssertTrue("ol_".isOfflineLocalNoteId)
        XCTAssertFalse("root".isOfflineLocalNoteId)
        XCTAssertFalse("n1".isOfflineLocalNoteId)
        XCTAssertFalse("".isOfflineLocalNoteId)
    }
}
