import XCTest
@testable import Trinote

final class UniverWorkbookStylePreviewTests: XCTestCase {
    func testResolvesNamedStyleReference() {
        let styles = [
            "blueFill": [
                "bg": ["rgb": "#4285F4"],
                "cl": ["rgb": "#FFFFFF"],
                "bl": 1,
            ] as [String: Any],
        ]
        let cell = ["v": "What", "s": "blueFill"] as [String: Any]
        let appearance = UniverWorkbookStylePreview.appearance(
            row: 0, col: 0, cell: cell, sheet: [:], styles: styles
        )
        XCTAssertEqual(appearance.backgroundHex, "#4285F4")
        XCTAssertEqual(appearance.foregroundHex, "#FFFFFF")
        XCTAssertTrue(appearance.isBold)
    }

    func testParsesPerSideBorders() {
        let cell = [
            "v": "Boxed",
            "s": [
                "bd": [
                    "t": ["s": 1, "cl": ["rgb": "#FF0000"]],
                    "l": ["s": 1, "cl": ["rgb": "#00FF00"]],
                ],
            ] as [String: Any],
        ] as [String: Any]
        let appearance = UniverWorkbookStylePreview.appearance(
            row: 0, col: 0, cell: cell, sheet: [:], styles: [:]
        )
        XCTAssertEqual(appearance.borders.top, .hex("#FF0000"))
        XCTAssertEqual(appearance.borders.left, .hex("#00FF00"))
        XCTAssertEqual(appearance.borders.right, .none)
    }

    func testDefaultBlackBorderIsThemeAutomatic() {
        let cell = [
            "v": "Boxed",
            "s": [
                "bd": [
                    "t": ["s": 1],
                    "r": ["s": 8, "cl": ["rgb": "#CCCCCC"]],
                    "b": ["s": 1, "cl": ["rgb": "#000000"]],
                    "l": ["s": 1, "cl": ["rgb": "rgb(0,0,0)"]],
                ],
            ] as [String: Any],
        ] as [String: Any]
        let appearance = UniverWorkbookStylePreview.appearance(
            row: 0, col: 0, cell: cell, sheet: [:], styles: [:]
        )
        XCTAssertEqual(appearance.borders.top, .automatic)
        XCTAssertEqual(appearance.borders.right, .hex("#CCCCCC"))
        XCTAssertEqual(appearance.borders.bottom, .automatic)
        XCTAssertEqual(appearance.borders.left, .automatic)
        XCTAssertTrue(UniverWorkbookStylePreview.isThemeAutomaticBorderColor("#000000"))
        XCTAssertFalse(UniverWorkbookStylePreview.isThemeAutomaticBorderColor("#FF0000"))
    }

    /// `rgb()` values `Double` reads but `Int` can't hold ("nan", "inf", "1e400") are no color, not a trap;
    /// out-of-range channels clamp like CSS.
    func testRGBColorsWithNonFiniteOrOutOfRangeChannels() {
        XCTAssertFalse(UniverWorkbookStylePreview.isThemeAutomaticBorderColor("rgb(nan,0,0)"))
        XCTAssertFalse(UniverWorkbookStylePreview.isThemeAutomaticBorderColor("rgb(0,1e400,0)"))
        XCTAssertFalse(UniverWorkbookStylePreview.isThemeAutomaticBorderColor("rgba(0,0,inf,1)"))
        XCTAssertTrue(UniverWorkbookStylePreview.isThemeAutomaticBorderColor("rgb(-5,-5,-5)"))
        XCTAssertTrue(UniverWorkbookStylePreview.isThemeAutomaticBorderColor("rgba(0,0,0,nan)"))
        XCTAssertFalse(UniverWorkbookStylePreview.isThemeAutomaticBorderColor("rgb(1e30,0,0)"))

        var appearance = UniverWorkbookStylePreview.CellAppearance.plain
        appearance.backgroundHex = "rgb(nan, 1e400, -5)"
        XCTAssertNil(appearance.background)
        appearance.backgroundHex = "rgb(300, 20, 20)"
        XCTAssertNotNil(appearance.background)
    }

    func testWorkbookParseAppliesCellStyle() throws {
        let json = """
        {
          "version": 1,
          "workbook": {
            "sheetOrder": ["s1"],
            "styles": {
              "highlight": {
                "bg": { "rgb": "#0000FF" },
                "cl": { "rgb": "#FFFFFF" }
              }
            },
            "sheets": {
              "s1": {
                "id": "s1",
                "name": "Styled",
                "cellData": {
                  "0": { "0": { "v": "Nice", "s": "highlight" } }
                }
              }
            }
          }
        }
        """.data(using: .utf8)!
        let parsed = try XCTUnwrap(UniverWorkbookPreview.parse(data: json))
        let cell = try XCTUnwrap(parsed.sheets[0].rows[0].values[0])
        XCTAssertEqual(cell.appearance.backgroundHex, "#0000FF")
        XCTAssertEqual(cell.appearance.foregroundHex, "#FFFFFF")
    }
}
