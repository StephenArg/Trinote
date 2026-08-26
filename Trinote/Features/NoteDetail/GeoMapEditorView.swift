import SwiftUI
import UIKit
import WebKit

final class GeoMapEditorBridge: ObservableObject {
    fileprivate weak var coordinator: GeoMapEditorView.Coordinator?

    func getViewport(completion: @escaping (String) -> Void) {
        guard let coordinator else { completion("{}"); return }
        coordinator.getViewport(completion: completion)
    }

    func addPin(noteId: String, title: String, lat: Double, lng: Double, color: String? = nil) {
        coordinator?.addPin(noteId: noteId, title: title, lat: lat, lng: lng, color: color)
    }

    func removePin(noteId: String) {
        coordinator?.removePin(noteId: noteId)
    }

    func applySettings(_ json: String) {
        coordinator?.applySettings(json)
    }

    func loadTracks(_ json: String) {
        coordinator?.loadTracks(json)
    }

    func set3DEnabled(_ enabled: Bool) {
        coordinator?.set3DEnabled(enabled)
    }

    func selectFeature(noteId: String, kind: GeoMapFeatureKind) {
        coordinator?.selectFeature(noteId: noteId, kind: kind)
    }

    func clearSelection() {
        coordinator?.clearSelection()
    }

    func beginMovePin(noteId: String) {
        coordinator?.beginMovePin(noteId: noteId)
    }

    func focusTrackMark(_ focus: GeoMapMarkFocus) {
        coordinator?.focusTrackMark(focus)
    }
}

struct GeoMapEditorView: UIViewRepresentable {
    let viewportJSON: String
    let markers: [GeoMapPin]
    let tracks: [GeoMapTrack]
    let settingsJSON: String
    let bridge: GeoMapEditorBridge
    var onCreatePin: ((_ lat: Double, _ lng: Double) -> Void)?
    var onMovePin: ((_ noteId: String, _ lat: Double, _ lng: Double) -> Void)?
    var onRemovePin: ((_ noteId: String) -> Void)?
    var onViewportChanged: ((_ json: String) -> Void)?
    var onOpenPinNote: ((_ noteId: String) -> Void)?
    var onFeatureSelected: ((_ noteId: String, _ kind: GeoMapFeatureKind, _ markFocus: GeoMapMarkFocus?) -> Void)?
    var onSelectionCleared: (() -> Void)?
    var onImportGpxRequested: (() -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(
            viewportJSON: viewportJSON,
            markers: markers,
            tracks: tracks,
            settingsJSON: settingsJSON,
            onCreatePin: onCreatePin,
            onMovePin: onMovePin,
            onRemovePin: onRemovePin,
            onViewportChanged: onViewportChanged,
            onOpenPinNote: onOpenPinNote,
            onFeatureSelected: onFeatureSelected,
            onSelectionCleared: onSelectionCleared,
            onImportGpxRequested: onImportGpxRequested
        )
    }

    func makeUIView(context: Context) -> UIView {
        let coordinator = context.coordinator
        bridge.coordinator = coordinator

        let container = UIView()
        container.backgroundColor = .clear
        container.clipsToBounds = true

        let uc = WKUserContentController()
        GeoMapWebViewStyleInjection.inject(into: uc)
        GeoMapWebViewBoxiconsInjection.inject(into: uc)
        uc.add(coordinator, name: "geoMapEditorReady")
        uc.add(coordinator, name: "geoMapCreatePin")
        uc.add(coordinator, name: "geoMapPinMoved")
        uc.add(coordinator, name: "geoMapPinRemoved")
        uc.add(coordinator, name: "geoMapViewportChanged")
        uc.add(coordinator, name: "geoMapOpenPinNote")
        uc.add(coordinator, name: "geoMapJSError")
        uc.add(coordinator, name: "geoMapDebugLog")
        uc.add(coordinator, name: "geoMapFeatureSelected")
        uc.add(coordinator, name: "geoMapSelectionCleared")
        uc.add(coordinator, name: "geoMapImportGpxRequested")
        uc.add(coordinator, name: "geoMap3DChanged")

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
        context.coordinator.onFeatureSelected = onFeatureSelected
        context.coordinator.onSelectionCleared = onSelectionCleared
        context.coordinator.onImportGpxRequested = onImportGpxRequested
        context.coordinator.latestViewportJSON = viewportJSON
        context.coordinator.latestMarkers = markers
        context.coordinator.latestTracks = tracks
        context.coordinator.latestSettingsJSON = settingsJSON
        context.coordinator.syncFromSwiftUIIfNeeded()
        context.coordinator.invalidateMapIfBoundsChanged(containerBounds: container.bounds)
    }

