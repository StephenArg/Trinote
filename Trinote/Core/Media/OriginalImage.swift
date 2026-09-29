import Accessibility
import ImageIO
import SwiftUI
import UIKit
import UniformTypeIdentifiers

/// An image as Trilium stores it: the original file bytes, plus a decoded still for sizing and for
/// anything that needs a `UIImage`.
///
/// A `UIImage` decoded from an animated GIF or AVIF holds only the first frame, and iOS re-encodes a
/// shared or copied `UIImage` as JPEG or PNG. Keeping the bytes lets animation play and hands the
/// real file to Share and Copy.
struct OriginalImage {
    let data: Data
    let still: UIImage
    let isAnimated: Bool

    init?(data: Data) {
        guard let still = UIImage(data: data) else { return nil }
        self.data = data
        self.still = still
        if let source = CGImageSourceCreateWithData(data as CFData, nil) {
            isAnimated = CGImageSourceGetCount(source) > 1
        } else {
            isAnimated = false
        }
    }

    var contentType: UTType? {
        UTType(mimeType: data.detectImageMIME())
    }

    /// `title` with the file's real extension, e.g. "Beach" → "Beach.avif" (kept as is when it already ends in it).
    /// Untitled images (most note images have no alt text) get "image", as iOS names a shared photo.
    func filename(title: String?) -> String {
        let base = title?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return AttachmentFilename.join(
            basename: base.isEmpty ? "image" : base,
            ext: contentType?.preferredFilenameExtension ?? ""
        )
    }

    /// Shares the original file, named from `title`, and removes it when the share finishes. A `UIImage`
    /// would be re-encoded as JPEG, so the still is only the fallback when the file can't be written.
    func shareSheetItem(title: String?) -> ShareSheetItem {
        do {
            let url = try AttachmentPreviewFileStore.write(data: data, filename: filename(title: title))
            return ShareSheetItem(items: [url]) { AttachmentPreviewFileStore.remove(url) }
        } catch {
            Log.ui.error("Could not write image for sharing: \(error.localizedDescription)")
            return ShareSheetItem(items: [still])
        }
    }

    /// Puts the original file on the pasteboard, with a PNG of the still for apps that can't read its format.
    func copyToPasteboard() {
        var item: [String: Any] = [:]
        if let png = still.pngData() {
            item[UTType.png.identifier] = png
        }
        if let contentType {
            item[contentType.identifier] = data
        }
        UIPasteboard.general.setItems([item])
    }
}

/// Plays an animated image's frames into a `UIImageView`. ImageIO decodes each frame as it comes due,
/// with the file's own timing, so a long animation never sits in memory all at once.
@MainActor
final class ImageFrameAnimator {
    private var generation = 0

    /// No-op for stills, and when the person has turned off Auto-Play Animated Images.
    func start(_ image: OriginalImage, in imageView: UIImageView) {
        stop()
        guard image.isAnimated, AccessibilitySettings.animatedImagesEnabled else { return }
        let current = generation
        CGAnimateImageDataWithBlock(image.data as CFData, nil) { [weak self, weak imageView] _, frame, stop in
            // ImageIO calls this on the main queue.
            MainActor.assumeIsolated {
                guard let self, let imageView, self.generation == current else {
                    stop.pointee = true
                    return
                }
                imageView.image = UIImage(cgImage: frame)
            }
        }
    }

    func stop() {
        generation += 1
    }
}

/// An aspect-fit image that plays its animation, for inline display where a SwiftUI `Image` would show a still.
struct AnimatedImageView: UIViewRepresentable {
    let image: OriginalImage

    @MainActor
    final class Coordinator {
        let animator = ImageFrameAnimator()
        var shownData: Data?
    }

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> UIImageView {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFit
        // Let SwiftUI's frame decide the size instead of the image's pixel dimensions.
        imageView.setContentHuggingPriority(.defaultLow, for: .horizontal)
        imageView.setContentHuggingPriority(.defaultLow, for: .vertical)
        imageView.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
        imageView.setContentCompressionResistancePriority(.defaultLow, for: .vertical)
        return imageView
    }

    /// Parents rebuild `image` (a fresh `UIImage`) on every render, so only different bytes restart playback.
    func updateUIView(_ imageView: UIImageView, context: Context) {
        let coordinator = context.coordinator
        guard coordinator.shownData != image.data else { return }
        coordinator.shownData = image.data
        imageView.image = image.still
        coordinator.animator.start(image, in: imageView)
    }

    static func dismantleUIView(_ imageView: UIImageView, coordinator: Coordinator) {
        coordinator.animator.stop()
    }
}
