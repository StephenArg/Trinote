import XCTest
import SwiftData
@testable import Trinote

/// Full sync against `MockTriliumClient`: root → (a → c), b.
@MainActor
final class FullSyncTests: XCTestCase {
    private var persistence: PersistenceManager!
    private var client: MockTriliumClient!
    private var sync: SyncManager!
    private let profileId = "full-sync-tests"

    override func setUp() async throws {
        try await super.setUp()
        let schema = Schema([
            ServerProfile.self,
            CachedNote.self,
            CachedBranch.self,
            CachedAttribute.self,
            RecentNote.self,
            OpenNoteTab.self,
            FavoriteNote.self,
            RecentSearch.self,
            DraftContent.self,
            PendingNoteCreation.self,
            PendingNoteBodyUpload.self,
            PendingNotePatch.self,
            PendingNoteDeletion.self,
            PendingBranchMove.self,
            PendingAttachmentImport.self,
            SyncStatus.self,
            CachedImageData.self,
            EntityPullCursor.self,
            CacheExcludedRootNote.self,
        ])
        let container = try ModelContainer(for: schema, configurations: [ModelConfiguration(isStoredInMemoryOnly: true)])
        persistence = PersistenceManager(container: container)
        sync = SyncManager(persistence: persistence)
        client = MockTriliumClient()
        await serveTree()
        OfflineCacheSettings(hasChosenFirstSync: true).save(profileId: profileId)
        UserDefaults.standard.removeObject(forKey: "trinote.fallbackFullSyncAt." + profileId)
    }

    override func tearDown() async throws {
        OfflineCacheSettings.remove(profileId: profileId)
        UserDefaults.standard.removeObject(forKey: "trinote.fallbackFullSyncAt." + profileId)
        GhostNoteTracker.shared.remove("gone", serverProfileId: profileId)
        try await super.tearDown()
    }

    /// `picture` adds an image note under root with that body.
    private func serveTree(bTitle: String = "B", cBlobId: String = "blob-c", picture: (body: Data, blobId: String)? = nil) async {
        var rootChildren = ["a", "b"]
        if let picture {
            rootChildren.append("img")
            await client.setNoteResult("img", .success(TestFixtures.noteResponse(
                id: "img", title: "Photo", type: "image", mime: "image/png", blobId: picture.blobId
            )))
            await client.setNoteContentResult("img", .success(picture.body))
        }
        await client.setNoteResult("root", .success(TestFixtures.noteResponse(
            id: "root", title: "root", parentNoteIds: [],
            childNoteIds: rootChildren, childBranchIds: rootChildren.map { "branch_root_\($0)" }
        )))
        await client.setNoteResult("a", .success(TestFixtures.noteResponse(
            id: "a", title: "A", childNoteIds: ["c"], childBranchIds: ["branch_a_c"],
            attributes: [TestFixtures.attributeResponse(attributeId: "attr_a", noteId: "a", name: "iconClass", value: "bx bx-star")]
        )))
        await client.setNoteResult("b", .success(TestFixtures.noteResponse(id: "b", title: bTitle)))
        await client.setNoteResult("c", .success(TestFixtures.noteResponse(id: "c", title: "C", parentNoteIds: ["a"], blobId: cBlobId)))
    }

    private func runFullSync(instanceId: String? = "iid") async throws {
        sync.fullSync(client: client, profileId: profileId, triliumInstanceId: instanceId)
        let deadline = Date().addingTimeInterval(10)
        while sync.isSyncing, Date() < deadline {
            try await Task.sleep(nanoseconds: 5_000_000)
        }
        XCTAssertFalse(sync.isSyncing, "full sync didn't finish")
        XCTAssertNil(sync.syncError)
    }

