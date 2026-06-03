import SwiftUI
import WebKit

/// Performs the full Trilium OpenID/OAuth login inside a visible in-app `WKWebView`.
///
/// The entire flow (`/authenticate` → provider → `/callback` → landing) runs in one `WKWebView` data
/// store, so the resulting `trilium.sid` cookie can be read directly — no Associated Domains, custom
/// schemes, or out-of-process auth service required. A Safari `customUserAgent` is set so providers
/// (notably Google) don't reject the embedded web view with `disallowed_useragent`.
struct OpenIDBrowserLoginView: View {
    let baseURL: URL
    let cloudflareAccessCredentials: CloudflareAccessCredentials?
    let onComplete: (Data) -> Void
    let onFailure: (String) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var isValidatingSession = false

    var body: some View {
        NavigationStack {
            ZStack {
                OpenIDWebView(
                    baseURL: baseURL,
                    cloudflareAccessCredentials: cloudflareAccessCredentials,
                    onSessionReady: { archive in
                        isValidatingSession = true
                        onComplete(archive)
                    },
                    onFailure: { message in
                        onFailure(message)
                        dismiss()
                    }
                )
                .ignoresSafeArea(edges: .bottom)

                if isValidatingSession {
                    Color(.systemBackground).opacity(0.85).ignoresSafeArea()
                    ProgressView(String(localized: "Verifying session…", comment: "OpenID login validating"))
                }
            }
            .navigationTitle(String(localized: "Sign in", comment: "OpenID browser sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss OpenID browser")) {
                        dismiss()
                    }
                    .disabled(isValidatingSession)
                }
            }
        }
        .interactiveDismissDisabled(isValidatingSession)
    }
}

// MARK: - WKWebView wrapper

private struct OpenIDWebView: UIViewRepresentable {
    let baseURL: URL
    let cloudflareAccessCredentials: CloudflareAccessCredentials?
    let onSessionReady: (Data) -> Void
    let onFailure: (String) -> Void

    func makeCoordinator() -> Coordinator {
        Coordinator(
            baseURL: baseURL,
            cloudflareAccessCredentials: cloudflareAccessCredentials,
            onSessionReady: onSessionReady,
            onFailure: onFailure
        )
    }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .nonPersistent()

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.customUserAgent = Coordinator.safariUserAgent
        webView.allowsBackForwardNavigationGestures = true
        context.coordinator.webView = webView

        context.coordinator.start()
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    static func dismantleUIView(_ uiView: WKWebView, coordinator: Coordinator) {
        coordinator.invalidate()
    }

    @MainActor
    final class Coordinator: NSObject, WKNavigationDelegate {
        static let safariUserAgent =
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"

        private let baseURL: URL
        private let triliumHost: String
        private let triliumCallbackPath: String
        private let cloudflareAccessCredentials: CloudflareAccessCredentials?
        private let onSessionReady: (Data) -> Void
        private let onFailure: (String) -> Void

        weak var webView: WKWebView?
        private var hasDelivered = false
        /// Trilium sets an anonymous `trilium.sid` at `/authenticate` (for the PKCE session) *before* login.
        /// Only capture the cookie after the OAuth round-trip returns to `/callback`, or we'd archive the
        /// pre-authentication session and the server would still show the login page.
        private var didReachCallback = false
        /// Set once navigation leaves the Trilium host for the external provider (e.g. accounts.google.com).
        private var visitedProvider = false
        private var pollTask: Task<Void, Never>?

