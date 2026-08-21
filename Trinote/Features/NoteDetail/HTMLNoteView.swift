import SwiftUI
import UIKit
import WebKit

struct HTMLNoteView: View {
    let html: String
    let baseURL: URL?
    /// Changes only when `html` differs from the last one by checkbox `checked` state alone.
    var checkboxOnlyRevision: Int = 0
    var onNoteLinkTapped: ((String) -> Void)?
    var onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?
    /// Cycles Markdown/Trilium multi-state todos (`[ ]`→`[x]`→`[/]`→`[?]`→`[-]`). Takes precedence over binary toggle.
    var onTaskStateCycled: ((_ index: Int) -> Void)?
    /// Reorder a todo-list item among siblings. `beforeIndex` is nil when appending at end of the sibling group.
    var onCheckboxReordered: ((_ fromIndex: Int, _ beforeIndex: Int?) -> Void)?
    /// Loads preview content for a tapped `api/attachments/{id}/…` link.
    var loadAttachmentPreview: ((String) async -> AttachmentPreviewItem?)?
    /// Serves the `trinote-img://` images in `html`, and the full-resolution bytes the full-screen
    /// viewer shows when one is tapped.
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?
    /// When set, the web view registers for in-page find (read-only).
    var findControl: FindOnPageControl?
    /// When false, todo checkboxes stay disabled (no toggle/reorder JS).
    var listInteractionEnabled: Bool = true
    /// When true with `listInteractionEnabled`, clicks cycle Trilium task states instead of binary toggle.
    var taskStateCycleEnabled: Bool = false
    /// When false, skip drag-reorder handles even if list interaction is on (Markdown preview).
    var allowListReorder: Bool = true

    @State private var contentHeight: CGFloat = 200
    @State private var fullScreenImage: FullScreenImagePayload?
    @State private var attachmentPreview: AttachmentPreviewItem?
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue
    @AppStorage("useCustomTextColor") private var useCustomTextColor: Bool = false
    @AppStorage("customLightTextColor") private var customLightTextColor: String = "#1c1c1e"
    @AppStorage("customDarkTextColor") private var customDarkTextColor: String = "#aaaaaa"
    @AppStorage("noteCheckboxReorderEnabled") private var noteCheckboxReorderEnabled: Bool = true

    private var themeColors: HTMLThemeColors {
        let theme = ColorTheme(rawValue: colorTheme) ?? .default
        if useCustomTextColor {
            return HTMLThemeColors(
                lightText: customLightTextColor,
                darkText: customDarkTextColor,
                lightLink: theme.lightLinkColor,
                darkLink: theme.darkLinkColor
            )
        } else {
            return HTMLThemeColors(
                lightText: theme.lightTextColor,
                darkText: theme.darkTextColor,
                lightLink: theme.lightLinkColor,
                darkLink: theme.darkLinkColor
            )
        }
    }

    var body: some View {
        HTMLNoteWebView(
            html: html,
            baseURL: baseURL,
            themeColors: themeColors,
            checkboxReorderEnabled: listInteractionEnabled && allowListReorder && noteCheckboxReorderEnabled,
            listInteractionEnabled: listInteractionEnabled,
            taskStateCycleEnabled: listInteractionEnabled && taskStateCycleEnabled,
            checkboxOnlyRevision: checkboxOnlyRevision,
            onNoteLinkTapped: onNoteLinkTapped,
            onCheckboxToggled: onCheckboxToggled,
            onTaskStateCycled: onTaskStateCycled,
            onCheckboxReordered: onCheckboxReordered,
            onAttachmentLinkTapped: { attachmentId in
                guard let loadAttachmentPreview else { return }
                Task { @MainActor in
                    attachmentPreview = await loadAttachmentPreview(attachmentId)
                }
            },
            imageBytes: imageBytes,
            findControl: findControl,
            onHeightChanged: { contentHeight = $0 },
            onImagePreview: { payload in fullScreenImage = payload }
        )
        .frame(height: contentHeight)
        .fullScreenCover(item: $fullScreenImage) { payload in
            FullScreenImageViewer(image: payload.image, title: payload.title) {
                fullScreenImage = nil
            }
        }
        .fullScreenCover(item: $attachmentPreview) { item in
            AttachmentPreviewView(item: item) {
                attachmentPreview = nil
            }
        }
    }
}

/// Payload delivered by the read-only HTML's image-tap JS handler. Identifiable so it can be
/// the binding for `.fullScreenCover(item:)`, which gives us a fresh sheet per tap.
struct FullScreenImagePayload: Identifiable {
    let id = UUID()
    let image: UIImage
    let title: String?
}

struct HTMLThemeColors: Equatable {
    let lightText: String
    let darkText: String
    let lightLink: String
    let darkLink: String
}

private struct HTMLNoteWebView: UIViewRepresentable {
    let html: String
    let baseURL: URL?
    let themeColors: HTMLThemeColors
    let checkboxReorderEnabled: Bool
    let listInteractionEnabled: Bool
    let taskStateCycleEnabled: Bool
    let checkboxOnlyRevision: Int
    var onNoteLinkTapped: ((String) -> Void)?
    var onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?
    var onTaskStateCycled: ((_ index: Int) -> Void)?
    var onCheckboxReordered: ((_ fromIndex: Int, _ beforeIndex: Int?) -> Void)?
    var onAttachmentLinkTapped: ((String) -> Void)?
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?
    var findControl: FindOnPageControl?
    var onHeightChanged: ((CGFloat) -> Void)?
    var onImagePreview: ((FullScreenImagePayload) -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(
            onNoteLinkTapped: onNoteLinkTapped,
            onCheckboxToggled: onCheckboxToggled,
            onTaskStateCycled: onTaskStateCycled,
            onCheckboxReordered: onCheckboxReordered,
            onAttachmentLinkTapped: onAttachmentLinkTapped,
            imageBytes: imageBytes,
            onHeightChanged: onHeightChanged,
            onImagePreview: onImagePreview
        )
    }

    func makeUIView(context: Context) -> WKWebView {
        let handler = context.coordinator
        let contentController = WKUserContentController()
        contentController.add(handler, name: "heightUpdate")
        contentController.add(handler, name: "noteLink")
        contentController.add(handler, name: "attachmentLink")
        contentController.add(handler, name: "checkboxToggle")
        contentController.add(handler, name: "checkboxCycle")
        contentController.add(handler, name: "checkboxReorder")
        contentController.add(handler, name: "checkboxDragScroll")
        contentController.add(handler, name: "checkboxDragState")
        contentController.add(handler, name: "debugLog")
        contentController.add(handler, name: "imagePreview")

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        // Linked mermaid cards embed `mermaid-viewer.html` via a file:// iframe. WKWebView keeps iframe
        // loads and postMessage working between same-origin file:// documents without any KVC toggles,
        // so we don't set `allowFileAccessFromFileURLs` / `allowUniversalAccessFromFileURLs` here —
        // those are private WebKit preferences that can raise `NSUnknownKeyException` on some iOS
        // versions and broke the entire webview creation (taking canvas/mermaid cards down with it).

        // Images arrive as `trinote-img://` references rather than inlined bytes, so the body handed to
        // this web view stays the size of its text no matter how many photos the note holds.
        if let imageBytes {
            let schemeHandler = TriliumImageSchemeHandler(provider: imageBytes)
            config.setURLSchemeHandler(schemeHandler, forURLScheme: TriliumImageScheme.scheme)
            handler.imageSchemeHandler = schemeHandler
        }

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = handler
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false

        if #available(iOS 16.4, *) {
            webView.isInspectable = false
        }

        handler.webView = webView
        handler.themeColors = themeColors
        handler.checkboxReorderEnabled = checkboxReorderEnabled
        handler.listInteractionEnabled = listInteractionEnabled
        handler.taskStateCycleEnabled = taskStateCycleEnabled
        handler.checkboxOnlyRevision = checkboxOnlyRevision
        handler.findControl = findControl
        let wrapped = Self.wrapHTMLTimed(
            html,
            theme: themeColors,
            checkboxReorderEnabled: checkboxReorderEnabled,
            listInteractionEnabled: listInteractionEnabled,
            taskStateCycleEnabled: taskStateCycleEnabled,
            phase: "makeUIView"
        )
        handler.loadHTMLStartedAt = CFAbsoluteTimeGetCurrent()
        CheckboxPerf.log("loadHTMLString phase=makeUIView wrappedUtf16=\(wrapped.utf16.count)")
        webView.loadHTMLString(wrapped, baseURL: Self.effectiveReadOnlyHTMLBaseURL(body: html, canonicalBase: baseURL))
        handler.loadedHTML = html

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let t0 = CFAbsoluteTimeGetCurrent()
        let coordinator = context.coordinator
        coordinator.findControl = findControl
        coordinator.onNoteLinkTapped = onNoteLinkTapped
        coordinator.onCheckboxToggled = onCheckboxToggled
        coordinator.onTaskStateCycled = onTaskStateCycled
        coordinator.onCheckboxReordered = onCheckboxReordered
        coordinator.onAttachmentLinkTapped = onAttachmentLinkTapped
        coordinator.imageBytes = imageBytes
        coordinator.onHeightChanged = onHeightChanged
        coordinator.onImagePreview = onImagePreview
        findControl?.registerHTMLWebView(webView)

        let tCompare = CFAbsoluteTimeGetCurrent()
        let htmlChanged = html != coordinator.loadedHTML
        let themeChanged = themeColors != coordinator.themeColors
        let reorderChanged = checkboxReorderEnabled != coordinator.checkboxReorderEnabled
        let listInteractionChanged = listInteractionEnabled != coordinator.listInteractionEnabled
        let cycleChanged = taskStateCycleEnabled != coordinator.taskStateCycleEnabled
        let compareMs = CheckboxPerf.ms(tCompare)
        guard htmlChanged || themeChanged || reorderChanged || listInteractionChanged || cycleChanged else {
            if CheckboxPerf.lastToggleEndedAt > 0,
               CFAbsoluteTimeGetCurrent() - CheckboxPerf.lastToggleEndedAt < 5 {
                CheckboxPerf.log(
                    "updateUIView noop compareMs=\(compareMs) sinceToggleMs=\(CheckboxPerf.sinceLastToggleMs()) lastToggle=#\(CheckboxPerf.lastToggleID)"
                )
            }
            return
        }

