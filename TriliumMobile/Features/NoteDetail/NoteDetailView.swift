import SwiftUI
import PhotosUI
import UIKit

struct NoteDetailView: View {
    let noteId: String
    let title: String

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var viewModel: NoteDetailViewModel?
    @State private var navigateToNoteId: String?

    // Inline image insertion state
    @State private var showEditorImageSourceDialog = false
    @State private var showEditorImagePicker = false
    @State private var showEditorCamera = false
    @State private var editorImageItem: PhotosPickerItem?
    @State private var imageToInsert: String?

    var body: some View {
        Group {
            if let viewModel {
                noteContent(viewModel)
            } else {
                ProgressView()
            }
        }
        .navigationTitle(viewModel?.note?.title ?? title)
        .navigationBarTitleDisplayMode(.inline)
        .task {
            if viewModel == nil {
                let vm = NoteDetailViewModel(noteId: noteId, appState: appState)
                viewModel = vm
                await vm.load()
                await vm.loadContent()
                await vm.loadAttachments()
            }
        }
        .navigationDestination(item: $navigateToNoteId) { linkedNoteId in
            NoteDetailView(noteId: linkedNoteId, title: "")
        }
        .toolbar(viewModel?.isEditing == true ? .hidden : .visible, for: .tabBar)
        .animation(.easeInOut(duration: 0.2), value: viewModel?.isEditing)
    }

