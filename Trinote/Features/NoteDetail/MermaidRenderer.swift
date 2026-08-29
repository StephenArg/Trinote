import CryptoKit
import Foundation
import SwiftUI
import UIKit
import WebKit

// MARK: - Hidden host (trait collection + window hierarchy)

/// Invisible container so `MermaidRenderer`'s `WKWebView` inherits the same appearance traits as the app.
struct MermaidRendererHost: UIViewRepresentable {
    func makeUIView(context: Context) -> UIView {
        let v = UIView(frame: .zero)
        v.isUserInteractionEnabled = false
        v.isAccessibilityElement = false
        MermaidRenderer.shared.install(into: v)
        return v
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        MermaidRenderer.shared.install(into: uiView)
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

// MARK: - Shared renderer

/// Pre-renders mermaid source using the same bundled `mermaid-viewer.html` + `mermaid.min.js` pipeline as
/// standalone `MermaidNoteView`, returning inline SVG for linked-note include cards.
@MainActor
final class MermaidRenderer: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
    static let shared = MermaidRenderer()

    private var webView: WKWebView?
    private var isReady = false
    private var readyWaiters: [CheckedContinuation<Void, Never>] = []
    private var cache: [String: String] = [:]
    /// `nil` until the first successful `mermaidReady`; thereafter tracks `UserDefaults` appearance key.
    private var lastAppearanceFingerprint: String?
    private var serialTail: Task<String?, Never>?

    private override init() {
        super.init()
    }

    private func appearanceFingerprint() -> String {
        AppearanceMode.stored.rawValue
    }

    private func applyInterfaceStyle(to webView: WKWebView) {
        webView.applyTrinoteAppearanceMode()
    }

    /// Attach the hidden `WKWebView` once; call from `MermaidRendererHost` when the app window exists.
    func install(into host: UIView) {
        let firstInstall = webView == nil
        if firstInstall {
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
        }
        guard let webView else { return }
        if webView.superview !== host {
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
        applyInterfaceStyle(to: webView)
        if webView.url == nil, let url = Bundle.main.url(forResource: "mermaid-viewer", withExtension: "html") {
            isReady = false
            webView.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        } else if webView.url == nil {
            Log.ui.error("[MMD] install: mermaid-viewer.html not found in bundle")
        }
    }

    /// Called when the user changes appearance in Settings so the next render uses a fresh `mermaid.initialize`.
    /// Reloads the hidden viewer and waits until it is ready so include-card SVGs can be re-baked immediately.
    func onAppearanceModeChanged() async {
        let fp = appearanceFingerprint()
        cache.removeAll()
        lastAppearanceFingerprint = fp
        guard let webView else { return }
        applyInterfaceStyle(to: webView)
        guard webView.url != nil else { return }
        isReady = false
        webView.reload()
        await waitUntilReady()
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
        case "mermaidReady":
            isReady = true
            let waiters = readyWaiters
            readyWaiters.removeAll()
            for c in waiters { c.resume() }
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

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {}

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        Log.ui.error("[MMD] didFail \(error.localizedDescription, privacy: .public)")
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        Log.ui.error("[MMD] didFailProvisionalNavigation \(error.localizedDescription, privacy: .public)")
    }

    private func waitUntilReady(timeoutSeconds: TimeInterval = 15) async {
        if isReady { return }
        let deadline = Date().addingTimeInterval(timeoutSeconds)
        while !isReady {
            if Date() > deadline {
                Log.ui.error("[MMD] waitUntilReady TIMEOUT after \(timeoutSeconds, privacy: .public)s")
                return
            }
            await withCheckedContinuation { readyWaiters.append($0) }
        }
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
        let prev = serialTail
        let task = Task { @MainActor [weak self] () -> String? in
            guard let self else { return nil }
            if let prev { _ = await prev.value }
            return await self.renderImpl(source: source)
        }
        serialTail = task
        return await task.value
    }

    private func renderImpl(source: String) async -> String? {
        guard let webView else {
            Log.ui.error("[MMD] render NO webView installed (MermaidRendererHost not realized yet?)")
            return nil
        }
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
        guard isReady else {
            Log.ui.error("[MMD] render not ready after wait")
            return nil
        }

        let key = cacheKey(for: source)
        if let hit = cache[key] {
            return hit
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
            cache[key] = svg
        } else {
            Log.ui.error("[MMD] render got nil svg (timeout or error)")
        }
        return svg
    }
}
