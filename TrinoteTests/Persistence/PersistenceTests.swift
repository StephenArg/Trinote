import XCTest
import SwiftData
@testable import Trinote

@MainActor
final class PersistenceTests: XCTestCase {
    var persistence: PersistenceManager!

    override func setUp() {
        super.setUp()
        let schema = Schema([
            ServerProfile.self,
            CachedNote.self,
            CachedBranch.self,
            CachedAttribute.self,
            RecentNote.self,
            RecentSearch.self,
            DraftContent.self,
            PendingNoteCreation.self,
            PendingNoteBodyUpload.self,
            PendingBranchMove.self,
            SyncStatus.self,
        ])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try! ModelContainer(for: schema, configurations: [config])
        persistence = PersistenceManager(container: container)
    }

    // MARK: - Server Profiles

    func testSaveAndFetchProfile() throws {
        let profile = ServerProfile(name: "Test", baseURL: "https://test.local")
        try persistence.saveProfile(profile)
        let fetched = try persistence.fetchServerProfiles()
        XCTAssertEqual(fetched.count, 1)
        XCTAssertEqual(fetched[0].name, "Test")
    }

    func testSetActiveProfile() throws {
        let p1 = ServerProfile(name: "Server 1", baseURL: "https://s1.local")
        let p2 = ServerProfile(name: "Server 2", baseURL: "https://s2.local")
        try persistence.saveProfile(p1)
        try persistence.saveProfile(p2)

        try persistence.setActiveProfile(p1)
        XCTAssertTrue(p1.isActive)
        XCTAssertFalse(p2.isActive)

        try persistence.setActiveProfile(p2)
        XCTAssertFalse(p1.isActive)
        XCTAssertTrue(p2.isActive)
    }

    func testDeleteProfile() throws {
        let profile = ServerProfile(name: "ToDelete", baseURL: "https://del.local")
        try persistence.saveProfile(profile)
        XCTAssertEqual(try persistence.fetchServerProfiles().count, 1)

        try persistence.deleteProfile(profile)
        XCTAssertEqual(try persistence.fetchServerProfiles().count, 0)
    }

    // MARK: - Cached Notes

    func testCacheNoteCreatesNew() throws {
        let response = TestFixtures.noteResponse(id: "n1", title: "Note 1")
        try persistence.cacheNote(from: response, serverProfileId: "server1")
        try persistence.commitBatch()

        let cached = try persistence.fetchCachedNote(id: "n1", serverProfileId: "server1")
        XCTAssertNotNil(cached)
        XCTAssertEqual(cached?.title, "Note 1")
    }

    func testCacheNoteUpdatesExisting() throws {
        let response1 = TestFixtures.noteResponse(id: "n1", title: "Original")
        try persistence.cacheNote(from: response1, serverProfileId: "server1")
        try persistence.commitBatch()

        let response2 = TestFixtures.noteResponse(id: "n1", title: "Updated")
        try persistence.cacheNote(from: response2, serverProfileId: "server1")
        try persistence.commitBatch()

        let cached = try persistence.fetchCachedNote(id: "n1", serverProfileId: "server1")
        XCTAssertEqual(cached?.title, "Updated")
    }

    func testCacheNoteContent() throws {
        let response = TestFixtures.noteResponse(id: "n1", title: "Note 1")
        try persistence.cacheNote(from: response, serverProfileId: "server1")
        try persistence.commitBatch()

        let content = Data("<p>Hello</p>".utf8)
        try persistence.cacheNoteContent("n1", content: content, serverProfileId: "server1")

        let cached = try persistence.fetchCachedNote(id: "n1", serverProfileId: "server1")
        XCTAssertEqual(cached?.content, content)
        XCTAssertNotNil(cached?.contentFetchedAt)
    }

    func testMultiProfileIsolation() throws {
        // `CachedNote.noteId` is unique in the store (not scoped per profile), so each row needs a distinct id.
        try persistence.cacheNote(from: TestFixtures.noteResponse(id: "n1", title: "Server1 Note"), serverProfileId: "s1")
        try persistence.cacheNote(from: TestFixtures.noteResponse(id: "n2", title: "Server2 Note"), serverProfileId: "s2")
        try persistence.commitBatch()

        let fromS1 = try persistence.fetchCachedNote(id: "n1", serverProfileId: "s1")
        let fromS2 = try persistence.fetchCachedNote(id: "n2", serverProfileId: "s2")
        XCTAssertEqual(fromS1?.title, "Server1 Note")
        XCTAssertEqual(fromS2?.title, "Server2 Note")
        XCTAssertNil(try persistence.fetchCachedNote(id: "n1", serverProfileId: "s2"))
        XCTAssertNil(try persistence.fetchCachedNote(id: "n2", serverProfileId: "s1"))
    }

    // MARK: - Cached Branches

    func testCacheBranch() throws {
        let response = TestFixtures.branchResponse(branchId: "b1", noteId: "n1", parentNoteId: "root")
        try persistence.cacheBranch(from: response, serverProfileId: "server1")

        let children = try persistence.fetchCachedChildren(parentNoteId: "root", serverProfileId: "server1")
        // No note cached yet so result is empty (branch exists but note doesn't)
        XCTAssertEqual(children.count, 0)

        // Cache the note too
        try persistence.cacheNote(from: TestFixtures.noteResponse(id: "n1", title: "Note"), serverProfileId: "server1")
        try persistence.commitBatch()

        let childrenWithNote = try persistence.fetchCachedChildren(parentNoteId: "root", serverProfileId: "server1")
        XCTAssertEqual(childrenWithNote.count, 1)
        XCTAssertEqual(childrenWithNote[0].0.branchId, "b1")
        XCTAssertEqual(childrenWithNote[0].1.title, "Note")
    }

