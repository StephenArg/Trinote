import XCTest
import SwiftData
@testable import Trinote

@MainActor
final class SharedImportImporterTests: XCTestCase {
    var persistence: PersistenceManager!
    let profileId = "share-import-test"

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

    func testImageCreatesNoteWithDataURI() throws {
        // Minimal 1x1 PNG
        let png = Data(base64Encoded:
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        )!
        let package = SharedImportPackage(
            payload: SharedImportPayload(
                filename: "dot.png",
                mimeType: "image/png",
                uti: "public.png",
                kind: .image,
                text: nil,
                hasBinaryData: true
            ),
            binaryData: png
        )
        let result = try SharedImportImporter.importPackage(
            package,
            parentNoteId: TriliumTreeConstants.rootNoteId,
            persistence: persistence,
            serverProfileId: profileId
        )
        XCTAssertEqual(result.title, "dot")
        let note = try persistence.fetchCachedNote(id: result.noteId, serverProfileId: profileId)
        XCTAssertNotNil(note)
        let body = String(data: note?.content ?? Data(), encoding: .utf8) ?? ""
        XCTAssertTrue(body.contains("data:image/png;base64,"))
        XCTAssertTrue(body.contains("<figure class=\"image\">"))
        XCTAssertFalse(body.contains("<p><img"))
        XCTAssertTrue(try persistence.fetchPendingAttachmentImports(noteId: result.noteId, serverProfileId: profileId).isEmpty)
    }

    func testPlainTextCreatesEscapedParagraphs() throws {
        let package = SharedImportPackage(
            payload: SharedImportPayload(
                filename: "hello.txt",
                mimeType: "text/plain",
                uti: "public.plain-text",
                kind: .plainText,
                text: "hi <world>",
                hasBinaryData: false
            ),
            binaryData: nil
        )
        let result = try SharedImportImporter.importPackage(
            package,
            parentNoteId: TriliumTreeConstants.rootNoteId,
            persistence: persistence,
            serverProfileId: profileId
        )
        let note = try persistence.fetchCachedNote(id: result.noteId, serverProfileId: profileId)
        let body = String(data: note?.content ?? Data(), encoding: .utf8) ?? ""
        XCTAssertEqual(body, "<p>hi &lt;world&gt;</p>")
    }

    func testMarkdownCreatesStyledHTML() throws {
        let package = SharedImportPackage(
            payload: SharedImportPayload(
                filename: "readme.md",
                mimeType: "text/markdown",
                uti: nil,
                kind: .markdown,
                text: "# Hello\n\n**world**",
                hasBinaryData: false
            ),
            binaryData: nil
        )
        let result = try SharedImportImporter.importPackage(
            package,
            parentNoteId: TriliumTreeConstants.rootNoteId,
            persistence: persistence,
            serverProfileId: profileId
        )
        let note = try persistence.fetchCachedNote(id: result.noteId, serverProfileId: profileId)
        let body = String(data: note?.content ?? Data(), encoding: .utf8) ?? ""
        XCTAssertTrue(body.contains("<h1>Hello</h1>"))
        XCTAssertTrue(body.contains("<strong>world</strong>"))
    }

    func testFileQueuesPendingAttachment() throws {
        let bytes = Data("pdf-bytes".utf8)
        let package = SharedImportPackage(
            payload: SharedImportPayload(
                filename: "report.pdf",
                mimeType: "application/pdf",
                uti: "com.adobe.pdf",
                kind: .file,
                text: nil,
                hasBinaryData: true
            ),
            binaryData: bytes
        )
        let result = try SharedImportImporter.importPackage(
            package,
            parentNoteId: TriliumTreeConstants.rootNoteId,
            persistence: persistence,
            serverProfileId: profileId
        )
        let pending = try persistence.fetchPendingAttachmentImports(
            noteId: result.noteId,
            serverProfileId: profileId
        )
        XCTAssertEqual(pending.count, 1)
        XCTAssertEqual(pending[0].title, "report.pdf")
        XCTAssertEqual(pending[0].mime, "application/pdf")
        XCTAssertEqual(pending[0].data, bytes)
        let note = try persistence.fetchCachedNote(id: result.noteId, serverProfileId: profileId)
        XCTAssertEqual(note?.content, nil)
        XCTAssertEqual(result.pendingAttachmentTitle, "report.pdf")
    }

    func testFileWithoutBinaryThrows() {
        let package = SharedImportPackage(
            payload: SharedImportPayload(
                filename: "report.pdf",
                mimeType: "application/pdf",
                uti: "com.adobe.pdf",
                kind: .file,
                text: nil,
                hasBinaryData: true
            ),
            binaryData: nil
        )
        XCTAssertThrowsError(
            try SharedImportImporter.importPackage(
                package,
                parentNoteId: TriliumTreeConstants.rootNoteId,
                persistence: persistence,
                serverProfileId: profileId
            )
        ) { error in
            XCTAssertEqual(error as? SharedImportImporter.ImportError, .missingFileData)
        }
    }

