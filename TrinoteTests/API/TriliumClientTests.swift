import Foundation
import XCTest
@testable import Trinote

final class TriliumClientTests: XCTestCase {

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

    private func makeClient(persistedCookies: Data? = nil) -> TriliumClient {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [MockURLProtocol.self]
        return TriliumClient(baseURL: URL(string: "https://trilium.test")!, persistedCookieData: persistedCookies, urlSessionConfiguration: config)
    }

    private func respondJSON(_ json: String, statusCode: Int = 200) -> (URLRequest) throws -> (HTTPURLResponse, Data) {
        { request in
            (HTTPURLResponse(url: request.url!, statusCode: statusCode, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
        }
    }

    private let appInfoJSON = #"{"appVersion":"0.95.0","dbVersion":228}"#

    /// Standard response for `/bootstrap` on v0.101 servers (not found).
    private func bootstrapNotFound(_ request: URLRequest) -> (HTTPURLResponse, Data) {
        (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
    }

    // MARK: - Session + CSRF (v0.102+ bootstrap)

    /// v0.102+: `GET /bootstrap` returns JSON with `csrfToken`.
    func testRestoreSessionUsesCsrfFromBootstrapJSON() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"boot_csrf_42","device":"mobile","triliumVersion":"0.102.1"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    // MARK: - Session + CSRF (v0.101 HTML fallback)

    func testGetAppInfoUsesNoBearer() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            XCTAssertNil(request.value(forHTTPHeaderField: "Authorization"))
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
            }
            if path.isEmpty || path == "/" {
                let html = "<html>window.glob = { csrfToken: 'csrf_ok' };</html>"
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(html.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    func testCsrfExtractsDoubleQuotedTokenInGlob() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
            }
            if path.isEmpty || path == "/" {
                let html = #"<html>window.glob = { csrfToken: "csrf_double" };</html>"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(html.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            XCTFail("Unexpected path: \(String(describing: request.url))")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    /// When HTML has no token but the `_csrf` cookie is in the jar (Vite SPA), the client
    /// extracts the plain token from the `token|hash` cookie value (csrf-csrf v3 format).
    func testRestoreSessionUsesCsrfCookieWhenShellHasNoToken() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
            }
            if path.isEmpty || path == "/" {
                let html = "<html><body>no token in page</body></html>"
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(html.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        let cookie = HTTPCookie(properties: [
            .domain: "trilium.test", .path: "/", .name: "_csrf",
            .value: "plaintoken123|hashvalue456", .version: 0
        ])!
        HTTPCookieStorage.shared.setCookie(cookie)
        defer { HTTPCookieStorage.shared.deleteCookie(cookie) }

        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    /// Vite SPA: no HTML token, but `Set-Cookie: _csrf=token|hash` in the response
    /// headers.  The client must extract the token from the raw header (bypassing the
    /// broken HTTPCookie.cookies() parsing that drops _csrf).
    func testRestoreSessionExtractsCsrfFromSetCookieHeader() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
            }
            if path.isEmpty || path == "/" {
                let html = "<html><head><title>Trilium Notes</title></head><body><script type=\"module\" crossorigin src=\"/assets/index.js\"></script></body></html>"
                let headers = [
                    "Set-Cookie": "trilium.sid=s%3Aabc.xyz; Path=/; Expires=Thu, 01 Jan 2099 00:00:00 GMT; HttpOnly; SameSite=Strict, _csrf=headerTok42|headerHash99; Path=/; HttpOnly; SameSite=Strict"
                ]
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: headers)!, Data(html.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    /// When neither /bootstrap, HTML, nor cookies contain a token, restore
    /// should still succeed (server may not require CSRF).
    func testRestoreSessionSucceedsWithoutCsrf() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
            }
            if path.isEmpty || path == "/" {
                let html = "<html><body>no token in page</body></html>"
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(html.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    /// Pretty-printed `window.glob` spans lines; extraction must not require a single-line block.
    func testRestoreSessionExtractsMultilineWindowGlob() async throws {
        let multilineGlob = """
        <html><script>
        window.glob = {
            device: "mobile",
            csrfToken: 'multiline_csrf',
        };
        </script></html>
        """
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
            }
            if path.isEmpty || path == "/" {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(multilineGlob.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    func testNoSessionThrowsNoToken() async {
        MockURLProtocol.requestHandler = respondJSON(#"{"message":"no session"}"#, statusCode: 401)
        let client = makeClient()
        do {
            _ = try await client.getNote("n1")
            XCTFail("Expected error")
        } catch let error as APIError {
            XCTAssertTrue(error.isAuthError)
        } catch {
            XCTFail("Wrong error \(error)")
        }
    }

    // MARK: - Note decode

    func testGetNoteMergesTreeLoad() async throws {
        var call = 0
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            call += 1
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"csrf_test","device":"desktop"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/api/notes/abc") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!,
                        Data(#"{"noteId":"abc","title":"Hi","isProtected":false,"type":"text","mime":"text/html","blobId":"b1","utcDateModified":"2024-01-15T13:00:00.000Z"}"#.utf8))
            }
            if path.hasSuffix("/api/tree/load") {
                XCTAssertEqual(request.value(forHTTPHeaderField: "x-csrf-token"), "csrf_test")
                let tree = #"{"notes":[{"noteId":"abc","title":"Hi","isProtected":false,"type":"text","mime":"text/html","blobId":"b1"}],"branches":[{"branchId":"br1","noteId":"abc","parentNoteId":"root","prefix":null,"notePosition":0,"isExpanded":true}],"attributes":[]}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(tree.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        try await client.restoreSession()
        let note = try await client.getNote("abc")
        XCTAssertEqual(note.noteId, "abc")
        XCTAssertEqual(note.title, "Hi")
        XCTAssertEqual(note.parentNoteIds, ["root"])
        XCTAssertTrue(note.childBranchIds.isEmpty)
        XCTAssertGreaterThanOrEqual(call, 2)
    }

    // MARK: - Search

    func testSearchUsesNativePath() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"x","device":"desktop"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.contains("/api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            if path.contains("/api/search/") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data("[]".utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        try await client.restoreSession()
        let res = try await client.searchNotes(query: "hello", fastSearch: false, includeArchived: false, ancestorNoteId: nil, orderBy: nil, orderDirection: nil, limit: 10)
        XCTAssertEqual(res.results.count, 0)
    }

    // MARK: - Sync check JSON shape

    func testSyncCheckResponseDecodesNestedEntityHashes() throws {
        let json = #"""
        {"entityHashes":{"notes":{"a":"hash1","b":"hash2"},"branches":{"c":"h3"}},"maxEntityChangeId":9042}
        """#.data(using: .utf8)!
        let r = try JSONDecoder().decode(SyncCheckResponse.self, from: json)
        XCTAssertEqual(r.maxEntityChangeId, 9042)
        XCTAssertEqual(r.entityHashes?["notes"]?["a"], "hash1")
    }

    func testSyncCheckResponseDecodesStringMaxEntityChangeId() throws {
        let json = #"{"entityHashes":{},"maxEntityChangeId":"9042"}"#.data(using: .utf8)!
        let r = try JSONDecoder().decode(SyncCheckResponse.self, from: json)
        XCTAssertEqual(r.maxEntityChangeId, 9042)
    }

    func testSyncPullResponseParsesStringNumericFields() throws {
        let json = #"""
        {"entityChanges":[],"lastEntityChangeId":"12000","outstandingPullCount":"5"}
        """#.data(using: .utf8)!
        let p = try SyncPullResponse.parseFromChanged(jsonData: json)
        XCTAssertEqual(p.maxEntityChangeId, 12_000)
        XCTAssertEqual(p.outstandingPullCount, 5)
    }

    func testSyncPullResponseParsesErasedEntity() throws {
        let json = #"""
        {"entityChanges":[{"entityChange":{"entityName":"notes","entityId":"abc","isErased":1},"entity":null}],"lastEntityChangeId":1,"outstandingPullCount":0}
        """#.data(using: .utf8)!
        let p = try SyncPullResponse.parseFromChanged(jsonData: json)
        XCTAssertEqual(p.entityChanges.count, 1)
        XCTAssertEqual(p.entityChanges[0].entityName, "notes")
        XCTAssertEqual(p.entityChanges[0].entityId, "abc")
        XCTAssertTrue(p.entityChanges[0].isErased)
        XCTAssertEqual(p.notes.count, 0)
    }

    func testSyncPullResponseParsesNoteEntities() throws {
        let json = #"""
        {
            "entityChanges":[
                {"entityChange":{"entityName":"notes","entityId":"n1","isErased":false},"entity":{"noteId":"n1","title":"Test","type":"text","mime":"text/html","isProtected":false}}
            ],
            "lastEntityChangeId":5,
            "outstandingPullCount":0
        }
        """#.data(using: .utf8)!
        let p = try SyncPullResponse.parseFromChanged(jsonData: json)
        XCTAssertEqual(p.notes.count, 1)
        XCTAssertEqual(p.notes[0]["noteId"] as? String, "n1")
        XCTAssertEqual(p.notes[0]["title"] as? String, "Test")
    }

    // MARK: - APIError

    func testAPIErrorIsRetryable() {
        XCTAssertTrue(APIError.timeout.isRetryable)
        XCTAssertTrue(APIError.networkUnavailable.isRetryable)
        XCTAssertTrue(APIError.serverError(statusCode: 503, message: nil).isRetryable)
        XCTAssertFalse(APIError.unauthorized.isRetryable)
        XCTAssertFalse(APIError.serverError(statusCode: 400, message: nil).isRetryable)
    }

    func testAPIErrorFromCancellation() {
        let error = CancellationError()
        let apiError = APIError.from(error)
        if case .cancelled = apiError {} else {
            XCTFail("Expected cancelled, got \(apiError)")
        }
    }
}
