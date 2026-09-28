import Foundation
import os
import SwiftData

/// One note found by offline search.
struct LocalSearchHit: Sendable, Equatable {
    let noteId: String
    let title: String
    let noteType: String
    let mime: String
    let isProtected: Bool
    let parentNoteIds: [String]
    let childNoteIds: [String]
    let parentBranchIds: [String]
    let childBranchIds: [String]
    let utcDateModified: String?
    /// Text around the first query term found in the body, when one was.
    let snippet: String?
}

struct LocalSearchOutcome: Sendable {
    var hits: [LocalSearchHit]
    /// Set while the index is still being built, so results may be missing notes.
    var indexProgress: OfflineSearchIndex.Progress?
}

/// Full-text search over the note bodies cached on this device (issue #29): a SQLite FTS5 index per server, beside
/// the SwiftData store, because SwiftData can't search inside `CachedNote.content`. The trigram tokenizer matches any
/// part of a word, like Trilium's own search. Text is folded first (`NotePlainText.fold`) so case and accents don't
/// matter. Protected notes are never indexed: the file isn't encrypted, and it stays readable while they're locked.
///
/// The index follows the cache rather than every write path: `refresh` compares each cached body's
/// `contentFetchedAt` (set by every body write) with the stamp it indexed, so a run that stops partway resumes where
/// it left off. Sync calls it after changing the cache; search calls it too, for notes opened or edited here since.
///
/// Runs on its own serial queue with a fresh `ModelContext` per operation (see `SyncStore` for why not
/// `@ModelActor`); a long-lived context would keep returning rows as they were when first read.
actor OfflineSearchIndex {
    struct Progress: Equatable, Sendable {
        let done: Int
        let total: Int
    }

    @MainActor static let shared = OfflineSearchIndex(modelContainer: PersistenceManager.shared.container)

    private let queue = DispatchSerialQueue(label: "com.trinote.offline-search-index", qos: .utility)

    nonisolated var unownedExecutor: UnownedSerialExecutor {
        queue.asUnownedSerialExecutor()
    }

    private let modelContainer: ModelContainer
    private let directory: URL
    private var openDatabase: (profileId: String, database: SQLiteDatabase)?

    private var refreshing: Set<String> = []
    private var refreshAgain: Set<String> = []
    private var lastRefreshFinishedAt: [String: Date] = [:]
    private var progressByProfile: [String: Progress] = [:]

    /// Bump when the schema or what gets indexed changes: an index at another version is deleted and rebuilt.
    static let schemaVersion = 1
    /// Terms shorter than this can't use a trigram index; they match titles only.
    static let minimumBodyTermLength = 3
    private static let chunkSize = 100

    init(modelContainer: ModelContainer, directory: URL? = nil) {
        self.modelContainer = modelContainer
        self.directory = directory
            ?? URL.applicationSupportDirectory.appending(path: "SearchIndex", directoryHint: .isDirectory)
    }

    // MARK: - Refresh

    /// Refreshes the index in the background. `minimumInterval` skips it when the last one finished that recently
    /// (search passes one, since it asks on every query).
    nonisolated func scheduleRefresh(profileId: String, minimumInterval: TimeInterval = 0) {
        Task(priority: .utility) {
            await self.refresh(profileId: profileId, minimumInterval: minimumInterval)
        }
    }

    /// Brings the index in line with the cached bodies. A call while one runs for the same server makes that one go
    /// round again instead of starting a second.
    func refresh(profileId: String, minimumInterval: TimeInterval = 0) async {
        if minimumInterval > 0, let last = lastRefreshFinishedAt[profileId],
           Date.now.timeIntervalSince(last) < minimumInterval {
            return
        }
        guard !refreshing.contains(profileId) else {
            refreshAgain.insert(profileId)
            return
        }
        refreshing.insert(profileId)
        defer {
            refreshing.remove(profileId)
            progressByProfile[profileId] = nil
        }
        repeat {
            refreshAgain.remove(profileId)
            do {
                try await runRefresh(profileId: profileId)
                lastRefreshFinishedAt[profileId] = .now
            } catch {
                Log.search.error("Offline search index refresh failed: \(error)")
                // Reopened next time, in case the file went away underneath it (`deleteIndex` mid-run).
                if openDatabase?.profileId == profileId { openDatabase = nil }
                return
            }
        } while refreshAgain.contains(profileId)
    }

    private func runRefresh(profileId: String) async throws {
        let database = try database(for: profileId)
        let stamps = try CacheStore(context: ModelContext(modelContainer)).fetchCachedBodyStamps(serverProfileId: profileId)
        var wanted: [String: Double] = [:]
        wanted.reserveCapacity(stamps.count)
        for stamp in stamps where !stamp.isProtected && NotePlainText.isSearchable(noteType: stamp.noteType) {
            wanted[stamp.noteId] = stamp.contentFetchedAt.timeIntervalSinceReferenceDate
        }

        var indexed: [String: (id: Int64, stamp: Double)] = [:]
        let docs = try database.prepare("SELECT id, noteId, stamp FROM docs")
        while try docs.step() {
            indexed[docs.text(at: 1)] = (docs.int64(at: 0), docs.double(at: 2))
        }

        let gone = indexed.filter { wanted[$0.key] == nil }
        if !gone.isEmpty {
            try database.transaction {
                let deleteDoc = try database.prepare("DELETE FROM docs WHERE id = ?")
                let deleteBody = try database.prepare("DELETE FROM body WHERE rowid = ?")
                for entry in gone.values {
                    try deleteDoc.bind(entry.id).run()
                    try deleteBody.bind(entry.id).run()
                }
            }
        }

        let stale = wanted.compactMap { noteId, stamp in indexed[noteId]?.stamp == stamp ? nil : noteId }
        guard !stale.isEmpty else {
            if !gone.isEmpty { Log.search.info("Offline search index: removed \(gone.count) notes") }
            return
        }
        // Small catch-ups finish before anyone could read a progress line.
        let reportsProgress = stale.count > Self.chunkSize
        var done = 0
        if reportsProgress { progressByProfile[profileId] = Progress(done: 0, total: stale.count) }

        for chunk in stale.chunked(into: Self.chunkSize) {
            try indexChunk(chunk, profileId: profileId, database: database)
            done += chunk.count
            if reportsProgress { progressByProfile[profileId] = Progress(done: done, total: stale.count) }
            // Lets searches run between chunks.
            await Task.yield()
        }
        Log.search.info("Offline search index: indexed \(stale.count), removed \(gone.count) notes")
    }

    /// Indexes these notes' current bodies in one transaction. Each chunk reads through its own context, so the bodies
    /// it loads are freed with it.
    private func indexChunk(_ noteIds: [String], profileId: String, database: SQLiteDatabase) throws {
        let rows = try CacheStore(context: ModelContext(modelContainer)).fetchCachedNotes(ids: noteIds, serverProfileId: profileId)
        try database.transaction {
            let findDoc = try database.prepare("SELECT id FROM docs WHERE noteId = ?")
            let insertDoc = try database.prepare("INSERT INTO docs(noteId, stamp) VALUES(?, ?)")
            let updateDoc = try database.prepare("UPDATE docs SET stamp = ? WHERE id = ?")
            let deleteDoc = try database.prepare("DELETE FROM docs WHERE id = ?")
            let deleteBody = try database.prepare("DELETE FROM body WHERE rowid = ?")
            let insertBody = try database.prepare("INSERT INTO body(rowid, text) VALUES(?, ?)")

            for noteId in noteIds {
                try findDoc.bind(noteId)
                let existingId: Int64? = try findDoc.step() ? findDoc.int64(at: 0) : nil
                guard let row = rows[noteId], !row.isProtected,
                      let fetchedAt = row.contentFetchedAt, let data = row.content
                else {
                    // Gone or protected since the stamps were read; the next refresh settles it.
                    if let existingId {
                        try deleteDoc.bind(existingId).run()
                        try deleteBody.bind(existingId).run()
                    }
                    continue
                }
                // A body with no text (or not UTF-8) is still recorded, so it isn't read again until it changes.
                let text = NotePlainText.searchableText(noteType: row.noteType, data: data).map(NotePlainText.fold) ?? ""
                let stamp = fetchedAt.timeIntervalSinceReferenceDate
                let id: Int64
                if let existingId {
                    try updateDoc.bind(stamp, existingId).run()
                    try deleteBody.bind(existingId).run()
                    id = existingId
                } else {
                    try insertDoc.bind(noteId, stamp).run()
                    id = database.lastInsertRowId
                }
                try insertBody.bind(id, text).run()
            }
        }
    }

    // MARK: - Search

    /// Notes on this device matching `query`: each term in the title or body, and every label filter. Notes whose
    /// titles hold every term come first, then the most recently modified.
    func search(_ query: LocalSearchQuery, profileId: String, limit: Int) throws -> LocalSearchOutcome {
        var outcome = LocalSearchOutcome(hits: [], indexProgress: progressByProfile[profileId])
        guard !query.isEmpty else { return outcome }

        let context = ModelContext(modelContainer)
        let cache = CacheStore(context: context)
        // Without the index (it couldn't be opened), titles and labels still work.
        let database: SQLiteDatabase?
        do {
            database = try self.database(for: profileId)
        } catch {
            Log.search.error("Offline search index unavailable: \(error)")
            database = nil
        }

        var titleMatches: [Set<String>] = []
        var bodyMatches: [Set<String>] = []
        for term in query.terms {
            titleMatches.append(try cache.fetchCachedNoteIds(titleContaining: term, serverProfileId: profileId))
            bodyMatches.append(try database.map { try Self.bodyMatches(term: term, in: $0) } ?? [])
        }
        var required: [Set<String>] = zip(titleMatches, bodyMatches).map { $0.union($1) }
        for label in query.labels {
            required.append(try cache.fetchNoteIds(withLabel: label.name, value: label.value, serverProfileId: profileId))
        }
        guard var candidates = required.min(by: { $0.count < $1.count }) else { return outcome }
        for set in required where !candidates.isEmpty {
            candidates.formIntersection(set)
        }
        // Trilium's hidden subtree (`_hidden`, `_options…`, built-in templates) isn't part of the user's notes.
        candidates = candidates.filter { !$0.hasPrefix("_") }
        guard !candidates.isEmpty else { return outcome }

        let titleHasEveryTerm = candidates.filter { noteId in titleMatches.allSatisfy { $0.contains(noteId) } }

        // Rank on dates alone first, so a common word matching thousands of notes doesn't load them all.
        let dated = try Self.modifiedDates(of: candidates, profileId: profileId, context: context)
        let ranked = candidates.sorted { a, b in
            let aTitle = titleHasEveryTerm.contains(a), bTitle = titleHasEveryTerm.contains(b)
            if aTitle != bTitle { return aTitle }
            let aDate = dated[a] ?? "", bDate = dated[b] ?? ""
            if aDate != bDate { return aDate > bDate }
            return a < b
        }

        var hits: [LocalSearchHit] = []
        for batch in ranked.chunked(into: limit) {
            let rows = try cache.fetchCachedNotes(ids: batch, serverProfileId: profileId)
            for noteId in batch {
                guard let row = rows[noteId] else { continue }
                // A protected note is only found by its title: its body was never indexed, and one indexed before
                // the note was protected must not show.
                if row.isProtected && !titleHasEveryTerm.contains(noteId) { continue }
                let bodyTerm = query.terms.indices.first { bodyMatches[$0].contains(noteId) }.map { query.terms[$0] }
                hits.append(LocalSearchHit(
                    noteId: row.noteId,
                    title: row.title,
                    noteType: row.noteType,
                    mime: row.mime,
                    isProtected: row.isProtected,
                    parentNoteIds: row.parentNoteIds,
                    childNoteIds: row.childNoteIds,
                    parentBranchIds: row.parentBranchIds,
                    childBranchIds: row.childBranchIds,
                    utcDateModified: row.utcDateModified,
                    snippet: bodyTerm.flatMap { Self.snippet(for: $0, in: row) }
                ))
                if hits.count == limit { break }
            }
            if hits.count == limit { break }
        }
        outcome.hits = hits
        return outcome
    }

    private static func bodyMatches(term: String, in database: SQLiteDatabase) throws -> Set<String> {
        let folded = NotePlainText.fold(term).trimmingCharacters(in: .whitespaces)
        guard folded.unicodeScalars.count >= minimumBodyTermLength else { return [] }
        // An FTS5 string: any part of the text, in order, with `"` doubled.
        let match = "\"" + folded.replacingOccurrences(of: "\"", with: "\"\"") + "\""
        let statement = try database.prepare(
            "SELECT docs.noteId FROM body JOIN docs ON docs.id = body.rowid WHERE body MATCH ?"
        )
        try statement.bind(match)
        var ids: Set<String> = []
        while try statement.step() {
            ids.insert(statement.text(at: 0))
        }
        return ids
    }

    /// `utcDateModified` per note, reading only that column.
    private static func modifiedDates(
        of noteIds: Set<String>,
        profileId: String,
        context: ModelContext
    ) throws -> [String: String] {
        var dates: [String: String] = [:]
        for chunk in Array(noteIds).chunked(into: CacheStore.idQueryChunkSize) {
            var descriptor = FetchDescriptor<CachedNote>(
                predicate: #Predicate { chunk.contains($0.noteId) && $0.serverProfileId == profileId }
            )
            descriptor.propertiesToFetch = [\.noteId, \.utcDateModified]
            for row in try context.fetch(descriptor) {
                dates[row.noteId] = row.utcDateModified
            }
        }
        return dates
    }

    private static func snippet(for term: String, in row: CachedNote) -> String? {
        guard !row.isProtected, let data = row.content,
              let text = NotePlainText.searchableText(noteType: row.noteType, data: data)
        else { return nil }
        return SearchNoteMatchExtractor.firstMatchPreview(inPlainText: text, term: term)
    }

    // MARK: - Files

    /// Removes a server's index (its cache was cleared or the server removed).
    func deleteIndex(profileId: String) {
        if openDatabase?.profileId == profileId { openDatabase = nil }
        lastRefreshFinishedAt[profileId] = nil
        let url = fileURL(profileId: profileId)
        for suffix in ["", "-wal", "-shm"] {
            try? FileManager.default.removeItem(at: URL(filePath: url.path + suffix))
        }
    }

    /// Where the index is being built for this server, while it is.
    func progress(profileId: String) -> Progress? {
        progressByProfile[profileId]
    }

    private func fileURL(profileId: String) -> URL {
        let name = profileId.addingPercentEncoding(withAllowedCharacters: .alphanumerics) ?? profileId
        return directory.appending(path: "\(name).sqlite", directoryHint: .notDirectory)
    }

    private func database(for profileId: String) throws -> SQLiteDatabase {
        if let openDatabase, openDatabase.profileId == profileId { return openDatabase.database }
        openDatabase = nil

        var folder = directory
        if !FileManager.default.fileExists(atPath: folder.path) {
            try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
            // Rebuilt from the cache whenever it's missing, so not worth backing up.
            var values = URLResourceValues()
            values.isExcludedFromBackup = true
            try? folder.setResourceValues(values)
        }

        let url = fileURL(profileId: profileId)
        let existingVersion = try SQLiteDatabase(path: url.path).userVersion
        if existingVersion != 0, existingVersion != Self.schemaVersion {
            // Closed above; a built index at another version starts over.
            deleteIndex(profileId: profileId)
        }
        let database = try SQLiteDatabase(path: url.path)
        if database.userVersion != Self.schemaVersion {
            try database.execute("PRAGMA journal_mode = WAL")
            try database.execute("""
                CREATE TABLE IF NOT EXISTS docs(
                    id INTEGER PRIMARY KEY,
                    noteId TEXT NOT NULL UNIQUE,
                    stamp REAL NOT NULL
                )
                """)
            try database.execute("CREATE VIRTUAL TABLE IF NOT EXISTS body USING fts5(text, tokenize = 'trigram')")
            try database.setUserVersion(Self.schemaVersion)
        }
        try database.execute("PRAGMA synchronous = NORMAL")
        openDatabase = (profileId, database)
        return database
    }
}
