import SwiftUI
import WebKit
import ObjectiveC

// MARK: - WKWebView with “Paste URL” when clipboard has both image and URL

final class TrinoteEditorWebView: WKWebView {
    var onAugmentEditMenu: ((UIMenuBuilder) -> Void)?

    override func buildMenu(with builder: UIMenuBuilder) {
        super.buildMenu(with: builder)
        if #available(iOS 16.0, *) {
            onAugmentEditMenu?(builder)
        }
    }
}

enum RichTextEditorBridgeRequest: Equatable {
    case pickIncludeNote
    case resolveNoteTitle(noteId: String)
    case openNote(noteId: String)
    /// Stable id from the TipTap NodeView; native resolves HTML and calls `applyIncludeNotePreviewJSON` for that host only.
    case includePreview(previewId: String, noteId: String, boxSize: String)
    /// Long-press on an attachment chip in the editor; `pos` is the ProseMirror document position.
    case renameAttachment(attachmentId: String, noteId: String, title: String, pos: Int)
}

/// Pending toolbar-style attachment chip to insert once the TipTap bridge is ready.
struct EditorAttachmentInsert: Equatable, Sendable {
    let noteId: String
    let attachmentId: String
    let title: String
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
    /// Non-image file pasted from clipboard → upload as attachment and insert link.
    var onPasteFile: ((Data, String, String) -> Void)?
    @Binding var imageToInsert: String?
    /// When set, inserts an attachment reference chip once the editor is ready (share-import / deferred upload).
    @Binding var attachmentToInsert: EditorAttachmentInsert?
    /// Optional binding so the parent view can hold a reference to the underlying WKWebView
    /// (e.g. to call `evaluateJavaScript` for fetching fresh editor content before save).
    var webViewBinding: Binding<WKWebView?>?
    /// Fraction (0–1) the read-only view was scrolled; the editor scrolls to this position after loading.
    var initialScrollFraction: CGFloat = 0
    /// When `true`, Image–Code block tools live in the top toolbar below the nav header.
    var insertToolsAtTop: Bool = false
    var onInsertToolsAtTopChanged: ((Bool) -> Void)?

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
            onPasteFile: onPasteFile,
            initialScrollFraction: initialScrollFraction,
            insertToolsAtTop: insertToolsAtTop
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
        contentController.add(coordinator, name: "pasteImageRequest")
        contentController.add(coordinator, name: "insertToolsAtTopChanged")

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        let webView = TrinoteEditorWebView(frame: .zero, configuration: config)
        webView.onAugmentEditMenu = { [weak coordinator] builder in
            coordinator?.augmentEditorMenu(builder)
        }
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
        coordinator.onPasteFile = onPasteFile
        coordinator.onInsertToolsAtTopChanged = onInsertToolsAtTopChanged
        coordinator.syncInsertToolsAtTop(insertToolsAtTop)
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
        if let attachment = attachmentToInsert {
            coordinator.insertAttachmentLink(
                noteId: attachment.noteId,
                attachmentId: attachment.attachmentId,
                title: attachment.title
            )
            DispatchQueue.main.async { self.attachmentToInsert = nil }
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
        uc.removeScriptMessageHandler(forName: "pasteImageRequest")
        uc.removeScriptMessageHandler(forName: "insertToolsAtTopChanged")
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
        var onPasteFile: ((Data, String, String) -> Void)?
        var onInsertToolsAtTopChanged: ((Bool) -> Void)?
        private let initialHTML: String
        private var editorReady = false
        private var pendingContent: String?
        private var pendingAttachmentInsert: EditorAttachmentInsert?
        private var keyboardToolbarGapObservers: [NSObjectProtocol] = []
        private var pendingKeyboardToolbarGapPoints: CGFloat?
        private let initialScrollFraction: CGFloat
        private var insertToolsAtTop = false
        private var appliedInsertToolsAtTop: Bool?

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
            onPasteFile: ((Data, String, String) -> Void)? = nil,
            initialScrollFraction: CGFloat = 0,
            insertToolsAtTop: Bool = false
        ) {
            self.initialHTML = initialHTML
            self.onContentChanged = onContentChanged
            self.onPickImage = onPickImage
            self.onEditorScroll = onEditorScroll
            self.onTypingActivity = onTypingActivity
            self.onTableToolsVisibilityChanged = onTableToolsVisibilityChanged
            self.onRequestSave = onRequestSave
            self.onEditorBridgeRequest = onEditorBridgeRequest
            self.onPasteFile = onPasteFile
            self.initialScrollFraction = initialScrollFraction
            self.insertToolsAtTop = insertToolsAtTop
        }

