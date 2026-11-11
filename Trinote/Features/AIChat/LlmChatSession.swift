import Foundation
import Observation

/// One chat note's conversation: the stored transcript, the reply streaming in, and the settings the chat keeps.
/// Sends turns through the server, stores the outcome the way the web client does (`useLlmChat.ts`), and saves the
/// whole transcript after each turn, since the server never writes it.
@MainActor
@Observable
final class LlmChatSession {
    /// The chat note. `nil` for a chat not started yet: it is made on the first message (`createChatNote`), as
    /// desktop's sidebar does, so opening the chat and leaving leaves no empty chat behind.
    private(set) var noteId: String?
    private(set) var content: LlmChatContent
    /// The reply streaming in, published at most about fifteen times a second.
    private(set) var streamingTurn: LlmChatStreamingTurn?
    private(set) var isSaving = false
    private(set) var saveError: String?
    /// The note the chat is about (desktop's sidebar passes the note on screen); sent with each turn, not stored.
    var contextNoteId: String?
    /// Desktop's default: on for sidebar chats, off for chats made as notes.
    let defaultEnableNoteTools: Bool
    /// Images and files uploaded to the chat note, going out with the next message.
    private(set) var pendingAttachments: [PendingChatAttachment] = []
    /// Attachments still uploading; sending waits for them.
    private(set) var uploadingAttachmentCount = 0
    /// Why the last attachment couldn't be added; cleared when shown.
    var attachmentError: String?
    /// Waiting tool calls whose answer is on its way to the server.
    private(set) var answeringToolCallIds: Set<String> = []
    /// Why the last answer to a waiting tool call didn't reach the server; the call keeps waiting.
    var toolApprovalError: String?

    /// The running turn's `streamId`, which answers to its tool calls name.
    @ObservationIgnored private var currentStreamId: String?
    @ObservationIgnored private var pendingTurn: LlmChatStreamingTurn?
    @ObservationIgnored private var publishTask: Task<Void, Never>?
    @ObservationIgnored private var streamTask: Task<Void, Never>?
    @ObservationIgnored private let client: @MainActor () -> (any TriliumClientProtocol)?
    @ObservationIgnored private let aiConfig: @MainActor () -> TriliumAIConfig?
    @ObservationIgnored private let onContentSaved: @MainActor (String) -> Void
    @ObservationIgnored private let onFirstTurnCompleted: @MainActor () async -> Void
    @ObservationIgnored private let createChatNote: (@MainActor () async throws -> String)?
    @ObservationIgnored private let onTurnFinished: (@MainActor ([ToolCall]) async -> Void)?

    /// - Parameters:
    ///   - client: The signed-in client, read per call.
    ///   - aiConfig: Trilium's AI options, read per call (the models the chat can pick from).
    ///   - onContentSaved: The transcript JSON just written to the server, for the note's cache.
    ///   - onFirstTurnCompleted: After the first answered turn; the server may have named the note by then.
    ///   - createChatNote: Makes the chat note when `noteId` is nil and the first message is sent.
    ///   - onTurnFinished: After each turn, with the tool calls it made (a note tool may have changed notes).
    init(
        noteId: String?,
        content: LlmChatContent,
        defaultEnableNoteTools: Bool = false,
        client: @escaping @MainActor () -> (any TriliumClientProtocol)?,
        aiConfig: @escaping @MainActor () -> TriliumAIConfig?,
        onContentSaved: @escaping @MainActor (String) -> Void,
        onFirstTurnCompleted: @escaping @MainActor () async -> Void,
        createChatNote: (@MainActor () async throws -> String)? = nil,
        onTurnFinished: (@MainActor ([ToolCall]) async -> Void)? = nil
    ) {
        self.noteId = noteId
        self.content = content
        self.defaultEnableNoteTools = defaultEnableNoteTools
        self.client = client
        self.aiConfig = aiConfig
        self.onContentSaved = onContentSaved
        self.onFirstTurnCompleted = onFirstTurnCompleted
        self.createChatNote = createChatNote
        self.onTurnFinished = onTurnFinished
    }

    var messages: [StoredMessage] { content.messages }
    var isStreaming: Bool { streamingTurn != nil }

    // MARK: Settings

    var availableModels: [LlmModelInfo] { aiConfig()?.availableModels ?? [] }

    /// The chat's model while it's still offered, else the default for a chat that never picked one. `nil` blocks
    /// sending until a model is picked (desktop's rule for a deselected model).
    var selectedModel: LlmModelInfo? {
        guard let config = aiConfig() else { return nil }
        if let id = content.selectedModel, !id.isEmpty {
            return config.resolveModel(id: id, provider: content.selectedProvider, providerId: content.selectedProviderId)
        }
        return config.defaultModel
    }

