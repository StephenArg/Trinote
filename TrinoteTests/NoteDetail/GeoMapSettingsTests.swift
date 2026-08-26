import XCTest
@testable import Trinote

final class GeoMapSettingsTests: XCTestCase {

    func testDefaultsWhenLabelsAbsent() {
        let note = NoteItem(
            noteId: "n1",
            title: "Map",
            type: .geoMap,
            mime: "application/json",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: [],
            childNoteIds: [],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: []
        )
        let settings = GeoMapDisplaySettings(from: note)
        XCTAssertEqual(settings.mapStyle, .openstreetmap)
        XCTAssertFalse(settings.showScale)
        XCTAssertEqual(settings.scaleUnit, .metric)
        XCTAssertTrue(settings.hideLabels)
        XCTAssertTrue(settings.cluster)
    }

    func testReadsTriliumLabels() {
        let note = NoteItem(
            noteId: "n1",
            title: "Map",
            type: .geoMap,
            mime: "application/json",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: [],
            childNoteIds: [],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: [
                AttributeItem(attributeId: "a1", noteId: "n1", type: .label, name: "map:style", value: "versatiles-colorful", position: 0, isInheritable: false),
                AttributeItem(attributeId: "a2", noteId: "n1", type: .label, name: "map:scale", value: "true", position: 1, isInheritable: false),
                AttributeItem(attributeId: "a5", noteId: "n1", type: .label, name: "map:scaleUnit", value: "imperial", position: 4, isInheritable: false),
                AttributeItem(attributeId: "a3", noteId: "n1", type: .label, name: "map:hideLabels", value: "false", position: 2, isInheritable: false),
                AttributeItem(attributeId: "a4", noteId: "n1", type: .label, name: "map:cluster", value: "false", position: 3, isInheritable: false),
            ]
        )
        let settings = GeoMapDisplaySettings(from: note)
        XCTAssertEqual(settings.mapStyle, .versatilesColorful)
        XCTAssertTrue(settings.showScale)
        XCTAssertEqual(settings.scaleUnit, .imperial)
        XCTAssertFalse(settings.hideLabels)
        XCTAssertFalse(settings.cluster)
    }

    func testBridgeJSONContainsStyle() throws {
        let settings = GeoMapDisplaySettings(
            mapStyle: .versatilesColorful, showScale: true, scaleUnit: .imperial, hideLabels: false, cluster: true
        )
        let data = try XCTUnwrap(settings.bridgeJSON().data(using: .utf8))
        let json = try XCTUnwrap(JSONSerialization.jsonObject(with: data) as? [String: Any])
        XCTAssertEqual(json["mapStyle"] as? String, "versatiles-colorful")
        XCTAssertEqual(json["showScale"] as? Bool, true)
        XCTAssertEqual(json["scaleUnit"] as? String, "imperial")
        XCTAssertEqual(json["hideLabels"] as? Bool, false)
        XCTAssertEqual(json["cluster"] as? Bool, true)
    }

    func testMapsUnsupportedTriliumVectorStylesToColorful() {
        let note = NoteItem(
            noteId: "n1",
            title: "Map",
            type: .geoMap,
            mime: "application/json",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: [],
            childNoteIds: [],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: [
                AttributeItem(attributeId: "a1", noteId: "n1", type: .label, name: "map:style", value: "versatiles-eclipse", position: 0, isInheritable: false),
            ]
        )
        XCTAssertEqual(GeoMapDisplaySettings(from: note).mapStyle, .versatilesColorful)
    }
}
