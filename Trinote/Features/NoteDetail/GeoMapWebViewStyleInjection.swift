import WebKit

/// Injects bundled VersaTiles style JSON into geo map WebViews.
/// WKWebView often blocks `fetch()` for local `file://` resources, so the map engine reads this instead.
enum GeoMapWebViewStyleInjection {
    private static let bundledStylePath = "vendor/geomap-styles/versatiles-colorful.json"

    static func inject(into userContentController: WKUserContentController) {
        guard let script = makeUserScript() else { return }
        userContentController.addUserScript(script)
    }

    private static func makeUserScript() -> WKUserScript? {
        let fileURL = Bundle.main.bundleURL.appendingPathComponent(bundledStylePath)
        guard let data = try? Data(contentsOf: fileURL), !data.isEmpty else {
            Log.geoMap.error("Geo map style missing from bundle: \(bundledStylePath)")
            return nil
        }
        let encoded = data.base64EncodedString()
        let source = "window.__TRINOTE_VERSATILES_COLORFUL_STYLE_B64__='\(encoded)';"
        return WKUserScript(
            source: source,
            injectionTime: .atDocumentStart,
            forMainFrameOnly: true
        )
    }
}
