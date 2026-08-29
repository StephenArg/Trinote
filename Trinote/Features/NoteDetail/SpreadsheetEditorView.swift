import SwiftUI
import WebKit

/// Observable bridge that lets the parent view pull the current workbook JSON out of
/// the embedded Univer Sheets editor on demand.
final class SpreadsheetEditorBridge: ObservableObject {
    fileprivate weak var coordinator: SpreadsheetEditorView.Coordinator?

    /// Returns the full Univer workbook JSON wrapped in Trilium's `{ version, workbook }`
    /// envelope, ready to upload via `NoteDetailViewModel.saveSpreadsheetContent`.
    func getWorkbook(completion: @escaping (String) -> Void) {
        guard let coordinator else {
            completion("")
            return
        }
        coordinator.getWorkbook(completion: completion)
    }
}

/// Hosts the Univer Sheets editor inside a WKWebView. Mobile UI plugins (selected in the
/// JS bundle's plugin registration) make dragging scroll the viewport instead of selecting
/// cells — the main mobile-Safari pain point users had hit before this view existed.
struct SpreadsheetEditorView: UIViewRepresentable {
    let initialJSON: String
    let bridge: SpreadsheetEditorBridge
    var colorScheme: ColorScheme
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?
    var onWorkbookChanged: (() -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(initialJSON: initialJSON, onWorkbookChanged: onWorkbookChanged)
    }

    func makeUIView(context: Context) -> WKWebView {
        let coordinator = context.coordinator
        bridge.coordinator = coordinator

        let contentController = WKUserContentController()
        contentController.add(coordinator, name: "univerReady")
        contentController.add(coordinator, name: "workbookChanged")
        contentController.add(coordinator, name: "univerLog")
        contentController.add(coordinator, name: "trinoteImageRequest")

        let consoleScript = WKUserScript(source: """
            (function() {
                var origLog = console.log, origErr = console.error, origWarn = console.warn;
                function send(level, args) {
                    try { window.webkit.messageHandlers.univerLog.postMessage(level + ': ' + Array.from(args).join(' ')); } catch(e) {}
                }
                console.log = function() { send('LOG', arguments); origLog.apply(console, arguments); };
                console.error = function() { send('ERROR', arguments); origErr.apply(console, arguments); };
                console.warn = function() { send('WARN', arguments); origWarn.apply(console, arguments); };
            })();
            """, injectionTime: .atDocumentStart, forMainFrameOnly: true)
        contentController.addUserScript(consoleScript)
        let isDark = colorScheme == .dark
        let themeScript = WKUserScript(source: """
            (function() {
                var on = \(isDark ? "true" : "false");
                document.documentElement.classList.toggle('univer-dark', on);
                document.documentElement.style.colorScheme = on ? 'dark' : 'light';
                if (document.body) {
                    document.body.classList.toggle('univer-dark', on);
                    document.body.style.colorScheme = on ? 'dark' : 'light';
                }
            })();
            """, injectionTime: .atDocumentStart, forMainFrameOnly: true)
        contentController.addUserScript(themeScript)

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        if let imageBytes {
            config.setURLSchemeHandler(
                TriliumImageSchemeHandler(provider: imageBytes),
                forURLScheme: TriliumImageScheme.scheme
            )
        }

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = coordinator
        webView.isOpaque = true
        webView.backgroundColor = UIColor.trinoteSpreadsheetBackground
        webView.scrollView.backgroundColor = UIColor.trinoteSpreadsheetBackground
        if #available(iOS 15.0, *) {
            webView.underPageBackgroundColor = UIColor.trinoteSpreadsheetBackground
        }
        // Univer drives its own pan/zoom via the mobile sheets scroll controller —
        // letting WKWebView's own scroll view intercept touches fights with it.
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
        coordinator.imageBytes = imageBytes
        coordinator.lastAppliedDarkMode = (colorScheme == .dark)