    func testFirstFullSyncCachesTheTreeAndBodies() async throws {
        try await runFullSync()

        XCTAssertTrue(sync.lastCompletedSyncChangedLocalDatabase)
        let a = try XCTUnwrap(persistence.fetchCachedNote(id: "a", serverProfileId: profileId))
        XCTAssertEqual(a.childNoteIds, ["c"])
        XCTAssertEqual(a.parentNoteIds, ["root"])
        XCTAssertEqual(a.contentBlobId, "blob-a")
        XCTAssertEqual(try persistence.fetchCachedAttributes(noteId: "a", serverProfileId: profileId).map(\.value), ["bx bx-star"])
        let contentCalls = await client.getNoteContentCalls
        XCTAssertEqual(Set(contentCalls), ["root", "a", "b", "c"])
    }

    func testIdenticalSecondFullSyncWritesNothingAndDownloadsNothing() async throws {
        var treeRefreshes = 0
        let observer = NotificationCenter.default.addObserver(forName: .trinoteTreeShouldRefresh, object: nil, queue: nil) { _ in
            treeRefreshes += 1
        }
        defer { NotificationCenter.default.removeObserver(observer) }

        try await runFullSync()
        XCTAssertEqual(treeRefreshes, 1)
        XCTAssertEqual(sync.syncProgress, 1.0)
        XCTAssertEqual(sync.totalNoteCount, 4)
        let contentCallsAfterFirst = await client.getNoteContentCalls.count

        try await runFullSync()

        XCTAssertEqual(treeRefreshes, 1, "nothing changed, so nothing reloads")
        XCTAssertEqual(sync.syncProgress, 1.0)
        XCTAssertFalse(sync.lastCompletedSyncChangedLocalDatabase)
        XCTAssertFalse(persistence.context.hasChanges)
        let contentCalls = await client.getNoteContentCalls.count
        XCTAssertEqual(contentCalls, contentCallsAfterFirst)
    }

    func testSecondFullSyncWritesOnlyWhatChanged() async throws {
        try await runFullSync()
        let contentCallsAfterFirst = await client.getNoteContentCalls.count
        await serveTree(bTitle: "B renamed", cBlobId: "blob-c2")

        try await runFullSync()

        XCTAssertTrue(sync.lastCompletedSyncChangedLocalDatabase)
        XCTAssertEqual(try persistence.fetchCachedNote(id: "b", serverProfileId: profileId)?.title, "B renamed")
        let contentCalls = await client.getNoteContentCalls
        XCTAssertEqual(Array(contentCalls.dropFirst(contentCallsAfterFirst)), ["c"], "only the body whose blob changed")
        XCTAssertEqual(try persistence.fetchCachedNote(id: "c", serverProfileId: profileId)?.contentBlobId, "blob-c2")
    }

    func testFirstFullSyncSeedsTheCursorBeforeTheWalkAndLaterOnesPullFromIt() async throws {
        await client.setServerHistory(maxEntityChangeId: 42)

        try await runFullSync()
        var checks = await client.syncCheckCallCount
        var pulls = await client.syncPullCursors
        XCTAssertEqual(checks, 1)
        XCTAssertEqual(pulls, [41], "changes made during the walk are pulled right away, starting one early")
        XCTAssertEqual(try persistence.getEntityPullCursor(serverProfileId: profileId), 42)

        try await runFullSync()
        checks = await client.syncCheckCallCount
        pulls = await client.syncPullCursors
        XCTAssertEqual(checks, 1, "later full syncs don't ask the server to hash every change")
        XCTAssertEqual(pulls, [41, 41])
    }

    func testSyncStoreWorksOffTheMainThread() async throws {
        let store = await sync.store
        let onMain = await store.runsOnMainThread()
        XCTAssertFalse(onMain)
    }

