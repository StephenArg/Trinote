import SwiftUI
import WebKit
import ObjectiveC

struct RichTextEditorView: UIViewRepresentable {
    let initialHTML: String
    var onContentChanged: ((String) -> Void)?
    var onPickImage: (() -> Void)?
    @Binding var imageToInsert: String?

    func makeCoordinator() -> Coordinator {
        Coordinator(initialHTML: initialHTML, onContentChanged: onContentChanged, onPickImage: onPickImage)
    }

    func makeUIView(context: Context) -> WKWebView {
        let coordinator = context.coordinator
        let contentController = WKUserContentController()
        contentController.add(coordinator, name: "editorReady")
        contentController.add(coordinator, name: "contentChanged")
        contentController.add(coordinator, name: "pickImage")

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = coordinator
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.keyboardDismissMode = .interactive
        webView.scrollView.alwaysBounceVertical = true

        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }

        coordinator.webView = webView
        Self.removeInputAccessoryView(from: webView)

        if let fileURL = Bundle.main.url(forResource: "editor", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let coordinator = context.coordinator
        coordinator.onContentChanged = onContentChanged
        coordinator.onPickImage = onPickImage

        if let dataUri = imageToInsert {
            coordinator.insertImage(dataUri)
            DispatchQueue.main.async { self.imageToInsert = nil }
        }
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "editorReady")
        uc.removeScriptMessageHandler(forName: "contentChanged")
        uc.removeScriptMessageHandler(forName: "pickImage")
    }

    // MARK: - Remove iOS form navigation bar (up/down/done)

    private static func removeInputAccessoryView(from webView: WKWebView) {
        guard let contentView = webView.scrollView.subviews.first(where: {
            String(describing: type(of: $0)).hasPrefix("WKContent")
        }) else { return }

        let targetClass: AnyClass = type(of: contentView)
        let childName = "_TriliumNoAccessory_\(NSStringFromClass(targetClass))"

        if let existing = NSClassFromString(childName) {
            object_setClass(contentView, existing)
            return
        }

        guard let subclass = objc_allocateClassPair(targetClass, childName, 0) else { return }

        let selector = #selector(getter: UIResponder.inputAccessoryView)
        let block: @convention(block) (AnyObject) -> AnyObject? = { _ in nil }
        let imp = imp_implementationWithBlock(block)
        let types = method_getTypeEncoding(class_getInstanceMethod(UIResponder.self, selector)!)
        class_addMethod(subclass, selector, imp, types)

        objc_registerClassPair(subclass)
        object_setClass(contentView, subclass)
    }

    // MARK: - Coordinator

    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var onContentChanged: ((String) -> Void)?
        var onPickImage: (() -> Void)?
        private let initialHTML: String
        private var editorReady = false
        private var pendingContent: String?

        init(initialHTML: String, onContentChanged: ((String) -> Void)?, onPickImage: (() -> Void)?) {
            self.initialHTML = initialHTML
            self.onContentChanged = onContentChanged
            self.onPickImage = onPickImage
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "editorReady":
                editorReady = true
                let html = pendingContent ?? initialHTML
                setContent(html)
                pendingContent = nil

            case "contentChanged":
                if let html = message.body as? String {
                    onContentChanged?(html)
                }

            case "pickImage":
                onPickImage?()

            default:
                break
            }
        }

        func setContent(_ html: String) {
            guard editorReady, let webView else {
                pendingContent = html
                return
            }
            let escaped = html
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "`", with: "\\`")
                .replacingOccurrences(of: "${", with: "\\${")
            webView.evaluateJavaScript("window.editorBridge.setContent(`\(escaped)`);") { _, error in
                if let error { Log.api.error("Failed to set editor content: \(error)") }
            }
        }

        func insertImage(_ dataUri: String) {
            guard editorReady, let webView else { return }
            let escaped = dataUri
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
            webView.evaluateJavaScript("window.editorBridge.insertImage('\(escaped)');") { _, error in
                if let error { Log.api.error("Failed to insert image: \(error)") }
            }
        }

        func getContent(completion: @escaping (String?) -> Void) {
            guard editorReady, let webView else { completion(nil); return }
            webView.evaluateJavaScript("window.editorBridge.getContent()") { result, _ in
                completion(result as? String)
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
    }
}
