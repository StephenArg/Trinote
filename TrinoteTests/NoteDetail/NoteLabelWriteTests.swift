import XCTest
@testable import Trinote

/// Label writes from the note screen (the collection view switcher, `#expanded`, board options): they change the
/// label in place on the server, and the answer they take can't be undone by a read that began earlier.
@MainActor
final class NoteLabelWriteTests: XCTestCase {
    private let profileId = "label-write-test-server"
    private var appState: AppState!
    private var persistence: PersistenceManager { PersistenceManager.shared }

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func makeViewModel(client: MockTriliumClient, note: NoteResponse) async throws -> NoteDetailViewModel {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        try? persistence.clearCache(for: profileId)
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = client
        self.appState = appState
        try XCTSkipUnless(appState.isOnline, "label writes go to the server")
        let vm = NoteDetailViewModel(noteId: note.noteId, appState: appState)
        vm.note = NoteItem(from: note)
        return vm
    }

    private func viewTypeLabel(_ value: String, id: String = "a_viewType", position: Int = 10) -> AttributeResponse {
        AttributeResponse(attributeId: id, noteId: "coll", type: "label", name: "viewType", value: value, position: position, isInheritable: false, utcDateModified: nil)
    }

    private func collection(_ attributes: [AttributeResponse]) -> NoteResponse {
        TestFixtures.noteResponse(id: "coll", title: "Collection", type: "book", mime: "", attributes: attributes)
    }

    func testAnExistingLabelChangesInPlace() async throws {
        let mock = MockTriliumClient()
        await mock.setNoteResult("coll", .success(collection([viewTypeLabel("grid")])))
        let vm = try await makeViewModel(client: mock, note: collection([viewTypeLabel("grid")]))
        // What the server answers from now on (the mock can't change mid-write).
        await mock.setNoteResult("coll", .success(collection([viewTypeLabel("list")])))

        let saved = await vm.setNoteLabel(noteId: "coll", name: "viewType", value: "list")

        XCTAssertTrue(saved)
        let updates = await mock.updateNoteAttributeCalls
        XCTAssertEqual(updates, [
            UpdateNoteAttributeRequest(noteId: "coll", attributeId: "a_viewType", type: "label", name: "viewType", value: "list")
        ])
        let created = await mock.createAttributeCalls
        let deleted = await mock.deleteAttributeCalls
        XCTAssertTrue(created.isEmpty, "no delete-then-create: the note must never be without the label")
        XCTAssertTrue(deleted.isEmpty)
        XCTAssertEqual(vm.note?.viewTypeLabelValue, "list")
        XCTAssertEqual(NoteTypeChange.currentView(for: vm.note!), .list)
    }

    func testAMissingLabelIsCreated() async throws {
        let mock = MockTriliumClient()
        await mock.setNoteResult("coll", .success(collection([])))
        let vm = try await makeViewModel(client: mock, note: collection([]))

        let saved = await vm.setNoteLabel(noteId: "coll", name: "viewType", value: "dashboard")
        XCTAssertTrue(saved)

        let created = await mock.createAttributeCalls
        XCTAssertEqual(created.map(\.name), ["viewType"])
        XCTAssertEqual(created.map(\.value), ["dashboard"])
        let updates = await mock.updateNoteAttributeCalls
        XCTAssertTrue(updates.isEmpty)
    }

    func testCopiesOfTheLabelAreRemoved() async throws {
        let mock = MockTriliumClient()
        let twice = collection([viewTypeLabel("grid", id: "first", position: 10), viewTypeLabel("board", id: "second", position: 20)])
        await mock.setNoteResult("coll", .success(twice))
        let vm = try await makeViewModel(client: mock, note: twice)

        let saved = await vm.setNoteLabel(noteId: "coll", name: "viewType", value: "list")
        XCTAssertTrue(saved)

        let updates = await mock.updateNoteAttributeCalls
        XCTAssertEqual(updates.map(\.attributeId), ["first"])
        let deleted = await mock.deleteAttributeCalls
        XCTAssertEqual(deleted.map(\.attributeId), ["second"])
    }

    /// A sync asks for the children while the switcher writes `#viewType`: the parent as read before the write
    /// must not replace the written one once it arrives.
    func testAChildrenRefetchThatBeganBeforeAWriteKeepsTheWrittenLabel() async throws {
        let mock = MockTriliumClient()
        await mock.setNoteResult("coll", .success(collection([viewTypeLabel("grid")])))
        let vm = try await makeViewModel(client: mock, note: collection([viewTypeLabel("grid")]))

        await mock.setNoteDelaySeconds(0.4)
        let refetch = Task { await vm.loadChildNotes() }
        try await Task.sleep(nanoseconds: 100_000_000)
        await vm.applyServerNoteUpdate(collection([viewTypeLabel("list")]), profileId: profileId)
        XCTAssertEqual(vm.note?.viewTypeLabelValue, "list")

        await refetch.value
        let reads = await mock.getNoteCalls
        XCTAssertEqual(reads, ["coll"], "the children refetch did read the note")
        XCTAssertEqual(vm.note?.viewTypeLabelValue, "list", "the older read must not put the previous label back")
    }

    func testARefreshThatBeganBeforeAWriteKeepsTheWrittenLabel() async throws {
        let mock = MockTriliumClient()
        await mock.setNoteResult("coll", .success(collection([viewTypeLabel("grid")])))
        let vm = try await makeViewModel(client: mock, note: collection([viewTypeLabel("grid")]))

        await mock.setNoteDelaySeconds(0.4)
        let refresh = Task { await vm.load() }
        try await Task.sleep(nanoseconds: 100_000_000)
        await vm.applyServerNoteUpdate(collection([viewTypeLabel("list")]), profileId: profileId)

        await refresh.value
        XCTAssertEqual(vm.note?.viewTypeLabelValue, "list")
    }
}
