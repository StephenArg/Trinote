import XCTest
@testable import Trinote

/// Shared helpers for the Shortcuts tests.
enum ShortcutTestSupport {
    static let utc = TimeZone(identifier: "UTC")!

    static func date(_ year: Int, _ month: Int, _ day: Int, _ hour: Int = 12, _ minute: Int = 0, in timeZone: TimeZone = utc) -> Date {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = timeZone
        return calendar.date(from: DateComponents(year: year, month: month, day: day, hour: hour, minute: minute))!
    }

    static func entry(
        _ text: String,
        addTime: Bool = false,
        at date: Date = ShortcutTestSupport.date(2026, 10, 22, 14, 5),
        timeZone: TimeZone = utc,
        profileId: String = "p1"
    ) -> JournalCapture.Entry {
        JournalCapture.Entry(text: text, addTime: addTime, capturedAt: date, timeZone: timeZone, profileId: profileId)
    }

    static func written(_ calls: [(String, Data)]) -> [String] {
        calls.map { String(decoding: $0.1, as: UTF8.self) }
    }
}

final class JournalCaptureHTMLTests: XCTestCase {
    private func entry(_ text: String, addTime: Bool = false) -> JournalCapture.Entry {
        ShortcutTestSupport.entry(text, addTime: addTime)
    }

    func testEmptyBodiesAreReplacedRatherThanKeptAsABlankLine() {
        for body in ["", "  \n", "<p></p>", "<p><br></p>", "<p><br/></p>", "<p>&nbsp;</p>"] {
            XCTAssertEqual(JournalCapture.appendedHTML(existing: body, entry: entry("Hello")), "<p>Hello</p>", "body: \(body)")
        }
    }

    func testAddsAfterExistingContent() {
        XCTAssertEqual(
            JournalCapture.appendedHTML(existing: "<p>First</p>\n", entry: entry("Second")),
            "<p>First</p><p>Second</p>"
        )
    }

    func testBlankLinesStartParagraphsAndLineBreaksStay() {
        XCTAssertEqual(
            JournalCapture.paragraphsHTML(for: entry("  One\ntwo\n\nThree  ")),
            "<p>One<br>two</p><p>Three</p>"
        )
    }

    func testEscapesHTML() {
        XCTAssertEqual(
            JournalCapture.paragraphsHTML(for: entry("a < b & \"c\"")),
            "<p>a &lt; b &amp; &quot;c&quot;</p>"
        )
    }

    func testTimePrefixUsesTheLocalesClock() {
        let twentyFourHour = JournalCapture.paragraphsHTML(for: entry("Idea", addTime: true), locale: Locale(identifier: "en_GB"))
        XCTAssertEqual(twentyFourHour, "<p>14:05 – Idea</p>")

        let twelveHour = JournalCapture.paragraphsHTML(for: entry("Idea", addTime: true), locale: Locale(identifier: "en_US"))
        XCTAssertTrue(twelveHour.hasPrefix("<p>2:05"), twelveHour)
        XCTAssertTrue(twelveHour.contains("PM"), twelveHour)
        XCTAssertTrue(twelveHour.hasSuffix(" – Idea</p>"), twelveHour)
    }

    func testTheDayIsTheCaptureTimeZonesDay() {
        let newYork = TimeZone(identifier: "America/New_York")!
        // 23:30 in New York is already the next day in UTC.
        let late = ShortcutTestSupport.date(2026, 10, 22, 23, 30, in: newYork)
        XCTAssertEqual(ShortcutTestSupport.entry("x", at: late, timeZone: newYork).isoDay, "2026-10-22")
        XCTAssertEqual(ShortcutTestSupport.entry("x", at: late, timeZone: ShortcutTestSupport.utc).isoDay, "2026-10-23")
    }

    func testTimePrefixKeepsTheCaptureTimeZone() {
        let newYork = TimeZone(identifier: "America/New_York")!
        let entry = ShortcutTestSupport.entry("Late", addTime: true, at: ShortcutTestSupport.date(2026, 10, 22, 23, 30, in: newYork), timeZone: newYork)
        XCTAssertEqual(JournalCapture.paragraphsHTML(for: entry, locale: Locale(identifier: "en_GB")), "<p>23:30 – Late</p>")
    }
}

