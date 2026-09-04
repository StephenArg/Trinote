import XCTest
import SwiftData
@testable import Trinote

@MainActor
final class CrossInstanceNoteCopyServiceTests: XCTestCase {
    var persistence: PersistenceManager!
    var source: MockTriliumClient!
    var dest: MockTriliumClient!

    override func setUp() {
        super.setUp()
        let schema = Schema([
            ServerProfile.self,
            CachedNote.self,
            CachedBranch.self,
            CachedAttribute.self,
            RecentNote.self,
            OpenNoteTab.self,
            FavoriteNote.self,
            RecentSearch.self,
            DraftContent.self,
            PendingNoteCreation.self,
            PendingNoteBodyUpload.self,
            PendingBranchMove.self,
            PendingNoteDeletion.self,
            PendingAttachmentImport.self,
            SyncStatus.self,
            CachedImageData.self,
            CacheExcludedRootNote.self,
        ])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try! ModelContainer(for: schema, configurations: [config])
        persistence = PersistenceManager(container: container)
        source = MockTriliumClient(baseURL: URL(string: "https://source.example")!)
        dest = MockTriliumClient(baseURL: URL(string: "https://dest.example")!)
    }

    private func copy(
        noteId: String,
        includeSubtree: Bool,
        protectedSessionActive: Bool = false
    ) async throws -> CrossInstanceNoteCopyService.CopyResult {
        try await CrossInstanceNoteCopyService.copy(
            sourceNoteId: noteId,
            includeSubtree: includeSubtree,
            sourceClient: source,
            destClient: dest,
            persistence: persistence,
            sourceProfileId: "src",
            protectedSessionActive: protectedSessionActive
        )
    }

    func testCopySingleNoteCreatesUnderDestRootNotOnSource() async throws {
        await source.setNoteResult(
            "n1",
            .success(
                TestFixtures.noteResponse(
                    id: "n1",
                    title: "Hello",
                    childNoteIds: ["child"],
                    childBranchIds: ["b-child"]
                )
            )
        )
        await source.setNoteContentResult("n1", .success(Data("<p>Hi</p>".utf8)))

        let result = try await copy(noteId: "n1", includeSubtree: false)

        XCTAssertEqual(result.copiedCount, 1)
        let destCreates = await dest.createNoteCalls
        let sourceCreates = await source.createNoteCalls
        XCTAssertTrue(sourceCreates.isEmpty)
        XCTAssertEqual(destCreates.count, 1)
        XCTAssertEqual(destCreates[0].parentNoteId, TriliumTreeConstants.rootNoteId)
        XCTAssertEqual(destCreates[0].title, "Hello")
        XCTAssertEqual(destCreates[0].type, "text")
        XCTAssertFalse(result.destRootNoteId.hasPrefix("n1"))
    }

    func testDisambiguatedTitleUnchangedWhenNoSiblingMatch() {
        let title = CrossInstanceNoteCopyService.disambiguatedTitle(
            "Hello",
            existingSiblingTitles: ["World", "Inbox"]
        )
        XCTAssertEqual(title, "Hello")
    }

    func testDisambiguatedTitleAppendsSevenDigitIdOnCollision() {
        let title = CrossInstanceNoteCopyService.disambiguatedTitle(
            "Hello",
            existingSiblingTitles: ["Hello", "World"],
            makeSuffix: { "4829103" }
        )
        XCTAssertEqual(title, "Hello 4829103")
    }

    func testDisambiguatedTitleRetriesWhenSuffixedTitleAlsoExists() {
        var suffixes = ["1111111", "2222222"].makeIterator()
        let title = CrossInstanceNoteCopyService.disambiguatedTitle(
            "Hello",
            existingSiblingTitles: ["Hello", "Hello 1111111"],
            makeSuffix: { suffixes.next() ?? "0000000" }
        )
        XCTAssertEqual(title, "Hello 2222222")
    }