    static func dismantleUIView(_ container: UIView, coordinator: Coordinator) {
        guard let webView = coordinator.webView else { return }
        let uc = webView.configuration.userContentController
        for name in [
            "geoMapEditorReady", "geoMapCreatePin", "geoMapPinMoved", "geoMapPinRemoved",
            "geoMapViewportChanged", "geoMapOpenPinNote", "geoMapJSError", "geoMapDebugLog",
            "geoMapFeatureSelected", "geoMapSelectionCleared", "geoMapImportGpxRequested", "geoMap3DChanged"
        ] {
            uc.removeScriptMessageHandler(forName: name)
        }
    }

    // MARK: - Coordinator

    class Coordinator: NSObject, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var onCreatePin: ((_ lat: Double, _ lng: Double) -> Void)?
        var onMovePin: ((_ noteId: String, _ lat: Double, _ lng: Double) -> Void)?
        var onRemovePin: ((_ noteId: String) -> Void)?
        var onViewportChanged: ((_ json: String) -> Void)?
        var onOpenPinNote: ((_ noteId: String) -> Void)?
        var onFeatureSelected: ((_ noteId: String, _ kind: GeoMapFeatureKind, _ markFocus: GeoMapMarkFocus?) -> Void)?
        var onSelectionCleared: (() -> Void)?
        var onImportGpxRequested: (() -> Void)?
        var latestViewportJSON: String
        var latestMarkers: [GeoMapPin]
        var latestTracks: [GeoMapTrack]
        var latestSettingsJSON: String
        private var lastSyncedMarkersFingerprint = ""
        private var lastSyncedTracksFingerprint = ""
        private var lastSyncedSettingsJSON = ""
        private var editorReady = false
        private var mapReady = false
        private var lastInvalidateBounds: CGRect = .null

        init(viewportJSON: String, markers: [GeoMapPin], tracks: [GeoMapTrack], settingsJSON: String,
             onCreatePin: ((_ lat: Double, _ lng: Double) -> Void)?,
             onMovePin: ((_ noteId: String, _ lat: Double, _ lng: Double) -> Void)?,
             onRemovePin: ((_ noteId: String) -> Void)?,
             onViewportChanged: ((_ json: String) -> Void)?,
             onOpenPinNote: ((_ noteId: String) -> Void)?,
             onFeatureSelected: ((_ noteId: String, _ kind: GeoMapFeatureKind, _ markFocus: GeoMapMarkFocus?) -> Void)?,
             onSelectionCleared: (() -> Void)?,
             onImportGpxRequested: (() -> Void)?) {
            self.latestViewportJSON = viewportJSON
            self.latestMarkers = markers
            self.latestTracks = tracks
            self.latestSettingsJSON = settingsJSON
            self.onCreatePin = onCreatePin
            self.onMovePin = onMovePin
            self.onRemovePin = onRemovePin
            self.onViewportChanged = onViewportChanged
            self.onOpenPinNote = onOpenPinNote
            self.onFeatureSelected = onFeatureSelected
            self.onSelectionCleared = onSelectionCleared
            self.onImportGpxRequested = onImportGpxRequested
        }

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "geoMapEditorReady":
                editorReady = true
                mapReady = false
                lastSyncedMarkersFingerprint = ""
                lastSyncedTracksFingerprint = ""
                lastSyncedSettingsJSON = ""
                lastInvalidateBounds = .null
                injectInitialState()

            case "geoMapJSError", "geoMapDebugLog":
                let msg = (message.body as? String) ?? "unknown"
                GeoMapBridgeLogging.handleScriptMessage(name: message.name, body: msg)

            case "geoMapCreatePin":
                guard let body = message.body as? String,
                      let data = body.data(using: .utf8),
                      let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                      let lat = dict["lat"] as? Double,
                      let lng = dict["lng"] as? Double else { return }
                DispatchQueue.main.async { [weak self] in self?.onCreatePin?(lat, lng) }

            case "geoMapPinMoved":
                guard let body = message.body as? String,
                      let data = body.data(using: .utf8),
                      let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                      let noteId = dict["noteId"] as? String,
                      let lat = dict["lat"] as? Double,
                      let lng = dict["lng"] as? Double else { return }
                DispatchQueue.main.async { [weak self] in self?.onMovePin?(noteId, lat, lng) }

            case "geoMapPinRemoved":
                guard let body = message.body as? String,
                      let data = body.data(using: .utf8),
                      let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                      let noteId = dict["noteId"] as? String else { return }
                DispatchQueue.main.async { [weak self] in self?.onRemovePin?(noteId) }

