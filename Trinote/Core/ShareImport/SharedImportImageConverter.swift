import Foundation
import ImageIO
import UniformTypeIdentifiers

/// Shared HEIC and HEIF photos become JPEG before they're made into a note. Trilium's desktop app and most browsers
/// can't show HEIC, so a note holding one would show a broken picture everywhere but Trinote.
enum SharedImportImageConverter {
    /// JPEG quality for a converted photo: it looks like the original, at about the size of the camera's own JPEG.
    static let jpegQuality: CGFloat = 0.9

    /// `package` with a HEIC or HEIF picture swapped for a JPEG copy, its filename and MIME following. Anything else,
    /// and a picture that can't be decoded, comes back unchanged. Decoding a large photo takes a moment, so call this
    /// off the main thread.
    static func convertingHEIC(_ package: SharedImportPackage) -> SharedImportPackage {
        guard package.payload.kind == .image,
              let data = package.binaryData, !data.isEmpty,
              isHEIC(mime: package.payload.mimeType, data: data)
        else { return package }
        guard let jpeg = jpegCopy(ofHEIC: data) else {
            Log.ui.warning("A shared HEIC picture couldn't be converted to JPEG, so it stays HEIC")
            return package
        }
        var payload = package.payload
        payload.mimeType = "image/jpeg"
        payload.uti = UTType.jpeg.identifier
        payload.filename = jpegFilename(for: payload.filename)
        return SharedImportPackage(payload: payload, binaryData: jpeg)
    }

    /// Whether the MIME or the bytes say HEIC or HEIF (image sequences included).
    static func isHEIC(mime: String?, data: Data) -> Bool {
        let declared = (mime ?? "").lowercased()
        if declared.hasPrefix("image/heic") || declared.hasPrefix("image/heif") { return true }
        let sniffed = data.detectImageMIME()
        return sniffed == "image/heic" || sniffed == "image/heif"
    }

    /// `IMG_1234.HEIC` becomes `IMG_1234.jpg`. A missing name stays missing.
    static func jpegFilename(for filename: String?) -> String? {
        guard let trimmed = filename?.trimmingCharacters(in: .whitespacesAndNewlines), !trimmed.isEmpty else { return nil }
        let base = (trimmed as NSString).deletingPathExtension
        return "\(base.isEmpty ? trimmed : base).jpg"
    }

    /// A full-size JPEG of the primary picture. It's turned upright and written with orientation 1, so every viewer
    /// shows it the right way up; the capture date, location and other metadata come along.
    static func jpegCopy(ofHEIC data: Data) -> Data? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil),
              CGImageSourceGetCount(source) > 0
        else { return nil }
        let index = CGImageSourceGetPrimaryImageIndex(source)
        var metadata = (CGImageSourceCopyPropertiesAtIndex(source, index, nil) as? [CFString: Any]) ?? [:]
        let width = (metadata[kCGImagePropertyPixelWidth] as? NSNumber)?.intValue ?? 0
        let height = (metadata[kCGImagePropertyPixelHeight] as? NSNumber)?.intValue ?? 0
        guard width > 0, height > 0 else { return nil }
        // Full size: the "thumbnail" is only the way to have ImageIO apply the photo's rotation while decoding.
        let decode: [CFString: Any] = [
            kCGImageSourceCreateThumbnailFromImageAlways: true,
            kCGImageSourceCreateThumbnailWithTransform: true,
            kCGImageSourceThumbnailMaxPixelSize: max(width, height),
        ]
        guard let image = CGImageSourceCreateThumbnailAtIndex(source, index, decode as CFDictionary) else { return nil }

        metadata[kCGImagePropertyOrientation] = 1
        if var tiff = metadata[kCGImagePropertyTIFFDictionary] as? [CFString: Any] {
            tiff[kCGImagePropertyTIFFOrientation] = 1
            metadata[kCGImagePropertyTIFFDictionary] = tiff
        }
        if var exif = metadata[kCGImagePropertyExifDictionary] as? [CFString: Any] {
            exif[kCGImagePropertyExifPixelXDimension] = image.width
            exif[kCGImagePropertyExifPixelYDimension] = image.height
            metadata[kCGImagePropertyExifDictionary] = exif
        }
        metadata[kCGImageDestinationLossyCompressionQuality] = jpegQuality

        let output = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(output, UTType.jpeg.identifier as CFString, 1, nil) else {
            return nil
        }
        CGImageDestinationAddImage(destination, image, metadata as CFDictionary)
        guard CGImageDestinationFinalize(destination) else { return nil }
        return output as Data
    }
}