        // Checkbox / Markdown task-state taps already update the live DOM in JS. Reloading the whole
        // note would collapse `.frame(height:)` while images decode again. The view model bumps
        // `checkboxOnlyRevision` for those patches so this stays O(1).
        let revisionChanged = checkboxOnlyRevision != coordinator.checkboxOnlyRevision
        if htmlChanged, !themeChanged, !reorderChanged, !listInteractionChanged, !cycleChanged, revisionChanged,
           let previous = coordinator.loadedHTML,
           // Binary checkbox patches are tiny; multi-state Markdown HTML can grow by more than that.
           taskStateCycleEnabled || Self.lengthChangeFitsCheckboxToggle(previous: previous, incoming: html) {
            coordinator.loadedHTML = html
            coordinator.checkboxOnlyRevision = checkboxOnlyRevision
            CheckboxPerf.log(
                "updateUIView skipReload lastToggle=#\(CheckboxPerf.lastToggleID) sinceToggleMs=\(CheckboxPerf.sinceLastToggleMs()) compareMs=\(compareMs) revision=\(checkboxOnlyRevision) totalMs=\(CheckboxPerf.ms(t0))"
            )
            return
        }
        CheckboxPerf.log(
            "updateUIView willReload lastToggle=#\(CheckboxPerf.lastToggleID) htmlChanged=\(htmlChanged) themeChanged=\(themeChanged) reorderChanged=\(reorderChanged) revisionChanged=\(revisionChanged) compareMs=\(compareMs) incoming[\(CheckboxPerf.bodyStats(html))]"
        )

