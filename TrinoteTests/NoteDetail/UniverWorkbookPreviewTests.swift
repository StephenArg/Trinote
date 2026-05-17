import XCTest
@testable import Trinote

/// Locks in `UniverWorkbookPreview.parse` against the actual on-the-wire shape Trilium v0.103+
/// emits for spreadsheet notes (see `apps/client/src/widgets/type_widgets/spreadsheet/persistence.tsx`):
/// the Univer `IWorkbookData` is wrapped in `{ "version": 1, "workbook": { ... } }`.
final class UniverWorkbookPreviewTests: XCTestCase {

    func testParsesTriliumWrappedEnvelope() throws {
        let json = """
        {
          "version": 1,
          "workbook": {
            "id": "gyI0JO",
            "sheetOrder": ["s1"],
            "sheets": {
              "s1": {
                "id": "s1",
                "name": "Budget",
                "rowCount": 10,
                "columnCount": 3,
                "cellData": {
                  "0": { "0": { "v": "Item" }, "1": { "v": "Qty" }, "2": { "v": "Cost" } },
                  "1": { "0": { "v": "Apple" }, "1": { "v": 5 }, "2": { "v": 1.25 } }
                }
              }
            }
          }
        }
        """.data(using: .utf8)!

        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        XCTAssertEqual(parsed.sheets.count, 1)
        let sheet = parsed.sheets[0]
        XCTAssertEqual(sheet.name, "Budget")
        XCTAssertEqual(sheet.rows.count, 2)
        XCTAssertEqual(sheet.rows[0].values[0], "Item")
        XCTAssertEqual(sheet.rows[0].values[1], "Qty")
        XCTAssertEqual(sheet.rows[1].values[0], "Apple")
        XCTAssertEqual(sheet.rows[1].values[1], "5")
        XCTAssertEqual(sheet.rows[1].values[2], "1.25")
    }

    func testParsesBareWorkbookForForwardCompat() throws {
        let json = """
        {
          "id": "x",
          "sheetOrder": ["s1"],
          "sheets": {
            "s1": { "id": "s1", "name": "Raw", "rowCount": 1, "columnCount": 1, "cellData": { "0": { "0": { "v": "hi" } } } }
          }
        }
        """.data(using: .utf8)!

        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        XCTAssertEqual(parsed.sheets[0].rows[0].values[0], "hi")
    }

    func testParsesEmptyWorkbookAsNoRows() throws {
        let json = NoteType.emptySpreadsheetJSON.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        XCTAssertEqual(parsed.sheets.count, 1)
        XCTAssertTrue(parsed.sheets[0].rows.isEmpty)
    }

    func testReturnsNilForNonWorkbookJSON() {
        let json = #"{"foo":"bar"}"#.data(using: .utf8)!
        XCTAssertNil(UniverWorkbookPreview.parse(data: json))
    }

    func testFormulaCellFallsBackToFormulaSource() throws {
        let json = """
        {
          "version": 1,
          "workbook": {
            "sheetOrder": ["s1"],
            "sheets": {
              "s1": { "id": "s1", "name": "S", "cellData": { "0": { "0": { "f": "=SUM(A1:A10)" } } } }
            }
          }
        }
        """.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        XCTAssertEqual(parsed.sheets[0].rows[0].values[0], "=SUM(A1:A10)")
    }

    func testRichTextCellUsesDataStream() throws {
        let json = """
        {
          "version": 1,
          "workbook": {
            "sheetOrder": ["s1"],
            "sheets": {
              "s1": { "id": "s1", "name": "S", "cellData": { "0": { "0": { "p": { "body": { "dataStream": "Hello\\r\\n" } } } } } }
            }
          }
        }
        """.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        XCTAssertEqual(parsed.sheets[0].rows[0].values[0], "Hello")
    }
}
