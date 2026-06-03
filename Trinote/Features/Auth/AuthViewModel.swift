import Foundation
import SwiftUI
import Observation

@Observable
@MainActor
final class AuthViewModel {
    var serverName = ""
    var serverURL = ""
    var password = ""
    /// Matches Trilium "Remember me" session cookie behavior.
    var rememberMe = true
    var cloudflareClientId = ""
    var cloudflareClientSecret = ""
    var isLoading = false
    var errorMessage: String?
    var showError = false
    var profiles: [ServerProfile] = []

    /// Set to `true` after a successful `login` / `submitTotp` so sheets (e.g. Add Instance) can dismiss.
    var didFinishSuccessfulLogin = false

    /// TOTP / MFA state
    var totpCode = ""
    var showTotpEntry = false
    /// Stashed profile used when retrying login with a TOTP code.
    private var pendingTotpProfile: ServerProfile?

    /// OpenID browser login
    var showOpenIDBrowserLogin = false
    var openIDBrowserAttempt = 0
    var openIDProviderLabel: String?
    private var pendingOpenIDProfile: ServerProfile?

    private let persistence = PersistenceManager.shared

    enum URLScheme: String, CaseIterable {
        case https = "https://"
        case http = "http://"
    }

    var urlScheme: URLScheme = .https

    var fullServerURL: String {
        var trimmed = serverURL.trimmingCharacters(in: .whitespaces)
        if trimmed.lowercased().hasPrefix("https://") {
            trimmed = String(trimmed.dropFirst(8))
        } else if trimmed.lowercased().hasPrefix("http://") {
            trimmed = String(trimmed.dropFirst(7))
        }
        return urlScheme.rawValue + trimmed
    }

    var canSubmit: Bool {
        let hasServer = !serverURL.trimmingCharacters(in: .whitespaces).isEmpty
        return hasServer && !password.isEmpty
    }

    var canBeginOpenIDLogin: Bool {
        !serverURL.trimmingCharacters(in: .whitespaces).isEmpty
    }

    func loadProfiles() {
        do {
            profiles = try persistence.fetchServerProfiles()
        } catch {
            Log.auth.error("Failed to load profiles: \(error)")
        }
    }

    func fillFromProfile(_ profile: ServerProfile) {
        serverName = profile.name
        let url = profile.normalizedBaseURL
        if url.lowercased().hasPrefix("https://") {
            urlScheme = .https
            serverURL = String(url.dropFirst(8))
        } else if url.lowercased().hasPrefix("http://") {
            urlScheme = .http
            serverURL = String(url.dropFirst(7))
        } else {
            urlScheme = .https
            serverURL = url
        }
    }

    func login(appState: AppState, rejectIfServerAlreadyAdded: Bool = false) async {
        didFinishSuccessfulLogin = false
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        let displayName = serverName.nilIfEmpty ?? serverURL
        let normalizedInput = ServerProfile(name: displayName, baseURL: fullServerURL).normalizedBaseURL

        if rejectIfServerAlreadyAdded {
            loadProfiles()
            if profiles.contains(where: { $0.normalizedBaseURL == normalizedInput }) {
                errorMessage = String(
                    localized: "You are already signed in to this server. Switch to it under Settings → Instances, or sign it out there before adding it again.",
                    comment: "Error when Add Instance URL matches an existing profile"
                )
                showError = true
                return
            }
        }

        let profile = findOrCreateProfile(name: displayName, url: fullServerURL)

        if let validationError = CloudflareAccessValidation.errorMessage(
            clientId: cloudflareClientId,
            clientSecret: cloudflareClientSecret
        ) {
            errorMessage = validationError
            showError = true
            return
        }

        do {
            try await appState.loginWithPassword(
                password,
                rememberMe: rememberMe,
                profile: profile,
                cloudflareAccessCredentials: cloudflareCredentialsFromForm()
            )
            password = ""
            cloudflareClientSecret = ""
            loadProfiles()
            didFinishSuccessfulLogin = true
        } catch let error as APIError where error == .totpRequired {
            pendingTotpProfile = profile
            totpCode = ""
            showTotpEntry = true
        } catch let pe as PersistenceError {
            errorMessage = pe.localizedDescription
            showError = true
        } catch let error as KeychainError {
            errorMessage = error.localizedDescription
            showError = true
        } catch {
            errorMessage = APIError.from(error).localizedDescription
            showError = true
            Log.auth.error("Login failed: \(error)")
        }
    }

