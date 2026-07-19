import Foundation
import Observation
import UIKit

@Observable
@MainActor
final class NoteDetailViewModel {
    var note: NoteItem?
    var content: Data?
    var contentString: String?
    private var rawContentString: String?
    var attachments: [AttachmentItem] = []
    var breadcrumbs: [BreadcrumbItem] = []
    var isLoading = false
    var isLoadingContent = false
    var error: String?
    /// True once any server call has succeeded for this note.
    /// Only false when the initial load couldn't reach the server
    /// and only cached data is showing. Never reset to false once true.
    var serverVerified = false

    // Editing
    var isEditing = false
    var editableContent = ""
    /// Decorated copy of `editableContent` for the rich text editor's WKWebView. Linked-note `<img src="api/images/{noteId}/...">`
    /// references are inlined as data URIs (canvas-export.svg, MermaidRenderer SVG, or attachment bytes) because the
    /// editor.html is loaded from the bundle and can't resolve relative `api/...` URLs. The original src is preserved on
    /// each rewritten `<img>` via `data-trinote-original-src` so `undecorateLinkedImagesFromEditor` can restore it on save.
    /// `nil` while preparation is in flight; the editor view shows a spinner during that brief window.
    var editorDisplayContent: String?
    @ObservationIgnored private var _pendingEditorHTML: String?
    /// Monotonic counter incremented every time we kick off `prepareEditorDisplayContent`. Late-arriving decorations
    /// (e.g. user toggled editing off and back on) are dropped if their generation no longer matches `_editorPrepGeneration`.
    @ObservationIgnored private var _editorPrepGeneration: Int = 0
    var isSaving = false
    var saveError: String?
    var showSaveError = false
    var hasDraft = false
    /// Short-lived hint after offline save (e.g. queued for upload).
    var transientEditorMessage: String?
    @ObservationIgnored private var transientEditorMessageTask: Task<Void, Never>?

    // Title edit
    var editingTitle = false
    var editedTitle = ""

    // Create child
    var showCreateChild = false
    var newNoteTitle = ""
    var newNoteType: NoteType = .text

    // Delete
    var showDeleteConfirm = false
    /// Set when refresh discovers the note was deleted on the server; the view should dismiss.
    private(set) var shouldDismissAfterServerDeletion = false

    // Details panel
    var showDetails = false

    // Draft discard
    var showDiscardDraft = false

    // Protected notes
    var needsProtectedSession = false
    var protectedUnlockError: String?
    var isUnlockingProtected = false

    // Child notes
    var childNotes: [ChildNoteSummary] = []
    var isLoadingChildren = false
    /// Bumped when `childNotes` reloads so SwiftUI re-evaluates geo-map routing (uses cached child attributes).
    private(set) var geoMapDetectionTick = 0

    /// Mutable so the view model can survive an offline → server id swap
    /// (`.trinoteOfflineNoteIdReplaced`) without being torn down and rebuilt.
    /// See `migrateAfterOfflineIdReplacement(to:)`.
    private(set) var noteId: String
    private let appState: AppState
    /// From the tree when opening a note whose children are in memory but not (yet) in SwiftData — critical offline.
    @ObservationIgnored private let seedChildSummaries: [ChildNoteSummary]?
    private let persistence = PersistenceManager.shared
    private let cacheExclusion = CacheExclusionPolicy()
    private var draftAutoSaveTask: Task<Void, Never>?
    private var serverContentHash: Int?
    /// The server's utcDateModified for the current note, set during metadata fetch.
    private var serverUtcDateModified: String?
    /// Shared, memoized task for the background metadata refresh so `load()` and `loadContent()`
    /// coordinate on a single `getNote` and both see a populated `serverUtcDateModified`.
    @ObservationIgnored private var metadataRefreshTask: Task<Void, Never>?
    /// Blob id from the latest `getNote` response (used to skip redundant `getNoteContent` for empty notes).
    private var serverBlobId: String?

    init(noteId: String, appState: AppState, seedChildSummaries: [ChildNoteSummary]? = nil) {
        self.noteId = noteId
        self.appState = appState
        self.seedChildSummaries = seedChildSummaries
    }

    /// Called when `.trinoteOfflineNoteIdReplaced` swaps an offline `ol_*` id for a server id while this
    /// note is currently being viewed/edited. Updates the in-memory id and re-pulls the cached note from
    /// persistence (which has already been renamed by `applyOfflineNoteCreationServerResult`, including
    /// drafts via `remapLocalNoteIdReferences`). Avoids destroying and rebuilding the view model, which
    /// otherwise causes a visible read-mode flash and aborts any in-progress edit setup.
    func migrateAfterOfflineIdReplacement(to newId: String) {
        guard newId != noteId else { return }
        noteId = newId
        loadFromCache()
        loadContentFromCache()
        // Receiving this notification proves the server accepted the create
        // (see `AppState.flushPendingNoteCreationsIfPossible`), so flip the
        // toolbar's `icloud.slash` indicator off in real time instead of
        // waiting for the next user-initiated refresh.
        serverVerified = true
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }
    var isOnline: Bool { appState.isOnline }
    var serverBaseURL: URL? { (appState.client as? TriliumClient)?.baseURL }

    private func parentNoteIdsForCache(noteId: String, response: NoteResponse? = nil) -> [String] {
        if let response { return response.parentNoteIds }
        if note?.noteId == noteId { return note?.parentNoteIds ?? [] }
        guard let profileId = serverProfileId else { return [] }
        return (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.parentNoteIds ?? []
    }

    private func persistNoteResponse(_ response: NoteResponse, profileId: String) {
        try? persistence.cacheNoteIfAllowed(from: response, serverProfileId: profileId, policy: cacheExclusion)
        for attr in response.attributes {
            try? persistence.cacheAttributeBatchIfAllowed(
                from: attr,
                parentNoteIds: response.parentNoteIds,
                serverProfileId: profileId,
                policy: cacheExclusion
            )
        }
    }

    private func cacheNoteContentIfAllowed(
        _ noteId: String,
        content: Data,
        profileId: String,
        utcDateModified: String? = nil,
        response: NoteResponse? = nil
    ) {
        try? persistence.cacheNoteContentIfAllowed(
            noteId,
            content: content,
            parentNoteIds: parentNoteIdsForCache(noteId: noteId, response: response),
            serverProfileId: profileId,
            utcDateModified: utcDateModified,
            policy: cacheExclusion
        )
    }

    /// Refetches this note, ancestors, and direct children so titles match the current protected session (decrypted vs encrypted).
    func resyncNoteTitlesWithProtectedSession() async {
        guard let client, let profileId = serverProfileId else { return }
        var visited = Set<String>()
        var currentId: String? = noteId

        while let nid = currentId, nid != "root", !visited.contains(nid) {
            visited.insert(nid)
            do {
                let response = try await client.getNote(nid)
                persistNoteResponse(response, profileId: profileId)
                if nid == noteId {
                    self.note = NoteItem(from: response)
                    self.serverUtcDateModified = response.utcDateModified
                    await updateSharedPublicState(client: client)
                }
                currentId = response.parentNoteIds.first
            } catch {
                Log.api.warning("Protected title resync: getNote failed for \(nid): \(error)")
                break
            }
        }
        try? persistence.commitBatch()

        if let n = self.note {
            for childId in n.childNoteIds where !visited.contains(childId) {
                do {
                    let response = try await client.getNote(childId)
                    persistNoteResponse(response, profileId: profileId)
                } catch {
                    Log.api.debug("Protected title resync: child getNote failed for \(childId)")
                }
            }
            try? persistence.commitBatch()
            try? persistence.recordRecentNote(
                noteId: n.noteId, title: n.title,
                noteType: n.type.rawValue, serverProfileId: profileId
            )
        }

        rebuildBreadcrumbsFromCache()
        await loadChildNotes()
    }

    /// Display title for another note (include-note chip); uses current note, children, SwiftData cache, then `getNote`.
    func resolveDisplayTitle(forReferencedNoteId refId: String) async -> String {
        let sessionActive = appState.protectedSessionActive
        if refId == noteId, let n = note {
            let t = NoteItem.maskedStoredTitle(n.title, isProtected: n.isProtected, protectedSessionActive: sessionActive)
            let trimmed = t.trimmingCharacters(in: .whitespacesAndNewlines)
            return trimmed.isEmpty ? refId : trimmed
        }
        if let child = childNotes.first(where: { $0.noteId == refId }) {
            let t = NoteItem.maskedStoredTitle(child.title, isProtected: child.isProtected, protectedSessionActive: sessionActive)
            let trimmed = t.trimmingCharacters(in: .whitespacesAndNewlines)
            return trimmed.isEmpty ? refId : trimmed
        }
        guard let profileId = serverProfileId else { return refId }
        if let cached = try? persistence.fetchCachedNote(id: refId, serverProfileId: profileId) {
            if !sessionActive, cached.isProtected {
                return NoteItem.protectedTitlePlaceholder
            }
            let raw = cached.title.trimmingCharacters(in: .whitespacesAndNewlines)
            return raw.isEmpty ? refId : raw
        }
        guard let client else { return refId }
        do {
            let r = try await client.getNote(refId)
            persistNoteResponse(r, profileId: profileId)
            try? persistence.commitBatch()
            let t = NoteItem.maskedStoredTitle(r.title, isProtected: r.isProtected, protectedSessionActive: sessionActive)
            let trimmed = t.trimmingCharacters(in: .whitespacesAndNewlines)
            return trimmed.isEmpty ? refId : trimmed
        } catch {
            return refId
        }
    }

    private func rebuildBreadcrumbsFromCache() {
        guard let profileId = serverProfileId else {
            breadcrumbs = []
            return
        }
        var crumbs: [BreadcrumbItem] = []
        var currentId = noteId
        var visited = Set<String>()
        while currentId != "root", !visited.contains(currentId) {
            visited.insert(currentId)
            guard let cached = try? persistence.fetchCachedNote(id: currentId, serverProfileId: profileId) else { break }
            let displayTitle: String
            if !appState.protectedSessionActive, cached.isProtected {
                displayTitle = NoteItem.protectedTitlePlaceholder
            } else {
                displayTitle = cached.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? currentId : cached.title
            }
            guard let parentNoteId = cached.parentNoteIds.first, !parentNoteId.isEmpty else { break }
            let branchId = cached.parentBranchIds.first
            crumbs.insert(BreadcrumbItem(noteId: currentId, title: displayTitle, branchId: branchId), at: 0)
            currentId = parentNoteId
        }
        if currentId == "root" {
            crumbs.insert(BreadcrumbItem(noteId: "root", title: "Root", branchId: nil), at: 0)
        }
        breadcrumbs = crumbs
    }

    // MARK: - Loading

    /// Loads note from cache instantly, then refreshes from server in the background.
    func load() async {
        let nid = self.noteId

        // Show cached data immediately
        loadFromCache()
        // Hydrate body from SwiftData before any network await. Otherwise `load()` can sit on
        // getNote + share-state checks while the UI already has a title but `contentString`
        // stays nil until `loadContent()` runs (after this method returns).
        loadContentFromCache()

        if let note, let profileId = self.serverProfileId {
            try? self.persistence.recordRecentNote(
                noteId: nid, title: note.title,
                noteType: note.type.rawValue, serverProfileId: profileId
            )
        }

        rebuildBreadcrumbsFromCache()

        // Pending local creates are not on the server yet — same stall as offline when interface is “up”.
        if nid.isOfflineLocalNoteId {
            return
        }

        // Do not await getNote while offline — same long URLSession stall as bootstrap “Connecting…”.
        if !appState.isOnline {
            return
        }

        // Background server refresh
        guard client != nil else { return }
        await startOrGetMetadataRefresh().value
    }

    /// Returns the in-flight metadata-refresh task, starting one if none is running. Both `load()`
    /// and `loadContent()` await the same task so only one `getNote` runs and the body-skip decision
    /// in `loadContent()` always sees a populated `serverUtcDateModified` (fixes a slow-connection
    /// race that caused a redundant `getNoteContent` and loader on unchanged notes). The reference
    /// clears when the refresh finishes so later `load()` calls (e.g. after a move, or Retry) still
    /// re-fetch instead of reusing a stale completed task.
    private func startOrGetMetadataRefresh() -> Task<Void, Never> {
        if let existing = metadataRefreshTask { return existing }
        let task = Task { [weak self] in
            await self?.refreshMetadataFromServer()
            self?.metadataRefreshTask = nil
        }
        metadataRefreshTask = task
        return task
    }

    /// Fetches note metadata from the server and updates published state, cache, and breadcrumbs.
    private func refreshMetadataFromServer() async {
        let nid = self.noteId
        guard let client else { return }
        let hadCachedNote = self.note != nil
        if !hadCachedNote { isLoading = true; error = nil }
        defer { if !hadCachedNote { isLoading = false } }

        do {
            let response = try await client.getNote(nid)
            if response.isDeleted {
                handleServerDeletedNote(noteId: nid)
                return
            }
            let fresh = NoteItem(from: response)
            self.note = fresh
            self.serverUtcDateModified = response.utcDateModified
            self.serverBlobId = response.blobId
            self.serverVerified = true
            await updateSharedPublicState(client: client)

            if let profileId = self.serverProfileId {
                persistNoteResponse(response, profileId: profileId)
                try? self.persistence.commitBatch()
                try? self.persistence.recordRecentNote(
                    noteId: nid, title: response.title,
                    noteType: response.type, serverProfileId: profileId
                )
            }
            rebuildBreadcrumbsFromCache()
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            if case .notFound = apiError {
                handleServerDeletedNote(noteId: nid)
                return
            }
            Log.api.error("Failed to load note: \(error)")
            if !hadCachedNote {
                self.error = apiError.localizedDescription
            }
        }
    }

    /// Loads content from cache instantly, then checks the server timestamp.
    /// Only downloads content if the server's `utcDateModified` is newer than
    /// the cached version. Images are inlined from the local cache.
    func loadContent() async {
        let nid = self.noteId

        loadContentFromCache()

        // Cached HTML still points at `api/images` / `api/attachments`; WKWebView cannot load those like a browser tab.
        // If we assign `contentString` before inlining completes, images briefly show as broken (e.g. “?”) while online fetches run.
        if let raw = self.rawContentString,
           TriliumInlineImageCaching.hasResolvableInlineImageURLs(in: raw),
           self.note?.type == .text || self.contentString == nil {
            let hideBodyUntilInlined = self.contentString == nil
            if hideBodyUntilInlined {
                self.isLoadingContent = true
            }
            let inlined = await self.inlineAttachmentImages(in: raw)
            self.contentString = inlined
            if hideBodyUntilInlined {
                self.isLoadingContent = false
            }
        }
        await applyIncludeNoteResolutionIfNeeded()

        await ensureNoteMetadataIfNeeded()

        guard let note = self.note else {
            return
        }

        if !note.isProtected {
            self.needsProtectedSession = false
        } else if !appState.protectedSessionActive, contentString == nil, content == nil {
            // `loadContentFromCache` skips protected bodies until unlock — keep overlay visible offline too.
            self.needsProtectedSession = true
        }

        self.checkForDraft()

        if nid.isOfflineLocalNoteId {
            await applyIncludeNoteResolutionIfNeeded()
            return
        }

        // When offline, rely on SwiftData only; avoid getNoteContent timeouts and a stuck loading state.
        if !appState.isOnline {
            await applyIncludeNoteResolutionIfNeeded()
            return
        }

        guard let client else {
            return
        }

        // Wait for the shared metadata refresh so `serverUtcDateModified` is populated before the
        // skip-policy check below. Otherwise, on slow connections `getNote` may still be in flight,
        // `serverUtcDateModified` is nil, and the policy forces a redundant `getNoteContent` (with a
        // loader + re-render) on notes that have not actually changed.
        await startOrGetMetadataRefresh().value

        let profileId = self.serverProfileId ?? ""
        let cachedNote = try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId)
        let cachedDate = cachedNote?.utcDateModified
        let childIdsForBlobPolicy = resolvedChildNoteIdsForDetail()
        let hasUsableBody = hasUsableDisplayedBodyContent()
        let shouldFetchBlobDespiteFreshMeta = TriliumNoteBodyPolicy.shouldFetchBodyDespiteFreshMeta(
            note: note,
            hasUsableBody: hasUsableBody,
            childNoteIds: childIdsForBlobPolicy
        )
        let forceFetchProtected = note.isProtected && !appState.protectedSessionActive

        if TriliumNoteBodyPolicy.shouldSkipGetNoteContentWhenMetaIsFresh(
            serverUtc: self.serverUtcDateModified,
            cachedUtc: cachedDate,
            serverBlobId: self.serverBlobId,
            cachedContent: cachedNote?.content,
            contentFetchedAt: cachedNote?.contentFetchedAt,
            hasUsableBody: hasUsableBody,
            shouldFetchDespiteFreshMeta: shouldFetchBlobDespiteFreshMeta,
            forceFetchProtected: forceFetchProtected
        ) {
            self.serverVerified = true
            if note.isProtected {
                self.needsProtectedSession = false
                if appState.protectedSessionActive {
                    await resyncNoteTitlesWithProtectedSession()
                }
            }
            await applyIncludeNoteResolutionIfNeeded()
            return
        }

        let needsContentSpinner = self.contentString == nil
        if needsContentSpinner { isLoadingContent = true }
        defer { if needsContentSpinner { isLoadingContent = false } }

        do {
            let data = try await client.getNoteContent(nid)
            let htmlString = String(data: data, encoding: .utf8)

            self.content = data
            self.serverContentHash = htmlString?.hashValue
            self.rawContentString = htmlString

            var displayHTML = htmlString
            if let html = displayHTML,
               html.contains("api/attachments/") || html.contains("api/images/") {
                displayHTML = await self.inlineAttachmentImages(in: html)
            }

            self.contentString = displayHTML
            await applyIncludeNoteResolutionIfNeeded()
            self.serverVerified = true

            if note.isProtected {
                self.appState.protectedSessionActive = true
                self.needsProtectedSession = false
                self.protectedUnlockError = nil
            }

            if let profileId = self.serverProfileId {
                cacheNoteContentIfAllowed(
                    nid, content: data, profileId: profileId,
                    utcDateModified: self.serverUtcDateModified
                )
            }

            self.checkForDraft()

            if note.isProtected {
                await resyncNoteTitlesWithProtectedSession()
            }

        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            Log.api.error("Failed to load note content")

            if note.isProtected {
                if Self.protectedSessionLikelyEnded(error) {
                    self.appState.protectedSessionActive = false
                    self.needsProtectedSession = true
                    await resyncNoteTitlesWithProtectedSession()
                } else if !self.appState.protectedSessionActive {
                    // No server-side session yet — show unlock (wrong password will be handled after unlock attempt).
                    self.needsProtectedSession = true
                }
            }

            // "Cannot find content for noteId" means the blob was erased —
            // the note is effectively deleted on the server.
            if case .serverError(let code, let msg) = apiError, code == 500,
               let msg, msg.contains("Cannot find content") {
                self.error = "This note was deleted on the server."
                if let profileId = self.serverProfileId {
                    GhostNoteTracker.shared.add(nid, serverProfileId: profileId)
                    try? self.persistence.deleteCachedNotes(noteIds: [nid], serverProfileId: profileId)
                }
                NotificationCenter.default.post(name: .ghostNoteDetected, object: nil, userInfo: ["noteId": nid])
            }
        }
    }

