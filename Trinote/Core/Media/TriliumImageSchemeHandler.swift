import Foundation
import WebKit

/// The custom URL scheme that hands note images to a `WKWebView` by reference instead of by value.
///
/// Inlining images as base64 `data:` URIs makes an HTML body weigh as much as its pictures: a 20 KB note
/// holding twenty photos became a 33 MB string, and every probe, copy, and bridge transfer of that body
/// paid for the images all over again. A `trinote-img://attachments/{id}` reference is a few dozen bytes,
/// so the body stays proportional to its text while `TriliumImageSchemeHandler` streams the pixels on
/// WebKit's own schedule.
enum TriliumImageScheme {
    static let scheme = "trinote-img"

    /// Trilium entity ids are `[A-Za-z0-9_-]+`, so no part of these URLs ever needs percent-encoding.
    private static let allowedIdCharacters = CharacterSet(
        charactersIn: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"
    )

    static func url(routeType: String, entityId: String) -> String {
        "\(scheme)://\(routeType.lowercased())/\(entityId)"
    }

    /// Nil for anything that is not one of our image URLs, including ids carrying unexpected characters.
    static func reference(from url: URL?) -> (routeType: String, entityId: String)? {
        guard let url, url.scheme?.lowercased() == scheme else { return nil }
        guard let routeType = url.host?.lowercased(),
              routeType == "attachments" || routeType == "images"
        else { return nil }
        let entityId = url.path.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        guard !entityId.isEmpty,
              entityId.unicodeScalars.allSatisfy({ allowedIdCharacters.contains($0) })
        else { return nil }
        return (routeType, entityId)
    }

    static func reference(fromURLString string: String) -> (routeType: String, entityId: String)? {
        reference(from: URL(string: string))
    }
}

/// Answers `trinote-img://` image requests from the read-only note view, using the same cache-then-server
/// byte resolution the rest of the app uses. Bytes downloaded here are persisted by the provider, so
/// displaying a note still populates the offline image cache.
@MainActor
final class TriliumImageSchemeHandler: NSObject, WKURLSchemeHandler {
    /// Resolves the bytes for one image. Nil when nothing is available, e.g. offline with a cold cache.
    typealias ByteProvider = @MainActor (_ routeType: String, _ entityId: String) async -> Data?

    private let provider: ByteProvider

    /// Tasks WebKit has started and not yet stopped. Answering a task twice, or after it was stopped,
    /// traps inside WebKit; resolving bytes is asynchronous, so every reply is gated on this map.
    private var liveTasks: [ObjectIdentifier: any WKURLSchemeTask] = [:]

    init(provider: @escaping ByteProvider) {
        self.provider = provider
        super.init()
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: any WKURLSchemeTask) {
        let key = ObjectIdentifier(urlSchemeTask)
        liveTasks[key] = urlSchemeTask
        guard let reference = TriliumImageScheme.reference(from: urlSchemeTask.request.url) else {
            respond(key: key, with: nil)
            return
        }
        Task { [weak self] in
            guard let self else { return }
            let data = await self.provider(reference.routeType, reference.entityId)
            self.respond(key: key, with: data)
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: any WKURLSchemeTask) {
        liveTasks.removeValue(forKey: ObjectIdentifier(urlSchemeTask))
    }

    private func respond(key: ObjectIdentifier, with data: Data?) {
        guard let task = liveTasks.removeValue(forKey: key) else { return }
        guard let data, data.isPlausibleInlineImagePayload else {
            task.didFailWithError(URLError(.resourceUnavailable))
            return
        }
        guard let url = task.request.url else {
            task.didFailWithError(URLError(.badServerResponse))
            return
        }
        let mime = data.detectImageMIME()
        let headers = [
            "Content-Type": mime,
            "Content-Length": "\(data.count)",
            "Access-Control-Allow-Origin": "*",
        ]
        guard let response = HTTPURLResponse(
            url: url,
            statusCode: 200,
            httpVersion: "HTTP/1.1",
            headerFields: headers
        ) else {
            task.didFailWithError(URLError(.badServerResponse))
            return
        }
        task.didReceive(response)
        task.didReceive(data)
        task.didFinish()
    }
}