    /// Completes login after the user enters a TOTP code.
    func submitTotp(appState: AppState) async {
        guard let profile = pendingTotpProfile else { return }
        didFinishSuccessfulLogin = false
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            try await appState.loginWithPassword(
                password,
                rememberMe: rememberMe,
                totpToken: totpCode,
                profile: profile,
                cloudflareAccessCredentials: cloudflareCredentialsFromForm()
            )
            password = ""
            totpCode = ""
            pendingTotpProfile = nil
            showTotpEntry = false
            loadProfiles()
            didFinishSuccessfulLogin = true
        } catch let error as APIError where error == .totpInvalid {
            errorMessage = error.localizedDescription
            showError = true
            totpCode = ""
        } catch {
            showTotpEntry = false
            pendingTotpProfile = nil
            totpCode = ""
            errorMessage = APIError.from(error).localizedDescription
            showError = true
            Log.auth.error("TOTP login failed: \(error)")
        }
    }

    func cancelTotp() {
        showTotpEntry = false
        pendingTotpProfile = nil
        totpCode = ""
    }

    func beginOpenIDLogin(appState: AppState, rejectIfServerAlreadyAdded: Bool = false) async {
        didFinishSuccessfulLogin = false
        isLoading = true
        errorMessage = nil
        openIDProviderLabel = nil
        defer { isLoading = false }

        let displayName = serverName.nilIfEmpty ?? serverURL
        let normalizedInput = ServerProfile(name: displayName, baseURL: fullServerURL).normalizedBaseURL

        if rejectIfServerAlreadyAdded {
            loadProfiles()
            if profiles.contains(where: { $0.normalizedBaseURL == normalizedInput }) {
                errorMessage = String(
                    localized: "You are already signed in to this server. Switch to it under Settings → Instances, or sign it out there before adding it again.",
                    comment: "Error when Add Instance URL matches an existing profile"
                )
                showError = true
                return
            }
        }

        if let validationError = CloudflareAccessValidation.errorMessage(
            clientId: cloudflareClientId,
            clientSecret: cloudflareClientSecret
        ) {
            errorMessage = validationError
            showError = true
            return
        }

        guard let serverURL = URL(string: fullServerURL) else {
            errorMessage = APIError.invalidURL.localizedDescription
            showError = true
            return
        }

        let cfCredentials = cloudflareCredentialsFromForm()

        do {
            let status = try await TriliumOAuthStatusClient.fetch(
                baseURL: serverURL,
                cloudflareAccessCredentials: cfCredentials
            )
            guard status.success, status.enabled else {
                throw APIError.openIDNotEnabled
            }
            if let name = status.name?.trimmingCharacters(in: .whitespacesAndNewlines), !name.isEmpty {
                openIDProviderLabel = name
            }
        } catch let error as APIError where error == .openIDNotEnabled {
            errorMessage = error.localizedDescription
            showError = true
            return
        } catch {
            Log.auth.warning("OpenID status check failed, continuing to browser login: \(error)")
        }

        let profile = findOrCreateProfile(name: displayName, url: fullServerURL)
        pendingOpenIDProfile = profile
        openIDBrowserAttempt += 1
        showOpenIDBrowserLogin = true
    }

    func completeOpenIDLogin(appState: AppState, cookieArchive: Data) async {
        guard let profile = pendingOpenIDProfile, let serverURL = profile.url else { return }
        didFinishSuccessfulLogin = false
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        let completeLog = """
        completeOpenIDLogin: server=\(serverURL.absoluteString)
        \(OpenIDAuthDiagnostics.describeArchive("completeOpenIDLogin", data: cookieArchive, baseURL: serverURL))
        """
        Log.openID.info("\(completeLog, privacy: .public)")

        do {
            try await appState.loginWithBrowserSession(
                profile: profile,
                cloudflareAccessCredentials: cloudflareCredentialsFromForm(),
                cookieArchive: cookieArchive
            )
            pendingOpenIDProfile = nil
            showOpenIDBrowserLogin = false
            cloudflareClientSecret = ""
            loadProfiles()
            didFinishSuccessfulLogin = true
        } catch let pe as PersistenceError {
            errorMessage = pe.localizedDescription
            showError = true
            openIDBrowserAttempt += 1
        } catch let error as KeychainError {
            errorMessage = error.localizedDescription
            showError = true
            openIDBrowserAttempt += 1
        } catch {
            errorMessage = APIError.from(error).localizedDescription
            showError = true
            openIDBrowserAttempt += 1
            Log.auth.error("OpenID browser login failed for \(serverURL.absoluteString): \(error)")
            Log.openID.error("completeOpenIDLogin failed: \(String(describing: error), privacy: .public)")
        }
    }

    func cancelOpenIDLogin() {
        showOpenIDBrowserLogin = false
        pendingOpenIDProfile = nil
    }

    func connectToProfile(_ profile: ServerProfile, appState: AppState) async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            try await appState.activateProfile(profile)
        } catch {
            errorMessage = APIError.from(error).localizedDescription
            showError = true
        }
    }

    func deleteProfile(_ profile: ServerProfile, appState: AppState) async {
        await appState.signOutAndRemoveProfile(profile)
        loadProfiles()
    }

    private func findOrCreateProfile(name: String, url: String) -> ServerProfile {
        let normalized = ServerProfile(name: name, baseURL: url).normalizedBaseURL
        if let existing = profiles.first(where: { $0.normalizedBaseURL == normalized }) {
            existing.name = name
            return existing
        }
        return ServerProfile(name: name, baseURL: url)
    }

    private func cloudflareCredentialsFromForm() -> CloudflareAccessCredentials? {
        let id = cloudflareClientId.trimmingCharacters(in: .whitespacesAndNewlines)
        let secret = cloudflareClientSecret.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !id.isEmpty, !secret.isEmpty else { return nil }
        return CloudflareAccessCredentials(clientId: id, clientSecret: secret)
    }

    func cloudflareCredentialsForOpenIDLogin() -> CloudflareAccessCredentials? {
        cloudflareCredentialsFromForm()
    }
}

private extension APIError {
    static func == (lhs: APIError, rhs: APIError) -> Bool {
        switch (lhs, rhs) {
        case (.totpRequired, .totpRequired): return true
        case (.totpInvalid, .totpInvalid): return true
        case (.openIDNotEnabled, .openIDNotEnabled): return true
        default: return false
        }
    }
}
