import XCTest
@testable import Trinote

final class GeoMapMarkerIconClassTests: XCTestCase {
    func testUsesRawIconClassLabel() {
        let result = GeoMapMarkerIconClass.forNote(
            type: .text,
            mime: "",
            iconClassLabel: "bx bx-landmark",
            childNoteCount: 0
        )
        XCTAssertEqual(result, "tn-icon bx bx-landmark")
    }

    func testTextNoteWithoutIconClassDefaultsToNote() {
        let result = GeoMapMarkerIconClass.forNote(
            type: .text,
            mime: "",
            iconClassLabel: nil,
            childNoteCount: 0
        )
        XCTAssertEqual(result, "tn-icon bx bx-note")
    }

    func testTextFolderDefaultsToFolder() {
        let result = GeoMapMarkerIconClass.forNote(
            type: .text,
            mime: "",
            iconClassLabel: nil,
            childNoteCount: 2
        )
        XCTAssertEqual(result, "tn-icon bx bx-folder")
    }

    func testGpxFileDefaultsToTrip() {
        let result = GeoMapMarkerIconClass.forNote(
            type: .file,
            mime: GeoMapDisplaySettings.gpxMIME,
            iconClassLabel: nil,
            childNoteCount: 0
        )
        XCTAssertEqual(result, "tn-icon bx bx-trip")
    }

    // MARK: - Trilium v0.106 geo note icons

    func testMarkerWithoutIconClassUsesPinThenFolderRule() {
        let pin = GeoMapMarkerIconClass.forNote(
            type: .text, mime: "", iconClassLabel: nil, childNoteCount: 3,
            labelValue: { $0 == "geolocation" ? "48.85,2.29" : nil }
        )
        XCTAssertEqual(pin, "tn-icon bx bx-pin", "a place outranks the folder icon")
        let own = GeoMapMarkerIconClass.forNote(
            type: .text, mime: "", iconClassLabel: "bx bx-landmark", childNoteCount: 0,
            labelValue: { $0 == "geolocation" ? "48.85,2.29" : nil }
        )
        XCTAssertEqual(own, "tn-icon bx bx-landmark")
    }

    func testGeoDefaultIconClassForShapes() {
        func icon(_ shape: String) -> String? {
            NoteIconClassResolver.geoDefaultIconClass(isTextNote: true) { $0 == "geoShape" ? shape : nil }
        }
        XCTAssertEqual(icon("polygon:1,2 3,4 5,6"), "bx bx-shape-polygon")
        XCTAssertEqual(icon("circle:1,2 500"), "bx bx-shape-circle")
        XCTAssertEqual(icon("line:1,2 3,4"), "bx bx-vector")
        XCTAssertEqual(icon("garbage"), "bx bx-vector")
        XCTAssertNil(NoteIconClassResolver.geoDefaultIconClass(isTextNote: false) { _ in "48,2" })
        XCTAssertNil(NoteIconClassResolver.geoDefaultIconClass(isTextNote: true) { _ in nil })
    }

    // MARK: - #geoShape parsing

    func testParsesLinePolygonAndCircle() throws {
        let line = try XCTUnwrap(GeoMapShape(noteId: "l", title: "L", value: "line:48.858093,2.294694 48.860294,2.338629", color: nil))
        XCTAssertEqual(line.kind, .line)
        XCTAssertEqual(line.coordinates, [[2.294694, 48.858093], [2.338629, 48.860294]], "stored lat,lng; drawn lng,lat")

        let polygon = try XCTUnwrap(GeoMapShape(noteId: "p", title: "P", value: "polygon:1,1 1,2  2,2", color: "red"))
        XCTAssertEqual(polygon.coordinates.count, 3)
        XCTAssertEqual(polygon.colorHex.count, 7)

        let circle = try XCTUnwrap(GeoMapShape(noteId: "c", title: "C", value: "circle:48.85,2.29 500", color: nil))
        XCTAssertEqual(circle.kind, .circle)
        XCTAssertEqual(circle.coordinates, [[2.29, 48.85]])
        XCTAssertEqual(circle.radiusMeters, 500)
        XCTAssertEqual(circle.focusCoordinate?.lat, 48.85)
    }

    func testRejectsShapesTriliumWouldNotDraw() {
        for value in ["", "line:", "line:1,2", "polygon:1,2 3,4", "circle:1,2", "circle:1,2 0", "circle:1,2 3,4 5",
                      "square:1,2 3,4", "line:1,2 3", "line:a,b c,d"] {
            XCTAssertNil(GeoMapShape(noteId: "x", title: "X", value: value, color: nil), value)
        }
    }

    func testShapesBridgeJSON() throws {
        let circle = try XCTUnwrap(GeoMapShape(noteId: "c", title: "C", value: "circle:1,2 10", color: nil))
        let json = try XCTUnwrap([circle].bridgeJSONArray())
        let decoded = try XCTUnwrap(JSONSerialization.jsonObject(with: Data(json.utf8)) as? [[String: Any]])
        XCTAssertEqual(decoded.first?["type"] as? String, "circle")
        XCTAssertEqual(decoded.first?["radiusMeters"] as? Double, 10)
        XCTAssertEqual(decoded.first?["noteId"] as? String, "c")
    }
}
