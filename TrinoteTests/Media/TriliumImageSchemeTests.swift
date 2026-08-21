import XCTest
@testable import Trinote

final class TriliumImageSchemeTests: XCTestCase {
    func testURLRoundTrip() {
        let url = TriliumImageScheme.url(routeType: "Attachments", entityId: "att_1-2")
        XCTAssertEqual(url, "trinote-img://attachments/att_1-2")
        let parsed = TriliumImageScheme.reference(fromURLString: url)
        XCTAssertEqual(parsed?.routeType, "attachments")
        XCTAssertEqual(parsed?.entityId, "att_1-2")
    }

    func testRejectsUnexpectedScheme() {
        XCTAssertNil(TriliumImageScheme.reference(fromURLString: "https://attachments/att1"))
        XCTAssertNil(TriliumImageScheme.reference(fromURLString: "data:image/jpeg;base64,xx"))
    }

    func testRejectsUnexpectedRouteOrId() {
        XCTAssertNil(TriliumImageScheme.reference(fromURLString: "trinote-img://notes/att1"))
        XCTAssertNil(TriliumImageScheme.reference(fromURLString: "trinote-img://attachments/"))
        XCTAssertNil(TriliumImageScheme.reference(fromURLString: "trinote-img://attachments/att 1"))
        XCTAssertNil(TriliumImageScheme.reference(fromURLString: "trinote-img://attachments/../att1"))
    }
}
