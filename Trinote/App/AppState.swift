import Foundation
import SwiftUI
import Observation

@Observable
@MainActor
final class AppState {
    var activeProfile: ServerProfile?
    var client: (any TriliumClientProtocol)?
    var isAuthenticated = false
    var isLoading = false
    var connectionError: String?
    var lastRefreshed: Date?
    /// In-memory: whether the user has unlocked protected notes this foreground session. Server session is cleared on background and after restoring the main login (see `endServerProtectedSessionAndPersistCookies()`).
    var protectedSessionActive = false

    let networkMonitor = NetworkMonitor.shared
    let syncManager = SyncManager()
    private let persistence = PersistenceManager.shared
    private let keychain = KeychainManager.shared

    private var realtime: TriliumWebSocketConnection?

    /// Ensures only one offline queue flush runs at a time. Concurrent callers await the same run (then return without duplicating work).
    private var offlineFlushInFlight = false
    private var offlineFlushWaiters: [CheckedContinuation<Void, Never>] = []

    /// Tracks server timestamps resulting from our own successful uploads, keyed by noteId.
    /// Used to distinguish "server changed because we uploaded" from "another client changed the note"
    /// when the post-upload getNote call fails on a flaky connection.
    private var lastOwnUploadTimestamps: [String: String] = [:]

    var isOnline: Bool { networkMonitor.isConnected }

    /// Ends the Trilium protected-note session on the server and persists cookies. Call after restoring the main session and when the app goes to the background so the document password is required again.
    func endServerProtectedSessionAndPersistCookies() async {
        protectedSessionActive = false
        guard let client, let profile = activeProfile else { return }
        try? await client.exitProtectedSession()
        if let tc = client as? TriliumClient {
            let data = await tc.exportSessionCookieData()
            try? await keychain.saveSessionCookies(data, forServer: profile.id)
        }
    }

    /// Called when the app enters background.
    /// Starts a short background execution window if a sync is running, and persists cookies.
    func onBackground() async {
        syncManager.beginBackgroundTimeExtensionIfNeeded()
        await endServerProtectedSessionAndPersistCookies()
    }

    /// Runs entity-pull incremental sync (or full sync if none completed yet) when session + instance id exist.
    /// Waits until the sync task finishes or `maxWaitSeconds` elapses so callers (e.g. tree reload) see fresh data.
    /// - Parameter downloadChangedBodies: Pass `false` for pull-to-refresh / tree toolbar: metadata updates only; bodies load on note open.
    func runIncrementalSync(maxWaitSeconds: TimeInterval = 180, downloadChangedBodies: Bool = true) async {
        guard networkMonitor.isConnected else { return }
        guard let client, let profile = activeProfile else { return }
        guard let iid = try? await keychain.loadTriliumInstanceId(forServer: profile.id) else { return }
        self.syncManager.incrementalSync(
            client: client,
            profileId: profile.id,
            triliumInstanceId: iid,
            downloadChangedBodies: downloadChangedBodies
        )
        await waitWhileSyncing(atMost: maxWaitSeconds)
    }

