import SwiftUI
import WebKit

final class MindMapEditorBridge: ObservableObject {
    fileprivate weak var coordinator: MindMapEditorWebView.Coordinator?

    func getMapData(completion: @escaping (_ json: String) -> Void) {
        guard let coordinator else {
            completion("{}")
            return
        }
        coordinator.getMapData(completion: completion)
    }
}

struct MindMapEditorView: View {
    let initialJSON: String
    let bridge: MindMapEditorBridge
    var onMapChanged: (() -> Void)?

    var body: some View {
        MindMapEditorWebView(initialJSON: initialJSON, bridge: bridge, onMapChanged: onMapChanged)
            .background {
                NavigationPopGestureBlocker(blocked: true, label: "MindMapEditor")
            }
    }
}

private struct MindMapEditorWebView: UIViewRepresentable {
    let initialJSON: String
    let bridge: MindMapEditorBridge
    var onMapChanged: (() -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(initialJSON: initialJSON, onMapChanged: onMapChanged)
    }

    func makeUIView(context: Context) -> WKWebView {
        let coordinator = context.coordinator
        bridge.coordinator = coordinator

        let uc = WKUserContentController()
        uc.add(coordinator, name: "mindmapEditorReady")
        uc.add(coordinator, name: "mindmapChanged")

        let config = WKWebViewConfiguration()
        config.userContentController = uc
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        let webView = PopGestureSuppressingWKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = coordinator
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
        coordinator.webView = webView

        if let fileURL = Bundle.main.url(forResource: "mindmap-editor", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.onMapChanged = onMapChanged
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "mindmapEditorReady")
        uc.removeScriptMessageHandler(forName: "mindmapChanged")
        (webView as? PopGestureSuppressingWKWebView)?.restoreNavigationPopGesture()
    }

    // MARK: - Coordinator

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var onMapChanged: (() -> Void)?
        private let initialJSON: String
        private var editorReady = false

        init(initialJSON: String, onMapChanged: (() -> Void)?) {
            self.initialJSON = initialJSON
            self.onMapChanged = onMapChanged
        }

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "mindmapEditorReady":
                editorReady = true
                loadData(initialJSON)
            case "mindmapChanged":
                DispatchQueue.main.async { [weak self] in
                    self?.onMapChanged?()
                }
            default:
                break
            }
        }

        func loadData(_ json: String) {
            guard editorReady, let webView else { return }
            let escaped = json
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")
            webView.evaluateJavaScript("window.mindmapEditor.load('\(escaped)');") { _, error in
                if let error { Log.api.error("Failed to load mind map: \(error)") }
            }
        }

        func getMapData(completion: @escaping (_ json: String) -> Void) {
            guard editorReady, let webView else {
                completion("{}")
                return
            }
            let js = "return window.mindmapEditor.getData();"
            webView.callAsyncJavaScript(js, arguments: [:], in: nil, in: .page) { result in
                switch result {
                case .success(let value):
                    if let json = value as? String {
                        completion(json)
                    } else {
                        completion("{}")
                    }
                case .failure(let error):
                    Log.api.error("getMapData failed: \(error)")
                    completion("{}")
                }
            }
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            Log.api.error("MindMap WKWebView navigation failed: \(error)")
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            Log.api.error("MindMap WKWebView provisional navigation failed: \(error)")
        }
    }
}
