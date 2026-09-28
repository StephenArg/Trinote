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
}
