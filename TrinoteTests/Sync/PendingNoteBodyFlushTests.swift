import XCTest
@testable import Trinote

/// Uploading queued note bodies (`AppState.flushPendingNoteBodyUploadsIfPossible`): an upload cut off before its reply,
/// a real conflict, a note deleted on the server, a note made offline, and a failed upload (issue #26).
/// Uses the app's shared store under a server id of its own, cleared after each test.
@MainActor
final class PendingNoteBodyFlushTests: XCTestCase {
    private let profileId = "body-flush-test-server"
    /// Older than the mock server's `utcDateModified` (`TestFixtures.noteResponse`), so the server looks changed since.
    private let staleBase = "2024-01-01T00:00:00.000Z"
    private var appState: AppState!
    private var client: MockTriliumClient!
    private var wasConnected = false

    override func setUp() async throws {
        try await super.setUp()
        // `AppState` reads the app's shared store, which the test host creates at launch.
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        let client = MockTriliumClient()
        appState.client = client
        self.appState = appState
        self.client = client
        wasConnected = NetworkMonitor.shared.isConnected
        NetworkMonitor.shared.isConnected = true
    }

    override func tearDown() async throws {
        NetworkMonitor.shared.isConnected = wasConnected
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        client = nil
        try await super.tearDown()
    }

    private func queue(_ noteId: String, _ body: String, base: String? = nil) throws {
        try PersistenceManager.shared.upsertPendingNoteBodyUpload(
            noteId: noteId,
            body: Data(body.utf8),
            mime: "text/html",
            serverProfileId: profileId,
            baseUtcDateModified: base
        )
    }

    private func queuedNoteIds() -> [String] {
        ((try? PersistenceManager.shared.fetchPendingNoteBodyUploads(serverProfileId: profileId)) ?? []).map(\.noteId)
    }

    private func uploadedNoteIds() async -> [String] {
        await client.updateNoteContentCalls.map(\.0)
    }

    func testUploadThatLandedBeforeItsReplyIsNotCopied() async throws {
        // The app was killed after the server took the body but before it heard back.
        try queue("landed", "<p>edited</p>", base: staleBase)
        await client.setNoteContentResult("landed", .success(Data("<p>edited</p>".utf8)))

        await appState.flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)

        let copies = await client.createNoteCalls
        XCTAssertTrue(copies.isEmpty, "no conflict copy for our own upload")
        let uploaded = await uploadedNoteIds()
        XCTAssertTrue(uploaded.isEmpty, "the server already has it")
        XCTAssertEqual(queuedNoteIds(), [])
    }

    func testRealConflictSavesACopy() async throws {
        try queue("conflict", "<p>edited here</p>", base: staleBase)
        await client.setNoteContentResult("conflict", .success(Data("<p>edited elsewhere</p>".utf8)))

        await appState.flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)

        let copies = await client.createNoteCalls
        XCTAssertEqual(copies.count, 1)
        XCTAssertTrue(copies.first?.title?.contains("ios-sync-conflict") == true)
        XCTAssertEqual(copies.first?.content, "<p>edited here</p>")
        XCTAssertEqual(queuedNoteIds(), [])
    }

    func testNoteDeletedOnServerIsDroppedAndTheRestUpload() async throws {
        try queue("gone", "<p>a</p>")
        try queue("kept", "<p>b</p>")
        await client.setNoteResult("gone", .failure(APIError.notFound("note gone")))
        await client.setUpdateNoteContentError(APIError.notFound("note gone"), forNote: "gone")

        await appState.flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)

        let uploaded = await uploadedNoteIds()
        XCTAssertEqual(uploaded, ["gone", "kept"])
        XCTAssertEqual(queuedNoteIds(), [], "the deleted note's row no longer holds up the queue")
    }

    func testNotFoundFromTheUploadAloneKeepsTheRow() async throws {
        // Only the upload said 404 (a proxy or path problem, say); the note itself is still there.
        try queue("flaky", "<p>a</p>")
        await client.setUpdateNoteContentError(APIError.notFound("upload"), forNote: "flaky")

        await appState.flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)

        XCTAssertEqual(queuedNoteIds(), ["flaky"])
    }

    func testNoteMadeOfflineWaitsWithoutHoldingUpOthers() async throws {
        try queue("ol_offlineNote", "<p>a</p>")
        try queue("kept", "<p>b</p>")

        await appState.flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)

        let uploaded = await uploadedNoteIds()
        XCTAssertEqual(uploaded, ["kept"])
        let looked = await client.getNoteCalls
        XCTAssertFalse(looked.contains("ol_offlineNote"))
        XCTAssertEqual(queuedNoteIds(), ["ol_offlineNote"], "it uploads once its creation reaches the server")
    }

    func testFailedUploadStopsAndKeepsItsRow() async throws {
        try queue("slow", "<p>a</p>")
        try queue("next", "<p>b</p>")
        await client.setUpdateNoteContentError(APIError.timeout, forNote: "slow")

        await appState.flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)

        let uploaded = await uploadedNoteIds()
        XCTAssertEqual(uploaded, ["slow"])
        XCTAssertEqual(Set(queuedNoteIds()), ["slow", "next"])
    }
}
