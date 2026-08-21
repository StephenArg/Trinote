import XCTest
@testable import Trinote

@MainActor
final class CodeSyntaxHighlighterTests: XCTestCase {
    func testHighlightJSLanguageMapsCommonMimes() {
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "text/x-swift"), "swift")
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "text/javascript"), "javascript")
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "application/javascript;env=backend"), "javascript")
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "application/typescript"), "typescript")
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "text/x-python"), "python")
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "application/json"), "json")
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "text/x-c++src"), "cpp")
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "text/x-sh"), "bash")
        XCTAssertEqual(CodeSyntaxHighlighter.highlightJSLanguage(for: "text/x-markdown"), "markdown")
        XCTAssertNil(CodeSyntaxHighlighter.highlightJSLanguage(for: "text/plain"))
    }

    func testAttributedStringKeepsPlainTextForUnsupportedMime() {
        let code = "hello world"
        let attr = CodeSyntaxHighlighter.attributedString(code: code, mime: "text/plain", darkMode: false)
        XCTAssertEqual(attr.string, code)
    }

    func testAttributedStringHighlightsSwift() {
        let code = "func hello() {\n  print(\"hi\")\n}"
        let attr = CodeSyntaxHighlighter.attributedString(code: code, mime: "text/x-swift", darkMode: false)
        XCTAssertEqual(attr.string, code)
        // Highlighted output should carry more than a single uniform color run for typical Swift.
        var colorRuns = 0
        attr.enumerateAttribute(.foregroundColor, in: NSRange(location: 0, length: attr.length)) { value, _, _ in
            if value != nil { colorRuns += 1 }
        }
        XCTAssertGreaterThan(colorRuns, 1)
    }
}
