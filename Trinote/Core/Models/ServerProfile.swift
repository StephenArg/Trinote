import Foundation
import SwiftData

@Model
final class ServerProfile {
    @Attribute(.unique) var id: String
    var name: String
    var baseURL: String
    var isActive: Bool
    var dateAdded: Date
    var lastConnected: Date?
    /// How the user last signed in — used to offer SSO reconnect when the session expires.
    var authMethodRaw: String = ServerAuthMethod.password.rawValue

    var authMethod: ServerAuthMethod {
        get { ServerAuthMethod(rawValue: authMethodRaw) ?? .password }
        set { authMethodRaw = newValue.rawValue }
    }

    init(
        id: String = UUID().uuidString,
        name: String,
        baseURL: String,
        isActive: Bool = false,
        dateAdded: Date = .now,
        lastConnected: Date? = nil,
        authMethod: ServerAuthMethod = .password
    ) {
        self.id = id
        self.name = name
        self.baseURL = baseURL
        self.isActive = isActive
        self.dateAdded = dateAdded
        self.lastConnected = lastConnected
        self.authMethodRaw = authMethod.rawValue
    }

    var url: URL? {
        URL(string: normalizedBaseURL)
    }

    var normalizedBaseURL: String {
        var url = baseURL.trimmingCharacters(in: .whitespacesAndNewlines)
        if !url.hasPrefix("http://") && !url.hasPrefix("https://") {
            url = "https://" + url
        }
        while url.hasSuffix("/") {
            url.removeLast()
        }
        return url
    }
}
