import XCTest
@testable import Trinote

final class LlmChatTurnReducerTests: XCTestCase {

    private func turn(_ chunks: [LlmStreamChunk]) -> LlmChatStreamingTurn {
        var turn = LlmChatStreamingTurn()
        for chunk in chunks { LlmChatTurnReducer.apply(chunk, to: &turn) }
        return turn
    }

    func testTextAppendsToTheLastTextBlockOnly() {
        let t = turn([.status("starting_agent"), .text("Hel"), .text("lo"), .toolUse(toolCallId: "c", toolName: "t", toolInput: [:]), .text(" world")])
        XCTAssertNil(t.status, "cleared once content arrives")
        XCTAssertEqual(t.blocks, [.text("Hello"), .toolCall(ToolCall(id: "c", toolName: "t")), .text(" world")])
    }

    func testToolCallsCollectTheirInputAndResult() {
        let t = turn([
            .toolInputStart(toolCallId: "c1", toolName: "search_notes"),
            .toolInputDelta(toolCallId: "c1", delta: "{\"q\":"),
            .toolInputDelta(toolCallId: "c1", delta: "\"x\"}"),
            .toolUse(toolCallId: "c1", toolName: "search_notes", toolInput: ["q": .string("x")]),
            .toolResult(toolCallId: "c1", toolName: "search_notes", result: "[]", isError: false)
        ])
        XCTAssertEqual(t.blocks, [.toolCall(ToolCall(id: "c1", toolName: "search_notes", input: ["q": .string("x")], inputStreaming: nil, result: "[]", isError: false))])

        var streaming = turn([.toolInputStart(toolCallId: "c1", toolName: "t"), .toolInputDelta(toolCallId: "c1", delta: "{\"a")])
        guard case .toolCall(let call) = streaming.blocks[0] else { return XCTFail() }
        XCTAssertEqual(call.inputStreaming, "{\"a")
        XCTAssertEqual(call.input, [:])
        XCTAssertNil(call.result)
        // A result for a call that was never announced still shows up.
        LlmChatTurnReducer.apply(.toolResult(toolCallId: "c9", toolName: "other", result: "{\"error\":\"x\"}", isError: true), to: &streaming)
        XCTAssertEqual(streaming.blocks.count, 2)
        guard case .toolCall(let orphan) = streaming.blocks[1] else { return XCTFail() }
        XCTAssertEqual(orphan.toolName, "other")
        XCTAssertEqual(orphan.isError, true)
    }

    func testThinkingCitationsUsageAndErrors() {
        let t = turn([
            .thinking("Let me "), .thinking("think."),
            .citation(LlmCitation(url: "https://a", title: "A")), .citation(LlmCitation(url: "https://a", title: "A again")), .citation(LlmCitation(title: "no url")),
            .usage(LlmUsage(totalTokens: 9, model: "M")),
            .unknown(type: "future"),
            .error(message: "boom", details: LlmErrorDetails(statusCode: 500))
        ])
        XCTAssertEqual(t.thinking, "Let me think.")
        XCTAssertEqual(t.citations.map(\.title), ["A", "no url"])
        XCTAssertEqual(t.usage?.totalTokens, 9)
        XCTAssertEqual(t.failure, LlmChatStreamFailure(message: "boom", details: LlmErrorDetails(statusCode: 500)))
    }

