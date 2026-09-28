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
        let settings = GeoMapDisplaySettings(from: note, defaultStyle: .versatilesColorfulEclipse)
        XCTAssertEqual(settings.mapStyle, .versatilesColorfulEclipse, "no #map:style: the server's Trilium default")
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
        let settings = GeoMapDisplaySettings(from: note, defaultStyle: .openstreetmap)
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

    private func mapNote(style: String) -> NoteItem {
        NoteItem(
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
                AttributeItem(attributeId: "a1", noteId: "n1", type: .label, name: "map:style", value: style, position: 0, isInheritable: false),
            ]
        )
    }

    func testReadsEveryTriliumStyle() {
        let stored = [
            "openstreetmap", "versatiles-colorful", "versatiles-eclipse", "versatile-colorful-eclipse",
            "versatiles-graybeard", "versatiles-shadow", "versatile-graybeard-shadow", "versatiles-neutrino",
        ]
        XCTAssertEqual(
            stored.map { GeoMapDisplaySettings(from: mapNote(style: $0), defaultStyle: .openstreetmap).mapStyle.rawValue },
            stored
        )
        XCTAssertEqual(GeoMapDisplaySettings(from: mapNote(style: "versatiles-future"), defaultStyle: .versatilesColorful).mapStyle, .versatilesColorful)
    }

    func testDefaultAndLightDarkStylesFollowTheServersTrilium() {
        func info(_ version: String) -> AppInfoResponse? {
            try? JSONDecoder().decode(AppInfoResponse.self, from: Data(#"{"appVersion":"\#(version)","dbVersion":240}"#.utf8))
        }
        XCTAssertEqual(GeoMapStyleID.triliumDefault(for: info("0.105.0")), .versatilesColorful)
        XCTAssertEqual(GeoMapStyleID.triliumDefault(for: info("0.106.0")), .versatilesColorfulEclipse)
        XCTAssertFalse(GeoMapStyleID.available(for: info("0.105.0")).contains { $0.followsDarkMode })
        XCTAssertEqual(GeoMapStyleID.available(for: info("0.106.0")), GeoMapStyleID.allCases)
    }

    @MainActor
    func testEveryVersaTilesStyleIsBundled() throws {
        for name in GeoMapWebViewStyleInjection.styleNames {
            let url = Bundle.main.bundleURL.appendingPathComponent(GeoMapWebViewStyleInjection.bundledStylePath(name))
            let style = try XCTUnwrap(JSONSerialization.jsonObject(with: Data(contentsOf: url)) as? [String: Any], name)
            XCTAssertNotNil((style["sources"] as? [String: Any])?["versatiles-shortbread"], "\(name) draws the map data the 3D buildings use")
        }
    }
}