        func syncInsertToolsAtTop(_ atTop: Bool) {
            insertToolsAtTop = atTop
            guard appliedInsertToolsAtTop != atTop else { return }
            setInsertToolsAtTop(atTop)
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
                setFloatingChipScrollClearance(
                    NoteDetailFloatingChipLayout.scrollClearance(findBarPresented: false, editing: true)
                )
                if initialScrollFraction > 0 {
                    scrollToFraction(initialScrollFraction)
                }
                setInsertToolsAtTop(insertToolsAtTop)
                if let pending = pendingAttachmentInsert {
                    pendingAttachmentInsert = nil
                    insertAttachmentLink(
                        noteId: pending.noteId,
                        attachmentId: pending.attachmentId,
                        title: pending.title
                    )
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

            case "pasteImageRequest":
                let mode: String
                if let dict = Self.dictionaryFromScriptMessageBody(message.body),
                   let m = dict["mode"] as? String {
                    mode = m
                } else {
                    mode = "embed"
                }
                DispatchQueue.main.async { [weak self] in
                    self?.handlePasteFromPasteboard(mode: mode)
                }

            case "insertToolsAtTopChanged":
                let atTop: Bool
                if let b = message.body as? Bool {
                    atTop = b
                } else if let n = message.body as? NSNumber {
                    atTop = n.boolValue
                } else {
                    break
                }
                insertToolsAtTop = atTop
                appliedInsertToolsAtTop = atTop
                let placementCallback = onInsertToolsAtTopChanged
                DispatchQueue.main.async {
                    placementCallback?(atTop)
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
                case "renameAttachment":
                    if let aid = dict["attachmentId"] as? String, !aid.isEmpty,
                       let nid = dict["noteId"] as? String, !nid.isEmpty,
                       let title = dict["title"] as? String {
                        let pos: Int
                        if let n = dict["pos"] as? Int {
                            pos = n
                        } else if let n = dict["pos"] as? NSNumber {
                            pos = n.intValue
                        } else {
                            break
                        }
                        DispatchQueue.main.async {
                            callback?(.renameAttachment(attachmentId: aid, noteId: nid, title: title, pos: pos))
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

        func insertAttachmentLink(noteId: String, attachmentId: String, title: String) {
            guard editorReady, let webView else {
                pendingAttachmentInsert = EditorAttachmentInsert(
                    noteId: noteId,
                    attachmentId: attachmentId,
                    title: title
                )
                return
            }
            guard let noteIdData = try? JSONSerialization.data(withJSONObject: noteId, options: [.fragmentsAllowed]),
                  let attachmentIdData = try? JSONSerialization.data(withJSONObject: attachmentId, options: [.fragmentsAllowed]),
                  let titleData = try? JSONSerialization.data(withJSONObject: title, options: [.fragmentsAllowed]),
                  let noteIdJSON = String(data: noteIdData, encoding: .utf8),
                  let attachmentIdJSON = String(data: attachmentIdData, encoding: .utf8),
                  let titleJSON = String(data: titleData, encoding: .utf8)
            else { return }
            webView.evaluateJavaScript(
                "window.editorBridge.insertAttachmentLink(\(noteIdJSON), \(attachmentIdJSON), \(titleJSON));"
            ) { _, error in
                if let error { Log.api.error("Failed to insert attachment link: \(error)") }
            }
        }

        func handlePasteFromPasteboard(mode: String) {
            switch mode {
            case "url":
                guard let url = EditorPasteboardImage.pasteboardURLString() else { return }
                insertPasteboardURL(url)
            default:
                if let payload = EditorPasteboardImage.loadPasteboardImageData() {
                    let uri = "data:\(payload.mime);base64,\(payload.data.base64EncodedString())"
                    insertImage(uri)
                } else if let file = EditorPasteboardImage.loadPasteboardFileData() {
                    onPasteFile?(file.data, file.filename, file.mime)
                } else {
                    pastePlainFallbackFromPasteboard()
                }
            }
        }

        func insertPasteboardURL(_ url: String) {
            guard editorReady, let webView else { return }
            let script = "window.editorBridge.insertPasteboardURL(\(Self.jsJSONString(url)));"
            webView.evaluateJavaScript(script) { _, error in
                if let error { Log.api.error("insertPasteboardURL failed: \(error)") }
            }
        }

        func pastePlainFallbackFromPasteboard() {
            guard editorReady, let webView else { return }
            let plain = EditorPasteboardImage.pasteboardPlainText() ?? ""
            let html = EditorPasteboardImage.pasteboardHTML() ?? ""
            let script = "window.editorBridge.pastePlainFallback(\(Self.jsJSONString(plain)), \(Self.jsJSONString(html)));"
            webView.evaluateJavaScript(script) { _, error in
                if let error { Log.api.error("pastePlainFallback failed: \(error)") }
            }
        }

        @available(iOS 16.0, *)
        fileprivate func augmentEditorMenu(_ builder: UIMenuBuilder) {
            guard builder.system == .main else { return }
            guard EditorPasteboardImage.pasteboardHasAmbiguousImageAndURL() else { return }
            let title = String(localized: "Paste URL", comment: "Edit menu: paste image URL string instead of embedding bitmap")
            let action = UIAction(title: title) { [weak self] _ in
                self?.handlePasteFromPasteboard(mode: "url")
            }
            builder.insertChild(
                UIMenu(title: "", options: .displayInline, children: [action]),
                atEndOfMenu: .standardEdit
            )
        }

        private static func jsJSONString(_ value: String) -> String {
            guard let data = try? JSONSerialization.data(withJSONObject: value, options: [.fragmentsAllowed]),
                  let encoded = String(data: data, encoding: .utf8) else {
                return "''"
            }
            return encoded
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

        private func setFloatingChipScrollClearance(_ points: CGFloat) {
            let px = Int(max(0, points).rounded())
            guard editorReady, let webView else { return }
            webView.evaluateJavaScript("window.editorBridge.setFloatingChipScrollClearance(\(px))") { _, error in
                if let error { Log.api.error("setFloatingChipScrollClearance failed: \(error)") }
            }
        }

        private func setInsertToolsAtTop(_ atTop: Bool) {
            appliedInsertToolsAtTop = atTop
            guard editorReady, let webView else { return }
            let js = atTop ? "true" : "false"
            webView.evaluateJavaScript("window.editorBridge.setInsertToolsAtTop(\(js))") { _, error in
                if let error { Log.api.error("setInsertToolsAtTop failed: \(error)") }
            }
        }

        /// Same rule as read-only `HTMLNoteView`: `#/<id>` or `#root/…/<id>` → last path segment (query stripped).
        private static func noteIdFromTriliumHashLink(url: URL) -> String? {
            TriliumHashLinkNavigation.parse(url: url)?.noteId
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

            if let ref = TriliumAttachmentURLParser.entityReference(from: url),
               ref.routeType == "attachments" {
                return .cancel
            }

            let urlString = url.absoluteString
            if urlString.contains("#/") || urlString.localizedCaseInsensitiveContains("#root/") {
                if let parsed = TriliumHashLinkNavigation.parse(url: url),
                   parsed.viewMode == "attachments",
                   parsed.attachmentId != nil {
                    return .cancel
                }
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