    /// Finds Trilium image URLs in HTML (`src`, CKEditor `data-src` / `data-cke-saved-src`) and replaces them with
    /// base64 data URIs. Matches `api/images|attachments` with any prefix (relative, `/api/…`, or `https://host/…/api/…`).
    /// Applies replacements from the end of the string so ranges stay valid when lengths change.
    private func inlineAttachmentImages(in html: String) async -> String {
        let profileId = self.serverProfileId ?? ""
        let inlined = await TriliumInlineImageCaching.inlineAttachmentImages(
            in: html,
            client: client,
            persistence: persistence,
            serverProfileId: profileId,
            sourceNoteId: noteId,
            parentNoteIds: parentNoteIdsForCache(noteId: noteId)
        )
        return Self.dedupeTrinoteImageNoteIdAttributesInHTML(inlined)
    }

    /// `~imageLink` to mermaid/canvas notes still uses `api/images/{noteId}/…`, but `getNoteContent` returns diagram
    /// source/JSON — not inlinable image bytes — so `inlineAttachmentImages` skips those matches. This pass adds
    /// `data-trinote-image-note-id` so card wrap + tap-to-open can work while the `<img>` keeps loading from the server URL.
    private static func annotateImageLinkApiImageTagsMissingNoteId(in html: String) -> String {
        guard html.localizedCaseInsensitiveContains("api/images") else { return html }
        let tagPattern = try! NSRegularExpression(pattern: #"(?i)(<img\b)([^>]+)(>)"#, options: [])
        let idInUrl = try! NSRegularExpression(pattern: #"(?i)api/images/([a-zA-Z0-9_-]+)/"#, options: [])
        let htmlNS = html as NSString
        let full = NSRange(location: 0, length: htmlNS.length)
        let matches = tagPattern.matches(in: html, options: [], range: full)
        guard !matches.isEmpty else { return html }

        var replacements: [(range: NSRange, tag: String)] = []
        replacements.reserveCapacity(matches.count)
        for m in matches {
            guard m.numberOfRanges >= 4 else { continue }
            let inner = htmlNS.substring(with: m.range(at: 2))
            if inner.localizedCaseInsensitiveContains("data-trinote-image-note-id") { continue }
            let innerNS = inner as NSString
            guard let idMatch = idInUrl.firstMatch(in: inner, range: NSRange(location: 0, length: innerNS.length)),
                  idMatch.numberOfRanges >= 2 else { continue }
            let noteId = innerNS.substring(with: idMatch.range(at: 1))
            guard !noteId.isEmpty else { continue }
            let esc = noteId.replacingOccurrences(of: "&", with: "&amp;").replacingOccurrences(of: "\"", with: "&quot;")
            let newTag = "\(htmlNS.substring(with: m.range(at: 1)))\(inner) data-trinote-image-note-id=\"\(esc)\"\(htmlNS.substring(with: m.range(at: 3)))"
            replacements.append((m.range, newTag))
        }
        guard !replacements.isEmpty else { return html }

        let ms = NSMutableString(string: html)
        for item in replacements.sorted(by: { $0.range.location > $1.range.location }) {
            ms.replaceCharacters(in: item.range, with: item.tag)
        }
        return Self.dedupeTrinoteImageNoteIdAttributesInHTML(ms as String)
    }

    /// If both `src` and `data-src` pointed at `api/images/…`, inlining can add duplicate `data-trinote-image-note-id`; keep one.
    private static func dedupeTrinoteImageNoteIdAttributesInHTML(_ html: String) -> String {
        let p = try! NSRegularExpression(
            pattern: #"(?i)(\sdata-trinote-image-note-id\s*=\s*["'][^"']*["'])(\s+data-trinote-image-note-id\s*=\s*["'][^"']*["'])+"#, options: []
        )
        var s = html
        var safety = 0
        let maxDedupeIterations = 8
        while safety < maxDedupeIterations {
            safety += 1
            let r = NSRange(location: 0, length: (s as NSString).length)
            let next = p.stringByReplacingMatches(in: s, options: [], range: r, withTemplate: "$1")
            if next == s { break }
            s = next
        }
        return s
    }

    // MARK: - Include note (Trilium `<section class="include-note">`)

    private func applyIncludeNoteResolutionIfNeeded() async {
        guard let note, note.type == .text else { return }
        guard let profileId = serverProfileId, !profileId.isEmpty else { return }
        guard var html = contentString else { return }

        if html.contains("include-note") {
            let resolved = await resolveIncludeNotesInHTML(html, rootNoteId: noteId)
            if resolved != html {
                contentString = resolved
                html = resolved
            }
        }
        // Include resolution can embed nested HTML with new api/images URLs — inline again.
        guard var after = contentString else { return }
        if after.contains("api/images") || after.contains("api/attachments") {
            let inlined = await inlineAttachmentImages(in: after)
            if inlined != after {
                contentString = inlined
                after = inlined
            }
        }
        let annotated = Self.annotateImageLinkApiImageTagsMissingNoteId(in: after)
        if annotated != after {
            contentString = annotated
            after = annotated
        }
        // Wrap `~imageLink` targets that are canvas/mermaid notes (same card chrome as include-note).
        if after.contains("data-trinote-image-note-id") {
            let wrapped = await wrapImageLinkCanvasMermaidCards(in: after)
            if wrapped != after {
                contentString = wrapped
            }
        }
    }

    /// When `~imageLink` points at a canvas or mermaid note, wrap the figure (or bare `<img>`) in the same
    /// `.trinote-include` card used for include-note previews. Skips images nested inside an already-resolved include card.
    private func wrapImageLinkCanvasMermaidCards(in html: String) async -> String {
        let pattern = try! NSRegularExpression(
            pattern: #"<img\b[^>]*\bdata-trinote-image-note-id\s*=\s*["']([^"']+)["'][^>]*/?>"#,
            options: [.caseInsensitive]
        )
        let htmlNS = html as NSString
        let full = NSRange(location: 0, length: htmlNS.length)
        let matches = pattern.matches(in: html, options: [], range: full)
        guard !matches.isEmpty else { return html }

        let ms = NSMutableString(string: html)
        for match in matches.sorted(by: { $0.range.location > $1.range.location }) {
            guard match.numberOfRanges >= 2 else { continue }
            let imgRange = match.range(at: 0)
            let idRange = match.range(at: 1)
            guard idRange.location != NSNotFound else { continue }
            let noteId = htmlNS.substring(with: idRange).trimmingCharacters(in: .whitespacesAndNewlines)
            guard !noteId.isEmpty else { continue }

            if Self.isImageLinkInsideOpenTrinoteInclude(html: html, imgUTF16Location: imgRange.location) {
                continue
            }

            guard let meta = await resolvedNoteTypeAndTitleForImageLinkWrap(noteId: noteId) else {
                continue
            }
            guard meta.type == .canvas || meta.type == .mermaid else {
                continue
            }

            let replaceRange = Self.expandImageLinkFigureNSRange(html: htmlNS, imgRange: imgRange)
            let imgTag = htmlNS.substring(with: imgRange)
            let cleaned = Self.stripTrinoteImageNoteIdAttribute(from: imgTag)

            let bodyHTML: String
            if meta.type == .mermaid {
                let source = await Self.loadRawMermaidSourceForImageLinkWrap(
                    noteId: noteId,
                    client: client,
                    persistence: persistence,
                    profileId: serverProfileId,
                    isOnline: isOnline
                )
                if let source, let svg = await MermaidRenderer.shared.render(source: source) {
                    bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--mermaid\">\(svg)</div>"
                } else {
                    bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--image\">\(cleaned)</div>"
                }
            } else if meta.type == .canvas {
                // `api/images/{noteId}` does not reliably return image bytes for canvas notes (Trilium often
                // serves the Excalidraw JSON), which renders as a broken image in the reader. Mirror the
                // include-canvas path and inline `canvas-export.svg` directly as a data URI. Falls back to
                // the original `<img>` (kept inside an `__inner--image` wrapper) when offline / no attachment.
                if let svg = await canvasExportSVGForEditor(noteId: noteId) {
                    let dataURI = Self.svgDataURI(svg)
                    let escSrc = dataURI
                        .replacingOccurrences(of: "&", with: "&amp;")
                        .replacingOccurrences(of: "\"", with: "&quot;")
                    let imgTag = "<img class=\"trinote-include__img\" src=\"\(escSrc)\" alt=\"\" />"
                    bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--image\">\(imgTag)</div>"
                } else {
                    bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--image\">\(cleaned)</div>"
                }
            } else {
                // Unreachable after `guard meta.type == .canvas || meta.type == .mermaid` — satisfies exhaustive `let bodyHTML`.
                bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--image\">\(cleaned)</div>"
            }

            let card = IncludeNoteResolver.wrapCard(
                noteId: noteId,
                boxSize: "medium",
                noteType: meta.type.rawValue,
                title: meta.title,
                bodyHTML: bodyHTML
            )
            ms.replaceCharacters(in: replaceRange, with: card)
        }
        return ms as String
    }

    /// Loads the raw mermaid source (UTF-8 string) for `noteId` from SwiftData cache, falling back to
    /// `getNoteContent` when online. Mirrors `IncludeNoteResolver.loadRawBodyString` but is reachable
    /// from `wrapImageLinkCanvasMermaidCards`. Static so it can be called without capturing `self`.
    private static func loadRawMermaidSourceForImageLinkWrap(
        noteId: String,
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        profileId: String?,
        isOnline: Bool
    ) async -> String? {
        guard let profileId, !profileId.isEmpty else {
            return nil
        }
        if let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId),
           let data = cached.content, !data.isEmpty,
           let str = String(data: data, encoding: .utf8) {
            return IncludeNoteResolver.normalizedMermaidSource(str)
        }
        guard isOnline, let client else {
            return nil
        }
        do {
            let data = try await client.getNoteContent(noteId)
            let parentNoteIds = (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.parentNoteIds ?? []
            let policy = CacheExclusionPolicy(persistence: persistence)
            try? persistence.cacheNoteContentIfAllowed(
                noteId,
                content: data,
                parentNoteIds: parentNoteIds,
                serverProfileId: profileId,
                utcDateModified: nil,
                policy: policy
            )
            if let str = String(data: data, encoding: .utf8) {
                return IncludeNoteResolver.normalizedMermaidSource(str)
            }
            return nil
        } catch {
            return nil
        }
    }

    private func resolvedNoteTypeAndTitleForImageLinkWrap(noteId: String) async -> (type: NoteType, title: String)? {
        guard let profileId = serverProfileId, !profileId.isEmpty else { return nil }
        if let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId) {
            let type = NoteType(rawValue: cached.noteType) ?? .text
            let trimmed = cached.title.trimmingCharacters(in: .whitespacesAndNewlines)
            let title = trimmed.isEmpty ? noteId : trimmed
            return (type, title)
        }
        guard isOnline, let client else { return nil }
        do {
            let response = try await client.getNote(noteId)
            persistNoteResponse(response, profileId: profileId)
            try? persistence.commitBatch()
            let item = NoteItem(from: response)
            let trimmed = item.title.trimmingCharacters(in: .whitespacesAndNewlines)
            let title = trimmed.isEmpty ? noteId : trimmed
            return (item.type, title)
        } catch {
            return nil
        }
    }

    private static func stripTrinoteImageNoteIdAttribute(from imgTag: String) -> String {
        let p = try! NSRegularExpression(
            pattern: #"\sdata-trinote-image-note-id\s*=\s*["'][^"']*["']"#,
            options: [.caseInsensitive]
        )
        let ns = imgTag as NSString
        return p.stringByReplacingMatches(in: imgTag, range: NSRange(location: 0, length: ns.length), withTemplate: "")
    }

    /// True when the UTF-16 `imgUTF16Location` in `html` lies inside an unclosed `<section class="trinote-include" …>`.
    private static func isImageLinkInsideOpenTrinoteInclude(html: String, imgUTF16Location: Int) -> Bool {
        let htmlNS = html as NSString
        guard imgUTF16Location > 0, imgUTF16Location <= htmlNS.length else { return false }
        let prefix = htmlNS.substring(with: NSRange(location: 0, length: imgUTF16Location))
        let prefixNS = prefix as NSString
        let openPattern = try! NSRegularExpression(
            pattern: #"(?i)<section\b[^>]*\bclass=["'][^"']*\btrinote-include\b[^"']*["'][^>]*>"#,
            options: []
        )
        let closePattern = try! NSRegularExpression(pattern: #"(?i)</section>"#, options: [])
        var depth = 0
        var pos = 0
        let len = prefixNS.length
        while pos < len {
            let rest = NSRange(location: pos, length: len - pos)
            let o = openPattern.firstMatch(in: prefix, options: [], range: rest)
            let c = closePattern.firstMatch(in: prefix, options: [], range: rest)
            let oLoc = o?.range.location ?? Int.max
            let cLoc = c?.range.location ?? Int.max
            if oLoc == Int.max && cLoc == Int.max { break }
            if cLoc < oLoc {
                guard let cMatch = c else { break }
                depth = max(0, depth - 1)
                pos = NSMaxRange(cMatch.range)
            } else {
                guard let oMatch = o else { break }
                depth += 1
                pos = NSMaxRange(oMatch.range)
            }
        }
        return depth > 0
    }

    /// If the `<img>` sits in `<figure class="…image…">`, return the full figure range; otherwise the `img` range.
    private static func expandImageLinkFigureNSRange(html: NSString, imgRange: NSRange) -> NSRange {
        guard NSMaxRange(imgRange) <= html.length else { return imgRange }
        guard imgRange.location > 0 else { return imgRange }
        let before = html.substring(with: NSRange(location: 0, length: imgRange.location))
        let beforeNS = before as NSString
        var lastFig = NSNotFound
        var search = NSRange(location: 0, length: beforeNS.length)
        while true {
            let found = beforeNS.range(of: "<figure", options: [.caseInsensitive], range: search)
            if found.location == NSNotFound { break }
            lastFig = found.location
            let next = found.location + 1
            if next >= beforeNS.length { break }
            search = NSRange(location: next, length: beforeNS.length - next)
        }
        if lastFig == NSNotFound { return imgRange }

        let openScanEnd = min(lastFig + 500, html.length)
        let tagClose = html.range(of: ">", options: [], range: NSRange(location: lastFig, length: openScanEnd - lastFig))
        if tagClose.location == NSNotFound { return imgRange }
        let openTag = html.substring(with: NSRange(location: lastFig, length: tagClose.location - lastFig + 1))
        let openLower = openTag.lowercased()
        guard openLower.contains("class="), openLower.contains("image") else { return imgRange }

        // Require immediate enclosure: the first `</figure>` after this `<figure…>` must come *after*
        // the `<img>`; otherwise an unwrapped `<img>` between two figures would pair with the wrong
        // opener and swallow unrelated HTML.
        let afterOpenTag = tagClose.location + 1
        guard afterOpenTag <= html.length else { return imgRange }
        let firstClose = html.range(
            of: "</figure>",
            options: [.caseInsensitive],
            range: NSRange(location: afterOpenTag, length: html.length - afterOpenTag)
        )
        if firstClose.location == NSNotFound { return imgRange }
        if firstClose.location < imgRange.location { return imgRange }
        return NSRange(location: lastFig, length: NSMaxRange(firstClose) - lastFig)
    }

    // MARK: - Editor display decoration (linked canvas/mermaid/imageLink → inlined data URIs)

    /// Replaces every `<img src="…api/(images|attachments)/{id}/…">` with an inlined `data:` URI so the rich text
    /// editor's bundle-loaded `WKWebView` (which has no access to the Trilium server's relative paths) can
    /// actually render the picture. Canvas notes get their `canvas-export.svg` attachment, mermaid notes get a
    /// freshly rendered SVG via `MermaidRenderer`, and other targets reuse the same image cache / `getNoteContent` /
    /// `getAttachmentContent` paths as `inlineAttachmentImages`.
    ///
    /// The original `src` is preserved in `data-trinote-original-src` (round-tripped through TipTap by way of the
    /// `originalSrc` attribute added in `editor.html`), so `undecorateLinkedImagesFromEditor` can restore the
    /// canonical Trilium HTML before saving or storing drafts.
    private func decorateLinkedImagesForEditor(in html: String) async -> String {
        guard html.localizedCaseInsensitiveContains("api/images")
                || html.localizedCaseInsensitiveContains("api/attachments") else { return html }

        // `(?i)` would put NSRegularExpression into a slow path on long strings; we use `.caseInsensitive` instead.
        let pattern = try! NSRegularExpression(
            pattern: #"<img\b([^>]*?)\bsrc\s*=\s*(["'])([^"']*?api/(attachments|images)/([a-zA-Z0-9_-]+)/[^"']*)\2([^>]*?)>"#,
            options: [.caseInsensitive]
        )
        let htmlNS = html as NSString
        let full = NSRange(location: 0, length: htmlNS.length)
        let matches = pattern.matches(in: html, options: [], range: full)
        guard !matches.isEmpty else { return html }

        let ms = NSMutableString(string: html)
        for match in matches.sorted(by: { $0.range.location > $1.range.location }) {
            guard match.numberOfRanges >= 7 else { continue }
            let preAttrs = htmlNS.substring(with: match.range(at: 1))
            let quote = htmlNS.substring(with: match.range(at: 2))
            let originalSrc = htmlNS.substring(with: match.range(at: 3))
            let routeType = htmlNS.substring(with: match.range(at: 4)).lowercased()
            let entityId = htmlNS.substring(with: match.range(at: 5))
            let postAttrs = htmlNS.substring(with: match.range(at: 6))

            // Skip if this <img> already carries `data-trinote-original-src` — likely a re-decoration pass
            // (e.g. the user just toggled edit mode without fully exiting and the editor still holds decorated HTML).
            if preAttrs.localizedCaseInsensitiveContains("data-trinote-original-src")
                || postAttrs.localizedCaseInsensitiveContains("data-trinote-original-src") {
                continue
            }

            // Canvas/mermaid `~imageLink` references render as broken images in the editor (they are not real
            // image bytes), so we swap the whole `<figure>…<img>…</figure>` block for a `<section class="include-note">`.
            // The TipTap `IncludeNote` extension preserves `data-trinote-imagelink-original-src`, and
            // `undecorateLinkedImagesFromEditor` flips the section back into the canonical figure-wrapped imageLink HTML
            // tag on save so we never poison Trilium's `~imageLink` schema with an `~includeNote` reference.
            if routeType == "images",
               let meta = await resolvedNoteTypeAndTitleForImageLinkWrap(noteId: entityId),
               meta.type == .canvas || meta.type == .mermaid {
                let escId = entityId
                    .replacingOccurrences(of: "&", with: "&amp;")
                    .replacingOccurrences(of: "\"", with: "&quot;")
                let escSrc = originalSrc
                    .replacingOccurrences(of: "&", with: "&amp;")
                    .replacingOccurrences(of: "\"", with: "&quot;")
                let section = "<section class=\"include-note\" data-note-id=\"\(escId)\" data-box-size=\"medium\" data-trinote-imagelink-original-src=\"\(escSrc)\"></section>"
                let replaceRange = Self.expandImageLinkFigureNSRange(html: htmlNS, imgRange: match.range)
                ms.replaceCharacters(in: replaceRange, with: section)
                continue
            }

            let dataURI = await editorInlinedDataURI(routeType: routeType, entityId: entityId)
            guard let dataURI else {
                continue
            }

            let escOrig = originalSrc
                .replacingOccurrences(of: "&", with: "&amp;")
                .replacingOccurrences(of: "\"", with: "&quot;")
            let newTag = "<img\(preAttrs) src=\(quote)\(dataURI)\(quote) data-trinote-original-src=\"\(escOrig)\"\(postAttrs)>"
            ms.replaceCharacters(in: match.range, with: newTag)
        }
        return ms as String
    }

    /// Resolves the appropriate inlined `data:` URI for a single decorated `<img>`. Canvas → `canvas-export.svg`
    /// attachment, mermaid → freshly rendered SVG via `MermaidRenderer`, everything else → the same byte-fetch
    /// path as `inlineAttachmentImages` (image cache → server). Returns `nil` if no usable bytes are available.
    private func editorInlinedDataURI(routeType: String, entityId: String) async -> String? {
        if routeType == "images" {
            if let meta = await resolvedNoteTypeAndTitleForImageLinkWrap(noteId: entityId) {
                switch meta.type {
                case .mermaid:
                    let source = await Self.loadRawMermaidSourceForImageLinkWrap(
                        noteId: entityId,
                        client: client,
                        persistence: persistence,
                        profileId: serverProfileId,
                        isOnline: isOnline
                    )
                    guard let source, !source.isEmpty else { return nil }
                    guard let svg = await MermaidRenderer.shared.render(source: source) else { return nil }
                    return Self.svgDataURI(svg)
                case .canvas:
                    guard let svg = await canvasExportSVGForEditor(noteId: entityId) else { return nil }
                    return Self.svgDataURI(svg)
                default:
                    break
                }
            }
            // Fall through to the byte-fetch path for image-typed notes (and unknown/text targets that
            // happen to have inlinable content — same heuristic as `inlineAttachmentImages`).
            return await fetchInlinableDataURI(routeType: "images", entityId: entityId)
        } else {
            return await fetchInlinableDataURI(routeType: "attachments", entityId: entityId)
        }
    }

    /// Mirrors the byte-fetch + plausibility check from `inlineAttachmentImages`, but returns the data URI as a
    /// string instead of mutating an HTML buffer. Caches successful downloads in the same image cache, so a
    /// subsequent read-only render hits the cache.
    private func fetchInlinableDataURI(routeType: String, entityId: String) async -> String? {
        let profileId = self.serverProfileId ?? ""
        let clientForLoad: (any TriliumClientProtocol)? = isOnline ? client : nil
        guard let data = await TriliumInlineImageCaching.loadImageData(
            routeType: routeType,
            entityId: entityId,
            client: clientForLoad,
            persistence: persistence,
            serverProfileId: profileId,
            sourceNoteId: noteId,
            parentNoteIds: parentNoteIdsForCache(noteId: noteId)
        ), data.isPlausibleInlineImagePayload else {
            return nil
        }
        let mime = data.detectImageMIME()
        return "data:\(mime);base64,\(data.base64EncodedString())"
    }

    /// Loads the canvas-export.svg for `noteId`, mirroring `IncludeNoteResolver.canvasExportSVGPreviewTag` but
    /// returning the raw SVG bytes (as a UTF-8 string) so we can build a `data:image/svg+xml;…` URI.
    private func canvasExportSVGForEditor(noteId: String) async -> String? {
        guard let profileId = serverProfileId, !profileId.isEmpty else { return nil }
        let clientForLoad: (any TriliumClientProtocol)? = isOnline ? client : nil
        guard let attachmentId = await canvasExportSVGAttachmentIdForEditor(noteId: noteId) else { return nil }
        guard let data = await TriliumInlineImageCaching.loadImageData(
            routeType: "attachments",
            entityId: attachmentId,
            client: clientForLoad,
            persistence: persistence,
            serverProfileId: profileId,
            sourceNoteId: noteId,
            parentNoteIds: parentNoteIdsForCache(noteId: noteId)
        ), !data.isEmpty else {
            return nil
        }
        return String(data: data, encoding: .utf8)
    }

    private func canvasExportSVGAttachmentIdForEditor(noteId: String) async -> String? {
        guard isOnline, let client else { return nil }
        return await TriliumInlineImageCaching.canvasExportSVGAttachmentId(noteId: noteId, client: client)
    }

    private static func svgDataURI(_ svg: String) -> String {
        let b64 = Data(svg.utf8).base64EncodedString()
        return "data:image/svg+xml;base64,\(b64)"
    }

    /// Replaces every `<section class="include-note" data-trinote-imagelink-original-src="…">…</section>` (the
    /// Trinote-only display swap for canvas/mermaid `~imageLink` references — see `decorateLinkedImagesForEditor`)
    /// with the canonical `<figure class="image"><img src="…"></figure>` so the saved HTML keeps the imageLink
    /// schema. Real `~includeNote` sections (which never have the marker attribute) are left untouched.
    private static func unwrapImageLinkIncludeSections(in html: String) -> String {
        // Ordering of attributes inside the `<section …>` opening tag is not stable (TipTap may rewrite them), so
        // we capture everything before/after `data-trinote-imagelink-original-src` and verify the `class` attribute
        // mentions `include-note` after extraction. `[\s\S]*?` lets us cross newlines for the body without enabling
        // global multiline mode.
        let pattern = try! NSRegularExpression(
            pattern: #"<section\b([^>]*?)\bdata-trinote-imagelink-original-src\s*=\s*(["'])([^"']*)\2([^>]*)>([\s\S]*?)</section>"#,
            options: [.caseInsensitive]
        )
        let htmlNS = html as NSString
        let full = NSRange(location: 0, length: htmlNS.length)
        let matches = pattern.matches(in: html, options: [], range: full)
        guard !matches.isEmpty else { return html }

        let ms = NSMutableString(string: html)
        for match in matches.sorted(by: { $0.range.location > $1.range.location }) {
            guard match.numberOfRanges >= 5 else { continue }
            let pre = htmlNS.substring(with: match.range(at: 1))
            let post = htmlNS.substring(with: match.range(at: 4))
            let combined = pre + " " + post
            // Real include-note sections without the marker should never reach this regex (the marker is required
            // by the pattern), but double-check the class so a stray attribute on some other section doesn't get
            // rewritten as an `<img>`.
            let lower = combined.lowercased()
            guard lower.contains("class=") && lower.contains("include-note") else { continue }
            let storedSrc = htmlNS.substring(with: match.range(at: 3))
            let originalSrc = storedSrc
                .replacingOccurrences(of: "&quot;", with: "\"")
                .replacingOccurrences(of: "&amp;", with: "&")
            let escSrc = originalSrc
                .replacingOccurrences(of: "&", with: "&amp;")
                .replacingOccurrences(of: "\"", with: "&quot;")
            let img = "<figure class=\"image\"><img src=\"\(escSrc)\"></figure>"
            ms.replaceCharacters(in: match.range, with: img)
        }
        return ms as String
    }

    /// Reverses `decorateLinkedImagesForEditor`: for every `<img>` carrying `data-trinote-original-src`, restore
    /// the original server-relative URL onto `src` (and `data-cke-saved-src` if Trilium had been writing both),
    /// then strip `data-trinote-original-src`. Also unwraps any `<section class="include-note">` that carries
    /// `data-trinote-imagelink-original-src` — those are Trinote-only display swaps for canvas/mermaid `~imageLink`
    /// references and must round-trip back to Trilium's figure-wrapped imageLink HTML so we never silently rewrite the
    /// canonical Trilium HTML into an `~includeNote` reference. Pure string surgery — safe to call from any actor.
    static func undecorateLinkedImagesFromEditor(in html: String) -> String {
        let needsImgUndecorate = html.localizedCaseInsensitiveContains("data-trinote-original-src")
        let needsSectionUndecorate = html.localizedCaseInsensitiveContains("data-trinote-imagelink-original-src")
        guard needsImgUndecorate || needsSectionUndecorate else { return html }
        var working = html
        if needsSectionUndecorate {
            working = unwrapImageLinkIncludeSections(in: working)
            if !working.localizedCaseInsensitiveContains("data-trinote-original-src") {
                return working
            }
        }
        let tagPattern = try! NSRegularExpression(pattern: #"<img\b([^>]*)>"#, options: [.caseInsensitive])
        let htmlNS = working as NSString
        let full = NSRange(location: 0, length: htmlNS.length)
        let matches = tagPattern.matches(in: working, options: [], range: full)
        guard !matches.isEmpty else { return working }

        let origSrcPattern = try! NSRegularExpression(
            pattern: #"\sdata-trinote-original-src\s*=\s*(["'])([^"']*)\1"#,
            options: [.caseInsensitive]
        )
        let stripPattern = try! NSRegularExpression(
            pattern: #"\sdata-trinote-original-src\s*=\s*(["'])[^"']*\1"#,
            options: [.caseInsensitive]
        )
        let srcReplacePattern = try! NSRegularExpression(
            pattern: #"(\s)src(\s*=\s*)(["'])[^"']*\3"#,
            options: [.caseInsensitive]
        )
        let ckeSavedSrcPattern = try! NSRegularExpression(
            pattern: #"(\s)data-cke-saved-src(\s*=\s*)(["'])[^"']*\3"#,
            options: [.caseInsensitive]
        )

        let ms = NSMutableString(string: working)
        for match in matches.sorted(by: { $0.range.location > $1.range.location }) {
            let inner = htmlNS.substring(with: match.range(at: 1))
            let innerNS = inner as NSString
            let innerFull = NSRange(location: 0, length: innerNS.length)
            guard let origMatch = origSrcPattern.firstMatch(in: inner, options: [], range: innerFull),
                  origMatch.numberOfRanges >= 3 else { continue }
            let storedOrig = innerNS.substring(with: origMatch.range(at: 2))
            let originalSrc = storedOrig
                .replacingOccurrences(of: "&quot;", with: "\"")
                .replacingOccurrences(of: "&amp;", with: "&")
            // `escapedTemplate(for:)` keeps `$`/`\` in the URL from being interpreted as backreferences.
            let templateOrig = NSRegularExpression.escapedTemplate(for: originalSrc)

            var newInner = srcReplacePattern.stringByReplacingMatches(
                in: inner, options: [], range: innerFull,
                withTemplate: "$1src$2$3\(templateOrig)$3"
            )
            // CKEditor's older saved HTML used both `src` and `data-cke-saved-src`. Keep them aligned.
            let afterSrcNS = newInner as NSString
            let afterSrcRange = NSRange(location: 0, length: afterSrcNS.length)
            if ckeSavedSrcPattern.firstMatch(in: newInner, options: [], range: afterSrcRange) != nil {
                newInner = ckeSavedSrcPattern.stringByReplacingMatches(
                    in: newInner, options: [], range: afterSrcRange,
                    withTemplate: "$1data-cke-saved-src$2$3\(templateOrig)$3"
                )
            }
            let strippedNS = newInner as NSString
            let strippedRange = NSRange(location: 0, length: strippedNS.length)
            newInner = stripPattern.stringByReplacingMatches(
                in: newInner, options: [], range: strippedRange, withTemplate: ""
            )

            ms.replaceCharacters(in: match.range, with: "<img\(newInner)>")
        }
        return ms as String
    }

    /// Re-expand includes for read-only display after saving canonical editor HTML (`raw` + `contentString` already match saved body).
    private func refreshResolvedTextNoteDisplayAfterSave() async {
        guard note?.type == .text else { return }
        guard var s = contentString, !s.isEmpty else { return }
        if s.contains("api/images") || s.contains("api/attachments") {
            let inlined = await inlineAttachmentImages(in: s)
            if inlined != s {
                contentString = inlined
                s = inlined
            }
        }
        await applyIncludeNoteResolutionIfNeeded()
    }

    /// HTML for one `<section class="include-note">` placeholder (used by the rich-text editor NodeView preview).
    func resolvedIncludePreviewHTML(noteId: String, boxSize: String) async -> String {
        let includedId = noteId.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !includedId.isEmpty else { return "" }
        let box = Self.normalizedIncludeBoxSize(boxSize)
        let esc = includedId.replacingOccurrences(of: "&", with: "&amp;").replacingOccurrences(of: "\"", with: "&quot;")
        let fragment = "<section class=\"include-note\" data-note-id=\"\(esc)\" data-box-size=\"\(box)\"></section>"
        return await resolveIncludeNotesInHTML(fragment, rootNoteId: self.noteId)
    }

    private static func normalizedIncludeBoxSize(_ raw: String) -> String {
        let s = raw.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        switch s {
        case "small", "medium", "full": return s
        default: return "medium"
        }
    }

    private func resolveIncludeNotesInHTML(_ html: String, rootNoteId: String) async -> String {
        let profileId = serverProfileId ?? ""
        let resolver = IncludeNoteResolver(
            client: client,
            persistence: persistence,
            profileId: profileId,
            protectedSessionActive: appState.protectedSessionActive,
            isOnline: appState.isOnline,
            inlineAttachmentImages: { [weak self] h in
                guard let self else { return h }
                return await self.inlineAttachmentImages(in: h)
            }
        )
        return await resolver.resolve(html: html, seenNoteIds: [rootNoteId], nestingLevel: 0, maxNesting: 3)
    }

    /// Pull-to-refresh: fetches metadata + content into local vars first,
    /// then applies everything to @Observable state in one batch. This
    /// prevents mid-flight SwiftUI re-evaluation from cancelling the
    /// URLSession content request.
    ///
    /// - Parameter force: When `true` (the default for the `.refreshable` gesture), always
    ///   re-fetches `getNoteContent` and re-publishes `contentString` even if the server's
    ///   `utcDateModified` matches the SwiftData cache. This is what the user expects from a
    ///   pull-to-refresh gesture, and avoids a stale-view bug where SyncManager had already
    ///   written the latest body to SwiftData (so the timestamps match) while the live
    ///   `contentString` still held the previous revision.
    func refresh(force: Bool = false) async {
        guard let client else { return }
        let nid = self.noteId
        let profileId = self.serverProfileId ?? ""

        // 1) Fetch metadata into local vars (no @Observable writes yet)
        var metaResponse: NoteResponse?
        var serverDate: String?
        do {
            let response = try await client.getNote(nid)
            if response.isDeleted {
                handleServerDeletedNote(noteId: nid)
                return
            }
            metaResponse = response
            serverDate = response.utcDateModified
            serverBlobId = response.blobId
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            if case .notFound = apiError {
                handleServerDeletedNote(noteId: nid)
                return
            }
            Log.api.error("Note detail refresh: getNote failed — leaving UI unchanged")
        }

        // 2) Compare timestamps
        let cachedNote = try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId)
        let cachedDate = cachedNote?.utcDateModified
        let serverIsNewer = serverDate != nil && (cachedDate == nil || serverDate! > cachedDate!)

        loadContentFromCache()
        let hasUsableBody = hasUsableDisplayedBodyContent()
        let bodyConfirmedEmpty = TriliumNoteBodyPolicy.isBodyConfirmedEmpty(
            serverBlobId: metaResponse?.blobId ?? serverBlobId,
            cachedContent: cachedNote?.content,
            contentFetchedAt: cachedNote?.contentFetchedAt
        )

        if !force, !serverIsNewer, hasUsableBody || bodyConfirmedEmpty {
            if let response = metaResponse {
                self.note = NoteItem(from: response)
                self.serverUtcDateModified = serverDate
                self.serverVerified = true
                await updateSharedPublicState(client: client)
            }
            // SyncManager may have written the latest body to SwiftData while this view was
            // open. Re-publish from cache so the WKWebView picks it up — without this, the
            // user has to back out and re-enter the note to see the new content (`load()`
            // does the same `loadContentFromCache()` call on entry).
            if let raw = self.rawContentString,
               raw.localizedCaseInsensitiveContains("api/attachments/")
                   || raw.localizedCaseInsensitiveContains("api/images/") {
                self.contentString = await self.inlineAttachmentImages(in: raw)
            }
            await applyIncludeNoteResolutionIfNeeded()
            await loadChildNotes()
            return
        }

        // 3) Fetch content into local vars (still no @Observable writes)
        var fetchedData: Data?
        var fetchedHTML: String?
        var skipApplyingStaleMetaNote = false
        do {
            let data = try await client.getNoteContent(nid)
            fetchedData = data
            fetchedHTML = String(data: data, encoding: .utf8)
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            Log.api.error("Note detail refresh: getNoteContent failed — will apply meta only; content may stay stale or empty")
            if let meta = metaResponse, meta.isProtected, Self.protectedSessionLikelyEnded(error) {
                self.appState.protectedSessionActive = false
                self.needsProtectedSession = true
                skipApplyingStaleMetaNote = true
                await resyncNoteTitlesWithProtectedSession()
            }
        }

        // 4) All network done — apply everything to @Observable state
        if let response = metaResponse {
            if !skipApplyingStaleMetaNote {
                self.note = NoteItem(from: response)
                self.serverUtcDateModified = serverDate
                self.serverVerified = true
                if let pid = self.serverProfileId {
                    persistNoteResponse(response, profileId: pid)
                    try? persistence.commitBatch()
                }
                await updateSharedPublicState(client: client)
            } else {
                self.serverUtcDateModified = serverDate
                self.serverVerified = true
            }
        }

        guard let data = fetchedData else {
            await loadChildNotes()
            return
        }
        self.content = data
        self.serverContentHash = fetchedHTML?.hashValue
        self.rawContentString = fetchedHTML

        var displayHTML = fetchedHTML
        if let html = displayHTML,
           html.contains("api/attachments/") || html.contains("api/images/") {
            displayHTML = await self.inlineAttachmentImages(in: html)
        }
        self.contentString = displayHTML
        await applyIncludeNoteResolutionIfNeeded()

        if let pid = self.serverProfileId {
            cacheNoteContentIfAllowed(
                nid, content: data, profileId: pid,
                utcDateModified: serverDate
            )
        }
        self.checkForDraft()

        await loadChildNotes()
    }

    func loadAttachments() async {
        let nid = self.noteId
        guard let client else { return }
        do {
            let responses = try await client.getNoteAttachments(nid)
            self.attachments = responses.map(AttachmentItem.init)
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError { return }
            Log.api.error("Failed to load attachments")
        }
    }

    func loadBreadcrumbs(treeVM: TreeViewModel?) async {
        let nid = self.noteId
        if let treeVM {
            self.breadcrumbs = await treeVM.breadcrumbs(for: nid)
        }
    }

    // MARK: - Checkbox Toggle

    func toggleCheckbox(index: Int, checked: Bool) {
        guard let raw = rawContentString ?? contentString else { return }

        let checkboxPattern = try! NSRegularExpression(
            pattern: #"<input\s+[^>]*type\s*=\s*["']checkbox["'][^>]*/?\s*>"#,
            options: .caseInsensitive
        )
        let nsRaw = raw as NSString
        let matches = checkboxPattern.matches(in: raw, range: NSRange(location: 0, length: nsRaw.length))

        guard index < matches.count else { return }
        let matchRange = matches[index].range
        let original = nsRaw.substring(with: matchRange)

        var updated: String
        if checked {
            if original.contains("checked") { return }
            updated = original.replacingOccurrences(of: ">", with: " checked=\"checked\">")
            // Handle self-closing tags
            updated = updated.replacingOccurrences(of: "/ checked=\"checked\">", with: " checked=\"checked\" />")
        } else {
            updated = original
                .replacingOccurrences(of: " checked=\"checked\"", with: "")
                .replacingOccurrences(of: " checked", with: "")
                .replacingOccurrences(of: "checked=\"checked\" ", with: "")
                .replacingOccurrences(of: "checked ", with: "")
        }

        let newRaw = (raw as NSString).replacingCharacters(in: matchRange, with: updated)
        self.rawContentString = newRaw
        self.serverContentHash = newRaw.hashValue

        if let display = contentString {
            let nsDisplay = display as NSString
            let displayMatches = checkboxPattern.matches(in: display, range: NSRange(location: 0, length: nsDisplay.length))
            if index < displayMatches.count {
                let displayOriginal = nsDisplay.substring(with: displayMatches[index].range)
                var displayUpdated: String
                if checked {
                    displayUpdated = displayOriginal.replacingOccurrences(of: ">", with: " checked=\"checked\">")
                    displayUpdated = displayUpdated.replacingOccurrences(of: "/ checked=\"checked\">", with: " checked=\"checked\" />")
                } else {
                    displayUpdated = displayOriginal
                        .replacingOccurrences(of: " checked=\"checked\"", with: "")
                        .replacingOccurrences(of: " checked", with: "")
                        .replacingOccurrences(of: "checked=\"checked\" ", with: "")
                        .replacingOccurrences(of: "checked ", with: "")
                }
                self.contentString = (display as NSString).replacingCharacters(in: displayMatches[index].range, with: displayUpdated)
            }
        }

        saveNoteBodyChange(newRaw)
    }

    // MARK: - List Item Reorder

    /// Moves a list item (`ul`/`ol`/`todo-list`) among its siblings without entering the editor.
    /// `beforeIndex` is the document-wide interactive list-item index to insert before, or `nil` to append.
    func reorderListItem(fromIndex: Int, beforeIndex: Int?) {
        guard let raw = rawContentString ?? contentString else { return }
        guard let newRaw = HTMLTodoListReorder.movingListItem(
            in: raw,
            fromIndex: fromIndex,
            beforeIndex: beforeIndex
        ) else { return }

        self.rawContentString = newRaw
        self.serverContentHash = newRaw.hashValue

        if let display = contentString,
           let newDisplay = HTMLTodoListReorder.movingListItem(
               in: display,
               fromIndex: fromIndex,
               beforeIndex: beforeIndex
           ) {
            self.contentString = newDisplay
        }

        saveNoteBodyChange(newRaw)
    }

    /// Backward-compatible name for todo-only call sites.
    func reorderCheckbox(fromIndex: Int, beforeIndex: Int?) {
        reorderListItem(fromIndex: fromIndex, beforeIndex: beforeIndex)
    }

    private func saveNoteBodyChange(_ html: String) {
        let nid = self.noteId
        let data = Data(html.utf8)
        let mime = note?.mime ?? "text/html"
        guard let profileId = serverProfileId else { return }

        do {
            cacheNoteContentIfAllowed(nid, content: data, profileId: profileId)
            // Pass nil so the upsert reads baseUtcDateModified from the cache for new rows.
            // The cache is kept current by the flush after each successful upload, preventing
            // false conflicts when rapid checkbox toggles create successive pending rows.
            try persistence.upsertPendingNoteBodyUpload(
                noteId: nid,
                body: data,
                mime: mime,
                serverProfileId: profileId,
                baseUtcDateModified: nil
            )
            self.content = data
        } catch {
            Log.api.error("Failed to save note body change locally: \(error)")
        }
        appState.backgroundSyncPendingChanges()
    }

    // MARK: - Drafts

    private func checkForDraft() {
        guard let profileId = self.serverProfileId else { return }
        let nid = self.noteId
        let canonicalForDraft = self.rawContentString ?? self.contentString
        if let draft = try? self.persistence.loadDraft(noteId: nid, serverProfileId: profileId) {
            if draft.content != canonicalForDraft {
                self.hasDraft = true
                self.editableContent = draft.content
            } else {
                try? self.persistence.deleteDraft(noteId: nid, serverProfileId: profileId)
                self.hasDraft = false
            }
        }
    }

    func restoreDraft() {
        isEditing = true
        startDraftAutoSave()
        editorDisplayContent = nil
        Task { [weak self] in
            await self?.prepareEditorDisplayContent()
        }
    }

    func discardDraft() {
        guard let profileId = self.serverProfileId else { return }
        try? self.persistence.deleteDraft(noteId: self.noteId, serverProfileId: profileId)
        self.hasDraft = false
        self.editableContent = self.richTextEditorSeedHTML
    }

    /// Called from the rich text editor's JS bridge on every debounced keystroke.
    /// Updates a non-observable backing store to avoid SwiftUI re-evaluation.
    /// The editor emits decorated HTML (data URIs + `data-trinote-original-src` markers); we store the
    /// **undecorated** form so drafts and saves always reflect the canonical Trilium HTML.
    func receiveEditorUpdate(_ html: String) {
        if html.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { return }
        let undecorated = Self.undecorateLinkedImagesFromEditor(in: html)
        if undecorated.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { return }
        _pendingEditorHTML = undecorated
    }

    /// Flushes any pending editor HTML into the observable `editableContent`.
    private func flushPendingEditorContent() {
        if let pending = _pendingEditorHTML {
            editableContent = pending
            _pendingEditorHTML = nil
        }
    }

    func startEditing() {
        _pendingEditorHTML = nil
        if !hasDraft {
            editableContent = richTextEditorSeedHTML
        }
        // Reset the decorated copy so the editor view falls back to its loading state until
        // `prepareEditorDisplayContent` finishes. Without this, switching between notes could
        // briefly show another note's decorated HTML.
        editorDisplayContent = nil
        isEditing = true
        startDraftAutoSave()
        Task { [weak self] in
            await self?.prepareEditorDisplayContent()
        }
    }

    /// Decorates `editableContent` (canvas/mermaid/attachment imageLinks → inlined data URIs) and publishes the
    /// result to `editorDisplayContent` so the rich text editor can render it. Fetches happen via async helpers
    /// (Trilium API + MermaidRenderer); a generation token guards against late completions.
    func prepareEditorDisplayContent() async {
        _editorPrepGeneration &+= 1
        let generation = _editorPrepGeneration
        let source = editableContent
        let decorated = await decorateLinkedImagesForEditor(in: source)
        guard isEditing, generation == _editorPrepGeneration else { return }
        editorDisplayContent = decorated
    }

    /// Canonical stored HTML for TipTap (placeholders), not the read-only `.trinote-include` expansion.
    private var richTextEditorSeedHTML: String {
        if let raw = rawContentString {
            let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
            if !trimmed.isEmpty { return raw }
        }
        return contentString ?? ""
    }

    /// Explicitly leaves the editor *without* keeping any draft of in-progress edits.
    /// Distinct from navigating back, which preserves drafts via `saveDraftLocally()`.
    /// Any in-memory edits are dropped, the on-disk draft (if any) is deleted, and the
    /// note's canonical HTML is restored as the editable content.
    func cancelEditing() {
        draftAutoSaveTask?.cancel()
        _pendingEditorHTML = nil
        if let profileId = self.serverProfileId {
            try? self.persistence.deleteDraft(noteId: self.noteId, serverProfileId: profileId)
        }
        hasDraft = false
        editableContent = richTextEditorSeedHTML
        isEditing = false
        editorDisplayContent = nil
        _editorPrepGeneration &+= 1
    }

    private func startDraftAutoSave() {
        draftAutoSaveTask?.cancel()
        draftAutoSaveTask = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(milliseconds: 5000)
                guard !Task.isCancelled else { return }
                await self?.saveDraftLocally()
            }
        }
    }

