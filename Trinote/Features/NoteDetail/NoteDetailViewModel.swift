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
    @ObservationIgnored private var _pendingEditorHTML: String?
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

    let noteId: String
    private let appState: AppState
    /// From the tree when opening a note whose children are in memory but not (yet) in SwiftData — critical offline.
    @ObservationIgnored private let seedChildSummaries: [ChildNoteSummary]?
    private let persistence = PersistenceManager.shared
    private var draftAutoSaveTask: Task<Void, Never>?
    private var serverContentHash: Int?
    /// The server's utcDateModified for the current note, set during metadata fetch.
    private var serverUtcDateModified: String?

    init(noteId: String, appState: AppState, seedChildSummaries: [ChildNoteSummary]? = nil) {
        self.noteId = noteId
        self.appState = appState
        self.seedChildSummaries = seedChildSummaries
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }
    var isOnline: Bool { appState.isOnline }
    var serverBaseURL: URL? { (appState.client as? TriliumClient)?.baseURL }

    private static func persistNoteResponse(_ response: NoteResponse, profileId: String, persistence: PersistenceManager) {
        try? persistence.cacheNote(from: response, serverProfileId: profileId)
        for attr in response.attributes {
            try? persistence.cacheAttributeBatch(from: attr, serverProfileId: profileId)
        }
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
                Self.persistNoteResponse(response, profileId: profileId, persistence: persistence)
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
                    Self.persistNoteResponse(response, profileId: profileId, persistence: persistence)
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

        if let n = self.note {
            Log.noteDiag.info("\(NoteDiagnostics.describeNoteItem(n, phase: "load.afterCacheMeta"))")
        } else {
            Log.noteDiag.info("NoteDiag READ phase=load.afterCacheMeta noteId=\(nid) cachedMeta=nil")
        }
        let trimmedAfterCache = (self.contentString ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        let afterCacheContentLog = NoteDiagnostics.describeContentState(
            phase: "load.afterCacheContent",
            noteId: nid,
            contentBytes: self.content?.count,
            trimmedBodyEmpty: trimmedAfterCache.isEmpty,
            previewSource: self.rawContentString
        )
        Log.noteDiag.info("\(afterCacheContentLog)")

        if let note, let profileId = self.serverProfileId {
            try? self.persistence.recordRecentNote(
                noteId: nid, title: note.title,
                noteType: note.type.rawValue, serverProfileId: profileId
            )
        }

        rebuildBreadcrumbsFromCache()

        // Do not await getNote while offline — same long URLSession stall as bootstrap “Connecting…”.
        if !appState.isOnline {
            Log.noteDiag.info("NoteDiag READ phase=load.skipServer noteId=\(nid) reason=offline")
            return
        }

        // Background server refresh
        guard let client else { return }
        let hadCachedNote = self.note != nil
        if !hadCachedNote { isLoading = true; error = nil }
        defer { if !hadCachedNote { isLoading = false } }

        do {
            let response = try await client.getNote(nid)
            Log.noteDiag.info("\(NoteDiagnostics.describeNoteResponse(response, phase: "load.getNote.success"))")
            let fresh = NoteItem(from: response)
            self.note = fresh
            self.serverUtcDateModified = response.utcDateModified
            self.serverVerified = true
            await updateSharedPublicState(client: client)

            if let profileId = self.serverProfileId {
                Self.persistNoteResponse(response, profileId: profileId, persistence: self.persistence)
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
            Log.api.error("Failed to load note: \(error)")
            Log.noteDiag.error("NoteDiag READ phase=load.getNote.failed noteId=\(nid) error=\(String(describing: apiError))")
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

        if let raw = self.rawContentString,
           raw.contains("api/attachments/") || raw.contains("api/images/") {
            let inlined = await self.inlineAttachmentImages(in: raw)
            if inlined != self.contentString {
                self.contentString = inlined
            }
        }

        guard let note = self.note else {
            Log.noteDiag.info("NoteDiag CONTENT phase=loadContent.noNote noteId=\(self.noteId)")
            return
        }

        if !note.isProtected {
            self.needsProtectedSession = false
        } else if !appState.protectedSessionActive, contentString == nil, content == nil {
            // `loadContentFromCache` skips protected bodies until unlock — keep overlay visible offline too.
            self.needsProtectedSession = true
        }

        self.checkForDraft()

        // When offline, rely on SwiftData only; avoid getNoteContent timeouts and a stuck loading state.
        if !appState.isOnline {
            let trimmed = (self.contentString ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
            let offlineContentLog = NoteDiagnostics.describeContentState(
                phase: "loadContent.skipServer.offline",
                noteId: nid,
                contentBytes: self.content?.count,
                trimmedBodyEmpty: trimmed.isEmpty,
                previewSource: self.rawContentString
            )
            Log.noteDiag.info("\(offlineContentLog)")
            return
        }

        guard let client else {
            Log.noteDiag.info("NoteDiag CONTENT phase=loadContent.noClient noteId=\(nid)")
            return
        }
        let profileId = self.serverProfileId ?? ""
        let cachedDate = (try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId))?.utcDateModified

        let trimmedBody = (self.contentString ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        let hasUsableBody = !trimmedBody.isEmpty
        let childIdsForBlobPolicy = resolvedChildNoteIdsForDetail()
        // Trilium often has no/empty blob for `book`; geo maps mis-typed as `book` still store viewport JSON.
        // If we skip `getNoteContent` because metadata looks fresh, we never load that JSON.
        let shouldFetchBlobDespiteFreshMeta = !hasUsableBody && (
            note.isSemanticGeoMap
            || (note.type == .book && !childIdsForBlobPolicy.isEmpty)
        )

        let forceFetchProtected = note.isProtected && !appState.protectedSessionActive
        if let serverDate = self.serverUtcDateModified, let cachedDate, serverDate <= cachedDate, !forceFetchProtected {
            self.serverVerified = true
            if note.isProtected {
                self.needsProtectedSession = false
                if appState.protectedSessionActive {
                    await resyncNoteTitlesWithProtectedSession()
                }
            }
            if !shouldFetchBlobDespiteFreshMeta {
                let blobPolicyLog = NoteDiagnostics.describeBlobFetchDecision(
                    noteId: nid,
                    isSemanticGeoMap: note.isSemanticGeoMap,
                    noteTypeBook: note.type == .book,
                    childCountForPolicy: childIdsForBlobPolicy.count,
                    hasUsableBody: hasUsableBody,
                    shouldFetchDespiteFreshMeta: shouldFetchBlobDespiteFreshMeta,
                    serverUtc: serverDate,
                    cachedUtc: cachedDate,
                    forceFetchProtected: forceFetchProtected,
                    earlyExitReason: "skip_getNoteContent_meta_not_newer"
                )
                Log.noteDiag.info("\(blobPolicyLog)")
                return
            }
            let blobOverrideLog = NoteDiagnostics.describeBlobFetchDecision(
                noteId: nid,
                isSemanticGeoMap: note.isSemanticGeoMap,
                noteTypeBook: note.type == .book,
                childCountForPolicy: childIdsForBlobPolicy.count,
                hasUsableBody: hasUsableBody,
                shouldFetchDespiteFreshMeta: shouldFetchBlobDespiteFreshMeta,
                serverUtc: serverDate,
                cachedUtc: cachedDate,
                forceFetchProtected: forceFetchProtected,
                earlyExitReason: "override_fetch_empty_body_geo_or_book_children"
            )
            Log.noteDiag.info("\(blobOverrideLog)")
        } else {
            let blobFetchLog = NoteDiagnostics.describeBlobFetchDecision(
                noteId: nid,
                isSemanticGeoMap: note.isSemanticGeoMap,
                noteTypeBook: note.type == .book,
                childCountForPolicy: childIdsForBlobPolicy.count,
                hasUsableBody: hasUsableBody,
                shouldFetchDespiteFreshMeta: shouldFetchBlobDespiteFreshMeta,
                serverUtc: self.serverUtcDateModified,
                cachedUtc: cachedDate,
                forceFetchProtected: forceFetchProtected,
                earlyExitReason: "will_fetch_meta_newer_or_uncached_or_protected_gate"
            )
            Log.noteDiag.info("\(blobFetchLog)")
        }

        let hadCachedContent = self.contentString != nil
        if !hadCachedContent { isLoadingContent = true }
        defer { if !hadCachedContent { isLoadingContent = false } }

        do {
            Log.noteDiag.info("NoteDiag CONTENT phase=loadContent.beginGetNoteContent noteId=\(nid) hadCachedContentString=\(hadCachedContent)")
            let data = try await client.getNoteContent(nid)
            let htmlString = String(data: data, encoding: .utf8)
            let blobOkLog = NoteDiagnostics.describeContentState(
                phase: "loadContent.getNoteContent.success",
                noteId: nid,
                contentBytes: data.count,
                trimmedBodyEmpty: (htmlString ?? "").trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
                previewSource: htmlString
            )
            Log.noteDiag.info("\(blobOkLog)")

            self.content = data
            self.serverContentHash = htmlString?.hashValue
            self.rawContentString = htmlString

            var displayHTML = htmlString
            if let html = displayHTML,
               html.contains("api/attachments/") || html.contains("api/images/") {
                displayHTML = await self.inlineAttachmentImages(in: html)
            }

            self.contentString = displayHTML
            self.serverVerified = true

            if note.isProtected {
                self.appState.protectedSessionActive = true
                self.needsProtectedSession = false
                self.protectedUnlockError = nil
            }

            if let profileId = self.serverProfileId {
                try? self.persistence.cacheNoteContent(
                    nid, content: data, serverProfileId: profileId,
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
            Log.noteDiag.error("NoteDiag CONTENT phase=loadContent.getNoteContent.failed noteId=\(nid) error=\(String(describing: apiError))")

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

    /// Finds Trilium image `src` URLs in HTML and replaces them with
    /// base64 data URIs. Checks local image cache first; falls back to
    /// network (and caches the result) only on cache miss.
    private func inlineAttachmentImages(in html: String) async -> String {
        var result = html

        let pattern = try! NSRegularExpression(
            pattern: #"src=["'](?:/?api/(attachments|images)/([a-zA-Z0-9_]+)/[^"']*)["']"#,
            options: []
        )
        let nsHTML = html as NSString
        let matches = pattern.matches(in: html, range: NSRange(location: 0, length: nsHTML.length))

        let profileId = self.serverProfileId ?? ""

        for match in matches.reversed() {
            guard match.numberOfRanges >= 3 else { continue }
            let routeType = nsHTML.substring(with: match.range(at: 1))
            let entityId = nsHTML.substring(with: match.range(at: 2))
            let fullMatch = nsHTML.substring(with: match.range)

            var imageData: Data?

            // Check local image cache first
            do {
                if let cached = try self.persistence.fetchCachedImage(
                    entityId: entityId, entityType: routeType, serverProfileId: profileId
                ) {
                    imageData = cached.data
                    Log.api.debug("Image cache hit: \(routeType)/\(entityId)")
                }
            } catch {
                Log.api.warning("Image cache lookup failed: \(error)")
            }

            // Network fallback on cache miss
            if imageData == nil, let client {
                do {
                    if routeType == "attachments" {
                        imageData = try await client.getAttachmentContent(entityId)
                    } else {
                        imageData = try await client.getNoteContent(entityId)
                    }
                    if let data = imageData {
                        let mime = data.detectImageMIME()
                        do {
                            try self.persistence.cacheImage(
                                entityId: entityId, entityType: routeType,
                                data: data, mime: mime, serverProfileId: profileId
                            )
                            Log.api.debug("Cached image: \(routeType)/\(entityId)")
                        } catch {
                            Log.api.warning("Failed to cache image: \(error)")
                        }
                    }
                } catch {
                    Log.api.error("Failed to download image \(routeType)/\(entityId)")
                }
            }

            if let data = imageData {
                let mime = data.detectImageMIME()
                let b64 = data.base64EncodedString()
                let dataURI = "data:\(mime);base64,\(b64)"
                let replacement = "src=\"\(dataURI)\""
                result = (result as NSString).replacingCharacters(
                    in: (result as NSString).range(of: fullMatch),
                    with: replacement
                )
            }
        }

        return result
    }

    /// Pull-to-refresh: fetches metadata + content into local vars first,
    /// then applies everything to @Observable state in one batch. This
    /// prevents mid-flight SwiftUI re-evaluation from cancelling the
    /// URLSession content request.
    func refresh() async {
        guard let client else { return }
        let nid = self.noteId
        let profileId = self.serverProfileId ?? ""

        // 1) Fetch metadata into local vars (no @Observable writes yet)
        var metaResponse: NoteResponse?
        var serverDate: String?
        do {
            let response = try await client.getNote(nid)
            metaResponse = response
            serverDate = response.utcDateModified
            Log.noteDiag.info("\(NoteDiagnostics.describeNoteResponse(response, phase: "refresh.getNote.success"))")
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            Log.api.error("Note detail refresh: getNote failed — leaving UI unchanged")
            Log.noteDiag.error("NoteDiag READ phase=refresh.getNote.failed noteId=\(nid) error=\(String(describing: apiError))")
        }

        // 2) Compare timestamps
        let cachedDate = (try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId))?.utcDateModified
        let serverIsNewer = serverDate != nil && (cachedDate == nil || serverDate! > cachedDate!)

        if !serverIsNewer {
            if let response = metaResponse {
                self.note = NoteItem(from: response)
                self.serverUtcDateModified = serverDate
                self.serverVerified = true
                await updateSharedPublicState(client: client)
            }
            await loadChildNotes()
            return
        }

        // 3) Fetch content into local vars (still no @Observable writes)
        var fetchedData: Data?
        var fetchedHTML: String?
        var skipApplyingStaleMetaNote = false
        do {
            Log.noteDiag.info("NoteDiag CONTENT phase=refresh.beginGetNoteContent noteId=\(nid)")
            let data = try await client.getNoteContent(nid)
            fetchedData = data
            fetchedHTML = String(data: data, encoding: .utf8)
            let refreshBlobLog = NoteDiagnostics.describeContentState(
                phase: "refresh.getNoteContent.success",
                noteId: nid,
                contentBytes: data.count,
                trimmedBodyEmpty: (fetchedHTML ?? "").trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
                previewSource: fetchedHTML
            )
            Log.noteDiag.info("\(refreshBlobLog)")
        } catch {
            let apiError = APIError.from(error)
            if case .cancelled = apiError {
                return
            }
            Log.api.error("Note detail refresh: getNoteContent failed — will apply meta only; content may stay stale or empty")
            Log.noteDiag.error("NoteDiag CONTENT phase=refresh.getNoteContent.failed noteId=\(nid) error=\(String(describing: apiError))")
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
                    Self.persistNoteResponse(response, profileId: pid, persistence: persistence)
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

        if let pid = self.serverProfileId {
            try? self.persistence.cacheNoteContent(
                nid, content: data, serverProfileId: pid,
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

        saveCheckboxChange(newRaw)
    }

    private func saveCheckboxChange(_ html: String) {
        let nid = self.noteId
        let data = Data(html.utf8)
        let mime = note?.mime ?? "text/html"
        guard let profileId = serverProfileId else { return }

        do {
            try persistence.cacheNoteContent(nid, content: data, serverProfileId: profileId, utcDateModified: nil)
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
            Log.api.error("Failed to save checkbox state locally: \(error)")
        }
        appState.backgroundSyncPendingChanges()
    }

    // MARK: - Drafts

    private func checkForDraft() {
        guard let profileId = self.serverProfileId else { return }
        let nid = self.noteId
        if let draft = try? self.persistence.loadDraft(noteId: nid, serverProfileId: profileId) {
            if draft.content != self.contentString {
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
    }

    func discardDraft() {
        guard let profileId = self.serverProfileId else { return }
        try? self.persistence.deleteDraft(noteId: self.noteId, serverProfileId: profileId)
        self.hasDraft = false
        self.editableContent = self.contentString ?? ""
    }

    /// Called from the rich text editor's JS bridge on every debounced keystroke.
    /// Updates a non-observable backing store to avoid SwiftUI re-evaluation.
    func receiveEditorUpdate(_ html: String) {
        _pendingEditorHTML = html
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
            editableContent = contentString ?? ""
        }
        isEditing = true
        startDraftAutoSave()
    }

    func cancelEditing() {
        draftAutoSaveTask?.cancel()
        flushPendingEditorContent()
        if editableContent != contentString {
            saveDraftLocally()
            hasDraft = true
        }
        isEditing = false
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
            try persistence.cacheNoteContent(nid, content: data, serverProfileId: profileId, utcDateModified: nil)
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
            try persistence.cacheNoteContent(nid, content: data, serverProfileId: profileId, utcDateModified: nil)
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

    func saveContent() {
        flushPendingEditorContent()
        guard let note else {
            self.saveError = String(localized: "Could not load this note.", comment: "Save without cached note")
            self.showSaveError = true
            self.saveDraftLocally()
            return
        }

        saveNoteBodyLocally(note: note)
        appState.backgroundSyncPendingChanges()
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
                    Self.persistNoteResponse(updated, profileId: profileId, persistence: persistence)
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
                try? persistence.cacheNote(from: response.note, serverProfileId: profileId)
                try? persistence.cacheBranch(from: response.branch, serverProfileId: profileId)
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
        let trimmed = self.newNoteTitle.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, let profileId = serverProfileId else { return nil }
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
                title: trimmed,
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

    func uploadAttachment(data: Data, filename: String, mime: String) async -> Bool {
        let nid = self.noteId
        guard let client else {
            self.saveError = "Cannot upload while offline."
            self.showSaveError = true
            return false
        }
        self.isSaving = true
        defer { self.isSaving = false }

        do {
            let base64 = data.base64EncodedString()
            let request = CreateAttachmentRequest(
                ownerId: nid,
                role: "file",
                mime: mime,
                title: filename,
                content: base64,
                position: nil
            )
            _ = try await client.createAttachment(request)
            await self.loadAttachments()
            return true
        } catch {
            self.saveError = APIError.from(error).localizedDescription
            self.showSaveError = true
            return false
        }
    }

    // MARK: - Child Notes

    /// Merges every local source: `CachedBranch` rows (canonical order), `childBranchIds` on the parent note, `childNoteIds`, then notes that list this id in `parentNoteIds`.
    private func resolvedChildNoteIdsForDetail() -> [String] {
        guard let profileId = serverProfileId else { return [] }
        var seen = Set<String>()
        var ordered: [String] = []
        func append(_ ids: [String]) {
            for id in ids {
                guard !id.isEmpty, seen.insert(id).inserted else { continue }
                ordered.append(id)
            }
        }
        append(
            (try? persistence.fetchChildNoteIdsOrderedFromBranches(
                parentNoteId: noteId,
                serverProfileId: profileId
            )) ?? []
        )
        if let n = note, !n.childBranchIds.isEmpty {
            append((try? persistence.fetchNoteIdsForChildBranchIds(branchIds: n.childBranchIds, serverProfileId: profileId)) ?? [])
        }
        append(note?.childNoteIds ?? [])
        if ordered.isEmpty {
            append(
                (try? persistence.fetchChildNoteIdsReferencingParent(
                    parentNoteId: noteId,
                    serverProfileId: profileId
                )) ?? []
            )
        }
        return ordered
    }

    /// Fetches the parent and each direct child from the server, updates the local cache, then reloads `childNotes`.
    /// Use after geo-map pin changes or when child titles may have changed on the server.
    func refreshDirectChildrenMetadataFromServer() async {
        guard let client, let profileId = serverProfileId else {
            await loadChildNotes()
            return
        }
        do {
            let parentResp = try await client.getNote(noteId)
            Self.persistNoteResponse(parentResp, profileId: profileId, persistence: persistence)
            self.note = NoteItem(from: parentResp)
        } catch {
        }
        let childIds = resolvedChildNoteIdsForDetail()
        for childId in childIds {
            do {
                let response = try await client.getNote(childId)
                Self.persistNoteResponse(response, profileId: profileId, persistence: persistence)
            } catch {
            }
        }
        try? persistence.commitBatch()
        await loadChildNotes()
    }

    /// Loads child notes purely from cache. The sync keeps the cache fresh.
    func loadChildNotes() async {
        let childIds = resolvedChildNoteIdsForDetail()
        if childIds.isEmpty {
            if let seed = seedChildSummaries, !seed.isEmpty {
                childNotes = seed
            } else {
                childNotes = []
            }
            geoMapDetectionTick &+= 1
            return
        }
        loadChildNotesFromCache(childNoteIds: childIds)
        applySeedChildMetadataMerge()
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
        let missingMetaTitle = String(localized: "Sub-note", comment: "Child row title when this note is not in the local database yet (offline or not synced)")
        for childId in childNoteIds {
            if let cached = try? self.persistence.fetchCachedNote(id: childId, serverProfileId: profileId) {
                let cachedAttrs = (try? self.persistence.fetchCachedAttributes(noteId: childId, serverProfileId: profileId)) ?? []
                let iconClass = cachedAttrs.first { $0.name == "iconClass" }?.value
                results.append(ChildNoteSummary(
                    noteId: cached.noteId,
                    title: cached.title,
                    isProtected: cached.isProtected,
                    type: NoteType(rawValue: cached.noteType) ?? .text,
                    iconClass: iconClass,
                    childCount: cached.childNoteIds.count
                ))
            } else {
                // Parent lists child IDs from metadata, but we never stored a row for this child (common when only part of the tree was synced).
                results.append(ChildNoteSummary(
                    noteId: childId,
                    title: missingMetaTitle,
                    isProtected: false,
                    type: .text,
                    iconClass: nil,
                    childCount: 0
                ))
            }
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
        guard let note, note.isSemanticGeoMap, !note.isCalendarRoot else {
            Log.noteDiag.debug(
                "NoteDiag GEO_PREFETCH skip noteId=\(self.noteId) hasNote=\(self.note != nil) semanticGeo=\(self.note?.isSemanticGeoMap ?? false) calendarRoot=\(self.note?.isCalendarRoot ?? false)"
            )
            return
        }
        guard let client, isOnline, let profileId = serverProfileId else {
            Log.noteDiag.debug(
                "NoteDiag GEO_PREFETCH skip noteId=\(note.noteId) client=\(self.client != nil) online=\(self.isOnline) profile=\(self.serverProfileId != nil)"
            )
            return
        }
        let body = (contentString ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        guard body.isEmpty else {
            Log.noteDiag.debug("NoteDiag GEO_PREFETCH skip noteId=\(note.noteId) reason=bodyNonEmpty len=\(body.count)")
            return
        }
        let childIds = resolvedChildNoteIdsForDetail()
        let hasGeoChild = cachedAnyChildHasGeolocationLabel()
        guard !childIds.isEmpty, !hasGeoChild else {
            Log.noteDiag.info(
                "NoteDiag GEO_PREFETCH skip noteId=\(note.noteId) childIds.empty=\(childIds.isEmpty) cachedAnyChildHasGeolocation=\(hasGeoChild)"
            )
            return
        }

        Log.noteDiag.info(
            "NoteDiag GEO_PREFETCH begin noteId=\(note.noteId) childCount=\(childIds.count) firstIds=\(childIds.prefix(8).joined(separator: ","))"
        )
        for childId in childIds.prefix(16) {
            do {
                let response = try await client.getNote(childId)
                Log.noteDiag.info(
                    "NoteDiag GEO_PREFETCH child noteId=\(childId) api.type=\(response.type) title=\(String(response.title.prefix(80))) attrCount=\(response.attributes.count)"
                )
                Self.persistNoteResponse(response, profileId: profileId, persistence: persistence)
            } catch {
                Log.noteDiag.warning("NoteDiag GEO_PREFETCH child failed noteId=\(childId) \(error.localizedDescription)")
            }
        }
        try? persistence.commitBatch()
        geoMapDetectionTick &+= 1
    }

    // MARK: - Cache Fallback

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
        guard let profileId = self.serverProfileId else {
            Log.noteDiag.debug("NoteDiag CONTENT phase=cache.skip noteId=\(self.noteId) reason=noServerProfileId")
            return
        }
        let nid = self.noteId
        if let cached = try? self.persistence.fetchCachedNote(id: nid, serverProfileId: profileId),
           let data = cached.content {
            if cached.isProtected, !appState.protectedSessionActive {
                Log.noteDiag.info("NoteDiag CONTENT phase=cache.skipProtected noteId=\(nid) bytes=\(data.count)")
                return
            }
            content = data
            let html = String(data: data, encoding: .utf8)
            rawContentString = html
            contentString = html
            checkForDraft()
            let trimmed = (html ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
            let cacheHitLog = NoteDiagnostics.describeContentState(
                phase: "cache.hit",
                noteId: nid,
                contentBytes: data.count,
                trimmedBodyEmpty: trimmed.isEmpty,
                previewSource: html
            )
            Log.noteDiag.info("\(cacheHitLog)")
        } else {
            Log.noteDiag.info("NoteDiag CONTENT phase=cache.miss noteId=\(nid) (no cached row or empty content)")
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
