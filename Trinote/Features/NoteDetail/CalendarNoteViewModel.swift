import Foundation
import Observation

enum CalendarViewMode: String, CaseIterable {
    case week, month, year
}

struct DayNoteInfo: Sendable, Equatable, Identifiable {
    let noteId: String
    let title: String
    let childNotes: [DayNoteInfo]

    var id: String { noteId }

    init(noteId: String, title: String, childNotes: [DayNoteInfo] = []) {
        self.noteId = noteId
        self.title = title
        self.childNotes = childNotes
    }
}

@Observable
@MainActor
final class CalendarNoteViewModel {
    let calendarRootId: String

    var currentDate = Date()
    var viewMode: CalendarViewMode = .month {
        didSet { UserDefaults.standard.set(viewMode.rawValue, forKey: Self.viewModeStorageKey) }
    }
    var dayNoteMap: [String: DayNoteInfo] = [:]
    var isLoading = false
    var isCreating = false
    var error: String?
    var showYearPicker = false
    var pickerYear: Int = Calendar.current.component(.year, from: Date())

    /// Coalesces concurrent `ensureDayNote` calls for the same ISO date (double-taps / racing tasks).
    private var ensureDayNoteTasks: [String: Task<String?, Never>] = [:]

    static let viewModeStorageKey = "calendarJournalViewMode"

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

    init(calendarRootId: String, appState: AppState, defaults: UserDefaults = .standard) {
        self.calendarRootId = calendarRootId
        self.appState = appState
        self.viewMode = Self.initialViewMode(defaults: defaults)
    }

    /// When “Default open to month tab” is on, always start on Month. Otherwise restore the last Week/Month/Year tab.
    /// Init does not write `viewMode` to disk (`didSet` is skipped), so a forced Month does not overwrite the last tab.
    static func initialViewMode(defaults: UserDefaults = .standard) -> CalendarViewMode {
        if defaults.bool(forKey: CalendarJournalSettings.defaultOpenToMonthTab) {
            return .month
        }
        return persistedViewMode(defaults: defaults)
    }

    static func persistedViewMode(defaults: UserDefaults = .standard) -> CalendarViewMode {
        guard let raw = defaults.string(forKey: viewModeStorageKey),
              let mode = CalendarViewMode(rawValue: raw)
        else { return .month }
        return mode
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
        error = nil
        let months = Self.visibleYearMonths(for: currentDate, viewMode: viewMode)

        var cacheMap: [String: DayNoteInfo] = [:]
        if let profileId = serverProfileId {
            cacheMap = Self.buildDayNoteMapFromCache(
                calendarRootId: calendarRootId,
                months: months,
                profileId: profileId,
                persistence: persistence
            )
        }
        if viewMode == .week, let profileId = serverProfileId {
            cacheMap = Self.attachCachedChildren(
                to: cacheMap,
                profileId: profileId,
                persistence: persistence
            )
        }
        dayNoteMap = cacheMap

        guard isOnline, let apiClient = client else { return }

        isLoading = true
        defer { isLoading = false }

        var dateToNoteId: [String: String] = [:]
        var fetchFailed = false
        await withTaskGroup(of: Result<[String: String], Error>.self) { group in
            for (year, month) in months {
                let monthKey = String(format: "%04d-%02d", year, month)
                let rootId = calendarRootId
                group.addTask {
                    do {
                        return .success(try await apiClient.getDayNotesForMonth(month: monthKey, calendarRootId: rootId))
                    } catch {
                        return .failure(error)
                    }
                }
            }
            for await result in group {
                switch result {
                case .success(let ids):
                    for (date, noteId) in ids {
                        dateToNoteId[date] = noteId
                    }
                case .failure(let error):
                    fetchFailed = true
                    Log.api.error("Failed to load calendar day notes: \(error)")
                }
            }
        }

        if Task.isCancelled { return }

        if dateToNoteId.isEmpty && fetchFailed { return }

        var titlesByNoteId: [String: String] = [:]
        if let profileId = serverProfileId {
            for noteId in Set(dateToNoteId.values) {
                if let title = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId)?.title,
                   !title.isEmpty {
                    titlesByNoteId[noteId] = title
                }
            }
        }
        let missingTitleIds = Set(dateToNoteId.values).subtracting(titlesByNoteId.keys)
        if !missingTitleIds.isEmpty {
            if let tree = try? await apiClient.batchTreeLoad(noteIds: Array(missingTitleIds)) {
                for row in tree.notes where !row.title.isEmpty {
                    titlesByNoteId[row.noteId] = row.title
                }
            }
        }

