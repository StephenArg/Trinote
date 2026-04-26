import SwiftUI
import WebKit
import ObjectiveC

enum RichTextEditorBridgeRequest: Equatable {
    case pickIncludeNote
    case resolveNoteTitle(noteId: String)
    case openNote(noteId: String)
    /// Stable id from the TipTap NodeView; native resolves HTML and calls `applyIncludeNotePreviewJSON` for that host only.
    case includePreview(previewId: String, noteId: String, boxSize: String)
}

struct RichTextEditorView: UIViewRepresentable {
    let initialHTML: String
    var onContentChanged: ((String) -> Void)?
    var onPickImage: (() -> Void)?
    /// `#editor-container` scroll metrics: `scrollTop` increases when scrolling down; `verticallyScrollable` is false when the body fits without scrolling.
    var onEditorScroll: ((CGFloat, Bool) -> Void)?
    /// Fires on user edits (throttled in JS to ~1/frame) so native UI can react before debounced `contentChanged`.
    var onTypingActivity: (() -> Void)?
    /// Called when the table context toolbar shows or hides.
    var onTableToolsVisibilityChanged: ((Bool) -> Void)?
    /// Called when the in-editor save button (e.g. on the table toolbar) is tapped, with fresh HTML and editor scroll fraction (0–1).
    /// `html` is nil when JS serialization failed (`html: null` in the bridge payload).
    var onRequestSave: ((String?, CGFloat) -> Void)?
    /// Include-note toolbar / node view → native (picker, title resolution, open linked note).
    var onEditorBridgeRequest: ((RichTextEditorBridgeRequest) -> Void)?
    @Binding var imageToInsert: String?
    /// Optional binding so the parent view can hold a reference to the underlying WKWebView
    /// (e.g. to call `evaluateJavaScript` for fetching fresh editor content before save).
    var webViewBinding: Binding<WKWebView?>?
    /// Fraction (0–1) the read-only view was scrolled; the editor scrolls to this position after loading.
    var initialScrollFraction: CGFloat = 0

    func makeCoordinator() -> Coordinator {
        Coordinator(
            initialHTML: initialHTML,
            onContentChanged: onContentChanged,
            onPickImage: onPickImage,
            onEditorScroll: onEditorScroll,
            onTypingActivity: onTypingActivity,
            onTableToolsVisibilityChanged: onTableToolsVisibilityChanged,
            onRequestSave: onRequestSave,
            onEditorBridgeRequest: onEditorBridgeRequest,
            initialScrollFraction: initialScrollFraction
        )
    }

    func makeUIView(context: Context) -> WKWebView {
        let coordinator = context.coordinator
        let contentController = WKUserContentController()
        contentController.add(coordinator, name: "editorReady")
        contentController.add(coordinator, name: "contentChanged")
        contentController.add(coordinator, name: "pickImage")
        contentController.add(coordinator, name: "editorScroll")
        contentController.add(coordinator, name: "editorTypingActivity")
        contentController.add(coordinator, name: "tableToolsVisible")
        contentController.add(coordinator, name: "requestSave")
        contentController.add(coordinator, name: "editorRequest")
        contentController.add(coordinator, name: "debugLog")

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
        coordinator.startKeyboardToolbarGapTracking()
        Self.removeInputAccessoryView(from: webView)

        if let binding = webViewBinding {
            DispatchQueue.main.async { binding.wrappedValue = webView }
        }

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
        coordinator.onTypingActivity = onTypingActivity
        coordinator.onTableToolsVisibilityChanged = onTableToolsVisibilityChanged
        coordinator.onRequestSave = onRequestSave
        coordinator.onEditorBridgeRequest = onEditorBridgeRequest
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
        coordinator.stopKeyboardToolbarGapTracking()
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "editorReady")
        uc.removeScriptMessageHandler(forName: "contentChanged")
        uc.removeScriptMessageHandler(forName: "pickImage")
        uc.removeScriptMessageHandler(forName: "editorScroll")
        uc.removeScriptMessageHandler(forName: "editorTypingActivity")
        uc.removeScriptMessageHandler(forName: "tableToolsVisible")
        uc.removeScriptMessageHandler(forName: "requestSave")
        uc.removeScriptMessageHandler(forName: "editorRequest")
        uc.removeScriptMessageHandler(forName: "debugLog")
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
        var onTypingActivity: (() -> Void)?
        var onTableToolsVisibilityChanged: ((Bool) -> Void)?
        var onRequestSave: ((String?, CGFloat) -> Void)?
        var onEditorBridgeRequest: ((RichTextEditorBridgeRequest) -> Void)?
        private let initialHTML: String
        private var editorReady = false
        private var pendingContent: String?
        private var keyboardToolbarGapObservers: [NSObjectProtocol] = []
        private var pendingKeyboardToolbarGapPoints: CGFloat?
        private let initialScrollFraction: CGFloat

