import SwiftUI
import UIKit
import WebKit

final class GeoMapEditorBridge: ObservableObject {
    fileprivate weak var coordinator: GeoMapEditorView.Coordinator?

    func getViewport(completion: @escaping (String) -> Void) {
        guard let coordinator else { completion("{}"); return }
        coordinator.getViewport(completion: completion)
    }

    func addPin(noteId: String, title: String, lat: Double, lng: Double) {
        coordinator?.addPin(noteId: noteId, title: title, lat: lat, lng: lng)
    }

    func removePin(noteId: String) {
        coordinator?.removePin(noteId: noteId)
    }
}

struct GeoMapEditorView: UIViewRepresentable {
    let viewportJSON: String
    let markers: [GeoMapPin]
    let bridge: GeoMapEditorBridge
    var onCreatePin: ((_ lat: Double, _ lng: Double) -> Void)?
    var onMovePin: ((_ noteId: String, _ lat: Double, _ lng: Double) -> Void)?
    var onRemovePin: ((_ noteId: String) -> Void)?
    var onViewportChanged: ((_ json: String) -> Void)?
    var onOpenPinNote: ((_ noteId: String) -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(
            viewportJSON: viewportJSON,
            markers: markers,
            onCreatePin: onCreatePin,
            onMovePin: onMovePin,
            onRemovePin: onRemovePin,
            onViewportChanged: onViewportChanged,
            onOpenPinNote: onOpenPinNote
        )
    }

