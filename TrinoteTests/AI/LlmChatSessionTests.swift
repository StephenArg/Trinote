import UIKit
import XCTest
@testable import Trinote

@MainActor
final class LlmChatSessionTests: XCTestCase {

    @MainActor
    private final class Recorder {
        var saved: [String] = []
        var firstTurns = 0
    }

    private let config = TriliumAIConfig(
        aiEnabled: true,
        providers: [LlmProviderSummary(
            id: "p1", name: "P", provider: "anthropic", hasApiKey: true,
            selectedModels: [LlmModelInfo(id: "m1", name: "Model 1", isDefault: true), LlmModelInfo(id: "m2", name: "Model 2", reasoningEfforts: [.low, .high])]
        )]
    )

    private func makeSession(_ mock: MockTriliumClient, content: LlmChatContent = LlmChatContent(), recorder: Recorder, config: TriliumAIConfig? = nil) -> LlmChatSession {
        let config = config ?? self.config
        return LlmChatSession(
            noteId: "chat1",
            content: content,
            client: { mock },
            aiConfig: { config },
            onContentSaved: { recorder.saved.append($0) },
            onFirstTurnCompleted: { recorder.firstTurns += 1 }
        )
    }

    func testSendStreamsStoresAndSaves() async throws {
        let mock = MockTriliumClient()
        await mock.setStreamLlmChatResult(.success([
            .status("starting_agent"), .thinking("hmm"), .text("Hel"), .text("lo"), .usage(LlmUsage(totalTokens: 3, model: "Model 1")), .done
        ]))
        let recorder = Recorder()
        let session = makeSession(mock, recorder: recorder)
        XCTAssertTrue(session.canSend)
        XCTAssertEqual(session.selectedModel?.id, "m1", "the default while the chat picked none")

        session.send(text: "  Hi  ")
        XCTAssertTrue(session.isStreaming)
        await session.waitForTurn()
        XCTAssertFalse(session.isStreaming)

        XCTAssertEqual(session.messages.map(\.role), [.user, .assistant, .assistant])
        XCTAssertEqual(session.messages[0].text, "Hi")
        XCTAssertEqual(session.messages[1].kind, .thinking)
        XCTAssertEqual(session.messages[2].text, "Hello")
        XCTAssertEqual(session.messages[2].usage?.totalTokens, 3)
        XCTAssertEqual(session.content.selectedModel, "m1")
        XCTAssertEqual(session.content.selectedProviderId, "p1")

        let calls = await mock.streamLlmChatCalls
        XCTAssertEqual(calls.count, 1)
        XCTAssertEqual(calls[0].streamId.count, 12, "Trilium 0.107+ refuses a turn without a stream id")
        XCTAssertTrue(TriliumEntityId.isValid(calls[0].streamId))
        XCTAssertEqual(calls[0].messages, [LlmApiMessage(role: .user, text: "Hi")])
        XCTAssertEqual(calls[0].config, LlmChatRequestConfig(
            provider: "anthropic", providerId: "p1", model: "m1", enableWebSearch: true, enableNoteTools: false,
            enableExtendedThinking: false, chatNoteId: "chat1", permissionMode: .askBeforeChanges
        ))

        let saves = await mock.updateNoteContentCalls
        XCTAssertEqual(saves.map(\.0), ["chat1"])
        XCTAssertEqual(recorder.saved.count, 1)
        let stored = try XCTUnwrap(LlmChatContent.parse(recorder.saved[0]))
        XCTAssertEqual(stored.messages.map(\.id), session.messages.map(\.id))
        XCTAssertEqual(recorder.firstTurns, 1)
        XCTAssertNil(session.saveError)
    }

