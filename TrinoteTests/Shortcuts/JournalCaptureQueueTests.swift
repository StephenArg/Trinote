import XCTest
@testable import Trinote

final class JournalCaptureQueueTests: XCTestCase {
    private var directory: URL!

    override func setUp() {
        super.setUp()
        directory = FileManager.default.temporaryDirectory.appendingPathComponent("JournalCaptureQueueTests-\(UUID().uuidString)")
    }

    override func tearDown() {
        try? FileManager.default.removeItem(at: directory)
        super.tearDown()
    }

    private func makeQueue() -> JournalCaptureQueue {
        JournalCaptureQueue(fileURL: directory.appendingPathComponent("captures.json"))
    }

    private let day21 = ShortcutTestSupport.entry("Monday thought", at: ShortcutTestSupport.date(2026, 10, 21))
    private let day22 = ShortcutTestSupport.entry("Tuesday thought", at: ShortcutTestSupport.date(2026, 10, 22))

    private func mockWithDayNotes() async -> MockTriliumClient {
        let mock = MockTriliumClient()
        await mock.setDayNoteResult(.success(NoteIdTitle(noteId: "d21", title: "21", isProtected: false, type: "text")), forDay: "2026-10-21")
        await mock.setDayNoteResult(.success(NoteIdTitle(noteId: "d22", title: "22", isProtected: false, type: "text")), forDay: "2026-10-22")
        await mock.setNoteContentResult("d21", .success(Data()))
        await mock.setNoteContentResult("d22", .success(Data()))
        return mock
    }

    func testCapturesPersistAcrossLaunchesPerServer() async throws {
        let queue = makeQueue()
        try await queue.enqueue(day21)
        try await queue.enqueue(day22)
        try await queue.enqueue(ShortcutTestSupport.entry("Other server", profileId: "p2"))

        let reloaded = makeQueue()
        let pending = await reloaded.pending(profileId: "p1")
        XCTAssertEqual(pending.map(\.id), [day21.id, day22.id])
        let otherCount = await reloaded.count(profileId: "p2")
        XCTAssertEqual(otherCount, 1)
    }

    func testFlushWritesOldestFirstEachToItsOwnDay() async throws {
        let queue = makeQueue()
        try await queue.enqueue(day21)
        try await queue.enqueue(day22)
        let mock = await mockWithDayNotes()

        let result = await queue.flush(client: mock, profileId: "p1", protectedSessionActive: false)

        XCTAssertEqual(result.written[day21.id]?.noteId, "d21")
        XCTAssertEqual(result.written[day22.id]?.noteId, "d22")
        XCTAssertNil(result.stoppedBy)
        XCTAssertEqual(result.writtenNoteIds, ["d21", "d22"])
        let dayCalls = await mock.getOrCreateDayNoteCalls
        XCTAssertEqual(dayCalls, ["2026-10-21", "2026-10-22"])
        let writes = await mock.updateNoteContentCalls
        XCTAssertEqual(ShortcutTestSupport.written(writes), ["<p>Monday thought</p>", "<p>Tuesday thought</p>"])
        let left = await queue.hasPending(profileId: "p1")
        XCTAssertFalse(left)
    }

    func testFlushStopsAtAFailureThatMayPassAndKeepsEverything() async throws {
        let queue = makeQueue()
        try await queue.enqueue(day21)
        try await queue.enqueue(day22)
        let mock = await mockWithDayNotes()
        await mock.setDayNoteResult(.failure(URLError(.notConnectedToInternet)), forDay: "2026-10-21")

        let result = await queue.flush(client: mock, profileId: "p1", protectedSessionActive: false)

        XCTAssertEqual(result.stoppedBy, .offline)
        XCTAssertTrue(result.written.isEmpty)
        let dayCalls = await mock.getOrCreateDayNoteCalls
        XCTAssertEqual(dayCalls, ["2026-10-21"], "the later capture waits, so lines stay in order")
        let count = await queue.count(profileId: "p1")
        XCTAssertEqual(count, 2)
    }

    func testACaptureThatCanNeverBeWrittenIsMarkedAndSkipped() async throws {
        let queue = makeQueue()
        try await queue.enqueue(day21)
        try await queue.enqueue(day22)
        let mock = await mockWithDayNotes()
        await mock.setDayNoteResult(.success(NoteIdTitle(noteId: "d21", title: "21", isProtected: false, type: "code")), forDay: "2026-10-21")

        let result = await queue.flush(client: mock, profileId: "p1", protectedSessionActive: false)

        XCTAssertEqual(result.failed[day21.id], .journalNoteNotText)
        XCTAssertEqual(result.written[day22.id]?.noteId, "d22")
        let pending = await queue.pending(profileId: "p1")
        XCTAssertEqual(pending.map(\.id), [day21.id])
        XCTAssertNotNil(pending.first?.lastError)
    }

