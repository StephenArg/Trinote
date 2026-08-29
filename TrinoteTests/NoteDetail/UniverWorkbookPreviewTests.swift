import XCTest
@testable import Trinote

/// Locks in `UniverWorkbookPreview.parse` against the actual on-the-wire shape Trilium v0.103+
/// emits for spreadsheet notes (see `apps/client/src/widgets/type_widgets/spreadsheet/persistence.tsx`):
/// the Univer `IWorkbookData` is wrapped in `{ "version": 1, "workbook": { ... } }`.
final class UniverWorkbookPreviewTests: XCTestCase {

    private func fixtureData(_ name: String) throws -> Data {
        let bundle = Bundle(for: UniverWorkbookPreviewTests.self)
        let candidates: [URL?] = [
            bundle.url(forResource: name, withExtension: "json", subdirectory: "Fixtures"),
            bundle.url(forResource: name, withExtension: "json"),
            bundle.resourceURL?.appendingPathComponent("Fixtures/\(name).json"),
        ]
        let url = try XCTUnwrap(candidates.compactMap { $0 }.first)
        return try Data(contentsOf: url)
    }

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
        XCTAssertEqual(sheet.rows[0].values[0]?.text, "Item")
        XCTAssertEqual(sheet.rows[0].values[1]?.text, "Qty")
        XCTAssertEqual(sheet.rows[1].values[0]?.text, "Apple")
        XCTAssertEqual(sheet.rows[1].values[1]?.text, "5")
        XCTAssertEqual(sheet.rows[1].values[2]?.text, "1.25")
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
        XCTAssertEqual(parsed.sheets[0].rows[0].values[0]?.text, "hi")
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
        XCTAssertEqual(parsed.sheets[0].rows[0].values[0]?.text, "=SUM(A1:A10)")
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
        XCTAssertEqual(parsed.sheets[0].rows[0].values[0]?.text, "Hello")
    }

    /// Fixture mirrors Univer 0.25.1 `workbook.save()` output from Trilium v0.105, including
    /// filter / conditional-formatting / validation / drawing resources the editor presets deserialize.
    func testParsesV0105SampleFixtureWithoutCrashing() throws {
        let data = try fixtureData("spreadsheet-v0.105-sample")
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: data))
        XCTAssertEqual(parsed.sheets.count, 2)
        XCTAssertEqual(parsed.sheets[0].name, "Budget")
        XCTAssertEqual(parsed.sheets[0].rows[0].values[0]?.text, "Item")
        XCTAssertEqual(parsed.sheets[0].rows[1].values[3]?.text, "3.75")
        XCTAssertEqual(parsed.sheets[0].rows[3].values[0]?.text, "Rich memo")
        XCTAssertEqual(parsed.sheets[1].name, "Notes")
        XCTAssertEqual(parsed.sheets[1].rows[1].values[0]?.text, "Option A")
    }

    func testPlainURLCellGetsAutoLinked() throws {
        let json = """
        {
          "version": 1,
          "workbook": {
            "sheetOrder": ["s1"],
            "sheets": {
              "s1": {
                "id": "s1",
                "name": "Links",
                "cellData": {
                  "0": { "0": { "v": "https://triliumnotes.org" } }
                }
              }
            }
          }
        }
        """.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        let cell = try XCTUnwrap(parsed.sheets[0].rows[0].values[0])
        XCTAssertEqual(cell.text, "https://triliumnotes.org")
        XCTAssertEqual(cell.links.count, 1)
        XCTAssertEqual(cell.links[0].url, "https://triliumnotes.org")
    }

    func testRichTextHyperlinkCustomRangeParsed() throws {
        let json = """
        {
          "version": 1,
          "workbook": {
            "sheetOrder": ["s1"],
            "sheets": {
              "s1": {
                "id": "s1",
                "name": "Links",
                "cellData": {
                  "0": {
                    "0": {
                      "p": {
                        "body": {
                          "dataStream": "Trilium site\\r\\n",
                          "customRanges": [{
                            "startIndex": 0,
                            "endIndex": 11,
                            "rangeId": "link-1",
                            "rangeType": 0,
                            "properties": { "url": "https://triliumnotes.org" }
                          }]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        """.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        let cell = try XCTUnwrap(parsed.sheets[0].rows[0].values[0])
        XCTAssertEqual(cell.text, "Trilium site")
        XCTAssertEqual(cell.links.count, 1)
        XCTAssertEqual(cell.links[0].url, "https://triliumnotes.org")
        XCTAssertEqual(cell.links[0].endUTF16, (cell.text as NSString).length)
    }

    func testHyperlinkInclusiveEndIndexCoversLastCharacter() throws {
        let json = """
        {
          "version": 1,
          "workbook": {
            "sheetOrder": ["s1"],
            "sheets": {
              "s1": {
                "id": "s1",
                "name": "Links",
                "cellData": {
                  "0": {
                    "0": {
                      "v": "Nice",
                      "p": {
                        "body": {
                          "dataStream": "Nice\\r\\n",
                          "customRanges": [{
                            "startIndex": 0,
                            "endIndex": 3,
                            "rangeId": "link-1",
                            "rangeType": 0,
                            "properties": { "url": "https://example.com" }
                          }]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        """.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        let cell = try XCTUnwrap(parsed.sheets[0].rows[0].values[0])
        XCTAssertEqual(cell.text, "Nice")
        XCTAssertEqual(cell.links.first?.startUTF16, 0)
        XCTAssertEqual(cell.links.first?.endUTF16, 4)
    }

    func testHyperlinkWithSeparateDisplayText() throws {
        let json = """
        {
          "version": 1,
          "workbook": {
            "sheetOrder": ["s1"],
            "sheets": {
              "s1": {
                "id": "s1",
                "name": "Links",
                "cellData": {
                  "0": {
                    "0": {
                      "p": {
                        "body": {
                          "dataStream": "Visit Trilium\\r\\n",
                          "customRanges": [{
                            "startIndex": 0,
                            "endIndex": 12,
                            "rangeId": "link-1",
                            "rangeType": 0,
                            "properties": { "url": "https://triliumnotes.org" }
                          }]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        """.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        let cell = try XCTUnwrap(parsed.sheets[0].rows[0].values[0])
        XCTAssertEqual(cell.text, "Visit Trilium")
        XCTAssertEqual(cell.links.first?.url, "https://triliumnotes.org")
        XCTAssertEqual(cell.links.first?.endUTF16, (cell.text as NSString).length)
    }

    func testPreviewRowsPreserveEmptyRowGaps() {
        let sheet = UniverWorkbookPreview.Sheet(
            id: "s1",
            name: "Gap",
            columnCount: 3,
            rows: [
                .init(index: 0, values: [0: .init(text: "What", links: [])]),
                .init(index: 1, values: [0: .init(text: "cool", links: [])]),
                .init(index: 2, values: [0: .init(text: "nice", links: [])]),
                .init(index: 4, values: [1: .init(text: "Dude", links: [])]),
                .init(index: 5, values: [1: .init(text: "Super", links: [])]),
                .init(index: 6, values: [1: .init(text: "Guy", links: [])]),
            ],
            cellImageReferences: [:],
            styleTable: [:],
            sheetStyleContext: [:]
        )

        let preview = UniverWorkbookPreview.previewRows(for: sheet, extraPadding: 3)
        XCTAssertEqual(preview.map(\.index), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        XCTAssertTrue(preview[3].values.isEmpty)
        XCTAssertEqual(preview[4].values[1]?.text, "Dude")
    }
}
