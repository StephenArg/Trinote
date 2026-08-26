import WebKit

/// Injects Boxicons codepoint lookup and embedded font for geo map marker icons in WKWebView.
enum GeoMapWebViewBoxiconsInjection {
    static func inject(into userContentController: WKUserContentController) {
        if let script = makeCodepointsUserScript() {
            userContentController.addUserScript(script)
        }
        if let fontScript = makeFontUserScript() {
            userContentController.addUserScript(fontScript)
            Log.geoMap.info("[markers] injected boxicons font into WKWebView")
        }
    }

    private static func makeCodepointsUserScript() -> WKUserScript? {
        var parts: [String] = []
        parts.reserveCapacity(BoxiconsCatalog.codepoints.count)
        for (key, value) in BoxiconsCatalog.codepoints {
            let escaped = key
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "\"", with: "\\\"")
            parts.append("\"\(escaped)\":\(value)")
        }
        guard !parts.isEmpty else { return nil }
        let source = "window.__TRINOTE_BOXICONS__={\(parts.joined(separator: ","))};"
        return WKUserScript(
            source: source,
            injectionTime: .atDocumentStart,
            forMainFrameOnly: true
        )
    }

    /// Embeds boxicons.ttf as a data URL so canvas/SVG can use it without file:// font fetches (which fail in WKWebView).
    private static func makeFontUserScript() -> WKUserScript? {
        let fontURL =
            Bundle.main.url(forResource: "boxicons", withExtension: "ttf", subdirectory: "Fonts")
            ?? Bundle.main.url(forResource: "boxicons", withExtension: "ttf")
        guard let fontURL, let fontData = try? Data(contentsOf: fontURL) else {
            Log.geoMap.error("[markers] boxicons.ttf missing — geo map marker icons will not render in WebView")
            return nil
        }

        let base64 = fontData.base64EncodedString()
        let source = """
        (function(){
          var b64='\(base64)';
          window.__TRINOTE_BOXICONS_FONT_READY__=(async function(){
            try{
              var css="@font-face{font-family:'boxicons';src:url('data:font/ttf;base64,"+b64+"') format('truetype');font-weight:normal;font-style:normal;}";
              var style=document.createElement('style');
              style.textContent=css;
              (document.head||document.documentElement).appendChild(style);
              if(window.FontFace&&document.fonts){
                var face=new FontFace('boxicons',"url('data:font/ttf;base64,"+b64+"')");
                var loaded=await face.load();
                document.fonts.add(loaded);
              }
              if(document.fonts&&document.fonts.ready){await document.fonts.ready;}
              var sample=String.fromCodePoint(0xeb58);
              window.__TRINOTE_BOXICONS_FONT_LOADED__=!!(document.fonts&&document.fonts.check&&document.fonts.check("16px boxicons",sample));
            }catch(e){
              window.__TRINOTE_BOXICONS_FONT_LOADED__=false;
              window.__TRINOTE_BOXICONS_FONT_ERROR__=String(e&&e.message?e.message:e);
            }
          })();
        })();
        """
        return WKUserScript(
            source: source,
            injectionTime: .atDocumentStart,
            forMainFrameOnly: true
        )
    }
}
