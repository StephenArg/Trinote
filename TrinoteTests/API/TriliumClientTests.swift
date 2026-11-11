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

    private func makeClient(
        persistedCookies: Data? = nil,
        cloudflareAccessCredentials: CloudflareAccessCredentials? = nil,
        skipBootstrapWithoutOIDCSession: Bool = false
    ) -> TriliumClient {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [MockURLProtocol.self]
        return TriliumClient(
            baseURL: URL(string: "https://trilium.test")!,
            persistedCookieData: persistedCookies,
            cloudflareAccessCredentials: cloudflareAccessCredentials,
            urlSessionConfiguration: config,
            skipBootstrapWithoutOIDCSession: skipBootstrapWithoutOIDCSession
        )
    }

    private func respondJSON(_ json: String, statusCode: Int = 200) -> (URLRequest) throws -> (HTTPURLResponse, Data) {
        { request in
            (HTTPURLResponse(url: request.url!, statusCode: statusCode, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
        }
    }

    private let appInfoJSON = #"{"appVersion":"0.95.0","dbVersion":228}"#

    /// OIDC `appSession` cookie so `restoreSession()` may call `/bootstrap` for CSRF when needed.
    private func oidcSessionCookieData() -> Data {
        let cookie = HTTPCookie(properties: [
            .domain: "trilium.test", .path: "/", .name: "appSession",
            .value: "oidc-session", .version: 0
        ])!
        return TriliumCookieArchive.export(cookies: [cookie], for: URL(string: "https://trilium.test")!)!
    }

    /// Standard response for `/bootstrap` on v0.101 servers (not found).
    private func bootstrapNotFound(_ request: URLRequest) -> (HTTPURLResponse, Data) {
        (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
    }

    // MARK: - Session + CSRF (v0.102+ bootstrap)

    /// v0.102+: `GET /bootstrap` returns JSON with `csrfToken` when the OIDC appSession cookie is present.
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

        let client = makeClient(persistedCookies: oidcSessionCookieData())
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

    /// v0.105+: `Set-Cookie: trilium-csrf=token|hash` must be parsed (csrf-csrf v4 cookie name).
    func testRestoreSessionExtractsTriliumCsrfFromSetCookieHeader() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
            }
            if path.isEmpty || path == "/" {
                let html = "<html><head><title>Trilium Notes</title></head><body><script type=\"module\" crossorigin src=\"/assets/index.js\"></script></body></html>"
                let headers = [
                    "Set-Cookie": "trilium.sid=s%3Aabc.xyz; Path=/; Expires=Thu, 01 Jan 2099 00:00:00 GMT; HttpOnly; SameSite=Strict, trilium-csrf=triliumTok42|triliumHash99; Path=/; HttpOnly; SameSite=Strict"
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

    func testGetOptionsReadsTheProtectedSessionTimeout() async throws {
        nonisolated(unsafe) var optionsPath: String?
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url!.path
            if path.contains("bootstrap") {
                let json = #"{"csrfToken":"boot_csrf_42","device":"mobile","triliumVersion":"0.106.0"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            if path.hasSuffix("/api/options") {
                optionsPath = path
                XCTAssertEqual(request.httpMethod, "GET")
                let json = #"{"protectedSessionTimeout":"900","protectedSessionTimeoutTimeScale":"60","isPasswordSet":"true","theme":"next"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let options = try await client.getOptions()
        XCTAssertEqual(optionsPath, "/api/options")
        XCTAssertEqual(options.protectedSessionTimeoutSeconds, 900)
        XCTAssertEqual(options["isPasswordSet"], "true")
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

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let note = try await client.getNote("abc")
        XCTAssertEqual(note.noteId, "abc")
        XCTAssertEqual(note.title, "Hi")
        XCTAssertEqual(note.parentNoteIds, ["root"])
        XCTAssertTrue(note.childBranchIds.isEmpty)
        XCTAssertGreaterThanOrEqual(call, 2)
    }

    /// `tree/load` returns the parents' and templates' attribute rows; `getNote` keeps only the note's own as
    /// `attributes` and works out what it inherits from the rest.
    func testGetNoteWorksOutInheritedAttributesFromTreeLoad() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"csrf_test","device":"desktop"}"#) }
            if path.contains("api/app-info") { return ok(appInfoJSON) }
            if path.hasSuffix("/api/notes/abc") {
                return ok(#"{"noteId":"abc","title":"Card","isProtected":false,"type":"text","mime":"text/html","blobId":"b1"}"#)
            }
            if path.hasSuffix("/api/tree/load") {
                return ok("""
                {"notes":[
                  {"noteId":"abc","title":"Card","isProtected":false,"type":"text","mime":"text/html","blobId":"b1"},
                  {"noteId":"p1","title":"Board","isProtected":false,"type":"book","mime":"","blobId":"b2"},
                  {"noteId":"tpl","title":"Template","isProtected":false,"type":"text","mime":"text/html","blobId":"b3"}],
                 "branches":[
                  {"branchId":"p1_abc","noteId":"abc","parentNoteId":"p1","prefix":null,"notePosition":0,"isExpanded":false},
                  {"branchId":"root_p1","noteId":"p1","parentNoteId":"root","prefix":null,"notePosition":0,"isExpanded":true}],
                 "attributes":[
                  {"attributeId":"a1","noteId":"abc","type":"relation","name":"template","value":"tpl","position":10,"isInheritable":false},
                  {"attributeId":"a2","noteId":"p1","type":"label","name":"label:status","value":"promoted,single,text","position":10,"isInheritable":true},
                  {"attributeId":"a3","noteId":"p1","type":"label","name":"private","value":"","position":20,"isInheritable":false},
                  {"attributeId":"a4","noteId":"tpl","type":"label","name":"template","value":"","position":10,"isInheritable":false},
                  {"attributeId":"a5","noteId":"tpl","type":"label","name":"status","value":"todo","position":20,"isInheritable":false}]}
                """)
            }
            XCTFail("Unexpected path: \(path)")
            return ok("{}")
        }

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let note = try await client.getNote("abc")
        XCTAssertEqual(note.attributes.map(\.attributeId), ["a1"])
        XCTAssertEqual(note.inheritedAttributes.map(\.attributeId), ["a2", "a5"])

        let item = NoteItem(from: note)
        XCTAssertEqual(item.inheritedAttributes.map(\.name), ["label:status", "status"])
        XCTAssertEqual(item.serverTypeName, "text")
    }

    func testDeleteNoteSendsEraseNotesQueryFlag() async throws {
        var capturedErase: String?
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"csrf_test","device":"desktop"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            if path.hasSuffix("/api/notes/n1") {
                XCTAssertEqual(request.httpMethod, "DELETE")
                XCTAssertEqual(request.value(forHTTPHeaderField: "x-csrf-token"), "csrf_test")
                capturedErase = URLComponents(url: request.url!, resolvingAgainstBaseURL: false)?
                    .queryItems?
                    .first { $0.name == "eraseNotes" }?
                    .value
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data())
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        try await client.deleteNote("n1", eraseNotes: false)
        XCTAssertEqual(capturedErase, "false")
        try await client.deleteNote("n1", eraseNotes: true)
        XCTAssertEqual(capturedErase, "true")
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

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let res = try await client.searchNotes(query: "hello", fastSearch: false, includeArchived: false, ancestorNoteId: nil, orderBy: nil, orderDirection: nil, limit: 10)
        XCTAssertEqual(res.results.count, 0)
    }

    /// A `/` in the query must stay inside the `:searchString` segment, encoded once (`%2F`, not `%252F`).
    func testSearchEncodesSlashOnceInsideQuerySegment() async throws {
        var searchURL: String?
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
                searchURL = request.url?.absoluteString
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data("[]".utf8))
            }
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        _ = try await client.searchNotes(query: "a/b #tag=x? 100%", fastSearch: false, includeArchived: false, ancestorNoteId: nil, orderBy: nil, orderDirection: nil, limit: 10)
        XCTAssertEqual(searchURL, "https://trilium.test/api/search/a%2Fb%20%23tag=x%3F%20100%25")
    }

    func testMakeURLPercentEncodesPlainPaths() throws {
        let url = try TriliumClient.makeURL(baseURL: URL(string: "https://trilium.test/sub")!, path: "/api/notes/a b", queryParams: nil)
        XCTAssertEqual(url.absoluteString, "https://trilium.test/sub/api/notes/a%20b")
    }

    /// Query values are encoded as `encodeURIComponent` encodes them; a bare `+` would reach Express as a space.
    func testMakeURLEncodesQueryValuesLikeEncodeURIComponent() throws {
        let url = try TriliumClient.makeURL(
            baseURL: URL(string: "https://trilium.test")!,
            path: "/api/search",
            queryParams: ["searchString": "C++ #tag=a&b /x?é", "ancestorNoteId": "anc1"]
        )
        XCTAssertEqual(
            url.absoluteString,
            "https://trilium.test/api/search?ancestorNoteId=anc1&searchString=C%2B%2B%20%23tag%3Da%26b%20%2Fx%3F%C3%A9"
        )
    }

    // MARK: - Routes Trilium v0.107 replaced

    private let v0107AppInfoJSON = #"{"appVersion":"0.107.0","dbVersion":242,"syncVersion":41}"#

    /// A client with a restored session on a server reporting `appInfo`; `handler` answers every other request with a
    /// status and a body.
    private func clientForRouteTests(
        appInfo: String,
        handler: @escaping (URLRequest) -> (Int, String)
    ) async throws -> TriliumClient {
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            let (status, body): (Int, String)
            if path.hasSuffix("/bootstrap") {
                (status, body) = (200, #"{"csrfToken":"x","device":"desktop"}"#)
            } else if path.contains("/api/app-info") {
                (status, body) = (200, appInfo)
            } else {
                (status, body) = handler(request)
            }
            return (HTTPURLResponse(url: request.url!, statusCode: status, httpVersion: nil, headerFields: nil)!, Data(body.utf8))
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        return client
    }

    func testSearchUsesQueryParameterOnV0107() async throws {
        var urls: [URL] = []
        let client = try await clientForRouteTests(appInfo: v0107AppInfoJSON) { request in
            urls.append(request.url!)
            return (200, #"["n1"]"#)
        }
        let ids = try await client.searchNoteIds(query: "C++ #tag", ancestorNoteId: "anc1")
        XCTAssertEqual(ids, ["n1"])
        XCTAssertEqual(urls.map(\.path), ["/api/search"])
        let query = URLComponents(url: try XCTUnwrap(urls.first), resolvingAgainstBaseURL: false)?.percentEncodedQuery
        XCTAssertEqual(query, "ancestorNoteId=anc1&searchString=C%2B%2B%20%23tag")
    }

    /// Builds of Trilium's main branch report 0.106.0 but already answer the v0.107 routes (sync version 41).
    func testQuickSearchUsesQueryParameterWhenSyncVersionIs41() async throws {
        var urls: [URL] = []
        let appInfo = #"{"appVersion":"0.106.0","dbVersion":242,"syncVersion":41}"#
        let client = try await clientForRouteTests(appInfo: appInfo) { request in
            urls.append(request.url!)
            return (200, #"{"searchResultNoteIds":["n1"],"searchResults":[{"noteId":"n1","notePath":"root/n1","noteTitle":"N","notePathTitle":"N","icon":"bx bx-note"}],"highlightedTokens":[],"error":null}"#)
        }
        let results = try await client.quickSearchResults(query: "a b")
        XCTAssertEqual(results.count, 1)
        XCTAssertEqual(urls.map(\.path), ["/api/quick-search"])
        XCTAssertEqual(URLComponents(url: try XCTUnwrap(urls.first), resolvingAgainstBaseURL: false)?.percentEncodedQuery, "searchString=a%20b")
    }

    /// An older version whose server answers 404 to the path form (a server upgraded since sign-in) gets the query
    /// form, and keeps getting it without another 404.
    func testSearchSwitchesToQueryParameterAfter404() async throws {
        var paths: [String] = []
        let client = try await clientForRouteTests(appInfo: appInfoJSON) { request in
            let path = request.url!.path
            paths.append(path)
            return path == "/api/search" ? (200, #"["n1"]"#) : (404, "")
        }
        let first = try await client.searchNoteIds(query: "x", ancestorNoteId: nil)
        let second = try await client.searchNoteIds(query: "y", ancestorNoteId: nil)
        XCTAssertEqual(first, ["n1"])
        XCTAssertEqual(second, ["n1"])
        XCTAssertEqual(paths, ["/api/search/x", "/api/search", "/api/search"])
    }

    /// The other way round: a v0.107 version, a server that only answers the path form.
    func testSearchSwitchesToPathFormAfter404() async throws {
        var paths: [String] = []
        let client = try await clientForRouteTests(appInfo: v0107AppInfoJSON) { request in
            let path = request.url!.path
            paths.append(path)
            return path == "/api/search" ? (404, "") : (200, #"["n1"]"#)
        }
        let ids = try await client.searchNoteIds(query: "x", ancestorNoteId: nil)
        XCTAssertEqual(ids, ["n1"])
        XCTAssertEqual(paths, ["/api/search", "/api/search/x"])
    }

    /// Trilium 0.107+ marks its read-only help pages `isContentWritable: false` in `tree/load`.
    func testGetNoteReadsWhetherTheServerSavesTheNote() async throws {
        let client = try await clientForRouteTests(appInfo: v0107AppInfoJSON) { request in
            switch request.url!.path {
            case "/api/notes/_help_x", "/api/notes/n1":
                let id = request.url!.lastPathComponent
                return (200, #"{"noteId":"\#(id)","title":"T","isProtected":false,"type":"text","mime":"text/html","blobId":"b"}"#)
            case "/api/tree/load":
                return (200, #"{"notes":[{"noteId":"_help_x","title":"T","isProtected":false,"type":"text","mime":"text/html","blobId":"b","isContentWritable":false},{"noteId":"n1","title":"T","isProtected":false,"type":"text","mime":"text/html","blobId":"b"}],"branches":[],"attributes":[]}"#)
            default:
                return (404, "")
            }
        }
        let help = try await client.getNote("_help_x")
        let own = try await client.getNote("n1")
        XCTAssertEqual(help.isContentWritable, false)
        XCTAssertEqual(own.isContentWritable, true)
        XCTAssertFalse(NoteItem(from: help).isContentEditable)
        XCTAssertTrue(NoteItem(from: own).isContentEditable)
    }

    func testAnswerToolApprovalPostsTheAnswer() async throws {
        var requests: [(path: String, method: String?, body: Data)] = []
        let client = try await clientForRouteTests(appInfo: v0107AppInfoJSON) { [self] request in
            requests.append((request.url!.path, request.httpMethod, requestBody(request)))
            return (200, requests.count == 1 ? #"{"answered":true}"# : #"{"answered":false}"#)
        }
        let allowed = try await client.answerToolApproval(streamId: "s1", toolCallId: "t1", approved: true, allowForChat: true)
        let denied = try await client.answerToolApproval(streamId: "s1", toolCallId: "t2", approved: false, allowForChat: true)
        XCTAssertTrue(allowed)
        XCTAssertFalse(denied, "the turn had ended")
        XCTAssertEqual(requests.map(\.path), ["/api/llm-chat/tool-approval", "/api/llm-chat/tool-approval"])
        XCTAssertEqual(requests.map(\.method), ["POST", "POST"])
        let bodies = try requests.map { try XCTUnwrap(JSONSerialization.jsonObject(with: $0.body) as? NSDictionary) }
        XCTAssertEqual(bodies[0], ["streamId": "s1", "toolCallId": "t1", "approved": true, "scope": "chat"])
        XCTAssertEqual(bodies[1], ["streamId": "s1", "toolCallId": "t2", "approved": false], "a denial has no scope")
    }

    func testDuplicateUsesTriliumsOwnRouteAndSaysWhetherChildrenCome() async throws {
        var requests: [(method: String?, path: String, body: Data)] = []
        let client = try await clientForRouteTests(appInfo: v0107AppInfoJSON) { [self] request in
            let path = request.url!.path
            if path == "/api/notes/n1/duplicate/p1" {
                requests.append((request.httpMethod, path, requestBody(request)))
                return (200, #"{"note":{"noteId":"copy","title":"T (dup)"},"branch":{"branchId":"p1_copy","noteId":"copy","parentNoteId":"p1","prefix":null,"notePosition":25,"isExpanded":false}}"#)
            }
            if path == "/api/tree/load" {
                return (200, #"{"notes":[{"noteId":"copy","title":"T (dup)","isProtected":false,"type":"text","mime":"text/html","blobId":"b1"}],"branches":[],"attributes":[]}"#)
            }
            return (200, #"{"noteId":"copy","title":"T (dup)","isProtected":false,"type":"text","mime":"text/html","blobId":"b1","utcDateModified":"2024-01-15T13:00:00.000Z"}"#)
        }
        let response = try await client.duplicateNoteAsChild(sourceNoteId: "n1", parentNoteId: "p1", withChildren: false)
        XCTAssertEqual(response.note.noteId, "copy")
        XCTAssertEqual(response.branch.branchId, "p1_copy")
        XCTAssertEqual(response.branch.notePosition, 25)
        XCTAssertEqual(requests.map(\.method), ["POST"])
        let body = try JSONSerialization.jsonObject(with: try XCTUnwrap(requests.first?.body)) as? [String: Bool]
        XCTAssertEqual(body, ["withChildren": false])
    }

    func testMoveBranchSendsBranchListOnV0107() async throws {
        var requests: [(method: String?, path: String, body: Data)] = []
        let client = try await clientForRouteTests(appInfo: v0107AppInfoJSON) { [self] request in
            requests.append((request.httpMethod, request.url!.path, requestBody(request)))
            return (200, #"{"success":true}"#)
        }
        try await client.moveBranchToParent(branchId: "p1_n1", parentBranchId: "root_p2")
        XCTAssertEqual(requests.map(\.method), ["PUT"])
        XCTAssertEqual(requests.map(\.path), ["/api/branches/move-to/root_p2"])
        let body = try JSONSerialization.jsonObject(with: try XCTUnwrap(requests.first?.body)) as? [String: [String]]
        XCTAssertEqual(body, ["branchIds": ["p1_n1"]])
    }

    func testMoveBranchUsesOneBranchRouteBeforeV0107() async throws {
        var paths: [String] = []
        let client = try await clientForRouteTests(appInfo: appInfoJSON) { request in
            paths.append(request.url!.path)
            return (200, #"{"success":true}"#)
        }
        try await client.moveBranchToParent(branchId: "p1_n1", parentBranchId: "root_p2")
        XCTAssertEqual(paths, ["/api/branches/p1_n1/move-to/root_p2"])
    }

    /// A v0.107 version on a server without the batch route: the one-branch route after its 404.
    func testMoveBranchSwitchesToOneBranchRouteAfter404() async throws {
        var paths: [String] = []
        let client = try await clientForRouteTests(appInfo: v0107AppInfoJSON) { request in
            let path = request.url!.path
            paths.append(path)
            return path == "/api/branches/move-to/root_p2" ? (404, "") : (200, #"{"success":true}"#)
        }
        try await client.moveBranchToParent(branchId: "p1_n1", parentBranchId: "root_p2")
        XCTAssertEqual(paths, ["/api/branches/move-to/root_p2", "/api/branches/p1_n1/move-to/root_p2"])
    }

    /// A refused move (a cycle, say) still surfaces Trilium's message on the batch route.
    func testMoveBranchSurfacesRefusalOnV0107() async throws {
        let client = try await clientForRouteTests(appInfo: v0107AppInfoJSON) { _ in
            (200, #"{"success":false,"message":"Moving note here would create cycle."}"#)
        }
        do {
            try await client.moveBranchToParent(branchId: "p1_n1", parentBranchId: "root_p2")
            XCTFail("Expected the refusal to throw")
        } catch let APIError.serverError(_, message) {
            XCTAssertEqual(message, "Moving note here would create cycle.")
        }
    }

    func testQuickSearchDecodesV0105AndV0106Shapes() throws {
        let v105 = #"{"searchResultNoteIds":["n1"],"searchResults":[{"notePath":"root/p1/n1","noteTitle":"Note","notePathTitle":"Parent / Note","contentSnippet":"a match here","highlightedContentSnippet":"a <b>match</b> here","icon":"bx bx-note"}],"error":null}"#
        let r105 = try JSONDecoder().decode(QuickSearchResponse.self, from: Data(v105.utf8))
        XCTAssertEqual(r105.searchResults?.first?.resolvedNoteId, "n1")

        let v106 = #"{"searchResultNoteIds":["n2"],"searchResults":[{"noteId":"n2","notePath":"root/n2","noteTitle":"N","notePathTitle":"N","icon":"bx bx-note"}],"highlightedTokens":["x"],"error":null}"#
        let r106 = try JSONDecoder().decode(QuickSearchResponse.self, from: Data(v106.utf8))
        XCTAssertEqual(r106.searchResults?.first?.resolvedNoteId, "n2")
    }

    func testSnippetFormatterUnescapesAndHighlightsMatches() throws {
        let formatted = try XCTUnwrap(SearchSnippetFormatter.attributed(
            highlightedHTML: "Tom &amp; <b>Jerry</b> &lt;3<br>next <b class=\"search-result-fuzzy\">line</b>",
            plain: nil
        ))
        XCTAssertEqual(String(formatted.characters), "Tom & Jerry <3 next line")
        let highlighted = formatted.runs.filter { $0.inlinePresentationIntent == .stronglyEmphasized }
            .map { String(formatted[$0.range].characters) }
        XCTAssertEqual(highlighted, ["Jerry", "line"])
        XCTAssertNil(SearchSnippetFormatter.attributed(highlightedHTML: "  ", plain: nil))
        XCTAssertEqual(
            SearchSnippetFormatter.attributed(highlightedHTML: nil, plain: "two\nlines").map { String($0.characters) },
            "two lines"
        )
    }

    // MARK: - Sibling reorder

    /// Every drag among five siblings, saved with one request, leaves the server in the dragged order. The fake server
    /// applies `move-before` / `move-after` as Trilium's `branches.ts` does: shift the siblings at (or after) the
    /// anchor's position by 10, then take the anchor's old position (or the one after it).
    func testOneRequestPerDragLeavesTheServerInTheDraggedOrder() async throws {
        final class Server: @unchecked Sendable {
            var positions: [String: Int] = [:]
            var requests = 0
            var order: [String] { positions.keys.sorted { positions[$0]! < positions[$1]! } }

            func apply(_ path: String) {
                let parts = path.split(separator: "/").map(String.init)   // api, branches, id, move-before, anchor
                guard parts.count == 5, let anchorPosition = positions[parts[4]] else { return }
                requests += 1
                let moved = parts[2]
                if parts[3] == "move-before" {
                    for key in positions.keys where positions[key]! >= anchorPosition { positions[key]! += 10 }
                    positions[moved] = anchorPosition
                } else {
                    for key in positions.keys where positions[key]! > anchorPosition { positions[key]! += 10 }
                    positions[moved] = anchorPosition + 10
                }
            }
        }

        let initial = ["A", "B", "C", "D", "E"]
        let server = Server()
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(appInfoJSON) }
            XCTAssertEqual(request.httpMethod, "PUT")
            server.apply(path)
            return ok(#"{"success":true}"#)
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        for from in initial.indices {
            for to in initial.indices where to != from {
                server.positions = Dictionary(uniqueKeysWithValues: initial.enumerated().map { ($1, ($0 + 1) * 10) })
                server.requests = 0
                var dragged = initial
                let moved = dragged.remove(at: from)
                dragged.insert(moved, at: to)

                try await client.placeBranchInSiblingOrder(moved, orderedSiblingBranchIds: dragged)
                XCTAssertEqual(server.order, dragged, "dragging \(moved) from \(from) to \(to)")
                XCTAssertEqual(server.requests, 1)
            }
        }
    }

    // MARK: - Excerpts

    func testNoteBlocksAreReadAndWrittenByTheirReference() async throws {
        var requests: [(method: String?, url: String, body: Data?)] = []
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url!.path
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(appInfoJSON) }
            requests.append((request.httpMethod, request.url!.absoluteString, self.requestBody(request)))
            return ok(#"{"content":"<p>Body</p>"}"#)
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let content = try await client.getNoteBlocks(noteId: "n1", block: "a:b")
        XCTAssertEqual(content, "<p>Body</p>")
        try await client.updateNoteBlocks(noteId: "n1", block: "a:b", content: "<p>New</p>")

        XCTAssertEqual(requests.map(\.method), ["GET", "PUT"])
        XCTAssertTrue(requests.allSatisfy { $0.url.hasSuffix("/api/notes/n1/blocks?block=a%3Ab") }, "\(requests.map(\.url))")
        let sent = try XCTUnwrap(JSONSerialization.jsonObject(with: XCTUnwrap(requests.last?.body)) as? [String: Any])
        XCTAssertEqual(sent["content"] as? String, "<p>New</p>")
    }

    // MARK: - Clone

    func testCloneNoteReportsTriliumsAnswer() async throws {
        var answer = #"{"success":true,"branchId":"br9","notePath":"root/board/n1"}"#
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(appInfoJSON) }
            if path.hasSuffix("/api/notes/n1/clone-to-note/board") {
                XCTAssertEqual(request.httpMethod, "PUT")
                return ok(answer)
            }
            XCTFail("Unexpected path: \(path)")
            return ok("{}")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let made = try await client.cloneNote("n1", toParentNoteId: "board")
        XCTAssertEqual(made, CloneNoteResult(success: true, branchId: "br9", message: nil))

        answer = #"{"success":false,"message":"Moving/cloning note here would create cycle."}"#
        let refused = try await client.cloneNote("n1", toParentNoteId: "board")
        XCTAssertFalse(refused.success)
        XCTAssertEqual(refused.message, "Moving/cloning note here would create cycle.")

        answer = ""
        let bare = try await client.cloneNote("n1", toParentNoteId: "board")
        XCTAssertTrue(bare.success, "an answer without a body is taken as done")
    }

    // MARK: - Spreadsheet export (v0.106 GET /api/spreadsheet/:id/xlsx)

    func testSpreadsheetExportReturnsTheWorkbookAndRejectsAnythingElse() async throws {
        final class Body: @unchecked Sendable { var data = Data([0x50, 0x4B, 0x03, 0x04, 0x14]) }
        let body = Body()
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            func ok(_ data: Data, type: String = "application/json") -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: ["Content-Type": type])!, data)
            }
            if path.hasSuffix("/bootstrap") { return ok(Data(#"{"csrfToken":"x","device":"desktop"}"#.utf8)) }
            if path.contains("/api/app-info") { return ok(Data(#"{"appVersion":"0.106.0","dbVersion":240}"#.utf8)) }
            if path == "/api/spreadsheet/sheet1/xlsx" {
                XCTAssertEqual(request.httpMethod, "GET")
                return ok(body.data, type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            }
            XCTFail("Unexpected path: \(path)")
            return ok(Data())
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let workbook = try await client.exportSpreadsheetXlsx(noteId: "sheet1")
        XCTAssertEqual(workbook, body.data)

        body.data = Data("<!doctype html><html></html>".utf8)
        do {
            _ = try await client.exportSpreadsheetXlsx(noteId: "sheet1")
            XCTFail("a page that isn't a zip archive is not a workbook")
        } catch {}
    }

    func testSpreadsheetExportNeedsTrilium0106() {
        func info(_ version: String) -> AppInfoResponse? {
            try? JSONDecoder().decode(AppInfoResponse.self, from: Data(#"{"appVersion":"\#(version)","dbVersion":240}"#.utf8))
        }
        XCTAssertFalse(TriliumServerCompatibility.supportsSpreadsheetXlsxExport(info("0.105.0")))
        XCTAssertTrue(TriliumServerCompatibility.supportsSpreadsheetXlsxExport(info("0.106.0")))
    }

    func testExportedWorkbookIsNamedAfterTheNote() {
        XCTAssertEqual(NoteDetailViewModel.xlsxExportFileName(forTitle: "Budget 2026"), "Budget 2026.xlsx")
        XCTAssertEqual(NoteDetailViewModel.xlsxExportFileName(forTitle: "Q3/Q4: plan?"), "Q3 Q4  plan.xlsx")
        XCTAssertEqual(NoteDetailViewModel.xlsxExportFileName(forTitle: ".hidden"), "hidden.xlsx")
        XCTAssertEqual(NoteDetailViewModel.xlsxExportFileName(forTitle: "  "), "Spreadsheet.xlsx")
        XCTAssertEqual(NoteDetailViewModel.xlsxExportFileName(forTitle: String(repeating: "a", count: 300)).count, 125)
    }

    // MARK: - Search lint and inbox target (v0.106)

    func testSearchLintAndInboxTargetRequests() async throws {
        final class Lint: @unchecked Sendable { var answer = #"{"error":"Unexpected token"}"#; var sent: String? }
        let lint = Lint()
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(#"{"appVersion":"0.106.0","dbVersion":240}"#) }
            if path == "/api/search/lint" {
                XCTAssertEqual(request.httpMethod, "POST")
                let body = request.httpBody ?? request.httpBodyStream.map { stream in
                    stream.open(); defer { stream.close() }
                    var data = Data(); var buffer = [UInt8](repeating: 0, count: 4096)
                    while stream.hasBytesAvailable { let n = stream.read(&buffer, maxLength: buffer.count); if n <= 0 { break }; data.append(buffer, count: n) }
                    return data
                } ?? Data()
                lint.sent = (try? JSONSerialization.jsonObject(with: body) as? [String: String])?["searchString"]
                return ok(lint.answer)
            }
            if path == "/api/special-notes/inbox-target" { return ok(#"{"kind":"dayNote"}"#) }
            XCTFail("Unexpected path: \(path)")
            return ok("{}")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let problem = try await client.lintSearchQuery("#book and")
        XCTAssertEqual(problem, "Unexpected token")
        XCTAssertEqual(lint.sent, "#book and")
        lint.answer = #"{"error":null}"#
        let clean = try await client.lintSearchQuery("#book")
        XCTAssertNil(clean)

        let target = try await client.getInboxTarget()
        XCTAssertEqual(target, InboxTargetResponse(kind: "dayNote", noteId: nil, title: nil))
    }

    // MARK: - Today's journal note

    func testDayNoteComesFromTheSpecialNotesRoute() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(appInfoJSON) }
            if path == "/api/special-notes/days/2026-09-27" {
                XCTAssertEqual(request.httpMethod, "GET")
                return ok(#"{"noteId":"dayNote1","title":"27 - Sunday","type":"text","mime":"text/html","isProtected":false,"blobId":"b1"}"#)
            }
            XCTFail("Unexpected path: \(path)")
            return ok("{}")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let note = try await client.getOrCreateDayNote(onISODay: "2026-09-27")
        XCTAssertEqual(note, NoteIdTitle(noteId: "dayNote1", title: "27 - Sunday", isProtected: false, type: "text"))
        do {
            _ = try await client.getOrCreateDayNote(onISODay: "27/09/2026")
            XCTFail("a day that isn't yyyy-MM-dd never reaches the server")
        } catch {}
    }

    // MARK: - Bulk delete (v0.106 POST /api/delete-notes)

    // MARK: - Protect subtree

    func testProtectSubtreeUsesDesktopsRoute() async throws {
        final class Seen: @unchecked Sendable { var requests: [(method: String?, path: String, query: String?, csrf: String?)] = [] }
        let seen = Seen()
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            func ok(_ body: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(body.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(appInfoJSON) }
            seen.requests.append((request.httpMethod, path, request.url?.query, request.value(forHTTPHeaderField: "x-csrf-token")))
            return ok("")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        try await client.setNoteProtection(noteId: "n1", protect: true, includingSubtree: true)
        try await client.setNoteProtection(noteId: "n1", protect: false, includingSubtree: true)

        XCTAssertEqual(seen.requests.map(\.method), ["PUT", "PUT"])
        XCTAssertEqual(seen.requests.map(\.path), ["/api/notes/n1/protect/1", "/api/notes/n1/protect/0"])
        XCTAssertEqual(seen.requests.map(\.query), ["subtree=1", "subtree=1"])
        XCTAssertEqual(seen.requests.map(\.csrf), ["x", "x"])
    }

    func testProtectSubtreeReportsTheServersRefusal() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(#"{"csrfToken":"x"}"#.utf8))
            }
            if path.contains("/api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            let body = #"{"message":"Cannot (un)protect note 'n1' with protect flag 'true' without active protected session"}"#
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data(body.utf8))
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        do {
            try await client.setNoteProtection(noteId: "n1", protect: true, includingSubtree: true)
            XCTFail("expected the server's error")
        } catch APIError.serverError(let status, let message) {
            XCTAssertEqual(status, 500)
            XCTAssertEqual(message?.contains("without active protected session"), true)
        }
    }

    func testBulkDeleteSendsTheSelectionInOneRequestAfterAPreview() async throws {
        final class Bodies: @unchecked Sendable { var byPath: [String: [String: Any]] = [:] }
        let bodies = Bodies()
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(#"{"appVersion":"0.106.0","dbVersion":240}"#) }
            let body = request.httpBody ?? request.httpBodyStream.map { stream in
                stream.open(); defer { stream.close() }
                var data = Data(); var buffer = [UInt8](repeating: 0, count: 4096)
                while stream.hasBytesAvailable { let n = stream.read(&buffer, maxLength: buffer.count); if n <= 0 { break }; data.append(buffer, count: n) }
                return data
            } ?? Data()
            XCTAssertEqual(request.httpMethod, "POST")
            XCTAssertEqual(request.value(forHTTPHeaderField: "x-csrf-token"), "x")
            bodies.byPath[path] = (try? JSONSerialization.jsonObject(with: body) as? [String: Any]) ?? [:]
            if path == "/api/delete-notes-preview" {
                return ok(#"{"noteIdsToBeDeleted":["a","a1","b"],"brokenRelations":[]}"#)
            }
            if path == "/api/delete-notes" { return ok("") }
            XCTFail("Unexpected path: \(path)")
            return ok("{}")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let previewed = try await client.previewNoteDeletion(branchIds: ["root_a", "root_b"], deleteAllClones: true)
        XCTAssertEqual(previewed, ["a", "a1", "b"])
        let preview = try XCTUnwrap(bodies.byPath["/api/delete-notes-preview"])
        XCTAssertEqual(preview["branchIdsToDelete"] as? [String], ["root_a", "root_b"])
        XCTAssertEqual(preview["deleteAllClones"] as? Bool, true)

        try await client.deleteNotes(branchIds: ["root_a", "root_b"], deleteAllClones: true, eraseNotes: false, totalCount: 3, taskId: "task123456")
        let delete = try XCTUnwrap(bodies.byPath["/api/delete-notes"])
        XCTAssertEqual(delete["branchIdsToDelete"] as? [String], ["root_a", "root_b"])
        XCTAssertEqual(delete["deleteAllClones"] as? Bool, true)
        XCTAssertEqual(delete["eraseNotes"] as? Bool, false)
        XCTAssertEqual(delete["totalCount"] as? Int, 3)
        XCTAssertEqual(delete["taskId"] as? String, "task123456")
    }

    func testAttributeEndpointsMatchDesktop() async throws {
        final class Seen: @unchecked Sendable {
            var requests: [(method: String, path: String, query: String?, csrf: String?, body: Any?)] = []
        }
        let seen = Seen()
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(#"{"appVersion":"0.106.0","dbVersion":240}"#) }
            let body = request.httpBody ?? request.httpBodyStream.map { stream in
                stream.open(); defer { stream.close() }
                var data = Data(); var buffer = [UInt8](repeating: 0, count: 4096)
                while stream.hasBytesAvailable { let n = stream.read(&buffer, maxLength: buffer.count); if n <= 0 { break }; data.append(buffer, count: n) }
                return data
            } ?? Data()
            // `URL.path` drops a trailing slash; the percent-encoded path is what was sent.
            let sentPath = request.url?.path(percentEncoded: true) ?? path
            seen.requests.append((
                request.httpMethod ?? "",
                sentPath,
                request.url?.query,
                request.value(forHTTPHeaderField: "x-csrf-token"),
                body.isEmpty ? nil : try? JSONSerialization.jsonObject(with: body)
            ))
            switch sentPath {
            case "/api/notes/n1/attributes": return ok("")
            case "/api/notes/n1/attribute": return ok(#"{"attributeId":"a9"}"#)
            case "/api/attribute-names/": return ok(#"["status","sorted"]"#)
            default:
                if sentPath.hasPrefix("/api/attribute-values/") { return ok(#"["todo","done"]"#) }
                XCTFail("Unexpected path: \(sentPath)")
                return ok("{}")
            }
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        try await client.replaceOwnedAttributes(noteId: "n1", [
            OwnedAttributeUpdate(type: "label", name: "status", value: "todo", isInheritable: false),
            OwnedAttributeUpdate(type: "relation", name: "template", value: "tpl", isInheritable: true),
        ])
        let id = try await client.updateNoteAttribute(UpdateNoteAttributeRequest(
            noteId: "n1", attributeId: nil, type: "label", name: "status", value: "done"
        ))
        let names = try await client.attributeNames(type: "label", query: "s t")
        let values = try await client.attributeValues(name: "board:groupBy")

        XCTAssertEqual(id, "a9")
        XCTAssertEqual(names, ["status", "sorted"])
        XCTAssertEqual(values, ["todo", "done"])
        XCTAssertEqual(seen.requests.count, 4)

        let replace = seen.requests[0]
        XCTAssertEqual(replace.method, "PUT")
        XCTAssertEqual(replace.csrf, "x")
        let list = try XCTUnwrap(replace.body as? [[String: Any]])
        XCTAssertEqual(list.map { $0["name"] as? String }, ["status", "template"])
        XCTAssertEqual(list[1]["isInheritable"] as? Bool, true)
        XCTAssertEqual(list[1]["type"] as? String, "relation")

        let single = seen.requests[1]
        XCTAssertEqual(single.method, "PUT")
        XCTAssertEqual(single.csrf, "x")
        let singleBody = try XCTUnwrap(single.body as? [String: Any])
        XCTAssertNil(singleBody["attributeId"])
        XCTAssertNil(singleBody["noteId"])
        XCTAssertEqual(singleBody["value"] as? String, "done")

        XCTAssertEqual(seen.requests[2].method, "GET")
        let query = URLComponents(string: "https://x/?\(seen.requests[2].query ?? "")")?.queryItems ?? []
        XCTAssertEqual(Set(query.map { "\($0.name)=\($0.value ?? "")" }), ["type=label", "query=s t"])
        XCTAssertEqual(seen.requests[3].path, "/api/attribute-values/board:groupBy")
    }

    func testAttributeRequestsRefuseIdsThatCouldChangeTheRoute() async throws {
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(#"{"appVersion":"0.106.0","dbVersion":240}"#) }
            XCTFail("No request should be sent, got \(request.httpMethod ?? "") \(path)")
            return ok("{}")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        for (noteId, attributeId) in [("n1", ".."), ("..", "a1"), ("n1", "a1/../.."), ("n1", "")] {
            do {
                try await client.deleteAttribute(noteId: noteId, attributeId: attributeId)
                XCTFail("Expected the id \(noteId)/\(attributeId) to be refused")
            } catch let error as APIError {
                guard case .rejected = error else { return XCTFail("Unexpected error \(error)") }
            }
        }
        do {
            _ = try await client.updateNoteAttribute(UpdateNoteAttributeRequest(
                noteId: "n1", attributeId: "../x", type: "label", name: "a", value: ""
            ))
            XCTFail("Expected the attribute id to be refused")
        } catch let error as APIError {
            guard case .rejected = error else { return XCTFail("Unexpected error \(error)") }
        }
        do {
            try await client.replaceOwnedAttributes(noteId: "a?b", [])
            XCTFail("Expected the note id to be refused")
        } catch let error as APIError {
            guard case .rejected = error else { return XCTFail("Unexpected error \(error)") }
        }
        let none = try await client.attributeValues(name: "../x")
        XCTAssertEqual(none, [])
    }

    func testLinkPreviewCreationNeedsTrilium0104() {
        func info(_ version: String) -> AppInfoResponse? {
            try? JSONDecoder().decode(AppInfoResponse.self, from: Data(#"{"appVersion":"\#(version)","dbVersion":240}"#.utf8))
        }
        XCTAssertFalse(TriliumServerCompatibility.supportsLinkPreviewCreation(info("0.103.2")))
        XCTAssertTrue(TriliumServerCompatibility.supportsLinkPreviewCreation(info("0.104.0")))
        XCTAssertTrue(TriliumServerCompatibility.supportsLinkPreviewCreation(info("v0.106.0")))
        XCTAssertFalse(TriliumServerCompatibility.supportsLinkPreviewCreation(nil))
    }

    func testAutoLinkPreviewsOptionIsOnUnlessTheServerSaysFalse() {
        XCTAssertTrue(TriliumOptionsResponse(values: [:]).autoLinkPreviewsEnabled)
        XCTAssertTrue(TriliumOptionsResponse(values: ["textNoteAutoLinkPreviewsEnabled": "true"]).autoLinkPreviewsEnabled)
        XCTAssertFalse(TriliumOptionsResponse(values: ["textNoteAutoLinkPreviewsEnabled": "false"]).autoLinkPreviewsEnabled)
    }

    func testLinkPreviewMetadataDecodesTriliumsAnswer() throws {
        let json = #"{"url":"https://github.com/","title":"GitHub","favicon":"api/attachments/a1/image/github.com.svg","siteName":"GitHub","embedType":"opengraph"}"#
        let metadata = try JSONDecoder().decode(LinkPreviewMetadata.self, from: Data(json.utf8))
        XCTAssertEqual(metadata.title, "GitHub")
        XCTAssertEqual(metadata.embedType, "opengraph")
        XCTAssertNil(metadata.image)
        XCTAssertNil(metadata.unresolved)
        let unresolved = try JSONDecoder().decode(
            LinkPreviewMetadata.self,
            from: Data(#"{"url":"https://x.test/","title":"x.test","embedType":"opengraph","unresolved":true}"#.utf8)
        )
        XCTAssertEqual(unresolved.unresolved, true)
    }

    func testBulkDeletionNeedsTrilium0106() {
        func info(_ version: String) -> AppInfoResponse? {
            try? JSONDecoder().decode(AppInfoResponse.self, from: Data(#"{"appVersion":"\#(version)","dbVersion":240}"#.utf8))
        }
        XCTAssertFalse(TriliumServerCompatibility.supportsBulkNoteDeletion(info("0.105.0")))
        XCTAssertTrue(TriliumServerCompatibility.supportsBulkNoteDeletion(info("0.106.0")))
        XCTAssertTrue(TriliumServerCompatibility.supportsBulkNoteDeletion(info("v0.107.1")))
        XCTAssertFalse(TriliumServerCompatibility.supportsBulkNoteDeletion(nil))
    }

    // MARK: - Full sync batch dates (v0.106 POST /api/notes/metadata)

    /// Serves a two-note `tree/load`, `/api/notes/metadata` (unless `metadataStatus` fails it) and per-note GETs,
    /// counting which kind of date request the client made.
    private final class BatchDateServer: @unchecked Sendable {
        var metadataBodies: [[String]] = []
        var noteGets: [String] = []
        var metadataStatus = 200

        func handler(appInfo: String) -> (URLRequest) throws -> (HTTPURLResponse, Data) {
            { [self] request in
                let path = request.url?.path ?? ""
                func ok(_ json: String, status: Int = 200) -> (HTTPURLResponse, Data) {
                    (HTTPURLResponse(url: request.url!, statusCode: status, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
                }
                if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
                if path.contains("/api/app-info") { return ok(appInfo) }
                if path.hasSuffix("/api/tree/load") {
                    return ok(#"{"notes":[{"noteId":"n1","title":"One","isProtected":false,"type":"text","mime":"text/html","blobId":"b1"},{"noteId":"n2","title":"Two","isProtected":false,"type":"code","mime":"text/plain","blobId":"b2"}],"branches":[{"branchId":"root_n1","noteId":"n1","parentNoteId":"root","prefix":null,"notePosition":10,"isExpanded":false},{"branchId":"n1_n2","noteId":"n2","parentNoteId":"n1","prefix":null,"notePosition":10,"isExpanded":false}],"attributes":[]}"#)
                }
                if path.hasSuffix("/api/notes/metadata") {
                    XCTAssertEqual(request.httpMethod, "POST")
                    XCTAssertEqual(request.value(forHTTPHeaderField: "x-csrf-token"), "x")
                    let body = request.httpBody ?? request.httpBodyStream.map { stream in
                        stream.open(); defer { stream.close() }
                        var data = Data(); var buffer = [UInt8](repeating: 0, count: 4096)
                        while stream.hasBytesAvailable { let n = stream.read(&buffer, maxLength: buffer.count); if n <= 0 { break }; data.append(buffer, count: n) }
                        return data
                    } ?? Data()
                    let ids = (try? JSONSerialization.jsonObject(with: body) as? [String: [String]])?["noteIds"] ?? []
                    metadataBodies.append(ids)
                    guard metadataStatus == 200 else { return ok(#"{"message":"nope"}"#, status: metadataStatus) }
                    // n2 was deleted before the request landed: the server leaves it out.
                    return ok(#"{"n1":{"dateCreated":"2026-01-01 10:00:00.000+0100","utcDateCreated":"2026-01-01 09:00:00.000Z","dateModified":"2026-02-01 10:00:00.000+0100","utcDateModified":"2026-02-01 09:00:00.000Z"}}"#)
                }
                if path.hasPrefix("/api/notes/") {
                    let id = request.url!.lastPathComponent
                    noteGets.append(id)
                    return ok(#"{"noteId":"\#(id)","title":"T","isProtected":false,"type":"text","mime":"text/html","blobId":"b","utcDateCreated":"2025-01-01 00:00:00.000Z","utcDateModified":"2025-06-01 00:00:00.000Z"}"#)
                }
                XCTFail("Unexpected path: \(path)")
                return ok("{}", status: 404)
            }
        }
    }

    func testFullSyncBatchTakesDatesFromOneMetadataCallOnV0106() async throws {
        let server = BatchDateServer()
        MockURLProtocol.requestHandler = server.handler(appInfo: #"{"appVersion":"0.106.0","dbVersion":240}"#)
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let entries = try await client.fullSyncFetchTreeBatch(noteIds: ["n1", "n2"])
        XCTAssertEqual(server.metadataBodies, [["n1", "n2"]])
        XCTAssertEqual(server.noteGets, [])
        XCTAssertEqual(entries.map(\.note.noteId), ["n1", "n2"])
        XCTAssertEqual(entries[0].note.title, "One")
        XCTAssertEqual(entries[0].note.utcDateModified, "2026-02-01 09:00:00.000Z")
        XCTAssertEqual(entries[0].note.utcDateCreated, "2026-01-01 09:00:00.000Z")
        XCTAssertEqual(entries[0].childBranches.map(\.branchId), ["n1_n2"])
        XCTAssertEqual(entries[1].note.type, "code", "a note without dates still comes from its tree row")
    }

    func testFullSyncBatchGetsEachNoteOnOlderServersOrWhenMetadataFails() async throws {
        let older = BatchDateServer()
        MockURLProtocol.requestHandler = older.handler(appInfo: #"{"appVersion":"0.105.0","dbVersion":240}"#)
        let olderClient = makeClient(persistedCookies: oidcSessionCookieData())
        try await olderClient.restoreSession()
        let olderEntries = try await olderClient.fullSyncFetchTreeBatch(noteIds: ["n1", "n2"])
        XCTAssertEqual(older.metadataBodies, [])
        XCTAssertEqual(Set(older.noteGets), ["n1", "n2"])
        XCTAssertEqual(olderEntries.first?.note.utcDateModified, "2025-06-01 00:00:00.000Z")

        let failing = BatchDateServer()
        failing.metadataStatus = 500
        MockURLProtocol.requestHandler = failing.handler(appInfo: #"{"appVersion":"0.106.0","dbVersion":240}"#)
        let failingClient = makeClient(persistedCookies: oidcSessionCookieData())
        try await failingClient.restoreSession()
        let fallbackEntries = try await failingClient.fullSyncFetchTreeBatch(noteIds: ["n1", "n2"])
        XCTAssertFalse(failing.metadataBodies.isEmpty)
        XCTAssertEqual(Set(failing.noteGets), ["n1", "n2"])
        XCTAssertEqual(fallbackEntries.count, 2)
    }

    func testCappedNoteContentStopsForBodiesOverTheLimit() async throws {
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            func respond(_ body: Data, headers: [String: String]? = nil) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: headers)!, body)
            }
            if path.hasSuffix("/bootstrap") { return respond(Data(#"{"csrfToken":"x","device":"desktop"}"#.utf8)) }
            if path.contains("/api/app-info") { return respond(Data(#"{"appVersion":"0.106.0","dbVersion":240}"#.utf8)) }
            if path.hasSuffix("/api/notes/declared/open") { return respond(Data(count: 100), headers: ["Content-Length": "100"]) }
            if path.hasSuffix("/api/notes/undeclared/open") { return respond(Data(count: 100)) }
            if path.hasSuffix("/api/notes/small/open") { return respond(Data(count: 10), headers: ["Content-Length": "10"]) }
            XCTFail("Unexpected path: \(path)")
            return respond(Data())
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let declared = try await client.getNoteContent("declared", maxBytes: 50)
        let undeclared = try await client.getNoteContent("undeclared", maxBytes: 50)
        let small = try await client.getNoteContent("small", maxBytes: 50)
        XCTAssertNil(declared, "too large by its Content-Length")
        XCTAssertNil(undeclared, "too large once more than the limit arrived")
        XCTAssertEqual(small?.count, 10)
    }

    func testFullSyncBatchBuildsEachNoteFromTheSharedTreeLoadResponse() async throws {
        let treeJSON = #"""
        {"notes":[
          {"noteId":"p","title":"P","isProtected":false,"type":"text","mime":"text/html","blobId":"bp"},
          {"noteId":"q","title":"Q","isProtected":false,"type":"text","mime":"text/html","blobId":"bq"},
          {"noteId":"gone","title":"Gone","isProtected":false,"type":"text","mime":"text/html","blobId":"bg","isDeleted":true}
        ],"branches":[
          {"branchId":"root_p","noteId":"p","parentNoteId":"root","prefix":null,"notePosition":10,"isExpanded":false},
          {"branchId":"x_q","noteId":"q","parentNoteId":"x","prefix":null,"notePosition":5,"isExpanded":false},
          {"branchId":"share_x","noteId":"x","parentNoteId":"_share","prefix":null,"notePosition":5,"isExpanded":false},
          {"branchId":"p_q","noteId":"q","parentNoteId":"p","prefix":null,"notePosition":20,"isExpanded":false},
          {"branchId":"p_b","noteId":"b","parentNoteId":"p","prefix":"pre","notePosition":10,"isExpanded":true},
          {"branchId":"p_a","noteId":"a","parentNoteId":"p","prefix":null,"notePosition":10,"isExpanded":false},
          {"branchId":"p_gone","noteId":"gone","parentNoteId":"p","prefix":null,"notePosition":1,"isExpanded":false},
          {"branchId":"p_del","noteId":"d","parentNoteId":"p","prefix":null,"notePosition":2,"isExpanded":false,"isDeleted":true}
        ],"attributes":[
          {"attributeId":"a2","noteId":"p","type":"label","name":"two","value":"","position":20,"isInheritable":false},
          {"attributeId":"a1","noteId":"p","type":"label","name":"one","value":"","position":10,"isInheritable":true},
          {"attributeId":"aq","noteId":"q","type":"relation","name":"template","value":"t","position":10,"isInheritable":false}
        ]}
        """#
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            func ok(_ json: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(#"{"appVersion":"0.106.0","dbVersion":240}"#) }
            if path.hasSuffix("/api/tree/load") { return ok(treeJSON) }
            if path.hasSuffix("/api/notes/metadata") {
                return ok(#"{"p":{"utcDateModified":"2026-01-01 00:00:00.000Z"},"q":{"utcDateModified":"2026-01-02 00:00:00.000Z"}}"#)
            }
            XCTFail("Unexpected path: \(path)")
            return ok("{}")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let entries = try await client.fullSyncFetchTreeBatch(noteIds: ["p", "q"])
        let p = try XCTUnwrap(entries.first { $0.note.noteId == "p" })
        let q = try XCTUnwrap(entries.first { $0.note.noteId == "q" })

        XCTAssertEqual(p.note.childBranchIds, ["p_a", "p_b", "p_q"], "position order, ties by branch id, deleted left out")
        XCTAssertEqual(p.note.childNoteIds, ["a", "b", "q"])
        XCTAssertEqual(p.childBranches.map(\.branchId), ["p_a", "p_b", "p_q"])
        XCTAssertEqual(p.childBranches[1].prefix, "pre")
        XCTAssertEqual(p.note.attributes.map(\.attributeId), ["a1", "a2"])
        XCTAssertEqual(p.note.parentNoteIds, ["root"])
        XCTAssertEqual(q.note.parentBranchIds, ["p_q", "x_q"], "clone parents by branch id")
        XCTAssertEqual(q.note.parentNoteIds, ["p", "x"])
        XCTAssertEqual(q.note.attributes.map(\.name), ["template"])
        XCTAssertTrue(q.childBranches.isEmpty)
        XCTAssertEqual(q.note.hasShareAncestor, true, "x, one of its clone parents, is shared")
        XCTAssertEqual(p.note.hasShareAncestor, false)
    }

    func testFullSyncBatchOnOlderServersOnlyGetsNotesThatChangedSinceTheyWereCached() async throws {
        let server = BatchDateServer()
        MockURLProtocol.requestHandler = server.handler(appInfo: #"{"appVersion":"0.104.0","dbVersion":240}"#)
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let cached: [String: FullSyncCachedNoteState] = [
            // Same body, title, type and mime as its tree/load row: keeps its cached date.
            "n1": FullSyncCachedNoteState(blobId: "b1", title: "One", type: "text", mime: "text/html", isProtected: false, utcDateModified: "2024-03-03 00:00:00.000Z"),
            // Its body changed on the server.
            "n2": FullSyncCachedNoteState(blobId: "old", title: "Two", type: "code", mime: "text/plain", isProtected: false, utcDateModified: "2024-03-03 00:00:00.000Z"),
        ]
        let entries = try await client.fullSyncFetchTreeBatch(noteIds: ["n1", "n2"], cached: cached)
        XCTAssertEqual(server.noteGets, ["n2"])
        XCTAssertEqual(entries.map(\.note.noteId), ["n1", "n2"])
        XCTAssertEqual(entries[0].note.utcDateModified, "2024-03-03 00:00:00.000Z")
        XCTAssertEqual(entries[0].note.blobId, "b1")
        XCTAssertEqual(entries[0].childBranches.map(\.branchId), ["n1_n2"])
        XCTAssertEqual(entries[1].note.utcDateModified, "2025-06-01 00:00:00.000Z")
    }

    func testSearchNoteIdTitlesUsesSearchThenSingleTreeLoad() async throws {
        var treeLoadCount = 0
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
                let decoded = request.url?.lastPathComponent.removingPercentEncoding
                XCTAssertEqual(decoded, "note.dateModified =* 2026-08-29")
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!,
                        Data(#"["meeting","emptyTitle","deletedNote","day"]"#.utf8))
            }
            if path.hasSuffix("/api/tree/load") {
                treeLoadCount += 1
                XCTAssertEqual(request.httpMethod, "POST")
                let tree = #"{"notes":[{"noteId":"meeting","title":"Standup","isProtected":false,"type":"text","mime":"text/html","blobId":"b1"},{"noteId":"emptyTitle","title":"","isProtected":false,"type":"text","mime":"text/html","blobId":"b2"},{"noteId":"deletedNote","title":"Gone","isProtected":false,"type":"text","mime":"text/html","blobId":"b3","isDeleted":true},{"noteId":"day","title":"29 - Friday","isProtected":false,"type":"text","mime":"text/html","blobId":"b4"}],"branches":[],"attributes":[]}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(tree.utf8))
            }
            if path.contains("/api/notes/") {
                XCTFail("searchNoteIdTitles must not GET /api/notes")
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let rows = try await client.searchNoteIdTitles(query: "note.dateModified =* 2026-08-29", limit: 30)
        XCTAssertEqual(treeLoadCount, 1)
        XCTAssertEqual(rows.map(\.noteId), ["meeting", "day"])
        XCTAssertEqual(rows.map(\.title), ["Standup", "29 - Friday"])
        XCTAssertEqual(rows.map(\.isProtected), [false, false])
    }

    func testSearchNoteIdTitlesEmptySearchSkipsTreeLoad() async throws {
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

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let rows = try await client.searchNoteIdTitles(query: "note.dateModified =* 2026-08-29", limit: 30)
        XCTAssertTrue(rows.isEmpty)
    }

    func testGetEditedNotesUsesEditedNotesPathAndSkipsDeleted() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"x","device":"desktop"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.contains("/api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            if path.hasSuffix("/api/edited-notes/2026-08-29") {
                let body = #"[{"noteId":"meeting","isDeleted":false,"title":"Standup"},{"noteId":"gone","isDeleted":true,"title":"Deleted"},{"noteId":"blank","isDeleted":false,"title":"  "},{"noteId":"day","isDeleted":false,"title":"29 - Friday"}]"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(body.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let rows = try await client.getEditedNotes(onISODay: "2026-08-29")
        XCTAssertEqual(rows.map(\.noteId), ["meeting", "day"])
        XCTAssertEqual(rows.map(\.title), ["Standup", "29 - Friday"])
    }

    func testGetEditedNotesRejectsInvalidDay() async {
        let client = makeClient()
        do {
            _ = try await client.getEditedNotes(onISODay: "../etc")
            XCTFail("Expected invalid day to throw")
        } catch {
            // Path must not be requested; throwing locally is enough.
        }
    }

    func testGetEditedNotesEmptyArray() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"x","device":"desktop"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.contains("/api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            if path.hasSuffix("/api/edited-notes/2026-09-05") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data("[]".utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let rows = try await client.getEditedNotes(onISODay: "2026-09-05")
        XCTAssertTrue(rows.isEmpty)
    }

    func testGetDayNotesForMonthUsesSpecialNotesPathAndCalendarRootQuery() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"x","device":"desktop"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.contains("/api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            if path.contains("/api/special-notes/notes-for-month/") {
                XCTAssertTrue(path.hasSuffix("/api/special-notes/notes-for-month/2026-08"))
                let items = URLComponents(url: request.url!, resolvingAgainstBaseURL: false)?.queryItems ?? []
                XCTAssertEqual(items.first(where: { $0.name == "calendarRoot" })?.value, "journalRoot")
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(#"{"2026-08-01":"d1","2026-08-29":"d29"}"#.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        let map = try await client.getDayNotesForMonth(month: "2026-08", calendarRootId: "journalRoot")
        XCTAssertEqual(map["2026-08-01"], "d1")
        XCTAssertEqual(map["2026-08-29"], "d29")
        XCTAssertEqual(map.count, 2)
    }

    func testGetDayNotesForMonthRejectsInvalidMonth() async {
        let client = makeClient()
        do {
            _ = try await client.getDayNotesForMonth(month: "../etc", calendarRootId: "journalRoot")
            XCTFail("Expected invalid month to throw")
        } catch {
            // Path must not be requested; throwing locally is enough.
        }
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

    func testSyncPullResponseKeepsChangeNumbersAndDropsTheOnesAlreadyApplied() throws {
        let json = #"""
        {"entityChanges":[
          {"entityChange":{"id":41,"entityName":"notes","entityId":"a","isErased":0},"entity":{"noteId":"a"}},
          {"entityChange":{"id":"42","entityName":"notes","entityId":"b","isErased":0},"entity":{"noteId":"b"}},
          {"entityChange":{"entityName":"notes","entityId":"c","isErased":0},"entity":{"noteId":"c"}}
        ],"lastEntityChangeId":42,"outstandingPullCount":0}
        """#.data(using: .utf8)!
        let p = try SyncPullResponse.parseFromChanged(jsonData: json)
        XCTAssertEqual(p.entityChanges.map(\.id), [41, 42, nil])
        XCTAssertEqual(p.droppingChanges(through: 41).entityChanges.map(\.entityId), ["b", "c"], "unnumbered changes stay")
        XCTAssertEqual(p.droppingChanges(through: 41).maxEntityChangeId, 42)
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

    /// Trilium v0.106 multi-criteria `#sorted` rewrites positions server-side and emits only `note_reordering`,
    /// whose entity is the parent's `{ branchId: notePosition }` map.
    func testSyncPullResponseParsesNoteReordering() throws {
        let json = #"""
        {
            "entityChanges":[
                {"entityChange":{"entityName":"note_reordering","entityId":"parent1","isErased":false},"entity":{"b1":20,"b2":10,"b3":"30"}}
            ],
            "lastEntityChangeId":7,
            "outstandingPullCount":0
        }
        """#.data(using: .utf8)!
        let p = try SyncPullResponse.parseFromChanged(jsonData: json)
        XCTAssertEqual(p.entityChanges.map(\.entityName), ["note_reordering"])
        XCTAssertEqual(p.noteReorderings["parent1"], ["b1": 20, "b2": 10, "b3": 30])
    }

    /// Locks in the shape returned by Trilium v0.103 `/api/sync/changed`: each item is
    /// `{ entityChange: {…}, entity: {…} }` and the new `description` / `source` fields on
    /// revisions (migration 238) round-trip into the `revisions` entity bucket without loss.
    func testSyncPullResponseV0_103IncludesRevisionDescriptionAndSourceFields() throws {
        let json = #"""
        {
            "entityChanges":[
                {"entityChange":{"entityName":"revisions","entityId":"rev1","isErased":false},
                 "entity":{"revisionId":"rev1","noteId":"n1","type":"text","mime":"text/html","title":"Old","isProtected":false,"dateLastEdited":"2026-05-01 12:00:00.000+0000","dateCreated":"2026-05-01 12:00:00.000+0000","utcDateLastEdited":"2026-05-01 12:00:00.000Z","utcDateCreated":"2026-05-01 12:00:00.000Z","utcDateModified":"2026-05-01 12:00:00.000Z","contentLength":42,"description":"Before edit","source":"manual"}},
                {"entityChange":{"entityName":"notes","entityId":"n_spread","isErased":false},
                 "entity":{"noteId":"n_spread","title":"Budget","type":"spreadsheet","mime":"application/json","isProtected":false}}
            ],
            "lastEntityChangeId":238,
            "outstandingPullCount":0
        }
        """#.data(using: .utf8)!
        let p = try SyncPullResponse.parseFromChanged(jsonData: json)
        XCTAssertEqual(p.maxEntityChangeId, 238)
        XCTAssertEqual(p.entityChanges.count, 2)
        XCTAssertEqual(p.notes.count, 1)
        XCTAssertEqual(p.notes[0]["type"] as? String, "spreadsheet")
        XCTAssertEqual(p.notes[0]["mime"] as? String, "application/json")
        XCTAssertEqual(NoteType(rawValue: p.notes[0]["type"] as? String ?? ""), .spreadsheet)
    }

    /// v0.103 `/api/sync/check` adds no new fields vs v0.95; verify the existing decoder
    /// is tolerant of extra unknown top-level keys the server may emit in future point releases.
    func testSyncCheckResponseIgnoresUnknownTopLevelKeys() throws {
        let json = #"""
        {
            "entityHashes": {"notes": {"abc": "h"}},
            "maxEntityChangeId": 9999,
            "futureField": "ignored"
        }
        """#.data(using: .utf8)!
        let r = try JSONDecoder().decode(SyncCheckResponse.self, from: json)
        XCTAssertEqual(r.maxEntityChangeId, 9999)
    }

    // MARK: - Server compatibility envelope

    func testServerCompatibilityWithinTestedRangeForV0_103() {
        let info = AppInfoResponse(
            appVersion: "0.103.0",
            dbVersion: TriliumServerCompatibility.testedMaxDbVersion,
            syncVersion: TriliumServerCompatibility.testedMaxSyncVersion,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertEqual(TriliumServerCompatibility.evaluate(info), .withinTestedRange)
    }

    func testServerCompatibilityFlagsAheadDbVersion() {
        let info = AppInfoResponse(
            appVersion: "0.104.0",
            dbVersion: TriliumServerCompatibility.testedMaxDbVersion + 2,
            syncVersion: TriliumServerCompatibility.testedMaxSyncVersion,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        if case .dbVersionAhead(let serverDb, let testedDb) = TriliumServerCompatibility.evaluate(info) {
            XCTAssertEqual(serverDb, TriliumServerCompatibility.testedMaxDbVersion + 2)
            XCTAssertEqual(testedDb, TriliumServerCompatibility.testedMaxDbVersion)
        } else {
            XCTFail("Expected dbVersionAhead status")
        }
    }

    func testServerCompatibilityPrefersSyncVersionWarning() {
        let info = AppInfoResponse(
            appVersion: "0.104.0",
            dbVersion: TriliumServerCompatibility.testedMaxDbVersion + 2,
            syncVersion: TriliumServerCompatibility.testedMaxSyncVersion + 1,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        if case .syncVersionAhead = TriliumServerCompatibility.evaluate(info) {} else {
            XCTFail("Sync mismatch should win over db mismatch")
        }
    }

    func testServerCompatibilityUnknownWhenInfoMissing() {
        XCTAssertEqual(TriliumServerCompatibility.evaluate(nil), .unknown)
    }

    func testSupportsSpreadsheetNotesRequiresV0_103() {
        XCTAssertFalse(TriliumServerCompatibility.supportsSpreadsheetNotes(nil))
        let before = AppInfoResponse(
            appVersion: "0.102.9",
            dbVersion: 237,
            syncVersion: 38,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertFalse(TriliumServerCompatibility.supportsSpreadsheetNotes(before))
        let at = AppInfoResponse(
            appVersion: "0.103.0",
            dbVersion: 238,
            syncVersion: 39,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertTrue(TriliumServerCompatibility.supportsSpreadsheetNotes(at))
        let newer = AppInfoResponse(
            appVersion: "v0.104.2",
            dbVersion: 240,
            syncVersion: 40,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertTrue(TriliumServerCompatibility.supportsSpreadsheetNotes(newer))
    }

    func testSupportsKanbanAndPresentationNotesVersionGates() {
        XCTAssertFalse(TriliumServerCompatibility.supportsKanbanNotes(nil))
        XCTAssertFalse(TriliumServerCompatibility.supportsPresentationNotes(nil))

        let beforeKanban = AppInfoResponse(
            appVersion: "0.97.1",
            dbVersion: 230,
            syncVersion: 36,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertFalse(TriliumServerCompatibility.supportsKanbanNotes(beforeKanban))
        XCTAssertFalse(TriliumServerCompatibility.supportsPresentationNotes(beforeKanban))

        let atKanban = AppInfoResponse(
            appVersion: "0.97.2",
            dbVersion: 230,
            syncVersion: 36,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertTrue(TriliumServerCompatibility.supportsKanbanNotes(atKanban))
        XCTAssertFalse(TriliumServerCompatibility.supportsPresentationNotes(atKanban))

        let atPresentation = AppInfoResponse(
            appVersion: "0.99.2",
            dbVersion: 235,
            syncVersion: 38,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertTrue(TriliumServerCompatibility.supportsKanbanNotes(atPresentation))
        XCTAssertTrue(TriliumServerCompatibility.supportsPresentationNotes(atPresentation))
    }

    func testSupportsOfficePreviewRequiresV0_105() {
        XCTAssertFalse(TriliumServerCompatibility.supportsOfficePreview(nil))
        let before = AppInfoResponse(
            appVersion: "0.104.1",
            dbVersion: 238,
            syncVersion: 39,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertFalse(TriliumServerCompatibility.supportsOfficePreview(before))
        let at = AppInfoResponse(
            appVersion: "0.105.0",
            dbVersion: 240,
            syncVersion: 39,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertTrue(TriliumServerCompatibility.supportsOfficePreview(at))
        let newer = AppInfoResponse(
            appVersion: "v0.105.1",
            dbVersion: 240,
            syncVersion: 39,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
        XCTAssertTrue(TriliumServerCompatibility.supportsOfficePreview(newer))
    }

    func testSupportsBoardOverhaulRequiresV0_106() {
        func info(_ version: String) -> AppInfoResponse {
            AppInfoResponse(
                appVersion: version,
                dbVersion: 240,
                syncVersion: 39,
                buildDate: nil,
                buildRevision: nil,
                dataDirectory: nil,
                clipperProtocolVersion: nil,
                utcDateTime: nil
            )
        }
        XCTAssertFalse(TriliumServerCompatibility.supportsBoardOverhaul(nil))
        XCTAssertFalse(TriliumServerCompatibility.supportsBoardOverhaul(info("0.105.1")))
        XCTAssertTrue(TriliumServerCompatibility.supportsBoardOverhaul(info("0.106.0")))
        XCTAssertTrue(TriliumServerCompatibility.supportsBoardOverhaul(info("v0.107.0-beta.1")))
        XCTAssertEqual(TriliumServerCompatibility.evaluate(info("0.106.0")), .withinTestedRange)
    }

    func testGetNoteOfficePreviewDecodesHTML() async throws {
        MockURLProtocol.requestHandler = { request in
            XCTAssertEqual(request.httpMethod, "GET")
            XCTAssertEqual(request.url?.path, "/api/notes/n1/office-preview")
            let json = #"{"html":"<p>Doc</p>"}"#
            return (
                HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!,
                Data(json.utf8)
            )
        }
        let client = makeClient()
        let result = try await client.getNoteOfficePreview("n1")
        XCTAssertEqual(result.html, "<p>Doc</p>")
    }

    func testGetAttachmentOfficePreviewDecodesHTML() async throws {
        MockURLProtocol.requestHandler = { request in
            XCTAssertEqual(request.httpMethod, "GET")
            XCTAssertEqual(request.url?.path, "/api/attachments/a9/office-preview")
            let json = #"{"html":"<table><tr><td>1</td></tr></table>"}"#
            return (
                HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!,
                Data(json.utf8)
            )
        }
        let client = makeClient()
        let result = try await client.getAttachmentOfficePreview("a9")
        XCTAssertEqual(result.html, "<table><tr><td>1</td></tr></table>")
    }

    /// Trilium v0.106 sends the fragment itself as the body instead of a `{ html }` envelope.
    func testGetNoteOfficePreviewAcceptsRawHTMLBody() async throws {
        MockURLProtocol.requestHandler = { request in
            XCTAssertEqual(request.url?.path, "/api/notes/n1/office-preview")
            return (
                HTTPURLResponse(
                    url: request.url!,
                    statusCode: 200,
                    httpVersion: nil,
                    headerFields: ["Content-Type": "text/html; charset=utf-8"]
                )!,
                Data("<div class=\"container\"><p>Doc</p></div>".utf8)
            )
        }
        let client = makeClient()
        let result = try await client.getNoteOfficePreview("n1")
        XCTAssertEqual(result.html, "<div class=\"container\"><p>Doc</p></div>")
    }

    func testDecodeOfficePreviewDetectsBothShapes() throws {
        XCTAssertEqual(
            try TriliumClient.decodeOfficePreview(data: Data(#"  {"html":"<p>A</p>"}"#.utf8), contentType: nil).html,
            "<p>A</p>"
        )
        XCTAssertEqual(
            try TriliumClient.decodeOfficePreview(data: Data(#"{"html":"<p>B</p>"}"#.utf8), contentType: "application/json").html,
            "<p>B</p>"
        )
        XCTAssertEqual(
            try TriliumClient.decodeOfficePreview(data: Data("<table></table>".utf8), contentType: nil).html,
            "<table></table>"
        )
    }

    func testGetNoteOfficePreviewSurfaces400() async throws {
        MockURLProtocol.requestHandler = { request in
            let json = #"{"message":"Office document is too large to preview"}"#
            return (
                HTTPURLResponse(url: request.url!, statusCode: 400, httpVersion: nil, headerFields: nil)!,
                Data(json.utf8)
            )
        }
        let client = makeClient()
        do {
            _ = try await client.getNoteOfficePreview("n1")
            XCTFail("Expected APIError.serverError 400")
        } catch let error as APIError {
            guard case .serverError(let code, let message) = error else {
                XCTFail("Expected serverError, got \(error)")
                return
            }
            XCTAssertEqual(code, 400)
            XCTAssertEqual(message, "Office document is too large to preview")
        }
    }

    func testCompareAppVersionsHandlesPrereleaseSuffix() {
        XCTAssertEqual(
            TriliumServerCompatibility.compareAppVersions("0.103.0-beta.1", "0.103.0"),
            .orderedSame
        )
        XCTAssertEqual(
            TriliumServerCompatibility.compareAppVersions("0.102.1", "0.103.0"),
            .orderedAscending
        )
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

    // MARK: - Cloudflare Access headers

    func testAccessHeadersOmittedWhenNotConfigured() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            XCTAssertNil(request.value(forHTTPHeaderField: CloudflareAccessCredentials.clientIdHeader))
            XCTAssertNil(request.value(forHTTPHeaderField: CloudflareAccessCredentials.clientSecretHeader))
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

        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    func testAccessHeadersIncludedWhenConfigured() async throws {
        let credentials = CloudflareAccessCredentials(clientId: "configured-id", clientSecret: "configured-secret")
        MockURLProtocol.requestHandler = { [appInfoJSON, credentials] request in
            XCTAssertEqual(request.value(forHTTPHeaderField: CloudflareAccessCredentials.clientIdHeader), credentials.clientId)
            XCTAssertEqual(request.value(forHTTPHeaderField: CloudflareAccessCredentials.clientSecretHeader), credentials.clientSecret)
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

        let client = makeClient(persistedCookies: oidcSessionCookieData(), cloudflareAccessCredentials: credentials)
        try await client.restoreSession()
        _ = try await client.getAppInfo()
    }

    func testAccessHeadersOnLoginPOST() async throws {
        let credentials = CloudflareAccessCredentials(clientId: "login-id", clientSecret: "login-secret")
        MockURLProtocol.requestHandler = { [appInfoJSON, credentials] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/login"), request.httpMethod == "POST" {
                XCTAssertEqual(request.value(forHTTPHeaderField: CloudflareAccessCredentials.clientIdHeader), credentials.clientId)
                XCTAssertEqual(request.value(forHTTPHeaderField: CloudflareAccessCredentials.clientSecretHeader), credentials.clientSecret)
                let headers = ["Location": "/"]
                return (HTTPURLResponse(url: request.url!, statusCode: 302, httpVersion: nil, headerFields: headers)!, Data())
            }
            if path.hasSuffix("/bootstrap") {
                let json = #"{"csrfToken":"boot_csrf_42","device":"mobile","triliumVersion":"0.102.1"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.isEmpty || path == "/" {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data("<html></html>".utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            return (HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient(cloudflareAccessCredentials: credentials)
        try await client.login(password: "secret", rememberMe: false, totpToken: nil)
    }

    // MARK: - TOTP login detection

    func testLogin401JsonTotpRequired() async throws {
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/login"), request.httpMethod == "POST" {
                let json = #"{"success":false,"factor":"totp"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 401, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        do {
            try await client.login(password: "secret", rememberMe: false, totpToken: nil)
            XCTFail("Expected totpRequired")
        } catch APIError.totpRequired {
            // expected
        } catch {
            XCTFail("Expected totpRequired, got \(error)")
        }
    }

    func testLogin401JsonTotpInvalid() async throws {
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/login"), request.httpMethod == "POST" {
                let json = #"{"success":false,"factor":"totp"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 401, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        do {
            try await client.login(password: "secret", rememberMe: false, totpToken: "000000")
            XCTFail("Expected totpInvalid")
        } catch APIError.totpInvalid {
            // expected
        } catch {
            XCTFail("Expected totpInvalid, got \(error)")
        }
    }

    func testLogin401JsonWrongPasswordUnauthorized() async throws {
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/login"), request.httpMethod == "POST" {
                let json = #"{"success":false,"factor":"password"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 401, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            XCTFail("Unexpected path: \(path)")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        do {
            try await client.login(password: "wrong", rememberMe: false, totpToken: nil)
            XCTFail("Expected unauthorized")
        } catch APIError.unauthorized {
            // expected
        } catch {
            XCTFail("Expected unauthorized, got \(error)")
        }
    }

    func testLoginRedirectFollow401JsonTotpRequired() async throws {
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/login"), request.httpMethod == "POST" {
                let headers = ["Location": "/"]
                return (HTTPURLResponse(url: request.url!, statusCode: 302, httpVersion: nil, headerFields: headers)!, Data())
            }
            if path.isEmpty || path == "/" {
                let json = #"{"success":false,"factor":"totp"}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 401, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            XCTFail("Unexpected path: \(path) method=\(request.httpMethod ?? "")")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        do {
            try await client.login(password: "secret", rememberMe: false, totpToken: nil)
            XCTFail("Expected totpRequired")
        } catch APIError.totpRequired {
            // expected
        } catch {
            XCTFail("Expected totpRequired, got \(error)")
        }
    }

    func testLoginBootstrapTotpRequiredBeforeAppInfo() async throws {
        MockURLProtocol.requestHandler = { [appInfoJSON] request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/login"), request.httpMethod == "POST" {
                let headers = ["Location": "/"]
                return (HTTPURLResponse(url: request.url!, statusCode: 302, httpVersion: nil, headerFields: headers)!, Data())
            }
            if path.hasSuffix("/bootstrap") {
                let json = #"{"loggedIn":false,"login":{"totpEnabled":true,"ssoEnabled":false}}"#
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
            }
            if path.isEmpty || path == "/" {
                return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data("<html></html>".utf8))
            }
            if path.contains("api/app-info") {
                return (HTTPURLResponse(url: request.url!, statusCode: 401, httpVersion: nil, headerFields: nil)!, Data(appInfoJSON.utf8))
            }
            XCTFail("Unexpected path: \(path) method=\(request.httpMethod ?? "")")
            return (HTTPURLResponse(url: request.url!, statusCode: 500, httpVersion: nil, headerFields: nil)!, Data())
        }

        let client = makeClient()
        do {
            try await client.login(password: "secret", rememberMe: false, totpToken: nil)
            XCTFail("Expected totpRequired")
        } catch APIError.totpRequired {
            // expected
        } catch {
            XCTFail("Expected totpRequired, got \(error)")
        }
    }

    // MARK: - AI chat (v0.105+)

    private func requestBody(_ request: URLRequest) -> Data {
        request.httpBody ?? request.httpBodyStream.map { stream in
            stream.open(); defer { stream.close() }
            var data = Data(); var buffer = [UInt8](repeating: 0, count: 4096)
            while stream.hasBytesAvailable { let n = stream.read(&buffer, maxLength: buffer.count); if n <= 0 { break }; data.append(buffer, count: n) }
            return data
        } ?? Data()
    }

    func testStreamLlmChatPostsAndYieldsEachChunk() async throws {
        final class Captured: @unchecked Sendable { var request: URLRequest?; var body = Data() }
        let captured = Captured()
        MockURLProtocol.requestHandler = { [self] request in
            let path = request.url?.path ?? ""
            func ok(_ text: String, type: String = "application/json") -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: ["Content-Type": type])!, Data(text.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(#"{"appVersion":"0.106.0","dbVersion":240}"#) }
            if path == "/api/llm-chat/stream" {
                captured.request = request
                captured.body = requestBody(request)
                let sse = "data: {\"type\":\"status\",\"status\":\"starting_agent\"}\n\n"
                    + ":\n\n"
                    + "data: {\"type\":\"text\",\"content\":\"Hel\"}\n\n"
                    + "data: {\"type\":\"text\",\"content\":\"lo\"}\r\n\r\n"
                    + "data: {\"type\":\"mystery\"}\n\n"
                    + "data: not json\n\n"
                    + "data: {\"type\":\"usage\",\"usage\":{\"totalTokens\":3}}\n\n"
                    + "data: {\"type\":\"done\"}\n\n"
                return ok(sse, type: "text/event-stream")
            }
            XCTFail("Unexpected path: \(path)")
            return ok("{}")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let stream = await client.streamLlmChat(
            streamId: "turn12345678",
            messages: [LlmApiMessage(role: .user, text: "Hi")],
            config: LlmChatRequestConfig(provider: "anthropic", providerId: "p1", model: "m", enableWebSearch: true, enableNoteTools: false, chatNoteId: "chat1")
        )
        var chunks: [LlmStreamChunk] = []
        for try await chunk in stream { chunks.append(chunk) }
        XCTAssertEqual(chunks, [.status("starting_agent"), .text("Hel"), .text("lo"), .unknown(type: "mystery"), .usage(LlmUsage(totalTokens: 3)), .done])

        let request = try XCTUnwrap(captured.request)
        XCTAssertEqual(request.httpMethod, "POST")
        XCTAssertEqual(request.value(forHTTPHeaderField: "x-csrf-token"), "x")
        XCTAssertEqual(request.value(forHTTPHeaderField: "Accept"), "text/event-stream")
        XCTAssertEqual(request.value(forHTTPHeaderField: "Content-Type"), "application/json")
        let body = try XCTUnwrap(JSONSerialization.jsonObject(with: captured.body) as? [String: Any])
        XCTAssertEqual(body["streamId"] as? String, "turn12345678")
        XCTAssertEqual(body["messages"] as? [[String: String]], [["role": "user", "content": "Hi"]])
        XCTAssertEqual(
            body["config"] as? NSDictionary,
            ["provider": "anthropic", "providerId": "p1", "model": "m", "enableWebSearch": true, "enableNoteTools": false, "chatNoteId": "chat1"]
        )
    }

    func testStreamLlmChatSurfacesTheServersRefusal() async throws {
        MockURLProtocol.requestHandler = { request in
            let path = request.url?.path ?? ""
            func respond(_ text: String, status: Int = 200) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: status, httpVersion: nil, headerFields: nil)!, Data(text.utf8))
            }
            if path.hasSuffix("/bootstrap") { return respond(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return respond(#"{"appVersion":"0.106.0","dbVersion":240}"#) }
            if path == "/api/llm-chat/stream" { return respond(#"{"error":"messages array is required"}"#, status: 400) }
            XCTFail("Unexpected path: \(path)")
            return respond("{}")
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let stream = await client.streamLlmChat(streamId: "turn12345678", messages: [], config: LlmChatRequestConfig())
        do {
            for try await _ in stream { XCTFail("no chunks expected") }
            XCTFail("expected the refusal")
        } catch APIError.serverError(let statusCode, let message) {
            XCTAssertEqual(statusCode, 400)
            XCTAssertEqual(message, "messages array is required")
        }
    }

    func testLlmChatSpecialNotesAndOptionWrites() async throws {
        struct Seen { var path: String; var method: String; var csrf: String?; var body: [String: Any] }
        final class SeenRequests: @unchecked Sendable { var all: [Seen] = [] }
        let seen = SeenRequests()
        MockURLProtocol.requestHandler = { [self] request in
            let path = request.url?.path ?? ""
            func ok(_ text: String) -> (HTTPURLResponse, Data) {
                (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!, Data(text.utf8))
            }
            if path.hasSuffix("/bootstrap") { return ok(#"{"csrfToken":"x","device":"desktop"}"#) }
            if path.contains("/api/app-info") { return ok(#"{"appVersion":"0.106.0","dbVersion":240}"#) }
            let body = (try? JSONSerialization.jsonObject(with: requestBody(request)) as? [String: Any]) ?? [:]
            seen.all.append(Seen(
                path: path + (request.url?.query.map { "?" + $0 } ?? ""),
                method: request.httpMethod ?? "",
                csrf: request.value(forHTTPHeaderField: "x-csrf-token"),
                body: body
            ))
            switch path {
            case "/api/special-notes/llm-chat":
                return ok(#"{"noteId":"c1","title":"Chat: 2026-10-08 10:00:00","type":"llmChat","mime":"application/json","isProtected":false,"blobId":"b1"}"#)
            case "/api/special-notes/recent-llm-chats":
                return ok(#"[{"noteId":"c1","title":"Chat: 2026-10-08 10:00:00","dateModified":"2026-10-08 10:00:00.000Z"}]"#)
            case "/api/special-notes/save-llm-chat":
                return ok(#"{"success":true,"branchId":"b2","notePath":"root/home/c1"}"#)
            case "/api/options":
                return ok("")
            default:
                XCTFail("Unexpected path: \(path)")
                return ok("{}")
            }
        }
        let client = makeClient(persistedCookies: oidcSessionCookieData())
        try await client.restoreSession()

        let created = try await client.createLlmChat()
        XCTAssertEqual(created, CreatedLlmChat(noteId: "c1", title: "Chat: 2026-10-08 10:00:00"))
        let recent = try await client.recentLlmChats(limit: 10)
        XCTAssertEqual(recent.map(\.noteId), ["c1"])
        let kept = try await client.keepLlmChat(noteId: "c1")
        XCTAssertTrue(kept.success)
        XCTAssertEqual(kept.keptNoteId, "c1")
        try await client.updateOptions(["aiEnabled": "true", "aiAssistantModel": ""])

        XCTAssertEqual(seen.all.map(\.path), [
            "/api/special-notes/llm-chat", "/api/special-notes/recent-llm-chats?limit=10", "/api/special-notes/save-llm-chat", "/api/options"
        ])
        XCTAssertEqual(seen.all.map(\.method), ["POST", "GET", "POST", "PUT"])
        XCTAssertEqual(seen.all.map(\.csrf), ["x", nil, "x", "x"])
        XCTAssertEqual(seen.all[0].body as? [String: String], [:])
        XCTAssertEqual(seen.all[2].body as? [String: String], ["llmChatNoteId": "c1"])
        XCTAssertEqual(seen.all[3].body as? [String: String], ["aiEnabled": "true", "aiAssistantModel": ""])
    }
}
