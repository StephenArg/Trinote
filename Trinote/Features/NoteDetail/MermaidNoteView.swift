import SwiftUI
import WebKit

struct MermaidNoteView: View {
    let source: String

    @State private var contentHeight: CGFloat = 200
    /// Visible height of the enclosing note `ScrollView` — used as the body min height so pinch-zoom has room.
    @State private var viewportHeight: CGFloat = 0

    /// At least the on-screen note viewport; grow if the rendered diagram is taller.
    private var bodyHeight: CGFloat {
        let minH = viewportHeight > 1 ? viewportHeight : contentHeight
        return max(contentHeight, minH)
    }

    var body: some View {
        MermaidWebView(source: source, onHeightChanged: { contentHeight = $0 })
            .frame(minHeight: bodyHeight)
            .frame(height: bodyHeight)
            .background {
                EnclosingScrollViewportHeightReader { height in
                    if abs(height - viewportHeight) > 0.5 {
                        viewportHeight = height
                    }
                }
            }
    }
}

private struct MermaidWebView: UIViewRepresentable {
    let source: String
    var onHeightChanged: ((CGFloat) -> Void)?

    func makeUIView(context: Context) -> WKWebView {
        let uc = WKUserContentController()
        uc.add(context.coordinator, name: "heightUpdate")
        uc.add(context.coordinator, name: "mermaidReady")
        let config = WKWebViewConfiguration()
        config.userContentController = uc
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        // Allow panning once the user pinch-zooms; initial render still uses natural diagram size.
        webView.scrollView.isScrollEnabled = true
        webView.scrollView.bounces = false
        webView.scrollView.backgroundColor = .clear
        context.coordinator.source = source
        context.coordinator.onHeightChanged = onHeightChanged
        context.coordinator.webView = webView

        if let fileURL = Bundle.main.url(forResource: "mermaid-viewer", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.onHeightChanged = onHeightChanged
        context.coordinator.source = source
        // SwiftUI re-runs `updateUIView` whenever `source` changes (e.g. after pull-to-refresh
        // republishes `vm.contentString`). If the embedded mermaid runtime is already initialized
        // we have to re-invoke `mermaidViewer.render` ourselves — otherwise the WKWebView keeps
        // showing the previously rendered diagram.
        context.coordinator.renderIfNeeded()
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "heightUpdate")
        uc.removeScriptMessageHandler(forName: "mermaidReady")
    }

    func makeCoordinator() -> Coordinator { Coordinator() }

    class Coordinator: NSObject, WKScriptMessageHandler {
        var source: String = ""
        var onHeightChanged: ((CGFloat) -> Void)?
        weak var webView: WKWebView?
        /// Flipped to `true` once `mermaid-viewer.html` finishes loading the bundled Mermaid runtime
        /// and posts `mermaidReady`. Until then, render requests are deferred (they will be replayed
        /// from the ready handler).
        private var isReady = false
        /// Last source we successfully handed off to `mermaidViewer.render`. Used to suppress no-op
        /// re-renders when SwiftUI runs `updateUIView` for unrelated reasons (height callback swaps,
        /// theme changes propagating from the parent, etc.).
        private var lastRenderedSource: String?

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "mermaidReady":
                isReady = true
                renderIfNeeded()
            case "heightUpdate":
                if let str = message.body as? String, let h = Double(str), h > 0 {
                    DispatchQueue.main.async {
                        self.onHeightChanged?(CGFloat(h))
                    }
                }
            default:
                break
            }
        }

        /// Pushes `source` into the WKWebView via `window.mermaidViewer.render(...)`, but only when
        /// the runtime is initialized and the source actually changed. Safe to call from both the
        /// `mermaidReady` event (first paint) and `updateUIView` (subsequent prop changes).
        func renderIfNeeded() {
            guard isReady, let webView else { return }
            guard source != lastRenderedSource else { return }
            lastRenderedSource = source

            let escaped = source
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")

            let js = "window.mermaidViewer.render('\(escaped)');"
            webView.evaluateJavaScript(js) { _, error in
                if let error {
                    Log.api.error("Failed to inject Mermaid source: \(error)")
                }
            }
        }
    }
}
