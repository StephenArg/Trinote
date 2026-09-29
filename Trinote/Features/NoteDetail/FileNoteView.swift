import SwiftUI
import PDFKit
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
    /// Parsed body of a PDF file note; nil for other files or a PDF that can't be shown inline.
    @State private var pdfDocument: PDFDocument?
    @State private var pdfPageIndex = 0
    @State private var pdfWidth: CGFloat = 0
    /// Visible height of the note `ScrollView`, so a tall page never fills more than the screen.
    @State private var viewportHeight: CGFloat = 0

    private var isOfficeFile: Bool {
        OfficeMimeTypes.isOfficeMimeType(note.mime)
    }

    private var hasFileBytes: Bool {
        !(viewModel.content?.isEmpty ?? true)
    }

    /// Trilium's `pdfHistory.json` is viewer state, not something the user attached.
    private var visibleAttachments: [AttachmentItem] {
        attachments.filter { !$0.isPDFViewerState }
    }

    var body: some View {
        VStack(spacing: 16) {
            if isOfficeFile {
                officeHeader
                officePreviewSection
            } else if let pdfDocument {
                pdfSection(pdfDocument)
            } else {
                legacyHeader
            }

            if !visibleAttachments.isEmpty {
                ForEach(visibleAttachments) { attachment in
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
        .padding(.vertical, isOfficeFile || pdfDocument != nil ? 16 : 40)
        .task(id: viewModel.officePreviewLoadToken) {
            guard isOfficeFile else { return }
            await viewModel.loadFileNoteOfficePreviewIfNeeded()
        }
        .onChange(of: viewModel.content, initial: true) { _, data in
            pdfDocument = Self.inlinePDFDocument(mime: note.mime, data: data)
            pdfPageIndex = 0
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

    private func pdfSection(_ document: PDFDocument) -> some View {
        VStack(spacing: 8) {
            PDFPagedView(document: document, pageIndex: $pdfPageIndex)
                .frame(maxWidth: .infinity)
                .frame(height: pdfHeight(for: document))
                .onGeometryChange(for: CGFloat.self) { $0.size.width } action: { pdfWidth = $0 }
                .clipShape(RoundedRectangle(cornerRadius: 8))
                .padding(.horizontal)

            HStack(spacing: 12) {
                if document.pageCount > 1 {
                    Text(String(localized: "Page \(pdfPageIndex + 1) of \(document.pageCount)", comment: "PDF file note page indicator"))
                        .font(.caption)
                        .monospacedDigit()
                        .foregroundStyle(.secondary)
                }
                Spacer()
                Button {
                    previewItem = viewModel.prepareFileNoteBodyPreviewItem()
                } label: {
                    Label(String(localized: "Full Screen", comment: "Open PDF file note full screen"), systemImage: "arrow.up.left.and.arrow.down.right")
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
                Button {
                    shareFileNote()
                } label: {
                    Label(String(localized: "Share", comment: "Share file note"), systemImage: "square.and.arrow.up")
                }
                .buttonStyle(.bordered)
                .controlSize(.small)
            }
            .padding(.horizontal)
        }
        .background {
            EnclosingScrollViewportHeightReader { height in
                if abs(height - viewportHeight) > 0.5 {
                    viewportHeight = height
                }
            }
        }
    }

    /// One page tall at the available width, capped so the whole page stays on screen.
    private func pdfHeight(for document: PDFDocument) -> CGFloat {
        let width = pdfWidth > 1 ? pdfWidth : 360
        let pageHeight = width / Self.firstPageAspectRatio(document)
        let cap = viewportHeight > 1 ? viewportHeight * 0.8 : 600
        return min(max(pageHeight, 240), cap)
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

            if hasFileBytes {
                HStack(spacing: 12) {
                    Button {
                        previewItem = viewModel.prepareFileNoteBodyPreviewItem()
                    } label: {
                        Label(String(localized: "Quick Look", comment: "Open file note in Quick Look"), systemImage: "eye")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                    Button {
                        shareFileNote()
                    } label: {
                        Label(String(localized: "Share", comment: "Share file note"), systemImage: "square.and.arrow.up")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
            } else if !viewModel.isOnline {
                Text(String(localized: "This file isn’t saved on this device. Connect to your server to open it.", comment: "File note body not cached while offline"))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }
        }
        .padding(.horizontal)
    }

    /// PDF bodies (by MIME type or `%PDF-` header, for files uploaded as `application/octet-stream`)
    /// that PDFKit can page through. Locked PDFs fall back to Quick Look, which can ask for the password.
    static func inlinePDFDocument(mime: String, data: Data?) -> PDFDocument? {
        guard let data, !data.isEmpty else { return nil }
        let isPDF = OfficeMimeTypes.normalizedMIME(mime) == "application/pdf"
            || data.starts(with: Data("%PDF-".utf8))
        guard isPDF, let document = PDFDocument(data: data), !document.isLocked, document.pageCount > 0 else {
            return nil
        }
        return document
    }

    /// Width ÷ height of the first page as displayed (crop box, after the page's rotation).
    static func firstPageAspectRatio(_ document: PDFDocument) -> CGFloat {
        let a4 = 1 / 2.squareRoot()
        guard let page = document.page(at: 0) else { return a4 }
        let box = page.bounds(for: .cropBox)
        guard box.width > 1, box.height > 1 else { return a4 }
        return abs(page.rotation) % 180 == 90 ? box.height / box.width : box.width / box.height
    }

    private func shareFileNote() {
        let filename = OfficeMimeTypes.filename(fromTitle: note.title, mime: note.mime)
        guard let data = viewModel.content,
              let url = try? AttachmentPreviewFileStore.write(data: data, filename: filename) else { return }
        shareURL = url
        showShareSheet = true
    }
}

/// Inline PDF for file notes: one page at a time, swiped sideways, so it never fights the note's
/// vertical `ScrollView`. Continuous reading is the Full Screen viewer (`AttachmentPreviewView`).
private struct PDFPagedView: UIViewRepresentable {
    let document: PDFDocument
    @Binding var pageIndex: Int

    func makeUIView(context: Context) -> FitToPagePDFView {
        let view = FitToPagePDFView()
        view.displayMode = .singlePage
        view.displayDirection = .horizontal
        view.usePageViewController(true, withViewOptions: nil)
        view.backgroundColor = .secondarySystemGroupedBackground
        view.document = document
        view.autoScales = true
        context.coordinator.observe(view)
        return view
    }

    func updateUIView(_ view: FitToPagePDFView, context: Context) {
        context.coordinator.pageIndex = $pageIndex
        if view.document !== document {
            view.document = document
            view.fitPageToBounds()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(pageIndex: $pageIndex)
    }

    @MainActor
    final class Coordinator: NSObject {
        var pageIndex: Binding<Int>

        init(pageIndex: Binding<Int>) {
            self.pageIndex = pageIndex
        }

        func observe(_ view: PDFView) {
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(pageChanged(_:)),
                name: .PDFViewPageChanged,
                object: view
            )
        }

        @objc private func pageChanged(_ notification: Notification) {
            guard let view = notification.object as? PDFView,
                  let page = view.currentPage,
                  let index = view.document?.index(for: page) else { return }
            // PDFKit posts this during layout; defer so SwiftUI state isn't changed mid-update.
            Task { @MainActor in
                self.pageIndex.wrappedValue = index
            }
        }
    }
}

/// PDFKit's page view controller ignores `autoScales`, leaving pages small; clamping the minimum zoom
/// to the fitted scale on every size change makes each page fill the view. Pinch-zoom still works above it.
private final class FitToPagePDFView: PDFView {
    private var fittedSize: CGSize = .zero

    override func layoutSubviews() {
        super.layoutSubviews()
        guard bounds.size != fittedSize, bounds.width > 1, bounds.height > 1 else { return }
        fittedSize = bounds.size
        fitPageToBounds()
    }

    func fitPageToBounds() {
        guard document != nil else { return }
        let fit = scaleFactorForSizeToFit
        guard fit > 0 else { return }
        maxScaleFactor = fit * 4
        minScaleFactor = fit
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
