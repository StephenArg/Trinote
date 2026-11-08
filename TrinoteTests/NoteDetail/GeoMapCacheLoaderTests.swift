import XCTest
@testable import Trinote

/// A geo map's notes read from the offline cache: pins in folders under the map, and the sub-note tree's levels.
@MainActor
final class GeoMapCacheLoaderTests: XCTestCase {
    private let profileId = "geomap-cache-loader-test-server"
    private var appState: AppState!
    private var persistence: PersistenceManager { PersistenceManager.shared }
    private let policy = CacheExclusionPolicy()

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func makeViewModel(noteId: String) async throws -> NoteDetailViewModel {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        try? persistence.clearCache(for: profileId)
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        self.appState = appState
        return NoteDetailViewModel(noteId: noteId, appState: appState)
    }

    private func label(_ name: String, _ value: String = "", on noteId: String) -> AttributeResponse {
        AttributeResponse(attributeId: "a_\(noteId)_\(name)", noteId: noteId, type: "label", name: name, value: value, position: 0, isInheritable: false, utcDateModified: nil)
    }

    private func cacheNote(_ id: String, under parent: String?, position: Int = 10, title: String? = nil, labels: [AttributeResponse] = []) throws {
        let response = TestFixtures.noteResponse(
            id: id, title: title ?? id, type: "text", parentNoteIds: parent.map { [$0] } ?? ["root"], attributes: labels
        )
        try persistence.cacheNoteIfAllowed(from: response, serverProfileId: profileId, policy: policy)
        for attribute in labels {
            try persistence.cacheAttributeBatchIfAllowed(from: attribute, parentNoteIds: response.parentNoteIds, serverProfileId: profileId, policy: policy)
        }
        if let parent {
            _ = persistence.upsertBranchForFullSync(
                TestFixtures.branchResponse(branchId: "b_\(parent)_\(id)", noteId: id, parentNoteId: parent, notePosition: position),
                existing: nil, serverProfileId: profileId
            )
        }
    }

    /// map
    /// ├── Paris (folder)          ├── Louvre 📍   └── Old (archived) └── Hotel 📍
    /// ├── Rome 📍
    /// └── _hidden
    private func seedMap() throws {
        try cacheNote("map", under: nil, title: "Trips", labels: [label("viewType", "geoMap", on: "map")])
        try cacheNote("paris", under: "map", position: 10, title: "Paris")
        try cacheNote("louvre", under: "paris", position: 10, title: "Louvre", labels: [label("geolocation", "48.8606,2.3376", on: "louvre")])
        try cacheNote("old", under: "paris", position: 20, title: "Old", labels: [label("archived", on: "old")])
        try cacheNote("hotel", under: "old", position: 10, title: "Hotel", labels: [label("geolocation", "48.85,2.35", on: "hotel")])
        try cacheNote("rome", under: "map", position: 20, title: "Rome", labels: [label("geolocation", "41.9028,12.4964", on: "rome")])
        try cacheNote("_hidden", under: "map", position: 30)
        try persistence.commitBatch()
    }

    func testPinsInFoldersUnderTheMapAreDrawnAndArchivedFoldersAreNot() async throws {
        let vm = try await makeViewModel(noteId: "map")
        try seedMap()
        let layers = vm.geoMapLayersFromCache()
        XCTAssertEqual(layers.pins.map(\.noteId), ["louvre", "rome"])
        XCTAssertEqual(layers.pins.first?.lat ?? 0, 48.8606, accuracy: 1e-9)
    }

    func testTheSubnoteTreeReadsChildrenInOrderWithTheirCounts() async throws {
        let vm = try await makeViewModel(noteId: "map")
        try seedMap()
        let levels = vm.cachedChildSummaries(ofParents: ["map", "paris", "rome"])
        XCTAssertEqual(levels["map"]?.map(\.noteId), ["paris", "rome"], "hidden system notes are left out")
        XCTAssertEqual(levels["map"]?.map(\.childCount), [2, 0])
        XCTAssertEqual(levels["paris"]?.map(\.title), ["Louvre", "Old"])
        XCTAssertNil(levels["rome"], "a note with no children in the cache isn't answered for (the tree shows it empty)")
        XCTAssertNil(vm.cachedChildSummaries(ofParents: ["unknown"])["unknown"])
    }
}