    func testCopyToDestRootAppendsSevenDigitIdWhenTopLevelTitleExists() async throws {
        await dest.setNoteResult(
            "root",
            .success(
                TestFixtures.noteResponse(
                    id: "root",
                    title: "root",
                    childNoteIds: ["existing"],
                    childBranchIds: ["b-existing"]
                )
            )
        )
        await dest.setNoteResult(
            "existing",
            .success(TestFixtures.noteResponse(id: "existing", title: "Hello"))
        )
        await source.setNoteResult(
            "n1",
            .success(TestFixtures.noteResponse(id: "n1", title: "Hello"))
        )
        await source.setNoteContentResult("n1", .success(Data("<p>Hi</p>".utf8)))

        _ = try await copy(noteId: "n1", includeSubtree: false)

        let destCreates = await dest.createNoteCalls
        XCTAssertEqual(destCreates.count, 1)
        XCTAssertEqual(destCreates[0].parentNoteId, TriliumTreeConstants.rootNoteId)
        let copiedTitle = destCreates[0].title
        XCTAssertTrue(copiedTitle.hasPrefix("Hello "))
        let suffix = copiedTitle.dropFirst("Hello ".count)
        XCTAssertEqual(suffix.count, 7)
        XCTAssertTrue(suffix.allSatisfy(\.isNumber))
    }

    func testCopySubtreeOnlyDisambiguatesDestRootNote() async throws {
        await dest.setNoteResult(
            "root",
            .success(
                TestFixtures.noteResponse(
                    id: "root",
                    title: "root",
                    childNoteIds: ["existing"],
                    childBranchIds: ["b-existing"]
                )
            )
        )
        await dest.setNoteResult(
            "existing",
            .success(TestFixtures.noteResponse(id: "existing", title: "Parent"))
        )
        await source.setNoteResult(
            "p",
            .success(
                TestFixtures.noteResponse(
                    id: "p",
                    title: "Parent",
                    childNoteIds: ["c"],
                    childBranchIds: ["b-c"]
                )
            )
        )
        await source.setNoteResult(
            "c",
            .success(TestFixtures.noteResponse(id: "c", title: "Child", parentNoteIds: ["p"]))
        )
        await source.setNoteContentResult("p", .success(Data("<p>P</p>".utf8)))
        await source.setNoteContentResult("c", .success(Data("<p>C</p>".utf8)))

        _ = try await copy(noteId: "p", includeSubtree: true)

        let destCreates = await dest.createNoteCalls
        XCTAssertEqual(destCreates.count, 2)
        XCTAssertTrue(destCreates[0].title.hasPrefix("Parent "))
        XCTAssertEqual(destCreates[1].title, "Child")
    }

    func testCopySubtreePlacesChildrenUnderNewDestParent() async throws {
        await source.setNoteResult(
            "p",
            .success(
                TestFixtures.noteResponse(
                    id: "p",
                    title: "Parent",
                    childNoteIds: ["c"],
                    childBranchIds: ["b-c"]
                )
            )
        )
        await source.setNoteResult(
            "c",
            .success(
                TestFixtures.noteResponse(
                    id: "c",
                    title: "Child",
                    parentNoteIds: ["p"]
                )
            )
        )
        await source.setNoteContentResult("p", .success(Data("<p>P</p>".utf8)))
        await source.setNoteContentResult("c", .success(Data("<p>C</p>".utf8)))

        let result = try await copy(noteId: "p", includeSubtree: true)

        XCTAssertEqual(result.copiedCount, 2)
        let destCreates = await dest.createNoteCalls
        XCTAssertEqual(destCreates.count, 2)
        XCTAssertEqual(destCreates[0].parentNoteId, TriliumTreeConstants.rootNoteId)
        XCTAssertEqual(destCreates[0].title, "Parent")
        XCTAssertEqual(destCreates[1].title, "Child")
        XCTAssertNotEqual(destCreates[1].parentNoteId, TriliumTreeConstants.rootNoteId)
        XCTAssertNotEqual(destCreates[1].parentNoteId, "p")
        XCTAssertEqual(destCreates[1].parentNoteId, result.destRootNoteId)
    }

    func testCopySubtreeSkipsHiddenSystemChildren() async throws {
        await source.setNoteResult(
            "p",
            .success(
                TestFixtures.noteResponse(
                    id: "p",
                    title: "Parent",
                    childNoteIds: ["n1", "_hidden"],
                    childBranchIds: ["b-n1", "b-hidden"]
                )
            )
        )
        await source.setNoteResult(
            "n1",
            .success(TestFixtures.noteResponse(id: "n1", title: "Normal", parentNoteIds: ["p"]))
        )
        await source.setNoteResult(
            "_hidden",
            .success(TestFixtures.noteResponse(id: "_hidden", title: "Hidden", parentNoteIds: ["p"]))
        )
        await source.setNoteContentResult("p", .success(Data("<p>P</p>".utf8)))
        await source.setNoteContentResult("n1", .success(Data("<p>N</p>".utf8)))
        await source.setNoteContentResult("_hidden", .success(Data("<p>H</p>".utf8)))

        let result = try await copy(noteId: "p", includeSubtree: true)

        XCTAssertEqual(result.copiedCount, 2)
        let destCreates = await dest.createNoteCalls
        XCTAssertEqual(destCreates.map(\.title), ["Parent", "Normal"])
        XCTAssertFalse(destCreates.contains { $0.title == "Hidden" })
    }

