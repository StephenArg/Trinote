import SwiftUI
import WebKit

struct MermaidNoteView: View {
    let source: String

    @State private var contentHeight: CGFloat = 200

    var body: some View {
        MermaidWebView(source: source, onHeightChanged: { contentHeight = $0 })
            .frame(height: contentHeight)
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
        webView.scrollView.isScrollEnabled = false
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
        private var injected = false

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "mermaidReady":
                injectSource()
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

        private func injectSource() {
            guard !injected, let webView else { return }
            injected = true

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
