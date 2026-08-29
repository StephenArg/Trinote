import SwiftUI
import UniformTypeIdentifiers

struct FileNoteView: View {
    let note: NoteItem
    let attachments: [AttachmentItem]
    let viewModel: NoteDetailViewModel
    let onOpenNote: (String, String) -> Void

    @Environment(AppState.self) private var appState
    @State private var previewItem: AttachmentPreviewItem?
    @State private var showShareSheet = false
    @State private var shareURL: URL?

    private var isOfficeFile: Bool {
        OfficeMimeTypes.isOfficeMimeType(note.mime)
    }

    var body: some View {
        VStack(spacing: 16) {
            if isOfficeFile {
                officeHeader
                officePreviewSection
            } else {
                legacyHeader
            }

            if !attachments.isEmpty {
                ForEach(attachments) { attachment in
                    AttachmentRow(attachment: attachment, viewModel: viewModel, onOpenNote: onOpenNote)
                }
            }

            if !isOfficeFile, note.mime.hasPrefix("text/"), let content = viewModel.contentString {
                ScrollView(.horizontal) {
                    Text(content)
                        .font(.system(.caption, design: .monospaced))
                        .textSelection(.enabled)
                        .padding()
                }
                .background(Color(.secondarySystemGroupedBackground))
                .clipShape(RoundedRectangle(cornerRadius: 8))
                .padding(.horizontal)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, isOfficeFile ? 16 : 40)
        .task(id: viewModel.officePreviewLoadToken) {
            guard isOfficeFile else { return }
            await viewModel.loadFileNoteOfficePreviewIfNeeded()
        }
        .fullScreenCover(item: $previewItem) { item in
            AttachmentPreviewView(item: item) {
                previewItem = nil
            }
        }
        .sheet(isPresented: $showShareSheet) {
            if let shareURL {
                ShareSheet(items: [shareURL])
            }
        }
    }

    private var officeHeader: some View {
        VStack(spacing: 8) {
            Text(note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive))
                .font(.headline)
                .multilineTextAlignment(.center)
            Text(note.mime)
                .font(.caption)
                .foregroundStyle(.secondary)
            HStack(spacing: 12) {
                if viewModel.content != nil {
                    Button {
                        shareFileNote()
                    } label: {
                        Label(String(localized: "Share", comment: "Share file note"), systemImage: "square.and.arrow.up")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
            }
        }
        .padding(.horizontal)
    }

    @ViewBuilder
    private var officePreviewSection: some View {
        switch viewModel.fileNoteOfficePreview {
        case .idle, .loading:
            ProgressView(String(localized: "Rendering document…", comment: "Office file note preview loading"))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 32)
        case .ready(let html):
            OfficeHTMLPreviewView(html: html)
        case .failed:
            VStack(spacing: 12) {
                Text(String(localized: "This document could not be previewed. You can still open or share the original file.", comment: "Office file note preview failed"))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
                HStack(spacing: 12) {
                    Button {
                        previewItem = viewModel.prepareFileNoteBodyPreviewItem()
                    } label: {
                        Label(String(localized: "Quick Look", comment: "Open file note in Quick Look"), systemImage: "eye")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                    .disabled(viewModel.content == nil)
                    Button {
                        shareFileNote()
                    } label: {
                        Label(String(localized: "Share", comment: "Share file note"), systemImage: "square.and.arrow.up")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                    .disabled(viewModel.content == nil)
                }
            }
            .padding(.vertical, 8)
        }
    }

    private var legacyHeader: some View {
        VStack(spacing: 16) {
            Image(systemName: "doc.fill")
                .font(.system(size: 48))
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)

            Text(note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive))
                .font(.headline)

            Text(note.mime)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
    }

    private func shareFileNote() {
        let filename = OfficeMimeTypes.filename(fromTitle: note.title, mime: note.mime)
        guard let data = viewModel.content,
              let url = try? AttachmentPreviewFileStore.write(data: data, filename: filename) else { return }
        shareURL = url
        showShareSheet = true
    }
}

/// Thin inline notice for Trilium Collection notes (table, Kanban, grid, etc. are not rendered natively).
struct CollectionNoteLimitedSupportBanner: View {
    let noteId: String
    let serverURL: String?

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: "info.circle.fill")
                .font(.body)
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 6) {
                Text(
                    String(
                        localized: "Collection views are not fully supported in Trinote. Open this note in the official Trilium app for table, Kanban, calendar, and other layouts.",
                        comment: "Banner explaining limited Collection support; sub-notes list appears below"
                    )
                )
                .font(.caption)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)