    func testErrorChunkStoresAnErrorAndDropsWhatStreamed() async throws {
        let mock = MockTriliumClient()
        await mock.setStreamLlmChatResult(.success([.text("par"), .error(message: "Bad key", details: LlmErrorDetails(statusCode: 401))]))
        let recorder = Recorder()
        let session = makeSession(mock, recorder: recorder)
        session.send(text: "Hi")
        await session.waitForTurn()
        XCTAssertEqual(session.messages.map(\.kind), [.message, .error])
        XCTAssertEqual(session.messages[1].text, "Bad key")
        XCTAssertEqual(session.messages[1].errorDetails?.statusCode, 401)
        XCTAssertEqual(recorder.firstTurns, 0, "a failed first turn can't have named the note")
        XCTAssertEqual(recorder.saved.count, 1)

        // Retry drops the error and re-runs the same turn.
        await mock.setStreamLlmChatResult(.success([.text("OK"), .done]))
        session.retryLast()
        await session.waitForTurn()
        XCTAssertEqual(session.messages.map(\.kind), [.message, .message])
        XCTAssertEqual(session.messages[1].text, "OK")
        let calls = await mock.streamLlmChatCalls
        XCTAssertEqual(calls.count, 2)
        XCTAssertNotEqual(calls[0].streamId, calls[1].streamId, "each turn names itself")
        XCTAssertEqual(calls[1].messages, [LlmApiMessage(role: .user, text: "Hi")])
        XCTAssertEqual(recorder.firstTurns, 1)
    }

    func testTransportFailureBecomesAnErrorMessage() async throws {
        let mock = MockTriliumClient()
        await mock.setStreamLlmChatResult(.failure(APIError.networkUnavailable))
        let recorder = Recorder()
        let session = makeSession(mock, recorder: recorder)
        session.send(text: "Hi")
        await session.waitForTurn()
        XCTAssertEqual(session.messages.last?.kind, .error)
        XCTAssertTrue(session.messages.last?.text.hasPrefix("LLM stream interrupted:") == true)
    }

    func testLaterTurnsSendTheHistoryAndRegenerateDropsTheLastReply() async throws {
        let mock = MockTriliumClient()
        await mock.setStreamLlmChatResult(.success([.text("Second"), .done]))
        let recorder = Recorder()
        var existing = LlmChatContent(messages: [
            StoredMessage(id: "u1", role: .user, content: .text("First?")),
            StoredMessage(id: "a1", role: .assistant, content: .blocks([.text("First."), .toolCall(ToolCall(id: "c", toolName: "t", result: "r"))]))
        ])
        existing.selectedModel = "m2"
        existing.selectedProviderId = "p1"
        existing.enableNoteTools = true
        existing.reasoningEffort = .high
        let session = makeSession(mock, content: existing, recorder: recorder)
        XCTAssertEqual(session.selectedModel?.id, "m2")
        XCTAssertTrue(session.enableNoteTools)

        session.send(text: "Next?")
        await session.waitForTurn()
        let calls = await mock.streamLlmChatCalls
        XCTAssertEqual(calls[0].messages, [
            LlmApiMessage(role: .user, text: "First?"), LlmApiMessage(role: .assistant, text: "First."), LlmApiMessage(role: .user, text: "Next?")
        ])
        XCTAssertEqual(calls[0].config.reasoningEffort, .high)
        XCTAssertNil(calls[0].config.enableExtendedThinking, "a model with levels sends the effort instead")
        XCTAssertEqual(calls[0].config.enableNoteTools, true)
        XCTAssertEqual(recorder.firstTurns, 0, "not the first turn")
        XCTAssertEqual(session.messages.count, 4)

        await mock.setStreamLlmChatResult(.success([.text("Third"), .done]))
        XCTAssertTrue(session.canRegenerate)
        session.regenerateLastReply()
        await session.waitForTurn()
        XCTAssertEqual(session.messages.count, 4)
        XCTAssertEqual(session.messages.last?.text, "Third")
    }

    func testNoOfferedModelBlocksSending() async throws {
        let mock = MockTriliumClient()
        let recorder = Recorder()
        var content = LlmChatContent()
        content.selectedModel = "gone"
        let session = makeSession(mock, content: content, recorder: recorder)
        XCTAssertNil(session.selectedModel)
        XCTAssertFalse(session.canSend)
        session.send(text: "Hi")
        XCTAssertFalse(session.isStreaming)
        let calls = await mock.streamLlmChatCalls
        XCTAssertTrue(calls.isEmpty)

        session.setModel(LlmModelInfo(id: "m1", name: "Model 1", provider: "anthropic", providerId: "p1"))
        XCTAssertEqual(session.selectedModel?.id, "m1")
        XCTAssertTrue(session.canSend)
        try await Task.sleep(for: .milliseconds(50))
        let saves = await mock.updateNoteContentCalls
        XCTAssertEqual(saves.count, 1, "picking a model saves the chat's settings")
    }

