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
}
