import Foundation

/// An `error` chunk: the turn ends with an error message instead of a reply.
struct LlmChatStreamFailure: Equatable, Sendable {
    var message: String
    var details: LlmErrorDetails?
}

/// One assistant turn as it streams (desktop's `runStream` state), before it becomes stored messages.
struct LlmChatStreamingTurn: Equatable, Sendable {
    /// What the turn waits on before its reply starts (`starting_agent`), cleared once content arrives.
    var status: String?
    var thinking = ""
    var blocks: [ContentBlock] = []
    var citations: [LlmCitation] = []
    var usage: LlmUsage?
    var failure: LlmChatStreamFailure?

    init() {}

    var hasContent: Bool { !thinking.isEmpty || !blocks.isEmpty }
}

/// Pure rules of a chat turn, as the web client applies them (`useLlmChat.ts`, `llm_chat_types.ts`).
enum LlmChatTurnReducer {

    /// Desktop's result for a tool call still running when the turn was stopped.
    static let stoppedToolResult = "[Stopped]"

    // MARK: Chunks

    static func apply(_ chunk: LlmStreamChunk, to turn: inout LlmChatStreamingTurn) {
        switch chunk {
        case .status(let status):
            turn.status = status
        case .text(let text):
            turn.status = nil
            if case .text(let existing) = turn.blocks.last {
                turn.blocks[turn.blocks.count - 1] = .text(existing + text)
            } else {
                turn.blocks.append(.text(text))
            }
        case .thinking(let text):
            turn.status = nil
            turn.thinking += text
        case .toolInputStart(let toolCallId, let toolName):
            turn.status = nil
            turn.blocks.append(.toolCall(ToolCall(id: toolCallId, toolName: toolName, input: [:], inputStreaming: "")))
        case .toolInputDelta(let toolCallId, let delta):
            update(toolCallId: toolCallId, in: &turn) { call in
                call.inputStreaming = (call.inputStreaming ?? "") + delta
            }
        case .toolUse(let toolCallId, let toolName, let toolInput):
            turn.status = nil
            // Some providers skip the start/delta chunks and send the whole call at once.
            if !update(toolCallId: toolCallId, in: &turn, { call in
                call.input = toolInput
                call.inputStreaming = nil
            }) {
                turn.blocks.append(.toolCall(ToolCall(id: toolCallId, toolName: toolName, input: toolInput)))
            }
        case .toolResult(let toolCallId, let toolName, let result, let isError):
            if !update(toolCallId: toolCallId, in: &turn, { call in
                call.result = result
                call.isError = isError
                call.inputStreaming = nil
            }) {
                turn.blocks.append(.toolCall(ToolCall(id: toolCallId, toolName: toolName, result: result, isError: isError)))
            }
        case .citation(let citation):
            // De-duplicated by URL, as on desktop.
            if citation.url == nil || !turn.citations.contains(where: { $0.url == citation.url }) {
                turn.citations.append(citation)
            }
        case .usage(let usage):
            turn.usage = usage
        case .error(let message, let details):
            turn.failure = LlmChatStreamFailure(message: message, details: details)
        case .done, .unknown:
            break
        }
    }

    /// Changes the latest tool call with `toolCallId`; `false` when there is none.
    @discardableResult
    private static func update(toolCallId: String, in turn: inout LlmChatStreamingTurn, _ change: (inout ToolCall) -> Void) -> Bool {
        for index in turn.blocks.indices.reversed() {
            if case .toolCall(var call) = turn.blocks[index], call.id == toolCallId {
                change(&call)
                turn.blocks[index] = .toolCall(call)
                return true
            }
        }
        return false
    }

    // MARK: Ending a turn

    /// The messages a finished (or stopped) turn stores: the thinking first, if any, then the reply with its
    /// citations and usage. A tool call still running is marked stopped so it doesn't spin forever.
    static func finalize(_ turn: LlmChatStreamingTurn, now: Date = Date()) -> [StoredMessage] {
        var messages: [StoredMessage] = []
        let createdAt = StoredMessage.isoTimestamp(now)
        if !turn.thinking.isEmpty {
            messages.append(StoredMessage(role: .assistant, content: .text(turn.thinking), createdAt: createdAt, type: .thinking))
        }
        let blocks = turn.blocks.map { block -> ContentBlock in
            guard case .toolCall(var call) = block, call.result == nil else { return block }
            call.inputStreaming = nil
            call.result = stoppedToolResult
            call.isError = true
            return .toolCall(call)
        }
        if !blocks.isEmpty {
            messages.append(StoredMessage(
                role: .assistant,
                content: .blocks(blocks),
                createdAt: createdAt,
                citations: turn.citations.isEmpty ? nil : turn.citations,
                usage: turn.usage
            ))
        }
        return messages
    }

    /// The message a failed turn stores. Whatever streamed before the failure is dropped, as on desktop.
    static func errorMessage(_ failure: LlmChatStreamFailure, now: Date = Date()) -> StoredMessage {
        StoredMessage(
            role: .assistant,
            content: .text(failure.message),
            createdAt: StoredMessage.isoTimestamp(now),
            type: .error,
            errorDetails: failure.details
        )
    }

    // MARK: Requests

    /// The conversation as the server takes it: from the first user message on (a leading assistant turn is
    /// refused by some providers), each message flattened to text or parts, tool calls left out.
    static func apiMessages(from conversation: [StoredMessage]) -> [LlmApiMessage] {
        var messages = conversation[...]
        if let firstUser = conversation.firstIndex(where: { $0.role == .user }), firstUser > 0 {
            messages = conversation[firstUser...]
        }
        return messages.map { LlmApiMessage(role: $0.role.rawValue, content: apiContent($0.content)) }
    }

    static func apiContent(_ content: MessageContent) -> LlmApiContent {
        switch content {
        case .text(let text):
            return .text(text)
        case .blocks(let blocks):
            var parts: [LlmMessagePart] = []
            for block in blocks {
                switch block {
                case .text(let text):
                    if !text.isEmpty { parts.append(.text(text)) }
                case .image(let ref):
                    parts.append(.image(attachmentId: ref.attachmentId, mime: ref.mime))
                case .file(let ref):
                    parts.append(.file(attachmentId: ref.attachmentId, mime: ref.mime, filename: ref.title))
                case .textFile(let ref):
                    parts.append(.textAttachment(attachmentId: ref.attachmentId, filename: ref.title))
                case .toolCall, .thinking, .unknown:
                    // Rebuilt from the model's own turns; never re-sent as content.
                    break
                }
            }
            if parts.isEmpty { return .text("") }
            if parts.count == 1, case .text(let text) = parts[0] { return .text(text) }
            return .parts(parts)
        }
    }

    /// The conversation to re-run after a failed turn: without its trailing error message. `nil` when the last
    /// message isn't one.
    static func conversationForRetry(_ messages: [StoredMessage]) -> [StoredMessage]? {
        guard messages.last?.kind == .error else { return nil }
        return Array(messages.dropLast())
    }

    /// The conversation to re-run for a new reply: up to and including the last user message. `nil` when the
    /// last message isn't an assistant reply, or there is no user message.
    static func conversationForRegenerate(_ messages: [StoredMessage]) -> [StoredMessage]? {
        guard messages.last?.role == .assistant,
              let lastUser = messages.lastIndex(where: { $0.role == .user }) else { return nil }
        return Array(messages[...lastUser])
    }
}