    // MARK: Image and file notes

    private static let png = Data(base64Encoded:
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    )!

    private func imagePackage(filename: String? = "dot.png") -> SharedImportPackage {
        SharedImportPackage(
            payload: SharedImportPayload(
                filename: filename,
                mimeType: "image/png",
                uti: "public.png",
                kind: .image,
                text: nil,
                hasBinaryData: true
            ),
            binaryData: Self.png
        )
    }

    private func pdfPackage(filename: String? = "report.pdf") -> SharedImportPackage {
        SharedImportPackage(
            payload: SharedImportPayload(
                filename: filename,
                mimeType: "application/pdf",
                uti: "com.adobe.pdf",
                kind: .file,
                text: nil,
                hasBinaryData: true
            ),
            binaryData: Data("%PDF-1.7 bytes".utf8)
        )
    }

    func testPicturesAndFilesOfferTheirOwnNoteTypeAndTextDoesNot() {
        XCTAssertEqual(SharedImportImporter.noteTypeChoices(for: .image), [.image, .text])
        XCTAssertEqual(SharedImportImporter.noteTypeChoices(for: .file), [.file, .text])
        XCTAssertEqual(SharedImportImporter.noteTypeChoices(for: .plainText), [.text])
        XCTAssertEqual(SharedImportImporter.noteTypeChoices(for: .markdown), [.text])
    }

    func testImageNoteIsMadeOnTheDeviceWithItsBytesQueued() throws {
        let note = try SharedImportImporter.contentNote(for: imagePackage(), noteType: .image, title: "dot")
        let result = try SharedImportImporter.queueContentNote(
            note,
            title: "dot",
            parentNoteId: TriliumTreeConstants.rootNoteId,
            persistence: persistence,
            serverProfileId: profileId
        )

        XCTAssertFalse(result.opensInEditor)
        let cached = try XCTUnwrap(persistence.fetchCachedNote(id: result.noteId, serverProfileId: profileId))
        XCTAssertEqual(cached.noteType, "image")
        XCTAssertEqual(cached.mime, "image/png")
        XCTAssertEqual(cached.content, Self.png, "the picture shows before it reaches the server")

        let creation = try XCTUnwrap(persistence.fetchPendingNoteCreations(serverProfileId: profileId).first)
        XCTAssertEqual(creation.noteType, "image")
        XCTAssertEqual(creation.initialContent, "", "the bytes go up as a file upload, not in the create request")
        XCTAssertTrue(creation.initialAttributesJSON.contains("originalFileName"))
        XCTAssertTrue(creation.initialAttributesJSON.contains("dot.png"))

        let body = try XCTUnwrap(persistence.fetchPendingNoteBodyUploads(serverProfileId: profileId).first)
        XCTAssertEqual(body.noteId, result.noteId)
        XCTAssertEqual(body.body, Self.png)
        XCTAssertEqual(body.mime, "image/png")
    }

    func testFileNoteIsMadeOnTheDeviceWithItsBytesQueued() throws {
        let package = pdfPackage()
        let note = try SharedImportImporter.contentNote(for: package, noteType: .file, title: "report")
        let result = try SharedImportImporter.queueContentNote(
            note,
            title: "report",
            parentNoteId: TriliumTreeConstants.rootNoteId,
            persistence: persistence,
            serverProfileId: profileId
        )

        let cached = try XCTUnwrap(persistence.fetchCachedNote(id: result.noteId, serverProfileId: profileId))
        XCTAssertEqual(cached.noteType, "file")
        XCTAssertEqual(cached.mime, "application/pdf")
        XCTAssertEqual(cached.content, package.binaryData)
        XCTAssertEqual(try persistence.fetchPendingNoteBodyUploads(serverProfileId: profileId).first?.body, package.binaryData)
        XCTAssertTrue(try persistence.fetchPendingAttachmentImports(noteId: result.noteId, serverProfileId: profileId).isEmpty)
    }

    func testFileWithoutANameIsNamedAfterTheTitle() throws {
        let note = try SharedImportImporter.contentNote(for: pdfPackage(filename: nil), noteType: .file, title: "Report")
        XCTAssertEqual(note.filename, "Report.pdf")
    }

    func testImageNoteWithoutBytesThrows() {
        let empty = SharedImportPackage(payload: imagePackage().payload, binaryData: nil)
        XCTAssertThrowsError(try SharedImportImporter.contentNote(for: empty, noteType: .image, title: "dot")) { error in
            XCTAssertEqual(error as? SharedImportImporter.ImportError, .missingFileData)
        }
    }

