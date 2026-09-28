import SwiftData
import XCTest
@testable import Trinote

@MainActor
final class SearchViewModelTests: XCTestCase {
    private func makeViewModel(fetchesSnippets: Bool) async throws -> (SearchViewModel, MockTriliumClient) {
        // `AppState` reads the app's shared store, which the test host creates at launch.
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let appState = AppState()
        let client = MockTriliumClient()
        await client.setSearchResult(.success(SearchResponse(results: [TestFixtures.noteResponse(id: "hit")], debugInfo: nil)))
        appState.client = client
        let vm = SearchViewModel(appState: appState, fetchesSnippets: fetchesSnippets)
        vm.query = "groceries"
        return (vm, client)
    }

    func testSearchShowsResultsThenAsksForSnippets() async throws {
        let (vm, client) = try await makeViewModel(fetchesSnippets: true)
        await vm.performSearch()

        XCTAssertEqual(vm.results.map(\.noteId), ["hit"])
        XCTAssertFalse(vm.isSearching)
        let searches = await client.searchCalls
        let snippetSearches = await client.quickSearchCalls
        XCTAssertEqual(searches, ["groceries"])
        XCTAssertEqual(snippetSearches, ["groceries"])
    }

    func testNotePickerSearchSkipsTheSnippetSearch() async throws {
        let (vm, client) = try await makeViewModel(fetchesSnippets: false)
        await vm.performSearch()

        XCTAssertEqual(vm.results.map(\.noteId), ["hit"])
        let snippetSearches = await client.quickSearchCalls
        XCTAssertEqual(snippetSearches, [])
    }

    func testSearchNowReplacesAPendingSearchSoTheQueryRunsOnce() async throws {
        let (vm, client) = try await makeViewModel(fetchesSnippets: false)
        vm.onQueryChanged()
        vm.searchNow()
        try await Task.sleep(nanoseconds: 700_000_000)

        let searches = await client.searchCalls
        XCTAssertEqual(searches, ["groceries"])
        XCTAssertFalse(vm.isSearching)
    }

    // MARK: - Falling back to this device (issue #29)

    /// A view model whose server search takes 2 s against a 0.2 s timeout, with a device index holding one note
    /// about groceries.
    private func makeSlowServerViewModel() async throws -> (SearchViewModel, MockTriliumClient, AppState, URL) {
        let (_, client) = try await makeViewModel(fetchesSnippets: true)
        let appState = AppState()
        try XCTSkipUnless(appState.isOnline, "the server path needs a network connection")
        appState.client = client
        appState.activeProfile = ServerProfile(id: "search-test-server", name: "Test", baseURL: "https://example.invalid")
        await client.setSearchDelay(2)

        let container = try ModelContainer(
            for: Schema([CachedNote.self, CachedBranch.self, CachedAttribute.self]),
            configurations: [ModelConfiguration(isStoredInMemoryOnly: true)]
        )
        let context = ModelContext(container)
        let note = CachedNote(noteId: "local", title: "Shopping", noteType: "text", mime: "text/html", serverProfileId: "search-test-server")
        CacheStore.storeBody(Data("<p>buy groceries today</p>".utf8), in: note, utcDateModified: nil, contentBlobId: nil)
        context.insert(note)
        try context.save()
        let directory = FileManager.default.temporaryDirectory.appending(path: "SearchViewModelTests-\(UUID().uuidString)")
        let index = OfflineSearchIndex(modelContainer: container, directory: directory)
        await index.refresh(profileId: "search-test-server")

        let vm = SearchViewModel(appState: appState, serverTimeout: 0.2, localIndex: index)
        vm.query = "groceries"
        return (vm, client, appState, directory)
    }

    func testSlowServerFallsBackToThisDevice() async throws {
        let (vm, client, appState, directory) = try await makeSlowServerViewModel()
        defer { try? FileManager.default.removeItem(at: directory) }

        let started = Date()
        await vm.performSearch()

        XCTAssertLessThan(Date().timeIntervalSince(started), 1.5)
        XCTAssertEqual(vm.localResultsReason, .serverUnreachable)
        XCTAssertEqual(vm.results.map(\.noteId), ["local"])
        XCTAssertNotNil(vm.snippetsByNoteId["local"])
        XCTAssertNil(vm.error)
        XCTAssertNotNil(appState.activeServerSearchBackoff)
        let searches = await client.searchCalls
        XCTAssertEqual(searches, ["groceries"])
    }

    func testAfterAServerTimeoutSearchSkipsTheServerUntilRetry() async throws {
        let (vm, client, _, directory) = try await makeSlowServerViewModel()
        defer { try? FileManager.default.removeItem(at: directory) }
        await vm.performSearch()

        await vm.performSearch()
        let afterSecond = await client.searchCalls
        XCTAssertEqual(afterSecond.count, 1, "the back-off should skip the server")
        XCTAssertEqual(vm.localResultsReason, .serverUnreachable)
        XCTAssertTrue(vm.localResultsCanRetryServer)

        await vm.performSearch(forceServer: true)
        let afterRetry = await client.searchCalls
        XCTAssertEqual(afterRetry.count, 2, "Retry should ask the server again")
    }

    func testServerErrorFallsBackWithItsMessage() async throws {
        let (vm, client, appState, directory) = try await makeSlowServerViewModel()
        defer { try? FileManager.default.removeItem(at: directory) }
        await client.setSearchDelay(0)
        await client.setSearchResult(.failure(APIError.serverError(statusCode: 500, message: "boom")))

        await vm.performSearch()

        XCTAssertEqual(vm.localResultsReason, .serverFailed(APIError.serverError(statusCode: 500, message: "boom").localizedDescription))
        XCTAssertEqual(vm.results.map(\.noteId), ["local"])
        XCTAssertNil(appState.activeServerSearchBackoff, "only network failures start the back-off")
    }
}