    func setModel(_ model: LlmModelInfo) {
        content.selectedModel = model.id
        content.selectedProvider = model.provider
        content.selectedProviderId = model.providerId
        saveSettings()
    }

    var enableWebSearch: Bool {
        get { content.enableWebSearch ?? true }
        set { content.enableWebSearch = newValue; saveSettings() }
    }

    var enableNoteTools: Bool {
        get { content.enableNoteTools ?? defaultEnableNoteTools }
        set { content.enableNoteTools = newValue; saveSettings() }
    }

    var enableExtendedThinking: Bool {
        get { content.enableExtendedThinking ?? false }
        set { content.enableExtendedThinking = newValue; saveSettings() }
    }

    var reasoningEffort: LlmReasoningEffort? {
        get { content.reasoningEffort }
        set { content.reasoningEffort = newValue; saveSettings() }
    }

    /// The web search this chat's next turn would use, with its model and the server's search provider.
    var webSearch: LlmWebSearch {
        let config = aiConfig()
        return .resolve(
            modelProvider: selectedModel?.provider,
            enableWebSearch: enableWebSearch,
            enableNoteTools: enableNoteTools,
            searchProviderId: config?.webSearchProviderId,
            knowsSearchProviders: config?.knowsSearchProviders == true
        )
    }

    var webSearchUnavailable: Bool { webSearch.unavailable != nil }

    /// Which tool calls wait for the user (Trilium 0.107+): the chat's own choice (desktop can make one), else the
    /// server's `llmPermissionMode` option, else that option's default.
    var permissionMode: LlmPermissionMode {
        content.permissionMode ?? aiConfig()?.permissionMode ?? .askBeforeChanges
    }

    // MARK: Turns

    var canSend: Bool { !isStreaming && selectedModel != nil && client() != nil }

    /// Whether a message with this text can go now: a model, no reply running, no upload pending, and text or an
    /// attachment to send.
    func canSend(text: String) -> Bool {
        canSend && uploadingAttachmentCount == 0
            && (!text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || !pendingAttachments.isEmpty)
    }

    func send(text: String) {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard canSend(text: text) else { return }
        // Plain text stays a string, as on desktop; attachments make it blocks, the text first.
        let message: StoredMessage
        if pendingAttachments.isEmpty {
            message = StoredMessage.user(text: trimmed)
        } else {
            let blocks = (trimmed.isEmpty ? [] : [ContentBlock.text(trimmed)]) + pendingAttachments.map(\.block)
            message = StoredMessage(role: .user, content: .blocks(blocks))
            pendingAttachments = []
        }
        run(conversation: content.messages + [message])
    }

    // MARK: Attachments

    /// Uploads a picked image or file to the chat note (making the note first for a chat not started yet) and
    /// adds it to the next message. Images providers can't read are converted to JPEG; unsupported files are
    /// refused with `attachmentError`.
    func attach(data: Data, filename: String, mime: String) async {
        var data = data
        var filename = filename
        var mime = mime.lowercased()
        var thumbnail: Data?
        if mime.hasPrefix("image/") {
            guard let prepared = ChatAttachments.prepareImage(data: data, filename: filename, mime: mime) else {
                attachmentError = Self.unsupportedMessage(filename)
                return
            }
            (data, filename, mime) = prepared
            thumbnail = mime == "image/svg+xml" ? nil : data
        }
        guard let kind = ChatAttachments.kind(filename: filename, mime: mime) else {
            attachmentError = Self.unsupportedMessage(filename)
            return
        }
        guard ChatAttachments.model(selectedModel, accepts: kind) else {
            attachmentError = kind == .image
                ? String(localized: "The selected model can't read images.", comment: "AI chat: the model takes no image attachments")
                : String(localized: "The selected model can't read PDF files.", comment: "AI chat: the model takes no file attachments")
            return
        }
        guard let client = client() else {
            attachmentError = APIError.noToken.localizedDescription
            return
        }
        uploadingAttachmentCount += 1
        defer { uploadingAttachmentCount -= 1 }
        do {
            let chatNoteId = try await chatNoteIdCreatingIfNeeded()
            let attachmentId = try await client.uploadNoteAttachment(noteId: chatNoteId, data: data, filename: filename, contentType: mime)
            // Trilium may recompress an uploaded image, and the server sends the type a message names: name the
            // stored one.
            if kind == .image, let stored = try? await client.getAttachment(attachmentId), stored.mime.hasPrefix("image/") {
                mime = stored.mime
            }
            let block = ChatAttachments.block(kind: kind, attachmentId: attachmentId, mime: mime, title: filename, chatNoteId: chatNoteId)
            pendingAttachments.append(PendingChatAttachment(block: block, kind: kind, title: filename, thumbnail: thumbnail))
        } catch {
            attachmentError = String(
                format: String(localized: "Couldn't attach “%1$@”: %2$@", comment: "AI chat: uploading an attachment failed; %1$@ is the file, %2$@ the reason"),
                locale: .current,
                filename,
                APIError.from(error).localizedDescription
            )
        }
    }

