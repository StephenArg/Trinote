import WebKit
import XCTest
@testable import Trinote

/// Loads the real `editor.html` and checks Trilium link previews (issue #35): stored previews come back out of the
/// editor exactly as they went in, they are drawn, and a pasted or typed URL becomes one when native answers with
/// its metadata.
@MainActor
final class LinkPreviewEditorTests: XCTestCase {

    private final class LoadWaiter: NSObject, WKNavigationDelegate {
        var continuation: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            continuation?.resume()
            continuation = nil
        }
    }

    /// Stands in for `RichTextEditorView`'s message handlers and keeps the editor's requests.
    @MainActor
    private final class MessageRecorder: NSObject, WKScriptMessageHandler {
        var editorRequests: [[String: Any]] = []
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "editorRequest", let body = message.body as? [String: Any] {
                editorRequests.append(body)
            }
        }
    }

    private static let messageNames = [
        "editorReady", "contentChanged", "pickImage", "editorScroll", "editorTypingActivity", "tableToolsVisible",
        "requestSave", "editorRequest", "debugLog", "pasteImageRequest", "insertToolsAtTopChanged",
    ]

    private var webView: WKWebView!
    private let waiter = LoadWaiter()
    private let recorder = MessageRecorder()

    override func tearDown() async throws {
        webView?.configuration.userContentController.removeAllScriptMessageHandlers()
        webView = nil
        try await super.tearDown()
    }

    private func loadEditor() async throws {
        let url = try XCTUnwrap(Bundle.main.url(forResource: "editor", withExtension: "html"))
        let controller = WKUserContentController()
        for name in Self.messageNames { controller.add(recorder, name: name) }
        let config = WKWebViewConfiguration()
        config.userContentController = controller
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800), configuration: config)
        webView.navigationDelegate = waiter
        await withCheckedContinuation { continuation in
            waiter.continuation = continuation
            webView.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        self.webView = webView
        let ready = try await waitFor("typeof window.editorBridge === 'object' && typeof editor === 'object'")
        XCTAssertTrue(ready, "editor.html never finished starting")
    }

    private func call(_ body: String, _ arguments: [String: Any] = [:]) async throws -> Any? {
        try await webView.callAsyncJavaScript(body, arguments: arguments, contentWorld: .page)
    }

    private func waitFor(_ condition: String, seconds: Double = 15) async throws -> Bool {
        let deadline = Date().addingTimeInterval(seconds)
        while Date() < deadline {
            if let result = try await call("return Boolean(\(condition));") as? Bool, result { return true }
            try await Task.sleep(for: .milliseconds(100))
        }
        return false
    }

    private func roundTrip(_ html: String) async throws -> String {
        let result = try await call("editorBridge.setContent(html); return editorBridge.getContent();", ["html": html])
        return try XCTUnwrap(result as? String)
    }

    private func linkPreviewRequests() -> [[String: Any]] {
        recorder.editorRequests.filter { $0["action"] as? String == "linkPreview" }
    }

    private func waitForLinkPreviewRequest(count: Int = 1, seconds: Double = 5) async throws -> [String: Any]? {
        let deadline = Date().addingTimeInterval(seconds)
        while Date() < deadline {
            let requests = linkPreviewRequests()
            if requests.count >= count { return requests[count - 1] }
            try await Task.sleep(for: .milliseconds(50))
        }
        return nil
    }

    private func answer(_ request: [String: Any], metadata: [String: Any]?) async throws {
        let payload: [String: Any] = ["requestId": request["requestId"] ?? "", "metadata": metadata ?? NSNull()]
        let data = try JSONSerialization.data(withJSONObject: payload)
        _ = try await call("editorBridge.applyLinkPreviewJSON(json);", ["json": String(decoding: data, as: UTF8.self)])
    }

    // MARK: - Fixtures

    /// The stored form of the mention in the issue (what Trilium's CKEditor writes on save).
    private static let issueMention = #"<span class="link-mention" data-url="https://github.com/StephenArg/Trinote/issues" data-embed-type="opengraph" data-title="Issues · StephenArg/Trinote" data-description="Trilium client for iOS. Contribute to StephenArg/Trinote development by creating an account on GitHub." data-favicon="api/attachments/BBpmlSGq6Ibw/image/github.com.svg" data-site-name="GitHub" data-image="api/attachments/ehZwhfolkiMO/image/github.com-issues-7ff4bfeb.jpeg"></span>"#

    private static let githubMetadata: [String: Any] = [
        "url": "https://github.com/StephenArg/Trinote/issues",
        "title": "Issues · StephenArg/Trinote",
        "description": "Trilium client for iOS.",
        "favicon": "api/attachments/BBpmlSGq6Ibw/image/github.com.svg",
        "siteName": "GitHub",
        "image": "api/attachments/ehZwhfolkiMO/image/github.com-issues-7ff4bfeb.jpeg",
        "embedType": "opengraph",
    ]

    // MARK: - Keeping stored previews

    func testAMentionAloneInItsParagraphSurvivesTheEditor() async throws {
        try await loadEditor()
        let html = "<p>Links:</p><p>\(Self.issueMention)</p><p>After</p>"
        let out = try await roundTrip(html)
        XCTAssertEqual(out, html)
    }

    func testAMentionBetweenTextKeepsItsAttributesAndEscaping() async throws {
        try await loadEditor()
        let html = #"<p>See <span class="link-mention" data-url="https://example.com/a?b=1&amp;c=2" data-title="Say &quot;hi&quot; &amp; wave"></span> for details.</p>"#
        let out = try await roundTrip(html)
        XCTAssertEqual(out, html)
    }

    func testCardVideoAndTypelessBlockPreviewsSurviveTheEditor() async throws {
        try await loadEditor()
        let card = #"<section class="link-embed" data-url="https://example.com/post" data-embed-type="opengraph" data-title="A post" data-description="About things" data-favicon="api/attachments/fav1/image/example.com.png" data-site-name="Example" data-image="api/attachments/img1/image/example.com-post-1a2b3c4d.jpeg"></section>"#
        let video = #"<section class="link-embed" data-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" data-embed-type="youtube" data-title="A video" data-site-name="YouTube" data-image="api/attachments/thumb1/image/youtube.jpeg"></section>"#
        let typeless = #"<section class="link-embed" data-url="https://example.com/"></section>"#
        let html = "<p>Before</p>\(card)\(video)\(typeless)<p>After</p>"
        let out = try await roundTrip(html)
        XCTAssertEqual(out, html)
    }

    func testTriliumEditingMarkupIsSavedInItsStoredForm() async throws {
        try await loadEditor()
        // The editing-view HTML quoted in the issue, as copying from Trilium desktop puts it on the clipboard.
        let editing = #"<p><span class="link-mention ck-widget" data-url="https://github.com/StephenArg/Trinote/issues" data-embed-type="opengraph" data-title="Issues · StephenArg/Trinote" data-description="Trilium client for iOS. Contribute to StephenArg/Trinote development by creating an account on GitHub." data-favicon="api/attachments/BBpmlSGq6Ibw/image/github.com.svg" data-site-name="GitHub" data-image="api/attachments/ehZwhfolkiMO/image/github.com-issues-7ff4bfeb.jpeg" contenteditable="false"><span class="link-mention-inner" data-cke-ignore-events="true"><a href="https://github.com/StephenArg/Trinote/issues" rel="noopener noreferrer" class="link-embed-mention"><img src="api/attachments/BBpmlSGq6Ibw/image/github.com.svg" alt="" width="16" height="16" loading="lazy" draggable="false" class="link-embed-mention-favicon link-embed-favicon-dark"><span class="link-embed-mention-title">Issues · StephenArg/Trinote</span></a></span></span></p>"#
        let out = try await roundTrip(editing)
        XCTAssertEqual(out, "<p>\(Self.issueMention)</p>")
    }

    func testTheEditorDrawsMentionsAndCards() async throws {
        try await loadEditor()
        let card = #"<section class="link-embed" data-url="https://example.com/post" data-embed-type="opengraph" data-title="A post" data-image="https://tracker.example/pixel.png"></section>"#
        // Read in the same call as the load: with no image scheme handler here, the favicon removes itself once its
        // load fails.
        let drawn = try await call("""
            editorBridge.setContent(html);
            const mention = document.querySelector('.tiptap span.link-mention a.link-embed-mention');
            const favicon = mention && mention.querySelector('img.link-embed-mention-favicon');
            const card = document.querySelector('.tiptap div.link-embed a.link-embed-card');
            return {
              title: mention ? mention.querySelector('.link-embed-mention-title').textContent : null,
              href: mention ? mention.getAttribute('href') : null,
              favicon: favicon ? favicon.getAttribute('src') : null,
              cardTitle: card ? card.querySelector('.link-embed-card-title').textContent : null,
              cardImages: card ? card.querySelectorAll('img.link-embed-card-image').length : -1,
              placeholder: card ? card.querySelectorAll('.link-embed-card-image-placeholder').length : -1,
            };
            """, ["html": "<p>\(Self.issueMention)</p>\(card)"]) as? [String: Any]
        let result = try XCTUnwrap(drawn)
        XCTAssertEqual(result["title"] as? String, "Issues · StephenArg/Trinote")
        XCTAssertEqual(result["href"] as? String, "https://github.com/StephenArg/Trinote/issues")
        XCTAssertEqual(result["favicon"] as? String, "trinote-img://attachments/BBpmlSGq6Ibw")
        XCTAssertEqual(result["cardTitle"] as? String, "A post")
        // A remote picture is never loaded: the card shows its placeholder instead.
        XCTAssertEqual(result["cardImages"] as? Int, 0)
        XCTAssertEqual(result["placeholder"] as? Int, 1)
    }

    // MARK: - Creating previews

    func testAPastedUrlBecomesAMentionWhenTheServerAnswers() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setAutoLinkPreviews(true);
            editorBridge.setContent('<p>Read</p>');
            editor.commands.focus('end');
            editor.commands.insertContent({ type: 'text', text: ' ' });
            editorBridge.insertPasteboardURL('https://github.com/StephenArg/Trinote/issues');
            """)
        let request = try await waitForLinkPreviewRequest()
        let pending = try XCTUnwrap(request, "the paste asked native for no preview")
        XCTAssertEqual(pending["url"] as? String, "https://github.com/StephenArg/Trinote/issues")
        let linked = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(linked, #"<p>Read <a href="https://github.com/StephenArg/Trinote/issues">https://github.com/StephenArg/Trinote/issues</a></p>"#)

        try await answer(pending, metadata: Self.githubMetadata)
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(out, #"<p>Read <span class="link-mention" data-url="https://github.com/StephenArg/Trinote/issues" data-embed-type="opengraph" data-title="Issues · StephenArg/Trinote" data-description="Trilium client for iOS." data-favicon="api/attachments/BBpmlSGq6Ibw/image/github.com.svg" data-site-name="GitHub" data-image="api/attachments/ehZwhfolkiMO/image/github.com-issues-7ff4bfeb.jpeg"></span></p>"#)
    }

    func testAUrlAloneInItsParagraphBecomesACardOnceTheCaretLeaves() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setAutoLinkPreviews(true);
            editorBridge.setContent('<p></p><p>Next</p>');
            editor.commands.setTextSelection(1);
            editorBridge.insertPasteboardURL('https://github.com/StephenArg/Trinote/issues');
            editor.commands.setTextSelection(editor.state.doc.content.size - 1);
            """)
        let request = try await waitForLinkPreviewRequest()
        let pending = try XCTUnwrap(request)
        try await answer(pending, metadata: Self.githubMetadata)
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(out, #"<section class="link-embed" data-url="https://github.com/StephenArg/Trinote/issues" data-embed-type="opengraph" data-title="Issues · StephenArg/Trinote" data-description="Trilium client for iOS." data-favicon="api/attachments/BBpmlSGq6Ibw/image/github.com.svg" data-site-name="GitHub" data-image="api/attachments/ehZwhfolkiMO/image/github.com-issues-7ff4bfeb.jpeg"></section><p>Next</p>"#)
    }

    func testNoMetadataLeavesThePlainLink() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setAutoLinkPreviews(true);
            editorBridge.setContent('<p>x</p>');
            editor.commands.focus('end');
            editor.commands.insertContent({ type: 'text', text: ' ' });
            editorBridge.insertPasteboardURL('https://example.com/page');
            """)
        let request = try await waitForLinkPreviewRequest()
        let pending = try XCTUnwrap(request)
        try await answer(pending, metadata: nil)
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(out, #"<p>x <a href="https://example.com/page">https://example.com/page</a></p>"#)
    }

    /// Typing the URL, then a space: autolink links it on the space, which is when Trilium makes a preview.
    private static let typeUrlThenSpace = """
        editor.commands.focus('end');
        editor.commands.insertContent({ type: 'text', text: ' ' });
        editor.commands.insertContent({ type: 'text', text: 'https://example.com/typed' });
        editor.commands.insertContent({ type: 'text', text: ' ' });
        """

    func testATypedUrlAsksForAPreviewOnceAutolinkLinksIt() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setAutoLinkPreviews(true);
            editorBridge.setContent('<p>stored <a href="https://example.com/old">https://example.com/old</a></p><p>see</p>');
            """)
        XCTAssertTrue(linkPreviewRequests().isEmpty, "loading a note must not ask for previews")
        _ = try await call(Self.typeUrlThenSpace)
        let request = try await waitForLinkPreviewRequest()
        XCTAssertEqual(request?["url"] as? String, "https://example.com/typed")
        XCTAssertEqual(linkPreviewRequests().count, 1)
    }

    func testNothingIsRequestedWhileAutoPreviewsAreOff() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setAutoLinkPreviews(false);
            editorBridge.setContent('<p>see</p>');
            \(Self.typeUrlThenSpace)
            editorBridge.insertPasteboardURL('https://example.com/pasted');
            """)
        try await Task.sleep(for: .milliseconds(300))
        XCTAssertTrue(linkPreviewRequests().isEmpty)
        // The paste is still a link to itself.
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertTrue(out?.contains(#"<a href="https://example.com/pasted">https://example.com/pasted</a>"#) == true, out ?? "")
    }

    func testPlainLinkFromTheMenuTurnsThePreviewBackIntoItsUrl() async throws {
        try await loadEditor()
        _ = try await roundTrip("<p>See \(Self.issueMention) here</p>")
        _ = try await call("""
            let pos = null;
            editor.state.doc.descendants((node, p) => {
              if (node.type.name === 'linkMention') { pos = p; return false; }
              return true;
            });
            linkPreviewToPlainLink(pos);
            """)
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(out, #"<p>See <a href="https://github.com/StephenArg/Trinote/issues">https://github.com/StephenArg/Trinote/issues</a> here</p>"#)
    }

    // MARK: - Turning a link into a preview from its menu

    /// Taps the first web link and picks the menu row whose label is `label`; returns the menu's labels.
    @discardableResult
    private func tapLinkAndPick(_ label: String?) async throws -> [String] {
        let rows = try await call("""
            const a = document.querySelector('.tiptap a[href^="http"]');
            a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            const menu = document.querySelector('.link-menu-popup.visible');
            if (!menu) return [];
            const labels = Array.from(menu.querySelectorAll('.image-popup-row span')).map(s => s.textContent);
            if (label) {
              const row = Array.from(menu.querySelectorAll('.image-popup-row')).find(r => r.textContent === label);
              if (row) row.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
            }
            return labels;
            """, ["label": label ?? ""]) as? [String]
        return rows ?? []
    }

    private func toastText() async throws -> String? {
        try await call("const t = document.querySelector('.tn-editor-toast.visible'); return t ? t.textContent : null;") as? String
    }

    func testTappingALinkOffersToShowItAsAPreview() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setLinkPreviewSupport(true, false);
            editorBridge.setContent('<p><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">https://www.youtube.com/watch?v=dQw4w9WgXcQ</a></p><ul><li><a href="https://example.com/">in a list</a></li></ul>');
            """)
        let labels = try await tapLinkAndPick(nil)
        XCTAssertEqual(labels, ["Open Link", "Inline", "Card", "Video", "Remove Link"])

        // A link in a list item can only become an inline mention, as in Trilium.
        let listLabels = try await call("""
            document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
            const a = document.querySelector('.tiptap li a');
            a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            return Array.from(document.querySelectorAll('.link-menu-popup.visible .image-popup-row span')).map(s => s.textContent);
            """) as? [String]
        XCTAssertEqual(listLabels, ["Open Link", "Inline", "Remove Link"])
    }

    func testWithoutLinkPreviewsTheMenuOnlyOpensAndRemoves() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setLinkPreviewSupport(false, false);
            editorBridge.setContent('<p><a href="https://example.com/">https://example.com/</a></p>');
            """)
        let labels = try await tapLinkAndPick(nil)
        XCTAssertEqual(labels, ["Open Link", "Remove Link"])
    }

    func testALinkBecomesACardWhenAskedEvenIfThePageCantBeRead() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setLinkPreviewSupport(true, false);
            editorBridge.setContent('<p><a href="https://example.com/page">https://example.com/page</a></p><p>Next</p>');
            """)
        try await tapLinkAndPick("Card")
        let request = try await waitForLinkPreviewRequest()
        let pending = try XCTUnwrap(request)
        XCTAssertEqual(pending["explicit"] as? Bool, true)
        let payload: [String: Any] = [
            "requestId": pending["requestId"] ?? "",
            "metadata": ["url": "https://example.com/page", "title": "example.com", "embedType": "opengraph", "unresolved": true],
            "problem": "pageUnreadable",
            "message": "The server couldn’t read this page.",
        ]
        let data = try JSONSerialization.data(withJSONObject: payload)
        _ = try await call("editorBridge.applyLinkPreviewJSON(json);", ["json": String(decoding: data, as: UTF8.self)])
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(out, #"<section class="link-embed" data-url="https://example.com/page" data-embed-type="opengraph" data-title="example.com"></section><p>Next</p>"#)
        let toast = try await toastText()
        XCTAssertEqual(toast, "The server couldn’t read this page.")
    }

    func testALabelledLinkBecomesAMentionWithoutDetailsWhenOffline() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setLinkPreviewSupport(true, true);
            editorBridge.setContent('<p>See <a href="https://github.com/StephenArg/Trinote/issues">the issues</a> now</p>');
            """)
        try await tapLinkAndPick("Inline")
        let request = try await waitForLinkPreviewRequest()
        let pending = try XCTUnwrap(request)
        let payload: [String: Any] = ["requestId": pending["requestId"] ?? "", "metadata": NSNull(), "problem": "offline", "message": "Offline."]
        let data = try JSONSerialization.data(withJSONObject: payload)
        _ = try await call("editorBridge.applyLinkPreviewJSON(json);", ["json": String(decoding: data, as: UTF8.self)])
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(out, #"<p>See <span class="link-mention" data-url="https://github.com/StephenArg/Trinote/issues" data-embed-type="opengraph"></span> now</p>"#)
    }

    func testAServerWithoutLinkPreviewsKeepsTheLink() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setLinkPreviewSupport(true, false);
            editorBridge.setContent('<p><a href="https://example.com/">https://example.com/</a></p>');
            """)
        try await tapLinkAndPick("Inline")
        let request = try await waitForLinkPreviewRequest()
        let pending = try XCTUnwrap(request)
        let payload: [String: Any] = ["requestId": pending["requestId"] ?? "", "metadata": NSNull(), "problem": "serverTooOld", "message": "Too old."]
        let data = try JSONSerialization.data(withJSONObject: payload)
        _ = try await call("editorBridge.applyLinkPreviewJSON(json);", ["json": String(decoding: data, as: UTF8.self)])
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(out, #"<p><a href="https://example.com/">https://example.com/</a></p>"#)
        let toast = try await toastText()
        XCTAssertEqual(toast, "Too old.")
    }

    func testAUrlPastedThroughWebKitAsksForAPreviewToo() async throws {
        try await loadEditor()
        _ = try await call("""
            editorBridge.setLinkPreviewSupport(true, true);
            editorBridge.setContent('<p>see</p>');
            editor.commands.focus('end');
            editor.commands.insertContent({ type: 'text', text: ' ' });
            editor.view.pasteText('https://example.com/webkit-paste');
            """)
        let request = try await waitForLinkPreviewRequest()
        XCTAssertEqual(request?["url"] as? String, "https://example.com/webkit-paste")
    }

    // MARK: - Favicon contrast

    func testFaviconsThatVanishOnOneBackgroundAreMarkedForIt() async throws {
        try await loadEditor()
        func svg(_ fill: String) -> String {
            "data:image/svg+xml," + #"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><circle cx='8' cy='8' r='7' fill='\#(fill)'/></svg>"#
                .addingPercentEncoding(withAllowedCharacters: .alphanumerics)!
        }
        let black = svg("#000"), white = svg("#fff"), red = svg("#e33")
        let html = "<p>"
            + #"<span class="link-mention" data-url="https://a.example/" data-favicon="\#(black)"></span> "#
            + #"<span class="link-mention" data-url="https://b.example/" data-favicon="\#(white)"></span> "#
            + #"<span class="link-mention" data-url="https://c.example/" data-favicon="\#(red)"></span>"#
            + "</p>"
        _ = try await call("editorBridge.setContent(html);", ["html": html])
        let marked = try await waitFor("""
            document.querySelectorAll('.tiptap img.link-embed-favicon-dark').length === 1
              && document.querySelectorAll('.tiptap img.link-embed-favicon-light').length === 1
            """, seconds: 5)
        XCTAssertTrue(marked, "the black icon should be marked dark and the white one light")
        let classes = try await call("""
            return Array.from(document.querySelectorAll('.tiptap img.link-embed-mention-favicon')).map(i => i.className);
            """) as? [String]
        XCTAssertEqual(classes, [
            "link-embed-mention-favicon link-embed-favicon-dark",
            "link-embed-mention-favicon link-embed-favicon-light",
            "link-embed-mention-favicon",
        ])
        // Saving never carries the drawn classes.
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertFalse(out?.contains("link-embed-favicon") ?? true)
    }
}
