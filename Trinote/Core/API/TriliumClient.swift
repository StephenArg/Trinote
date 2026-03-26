import Foundation
import UIKit

// MARK: - Protocol

protocol TriliumClientProtocol: Actor, Sendable {
    var baseURL: URL { get }
    /// Whether the client has established a Trilium session (validated or just logged in).
    var isSessionValid: Bool { get }

    func login(password: String, rememberMe: Bool) async throws
    /// Validates cookies against `/api/app-info` and refreshes CSRF from `/`.
    func restoreSession() async throws
    func logout() async throws

    /// Unlocks protected-note content for this HTTP session (Trilium document password).
    func enterProtectedSession(password: String) async throws
    /// Extends the protected session timeout (call before sensitive writes if needed).
    func touchProtectedSession() async throws
    /// Ends the protected session on the server (optional; main `logout` clears cookies too).
    func exitProtectedSession() async throws

    /// Serialized cookie archive for Keychain persistence.
    func exportSessionCookieData() -> Data?

    func getAppInfo() async throws -> AppInfoResponse
    func getNote(_ noteId: String) async throws -> NoteResponse
    func getNoteContent(_ noteId: String) async throws -> Data
    func updateNote(_ noteId: String, request: UpdateNoteRequest) async throws -> NoteResponse
    func updateNoteContent(_ noteId: String, content: Data, contentType: String) async throws
    func deleteNote(_ noteId: String) async throws
    func createNote(_ request: CreateNoteRequest) async throws -> CreateNoteResponse
    /// New note under `parentNoteId` with copied title, type, mime, and body (child notes are not copied).
    func duplicateNoteAsChild(sourceNoteId: String, parentNoteId: String) async throws -> CreateNoteResponse
    /// New child with arbitrary body (text in `createNote`, binary via `updateNoteContent` when needed).
    func createChildNoteWithContent(parentNoteId: String, title: String, noteType: String, mime: String, body: Data) async throws -> CreateNoteResponse
    func searchNotes(query: String, fastSearch: Bool, includeArchived: Bool, ancestorNoteId: String?, orderBy: String?, orderDirection: String?, limit: Int?) async throws -> SearchResponse

    func getBranch(_ branchId: String, parentNoteId: String) async throws -> BranchResponse
    func placeBranchInSiblingOrder(_ branchId: String, orderedSiblingBranchIds: [String]) async throws

    func createBranch(_ request: CreateBranchRequest) async throws -> BranchResponse
    func updateBranch(_ branchId: String, request: UpdateBranchRequest) async throws -> BranchResponse
    func deleteBranch(_ branchId: String) async throws
    /// Matches the web client: `taskId=no-progress-reporting` and `last=true` so the delete task completes without WS progress.
    func deleteBranchWithNoProgressTask(_ branchId: String) async throws
    /// `PUT /api/notes/:noteId/clone-to-note/:parentNoteId` — same as Trilium’s “share” (clone under `_share`).
    func cloneNoteToParentNote(_ noteId: String, parentNoteId: String) async throws
    /// Resolves the branch linking `childNoteId` as a child of `parentNoteId` (from `POST /api/tree/load`).
    func branchId(fromParentNoteId parentNoteId: String, toChildNoteId childNoteId: String) async throws -> String?
    /// `PUT /api/branches/:branchId/move-to/:parentBranchId` — moves the branch (tree placement) under the target parent’s branch.
    func moveBranchToParent(branchId: String, parentBranchId: String) async throws

    func getAttribute(_ attributeId: String) async throws -> AttributeResponse
    func createAttribute(_ request: CreateAttributeRequest) async throws
    func deleteAttribute(noteId: String, attributeId: String) async throws

    func getNoteAttachments(_ noteId: String) async throws -> [AttachmentResponse]
    func getAttachment(_ attachmentId: String) async throws -> AttachmentResponse
    func getAttachmentContent(_ attachmentId: String) async throws -> Data
    func uploadAttachmentContent(_ attachmentId: String, data: Data, contentType: String) async throws
    func createAttachment(_ request: CreateAttachmentRequest) async throws -> AttachmentResponse
    func deleteAttachment(_ attachmentId: String) async throws

    // MARK: Sync — documented protocol (POST /api/sync/*)

    func syncCheck() async throws -> SyncCheckResponse
    func syncPull(instanceId: String, lastEntityChangeId: Int64) async throws -> SyncPullResponse
}

// MARK: - Cookie archive (Keychain)

enum TriliumCookieArchive {
    static func load(into storage: HTTPCookieStorage, data: Data, defaultURL: URL) {
        guard let raw = try? JSONSerialization.jsonObject(with: data) as? [[String: Any]] else { return }
        for dict in raw {
            var props: [HTTPCookiePropertyKey: Any] = [:]
            for (k, v) in dict {
                let key = HTTPCookiePropertyKey(k)
                props[key] = v
            }
            guard let cookie = HTTPCookie(properties: props) else { continue }
            storage.setCookie(cookie)
        }
    }

    static func export(from storage: HTTPCookieStorage, for url: URL) -> Data? {
        let cookies = storage.cookies(for: url) ?? []
        guard !cookies.isEmpty else { return nil }
        var out: [[String: Any]] = []
        out.reserveCapacity(cookies.count)
        for c in cookies {
            guard let p = c.properties else { continue }
            var dict: [String: Any] = [:]
            for (k, v) in p {
                if let s = v as? String { dict[k.rawValue] = s }
                else if let d = v as? Date { dict[k.rawValue] = d.timeIntervalSinceReferenceDate }
                else if let n = v as? NSNumber { dict[k.rawValue] = n }
                else if let b = v as? Bool { dict[k.rawValue] = b }
            }
            out.append(dict)
        }
        return try? JSONSerialization.data(withJSONObject: out, options: [])
    }
}

// MARK: - Native note row (`GET /api/notes/:id`)

private struct NativeNoteDetailRow: Decodable {
    let noteId: String
    let title: String?
    let isProtected: Bool
    let type: String
    let mime: String
    let blobId: String?
    let isDeleted: Bool?
    let dateCreated: String?
    let dateModified: String?
    let utcDateCreated: String?
    let utcDateModified: String?
}

