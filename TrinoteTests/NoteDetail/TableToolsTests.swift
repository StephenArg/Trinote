import WebKit
import XCTest
@testable import Trinote

/// The table menu: sorting by a column and inserting or deleting several rows, in the real editor.
@MainActor
final class TableToolsTests: XCTestCase {
    private final class Loader: NSObject, WKNavigationDelegate {
        var finished: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            finished?.resume()
            finished = nil
        }
    }

    private var web: WKWebView!
    private let loader = Loader()

    override func setUp() async throws {
        try await super.setUp()
        web = WKWebView(frame: CGRect(x: 0, y: 0, width: 400, height: 400), configuration: WKWebViewConfiguration())
        web.navigationDelegate = loader
        let url = try XCTUnwrap(Bundle.main.url(forResource: "editor", withExtension: "html"))
        await withCheckedContinuation { continuation in
            loader.finished = continuation
            web.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        }
    }

    private func call(_ script: String, _ arguments: [String: Any] = [:]) async throws -> Any? {
        try await web.callAsyncJavaScript(script, arguments: arguments, contentWorld: .page)
    }

    private func table(_ rows: [[String]], header: [String]? = nil) -> String {
        var html = "<figure class=\"table\"><table>"
        if let header {
            html += "<thead><tr>" + header.map { "<th>\($0)</th>" }.joined() + "</tr></thead>"
        }
        html += "<tbody>" + rows.map { "<tr>" + $0.map { "<td>\($0)</td>" }.joined() + "</tr>" }.joined() + "</tbody></table></figure>"
        return html
    }

    /// The text of each row, top to bottom.
    private func rowTexts() async throws -> [String] {
        let json = try await call("""
            const rows = [];
            editor.state.doc.descendants((node) => {
              if (node.type.name === 'tableRow') {
                const cells = [];
                node.forEach((cell) => cells.push(cell.textContent));
                rows.push(cells.join('|'));
                return false;
              }
              return true;
            });
            return JSON.stringify(rows);
            """) as? String ?? "[]"
        return try JSONDecoder().decode([String].self, from: Data(json.utf8))
    }

    /// Puts the caret in the cell holding `text`.
    private func placeCaret(in text: String) async throws {
        _ = try await call("""
            let found = null;
            editor.state.doc.descendants((node, pos) => {
              if (found === null && (node.type.name === 'tableCell' || node.type.name === 'tableHeader') && node.textContent === text) found = pos;
            });
            editor.commands.setTextSelection(found + 2);
            return 1;
            """, ["text": text])
    }

    private func load(_ html: String) async throws {
        _ = try await call("editorBridge.setContent(html); return 1", ["html": html])
    }

    func testSortsBodyRowsByTheCaretsColumnAndLeavesTheHeader() async throws {
        try await load(table([["Pear", "2"], ["apple", "10"], ["Fig", "1"]], header: ["Name", "Qty"]))
        try await placeCaret(in: "Pear")
        _ = try await call("trinoteSortTableRows(false); return 1")
        let sortedByName = try await rowTexts()
        XCTAssertEqual(sortedByName, ["Name|Qty", "apple|10", "Fig|1", "Pear|2"], "text ignores case")

        try await placeCaret(in: "10")
        _ = try await call("trinoteSortTableRows(true); return 1")
        let sortedByQuantity = try await rowTexts()
        XCTAssertEqual(sortedByQuantity, ["Name|Qty", "apple|10", "Pear|2", "Fig|1"], "numbers compare as numbers")
    }

    func testTheCaretStaysInItsCellAfterSorting() async throws {
        try await load(table([["b"], ["a"]]))
        try await placeCaret(in: "b")
        _ = try await call("trinoteSortTableRows(false); return 1")
        let text = try await call("return editor.state.selection.$from.parent.textContent") as? String
        XCTAssertEqual(text, "b")
    }

    func testRowsTiedByAMergedCellMoveTogether() async throws {
        let html = "<figure class=\"table\"><table><tbody>"
            + "<tr><td>z</td><td rowspan=\"2\">m</td></tr><tr><td>y</td></tr><tr><td>a</td><td>n</td></tr>"
            + "</tbody></table></figure>"
        try await load(html)
        try await placeCaret(in: "a")
        _ = try await call("trinoteSortTableRows(false); return 1")
        let rows = try await rowTexts()
        XCTAssertEqual(rows, ["a|n", "z|m", "y"])
    }

    func testEmptyCellsStayLastBothWays() async throws {
        try await load(table([[""], ["b"], ["a"]]))
        try await placeCaret(in: "b")
        _ = try await call("trinoteSortTableRows(true); return 1")
        let rows = try await rowTexts()
        XCTAssertEqual(rows, ["b", "a", ""])
    }

    func testAutoSortOrdersKindsLikeTrilium() async throws {
        let json = try await call("""
            return JSON.stringify(trinoteAutoSort(
              ['banana', '2024-01-05', '', '10', '9:30', 'Apple', '2', '1,000', '2023-12-31'],
              (x) => x,
              { locale: 'en-US' }
            ));
            """) as? String ?? "[]"
        let sorted = try JSONDecoder().decode([String].self, from: Data(json.utf8))
        XCTAssertEqual(sorted, ["9:30", "2023-12-31", "2024-01-05", "2", "10", "1,000", "Apple", "banana", ""])
    }

    func testSeveralRowsAreInsertedForASeveralRowSelection() async throws {
        try await load(table([["a"], ["b"], ["c"]]))
        try await placeCaret(in: "a")
        // Selects cells "a" and "b" the way the table's touch selection records them.
        _ = try await call("""
            const positions = new Set();
            editor.state.doc.descendants((node, pos) => {
              if (node.type.name === 'tableCell' && (node.textContent === 'a' || node.textContent === 'b')) positions.add(pos);
            });
            window._getSelectedPositions = () => positions;
            trinoteInsertTableRows(false);
            return 1;
            """)
        let rows = try await rowTexts()
        XCTAssertEqual(rows, ["a", "b", "", "", "c"])
    }

    func testAllSelectedRowsAreDeleted() async throws {
        try await load(table([["a"], ["b"], ["c"]]))
        try await placeCaret(in: "a")
        _ = try await call("""
            const positions = new Set();
            editor.state.doc.descendants((node, pos) => {
              if (node.type.name === 'tableCell' && (node.textContent === 'a' || node.textContent === 'b')) positions.add(pos);
            });
            window._getSelectedPositions = () => positions;
            applyRealCellSelection();
            editor.chain().focus().deleteRow().run();
            return 1;
            """)
        let rows = try await rowTexts()
        XCTAssertEqual(rows, ["c"])
    }
}
