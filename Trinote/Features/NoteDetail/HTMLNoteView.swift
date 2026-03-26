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
            onHeightChanged: { contentHeight = $0 }
        )
        .frame(height: contentHeight)
    }
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

    func makeCoordinator() -> Coordinator {
        Coordinator(onNoteLinkTapped: onNoteLinkTapped, onCheckboxToggled: onCheckboxToggled, onHeightChanged: onHeightChanged)
    }

    func makeUIView(context: Context) -> WKWebView {
        let handler = context.coordinator
        let contentController = WKUserContentController()
        contentController.add(handler, name: "heightUpdate")
        contentController.add(handler, name: "noteLink")
        contentController.add(handler, name: "checkboxToggle")

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = true

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
        webView.loadHTMLString(wrapped, baseURL: baseURL)
        handler.loadedHTML = html

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let coordinator = context.coordinator
        coordinator.findControl = findControl
        coordinator.onNoteLinkTapped = onNoteLinkTapped
        coordinator.onCheckboxToggled = onCheckboxToggled
        coordinator.onHeightChanged = onHeightChanged
        findControl?.registerHTMLWebView(webView)

        let needsReload = html != coordinator.loadedHTML || themeColors != coordinator.themeColors
        guard needsReload else { return }
        coordinator.loadedHTML = html
        coordinator.themeColors = themeColors
        let wrapped = Self.wrapHTML(html, theme: themeColors)
        webView.loadHTMLString(wrapped, baseURL: baseURL)
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "heightUpdate")
        uc.removeScriptMessageHandler(forName: "noteLink")
        uc.removeScriptMessageHandler(forName: "checkboxToggle")
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
            font-size: 16px;
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
        pre { background: var(--code-bg); padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 14px; }
        code { background: var(--code-bg); padding: 2px 6px; border-radius: 4px; font-size: 14px; }
        pre code { background: none; padding: 0; }
        table { border-collapse: collapse; width: 100%; margin: 8px 0; }
        th, td { border: 1px solid var(--border); padding: 8px; text-align: left; }
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
        hr { border: none; border-top: 1px solid var(--border); margin: 16px 0; }
        .math-tex { overflow-x: auto; }
        mark.trinote-find-hit { background-color: rgba(255, 204, 0, 0.45); color: inherit; padding: 0; }
        mark.trinote-find-hit-active { background-color: rgba(255, 149, 0, 0.72); color: inherit; padding: 0; }
        </style>
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

        document.addEventListener('click', function(e) {
            const a = e.target.closest('a');
            if (!a) return;
            const href = a.getAttribute('href') || '';
            if (href.startsWith('#/') || href.startsWith('#root/')) {
                e.preventDefault();
                const noteId = href.replace(/^#\\/?/, '').split('/')[0];
                if (noteId) window.webkit.messageHandlers.noteLink.postMessage(noteId);
            }
        });

        // Enable todo checkboxes for interactive toggling
        (function() {
            function updateStrikethrough(cb) {
                var label = cb.closest('.todo-list__label');
                if (!label) return;
                if (cb.checked) label.classList.add('todo-list__label--checked');
                else label.classList.remove('todo-list__label--checked');
            }
            const boxes = document.querySelectorAll('input[type="checkbox"]');
            boxes.forEach(function(cb, idx) {
                cb.removeAttribute('disabled');
                cb.dataset.cbIndex = idx;
                updateStrikethrough(cb);
                cb.addEventListener('change', function() {
                    updateStrikethrough(this);
                    window.webkit.messageHandlers.checkboxToggle.postMessage({
                        index: parseInt(this.dataset.cbIndex),
                        checked: this.checked
                    });
                });
            });
        })();
        </script>
        </body>
        </html>
        """
    }

    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var loadedHTML: String?
        var themeColors: HTMLThemeColors?
        weak var findControl: FindOnPageControl?
        var onNoteLinkTapped: ((String) -> Void)?
        var onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?
        var onHeightChanged: ((CGFloat) -> Void)?

        init(onNoteLinkTapped: ((String) -> Void)?, onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?, onHeightChanged: ((CGFloat) -> Void)?) {
            self.onNoteLinkTapped = onNoteLinkTapped
            self.onCheckboxToggled = onCheckboxToggled
            self.onHeightChanged = onHeightChanged
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
            case "checkboxToggle":
                guard let dict = Self.dictionaryFromScriptMessageBody(message.body),
                      let index = Self.intFromScriptValue(dict["index"]),
                      let checked = Self.boolFromScriptValue(dict["checked"])
                else { return }
                onCheckboxToggled?(index, checked)
            default:
                break
            }
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
                let urlString = url.absoluteString

                if urlString.contains("#/") {
                    let parts = urlString.components(separatedBy: "#/")
                    if let noteId = parts.last?.components(separatedBy: "/").first, !noteId.isEmpty {
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