private enum TriliumHTTP {
    static let csrfHeader = "x-csrf-token"
}

private struct ProtectedSessionLoginResponse: Decodable {
    let success: Bool
    let message: String?
}

// MARK: - Implementation

actor TriliumClient: TriliumClientProtocol {
    let baseURL: URL
    nonisolated let httpCookieStorage: HTTPCookieStorage

    private(set) var isSessionValid = false
    private var csrfToken: String?

    private let session: URLSession
    private let decoder: JSONDecoder
    private let encoder: JSONEncoder

    /// - Parameter urlSessionConfiguration: Optional config (e.g. tests with `URLProtocol`). Always wired to this client’s `httpCookieStorage`.
    init(baseURL: URL, persistedCookieData: Data? = nil, urlSessionConfiguration: URLSessionConfiguration? = nil) {
        self.baseURL = baseURL

        // `HTTPCookieStorage()` creates a non-functional standalone instance on iOS — `setCookie` silently discards.
        // `.shared` is the only storage where `cookies(for:)` reliably returns what was set.
        // We clear stale cookies for this host on every new client to keep profiles isolated.
        let jar = HTTPCookieStorage.shared
        Self.clearCookies(in: jar, for: baseURL)
        self.httpCookieStorage = jar

        if let persistedCookieData {
            TriliumCookieArchive.load(into: jar, data: persistedCookieData, defaultURL: baseURL)
        }

        self.decoder = JSONDecoder()
        self.encoder = JSONEncoder()

        let config = urlSessionConfiguration ?? URLSessionConfiguration.default
        if urlSessionConfiguration == nil {
            config.timeoutIntervalForRequest = 30
            config.timeoutIntervalForResource = 120
            config.waitsForConnectivity = true
        }
        config.httpCookieStorage = jar
        config.httpShouldSetCookies = true
        config.httpCookieAcceptPolicy = .always

        self.session = URLSession(configuration: config)
    }

    private nonisolated static func clearCookies(in jar: HTTPCookieStorage, for baseURL: URL) {
        guard let host = baseURL.host?.lowercased() else { return }
        for c in jar.cookies ?? [] {
            if c.domain.lowercased() == host || c.domain.lowercased() == ".\(host)" {
                jar.deleteCookie(c)
            }
        }
    }

    func exportSessionCookieData() -> Data? {
        TriliumCookieArchive.export(from: httpCookieStorage, for: baseURL)
    }

    // MARK: - Auth

    func login(password: String, rememberMe: Bool) async throws {
        csrfToken = nil
        isSessionValid = false

        var body = "password=\(Self.applicationFormEncode(password))"
        if rememberMe {
            // Match the web login form (`<input name="rememberMe" value="1">`).
            body += "&rememberMe=1"
        }

        let loginURL = baseURL.appendingPathComponent("login")
        var req = URLRequest(url: loginURL)
        req.httpMethod = "POST"
        req.setValue("application/x-www-form-urlencoded; charset=utf-8", forHTTPHeaderField: "Content-Type")
        req.httpBody = Data(body.utf8)

        // Do NOT auto-follow redirects: iOS can drop or merge multiple `Set-Cookie` headers on 3xx responses.
        // Trilium sends `trilium.sid` (and sometimes `_csrf`) on the 302 from `POST /login`.
        let (redirectStopData, redirectStopHTTP, loginSession) = try await postLoginStoppingAtRedirect(request: req)
        defer { loginSession.finishTasksAndInvalidate() }

        TriliumCookieResponseParser.storeCookies(from: redirectStopHTTP, in: httpCookieStorage)

        if redirectStopHTTP.statusCode == 401 {
            throw APIError.unauthorized
        }

        var shellData = redirectStopData
        if [301, 302, 303, 307, 308].contains(redirectStopHTTP.statusCode) {
            let rawLoc = redirectStopHTTP.value(forHTTPHeaderField: "Location")?.trimmingCharacters(in: .whitespacesAndNewlines) ?? "/"
            guard let target = Self.resolveRedirectURL(rawLoc, loginURL: loginURL, baseURL: baseURL) else {
                throw APIError.invalidURL
            }
            if target.host?.lowercased() != baseURL.host?.lowercased() {
                throw APIError.decodingFailed(
                    "Login redirected to another host (\(target.host ?? "unknown")) — this server likely uses SSO. Sign in with Safari first, or use a direct Trilium URL."
                )
            }
            var getReq = URLRequest(url: target)
            getReq.httpMethod = "GET"
            getReq.setValue("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", forHTTPHeaderField: "Accept")
            getReq.setValue("no-cache", forHTTPHeaderField: "Cache-Control")
            getReq.setValue(
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
                forHTTPHeaderField: "User-Agent"
            )
            getReq.cachePolicy = .reloadIgnoringLocalCacheData
            let (d, r) = try await session.data(for: getReq)
            guard let h = r as? HTTPURLResponse else { throw APIError.invalidResponse }
            TriliumCookieResponseParser.storeCookies(from: h, in: httpCookieStorage)
            if h.statusCode == 401 { throw APIError.unauthorized }
            guard (200...399).contains(h.statusCode) else {
                throw APIError.serverError(statusCode: h.statusCode, message: String(data: d, encoding: .utf8))
            }
            shellData = d
        } else if !(200...399).contains(redirectStopHTTP.statusCode) {
            throw APIError.serverError(statusCode: redirectStopHTTP.statusCode, message: String(data: redirectStopData, encoding: .utf8))
        }

        if let html = String(data: shellData, encoding: .utf8),
           let fromShell = Self.extractCsrfToken(from: html), !fromShell.isEmpty {
            csrfToken = fromShell
        } else {
            try await refreshCsrfFromAppShell()
        }

        applyCsrfTokenFromCookiesIfMissing()

        _ = try await getAppInfo()
        isSessionValid = true
    }

    /// `POST /login` only (see `routes.ts` — no CSRF on this route). Stops at the first HTTP redirect so `Set-Cookie` is applied before we open the app shell.
    private func postLoginStoppingAtRedirect(request: URLRequest) async throws -> (Data, HTTPURLResponse, URLSession) {
        let cfg = URLSessionConfiguration.default
        cfg.httpCookieStorage = httpCookieStorage
        cfg.httpShouldSetCookies = true
        cfg.httpCookieAcceptPolicy = .always
        cfg.timeoutIntervalForRequest = 30
        cfg.timeoutIntervalForResource = 120
        cfg.waitsForConnectivity = true

        let delegate = TriliumStopRedirectDelegate(cookieStorage: httpCookieStorage)
        let loginSession = URLSession(configuration: cfg, delegate: delegate, delegateQueue: nil)

        let (data, response) = try await loginSession.data(for: request)
        guard let http = response as? HTTPURLResponse else { throw APIError.invalidResponse }
        return (data, http, loginSession)
    }

    /// `application/x-www-form-urlencoded` (RFC 3986) — stricter than `.urlQueryAllowed` so `&`, `+`, `=`, etc. in passwords don’t break the body.
    private nonisolated static func applicationFormEncode(_ s: String) -> String {
        var allowed = CharacterSet.alphanumerics
        allowed.insert(charactersIn: "-._~")
        return s.addingPercentEncoding(withAllowedCharacters: allowed) ?? ""
    }

    private nonisolated static func resolveRedirectURL(_ location: String, loginURL: URL, baseURL: URL) -> URL? {
        let loc = location.trimmingCharacters(in: .whitespacesAndNewlines)
        if loc.lowercased().hasPrefix("http://") || loc.lowercased().hasPrefix("https://") {
            return URL(string: loc)
        }
        if loc.hasPrefix("//"), let scheme = baseURL.scheme {
            return URL(string: "\(scheme):\(loc)")
        }
        return URL(string: loc, relativeTo: loginURL)?.absoluteURL
    }


    func restoreSession() async throws {
        try await refreshCsrfFromAppShell()
        _ = try await getAppInfo()
        isSessionValid = true
    }

    func logout() async throws {
        defer {
            isSessionValid = false
            csrfToken = nil
            Self.clearCookies(in: httpCookieStorage, for: baseURL)
        }

        guard csrfToken != nil else { return }
        try await refreshCsrfFromAppShell()
        guard let csrfToken else { return }

        var req = URLRequest(url: baseURL.appendingPathComponent("logout"))
        req.httpMethod = "POST"
        req.setValue(csrfToken, forHTTPHeaderField: TriliumHTTP.csrfHeader)
        let (data, response) = try await session.data(for: req)
        guard let http = response as? HTTPURLResponse else { throw APIError.invalidResponse }
        if http.statusCode == 401 { return }
        guard (200...399).contains(http.statusCode) else {
            throw APIError.serverError(statusCode: http.statusCode, message: String(data: data, encoding: .utf8))
        }
    }

    // MARK: - Protected notes (document password)

    func enterProtectedSession(password: String) async throws {
        if csrfToken == nil {
            try await refreshCsrfFromAppShell()
        }
        guard csrfToken != nil else { throw APIError.noToken }
        struct Body: Encodable { let password: String }
        let body = Body(password: password)
        let resp: ProtectedSessionLoginResponse = try await postJSON("/api/login/protected", body: body, csrf: true)
        if !resp.success {
            throw APIError.unknown(resp.message ?? "Incorrect document password.")
        }
    }

    func touchProtectedSession() async throws {
        if csrfToken == nil {
            try await refreshCsrfFromAppShell()
        }
        guard csrfToken != nil else { throw APIError.noToken }
        try await postWithoutBody(path: "/api/login/protected/touch", method: "POST", csrf: true)
    }

    func exitProtectedSession() async throws {
        if csrfToken == nil {
            try await refreshCsrfFromAppShell()
        }
        guard csrfToken != nil else { return }
        try await postWithoutBody(path: "/api/logout/protected", method: "POST", csrf: true)
    }

    private func refreshCsrfFromAppShell() async throws {
        var lastHTML = ""
        for variant in AppShellFetchVariant.allCases {
            let html = try await fetchAppShellHTML(variant: variant)
            lastHTML = html
            if let token = Self.extractCsrfToken(from: html), !token.isEmpty {
                csrfToken = token
                return
            }
            applyCsrfTokenFromCookiesIfMissing()
            if csrfToken != nil {
                return
            }
        }

        applyCsrfTokenFromCookiesIfMissing()
        if csrfToken != nil {
            return
        }

        let looksLikeLoginPage = lastHTML.localizedCaseInsensitiveContains("login-page")
            || lastHTML.localizedCaseInsensitiveContains("Trilium Login")
        let looksLikeHTML = lastHTML.localizedCaseInsensitiveContains("<html")
            || lastHTML.localizedCaseInsensitiveContains("window.glob")
        let hint: String
        if looksLikeLoginPage {
            hint = "The server still shows the login page — the session cookie may not be sticking after sign-in (password wrong, or cookie/SameSite/proxy). Confirm the password in Safari."
        } else if !looksLikeHTML {
            hint = "The server did not return Trilium’s HTML app shell. Use the same base URL as in Safari (scheme, host, port, and any subpath, e.g. https://notes.example.com/trilium)."
        } else {
            hint = "Trilium’s page was received but no CSRF token was found in HTML or cookies. Try updating the server."
        }
        throw APIError.decodingFailed("Could not read CSRF token. \(hint)")
    }

    /// Trilium’s `csrf-csrf` package sets an httpOnly cookie (commonly `_csrf`); native clients can read it from `HTTPCookieStorage` and send the same value in `x-csrf-token`.
    private func applyCsrfTokenFromCookiesIfMissing() {
        guard csrfToken == nil || csrfToken?.isEmpty == true else { return }
        let buckets: [URL] = [
            baseURL,
            baseURL.appendingPathComponent("login"),
            baseURL.appendingPathComponent("api")
        ]
        var seen = Set<String>()
        for bucket in buckets {
            for c in httpCookieStorage.cookies(for: bucket) ?? [] {
                let dedupe = "\(c.name)|\(c.domain)|\(c.path)"
                guard seen.insert(dedupe).inserted else { continue }
                let name = c.name.lowercased()
                guard name == "_csrf" || name == "csrf-token" || name.hasSuffix("csrf-token") || name.contains("csrf") else { continue }
                let raw = c.value
                let decoded = raw.removingPercentEncoding ?? raw
                if !decoded.isEmpty {
                    csrfToken = decoded
                    return
                }
            }
        }
    }

    private enum AppShellFetchVariant: CaseIterable {
        case plain
        case desktopQuery
        case mobileQuery
    }

    /// Fetches `/` (optionally `?desktop=1` / `?mobile=1`) like a browser; some proxies only serve the real SPA HTML to browser user agents.
    private func fetchAppShellHTML(variant: AppShellFetchVariant) async throws -> String {
        let url: URL
        switch variant {
        case .plain:
            url = baseURL
        case .desktopQuery, .mobileQuery:
            guard var c = URLComponents(url: baseURL, resolvingAgainstBaseURL: false) else { throw APIError.invalidURL }
            var items = c.queryItems ?? []
            let key = variant == .desktopQuery ? "desktop" : "mobile"
            if !items.contains(where: { $0.name == key }) {
                items.append(URLQueryItem(name: key, value: "1"))
            }
            c.queryItems = items
            guard let u = c.url else { throw APIError.invalidURL }
            url = u
        }

        var req = URLRequest(url: url)
        req.httpMethod = "GET"
        req.cachePolicy = .reloadIgnoringLocalCacheData
        req.setValue("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", forHTTPHeaderField: "Accept")
        req.setValue("no-cache", forHTTPHeaderField: "Cache-Control")
        req.setValue(
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
            forHTTPHeaderField: "User-Agent"
        )

        let (data, response) = try await session.data(for: req)
        guard let http = response as? HTTPURLResponse else { throw APIError.invalidResponse }
        guard (200...399).contains(http.statusCode) else {
            if http.statusCode == 401 { throw APIError.unauthorized }
            throw APIError.serverError(statusCode: http.statusCode, message: nil)
        }
        if let html = String(data: data, encoding: .utf8) { return html }
        if let html = String(data: data, encoding: .isoLatin1) { return html }
        throw APIError.decodingFailed("HTML encoding")
    }

    /// TriliumNext renders `csrfToken: '<%= csrfToken %>'` inside `window.glob` ([windowGlobal.ejs](https://github.com/TriliumNext/Notes/blob/develop/apps/server/src/assets/views/partials/windowGlobal.ejs)). Older or proxied pages may differ slightly.
    private static func extractCsrfToken(from html: String) -> String? {
        let patterns: [String] = [
            #"csrfToken:\s*'([^']*)'"#, // TriliumNext default
            #"csrfToken:\s*"([^"]*)""#, // double-quoted variant
            #""csrfToken"\s*:\s*"([^"]+)""#, // JSON-like
            #"'csrfToken'\s*:\s*'([^']*)'"#, // quoted keys
            #"<meta\s+name=["']csrf-token["']\s+content=["']([^"']+)["']"# // generic meta (if ever used)
        ]
        for pattern in patterns {
            guard let regex = try? NSRegularExpression(pattern: pattern, options: [.caseInsensitive]) else { continue }
            let range = NSRange(html.startIndex..., in: html)
            guard let match = regex.firstMatch(in: html, options: [], range: range),
                  match.numberOfRanges > 1,
                  let tokenRange = Range(match.range(at: 1), in: html)
            else { continue }
            let token = String(html[tokenRange]).trimmingCharacters(in: .whitespacesAndNewlines)
            if !token.isEmpty { return token }
        }
        return nil
    }

    // MARK: - App

    func getAppInfo() async throws -> AppInfoResponse {
        try await get("/api/app-info", csrf: false)
    }

    func syncCheck() async throws -> SyncCheckResponse {
        try await get("/api/sync/check", csrf: false)
    }

    func syncPull(instanceId: String, lastEntityChangeId: Int64) async throws -> SyncPullResponse {
        let params: [String: String] = [
            "instanceId": instanceId,
            "lastEntityChangeId": String(lastEntityChangeId),
            "logMarkerId": String(UUID().uuidString.prefix(10))
        ]
        let data: Data = try await getRaw("/api/sync/changed", queryParams: params, csrf: false)
        return try SyncPullResponse.parseFromChanged(jsonData: data)
    }

    // MARK: - Notes

    func getNote(_ noteId: String) async throws -> NoteResponse {
        async let detailRow: NativeNoteDetailRow = try await get("/api/notes/\(noteId)", csrf: false)
        async let treeResponse: TreeLoadResponse = try await postJSON("/api/tree/load", body: TreeLoadRequest(noteIds: [noteId]), csrf: true)
        return Self.buildNoteResponse(detail: try await detailRow, tree: try await treeResponse, noteId: noteId)
    }

    func getNoteContent(_ noteId: String) async throws -> Data {
        var req = try buildRequest(path: "/api/notes/\(noteId)/open", method: "GET", queryParams: nil, csrf: false, jsonBody: false)
        req.cachePolicy = .reloadIgnoringLocalCacheData
        req.setValue("no-cache", forHTTPHeaderField: "Cache-Control")
        let (data, response) = try await session.data(for: req)
        try validateResponse(response, data: data)
        return data
    }

    func updateNote(_ noteId: String, request: UpdateNoteRequest) async throws -> NoteResponse {
        if let title = request.title {
            struct Body: Encodable { let title: String }
            try await putJSONVoid("/api/notes/\(noteId)/title", body: Body(title: title), csrf: true)
        }
        if request.type != nil || request.mime != nil {
            struct Body: Encodable { let type: String?; let mime: String? }
            try await putJSONVoid("/api/notes/\(noteId)/type", body: Body(type: request.type, mime: request.mime), csrf: true)
        }
        return try await getNote(noteId)
    }

    func updateNoteContent(_ noteId: String, content: Data, contentType: String) async throws {
        let asString = String(data: content, encoding: .utf8) ?? ""
        struct Body: Encodable { let content: String }
        try await putJSONVoid("/api/notes/\(noteId)/data", body: Body(content: asString), csrf: true)
    }

    func deleteNote(_ noteId: String) async throws {
        let taskId = String(UUID().uuidString.prefix(12))
        let q: [String: String] = [
            "taskId": taskId,
            "last": "true",
            "eraseNotes": "false"
        ]
        try await delete("/api/notes/\(noteId)", queryParams: q, csrf: true)
    }

    func createNote(_ request: CreateNoteRequest) async throws -> CreateNoteResponse {
        struct Body: Encodable {
            let title: String
            let type: String
            let mime: String?
            let content: String
            let notePosition: Int?
            let prefix: String?
            let isProtected: Bool?
            let noteId: String?
            let branchId: String?
        }
        let body = Body(
            title: request.title,
            type: request.type,
            mime: request.mime,
            content: request.content,
            notePosition: request.notePosition,
            prefix: request.prefix,
            isProtected: request.isProtected,
            noteId: request.noteId,
            branchId: request.branchId
        )
        let path = "/api/notes/\(request.parentNoteId)/children"
        let q = ["target": "into"]
        let res: CreateNoteNativeResponse = try await postJSON(path, queryParams: q, body: body, csrf: true)
        let note = try await getNote(res.note.noteId)
        let br = res.branch
        let branch = BranchResponse(
            branchId: br.branchId,
            noteId: br.noteId,
            parentNoteId: br.parentNoteId,
            prefix: br.prefix,
            notePosition: br.notePosition,
            isExpanded: br.isExpanded ?? false,
            utcDateModified: br.utcDateModified
        )
        return CreateNoteResponse(note: note, branch: branch)
    }

    func duplicateNoteAsChild(sourceNoteId: String, parentNoteId: String) async throws -> CreateNoteResponse {
        let src = try await getNote(sourceNoteId)
        if src.isProtected {
            throw APIError.unknown("Protected notes can’t be duplicated in the app.")
        }
        let data = try await getNoteContent(sourceNoteId)
        let dupTitle = Self.duplicateNoteTitle(from: src.title)
        return try await createChildNoteWithContent(
            parentNoteId: parentNoteId,
            title: dupTitle,
            noteType: src.type,
            mime: src.mime,
            body: data
        )
    }

    func createChildNoteWithContent(parentNoteId: String, title: String, noteType: String, mime: String, body: Data) async throws -> CreateNoteResponse {
        let (initialContent, needsBinaryUpload) = Self.initialCreateContentForDuplicate(
            data: body,
            type: noteType,
            mime: mime
        )
        let request = CreateNoteRequest(
            parentNoteId: parentNoteId,
            title: title,
            type: noteType,
            mime: mime,
            content: initialContent,
            notePosition: nil,
            prefix: nil,
            isProtected: false,
            noteId: nil,
            branchId: nil
        )
        var response = try await createNote(request)
        if needsBinaryUpload {
            try await updateNoteContent(response.note.noteId, content: body, contentType: mime)
            let refreshed = try await getNote(response.note.noteId)
            response = CreateNoteResponse(note: refreshed, branch: response.branch)
        }
        return response
    }

    private static func duplicateNoteTitle(from title: String) -> String {
        let t = title.trimmingCharacters(in: .whitespacesAndNewlines)
        if t.isEmpty { return "Note (copy)" }
        return "\(t) (copy)"
    }

    /// UTF-8 text for `createNote`, or empty with `needsBinaryUpload` when body should be sent via `updateNoteContent`.
    private static func initialCreateContentForDuplicate(data: Data, type: String, mime: String) -> (String, Bool) {
        let textLike = mime.hasPrefix("text/")
            || mime.contains("json")
            || type == "code"
            || type == "text"
            || type == "relation"
            || type == "mermaid"
        if textLike, let s = String(data: data, encoding: .utf8) {
            return (s, false)
        }
        if data.isEmpty {
            return ("", false)
        }
        return ("", true)
    }

    func searchNotes(
        query: String,
        fastSearch: Bool = false,
        includeArchived: Bool = false,
        ancestorNoteId: String? = nil,
        orderBy: String? = nil,
        orderDirection: String? = nil,
        limit: Int? = nil
    ) async throws -> SearchResponse {
        _ = fastSearch
        _ = includeArchived
        _ = ancestorNoteId
        _ = orderBy
        _ = orderDirection

        let encoded = query.addingPercentEncoding(withAllowedCharacters: CharacterSet(charactersIn: "/").inverted) ?? query
        let ids: [String] = try await get("/api/search/\(encoded)", csrf: false)

        let max = limit ?? 50
        let slice = Array(ids.prefix(max))
        var results: [NoteResponse] = []
        results.reserveCapacity(slice.count)
        try await withThrowingTaskGroup(of: NoteResponse.self) { group in
            for id in slice {
                group.addTask { try await self.getNote(id) }
            }
            for try await n in group {
                results.append(n)
            }
        }
        return SearchResponse(results: results, debugInfo: nil)
    }

    // MARK: - Branches

    func getBranch(_ branchId: String, parentNoteId: String) async throws -> BranchResponse {
        let tree: TreeLoadResponse = try await postJSON("/api/tree/load", body: TreeLoadRequest(noteIds: [parentNoteId]), csrf: true)
        guard let row = tree.branches.first(where: { $0.branchId == branchId }) else {
            throw APIError.notFound("branch \(branchId)")
        }
        return BranchResponse(
            branchId: row.branchId,
            noteId: row.noteId,
            parentNoteId: row.parentNoteId,
            prefix: row.prefix,
            notePosition: row.notePosition,
            isExpanded: row.isExpanded,
            utcDateModified: nil
        )
    }

    func placeBranchInSiblingOrder(_ branchId: String, orderedSiblingBranchIds: [String]) async throws {
        guard let idx = orderedSiblingBranchIds.firstIndex(of: branchId) else { return }
        if orderedSiblingBranchIds.count <= 1 { return }

        if idx == 0 {
            let rest = orderedSiblingBranchIds.filter { $0 != branchId }
            guard let before = rest.first else { return }
            try await putEmpty("/api/branches/\(branchId)/move-before/\(before)", csrf: true)
        } else {
            let after = orderedSiblingBranchIds[idx - 1]
            if after == branchId { return }
            try await putEmpty("/api/branches/\(branchId)/move-after/\(after)", csrf: true)
        }
    }

    func createBranch(_ request: CreateBranchRequest) async throws -> BranchResponse {
        _ = request
        throw APIError.unknown("createBranch is not exposed on the native API; use createNote instead.")
    }

    func updateBranch(_ branchId: String, request: UpdateBranchRequest) async throws -> BranchResponse {
        if let prefix = request.prefix {
            struct Body: Encodable { let prefix: String? }
            try await putJSONVoid("/api/branches/\(branchId)/set-prefix", body: Body(prefix: prefix), csrf: true)
        }
        if let exp = request.isExpanded {
            let v = exp ? 1 : 0
            try await putEmpty("/api/branches/\(branchId)/expanded/\(v)", csrf: true)
        }
        if request.notePosition != nil {
            throw APIError.unknown("Use placeBranchInSiblingOrder for reordering.")
        }
        return BranchResponse(
            branchId: branchId,
            noteId: "",
            parentNoteId: "",
            prefix: request.prefix,
            notePosition: 0,
            isExpanded: request.isExpanded ?? false,
            utcDateModified: nil
        )
    }

    func deleteBranch(_ branchId: String) async throws {
        try await delete("/api/branches/\(branchId)", queryParams: nil, csrf: true)
    }

    func deleteBranchWithNoProgressTask(_ branchId: String) async throws {
        try await delete(
            "/api/branches/\(branchId)",
            queryParams: ["taskId": "no-progress-reporting", "last": "true"],
            csrf: true
        )
    }

    func cloneNoteToParentNote(_ noteId: String, parentNoteId: String) async throws {
        struct Body: Encodable { var prefix: String? = nil }
        try await putJSONVoid(
            "/api/notes/\(noteId)/clone-to-note/\(parentNoteId)",
            body: Body(),
            csrf: true
        )
    }

    func branchId(fromParentNoteId parentNoteId: String, toChildNoteId childNoteId: String) async throws -> String? {
        let tree: TreeLoadResponse = try await postJSON(
            "/api/tree/load",
            body: TreeLoadRequest(noteIds: [childNoteId]),
            csrf: true
        )
        return tree.branches.first { row in
            row.noteId == childNoteId
                && row.parentNoteId == parentNoteId
                && row.isDeleted != true
        }?.branchId
    }

    func moveBranchToParent(branchId: String, parentBranchId: String) async throws {
        let request = try buildRequest(
            path: "/api/branches/\(branchId)/move-to/\(parentBranchId)",
            method: "PUT",
            queryParams: nil,
            csrf: true,
            jsonBody: false
        )
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        // Trilium returns HTTP 200 with `{ success: false, message }` when validation fails (e.g. cycle, duplicate placement).
        struct BranchMoveBody: Decodable {
            let success: Bool?
            let message: String?
        }
        guard !data.isEmpty, let body = try? decoder.decode(BranchMoveBody.self, from: data) else { return }
        if body.success == false {
            throw APIError.serverError(statusCode: 200, message: body.message)
        }
    }

    // MARK: - Attributes

    func getAttribute(_ attributeId: String) async throws -> AttributeResponse {
        _ = attributeId
        throw APIError.notFound("Single-attribute GET is not available on /api; use note attributes list.")
    }

    func createAttribute(_ request: CreateAttributeRequest) async throws {
        // Trilium expects `noteId` only in the URL; including it in the JSON body can confuse the server
        // or produce a response shape we do not decode. Success is confirmed via a follow-up `getNote`.
        struct Body: Encodable {
            let type: String
            let name: String
            let value: String
            let isInheritable: Bool?
            let position: Int?
        }
        let body = Body(
            type: request.type,
            name: request.name,
            value: request.value,
            isInheritable: request.isInheritable,
            position: request.position
        )
        var req = try buildRequest(
            path: "/api/notes/\(request.noteId)/attributes",
            method: "POST",
            queryParams: nil,
            csrf: true,
            jsonBody: true
        )
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try encoder.encode(body)
        let (data, response) = try await session.data(for: req)
        try validateResponse(response, data: data)
        let trimmed = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        guard !trimmed.isEmpty, trimmed != "{}" else { return }
        if Self.tryDecodeAttributeResponse(data) == nil {
            Log.api.debug("createAttribute: non-empty response not decoded as AttributeResponse (refresh will load attributes); bytes=\(data.count)")
        }
    }

    /// Best-effort decode for logging / future use; Trilium variants may use snake_case or a wrapper key.
    private static func tryDecodeAttributeResponse(_ data: Data) -> AttributeResponse? {
        if let r = try? JSONDecoder().decode(AttributeResponse.self, from: data) { return r }
        let snake = JSONDecoder()
        snake.keyDecodingStrategy = .convertFromSnakeCase
        if let r = try? snake.decode(AttributeResponse.self, from: data) { return r }
        struct Wrapped: Decodable {
            let attribute: AttributeResponse?
            let row: AttributeResponse?
        }
        if let w = try? snake.decode(Wrapped.self, from: data) {
            return w.attribute ?? w.row
        }
        return nil
    }

    func deleteAttribute(noteId: String, attributeId: String) async throws {
        try await delete("/api/notes/\(noteId)/attributes/\(attributeId)", queryParams: nil, csrf: true)
    }

    // MARK: - Attachments

    func getNoteAttachments(_ noteId: String) async throws -> [AttachmentResponse] {
        try await get("/api/notes/\(noteId)/attachments", csrf: false)
    }

    func getAttachment(_ attachmentId: String) async throws -> AttachmentResponse {
        try await get("/api/attachments/\(attachmentId)", csrf: false)
    }

    func getAttachmentContent(_ attachmentId: String) async throws -> Data {
        var req = try buildRequest(path: "/api/attachments/\(attachmentId)/open", method: "GET", queryParams: nil, csrf: false, jsonBody: false)
        req.cachePolicy = .reloadIgnoringLocalCacheData
        let (data, response) = try await session.data(for: req)
        try validateResponse(response, data: data)
        return data
    }

    func uploadAttachmentContent(_ attachmentId: String, data: Data, contentType: String) async throws {
        guard let csrf = csrfToken else { throw APIError.noToken }
        let boundary = "Boundary-\(UUID().uuidString)"
        var body = Data()
        func append(_ s: String) { body.append(Data(s.utf8)) }

        append("--\(boundary)\r\n")
        append("Content-Disposition: form-data; name=\"upload\"; filename=\"upload.bin\"\r\n")
        append("Content-Type: \(contentType)\r\n\r\n")
        body.append(data)
        append("\r\n--\(boundary)--\r\n")

        let url = try Self.makeURL(baseURL: baseURL, path: "/api/attachments/\(attachmentId)/file", queryParams: nil)
        var req = URLRequest(url: url)
        req.httpMethod = "PUT"
        req.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        req.setValue(csrf, forHTTPHeaderField: TriliumHTTP.csrfHeader)
        req.httpBody = body

        let (respData, response) = try await session.data(for: req)
        try validateResponse(response, data: respData)
    }

    func createAttachment(_ request: CreateAttachmentRequest) async throws -> AttachmentResponse {
        struct Body: Encodable {
            let role: String
            let mime: String
            let title: String
            let content: String
            let position: Int?
        }
        let body = Body(
            role: request.role,
            mime: request.mime,
            title: request.title,
            content: request.content,
            position: request.position
        )
        return try await postJSON("/api/notes/\(request.ownerId)/attachments", body: body, csrf: true)
    }

    func deleteAttachment(_ attachmentId: String) async throws {
        try await delete("/api/attachments/\(attachmentId)", queryParams: nil, csrf: true)
    }

    // MARK: - Request helpers

    private func get<T: Decodable>(_ path: String, queryParams: [String: String]? = nil, csrf: Bool) async throws -> T {
        let request = try buildRequest(path: path, method: "GET", queryParams: queryParams, csrf: csrf, jsonBody: false)
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        do {
            return try decoder.decode(T.self, from: data)
        } catch {
            Log.api.error("Decoding failed for \(path): \(error)")
            throw APIError.decodingFailed(error.localizedDescription)
        }
    }

    private func getRaw(_ path: String, queryParams: [String: String]?, csrf: Bool) async throws -> Data {
        let request = try buildRequest(path: path, method: "GET", queryParams: queryParams, csrf: csrf, jsonBody: false)
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        return data
    }

    private func postJSON<B: Encodable, T: Decodable>(_ path: String, queryParams: [String: String]? = nil, body: B, csrf: Bool) async throws -> T {
        var request = try buildRequest(path: path, method: "POST", queryParams: queryParams, csrf: csrf, jsonBody: true)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try encoder.encode(body)
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        return try decoder.decode(T.self, from: data)
    }

    private func putJSONVoid<B: Encodable>(_ path: String, body: B, csrf: Bool) async throws {
        var request = try buildRequest(path: path, method: "PUT", queryParams: nil, csrf: csrf, jsonBody: true)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try encoder.encode(body)
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        _ = data
    }

    private func putJSON<B: Encodable, T: Decodable>(_ path: String, body: B, csrf: Bool) async throws -> T {
        var request = try buildRequest(path: path, method: "PUT", queryParams: nil, csrf: csrf, jsonBody: true)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try encoder.encode(body)
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        return try decoder.decode(T.self, from: data)
    }

    private func putEmpty(_ path: String, csrf: Bool) async throws {
        let request = try buildRequest(path: path, method: "PUT", queryParams: nil, csrf: csrf, jsonBody: false)
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
    }

    private func postWithoutBody(path: String, method: String, csrf: Bool) async throws {
        let request = try buildRequest(path: path, method: method, queryParams: nil, csrf: csrf, jsonBody: false)
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
    }

    private func delete(_ path: String, queryParams: [String: String]?, csrf: Bool) async throws {
        let request = try buildRequest(path: path, method: "DELETE", queryParams: queryParams, csrf: csrf, jsonBody: false)
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
    }

    private func buildRequest(
        path: String,
        method: String,
        queryParams: [String: String]?,
        csrf: Bool,
        jsonBody: Bool
    ) throws -> URLRequest {
        let url = try Self.makeURL(baseURL: baseURL, path: path, queryParams: queryParams)
        var request = URLRequest(url: url)
        request.httpMethod = method
        if jsonBody || method != "GET" {
            request.setValue("application/json", forHTTPHeaderField: "Accept")
        } else {
            request.setValue("application/json, text/html;q=0.8,*/*;q=0.5", forHTTPHeaderField: "Accept")
        }

        if csrf {
            guard let csrfToken else { throw APIError.noToken }
            request.setValue(csrfToken, forHTTPHeaderField: TriliumHTTP.csrfHeader)
        }

        return request
    }

    private static func makeURL(baseURL: URL, path: String, queryParams: [String: String]?) throws -> URL {
        guard var components = URLComponents(url: baseURL, resolvingAgainstBaseURL: false) else { throw APIError.invalidURL }
        let appendPath = path.hasPrefix("/") ? String(path.dropFirst()) : path
        var basePath = components.path
        if basePath.isEmpty { basePath = "/" }
        if basePath.hasSuffix("/") {
            components.path = (basePath + appendPath).replacingOccurrences(of: "//", with: "/")
        } else {
            components.path = (basePath + "/" + appendPath).replacingOccurrences(of: "//", with: "/")
        }
        if let queryParams, !queryParams.isEmpty {
            components.queryItems = queryParams.map { URLQueryItem(name: $0.key, value: $0.value) }
        }
        guard let url = components.url else { throw APIError.invalidURL }
        return url
    }

    private func validateResponse(_ response: URLResponse, data: Data) throws {
        guard let http = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }
        switch http.statusCode {
        case 200...299:
            return
        case 401:
            isSessionValid = false
            throw APIError.unauthorized
        case 404:
            let message = extractErrorMessage(from: data) ?? http.url?.path ?? "resource"
            throw APIError.notFound(message)
        default:
            let message = extractErrorMessage(from: data)
            throw APIError.serverError(statusCode: http.statusCode, message: message)
        }
    }

    private func extractErrorMessage(from data: Data) -> String? {
        struct ErrorBody: Decodable {
            let message: String?
            let code: String?
        }
        guard let body = try? decoder.decode(ErrorBody.self, from: data) else { return nil }
        if let message = body.message { return message }
        return body.code
    }

    private static func buildNoteResponse(detail: NativeNoteDetailRow, tree: TreeLoadResponse, noteId: String) -> NoteResponse {
        let parentBranches = tree.branches.filter { $0.noteId == noteId }
        let parentNoteIds = Array(Set(parentBranches.map(\.parentNoteId)))
        let parentBranchIds = parentBranches.map(\.branchId)

        let childBranches = tree.branches.filter { $0.parentNoteId == noteId }.sorted { $0.notePosition < $1.notePosition }
        let childBranchIds = childBranches.map(\.branchId)
        let childNoteIds = childBranches.map(\.noteId)

        let attrs = tree.attributes.filter { $0.noteId == noteId }.sorted { $0.position < $1.position }
        let attrResponses = attrs.map {
            AttributeResponse(
                attributeId: $0.attributeId,
                noteId: $0.noteId,
                type: $0.type,
                name: $0.name,
                value: $0.value,
                position: $0.position,
                isInheritable: $0.isInheritable,
                utcDateModified: nil
            )
        }

        // Filter out child branches whose note is marked isDeleted in the
        // tree/load payload (when present — often child notes are omitted from notes[]).
        let deletedNoteIds: Set<String> = {
            var ids = Set<String>()
            for n in tree.notes where n.isDeleted == true {
                ids.insert(n.noteId)
            }
            return ids
        }()
        let liveChildBranches = childBranches.filter { branch in
            if branch.isDeleted == true { return false }
            return !deletedNoteIds.contains(branch.noteId)
        }
        let liveChildBranchIds = liveChildBranches.map(\.branchId)
        let liveChildNoteIds = liveChildBranches.map(\.noteId)

        return NoteResponse(
            noteId: detail.noteId,
            isProtected: detail.isProtected,
            title: detail.title ?? "",
            type: detail.type,
            mime: detail.mime,
            blobId: detail.blobId,
            isDeleted: detail.isDeleted ?? false,
            dateCreated: detail.dateCreated ?? "",
            dateModified: detail.dateModified ?? "",
            utcDateCreated: detail.utcDateCreated ?? "",
            utcDateModified: detail.utcDateModified ?? "",
            parentNoteIds: parentNoteIds,
            childNoteIds: liveChildNoteIds,
            parentBranchIds: parentBranchIds,
            childBranchIds: liveChildBranchIds,
            attributes: attrResponses
        )
    }
}

