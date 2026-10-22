import XCTest
@testable import Trinote

/// Saving promoted fields from the note screen. Uses the app's shared store under a server id of its own, cleared
/// after each test.
@MainActor
final class PromotedFieldsViewModelTests: XCTestCase {
    private let profileId = "promoted-fields-test-server"
    private let noteId = "promotedNote"
    private var appState: AppState!

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func attribute(_ id: String, owner: String, _ name: String, _ value: String, position: Int = 10) -> AttributeItem {
        AttributeItem(attributeId: id, noteId: owner, type: .label, name: name, value: value,
                      position: position, isInheritable: owner != noteId)
    }

    private func makeViewModel(own: [AttributeItem], inherited: [AttributeItem], client: MockTriliumClient) async throws -> NoteDetailViewModel {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = client
        self.appState = appState
        try XCTSkipUnless(appState.isOnline, "promoted fields save online")
        let vm = NoteDetailViewModel(noteId: noteId, appState: appState)
        var note = NoteItem(from: TestFixtures.noteResponse(id: noteId)).withAttributes(own)
        note.inheritedAttributes = inherited
        vm.note = note
        return vm
    }

    func testAnEmptyFieldCreatesTheNotesOwnAttribute() async throws {
        let mock = MockTriliumClient()
        let definition = attribute("def", owner: "parent", "label:status", "promoted,single,select,options=todo;done")
        let vm = try await makeViewModel(own: [], inherited: [definition], client: mock)
        let cell = try XCTUnwrap(PromotedAttributeCells.cells(for: XCTUnwrap(vm.note)).first)

        let saved = await vm.savePromotedValue(cell, value: "done")

        XCTAssertTrue(saved)
        let calls = await mock.updateNoteAttributeCalls
        XCTAssertEqual(calls, [UpdateNoteAttributeRequest(noteId: noteId, attributeId: nil, type: "label", name: "status", value: "done")])
    }

    func testANewOptionIsAddedToTheDefinitionOnItsOwnNote() async throws {
        let mock = MockTriliumClient()
        let definition = attribute("def", owner: "parent", "label:status", "promoted,single,select,options=todo")
        let vm = try await makeViewModel(own: [], inherited: [definition], client: mock)
        let cell = try XCTUnwrap(PromotedAttributeCells.cells(for: XCTUnwrap(vm.note)).first)

        let added = await vm.addPromotedOption(cell, option: "in progress")

        XCTAssertTrue(added)
        let calls = await mock.updateNoteAttributeCalls
        XCTAssertEqual(calls.first?.noteId, "parent")
        XCTAssertEqual(calls.first?.attributeId, "def")
        XCTAssertEqual(calls.first?.value, "promoted,single,select,options=todo;in progress")
    }

    func testMultiValueFieldsUpdateInPlaceAndDeleteTheSpares() async throws {
        let mock = MockTriliumClient()
        let own = [
            attribute("def", owner: noteId, "label:tag", "promoted,multi,text"),
            attribute("t1", owner: noteId, "tag", "a", position: 20),
            attribute("t2", owner: noteId, "tag", "b", position: 30),
        ]
        let vm = try await makeViewModel(own: own, inherited: [], client: mock)
        let cell = try XCTUnwrap(PromotedAttributeCells.cells(for: XCTUnwrap(vm.note)).first)

        let saved = await vm.savePromotedValues(cell, values: ["c"])

        XCTAssertTrue(saved)
        let updates = await mock.updateNoteAttributeCalls
        XCTAssertEqual(updates.map(\.attributeId), ["t1"])
        XCTAssertEqual(updates.map(\.value), ["c"])
        let deletions = await mock.deleteAttributeCalls
        XCTAssertEqual(deletions.map(\.attributeId), ["t2"])
    }
}
