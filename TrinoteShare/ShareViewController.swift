import UIKit
import UniformTypeIdentifiers
import ImageIO

/// Lightweight share extension: persist shared content to the App Group and open the host app.
final class ShareViewController: UIViewController {
    private let activity = UIActivityIndicatorView(style: .large)
    private let statusLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground

        activity.translatesAutoresizingMaskIntoConstraints = false
        activity.startAnimating()
        statusLabel.translatesAutoresizingMaskIntoConstraints = false
        statusLabel.textAlignment = .center
        statusLabel.numberOfLines = 0
        statusLabel.font = .preferredFont(forTextStyle: .subheadline)
        statusLabel.textColor = .secondaryLabel
        statusLabel.text = String(localized: "Preparing shared content…", comment: "Share extension status")

        view.addSubview(activity)
        view.addSubview(statusLabel)
        NSLayoutConstraint.activate([
            activity.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            activity.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -20),
            statusLabel.topAnchor.constraint(equalTo: activity.bottomAnchor, constant: 16),
            statusLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            statusLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
        ])

        Task { await processAndHandoff() }
    }

    private func processAndHandoff() async {
        do {
            let extracted = try await extractSharedContent()
            let kind = SharedImportClassifier.classify(
                filename: extracted.filename,
                mimeType: extracted.mimeType,
                uti: extracted.uti,
                hasText: extracted.text != nil,
                hasBinary: extracted.binaryData != nil
            )
            let payload = SharedImportPayload(
                filename: extracted.filename,
                mimeType: extracted.mimeType,
                uti: extracted.uti,
                kind: kind,
                text: extracted.text,
                hasBinaryData: extracted.binaryData != nil
            )
            try SharedImportStore.write(payload: payload, binaryData: extracted.binaryData)
            // Give the pasteboard a moment to flush before the host reads it.
            try? await Task.sleep(nanoseconds: 80_000_000)
            await MainActor.run {
                openHostApp()
            }
            // Keep the extension alive briefly so openURL / pasteboard handoff can complete.
            try? await Task.sleep(nanoseconds: 450_000_000)
            await MainActor.run {
                finish()
            }
        } catch {
            await MainActor.run {
                statusLabel.text = error.localizedDescription
                activity.stopAnimating()
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.6) { [weak self] in
                    self?.finish()
                }
            }
        }
    }

    private struct ExtractedShare {
        var filename: String?
        var mimeType: String?
        var uti: String?
        var text: String?
        var binaryData: Data?
    }

    private enum ShareExtractError: LocalizedError {
        case noContent

        var errorDescription: String? {
            String(localized: "Nothing to share with Trinote.", comment: "Share extension empty")
        }
    }

    private func extractSharedContent() async throws -> ExtractedShare {
        guard let items = extensionContext?.inputItems as? [NSExtensionItem] else {
            throw ShareExtractError.noContent
        }

        for item in items {
            guard let attachments = item.attachments else { continue }
            for provider in attachments {
                if let extracted = await loadFromProvider(provider) {
                    return extracted
                }
            }
            // Fallback: attributed content text on the extension item.
            if let text = item.attributedContentText?.string.trimmingCharacters(in: .whitespacesAndNewlines),
               !text.isEmpty {
                return ExtractedShare(
                    filename: nil,
                    mimeType: "text/plain",
                    uti: UTType.plainText.identifier,
                    text: text,
                    binaryData: nil
                )
            }
        }
        throw ShareExtractError.noContent
    }

    private func loadFromProvider(_ provider: NSItemProvider) async -> ExtractedShare? {
        if provider.hasItemConformingToTypeIdentifier(UTType.image.identifier) {
            if let extracted = await loadImage(from: provider) { return extracted }
        }
        if provider.hasItemConformingToTypeIdentifier(UTType.pdf.identifier) {
            if let extracted = await loadBinaryRepresentation(
                from: provider,
                typeIdentifier: UTType.pdf.identifier,
                defaultFilename: "shared.pdf",
                defaultMIME: "application/pdf"
            ) { return extracted }
        }
        if provider.hasItemConformingToTypeIdentifier(UTType.fileURL.identifier) {
            if let extracted = await loadFileURL(from: provider) { return extracted }
        }
        if provider.hasItemConformingToTypeIdentifier(UTType.url.identifier) {
            if let extracted = await loadURL(from: provider) { return extracted }
        }
        if provider.hasItemConformingToTypeIdentifier(UTType.plainText.identifier) {
            if let extracted = await loadPlainText(from: provider) { return extracted }
        }
        if provider.hasItemConformingToTypeIdentifier(UTType.text.identifier) {
            if let extracted = await loadPlainText(from: provider, typeIdentifier: UTType.text.identifier) {
                return extracted
            }
        }
        if provider.hasItemConformingToTypeIdentifier(UTType.data.identifier) {
            if let extracted = await loadData(from: provider) { return extracted }
        }
        // Last resort: any registered file-like type (e.g. com.adobe.pdf without public.data).
        for typeId in provider.registeredTypeIdentifiers {
            if typeId == UTType.plainText.identifier
                || typeId == UTType.text.identifier
                || typeId == UTType.utf8PlainText.identifier
                || typeId == UTType.url.identifier
                || typeId == UTType.fileURL.identifier
                || typeId.hasPrefix("public.image")
                || typeId == UTType.pdf.identifier
                || typeId == UTType.data.identifier {
                continue
            }
            let suggested = provider.suggestedName
            let filename = (suggested?.isEmpty == false) ? suggested! : "shared-file"
            let mime = Self.mimeType(filename: filename, uti: typeId)
            if let extracted = await loadBinaryRepresentation(
                from: provider,
                typeIdentifier: typeId,
                defaultFilename: filename,
                defaultMIME: mime
            ) {
                return extracted
            }
        }
        return nil
    }

    private func loadImage(from provider: NSItemProvider) async -> ExtractedShare? {
        // File representation sometimes carries a usable name; data representation usually does not (Photos).
        if let viaFile = await loadFileRepresentation(from: provider, typeIdentifier: UTType.image.identifier),
           let data = viaFile.binaryData, !data.isEmpty {
            let mime = viaFile.mimeType
                ?? Self.mimeType(forImageData: data)
                ?? "image/jpeg"
            let titleDate = SharedImportTitle.preferredImageTitleDate(fromImageData: data)
            let filename = SharedImportTitle.imageFilename(
                suggestedName: provider.suggestedName,
                existingFilename: viaFile.filename,
                mime: mime,
                at: titleDate
            )
            return ExtractedShare(
                filename: filename,
                mimeType: mime,
                uti: UTType.image.identifier,
                text: nil,
                binaryData: data
            )
        }
        return await withCheckedContinuation { continuation in
            provider.loadDataRepresentation(forTypeIdentifier: UTType.image.identifier) { data, _ in
                guard let data, !data.isEmpty else {
                    continuation.resume(returning: nil)
                    return
                }
                let mime = Self.mimeType(forImageData: data) ?? "image/jpeg"
                let titleDate = SharedImportTitle.preferredImageTitleDate(fromImageData: data)
                let filename = SharedImportTitle.imageFilename(
                    suggestedName: provider.suggestedName,
                    existingFilename: nil,
                    mime: mime,
                    at: titleDate
                )
                continuation.resume(returning: ExtractedShare(
                    filename: filename,
                    mimeType: mime,
                    uti: UTType.image.identifier,
                    text: nil,
                    binaryData: data
                ))
            }
        }
    }

    private func loadFileURL(from provider: NSItemProvider) async -> ExtractedShare? {
        await withCheckedContinuation { continuation in
            provider.loadItem(forTypeIdentifier: UTType.fileURL.identifier, options: nil) { item, _ in
                let url: URL?
                if let u = item as? URL {
                    url = u
                } else if let data = item as? Data, let u = URL(dataRepresentation: data, relativeTo: nil) {
                    url = u
                } else {
                    url = nil
                }
                guard let url else {
                    continuation.resume(returning: nil)
                    return
                }
                let accessed = url.startAccessingSecurityScopedResource()
                defer {
                    if accessed { url.stopAccessingSecurityScopedResource() }
                }
                guard let data = try? Data(contentsOf: url), !data.isEmpty else {
                    continuation.resume(returning: nil)
                    return
                }
                let filename = url.lastPathComponent
                let uti = UTType(filenameExtension: url.pathExtension)?.identifier
                let mime = Self.mimeType(filename: filename, uti: uti)
                // Prefer text for .txt / .md when decodable as UTF-8.
                let ext = url.pathExtension.lowercased()
                if ["txt", "text", "md", "markdown", "mdown"].contains(ext),
                   let text = String(data: data, encoding: .utf8) {
                    continuation.resume(returning: ExtractedShare(
                        filename: filename,
                        mimeType: mime,
                        uti: uti,
                        text: text,
                        binaryData: nil
                    ))
                    return
                }
                continuation.resume(returning: ExtractedShare(
                    filename: filename,
                    mimeType: mime,
                    uti: uti,
                    text: nil,
                    binaryData: data
                ))
            }
        }
    }

    /// Loads binary via `loadFileRepresentation` (temp file copy) then `loadDataRepresentation`.
    private func loadBinaryRepresentation(
        from provider: NSItemProvider,
        typeIdentifier: String,
        defaultFilename: String,
        defaultMIME: String
    ) async -> ExtractedShare? {
        if let viaFile = await loadFileRepresentation(from: provider, typeIdentifier: typeIdentifier) {
            return viaFile
        }
        return await withCheckedContinuation { continuation in
            provider.loadDataRepresentation(forTypeIdentifier: typeIdentifier) { data, _ in
                guard let data, !data.isEmpty else {
                    continuation.resume(returning: nil)
                    return
                }
                let suggested = provider.suggestedName
                let filename = (suggested?.isEmpty == false) ? suggested! : defaultFilename
                let mime = Self.mimeType(filename: filename, uti: typeIdentifier)
                continuation.resume(returning: ExtractedShare(
                    filename: filename,
                    mimeType: mime.isEmpty ? defaultMIME : mime,
                    uti: typeIdentifier,
                    text: nil,
                    binaryData: data
                ))
            }
        }
    }

    private func loadFileRepresentation(
        from provider: NSItemProvider,
        typeIdentifier: String
    ) async -> ExtractedShare? {
        await withCheckedContinuation { continuation in
            provider.loadFileRepresentation(forTypeIdentifier: typeIdentifier) { url, _ in
                guard let url else {
                    continuation.resume(returning: nil)
                    return
                }
                // Must copy before the completion handler returns — the temp file is deleted afterward.
                guard let data = try? Data(contentsOf: url), !data.isEmpty else {
                    continuation.resume(returning: nil)
                    return
                }
                let suggested = provider.suggestedName
                let filename: String = {
                    if let suggested, !suggested.isEmpty { return suggested }
                    let last = url.lastPathComponent
                    return last.isEmpty ? "shared-file" : last
                }()
                let uti = UTType(filenameExtension: (filename as NSString).pathExtension)?.identifier
                    ?? typeIdentifier
                let mime = Self.mimeType(filename: filename, uti: uti)
                let ext = (filename as NSString).pathExtension.lowercased()
                if ["txt", "text", "md", "markdown", "mdown"].contains(ext),
                   let text = String(data: data, encoding: .utf8) {
                    continuation.resume(returning: ExtractedShare(
                        filename: filename,
                        mimeType: mime,
                        uti: uti,
                        text: text,
                        binaryData: nil
                    ))
                    return
                }
                continuation.resume(returning: ExtractedShare(
                    filename: filename,
                    mimeType: mime,
                    uti: uti,
                    text: nil,
                    binaryData: data
                ))
            }
        }
    }

    private func loadURL(from provider: NSItemProvider) async -> ExtractedShare? {
        await withCheckedContinuation { continuation in
            provider.loadItem(forTypeIdentifier: UTType.url.identifier, options: nil) { item, _ in
                let url: URL?
                if let u = item as? URL {
                    url = u
                } else if let data = item as? Data, let u = URL(dataRepresentation: data, relativeTo: nil) {
                    url = u
                } else {
                    url = nil
                }
                guard let url else {
                    continuation.resume(returning: nil)
                    return
                }
                if url.isFileURL {
                    let accessed = url.startAccessingSecurityScopedResource()
                    defer {
                        if accessed { url.stopAccessingSecurityScopedResource() }
                    }
                    if let data = try? Data(contentsOf: url) {
                        let filename = url.lastPathComponent
                        let uti = UTType(filenameExtension: url.pathExtension)?.identifier
                        continuation.resume(returning: ExtractedShare(
                            filename: filename,
                            mimeType: Self.mimeType(filename: filename, uti: uti),
                            uti: uti,
                            text: nil,
                            binaryData: data
                        ))
                        return
                    }
                }
                continuation.resume(returning: ExtractedShare(
                    filename: nil,
                    mimeType: "text/uri-list",
                    uti: UTType.url.identifier,
                    text: url.absoluteString,
                    binaryData: nil
                ))
            }
        }
    }

    private func loadPlainText(
        from provider: NSItemProvider,
        typeIdentifier: String = UTType.plainText.identifier
    ) async -> ExtractedShare? {
        await withCheckedContinuation { continuation in
            provider.loadItem(forTypeIdentifier: typeIdentifier, options: nil) { item, _ in
                let text: String?
                if let s = item as? String {
                    text = s
                } else if let data = item as? Data {
                    text = String(data: data, encoding: .utf8)
                } else if let attr = item as? NSAttributedString {
                    text = attr.string
                } else {
                    text = nil
                }
                guard let text, !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
                    continuation.resume(returning: nil)
                    return
                }
                continuation.resume(returning: ExtractedShare(
                    filename: nil,
                    mimeType: "text/plain",
                    uti: typeIdentifier,
                    text: text,
                    binaryData: nil
                ))
            }
        }
    }

    private func loadData(from provider: NSItemProvider) async -> ExtractedShare? {
        let suggested = provider.suggestedName
        let filename = (suggested?.isEmpty == false) ? suggested! : "shared-file"
        return await loadBinaryRepresentation(
            from: provider,
            typeIdentifier: UTType.data.identifier,
            defaultFilename: filename,
            defaultMIME: "application/octet-stream"
        )
    }

    private func openHostApp() {
        let url = SharedImportConstants.hostOpenURL
        var responder: UIResponder? = self
        while let current = responder {
            if let application = current as? UIApplication {
                application.open(url, options: [:], completionHandler: nil)
                return
            }
            // Share extensions often expose openURL via the responder chain.
            let selector = sel_registerName("openURL:")
            if current.responds(to: selector) {
                _ = current.perform(selector, with: url)
                return
            }
            responder = current.next
        }
        extensionContext?.open(url, completionHandler: nil)
    }

    private func finish() {
        extensionContext?.completeRequest(returningItems: nil, completionHandler: nil)
    }

    private static func mimeType(filename: String, uti: String?) -> String {
        let ext = (filename as NSString).pathExtension.lowercased()
        if let uti, let type = UTType(uti), let mime = type.preferredMIMEType {
            return mime
        }
        if let type = UTType(filenameExtension: ext), let mime = type.preferredMIMEType {
            return mime
        }
        switch ext {
        case "pdf": return "application/pdf"
        case "png": return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "gif": return "image/gif"
        case "webp": return "image/webp"
        case "heic": return "image/heic"
        case "txt": return "text/plain"
        case "md", "markdown", "mdown": return "text/markdown"
        default: return "application/octet-stream"
        }
    }

    private static func mimeType(forImageData data: Data) -> String? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil),
              let uti = CGImageSourceGetType(source) as String?,
              let type = UTType(uti)
        else { return nil }
        return type.preferredMIMEType
    }

    private static func preferredExtension(forMIME mime: String) -> String {
        switch mime.lowercased() {
        case "image/png": return "png"
        case "image/gif": return "gif"
        case "image/webp": return "webp"
        case "image/heic": return "heic"
        default: return "jpg"
        }
    }
}
