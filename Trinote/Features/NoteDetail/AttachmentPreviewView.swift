import SwiftUI
import PDFKit
import QuickLook
import UniformTypeIdentifiers

// MARK: - URL parsing

enum TriliumAttachmentURLParser {
    private static let pattern = try! NSRegularExpression(
        pattern: #"(?i)api/(attachments|images)/([a-zA-Z0-9_-]+)/"#,
        options: []
    )

    /// Returns `(routeType, entityId)` for Trilium `api/attachments/{id}/…` or `api/images/{id}/…` URLs.
    static func entityReference(from url: URL) -> (routeType: String, entityId: String)? {
        entityReference(in: url.absoluteString)
    }

    static func entityReference(in urlString: String) -> (routeType: String, entityId: String)? {
        let ns = urlString as NSString
        let range = NSRange(location: 0, length: ns.length)
        guard let match = pattern.firstMatch(in: urlString, options: [], range: range),
              match.numberOfRanges >= 3 else { return nil }
        let routeType = ns.substring(with: match.range(at: 1)).lowercased()
        let entityId = ns.substring(with: match.range(at: 2))
        guard !entityId.isEmpty else { return nil }
        return (routeType, entityId)
    }

    /// Parses attachment IDs from Trilium upload responses (`api/attachments/{id}/…` or `#…?attachmentId=`).
    static func attachmentId(fromUploadResultURL urlString: String?) -> String? {
        guard let urlString, !urlString.isEmpty else { return nil }
        if let ref = entityReference(in: urlString) {
            return ref.entityId
        }
        guard let range = urlString.range(of: "attachmentId=") else { return nil }
        let remainder = urlString[range.upperBound...]
        let id = remainder.split(separator: "&").first.map(String.init)
        guard let id, !id.isEmpty else { return nil }
        return id
    }
}

/// Parsed Trilium internal hash links (`#root/{noteId}?viewMode=attachments&attachmentId=…`).
enum TriliumHashLinkNavigation {
    struct Parsed: Sendable {
        let noteId: String?
        let viewMode: String?
        let attachmentId: String?
    }

    static func parse(url: URL) -> Parsed? {
        if let fragment = url.fragment?.trimmingCharacters(in: .whitespacesAndNewlines), !fragment.isEmpty {
            return parse(fragment: fragment)
        }
        let absolute = url.absoluteString.trimmingCharacters(in: .whitespacesAndNewlines)
        if absolute.contains("#") {
            return parse(href: absolute)
        }
        return nil
    }

    /// Parses Trilium hash links from a raw `href` (`#root/…?viewMode=attachments&attachmentId=…`).
    static func parse(href: String) -> Parsed? {
        var h = href.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !h.isEmpty else { return nil }
        if let hashIndex = h.firstIndex(of: "#") {
            h = String(h[h.index(after: hashIndex)...])
        }
        return parse(fragment: h)
    }

    private static func parse(fragment: String) -> Parsed? {
        var fragment = fragment.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !fragment.isEmpty else { return nil }

        let queryPart: String?
        if let queryIndex = fragment.firstIndex(of: "?") {
            queryPart = String(fragment[fragment.index(after: queryIndex)...])
            fragment = String(fragment[..<queryIndex])
        } else {
            queryPart = nil
        }

        fragment = fragment.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        let parts = fragment.split(separator: "/").map(String.init).filter { !$0.isEmpty }
        let noteId: String? = {
            guard let last = parts.last, last != "root" else { return nil }
            return last
        }()

        var viewMode: String?
        var attachmentId: String?
        if let queryPart {
            for pair in queryPart.split(separator: "&") {
                let kv = pair.split(separator: "=", maxSplits: 1).map(String.init)
                guard kv.count == 2 else { continue }
                let key = kv[0]
                let value = kv[1].removingPercentEncoding ?? kv[1]
                switch key {
                case "viewMode": viewMode = value
                case "attachmentId": attachmentId = value
                default: break
                }
            }
        }

        guard noteId != nil || viewMode != nil || attachmentId != nil else { return nil }
        return Parsed(noteId: noteId, viewMode: viewMode, attachmentId: attachmentId)
    }
}

// MARK: - Temp file store

enum AttachmentPreviewFileStore {
    static func write(data: Data, filename: String) throws -> URL {
        let directory = FileManager.default.temporaryDirectory
            .appendingPathComponent("trinote-attachment-preview", isDirectory: true)
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let safeName = sanitizedFilename(filename)
        let url = directory.appendingPathComponent("\(UUID().uuidString)-\(safeName)")
        try data.write(to: url, options: .atomic)
        return url
    }

    static func remove(_ url: URL) {
        try? FileManager.default.removeItem(at: url)
    }

    private static func sanitizedFilename(_ name: String) -> String {
        let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
        let base = trimmed.isEmpty ? "attachment" : trimmed
        let invalid = CharacterSet(charactersIn: "/\\:")
        return base.unicodeScalars.map { invalid.contains($0) ? "_" : Character($0) }.reduce(into: "") { $0.append($1) }
    }
}

// MARK: - Preview item

struct AttachmentPreviewItem: Identifiable {
    enum Kind {
        case image(UIImage)
        case text(String)
        case pdf
        case quickLook
        case officeHTML(String)
    }

    let id = UUID()
    let title: String
    let mime: String
    let fileURL: URL?
    let shareData: Data
    let kind: Kind

