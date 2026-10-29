import XCTest
@testable import Trinote

/// Settings → To-do Task States writing to the server as Trilium's Task States pane does (issue #37).
@MainActor
final class TaskStatesSettingsModelTests: XCTestCase {
    private let profileId = "task-states-settings-test-server"
    private var appState: AppState!

    override func tearDown() async throws {
        TaskStateStore.forget(profileId: profileId)
        appState = nil
        try await super.tearDown()
    }

    private func makeModel(_ mock: MockTriliumClient) -> TaskStatesSettingsModel {
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = mock
        self.appState = appState
        return TaskStatesSettingsModel(appState: appState)
    }

    private let wip = TaskStateDefinition(
        noteId: "wip", branchId: "b-wip", name: "_wip", title: "WiP", markdownSymbol: "/",
        isCompleted: false, color: "", iconClass: "bx bx-loader", isHidden: false
    )

    private func label(_ name: String, _ value: String, noteId: String = "wip") -> TreeLoadAttributeRow {
        TreeLoadAttributeRow(attributeId: "\(noteId)_l\(name)", noteId: noteId, type: "label", name: name, value: value,
                             position: 0, isInheritable: false)
    }

    func testSavingChangesTheTitleAndOnlyTheChangedLabels() async throws {
        let mock = MockTriliumClient()
        await mock.setBatchTreeLoadResponse(TreeLoadResponse(notes: [], branches: [], attributes: [
            label("stateId", "_wip"), label("iconClass", "bx bx-loader"), label("isCompleted", "false"),
        ]), for: ["wip"])
        let model = makeModel(mock)
        var edited = wip
        edited.title = "In Progress"
        edited.isCompleted = true
        edited.color = "#b8860b"

        let saved = await model.save(edited, original: wip)

        XCTAssertTrue(saved)
        let titles = await mock.updateNoteCalls
        XCTAssertEqual(titles.map(\.0), ["wip"])
        XCTAssertEqual(titles.first?.1.title, "In Progress")
        let labels = await mock.updateNoteAttributeCalls
        XCTAssertEqual(labels.map(\.name), ["color", "isCompleted"])
        XCTAssertEqual(labels.map(\.value), ["#b8860b", "true"])
        XCTAssertEqual(labels.map(\.attributeId), [nil, "wip_lisCompleted"], "an existing label is updated in place")
    }

    func testAddingMakesADocNoteWithTriliumsLabels() async throws {
        let mock = MockTriliumClient()
        let model = makeModel(mock)
        var state = wip
        state.noteId = nil
        state.color = "#e64d4d"

        let created = await model.create(state)

        XCTAssertTrue(created)
        let requests = await mock.createNoteCalls
        XCTAssertEqual(requests.first?.parentNoteId, "_taskStates")
        XCTAssertEqual(requests.first?.type, "doc")
        XCTAssertEqual(requests.first?.title, "WiP")
        let labels = await mock.updateNoteAttributeCalls
        XCTAssertEqual(labels.map(\.name), ["iconClass", "stateId", "markdownSymbol", "isCompleted", "color", "isHidden", "docName"])
        XCTAssertEqual(labels.last?.value, "task_state")
    }

    func testNoneAndDoneCantBeDeleted() async throws {
        let mock = MockTriliumClient()
        let model = makeModel(mock)
        let deletedAnchor = await model.delete(TaskStateCatalog.done)
        XCTAssertFalse(deletedAnchor)
        let deleted = await model.delete(wip)
        XCTAssertTrue(deleted)
        let calls = await mock.deleteNoteCalls
        XCTAssertEqual(calls.map(\.noteId), ["wip"])
        XCTAssertEqual(calls.first?.eraseNotes, false, "goes to Trilium's trash")
    }

    func testMovingPlacesTheBranchAmongTheOthers() async throws {
        let mock = MockTriliumClient()
        let branches = ["_taskStateNone", "wip", "_taskStateDone"].enumerated().map { index, id in
            TreeLoadBranchRow(branchId: "b-\(id)", noteId: id, parentNoteId: "_taskStates", prefix: nil,
                              notePosition: (index + 1) * 10, isExpanded: false, isDeleted: nil)
        }
        await mock.setBatchTreeLoadResponse(TreeLoadResponse(
            notes: [TreeLoadNoteRow(noteId: "_taskStates", title: "Task States", isProtected: false, type: "doc", mime: "", blobId: nil, isDeleted: nil)],
            branches: branches, attributes: []
        ), for: ["_taskStates"])
        await mock.setBatchTreeLoadResponse(TreeLoadResponse(
            notes: ["_taskStateNone", "wip", "_taskStateDone"].map {
                TreeLoadNoteRow(noteId: $0, title: $0, isProtected: false, type: "doc", mime: "", blobId: nil, isDeleted: nil)
            },
            branches: [],
            attributes: [label("stateId", "_wip"), label("iconClass", "bx bx-loader")]
        ), for: ["_taskStateNone", "wip", "_taskStateDone"])
        let model = makeModel(mock)
        await appState.taskStates.refresh(client: mock, serverInfo: nil, profileId: profileId)
        XCTAssertEqual(model.rows.map(\.name), ["none", "_wip", "done"])

        await model.move(fromOffsets: IndexSet(integer: 2), toOffset: 0)

        let calls = await mock.placeBranchInSiblingOrderCalls
        XCTAssertEqual(calls.first?.branchId, "b-_taskStateDone")
        XCTAssertEqual(calls.first?.ordered, ["b-_taskStateDone", "b-_taskStateNone", "b-wip"])
    }

    func testSuggestedIdentifier() {
        XCTAssertEqual(TaskStatesSettingsModel.suggestedIdentifier(forTitle: "Won't do"), "_won-t-do")
        XCTAssertEqual(TaskStatesSettingsModel.suggestedIdentifier(forTitle: "  Waiting for review! "), "_waiting-for-review")
        XCTAssertEqual(TaskStatesSettingsModel.suggestedIdentifier(forTitle: "✓"), "")
        XCTAssertTrue(TaskStateCatalog.isValidName(TaskStatesSettingsModel.suggestedIdentifier(forTitle: "Café au lait")))
    }
}
