import SwiftUI
import WebKit

struct MindMapNoteView: View {
    let json: String

    var body: some View {
        MindMapWebView(json: json)
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
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.minimumZoomScale = 1.0
        webView.scrollView.maximumZoomScale = 1.0
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
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "mindmapViewerReady")
    }

    class Coordinator: NSObject, WKScriptMessageHandler {
        var json: String = ""
        weak var webView: WKWebView?
        private var injected = false

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "mindmapViewerReady" {
                injectData()
            }
        }

        private func injectData() {
            guard !injected, let webView else { return }
            injected = true

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
