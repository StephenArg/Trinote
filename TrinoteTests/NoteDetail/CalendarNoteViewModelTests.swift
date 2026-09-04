import XCTest
import SwiftData
@testable import Trinote

@MainActor
final class CalendarNoteViewModelTests: XCTestCase {
    var persistence: PersistenceManager!

    override func setUp() {
        super.setUp()
        let schema = Schema([
            ServerProfile.self,
            CachedNote.self,
            CachedBranch.self,
            CachedAttribute.self,
            RecentNote.self,
            OpenNoteTab.self,
            FavoriteNote.self,
            RecentSearch.self,
            DraftContent.self,
            PendingNoteCreation.self,
            PendingNoteBodyUpload.self,
            PendingBranchMove.self,
            PendingNoteDeletion.self,
            PendingAttachmentImport.self,
            SyncStatus.self,
            CachedImageData.self,
            CacheExcludedRootNote.self,
        ])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try! ModelContainer(for: schema, configurations: [config])
        persistence = PersistenceManager(container: container)
    }

    private func utcGregorianSundayStart() -> Calendar {
        var cal = Calendar(identifier: .gregorian)
        cal.timeZone = TimeZone(secondsFromGMT: 0)!
        cal.firstWeekday = 1
        cal.minimumDaysInFirstWeek = 1
        return cal
    }

    func testVisibleYearMonthsForMonthView() {
        let cal = utcGregorianSundayStart()
        let date = cal.date(from: DateComponents(year: 2026, month: 8, day: 29))!
        let months = CalendarNoteViewModel.visibleYearMonths(for: date, viewMode: .month, calendar: cal)
        XCTAssertEqual(months.count, 1)
        XCTAssertEqual(months[0].year, 2026)
        XCTAssertEqual(months[0].month, 8)
    }

    func testVisibleYearMonthsForWeekSpanningTwoMonths() {
        let cal = utcGregorianSundayStart()
        let date = cal.date(from: DateComponents(year: 2026, month: 9, day: 3))!
        let months = CalendarNoteViewModel.visibleYearMonths(for: date, viewMode: .week, calendar: cal)
        let keys = Set(months.map { $0.year * 100 + $0.month })
        XCTAssertTrue(keys.contains(202_608), "Week of 2026-09-03 includes late August")
        XCTAssertTrue(keys.contains(202_609), "Week of 2026-09-03 includes early September")
    }

    func testVisibleYearMonthsForYearView() {
        let cal = utcGregorianSundayStart()
        let date = cal.date(from: DateComponents(year: 2026, month: 9, day: 3))!
        let months = CalendarNoteViewModel.visibleYearMonths(for: date, viewMode: .year, calendar: cal)
        XCTAssertEqual(months.count, 12)
        XCTAssertEqual(months.map(\.month), Array(1...12))
        XCTAssertTrue(months.allSatisfy { $0.year == 2026 })
    }

    func testIsoDateFromDayNoteTitle() {
        let cal = utcGregorianSundayStart()
        XCTAssertEqual(
            CalendarNoteViewModel.isoDateFromDayNoteTitle("29 - Friday", year: 2026, month: 8, calendar: cal),
            "2026-08-29"
        )
        XCTAssertEqual(
            CalendarNoteViewModel.isoDateFromDayNoteTitle("01 - Saturday", year: 2026, month: 8, calendar: cal),
            "2026-08-01"
        )
        XCTAssertNil(CalendarNoteViewModel.isoDateFromDayNoteTitle("31 - Monday", year: 2026, month: 4, calendar: cal))
        XCTAssertNil(CalendarNoteViewModel.isoDateFromDayNoteTitle("IMG_1234.jpg", year: 2026, month: 8, calendar: cal))
    }