    func testImageNoteOnlineIsUploadedAsAFileAndCached() async throws {
        let client = MockTriliumClient()
        let made = TestFixtures.noteResponse(id: "img1", title: "dot", type: "image", mime: "image/png")
        await client.setCreateNoteResult(.success(CreateNoteResponse(
            note: made,
            branch: TestFixtures.branchResponse(branchId: "root_img1", noteId: "img1", parentNoteId: "root")
        )))
        let label = TestFixtures.attributeResponse(noteId: "img1", name: "originalFileName", value: "dot.png")
        await client.setNoteResult("img1", .success(
            TestFixtures.noteResponse(id: "img1", title: "dot", type: "image", mime: "image/png", attributes: [label])
        ))
        let note = try SharedImportImporter.contentNote(for: imagePackage(), noteType: .image, title: "dot")

        let result = try await SharedImportImporter.createContentNoteOnServer(
            note,
            title: "dot",
            parentNoteId: "root",
            client: client,
            persistence: persistence,
            serverProfileId: profileId
        )

        XCTAssertEqual(result.noteId, "img1")
        XCTAssertFalse(result.opensInEditor)
        let created = await client.createNoteCalls
        XCTAssertEqual(created.first?.type, "image")
        XCTAssertEqual(created.first?.mime, "image/png")
        XCTAssertEqual(created.first?.content, "")
        let uploads = await client.uploadNoteFileContentCalls
        XCTAssertEqual(uploads.count, 1)
        XCTAssertEqual(uploads.first?.noteId, "img1")
        XCTAssertEqual(uploads.first?.filename, "dot.png")
        XCTAssertEqual(uploads.first?.contentType, "image/png")
        XCTAssertEqual(uploads.first?.data, Self.png)
        XCTAssertEqual(uploads.first?.savesRevision, false, "a revision of the empty new note is no use")
        let generic = await client.updateNoteContentCalls
        XCTAssertTrue(generic.isEmpty)

        let cached = try XCTUnwrap(persistence.fetchCachedNote(id: "img1", serverProfileId: profileId))
        XCTAssertEqual(cached.noteType, "image")
        XCTAssertEqual(cached.content, Self.png)
        XCTAssertTrue(try persistence.fetchPendingNoteCreations(serverProfileId: profileId).isEmpty)
        XCTAssertTrue(try persistence.fetchPendingNoteBodyUploads(serverProfileId: profileId).isEmpty)
    }

    func testFailedUploadTakesTheEmptyNoteBackOff() async throws {
        let client = MockTriliumClient()
        let made = TestFixtures.noteResponse(id: "file1", title: "report", type: "file", mime: "application/pdf")
        await client.setCreateNoteResult(.success(CreateNoteResponse(
            note: made,
            branch: TestFixtures.branchResponse(branchId: "root_file1", noteId: "file1", parentNoteId: "root")
        )))
        await client.setUploadNoteFileContentError(APIError.serverError(statusCode: 413, message: "Payload Too Large"))
        let note = try SharedImportImporter.contentNote(for: pdfPackage(), noteType: .file, title: "report")

        do {
            _ = try await SharedImportImporter.createContentNoteOnServer(
                note,
                title: "report",
                parentNoteId: "root",
                client: client,
                persistence: persistence,
                serverProfileId: profileId
            )
            XCTFail("the upload failed, so the import must fail")
        } catch {}

        let deleted = await client.deleteNoteCalls
        XCTAssertEqual(deleted.map(\.noteId), ["file1"])
        XCTAssertEqual(deleted.first?.eraseNotes, false, "to Trilium's trash, not erased")
        XCTAssertNil(try persistence.fetchCachedNote(id: "file1", serverProfileId: profileId))
    }

    func testTheLastChoiceIsOfferedFirstPerKindOfShare() throws {
        let suite = "share-import-preference-\(UUID().uuidString)"
        let defaults = try XCTUnwrap(UserDefaults(suiteName: suite))
        defer { defaults.removePersistentDomain(forName: suite) }

        XCTAssertEqual(SharedImportNoteTypePreference.preferred(for: .image, defaults: defaults), .text)
        SharedImportNoteTypePreference.remember(.image, for: .image, defaults: defaults)
        XCTAssertEqual(SharedImportNoteTypePreference.preferred(for: .image, defaults: defaults), .image)
        XCTAssertEqual(SharedImportNoteTypePreference.preferred(for: .file, defaults: defaults), .text, "files keep their own choice")

        // A type the kind doesn't offer (an older value, say) falls back to text.
        defaults.set(NoteType.image.rawValue, forKey: SharedImportNoteTypePreference.key(for: .file))
        XCTAssertEqual(SharedImportNoteTypePreference.preferred(for: .file, defaults: defaults), .text)

        SharedImportNoteTypePreference.remember(.image, for: .plainText, defaults: defaults)
        XCTAssertNil(defaults.string(forKey: SharedImportNoteTypePreference.key(for: .plainText)), "text has no choice to remember")
    }
}
