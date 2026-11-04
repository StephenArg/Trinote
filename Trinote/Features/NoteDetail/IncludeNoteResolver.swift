import Foundation

/// Resolves Trilium/CKEditor `<section class="include-note" data-note-id="…">` placeholders into
/// `.trinote-include` cards with type-specific previews (mirrors desktop `renderIncludedNotes` behavior).
@MainActor
struct IncludeNoteResolver {
    private let client: (any TriliumClientProtocol)?
    private let persistence: PersistenceManager
    private let profileId: String
    private let protectedSessionActive: Bool
    private let isOnline: Bool
    private let inlineAttachmentImages: (String) async -> String

    init(
        client: (any TriliumClientProtocol)?,
        persistence: PersistenceManager,
        profileId: String,
        protectedSessionActive: Bool,
        isOnline: Bool,
        inlineAttachmentImages: @escaping (String) async -> String
    ) {
        self.client = client
        self.persistence = persistence
        self.profileId = profileId
        self.protectedSessionActive = protectedSessionActive
        self.isOnline = isOnline
        self.inlineAttachmentImages = inlineAttachmentImages
    }

    /// Rewrites all top-level include-note sections. Nested includes inside text bodies recurse with
    /// `nestingLevel` + 1 up to `maxNesting` (default 3).
    func resolve(html: String, seenNoteIds: Set<String>, nestingLevel: Int = 0, maxNesting: Int = 3) async -> String {
        guard html.containsASCII("include-note") else { return html }
        var result = html
        while let block = Self.findNextIncludeBlock(in: result) {
            let replacement = await renderIncludeBlock(
                openTag: block.openTag,
                seenNoteIds: seenNoteIds,
                nestingLevel: nestingLevel,
                maxNesting: maxNesting
            )
            result.replaceSubrange(block.fullRange, with: replacement)
        }
        return result
    }

    // MARK: - Block scan

    private struct IncludeBlock {
        let fullRange: Range<String.Index>
        let openTag: String
    }

    nonisolated private static func findNextIncludeBlock(in html: String) -> IncludeBlock? {
        let lowered = html.lowercased()
        var searchStart = lowered.startIndex
        while searchStart < lowered.endIndex,
              let openLower = lowered[searchStart...].range(of: "<section") {
            let openStart = openLower.lowerBound
            guard let gt = html[openLower.upperBound...].firstIndex(of: ">") else { return nil }
            let openEnd = html.index(after: gt)
            let openTag = String(html[openStart..<openEnd])
            guard openTag.lowercased().contains("include-note") else {
                searchStart = openEnd
                continue
            }
            guard let closeRange = closingSectionRange(html: html, scanFrom: openEnd) else { return nil }
            let fullEnd = closeRange.upperBound
            return IncludeBlock(fullRange: openStart..<fullEnd, openTag: openTag)
        }
        return nil
    }

    nonisolated private static func closingSectionRange(html: String, scanFrom: String.Index) -> Range<String.Index>? {
        let pattern = try! NSRegularExpression(
            pattern: #"(?i)<section\b[^>]*>|</section>"#,
            options: []
        )
        let ns = html as NSString
        let utf16Start = html.utf16.distance(from: html.utf16.startIndex, to: scanFrom.samePosition(in: html.utf16)!)
        var depth = 1
        var pos = utf16Start
        while depth > 0, pos < ns.length {
            let subRange = NSRange(location: pos, length: ns.length - pos)
            guard let m = pattern.firstMatch(in: html, options: [], range: subRange) else { return nil }
            let frag = ns.substring(with: m.range).lowercased()
            if frag.hasPrefix("</section") {
                depth -= 1
                if depth == 0, let r = Range(m.range, in: html) { return r }
                pos = NSMaxRange(m.range)
            } else if frag.hasPrefix("<section") {
                depth += 1
                pos = NSMaxRange(m.range)
            } else {
                pos = NSMaxRange(m.range)
            }
        }
        return nil
    }