    private func saveDraftLocally() {
        flushPendingEditorContent()
        guard let profileId = self.serverProfileId else { return }
        try? self.persistence.saveDraft(noteId: self.noteId, content: self.editableContent, serverProfileId: profileId)
    }

    /// Saves in-progress edits when leaving the screen or backgrounding the app.
    func persistEditingDraftIfNeeded() {
        guard isEditing else { return }
        saveDraftLocally()
    }

    // MARK: - Saving

    private func showTransientEditorMessage(_ message: String) {
        transientEditorMessage = message
        transientEditorMessageTask?.cancel()
        transientEditorMessageTask = Task { @MainActor in
            try? await Task.sleep(nanoseconds: 5_000_000_000)
            guard !Task.isCancelled else { return }
            transientEditorMessage = nil
        }
    }

    /// Persists edited HTML locally and queues a background upload to the server.
    /// This is the primary save path for both online and offline scenarios (optimistic save).
    private func saveNoteBodyLocally(note: NoteItem) {
        let nid = noteId
        let data = Data(editableContent.utf8)
        guard let profileId = serverProfileId else { return }
        isSaving = true
        saveError = nil
        showSaveError = false
        defer { isSaving = false }
        do {
            cacheNoteContentIfAllowed(nid, content: data, profileId: profileId)
            try persistence.upsertPendingNoteBodyUpload(
                noteId: nid,
                body: data,
                mime: note.mime,
                serverProfileId: profileId,
                baseUtcDateModified: nil
            )
            content = data
            contentString = editableContent
            rawContentString = editableContent
            serverContentHash = editableContent.hashValue
            try? persistence.deleteDraft(noteId: nid, serverProfileId: profileId)
            isEditing = false
            hasDraft = false
            draftAutoSaveTask?.cancel()
            if note.type == .text {
                Task { [weak self] in
                    await self?.refreshResolvedTextNoteDisplayAfterSave()
                }
            }
            Log.api.info("Saved note body locally (queued for sync): \(nid)")
        } catch {
            saveError = error.localizedDescription
            showSaveError = true
            saveDraftLocally()
        }
    }

