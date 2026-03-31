import CryptoKit
import Foundation
import Security

protocol KeychainManaging: Actor {
    /// @deprecated ETAPI — retained for migration cleanup.
    func saveToken(_ token: String, forServer serverID: String) throws
    func loadToken(forServer serverID: String) throws -> String?
    func deleteToken(forServer serverID: String) throws
    func deleteAllTokens() throws

    /// Archived `HTTPCookie` property dictionaries (JSON) for Trilium session cookies.
    func saveSessionCookies(_ data: Data?, forServer serverID: String) throws
    func loadSessionCookies(forServer serverID: String) throws -> Data?
    /// Stable client id for `/api/sync/changed?instanceId=`.
    func saveTriliumInstanceId(_ id: String, forServer serverID: String) throws
    func loadTriliumInstanceId(forServer serverID: String) throws -> String?
    func deleteTriliumInstanceId(forServer serverID: String) throws

    /// Removes ETAPI token, session cookies, and sync instance id for a profile.
    func clearServerAuthArtifacts(forServer serverID: String) async throws
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

    func saveSessionCookies(_ data: Data?, forServer serverID: String) throws {
        try deleteSessionCookies(forServer: serverID)
        guard let data, !data.isEmpty else { return }
        var query = cookiesBaseQuery(for: serverID)
        query[kSecValueData as String] = data
        query[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { throw KeychainError.saveFailed(status) }
    }

    func loadSessionCookies(forServer serverID: String) throws -> Data? {
        var query = cookiesBaseQuery(for: serverID)
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        switch status {
        case errSecSuccess:
            return result as? Data
        case errSecItemNotFound:
            return nil
        default:
            throw KeychainError.loadFailed(status)
        }
    }

    func saveTriliumInstanceId(_ id: String, forServer serverID: String) throws {
        let data = Data(id.utf8)
        try deleteInstanceId(forServer: serverID)
        var query = instanceIdBaseQuery(for: serverID)
        query[kSecValueData as String] = data
        query[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { throw KeychainError.saveFailed(status) }
    }

    func deleteTriliumInstanceId(forServer serverID: String) throws {
        try deleteInstanceId(forServer: serverID)
    }

    func clearServerAuthArtifacts(forServer serverID: String) async throws {
        try? deleteToken(forServer: serverID)
        try saveSessionCookies(nil, forServer: serverID)
        try deleteInstanceId(forServer: serverID)
    }

    func loadTriliumInstanceId(forServer serverID: String) throws -> String? {
        var query = instanceIdBaseQuery(for: serverID)
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        switch status {
        case errSecSuccess:
            guard let data = result as? Data else { return nil }
            return String(data: data, encoding: .utf8)
        case errSecItemNotFound:
            return nil
        default:
            throw KeychainError.loadFailed(status)
        }
    }

    private func deleteSessionCookies(forServer serverID: String) throws {
        let status = SecItemDelete(cookiesBaseQuery(for: serverID) as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw KeychainError.deleteFailed(status)
        }
    }

    private func deleteInstanceId(forServer serverID: String) throws {
        let status = SecItemDelete(instanceIdBaseQuery(for: serverID) as CFDictionary)
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

    private func cookiesBaseQuery(for serverID: String) -> [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: "\(servicePrefix).\(serverID)",
            kSecAttrAccount as String: "session-cookies",
        ]
    }

    private func instanceIdBaseQuery(for serverID: String) -> [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: "\(servicePrefix).\(serverID)",
            kSecAttrAccount as String: "trilium-instance-id",
        ]
    }

    // MARK: - App PIN (app-global, not per-server)

    func saveAppPin(_ pin: String) throws {
        try deleteAppPinEntry()
        let hash = SHA256.hash(data: Data(pin.utf8))
        let hex = hash.compactMap { String(format: "%02x", $0) }.joined()
        var query = appPinBaseQuery
        query[kSecValueData as String] = Data(hex.utf8)
        query[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { throw KeychainError.saveFailed(status) }
    }

    func loadAppPinHash() throws -> String? {
        var query = appPinBaseQuery
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        switch status {
        case errSecSuccess:
            guard let data = result as? Data else { return nil }
            return String(data: data, encoding: .utf8)
        case errSecItemNotFound:
            return nil
        default:
            throw KeychainError.loadFailed(status)
        }
    }

    func deleteAppPin() throws {
        try deleteAppPinEntry()
    }

    /// Verifies a candidate PIN against the stored hash.
    func verifyAppPin(_ pin: String) throws -> Bool {
        guard let stored = try loadAppPinHash() else { return false }
        let hash = SHA256.hash(data: Data(pin.utf8))
        let hex = hash.compactMap { String(format: "%02x", $0) }.joined()
        return hex == stored
    }

    private func deleteAppPinEntry() throws {
        let status = SecItemDelete(appPinBaseQuery as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw KeychainError.deleteFailed(status)
        }
    }

    private var appPinBaseQuery: [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: "\(servicePrefix).app",
            kSecAttrAccount as String: "app-pin",
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
