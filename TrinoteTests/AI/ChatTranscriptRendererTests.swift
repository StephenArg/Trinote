import XCTest
@testable import Trinote

final class ChatTranscriptRendererTests: XCTestCase {

    private var desktop: LlmChatContent {
        LlmChatContent.parse(LlmChatModelsTests.desktopTranscript)!
    }

    func testMessagesBecomePageBlocks() throws {
        let messages = ChatTranscriptRenderer.messages(for: desktop, canRetryLast: true)
        XCTAssertEqual(messages.map(\.kind), ["message", "thinking", "message", "error"])
        XCTAssertEqual(messages.map(\.role), ["user", "assistant", "assistant", "assistant"])

        let user = messages[0]
        XCTAssertEqual(user.blocks.count, 1)
        XCTAssertEqual(user.blocks[0].type, "html")
        XCTAssertTrue(try XCTUnwrap(user.blocks[0].html).contains("href=\"#root/abc123\""), "mentions stay note links")
        XCTAssertFalse(user.time.isEmpty)
        XCTAssertFalse(user.fullTime.isEmpty)

        XCTAssertEqual(messages[1].text, "Let me read it first.")

        let reply = messages[2]
        XCTAssertEqual(reply.blocks.map(\.type), ["html", "tool", "html", "image"], "unknown blocks are left out")
        let tool = reply.blocks[1]
        XCTAssertEqual(tool.toolName, "read_note")
        XCTAssertEqual(tool.toolInput, "{\n  \"depth\" : 2,\n  \"noteId\" : \"abc123\"\n}")
        XCTAssertEqual(tool.toolResult, "{\"title\":\"Project\"}")
        XCTAssertEqual(tool.running, false)
        XCTAssertEqual(tool.toolError, false)
        let table = try XCTUnwrap(reply.blocks[2].html)
        XCTAssertTrue(table.contains("<strong>Project</strong>"))
        XCTAssertTrue(table.contains("<table"))
        XCTAssertEqual(reply.blocks[3].attachmentId, "att9")
        XCTAssertEqual(reply.blocks[3].mime, "image/png")
        XCTAssertEqual(reply.model, "Claude Sonnet 4.5")
        XCTAssertEqual(reply.tokens, "160 tokens")
        XCTAssertEqual(reply.cost, "$0.0012")
        XCTAssertEqual(reply.citations, [ChatTranscriptCitation(title: "Example", url: "https://example.com", site: "example.com")])
        XCTAssertEqual(reply.citationsLabel, "Sources (1)")
        XCTAssertFalse(reply.canRetry)

        let error = messages[3]
        XCTAssertEqual(error.text, "Rate limited")
        XCTAssertEqual(error.errorTitle, "API error (HTTP 429)")
        XCTAssertEqual(error.errorDetails, "https://api.anthropic.com/v1/messages\nHTTP 429\n{}")
        XCTAssertTrue(error.canRetry)
    }

    func testRetryOnlyOnATrailingError() {
        var content = desktop
        XCTAssertFalse(ChatTranscriptRenderer.messages(for: content, canRetryLast: false).last!.canRetry)
        content.messages.append(StoredMessage(role: .user, content: .text("again")))
        XCTAssertFalse(ChatTranscriptRenderer.messages(for: content, canRetryLast: true).contains { $0.canRetry })
    }

    func testModelOutputCannotBringItsOwnMarkup() {
        let html = ChatTranscriptRenderer.html(markdown: "Hi <img src=x onerror=\"alert(1)\"> **there** <script>alert(2)</script>")
        XCTAssertFalse(html.contains("<img"))
        XCTAssertFalse(html.contains("<script"))
        XCTAssertTrue(html.contains("&lt;script&gt;"))
        XCTAssertTrue(html.contains("<strong>there</strong>"))
    }

    func testMermaidFencesBecomeDiagramBlocks() {
        let html = ChatTranscriptRenderer.html(markdown: "```mermaid\ngraph TD; A-->B\n```")
        XCTAssertTrue(html.contains("<div class=\"mermaid\">graph TD; A--&gt;B</div>"), "entities decode back when Mermaid reads the text: \(html)")
    }

    func testStreamingPayloadRendersWhatArrivedSoFar() throws {
        let call = ToolCall(id: "c1", toolName: "search_notes", inputStreaming: "{\"query\":\"x")
        let json = ChatTranscriptRenderer.streamingJSON(status: "Starting…", thinking: "hmm", blocks: [.text("Hel"), .toolCall(call), .text("lo")])
        let payload = try XCTUnwrap(JSONSerialization.jsonObject(with: Data(json.utf8)) as? [String: Any])
        XCTAssertEqual(payload["status"] as? String, "Starting…")
        XCTAssertEqual(payload["thinking"] as? String, "hmm")
        let blocks = try XCTUnwrap(payload["blocks"] as? [[String: Any]])
        XCTAssertEqual(blocks.map { $0["type"] as? String }, ["html", "tool", "html"])
        XCTAssertEqual(blocks[1]["running"] as? Bool, true)
        XCTAssertEqual(blocks[1]["toolInput"] as? String, "{\"query\":\"x")
    }

