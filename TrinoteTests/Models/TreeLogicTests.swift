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

    /// Desktop-style geo map: Trilium `type=book` with `#viewType=geoMap` on the note.
    func testSemanticGeoMapBookWithViewTypeLabel() {
        let attrs = [
            AttributeResponse(
                attributeId: "a1", noteId: "gm1", type: "label", name: "viewType", value: "geoMap",
                position: 0, isInheritable: false, utcDateModified: nil
            ),
            AttributeResponse(
                attributeId: "a2", noteId: "gm1", type: "label", name: "collection", value: "",
                position: 10, isInheritable: false, utcDateModified: nil
            ),
        ]
        let response = TestFixtures.noteResponse(id: "gm1", title: "Map", type: "book", mime: "text/html", attributes: attrs)
        let item = NoteItem(from: response)
        XCTAssertTrue(item.isSemanticGeoMap)
        XCTAssertEqual(item.viewTypeLabelValue, "geoMap")
        XCTAssertEqual(item.uiNoteTypeDisplayName, NoteType.geoMap.displayName)
        XCTAssertEqual(item.resolvedIconName, NoteType.geoMap.iconName)
    }

    func testSemanticGeoMapViewTypeCaseInsensitive() {
        let attrs = [
            AttributeResponse(
                attributeId: "a1", noteId: "gm2", type: "label", name: "viewType", value: "GEOMAP",
                position: 0, isInheritable: false, utcDateModified: nil
            ),
        ]
        let response = TestFixtures.noteResponse(id: "gm2", title: "M", type: "book", attributes: attrs)
        XCTAssertTrue(NoteItem(from: response).isSemanticGeoMap)
    }

    /// Desktop default: `book` + `~template` → `_template_geo_map` without `#viewType` (matches Trilium’s built-in geographic map template).
    func testSemanticGeoMapBookWithTemplateRelationOnly() {
        let attrs = [
            AttributeResponse(
                attributeId: "t1", noteId: "gm3", type: "relation", name: "template", value: "_template_geo_map",
                position: 0, isInheritable: false, utcDateModified: nil
            ),
            AttributeResponse(
                attributeId: "h1", noteId: "gm3", type: "label", name: "hidePromotedAttributes", value: "",
                position: 10, isInheritable: false, utcDateModified: nil
            ),
        ]
        let response = TestFixtures.noteResponse(id: "gm3", title: "Trilium", type: "book", mime: "", attributes: attrs)
        let item = NoteItem(from: response)
        XCTAssertEqual(item.templateRelationValue, "_template_geo_map")
        XCTAssertNil(item.viewTypeLabelValue)
        XCTAssertTrue(item.isSemanticGeoMap)
        XCTAssertEqual(item.uiNoteTypeDisplayName, NoteType.geoMap.displayName)
    }

    /// Server may store the type as `file` when a template is applied; the `~template` relation is the reliable signal.
    func testSemanticGeoMapFileTypeWithTemplateRelation() {
        let attrs = [
            AttributeResponse(
                attributeId: "t1", noteId: "gm4", type: "relation", name: "template", value: "_template_geo_map",
                position: 0, isInheritable: false, utcDateModified: nil
            ),
        ]
        let response = TestFixtures.noteResponse(id: "gm4", title: "Map", type: "file", mime: "application/json", attributes: attrs)
        let item = NoteItem(from: response)
        XCTAssertTrue(item.isSemanticGeoMap)
        XCTAssertEqual(item.uiNoteTypeDisplayName, NoteType.geoMap.displayName)
    }

    /// Calendar journal root is `book` + `#calendarRoot`; must not be classified as geo map.
    func testCalendarRootBookIsNotSemanticGeoMapEvenWithViewType() {
        let attrs = [
            AttributeResponse(
                attributeId: "a1", noteId: "cal1", type: "label", name: "calendarRoot", value: "",
                position: 0, isInheritable: false, utcDateModified: nil
            ),
            AttributeResponse(
                attributeId: "a2", noteId: "cal1", type: "label", name: "viewType", value: "calendar",
                position: 10, isInheritable: false, utcDateModified: nil
            ),
        ]
        let response = TestFixtures.noteResponse(id: "cal1", title: "Journal", type: "book", attributes: attrs)
        let item = NoteItem(from: response)
        XCTAssertTrue(item.isCalendarRoot)
        XCTAssertFalse(item.isSemanticGeoMap)
        XCTAssertEqual(item.uiNoteTypeDisplayName, NoteType.book.displayName)
    }

    func testNativeGeoMapTypeIsSemanticGeoMap() {
        let response = TestFixtures.noteResponse(id: "g1", title: "G", type: "geoMap", mime: "application/json")
        let item = NoteItem(from: response)
        XCTAssertTrue(item.isSemanticGeoMap)
        XCTAssertEqual(item.uiNoteTypeDisplayName, NoteType.geoMap.displayName)
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

    /// `TreeNode` hashes `branch.branchId` and `note` so rows refresh when metadata changes (see `DomainModels.swift`).
    func testTreeNodeHashIncludesBranchAndNote() {
        let node1 = makeNode(branchId: "b1", noteTitle: "Note A")
        let node2 = makeNode(branchId: "b1", noteTitle: "Note B (different title)")
        XCTAssertNotEqual(node1.hashValue, node2.hashValue, "Different note payload should change hash")

        let node3 = makeNode(branchId: "b1", noteTitle: "Note A")
        XCTAssertEqual(node1.hashValue, node3.hashValue)

        let node4 = makeNode(branchId: "b2", noteTitle: "Note A")
        XCTAssertNotEqual(node1.hashValue, node4.hashValue)
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
        XCTAssertEqual(NoteType.calendar.triliumStorageType, "book")
        let calAttrs = NoteType.calendar.creationInitialAttributes
        XCTAssertEqual(calAttrs.count, 6)
        let byName = Dictionary(uniqueKeysWithValues: calAttrs.map { ($0.name, $0) })
        XCTAssertEqual(byName["calendarRoot"]?.type, "label")
        XCTAssertEqual(byName["sorted"]?.type, "label")
        XCTAssertEqual(byName["iconClass"], NoteCreationAttribute(type: "label", name: "iconClass", value: "bx bx-calendar"))
        XCTAssertEqual(byName["template"], NoteCreationAttribute(type: "relation", name: "template", value: "Calendar"))
        XCTAssertEqual(byName["calendar:view"], NoteCreationAttribute(type: "label", name: "calendar:view", value: "dayGridMonth"))
        XCTAssertEqual(byName["viewType"], NoteCreationAttribute(type: "label", name: "viewType", value: "calendar"))

        let geoAttrs = NoteType.geoMap.creationInitialAttributes
        XCTAssertEqual(geoAttrs.count, 9)
        XCTAssertTrue(geoAttrs.contains(NoteCreationAttribute(type: "label", name: "collection", value: "")))
        XCTAssertTrue(geoAttrs.contains(NoteCreationAttribute(type: "label", name: "viewType", value: "geoMap")))
        XCTAssertTrue(geoAttrs.contains(NoteCreationAttribute(type: "label", name: "iconClass", value: "bx bx bx-map-alt")))
        XCTAssertTrue(geoAttrs.contains(NoteCreationAttribute(type: "label", name: "subtreeHidden", value: "false")))
        XCTAssertTrue(geoAttrs.contains(NoteCreationAttribute(type: "relation", name: "template", value: "Geo Map")))
        XCTAssertEqual(geoAttrs.filter { $0.name == "hidePromotedAttributes" }.count, 2)
        let geoSchema = "promoted,alias=Geolocation,single,text"
        XCTAssertEqual(geoAttrs.filter { $0.name == "label:geolocation" && !$0.isInheritable }.count, 1)
        XCTAssertEqual(geoAttrs.filter { $0.name == "label:geolocation" && $0.isInheritable }.count, 1)
        XCTAssertTrue(geoAttrs.contains(NoteCreationAttribute(type: "label", name: "label:geolocation", value: geoSchema)))
        XCTAssertTrue(geoAttrs.contains(NoteCreationAttribute(type: "label", name: "label:geolocation", value: geoSchema, isInheritable: true)))
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
