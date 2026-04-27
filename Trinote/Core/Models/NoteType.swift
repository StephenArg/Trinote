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
    /// Client-only: creates a Trilium `book` with `#calendarRoot` (journal / calendar widget root).
    case calendar

    var displayName: String {
        switch self {
        case .text: return "Text"
        case .code: return "Code"
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
        case .calendar: return "Calendar"
        }
    }

    var iconName: String {
        switch self {
        case .text: return "note.text"
        case .code: return "chevron.left.forwardslash.chevron.right"
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
        case .calendar: return "calendar"
        }
    }

    var isEditable: Bool {
        switch self {
        case .text, .code, .mermaid, .canvas, .mindMap: return true
        default: return false
        }
    }

    var isRenderable: Bool {
        switch self {
        case .text, .code, .image, .file, .book, .collection, .render, .mermaid, .mindMap, .geoMap, .calendar: return true
        default: return false
        }
    }

    var isAdvanced: Bool {
        switch self {
        case .canvas, .collection, .noteMap, .relationMap, .webView, .contentWidget, .launcher, .mindMap, .geoMap, .calendar:
            return true
        default:
            return false
        }
    }

    /// Note types that support the in-page find bar while viewing (not editing).
    var supportsReadOnlyOnPageFind: Bool {
        switch self {
        case .text, .code: return true
        default: return false
        }
    }

    // MARK: - New note creation (offline + Trilium API)

    /// Minimal valid Excalidraw document for an empty canvas note (Trilium desktop compatible).
    static let emptyCanvasNoteJSON = "{\"type\":\"excalidraw\",\"version\":2,\"elements\":[],\"files\":{},\"appState\":{}}"

    /// Minimal MindElixir JSON for an empty mind map note.
    static let emptyMindMapJSON = "{\"nodeData\":{\"id\":\"root\",\"topic\":\"New Mind Map\",\"root\":true,\"children\":[]}}"

    /// MIME type used when creating a new note of this type.
    var creationMime: String {
        switch self {
        case .code: return "text/plain"
        case .file: return "application/octet-stream"
        case .canvas, .mindMap: return "application/json"
        case .geoMap: return ""
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
        default: return ""
        }
    }

    /// Trilium/API `type` field and SwiftData `noteType`.
    /// Calendar roots and geo maps are stored as `book` (matching Trilium desktop convention).
    var triliumStorageType: String {
        switch self {
        case .calendar, .geoMap: return NoteType.book.rawValue
        default: return rawValue
        }
    }

    /// Attributes to create on the server after note creation (offline queue).
    /// Calendar roots match Trilium desktop journal: `#calendarRoot`, `#sorted`, `#iconClass`, `~template`, view labels.
    /// Geo maps match Trilium’s Geo Map template: collection, viewType, promoted geolocation schema, icon, subtree visibility, template relation.
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
                NoteCreationAttribute(type: "label", name: "iconClass", value: "bx bx bx-map-alt"),
                NoteCreationAttribute(type: "label", name: "subtreeHidden", value: "false"),
                // Built-in _templates title is "Geo Map" (space); value must match for search resolution before createAttribute.
                NoteCreationAttribute(type: "relation", name: "template", value: "Geo Map"),
                NoteCreationAttribute(type: "label", name: "label:geolocation", value: geolocationSchema, isInheritable: true),
                NoteCreationAttribute(type: "label", name: "hidePromotedAttributes", value: ""),
            ]
        default:
            return []
        }
    }
}
