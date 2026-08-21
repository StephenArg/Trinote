import XCTest
import SwiftData
@testable import Trinote

@MainActor
final class TriliumInlineImageCachingTests: XCTestCase {
    var persistence: PersistenceManager!

    override func setUp() {
        super.setUp()
        let schema = Schema([
            ServerProfile.self,
            CachedNote.self,
            CachedImageData.self,
        ])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try! ModelContainer(for: schema, configurations: [config])
        persistence = PersistenceManager(container: container)
    }

    func testExtractImageReferencesDedupesAttributes() {
        let html = """
        <img src="api/attachments/att1/file" data-src="api/attachments/att1/open">
        <img src="api/images/noteA/avatar">
        """
        let refs = TriliumInlineImageCaching.extractImageReferences(from: html)
        XCTAssertEqual(refs.count, 2)
        XCTAssertTrue(refs.contains(.init(routeType: "attachments", entityId: "att1")))
        XCTAssertTrue(refs.contains(.init(routeType: "images", entityId: "noteA")))
    }

    func testFetchAndCacheDoesNotPersistNonImageNoteBody() async throws {
        let json = Data(#"{"elements":[]}"#.utf8)
        let client = MockTriliumClient()
        await client.setNoteContentResult("canvasNote", .success(json))

        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: "canvasNote", title: "Canvas", type: "canvas"),
            serverProfileId: "s1"
        )

        let ref = TriliumInlineImageCaching.Reference(routeType: "images", entityId: "canvasNote")
        let cached = await TriliumInlineImageCaching.fetchAndCache(
            reference: ref,
            client: client,
            persistence: persistence,
            serverProfileId: "s1",
            sourceNoteId: "canvasNote",
            parentNoteIds: ["root"]
        )
        XCTAssertFalse(cached)
        XCTAssertNil(
            try persistence.fetchCachedImage(entityId: "canvasNote", entityType: "images", serverProfileId: "s1")
        )
        let contentCalls = await client.getNoteContentCalls
        XCTAssertEqual(contentCalls, ["canvasNote"])
    }

    func testFetchAndCachePersistsPlausibleAttachmentBytes() async throws {
        let pngHeader = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00])
        let client = MockTriliumClient()
        await client.setAttachmentContentResult(.success(pngHeader))

        let ref = TriliumInlineImageCaching.Reference(routeType: "attachments", entityId: "att99")
        let cached = await TriliumInlineImageCaching.fetchAndCache(
            reference: ref,
            client: client,
            persistence: persistence,
            serverProfileId: "s1",
            sourceNoteId: "hostNote",
            parentNoteIds: ["root"]
        )
        XCTAssertTrue(cached)
        let row = try XCTUnwrap(
            try persistence.fetchCachedImage(entityId: "att99", entityType: "attachments", serverProfileId: "s1")
        )
        XCTAssertEqual(row.data, pngHeader)
    }

    func testInlineAttachmentImagesRewritesAttachmentsToSchemeURLWithoutFetching() async {
        let html = #"<img src="api/attachments/att1/image.jpg" alt="photo">"#
        let rewritten = await TriliumInlineImageCaching.inlineAttachmentImages(
            in: html,
            client: nil,
            persistence: persistence,
            serverProfileId: "s1",
            sourceNoteId: "host",
            parentNoteIds: []
        )
        XCTAssertTrue(rewritten.contains("trinote-img://attachments/att1"))
        XCTAssertFalse(rewritten.contains("api/attachments"))
        XCTAssertFalse(rewritten.contains("data:"))
    }

    func testInlineAttachmentImagesLeavesUnresolvedNoteImagesUntouched() async {
        let html = #"<img src="api/images/noteA/avatar.png">"#
        let rewritten = await TriliumInlineImageCaching.inlineAttachmentImages(
            in: html,
            client: nil,
            persistence: persistence,
            serverProfileId: "s1",
            sourceNoteId: "host",
            parentNoteIds: []
        )
        XCTAssertEqual(rewritten, html)
    }

    func testInlineAttachmentImagesRewritesCachedNoteImagesToSchemeURL() async throws {
        let pngHeader = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00])
        try persistence.cacheImage(
            entityId: "noteA",
            entityType: "images",
            data: pngHeader,
            mime: "image/png",
            serverProfileId: "s1"
        )
        let html = #"<img src="api/images/noteA/avatar.png">"#
        let rewritten = await TriliumInlineImageCaching.inlineAttachmentImages(
            in: html,
            client: nil,
            persistence: persistence,
            serverProfileId: "s1",
            sourceNoteId: "host",
            parentNoteIds: []
        )
        XCTAssertTrue(rewritten.contains(#"src="trinote-img://images/noteA""#))
        XCTAssertTrue(rewritten.contains(#"data-trinote-image-note-id="noteA""#))
        XCTAssertFalse(rewritten.contains("data:"))
        XCTAssertFalse(rewritten.contains("api/images"))
    }

    func testCachedNoteBodiesSkipsEmptyContent() throws {
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: "empty", title: "Empty"),
            serverProfileId: "s1"
        )
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: "filled", title: "Filled"),
            serverProfileId: "s1"
        )
        try persistence.cacheNoteContent("filled", content: Data("hello".utf8), serverProfileId: "s1")

        let bodies = try persistence.cachedNoteBodies(serverProfileId: "s1")
        XCTAssertEqual(bodies.count, 1)
        XCTAssertEqual(bodies[0].noteId, "filled")
    }
}
