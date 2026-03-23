import SwiftUI
import PhotosUI
import UIKit

struct NoteDetailView: View {
    let noteId: String
    let title: String
    var startInEditMode: Bool = false

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
    @State private var protectedDocumentPassword = ""

    private var principalTitleText: String {
        if let n = viewModel?.note {
            return n.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
        }
        return title
    }

    private func uiTitle(for note: NoteItem) -> String {
        note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
    }

    var body: some View {
        Group {
            if let viewModel {
                noteContent(viewModel)
            } else {
                ProgressView()
            }
        }
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .principal) {
                HStack(spacing: 6) {
                    if viewModel?.serverVerified == false && viewModel?.note != nil {
                        Image(systemName: "icloud.slash")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Text(principalTitleText)
                        .font(.headline)
                        .lineLimit(1)
                }
            }
        }
        .task {
            if viewModel == nil {
                let vm = NoteDetailViewModel(noteId: noteId, appState: appState)
                viewModel = vm
                // Cache loads are instant; server refreshes run concurrently
                await vm.load()
                async let contentTask: () = vm.loadContent()
                async let attachTask: () = vm.loadAttachments()
                await vm.loadChildNotes()
                _ = await (contentTask, attachTask)
                if startInEditMode, vm.note != nil {
                    vm.isEditing = true
                }
            }
        }
        .navigationDestination(item: $navigateToNoteId) { linkedNoteId in
            NoteDetailView(noteId: linkedNoteId, title: "")
        }
        .toolbar(viewModel?.isEditing == true ? .hidden : .visible, for: .tabBar)
            .animation(.easeInOut(duration: 0.2), value: viewModel?.isEditing)
            .onChange(of: viewModel?.needsProtectedSession) { _, needs in
                if needs == false { protectedDocumentPassword = "" }
            }
            .onChange(of: appState.protectedSessionActive) { _, _ in
                guard let vm = viewModel else { return }
                Task { await vm.resyncNoteTitlesWithProtectedSession() }
            }
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
                if vm.needsProtectedSession {
                    protectedNoteOverlay(vm, note: note)
                } else if vm.isEditing && note.type == .text {
                    richTextEditingView(vm)
                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
                        .background(Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal]))
                } else {
                    ScrollView {
                        VStack(alignment: .leading, spacing: 0) {
                            draftBanner(vm)
                            breadcrumbsBar(vm)
                            titleSection(vm, note: note)
                            Divider()
                            noteBody(vm, note: note)
                            childNotesSection(vm)

                            if vm.showDetails {
                                attachmentsSection(vm)
                                metadataSection(note)
                            }
                        }
                    }
                    .refreshable { await vm.refresh() }
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
            .alert("Delete Note?", isPresented: $vm.showDeleteConfirm) {
                Button("Cancel", role: .cancel) {}
                Button("Delete", role: .destructive) {
                    Task {
                        if await vm.deleteNote() { dismiss() }
                    }
                }
            } message: {
                Text("This will delete \"\(uiTitle(for: note))\" and all its sub-notes. This cannot be undone easily.")
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
    private func protectedNoteOverlay(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        VStack(spacing: 20) {
            Spacer()

            Image(systemName: "lock.shield")
                .font(.system(size: 56))
                .foregroundStyle(.secondary)

            Text("Protected Note")
                .font(.title2.bold())

            Text("Enter the same document password you use in Trilium for protected notes. It stays active until you sign out or the server ends the session.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 28)

            SecureField("Document password", text: $protectedDocumentPassword)
                .textContentType(.password)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .padding(.horizontal, 32)

            if let err = vm.protectedUnlockError {
                Text(err)
                    .font(.caption)
                    .foregroundStyle(.red)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 24)
            }

            Button {
                let pwd = protectedDocumentPassword
                Task { await vm.unlockProtectedNote(documentPassword: pwd) }
            } label: {
                Group {
                    if vm.isUnlockingProtected {
                        ProgressView()
                            .tint(.white)
                    } else {
                        Text("Unlock")
                            .frame(maxWidth: .infinity)
                    }
                }
                .padding(.vertical, 10)
                .frame(maxWidth: 280)
            }
            .buttonStyle(.borderedProminent)
            .disabled(vm.isUnlockingProtected)

            Spacer()
        }
        .frame(maxWidth: .infinity)
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
            /// Keeps the path aligned with the title text (same inset as the note icon column).
            let titleIconColumnWidth: CGFloat = 24
            let titleIconSpacing: CGFloat = 8

            if vm.editingTitle {
                HStack(alignment: .top, spacing: titleIconSpacing) {
                    Color.clear
                        .frame(width: titleIconColumnWidth)
                        .accessibilityHidden(true)
                    VStack(alignment: .leading, spacing: 4) {
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
                        if let path = vm.noteTreePathCaption {
                            Text(path)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .lineLimit(2)
                                .truncationMode(.middle)
                                .multilineTextAlignment(.leading)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .accessibilityLabel("Path: \(path)")
                        }
                    }
                }
            } else {
                HStack(alignment: .top, spacing: 0) {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack(alignment: .firstTextBaseline, spacing: titleIconSpacing) {
                            Image(systemName: note.resolvedIconName)
                                .font(.title2)
                                .foregroundStyle(.secondary)
                                .frame(width: titleIconColumnWidth, alignment: .center)
                                .accessibilityHidden(true)
                            Text(uiTitle(for: note))
                                .font(.title2.bold())
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        if let path = vm.noteTreePathCaption {
                            Text(path)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .lineLimit(2)
                                .truncationMode(.middle)
                                .multilineTextAlignment(.leading)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, titleIconColumnWidth + titleIconSpacing)
                                .accessibilityLabel("Path: \(path)")
                        }
                    }
                    Spacer(minLength: 0)
                }
                .onTapGesture {
                    vm.editedTitle = note.title
                    vm.editingTitle = true
                }
                .accessibilityLabel("Note title: \(uiTitle(for: note)). Tap to edit.")
            }

            HStack(spacing: 12) {
                // Label(note.type.displayName, systemImage: note.type.iconName)
                //     .font(.caption)
                //     .foregroundStyle(.secondary)

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
                    baseURL: vm.serverBaseURL,
                    onNoteLinkTapped: { linkedNoteId in
                        navigateToNoteId = linkedNoteId
                    },
                    onCheckboxToggled: { index, checked in
                        vm.toggleCheckbox(index: index, checked: checked)
                    }
                )
            }
        case .mermaid:
            if let source = vm.contentString {
                MermaidNoteView(source: source)
            }
        case .code:
            if let code = vm.contentString {
                CodeNoteView(content: code, mime: note.mime)
            }
        case .image:
            if let data = vm.content {
                ImageNoteView(data: data, title: uiTitle(for: note))
            }
        case .file:
            FileNoteView(note: note, attachments: vm.attachments, viewModel: vm)
        case .canvas:
            CanvasNoteView(noteId: note.noteId, attachments: vm.attachments, client: vm.client, excalidrawJSON: vm.contentString)
        case .book:
            BookNoteView(note: note)
        default:
            UnsupportedNoteView(note: note, serverURL: appState.activeProfile?.normalizedBaseURL)
        }
    }

    @ViewBuilder
    private func childNotesSection(_ vm: NoteDetailViewModel) -> some View {
        if !vm.childNotes.isEmpty {
            VStack(alignment: .leading, spacing: 0) {
                Divider()
                Text("Sub-notes")
                    .font(.caption.weight(.medium))
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)
                    .padding(.top, 12)
                    .padding(.bottom, 4)

                ForEach(vm.childNotes) { child in
                    Button {
                        navigateToNoteId = child.noteId
                    } label: {
                        HStack(spacing: 10) {
                            Image(systemName: child.resolvedIconName)
                                .font(.body)
                                .foregroundStyle(.secondary)
                                .frame(width: 22)
                            Text(NoteItem.maskedStoredTitle(child.title, isProtected: child.isProtected, protectedSessionActive: appState.protectedSessionActive))
                                .font(.body)
                                .lineLimit(2)
                                .multilineTextAlignment(.leading)
                            Spacer()
                            if child.childCount > 0 {
                                Text("\(child.childCount)")
                                    .font(.caption2)
                                    .foregroundStyle(.tertiary)
                            }
                            Image(systemName: "chevron.right")
                                .font(.caption2)
                                .foregroundStyle(.tertiary)
                        }
                        .padding(.horizontal)
                        .padding(.vertical, 10)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)

                    if child.id != vm.childNotes.last?.id {
                        Divider().padding(.leading, 48)
                    }
                }
            }
            .padding(.bottom, 8)
        } else if vm.isLoadingChildren {
            HStack {
                Spacer()
                ProgressView()
                    .controlSize(.small)
                Spacer()
            }
            .padding()
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
            .frame(maxWidth: .infinity)
            .background(Color(uiColor: .trinoteEditorCanvas))

            RichTextEditorView(
                initialHTML: vm.editableContent,
                onContentChanged: { html in vm.receiveEditorUpdate(html) },
                onPickImage: { showEditorImageSourceDialog = true },
                imageToInsert: $imageToInsert
            )
            // Fill remaining height so the WKWebView isn’t vertically compressed in a way that clips
            // the HTML toolbar when the keyboard steals space (minHeight: 400 overflowed the layout).
            .frame(maxWidth: .infinity, minHeight: 200, maxHeight: .infinity)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .background(Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal]))
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
                .disabled(vm.needsProtectedSession)
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

                if !note.isProtected || appState.protectedSessionActive {
                    Button {
                        Task {
                            if let dup = await vm.duplicateNote() {
                                navigateToNoteId = dup.noteId
                            }
                        }
                    } label: {
                        Label("Duplicate Note", systemImage: "doc.on.doc")
                    }
                    .disabled(vm.isSaving)
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
