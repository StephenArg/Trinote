import XCTest
import ImageIO
import UniformTypeIdentifiers
@testable import Trinote

/// Shared HEIC photos become JPEG before they're made into a note (`SharedImportImageConverter`).
final class SharedImportImageConverterTests: XCTestCase {
    /// A solid HEIC picture stored `width`×`height` with an EXIF orientation and capture date, as the camera writes one.
    private func makeHEIC(width: Int, height: Int, orientation: Int) throws -> Data {
        let context = try XCTUnwrap(CGContext(
            data: nil,
            width: width,
            height: height,
            bitsPerComponent: 8,
            bytesPerRow: 0,
            space: CGColorSpaceCreateDeviceRGB(),
            bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
        ))
        context.setFillColor(red: 0.9, green: 0.2, blue: 0.1, alpha: 1)
        context.fill(CGRect(x: 0, y: 0, width: width, height: height))
        let image = try XCTUnwrap(context.makeImage())
        let output = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(output, UTType.heic.identifier as CFString, 1, nil) else {
            throw XCTSkip("This simulator can't write HEIC")
        }
        let properties: [CFString: Any] = [
            kCGImagePropertyOrientation: orientation,
            kCGImagePropertyExifDictionary: [kCGImagePropertyExifDateTimeOriginal: "2024:05:06 07:08:09"],
        ]
        CGImageDestinationAddImage(destination, image, properties as CFDictionary)
        guard CGImageDestinationFinalize(destination) else {
            throw XCTSkip("This simulator can't write HEIC")
        }
        return output as Data
    }

    private func properties(of data: Data) throws -> [CFString: Any] {
        let source = try XCTUnwrap(CGImageSourceCreateWithData(data as CFData, nil))
        return try XCTUnwrap(CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [CFString: Any])
    }

    private func package(_ data: Data, filename: String?, mime: String, kind: SharedImportKind = .image) -> SharedImportPackage {
        SharedImportPackage(
            payload: SharedImportPayload(
                filename: filename,
                mimeType: mime,
                uti: nil,
                kind: kind,
                text: nil,
                hasBinaryData: true
            ),
            binaryData: data
        )
    }

    func testHEICBecomesAnUprightJPEGKeepingItsMetadata() throws {
        // Orientation 6: stored on its side, shown turned a quarter clockwise.
        let heic = try makeHEIC(width: 64, height: 32, orientation: 6)
        XCTAssertTrue(SharedImportImageConverter.isHEIC(mime: nil, data: heic), "recognised from the bytes alone")

        let jpeg = try XCTUnwrap(SharedImportImageConverter.jpegCopy(ofHEIC: heic))

        XCTAssertEqual(jpeg.detectImageMIME(), "image/jpeg")
        let props = try properties(of: jpeg)
        XCTAssertEqual((props[kCGImagePropertyPixelWidth] as? NSNumber)?.intValue, 32)
        XCTAssertEqual((props[kCGImagePropertyPixelHeight] as? NSNumber)?.intValue, 64)
        XCTAssertEqual((props[kCGImagePropertyOrientation] as? NSNumber)?.intValue ?? 1, 1, "already upright")
        let exif = props[kCGImagePropertyExifDictionary] as? [CFString: Any]
        XCTAssertEqual(exif?[kCGImagePropertyExifDateTimeOriginal] as? String, "2024:05:06 07:08:09")
    }

    func testSharedHEICPictureTakesAJPEGNameAndType() throws {
        let heic = try makeHEIC(width: 64, height: 64, orientation: 1)

        let converted = SharedImportImageConverter.convertingHEIC(package(heic, filename: "IMG_0001.HEIC", mime: "image/heic"))

        XCTAssertEqual(converted.payload.filename, "IMG_0001.jpg")
        XCTAssertEqual(converted.payload.mimeType, "image/jpeg")
        XCTAssertEqual(converted.payload.uti, UTType.jpeg.identifier)
        XCTAssertEqual(converted.binaryData?.detectImageMIME(), "image/jpeg")
        XCTAssertEqual(converted.payload.kind, .image)
    }

    func testOtherPicturesAreLeftAsTheyAre() throws {
        let png = try XCTUnwrap(Data(base64Encoded:
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        ))
        let shared = package(png, filename: "dot.png", mime: "image/png")
        XCTAssertEqual(SharedImportImageConverter.convertingHEIC(shared), shared)
    }

    func testUnreadableHEICIsKeptRatherThanLost() {
        let shared = package(Data("not a picture".utf8), filename: "broken.heic", mime: "image/heic")
        XCTAssertEqual(SharedImportImageConverter.convertingHEIC(shared), shared)
    }

    func testJPEGNames() {
        XCTAssertEqual(SharedImportImageConverter.jpegFilename(for: "IMG_0001.HEIC"), "IMG_0001.jpg")
        XCTAssertEqual(SharedImportImageConverter.jpegFilename(for: "Image 01-02-2024 10:11:12.heif"), "Image 01-02-2024 10:11:12.jpg")
        XCTAssertEqual(SharedImportImageConverter.jpegFilename(for: "photo"), "photo.jpg")
        XCTAssertNil(SharedImportImageConverter.jpegFilename(for: nil))
        XCTAssertNil(SharedImportImageConverter.jpegFilename(for: "  "))
    }
}
