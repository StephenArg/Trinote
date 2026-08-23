import Foundation

/// Attributes queued with offline-created notes and applied via `createAttribute` after `createNote`.
struct NoteCreationAttribute: Equatable, Sendable, Hashable {
    var type: String
    var name: String
    var value: String
    var isInheritable: Bool

    init(type: String, name: String, value: String, isInheritable: Bool = false) {
        self.type = type
        self.name = name
        self.value = value
        self.isInheritable = isInheritable
    }
}

enum NoteType: String, Codable, CaseIterable, Sendable {
    case text
    case code
    /// Client-only create option: a `code` note with Markdown MIME (`text/x-markdown`).
    case markdown
    case file
    case image
    case search
    case book
    /// Trilium Next / ETAPI `type: "collection"` — container for Note List views (table, kanban, grid, etc.).
    case collection
    case noteMap = "noteMap"
    case relationMap = "relationMap"
    case render
    case canvas
    case webView = "webView"
    case shortcut
    case doc
    case contentWidget = "contentWidget"
    case launcher
    case mermaid
    case geoMap = "geoMap"
    case mindMap = "mindMap"
    /// Trilium v0.103+ Univer Sheets-backed spreadsheet note. Content is Univer workbook JSON (`application/json`).
    /// Trinote renders this read-only; editing requires the Univer bundle which is not shipped on iOS.
    case spreadsheet
    /// Client-only: creates a Trilium `book` with `#calendarRoot` (journal / calendar widget root).
    case calendar
    /// Client-only: creates a Trilium `book` Collection with `#viewType=board` (Kanban).
    case kanban
    /// Client-only: creates a Trilium `book` Collection with `#viewType=presentation`.
    case presentation

    var displayName: String {
        switch self {
        case .text: return "Text"
        case .code: return "Code"
        case .markdown: return "Markdown"
        case .file: return "File"
        case .image: return "Image"
        case .search: return "Search"
        case .book: return "Book"
        case .collection: return "Collection"
        case .noteMap: return "Note Map"
        case .relationMap: return "Relation Map"
        case .render: return "Render"
        case .canvas: return "Canvas"
        case .webView: return "Web View"
        case .shortcut: return "Shortcut"
        case .doc: return "Doc"
        case .contentWidget: return "Content Widget"
        case .launcher: return "Launcher"
        case .mermaid: return "Mermaid"
        case .geoMap: return "Geo Map"
        case .mindMap: return "Mind Map"
        case .spreadsheet: return "Spreadsheet"
        case .calendar: return "Calendar"
        case .kanban: return "Kanban Board"
        case .presentation: return "Presentation"
        }
    }

    var iconName: String {
        switch self {
        case .text: return "note.text"
        case .code: return "chevron.left.forwardslash.chevron.right"
        case .markdown: return "doc.richtext"
        case .file: return "doc"
        case .image: return "photo"
        case .search: return "magnifyingglass"
        case .book: return "book"
        case .collection: return "square.grid.2x2"
        case .noteMap, .relationMap, .mindMap: return "map"
        case .render: return "globe"
        case .canvas: return "paintpalette"
        case .webView: return "safari"
        case .shortcut: return "link"
        case .doc: return "doc.text"
        case .contentWidget: return "square.grid.2x2"
        case .launcher: return "arrow.up.forward.app"
        case .mermaid: return "chart.bar"
        case .geoMap: return "map"
        case .spreadsheet: return "tablecells"
        case .calendar: return "calendar"
        case .kanban: return "rectangle.split.3x1"
        case .presentation: return "rectangle.on.rectangle"
        }
    }

    var isEditable: Bool {
        switch self {
        case .text, .code, .markdown, .mermaid, .canvas, .mindMap, .spreadsheet: return true
        default: return false
        }
    }

    var isRenderable: Bool {
        switch self {
        case .text, .code, .markdown, .image, .file, .book, .collection, .render, .mermaid, .mindMap, .geoMap, .spreadsheet, .calendar, .kanban, .presentation:
            return true
        default: return false
        }
    }

    var isAdvanced: Bool {
        switch self {
        case .canvas, .collection, .noteMap, .relationMap, .webView, .contentWidget, .launcher, .mindMap, .geoMap, .spreadsheet, .calendar, .kanban, .presentation:
            return true
        default:
            return false
        }
    }

    /// Note types that support the in-page find bar while viewing (not editing).
    var supportsReadOnlyOnPageFind: Bool {
        switch self {
        case .text, .code, .markdown: return true
        default: return false
        }
    }

    // MARK: - New note creation (offline + Trilium API)

    /// Minimal valid Excalidraw document for an empty canvas note (Trilium desktop compatible).
    static let emptyCanvasNoteJSON = "{\"type\":\"excalidraw\",\"version\":2,\"elements\":[],\"files\":{},\"appState\":{}}"

    /// Minimal MindElixir JSON for an empty mind map note.
    static let emptyMindMapJSON = "{\"nodeData\":{\"id\":\"root\",\"topic\":\"New Mind Map\",\"root\":true,\"children\":[]}}"

