import XCTest
@testable import Trinote

final class AddNoteKindDefaultTests: XCTestCase {
    private let suite = "AddNoteKindDefaultTests"
    private var defaults: UserDefaults!

    override func setUp() {
        super.setUp()
        defaults = UserDefaults(suiteName: suite)
        defaults.removePersistentDomain(forName: suite)
    }

    override func tearDown() {
        defaults.removePersistentDomain(forName: suite)
        super.tearDown()
    }

    func testNothingStoredMeansAskEachTime() {
        XCTAssertNil(AddNoteKindDefault.load(profileId: "p1", defaults: defaults))
    }

    func testTypeAndCollectionRoundTripAndMapBack() {
        AddNoteKindDefault(kind: .type(.code)).save(profileId: "p1", defaults: defaults)
        let stored = AddNoteKindDefault.load(profileId: "p1", defaults: defaults)
        XCTAssertEqual(stored, .type("code"))
        XCTAssertEqual(stored?.newNoteKind, .type(.code))

        AddNoteKindDefault(kind: .collection(.grid)).save(profileId: "p2", defaults: defaults)
        XCTAssertEqual(AddNoteKindDefault.load(profileId: "p2", defaults: defaults)?.newNoteKind, .collection(.grid))
        XCTAssertNil(AddNoteKindDefault.load(profileId: "p3", defaults: defaults))
    }

    func testUnknownStoredTypeMapsToNoKind() {
        XCTAssertNil(AddNoteKindDefault.type("hologram").newNoteKind)
        XCTAssertNil(AddNoteKindDefault.collection("orbit").newNoteKind)
        XCTAssertEqual(AddNoteKindDefault.type("hologram").displayTitle, "Text")
    }

    func testTemplateRoundTripsWithItsDestinationChoice() {
        let template = UserNoteTemplate(noteId: "tpl", title: "Meeting", type: "text", mime: "text/html")
        AddNoteKindDefault(template: template, followsDestination: false).save(profileId: "p1", defaults: defaults)
        let stored = AddNoteKindDefault.load(profileId: "p1", defaults: defaults)
        XCTAssertEqual(stored?.template, template)
        XCTAssertEqual(stored?.followsTemplateDestination, false)
        XCTAssertNil(stored?.newNoteKind)
        XCTAssertEqual(stored?.displayTitle, "Meeting")
    }

    func testRemoveAndRemap() {
        let template = UserNoteTemplate(noteId: "ol_1", title: "Meeting", type: "text", mime: "text/html")
        AddNoteKindDefault(template: template, followsDestination: true).save(profileId: "p1", defaults: defaults)
        AddNoteKindDefault.remapOfflineId(from: "ol_1", to: "srv1", profileId: "p1", defaults: defaults)
        XCTAssertEqual(AddNoteKindDefault.load(profileId: "p1", defaults: defaults)?.template?.noteId, "srv1")
        AddNoteKindDefault.remove(profileId: "p1", defaults: defaults)
        XCTAssertNil(AddNoteKindDefault.load(profileId: "p1", defaults: defaults))
    }
}
