import WebKit
import XCTest
@testable import Trinote

/// Loads the real `editor.html` and checks Trilium to-do task states (issue #37): stored states come back out of the
/// editor as Trilium writes them (they used to be erased on save), and a tap follows the tap rule.
@MainActor
final class TaskStateEditorTests: XCTestCase {

    private final class LoadWaiter: NSObject, WKNavigationDelegate {
        var continuation: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            continuation?.resume()
            continuation = nil
        }
    }

    private final class MessageSink: NSObject, WKScriptMessageHandler {
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {}
    }

    private static let messageNames = [
        "editorReady", "contentChanged", "pickImage", "editorScroll", "editorTypingActivity", "tableToolsVisible",
        "requestSave", "editorRequest", "debugLog", "pasteImageRequest", "insertToolsAtTopChanged",
    ]

    private var webView: WKWebView!
    private let waiter = LoadWaiter()
    private let sink = MessageSink()

    override func tearDown() async throws {
        webView?.configuration.userContentController.removeAllScriptMessageHandlers()
        webView = nil
        try await super.tearDown()
    }

    private func loadEditor(tapState: String = "done") async throws {
        let url = try XCTUnwrap(Bundle.main.url(forResource: "editor", withExtension: "html"))
        let controller = WKUserContentController()
        for name in Self.messageNames { controller.add(sink, name: name) }
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

        var review = TaskStateCatalog.defaultCustom[0]
        review.name = "_review"
        review.title = "Review"
        review.isCompleted = true
        let states = TaskStateWebConfig(
            states: TaskStateCatalog.defaults + [review], tapState: tapState, menuEnabled: true, isMarkdown: false
        )
        _ = try await call("editorBridge.setTaskStates(JSON.parse(config), css);", ["config": states.json, "css": states.css])
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

    private func item(_ text: String, li: String = "<li>", checked: Bool = false) -> String {
        "\(li)<label class=\"todo-list__label\"><input type=\"checkbox\" disabled=\"disabled\"\(checked ? " checked=\"checked\"" : "")>"
            + "<span class=\"todo-list__label__description\">\(text)</span></label></li>"
    }

    func testStatesSurviveTheEditor() async throws {
        try await loadEditor()
        let html = "<ul class=\"todo-list\">"
            + item("plain")
            + item("done", checked: true)
            + item("doing", li: "<li data-trilium-task-state=\"doing\" title=\"Doing\">")
            + item("review", li: "<li data-trilium-task-state=\"_review\" title=\"Old title\">", checked: true)
            + item("unknown", li: "<li data-trilium-task-state=\"_gone\" title=\"Gone\">", checked: true)
            + "</ul>"

        let result = try await call("editorBridge.setContent(html); return editorBridge.getContent();", ["html": html])
        let out = try XCTUnwrap(result as? String)

        XCTAssertTrue(out.contains("<li data-trilium-task-state=\"doing\" title=\"Doing\"><label class=\"todo-list__label\"><input type=\"checkbox\" disabled=\"\">"), out)
        XCTAssertTrue(out.contains("<li data-trilium-task-state=\"_review\" title=\"Review\"><label class=\"todo-list__label\"><input type=\"checkbox\" disabled=\"\" checked=\"checked\">"), "the server's current title wins: \(out)")
        XCTAssertTrue(out.contains("<li data-trilium-task-state=\"_gone\" title=\"Gone\"><label class=\"todo-list__label\"><input type=\"checkbox\" disabled=\"\" checked=\"checked\">"), "an unknown state is kept as stored: \(out)")
        XCTAssertEqual(out.components(separatedBy: "data-trilium-task-state").count - 1, 3, out)
    }

    func testTapFollowsTheTapRule() async throws {
        try await loadEditor(tapState: "doing")
        let html = "<ul class=\"todo-list\">" + item("a") + item("b", li: "<li data-trilium-task-state=\"doing\" title=\"Doing\">") + "</ul>"
        _ = try await call("editorBridge.setContent(html);", ["html": html])

        _ = try await call("""
        const boxes = document.querySelectorAll('.tiptap ul[data-type="taskList"] > li > label input[type="checkbox"]');
        boxes[0].click();
        boxes[1].click();
        """)
        let content = try await call("return editorBridge.getContent();")
        let out = try XCTUnwrap(content as? String)

        XCTAssertTrue(out.contains("<li data-trilium-task-state=\"doing\" title=\"Doing\"><label class=\"todo-list__label\"><input type=\"checkbox\" disabled=\"\"><span class=\"todo-list__label__description\">a</span>"), "None → the tap state: \(out)")
        XCTAssertTrue(out.contains("<li><label class=\"todo-list__label\"><input type=\"checkbox\" disabled=\"\"><span class=\"todo-list__label__description\">b</span>"), "the tap state → None: \(out)")
    }
}
