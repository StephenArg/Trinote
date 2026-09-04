import XCTest
@testable import Trinote

final class JournalDayEditedNotesTests: XCTestCase {
    func testIsISODay() {
        XCTAssertTrue(JournalDayEditedNotes.isISODay("2026-08-29"))
        XCTAssertTrue(JournalDayEditedNotes.isISODay("2026-12-31"))
        XCTAssertFalse(JournalDayEditedNotes.isISODay("2026-8-29"))
        XCTAssertFalse(JournalDayEditedNotes.isISODay("2026-08-29T10:00:00.000Z"))
        XCTAssertFalse(JournalDayEditedNotes.isISODay("dateNote"))
        XCTAssertFalse(JournalDayEditedNotes.isISODay(""))
    }

    func testNextISODayCrossesMonthAndYear() {
        XCTAssertEqual(JournalDayEditedNotes.nextISODay("2026-08-29"), "2026-08-30")
        XCTAssertEqual(JournalDayEditedNotes.nextISODay("2026-08-31"), "2026-09-01")
        XCTAssertEqual(JournalDayEditedNotes.nextISODay("2026-12-31"), "2027-01-01")
        XCTAssertNil(JournalDayEditedNotes.nextISODay("2026-13-01"))
        XCTAssertNil(JournalDayEditedNotes.nextISODay("not-a-day"))
    }

    func testUtcDateModifiedFallsOnDay() {
        XCTAssertTrue(JournalDayEditedNotes.utcDateModifiedFallsOnDay("2026-08-29T10:00:00.000Z", dayISO: "2026-08-29"))
        XCTAssertTrue(JournalDayEditedNotes.utcDateModifiedFallsOnDay("2026-08-29 10:00:00.000Z", dayISO: "2026-08-29"))
        XCTAssertFalse(JournalDayEditedNotes.utcDateModifiedFallsOnDay("2026-08-30T00:00:00.000Z", dayISO: "2026-08-29"))
        XCTAssertFalse(JournalDayEditedNotes.utcDateModifiedFallsOnDay("2026-08-28T23:59:59.000Z", dayISO: "2026-08-29"))
    }

    func testDisplayListExcludesCurrentHiddenEmptyAndDuplicates() {
        let notes = [
            NoteIdTitle(noteId: "day", title: "29 - Friday", isProtected: false),
            NoteIdTitle(noteId: "a", title: "Alpha", isProtected: false),
            NoteIdTitle(noteId: "a", title: "Alpha again", isProtected: false),
            NoteIdTitle(noteId: "_share", title: "Share root", isProtected: false),
            NoteIdTitle(noteId: "blank", title: "   ", isProtected: false),
            NoteIdTitle(noteId: "b", title: "Beta", isProtected: true),
            NoteIdTitle(noteId: "c", title: "Gamma", isProtected: false),
        ]
        let list = JournalDayEditedNotes.displayList(from: notes, excludingNoteId: "day", limit: 2)
        XCTAssertEqual(list.map(\.noteId), ["a", "b"])
        XCTAssertEqual(list.map(\.title), ["Alpha", "Beta"])
    }

    func testEditedNoteHitDecodesOptionalTitleAndDeleted() throws {
        let json = Data(#"[{"noteId":"n1","isDeleted":false,"title":"Alpha"},{"noteId":"n2","isDeleted":true,"title":"Gone"},{"noteId":"n3","isDeleted":false}]"#.utf8)
        let hits = try JSONDecoder().decode([EditedNoteHit].self, from: json)
        XCTAssertEqual(hits.count, 3)
        XCTAssertEqual(hits[0].noteId, "n1")
        XCTAssertEqual(hits[0].title, "Alpha")
        XCTAssertFalse(hits[0].isDeleted)
        XCTAssertTrue(hits[1].isDeleted)
        XCTAssertNil(hits[2].title)
    }
}