    func testUIWritesDuringAFullSyncSaveWithoutErrors() async throws {
        try await runFullSync()
        await serveTree(bTitle: "B renamed")

        sync.fullSync(client: client, profileId: profileId, triliumInstanceId: "iid")
        // The UI writes while the sync writes on its own context.
        XCTAssertNoThrow(try persistence.recordRecentNote(noteId: "a", title: "A", noteType: "text", serverProfileId: profileId))
        XCTAssertNoThrow(try persistence.setCachedIconClass("bx bx-moon", noteId: "c", serverProfileId: profileId))
        let deadline = Date().addingTimeInterval(10)
        while sync.isSyncing, Date() < deadline {
            try await Task.sleep(nanoseconds: 5_000_000)
        }

        XCTAssertNil(sync.syncError)
        XCTAssertEqual(try persistence.fetchCachedNote(id: "b", serverProfileId: profileId)?.title, "B renamed")
        XCTAssertEqual(try persistence.fetchRecentNotes(serverProfileId: profileId).map(\.noteId), ["a"])
        XCTAssertEqual(persistence.cachedEffectiveNoteIconClass(noteId: "c", serverProfileId: profileId), "bx bx-moon")
    }

    // MARK: - Offline cache settings

    func testFirstFullSyncWaitsForTheFirstSyncChoices() async throws {
        OfflineCacheSettings.remove(profileId: profileId)

        sync.fullSync(client: client, profileId: profileId, triliumInstanceId: "iid")

        XCTAssertFalse(sync.isSyncing)
        XCTAssertEqual(sync.pendingFirstSync?.profileId, profileId)
        let walked = await client.fullSyncFetchTreeBatchCalls
        XCTAssertTrue(walked.isEmpty)
    }

    func testOnlyTopLevelNotebooksExcludesEachOneAndCachesNothingBelow() async throws {
        OfflineCacheSettings.remove(profileId: profileId)
        sync.fullSync(client: client, profileId: profileId, triliumInstanceId: "iid")

        let started = await sync.startFirstSync(settings: OfflineCacheSettings(fullSyncOnLaunch: false), onlyTopLevelNotebooks: true)
        XCTAssertTrue(started)
        let deadline = Date().addingTimeInterval(10)
        while sync.isSyncing, Date() < deadline {
            try await Task.sleep(nanoseconds: 5_000_000)
        }

        XCTAssertNil(sync.pendingFirstSync)
        XCTAssertEqual(CacheExclusionPolicy(persistence: persistence).excludedRootNoteIds(serverProfileId: profileId), ["a", "b"])
        let saved = OfflineCacheSettings.load(profileId: profileId)
        XCTAssertTrue(saved.hasChosenFirstSync)
        XCTAssertFalse(saved.fullSyncOnLaunch)
        XCTAssertNil(try persistence.fetchCachedNote(id: "c", serverProfileId: profileId), "the walk stops at excluded notebooks")
        XCTAssertNotNil(try persistence.fetchCachedNote(id: "root", serverProfileId: profileId))
    }

    func testLaunchNeedsAFullSyncWithoutOneOrACursorOrAfterAWeek() async throws {
        await client.setServerHistory(maxEntityChangeId: 42)
        var needsFullSync = await sync.launchNeedsFullSync(profileId: profileId)
        XCTAssertTrue(needsFullSync, "no full sync yet")

        try await runFullSync()
        needsFullSync = await sync.launchNeedsFullSync(profileId: profileId)
        XCTAssertFalse(needsFullSync)

        let status = try XCTUnwrap(persistence.fetchSyncStatuses(serverProfileId: profileId).first { $0.domain == "fullSync" })
        status.lastSyncedAt = Date().addingTimeInterval(-8 * 24 * 60 * 60)
        try persistence.commitBatch()
        sync.restoreSyncState(profileId: profileId)
        needsFullSync = await sync.launchNeedsFullSync(profileId: profileId)
        XCTAssertTrue(needsFullSync, "the weekly backstop")
    }

    private func runIncrementalSync() async throws {
        sync.incrementalSync(client: client, profileId: profileId, triliumInstanceId: "iid")
        let deadline = Date().addingTimeInterval(10)
        // A fallback full sync starts right after the quick one; wait for both.
        repeat {
            try await Task.sleep(nanoseconds: 20_000_000)
        } while sync.isSyncing && Date() < deadline
    }

