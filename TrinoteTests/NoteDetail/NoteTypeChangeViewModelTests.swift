import XCTest
@testable import Trinote

/// Changing a note's type from the note screen, and editors opening content they can't read. Uses the app's shared
/// store under a server id of its own, cleared after each test.
@MainActor
final class NoteTypeChangeViewModelTests: XCTestCase {
    private let profileId = "type-change-test-server"
    private let noteId = "typeChangeNote"
    private var appState: AppState!

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func makeViewModel(type: String, mime: String, body: String, client: MockTriliumClient? = nil) async throws -> NoteDetailViewModel {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = client
        self.appState = appState
        let vm = NoteDetailViewModel(noteId: noteId, appState: appState)
        vm.note = NoteItem(from: TestFixtures.noteResponse(id: noteId, type: type, mime: mime))
        vm.contentString = body
        return vm
    }

    func testChangingTypeSendsDesktopsTypeAndMime() async throws {
        let mock = MockTriliumClient()
        let changed = TestFixtures.noteResponse(id: noteId, type: "mermaid", mime: "text/mermaid")
        await mock.setUpdateNoteResult(.success(changed))
        // The note is read again afterwards, as the server now has it.
        await mock.setNoteResult(noteId, .success(changed))
        let vm = try await makeViewModel(type: "code", mime: "text/plain", body: "graph TD", client: mock)
        try XCTSkipUnless(appState.isOnline, "type changes need a connection")

        let didChange = await vm.changeNoteType(to: NoteTypeChange.Entry.mermaid.target)

        XCTAssertTrue(didChange)
        let calls = await mock.updateNoteCalls
        XCTAssertEqual(calls.first?.0, noteId)
        XCTAssertEqual(calls.first?.1.type, "mermaid")
        XCTAssertEqual(calls.first?.1.mime, "text/mermaid")
        XCTAssertNil(calls.first?.1.title)
        XCTAssertEqual(vm.note?.type, .mermaid)
    }

    func testNoChangeWhileEditingOrOffline() async throws {
        let mock = MockTriliumClient()
        let vm = try await makeViewModel(type: "text", mime: "text/html", body: "<p>Hi</p>", client: mock)
        vm.startEditing()
        let whileEditing = await vm.changeNoteType(to: NoteTypeChange.Entry.code.target)
        XCTAssertFalse(whileEditing)
        vm.cancelEditing()

        let offline = try await makeViewModel(type: "text", mime: "text/html", body: "<p>Hi</p>", client: nil)
        let changedOffline = await offline.changeNoteType(to: NoteTypeChange.Entry.code.target)
        XCTAssertFalse(changedOffline)
        XCTAssertTrue(offline.showSaveError)
        let calls = await mock.updateNoteCalls
        XCTAssertTrue(calls.isEmpty)
    }

    func testTypesTriliumMakesItselfCantChange() async throws {
        let vm = try await makeViewModel(type: "file", mime: "application/pdf", body: "")
        XCTAssertFalse(vm.canChangeNoteType)
        let text = try await makeViewModel(type: "text", mime: "text/html", body: "")
        XCTAssertTrue(text.canChangeNoteType)
    }

    func testEditorsStartEmptyWhenTheyCantReadTheContent() async throws {
        let mindMap = try await makeViewModel(type: "mindMap", mime: "application/json", body: "<p>Was text</p>")
        mindMap.startEditing()
        XCTAssertEqual(mindMap.editableContent, NoteType.emptyMindMapJSON)

        let canvas = try await makeViewModel(type: "canvas", mime: "application/json", body: "")
        canvas.startEditing()
        XCTAssertEqual(canvas.editableContent, NoteType.emptyCanvasNoteJSON)

        let sheet = try await makeViewModel(type: "spreadsheet", mime: "application/json", body: "<p>Was text</p>")
        sheet.startEditing()
        XCTAssertEqual(sheet.editableContent, NoteType.emptySpreadsheetJSON)

        // Content the editor can open is left alone, including a bare workbook.
        let workbook = #"{"id":"w","sheets":{"s1":{}}}"#
        let realSheet = try await makeViewModel(type: "spreadsheet", mime: "application/json", body: workbook)
        realSheet.startEditing()
        XCTAssertEqual(realSheet.editableContent, workbook)
        let realMap = try await makeViewModel(type: "mindMap", mime: "application/json", body: NoteType.emptyMindMapJSON)
        realMap.startEditing()
        XCTAssertEqual(realMap.editableContent, NoteType.emptyMindMapJSON)
    }
}