    func testFinalizeStoresThinkingThenTheReplyAndMarksStoppedTools() {
        let t = turn([
            .thinking("hmm"), .text("Done."),
            .toolInputStart(toolCallId: "c1", toolName: "read_note"), .toolInputDelta(toolCallId: "c1", delta: "{"),
            .citation(LlmCitation(url: "https://a", title: "A")), .usage(LlmUsage(totalTokens: 5))
        ])
        let now = Date(timeIntervalSince1970: 1_791_000_000)
        let messages = LlmChatTurnReducer.finalize(t, now: now)
        XCTAssertEqual(messages.count, 2)
        XCTAssertEqual(messages[0].kind, .thinking)
        XCTAssertEqual(messages[0].text, "hmm")
        XCTAssertEqual(messages[0].role, .assistant)
        XCTAssertEqual(messages[0].createdAt, "2026-10-03T04:00:00.000Z")
        let reply = messages[1]
        XCTAssertEqual(reply.kind, .message)
        XCTAssertEqual(reply.citations?.count, 1)
        XCTAssertEqual(reply.usage?.totalTokens, 5)
        guard case .blocks(let blocks) = reply.content, case .toolCall(let call) = blocks[1] else { return XCTFail() }
        XCTAssertEqual(call.result, "[Stopped]")
        XCTAssertEqual(call.isError, true)
        XCTAssertNil(call.inputStreaming)
        XCTAssertEqual(blocks[0], .text("Done."))

        XCTAssertEqual(LlmChatTurnReducer.finalize(LlmChatStreamingTurn()), [], "nothing arrived, nothing stored")
        let onlyThinking = LlmChatTurnReducer.finalize(turn([.thinking("x")]))
        XCTAssertEqual(onlyThinking.map(\.kind), [.thinking])
    }

    func testErrorMessage() {
        let message = LlmChatTurnReducer.errorMessage(LlmChatStreamFailure(message: "Bad key", details: LlmErrorDetails(statusCode: 401, url: "u")))
        XCTAssertEqual(message.kind, .error)
        XCTAssertEqual(message.role, .assistant)
        XCTAssertEqual(message.text, "Bad key")
        XCTAssertEqual(message.errorDetails?.statusCode, 401)
    }

    func testApiMessagesStartAtTheFirstUserTurnAndFlattenBlocks() {
        let image = AttachmentBlockRef(attachmentId: "a1", mime: "image/png", title: "p.png", url: "")
        let pdf = AttachmentBlockRef(attachmentId: "a2", mime: "application/pdf", title: "doc.pdf", url: "")
        let notes = AttachmentBlockRef(attachmentId: "a3", mime: "text/markdown", title: "notes.md", url: "")
        let conversation = [
            StoredMessage(id: "s", role: .system, content: .text("sys")),
            StoredMessage(id: "a0", role: .assistant, content: .text("stray reply")),
            StoredMessage(id: "u1", role: .user, content: .blocks([.text("Look"), .image(image), .file(pdf), .textFile(notes)])),
            StoredMessage(id: "t1", role: .assistant, content: .text("thinking"), type: .thinking),
            StoredMessage(id: "a1", role: .assistant, content: .blocks([.text("I see"), .toolCall(ToolCall(id: "c", toolName: "t", result: "r")), .text(" it")])),
            StoredMessage(id: "u2", role: .user, content: .blocks([.toolCall(ToolCall(id: "x", toolName: "y"))])),
            StoredMessage(id: "u3", role: .user, content: .blocks([.text("just text")]))
        ]
        let api = LlmChatTurnReducer.apiMessages(from: conversation)
        XCTAssertEqual(api.map(\.role), ["user", "assistant", "assistant", "user", "user"])
        XCTAssertEqual(api[0].content, .parts([.text("Look"), .image(attachmentId: "a1", mime: "image/png"), .file(attachmentId: "a2", mime: "application/pdf", filename: "doc.pdf"), .textAttachment(attachmentId: "a3", filename: "notes.md")]))
        XCTAssertEqual(api[1].content, .text("thinking"))
        XCTAssertEqual(api[2].content, .parts([.text("I see"), .text(" it")]))
        XCTAssertEqual(api[3].content, .text(""))
        XCTAssertEqual(api[4].content, .text("just text"))

        let noUser = [StoredMessage(id: "a", role: .assistant, content: .text("hi"))]
        XCTAssertEqual(LlmChatTurnReducer.apiMessages(from: noUser).count, 1, "a conversation with no user message is left as it is")
    }

