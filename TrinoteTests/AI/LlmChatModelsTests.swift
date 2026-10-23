import XCTest
@testable import Trinote

final class LlmChatModelsTests: XCTestCase {

    /// A transcript as Trilium desktop v0.106 writes it, with a key this app doesn't model at each level.
    static let desktopTranscript = """
    {
      "version": 1,
      "messages": [
        {"id": "u1", "role": "user", "content": "Summarize my [Project](#root/abc123) note", "createdAt": "2026-10-08T10:00:00.000Z"},
        {"id": "t1", "role": "assistant", "content": "Let me read it first.", "createdAt": "2026-10-08T10:00:01.000Z", "type": "thinking"},
        {"id": "a1", "role": "assistant", "createdAt": "2026-10-08T10:00:02.500Z",
         "content": [
           {"type": "text", "content": "Reading the note."},
           {"type": "tool_call", "toolCall": {"id": "call_1", "toolName": "read_note", "input": {"noteId": "abc123", "depth": 2}, "result": "{\\"title\\":\\"Project\\"}", "isError": false}},
           {"type": "text", "content": "**Project** is about *x*.\\n\\n| a | b |\\n|---|---|\\n| 1 | 2 |"},
           {"type": "image", "attachmentId": "att9", "mime": "image/png", "title": "chart.png", "url": "api/attachments/att9/image/chart.png"},
           {"type": "video", "src": "https://example.com/v.mp4"}
         ],
         "citations": [{"url": "https://example.com", "title": "Example", "citedText": "x"}],
         "usage": {"promptTokens": 120, "completionTokens": 40, "totalTokens": 160, "cost": 0.0012, "model": "Claude Sonnet 4.5", "provider": "anthropic"},
         "highlights": [{"id": "h1", "start": 0, "end": 7, "quotedText": "Project"}]},
        {"id": "e1", "role": "assistant", "content": "Rate limited", "createdAt": "2026-10-08T10:01:00.000Z", "type": "error",
         "errorDetails": {"statusCode": 429, "url": "https://api.anthropic.com/v1/messages", "responseBody": "{}"}}
      ],
      "selectedModel": "claude-sonnet-4-5",
      "selectedProvider": "anthropic",
      "selectedProviderId": "anthropic_1700000000000",
      "enableWebSearch": true,
      "enableNoteTools": false,
      "reasoningEffort": "high",
      "futureSetting": {"nested": [1, 2.5, "x", null, true]}
    }
    """

    private func jsonObject(_ text: String) throws -> NSDictionary {
        let object = try JSONSerialization.jsonObject(with: Data(text.utf8))
        return try XCTUnwrap(object as? NSDictionary)
    }

    func testDesktopTranscriptDecodes() throws {
        let content = try XCTUnwrap(LlmChatContent.parse(Self.desktopTranscript))
        XCTAssertEqual(content.version, 1)
        XCTAssertEqual(content.messages.count, 4)
        XCTAssertEqual(content.selectedModel, "claude-sonnet-4-5")
        XCTAssertEqual(content.selectedProvider, "anthropic")
        XCTAssertEqual(content.selectedProviderId, "anthropic_1700000000000")
        XCTAssertEqual(content.enableWebSearch, true)
        XCTAssertEqual(content.enableNoteTools, false)
        XCTAssertNil(content.enableExtendedThinking)
        XCTAssertEqual(content.reasoningEffort, .high)
        XCTAssertEqual(content.extra["futureSetting"], .object(["nested": .array([.int(1), .double(2.5), .string("x"), .null, .bool(true)])]))

        let user = content.messages[0]
        XCTAssertEqual(user.role, .user)
        XCTAssertEqual(user.kind, .message)
        XCTAssertEqual(user.text, "Summarize my [Project](#root/abc123) note")

        let thinking = content.messages[1]
        XCTAssertEqual(thinking.kind, .thinking)
        XCTAssertEqual(thinking.text, "Let me read it first.")

        let reply = content.messages[2]
        XCTAssertEqual(reply.role, .assistant)
        guard case .blocks(let blocks) = reply.content else { return XCTFail("expected blocks") }
        XCTAssertEqual(blocks.count, 5)
        XCTAssertEqual(blocks[0], .text("Reading the note."))
        guard case .toolCall(let call) = blocks[1] else { return XCTFail("expected a tool call") }
        XCTAssertEqual(call.id, "call_1")
        XCTAssertEqual(call.toolName, "read_note")
        XCTAssertEqual(call.input, ["noteId": .string("abc123"), "depth": .int(2)])
        XCTAssertEqual(call.result, "{\"title\":\"Project\"}")
        XCTAssertEqual(call.isError, false)
        guard case .image(let image) = blocks[3] else { return XCTFail("expected an image") }
        XCTAssertEqual(image.attachmentId, "att9")
        XCTAssertEqual(image.mime, "image/png")
        XCTAssertEqual(image.title, "chart.png")
        guard case .unknown(let unknown) = blocks[4] else { return XCTFail("expected an unknown block") }
        XCTAssertEqual(unknown["type"]?.stringValue, "video")
        XCTAssertEqual(reply.text, "Reading the note.**Project** is about *x*.\n\n| a | b |\n|---|---|\n| 1 | 2 |")
        XCTAssertEqual(reply.citations?.first?.url, "https://example.com")
        XCTAssertEqual(reply.usage?.promptTokens, 120)
        XCTAssertEqual(reply.usage?.cost, 0.0012)
        XCTAssertEqual(reply.usage?.model, "Claude Sonnet 4.5")
        XCTAssertNotNil(reply.extra["highlights"])

        let error = content.messages[3]
        XCTAssertEqual(error.kind, .error)
        XCTAssertEqual(error.errorDetails?.statusCode, 429)
        XCTAssertEqual(error.errorDetails?.url, "https://api.anthropic.com/v1/messages")
    }

