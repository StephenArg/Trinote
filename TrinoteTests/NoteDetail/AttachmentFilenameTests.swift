import XCTest
@testable import Trinote

final class AttachmentFilenameTests: XCTestCase {
    func testSplitSeparatesBasenameAndExtension() {
        let split = AttachmentFilename.split("Quarterly Report.pdf")
        XCTAssertEqual(split.basename, "Quarterly Report")
        XCTAssertEqual(split.ext, "pdf")
    }

    func testSplitHandlesMultipleDots() {
        let split = AttachmentFilename.split("archive.tar.gz")
        XCTAssertEqual(split.basename, "archive.tar")
        XCTAssertEqual(split.ext, "gz")
    }

    func testJoinPreservesExtension() {
        let joined = AttachmentFilename.join(basename: "My Doc", ext: "pdf")
        XCTAssertEqual(joined, "My Doc.pdf")
    }

    func testJoinDoesNotDuplicateExtension() {
        let joined = AttachmentFilename.join(basename: "My Doc.pdf", ext: "pdf")
        XCTAssertEqual(joined, "My Doc.pdf")
    }

    func testSplitAndJoinRoundTrip() {
        let original = "Budget 2026.xlsx"
        let split = AttachmentFilename.split(original)
        let joined = AttachmentFilename.join(basename: "Updated Budget", ext: split.ext)
        XCTAssertEqual(joined, "Updated Budget.xlsx")
    }

    func testReplacementExtensionMatchesIgnoringCase() {
        XCTAssertTrue(AttachmentFilename.replacementExtensionMatches(
            existingTitle: "Scan.PNG",
            replacementFilename: "photo.png"
        ))
        XCTAssertFalse(AttachmentFilename.replacementExtensionMatches(
            existingTitle: "notes.pdf",
            replacementFilename: "notes.docx"
        ))
    }

    func testReplacementAllowsAnyExtensionWhenExistingHasNone() {
        XCTAssertTrue(AttachmentFilename.replacementExtensionMatches(
            existingTitle: "untitled",
            replacementFilename: "photo.png"
        ))
    }
}