    func makeUIView(context: Context) -> UIView {
        let coordinator = context.coordinator
        bridge.coordinator = coordinator

        let container = UIView()
        container.backgroundColor = .clear
        container.clipsToBounds = true

        let uc = WKUserContentController()
        uc.add(coordinator, name: "geoMapEditorReady")
        uc.add(coordinator, name: "geoMapCreatePin")
        uc.add(coordinator, name: "geoMapPinMoved")
        uc.add(coordinator, name: "geoMapPinRemoved")
        uc.add(coordinator, name: "geoMapViewportChanged")
        uc.add(coordinator, name: "geoMapOpenPinNote")
        uc.add(coordinator, name: "geoMapJSError")

        let config = WKWebViewConfiguration()
        config.userContentController = uc
        config.defaultWebpagePreferences.allowsContentJavaScript = true

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
        coordinator.webView = webView

        container.addSubview(webView)
        webView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: container.topAnchor),
            webView.bottomAnchor.constraint(equalTo: container.bottomAnchor),
            webView.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: container.trailingAnchor)
        ])

        if let fileURL = Bundle.main.url(forResource: "geomap-editor", withExtension: "html") {
            Log.geoMap.info("GeoMapEditor makeUIView: loading \(fileURL.lastPathComponent), viewport=\(viewportJSON.prefix(80))")
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        } else {
            Log.geoMap.error("geomap-editor.html missing from app bundle")
        }
        return container
    }

    func updateUIView(_ container: UIView, context: Context) {
        context.coordinator.onCreatePin = onCreatePin
        context.coordinator.onMovePin = onMovePin
        context.coordinator.onRemovePin = onRemovePin
        context.coordinator.onViewportChanged = onViewportChanged
        context.coordinator.onOpenPinNote = onOpenPinNote
        context.coordinator.latestViewportJSON = viewportJSON
        context.coordinator.latestMarkers = markers
        context.coordinator.syncMarkersFromSwiftUIIfNeeded()
        context.coordinator.invalidateLeafletIfBoundsChanged(containerBounds: container.bounds)
    }

    static func dismantleUIView(_ container: UIView, coordinator: Coordinator) {
        guard let webView = coordinator.webView else { return }
        let uc = webView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: "geoMapEditorReady")
        uc.removeScriptMessageHandler(forName: "geoMapCreatePin")
        uc.removeScriptMessageHandler(forName: "geoMapPinMoved")
        uc.removeScriptMessageHandler(forName: "geoMapPinRemoved")
        uc.removeScriptMessageHandler(forName: "geoMapViewportChanged")
        uc.removeScriptMessageHandler(forName: "geoMapOpenPinNote")
        uc.removeScriptMessageHandler(forName: "geoMapJSError")
    }

    // MARK: - Coordinator

    class Coordinator: NSObject, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var onCreatePin: ((_ lat: Double, _ lng: Double) -> Void)?
        var onMovePin: ((_ noteId: String, _ lat: Double, _ lng: Double) -> Void)?
        var onRemovePin: ((_ noteId: String) -> Void)?
        var onViewportChanged: ((_ json: String) -> Void)?
        var onOpenPinNote: ((_ noteId: String) -> Void)?
        private let initialMarkers: [GeoMapPin]
        /// Updated from SwiftUI so the first `injectMarkers` uses the latest viewport when content loads async.
        var latestViewportJSON: String
        /// Current pins from SwiftUI (`loadGeoMapPins` may finish after the web page is ready).
        var latestMarkers: [GeoMapPin]
        private var lastSyncedMarkersFingerprint = ""
        private var editorReady = false
        private var mapReady = false
        /// Last container size we told Leaflet about (WKWebView often starts at 0×0 before SwiftUI lays out).
        private var lastInvalidateBounds: CGRect = .null

        init(viewportJSON: String, markers: [GeoMapPin],
             onCreatePin: ((_ lat: Double, _ lng: Double) -> Void)?,
             onMovePin: ((_ noteId: String, _ lat: Double, _ lng: Double) -> Void)?,
             onRemovePin: ((_ noteId: String) -> Void)?,
             onViewportChanged: ((_ json: String) -> Void)?,
             onOpenPinNote: ((_ noteId: String) -> Void)?) {
            self.latestViewportJSON = viewportJSON
            self.latestMarkers = markers
            self.initialMarkers = markers
            self.onCreatePin = onCreatePin
            self.onMovePin = onMovePin
            self.onRemovePin = onRemovePin
            self.onViewportChanged = onViewportChanged
            self.onOpenPinNote = onOpenPinNote
        }

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "geoMapEditorReady":
                editorReady = true
                mapReady = false
                lastSyncedMarkersFingerprint = ""
                lastInvalidateBounds = .null
                let wvFrame = webView?.frame ?? .zero
                let markerCount = self.latestMarkers.count
                let vpPrefix = String(self.latestViewportJSON.prefix(80))
                Log.geoMap.info("GeoMapEditor READY: webViewFrame=\(wvFrame.width)×\(wvFrame.height) markers=\(markerCount) viewport=\(vpPrefix)")
                injectMarkers(latestMarkers)

            case "geoMapJSError":
                let msg = (message.body as? String) ?? "unknown"
                Log.geoMap.error("GeoMapEditor JS_ERROR: \(msg)")

            case "geoMapCreatePin":
                guard let body = message.body as? String,
                      let data = body.data(using: .utf8),
                      let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                      let lat = dict["lat"] as? Double,
                      let lng = dict["lng"] as? Double else { return }
                DispatchQueue.main.async { [weak self] in
                    self?.onCreatePin?(lat, lng)
                }

            case "geoMapPinMoved":
                guard let body = message.body as? String,
                      let data = body.data(using: .utf8),
                      let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                      let noteId = dict["noteId"] as? String,
                      let lat = dict["lat"] as? Double,
                      let lng = dict["lng"] as? Double else { return }
                DispatchQueue.main.async { [weak self] in
                    self?.onMovePin?(noteId, lat, lng)
                }

            case "geoMapPinRemoved":
                guard let body = message.body as? String,
                      let data = body.data(using: .utf8),
                      let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                      let noteId = dict["noteId"] as? String else { return }
                DispatchQueue.main.async { [weak self] in
                    self?.onRemovePin?(noteId)
                }

            case "geoMapViewportChanged":
                guard let json = message.body as? String else { return }
                DispatchQueue.main.async { [weak self] in
                    self?.onViewportChanged?(json)
                }

            case "geoMapOpenPinNote":
                guard let noteId = message.body as? String, !noteId.isEmpty else { return }
                DispatchQueue.main.async { [weak self] in
                    self?.onOpenPinNote?(noteId)
                }

            default:
                break
            }
        }

        private static func markersFingerprint(_ pins: [GeoMapPin]) -> String {
            pins.map { "\($0.noteId)|\($0.title)|\($0.lat)|\($0.lng)" }.sorted().joined(separator: "\u{1e}")
        }

        func invalidateLeafletIfBoundsChanged(containerBounds: CGRect) {
            guard mapReady, let webView else { return }
            guard containerBounds.width > 1, containerBounds.height > 1 else { return }
            if lastInvalidateBounds.width > 0,
               abs(containerBounds.width - lastInvalidateBounds.width) < 0.5,
               abs(containerBounds.height - lastInvalidateBounds.height) < 0.5 {
                return
            }
            lastInvalidateBounds = containerBounds
            webView.evaluateJavaScript(
                "try{window.geoMapEditor&&window.geoMapEditor.invalidateSize&&window.geoMapEditor.invalidateSize();}catch(e){}",
                completionHandler: nil
            )
        }

        /// When pins arrive after `geoMapEditorReady`, push them without tearing down the map.
        func syncMarkersFromSwiftUIIfNeeded() {
            guard editorReady, mapReady, let webView else { return }
            let fp = Self.markersFingerprint(latestMarkers)
            guard fp != lastSyncedMarkersFingerprint else { return }
            lastSyncedMarkersFingerprint = fp
            let markersStr = Self.jsonEscapedMarkersArray(latestMarkers)
            webView.evaluateJavaScript("window.geoMapEditor.loadMarkers('\(markersStr)');") { _, error in
                if let error {
                    Log.geoMap.error("geoMapEditor.loadMarkers (sync) failed: \(error.localizedDescription)")
                }
            }
        }

        private static func jsonEscapedMarkersArray(_ pins: [GeoMapPin]) -> String {
            let arr = pins.map { pin in
                ["noteId": pin.noteId, "title": pin.title, "lat": pin.lat, "lng": pin.lng] as [String: Any]
            }
            if let data = try? JSONSerialization.data(withJSONObject: arr),
               let s = String(data: data, encoding: .utf8) {
                return s.replacingOccurrences(of: "\\", with: "\\\\")
                    .replacingOccurrences(of: "'", with: "\\'")
                    .replacingOccurrences(of: "\n", with: "\\n")
                    .replacingOccurrences(of: "\r", with: "\\r")
            }
            return "[]"
        }

        func injectMarkers(_ pins: [GeoMapPin]) {
            guard editorReady, let webView else { return }

            let escaped = latestViewportJSON
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")

            let markersStr = Self.jsonEscapedMarkersArray(pins)

            let js = "window.geoMapEditor.init('\(escaped)'); window.geoMapEditor.loadMarkers('\(markersStr)');"
            Log.geoMap.info("GeoMapEditor injectMarkers: pins=\(pins.count) viewportLen=\(escaped.count)")
            webView.evaluateJavaScript(js) { _, error in
                if let error {
                    Log.geoMap.error("GeoMapEditor init/load JS FAILED: \(error.localizedDescription)")
                } else {
                    self.mapReady = true
                    self.lastSyncedMarkersFingerprint = Self.markersFingerprint(pins)
                    let wvFrame = webView.frame
                    Log.geoMap.info("GeoMapEditor init OK: mapReady=true webViewFrame=\(wvFrame.width)×\(wvFrame.height)")
                    let bump = "try{window.geoMapEditor&&window.geoMapEditor.invalidateSize&&window.geoMapEditor.invalidateSize();}catch(e){}"
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.05) { [weak webView] in
                        webView?.evaluateJavaScript(bump, completionHandler: nil)
                    }
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) { [weak webView] in
                        webView?.evaluateJavaScript(bump, completionHandler: nil)
                    }
                }
            }
        }

        func addPin(noteId: String, title: String, lat: Double, lng: Double) {
            guard editorReady, mapReady, let webView else { return }
            let safeTitle = title
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
            webView.evaluateJavaScript(
                "window.geoMapEditor.addPin('\(noteId)', '\(safeTitle)', \(lat), \(lng));"
            ) { _, error in
                if let error { Log.geoMap.error("geoMapEditor.addPin failed: \(error.localizedDescription)") }
            }
        }

        func removePin(noteId: String) {
            guard editorReady, mapReady, let webView else { return }
            webView.evaluateJavaScript("window.geoMapEditor.removePin('\(noteId)');") { _, error in
                if let error { Log.geoMap.error("geoMapEditor.removePin failed: \(error.localizedDescription)") }
            }
        }

        func getViewport(completion: @escaping (String) -> Void) {
            guard editorReady, mapReady, let webView else { completion("{}"); return }
            webView.callAsyncJavaScript(
                "return window.geoMapEditor.getViewport();",
                arguments: [:], in: nil, in: .page
            ) { result in
                switch result {
                case .success(let val):
                    completion(val as? String ?? "{}")
                case .failure(let err):
                    Log.geoMap.error("geoMapEditor.getViewport failed: \(err.localizedDescription)")
                    completion("{}")
                }
            }
        }
    }
}
