import PhotosUI
import SwiftUI
import UniformTypeIdentifiers

/// The reply box under a chat: the message with Send or Stop beside it, and under it the model and a status button
/// for the chat's options (web search, note tools, thinking). The status button shows which options are on and
/// opens the Chat Options sheet, where each one is a named switch with what it does.
struct ChatInputBar: View {
    @Bindable var session: LlmChatSession
    /// Why sending isn't possible yet (settings still loading, no model offered); tapping it opens the options.
    var hint: String?
    var onOpenOptions: () -> Void
    var onSent: () -> Void

    @State private var draft = ""
    @FocusState private var isFocused: Bool
    @State private var showPhotoPicker = false
    @State private var pickedPhotos: [PhotosPickerItem] = []
    @State private var showFilePicker = false
    @State private var showCamera = false

    private var canSendDraft: Bool {
        session.canSend(text: draft)
    }

    private var cameraIsAvailable: Bool { UIImagePickerController.isSourceTypeAvailable(.camera) }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let hint {
                Button(action: onOpenOptions) {
                    Label(hint, systemImage: "info.circle")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.leading)
                }
                .buttonStyle(.plain)
            }

            if !session.pendingAttachments.isEmpty || session.uploadingAttachmentCount > 0 {
                pendingAttachmentsRow
            }

            HStack(alignment: .bottom, spacing: 8) {
                attachMenu
                    .padding(.bottom, 3)

                TextField(
                    String(localized: "Message", comment: "AI chat: reply box placeholder"),
                    text: $draft,
                    axis: .vertical
                )
                .lineLimit(1...6)
                .textFieldStyle(.plain)
                .padding(.horizontal, 12)
                .padding(.vertical, 9)
                .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 18, style: .continuous))
                .focused($isFocused)
                .onKeyPress(keys: [.return]) { press in
                    // ⌘↩ sends from a hardware keyboard; ↩ alone starts a new line.
                    guard press.modifiers.contains(.command) else { return .ignored }
                    send()
                    return .handled
                }

                sendOrStopButton
                    .padding(.bottom, 3)
            }

            HStack(spacing: 8) {
                modelMenu
                optionsStatusButton
                Spacer(minLength: 0)
            }
        }
        .padding(.horizontal, 12)
        .padding(.top, 8)
        .padding(.bottom, 8)
        .background(.bar)
        .photosPicker(isPresented: $showPhotoPicker, selection: $pickedPhotos, maxSelectionCount: 5, matching: .images)
        .onChange(of: pickedPhotos) { _, items in
            guard !items.isEmpty else { return }
            pickedPhotos = []
            Task { await attachPhotos(items) }
        }
        .fileImporter(
            isPresented: $showFilePicker,
            allowedContentTypes: [.image, .pdf, .text, .sourceCode, .json, .xml, .commaSeparatedText, .data],
            allowsMultipleSelection: true
        ) { result in
            Task { await attachFiles(result) }
        }
        .fullScreenCover(isPresented: $showCamera) {
            ChatCameraPicker(
                onImage: { data in Task { await session.attach(data: data, filename: "Photo.jpg", mime: "image/jpeg") } },
                onDismiss: {
                    showCamera = false
                    EditorCameraCapture.endPortraitSession()
                }
            )
            .ignoresSafeArea()
        }
        .alert(
            String(localized: "Couldn't Attach", comment: "AI chat: an attachment wasn't added"),
            isPresented: Binding(get: { session.attachmentError != nil }, set: { if !$0 { session.attachmentError = nil } }),
            presenting: session.attachmentError
        ) { _ in
            Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
        } message: { message in
            Text(message)
        }
    }

    // MARK: Attachments

    /// Photo Library, Take Photo, Choose File: images, PDFs and text files, as Trilium's chat takes.
    private var attachMenu: some View {
        Menu {
            Button {
                showPhotoPicker = true
            } label: {
                Label(String(localized: "Photo Library", comment: "Attachment source"), systemImage: "photo.on.rectangle")
            }
            if cameraIsAvailable {
                Button {
                    EditorCameraCapture.preparePortraitSession { showCamera = true }
                } label: {
                    Label(String(localized: "Take Photo", comment: "Attachment source: the camera"), systemImage: "camera")
                }
            }
            Button {
                showFilePicker = true
            } label: {
                Label(String(localized: "Choose File", comment: "Attachment source: the Files app"), systemImage: "folder")
            }
        } label: {
            Image(systemName: "plus.circle.fill")
                .font(.system(size: 30))
                .symbolRenderingMode(.hierarchical)
                .foregroundStyle(.secondary)
        }
        .accessibilityLabel(String(localized: "Attach", comment: "AI chat: add an image or file to the message"))
    }

    /// What goes out with the next message: image thumbnails and file names, each with a remove button.
    private var pendingAttachmentsRow: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(session.pendingAttachments) { attachment in
                    attachmentChip(attachment)
                }
                ForEach(0..<session.uploadingAttachmentCount, id: \.self) { _ in
                    ProgressView()
                        .frame(width: 52, height: 52)
                        .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                        .accessibilityLabel(String(localized: "Uploading…", comment: "AI chat: an attachment is uploading"))
                }
            }
            .padding(.top, 6)
            .padding(.trailing, 6)
        }
    }

    @ViewBuilder
    private func attachmentChip(_ attachment: PendingChatAttachment) -> some View {
        ZStack(alignment: .topTrailing) {
            if let data = attachment.thumbnail, let image = UIImage(data: data) {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFill()
                    .frame(width: 52, height: 52)
                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                    .accessibilityLabel(attachment.title)
            } else {
                Label(attachment.title, systemImage: attachment.kind == .file ? "doc.richtext" : "doc.text")
                    .font(.footnote)
                    .lineLimit(1)
                    .padding(.horizontal, 10)
                    .frame(maxWidth: 180, minHeight: 52)
                    .background(Color(.secondarySystemBackground), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            }
            Button {
                session.removePendingAttachment(attachment.id)
            } label: {
                Image(systemName: "xmark.circle.fill")
                    .font(.system(size: 18))
                    .symbolRenderingMode(.palette)
                    .foregroundStyle(.white, Color.black.opacity(0.6))
            }
            .buttonStyle(.plain)
            .offset(x: 6, y: -6)
            .accessibilityLabel(String(localized: "Remove", comment: "AI chat options: stop using the note as context"))
        }
    }

    private func attachPhotos(_ items: [PhotosPickerItem]) async {
        for (index, item) in items.enumerated() {
            guard let data = try? await item.loadTransferable(type: Data.self) else {
                session.attachmentError = String(localized: "The photo couldn't be loaded.", comment: "AI chat: a picked photo couldn't be read")
                continue
            }
            let type = item.supportedContentTypes.first { $0.conforms(to: .image) } ?? .jpeg
            let ext = type.preferredFilenameExtension ?? "jpg"
            let name = items.count > 1 ? "Photo \(index + 1).\(ext)" : "Photo.\(ext)"
            await session.attach(data: data, filename: name, mime: type.preferredMIMEType ?? "image/jpeg")
        }
    }

    private func attachFiles(_ result: Result<[URL], Error>) async {
        guard case .success(let urls) = result else {
            if case .failure(let error) = result { session.attachmentError = error.localizedDescription }
            return
        }
        for url in urls {
            let scoped = url.startAccessingSecurityScopedResource()
            defer { if scoped { url.stopAccessingSecurityScopedResource() } }
            guard let data = try? Data(contentsOf: url) else {
                session.attachmentError = String(
                    format: String(localized: "“%@” couldn't be read.", comment: "AI chat: a picked file couldn't be read; %@ is its name"),
                    locale: .current,
                    url.lastPathComponent
                )
                continue
            }
            let name = url.lastPathComponent.isEmpty ? "file" : url.lastPathComponent
            await session.attach(data: data, filename: name, mime: ChatAttachments.mime(forFilename: name))
        }
    }

    // MARK: Controls

    /// Desktop's model dropdown: the selected models of each provider, under the provider's name.
    private var modelMenu: some View {
        Menu {
            ForEach(modelGroups, id: \.name) { group in
                Section(group.name) {
                    ForEach(Array(group.models.enumerated()), id: \.offset) { _, model in
                        Button {
                            session.setModel(model)
                        } label: {
                            if isSelected(model) {
                                Label(model.name, systemImage: "checkmark")
                            } else {
                                Text(model.name)
                            }
                        }
                    }
                }
            }
        } label: {
            HStack(spacing: 4) {
                Image(systemName: "cpu")
                Text(session.selectedModel?.name ?? String(localized: "No model selected", comment: "AI chat options: the chat's model is no longer offered"))
                    .lineLimit(1)
                Image(systemName: "chevron.up.chevron.down")
                    .font(.caption2)
            }
            .font(.footnote.weight(.medium))
            .padding(.horizontal, 10)
            .frame(height: 30)
            .background(Color(.secondarySystemBackground), in: Capsule())
            .frame(maxWidth: 200, alignment: .leading)
        }
        .disabled(session.isStreaming || session.availableModels.isEmpty)
        .accessibilityLabel(String(localized: "Model", comment: "AI chat options: model picker"))
    }

    /// One button showing the chat's options at a glance: an icon is coloured while its option is on and faded
    /// while off. Tapping it opens Chat Options, where each is a named switch.
    private var optionsStatusButton: some View {
        Button(action: onOpenOptions) {
            HStack(spacing: 10) {
                statusIcon("globe", isOn: webSearchIsOn)
                statusIcon("doc.text.magnifyingglass", isOn: session.enableNoteTools)
                statusIcon("brain", isOn: thinkingIsOn)
                Image(systemName: "chevron.up")
                    .font(.caption2.weight(.semibold))
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 12)
            .frame(height: 30)
            .background(Color(.secondarySystemBackground), in: Capsule())
            .contentShape(Capsule())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(String(localized: "Chat options", comment: "AI chat: opens the model and tools sheet"))
        .accessibilityValue(optionsSummary)
    }

    private func statusIcon(_ systemImage: String, isOn: Bool) -> some View {
        Image(systemName: systemImage)
            .font(.footnote.weight(.semibold))
            .foregroundStyle(isOn ? Color.accentColor : Color.secondary.opacity(0.45))
    }

    private var webSearchIsOn: Bool { session.enableWebSearch && !session.webSearchUnavailable }

    /// A model with reasoning levels thinks unless it's set to None; others think while Extended thinking is on.
    private var thinkingIsOn: Bool {
        if let model = session.selectedModel, model.hasReasoningLevels {
            return session.reasoningEffort != .disabled
        }
        return session.enableExtendedThinking
    }

    /// For VoiceOver: which options are on.
    private var optionsSummary: String {
        let on = String(localized: "On", comment: "PIN status")
        let off = String(localized: "Off", comment: "PIN status")
        return [
            "\(ChatToolDescriptions.webSearchTitle): \(webSearchIsOn ? on : off)",
            "\(ChatToolDescriptions.noteToolsTitle): \(session.enableNoteTools ? on : off)",
            "\(ChatToolDescriptions.thinkingTitle): \(thinkingIsOn ? on : off)"
        ].joined(separator: ", ")
    }

    @ViewBuilder
    private var sendOrStopButton: some View {
        if session.isStreaming {
            Button {
                session.stop()
            } label: {
                Image(systemName: "stop.circle.fill")
                    .font(.system(size: 30))
                    .symbolRenderingMode(.hierarchical)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(String(localized: "Stop", comment: "AI chat: stop the reply"))
        } else {
            Button(action: send) {
                Image(systemName: "arrow.up.circle.fill")
                    .font(.system(size: 30))
                    .symbolRenderingMode(.hierarchical)
            }
            .buttonStyle(.plain)
            .disabled(!canSendDraft)
            .accessibilityLabel(String(localized: "Send", comment: "AI chat: send the message"))
        }
    }

    // MARK: Helpers

    private var modelGroups: [(name: String, models: [LlmModelInfo])] {
        var order: [String] = []
        var groups: [String: [LlmModelInfo]] = [:]
        for model in session.availableModels {
            let key = model.providerName ?? model.provider ?? ""
            if groups[key] == nil { order.append(key) }
            groups[key, default: []].append(model)
        }
        return order.map { ($0, groups[$0] ?? []) }
    }

    private func isSelected(_ model: LlmModelInfo) -> Bool {
        guard let selected = session.selectedModel else { return false }
        return selected.id == model.id && selected.providerId == model.providerId
    }

    private func send() {
        guard canSendDraft else { return }
        let text = draft
        draft = ""
        session.send(text: text)
        onSent()
    }
}
