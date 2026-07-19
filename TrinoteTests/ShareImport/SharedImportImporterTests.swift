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
}
