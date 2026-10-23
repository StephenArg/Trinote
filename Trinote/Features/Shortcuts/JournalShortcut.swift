import Foundation

/// The work behind "Add to Today's Journal", apart from the App Intents types so it can be tested.
@MainActor
enum JournalShortcut {
    enum Outcome: Equatable {
        /// Written to the journal note with this title.
        case added(noteTitle: String)
        /// Kept on the device for later, for this reason (offline, signed out, or protected notes locked).
        case savedOnDevice(ShortcutError)
    }

    /// Adds `text` to today's journal note, or keeps it on the device when it can't be added now.
    static func add(
        text: String,
        addTime: Bool,
        now: Date = Date(),
        queue: JournalCaptureQueue = .shared
    ) async throws -> Outcome {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { throw ShortcutError.needsText }
        let profileId = try await ShortcutSession.activeProfileId()
        let entry = JournalCapture.Entry(text: trimmed, addTime: addTime, capturedAt: now, profileId: profileId)

        // Saved first, so the text survives the action being stopped half way.
        do {
            try await queue.enqueue(entry)
        } catch {
            Log.sync.error("Couldn't save a journal capture on the device: \(error)")
            let session = try await ShortcutSession.acquire(profileId: profileId)
            do {
                let note = try await JournalCapture.append(entry, client: session.client, protectedSessionActive: session.protectedSessionActive)
                session.notesChanged([note.noteId])
                return .added(noteTitle: note.title)
            } catch {
                throw ShortcutError.from(error)
            }
        }

        let session: ShortcutSession
        do {
            session = try await ShortcutSession.acquire(profileId: profileId)
        } catch {
            let reason = ShortcutError.from(error)
            guard reason.keepsJournalCapture else {
                try? await queue.remove(id: entry.id)
                throw reason
            }
            return .savedOnDevice(reason)
        }
        let (outcome, writtenNoteIds) = try await write(
            entry,
            client: session.client,
            protectedSessionActive: session.protectedSessionActive,
            queue: queue
        )
        session.notesChanged(writtenNoteIds)
        return outcome
    }

    /// Flushes the queue (earlier captures first, so lines stay in order) and reports what became of `entry`, which
    /// is already queued. A capture that can't be added at all leaves the queue and is thrown, for Shortcuts to show.
    static func write(
        _ entry: JournalCapture.Entry,
        client: any TriliumClientProtocol,
        protectedSessionActive: Bool,
        queue: JournalCaptureQueue
    ) async throws -> (Outcome, Set<String>) {
        let result = await queue.flush(client: client, profileId: entry.profileId, protectedSessionActive: protectedSessionActive)
        if let note = result.written[entry.id] {
            return (.added(noteTitle: note.title), result.writtenNoteIds)
        }
        if let failure = result.failed[entry.id] {
            try? await queue.remove(id: entry.id)
            throw failure
        }
        return (.savedOnDevice(result.stoppedBy ?? .offline), result.writtenNoteIds)
    }
}