    func testPersistedViewModeFallsBackToMonthAndReadsSavedTab() {
        let suite = "calendarJournalViewMode.tests"
        let defaults = UserDefaults(suiteName: suite)!
        defaults.removePersistentDomain(forName: suite)

        XCTAssertEqual(CalendarNoteViewModel.persistedViewMode(defaults: defaults), .month)

        defaults.set("week", forKey: CalendarNoteViewModel.viewModeStorageKey)
        XCTAssertEqual(CalendarNoteViewModel.persistedViewMode(defaults: defaults), .week)

        defaults.set("year", forKey: CalendarNoteViewModel.viewModeStorageKey)
        XCTAssertEqual(CalendarNoteViewModel.persistedViewMode(defaults: defaults), .year)

        defaults.set("bogus", forKey: CalendarNoteViewModel.viewModeStorageKey)
        XCTAssertEqual(CalendarNoteViewModel.persistedViewMode(defaults: defaults), .month)

        defaults.removePersistentDomain(forName: suite)
    }

    func testInitialViewModeForcesMonthWhenDefaultOpenToMonthTabIsOn() {
        let suite = "calendarJournalInitialViewMode.tests"
        let defaults = UserDefaults(suiteName: suite)!
        defaults.removePersistentDomain(forName: suite)

        defaults.set("week", forKey: CalendarNoteViewModel.viewModeStorageKey)
        XCTAssertEqual(CalendarNoteViewModel.initialViewMode(defaults: defaults), .week)

        defaults.set(true, forKey: CalendarJournalSettings.defaultOpenToMonthTab)
        XCTAssertEqual(CalendarNoteViewModel.initialViewMode(defaults: defaults), .month)

        defaults.set("year", forKey: CalendarNoteViewModel.viewModeStorageKey)
        XCTAssertEqual(CalendarNoteViewModel.initialViewMode(defaults: defaults), .month)

        defaults.set(false, forKey: CalendarJournalSettings.defaultOpenToMonthTab)
        XCTAssertEqual(CalendarNoteViewModel.initialViewMode(defaults: defaults), .year)

        defaults.removePersistentDomain(forName: suite)
    }

    private func gregorianCalendar(firstWeekday: Int) -> Calendar {
        var cal = Calendar(identifier: .gregorian)
        cal.timeZone = TimeZone(secondsFromGMT: 0)!
        cal.locale = Locale(identifier: "en_US")
        cal.firstWeekday = firstWeekday
        cal.minimumDaysInFirstWeek = 1
        return cal
    }

    func testHideWeekendsFiltersWeekToFiveDaysForSundayAndMondayStart() {
        let wednesday = DateComponents(calendar: Calendar(identifier: .gregorian), timeZone: TimeZone(secondsFromGMT: 0), year: 2026, month: 9, day: 2).date!

        let sundayStart = gregorianCalendar(firstWeekday: 1)
        let sundayWeek = CalendarNoteViewModel.weekDates(for: wednesday, hideWeekends: true, calendar: sundayStart)
        XCTAssertEqual(sundayWeek.count, 5)
        XCTAssertTrue(sundayWeek.allSatisfy { !sundayStart.isDateInWeekend($0) })

        let mondayStart = gregorianCalendar(firstWeekday: 2)
        let mondayWeek = CalendarNoteViewModel.weekDates(for: wednesday, hideWeekends: true, calendar: mondayStart)
        XCTAssertEqual(mondayWeek.count, 5)
        XCTAssertTrue(mondayWeek.allSatisfy { !mondayStart.isDateInWeekend($0) })

        XCTAssertEqual(CalendarNoteViewModel.weekDates(for: wednesday, hideWeekends: false, calendar: sundayStart).count, 7)
    }

