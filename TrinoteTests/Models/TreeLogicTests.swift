import XCTest
@testable import Trinote

final class TreeLogicTests: XCTestCase {

    // MARK: - NoteItem

    func testNoteItemFromResponse() {
        let response = TestFixtures.noteResponse(id: "n1", title: "Hello", childNoteIds: ["c1"])
        let item = NoteItem(from: response)
        XCTAssertEqual(item.noteId, "n1")
        XCTAssertEqual(item.title, "Hello")
        XCTAssertEqual(item.type, .text)
        XCTAssertTrue(item.hasChildren)
        XCTAssertFalse(item.isRoot)
    }

    func testRootNoteDetection() {
        let response = TestFixtures.noteResponse(id: "root", title: "Root", parentNoteIds: [], childNoteIds: ["c1"])
        let item = NoteItem(from: response)
        XCTAssertTrue(item.isRoot)
    }

    func testClonedNoteHasMultipleParents() {
        let response = TestFixtures.noteResponse(
            id: "cloned",
            title: "Cloned",
            parentNoteIds: ["p1", "p2"]
        )
        let item = NoteItem(from: response)
        XCTAssertEqual(item.parentNoteIds.count, 2)
        XCTAssertEqual(item.parentBranchIds.count, 2)
    }

    // MARK: - TreeNode

    func testTreeNodeTitleNoPrefix() {
        let node = makeNode(branchPrefix: nil, noteTitle: "My Note")
        XCTAssertEqual(node.title, "My Note")
    }

    func testTreeNodeTitleWithPrefix() {
        let node = makeNode(branchPrefix: "01", noteTitle: "Introduction")
        XCTAssertEqual(node.title, "01 - Introduction")
    }

    func testTreeNodeTitleEmptyPrefix() {
        let node = makeNode(branchPrefix: "", noteTitle: "Chapter")
        XCTAssertEqual(node.title, "Chapter")
    }

    func testTreeNodeHashIsIdentityBased() {
        let node1 = makeNode(branchId: "b1", noteTitle: "Note A")
        let node2 = makeNode(branchId: "b1", noteTitle: "Note B (different title)")
        XCTAssertEqual(node1.hashValue, node2.hashValue)

        let node3 = makeNode(branchId: "b2", noteTitle: "Note A")
        XCTAssertNotEqual(node1.hashValue, node3.hashValue)
    }

    // MARK: - BranchItem

    func testBranchItemFromResponse() {
        let response = TestFixtures.branchResponse(branchId: "b1", noteId: "n1", parentNoteId: "root", prefix: "01", notePosition: 100)
        let item = BranchItem(from: response)
        XCTAssertEqual(item.branchId, "b1")
        XCTAssertEqual(item.noteId, "n1")
        XCTAssertEqual(item.parentNoteId, "root")
        XCTAssertEqual(item.prefix, "01")
        XCTAssertEqual(item.notePosition, 100)
    }

    // MARK: - NoteType

    func testNoteTypeEditable() {
        XCTAssertTrue(NoteType.text.isEditable)
        XCTAssertTrue(NoteType.code.isEditable)
        XCTAssertFalse(NoteType.image.isEditable)
        XCTAssertTrue(NoteType.canvas.isEditable)
    }

    func testNoteTypeAdvanced() {
        XCTAssertTrue(NoteType.canvas.isAdvanced)
        XCTAssertTrue(NoteType.noteMap.isAdvanced)
        XCTAssertFalse(NoteType.text.isAdvanced)
    }

    func testNoteTypeCreationParameters() {
        XCTAssertEqual(NoteType.text.creationMime, "text/html")
        XCTAssertEqual(NoteType.text.creationInitialContent, "")
        XCTAssertEqual(NoteType.code.creationMime, "text/plain")
        XCTAssertEqual(NoteType.canvas.creationMime, "application/json")
        XCTAssertEqual(NoteType.canvas.creationInitialContent, NoteType.emptyCanvasNoteJSON)
        XCTAssertTrue(NoteType.emptyCanvasNoteJSON.contains("\"type\":\"excalidraw\""))
    }

    func testNoteTypeFromRawValue() {
        XCTAssertEqual(NoteType(rawValue: "text"), .text)
        XCTAssertEqual(NoteType(rawValue: "noteMap"), .noteMap)
        XCTAssertNil(NoteType(rawValue: "unknown_type"))
    }

    // MARK: - AttachmentItem

    func testAttachmentImageDetection() {
        let image = AttachmentItem(attachmentId: "a1", ownerId: "n1", role: "file", mime: "image/jpeg", title: "photo.jpg", position: 0, contentLength: 100)
        let doc = AttachmentItem(attachmentId: "a2", ownerId: "n1", role: "file", mime: "application/pdf", title: "doc.pdf", position: 0, contentLength: 200)
        XCTAssertTrue(image.isImage)
        XCTAssertFalse(doc.isImage)
    }

    func testAttachmentHumanReadableSize() {
        let response = TestFixtures.attachmentResponse()
        let item = AttachmentItem(from: response)
        XCTAssertFalse(item.humanReadableSize.isEmpty)
    }

    // MARK: - AttributeItem

    func testAttributeItemMapping() {
        let response = TestFixtures.attributeResponse(type: "relation", name: "template", value: "note123")
        let item = AttributeItem(from: response)
        XCTAssertEqual(item.type, .relation)
        XCTAssertEqual(item.name, "template")
        XCTAssertEqual(item.value, "note123")
    }

    // MARK: - APIError

    func testAPIErrorIsAuthError() {
        XCTAssertTrue(APIError.unauthorized.isAuthError)
        XCTAssertTrue(APIError.noToken.isAuthError)
        XCTAssertFalse(APIError.timeout.isAuthError)
    }

    func testAPIErrorIsNetworkError() {
        XCTAssertTrue(APIError.networkUnavailable.isNetworkError)
        XCTAssertTrue(APIError.timeout.isNetworkError)
        XCTAssertTrue(APIError.connectionRefused.isNetworkError)
        XCTAssertTrue(APIError.certificateError.isNetworkError)
        XCTAssertFalse(APIError.unauthorized.isNetworkError)
    }

    func testAPIErrorFromNSError() {
        XCTAssertTrue(APIError.from(NSError(domain: NSURLErrorDomain, code: NSURLErrorTimedOut)).isNetworkError)

        if case .networkUnavailable = APIError.from(NSError(domain: NSURLErrorDomain, code: NSURLErrorNotConnectedToInternet)) {} else {
            XCTFail("Expected networkUnavailable")
        }

        if case .certificateError = APIError.from(NSError(domain: NSURLErrorDomain, code: NSURLErrorServerCertificateUntrusted)) {} else {
            XCTFail("Expected certificateError")
        }

        if case .cancelled = APIError.from(NSError(domain: NSURLErrorDomain, code: NSURLErrorCancelled)) {} else {
            XCTFail("Expected cancelled")
        }
    }

    // MARK: - Helpers

    private func makeNode(branchId: String = "b1", branchPrefix: String? = nil, noteTitle: String = "Test") -> TreeNode {
        let branch = BranchItem(branchId: branchId, noteId: "n1", parentNoteId: "root", prefix: branchPrefix, notePosition: 10, isExpanded: false)
        let note = NoteItem(
            noteId: "n1", title: noteTitle, type: .text, mime: "text/html",
            isProtected: false, dateCreated: "", dateModified: "",
            parentNoteIds: ["root"], childNoteIds: [], parentBranchIds: [], childBranchIds: [],
            attributes: []
        )
        return TreeNode(branch: branch, note: note)
    }
}
