import Foundation

enum ServerAuthMethod: String, Codable, CaseIterable {
    case password
    case sso
}