    // MARK: - Render one block

    private func renderIncludeBlock(
        openTag: String,
        seenNoteIds: Set<String>,
        nestingLevel: Int,
        maxNesting: Int
    ) async -> String {
        let noteId = Self.extractAttribute(from: openTag, name: "data-note-id")?.trimmingCharacters(in: .whitespacesAndNewlines)
        let boxRaw = Self.extractAttribute(from: openTag, name: "data-box-size")?.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let boxSize: String = {
            switch boxRaw {
            case "small", "medium", "full": return boxRaw!
            default: return "full"
            }
        }()

        guard let nid = noteId, !nid.isEmpty else {
            return Self.wrapErrorCard(
                noteId: "invalid",
                boxSize: boxSize,
                title: String(localized: "Include", comment: "Include note default title"),
                bodyHTML: Self.escapeHTML(String(localized: "Invalid include (missing note id).", comment: "Include note bad id"))
            )
        }

        if seenNoteIds.contains(nid) {
            return Self.wrapCard(
                noteId: nid,
                boxSize: boxSize,
                noteType: "text",
                title: Self.cachedTitle(noteId: nid, persistence: persistence, profileId: profileId) ?? nid,
                bodyHTML: Self.escapeHTML(String(localized: "Already included above (circular reference).", comment: "Include note cycle"))
            )
        }

        if nestingLevel > maxNesting {
            return Self.wrapCard(
                noteId: nid,
                boxSize: boxSize,
                noteType: "text",
                title: Self.cachedTitle(noteId: nid, persistence: persistence, profileId: profileId) ?? nid,
                bodyHTML: Self.escapeHTML(String(localized: "Maximum nesting depth reached.", comment: "Include note depth limit"))
            )
        }

        await hydrateNoteFromServerIfNeeded(noteId: nid)

        let item = await fetchNoteItem(noteId: nid)
        guard let item else {
            return Self.wrapErrorCard(
                noteId: nid,
                boxSize: boxSize,
                title: nid,
                bodyHTML: Self.escapeHTML(String(localized: "Note not found.", comment: "Include note missing"))
            )
        }

        let title = item.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? nid : item.title
        let typeStr = item.type.rawValue
        var options = PreviewOptions()
        options.seenNoteIds = seenNoteIds
        options.nestingLevel = nestingLevel
        options.maxNesting = maxNesting
        let bodyHTML: String
        switch await previewBody(for: item, options: options) {
        case .html(_, let html):
            bodyHTML = html
        case .protected:
            bodyHTML = Self.escapeHTML(String(localized: "Protected — open to view.", comment: "Include note protected locked"))
        case .unavailable, .tooLarge:
            bodyHTML = Self.escapeHTML(Self.couldNotLoadMessage(for: item.type))
        case .noPreview:
            bodyHTML = Self.fallbackPreviewHTML(type: item.type)
        }
        return Self.wrapCard(noteId: nid, boxSize: boxSize, noteType: typeStr, title: title, bodyHTML: bodyHTML)
    }

    // MARK: - Previews

    /// How a note's content is drawn: as an include card (the defaults) or as a collection preview (grid card,
    /// list row, dashboard widget), which mirrors Trilium's `getRenderedContent` options.
    struct PreviewOptions: Sendable {
        /// Trilium's `trim`: `<style>` and embedded includes are dropped from text.
        var trim = false
        /// An empty text or book note stays empty instead of listing its children.
        var noChildrenList = false
        /// Archived children appear in the children list.
        var includeArchived = false
        /// Bodies larger than this are not downloaded; `nil` downloads any size.
        var maxBytes: Int? = nil
        /// Bodies already in hand (fetched together for a page), read before the cache and the server.
        var bodies: [String: Data] = [:]
        /// Notes whose body was already found too large.
        var tooLargeNoteIds: Set<String> = []
        /// Mermaid as an inline `<div class="mermaid">` the page draws itself, instead of a pre-rendered SVG.
        var inlineMermaid = false
        var seenNoteIds: Set<String> = []
        var nestingLevel = 0
        var maxNesting = 3
    }