final class JournalCaptureAppendTests: XCTestCase {
    func testAppendsToTheDayNoteOfTheEntrysDay() async throws {
        let mock = MockTriliumClient()
        await mock.setDayNote(NoteIdTitle(noteId: "d1", title: "22 - Thursday", isProtected: false, type: "text"))
        await mock.setNoteContentResult("d1", .success(Data("<p>Before</p>".utf8)))
        let entry = ShortcutTestSupport.entry("After")

        let note = try await JournalCapture.append(entry, client: mock, protectedSessionActive: false)

        XCTAssertEqual(note.noteId, "d1")
        let dayCalls = await mock.getOrCreateDayNoteCalls
        XCTAssertEqual(dayCalls, ["2026-10-22"])
        let writes = await mock.updateNoteContentCalls
        XCTAssertEqual(writes.map(\.0), ["d1"])
        XCTAssertEqual(ShortcutTestSupport.written(writes), ["<p>Before</p><p>After</p>"])
    }

    func testProtectedDayNoteIsOnlyWrittenWhileUnlocked() async throws {
        let mock = MockTriliumClient()
        await mock.setDayNote(NoteIdTitle(noteId: "d1", title: "22", isProtected: true, type: "text"))
        let entry = ShortcutTestSupport.entry("Secret")

        do {
            _ = try await JournalCapture.append(entry, client: mock, protectedSessionActive: false)
            XCTFail("expected journalNoteProtected")
        } catch {
            XCTAssertEqual(error as? ShortcutError, .journalNoteProtected)
        }
        let writesWhileLocked = await mock.updateNoteContentCalls
        XCTAssertTrue(writesWhileLocked.isEmpty)

        _ = try await JournalCapture.append(entry, client: mock, protectedSessionActive: true)
        let writes = await mock.updateNoteContentCalls
        XCTAssertEqual(writes.count, 1)
    }

    func testNonTextDayNoteIsRefused() async {
        let mock = MockTriliumClient()
        await mock.setDayNote(NoteIdTitle(noteId: "d1", title: "22", isProtected: false, type: "code"))
        do {
            _ = try await JournalCapture.append(ShortcutTestSupport.entry("x"), client: mock, protectedSessionActive: false)
            XCTFail("expected journalNoteNotText")
        } catch {
            XCTAssertEqual(error as? ShortcutError, .journalNoteNotText)
        }
        let writes = await mock.updateNoteContentCalls
        XCTAssertTrue(writes.isEmpty)
    }
}

final class ShortcutErrorTests: XCTestCase {
    func testConnectionFailuresAreOffline() {
        XCTAssertEqual(ShortcutError.from(URLError(.notConnectedToInternet)), .offline)
        XCTAssertEqual(ShortcutError.from(URLError(.networkConnectionLost)), .offline)
        XCTAssertEqual(ShortcutError.from(APIError.timeout), .offline)
        XCTAssertEqual(ShortcutError.from(APIError.serverError(statusCode: 503, message: nil)), .offline)
        XCTAssertEqual(ShortcutError.from(APIError.cancelled), .offline)
    }

    func testLoginFailuresAreSessionExpired() {
        XCTAssertEqual(ShortcutError.from(APIError.unauthorized), .sessionExpired)
    }

    func testOtherFailuresCarryTheServersMessage() {
        guard case .server = ShortcutError.from(APIError.serverError(statusCode: 400, message: "bad")) else {
            return XCTFail("expected server")
        }
        XCTAssertEqual(ShortcutError.from(ShortcutError.journalNoteNotText), .journalNoteNotText)
    }

    func testWhichFailuresKeepTheCapture() {
        XCTAssertTrue(ShortcutError.offline.keepsJournalCapture)
        XCTAssertTrue(ShortcutError.sessionExpired.keepsJournalCapture)
        XCTAssertTrue(ShortcutError.journalNoteProtected.keepsJournalCapture)
        XCTAssertFalse(ShortcutError.journalNoteNotText.keepsJournalCapture)
        XCTAssertFalse(ShortcutError.notSignedIn.keepsJournalCapture)
        XCTAssertFalse(ShortcutError.server("x").keepsJournalCapture)
    }
}