    func testRetryAndRegenerateConversations() {
        let user = StoredMessage(id: "u", role: .user, content: .text("q"))
        let reply = StoredMessage(id: "a", role: .assistant, content: .text("r"))
        let thinking = StoredMessage(id: "t", role: .assistant, content: .text("…"), type: .thinking)
        let error = StoredMessage(id: "e", role: .assistant, content: .text("x"), type: .error)
        XCTAssertEqual(LlmChatTurnReducer.conversationForRetry([user, error]), [user])
        XCTAssertNil(LlmChatTurnReducer.conversationForRetry([user, reply]))
        XCTAssertEqual(LlmChatTurnReducer.conversationForRegenerate([user, thinking, reply]), [user])
        XCTAssertEqual(LlmChatTurnReducer.conversationForRegenerate([user, reply, user, reply]).map { $0.count }, 3)
        XCTAssertNil(LlmChatTurnReducer.conversationForRegenerate([user]))
        XCTAssertNil(LlmChatTurnReducer.conversationForRegenerate([reply]))
    }

    // MARK: Tool approvals (Trilium 0.107+)

    func testApprovalRequestMarksTheCallWaitingEvenBeforeItsToolUse() {
        var t = turn([
            .toolInputStart(toolCallId: "c1", toolName: "edit_note_content"),
            .toolInputDelta(toolCallId: "c1", delta: "{\"noteId\":"),
            .toolApprovalRequest(toolCallId: "c1", toolName: "edit_note_content", toolInput: ["noteId": .string("n1")]),
            .toolApprovalRequest(toolCallId: "c2", toolName: "delete_note", toolInput: ["noteId": .string("n2")])
        ])
        XCTAssertEqual(t.blocks, [
            .toolCall(ToolCall(id: "c1", toolName: "edit_note_content", input: ["noteId": .string("n1")], approval: .pending)),
            .toolCall(ToolCall(id: "c2", toolName: "delete_note", input: ["noteId": .string("n2")], approval: .pending))
        ])
        XCTAssertEqual(LlmChatTurnReducer.waitingToolCalls(in: t).map(\.id), ["c1", "c2"])

        LlmChatTurnReducer.settleApproval(toolCallId: "c1", approved: true, in: &t)
        LlmChatTurnReducer.settleApproval(toolCallId: "c2", approved: false, in: &t)
        XCTAssertEqual(LlmChatTurnReducer.waitingToolCalls(in: t), [])
        guard case .toolCall(let allowed) = t.blocks[0], case .toolCall(let denied) = t.blocks[1] else { return XCTFail() }
        XCTAssertNil(allowed.approval)
        XCTAssertEqual(denied.approval, .declined)
        // An answer only settles a call that waits.
        LlmChatTurnReducer.settleApproval(toolCallId: "c2", approved: true, in: &t)
        guard case .toolCall(let stillDenied) = t.blocks[1] else { return XCTFail() }
        XCTAssertEqual(stillDenied.approval, .declined)
    }

    func testFinalizeStopsCallsStillWaitingAndKeepsDenials() {
        let t = turn([
            .toolApprovalRequest(toolCallId: "waiting", toolName: "rename_note", toolInput: [:]),
            .toolApprovalRequest(toolCallId: "answered", toolName: "get_note", toolInput: [:]),
            .toolResult(toolCallId: "answered", toolName: "get_note", result: "{}", isError: false)
        ])
        var denied = t
        LlmChatTurnReducer.apply(.toolApprovalRequest(toolCallId: "no", toolName: "delete_note", toolInput: [:]), to: &denied)
        LlmChatTurnReducer.settleApproval(toolCallId: "no", approved: false, in: &denied)
        LlmChatTurnReducer.apply(.toolResult(toolCallId: "no", toolName: "delete_note", result: #"{"error":"The user declined this tool call."}"#, isError: true), to: &denied)

        let stored = LlmChatTurnReducer.finalize(denied)
        guard case .blocks(let blocks) = stored.last?.content else { return XCTFail("expected blocks") }
        let calls = blocks.compactMap { block -> ToolCall? in
            if case .toolCall(let call) = block { return call }
            return nil
        }
        XCTAssertEqual(calls.map(\.id), ["waiting", "answered", "no"])
        XCTAssertEqual(calls.map(\.approval), [nil, nil, .declined])
        XCTAssertEqual(calls[0].result, LlmChatTurnReducer.stoppedToolResult)
        XCTAssertEqual(calls.map(\.failed), [true, false, false])
    }
}