    @ViewBuilder
    private func noteContent(_ vm: NoteDetailViewModel) -> some View {
        @Bindable var vm = vm
        if vm.isLoading && vm.note == nil {
            ProgressView("Loading note…")
        } else if let error = vm.error, vm.note == nil {
            ContentUnavailableView {
                Label("Error", systemImage: "exclamationmark.triangle")
            } description: {
                Text(error)
            } actions: {
                Button("Retry") { Task { await vm.load() } }
                    .buttonStyle(.bordered)
            }
        } else if let note = vm.note {
            VStack(spacing: 0) {
                if vm.isEditing && note.type == .text {
                    richTextEditingView(vm)
                } else {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 0) {
                            offlineBanner(vm)
                            draftBanner(vm)
                            breadcrumbsBar(vm)
                            titleSection(vm, note: note)
                            Divider()
                            noteBody(vm, note: note)

                            if vm.showDetails {
                                attachmentsSection(vm)
                                metadataSection(note)
                            }
                        }
                    }
                }
            }
            .toolbar { noteToolbar(vm, note: note) }
            .alert("Error", isPresented: $vm.showSaveError) {
                Button("OK") { vm.showSaveError = false }
            } message: {
                Text(vm.saveError ?? "An unknown error occurred.")
            }
            .sheet(isPresented: $vm.showCreateChild) {
                CreateChildNoteSheet(viewModel: vm)
            }
            .confirmationDialog("Delete Note?", isPresented: $vm.showDeleteConfirm) {
                Button("Delete", role: .destructive) {
                    Task {
                        if await vm.deleteNote() { dismiss() }
                    }
                }
            } message: {
                Text("This will delete \"\(note.title)\" and all its sub-notes. This cannot be undone easily.")
            }
            .confirmationDialog("Unsaved Draft", isPresented: $vm.showDiscardDraft) {
                Button("Restore Draft") { vm.restoreDraft() }
                Button("Discard Draft", role: .destructive) { vm.discardDraft() }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("You have an unsaved draft for this note. Would you like to restore it?")
            }
        }
    }

    @ViewBuilder
    private func offlineBanner(_ vm: NoteDetailViewModel) -> some View {
        if vm.isFromCache {
            HStack(spacing: 6) {
                Image(systemName: "icloud.slash")
                    .font(.caption)
                Text("Showing cached version")
                    .font(.caption)
            }
            .foregroundStyle(.orange)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 6)
            .background(.orange.opacity(0.1))
        }
    }

    @ViewBuilder
    private func draftBanner(_ vm: NoteDetailViewModel) -> some View {
        if vm.hasDraft && !vm.isEditing {
            HStack(spacing: 8) {
                Image(systemName: "doc.badge.clock")
                    .font(.caption)
                Text("Unsaved draft available")
                    .font(.caption.weight(.medium))
                Spacer()
                Button("Restore") { vm.restoreDraft() }
                    .font(.caption)
                    .buttonStyle(.bordered)
                    .controlSize(.mini)
                Button("Discard") { vm.discardDraft() }
                    .font(.caption)
                    .buttonStyle(.bordered)
                    .controlSize(.mini)
                    .tint(.red)
            }
            .foregroundStyle(.blue)
            .padding(.horizontal)
            .padding(.vertical, 8)
            .background(.blue.opacity(0.08))
        }
    }

    @ViewBuilder
    private func breadcrumbsBar(_ vm: NoteDetailViewModel) -> some View {
        if !vm.breadcrumbs.isEmpty {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 4) {
                    ForEach(vm.breadcrumbs) { crumb in
                        if crumb.noteId != vm.noteId {
                            Text(crumb.title)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                            Image(systemName: "chevron.right")
                                .font(.caption2)
                                .foregroundStyle(.quaternary)
                        } else {
                            Text(crumb.title)
                                .font(.caption.weight(.medium))
                                .foregroundStyle(.primary)
                        }
                    }
                }
                .padding(.horizontal)
                .padding(.vertical, 6)
            }
            .background(.bar)
        }
    }

    @ViewBuilder
    private func titleSection(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        @Bindable var vm = vm
        VStack(alignment: .leading, spacing: 4) {
            if vm.editingTitle {
                HStack {
                    TextField("Title", text: $vm.editedTitle)
                        .font(.title2.bold())
                        .textFieldStyle(.roundedBorder)
                    Button("Save") {
                        Task { await vm.renameNote() }
                    }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.small)
                    .disabled(vm.isSaving)
                    Button("Cancel") { vm.editingTitle = false }
                        .buttonStyle(.bordered)
                        .controlSize(.small)
                }
            } else {
                HStack {
                    Image(systemName: note.type.iconName)
                        .foregroundStyle(.secondary)
                        .accessibilityHidden(true)
                    Text(note.title)
                        .font(.title2.bold())
                    Spacer()
                }
                .onTapGesture {
                    vm.editedTitle = note.title
                    vm.editingTitle = true
                }
                .accessibilityLabel("Note title: \(note.title). Tap to edit.")
            }

            HStack(spacing: 12) {
                Label(note.type.displayName, systemImage: note.type.iconName)
                    .font(.caption)
                    .foregroundStyle(.secondary)

                if note.parentNoteIds.count > 1 {
                    Label("Cloned (\(note.parentNoteIds.count) parents)", systemImage: "arrow.triangle.branch")
                        .font(.caption)
                        .foregroundStyle(.orange)
                }

                if note.isProtected {
                    Label("Protected", systemImage: "lock.fill")
                        .font(.caption)
                        .foregroundStyle(.yellow)
                }
            }
        }
        .padding()
    }

    @ViewBuilder
    private func noteBody(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        if vm.isLoadingContent {
            ProgressView("Loading content…")
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
        } else if vm.isEditing && note.type != .text {
            codeEditingView(vm)
        } else {
            readingView(vm, note: note)
        }
    }

    @ViewBuilder
    private func readingView(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        switch note.type {
        case .text:
            if let html = vm.contentString {
                HTMLNoteView(
                    html: html,
                    baseURL: vm.serverBaseURL
                ) { linkedNoteId in
                    navigateToNoteId = linkedNoteId
                }
            }
        case .code, .mermaid:
            if let code = vm.contentString {
                CodeNoteView(content: code, mime: note.mime)
            }
        case .image:
            if let data = vm.content {
                ImageNoteView(data: data, title: note.title)
            }
        case .file:
            FileNoteView(note: note, attachments: vm.attachments, viewModel: vm)
        case .book:
            BookNoteView(note: note)
        default:
            UnsupportedNoteView(note: note, serverURL: appState.activeProfile?.normalizedBaseURL)
        }
    }

    @ViewBuilder
    private func richTextEditingView(_ vm: NoteDetailViewModel) -> some View {
        VStack(spacing: 0) {
            HStack {
                Spacer()
                if vm.isSaving {
                    ProgressView()
                        .controlSize(.small)
                }
                Button("Save") { Task { await vm.saveContent() } }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.small)
                    .disabled(vm.isSaving)
                Button("Cancel") { vm.cancelEditing() }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
            }
            .padding(.horizontal)
            .padding(.vertical, 6)

            RichTextEditorView(
                initialHTML: vm.editableContent,
                onContentChanged: { html in vm.editableContent = html },
                onPickImage: { showEditorImageSourceDialog = true },
                imageToInsert: $imageToInsert
            )
            .frame(minHeight: 400)
        }
        .confirmationDialog("Add Image", isPresented: $showEditorImageSourceDialog) {
            Button("Photo Library") { showEditorImagePicker = true }
            if UIImagePickerController.isSourceTypeAvailable(.camera) {
                Button("Camera") { showEditorCamera = true }
            }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("Choose a source for the image")
        }
        .photosPicker(isPresented: $showEditorImagePicker, selection: $editorImageItem, matching: .images)
        .onChange(of: editorImageItem) { _, item in
            guard let item else { return }
            Task { await handleEditorImagePick(item) }
        }
        .fullScreenCover(isPresented: $showEditorCamera) {
            CameraPickerView(imageToInsert: $imageToInsert) { showEditorCamera = false }
        }
    }

    private func handleEditorImagePick(_ item: PhotosPickerItem) async {
        defer { editorImageItem = nil }
        guard let data = try? await item.loadTransferable(type: Data.self) else { return }

        let mime = item.supportedContentTypes.first?.preferredMIMEType ?? "image/jpeg"

        // Compress to JPEG if it's not already a small image
        let imageData: Data
        let imageMime: String
        if let uiImage = UIImage(data: data) {
            imageData = uiImage.jpegData(compressionQuality: 0.8) ?? data
            imageMime = "image/jpeg"
        } else {
            imageData = data
            imageMime = mime
        }

        let base64 = imageData.base64EncodedString()
        imageToInsert = "data:\(imageMime);base64,\(base64)"
    }

    @ViewBuilder
    private func codeEditingView(_ vm: NoteDetailViewModel) -> some View {
        @Bindable var vm = vm
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text("Source")
                    .font(.caption.weight(.medium))
                    .foregroundStyle(.secondary)
                Spacer()
                if vm.isSaving {
                    ProgressView()
                        .controlSize(.small)
                }
                Button("Save") { Task { await vm.saveContent() } }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.small)
                    .disabled(vm.isSaving)
                Button("Cancel") { vm.cancelEditing() }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
            }
            .padding(.horizontal)
            .padding(.top, 8)

            TextEditor(text: $vm.editableContent)
                .font(.system(.body, design: .monospaced))
                .frame(minHeight: 300)
                .padding(.horizontal, 8)
                .scrollContentBackground(.hidden)
                .background(Color(.systemGroupedBackground))
        }
    }

    @ViewBuilder
    private func attachmentsSection(_ vm: NoteDetailViewModel) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Divider()
            HStack {
                Text("Attachments")
                    .font(.headline)
                Spacer()
                AttachmentUploadButton(noteId: vm.noteId, viewModel: vm)
            }
            .padding(.horizontal)
            .padding(.top, 8)

            if vm.attachments.isEmpty {
                Text("No attachments")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)
            } else {
                ForEach(vm.attachments) { attachment in
                    AttachmentRow(attachment: attachment, viewModel: vm)
                }
            }
        }
    }

    private func metadataSection(_ note: NoteItem) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Divider()
            Group {
                LabeledContent("Note ID", value: note.noteId)
                LabeledContent("Type", value: note.type.displayName)
                LabeledContent("MIME", value: note.mime)
                if !note.dateCreated.isEmpty {
                    LabeledContent("Created", value: note.dateCreated)
                }
                if !note.dateModified.isEmpty {
                    LabeledContent("Modified", value: note.dateModified)
                }
            }
            .font(.caption)

            if !note.attributes.isEmpty {
                Text("Attributes")
                    .font(.caption.weight(.medium))
                    .padding(.top, 4)
                ForEach(note.attributes) { attr in
                    HStack {
                        Image(systemName: attr.type == .label ? "tag" : "arrow.right")
                            .font(.caption2)
                        Text(attr.name)
                            .font(.caption.weight(.medium))
                        Text(attr.value)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
        }
        .padding()
    }

    @ToolbarContentBuilder
    private func noteToolbar(_ vm: NoteDetailViewModel, note: NoteItem) -> some ToolbarContent {
        ToolbarItemGroup(placement: .topBarTrailing) {
            if note.type.isEditable {
                Button {
                    if vm.isEditing {
                        vm.cancelEditing()
                    } else {
                        vm.startEditing()
                    }
                } label: {
                    Image(systemName: vm.isEditing ? "eye" : "pencil")
                }
                .accessibilityLabel(vm.isEditing ? "Switch to read mode" : "Edit note")
            }

            Menu {
                Button {
                    vm.showCreateChild = true
                } label: {
                    Label("New Child Note", systemImage: "plus")
                }

                Button {
                    vm.editedTitle = note.title
                    vm.editingTitle = true
                } label: {
                    Label("Rename", systemImage: "pencil")
                }

                Button {
                    withAnimation { vm.showDetails.toggle() }
                } label: {
                    Label(vm.showDetails ? "Hide Details" : "Note Details", systemImage: vm.showDetails ? "info.circle.fill" : "info.circle")
                }

                Divider()

                if let url = openInWebURL(note) {
                    ShareLink(item: url) {
                        Label("Share Link", systemImage: "square.and.arrow.up")
                    }
                }

                Divider()

                Button(role: .destructive) {
                    vm.showDeleteConfirm = true
                } label: {
                    Label("Delete Note", systemImage: "trash")
                }
            } label: {
                Image(systemName: "ellipsis.circle")
            }
            .accessibilityLabel("Note actions")
        }
    }

    private func openInWebURL(_ note: NoteItem) -> URL? {
        guard let base = appState.activeProfile?.normalizedBaseURL else { return nil }
        return URL(string: "\(base)/#/\(note.noteId)")
    }
}

