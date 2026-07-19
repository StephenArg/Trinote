import SwiftUI
import WebKit

struct MindMapNoteView: View {
    let json: String

    var body: some View {
        MindMapWebView(json: json)
            // Full-size host so the blocker joins the nav hierarchy (zero-frame hosts often don't).
            .background {
                NavigationPopGestureBlocker(blocked: true, label: "MindMapNote")
            }
            .onAppear {
                Log.popGesture.info("MindMapNoteView.onAppear")
            }
            .onDisappear {
                Log.popGesture.info("MindMapNoteView.onDisappear")
            }
    }
}

private struct MindMapWebView: UIViewRepresentable {
    let json: String

    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let uc = WKUserContentController()
        uc.add(context.coordinator, name: "mindmapViewerReady")
        let config = WKWebViewConfiguration()
        config.userContentController = uc
        let webView = PopGestureSuppressingWKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.minimumZoomScale = 1.0
        webView.scrollView.maximumZoomScale = 1.0
        webView.scrollView.bounces = false
        webView.allowsBackForwardNavigationGestures = false
        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }
        context.coordinator.json = json
        context.coordinator.webView = webView

        if let fileURL = Bundle.main.url(forResource: "mindmap-viewer", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.json = json
        context.coordinator.renderIfNeeded()
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "mindmapViewerReady")
        (webView as? PopGestureSuppressingWKWebView)?.restoreNavigationPopGesture()
    }

    class Coordinator: NSObject, WKScriptMessageHandler {
        var json: String = ""
        weak var webView: WKWebView?
        private var isReady = false
        private var lastRenderedJSON: String?

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "mindmapViewerReady" {
                isReady = true
                renderIfNeeded()
            }
        }

        func renderIfNeeded() {
            guard isReady, let webView else { return }
            guard json != lastRenderedJSON else { return }
            lastRenderedJSON = json

            let escaped = json
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")

            webView.evaluateJavaScript("window.mindmapViewer.load('\(escaped)');") { _, error in
                if let error {
                    Log.api.error("Failed to inject mind map data: \(error)")
                }
            }
        }
    }
}

/// WKWebView that keeps interactive-pop suppressed while it is in a window.
final class PopGestureSuppressingWKWebView: WKWebView {
    private var isRetainingPopSuppression = false

    override func didMoveToWindow() {
        super.didMoveToWindow()
        if window != nil {
            Log.popGesture.info("MindMapWK didMoveToWindow IN frame=\(String(describing: self.bounds.size), privacy: .public) retaining=\(self.isRetainingPopSuppression)")
            retainPopSuppression()
            // SwiftUI NavigationStack may attach the nav controller one runloop later.
            DispatchQueue.main.async { [weak self] in
                guard let self, self.window != nil else { return }
                Log.popGesture.debug("MindMapWK async reassert retaining=\(self.isRetainingPopSuppression)")
                NavigationPopGestureSuppression.reassertIfNeeded(from: self, source: "MindMapWK.async")
            }
        } else {
            Log.popGesture.info("MindMapWK didMoveToWindow OUT releasing=\(self.isRetainingPopSuppression)")
            releasePopSuppression()
        }
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        if isRetainingPopSuppression {
            NavigationPopGestureSuppression.reassertIfNeeded(from: self, source: "MindMapWK.layout")
        }
    }

    func restoreNavigationPopGesture() {
        Log.popGesture.info("MindMapWK restoreNavigationPopGesture retaining=\(self.isRetainingPopSuppression)")
        releasePopSuppression()
    }

    private func retainPopSuppression() {
        guard !isRetainingPopSuppression else {
            NavigationPopGestureSuppression.reassertIfNeeded(from: self, source: "MindMapWK.retainAgain")
            return
        }
        isRetainingPopSuppression = NavigationPopGestureSuppression.retain(from: self, source: "MindMapWK")
        if !isRetainingPopSuppression {
            Log.popGesture.warning("MindMapWK retain deferred (no nav yet)")
        }
    }

    private func releasePopSuppression() {
        guard isRetainingPopSuppression else { return }
        NavigationPopGestureSuppression.release(from: self, source: "MindMapWK")
        isRetainingPopSuppression = false
    }

    deinit {
        if isRetainingPopSuppression {
            Log.popGesture.warning("MindMapWK deinit still retaining — releasing")
            NavigationPopGestureSuppression.release(from: nil, source: "MindMapWK.deinit")
        }
    }
}
