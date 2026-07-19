import XCTest
import ImageIO
import UniformTypeIdentifiers
@testable import Trinote

final class SharedImportClassifierTests: XCTestCase {
    func testClassifiesMarkdownByExtension() {
        let kind = SharedImportClassifier.classify(
            filename: "notes.md",
            mimeType: nil,
            uti: nil,
            hasText: true,
            hasBinary: false
        )
        XCTAssertEqual(kind, .markdown)
    }

    func testClassifiesPlainTextByExtension() {
        let kind = SharedImportClassifier.classify(
            filename: "todo.txt",
            mimeType: "text/plain",
            uti: "public.plain-text",
            hasText: true,
            hasBinary: false
        )
        XCTAssertEqual(kind, .plainText)
    }

    func testClassifiesImageByMIME() {
        let kind = SharedImportClassifier.classify(
            filename: "photo.heic",
            mimeType: "image/heic",
            uti: "public.heic",
            hasText: false,
            hasBinary: true
        )
        XCTAssertEqual(kind, .image)
    }

    func testClassifiesPDFAsFile() {
        let kind = SharedImportClassifier.classify(
            filename: "report.pdf",
            mimeType: "application/pdf",
            uti: "com.adobe.pdf",
            hasText: false,
            hasBinary: true
        )
        XCTAssertEqual(kind, .file)
    }

    func testSharedSnippetWithoutFilenameIsPlainText() {
        let kind = SharedImportClassifier.classify(
            filename: nil,
            mimeType: "text/plain",
            uti: "public.plain-text",
            hasText: true,
            hasBinary: false
        )
        XCTAssertEqual(kind, .plainText)
    }
}

final class SharedImportPayloadCodingTests: XCTestCase {
    func testRoundTripPayload() throws {
        let payload = SharedImportPayload(
            filename: "doc.pdf",
            mimeType: "application/pdf",
            uti: "com.adobe.pdf",
            kind: .file,
            text: nil,
            hasBinaryData: true
        )
        let data = try JSONEncoder().encode(payload)
        let decoded = try JSONDecoder().decode(SharedImportPayload.self, from: data)
        XCTAssertEqual(decoded, payload)
    }
}

final class SharedImportTitleTests: XCTestCase {
    func testPrefersSuggestedImageName() {
        let name = SharedImportTitle.imageFilename(
            suggestedName: "IMG_1234",
            existingFilename: "shared-image.jpg",
            mime: "image/jpeg"
        )
        XCTAssertEqual(name, "IMG_1234.jpg")
    }

    func testFallsBackToTimestampWhenPhotosProvidesNoName() {
        let date = Date(timeIntervalSince1970: 1_784_000_000) // fixed for assertion
        let name = SharedImportTitle.imageFilename(
            suggestedName: nil,
            existingFilename: "shared-image.jpg",
            mime: "image/png",
            at: date
        )
        XCTAssertEqual(name, "Image \(SharedImportTitle.formattedTimestamp(at: date)).png")
    }

    func testCaptureDateFromEXIFJPEG() throws {
        // Minimal JPEG with EXIF DateTimeOriginal = 2020:05:15 14:30:00 (built via ImageIO).
        let data = try XCTUnwrap(Self.makeJPEGWithEXIFDateTimeOriginal("2020:05:15 14:30:00"))
        let captured = try XCTUnwrap(SharedImportTitle.captureDate(fromImageData: data))
        let comps = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute, .second], from: captured)
        XCTAssertEqual(comps.year, 2020)
        XCTAssertEqual(comps.month, 5)
        XCTAssertEqual(comps.day, 15)
        XCTAssertEqual(comps.hour, 14)
        XCTAssertEqual(comps.minute, 30)
        XCTAssertEqual(comps.second, 0)
    }

    func testImageFilenameUsesCaptureDateWhenNoSuggestedName() throws {
        let data = try XCTUnwrap(Self.makeJPEGWithEXIFDateTimeOriginal("2020:05:15 14:30:00"))
        let captured = try XCTUnwrap(SharedImportTitle.captureDate(fromImageData: data))
        let name = SharedImportTitle.imageFilename(
            suggestedName: nil,
            mime: "image/jpeg",
            at: SharedImportTitle.preferredImageTitleDate(fromImageData: data)
        )
        XCTAssertEqual(name, "Image \(SharedImportTitle.formattedTimestamp(at: captured)).jpg")
    }

    func testResolvedTitleIgnoresSharedImagePlaceholder() {
        let payload = SharedImportPayload(
            filename: "shared-image.jpg",
            mimeType: "image/jpeg",
            uti: "public.jpeg",
            kind: .image,
            text: nil,
            hasBinaryData: true
        )
        let title = SharedImportImporter.resolvedTitle(for: payload)
        XCTAssertTrue(title.hasPrefix("Image "))
        XCTAssertFalse(title.lowercased().contains("shared-image"))
    }

    func testResolvedTitleKeepsRealFilename() {
        let payload = SharedImportPayload(
            filename: "holiday-beach.heic",
            mimeType: "image/heic",
            uti: "public.heic",
            kind: .image,
            text: nil,
            hasBinaryData: true
        )
        XCTAssertEqual(SharedImportImporter.resolvedTitle(for: payload), "holiday-beach")
    }

    /// 1×1 JPEG with an EXIF DateTimeOriginal tag.
    private static func makeJPEGWithEXIFDateTimeOriginal(_ exifDate: String) -> Data? {
        let width = 1
        let height = 1
        var pixels: [UInt8] = [255, 0, 0, 255]
        guard let provider = CGDataProvider(data: Data(pixels) as CFData),
              let cgImage = CGImage(
                width: width,
                height: height,
                bitsPerComponent: 8,
                bitsPerPixel: 32,
                bytesPerRow: 4,
                space: CGColorSpaceCreateDeviceRGB(),
                bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue),
                provider: provider,
                decode: nil,
                shouldInterpolate: false,
                intent: .defaultIntent
              )
        else { return nil }

        let data = NSMutableData()
        guard let dest = CGImageDestinationCreateWithData(data, UTType.jpeg.identifier as CFString, 1, nil) else {
            return nil
        }
        let exif: [CFString: Any] = [
            kCGImagePropertyExifDateTimeOriginal: exifDate,
        ]
        let props: [CFString: Any] = [
            kCGImagePropertyExifDictionary: exif,
        ]
        CGImageDestinationAddImage(dest, cgImage, props as CFDictionary)
        guard CGImageDestinationFinalize(dest) else { return nil }
        return data as Data
    }
}

