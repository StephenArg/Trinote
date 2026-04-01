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

    private let appState: AppState
    private var client: (any TriliumClientProtocol)? { appState.client }

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
        guard let client else { return }
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

        do {
            var map: [String: DayNoteInfo] = [:]

            for year in yearRange {
                for month in monthRange {
                    let prefix = String(format: "%04d-%02d", year, month)
                    let query = "#dateNote =* \(prefix) note.ancestors.noteId = \(calendarRootId)"
                    let result = try await client.searchNotes(
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
        }
    }

    // MARK: - Day note creation (year -> month -> day chain)

    func ensureDayNote(for date: Date) async -> String? {
        guard let client else { return nil }

        let cal = Calendar.current
        let year = cal.component(.year, from: date)
        let month = cal.component(.month, from: date)
        let day = cal.component(.day, from: date)
        let isoDate = Self.isoFormatter.string(from: date)

        if let existing = dayNoteMap[isoDate] {
            return existing.noteId
        }

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
            return nil
        }
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
            branchId: nil
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
            branchId: nil
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
            branchId: nil
        )
        let response = try await client.createNote(request)
        try await client.createAttribute(CreateAttributeRequest(
            noteId: response.note.noteId,
            type: "label",
            name: "dateNote",
            value: isoDate,
            isInheritable: nil,
            position: nil
        ))
        return response.note.noteId
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
