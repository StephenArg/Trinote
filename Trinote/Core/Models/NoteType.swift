import Foundation

enum NoteType: String, Codable, CaseIterable, Sendable {
    case text
    case code
    case file
    case image
    case search
    case book
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

    var displayName: String {
        switch self {
        case .text: return "Text"
        case .code: return "Code"
        case .file: return "File"
        case .image: return "Image"
        case .search: return "Search"
        case .book: return "Book"
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
        }
    }

    var isEditable: Bool {
        switch self {
        case .text, .code, .mermaid: return true
        default: return false
        }
    }

    var isRenderable: Bool {
        switch self {
        case .text, .code, .image, .file, .book, .render, .mermaid: return true
        default: return false
        }
    }

    var isAdvanced: Bool {
        switch self {
        case .canvas, .noteMap, .relationMap, .webView, .contentWidget, .launcher, .mindMap, .geoMap:
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
}
