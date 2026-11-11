import XCTest
@testable import Trinote

/// A saved search note runs on the server and lists what it found.
@MainActor
final class SavedSearchTests: XCTestCase {
    private func makeViewModel(_ client: MockTriliumClient) -> NoteDetailViewModel {
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: "saved-search-test", name: "Test", baseURL: "https://example.invalid")
        appState.client = client
        return NoteDetailViewModel(noteId: "search", appState: appState)
    }

    func testRunsOnTheServerAndKeepsItsTerms() async throws {
        let client = MockTriliumClient()
        await client.setSavedSearchResponse(SavedSearchResponse(searchResultNoteIds: ["b", "a"], highlightedTokens: ["foo"], error: nil))
        let results = try await makeViewModel(client).runSavedSearch()
        XCTAssertEqual(results, .init(noteIds: ["b", "a"], highlightTerms: ["foo"], error: nil))
        let calls = await client.savedSearchCalls
        XCTAssertEqual(calls, ["search"])
    }

    func testABlankErrorIsNotAnError() {
        let response = SavedSearchResponse(searchResultNoteIds: [], highlightedTokens: nil, error: "  ")
        XCTAssertNil(NoteDetailViewModel.SavedSearchResults(response).error)
        let parse = SavedSearchResponse(searchResultNoteIds: [], highlightedTokens: nil, error: "Unexpected token")
        XCTAssertEqual(NoteDetailViewModel.SavedSearchResults(parse).error, "Unexpected token")
    }

    func testTheResponseDecodesAsTriliumSendsIt() throws {
        let json = #"{"searchResultNoteIds":["x"],"highlightedTokens":["t"],"highlightedTokenInfos":[{"token":"t"}],"error":null}"#
        let response = try JSONDecoder().decode(SavedSearchResponse.self, from: Data(json.utf8))
        XCTAssertEqual(response.searchResultNoteIds, ["x"])
        XCTAssertEqual(response.highlightedTokens, ["t"])
        XCTAssertNil(response.error)
    }

    func testResultsKeepTheServersOrder() async {
        let client = MockTriliumClient()
        await client.setNoteResult("a", .success(TestFixtures.noteResponse(id: "a", title: "A")))
        await client.setNoteResult("b", .success(TestFixtures.noteResponse(id: "b", title: "B")))
        let notes = await makeViewModel(client).savedSearchNotes(ids: ["b", "a"])
        XCTAssertEqual(notes.map(\.noteId), ["b", "a"])
    }
}
