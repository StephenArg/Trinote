import CryptoKit
import Foundation
import SwiftUI
import UIKit
import WebKit

// MARK: - Hidden host (trait collection + window hierarchy)

/// Invisible container so `MermaidRenderer`'s `WKWebView` inherits the same appearance traits as the app. The web
/// view is only made when a diagram is first rendered.
struct MermaidRendererHost: UIViewRepresentable {
    func makeUIView(context: Context) -> UIView {
        let v = UIView(frame: .zero)
        v.isUserInteractionEnabled = false
        v.isAccessibilityElement = false
        MermaidRenderer.shared.attach(host: v)
        return v
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        MermaidRenderer.shared.attach(host: uiView)
    }
}

/// Small box that lets the `callAsyncJavaScript` completion handler and the 5-second timeout Task share
/// a single `CheckedContinuation` safely; either one can be the first to resume.
@MainActor
private final class ContinuationState {
    private let cont: CheckedContinuation<String?, Never>
    private(set) var didResume = false

    init(cont: CheckedContinuation<String?, Never>) {
        self.cont = cont
    }

    func resumeOnce(_ value: String?) {
        if didResume { return }
        didResume = true
        cont.resume(returning: value)
    }
}

// MARK: - Rendered SVG cache

/// Rendered diagram SVGs by cache key, least recently used out first, within an entry count and a size in bytes.
struct MermaidSVGCache {
    let maxEntries: Int
    let maxBytes: Int
    private(set) var totalBytes = 0
    private var entries: [String: Entry] = [:]
    private var useCounter: UInt64 = 0

    private struct Entry {
        let svg: String
        let bytes: Int
        var lastUse: UInt64
    }

    init(maxEntries: Int = 48, maxBytes: Int = 4 * 1024 * 1024) {
        self.maxEntries = maxEntries
        self.maxBytes = maxBytes
    }

    var count: Int { entries.count }

    mutating func value(forKey key: String) -> String? {
        guard var entry = entries[key] else { return nil }
        useCounter &+= 1
        entry.lastUse = useCounter
        entries[key] = entry
        return entry.svg
    }

    /// An SVG larger than `maxBytes` isn't kept.
    mutating func insert(_ svg: String, forKey key: String) {
        if let replaced = entries.removeValue(forKey: key) {
            totalBytes -= replaced.bytes
        }
        let bytes = svg.utf8.count
        guard bytes <= maxBytes else { return }
        useCounter &+= 1
        entries[key] = Entry(svg: svg, bytes: bytes, lastUse: useCounter)
        totalBytes += bytes
        while entries.count > maxEntries || totalBytes > maxBytes,
              let oldest = entries.min(by: { $0.value.lastUse < $1.value.lastUse }) {
            entries.removeValue(forKey: oldest.key)
            totalBytes -= oldest.value.bytes
        }
    }

    mutating func removeAll() {
        entries.removeAll()
        totalBytes = 0
    }
}

// MARK: - Shared renderer

