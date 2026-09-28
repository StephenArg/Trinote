import SwiftData
import XCTest
@testable import Trinote

final class OfflineSearchIndexTests: XCTestCase {
    private var container: ModelContainer!
    private var directory: URL!
    private var index: OfflineSearchIndex!
    private let profileId = "server1"

    override func setUpWithError() throws {
        container = try ModelContainer(
            for: Schema([CachedNote.self, CachedBranch.self, CachedAttribute.self]),
            configurations: [ModelConfiguration(isStoredInMemoryOnly: true)]
        )
        directory = FileManager.default.temporaryDirectory
            .appending(path: "OfflineSearchIndexTests-\(UUID().uuidString)", directoryHint: .isDirectory)
        index = OfflineSearchIndex(modelContainer: container, directory: directory)
    }

    override func tearDownWithError() throws {
        index = nil
        try? FileManager.default.removeItem(at: directory)
    }

    // MARK: - Helpers

    private func addNote(
        _ noteId: String,
        title: String,
        body: String?,
        type: NoteType = .text,
        isProtected: Bool = false,
        modified: String = "2026-09-01 10:00:00.000Z"
    ) throws {
        let context = ModelContext(container)
        let note = CachedNote(
            noteId: noteId,
            title: title,
            noteType: type.rawValue,
            mime: type == .code ? "text/plain" : "text/html",
            isProtected: isProtected,
            utcDateModified: modified,
            serverProfileId: profileId
        )
        if let body {
            CacheStore.storeBody(Data(body.utf8), in: note, utcDateModified: modified, contentBlobId: nil)
        }
        context.insert(note)
        try context.save()
    }

    private func setBody(_ noteId: String, to body: String) throws {
        let context = ModelContext(container)
        let note = try XCTUnwrap(CacheStore(context: context).fetchCachedNote(id: noteId, serverProfileId: profileId))
        CacheStore.storeBody(Data(body.utf8), in: note, utcDateModified: nil, contentBlobId: nil)
        try context.save()
    }

    private func deleteNote(_ noteId: String) throws {
        let context = ModelContext(container)
        let note = try XCTUnwrap(CacheStore(context: context).fetchCachedNote(id: noteId, serverProfileId: profileId))
        context.delete(note)
        try context.save()
    }

    private func addLabel(_ noteId: String, _ name: String, _ value: String = "") throws {
        let context = ModelContext(container)
        context.insert(CachedAttribute(
            attributeId: UUID().uuidString, noteId: noteId, type: "label", name: name, value: value, serverProfileId: profileId
        ))
        try context.save()
    }

    private func search(_ text: String) async throws -> [LocalSearchHit] {
        try await index.search(LocalSearchQuery(text), profileId: profileId, limit: 50).hits
    }

    private func ids(_ text: String) async throws -> [String] {
        try await search(text).map(\.noteId)
    }

    // MARK: - Tests

    func testFindsAnyPartOfAWordInTheBody() async throws {
        try addNote("n1", title: "Plans", body: "<p>Started gardening in May</p>")
        try addNote("n2", title: "Other", body: "<p>Nothing here</p>")
        await index.refresh(profileId: profileId)

        let hits = try await search("den")
        XCTAssertEqual(hits.map(\.noteId), ["n1"])
        XCTAssertEqual(hits.first?.snippet, "Started gardening in May")
    }

    func testIgnoresCaseAndAccents() async throws {
        try addNote("n1", title: "Meeting", body: "<p>Meet at the Café</p>")
        try addNote("n2", title: "Plain", body: "<p>naive resume</p>")
        await index.refresh(profileId: profileId)

        let cafe = try await ids("CAFE")
        let accented = try await ids("naïve résumé")
        XCTAssertEqual(cafe, ["n1"])
        XCTAssertEqual(accented, ["n2"])
    }

    func testTermsMaySplitBetweenTitleAndBody() async throws {
        try addNote("n1", title: "Groceries", body: "<p>milk and eggs</p>")
        await index.refresh(profileId: profileId)

        let both = try await ids("groceries milk")
        let missing = try await ids("groceries bread")
        XCTAssertEqual(both, ["n1"])
        XCTAssertEqual(missing, [])
    }