    func testDesktopTranscriptRoundTripsWithoutLoss() throws {
        let content = try XCTUnwrap(LlmChatContent.parse(Self.desktopTranscript))
        let written = try content.jsonString()
        XCTAssertEqual(try jsonObject(written), try jsonObject(Self.desktopTranscript))
        // Reading what was written gives the same transcript again.
        XCTAssertEqual(LlmChatContent.parse(written), content)
    }

    func testAppendedMessageKeepsEverythingElse() throws {
        var content = try XCTUnwrap(LlmChatContent.parse(Self.desktopTranscript))
        content.messages.append(StoredMessage(id: "u2", role: .user, content: .text("Thanks"), createdAt: "2026-10-08T10:02:00.000Z"))
        let written = try jsonObject(try content.jsonString())
        let original = try jsonObject(Self.desktopTranscript)
        let messages = try XCTUnwrap(written["messages"] as? [Any])
        XCTAssertEqual(messages.count, 5)
        XCTAssertEqual(messages.dropLast() as NSArray, try XCTUnwrap(original["messages"] as? NSArray))
        XCTAssertEqual(messages.last as? NSDictionary, ["id": "u2", "role": "user", "content": "Thanks", "createdAt": "2026-10-08T10:02:00.000Z"])
        XCTAssertEqual(written["futureSetting"] as? NSDictionary, original["futureSetting"] as? NSDictionary)
    }

    func testEmptyAndUnusableBodies() throws {
        let empty = try XCTUnwrap(LlmChatContent.parse(LlmChatContent.emptyJSON))
        XCTAssertEqual(empty.messages, [])
        XCTAssertEqual(try jsonObject(try empty.jsonString()), try jsonObject(LlmChatContent.emptyJSON))
        XCTAssertEqual(try jsonObject(try LlmChatContent().jsonString()), try jsonObject(LlmChatContent.emptyJSON))
        XCTAssertEqual(NoteType.llmChat.creationInitialContent, LlmChatContent.emptyJSON)
        XCTAssertNil(LlmChatContent.parse("<p>not a chat</p>"))
        XCTAssertNil(LlmChatContent.parse(""))
        XCTAssertTrue(LlmChatContent.isUsableChatJSON(LlmChatContent.emptyJSON))
        XCTAssertFalse(LlmChatContent.isUsableChatJSON("{\"version\":1}"))
        XCTAssertFalse(LlmChatContent.isUsableChatJSON("[]"))
    }

    func testNewMessageIdsAndTimestampsLookLikeDesktops() {
        let id = StoredMessage.makeId()
        XCTAssertEqual(id.count, 16)
        XCTAssertTrue(id.allSatisfy { $0.isASCII && ($0.isLetter || $0.isNumber) })
        XCTAssertNotEqual(StoredMessage.makeId(), StoredMessage.makeId())
        let date = Date(timeIntervalSince1970: 1_791_000_000.123)
        XCTAssertEqual(StoredMessage.isoTimestamp(date), "2026-10-03T04:00:00.123Z")
        let message = StoredMessage.user(text: "hi", now: date)
        XCTAssertEqual(message.role, .user)
        XCTAssertEqual(message.content, .text("hi"))
        XCTAssertEqual(message.createdAt, "2026-10-03T04:00:00.123Z")
    }

