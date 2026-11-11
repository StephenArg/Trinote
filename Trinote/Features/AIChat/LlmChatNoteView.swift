import SwiftUI

/// An AI chat note, laid out like Trilium's: the transcript fills the note area and scrolls on its own, with the
/// reply box pinned under it. The conversation lives in the note view model's `LlmChatSession`, so it survives the
/// note screen rebuilding its body.
struct LlmChatNoteView: View {
    let viewModel: NoteDetailViewModel
    let note: NoteItem
    var onOpenNote: (String) -> Void

    @State private var session: LlmChatSession?
    @State private var emptyText: String?

    var body: some View {
        ChatConversationView(
            session: session,
            isReadOnly: isReadOnly,
            showsInputBar: !viewModel.needsProtectedSession,
            emptyText: emptyText,
            imageProvider: { [weak viewModel] attachmentId in
                await viewModel?.loadImageBytes(routeType: "attachments", entityId: attachmentId)
            },
            onOpenNote: onOpenNote
        )
        .task(id: viewModel.contentString ?? "") {
            syncSession(with: viewModel.contentString)
        }
    }

    /// Desktop: a `#readOnly` chat shows a notice instead of the reply box.
    private var isReadOnly: Bool {
        (note.attributes + note.inheritedAttributes).contains {
            $0.type == .label && $0.name == "readOnly" && $0.value.lowercased() != "false"
        }
    }

    /// Makes the session from the note's body, or hands a body changed elsewhere to it while nothing streams.
    private func syncSession(with body: String?) {
        let parsed = body.flatMap(LlmChatContent.parse)
        // Chats in Trilium's hidden history folder are its sidebar chats, which start with the note tools on.
        let session = viewModel.chatSession(for: parsed ?? LlmChatContent(), defaultEnableNoteTools: note.isInLlmChatFolder)
        if self.session !== session {
            self.session = session
        }
        let isTranscript = parsed != nil || (body ?? "").trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
        emptyText = isTranscript ? nil : String(
            localized: "This note doesn't hold a chat transcript yet.",
            comment: "AI chat: the note's body isn't chat JSON"
        )
    }
}

/// A conversation: the transcript drawn by `chat-viewer.html` filling the space, the reply box pinned under it,
/// the chat options sheet, and the save-error alert. Used by chat notes and by the AI chat sheet of a note.
struct ChatConversationView: View {
    let session: LlmChatSession?
    var isReadOnly = false
    var showsInputBar = true
    /// Replaces the empty-transcript text (a chat note whose body isn't a transcript).
    var emptyText: String?
    /// Shown in the options sheet as the note the chat is about.
    var contextNoteTitle: String?
    var imageProvider: ((String) async -> Data?)?
    var onOpenNote: (String) -> Void

    @Environment(AppState.self) private var appState
    @Environment(\.colorScheme) private var colorScheme
    @Environment(\.openURL) private var openURL
    @AppStorage("colorTheme") private var colorTheme: String = ColorTheme.default.rawValue
    @AppStorage("useCustomTextColor") private var useCustomTextColor: Bool = false
    @AppStorage("customLightTextColor") private var customLightTextColor: String = "#1c1c1e"
    @AppStorage("customDarkTextColor") private var customDarkTextColor: String = "#aaaaaa"

    @State private var transcriptJSON = ChatTranscriptRenderer.transcriptJSON(for: LlmChatContent(), canRetryLast: false)
    @State private var streamingJSON: String?
    @State private var scrollToBottomRequest = 0
    @State private var isAtBottom = true
    @State private var showOptions = false
    @State private var showSaveErrorAlert = false
    @State private var fullScreenImage: FullScreenImagePayload?

