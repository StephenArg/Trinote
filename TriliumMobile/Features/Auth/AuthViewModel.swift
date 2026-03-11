import Foundation
import SwiftUI
import Observation

@Observable
@MainActor
final class AuthViewModel {
    var serverName = ""
    var serverURL = ""
    var password = ""
    var token = ""
    var loginMode: LoginMode = .password
    var isLoading = false
    var errorMessage: String?
    var showError = false
    var profiles: [ServerProfile] = []

    private let persistence = PersistenceManager.shared

    enum LoginMode: String, CaseIterable {
        case password = "Password"
        case token = "ETAPI Token"
    }

    var canSubmit: Bool {
        let hasServer = !serverURL.trimmingCharacters(in: .whitespaces).isEmpty
        switch loginMode {
        case .password:
            return hasServer && !password.isEmpty
        case .token:
            return hasServer && !token.isEmpty
        }
    }

    func loadProfiles() {
        do {
            profiles = try persistence.fetchServerProfiles()
        } catch {
            Log.auth.error("Failed to load profiles: \(error)")
        }
    }

    func login(appState: AppState) async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        let displayName = serverName.nilIfEmpty ?? serverURL
        let profile = findOrCreateProfile(name: displayName, url: serverURL)

        do {
            try persistence.saveProfile(profile)
            switch loginMode {
            case .password:
                try await appState.loginWithPassword(password, profile: profile)
            case .token:
                try await appState.loginWithToken(token, profile: profile)
            }
            password = ""
            token = ""
            loadProfiles()
        } catch {
            errorMessage = APIError.from(error).localizedDescription
            showError = true
            Log.auth.error("Login failed: \(error)")
        }
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
