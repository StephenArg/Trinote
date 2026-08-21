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

    private static func findNextIncludeBlock(in html: String) -> IncludeBlock? {
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

    private static func closingSectionRange(html: String, scanFrom: String.Index) -> Range<String.Index>? {
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

        if item.isProtected, !protectedSessionActive {
            let locked = Self.escapeHTML(String(localized: "Protected — open to view.", comment: "Include note protected locked"))
            return Self.wrapCard(noteId: nid, boxSize: boxSize, noteType: typeStr, title: title, bodyHTML: locked)
        }

        let bodyHTML: String
        switch item.type {
        case .text:
            if let innerHTML = await loadRawBodyString(noteId: nid) {
                var expanded = innerHTML
                if expanded.range(of: #"(?i)api/(attachments|images)/"#, options: .regularExpression) != nil
                    || expanded.range(of: #"(?i)<img\b"#, options: .regularExpression) != nil {
                    expanded = await inlineAttachmentImages(expanded)
                }
                let childSeen = seenNoteIds.union([nid])
                let nextLevel = nestingLevel + 1
                if nextLevel <= maxNesting {
                    expanded = await Self(
                        client: client,
                        persistence: persistence,
                        profileId: profileId,
                        protectedSessionActive: protectedSessionActive,
                        isOnline: isOnline,
                        inlineAttachmentImages: inlineAttachmentImages
                    ).resolve(html: expanded, seenNoteIds: childSeen, nestingLevel: nextLevel, maxNesting: maxNesting)
                } else {
                    expanded = Self.replaceIncludeSectionsWithLinks(html: expanded)
                }
                bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--text\">\(expanded)</div>"
            } else {
                bodyHTML = Self.escapeHTML(String(localized: "Could not load note content.", comment: "Include note empty body"))
            }
        case .image:
            if let imgTag = await imagePreviewTag(noteId: nid) {
                bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--image\">\(imgTag)</div>"
            } else {
                bodyHTML = Self.escapeHTML(String(localized: "Could not load image.", comment: "Include image failed"))
            }
        case .code, .markdown:
            if let src = await loadRawBodyString(noteId: nid) {
                let langClass = mimeToLanguageClass(item.mime)
                bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--code\"><pre><code class=\"\(langClass)\">\(Self.escapeHTML(src))</code></pre></div>"
            } else {
                bodyHTML = Self.escapeHTML(String(localized: "Could not load code.", comment: "Include code failed"))
            }
        case .mermaid:
            if let src = await loadRawBodyString(noteId: nid) {
                let diagram = Self.normalizedMermaidSource(src)
                if let svg = await MermaidRenderer.shared.render(source: diagram) {
                    bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--mermaid\">\(svg)</div>"
                } else {
                    Log.ui.error("[MMD] IncludeNoteResolver.mermaid noteId=\(nid, privacy: .public) render returned nil — FALLBACK to inline .mermaid block (HTMLNoteView snippet will render it)")
                    let esc = Self.escapeHTML(diagram)
                    bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--mermaid\"><div class=\"mermaid\">\(esc)</div></div>"
                }
            } else {
                Log.ui.error("[MMD] IncludeNoteResolver.mermaid noteId=\(nid, privacy: .public) loadRawBodyString nil")
                bodyHTML = Self.escapeHTML(String(localized: "Could not load diagram.", comment: "Include mermaid failed"))
            }
        case .book, .collection, .noteMap:
            bodyHTML = await childListHTML(parent: item)
        case .file:
            bodyHTML = fileCardHTML(note: item)
        case .canvas:
            if let imgTag = await canvasExportSVGPreviewTag(noteId: nid) {
                bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--image\">\(imgTag)</div>"
            } else {
                Log.ui.warning("[INCLUDE] resolver.canvas NO SVG noteId=\(nid, privacy: .public) online=\(self.isOnline)")
                bodyHTML = Self.fallbackPreviewHTML(type: item.type)
            }
        case .mindMap:
            let raw = await loadRawBodyString(noteId: nid)
            if let src = raw, let tree = Self.mindMapTreePreview(json: src) {
                bodyHTML = "<div class=\"trinote-include__inner trinote-include__inner--mindmap\">\(tree)</div>"
            } else {
                bodyHTML = Self.fallbackPreviewHTML(type: item.type)
            }
        case .geoMap, .relationMap, .webView, .render, .shortcut, .launcher, .doc, .contentWidget, .search, .calendar, .spreadsheet, .kanban, .presentation:
            bodyHTML = Self.fallbackPreviewHTML(type: item.type)
        }
        return Self.wrapCard(noteId: nid, boxSize: boxSize, noteType: typeStr, title: title, bodyHTML: bodyHTML)
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

    private func childListHTML(parent: NoteItem) async -> String {
        var rows = ""
        for cid in parent.childNoteIds.prefix(15) {
            let childTitle = Self.cachedTitle(noteId: cid, persistence: persistence, profileId: profileId) ?? cid
            let esc = Self.escapeHTML(childTitle)
            rows += "<li><a href=\"#/\(cid)\">\(esc)</a></li>"
        }
        if parent.childNoteIds.count > 15 {
            rows += "<li>…</li>"
        }
        return "<div class=\"trinote-include__inner trinote-include__inner--children\"><ul class=\"trinote-include__children\">\(rows)</ul></div>"
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

    private func loadRawBodyString(noteId: String) async -> String? {
        guard let d = await loadRawBody(noteId: noteId) else { return nil }
        return String(data: d, encoding: .utf8)
    }

    private func loadRawBody(noteId: String) async -> Data? {
        if let cached = try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId),
           let c = cached.content, !c.isEmpty {
            return c
        }
        guard isOnline, let client else { return nil }
        let policy = CacheExclusionPolicy()
        let parentNoteIds = (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.parentNoteIds ?? []
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
            return data
        } catch {
            Log.api.debug("IncludeNoteResolver: getNoteContent failed for \(noteId): \(error)")
            return nil
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

    private static func escapeHTML(_ s: String) -> String {
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
