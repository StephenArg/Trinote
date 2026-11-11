import Foundation

// Trilium's AI chat, as the server and the web client speak it (Trilium v0.106.0):
// - the `llmChat` note body (`apps/client/src/widgets/type_widgets/llm_chat/llm_chat_types.ts`);
// - what `POST /api/llm-chat/stream` takes and the chunks it answers with (`packages/commons/src/lib/llm_api.ts`);
// - the rows of the `special-notes/*llm-chat*` routes.
//
// Transcripts are saved whole by the client (the server never writes them), so everything here round-trips: keys
// this app doesn't model are kept in `extra` and written back unchanged.

/// Where Trilium keeps AI chats.
enum TriliumAIChat {
    /// The hidden folder new chats go to (`_llmChat/<YYYY-MM>`) until one is kept.
    static let historyRootNoteId = "_llmChat"
}

/// Any key, for the fields this app keeps without modelling them.
private struct DynamicKey: CodingKey {
    let stringValue: String
    var intValue: Int? { nil }
    init(_ name: String) { stringValue = name }
    init?(stringValue: String) { self.stringValue = stringValue }
    init?(intValue: Int) { nil }
}

// MARK: - Transcript

/// A chat note's body: `{"version":1,"messages":[…]}` plus the chat's own settings.
struct LlmChatContent: Codable, Equatable, Sendable {
    static let currentVersion = 1
    /// What Trilium gives a new chat note.
    static let emptyJSON = "{\"version\":1,\"messages\":[]}"

    var version: Int
    var messages: [StoredMessage]
    var selectedModel: String?
    /// Provider type owning `selectedModel`; absent in chats saved before it existed.
    var selectedProvider: String?
    /// Provider configuration id owning `selectedModel`; absent in older chats.
    var selectedProviderId: String?
    var enableWebSearch: Bool?
    var enableNoteTools: Bool?
    var enableExtendedThinking: Bool?
    var reasoningEffort: LlmReasoningEffort?
    /// Which tool calls wait for the user in this chat (Trilium 0.107+); absent: the `llmPermissionMode` option.
    var permissionMode: LlmPermissionMode?
    /// Tools the user allowed for this whole chat, whose calls run without asking (Trilium 0.107+).
    var allowedTools: [String]?
    /// Keys desktop wrote that this app doesn't model (`highlights` lives on messages; future keys land here).
    var extra: [String: JSONValue] = [:]

    init(messages: [StoredMessage] = []) {
        version = Self.currentVersion
        self.messages = messages
    }

    private static let knownKeys: Set<String> = [
        "version", "messages", "selectedModel", "selectedProvider", "selectedProviderId",
        "enableWebSearch", "enableNoteTools", "enableExtendedThinking", "reasoningEffort",
        "permissionMode", "allowedTools"
    ]

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: DynamicKey.self)
        version = try c.decodeIfPresent(Int.self, forKey: DynamicKey("version")) ?? Self.currentVersion
        messages = try c.decodeIfPresent([StoredMessage].self, forKey: DynamicKey("messages")) ?? []
        selectedModel = try c.decodeIfPresent(String.self, forKey: DynamicKey("selectedModel"))
        selectedProvider = try c.decodeIfPresent(String.self, forKey: DynamicKey("selectedProvider"))
        selectedProviderId = try c.decodeIfPresent(String.self, forKey: DynamicKey("selectedProviderId"))
        enableWebSearch = try c.decodeIfPresent(Bool.self, forKey: DynamicKey("enableWebSearch"))
        enableNoteTools = try c.decodeIfPresent(Bool.self, forKey: DynamicKey("enableNoteTools"))
        enableExtendedThinking = try c.decodeIfPresent(Bool.self, forKey: DynamicKey("enableExtendedThinking"))
        reasoningEffort = try c.decodeIfPresent(LlmReasoningEffort.self, forKey: DynamicKey("reasoningEffort"))
        permissionMode = try c.decodeIfPresent(LlmPermissionMode.self, forKey: DynamicKey("permissionMode"))
        allowedTools = try? c.decodeIfPresent([String].self, forKey: DynamicKey("allowedTools"))
        var extra: [String: JSONValue] = [:]
        for key in c.allKeys where !Self.knownKeys.contains(key.stringValue) {
            extra[key.stringValue] = try c.decode(JSONValue.self, forKey: key)
        }
        self.extra = extra
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: DynamicKey.self)
        try c.encode(version, forKey: DynamicKey("version"))
        try c.encode(messages, forKey: DynamicKey("messages"))
        try c.encodeIfPresent(selectedModel, forKey: DynamicKey("selectedModel"))
        try c.encodeIfPresent(selectedProvider, forKey: DynamicKey("selectedProvider"))
        try c.encodeIfPresent(selectedProviderId, forKey: DynamicKey("selectedProviderId"))
        try c.encodeIfPresent(enableWebSearch, forKey: DynamicKey("enableWebSearch"))
        try c.encodeIfPresent(enableNoteTools, forKey: DynamicKey("enableNoteTools"))
        try c.encodeIfPresent(enableExtendedThinking, forKey: DynamicKey("enableExtendedThinking"))
        try c.encodeIfPresent(reasoningEffort, forKey: DynamicKey("reasoningEffort"))
        try c.encodeIfPresent(permissionMode, forKey: DynamicKey("permissionMode"))
        if let allowedTools, !allowedTools.isEmpty {
            try c.encode(allowedTools, forKey: DynamicKey("allowedTools"))
        }
        for (key, value) in extra where !Self.knownKeys.contains(key) {
            try c.encode(value, forKey: DynamicKey(key))
        }
    }

    /// The transcript in `json`, or `nil` when it isn't one (desktop clears the chat then; this app shows it empty).
    static func parse(_ json: String) -> LlmChatContent? {
        guard let data = json.data(using: .utf8) else { return nil }
        return try? JSONDecoder().decode(LlmChatContent.self, from: data)
    }

    /// Compact JSON for `PUT /api/notes/:id/data`, keys sorted so the same transcript always reads the same.
    func jsonString() throws -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys, .withoutEscapingSlashes]
        return String(decoding: try encoder.encode(self), as: UTF8.self)
    }

    /// Whether `content` is a transcript a chat note can carry on from: an object with a `messages` array.
    static func isUsableChatJSON(_ content: String) -> Bool {
        guard let data = content.data(using: .utf8),
              let object = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any] else { return false }
        return object["messages"] is [Any]
    }
}