    func testQuickSyncFallsBackToAFullSyncWhenTheServerHistoryRestarted() async throws {
        await client.setServerHistory(maxEntityChangeId: 42)
        try await runFullSync()
        try await runIncrementalSync()
        var checks = await client.syncCheckCallCount
        XCTAssertEqual(checks, 1, "a server whose history reaches the cursor needs nothing more")

        // Restored from a backup: its history now ends before the saved cursor.
        await client.setServerHistory(maxEntityChangeId: 7)
        try await runIncrementalSync()

        checks = await client.syncCheckCallCount
        XCTAssertEqual(checks, 2, "a full sync re-seeded the cursor from the server")
        XCTAssertEqual(try persistence.getEntityPullCursor(serverProfileId: profileId), 7)

        // Restarted again within three hours: no second fallback full sync.
        await client.setServerHistory(maxEntityChangeId: 3)
        try await runIncrementalSync()
        checks = await client.syncCheckCallCount
        XCTAssertEqual(checks, 2)
        XCTAssertEqual(try persistence.getEntityPullCursor(serverProfileId: profileId), 7, "the cursor is kept until a full sync can run")
    }

    private func noteRow(_ id: String, title: String) -> [String: Any] {
        [
            "noteId": id, "title": title, "type": "text", "mime": "text/html", "isProtected": false,
            "blobId": "blob-\(id)", "utcDateModified": "2024-01-15T13:00:00.000Z",
        ]
    }

    func testAQuickSyncWithNothingNewChangesNothingAndNewChangesStillArrive() async throws {
        await client.setServerHistory(maxEntityChangeId: 42)
        await client.addPulledNoteChange(id: 42, note: noteRow("b", title: "B"))
        try await runFullSync()

        var treeRefreshes = 0
        let observer = NotificationCenter.default.addObserver(forName: .trinoteTreeShouldRefresh, object: nil, queue: nil) { _ in
            treeRefreshes += 1
        }
        defer { NotificationCenter.default.removeObserver(observer) }

        // The pull starts one change early; the change at the cursor was applied before and is skipped.
        try await runIncrementalSync()
        XCTAssertFalse(sync.lastCompletedSyncChangedLocalDatabase)
        XCTAssertEqual(treeRefreshes, 0)
        let pulls = await client.syncPullCursors
        XCTAssertEqual(pulls.last, 41)

        await client.setServerHistory(maxEntityChangeId: 43)
        await client.addPulledNoteChange(id: 43, note: noteRow("b", title: "B renamed"))
        try await runIncrementalSync()
        XCTAssertTrue(sync.lastCompletedSyncChangedLocalDatabase)
        XCTAssertEqual(treeRefreshes, 1)
        XCTAssertEqual(try persistence.fetchCachedNote(id: "b", serverProfileId: profileId)?.title, "B renamed")
        XCTAssertEqual(try persistence.getEntityPullCursor(serverProfileId: profileId), 43)
    }

    func testAFailedFallbackFullSyncGivesBackItsSlotAndKeepsTheCursor() async throws {
        await client.setServerHistory(maxEntityChangeId: 42)
        try await runFullSync()

        // Restored server, and the fallback full sync fails before it can seed a new cursor.
        await client.setServerHistory(maxEntityChangeId: 7)
        await client.setSyncCheckResult(.failure(APIError.serverError(statusCode: 503, message: "busy")))
        try await runIncrementalSync()
        XCTAssertNotNil(sync.syncError)
        XCTAssertNil(UserDefaults.standard.object(forKey: "trinote.fallbackFullSyncAt." + profileId), "the slot is given back")
        XCTAssertEqual(try persistence.getEntityPullCursor(serverProfileId: profileId), 42, "not reset to pull the whole history")

        // The next quick sync may try again right away.
        await client.setServerHistory(maxEntityChangeId: 7)
        try await runIncrementalSync()
        XCTAssertNil(sync.syncError)
        XCTAssertEqual(try persistence.getEntityPullCursor(serverProfileId: profileId), 7)
    }