    enum PreviewResult: Sendable, Equatable {
        /// Rendered content; `kind` is Trilium's rendering type (`text`, `code`, `image`, …).
        case html(kind: String, html: String)
        /// A protected note while the session is locked.
        case protected
        /// Larger than `maxBytes`.
        case tooLarge
        /// The body couldn't be read: offline and not cached, or the request failed.
        case unavailable
        /// A type with no preview.
        case noPreview
    }

    /// The preview of `item`'s content, per note type, as Trilium's `getRenderedContent` builds it.
    func previewBody(for item: NoteItem, options: PreviewOptions) async -> PreviewResult {
        let nid = item.noteId
        if item.isProtected, !protectedSessionActive { return .protected }

        switch item.type {
        case .text:
            switch await loadRawBodyResult(noteId: nid, options: options) {
            case .tooLarge: return .tooLarge
            case .unavailable: return .unavailable
            case .data(let data):
                var expanded = String(decoding: data, as: UTF8.self)
                if options.trim {
                    expanded = Self.stripIncludeSections(Self.stripStyleTags(expanded))
                }
                if Self.isHTMLEmpty(expanded) {
                    if options.noChildrenList { return .html(kind: "text", html: "") }
                    let list = await childListHTML(parent: item, includeArchived: options.includeArchived)
                    return .html(kind: "text", html: list)
                }
                if expanded.range(of: #"(?i)api/(attachments|images)/"#, options: .regularExpression) != nil
                    || expanded.range(of: #"(?i)<img\b"#, options: .regularExpression) != nil {
                    expanded = await inlineAttachmentImages(expanded)
                }
                if !options.trim {
                    let childSeen = options.seenNoteIds.union([nid])
                    let nextLevel = options.nestingLevel + 1
                    if nextLevel <= options.maxNesting {
                        expanded = await Self(
                            client: client,
                            persistence: persistence,
                            profileId: profileId,
                            protectedSessionActive: protectedSessionActive,
                            isOnline: isOnline,
                            inlineAttachmentImages: inlineAttachmentImages
                        ).resolve(html: expanded, seenNoteIds: childSeen, nestingLevel: nextLevel, maxNesting: options.maxNesting)
                    } else {
                        expanded = Self.replaceIncludeSectionsWithLinks(html: expanded)
                    }
                }
                return .html(kind: "text", html: "<div class=\"trinote-include__inner trinote-include__inner--text\">\(expanded)</div>")
            }
        case .image:
            if let imgTag = await imagePreviewTag(noteId: nid) {
                return .html(kind: "image", html: "<div class=\"trinote-include__inner trinote-include__inner--image\">\(imgTag)</div>")
            }
            return .unavailable
        case .code, .markdown:
            switch await loadRawBodyResult(noteId: nid, options: options) {
            case .tooLarge: return .tooLarge
            case .unavailable: return .unavailable
            case .data(let data):
                let src = String(decoding: data, as: UTF8.self)
                let langClass = mimeToLanguageClass(item.mime)
                return .html(kind: "code", html: "<div class=\"trinote-include__inner trinote-include__inner--code\"><pre><code class=\"\(langClass)\">\(Self.escapeHTML(src))</code></pre></div>")
            }
        case .mermaid:
            switch await loadRawBodyResult(noteId: nid, options: options) {
            case .tooLarge: return .tooLarge
            case .unavailable:
                Log.ui.error("[MMD] IncludeNoteResolver.mermaid noteId=\(nid, privacy: .public) body unavailable")
                return .unavailable
            case .data(let data):
                let diagram = Self.normalizedMermaidSource(String(decoding: data, as: UTF8.self))
                if !options.inlineMermaid, let svg = await MermaidRenderer.shared.render(source: diagram) {
                    return .html(kind: "mermaid", html: "<div class=\"trinote-include__inner trinote-include__inner--mermaid\">\(svg)</div>")
                }
                if !options.inlineMermaid {
                    Log.ui.error("[MMD] IncludeNoteResolver.mermaid noteId=\(nid, privacy: .public) render returned nil — FALLBACK to inline .mermaid block (HTMLNoteView snippet will render it)")
                }
                let esc = Self.escapeHTML(diagram)
                return .html(kind: "mermaid", html: "<div class=\"trinote-include__inner trinote-include__inner--mermaid\"><div class=\"mermaid\">\(esc)</div></div>")
            }
        case .book, .collection, .noteMap:
            if options.noChildrenList { return .html(kind: "text", html: "") }
            return .html(kind: "text", html: await childListHTML(parent: item, includeArchived: options.includeArchived))
        case .file:
            return .html(kind: "file", html: fileCardHTML(note: item))
        case .canvas:
            if let imgTag = await canvasExportSVGPreviewTag(noteId: nid) {
                return .html(kind: "canvas", html: "<div class=\"trinote-include__inner trinote-include__inner--image\">\(imgTag)</div>")
            }
            Log.ui.warning("[INCLUDE] resolver.canvas NO SVG noteId=\(nid, privacy: .public) online=\(self.isOnline)")
            return .noPreview
        case .mindMap:
            if case .data(let data) = await loadRawBodyResult(noteId: nid, options: options),
               let tree = Self.mindMapTreePreview(json: String(decoding: data, as: UTF8.self)) {
                return .html(kind: "mindMap", html: "<div class=\"trinote-include__inner trinote-include__inner--mindmap\">\(tree)</div>")
            }
            return .noPreview
        case .webView:
            // Trilium shows the page in an iframe; here the widget links to it (external links open in Safari).
            if let src = item.attributes.first(where: { $0.type == .label && $0.name == "webViewSrc" })?.value
                .trimmingCharacters(in: .whitespacesAndNewlines),
               let url = URL(string: src), let scheme = url.scheme?.lowercased(), scheme == "http" || scheme == "https" {
                let caption = Self.escapeHTML(url.host ?? src)
                return .html(kind: "webView", html: "<div class=\"no-preview\"><span class=\"tn-icon bx bx-globe-alt\"></span><a class=\"no-preview-caption\" href=\"\(Self.escapeHTML(src))\">\(caption)</a></div>")
            }
            return .noPreview
        case .geoMap, .relationMap, .render, .shortcut, .launcher, .doc, .contentWidget, .search, .calendar, .spreadsheet, .kanban, .presentation, .llmChat:
            return .noPreview
        }
    }

    private static func couldNotLoadMessage(for type: NoteType) -> String {
        switch type {
        case .image: return String(localized: "Could not load image.", comment: "Include image failed")
        case .code, .markdown: return String(localized: "Could not load code.", comment: "Include code failed")
        case .mermaid: return String(localized: "Could not load diagram.", comment: "Include mermaid failed")
        default: return String(localized: "Could not load note content.", comment: "Include note empty body")
        }
    }

    /// Trilium's `isHtmlEmpty`: an image, section, include or link mention is content; otherwise the text must be blank.
    nonisolated static func isHTMLEmpty(_ html: String) -> Bool {
        let lower = html.lowercased()
        if lower.contains("<img") || lower.contains("<section") || lower.contains("include-note") || lower.contains("link-mention") {
            return false
        }
        let text = html
            .replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
            .replacingOccurrences(of: "&nbsp;", with: " ")
        return text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    /// Removes `<style>` blocks, except inside inline SVG where they style the drawing.
    nonisolated static func stripStyleTags(_ html: String) -> String {
        guard html.range(of: "<style", options: .caseInsensitive) != nil else { return html }
        let svgPattern = try! NSRegularExpression(pattern: #"(?is)<svg\b.*?</svg>"#)
        let stylePattern = try! NSRegularExpression(pattern: #"(?is)<style\b[^>]*>.*?</style>"#)
        let ns = html as NSString
        let svgRanges = svgPattern.matches(in: html, range: NSRange(location: 0, length: ns.length)).map(\.range)
        var result = html
        for match in stylePattern.matches(in: html, range: NSRange(location: 0, length: ns.length)).reversed() {
            if svgRanges.contains(where: { NSIntersectionRange($0, match.range).length > 0 }) { continue }
            guard let range = Range(match.range, in: result) else { continue }
            result.removeSubrange(range)
        }
        return result
    }

    /// Removes embedded include-note sections outright (Trilium's `noContentEmbeds` for previews).
    nonisolated static func stripIncludeSections(_ html: String) -> String {
        var result = html
        while let block = findNextIncludeBlock(in: result) {
            result.removeSubrange(block.fullRange)
        }
        return result
    }

    /// When nesting limit is hit, turn remaining include placeholders into simple internal links (no fetch).
    private static func replaceIncludeSectionsWithLinks(html: String) -> String {
        var result = html
        while let block = findNextIncludeBlock(in: result) {
            let id = extractAttribute(from: block.openTag, name: "data-note-id")?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            let link: String
            if id.isEmpty {
                link = "<p><em>\(escapeHTML(String(localized: "Nested include (depth limit).", comment: "Include depth stub")))</em></p>"
            } else {
                let t = escapeHTML(id)
                link = "<p><a href=\"#/\(id)\">\(t)</a> — \(escapeHTML(String(localized: "Open nested note", comment: "Include depth link suffix")))</p>"
            }
            result.replaceSubrange(block.fullRange, with: link)
        }
        return result
    }

    private func fileCardHTML(note: NoteItem) -> String {
        let mime = Self.escapeHTML(note.mime)
        let t = Self.escapeHTML(note.title)
        let href = "triliuminclude://file/\(note.noteId)"
        return """
        <div class="trinote-include__inner trinote-include__inner--file">
          <a class="trinote-include__filelink" href="\(href)">\(t)</a>
          <div class="trinote-include__filemeta">\(mime)</div>
        </div>
        """
    }

    /// Mind-Elixir JSON → compact topic tree (root + up to 12 first-level branches).
    private static func mindMapTreePreview(json raw: String) -> String? {
        let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmed.hasPrefix("{") else { return nil }
        guard let data = trimmed.data(using: .utf8),
              let root = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let nodeData = root["nodeData"] as? [String: Any] else { return nil }
        let rootTopic = (nodeData["topic"] as? String).flatMap { $0.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? nil : $0 }
            ?? String(localized: "Mind map", comment: "Mind map include preview root fallback")
        var html = "<div class=\"trinote-include__mindmap-root\">\(escapeHTML(rootTopic))</div>"
        if let children = nodeData["children"] as? [[String: Any]], !children.isEmpty {
            var items = ""
            for child in children.prefix(12) {
                let topic = (child["topic"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
                if topic.isEmpty { continue }
                items += "<li>\(escapeHTML(topic))</li>"
            }
            if children.count > 12 {
                items += "<li>\u{2026}</li>"
            }
            if !items.isEmpty {
                html += "<ul class=\"trinote-include__mindmap-children\">\(items)</ul>"
            }
        }
        return html
    }

    private static func fallbackPreviewHTML(type: NoteType) -> String {
        let msg = String(localized: "Tap to open this note type in full view.", comment: "Include note advanced type preview")
        return "<div class=\"trinote-include__inner trinote-include__inner--fallback\"><p>\(escapeHTML(msg))</p><p class=\"trinote-include__typelabel\">\(escapeHTML(type.displayName))</p></div>"
    }

    /// Trilium may store mermaid as raw diagram text or wrapped in simple HTML (`<p>…</p>`).
    /// Internal so `NoteDetailViewModel.wrapImageLinkCanvasMermaidCards` can normalize sources
    /// that it fetches directly for `MermaidRenderer.render(source:)`.
    static func normalizedMermaidSource(_ raw: String) -> String {
        var s = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        guard s.hasPrefix("<") else { return s }
        if let br = try? NSRegularExpression(pattern: #"(?i)<\s*br\s*/?>"#, options: []) {
            let range = NSRange(s.startIndex..., in: s)
            s = br.stringByReplacingMatches(in: s, options: [], range: range, withTemplate: "\n")
        }
        if let tags = try? NSRegularExpression(pattern: "<[^>]+>", options: []) {
            let range = NSRange(s.startIndex..., in: s)
            s = tags.stringByReplacingMatches(in: s, options: [], range: range, withTemplate: "\n")
        }
        s = s.replacingOccurrences(of: "&gt;", with: ">")
            .replacingOccurrences(of: "&lt;", with: "<")
            .replacingOccurrences(of: "&amp;", with: "&")
        return s.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    /// An empty text or book note's first ten children as icon links (Trilium's `renderChildrenList`), in branch
    /// order; archived ones are skipped unless the collection shows them.
    private func childListHTML(parent: NoteItem, includeArchived: Bool) async -> String {
        var ids = (try? persistence.fetchChildNoteIdsOrderedFromBranches(parentNoteId: parent.noteId, serverProfileId: profileId)) ?? []
        if ids.isEmpty { ids = parent.childNoteIds }
        let shown = Array(ids.filter { !TriliumSharing.hiddenSystemChildNoteIds.contains($0) }.prefix(10))
        guard !shown.isEmpty else { return "" }
        var cached = (try? persistence.fetchCachedNotes(ids: shown, serverProfileId: profileId)) ?? [:]
        let missing = shown.filter { cached[$0] == nil }
        if !missing.isEmpty, isOnline, let client,
           let entries = try? await client.fullSyncFetchTreeBatch(noteIds: missing) {
            let policy = CacheExclusionPolicy()
            for entry in entries where !entry.note.isDeleted {
                try? persistence.cacheNoteIfAllowed(from: entry.note, serverProfileId: profileId, policy: policy)
            }
            try? persistence.commitBatch()
            cached = (try? persistence.fetchCachedNotes(ids: shown, serverProfileId: profileId)) ?? cached
        }
        var rows = ""
        for cid in shown {
            let note = cached[cid]
            let attrs = (try? persistence.fetchCachedAttributes(noteId: cid, serverProfileId: profileId)) ?? []
            if !includeArchived, attrs.contains(where: { $0.type == "label" && $0.name == "archived" }) { continue }
            let type = NoteType(rawValue: note?.noteType ?? "") ?? .text
            let hasChildren = !(note?.childBranchIds.isEmpty ?? true)
            let icon = BoxiconsResolver.usableIconClass(from: persistence.cachedEffectiveNoteIconClass(noteId: cid, serverProfileId: profileId))
                ?? CollectionNoteModels.defaultIconClass(type: type, hasChildren: hasChildren)
            var title = note.map {
                NoteItem.maskedStoredTitle($0.title, isProtected: $0.isProtected, protectedSessionActive: protectedSessionActive)
            } ?? cid
            if title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { title = cid }
            rows += "<a href=\"#/\(cid)\"><span class=\"tn-icon \(Self.escapeHTML(icon))\"></span>\(Self.escapeHTML(title))</a><br>"
        }
        return "<div class=\"trinote-include__inner trinote-include__inner--children text-with-ellipsis\">\(rows)</div>"
    }

    private func imagePreviewTag(noteId: String) async -> String? {
        guard let data = await loadRawBody(noteId: noteId), !data.isEmpty, data.isPlausibleInlineImagePayload else { return nil }
        let src = TriliumImageScheme.url(routeType: "images", entityId: noteId)
        return "<img class=\"trinote-include__img\" src=\"\(src)\" alt=\"\" />"
    }

    /// Canvas read-only view prefers `canvas-export.svg`; same for include previews.
    private func canvasExportSVGPreviewTag(noteId: String) async -> String? {
        guard let attachmentId = await canvasExportSVGAttachmentId(noteId: noteId) else { return nil }
        let clientForLoad: (any TriliumClientProtocol)? = isOnline ? client : nil
        let parentNoteIds = (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.parentNoteIds ?? []
        // Seed the cache so the scheme handler has bytes as soon as the card paints.
        _ = await TriliumInlineImageCaching.loadImageData(
            routeType: "attachments",
            entityId: attachmentId,
            client: clientForLoad,
            persistence: persistence,
            serverProfileId: profileId,
            sourceNoteId: noteId,
            parentNoteIds: parentNoteIds
        )
        let src = TriliumImageScheme.url(routeType: "attachments", entityId: attachmentId)
        return "<img class=\"trinote-include__img\" src=\"\(src)\" alt=\"\" />"
    }

    private func canvasExportSVGAttachmentId(noteId: String) async -> String? {
        guard isOnline, let client else { return nil }
        return await TriliumInlineImageCaching.canvasExportSVGAttachmentId(noteId: noteId, client: client)
    }

    /// When online, ensure SwiftData has metadata and body for a referenced note (mirrors read-only `load` + `loadContent` cache fill).
    private func hydrateNoteFromServerIfNeeded(noteId: String) async {
        guard isOnline, let client else { return }
        let policy = CacheExclusionPolicy()
        let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId)
        let contentEmpty = cached?.content == nil || (cached?.content?.isEmpty ?? true)
        var parentNoteIds = cached?.parentNoteIds ?? []
        if cached == nil {
            do {
                let response = try await client.getNote(noteId)
                parentNoteIds = response.parentNoteIds
                try? persistence.cacheNoteIfAllowed(from: response, serverProfileId: profileId, policy: policy)
            } catch {
                return
            }
        }
        guard contentEmpty else { return }
        do {
            let data = try await client.getNoteContent(noteId)
            try? persistence.cacheNoteContentIfAllowed(
                noteId,
                content: data,
                parentNoteIds: parentNoteIds,
                serverProfileId: profileId,
                utcDateModified: nil,
                policy: policy
            )
        } catch {
            Log.api.debug("IncludeNoteResolver: hydrate getNoteContent failed for \(noteId): \(error)")
        }
    }

    enum RawBody {
        case data(Data)
        case tooLarge
        case unavailable
    }

    private func loadRawBody(noteId: String) async -> Data? {
        if case .data(let data) = await loadRawBodyResult(noteId: noteId, options: PreviewOptions()) { return data }
        return nil
    }

    /// A note's body: one handed in with the options, else the cache, else the server (within `maxBytes`).
    private func loadRawBodyResult(noteId: String, options: PreviewOptions) async -> RawBody {
        if let body = options.bodies[noteId] { return .data(body) }
        if options.tooLargeNoteIds.contains(noteId) { return .tooLarge }
        let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId)
        if let cached, let content = cached.content, !content.isEmpty || cached.contentFetchedAt != nil {
            return .data(content)
        }
        guard isOnline, let client else { return .unavailable }
        let policy = CacheExclusionPolicy()
        let parentNoteIds = cached?.parentNoteIds ?? []
        do {
            let data: Data?
            if let maxBytes = options.maxBytes {
                data = try await client.getNoteContent(noteId, maxBytes: maxBytes)
            } else {
                data = try await client.getNoteContent(noteId)
            }
            guard let data else { return .tooLarge }
            try? persistence.cacheNoteContentIfAllowed(
                noteId,
                content: data,
                parentNoteIds: parentNoteIds,
                serverProfileId: profileId,
                utcDateModified: nil,
                policy: policy
            )
            return .data(data)
        } catch {
            Log.api.debug("IncludeNoteResolver: getNoteContent failed for \(noteId): \(error)")
            return .unavailable
        }
    }

    private func fetchNoteItem(noteId: String) async -> NoteItem? {
        if let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId) {
            let fake = NoteResponse(
                noteId: cached.noteId,
                isProtected: cached.isProtected,
                title: cached.title,
                type: cached.noteType,
                mime: cached.mime,
                blobId: nil,
                isDeleted: false,
                dateCreated: "",
                dateModified: "",
                utcDateCreated: "",
                utcDateModified: cached.utcDateModified ?? "",
                parentNoteIds: cached.parentNoteIds,
                childNoteIds: cached.childNoteIds,
                parentBranchIds: cached.parentBranchIds,
                childBranchIds: cached.childBranchIds,
                attributes: []
            )
            return NoteItem(from: fake)
        }
        guard isOnline, let client else { return nil }
        do {
            let response = try await client.getNote(noteId)
            try? persistence.cacheNoteIfAllowed(
                from: response,
                serverProfileId: profileId,
                policy: CacheExclusionPolicy()
            )
            return NoteItem(from: response)
        } catch {
            return nil
        }
    }

    private static func cachedTitle(noteId: String, persistence: PersistenceManager, profileId: String) -> String? {
        guard let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId) else { return nil }
        let t = cached.title.trimmingCharacters(in: .whitespacesAndNewlines)
        return t.isEmpty ? nil : t
    }

    private static func extractAttribute(from tag: String, name: String) -> String? {
        let escaped = NSRegularExpression.escapedPattern(for: name)
        let pattern = try! NSRegularExpression(
            pattern: "\(escaped)\\s*=\\s*[\"']([^\"']*)[\"']",
            options: [.caseInsensitive]
        )
        let ns = tag as NSString
        guard let m = pattern.firstMatch(in: tag, range: NSRange(location: 0, length: ns.length)),
              m.numberOfRanges >= 2 else { return nil }
        return ns.substring(with: m.range(at: 1))
    }

    private func mimeToLanguageClass(_ mime: String) -> String {
        let m = mime.lowercased()
        if m.contains("swift") { return "language-swift" }
        if m.contains("javascript") || m == "text/js" { return "language-javascript" }
        if m.contains("json") { return "language-json" }
        if m.contains("python") { return "language-python" }
        if m.contains("html") { return "language-html" }
        if m.contains("css") { return "language-css" }
        if m.contains("sql") { return "language-sql" }
        return "language-plaintext"
    }

    nonisolated static func escapeHTML(_ s: String) -> String {
        s.replacingOccurrences(of: "&", with: "&amp;")
            .replacingOccurrences(of: "<", with: "&lt;")
            .replacingOccurrences(of: ">", with: "&gt;")
            .replacingOccurrences(of: "\"", with: "&quot;")
    }

    static func wrapCard(noteId: String, boxSize: String, noteType: String, title: String, bodyHTML: String) -> String {
        let escTitle = escapeHTML(title)
        let openLabel = escapeHTML(String(localized: "Open", comment: "Include note open button"))
        return """
        <section class="trinote-include" data-note-id="\(noteId)" data-box-size="\(boxSize)" data-note-type="\(escapeHTML(noteType))">
          <header class="trinote-include__header">
            <span class="trinote-include__title">\(escTitle)</span>
            <button type="button" class="trinote-include__open">\(openLabel)</button>
          </header>
          <div class="trinote-include__body" data-box-size="\(boxSize)">
            \(bodyHTML)
          </div>
        </section>
        """
    }

    private static func wrapErrorCard(noteId: String, boxSize: String, title: String, bodyHTML: String) -> String {
        let t = title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            ? String(localized: "Include", comment: "Include note default title")
            : title
        return wrapCard(noteId: noteId, boxSize: boxSize, noteType: "text", title: t, bodyHTML: bodyHTML)
    }
}
