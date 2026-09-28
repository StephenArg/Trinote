import XCTest
@testable import Trinote

final class InboxDestinationTests: XCTestCase {
    private func target(_ json: String) throws -> InboxTargetResponse {
        try JSONDecoder().decode(InboxTargetResponse.self, from: Data(json.utf8))
    }

    func testServerAnswerNamesTheDestination() throws {
        XCTAssertEqual(
            InboxDestination(try target(#"{"kind":"inbox","noteId":"inb1","title":"Inbox"}"#)),
            .inbox(noteId: "inb1", title: "Inbox")
        )
        XCTAssertEqual(InboxDestination(try target(#"{"kind":"dayNote"}"#)), .todaysJournalNote)
        XCTAssertEqual(InboxDestination(try target(#"{"kind":"root","noteId":"root","title":"root"}"#)), .topLevel)
        XCTAssertEqual(
            InboxDestination(try target(#"{"kind":"workspaceInbox","noteId":"ws1","title":"Work inbox"}"#)),
            .inbox(noteId: "ws1", title: "Work inbox")
        )
    }

    func testSyncedNotesFollowTrilium() {
        XCTAssertEqual(
            InboxDestination.fromSyncedNotes(inboxNoteId: "inb1", inboxTitle: "Inbox", hasJournal: true),
            .inbox(noteId: "inb1", title: "Inbox"),
            "an #inbox note wins over the journal"
        )
        XCTAssertEqual(InboxDestination.fromSyncedNotes(inboxNoteId: nil, inboxTitle: "", hasJournal: true), .todaysJournalNote)
        XCTAssertEqual(
            InboxDestination.fromSyncedNotes(inboxNoteId: nil, inboxTitle: "", hasJournal: false),
            .topLevel,
            "no journal is built for a capture"
        )
    }
}