    func testSaveFailureIsReportedAndRetried() async throws {
        let mock = MockTriliumClient()
        await mock.setStreamLlmChatResult(.success([.text("Hi"), .done]))
        await mock.setUpdateNoteContentError(APIError.serverError(statusCode: 500, message: "disk full"))
        let recorder = Recorder()
        let session = makeSession(mock, recorder: recorder)
        session.send(text: "Hi")
        await session.waitForTurn()
        XCTAssertNotNil(session.saveError)
        XCTAssertEqual(session.messages.count, 2, "the messages stay on screen")
        XCTAssertTrue(recorder.saved.isEmpty)

        await mock.setUpdateNoteContentError(nil)
        await session.retrySave()
        XCTAssertNil(session.saveError)
        XCTAssertEqual(recorder.saved.count, 1)
    }

    func testANewChatMakesItsNoteOnTheFirstMessageAndReportsTools() async throws {
        let mock = MockTriliumClient()
        await mock.setStreamLlmChatResult(.success([
            .toolUse(toolCallId: "c1", toolName: "edit_note_content", toolInput: ["noteId": .string("n1")]),
            .toolResult(toolCallId: "c1", toolName: "edit_note_content", result: "ok", isError: false),
            .text("Done."), .done
        ]))
        let config = self.config
        var created = 0
        var reported: [[ToolCall]] = []
        let session = LlmChatSession(
            noteId: nil,
            content: LlmChatContent(),
            defaultEnableNoteTools: true,
            client: { mock },
            aiConfig: { config },
            onContentSaved: { _ in },
            onFirstTurnCompleted: {},
            createChatNote: {
                created += 1
                return "chat_made"
            },
            onTurnFinished: { reported.append($0) }
        )
        session.contextNoteId = "n1"
        XCTAssertNil(session.noteId)
        session.setModel(LlmModelInfo(id: "m1", name: "Model 1", provider: "anthropic", providerId: "p1"))
        try await Task.sleep(for: .milliseconds(50))
        let savesBeforeSending = await mock.updateNoteContentCalls
        XCTAssertTrue(savesBeforeSending.isEmpty, "a chat not started yet saves nothing")

        session.send(text: "Fix the typos in this note")
        await session.waitForTurn()
        XCTAssertEqual(created, 1)
        XCTAssertEqual(session.noteId, "chat_made")
        let calls = await mock.streamLlmChatCalls
        XCTAssertEqual(calls.first?.config.chatNoteId, "chat_made")
        XCTAssertEqual(calls.first?.config.contextNoteId, "n1")
        XCTAssertEqual(calls.first?.config.enableNoteTools, true)
        let saves = await mock.updateNoteContentCalls
        XCTAssertEqual(saves.map(\.0), ["chat_made"])
        XCTAssertEqual(reported.count, 1)
        XCTAssertEqual(reported.first?.map(\.toolName), ["edit_note_content"])
        XCTAssertTrue(NoteDetailViewModel.noteChangingAITools.contains("edit_note_content"))
        XCTAssertFalse(NoteDetailViewModel.noteChangingAITools.contains("get_note_content"))

        // The second message reuses the chat note.
        await mock.setStreamLlmChatResult(.success([.text("More."), .done]))
        session.send(text: "Thanks")
        await session.waitForTurn()
        XCTAssertEqual(created, 1)
    }

    func testAChatNoteThatCantBeMadeShowsTheError() async throws {
        let mock = MockTriliumClient()
        let config = self.config
        let session = LlmChatSession(
            noteId: nil, content: LlmChatContent(), client: { mock }, aiConfig: { config },
            onContentSaved: { _ in }, onFirstTurnCompleted: {},
            createChatNote: { throw APIError.serverError(statusCode: 500, message: "nope") }
        )
        session.send(text: "Hi")
        await session.waitForTurn()
        XCTAssertNil(session.noteId)
        XCTAssertEqual(session.messages.map(\.kind), [.message, .error])
        XCTAssertTrue(session.messages.last?.text.hasPrefix("Couldn't start the chat:") == true)
        let calls = await mock.streamLlmChatCalls
        XCTAssertTrue(calls.isEmpty)
    }

