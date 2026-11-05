import XCTest
@testable import Trinote

final class AddNoteDefaultTests: XCTestCase {
    private let suite = "AddNoteDefaultTests"
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
        XCTAssertNil(AddNoteDefault.load(profileId: "p1", defaults: defaults))
    }

    func testInboxRoundTrips() {
        AddNoteDefault.inbox.save(profileId: "p1", defaults: defaults)
        XCTAssertEqual(AddNoteDefault.load(profileId: "p1", defaults: defaults), .inbox)
    }

    func testNoteRoundTripsPerProfile() {
        AddNoteDefault.note(id: "abc", title: "Ideas").save(profileId: "p1", defaults: defaults)
        XCTAssertEqual(AddNoteDefault.load(profileId: "p1", defaults: defaults), .note(id: "abc", title: "Ideas"))
        XCTAssertNil(AddNoteDefault.load(profileId: "p2", defaults: defaults))
    }

    func testRemoveClearsTheChoice() {
        AddNoteDefault.inbox.save(profileId: "p1", defaults: defaults)
        AddNoteDefault.remove(profileId: "p1", defaults: defaults)
        XCTAssertNil(AddNoteDefault.load(profileId: "p1", defaults: defaults))
    }

    func testRemapFollowsAnOfflineNoteToItsServerId() {
        AddNoteDefault.note(id: "ol_1", title: "Ideas").save(profileId: "p1", defaults: defaults)
        AddNoteDefault.remapOfflineId(from: "ol_2", to: "srv2", profileId: "p1", defaults: defaults)
        XCTAssertEqual(AddNoteDefault.load(profileId: "p1", defaults: defaults), .note(id: "ol_1", title: "Ideas"))
        AddNoteDefault.remapOfflineId(from: "ol_1", to: "srv1", profileId: "p1", defaults: defaults)
        XCTAssertEqual(AddNoteDefault.load(profileId: "p1", defaults: defaults), .note(id: "srv1", title: "Ideas"))
    }

    func testRemapLeavesTheInboxRuleAlone() {
        AddNoteDefault.inbox.save(profileId: "p1", defaults: defaults)
        AddNoteDefault.remapOfflineId(from: "ol_1", to: "srv1", profileId: "p1", defaults: defaults)
        XCTAssertEqual(AddNoteDefault.load(profileId: "p1", defaults: defaults), .inbox)
    }

    func testDisplayTitles() {
        XCTAssertEqual(AddNoteDefault.inbox.displayTitle, "Inbox")
        XCTAssertEqual(AddNoteDefault.note(id: TriliumTreeConstants.rootNoteId, title: "").displayTitle, "Notes")
        XCTAssertEqual(AddNoteDefault.note(id: "abc", title: "Ideas").displayTitle, "Ideas")
        XCTAssertEqual(AddNoteDefault.note(id: "abc", title: "").displayTitle, "abc")
    }
}
