import XCTest
@testable import Trinote

final class TriliumHashLinkNavigationTests: XCTestCase {

    func testParsesAttachmentReferenceLinkFromHref() throws {
        let parsed = try XCTUnwrap(
            TriliumHashLinkNavigation.parse(href: "#root/noteABC?viewMode=attachments&attachmentId=attXYZ")
        )
        XCTAssertEqual(parsed.noteId, "noteABC")
        XCTAssertEqual(parsed.viewMode, "attachments")
        XCTAssertEqual(parsed.attachmentId, "attXYZ")
    }

    func testParsesAttachmentReferenceLinkFromURL() throws {
        let url = try XCTUnwrap(URL(string: "#root/noteABC?viewMode=attachments&attachmentId=attXYZ"))
        let parsed = try XCTUnwrap(TriliumHashLinkNavigation.parse(url: url))
        XCTAssertEqual(parsed.noteId, "noteABC")
        XCTAssertEqual(parsed.viewMode, "attachments")
        XCTAssertEqual(parsed.attachmentId, "attXYZ")
    }

    func testParsesPlainInternalNoteLink() throws {
        let parsed = try XCTUnwrap(TriliumHashLinkNavigation.parse(href: "#root/parent/noteChild"))
        XCTAssertEqual(parsed.noteId, "noteChild")
        XCTAssertNil(parsed.viewMode)
        XCTAssertNil(parsed.attachmentId)
    }
}