    func testTranscriptJSONCarriesLabelsAndEmptyText() throws {
        let json = ChatTranscriptRenderer.transcriptJSON(for: LlmChatContent(), canRetryLast: false)
        let payload = try XCTUnwrap(JSONSerialization.jsonObject(with: Data(json.utf8)) as? [String: Any])
        XCTAssertEqual((payload["messages"] as? [Any])?.count, 0)
        XCTAssertEqual(payload["emptyText"] as? String, "No messages yet.")
        let labels = try XCTUnwrap(payload["labels"] as? [String: String])
        XCTAssertEqual(labels["retry"], "Retry")
        XCTAssertEqual(labels["thoughtProcess"], "Thought process")
    }

    func testLabels() {
        XCTAssertNil(ChatTranscriptRenderer.costLabel(nil))
        XCTAssertNil(ChatTranscriptRenderer.costLabel(0))
        XCTAssertEqual(ChatTranscriptRenderer.costLabel(0.0012), "$0.0012")
        XCTAssertEqual(ChatTranscriptRenderer.costLabel(1.5), "$1.50")
        XCTAssertNil(ChatTranscriptRenderer.tokensLabel(LlmUsage(model: "Agent")))
        XCTAssertEqual(ChatTranscriptRenderer.tokensLabel(LlmUsage(promptTokens: 1200, completionTokens: 34)), "1,234 tokens")
        XCTAssertEqual(ChatTranscriptRenderer.errorTitle(nil), "Error")
        XCTAssertNil(ChatTranscriptRenderer.errorDetails(message: "x", details: LlmErrorDetails(responseBody: "x")))
        XCTAssertEqual(ChatTranscriptRenderer.timeLabels(createdAt: "not a date").0, "")
        XCTAssertNotNil(ChatTranscriptRenderer.parseDate("2026-10-08T10:00:00Z"))
        XCTAssertEqual(ChatTranscriptRenderer.citation(LlmCitation(url: "https://www.example.co.uk/a", citedText: "quoted")).site, "example.co.uk")
        XCTAssertEqual(ChatTranscriptRenderer.citation(LlmCitation(url: "https://www.example.co.uk/a", citedText: "quoted")).title, "quoted")
    }

    func testNoteIdsFromChatLinks() {
        XCTAssertEqual(ChatTranscriptWebView.Coordinator.noteId(fromHashLink: "#root/abc123"), "abc123")
        XCTAssertEqual(ChatTranscriptWebView.Coordinator.noteId(fromHashLink: "#root/x1/y2/zz_9"), "zz_9")
        XCTAssertEqual(ChatTranscriptWebView.Coordinator.noteId(fromHashLink: "#abc"), "abc")
        XCTAssertNil(ChatTranscriptWebView.Coordinator.noteId(fromHashLink: "#"))
        XCTAssertNil(ChatTranscriptWebView.Coordinator.noteId(fromHashLink: "#root/bad id"))
    }

    func testEmptyToolCallsAreHiddenAndARunningOneSaysWhatItDoes() throws {
        let empty = ToolCall(id: "w1", toolName: "web_search", result: "{}")
        let running = ToolCall(id: "w2", toolName: "web_search")
        let useful = ToolCall(id: "n1", toolName: "search_notes", input: ["query": .string("bonds")], result: "[]")
        XCTAssertTrue(ChatTranscriptRenderer.isEmptyToolCall(empty))
        XCTAssertTrue(ChatTranscriptRenderer.isEmptyToolCall(running))
        XCTAssertFalse(ChatTranscriptRenderer.isEmptyToolCall(useful))

        let blocks = ChatTranscriptRenderer.blocks(for: .blocks([.toolCall(empty), .text("Answer"), .toolCall(useful)]))
        XCTAssertEqual(blocks.map(\.type), ["html", "tool"])
        XCTAssertEqual(blocks[1].toolCallId, "n1")

        let streaming = try XCTUnwrap(JSONSerialization.jsonObject(with: Data(
            ChatTranscriptRenderer.streamingJSON(status: nil, thinking: "", blocks: [.text("Hm"), .toolCall(running)]).utf8
        )) as? [String: Any])
        XCTAssertEqual(streaming["status"] as? String, "Searching the web…")
        XCTAssertEqual((streaming["blocks"] as? [[String: Any]])?.count, 1)
        XCTAssertEqual(ChatTranscriptRenderer.toolActivity("rename_note"), "Editing a note…")
        XCTAssertEqual(ChatTranscriptRenderer.toolActivity("load_skill"), "Running load_skill…")
    }

    func testToolCardsCarryTheirApproval() {
        let waiting = ChatTranscriptBlock.tool(ToolCall(id: "c1", toolName: "edit_note_content", input: ["noteId": .string("n1")], approval: .pending))
        XCTAssertEqual(waiting.approval, "pending")
        XCTAssertEqual(waiting.running, true)

        let denied = ChatTranscriptBlock.tool(ToolCall(id: "c2", toolName: "delete_note", result: #"{"error":"x"}"#, isError: true, approval: .declined))
        XCTAssertEqual(denied.approval, "declined")
        XCTAssertEqual(denied.toolError, false, "a denied call isn't drawn as failed")

        let failed = ChatTranscriptBlock.tool(ToolCall(id: "c3", toolName: "get_note", result: "x", isError: true))
        XCTAssertNil(failed.approval)
        XCTAssertEqual(failed.toolError, true)
    }
}