/// `user`, `assistant` or `system`; kept as text so a role this app doesn't know survives a save.
struct MessageRole: RawRepresentable, Codable, Hashable, Sendable {
    let rawValue: String
    init(rawValue: String) { self.rawValue = rawValue }

    static let user = MessageRole(rawValue: "user")
    static let assistant = MessageRole(rawValue: "assistant")
    static let system = MessageRole(rawValue: "system")
}

/// How a message is drawn: a normal message, a failed turn, or the model's thinking.
struct MessageKind: RawRepresentable, Codable, Hashable, Sendable {
    let rawValue: String
    init(rawValue: String) { self.rawValue = rawValue }

    static let message = MessageKind(rawValue: "message")
    static let error = MessageKind(rawValue: "error")
    static let thinking = MessageKind(rawValue: "thinking")
}

/// One turn of a chat, as the web client stores it.
struct StoredMessage: Codable, Equatable, Sendable, Identifiable {
    var id: String
    var role: MessageRole
    /// Plain text (user messages, older assistant replies) or ordered blocks (assistant replies, attachments).
    var content: MessageContent
    /// ISO-8601 with milliseconds and `Z`, as JavaScript's `toISOString()` writes it.
    var createdAt: String
    /// Absent means a normal message.
    var type: MessageKind?
    /// For a failed turn: the provider call's status, URL and response body, when it got that far.
    var errorDetails: LlmErrorDetails?
    var citations: [LlmCitation]?
    var usage: LlmUsage?
    /// Keys this app doesn't model (desktop's `highlights`, future keys), written back unchanged.
    var extra: [String: JSONValue] = [:]

    init(
        id: String = StoredMessage.makeId(),
        role: MessageRole,
        content: MessageContent,
        createdAt: String = StoredMessage.isoTimestamp(),
        type: MessageKind? = nil,
        errorDetails: LlmErrorDetails? = nil,
        citations: [LlmCitation]? = nil,
        usage: LlmUsage? = nil,
        extra: [String: JSONValue] = [:]
    ) {
        self.id = id
        self.role = role
        self.content = content
        self.createdAt = createdAt
        self.type = type
        self.errorDetails = errorDetails
        self.citations = citations
        self.usage = usage
        self.extra = extra
    }

