import Foundation
import UIKit
import UniformTypeIdentifiers

/// What a chat accepts as an attachment, as Trilium's chat does (`useChatAttachments.ts`): images the providers read
/// as vision input, PDFs, and text files the server inlines as text.
enum ChatAttachmentKind: Equatable, Sendable {
    case image
    case file
    case textFile
}

enum ChatAttachments {
    /// Images every major provider reads natively, plus SVG (the server sends its XML as text).
    static let imageMimes: Set<String> = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/svg+xml"]
    /// Binary files the providers handle themselves.
    static let binaryFileMimes: Set<String> = ["application/pdf"]
    /// Extensions read as text (source code often has no useful MIME type).
    static let textExtensions: Set<String> = [
        "txt", "md", "markdown", "rst", "log", "csv", "tsv", "json", "yaml", "yml", "xml", "toml", "ini", "env",
        "js", "ts", "jsx", "tsx", "mjs", "cjs", "py", "rb", "go", "rs", "c", "cc", "cpp", "h", "hpp",
        "java", "kt", "swift", "php", "lua", "pl", "scala", "sh", "bash", "zsh", "sql",
        "html", "htm", "css", "scss", "vue", "svelte"
    ]
    /// Images converted to JPEG are scaled so their long side is at most this; providers scale larger ones down anyway.
    static let maxImageDimension: CGFloat = 2048

    /// How Trilium's chat sends a file, or nil when it isn't accepted.
    static func kind(filename: String, mime: String) -> ChatAttachmentKind? {
        let mime = mime.lowercased()
        if imageMimes.contains(mime) { return .image }
        if binaryFileMimes.contains(mime) { return .file }
        if mime.hasPrefix("text/") { return .textFile }
        let ext = (filename as NSString).pathExtension.lowercased()
        if textExtensions.contains(ext) { return .textFile }
        return nil
    }

    /// The MIME type for a file name, as the system knows it (`application/octet-stream` when it doesn't).
    static func mime(forFilename filename: String) -> String {
        let ext = (filename as NSString).pathExtension
        return UTType(filenameExtension: ext)?.preferredMIMEType ?? "application/octet-stream"
    }

    /// An image providers can read: kept as it is when its type is accepted, otherwise (HEIC from the camera
    /// roll, TIFF, AVIF…) converted to a JPEG no larger than `maxImageDimension`. `nil` when it can't be decoded.
    static func prepareImage(data: Data, filename: String, mime: String) -> (data: Data, filename: String, mime: String)? {
        if imageMimes.contains(mime.lowercased()) { return (data, filename, mime.lowercased()) }
        guard let image = UIImage(data: data) else { return nil }
        guard let jpeg = jpegData(image) else { return nil }
        let base = (filename as NSString).deletingPathExtension
        return (jpeg, (base.isEmpty ? "image" : base) + ".jpg", "image/jpeg")
    }

    /// JPEG of a camera or library image, upright and scaled down.
    static func jpegData(_ image: UIImage) -> Data? {
        let upright = image.normalizedToUpOrientation()
        let longSide = max(upright.size.width, upright.size.height)
        guard longSide > maxImageDimension else { return upright.jpegData(compressionQuality: 0.85) }
        let scale = maxImageDimension / longSide
        let size = CGSize(width: (upright.size.width * scale).rounded(), height: (upright.size.height * scale).rounded())
        let format = UIGraphicsImageRendererFormat.default()
        format.scale = 1
        let resized = UIGraphicsImageRenderer(size: size, format: format).image { _ in
            upright.draw(in: CGRect(origin: .zero, size: size))
        }
        return resized.jpegData(compressionQuality: 0.85)
    }

    /// The block a user message stores for an uploaded attachment, with the URL Trilium's upload route answers with.
    static func block(kind: ChatAttachmentKind, attachmentId: String, mime: String, title: String, chatNoteId: String) -> ContentBlock {
        switch kind {
        case .image:
            let encoded = title.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed.subtracting(CharacterSet(charactersIn: "/"))) ?? title
            return .image(AttachmentBlockRef(attachmentId: attachmentId, mime: mime, title: title, url: "api/attachments/\(attachmentId)/image/\(encoded)"))
        case .file:
            return .file(AttachmentBlockRef(attachmentId: attachmentId, mime: mime, title: title, url: fileURL(attachmentId, chatNoteId)))
        case .textFile:
            return .textFile(AttachmentBlockRef(attachmentId: attachmentId, mime: mime.isEmpty ? "text/plain" : mime, title: title, url: fileURL(attachmentId, chatNoteId)))
        }
    }

    private static func fileURL(_ attachmentId: String, _ chatNoteId: String) -> String {
        "#root/\(chatNoteId)?viewMode=attachments&attachmentId=\(attachmentId)"
    }

    /// Whether `model` reads this kind. Models that don't say (Trilium v0.106) are assumed to; text files are always
    /// fine, since the server inlines them as text.
    static func model(_ model: LlmModelInfo?, accepts kind: ChatAttachmentKind) -> Bool {
        guard let kinds = model?.attachmentKinds else { return true }
        switch kind {
        case .image: return kinds.contains("image")
        case .file: return kinds.contains("file")
        case .textFile: return true
        }
    }
}

/// An attachment uploaded to the chat note, waiting to go out with the next message.
struct PendingChatAttachment: Identifiable, Equatable {
    let block: ContentBlock
    let kind: ChatAttachmentKind
    let title: String
    /// The picked image, for the chip.
    let thumbnail: Data?

    var id: String {
        switch block {
        case .image(let ref), .file(let ref), .textFile(let ref): return ref.attachmentId
        default: return title
        }
    }
}
