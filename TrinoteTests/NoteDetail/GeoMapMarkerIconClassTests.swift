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
}