    func testCopySubtreeCreatesCloneNoteIdOnce() async throws {
        await source.setNoteResult(
            "p",
            .success(
                TestFixtures.noteResponse(
                    id: "p",
                    title: "Parent",
                    childNoteIds: ["a", "b"],
                    childBranchIds: ["b-a", "b-b"]
                )
            )
        )
        await source.setNoteResult(
            "a",
            .success(
                TestFixtures.noteResponse(
                    id: "a",
                    title: "A",
                    parentNoteIds: ["p"],
                    childNoteIds: ["c"],
                    childBranchIds: ["b-ac"]
                )
            )
        )
        await source.setNoteResult(
            "b",
            .success(
                TestFixtures.noteResponse(
                    id: "b",
                    title: "B",
                    parentNoteIds: ["p"],
                    childNoteIds: ["c"],
                    childBranchIds: ["b-bc"]
                )
            )
        )
        await source.setNoteResult(
            "c",
            .success(
                TestFixtures.noteResponse(
                    id: "c",
                    title: "Clone",
                    parentNoteIds: ["a", "b"]
                )
            )
        )
        for id in ["p", "a", "b", "c"] {
            await source.setNoteContentResult(id, .success(Data("<p>\(id)</p>".utf8)))
        }

        let result = try await copy(noteId: "p", includeSubtree: true)

        XCTAssertEqual(result.copiedCount, 4)
        let destCreates = await dest.createNoteCalls
        XCTAssertEqual(destCreates.map(\.title), ["Parent", "A", "Clone", "B"])
        XCTAssertEqual(destCreates.filter { $0.title == "Clone" }.count, 1)
    }

    func testCopyProtectedSourceFailsWithoutSession() async throws {
        await source.setNoteResult(
            "secret",
            .success(TestFixtures.noteResponse(id: "secret", title: "Secret", isProtected: true))
        )
        await source.setNoteContentResult("secret", .success(Data("<p>nope</p>".utf8)))

        do {
            _ = try await copy(noteId: "secret", includeSubtree: false)
            XCTFail("Expected protected failure")
        } catch let error as CrossInstanceNoteCopyService.CopyError {
            guard case .protectedNote = error else {
                XCTFail("Unexpected error \(error)")
                return
            }
        }
        let destCreates = await dest.createNoteCalls
        XCTAssertTrue(destCreates.isEmpty)
    }

    func testCopySubtreeSkipsProtectedDescendant() async throws {
        await source.setNoteResult(
            "p",
            .success(
                TestFixtures.noteResponse(
                    id: "p",
                    title: "Parent",
                    childNoteIds: ["secret"],
                    childBranchIds: ["b-secret"]
                )
            )
        )
        await source.setNoteResult(
            "secret",
            .success(
                TestFixtures.noteResponse(
                    id: "secret",
                    title: "Secret",
                    isProtected: true,
                    parentNoteIds: ["p"]
                )
            )
        )
        await source.setNoteContentResult("p", .success(Data("<p>P</p>".utf8)))
        await source.setNoteContentResult("secret", .success(Data("<p>S</p>".utf8)))

        let result = try await copy(noteId: "p", includeSubtree: true)

        XCTAssertEqual(result.copiedCount, 1)
        XCTAssertEqual(result.skippedProtectedCount, 1)
        let destCreates = await dest.createNoteCalls
        XCTAssertEqual(destCreates.map(\.title), ["Parent"])
    }