    // MARK: - Attributes

    func testCacheAttributes() throws {
        let attr = TestFixtures.attributeResponse(attributeId: "a1", noteId: "n1", name: "label1", value: "v1")
        try persistence.cacheAttributeBatch(from: attr, serverProfileId: "server1")
        try persistence.commitBatch()

        let fetched = try persistence.fetchCachedAttributes(noteId: "n1", serverProfileId: "server1")
        XCTAssertEqual(fetched.count, 1)
        XCTAssertEqual(fetched[0].name, "label1")
        XCTAssertEqual(fetched[0].value, "v1")
    }

    // MARK: - Drafts

    func testSaveAndLoadDraft() throws {
        try persistence.saveDraft(noteId: "n1", content: "Draft text", serverProfileId: "s1")

        let draft = try persistence.loadDraft(noteId: "n1", serverProfileId: "s1")
        XCTAssertNotNil(draft)
        XCTAssertEqual(draft?.content, "Draft text")
    }

    func testUpdateDraft() throws {
        try persistence.saveDraft(noteId: "n1", content: "V1", serverProfileId: "s1")
        try persistence.saveDraft(noteId: "n1", content: "V2", serverProfileId: "s1")

        let draft = try persistence.loadDraft(noteId: "n1", serverProfileId: "s1")
        XCTAssertEqual(draft?.content, "V2")
    }

    func testDeleteDraft() throws {
        try persistence.saveDraft(noteId: "n1", content: "Draft", serverProfileId: "s1")
        try persistence.deleteDraft(noteId: "n1", serverProfileId: "s1")

        let draft = try persistence.loadDraft(noteId: "n1", serverProfileId: "s1")
        XCTAssertNil(draft)
    }

    func testDraftIsolationBetweenProfiles() throws {
        try persistence.saveDraft(noteId: "n1", content: "Server1 draft", serverProfileId: "s1")
        try persistence.saveDraft(noteId: "n1", content: "Server2 draft", serverProfileId: "s2")

        let d1 = try persistence.loadDraft(noteId: "n1", serverProfileId: "s1")
        let d2 = try persistence.loadDraft(noteId: "n1", serverProfileId: "s2")
        XCTAssertEqual(d1?.content, "Server1 draft")
        XCTAssertEqual(d2?.content, "Server2 draft")
    }

    // MARK: - Sync Status

    func testSyncStatusUpdate() throws {
        try persistence.updateSyncStatus(domain: "tree", serverProfileId: "s1")

        let statuses = try persistence.fetchSyncStatuses(serverProfileId: "s1")
        XCTAssertEqual(statuses.count, 1)
        XCTAssertEqual(statuses[0].domain, "tree")
        XCTAssertNil(statuses[0].lastError)
    }

    func testSyncErrorRecording() throws {
        try persistence.recordSyncError(domain: "tree", error: "Connection failed", serverProfileId: "s1")

        let statuses = try persistence.fetchSyncStatuses(serverProfileId: "s1")
        XCTAssertEqual(statuses[0].lastError, "Connection failed")

        // Successful sync clears error
        try persistence.updateSyncStatus(domain: "tree", serverProfileId: "s1")
        let updated = try persistence.fetchSyncStatuses(serverProfileId: "s1")
        XCTAssertNil(updated[0].lastError)
    }

    // MARK: - Recent Notes

    func testRecordAndFetchRecentNotes() throws {
        try persistence.recordRecentNote(noteId: "n1", title: "Note 1", noteType: "text", serverProfileId: "s1")
        try persistence.recordRecentNote(noteId: "n2", title: "Note 2", noteType: "code", serverProfileId: "s1")

        let recents = try persistence.fetchRecentNotes(serverProfileId: "s1")
        XCTAssertEqual(recents.count, 2)
        XCTAssertEqual(recents[0].noteId, "n2") // Most recent first
    }

    func testRecordRecentNoteUpdatesTimestamp() throws {
        try persistence.recordRecentNote(noteId: "n1", title: "Old Title", noteType: "text", serverProfileId: "s1")
        try persistence.recordRecentNote(noteId: "n1", title: "New Title", noteType: "text", serverProfileId: "s1")

        let recents = try persistence.fetchRecentNotes(serverProfileId: "s1")
        XCTAssertEqual(recents.count, 1)
        XCTAssertEqual(recents[0].title, "New Title")
    }

    // MARK: - Cleanup

    func testClearCache() throws {
        try persistence.cacheNote(from: TestFixtures.noteResponse(id: "n1"), serverProfileId: "s1")
        try persistence.commitBatch()
        try persistence.cacheBranch(from: TestFixtures.branchResponse(), serverProfileId: "s1")
        try persistence.saveDraft(noteId: "n1", content: "draft", serverProfileId: "s1")

        try persistence.clearCache(for: "s1")

        XCTAssertNil(try persistence.fetchCachedNote(id: "n1", serverProfileId: "s1"))
        XCTAssertNil(try persistence.loadDraft(noteId: "n1", serverProfileId: "s1"))
    }

    func testClearCacheDoesNotAffectOtherProfiles() throws {
        try persistence.cacheNote(from: TestFixtures.noteResponse(id: "n1"), serverProfileId: "s1")
        try persistence.cacheNote(from: TestFixtures.noteResponse(id: "n2"), serverProfileId: "s2")
        try persistence.commitBatch()

        try persistence.clearCache(for: "s1")

        XCTAssertNil(try persistence.fetchCachedNote(id: "n1", serverProfileId: "s1"))
        XCTAssertNotNil(try persistence.fetchCachedNote(id: "n2", serverProfileId: "s2"))
    }
}
