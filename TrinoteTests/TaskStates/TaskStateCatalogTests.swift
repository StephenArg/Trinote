import XCTest
@testable import Trinote

/// Trilium's task-state definitions (issue #37): reading `_taskStates`, its validation, and the tap rule.
@MainActor
final class TaskStateCatalogTests: XCTestCase {

    // MARK: - Fixtures (a `_taskStates` subtree as `tree/load` returns it)

    private func branch(_ noteId: String, _ position: Int, deleted: Bool? = nil) -> TreeLoadBranchRow {
        TreeLoadBranchRow(branchId: "b-\(noteId)", noteId: noteId, parentNoteId: TaskStateCatalog.containerNoteId,
                          prefix: nil, notePosition: position, isExpanded: false, isDeleted: deleted)
    }

    private func note(_ noteId: String, _ title: String) -> TreeLoadNoteRow {
        TreeLoadNoteRow(noteId: noteId, title: title, isProtected: false, type: "doc", mime: "", blobId: nil, isDeleted: nil)
    }

    private func labels(_ noteId: String, _ values: [String: String]) -> [TreeLoadAttributeRow] {
        values.sorted { $0.key < $1.key }.enumerated().map { index, pair in
            TreeLoadAttributeRow(attributeId: "\(noteId)_l\(pair.key)", noteId: noteId, type: "label",
                                 name: pair.key, value: pair.value, position: index * 10, isInheritable: false)
        }
    }

    private func custom(_ noteId: String, _ title: String, name: String, symbol: String = "", completed: Bool = false,
                        color: String = "", icon: String = "bx bx-star", hidden: Bool = false) -> TaskStateDefinition {
        TaskStateDefinition(noteId: noteId, name: name, title: title, markdownSymbol: symbol, isCompleted: completed,
                            color: color, iconClass: icon, isHidden: hidden)
    }

    // MARK: - Parsing

    func testParseKeepsBranchOrderAnchorsAndLabels() {
        let branches = [
            branch("_taskStateDone", 30), branch("_taskStateNone", 10), branch("wontdo", 20),
            branch("old", 40), branch("gone", 50, deleted: true),
        ]
        var attributes = labels("wontdo", [
            "stateId": "_wontdo", "markdownSymbol": "~", "isCompleted": "true", "color": "#e64d4d",
            "iconClass": "bx bx-block", "isHidden": "true",
        ])
        attributes += labels("old", ["stateId": "_old", "iconClass": "bx bx-time", "archived": ""])
        let children = TreeLoadResponse(
            notes: [note("_taskStateNone", "Keine"), note("_taskStateDone", "Erledigt"), note("wontdo", "Won't do"),
                    note("old", "Old"), note("gone", "Gone")],
            branches: [],
            attributes: attributes
        )

        let parsed = TaskStateCatalog.parse(childBranches: branches, children: children)

        XCTAssertEqual(parsed.map(\.name), ["none", "_wontdo", "done"], "archived and deleted children are skipped")
        XCTAssertEqual(parsed[0].title, "Keine", "an anchor takes its title from the server")
        XCTAssertEqual(parsed[0].iconClass, "bx bx-checkbox", "an anchor keeps its fixed fields")
        XCTAssertEqual(parsed[1], TaskStateDefinition(
            noteId: "wontdo", branchId: "b-wontdo", name: "_wontdo", title: "Won't do", markdownSymbol: "~",
            isCompleted: true, color: "#e64d4d", iconClass: "bx bx-block", isHidden: true
        ))
        XCTAssertTrue(parsed[2].isCompleted)
    }

    // MARK: - Validation

