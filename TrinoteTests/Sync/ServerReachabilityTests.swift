import XCTest
@testable import Trinote

/// Whether the server answers, apart from whether the phone has a network (`AppState.serverReachable`): a session
/// check that can't connect turns `isOnline` off so the app works from its cache, an answer turns it back on and
/// sends what was queued, and only connection failures count.
/// Uses the app's shared store under a server id of its own, cleared after each test.
@MainActor
final class ServerReachabilityTests: XCTestCase {
    private let profileId = "server-reachability-test-server"
    private var appState: AppState!
    private var client: MockTriliumClient!
    private var retryDelays: [TimeInterval] = []

    override func setUp() async throws {
        try await super.setUp()
        // `AppState` reads the app's shared store, which the test host creates at launch.
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        ServerReachabilityMemory.forget(profileId: profileId)
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        let client = MockTriliumClient()
        appState.client = client
        appState.isAuthenticated = true
        self.appState = appState
        self.client = client
        NetworkMonitor.shared.isConnected = true
        // The retry loop stays out of the way: each test asks for its own checks.
        retryDelays = AppState.serverRetryDelays
        AppState.serverRetryDelays = [600]
    }

    override func tearDown() async throws {
        NetworkMonitor.shared.resync()
        AppState.serverRetryDelays = retryDelays
        ServerReachabilityMemory.forget(profileId: profileId)
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        client = nil
        try await super.tearDown()
    }

    private func queueBody(_ noteId: String) throws {
        try PersistenceManager.shared.upsertPendingNoteBodyUpload(
            noteId: noteId,
            body: Data("<p>edited</p>".utf8),
            mime: "text/html",
            serverProfileId: profileId
        )
    }

    private func queuedNoteIds() -> [String] {
        ((try? PersistenceManager.shared.fetchPendingNoteBodyUploads(serverProfileId: profileId)) ?? []).map(\.noteId)
    }

    private func waitUntil(_ seconds: TimeInterval = 3, _ condition: () -> Bool) async {
        let deadline = Date().addingTimeInterval(seconds)
        while !condition(), Date() < deadline {
            try? await Task.sleep(nanoseconds: 20_000_000)
        }
    }

    // MARK: - Going out of reach

    func testACheckThatCannotConnectTurnsOnlineOffWithTheNetworkStillUp() async throws {
        XCTAssertTrue(appState.isOnline)
        await client.setAppInfoResult(.failure(APIError.timeout))

        let answered = await appState.checkServerAndCatchUp()

        XCTAssertFalse(answered)
        XCTAssertTrue(appState.hasNetwork, "the phone is still on a network")
        XCTAssertFalse(appState.serverReachable)
        XCTAssertFalse(appState.isOnline)
        XCTAssertNotNil(appState.connectionError)
        XCTAssertTrue(ServerReachabilityMemory.wasUnreachable(profileId: profileId), "the next launch starts from the cache")
    }

    func testARefusedSignInOrAnHTTPErrorIsStillAnAnswer() async throws {
        await client.setAppInfoResult(.failure(APIError.unauthorized))
        let answered = await appState.checkServerAndCatchUp()
        XCTAssertFalse(answered)
        XCTAssertTrue(appState.serverReachable, "the server answered, if only to refuse")
        XCTAssertTrue(appState.sessionEndedByServer)

        await client.setAppInfoResult(.failure(APIError.serverError(statusCode: 502, message: nil)))
        await appState.checkServerAndCatchUp()
        XCTAssertTrue(appState.isOnline)
        XCTAssertFalse(ServerReachabilityMemory.wasUnreachable(profileId: profileId))
    }

    func testAnErrorThatSaysNothingAboutTheServerLeavesThingsAsTheyWere() async throws {
        await client.setAppInfoResult(.failure(APIError.timeout))
        await appState.checkServerAndCatchUp()
        XCTAssertFalse(appState.serverReachable)

        await client.setAppInfoResult(.failure(APIError.unknown("TLS handshake failed")))
        await appState.checkServerAndCatchUp()
        XCTAssertFalse(appState.serverReachable, "not an answer, so still out of reach")
    }

    func testSessionRefreshRecordsTheSameThing() async throws {
        await client.setAppInfoResult(.failure(APIError.connectionRefused))
        let refreshed = await appState.refreshTriliumSession()
        XCTAssertFalse(refreshed)
        XCTAssertFalse(appState.isOnline)

        await client.setAppInfoResult(.success(AppInfoResponse(
            appVersion: "0.107.0", dbVersion: 227, syncVersion: 32, buildDate: "2026-11-08", buildRevision: "abc",
            dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil
        )))
        let refreshedAgain = await appState.refreshTriliumSession()
        XCTAssertTrue(refreshedAgain, "pull-to-refresh asks even while the server is marked out of reach")
        XCTAssertTrue(appState.isOnline)
    }

    // MARK: - While out of reach

