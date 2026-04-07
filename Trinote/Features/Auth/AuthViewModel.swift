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
    var isLoading = false
    var errorMessage: String?
    var showError = false
    var profiles: [ServerProfile] = []

    /// TOTP / MFA state
    var totpCode = ""
    var showTotpEntry = false
    /// Stashed profile used when retrying login with a TOTP code.
    private var pendingTotpProfile: ServerProfile?

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

    func login(appState: AppState) async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        let displayName = serverName.nilIfEmpty ?? serverURL
        let profile = findOrCreateProfile(name: displayName, url: fullServerURL)

        do {
            try persistence.saveProfile(profile)
            try await appState.loginWithPassword(password, rememberMe: rememberMe, profile: profile)
            password = ""
            loadProfiles()
        } catch let error as APIError where error == .totpRequired {
            pendingTotpProfile = profile
            totpCode = ""
            showTotpEntry = true
        } catch {
            errorMessage = APIError.from(error).localizedDescription
            showError = true
            Log.auth.error("Login failed: \(error)")
        }
    }

    /// Completes login after the user enters a TOTP code.
    func submitTotp(appState: AppState) async {
        guard let profile = pendingTotpProfile else { return }
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            try await appState.loginWithPassword(password, rememberMe: rememberMe, totpToken: totpCode, profile: profile)
            password = ""
            totpCode = ""
            pendingTotpProfile = nil
            showTotpEntry = false
            loadProfiles()
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
}

private extension APIError {
    static func == (lhs: APIError, rhs: APIError) -> Bool {
        switch (lhs, rhs) {
        case (.totpRequired, .totpRequired): return true
        case (.totpInvalid, .totpInvalid): return true
        default: return false
        }
    }
}
