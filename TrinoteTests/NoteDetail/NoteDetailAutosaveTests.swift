import XCTest
@testable import Trinote

/// Autosave (issue #26): saving while the editor stays open, Cancel after an autosave, and the cases that
/// mustn't save. Uses the app's shared store under a server id of its own, cleared after each test.
@MainActor
final class NoteDetailAutosaveTests: XCTestCase {
    private let profileId = "autosave-test-server"
    private let noteId = "autosaveTestNote"
    private var appState: AppState!

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func makeViewModel(type: NoteType, body: String) async throws -> NoteDetailViewModel {
        // `AppState` reads the app's shared store, which the test host creates at launch.
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        self.appState = appState
        let vm = NoteDetailViewModel(noteId: noteId, appState: appState)
        let mime = type == .text ? "text/html" : "text/plain"
        vm.note = NoteItem(from: TestFixtures.noteResponse(id: noteId, type: type.rawValue, mime: mime))
        vm.contentString = body
        return vm
    }

    private func queuedBody() -> String? {
        let rows = (try? PersistenceManager.shared.fetchPendingNoteBodyUploads(serverProfileId: profileId)) ?? []
        return rows.first { $0.noteId == noteId }.map { String(decoding: $0.body, as: UTF8.self) }
    }

    func testAutosaveQueuesTheBodyAndKeepsEditing() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        vm.editableContent = "changed"

        XCTAssertTrue(vm.noteEditedBody(vm.editableContent))
        XCTAssertEqual(vm.autosaveStatus, .edited)
        XCTAssertTrue(vm.autosaveEditedBody(vm.editableContent))

        XCTAssertTrue(vm.isEditing)
        XCTAssertEqual(queuedBody(), "changed")
        XCTAssertEqual(vm.autosaveStatus, .saved)
        XCTAssertTrue(vm.hasAutosavedThisSession)
    }

    func testUnchangedBodyIsNotSaved() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()

        XCTAssertFalse(vm.noteEditedBody(vm.editableContent))
        XCTAssertFalse(vm.autosaveEditedBody(vm.editableContent))
        XCTAssertNil(queuedBody())
    }

    func testSavingTheSameBodyTwiceQueuesItOnce() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()

        XCTAssertTrue(vm.autosaveEditedBody("changed"))
        XCTAssertFalse(vm.autosaveEditedBody("changed"))
    }

    func testNothingIsSavedOutsideTheEditor() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")

        XCTAssertFalse(vm.autosaveEditedBody("changed"))
        XCTAssertNil(queuedBody())
    }

    func testNothingIsSavedWhilePhotosUpload() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>original</p>")
        vm.startEditing()
        vm.mediaUploadStatus = "Uploading photo 1 of 2…"

        XCTAssertFalse(vm.autosaveEditedBody("<p>changed</p>"))
        XCTAssertNil(queuedBody())
    }

    func testNothingIsSavedAfterSwitchingServers() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        appState.activeProfile = ServerProfile(id: "autosave-other-server", name: "Other", baseURL: "https://other.invalid")

        XCTAssertFalse(vm.autosaveEditedBody("changed"))
        try? PersistenceManager.shared.clearCache(for: "autosave-other-server")
    }

    func testTextNoteIsComparedWithTheEditorsOwnSerialization() async throws {
        // The editor tidies the stored HTML; that alone mustn't count as an edit.
        let vm = try await makeViewModel(type: .text, body: "<p>Hello</p>\n")
        vm.startEditing()
        vm.setAutosaveBaselineFromEditor("<p>Hello</p>")

        XCTAssertFalse(vm.receiveEditorUpdate("<p>Hello</p>"))
        XCTAssertFalse(vm.autosaveRichText(freshHTML: "<p>Hello</p>"))
        XCTAssertNil(queuedBody())

        XCTAssertTrue(vm.receiveEditorUpdate("<p>Hello world</p>"))
        XCTAssertTrue(vm.autosaveRichText(freshHTML: "<p>Hello world</p>"))
        XCTAssertEqual(queuedBody(), "<p>Hello world</p>")
    }

    func testLatestKnownTextIsSavedWhenTheEditorGoesAway() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>Hello</p>")
        vm.startEditing()
        vm.setAutosaveBaselineFromEditor("<p>Hello</p>")
        vm.receiveEditorUpdate("<p>Hello again</p>")

        vm.autosaveLatestKnownContent()

        XCTAssertEqual(queuedBody(), "<p>Hello again</p>")
        XCTAssertTrue(vm.isEditing)
    }

    func testCancelAfterAutosavePutsBackTheOriginal() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        XCTAssertFalse(vm.cancelEditingNeedsConfirmation)
        XCTAssertTrue(vm.autosaveEditedBody("changed"))
        XCTAssertTrue(vm.cancelEditingNeedsConfirmation)

        vm.cancelEditing()

        XCTAssertFalse(vm.isEditing)
        XCTAssertEqual(queuedBody(), "original")
        XCTAssertEqual(vm.contentString, "original")
        XCTAssertEqual(vm.editableContent, "original")
    }

    func testCancelWithoutAutosaveQueuesNothing() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        vm.editableContent = "changed"

        vm.cancelEditing()

        XCTAssertFalse(vm.isEditing)
        XCTAssertNil(queuedBody())
        XCTAssertEqual(vm.editableContent, "original")
    }

    func testSaveAfterAutosaveClosesTheEditor() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        vm.editableContent = "changed"
        XCTAssertTrue(vm.autosaveEditedBody(vm.editableContent))

        vm.saveContent()

        XCTAssertFalse(vm.isEditing)
        XCTAssertEqual(vm.contentString, "changed")
        XCTAssertEqual(queuedBody(), "changed")
        XCTAssertEqual(vm.autosaveStatus, .idle)
    }

    func testSaveWithoutChangesQueuesNothing() async throws {
        // Back with Back Button Saves on after opening the editor by mistake.
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()

        vm.saveContent()

        XCTAssertFalse(vm.isEditing)
        XCTAssertNil(queuedBody())
    }

    func testRestoredDraftIsSavedByAutosave() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.hasDraft = true
        vm.editableContent = "draft text"

        vm.restoreDraft()
        XCTAssertTrue(vm.editSessionStartedFromDraft)
        XCTAssertEqual(vm.autosaveStatus, .edited)
        vm.autosaveLatestKnownContent()

        XCTAssertEqual(queuedBody(), "draft text")
        XCTAssertFalse(vm.hasDraft)
    }

    func testCanvasPlaceholderIsNeverAutosaved() async throws {
        let vm = try await makeViewModel(type: .canvas, body: #"{"type":"excalidraw","version":2,"elements":[]}"#)
        vm.startEditing()

        XCTAssertFalse(vm.autosaveCanvas(json: "{}"))
        XCTAssertNil(queuedBody())
    }

    func testDeletingWhileEditingLeavesNoQueuedUpload() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        XCTAssertTrue(vm.autosaveEditedBody("changed"))

        // No client, so the deletion is queued for later.
        let deleted = await vm.deleteNote()

        XCTAssertTrue(deleted)
        XCTAssertFalse(vm.isEditing)
        XCTAssertNil(queuedBody())
        vm.autosaveLatestKnownContent()
        XCTAssertNil(queuedBody())
    }
}
