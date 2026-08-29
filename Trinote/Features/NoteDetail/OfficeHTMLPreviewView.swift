import SwiftUI
import UIKit
import WebKit

/// Read-only renderer for Trilium `/office-preview` HTML fragments (DOCX, XLSX, PPTX, ODF, RTF, EPUB).
///
/// Page JavaScript is disabled. When `fillsAvailableHeight` is false (file notes inside the note
/// `ScrollView`), the web view reports document height and does not scroll internally. When true
/// (full-screen attachment preview), the web view fills and scrolls on its own.
struct OfficeHTMLPreviewView: View {
    let html: String
    var fillsAvailableHeight: Bool = false

    @State private var contentHeight: CGFloat = 160
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue
    @AppStorage("useCustomTextColor") private var useCustomTextColor: Bool = false
    @AppStorage("customLightTextColor") private var customLightTextColor: String = "#1c1c1e"
    @AppStorage("customDarkTextColor") private var customDarkTextColor: String = "#aaaaaa"
    @Environment(\.colorScheme) private var colorScheme

    private var themeColors: HTMLThemeColors {
        let theme = ColorTheme(rawValue: colorTheme) ?? .default
        if useCustomTextColor {
            return HTMLThemeColors(
                lightText: customLightTextColor,
                darkText: customDarkTextColor,
                lightLink: theme.lightLinkColor,
                darkLink: theme.darkLinkColor
            )
        }
        return HTMLThemeColors(
            lightText: theme.lightTextColor,
            darkText: theme.darkTextColor,
            lightLink: theme.lightLinkColor,
            darkLink: theme.darkLinkColor
        )
    }

    var body: some View {
        OfficeHTMLWebView(
            html: html,
            themeColors: themeColors,
            fillsAvailableHeight: fillsAvailableHeight,
            colorScheme: colorScheme,
            onHeightChanged: { contentHeight = max($0, 80) }
        )
        .frame(maxWidth: .infinity, maxHeight: fillsAvailableHeight ? .infinity : nil)
        .frame(height: fillsAvailableHeight ? nil : contentHeight)
        .accessibilityElement(children: .contain)
        .accessibilityLabel(String(localized: "Document preview", comment: "Office/EPUB HTML preview accessibility"))
    }

    /// Host chrome for an officeparser fragment. Avoids `* { box-sizing }` / forced body
    /// type size (those fight Word inline layout) and a post-fragment override so leaked
    /// desktop `.container` padding cannot crush the page on iPhone.
    nonisolated static func wrapHTML(_ body: String, theme: HTMLThemeColors) -> String {
        """
        <!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <style>
        :root { color-scheme: light dark; }
        * { -webkit-text-size-adjust: 100%; }
        html, body { margin: 0; background: transparent; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            padding: 8px 12px 20px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            background: transparent;
            color: var(--text-color);
        }
        @media (prefers-color-scheme: dark) {
            :root { color-scheme: dark; --text-color: \(theme.darkText); --code-bg: rgba(255,255,255,0.06); --border: rgba(255,255,255,0.18); }
            body { color: \(theme.darkText); }
            a { color: \(theme.darkLink); }
        }
        @media (prefers-color-scheme: light) {
            :root { color-scheme: light; --text-color: \(theme.lightText); --code-bg: rgba(0,0,0,0.04); --border: rgba(0,0,0,0.14); }
            body { color: \(theme.lightText); }
            a { color: \(theme.lightLink); }
        }
        img { max-width: 100%; height: auto; }
        .office-preview-scroll { max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        table { border-collapse: collapse; max-width: 100%; }
        /* Word/DOCX fragments rarely set paragraph margins; UA 1em gutters stack and look broken.
           Keep specificity at the element level so later EPUB `p { … }` rules can win. */
        p { margin: 0; }
        p.empty-paragraph { min-height: 1em; }
        h1, h2, h3, h4, h5, h6 { margin: 0.5em 0 0.3em; }
        ul, ol { margin: 0.25em 0; padding-left: 1.5em; }
        pre, code { background: var(--code-bg); border-radius: 4px; }
        pre { padding: 10px; overflow-x: auto; }
        </style>
        </head>
        <body>
        <div class="office-preview-scroll">
        \(body)
        </div>
        <style>
        body { color: var(--text-color) !important; background: transparent !important; }
        .office-preview-scroll .container,
        .office-preview-scroll .spreadsheet-container,
        .office-preview-scroll .presentation-container,
        .office-preview-scroll .pdf-container {
            max-width: 100% !important;
            width: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
            border-radius: 0 !important;
        }
        .office-preview-scroll .page,
        .office-preview-scroll .slide {
            min-height: 0 !important;
            height: auto !important;
            aspect-ratio: auto !important;
            max-width: 100% !important;
            width: auto !important;
        }
        </style>
        </body>
        </html>
        """
    }
}

