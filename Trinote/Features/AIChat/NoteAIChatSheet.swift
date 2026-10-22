import SwiftUI

/// "Chat with AI" on a text or code note, like Trilium's sidebar chat: a chat about the note on screen, with the
/// note tools on so the model can read and edit it. The chat note is made on the first message, in Trilium's hidden
/// AI Chat History folder; the note reloads after the model changes it.
struct NoteAIChatSheet: View {
    let viewModel: NoteDetailViewModel
    let note: NoteItem
    /// A note link tapped in a reply, or Open Chat as Note.
    var onOpenNote: (String) -> Void

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var keepError: String?
    @State private var detent: PresentationDetent = .large

    var body: some View {
        let session = viewModel.noteAIChat()
        NavigationStack {
            ChatConversationView(
                session: session,
                contextNoteTitle: note.title,
                // Images attached to messages: the chat note's attachments, read from the server.
                imageProvider: { [weak appState] attachmentId in
                    try? await appState?.client?.getAttachmentContent(attachmentId)
                },
                onOpenNote: open
            )
            .navigationTitle(String(localized: "AI Chat", comment: "Note type"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Done", comment: "Close sheet")) { dismiss() }
                }
                ToolbarItem(placement: .primaryAction) {
                    Menu {
                        Button {
                            viewModel.startNewNoteAIChat()
                        } label: {
                            Label(String(localized: "New Chat", comment: "AI Chats screen: start a chat"), systemImage: "square.and.pencil")
                        }
                        .disabled(session.isStreaming || session.messages.isEmpty)

                        if let chatNoteId = session.noteId {
                            Button {
                                open(chatNoteId)
                            } label: {
                                Label(String(localized: "Open Chat as Note", comment: "AI chat sheet: open the chat's own note"), systemImage: "arrow.up.forward.square")
                            }
                            Button {
                                Task { await keep(chatNoteId) }
                            } label: {
                                Label(String(localized: "Keep Chat", comment: "Note overflow menu: move an AI chat out of Trilium's hidden history folder into the notes"), systemImage: "tray.and.arrow.down")
                            }
                            .disabled(session.isStreaming || viewModel.noteAIChatIsKept || !appState.isOnline)
                        }
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                    .accessibilityLabel(String(localized: "Chat options", comment: "AI chat: opens the model and tools sheet"))
                }
            }
            .safeAreaInset(edge: .top, spacing: 0) {
                Label(
                    String(
                        format: String(localized: "About “%@”. The AI can read and edit this note.", comment: "AI chat sheet: which note the chat is about; %@ is its title"),
                        locale: .current,
                        note.title
                    ),
                    systemImage: "doc.text"
                )
                .font(.footnote)
                .foregroundStyle(.secondary)
                .lineLimit(2)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(.bar)
            }
        }
        .presentationDetents([.medium, .large], selection: $detent)
        // At half height the note stays usable behind the chat, so its edits can be watched.
        .presentationBackgroundInteraction(.enabled(upThrough: .medium))
        .presentationDragIndicator(.visible)
        .alert(
            String(localized: "Error", comment: "AI chat: a failed turn"),
            isPresented: Binding(get: { keepError != nil }, set: { if !$0 { keepError = nil } }),
            presenting: keepError
        ) { _ in
            Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
        } message: { message in
            Text(message)
        }
    }

    private func open(_ noteId: String) {
        dismiss()
        onOpenNote(noteId)
    }

    private func keep(_ chatNoteId: String) async {
        guard let client = appState.client else { return }
        do {
            let result = try await client.keepLlmChat(noteId: chatNoteId)
            if result.success {
                viewModel.noteAIChatIsKept = true
                NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
            } else {
                keepError = result.message ?? String(localized: "Trilium didn't keep the chat.", comment: "Keep Chat: the server refused without a reason")
            }
        } catch {
            keepError = APIError.from(error).localizedDescription
        }
    }
}
