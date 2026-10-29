import XCTest
@testable import Trinote

/// How checkboxes are drawn: Trilium's hue-based fills and the stylesheet's rules (issue #37).
final class TaskStateStylesTests: XCTestCase {

    func testHueOfCSSColors() throws {
        XCTAssertEqual(try XCTUnwrap(CSSColorHue.hue(of: "#e6a23c")), 36, accuracy: 0.01)
        XCTAssertEqual(try XCTUnwrap(CSSColorHue.hue(of: "#f00")), 0, accuracy: 0.01)
        XCTAssertEqual(try XCTUnwrap(CSSColorHue.hue(of: "rgb(0, 128, 0)")), 120, accuracy: 0.01)
        XCTAssertEqual(try XCTUnwrap(CSSColorHue.hue(of: "hsl(210, 50%, 40%)")), 210, accuracy: 0.5)
        XCTAssertEqual(try XCTUnwrap(CSSColorHue.hue(of: "Blue")), 240, accuracy: 0.01)
        XCTAssertNil(CSSColorHue.hue(of: "#808080"), "a gray has no hue")
        XCTAssertNil(CSSColorHue.hue(of: ""))
        XCTAssertNil(CSSColorHue.hue(of: "var(--x)"))
    }

    func testFillsFollowTriliumsThemes() {
        XCTAssertEqual(TaskStateStyles.Palette.light.fill(forColor: "#e64d4d"), "hsl(0, 50%, 50%)")
        XCTAssertEqual(TaskStateStyles.Palette.dark.fill(forColor: "#e64d4d"), "hsl(0, 40%, 50%)")
        XCTAssertEqual(TaskStateStyles.Palette.light.fill(forColor: ""), "gray", "Maybe has no color")
        XCTAssertEqual(TaskStateStyles.Palette.dark.fill(forColor: ""), "#ffffff3b")
    }

    func testStylesheetHasARulePerCustomStateAndNoRawColors() {
        let states = TaskStateCatalog.defaults + [
            TaskStateDefinition(noteId: "x", name: "_evil", title: "Evil", markdownSymbol: "", isCompleted: false,
                                color: "red;}</style><script>", iconClass: "custompack my-icon", isHidden: false),
        ]
        let css = TaskStateStyles.css(states: states)
        for name in ["doing", "maybe", "cancelled", "_evil"] {
            XCTAssertTrue(css.contains("li[data-trilium-task-state=\"\(name)\"] > .todo-list__label"), name)
            XCTAssertTrue(css.contains(".tn-task-checkbox[data-trilium-task-state=\"\(name)\"]"), name)
        }
        XCTAssertFalse(css.contains("data-trilium-task-state=\"none\"] >"), "None is the plain box")
        XCTAssertFalse(css.contains("</style>"), "a state's color is never copied into the stylesheet")
        XCTAssertTrue(css.contains("ul[data-type=\"taskList\"] li[data-trilium-task-state=\"doing\"] > label"), "editor markup too")
        XCTAssertTrue(css.contains("text-decoration: line-through"))
    }

    func testCatalogIconsGetAGlyphAndOthersDont() {
        XCTAssertNotNil(TaskStateGlyphImage.dataURL(forIconClass: "bx bx-loader")?.hasPrefix("data:image/png;base64,"))
        XCTAssertNil(TaskStateGlyphImage.dataURL(forIconClass: "custompack my-icon"))
    }

    @MainActor
    func testWebConfigOnlyOffersStatesWithASymbolInMarkdown() {
        var noSymbol = TaskStateCatalog.defaultCustom[0]
        noSymbol.name = "_nosym"
        noSymbol.markdownSymbol = ""
        var hidden = TaskStateCatalog.defaultCustom[1]
        hidden.isHidden = true
        let states = [TaskStateCatalog.none, noSymbol, TaskStateCatalog.done, hidden]
        let text = TaskStateWebConfig(states: states, tapState: "done", menuEnabled: true, isMarkdown: false)
        let markdown = TaskStateWebConfig(states: states, tapState: "done", menuEnabled: true, isMarkdown: true)
        XCTAssertEqual(text.menuStates.map(\.name), ["none", "_nosym", "done"])
        XCTAssertEqual(markdown.menuStates.map(\.name), ["none", "done"])
        XCTAssertFalse(text.json.contains("</"), "safe inside an inline <script>")
    }
}