    /// Saves canvas content (Excalidraw JSON body + SVG preview attachment).
    func saveCanvasContent(json: String, svg: String) {
        guard let note else {
            saveError = String(localized: "Could not load this note.", comment: "Save without cached note")
            showSaveError = true
            return
        }
        let nid = noteId
        let data = Data(json.utf8)
        guard let profileId = serverProfileId else { return }
        isSaving = true
        saveError = nil
        showSaveError = false

        do {
            cacheNoteContentIfAllowed(nid, content: data, profileId: profileId)
            try persistence.upsertPendingNoteBodyUpload(
                noteId: nid,
                body: data,
                mime: note.mime.isEmpty ? "application/json" : note.mime,
                serverProfileId: profileId,
                baseUtcDateModified: nil
            )
            content = data
            contentString = json
            rawContentString = json
            serverContentHash = json.hashValue
            try? persistence.deleteDraft(noteId: nid, serverProfileId: profileId)
            isEditing = false
            hasDraft = false
            draftAutoSaveTask?.cancel()
            Log.api.info("Saved canvas body locally (queued for sync): \(nid)")
        } catch {
            saveError = error.localizedDescription
            showSaveError = true
            isSaving = false
            return
        }

        isSaving = false
        appState.backgroundSyncPendingChanges()

        // Upload SVG attachment in the background (best-effort, non-blocking)
        if !svg.isEmpty {
            Task { [weak self] in
                await self?.uploadCanvasSVGAttachment(svg: svg)
            }
        }
    }