    func testAttachmentsUploadToTheChatNoteAndGoOutWithTheMessage() async throws {
        let mock = MockTriliumClient()
        await mock.setStreamLlmChatResult(.success([.text("Nice photo."), .done]))
        let config = self.config
        var created = 0
        let session = LlmChatSession(
            noteId: nil, content: LlmChatContent(), client: { mock }, aiConfig: { config },
            onContentSaved: { _ in }, onFirstTurnCompleted: {},
            createChatNote: { created += 1; return "chat_made" }
        )
        let png = UIGraphicsImageRenderer(size: CGSize(width: 10, height: 10)).pngData { ctx in
            UIColor.blue.setFill(); ctx.fill(CGRect(x: 0, y: 0, width: 10, height: 10))
        }
        await session.attach(data: png, filename: "Photo.png", mime: "image/png")
        await session.attach(data: Data("print(1)".utf8), filename: "script.py", mime: "application/octet-stream")
        await session.attach(data: Data([0, 1, 2]), filename: "movie.mov", mime: "video/quicktime")
        XCTAssertEqual(created, 1, "the chat note is made for the first upload")
        XCTAssertEqual(session.pendingAttachments.map(\.kind), [.image, .textFile])
        XCTAssertNotNil(session.pendingAttachments.first?.thumbnail)
        XCTAssertTrue(session.attachmentError?.contains("movie.mov") == true)
        let uploads = await mock.uploadNoteAttachmentCalls
        XCTAssertEqual(uploads.map(\.noteId), ["chat_made", "chat_made"])
        XCTAssertEqual(uploads.map(\.contentType), ["image/png", "application/octet-stream"])

        XCTAssertTrue(session.canSend(text: ""), "attachments alone can be sent")
        session.send(text: "")
        XCTAssertTrue(session.pendingAttachments.isEmpty)
        await session.waitForTurn()
        guard case .blocks(let blocks) = session.messages.first?.content else { return XCTFail("expected blocks") }
        XCTAssertEqual(blocks.count, 2)
        guard case .image(let image) = blocks[0], case .textFile(let file) = blocks[1] else { return XCTFail("expected image then text file") }
        XCTAssertEqual(image.url, "api/attachments/\(image.attachmentId)/image/Photo.png")
        XCTAssertEqual(file.title, "script.py")
        let calls = await mock.streamLlmChatCalls
        XCTAssertEqual(calls.first?.messages.first?.content, .parts([
            .image(attachmentId: image.attachmentId, mime: image.mime),
            .textAttachment(attachmentId: file.attachmentId, filename: "script.py")
        ]))
        XCTAssertFalse(session.canSend(text: ""), "nothing left to send")
    }

    // MARK: Tool approvals (Trilium 0.107+)

    /// Polls until `condition` holds; the session publishes a streaming turn in bursts.
    private func waitUntil(_ condition: () -> Bool, file: StaticString = #filePath, line: UInt = #line) async throws {
        for _ in 0..<200 where !condition() {
            try await Task.sleep(for: .milliseconds(10))
        }
        XCTAssertTrue(condition(), "condition never held", file: file, line: line)
    }

    private func storedToolCalls(_ session: LlmChatSession) -> [ToolCall] {
        session.messages.flatMap { message -> [ToolCall] in
            guard case .blocks(let blocks) = message.content else { return [] }
            return blocks.compactMap { block in
                if case .toolCall(let call) = block { return call }
                return nil
            }
        }
    }

    func testPermissionModeComesFromTheChatThenTheServerOption() async throws {
        let mock = MockTriliumClient()
        let recorder = Recorder()
        let serverConfig = TriliumAIConfig(aiEnabled: true, providers: config.providers, permissionMode: .alwaysAsk)
        let fromServer = makeSession(mock, recorder: recorder, config: serverConfig)
        XCTAssertEqual(fromServer.permissionMode, .alwaysAsk)

        var content = LlmChatContent()
        content.permissionMode = .dontAsk
        content.allowedTools = ["get_note"]
        let ownChoice = makeSession(mock, content: content, recorder: recorder, config: serverConfig)
        ownChoice.send(text: "Hi")
        await ownChoice.waitForTurn()
        let calls = await mock.streamLlmChatCalls
        XCTAssertEqual(calls.last?.config.permissionMode, .dontAsk)
        XCTAssertEqual(calls.last?.config.allowedTools, ["get_note"])
    }