    private static let knownKeys: Set<String> = ["id", "role", "content", "createdAt", "type", "errorDetails", "citations", "usage"]

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: DynamicKey.self)
        id = try c.decodeIfPresent(String.self, forKey: DynamicKey("id")) ?? Self.makeId()
        role = try c.decodeIfPresent(MessageRole.self, forKey: DynamicKey("role")) ?? .assistant
        content = try c.decodeIfPresent(MessageContent.self, forKey: DynamicKey("content")) ?? .text("")
        createdAt = try c.decodeIfPresent(String.self, forKey: DynamicKey("createdAt")) ?? ""
        type = try c.decodeIfPresent(MessageKind.self, forKey: DynamicKey("type"))
        errorDetails = try c.decodeIfPresent(LlmErrorDetails.self, forKey: DynamicKey("errorDetails"))
        citations = try c.decodeIfPresent([LlmCitation].self, forKey: DynamicKey("citations"))
        usage = try c.decodeIfPresent(LlmUsage.self, forKey: DynamicKey("usage"))
        var extra: [String: JSONValue] = [:]
        for key in c.allKeys where !Self.knownKeys.contains(key.stringValue) {
            extra[key.stringValue] = try c.decode(JSONValue.self, forKey: key)
        }
        self.extra = extra
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: DynamicKey.self)
        try c.encode(id, forKey: DynamicKey("id"))
        try c.encode(role, forKey: DynamicKey("role"))
        try c.encode(content, forKey: DynamicKey("content"))
        try c.encode(createdAt, forKey: DynamicKey("createdAt"))
        try c.encodeIfPresent(type, forKey: DynamicKey("type"))
        try c.encodeIfPresent(errorDetails, forKey: DynamicKey("errorDetails"))
        try c.encodeIfPresent(citations, forKey: DynamicKey("citations"))
        try c.encodeIfPresent(usage, forKey: DynamicKey("usage"))
        for (key, value) in extra where !Self.knownKeys.contains(key) {
            try c.encode(value, forKey: DynamicKey(key))
        }
    }

    var kind: MessageKind { type ?? .message }

    /// The message's text: the string, or its text blocks joined (desktop's `getMessageText`).
    var text: String { content.plainText }

    /// A user message typed now.
    static func user(text: String, now: Date = Date()) -> StoredMessage {
        StoredMessage(role: .user, content: .text(text), createdAt: isoTimestamp(now))
    }

    /// 16 random letters and digits, like the web client's `randomString()`.
    static func makeId() -> String {
        let alphabet = Array("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
        return String((0..<16).map { _ in alphabet[Int.random(in: 0..<alphabet.count)] })
    }

    static func isoTimestamp(_ date: Date = Date()) -> String {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter.string(from: date)
    }
}

/// A message's content: one string, or ordered blocks.
enum MessageContent: Codable, Equatable, Sendable {
    case text(String)
    case blocks([ContentBlock])

    init(from decoder: Decoder) throws {
        let c = try decoder.singleValueContainer()
        if let text = try? c.decode(String.self) {
            self = .text(text)
        } else {
            self = .blocks(try c.decode([ContentBlock].self))
        }
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.singleValueContainer()
        switch self {
        case .text(let text): try c.encode(text)
        case .blocks(let blocks): try c.encode(blocks)
        }
    }

    var plainText: String {
        switch self {
        case .text(let text):
            return text
        case .blocks(let blocks):
            return blocks.compactMap { block -> String? in
                if case .text(let text) = block { return text }
                return nil
            }.joined()
        }
    }

    var blocks: [ContentBlock] {
        switch self {
        case .text(let text): return [.text(text)]
        case .blocks(let blocks): return blocks
        }
    }
}

/// An attachment a user message carries, by its id on the chat note.
struct AttachmentBlockRef: Codable, Equatable, Sendable {
    var attachmentId: String
    var mime: String
    var title: String
    /// Where the web client shows it from (`api/attachments/<id>/image/<title>`); this app loads the bytes itself.
    var url: String

    init(attachmentId: String, mime: String, title: String, url: String) {
        self.attachmentId = attachmentId
        self.mime = mime
        self.title = title
        self.url = url
    }

    private enum Keys: String, CodingKey { case attachmentId, mime, title, url }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: Keys.self)
        attachmentId = try c.decodeIfPresent(String.self, forKey: .attachmentId) ?? ""
        mime = try c.decodeIfPresent(String.self, forKey: .mime) ?? ""
        title = try c.decodeIfPresent(String.self, forKey: .title) ?? ""
        url = try c.decodeIfPresent(String.self, forKey: .url) ?? ""
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: Keys.self)
        try c.encode(attachmentId, forKey: .attachmentId)
        try c.encode(mime, forKey: .mime)
        try c.encode(title, forKey: .title)
        try c.encode(url, forKey: .url)
    }
}

/// One block of a message, in order. A kind this app doesn't know is kept whole.
enum ContentBlock: Codable, Equatable, Sendable {
    case text(String)
    /// Trilium main stores the model's thinking as a block; v0.106.0 stores it as a separate `thinking` message.
    case thinking(String)
    case toolCall(ToolCall)
    case image(AttachmentBlockRef)
    case file(AttachmentBlockRef)
    case textFile(AttachmentBlockRef)
    case unknown(JSONValue)

