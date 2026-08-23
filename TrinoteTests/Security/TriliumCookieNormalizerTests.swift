import XCTest
@testable import Trinote

final class TriliumCookieNormalizerTests: XCTestCase {
    private let baseURL = URL(string: "https://trilium.test")!

    func testNormalizeSetsPathAndDomain() {
        let props: [HTTPCookiePropertyKey: Any] = [
            .name: "trilium.sid",
            .value: "abc",
            .domain: "trilium.test",
            .path: "/login",
        ]
        let cookie = HTTPCookie(properties: props)!
        let normalized = TriliumCookieNormalizer.normalizeForSharedJar([cookie], requestURL: baseURL)
        XCTAssertEqual(normalized.count, 1)
        XCTAssertEqual(normalized[0].domain, "trilium.test")
        XCTAssertEqual(normalized[0].path, "/")
    }

    func testNormalizeSetsSecureForHTTPS() {
        let props: [HTTPCookiePropertyKey: Any] = [
            .name: "_csrf",
            .value: "token",
            .domain: "trilium.test",
            .path: "/",
        ]
        let cookie = HTTPCookie(properties: props)!
        let normalized = TriliumCookieNormalizer.normalizeForSharedJar([cookie], requestURL: baseURL)
        XCTAssertTrue(normalized[0].isSecure)
    }

    func testCookieMatchesHost() {
        let props: [HTTPCookiePropertyKey: Any] = [
            .name: "a",
            .value: "b",
            .domain: ".trilium.test",
            .path: "/",
        ]
        let cookie = HTTPCookie(properties: props)!
        XCTAssertTrue(TriliumCookieNormalizer.cookieMatchesHost(cookie, host: "trilium.test"))
        XCTAssertFalse(TriliumCookieNormalizer.cookieMatchesHost(cookie, host: "other.test"))
    }
}
