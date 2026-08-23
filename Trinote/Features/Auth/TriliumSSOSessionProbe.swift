import Foundation

enum TriliumSSOSessionProbe {
    static func validateSession(
        cookieData: Data,
        baseURL: URL,
        cloudflareAccessCredentials: CloudflareAccessCredentials?
    ) async throws {
        let probeClient = TriliumClient(
            baseURL: baseURL,
            persistedCookieData: cookieData,
            cloudflareAccessCredentials: cloudflareAccessCredentials,
            urlSessionConfiguration: URLSessionConfiguration.ephemeral
        )
        try await probeClient.restoreSession()
    }
}
