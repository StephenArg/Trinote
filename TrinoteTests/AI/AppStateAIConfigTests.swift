import XCTest
@testable import Trinote

@MainActor
final class AppStateAIConfigTests: XCTestCase {

    func testRefreshReadsTheServersOptionsAndWritesReReadThem() async throws {
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let mock = MockTriliumClient()
        await mock.setOptionsResult(.success(TriliumOptionsResponse(values: ["aiEnabled": "true", "llmProviders": "[]", "mcpEnabled": "false"])))
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: "ai-config-test", name: "Test", baseURL: "https://example.invalid")
        appState.client = mock
        appState.isAuthenticated = true
        try XCTSkipUnless(appState.isOnline, "reading options needs a connection")

        let config = await appState.refreshAIConfig()
        XCTAssertEqual(config?.aiEnabled, true)
        XCTAssertEqual(appState.aiConfig?.providers, [])
        XCTAssertEqual(appState.aiAvailability, .unknown, "the server version hasn't been read in this test")
        XCTAssertFalse(appState.showsAIEntryPoints)

        await mock.setOptionsResult(.success(TriliumOptionsResponse(values: ["aiEnabled": "false"])))
        try await appState.updateAIOptions(["aiEnabled": "false"])
        let writes = await mock.updateOptionsCalls
        XCTAssertEqual(writes, [["aiEnabled": "false"]])
        XCTAssertEqual(appState.aiConfig?.aiEnabled, false)
    }

    func testRefreshKeepsTheLastReadingWhenTheServerFails() async throws {
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let mock = MockTriliumClient()
        await mock.setOptionsResult(.success(TriliumOptionsResponse(values: ["aiEnabled": "true"])))
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: "ai-config-test-2", name: "Test", baseURL: "https://example.invalid")
        appState.client = mock
        appState.isAuthenticated = true
        try XCTSkipUnless(appState.isOnline, "reading options needs a connection")

        _ = await appState.refreshAIConfig()
        await mock.setOptionsResult(.failure(APIError.serverError(statusCode: 500, message: "boom")))
        _ = await appState.refreshAIConfig()
        XCTAssertEqual(appState.aiConfig?.aiEnabled, true)
    }

    func testUnlockingFetchesReadableTitlesOfEveryCachedProtectedNote() async throws {
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let profileId = "protected-titles-test"
        let persistence = PersistenceManager.shared
        // Protected notes deep in the tree, cached with what sync stored (ciphertext) or tree/load gave while locked.
        for (id, title) in [("deep1", "U2FsdGVkX1+aaaa=="), ("deep2", "[protected]")] {
            try persistence.cache.cacheNoteBatch(
                from: TestFixtures.noteResponse(id: id, title: title, isProtected: true, parentNoteIds: ["somewhere"]),
                serverProfileId: profileId
            )
        }
        try persistence.cache.cacheNoteBatch(from: TestFixtures.noteResponse(id: "plain", title: "Plain"), serverProfileId: profileId)
        try persistence.commitBatch()
        defer {
            try? persistence.deleteCachedNotes(noteIds: ["deep1", "deep2", "plain"], serverProfileId: profileId)
            ProtectedSessionTimeout.forgetLastActivity(profileId: profileId)
        }

        let mock = MockTriliumClient()
        await mock.setNoteResult("deep1", .success(TestFixtures.noteResponse(id: "deep1", title: "Budget 2027", isProtected: true)))
        await mock.setNoteResult("deep2", .success(TestFixtures.noteResponse(id: "deep2", title: "Diary", isProtected: true)))
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = mock
        appState.isAuthenticated = true
        try XCTSkipUnless(appState.isOnline, "fetching titles needs a connection")

        var treeRefreshes = 0
        let observer = NotificationCenter.default.addObserver(forName: .trinoteTreeShouldRefresh, object: nil, queue: nil) { _ in
            treeRefreshes += 1
        }
        defer { NotificationCenter.default.removeObserver(observer) }

        appState.protectedSessionActive = true
        await appState.refreshProtectedNoteTitles()
        XCTAssertEqual(try persistence.fetchCachedNote(id: "deep1", serverProfileId: profileId)?.title, "Budget 2027")
        XCTAssertEqual(try persistence.fetchCachedNote(id: "deep2", serverProfileId: profileId)?.title, "Diary")
        XCTAssertEqual(try persistence.fetchCachedNote(id: "plain", serverProfileId: profileId)?.title, "Plain")
        XCTAssertGreaterThanOrEqual(treeRefreshes, 1)
        let loaded = await mock.batchTreeLoadCalls.flatMap { $0 }
        XCTAssertTrue(Set(loaded).isSuperset(of: ["deep1", "deep2"]))
        XCTAssertFalse(loaded.contains("plain"), "only protected notes are fetched")
        XCTAssertNotNil(ProtectedSessionTimeout.rememberedLastActivity(profileId: profileId), "the open session is remembered for a relaunch")

        appState.protectedSessionActive = false
        XCTAssertNil(ProtectedSessionTimeout.rememberedLastActivity(profileId: profileId), "locking forgets it")
    }
}
