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

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = true

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
        coordinator.lastAppliedDarkMode = (colorScheme == .dark)

        if let fileURL = Bundle.main.url(forResource: "univer-editor", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.onWorkbookChanged = onWorkbookChanged
        context.coordinator.applyDarkModeIfChanged(colorScheme == .dark)
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "univerReady")
        uc.removeScriptMessageHandler(forName: "workbookChanged")
        uc.removeScriptMessageHandler(forName: "univerLog")
    }

    // MARK: - Coordinator

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var onWorkbookChanged: (() -> Void)?
        var lastAppliedDarkMode: Bool = false

        private let initialJSON: String
        private var univerReady = false

        init(initialJSON: String, onWorkbookChanged: (() -> Void)?) {
            self.initialJSON = initialJSON
            self.onWorkbookChanged = onWorkbookChanged
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "univerReady":
                univerReady = true
                loadWorkbook(initialJSON)
                applyDarkMode(lastAppliedDarkMode)

            case "workbookChanged":
                DispatchQueue.main.async { [weak self] in
                    self?.onWorkbookChanged?()
                }

            case "univerLog":
                if let msg = message.body as? String {
                    Log.api.debug("UniverJS: \(msg)")
                }

            default:
                break
            }
        }

        func loadWorkbook(_ json: String) {
            guard univerReady, let webView else { return }
            // Round-trip through JSON-encoded JS string literal to avoid escaping bugs
            // on quotes, backslashes, newlines, and tab characters in cell content.
            let payload = json.isEmpty ? "{}" : json
            let argument: String
            if let data = try? JSONSerialization.data(withJSONObject: [payload], options: []),
               let arrLiteral = String(data: data, encoding: .utf8) {
                // arrLiteral is e.g. `["{\"version\":1,...}"]`; strip the brackets to get a quoted string literal.
                let trimmed = arrLiteral.dropFirst().dropLast()
                argument = String(trimmed)
            } else {
                argument = "''"
            }
            webView.evaluateJavaScript("window.univerBridge.loadWorkbook(\(argument));") { _, error in
                if let error { Log.api.error("Failed to load Univer workbook: \(error)") }
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
