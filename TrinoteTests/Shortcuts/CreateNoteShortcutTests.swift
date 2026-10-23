import XCTest
@testable import Trinote

@MainActor
final class CreateNoteShortcutTests: XCTestCase {
    private var profileId: String?
    private var appState: AppState!
    private var mock: MockTriliumClient!

    override func setUp() async throws {
        try XCTSkipUnless(PersistenceManager.isInitialized, "needs the app's store")
        let profileId = "create-note-\(UUID().uuidString)"
        self.profileId = profileId
        mock = MockTriliumClient()
        let state = AppState()
        state.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        state.client = mock
        state.isAuthenticated = true
        appState = state
    }

    override func tearDown() async throws {
        if let profileId, PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
    }

    func testTopOfTheTreeIsTheRoot() async throws {
        let parentNoteId = try await CreateNoteShortcut.parentNoteId(for: .topLevel, appState: appState)
        XCTAssertEqual(parentNoteId, TriliumTreeConstants.rootNoteId)
    }

    func testInboxWithNothingSyncedIsTheTopOfTheTree() async throws {
        // No #inbox note and no journal synced for this server, and no server version read yet.
        let parentNoteId = try await CreateNoteShortcut.parentNoteId(for: .inbox, appState: appState)
        XCTAssertEqual(parentNoteId, TriliumTreeConstants.rootNoteId)
    }

    func testTodaysJournalIsTodaysDayNote() async throws {
        try XCTSkipUnless(appState.isOnline, "online, the server finds today's note")
        await mock.setDayNote(NoteIdTitle(noteId: "d22", title: "22", isProtected: false, type: "text"))
        let parentNoteId = try await CreateNoteShortcut.parentNoteId(for: .todaysJournal, appState: appState)
        XCTAssertEqual(parentNoteId, "d22")
    }

    func testMakesATextNoteOnTheDeviceWithTheTextAsParagraphs() throws {
        let note = try CreateNoteShortcut.createLocalNote(title: "  Groceries ", text: "Milk\nEggs\n", parentNoteId: TriliumTreeConstants.rootNoteId, appState: appState)

        XCTAssertTrue(note.noteId.hasPrefix("ol_"), "made on the device, uploaded later")
        XCTAssertEqual(note.title, "Groceries")
        let cached = try PersistenceManager.shared.fetchCachedNote(id: note.noteId, serverProfileId: try XCTUnwrap(profileId))
        XCTAssertEqual(cached?.noteType, "text")
        XCTAssertEqual(cached?.content.map { String(decoding: $0, as: UTF8.self) }, "<p>Milk<br>Eggs</p>")
        let pending = try PersistenceManager.shared.fetchPendingNoteCreations(serverProfileId: try XCTUnwrap(profileId))
        XCTAssertEqual(pending.count, 1)
    }

    func testANoteWithoutTitleOrTextGetsTheNewNoteDefaults() throws {
        let note = try CreateNoteShortcut.createLocalNote(title: nil, text: "   ", parentNoteId: TriliumTreeConstants.rootNoteId, appState: appState)
        XCTAssertTrue(note.title.hasPrefix("Note "), note.title)
        let cached = try PersistenceManager.shared.fetchCachedNote(id: note.noteId, serverProfileId: try XCTUnwrap(profileId))
        XCTAssertEqual(cached?.content.map { String(decoding: $0, as: UTF8.self) } ?? "", NoteType.text.creationInitialContent)
    }

    func testRunningAppWaitsForTheAppToStart() async {
        let previous = AppState.current
        AppState.current = appState
        defer { AppState.current = previous }
        // A fresh AppState hasn't run its launch yet.
        do {
            _ = try await ShortcutSession.runningApp(timeout: 0.3)
            XCTFail("expected appNotReady")
        } catch {
            XCTAssertEqual(error as? ShortcutError, .appNotReady)
        }
        appState.isLoading = false
        let running = try? await ShortcutSession.runningApp(timeout: 1)
        XCTAssertTrue(running === appState)
    }

    func testRunningAppNeedsASignedInApp() async {
        appState.isLoading = false
        appState.isAuthenticated = false
        let previous = AppState.current
        AppState.current = appState
        defer { AppState.current = previous }
        do {
            _ = try await ShortcutSession.runningApp(timeout: 1)
            XCTFail("expected notSignedIn")
        } catch {
            XCTAssertEqual(error as? ShortcutError, .notSignedIn)
        }
    }
}

final class TriliumSessionFactoryTests: XCTestCase {
    /// Accepts every request and never answers, like a server behind a captive network.
    private final class NeverAnsweringURLProtocol: URLProtocol {
        override class func canInit(with request: URLRequest) -> Bool { true }
        override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }
        override func startLoading() {}
        override func stopLoading() {}
    }

    func testRestoreGivesUpAfterTheTimeout() async {
        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [NeverAnsweringURLProtocol.self]
        let client = TriliumClient(baseURL: URL(string: "https://never-answers.trinote.test")!, urlSessionConfiguration: configuration)
        let started = Date()
        do {
            try await TriliumSessionFactory.restoreSession(of: client, timeout: 0.3)
            XCTFail("expected a timeout")
        } catch {
            guard case .timeout = APIError.from(error) else { return XCTFail("expected timeout, got \(error)") }
        }
        XCTAssertLessThan(Date().timeIntervalSince(started), 5)
    }

    func testRestoreSucceedsWhenTheServerAnswers() async throws {
        let mock = MockTriliumClient()
        try await TriliumSessionFactory.restoreSession(of: mock, timeout: 5)
        let valid = await mock.isSessionValid
        XCTAssertTrue(valid)
    }

    @MainActor
    func testStartingTheStoreAgainKeepsTheSameStore() async throws {
        try XCTSkipUnless(PersistenceManager.isInitialized, "needs the app's store")
        let container = PersistenceManager.shared.container
        try await PersistenceManager.initializeShared()
        XCTAssertTrue(PersistenceManager.shared.container === container)
    }
}
