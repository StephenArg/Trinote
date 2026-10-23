import Foundation

/// A signed-in Trilium client for a Shortcuts action.
///
/// Inside a running Trinote it is the app's own client, so the action never builds a second one (a new client resets
/// the shared cookie jar the app's client uses). When iOS starts Trinote only to run the action, there is no window
/// and no `AppState`: the session is restored from the stored login, as a launch would.
@MainActor
struct ShortcutSession {
    let client: any TriliumClientProtocol
    let profileId: String
    /// The running app, when the action runs inside it.
    let appState: AppState?

    var protectedSessionActive: Bool { appState?.protectedSessionActive ?? false }

    /// A client restored for an earlier action while the app had no window, kept for later actions in this process.
    private static var standalone: (profileId: String, client: TriliumClient)?

    /// The signed-in server's profile id, without reaching it. Throws `notSignedIn` when there is none.
    static func activeProfileId() async throws -> String {
        // While the window is still starting, its state doesn't know the profile yet; the store does.
        if let appState = AppState.current, !appState.isLoading {
            guard let profile = appState.activeProfile, appState.isAuthenticated else { throw ShortcutError.notSignedIn }
            return profile.id
        }
        try await PersistenceManager.initializeShared()
        guard let profile = try? PersistenceManager.shared.activeProfile() else { throw ShortcutError.notSignedIn }
        return profile.id
    }

    /// The session for `profileId`. Throws `offline` when the device has no connection or the server can't be
    /// reached, and `sessionExpired` when the stored login no longer works.
    static func acquire(profileId: String) async throws -> ShortcutSession {
        if let appState = AppState.current {
            // The window is starting and about to restore the session itself; a second client now would clear its
            // cookies. Report offline: the capture is kept, and the launch adds it once connected.
            if appState.isLoading { throw ShortcutError.offline }
            guard appState.isAuthenticated, let client = appState.client, appState.activeProfile?.id == profileId else {
                throw ShortcutError.notSignedIn
            }
            guard appState.isOnline else { throw ShortcutError.offline }
            return ShortcutSession(client: client, profileId: profileId, appState: appState)
        }
        if let standalone, standalone.profileId == profileId, await standalone.client.isSessionValid {
            return ShortcutSession(client: standalone.client, profileId: profileId, appState: nil)
        }
        return try await restoreStandalone(profileId: profileId)
    }

    private static func restoreStandalone(profileId: String) async throws -> ShortcutSession {
        try await PersistenceManager.initializeShared()
        guard let profile = (try? PersistenceManager.shared.fetchServerProfiles())?.first(where: { $0.id == profileId }),
              let url = profile.url else {
            throw ShortcutError.notSignedIn
        }
        let authMethod = profile.authMethod
        let cookieData = try? await KeychainManager.shared.loadSessionCookies(forServer: profileId)
        guard let cookieData, !cookieData.isEmpty else { throw ShortcutError.notSignedIn }
        let client = await TriliumSessionFactory.makeClient(
            baseURL: url,
            profileId: profileId,
            persistedCookieData: cookieData,
            skipBootstrapWithoutOIDCSession: authMethod == .sso
        )
        do {
            try await TriliumSessionFactory.restoreSession(of: client, timeout: 12)
        } catch {
            throw ShortcutError.from(error)
        }
        // The window may have started meanwhile; its client now owns the cookie jar.
        if let appState = AppState.current, appState.isAuthenticated, let liveClient = appState.client {
            return ShortcutSession(client: liveClient, profileId: profileId, appState: appState)
        }
        await TriliumSessionFactory.saveSessionCookies(of: client, profileId: profileId, reason: "shortcut")
        standalone = (profileId, client)
        return ShortcutSession(client: client, profileId: profileId, appState: nil)
    }

    /// For actions that open Trinote: the app once it has started (a cold launch builds its state and restores the
    /// session first). Throws `notSignedIn` on the login screen and `appNotReady` when it doesn't start in time.
    static func runningApp(timeout seconds: TimeInterval = 15) async throws -> AppState {
        let deadline = Date().addingTimeInterval(seconds)
        while Date() < deadline {
            if let appState = AppState.current, !appState.isLoading {
                guard appState.isAuthenticated, appState.activeProfile != nil else { throw ShortcutError.notSignedIn }
                // Online, the server answers for the inbox and today's note once the session is back; offline, the
                // synced notes do.
                await appState.waitForSessionRestore()
                return appState
            }
            try? await Task.sleep(for: .milliseconds(100))
        }
        throw ShortcutError.appNotReady
    }

    /// Notes this action changed: show the change in the running app (open editor, tree, cache).
    func notesChanged(_ noteIds: Set<String>) {
        appState?.noteContentChangedOutsideEditor(noteIds)
    }
}

extension AppState {
    /// Adds the journal captures Shortcuts saved on this device (see `JournalCaptureQueue`). Runs once the session is
    /// ready (launch, foreground, sign-in, refresh) and when protected notes are unlocked.
    func flushShortcutJournalCaptures() async {
        guard isAuthenticated, isOnline, let client, let profileId = activeProfile?.id else { return }
        let queue = JournalCaptureQueue.shared
        guard await queue.hasPending(profileId: profileId) else { return }
        let result = await queue.flush(client: client, profileId: profileId, protectedSessionActive: protectedSessionActive)
        noteContentChangedOutsideEditor(result.writtenNoteIds)
    }

    /// Notes changed on the server by something other than their editor (a Shortcut): an open editor reloads them,
    /// the tree refreshes (a new day note appears), and the cache catches up.
    func noteContentChangedOutsideEditor(_ noteIds: Set<String>) {
        guard !noteIds.isEmpty else { return }
        for noteId in noteIds {
            NotificationCenter.default.post(name: .trinoteNoteContentChangedOutside, object: nil, userInfo: ["noteId": noteId])
        }
        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        Task { await self.runIncrementalSync(maxWaitSeconds: 0, downloadChangedBodies: true) }
    }
}
