import SwiftUI
import WebKit
import ObjectiveC

struct RichTextEditorView: UIViewRepresentable {
    let initialHTML: String
    var onContentChanged: ((String) -> Void)?
    var onPickImage: (() -> Void)?
    /// `#editor-container` scroll metrics: `scrollTop` increases when scrolling down; `verticallyScrollable` is false when the body fits without scrolling.
    var onEditorScroll: ((CGFloat, Bool) -> Void)?
    @Binding var imageToInsert: String?

    func makeCoordinator() -> Coordinator {
        Coordinator(
            initialHTML: initialHTML,
            onContentChanged: onContentChanged,
            onPickImage: onPickImage,
            onEditorScroll: onEditorScroll
        )
    }

    func makeUIView(context: Context) -> WKWebView {
        let coordinator = context.coordinator
        let contentController = WKUserContentController()
        contentController.add(coordinator, name: "editorReady")
        contentController.add(coordinator, name: "contentChanged")
        contentController.add(coordinator, name: "pickImage")
        contentController.add(coordinator, name: "editorScroll")

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = coordinator
        Self.applyEditorSurfaceColors(to: webView)
        webView.clipsToBounds = false
        webView.scrollView.clipsToBounds = false
        // Scroll only inside the page (#editor-container). If the WKWebView scroll view scrolls,
        // the flex toolbar can be partially clipped / scrolled off-screen.
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        webView.scrollView.alwaysBounceVertical = false
        webView.scrollView.alwaysBounceHorizontal = false
        webView.scrollView.keyboardDismissMode = .interactive
        // Avoid iOS adjusting the scroll view in a way that shears the top few CSS pixels of the page.
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.scrollView.contentInset = .zero
        webView.scrollView.scrollIndicatorInsets = .zero

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
        coordinator.onEditorScroll = onEditorScroll
        Self.applyEditorSurfaceColors(to: webView)

        let sv = webView.scrollView
        if sv.contentOffset != .zero {
            sv.setContentOffset(.zero, animated: false)
        }
        sv.contentInsetAdjustmentBehavior = .never
        sv.contentInset = .zero
        sv.scrollIndicatorInsets = .zero

        if let dataUri = imageToInsert {
            coordinator.insertImage(dataUri)
            DispatchQueue.main.async { self.imageToInsert = nil }
        }
    }

    /// Pixel-match `editor.html` :root `--bg` / `--editor-bg` (not `systemBackground`, which can differ
    /// slightly and show a hairline next to the keyboard’s rounded top edge).
    private static func applyEditorSurfaceColors(to webView: WKWebView) {
        let bg = UIColor.trinoteEditorCanvas
        webView.isOpaque = true
        webView.backgroundColor = bg
        webView.scrollView.backgroundColor = bg
        if #available(iOS 15.0, *) {
            webView.underPageBackgroundColor = bg
        }
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "editorReady")
        uc.removeScriptMessageHandler(forName: "contentChanged")
        uc.removeScriptMessageHandler(forName: "pickImage")
        uc.removeScriptMessageHandler(forName: "editorScroll")
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
        var onEditorScroll: ((CGFloat, Bool) -> Void)?
        private let initialHTML: String
        private var editorReady = false
        private var pendingContent: String?

        init(
            initialHTML: String,
            onContentChanged: ((String) -> Void)?,
            onPickImage: (() -> Void)?,
            onEditorScroll: ((CGFloat, Bool) -> Void)?
        ) {
            self.initialHTML = initialHTML
            self.onContentChanged = onContentChanged
            self.onPickImage = onPickImage
            self.onEditorScroll = onEditorScroll
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

            case "editorScroll":
                var y: CGFloat?
                var verticallyScrollable = true
                if let dict = message.body as? [String: Any] {
                    if let n = dict["scrollTop"] as? NSNumber {
                        y = CGFloat(truncating: n)
                    } else if let d = dict["scrollTop"] as? Double {
                        y = CGFloat(d)
                    }
                    if let b = dict["verticallyScrollable"] as? Bool {
                        verticallyScrollable = b
                    }
                } else if let d = message.body as? Double {
                    y = CGFloat(d)
                } else if let n = message.body as? NSNumber {
                    y = CGFloat(truncating: n)
                }
                if let y {
                    let callback = onEditorScroll
                    DispatchQueue.main.async {
                        callback?(y, verticallyScrollable)
                    }
                }

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

extension UIColor {
    /// Must stay in sync with `editor.html` `:root` / `@media (prefers-color-scheme: dark)`.
    static var trinoteEditorCanvas: UIColor {
        UIColor { traitCollection in
            switch traitCollection.userInterfaceStyle {
            case .dark:
                return UIColor(red: 28 / 255, green: 28 / 255, blue: 30 / 255, alpha: 1) // #1c1c1e
            default:
                return UIColor(red: 1, green: 1, blue: 1, alpha: 1) // #ffffff
            }
        }
    }
}