    var canShare: Bool { fileURL != nil }

    static func make(title: String, mime: String, data: Data) -> AttachmentPreviewItem? {
        guard !data.isEmpty else { return nil }
        guard let fileURL = try? AttachmentPreviewFileStore.write(data: data, filename: title) else { return nil }
        let kind = previewKind(mime: mime, data: data)
        return AttachmentPreviewItem(title: title, mime: mime, fileURL: fileURL, shareData: data, kind: kind)
    }

    static func makeOfficeHTML(title: String, mime: String, html: String, data: Data) -> AttachmentPreviewItem? {
        let trimmed = html.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return nil }
        let fileURL = data.isEmpty ? nil : try? AttachmentPreviewFileStore.write(data: data, filename: title)
        return AttachmentPreviewItem(
            title: title,
            mime: mime,
            fileURL: fileURL,
            shareData: data,
            kind: .officeHTML(html)
        )
    }

    private static func previewKind(mime: String, data: Data) -> Kind {
        let lowered = mime.lowercased()
        if lowered.hasPrefix("image/"), let image = UIImage(data: data) {
            return .image(image)
        }
        if isTextMime(lowered), let text = decodeText(from: data) {
            return .text(text)
        }
        if lowered == "application/pdf" {
            return .pdf
        }
        return .quickLook
    }

    private static func isTextMime(_ mime: String) -> Bool {
        mime.hasPrefix("text/")
            || mime == "application/json"
            || mime == "application/xml"
            || mime == "application/javascript"
            || mime == "application/x-yaml"
            || mime == "application/yaml"
    }

    private static func decodeText(from data: Data) -> String? {
        if let utf8 = String(data: data, encoding: .utf8) { return utf8 }
        if let utf16 = String(data: data, encoding: .utf16) { return utf16 }
        return String(decoding: data, as: UTF8.self)
    }
}

// MARK: - Preview view

struct AttachmentPreviewView: View {
    let item: AttachmentPreviewItem
    let onDismiss: () -> Void

    @State private var showShareSheet = false

    var body: some View {
        Group {
            switch item.kind {
            case .image(let image):
                FullScreenImageViewer(image: image, title: item.title, onDismiss: onDismiss)
            case .text(let text):
                previewChrome {
                    ScrollView {
                        Text(text)
                            .font(.system(.body, design: .monospaced))
                            .textSelection(.enabled)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding()
                    }
                }
            case .pdf:
                previewChrome {
                    PDFAttachmentPreview(data: item.shareData)
                }
            case .quickLook:
                if let fileURL = item.fileURL {
                    previewChrome {
                        QuickLookPreview(url: fileURL)
                            .ignoresSafeArea(edges: .bottom)
                    }
                } else {
                    previewChrome {
                        ContentUnavailableView(
                            String(localized: "Cannot Preview", comment: "Attachment preview unavailable"),
                            systemImage: "eye.slash",
                            description: Text(String(localized: "This file could not be opened for preview.", comment: "Attachment preview missing file"))
                        )
                    }
                }
            case .officeHTML(let html):
                previewChrome {
                    OfficeHTMLPreviewView(html: html, fillsAvailableHeight: true)
                        .ignoresSafeArea(edges: .bottom)
                }
            }
        }
        .onDisappear {
            if let fileURL = item.fileURL {
                AttachmentPreviewFileStore.remove(fileURL)
            }
        }
        .sheet(isPresented: $showShareSheet) {
            if let fileURL = item.fileURL {
                ShareSheet(items: [fileURL])
            }
        }
    }

    @ViewBuilder
    private func previewChrome<Content: View>(@ViewBuilder content: () -> Content) -> some View {
        NavigationStack {
            content()
                .navigationTitle(item.title)
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button(String(localized: "Close", comment: "Close attachment preview")) {
                            onDismiss()
                        }
                    }
                    ToolbarItem(placement: .primaryAction) {
                        if item.canShare {
                            Button {
                                showShareSheet = true
                            } label: {
                                Image(systemName: "square.and.arrow.up")
                            }
                            .accessibilityLabel(String(localized: "Share", comment: "Share attachment"))
                        }
                    }
                }
        }
    }
}

// MARK: - PDF

private struct PDFAttachmentPreview: UIViewRepresentable {
    let data: Data

    func makeUIView(context: Context) -> PDFView {
        let pdfView = PDFView()
        pdfView.autoScales = true
        pdfView.displayMode = .singlePageContinuous
        pdfView.displayDirection = .vertical
        pdfView.document = PDFDocument(data: data)
        return pdfView
    }

    func updateUIView(_ pdfView: PDFView, context: Context) {
        if pdfView.document == nil {
            pdfView.document = PDFDocument(data: data)
        }
    }
}

// MARK: - Quick Look

private struct QuickLookPreview: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> QLPreviewController {
        let controller = QLPreviewController()
        controller.dataSource = context.coordinator
        return controller
    }

    func updateUIViewController(_ controller: QLPreviewController, context: Context) {
        context.coordinator.url = url
        controller.reloadData()
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(url: url)
    }

    final class Coordinator: NSObject, QLPreviewControllerDataSource {
        var url: URL

        init(url: URL) {
            self.url = url
        }

        func numberOfPreviewItems(in controller: QLPreviewController) -> Int { 1 }

        func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
            url as QLPreviewItem
        }
    }
}