    /// Re-validates cookies (`/api/app-info`) and refreshes CSRF. Use after the network returns so the next API calls don’t use a stale session from when the device was offline.
    @discardableResult
    func refreshTriliumSession(timeoutSeconds: TimeInterval = 18) async -> Bool {
        guard networkMonitor.isConnected,
              let client,
              activeProfile != nil,
              isAuthenticated
        else { return false }
        do {
            if let tc = client as? TriliumClient {
                try await restoreSessionWithTimeout(client: tc, seconds: timeoutSeconds)
            } else {
                try await client.restoreSession()
            }
            connectionError = nil
            lastRefreshed = .now
            if let tc = client as? TriliumClient, let profile = activeProfile {
                let data = await tc.exportSessionCookieData()
                try? await keychain.saveSessionCookies(data, forServer: profile.id)
            }
            return true
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return false }
            connectionError = apiError.localizedDescription
            Log.auth.warning("Trilium session refresh failed: \(error)")
            return false
        }
    }

    /// Refreshes the server session, pushes offline queues, incremental sync, then WebSocket. Prefer this for the tree toolbar / manual quick sync right after reconnect.
    func refreshSessionThenIncrementalSync(maxWaitSeconds: TimeInterval = 180, downloadChangedBodies: Bool = true) async {
        guard networkMonitor.isConnected,
              client != nil,
              activeProfile != nil,
              isAuthenticated
        else { return }
        connectionError = nil
        let ok = await refreshTriliumSession()
        guard ok else { return }
        await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
        await runIncrementalSync(maxWaitSeconds: maxWaitSeconds, downloadChangedBodies: downloadChangedBodies)
        startRealtimeIfPossible()
    }

    private func waitWhileSyncing(atMost seconds: TimeInterval) async {
        guard seconds > 0 else { return }
        let deadline = Date().addingTimeInterval(seconds)
        while syncManager.isSyncing, Date() < deadline {
            try? await Task.sleep(nanoseconds: 100_000_000)
        }
    }

    /// Creates notes queued while offline (`PendingNoteCreation`), then pushes pending body uploads. Order matters for nested offline children.
    /// - Parameter assumeSessionIsReady: Set `true` when this is called immediately after `restoreSession` / login so we don’t repeat a network round-trip for the creation phase.
    func flushPendingLocalChangesIfPossible(assumeSessionIsReady: Bool = false) async {
        if offlineFlushInFlight {
            await withCheckedContinuation { offlineFlushWaiters.append($0) }
            return
        }
        offlineFlushInFlight = true
        defer {
            offlineFlushInFlight = false
            let waiters = offlineFlushWaiters
            offlineFlushWaiters.removeAll()
            for w in waiters { w.resume() }
        }
        await flushPendingNoteCreationsIfPossible(assumeSessionIsReady: assumeSessionIsReady)
        await flushPendingNotePatchesIfPossible(assumeSessionIsReady: true)
        await flushPendingNoteDeletionsIfPossible(assumeSessionIsReady: true)
        await flushPendingBranchMovesIfPossible(assumeSessionIsReady: true)
        await flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: true)
    }

    /// Fire-and-forget: tries to push all pending local changes to the server in the background.
    /// Safe to call at any time; returns immediately. The flush serializes itself, respects
    /// network availability, and leaves pending rows in SwiftData on failure for later retry.
    /// Re-runs automatically if new changes arrived while a flush was in flight.
    func backgroundSyncPendingChanges() {
        Task { [weak self] in
            guard let self else { return }
            await self.flushPendingLocalChangesIfPossible()
            // If new writes landed while we were flushing (conditional delete kept them),
            // run one more pass so the latest content reaches the server.
            guard let pid = self.activeProfile?.id else { return }
            let hasCreations = (try? self.persistence.fetchPendingNoteCreations(serverProfileId: pid))?.isEmpty == false
            let hasPatches = (try? self.persistence.fetchPendingNotePatches(serverProfileId: pid))?.isEmpty == false
            let hasDeletions = (try? self.persistence.fetchPendingNoteDeletions(serverProfileId: pid))?.isEmpty == false
            let hasUploads = (try? self.persistence.fetchPendingNoteBodyUploads(serverProfileId: pid))?.isEmpty == false
            if hasCreations || hasPatches || hasDeletions || hasUploads {
                await self.flushPendingLocalChangesIfPossible()
            }
        }
    }

    func flushPendingNoteCreationsIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        do {
            let pending = try persistence.fetchPendingNoteCreations(serverProfileId: profileId)
            guard !pending.isEmpty else { return }
        } catch {
            Log.sync.warning("Failed to read pending note creations: \(error)")
            return
        }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending note creation flush skipped — session refresh failed: \(error)")
                return
            }
        }
        if protectedSessionActive {
            try? await client.touchProtectedSession()
        }
        var idMap: [String: String] = [:]
        var didApplyAny = false
        // Re-fetch after each success so parent→child order and parent id rewrites from SwiftData are always current.
        // A single snapshot `for row in rows` plus concurrent flushes caused duplicate `createNote` calls and crashes.
        while true {
            let rows: [PendingNoteCreation]
            do {
                rows = try persistence.fetchPendingNoteCreations(serverProfileId: profileId)
            } catch {
                Log.sync.warning("Failed to read pending note creations: \(error)")
                return
            }
            guard let row = rows.first else { break }
            let resolvedParent = idMap[row.parentNoteId] ?? row.parentNoteId

            // Pre-parse attributes to find & resolve ~template before createNote.
            var parsedAttrs: [[String: Any]] = []
            var resolvedTemplateNoteId: String?
            var templateTitleFromAttrs: String?
            let attrsJSON = row.initialAttributesJSON
            if attrsJSON != "[]", !attrsJSON.isEmpty,
               let data = attrsJSON.data(using: .utf8),
               let raw = try? JSONSerialization.jsonObject(with: data) as? [Any] {
                for item in raw {
                    guard let attr = item as? [String: Any] else { continue }
                    parsedAttrs.append(attr)
                }
                for attr in parsedAttrs {
                    guard let type = attr["type"] as? String, type == "relation",
                          let name = attr["name"] as? String, name == "template",
                          let value = attr["value"] as? String else { continue }
                    templateTitleFromAttrs = value
                    resolvedTemplateNoteId = await Self.resolveTemplateTitle(client: client, title: value)
                    break
                }
            }
            if let templateTitleFromAttrs, resolvedTemplateNoteId == nil {
                Log.sync.warning(
                    "Could not resolve template title '\(templateTitleFromAttrs)' for pending note \(row.localNoteId); falling back to non-template create."
                )
            }

            // Templates only clone attributes; the create request's content is always the
            // note's own body. Sending empty content here used to discard the initial
            // viewport JSON for geo maps (and any other initial body).
            let contentToSend = row.initialContent

            let request = CreateNoteRequest(
                parentNoteId: resolvedParent,
                title: row.title,
                type: row.noteType,
                mime: row.mime,
                content: contentToSend,
                notePosition: nil,
                prefix: nil,
                isProtected: nil,
                noteId: nil,
                branchId: nil,
                templateNoteId: resolvedTemplateNoteId
            )
            let attrsForLog: String = {
                let raw = row.initialAttributesJSON
                if raw.count > 2800 {
                    return String(raw.prefix(2800)) + "…(+\(raw.count - 2800) chars)"
                }
                return raw
            }()
            let flushCreateLog = NoteDiagnostics.describeFlushPendingCreate(
                localNoteId: row.localNoteId,
                resolvedParent: resolvedParent,
                title: row.title,
                noteType: row.noteType,
                mime: row.mime,
                initialContentLen: row.initialContent.count,
                contentToSendLen: contentToSend.count,
                templateTitleFromAttrs: templateTitleFromAttrs,
                resolvedTemplateNoteId: resolvedTemplateNoteId,
                attrsJSONTruncated: attrsForLog,
                willPostCreateAttributes: resolvedTemplateNoteId == nil
            )
            Log.noteDiag.info("\(flushCreateLog)")
            Log.sync.info(
                "Flushing pending create \(row.localNoteId) type=\(row.noteType) templateNoteId=\(resolvedTemplateNoteId ?? "nil")"
            )
            do {
                let response = try await client.createNote(request)
                let newId = response.note.noteId
                idMap[row.localNoteId] = newId

                // Apply cache + dequeue **before** attributes. If any `createAttribute` fails, we must not
                // leave the row queued or the next flush would call `createNote` again (duplicate notes).
                try persistence.applyOfflineNoteCreationServerResult(
                    queueRowId: row.id,
                    localNoteId: row.localNoteId,
                    localBranchId: row.localBranchId,
                    response: response,
                    serverProfileId: profileId
                )
                NotificationCenter.default.post(
                    name: .trinoteOfflineNoteIdReplaced,
                    object: nil,
                    userInfo: ["from": row.localNoteId, "to": newId]
                )

                // When templateNoteId was provided, the server handles everything:
                // ~template relation, content, type/mime, and child subtree. All other
                // attributes are inherited from the template — adding them directly
                // creates duplicates that break the desktop layout system.
                // Only add attributes when no template was resolved (plain note).
                if resolvedTemplateNoteId != nil {
                    Log.noteDiag.info(
                        "NoteDiag CREATE flush skipPostAttributes noteId=\(newId) reason=templateNoteId_applied_on_server parsedAttrCount=\(parsedAttrs.count)"
                    )
                }
                if resolvedTemplateNoteId == nil {
                    for attr in parsedAttrs {
                        guard let type = attr["type"] as? String,
                              let name = attr["name"] as? String else { continue }
                        if type == "relation", name == "template" {
                            guard let value = attr["value"] as? String else { continue }
                            let fallbackId = await Self.resolveTemplateTitle(client: client, title: value)
                            guard let resolvedId = fallbackId else {
                                Log.sync.warning("Skipping unresolvable ~template for note \(newId) (title: \(value))")
                                continue
                            }
                            do {
                                try await client.createAttribute(CreateAttributeRequest(
                                    noteId: newId, type: type, name: name,
                                    value: resolvedId, isInheritable: nil, position: nil
                                ))
                            } catch {
                                Log.sync.warning("createAttribute failed for ~template on \(newId): \(error)")
                            }
                            continue
                        }
                        let value: String
                        if let s = attr["value"] as? String {
                            value = s
                        } else if let n = attr["value"] as? NSNumber {
                            value = n.stringValue
                        } else {
                            continue
                        }
                        let inheritable = (attr["isInheritable"] as? Bool) ?? false
                        do {
                            try await client.createAttribute(CreateAttributeRequest(
                                noteId: newId, type: type, name: name,
                                value: value,
                                isInheritable: inheritable ? true : nil,
                                position: nil
                            ))
                        } catch {
                            Log.sync.warning(
                                "createAttribute failed for flushed note \(newId) (\(type)/\(name)): \(error)"
                            )
                        }
                    }
                }

                if let fresh = try? await client.getNote(newId) {
                    let postCreatePhase = "create.flush.postGetNote serverId=\(newId)"
                    Log.noteDiag.info("\(NoteDiagnostics.describeNoteResponse(fresh, phase: postCreatePhase))")
                    Self.persistNoteResponseToCache(fresh, profileId: profileId, persistence: persistence)
                } else {
                    Log.noteDiag.warning("NoteDiag CREATE flush postGetNote failed for serverId=\(newId)")
                }

                didApplyAny = true
                Log.sync.info("Flushed offline-created note \(row.localNoteId) → \(newId)")
            } catch {
                Log.sync.warning("Pending note creation failed for \(row.localNoteId): \(error)")
                break
            }
        }
        if didApplyAny {
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        }
    }

    /// Pushes queued title changes (`PendingNotePatch`) to the server.
    func flushPendingNotePatchesIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingNotePatch]
        do {
            pending = try persistence.fetchPendingNotePatches(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending note patches: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending note patch flush skipped — session refresh failed: \(error)")
                return
            }
        }
        if protectedSessionActive {
            try? await client.touchProtectedSession()
        }
        var didAny = false
        for row in pending {
            do {
                let updated = try await client.updateNote(row.noteId, request: UpdateNoteRequest(title: row.title, type: nil, mime: nil))
                if let cached = try? persistence.fetchCachedNote(id: row.noteId, serverProfileId: profileId) {
                    cached.title = updated.title
                }
                try persistence.deletePendingNotePatch(noteId: row.noteId, serverProfileId: profileId)
                didAny = true
                Log.sync.info("Flushed offline title patch for note \(row.noteId)")
            } catch {
                let apiErr = APIError.from(error)
                if case .notFound = apiErr {
                    try? persistence.deletePendingNotePatch(noteId: row.noteId, serverProfileId: profileId)
                    didAny = true
                } else {
                    Log.sync.warning("Pending note patch failed for \(row.noteId): \(error)")
                    break
                }
            }
        }
        if didAny {
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        }
    }

    /// Pushes queued note deletions (`PendingNoteDeletion`) to the server. Treats 404 (already gone) as success.
    func flushPendingNoteDeletionsIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingNoteDeletion]
        do {
            pending = try persistence.fetchPendingNoteDeletions(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending note deletions: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending note deletion flush skipped — session refresh failed: \(error)")
                return
            }
        }
        if protectedSessionActive {
            try? await client.touchProtectedSession()
        }
        var didAny = false
        for row in pending {
            do {
                try await client.deleteNote(row.noteId)
                try persistence.deletePendingNoteDeletion(id: row.id, serverProfileId: profileId)
                didAny = true
                Log.sync.info("Flushed offline-queued deletion for note \(row.noteId)")
            } catch {
                let apiErr = APIError.from(error)
                if case .notFound = apiErr {
                    try? persistence.deletePendingNoteDeletion(id: row.id, serverProfileId: profileId)
                    didAny = true
                    Log.sync.info("Note \(row.noteId) already deleted on server, removed queue entry")
                } else {
                    Log.sync.warning("Pending note deletion failed for \(row.noteId): \(error)")
                    break
                }
            }
        }
        if didAny {
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        }
    }

    /// Applies queued tree moves (`PendingBranchMove`) after offline note creations (branch ids may remap).
    func flushPendingBranchMovesIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingBranchMove]
        do {
            pending = try persistence.fetchPendingBranchMoves(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending branch moves: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending branch move flush skipped — session refresh failed: \(error)")
                return
            }
        }
        if protectedSessionActive {
            try? await client.touchProtectedSession()
        }
        var didAny = false
        for row in pending {
            do {
                try await client.moveBranchToParent(branchId: row.sourceBranchId, parentBranchId: row.targetParentBranchId)
                try persistence.deletePendingBranchMove(id: row.id, serverProfileId: profileId)
                didAny = true
                Log.sync.info(
                    "Flushed queued branch move note \(row.sourceNoteId) (branch \(row.sourceBranchId) → parent branch \(row.targetParentBranchId))"
                )
            } catch {
                Log.sync.warning("Pending branch move failed for note \(row.sourceNoteId): \(error)")
                NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
                break
            }
        }
        if didAny {
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
        }
    }

    /// Pushes bodies queued while offline (`PendingNoteBodyUpload`) after `restoreSession` has obtained CSRF.
    /// - Parameter assumeSessionIsReady: Set `true` when this is called immediately after `restoreSession` / login so we don’t repeat a network round-trip.
    func flushPendingNoteBodyUploadsIfPossible(assumeSessionIsReady: Bool = false) async {
        guard networkMonitor.isConnected,
              let client,
              let profile = activeProfile
        else { return }
        let profileId = profile.id
        let pending: [PendingNoteBodyUpload]
        do {
            pending = try persistence.fetchPendingNoteBodyUploads(serverProfileId: profileId)
        } catch {
            Log.sync.warning("Failed to read pending body uploads: \(error)")
            return
        }
        guard !pending.isEmpty else { return }
        if !assumeSessionIsReady, let tc = client as? TriliumClient {
            do {
                try await restoreSessionWithTimeout(client: tc, seconds: 10)
            } catch {
                Log.sync.warning("Pending body upload flush skipped — session refresh failed: \(error)")
                return
            }
        }
        if protectedSessionActive {
            try? await client.touchProtectedSession()
        }
        for row in pending {
            let snapshotDate = row.queuedAt
            do {
                let fresh = try? await client.getNote(row.noteId)
                let base = row.baseUtcDateModified.trimmingCharacters(in: .whitespacesAndNewlines)
                var isRealConflict = false
                if let fresh {
                    let serverMod = fresh.utcDateModified.trimmingCharacters(in: .whitespacesAndNewlines)
                    let canDetectConflict = !base.isEmpty && !serverMod.isEmpty
                    if canDetectConflict, serverMod != base {
                        // Check whether the timestamp mismatch was caused by our own previous upload.
                        let ownUpload = lastOwnUploadTimestamps[row.noteId] ?? ""
                        isRealConflict = (ownUpload != serverMod)
                    }
                    if isRealConflict {
                        if fresh.isProtected {
                            try await client.updateNoteContent(row.noteId, content: row.body, contentType: row.mime)
                            Log.sync.warning(
                                "Offline body conflict for protected note \(row.noteId): applied overwrite (duplicate not supported)."
                            )
                        } else {
                            let parentId = fresh.parentNoteIds.first ?? "root"
                            let trimmedTitle = fresh.title.trimmingCharacters(in: .whitespacesAndNewlines)
                            let conflictSuffix = String(localized: " (ios-sync-conflict)", comment: "Appended to note title for offline/server merge conflict sibling")
                            let newTitle: String
                            if trimmedTitle.isEmpty {
                                newTitle = String(localized: "Note (ios-sync-conflict)", comment: "Title when original note has no title and iOS saved a conflict copy")
                            } else {
                                newTitle = "\(trimmedTitle)\(conflictSuffix)"
                            }
                            let response = try await client.createChildNoteWithContent(
                                parentNoteId: parentId,
                                title: newTitle,
                                noteType: fresh.type,
                                mime: fresh.mime,
                                body: row.body
                            )
                            try? persistence.cacheNote(from: response.note, serverProfileId: profileId)
                            try? persistence.cacheBranch(from: response.branch, serverProfileId: profileId)
                            try? persistence.commitBatch()
                            Log.sync.info(
                                "Offline body conflict for \(row.noteId): saved iOS copy as new note \(response.note.noteId) under \(parentId)"
                            )
                        }
                        try? persistence.deletePendingNoteBodyUploadIfUnchanged(noteId: row.noteId, serverProfileId: profileId, snapshotDate: snapshotDate)
                        NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)
                        continue
                    }
                }
                try await client.updateNoteContent(row.noteId, content: row.body, contentType: row.mime)
                // Fetch the server's new utcDateModified after our upload so that
                // (a) the cache is current for future pending rows, and
                // (b) any surviving pending row won't false-conflict against our own upload.
                let afterUpload = try? await client.getNote(row.noteId)
                let newServerMod = afterUpload?.utcDateModified ?? ""
                if !newServerMod.isEmpty {
                    lastOwnUploadTimestamps[row.noteId] = newServerMod
                    try? persistence.cacheNoteContent(row.noteId, content: row.body, serverProfileId: profileId, utcDateModified: newServerMod)
                }
                let deleted = (try? persistence.deletePendingNoteBodyUploadIfUnchanged(noteId: row.noteId, serverProfileId: profileId, snapshotDate: snapshotDate)) ?? true
                if !deleted, !newServerMod.isEmpty {
                    try? persistence.updatePendingBodyUploadBase(noteId: row.noteId, serverProfileId: profileId, newBase: newServerMod)
                }
                Log.sync.info("Flushed offline-edited body for note \(row.noteId)")
            } catch {
                Log.sync.warning("Pending body upload failed for \(row.noteId): \(error)")
                break
            }
        }
    }

    func bootstrap() async {
        isLoading = true
        defer { isLoading = false }

        do {
            if let profile = try persistence.activeProfile() {
                activeProfile = profile
                syncManager.restoreSyncState(profileId: profile.id)
                await quickActivateProfileForLaunch(profile)
            }
        } catch {
            Log.auth.error("Bootstrap failed: \(error)")
            connectionError = error.localizedDescription
        }
    }

    private func triliumInstanceId(for profile: ServerProfile) async throws -> String {
        if let existing = try await keychain.loadTriliumInstanceId(forServer: profile.id) {
            return existing
        }
        let fresh = UUID().uuidString
        try await keychain.saveTriliumInstanceId(fresh, forServer: profile.id)
        return fresh
    }

    private func startRealtimeIfPossible() {
        realtime?.stop()
        guard let client = client as? TriliumClient,
              activeProfile?.id != nil else { return }

        let storage = client.httpCookieStorage
        let base = client.baseURL
        realtime = TriliumWebSocketConnection(
            baseURL: base,
            cookieStorage: storage,
            onEvent: { [weak self] in
                guard let self else { return }
                Task { @MainActor in
                    guard let c = self.client, let pid = self.activeProfile?.id else { return }
                    if let iid = try? await self.keychain.loadTriliumInstanceId(forServer: pid) {
                        self.syncManager.incrementalSync(client: c, profileId: pid, triliumInstanceId: iid)
                    }
                }
            },
            onProtectedSessionLogout: { [weak self] in
                Task { @MainActor in
                    self?.protectedSessionActive = false
                }
            }
        )
        realtime?.start()
    }

    /// Bounded wait so offline / captive networks don’t leave bootstrap on “Connecting…” until URLSession’s default timeout.
    private func restoreSessionWithTimeout(client: TriliumClient, seconds: TimeInterval = 12) async throws {
        try await withThrowingTaskGroup(of: Void.self) { group in
            group.addTask {
                try await client.restoreSession()
            }
            group.addTask {
                let ns = UInt64(seconds * 1_000_000_000)
                try await Task.sleep(nanoseconds: ns)
                throw APIError.timeout
            }
            try await group.next()!
            group.cancelAll()
        }
    }

    /// Use SwiftData branch rows to repopulate `CachedNote` parent/child id lists (fixes detail sub-notes when incremental rows omitted tree fields).
    private func enterOfflineCacheMode(profile: ServerProfile) async {
        self.isAuthenticated = true
        self.connectionError = String(localized: "Offline — showing cached notes. Connect to refresh.", comment: "Banner when launch continues without server")
        self.lastRefreshed = nil
        try? persistence.setActiveProfile(profile)
        Log.auth.info("Proceeding offline with persisted session cookies for \(profile.name)")
        _ = try? await triliumInstanceId(for: profile)
        try? persistence.reconcileCachedNoteBranchesMetadata(serverProfileId: profile.id)
        await runIncrementalSync(maxWaitSeconds: 0)
        startRealtimeIfPossible()
    }

    /// Fast path for cold launch: attach client + profile, show cached UI when cookies exist, then validate session and sync in the background.
    private func quickActivateProfileForLaunch(_ profile: ServerProfile) async {
        guard let url = profile.url else { return }
        let cookieData = try? await keychain.loadSessionCookies(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url, persistedCookieData: cookieData)
        let hadPersistedSessionCookies = cookieData.map { !$0.isEmpty } ?? false

        self.client = newClient
        self.activeProfile = profile

        guard hadPersistedSessionCookies else {
            self.isAuthenticated = false
            return
        }

        self.isAuthenticated = true
        self.connectionError = nil
        try? persistence.setActiveProfile(profile)

        if !networkMonitor.isConnected {
            Task { @MainActor in
                await self.enterOfflineCacheMode(profile: profile)
            }
            return
        }

        Task { @MainActor in
            await self.finishOnlineProfileActivationAfterLaunch(profile: profile, hadPersistedSessionCookies: hadPersistedSessionCookies)
        }
    }

    /// Runs after launch: `restoreSession`, offline queues, incremental sync, WebSocket — without blocking the main tab / cached tree.
    private func finishOnlineProfileActivationAfterLaunch(profile: ServerProfile, hadPersistedSessionCookies: Bool) async {
        guard let client = self.client as? TriliumClient else { return }
        do {
            try await restoreSessionWithTimeout(client: client, seconds: 12)
            await endServerProtectedSessionAndPersistCookies()
            self.connectionError = nil
            self.lastRefreshed = .now
            let exported = await client.exportSessionCookieData()
            try? await keychain.saveSessionCookies(exported, forServer: profile.id)
            Log.auth.info("Connected to \(profile.name)")
            syncManager.restoreSyncState(profileId: profile.id)
            _ = try await triliumInstanceId(for: profile)
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            await runIncrementalSync(maxWaitSeconds: 0)
            startRealtimeIfPossible()
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            let canUseCacheOffline = hadPersistedSessionCookies && !apiError.isAuthError && apiError.isNetworkError
            if canUseCacheOffline {
                await enterOfflineCacheMode(profile: profile)
            } else {
                self.isAuthenticated = false
                self.connectionError = apiError.localizedDescription
                Log.auth.warning("Session restore failed: \(error)")
            }
        }
    }

    func activateProfile(_ profile: ServerProfile) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        let cookieData = try? await keychain.loadSessionCookies(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url, persistedCookieData: cookieData)

        do {
            try await newClient.restoreSession()
            self.client = newClient
            self.activeProfile = profile
            await endServerProtectedSessionAndPersistCookies()
            self.isAuthenticated = true
            self.connectionError = nil
            self.lastRefreshed = .now
            try persistence.setActiveProfile(profile)
            let exported = await newClient.exportSessionCookieData()
            try? await keychain.saveSessionCookies(exported, forServer: profile.id)
            syncManager.restoreSyncState(profileId: profile.id)
            _ = try await triliumInstanceId(for: profile)
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            await runIncrementalSync(maxWaitSeconds: 30)
            startRealtimeIfPossible()
        } catch {
            self.client = newClient
            self.activeProfile = profile
            self.isAuthenticated = false
            throw error
        }
    }

    func loginWithPassword(_ password: String, rememberMe: Bool, profile: ServerProfile) async throws {
        guard let url = profile.url else { throw APIError.invalidURL }

        try await keychain.clearServerAuthArtifacts(forServer: profile.id)
        let newClient = TriliumClient(baseURL: url)
        try await newClient.login(password: password, rememberMe: rememberMe)

        let exportedLogin = await newClient.exportSessionCookieData()
        try? await keychain.saveSessionCookies(exportedLogin, forServer: profile.id)
        _ = try await triliumInstanceId(for: profile)

        self.client = newClient
        self.activeProfile = profile
        self.protectedSessionActive = false
        self.isAuthenticated = true
        self.connectionError = nil
        self.lastRefreshed = .now
        try persistence.setActiveProfile(profile)
        Log.auth.info("Logged in to \(profile.name) (session)")
        syncManager.restoreSyncState(profileId: profile.id)
        _ = try await triliumInstanceId(for: profile)
        await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
        await runIncrementalSync(maxWaitSeconds: 30)
        startRealtimeIfPossible()
    }

    func logout() async {
        syncManager.cancel()
        realtime?.stop()
        realtime = nil
        protectedSessionActive = false

        if let client {
            if let tc = client as? TriliumClient {
                try? await tc.exitProtectedSession()
            }
            try? await client.logout()
        }

        if let profile = activeProfile {
            try? await keychain.clearServerAuthArtifacts(forServer: profile.id)
            try? persistence.deleteSyncStatus(domain: "fullSync", serverProfileId: profile.id)
            // Refresh in-memory sync state after removing the persisted full-sync marker.
            syncManager.restoreSyncState(profileId: profile.id)
        }

        client = nil
        isAuthenticated = false
        connectionError = nil
        lastRefreshed = nil
        Log.auth.info("Logged out")
    }

    func signOutAndRemoveProfile(_ profile: ServerProfile) async {
        if profile.id == activeProfile?.id {
            await logout()
            activeProfile = nil
        } else {
            try? await keychain.clearServerAuthArtifacts(forServer: profile.id)
        }
        do {
            try persistence.clearCache(for: profile.id)
            try persistence.deleteProfile(profile)
        } catch {
            Log.auth.error("Failed to remove profile: \(error)")
        }
    }

    /// Called when app returns to foreground
    func onForegroundResume() async {
        syncManager.endBackgroundTimeExtension()
        guard isAuthenticated, let client, let profile = activeProfile else { return }
        guard networkMonitor.isConnected else { return }
        do {
            if let tc = client as? TriliumClient {
                try await restoreSessionWithTimeout(client: tc, seconds: 12)
            } else {
                try await client.restoreSession()
            }
            connectionError = nil
            lastRefreshed = .now
            if let tc = client as? TriliumClient {
                let data = await tc.exportSessionCookieData()
                try? await keychain.saveSessionCookies(data, forServer: profile.id)
            }
            await flushPendingLocalChangesIfPossible(assumeSessionIsReady: true)
            await runIncrementalSync(maxWaitSeconds: 15)
            startRealtimeIfPossible()
        } catch {
            connectionError = APIError.from(error).localizedDescription
        }
    }

    // MARK: - Offline flush helpers

    private static func persistNoteResponseToCache(_ response: NoteResponse, profileId: String, persistence: PersistenceManager) {
        try? persistence.cacheNote(from: response, serverProfileId: profileId)
        for attr in response.attributes {
            try? persistence.cacheAttributeBatch(from: attr, serverProfileId: profileId)
        }
        try? persistence.commitBatch()
    }

    /// Resolves a human-readable template title to a concrete note ID.
    /// Uses fast search first, then falls back to scanning `_templates` children directly.
    /// This handles title variants across Trilium versions (e.g. "Geo Map", "GeoMap", "Geo Map (beta)").
    private static func resolveTemplateTitle(client: any TriliumClientProtocol, title: String) async -> String? {
        let raw = title.trimmingCharacters(in: .whitespacesAndNewlines)
        let normalized = normalizeTemplateTitle(raw)
        var titlesToTry: [String] = [raw]
        var preferredType: String?
        if normalized == "geomap" {
            titlesToTry = ["Geo Map", "GeoMap", "Geo Map (beta)"]
            preferredType = "geoMap"
        } else if normalized == "calendar" {
            titlesToTry = ["Calendar"]
        }

        // 1) Fast search by title (cheap and usually enough).
        for t in titlesToTry {
            if let id = await resolveTemplateRelationTargetNoteId(client: client, title: t) {
                return id
            }
        }

        // 2) Fallback: desktop's own endpoint (`/api/search-templates`) + note fetch.
        if let id = await resolveTemplateFromSearchTemplates(client: client, preferredTitles: titlesToTry, preferredType: preferredType) {
            return id
        }

        // 3) Fallback: inspect `_templates` children directly and match by title/type.
        if let id = await resolveTemplateFromTemplatesRoot(
            client: client,
            preferredTitles: titlesToTry,
            preferredType: preferredType
        ) {
            return id
        }

        return nil
    }

    private static func resolveTemplateFromSearchTemplates(
        client: any TriliumClientProtocol,
        preferredTitles: [String],
        preferredType: String?
    ) async -> String? {
        guard let tc = client as? TriliumClient,
              let ids = try? await tc.searchTemplateNoteIds(),
              !ids.isEmpty
        else {
            return nil
        }

        var candidates: [NoteResponse] = []
        for id in ids {
            if let note = try? await client.getNote(id), !note.isDeleted {
                candidates.append(note)
            }
        }
        guard !candidates.isEmpty else { return nil }

        for wanted in preferredTitles {
            if let match = candidates.first(where: { $0.title.caseInsensitiveCompare(wanted) == .orderedSame }) {
                return match.noteId
            }
        }

        let normalizedWanted = Set(preferredTitles.map(normalizeTemplateTitle))
        if let match = candidates.first(where: { normalizedWanted.contains(normalizeTemplateTitle($0.title)) }) {
            return match.noteId
        }

        if let preferredType, let match = candidates.first(where: { $0.type == preferredType }) {
            return match.noteId
        }
        return nil
    }

    private static func resolveTemplateFromTemplatesRoot(
        client: any TriliumClientProtocol,
        preferredTitles: [String],
        preferredType: String?
    ) async -> String? {
        guard let templatesRoot = try? await client.getNote("_templates") else {
            return nil
        }
        var children: [NoteResponse] = []
        for childId in templatesRoot.childNoteIds {
            if let child = try? await client.getNote(childId), !child.isDeleted {
                children.append(child)
            }
        }
        guard !children.isEmpty else { return nil }

        // Exact case-insensitive title match first.
        for wanted in preferredTitles {
            if let match = children.first(where: { $0.title.caseInsensitiveCompare(wanted) == .orderedSame }) {
                return match.noteId
            }
        }

        // Normalized title match (ignores spaces/punctuation/case).
        let normalizedWanted = Set(preferredTitles.map(normalizeTemplateTitle))
        if let match = children.first(where: { normalizedWanted.contains(normalizeTemplateTitle($0.title)) }) {
            return match.noteId
        }

        // Last resort for geo map variants: pick first `_templates` child with matching note type.
        if let preferredType, let match = children.first(where: { $0.type == preferredType }) {
            return match.noteId
        }
        return nil
    }

    private static func normalizeTemplateTitle(_ title: String) -> String {
        let lower = title.lowercased()
        let filtered = lower.unicodeScalars.filter {
            CharacterSet.alphanumerics.contains($0)
        }
        return String(String.UnicodeScalarView(filtered))
    }

    /// Trilium relation `template` values are note ids; resolve from the built-in template title when possible.
    /// Multi-word titles must be quoted in search (e.g. `#title = "Geo Map"`).
    private static func resolveTemplateRelationTargetNoteId(client: any TriliumClientProtocol, title: String) async -> String? {
        let escaped = title
            .replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "\"", with: "\\\"")
        let q = "#title = \"\(escaped)\""
        do {
            let resp = try await client.searchNotes(
                query: q,
                fastSearch: true,
                includeArchived: false,
                ancestorNoteId: nil,
                orderBy: nil,
                orderDirection: nil,
                limit: 30
            )
            return resp.results.first(where: { $0.title == title })?.noteId ?? resp.results.first?.noteId
        } catch {
            return nil
        }
    }
}
