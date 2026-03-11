import SwiftUI
import WebKit

struct HTMLNoteView: View {
    let html: String
    let baseURL: URL?
    var onNoteLinkTapped: ((String) -> Void)?

    @State private var contentHeight: CGFloat = 200

    var body: some View {
        HTMLNoteWebView(
            html: html,
            baseURL: baseURL,
            onNoteLinkTapped: onNoteLinkTapped,
            onHeightChanged: { contentHeight = $0 }
        )
        .frame(height: contentHeight)
    }
}

private struct HTMLNoteWebView: UIViewRepresentable {
    let html: String
    let baseURL: URL?
    var onNoteLinkTapped: ((String) -> Void)?
    var onHeightChanged: ((CGFloat) -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(onNoteLinkTapped: onNoteLinkTapped, onHeightChanged: onHeightChanged)
    }

    func makeUIView(context: Context) -> WKWebView {
        let handler = context.coordinator
        let contentController = WKUserContentController()
        contentController.add(handler, name: "heightUpdate")
        contentController.add(handler, name: "noteLink")

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
        let wrapped = Self.wrapHTML(html)
        webView.loadHTMLString(wrapped, baseURL: baseURL)
        handler.loadedHTML = html

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let coordinator = context.coordinator
        coordinator.onNoteLinkTapped = onNoteLinkTapped
        coordinator.onHeightChanged = onHeightChanged

        guard html != coordinator.loadedHTML else { return }
        coordinator.loadedHTML = html
        let wrapped = Self.wrapHTML(html)
        webView.loadHTMLString(wrapped, baseURL: baseURL)
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "heightUpdate")
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "noteLink")
    }

    static func wrapHTML(_ body: String) -> String {
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
            :root { --text-color: #e5e5e7; --code-bg: rgba(255,255,255,0.06); --border: rgba(255,255,255,0.15); }
            body { color: #e5e5e7; }
            a { color: #5ac8fa; }
        }
        @media (prefers-color-scheme: light) {
            :root { --text-color: #1c1c1e; --code-bg: rgba(0,0,0,0.04); --border: rgba(0,0,0,0.12); }
            body { color: #1c1c1e; }
            a { color: #007AFF; }
        }
        img { max-width: 100%; height: auto; border-radius: 6px; }
        pre { background: var(--code-bg); padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 14px; }
        code { background: var(--code-bg); padding: 2px 6px; border-radius: 4px; font-size: 14px; }
        pre code { background: none; padding: 0; }
        table { border-collapse: collapse; width: 100%; margin: 8px 0; }
        th, td { border: 1px solid var(--border); padding: 8px; text-align: left; }
        th { background: var(--code-bg); font-weight: 600; }
        blockquote { border-left: 4px solid var(--border); margin: 8px 0; padding: 4px 16px; opacity: 0.85; }
        h1, h2, h3, h4, h5, h6 { margin-top: 1em; margin-bottom: 0.5em; }
        ul, ol { padding-left: 24px; }
        ul.todo-list { list-style: none; padding-left: 0; }
        ul.todo-list li { margin: 4px 0; }
        .todo-list__label { display: flex; align-items: flex-start; gap: 6px; cursor: default; }
        .todo-list__label input[type="checkbox"] { margin-top: 4px; flex-shrink: 0; }
        .todo-list__label__description { flex: 1; }
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
        </script>
        </body>
        </html>
        """
    }

    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var loadedHTML: String?
        var onNoteLinkTapped: ((String) -> Void)?
        var onHeightChanged: ((CGFloat) -> Void)?

        init(onNoteLinkTapped: ((String) -> Void)?, onHeightChanged: ((CGFloat) -> Void)?) {
            self.onNoteLinkTapped = onNoteLinkTapped
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