    /// Takes an attachment off the next message (it stays on the chat note, as on desktop).
    func removePendingAttachment(_ id: String) {
        pendingAttachments.removeAll { $0.id == id }
    }

    private static func unsupportedMessage(_ filename: String) -> String {
        String(
            format: String(localized: "Can't attach “%@”: only images, PDF files and text files can be sent.", comment: "AI chat: an attachment of a type the chat doesn't take; %@ is the file"),
            locale: .current,
            filename
        )
    }

    /// Re-runs the failed turn, dropping its error message.
    func retryLast() {
        guard !isStreaming, let conversation = LlmChatTurnReducer.conversationForRetry(content.messages) else { return }
        run(conversation: conversation)
    }

    /// Answers the last user message again, dropping the reply that followed.
    func regenerateLastReply() {
        guard !isStreaming, let conversation = LlmChatTurnReducer.conversationForRegenerate(content.messages) else { return }
        run(conversation: conversation)
    }

    var canRegenerate: Bool { !isStreaming && LlmChatTurnReducer.conversationForRegenerate(content.messages) != nil }

    /// Stops the reply; what arrived is kept, and closing the stream stops the generation server-side.
    func stop() {
        streamTask?.cancel()
    }

    /// Takes a transcript changed elsewhere (sync), while nothing streams.
    func reload(content: LlmChatContent) {
        guard !isStreaming, content != self.content else { return }
        self.content = content
    }

    /// Writes the transcript again after a failed save.
    func retrySave() async {
        await save()
    }

    /// Returns once the running turn, if any, has ended and been saved.
    func waitForTurn() async {
        await streamTask?.value
    }

    // MARK: Tool approvals

    /// Calls of the running turn that wait for the user to allow or deny them (Trilium 0.107+), in the order they came.
    var waitingToolCalls: [ToolCall] {
        streamingTurn.map(LlmChatTurnReducer.waitingToolCalls(in:)) ?? []
    }

    /// Allows or denies a waiting call, as desktop's `answerToolCall` does. Allowed for the chat, the tool runs without
    /// asking from then on: its other waiting calls in this turn, and its calls in later turns (`allowedTools`, saved
    /// with the chat). A call whose answer didn't reach the server keeps waiting, to be answered again.
    func answerToolCall(_ toolCallId: String, approved: Bool, forChat: Bool = false) {
        guard let streamId = currentStreamId, let client = client(), !answeringToolCallIds.contains(toolCallId),
              let turn = pendingTurn,
              let call = LlmChatTurnReducer.waitingToolCalls(in: turn).first(where: { $0.id == toolCallId }) else { return }
        answeringToolCallIds.insert(toolCallId)
        Task {
            defer { answeringToolCallIds.remove(toolCallId) }
            do {
                _ = try await client.answerToolApproval(
                    streamId: streamId, toolCallId: toolCallId, approved: approved, allowForChat: forChat
                )
            } catch {
                toolApprovalError = APIError.from(error).localizedDescription
                return
            }
            toolApprovalError = nil
            let allowsTool = approved && forChat
            if allowsTool, !(content.allowedTools ?? []).contains(call.toolName) {
                content.allowedTools = (content.allowedTools ?? []) + [call.toolName]
                // A turn still running saves it when it ends.
                if !isStreaming { saveSettings() }
            }
            guard currentStreamId == streamId, var turn = pendingTurn else { return }
            LlmChatTurnReducer.settleApproval(toolCallId: toolCallId, approved: approved, in: &turn)
            if allowsTool {
                // The server lets the tool's other waiting calls run now.
                for other in LlmChatTurnReducer.waitingToolCalls(in: turn) where other.toolName == call.toolName {
                    LlmChatTurnReducer.settleApproval(toolCallId: other.id, approved: true, in: &turn)
                }
            }
            pendingTurn = turn
            streamingTurn = turn
        }
    }

