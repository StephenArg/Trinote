import Foundation
import Observation
import UIKit

enum AttachmentOCRState: Equatable, Sendable {
    case text(String)
    case empty
    case unsupported
    case failed(String)
}

/// One image for the editor to insert. `src` is what the editor displays; `originalSrc` is the
/// server-relative reference stored in the note body, restored by `undecorateLinkedImagesFromEditor`
/// on save. When `originalSrc` is nil the displayed bytes are what gets saved.
struct EditorImageInsert: Sendable {
    let src: String
    let originalSrc: String?
}

@Observable
@MainActor
final class NoteDetailViewModel {
    var note: NoteItem?
    var content: Data?
    var contentString: String?
    /// Bumped when `contentString` was patched by a checkbox / Markdown task-state change only.
    /// The read-only WebView uses this to skip a `loadHTMLString` it doesn't need — JS already
    /// updated the live DOM.
    private(set) var checkboxOnlyContentRevision = 0
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
    /// Decorated copy of `editableContent` for the rich text editor's WKWebView. Linked-note
    /// `<img src="api/images/{noteId}/...">` / `api/attachments/…` references become `trinote-img://`
    /// URLs (the editor is bundle-loaded and can't resolve relative `api/...` paths). Canvas and mermaid
    /// `~imageLink`s become include-note cards. The original src is preserved on each rewritten `<img>`
    /// via `data-trinote-original-src` so `undecorateLinkedImagesFromEditor` can restore it on save.
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
    /// Non-nil while picked photos are uploading as attachments; drives the editor status banner.
    var mediaUploadStatus: String?

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
    /// Settings appearance (light/dark) so include-card mermaid SVGs can be re-baked without restarting.
    @ObservationIgnored nonisolated(unsafe) private var appearanceModeObserver: NSObjectProtocol?

