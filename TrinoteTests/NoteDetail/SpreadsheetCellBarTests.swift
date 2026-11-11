import XCTest
@testable import Trinote

/// The spreadsheet cell bar: typing into cells, picking references for a formula, and moving on with Return.
@MainActor
final class SpreadsheetCellBarTests: XCTestCase {
    private func cell(
        _ address: String, _ row: Int, _ column: Int, _ text: String = "", range: String? = nil,
        tapped: Bool = false, inCell: Bool = false
    ) -> SpreadsheetCell {
        SpreadsheetCell(
            sheetId: "s1", row: row, column: column, address: address, range: range ?? address,
            isRange: range != nil, text: text, isEditingInCell: inCell, fromTap: tapped
        )
    }

    private func editing(_ start: SpreadsheetCell) -> SpreadsheetCellBarModel {
        let model = SpreadsheetCellBarModel()
        _ = model.receive(start)
        model.beginEditing()
        return model
    }

    func testASelectedCellShowsWhatItHolds() {
        let model = SpreadsheetCellBarModel()
        XCTAssertEqual(model.receive(cell("B2", 1, 1, "=SUM(A1:A3)")), [])
        XCTAssertEqual(model.draft, "=SUM(A1:A3)")
        XCTAssertFalse(model.hasChanges)
    }

    func testTappingAnotherCellSavesWhatWasTyped() {
        let a1 = cell("A1", 0, 0, "old")
        let model = editing(a1)
        model.draft = "new"

        let actions = model.receive(cell("C3", 2, 2, "there"))

        XCTAssertEqual(actions, [.write(a1, "new")])
        XCTAssertEqual(model.draft, "there", "and edits the tapped cell")
        XCTAssertTrue(model.isEditing)
    }

    func testAFormulaWaitingForAnOperandTakesTheTappedCellsReference() {
        let model = editing(cell("A4", 3, 0))
        model.draft = "=SUM("

        XCTAssertEqual(model.receive(cell("A1", 0, 0, "1")), [])
        XCTAssertEqual(model.draft, "=SUM(A1")
        XCTAssertEqual(model.receive(cell("A1", 0, 0, "1", range: "A1:A3")), [], "dragging the selection")
        XCTAssertEqual(model.draft, "=SUM(A1:A3", "replaces the reference it typed")
        XCTAssertEqual(model.draftCell?.address, "A4", "the formula still belongs to A4")

        model.draft += ")"
        let actions = model.receive(cell("B1", 0, 1))
        XCTAssertEqual(actions, [.write(cell("A4", 3, 0), "=SUM(A1:A3)")], "a finished formula is saved by the next tap")
    }

    func testReturnSavesAndMovesToTheCellBelow() {
        let a1 = cell("A1", 0, 0)
        let model = editing(a1)
        model.draft = "=ROUND("

        XCTAssertEqual(model.commitAndMoveDown(), [.write(a1, "=ROUND("), .select(sheetId: "s1", row: 1, column: 0)])
        XCTAssertEqual(model.receive(cell("A2", 1, 0, "next")), [], "the cell below isn't taken as a reference")
        XCTAssertEqual(model.draft, "next")
        XCTAssertTrue(model.isEditing, "the keyboard stays for the next cell")
    }

    func testDoneAfterPickingGivesTheSelectionBack() {
        let a4 = cell("A4", 3, 0)
        let model = editing(a4)
        model.draft = "=A1+"
        _ = model.receive(cell("B1", 0, 1))

        XCTAssertEqual(model.commit(), [.write(a4, "=A1+B1"), .select(sheetId: "s1", row: 3, column: 0)])
        XCTAssertFalse(model.isEditing)
        XCTAssertFalse(model.hasChanges)
    }

    func testCancelPutsBackWhatTheCellHolds() {
        let model = editing(cell("A1", 0, 0, "kept"))
        model.draft = "typed"

        XCTAssertEqual(model.cancel(), [])
        XCTAssertEqual(model.draft, "kept")
        XCTAssertFalse(model.isEditing)
    }

    func testNothingTypedNothingWritten() {
        let model = editing(cell("A1", 0, 0, "same"))
        XCTAssertEqual(model.commit(), [])
    }

    func testAnUndoUnderTheBarShowsUnlessSomethingWasTyped() {
        let model = editing(cell("A1", 0, 0, "before"))
        _ = model.receive(cell("A1", 0, 0, "after undo"))
        XCTAssertEqual(model.draft, "after undo")

        model.draft = "typing"
        _ = model.receive(cell("A1", 0, 0, "changed again"))
        XCTAssertEqual(model.draft, "typing")
    }