    func testValidationDropsEachKindOfBadState() {
        let states = [
            TaskStateCatalog.none,
            custom("a", "Doing", name: "doing", symbol: "/"),
            custom("b", "No name", name: ""),
            custom("c", "Bad name", name: "has space"),
            custom("d", "Duplicate", name: "doing"),
            custom("e", "", name: "untitled"),
            custom("f", "No icon", name: "noicon", icon: ""),
            custom("g", "Bad symbol", name: "badsym", symbol: "x"),
            custom("h", "Same symbol", name: "samesym", symbol: "/"),
            custom("i", "Anchor name", name: "done"),
            TaskStateCatalog.done,
        ]

        let (valid, errors) = TaskStateCatalog.validate(states)

        XCTAssertEqual(valid.map(\.name), ["none", "doing", "done"])
        XCTAssertEqual(errors.map(\.reason), [
            .undefinedName, .invalidName, .duplicateName, .missingTitle, .missingIcon, .invalidSymbol, .duplicateSymbol,
            .duplicateName,
        ])
        XCTAssertEqual(errors.map(\.noteId), ["b", "c", "d", "e", "f", "g", "h", "i"])
    }

    func testEditFormChecksAgainstEveryOtherState() {
        let doing = custom("a", "Doing", name: "doing", symbol: "/")
        let maybe = custom("b", "Maybe", name: "maybe", symbol: "?")
        var edited = maybe
        edited.markdownSymbol = "/"
        XCTAssertEqual(TaskStateCatalog.reason(for: edited, among: [maybe, doing]), .duplicateSymbol,
                       "a clash with a state listed after it counts too")
        XCTAssertNil(TaskStateCatalog.reason(for: maybe, among: [doing, maybe]), "a state doesn't clash with itself")
        XCTAssertNil(TaskStateCatalog.reason(for: TaskStateCatalog.done, among: [doing]))
    }

    // MARK: - Tapping

    private let states = TaskStateCatalog.defaults + [
        TaskStateDefinition(noteId: "r", name: "_review", title: "Review", markdownSymbol: "r", isCompleted: true,
                            color: "", iconClass: "bx bx-show", isHidden: false),
        TaskStateDefinition(noteId: "h", name: "_hidden", title: "Hidden", markdownSymbol: "h", isCompleted: false,
                            color: "", iconClass: "bx bx-show", isHidden: true),
    ]

    func testTapWithDoneIsTriliumsToggle() {
        func tap(_ current: String, checked: Bool = false) -> String {
            TaskStateCatalog.stateAfterTap(current: current, isChecked: checked, tapState: "done", states: states)
        }
        XCTAssertEqual(tap("none"), "done")
        XCTAssertEqual(tap("done", checked: true), "none")
        XCTAssertEqual(tap("doing"), "done", "an unfinished state becomes Done")
        XCTAssertEqual(tap("_review", checked: true), "none", "a completed state goes back to None")
        XCTAssertEqual(tap("_unknown", checked: true), "none", "an unknown state follows its stored checkbox")
        XCTAssertEqual(tap("_unknown", checked: false), "done")
    }

    func testTapWithAnotherStateTogglesBetweenNoneAndIt() {
        func tap(_ current: String) -> String {
            TaskStateCatalog.stateAfterTap(current: current, isChecked: false, tapState: "doing", states: states)
        }
        XCTAssertEqual(tap("none"), "doing")
        XCTAssertEqual(tap("doing"), "none")
        XCTAssertEqual(tap("maybe"), "doing")
        XCTAssertEqual(TaskStateCatalog.stateAfterTap(current: "done", isChecked: true, tapState: "doing", states: states), "none")
    }

    func testHiddenMissingOrNoneTapStateFallsBackToDone() {
        XCTAssertEqual(TaskStateCatalog.effectiveTapState("_hidden", states: states), "done")
        XCTAssertEqual(TaskStateCatalog.effectiveTapState("_gone", states: states), "done")
        XCTAssertEqual(TaskStateCatalog.effectiveTapState("none", states: states), "done")
        XCTAssertEqual(TaskStateCatalog.effectiveTapState("_review", states: states), "_review")
    }

    // MARK: - Store

