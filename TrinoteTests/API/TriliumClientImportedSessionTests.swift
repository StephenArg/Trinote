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

    private func makeSessionCookieData() -> Data {
        let props: [HTTPCookiePropertyKey: Any] = [
            .name: "trilium.sid",
            .value: "imported-session",
            .domain: "trilium.test",
            .path: "/",
        ]
        let cookie = HTTPCookie(properties: props)!
        return TriliumCookieArchive.export(cookies: [cookie], for: URL(string: "https://trilium.test")!)!
    }

    func testRestoreSessionWithImportedCookies() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"boot_csrf","device":"mobile","triliumVersion":"0.102.0"}"#
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
            persistedCookieData: makeSessionCookieData(),
            urlSessionConfiguration: config
        )
        try await client.restoreSession()
        let sessionValid = await client.isSessionValid
        XCTAssertTrue(sessionValid)
    }
}