// MARK: - Create Child Sheet

struct CreateChildNoteSheet: View {
    @Bindable var viewModel: NoteDetailViewModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                TextField("Note Title", text: $viewModel.newNoteTitle)
                    .textInputAutocapitalization(.sentences)

                Picker("Type", selection: $viewModel.newNoteType) {
                    Text("Text").tag(NoteType.text)
                    Text("Code").tag(NoteType.code)
                }
            }
            .navigationTitle("New Note")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Create") {
                        Task { _ = await viewModel.createChildNote() }
                    }
                    .disabled(viewModel.newNoteTitle.trimmingCharacters(in: .whitespaces).isEmpty || viewModel.isSaving)
                }
            }
        }
        .presentationDetents([.medium])
    }
}

// MARK: - Camera Picker

struct CameraPickerView: UIViewControllerRepresentable {
    @Binding var imageToInsert: String?
    var onDismiss: () -> Void

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(imageToInsert: $imageToInsert, onDismiss: onDismiss)
    }

    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        @Binding var imageToInsert: String?
        var onDismiss: () -> Void

        init(imageToInsert: Binding<String?>, onDismiss: @escaping () -> Void) {
            _imageToInsert = imageToInsert
            self.onDismiss = onDismiss
        }

        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
            if let image = info[.originalImage] as? UIImage,
               let data = image.jpegData(compressionQuality: 0.8) {
                imageToInsert = "data:image/jpeg;base64,\(data.base64EncodedString())"
            }
            onDismiss()
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            onDismiss()
        }
    }
}

// Make String Identifiable for navigationDestination
extension String: @retroactive Identifiable {
    public var id: String { self }
}
