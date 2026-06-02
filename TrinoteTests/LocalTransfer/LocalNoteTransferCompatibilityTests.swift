import XCTest
@testable import Trinote

final class LocalNoteTransferCompatibilityTests: XCTestCase {
    func testSpreadsheetBlockedOnOldServer() {
        let note = NoteItem(
            noteId: "n1",
            title: "Sheet",
            type: .spreadsheet,
            mime: "application/json",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: ["root"],
            childNoteIds: [],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: []
        )
        let receiver = LocalTransferServerInfo(
            from: AppInfoResponse(
                appVersion: "0.102.0",
                dbVersion: 230,
                syncVersion: 38,
                buildDate: nil,
                buildRevision: nil,
                dataDirectory: nil,
                clipperProtocolVersion: nil,
                utcDateTime: nil
            )
        )
        let result = LocalNoteTransferCompatibility.canSend(note: note, receiverServerInfo: receiver)
        XCTAssertFalse(result.allowed)
        XCTAssertNotNil(result.reason)
    }

    func testTextNoteAllowedOnOldServer() {
        let note = NoteItem(
            noteId: "n1",
            title: "Hello",
            type: .text,
            mime: "text/html",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: ["root"],
            childNoteIds: [],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: []
        )
        let receiver = LocalTransferServerInfo(
            from: AppInfoResponse(
                appVersion: "0.95.0",
                dbVersion: 200,
                syncVersion: 30,
                buildDate: nil,
                buildRevision: nil,
                dataDirectory: nil,
                clipperProtocolVersion: nil,
                utcDateTime: nil
            )
        )
        let result = LocalNoteTransferCompatibility.canSend(note: note, receiverServerInfo: receiver)
        XCTAssertTrue(result.allowed)
        XCTAssertNil(result.reason)
    }

    func testBundleEncodeDecodeRoundTrip() throws {
        let bundle = NoteTransferBundle(
            transferVersion: 2,
            title: "Test",
            noteType: "text",
            mime: "text/html",
            textContent: "<p>Hi</p>",
            binaryContent: nil,
            attachments: [
                LocalTransferAttachmentPayload(
                    role: "file",
                    mime: "image/png",
                    title: "img",
                    position: 0,
                    data: Data([0x89, 0x50])
                ),
            ]
        )
        let data = try LocalNoteTransferCodec.encodeBundle(bundle)
        let decoded = try LocalNoteTransferCodec.decodeBundle(data)
        XCTAssertEqual(decoded, bundle)
    }
}