        if let fileURL = Bundle.main.url(forResource: "univer-editor", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        } else {
            Log.api.error("Univer editor HTML not found in app bundle")
        }

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.onWorkbookChanged = onWorkbookChanged
        context.coordinator.imageBytes = imageBytes
        context.coordinator.applyDarkModeIfChanged(colorScheme == .dark)
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "univerReady")
        uc.removeScriptMessageHandler(forName: "workbookChanged")
        uc.removeScriptMessageHandler(forName: "univerLog")
        uc.removeScriptMessageHandler(forName: "trinoteImageRequest")
    }

    // MARK: - Coordinator

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var onWorkbookChanged: (() -> Void)?
        var imageBytes: TriliumImageSchemeHandler.ByteProvider?
        var lastAppliedDarkMode: Bool = false

        private let initialJSON: String
        private var univerReady = false

        init(initialJSON: String, onWorkbookChanged: (() -> Void)?) {
            self.initialJSON = initialJSON
            self.onWorkbookChanged = onWorkbookChanged
        }

        private func editorWorkbookJSON(from canonicalJSON: String) -> String {
            SpreadsheetWorkbookImageURLs.decorateForEditor(canonicalJSON)
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "univerReady":
                univerReady = true
                Log.api.info("Univer editor ready")
                loadWorkbook(initialJSON)
                applyDarkMode(lastAppliedDarkMode)

            case "workbookChanged":
                DispatchQueue.main.async { [weak self] in
                    self?.onWorkbookChanged?()
                }

            case "univerLog":
                if let msg = message.body as? String {
                    if msg.localizedCaseInsensitiveContains("error") {
                        Log.api.error("UniverJS: \(msg)")
                    } else if msg.hasPrefix("boot ") {
                        Log.api.info("UniverJS: \(msg)")
                    } else {
                        Log.api.debug("UniverJS: \(msg)")
                    }
                }

            case "trinoteImageRequest":
                guard let body = message.body as? [String: Any],
                      let id = body["id"] as? String,
                      let url = body["url"] as? String else { break }
                Log.api.debug("Univer image request id=\(id) url=\(url)")
                Task { @MainActor [weak self] in
                    await self?.resolveNativeImageRequest(id: id, url: url)
                }

            default:
                break
            }
        }

        @MainActor
        private func resolveNativeImageRequest(id: String, url: String) async {
            guard let webView else { return }
            let dataURL = await Self.dataURL(forImageURL: url, imageBytes: imageBytes)
            if dataURL == nil {
                Log.api.error("Univer image unavailable id=\(id) url=\(url) hasProvider=\(self.imageBytes != nil)")
            }
            // `callAsyncJavaScript` binds dictionary keys as named locals (`id`, `dataUrl`, `error`),
            // not as `arguments.id`.
            var arguments: [String: Any] = ["id": id]
            if let dataURL {
                arguments["dataUrl"] = dataURL
                arguments["error"] = NSNull()
            } else {
                arguments["dataUrl"] = NSNull()
                arguments["error"] = "image unavailable"
            }
            webView.callAsyncJavaScript(
                "window.__trinoteResolveImage(id, dataUrl, error);",
                arguments: arguments,
                in: nil,
                in: .page
            ) { result in
                if case .failure(let error) = result {
                    Log.api.error("trinoteImageRequest callback failed: \(error)")
                }
            }
        }

        private static func dataURL(
            forImageURL urlString: String,
            imageBytes: TriliumImageSchemeHandler.ByteProvider?
        ) async -> String? {
            if urlString.hasPrefix("data:") { return urlString }

            let reference: (routeType: String, entityId: String)?
            if let schemeRef = TriliumImageScheme.reference(fromURLString: urlString) {
                reference = schemeRef
            } else if let parsed = TriliumAttachmentURLParser.entityReference(in: urlString) {
                reference = parsed
            } else {
                reference = nil
            }

            guard let reference, let imageBytes else { return nil }
            guard let data = await imageBytes(reference.routeType, reference.entityId),
                  data.isPlausibleInlineImagePayload else { return nil }
            return "data:\(data.detectImageMIME());base64,\(data.base64EncodedString())"
        }

        func loadWorkbook(_ json: String) {
            guard univerReady, let webView else { return }
            let payload = json.isEmpty ? "{}" : editorWorkbookJSON(from: json)
            webView.callAsyncJavaScript(
                "return await window.univerBridge.loadWorkbook(json);",
                arguments: ["json": payload],
                in: nil,
                in: .page
            ) { result in
                if case .failure(let error) = result {
                    Log.api.error("Failed to load Univer workbook: \(error)")
                }
            }
        }

        func getWorkbook(completion: @escaping (String) -> Void) {
            guard univerReady, let webView else {
                completion("")
                return
            }
            let js = "return window.univerBridge.getWorkbook();"
            webView.callAsyncJavaScript(js, arguments: [:], in: nil, in: .page) { result in
                switch result {
                case .success(let value):
                    completion((value as? String) ?? "")
                case .failure(let error):
                    Log.api.error("getWorkbook failed: \(error)")
                    completion("")
                }
            }
        }

        func applyDarkModeIfChanged(_ on: Bool) {
            guard on != lastAppliedDarkMode else { return }
            lastAppliedDarkMode = on
            applyDarkMode(on)
        }

        private func applyDarkMode(_ on: Bool) {
            guard univerReady, let webView else { return }
            webView.evaluateJavaScript("window.univerBridge.setDarkMode(\(on ? "true" : "false"));")
        }

        // MARK: - Navigation

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
            Log.api.error("Univer WKWebView navigation failed: \(error)")
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            Log.api.error("Univer WKWebView provisional navigation failed: \(error)")
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            Log.api.info("Univer WKWebView finished loading univer-editor.html")
        }
    }
}

extension UIColor {
    static var trinoteSpreadsheetBackground: UIColor {
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
