import XCTest
@testable import Trinote

final class SharedNotesSubtreeLoaderTests: XCTestCase {
    func testLoadAllSharedNotes_flattensUnderShareRoot() async throws {
        let mock = MockTriliumClient()
        await mock.seedSharedNotesSubtreeDemo()
        let items = try await SharedNotesSubtreeLoader.loadAllSharedNotes(client: mock)
        XCTAssertEqual(items.map(\.noteId), ["n1"])
    }

    func testTriliumSharing_publicURLUsesAliasWhenPresent() {
        let base = URL(string: "https://example.com/app")!
        let note = NoteItem(
            from: TestFixtures.noteResponse(
                attributes: [
                    TestFixtures.attributeResponse(name: TriliumSharing.shareAliasLabelName, value: "my-page"),
                ]
            )
        )
        let url = TriliumSharing.publicShareURL(baseURL: base, note: note)
        XCTAssertEqual(url?.absoluteString, "https://example.com/app/share/my-page")
    }
}
