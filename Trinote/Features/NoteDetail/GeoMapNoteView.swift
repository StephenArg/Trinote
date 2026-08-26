import SwiftUI
import UIKit
import WebKit

struct GeoMapNoteView: View {
    let viewportJSON: String
    let markers: [GeoMapPin]
    let tracks: [GeoMapTrack]
    let settingsJSON: String
    var onOpenPinNote: ((String) -> Void)?
    var onFeatureSelected: ((String, GeoMapFeatureKind, GeoMapMarkFocus?) -> Void)?
    var onSelectionCleared: (() -> Void)?

    init(
        viewportJSON: String,
        markers: [GeoMapPin],
        tracks: [GeoMapTrack] = [],
        settingsJSON: String = "{}",
        onOpenPinNote: ((String) -> Void)? = nil,
        onFeatureSelected: ((String, GeoMapFeatureKind, GeoMapMarkFocus?) -> Void)? = nil,
        onSelectionCleared: (() -> Void)? = nil
    ) {
        self.viewportJSON = viewportJSON
        self.markers = markers
        self.tracks = tracks
        self.settingsJSON = settingsJSON
        self.onOpenPinNote = onOpenPinNote
        self.onFeatureSelected = onFeatureSelected
        self.onSelectionCleared = onSelectionCleared
    }

    var body: some View {
        GeoMapWebView(
            viewportJSON: viewportJSON,
            markers: markers,
            tracks: tracks,
            settingsJSON: settingsJSON,
            onOpenPinNote: onOpenPinNote,
            onFeatureSelected: onFeatureSelected,
            onSelectionCleared: onSelectionCleared
        )
    }
}

private struct GeoMapWebView: UIViewRepresentable {
    let viewportJSON: String
    let markers: [GeoMapPin]
    let tracks: [GeoMapTrack]
    let settingsJSON: String
    let onOpenPinNote: ((String) -> Void)?
    let onFeatureSelected: ((String, GeoMapFeatureKind, GeoMapMarkFocus?) -> Void)?
    let onSelectionCleared: (() -> Void)?

    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> UIView {
        let container = UIView()
        container.backgroundColor = .clear
        container.clipsToBounds = true

        let uc = WKUserContentController()
        GeoMapWebViewStyleInjection.inject(into: uc)
        GeoMapWebViewBoxiconsInjection.inject(into: uc)
        uc.add(context.coordinator, name: "geoMapViewerReady")
        uc.add(context.coordinator, name: "geoMapViewerOpenNote")
        uc.add(context.coordinator, name: "geoMapFeatureSelected")
        uc.add(context.coordinator, name: "geoMapSelectionCleared")
        uc.add(context.coordinator, name: "geoMapJSError")
        uc.add(context.coordinator, name: "geoMapDebugLog")
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
        context.coordinator.tracks = tracks
        context.coordinator.settingsJSON = settingsJSON
        context.coordinator.onOpenPinNote = onOpenPinNote
        context.coordinator.onFeatureSelected = onFeatureSelected
        context.coordinator.onSelectionCleared = onSelectionCleared
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
        context.coordinator.tracks = tracks
        context.coordinator.viewportJSON = viewportJSON
        context.coordinator.settingsJSON = settingsJSON
        context.coordinator.onOpenPinNote = onOpenPinNote
        context.coordinator.onFeatureSelected = onFeatureSelected
        context.coordinator.onSelectionCleared = onSelectionCleared
        if context.coordinator.ready {
            context.coordinator.syncFromSwiftUIIfNeeded()
        }
        context.coordinator.invalidateMapIfBoundsChanged(containerBounds: container.bounds)
    }

    static func dismantleUIView(_ uiView: UIView, coordinator: Coordinator) {
        let uc = coordinator.webView?.configuration.userContentController
        uc?.removeScriptMessageHandler(forName: "geoMapViewerReady")
        uc?.removeScriptMessageHandler(forName: "geoMapViewerOpenNote")
        uc?.removeScriptMessageHandler(forName: "geoMapFeatureSelected")
        uc?.removeScriptMessageHandler(forName: "geoMapSelectionCleared")
        uc?.removeScriptMessageHandler(forName: "geoMapJSError")
        uc?.removeScriptMessageHandler(forName: "geoMapDebugLog")
    }

