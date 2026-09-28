import XCTest
@testable import Trinote

final class GeoMapShapeSerializationTests: XCTestCase {
    func testLineAndPolygonWriteLatitudeFirstWithoutTrailingZeros() {
        XCTAssertEqual(
            GeoMapShape.serializedValue(kind: .line, coordinates: [[2.29450061, 48.85826], [2.3, 48.86]]),
            "line:48.85826,2.294501 48.86,2.3"
        )
        // A closed ring loses its repeated first point, as the web stores it.
        XCTAssertEqual(
            GeoMapShape.serializedValue(kind: .polygon, coordinates: [[0, 1], [1, 1], [1, 0], [0, 1]]),
            "polygon:1,0 1,1 0,1"
        )
    }

    func testCircleKeepsCentreAndRadiusToADecimetre() {
        XCTAssertEqual(
            GeoMapShape.serializedValue(kind: .circle, coordinates: [[-0.1276, 51.5072]], radiusMeters: 120.04),
            "circle:51.5072,-0.1276 120"
        )
        XCTAssertEqual(GeoMapShape.serializedValue(kind: .circle, coordinates: [[0, 0]], radiusMeters: 5.27), "circle:0,0 5.3")
        XCTAssertNil(GeoMapShape.serializedValue(kind: .circle, coordinates: [[0, 0]], radiusMeters: 0))
    }

    func testTooFewPointsGiveNoShape() {
        XCTAssertNil(GeoMapShape.serializedValue(kind: .line, coordinates: [[1, 2]]))
        XCTAssertNil(GeoMapShape.serializedValue(kind: .polygon, coordinates: [[1, 2], [3, 4]]))
    }

    func testWrittenShapesReadBack() throws {
        let value = try XCTUnwrap(GeoMapShape.serializedValue(kind: .polygon, coordinates: [[2.29, 48.85], [2.3, 48.85], [2.3, 48.86]]))
        let shape = try XCTUnwrap(GeoMapShape(noteId: "n", title: "Area", value: value, color: nil))
        XCTAssertEqual(shape.kind, .polygon)
        XCTAssertEqual(shape.coordinates, [[2.29, 48.85], [2.3, 48.85], [2.3, 48.86]])
    }
}
