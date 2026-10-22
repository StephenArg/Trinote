import UIKit
import XCTest
@testable import Trinote

final class ChatAttachmentsTests: XCTestCase {

    func testKindsFollowTriliumsChat() {
        XCTAssertEqual(ChatAttachments.kind(filename: "a.png", mime: "image/png"), .image)
        XCTAssertEqual(ChatAttachments.kind(filename: "a.svg", mime: "image/svg+xml"), .image)
        XCTAssertEqual(ChatAttachments.kind(filename: "doc.pdf", mime: "application/pdf"), .file)
        XCTAssertEqual(ChatAttachments.kind(filename: "notes.txt", mime: "text/plain"), .textFile)
        XCTAssertEqual(ChatAttachments.kind(filename: "main.swift", mime: "application/octet-stream"), .textFile)
        XCTAssertEqual(ChatAttachments.kind(filename: "README.MD", mime: ""), .textFile)
        XCTAssertNil(ChatAttachments.kind(filename: "movie.mov", mime: "video/quicktime"))
        XCTAssertNil(ChatAttachments.kind(filename: "photo.heic", mime: "image/heic"), "HEIC is converted before it gets here")
        XCTAssertEqual(ChatAttachments.mime(forFilename: "x.pdf"), "application/pdf")
    }

    func testUnreadableImageTypesBecomeScaledJPEGs() throws {
        let big = UIGraphicsImageRenderer(size: CGSize(width: 3000, height: 1500), format: {
            let f = UIGraphicsImageRendererFormat.default(); f.scale = 1; return f
        }()).image { ctx in UIColor.red.setFill(); ctx.fill(CGRect(x: 0, y: 0, width: 3000, height: 1500)) }
        let tiff = try XCTUnwrap(big.pngData())
        let prepared = try XCTUnwrap(ChatAttachments.prepareImage(data: tiff, filename: "IMG_0001.heic", mime: "image/heic"))
        XCTAssertEqual(prepared.mime, "image/jpeg")
        XCTAssertEqual(prepared.filename, "IMG_0001.jpg")
        let decoded = try XCTUnwrap(UIImage(data: prepared.data))
        XCTAssertEqual(decoded.size.width * decoded.scale, 2048, accuracy: 1)
        XCTAssertEqual(decoded.size.height * decoded.scale, 1024, accuracy: 1)

        let png = try XCTUnwrap(ChatAttachments.prepareImage(data: tiff, filename: "a.png", mime: "image/png"))
        XCTAssertEqual(png.data, tiff, "accepted types go up as they are")
        XCTAssertNil(ChatAttachments.prepareImage(data: Data("nope".utf8), filename: "x.heic", mime: "image/heic"))
    }

    func testBlocksCarryTriliumsUploadURLs() {
        XCTAssertEqual(
            ChatAttachments.block(kind: .image, attachmentId: "att1", mime: "image/jpeg", title: "My photo.jpg", chatNoteId: "chat1"),
            .image(AttachmentBlockRef(attachmentId: "att1", mime: "image/jpeg", title: "My photo.jpg", url: "api/attachments/att1/image/My%20photo.jpg"))
        )
        XCTAssertEqual(
            ChatAttachments.block(kind: .file, attachmentId: "att2", mime: "application/pdf", title: "a.pdf", chatNoteId: "chat1"),
            .file(AttachmentBlockRef(attachmentId: "att2", mime: "application/pdf", title: "a.pdf", url: "#root/chat1?viewMode=attachments&attachmentId=att2"))
        )
        XCTAssertTrue(ChatAttachments.model(nil, accepts: .image))
        XCTAssertTrue(ChatAttachments.model(LlmModelInfo(id: "m", name: "M"), accepts: .file))
        XCTAssertFalse(ChatAttachments.model(LlmModelInfo(id: "m", name: "M", attachmentKinds: ["file"]), accepts: .image))
        XCTAssertTrue(ChatAttachments.model(LlmModelInfo(id: "m", name: "M", attachmentKinds: []), accepts: .textFile))
    }
}
