import XCTest
import UIKit
@testable import Trinote

final class NoteEditorSavingTests: XCTestCase {
    func testAutosaveDelayOptionsDefaultToFiveSeconds() {
        XCTAssertEqual(NoteEditorSaving.autosaveDelayOptions, [1, 2, 3, 5, 7, 10, 12])
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

    func testSaveButtonAlwaysShowsWithoutAutosave() {
        for status in [EditorAutosaveStatus.idle, .edited, .saved] {
            XCTAssertTrue(NoteEditorSaving.showsSaveButton(autosave: false, hideSaveButton: false, status: status))
            // Hide Save Button only applies with Autosave.
            XCTAssertTrue(NoteEditorSaving.showsSaveButton(autosave: false, hideSaveButton: true, status: status))
        }
    }

    func testWithAutosaveSaveButtonShowsOnlyWhileChangesAreUnsaved() {
        XCTAssertFalse(NoteEditorSaving.showsSaveButton(autosave: true, hideSaveButton: false, status: .idle))
        XCTAssertTrue(NoteEditorSaving.showsSaveButton(autosave: true, hideSaveButton: false, status: .edited))
        XCTAssertFalse(NoteEditorSaving.showsSaveButton(autosave: true, hideSaveButton: false, status: .saved))
        XCTAssertFalse(NoteEditorSaving.showsSaveButton(autosave: true, hideSaveButton: true, status: .edited))
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

    // MARK: - Editor page reloaded after its process ended

    func testReloadedEditorShowsTheNewestContent() {
        XCTAssertEqual(EditorReloadRecovery.content(pending: "queued", latest: "typed", initial: "opened"), "queued")
        XCTAssertEqual(EditorReloadRecovery.content(pending: nil, latest: "typed", initial: "opened"), "typed")
        // Only with no edits at all does it fall back to the note as it was opened.
        XCTAssertEqual(EditorReloadRecovery.content(pending: nil, latest: nil, initial: "opened"), "opened")
    }

    func testReloadedEditorOnlyReportsABaselineWhenNothingWasEdited() {
        XCTAssertTrue(EditorReloadRecovery.reportsLoadedContentAfterReload(alreadyReported: false, receivedChanges: false))
        // Edits restored into the page aren't saved yet, so they mustn't become the baseline.
        XCTAssertFalse(EditorReloadRecovery.reportsLoadedContentAfterReload(alreadyReported: false, receivedChanges: true))
        XCTAssertFalse(EditorReloadRecovery.reportsLoadedContentAfterReload(alreadyReported: true, receivedChanges: false))
    }

    func testEditorStopsReloadingAPageThatKeepsEndingItsProcess() {
        var recovery = EditorReloadRecovery()
        let start = Date(timeIntervalSinceReferenceDate: 1_000)
        for i in 0..<EditorReloadRecovery.maxReloads {
            XCTAssertTrue(recovery.allowsReload(at: start.addingTimeInterval(Double(i))))
        }
        XCTAssertFalse(recovery.allowsReload(at: start.addingTimeInterval(10)))
        // Once the first reload is a window old, there's room again.
        XCTAssertTrue(recovery.allowsReload(at: start.addingTimeInterval(EditorReloadRecovery.window)))
    }

    @MainActor
    func testPageThatKeepsEndingItsProcessIsReloadedThreeTimes() throws {
        try XCTSkipIf(UIApplication.shared.applicationState == .background, "reloads wait for the app to come back")
        let recovery = WebContentProcessRecovery(label: "Test page")
        var reloads = 0
        for _ in 0..<(EditorReloadRecovery.maxReloads + 1) {
            recovery.pageProcessEnded { reloads += 1 }
        }
        XCTAssertEqual(reloads, EditorReloadRecovery.maxReloads)
    }

    // MARK: - Upload that landed before its reply

    func testServerBodyMatchingTheQueuedOneMeansTheUploadLanded() {
        let queued = Data("<p>edited</p>".utf8)
        XCTAssertTrue(PendingNoteBodyUpload.serverAlreadyHas(queued, queued: queued))
        XCTAssertTrue(PendingNoteBodyUpload.serverAlreadyHas(Data("<p>edited</p>\n".utf8), queued: queued))
        XCTAssertFalse(PendingNoteBodyUpload.serverAlreadyHas(Data("<p>changed elsewhere</p>".utf8), queued: queued))
    }

    func testBinaryBodiesMustMatchExactly() {
        let queued = Data([0xFF, 0x00, 0x20])
        XCTAssertTrue(PendingNoteBodyUpload.serverAlreadyHas(queued, queued: queued))
        XCTAssertFalse(PendingNoteBodyUpload.serverAlreadyHas(Data([0xFE, 0x00, 0x20]), queued: queued))
        XCTAssertFalse(PendingNoteBodyUpload.serverAlreadyHas(Data([0xFF, 0x00]), queued: queued))
    }
}
