import UIKit
import XCTest
@testable import Trinote

final class ExtensionsTests: XCTestCase {

    // MARK: - String.nilIfEmpty

    func testNilIfEmpty() {
        XCTAssertNil("".nilIfEmpty)
        XCTAssertEqual("hello".nilIfEmpty, "hello")
        XCTAssertEqual(" ".nilIfEmpty, " ")
    }

    // MARK: - String.truncated

    func testTruncated() {
        XCTAssertEqual("Hello World".truncated(to: 5), "Hello…")
        XCTAssertEqual("Hi".truncated(to: 10), "Hi")
        XCTAssertEqual("Exact".truncated(to: 5), "Exact")
    }

    // MARK: - Date Parsing

    func testTriliumDateISO8601WithFractional() {
        let date = "2024-01-15T12:30:45.123Z".triliumDate()
        XCTAssertNotNil(date)
    }

    func testTriliumDateISO8601Plain() {
        let date = "2024-01-15T12:30:45Z".triliumDate()
        XCTAssertNotNil(date)
    }

    func testTriliumDateLocalFormat() {
        let date = "2024-01-15 12:30:45".triliumDate()
        XCTAssertNotNil(date)
    }

    func testTriliumDateInvalid() {
        let date = "not-a-date".triliumDate()
        XCTAssertNil(date)
    }

    func testTriliumDateEmpty() {
        let date = "".triliumDate()
        XCTAssertNil(date)
    }

    // MARK: - Date Display

    func testRelativeDisplay() {
        let recent = Date().relativeDisplay
        XCTAssertFalse(recent.isEmpty)
    }

    func testShortDisplay() {
        let display = Date().shortDisplay
        XCTAssertFalse(display.isEmpty)
    }

    // MARK: - Offline local note ids

    func testIsOfflineLocalNoteId() {
        XCTAssertTrue("ol_abc123".isOfflineLocalNoteId)
        XCTAssertTrue("ol_".isOfflineLocalNoteId)
        XCTAssertFalse("root".isOfflineLocalNoteId)
        XCTAssertFalse("n1".isOfflineLocalNoteId)
        XCTAssertFalse("".isOfflineLocalNoteId)
    }

    // MARK: - Image sniffing

    /// 8×8 AVIF written by macOS ImageIO (major brand `avif`, compatible `mif1`).
    private static let tinyAVIF = Data(base64Encoded: "AAAAIGZ0eXBhdmlmAAAAAE1pUHJhdmlmbWlhZm1pZjEAAAEhbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAAOcGl0bQAAAAAAAQAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAgWlwcnAAAABgaXBjbwAAABNjb2xybmNseAACAAIABoAAAAAMY2xsaQDLAEAAAAAUaXNwZQAAAAAAAAAIAAAACAAAAAlpcm90AAAAABBwaXhpAAAAAAMKCgoAAAAMYXYxQ4EATAAAAAAZaXBtYQAAAAAAAAABAAEGgQIDBYaEAAAAHmlsb2MAAAAARAAAAQABAAAAAQAAAVEAAAAmAAAAAW1kYXQAAAAAAAAANhIACgwAAAABF+f/woEBA0IyFBABkgAYYYYgAGjTCgfNkcFd8m+A")!

    /// A leading `ftyp` box with the given brands, padded so it reads like the start of a real file.
    private func ftypHeader(major: String, compatible: [String]) -> Data {
        let size = 16 + 4 * compatible.count
        var bytes: [UInt8] = [0, 0, 0, UInt8(size)] + Array("ftyp".utf8) + Array(major.utf8) + [0, 0, 0, 0]
        for brand in compatible { bytes += Array(brand.utf8) }
        bytes += [0, 0, 0, 8] + Array("meta".utf8)
        return Data(bytes)
    }

    func testAVIFIsRecognizedAndDecodes() {
        let data = Self.tinyAVIF
        XCTAssertEqual(data.detectImageMIME(), "image/avif")
        XCTAssertTrue(data.isPlausibleInlineImagePayload)
        XCTAssertFalse(data.isAVIFSequence)
        XCTAssertNotNil(UIImage(data: data))
    }

    func testAVIFBrandIsFoundAmongCompatibleBrands() {
        let data = ftypHeader(major: "mif1", compatible: ["miaf", "avif"])
        XCTAssertEqual(data.detectImageMIME(), "image/avif")
        XCTAssertTrue(data.isPlausibleInlineImagePayload)
    }

    func testAnimatedAVIFIsASequence() {
        let data = ftypHeader(major: "avis", compatible: ["avif", "msf1", "miaf"])
        XCTAssertEqual(data.detectImageMIME(), "image/avif")
        XCTAssertTrue(data.isAVIFSequence)
    }

    func testHEIFFamilyIsRecognized() {
        XCTAssertEqual(ftypHeader(major: "heic", compatible: ["mif1", "heic"]).detectImageMIME(), "image/heic")
        XCTAssertEqual(ftypHeader(major: "heix", compatible: ["mif1"]).detectImageMIME(), "image/heic")
        XCTAssertEqual(ftypHeader(major: "mif1", compatible: ["miaf"]).detectImageMIME(), "image/heif")
    }

    func testVideoContainersAreNotImages() {
        let mp4 = ftypHeader(major: "isom", compatible: ["isom", "iso2", "avc1", "mp41"])
        XCTAssertFalse(mp4.isPlausibleInlineImagePayload)
        XCTAssertFalse(mp4.isAVIFSequence)
        XCTAssertEqual(mp4.detectImageMIME(), "image/png")
        XCTAssertFalse(ftypHeader(major: "qt  ", compatible: ["qt  "]).isPlausibleInlineImagePayload)
    }

    func testBrandsPastTheFtypBoxAreIgnored() {
        // `avif` sits in the following box, not in `ftyp`'s brand list.
        var bytes: [UInt8] = [0, 0, 0, 16] + Array("ftyp".utf8) + Array("isom".utf8) + [0, 0, 0, 0]
        bytes += [0, 0, 0, 12] + Array("free".utf8) + Array("avif".utf8)
        XCTAssertFalse(Data(bytes).isPlausibleInlineImagePayload)
    }

    func testExistingFormatsStillSniff() {
        XCTAssertEqual(Data([0xFF, 0xD8, 0xFF, 0xE0]).detectImageMIME(), "image/jpeg")
        XCTAssertEqual(Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]).detectImageMIME(), "image/png")
        XCTAssertEqual(Data("GIF89a".utf8).detectImageMIME(), "image/gif")
        XCTAssertEqual(Data("RIFF\0\0\0\0WEBPVP8 ".utf8).detectImageMIME(), "image/webp")
        let svg = Data("<svg xmlns=\"http://www.w3.org/2000/svg\"/>".utf8)
        XCTAssertEqual(svg.detectImageMIME(), "image/svg+xml")
        XCTAssertTrue(svg.isPlausibleInlineImagePayload)
        XCTAssertFalse(Data("{\"type\":\"excalidraw\"}".utf8).isPlausibleInlineImagePayload)
        XCTAssertFalse(Data().isPlausibleInlineImagePayload)
    }
}
