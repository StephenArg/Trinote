import SwiftUI
import WebKit

struct HTMLNoteView: View {
    let html: String
    let baseURL: URL?
    var onNoteLinkTapped: ((String) -> Void)?
    var onCheckboxToggled: ((_ index: Int, _ checked: Bool) -> Void)?

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
        let wrapped = Self.wrapHTML(html, theme: themeColors)
        webView.loadHTMLString(wrapped, baseURL: baseURL)
        handler.loadedHTML = html

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let coordinator = context.coordinator
        coordinator.onNoteLinkTapped = onNoteLinkTapped
        coordinator.onCheckboxToggled = onCheckboxToggled
        coordinator.onHeightChanged = onHeightChanged

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
        ul, ol { padding-left: 24px; }
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
        hr { border: none; border-top: 1px solid var(--border); margin: 16px 0; }
        .math-tex { overflow-x: auto; }
        </style>
        </head>
        <body>
        \(body)
        <script>
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
                if let dict = message.body as? [String: Any],
                   let index = dict["index"] as? Int,
                   let checked = dict["checked"] as? Bool {
                    onCheckboxToggled?(index, checked)
                }
            default:
                break
            }
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
