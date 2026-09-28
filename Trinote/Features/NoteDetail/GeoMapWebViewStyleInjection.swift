import WebKit

/// Injects the bundled VersaTiles styles into geo map WebViews, keyed by name (`colorful`, `eclipse`, …).
/// WKWebView often blocks `fetch()` for local `file://` resources, so the map engine reads these instead. Each stays
/// base64 until the map draws with it.
@MainActor
enum GeoMapWebViewStyleInjection {
    static let styleNames = ["colorful", "eclipse", "graybeard", "neutrino", "shadow"]

    static func bundledStylePath(_ name: String) -> String {
        "vendor/geomap-styles/versatiles-\(name).json"
    }

    static func inject(into userContentController: WKUserContentController) {
        userContentController.addUserScript(userScript)
    }

    /// Built once: the styles never change while the app runs.
    private static let userScript: WKUserScript = {
        var entries: [String] = []
        for name in styleNames {
            let fileURL = Bundle.main.bundleURL.appendingPathComponent(bundledStylePath(name))
            guard let data = try? Data(contentsOf: fileURL), !data.isEmpty else {
                Log.geoMap.error("Geo map style missing from bundle: \(bundledStylePath(name))")
                continue
            }
            entries.append("\"\(name)\":\"\(data.base64EncodedString())\"")
        }
        return WKUserScript(
            source: "window.__TRINOTE_VERSATILES_STYLES_B64__={\(entries.joined(separator: ","))};",
            injectionTime: .atDocumentStart,
            forMainFrameOnly: true
        )
    }()
}