    private enum Keys: String, CodingKey { case type, content, toolCall, attachmentId, mime, title, url }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: Keys.self)
        switch try c.decodeIfPresent(String.self, forKey: .type) ?? "" {
        case "text":
            self = .text(try c.decodeIfPresent(String.self, forKey: .content) ?? "")
        case "thinking":
            self = .thinking(try c.decodeIfPresent(String.self, forKey: .content) ?? "")
        case "tool_call":
            self = .toolCall(try c.decode(ToolCall.self, forKey: .toolCall))
        case "image":
            self = .image(try AttachmentBlockRef(from: decoder))
        case "file":
            self = .file(try AttachmentBlockRef(from: decoder))
        case "text_file":
            self = .textFile(try AttachmentBlockRef(from: decoder))
        default:
            self = .unknown(try JSONValue(from: decoder))
        }
    }

    func encode(to encoder: Encoder) throws {
        switch self {
        case .text(let content):
            var c = encoder.container(keyedBy: Keys.self)
            try c.encode("text", forKey: .type)
            try c.encode(content, forKey: .content)
        case .thinking(let content):
            var c = encoder.container(keyedBy: Keys.self)
            try c.encode("thinking", forKey: .type)
            try c.encode(content, forKey: .content)
        case .toolCall(let call):
            var c = encoder.container(keyedBy: Keys.self)
            try c.encode("tool_call", forKey: .type)
            try c.encode(call, forKey: .toolCall)
        case .image(let ref):
            try Self.encodeAttachment(ref, type: "image", to: encoder)
        case .file(let ref):
            try Self.encodeAttachment(ref, type: "file", to: encoder)
        case .textFile(let ref):
            try Self.encodeAttachment(ref, type: "text_file", to: encoder)
        case .unknown(let value):
            try value.encode(to: encoder)
        }
    }

    private static func encodeAttachment(_ ref: AttachmentBlockRef, type: String, to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: Keys.self)
        try c.encode(type, forKey: .type)
        try c.encode(ref.attachmentId, forKey: .attachmentId)
        try c.encode(ref.mime, forKey: .mime)
        try c.encode(ref.title, forKey: .title)
        try c.encode(ref.url, forKey: .url)
    }
}

/// A tool the model called while answering, shown inline in the reply.
struct ToolCall: Codable, Equatable, Sendable {
    var id: String
    var toolName: String
    var input: [String: JSONValue]
    /// Raw JSON arguments while the call's input is still streaming; cleared once `input` arrives.
    var inputStreaming: String?
    var result: String?
    var isError: Bool?
    /// `pending` while the call waits for the user to allow it, `declined` once they denied it (Trilium 0.107+).
    var approval: ToolCallApproval?

    init(
        id: String, toolName: String, input: [String: JSONValue] = [:], inputStreaming: String? = nil,
        result: String? = nil, isError: Bool? = nil, approval: ToolCallApproval? = nil
    ) {
        self.id = id
        self.toolName = toolName
        self.input = input
        self.inputStreaming = inputStreaming
        self.result = result
        self.isError = isError
        self.approval = approval
    }

    /// Whether the call failed. A call the user denied never ran, so it didn't fail (desktop's `isFailedToolCall`).
    var failed: Bool { approval != .declined && isError == true }

    private enum CodingKeys: String, CodingKey { case id, toolName, input, inputStreaming, result, isError, approval }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decodeIfPresent(String.self, forKey: .id) ?? ""
        toolName = try c.decodeIfPresent(String.self, forKey: .toolName) ?? ""
        input = try c.decodeIfPresent([String: JSONValue].self, forKey: .input) ?? [:]
        inputStreaming = try c.decodeIfPresent(String.self, forKey: .inputStreaming)
        result = try Self.decodeText(c, forKey: .result)
        isError = try c.decodeIfPresent(Bool.self, forKey: .isError)
        approval = try? c.decodeIfPresent(ToolCallApproval.self, forKey: .approval)
    }

    /// A string, or any other JSON value as its text (a tool result is typed as a string but comes from the provider).
    private static func decodeText(_ c: KeyedDecodingContainer<CodingKeys>, forKey key: CodingKeys) throws -> String? {
        if let text = try? c.decodeIfPresent(String.self, forKey: key) { return text }
        guard let value = try c.decodeIfPresent(JSONValue.self, forKey: key) else { return nil }
        return value.jsonText
    }
}

/// Where a tool call stands with the user, kept as text so a state this app doesn't know still decodes.
struct ToolCallApproval: RawRepresentable, Codable, Hashable, Sendable {
    let rawValue: String
    init(rawValue: String) { self.rawValue = rawValue }

    /// Waits for the user to allow or deny it.
    static let pending = ToolCallApproval(rawValue: "pending")
    /// The user denied it; it never ran.
    static let declined = ToolCallApproval(rawValue: "declined")
}

struct LlmCitation: Codable, Equatable, Sendable {
    var url: String?
    var title: String?
    var citedText: String?

    init(url: String? = nil, title: String? = nil, citedText: String? = nil) {
        self.url = url
        self.title = title
        self.citedText = citedText
    }
}

/// Token counts and cost of a reply. Counts are absent when the provider reports none (the agent providers).
struct LlmUsage: Codable, Equatable, Sendable {
    var promptTokens: Int?
    var completionTokens: Int?
    var totalTokens: Int?
    /// Estimated cost in USD, when known.
    var cost: Double?
    /// The model's display name as the server reports it.
    var model: String?
    /// The provider *type* that answered (`anthropic`, `openai`, …), for shortening the model name.
    var provider: String?

