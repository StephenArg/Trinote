import SwiftUI
import UIKit
import WebKit

struct GeoMapNoteView: View {
    let viewportJSON: String
    let markers: [GeoMapPin]
    var onOpenPinNote: ((String) -> Void)?

    init(viewportJSON: String, markers: [GeoMapPin], onOpenPinNote: ((String) -> Void)? = nil) {
        self.viewportJSON = viewportJSON
        self.markers = markers
        self.onOpenPinNote = onOpenPinNote
    }

    var body: some View {
        GeoMapWebView(viewportJSON: viewportJSON, markers: markers, onOpenPinNote: onOpenPinNote)
    }
}

struct GeoMapPin: Sendable {
    let noteId: String
    let title: String
    let lat: Double
    let lng: Double
}

private struct GeoMapWebView: UIViewRepresentable {
    let viewportJSON: String
    let markers: [GeoMapPin]
    let onOpenPinNote: ((String) -> Void)?

    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> UIView {
        let container = UIView()
        container.backgroundColor = .clear
        container.clipsToBounds = true

        let uc = WKUserContentController()
        uc.add(context.coordinator, name: "geoMapViewerReady")
        uc.add(context.coordinator, name: "geoMapViewerOpenNote")
        let config = WKWebViewConfiguration()
        config.userContentController = uc
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.minimumZoomScale = 1.0
        webView.scrollView.maximumZoomScale = 1.0
        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }
        context.coordinator.viewportJSON = viewportJSON
        context.coordinator.markers = markers
        context.coordinator.onOpenPinNote = onOpenPinNote
        context.coordinator.webView = webView

        container.addSubview(webView)
        webView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: container.topAnchor),
            webView.bottomAnchor.constraint(equalTo: container.bottomAnchor),
            webView.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: container.trailingAnchor)
        ])

        if let fileURL = Bundle.main.url(forResource: "geomap-viewer", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        } else {
            Log.geoMap.error("geomap-viewer.html missing from app bundle — map will be blank")
        }
        return container
    }

    func updateUIView(_ container: UIView, context: Context) {
        context.coordinator.markers = markers
        context.coordinator.viewportJSON = viewportJSON
        context.coordinator.onOpenPinNote = onOpenPinNote
        if context.coordinator.ready {
            context.coordinator.runJSInitOnceThenMarkers()
        }
    }

    static func dismantleUIView(_ uiView: UIView, coordinator: Coordinator) {
        let uc = coordinator.webView?.configuration.userContentController
        uc?.removeScriptMessageHandler(forName: "geoMapViewerReady")
        uc?.removeScriptMessageHandler(forName: "geoMapViewerOpenNote")
    }

    class Coordinator: NSObject, WKScriptMessageHandler {
        var viewportJSON = ""
        var markers: [GeoMapPin] = []
        var onOpenPinNote: ((String) -> Void)?
        weak var webView: WKWebView?
        var ready = false
        private var didStartJSInit = false
        /// True only after `geoMapViewer.init` JS finishes — `loadMarkers` needs a live `map`.
        private var mapReady = false

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "geoMapViewerReady":
                ready = true
                runJSInitOnceThenMarkers()
            case "geoMapViewerOpenNote":
                guard let noteId = message.body as? String, !noteId.isEmpty else { return }
                DispatchQueue.main.async { [weak self] in
                    self?.onOpenPinNote?(noteId)
                }
            default:
                break
            }
        }

        func runJSInitOnceThenMarkers() {
            guard let webView, ready else { return }
            if mapReady {
                injectMarkers()
                return
            }
            if didStartJSInit { return }
            didStartJSInit = true
            let escaped = viewportJSON
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")
            webView.evaluateJavaScript("window.geoMapViewer.init('\(escaped)');") { _, error in
                if let error {
                    Log.geoMap.error("geoMapViewer.init JS failed: \(error.localizedDescription)")
                }
                self.mapReady = true
                self.injectMarkers()
            }
        }

        func injectMarkers() {
            guard let webView, ready, mapReady else { return }
            let arr = markers.map { pin in
                [
                    "noteId": pin.noteId,
                    "title": pin.title,
                    "lat": pin.lat,
                    "lng": pin.lng
                ] as [String: Any]
            }
            guard let data = try? JSONSerialization.data(withJSONObject: arr),
                  let json = String(data: data, encoding: .utf8) else { return }
            let escaped = json
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")
            webView.evaluateJavaScript("window.geoMapViewer.loadMarkers('\(escaped)');") { _, error in
                if let error {
                    Log.geoMap.error("geoMapViewer.loadMarkers failed: \(error.localizedDescription)")
                }
            }
        }
    }
}
