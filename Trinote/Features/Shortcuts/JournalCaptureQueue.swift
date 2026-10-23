import Foundation

/// Journal captures waiting to be added: saved while the server couldn't be reached, the login had expired, or the
/// journal was protected and locked. Kept as one JSON file in Application Support, oldest first, and written to each
/// capture's own day once the app or the next Shortcut run can reach the server.
actor JournalCaptureQueue {
    static let shared = JournalCaptureQueue(fileURL: JournalCaptureQueue.defaultFileURL)

    /// What a flush did.
    struct FlushResult: Sendable, Equatable {
        /// Captures written, with the note each went into.
        var written: [UUID: NoteIdTitle] = [:]
        /// Captures that can't be written (kept in the queue with `lastError` for the user to see and remove).
        var failed: [UUID: ShortcutError] = [:]
        /// Why the flush stopped early, leaving the rest for later; nil when it got through the queue.
        var stoppedBy: ShortcutError?

        var writtenNoteIds: Set<String> { Set(written.values.map(\.noteId)) }
    }

    private let fileURL: URL
    private var entries: [JournalCapture.Entry]?
    private var flushTask: Task<FlushResult, Never>?

    init(fileURL: URL) {
        self.fileURL = fileURL
    }

    static var defaultFileURL: URL {
        let base = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first
            ?? FileManager.default.temporaryDirectory
        return base.appendingPathComponent("ShortcutCaptures", isDirectory: true)
            .appendingPathComponent("journal-captures.json")
    }

    // MARK: - Reading

    func pending(profileId: String) -> [JournalCapture.Entry] {
        loaded().filter { $0.profileId == profileId }
    }

    func count(profileId: String) -> Int {
        pending(profileId: profileId).count
    }

    func hasPending(profileId: String) -> Bool {
        loaded().contains { $0.profileId == profileId }
    }

    // MARK: - Changing

    func enqueue(_ entry: JournalCapture.Entry) throws {
        var all = loaded()
        all.append(entry)
        try save(all)
    }

    func remove(id: UUID) throws {
        var all = loaded()
        all.removeAll { $0.id == id }
        try save(all)
    }

    func removeAll(profileId: String) throws {
        var all = loaded()
        all.removeAll { $0.profileId == profileId }
        try save(all)
    }

    private func setLastError(_ message: String, id: UUID) {
        var all = loaded()
        guard let index = all.firstIndex(where: { $0.id == id }) else { return }
        all[index].lastError = message
        try? save(all)
    }

    // MARK: - Flushing

    /// Writes the profile's captures oldest first, each to its own day's note. A capture leaves the queue only once
    /// written. The flush stops at the first failure that may pass (offline, signed out, protected notes locked);
    /// a capture that can't be written at all is marked and skipped. A flush already running is waited for first, so
    /// two flushes never write the same capture.
    @discardableResult
    func flush(
        client: any TriliumClientProtocol,
        profileId: String,
        protectedSessionActive: Bool
    ) async -> FlushResult {
        while let running = flushTask {
            _ = await running.value
            if flushTask == running { flushTask = nil }
        }
        let task = Task {
            await self.runFlush(client: client, profileId: profileId, protectedSessionActive: protectedSessionActive)
        }
        flushTask = task
        let result = await task.value
        if flushTask == task { flushTask = nil }
        return result
    }

    private func runFlush(
        client: any TriliumClientProtocol,
        profileId: String,
        protectedSessionActive: Bool
    ) async -> FlushResult {
        var result = FlushResult()
        for entry in pending(profileId: profileId) {
            do {
                let note = try await JournalCapture.append(entry, client: client, protectedSessionActive: protectedSessionActive)
                result.written[entry.id] = note
                do {
                    try remove(id: entry.id)
                } catch {
                    Log.sync.error("Couldn't remove an added journal capture from the queue: \(error)")
                }
            } catch {
                let reason = ShortcutError.from(error)
                if reason.keepsJournalCapture {
                    result.stoppedBy = reason
                    break
                }
                result.failed[entry.id] = reason
                setLastError(reason.localizedDescription, id: entry.id)
            }
        }
        if !result.written.isEmpty {
            Log.sync.info("Added \(result.written.count) saved journal capture(s)")
        }
        return result
    }

    // MARK: - File

    private func loaded() -> [JournalCapture.Entry] {
        if let entries { return entries }
        let read: [JournalCapture.Entry]
        if let data = try? Data(contentsOf: fileURL) {
            do {
                read = try JSONDecoder().decode([JournalCapture.Entry].self, from: data)
            } catch {
                // Set the file aside rather than overwrite it with the next capture.
                Log.sync.error("Couldn't read the saved journal captures: \(error)")
                try? FileManager.default.moveItem(at: fileURL, to: fileURL.appendingPathExtension("unreadable"))
                read = []
            }
        } else {
            read = []
        }
        entries = read
        return read
    }

    private func save(_ all: [JournalCapture.Entry]) throws {
        let directory = fileURL.deletingLastPathComponent()
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let data = try JSONEncoder().encode(all)
        // Readable after the first unlock, so a Shortcut run from the lock screen can add to and flush the queue.
        try data.write(to: fileURL, options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
        entries = all
        NotificationCenter.default.post(name: .trinoteJournalCapturesChanged, object: nil)
    }
}
