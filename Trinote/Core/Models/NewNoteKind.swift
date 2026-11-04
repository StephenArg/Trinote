import Foundation

/// What a new note is made as: a note type, or a Trilium collection in one of its views. A collection is a `book`
/// made from the built-in template that carries the view (`_template_grid_view`, …), as desktop's Collections
/// submenu makes it; the template's `#viewType` then reaches the note by inheritance.
enum NewNoteKind: Hashable, Sendable {
    case type(NoteType)
    case collection(NoteTypeChange.CollectionView)

    static let text = NewNoteKind.type(.text)

    /// The collection views the new-note menu offers, in desktop's order; Dashboard needs Trilium 0.106.
    static func collectionViews(supportsDashboard: Bool) -> [NoteTypeChange.CollectionView] {
        var views: [NoteTypeChange.CollectionView] = [.grid, .list, .table]
        if supportsDashboard {
            views.append(.dashboard)
        }
        return views
    }

    /// The built-in template note (`hidden_subtree_templates.ts`) a collection view is made from.
    static func builtInTemplateNoteId(for view: NoteTypeChange.CollectionView) -> String {
        switch view {
        case .grid: return "_template_grid_view"
        case .list: return "_template_list_view"
        case .table: return "_template_table"
        case .dashboard: return "_template_dashboard"
        case .calendar: return "_template_calendar"
        case .geoMap: return "_template_geo_map"
        case .board: return "_template_board"
        case .presentation: return "_template_presentation"
        }
    }

    var creationMime: String {
        switch self {
        case .type(let type): return type.creationMime
        case .collection: return ""
        }
    }

    var creationInitialContent: String {
        switch self {
        case .type(let type): return type.creationInitialContent
        case .collection: return ""
        }
    }

    var triliumStorageType: String {
        switch self {
        case .type(let type): return type.triliumStorageType
        case .collection: return NoteType.book.rawValue
        }
    }

    /// For a collection: the template first, so the server makes the note from it (the queue sends it as
    /// `templateNoteId`); the labels are what the note shows while it waits offline, and what it gets when the
    /// template can't be found, as for boards.
    var creationInitialAttributes: [NoteCreationAttribute] {
        switch self {
        case .type(let type):
            return type.creationInitialAttributes
        case .collection(let view):
            return [
                NoteCreationAttribute(type: "relation", name: "template", value: Self.builtInTemplateNoteId(for: view)),
                NoteCreationAttribute(type: "label", name: "collection", value: ""),
                NoteCreationAttribute(type: "label", name: "viewType", value: view.rawValue),
                NoteCreationAttribute(type: "label", name: "iconClass", value: view.iconClass),
            ]
        }
    }

    /// What the type row shows: the type's name, or the collection with its view ("Collection · Grid").
    var title: String {
        switch self {
        case .type(let type):
            return Self.title(of: type)
        case .collection(let view):
            return "\(String(localized: "Collection", comment: "Note type")) · \(view.title)"
        }
    }

    /// The name the new-note menu gives a type.
    static func title(of type: NoteType) -> String {
        switch type {
        case .text: return String(localized: "Text", comment: "Note type")
        case .code: return String(localized: "Code", comment: "Note type")
        case .markdown: return String(localized: "Markdown", comment: "Note type: code note with Markdown MIME")
        case .canvas: return String(localized: "Canvas", comment: "Note type")
        case .mermaid: return String(localized: "Mermaid", comment: "Note type")
        case .mindMap: return String(localized: "Mind Map", comment: "Note type")
        case .spreadsheet: return String(localized: "Spreadsheet", comment: "Note type")
        case .geoMap: return String(localized: "Geo Map", comment: "Note type")
        case .calendar: return String(localized: "Calendar", comment: "Note type: Trilium journal / calendar root")
        case .kanban: return String(localized: "Kanban Board", comment: "Note type")
        case .presentation: return String(localized: "Presentation", comment: "Note type")
        case .llmChat: return String(localized: "AI Chat", comment: "Note type")
        default: return type.displayName
        }
    }
}
