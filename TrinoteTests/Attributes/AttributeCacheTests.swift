import SwiftData
import XCTest
@testable import Trinote

/// Cache upkeep after the app changes a note's attributes or type. Uses the app's shared store under a server id
/// of its own, cleared after each test.
@MainActor
final class AttributeCacheTests: XCTestCase {
    private let profileId = "attribute-cache-test-server"

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        try await super.tearDown()
    }

    private func store() async throws -> PersistenceManager {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        return PersistenceManager.shared
    }

    func testPruneDropsAttributesTheServerNoLongerHas() async throws {
        let persistence = try await store()
        let note = TestFixtures.noteResponse(id: "pruneNote")
        try persistence.cacheNote(from: note, serverProfileId: profileId)
        for id in ["keep", "gone", "local-iconClass-pruneNote"] {
            try persistence.cacheAttributeBatch(
                from: TestFixtures.attributeResponse(attributeId: id, noteId: "pruneNote", name: id),
                serverProfileId: profileId
            )
        }
        try persistence.commitBatch()

        try persistence.pruneCachedAttributes(noteId: "pruneNote", keeping: ["keep"], serverProfileId: profileId)

        let left = try persistence.fetchCachedAttributes(noteId: "pruneNote", serverProfileId: profileId)
        XCTAssertEqual(left.map(\.attributeId), ["keep"])
    }

    func testStoredTypeCopiesFollowATypeChange() async throws {
        let persistence = try await store()
        try persistence.recordRecentNote(noteId: "typed", title: "T", noteType: "text", serverProfileId: profileId)
        try persistence.updateStoredNoteType(noteId: "typed", noteType: "canvas", serverProfileId: profileId)
        XCTAssertEqual(try persistence.fetchRecentNote(noteId: "typed", serverProfileId: profileId)?.noteType, "canvas")
    }
}
