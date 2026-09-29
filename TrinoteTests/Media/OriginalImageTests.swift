import UIKit
import UniformTypeIdentifiers
import XCTest
@testable import Trinote

@MainActor
final class OriginalImageTests: XCTestCase {
    private func fixture(_ name: String, _ ext: String) throws -> Data {
        let bundle = Bundle(for: OriginalImageTests.self)
        let url = try XCTUnwrap(bundle.url(forResource: name, withExtension: ext, subdirectory: "Fixtures"))
        return try Data(contentsOf: url)
    }

    func testAnimatedAVIFKeepsItsBytesAndFormat() throws {
        let data = try fixture("animated-5-frames", "avif")
        let image = try XCTUnwrap(OriginalImage(data: data))
        XCTAssertTrue(image.isAnimated)
        XCTAssertTrue(data.isAVIFSequence)
        XCTAssertEqual(image.data, data)
        XCTAssertEqual(image.contentType?.identifier, "public.avif")
        XCTAssertEqual(image.still.size, CGSize(width: 64, height: 64))
    }

    func testAnimatedGIFIsAnimated() throws {
        let image = try XCTUnwrap(OriginalImage(data: fixture("animated-4-frames", "gif")))
        XCTAssertTrue(image.isAnimated)
        XCTAssertEqual(image.contentType, .gif)
    }

    func testStillImageIsNotAnimated() throws {
        let png = try XCTUnwrap(UIGraphicsImageRenderer(size: CGSize(width: 4, height: 4)).image { _ in }.pngData())
        let image = try XCTUnwrap(OriginalImage(data: png))
        XCTAssertFalse(image.isAnimated)
    }

    func testFilenameCarriesTheRealExtension() throws {
        let image = try XCTUnwrap(OriginalImage(data: fixture("animated-5-frames", "avif")))
        XCTAssertEqual(image.filename(title: "Beach"), "Beach.avif")
        XCTAssertEqual(image.filename(title: "beach.AVIF"), "beach.AVIF")
        XCTAssertEqual(image.filename(title: nil), "image.avif")
        XCTAssertEqual(image.filename(title: "  "), "image.avif")
    }

    func testShareItemIsTheOriginalFileAndIsRemovedWhenDone() throws {
        let data = try fixture("animated-5-frames", "avif")
        let image = try XCTUnwrap(OriginalImage(data: data))
        let item = image.shareSheetItem(title: "Loop")

        let url = try XCTUnwrap(item.items.first as? URL)
        XCTAssertEqual(item.items.count, 1)
        XCTAssertTrue(url.lastPathComponent.hasSuffix("Loop.avif"))
        XCTAssertEqual(try Data(contentsOf: url), data)

        item.onComplete?()
        XCTAssertFalse(FileManager.default.fileExists(atPath: url.path))
    }

    func testAnimatorPlaysFramesAndStops() throws {
        let image = try XCTUnwrap(OriginalImage(data: fixture("animated-4-frames", "gif")))
        let imageView = UIImageView(image: image.still)
        let animator = ImageFrameAnimator()
        animator.start(image, in: imageView)

        // Frames are 0.2 s apart; sample well past one full loop.
        var seen = Set<ObjectIdentifier>()
        for _ in 0..<24 {
            RunLoop.main.run(until: Date().addingTimeInterval(0.05))
            if let shown = imageView.image { seen.insert(ObjectIdentifier(shown)) }
        }
        XCTAssertGreaterThanOrEqual(seen.count, 3)

        animator.stop()
        RunLoop.main.run(until: Date().addingTimeInterval(0.25))
        let stopped = imageView.image
        RunLoop.main.run(until: Date().addingTimeInterval(0.5))
        XCTAssertTrue(imageView.image === stopped)
    }
}
