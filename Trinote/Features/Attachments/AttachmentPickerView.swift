import SwiftUI
import PhotosUI
import UniformTypeIdentifiers

struct AttachmentUploadButton: View {
    let noteId: String
    let viewModel: NoteDetailViewModel

    @State private var showPhotoPicker = false
    @State private var showFilePicker = false
    @State private var selectedPhoto: PhotosPickerItem?
    @State private var isUploading = false
    @State private var uploadError: String?
    @State private var pendingUpload: PendingAttachmentUpload?
    @State private var pendingBasename = ""

    private var showUploadError: Binding<Bool> {
        Binding(
            get: { uploadError != nil },
            set: { if !$0 { uploadError = nil } }
        )
    }

    var body: some View {
        Menu {
            Button {
                showPhotoPicker = true
            } label: {
                Label("Photo Library", systemImage: "photo.on.rectangle")
            }

            Button {
                showFilePicker = true
            } label: {
                Label("Choose File", systemImage: "folder")
            }
        } label: {
            if isUploading {
                ProgressView()
                    .controlSize(.small)
            } else {
                Label("Upload", systemImage: "paperclip.badge.ellipsis")
            }
        }
        .disabled(isUploading)
        .accessibilityLabel("Upload attachment")
        .photosPicker(isPresented: $showPhotoPicker, selection: $selectedPhoto, matching: .any(of: [.images, .videos]))
        .onChange(of: selectedPhoto) { _, newValue in
            if let item = newValue {
                Task { await handlePhotoPick(item) }
            }
        }
        .fileImporter(isPresented: $showFilePicker, allowedContentTypes: [.data], allowsMultipleSelection: false) { result in
            Task { await handleFilePick(result) }
        }
        .attachmentUploadNamePrompt(pending: $pendingUpload, basename: $pendingBasename) { item, basename in
            Task { await uploadPending(item, basename: basename) }
        }
        .alert("Upload Error", isPresented: showUploadError) {
            Button("OK") { uploadError = nil }
        } message: {
            Text(uploadError ?? "An error occurred during upload.")
        }
    }

    private func presentNamePrompt(data: Data, mime: String, filename: String) {
        let pending = PendingAttachmentUpload(data: data, mime: mime, filename: filename)
        pendingBasename = pending.suggestedBasename
        pendingUpload = pending
    }

    private func uploadPending(_ item: PendingAttachmentUpload, basename: String) async {
        isUploading = true
        defer { isUploading = false }
        let filename = item.resolvedFilename(basename: basename)
        let attachment = await viewModel.uploadAttachment(data: item.data, filename: filename, mime: item.mime)
        if attachment == nil {
            uploadError = viewModel.saveError
        }
    }

    private func handlePhotoPick(_ item: PhotosPickerItem) async {
        defer { selectedPhoto = nil }

        do {
            if let data = try await item.loadTransferable(type: Data.self) {
                let mime = item.supportedContentTypes.first?.preferredMIMEType ?? "image/jpeg"
                let ext = item.supportedContentTypes.first?.preferredFilenameExtension ?? "jpg"
                presentNamePrompt(data: data, mime: mime, filename: "attachment.\(ext)")
            }
        } catch {
            uploadError = error.localizedDescription
        }
    }

    private func handleFilePick(_ result: Result<[URL], Error>) async {
        do {
            let urls = try result.get()
            guard let url = urls.first else { return }

            guard url.startAccessingSecurityScopedResource() else {
                uploadError = "Cannot access the selected file."
                return
            }
            defer { url.stopAccessingSecurityScopedResource() }

            let data = try Data(contentsOf: url)
            let mime = UTType(filenameExtension: url.pathExtension)?.preferredMIMEType ?? "application/octet-stream"
            let filename = url.lastPathComponent.isEmpty ? "attachment" : url.lastPathComponent
            presentNamePrompt(data: data, mime: mime, filename: filename)
        } catch {
            uploadError = error.localizedDescription
        }
    }
}
