import Foundation

/// Detects Trilium / ckeditor5-math-style math markup in note HTML and whether bundled KaTeX is available for the read-only web view.
enum TriliumMathHTMLSupport {
    /// True when `html` likely contains Trilium math: `&lt;script type="math/tex"&gt;`, `span.math-tex`, or Trinote editor bridge spans.
    static func bodyContainsTriliumMathMarkers(_ html: String) -> Bool {
        if html.contains("data-trinote-math-tex") { return true }
        if htmlContainsMathTexClass(html) { return true }
        if htmlContainsMathTexScript(html) { return true }
        return false
    }

    static func katexJavaScriptIsBundled() -> Bool {
        Bundle.main.url(forResource: "katex.min", withExtension: "js", subdirectory: "vendor/katex") != nil
    }

    private static func htmlContainsMathTexScript(_ html: String) -> Bool {
        guard let regex = try? NSRegularExpression(
            pattern: #"(?is)<script[^>]*\stype\s*=\s*["'][^"']*math/tex[^"']*["'][^>]*>"#,
            options: []
        ) else {
            return false
        }
        let range = NSRange(location: 0, length: (html as NSString).length)
        return regex.firstMatch(in: html, options: [], range: range) != nil
    }

    private static func htmlContainsMathTexClass(_ html: String) -> Bool {
        guard let regex = try? NSRegularExpression(
            pattern: #"(?is)class\s*=\s*["'][^"']*\bmath-tex\b[^"']*""#,
            options: []
        ) else {
            return false
        }
        let range = NSRange(location: 0, length: (html as NSString).length)
        return regex.firstMatch(in: html, options: [], range: range) != nil
    }
}