    init(noteId: String, appState: AppState, seedChildSummaries: [ChildNoteSummary]? = nil) {
        self.noteId = noteId
        self.appState = appState
        self.seedChildSummaries = seedChildSummaries
        appearanceModeObserver = NotificationCenter.default.addObserver(
            forName: .trinoteAppearanceModeDidChange,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor in
                await self?.rerenderMermaidPreviewsForAppearanceChange()
            }
        }
    }

    deinit {
        if let appearanceModeObserver {
            NotificationCenter.default.removeObserver(appearanceModeObserver)
        }
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

        // Cached HTML still points at `api/images` / `api/attachments`; rewrite those to `trinote-img://`
        // before publishing so the read-only WebView never paints a broken `api/…` URL.
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
               html.containsASCII("api/attachments/") || html.containsASCII("api/images/") {
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

    /// Rewrites Trilium image URLs into `trinote-img://` references the read-only WebView can load.
    /// Matches `api/images|attachments` with any prefix (relative, `/api/…`, or `https://host/…/api/…`).
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

    /// Rewrites Trilium image URLs for a body that is not this note's `contentString` (slides, includes).
    func htmlForReadOnlyDisplay(_ html: String) async -> String {
        await inlineAttachmentImages(in: html)
    }

    /// Bytes for one `trinote-img://` request (read-only view, editor, and the full-screen viewer).
    func loadImageBytes(routeType: String, entityId: String) async -> Data? {
        let profileId = serverProfileId ?? ""
        let clientForLoad: (any TriliumClientProtocol)? = isOnline ? client : nil
        return await TriliumInlineImageCaching.loadImageData(
            routeType: routeType,
            entityId: entityId,
            client: clientForLoad,
            persistence: persistence,
            serverProfileId: profileId,
            sourceNoteId: noteId,
            parentNoteIds: parentNoteIdsForCache(noteId: noteId)
        )
    }

    /// `~imageLink` to mermaid/canvas notes still uses `api/images/{noteId}/…`, but `getNoteContent` returns diagram
    /// source/JSON — not inlinable image bytes — so `inlineAttachmentImages` skips those matches. This pass adds
    /// `data-trinote-image-note-id` so card wrap + tap-to-open can work while the `<img>` keeps loading from the server URL.
    private static func annotateImageLinkApiImageTagsMissingNoteId(in html: String) -> String {
        guard html.containsASCIICaseInsensitive("api/images") else { return html }
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
        // Runs after every inline pass, and the regex below rebuilds the whole body — megabytes once image
        // data URIs are in it. Only `api/images` targets can produce the duplicate at all.
        guard html.containsASCII("data-trinote-image-note-id") else { return html }
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

    /// Re-bake read-only mermaid include/image-link SVGs after Settings appearance changes.
    /// Must restart from `rawContentString`: resolved HTML has already replaced include placeholders
    /// with themed SVG, so running `applyIncludeNoteResolutionIfNeeded` on `contentString` is a no-op.
    private func rerenderMermaidPreviewsForAppearanceChange() async {
        guard !isEditing else { return }
        guard note?.type == .text else { return }
        guard let display = contentString, Self.displayHTMLContainsMermaidPreview(display) else { return }
        guard let raw = rawContentString else { return }

        if TriliumInlineImageCaching.hasResolvableInlineImageURLs(in: raw) {
            let inlined = await inlineAttachmentImages(in: raw)
            guard !isEditing else { return }
            contentString = inlined
        } else {
            contentString = raw
        }
        guard !isEditing else { return }
        await applyIncludeNoteResolutionIfNeeded()
    }

    private static func displayHTMLContainsMermaidPreview(_ html: String) -> Bool {
        html.containsASCIICaseInsensitive("mermaid")
    }

    private func applyIncludeNoteResolutionIfNeeded() async {
        guard let note, note.type == .text else { return }
        guard let profileId = serverProfileId, !profileId.isEmpty else { return }
        guard var html = contentString else { return }

        if html.containsASCII("include-note") {
            let resolved = await resolveIncludeNotesInHTML(html, rootNoteId: noteId)
            if resolved != html {
                contentString = resolved
                html = resolved
            }
        }
        // Include resolution can embed nested HTML with new api/images URLs — inline again.
        guard var after = contentString else { return }
        if after.containsASCII("api/images") || after.containsASCII("api/attachments") {
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
        if after.containsASCII("data-trinote-image-note-id") {
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

    // MARK: - Editor display decoration (linked canvas/mermaid/imageLink → scheme URLs)

    /// Replaces every `<img src="…api/(images|attachments)/{id}/…">` with a `trinote-img://` URL so the
    /// rich text editor's bundle-loaded `WKWebView` (which has no access to the Trilium server's relative
    /// paths) can render the picture. Canvas and mermaid `~imageLink`s become include-note cards instead.
    ///
    /// The original `src` is preserved in `data-trinote-original-src` (round-tripped through TipTap by way of the
    /// `originalSrc` attribute added in `editor.html`), so `undecorateLinkedImagesFromEditor` can restore the
    /// canonical Trilium HTML before saving or storing drafts.
    private func decorateLinkedImagesForEditor(in html: String) async -> String {
        guard html.containsASCIICaseInsensitive("api/images")
                || html.containsASCIICaseInsensitive("api/attachments") else { return html }

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

            let displaySrc = TriliumImageScheme.url(routeType: routeType, entityId: entityId)
            let escOrig = originalSrc
                .replacingOccurrences(of: "&", with: "&amp;")
                .replacingOccurrences(of: "\"", with: "&quot;")
            let newTag = "<img\(preAttrs) src=\(quote)\(displaySrc)\(quote) data-trinote-original-src=\"\(escOrig)\"\(postAttrs)>"
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
        // The editor only needs display pixels; `data-trinote-original-src` carries the real reference
        // through to the save, so a preview here costs nothing and keeps the editor's HTML small.
        if let preview = await EditorImagePreview.downscaledJPEG(from: data, mime: mime) {
            return "data:image/jpeg;base64,\(preview.base64EncodedString())"
        }
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
        let needsImgUndecorate = html.containsASCIICaseInsensitive("data-trinote-original-src")
        let needsSectionUndecorate = html.containsASCIICaseInsensitive("data-trinote-imagelink-original-src")
        guard needsImgUndecorate || needsSectionUndecorate else { return html }
        var working = html
        if needsSectionUndecorate {
            working = unwrapImageLinkIncludeSections(in: working)
            if !working.containsASCIICaseInsensitive("data-trinote-original-src") {
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
        if s.containsASCII("api/images") || s.containsASCII("api/attachments") {
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
               raw.containsASCIICaseInsensitive("api/attachments/")
                   || raw.containsASCIICaseInsensitive("api/images/") {
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
           html.containsASCII("api/attachments/") || html.containsASCII("api/images/") {
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
        let id = CheckboxPerf.nextID()
        let t0 = CFAbsoluteTimeGetCurrent()
        guard let raw = rawContentString ?? contentString else {
            CheckboxPerf.log("toggle #\(id) abort=no-body index=\(index) checked=\(checked)")
            return
        }
        let usedRawFallback = rawContentString == nil
        let display = contentString
        CheckboxPerf.log(
            "toggle #\(id) start index=\(index) checked=\(checked) note=\(self.noteId) usedRawFallback=\(usedRawFallback) raw[\(CheckboxPerf.bodyStats(raw))] display[\(display.map(CheckboxPerf.bodyStats) ?? "nil")]"
        )

        let checkboxPattern = try! NSRegularExpression(
            pattern: #"<input\s+[^>]*type\s*=\s*["']checkbox["'][^>]*/?\s*>"#,
            options: .caseInsensitive
        )
        let tRegexRaw = CFAbsoluteTimeGetCurrent()
        let nsRaw = raw as NSString
        let matches = checkboxPattern.matches(in: raw, range: NSRange(location: 0, length: nsRaw.length))
        CheckboxPerf.log(
            "toggle #\(id) regexRaw ms=\(CheckboxPerf.ms(tRegexRaw)) matches=\(matches.count) index=\(index)"
        )

        guard index < matches.count else {
            CheckboxPerf.log("toggle #\(id) abort=index-out-of-range matches=\(matches.count)")
            return
        }
        let matchRange = matches[index].range
        let original = nsRaw.substring(with: matchRange)

        var updated: String
        if checked {
            if original.contains("checked") {
                CheckboxPerf.log("toggle #\(id) abort=already-checked")
                return
            }
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
        let tHash = CFAbsoluteTimeGetCurrent()
        self.serverContentHash = newRaw.hashValue
        CheckboxPerf.log("toggle #\(id) hashRaw ms=\(CheckboxPerf.ms(tHash))")

        if let display {
            let tRegexDisplay = CFAbsoluteTimeGetCurrent()
            let nsDisplay = display as NSString
            let displayMatches = checkboxPattern.matches(in: display, range: NSRange(location: 0, length: nsDisplay.length))
            CheckboxPerf.log(
                "toggle #\(id) regexDisplay ms=\(CheckboxPerf.ms(tRegexDisplay)) matches=\(displayMatches.count)"
            )
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
                let tAssign = CFAbsoluteTimeGetCurrent()
                self.checkboxOnlyContentRevision += 1
                self.contentString = (display as NSString).replacingCharacters(in: displayMatches[index].range, with: displayUpdated)
                CheckboxPerf.log(
                    "toggle #\(id) assignDisplay ms=\(CheckboxPerf.ms(tAssign)) checkboxOnlyRevision=\(self.checkboxOnlyContentRevision)"
                )
            } else {
                CheckboxPerf.log("toggle #\(id) display-index-miss displayMatches=\(displayMatches.count)")
            }
        }

        CheckboxPerf.lastToggleEndedAt = CFAbsoluteTimeGetCurrent()
        saveNoteBodyChange(newRaw, toggleID: id)
        CheckboxPerf.lastToggleEndedAt = CFAbsoluteTimeGetCurrent()
        CheckboxPerf.log("toggle #\(id) nativeDone ms=\(CheckboxPerf.ms(t0)) (SwiftUI updateUIView follows)")
    }

    // MARK: - Markdown Task State Cycle

    /// Cycles the `index`-th Markdown todo marker: `[ ]` → `[x]` → `[/]` → `[?]` → `[-]` → `[ ]`.
    func cycleMarkdownTaskState(index: Int) {
        guard let raw = contentString else { return }
        guard let newRaw = MarkdownToNoteHTML.cyclingTaskState(in: raw, at: index) else { return }
        // Bump before assigning content so the WebView can skip reload in the same update cycle.
        self.checkboxOnlyContentRevision += 1
        self.contentString = newRaw
        self.rawContentString = newRaw
        self.serverContentHash = newRaw.hashValue
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
        saveNoteBodyChange(html, toggleID: nil)
    }

    private func saveNoteBodyChange(_ html: String, toggleID: UInt64?) {
        let tag = toggleID.map { "#\($0) " } ?? ""
        let nid = self.noteId
        let tUtf8 = CFAbsoluteTimeGetCurrent()
        let data = Data(html.utf8)
        CheckboxPerf.log(
            "save \(tag)utf8 ms=\(CheckboxPerf.ms(tUtf8)) bytes=\(data.count) [\(CheckboxPerf.bodyStats(html))]"
        )
        let mime = note?.mime ?? "text/html"
        guard let profileId = serverProfileId else {
            CheckboxPerf.log("save \(tag)abort=no-profile")
            return
        }

        do {
            let tCache = CFAbsoluteTimeGetCurrent()
            cacheNoteContentIfAllowed(nid, content: data, profileId: profileId)
            CheckboxPerf.log("save \(tag)cacheNoteContent ms=\(CheckboxPerf.ms(tCache))")
            // Pass nil so the upsert reads baseUtcDateModified from the cache for new rows.
            // The cache is kept current by the flush after each successful upload, preventing
            // false conflicts when rapid checkbox toggles create successive pending rows.
            let tUpsert = CFAbsoluteTimeGetCurrent()
            try persistence.upsertPendingNoteBodyUpload(
                noteId: nid,
                body: data,
                mime: mime,
                serverProfileId: profileId,
                baseUtcDateModified: nil
            )
            CheckboxPerf.log("save \(tag)upsertPendingUpload ms=\(CheckboxPerf.ms(tUpsert))")
            self.content = data
        } catch {
            Log.api.error("Failed to save note body change locally: \(error)")
            CheckboxPerf.error("save \(tag)failed \(error.localizedDescription)")
        }
        CheckboxPerf.log("save \(tag)kickoff backgroundSyncPendingChanges")
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
        let trimmed = SpreadsheetWorkbookImageURLs.undecorateFromEditor(
            json.trimmingCharacters(in: .whitespacesAndNewlines)
        )
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
        // Saving now would store the body without the photos still being uploaded, leaving their
        // attachments orphaned. The status banner is already explaining the wait.
        if mediaUploadStatus != nil { return }
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

    /// Own, template, or inherited `#iconClass` for display.
    func effectiveIconClass(for note: NoteItem) -> String? {
        if let resolved = NoteIconClassResolver.effectiveIconClass(
            noteId: note.noteId,
            ownIconClass: note.iconClass,
            templateRelationValue: note.templateRelationValue,
            parentNoteProvider: { [self] parentId in
                guard let profileId = serverProfileId else { return nil }
                return persistence.parentNoteContextForIconWalk(noteId: parentId, serverProfileId: profileId)
            },
            templateIconClassProvider: { [self] target in
                guard let profileId = serverProfileId else {
                    return TriliumBuiltinTemplateIcons.iconClass(for: target)
                }
                return persistence.cachedTemplateIconClass(templateTarget: target, serverProfileId: profileId)
            }
        ) {
            return resolved
        }
        guard let profileId = serverProfileId else { return note.resolvedIconClass }
        return persistence.cachedEffectiveNoteIconClass(noteId: note.noteId, serverProfileId: profileId)
            ?? note.resolvedIconClass
    }

    /// Sets or clears the Trilium `#color` label on this note.
    @discardableResult
    func setNoteColor(_ colorLabel: String?) async -> Bool {
        let nid = noteId
        guard let current = note else { return false }

        let normalized = TriliumNoteColorMapper.canonicalColorLabel(from: colorLabel)

        isSaving = true
        defer { isSaving = false }

        if let client, isOnline {
            do {
                if let existing = current.attributes.first(where: {
                    $0.type == .label && $0.name.caseInsensitiveCompare("color") == .orderedSame
                }) {
                    try await client.deleteAttribute(noteId: nid, attributeId: existing.attributeId)
                }
                if let normalized {
                    try await client.createAttribute(CreateAttributeRequest(
                        noteId: nid,
                        type: "label",
                        name: "color",
                        value: normalized,
                        isInheritable: nil,
                        position: nil
                    ))
                }
                let updated = try await client.getNote(nid)
                self.note = NoteItem(from: updated)
                if let profileId = serverProfileId {
                    persistNoteResponse(updated, profileId: profileId)
                    try? persistence.commitBatch()
                }
                NotificationCenter.default.post(
                    name: .trinoteTreeShouldRefresh,
                    object: nil,
                    userInfo: ["noteId": nid]
                )
                return true
            } catch {
                saveError = APIError.from(error).localizedDescription
                showSaveError = true
                return false
            }
        }

        guard let profileId = serverProfileId else { return false }
        do {
            try persistence.setCachedColorLabel(normalized, noteId: nid, serverProfileId: profileId)
            self.note = current.replacingColorLabel(normalized)
            NotificationCenter.default.post(
                name: .trinoteTreeShouldRefresh,
                object: nil,
                userInfo: ["noteId": nid]
            )
            return true
        } catch {
            saveError = error.localizedDescription
            showSaveError = true
            return false
        }
    }

    /// Sets or clears the Trilium `#iconClass` label on this note.
    @discardableResult
    func setNoteIconClass(_ iconClass: String?) async -> Bool {
        let nid = noteId
        guard let current = note else { return false }

        let trimmed = iconClass?.trimmingCharacters(in: .whitespacesAndNewlines)
        let normalized: String? = {
            guard let trimmed, !trimmed.isEmpty, trimmed != "bx bx-empty" else { return nil }
            return BoxiconsResolver.usableIconClass(from: trimmed) ?? trimmed
        }()

        isSaving = true
        defer { isSaving = false }

        if let client, isOnline {
            do {
                if let existing = current.attributes.first(where: { $0.type == .label && $0.name == "iconClass" }) {
                    try await client.deleteAttribute(noteId: nid, attributeId: existing.attributeId)
                }
                if let normalized {
                    try await client.createAttribute(CreateAttributeRequest(
                        noteId: nid,
                        type: "label",
                        name: "iconClass",
                        value: normalized,
                        isInheritable: nil,
                        position: nil
                    ))
                }
                let updated = try await client.getNote(nid)
                self.note = NoteItem(from: updated)
                if let profileId = serverProfileId {
                    persistNoteResponse(updated, profileId: profileId)
                    try? persistence.commitBatch()
                }
                NotificationCenter.default.post(
                    name: .trinoteTreeShouldRefresh,
                    object: nil,
                    userInfo: ["noteId": nid]
                )
                return true
            } catch {
                saveError = APIError.from(error).localizedDescription
                showSaveError = true
                return false
            }
        }

        guard let profileId = serverProfileId else { return false }
        do {
            try persistence.setCachedIconClass(normalized, noteId: nid, serverProfileId: profileId)
            self.note = current.replacingIconClass(normalized)
            NotificationCenter.default.post(
                name: .trinoteTreeShouldRefresh,
                object: nil,
                userInfo: ["noteId": nid]
            )
            return true
        } catch {
            saveError = error.localizedDescription
            showSaveError = true
            return false
        }
    }

    /// Updates a code note’s MIME (language). Keeps `type` as `code` (Trilium’s model for Markdown too).
    func updateCodeNoteMime(_ mime: String) async {
        let nid = self.noteId
        let trimmed = mime.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, let note, note.type == .code || note.type == .markdown else { return }
        guard note.mime != trimmed else { return }

        self.isSaving = true
        defer { self.isSaving = false }

        if let client, isOnline {
            do {
                let updated = try await client.updateNote(
                    nid,
                    request: UpdateNoteRequest(title: nil, type: "code", mime: trimmed)
                )
                self.note = NoteItem(from: updated)
                if let profileId = serverProfileId {
                    persistNoteResponse(updated, profileId: profileId)
                    try? persistence.commitBatch()
                }
                return
            } catch {
                self.saveError = APIError.from(error).localizedDescription
                self.showSaveError = true
                return
            }
        }

        guard let profileId = serverProfileId else { return }
        if let cached = try? persistence.fetchCachedNote(id: nid, serverProfileId: profileId) {
            cached.mime = trimmed
            try? persistence.commitBatch()
        }
        if var n = self.note {
            n.mime = trimmed
            self.note = n
        }
        let title = self.note?.title
            ?? (try? persistence.fetchCachedNote(id: nid, serverProfileId: profileId)?.title)
            ?? ""
        try? persistence.upsertPendingNotePatch(
            noteId: nid,
            title: title,
            mime: trimmed,
            serverProfileId: profileId
        )
        appState.backgroundSyncPendingChanges()
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
        guard let client else {
            presentAttachmentWriteError(String(localized: "Cannot rename while offline.", comment: "Attachment rename without session"))
            return
        }
        do {
            try await client.renameAttachment(attachmentId: attachmentId, title: title)
            await loadAttachments()
        } catch {
            presentAttachmentWriteError(APIError.from(error).localizedDescription)
        }
    }

    func deleteAttachment(_ attachment: AttachmentItem) async {
        guard let client else {
            presentAttachmentWriteError(String(localized: "Cannot delete while offline.", comment: "Attachment delete without session"))
            return
        }
        isSaving = true
        defer { isSaving = false }
        do {
            try await client.deleteAttachment(attachment.attachmentId)
            await loadAttachments()
        } catch {
            presentAttachmentWriteError(APIError.from(error).localizedDescription)
        }
    }

    /// Deletes every attachment on this note. Stops on the first failure so the list stays
    /// consistent with what the server still holds; successful deletions before that point are kept.
    func deleteAllAttachments() async {
        guard let client else {
            presentAttachmentWriteError(String(localized: "Cannot delete while offline.", comment: "Attachment delete without session"))
            return
        }
        let snapshot = attachments
        guard !snapshot.isEmpty else { return }
        isSaving = true
        defer { isSaving = false }
        do {
            for attachment in snapshot {
                try await client.deleteAttachment(attachment.attachmentId)
            }
            await loadAttachments()
        } catch {
            await loadAttachments()
            presentAttachmentWriteError(APIError.from(error).localizedDescription)
        }
    }

    func replaceAttachment(_ attachment: AttachmentItem, data: Data, filename: String, mime: String) async {
        guard let client else {
            presentAttachmentWriteError(String(localized: "Cannot replace while offline.", comment: "Attachment replace without session"))
            return
        }
        if !AttachmentFilename.replacementExtensionMatches(existingTitle: attachment.title, replacementFilename: filename) {
            let ext = AttachmentFilename.split(attachment.title).ext
            presentAttachmentWriteError(
                String(localized: "The replacement file must use the same extension (.\(ext)).", comment: "Attachment replace extension mismatch")
            )
            return
        }
        isSaving = true
        defer { isSaving = false }
        let contentType = mime.isEmpty ? attachment.mime : mime
        do {
            try await client.uploadAttachmentContent(attachment.attachmentId, data: data, contentType: contentType)
            await loadAttachments()
        } catch {
            presentAttachmentWriteError(APIError.from(error).localizedDescription)
        }
    }

    func fetchAttachmentOCR(_ attachment: AttachmentItem) async -> AttachmentOCRState {
        guard let client else {
            return .failed(String(localized: "Cannot load extracted text while offline.", comment: "OCR fetch without session"))
        }
        do {
            let response = try await client.getAttachmentOCRText(attachmentId: attachment.attachmentId)
            return Self.ocrState(from: response)
        } catch {
            return ocrState(fromError: error)
        }
    }

    func processAttachmentOCR(_ attachment: AttachmentItem) async -> AttachmentOCRState {
        guard let client else {
            return .failed(String(localized: "Cannot process OCR while offline.", comment: "OCR process without session"))
        }

        var processText: String?
        var processFailure: String?

        do {
            let processed = try await client.processAttachmentOCR(
                attachmentId: attachment.attachmentId,
                forceReprocess: true
            )
            processText = processed.extractedText
            if !processed.success {
                processFailure = processed.message
                    ?? String(localized: "OCR processing failed.", comment: "OCR process unsuccessful")
            }
        } catch {
            processFailure = APIError.from(error).localizedDescription
            if case .notFound = APIError.from(error) {
                return .unsupported
            }
        }

        if let processText {
            return .text(processText)
        }

        // The client may time out while the server is still writing OCR; always re-fetch.
        do {
            let refreshed = try await client.getAttachmentOCRText(attachmentId: attachment.attachmentId)
            let fromGet = Self.ocrState(from: refreshed)
            if case .text = fromGet { return fromGet }
        } catch {
            if let processFailure {
                return .failed(processFailure)
            }
            return ocrState(fromError: error)
        }

        if let processFailure {
            return .failed(processFailure)
        }
        return .empty
    }

    func convertAttachmentToNote(_ attachment: AttachmentItem) async -> (noteId: String, title: String)? {
        guard let client else {
            presentAttachmentWriteError(String(localized: "Cannot convert while offline.", comment: "Attachment convert without session"))
            return nil
        }
        isSaving = true
        defer { isSaving = false }
        do {
            let response = try await client.convertAttachmentToNote(attachmentId: attachment.attachmentId)
            await loadAttachments()
            await loadChildNotes()
            NotificationCenter.default.post(
                name: .trinoteTreeShouldRefresh,
                object: nil,
                userInfo: ["noteId": noteId]
            )
            return (response.note.noteId, response.note.title)
        } catch {
            presentAttachmentWriteError(APIError.from(error).localizedDescription)
            return nil
        }
    }

    private func presentAttachmentWriteError(_ message: String) {
        saveError = message
        showSaveError = true
    }

    /// Attachment rows own their own file picker, so they report read failures through here.
    func presentAttachmentError(_ message: String) {
        presentAttachmentWriteError(message)
    }

    private static func ocrState(from response: AttachmentOCRTextResponse) -> AttachmentOCRState {
        if let text = response.extractedText {
            return .text(text)
        }
        return .empty
    }

    private func ocrState(fromError error: Error) -> AttachmentOCRState {
        let apiError = APIError.from(error)
        if case .notFound = apiError {
            return .unsupported
        }
        return .failed(apiError.localizedDescription)
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

    /// Uploads picked photos as attachments of this note, handing each one to `onReady` the moment its
    /// upload lands so the editor can show it while the rest are still going. The note body then holds
    /// a short `api/attachments/…` reference instead of megabytes of base64, which is what Trilium's own
    /// editor stores and what keeps saving cheap no matter how many photos a note has.
    ///
    /// Uploads run one at a time so the photos appear in the order they were picked. A photo whose
    /// upload fails falls back to a full-size inline data URI, so nothing is ever lost — that note just
    /// pays the old cost for that one image.
    func uploadPhotosAsAttachments(
        _ images: [PhotoLibraryImage],
        onReady: (EditorImageInsert) -> Void
    ) async {
        guard !images.isEmpty else { return }
        var uploaded = 0
        let stamp = Self.photoAttachmentTimestamp()
        for (index, image) in images.enumerated() {
            mediaUploadStatus = Self.photoUploadStatus(index: index, total: images.count)
            let filename = "photo-\(stamp)-\(index + 1).\(Self.photoFileExtension(mime: image.mime))"
            if let attachmentId = await uploadPhotoAttachment(image: image, filename: filename) {
                uploaded += 1
                seedImageCache(attachmentId: attachmentId, data: image.data)
                onReady(
                    EditorImageInsert(
                        src: TriliumImageScheme.url(routeType: "attachments", entityId: attachmentId),
                        originalSrc: Self.attachmentImageSrc(attachmentId: attachmentId, filename: filename)
                    )
                )
            } else {
                onReady(EditorImageInsert(src: Self.dataURI(image.data, mime: image.mime), originalSrc: nil))
            }
        }
        mediaUploadStatus = nil
        if uploaded > 0 {
            await loadAttachments()
        }
        if uploaded < images.count {
            showTransientEditorMessage(
                String(
                    localized: "Couldn't upload every photo; some are embedded in the note instead.",
                    comment: "Photo attachment upload partially failed"
                )
            )
        }
    }

    private func uploadPhotoAttachment(image: PhotoLibraryImage, filename: String) async -> String? {
        guard let client, isOnline else { return nil }
        do {
            return try await client.uploadNoteAttachment(
                noteId: noteId,
                data: image.data,
                filename: filename,
                contentType: image.mime
            )
        } catch {
            Log.api.error("Photo attachment upload failed: \(APIError.from(error).localizedDescription, privacy: .public)")
            return nil
        }
    }

    private func seedImageCache(attachmentId: String, data: Data) {
        guard let profileId = serverProfileId else { return }
        TriliumInlineImageCaching.cacheUploadedImage(
            routeType: "attachments",
            entityId: attachmentId,
            data: data,
            persistence: persistence,
            serverProfileId: profileId,
            sourceNoteId: noteId,
            parentNoteIds: parentNoteIdsForCache(noteId: noteId)
        )
    }

    /// The shape Trilium's own editor writes for an image stored as an attachment, and the shape its
    /// `checkImageAttachments` looks for when deciding which attachments are still in use.
    private static func attachmentImageSrc(attachmentId: String, filename: String) -> String {
        let encoded = filename.addingPercentEncoding(withAllowedCharacters: Self.attachmentFilenameAllowed)
            ?? filename
        return "api/attachments/\(attachmentId)/image/\(encoded)"
    }

    /// Matches JavaScript `encodeURIComponent`, which is what Trilium uses for the filename segment.
    private static let attachmentFilenameAllowed = CharacterSet.alphanumerics
        .union(CharacterSet(charactersIn: "-_.!~*'()"))

    private static func dataURI(_ data: Data, mime: String) -> String {
        "data:\(mime);base64,\(data.base64EncodedString())"
    }

    private static func photoFileExtension(mime: String) -> String {
        switch mime.lowercased() {
        case "image/gif": return "gif"
        case "image/png": return "png"
        default: return "jpg"
        }
    }

    private static func photoAttachmentTimestamp() -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "yyyyMMdd-HHmmss"
        return formatter.string(from: Date())
    }

    private static func photoUploadStatus(index: Int, total: Int) -> String {
        if total == 1 {
            return String(localized: "Adding photo…", comment: "Single photo upload progress")
        }
        return String(
            localized: "Adding photo \(index + 1) of \(total)…",
            comment: "Photo upload progress with counts"
        )
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
            let iconClassLabel = attrs.first(where: { $0.type == "label" && $0.name == "iconClass" })?.value
            let iconClass = GeoMapMarkerIconClass.forNote(
                type: cached.parsedType ?? .text,
                mime: cached.mime,
                iconClassLabel: iconClassLabel,
                childNoteCount: cached.childNoteIds.count
            )
            let color = attrs.first(where: { $0.type == "label" && $0.name.caseInsensitiveCompare("color") == .orderedSame })?.value
            pins.append(GeoMapPin(noteId: childId, title: title, lat: lat, lng: lng, iconClass: iconClass, color: color))
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
                        pins.append(GeoMapPin(
                            noteId: childId,
                            title: childItem.title,
                            lat: lat,
                            lng: lng,
                            iconClass: GeoMapMarkerIconClass.forNoteItem(childItem),
                            color: childItem.colorLabelValue
                        ))
                    }
                }
            } catch {
            }
        }
        return pins
    }

    func geoMapTracksFromCache() -> [GeoMapTrack] {
        guard let profileId = serverProfileId else { return [] }
        var tracks: [GeoMapTrack] = []
        for childId in resolvedChildNoteIdsForDetail() {
            guard let cached = try? persistence.fetchCachedNote(id: childId, serverProfileId: profileId) else { continue }
            guard cached.mime == GeoMapDisplaySettings.gpxMIME else { continue }
            let title = cached.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? childId : cached.title
            guard let body = cached.content,
                  let xml = String(data: body, encoding: .utf8) else { continue }
            let attrs = (try? persistence.fetchCachedAttributes(noteId: childId, serverProfileId: profileId)) ?? []
            let iconClassLabel = attrs.first(where: { $0.type == "label" && $0.name == "iconClass" })?.value
            let iconClass = GeoMapMarkerIconClass.forNote(
                type: cached.parsedType ?? .file,
                mime: cached.mime,
                iconClassLabel: iconClassLabel,
                childNoteCount: cached.childNoteIds.count
            )
            let color = attrs.first(where: { $0.type == "label" && $0.name.caseInsensitiveCompare("color") == .orderedSame })?.value
            guard let track = GeoMapTrack.make(
                noteId: childId,
                title: title,
                gpxXML: xml,
                iconClass: iconClass,
                color: color
            ) else { continue }
            tracks.append(track)
        }
        return tracks
    }

    func fetchGeoMapTracksFromServer(note: NoteItem) async -> [GeoMapTrack] {
        guard let client, isOnline else { return [] }
        var tracks: [GeoMapTrack] = []
        let parentNote = try? await client.getNote(note.noteId)
        let childIds = parentNote?.childNoteIds ?? note.childNoteIds
        for childId in childIds {
            do {
                let childResp = try await client.getNote(childId)
                let childItem = NoteItem(from: childResp)
                guard childItem.mime == GeoMapDisplaySettings.gpxMIME else { continue }
                let content = try await client.getNoteContent(childId)
                guard let xml = String(data: content, encoding: .utf8) else { continue }
                guard let track = GeoMapTrack.make(
                    noteId: childId,
                    title: childItem.title,
                    gpxXML: xml,
                    iconClass: GeoMapMarkerIconClass.forNoteItem(childItem),
                    color: childItem.colorLabelValue
                ) else { continue }
                tracks.append(track)
            } catch {
            }
        }
        return tracks
    }

    func importGeoMapGpxFile(data: Data, filename: String, parentNoteId: String) async throws -> GeoMapTrack {
        let baseName = filename
            .replacingOccurrences(of: ".gpx", with: "", options: [.caseInsensitive])
            .trimmingCharacters(in: .whitespacesAndNewlines)
        let title = baseName.isEmpty ? String(localized: "Track", comment: "Default GPX track title") : baseName
        guard let xml = String(data: data, encoding: .utf8) else {
            throw NSError(domain: "GeoMap", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid GPX encoding"])
        }
        guard GeoMapGPXParser.readTrackLines(from: xml).isEmpty == false else {
            throw NSError(domain: "GeoMap", code: 2, userInfo: [NSLocalizedDescriptionKey: "No track data in GPX file"])
        }

        if let profileId = serverProfileId, client == nil || !isOnline {
            let (noteId, _) = try persistence.createOfflineChildNote(
                parentNoteId: parentNoteId,
                title: title,
                noteType: "file",
                mime: GeoMapDisplaySettings.gpxMIME,
                initialContent: xml,
                serverProfileId: profileId
            )
            guard let track = GeoMapTrack.make(
                noteId: noteId,
                title: title,
                gpxXML: xml,
                iconClass: nil,
                color: nil
            ) else {
                throw NSError(domain: "GeoMap", code: 2, userInfo: [NSLocalizedDescriptionKey: "No track data in GPX file"])
            }
            return track
        }

        guard let client else {
            throw NSError(domain: "GeoMap", code: 3, userInfo: [NSLocalizedDescriptionKey: "No server connection"])
        }
        let response = try await client.createChildNoteWithContent(
            parentNoteId: parentNoteId,
            title: title,
            noteType: "file",
            mime: GeoMapDisplaySettings.gpxMIME,
            body: data
        )
        if let profileId = serverProfileId {
            try? persistence.cacheNoteIfAllowed(from: response.note, serverProfileId: profileId, policy: cacheExclusion)
            try? persistence.cacheBranchIfAllowed(
                from: response.branch,
                parentNoteIdsForNote: response.note.parentNoteIds,
                serverProfileId: profileId,
                policy: cacheExclusion
            )
            cacheNoteContentIfAllowed(response.note.noteId, content: data, profileId: profileId, response: response.note)
            try? persistence.commitBatch()
        }
        guard let track = GeoMapTrack.make(
            noteId: response.note.noteId,
            title: title,
            gpxXML: xml,
            iconClass: nil,
            color: nil
        ) else {
            throw NSError(domain: "GeoMap", code: 2, userInfo: [NSLocalizedDescriptionKey: "No track data in GPX file"])
        }
        return track
    }

    func geoMapChildHTML(for noteId: String) async -> String? {
        if let profileId = serverProfileId,
           let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId),
           let data = cached.content,
           let html = String(data: data, encoding: .utf8), !html.isEmpty {
            return html
        }
        guard let client, isOnline else { return nil }
        do {
            let content = try await client.getNoteContent(noteId)
            if let profileId = serverProfileId {
                try? persistence.cacheNoteContent(noteId, content: content, serverProfileId: profileId)
            }
            return String(data: content, encoding: .utf8)
        } catch {
            return nil
        }
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

    // MARK: - Kanban Board

    /// Group-by attribute name from `#board:groupBy` (default `status`).
    func kanbanGroupByAttributeName(for note: NoteItem) -> String {
        let raw = note.attributes.first(where: {
            $0.type == .label && $0.name.caseInsensitiveCompare("board:groupBy") == .orderedSame
        })?.value
        return KanbanBoardModels.normalizedGroupByAttributeName(raw)
    }

    /// Loads Kanban cards + `board.json` columns.
    /// When online, merges server children with cache so freshly queued offline cards (`ol_*`) still appear
    /// before `backgroundSyncPendingChanges` finishes flushing them.
    func loadKanbanBoard(for note: NoteItem) async -> (columns: [KanbanBoardModels.Column], groupBy: String) {
        let groupBy = kanbanGroupByAttributeName(for: note)
        let cacheCards = kanbanCardsFromCache(groupBy: groupBy)
        let cards: [KanbanBoardModels.Card]
        if client != nil, isOnline {
            let serverCards = await fetchKanbanCardsFromServer(note: note, groupBy: groupBy)
            var byId: [String: KanbanBoardModels.Card] = [:]
            for card in serverCards { byId[card.noteId] = card }
            for card in cacheCards where byId[card.noteId] == nil {
                byId[card.noteId] = card
            }
            cards = Array(byId.values)
        } else {
            cards = cacheCards
        }
        let config = await loadBoardConfig(for: note)
        return (KanbanBoardModels.buildColumns(config: config, cards: cards), groupBy)
    }

    func kanbanCardsFromCache(groupBy: String) -> [KanbanBoardModels.Card] {
        guard let profileId = serverProfileId else { return [] }
        var cards: [KanbanBoardModels.Card] = []
        for childId in resolvedChildNoteIdsForDetail() {
            guard let cached = try? persistence.fetchCachedNote(id: childId, serverProfileId: profileId) else { continue }
            let attrs = ((try? persistence.fetchCachedAttributes(noteId: childId, serverProfileId: profileId)) ?? []).map { a in
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
            guard let column = KanbanBoardModels.columnValue(from: attrs, groupByName: groupBy) else { continue }
            let branch = try? persistence.fetchCachedBranch(noteId: childId, parentNoteId: noteId, serverProfileId: profileId)
            let branchId = branch?.branchId ?? ""
            let position = branch?.notePosition ?? 0
            let trimmedTitle = cached.title.trimmingCharacters(in: .whitespacesAndNewlines)
            cards.append(KanbanBoardModels.Card(
                noteId: childId,
                branchId: branchId,
                title: trimmedTitle.isEmpty ? childId : trimmedTitle,
                columnValue: column,
                notePosition: position
            ))
        }
        return cards
    }

    func fetchKanbanCardsFromServer(note: NoteItem, groupBy: String) async -> [KanbanBoardModels.Card] {
        guard let client, isOnline else { return [] }
        var cards: [KanbanBoardModels.Card] = []
        do {
            let (parentResp, liveBranches) = try await client.getNoteWithBranches(note.noteId)
            if let profileId = serverProfileId {
                persistNoteResponse(parentResp, profileId: profileId)
                for branch in liveBranches {
                    try? persistence.cacheBranchIfAllowed(
                        from: branch,
                        parentNoteIdsForNote: [note.noteId],
                        serverProfileId: profileId,
                        policy: cacheExclusion
                    )
                }
                try? persistence.commitBatch()
            }
            for branch in liveBranches.sorted(by: { $0.notePosition < $1.notePosition }) {
                do {
                    let childResp = try await client.getNote(branch.noteId)
                    let childItem = NoteItem(from: childResp)
                    if let profileId = serverProfileId {
                        persistNoteResponse(childResp, profileId: profileId)
                    }
                    guard let column = KanbanBoardModels.columnValue(from: childItem.attributes, groupByName: groupBy) else {
                        continue
                    }
                    cards.append(KanbanBoardModels.Card(
                        noteId: childItem.noteId,
                        branchId: branch.branchId,
                        title: childItem.title,
                        columnValue: column,
                        notePosition: branch.notePosition
                    ))
                } catch {
                    continue
                }
            }
            try? persistence.commitBatch()
        } catch {
            Log.api.error("fetchKanbanCardsFromServer failed: \(error)")
            return kanbanCardsFromCache(groupBy: groupBy)
        }
        return cards
    }

    func loadBoardConfig(for note: NoteItem) async -> KanbanBoardModels.BoardConfig? {
        if let client, isOnline {
            do {
                let attachments = try await client.getNoteAttachments(note.noteId)
                self.attachments = attachments.map(AttachmentItem.init)
                if let att = attachments.first(where: { $0.title == KanbanBoardModels.boardConfigAttachmentTitle }) {
                    let data = try await client.getAttachmentContent(att.attachmentId)
                    return KanbanBoardModels.decodeBoardConfig(from: data)
                }
            } catch {
                Log.api.debug("loadBoardConfig online failed: \(error)")
            }
        }
        if let att = attachments.first(where: { $0.title == KanbanBoardModels.boardConfigAttachmentTitle }),
           let client {
            if let data = try? await client.getAttachmentContent(att.attachmentId) {
                return KanbanBoardModels.decodeBoardConfig(from: data)
            }
        }
        return nil
    }

    /// Persists `board.json` (create or replace content). Online-only.
    @discardableResult
    func saveBoardConfig(_ config: KanbanBoardModels.BoardConfig) async -> Bool {
        guard let client, isOnline else {
            saveError = String(localized: "Connect to the server to edit board columns.", comment: "Kanban offline column edit")
            showSaveError = true
            return false
        }
        do {
            let data = try KanbanBoardModels.encodeBoardConfig(config)
            let existing = attachments.first {
                $0.title == KanbanBoardModels.boardConfigAttachmentTitle && $0.mime == "application/json"
            }
            if let existing {
                try await client.uploadAttachmentContent(existing.attachmentId, data: data, contentType: "application/json")
            } else {
                let request = CreateAttachmentRequest(
                    ownerId: noteId,
                    role: "viewConfig",
                    mime: "application/json",
                    title: KanbanBoardModels.boardConfigAttachmentTitle,
                    content: data.base64EncodedString(),
                    position: 0
                )
                _ = try await client.createAttachment(request)
            }
            await loadAttachments()
            return true
        } catch {
            saveError = APIError.from(error).localizedDescription
            showSaveError = true
            Log.api.error("saveBoardConfig failed: \(error)")
            return false
        }
    }

    /// Moves a card to another column by rewriting its group-by label (delete + create). Online-only.
    @discardableResult
    func moveKanbanCard(noteId cardNoteId: String, toColumn: String, groupBy: String) async -> Bool {
        guard let client, isOnline else {
            saveError = String(localized: "Connect to the server to move cards.", comment: "Kanban offline move")
            showSaveError = true
            return false
        }
        do {
            let noteResp = try await client.getNote(cardNoteId)
            let item = NoteItem(from: noteResp)
            if let existing = item.attributes.first(where: {
                $0.type == .label && $0.name.caseInsensitiveCompare(groupBy) == .orderedSame
            }) {
                try await client.deleteAttribute(noteId: cardNoteId, attributeId: existing.attributeId)
            }
            try await client.createAttribute(CreateAttributeRequest(
                noteId: cardNoteId, type: "label", name: groupBy,
                value: toColumn, isInheritable: nil, position: nil
            ))
            if let profileId = serverProfileId {
                persistNoteResponse(try await client.getNote(cardNoteId), profileId: profileId)
                try? persistence.commitBatch()
            }
            return true
        } catch {
            saveError = APIError.from(error).localizedDescription
            showSaveError = true
            Log.api.error("moveKanbanCard failed: \(error)")
            return false
        }
    }

    /// Reorders a card among siblings under this board note. Online-only.
    @discardableResult
    func reorderKanbanCard(branchId: String, orderedSiblingBranchIds: [String]) async -> Bool {
        guard let client, isOnline else {
            saveError = String(localized: "Connect to the server to reorder cards.", comment: "Kanban offline reorder")
            showSaveError = true
            return false
        }
        do {
            try await client.placeBranchInSiblingOrder(branchId, orderedSiblingBranchIds: orderedSiblingBranchIds)
            await loadChildNotes()
            return true
        } catch {
            saveError = APIError.from(error).localizedDescription
            showSaveError = true
            Log.api.error("reorderKanbanCard failed: \(error)")
            return false
        }
    }

    /// Creates a text card under this board with the group-by label set (offline-queued).
    func createKanbanCard(title: String, column: String, groupBy: String) async -> String? {
        guard let profileId = serverProfileId else { return nil }
        guard appState.isAuthenticated else {
            saveError = String(localized: "Sign in to create notes.", comment: "Error when creating child offline without session")
            showSaveError = true
            return nil
        }
        let resolvedTitle = NoteCreationTitle.resolved(from: title)
        do {
            let (newId, _) = try persistence.createOfflineChildNote(
                parentNoteId: noteId,
                title: resolvedTitle,
                noteType: "text",
                mime: "text/html",
                initialContent: "",
                serverProfileId: profileId,
                initialAttributes: [
                    NoteCreationAttribute(type: "label", name: groupBy, value: column),
                ]
            )
            await loadChildNotes()
            // Flush immediately when online so the card lands on the server before the next board pull.
            if isOnline, client != nil {
                await appState.flushPendingLocalChangesIfPossible()
            } else {
                appState.backgroundSyncPendingChanges()
            }
            return newId
        } catch {
            saveError = APIError.from(error).localizedDescription
            showSaveError = true
            return nil
        }
    }

    /// Renames a column in `board.json` and rewrites `#status` (or group-by) on cards. Online-only.
    @discardableResult
    func renameKanbanColumn(from oldValue: String, to newValue: String, groupBy: String, cards: [KanbanBoardModels.Card], configColumns: [String]) async -> Bool {
        let trimmed = newValue.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, trimmed != oldValue else { return false }
        for card in cards where card.columnValue == oldValue {
            let ok = await moveKanbanCard(noteId: card.noteId, toColumn: trimmed, groupBy: groupBy)
            if !ok { return false }
        }
        let updated = configColumns.map { $0 == oldValue ? trimmed : $0 }
        let config = KanbanBoardModels.BoardConfig(columns: updated.map { KanbanBoardModels.BoardColumn(value: $0) })
        return await saveBoardConfig(config)
    }

    // MARK: - Presentation

    /// Loads horizontal slides (and nested vertical slides) for a presentation note.
    func loadPresentationSlides(for note: NoteItem) async -> (slides: [PresentationModels.Slide], theme: String) {
        let theme = PresentationModels.normalizedTheme(
            note.attributes.first(where: {
                $0.type == .label && $0.name.caseInsensitiveCompare("presentation:theme") == .orderedSame
            })?.value
        )
        if client != nil, isOnline {
            let slides = await fetchPresentationSlidesFromServer(note: note)
            return (slides, theme)
        }
        return (await presentationSlidesFromCache(), theme)
    }

    func presentationSlidesFromCache() async -> [PresentationModels.Slide] {
        guard let profileId = serverProfileId else { return [] }
        var horizontal: [(noteId: String, branchId: String, title: String, html: String, background: String?)] = []
        var verticalByParent: [String: [(noteId: String, branchId: String, title: String, html: String, background: String?)]] = [:]

        for childId in resolvedChildNoteIdsForDetail() {
            guard let cached = try? persistence.fetchCachedNote(id: childId, serverProfileId: profileId) else { continue }
            let attrs = ((try? persistence.fetchCachedAttributes(noteId: childId, serverProfileId: profileId)) ?? []).map { a in
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
            let background = attrs.first(where: {
                $0.type == .label && $0.name.caseInsensitiveCompare("slide:background") == .orderedSame
            })?.value
            let branch = try? persistence.fetchCachedBranch(noteId: childId, parentNoteId: noteId, serverProfileId: profileId)
            let html = cached.content.flatMap { String(data: $0, encoding: .utf8) } ?? ""
            let trimmedTitle = cached.title.trimmingCharacters(in: .whitespacesAndNewlines)
            horizontal.append((
                noteId: childId,
                branchId: branch?.branchId ?? "",
                title: trimmedTitle.isEmpty ? childId : trimmedTitle,
                html: html,
                background: background
            ))

            let grandIds = (try? persistence.fetchChildNoteIdsOrderedFromBranches(parentNoteId: childId, serverProfileId: profileId)) ?? []
            var vertical: [(noteId: String, branchId: String, title: String, html: String, background: String?)] = []
            for grandId in grandIds {
                guard let gCached = try? persistence.fetchCachedNote(id: grandId, serverProfileId: profileId) else { continue }
                let gAttrs = ((try? persistence.fetchCachedAttributes(noteId: grandId, serverProfileId: profileId)) ?? []).map { a in
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
                let gBg = gAttrs.first(where: {
                    $0.type == .label && $0.name.caseInsensitiveCompare("slide:background") == .orderedSame
                })?.value
                let gBranch = try? persistence.fetchCachedBranch(noteId: grandId, parentNoteId: childId, serverProfileId: profileId)
                let gHtml = gCached.content.flatMap { String(data: $0, encoding: .utf8) } ?? ""
                let gTitle = gCached.title.trimmingCharacters(in: .whitespacesAndNewlines)
                vertical.append((
                    noteId: grandId,
                    branchId: gBranch?.branchId ?? "",
                    title: gTitle.isEmpty ? grandId : gTitle,
                    html: gHtml,
                    background: gBg
                ))
            }
            if !vertical.isEmpty {
                verticalByParent[childId] = vertical
            }
        }
        return PresentationModels.buildSlides(horizontal: horizontal, verticalByParent: verticalByParent)
    }

    func fetchPresentationSlidesFromServer(note: NoteItem) async -> [PresentationModels.Slide] {
        guard let client, isOnline else { return await presentationSlidesFromCache() }
        do {
            let (parentResp, liveBranches) = try await client.getNoteWithBranches(note.noteId)
            if let profileId = serverProfileId {
                persistNoteResponse(parentResp, profileId: profileId)
                for branch in liveBranches {
                    try? persistence.cacheBranchIfAllowed(
                        from: branch,
                        parentNoteIdsForNote: [note.noteId],
                        serverProfileId: profileId,
                        policy: cacheExclusion
                    )
                }
                try? persistence.commitBatch()
            }

            var horizontal: [(noteId: String, branchId: String, title: String, html: String, background: String?)] = []
            var verticalByParent: [String: [(noteId: String, branchId: String, title: String, html: String, background: String?)]] = [:]

            for branch in liveBranches.sorted(by: { $0.notePosition < $1.notePosition }) {
                let childResp = try await client.getNote(branch.noteId)
                let childItem = NoteItem(from: childResp)
                if let profileId = serverProfileId {
                    persistNoteResponse(childResp, profileId: profileId)
                }
                let htmlData = (try? await client.getNoteContent(branch.noteId)) ?? Data()
                let html = String(data: htmlData, encoding: .utf8) ?? ""
                if let profileId = serverProfileId, !htmlData.isEmpty {
                    cacheNoteContentIfAllowed(branch.noteId, content: htmlData, profileId: profileId, utcDateModified: childResp.utcDateModified)
                }
                let background = childItem.attributes.first(where: {
                    $0.type == .label && $0.name.caseInsensitiveCompare("slide:background") == .orderedSame
                })?.value
                horizontal.append((
                    noteId: childItem.noteId,
                    branchId: branch.branchId,
                    title: childItem.title,
                    html: html,
                    background: background
                ))

                let (_, childBranches) = (try? await client.getNoteWithBranches(branch.noteId)) ?? (childResp, [])
                var vertical: [(noteId: String, branchId: String, title: String, html: String, background: String?)] = []
                for vBranch in childBranches.sorted(by: { $0.notePosition < $1.notePosition }) {
                    let vResp = try await client.getNote(vBranch.noteId)
                    let vItem = NoteItem(from: vResp)
                    if let profileId = serverProfileId {
                        persistNoteResponse(vResp, profileId: profileId)
                        try? persistence.cacheBranchIfAllowed(
                            from: vBranch,
                            parentNoteIdsForNote: [branch.noteId],
                            serverProfileId: profileId,
                            policy: cacheExclusion
                        )
                    }
                    let vData = (try? await client.getNoteContent(vBranch.noteId)) ?? Data()
                    let vHtml = String(data: vData, encoding: .utf8) ?? ""
                    if let profileId = serverProfileId, !vData.isEmpty {
                        cacheNoteContentIfAllowed(vBranch.noteId, content: vData, profileId: profileId, utcDateModified: vResp.utcDateModified)
                    }
                    let vBg = vItem.attributes.first(where: {
                        $0.type == .label && $0.name.caseInsensitiveCompare("slide:background") == .orderedSame
                    })?.value
                    vertical.append((
                        noteId: vItem.noteId,
                        branchId: vBranch.branchId,
                        title: vItem.title,
                        html: vHtml,
                        background: vBg
                    ))
                }
                if !vertical.isEmpty {
                    verticalByParent[branch.noteId] = vertical
                }
            }
            try? persistence.commitBatch()
            return PresentationModels.buildSlides(horizontal: horizontal, verticalByParent: verticalByParent)
        } catch {
            Log.api.error("fetchPresentationSlidesFromServer failed: \(error)")
            return await presentationSlidesFromCache()
        }
    }

    func createPresentationSlide(title: String) async -> String? {
        guard let profileId = serverProfileId else { return nil }
        guard appState.isAuthenticated else {
            saveError = String(localized: "Sign in to create notes.", comment: "Error when creating child offline without session")
            showSaveError = true
            return nil
        }
        let resolvedTitle = NoteCreationTitle.resolved(from: title)
        do {
            let (newId, _) = try persistence.createOfflineChildNote(
                parentNoteId: noteId,
                title: resolvedTitle,
                noteType: "text",
                mime: "text/html",
                initialContent: "<p></p>",
                serverProfileId: profileId,
                initialAttributes: [
                    NoteCreationAttribute(type: "label", name: "slide", value: ""),
                ]
            )
            await loadChildNotes()
            appState.backgroundSyncPendingChanges()
            return newId
        } catch {
            saveError = APIError.from(error).localizedDescription
            showSaveError = true
            return nil
        }
    }

    @discardableResult
    func reorderPresentationSlide(branchId: String, orderedSiblingBranchIds: [String]) async -> Bool {
        guard let client, isOnline else {
            saveError = String(localized: "Connect to the server to reorder slides.", comment: "Presentation offline reorder")
            showSaveError = true
            return false
        }
        do {
            try await client.placeBranchInSiblingOrder(branchId, orderedSiblingBranchIds: orderedSiblingBranchIds)
            await loadChildNotes()
            return true
        } catch {
            saveError = APIError.from(error).localizedDescription
            showSaveError = true
            return false
        }
    }

    /// Sets or replaces a label on a note (delete + create). Online-only.
    @discardableResult
    func setNoteLabel(noteId targetNoteId: String, name: String, value: String) async -> Bool {
        guard let client, isOnline else {
            saveError = String(localized: "Connect to the server to update this label.", comment: "Label edit offline")
            showSaveError = true
            return false
        }
        do {
            let noteResp = try await client.getNote(targetNoteId)
            let item = NoteItem(from: noteResp)
            if let existing = item.attributes.first(where: {
                $0.type == .label && $0.name.caseInsensitiveCompare(name) == .orderedSame
            }) {
                try await client.deleteAttribute(noteId: targetNoteId, attributeId: existing.attributeId)
            }
            try await client.createAttribute(CreateAttributeRequest(
                noteId: targetNoteId, type: "label", name: name,
                value: value, isInheritable: nil, position: nil
            ))
            if let profileId = serverProfileId {
                persistNoteResponse(try await client.getNote(targetNoteId), profileId: profileId)
                try? persistence.commitBatch()
            }
            if targetNoteId == noteId {
                await load()
            }
            return true
        } catch {
            saveError = APIError.from(error).localizedDescription
            showSaveError = true
            return false
        }
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
                return h.containsASCIICaseInsensitive("api/attachments/")
                    || h.containsASCIICaseInsensitive("api/images/")
            }()
            // Defer publishing HTML with unresolved Trilium image URLs so the read-only web view does not paint broken `<img>`s before the `trinote-img://` rewrite runs.
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
}
