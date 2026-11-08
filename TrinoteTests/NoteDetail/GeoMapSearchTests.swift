import XCTest
@testable import Trinote

final class GeoMapSearchTests: XCTestCase {
    private let paris = GeoMapSearch.Coordinate(lat: 48.8566, lng: 2.3522)

    func testMatchesEveryWordIgnoringCaseAccentsAndOrder() {
        XCTAssertTrue(GeoMapSearch.matches(GeoMapSearch.tokens("zurich"), title: "Zürich Hauptbahnhof"))
        XCTAssertTrue(GeoMapSearch.matches(GeoMapSearch.tokens("hotel PARIS"), title: "Paris Hotel"))
        XCTAssertFalse(GeoMapSearch.matches(GeoMapSearch.tokens("hotel rome"), title: "Paris Hotel"))
        XCTAssertFalse(GeoMapSearch.matches(GeoMapSearch.tokens("   "), title: "Paris Hotel"))
    }

    func testReadsTheFormsCoordinatesArePastedIn() throws {
        let expected = GeoMapSearch.Coordinate(lat: 45.9432, lng: 24.9668)
        for query in [
            "45.9432, 24.9668",
            " 45.9432 24.9668 ",
            "geo:45.9432,24.9668?z=12",
            "https://www.openstreetmap.org/?mlat=45.9432&mlon=24.9668#map=15/45.9432/24.9668",
            "https://www.openstreetmap.org/#map=15/45.9432/24.9668",
            "https://maps.google.com/?q=45.9432,24.9668",
            "https://www.google.com/maps/place/Somewhere/@45.9432,24.9668,15z",
        ] {
            XCTAssertEqual(GeoMapSearch.coordinate(in: query), expected, query)
        }
        XCTAssertEqual(GeoMapSearch.coordinate(in: "-33.86, 151.21"), GeoMapSearch.Coordinate(lat: -33.86, lng: 151.21))
        XCTAssertNil(GeoMapSearch.coordinate(in: "1234, 5678"), "a pair off the Earth is not a point")
        XCTAssertNil(GeoMapSearch.coordinate(in: "Paris"))
        XCTAssertNil(GeoMapSearch.coordinate(in: "Route 66 5"))
    }

    func testATypedPointIsAnUnnamedPlaceNamedByItsCoordinates() {
        let place = GeoMapSearch.place(at: GeoMapSearch.Coordinate(lat: 45.9432, lng: 24.9668))
        XCTAssertEqual(place.name, "45.9432, 24.9668")
        XCTAssertTrue(place.isUnnamed)
        XCTAssertNil(place.bounds)
    }

    func testNotesAreMatchedOnceNearestFirstWithTracksLast() throws {
        let louvre = GeoMapPin(noteId: "louvre", title: "Musée du Louvre", lat: 48.8606, lng: 2.3376)
        let lyon = GeoMapPin(noteId: "lyon", title: "Musée des Confluences", lat: 45.7326, lng: 4.8182)
        func polygon(_ points: [[Double]]) throws -> String {
            try XCTUnwrap(GeoMapShape.serializedValue(kind: .polygon, coordinates: points))
        }
        let orsayArea = try XCTUnwrap(GeoMapShape(
            noteId: "orsay", title: "Musée d'Orsay grounds", value: polygon([[2.326, 48.86], [2.327, 48.86], [2.327, 48.861]]), color: nil
        ))
        // A note with a location and a shape is listed once, as a marker.
        let louvreShape = try XCTUnwrap(GeoMapShape(
            noteId: "louvre", title: "Musée du Louvre", value: polygon([[2.33, 48.86], [2.34, 48.86], [2.34, 48.87]]), color: nil
        ))
        let gpx = #"<gpx><trk><name>Walk</name><trkseg><trkpt lat="48.85" lon="2.35"></trkpt><trkpt lat="48.86" lon="2.36"></trkpt></trkseg></trk></gpx>"#
        let track = try XCTUnwrap(GeoMapTrack.make(noteId: "walk", title: "Museum walk", gpxXML: gpx, iconClass: nil, color: nil))

        let entries = GeoMapSearch.noteEntries(
            query: "musee",
            pins: [lyon, louvre],
            shapes: [louvreShape, orsayArea],
            tracks: [track],
            origin: paris
        )
        XCTAssertEqual(entries.map(\.id), ["note:louvre", "note:orsay", "note:lyon"])
        XCTAssertEqual(entries.first?.target, .note(noteId: "louvre", kind: .pin))

        let withTrack = GeoMapSearch.noteEntries(query: "museum", pins: [], shapes: [], tracks: [track], origin: paris)
        XCTAssertEqual(withTrack.map(\.id), ["note:walk"])
        XCTAssertNil(withTrack.first?.distance, "a track stands on no one point")
    }

    func testOffersAtMostEightNotes() {
        let pins = (0..<12).map { GeoMapPin(noteId: "n\($0)", title: "Cafe \($0)", lat: 48.8 + Double($0) / 100, lng: 2.35) }
        let entries = GeoMapSearch.noteEntries(query: "cafe", pins: pins, shapes: [], tracks: [], origin: paris)
        XCTAssertEqual(entries.count, GeoMapSearch.maxNoteResults)
    }

    func testPlacesSplitIntoNearbyAndFarAwayAndEmptyGroupsAreLeftOut() {
        let near = GeoMapPlace(id: "n:1", name: "Café de Flore", label: "Café de Flore, Paris", lat: 48.854, lng: 2.3325, bounds: nil, isUnnamed: false)
        let far = GeoMapPlace(id: "n:2", name: "Café de Flore", label: "Café de Flore, Montréal", lat: 45.5, lng: -73.57, bounds: nil, isUnnamed: false)
        let places = [far, near].map { GeoMapSearch.placeEntry($0, origin: paris) }
        let groups = GeoMapSearch.groups(notes: [], places: places)
        XCTAssertEqual(groups.map(\.kind), [.nearby, .far])
        XCTAssertEqual(groups.first?.entries.map(\.id), ["place:n:1"])
        XCTAssertEqual(groups.first?.entries.first?.detail, "Café de Flore, Paris")
        XCTAssertTrue(GeoMapSearch.groups(notes: [], places: []).isEmpty)
    }

    func testDistancesAreGreatCircleMeters() throws {
        let london = GeoMapSearch.Coordinate(lat: 51.5074, lng: -0.1278)
        XCTAssertEqual(GeoMapSearch.meters(from: paris, to: london), 343_500, accuracy: 2_000)
        XCTAssertEqual(GeoMapSearch.meters(from: paris, to: paris), 0, accuracy: 0.001)
        let center = try XCTUnwrap(GeoMapSearch.center(of: [2, 48, 3, 49]))
        XCTAssertEqual(center, GeoMapSearch.Coordinate(lat: 48.5, lng: 2.5))
        XCTAssertNil(GeoMapSearch.center(of: [1, 2, 3]))
    }
}
