import Foundation

/// Changing an existing note's type, as Trilium desktop's Note type menu does (`apps/client/src/services/note_types.ts`,
/// `widgets/ribbon/BasicPropertiesTab.tsx`). The server only swaps `type` and `mime`
/// (`PUT /api/notes/:id/type`); the content stays as it was, which is why some changes ask first.
enum NoteTypeChange {

    /// What a menu choice stores on the server.
    struct Target: Hashable, Sendable {
        let serverType: String
        let mime: String
    }

    /// The menu, in desktop's order. AI Chat is offered only while Trilium's AI features are on, as on desktop.
    enum Entry: String, CaseIterable, Identifiable, Sendable {
        case text, spreadsheet, collection, canvas, mermaid, mindMap, relationMap, llmChat, render, webView, code, markdown

        var id: String { rawValue }

        var serverType: String {
            switch self {
            case .collection: return "book"
            case .markdown: return "code"
            default: return rawValue
            }
        }

        /// Desktop's mime for each type. Code takes its mime from the language picked.
        var mime: String {
            switch self {
            case .text: return "text/html"
            case .spreadsheet, .canvas, .mindMap, .relationMap, .llmChat: return "application/json"
            case .mermaid: return "text/mermaid"
            case .collection, .render, .webView: return ""
            case .code: return "text/plain"
            case .markdown: return "text/x-markdown"
            }
        }

        var target: Target { Target(serverType: serverType, mime: mime) }

        var title: String {
            switch self {
            case .text: return String(localized: "Text", comment: "Note type")
            case .spreadsheet: return String(localized: "Spreadsheet", comment: "Note type")
            case .collection: return String(localized: "Collection", comment: "Note type: Trilium collection container")
            case .canvas: return String(localized: "Canvas", comment: "Note type")
            case .mermaid: return String(localized: "Mermaid", comment: "Note type")
            case .mindMap: return String(localized: "Mind Map", comment: "Note type")
            case .relationMap: return String(localized: "Relation Map", comment: "Note type")
            case .llmChat: return String(localized: "AI Chat", comment: "Note type")
            case .render: return String(localized: "Render Note", comment: "Note type")
            case .webView: return String(localized: "Web View", comment: "Note type")
            case .code: return String(localized: "Code", comment: "Note type")
            case .markdown: return String(localized: "Markdown", comment: "Note type: code note with Markdown MIME")
            }
        }

        /// Desktop's icon for the entry.
        var iconClass: String {
            switch self {
            case .text: return "bx bx-note"
            case .spreadsheet: return "bx bx-table"
            case .collection: return "bx bx-book"
            case .canvas: return "bx bx-pen"
            case .mermaid: return "bx bx-selection"
            case .mindMap: return "bx bx-sitemap"
            case .relationMap: return "bx bx-shape-polygon"
            case .llmChat: return "bx bx-message-square-dots"
            case .render: return "bx bx-extension"
            case .webView: return "bx bx-globe-alt"
            case .code: return "bx bx-code"
            case .markdown: return "bx bxl-markdown"
            }
        }

        /// The app's own note type, for the icon fallback.
        var noteType: NoteType {
            switch self {
            case .text: return .text
            case .spreadsheet: return .spreadsheet
            case .collection: return .collection
            case .canvas: return .canvas
            case .mermaid: return .mermaid
            case .mindMap: return .mindMap
            case .relationMap: return .relationMap
            case .llmChat: return .llmChat
            case .render: return .render
            case .webView: return .webView
            case .code: return .code
            case .markdown: return .markdown
            }
        }

        /// Desktop marks spreadsheets as a beta feature.
        var isBeta: Bool { self == .spreadsheet }

        /// Types Trilium shows but this app doesn't (they open with "Open in Web Browser").
        var isShownInApp: Bool {
            switch self {
            case .relationMap, .render, .webView: return false
            default: return true
            }
        }
    }

    /// The entries this server can make. AI Chat needs Trilium v0.105+ and the AI features switched on (`aiEnabled`).
    static func entries(serverInfo: AppInfoResponse?, aiEnabled: Bool = false) -> [Entry] {
        Entry.allCases.filter { entry in
            switch entry {
            case .spreadsheet: return TriliumServerCompatibility.supportsSpreadsheetNotes(serverInfo)
            case .llmChat: return aiEnabled && TriliumServerCompatibility.supportsLlmChat(serverInfo)
            default: return true
            }
        }
    }

    /// The entry a note's current type corresponds to, if any.
    static func currentEntry(serverType: String, mime: String) -> Entry? {
        switch serverType {
        case "code": return CodeNoteLanguage.isMarkdownMime(mime) ? .markdown : .code
        case "book": return .collection
        default: return Entry(rawValue: serverType).flatMap { $0 == .collection || $0 == .markdown ? nil : $0 }
        }
    }

