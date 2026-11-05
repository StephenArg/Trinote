import XCTest
@testable import Trinote

final class PinnedNoteTabTests: XCTestCase {
    private let suite = "PinnedNoteTabTests"
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

    func testNothingStoredMeansNoPinnedNote() {
        XCTAssertNil(PinnedNoteTab.load(profileId: "p1", defaults: defaults))
    }

    func testRoundTripsPerProfile() {
        PinnedNoteTab.save(NoteReference(noteId: "abc", title: "Plans"), profileId: "p1", defaults: defaults)
        XCTAssertEqual(PinnedNoteTab.load(profileId: "p1", defaults: defaults), NoteReference(noteId: "abc", title: "Plans"))
        XCTAssertNil(PinnedNoteTab.load(profileId: "p2", defaults: defaults))
    }

    func testRemoveClearsTheNote() {
        PinnedNoteTab.save(NoteReference(noteId: "abc", title: "Plans"), profileId: "p1", defaults: defaults)
        PinnedNoteTab.remove(profileId: "p1", defaults: defaults)
        XCTAssertNil(PinnedNoteTab.load(profileId: "p1", defaults: defaults))
    }

    func testRemapFollowsAnOfflineNoteToItsServerId() {
        PinnedNoteTab.save(NoteReference(noteId: "ol_1", title: "Plans"), profileId: "p1", defaults: defaults)
        PinnedNoteTab.remapOfflineId(from: "ol_9", to: "srv9", profileId: "p1", defaults: defaults)
        XCTAssertEqual(PinnedNoteTab.load(profileId: "p1", defaults: defaults)?.noteId, "ol_1")
        PinnedNoteTab.remapOfflineId(from: "ol_1", to: "srv1", profileId: "p1", defaults: defaults)
        XCTAssertEqual(PinnedNoteTab.load(profileId: "p1", defaults: defaults), NoteReference(noteId: "srv1", title: "Plans"))
    }
}
