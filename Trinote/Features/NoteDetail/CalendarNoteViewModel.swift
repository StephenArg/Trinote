import Foundation
import Observation

enum CalendarViewMode: String, CaseIterable {
    case week, month, year
}

struct DayNoteInfo: Sendable {
    let noteId: String
    let title: String
}

@Observable
@MainActor
final class CalendarNoteViewModel {
    let calendarRootId: String

    var currentDate = Date()
    var viewMode: CalendarViewMode = .month
    var dayNoteMap: [String: DayNoteInfo] = [:]
    var isLoading = false
    var isCreating = false
    var error: String?
    var showYearPicker = false
    var pickerYear: Int = Calendar.current.component(.year, from: Date())

    /// Coalesces concurrent `ensureDayNote` calls for the same ISO date (double-taps / racing tasks).
    private var ensureDayNoteTasks: [String: Task<String?, Never>] = [:]

    private let appState: AppState
    private let persistence = PersistenceManager.shared
    private var client: (any TriliumClientProtocol)? { appState.client }
    private var serverProfileId: String? { appState.activeProfile?.id }
    private var isOnline: Bool { appState.isOnline }

    private static let isoFormatter: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "yyyy-MM-dd"
        f.locale = Locale(identifier: "en_US_POSIX")
        f.timeZone = .current
        return f
    }()

    init(calendarRootId: String, appState: AppState) {
        self.calendarRootId = calendarRootId
        self.appState = appState
    }

    // MARK: - Navigation

    func goToToday() {
        currentDate = Date()
    }

    func goToPrevious() {
        let cal = Calendar.current
        switch viewMode {
        case .week:
            currentDate = cal.date(byAdding: .weekOfYear, value: -1, to: currentDate) ?? currentDate
        case .month:
            currentDate = cal.date(byAdding: .month, value: -1, to: currentDate) ?? currentDate
        case .year:
            currentDate = cal.date(byAdding: .year, value: -1, to: currentDate) ?? currentDate
        }
    }

    func goToNext() {
        let cal = Calendar.current
        switch viewMode {
        case .week:
            currentDate = cal.date(byAdding: .weekOfYear, value: 1, to: currentDate) ?? currentDate
        case .month:
            currentDate = cal.date(byAdding: .month, value: 1, to: currentDate) ?? currentDate
        case .year:
            currentDate = cal.date(byAdding: .year, value: 1, to: currentDate) ?? currentDate
        }
    }

    func jumpToYear(_ year: Int) {
        let cal = Calendar.current
        var comps = cal.dateComponents([.month, .day], from: currentDate)
        comps.year = year
        if let d = cal.date(from: comps) {
            currentDate = d
        }
    }

    // MARK: - Title

    var navigationTitle: String {
        let cal = Calendar.current
        let f = DateFormatter()
        f.locale = .current
        switch viewMode {
        case .week:
            let comps = cal.dateComponents([.yearForWeekOfYear, .weekOfYear], from: currentDate)
            f.dateFormat = "MMMM yyyy"
            return f.string(from: currentDate) + " W\(comps.weekOfYear ?? 1)"
        case .month:
            f.dateFormat = "MMMM yyyy"
            return f.string(from: currentDate)
        case .year:
            f.dateFormat = "yyyy"
            return f.string(from: currentDate)
        }
    }

    // MARK: - Loading

    func loadVisibleDayNotes() async {
        isLoading = true
        error = nil
        defer { isLoading = false }

        let cal = Calendar.current

        let yearRange: ClosedRange<Int>
        let monthRange: ClosedRange<Int>

        switch viewMode {
        case .year:
            let year = cal.component(.year, from: currentDate)
            yearRange = year...year
            monthRange = 1...12
        case .month:
            let year = cal.component(.year, from: currentDate)
            let month = cal.component(.month, from: currentDate)
            yearRange = year...year
            monthRange = month...month
        case .week:
            let year = cal.component(.year, from: currentDate)
            let month = cal.component(.month, from: currentDate)
            yearRange = year...year
            monthRange = month...month
        }

        guard isOnline, let apiClient = client else {
            if let profileId = serverProfileId {
                dayNoteMap = Self.buildDayNoteMapFromCache(
                    calendarRootId: calendarRootId,
                    yearRange: yearRange,
                    monthRange: monthRange,
                    profileId: profileId,
                    persistence: persistence
                )
            }
            return
        }

        do {
            var map: [String: DayNoteInfo] = [:]

            for year in yearRange {
                for month in monthRange {
                    let prefix = String(format: "%04d-%02d", year, month)
                    let query = "#dateNote =* \(prefix) note.ancestors.noteId = \(calendarRootId)"
                    let result = try await apiClient.searchNotes(
                        query: query,
                        fastSearch: true,
                        includeArchived: false,
                        ancestorNoteId: calendarRootId,
                        orderBy: nil,
                        orderDirection: nil,
                        limit: 50
                    )
                    for note in result.results {
                        let item = NoteItem(from: note)
                        if let dateVal = item.dateNoteValue, dateVal.count == 10 {
                            map[dateVal] = DayNoteInfo(noteId: item.noteId, title: item.title)
                        }
                    }
                }
            }

            dayNoteMap = map
        } catch {
            self.error = error.localizedDescription
            Log.api.error("Failed to load calendar day notes: \(error)")
            if let profileId = serverProfileId {
                dayNoteMap = Self.buildDayNoteMapFromCache(
                    calendarRootId: calendarRootId,
                    yearRange: yearRange,
                    monthRange: monthRange,
                    profileId: profileId,
                    persistence: persistence
                )
            }
        }
    }

    // MARK: - Day note creation (year -> month -> day chain)

    func ensureDayNote(for date: Date) async -> String? {
        guard appState.isAuthenticated, serverProfileId != nil else { return nil }
        let isoDate = Self.isoFormatter.string(from: date)
        if let existing = dayNoteMap[isoDate] {
            return existing.noteId
        }
        if let inFlight = ensureDayNoteTasks[isoDate] {
            return await inFlight.value
        }
        let task = Task<String?, Never> { @MainActor in
            await self.runEnsureDayNote(for: date, isoDate: isoDate)
        }
        ensureDayNoteTasks[isoDate] = task
        let out = await task.value
        ensureDayNoteTasks[isoDate] = nil
        return out
    }

    private func runEnsureDayNote(for date: Date, isoDate: String) async -> String? {
        if let existing = dayNoteMap[isoDate] {
            return existing.noteId
        }

        if !isOnline, let profileId = serverProfileId {
            return runEnsureDayNoteOffline(date: date, isoDate: isoDate, profileId: profileId)
        }

        guard let client else {
            if let profileId = serverProfileId {
                return runEnsureDayNoteOffline(date: date, isoDate: isoDate, profileId: profileId)
            }
            return nil
        }

        let cal = Calendar.current
        let year = cal.component(.year, from: date)
        let month = cal.component(.month, from: date)
        let day = cal.component(.day, from: date)

        isCreating = true
        defer { isCreating = false }

        do {
            let yearNoteId = try await findOrCreateYearNote(year: year, client: client)
            let monthNoteId = try await findOrCreateMonthNote(year: year, month: month, parentId: yearNoteId, client: client)
            let dayNoteId = try await findOrCreateDayNote(date: date, year: year, month: month, day: day, parentId: monthNoteId, client: client)

            let f = DateFormatter()
            f.dateFormat = "dd - EEEE"
            f.locale = .current
            let dayTitle = f.string(from: date)
            dayNoteMap[isoDate] = DayNoteInfo(noteId: dayNoteId, title: dayTitle)

            return dayNoteId
        } catch {
            self.error = error.localizedDescription
            Log.api.error("Failed to create day note for \(isoDate): \(error)")
            if let profileId = serverProfileId {
                return runEnsureDayNoteOffline(date: date, isoDate: isoDate, profileId: profileId)
            }
            return nil
        }
    }

    // MARK: - Offline day note (SwiftData + pending creation queue)

    private func runEnsureDayNoteOffline(date: Date, isoDate: String, profileId: String) -> String? {
        if let existing = dayNoteMap[isoDate] {
            return existing.noteId
        }

        isCreating = true
        defer { isCreating = false }

        let cal = Calendar.current
        let year = cal.component(.year, from: date)
        let month = cal.component(.month, from: date)
        let day = cal.component(.day, from: date)

        do {
            let yearId = try findOrCreateYearNoteOffline(year: year, profileId: profileId)
            let monthId = try findOrCreateMonthNoteOffline(year: year, month: month, parentYearId: yearId, profileId: profileId)
            let dayId = try findOrCreateDayNoteOffline(date: date, isoDate: isoDate, day: day, parentMonthId: monthId, profileId: profileId)

            let f = DateFormatter()
            f.dateFormat = "dd - EEEE"
            f.locale = .current
            let dayTitle = f.string(from: date)
            dayNoteMap[isoDate] = DayNoteInfo(noteId: dayId, title: dayTitle)

            appState.backgroundSyncPendingChanges()
            NotificationCenter.default.post(
                name: .trinoteTreeShouldRefresh,
                object: nil,
                userInfo: ["noteId": calendarRootId]
            )
            return dayId
        } catch {
            self.error = error.localizedDescription
            Log.api.error("Failed to create offline calendar day note for \(isoDate): \(error)")
            return nil
        }
    }

    private func findOrCreateYearNoteOffline(year: Int, profileId: String) throws -> String {
        let yearStr = String(year)
        if let id = Self.findCachedYearNoteId(
            calendarRootId: calendarRootId, year: year, profileId: profileId, persistence: persistence
        ) {
            return id
        }
        let (noteId, _) = try persistence.createOfflineChildNote(
            parentNoteId: calendarRootId,
            title: yearStr,
            noteType: "text",
            mime: "text/html",
            initialContent: "",
            serverProfileId: profileId,
            initialAttributes: [
                NoteCreationAttribute(type: "label", name: "yearNote", value: yearStr),
                NoteCreationAttribute(type: "label", name: "sorted", value: ""),
            ]
        )
        return noteId
    }

    private func findOrCreateMonthNoteOffline(year: Int, month: Int, parentYearId: String, profileId: String) throws -> String {
        let monthStr = String(format: "%04d-%02d", year, month)
        if let id = Self.findCachedMonthNoteId(
            parentYearId: parentYearId, year: year, month: month, monthStr: monthStr, profileId: profileId, persistence: persistence
        ) {
            return id
        }
        let monthPrefix = String(format: "%02d", month)
        var df = DateFormatter()
        df.locale = .current
        let monthName = df.monthSymbols[month - 1]
        let title = String(format: "%02d - %@", month, monthName)

        let (noteId, _) = try persistence.createOfflineChildNote(
            parentNoteId: parentYearId,
            title: title,
            noteType: "text",
            mime: "text/html",
            initialContent: "",
            serverProfileId: profileId,
            initialAttributes: [
                NoteCreationAttribute(type: "label", name: "monthNote", value: monthStr),
                NoteCreationAttribute(type: "label", name: "sorted", value: ""),
            ]
        )
        return noteId
    }

    private func findOrCreateDayNoteOffline(date: Date, isoDate: String, day: Int, parentMonthId: String, profileId: String) throws -> String {
        let dayPrefix = String(format: "%02d", day)
        if let id = Self.findCachedDayNoteId(
            parentMonthId: parentMonthId, isoDate: isoDate, dayPrefix: dayPrefix, profileId: profileId, persistence: persistence
        ) {
            return id
        }
        var f = DateFormatter()
        f.dateFormat = "dd - EEEE"
        f.locale = .current
        let title = f.string(from: date)

        let (noteId, _) = try persistence.createOfflineChildNote(
            parentNoteId: parentMonthId,
            title: title,
            noteType: "text",
            mime: "text/html",
            initialContent: "",
            serverProfileId: profileId,
            initialAttributes: [
                NoteCreationAttribute(type: "label", name: "dateNote", value: isoDate),
                NoteCreationAttribute(type: "label", name: "sorted", value: ""),
            ]
        )
        return noteId
    }

    private static func findCachedYearNoteId(
        calendarRootId: String, year: Int, profileId: String, persistence: PersistenceManager
    ) -> String? {
        let yearStr = String(year)
        guard let pairs = try? persistence.fetchCachedChildren(parentNoteId: calendarRootId, serverProfileId: profileId) else { return nil }
        for (_, note) in pairs {
            if note.title == yearStr { return note.noteId }
            let attrs = (try? persistence.fetchCachedAttributes(noteId: note.noteId, serverProfileId: profileId)) ?? []
            if attrs.contains(where: { $0.type == "label" && $0.name == "yearNote" && $0.value == yearStr }) {
                return note.noteId
            }
        }
        return nil
    }

    private static func findCachedMonthNoteId(
        parentYearId: String, year: Int, month: Int, monthStr: String, profileId: String, persistence: PersistenceManager
    ) -> String? {
        let monthPrefix = String(format: "%02d", month)
        guard let pairs = try? persistence.fetchCachedChildren(parentNoteId: parentYearId, serverProfileId: profileId) else { return nil }
        for (_, note) in pairs {
            if note.title == monthPrefix || note.title.hasPrefix(monthPrefix + " - ") { return note.noteId }
            let attrs = (try? persistence.fetchCachedAttributes(noteId: note.noteId, serverProfileId: profileId)) ?? []
            if attrs.contains(where: { $0.type == "label" && $0.name == "monthNote" && $0.value == monthStr }) {
                return note.noteId
            }
        }
        return nil
    }

    private static func findCachedDayNoteId(
        parentMonthId: String, isoDate: String, dayPrefix: String, profileId: String, persistence: PersistenceManager
    ) -> String? {
        guard let pairs = try? persistence.fetchCachedChildren(parentNoteId: parentMonthId, serverProfileId: profileId) else { return nil }
        for (_, note) in pairs {
            let attrs = (try? persistence.fetchCachedAttributes(noteId: note.noteId, serverProfileId: profileId)) ?? []
            if attrs.contains(where: { $0.type == "label" && $0.name == "dateNote" && $0.value == isoDate }) {
                return note.noteId
            }
            if note.title == dayPrefix || note.title.hasPrefix(dayPrefix + " - ") {
                return note.noteId
            }
        }
        return nil
    }

    private static func buildDayNoteMapFromCache(
        calendarRootId: String,
        yearRange: ClosedRange<Int>,
        monthRange: ClosedRange<Int>,
        profileId: String,
        persistence: PersistenceManager
    ) -> [String: DayNoteInfo] {
        var map: [String: DayNoteInfo] = [:]
        for year in yearRange {
            guard let yearId = findCachedYearNoteId(calendarRootId: calendarRootId, year: year, profileId: profileId, persistence: persistence)
            else { continue }
            for month in monthRange {
                let monthStr = String(format: "%04d-%02d", year, month)
                guard let monthId = findCachedMonthNoteId(
                    parentYearId: yearId, year: year, month: month, monthStr: monthStr, profileId: profileId, persistence: persistence
                ) else { continue }
                guard let dayPairs = try? persistence.fetchCachedChildren(parentNoteId: monthId, serverProfileId: profileId) else { continue }
                for (_, note) in dayPairs {
                    let attrs = (try? persistence.fetchCachedAttributes(noteId: note.noteId, serverProfileId: profileId)) ?? []
                    guard let dateVal = attrs.first(where: { $0.type == "label" && $0.name == "dateNote" })?.value,
                          dateVal.count == 10
                    else { continue }
                    map[dateVal] = DayNoteInfo(noteId: note.noteId, title: note.title)
                }
            }
        }
        return map
    }

    private func findOrCreateYearNote(year: Int, client: any TriliumClientProtocol) async throws -> String {
        let yearStr = String(year)

        let parent = try await client.getNote(calendarRootId)
        for childId in parent.childNoteIds {
            let child = try await client.getNote(childId)
            let item = NoteItem(from: child)
            if item.yearNoteValue == yearStr || item.title == yearStr {
                return child.noteId
            }
        }

        let request = CreateNoteRequest(
            parentNoteId: calendarRootId,
            title: yearStr,
            type: "text",
            mime: "text/html",
            content: "",
            notePosition: nil,
            prefix: nil,
            isProtected: nil,
            noteId: nil,
            branchId: nil,
            templateNoteId: nil
        )
        let response = try await client.createNote(request)
        let noteId = response.note.noteId
        try await client.createAttribute(CreateAttributeRequest(
            noteId: noteId, type: "label", name: "yearNote", value: yearStr,
            isInheritable: nil, position: nil
        ))
        try await client.createAttribute(CreateAttributeRequest(
            noteId: noteId, type: "label", name: "sorted", value: "",
            isInheritable: nil, position: nil
        ))
        return noteId
    }

    private func findOrCreateMonthNote(year: Int, month: Int, parentId: String, client: any TriliumClientProtocol) async throws -> String {
        let monthStr = String(format: "%04d-%02d", year, month)
        let monthPrefix = String(format: "%02d", month)

        let parent = try await client.getNote(parentId)
        for childId in parent.childNoteIds {
            let child = try await client.getNote(childId)
            let item = NoteItem(from: child)
            if item.monthNoteValue == monthStr
                || item.title.hasPrefix(monthPrefix + " - ")
                || item.title == monthPrefix {
                return child.noteId
            }
        }

        let f = DateFormatter()
        f.locale = .current
        let monthName = f.monthSymbols[month - 1]
        let title = String(format: "%02d - %@", month, monthName)

        let request = CreateNoteRequest(
            parentNoteId: parentId,
            title: title,
            type: "text",
            mime: "text/html",
            content: "",
            notePosition: nil,
            prefix: nil,
            isProtected: nil,
            noteId: nil,
            branchId: nil,
            templateNoteId: nil
        )
        let response = try await client.createNote(request)
        let noteId = response.note.noteId
        try await client.createAttribute(CreateAttributeRequest(
            noteId: noteId, type: "label", name: "monthNote", value: monthStr,
            isInheritable: nil, position: nil
        ))
        try await client.createAttribute(CreateAttributeRequest(
            noteId: noteId, type: "label", name: "sorted", value: "",
            isInheritable: nil, position: nil
        ))
        return noteId
    }

    private func findOrCreateDayNote(date: Date, year: Int, month: Int, day: Int, parentId: String, client: any TriliumClientProtocol) async throws -> String {
        let isoDate = Self.isoFormatter.string(from: date)
        let dayPrefix = String(format: "%02d", day)

        let parent = try await client.getNote(parentId)
        for childId in parent.childNoteIds {
            let child = try await client.getNote(childId)
            let item = NoteItem(from: child)
            if item.dateNoteValue == isoDate
                || item.title.hasPrefix(dayPrefix + " - ")
                || item.title == dayPrefix {
                return child.noteId
            }
        }

        let f = DateFormatter()
        f.dateFormat = "dd - EEEE"
        f.locale = .current
        let title = f.string(from: date)

        let request = CreateNoteRequest(
            parentNoteId: parentId,
            title: title,
            type: "text",
            mime: "text/html",
            content: "",
            notePosition: nil,
            prefix: nil,
            isProtected: nil,
            noteId: nil,
            branchId: nil,
            templateNoteId: nil
        )
        let response = try await client.createNote(request)
        let newId = response.note.noteId
        try await client.createAttribute(CreateAttributeRequest(
            noteId: newId,
            type: "label",
            name: "dateNote",
            value: isoDate,
            isInheritable: nil,
            position: nil
        ))
        try await client.createAttribute(CreateAttributeRequest(
            noteId: newId, type: "label", name: "sorted", value: "",
            isInheritable: nil, position: nil
        ))
        return newId
    }

    // MARK: - Calendar helpers

    static func daysInMonth(for date: Date) -> [Date] {
        let cal = Calendar.current
        guard let range = cal.range(of: .day, in: .month, for: date),
              let firstOfMonth = cal.date(from: cal.dateComponents([.year, .month], from: date))
        else { return [] }
        return range.compactMap { cal.date(byAdding: .day, value: $0 - 1, to: firstOfMonth) }
    }

    static func firstWeekdayOffset(for date: Date) -> Int {
        let cal = Calendar.current
        guard let firstOfMonth = cal.date(from: cal.dateComponents([.year, .month], from: date)) else { return 0 }
        let weekday = cal.component(.weekday, from: firstOfMonth)
        return (weekday - cal.firstWeekday + 7) % 7
    }

    static func weekDates(for date: Date) -> [Date] {
        let cal = Calendar.current
        guard let startOfWeek = cal.dateInterval(of: .weekOfYear, for: date)?.start else { return [] }
        return (0..<7).compactMap { cal.date(byAdding: .day, value: $0, to: startOfWeek) }
    }

    func isoString(for date: Date) -> String {
        Self.isoFormatter.string(from: date)
    }

    func isToday(_ date: Date) -> Bool {
        Calendar.current.isDateInToday(date)
    }
}
