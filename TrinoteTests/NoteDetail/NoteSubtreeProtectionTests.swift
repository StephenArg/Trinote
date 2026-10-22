import XCTest
@testable import Trinote

/// Protect/Unprotect Subtree from the note ⋯ menu: desktop's tree-menu actions, which need the protected session.
@MainActor
final class NoteSubtreeProtectionTests: XCTestCase {
    private let profileId = "subtree-protection-test-server"
    private let noteId = "protectMe"
    private var appState: AppState!

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func makeViewModel(noteId: String? = nil, isProtected: Bool = false, client: MockTriliumClient?) async throws -> NoteDetailViewModel {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = client
        self.appState = appState
        // A fresh AppState's network monitor reports the connection a moment after it starts.
        for _ in 0..<40 where !appState.isOnline {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        let id = noteId ?? self.noteId
        let vm = NoteDetailViewModel(noteId: id, appState: appState)
        vm.note = NoteItem(from: TestFixtures.noteResponse(id: id, type: "text", mime: "text/html", isProtected: isProtected))
        return vm
    }

    func testProtectingOpensTheProtectedSessionFirstThenProtectsTheWholeSubtree() async throws {
        let mock = MockTriliumClient()
        await mock.setNoteResult(noteId, .success(TestFixtures.noteResponse(id: noteId, isProtected: true)))
        let vm = try await makeViewModel(client: mock)
        try XCTSkipUnless(appState.isOnline, "protecting needs a connection")
        XCTAssertFalse(appState.protectedSessionActive)

        let done = await vm.setSubtreeProtection(true, documentPassword: "  secret  ")

        XCTAssertTrue(done)
        XCTAssertTrue(appState.protectedSessionActive)
        let calls = await mock.setNoteProtectionCalls
        XCTAssertEqual(calls.count, 1)
        XCTAssertEqual(calls.first?.noteId, noteId)
        XCTAssertEqual(calls.first?.protect, true)
        XCTAssertEqual(calls.first?.includingSubtree, true)
        XCTAssertEqual(vm.note?.isProtected, true, "the note is read again as the server now has it")
        XCTAssertFalse(vm.isChangingProtection)
    }

    func testUnprotectingWithTheSessionOpenNeedsNoPassword() async throws {
        let mock = MockTriliumClient()
        let vm = try await makeViewModel(isProtected: true, client: mock)
        try XCTSkipUnless(appState.isOnline, "unprotecting needs a connection")
        appState.protectedSessionActive = true

        let done = await vm.setSubtreeProtection(false, documentPassword: nil)

        XCTAssertTrue(done)
        let calls = await mock.setNoteProtectionCalls
        XCTAssertEqual(calls.first?.protect, false)
        XCTAssertEqual(calls.first?.includingSubtree, true)
    }

    func testAClosedSessionWithoutAPasswordSendsNothing() async throws {
        let mock = MockTriliumClient()
        let vm = try await makeViewModel(client: mock)
        try XCTSkipUnless(appState.isOnline, "protecting needs a connection")

        let done = await vm.setSubtreeProtection(true, documentPassword: "   ")

        XCTAssertFalse(done)
        XCTAssertTrue(vm.showSaveError)
        let calls = await mock.setNoteProtectionCalls
        XCTAssertTrue(calls.isEmpty)
        XCTAssertFalse(appState.protectedSessionActive)
    }

    func testAWrongPasswordOrAServerRefusalIsShown() async throws {
        let mock = MockTriliumClient()
        await mock.setEnterProtectedSessionResult(.failure(APIError.unknown("Incorrect document password.")))
        let vm = try await makeViewModel(client: mock)
        try XCTSkipUnless(appState.isOnline, "protecting needs a connection")

        let wrongPassword = await vm.setSubtreeProtection(true, documentPassword: "nope")
        XCTAssertFalse(wrongPassword)
        XCTAssertTrue(vm.showSaveError)
        let afterWrongPassword = await mock.setNoteProtectionCalls
        XCTAssertTrue(afterWrongPassword.isEmpty)

        vm.showSaveError = false
        await mock.setEnterProtectedSessionResult(.success(()))
        await mock.setSetNoteProtectionResult(.failure(APIError.serverError(statusCode: 500, message: "Cannot (un)protect note")))
        let refused = await vm.setSubtreeProtection(true, documentPassword: "secret")
        XCTAssertFalse(refused)
        XCTAssertTrue(vm.showSaveError)
        XCTAssertFalse(vm.isChangingProtection)
    }

    func testOfflineSendsNothing() async throws {
        let vm = try await makeViewModel(client: nil)
        let done = await vm.setSubtreeProtection(true, documentPassword: "secret")
        XCTAssertFalse(done)
        XCTAssertTrue(vm.showSaveError)
    }

    func testTheRootAndTriliumsSystemNotesAreLeftAlone() async throws {
        let root = try await makeViewModel(noteId: TriliumTreeConstants.rootNoteId, client: MockTriliumClient())
        XCTAssertFalse(root.canChangeSubtreeProtection)
        let hidden = try await makeViewModel(noteId: "_hidden", client: MockTriliumClient())
        XCTAssertFalse(hidden.canChangeSubtreeProtection)
        let note = try await makeViewModel(client: MockTriliumClient())
        XCTAssertTrue(note.canChangeSubtreeProtection)
    }
}