    /// Desktop disables its type menu for these: reserved types (made by Trilium itself) and static ones
    /// (whose content is their definition). `shortcut` is a launcher kind this app knows by name.
    static func canChange(serverType: String) -> Bool {
        !["file", "image", "launcher", "doc", "contentWidget", "search", "noteMap", "shortcut"].contains(serverType)
    }

    // MARK: Collection views

    /// A collection's view (`#viewType`), from desktop's view switcher. Grid is what a collection shows without one.
    enum CollectionView: String, CaseIterable, Identifiable, Sendable {
        case grid, list, calendar, table, geoMap, board, presentation, dashboard

        var id: String { rawValue }

        var title: String {
            switch self {
            case .grid: return String(localized: "Grid", comment: "Collection view type")
            case .list: return String(localized: "List", comment: "Collection view type")
            case .calendar: return String(localized: "Calendar", comment: "Collection view type")
            case .table: return String(localized: "Table", comment: "Collection view type")
            case .geoMap: return String(localized: "Geo Map", comment: "Note type")
            case .board: return String(localized: "Board", comment: "Collection view type")
            case .presentation: return String(localized: "Presentation", comment: "Note type")
            case .dashboard: return String(localized: "Dashboard", comment: "Collection view type")
            }
        }

        var iconClass: String {
            switch self {
            case .grid: return "bx bxs-grid"
            case .list: return "bx bx-list-ul"
            case .calendar: return "bx bx-calendar"
            case .table: return "bx bx-table"
            case .geoMap: return "bx bx-map-alt"
            case .board: return "bx bx-columns"
            case .presentation: return "bx bx-rectangle"
            case .dashboard: return "bx bxs-dashboard"
            }
        }

        var noteType: NoteType {
            switch self {
            case .geoMap: return .geoMap
            case .board: return .kanban
            case .presentation: return .presentation
            case .calendar: return .calendar
            default: return .collection
            }
        }

        /// The views this app draws itself; the rest show as a plain collection here.
        var isShownInApp: Bool {
            switch self {
            case .grid, .list, .table, .dashboard, .geoMap, .board, .presentation: return true
            case .calendar: return false
            }
        }
    }

    /// The views the Note Type sheet's Collection page offers. Calendar is left out: a collection switched to it
    /// isn't drawn here (journal calendars have their own view).
    static func collectionViews(serverInfo: AppInfoResponse?) -> [CollectionView] {
        CollectionView.allCases.filter { view in
            switch view {
            case .calendar: return false
            case .board: return TriliumServerCompatibility.supportsKanbanNotes(serverInfo)
            case .presentation: return TriliumServerCompatibility.supportsPresentationNotes(serverInfo)
            case .dashboard: return TriliumServerCompatibility.supportsDashboardView(serverInfo)
            default: return true
            }
        }
    }

    /// The views the collection bar's switcher swaps between: the ones drawn as documents here. Maps, boards and
    /// presentations are reached from the Note Type sheet instead.
    static func switcherCollectionViews(serverInfo: AppInfoResponse?) -> [CollectionView] {
        NewNoteKind.collectionViews(supportsDashboard: TriliumServerCompatibility.supportsDashboardView(serverInfo))
    }

    /// The view a collection shows: its `#viewType`, or Grid without one.
    static func currentView(viewTypeLabel: String?) -> CollectionView {
        viewTypeLabel.flatMap(CollectionView.init(rawValue:)) ?? .grid
    }

    /// The view `note` shows, from the `#viewType` Trilium would read for it (own, inherited or its built-in
    /// template's). An unknown value, such as a search note's `searchPreview`, shows as Grid like on desktop.
    static func currentView(for note: NoteItem) -> CollectionView {
        currentView(viewTypeLabel: note.resolvedViewTypeLabelValue)
    }

    // MARK: Asking first

