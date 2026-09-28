import CoreLocation
import XCTest
@testable import Trinote

final class GeoMapLocatorTests: XCTestCase {
    private let now = Date(timeIntervalSince1970: 1_790_000_000)

    private func fix(accuracy: CLLocationAccuracy, age: TimeInterval) -> CLLocation {
        CLLocation(
            coordinate: CLLocationCoordinate2D(latitude: 40.7, longitude: -74),
            altitude: 0,
            horizontalAccuracy: accuracy,
            verticalAccuracy: -1,
            timestamp: now.addingTimeInterval(-age)
        )
    }

    func testCloseFreshFixIsShownAtOnce() {
        XCTAssertEqual(GeoMapLocator.quality(of: fix(accuracy: 20, age: 1), now: now), .good)
        XCTAssertEqual(GeoMapLocator.quality(of: fix(accuracy: GeoMapLocator.goodAccuracy, age: 0), now: now), .good)
    }

    func testWideFreshFixWaitsForABetterOne() {
        XCTAssertEqual(GeoMapLocator.quality(of: fix(accuracy: 400, age: 2), now: now), .coarse)
    }

    func testOldFixIsOnlyALastResort() {
        XCTAssertEqual(GeoMapLocator.quality(of: fix(accuracy: 10, age: 120), now: now), .stale)
    }

    func testNegativeAccuracyIsNoFix() {
        XCTAssertEqual(GeoMapLocator.quality(of: fix(accuracy: -1, age: 0), now: now), .invalid)
    }
}
