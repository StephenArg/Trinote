import UIKit
import WebKit
import XCTest
@testable import Trinote

/// Image maps: positions on a picture carried through the map engine's longitude and latitude. The cases follow
/// Trilium's own `space.spec.ts`.
final class GeoMapImageSpaceTests: XCTestCase {
    private let space = GeoMapImageSpace(width: 2048, height: 1024)!

    private func parse(_ value: String, in space: GeoMapImageSpace) -> (lat: Double, lng: Double) {
        guard let point = space.parseLocation(value) else {
            XCTFail("unreadable \(value)")
            return (0, 0)
        }
        return point
    }

    func testAPixelPositionRoundTrips() {
        let point = parse("120.5,45", in: space)
        XCTAssertEqual(space.serializeLocation(lat: point.lat, lng: point.lng), "120.5,45")
        XCTAssertEqual(space.formatLocation(lat: point.lat, lng: point.lng), "121, 45")
        XCTAssertEqual(space.formatLocation(lat: point.lat, lng: point.lng, full: true), "120.5, 45")
        XCTAssertNil(space.parseLocation("not a point"))
    }

    func testTheImageIsLaidOutTopLeftFirst() {
        let corners = space.corners
        let topLeft = parse("0,0", in: space)
        let bottomRight = parse("2048,1024", in: space)
        XCTAssertEqual(corners[0], [topLeft.lng, topLeft.lat])
        XCTAssertEqual(corners[2], [bottomRight.lng, bottomRight.lat])
        XCTAssertGreaterThan(corners[0][1], corners[3][1], "the top is north of the bottom")
        XCTAssertGreaterThan(corners[1][0], corners[0][0], "the right is east of the left")
    }

    func testTheCameraStaysInOneWorldAndZoomsTwoLevelsPastThePixels() {
        let box = space.maxBounds
        XCTAssertGreaterThan(box[0][0], -180)
        XCTAssertLessThan(box[1][0], 180)
        XCTAssertGreaterThan(box[0][1], -85)
        XCTAssertLessThan(box[1][1], 85)
        // 2048 pixels fill 256 at zoom 0, so zoom 3 is a pixel per pixel.
        XCTAssertEqual(space.maxZoom, 5, accuracy: 1e-9)
    }

    private func shape(_ value: String, in space: GeoMapImageSpace) -> GeoMapShape {
        guard let shape = space.shape(noteId: "n", title: "T", value: value, color: nil) else {
            XCTFail("unreadable \(value)")
            return GeoMapShape(noteId: "n", title: "T", kind: .line, coordinates: [], radiusMeters: nil, ring: nil, color: nil)
        }
        return shape
    }

    func testShapesRoundTrip() {
        for value in ["line:10,20 30,40", "polygon:0,0 100,0 100,50", "circle:100,200 50"] {
            let read = shape(value, in: space)
            XCTAssertEqual(
                space.serializeShape(kind: read.kind, coordinates: read.coordinates, radiusMeters: read.radiusMeters, ring: read.ring),
                value
            )
        }
    }

    func testACircleStaysARoundOneOnTheImage() throws {
        let circle = shape("circle:1000,10 40", in: space)
        let ring = try XCTUnwrap(circle.ring)
        XCTAssertEqual(ring.count, 64)
        for point in ring {
            let world = space.toWorld(lng: point[0], lat: point[1])
            XCTAssertEqual(hypot(world.x - 1000, world.y - 10), 40, accuracy: 0.1)
        }
    }

    func testADrawnCircleIsStoredAtTheSizeItWasDrawn() throws {
        // The drawing tool reports a centre and a radius in meters; this is the circle read back from a label.
        let drawn = shape("circle:1000,500 80", in: space)
        let value = try XCTUnwrap(space.serializeShape(kind: .circle, coordinates: drawn.coordinates, radiusMeters: drawn.radiusMeters))
        let reread = shape(value, in: space)
        let parts = value.split(separator: " ")
        XCTAssertEqual(Double(parts[1]) ?? 0, 80, accuracy: 4)
        XCTAssertEqual(reread.kind, .circle)
    }

