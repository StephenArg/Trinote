import XCTest
@testable import Trinote

final class NoteEditorSavingTests: XCTestCase {
    func testAutosaveDelayOptionsDefaultToFiveSeconds() {
        XCTAssertEqual(NoteEditorSaving.autosaveDelayOptions, [3, 5, 7, 10, 12])
        XCTAssertEqual(NoteEditorSaving.defaultAutosaveDelay, 5)
    }

    func testStoredDelayThatIsntAnOptionFallsBackToTheDefault() {
        for seconds in NoteEditorSaving.autosaveDelayOptions {
            XCTAssertEqual(NoteEditorSaving.autosaveDelay(forStored: seconds), seconds)
        }
        for stored in [-1, 0, 4, 30] {
            XCTAssertEqual(NoteEditorSaving.autosaveDelay(forStored: stored), 5)
        }
    }

    func testDelayTitleNamesTheSeconds() {
        XCTAssertTrue(NoteEditorSaving.delayTitle(for: 7).contains("7"))
    }

    func testSaveButtonCanOnlyBeHiddenWithAutosave() {
        XCTAssertFalse(NoteEditorSaving.hidesSaveButton(autosave: false, hideSaveButton: true))
        XCTAssertFalse(NoteEditorSaving.hidesSaveButton(autosave: true, hideSaveButton: false))
        XCTAssertTrue(NoteEditorSaving.hidesSaveButton(autosave: true, hideSaveButton: true))
    }

    func testAutosaveAlwaysSavesWhenLeaving() {
        XCTAssertFalse(NoteEditorSaving.savesWhenLeaving(autosave: false, backButtonSaves: false))
        XCTAssertTrue(NoteEditorSaving.savesWhenLeaving(autosave: false, backButtonSaves: true))
        XCTAssertTrue(NoteEditorSaving.savesWhenLeaving(autosave: true, backButtonSaves: false))
    }

    func testCanvasPlaceholderIsNotSaved() {
        XCTAssertFalse(NoteEditorSaving.isUsableCanvasJSON("{}"))
        XCTAssertFalse(NoteEditorSaving.isUsableCanvasJSON(""))
        // A cleared canvas is still a real scene.
        XCTAssertTrue(NoteEditorSaving.isUsableCanvasJSON(#"{"type":"excalidraw","version":2,"elements":[],"files":{}}"#))
    }

    func testMindMapPlaceholderIsNotSaved() {
        XCTAssertFalse(NoteEditorSaving.isUsableMindMapJSON("{}"))
        XCTAssertTrue(NoteEditorSaving.isUsableMindMapJSON(#"{"nodeData":{"id":"root","topic":"Root"},"direction":2}"#))
    }

    func testEmptyWorkbookIsNotSaved() {
        XCTAssertFalse(NoteEditorSaving.isUsableSpreadsheetJSON(""))
        XCTAssertFalse(NoteEditorSaving.isUsableSpreadsheetJSON(#"{"version":1,"workbook":{}}"#))
        XCTAssertTrue(NoteEditorSaving.isUsableSpreadsheetJSON(#"{"version":1,"workbook":{"id":"wb","sheets":{}}}"#))
    }
}
