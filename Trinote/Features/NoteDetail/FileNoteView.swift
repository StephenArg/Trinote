import SwiftUI

struct FileNoteView: View {
    let note: NoteItem
    let attachments: [AttachmentItem]
    let viewModel: NoteDetailViewModel

    @Environment(AppState.self) private var appState

    var body: some View {
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

            if !attachments.isEmpty {
                ForEach(attachments) { attachment in
                    AttachmentRow(attachment: attachment, viewModel: viewModel)
                }
            }

            if note.mime.hasPrefix("text/") {
                if let content = viewModel.contentString {
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
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
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

    @State private var isDownloading = false
    @State private var showShareSheet = false
    @State private var downloadedData: Data?

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: attachment.isImage ? "photo" : "paperclip")
                .foregroundStyle(.secondary)
                .frame(width: 24)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                Text(attachment.title)
                    .font(.subheadline)
                    .lineLimit(1)
                HStack(spacing: 8) {
                    Text(attachment.mime)
                    Text(attachment.humanReadableSize)
                }
                .font(.caption)
                .foregroundStyle(.secondary)
            }

            Spacer()

            if isDownloading {
                ProgressView()
                    .controlSize(.small)
            } else {
                Button {
                    Task { await download() }
                } label: {
                    Image(systemName: "arrow.down.circle")
                }
                .accessibilityLabel("Download \(attachment.title)")
            }
        }
        .padding(.horizontal)
        .padding(.vertical, 8)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .padding(.horizontal)
        .sheet(isPresented: $showShareSheet) {
            if let data = downloadedData {
                ShareSheet(items: [data])
            }
        }
    }

    private func download() async {
        isDownloading = true
        defer { isDownloading = false }
        if let (data, _) = await viewModel.downloadAttachment(attachment) {
            downloadedData = data
            showShareSheet = true
        }
    }
}