        coordinator.loadedHTML = html
        coordinator.themeColors = themeColors
        coordinator.checkboxReorderEnabled = checkboxReorderEnabled
        coordinator.listInteractionEnabled = listInteractionEnabled
        coordinator.taskStateCycleEnabled = taskStateCycleEnabled
        coordinator.checkboxOnlyRevision = checkboxOnlyRevision
        let wrapped = Self.wrapHTMLTimed(
            html,
            theme: themeColors,
            checkboxReorderEnabled: checkboxReorderEnabled,
            listInteractionEnabled: listInteractionEnabled,
            taskStateCycleEnabled: taskStateCycleEnabled,
            phase: "updateUIView-reload"
        )
        coordinator.loadHTMLStartedAt = CFAbsoluteTimeGetCurrent()
        CheckboxPerf.log(
            "loadHTMLString phase=updateUIView-reload lastToggle=#\(CheckboxPerf.lastToggleID) wrappedUtf16=\(wrapped.utf16.count) updateMs=\(CheckboxPerf.ms(t0))"
        )
        webView.loadHTMLString(wrapped, baseURL: Self.effectiveReadOnlyHTMLBaseURL(body: html, canonicalBase: baseURL))
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        coordinator.endCheckboxDrag()
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "heightUpdate")
        uc.removeScriptMessageHandler(forName: "noteLink")
        uc.removeScriptMessageHandler(forName: "attachmentLink")
        uc.removeScriptMessageHandler(forName: "checkboxToggle")
        uc.removeScriptMessageHandler(forName: "checkboxCycle")
        uc.removeScriptMessageHandler(forName: "checkboxReorder")
        uc.removeScriptMessageHandler(forName: "checkboxDragScroll")
        uc.removeScriptMessageHandler(forName: "checkboxDragState")
        uc.removeScriptMessageHandler(forName: "debugLog")
        uc.removeScriptMessageHandler(forName: "imagePreview")
    }

    /// Guards the revision signal: toggling one `checked` attribute moves the body length by a few
    /// characters at most, so a bigger jump means something else changed in the same update and the
    /// WebView really does need reloading.
    private static func lengthChangeFitsCheckboxToggle(previous: String, incoming: String) -> Bool {
        abs(incoming.utf16.count - previous.utf16.count) <= 64
    }

    private static func wrapHTMLTimed(
        _ body: String,
        theme: HTMLThemeColors,
        checkboxReorderEnabled: Bool,
        listInteractionEnabled: Bool,
        taskStateCycleEnabled: Bool,
        phase: String
    ) -> String {
        let t0 = CFAbsoluteTimeGetCurrent()
        let wrapped = wrapHTML(
            body,
            theme: theme,
            checkboxReorderEnabled: checkboxReorderEnabled,
            listInteractionEnabled: listInteractionEnabled,
            taskStateCycleEnabled: taskStateCycleEnabled
        )
        CheckboxPerf.log(
            "wrapHTML phase=\(phase) bodyUtf16=\(body.utf16.count) wrappedUtf16=\(wrapped.utf16.count) ms=\(CheckboxPerf.ms(t0))"
        )
        return wrapped
    }

    static func wrapHTML(
        _ body: String,
        theme: HTMLThemeColors,
        checkboxReorderEnabled: Bool = false,
        listInteractionEnabled: Bool = true,
        taskStateCycleEnabled: Bool = false
    ) -> String {
        """
        <!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <style>
        :root { color-scheme: light dark; }
        * { -webkit-text-size-adjust: 100%; }
        body {
            font: -apple-system-body;
            font-size: 18px;
            line-height: 1.6;
            padding: 16px;
            margin: 0;
            word-wrap: break-word;
            overflow-wrap: break-word;
            background: transparent;
            position: relative;
        }
        @media (prefers-color-scheme: dark) {
            :root { --text-color: \(theme.darkText); --code-bg: rgba(255,255,255,0.06); --border: rgba(255,255,255,0.15); }
            body { color: \(theme.darkText); }
            a { color: \(theme.darkLink); }
            a.reference-link,
            a[href*="api/attachments/"][href*="/open"] {
              color: \(theme.darkLink);
              background: rgba(10, 132, 255, 0.16);
              border-color: rgba(10, 132, 255, 0.28);
            }
            a.reference-link::before,
            a[href*="api/attachments/"][href*="/open"]::before {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230a84ff'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4z'/%3E%3C/svg%3E");
            }
            a.reference-link[href^="#root"]:not([href*="viewMode=attachments"]):not([href*="attachmentId="])::before {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230a84ff'%3E%3Cpath d='M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5z'/%3E%3C/svg%3E");
            }
        }
        @media (prefers-color-scheme: light) {
            :root { --text-color: \(theme.lightText); --code-bg: rgba(0,0,0,0.04); --border: rgba(0,0,0,0.12); }
            body { color: \(theme.lightText); }
            a { color: \(theme.lightLink); }
        }
        /* Trilium reference links — internal note / attachment chips */
        a.reference-link,
        a[href*="api/attachments/"][href*="/open"] {
          text-decoration: none;
          color: \(theme.lightLink);
          background: rgba(0, 122, 255, 0.10);
          border: 1px solid rgba(0, 122, 255, 0.22);
          border-radius: 6px;
          padding: 1px 8px 1px 6px;
          display: inline;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          cursor: pointer;
          font-weight: 500;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(0, 122, 255, 0.12);
        }
        a.reference-link::before,
        a[href*="api/attachments/"][href*="/open"]::before {
          content: "";
          display: inline-block;
          width: 0.95em;
          height: 0.95em;
          margin-right: 0.35em;
          vertical-align: -0.12em;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23007aff'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4z'/%3E%3C/svg%3E") center / contain no-repeat;
        }
        a.reference-link[href^="#root"]:not([href*="viewMode=attachments"]):not([href*="attachmentId="])::before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23007aff'%3E%3Cpath d='M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5z'/%3E%3C/svg%3E");
        }
        img { max-width: 100%; height: auto; border-radius: 6px; }
        /* Inline images open a full-screen viewer when tapped; linked image notes navigate.
           Images inside include cards already have `pointer-events: none`, so the cursor /
           tap-highlight here only affects images that are actually tappable. */
        img {
          cursor: zoom-in;
          -webkit-tap-highlight-color: rgba(0, 122, 255, 0.12);
          touch-action: manipulation;
        }
        img[data-trinote-image-note-id] {
          cursor: pointer;
        }
        .trinote-include__img { cursor: default; }
        figure.image { display: block; clear: both; text-align: center; margin: 0.9em auto; max-width: 100%; overflow: hidden; }
        figure.image img { display: block; margin: 0 auto; max-width: 100%; height: auto; border-radius: 6px; }
        figure.image figcaption {
          word-break: break-word;
          color: #8e8e93; background: rgba(128,128,128,0.06);
          font-size: 0.75em; line-height: 1.4; padding: 6px 10px;
        }
        figure.image.image_resized { max-width: 100%; }
        figure.image.image_resized img { width: 100%; }
        figure.image-style-inline { display: inline-block; margin: 0.3em 0.5em; vertical-align: bottom; }
        figure.image-style-align-left { float: left; margin: 0.5em 1.2em 0.5em 0; max-width: 50%; }
        figure.image-style-align-right { float: right; margin: 0.5em 0 0.5em 1.2em; max-width: 50%; }
        figure.image-style-block-align-center,
        figure.image:not([class*="image-style-"]) { display: table; margin-left: auto; margin-right: auto; clear: both; }
        figure.image-style-block-align-left { display: table; margin-left: 0; margin-right: auto; clear: both; }
        figure.image-style-block-align-right { display: table; margin-left: auto; margin-right: 0; clear: both; }
        figure.image-style-side { float: right; margin: 0.5em 0 0.5em 1.2em; max-width: 50%; }
        pre {
          background: var(--code-bg);
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          white-space: pre;
          overflow-x: auto;
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
        }
        code { background: var(--code-bg); padding: 2px 6px; border-radius: 4px; font-size: 14px; }
        pre code { background: none; padding: 0; }
        .table-scroll-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 8px 0; }
        table caption { caption-side: top; text-align: center; font-size: 0.85em; color: var(--text-color); opacity: 0.6; background: rgba(128,128,128,0.06); padding: 6px 10px; border: 1px solid var(--border); border-bottom: none; border-radius: 6px 6px 0 0; }
        figure.table { margin: 8px 0; display: flex; flex-direction: column; width: 100%; }
        figure.table > figcaption { order: -1; text-align: center; font-size: 0.85em; color: var(--text-color); opacity: 0.6; background: rgba(128,128,128,0.06); padding: 6px 10px; border: 1px solid var(--border); border-bottom: none; border-radius: 6px 6px 0 0; }
        table { border-collapse: separate; border-spacing: 0; width: 100%; }
        th, td { border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 8px; text-align: left; min-width: 30px; word-wrap: break-word; overflow-wrap: break-word; }
        tr:first-child > th, tr:first-child > td { border-top: 1px solid var(--border); }
        th:first-child, td:first-child { border-left: 1px solid var(--border); }
        th { background: var(--code-bg); font-weight: 600; }
        blockquote { border-left: 4px solid var(--border); margin: 8px 0; padding: 4px 16px; opacity: 0.85; }
        /* TriliumNext: <aside class="admonition note">; legacy Trinote: div[data-callout-type] */
        aside.admonition, .tiptap-callout, div[data-callout-type] {
          margin: 10px 0; border-radius: 10px; padding: 10px 12px 10px 14px; border: 1px solid;
          background: rgba(128,128,128,0.06);
          display: block;
        }
        aside.admonition > *:first-child, .tiptap-callout > *:first-child, div[data-callout-type] > *:first-child { margin-top: 0; }
        aside.admonition > *:last-child, .tiptap-callout > *:last-child, div[data-callout-type] > *:last-child { margin-bottom: 0; }
        aside.admonition.note, .tiptap-callout--note, div[data-callout-type="note"] { border-color: #4a9eff; }
        aside.admonition.note::before, .tiptap-callout--note::before, div[data-callout-type="note"]::before {
          content: "Note"; display: block; font-weight: 700; font-size: 0.82em; margin-bottom: 6px; color: #4a9eff;
        }
        aside.admonition.tip, .tiptap-callout--tip, div[data-callout-type="tip"] { border-color: #3fb950; }
        aside.admonition.tip::before, .tiptap-callout--tip::before, div[data-callout-type="tip"]::before {
          content: "Tip"; display: block; font-weight: 700; font-size: 0.82em; margin-bottom: 6px; color: #3fb950;
        }
        aside.admonition.important, .tiptap-callout--important, div[data-callout-type="important"] { border-color: #a371f7; }
        aside.admonition.important::before, .tiptap-callout--important::before, div[data-callout-type="important"]::before {
          content: "Important"; display: block; font-weight: 700; font-size: 0.82em; margin-bottom: 6px; color: #a371f7;
        }
        aside.admonition.caution, .tiptap-callout--caution, div[data-callout-type="caution"] { border-color: #f85149; }
        aside.admonition.caution::before, .tiptap-callout--caution::before, div[data-callout-type="caution"]::before {
          content: "Caution"; display: block; font-weight: 700; font-size: 0.82em; margin-bottom: 6px; color: #f85149;
        }
        aside.admonition.warning, .tiptap-callout--warning, div[data-callout-type="warning"] { border-color: #d29922; }
        aside.admonition.warning::before, .tiptap-callout--warning::before, div[data-callout-type="warning"]::before {
          content: "Warning"; display: block; font-weight: 700; font-size: 0.82em; margin-bottom: 6px; color: #d29922;
        }
        @media (prefers-color-scheme: dark) {
          aside.admonition, .tiptap-callout, div[data-callout-type] { background: rgba(255,255,255,0.05); }
        }
        h1, h2, h3, h4, h5, h6 { margin-top: 1em; margin-bottom: 0.5em; }
        /* Paragraphs + lists: match editor spacing; CKEditor/Trilium often use empty <p> for “double break” between lists */
        p { margin: 0.65em 0; }
        ul, ol {
          padding-left: 24px;
          margin: 0.75em 0;
        }
        li > ul, li > ol {
          margin-top: 0.35em;
          margin-bottom: 0.35em;
        }
        p:empty {
          min-height: 1.5em;
        }
        p:has(> br:only-child) {
          min-height: 1.5em;
        }
        ul.todo-list { list-style: none; padding-left: 0; }
        /* Nested (indented) todo lists must keep their indentation, not collapse flat */
        li ul.todo-list { padding-left: 24px; }
        ul.todo-list li { margin: 4px 0; }
        .todo-list__label { display: flex; align-items: flex-start; gap: 8px; cursor: default; }
        .todo-list__label input[type="checkbox"] {
          margin: 0;
          margin-top: 6px;
          flex-shrink: 0;
          pointer-events: auto;
          cursor: pointer;
          width: 18px;
          height: 18px;
          accent-color: \(theme.lightLink);
        }
        @media (prefers-color-scheme: dark) {
          .todo-list__label input[type="checkbox"] { accent-color: \(theme.darkLink); }
        }
        .todo-list__label__description { flex: 1; min-width: 0; transition: opacity 0.15s, text-decoration 0.15s; }
        .todo-list__label--checked .todo-list__label__description { text-decoration: line-through; opacity: 0.5; }
        /* Trilium multi-state todos: [/]=doing, [?]=maybe, [-]=cancelled */
        .tn-task-checkbox,
        .todo-list__label input[type="checkbox"][data-trilium-task-state] {
          display: inline-block;
          box-sizing: border-box;
          width: 18px;
          height: 18px;
          margin: 0;
          margin-top: 6px;
          flex-shrink: 0;
          border: none;
          border-radius: 4px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 72% 72%;
          -webkit-appearance: none;
          appearance: none;
          pointer-events: none;
          opacity: 1;
          vertical-align: top;
        }
        .tn-task-checkbox[data-trilium-task-state="doing"],
        .todo-list__label input[type="checkbox"][data-trilium-task-state="doing"] {
          background-color: #a68b5a;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='%23fff' transform='translate(12 12)'%3E%3Crect x='-1' y='-10' width='2' height='4.5' rx='1'/%3E%3Crect x='-1' y='-10' width='2' height='4.5' rx='1' transform='rotate(45)'/%3E%3Crect x='-1' y='-10' width='2' height='4.5' rx='1' transform='rotate(90)'/%3E%3Crect x='-1' y='-10' width='2' height='4.5' rx='1' transform='rotate(135)'/%3E%3Crect x='-1' y='-10' width='2' height='4.5' rx='1' transform='rotate(180)'/%3E%3Crect x='-1' y='-10' width='2' height='4.5' rx='1' transform='rotate(225)'/%3E%3Crect x='-1' y='-10' width='2' height='4.5' rx='1' transform='rotate(270)'/%3E%3Crect x='-1' y='-10' width='2' height='4.5' rx='1' transform='rotate(315)'/%3E%3C/g%3E%3C/svg%3E");
        }
        .tn-task-checkbox[data-trilium-task-state="maybe"],
        .todo-list__label input[type="checkbox"][data-trilium-task-state="maybe"] {
          background-color: #6e6e6e;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='12' y='17.5' text-anchor='middle' fill='%23fff' font-size='15' font-weight='700' font-family='-apple-system,BlinkMacSystemFont,sans-serif'%3E%3F%3C/text%3E%3C/svg%3E");
        }
        .tn-task-checkbox[data-trilium-task-state="cancelled"],
        .todo-list__label input[type="checkbox"][data-trilium-task-state="cancelled"] {
          background-color: #c75a5a;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='8' fill='none' stroke='%23fff' stroke-width='2'/%3E%3Cline x1='7' y1='7' x2='17' y2='17' stroke='%23fff' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
        }
        \(taskStateCycleEnabled ? """
        .todo-list__label { cursor: pointer; }
        .todo-list__label input[type="checkbox"][data-trilium-task-state] {
          pointer-events: auto;
          cursor: pointer;
        }
        """ : "")
        \(listInteractionEnabled ? "" : """
        /* Static preview: no write-back — match include-note disabled look */
        .todo-list__label input[type="checkbox"]:not([data-trilium-task-state]) { pointer-events: none; opacity: 0.55; cursor: default; }
        """)
        body.trinote-list-reorder ul > li,
        body.trinote-list-reorder ol > li {
          position: relative;
          padding-right: 32px;
        }
        .trinote-todo-drag-handle {
          position: absolute;
          right: 0;
          top: 2px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.38;
          -webkit-user-select: none;
          user-select: none;
          touch-action: none;
          -webkit-touch-callout: none;
          cursor: grab;
          z-index: 2;
        }
        .trinote-todo-drag-handle svg { width: 18px; height: 18px; fill: currentColor; }
        .trinote-todo-drag-handle:active { opacity: 0.7; }
        li.trinote-todo-dragging { opacity: 0.4; }
        .trinote-todo-insert-line {
          position: absolute;
          left: 16px;
          right: 16px;
          height: 3px;
          border-radius: 2px;
          background: \(theme.lightLink);
          pointer-events: none;
          z-index: 10000;
          display: none;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
        }
        @media (prefers-color-scheme: dark) {
          .trinote-todo-insert-line { background: \(theme.darkLink); box-shadow: 0 0 0 1px rgba(255,255,255,0.12); }
        }
        /* Trilium / CKEditor font-size spans */
        .text-tiny { font-size: 0.7em; }
        .text-small { font-size: 0.85em; }
        .text-big { font-size: 1.4em; }
        .text-huge { font-size: 1.8em; }
        hr { border: none; border-top: 1px solid var(--border); margin: 16px 0; clear: both; }
        .math-tex { overflow-x: auto; }
        mark.trinote-find-hit { background-color: rgba(255, 204, 0, 0.45); color: inherit; padding: 0; }
        mark.trinote-find-hit-active { background-color: rgba(255, 149, 0, 0.72); color: inherit; padding: 0; }
        /* Resolved Trilium include-note previews */
        .trinote-include {
          display: block; margin: 12px 0; border-radius: 10px; border: 1px solid var(--border);
          background: rgba(128,128,128,0.08); overflow: hidden;
        }
        .trinote-include * { -webkit-touch-callout: none; }
        .trinote-include__header {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          padding: 8px 10px; border-bottom: 1px solid var(--border); font-size: 0.92em; font-weight: 600;
        }
        .trinote-include__title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
        button.trinote-include__open {
          flex-shrink: 0;
          appearance: none;
          -webkit-appearance: none;
          font: inherit;
          font-weight: 600;
          font-size: 0.88em;
          margin: 0;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: rgba(128,128,128,0.18);
          color: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 122, 255, 0.12);
          touch-action: manipulation;
          user-select: none;
          white-space: nowrap;
        }
        button.trinote-include__open:active { opacity: 0.72; }
        @media (prefers-color-scheme: dark) {
          button.trinote-include__open { background: rgba(255,255,255,0.08); }
        }
        .trinote-include__body { padding: 8px 10px 10px; font-size: 0.95em; }
        .trinote-include__body[data-box-size="small"] { max-height: 10em; overflow: hidden; }
        .trinote-include__body[data-box-size="medium"] { max-height: 20em; overflow: auto; -webkit-overflow-scrolling: touch; }
        .trinote-include__inner--text { font-size: 0.95em; }
        .trinote-include__inner--text p:first-child { margin-top: 0; }
        .trinote-include__inner--text p:last-child { margin-bottom: 0; }
        .trinote-include__img {
          max-width: 100%; border-radius: 6px; border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          display: block; margin: 0 auto;
          pointer-events: none;
        }
        /* Linked canvas previews (raster/SVG served by Trilium as an <img>): match read-only CanvasNoteView
           (CanvasSVGWebView). Light mode: white export on its own. Dark mode: rgb(28,28,30) pad + invert
           filter so the white "paper" flips dark. Linked mermaid include cards are pre-rendered to inline
           SVG via `MermaidRenderer` (same `mermaid-viewer.html` as `MermaidNoteView`), so no extra pad
           or invert is applied here. */
        section.trinote-include[data-note-type="canvas"] .trinote-include__inner--image,
        section.trinote-include[data-note-type="mermaid"] .trinote-include__inner--image {
          padding: 0;
          border-radius: 8px;
          background: transparent;
        }
        section.trinote-include[data-note-type="mermaid"] .trinote-include__inner--mermaid {
          padding: 0;
          border-radius: 8px;
          background: transparent;
          /* Wide diagrams scroll horizontally instead of being squashed into the card width. */
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        /* mermaid emits `<svg width="100%" style="max-width:<natural>px" viewBox="…">`. Letting `width`
           fall back to `auto` makes WebKit size the SVG to its viewBox-intrinsic width, so wide diagrams
           render at full size and overflow the card horizontally instead of shrinking text/edges. */
        section.trinote-include[data-note-type="mermaid"] .trinote-include__inner--mermaid svg {
          width: auto;
          max-width: none;
          height: auto;
          display: block;
        }
        @media (prefers-color-scheme: dark) {
          section.trinote-include[data-note-type="canvas"] .trinote-include__inner--image,
          section.trinote-include[data-note-type="mermaid"] .trinote-include__inner--image {
            background: rgb(28, 28, 30);
            border-radius: 8px;
          }
          section.trinote-include[data-note-type="canvas"] .trinote-include__inner--image img,
          section.trinote-include[data-note-type="canvas"] .trinote-include__inner--image svg,
          section.trinote-include[data-note-type="mermaid"] .trinote-include__inner--image img,
          section.trinote-include[data-note-type="mermaid"] .trinote-include__inner--image svg {
            filter: invert(0.88) hue-rotate(180deg);
            background: transparent;
          }
        }
        .trinote-include img, .trinote-include svg { pointer-events: none; }
        .trinote-include__children { margin: 0; padding-left: 1.2em; }
        .trinote-include__mindmap-root {
          font-weight: 600; padding: 6px 8px; border: 1px solid var(--border); border-radius: 6px;
          background: rgba(128,128,128,0.08); display: inline-block; max-width: 100%;
          word-wrap: break-word; overflow-wrap: break-word;
        }
        .trinote-include__mindmap-children {
          margin: 8px 0 0 0; padding-left: 1.2em;
        }
        .trinote-include__mindmap-children li { margin: 2px 0; }
        .trinote-include__filelink { font-weight: 600; }
        .trinote-include__filemeta { font-size: 0.82em; opacity: 0.7; margin-top: 4px; }
        .trinote-include .todo-list__label input[type="checkbox"]:not([data-trilium-task-state]) { pointer-events: none; opacity: 0.55; }
        .trinote-include .todo-list__label input[type="checkbox"][data-trilium-task-state] { pointer-events: none; }
        /* Inline `<div class="mermaid">` blocks: same horizontal-scroll behavior as linked mermaid cards
           so wide diagrams stay readable instead of being scaled down to the column width. */
        .mermaid { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .mermaid svg { width: auto; max-width: none; height: auto; display: block; }
        /* KaTeX (Trilium math): inherit body color; display blocks scroll on small widths */
        .trinote-katex-inline { display: inline-block; max-width: 100%; vertical-align: middle; }
        .katex-display.trinote-katex-rendered, .trinote-katex-rendered.katex-display {
          margin: 0.75em 0; overflow-x: auto; -webkit-overflow-scrolling: touch; text-align: center;
        }
        .katex { color: inherit; }
        @media (prefers-color-scheme: dark) {
          .katex { color: var(--text-color); }
        }
        </style>
        \(Self.katexStylesheetLinkIfNeeded(for: body))
        </head>
        <body>
        \(body)
        <script>
        window.__trinoteFind = (function() {
            var HIGHLIGHT = 'trinote-find-hit';
            var ACTIVE = 'trinote-find-hit-active';
            var marks = [];
            var activeIdx = -1;
            function clear() {
                document.querySelectorAll('mark.' + HIGHLIGHT).forEach(function(m) {
                    var p = m.parentNode;
                    if (!p) return;
                    while (m.firstChild) p.insertBefore(m.firstChild, m);
                    p.removeChild(m);
                    p.normalize();
                });
                marks = [];
                activeIdx = -1;
            }
            function collectTextNodes(root) {
                var list = [];
                var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
                    acceptNode: function(node) {
                        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
                        var el = node.parentElement;
                        if (!el) return NodeFilter.FILTER_REJECT;
                        if (el.closest('script, style')) return NodeFilter.FILTER_REJECT;
                        if (el.closest('mark.' + HIGHLIGHT)) return NodeFilter.FILTER_REJECT;
                        return NodeFilter.FILTER_ACCEPT;
                    }
                });
                var n;
                while (n = w.nextNode()) list.push(n);
                return list;
            }
            function search(query) {
                clear();
                if (!query || query.length === 0) return;
                var q = query.toLowerCase();
                var nodes = collectTextNodes(document.body);
                for (var i = 0; i < nodes.length; i++) {
                    var textNode = nodes[i];
                    if (!textNode.parentNode) continue;
                    var text = textNode.nodeValue;
                    var lower = text.toLowerCase();
                    if (lower.indexOf(q) === -1) continue;
                    var frag = document.createDocumentFragment();
                    var pos = 0;
                    while (pos < text.length) {
                        var idx = lower.indexOf(q, pos);
                        if (idx === -1) {
                            frag.appendChild(document.createTextNode(text.substring(pos)));
                            break;
                        }
                        if (idx > pos) frag.appendChild(document.createTextNode(text.substring(pos, idx)));
                        var mk = document.createElement('mark');
                        mk.className = HIGHLIGHT;
                        mk.appendChild(document.createTextNode(text.substring(idx, idx + query.length)));
                        frag.appendChild(mk);
                        marks.push(mk);
                        pos = idx + query.length;
                    }
                    textNode.parentNode.replaceChild(frag, textNode);
                }
                if (marks.length > 0) {
                    activeIdx = 0;
                    setActive(0);
                }
            }
            function setActive(i) {
                marks.forEach(function(m) { m.classList.remove(ACTIVE); });
                if (i < 0 || i >= marks.length) return;
                activeIdx = i;
                marks[i].classList.add(ACTIVE);
                try { marks[i].scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' }); } catch (e) {}
            }
            function next() {
                if (marks.length === 0) return;
                setActive((activeIdx + 1) % marks.length);
            }
            function prev() {
                if (marks.length === 0) return;
                setActive((activeIdx - 1 + marks.length) % marks.length);
            }
            function matchCount() { return marks.length; }
            function active1Based() { return marks.length === 0 ? 0 : activeIdx + 1; }
            function activeRectInViewport() {
                if (activeIdx < 0 || activeIdx >= marks.length) return null;
                var r = marks[activeIdx].getBoundingClientRect();
                return { top: r.top, left: r.left, width: r.width, height: r.height };
            }
            function goToMatch(oneBased) {
                if (marks.length === 0) return;
                var i = (oneBased | 0) - 1;
                if (i < 0) i = 0;
                if (i >= marks.length) i = marks.length - 1;
                setActive(i);
            }
            return { search: search, clear: clear, next: next, prev: prev, matchCount: matchCount, active1Based: active1Based, activeRectInViewport: activeRectInViewport, goToMatch: goToMatch };
        })();
        function reportHeight() {
            const h = document.body.scrollHeight;
            window.webkit.messageHandlers.heightUpdate.postMessage(h);
        }
        window.addEventListener('load', reportHeight);
        new ResizeObserver(reportHeight).observe(document.body);

        function trinoteSendDebug(msg) {
            try { window.webkit.messageHandlers.debugLog.postMessage(String(msg)); } catch (e) {}
        }
        function trinoteParseHashLink(href) {
            var h = (href || '').trim();
            if (!h) return { noteId: '', viewMode: '', attachmentId: '' };
            if (h.charAt(0) === '#') h = h.slice(1);
            var qIdx = h.indexOf('?');
            var pathPart = qIdx >= 0 ? h.slice(0, qIdx) : h;
            var queryPart = qIdx >= 0 ? h.slice(qIdx + 1) : '';
            var parts = pathPart.replace(/^\\/?/, '').split('/').filter(function(s) { return s.length > 0; });
            var noteId = parts.length ? parts[parts.length - 1] : '';
            if (noteId === 'root') noteId = '';
            var viewMode = '';
            var attachmentId = '';
            if (queryPart) {
                queryPart.split('&').forEach(function(pair) {
                    var eq = pair.indexOf('=');
                    if (eq < 0) return;
                    var k = decodeURIComponent(pair.slice(0, eq));
                    var v = decodeURIComponent(pair.slice(eq + 1));
                    if (k === 'viewMode') viewMode = v;
                    if (k === 'attachmentId') attachmentId = v;
                });
            }
            return { noteId: noteId, viewMode: viewMode, attachmentId: attachmentId };
        }
        function trinoteAttachmentIdFromApiHref(href) {
            var m = (href || '').match(/api\\/attachments\\/([a-zA-Z0-9_-]+)/i);
            return m ? m[1] : '';
        }
        function trinoteHandleLinkClick(e, anchor) {
            var href = (anchor.getAttribute('href') || '').trim();
            if (!href) return false;
            var apiId = trinoteAttachmentIdFromApiHref(href);
            if (apiId) {
                e.preventDefault();
                window.webkit.messageHandlers.attachmentLink.postMessage(apiId);
                return true;
            }
            if (href.indexOf('#/') === 0 || href.indexOf('#root') === 0) {
                var parsed = trinoteParseHashLink(href);
                if (parsed.viewMode === 'attachments' && parsed.attachmentId) {
                    e.preventDefault();
                    window.webkit.messageHandlers.attachmentLink.postMessage(parsed.attachmentId);
                    return true;
                }
                if (parsed.noteId) {
                    e.preventDefault();
                    window.webkit.messageHandlers.noteLink.postMessage(parsed.noteId);
                    return true;
                }
            }
            return false;
        }
        var trinoteLastIncludeNavMs = 0;
        var trinoteLastIncludeNavId = '';
        function trinoteNavigateInclude(inc, reason) {
            var id = inc.getAttribute('data-note-id') || '';
            var now = Date.now();
            if (id && id === trinoteLastIncludeNavId && (now - trinoteLastIncludeNavMs) < 400) return;
            trinoteLastIncludeNavMs = now;
            trinoteLastIncludeNavId = id;
            if (id) window.webkit.messageHandlers.noteLink.postMessage(id);
        }

        function trinoteFindImageNoteTarget(el) {
            // Walk up from the tap target — CKEditor wraps <img> in <figure class="image">, so the
            // actual <img> might be a sibling rather than the ancestor.
            if (!el) return null;
            var cur = el;
            while (cur && cur !== document) {
                if (cur.getAttribute) {
                    var id = cur.getAttribute('data-trinote-image-note-id');
                    if (id) return id;
                }
                if (cur.querySelector) {
                    var inner = cur.querySelector('img[data-trinote-image-note-id]');
                    if (inner) {
                        var innerId = inner.getAttribute('data-trinote-image-note-id');
                        if (innerId) return innerId;
                    }
                }
                cur = cur.parentNode;
            }
            return null;
        }

        document.addEventListener('click', function(e) {
            var inc = e.target.closest('.trinote-include');
            if (inc) {
                // Internal `#/noteId` links anywhere in the card take precedence.
                var a = e.target.closest('a');
                if (a && inc.contains(a)) {
                    if (trinoteHandleLinkClick(e, a)) return;
                }
                // Only the explicit "Open" button opens the linked note (not the title row).
                var openBtn = e.target.closest('button.trinote-include__open');
                if (openBtn && inc.contains(openBtn)) {
                    e.preventDefault();
                    trinoteNavigateInclude(inc, 'open-click');
                    return;
                }
                return;
            }
            var imgTarget = trinoteFindImageNoteTarget(e.target);
            if (imgTarget) {
                e.preventDefault();
                window.webkit.messageHandlers.noteLink.postMessage(imgTarget);
                return;
            }
            var anchor = e.target.closest('a');
            if (anchor) {
                trinoteHandleLinkClick(e, anchor);
            }
        }, true);

        // Direct image listener: some iOS WKWebView tap gestures on <img> don't bubble through
        // figure/anchor wrappers via a synthetic click (only pointer/touch events), so dispatch
        // imageLink navigation on pointerup/touchend too — scoped strictly to images with
        // the data-trinote-image-note-id attribute so we don't hijack other taps.
        (function() {
            var imgs = document.querySelectorAll('img[data-trinote-image-note-id]');
            imgs.forEach(function(img) {
                var startedInside = false;
                img.addEventListener('pointerdown', function() { startedInside = true; }, true);
                img.addEventListener('pointerup', function(e) {
                    if (!startedInside) return;
                    startedInside = false;
                    var id = img.getAttribute('data-trinote-image-note-id') || '';
                    if (!id) return;
                    e.preventDefault();
                    window.webkit.messageHandlers.noteLink.postMessage(id);
                }, true);
                img.addEventListener('click', function(e) {
                    var id = img.getAttribute('data-trinote-image-note-id') || '';
                    if (!id) return;
                    e.preventDefault();
                    window.webkit.messageHandlers.noteLink.postMessage(id);
                }, true);
                img.addEventListener('touchend', function(e) {
                    var id = img.getAttribute('data-trinote-image-note-id') || '';
                    if (!id) return;
                    e.preventDefault();
                    window.webkit.messageHandlers.noteLink.postMessage(id);
                }, { passive: false });
            });
        })();

        // Tap any regular <img> in the note (not a linked image-note, not inside an include card,
        // not wrapped in an anchor) to open it full-screen. Images we serve ourselves are handed to
        // native by reference so it can load the original bytes; anything else (a `data:` URI, a
        // same-origin or remote URL) is captured from the rendered element via `canvas.toDataURL`.
        function trinoteImageIsPreviewable(img) {
            if (!img) return false;
            if (img.hasAttribute('data-trinote-image-note-id')) return false;
            if (img.closest('.trinote-include')) return false;
            if (img.closest('a[href]')) return false;
            return true;
        }
        function trinoteSendImagePreview(img) {
            try {
                var rawSrc = img.getAttribute('src') || '';
                if (rawSrc.lastIndexOf('\(TriliumImageScheme.scheme)://', 0) === 0) {
                    window.webkit.messageHandlers.imagePreview.postMessage({
                        ref: rawSrc,
                        alt: img.getAttribute('alt') || ''
                    });
                    return true;
                }
                var natW = img.naturalWidth || img.width || 0;
                var natH = img.naturalHeight || img.height || 0;
                if (natW <= 0 || natH <= 0) return false;
                var canvas = document.createElement('canvas');
                canvas.width = natW;
                canvas.height = natH;
                var ctx = canvas.getContext('2d');
                if (!ctx) return false;
                ctx.drawImage(img, 0, 0, natW, natH);
                var dataURL;
                try {
                    dataURL = canvas.toDataURL('image/png');
                } catch (e) {
                    // Cross-origin tainted canvases throw on toDataURL — bail silently.
                    trinoteSendDebug('[IMG] toDataURL failed: ' + (e && e.message || e));
                    return false;
                }
                if (!dataURL || dataURL.indexOf('data:') !== 0) return false;
                window.webkit.messageHandlers.imagePreview.postMessage({
                    dataURL: dataURL,
                    alt: img.getAttribute('alt') || ''
                });
                return true;
            } catch (e) {
                trinoteSendDebug('[IMG] preview send failed: ' + (e && e.message || e));
                return false;
            }
        }
        document.addEventListener('click', function(e) {
            var img = e.target && e.target.tagName === 'IMG' ? e.target : null;
            if (!img) return;
            if (!trinoteImageIsPreviewable(img)) return;
            // The earlier handlers (linked image notes, anchors, includes) already returned
            // early via their own `closest()` filters, so reaching here means a plain image.
            if (trinoteSendImagePreview(img)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, false);

        // Per–Open-button listeners (pointerup + touchend) for iOS WKWebView when no synthetic click fires.
        (function() {
            var openBtns = document.querySelectorAll('button.trinote-include__open');
            openBtns.forEach(function(btn) {
                var card = btn.closest('.trinote-include');
                var tapStartedInside = false;
                btn.addEventListener('pointerdown', function() {
                    tapStartedInside = true;
                }, true);
                btn.addEventListener('pointerup', function(e) {
                    if (!tapStartedInside) return;
                    tapStartedInside = false;
                    if (!card) return;
                    e.preventDefault();
                    trinoteNavigateInclude(card, 'pointerup');
                }, true);
                btn.addEventListener('touchend', function(e) {
                    if (!card) return;
                    e.preventDefault();
                    trinoteNavigateInclude(card, 'touchend');
                }, { passive: false });
            });
        })();

        // Enable todo checkboxes for interactive toggling (+ optional list-item reorder)
        (function() {
            if (!\(listInteractionEnabled ? "true" : "false")) return;
            var reorderEnabled = \(checkboxReorderEnabled ? "true" : "false");
            var cycleEnabled = \(taskStateCycleEnabled ? "true" : "false");
            var CYCLE = ['none', 'done', 'doing', 'maybe', 'cancelled'];
            var CYCLE_TITLE = { doing: 'Doing', maybe: 'Maybe', cancelled: 'Cancelled' };
            function updateStrikethrough(cb) {
                var label = cb.closest('.todo-list__label');
                if (!label) return;
                if (cb.checked && !cb.getAttribute('data-trilium-task-state')) {
                    label.classList.add('todo-list__label--checked');
                } else {
                    label.classList.remove('todo-list__label--checked');
                }
            }
            function currentCycleState(cb) {
                var custom = cb.getAttribute('data-trilium-task-state');
                if (custom) return custom;
                return cb.checked ? 'done' : 'none';
            }
            function applyCycleState(cb, state) {
                var label = cb.closest('.todo-list__label');
                var li = cb.closest('li');
                cb.removeAttribute('data-trilium-task-state');
                cb.checked = false;
                if (label) {
                    label.classList.remove('todo-list__label--checked');
                    label.removeAttribute('title');
                }
                if (li) li.removeAttribute('data-trilium-task-state');
                if (state === 'done') {
                    cb.checked = true;
                    if (label) label.classList.add('todo-list__label--checked');
                } else if (state !== 'none') {
                    cb.setAttribute('data-trilium-task-state', state);
                    cb.checked = false;
                    if (label && CYCLE_TITLE[state]) label.setAttribute('title', CYCLE_TITLE[state]);
                    if (li) li.setAttribute('data-trilium-task-state', state);
                }
            }
            function nextCycleState(state) {
                var i = CYCLE.indexOf(state);
                if (i < 0) i = 0;
                return CYCLE[(i + 1) % CYCLE.length];
            }
            function siblingLis(li) {
                var parent = li.parentElement;
                if (!parent) return [];
                return Array.prototype.filter.call(parent.children, function(c) {
                    return c.tagName === 'LI';
                });
            }
            function listItemIndex(li) {
                if (!li || li.dataset.liIndex == null) return null;
                return parseInt(li.dataset.liIndex, 10);
            }
            function postDragState(active) {
                try { window.webkit.messageHandlers.checkboxDragState.postMessage({ active: !!active }); } catch (e) {}
            }
            // Send document clientY; Swift converts through the WKWebView into window
            // coordinates. (touch.screenY is unreliable in iOS WKWebView and often tracks
            // document Y, which breaks edge detection once the outer ScrollView moves.)
            function postDragScroll(clientY) {
                try { window.webkit.messageHandlers.checkboxDragScroll.postMessage({ clientY: clientY }); } catch (e) {}
            }
            function postReorder(fromIndex, beforeIndex) {
                try {
                    window.webkit.messageHandlers.checkboxReorder.postMessage({
                        fromIndex: fromIndex,
                        beforeIndex: (beforeIndex == null ? null : beforeIndex)
                    });
                } catch (e) {}
            }

            var insertLine = document.createElement('div');
            insertLine.className = 'trinote-todo-insert-line';
            document.body.appendChild(insertLine);

            var drag = null;

            function hideInsertLine() {
                insertLine.style.display = 'none';
            }
            function showInsertLineAt(y) {
                insertLine.style.display = 'block';
                insertLine.style.top = Math.max(0, y - 1) + 'px';
            }
            function updateInsertTarget(clientY) {
                if (!drag) return;
                var siblings = drag.siblings;
                var beforeLi = null;
                var lineY = null;
                for (var i = 0; i < siblings.length; i++) {
                    var s = siblings[i];
                    if (s === drag.li) continue;
                    var rect = s.getBoundingClientRect();
                    var mid = rect.top + rect.height / 2;
                    if (clientY < mid) {
                        beforeLi = s;
                        lineY = window.scrollY + rect.top;
                        break;
                    }
                }
                if (!beforeLi) {
                    var last = null;
                    for (var j = siblings.length - 1; j >= 0; j--) {
                        if (siblings[j] !== drag.li) { last = siblings[j]; break; }
                    }
                    if (last) {
                        var lastRect = last.getBoundingClientRect();
                        lineY = window.scrollY + lastRect.bottom;
                    } else {
                        var selfRect = drag.li.getBoundingClientRect();
                        lineY = window.scrollY + selfRect.bottom;
                    }
                }
                drag.beforeLi = beforeLi;
                if (lineY != null) showInsertLineAt(lineY);
            }
            function endDrag(commit) {
                if (!drag) return;
                var state = drag;
                drag = null;
                hideInsertLine();
                state.li.classList.remove('trinote-todo-dragging');
                postDragState(false);
                if (state.usePointer) {
                    document.removeEventListener('pointermove', onPointerMove, true);
                    document.removeEventListener('pointerup', onPointerUp, true);
                    document.removeEventListener('pointercancel', onPointerCancel, true);
                } else {
                    document.removeEventListener('touchmove', onTouchMove, { capture: true });
                    document.removeEventListener('touchend', onTouchEnd, { capture: true });
                    document.removeEventListener('touchcancel', onTouchCancel, { capture: true });
                }
                if (!commit) return;

                var beforeIndex = state.beforeLi ? listItemIndex(state.beforeLi) : null;
                // No-op when dropping in the original place.
                var next = state.li.nextElementSibling;
                while (next && next.tagName !== 'LI') next = next.nextElementSibling;
                var alreadyThere = (state.beforeLi == null && next == null)
                    || (state.beforeLi != null && next === state.beforeLi);
                if (alreadyThere) return;
                if (state.beforeLi) state.parent.insertBefore(state.li, state.beforeLi);
                else state.parent.appendChild(state.li);
                postReorder(state.fromIndex, beforeIndex);
                try { if (typeof reportHeight === 'function') reportHeight(); } catch (e2) {}
            }
            function onTouchMove(e) {
                if (!drag) return;
                if (e.cancelable) e.preventDefault();
                var t = e.touches[0];
                if (!t) return;
                updateInsertTarget(t.clientY);
                postDragScroll(t.clientY);
            }
            function onTouchEnd(e) {
                if (!drag) return;
                if (e.cancelable) e.preventDefault();
                endDrag(true);
            }
            function onTouchCancel() { endDrag(false); }
            function onPointerMove(e) {
                if (!drag || drag.pointerId != null && e.pointerId !== drag.pointerId) return;
                if (e.cancelable) e.preventDefault();
                updateInsertTarget(e.clientY);
                postDragScroll(e.clientY);
            }
            function onPointerUp(e) {
                if (!drag || drag.pointerId != null && e.pointerId !== drag.pointerId) return;
                endDrag(true);
            }
            function onPointerCancel(e) {
                if (!drag || drag.pointerId != null && e.pointerId !== drag.pointerId) return;
                endDrag(false);
            }
            function beginDrag(li, fromIndex, pointerId, usePointer) {
                if (drag) return;
                var parent = li.parentElement;
                if (!parent) return;
                var siblings = siblingLis(li);
                if (siblings.length < 2) return;
                drag = {
                    li: li,
                    parent: parent,
                    siblings: siblings,
                    fromIndex: fromIndex,
                    beforeLi: null,
                    pointerId: pointerId,
                    usePointer: !!usePointer
                };
                li.classList.add('trinote-todo-dragging');
                postDragState(true);
                if (usePointer) {
                    document.addEventListener('pointermove', onPointerMove, true);
                    document.addEventListener('pointerup', onPointerUp, true);
                    document.addEventListener('pointercancel', onPointerCancel, true);
                } else {
                    document.addEventListener('touchmove', onTouchMove, { capture: true, passive: false });
                    document.addEventListener('touchend', onTouchEnd, { capture: true, passive: false });
                    document.addEventListener('touchcancel', onTouchCancel, { capture: true });
                }
            }

            var handleSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>';
            var supportsPointer = typeof window.PointerEvent !== 'undefined';

            const boxes = document.querySelectorAll('input[type="checkbox"]');
            var idx = 0;
            boxes.forEach(function(cb) {
                if (cb.closest('.trinote-include')) {
                    cb.setAttribute('disabled', 'disabled');
                    cb.disabled = true;
                    return;
                }
                cb.removeAttribute('disabled');
                cb.disabled = false;
                cb.dataset.cbIndex = String(idx);
                idx += 1;
                updateStrikethrough(cb);
                if (cycleEnabled) {
                    var stateBeforeClick = null;
                    function cycleFromState(state, e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var next = nextCycleState(state);
                        function apply() {
                            applyCycleState(cb, next);
                            try {
                                window.webkit.messageHandlers.checkboxCycle.postMessage({
                                    index: parseInt(cb.dataset.cbIndex, 10)
                                });
                            } catch (err) {}
                        }
                        // WebKit may discard `checked` set in the same turn as preventDefault on the input.
                        if (e.target === cb) requestAnimationFrame(apply);
                        else apply();
                    }
                    // Snapshot before the native checkbox toggle flips `checked`.
                    cb.addEventListener('pointerdown', function() {
                        stateBeforeClick = currentCycleState(cb);
                    });
                    cb.addEventListener('click', function(e) {
                        var state = stateBeforeClick != null ? stateBeforeClick : currentCycleState(cb);
                        stateBeforeClick = null;
                        cycleFromState(state, e);
                    });
                    var label = cb.closest('.todo-list__label');
                    if (label) {
                        label.addEventListener('click', function(e) {
                            if (e.target === cb) return;
                            cycleFromState(currentCycleState(cb), e);
                        });
                    }
                } else {
                    cb.addEventListener('change', function() {
                        updateStrikethrough(this);
                        window.webkit.messageHandlers.checkboxToggle.postMessage({
                            index: parseInt(this.dataset.cbIndex, 10),
                            checked: this.checked
                        });
                    });
                }
            });

            if (!reorderEnabled) return;
            document.body.classList.add('trinote-list-reorder');

            var allLis = document.querySelectorAll('ul > li, ol > li');
            var liIdx = 0;
            allLis.forEach(function(li) {
                if (li.closest('.trinote-include')) return;
                if (li.querySelector(':scope > .trinote-todo-drag-handle')) return;
                li.dataset.liIndex = String(liIdx);
                var fromIndex = liIdx;
                liIdx += 1;

                var handle = document.createElement('span');
                handle.className = 'trinote-todo-drag-handle';
                handle.setAttribute('role', 'button');
                handle.setAttribute('aria-label', 'Reorder');
                handle.innerHTML = handleSvg;
                li.appendChild(handle);

                if (supportsPointer) {
                    handle.addEventListener('pointerdown', function(e) {
                        if (e.button != null && e.button !== 0) return;
                        e.preventDefault();
                        e.stopPropagation();
                        beginDrag(li, fromIndex, e.pointerId, true);
                        updateInsertTarget(e.clientY);
                        postDragScroll(e.clientY);
                    }, true);
                } else {
                    handle.addEventListener('touchstart', function(e) {
                        if (!e.touches || !e.touches[0]) return;
                        e.preventDefault();
                        e.stopPropagation();
                        beginDrag(li, fromIndex, null, false);
                        updateInsertTarget(e.touches[0].clientY);
                        postDragScroll(e.touches[0].clientY);
                    }, { capture: true, passive: false });
                }
            });
        })();

        // Wrap tables in a horizontally-scrollable container.
        // If a table is inside <figure class="table">, wrap the whole figure.
        (function() {
            document.querySelectorAll('table').forEach(function(tbl) {
                var target = tbl;
                if (tbl.parentElement && tbl.parentElement.tagName === 'FIGURE' && tbl.parentElement.classList.contains('table')) {
                    target = tbl.parentElement;
                }
                if (target.parentElement && target.parentElement.classList.contains('table-scroll-wrapper')) return;
                var wrapper = document.createElement('div');
                wrapper.className = 'table-scroll-wrapper';
                target.parentNode.insertBefore(wrapper, target);
                wrapper.appendChild(target);
            });
            reportHeight();
        })();
        </script>
        \(Self.katexSnippetIfNeeded(for: body))
        \(Self.mermaidSnippetIfNeeded(for: body))
        </body>
        </html>
        """
    }

    /// True when the note HTML contains a Trilium/CKEditor mermaid block (`class="mermaid"` / `class='mermaid'`).
    /// Linked mermaid include cards use pre-rendered inline SVG (`trinote-include__inner--mermaid`) and do
    /// **not** match this — they must not force the bundle `baseURL` or load `vendor/mermaid.min.js`.
    private static func htmlContainsInlineMermaidBlocks(_ html: String) -> Bool {
        // The regex scans the whole body, which is several megabytes once image data URIs are inlined.
        guard html.containsASCIICaseInsensitive("mermaid") else { return false }
        guard let regex = try? NSRegularExpression(pattern: #"(?i)class\s*=\s*["']mermaid["']"#, options: []) else {
            return false
        }
        let range = NSRange(location: 0, length: (html as NSString).length)
        return regex.firstMatch(in: html, options: [], range: range) != nil
    }

    /// Loads bundled `vendor/mermaid.min.js` when the body has inline `<div class="mermaid">` blocks only.
    /// Linked mermaid notes are pre-rendered in `MermaidRenderer` / `mermaid-viewer.html` before load.
    private static func mermaidSnippetIfNeeded(for body: String) -> String {
        guard htmlContainsInlineMermaidBlocks(body) else { return "" }
        return #"""
        <script src="vendor/mermaid.min.js"></script>
        <script>
        (function() {
          function trinoteSendDebug(msg) {
            try { window.webkit.messageHandlers.debugLog.postMessage(String(msg)); } catch (e) {}
          }
          // Strip `width="100%"` / inline `max-width` from mermaid SVG output so wide diagrams render at
          // viewBox-intrinsic width and the `.mermaid` container's `overflow-x: auto` provides horizontal
          // scroll. WebKit treats the `width` presentation attribute as authoritative over CSS `width: auto`.
          function trinoteFixMermaidSvgWidth(svg) {
            if (typeof svg !== 'string' || svg.length === 0) return svg;
            var out = svg;
            out = out.replace(/(<svg\b[^>]*?)\swidth\s*=\s*(["'])[^"']*\2/i, '$1');
            out = out.replace(/(<svg\b[^>]*?)\sheight\s*=\s*(["'])[^"']*\2/i, '$1');
            out = out.replace(/(<svg\b[^>]*?\sstyle\s*=\s*)(["'])([^"']*)\2/i, function(_m, pre, q, css) {
              var cleaned = css
                .replace(/(?:^|;)\s*max-width\s*:[^;]*/gi, '')
                .replace(/(?:^|;)\s*min-width\s*:[^;]*/gi, '')
                .replace(/(?:^|;)\s*width\s*:[^;]*/gi, '')
                .replace(/(?:^|;)\s*height\s*:[^;]*/gi, '')
                .replace(/^\s*;+\s*/, '')
                .replace(/\s*;+\s*$/, '')
                .trim();
              return pre + q + cleaned + q;
            });
            return out;
          }
          function renderAllMermaid() {
            try {
              if (!window.mermaid) return;
              var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'strict',
                theme: isDark ? 'dark' : 'default',
                fontFamily: '-apple-system, system-ui, sans-serif'
              });
              var nodes = document.querySelectorAll('.mermaid:not([data-trinote-mermaid-rendered])');
              nodes.forEach(function(node, idx) {
                node.setAttribute('data-trinote-mermaid-rendered', '1');
                var source = node.textContent || '';
                var id = 'trinote-mmd-' + idx + '-' + Math.random().toString(36).slice(2, 8);
                function applyResult(svgString) {
                  node.innerHTML = trinoteFixMermaidSvgWidth(svgString);
                }
                try {
                  var out = mermaid.render(id, source);
                  if (out && typeof out.then === 'function') {
                    out.then(function(r) { applyResult((r && r.svg) ? r.svg : String(r)); })
                       .catch(function(err) {
                         trinoteSendDebug('[MMD-INLINE] render reject #' + idx + ' err=' + (err && err.message || err));
                       });
                  } else if (out && out.svg) {
                    applyResult(out.svg);
                  } else if (typeof out === 'string') {
                    applyResult(out);
                  }
                } catch (e) {
                  trinoteSendDebug('[MMD-INLINE] render throw #' + idx + ' err=' + (e && e.message || e));
                }
              });
            } catch (e) {
              trinoteSendDebug('[MMD-INLINE] renderAllMermaid throw err=' + (e && e.message || e));
            }
          }
          if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAllMermaid);
          else renderAllMermaid();
        })();
        </script>
        """#
    }

    /// Use the app bundle as the document base when bundled `vendor/…` scripts are referenced (Mermaid, KaTeX) so
    /// WKWebView resolves `vendor/*.js` from the app bundle instead of the note’s canonical base URL.
    private static func effectiveReadOnlyHTMLBaseURL(body: String, canonicalBase: URL?) -> URL? {
        guard readOnlyHTMLNeedsBundleBaseURL(body: body) else { return canonicalBase }
        return Bundle.main.bundleURL
    }

    /// True when the wrapper will inject `vendor/mermaid.min.js` or `vendor/katex/…` for this body.
    ///
    /// Asks the body rather than the wrapped document: the two are equivalent (only a note body carries
    /// `class="mermaid"` or math markup — the wrapper's own `.mermaid` / `.math-tex` CSS rules don't match
    /// either detector), but the body lets those detectors bail on a cheap byte probe instead of running a
    /// regex over the whole document.
    private static func readOnlyHTMLNeedsBundleBaseURL(body: String) -> Bool {
        if htmlContainsInlineMermaidBlocks(body),
           Bundle.main.url(forResource: "mermaid.min", withExtension: "js", subdirectory: "vendor") != nil {
            return true
        }
        if TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(body),
           TriliumMathHTMLSupport.katexJavaScriptIsBundled() {
            return true
        }
        return false
    }

    private static func katexStylesheetLinkIfNeeded(for body: String) -> String {
        guard TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(body),
              TriliumMathHTMLSupport.katexJavaScriptIsBundled() else { return "" }
        return #"<link rel="stylesheet" href="vendor/katex/katex.min.css">"#
    }

    /// KaTeX JS + in-place render for `<script type="math/tex">` and `span.math-tex` (ckeditor5-math shapes).
    private static func katexSnippetIfNeeded(for body: String) -> String {
        guard TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(body),
              TriliumMathHTMLSupport.katexJavaScriptIsBundled() else { return "" }
        return #"""
        <script src="vendor/katex/katex.min.js"></script>
        <script>
        (function() {
          function trinoteRenderTriliumMath() {
            if (!window.katex) return;
            function renderToHTML(tex, displayMode) {
              try {
                return katex.renderToString(tex, { displayMode: displayMode, throwOnError: false });
              } catch (e) {
                return null;
              }
            }
            document.querySelectorAll('script[type^="math/tex"]').forEach(function(sc) {
              var type = sc.getAttribute('type') || '';
              var display = /mode\s*=\s*display/i.test(type);
              var tex = (sc.textContent || '').trim();
              if (!tex) {
                if (sc.parentNode) sc.parentNode.removeChild(sc);
                return;
              }
              var html = renderToHTML(tex, display);
              var host = document.createElement('span');
              host.className = display ? 'katex-display trinote-katex-rendered' : 'trinote-katex-inline trinote-katex-rendered';
              if (html != null) host.innerHTML = html;
              else host.textContent = tex;
              sc.parentNode.replaceChild(host, sc);
            });
            document.querySelectorAll('span.math-tex').forEach(function(sp) {
              var raw = (sp.textContent || '').trim();
              if (!raw) return;
              var display = false;
              var tex = raw;
              if (raw.length >= 4 && raw.charCodeAt(0) === 92 && raw.charAt(1) === '[' &&
                  raw.charCodeAt(raw.length - 2) === 92 && raw.charAt(raw.length - 1) === ']') {
                display = true;
                tex = raw.slice(2, -2).trim();
              } else if (raw.length >= 4 && raw.charCodeAt(0) === 92 && raw.charAt(1) === '(' &&
                  raw.charCodeAt(raw.length - 2) === 92 && raw.charAt(raw.length - 1) === ')') {
                tex = raw.slice(2, -2).trim();
              } else if (raw.length >= 4 && raw.indexOf('$$') === 0 && raw.lastIndexOf('$$') === raw.length - 2) {
                display = true;
                tex = raw.slice(2, -2).trim();
              } else if (raw.length >= 2 && raw.charAt(0) === '$' && raw.charAt(raw.length - 1) === '$' && raw.indexOf('$$') !== 0) {
                tex = raw.slice(1, -1).trim();
              }
              if (!tex) return;
              var html = renderToHTML(tex, display);
              var host = document.createElement('span');
              host.className = display ? 'katex-display trinote-katex-rendered' : 'trinote-katex-inline trinote-katex-rendered';
              if (html != null) host.innerHTML = html;
              else host.textContent = tex;
              sp.parentNode.replaceChild(host, sp);
            });
            try { if (typeof reportHeight === 'function') reportHeight(); } catch (e0) {}
          }
          if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', trinoteRenderTriliumMath);
          else trinoteRenderTriliumMath();
        })();
        </script>
        """#
    }

    /// Trilium internal links use `#/<id>` or `#root/…/<id>`; the note id is always the last path segment.
    private static func noteIdFromTriliumHashLink(url: URL) -> String? {
        TriliumHashLinkNavigation.parse(url: url)?.noteId
    }

    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var loadedHTML: String?
        var loadHTMLStartedAt: CFAbsoluteTime?
        var themeColors: HTMLThemeColors?
        var checkboxReorderEnabled: Bool = false
        var listInteractionEnabled: Bool = true
        var taskStateCycleEnabled: Bool = false
        var checkboxOnlyRevision: Int = 0
        weak var findControl: FindOnPageControl?
        var onNoteLinkTapped: ((String) -> Void)?
        var onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?
        var onTaskStateCycled: ((_ index: Int) -> Void)?
        var onCheckboxReordered: ((_ fromIndex: Int, _ beforeIndex: Int?) -> Void)?
        var onAttachmentLinkTapped: ((String) -> Void)?
        var imageBytes: TriliumImageSchemeHandler.ByteProvider?
        /// Held so the handler outlives the configuration that registered it.
        var imageSchemeHandler: TriliumImageSchemeHandler?
        var onHeightChanged: ((CGFloat) -> Void)?
        var onImagePreview: ((FullScreenImagePayload) -> Void)?

        private weak var enclosingScrollView: UIScrollView?
        private var enclosingScrollWasEnabled: Bool?
        private var dragScrollDisplayLink: CADisplayLink?
        /// Finger Y in window coordinates (not document / screenY).
        private var dragScrollWindowY: CGFloat?
        /// -1 scroll up, 0 idle, +1 scroll down. Kept sticky with hysteresis so edge
        /// autoscroll does not chatter or reverse from tiny coordinate jitter.
        private var dragScrollDirection: Int = 0

        private static let dragScrollEdgeBand: CGFloat = 72
        private static let dragScrollExitSlop: CGFloat = 36
        private static let dragScrollMaxStep: CGFloat = 16

        init(
            onNoteLinkTapped: ((String) -> Void)?,
            onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?,
            onTaskStateCycled: ((_ index: Int) -> Void)?,
            onCheckboxReordered: ((_ fromIndex: Int, _ beforeIndex: Int?) -> Void)?,
            onAttachmentLinkTapped: ((String) -> Void)?,
            imageBytes: TriliumImageSchemeHandler.ByteProvider?,
            onHeightChanged: ((CGFloat) -> Void)?,
            onImagePreview: ((FullScreenImagePayload) -> Void)?
        ) {
            self.onNoteLinkTapped = onNoteLinkTapped
            self.onCheckboxToggled = onCheckboxToggled
            self.onTaskStateCycled = onTaskStateCycled
            self.onCheckboxReordered = onCheckboxReordered
            self.onAttachmentLinkTapped = onAttachmentLinkTapped
            self.imageBytes = imageBytes
            self.onHeightChanged = onHeightChanged
            self.onImagePreview = onImagePreview
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "heightUpdate":
                if let height = message.body as? CGFloat, height > 0 {
                    onHeightChanged?(height)
                }
            case "noteLink":
                if let noteId = message.body as? String {
                    onNoteLinkTapped?(noteId)
                }
            case "attachmentLink":
                if let attachmentId = message.body as? String, !attachmentId.isEmpty {
                    onAttachmentLinkTapped?(attachmentId)
                }
            case "debugLog":
                if let s = message.body as? String {
                    Log.ui.debug("[INCLUDE] HTMLNoteView JS: \(s, privacy: .public)")
                }
            case "checkboxToggle":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let index = Self.intFromScriptValue(dict["index"]),
                      let checked = Self.boolFromScriptValue(dict["checked"])
                else {
                    CheckboxPerf.log("js checkboxToggle parse-failed")
                    return
                }
                CheckboxPerf.log("js checkboxToggle index=\(index) checked=\(checked) (native toggleCheckbox next)")
                onCheckboxToggled?(index, checked)
            case "checkboxCycle":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let index = Self.intFromScriptValue(dict["index"])
                else {
                    CheckboxPerf.log("js checkboxCycle parse-failed")
                    return
                }
                onTaskStateCycled?(index)
            case "checkboxReorder":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let fromIndex = Self.intFromScriptValue(dict["fromIndex"])
                else { return }
                let beforeIndex: Int?
                if dict["beforeIndex"] == nil || dict["beforeIndex"] is NSNull {
                    beforeIndex = nil
                } else {
                    beforeIndex = Self.intFromScriptValue(dict["beforeIndex"])
                }
                onCheckboxReordered?(fromIndex, beforeIndex)
            case "checkboxDragState":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let active = Self.boolFromScriptValue(dict["active"])
                else { return }
                if active {
                    beginCheckboxDrag()
                } else {
                    endCheckboxDrag()
                }
            case "checkboxDragScroll":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let clientY = Self.cgFloatFromScriptValue(dict["clientY"]),
                      let webView
                else { return }
                // Map document clientY through the (full-height) web view into the window.
                // This stays correct while the outer SwiftUI ScrollView moves under the finger.
                let windowY = webView.convert(CGPoint(x: webView.bounds.midX, y: clientY), to: nil).y
                dragScrollWindowY = windowY
            case "imagePreview":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body) else { return }
                let title = (dict["alt"] as? String).flatMap { $0.isEmpty ? nil : $0 }
                // Scheme-served images are fetched natively instead of captured out of the page: their
                // canvas is cross-origin tainted, and re-encoding a full-resolution photo to PNG just to
                // pass it back over the bridge cost tens of megabytes per tap.
                if let ref = dict["ref"] as? String,
                   let reference = TriliumImageScheme.reference(fromURLString: ref) {
                    guard let imageBytes else { return }
                    Task { [weak self] in
                        guard let data = await imageBytes(reference.routeType, reference.entityId),
                              let image = UIImage(data: data)
                        else { return }
                        self?.onImagePreview?(FullScreenImagePayload(image: image, title: title))
                    }
                    return
                }
                guard let dataURL = dict["dataURL"] as? String,
                      let image = Self.imageFromDataURL(dataURL)
                else { return }
                onImagePreview?(FullScreenImagePayload(image: image, title: title))
            default:
                break
            }
        }

        func beginCheckboxDrag() {
            guard let webView else { return }
            // Always re-resolve: the representable can move in the hierarchy between drags.
            enclosingScrollView = Self.findEnclosingScrollView(from: webView)
            guard let scrollView = enclosingScrollView else { return }
            dragScrollWindowY = nil
            dragScrollDirection = 0
            if enclosingScrollWasEnabled == nil {
                enclosingScrollWasEnabled = scrollView.isScrollEnabled
                scrollView.isScrollEnabled = false
            }
            if dragScrollDisplayLink == nil {
                let link = CADisplayLink(target: self, selector: #selector(handleDragScrollTick))
                link.add(to: .main, forMode: .common)
                dragScrollDisplayLink = link
            }
        }

        func endCheckboxDrag() {
            dragScrollDisplayLink?.invalidate()
            dragScrollDisplayLink = nil
            dragScrollWindowY = nil
            dragScrollDirection = 0
            if let scrollView = enclosingScrollView, let wasEnabled = enclosingScrollWasEnabled {
                scrollView.isScrollEnabled = wasEnabled
            }
            enclosingScrollWasEnabled = nil
        }

        @objc private func handleDragScrollTick() {
            guard let scrollView = enclosingScrollView, let windowY = dragScrollWindowY else { return }

            let window = webView?.window
            let bounds = window?.bounds ?? UIScreen.main.bounds
            let safe = window?.safeAreaInsets ?? .zero
            let topEdge = bounds.minY + safe.top + Self.dragScrollEdgeBand
            let bottomEdge = bounds.maxY - safe.bottom - Self.dragScrollEdgeBand
            let topExit = topEdge + Self.dragScrollExitSlop
            let bottomExit = bottomEdge - Self.dragScrollExitSlop

            // Sticky direction with hysteresis: enter near the edge, leave only after
            // moving clearly back into the middle so autoscroll does not reverse mid-drag.
            var direction = dragScrollDirection
            if direction == -1 {
                if windowY > topExit { direction = 0 }
            } else if direction == 1 {
                if windowY < bottomExit { direction = 0 }
            }
            if direction == 0 {
                if windowY < topEdge {
                    direction = -1
                } else if windowY > bottomEdge {
                    direction = 1
                }
            }
            dragScrollDirection = direction
            guard direction != 0 else { return }

            let intensity: CGFloat
            if direction < 0 {
                intensity = min(1, max(0.2, (topEdge - windowY) / Self.dragScrollEdgeBand))
            } else {
                intensity = min(1, max(0.2, (windowY - bottomEdge) / Self.dragScrollEdgeBand))
            }
            let dy = CGFloat(direction) * Self.dragScrollMaxStep * intensity

            let maxY = max(0, scrollView.contentSize.height - scrollView.bounds.height)
            let newY = min(max(0, scrollView.contentOffset.y + dy), maxY)
            if abs(newY - scrollView.contentOffset.y) > 0.5 {
                scrollView.setContentOffset(CGPoint(x: scrollView.contentOffset.x, y: newY), animated: false)
            }
        }

        private static func findEnclosingScrollView(from view: UIView) -> UIScrollView? {
            var current: UIView? = view.superview
            while let c = current {
                // Prefer the outer SwiftUI ScrollView, not the WKWebView's own scroll view.
                if let sv = c as? UIScrollView, sv !== (view as? WKWebView)?.scrollView {
                    return sv
                }
                current = c.superview
            }
            return nil
        }

        private static func cgFloatFromScriptValue(_ value: Any?) -> CGFloat? {
            switch value {
            case let cg as CGFloat: return cg
            case let d as Double: return CGFloat(d)
            case let f as Float: return CGFloat(f)
            case let n as NSNumber: return CGFloat(truncating: n)
            case let i as Int: return CGFloat(i)
            default: return nil
            }
        }

        /// Decodes a `data:image/...;base64,...` URI delivered from the read-only HTML.
        private static func imageFromDataURL(_ dataURL: String) -> UIImage? {
            guard dataURL.hasPrefix("data:") else { return nil }
            guard let comma = dataURL.firstIndex(of: ","),
                  dataURL[..<comma].contains(";base64") else { return nil }
            let base64 = String(dataURL[dataURL.index(after: comma)...])
            guard let data = Data(base64Encoded: base64, options: [.ignoreUnknownCharacters]) else { return nil }
            return UIImage(data: data)
        }

        /// WKWebView often delivers `postMessage` numbers as `NSNumber` / `Double`, so `as? Int` fails silently.
        private static func dictionaryFromScriptMessageBody(_ body: Any) -> [String: Any]? {
            if let d = body as? [String: Any] { return d }
            guard let ns = body as? [AnyHashable: Any] else { return nil }
            var out: [String: Any] = [:]
            for (k, v) in ns {
                let key: String?
                if let s = k as? String {
                    key = s
                } else if let s = k as? NSString {
                    key = s as String
                } else {
                    key = nil
                }
                guard let key else { continue }
                out[key] = v
            }
            return out
        }

        private static func intFromScriptValue(_ value: Any?) -> Int? {
            switch value {
            case let i as Int: return i
            case let n as NSNumber: return n.intValue
            case let d as Double: return Int(d)
            case let s as String: return Int(s)
            default: return nil
            }
        }

        private static func boolFromScriptValue(_ value: Any?) -> Bool? {
            switch value {
            case let b as Bool: return b
            case let n as NSNumber: return n.boolValue
            case let i as Int: return i != 0
            default: return nil
            }
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            if let started = loadHTMLStartedAt {
                CheckboxPerf.log(
                    "webView didFinish loadHTMLStringMs=\(CheckboxPerf.ms(started)) lastToggle=#\(CheckboxPerf.lastToggleID) sinceToggleMs=\(CheckboxPerf.sinceLastToggleMs())"
                )
                loadHTMLStartedAt = nil
            }
            findControl?.registerHTMLWebView(webView)
            findControl?.reapplyHTMLSearchIfNeeded()
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction) async -> WKNavigationActionPolicy {
            guard let url = navigationAction.request.url else { return .allow }

            if navigationAction.navigationType == .linkActivated {
                if url.scheme?.lowercased() == "triliuminclude", url.host?.lowercased() == "file" {
                    let path = url.path.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
                    let segs = path.split(separator: "/").map(String.init).filter { !$0.isEmpty }
                    if let nid = segs.first, !nid.isEmpty {
                        onNoteLinkTapped?(nid)
                        return .cancel
                    }
                }

                let urlString = url.absoluteString
                if urlString.contains("#/") || urlString.localizedCaseInsensitiveContains("#root/") {
                    if let parsed = TriliumHashLinkNavigation.parse(url: url),
                       parsed.viewMode == "attachments",
                       let attachmentId = parsed.attachmentId,
                       !attachmentId.isEmpty {
                        onAttachmentLinkTapped?(attachmentId)
                        return .cancel
                    }
                    if let noteId = HTMLNoteWebView.noteIdFromTriliumHashLink(url: url), !noteId.isEmpty {
                        onNoteLinkTapped?(noteId)
                        return .cancel
                    }
                }

                // Fragment-only intra-note jump (CKEditor 5 bookmark / Trilium v0.103+ anchor link),
                // e.g. `<a href="#Rights">`. Scroll to the target element directly; the default
                // WKWebView behaviour would otherwise navigate the entire document which loses our
                // SwiftUI state. Falls back to UIApplication for unknown schemes if no target exists.
                if let fragment = url.fragment,
                   !fragment.isEmpty,
                   HTMLNoteAnchorRouting.urlIsFragmentOnly(url, against: webView.url) {
                    scrollToAnchor(fragment, in: webView)
                    return .cancel
                }

                if let ref = TriliumAttachmentURLParser.entityReference(from: url),
                   ref.routeType == "attachments" {
                    onAttachmentLinkTapped?(ref.entityId)
                    return .cancel
                }

                await UIApplication.shared.open(url)
                return .cancel
            }

            return .allow
        }

        /// Scrolls a WKWebView to a named anchor (`<a id="…">` or `<a name="…">`).
        private func scrollToAnchor(_ fragment: String, in webView: WKWebView) {
            let escaped = fragment
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
            let js = """
            (function(){
                var f = '\(escaped)';
                var t = document.getElementById(f)
                     || document.querySelector('a[name="' + f + '"]')
                     || document.querySelector('[data-anchor-id="' + f + '"]');
                if (t && typeof t.scrollIntoView === 'function') {
                    try { t.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' }); } catch (e) {
                        t.scrollIntoView();
                    }
                    return true;
                }
                return false;
            })();
            """
            webView.evaluateJavaScript(js, completionHandler: nil)
        }

    }
}

/// Helpers for routing tapped anchor links inside the read-only `HTMLNoteView`.
/// Extracted from the private `Coordinator` so they can be unit-tested via `@testable`.
enum HTMLNoteAnchorRouting {
    /// True when the link target differs from the current document only by its `#fragment`
    /// (or has no path/host at all — the typical `href="#anchor"` case from CKEditor 5
    /// bookmarks / Trilium v0.103+ anchors).
    static func urlIsFragmentOnly(_ url: URL, against current: URL?) -> Bool {
        if url.host == nil, url.path.isEmpty || url.path == "/" { return true }
        guard let current else { return false }
        return url.scheme == current.scheme
            && url.host == current.host
            && url.path == current.path
            && url.query == current.query
    }
}