    class Coordinator: NSObject, WKScriptMessageHandler {
        var viewportJSON = ""
        var markers: [GeoMapPin] = []
        var tracks: [GeoMapTrack] = []
        var settingsJSON = "{}"
        var onOpenPinNote: ((String) -> Void)?
        var onFeatureSelected: ((String, GeoMapFeatureKind, GeoMapMarkFocus?) -> Void)?
        var onSelectionCleared: (() -> Void)?
        weak var webView: WKWebView?
        var ready = false
        private var mapReady = false
        private var lastMarkersFP = ""
        private var lastTracksFP = ""
        private var lastSettingsJSON = ""
        private var lastInvalidateBounds: CGRect = .null

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "geoMapViewerReady":
                ready = true
                runJSInitOnce()
            case "geoMapViewerOpenNote":
                guard let noteId = message.body as? String, !noteId.isEmpty else { return }
                DispatchQueue.main.async { [weak self] in self?.onOpenPinNote?(noteId) }
            case "geoMapFeatureSelected":
                guard let body = message.body as? String,
                      let data = body.data(using: .utf8),
                      let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                      let noteId = dict["noteId"] as? String,
                      let kindRaw = dict["kind"] as? String,
                      let kind = GeoMapFeatureKind(rawValue: kindRaw) else { return }
                var markFocus: GeoMapMarkFocus?
                if let markId = dict["markId"] as? String,
                   let lat = dict["lat"] as? Double,
                   let lng = dict["lng"] as? Double {
                    markFocus = GeoMapMarkFocus(noteId: noteId, markId: markId, lat: lat, lng: lng)
                }
                DispatchQueue.main.async { [weak self] in
                    self?.onFeatureSelected?(noteId, kind, markFocus)
                }
            case "geoMapSelectionCleared":
                DispatchQueue.main.async { [weak self] in self?.onSelectionCleared?() }
            case "geoMapJSError", "geoMapDebugLog":
                let msg = (message.body as? String) ?? "unknown"
                GeoMapBridgeLogging.handleScriptMessage(name: message.name, body: msg)
            default:
                break
            }
        }

        func runJSInitOnce() {
            guard let webView, ready, !mapReady else { return }
            guard let markersJSON = Self.markersJSON(markers),
                  let tracksJSON = Self.tracksJSON(tracks) else {
                Log.geoMap.error("geoMapViewer init JSON encoding failed")
                return
            }
            let js = """
            window.geoMapViewer.init(\(viewportJSON), \(settingsJSON));
            window.geoMapViewer.loadMarkersData(\(markersJSON));
            window.geoMapViewer.loadTracksData(\(tracksJSON));
            """
            Log.geoMap.info(
                "[markers] Swift viewer init pins=\(GeoMapBridgeLogging.markersSummary(self.markers)) tracks=\(GeoMapBridgeLogging.tracksSummary(self.tracks))"
            )
            webView.evaluateJavaScript(js) { _, error in
                if let error {
                    Log.geoMap.error("geoMapViewer.init JS failed: \(error.localizedDescription)")
                }
                self.mapReady = true
                self.lastMarkersFP = Self.markersFingerprint(self.markers)
                self.lastTracksFP = Self.tracksFingerprint(self.tracks)
                self.lastSettingsJSON = self.settingsJSON
                if error == nil {
                    GeoMapBridgeLogging.requestMarkerStateDump(webView: webView, api: "geoMapViewer")
                }
            }
        }

        func syncFromSwiftUIIfNeeded() {
            guard let webView, ready, mapReady else { return }
            let markerFP = Self.markersFingerprint(markers)
            if markerFP != lastMarkersFP {
                lastMarkersFP = markerFP
                Log.geoMap.info("[markers] Swift viewer sync pins → JS \(GeoMapBridgeLogging.markersSummary(self.markers))")
                if let markersJSON = Self.markersJSON(markers) {
                    webView.evaluateJavaScript("window.geoMapViewer.loadMarkersData(\(markersJSON));")
                }
            }
            let trackFP = Self.tracksFingerprint(tracks)
            if trackFP != lastTracksFP {
                lastTracksFP = trackFP
                Log.geoMap.info("[markers] Swift viewer sync tracks → JS \(GeoMapBridgeLogging.tracksSummary(self.tracks))")
                if let tracksJSON = Self.tracksJSON(tracks) {
                    webView.evaluateJavaScript("window.geoMapViewer.loadTracksData(\(tracksJSON));")
                }
            }
            if settingsJSON != lastSettingsJSON {
                lastSettingsJSON = settingsJSON
                webView.evaluateJavaScript("window.geoMapViewer.applySettings(\(settingsJSON));")
            }
        }

        func invalidateMapIfBoundsChanged(containerBounds: CGRect) {
            guard mapReady, let webView else { return }
            guard containerBounds.width > 1, containerBounds.height > 1 else { return }
            if lastInvalidateBounds.width > 0,
               abs(containerBounds.width - lastInvalidateBounds.width) < 0.5,
               abs(containerBounds.height - lastInvalidateBounds.height) < 0.5 { return }
            lastInvalidateBounds = containerBounds
            webView.evaluateJavaScript("try{window.geoMapViewer.invalidateSize();}catch(e){}")
        }

        private static func markersFingerprint(_ pins: [GeoMapPin]) -> String {
            pins.map { "\($0.noteId)|\($0.title)|\($0.lat)|\($0.lng)|\($0.markerColorHex)|\($0.iconClass ?? "")" }.sorted().joined(separator: "\u{1e}")
        }

        private static func tracksFingerprint(_ tracks: [GeoMapTrack]) -> String {
            tracks.map { "\($0.noteId)|\($0.title)|\($0.summaryTitle)|\($0.lines.count)|\($0.waypoints.count)|\($0.markerColorHex)|\($0.iconClass ?? "")" }.sorted().joined()
        }

        private static func markersJSON(_ pins: [GeoMapPin]) -> String? {
            let arr = pins.map { pin -> [String: Any] in
                var dict: [String: Any] = [
                    "noteId": pin.noteId,
                    "title": pin.title,
                    "lat": pin.lat,
                    "lng": pin.lng,
                    "color": pin.markerColorHex,
                    "iconClass": pin.iconClass ?? GeoMapMarkerIconClass.forNote(type: .text, mime: "", iconClassLabel: nil, childNoteCount: 0),
                ]
                return dict
            }
            guard let data = try? JSONSerialization.data(withJSONObject: arr),
                  let s = String(data: data, encoding: .utf8) else { return nil }
            return s
        }

        private static func tracksJSON(_ tracks: [GeoMapTrack]) -> String? {
            let arr = tracks.map { track -> [String: Any] in
                var dict: [String: Any] = [
                    "noteId": track.noteId,
                    "title": track.title,
                    "summaryTitle": track.summaryTitle,
                    "lineNames": track.lineNames,
                    "lines": track.lines,
                    "color": track.markerColorHex,
                    "waypoints": track.waypoints.map { waypoint -> [String: Any] in
                        var wpt: [String: Any] = ["lng": waypoint.lng, "lat": waypoint.lat]
                        if let name = waypoint.name, !name.isEmpty { wpt["name"] = name }
                        return wpt
                    },
                ]
                if let icon = track.iconClass { dict["iconClass"] = icon }
                return dict
            }
            guard let data = try? JSONSerialization.data(withJSONObject: arr),
                  let s = String(data: data, encoding: .utf8) else { return nil }
            return s
        }

        private static func jsonEscaped(_ raw: String) -> String {
            raw.replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")
        }
    }
}
