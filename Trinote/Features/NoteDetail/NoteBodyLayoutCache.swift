import Foundation
import UIKit

/// Remembers how tall each read-only note body laid out, per width, for the exact page it showed.
///
/// A note body's height is only known after WebKit lays the page out, so the note used to open at a
/// placeholder height and could only scroll to the tab's saved position once the real height arrived (under
/// a cover). With the height remembered, the body opens at its real size and the position applies at once.
@MainActor
enum NoteBodyLayoutCache {
    struct Entry: Codable, Equatable {
        var height: Double
        /// `signature(ofPage:)` of the page that was measured, as hex (JSON numbers can't hold every `UInt64`).
        var signature: String
        var storedAt: Double
    }

    static let maxEntries = 400

    /// Where entries are saved; tests point it somewhere else and reset the in-memory copy.
    static var fileURL: URL = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
        .appendingPathComponent("NoteBodyLayoutCache.json")

    private static var loaded: [String: Entry]?
    private static var saveWorkItem: DispatchWorkItem?

    /// Remembered height for `key` (profile and note) laid out at `width`, when the page is still `signature`.
    static func height(forKey key: String, width: CGFloat, signature: UInt64) -> CGFloat? {
        guard let entry = entries[entryKey(key, width)], entry.signature == hex(signature) else { return nil }
        return CGFloat(entry.height)
    }

    static func store(height: CGFloat, forKey key: String, width: CGFloat, signature: UInt64) {
        guard height > 0, width > 0 else { return }
        let k = entryKey(key, width)
        let sig = hex(signature)
        var all = entries
        if let existing = all[k], existing.signature == sig, abs(existing.height - Double(height)) < 0.5 { return }
        all[k] = Entry(height: Double(height), signature: sig, storedAt: Date().timeIntervalSince1970)
        if all.count > maxEntries {
            // Drop the oldest fifth so trimming doesn't run on every store.
            let drop = all.sorted { $0.value.storedAt < $1.value.storedAt }.prefix(all.count - maxEntries * 4 / 5)
            for (key, _) in drop { all.removeValue(forKey: key) }
        }
        loaded = all
        scheduleSave()
    }

    /// Identifies the page a height belongs to: the full page handed to WebKit (note body, styles, list and
    /// reorder options) plus the text size. Any change makes the remembered height unusable.
    nonisolated static func signature(ofPage page: String, contentSizeCategory: String) -> UInt64 {
        var hash: UInt64 = 0xcbf2_9ce4_8422_2325
        for byte in contentSizeCategory.utf8 { hash = (hash ^ UInt64(byte)) &* 0x0000_0100_0000_01b3 }
        for byte in page.utf8 { hash = (hash ^ UInt64(byte)) &* 0x0000_0100_0000_01b3 }
        return hash
    }

    static var entryCount: Int { entries.count }

    /// Writes pending changes now (tests; the app saves shortly after each change).
    static func flush() {
        saveWorkItem?.cancel()
        saveWorkItem = nil
        write(entries)
    }

    /// Forgets the in-memory copy so the next access reads `fileURL` again.
    static func resetForTesting(fileURL url: URL) {
        saveWorkItem?.cancel()
        saveWorkItem = nil
        fileURL = url
        loaded = nil
    }

    private static var entries: [String: Entry] {
        if let loaded { return loaded }
        let read = (try? Data(contentsOf: fileURL)).flatMap { try? JSONDecoder().decode([String: Entry].self, from: $0) } ?? [:]
        loaded = read
        return read
    }

    private static func entryKey(_ key: String, _ width: CGFloat) -> String {
        "\(key)@\(String(format: "%.1f", Double(width)))"
    }

    private static func hex(_ value: UInt64) -> String {
        String(value, radix: 16)
    }

    private static func scheduleSave() {
        saveWorkItem?.cancel()
        let work = DispatchWorkItem { MainActor.assumeIsolated { flush() } }
        saveWorkItem = work
        DispatchQueue.main.asyncAfter(deadline: .now() + 1, execute: work)
    }

    /// At most a few dozen KB, written at most once a second.
    private static func write(_ all: [String: Entry]) {
        guard let data = try? JSONEncoder().encode(all) else { return }
        try? data.write(to: fileURL, options: .atomic)
    }
}