    init(promptTokens: Int? = nil, completionTokens: Int? = nil, totalTokens: Int? = nil, cost: Double? = nil, model: String? = nil, provider: String? = nil) {
        self.promptTokens = promptTokens
        self.completionTokens = completionTokens
        self.totalTokens = totalTokens
        self.cost = cost
        self.model = model
        self.provider = provider
    }

    private enum CodingKeys: String, CodingKey { case promptTokens, completionTokens, totalTokens, cost, model, provider }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        promptTokens = try c.decodeIfPresent(JSONValue.self, forKey: .promptTokens)?.intValue
        completionTokens = try c.decodeIfPresent(JSONValue.self, forKey: .completionTokens)?.intValue
        totalTokens = try c.decodeIfPresent(JSONValue.self, forKey: .totalTokens)?.intValue
        cost = try c.decodeIfPresent(JSONValue.self, forKey: .cost)?.doubleValue
        model = try c.decodeIfPresent(String.self, forKey: .model)
        provider = try c.decodeIfPresent(String.self, forKey: .provider)
    }
}

/// Why a provider call failed, beside the message of an `error` chunk.
struct LlmErrorDetails: Codable, Equatable, Sendable {
    var statusCode: Int?
    var url: String?
    /// Raw response body, already truncated by the server.
    var responseBody: String?

    init(statusCode: Int? = nil, url: String? = nil, responseBody: String? = nil) {
        self.statusCode = statusCode
        self.url = url
        self.responseBody = responseBody
    }
}

// MARK: - Stream

/// One Server-Sent Events frame of `POST /api/llm-chat/stream`.
enum LlmStreamChunk: Decodable, Equatable, Sendable {
    /// What the turn waits on before its reply starts (`starting_agent`).
    case status(String)
    case text(String)
    case thinking(String)
    case toolInputStart(toolCallId: String, toolName: String)
    case toolInputDelta(toolCallId: String, delta: String)
    case toolUse(toolCallId: String, toolName: String, toolInput: [String: JSONValue])
    /// The call waits until the user allows or denies it (`POST /api/llm-chat/tool-approval`, Trilium 0.107+).
    case toolApprovalRequest(toolCallId: String, toolName: String, toolInput: [String: JSONValue])
    case toolResult(toolCallId: String, toolName: String, result: String, isError: Bool)
    case citation(LlmCitation)
    case usage(LlmUsage)
    /// The turn failed; no `done` follows.
    case error(message: String, details: LlmErrorDetails?)
    case done
    /// A chunk type this app doesn't know; skipped.
    case unknown(type: String)

    private enum Keys: String, CodingKey {
        case type, status, content, toolCallId, toolName, delta, toolInput, result, isError, citation, usage, error, errorDetails
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: Keys.self)
        let type = try c.decodeIfPresent(String.self, forKey: .type) ?? ""
        switch type {
        case "status":
            self = .status(try c.decodeIfPresent(String.self, forKey: .status) ?? "")
        case "text":
            self = .text(try c.decodeIfPresent(String.self, forKey: .content) ?? "")
        case "thinking":
            self = .thinking(try c.decodeIfPresent(String.self, forKey: .content) ?? "")
        case "tool_input_start":
            self = .toolInputStart(
                toolCallId: try c.decodeIfPresent(String.self, forKey: .toolCallId) ?? "",
                toolName: try c.decodeIfPresent(String.self, forKey: .toolName) ?? ""
            )
        case "tool_input_delta":
            self = .toolInputDelta(
                toolCallId: try c.decodeIfPresent(String.self, forKey: .toolCallId) ?? "",
                delta: try c.decodeIfPresent(String.self, forKey: .delta) ?? ""
            )
        case "tool_use":
            self = .toolUse(
                toolCallId: try c.decodeIfPresent(String.self, forKey: .toolCallId) ?? "",
                toolName: try c.decodeIfPresent(String.self, forKey: .toolName) ?? "",
                toolInput: try c.decodeIfPresent([String: JSONValue].self, forKey: .toolInput) ?? [:]
            )
        case "tool_approval_request":
            self = .toolApprovalRequest(
                toolCallId: try c.decodeIfPresent(String.self, forKey: .toolCallId) ?? "",
                toolName: try c.decodeIfPresent(String.self, forKey: .toolName) ?? "",
                toolInput: try c.decodeIfPresent([String: JSONValue].self, forKey: .toolInput) ?? [:]
            )
        case "tool_result":
            let result: String
            if let text = try? c.decodeIfPresent(String.self, forKey: .result) {
                result = text
            } else {
                result = try c.decodeIfPresent(JSONValue.self, forKey: .result)?.jsonText ?? ""
            }
            self = .toolResult(
                toolCallId: try c.decodeIfPresent(String.self, forKey: .toolCallId) ?? "",
                toolName: try c.decodeIfPresent(String.self, forKey: .toolName) ?? "",
                result: result,
                isError: try c.decodeIfPresent(Bool.self, forKey: .isError) ?? false
            )
        case "citation":
            self = .citation(try c.decodeIfPresent(LlmCitation.self, forKey: .citation) ?? LlmCitation())
        case "usage":
            self = .usage(try c.decodeIfPresent(LlmUsage.self, forKey: .usage) ?? LlmUsage())
        case "error":
            self = .error(
                message: try c.decodeIfPresent(String.self, forKey: .error) ?? "Unknown error",
                details: try c.decodeIfPresent(LlmErrorDetails.self, forKey: .errorDetails)
            )
        case "done":
            self = .done
        default:
            self = .unknown(type: type)
        }
    }
}

