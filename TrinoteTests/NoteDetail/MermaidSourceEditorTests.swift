import XCTest
@testable import Trinote

final class MermaidSourceEditorTests: XCTestCase {
    private typealias Editor = MermaidSourceEditorController

    func testCommentTogglesAfterIndentationAndSkipsBlankLines() {
        let lines = ["graph TD", "    A --> B", "", "    B --> C"]
        let commented = Editor.togglingComment(lines)
        XCTAssertEqual(commented, ["%% graph TD", "    %% A --> B", "", "    %% B --> C"])
        XCTAssertEqual(Editor.togglingComment(commented), lines)
    }

    func testMixedLinesAreAllCommented() {
        XCTAssertEqual(Editor.togglingComment(["%% old", "new"]), ["%% %% old", "%% new"])
    }

    func testIndentAndOutdent() {
        XCTAssertEqual(Editor.indenting(["root", "", "  child"]), ["    root", "", "      child"])
        XCTAssertEqual(Editor.indenting([""], includingBlankLines: true), ["    "], "a caret on a blank line tabs forward")
        XCTAssertEqual(Editor.outdenting(["      child", "  two", "\ttab", "none"]), ["  child", "two", "tab", "none"])
    }
}
