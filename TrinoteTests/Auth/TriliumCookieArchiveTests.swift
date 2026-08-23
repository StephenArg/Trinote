import XCTest
@testable import Trinote

final class TriliumCookieArchiveTests: XCTestCase {
    private let baseURL = URL(string: "https://trilium.test")!

    func testExportSerializesSessionCookie() throws {
        let cookie = HTTPCookie(properties: [
            .name: "trilium.sid",
            .value: "session123",
            .domain: "trilium.test",
            .path: "/",
        ])!
        let data = try XCTUnwrap(TriliumCookieArchive.export(cookies: [cookie], for: baseURL))
        let raw = try XCTUnwrap(JSONSerialization.jsonObject(with: data) as? [[String: Any]])
        XCTAssertEqual(raw.count, 1)
        XCTAssertEqual(raw[0]["Name"] as? String, "trilium.sid")
        XCTAssertEqual(raw[0]["Value"] as? String, "session123")
    }

    func testExportReturnsNilForEmptyList() {
        XCTAssertNil(TriliumCookieArchive.export(cookies: [], for: baseURL))
    }
}