    func testNamedCornersAreUsedUnchanged() throws {
        let size = (width: 1000.0, height: 500.0)
        let extent = try XCTUnwrap(GeoMapImageSpace.Extent(label: "-2000,1000 2000,-1000"))
        let named = try XCTUnwrap(GeoMapImageSpace(width: size.width, height: size.height, extent: extent))
        let pixels = try XCTUnwrap(GeoMapImageSpace(width: size.width, height: size.height))

        func assertSame(_ first: (lat: Double, lng: Double), _ second: (lat: Double, lng: Double)) {
            XCTAssertEqual(first.lat, second.lat, accuracy: 1e-9)
            XCTAssertEqual(first.lng, second.lng, accuracy: 1e-9)
        }
        assertSame(parse("-2000,1000", in: named), parse("0,0", in: pixels))
        assertSame(parse("2000,-1000", in: named), parse("1000,500", in: pixels))
        assertSame(parse("0,0", in: named), parse("500,250", in: pixels))
        XCTAssertGreaterThan(parse("0,500", in: named).lat, parse("0,0", in: named).lat, "a larger y stands higher")

        let point = parse("123.456,-78.9", in: named)
        XCTAssertEqual(named.serializeLocation(lat: point.lat, lng: point.lng), "123.46,-78.9")
        XCTAssertEqual(named.formatLocation(lat: point.lat, lng: point.lng), "123, -79")
        XCTAssertEqual(named.formatLocation(lat: point.lat, lng: point.lng, full: true), "123.46, -78.9")

        let fine = try XCTUnwrap(GeoMapImageSpace(width: size.width, height: size.height, extent: GeoMapImageSpace.Extent(label: "0,0 1,0.5")))
        let finePoint = parse("0.123456,0.25", in: fine)
        XCTAssertEqual(fine.serializeLocation(lat: finePoint.lat, lng: finePoint.lng), "0.12346,0.25")
    }

    func testACircleIsAnEllipseWhereTheAxesDiffer() throws {
        let stretched = try XCTUnwrap(GeoMapImageSpace(width: 1000, height: 500, extent: GeoMapImageSpace.Extent(label: "0,0 1000,2000")))
        let pixels = try XCTUnwrap(GeoMapImageSpace(width: 1000, height: 500))
        let circle = shape("circle:500,1000 200", in: stretched)
        let ring = try XCTUnwrap(circle.ring)
        let world = ring.map { pixels.toWorld(lng: $0[0], lat: $0[1]) }
        XCTAssertEqual((world.map(\.x).max() ?? 0) - (world.map(\.x).min() ?? 0), 400, accuracy: 1)
        XCTAssertEqual((world.map(\.y).max() ?? 0) - (world.map(\.y).min() ?? 0), 100, accuracy: 1)
        XCTAssertEqual(
            stretched.serializeShape(kind: .circle, coordinates: circle.coordinates, radiusMeters: circle.radiusMeters, ring: ring),
            "circle:500,1000 200"
        )
    }

    func testBoundsThatSpanNothingNameNoCorners() {
        XCTAssertNil(GeoMapImageSpace.Extent(label: "0,0 0,10"))
        XCTAssertNil(GeoMapImageSpace.Extent(label: "0,0"))
        XCTAssertNil(GeoMapImageSpace.Extent(label: nil))
        XCTAssertNotNil(GeoMapImageSpace.Extent(label: " 0,0   10,10 "))
    }

    func testEachMapReadsItsOwnLabels() {
        XCTAssertEqual(GeoMapSpace.geo.locationLabel, "geolocation")
        XCTAssertEqual(GeoMapSpace.geo.shapeLabel, "geoShape")
        XCTAssertEqual(GeoMapSpace.image(space).locationLabel, "mapPosition")
        XCTAssertEqual(GeoMapSpace.image(space).shapeLabel, "mapShape")
    }

    private func note(_ attributes: [AttributeItem]) -> NoteItem {
        NoteItem(from: TestFixtures.noteResponse(id: "map")).withAttributes(attributes)
    }

    private func attribute(_ type: AttributeItem.AttributeKind, _ name: String, _ value: String) -> AttributeItem {
        AttributeItem(attributeId: name, noteId: "map", type: type, name: name, value: value, position: 0, isInheritable: false)
    }

    func testOnlyAnActiveRelationMakesAnImageMap() {
        XCTAssertNil(GeoMapImageRequest(note: note([])))
        XCTAssertNil(GeoMapImageRequest(note: note([attribute(.relation, "disabled:map:image", "img")])))
        let request = GeoMapImageRequest(note: note([
            attribute(.relation, "map:image", "img"),
            attribute(.label, "map:imageBounds", "0,0 10,10"),
            attribute(.label, "map:darkStyle", ""),
        ]))
        XCTAssertEqual(request?.imageNoteId, "img")
        XCTAssertEqual(request?.extent?.right, 10)
        XCTAssertEqual(request?.darkLabels, true)
    }

    // MARK: The body's two cameras

