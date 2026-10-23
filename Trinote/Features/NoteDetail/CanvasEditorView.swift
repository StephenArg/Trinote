import SwiftUI
import WebKit

/// Observable bridge that lets the parent view call into the canvas WKWebView.
final class CanvasEditorBridge: ObservableObject {
    fileprivate weak var coordinator: CanvasEditorView.Coordinator?

    func getSceneData(completion: @escaping (_ json: String, _ svg: String) -> Void) {
        guard let coordinator else {
            completion("{}", "")
            return
        }
        coordinator.getSceneData(completion: completion)
    }
}

struct CanvasEditorView: UIViewRepresentable {
    let initialJSON: String
    let bridge: CanvasEditorBridge
    var onSceneChanged: (() -> Void)?
    /// The note's newest saved scene (Autosave updates it), shown if the page reloads after its process ended.
    var currentJSON: (() -> String)?

    func makeCoordinator() -> Coordinator {
        let coordinator = Coordinator(initialJSON: initialJSON, onSceneChanged: onSceneChanged)
        coordinator.currentJSON = currentJSON
        return coordinator
    }

    func makeUIView(context: Context) -> WKWebView {
        let coordinator = context.coordinator
        bridge.coordinator = coordinator

        let contentController = WKUserContentController()
        contentController.add(coordinator, name: "canvasReady")
        contentController.add(coordinator, name: "sceneChanged")
        contentController.add(coordinator, name: "canvasLog")

        // Forward JS console to native logs
        let consoleScript = WKUserScript(source: """
            (function() {
                var origLog = console.log, origErr = console.error, origWarn = console.warn;
                function send(level, args) {
                    try { window.webkit.messageHandlers.canvasLog.postMessage(level + ': ' + Array.from(args).join(' ')); } catch(e) {}
                }
                console.log = function() { send('LOG', arguments); origLog.apply(console, arguments); };
                console.error = function() { send('ERROR', arguments); origErr.apply(console, arguments); };
                console.warn = function() { send('WARN', arguments); origWarn.apply(console, arguments); };
            })();
            """, injectionTime: .atDocumentStart, forMainFrameOnly: true)
        contentController.addUserScript(consoleScript)

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = coordinator
        webView.isOpaque = true
        webView.backgroundColor = UIColor.trinoteCanvasBackground
        webView.scrollView.backgroundColor = UIColor.trinoteCanvasBackground
        if #available(iOS 15.0, *) {
            webView.underPageBackgroundColor = UIColor.trinoteCanvasBackground
        }
        // Excalidraw handles its own pan/zoom gestures
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        webView.scrollView.alwaysBounceVertical = false
        webView.scrollView.alwaysBounceHorizontal = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.scrollView.contentInset = .zero

        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }

        coordinator.webView = webView

        if let fileURL = Bundle.main.url(forResource: "canvas-editor", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.onSceneChanged = onSceneChanged
        context.coordinator.currentJSON = currentJSON
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "canvasReady")
        uc.removeScriptMessageHandler(forName: "sceneChanged")
        uc.removeScriptMessageHandler(forName: "canvasLog")
    }

    // MARK: - Coordinator

    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var onSceneChanged: (() -> Void)?
        var currentJSON: (() -> String)?
        private let initialJSON: String
        private var canvasReady = false
        private var isRecovering = false
        private let processRecovery = WebContentProcessRecovery(label: "Canvas editor")

        init(initialJSON: String, onSceneChanged: (() -> Void)?) {
            self.initialJSON = initialJSON
            self.onSceneChanged = onSceneChanged
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "canvasReady":
                canvasReady = true
                let recovering = isRecovering
                isRecovering = false
                loadScene(EditorReloadRecovery.content(
                    pending: nil,
                    latest: recovering ? currentJSON?() : nil,
                    initial: initialJSON
                ))

            case "sceneChanged":
                DispatchQueue.main.async { [weak self] in
                    self?.onSceneChanged?()
                }

            case "canvasLog":
                if let msg = message.body as? String {
                    Log.api.debug("CanvasJS: \(msg)")
                }

            default:
                break
            }
        }

        /// iOS ended the page's process (see `EditorReloadRecovery`). Until the reloaded page is ready again the
        /// bridge hands back a placeholder, which saving ignores, instead of the empty scene a fresh page has.
        func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
            canvasReady = false
            isRecovering = true
            processRecovery.pageProcessEnded { [weak webView] in
                guard let webView, let fileURL = Bundle.main.url(forResource: "canvas-editor", withExtension: "html") else { return }
                webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
            }
        }

        func loadScene(_ json: String) {
            guard canvasReady, let webView else { return }
            let escaped = json
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")
            webView.evaluateJavaScript("window.canvasBridge.loadScene('\(escaped)');") { _, error in
                if let error { Log.api.error("Failed to load canvas scene: \(error)") }
            }
        }

        func getSceneData(completion: @escaping (_ json: String, _ svg: String) -> Void) {
            guard canvasReady, let webView else {
                completion("{}", "")
                return
            }
            let js = "return await window.canvasBridge.getSceneData();"
            webView.callAsyncJavaScript(js, arguments: [:], in: nil, in: .page) { result in
                switch result {
                case .success(let value):
                    guard let dict = value as? [String: Any],
                          let json = dict["json"] as? String,
                          let svg = dict["svg"] as? String else {
                        completion("{}", "")
                        return
                    }
                    completion(json, svg)
                case .failure(let error):
                    Log.api.error("getSceneData failed: \(error)")
                    completion("{}", "")
                }
            }
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction) async -> WKNavigationActionPolicy {
            if navigationAction.navigationType == .linkActivated {
                if let url = navigationAction.request.url {
                    await UIApplication.shared.open(url)
                }
                return .cancel
            }
            return .allow
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            Log.api.error("Canvas WKWebView navigation failed: \(error)")
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            Log.api.error("Canvas WKWebView provisional navigation failed: \(error)")
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            Log.api.debug("Canvas WKWebView page finished loading")
        }
    }
}

extension UIColor {
    static var trinoteCanvasBackground: UIColor {
        UIColor { traitCollection in
            switch traitCollection.userInterfaceStyle {
            case .dark:
                return UIColor(red: 28 / 255, green: 28 / 255, blue: 30 / 255, alpha: 1)
            default:
                return UIColor(red: 1, green: 1, blue: 1, alpha: 1)
            }
        }
    }
}