    /// Desktop asks when the type (not just the mime) changes and the note has content. A publicly shared note
    /// always asks, because visitors will see the change. `content` is `nil` when it couldn't be read, which asks too.
    static func requiresConfirmation(fromServerType: String, to target: Target, content: String?, isShared: Bool) -> Bool {
        guard fromServerType != target.serverType else { return false }
        guard let content else { return true }
        return isShared || !content.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    /// What happens to the content when the note becomes `target`.
    enum ContentOutcome: Equatable, Sendable {
        /// The new type shows the same content.
        case kept
        /// Formatted text shows as its HTML.
        case shownAsSource
        /// Plain text or data is read as formatted text; saving it there can lose line breaks and spacing.
        case reformatted
        /// The new type doesn't show content; it stays in the note.
        case hidden
        /// The new type can't read the content and starts empty; the first save replaces it.
        case replacedOnEdit
    }

    static func contentOutcome(fromServerType: String, content: String, to target: Target) -> ContentOutcome {
        let fromFormattedText = ["text", "book", "render", "webView"].contains(fromServerType)
        switch target.serverType {
        case "text":
            return fromFormattedText ? .kept : .reformatted
        case "code", "mermaid":
            return fromFormattedText ? .shownAsSource : .kept
        case "canvas":
            return NoteEditorSaving.isUsableCanvasJSON(content) ? .kept : .replacedOnEdit
        case "mindMap":
            return NoteEditorSaving.isUsableMindMapJSON(content) ? .kept : .replacedOnEdit
        case "spreadsheet":
            return isSpreadsheetJSON(content) ? .kept : .replacedOnEdit
        case "relationMap":
            return isRelationMapJSON(content) ? .kept : .replacedOnEdit
        case "llmChat":
            return LlmChatContent.isUsableChatJSON(content) ? .kept : .replacedOnEdit
        default:
            return .hidden
        }
    }

    /// The question to ask before changing, or `nil` when desktop wouldn't ask.
    static func confirmation(
        fromServerType: String,
        to target: Target,
        targetTitle: String,
        content: String?,
        isShared: Bool
    ) -> Confirmation? {
        guard requiresConfirmation(fromServerType: fromServerType, to: target, content: content, isShared: isShared) else {
            return nil
        }
        var sentences: [String] = []
        var outcome: ContentOutcome?
        if let content {
            if !content.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                let result = contentOutcome(fromServerType: fromServerType, content: content, to: target)
                outcome = result
                sentences.append(message(for: result, targetTitle: targetTitle))
            }
        } else {
            // Without the content there's no telling what happens to it, so warn as for the worst case.
            outcome = .replacedOnEdit
            sentences.append(String(
                format: String(
                    localized: "Trinote couldn't read the note's content to check it. If a %@ note can't show it, it will be replaced the next time you save the note.",
                    comment: "Change note type: the body couldn't be loaded; %@ is the new type"
                ),
                targetTitle
            ))
        }
        if isShared {
            sentences.append(String(
                format: String(
                    localized: "This note is shared publicly, so visitors will see it as a %@ note.",
                    comment: "Change note type: the note is published under Trilium's share root"
                ),
                targetTitle
            ))
        }
        return Confirmation(
            title: String(format: String(localized: "Change to %@?", comment: "Change note type confirmation title"), targetTitle),
            message: sentences.joined(separator: " "),
            replacesContent: outcome == .replacedOnEdit
        )
    }

    struct Confirmation: Equatable, Sendable {
        let title: String
        let message: String
        /// The content will be replaced the next time the note is saved: the button is destructive.
        let replacesContent: Bool
    }

    private static func message(for outcome: ContentOutcome, targetTitle: String) -> String {
        switch outcome {
        case .kept:
            return String(localized: "The note's content stays as it is.", comment: "Change note type: content outcome")
        case .shownAsSource:
            return String(localized: "The note's formatted text will show as HTML source.", comment: "Change note type: content outcome")
        case .reformatted:
            return String(
                localized: "The note's content will be read as formatted text, so line breaks and spacing may be lost the next time you save it.",
                comment: "Change note type: content outcome"
            )
        case .hidden:
            return String(
                format: String(
                    localized: "A %@ note doesn't show the content. It stays in the note and comes back if you change the type back.",
                    comment: "Change note type: content outcome; %@ is the new type"
                ),
                targetTitle
            )
        case .replacedOnEdit:
            return String(
                format: String(
                    localized: "A %@ note can't show the note's current content. It will be replaced the next time you save the note.",
                    comment: "Change note type: content outcome; %@ is the new type"
                ),
                targetTitle
            )
        }
    }

    /// Desktop's relation map body: `{ notes: [...], links: [...] }`.
    private static func isRelationMapJSON(_ content: String) -> Bool {
        jsonObject(content)?["notes"] is [Any]
    }

    /// A Univer workbook, in Trilium's `{ version, workbook }` envelope or bare, as the spreadsheet editor reads it.
    private static func isSpreadsheetJSON(_ content: String) -> Bool {
        guard let object = jsonObject(content) else { return false }
        if let workbook = object["workbook"] as? [String: Any] { return !workbook.isEmpty }
        return object["sheets"] is [String: Any]
    }

    private static func jsonObject(_ content: String) -> [String: Any]? {
        guard let data = content.data(using: .utf8) else { return nil }
        return (try? JSONSerialization.jsonObject(with: data)) as? [String: Any]
    }
}
