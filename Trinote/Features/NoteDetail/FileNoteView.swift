import SwiftUI

struct FileNoteView: View {
    let note: NoteItem
    let attachments: [AttachmentItem]
    let viewModel: NoteDetailViewModel

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "doc.fill")
                .font(.system(size: 48))
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)

            Text(note.title)
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
