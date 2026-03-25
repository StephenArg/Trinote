import XCTest
@testable import Trinote

final class KeychainManagerTests: XCTestCase {
    private let testServerId = "test-server-\(UUID().uuidString)"

    override func tearDown() async throws {
        try await KeychainManager.shared.clearServerAuthArtifacts(forServer: testServerId)
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

    func testSaveLoadClearSessionCookies() async throws {
        let blob = Data("fake-cookie-archive".utf8)
        try await KeychainManager.shared.saveSessionCookies(blob, forServer: testServerId)
        let loaded = try await KeychainManager.shared.loadSessionCookies(forServer: testServerId)
        XCTAssertEqual(loaded, blob)

        try await KeychainManager.shared.saveSessionCookies(nil, forServer: testServerId)
        let cleared = try await KeychainManager.shared.loadSessionCookies(forServer: testServerId)
        XCTAssertNil(cleared)
    }

    func testSaveLoadTriliumInstanceId() async throws {
        let id = "instance-\(UUID().uuidString)"
        try await KeychainManager.shared.saveTriliumInstanceId(id, forServer: testServerId)
        let loaded = try await KeychainManager.shared.loadTriliumInstanceId(forServer: testServerId)
        XCTAssertEqual(loaded, id)

        try await KeychainManager.shared.deleteTriliumInstanceId(forServer: testServerId)
        let afterDelete = try await KeychainManager.shared.loadTriliumInstanceId(forServer: testServerId)
        XCTAssertNil(afterDelete)
    }
}
