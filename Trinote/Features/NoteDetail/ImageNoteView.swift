import SwiftUI

struct ImageNoteView: View {
    let data: Data
    let title: String

    @State private var showShareSheet = false
    @State private var showFullScreen = false

    var body: some View {
        if let uiImage = UIImage(data: data) {
            VStack(spacing: 12) {
                Image(uiImage: uiImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
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
                        showShareSheet = true
                    } label: {
                        Label("Share", systemImage: "square.and.arrow.up")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)

                    Button {
                        UIPasteboard.general.image = uiImage
                    } label: {
                        Label("Copy", systemImage: "doc.on.doc")
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
            }
            .padding(.vertical)
            .sheet(isPresented: $showShareSheet) {
                ShareSheet(items: [uiImage])
            }
            .fullScreenCover(isPresented: $showFullScreen) {
                FullScreenImageViewer(image: uiImage, title: title) {
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

struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        let activity = UIActivityViewController(activityItems: items, applicationActivities: nil)
        activity.view.backgroundColor = .systemBackground
        return activity
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