    /// Saves spreadsheet content (Univer Sheets workbook JSON, wrapped in Trilium's
    /// `{ version, workbook }` envelope by the JS bridge). No sidecar attachment — Trilium
    /// renders the preview from the JSON itself.
    func saveSpreadsheetContent(json: String) {
        guard let note else {
            saveError = String(localized: "Could not load this note.", comment: "Save without cached note")
            showSaveError = true
            return
        }
        let trimmed = json.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else {
            // Bridge returned nothing — likely Univer hadn't booted. Don't blow away the cached note.
            saveError = String(localized: "Spreadsheet editor wasn't ready. Try again.", comment: "Spreadsheet save with empty payload")
            showSaveError = true
            return
        }
        let nid = noteId
        let data = Data(trimmed.utf8)
        guard let profileId = serverProfileId else { return }
        isSaving = true
        saveError = nil
        showSaveError = false

        do {
            cacheNoteContentIfAllowed(nid, content: data, profileId: profileId)
            try persistence.upsertPendingNoteBodyUpload(
                noteId: nid,
                body: data,
                mime: note.mime.isEmpty ? "application/json" : note.mime,
                serverProfileId: profileId,
                baseUtcDateModified: nil
            )
            content = data
            contentString = trimmed
            rawContentString = trimmed
            serverContentHash = trimmed.hashValue
            try? persistence.deleteDraft(noteId: nid, serverProfileId: profileId)
            isEditing = false
            hasDraft = false
            draftAutoSaveTask?.cancel()
            Log.api.info("Saved spreadsheet body locally (queued for sync): \(nid)")
        } catch {
            saveError = error.localizedDescription
            showSaveError = true
            isSaving = false
            return
        }

        isSaving = false
        appState.backgroundSyncPendingChanges()
    }