    func testNoteTypeTraits() {
        XCTAssertEqual(NoteType(rawValue: "llmChat"), .llmChat)
        XCTAssertFalse(NoteType.llmChat.isEditable)
        XCTAssertTrue(NoteType.llmChat.isRenderable)
        XCTAssertEqual(NoteType.llmChat.creationMime, "application/json")
        XCTAssertEqual(NoteType.llmChat.triliumStorageType, "llmChat")
        XCTAssertEqual(NoteType.llmChat.displayName, "AI Chat")
    }

    // MARK: Stream chunks

    private func chunk(_ json: String) throws -> LlmStreamChunk {
        try JSONDecoder().decode(LlmStreamChunk.self, from: Data(json.utf8))
    }

    func testStreamChunksDecode() throws {
        XCTAssertEqual(try chunk(#"{"type":"status","status":"starting_agent"}"#), .status("starting_agent"))
        XCTAssertEqual(try chunk(#"{"type":"text","content":"Hel"}"#), .text("Hel"))
        XCTAssertEqual(try chunk(#"{"type":"thinking","content":"hmm"}"#), .thinking("hmm"))
        XCTAssertEqual(try chunk(#"{"type":"tool_input_start","toolCallId":"c1","toolName":"search_notes"}"#), .toolInputStart(toolCallId: "c1", toolName: "search_notes"))
        XCTAssertEqual(try chunk(#"{"type":"tool_input_delta","toolCallId":"c1","delta":"{\"q\""}"#), .toolInputDelta(toolCallId: "c1", delta: "{\"q\""))
        XCTAssertEqual(
            try chunk(#"{"type":"tool_use","toolCallId":"c1","toolName":"search_notes","toolInput":{"query":"x","limit":3}}"#),
            .toolUse(toolCallId: "c1", toolName: "search_notes", toolInput: ["query": .string("x"), "limit": .int(3)])
        )
        XCTAssertEqual(
            try chunk(#"{"type":"tool_result","toolCallId":"c1","toolName":"search_notes","result":"[]","isError":false}"#),
            .toolResult(toolCallId: "c1", toolName: "search_notes", result: "[]", isError: false)
        )
        XCTAssertEqual(
            try chunk(#"{"type":"tool_result","toolCallId":"c1","toolName":"search_notes","result":{"error":"boom"}}"#),
            .toolResult(toolCallId: "c1", toolName: "search_notes", result: #"{"error":"boom"}"#, isError: false)
        )
        XCTAssertEqual(try chunk(#"{"type":"citation","citation":{"url":"https://a.b","title":"A"}}"#), .citation(LlmCitation(url: "https://a.b", title: "A")))
        XCTAssertEqual(
            try chunk(#"{"type":"usage","usage":{"promptTokens":10,"completionTokens":5,"totalTokens":15,"cost":0.01,"model":"M","provider":"openai"}}"#),
            .usage(LlmUsage(promptTokens: 10, completionTokens: 5, totalTokens: 15, cost: 0.01, model: "M", provider: "openai"))
        )
        XCTAssertEqual(try chunk(#"{"type":"usage","usage":{"model":"Agent"}}"#), .usage(LlmUsage(model: "Agent")))
        XCTAssertEqual(
            try chunk(#"{"type":"error","error":"Bad key","errorDetails":{"statusCode":401,"url":"https://x","responseBody":"nope"}}"#),
            .error(message: "Bad key", details: LlmErrorDetails(statusCode: 401, url: "https://x", responseBody: "nope"))
        )
        XCTAssertEqual(try chunk(#"{"type":"error","error":"Lost"}"#), .error(message: "Lost", details: nil))
        XCTAssertEqual(try chunk(#"{"type":"done"}"#), .done)
        XCTAssertEqual(try chunk(#"{"type":"reasoning_summary","content":"…"}"#), .unknown(type: "reasoning_summary"))
    }

    // MARK: Request

    func testStreamRequestEncodesLikeTheWebClient() throws {
        let request = LlmChatStreamRequest(
            streamId: "turn12345678",
            messages: [
                LlmApiMessage(role: .user, text: "Hello"),
                LlmApiMessage(role: "user", content: .parts([
                    .text("Look"),
                    .image(attachmentId: "att1", mime: "image/png"),
                    .file(attachmentId: "att2", mime: "application/pdf", filename: "a.pdf"),
                    .textAttachment(attachmentId: "att3", filename: "notes.md")
                ]))
            ],
            config: LlmChatRequestConfig(
                provider: "anthropic", providerId: "anthropic_1", model: "claude-sonnet-4-5",
                enableWebSearch: true, enableNoteTools: false, reasoningEffort: .medium, contextNoteId: "ctx", chatNoteId: "chat"
            )
        )
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys, .withoutEscapingSlashes]
        let written = try jsonObject(String(decoding: try encoder.encode(request), as: UTF8.self))
        let expected = try jsonObject("""
        {"streamId":"turn12345678",
         "messages":[{"role":"user","content":"Hello"},
                     {"role":"user","content":[{"type":"text","text":"Look"},
                                               {"type":"image","attachmentId":"att1","mime":"image/png"},
                                               {"type":"file","attachmentId":"att2","mime":"application/pdf","filename":"a.pdf"},
                                               {"type":"text_attachment","attachmentId":"att3","filename":"notes.md"}]}],
         "config":{"provider":"anthropic","providerId":"anthropic_1","model":"claude-sonnet-4-5",
                   "enableWebSearch":true,"enableNoteTools":false,"reasoningEffort":"medium","contextNoteId":"ctx","chatNoteId":"chat"}}
        """)
        XCTAssertEqual(written, expected)
    }

    // MARK: Special notes

    func testSpecialNoteRowsDecode() throws {
        let recent = try JSONDecoder().decode([RecentLlmChat].self, from: Data(#"[{"noteId":"n1","title":"Chat: 2026-10-08 10:00","dateModified":"2026-10-08 10:00:00.000Z"}]"#.utf8))
        XCTAssertEqual(recent, [RecentLlmChat(noteId: "n1", title: "Chat: 2026-10-08 10:00", dateModified: "2026-10-08 10:00:00.000Z")])

        let kept = try JSONDecoder().decode(KeepLlmChatResponse.self, from: Data(#"{"success":true,"branchId":"b1","notePath":"root/home/kept1"}"#.utf8))
        XCTAssertEqual(kept, KeepLlmChatResponse(success: true, branchId: "b1", notePath: "root/home/kept1"))
        XCTAssertEqual(kept.keptNoteId, "kept1")
        XCTAssertEqual(try JSONDecoder().decode(KeepLlmChatResponse.self, from: Data(#"{"message":"no"}"#.utf8)), KeepLlmChatResponse(success: false, message: "no"))

        let created = try JSONDecoder().decode(CreatedLlmChat.self, from: Data(#"{"noteId":"c1","title":"Chat: now","type":"llmChat","mime":"application/json","isProtected":false}"#.utf8))
        XCTAssertEqual(created, CreatedLlmChat(noteId: "c1", title: "Chat: now"))
    }

    // MARK: Tool approvals (Trilium 0.107+)

    func testApprovalChunkAndStateDecode() throws {
        XCTAssertEqual(
            try chunk(#"{"type":"tool_approval_request","toolCallId":"c1","toolName":"edit_note_content","toolInput":{"noteId":"n1"}}"#),
            .toolApprovalRequest(toolCallId: "c1", toolName: "edit_note_content", toolInput: ["noteId": .string("n1")])
        )

        let json = #"{"version":1,"messages":[{"id":"m","role":"assistant","createdAt":"2026-10-23T00:00:00.000Z","content":[{"type":"tool_call","toolCall":{"id":"c1","toolName":"delete_note","input":{},"result":"{\"error\":\"no\"}","isError":true,"approval":"declined"}}]}],"permissionMode":"always_ask","allowedTools":["get_note"]}"#
        let content = try XCTUnwrap(LlmChatContent.parse(json))
        XCTAssertEqual(content.permissionMode, .alwaysAsk)
        XCTAssertEqual(content.allowedTools, ["get_note"])
        XCTAssertTrue(content.extra.isEmpty)
        guard case .blocks(let blocks) = content.messages.first?.content, case .toolCall(let call) = blocks.first else {
            return XCTFail("expected a tool call")
        }
        XCTAssertEqual(call.approval, .declined)
        XCTAssertFalse(call.failed)

        let written = try jsonObject(try content.jsonString())
        XCTAssertEqual(written["permissionMode"] as? String, "always_ask")
        XCTAssertEqual(written["allowedTools"] as? [String], ["get_note"])
        let messages = written["messages"] as? [[String: Any]]
        let toolCall = ((messages?.first?["content"] as? [[String: Any]])?.first?["toolCall"]) as? [String: Any]
        XCTAssertEqual(toolCall?["approval"] as? String, "declined")
    }

    func testRequestCarriesPermissionModeAndAllowedTools() throws {
        let request = LlmChatStreamRequest(
            streamId: "turn12345678",
            messages: [],
            config: LlmChatRequestConfig(enableNoteTools: true, allowedTools: ["get_note"], permissionMode: .askBeforeChanges)
        )
        let written = try jsonObject(String(decoding: try JSONEncoder().encode(request), as: UTF8.self))
        let config = written["config"] as? [String: Any]
        XCTAssertEqual(config?["permissionMode"] as? String, "ask_before_changes")
        XCTAssertEqual(config?["allowedTools"] as? [String], ["get_note"])
    }
}
