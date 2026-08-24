import Foundation
import XCTest
@testable import Trinote

final class TriliumClientImportedSessionTests: XCTestCase {
    class MockURLProtocol: URLProtocol {
        nonisolated(unsafe) static var requestHandler: ((URLRequest) throws -> (HTTPURLResponse, Data))?

        override class func canInit(with request: URLRequest) -> Bool { true }
        override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

        override func startLoading() {
            guard let handler = Self.requestHandler else {
                client?.urlProtocolDidFinishLoading(self)
                return
            }
            do {
                let (response, data) = try handler(request)
                client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
                client?.urlProtocol(self, didLoad: data)
                client?.urlProtocolDidFinishLoading(self)
            } catch {
                client?.urlProtocol(self, didFailWithError: error)
            }
        }

        override func stopLoading() {}
    }

    private let appInfoJSON = #"{"appVersion":"0.102.0","dbVersion":228}"#

    private func makeSessionCookieData(includeCsrf: Bool = false) -> Data {
        var cookies: [HTTPCookie] = []
        cookies.append(HTTPCookie(properties: [
            .name: "trilium.sid",
            .value: "imported-session",
            .domain: "trilium.test",
            .path: "/",
        ])!)
        if includeCsrf {
            cookies.append(HTTPCookie(properties: [
                .name: "trilium-csrf",
                .value: "imported-csrf|hash",
                .domain: "trilium.test",
                .path: "/",
            ])!)
        }
        return TriliumCookieArchive.export(cookies: cookies, for: URL(string: "https://trilium.test")!)!
    }

    func testRestoreSessionWithImportedCookies() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                XCTFail("restoreSession must not call /bootstrap without appSession (v0.105 SSO)")
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [MockURLProtocol.self]
        let client = TriliumClient(
            baseURL: URL(string: "https://trilium.test")!,
            persistedCookieData: makeSessionCookieData(includeCsrf: true),
            urlSessionConfiguration: config,
            skipBootstrapWithoutOIDCSession: true
        )
        try await client.restoreSession()
        let sessionValid = await client.isSessionValid
        XCTAssertTrue(sessionValid)
    }

    /// v0.105 SSO: unauthenticated `/bootstrap` must not be required when `/api/app-info` succeeds.
    func testRestoreSessionSkipsBootstrapOnV105SSOWithoutAppSession() async throws {
        var bootstrapCalled = false
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                bootstrapCalled = true
                let json = #"{"loggedIn":false,"login":{"ssoEnabled":true},"triliumVersion":"0.105.0"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [MockURLProtocol.self]
        let client = TriliumClient(
            baseURL: URL(string: "https://trilium.test")!,
            persistedCookieData: makeSessionCookieData(includeCsrf: true),
            urlSessionConfiguration: config,
            skipBootstrapWithoutOIDCSession: true
        )
        try await client.restoreSession()
        XCTAssertFalse(bootstrapCalled)
        let sessionValid = await client.isSessionValid
        XCTAssertTrue(sessionValid)
    }
}