    func testHideWeekendsMonthGridSundayAndMondayStart() {
        let august = DateComponents(calendar: Calendar(identifier: .gregorian), timeZone: TimeZone(secondsFromGMT: 0), year: 2026, month: 8, day: 1).date!
        let september = DateComponents(calendar: Calendar(identifier: .gregorian), timeZone: TimeZone(secondsFromGMT: 0), year: 2026, month: 9, day: 1).date!

        let sundayStart = gregorianCalendar(firstWeekday: 1)
        XCTAssertTrue(sundayStart.isDateInWeekend(august), "2026-08-01 is Saturday")
        XCTAssertEqual(CalendarNoteViewModel.firstWeekdayOffset(for: august, hideWeekends: true, calendar: sundayStart), 0)
        XCTAssertEqual(CalendarNoteViewModel.visibleMonthDates(for: august, hideWeekends: true, calendar: sundayStart).count, 21)
        XCTAssertEqual(CalendarNoteViewModel.weekdayHeaderSymbols(hideWeekends: true, calendar: sundayStart), ["M", "Tu", "W", "Th", "F"])
        XCTAssertEqual(CalendarNoteViewModel.firstWeekdayOffset(for: september, hideWeekends: true, calendar: sundayStart), 1)
        XCTAssertEqual(CalendarNoteViewModel.firstWeekdayOffset(for: september, hideWeekends: false, calendar: sundayStart), 2)

        let mondayStart = gregorianCalendar(firstWeekday: 2)
        XCTAssertEqual(CalendarNoteViewModel.firstWeekdayOffset(for: august, hideWeekends: true, calendar: mondayStart), 0)
        XCTAssertEqual(CalendarNoteViewModel.visibleMonthDates(for: august, hideWeekends: true, calendar: mondayStart).count, 21)
        XCTAssertEqual(CalendarNoteViewModel.weekdayHeaderSymbols(hideWeekends: true, calendar: mondayStart), ["M", "Tu", "W", "Th", "F"])
        XCTAssertEqual(CalendarNoteViewModel.firstWeekdayOffset(for: september, hideWeekends: true, calendar: mondayStart), 1)
        XCTAssertEqual(CalendarNoteViewModel.weekdayColumnCount(hideWeekends: true, calendar: mondayStart), 5)
    }

    func testOverlayKeepsCacheOnlyDaysAndPrefersServerIds() {
        let cache: [String: DayNoteInfo] = [
            "2026-08-28": DayNoteInfo(noteId: "local-28", title: "28 - Friday"),
            "2026-08-29": DayNoteInfo(noteId: "stale-29", title: "old title"),
        ]
        let merged = CalendarNoteViewModel.overlayServerDayNotes(
            cache: cache,
            dateToNoteId: [
                "2026-08-29": "server-29",
                "2026-08-30": "server-30",
                "not-a-date": "x",
            ],
            titlesByNoteId: ["server-29": "29 - Saturday"]
        )
        XCTAssertEqual(merged["2026-08-28"]?.noteId, "local-28")
        XCTAssertEqual(merged["2026-08-29"]?.noteId, "server-29")
        XCTAssertEqual(merged["2026-08-29"]?.title, "29 - Saturday")
        XCTAssertEqual(merged["2026-08-30"]?.noteId, "server-30")
        XCTAssertNil(merged["not-a-date"])
    }

    func testOverlayPreservesChildrenWhenDayNoteIdMatches() {
        let children = [DayNoteInfo(noteId: "c1", title: "Meeting notes")]
        let cache: [String: DayNoteInfo] = [
            "2026-08-29": DayNoteInfo(noteId: "day29", title: "29 - Saturday", childNotes: children),
        ]
        let merged = CalendarNoteViewModel.overlayServerDayNotes(
            cache: cache,
            dateToNoteId: ["2026-08-29": "day29"],
            titlesByNoteId: ["day29": "29 - Saturday"]
        )
        XCTAssertEqual(merged["2026-08-29"]?.childNotes, children)

        let replaced = CalendarNoteViewModel.overlayServerDayNotes(
            cache: cache,
            dateToNoteId: ["2026-08-29": "other-day"],
            titlesByNoteId: ["other-day": "29 - Saturday"]
        )
        XCTAssertEqual(replaced["2026-08-29"]?.childNotes, [])
    }

    func testAttachCachedChildrenIncludesDirectChildren() throws {
        let profile = "p1"
        try insertChild(id: "year", title: "2026", parent: "journal", profile: profile)
        try insertChild(id: "month", title: "08 - August", parent: "year", profile: profile)
        try insertChild(id: "day29", title: "29 - Saturday", parent: "month", profile: profile, dateNote: "2026-08-29")
        try insertChild(id: "meeting", title: "Team standup recap", parent: "day29", profile: profile)
        try insertChild(id: "photo", title: "Walk by the river", parent: "day29", profile: profile)
        try persistence.commitBatch()

        let days = CalendarNoteViewModel.buildDayNoteMapFromCache(
            calendarRootId: "journal",
            months: [(year: 2026, month: 8)],
            profileId: profile,
            persistence: persistence
        )
        let withChildren = CalendarNoteViewModel.attachCachedChildren(
            to: days,
            profileId: profile,
            persistence: persistence
        )
        let childTitles = withChildren["2026-08-29"]?.childNotes.map(\.title) ?? []
        XCTAssertEqual(Set(childTitles), ["Team standup recap", "Walk by the river"])
    }

