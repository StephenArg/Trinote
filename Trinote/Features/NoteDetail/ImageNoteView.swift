import SwiftUI

struct ImageNoteView: View {
    let data: Data
    let title: String

    @State private var shareItem: ShareSheetItem?
    @State private var showFullScreen = false

    var body: some View {
        if let image = OriginalImage(data: data) {
            VStack(spacing: 12) {
                AnimatedImageView(image: image)
                    .aspectRatio(image.still.size, contentMode: .fit)
                    .frame(maxWidth: .infinity)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .padding(.horizontal)
                    .contentShape(Rectangle())
                    .onTapGesture { showFullScreen = true }
                    .accessibilityLabel("Image: \(title)")
                    .accessibilityAddTraits(.isButton)
                    .accessibilityHint(String(localized: "Opens the image full screen.", comment: "Image note tap hint"))

                HStack(spacing: 16) {
                    Button {
                        shareItem = image.shareSheetItem(title: title)
                    } label: {
                        Label("Share", systemImage: "square.and.arrow.up")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)

                    Button {
                        image.copyToPasteboard()
                    } label: {
                        Label("Copy", systemImage: "doc.on.doc")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
            }
            .padding(.vertical)
            .sheet(item: $shareItem) { item in
                ShareSheet(items: item.items, onComplete: item.onComplete)
            }
            .fullScreenCover(isPresented: $showFullScreen) {
                FullScreenImageViewer(image: image, title: title) {
                    showFullScreen = false
                }
            }
        } else {
            ContentUnavailableView {
                Label("Cannot Display Image", systemImage: "photo.badge.exclamationmark")
            } description: {
                Text("The image format is not supported for preview.")
            }
        }
    }
}

/// What a share sheet hands over, built when Share is tapped. Presenting with `.sheet(item:)` delivers it
/// to the sheet directly; `@State` read only inside a `.sheet(isPresented:)` closure is not tracked, so the
/// sheet can open with the value from before the tap.
struct ShareSheetItem: Identifiable {
    let id = UUID()
    let items: [Any]
    /// Runs when the share finishes or is cancelled, e.g. to remove a temporary file.
    var onComplete: (() -> Void)?
}

struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]
    var onComplete: (() -> Void)?

    func makeUIViewController(context: Context) -> UIActivityViewController {
        let activity = UIActivityViewController(activityItems: items, applicationActivities: nil)
        activity.view.backgroundColor = .systemBackground
        if let onComplete {
            activity.completionWithItemsHandler = { _, _, _, _ in onComplete() }
        }
        return activity
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