        init(
            baseURL: URL,
            cloudflareAccessCredentials: CloudflareAccessCredentials?,
            onSessionReady: @escaping (Data) -> Void,
            onFailure: @escaping (String) -> Void
        ) {
            self.baseURL = baseURL
            self.triliumHost = baseURL.host?.lowercased() ?? ""
            let callbackURL = Self.makeTriliumURL(baseURL: baseURL, path: "/callback")
            self.triliumCallbackPath = Self.normalizedPath(callbackURL?.path ?? "/callback")
            self.cloudflareAccessCredentials = cloudflareAccessCredentials
            self.onSessionReady = onSessionReady
            self.onFailure = onFailure
            super.init()

            let configLog = OpenIDAuthDiagnostics.describeConfig(
                baseURL: baseURL,
                callbackPath: "/callback",
                usesCloudflarePreflight: cloudflareAccessCredentials?.isComplete == true
            )
            Log.openID.info("\(configLog, privacy: .public)")
        }

        func start() {
            guard let webView, let authenticateURL = Self.makeTriliumURL(baseURL: baseURL, path: "/authenticate") else {
                onFailure(String(localized: "Invalid server URL.", comment: "OpenID browser invalid URL"))
                return
            }
            TriliumSessionCookieImporter.clearStaleTriliumSessionCookies(for: baseURL)
            Log.openID.info("\(OpenIDAuthDiagnostics.describeURL("wkLogin.start", url: authenticateURL), privacy: .public)")

            var request = URLRequest(url: authenticateURL)
            request.cachePolicy = .reloadIgnoringLocalCacheData
            applyCloudflareHeaders(to: &request)
            webView.load(request)

            // Cookies can be set on a 3xx without a didFinish landing; poll the store as a safety net.
            schedulePoll()
        }

        func invalidate() {
            pollTask?.cancel()
            pollTask = nil
        }

        // MARK: Navigation delegate

        func webView(
            _ webView: WKWebView,
            decidePolicyFor navigationAction: WKNavigationAction,
            decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
        ) {
            observe(navigationAction.request.url)
            decisionHandler(.allow)
        }

        func webView(_ webView: WKWebView, didReceiveServerRedirectForProvisionalNavigation navigation: WKNavigation!) {
            observe(webView.url)
        }

        func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
            observe(webView.url)
        }