    func testAFunctionStartsAFormulaOrJoinsTheOneBeingWritten() {
        let model = editing(cell("A1", 0, 0, "text"))
        model.insertFunction("SUM", takesArguments: true)
        XCTAssertEqual(model.draft, "=SUM(")

        model.draft = "=A1+"
        model.insertFunction("TODAY", takesArguments: false)
        XCTAssertEqual(model.draft, "=A1+TODAY()")
    }

    func testOnlyAnOperandPositionTakesAReference() {
        let model = editing(cell("A1", 0, 0))
        for (draft, expected) in [("=", true), ("=A1*", true), ("=IF(A1>0, ", true), ("=SUM(A1:A2)", false), ("12", false)] {
            model.draft = draft
            XCTAssertEqual(model.acceptsReference, expected, draft)
        }
    }

    // MARK: Tap and type

    func testTappingACellPutsTheCaretInTheBar() {
        let model = SpreadsheetCellBarModel()
        _ = model.receive(cell("A1", 0, 0))
        XCTAssertFalse(model.wantsFocus, "opening the sheet doesn't bring up the keyboard")

        _ = model.receive(cell("C3", 2, 2, "x", tapped: true))
        XCTAssertTrue(model.wantsFocus)
    }

    func testDraggingOutARangeDoesntBringUpTheKeyboard() {
        let model = SpreadsheetCellBarModel()
        _ = model.receive(cell("B2", 1, 1, range: "B2:D4", tapped: true))
        XCTAssertFalse(model.wantsFocus)
    }

    func testTappingAnotherCellWhileTypingSavesAndKeepsTheKeyboard() {
        let a1 = cell("A1", 0, 0)
        let model = editing(a1)
        model.draft = "typed"

        let actions = model.receive(cell("B5", 4, 1, tapped: true))

        XCTAssertEqual(actions, [.write(a1, "typed")])
        XCTAssertTrue(model.wantsFocus)
        XCTAssertEqual(model.draftCell?.address, "B5")
    }

    func testASaveWritesWhatsTypedAndTheEditGoesOn() {
        let a1 = cell("A1", 0, 0)
        let model = editing(a1)
        model.draft = "half"

        XCTAssertEqual(model.flushTypedInput(), [.write(a1, "half")])
        XCTAssertTrue(model.isEditing)
        XCTAssertEqual(model.flushTypedInput(), [], "written once")
        model.draft = "half done"
        XCTAssertEqual(model.commit(), [.write(a1.with(text: "half"), "half done")])
    }

    func testUniversOwnEditorTakesOverAfterSavingTheBar() {
        let a1 = cell("A1", 0, 0)
        let model = editing(a1)
        model.draft = "typed"

        let actions = model.receive(cell("A1", 0, 0, inCell: true))

        XCTAssertEqual(actions, [.write(a1, "typed")])
        XCTAssertFalse(model.isEditing)
        XCTAssertTrue(model.wantsBlur)
    }

    // MARK: Typing shows in the cell

    func testTypingShowsInTheCellAndConfirmingWritesItOnce() {
        let a1 = cell("A1", 0, 0, "old")
        let model = editing(a1)

        model.draft = "ne"
        XCTAssertEqual(model.draftChanged(), [.preview(a1, "ne")])
        model.draft = "new"
        XCTAssertEqual(model.draftChanged(), [.preview(a1, "new")])

        XCTAssertEqual(model.commit(), [.write(a1, "new")], "the write replaces the preview")
        XCTAssertNil(model.previewingCell)
    }

    func testTypingBackToWhatWasThereShowsItAgain() {
        let a1 = cell("A1", 0, 0, "same")
        let model = editing(a1)
        model.draft = "samex"
        _ = model.draftChanged()

        model.draft = "same"
        XCTAssertEqual(model.draftChanged(), [.endPreview(a1)])
        XCTAssertEqual(model.commit(), [])
    }

    func testCancelPutsTheCellBack() {
        let a1 = cell("A1", 0, 0, "kept")
        let model = editing(a1)
        model.draft = "typed"
        _ = model.draftChanged()

        XCTAssertEqual(model.cancel(), [.endPreview(a1)])
    }

    func testLoadingAnotherCellShowsNothing() {
        let model = editing(cell("A1", 0, 0, "a"))
        _ = model.receive(cell("B2", 1, 1, "b"))
        XCTAssertEqual(model.draftChanged(), [])
    }
}
