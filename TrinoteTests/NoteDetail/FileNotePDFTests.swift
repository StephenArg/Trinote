import XCTest
import PDFKit
import UIKit
@testable import Trinote

@MainActor
final class FileNotePDFTests: XCTestCase {
    private func makePDF(size: CGSize, pages: Int = 1, password: String? = nil) -> Data {
        let format = UIGraphicsPDFRendererFormat()
        if let password {
            format.documentInfo = [
                kCGPDFContextUserPassword as String: password,
                kCGPDFContextOwnerPassword as String: password
            ]
        }
        let renderer = UIGraphicsPDFRenderer(bounds: CGRect(origin: .zero, size: size), format: format)
        return renderer.pdfData { context in
            for _ in 0..<pages { context.beginPage() }
        }
    }

    func testPDFMimeIsShownInline() {
        let data = makePDF(size: CGSize(width: 595, height: 842), pages: 3)
        let document = FileNoteView.inlinePDFDocument(mime: "application/pdf", data: data)
        XCTAssertEqual(document?.pageCount, 3)
    }

    func testPDFBytesUploadedAsOctetStreamAreShownInline() {
        let data = makePDF(size: CGSize(width: 595, height: 842))
        XCTAssertNotNil(FileNoteView.inlinePDFDocument(mime: "application/octet-stream", data: data))
    }

    func testNonPDFAndMissingBodiesAreNotShownInline() {
        XCTAssertNil(FileNoteView.inlinePDFDocument(mime: "application/pdf", data: nil))
        XCTAssertNil(FileNoteView.inlinePDFDocument(mime: "application/pdf", data: Data()))
        XCTAssertNil(FileNoteView.inlinePDFDocument(mime: "application/pdf", data: Data("not a pdf".utf8)))
        XCTAssertNil(FileNoteView.inlinePDFDocument(mime: "application/zip", data: Data("PK\u{3}\u{4}".utf8)))
    }

    func testLockedPDFFallsBackToQuickLook() {
        let data = makePDF(size: CGSize(width: 595, height: 842), password: "secret")
        XCTAssertEqual(PDFDocument(data: data)?.isLocked, true)
        XCTAssertNil(FileNoteView.inlinePDFDocument(mime: "application/pdf", data: data))
        guard case .quickLook = AttachmentPreviewItem.make(title: "locked.pdf", mime: "application/pdf", data: data)?.kind else {
            return XCTFail("Locked PDF should open in Quick Look")
        }
    }

    func testUnlockedPDFPreviewUsesPDFKit() {
        let data = makePDF(size: CGSize(width: 595, height: 842))
        guard case .pdf = AttachmentPreviewItem.make(title: "doc.pdf", mime: "application/pdf", data: data)?.kind else {
            return XCTFail("PDF should open in the PDFKit viewer")
        }
    }

    func testFirstPageAspectRatio() throws {
        let portrait = try XCTUnwrap(PDFDocument(data: makePDF(size: CGSize(width: 600, height: 800))))
        XCTAssertEqual(FileNoteView.firstPageAspectRatio(portrait), 0.75, accuracy: 0.001)

        let landscape = try XCTUnwrap(PDFDocument(data: makePDF(size: CGSize(width: 800, height: 600))))
        XCTAssertEqual(FileNoteView.firstPageAspectRatio(landscape), 800.0 / 600.0, accuracy: 0.001)

        landscape.page(at: 0)?.rotation = 90
        XCTAssertEqual(FileNoteView.firstPageAspectRatio(landscape), 0.75, accuracy: 0.001)
    }

    func testPDFHistoryAttachmentIsViewerState() {
        let history = AttachmentItem(attachmentId: "a1", ownerId: "n1", role: "file", mime: "application/json", title: "pdfHistory.json", position: 0, contentLength: 147)
        let userJSON = AttachmentItem(attachmentId: "a2", ownerId: "n1", role: "file", mime: "application/json", title: "data.json", position: 1, contentLength: 10)
        XCTAssertTrue(history.isPDFViewerState)
        XCTAssertFalse(userJSON.isPDFViewerState)
    }
}