        /// Visual gap between HTML formatting toolbar and keyboard (CSS px ≈ points in WKWebView).
        private static let keyboardToolbarGapPoints: CGFloat = 10
        /// Minimum intersection height (points) of keyboard frame with the web view before showing the gap.
        private static let keyboardOverlapThreshold: CGFloat = 60

        init(
            initialHTML: String,
            onContentChanged: ((String) -> Void)?,
            onPickImage: (() -> Void)?,
            onEditorScroll: ((CGFloat, Bool) -> Void)?,
            onTypingActivity: (() -> Void)? = nil,
            onTableToolsVisibilityChanged: ((Bool) -> Void)? = nil,
            onRequestSave: ((String?, CGFloat) -> Void)? = nil,
            onEditorBridgeRequest: ((RichTextEditorBridgeRequest) -> Void)? = nil,
            initialScrollFraction: CGFloat = 0
        ) {
            self.initialHTML = initialHTML
            self.onContentChanged = onContentChanged
            self.onPickImage = onPickImage
            self.onEditorScroll = onEditorScroll
            self.onTypingActivity = onTypingActivity
            self.onTableToolsVisibilityChanged = onTableToolsVisibilityChanged
            self.onRequestSave = onRequestSave
            self.onEditorBridgeRequest = onEditorBridgeRequest
            self.initialScrollFraction = initialScrollFraction
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "editorReady":
                let html = pendingContent ?? initialHTML
                pendingContent = nil
                editorReady = true
                setContent(html)
                setKeyboardToolbarGap(pendingKeyboardToolbarGapPoints ?? 0)
                pendingKeyboardToolbarGapPoints = nil
                if initialScrollFraction > 0 {
                    scrollToFraction(initialScrollFraction)
                }

            case "contentChanged":
                if let html = message.body as? String {
                    onContentChanged?(html)
                }

            case "pickImage":
                onPickImage?()

            case "editorTypingActivity":
                let callback = onTypingActivity
                DispatchQueue.main.async {
                    callback?()
                }

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

            case "tableToolsVisible":
                let visible = (message.body as? Bool) == true
                let callback = onTableToolsVisibilityChanged
                DispatchQueue.main.async {
                    callback?(visible)
                }

            case "requestSave":
                let html: String?
                let scrollFraction: CGFloat
                if let dict = message.body as? [String: Any] {
                    switch dict["html"] {
                    case is NSNull, nil:
                        html = nil
                    case let s as String:
                        html = s
                    default:
                        html = nil
                    }
                    if let n = dict["scrollFraction"] as? NSNumber {
                        scrollFraction = CGFloat(truncating: n)
                    } else if let d = dict["scrollFraction"] as? Double {
                        scrollFraction = CGFloat(d)
                    } else {
                        scrollFraction = 0
                    }
                } else if let s = message.body as? String {
                    html = s
                    scrollFraction = 0
                } else {
                    html = nil
                    scrollFraction = 0
                }
                if let callback = onRequestSave {
                    DispatchQueue.main.async { callback(html, scrollFraction) }
                }

            case "debugLog":
                if let msg = message.body as? String {
                    Log.ui.debug("[EDITOR-JS] \(msg, privacy: .public)")
                }

            case "editorRequest":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let action = dict["action"] as? String else { break }
                let callback = onEditorBridgeRequest
                switch action {
                case "pickIncludeNote":
                    DispatchQueue.main.async { callback?(.pickIncludeNote) }
                case "resolveNoteTitle":
                    if let nid = dict["noteId"] as? String, !nid.isEmpty {
                        DispatchQueue.main.async { callback?(.resolveNoteTitle(noteId: nid)) }
                    }
                case "openNote":
                    if let nid = dict["noteId"] as? String, !nid.isEmpty {
                        DispatchQueue.main.async { callback?(.openNote(noteId: nid)) }
                    }
                case "includePreview":
                    if let previewId = dict["previewId"] as? String, !previewId.isEmpty,
                       let nid = dict["noteId"] as? String, !nid.isEmpty {
                        let rawBox = (dict["boxSize"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
                        let boxSize = rawBox.isEmpty ? "medium" : rawBox
                        DispatchQueue.main.async {
                            callback?(.includePreview(previewId: previewId, noteId: nid, boxSize: boxSize))
                        }
                    }
                default:
                    break
                }

            default:
                break
            }
        }

        private static func dictionaryFromScriptMessageBody(_ body: Any) -> [String: Any]? {
            if let d = body as? [String: Any] { return d }
            guard let ns = body as? [AnyHashable: Any] else { return nil }
            var out: [String: Any] = [:]
            for (k, v) in ns {
                if let s = k as? String { out[s] = v }
                else if let s = k as? NSString { out[s as String] = v }
            }
            return out
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

        func scrollToFraction(_ fraction: CGFloat) {
            guard editorReady, let webView else { return }
            let clamped = min(max(fraction, 0), 1)
            webView.evaluateJavaScript("window.editorBridge.scrollToFraction(\(clamped));") { _, error in
                if let error { Log.api.error("scrollToFraction failed: \(error)") }
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

        func startKeyboardToolbarGapTracking() {
            guard keyboardToolbarGapObservers.isEmpty else { return }
            let center = NotificationCenter.default
            keyboardToolbarGapObservers.append(
                center.addObserver(forName: UIResponder.keyboardWillChangeFrameNotification, object: nil, queue: .main) { [weak self] note in
                    self?.syncKeyboardToolbarGap(notification: note)
                }
            )
            keyboardToolbarGapObservers.append(
                center.addObserver(forName: UIResponder.keyboardWillHideNotification, object: nil, queue: .main) { [weak self] _ in
                    self?.setKeyboardToolbarGap(0)
                }
            )
        }

        func stopKeyboardToolbarGapTracking() {
            keyboardToolbarGapObservers.forEach { NotificationCenter.default.removeObserver($0) }
            keyboardToolbarGapObservers.removeAll()
            guard let webView, editorReady else { return }
            webView.evaluateJavaScript("window.editorBridge.setKeyboardToolbarGap(0)", completionHandler: nil)
        }

        private func syncKeyboardToolbarGap(notification: Notification) {
            guard let webView else { return }
            guard let frame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else { return }
            let keyboardInWebView = webView.convert(frame, from: nil)
            let overlap = webView.bounds.intersection(keyboardInWebView).height
            let gap = overlap > Self.keyboardOverlapThreshold ? Self.keyboardToolbarGapPoints : 0
            setKeyboardToolbarGap(gap)
        }

        private func setKeyboardToolbarGap(_ gapPoints: CGFloat) {
            let clamped = max(0, min(32, gapPoints))
            guard editorReady, let webView else {
                pendingKeyboardToolbarGapPoints = clamped
                return
            }
            let px = Int(clamped.rounded())
            webView.evaluateJavaScript("window.editorBridge.setKeyboardToolbarGap(\(px))") { _, error in
                if let error { Log.api.error("setKeyboardToolbarGap failed: \(error)") }
            }
        }

        /// Same rule as read-only `HTMLNoteView`: `#/<id>` or `#root/…/<id>` → last path segment.
        private static func noteIdFromTriliumHashLink(url: URL) -> String? {
            guard var frag = url.fragment, !frag.isEmpty else { return nil }
            frag = frag.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
            let parts = frag.split(separator: "/").map(String.init).filter { !$0.isEmpty }
            guard let last = parts.last else { return nil }
            if last == "root" { return nil }
            return last
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction) async -> WKNavigationActionPolicy {
            guard navigationAction.navigationType == .linkActivated,
                  let url = navigationAction.request.url
            else { return .allow }

            if url.scheme?.lowercased() == "triliuminclude", url.host?.lowercased() == "file" {
                let path = url.path.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
                let segs = path.split(separator: "/").map(String.init).filter { !$0.isEmpty }
                if let nid = segs.first, !nid.isEmpty {
                    let callback = onEditorBridgeRequest
                    DispatchQueue.main.async { callback?(.openNote(noteId: nid)) }
                    return .cancel
                }
            }

            let urlString = url.absoluteString
            if urlString.contains("#/") || urlString.localizedCaseInsensitiveContains("#root/") {
                if let noteId = Self.noteIdFromTriliumHashLink(url: url), !noteId.isEmpty {
                    let callback = onEditorBridgeRequest
                    DispatchQueue.main.async { callback?(.openNote(noteId: noteId)) }
                    return .cancel
                }
            }

            if url.scheme == "http" || url.scheme == "https" {
                await UIApplication.shared.open(url)
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
