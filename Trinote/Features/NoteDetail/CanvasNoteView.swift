import SwiftUI
import WebKit

struct CanvasNoteView: View {
    let noteId: String
    let attachments: [AttachmentItem]
    let client: (any TriliumClientProtocol)?
    let excalidrawJSON: String?

    @State private var svgData: Data?
    @State private var isLoading = true
    @State private var useFallback = false
    @State private var errorMessage: String?
    @State private var contentHeight: CGFloat = 300

    private var svgAttachment: AttachmentItem? {
        attachments.first { $0.title == "canvas-export.svg" && $0.mime == "image/svg+xml" }
    }

    var body: some View {
        Group {
            if isLoading {
                ProgressView("Loading canvas\u{2026}")
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 40)
            } else if let svgData, !useFallback {
                CanvasSVGWebView(svgData: svgData, onHeightChanged: { contentHeight = $0 })
                    .frame(height: contentHeight)
            } else if useFallback, let json = excalidrawJSON, !json.isEmpty {
                ExcalidrawReadOnlyWebView(json: json, onHeightChanged: { contentHeight = $0 })
                    .frame(height: contentHeight)
            } else if let errorMessage {
                ContentUnavailableView {
                    Label("Cannot Display Canvas", systemImage: "exclamationmark.triangle")
                } description: {
                    Text(errorMessage)
                }
            } else {
                ContentUnavailableView {
                    Label("No Preview Available", systemImage: "paintpalette")
                } description: {
                    Text("This canvas note doesn't have a preview yet. Open it in the Trilium web or desktop app to generate one.")
                }
            }
        }
        .task(id: attachments.count) { await loadCanvas() }
    }

    private func loadCanvas() async {
        if let attachment = svgAttachment, let client {
            do {
                let data = try await client.getAttachmentContent(attachment.attachmentId)
                self.svgData = data
                self.useFallback = false
                isLoading = false
                return
            } catch {
                Log.api.error("Failed to load canvas SVG attachment: \(error)")
            }
        }

        if excalidrawJSON != nil, !excalidrawJSON!.isEmpty {
            useFallback = true
        } else if attachments.isEmpty {
            return
        } else {
            errorMessage = "No canvas data available."
        }
        isLoading = false
    }
}

// MARK: - Height-reporting JS snippet

private let heightReportJS = """
function reportHeight() {
    var h = document.body.scrollHeight;
    if (h > 0) window.webkit.messageHandlers.heightUpdate.postMessage(String(h));
}
new ResizeObserver(reportHeight).observe(document.body);
reportHeight();
"""

// MARK: - SVG renderer (preferred, fast)

private struct CanvasSVGWebView: UIViewRepresentable {
    let svgData: Data
    var onHeightChanged: ((CGFloat) -> Void)?

    func makeUIView(context: Context) -> WKWebView {
        let uc = WKUserContentController()
        uc.add(context.coordinator, name: "heightUpdate")
        let config = WKWebViewConfiguration()
        config.userContentController = uc
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.backgroundColor = .clear
        context.coordinator.onHeightChanged = onHeightChanged
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        guard let svgString = String(data: svgData, encoding: .utf8) else { return }

        context.coordinator.onHeightChanged = onHeightChanged

        if context.coordinator.loadedHash == svgData.hashValue { return }
        context.coordinator.loadedHash = svgData.hashValue

        let html = """
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { width: 100%; background: transparent; }
            body { padding: 16px; }
            svg { max-width: 100%; height: auto; display: block; }
            @media (prefers-color-scheme: dark) {
                svg { filter: invert(0.88) hue-rotate(180deg); }
            }
        </style>
        </head>
        <body>
        \(svgString)
        <script>\(heightReportJS)</script>
        </body>
        </html>
        """
        webView.loadHTMLString(html, baseURL: nil)
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "heightUpdate")
    }

    func makeCoordinator() -> Coordinator { Coordinator() }

    class Coordinator: NSObject, WKScriptMessageHandler {
        var loadedHash: Int?
        var onHeightChanged: ((CGFloat) -> Void)?

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "heightUpdate",
               let str = message.body as? String,
               let h = Double(str), h > 0 {
                DispatchQueue.main.async {
                    self.onHeightChanged?(CGFloat(h))
                }
            }
        }
    }
}

// MARK: - Excalidraw fallback renderer (uses @excalidraw/utils to generate SVG)

private struct ExcalidrawReadOnlyWebView: UIViewRepresentable {
    let json: String
    var onHeightChanged: ((CGFloat) -> Void)?

    func makeUIView(context: Context) -> WKWebView {
        let uc = WKUserContentController()
        uc.add(context.coordinator, name: "canvasReady")
        uc.add(context.coordinator, name: "canvasRendered")
        let config = WKWebViewConfiguration()
        config.userContentController = uc
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.backgroundColor = .clear
        context.coordinator.json = json
        context.coordinator.webView = webView
        context.coordinator.onHeightChanged = onHeightChanged

        if let fileURL = Bundle.main.url(forResource: "canvas-viewer", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.json = json
        context.coordinator.onHeightChanged = onHeightChanged
        // Re-paint the Excalidraw scene whenever `json` changes (e.g. pull-to-refresh).
        context.coordinator.renderIfNeeded()
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "canvasReady")
        uc.removeScriptMessageHandler(forName: "canvasRendered")
    }

    func makeCoordinator() -> Coordinator { Coordinator() }

    class Coordinator: NSObject, WKScriptMessageHandler {
        var json: String = ""
        weak var webView: WKWebView?
        var onHeightChanged: ((CGFloat) -> Void)?
        private var isReady = false
        private var lastRenderedJSON: String?

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "canvasReady":
                isReady = true
                renderIfNeeded()
            case "canvasRendered":
                if let str = message.body as? String, let h = Double(str), h > 0 {
                    DispatchQueue.main.async {
                        self.onHeightChanged?(CGFloat(h))
                    }
                }
            default:
                break
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

            let js = "window.canvasViewer.loadScene('\(escaped)');"
            webView.evaluateJavaScript(js) { _, error in
                if let error {
                    Log.api.error("Failed to inject Excalidraw scene: \(error)")
                }
            }
        }
    }
}