    func testCopyLabelsSkipRelations() async throws {
        await source.setNoteResult(
            "n1",
            .success(
                TestFixtures.noteResponse(
                    id: "n1",
                    title: "Labeled",
                    attributes: [
                        TestFixtures.attributeResponse(
                            attributeId: "i1",
                            noteId: "n1",
                            type: "label",
                            name: "iconClass",
                            value: "bx bx-star"
                        ),
                        TestFixtures.attributeResponse(
                            attributeId: "t1",
                            noteId: "n1",
                            type: "relation",
                            name: "template",
                            value: "tpl-id"
                        ),
                        TestFixtures.attributeResponse(
                            attributeId: "s1",
                            noteId: "n1",
                            type: "label",
                            name: TriliumSharing.sharedLabelName,
                            value: ""
                        ),
                    ]
                )
            )
        )
        await source.setNoteContentResult("n1", .success(Data("<p>L</p>".utf8)))

        _ = try await copy(noteId: "n1", includeSubtree: false)

        let attrs = await dest.createAttributeCalls
        XCTAssertEqual(attrs.map(\.name), ["iconClass"])
        XCTAssertEqual(attrs.first?.type, "label")
        XCTAssertEqual(attrs.first?.value, "bx bx-star")
    }

    func testCopyImageNoteUploadsBinaryBody() async throws {
        let png = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x01, 0x02, 0x03])
        await source.setNoteResult(
            "img1",
            .success(
                TestFixtures.noteResponse(
                    id: "img1",
                    title: "Photo",
                    type: "image",
                    mime: "image/png"
                )
            )
        )
        await source.setNoteContentResult("img1", .success(png))

        _ = try await copy(noteId: "img1", includeSubtree: false)

        let creates = await dest.createNoteCalls
        XCTAssertEqual(creates.count, 1)
        XCTAssertEqual(creates[0].type, "image")
        XCTAssertEqual(creates[0].mime, "image/png")
        XCTAssertEqual(creates[0].content, "")
        let uploads = await dest.updateNoteContentCalls
        XCTAssertEqual(uploads.count, 1)
        XCTAssertEqual(uploads[0].1, png)
    }

    func testCopyFileNoteUploadsBinaryBody() async throws {
        let pdf = Data([0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x34])
        await source.setNoteResult(
            "f1",
            .success(
                TestFixtures.noteResponse(
                    id: "f1",
                    title: "Doc",
                    type: "file",
                    mime: "application/pdf"
                )
            )
        )
        await source.setNoteContentResult("f1", .success(pdf))

        _ = try await copy(noteId: "f1", includeSubtree: false)

        let creates = await dest.createNoteCalls
        XCTAssertEqual(creates[0].type, "file")
        let uploads = await dest.updateNoteContentCalls
        XCTAssertEqual(uploads.last?.1, pdf)
    }

    func testCopyCanvasPreservesJSONType() async throws {
        let json = NoteType.emptyCanvasNoteJSON
        await source.setNoteResult(
            "c1",
            .success(
                TestFixtures.noteResponse(
                    id: "c1",
                    title: "Sketch",
                    type: "canvas",
                    mime: "application/json"
                )
            )
        )
        await source.setNoteContentResult("c1", .success(Data(json.utf8)))

        _ = try await copy(noteId: "c1", includeSubtree: false)

        let creates = await dest.createNoteCalls
        XCTAssertEqual(creates[0].type, "canvas")
        XCTAssertEqual(creates[0].mime, "application/json")
        XCTAssertTrue(creates[0].content.contains("excalidraw"))
        let binaryUploads = await dest.updateNoteContentCalls
        XCTAssertTrue(binaryUploads.isEmpty)
    }

    func testCopyTextNoteRewritesAttachmentImageURLs() async throws {
        let png = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
        let html = #"<figure class="image"><img src="api/attachments/att-src/image/photo.png"></figure>"#
        await source.setNoteResult(
            "n1",
            .success(TestFixtures.noteResponse(id: "n1", title: "With photo"))
        )
        await source.setNoteContentResult("n1", .success(Data(html.utf8)))
        await source.setAttachments(
            noteId: "n1",
            [TestFixtures.attachmentResponse(attachmentId: "att-src", ownerId: "n1", title: "photo.png", mime: "image/png")]
        )
        await source.setAttachmentBytes(id: "att-src", png)

        _ = try await copy(noteId: "n1", includeSubtree: false)

        let uploads = await dest.uploadNoteAttachmentCalls
        XCTAssertEqual(uploads.count, 1)
        XCTAssertEqual(uploads[0].filename, "photo.png")
        let contentUpdates = await dest.updateNoteContentCalls
        XCTAssertEqual(contentUpdates.count, 1)
        let rewritten = String(data: contentUpdates[0].1, encoding: .utf8) ?? ""
        XCTAssertFalse(rewritten.contains("att-src"))
        XCTAssertTrue(rewritten.contains("api/attachments/dest-att-1/image/photo.png"))
    }

    func testCopyTextNoteRewritesChildImageNoteURLsWhenSubtreeIncluded() async throws {
        let png = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
        let html = #"<img src="api/images/img-child/image/image.png">"#
        await source.setNoteResult(
            "p",
            .success(
                TestFixtures.noteResponse(
                    id: "p",
                    title: "Parent",
                    childNoteIds: ["img-child"],
                    childBranchIds: ["b-img"]
                )
            )
        )
        await source.setNoteResult(
            "img-child",
            .success(
                TestFixtures.noteResponse(
                    id: "img-child",
                    title: "Child photo",
                    type: "image",
                    mime: "image/png",
                    parentNoteIds: ["p"]
                )
            )
        )
        await source.setNoteContentResult("p", .success(Data(html.utf8)))
        await source.setNoteContentResult("img-child", .success(png))

        _ = try await copy(noteId: "p", includeSubtree: true)

        let creates = await dest.createNoteCalls
        XCTAssertEqual(creates.map(\.type), ["text", "image"])
        let contentUpdates = await dest.updateNoteContentCalls
        XCTAssertTrue(contentUpdates.contains(where: { $0.1 == png }))
        let htmlUpdates = contentUpdates.compactMap { String(data: $0.1, encoding: .utf8) }
        XCTAssertTrue(htmlUpdates.contains(where: { $0.contains("api/images/") && !$0.contains("img-child") }))
    }

    func testCopyTextNotePromotesExternalImageNotesToAttachments() async throws {
        let png = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
        let html = #"<img src="api/images/elsewhere/image/image.png">"#
        await source.setNoteResult(
            "n1",
            .success(TestFixtures.noteResponse(id: "n1", title: "Ref"))
        )
        await source.setNoteResult(
            "elsewhere",
            .success(
                TestFixtures.noteResponse(
                    id: "elsewhere",
                    title: "Shot",
                    type: "image",
                    mime: "image/png"
                )
            )
        )
        await source.setNoteContentResult("n1", .success(Data(html.utf8)))
        await source.setNoteContentResult("elsewhere", .success(png))

        _ = try await copy(noteId: "n1", includeSubtree: false)

        let creates = await dest.createNoteCalls
        XCTAssertEqual(creates.count, 1)
        XCTAssertEqual(creates[0].type, "text")
        let attUploads = await dest.uploadNoteAttachmentCalls
        XCTAssertEqual(attUploads.count, 1)
        let rewritten = String(data: (await dest.updateNoteContentCalls).last?.1 ?? Data(), encoding: .utf8) ?? ""
        XCTAssertFalse(rewritten.contains("api/images/elsewhere"))
        XCTAssertTrue(rewritten.contains("api/attachments/dest-att-1"))
    }
}

