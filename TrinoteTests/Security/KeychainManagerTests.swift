import XCTest
@testable import Trinote

final class KeychainManagerTests: XCTestCase {
    private let testServerId = "test-server-\(UUID().uuidString)"

    override func tearDown() async throws {
        try await KeychainManager.shared.deleteToken(forServer: testServerId)
    }

    func testSaveAndLoadToken() async throws {
        let token = "etapi-test-token-\(UUID().uuidString)"

        try await KeychainManager.shared.saveToken(token, forServer: testServerId)
        let loaded = try await KeychainManager.shared.loadToken(forServer: testServerId)

        XCTAssertEqual(loaded, token)
    }

    func testLoadNonexistentTokenReturnsNil() async throws {
        let loaded = try await KeychainManager.shared.loadToken(forServer: "nonexistent-\(UUID().uuidString)")
        XCTAssertNil(loaded)
    }

    func testOverwriteToken() async throws {
        let token1 = "token-1"
        let token2 = "token-2"

        try await KeychainManager.shared.saveToken(token1, forServer: testServerId)
        try await KeychainManager.shared.saveToken(token2, forServer: testServerId)

        let loaded = try await KeychainManager.shared.loadToken(forServer: testServerId)
        XCTAssertEqual(loaded, token2)
    }

    func testDeleteToken() async throws {
        let token = "token-to-delete"
        try await KeychainManager.shared.saveToken(token, forServer: testServerId)

        try await KeychainManager.shared.deleteToken(forServer: testServerId)
        let loaded = try await KeychainManager.shared.loadToken(forServer: testServerId)

        XCTAssertNil(loaded)
    }

    func testDeleteNonexistentTokenDoesNotThrow() async throws {
        try await KeychainManager.shared.deleteToken(forServer: "never-existed-\(UUID().uuidString)")
    }
}
