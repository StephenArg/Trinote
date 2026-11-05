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
    /// Serves `trinote-img://` photos rewritten from Trilium `api/attachments` / `api/images` URLs.
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?
    /// The note's newest saved map (Autosave updates it), shown if the page reloads after its process ended.
    var currentJSON: (() -> String)?

    var body: some View {
        MindMapEditorWebView(
            initialJSON: initialJSON,
            bridge: bridge,
            onMapChanged: onMapChanged,
            imageBytes: imageBytes,
            currentJSON: currentJSON
        )
            .background {
                NavigationPopGestureBlocker(blocked: true)
            }
    }
}

private struct MindMapEditorWebView: UIViewRepresentable {
    let initialJSON: String
    let bridge: MindMapEditorBridge
    var onMapChanged: (() -> Void)?
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?
    var currentJSON: (() -> String)?

    func makeCoordinator() -> Coordinator {
        let coordinator = Coordinator(initialJSON: initialJSON, onMapChanged: onMapChanged)
        coordinator.currentJSON = currentJSON
        return coordinator
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
        if let imageBytes {
            let schemeHandler = TriliumImageSchemeHandler(provider: imageBytes)
            config.setURLSchemeHandler(schemeHandler, forURLScheme: TriliumImageScheme.scheme)
            coordinator.imageSchemeHandler = schemeHandler
        }

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
        webView.applyTrinoteAppearanceMode()

        if let fileURL = Bundle.main.url(forResource: "mindmap-editor", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        webView.applyTrinoteAppearanceMode()
        context.coordinator.onMapChanged = onMapChanged
        context.coordinator.currentJSON = currentJSON
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
        /// Held so the handler outlives the configuration that registered it.
        var imageSchemeHandler: TriliumImageSchemeHandler?
        var currentJSON: (() -> String)?
        private let initialJSON: String
        private var editorReady = false
        private var isRecovering = false
        private let processRecovery = WebContentProcessRecovery(label: "Mind map editor")

        init(initialJSON: String, onMapChanged: (() -> Void)?) {
            self.initialJSON = initialJSON
            self.onMapChanged = onMapChanged
        }

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "mindmapEditorReady":
                editorReady = true
                let recovering = isRecovering
                isRecovering = false
                loadData(EditorReloadRecovery.content(
                    pending: nil,
                    latest: recovering ? currentJSON?() : nil,
                    initial: initialJSON
                ))
            case "mindmapChanged":
                DispatchQueue.main.async { [weak self] in
                    self?.onMapChanged?()
                }
            default:
                break
            }
        }

        /// iOS ended the page's process (see `EditorReloadRecovery`). Until the reloaded page is ready again the
        /// bridge hands back a placeholder, which saving ignores.
        func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
            editorReady = false
            isRecovering = true
            processRecovery.pageProcessEnded { [weak webView] in
                guard let webView, let fileURL = Bundle.main.url(forResource: "mindmap-editor", withExtension: "html") else { return }
                webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
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
