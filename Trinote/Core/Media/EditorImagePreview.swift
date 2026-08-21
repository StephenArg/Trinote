import UIKit

/// Downscaling for images that ride inside the rich text editor's HTML.
///
/// Whatever the editor displays is serialized and posted across the JS bridge on every debounced
/// edit, so a note holding full-resolution photos makes typing stutter and each save write megabytes.
/// Previews cost no fidelity: the stored note body keeps the server-relative `api/…` reference
/// (see `data-trinote-original-src`), so the full image is what Trilium serves and what read mode
/// opens in the full-screen viewer.
enum EditorImagePreview {
    static let maxPixelDimension: CGFloat = 1200
    private static let jpegQuality: CGFloat = 0.6

    /// Nil when the payload must not be re-encoded (SVG is already tiny, GIF would lose its
    /// animation) or when the image is small enough to leave alone.
    static func downscaledJPEG(from data: Data, mime: String) async -> Data? {
        guard isDownscalableRaster(mime: mime) else { return nil }
        return await Task.detached(priority: .userInitiated) {
            guard let image = UIImage(data: data) else { return nil }
            let longest = max(image.size.width * image.scale, image.size.height * image.scale)
            guard longest > maxPixelDimension else { return nil }
            return image.constrained(to: maxPixelDimension).jpegData(compressionQuality: jpegQuality)
        }.value
    }

    private static func isDownscalableRaster(mime: String) -> Bool {
        switch mime.lowercased() {
        case "image/jpeg", "image/png", "image/heic", "image/heif", "image/tiff", "image/bmp":
            return true
        default:
            return false
        }
    }
}

extension UIImage {
    /// Bakes EXIF orientation into pixels (otherwise the editor shows sideways photos) and caps the
    /// longest side. Returns `self` untouched when neither is needed.
    func constrained(to limit: CGFloat) -> UIImage {
        let pixelWidth = size.width * scale
        let pixelHeight = size.height * scale
        let longest = max(pixelWidth, pixelHeight)
        let needsResize = longest > limit
        guard needsResize || imageOrientation != .up else { return self }
        let ratio = needsResize ? limit / longest : 1
        let target = CGSize(
            width: (pixelWidth * ratio).rounded(),
            height: (pixelHeight * ratio).rounded()
        )
        guard target.width >= 1, target.height >= 1 else { return self }
        let format = UIGraphicsImageRendererFormat.default()
        format.scale = 1
        format.opaque = true
        return UIGraphicsImageRenderer(size: target, format: format).image { _ in
            draw(in: CGRect(origin: .zero, size: target))
        }
    }
}