    /// Minimal Univer Sheets workbook JSON for an empty spreadsheet note.
    /// Wrapped in Trilium's `{ version, workbook }` envelope (matches
    /// `apps/client/src/widgets/type_widgets/spreadsheet/persistence.tsx` in TriliumNext v0.103+).
    /// The inner `workbook` is a minimal Univer `IWorkbookData`; Univer fills in defaults for everything omitted.
    static let emptySpreadsheetJSON = "{\"version\":1,\"workbook\":{\"id\":\"trinote-sheet\",\"sheetOrder\":[\"sheet-1\"],\"sheets\":{\"sheet-1\":{\"id\":\"sheet-1\",\"name\":\"Sheet1\",\"cellData\":{},\"rowCount\":100,\"columnCount\":26}}}}"

    /// MIME type used when creating a new note of this type.
    var creationMime: String {
        switch self {
        case .code: return "text/plain"
        case .markdown: return "text/x-markdown"
        case .file: return "application/octet-stream"
        case .canvas, .mindMap, .spreadsheet: return "application/json"
        case .geoMap, .kanban, .presentation: return ""
        default: return "text/html"
        }
    }

    /// Minimal Leaflet/Trilium viewport JSON for an empty geo map note (matches desktop `GeoMapTypeWidget` serialization).
    static let emptyGeoMapJSON = "{\"view\":{\"center\":{\"lat\":0,\"lng\":0},\"zoom\":2}}"

    /// Initial body string for `createNote` / offline creation queue.
    var creationInitialContent: String {
        switch self {
        case .canvas: return Self.emptyCanvasNoteJSON
        case .mindMap: return Self.emptyMindMapJSON
        case .geoMap: return Self.emptyGeoMapJSON
        case .spreadsheet: return Self.emptySpreadsheetJSON
        default: return ""
        }
    }

    /// Trilium/API `type` field and SwiftData `noteType`.
    /// Calendar roots, geo maps, kanban boards, and presentations are stored as `book`
    /// (matching Trilium desktop Collection convention).
    /// Markdown is stored as `code` with a Markdown MIME (Trilium v0.103+).
    var triliumStorageType: String {
        switch self {
        case .calendar, .geoMap, .kanban, .presentation: return NoteType.book.rawValue
        case .markdown: return NoteType.code.rawValue
        default: return rawValue
        }
    }

    /// Attributes to create on the server after note creation (offline queue).
    /// Calendar roots match Trilium desktop journal: `#calendarRoot`, `#sorted`, `#iconClass`, `~template`, view labels.
    /// Geo maps match Trilium’s Geo Map template: collection, viewType, promoted geolocation schema, icon, subtree visibility, template relation.
    /// Kanban / Presentation prefer `~template` so the server clones starter children; labels are fallbacks when the template is missing.
    var creationInitialAttributes: [NoteCreationAttribute] {
        switch self {
        case .calendar:
            return [
                NoteCreationAttribute(type: "label", name: "calendarRoot", value: ""),
                NoteCreationAttribute(type: "label", name: "sorted", value: ""),
                NoteCreationAttribute(type: "label", name: "iconClass", value: "bx bx-calendar"),
                NoteCreationAttribute(type: "relation", name: "template", value: "Calendar"),
                NoteCreationAttribute(type: "label", name: "calendar:view", value: "dayGridMonth"),
                NoteCreationAttribute(type: "label", name: "viewType", value: "calendar"),
            ]
        case .geoMap:
            let geolocationSchema = "promoted,alias=Geolocation,single,text"
            return [
                NoteCreationAttribute(type: "label", name: "collection", value: ""),
                NoteCreationAttribute(type: "label", name: "viewType", value: "geoMap"),
                NoteCreationAttribute(type: "label", name: "hidePromotedAttributes", value: ""),
                NoteCreationAttribute(type: "label", name: "label:geolocation", value: geolocationSchema),
                NoteCreationAttribute(type: "label", name: "iconClass", value: "bx bx-map-alt"),
                NoteCreationAttribute(type: "label", name: "subtreeHidden", value: "false"),
                // Built-in _templates title is "Geo Map" (space); value must match for search resolution before createAttribute.
                NoteCreationAttribute(type: "relation", name: "template", value: "Geo Map"),
                NoteCreationAttribute(type: "label", name: "label:geolocation", value: geolocationSchema, isInheritable: true),
                NoteCreationAttribute(type: "label", name: "hidePromotedAttributes", value: ""),
            ]
        case .kanban:
            return [
                // Prefer the stable built-in note id so resolve/create does not depend on localized titles.
                NoteCreationAttribute(type: "relation", name: "template", value: "_template_board"),
                NoteCreationAttribute(type: "label", name: "collection", value: ""),
                NoteCreationAttribute(type: "label", name: "viewType", value: "board"),
                NoteCreationAttribute(type: "label", name: "hidePromotedAttributes", value: ""),
                NoteCreationAttribute(type: "label", name: "iconClass", value: "bx bx-columns"),
            ]
        case .presentation:
            return [
                NoteCreationAttribute(type: "relation", name: "template", value: "_template_presentation"),
                NoteCreationAttribute(type: "label", name: "collection", value: ""),
                NoteCreationAttribute(type: "label", name: "viewType", value: "presentation"),
                NoteCreationAttribute(type: "label", name: "iconClass", value: "bx bx-slideshow"),
            ]
        default:
            return []
        }
    }
}
