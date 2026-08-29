import XCTest
@testable import Trinote

final class OfficeHTMLPreviewTests: XCTestCase {
    func testStripsScriptIframeObjectAndEmbed() {
        let html = """
        <p>Hello</p>
        <script>alert(1)</script>
        <iframe src="https://evil.example"></iframe>
        <object data="x"></object>
        <embed src="x">
        <p>World</p>
        """
        let cleaned = OfficeHTMLSanitizer.prepareForPreview(html)
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("<script"))
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("<iframe"))
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("<object"))
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("<embed"))
        XCTAssertTrue(cleaned.contains("<p>Hello</p>"))
        XCTAssertTrue(cleaned.contains("<p>World</p>"))
    }

    func testStripsInlineEventHandlers() {
        let html = #"<p onclick="alert(1)" onload='steal()'>x</p>"#
        let cleaned = OfficeHTMLSanitizer.stripEventHandlers(html)
        XCTAssertEqual(cleaned, "<p>x</p>")
    }

    func testStripsDefaultHyperlinkColorsInsideAnchors() {
        let html = """
        <a href="https://example.com" style="color:#0563C1;font-family: Arial">x</a>\
        <a href="#frag"><span style="color: #000080">y</span></a>
        """
        let cleaned = OfficeHTMLSanitizer.stripDefaultHyperlinkColors(html)
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("#0563c1"))
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("#000080"))
        XCTAssertTrue(cleaned.contains("font-family: Arial"))
        XCTAssertTrue(cleaned.contains("y"))
    }

    func testKeepsAuthorChosenLinkColorAndNonLinkNavy() {
        let html = """
        <a href="https://trilium.example" style="color:#ea7500">Trilium</a>\
        <span style="color:#0563c1">keep</span>
        """
        let cleaned = OfficeHTMLSanitizer.stripDefaultHyperlinkColors(html)
        XCTAssertTrue(cleaned.contains("#ea7500"))
        XCTAssertTrue(cleaned.contains("#0563c1"))
    }

    func testEmptyStyleAttributeCanRemainAfterColorStrip() {
        let html = #"<a href="x" style="color:#0000ff">y</a>"#
        let cleaned = OfficeHTMLSanitizer.stripDefaultHyperlinkColors(html)
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("#0000ff"))
        XCTAssertTrue(cleaned.contains(">y</a>"))
    }

    func testStripsDefaultBlackDocumentTextButKeepsAuthorColor() {
        let html = """
        <p><span style="font-size:11pt; color:#000000; font-family:Calibri">Hello</span></p>\
        <p><span style="color:#ea7500">Accent</span></p>
        """
        let cleaned = OfficeHTMLSanitizer.stripDefaultDocumentTextColors(html)
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("#000000"))
        XCTAssertTrue(cleaned.contains("font-size:11pt"))
        XCTAssertTrue(cleaned.contains("font-family:Calibri"))
        XCTAssertTrue(cleaned.contains("#ea7500"))
        XCTAssertTrue(cleaned.contains("Hello"))
    }

    func testStripsBlackWindowtextAndRgbZeroAsDefaultText() {
        let html = """
        <span style="color: black">a</span>\
        <span style="color:windowtext">b</span>\
        <span style="color: rgb(0, 0, 0)">c</span>
        """
        let cleaned = OfficeHTMLSanitizer.stripDefaultDocumentTextColors(html)
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("black"))
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("windowtext"))
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("rgb("))
        XCTAssertTrue(cleaned.contains(">a</span>"))
        XCTAssertTrue(cleaned.contains(">b</span>"))
        XCTAssertTrue(cleaned.contains(">c</span>"))
    }

    func testDoesNotTreatNavyOrBackgroundBlackAsDefaultTextColor() {
        let html = """
        <span style="color:#000080">navy</span>\
        <span style="background-color:#000000;color:#C00000">keep</span>
        """
        let cleaned = OfficeHTMLSanitizer.stripDefaultDocumentTextColors(html)
        XCTAssertTrue(cleaned.contains("#000080"))
        XCTAssertTrue(cleaned.contains("background-color:#000000"))
        XCTAssertTrue(cleaned.contains("#C00000"))
    }

    func testStripsOfficeParserPremiumStylesheetButKeepsEpubCSS() {
        let html = """
        <style>:root { --container-width: 900px; --text-color: #333; } body { padding: 50px 20px; } .container { padding: 60px 80px; }</style>
        <style>p { text-indent: 1.5em; font-family: Palatino, serif; }</style>
        <p>Chapter</p>
        """
        let cleaned = OfficeHTMLSanitizer.stripOfficeParserPremiumStylesheets(html)
        XCTAssertFalse(cleaned.contains("--container-width"))
        XCTAssertFalse(cleaned.contains("60px 80px"))
        XCTAssertTrue(cleaned.contains("text-indent: 1.5em"))
        XCTAssertTrue(cleaned.contains("Palatino"))
        XCTAssertTrue(cleaned.contains("Chapter"))
    }

    func testPrepareForPreviewStripsDefaultBlackOnWordRuns() {
        let html = #"<p><span style="color:#000000">Docx</span></p>"#
        let cleaned = OfficeHTMLSanitizer.prepareForPreview(html)
        XCTAssertFalse(cleaned.localizedCaseInsensitiveContains("#000000"))
        XCTAssertTrue(cleaned.contains("Docx"))
    }

    func testWrapHTMLDoesNotImposeWordHostileLayout() {
        let theme = HTMLThemeColors(
            lightText: "#1c1c1e",
            darkText: "#aaaaaa",
            lightLink: "#007AFF",
            darkLink: "#5ac8fa"
        )
        let wrapped = OfficeHTMLPreviewView.wrapHTML("<p>x</p>", theme: theme)
        XCTAssertFalse(wrapped.contains("box-sizing: border-box"))
        XCTAssertFalse(wrapped.contains("th, td { border"))
        XCTAssertFalse(wrapped.contains("font: -apple-system-body"))
        XCTAssertTrue(wrapped.contains(".container"))
        XCTAssertTrue(wrapped.contains("padding: 0 !important"))
        XCTAssertTrue(wrapped.contains("color: var(--text-color) !important"))
        XCTAssertTrue(wrapped.contains("p { margin: 0; }"))
    }
}
