import XCTest
@testable import Trinote

/// The Attributes sheet's saving. Uses the app's shared store under a server id of its own, cleared after each test.
@MainActor
final class NoteAttributesModelTests: XCTestCase {
    private let profileId = "attributes-model-test-server"
    private let noteId = "attributesNote"
    private var appState: AppState!

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func note(_ attributes: [AttributeResponse]) -> NoteResponse {
        TestFixtures.noteResponse(id: noteId, attributes: attributes)
    }

    private func label(_ id: String, _ name: String, _ value: String = "") -> AttributeResponse {
        AttributeResponse(attributeId: id, noteId: noteId, type: "label", name: name, value: value,
                          position: 10, isInheritable: false, utcDateModified: nil)
    }

    private func makeModel(client: MockTriliumClient?, attributes: [AttributeResponse]) async throws -> NoteAttributesModel {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = client
        self.appState = appState
        let vm = NoteDetailViewModel(noteId: noteId, appState: appState)
        vm.note = NoteItem(from: note(attributes))
        return NoteAttributesModel(viewModel: vm, appState: appState)
    }

    func testAddingSendsTheWholeListFetchedJustBefore() async throws {
        let mock = MockTriliumClient()
        // The server already has a label the sheet doesn't show yet (added on another device).
        await mock.setNoteResult(noteId, .success(note([label("a1", "archived"), label("a2", "fromDesktop")])))
        let model = try await makeModel(client: mock, attributes: [label("a1", "archived")])
        try XCTSkipUnless(appState.isOnline, "attribute changes need a connection")

        let saved = await model.save(.add(AttributeDraft(type: .label, name: "status", value: "todo")))

        XCTAssertTrue(saved)
        let sent = await mock.replaceOwnedAttributesCalls
        XCTAssertEqual(sent.count, 1)
        XCTAssertEqual(sent.first?.noteId, noteId)
        XCTAssertEqual(sent.first?.attributes.map(\.name), ["archived", "fromDesktop", "status"])
    }

    func testAnAttributeGoneFromTheServerIsNotSentAgain() async throws {
        let mock = MockTriliumClient()
        await mock.setNoteResult(noteId, .success(note([])))
        let model = try await makeModel(client: mock, attributes: [label("a1", "archived")])
        try XCTSkipUnless(appState.isOnline, "attribute changes need a connection")

        let saved = await model.save(.delete(attributeId: "a1"))

        XCTAssertFalse(saved)
        XCTAssertNotNil(model.errorMessage)
        let sent = await mock.replaceOwnedAttributesCalls
        XCTAssertTrue(sent.isEmpty)
    }

    func testARelationTheServerSkippedIsReported() async throws {
        let mock = MockTriliumClient()
        await mock.setNoteResult(noteId, .success(note([])))
        let model = try await makeModel(client: mock, attributes: [])
        try XCTSkipUnless(appState.isOnline, "attribute changes need a connection")

        // The mock server keeps returning no attributes, as Trilium does for a missing target.
        let saved = await model.save(.add(AttributeDraft(type: .relation, name: "author", value: "missingNote")))

        XCTAssertFalse(saved)
        XCTAssertNotNil(model.errorMessage)
    }

    func testOfflineNothingIsSent() async throws {
        let model = try await makeModel(client: nil, attributes: [label("a1", "archived")])
        XCTAssertFalse(model.canEdit)
        let saved = await model.save(.delete(attributeId: "a1"))
        XCTAssertFalse(saved)
        XCTAssertNotNil(model.errorMessage)
    }

    func testListsOwnAttributesWithoutAutoLinksAndInheritedOnesByOwner() async throws {
        let model = try await makeModel(client: nil, attributes: [
            label("a1", "archived"),
            AttributeResponse(attributeId: "l1", noteId: noteId, type: "relation", name: "internalLink", value: "x",
                              position: 20, isInheritable: false, utcDateModified: nil),
        ])
        XCTAssertEqual(model.owned.map(\.attributeId), ["a1"])
        XCTAssertTrue(model.inherited.isEmpty)
    }

    func testSecretsAreNeverSuggested() async throws {
        let mock = MockTriliumClient()
        let model = try await makeModel(client: mock, attributes: [])
        let values = await model.usedValues(forLabel: "shareCredentials")
        XCTAssertEqual(values, [])
    }
}
