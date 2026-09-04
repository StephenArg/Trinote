import Foundation

/// Notes whose last edit falls on a journal day (`#dateNote` = `yyyy-MM-dd`).
enum JournalDayEditedNotes {
    static let resultLimit = 30

    static func isISODay(_ value: String) -> Bool {
        guard value.count == 10 else { return false }
        let chars = Array(value)
        return chars[4] == "-"
            && chars[7] == "-"
            && chars[0...3].allSatisfy(\.isNumber)
            && chars[5...6].allSatisfy(\.isNumber)
            && chars[8...9].allSatisfy(\.isNumber)
    }

    static func nextISODay(_ dayISO: String) -> String? {
        guard isISODay(dayISO) else { return nil }
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        formatter.dateFormat = "yyyy-MM-dd"
        formatter.isLenient = false
        guard let date = formatter.date(from: dayISO) else { return nil }
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(secondsFromGMT: 0)!
        guard let next = calendar.date(byAdding: .day, value: 1, to: date) else { return nil }
        return formatter.string(from: next)
    }

    static func utcDateModifiedFallsOnDay(_ utcDateModified: String, dayISO: String) -> Bool {
        utcDateModified.hasPrefix(dayISO)
    }

    static func displayList(from notes: [NoteIdTitle], excludingNoteId: String, limit: Int = resultLimit) -> [NoteIdTitle] {
        var seen = Set<String>()
        var out: [NoteIdTitle] = []
        out.reserveCapacity(min(limit, notes.count))
        for note in notes {
            if note.noteId == excludingNoteId { continue }
            if seen.contains(note.noteId) { continue }
            if TriliumSharing.hiddenSystemChildNoteIds.contains(note.noteId) { continue }
            if note.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { continue }
            seen.insert(note.noteId)
            out.append(note)
            if out.count >= limit { break }
        }
        return out
    }
}
