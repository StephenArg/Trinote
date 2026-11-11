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

    func testPlainLinkHasNoJump() throws {
        let parsed = try XCTUnwrap(TriliumHashLinkNavigation.parse(href: "#root/a/b"))
        XCTAssertNil(parsed.jumpTarget)
    }

    func testParsesABlockLink() throws {
        let parsed = try XCTUnwrap(TriliumHashLinkNavigation.parse(href: "#root/a/b?block=abc123"))
        XCTAssertEqual(parsed.noteId, "b")
        XCTAssertEqual(parsed.jumpTarget, NoteJumpTarget(block: "abc123"))
    }

    func testParsesABlockRangeWithItsColon() throws {
        let parsed = try XCTUnwrap(TriliumHashLinkNavigation.parse(href: "#root/b?block=start%20id:end"))
        XCTAssertEqual(parsed.jumpTarget?.block, "start id:end")
    }

    func testParsesABookmark() throws {
        let parsed = try XCTUnwrap(TriliumHashLinkNavigation.parse(href: "#root/b?bookmark=Heading%201"))
        XCTAssertEqual(parsed.jumpTarget, NoteJumpTarget(bookmark: "Heading 1"))
    }

    func testParsesAPdfPageAndIgnoresABadOne() throws {
        let parsed = try XCTUnwrap(TriliumHashLinkNavigation.parse(href: "#root/b?page=7&annotation=x"))
        XCTAssertEqual(parsed.jumpTarget, NoteJumpTarget(page: 7))
        XCTAssertNil(TriliumHashLinkNavigation.parse(href: "#root/b?page=0")?.jumpTarget)
    }
}
