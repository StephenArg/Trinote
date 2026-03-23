import Foundation
import SwiftUI

// MARK: - Notification Names

extension Notification.Name {
    /// Posted when a note is deleted so the tree and other views can refresh.
    static let noteDeleted = Notification.Name("NoteDeleted")
    /// Posted when a ghost note is detected (content blob missing on server).
    /// `userInfo["noteId"]` contains the note ID.
    static let ghostNoteDetected = Notification.Name("GhostNoteDetected")
}

/// Thread-safe tracker for "ghost notes" — notes the server still lists in its
/// tree but that should stay hidden (client delete before sync catches up,
/// sync deletion, missing blob / 500, etc.).
/// IDs are **persisted per `serverProfileId`** in `UserDefaults` so they survive
/// app restarts. After a **full tree walk**, entries for notes no longer on the
/// server are pruned via `retainOnlyNotesStillOnServer`.
final class GhostNoteTracker: @unchecked Sendable {
    static let shared = GhostNoteTracker()

    private let lock = NSLock()
    /// In-memory cache per profile (lazy-filled from disk).
    private var memory: [String: Set<String>] = [:]

    private static func storageKey(serverProfileId: String) -> String {
        "Trinote.GhostNoteIds." + serverProfileId
    }

    private static func readDisk(_ serverProfileId: String) -> Set<String> {
        let arr = UserDefaults.standard.stringArray(forKey: storageKey(serverProfileId: serverProfileId)) ?? []
        return Set(arr)
    }

    private static func writeDisk(_ serverProfileId: String, _ ids: Set<String>) {
        let key = storageKey(serverProfileId: serverProfileId)
        if ids.isEmpty {
            UserDefaults.standard.removeObject(forKey: key)
        } else {
            UserDefaults.standard.set(Array(ids).sorted(), forKey: key)
        }
    }

    private func workingSet(for serverProfileId: String) -> Set<String> {
        if let m = memory[serverProfileId] { return m }
        let d = Self.readDisk(serverProfileId)
        memory[serverProfileId] = d
        return d
    }

    func add(_ noteId: String, serverProfileId: String) {
        lock.lock()
        var s = workingSet(for: serverProfileId)
        s.insert(noteId)
        memory[serverProfileId] = s
        Self.writeDisk(serverProfileId, s)
        lock.unlock()
    }

    func contains(_ noteId: String, serverProfileId: String) -> Bool {
        lock.lock()
        defer { lock.unlock() }
        return workingSet(for: serverProfileId).contains(noteId)
    }

    func all(serverProfileId: String) -> Set<String> {
        lock.lock()
        defer { lock.unlock() }
        return workingSet(for: serverProfileId)
    }

    /// After a full sync tree walk, drop ghost IDs that no longer exist on the
    /// server (cleanup). Keeps entries for notes still on the server but hidden
    /// (client delete pending replication, blob missing, etc.).
    func retainOnlyNotesStillOnServer(_ noteIdsOnServer: Set<String>, serverProfileId: String) {
        lock.lock()
        var s = workingSet(for: serverProfileId)
        s = s.intersection(noteIdsOnServer)
        memory[serverProfileId] = s
        Self.writeDisk(serverProfileId, s)
        lock.unlock()
    }

    /// Clears persisted + in-memory ghosts for this profile (debug / sign-out).
    func clear(serverProfileId: String) {
        lock.lock()
        memory.removeValue(forKey: serverProfileId)
        Self.writeDisk(serverProfileId, [])
        lock.unlock()
    }
}

// MARK: - String

extension String {
    var nilIfEmpty: String? {
        isEmpty ? nil : self
    }

    func truncated(to length: Int, trailing: String = "…") -> String {
        if count <= length { return self }
        return String(prefix(length)) + trailing
    }
}

// MARK: - Date Formatting (cached formatters)

private let _isoFormatterWithFractional: ISO8601DateFormatter = {
    let f = ISO8601DateFormatter()
    f.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return f
}()

private let _isoFormatterPlain: ISO8601DateFormatter = {
    let f = ISO8601DateFormatter()
    f.formatOptions = [.withInternetDateTime]
    return f
}()

private let _triliumLocalFormatter: DateFormatter = {
    let f = DateFormatter()
    f.dateFormat = "yyyy-MM-dd HH:mm:ss.SSSZ"
    f.locale = Locale(identifier: "en_US_POSIX")
    return f
}()

private let _triliumLocalFormatterShort: DateFormatter = {
    let f = DateFormatter()
    f.dateFormat = "yyyy-MM-dd HH:mm:ss"
    f.locale = Locale(identifier: "en_US_POSIX")
    f.timeZone = .current
    return f
}()

private let _relativeFormatter: RelativeDateTimeFormatter = {
    let f = RelativeDateTimeFormatter()
    f.unitsStyle = .abbreviated
    return f
}()

extension String {
    /// Parse Trilium's date format (UTC ISO-8601 or local "yyyy-MM-dd HH:mm:ss") to Date
    func triliumDate() -> Date? {
        if let d = _isoFormatterWithFractional.date(from: self) { return d }
        if let d = _isoFormatterPlain.date(from: self) { return d }
        if let d = _triliumLocalFormatter.date(from: self) { return d }
        if let d = _triliumLocalFormatterShort.date(from: self) { return d }
        return nil
    }
}

extension Date {
    var relativeDisplay: String {
        _relativeFormatter.localizedString(for: self, relativeTo: .now)
    }

    var shortDisplay: String {
        let f = DateFormatter()
        f.dateStyle = .short
        f.timeStyle = .short
        return f.string(from: self)
    }
}

// MARK: - View

extension View {
    @ViewBuilder
    func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }
}

// MARK: - Data

extension Data {
    /// Sniff the image MIME type from the first few bytes; falls back to `image/png`.
    func detectImageMIME() -> String {
        guard count >= 2 else { return "image/png" }
        var header = [UInt8](repeating: 0, count: Swift.min(12, count))
        copyBytes(to: &header, count: header.count)

        if header[0] == 0xFF && header[1] == 0xD8 { return "image/jpeg" }
        if header.count >= 8 && header[0...3] == [0x89, 0x50, 0x4E, 0x47] { return "image/png" }
        if header.count >= 4 && header[0...3] == [0x47, 0x49, 0x46, 0x38] { return "image/gif" }
        if header.count >= 12 && header[0...3] == [0x52, 0x49, 0x46, 0x46] && header[8...11] == [0x57, 0x45, 0x42, 0x50] { return "image/webp" }

        if isSVG { return "image/svg+xml" }

        return "image/png"
    }

    /// Checks whether the data looks like an SVG (text starting with `<svg` or `<?xml` containing `<svg`).
    var isSVG: Bool {
        guard let str = String(data: prefix(512), encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) else {
            return false
        }
        return str.hasPrefix("<svg") || (str.hasPrefix("<?xml") && str.contains("<svg"))
    }
}

// MARK: - Task Debounce

extension Task where Success == Never, Failure == Never {
    static func sleep(milliseconds: Int) async throws {
        try await Task.sleep(nanoseconds: UInt64(milliseconds) * 1_000_000)
    }
}
