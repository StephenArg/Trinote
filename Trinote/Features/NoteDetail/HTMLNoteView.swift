import SwiftUI
import WebKit

struct HTMLNoteView: View {
    let html: String
    let baseURL: URL?
    var onNoteLinkTapped: ((String) -> Void)?
    var onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?
    /// When set, the web view registers for in-page find (read-only).
    var findControl: FindOnPageControl?

    @State private var contentHeight: CGFloat = 200
    @State private var fullScreenImage: FullScreenImagePayload?
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue
    @AppStorage("useCustomTextColor") private var useCustomTextColor: Bool = false
    @AppStorage("customLightTextColor") private var customLightTextColor: String = "#1c1c1e"
    @AppStorage("customDarkTextColor") private var customDarkTextColor: String = "#aaaaaa"

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
            onNoteLinkTapped: onNoteLinkTapped,
            onCheckboxToggled: onCheckboxToggled,
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
    var onNoteLinkTapped: ((String) -> Void)?
    var onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?
    var findControl: FindOnPageControl?
    var onHeightChanged: ((CGFloat) -> Void)?
    var onImagePreview: ((FullScreenImagePayload) -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(
            onNoteLinkTapped: onNoteLinkTapped,
            onCheckboxToggled: onCheckboxToggled,
            onHeightChanged: onHeightChanged,
            onImagePreview: onImagePreview
        )
    }