    var body: some View {
        VStack(spacing: 0) {
            ZStack(alignment: .bottomTrailing) {
                ChatTranscriptWebView(
                    transcriptJSON: transcriptJSON,
                    streamingJSON: streamingJSON,
                    themeJSON: ChatTranscriptRenderer.themeJSON(colors: themeColors, scheme: colorScheme),
                    scrollToBottomRequest: scrollToBottomRequest,
                    imageProvider: imageProvider,
                    onEvent: handle
                )
                if !isAtBottom {
                    jumpToLatestButton
                }
            }
            if showsInputBar {
                Divider()
                bottomBar
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .fullScreenCover(item: $fullScreenImage) { payload in
            FullScreenImageViewer(image: payload.image, title: payload.title) {
                fullScreenImage = nil
            }
        }
        .task {
            await appState.refreshAIConfig()
        }
        .onAppear { renderTranscript() }
        .onChange(of: session?.content) { _, _ in renderTranscript() }
        .onChange(of: emptyText) { _, _ in renderTranscript() }
        .onChange(of: session.map(ObjectIdentifier.init)) { _, _ in
            renderTranscript()
            renderStreaming(session?.streamingTurn)
            scrollToBottomRequest += 1
        }
        .onChange(of: session?.streamingTurn) { _, turn in renderStreaming(turn) }
        .onChange(of: session?.saveError) { _, error in showSaveErrorAlert = error != nil }
        .sheet(isPresented: $showOptions) {
            if let session {
                ChatOptionsSheet(session: session, contextNoteTitle: contextNoteTitle)
            }
        }
        .alert(
            String(localized: "Couldn't save the chat.", comment: "AI chat: writing the transcript to the server failed"),
            isPresented: $showSaveErrorAlert,
            presenting: session?.saveError
        ) { _ in
            Button(String(localized: "Try Again", comment: "AI chat: write the transcript again")) {
                Task { await session?.retrySave() }
            }
            Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
        } message: { error in
            Text(error)
        }
    }

    // MARK: Layout

    private var jumpToLatestButton: some View {
        Button {
            scrollToBottomRequest += 1
        } label: {
            Image(systemName: "arrow.down")
                .font(.body.weight(.semibold))
                .padding(10)
                .background(.regularMaterial, in: Circle())
        }
        .buttonStyle(.plain)
        .padding(16)
        .accessibilityLabel(String(localized: "Jump to latest", comment: "AI chat: scrolls the transcript to its end"))
        .transition(.opacity)
    }

    @ViewBuilder
    private var bottomBar: some View {
        if isReadOnly {
            notice(String(localized: "This chat is read-only.", comment: "AI chat: the note carries #readOnly"), systemImage: "lock")
        } else if let text = appState.aiAvailability.noticeText {
            notice(text, systemImage: appState.aiAvailability.noticeSystemImage)
        } else if let session {
            VStack(spacing: 0) {
                if let call = session.waitingToolCalls.first {
                    ToolApprovalBar(
                        call: call,
                        isAnswering: session.answeringToolCallIds.contains(call.id),
                        error: session.toolApprovalError
                    ) { approved, forChat in
                        session.answerToolCall(call.id, approved: approved, forChat: forChat)
                    }
                    Divider()
                }
                if let status = statusText(session) {
                    Text(status)
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal, 16)
                        .padding(.top, 6)
                }
                ChatInputBar(
                    session: session,
                    hint: sendHint(session),
                    onOpenOptions: { showOptions = true },
                    onSent: { scrollToBottomRequest += 1 }
                )
            }
        } else {
            ProgressView()
                .padding(12)
        }
    }

    private func notice(_ text: String, systemImage: String) -> some View {
        Label(text, systemImage: systemImage)
            .font(.footnote)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(.bar)
    }

    /// Why Send stays off, when the reason isn't the empty draft.
    private func sendHint(_ session: LlmChatSession) -> String? {
        guard session.selectedModel == nil else { return nil }
        if appState.aiConfig == nil {
            return String(localized: "Loading AI settings…", comment: "AI chat: the server's AI options haven't been read yet")
        }
        if session.availableModels.isEmpty {
            return String(localized: "No models are selected for your providers. Pick them in Trilium under Options → AI.", comment: "AI chat options: the providers list no models")
        }
        return String(localized: "The model this chat used is no longer offered. Pick another to continue.", comment: "AI chat options: footer when the saved model is gone")
    }

    private func statusText(_ session: LlmChatSession) -> String? {
        guard let status = session.streamingTurn?.status, !status.isEmpty else { return nil }
        if status == "starting_agent" {
            return String(localized: "Starting the agent…", comment: "AI chat: a subscription agent's CLI is being started")
        }
        return status
    }

    private var themeColors: HTMLThemeColors {
        let theme = ColorTheme(rawValue: colorTheme) ?? .default
        if useCustomTextColor {
            return HTMLThemeColors(lightText: customLightTextColor, darkText: customDarkTextColor, lightLink: theme.lightLinkColor, darkLink: theme.darkLinkColor)
        }
        return HTMLThemeColors(lightText: theme.lightTextColor, darkText: theme.darkTextColor, lightLink: theme.lightLinkColor, darkLink: theme.darkLinkColor)
    }

    // MARK: Rendering

    private func renderTranscript() {
        let content = session?.content ?? LlmChatContent()
        let canRetry = session != nil && appState.aiAvailability.canSend && !isReadOnly
        let json = ChatTranscriptRenderer.transcriptJSON(for: content, canRetryLast: canRetry, emptyText: emptyText)
        // The page follows the end itself while the reader is at the bottom; no forced scroll here.
        guard json != transcriptJSON else { return }
        transcriptJSON = json
    }

    private func renderStreaming(_ turn: LlmChatStreamingTurn?) {
        guard let turn else {
            streamingJSON = nil
            return
        }
        streamingJSON = ChatTranscriptRenderer.streamingJSON(status: nil, thinking: turn.thinking, blocks: turn.blocks)
    }

    private func handle(_ event: ChatTranscriptEvent) {
        switch event {
        case .openNote(let noteId):
            onOpenNote(noteId)
        case .openURL(let url):
            openURL(url)
        case .openImage(let attachmentId, let title):
            Task { @MainActor in
                guard let data = await imageProvider?(attachmentId), let image = OriginalImage(data: data) else { return }
                fullScreenImage = FullScreenImagePayload(image: image, title: title)
            }
        case .atBottom(let atBottom):
            withAnimation(.easeInOut(duration: 0.15)) { isAtBottom = atBottom }
        case .retry:
            guard appState.aiAvailability.canSend, !isReadOnly else { return }
            session?.retryLast()
            scrollToBottomRequest += 1
        case .regenerate:
            guard appState.aiAvailability.canSend, !isReadOnly else { return }
            session?.regenerateLastReply()
            scrollToBottomRequest += 1
        }
    }
}
