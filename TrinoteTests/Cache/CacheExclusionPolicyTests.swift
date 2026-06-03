import XCTest
import SwiftData
@testable import Trinote

@MainActor
final class CacheExclusionPolicyTests: XCTestCase {
    var persistence: PersistenceManager!
    var policy: CacheExclusionPolicy!

    override func setUp() {
        super.setUp()
        let schema = Schema([
            ServerProfile.self,
            CachedNote.self,
            CachedBranch.self,
            CachedAttribute.self,
            CacheExcludedRootNote.self,
            CachedImageData.self,
        ])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try! ModelContainer(for: schema, configurations: [config])
        persistence = PersistenceManager(container: container)
        policy = CacheExclusionPolicy(persistence: persistence)
    }

    func testExcludedRootIsNeverCached() throws {
        try policy.setExcludedRootNoteIds(["notebookA"], serverProfileId: "s1")
        XCTAssertTrue(
            policy.isNoteExcludedFromCache(
                noteId: "notebookA",
                parentNoteIds: ["root"],
                serverProfileId: "s1"
            )
        )
    }

    func testDescendantOfExcludedRootIsExcluded() throws {
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(
                id: "notebookA",
                title: "A",
                parentNoteIds: ["root"],
                childNoteIds: ["child1"]
            ),
            serverProfileId: "s1"
        )
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: "child1", title: "Child", parentNoteIds: ["notebookA"]),
            serverProfileId: "s1"
        )
        try policy.setExcludedRootNoteIds(["notebookA"], serverProfileId: "s1")
        XCTAssertTrue(
            policy.isNoteExcludedFromCache(
                noteId: "child1",
                parentNoteIds: ["notebookA"],
                serverProfileId: "s1"
            )
        )
    }

    func testCloneEscapeAllowsCacheWhenParentOutsideSubtree() throws {
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(
                id: "notebookA",
                title: "A",
                parentNoteIds: ["root"],
                childNoteIds: ["cloned"]
            ),
            serverProfileId: "s1"
        )
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(
                id: "notebookB",
                title: "B",
                parentNoteIds: ["root"]
            ),
            serverProfileId: "s1"
        )
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(
                id: "cloned",
                title: "Clone",
                parentNoteIds: ["notebookA", "notebookB"]
            ),
            serverProfileId: "s1"
        )
        try policy.setExcludedRootNoteIds(["notebookA"], serverProfileId: "s1")
        XCTAssertFalse(
            policy.isNoteExcludedFromCache(
                noteId: "cloned",
                parentNoteIds: ["notebookA", "notebookB"],
                serverProfileId: "s1"
            )
        )
    }

    func testPruneStaleExcludedRootsWhenAuthoritative() throws {
        try policy.setExcludedRootNoteIds(["gone", "keep"], serverProfileId: "s1")
        try policy.pruneStaleExcludedRoots(
            liveRootChildIds: ["keep"],
            serverProfileId: "s1",
            authoritativeLiveList: true
        )
        XCTAssertEqual(policy.excludedRootNoteIds(serverProfileId: "s1"), ["keep"])
    }

    func testPruneSkipsWhenLiveListNotAuthoritative() throws {
        try policy.setExcludedRootNoteIds(["nb"], serverProfileId: "s1")
        try policy.pruneStaleExcludedRoots(liveRootChildIds: [], serverProfileId: "s1")
        try policy.pruneStaleExcludedRoots(
            liveRootChildIds: ["otherCachedOnly"],
            serverProfileId: "s1",
            authoritativeLiveList: false
        )
        XCTAssertEqual(policy.excludedRootNoteIds(serverProfileId: "s1"), ["nb"])
    }

    func testExcludedRootSurvivesPruneWhenMissingFromBranchDerivedLiveList() throws {
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(
                id: TriliumTreeConstants.rootNoteId,
                title: "Root",
                childNoteIds: ["notebookA"]
            ),
            serverProfileId: "s1"
        )
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: "notebookA", title: "A", parentNoteIds: ["root"]),
            serverProfileId: "s1"
        )
        try policy.setExcludedRootNoteIds(["notebookB"], serverProfileId: "s1")
        try policy.pruneStaleExcludedRoots(
            liveRootChildIds: policy.liveRootChildNoteIds(serverProfileId: "s1"),
            serverProfileId: "s1",
            authoritativeLiveList: false
        )
        XCTAssertEqual(policy.excludedRootNoteIds(serverProfileId: "s1"), ["notebookB"])
    }

    func testRemoveExcludedRootNoteIfNeeded() throws {
        try policy.setExcludedRootNoteIds(["gone", "keep"], serverProfileId: "s1")
        try policy.removeExcludedRootNoteIfNeeded(noteId: "gone", serverProfileId: "s1")
        XCTAssertEqual(policy.excludedRootNoteIds(serverProfileId: "s1"), ["keep"])
    }

    func testCachedDescendantBFSDoesNotLoopOnCycle() throws {
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(
                id: "a",
                title: "A",
                childNoteIds: ["b"]
            ),
            serverProfileId: "s1"
        )
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(
                id: "b",
                title: "B",
                childNoteIds: ["a"]
            ),
            serverProfileId: "s1"
        )
        let ids = persistence.cachedDescendantNoteIds(rootNoteId: "a", serverProfileId: "s1")
        XCTAssertEqual(ids, ["a", "b"])
    }
}