    func testFallbackFullSyncsAreAtLeastThreeHoursApart() {
        let defaults = UserDefaults(suiteName: "FullSyncTests.fallback")!
        defaults.removePersistentDomain(forName: "FullSyncTests.fallback")
        let start = Date()
        XCTAssertTrue(SyncManager.claimFallbackFullSync(profileId: "p", now: start, defaults: defaults))
        XCTAssertFalse(SyncManager.claimFallbackFullSync(profileId: "p", now: start.addingTimeInterval(2 * 60 * 60), defaults: defaults))
        XCTAssertTrue(SyncManager.claimFallbackFullSync(profileId: "other", now: start, defaults: defaults), "per server")
        XCTAssertTrue(SyncManager.claimFallbackFullSync(profileId: "p", now: start.addingTimeInterval(3 * 60 * 60 + 1), defaults: defaults))
    }

    func testANoteWhoseContentIsGoneStaysCachedAndHiddenAcrossFullSyncs() async throws {
        await client.setNoteResult("root", .success(TestFixtures.noteResponse(
            id: "root", title: "root", parentNoteIds: [],
            childNoteIds: ["a", "b", "gone"], childBranchIds: ["branch_root_a", "branch_root_b", "branch_root_gone"]
        )))
        await client.setNoteResult("gone", .success(TestFixtures.noteResponse(id: "gone", title: "Gone")))
        await client.setNoteContentResult("gone", .failure(APIError.serverError(statusCode: 500, message: "Cannot find content")))

        for _ in 0..<3 {
            try await runFullSync()
            XCTAssertNotNil(try persistence.fetchCachedNote(id: "gone", serverProfileId: profileId))
            XCTAssertTrue(GhostNoteTracker.shared.contains("gone", serverProfileId: profileId))
        }
    }

    func testImagesAndFilesAreLeftOutWhileMediaCachingIsOff() async throws {
        OfflineCacheSettings(cachesMediaBodies: false, hasChosenFirstSync: true).save(profileId: profileId)
        await serveTree(picture: (Data(count: 1_000), "blob-img"))

        try await runFullSync()

        let contentCalls = await client.getNoteContentCalls
        XCTAssertFalse(contentCalls.contains("img"))
        XCTAssertNotNil(try persistence.fetchCachedNote(id: "img", serverProfileId: profileId), "its metadata is still cached")
        XCTAssertNil(try persistence.fetchCachedNote(id: "img", serverProfileId: profileId)?.contentFetchedAt)
    }

    func testLargeMediaIsSkippedOnceThenRetriedWhenItChanges() async throws {
        OfflineCacheSettings(cachesLargeMediaBodies: false, hasChosenFirstSync: true).save(profileId: profileId)
        let large = Data(count: OfflineCacheSettings.largeMediaThreshold + 1)
        await serveTree(picture: (large, "blob-img"))

        try await runFullSync()
        var capped = await client.cappedNoteContentCalls.map(\.noteId)
        XCTAssertEqual(capped, ["img"])
        XCTAssertEqual(try persistence.fetchCachedNote(id: "img", serverProfileId: profileId)?.contentSkippedBlobId, "blob-img")
        XCTAssertNil(try persistence.fetchCachedNote(id: "img", serverProfileId: profileId)?.contentFetchedAt)

        try await runFullSync()
        capped = await client.cappedNoteContentCalls.map(\.noteId)
        XCTAssertEqual(capped, ["img"], "not tried again while unchanged")

        await serveTree(picture: (Data(count: 2_000), "blob-img-2"))
        try await runFullSync()
        capped = await client.cappedNoteContentCalls.map(\.noteId)
        XCTAssertEqual(capped, ["img", "img"])
        XCTAssertEqual(try persistence.fetchCachedNote(id: "img", serverProfileId: profileId)?.contentBlobId, "blob-img-2")
    }
}