    func testAllowingAToolForTheChatAnswersAndRemembersIt() async throws {
        let mock = MockTriliumClient()
        await mock.setHoldsStreamOpen(true)
        await mock.setStreamLlmChatResult(.success([
            .toolUse(toolCallId: "t1", toolName: "edit_note_content", toolInput: [:]),
            .toolApprovalRequest(toolCallId: "t1", toolName: "edit_note_content", toolInput: ["noteId": .string("n1")]),
            .toolApprovalRequest(toolCallId: "t2", toolName: "edit_note_content", toolInput: ["noteId": .string("n2")])
        ]))
        let recorder = Recorder()
        let session = makeSession(mock, recorder: recorder)
        session.send(text: "Fix both notes")
        try await waitUntil { session.waitingToolCalls.map(\.id) == ["t1", "t2"] }
        XCTAssertEqual(session.waitingToolCalls.first?.input, ["noteId": .string("n1")], "the request carries the input")

        session.answerToolCall("t1", approved: true, forChat: true)
        try await waitUntil { session.waitingToolCalls.isEmpty }
        let answers = await mock.answerToolApprovalCalls
        let streamId = await mock.streamLlmChatCalls.first?.streamId
        XCTAssertEqual(answers.map(\.toolCallId), ["t1"], "the server lets the tool's other waiting call run itself")
        XCTAssertEqual(answers.first?.streamId, streamId)
        XCTAssertEqual(answers.first?.approved, true)
        XCTAssertEqual(answers.first?.allowForChat, true)
        XCTAssertEqual(session.content.allowedTools, ["edit_note_content"])

        await mock.finishHeldStream(with: [
            .toolResult(toolCallId: "t1", toolName: "edit_note_content", result: "{}", isError: false),
            .toolResult(toolCallId: "t2", toolName: "edit_note_content", result: "{}", isError: false),
            .done
        ])
        await session.waitForTurn()
        XCTAssertEqual(storedToolCalls(session).map(\.approval), [nil, nil])
        XCTAssertEqual(LlmChatContent.parse(try XCTUnwrap(recorder.saved.last))?.allowedTools, ["edit_note_content"])

        await mock.setHoldsStreamOpen(false)
        await mock.setStreamLlmChatResult(.success([.text("Done"), .done]))
        session.send(text: "Thanks")
        await session.waitForTurn()
        let calls = await mock.streamLlmChatCalls
        XCTAssertEqual(calls.last?.config.allowedTools, ["edit_note_content"], "later turns run the tool without asking")
    }

    func testDenyingACallStoresItAsDeniedNotFailed() async throws {
        let mock = MockTriliumClient()
        await mock.setHoldsStreamOpen(true)
        await mock.setStreamLlmChatResult(.success([
            .toolApprovalRequest(toolCallId: "t1", toolName: "delete_note", toolInput: ["noteId": .string("n1")])
        ]))
        let recorder = Recorder()
        let session = makeSession(mock, recorder: recorder)
        session.send(text: "Delete it")
        try await waitUntil { session.waitingToolCalls.count == 1 }
        session.answerToolCall("t1", approved: false)
        try await waitUntil { session.waitingToolCalls.isEmpty }
        await mock.finishHeldStream(with: [
            .toolResult(toolCallId: "t1", toolName: "delete_note", result: #"{"error":"The user declined this tool call."}"#, isError: true),
            .text("OK, I left it."),
            .done
        ])
        await session.waitForTurn()
        let call = try XCTUnwrap(storedToolCalls(session).first)
        XCTAssertEqual(call.approval, .declined)
        XCTAssertFalse(call.failed, "a denied call never ran")
        XCTAssertNil(session.content.allowedTools)
    }

    func testAFailedAnswerKeepsTheCallWaiting() async throws {
        let mock = MockTriliumClient()
        await mock.setHoldsStreamOpen(true)
        await mock.setAnswerToolApprovalError(APIError.networkUnavailable)
        await mock.setStreamLlmChatResult(.success([
            .toolApprovalRequest(toolCallId: "t1", toolName: "rename_note", toolInput: [:])
        ]))
        let session = makeSession(mock, recorder: Recorder())
        session.send(text: "Rename it")
        try await waitUntil { session.waitingToolCalls.count == 1 }
        session.answerToolCall("t1", approved: true)
        try await waitUntil { session.toolApprovalError != nil }
        XCTAssertEqual(session.waitingToolCalls.map(\.id), ["t1"], "it can be answered again")

        session.stop()
        await session.waitForTurn()
        let call = try XCTUnwrap(storedToolCalls(session).first)
        XCTAssertNil(call.approval, "a call left waiting is stored as stopped")
        XCTAssertEqual(call.result, LlmChatTurnReducer.stoppedToolResult)
        XCTAssertNil(session.toolApprovalError)
    }
}