// MARK: - Request

/// A message as `POST /api/llm-chat/stream` takes it.
struct LlmApiMessage: Codable, Equatable, Sendable {
    var role: String
    var content: LlmApiContent

    init(role: String, content: LlmApiContent) {
        self.role = role
        self.content = content
    }

    init(role: MessageRole, text: String) {
        self.init(role: role.rawValue, content: .text(text))
    }
}

enum LlmApiContent: Codable, Equatable, Sendable {
    case text(String)
    case parts([LlmMessagePart])

    init(from decoder: Decoder) throws {
        let c = try decoder.singleValueContainer()
        if let text = try? c.decode(String.self) {
            self = .text(text)
        } else {
            self = .parts(try c.decode([LlmMessagePart].self))
        }
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.singleValueContainer()
        switch self {
        case .text(let text): try c.encode(text)
        case .parts(let parts): try c.encode(parts)
        }
    }
}

/// A segment of a multimodal message. Attachments travel by id; the server loads their bytes.
enum LlmMessagePart: Codable, Equatable, Sendable {
    case text(String)
    case image(attachmentId: String, mime: String)
    case file(attachmentId: String, mime: String, filename: String)
    /// A text file the server inlines as plain text.
    case textAttachment(attachmentId: String, filename: String)

    private enum Keys: String, CodingKey { case type, text, attachmentId, mime, filename }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: Keys.self)
        let type = try c.decodeIfPresent(String.self, forKey: .type) ?? ""
        switch type {
        case "text":
            self = .text(try c.decodeIfPresent(String.self, forKey: .text) ?? "")
        case "image":
            self = .image(
                attachmentId: try c.decodeIfPresent(String.self, forKey: .attachmentId) ?? "",
                mime: try c.decodeIfPresent(String.self, forKey: .mime) ?? ""
            )
        case "file":
            self = .file(
                attachmentId: try c.decodeIfPresent(String.self, forKey: .attachmentId) ?? "",
                mime: try c.decodeIfPresent(String.self, forKey: .mime) ?? "",
                filename: try c.decodeIfPresent(String.self, forKey: .filename) ?? ""
            )
        case "text_attachment":
            self = .textAttachment(
                attachmentId: try c.decodeIfPresent(String.self, forKey: .attachmentId) ?? "",
                filename: try c.decodeIfPresent(String.self, forKey: .filename) ?? ""
            )
        default:
            throw DecodingError.dataCorruptedError(forKey: .type, in: c, debugDescription: "Unknown message part type: \(type)")
        }
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: Keys.self)
        switch self {
        case .text(let text):
            try c.encode("text", forKey: .type)
            try c.encode(text, forKey: .text)
        case .image(let attachmentId, let mime):
            try c.encode("image", forKey: .type)
            try c.encode(attachmentId, forKey: .attachmentId)
            try c.encode(mime, forKey: .mime)
        case .file(let attachmentId, let mime, let filename):
            try c.encode("file", forKey: .type)
            try c.encode(attachmentId, forKey: .attachmentId)
            try c.encode(mime, forKey: .mime)
            try c.encode(filename, forKey: .filename)
        case .textAttachment(let attachmentId, let filename):
            try c.encode("text_attachment", forKey: .type)
            try c.encode(attachmentId, forKey: .attachmentId)
            try c.encode(filename, forKey: .filename)
        }
    }
}

/// How much a model reasons before it answers (`none` … `max`), kept as text so a new level still decodes.
struct LlmReasoningEffort: RawRepresentable, Codable, Hashable, Sendable {
    let rawValue: String
    init(rawValue: String) { self.rawValue = rawValue }

    static let disabled = LlmReasoningEffort(rawValue: "none")
    static let minimal = LlmReasoningEffort(rawValue: "minimal")
    static let low = LlmReasoningEffort(rawValue: "low")
    static let medium = LlmReasoningEffort(rawValue: "medium")
    static let high = LlmReasoningEffort(rawValue: "high")
    static let xhigh = LlmReasoningEffort(rawValue: "xhigh")
    static let max = LlmReasoningEffort(rawValue: "max")

    /// Weakest first, as Trilium lists them.
    static let known: [LlmReasoningEffort] = [.disabled, .minimal, .low, .medium, .high, .xhigh, .max]
}