    private func run(conversation: [StoredMessage]) {
        guard let model = selectedModel, let client = client() else { return }
        streamTask?.cancel()
        content.messages = conversation
        // A chat that never picked a model keeps the default it answered with, as desktop's state does.
        if content.selectedModel == nil || content.selectedModel?.isEmpty == true {
            content.selectedModel = model.id
            content.selectedProvider = model.provider
            content.selectedProviderId = model.providerId
        }
        let turn = LlmChatStreamingTurn()
        pendingTurn = turn
        streamingTurn = turn
        saveError = nil

        let request = LlmChatTurnReducer.apiMessages(from: conversation)
        let webSearch = webSearch
        var baseConfig = LlmChatRequestConfig(
            provider: model.provider,
            providerId: model.providerId,
            model: model.id,
            enableWebSearch: webSearch.enableWebSearch,
            enableNoteTools: enableNoteTools,
            contextNoteId: contextNoteId,
            allowedTools: content.allowedTools?.isEmpty == false ? content.allowedTools : nil,
            permissionMode: permissionMode,
            webSearchProviderId: webSearch.webSearchProviderId
        )
        if model.hasReasoningLevels {
            baseConfig.reasoningEffort = reasoningEffort
        } else {
            baseConfig.enableExtendedThinking = enableExtendedThinking
        }
        let isFirstTurn = conversation.filter { $0.role == .user }.count == 1
        let streamId = TriliumEntityId.random()
        currentStreamId = streamId

        streamTask = Task { [weak self] in
            if let failure = await self?.ensureChatNote() {
                await self?.finishTurn(stopped: false, transportFailure: failure, isFirstTurn: isFirstTurn)
                return
            }
            var config = baseConfig
            config.chatNoteId = self?.noteId
            let stream = await client.streamLlmChat(streamId: streamId, messages: request, config: config)
            var stopped = false
            var transportFailure: LlmChatStreamFailure?
            do {
                for try await chunk in stream {
                    guard let self else { return }
                    self.apply(chunk)
                    if case .done = chunk { break }
                    if case .error = chunk { break }
                }
            } catch {
                if Task.isCancelled || error is CancellationError {
                    stopped = true
                } else if case .cancelled = APIError.from(error) {
                    stopped = true
                } else {
                    transportFailure = LlmChatStreamFailure(message: "LLM stream interrupted: \(APIError.from(error).localizedDescription)")
                }
            }
            guard let self else { return }
            await self.finishTurn(stopped: stopped, transportFailure: transportFailure, isFirstTurn: isFirstTurn)
        }
    }

    /// Makes the chat note for a chat not started yet; the failure to show when that doesn't work.
    /// The chat note, made now for a chat not started yet.
    private func chatNoteIdCreatingIfNeeded() async throws -> String {
        if let noteId { return noteId }
        guard let createChatNote else { throw APIError.noToken }
        let created = try await createChatNote()
        noteId = created
        return created
    }

    private func ensureChatNote() async -> LlmChatStreamFailure? {
        guard noteId == nil else { return nil }
        do {
            _ = try await chatNoteIdCreatingIfNeeded()
            return nil
        } catch {
            return LlmChatStreamFailure(message: String(
                format: String(localized: "Couldn't start the chat: %@", comment: "AI chat: making the chat note failed; %@ is the reason"),
                locale: .current,
                APIError.from(error).localizedDescription
            ))
        }
    }

    private func apply(_ chunk: LlmStreamChunk) {
        guard var turn = pendingTurn else { return }
        LlmChatTurnReducer.apply(chunk, to: &turn)
        pendingTurn = turn
        schedulePublish()
    }

    /// Shows what arrived, coalescing bursts of chunks into one redraw.
    private func schedulePublish() {
        guard publishTask == nil else { return }
        publishTask = Task { [weak self] in
            try? await Task.sleep(for: .milliseconds(66))
            guard let self, !Task.isCancelled else { return }
            self.publishTask = nil
            if let pending = self.pendingTurn { self.streamingTurn = pending }
        }
    }

    private func finishTurn(stopped: Bool, transportFailure: LlmChatStreamFailure?, isFirstTurn: Bool) async {
        publishTask?.cancel()
        publishTask = nil
        streamTask = nil
        currentStreamId = nil
        toolApprovalError = nil
        guard let turn = pendingTurn else { return }
        pendingTurn = nil
        var messages = content.messages
        let failure = stopped ? nil : (turn.failure ?? transportFailure)
        if let failure {
            messages.append(LlmChatTurnReducer.errorMessage(failure))
        } else {
            messages += LlmChatTurnReducer.finalize(turn)
        }
        content.messages = messages
        streamingTurn = nil
        await save()
        let toolCalls = turn.blocks.compactMap { block -> ToolCall? in
            if case .toolCall(let call) = block { return call }
            return nil
        }
        if !toolCalls.isEmpty {
            await onTurnFinished?(toolCalls)
        }
        if isFirstTurn, failure == nil {
            await onFirstTurnCompleted()
        }
    }

    // MARK: Saving

    private func saveSettings() {
        Task { await save() }
    }

    private func save() async {
        // A chat not started yet has nowhere to be saved; its settings go with the first message.
        guard let noteId else { return }
        guard let client = client() else {
            saveError = APIError.noToken.localizedDescription
            return
        }
        isSaving = true
        defer { isSaving = false }
        do {
            let json = try content.jsonString()
            try await client.updateNoteContent(noteId, content: Data(json.utf8), contentType: "application/json")
            saveError = nil
            onContentSaved(json)
        } catch {
            saveError = APIError.from(error).localizedDescription
        }
    }
}
