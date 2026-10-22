import XCTest
@testable import Trinote

/// Against a real Trilium server on the Mac (`TRINOTE_IT_SERVER`, skipped otherwise): unlock protected notes with
/// Lock Protected Notes set to After Server Timeout, leave the app, and launch again.
@MainActor
final class ProtectedRelaunchIntegrationTests: XCTestCase {
    private let base = ProcessInfo.processInfo.environment["TRINOTE_IT_SERVER"] ?? "http://127.0.0.1:37999"
    private let password = "testpass1"
    private let protectedNoteId = "PYAPND6XNI7y"

    private func serverIsUp() async -> Bool {
        guard let url = URL(string: base + "/api/health-check") ?? URL(string: base) else { return false }
        var request = URLRequest(url: url)
        request.timeoutInterval = 2
        return (try? await URLSession.shared.data(for: request)) != nil
    }

    private func waitUntil(_ seconds: Double, _ condition: () -> Bool) async {
        let deadline = Date().addingTimeInterval(seconds)
        while !condition(), Date() < deadline {
            try? await Task.sleep(for: .milliseconds(100))
        }
    }

    func testRelaunchAfterUnlockingKeepsTheLoginAndTheSession() async throws {
        await waitUntil(20) { PersistenceManager.isInitialized }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let up = await serverIsUp()
        try XCTSkipUnless(up, "no Trilium server at \(base)")
        UserDefaults.standard.set(ProtectedSessionLockPolicy.serverTimeout.rawValue, forKey: ProtectedSessionLockPolicy.storageKey)
        defer { UserDefaults.standard.removeObject(forKey: ProtectedSessionLockPolicy.storageKey) }

        // First run: sign in, unlock protected notes, open one, leave the app.
        let profile = ServerProfile(id: "it-\(UUID().uuidString.prefix(8))", name: "Integration", baseURL: base)
        OfflineCacheSettings(hasChosenFirstSync: true).save(profileId: profile.id)
        defer { OfflineCacheSettings.remove(profileId: profile.id) }
        let first = AppState()
        try await first.loginWithPassword(password, rememberMe: true, profile: profile)
        XCTAssertTrue(first.isAuthenticated)
        // The relaunch asks the server about a cached protected note, so the cache needs one.
        await first.runFullSync(maxWaitSeconds: 60)
        let firstClient = try XCTUnwrap(first.client)
        try await firstClient.enterProtectedSession(password: password)
        first.protectedSessionActive = true
        _ = try await firstClient.getNote(protectedNoteId)
        first.recordProtectedNoteActivity()
        try await Task.sleep(for: .seconds(2))
        await first.onBackground()
        let savedCookies = try await KeychainManager.shared.loadSessionCookies(forServer: profile.id)
        print("IT: session cookie saved at background: \(SessionCookieTrace.tag(archive: savedCookies))")

        // Relaunch: a fresh AppState runs the launch path with what was saved.
        let second = AppState()
        await second.bootstrap()
        await waitUntil(25) { second.lastRefreshed != nil || second.connectionError != nil || !second.isAuthenticated }
        await waitUntil(5) { second.protectedSessionActive }
        print("IT: after relaunch isAuthenticated=\(second.isAuthenticated) error=\(second.connectionError ?? "nil") protected=\(second.protectedSessionActive)")
        XCTAssertTrue(second.isAuthenticated, "the relaunch asked for the server login: \(second.connectionError ?? "no error")")
        XCTAssertNil(second.connectionError)
        XCTAssertTrue(second.protectedSessionActive, "the protected session should reopen within the timeout")

        await second.signOutAndRemoveProfile(profile)
    }

    /// With `TRINOTE_IT_PREPARE=1`: leaves the simulator's Trinote signed in to the local server, with the protected
    /// note unlocked and open as the active tab, and the app sent to the background, as before a force-quit. The real
    /// app is then launched by hand to watch what the launch does.
    func testPrepareStateForARealRelaunch() async throws {
        try XCTSkipUnless(ProcessInfo.processInfo.environment["TRINOTE_IT_PREPARE"] == "1", "only on request")
        await waitUntil(20) { PersistenceManager.isInitialized }
        let up = await serverIsUp()
        try XCTSkipUnless(up, "no Trilium server at \(base)")
        UserDefaults.standard.set(ProtectedSessionLockPolicy.serverTimeout.rawValue, forKey: ProtectedSessionLockPolicy.storageKey)

        // Reuse the stored profile on later runs: a second object with the same id isn't inserted, so making it
        // active would leave no profile active and the next launch on the Connect screen.
        let profile = try PersistenceManager.shared.fetchServerProfiles().first { $0.id == "it-relaunch" }
            ?? ServerProfile(id: "it-relaunch", name: "Local Trilium", baseURL: base)
        OfflineCacheSettings(hasChosenFirstSync: true).save(profileId: profile.id)
        let app = AppState()
        try await app.loginWithPassword(password, rememberMe: true, profile: profile)
        await app.runFullSync(maxWaitSeconds: 60)
        let client = try XCTUnwrap(app.client)
        try await client.enterProtectedSession(password: password)
        app.protectedSessionActive = true
        _ = try await client.getNote(protectedNoteId)
        app.recordProtectedNoteActivity()
        let tabId = try PersistenceManager.shared.addOpenNoteTab(noteId: protectedNoteId, title: "Vault", noteType: "text", serverProfileId: profile.id)
        LastActiveOpenTabStore.set(tabId, profileId: profile.id)
        try await Task.sleep(for: .seconds(3))
        await app.onBackground()
        let cached = try PersistenceManager.shared.cachedProtectedNoteIds(serverProfileId: profile.id)
        print("IT-PREPARE: profile=\(profile.id) cachedProtected=\(cached) remembered=\(String(describing: ProtectedSessionTimeout.rememberedLastActivity(profileId: profile.id)))")
    }
}
