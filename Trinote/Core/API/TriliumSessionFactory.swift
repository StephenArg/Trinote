import Foundation

/// Builds a Trilium client from a profile's stored login, restores its session, and stores the confirmed cookies back.
/// `AppState` uses it for the app's own client; Shortcuts that run while the app has no window use it on their own
/// (`ShortcutSession`).
enum TriliumSessionFactory {
    /// A client for `baseURL` holding the profile's stored cookies. Cloudflare Access credentials come from the
    /// Keychain unless `pendingCloudflareAccessCredentials` (not saved yet) is given.
    ///
    /// The client's init replaces the host's cookies in the shared jar, so build one only when no other client for
    /// the same server is in use in this process.
    static func makeClient(
        baseURL: URL,
        profileId: String,
        persistedCookieData: Data?,
        pendingCloudflareAccessCredentials: CloudflareAccessCredentials? = nil,
        skipBootstrapWithoutOIDCSession: Bool,
        keychain: KeychainManager = .shared
    ) async -> TriliumClient {
        let cfCredentials: CloudflareAccessCredentials?
        if let pendingCloudflareAccessCredentials {
            cfCredentials = pendingCloudflareAccessCredentials
        } else {
            cfCredentials = try? await keychain.loadCloudflareAccessCredentials(forServer: profileId)
        }
        return TriliumClient(
            baseURL: baseURL,
            persistedCookieData: persistedCookieData,
            cloudflareAccessCredentials: cfCredentials,
            skipBootstrapWithoutOIDCSession: skipBootstrapWithoutOIDCSession
        )
    }

    /// `restoreSession()`, bounded so offline or captive networks fail fast with `APIError.timeout` instead of
    /// waiting out URLSession's default timeout.
    static func restoreSession(of client: some TriliumClientProtocol, timeout seconds: TimeInterval) async throws {
        try await withThrowingTaskGroup(of: Void.self) { group in
            group.addTask {
                try await client.restoreSession()
            }
            group.addTask {
                let ns = UInt64(seconds * 1_000_000_000)
                try await Task.sleep(nanoseconds: ns)
                throw APIError.timeout
            }
            try await group.next()!
            group.cancelAll()
        }
    }

    /// Stores `client`'s cookies as the profile's login, but only while they carry the session the server confirmed
    /// as signed in. Otherwise the stored login is left alone: replacing it with a jar that lost its `trilium.sid`, or
    /// holds an anonymous one, is what sent a relaunch to the server login page.
    static func saveSessionCookies(
        of client: TriliumClient,
        profileId: String,
        reason: String,
        keychain: KeychainManager = .shared
    ) async {
        guard let data = await client.exportVerifiedSessionCookieData() else {
            SessionCookieTrace.log(
                "keychain save skipped (\(reason)): jar sid \(SessionCookieTrace.jarTag(for: client.baseURL)) isn't the confirmed session"
            )
            return
        }
        do {
            try await keychain.saveSessionCookies(data, forServer: profileId)
            SessionCookieTrace.log("keychain save (\(reason)) sid \(SessionCookieTrace.tag(archive: data))")
        } catch {
            SessionCookieTrace.log("keychain save FAILED (\(reason)): \(error)")
            Log.auth.warning("Could not save the session cookies: \(error)")
        }
    }
}