@MainActor
final class CrossInstanceCopyAvailabilityTests: XCTestCase {
    var persistence: PersistenceManager!

    override func setUp() {
        super.setUp()
        let schema = Schema([
            ServerProfile.self,
            CachedNote.self,
            CachedBranch.self,
            CachedAttribute.self,
            RecentNote.self,
            OpenNoteTab.self,
            FavoriteNote.self,
            RecentSearch.self,
            DraftContent.self,
            PendingNoteCreation.self,
            PendingNoteBodyUpload.self,
            PendingBranchMove.self,
            PendingNoteDeletion.self,
            PendingAttachmentImport.self,
            SyncStatus.self,
            CachedImageData.self,
            CacheExcludedRootNote.self,
        ])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try! ModelContainer(for: schema, configurations: [config])
        persistence = PersistenceManager(container: container)
    }

    func testMenuHiddenForRootAndSystemNotes() {
        XCTAssertTrue(CrossInstanceCopyAvailability.isMenuHidden(forNoteId: "root"))
        XCTAssertTrue(CrossInstanceCopyAvailability.isMenuHidden(forNoteId: "_share"))
        XCTAssertTrue(CrossInstanceCopyAvailability.isMenuHidden(forNoteId: "_hidden"))
        XCTAssertTrue(CrossInstanceCopyAvailability.isMenuHidden(forNoteId: "_optionsFoo"))
        XCTAssertFalse(CrossInstanceCopyAvailability.isMenuHidden(forNoteId: "normal"))
    }

