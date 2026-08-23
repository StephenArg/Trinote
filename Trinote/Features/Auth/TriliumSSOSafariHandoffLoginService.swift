import Foundation
import UIKit

/// Opens Safari for WebAuthn / Face ID, then imports the session from `trinote://sso-complete`.
@MainActor
final class TriliumSSOSafariHandoffLoginService {
    private let baseURL: URL
    private let cloudflareAccessCredentials: CloudflareAccessCredentials?
    private var nonce: String?

    init(baseURL: URL, cloudflareAccessCredentials: CloudflareAccessCredentials?) {
        self.baseURL = baseURL
        self.cloudflareAccessCredentials = cloudflareAccessCredentials
    }

    func performLogin() async throws -> Data {
        let nonce = UUID().uuidString
        self.nonce = nonce
        SSOHandoffInbox.prepare()

        let startURL = TriliumSSOHandoff.startURL(baseURL: baseURL, nonce: nonce)
        try await Self.verifyHandlerExists(at: startURL)

        let opened = await UIApplication.shared.open(startURL)
        guard opened else { throw SSOLoginError.invalidURL }

        let callback = try await SSOHandoffInbox.wait()
        let cookieData = try TriliumSSOHandoff.cookieArchive(
            from: callback,
            expectedNonce: nonce,
            baseURL: baseURL
        )

        do {
            try await TriliumSSOSessionProbe.validateSession(
                cookieData: cookieData,
                baseURL: baseURL,
                cloudflareAccessCredentials: cloudflareAccessCredentials
            )
        } catch {
            if Self.isRedirectLoop(error) {
                throw SSOLoginError.redirectLoop
            }
            if let apiError = error as? APIError, apiError.isAuthError {
                throw SSOLoginError.staleSafariSession
            }
            throw error
        }
        return cookieData
    }

    func cancel() {
        SSOHandoffInbox.cancel()
    }

    func reopenSafari() {
        guard let nonce else { return }
        let startURL = TriliumSSOHandoff.startURL(baseURL: baseURL, nonce: nonce)
        Task { await UIApplication.shared.open(startURL) }
    }

    private static func isRedirectLoop(_ error: Error) -> Bool {
        let nsError = error as NSError
        return nsError.domain == NSURLErrorDomain && nsError.code == NSURLErrorHTTPTooManyRedirects
    }

    private static func verifyHandlerExists(at url: URL) async throws {
        var request = URLRequest(url: url)
        request.cachePolicy = .reloadIgnoringLocalCacheData
        request.timeoutInterval = 15
        request.httpShouldHandleCookies = false
        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            let status = (response as? HTTPURLResponse)?.statusCode ?? -1
            if (300...399).contains(status) { return }
            let body = String(data: data, encoding: .utf8) ?? ""
            if TriliumSSOHandoff.responseIndicatesMissingHandler(body) {
                throw SSOLoginError.handlerMissing
            }
        } catch let error as SSOLoginError {
            throw error
        } catch {
            if isRedirectLoop(error) { return }
            Log.auth.debug("SSO handoff preflight skipped: \(error.localizedDescription)")
        }
    }
}
