import ImageIO
import UniformTypeIdentifiers
import XCTest
@testable import Trinote

/// Link previews read on the phone when the Trilium server can't read the page (issue #35).
final class LinkPreviewOnDeviceTests: XCTestCase {

    // MARK: - Reading a page

    func testOpenGraphTagsComeFirst() throws {
        let html = """
        <!doctype html><html><head>
        <title>Fallback &amp; title</title>
        <meta property="og:title" content="Issues · StephenArg/Trinote">
        <meta property="og:description" content="Trilium client for iOS.">
        <meta name="description" content="Not this one">
        <meta property="og:site_name" content="GitHub">
        <meta property="og:image" content="https://opengraph.githubassets.com/abc/StephenArg/Trinote">
        <link rel="icon" class="js-site-favicon" type="image/svg+xml" href="https://github.githubassets.com/favicons/favicon.svg">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
        </head><body><meta property="og:title" content="Not in the head"></body></html>
        """
        let page = try XCTUnwrap(LinkPreviewHTMLParser.parse(
            html: html, pageURL: URL(string: "https://github.com/StephenArg/Trinote/issues")!
        ))
        XCTAssertEqual(page.title, "Issues · StephenArg/Trinote")
        XCTAssertEqual(page.description, "Trilium client for iOS.")
        XCTAssertEqual(page.siteName, "GitHub")
        XCTAssertEqual(page.imageURLs.map(\.absoluteString), [
            "https://opengraph.githubassets.com/abc/StephenArg/Trinote",
            "https://github.com/apple-touch-icon.png",
        ])
        XCTAssertEqual(page.faviconURLs.map(\.absoluteString), [
            "https://github.githubassets.com/favicons/favicon.svg",
            "https://github.com/apple-touch-icon.png",
            "https://github.com/favicon.ico",
        ])
    }

    func testThePlainTitleDescriptionAndBestSizedIconStandIn() throws {
        let html = """
        <head><title>
          Caf&#233; &#8212; Home
        </title>
        <meta name='description' content='A &quot;nice&quot; place'>
        <link rel='shortcut icon' href='/static/fav.png' sizes='16x16'>
        <link rel=icon href=/icon-64.png sizes=64x64>
        </head>
        """
        let page = try XCTUnwrap(LinkPreviewHTMLParser.parse(html: html, pageURL: URL(string: "https://example.com/dir/page")!))
        XCTAssertEqual(page.title, "Café — Home")
        XCTAssertEqual(page.description, #"A "nice" place"#)
        XCTAssertNil(page.siteName)
        XCTAssertEqual(page.imageURLs, [])
        XCTAssertEqual(page.faviconURLs.map(\.absoluteString), [
            "https://example.com/icon-64.png",
            "https://example.com/static/fav.png",
            "https://example.com/favicon.ico",
        ])
    }

    func testRelativeAndProtocolRelativeAddressesResolve() throws {
        let html = #"<head><meta property="og:title" content="T"><meta property="og:image" content="//cdn.example.com/a.jpg"><meta name="twitter:image" content="img/b.png"></head>"#
        let page = try XCTUnwrap(LinkPreviewHTMLParser.parse(html: html, pageURL: URL(string: "https://example.com/dir/page")!))
        XCTAssertEqual(page.imageURLs.map(\.absoluteString), ["https://cdn.example.com/a.jpg", "https://example.com/dir/img/b.png"])
    }

    func testAPageWithoutATitleIsNotRead() {
        XCTAssertNil(LinkPreviewHTMLParser.parse(
            html: "<html><head><meta name=description content=x></head></html>",
            pageURL: URL(string: "https://example.com/")!
        ))
    }

    // MARK: - Names

    func testPictureNamesMatchTriliums() {
        // Expected values computed with Trilium's own `linkPreviewImageName` (packages/commons/src/lib/link_embed.ts).
        XCTAssertEqual(LinkPreviewPictureNames.coverBaseName(url: "https://github.com/StephenArg/Trinote/issues"), "github.com-issues-7ff4bfeb")
        XCTAssertEqual(LinkPreviewPictureNames.coverBaseName(url: "https://github.com/StephenArg/Trinote/issues#top"), "github.com-issues-7ff4bfeb")
        XCTAssertEqual(LinkPreviewPictureNames.coverBaseName(url: "https://example.com"), "example.com-e0fbd8b4")
        XCTAssertEqual(LinkPreviewPictureNames.coverBaseName(url: "https://Example.com/a%20b/Caf%C3%A9.html?x=1"), "example.com-Caf-html-1fb7003d")
        XCTAssertEqual(LinkPreviewPictureNames.faviconBaseName(url: "https://GitHub.com/x"), "github.com")
        XCTAssertEqual(LinkPreviewPictureNames.fileExtension(mime: "image/svg+xml"), "svg")
        XCTAssertEqual(LinkPreviewPictureNames.fileExtension(mime: "image/x-icon"), "ico")
        XCTAssertEqual(LinkPreviewPictureNames.fileExtension(mime: "image/jpeg"), "jpeg")
        XCTAssertEqual(LinkPreviewPictureNames.fileExtension(mime: "image/png"), "png")
    }

    // MARK: - Pictures

    private func pngData(width: Int, height: Int, opaque: Bool) throws -> Data {
        let space = CGColorSpaceCreateDeviceRGB()
        let info = opaque ? CGImageAlphaInfo.noneSkipLast.rawValue : CGImageAlphaInfo.premultipliedLast.rawValue
        let context = try XCTUnwrap(CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: space, bitmapInfo: info))
        context.setFillColor(CGColor(red: 0.2, green: 0.4, blue: 0.8, alpha: opaque ? 1 : 0.5))
        context.fill(CGRect(x: 0, y: 0, width: width, height: height))
        let image = try XCTUnwrap(context.makeImage())
        let data = NSMutableData()
        let destination = try XCTUnwrap(CGImageDestinationCreateWithData(data, UTType.png.identifier as CFString, 1, nil))
        CGImageDestinationAddImage(destination, image, nil)
        XCTAssertTrue(CGImageDestinationFinalize(destination))
        return data as Data
    }

