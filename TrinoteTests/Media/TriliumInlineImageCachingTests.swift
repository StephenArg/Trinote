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
        XCTAssertEqual(bodies[0].parentNoteIds, ["root"])
    }

    /// Image and file bodies are pictures and attachments, not pages with pictures, and can be huge.
    func testCachedNoteBodiesLeavesOutImageAndFileNotes() throws {
        try persistence.cacheNote(from: TestFixtures.noteResponse(id: "page", title: "Page"), serverProfileId: "s1")
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: "photo", title: "Photo", type: "image", mime: "image/png"),
            serverProfileId: "s1"
        )
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: "pdf", title: "PDF", type: "file", mime: "application/pdf"),
            serverProfileId: "s1"
        )
        try persistence.cacheNoteContent("page", content: Data(#"<p><img src="api/images/photo/x.png"></p>"#.utf8), serverProfileId: "s1")
        try persistence.cacheNoteContent("photo", content: Data([0x89, 0x50, 0x4E, 0x47]), serverProfileId: "s1")
        try persistence.cacheNoteContent("pdf", content: Data("%PDF-1.7".utf8), serverProfileId: "s1")

        let bodies = try persistence.cachedNoteBodies(serverProfileId: "s1")

        XCTAssertEqual(bodies.map(\.noteId), ["page"])
    }

    // MARK: - Link previews (issue #35)

    private static let linkPreviewBody = #"<p><span class="link-mention" data-url="https://github.com/x" data-favicon="api/attachments/fav1/image/github.com.svg"></span></p><section class="link-embed" data-url="https://example.com/" data-embed-type="opengraph" data-favicon="api/attachments/fav2/image/example.com.ico" data-image="api/attachments/cover1/image/example.com-1a2b3c4d.jpeg"></section>"#

    func testExtractImageReferencesIncludesLinkPreviewPictures() {
        let refs = TriliumInlineImageCaching.extractImageReferences(from: Self.linkPreviewBody)
        XCTAssertEqual(refs, [
            .init(routeType: "attachments", entityId: "fav1"),
            .init(routeType: "attachments", entityId: "fav2"),
            .init(routeType: "attachments", entityId: "cover1"),
        ])
        // The same attribute names outside a link preview are not pictures.
        XCTAssertTrue(TriliumInlineImageCaching.extractImageReferences(
            from: #"<div data-image="api/attachments/x1/image/a.png"></div>"#
        ).isEmpty)
    }

    func testInlineAttachmentImagesLeavesLinkPreviewAttributesAsStored() async {
        let rewritten = await TriliumInlineImageCaching.inlineAttachmentImages(
            in: Self.linkPreviewBody,
            client: nil,
            persistence: persistence,
            serverProfileId: "s1",
            sourceNoteId: "host",
            parentNoteIds: []
        )
        XCTAssertEqual(rewritten, Self.linkPreviewBody)
    }

    // MARK: - Server files (issue #40)

    private static let serverPNG = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00])
    private static let newerServerPNG = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x01])

    private func loadServerFile(
        _ path: String,
        client: MockTriliumClient?,
        refetch: Bool = false
    ) async -> Data? {
        await TriliumInlineImageCaching.loadImageData(
            routeType: ServerFileImageURLs.route,
            entityId: path,
            client: client,
            persistence: persistence,
            serverProfileId: "s1",
            sourceNoteId: "hostNote",
            parentNoteIds: ["root"],
            refetch: refetch
        )
    }

    func testInlineRewritesServerFilesOnlyWithABase() async {
        let html = #"<p><img src="/media/a.png"><img src="https://other.test/b.png"></p>"#
        let without = await TriliumInlineImageCaching.inlineAttachmentImages(
            in: html, client: nil, persistence: persistence,
            serverProfileId: "s1", sourceNoteId: "n", parentNoteIds: []
        )
        XCTAssertEqual(without, html)

        let with = await TriliumInlineImageCaching.inlineAttachmentImages(
            in: html, client: nil, persistence: persistence,
            serverProfileId: "s1", sourceNoteId: "n", parentNoteIds: [],
            serverFileBase: URL(string: "https://notes.example.com")!, serverFileVersion: 2
        )
        XCTAssertEqual(
            with,
            #"<p><img src="trinote-img://server/file?path=/media/a.png&amp;v=2"><img src="https://other.test/b.png"></p>"#
        )
    }

    func testServerFileIsDownloadedOnceThenServedFromTheCache() async throws {
        let client = MockTriliumClient()
        await client.setServerFileResult(path: "/media/a.png", .success(Self.serverPNG))

        let first = await loadServerFile("/media/a.png", client: client)
        XCTAssertEqual(first, Self.serverPNG)
        let row = try XCTUnwrap(
            try persistence.fetchCachedImage(entityId: "/media/a.png", entityType: "server", serverProfileId: "s1")
        )
        XCTAssertEqual(row.data, Self.serverPNG)

        await client.setServerFileResult(path: "/media/a.png", .success(Self.newerServerPNG))
        let second = await loadServerFile("/media/a.png", client: client)
        XCTAssertEqual(second, Self.serverPNG)
        let offline = await loadServerFile("/media/a.png", client: nil)
        XCTAssertEqual(offline, Self.serverPNG)
        let calls = await client.serverFileCalls
        XCTAssertEqual(calls, ["/media/a.png"])
    }

    func testServerFileLoginPageIsNotCached() async throws {
        let client = MockTriliumClient()
        await client.setServerFileResult(path: "/media/a.png", .success(Data("<!DOCTYPE html><title>Sign in</title>".utf8)))
        let data = await loadServerFile("/media/a.png", client: client)
        XCTAssertNil(data)
        XCTAssertNil(try persistence.fetchCachedImage(entityId: "/media/a.png", entityType: "server", serverProfileId: "s1"))
    }

    func testServerFileRefetchReplacesTheCachedCopyAndKeepsItOnFailure() async throws {
        let client = MockTriliumClient()
        await client.setServerFileResult(path: "/media/a.png", .success(Self.serverPNG))
        _ = await loadServerFile("/media/a.png", client: client)

        await client.setServerFileResult(path: "/media/a.png", .success(Self.newerServerPNG))
        let refreshed = await loadServerFile("/media/a.png", client: client, refetch: true)
        XCTAssertEqual(refreshed, Self.newerServerPNG)
        XCTAssertEqual(
            try persistence.fetchCachedImage(entityId: "/media/a.png", entityType: "server", serverProfileId: "s1")?.data,
            Self.newerServerPNG
        )

        await client.setServerFileResult(path: "/media/a.png", .failure(APIError.serverError(statusCode: 502, message: nil)))
        let failed = await loadServerFile("/media/a.png", client: client, refetch: true)
        XCTAssertEqual(failed, Self.newerServerPNG)
    }

    func testExtractServerFileReferences() {
        let refs = TriliumInlineImageCaching.extractServerFileReferences(
            from: #"<img src="/media/a.png"><img src="api/images/n1/x.png">"#,
            serverBase: URL(string: "https://notes.example.com")!
        )
        XCTAssertEqual(refs, [.init(routeType: "server", entityId: "/media/a.png")])
    }
}