/// iOS often collapses multiple `Set-Cookie` lines in `allHeaderFields`; this API still extracts cookies for the jar.
fileprivate enum TriliumCookieResponseParser {
    static func storeCookies(from response: HTTPURLResponse, in jar: HTTPCookieStorage) {
        guard let url = response.url else { return }
        var headerDict: [String: String] = [:]
        headerDict.reserveCapacity(response.allHeaderFields.count)
        for (k, v) in response.allHeaderFields {
            guard let key = k as? String, let value = v as? String else { continue }
            headerDict[key] = value
        }
        let parsed = HTTPCookie.cookies(withResponseHeaderFields: headerDict, for: url)
        let normalized = normalizeCookiesForSharedJar(parsed, requestURL: url)

        // Prefer batch API (matches “response for this URL”); also set individually for older stacks.
        jar.setCookies(normalized, for: url, mainDocumentURL: url)
        for c in normalized {
            jar.setCookie(c)
        }
    }

    /// Parsed cookies often use a `Path` scoped to `/login` (or odd `Domain`); `HTTPCookieStorage.cookies(for: https://host/)` then returns **zero**, so `GET /` sends no session.
    private static func normalizeCookiesForSharedJar(_ parsed: [HTTPCookie], requestURL: URL) -> [HTTPCookie] {
        guard let host = requestURL.host?.lowercased() else { return parsed }
        let https = requestURL.scheme?.lowercased() == "https"

        return parsed.compactMap { original in
            var props: [HTTPCookiePropertyKey: Any] = [
                .name: original.name,
                .value: original.value,
                .domain: host,
                .path: "/"
            ]
            if https {
                props[.secure] = "TRUE"
            }
            if let orig = original.properties {
                if let expires = orig[.expires] {
                    props[.expires] = expires
                }
                if let maxAge = orig[.maximumAge] {
                    props[.maximumAge] = maxAge
                }
                if let version = orig[.version] {
                    props[.version] = version
                }
                let sameSite = HTTPCookiePropertyKey("SameSite")
                if let ss = orig[sameSite] {
                    props[sameSite] = ss
                }
            }
            return HTTPCookie(properties: props) ?? original
        }
    }
}

/// Stops after the first 3xx. Also re-applies `Set-Cookie` parsing here — some stacks mishandle cookies when canceling redirects.
private final class TriliumStopRedirectDelegate: NSObject, URLSessionTaskDelegate {
    private let cookieStorage: HTTPCookieStorage

    init(cookieStorage: HTTPCookieStorage) {
        self.cookieStorage = cookieStorage
        super.init()
    }

    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        willPerformHTTPRedirection response: HTTPURLResponse,
        newRequest request: URLRequest,
        completionHandler: @escaping (URLRequest?) -> Void
    ) {
        TriliumCookieResponseParser.storeCookies(from: response, in: cookieStorage)
        completionHandler(nil)
    }
}

// MARK: - Small Encodable helpers

private struct TreeLoadRequest: Encodable {
    let noteIds: [String]
}

private struct CreateNoteNativeResponse: Decodable {
    struct NB: Decodable {
        let noteId: String
    }

    struct BR: Decodable {
        let branchId: String
        let noteId: String
        let parentNoteId: String
        let prefix: String?
        let notePosition: Int
        let isExpanded: Bool?
        let utcDateModified: String?
    }

    let note: NB
    let branch: BR
}
