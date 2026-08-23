import Foundation
import UIKit

// MARK: - Protocol

protocol TriliumClientProtocol: Actor, Sendable {
    var baseURL: URL { get }
    /// Whether the client has established a Trilium session (validated or just logged in).
    var isSessionValid: Bool { get }

    func login(password: String, rememberMe: Bool, totpToken: String?) async throws
    /// Validates cookies against `/api/app-info` and acquires CSRF token.
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
    /// Same HTTP as `getNote`, but also returns child `BranchResponse`s from the shared `tree/load` payload (avoids N extra `tree/load` calls per parent).
    func getNoteWithBranches(_ noteId: String) async throws -> (NoteResponse, [BranchResponse])
    /// Batched `POST /api/tree/load` for full-sync BFS (multiple note IDs per request).
    func batchTreeLoad(noteIds: [String]) async throws -> TreeLoadResponse
    /// One batched `tree/load` plus parallel `GET /api/notes/:id` for each id, merged in request order.
    func fullSyncFetchTreeBatch(noteIds: [String]) async throws -> [FullSyncTreeBatchEntry]
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
    func uploadNoteAttachment(noteId: String, data: Data, filename: String, contentType: String) async throws -> String
    func createAttachment(_ request: CreateAttachmentRequest) async throws -> AttachmentResponse
    func renameAttachment(attachmentId: String, title: String) async throws
    func deleteAttachment(_ attachmentId: String) async throws
    /// `POST /api/attachments/{id}/convert-to-note` — attachment becomes a child note of its owner.
    func convertAttachmentToNote(attachmentId: String) async throws -> ConvertAttachmentToNoteResponse
    /// `GET /api/ocr/attachments/{id}/text` — Trilium 0.103+. 404 means OCR is unavailable.
    func getAttachmentOCRText(attachmentId: String) async throws -> AttachmentOCRTextResponse
    /// `POST /api/ocr/process-attachment/{id}` — Trilium 0.103+. 404 means OCR is unavailable.
    func processAttachmentOCR(attachmentId: String, forceReprocess: Bool) async throws -> ProcessAttachmentOCRResponse

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
        export(cookies: storage.cookies(for: url) ?? [], for: url)
    }

    static func export(cookies: [HTTPCookie], for url: URL) -> Data? {
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

    /// Used when `GET /api/notes/:id` fails but `tree/load` still returned a note row.
    init(
        noteId: String,
        title: String?,
        isProtected: Bool,
        type: String,
        mime: String,
        blobId: String?,
        isDeleted: Bool?,
        dateCreated: String?,
        dateModified: String?,
        utcDateCreated: String?,
        utcDateModified: String?
    ) {
        self.noteId = noteId
        self.title = title
        self.isProtected = isProtected
        self.type = type
        self.mime = mime
        self.blobId = blobId
        self.isDeleted = isDeleted
        self.dateCreated = dateCreated
        self.dateModified = dateModified
        self.utcDateCreated = utcDateCreated
        self.utcDateModified = utcDateModified
    }
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
    private let accessHeaders: [String: String]?
    nonisolated let cloudflareAccessCredentials: CloudflareAccessCredentials?
    private let injectedProtocolClasses: [AnyClass]?
    private let urlSessionDelegate: SameHostRedirectDelegate

    /// - Parameter urlSessionConfiguration: Optional config (e.g. tests with `URLProtocol`). Always wired to this client’s `httpCookieStorage`.
    init(
        baseURL: URL,
        persistedCookieData: Data? = nil,
        cloudflareAccessCredentials: CloudflareAccessCredentials? = nil,
        urlSessionConfiguration: URLSessionConfiguration? = nil
    ) {
        self.baseURL = baseURL
        if let cloudflareAccessCredentials, cloudflareAccessCredentials.isComplete {
            self.cloudflareAccessCredentials = cloudflareAccessCredentials
            self.accessHeaders = cloudflareAccessCredentials.httpHeaders
        } else {
            self.cloudflareAccessCredentials = nil
            self.accessHeaders = nil
        }

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

        self.injectedProtocolClasses = urlSessionConfiguration?.protocolClasses
        let delegate = SameHostRedirectDelegate(allowedHost: baseURL.host?.lowercased() ?? "")
        self.urlSessionDelegate = delegate
        self.session = URLSession(configuration: config, delegate: delegate, delegateQueue: nil)
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

    func login(password: String, rememberMe: Bool, totpToken: String? = nil) async throws {
        csrfToken = nil
        isSessionValid = false

        var body = "password=\(Self.applicationFormEncode(password))"
        if rememberMe {
            body += "&rememberMe=1"
        }
        if let totpToken, !totpToken.isEmpty {
            body += "&totpToken=\(Self.applicationFormEncode(totpToken))"
        }

        let loginURL = baseURL.appendingPathComponent("login")
        var req = URLRequest(url: loginURL)
        req.httpMethod = "POST"
        req.setValue("application/x-www-form-urlencoded; charset=utf-8", forHTTPHeaderField: "Content-Type")
        applyAccessHeaders(to: &req)
        req.httpBody = Data(body.utf8)

        let (redirectStopData, redirectStopHTTP, loginSession) = try await postLoginStoppingAtRedirect(request: req)
        defer { loginSession.finishTasksAndInvalidate() }

        TriliumCookieResponseParser.storeCookies(from: redirectStopHTTP, in: httpCookieStorage)
        manuallyStoreCsrfCookie(from: redirectStopHTTP)
        stripSameSiteFromCookies()

        if redirectStopHTTP.statusCode == 401 {
            let submittedTotp = totpToken.map { !$0.isEmpty } ?? false
            let totpError = Self.detectLoginFailure(from: redirectStopData, submittedTotpToken: submittedTotp)
            switch totpError {
            case .required: throw APIError.totpRequired
            case .invalid:  throw APIError.totpInvalid
            case .none:     throw APIError.unauthorized
            }
        }

        var shellData = redirectStopData
        var shellHTTP = redirectStopHTTP
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
            applyAccessHeaders(to: &getReq)
            let (d, r) = try await session.data(for: getReq)
            guard let h = r as? HTTPURLResponse else { throw APIError.invalidResponse }
            TriliumCookieResponseParser.storeCookies(from: h, in: httpCookieStorage)
            manuallyStoreCsrfCookie(from: h)
            stripSameSiteFromCookies()
            if h.statusCode == 401 { throw APIError.unauthorized }
            guard (200...399).contains(h.statusCode) else {
                throw APIError.serverError(statusCode: h.statusCode, message: String(data: d, encoding: .utf8))
            }
            shellData = d
            shellHTTP = h
        } else if !(200...399).contains(redirectStopHTTP.statusCode) {
            throw APIError.serverError(statusCode: redirectStopHTTP.statusCode, message: String(data: redirectStopData, encoding: .utf8))
        }

        // v0.102+: the redirect target is a Vite SPA with no embedded CSRF.
        // Try /bootstrap first (JSON with csrfToken), then fall back to HTML parsing.
        if await fetchCsrfFromBootstrap() {
            Log.auth.info("login: acquired CSRF from /bootstrap")
        } else {
            // v0.101 and earlier: CSRF is in the redirect HTML (window.glob)
            let shellHTML = String(data: shellData, encoding: .utf8)
            if let token = shellHTML.flatMap({ Self.extractCsrfToken(from: $0) }), !token.isEmpty {
                csrfToken = token
                Log.auth.info("login: extracted CSRF from redirect HTML")
            } else if let token = Self.extractCsrfFromSetCookieHeader(shellHTTP), !token.isEmpty {
                csrfToken = token
                Log.auth.info("login: extracted CSRF from Set-Cookie header")
            } else if let token = extractCsrfTokenFromCookie(), !token.isEmpty {
                csrfToken = token
                Log.auth.info("login: extracted CSRF from _csrf cookie jar")
            } else {
                Log.auth.warning("login: no CSRF token found after all attempts")
            }
        }

        lastFetchedAppInfo = try await getAppInfo()

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
        cfg.waitsForConnectivity = injectedProtocolClasses == nil
        if let injectedProtocolClasses {
            cfg.protocolClasses = injectedProtocolClasses
        }

        let delegate = TriliumStopRedirectDelegate(cookieStorage: httpCookieStorage)
        let loginSession = URLSession(configuration: cfg, delegate: delegate, delegateQueue: nil)

        let (data, response) = try await loginSession.data(for: request)
        guard let http = response as? HTTPURLResponse else { throw APIError.invalidResponse }
        return (data, http, loginSession)
    }

    // MARK: - TOTP detection from login 401 response

    enum TotpDetectionResult { case required, invalid, none }

    /// Classifies a failed `POST /login` 401 body.
    ///
    /// - Trilium **v0.104+** returns JSON `{ "success": false, "factor": "password"|"totp" }`.
    /// - Older servers (≤ v0.103) return the rendered login HTML with `wrongTotp` / `totpEnabled`.
    private nonisolated static func detectLoginFailure(from data: Data, submittedTotpToken: Bool) -> TotpDetectionResult {
        if let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
           let factor = json["factor"] as? String {
            switch factor.lowercased() {
            case "totp":
                return submittedTotpToken ? .invalid : .required
            case "password":
                return .none
            default:
                break
            }
        }

        let html = String(data: data, encoding: .utf8) ?? ""
        return detectTotpFromLoginResponse(html: html)
    }

    /// Inspects the 401 HTML returned by POST /login for TOTP indicators (≤ v0.103).
    /// Trilium renders wrongTotp and totpEnabled variables into the login template.
    private nonisolated static func detectTotpFromLoginResponse(html: String) -> TotpDetectionResult {
        let lower = html.lowercased()
        let totpEnabled = lower.contains("totpenabled")
            || lower.contains("totp-enabled")
            || lower.contains("name=\"totptoken\"")
            || lower.contains("name='totptoken'")
            || lower.contains("totptoken")

        guard totpEnabled else { return .none }

        let wrongTotp = lower.contains("wrongtotp")
            || lower.contains("wrong-totp")
            || lower.contains("totp verification failed")
            || lower.contains("wrong totp")

        return wrongTotp ? .invalid : .required
    }

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


    /// Last `/api/app-info` payload from the most recent successful `restoreSession()`.
    private(set) var lastFetchedAppInfo: AppInfoResponse?

    func restoreSession() async throws {
        try await refreshCsrf()
        lastFetchedAppInfo = try await getAppInfo()
        isSessionValid = true
    }

    func logout() async throws {
        defer {
            isSessionValid = false
            csrfToken = nil
            lastFetchedAppInfo = nil
            Self.clearCookies(in: httpCookieStorage, for: baseURL)
        }

        guard csrfToken != nil else { return }
        try await refreshCsrf()
        guard let csrfToken else { return }

        var req = URLRequest(url: baseURL.appendingPathComponent("logout"))
        req.httpMethod = "POST"
        req.setValue(csrfToken, forHTTPHeaderField: TriliumHTTP.csrfHeader)
        applyAccessHeaders(to: &req)
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
            try await refreshCsrf()
        }
        struct Body: Encodable { let password: String }
        let body = Body(password: password)
        let resp: ProtectedSessionLoginResponse = try await postJSON("/api/login/protected", body: body, csrf: true)
        if !resp.success {
            throw APIError.unknown(resp.message ?? "Incorrect document password.")
        }
    }

    func touchProtectedSession() async throws {
        if csrfToken == nil {
            try await refreshCsrf()
        }
        try await postWithoutBody(path: "/api/login/protected/touch", method: "POST", csrf: true)
    }

    func exitProtectedSession() async throws {
        if csrfToken == nil {
            try await refreshCsrf()
        }
        guard csrfToken != nil else { return }
        try await postWithoutBody(path: "/api/logout/protected", method: "POST", csrf: true)
    }

    // MARK: - CSRF token acquisition

    /// v0.102+ serves CSRF via `GET /bootstrap` (JSON with `csrfToken` field).
    /// The response also sets the `_csrf` cookie needed for double-submit.
    private func fetchCsrfFromBootstrap() async -> Bool {
        do {
            let url = try Self.makeURL(baseURL: baseURL, path: "/bootstrap", queryParams: nil)
            var req = URLRequest(url: url)
            req.httpMethod = "GET"
            req.setValue("application/json", forHTTPHeaderField: "Accept")
            req.cachePolicy = .reloadIgnoringLocalCacheData
            applyAccessHeaders(to: &req)
            let (data, response) = try await session.data(for: req)
            guard let http = response as? HTTPURLResponse else { return false }

            TriliumCookieResponseParser.storeCookies(from: http, in: httpCookieStorage)
            manuallyStoreCsrfCookie(from: http)
            stripSameSiteFromCookies()

            guard (200...299).contains(http.statusCode) else {
                Log.auth.debug("fetchCsrfFromBootstrap: status \(http.statusCode), not a v0.102+ server")
                return false
            }

            struct BootstrapResponse: Decodable { let csrfToken: String? }
            if let bootstrap = try? JSONDecoder().decode(BootstrapResponse.self, from: data),
               let token = bootstrap.csrfToken, !token.isEmpty {
                csrfToken = token
                Log.auth.info("fetchCsrfFromBootstrap: acquired CSRF token from /bootstrap JSON")
                return true
            }

            if let fromCookie = extractCsrfTokenFromCookie(), !fromCookie.isEmpty {
                csrfToken = fromCookie
                Log.auth.info("fetchCsrfFromBootstrap: acquired CSRF token from _csrf cookie (set by /bootstrap)")
                return true
            }

            Log.auth.debug("fetchCsrfFromBootstrap: /bootstrap returned 200 but no csrfToken found")
            return false
        } catch {
            Log.auth.debug("fetchCsrfFromBootstrap: failed (\(error.localizedDescription))")
            return false
        }
    }

    /// v0.101 and earlier: `GET /` returns server-rendered HTML with `window.glob = { csrfToken: '...' }`.
    private func fetchCsrfFromAppShellHTML() async throws {
        let (html, httpResponse) = try await fetchAppShellHTML()

        if let token = Self.extractCsrfToken(from: html), !token.isEmpty {
            csrfToken = token
            Log.auth.info("refreshCsrf: extracted token from HTML")
            return
        }

        if let token = Self.extractCsrfFromSetCookieHeader(httpResponse), !token.isEmpty {
            csrfToken = token
            Log.auth.info("refreshCsrf: extracted token from Set-Cookie header")
            return
        }

        if let token = extractCsrfTokenFromCookie(), !token.isEmpty {
            csrfToken = token
            Log.auth.info("refreshCsrf: extracted token from _csrf cookie jar")
            return
        }

        let looksLikeLoginPage = html.localizedCaseInsensitiveContains("login-page")
            || html.localizedCaseInsensitiveContains("Trilium Login")
            || html.localizedCaseInsensitiveContains("login-form")

        if looksLikeLoginPage {
            throw APIError.decodingFailed(
                "The server still shows the login page \u{2014} the session cookie may not be sticking after sign-in. Confirm the password in Safari."
            )
        }

        Log.auth.warning("refreshCsrf: no CSRF token found in HTML or cookies")
    }

    /// Tries `/bootstrap` (v0.102+) then falls back to HTML parsing (v0.101 and earlier).
    private func refreshCsrf() async throws {
        if await fetchCsrfFromBootstrap() { return }
        try await fetchCsrfFromAppShellHTML()
    }

    /// `csrf-csrf` v3 stores the cookie as `token|hash` (delimiter `|`).
    /// The `x-csrf-token` header must send only the `token` part (before `|`).
    /// This works even when the HTML is a Vite SPA shell with no embedded token.
    private func extractCsrfTokenFromCookie() -> String? {
        guard let host = baseURL.host?.lowercased() else { return nil }
        for c in httpCookieStorage.cookies ?? [] {
            guard Self.cookieDomainMatchesHost(c.domain, host: host) else { continue }
            let name = c.name.lowercased()
            guard name == "_csrf" || name == "csrf-token" || name == "trilium-csrf" else { continue }
            let raw = c.value.removingPercentEncoding ?? c.value
            guard let pipeIdx = raw.firstIndex(of: "|") else {
                let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty { return trimmed }
                continue
            }
            let token = String(raw[raw.startIndex..<pipeIdx]).trimmingCharacters(in: .whitespacesAndNewlines)
            if !token.isEmpty { return token }
        }
        return nil
    }

    /// iOS collapses multiple `Set-Cookie` headers into one comma-separated string inside
    /// `allHeaderFields`.  When `trilium.sid` has an `Expires` date containing commas,
    /// `HTTPCookie.cookies(withResponseHeaderFields:for:)` misparses the combined string
    /// and silently drops the `_csrf` cookie.  This method extracts the token directly.
    private nonisolated static func extractCsrfFromSetCookieHeader(_ response: HTTPURLResponse) -> String? {
        var rawSetCookie: String?
        for (key, value) in response.allHeaderFields {
            if let k = key as? String, k.lowercased() == "set-cookie", let v = value as? String {
                rawSetCookie = v
                break
            }
        }
        guard let raw = rawSetCookie,
              let nameRange = raw.range(of: "_csrf=", options: .caseInsensitive) else { return nil }

        let afterEquals = raw[nameRange.upperBound...]
        let valueEnd = afterEquals.firstIndex(of: ";") ?? afterEquals.endIndex
        let decoded = String(afterEquals[afterEquals.startIndex..<valueEnd])
            .removingPercentEncoding ?? String(afterEquals[afterEquals.startIndex..<valueEnd])

        if let pipe = decoded.firstIndex(of: "|") {
            let token = String(decoded[decoded.startIndex..<pipe]).trimmingCharacters(in: .whitespacesAndNewlines)
            return token.isEmpty ? nil : token
        }
        let trimmed = decoded.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }

    private func manuallyStoreCsrfCookie(from response: HTTPURLResponse) {
        TriliumCookieResponseParser.manuallyStoreCsrfCookie(from: response, in: httpCookieStorage)
    }

    /// Strips `SameSite` from all cookies for this host.
    /// TriliumNext sets `SameSite=Strict` on the `_csrf` cookie; iOS may refuse to send
    /// strict-SameSite cookies on cross-origin requests from a native app, which breaks
    /// the double-submit CSRF validation on POST/PUT/DELETE API calls.
    private func stripSameSiteFromCookies() {
        guard let host = baseURL.host?.lowercased() else { return }
        for cookie in httpCookieStorage.cookies ?? [] {
            guard Self.cookieDomainMatchesHost(cookie.domain, host: host) else { continue }
            guard cookie.sameSitePolicy != nil, var props = cookie.properties else { continue }
            props.removeValue(forKey: .sameSitePolicy)
            httpCookieStorage.deleteCookie(cookie)
            if let cleaned = HTTPCookie(properties: props) {
                httpCookieStorage.setCookie(cleaned)
            }
        }
    }

    /// Whether `cookie.domain` (with optional leading `.`) matches request `host`.
    private nonisolated static func cookieDomainMatchesHost(_ cookieDomain: String, host: String) -> Bool {
        let d = cookieDomain.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let h = host.lowercased()
        if d.isEmpty { return false }
        if d.hasPrefix(".") {
            let suffix = String(d.dropFirst())
            return h == suffix || h.hasSuffix("." + suffix)
        }
        return h == d
    }

    /// Fetches `GET /` for v0.101 and earlier (server-rendered HTML with `window.glob`).
    private func fetchAppShellHTML() async throws -> (String, HTTPURLResponse) {
        var req = URLRequest(url: baseURL)
        req.httpMethod = "GET"
        req.cachePolicy = .reloadIgnoringLocalCacheData
        req.setValue("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", forHTTPHeaderField: "Accept")
        req.setValue("no-cache", forHTTPHeaderField: "Cache-Control")
        req.setValue(
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
            forHTTPHeaderField: "User-Agent"
        )

        applyAccessHeaders(to: &req)

        let (data, response) = try await session.data(for: req)
        guard let http = response as? HTTPURLResponse else { throw APIError.invalidResponse }

        TriliumCookieResponseParser.storeCookies(from: http, in: httpCookieStorage)
        manuallyStoreCsrfCookie(from: http)
        stripSameSiteFromCookies()

        guard (200...399).contains(http.statusCode) else {
            if http.statusCode == 401 { throw APIError.unauthorized }
            throw APIError.serverError(statusCode: http.statusCode, message: nil)
        }
        if let html = String(data: data, encoding: .utf8) { return (html, http) }
        if let html = String(data: data, encoding: .isoLatin1) { return (html, http) }
        throw APIError.decodingFailed("HTML encoding")
    }

    /// v0.101 and earlier: extracts CSRF token from `window.glob = { csrfToken: '...' }` in HTML.
    private static func extractCsrfToken(from html: String) -> String? {
        let patterns: [String] = [
            #"csrfToken:\s*'([^']+)'"#,
            #"csrfToken:\s*"([^"]+)""#,
            #"window\.glob\s*=\s*\{.{0,4000}?csrfToken\s*:\s*'([^']+)'"#,
            #"window\.glob\s*=\s*\{.{0,4000}?csrfToken\s*:\s*"([^"]+)""#,
            #""csrfToken"\s*:\s*"([^"]+)""#,
            #"'csrfToken'\s*:\s*'([^']+)'"#,
            #"<meta\s+name=["']csrf-token["']\s+content=["']([^"']+)["']"#
        ]
        let regexOpts: NSRegularExpression.Options = [.caseInsensitive, .dotMatchesLineSeparators]
        for pattern in patterns {
            guard let regex = try? NSRegularExpression(pattern: pattern, options: regexOpts) else { continue }
            let range = NSRange(html.startIndex..., in: html)
            guard let match = regex.firstMatch(in: html, options: [], range: range),
                  match.numberOfRanges > 1,
                  let tokenRange = Range(match.range(at: 1), in: html)
            else { continue }
            let token = String(html[tokenRange]).trimmingCharacters(in: .whitespacesAndNewlines)
            if !token.isEmpty { return token }
        }

        // Manual string search fallback when regex fails on unusual encodings
        if let token = manualCsrfSearch(in: html) {
            return token
        }
        return nil
    }

    /// Brute-force search for `csrfToken` followed by a quoted value.
    private static func manualCsrfSearch(in html: String) -> String? {
        guard let keyRange = html.range(of: "csrfToken", options: .caseInsensitive) else { return nil }
        let after = html[keyRange.upperBound...]
        for quote: Character in ["'", "\""] {
            guard let openIdx = after.firstIndex(of: quote) else { continue }
            let valueStart = after.index(after: openIdx)
            guard valueStart < after.endIndex,
                  let closeIdx = after[valueStart...].firstIndex(of: quote)
            else { continue }
            let token = String(after[valueStart..<closeIdx]).trimmingCharacters(in: .whitespacesAndNewlines)
            if !token.isEmpty && token.count < 256 { return token }
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

    /// Blob content larger than this is stubbed out in `/api/sync/changed` responses
    /// (v0.104+ `maxBlobContentSize`). Trinote refreshes bodies via `/api/notes/:id/open`
    /// when a blob change arrives, so stubbing large payloads is safe. Older servers ignore
    /// the unknown query param.
    private static let syncPullMaxBlobContentSize = 65_536

    func syncPull(instanceId: String, lastEntityChangeId: Int64) async throws -> SyncPullResponse {
        let params: [String: String] = [
            "instanceId": instanceId,
            "lastEntityChangeId": String(lastEntityChangeId),
            "logMarkerId": String(UUID().uuidString.prefix(10)),
            "maxBlobContentSize": String(Self.syncPullMaxBlobContentSize)
        ]
        let data: Data = try await getRaw("/api/sync/changed", queryParams: params, csrf: false)
        return try SyncPullResponse.parseFromChanged(jsonData: data)
    }

    // MARK: - Notes

    func getNote(_ noteId: String) async throws -> NoteResponse {
        try await getNoteWithBranches(noteId).0
    }

    func getNoteWithBranches(_ noteId: String) async throws -> (NoteResponse, [BranchResponse]) {
        async let detailRow: NativeNoteDetailRow = try await get("/api/notes/\(noteId)", csrf: false)
        async let treeResponse: TreeLoadResponse = try await postJSON("/api/tree/load", body: TreeLoadRequest(noteIds: [noteId]), csrf: true)
        let detail = try await detailRow
        let tree = try await treeResponse
        let note = Self.buildNoteResponse(detail: detail, tree: tree, noteId: noteId)
        let branches = Self.liveChildBranchResponses(tree: tree, parentNoteId: noteId)
        return (note, branches)
    }

    func batchTreeLoad(noteIds: [String]) async throws -> TreeLoadResponse {
        try await postJSON("/api/tree/load", body: TreeLoadRequest(noteIds: noteIds), csrf: true)
    }

    func fullSyncFetchTreeBatch(noteIds: [String]) async throws -> [FullSyncTreeBatchEntry] {
        guard !noteIds.isEmpty else { return [] }
        let tree: TreeLoadResponse = try await postJSON("/api/tree/load", body: TreeLoadRequest(noteIds: noteIds), csrf: true)
        var rowsById: [String: TreeLoadNoteRow] = [:]
        rowsById.reserveCapacity(tree.notes.count)
        for n in tree.notes { rowsById[n.noteId] = n }
        let details = await fetchNativeNoteDetailsParallel(noteIds: noteIds, maxConcurrency: 8)
        var entries: [FullSyncTreeBatchEntry] = []
        entries.reserveCapacity(noteIds.count)
        for noteId in noteIds {
            let detail: NativeNoteDetailRow
            if let d = details[noteId] {
                detail = d
            } else if let row = rowsById[noteId] {
                detail = Self.nativeDetailFallback(from: row)
            } else {
                continue
            }
            if detail.isDeleted == true { continue }
            let note = Self.buildNoteResponse(detail: detail, tree: tree, noteId: noteId)
            let childBranches = Self.liveChildBranchResponses(tree: tree, parentNoteId: noteId)
            entries.append(FullSyncTreeBatchEntry(note: note, childBranches: childBranches))
        }
        return entries
    }

    /// Parallel `GET /api/notes/:id` for full sync; failures return no key (caller may fall back to `tree.notes`).
    private func fetchNativeNoteDetailsParallel(noteIds: [String], maxConcurrency: Int) async -> [String: NativeNoteDetailRow] {
        guard !noteIds.isEmpty else { return [:] }
        return await withTaskGroup(of: (String, NativeNoteDetailRow?).self) { group in
            var byId: [String: NativeNoteDetailRow] = [:]
            byId.reserveCapacity(noteIds.count)
            var index = 0
            let ids = noteIds
            let start = min(maxConcurrency, ids.count)
            for _ in 0..<start {
                let id = ids[index]
                index += 1
                group.addTask {
                    do {
                        let row: NativeNoteDetailRow = try await self.get("/api/notes/\(id)", csrf: false)
                        return (id, row)
                    } catch {
                        return (id, nil)
                    }
                }
            }
            for await pair in group {
                if let row = pair.1 { byId[pair.0] = row }
                if index < ids.count {
                    let id = ids[index]
                    index += 1
                    group.addTask {
                        do {
                            let row: NativeNoteDetailRow = try await self.get("/api/notes/\(id)", csrf: false)
                            return (id, row)
                        } catch {
                            return (id, nil)
                        }
                    }
                }
            }
            return byId
        }
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
            let templateNoteId: String?
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
            branchId: request.branchId,
            templateNoteId: request.templateNoteId
        )
        let path = "/api/notes/\(request.parentNoteId)/children"
        let q = ["target": "into"]
        let contentPreview: String
        if request.content.count <= 800 {
            contentPreview = request.content.replacingOccurrences(of: "\n", with: "\\n")
        } else {
            contentPreview = "<\(request.content.count) bytes, preview omitted>"
        }
        Log.noteDiag.info(
            """
            NoteDiag CREATE api POST /api/notes/\(request.parentNoteId)/children
              title=\(request.title) type=\(request.type) mime=\(request.mime ?? "nil") templateNoteId=\(request.templateNoteId ?? "nil")
              content.len=\(request.content.count) content.preview=\(contentPreview)
              notePosition=\(request.notePosition.map(String.init) ?? "nil") branchId=\(request.branchId ?? "nil") clientNoteId=\(request.noteId ?? "nil") protected=\(request.isProtected.map(String.init) ?? "nil")
            """
        )
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
            branchId: nil,
            templateNoteId: nil
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
        let entries = try await fullSyncFetchTreeBatch(noteIds: slice)
        return SearchResponse(results: entries.map(\.note), debugInfo: nil)
    }

    /// Returns template note IDs from Trilium's built-in endpoint used by desktop/web clients.
    /// Useful when title-based lookup is unreliable across versions/locales.
    func searchTemplateNoteIds() async throws -> [String] {
        try await get("/api/search-templates", csrf: true)
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
        try await uploadMultipartAttachment(
            path: "/api/attachments/\(attachmentId)/file",
            method: "PUT",
            data: data,
            filename: "upload.bin",
            contentType: contentType
        )
    }

    func uploadNoteAttachment(noteId: String, data: Data, filename: String, contentType: String) async throws -> String {
        let respData = try await uploadMultipartAttachment(
            path: "/api/notes/\(noteId)/attachments/upload",
            method: "POST",
            data: data,
            filename: filename,
            contentType: contentType
        )
        let result = try decoder.decode(UploadAttachmentResponse.self, from: respData)
        guard result.uploaded else {
            throw APIError.serverError(statusCode: 200, message: result.message ?? "Attachment upload failed.")
        }
        guard let attachmentId = TriliumAttachmentURLParser.attachmentId(fromUploadResultURL: result.url) else {
            throw APIError.unknown("Upload succeeded but attachment ID was missing from server response.")
        }
        return attachmentId
    }

    private func uploadMultipartAttachment(
        path: String,
        method: String,
        data: Data,
        filename: String,
        contentType: String
    ) async throws -> Data {
        let boundary = "Boundary-\(UUID().uuidString)"
        var body = Data()
        func append(_ s: String) { body.append(Data(s.utf8)) }

        let safeFilename = filename.replacingOccurrences(of: "\"", with: "_")
        append("--\(boundary)\r\n")
        append("Content-Disposition: form-data; name=\"upload\"; filename=\"\(safeFilename)\"\r\n")
        append("Content-Type: \(contentType)\r\n\r\n")
        body.append(data)
        append("\r\n--\(boundary)--\r\n")

        let url = try Self.makeURL(baseURL: baseURL, path: path, queryParams: nil)
        var req = URLRequest(url: url)
        req.httpMethod = method
        req.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        if let csrf = csrfToken {
            req.setValue(csrf, forHTTPHeaderField: TriliumHTTP.csrfHeader)
        }
        applyAccessHeaders(to: &req)
        req.httpBody = body

        let (respData, response) = try await session.data(for: req)
        try validateResponse(response, data: respData)
        return respData
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
        var req = try buildRequest(
            path: "/api/notes/\(request.ownerId)/attachments",
            method: "POST",
            queryParams: nil,
            csrf: true,
            jsonBody: true
        )
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try encoder.encode(body)
        let (data, response) = try await session.data(for: req)
        try validateResponse(response, data: data)

        // Trilium returns 204 No Content for saveAttachment — no JSON body to decode.
        if !data.isEmpty, let decoded = try? decoder.decode(AttachmentResponse.self, from: data) {
            return decoded
        }
        return try await resolveAttachmentAfterCreate(
            ownerId: request.ownerId,
            title: request.title,
            mime: request.mime
        )
    }

    private func resolveAttachmentAfterCreate(ownerId: String, title: String, mime: String) async throws -> AttachmentResponse {
        let attachments = try await getNoteAttachments(ownerId)
        let matches = attachments.filter { $0.title == title && $0.mime == mime }
        if let best = matches.max(by: { $0.utcDateModified < $1.utcDateModified }) {
            return best
        }
        if let byTitle = attachments.last(where: { $0.title == title }) {
            return byTitle
        }
        throw APIError.unknown("Attachment was created but could not be located.")
    }

    func renameAttachment(attachmentId: String, title: String) async throws {
        struct Body: Encodable { let title: String }
        try await putJSONVoid("/api/attachments/\(attachmentId)/rename", body: Body(title: title), csrf: true)
    }

    func deleteAttachment(_ attachmentId: String) async throws {
        try await delete("/api/attachments/\(attachmentId)", queryParams: nil, csrf: true)
    }

    func convertAttachmentToNote(attachmentId: String) async throws -> ConvertAttachmentToNoteResponse {
        struct Empty: Encodable {}
        return try await postJSON(
            "/api/attachments/\(attachmentId)/convert-to-note",
            body: Empty(),
            csrf: true
        )
    }

    func getAttachmentOCRText(attachmentId: String) async throws -> AttachmentOCRTextResponse {
        var request = try buildRequest(
            path: "/api/ocr/attachments/\(attachmentId)/text",
            method: "GET",
            queryParams: nil,
            csrf: false,
            jsonBody: false
        )
        request.cachePolicy = .reloadIgnoringLocalCacheData
        let (data, response) = try await session.data(for: request)
        try validateResponse(response, data: data)
        do {
            return try decoder.decode(AttachmentOCRTextResponse.self, from: data)
        } catch {
            Log.api.error("Decoding failed for /api/ocr/attachments/\(attachmentId)/text: \(error)")
            throw APIError.decodingFailed(error.localizedDescription)
        }
    }

    func processAttachmentOCR(attachmentId: String, forceReprocess: Bool) async throws -> ProcessAttachmentOCRResponse {
        struct Body: Encodable { let forceReprocess: Bool }
        var request = try buildRequest(
            path: "/api/ocr/process-attachment/\(attachmentId)",
            method: "POST",
            queryParams: nil,
            csrf: true,
            jsonBody: true
        )
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try encoder.encode(Body(forceReprocess: forceReprocess))
        request.timeoutInterval = Self.ocrRequestTimeout
        let (data, response) = try await dataForLongRunningRequest(request)
        try validateResponse(response, data: data)
        do {
            return try decoder.decode(ProcessAttachmentOCRResponse.self, from: data)
        } catch {
            Log.api.error("Decoding failed for /api/ocr/process-attachment/\(attachmentId): \(error)")
            throw APIError.decodingFailed(error.localizedDescription)
        }
    }

    /// Tesseract often sends no bytes for well over the default 30s idle timeout.
    private static let ocrRequestTimeout: TimeInterval = 600

    private func dataForLongRunningRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        let cfg = URLSessionConfiguration.default
        cfg.httpCookieStorage = httpCookieStorage
        cfg.httpShouldSetCookies = true
        cfg.httpCookieAcceptPolicy = .always
        cfg.timeoutIntervalForRequest = Self.ocrRequestTimeout
        cfg.timeoutIntervalForResource = Self.ocrRequestTimeout
        cfg.waitsForConnectivity = injectedProtocolClasses == nil
        if let injectedProtocolClasses {
            cfg.protocolClasses = injectedProtocolClasses
        }
        let longSession = URLSession(configuration: cfg)
        defer { longSession.finishTasksAndInvalidate() }
        return try await longSession.data(for: request)
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

        if csrf, let csrfToken {
            request.setValue(csrfToken, forHTTPHeaderField: TriliumHTTP.csrfHeader)
        }

        applyAccessHeaders(to: &request)

        return request
    }

    private func applyAccessHeaders(to request: inout URLRequest) {
        applyJarCookies(to: &request)
        guard let accessHeaders else { return }
        for (name, value) in accessHeaders {
            request.setValue(value, forHTTPHeaderField: name)
        }
    }

    /// `HTTPCookieStorage.cookies(for:)` is unreliable for imported SSO cookies; send them explicitly.
    private func applyJarCookies(to request: inout URLRequest) {
        guard let url = request.url, let host = url.host?.lowercased() else { return }
        let fromURL = httpCookieStorage.cookies(for: url) ?? []
        let fromHost = (httpCookieStorage.cookies ?? []).filter {
            Self.cookieDomainMatchesHost($0.domain, host: host)
        }
        var seen = Set<String>()
        var parts: [String] = []
        for cookie in fromURL + fromHost {
            let key = cookie.name.lowercased()
            guard seen.insert(key).inserted else { continue }
            parts.append("\(cookie.name)=\(cookie.value)")
        }
        guard !parts.isEmpty else { return }
        request.setValue(parts.joined(separator: "; "), forHTTPHeaderField: "Cookie")
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

        // Capture CSRF cookie from ANY API response — newer TriliumNext (Vite SPA)
        // sets _csrf on API GETs, not on the HTML page load.
        captureCsrfFromResponse(http)

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

    /// Opportunistically captures `_csrf` from any API response's Set-Cookie header.
    private func captureCsrfFromResponse(_ response: HTTPURLResponse) {
        TriliumCookieResponseParser.storeCookies(from: response, in: httpCookieStorage)
        TriliumCookieResponseParser.manuallyStoreCsrfCookie(from: response, in: httpCookieStorage)

        if csrfToken == nil {
            if let fromHeader = Self.extractCsrfFromSetCookieHeader(response) {
                csrfToken = fromHeader
            } else if let fromCookie = extractCsrfTokenFromCookie() {
                csrfToken = fromCookie
            }
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

    private static func nativeDetailFallback(from row: TreeLoadNoteRow) -> NativeNoteDetailRow {
        NativeNoteDetailRow(
            noteId: row.noteId,
            title: row.title,
            isProtected: row.isProtected,
            type: row.type,
            mime: row.mime,
            blobId: row.blobId,
            isDeleted: row.isDeleted,
            dateCreated: nil,
            dateModified: nil,
            utcDateCreated: nil,
            utcDateModified: nil
        )
    }

    /// Child branches under `parentNoteId` as API models (same filtering as `buildNoteResponse`).
    private static func liveChildBranchResponses(tree: TreeLoadResponse, parentNoteId: String) -> [BranchResponse] {
        let childBranches = tree.branches.filter { $0.parentNoteId == parentNoteId }.sorted { $0.notePosition < $1.notePosition }
        let deletedNoteIds: Set<String> = {
            var ids = Set<String>()
            for n in tree.notes where n.isDeleted == true {
                ids.insert(n.noteId)
            }
            return ids
        }()
        let live = childBranches.filter { branch in
            if branch.isDeleted == true { return false }
            return !deletedNoteIds.contains(branch.noteId)
        }
        return live.map { row in
            BranchResponse(
                branchId: row.branchId,
                noteId: row.noteId,
                parentNoteId: row.parentNoteId,
                prefix: row.prefix,
                notePosition: row.notePosition,
                isExpanded: row.isExpanded,
                utcDateModified: nil
            )
        }
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
        let normalized = TriliumCookieNormalizer.normalizeForSharedJar(parsed, requestURL: url)
        jar.setCookies(normalized, for: url, mainDocumentURL: url)
        for c in normalized {
            jar.setCookie(c)
        }
    }

    /// Parses `_csrf=value` from raw `Set-Cookie`. `HTTPCookie.cookies()` can drop it
    /// when multiple cookies with comma-containing `Expires` dates are collapsed.
    static func manuallyStoreCsrfCookie(from response: HTTPURLResponse, in jar: HTTPCookieStorage) {
        guard let url = response.url, let host = url.host?.lowercased() else { return }
        var rawSetCookie: String?
        for (key, value) in response.allHeaderFields {
            if let k = key as? String, k.lowercased() == "set-cookie", let v = value as? String {
                rawSetCookie = v
                break
            }
        }
        guard let raw = rawSetCookie,
              let nameRange = raw.range(of: "_csrf=", options: .caseInsensitive) else { return }

        let afterEquals = raw[nameRange.upperBound...]
        let valueEnd = afterEquals.firstIndex(of: ";") ?? afterEquals.endIndex
        let fullValue = String(afterEquals[afterEquals.startIndex..<valueEnd])
        guard !fullValue.isEmpty else { return }

        var props: [HTTPCookiePropertyKey: Any] = [
            .name: "_csrf",
            .value: fullValue,
            .domain: host,
            .path: "/"
        ]
        if url.scheme?.lowercased() == "https" {
            props[.secure] = "TRUE"
        }
        if let cookie = HTTPCookie(properties: props) {
            jar.setCookie(cookie)
        }
    }

}

/// Follows redirects only on the Trilium host. Authelia/Cloudflare login hops otherwise loop.
private final class SameHostRedirectDelegate: NSObject, URLSessionTaskDelegate {
    private let allowedHost: String

    init(allowedHost: String) {
        self.allowedHost = allowedHost.lowercased()
        super.init()
    }

    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        willPerformHTTPRedirection response: HTTPURLResponse,
        newRequest request: URLRequest,
        completionHandler: @escaping (URLRequest?) -> Void
    ) {
        guard let host = request.url?.host?.lowercased(), host == allowedHost else {
            Log.auth.debug("SSO/API blocked off-host redirect to \(request.url?.host ?? "nil")")
            completionHandler(nil)
            return
        }
        let path = request.url?.path.lowercased() ?? ""
        if path == "/login" || path.hasPrefix("/login/") {
            Log.auth.debug("SSO/API stopped redirect to login page")
            completionHandler(nil)
            return
        }
        completionHandler(request)
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
        TriliumCookieResponseParser.manuallyStoreCsrfCookie(from: response, in: cookieStorage)
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