    private func pixelSize(_ data: Data) -> (Int, Int)? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil),
              let properties = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [CFString: Any],
              let width = properties[kCGImagePropertyPixelWidth] as? Int,
              let height = properties[kCGImagePropertyPixelHeight] as? Int
        else { return nil }
        return (width, height)
    }

    func testACoverIsScaledToFitAndReencoded() throws {
        let opaque = try XCTUnwrap(LinkPreviewPictureEncoder.cover(from: try pngData(width: 1024, height: 512, opaque: true)))
        XCTAssertEqual(opaque.mime, "image/jpeg")
        let size = try XCTUnwrap(pixelSize(opaque.data))
        XCTAssertEqual(size.0, 256)
        XCTAssertEqual(size.1, 128)

        let transparent = try XCTUnwrap(LinkPreviewPictureEncoder.cover(from: try pngData(width: 300, height: 300, opaque: false)))
        XCTAssertEqual(transparent.mime, "image/png")

        XCTAssertNil(LinkPreviewPictureEncoder.cover(from: Data("<html>not found</html>".utf8)))
    }

    func testAFaviconKeepsAnSVGAndBecomesAPNGOtherwise() throws {
        let svg = Data(#"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"/>"#.utf8)
        XCTAssertEqual(LinkPreviewPictureEncoder.favicon(from: svg), LinkPreviewPicture(data: svg, mime: "image/svg+xml"))
        let raster = try XCTUnwrap(LinkPreviewPictureEncoder.favicon(from: try pngData(width: 256, height: 256, opaque: false)))
        XCTAssertEqual(raster.mime, "image/png")
        XCTAssertEqual(pixelSize(raster.data)?.0, 96)
        XCTAssertNil(LinkPreviewPictureEncoder.favicon(from: Data("nope".utf8)))
    }

    func testAnOlderServerGetsThePicturesInline() async throws {
        let mock = MockTriliumClient()
        var store = LinkPreviewPictureStore(client: mock, noteId: "n1", usesAttachments: false)
        let reference = await store.store(LinkPreviewPicture(data: Data([1, 2, 3]), mime: "image/png"), role: "favicon", baseName: "github.com")
        XCTAssertEqual(reference, "data:image/png;base64,AQID")
        let created = await mock.createAttachmentRequests
        XCTAssertTrue(created.isEmpty)
    }

    func testPicturesBecomeAttachmentsAndAreReused() async throws {
        let mock = MockTriliumClient()
        await mock.setAttachments(noteId: "n1", [AttachmentResponse(
            attachmentId: "fav9", ownerId: "n1", role: "favicon", mime: "image/svg+xml", title: "github.com.svg", position: 0,
            blobId: nil, dateModified: "", utcDateModified: "", utcDateScheduledForErasureSince: nil, contentLength: 10
        )])
        var store = LinkPreviewPictureStore(client: mock, noteId: "n1", usesAttachments: true)
        let favicon = await store.store(
            LinkPreviewPicture(data: Data("<svg/>".utf8), mime: "image/svg+xml"), role: "favicon", baseName: "github.com"
        )
        XCTAssertEqual(favicon, "api/attachments/fav9/image/github.com.svg")

        let jpeg = Data([0xFF, 0xD8, 0xFF, 0xE0, 1, 2])
        let cover = await store.store(
            LinkPreviewPicture(data: jpeg, mime: "image/jpeg"), role: "coverImage", baseName: "github.com-issues-7ff4bfeb"
        )
        XCTAssertEqual(cover, "api/attachments/att1/image/github.com-issues-7ff4bfeb.jpeg")
        let created = await mock.createAttachmentRequests
        XCTAssertEqual(created.map(\.role), ["coverImage"])
        XCTAssertEqual(created.map(\.title), ["github.com-issues-7ff4bfeb.jpeg"])
        XCTAssertEqual(created.map(\.content), [""])
        let uploads = await mock.uploadedAttachmentContents
        XCTAssertEqual(uploads.map(\.attachmentId), ["att1"])
        XCTAssertEqual(uploads.map(\.data), [jpeg])
        XCTAssertEqual(uploads.map(\.contentType), ["image/jpeg"])
    }

    func testAnAttachmentTitleIsEncodedLikeEncodeURIComponent() {
        XCTAssertEqual(
            LinkPreviewPictureStore.reference(attachmentId: "a1", title: "example.com-Caf-html 1.png"),
            "api/attachments/a1/image/example.com-Caf-html%201.png"
        )
    }
}

/// A page reader that answers from memory.
struct FakeLinkPreviewPageReader: LinkPreviewPageReading {
    var page: LinkPreviewPage?
    var downloads: [URL: Data] = [:]

    func read(_ url: URL) async -> LinkPreviewPage? { page }
    func download(_ url: URL, maxBytes: Int) async -> Data? { downloads[url] }
}
