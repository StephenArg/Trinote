import XCTest
import SwiftData
@testable import Trinote

/// Expanding a tree row (`TreeViewModel.toggleExpand`): sub-notes held on the device show at once whatever the
/// server is doing, the server's answer afterwards only takes out what it no longer has, and a row with nothing
/// held never waits on the server for long.
@MainActor
final class TreeExpandTests: XCTestCase {
    private let profileId = "tree-expand-test-server"
    private var appState: AppState!
    private var client: MockTriliumClient!
    private var persistence: PersistenceManager!
    private var retryDelays: [TimeInterval] = []

    override func setUp() async throws {
        try await super.setUp()
        // `AppState` reads the app's shared store, which the test host creates at launch.
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let schema = Schema([
            ServerProfile.self, CachedNote.self, CachedBranch.self, CachedAttribute.self,
            CacheExcludedRootNote.self, CachedImageData.self,
        ])
        let container = try ModelContainer(for: schema, configurations: [ModelConfiguration(isStoredInMemoryOnly: true)])
        persistence = PersistenceManager(container: container)
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        let client = MockTriliumClient()
        appState.client = client
        self.appState = appState
        self.client = client
        NetworkMonitor.shared.isConnected = true
        retryDelays = AppState.serverRetryDelays
        AppState.serverRetryDelays = [600]
    }

    override func tearDown() async throws {
        NetworkMonitor.shared.resync()
        AppState.serverRetryDelays = retryDelays
        ServerReachabilityMemory.forget(profileId: profileId)
        appState = nil
        client = nil
        persistence = nil
        try await super.tearDown()
    }

    // MARK: - Helpers