                if let serverURL, let url = URL(string: "\(serverURL)/#/\(noteId)") {
                    Link(destination: url) {
                        Label(String(localized: "Open in Web Browser", comment: "Opens note in Trilium web UI"), systemImage: "safari")
                    }
                    .font(.caption.weight(.medium))
                }
            }

            Spacer(minLength: 0)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemGroupedBackground))
    }
}

struct BookNoteView: View {
    let note: NoteItem

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "book.fill")
                .font(.system(size: 36))
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)

            Text("Book Note")
                .font(.headline)

            Text("Contains \(note.childNoteIds.count) child notes")
                .font(.subheadline)
                .foregroundStyle(.secondary)

            Text("Open child notes from the tree to read their content.")
                .font(.caption)
                .foregroundStyle(.tertiary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
    }
}

struct UnsupportedNoteView: View {
    let note: NoteItem
    let serverURL: String?

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "questionmark.square.dashed")
                .font(.system(size: 36))
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)

            Text("\(note.type.displayName) Note")
                .font(.headline)

            Text("This note type is not fully supported in the mobile app yet.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)

            if let serverURL, let url = URL(string: "\(serverURL)/#/\(note.noteId)") {
                Link(destination: url) {
                    Label("Open in Web Browser", systemImage: "safari")
                }
                .buttonStyle(.bordered)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
        .padding(.horizontal)
    }
}

struct AttachmentRow: View {
    let attachment: AttachmentItem
    let viewModel: NoteDetailViewModel
    let onOpenNote: (String, String) -> Void

    @State private var isLoading = false
    @State private var showShareSheet = false
    @State private var shareURL: URL?
    @State private var previewItem: AttachmentPreviewItem?
    @State private var showRename = false
    @State private var renameBasename = ""
    @State private var showOCRSheet = false
    @State private var showDeleteConfirm = false
    @State private var showReplacePicker = false

    private var lockedExtension: String {
        AttachmentFilename.split(attachment.title).ext
    }

