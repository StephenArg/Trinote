import Foundation
import Security

protocol KeychainManaging: Actor {
    func saveToken(_ token: String, forServer serverID: String) throws
    func loadToken(forServer serverID: String) throws -> String?
    func deleteToken(forServer serverID: String) throws
    func deleteAllTokens() throws
}

actor KeychainManager: KeychainManaging {
    static let shared = KeychainManager()

    private let servicePrefix = "com.trinote"

    private init() {}

    func saveToken(_ token: String, forServer serverID: String) throws {
        let data = Data(token.utf8)
        let query = baseQuery(for: serverID)
        SecItemDelete(query as CFDictionary)

        var addQuery = query
        addQuery[kSecValueData as String] = data
        addQuery[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock

        let status = SecItemAdd(addQuery as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw KeychainError.saveFailed(status)
        }
    }

    func loadToken(forServer serverID: String) throws -> String? {
        var query = baseQuery(for: serverID)
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)

        switch status {
        case errSecSuccess:
            guard let data = result as? Data, let token = String(data: data, encoding: .utf8) else {
                return nil
            }
            return token
        case errSecItemNotFound:
            return nil
        default:
            throw KeychainError.loadFailed(status)
        }
    }

    func deleteToken(forServer serverID: String) throws {
        let query = baseQuery(for: serverID)
        let status = SecItemDelete(query as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw KeychainError.deleteFailed(status)
        }
    }

    /// Deletes all tokens stored by this app (scoped to our service prefix).
    func deleteAllTokens() throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: servicePrefix,
        ]
        // This won't match our per-server items because they use servicePrefix.serverID,
        // so iterate all known items instead. On iOS the access group scoping prevents
        // us from deleting other apps' items, but the prefix filter is still important.
        // We query for all our items and delete individually.
        let matchQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecReturnAttributes as String: true,
            kSecMatchLimit as String: kSecMatchLimitAll,
        ]
        var result: AnyObject?
        let status = SecItemCopyMatching(matchQuery as CFDictionary, &result)
        guard status == errSecSuccess, let items = result as? [[String: Any]] else {
            if status == errSecItemNotFound { return }
            throw KeychainError.deleteFailed(status)
        }

        for item in items {
            guard let service = item[kSecAttrService as String] as? String,
                  service.hasPrefix(servicePrefix) else { continue }

            let deleteQuery: [String: Any] = [
                kSecClass as String: kSecClassGenericPassword,
                kSecAttrService as String: service,
                kSecAttrAccount as String: item[kSecAttrAccount as String] as? String ?? "",
            ]
            SecItemDelete(deleteQuery as CFDictionary)
        }
    }

    private func baseQuery(for serverID: String) -> [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: "\(servicePrefix).\(serverID)",
            kSecAttrAccount as String: "etapi-token",
        ]
    }
}

enum KeychainError: LocalizedError {
    case saveFailed(OSStatus)
    case loadFailed(OSStatus)
    case deleteFailed(OSStatus)

    var errorDescription: String? {
        switch self {
        case .saveFailed(let status):
            return "Failed to save to Keychain (status: \(status))"
        case .loadFailed(let status):
            return "Failed to read from Keychain (status: \(status))"
        case .deleteFailed(let status):
            return "Failed to delete from Keychain (status: \(status))"
        }
    }
}
