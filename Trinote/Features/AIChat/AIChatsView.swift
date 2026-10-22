import SwiftUI

/// Trilium's AI chats: the recent ones still in its hidden history folder (desktop's sidebar history), New Chat,
/// and Keep or Delete on each row. A chat opens as its note.
struct AIChatsView: View {
    @Environment(AppState.self) private var appState
    @Environment(\.noteWorkspace) private var noteWorkspace
    @State private var chats: [RecentLlmChat] = []
    @State private var isLoading = false
    @State private var isCreating = false
    @State private var navigateToNote: NoteNavItem?
    @State private var chatToDelete: RecentLlmChat?
    @State private var errorMessage: String?

    private var availability: AIFeatureAvailability { appState.aiAvailability }

    var body: some View {
        Group {
            if chats.isEmpty {
                ContentUnavailableView {
                    Label(String(localized: "No Chats Yet", comment: "AI Chats screen: empty state title"), systemImage: "sparkles")
                } description: {
                    Text(availability.noticeText ?? String(localized: "Ask the AI about your notes, or anything else.", comment: "AI Chats screen: empty state hint"))
                } actions: {
                    if availability.canSend {
                        Button(String(localized: "New Chat", comment: "AI Chats screen: start a chat")) { newChat() }
                            .buttonStyle(.borderedProminent)
                            .disabled(isCreating)
                    }
                }
            } else {
                List {
                    if let notice = availability.noticeText {
                        Section {
                            Label(notice, systemImage: availability.noticeSystemImage)
                                .font(.footnote)
                                .foregroundStyle(.secondary)
                        }
                    }
                    Section {
                        ForEach(chats) { chat in
                            Button {
                                open(noteId: chat.noteId, title: chat.title)
                            } label: {
                                row(chat)
                            }
                            .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                                // No destructive role: that role animates the row away at once, before the alert
                                // has asked. The tint keeps it red.
                                Button {
                                    chatToDelete = chat
                                } label: {
                                    Label(String(localized: "Delete", comment: "Delete"), systemImage: "trash")
                                }
                                .tint(.red)
                                .disabled(!appState.isOnline)
                                Button {
                                    keep(chat)
                                } label: {
                                    Label(String(localized: "Keep", comment: "AI Chats screen: move the chat into the notes"), systemImage: "tray.and.arrow.down")
                                }
                                .tint(.blue)
                                .disabled(!appState.isOnline)
                            }
                        }
                    } footer: {
                        Text(String(
                            localized: "Chats stay in Trilium's hidden AI Chat History folder until you keep one.",
                            comment: "AI Chats screen: where chats live"
                        ))
                    }
                }
            }
        }
        .overlay {
            if isLoading, chats.isEmpty {
                ProgressView()
            }
        }
        .navigationTitle(String(localized: "AI Chat", comment: "Note type"))
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button {
                    newChat()
                } label: {
                    Label(String(localized: "New Chat", comment: "AI Chats screen: start a chat"), systemImage: "square.and.pencil")
                }
                .disabled(!availability.canSend || isCreating)
            }
        }
        .task {
            await appState.refreshAIConfig()
            await load()
        }
        .refreshable {
            await appState.refreshAIConfig()
            await load()
        }
        .navigationDestination(item: $navigateToNote) { item in
            NoteDetailView(noteId: item.noteId, title: item.title)
        }
        // A centered alert rather than a confirmation dialog, which iOS anchors to the row.
        .alert(
            String(localized: "Delete Chat?", comment: "AI Chats screen: delete confirmation title"),
            isPresented: Binding(get: { chatToDelete != nil }, set: { if !$0 { chatToDelete = nil } }),
            presenting: chatToDelete
        ) { chat in
            Button(String(localized: "Delete", comment: "Delete"), role: .destructive) { delete(chat) }
            Button(String(localized: "Cancel", comment: "New note sheet"), role: .cancel) {}
        } message: { _ in
            Text(String(localized: "This chat will be moved to Trilium's trash.", comment: "AI Chats screen: delete confirmation message"))
        }
        .alert(
            String(localized: "Error", comment: "AI chat: a failed turn"),
            isPresented: Binding(get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } }),
            presenting: errorMessage
        ) { _ in
            Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
        } message: { message in
            Text(message)
        }
        .onReceive(NotificationCenter.default.publisher(for: .trinoteWillSwitchServerProfile)) { _ in
            navigateToNote = nil
            chats = []
        }
    }

    private func row(_ chat: RecentLlmChat) -> some View {
        HStack(spacing: 12) {
            Image(systemName: "bubble.left.and.text.bubble.right")
                .foregroundStyle(Color.accentColor)
                .frame(width: 28)
            VStack(alignment: .leading, spacing: 2) {
                Text(chat.title)
                    .lineLimit(2)
                    .foregroundStyle(.primary)
                if let date = chat.dateModified.triliumDate() {
                    Text(date.formatted(.relative(presentation: .named)))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            Spacer(minLength: 0)
        }
        .contentShape(Rectangle())
    }

    // MARK: Actions

    private func load() async {
        guard let client = appState.client, appState.isOnline, TriliumServerCompatibility.supportsLlmChat(appState.serverAppInfo) else { return }
        isLoading = true
        defer { isLoading = false }
        do {
            chats = try await client.recentLlmChats(limit: 50)
        } catch {
            Log.api.warning("Could not list the AI chats: \(error)")
        }
    }

    private func open(noteId: String, title: String) {
        if let noteWorkspace {
            noteWorkspace.open(NoteRoute(noteId: noteId, title: title))
        } else {
            navigateToNote = NoteNavItem(noteId: noteId, title: title)
        }
    }

    private func newChat() {
        guard let client = appState.client, !isCreating else { return }
        isCreating = true
        Task {
            defer { isCreating = false }
            do {
                let created = try await client.createLlmChat()
                open(noteId: created.noteId, title: created.title)
                await load()
            } catch {
                errorMessage = APIError.from(error).localizedDescription
            }
        }
    }

    private func keep(_ chat: RecentLlmChat) {
        guard let client = appState.client else { return }
        Task {
            do {
                let result = try await client.keepLlmChat(noteId: chat.noteId)
                guard result.success else {
                    errorMessage = result.message ?? String(localized: "Trilium didn't keep the chat.", comment: "Keep Chat: the server refused without a reason")
                    return
                }
                chats.removeAll { $0.noteId == chat.noteId }
                NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
            } catch {
                errorMessage = APIError.from(error).localizedDescription
            }
        }
    }

    private func delete(_ chat: RecentLlmChat) {
        guard let client = appState.client else { return }
        Task {
            do {
                try await client.deleteNote(chat.noteId, eraseNotes: false)
                chats.removeAll { $0.noteId == chat.noteId }
            } catch {
                errorMessage = APIError.from(error).localizedDescription
            }
        }
    }
}