    func testStoreReadsTheServerAndRemembersItPerServer() async throws {
        let profileId = "task-state-store-test-\(UUID().uuidString)"
        let defaults = try XCTUnwrap(UserDefaults(suiteName: profileId))
        defer { defaults.removePersistentDomain(forName: profileId) }

        let mock = MockTriliumClient()
        await mock.setBatchTreeLoadResponse(TreeLoadResponse(
            notes: [note(TaskStateCatalog.containerNoteId, "Task States")],
            branches: [branch("_taskStateNone", 10), branch("wip", 20), branch("_taskStateDone", 30)],
            attributes: []
        ), for: [TaskStateCatalog.containerNoteId])
        await mock.setBatchTreeLoadResponse(TreeLoadResponse(
            notes: [note("_taskStateNone", "None"), note("wip", "WiP"), note("_taskStateDone", "Done")],
            branches: [],
            attributes: labels("wip", ["stateId": "_wip", "iconClass": "bx bx-loader", "color": "#b8860b"])
        ), for: ["_taskStateNone", "wip", "_taskStateDone"])

        let info = AppInfoResponse(appVersion: "0.106.1", dbVersion: 240, syncVersion: 40, buildDate: "", buildRevision: "",
                                   dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil)
        let store = TaskStateStore(defaults: defaults)
        await store.refresh(client: mock, serverInfo: info, profileId: profileId)

        XCTAssertTrue(store.isServerBacked)
        XCTAssertEqual(store.states.map(\.name), ["none", "_wip", "done"])
        store.setTapStateName("_wip")

        let reopened = TaskStateStore(defaults: defaults)
        reopened.activate(profileId: profileId)
        XCTAssertEqual(reopened.states.map(\.name), ["none", "_wip", "done"], "remembered for offline use")
        XCTAssertEqual(reopened.effectiveTapStateName, "_wip")
        XCTAssertTrue(reopened.isServerBacked)
    }

    func testStoreSkipsServersOlderThanTaskStates() async throws {
        let profileId = "task-state-store-old-\(UUID().uuidString)"
        let defaults = try XCTUnwrap(UserDefaults(suiteName: profileId))
        defer { defaults.removePersistentDomain(forName: profileId) }
        let mock = MockTriliumClient()
        let info = AppInfoResponse(appVersion: "0.103.0", dbVersion: 230, syncVersion: 36, buildDate: "", buildRevision: "",
                                   dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil)
        let store = TaskStateStore(defaults: defaults)
        await store.refresh(client: mock, serverInfo: info, profileId: profileId)

        XCTAssertFalse(store.isServerBacked)
        XCTAssertEqual(store.states, TaskStateCatalog.defaults)
        let calls = await mock.batchTreeLoadCalls
        XCTAssertTrue(calls.isEmpty, "an older server isn't asked")
        let config = TaskStateWebConfig.forNote(store: store, isMarkdown: false)
        XCTAssertFalse(config.menuEnabled, "text notes keep the plain toggle on an older server")
        XCTAssertTrue(TaskStateWebConfig.forNote(store: store, isMarkdown: true).menuEnabled)
    }

    func testSyncSignalSpotsDefinitionChanges() {
        let signal = TaskStateSyncSignal(knownNoteIds: ["wip"])
        XCTAssertTrue(signal.touches(entityName: "notes", entityId: "wip", row: nil))
        XCTAssertTrue(signal.touches(entityName: "branches", entityId: "x", row: ["parentNoteId": "_taskStates", "noteId": "new"]))
        XCTAssertTrue(signal.touches(entityName: "attributes", entityId: "x", row: ["noteId": "new", "name": "stateId"]))
        XCTAssertTrue(signal.touches(entityName: "note_reordering", entityId: "_taskStates", row: nil))
        XCTAssertFalse(signal.touches(entityName: "attributes", entityId: "x", row: ["noteId": "other", "name": "color"]))
        XCTAssertFalse(signal.touches(entityName: "notes", entityId: "other", row: nil))
    }
}
