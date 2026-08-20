import SwiftUI

/// File bytes waiting for the user to confirm a basename before upload (extension is locked).
struct PendingAttachmentUpload: Identifiable {
    let id = UUID()
    let data: Data
    let mime: String
    let fileExtension: String
    let suggestedBasename: String

    init(data: Data, mime: String, filename: String) {
        self.data = data
        self.mime = mime
        let split = AttachmentFilename.split(filename)
        self.fileExtension = split.ext
        self.suggestedBasename = split.basename.isEmpty ? "attachment" : split.basename
    }

    func resolvedFilename(basename: String) -> String {
        AttachmentFilename.join(basename: basename, ext: fileExtension)
    }
}

extension View {
    /// Alert that lets the user edit an attachment basename while showing a locked extension.
    func attachmentUploadNamePrompt(
        pending: Binding<PendingAttachmentUpload?>,
        basename: Binding<String>,
        onConfirm: @escaping (PendingAttachmentUpload, String) -> Void
    ) -> some View {
        alert(
            String(localized: "Name Attachment", comment: "Prompt title before uploading a file"),
            isPresented: Binding(
                get: { pending.wrappedValue != nil },
                set: { if !$0 { pending.wrappedValue = nil } }
            )
        ) {
            TextField(
                String(localized: "Filename", comment: "Attachment upload basename field"),
                text: basename
            )
            Button(String(localized: "Cancel", comment: "Cancel"), role: .cancel) {
                pending.wrappedValue = nil
            }
            Button(String(localized: "Upload", comment: "Confirm attachment upload name")) {
                guard let item = pending.wrappedValue else { return }
                let trimmed = basename.wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines)
                guard !trimmed.isEmpty else { return }
                pending.wrappedValue = nil
                onConfirm(item, trimmed)
            }
            .disabled(basename.wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        } message: {
            if let ext = pending.wrappedValue?.fileExtension, !ext.isEmpty {
                Text(String(localized: "Extension: .\(ext)", comment: "Attachment upload extension hint (not editable)"))
            } else {
                Text(String(localized: "Choose a name for this attachment.", comment: "Attachment upload name prompt"))
            }
        }
    }
}