    private func cache(_ id: String, parent: String?, position: Int = 10) throws {
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: id, title: id.uppercased(), parentNoteIds: parent.map { [$0] } ?? []),
            serverProfileId: profileId
        )
        if let parent {
            try persistence.cacheBranch(
                from: TestFixtures.branchResponse(branchId: "\(parent)_\(id)", noteId: id, parentNoteId: parent, notePosition: position),
                serverProfileId: profileId
            )
        }
    }

    /// root → p → (c1 → g1), c2, all held on the device.
    private func makeCachedTree() throws -> TreeViewModel {
        try cache("root", parent: nil)
        try cache("p", parent: "root")
        try cache("c1", parent: "p", position: 10)
        try cache("c2", parent: "p", position: 20)
        try cache("g1", parent: "c1")
        try persistence.commitBatch()
        let vm = TreeViewModel(appState: appState, persistence: persistence)
        vm.reloadFromCache()
        return vm
    }

    /// A row "p" whose one sub-note "c1" only the server has.
    private func makeTreeWithNothingHeldUnderP() async -> TreeViewModel {
        await client.setNoteResult("p", .success(TestFixtures.noteResponse(
            id: "p", title: "P", childNoteIds: ["c1"], childBranchIds: ["p_c1"]
        )))
        let vm = TreeViewModel(appState: appState, persistence: persistence)
        vm.rootChildren = [row("p", parent: "root", childNoteIds: ["c1"], childBranchIds: ["p_c1"])]
        return vm
    }

    private func row(_ id: String, parent: String, childNoteIds: [String] = [], childBranchIds: [String] = [],
                     children: [TreeNode]? = nil, isLoading: Bool = false) -> TreeNode {
        let branch = BranchItem(branchId: "\(parent)_\(id)", noteId: id, parentNoteId: parent, prefix: nil, notePosition: 10, isExpanded: false)
        let note = NoteItem(
            noteId: id, title: id.uppercased(), type: .text, mime: "text/html",
            isProtected: false, dateCreated: "", dateModified: "",
            parentNoteIds: [parent], childNoteIds: childNoteIds, parentBranchIds: [], childBranchIds: childBranchIds,
            attributes: []
        )
        return TreeNode(branch: branch, note: note, children: children, isLoading: isLoading)
    }

    private func shownNoteIds(_ vm: TreeViewModel) -> [String] {
        vm.visibleNodes.map(\.node.note.noteId)
    }

    private func waitUntil(_ seconds: TimeInterval = 3, _ condition: () -> Bool) async {
        let deadline = Date().addingTimeInterval(seconds)
        while !condition(), Date() < deadline {
            try? await Task.sleep(nanoseconds: 20_000_000)
        }
    }

    // MARK: - Sub-notes held on the device

    func testHeldSubNotesShowWithoutWaitingForTheServer() async throws {
        let vm = try makeCachedTree()
        vm.serverWaitSeconds = 0.5
        await client.setNoteDelaySeconds(5)

        let started = Date()
        await vm.toggleExpand(try XCTUnwrap(vm.rootChildren.first))

        XCTAssertLessThan(Date().timeIntervalSince(started), 1, "the server, 5 s away, isn't waited for")
        XCTAssertEqual(shownNoteIds(vm), ["p", "c1", "c2"])
        XCTAssertEqual(vm.rootChildren.first?.isLoading, false, "no spinner")
    }

    func testHeldSubNotesShowWhileTheServerCannotBeReachedAndItIsNotAsked() async throws {
        let vm = try makeCachedTree()
        appState.markServerUnreachable()
        XCTAssertFalse(appState.isOnline)

        await vm.toggleExpand(try XCTUnwrap(vm.rootChildren.first))
        XCTAssertEqual(shownNoteIds(vm), ["p", "c1", "c2"])

        try await Task.sleep(nanoseconds: 200_000_000)
        let asked = await client.getNoteCalls
        XCTAssertEqual(asked, [])
        appState.markServerReachable()
    }

    func testLateAnswerTakesOutASubNoteTheServerNoLongerHasAndKeepsOpenRowsOpen() async throws {
        let vm = try makeCachedTree()
        // The server has lost c2; c1 still has g1.
        await client.setNoteResult("p", .success(TestFixtures.noteResponse(
            id: "p", title: "P", childNoteIds: ["c1"], childBranchIds: ["p_c1"]
        )))
        await client.setNoteResult("c1", .success(TestFixtures.noteResponse(
            id: "c1", title: "C1", parentNoteIds: ["p"], childNoteIds: ["g1"], childBranchIds: ["c1_g1"]
        )))
        await client.setNoteDelaySeconds(0.3)

        await vm.toggleExpand(try XCTUnwrap(vm.rootChildren.first))
        XCTAssertEqual(shownNoteIds(vm), ["p", "c1", "c2"], "what is held shows first")
        let c1 = try XCTUnwrap(vm.rootChildren.first?.children?.first)
        await vm.toggleExpand(c1)
        XCTAssertEqual(shownNoteIds(vm), ["p", "c1", "g1", "c2"])

        await waitUntil { self.shownNoteIds(vm) == ["p", "c1", "g1"] }
        XCTAssertEqual(shownNoteIds(vm), ["p", "c1", "g1"], "c2 goes; c1 stays open")
    }

    // MARK: - Nothing held on the device

    func testCollapsingARowThatIsLoadingClearsItsSpinnerAndTheLateAnswerDoesNotReopenIt() async throws {
        let vm = await makeTreeWithNothingHeldUnderP()
        await client.setNoteDelaySeconds(0.3)
        let p = try XCTUnwrap(vm.rootChildren.first)

        let firstTap = Task { await vm.toggleExpand(p) }
        await waitUntil { vm.rootChildren.first?.isLoading == true }
        XCTAssertEqual(vm.rootChildren.first?.isLoading, true)

        await vm.toggleExpand(p)
        XCTAssertEqual(vm.rootChildren.first?.isLoading, false, "collapsed rows don't spin")
        XCTAssertFalse(vm.hasExpandedBranches)

        await firstTap.value
        XCTAssertNil(vm.rootChildren.first?.children, "the answer to the first tap came after the row was closed")
        XCTAssertFalse(vm.hasExpandedBranches)
        XCTAssertNil(vm.error)
    }

    func testLoadsSubNotesOnlyTheServerHas() async throws {
        let vm = await makeTreeWithNothingHeldUnderP()

        await vm.toggleExpand(try XCTUnwrap(vm.rootChildren.first))

        XCTAssertEqual(shownNoteIds(vm), ["p", "c1"])
        XCTAssertEqual(vm.rootChildren.first?.isLoading, false)
    }

    func testAServerThatDoesNotAnswerInTimeClosesTheRowWithTheBanner() async throws {
        let vm = await makeTreeWithNothingHeldUnderP()
        vm.serverWaitSeconds = 0.3
        await client.setNoteDelaySeconds(5)

        let started = Date()
        await vm.toggleExpand(try XCTUnwrap(vm.rootChildren.first))

        XCTAssertLessThan(Date().timeIntervalSince(started), 2)
        XCTAssertEqual(vm.rootChildren.first?.isLoading, false)
        XCTAssertNil(vm.rootChildren.first?.children)
        XCTAssertFalse(vm.hasExpandedBranches)
        XCTAssertEqual(vm.error, APIError.timeout.localizedDescription)
    }

    func testOfflineARowWithNothingHeldClosesAtOnceWithoutAsking() async throws {
        let vm = await makeTreeWithNothingHeldUnderP()
        NetworkMonitor.shared.isConnected = false

        await vm.toggleExpand(try XCTUnwrap(vm.rootChildren.first))

        XCTAssertFalse(vm.hasExpandedBranches)
        XCTAssertEqual(vm.rootChildren.first?.isLoading, false)
        let asked = await client.fullSyncFetchTreeBatchCalls
        XCTAssertEqual(asked.count, 0)
    }

    // MARK: - Replacing a row's sub-notes

    func testFreshRowsKeepTheOpenSubRowsAndSpinnersOfTheRowsTheyReplace() {
        let old = [
            row("a", parent: "p", children: [row("a1", parent: "a")]),
            row("b", parent: "p", isLoading: true),
            row("gone", parent: "p", children: [row("x", parent: "gone")]),
        ]
        let fresh = [row("b", parent: "p"), row("a", parent: "p"), row("new", parent: "p")]

        let merged = TreeViewModel.keepingOpenRows(from: old, in: fresh)

        XCTAssertEqual(merged.map(\.note.noteId), ["b", "a", "new"], "the fresh order and rows")
        XCTAssertEqual(merged[0].isLoading, true)
        XCTAssertEqual(merged[1].children?.map(\.note.noteId), ["a1"])
        XCTAssertNil(merged[2].children)
    }
}