    func testOtherServersCapturesAreLeftAlone() async throws {
        let queue = makeQueue()
        try await queue.enqueue(ShortcutTestSupport.entry("Elsewhere", profileId: "p2"))
        let mock = await mockWithDayNotes()

        let result = await queue.flush(client: mock, profileId: "p1", protectedSessionActive: false)

        XCTAssertTrue(result.written.isEmpty)
        let otherCount = await queue.count(profileId: "p2")
        XCTAssertEqual(otherCount, 1)
    }

    func testTwoFlushesAtOnceWriteEachCaptureOnce() async throws {
        let queue = makeQueue()
        try await queue.enqueue(day22)
        let mock = await mockWithDayNotes()

        async let first = queue.flush(client: mock, profileId: "p1", protectedSessionActive: false)
        async let second = queue.flush(client: mock, profileId: "p1", protectedSessionActive: false)
        let results = await [first, second]

        XCTAssertEqual(results.map(\.written.count).reduce(0, +), 1)
        let writes = await mock.updateNoteContentCalls
        XCTAssertEqual(writes.count, 1)
    }
}

@MainActor
final class JournalShortcutWriteTests: XCTestCase {
    private var directory: URL!

    override func setUp() async throws {
        directory = FileManager.default.temporaryDirectory.appendingPathComponent("JournalShortcutWriteTests-\(UUID().uuidString)")
    }

    override func tearDown() async throws {
        try? FileManager.default.removeItem(at: directory)
    }

    private func makeQueue() -> JournalCaptureQueue {
        JournalCaptureQueue(fileURL: directory.appendingPathComponent("captures.json"))
    }

    func testAddedCaptureReportsTheNote() async throws {
        let queue = makeQueue()
        let entry = ShortcutTestSupport.entry("Now")
        try await queue.enqueue(entry)
        let mock = MockTriliumClient()
        await mock.setDayNote(NoteIdTitle(noteId: "d22", title: "22 - Thursday", isProtected: false, type: "text"))

        let (outcome, noteIds) = try await JournalShortcut.write(entry, client: mock, protectedSessionActive: false, queue: queue)

        XCTAssertEqual(outcome, .added(noteTitle: "22 - Thursday"))
        XCTAssertEqual(noteIds, ["d22"])
    }

    func testEarlierCapturesGoFirst() async throws {
        let queue = makeQueue()
        let earlier = ShortcutTestSupport.entry("Earlier")
        let now = ShortcutTestSupport.entry("Now")
        try await queue.enqueue(earlier)
        try await queue.enqueue(now)
        let mock = MockTriliumClient()
        await mock.setDayNote(NoteIdTitle(noteId: "d22", title: "22", isProtected: false, type: "text"))

        _ = try await JournalShortcut.write(now, client: mock, protectedSessionActive: false, queue: queue)

        let writes = await mock.updateNoteContentCalls
        XCTAssertEqual(writes.count, 2)
        XCTAssertTrue(ShortcutTestSupport.written(writes).last?.hasSuffix("<p>Now</p>") ?? false)
    }

    func testCaptureThatCanNeverBeWrittenIsThrownAndDropped() async throws {
        let queue = makeQueue()
        let entry = ShortcutTestSupport.entry("Now")
        try await queue.enqueue(entry)
        let mock = MockTriliumClient()
        await mock.setDayNote(NoteIdTitle(noteId: "d22", title: "22", isProtected: false, type: "code"))

        do {
            _ = try await JournalShortcut.write(entry, client: mock, protectedSessionActive: false, queue: queue)
            XCTFail("expected journalNoteNotText")
        } catch {
            XCTAssertEqual(error as? ShortcutError, .journalNoteNotText)
        }
        let left = await queue.hasPending(profileId: "p1")
        XCTAssertFalse(left)
    }

    func testOfflineCaptureStaysOnTheDevice() async throws {
        let queue = makeQueue()
        let entry = ShortcutTestSupport.entry("Now")
        try await queue.enqueue(entry)
        let mock = MockTriliumClient()
        await mock.setDayNoteResult(.failure(APIError.timeout), forDay: entry.isoDay)

        let (outcome, noteIds) = try await JournalShortcut.write(entry, client: mock, protectedSessionActive: false, queue: queue)

        XCTAssertEqual(outcome, .savedOnDevice(.offline))
        XCTAssertTrue(noteIds.isEmpty)
        let pending = await queue.pending(profileId: "p1")
        XCTAssertEqual(pending.map(\.id), [entry.id])
    }

    func testProtectedJournalWaitsForUnlock() async throws {
        let queue = makeQueue()
        let entry = ShortcutTestSupport.entry("Now")
        try await queue.enqueue(entry)
        let mock = MockTriliumClient()
        await mock.setDayNote(NoteIdTitle(noteId: "d22", title: "22", isProtected: true, type: "text"))

        let (outcome, _) = try await JournalShortcut.write(entry, client: mock, protectedSessionActive: false, queue: queue)

        XCTAssertEqual(outcome, .savedOnDevice(.journalNoteProtected))
        let count = await queue.count(profileId: "p1")
        XCTAssertEqual(count, 1)
    }
}
