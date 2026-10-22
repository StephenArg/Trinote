import WebKit
import XCTest
@testable import Trinote

/// Loads the real `chat-viewer.html` in WebKit and checks what it draws: Mermaid repair and fallback, and cards
/// that stay open while the stream redraws.
@MainActor
final class ChatViewerPageTests: XCTestCase {

    private final class LoadWaiter: NSObject, WKNavigationDelegate {
        var continuation: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            continuation?.resume()
            continuation = nil
        }
    }

    private var webView: WKWebView!
    private let waiter = LoadWaiter()

    private func loadPage() async throws -> WKWebView {
        let url = try XCTUnwrap(Bundle.main.url(forResource: "chat-viewer", withExtension: "html"))
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800))
        webView.navigationDelegate = waiter
        await withCheckedContinuation { continuation in
            waiter.continuation = continuation
            webView.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        self.webView = webView
        return webView
    }

    private func call(_ body: String, _ arguments: [String: Any] = [:]) async throws -> Any? {
        try await webView.callAsyncJavaScript(body, arguments: arguments, contentWorld: .page)
    }

    /// Polls `condition` (a JS expression) until it's true, for up to `seconds`.
    private func waitFor(_ condition: String, seconds: Double = 15) async throws -> Bool {
        let deadline = Date().addingTimeInterval(seconds)
        while Date() < deadline {
            if let result = try await call("return Boolean(\(condition));") as? Bool, result { return true }
            try await Task.sleep(for: .milliseconds(200))
        }
        return false
    }

    private func transcript(markdown: String) -> String {
        let content = LlmChatContent(messages: [
            StoredMessage(id: "u1", role: .user, content: .text("Draw it")),
            StoredMessage(id: "a1", role: .assistant, content: .blocks([.text(markdown)]))
        ])
        return ChatTranscriptRenderer.transcriptJSON(for: content, canRetryLast: false)
    }

    func testModelMermaidIsRepairedAndBrokenMermaidShowsItsCode() async throws {
        _ = try await loadPage()
        let markdown = """
        Orbitals:

        ```mermaid
        graph LR
            A[sp² (C)] -- σ --> B[sp² (C)]
            A -- p (perp) --> C[π bond plane]
            B -- p (perp) --> C
        ```

        Mechanism:

        ```mermaid
        sequenceDiagram
            participant C=C as Alkene
            C=C->>H+ : π electrons attack H+
            H+-->>C–C+ : carbocation intermediate
        ```

        Broken:

        ```mermaid
        graph TD
            A --> ((((
        ```
        """
        _ = try await call("window.trinoteChat.setTranscript(json)", ["json": transcript(markdown: markdown)])
        let drawn = try await waitFor("document.querySelectorAll('.mermaid svg').length === 2 && document.querySelectorAll('.mermaid-failed').length === 1")
        let summary = try await call("""
            return JSON.stringify({
                svgs: document.querySelectorAll('.mermaid svg').length,
                failed: Array.from(document.querySelectorAll('.mermaid-failed pre')).map(e => e.textContent),
                bombs: document.body.innerHTML.includes('Syntax error in text')
            });
            """) as? String
        XCTAssertTrue(drawn, "expected two repaired diagrams and one shown as code, got \(summary ?? "nil")")
        XCTAssertFalse(summary?.contains("\"bombs\":true") ?? true, "Mermaid's error graphic must not appear")
        XCTAssertTrue(summary?.contains("A --> ((((") ?? false)
    }

    func testAnOpenedToolCardStaysOpenWhileTheStreamRedraws() async throws {
        _ = try await loadPage()
        _ = try await call("window.trinoteChat.setTranscript(json)", ["json": transcript(markdown: "Hi")])
        let first = ChatTranscriptRenderer.streamingJSON(status: nil, thinking: "Let me think", blocks: [
            .toolCall(ToolCall(id: "t1", toolName: "search_notes", input: ["query": .string("bonds")]))
        ])
        _ = try await call("window.trinoteChat.setStreaming(json)", ["json": first])
        _ = try await call("document.querySelector('[data-key=\"tool:t1\"]').open = true; document.querySelector('[data-key=\"thinking:stream\"]').open = true;")
        try await Task.sleep(for: .milliseconds(150)) // toggle events are queued
        let second = ChatTranscriptRenderer.streamingJSON(status: nil, thinking: "Let me think more", blocks: [
            .toolCall(ToolCall(id: "t1", toolName: "search_notes", input: ["query": .string("bonds")], result: "[]")),
            .text("Found")
        ])
        _ = try await call("window.trinoteChat.setStreaming(json)", ["json": second])
        let stillOpen = try await call("return document.querySelector('[data-key=\"tool:t1\"]').open && document.querySelector('[data-key=\"thinking:stream\"]').open;") as? Bool
        XCTAssertEqual(stillOpen, true)

        // Once the turn is stored, the same tool card (and the thinking card) are still open.
        let stored = LlmChatContent(messages: [
            StoredMessage(id: "u1", role: .user, content: .text("Draw it")),
            StoredMessage(id: "th", role: .assistant, content: .text("Let me think more"), type: .thinking),
            StoredMessage(id: "a2", role: .assistant, content: .blocks([
                .toolCall(ToolCall(id: "t1", toolName: "search_notes", input: ["query": .string("bonds")], result: "[]")), .text("Found")
            ]))
        ])
        _ = try await call("window.trinoteChat.endStreaming()")
        _ = try await call("window.trinoteChat.setTranscript(json)", ["json": ChatTranscriptRenderer.transcriptJSON(for: stored, canRetryLast: false)])
        let openAfterStore = try await call("return document.querySelector('[data-key=\"tool:t1\"]').open && document.querySelector('[data-key=\"thinking:th\"]').open;") as? Bool
        XCTAssertEqual(openAfterStore, true)
    }
}