    func testTheImageCameraIsKeptBesideTheWorldOne() throws {
        let world = #"{"view":{"center":{"lat":1,"lng":2},"zoom":3}}"#
        let moved = #"{"view":{"center":{"lat":5,"lng":6},"zoom":2}}"#
        let merged = GeoMapViewConfig.merging(moved, as: GeoMapViewConfig.imageKey, into: world)
        XCTAssertEqual(merged, #"{"imageView":{"center":{"lat":5,"lng":6},"zoom":2},"view":{"center":{"lat":1,"lng":2},"zoom":3}}"#)
        XCTAssertEqual(GeoMapViewConfig.savedImageView(in: merged), moved)
        XCTAssertNil(GeoMapViewConfig.savedImageView(in: world))

        let worldMoved = GeoMapViewConfig.merging(world, as: GeoMapViewConfig.geoKey, into: merged)
        XCTAssertTrue(worldMoved.contains("imageView"), "saving the world map's camera keeps the image's")
    }

    func testAPlainWorldMapBodyIsWrittenAsBefore() {
        let canonical = #"{"view":{"center":{"lat":1,"lng":2},"zoom":3}}"#
        XCTAssertEqual(GeoMapViewConfig.merging(canonical, as: GeoMapViewConfig.geoKey, into: #"{"center":[1,2],"zoom":3}"#), canonical)
        XCTAssertEqual(GeoMapViewConfig.merging(canonical, as: GeoMapViewConfig.geoKey, into: nil), canonical)
    }

    // MARK: Decoding

    private func png(width: Int, height: Int) -> Data {
        let format = UIGraphicsImageRendererFormat()
        format.scale = 1
        return UIGraphicsImageRenderer(size: CGSize(width: width, height: height), format: format).pngData { context in
            UIColor.red.setFill()
            context.fill(CGRect(x: 0, y: 0, width: width, height: height))
        }
    }

    func testAnOrdinaryImageGoesThroughUntouchedWithItsSize() throws {
        let data = png(width: 300, height: 200)
        let decoded = try XCTUnwrap(GeoMapImageDecoder.decode(data))
        XCTAssertEqual(decoded.width, 300)
        XCTAssertEqual(decoded.height, 200)
        XCTAssertEqual(decoded.dataURL, "data:image/png;base64,\(data.base64EncodedString())")
    }

    func testAnOversizedImageIsShrunkButKeepsItsNaturalSize() throws {
        let decoded = try XCTUnwrap(GeoMapImageDecoder.decode(png(width: 5000, height: 100)))
        XCTAssertEqual(decoded.width, 5000)
        XCTAssertEqual(decoded.height, 100)
        let base64 = try XCTUnwrap(decoded.dataURL.components(separatedBy: "base64,").last)
        let image = try XCTUnwrap(UIImage(data: try XCTUnwrap(Data(base64Encoded: base64))))
        XCTAssertEqual(max(image.size.width, image.size.height), CGFloat(GeoMapImageDecoder.maxSide))
    }

    func testBytesThatAreNoImageAreRefused() {
        XCTAssertNil(GeoMapImageDecoder.decode(Data("<html></html>".utf8)))
    }

    // MARK: The engine

    @MainActor
    private final class Loader: NSObject, WKNavigationDelegate {
        var finished: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            finished?.resume()
            finished = nil
        }
    }

    @MainActor
    func testTheEngineDrawsTheImageWithItsLimits() async throws {
        let window = try XCTUnwrap(
            UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.flatMap(\.windows).first,
            "the test host has no window"
        )
        let web = WKWebView(frame: CGRect(x: 0, y: 0, width: 320, height: 320), configuration: WKWebViewConfiguration())
        window.addSubview(web)
        defer { web.removeFromSuperview() }
        let loader = Loader()
        web.navigationDelegate = loader
        let url = try XCTUnwrap(Bundle.main.url(forResource: "geomap-viewer", withExtension: "html"))
        await withCheckedContinuation { continuation in
            loader.finished = continuation
            web.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        }

        let decoded = try XCTUnwrap(GeoMapImageDecoder.decode(png(width: 512, height: 256)))
        let image = GeoMapImage(key: "k", dataURL: decoded.dataURL, space: try XCTUnwrap(GeoMapImageSpace(width: 512, height: 256)), darkLabels: false)
        _ = try await web.evaluateJavaScript(#"window.geoMapViewer.init(\#(image.defaultViewportJSON), "{}", \#(image.bridgeJSON(fit: true))); 1"#)

        struct State: Decodable { let imageLoaded: Bool?; let maxZoom: Double?; let zoom: Double?; let styleLoaded: Bool }
        var state: State?
        for _ in 0..<150 {
            let json = try await web.evaluateJavaScript("window.geoMapViewer.debugMarkerState()") as? String
            state = json.flatMap { try? JSONDecoder().decode(State.self, from: Data($0.utf8)) }
            if state?.imageLoaded == true, state?.styleLoaded == true { break }
            try await Task.sleep(nanoseconds: 100_000_000)
        }
        XCTAssertEqual(state?.imageLoaded, true, "the picture never loaded from its data URL")
        XCTAssertEqual(state?.maxZoom ?? 0, 3, accuracy: 1e-9)
        // Fitted: 512 pixels fill 256 at zoom 0, and the view is 320 across.
        XCTAssertEqual(state?.zoom ?? 0, log2(320.0 / 256.0), accuracy: 0.05)
    }
}