private struct OfficeHTMLWebView: UIViewRepresentable {
    let html: String
    let themeColors: HTMLThemeColors
    let fillsAvailableHeight: Bool
    let colorScheme: ColorScheme
    var onHeightChanged: ((CGFloat) -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(onHeightChanged: onHeightChanged, fillsAvailableHeight: fillsAvailableHeight)
    }

    func makeUIView(context: Context) -> WKWebView {
        let coordinator = context.coordinator
        let contentController = WKUserContentController()
        contentController.add(coordinator, name: "heightUpdate")
        if !fillsAvailableHeight {
            contentController.addUserScript(Self.heightScript)
        }

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.defaultWebpagePreferences.allowsContentJavaScript = false

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = coordinator
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = fillsAvailableHeight
        webView.scrollView.bounces = fillsAvailableHeight
        webView.scrollView.contentInsetAdjustmentBehavior = fillsAvailableHeight ? .automatic : .never
        if #available(iOS 16.4, *) {
            webView.isInspectable = false
        }
        coordinator.webView = webView
        webView.applyTrinoteAppearanceMode()
        let wrapped = OfficeHTMLPreviewView.wrapHTML(html, theme: themeColors)
        webView.loadHTMLString(wrapped, baseURL: nil)
        coordinator.loadedHTML = html
        coordinator.themeColors = themeColors
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let coordinator = context.coordinator
        coordinator.onHeightChanged = onHeightChanged
        coordinator.fillsAvailableHeight = fillsAvailableHeight
        webView.applyTrinoteAppearanceMode()
        webView.scrollView.isScrollEnabled = fillsAvailableHeight
        let htmlChanged = html != coordinator.loadedHTML
        let themeChanged = themeColors != coordinator.themeColors
        guard htmlChanged || themeChanged else { return }
        coordinator.loadedHTML = html
        coordinator.themeColors = themeColors
        let wrapped = OfficeHTMLPreviewView.wrapHTML(html, theme: themeColors)
        webView.loadHTMLString(wrapped, baseURL: nil)
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        webView.navigationDelegate = nil
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "heightUpdate")
        webView.stopLoading()
    }

    private static let heightScript = WKUserScript(
        source: """
        (function() {
          function report() {
            var body = document.body;
            var el = document.documentElement;
            var h = Math.ceil(Math.max(
              body ? body.scrollHeight : 0,
              body ? body.offsetHeight : 0,
              el ? el.scrollHeight : 0
            ));
            try { window.webkit.messageHandlers.heightUpdate.postMessage(h); } catch (e) {}
          }
          if (document.readyState === 'complete') report();
          else window.addEventListener('load', report);
          try {
            if (typeof ResizeObserver !== 'undefined' && document.body) {
              new ResizeObserver(report).observe(document.body);
            }
          } catch (e) {}
        })();
        """,
        injectionTime: .atDocumentEnd,
        forMainFrameOnly: true
    )

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        var onHeightChanged: ((CGFloat) -> Void)?
        var fillsAvailableHeight: Bool
        var loadedHTML: String = ""
        var themeColors: HTMLThemeColors?
        weak var webView: WKWebView?

        init(onHeightChanged: ((CGFloat) -> Void)?, fillsAvailableHeight: Bool) {
            self.onHeightChanged = onHeightChanged
            self.fillsAvailableHeight = fillsAvailableHeight
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.name == "heightUpdate", !fillsAvailableHeight else { return }
            let height: CGFloat?
            if let n = message.body as? CGFloat {
                height = n
            } else if let n = message.body as? Double {
                height = CGFloat(n)
            } else if let n = message.body as? Int {
                height = CGFloat(n)
            } else {
                height = nil
            }
            guard let height, height > 0 else { return }
            webView?.scrollView.setContentOffset(.zero, animated: false)
            onHeightChanged?(height)
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            guard !fillsAvailableHeight else { return }
            webView.evaluateJavaScript(
                "Math.ceil(Math.max(document.body ? document.body.scrollHeight : 0, document.documentElement ? document.documentElement.scrollHeight : 0))"
            ) { [weak self] result, _ in
                let height: CGFloat?
                if let n = result as? CGFloat {
                    height = n
                } else if let n = result as? Double {
                    height = CGFloat(n)
                } else if let n = result as? Int {
                    height = CGFloat(n)
                } else {
                    height = nil
                }
                guard let height, height > 0 else { return }
                self?.onHeightChanged?(height)
            }
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction) async -> WKNavigationActionPolicy {
            guard let url = navigationAction.request.url else { return .allow }
            if navigationAction.navigationType == .linkActivated {
                if let fragment = url.fragment,
                   !fragment.isEmpty,
                   HTMLNoteAnchorRouting.urlIsFragmentOnly(url, against: webView.url) {
                    return .cancel
                }
                await UIApplication.shared.open(url)
                return .cancel
            }
            return .allow
        }
    }
}