    /// Uploads or updates the `canvas-export.svg` attachment for the current canvas note.
    private func uploadCanvasSVGAttachment(svg: String) async {
        guard let client else { return }
        let nid = noteId
        let svgData = Data(svg.utf8)

        let existingAttachment = attachments.first { $0.title == "canvas-export.svg" && $0.mime == "image/svg+xml" }

        do {
            if let existing = existingAttachment {
                try await client.uploadAttachmentContent(existing.attachmentId, data: svgData, contentType: "image/svg+xml")
            } else {
                let base64 = svgData.base64EncodedString()
                let request = CreateAttachmentRequest(
                    ownerId: nid,
                    role: "image",
                    mime: "image/svg+xml",
                    title: "canvas-export.svg",
                    content: base64,
                    position: 0
                )
                _ = try await client.createAttachment(request)
            }
            await loadAttachments()
            Log.api.info("Canvas SVG attachment uploaded for note: \(nid)")
        } catch {
            Log.api.error("Failed to upload canvas SVG attachment: \(error)")
        }
    }

    func unlockProtectedNote(documentPassword: String) async {
        guard let client, let note, note.isProtected else { return }
        let trimmed = documentPassword.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else {
            protectedUnlockError = "Enter the document password used for protected notes in Trilium."
            return
        }
        isUnlockingProtected = true
        protectedUnlockError = nil
        defer { isUnlockingProtected = false }
        do {
            try await client.enterProtectedSession(password: trimmed)
            appState.protectedSessionActive = true
            needsProtectedSession = false
            await loadContent()
            if let profileId = serverProfileId {
                await appState.syncManager.prefetchProtectedNoteBodies(client: client, profileId: profileId)
            }
        } catch {
            protectedUnlockError = APIError.from(error).localizedDescription
        }
    }

    /// - Parameter freshHTML: When provided (e.g. from a JS `getContent()` call), this value
    ///   is used directly instead of the debounce-cached `_pendingEditorHTML`. This ensures
    ///   non-ProseMirror state like table captions is always included in the save.
    func saveContent(freshHTML: String? = nil) {
        if let html = freshHTML {
            let trimmed = html.trimmingCharacters(in: .whitespacesAndNewlines)
            if trimmed.isEmpty {
                let pendingOK = !(_pendingEditorHTML ?? "").trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                let seedOK = !editableContent.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
                if pendingOK, let p = _pendingEditorHTML {
                    editableContent = p
                } else if seedOK {
                    // Keep canonical `editableContent` — JS returned empty but we never got a debounced update.
                } else {
                    editableContent = Self.undecorateLinkedImagesFromEditor(in: html)
                }
                _pendingEditorHTML = nil
            } else {
                // `freshHTML` comes straight from the editor and may still carry decoration markers
                // (data URIs + `data-trinote-original-src`). Undecorate before storing/saving so the
                // canonical Trilium HTML — with its server-relative `api/images/...` references — is preserved.
                editableContent = Self.undecorateLinkedImagesFromEditor(in: html)
                _pendingEditorHTML = nil
            }
        } else {
            flushPendingEditorContent()
        }
        guard let note else {
            self.saveError = String(localized: "Could not load this note.", comment: "Save without cached note")
            self.showSaveError = true
            self.saveDraftLocally()
            return
        }

        saveNoteBodyLocally(note: note)
        appState.backgroundSyncPendingChanges()
        // Editing has ended; clear any decorated copy so re-entering edit mode rebuilds it from
        // the just-saved canonical content.
        editorDisplayContent = nil
        _editorPrepGeneration &+= 1
    }

    func renameNote() async {
        let nid = self.noteId
        let trimmed = self.editedTitle.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        self.isSaving = true
        defer { self.isSaving = false }

        if let client, isOnline {
            do {
                let updated = try await client.updateNote(nid, request: UpdateNoteRequest(title: trimmed, type: nil, mime: nil))
                self.note = NoteItem(from: updated)
                self.editingTitle = false
                if let profileId = serverProfileId {
                    persistNoteResponse(updated, profileId: profileId)
                    try? persistence.commitBatch()
                }
                NotificationCenter.default.post(
                    name: .trinoteTreeShouldRefresh,
                    object: nil,
                    userInfo: ["noteId": nid]
                )
                return
            } catch {
                self.saveError = APIError.from(error).localizedDescription
                self.showSaveError = true
                return
            }
        }

        guard let profileId = serverProfileId else { return }
        if let cached = try? persistence.fetchCachedNote(id: nid, serverProfileId: profileId) {
            cached.title = trimmed
            try? persistence.commitBatch()
        }
        if var n = self.note {
            n.title = trimmed
            self.note = n
        }
        self.editingTitle = false
        try? persistence.upsertPendingNotePatch(noteId: nid, title: trimmed, serverProfileId: profileId)
        appState.backgroundSyncPendingChanges()
        NotificationCenter.default.post(
            name: .trinoteTreeShouldRefresh,
            object: nil,
            userInfo: ["noteId": nid]
        )
    }

    /// Duplicate this note as a sibling under the same parent (first parent if cloned). Opens via navigation from the view.
    func duplicateNote() async -> (noteId: String, title: String)? {
        let nid = self.noteId
        guard let client, let note else {
            self.saveError = "Cannot duplicate while offline."
            self.showSaveError = true
            return nil
        }
        if note.isProtected, !appState.protectedSessionActive {
            self.saveError = "Unlock this protected note before duplicating."
            self.showSaveError = true
            return nil
        }
        let parentId = note.parentNoteIds.first ?? "root"
        self.isSaving = true
        defer { self.isSaving = false }

        do {
            let response = try await client.duplicateNoteAsChild(sourceNoteId: nid, parentNoteId: parentId)
            if let profileId = serverProfileId {
                try? persistence.cacheNoteIfAllowed(from: response.note, serverProfileId: profileId, policy: cacheExclusion)
                try? persistence.cacheBranchIfAllowed(
                    from: response.branch,
                    parentNoteIdsForNote: response.note.parentNoteIds,
                    serverProfileId: profileId,
                    policy: cacheExclusion
                )
                try? persistence.commitBatch()
            }
            return (response.note.noteId, response.note.title)
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            Log.api.error("Failed to duplicate note: \(error)")
            return nil
        }
    }

    /// Moves this note’s placement in the tree to under `targetParentNoteId`, using the target’s branch row (`targetParentBranchId`). Uses the first parent if the note is cloned (same as duplicate).
    func moveNoteToParent(targetParentNoteId: String, targetParentBranchId: String) async {
        let nid = self.noteId
        guard let note else { return }
        if note.isProtected, !appState.protectedSessionActive {
            self.saveError = String(localized: "Unlock this protected note before moving.", comment: "Move protected note")
            self.showSaveError = true
            return
        }
        if targetParentNoteId == nid {
            self.saveError = String(localized: "A note cannot be moved under itself.", comment: "Move validation")
            self.showSaveError = true
            return
        }
        if nid == TriliumTreeConstants.rootNoteId {
            self.saveError = String(localized: "The root notebook cannot be moved.", comment: "Move root note blocked")
            self.showSaveError = true
            return
        }
        let parentId = note.parentNoteIds.first ?? TriliumTreeConstants.rootNoteId
        self.isSaving = true
        defer { self.isSaving = false }

        if !appState.isOnline, let profileId = serverProfileId {
            do {
                guard let sourceBranch = try persistence.fetchCachedBranch(
                    noteId: nid,
                    parentNoteId: parentId,
                    serverProfileId: profileId
                ) else {
                    self.saveError = String(
                        localized: "Could not resolve the note’s branch in the local cache.",
                        comment: "Move branch missing offline"
                    )
                    self.showSaveError = true
                    return
                }
                try persistence.applyOptimisticBranchMove(
                    sourceBranchId: sourceBranch.branchId,
                    sourceNoteId: nid,
                    targetParentNoteId: targetParentNoteId,
                    serverProfileId: profileId
                )
                try persistence.enqueuePendingBranchMove(
                    sourceBranchId: sourceBranch.branchId,
                    targetParentBranchId: targetParentBranchId,
                    sourceNoteId: nid,
                    oldParentNoteId: parentId,
                    targetParentNoteId: targetParentNoteId,
                    serverProfileId: profileId
                )
                NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil, userInfo: ["noteId": nid])
                await self.load()
            } catch {
                self.saveError = APIError.from(error).localizedDescription
                self.showSaveError = true
                Log.api.error("Failed to queue offline move: \(error)")
            }
            return
        }

