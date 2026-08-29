import XCTest
@testable import Trinote

/// Locks in the contract between `SpreadsheetEditorView`'s JS bridge (`window.univerBridge.getWorkbook()`)
/// and Trilium's persistence format: the editor must emit `{ "version": 1, "workbook": <IWorkbookData> }`,
/// and the read-only preview parser must still handle whatever shape the editor round-trips back.
///
/// The JS bundle ships in a WKWebView so we can't actually call it from XCTest; instead we exercise
/// the parser against payloads that mirror what Univer's `workbook.save()` returns at v0.25.1.
final class SpreadsheetSavePayloadTests: XCTestCase {

    private func fixtureData(_ name: String) throws -> Data {
        let bundle = Bundle(for: SpreadsheetSavePayloadTests.self)
        let candidates: [URL?] = [
            bundle.url(forResource: name, withExtension: "json", subdirectory: "Fixtures"),
            bundle.url(forResource: name, withExtension: "json"),
            bundle.resourceURL?.appendingPathComponent("Fixtures/\(name).json"),
        ]
        let url = try XCTUnwrap(candidates.compactMap { $0 }.first)
        return try Data(contentsOf: url)
    }

    /// Trilium-style envelope produced by `univerBridge.getWorkbook`: `JSON.stringify({ version: 1, workbook: ... })`.
    private func wrap(_ workbook: String) -> Data {
        Data("{\"version\":1,\"workbook\":\(workbook)}".utf8)
    }

    func testEmptyTemplateRoundTripsThroughParser() throws {
        // What NoteType.emptySpreadsheetJSON gives a brand-new note. After a save with no edits,
        // Univer's workbook.save() returns essentially the same shape; the parser must accept it.
        let json = NoteType.emptySpreadsheetJSON.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        XCTAssertEqual(parsed.sheets.count, 1)
        XCTAssertEqual(parsed.sheets[0].name, "Sheet1")
        XCTAssertTrue(parsed.sheets[0].rows.isEmpty)
    }

    func testSavePayloadPreservesWorkbookKey() throws {
        // Simulates a `univerBridge.getWorkbook()` return value containing the full workbook envelope.
        let payload = wrap("""
        {
          "id": "trinote-sheet",
          "sheetOrder": ["sheet-1"],
          "sheets": {
            "sheet-1": {
              "id": "sheet-1",
              "name": "Sheet1",
              "rowCount": 100,
              "columnCount": 26,
              "cellData": {
                "0": { "0": { "v": "Hello" } }
              }
            }
          }
        }
        """)

        let obj = try XCTUnwrap(try JSONSerialization.jsonObject(with: payload) as? [String: Any])
        XCTAssertEqual(obj["version"] as? Int, 1, "Trilium expects the version envelope so future bumps can migrate cleanly.")
        XCTAssertNotNil(obj["workbook"], "Saved payload must keep the workbook wrapper — the read-only parser unwraps it.")

        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: payload))
        XCTAssertEqual(parsed.sheets[0].rows.first?.values[0]?.text, "Hello")
    }

    func testSavePayloadWithStyleAndFormulaCellsParses() throws {
        // Realistic Univer 0.22.1 cell shapes: numeric (`v`), formula (`f`), rich-text (`p.body.dataStream`),
        // and a style id (`s`). The parser should ignore unsupported keys, never bail.
        let payload = wrap("""
        {
          "id": "trinote-sheet",
          "sheetOrder": ["a", "b"],
          "sheets": {
            "a": {
              "id": "a",
              "name": "Numbers",
              "rowCount": 5,
              "columnCount": 4,
              "cellData": {
                "0": {
                  "0": { "v": "Quantity", "s": "header" },
                  "1": { "v": "Price",   "s": "header" },
                  "2": { "v": "Total",   "s": "header" }
                },
                "1": {
                  "0": { "v": 3 },
                  "1": { "v": 12.5 },
                  "2": { "f": "=A2*B2", "v": 37.5 }
                },
                "2": {
                  "0": { "p": { "body": { "dataStream": "Bold cell\\r\\n" } } }
                }
              }
            },
            "b": {
              "id": "b",
              "name": "Empty",
              "rowCount": 10,
              "columnCount": 5,
              "cellData": {}
            }
          },
          "styles": {
            "header": { "ff": "Inter", "bl": 1 }
          }
        }
        """)

        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: payload))
        XCTAssertEqual(parsed.sheets.count, 2)
        XCTAssertEqual(parsed.sheets[0].name, "Numbers")
        XCTAssertEqual(parsed.sheets[0].rows.first?.values[0]?.text, "Quantity")
        // Formula cell with cached value `v` should prefer the cached value over the formula string —
        // matches what users see in the desktop client.
        XCTAssertEqual(parsed.sheets[0].rows[1].values[2]?.text, "37.5")
        // Rich text dataStream loses trailing control chars.
        XCTAssertEqual(parsed.sheets[0].rows[2].values[0]?.text, "Bold cell")
        // Empty sheets still surface (preserves Univer sheetOrder for the picker).
        XCTAssertEqual(parsed.sheets[1].name, "Empty")
    }

    func testEnvelopelessWorkbookStillParsesForForwardCompatibility() throws {
        // If a future Trilium version drops the envelope, the parser must keep working so the
        // read-only preview never goes blank during a server upgrade.
        let bare = """
        {
          "id": "bare",
          "sheetOrder": ["s"],
          "sheets": {
            "s": {
              "id": "s",
              "name": "Plain",
              "rowCount": 5,
              "columnCount": 3,
              "cellData": { "0": { "0": { "v": "ok" } } }
            }
          }
        }
        """.data(using: .utf8)!

        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: bare))
        XCTAssertEqual(parsed.sheets[0].rows.first?.values[0]?.text, "ok")
    }

    func testSpreadsheetNoteTypeIsEditable() {
        // Guard rails: the iOS edit affordance (FAB + overflow menu) keys off `NoteType.isEditable`.
        // Regressing this would silently strip the Edit button without a build error.
        XCTAssertTrue(NoteType.spreadsheet.isEditable)
        XCTAssertEqual(NoteType.spreadsheet.creationMime, "application/json")
    }

    func testV0105FixturePreservesEnvelopeAndIgnoresUnknownResourceKeys() throws {
        let data = try fixtureData("spreadsheet-v0.105-sample")
        let obj = try XCTUnwrap(try JSONSerialization.jsonObject(with: data) as? [String: Any])
        XCTAssertEqual(obj["version"] as? Int, 1)
        let workbook = try XCTUnwrap(obj["workbook"] as? [String: Any])
        XCTAssertNotNil(workbook["resources"], "v0.105 workbooks carry preset plugin resources the preview parser ignores.")
        XCTAssertNotNil(workbook["styles"])

        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: data))
        XCTAssertEqual(parsed.sheets[0].rows[1].values[2]?.text, "1.25")
    }
}
