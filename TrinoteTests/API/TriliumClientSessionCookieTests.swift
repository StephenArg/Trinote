import Foundation
import XCTest
@testable import Trinote

/// The login cookie a relaunch restores from: only the session the server accepted is handed out for saving, and a
/// signed-out client never asks `/bootstrap` for a CSRF token (that opens an anonymous session whose cookie used to
/// replace the login in the Keychain).
final class TriliumClientSessionCookieTests: XCTestCase {

    final class RecordingURLProtocol: URLProtocol {
        nonisolated(unsafe) static var requestedPaths: [String] = []
        nonisolated(unsafe) static var statusForPath: (String) -> Int = { _ in 200 }

        override class func canInit(with request: URLRequest) -> Bool { true }
        override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

        override func startLoading() {
            let path = request.url?.path ?? ""
            Self.requestedPaths.append(path)
            let body: String
            if path.hasSuffix("/api/app-info") {
                body = #"{"appVersion":"0.106.0","dbVersion":240}"#
            } else if path.hasSuffix("/bootstrap") {
                body = #"{"csrfToken":"boot-csrf"}"#
            } else {
                body = "{}"
            }
            let response = HTTPURLResponse(url: request.url!, statusCode: Self.statusForPath(path), httpVersion: nil, headerFields: nil)!
            client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
            client?.urlProtocol(self, didLoad: Data(body.utf8))
            client?.urlProtocolDidFinishLoading(self)
        }

        override func stopLoading() {}
    }

    private let baseURL = URL(string: "https://session-cookie.test")!

    override func setUp() {
        super.setUp()
        RecordingURLProtocol.requestedPaths = []
        RecordingURLProtocol.statusForPath = { _ in 200 }
    }

    override func tearDown() {
        for cookie in HTTPCookieStorage.shared.cookies(for: baseURL) ?? [] {
            HTTPCookieStorage.shared.deleteCookie(cookie)
        }
        super.tearDown()
    }

    private func cookie(_ name: String, _ value: String) -> HTTPCookie {
        HTTPCookie(properties: [.domain: "session-cookie.test", .path: "/", .name: name, .value: value])!
    }

    private func makeClient(sessionId: String?) -> TriliumClient {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [RecordingURLProtocol.self]
        var cookies = [cookie("trilium-csrf", "csrf-token|hash")]
        if let sessionId { cookies.append(cookie("trilium.sid", sessionId)) }
        return TriliumClient(
            baseURL: baseURL,
            persistedCookieData: TriliumCookieArchive.export(cookies: cookies, for: baseURL),
            urlSessionConfiguration: config
        )
    }

    private func sessionIds(in archive: Data?) throws -> [String] {
        let data = try XCTUnwrap(archive)
        let raw = try XCTUnwrap(try JSONSerialization.jsonObject(with: data) as? [[String: Any]])
        return raw.filter { $0["Name"] as? String == "trilium.sid" }.compactMap { $0["Value"] as? String }
    }

    func testOnlyTheSessionTheServerAcceptedIsHandedOutForSaving() async throws {
        let client = makeClient(sessionId: "signed-in")
        let beforeRestore = await client.exportVerifiedSessionCookieData()
        XCTAssertNil(beforeRestore, "nothing has confirmed the restored cookie yet")

        try await client.restoreSession()
        let afterRestore = await client.exportVerifiedSessionCookieData()
        XCTAssertEqual(try sessionIds(in: afterRestore), ["signed-in"])
    }

    func testAJarWhoseSessionWasReplacedIsNotHandedOut() async throws {
        let client = makeClient(sessionId: "signed-in")
        try await client.restoreSession()

        // What a response to a request sent without the login cookie leaves behind.
        HTTPCookieStorage.shared.setCookie(cookie("trilium.sid", "anonymous"))
        let replaced = await client.exportVerifiedSessionCookieData()
        XCTAssertNil(replaced)

        for c in HTTPCookieStorage.shared.cookies(for: baseURL) ?? [] where c.name == "trilium.sid" {
            HTTPCookieStorage.shared.deleteCookie(c)
        }
        let emptied = await client.exportVerifiedSessionCookieData()
        XCTAssertNil(emptied)
    }

    func testAFailedRestoreHandsOutNothing() async throws {
        RecordingURLProtocol.statusForPath = { $0.hasSuffix("/api/app-info") ? 401 : 200 }
        let client = makeClient(sessionId: "expired")
        do {
            try await client.restoreSession()
            XCTFail("expected unauthorized")
        } catch APIError.unauthorized {}
        let exported = await client.exportVerifiedSessionCookieData()
        XCTAssertNil(exported)
    }

    func testEndingTheProtectedSessionWithoutALoginCookieSendsNothing() async throws {
        let client = makeClient(sessionId: nil)
        try await client.exitProtectedSession()
        XCTAssertEqual(RecordingURLProtocol.requestedPaths, [], "no /bootstrap, no logout/protected")
        let hasSession = await client.hasSessionCookie()
        XCTAssertFalse(hasSession)
    }

    func testTouchingTheProtectedSessionWithoutALoginCookieIsUnauthorized() async throws {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [RecordingURLProtocol.self]
        let client = TriliumClient(baseURL: baseURL, persistedCookieData: nil, urlSessionConfiguration: config)
        do {
            try await client.touchProtectedSession()
            XCTFail("expected unauthorized")
        } catch APIError.unauthorized {}
        XCTAssertEqual(RecordingURLProtocol.requestedPaths, [])
    }
}