/// The `config` of a stream request. Nil fields are left out.
struct LlmChatRequestConfig: Codable, Equatable, Sendable {
    var provider: String?
    var providerId: String?
    var model: String?
    var systemPrompt: String?
    var enableWebSearch: Bool?
    var enableNoteTools: Bool?
    var enableExtendedThinking: Bool?
    var thinkingBudget: Int?
    var reasoningEffort: LlmReasoningEffort?
    /// The note the user is looking at, for the note tools.
    var contextNoteId: String?
    /// The chat note, so the server can name it after the first turn.
    var chatNoteId: String?
    /// Tools whose calls run without asking (Trilium 0.107+).
    var allowedTools: [String]?
    /// Which tool calls wait for the user (Trilium 0.107+); the server asks before every one when it's absent.
    var permissionMode: LlmPermissionMode?
    /// The configured search provider that does this turn's web search, in place of the model's own (Trilium 0.107+).
    var webSearchProviderId: String?

    init(
        provider: String? = nil, providerId: String? = nil, model: String? = nil, systemPrompt: String? = nil,
        enableWebSearch: Bool? = nil, enableNoteTools: Bool? = nil, enableExtendedThinking: Bool? = nil,
        thinkingBudget: Int? = nil, reasoningEffort: LlmReasoningEffort? = nil, contextNoteId: String? = nil, chatNoteId: String? = nil,
        allowedTools: [String]? = nil, permissionMode: LlmPermissionMode? = nil, webSearchProviderId: String? = nil
    ) {
        self.provider = provider
        self.providerId = providerId
        self.model = model
        self.systemPrompt = systemPrompt
        self.enableWebSearch = enableWebSearch
        self.enableNoteTools = enableNoteTools
        self.enableExtendedThinking = enableExtendedThinking
        self.thinkingBudget = thinkingBudget
        self.reasoningEffort = reasoningEffort
        self.contextNoteId = contextNoteId
        self.chatNoteId = chatNoteId
        self.allowedTools = allowedTools
        self.permissionMode = permissionMode
        self.webSearchProviderId = webSearchProviderId
    }
}

/// A chat turn's web search, worked out as Trilium's `resolveWebSearch` (`services/llm_providers.ts`) does.
struct LlmWebSearch: Equatable, Sendable {
    enum Unavailable: Equatable, Sendable {
        case noBuiltInSearch
        case geminiWithNoteTools
        case providerSearchesWithOwnTools
    }

    /// Why the chosen search can't be used with this model, if it can't.
    var unavailable: Unavailable?
    var enableWebSearch: Bool
    /// The search provider the turn goes through; `nil` means the model's built-in search.
    var webSearchProviderId: String?

    /// Provider types whose models can search the web on their own.
    private static let builtInSearch: Set<String> = [
        "anthropic", "openai", "google", "deepseek", "claude-agent", "antigravity-agent", "codex-agent",
    ]
    /// Provider types that run their own agent loop, which takes no tool from Trilium's chat.
    private static let ownAgentLoop: Set<String> = ["claude-agent", "copilot-agent", "antigravity-agent", "codex-agent"]

    /// - Parameters:
    ///   - searchProviderId: The `llmWebSearchProvider` option, when it names a configured search provider.
    ///   - knowsSearchProviders: The server is Trilium 0.107+. Before it, only the Gemini limit existed.
    static func resolve(
        modelProvider: String?,
        enableWebSearch: Bool,
        enableNoteTools: Bool,
        searchProviderId: String?,
        knowsSearchProviders: Bool
    ) -> LlmWebSearch {
        let builtInLimit: Unavailable?
        if knowsSearchProviders, let modelProvider, !builtInSearch.contains(modelProvider) {
            builtInLimit = .noBuiltInSearch
        } else if modelProvider == "google" && enableNoteTools {
            builtInLimit = .geminiWithNoteTools
        } else {
            builtInLimit = nil
        }
        let providerLimit: Unavailable? = modelProvider.map(ownAgentLoop.contains) == true ? .providerSearchesWithOwnTools : nil
        let unavailable = searchProviderId != nil ? providerLimit : builtInLimit
        let usable = enableWebSearch && unavailable == nil
        return LlmWebSearch(
            unavailable: unavailable,
            enableWebSearch: usable,
            webSearchProviderId: usable ? searchProviderId : nil
        )
    }
}

/// Which of a chat's tool calls wait for the user (Trilium 0.107+), kept as text so a new mode still decodes.
struct LlmPermissionMode: RawRepresentable, Codable, Hashable, Sendable {
    let rawValue: String
    init(rawValue: String) { self.rawValue = rawValue }

    /// Every call, reads included.
    static let alwaysAsk = LlmPermissionMode(rawValue: "always_ask")
    /// Only calls that change notes; the default of Trilium's `llmPermissionMode` option.
    static let askBeforeChanges = LlmPermissionMode(rawValue: "ask_before_changes")
    /// None.
    static let dontAsk = LlmPermissionMode(rawValue: "dont_ask")
}