        guard let client else {
            self.saveError = String(localized: "Cannot move while offline.", comment: "Move note without client")
            self.showSaveError = true
            return
        }

        do {
            guard let sourceBranchId = try await client.branchId(fromParentNoteId: parentId, toChildNoteId: nid) else {
                self.saveError = String(localized: "Could not resolve the note’s branch in the tree.", comment: "Move branch lookup failed")
                self.showSaveError = true
                return
            }
            try await client.moveBranchToParent(branchId: sourceBranchId, parentBranchId: targetParentBranchId)
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil, userInfo: ["noteId": nid])
            await self.load()
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            Log.api.error("Failed to move note: \(error)")
        }
    }

    func createChildNote() async -> String? {
        let nid = self.noteId
        let title = NoteCreationTitle.resolved(from: self.newNoteTitle)
        guard let profileId = serverProfileId else { return nil }
        guard appState.isAuthenticated else {
            self.saveError = String(localized: "Sign in to create notes.", comment: "Error when creating child offline without session")
            self.showSaveError = true
            return nil
        }
        self.isSaving = true
        defer { self.isSaving = false }

        let mime = self.newNoteType.creationMime
        let initial = self.newNoteType.creationInitialContent
        let storageType = self.newNoteType.triliumStorageType
        let attrs = self.newNoteType.creationInitialAttributes

        do {
            let (newId, _) = try persistence.createOfflineChildNote(
                parentNoteId: nid,
                title: title,
                noteType: storageType,
                mime: mime,
                initialContent: initial,
                serverProfileId: profileId,
                initialAttributes: attrs
            )
            self.showCreateChild = false
            self.newNoteTitle = ""
            await self.loadChildNotes()
            appState.backgroundSyncPendingChanges()
            return newId
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            Log.api.error("Failed to create child note locally: \(error)")
            return nil
        }
    }

    private func handleServerDeletedNote(noteId: String) {
        self.error = String(localized: "This note was deleted on the server.", comment: "Note detail when server note is gone")
        if let profileId = serverProfileId {
            try? persistence.deleteCachedNotes(noteIds: [noteId], serverProfileId: profileId)
        }
        shouldDismissAfterServerDeletion = true
        NotificationCenter.default.post(name: .noteDeleted, object: nil, userInfo: ["noteId": noteId])
    }

    func deleteNote() async -> Bool {
        let nid = self.noteId
        self.isSaving = true
        defer { self.isSaving = false }

        if let client, isOnline {
            do {
                try await client.deleteNote(nid)
                if let profileId = serverProfileId {
                    GhostNoteTracker.shared.add(nid, serverProfileId: profileId)
                    persistence.removeFavoritesForCachedSubtree(rootNoteId: nid, serverProfileId: profileId)
                    try? persistence.deleteCachedNotes(noteIds: [nid], serverProfileId: profileId)
                }
                NotificationCenter.default.post(name: .noteDeleted, object: nil)
                return true
            } catch {
                Log.api.error("Failed to delete note: \(error)")
                self.saveError = APIError.from(error).localizedDescription
                self.showSaveError = true
                return false
            }
        }

        guard let profileId = serverProfileId else { return false }
        do {
            try persistence.enqueueOfflineNoteDeletion(noteId: nid, serverProfileId: profileId)
            appState.backgroundSyncPendingChanges()
            NotificationCenter.default.post(name: .noteDeleted, object: nil)
            return true
        } catch {
            Log.api.error("Failed to enqueue offline deletion: \(error)")
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            return false
        }
    }

    /// Permanently deletes a direct child (e.g. geo map location note). Same cache cleanup as `deleteNote()` but keeps this detail screen open.
    func deleteChildNote(noteId childNoteId: String) async -> Bool {
        guard childNoteId != noteId else { return false }
        guard resolvedChildNoteIdsForDetail().contains(childNoteId) else {
            saveError = String(
                localized: "That note is not a sub-note of this one.",
                comment: "Geo map delete pin: child not under current parent"
            )
            showSaveError = true
            return false
        }
        isSaving = true
        defer { isSaving = false }

        if let client, isOnline {
            do {
                try await client.deleteNote(childNoteId)
                if let profileId = serverProfileId {
                    GhostNoteTracker.shared.add(childNoteId, serverProfileId: profileId)
                    persistence.removeFavoritesForCachedSubtree(rootNoteId: childNoteId, serverProfileId: profileId)
                    try? persistence.deleteCachedNotes(noteIds: [childNoteId], serverProfileId: profileId)
                    try? persistence.commitBatch()
                }
                NotificationCenter.default.post(name: .noteDeleted, object: nil)
                NotificationCenter.default.post(
                    name: .trinoteTreeShouldRefresh,
                    object: nil,
                    userInfo: ["noteId": childNoteId]
                )
                return true
            } catch {
                Log.geoMap.error("deleteChildNote failed: \(error.localizedDescription)")
                saveError = APIError.from(error).localizedDescription
                showSaveError = true
                return false
            }
        }

        guard let profileId = serverProfileId else { return false }
        do {
            try persistence.enqueueOfflineNoteDeletion(noteId: childNoteId, serverProfileId: profileId)
            appState.backgroundSyncPendingChanges()
            NotificationCenter.default.post(name: .noteDeleted, object: nil)
            NotificationCenter.default.post(
                name: .trinoteTreeShouldRefresh,
                object: nil,
                userInfo: ["noteId": childNoteId]
            )
            return true
        } catch {
            Log.geoMap.error("Offline deleteChildNote failed: \(error.localizedDescription)")
            saveError = APIError.from(error).localizedDescription
            showSaveError = true
            return false
        }
    }

    // MARK: - Attachments

    func downloadAttachment(_ attachment: AttachmentItem) async -> (Data, String)? {
        guard let client else { return nil }
        do {
            let data = try await client.getAttachmentContent(attachment.attachmentId)
            return (data, attachment.title)
        } catch {
            Log.api.error("Failed to download attachment")
            return nil
        }
    }

    func prepareAttachmentPreview(for attachment: AttachmentItem) async -> AttachmentPreviewItem? {
        guard let (data, _) = await downloadAttachment(attachment) else { return nil }
        return AttachmentPreviewItem.make(title: attachment.title, mime: attachment.mime, data: data)
    }

    func prepareAttachmentPreview(attachmentId: String) async -> AttachmentPreviewItem? {
        guard let client else { return nil }
        do {
            let meta = try await client.getAttachment(attachmentId)
            let data = try await client.getAttachmentContent(attachmentId)
            let attachment = AttachmentItem(from: meta)
            return AttachmentPreviewItem.make(title: attachment.title, mime: attachment.mime, data: data)
        } catch {
            Log.api.error("Failed to prepare attachment preview")
            return nil
        }
    }

    func renameAttachmentTitle(attachmentId: String, title: String) async {
        guard let client else { return }
        do {
            try await client.renameAttachment(attachmentId: attachmentId, title: title)
            await loadAttachments()
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
        }
    }

    func uploadAttachment(data: Data, filename: String, mime: String) async -> AttachmentItem? {
        let nid = self.noteId
        guard let client else {
            self.saveError = "Cannot upload while offline."
            self.showSaveError = true
            return nil
        }
        self.isSaving = true
        defer { self.isSaving = false }

        do {
            let attachmentId = try await client.uploadNoteAttachment(
                noteId: nid,
                data: data,
                filename: filename,
                contentType: mime
            )
            await self.loadAttachments()
            if let refreshed = attachments.first(where: { $0.attachmentId == attachmentId }) {
                return refreshed
            }
            let response = try await client.getAttachment(attachmentId)
            return AttachmentItem(from: response)
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            return nil
        }
    }

    // MARK: - Child Notes

    /// Canonical child list: `CachedBranch` rows under this note only (not stale `CachedNote.childNoteIds`).
    private func resolvedChildNoteIdsForDetail() -> [String] {
        guard let profileId = serverProfileId else { return [] }
        let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)
        let fromBranches = (try? persistence.fetchChildNoteIdsOrderedFromBranches(
            parentNoteId: noteId,
            serverProfileId: profileId
        )) ?? []
        return fromBranches.filter { !ghosts.contains($0) }
    }

    /// Fetches the parent and each direct child from the server, updates the local cache when allowed, then refreshes `childNotes`.
    /// Use after geo-map pin changes or when child titles may have changed on the server.
    func refreshDirectChildrenMetadataFromServer() async {
        await fetchDirectChildrenFromServer()
    }

    /// Loads sub-notes from cache first; when online, fills gaps from the server (required for cache-excluded subtrees).
    func loadChildNotes() async {
        let childIds = resolvedChildNoteIdsForDetail()
        if !childIds.isEmpty {
            loadChildNotesFromCache(childNoteIds: childIds)
        } else if let seed = seedChildSummaries, !seed.isEmpty, let profileId = serverProfileId {
            childNotes = seed.filter { summary in
                !GhostNoteTracker.shared.contains(summary.noteId, serverProfileId: profileId)
            }
        } else {
            childNotes = []
        }
        applySeedChildMetadataMerge()

        if needsDirectChildrenFromServer() {
            await fetchDirectChildrenFromServer()
        }
    }

    private func needsDirectChildrenFromServer() -> Bool {
        guard appState.isOnline, client != nil, let profileId = serverProfileId else { return false }
        guard !noteId.isOfflineLocalNoteId else { return false }

        let branchChildIds = resolvedChildNoteIdsForDetail()
        let loadedIds = Set(childNotes.map(\.noteId))
        let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)

        if branchChildIds.isEmpty {
            if childNotes.isEmpty { return true }
            if let note {
                let fromMeta = Set(note.childNoteIds.filter { !ghosts.contains($0) })
                if fromMeta.count > loadedIds.count { return true }
            }
            return false
        }

        if loadedIds.count < branchChildIds.count { return true }
        for childId in branchChildIds where !loadedIds.contains(childId) {
            return true
        }
        for childId in branchChildIds where loadedIds.contains(childId) {
            if (try? persistence.fetchCachedNote(id: childId, serverProfileId: profileId)) == nil {
                return true
            }
        }
        return false
    }

    private func fetchDirectChildrenFromServer() async {
        guard let client, let profileId = serverProfileId else { return }
        let showSpinner = childNotes.isEmpty
        if showSpinner { isLoadingChildren = true }
        defer { if showSpinner { isLoadingChildren = false } }

        do {
            let (parentResp, liveBranches) = try await client.getNoteWithBranches(noteId)
            if parentResp.isDeleted {
                handleServerDeletedNote(noteId: noteId)
                return
            }
            persistNoteResponse(parentResp, profileId: profileId)
            note = NoteItem(from: parentResp)

            let liveBranchIds = Set(liveBranches.map(\.branchId))
            try? persistence.pruneStaleBranchesUnderParent(
                parentNoteId: noteId,
                liveBranchIds: liveBranchIds,
                serverProfileId: profileId,
                hiddenNoteIds: TriliumSharing.hiddenSystemChildNoteIds
            )

            let hidden = TriliumSharing.hiddenSystemChildNoteIds
            let ghosts = GhostNoteTracker.shared.all(serverProfileId: profileId)
            var results: [ChildNoteSummary] = []
            results.reserveCapacity(liveBranches.count)

            for branch in liveBranches.sorted(by: { $0.notePosition < $1.notePosition }) {
                let childId = branch.noteId
                guard !hidden.contains(childId), !ghosts.contains(childId) else { continue }

                try? persistence.cacheBranchIfAllowed(
                    from: branch,
                    parentNoteIdsForNote: [noteId],
                    serverProfileId: profileId,
                    policy: cacheExclusion
                )

                guard let summary = await childSummaryForDetail(
                    childId: childId,
                    profileId: profileId,
                    client: client
                ) else { continue }
                results.append(summary)
            }

            try? persistence.commitBatch()
            childNotes = results
            geoMapDetectionTick &+= 1
            applySeedChildMetadataMerge()
        } catch {
            Log.api.error("fetchDirectChildrenFromServer failed: \(error)")
        }
    }

    private func childSummaryForDetail(
        childId: String,
        profileId: String,
        client: any TriliumClientProtocol
    ) async -> ChildNoteSummary? {
        if let cached = try? persistence.fetchCachedNote(id: childId, serverProfileId: profileId) {
            return childSummaryFromCachedNote(cached, profileId: profileId)
        }
        do {
            let response = try await client.getNote(childId)
            if response.isDeleted { return nil }
            persistNoteResponse(response, profileId: profileId)
            return childSummaryFromNoteResponse(response, profileId: profileId)
        } catch {
            if case .notFound = APIError.from(error) { return nil }
            Log.api.debug("childSummaryForDetail getNote failed for \(childId): \(error)")
            return nil
        }
    }

    private func childSummaryFromCachedNote(_ cached: CachedNote, profileId: String) -> ChildNoteSummary {
        let cachedAttrs = (try? persistence.fetchCachedAttributes(noteId: cached.noteId, serverProfileId: profileId)) ?? []
        let iconClass = cachedAttrs.first { $0.name == "iconClass" }?.value
        let childBranchCount = (try? persistence.fetchChildNoteIdsOrderedFromBranches(
            parentNoteId: cached.noteId,
            serverProfileId: profileId
        ).count) ?? cached.childBranchIds.count
        return ChildNoteSummary(
            noteId: cached.noteId,
            title: cached.title,
            isProtected: cached.isProtected,
            type: NoteType(rawValue: cached.noteType) ?? .text,
            iconClass: iconClass,
            childCount: childBranchCount
        )
    }

    private func childSummaryFromNoteResponse(_ response: NoteResponse, profileId: String) -> ChildNoteSummary {
        let iconClass = response.attributes.first { $0.name == "iconClass" }?.value
        return ChildNoteSummary(
            noteId: response.noteId,
            title: response.title,
            isProtected: response.isProtected,
            type: NoteType(rawValue: response.type) ?? .text,
            iconClass: iconClass,
            childCount: response.childBranchIds.count
        )
    }

    private func applySeedChildMetadataMerge() {
        guard let seed = seedChildSummaries, !seed.isEmpty else { return }
        let byId = Dictionary(uniqueKeysWithValues: seed.map { ($0.noteId, $0) })
        let placeholder = String(localized: "Sub-note", comment: "Child row title when this note is not in the local database yet (offline or not synced)")
        childNotes = childNotes.map { row in
            guard let s = byId[row.noteId] else { return row }
            let trimmed = row.title.trimmingCharacters(in: .whitespacesAndNewlines)
            let useSeedTitle = trimmed.isEmpty || row.title == placeholder
            let title = useSeedTitle ? s.title : row.title
            return ChildNoteSummary(
                noteId: row.noteId,
                title: title,
                isProtected: row.isProtected,
                type: row.type,
                iconClass: s.iconClass ?? row.iconClass,
                childCount: max(row.childCount, s.childCount)
            )
        }
    }

    private func loadChildNotesFromCache(childNoteIds: [String]) {
        guard let profileId = self.serverProfileId else { return }
        guard !childNoteIds.isEmpty else {
            self.childNotes = []
            return
        }
        var results: [ChildNoteSummary] = []
        for childId in childNoteIds {
            if GhostNoteTracker.shared.contains(childId, serverProfileId: profileId) {
                continue
            }
            guard let cached = try? self.persistence.fetchCachedNote(id: childId, serverProfileId: profileId) else {
                continue
            }
            results.append(childSummaryFromCachedNote(cached, profileId: profileId))
        }
        self.childNotes = results
        geoMapDetectionTick &+= 1
    }

    /// True if any direct child has a `#geolocation` label in SwiftData (map pins). Used when the server reports
    /// `type=book` with an empty body but the note is a geographic map in Trilium desktop.
    func cachedAnyChildHasGeolocationLabel() -> Bool {
        guard let profileId = serverProfileId else { return false }
        for childId in resolvedChildNoteIdsForDetail() {
            guard let attrs = try? persistence.fetchCachedAttributes(noteId: childId, serverProfileId: profileId) else { continue }
            if attrs.contains(where: { $0.type == "label" && $0.name == "geolocation" }) {
                return true
            }
        }
        return false
    }

    /// Geo map pins from SwiftData (`#geolocation` on direct children). Used offline or when the API is unavailable.
    func geoMapPinsFromCache() -> [GeoMapPin] {
        guard let profileId = serverProfileId else { return [] }
        var pins: [GeoMapPin] = []
        for childId in resolvedChildNoteIdsForDetail() {
            guard let cached = try? persistence.fetchCachedNote(id: childId, serverProfileId: profileId) else { continue }
            let attrs = (try? persistence.fetchCachedAttributes(noteId: childId, serverProfileId: profileId)) ?? []
            guard let geoVal = attrs.first(where: { $0.type == "label" && $0.name == "geolocation" })?.value else { continue }
            let parts = geoVal.split(separator: ",")
            guard parts.count == 2,
                  let lat = Double(parts[0].trimmingCharacters(in: .whitespaces)),
                  let lng = Double(parts[1].trimmingCharacters(in: .whitespaces)) else { continue }
            let trimmedTitle = cached.title.trimmingCharacters(in: .whitespacesAndNewlines)
            let title = trimmedTitle.isEmpty ? childId : trimmedTitle
            pins.append(GeoMapPin(noteId: childId, title: title, lat: lat, lng: lng))
        }
        return pins
    }

    /// Fetches pin positions from the server (when online). Returns empty if there is no client or the app is offline.
    func fetchGeoMapPinsFromServer(note: NoteItem) async -> [GeoMapPin] {
        guard let client, isOnline else { return [] }
        var pins: [GeoMapPin] = []
        let parentNote = try? await client.getNote(note.noteId)
        let childIds = parentNote?.childNoteIds ?? note.childNoteIds
        for childId in childIds {
            do {
                let childResp = try await client.getNote(childId)
                let childItem = NoteItem(from: childResp)
                if let geoAttr = childItem.attributes.first(where: { $0.type == .label && $0.name == "geolocation" }) {
                    let parts = geoAttr.value.split(separator: ",")
                    if parts.count == 2,
                       let lat = Double(parts[0].trimmingCharacters(in: .whitespaces)),
                       let lng = Double(parts[1].trimmingCharacters(in: .whitespaces)) {
                        pins.append(GeoMapPin(noteId: childId, title: childItem.title, lat: lat, lng: lng))
                    }
                }
            } catch {
            }
        }
        return pins
    }

    /// When the parent is a semantic geo map (`geoMap` or `book` + `#viewType=geoMap`) with an empty body, child `#geolocation` may not be in SwiftData yet. Fetches a limited set of children so routing can recognize pins.
    /// Skips calendar roots — those are handled by CalendarNoteView.
    func prefetchChildNotesForGeoMapBookIfNeeded() async {
        guard let note, note.isSemanticGeoMap, !note.isCalendarRoot else { return }
        guard let client, isOnline, let profileId = serverProfileId else { return }
        let body = (contentString ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        guard body.isEmpty else { return }
        let childIds = resolvedChildNoteIdsForDetail()
        let hasGeoChild = cachedAnyChildHasGeolocationLabel()
        guard !childIds.isEmpty, !hasGeoChild else { return }

        for childId in childIds.prefix(16) {
            do {
                let response = try await client.getNote(childId)
                persistNoteResponse(response, profileId: profileId)
            } catch {
            }
        }
        try? persistence.commitBatch()
        geoMapDetectionTick &+= 1
    }

    // MARK: - Cache Fallback

    private func hasUsableDisplayedBodyContent() -> Bool {
        !((contentString ?? "").trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
    }

    /// Fetches note metadata when `load()` has not run yet but we need to download the body.
    /// Routes through the shared metadata-refresh task so only one `getNote` runs even when
    /// `load()` and `loadContent()` race on an uncached note.
    private func ensureNoteMetadataIfNeeded() async {
        guard note == nil else { return }
        guard !noteId.isOfflineLocalNoteId, appState.isOnline, client != nil else { return }
        await startOrGetMetadataRefresh().value
    }

    private func loadFromCache() {
        guard let profileId = self.serverProfileId else {
            return
        }
        let nid = self.noteId
        if let cached = try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId) {
            let cachedAttrs = (try? self.persistence.fetchCachedAttributes(noteId: nid, serverProfileId: profileId)) ?? []
            let attrs = cachedAttrs.map { a in
                AttributeItem(
                    attributeId: a.attributeId,
                    noteId: a.noteId,
                    type: AttributeItem.AttributeKind(rawValue: a.type) ?? .label,
                    name: a.name,
                    value: a.value,
                    position: a.position,
                    isInheritable: a.isInheritable
                )
            }
            note = NoteItem(
                noteId: cached.noteId,
                title: cached.title,
                type: NoteType(rawValue: cached.noteType) ?? .text,
                mime: cached.mime,
                isProtected: cached.isProtected,
                dateCreated: "",
                dateModified: "",
                parentNoteIds: cached.parentNoteIds,
                childNoteIds: cached.childNoteIds,
                parentBranchIds: cached.parentBranchIds,
                childBranchIds: cached.childBranchIds,
                attributes: attrs
            )
            if let n = note {
                isSharedPublicly = TriliumSharing.isPublishedUnderShareRoot(note: n)
            }
        }
    }

    // MARK: - Sharing (Trilium /share)

    var isUpdatingShare = false
    /// Matches Trilium desktop: note is shared when it has a clone under `_share` (ancestor `_share`).
    var isSharedPublicly = false

    func shareURLForCurrentNote() -> URL? {
        guard let note, let base = serverBaseURL else { return nil }
        guard isSharedPublicly else { return nil }
        return TriliumSharing.publicShareURL(baseURL: base, note: note)
    }

    /// Updates `isSharedPublicly` from current `note` (fast path) or by walking parents on the server.
    private func updateSharedPublicState(client: any TriliumClientProtocol) async {
        guard let note else {
            isSharedPublicly = false
            return
        }
        if TriliumSharing.isPublishedUnderShareRoot(note: note) {
            isSharedPublicly = true
            return
        }
        do {
            isSharedPublicly = try await TriliumSharing.noteHasShareAncestor(noteId: note.noteId, client: client)
        } catch {
            Log.api.debug("Share state update failed for \(note.noteId): \(error)")
            isSharedPublicly = false
        }
    }

    /// Toggles Trilium sharing: clone to `_share` or remove that branch (same as the web “Shared” switch).
    func setNoteSharing(enabled: Bool) async {
        guard let client, let note else {
            saveError = String(localized: "Cannot change sharing while offline.", comment: "Share toggle without client")
            showSaveError = true
            return
        }
        if note.isProtected || needsProtectedSession {
            saveError = String(localized: "Protected notes cannot be shared.", comment: "Share disabled for protected note")
            showSaveError = true
            return
        }
        if [TriliumSharing.shareRootNoteId, "_hidden", "root"].contains(note.noteId) || note.noteId.hasPrefix("_options") {
            saveError = String(localized: "This note cannot be shared.", comment: "Share disabled for system notes")
            showSaveError = true
            return
        }

        let previousSharing = isSharedPublicly
        isSharedPublicly = enabled
        isUpdatingShare = true
        defer { isUpdatingShare = false }

        do {
            try await TriliumSharing.mutatePublicSharing(
                noteId: noteId,
                noteForAttributes: note,
                enable: enabled,
                client: client
            )
            await refresh()
            NotificationCenter.default.post(
                name: .trinoteTreeShouldRefresh,
                object: nil,
                userInfo: ["noteId": noteId]
            )
        } catch {
            isSharedPublicly = previousSharing
            if let pe = error as? TriliumSharing.PublicSharingMutationError {
                saveError = pe.localizedDescription
            } else {
                saveError = APIError.from(error).localizedDescription
            }
            showSaveError = true
        }
    }

    private static func protectedSessionLikelyEnded(_ error: Error) -> Bool {
        let apiError = APIError.from(error)
        switch apiError {
        case .unauthorized:
            return true
        case .serverError(let code, let msg):
            if code == 401 || code == 403 { return true }
            if let msg, msg.localizedCaseInsensitiveContains("protect") { return true }
            return false
        default:
            return false
        }
    }

    private func loadContentFromCache() {
        guard let profileId = self.serverProfileId else { return }
        let nid = self.noteId
        if cacheExclusion.isNoteExcludedFromCache(
            noteId: nid,
            parentNoteIds: parentNoteIdsForCache(noteId: nid),
            serverProfileId: profileId
        ) {
            return
        }
        if let cached = try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId),
           let data = cached.content {
            if cached.isProtected, !appState.protectedSessionActive {
                return
            }
            content = data
            let html = String(data: data, encoding: .utf8)
            rawContentString = html
            let isTextHTMLNote = NoteType(rawValue: cached.noteType) == .text
            let needsDeferredBody: Bool = {
                guard isTextHTMLNote, let h = html else { return false }
                return h.localizedCaseInsensitiveContains("api/attachments/")
                    || h.localizedCaseInsensitiveContains("api/images/")
            }()
            // Defer publishing HTML with unresolved Trilium image URLs so the read-only web view does not paint broken `<img>`s before `inlineAttachmentImages` runs.
            if needsDeferredBody {
                contentString = nil
            } else {
                contentString = html
            }
            checkForDraft()
        }
    }
}

struct ChildNoteSummary: Identifiable, Sendable {
    let noteId: String
    let title: String
    let isProtected: Bool
    let type: NoteType
    let iconClass: String?
    let childCount: Int

    var id: String { noteId }

    var resolvedIconName: String {
        NoteIconMapper.sfSymbol(for: iconClass) ?? type.iconName
    }
}