    func testProtectedBodiesAreNotIndexed() async throws {
        try addNote("n1", title: "Vault", body: "<p>secret plan</p>", isProtected: true)
        await index.refresh(profileId: profileId)

        let byBody = try await ids("secret")
        let byTitle = try await ids("vault")
        XCTAssertEqual(byBody, [])
        XCTAssertEqual(byTitle, ["n1"])
    }

    func testChangedBodyIsReindexed() async throws {
        try addNote("n1", title: "Note", body: "<p>alpha</p>")
        await index.refresh(profileId: profileId)
        let before = try await ids("alpha")
        XCTAssertEqual(before, ["n1"])

        try setBody("n1", to: "<p>bravo</p>")
        await index.refresh(profileId: profileId)
        let old = try await ids("alpha")
        let new = try await ids("bravo")
        XCTAssertEqual(old, [])
        XCTAssertEqual(new, ["n1"])
    }

    func testDeletedNoteIsNotFound() async throws {
        try addNote("n1", title: "Note", body: "<p>charlie</p>")
        await index.refresh(profileId: profileId)
        try deleteNote("n1")
        await index.refresh(profileId: profileId)

        let found = try await ids("charlie")
        XCTAssertEqual(found, [])
    }

    func testShortTermsMatchTitlesOnly() async throws {
        try addNote("n1", title: "AB testing", body: "<p>xy</p>")
        try addNote("n2", title: "Other", body: "<p>ab cd</p>")
        await index.refresh(profileId: profileId)

        let found = try await ids("ab")
        XCTAssertEqual(found, ["n1"])
    }

    func testLabelFilters() async throws {
        try addNote("n1", title: "Shopping", body: "<p>milk</p>")
        try addNote("n2", title: "Chores", body: "<p>laundry</p>")
        try addNote("n3", title: "Unlabeled", body: "<p>milk</p>")
        try addLabel("n1", "todo")
        try addLabel("n2", "todo", "Done")
        await index.refresh(profileId: profileId)

        let any = try await ids("#todo")
        let done = try await ids("#todo=done")
        let withWord = try await ids("#todo milk")
        XCTAssertEqual(Set(any), ["n1", "n2"])
        XCTAssertEqual(done, ["n2"])
        XCTAssertEqual(withWord, ["n1"])
    }

    func testTitleMatchesRankFirstThenNewest() async throws {
        try addNote("old", title: "Budget", body: "<p>numbers</p>", modified: "2025-01-01 10:00:00.000Z")
        try addNote("new", title: "Notes", body: "<p>budget line</p>", modified: "2026-09-01 10:00:00.000Z")
        try addNote("newer", title: "More notes", body: "<p>the budget again</p>", modified: "2026-09-20 10:00:00.000Z")
        await index.refresh(profileId: profileId)

        let found = try await ids("budget")
        XCTAssertEqual(found, ["old", "newer", "new"])
    }

    func testTitlesWorkBeforeTheIndexIsBuilt() async throws {
        try addNote("n1", title: "Recipes", body: "<p>soup</p>")

        let byTitle = try await ids("recip")
        XCTAssertEqual(byTitle, ["n1"])
    }

    func testCodeNotesAreSearchedAsSource() async throws {
        try addNote("n1", title: "Script", body: "func frobnicate() {}", type: .code)
        await index.refresh(profileId: profileId)

        let found = try await ids("frobni")
        XCTAssertEqual(found, ["n1"])
    }

    func testDeleteIndexStartsOver() async throws {
        try addNote("n1", title: "Note", body: "<p>delta</p>")
        await index.refresh(profileId: profileId)
        await index.deleteIndex(profileId: profileId)

        let afterDelete = try await ids("delta")
        XCTAssertEqual(afterDelete, [])
        await index.refresh(profileId: profileId)
        let afterRebuild = try await ids("delta")
        XCTAssertEqual(afterRebuild, ["n1"])
    }
}