        if Task.isCancelled { return }

        var map = Self.overlayServerDayNotes(
            cache: cacheMap,
            dateToNoteId: dateToNoteId,
            titlesByNoteId: titlesByNoteId
        )
        if viewMode == .week {
            map = await attachChildNotes(to: map, client: apiClient)
        }
        if Task.isCancelled { return }
        dayNoteMap = map
    }

    /// Year/month pairs that must be loaded for the current view (week may span two months).
    static func visibleYearMonths(
        for date: Date,
        viewMode: CalendarViewMode,
        calendar: Calendar = .current
    ) -> [(year: Int, month: Int)] {
        switch viewMode {
        case .year:
            let year = calendar.component(.year, from: date)
            return (1...12).map { (year, $0) }
        case .month:
            return [(calendar.component(.year, from: date), calendar.component(.month, from: date))]
        case .week:
            var seen = Set<Int>()
            var out: [(year: Int, month: Int)] = []
            for day in weekDates(for: date, calendar: calendar) {
                let year = calendar.component(.year, from: day)
                let month = calendar.component(.month, from: day)
                let key = year * 100 + month
                if seen.insert(key).inserted {
                    out.append((year, month))
                }
            }
            return out
        }
    }

    /// Server `#dateNote` map overlaid on the cache map. Cache-only days (title fallback / pending create) are kept.
    static func overlayServerDayNotes(
        cache: [String: DayNoteInfo],
        dateToNoteId: [String: String],
        titlesByNoteId: [String: String]
    ) -> [String: DayNoteInfo] {
        var map = cache
        for (date, noteId) in dateToNoteId {
            guard isoFormatter.date(from: date) != nil else { continue }
            let title = titlesByNoteId[noteId]
                ?? cache[date]?.title
                ?? displayTitle(forISODate: date)
            let children = cache[date]?.noteId == noteId ? (cache[date]?.childNotes ?? []) : []
            map[date] = DayNoteInfo(noteId: noteId, title: title, childNotes: children)
        }
        return map
    }

    static func displayTitle(forISODate iso: String) -> String {
        guard let date = isoFormatter.date(from: iso) else { return iso }
        let f = DateFormatter()
        f.dateFormat = "dd - EEEE"
        f.locale = .current
        return f.string(from: date)
    }

    /// `"29 - Friday"` / `"29"` under a known year-month → `yyyy-MM-dd`, or nil if not a day title.
    static func isoDateFromDayNoteTitle(
        _ title: String,
        year: Int,
        month: Int,
        calendar: Calendar = .current
    ) -> String? {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)
        let prefix: String
        if let dash = trimmed.firstIndex(of: "-") {
            prefix = trimmed[..<dash].trimmingCharacters(in: .whitespaces)
        } else {
            prefix = trimmed
        }
        guard let day = Int(prefix), (1...31).contains(day) else { return nil }
        var comps = DateComponents()
        comps.year = year
        comps.month = month
        comps.day = day
        guard let date = calendar.date(from: comps),
              calendar.component(.year, from: date) == year,
              calendar.component(.month, from: date) == month,
              calendar.component(.day, from: date) == day
        else { return nil }
        return String(format: "%04d-%02d-%02d", year, month, day)
    }

    /// Day journal note followed by its direct children (week agenda cards).
    func notesOnDay(_ date: Date) -> [DayNoteInfo] {
        guard let info = dayNoteMap[isoString(for: date)] else { return [] }
        return [DayNoteInfo(noteId: info.noteId, title: info.title)] + info.childNotes
    }

    static func attachCachedChildren(
        to map: [String: DayNoteInfo],
        profileId: String,
        persistence: PersistenceManager
    ) -> [String: DayNoteInfo] {
        var next = map
        for (date, info) in map {
            next[date] = DayNoteInfo(
                noteId: info.noteId,
                title: info.title,
                childNotes: cachedChildNotes(parentNoteId: info.noteId, profileId: profileId, persistence: persistence)
            )
        }
        return next
    }

    static func cachedChildNotes(
        parentNoteId: String,
        profileId: String,
        persistence: PersistenceManager
    ) -> [DayNoteInfo] {
        guard let pairs = try? persistence.fetchCachedChildren(parentNoteId: parentNoteId, serverProfileId: profileId) else {
            return []
        }
        return pairs.map { DayNoteInfo(noteId: $0.1.noteId, title: $0.1.title) }
    }

    /// Direct children of loaded day notes from `tree/load` (cache titles first, then the tree payload).
    static func childNotesByParent(
        from tree: TreeLoadResponse,
        parentNoteIds: Set<String>,
        titlesByNoteId: [String: String]
    ) -> [String: [DayNoteInfo]] {
        var childrenByParent: [String: [(position: Int, noteId: String)]] = [:]
        for branch in tree.branches {
            guard parentNoteIds.contains(branch.parentNoteId), branch.isDeleted != true else { continue }
            childrenByParent[branch.parentNoteId, default: []].append((branch.notePosition, branch.noteId))
        }
        var titles = titlesByNoteId
        for row in tree.notes where row.isDeleted != true && !row.title.isEmpty {
            titles[row.noteId] = row.title
        }
        var result: [String: [DayNoteInfo]] = [:]
        for (parentId, rows) in childrenByParent {
            let ordered = rows.sorted { $0.position < $1.position }
            result[parentId] = ordered.map { row in
                DayNoteInfo(noteId: row.noteId, title: titles[row.noteId] ?? row.noteId)
            }
        }
        return result
    }

    private func attachChildNotes(
        to map: [String: DayNoteInfo],
        client: any TriliumClientProtocol
    ) async -> [String: DayNoteInfo] {
        var next = map
        if let profileId = serverProfileId {
            next = Self.attachCachedChildren(to: next, profileId: profileId, persistence: persistence)
        }

        let parentIds = Array(Set(next.values.map(\.noteId)))
        guard !parentIds.isEmpty else { return next }

        guard let tree = try? await client.batchTreeLoad(noteIds: parentIds) else { return next }

        var titlesByNoteId: [String: String] = [:]
        if let profileId = serverProfileId {
            let childIds = tree.branches
                .filter { parentIds.contains($0.parentNoteId) && $0.isDeleted != true }
                .map(\.noteId)
            for noteId in Set(childIds) {
                if let title = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId)?.title,
                   !title.isEmpty {
                    titlesByNoteId[noteId] = title
                }
            }
        }

        let missing = Set(
            tree.branches
                .filter { parentIds.contains($0.parentNoteId) && $0.isDeleted != true }
                .map(\.noteId)
        ).subtracting(titlesByNoteId.keys).subtracting(Set(tree.notes.map(\.noteId)))

        var combinedTree = tree
        if !missing.isEmpty, let extra = try? await client.batchTreeLoad(noteIds: Array(missing)) {
            combinedTree = TreeLoadResponse(
                notes: tree.notes + extra.notes,
                branches: tree.branches + extra.branches,
                attributes: tree.attributes + extra.attributes
            )
        }

        let childrenByParent = Self.childNotesByParent(
            from: combinedTree,
            parentNoteIds: Set(parentIds),
            titlesByNoteId: titlesByNoteId
        )
        for (date, info) in next {
            if let children = childrenByParent[info.noteId] {
                next[date] = DayNoteInfo(noteId: info.noteId, title: info.title, childNotes: children)
            }
        }
        return next
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

        guard let profileId = serverProfileId else { return nil }
        return runEnsureDayNoteOffline(date: date, isoDate: isoDate, profileId: profileId)
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

    static func buildDayNoteMapFromCache(
        calendarRootId: String,
        months: [(year: Int, month: Int)],
        profileId: String,
        persistence: PersistenceManager
    ) -> [String: DayNoteInfo] {
        var map: [String: DayNoteInfo] = [:]
        for (year, month) in months {
            guard let yearId = findCachedYearNoteId(calendarRootId: calendarRootId, year: year, profileId: profileId, persistence: persistence)
            else { continue }
            let monthStr = String(format: "%04d-%02d", year, month)
            guard let monthId = findCachedMonthNoteId(
                parentYearId: yearId, year: year, month: month, monthStr: monthStr, profileId: profileId, persistence: persistence
            ) else { continue }
            guard let dayPairs = try? persistence.fetchCachedChildren(parentNoteId: monthId, serverProfileId: profileId) else { continue }
            for (_, note) in dayPairs {
                let attrs = (try? persistence.fetchCachedAttributes(noteId: note.noteId, serverProfileId: profileId)) ?? []
                if let dateVal = attrs.first(where: { $0.type == "label" && $0.name == "dateNote" })?.value,
                   isoFormatter.date(from: dateVal) != nil {
                    map[dateVal] = DayNoteInfo(noteId: note.noteId, title: note.title)
                    continue
                }
                if let iso = isoDateFromDayNoteTitle(note.title, year: year, month: month) {
                    map[iso] = DayNoteInfo(noteId: note.noteId, title: note.title)
                }
            }
        }
        return map
    }

    // MARK: - Calendar helpers

    /// Compact English weekday labels indexed by `Calendar` weekday (Sunday = 1).
    private static let compactWeekdaySymbolsSundayFirst = ["Su", "M", "Tu", "W", "Th", "F", "Sa"]

    static func daysInMonth(for date: Date, calendar: Calendar = .current) -> [Date] {
        guard let range = calendar.range(of: .day, in: .month, for: date),
              let firstOfMonth = calendar.date(from: calendar.dateComponents([.year, .month], from: date))
        else { return [] }
        return range.compactMap { calendar.date(byAdding: .day, value: $0 - 1, to: firstOfMonth) }
    }

    static func visibleMonthDates(for date: Date, hideWeekends: Bool, calendar: Calendar = .current) -> [Date] {
        let days = daysInMonth(for: date, calendar: calendar)
        guard hideWeekends else { return days }
        return days.filter { !calendar.isDateInWeekend($0) }
    }

    static func isWeekendWeekday(_ weekday: Int, calendar: Calendar) -> Bool {
        let now = Date()
        let current = calendar.component(.weekday, from: now)
        guard let date = calendar.date(byAdding: .day, value: weekday - current, to: now) else { return false }
        return calendar.isDateInWeekend(date)
    }

    /// Weekday numbers (1–7) in header order, optionally omitting weekend weekdays.
    static func visibleWeekdays(hideWeekends: Bool, calendar: Calendar = .current) -> [Int] {
        let first = calendar.firstWeekday
        let ordered = (0..<7).map { (first - 1 + $0) % 7 + 1 }
        if !hideWeekends { return ordered }
        return ordered.filter { !isWeekendWeekday($0, calendar: calendar) }
    }

    static func weekdayColumnCount(hideWeekends: Bool, calendar: Calendar = .current) -> Int {
        visibleWeekdays(hideWeekends: hideWeekends, calendar: calendar).count
    }

    static func weekdayHeaderSymbols(hideWeekends: Bool, calendar: Calendar = .current) -> [String] {
        visibleWeekdays(hideWeekends: hideWeekends, calendar: calendar).map { weekday in
            compactWeekdaySymbolsSundayFirst[weekday - 1]
        }
    }

    static func firstWeekdayOffset(for date: Date, hideWeekends: Bool = false, calendar: Calendar = .current) -> Int {
        guard let firstOfMonth = calendar.date(from: calendar.dateComponents([.year, .month], from: date)) else { return 0 }
        if !hideWeekends {
            let weekday = calendar.component(.weekday, from: firstOfMonth)
            return (weekday - calendar.firstWeekday + 7) % 7
        }
        let days = daysInMonth(for: date, calendar: calendar)
        guard let firstVisible = days.first(where: { !calendar.isDateInWeekend($0) }) else { return 0 }
        let weekday = calendar.component(.weekday, from: firstVisible)
        return visibleWeekdays(hideWeekends: true, calendar: calendar).firstIndex(of: weekday) ?? 0
    }

    static func weekDates(for date: Date, hideWeekends: Bool = false, calendar: Calendar = .current) -> [Date] {
        guard let startOfWeek = calendar.dateInterval(of: .weekOfYear, for: date)?.start else { return [] }
        let all = (0..<7).compactMap { calendar.date(byAdding: .day, value: $0, to: startOfWeek) }
        if hideWeekends {
            return all.filter { !calendar.isDateInWeekend($0) }
        }
        return all
    }

    func isoString(for date: Date) -> String {
        Self.isoFormatter.string(from: date)
    }

    func isToday(_ date: Date) -> Bool {
        Calendar.current.isDateInToday(date)
    }
}
