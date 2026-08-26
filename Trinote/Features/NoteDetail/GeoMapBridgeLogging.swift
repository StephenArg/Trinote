import Foundation
import WebKit

/// Shared logging for geo map WKWebView ↔ Swift bridge (filter Xcode console with `[markers]`).
enum GeoMapBridgeLogging {
    static func markersSummary(_ pins: [GeoMapPin]) -> String {
        guard !pins.isEmpty else { return "count=0" }
        let sample = pins.prefix(3).map { pin in
            let id = String(pin.noteId.prefix(8))
            let icon = pin.iconClass ?? "nil"
            return "\(id)@(\(pin.lat),\(pin.lng)) icon=\(icon)"
        }.joined(separator: ", ")
        return "count=\(pins.count) sample=[\(sample)]"
    }

    static func tracksSummary(_ tracks: [GeoMapTrack]) -> String {
        guard !tracks.isEmpty else { return "count=0" }
        let lineCount = tracks.reduce(0) { $0 + $1.lines.count }
        let wptCount = tracks.reduce(0) { $0 + $1.waypoints.count }
        let sample = tracks.prefix(2).map { track in
            let id = String(track.noteId.prefix(8))
            let icon = track.iconClass ?? "nil"
            return "\(id) lines=\(track.lines.count) wpt=\(track.waypoints.count) icon=\(icon) color=\(track.markerColorHex)"
        }.joined(separator: ", ")
        return "count=\(tracks.count) lines=\(lineCount) waypoints=\(wptCount) sample=[\(sample)]"
    }

    static func handleScriptMessage(name: String, body: Any?) {
        let text = (body as? String) ?? String(describing: body ?? "")
        switch name {
        case "geoMapDebugLog":
            Log.geoMap.info("[markers] \(text)")
        case "geoMapJSError":
            Log.geoMap.error("[geomap-js] \(text)")
        default:
            break
        }
    }

    static func requestMarkerStateDump(webView: WKWebView, api: String, delay: TimeInterval = 1.0) {
        let js = "try{window.\(api)&&window.\(api).debugMarkerState&&window.\(api).debugMarkerState();}catch(e){'error:'+e;}"
        DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
            webView.evaluateJavaScript(js) { result, error in
                if let error {
                    Log.geoMap.error("[markers] debugMarkerState failed: \(error.localizedDescription)")
                } else if let result {
                    Log.geoMap.info("[markers] debugMarkerState result: \(String(describing: result))")
                }
            }
            let probeJS = "try{window.\(api)&&window.\(api).debugIconProbe&&window.\(api).debugIconProbe();}catch(e){'error:'+e;}"
            webView.evaluateJavaScript(probeJS) { result, error in
                if let error {
                    Log.geoMap.error("[markers] debugIconProbe failed: \(error.localizedDescription)")
                } else if let result {
                    Log.geoMap.info("[markers] debugIconProbe result: \(String(describing: result))")
                }
            }
        }
    }
}