/// Pre-renders mermaid source using the same bundled `mermaid-viewer.html` + `mermaid.min.js` pipeline as
/// standalone `MermaidNoteView`, returning inline SVG for linked-note include cards.
///
/// The hidden web view is made by the first render, not at launch, and is removed `idleTeardownDelay` after the last
/// one or on a memory warning: with mermaid.js loaded, its WebKit processes take tens of MB, and most sessions never
/// render a linked diagram.
@MainActor
final class MermaidRenderer: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
    static let shared = MermaidRenderer()

    /// How long the hidden web view stays after the last render.
    static let idleTeardownDelay: Duration = .seconds(120)

    /// The window-hierarchy view the web view lives in (`MermaidRendererHost`).
    private weak var host: UIView?
    private var webView: WKWebView?
    private var isReady = false
    private var readyWaiters: [CheckedContinuation<Void, Never>] = []
    private var cache = MermaidSVGCache()
    /// The appearance the web view was set up for; a render with another one reloads it.
    private var lastAppearanceFingerprint: String?
    private var serialTail: Task<String?, Never>?
    /// Renders asked for and not yet answered; the web view isn't removed while there are any.
    private var pendingRenders = 0
    private var idleTeardownTask: Task<Void, Never>?
    private var memoryWarningObserver: NSObjectProtocol?
    private let processRecovery = WebContentProcessRecovery(label: "Mermaid renderer")

    private override init() {
        super.init()
        memoryWarningObserver = NotificationCenter.default.addObserver(
            forName: UIApplication.didReceiveMemoryWarningNotification,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            MainActor.assumeIsolated { self?.didReceiveMemoryWarning() }
        }
    }

    private func appearanceFingerprint() -> String {
        AppearanceMode.stored.rawValue
    }

    private func applyInterfaceStyle(to webView: WKWebView) {
        webView.applyTrinoteAppearanceMode()
    }

    /// Remembers the view the hidden web view goes in; call from `MermaidRendererHost` when the app window exists.
    func attach(host: UIView) {
        self.host = host
        if let webView, webView.superview !== host {
            place(webView, in: host)
        }
        if let webView {
            applyInterfaceStyle(to: webView)
        }
    }

    private func place(_ webView: WKWebView, in host: UIView) {
        webView.removeFromSuperview()
        host.addSubview(webView)
        webView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            webView.widthAnchor.constraint(equalToConstant: 1),
            webView.heightAnchor.constraint(equalToConstant: 1),
            webView.leadingAnchor.constraint(equalTo: host.leadingAnchor),
            webView.topAnchor.constraint(equalTo: host.topAnchor),
        ])
    }

    /// The hidden viewer, made and loaded the first time a render needs it.
    private func ensureWebView() -> WKWebView? {
        if let webView { return webView }
        guard let host else {
            Log.ui.error("[MMD] render NO host view (MermaidRendererHost not realized yet?)")
            return nil
        }
        guard let url = Bundle.main.url(forResource: "mermaid-viewer", withExtension: "html") else {
            Log.ui.error("[MMD] mermaid-viewer.html not found in bundle")
            return nil
        }
        let uc = WKUserContentController()
        uc.add(self, name: "mermaidReady")
        uc.add(self, name: "debugLog")
        let config = WKWebViewConfiguration()
        config.userContentController = uc
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        let wv = WKWebView(frame: CGRect(x: 0, y: 0, width: 1, height: 1), configuration: config)
        wv.isOpaque = false
        wv.backgroundColor = .clear
        wv.scrollView.isScrollEnabled = false
        wv.scrollView.backgroundColor = .clear
        wv.navigationDelegate = self
        webView = wv
        place(wv, in: host)
        applyInterfaceStyle(to: wv)
        isReady = false
        lastAppearanceFingerprint = appearanceFingerprint()
        wv.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        return wv
    }

    /// Removes the hidden viewer, which ends its WebKit processes; the next render makes a new one. The rendered SVGs
    /// stay cached.
    private func tearDownWebView() {
        idleTeardownTask?.cancel()
        idleTeardownTask = nil
        guard let webView else { return }
        // The content controller keeps its handlers (this object) strongly.
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "mermaidReady")
        uc.removeScriptMessageHandler(forName: "debugLog")
        webView.navigationDelegate = nil
        webView.stopLoading()
        webView.removeFromSuperview()
        self.webView = nil
        isReady = false
        resumeReadyWaiters()
    }

    private func scheduleIdleTeardown() {
        idleTeardownTask?.cancel()
        idleTeardownTask = Task { @MainActor [weak self] in
            try? await Task.sleep(for: Self.idleTeardownDelay)
            guard !Task.isCancelled, let self, self.pendingRenders == 0 else { return }
            self.tearDownWebView()
        }
    }

    private func didReceiveMemoryWarning() {
        cache.removeAll()
        if pendingRenders == 0 {
            tearDownWebView()
        }
    }

    /// Called when the user changes appearance in Settings so the next render uses a fresh `mermaid.initialize`.
    /// Reloads the hidden viewer, when there is one, and waits until it is ready so include-card SVGs can be re-baked
    /// immediately. Without one, the next render makes one with the new appearance.
    func onAppearanceModeChanged() async {
        let fp = appearanceFingerprint()
        let hadRenderedDiagrams = cache.count > 0
        cache.removeAll()
        lastAppearanceFingerprint = fp
        defer {
            if pendingRenders == 0, webView != nil {
                scheduleIdleTeardown()
            }
        }
        if let webView {
            applyInterfaceStyle(to: webView)
            guard webView.url != nil else { return }
            isReady = false
            webView.reload()
            await waitUntilReady()
        } else if hadRenderedDiagrams {
            // Diagrams drawn in the old appearance are about to be redrawn. Have the viewer ready first, as when it
            // stayed for the whole run, so notes don't show their includes unresolved while mermaid.js loads too.
            guard ensureWebView() != nil else { return }
            await waitUntilReady()
        }
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
        case "mermaidReady":
            isReady = true
            resumeReadyWaiters()
        case "debugLog":
            if let s = message.body as? String {
                if s.localizedCaseInsensitiveContains("ERROR") || s.localizedCaseInsensitiveContains("FAILED") {
                    Log.ui.error("[mermaid-viewer] \(s, privacy: .public)")
                }
            }
        default:
            break
        }
    }

    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {}

    /// iOS ended the hidden viewer's process (often while the app is in the background, to free memory). With no
    /// render waiting, the viewer is dropped and the next render makes a new one. Otherwise it reloads here: WebKit
    /// only reloads a page once its view is visible, and this one never is, so renders would wait on a dead page.
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        isReady = false
        guard pendingRenders > 0 else {
            tearDownWebView()
            return
        }
        processRecovery.pageProcessEnded { [weak webView] in webView?.reload() }
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {}

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        Log.ui.error("[MMD] didFail \(error.localizedDescription, privacy: .public)")
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        Log.ui.error("[MMD] didFailProvisionalNavigation \(error.localizedDescription, privacy: .public)")
    }

    /// Set by a wait's own timeout, so that wait ends whatever the clock does meanwhile.
    @MainActor
    private final class ReadyWait {
        var timedOut = false
    }

    private func waitUntilReady(timeoutSeconds: Int = 15) async {
        if isReady { return }
        let wait = ReadyWait()
        // Wakes the waiters in case the page never says it is ready (a failed load), which matters now that the first
        // render is what loads the page. Only time the app runs counts: the page can't load while the app is
        // suspended, and a render asked for just before that should still finish when it comes back.
        let timeout = Task { @MainActor [weak self] in
            var secondsLeft = timeoutSeconds
            while secondsLeft > 0 {
                try? await Task.sleep(for: .seconds(1))
                guard !Task.isCancelled else { return }
                if UIApplication.shared.applicationState != .background {
                    secondsLeft -= 1
                }
            }
            wait.timedOut = true
            self?.resumeReadyWaiters()
        }
        defer { timeout.cancel() }
        while !isReady {
            // Removed meanwhile (`tearDownWebView`): there is nothing left to wait for.
            guard webView != nil else { return }
            if wait.timedOut {
                Log.ui.error("[MMD] waitUntilReady TIMEOUT after \(timeoutSeconds, privacy: .public)s")
                return
            }
            await withCheckedContinuation { readyWaiters.append($0) }
        }
    }

    private func resumeReadyWaiters() {
        let waiters = readyWaiters
        readyWaiters.removeAll()
        for waiter in waiters { waiter.resume() }
    }

    /// Bump when the rendering pipeline changes (HTML viewer CSS/JS, post-processing, layout-context width)
    /// so cached SVGs from older code paths are not served. Keeps appearance fingerprinting separate.
    private static let rendererVersion = "v5-pie-muted-dark"

    private func cacheKey(for source: String) -> String {
        let fp = appearanceFingerprint()
        let digest = SHA256.hash(data: Data(source.utf8))
        let hex = digest.map { String(format: "%02x", $0) }.joined()
        return "\(Self.rendererVersion)|\(fp)|\(hex)"
    }

    /// Serialize renders so concurrent include resolutions don't interleave `evaluateJavaScript` on one web view.
    func render(source: String) async -> String? {
        pendingRenders += 1
        idleTeardownTask?.cancel()
        let prev = serialTail
        let task = Task { @MainActor [weak self] () -> String? in
            guard let self else { return nil }
            if let prev { _ = await prev.value }
            return await self.renderImpl(source: source)
        }
        serialTail = task
        let svg = await task.value
        pendingRenders -= 1
        if pendingRenders == 0 {
            serialTail = nil
            scheduleIdleTeardown()
        }
        return svg
    }

    private func renderImpl(source: String) async -> String? {
        // The key includes the appearance, so a cached SVG needs no web view at all.
        let key = cacheKey(for: source)
        if let hit = cache.value(forKey: key) {
            return hit
        }
        guard let webView = ensureWebView() else { return nil }
        let fp = appearanceFingerprint()
        if let last = lastAppearanceFingerprint {
            if last != fp {
                lastAppearanceFingerprint = fp
                cache.removeAll()
                isReady = false
                applyInterfaceStyle(to: webView)
                webView.reload()
            }
        } else {
            lastAppearanceFingerprint = fp
        }

        await waitUntilReady()
        guard isReady, self.webView === webView else {
            Log.ui.error("[MMD] render not ready after wait")
            return nil
        }

        let b64 = Data(source.utf8).base64EncodedString()
        let isDark = AppearanceMode.stored.usesDarkMermaidTheme
        // Use `callAsyncJavaScript` so WebKit properly awaits the `renderToString` Promise. Plain
        // `evaluateJavaScript` reports the Promise as "JavaScript execution returned a result of an
        // unsupported type" on current iOS SDKs. Argument key must be a valid JS identifier so we
        // use `b64Arg` (not `"0"`); WebKit surfaces it as a regular variable inside `asyncBody`.
        let asyncBody = """
        const bin = atob(b64Arg);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const src = new TextDecoder('utf-8').decode(bytes);
        if (typeof window.trinoteApplyMermaidTheme === 'function') {
            window.trinoteApplyMermaidTheme(!!isDarkArg);
        }
        return await window.mermaidViewer.renderToString(src, !!isDarkArg);
        """

        let svg: String? = await withCheckedContinuation { (cont: CheckedContinuation<String?, Never>) in
            let state = ContinuationState(cont: cont)
            webView.callAsyncJavaScript(
                asyncBody,
                arguments: ["b64Arg": b64, "isDarkArg": isDark],
                in: nil,
                in: .page
            ) { result in
                switch result {
                case .success(let value):
                    if let s = value as? String, s.localizedCaseInsensitiveContains("<svg") {
                        state.resumeOnce(s)
                    } else {
                        let resultType = String(describing: Swift.type(of: value))
                        let preview = (value as? String).map { String($0.prefix(160)) } ?? "<non-string>"
                        Log.ui.error("[MMD] render unexpected async result type=\(resultType, privacy: .public) preview=\(preview, privacy: .public)")
                        state.resumeOnce(nil)
                    }
                case .failure(let error):
                    Log.ui.error("[MMD] render callAsyncJavaScript error \(error.localizedDescription, privacy: .public) ns=\((error as NSError).domain, privacy: .public)/\((error as NSError).code, privacy: .public)")
                    state.resumeOnce(nil)
                }
            }
            Task { @MainActor in
                try? await Task.sleep(nanoseconds: 5_000_000_000)
                if !state.didResume {
                    Log.ui.error("[MMD] render timeout (5s) — callAsyncJavaScript never returned")
                    state.resumeOnce(nil)
                }
            }
        }

        if let svg {
            cache.insert(svg, forKey: key)
        } else {
            Log.ui.error("[MMD] render got nil svg (timeout or error)")
        }
        return svg
    }
}
