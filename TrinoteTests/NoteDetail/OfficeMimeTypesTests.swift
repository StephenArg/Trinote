import XCTest
@testable import Trinote

final class OfficeMimeTypesTests: XCTestCase {
    func testRecognizesOfficeOpenXMLAndODFAndRTFAndEPUB() {
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType(
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType(
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType("application/vnd.oasis.opendocument.text"))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType("application/vnd.oasis.opendocument.spreadsheet"))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType("application/vnd.oasis.opendocument.presentation"))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType("application/rtf"))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType("text/rtf"))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType("application/epub+zip"))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType("application/x-epub+zip"))
    }

    func testIgnoresMIMEParametersAndCase() {
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType("TEXT/RTF; charset=utf-8"))
        XCTAssertTrue(OfficeMimeTypes.isOfficeMimeType(
            "Application/VND.openxmlformats-officedocument.wordprocessingml.document; charset=binary"
        ))
    }

    func testRejectsPDFLegacyOfficeAndEmpty() {
        XCTAssertFalse(OfficeMimeTypes.isOfficeMimeType("application/pdf"))
        XCTAssertFalse(OfficeMimeTypes.isOfficeMimeType("application/msword"))
        XCTAssertFalse(OfficeMimeTypes.isOfficeMimeType("application/vnd.ms-excel"))
        XCTAssertFalse(OfficeMimeTypes.isOfficeMimeType("application/vnd.ms-powerpoint"))
        XCTAssertFalse(OfficeMimeTypes.isOfficeMimeType("application/octet-stream"))
        XCTAssertFalse(OfficeMimeTypes.isOfficeMimeType(""))
        XCTAssertFalse(OfficeMimeTypes.isOfficeMimeType(nil))
        XCTAssertFalse(OfficeMimeTypes.isOfficeMimeType("   "))
    }

    func testPreferredExtensionAndFilename() {
        XCTAssertEqual(
            OfficeMimeTypes.preferredExtension(for: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
            "xlsx"
        )
        XCTAssertEqual(
            OfficeMimeTypes.filename(fromTitle: "Budget 2026", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
            "Budget 2026.xlsx"
        )
        XCTAssertEqual(
            OfficeMimeTypes.filename(
                fromTitle: "Budget 2026.xlsx",
                mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ),
            "Budget 2026.xlsx"
        )
        XCTAssertEqual(
            OfficeMimeTypes.filename(fromTitle: "  ", mime: "application/epub+zip"),
            "document.epub"
        )
    }

    func testExceedsPreviewSize() {
        XCTAssertFalse(OfficeMimeTypes.exceedsPreviewSize(nil))
        XCTAssertFalse(OfficeMimeTypes.exceedsPreviewSize(OfficeMimeTypes.maxPreviewBytes))
        XCTAssertTrue(OfficeMimeTypes.exceedsPreviewSize(OfficeMimeTypes.maxPreviewBytes + 1))
    }
}