struct LlmChatStreamRequest: Codable, Equatable, Sendable {
    /// Names the turn: Trilium 0.107+ refuses a turn without one, and its tool-call approvals name the turn by it.
    /// Older servers ignore it.
    var streamId: String
    var messages: [LlmApiMessage]
    var config: LlmChatRequestConfig
}

// MARK: - Models and providers

struct LlmModelPricing: Codable, Equatable, Sendable {
    /// USD per million input tokens.
    var input: Double
    /// USD per million output tokens.
    var output: Double
}

/// A model a provider offers, as stored in `llmProviders[].selectedModels` and listed by `provider-models`.
struct LlmModelInfo: Codable, Equatable, Sendable, Identifiable {
    var id: String
    var name: String
    /// Provider type (`anthropic`, `openai`, …); the config's, once tagged.
    var provider: String?
    /// The provider configuration the model was listed from; the config's, once tagged.
    var providerId: String?
    /// The user's name for that configuration; the config's, once tagged.
    var providerName: String?
    var pricing: LlmModelPricing?
    var isDefault: Bool?
    var isLegacy: Bool?
    var recommended: Bool?
    var contextWindow: Int?
    var isSubscription: Bool?
    /// The efforts the model can run at, weakest first; absent for a model with an on/off thinking switch.
    var reasoningEfforts: [LlmReasoningEffort]?
    var defaultReasoningEffort: LlmReasoningEffort?
    /// Trilium main: `image` / `file`, what the model takes as attachments.
    var attachmentKinds: [String]?

    init(
        id: String, name: String, provider: String? = nil, providerId: String? = nil, providerName: String? = nil,
        pricing: LlmModelPricing? = nil, isDefault: Bool? = nil, isLegacy: Bool? = nil, recommended: Bool? = nil,
        contextWindow: Int? = nil, isSubscription: Bool? = nil, reasoningEfforts: [LlmReasoningEffort]? = nil,
        defaultReasoningEffort: LlmReasoningEffort? = nil, attachmentKinds: [String]? = nil
    ) {
        self.id = id
        self.name = name
        self.provider = provider
        self.providerId = providerId
        self.providerName = providerName
        self.pricing = pricing
        self.isDefault = isDefault
        self.isLegacy = isLegacy
        self.recommended = recommended
        self.contextWindow = contextWindow
        self.isSubscription = isSubscription
        self.reasoningEfforts = reasoningEfforts
        self.defaultReasoningEffort = defaultReasoningEffort
        self.attachmentKinds = attachmentKinds
    }

    /// Whether the model offers graded reasoning rather than an on/off thinking switch.
    var hasReasoningLevels: Bool { !(reasoningEfforts ?? []).isEmpty }
}

/// What the `aiAssistantModel` option holds: the model the text editor's assistant speaks to.
struct AIAssistantModel: Codable, Equatable, Sendable {
    var model: String
    var provider: String?
    var providerId: String?

    init(model: String, provider: String? = nil, providerId: String? = nil) {
        self.model = model
        self.provider = provider
        self.providerId = providerId
    }
}

// MARK: - Special notes

/// `GET /api/special-notes/recent-llm-chats`: a chat still in the hidden history folder.
struct RecentLlmChat: Decodable, Equatable, Sendable, Identifiable {
    let noteId: String
    let title: String
    /// UTC, `yyyy-MM-dd HH:mm:ss.SSSZ` as Trilium writes it.
    let dateModified: String

    var id: String { noteId }

    init(noteId: String, title: String, dateModified: String) {
        self.noteId = noteId
        self.title = title
        self.dateModified = dateModified
    }
}

/// `POST /api/special-notes/save-llm-chat`: where the kept chat went.
struct KeepLlmChatResponse: Decodable, Equatable, Sendable {
    let success: Bool
    let message: String?
    let branchId: String?
    /// The kept clone's path (`root/…/noteId`); its last segment is the note id.
    let notePath: String?

    init(success: Bool, message: String? = nil, branchId: String? = nil, notePath: String? = nil) {
        self.success = success
        self.message = message
        self.branchId = branchId
        self.notePath = notePath
    }

    private enum CodingKeys: String, CodingKey { case success, message, branchId, notePath }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        success = try c.decodeIfPresent(Bool.self, forKey: .success) ?? false
        message = try c.decodeIfPresent(String.self, forKey: .message)
        branchId = try c.decodeIfPresent(String.self, forKey: .branchId)
        notePath = try c.decodeIfPresent(String.self, forKey: .notePath)
    }

    /// The kept note's id, from the end of `notePath`.
    var keptNoteId: String? {
        guard let notePath, let last = notePath.split(separator: "/").last, !last.isEmpty else { return nil }
        return String(last)
    }
}

/// `POST /api/special-notes/llm-chat`: the new chat note (the route returns the whole note row).
struct CreatedLlmChat: Decodable, Equatable, Sendable {
    let noteId: String
    let title: String

    init(noteId: String, title: String) {
        self.noteId = noteId
        self.title = title
    }
}