    func testChildNotesByParentUsesTreeOrderAndTitles() {
        let tree = TreeLoadResponse(
            notes: [
                TreeLoadNoteRow(
                    noteId: "c2", title: "Second", isProtected: false, type: "text",
                    mime: "text/html", blobId: nil, isDeleted: false
                ),
            ],
            branches: [
                TreeLoadBranchRow(
                    branchId: "b2", noteId: "c2", parentNoteId: "day29", prefix: nil,
                    notePosition: 20, isExpanded: false, isDeleted: false
                ),
                TreeLoadBranchRow(
                    branchId: "b1", noteId: "c1", parentNoteId: "day29", prefix: nil,
                    notePosition: 10, isExpanded: false, isDeleted: false
                ),
                TreeLoadBranchRow(
                    branchId: "gone", noteId: "cx", parentNoteId: "day29", prefix: nil,
                    notePosition: 5, isExpanded: false, isDeleted: true
                ),
            ],
            attributes: []
        )
        let byParent = CalendarNoteViewModel.childNotesByParent(
            from: tree,
            parentNoteIds: ["day29"],
            titlesByNoteId: ["c1": "First"]
        )
        XCTAssertEqual(byParent["day29"]?.map(\.noteId), ["c1", "c2"])
        XCTAssertEqual(byParent["day29"]?.map(\.title), ["First", "Second"])
    }

    func testBuildDayNoteMapFromCacheUsesDateNoteAndTitleFallback() throws {
        let profile = "p1"
        try insertChild(id: "year", title: "2026", parent: "journal", profile: profile)
        try insertChild(id: "month", title: "08 - August", parent: "year", profile: profile)
        try insertChild(
            id: "day27",
            title: "27 - Thursday",
            parent: "month",
            profile: profile,
            dateNote: "2026-08-27"
        )
        try insertChild(id: "day29", title: "29 - Saturday", parent: "month", profile: profile)
        try insertChild(id: "photo", title: "IMG_1234.jpg", parent: "month", profile: profile)
        try persistence.commitBatch()

        let map = CalendarNoteViewModel.buildDayNoteMapFromCache(
            calendarRootId: "journal",
            months: [(year: 2026, month: 8)],
            profileId: profile,
            persistence: persistence
        )
        XCTAssertEqual(map["2026-08-27"]?.noteId, "day27")
        XCTAssertEqual(map["2026-08-29"]?.noteId, "day29")
        XCTAssertNil(map.values.first(where: { $0.noteId == "photo" }))
        XCTAssertEqual(map.count, 2)
    }

    private func insertChild(
        id: String,
        title: String,
        parent: String,
        profile: String,
        dateNote: String? = nil
    ) throws {
        if try persistence.fetchCachedNote(id: parent, serverProfileId: profile) == nil {
            try persistence.cacheNote(
                from: TestFixtures.noteResponse(id: parent, title: parent, parentNoteIds: []),
                serverProfileId: profile
            )
        }
        try persistence.cacheNote(
            from: TestFixtures.noteResponse(id: id, title: title, parentNoteIds: [parent]),
            serverProfileId: profile
        )
        try persistence.cacheBranch(
            from: TestFixtures.branchResponse(branchId: "br-\(id)", noteId: id, parentNoteId: parent),
            serverProfileId: profile
        )
        if let dateNote {
            try persistence.cacheAttributeBatch(
                from: TestFixtures.attributeResponse(
                    attributeId: "attr-\(id)",
                    noteId: id,
                    name: "dateNote",
                    value: dateNote
                ),
                serverProfileId: profile
            )
        }
    }
}