            case "geoMapViewportChanged":
                guard let json = message.body as? String else { return }
                DispatchQueue.main.async { [weak self] in self?.onViewportChanged?(json) }

            case "geoMapOpenPinNote":
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

            case "geoMapImportGpxRequested":
                DispatchQueue.main.async { [weak self] in self?.onImportGpxRequested?() }

            case "geoMap3DChanged":
                break

            default:
                break
            }
        }

        private static func markersFingerprint(_ pins: [GeoMapPin]) -> String {
            pins.map { "\($0.noteId)|\($0.title)|\($0.lat)|\($0.lng)|\($0.markerColorHex)|\($0.iconClass ?? "")" }.sorted().joined(separator: "\u{1e}")
        }

        private static func tracksFingerprint(_ tracks: [GeoMapTrack]) -> String {
            tracks.map { "\($0.noteId)|\($0.title)|\($0.summaryTitle)|\($0.lines.count)|\($0.waypoints.count)|\($0.markerColorHex)|\($0.iconClass ?? "")" }.sorted().joined(separator: "\u{1e}")
        }

        func invalidateMapIfBoundsChanged(containerBounds: CGRect) {
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

        func syncFromSwiftUIIfNeeded() {
            guard editorReady, mapReady, let webView else { return }
            let markerFP = Self.markersFingerprint(latestMarkers)
            if markerFP != lastSyncedMarkersFingerprint {
                lastSyncedMarkersFingerprint = markerFP
                Log.geoMap.info("[geo-map-debug] Swift sync pins → JS count=\(self.latestMarkers.count)")
                if let markersJSON = Self.markersJSONArray(latestMarkers) {
                    webView.evaluateJavaScript("window.geoMapEditor.loadMarkersData(\(markersJSON));") { _, error in
                        if let error { Log.geoMap.error("geoMapEditor.loadMarkers sync failed: \(error.localizedDescription)") }
                    }
                }
            }
            let trackFP = Self.tracksFingerprint(latestTracks)
            if trackFP != lastSyncedTracksFingerprint {
                lastSyncedTracksFingerprint = trackFP
                Log.geoMap.info("[geo-map-debug] Swift sync tracks → JS count=\(self.latestTracks.count)")
                if let tracksJSON = Self.tracksJSONArray(latestTracks) {
                    webView.evaluateJavaScript("window.geoMapEditor.loadTracksData(\(tracksJSON));") { _, error in
                        if let error { Log.geoMap.error("geoMapEditor.loadTracks sync failed: \(error.localizedDescription)") }
                    }
                }
            }
            if latestSettingsJSON != lastSyncedSettingsJSON {
                lastSyncedSettingsJSON = latestSettingsJSON
                Log.geoMap.info("[geo-map-debug] Swift sync settings → JS")
                webView.evaluateJavaScript("window.geoMapEditor.applySettings('\(Self.jsonEscaped(latestSettingsJSON))');") { _, error in
                    if let error { Log.geoMap.error("geoMapEditor.applySettings sync failed: \(error.localizedDescription)") }
                }
            }
        }

        private static func markersJSONArray(_ pins: [GeoMapPin]) -> String? {
            let arr = pins.map { pin -> [String: Any] in
                var dict: [String: Any] = [
                    "noteId": pin.noteId, "title": pin.title,
                    "lat": pin.lat, "lng": pin.lng,
                    "color": pin.markerColorHex,
                    "iconClass": pin.iconClass ?? GeoMapMarkerIconClass.forNote(type: .text, mime: "", iconClassLabel: nil, childNoteCount: 0),
                ]
                return dict
            }
            return jsonString(arr)
        }

        private static func tracksJSONArray(_ tracks: [GeoMapTrack]) -> String? {
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
            return jsonString(arr)
        }

        private static func jsonString(_ object: Any) -> String? {
            guard let data = try? JSONSerialization.data(withJSONObject: object) else { return nil }
            return String(data: data, encoding: .utf8)
        }

        private static func jsonEscaped(_ raw: String) -> String {
            raw.replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")
        }

        func injectInitialState() {
            guard editorReady, let webView else { return }
            guard let markersJSON = Self.markersJSONArray(latestMarkers),
                  let tracksJSON = Self.tracksJSONArray(latestTracks) else {
                Log.geoMap.error("GeoMapEditor init JSON encoding failed")
                return
            }
            let js = """
            window.geoMapEditor.init(\(latestViewportJSON), \(latestSettingsJSON));
            window.geoMapEditor.loadMarkersData(\(markersJSON));
            window.geoMapEditor.loadTracksData(\(tracksJSON));
            """
            Log.geoMap.info(
                "[markers] Swift inject init pins=\(GeoMapBridgeLogging.markersSummary(self.latestMarkers)) tracks=\(GeoMapBridgeLogging.tracksSummary(self.latestTracks))"
            )
            webView.evaluateJavaScript(js) { _, error in
                if let error {
                    Log.geoMap.error("GeoMapEditor init JS FAILED: \(error.localizedDescription)")
                } else {
                    self.mapReady = true
                    self.lastSyncedMarkersFingerprint = Self.markersFingerprint(self.latestMarkers)
                    self.lastSyncedTracksFingerprint = Self.tracksFingerprint(self.latestTracks)
                    self.lastSyncedSettingsJSON = self.latestSettingsJSON
                    self.bumpInvalidateSize()
                }
            }
        }

        private func bumpInvalidateSize() {
            guard let webView else { return }
            let bump = "try{window.geoMapEditor&&window.geoMapEditor.invalidateSize&&window.geoMapEditor.invalidateSize();}catch(e){}"
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) { webView.evaluateJavaScript(bump, completionHandler: nil) }
        }

        func addPin(noteId: String, title: String, lat: Double, lng: Double, color: String? = nil) {
            guard editorReady, mapReady, let webView else { return }
            let safeTitle = Self.jsonEscaped(title)
            let colorArg = color.map { "'\(Self.jsonEscaped($0))'" } ?? "null"
            webView.evaluateJavaScript(
                "window.geoMapEditor.addPin('\(noteId)', '\(safeTitle)', \(lat), \(lng), \(colorArg));"
            ) { _, error in
                if let error { Log.geoMap.error("geoMapEditor.addPin failed: \(error.localizedDescription)") }
            }
        }

        func removePin(noteId: String) {
            guard editorReady, mapReady, let webView else { return }
            let escaped = Self.jsonEscaped(noteId)
            webView.evaluateJavaScript("window.geoMapEditor.removePin('\(escaped)');") { _, error in
                if let error { Log.geoMap.error("geoMapEditor.removePin failed: \(error.localizedDescription)") }
            }
        }

        func applySettings(_ json: String) {
            guard editorReady, mapReady, let webView else { return }
            webView.evaluateJavaScript("window.geoMapEditor.applySettings('\(Self.jsonEscaped(json))');") { _, error in
                if let error { Log.geoMap.error("geoMapEditor.applySettings failed: \(error.localizedDescription)") }
            }
        }

        func loadTracks(_ json: String) {
            guard editorReady, mapReady, let webView else { return }
            webView.evaluateJavaScript("window.geoMapEditor.loadTracksData(\(json));") { _, error in
                if let error { Log.geoMap.error("geoMapEditor.loadTracks failed: \(error.localizedDescription)") }
            }
        }

        func set3DEnabled(_ enabled: Bool) {
            guard editorReady, mapReady, let webView else { return }
            webView.evaluateJavaScript("window.geoMapEditor.set3DEnabled(\(enabled));", completionHandler: nil)
        }

        func selectFeature(noteId: String, kind: GeoMapFeatureKind) {
            guard editorReady, mapReady, let webView else { return }
            webView.evaluateJavaScript(
                "window.geoMapEditor.selectFeature('\(noteId)', '\(kind.rawValue)');",
                completionHandler: nil
            )
        }

        func clearSelection() {
            guard editorReady, mapReady, let webView else { return }
            webView.evaluateJavaScript("window.geoMapEditor.clearSelection();", completionHandler: nil)
        }

        func beginMovePin(noteId: String) {
            guard editorReady, mapReady, let webView else { return }
            webView.evaluateJavaScript("window.geoMapEditor.beginMovePin('\(noteId)');", completionHandler: nil)
        }

        func focusTrackMark(_ focus: GeoMapMarkFocus) {
            guard editorReady, mapReady, let webView else { return }
            let escapedMarkId = Self.jsonEscaped(focus.markId)
            let escapedNoteId = Self.jsonEscaped(focus.noteId)
            webView.evaluateJavaScript(
                "window.geoMapEditor.focusTrackMark('\(escapedNoteId)', '\(escapedMarkId)', \(focus.lng), \(focus.lat));",
                completionHandler: nil
            )
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

extension GeoMapEditorView: Equatable {
    static func == (lhs: GeoMapEditorView, rhs: GeoMapEditorView) -> Bool {
        lhs.viewportJSON == rhs.viewportJSON
            && lhs.markers == rhs.markers
            && lhs.tracks == rhs.tracks
            && lhs.settingsJSON == rhs.settingsJSON
    }
}