        func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
            observe(webView.url)
            Task { @MainActor in await self.tryDeliverSession(reason: "commit") }
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            observe(webView.url)
            if let url = webView.url {
                Log.openID.debug("\(OpenIDAuthDiagnostics.describeURL("wkLogin.didFinish", url: url), privacy: .public)")
            }
            Task { @MainActor in await self.tryDeliverSession(reason: "didFinish") }
        }

        func webView(
            _ webView: WKWebView,
            decidePolicyFor navigationResponse: WKNavigationResponse,
            decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void
        ) {
            observe(navigationResponse.response.url)
            decisionHandler(.allow)
            Task { @MainActor in await self.tryDeliverSession(reason: "response") }
        }

        /// Tracks navigation across the OAuth round-trip. The redirect back to `/callback` arrives as an HTTP
        /// 302 (so `decidePolicyFor navigationAction` isn't called for it), so we also treat "returned to the
        /// Trilium host after visiting the external provider" as having reached the callback.
        private func observe(_ url: URL?) {
            guard let url, let host = url.host?.lowercased(), !host.isEmpty else { return }

            if host != triliumHost {
                visitedProvider = true
                return
            }

            guard !didReachCallback else { return }
            let isCallback = isTriliumCallbackURL(url)
            let returnedFromProvider = visitedProvider && Self.normalizedPath(url.path) != "/authenticate"
            if isCallback || returnedFromProvider {
                didReachCallback = true
                Log.openID.info("\(OpenIDAuthDiagnostics.describeURL("wkLogin.reachedCallback", url: url), privacy: .public)")
            }
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            handleNavigationError(error)
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            handleNavigationError(error)
        }

        private func handleNavigationError(_ error: Error) {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            // A failed navigation can still follow a successful login (e.g. a redirect to a non-loadable
            // scheme); check for the session cookie before surfacing the error.
            Task { @MainActor in
                if await self.tryDeliverSession(reason: "navError") { return }
                Log.openID.error("wkLogin: navigation failed: \(error.localizedDescription, privacy: .public)")
            }
        }

        // MARK: Session capture

        @discardableResult
        private func tryDeliverSession(reason: String) async -> Bool {
            guard !hasDelivered, didReachCallback, let webView else { return false }
            // `/callback` sets the *authenticated* `trilium.sid` only once it has processed the OAuth code and
            // redirected to its return URL. Capturing before the web view lands on a normal app page can grab
            // the pre-auth cookie (the one set at `/authenticate`), which leaves the server on the login page.
            guard hasLandedOnAuthenticatedPage(webView.url) else {
                Log.openID.debug("wkLogin: \(reason, privacy: .public) deferred, not on landing page yet (url path=\(webView.url.map { Self.normalizedPath($0.path) } ?? "nil", privacy: .public))")
                return false
            }
            let store = webView.configuration.websiteDataStore.httpCookieStore
            let cookies = await withCheckedContinuation { (continuation: CheckedContinuation<[HTTPCookie], Never>) in
                store.getAllCookies { continuation.resume(returning: $0) }
            }

            guard !hasDelivered else { return false }
            guard TriliumSessionCookieImporter.hasSessionCookie(in: cookies, for: baseURL) else {
                return false
            }

            do {
                let archive = try TriliumSessionCookieImporter.archiveData(from: cookies, baseURL: baseURL)
                hasDelivered = true
                invalidate()
                Log.openID.info("wkLogin: session captured via \(reason, privacy: .public)")
                onSessionReady(archive)
                return true
            } catch {
                Log.openID.error("wkLogin: archive failed: \(error.localizedDescription, privacy: .public)")
                return false
            }
        }

        private func schedulePoll() {
            pollTask?.cancel()
            pollTask = Task { @MainActor in
                for _ in 0..<120 {
                    try? await Task.sleep(nanoseconds: 1_000_000_000)
                    if Task.isCancelled || hasDelivered { return }
                    if await tryDeliverSession(reason: "poll") { return }
                }
            }
        }

        // MARK: Helpers

        private func applyCloudflareHeaders(to request: inout URLRequest) {
            guard let cloudflareAccessCredentials, cloudflareAccessCredentials.isComplete else { return }
            for (name, value) in cloudflareAccessCredentials.httpHeaders {
                request.setValue(value, forHTTPHeaderField: name)
            }
        }

        private func isTriliumCallbackURL(_ url: URL) -> Bool {
            url.host?.lowercased() == triliumHost && Self.normalizedPath(url.path) == triliumCallbackPath
        }

        /// True when the web view has landed back on a normal Trilium app page (the OAuth return URL),
        /// i.e. on the Trilium host and not on an auth-flow path. This is the point at which the
        /// authenticated session cookie is guaranteed to be set.
        private func hasLandedOnAuthenticatedPage(_ url: URL?) -> Bool {
            guard let url, url.host?.lowercased() == triliumHost else { return false }
            let path = Self.normalizedPath(url.path)
            return path != triliumCallbackPath && path != "/authenticate" && path != "/login"
        }

        private static func makeTriliumURL(baseURL: URL, path: String) -> URL? {
            guard var components = URLComponents(url: baseURL, resolvingAgainstBaseURL: false) else { return nil }
            var basePath = components.path
            if basePath.isEmpty { basePath = "/" }
            let trimmed = path.hasPrefix("/") ? String(path.dropFirst()) : path
            if basePath.hasSuffix("/") {
                components.path = (basePath + trimmed).replacingOccurrences(of: "//", with: "/")
            } else {
                components.path = (basePath + "/" + trimmed).replacingOccurrences(of: "//", with: "/")
            }
            return components.url
        }

        private static func normalizedPath(_ path: String) -> String {
            let trimmed = path.trimmingCharacters(in: .whitespacesAndNewlines)
            if trimmed.isEmpty || trimmed == "/" { return "/" }
            var result = trimmed
            if !result.hasPrefix("/") { result = "/" + result }
            while result.count > 1, result.hasSuffix("/") {
                result.removeLast()
            }
            return result
        }
    }
}
