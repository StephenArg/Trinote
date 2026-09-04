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

    /// Set to `true` after a successful `login` / `submitTotp` / SSO so sheets (e.g. Add Instance) can dismiss.
    var didFinishSuccessfulLogin = false

    /// Full-screen SSO flow: handler setup warning, then Safari waiting.
    var ssoFlowPresentation: SSOFlowPresentation?

    enum SSOFlowPresentation: Equatable {
        case setupWarning
        case waitingForSafari
    }

    /// Context for the in-progress Safari SSO login.
    var ssoBaseURL: URL?
    var ssoCloudflareCredentials: CloudflareAccessCredentials?
    var ssoPendingProfile: ServerProfile?
    var ssoRejectIfServerAlreadyAdded = false

    /// TOTP / MFA state
    var totpCode = ""
    var showTotpEntry = false
    /// Stashed profile used when retrying login with a TOTP code.
    private var pendingTotpProfile: ServerProfile?

    private let persistence = PersistenceManager.shared
    private let keychain = KeychainManager.shared

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

    var canSubmitSSO: Bool {
        !serverURL.trimmingCharacters(in: .whitespaces).isEmpty && !isLoading
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

    func fillCloudflareFromKeychain(profile: ServerProfile) async {
        if let existing = try? await keychain.loadCloudflareAccessCredentials(forServer: profile.id) {
            cloudflareClientId = existing.clientId
            cloudflareClientSecret = existing.clientSecret
        }
    }

    private var activeSSOService: TriliumSSOSafariHandoffLoginService?

    func beginSSOLogin(appState: AppState, rejectIfServerAlreadyAdded: Bool = false) {
        let displayName = serverName.nilIfEmpty ?? serverURL
        let profile = findOrCreateProfile(name: displayName, url: fullServerURL)
        guard let url = profile.url else {
            errorMessage = APIError.invalidURL.localizedDescription
            showError = true
            return
        }

        if let validationError = CloudflareAccessValidation.errorMessage(
            clientId: cloudflareClientId,
            clientSecret: cloudflareClientSecret
        ) {
            errorMessage = validationError
            showError = true
            return
        }

        ssoPendingProfile = profile
        ssoBaseURL = url
        ssoCloudflareCredentials = cloudflareCredentialsFromForm()
        ssoRejectIfServerAlreadyAdded = rejectIfServerAlreadyAdded

        Task { await startSSOOrShowWarning(appState: appState) }
    }

    func beginSSOLogin(for profile: ServerProfile, appState: AppState) async {
        fillFromProfile(profile)
        await fillCloudflareFromKeychain(profile: profile)
        ssoPendingProfile = profile
        ssoBaseURL = profile.url
        ssoCloudflareCredentials = cloudflareCredentialsFromForm()
        ssoRejectIfServerAlreadyAdded = false

        guard profile.url != nil else {
            errorMessage = APIError.invalidURL.localizedDescription
            showError = true
            return
        }

        await startSSOOrShowWarning(appState: appState)
    }

    func confirmSSOSetupWarning(appState: AppState, skipFutureWarnings: Bool) {
        if skipFutureWarnings {
            SSOLoginPreferences.showSetupWarning = false
        }
        Task { await runSSO(appState: appState) }
    }

    func reopenSSOSafari() {
        activeSSOService?.reopenSafari()
    }

    private func startSSOOrShowWarning(appState: AppState) async {
        if SSOLoginPreferences.showSetupWarning {
            ssoFlowPresentation = .setupWarning
            return
        }
        await runSSO(appState: appState)
    }

    private func runSSO(appState: AppState) async {
        guard let url = ssoBaseURL else { return }

        ssoFlowPresentation = .waitingForSafari
        errorMessage = nil
        var keepWaitingCover = false
        defer {
            if !keepWaitingCover {
                ssoFlowPresentation = nil
                activeSSOService = nil
            }
        }

        let service = TriliumSSOSafariHandoffLoginService(
            baseURL: url,
            cloudflareAccessCredentials: ssoCloudflareCredentials
        )
        activeSSOService = service

        do {
            let cookieData = try await service.performLogin()
            await completeImportedSSOLogin(cookieData: cookieData, appState: appState)
        } catch let error as SSOLoginError where error == .cancelled {
            Log.auth.info("SSO cancelled by user")
        } catch let error as SSOLoginError where error == .staleSafariSession {
            keepWaitingCover = true
            errorMessage = error.localizedDescription
            showError = true
            Log.auth.info("SSO stale Safari session — waiting for user to retry")
        } catch {
            errorMessage = (error as? LocalizedError)?.errorDescription ?? error.localizedDescription
            showError = true
            Log.auth.error("SSO login failed: \(error)")
        }
    }

    private func completeImportedSSOLogin(cookieData: Data, appState: AppState) async {
        didFinishSuccessfulLogin = false
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        guard let profile = ssoPendingProfile else { return }

        if ssoRejectIfServerAlreadyAdded {
            loadProfiles()
            let normalizedInput = profile.normalizedBaseURL
            if profiles.contains(where: { $0.normalizedBaseURL == normalizedInput && $0.id != profile.id }) {
                errorMessage = String(
                    localized: "You are already signed in to this server. Switch to it under Settings → Instances, or sign it out there before adding it again.",
                    comment: "Error when Add Instance URL matches an existing profile"
                )
                showError = true
                return
            }
        }

        do {
            try await appState.loginWithImportedSession(
                cookieData: cookieData,
                profile: profile,
                cloudflareAccessCredentials: ssoCloudflareCredentials,
                authMethod: .sso
            )
            cloudflareClientSecret = ""
            loadProfiles()
            didFinishSuccessfulLogin = true
        } catch let pe as PersistenceError {
            errorMessage = pe.localizedDescription
            showError = true
        } catch let error as KeychainError {
            errorMessage = error.localizedDescription
            showError = true
        } catch {
            errorMessage = APIError.from(error).localizedDescription
            showError = true
            Log.auth.error("SSO login failed: \(error)")
        }
    }

    func cancelSSOLogin() {
        activeSSOService?.cancel()
        ssoFlowPresentation = nil
        ssoBaseURL = nil
        ssoCloudflareCredentials = nil
        ssoPendingProfile = nil
        ssoRejectIfServerAlreadyAdded = false
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
        } catch APIError.totpRequired {
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
                cloudflareAccessCredentials: cloudflareCredentialsFromForm(),
                isContinuingPendingLogin: true
            )
            password = ""
            totpCode = ""
            pendingTotpProfile = nil
            showTotpEntry = false
            loadProfiles()
            didFinishSuccessfulLogin = true
        } catch APIError.totpInvalid {
            errorMessage = APIError.totpInvalid.localizedDescription
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

    func cancelTotp(appState: AppState) {
        showTotpEntry = false
        pendingTotpProfile = nil
        totpCode = ""
        appState.clearPendingPasswordLogin()
    }

    func connectToProfile(_ profile: ServerProfile, appState: AppState) async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            try await appState.activateProfile(profile)
        } catch let apiError as APIError where apiError.isAuthError {
            if profile.authMethod == .sso {
                await beginSSOLogin(for: profile, appState: appState)
            } else {
                errorMessage = apiError.localizedDescription
                showError = true
            }
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
}
