import Foundation

/// "Add to Today's Journal": text added to the end of a journal day note.
enum JournalCapture {
    /// One capture. It is written to the day note of the day it was captured on, even when that happens later
    /// (`JournalCaptureQueue`).
    struct Entry: Codable, Sendable, Identifiable, Equatable {
        let id: UUID
        let text: String
        /// Starts the text with the time it was captured.
        let addTime: Bool
        let capturedAt: Date
        /// The journal day, `yyyy-MM-dd` in the device's time zone when captured.
        let isoDay: String
        let timeZoneIdentifier: String
        /// The server the capture belongs to (`ServerProfile.id`).
        let profileId: String
        /// Why the last attempt to add it failed for good (a non-text day note, a server refusal); nil while it is
        /// only waiting.
        var lastError: String?

        init(
            id: UUID = UUID(),
            text: String,
            addTime: Bool,
            capturedAt: Date = Date(),
            timeZone: TimeZone = .current,
            profileId: String
        ) {
            self.id = id
            self.text = text
            self.addTime = addTime
            self.capturedAt = capturedAt
            self.isoDay = TodaysJournalNote.localISODay(capturedAt, timeZone: timeZone)
            self.timeZoneIdentifier = timeZone.identifier
            self.profileId = profileId
            self.lastError = nil
        }

        var timeZone: TimeZone { TimeZone(identifier: timeZoneIdentifier) ?? .current }
    }

    /// Writes `entry` at the end of its day's journal note (made by the server when it doesn't exist yet) and returns
    /// that note. A protected note is only written while protected notes are unlocked.
    static func append(
        _ entry: Entry,
        client: any TriliumClientProtocol,
        protectedSessionActive: Bool
    ) async throws -> NoteIdTitle {
        let note = try await client.getOrCreateDayNote(onISODay: entry.isoDay)
        if let type = note.type, type != "text" {
            throw ShortcutError.journalNoteNotText
        }
        if note.isProtected, !protectedSessionActive {
            throw ShortcutError.journalNoteProtected
        }
        let data = try await client.getNoteContent(note.noteId)
        let existing = String(data: data, encoding: .utf8) ?? ""
        let html = appendedHTML(existing: existing, entry: entry)
        try await client.updateNoteContent(note.noteId, content: Data(html.utf8), contentType: "text/html")
        return note
    }

    /// The note's HTML with `entry` added as new paragraphs at the end. An empty body (as a new day note has) is
    /// replaced rather than kept as a blank first line.
    static func appendedHTML(existing: String, entry: Entry, locale: Locale = .current) -> String {
        let addition = paragraphsHTML(for: entry, locale: locale)
        let body = existing.trimmingCharacters(in: .whitespacesAndNewlines)
        if isEmptyBody(body) { return addition }
        return body + addition
    }

    /// `entry` as text-note paragraphs: blank lines start a new paragraph, single line breaks stay line breaks.
    static func paragraphsHTML(for entry: Entry, locale: Locale = .current) -> String {
        let text = entry.text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard entry.addTime else { return PlainTextToNoteHTML.convert(text) }
        return PlainTextToNoteHTML.convert("\(timePrefix(entry.capturedAt, timeZone: entry.timeZone, locale: locale)) – \(text)")
    }

    /// The capture time as the locale writes hours and minutes (`14:05`, `2:05 PM`).
    static func timePrefix(_ date: Date, timeZone: TimeZone, locale: Locale) -> String {
        let formatter = DateFormatter()
        formatter.locale = locale
        formatter.timeZone = timeZone
        formatter.setLocalizedDateFormatFromTemplate("jmm")
        return formatter.string(from: date)
    }

    /// Bodies the editor and Trilium leave in an empty text note.
    static func isEmptyBody(_ html: String) -> Bool {
        let compact = html.replacingOccurrences(of: " ", with: "").lowercased()
        return ["", "<p></p>", "<p><br></p>", "<p><br/></p>", "<p>&nbsp;</p>"].contains(compact)
    }
}
