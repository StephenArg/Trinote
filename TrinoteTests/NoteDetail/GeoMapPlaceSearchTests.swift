import XCTest
@testable import Trinote

final class GeoMapPlaceSearchTests: XCTestCase {
    private let sample = #"""
    [
      {"place_id":1,"osm_type":"way","osm_id":5013364,"lat":"48.8582599","lon":"2.2945006","name":"Eiffel Tower",
       "display_name":"Eiffel Tower, Avenue Gustave Eiffel, Paris, France","boundingbox":["48.8574753","48.8590453","2.2933119","2.2956897"]},
      {"place_id":2,"osm_type":"node","osm_id":42,"lat":"48.85","lon":"2.29","name":"",
       "display_name":"12, Rue Example, Paris, France"}
    ]
    """#

    func testParsesNamesBoundsAndUnnamedAddresses() throws {
        let places = GeoMapPlaceSearch.places(from: Data(sample.utf8))
        XCTAssertEqual(places.count, 2)
        let tower = places[0]
        XCTAssertEqual(tower.id, "way:5013364")
        XCTAssertEqual(tower.name, "Eiffel Tower")
        XCTAssertEqual(tower.lat, 48.8582599, accuracy: 1e-9)
        XCTAssertEqual(tower.lng, 2.2945006, accuracy: 1e-9)
        XCTAssertEqual(try XCTUnwrap(tower.bounds), [2.2933119, 48.8574753, 2.2956897, 48.8590453])
        XCTAssertFalse(tower.isUnnamed)
        XCTAssertEqual(places[1].name, "12", "an address without a name reads by its first part")
        XCTAssertTrue(places[1].isUnnamed)
        XCTAssertNil(places[1].bounds)
    }

    func testDeduplicatesByIdAndAddressKeepingTheFirst() {
        let a = GeoMapPlace(id: "n:1", name: "Shop", label: "Shop, 1 Main St", lat: 1, lng: 1, bounds: nil, isUnnamed: false)
        let sameAddress = GeoMapPlace(id: "w:9", name: "Shop", label: "Shop, 1 Main St", lat: 1, lng: 1, bounds: nil, isUnnamed: false)
        let b = GeoMapPlace(id: "n:2", name: "Cafe", label: "Cafe, 2 Main St", lat: 2, lng: 2, bounds: nil, isUnnamed: false)
        XCTAssertEqual(GeoMapPlaceSearch.deduplicated([a, sameAddress, b, a]).map(\.id), ["n:1", "n:2"])
    }

    func testViewboxIsTwoCornersLongitudeFirst() {
        XCTAssertEqual(GeoMapPlaceSearch.viewbox([-0.2, 51.4, 0.1, 51.6]), "-0.2,51.6,0.1,51.4")
        XCTAssertNil(GeoMapPlaceSearch.viewbox(nil))
        XCTAssertNil(GeoMapPlaceSearch.viewbox([1, 1, 1, 1]))
    }
}