    func makeUIView(context: Context) -> WKWebView {
        let handler = context.coordinator
        let contentController = WKUserContentController()
        contentController.add(handler, name: "heightUpdate")
        contentController.add(handler, name: "noteLink")
        contentController.add(handler, name: "checkboxToggle")
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
        handler.findControl = findControl
        let wrapped = Self.wrapHTML(html, theme: themeColors)
        webView.loadHTMLString(wrapped, baseURL: Self.effectiveReadOnlyHTMLBaseURL(wrapped: wrapped, canonicalBase: baseURL))
        handler.loadedHTML = html

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let coordinator = context.coordinator
        coordinator.findControl = findControl
        coordinator.onNoteLinkTapped = onNoteLinkTapped
        coordinator.onCheckboxToggled = onCheckboxToggled
        coordinator.onHeightChanged = onHeightChanged
        coordinator.onImagePreview = onImagePreview
        findControl?.registerHTMLWebView(webView)

        let needsReload = html != coordinator.loadedHTML || themeColors != coordinator.themeColors
        guard needsReload else { return }
        coordinator.loadedHTML = html
        coordinator.themeColors = themeColors
        let wrapped = Self.wrapHTML(html, theme: themeColors)
        webView.loadHTMLString(wrapped, baseURL: Self.effectiveReadOnlyHTMLBaseURL(wrapped: wrapped, canonicalBase: baseURL))
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "heightUpdate")
        uc.removeScriptMessageHandler(forName: "noteLink")
        uc.removeScriptMessageHandler(forName: "checkboxToggle")
        uc.removeScriptMessageHandler(forName: "debugLog")
        uc.removeScriptMessageHandler(forName: "imagePreview")
    }

    static func wrapHTML(_ body: String, theme: HTMLThemeColors) -> String {
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
        }
        @media (prefers-color-scheme: dark) {
            :root { --text-color: \(theme.darkText); --code-bg: rgba(255,255,255,0.06); --border: rgba(255,255,255,0.15); }
            body { color: \(theme.darkText); }
            a { color: \(theme.darkLink); }
        }
        @media (prefers-color-scheme: light) {
            :root { --text-color: \(theme.lightText); --code-bg: rgba(0,0,0,0.04); --border: rgba(0,0,0,0.12); }
            body { color: \(theme.lightText); }
            a { color: \(theme.lightLink); }
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
        .todo-list__label__description { flex: 1; transition: opacity 0.15s, text-decoration 0.15s; }
        .todo-list__label--checked .todo-list__label__description { text-decoration: line-through; opacity: 0.5; }
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
        .trinote-include .todo-list__label input[type="checkbox"] { pointer-events: none; opacity: 0.55; }
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
        function trinoteOpenNoteFromLink(href) {
            var raw = href.replace(/^#\\/?/, '');
            var segs = raw.split('/').filter(function(s) { return s.length > 0; });
            var noteId = segs.length ? segs[segs.length - 1] : '';
            if (noteId && noteId !== 'root') window.webkit.messageHandlers.noteLink.postMessage(noteId);
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
                    var href = a.getAttribute('href') || '';
                    if (href.startsWith('#/') || href.startsWith('#root/')) {
                        e.preventDefault();
                        trinoteOpenNoteFromLink(href);
                        return;
                    }
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
                var h = anchor.getAttribute('href') || '';
                if (h.startsWith('#/') || h.startsWith('#root/')) {
                    e.preventDefault();
                    trinoteOpenNoteFromLink(h);
                }
                return;
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
        // not wrapped in an anchor) to open it full-screen. Uses the rendered <img> element so we
        // capture exactly what the user sees, regardless of whether the source is a `data:` URI,
        // a same-origin URL, or a remote URL — `canvas.toDataURL` re-encodes the bytes for native.
        function trinoteImageIsPreviewable(img) {
            if (!img) return false;
            if (img.hasAttribute('data-trinote-image-note-id')) return false;
            if (img.closest('.trinote-include')) return false;
            if (img.closest('a[href]')) return false;
            return true;
        }
        function trinoteSendImagePreview(img) {
            try {
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

        // Enable todo checkboxes for interactive toggling
        (function() {
            function updateStrikethrough(cb) {
                var label = cb.closest('.todo-list__label');
                if (!label) return;
                if (cb.checked) label.classList.add('todo-list__label--checked');
                else label.classList.remove('todo-list__label--checked');
            }
            const boxes = document.querySelectorAll('input[type="checkbox"]');
            var idx = 0;
            boxes.forEach(function(cb) {
                if (cb.closest('.trinote-include')) {
                    cb.setAttribute('disabled', 'disabled');
                    cb.disabled = true;
                    return;
                }
                cb.removeAttribute('disabled');
                cb.dataset.cbIndex = String(idx);
                idx += 1;
                updateStrikethrough(cb);
                cb.addEventListener('change', function() {
                    updateStrikethrough(this);
                    window.webkit.messageHandlers.checkboxToggle.postMessage({
                        index: parseInt(this.dataset.cbIndex, 10),
                        checked: this.checked
                    });
                });
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
    private static func effectiveReadOnlyHTMLBaseURL(wrapped: String, canonicalBase: URL?) -> URL? {
        guard readOnlyHTMLNeedsBundleBaseURL(wrapped: wrapped) else { return canonicalBase }
        return Bundle.main.bundleURL
    }

    /// True when wrapped HTML loads `vendor/mermaid.min.js` or `vendor/katex/…` from the app bundle.
    private static func readOnlyHTMLNeedsBundleBaseURL(wrapped: String) -> Bool {
        if htmlContainsInlineMermaidBlocks(wrapped),
           Bundle.main.url(forResource: "mermaid.min", withExtension: "js", subdirectory: "vendor") != nil {
            return true
        }
        if TriliumMathHTMLSupport.bodyContainsTriliumMathMarkers(wrapped),
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
        guard var frag = url.fragment, !frag.isEmpty else { return nil }
        frag = frag.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        let parts = frag.split(separator: "/").map(String.init).filter { !$0.isEmpty }
        guard let last = parts.last else { return nil }
        if last == "root" { return nil }
        return last
    }

    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var loadedHTML: String?
        var themeColors: HTMLThemeColors?
        weak var findControl: FindOnPageControl?
        var onNoteLinkTapped: ((String) -> Void)?
        var onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?
        var onHeightChanged: ((CGFloat) -> Void)?
        var onImagePreview: ((FullScreenImagePayload) -> Void)?

        init(
            onNoteLinkTapped: ((String) -> Void)?,
            onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?,
            onHeightChanged: ((CGFloat) -> Void)?,
            onImagePreview: ((FullScreenImagePayload) -> Void)?
        ) {
            self.onNoteLinkTapped = onNoteLinkTapped
            self.onCheckboxToggled = onCheckboxToggled
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
            case "debugLog":
                if let s = message.body as? String {
                    Log.ui.debug("[INCLUDE] HTMLNoteView JS: \(s, privacy: .public)")
                }
            case "checkboxToggle":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let index = Self.intFromScriptValue(dict["index"]),
                      let checked = Self.boolFromScriptValue(dict["checked"])
                else { return }
                onCheckboxToggled?(index, checked)
            case "imagePreview":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let dataURL = dict["dataURL"] as? String,
                      let image = Self.imageFromDataURL(dataURL)
                else { return }
                let title = (dict["alt"] as? String).flatMap { $0.isEmpty ? nil : $0 }
                onImagePreview?(FullScreenImagePayload(image: image, title: title))
            default:
                break
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
                    if let noteId = HTMLNoteWebView.noteIdFromTriliumHashLink(url: url), !noteId.isEmpty {
                        onNoteLinkTapped?(noteId)
                        return .cancel
                    }
                }

                await UIApplication.shared.open(url)
                return .cancel
            }

            return .allow
        }
    }
}