    func testWhileOutOfReachUploadsAndSyncSendNothing() async throws {
        await client.setAppInfoResult(.failure(APIError.timeout))
        await appState.checkServerAndCatchUp()
        try queueBody("kept")

        await appState.flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
        await appState.runIncrementalSync(maxWaitSeconds: 0)

        let uploaded = await client.updateNoteContentCalls.map(\.0)
        XCTAssertEqual(uploaded, [])
        XCTAssertEqual(queuedNoteIds(), ["kept"], "it waits on the device")
        let pulls = await client.syncPullCursors
        XCTAssertEqual(pulls, [])
    }

    // MARK: - Coming back

    func testAnAnswerTurnsOnlineBackOnAndSendsWhatWasQueued() async throws {
        await client.setAppInfoResult(.failure(APIError.timeout))
        await appState.checkServerAndCatchUp()
        try queueBody("kept")

        await client.setAppInfoResult(.success(AppInfoResponse(
            appVersion: "0.107.0", dbVersion: 227, syncVersion: 32, buildDate: "2026-11-08", buildRevision: "abc",
            dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil
        )))
        let answered = await appState.checkServerAndCatchUp()

        XCTAssertTrue(answered)
        XCTAssertTrue(appState.isOnline)
        XCTAssertNil(appState.connectionError)
        XCTAssertFalse(ServerReachabilityMemory.wasUnreachable(profileId: profileId))
        let uploaded = await client.updateNoteContentCalls.map(\.0)
        XCTAssertEqual(uploaded, ["kept"], "the change made while out of reach goes up")
        XCTAssertEqual(queuedNoteIds(), [])
    }

    func testACheckWhileTheServerWasReachableDoesNotRunTheCatchUp() async throws {
        try queueBody("kept")

        let answered = await appState.checkServerAndCatchUp()

        XCTAssertTrue(answered)
        let uploaded = await client.updateNoteContentCalls.map(\.0)
        XCTAssertEqual(uploaded, [], "a network change with the server still there only asks")
        XCTAssertEqual(queuedNoteIds(), ["kept"])
    }

    // MARK: - Asking

    func testASecondCheckWhileOneRunsAsksTheServerOnce() async throws {
        await client.setRestoreSessionDelaySeconds(0.3)

        async let first = appState.checkServerAndCatchUp()
        async let second = appState.checkServerAndCatchUp()
        _ = await (first, second)

        let asked = await client.restoreSessionCalls
        XCTAssertEqual(asked, 1)
    }

    func testARequestThatCouldNotConnectStartsACheck() async throws {
        await client.setAppInfoResult(.failure(APIError.timeout))

        appState.serverRequestFailed(APIError.notFound("note"))
        try await Task.sleep(nanoseconds: 100_000_000)
        let askedAfterAnAnswer = await client.restoreSessionCalls
        XCTAssertEqual(askedAfterAnAnswer, 0, "the server answered that request")

        appState.serverRequestFailed(URLError(.timedOut))
        await waitUntil { !self.appState.serverReachable }
        XCTAssertFalse(appState.isOnline)
    }

    func testWithoutANetworkNothingIsAsked() async throws {
        NetworkMonitor.shared.isConnected = false

        let answered = await appState.checkServerAndCatchUp()

        XCTAssertFalse(answered)
        XCTAssertFalse(appState.isOnline)
        XCTAssertTrue(appState.serverReachable, "no network says nothing about the server")
        let asked = await client.restoreSessionCalls
        XCTAssertEqual(asked, 0)
    }

    // MARK: - Remembered between launches

    func testTheLastResultIsRememberedPerServer() throws {
        let suite = "server-reachability-memory-tests"
        let defaults = try XCTUnwrap(UserDefaults(suiteName: suite))
        defaults.removePersistentDomain(forName: suite)
        defer { defaults.removePersistentDomain(forName: suite) }

        XCTAssertFalse(ServerReachabilityMemory.wasUnreachable(profileId: "a", defaults: defaults), "reachable until found otherwise")
        ServerReachabilityMemory.remember(unreachable: true, profileId: "a", defaults: defaults)
        XCTAssertTrue(ServerReachabilityMemory.wasUnreachable(profileId: "a", defaults: defaults))
        XCTAssertFalse(ServerReachabilityMemory.wasUnreachable(profileId: "b", defaults: defaults))

        ServerReachabilityMemory.remember(unreachable: false, profileId: "a", defaults: defaults)
        XCTAssertFalse(ServerReachabilityMemory.wasUnreachable(profileId: "a", defaults: defaults))

        ServerReachabilityMemory.remember(unreachable: true, profileId: "a", defaults: defaults)
        ServerReachabilityMemory.forget(profileId: "a", defaults: defaults)
        XCTAssertFalse(ServerReachabilityMemory.wasUnreachable(profileId: "a", defaults: defaults))
    }
}