    func testShouldShowMenuItemRequiresMultipleProfiles() throws {
        XCTAssertFalse(persistence.hasMultipleServerProfiles())
        XCTAssertFalse(
            CrossInstanceCopyAvailability.shouldShowMenuItem(noteId: "n1", persistence: persistence)
        )

        try persistence.saveProfile(ServerProfile(name: "A", baseURL: "https://a.example"))
        XCTAssertFalse(persistence.hasMultipleServerProfiles())
        XCTAssertFalse(
            CrossInstanceCopyAvailability.shouldShowMenuItem(noteId: "n1", persistence: persistence)
        )

        try persistence.saveProfile(ServerProfile(name: "B", baseURL: "https://b.example"))
        XCTAssertTrue(persistence.hasMultipleServerProfiles())
        XCTAssertTrue(
            CrossInstanceCopyAvailability.shouldShowMenuItem(noteId: "n1", persistence: persistence)
        )
        XCTAssertFalse(
            CrossInstanceCopyAvailability.shouldShowMenuItem(noteId: "root", persistence: persistence)
        )
        XCTAssertEqual(persistence.otherServerProfiles(excluding: nil).count, 2)
        let a = try persistence.fetchServerProfiles()[0]
        XCTAssertEqual(persistence.otherServerProfiles(excluding: a.id).map(\.name), ["B"])
    }
}

final class TriliumNoteBodyEncodingTests: XCTestCase {
    func testImageAndPDFAreBinary() {
        XCTAssertFalse(TriliumNoteBodyEncoding.usesUTF8JSONContent(type: "image", mime: "image/png"))
        XCTAssertFalse(TriliumNoteBodyEncoding.usesUTF8JSONContent(type: "file", mime: "application/pdf"))
        XCTAssertFalse(TriliumNoteBodyEncoding.usesUTF8JSONContent(mime: "image/jpeg", data: Data([0xFF, 0xD8])))
    }

    func testTextJSONCanvasAreUTF8() {
        XCTAssertTrue(TriliumNoteBodyEncoding.usesUTF8JSONContent(type: "text", mime: "text/html"))
        XCTAssertTrue(TriliumNoteBodyEncoding.usesUTF8JSONContent(type: "canvas", mime: "application/json"))
        XCTAssertTrue(TriliumNoteBodyEncoding.usesUTF8JSONContent(type: "file", mime: "application/gpx+xml"))
        XCTAssertTrue(TriliumNoteBodyEncoding.usesUTF8JSONContent(type: "image", mime: "image/svg+xml"))
    }
}

final class CrossInstanceCopyBodyRewriterTests: XCTestCase {
    func testRewritesAttachmentAndImageNoteURLs() {
        let html = #"<img src="api/attachments/oldAtt/image/a.png"><img src="api/images/oldImg/image/b.png">"#
        let out = CrossInstanceCopyBodyRewriter.rewrite(
            Data(html.utf8),
            attachmentIdMap: ["oldAtt": "newAtt"],
            imageNoteIdMap: ["oldImg": "newImg"],
            imageNoteToAttachmentId: [:]
        )
        let text = String(data: out, encoding: .utf8) ?? ""
        XCTAssertTrue(text.contains("api/attachments/newAtt/image/a.png"))
        XCTAssertTrue(text.contains("api/images/newImg/image/b.png"))
        XCTAssertFalse(text.contains("oldAtt"))
        XCTAssertFalse(text.contains("oldImg"))
    }

    func testPromotedImageNoteBecomesAttachmentURL() {
        let html = #"<img src="api/images/ext/image/image.png">"#
        let out = CrossInstanceCopyBodyRewriter.rewrite(
            Data(html.utf8),
            attachmentIdMap: [:],
            imageNoteIdMap: [:],
            imageNoteToAttachmentId: ["ext": "att9"]
        )
        let text = String(data: out, encoding: .utf8) ?? ""
        XCTAssertTrue(text.contains("api/attachments/att9/image/image.png"))
        XCTAssertFalse(text.contains("api/images/ext"))
    }

    func testNormalizesTrinoteImageScheme() {
        let html = #"trinote-img://attachments/att1"#
        let out = CrossInstanceCopyBodyRewriter.rewrite(
            Data(html.utf8),
            attachmentIdMap: ["att1": "dst"],
            imageNoteIdMap: [:],
            imageNoteToAttachmentId: [:]
        )
        let text = String(data: out, encoding: .utf8) ?? ""
        XCTAssertTrue(text.contains("api/attachments/dst/image/image.png"))
        XCTAssertFalse(text.contains("trinote-img"))
    }
}
