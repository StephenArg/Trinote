import SwiftUI
import WebKit

/// What the transcript page reports back to the app.
enum ChatTranscriptEvent: Equatable, Sendable {
    /// A `#root/…` link in a message.
    case openNote(String)
    /// An http(s) link in a message.
    case openURL(URL)
    /// An image attached to a message was tapped.
    case openImage(attachmentId: String, title: String?)
    case retry
    case regenerate
    /// Whether the transcript is scrolled to its end (drives the jump-to-latest button).
    case atBottom(Bool)
}

/// The chat transcript: one `WKWebView` showing `chat-viewer.html`, fed rendered messages as JSON. The page runs no
/// inline script and loads nothing from the network; links and buttons come back as `ChatTranscriptEvent`s.
struct ChatTranscriptWebView: UIViewRepresentable {
    let transcriptJSON: String
    var streamingJSON: String?
    var themeJSON: String
    /// Bump to scroll to the latest message.
    var scrollToBottomRequest: Int = 0
    /// Loads an image attached to a message, by attachment id.
    var imageProvider: ((String) async -> Data?)?
    var onEvent: ((ChatTranscriptEvent) -> Void)?

    func makeUIView(context: Context) -> WKWebView {
        let contentController = WKUserContentController()
        contentController.add(context.coordinator, name: "chatEvent")
        let configuration = WKWebViewConfiguration()
        configuration.userContentController = contentController
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.keyboardDismissMode = .interactive
        webView.navigationDelegate = context.coordinator
        webView.applyTrinoteAppearanceMode()
        context.coordinator.webView = webView
        context.coordinator.imageProvider = imageProvider
        context.coordinator.onEvent = onEvent
        if let url = Bundle.main.url(forResource: "chat-viewer", withExtension: "html") {
            context.coordinator.pageURL = url
            webView.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let coordinator = context.coordinator
        coordinator.imageProvider = imageProvider
        coordinator.onEvent = onEvent
        webView.applyTrinoteAppearanceMode()
        coordinator.apply(
            transcriptJSON: transcriptJSON,
            streamingJSON: streamingJSON,
            themeJSON: themeJSON,
            scrollRequest: scrollToBottomRequest
        )
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "chatEvent")
        coordinator.webView = nil
    }

    func makeCoordinator() -> Coordinator { Coordinator() }

    @MainActor
    final class Coordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
        weak var webView: WKWebView?
        var pageURL: URL?
        var imageProvider: ((String) async -> Data?)?
        var onEvent: ((ChatTranscriptEvent) -> Void)?

        private var isReady = false
        private var wanted: (transcript: String, streaming: String?, theme: String, scroll: Int)?
        private var sent: (transcript: String?, streaming: String?, theme: String?, scroll: Int) = (nil, nil, nil, 0)
        private var imageRequestsInFlight: Set<String> = []

        func apply(transcriptJSON: String, streamingJSON: String?, themeJSON: String, scrollRequest: Int) {
            wanted = (transcriptJSON, streamingJSON, themeJSON, scrollRequest)
            flush()
        }

        private func flush() {
            guard isReady, let wanted, webView != nil else { return }
            if sent.theme != wanted.theme {
                sent.theme = wanted.theme
                call("window.trinoteChat.setTheme(json)", ["json": wanted.theme])
            }
            if sent.transcript != wanted.transcript {
                sent.transcript = wanted.transcript
                call("window.trinoteChat.setTranscript(json)", ["json": wanted.transcript])
            }
            if sent.streaming != wanted.streaming {
                sent.streaming = wanted.streaming
                if let streaming = wanted.streaming {
                    call("window.trinoteChat.setStreaming(json)", ["json": streaming])
                } else {
                    call("window.trinoteChat.endStreaming()", [:])
                }
            }
            if sent.scroll != wanted.scroll {
                sent.scroll = wanted.scroll
                call("window.trinoteChat.scrollToBottom()", [:])
            }
        }

        private func call(_ body: String, _ arguments: [String: Any]) {
            webView?.callAsyncJavaScript(body, arguments: arguments, in: nil, in: .page) { result in
                if case .failure(let error) = result {
                    Log.ui.warning("Chat page call failed: \(error.localizedDescription)")
                }
            }
        }

        // MARK: Page → app

        nonisolated func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let body = message.body as? [String: Any], let type = body["type"] as? String else { return }
            let payload = body.compactMapValues { $0 as? String }
            let flag = body["atBottom"] as? Bool
            Task { @MainActor in self.handle(type: type, strings: payload, flag: flag) }
        }

        private func handle(type: String, strings: [String: String], flag: Bool?) {
            switch type {
            case "ready":
                isReady = true
                // A fresh page (including one WebKit reloaded after iOS ended its process) has been sent nothing.
                sent = (nil, nil, nil, 0)
                flush()
            case "noteLink":
                if let noteId = Self.noteId(fromHashLink: strings["href"] ?? "") {
                    onEvent?(.openNote(noteId))
                }
            case "externalLink":
                if let url = URL(string: strings["href"] ?? ""), let scheme = url.scheme?.lowercased(), scheme == "http" || scheme == "https" {
                    onEvent?(.openURL(url))
                }
            case "imageOpen":
                if let id = strings["attachmentId"], !id.isEmpty {
                    let title = strings["title"] ?? ""
                    onEvent?(.openImage(attachmentId: id, title: title.isEmpty ? nil : title))
                }
            case "retry":
                onEvent?(.retry)
            case "regenerate":
                onEvent?(.regenerate)
            case "atBottom":
                onEvent?(.atBottom(flag ?? true))
            case "imageRequest":
                if let id = strings["attachmentId"], !id.isEmpty {
                    loadImage(id: id, mime: strings["mime"] ?? "")
                }
            case "log":
                Log.ui.debug("Chat page: \(strings["message"] ?? "")")
            default:
                break
            }
        }

        /// The note id of a `#root/…/<id>` or `#<id>` link, the forms the web client writes.
        nonisolated static func noteId(fromHashLink href: String) -> String? {
            func isNoteId(_ text: String) -> Bool {
                !text.isEmpty && text.allSatisfy { $0.isASCII && ($0.isLetter || $0.isNumber || $0 == "_") }
            }
            if let url = URL(string: "https://trinote.invalid/" + href), let parsed = TriliumHashLinkNavigation.parse(url: url),
               let noteId = parsed.noteId, isNoteId(noteId) {
                return noteId
            }
            let fragment = href.hasPrefix("#") ? String(href.dropFirst()) : href
            guard let last = fragment.split(separator: "/").last.map(String.init), isNoteId(last) else { return nil }
            return last
        }

        private func loadImage(id: String, mime: String) {
            guard let imageProvider, imageRequestsInFlight.insert(id).inserted else { return }
            Task { @MainActor [weak self] in
                let data = await imageProvider(id)
                guard let self else { return }
                self.imageRequestsInFlight.remove(id)
                guard let data, !data.isEmpty else { return }
                let type = mime.hasPrefix("image/") ? mime : "image/png"
                let dataURL = "data:\(type);base64,\(data.base64EncodedString())"
                self.call("window.trinoteChat.setImage(id, dataURL)", ["id": id, "dataURL": dataURL])
            }
        }

        // MARK: Navigation

        nonisolated func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction) async -> WKNavigationActionPolicy {
            let url = navigationAction.request.url
            let pageURL = await MainActor.run { self.pageURL }
            // Only the page itself loads; links are handled by the page's script and come back as events.
            if let url, let pageURL, url.isFileURL, url.path == pageURL.path, navigationAction.navigationType == .other {
                return .allow
            }
            return .cancel
        }
    }
}