    var body: some View {
        Button {
            Task { await openPreview() }
        } label: {
            HStack(spacing: 12) {
                Image(systemName: attachment.isImage ? "photo" : "paperclip")
                    .foregroundStyle(.secondary)
                    .frame(width: 24)
                    .accessibilityHidden(true)

                VStack(alignment: .leading, spacing: 2) {
                    Text(attachment.title)
                        .font(.subheadline)
                        .lineLimit(1)
                        .foregroundStyle(.primary)
                    HStack(spacing: 8) {
                        Text(attachment.mime)
                        Text(attachment.humanReadableSize)
                    }
                    .font(.caption)
                    .foregroundStyle(.secondary)
                }

                Spacer()

                if isLoading {
                    ProgressView()
                        .controlSize(.small)
                } else {
                    Image(systemName: "chevron.right")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.tertiary)
                        .accessibilityHidden(true)
                }
            }
            .padding(.horizontal)
            .padding(.vertical, 8)
            .background(Color(.secondarySystemGroupedBackground))
            .clipShape(RoundedRectangle(cornerRadius: 8))
            .padding(.horizontal)
        }
        .buttonStyle(.plain)
        .disabled(isLoading)
        .accessibilityLabel(attachment.title)
        .accessibilityHint(String(localized: "Opens attachment preview", comment: "Attachment row tap hint"))
        .contextMenu {
            Button {
                renameBasename = AttachmentFilename.split(attachment.title).basename
                showRename = true
            } label: {
                Label(String(localized: "Rename", comment: "Rename attachment"), systemImage: "pencil")
            }
            Button {
                showReplacePicker = true
            } label: {
                Label(String(localized: "Replace", comment: "Replace attachment file"), systemImage: "arrow.triangle.2.circlepath")
            }
            Button {
                showOCRSheet = true
            } label: {
                Label(String(localized: "View extracted text", comment: "View attachment OCR"), systemImage: "text.viewfinder")
            }
            Button {
                Task { await convertToNote() }
            } label: {
                Label(String(localized: "Convert to note", comment: "Convert attachment to note"), systemImage: "doc.badge.plus")
            }
            Button(role: .destructive) {
                showDeleteConfirm = true
            } label: {
                Label(String(localized: "Delete", comment: "Delete attachment"), systemImage: "trash")
            }
            Button {
                Task { await shareAttachment() }
            } label: {
                Label(String(localized: "Share", comment: "Share attachment"), systemImage: "square.and.arrow.up")
            }
        }
        .fullScreenCover(item: $previewItem) { item in
            AttachmentPreviewView(item: item) {
                previewItem = nil
            }
        }
        .sheet(isPresented: $showShareSheet) {
            if let shareURL {
                ShareSheet(items: [shareURL])
            }
        }
        .sheet(isPresented: $showOCRSheet) {
            AttachmentOCRTextSheet(attachment: attachment, viewModel: viewModel) {
                showOCRSheet = false
            }
        }
        .fileImporter(
            isPresented: $showReplacePicker,
            allowedContentTypes: [.item],
            allowsMultipleSelection: false
        ) { result in
            Task { await handleReplacePick(result) }
        }
        .alert(
            String(localized: "Rename Attachment", comment: "Attachment rename title"),
            isPresented: $showRename
        ) {
            TextField(
                String(localized: "Filename", comment: "Attachment rename basename field"),
                text: $renameBasename
            )
            Button(String(localized: "Cancel", comment: "Cancel"), role: .cancel) {}
            Button(String(localized: "Rename", comment: "Rename attachment confirm")) {
                applyRename()
            }
            .disabled(renameBasename.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        } message: {
            if !lockedExtension.isEmpty {
                Text(String(localized: "Extension: .\(lockedExtension)", comment: "Attachment rename extension hint"))
            }
        }
        .confirmationDialog(
            String(localized: "Delete Attachment", comment: "Attachment delete confirm title"),
            isPresented: $showDeleteConfirm,
            titleVisibility: .visible
        ) {
            Button(String(localized: "Delete", comment: "Confirm delete attachment"), role: .destructive) {
                Task { await viewModel.deleteAttachment(attachment) }
            }
            Button(String(localized: "Cancel", comment: "Cancel"), role: .cancel) {}
        } message: {
            Text(String(localized: "Delete “\(attachment.title)”? This cannot be undone.", comment: "Attachment delete confirm message"))
        }
    }

    private func openPreview() async {
        isLoading = true
        defer { isLoading = false }
        previewItem = await viewModel.prepareAttachmentPreview(for: attachment)
    }

    private func shareAttachment() async {
        isLoading = true
        defer { isLoading = false }
        guard let (data, _) = await viewModel.downloadAttachment(attachment),
              let url = try? AttachmentPreviewFileStore.write(data: data, filename: attachment.title) else { return }
        shareURL = url
        showShareSheet = true
    }

    private func applyRename() {
        let trimmed = renameBasename.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        let newTitle = AttachmentFilename.join(basename: trimmed, ext: lockedExtension)
        Task { await viewModel.renameAttachmentTitle(attachmentId: attachment.attachmentId, title: newTitle) }
    }

    private func convertToNote() async {
        isLoading = true
        defer { isLoading = false }
        if let result = await viewModel.convertAttachmentToNote(attachment) {
            onOpenNote(result.noteId, result.title)
        }
    }

    private func handleReplacePick(_ result: Result<[URL], Error>) async {
        do {
            let urls = try result.get()
            guard let url = urls.first else { return }
            guard url.startAccessingSecurityScopedResource() else {
                viewModel.presentAttachmentError(
                    String(localized: "Cannot access the selected file.", comment: "Attachment replace file access")
                )
                return
            }
            defer { url.stopAccessingSecurityScopedResource() }

            let data = try Data(contentsOf: url)
            let filename = url.lastPathComponent.isEmpty ? "attachment" : url.lastPathComponent
            let mime = UTType(filenameExtension: url.pathExtension)?.preferredMIMEType ?? attachment.mime
            await viewModel.replaceAttachment(attachment, data: data, filename: filename, mime: mime)
        } catch is CancellationError {
            return
        } catch {
            let nsError = error as NSError
            if nsError.domain == NSCocoaErrorDomain && nsError.code == NSUserCancelledError { return }
            viewModel.presentAttachmentError(error.localizedDescription)
        }
    }
}
