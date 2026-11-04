import Foundation

/// Trilium's Grid, List and Dashboard collection views (`apps/client/src/widgets/collections`): the values the
/// loader fills for a collection note and the pure rules the web client applies to them.
enum CollectionNoteModels {
    // MARK: Values

    /// One child of the collection, as a card, row or widget shows it.
    struct Child: Identifiable, Hashable, Sendable {
        let noteId: String
        /// The title to draw (already the placeholder for a protected note while the session is locked).
        let title: String
        let type: NoteType
        let mime: String
        let isProtected: Bool
        /// Boxicons class the header draws (`bx bx-note`): the note's effective `#iconClass`, else the type's default.
        let iconClass: String
        let isArchived: Bool
        let hasChildren: Bool
        /// Trilium `#color`, for the card's `--custom-color`.
        let colorLabel: String?

        var id: String { noteId }
    }

    /// What a card, row or widget shows under its header.
    enum PreviewBody: Hashable, Sendable {
        /// Rendered content; `kind` is Trilium's rendering type (`text`, `code`, `image`, …), the `type-<kind>` class.
        case html(kind: String, html: String)
        /// A protected note while the session is locked.
        case protected
        /// Offline, and the body isn't in the cache.
        case notDownloaded
        /// Larger than a preview downloads.
        case tooLarge
        /// A type with no preview (Trilium's `.no-preview` icon).
        case none
    }

    struct PageItem: Identifiable, Hashable, Sendable {
        let child: Child
        let body: PreviewBody

        var id: String { child.noteId }
    }

    /// A list row. Trilium renders a row's content and nested rows when it is first expanded ("hydrated" here).
    struct ListRow: Identifiable, Hashable, Sendable {
        let child: Child
        /// 1 for the collection's direct children.
        let level: Int
        var isExpanded: Bool
        var isHydrated: Bool
        var body: PreviewBody?
        var children: [ListRow]

        var id: String { child.noteId }

        init(child: Child, level: Int, isExpanded: Bool = false, isHydrated: Bool = false, body: PreviewBody? = nil, children: [ListRow] = []) {
            self.child = child
            self.level = level
            self.isExpanded = isExpanded
            self.isHydrated = isHydrated
            self.body = body
            self.children = children
        }
    }

    // MARK: Dashboard layout (`dashboard.json`)

    struct DashboardGeometry: Hashable, Sendable {
        let x: Int
        let y: Int
        let w: Int
        let h: Int
    }

    /// The `viewConfig` attachment `dashboard.json`: `{"widgets":{"<noteId>":{"x","y","w","h"}}}`.
    struct DashboardLayout: Hashable, Sendable {
        var widgets: [String: DashboardGeometry]

        init(widgets: [String: DashboardGeometry] = [:]) {
            self.widgets = widgets
        }

        /// Reads the attachment, keeping only the widgets whose geometry is complete.
        static func decode(_ data: Data) -> DashboardLayout? {
            guard let object = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return nil }
            var widgets: [String: DashboardGeometry] = [:]
            for (noteId, value) in object["widgets"] as? [String: Any] ?? [:] {
                guard let entry = value as? [String: Any],
                      let x = integer(entry["x"]), let y = integer(entry["y"]),
                      let w = integer(entry["w"]), let h = integer(entry["h"])
                else { continue }
                widgets[noteId] = DashboardGeometry(
                    x: min(max(x, 0), Dashboard.columns - 1),
                    y: max(y, 0),
                    w: min(max(w, 1), Dashboard.columns),
                    h: max(h, 1)
                )
            }
            return DashboardLayout(widgets: widgets)
        }

        private static func integer(_ value: Any?) -> Int? {
            if let number = value as? NSNumber { return number.intValue }
            if let string = value as? String { return leadingInt(string) }
            return nil
        }
    }

    enum Dashboard {
        static let attachmentTitle = "dashboard.json"
        static let columns = 12
        static let cellHeight = 80
        static let gap = 8
        static let defaultWidth = 4
        static let defaultHeight = 3
        /// Below this width the web client stacks the widgets in one column.
        static let singleColumnBreakpoint = 768
    }

    /// The inline `style` placing a widget on the 12-column grid, or the default span for one without geometry.
    static func dashboardPlacement(_ geometry: DashboardGeometry?) -> String {
        guard let geometry else {
            return "grid-column: span \(Dashboard.defaultWidth); grid-row: span \(Dashboard.defaultHeight); --h: \(Dashboard.defaultHeight);"
        }
        let width = min(geometry.w, Dashboard.columns - geometry.x)
        return "grid-column: \(geometry.x + 1) / span \(width); grid-row: \(geometry.y + 1) / span \(geometry.h); --h: \(geometry.h);"
    }

    /// Widgets in reading order for the stacked (single-column) layout: placed ones by row then column, then the
    /// unplaced ones in branch order.
    static func stackedOrder(_ items: [PageItem], layout: DashboardLayout?) -> [PageItem] {
        guard let layout, !layout.widgets.isEmpty else { return items }
        let indexed = items.enumerated().map { ($0.offset, $0.element) }
        let placed = indexed.filter { layout.widgets[$0.1.child.noteId] != nil }.sorted { lhs, rhs in
            let a = layout.widgets[lhs.1.child.noteId]!, b = layout.widgets[rhs.1.child.noteId]!
            if a.y != b.y { return a.y < b.y }
            if a.x != b.x { return a.x < b.x }
            return lhs.0 < rhs.0
        }
        let unplaced = indexed.filter { layout.widgets[$0.1.child.noteId] == nil }
        return (placed + unplaced).map(\.1)
    }

    // MARK: Labels

    static let defaultPageSize = 20

    /// `#expanded` on the collection: how many list levels start expanded. Absent → none, empty → the first level,
    /// `all` → every level, else the number (`parseInt`, so `3x` is 3 and `abc` is none).
    static func expandDepth(label: String?) -> Int {
        guard let label else { return 0 }
        let value = label.trimmingCharacters(in: .whitespacesAndNewlines)
        if value.isEmpty { return 1 }
        if value.lowercased() == "all" { return Int.max }
        return leadingInt(value) ?? 0
    }

    /// `#pageSize` on the collection, when it is a positive number; Trilium's 20 otherwise.
    static func pageSize(label: String?) -> Int {
        guard let label, let value = leadingInt(label.trimmingCharacters(in: .whitespacesAndNewlines)), value > 0 else {
            return defaultPageSize
        }
        return value
    }

    static func pageCount(total: Int, pageSize: Int) -> Int {
        guard total > 0, pageSize > 0 else { return 1 }
        return (total + pageSize - 1) / pageSize
    }

    /// The items on `page` (1-based, clamped to the pages there are).
    static func pageItems<T>(_ items: [T], page: Int, pageSize: Int) -> [T] {
        guard !items.isEmpty, pageSize > 0 else { return [] }
        let pages = pageCount(total: items.count, pageSize: pageSize)
        let current = min(max(page, 1), pages)
        let start = (current - 1) * pageSize
        return Array(items[start..<min(start + pageSize, items.count)])
    }

    /// Trilium's `isLabelTruthy`: the label is there and its value is not `false`.
    static func isTruthyLabel(_ value: String?) -> Bool {
        guard let value else { return false }
        return value.trimmingCharacters(in: .whitespacesAndNewlines).lowercased() != "false"
    }

    /// JavaScript's `parseInt`: the leading integer of `text`, if it starts with one.
    static func leadingInt(_ text: String) -> Int? {
        var digits = ""
        for (index, character) in text.enumerated() {
            if character.isNumber && character.isASCII {
                digits.append(character)
            } else if index == 0 && (character == "-" || character == "+") {
                digits.append(character)
            } else {
                break
            }
        }
        return Int(digits)
    }

    // MARK: Children

    /// The children a grid, list or dashboard shows: the collection's direct children minus the hidden system notes,
    /// the notes its own `~imageLink` / `~includeNoteLink` relations already embed, and archived notes unless the
    /// collection says `#includeArchived`.
    static func filterTopLevel(
        childIds: [String],
        collectionRelations: [AttributeItem],
        hiddenIds: Set<String> = TriliumSharing.hiddenSystemChildNoteIds,
        includeArchived: Bool,
        isArchived: (String) -> Bool
    ) -> [String] {
        let embedded = Set(collectionRelations
            .filter { $0.type == .relation && ($0.name == "imageLink" || $0.name == "includeNoteLink") }
            .map(\.value))
        return childIds.filter {
            !hiddenIds.contains($0) && !embedded.contains($0) && (includeArchived || !isArchived($0))
        }
    }

    /// The nested rows under a list row: its children minus its `~imageLink` targets and, unless the collection
    /// shows them, archived notes (Trilium's `filterChildNotes`).
    static func filterNested(
        childIds: [String],
        parentRelations: [AttributeItem],
        includeArchived: Bool,
        isArchived: (String) -> Bool
    ) -> [String] {
        let images = Set(parentRelations.filter { $0.type == .relation && $0.name == "imageLink" }.map(\.value))
        return childIds.filter { !images.contains($0) && (includeArchived || !isArchived($0)) }
    }

    // MARK: Icons

    /// The Boxicons class a note type draws without an `#iconClass` (Trilium's `NOTE_TYPE_ICONS` and `getNoteIcon`).
    static func defaultIconClass(type: NoteType, hasChildren: Bool) -> String {
        switch type {
        case .text: return hasChildren ? "bx bx-folder" : "bx bx-note"
        case .code, .markdown: return "bx bx-code"
        case .file: return "bx bx-file"
        case .image: return "bx bx-image"
        case .search: return "bx bx-file-find"
        case .book, .collection, .calendar, .kanban, .presentation: return "bx bx-book"
        case .noteMap: return "bx bxs-network-chart"
        case .relationMap: return "bx bx-shape-polygon"
        case .render: return "bx bx-extension"
        case .canvas: return "bx bx-pen"
        case .webView: return "bx bx-globe-alt"
        case .shortcut, .launcher: return "bx bx-link"
        case .doc: return "bx bxs-file-doc"
        case .contentWidget: return "bx bxs-widget"
        case .mermaid: return "bx bx-selection"
        case .geoMap: return "bx bx-map-alt"
        case .mindMap: return "bx bx-sitemap"
        case .spreadsheet: return "bx bx-table"
        case .llmChat: return "bx bx-message-square-dots"
        }
    }
}

// MARK: - Table view (`table.json`)

extension CollectionNoteModels {
    /// A column of Trilium's table view, keyed as Tabulator persists it (`title`, `labels.<name>`, `relations.<name>`).
    enum TableField: Hashable, Sendable {
        case rowNumber, noteId, title, dateCreated, dateModified
        case label(String)
        case relation(String)

        var key: String {
            switch self {
            case .rowNumber: return "#"
            case .noteId: return "noteId"
            case .title: return "title"
            case .dateCreated: return "dateCreated"
            case .dateModified: return "dateModified"
            case .label(let name): return "labels.\(name)"
            case .relation(let name): return "relations.\(name)"
            }
        }

        init?(key: String) {
            switch key {
            case "#": self = .rowNumber
            case "noteId": self = .noteId
            case "title": self = .title
            case "dateCreated": self = .dateCreated
            case "dateModified": self = .dateModified
            default:
                if key.hasPrefix("labels.") {
                    self = .label(String(key.dropFirst("labels.".count)))
                } else if key.hasPrefix("relations.") {
                    self = .relation(String(key.dropFirst("relations.".count)))
                } else {
                    return nil
                }
            }
        }
    }

    /// An attribute definition the collection carries (`#label:due`, `#relation:owner`), as the table reads it:
    /// every definition makes a column, promoted or not.
    struct TableDefinition: Hashable, Sendable {
        let name: String
        let kind: AttributeItem.AttributeKind
        /// The alias the definition names, else the column is titled by the attribute's name.
        let title: String?
        let labelType: TriliumLabelType
        /// A set of values, shown as chips (`multi`).
        let isMulti: Bool

        var field: TableField { kind == .relation ? .relation(name) : .label(name) }
    }

    struct TableColumn: Hashable, Sendable {
        let field: TableField
        let title: String
        /// What a `labels.` column holds (`text` when the definition names no type); nil for the other columns.
        let labelType: TriliumLabelType?
        let isMulti: Bool
        /// Pixels, as saved by the web client; nil sizes the column to its content.
        var width: Int?
        var isVisible: Bool
    }

    /// A note a relation cell points at.
    struct TableTarget: Hashable, Sendable {
        let noteId: String
        let title: String
        let iconClass: String
        let colorLabel: String?
    }

    struct TableRow: Identifiable, Hashable, Sendable {
        let child: Child
        /// 0 for the collection's direct children.
        let level: Int
        /// Label values by name: one for a single-valued column, every value for a set.
        var labels: [String: [String]]
        var relations: [String: [TableTarget]]
        var dateCreated: String?
        var dateModified: String?
        var children: [TableRow]

        var id: String { child.noteId }

        init(child: Child, level: Int, labels: [String: [String]] = [:], relations: [String: [TableTarget]] = [:],
             dateCreated: String? = nil, dateModified: String? = nil, children: [TableRow] = []) {
            self.child = child
            self.level = level
            self.labels = labels
            self.relations = relations
            self.dateCreated = dateCreated
            self.dateModified = dateModified
            self.children = children
        }
    }

    /// The `viewConfig` attachment `table.json`: what Tabulator persisted, `{"tableData":{"columns":[{"field","title",
    /// "width","visible"}],"sort":[{"column","dir"}]}}`.
    struct TableConfig: Hashable, Sendable {
        struct SavedColumn: Hashable, Sendable {
            let field: String
            let width: Int?
            let isVisible: Bool?
        }

        struct Sort: Hashable, Sendable {
            let field: String
            let descending: Bool
        }

        var columns: [SavedColumn] = []
        var sort: [Sort] = []

        static let attachmentTitle = "table.json"

        static func decode(_ data: Data) -> TableConfig? {
            guard let root = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let tableData = root["tableData"] as? [String: Any]
            else { return nil }
            var config = TableConfig()
            for entry in tableData["columns"] as? [[String: Any]] ?? [] {
                // The row-number column has no field; Tabulator keeps it by its title.
                let field = (entry["field"] as? String) ?? ((entry["title"] as? String) == "#" ? "#" : nil)
                guard let field else { continue }
                config.columns.append(SavedColumn(field: field, width: integer(entry["width"]), isVisible: entry["visible"] as? Bool))
            }
            for entry in tableData["sort"] as? [[String: Any]] ?? [] {
                guard let field = (entry["column"] as? String) ?? (entry["field"] as? String) else { continue }
                config.sort.append(Sort(field: field, descending: (entry["dir"] as? String)?.lowercased() == "desc"))
            }
            return config
        }

        private static func integer(_ value: Any?) -> Int? {
            if let number = value as? NSNumber { return number.intValue }
            if let string = value as? String { return leadingInt(string) }
            return nil
        }
    }

    /// The web client's default width of the title column.
    static let tableTitleWidth = 400

    /// `#maxNestingDepth`: how many levels of children get rows under their parent; absent or not a number, all.
    static func maxNestingDepth(label: String?) -> Int {
        guard let label, let depth = leadingInt(label) else { return -1 }
        return depth
    }

    /// The definitions among `attributes` (own first, then inherited), the first of each name counting, as
    /// `FNote.getAttributeDefinitions()` reads them.
    static func tableDefinitions(from attributes: [AttributeItem]) -> [TableDefinition] {
        var seen = Set<String>()
        var definitions: [TableDefinition] = []
        for attribute in attributes where attribute.type == .label {
            guard let defined = AttributeNames.definedAttribute(byDefinitionName: attribute.name),
                  seen.insert(attribute.name).inserted
            else { continue }
            let parsed = PromotedAttributeDefinition(parsing: attribute.value)
            definitions.append(TableDefinition(
                name: defined.name,
                kind: defined.type,
                title: parsed.promotedAlias,
                labelType: parsed.labelType ?? .text,
                isMulti: parsed.multiplicity == .multi
            ))
        }
        return definitions
    }

    /// The columns in the order the table shows them: the built-in ones (the note id and dates hidden until a
    /// saved configuration shows them), then one per definition; a saved configuration restores its order, widths
    /// and visibility, with columns it doesn't know following (`restoreExistingData`).
    static func tableColumns(definitions: [TableDefinition], config: TableConfig?) -> [TableColumn] {
        var columns: [TableColumn] = [
            TableColumn(field: .rowNumber, title: "#", labelType: nil, isMulti: false, width: nil, isVisible: true),
            TableColumn(field: .noteId, title: String(localized: "Note ID", comment: "Table collection column"),
                        labelType: nil, isMulti: false, width: nil, isVisible: false),
            TableColumn(field: .title, title: String(localized: "Title", comment: "Table collection column"),
                        labelType: nil, isMulti: false, width: tableTitleWidth, isVisible: true),
            TableColumn(field: .dateCreated, title: String(localized: "Date created", comment: "Table collection column"),
                        labelType: nil, isMulti: false, width: nil, isVisible: false),
            TableColumn(field: .dateModified, title: String(localized: "Date modified", comment: "Table collection column"),
                        labelType: nil, isMulti: false, width: nil, isVisible: false),
        ]
        var seen = Set(columns.map(\.field))
        for definition in definitions where seen.insert(definition.field).inserted {
            columns.append(TableColumn(
                field: definition.field,
                title: definition.title ?? definition.name,
                labelType: definition.kind == .label ? definition.labelType : nil,
                isMulti: definition.isMulti,
                width: nil,
                isVisible: true
            ))
        }
        guard let config, !config.columns.isEmpty else { return columns }

        var byKey = Dictionary(columns.map { ($0.field.key, $0) }, uniquingKeysWith: { first, _ in first })
        var restored: [TableColumn] = []
        for saved in config.columns {
            guard var column = byKey.removeValue(forKey: saved.field) else { continue }
            // The row-number column sizes itself to the row count, not to a width saved with fewer rows.
            if column.field != .rowNumber, let width = saved.width {
                column.width = width
            }
            if let visible = saved.isVisible {
                column.isVisible = visible
            }
            restored.append(column)
        }
        return restored + columns.filter { byKey[$0.field.key] != nil }
    }

    /// Rows with every relation target replaced by the note it names, targets nobody can see dropped (a cell then
    /// shows nothing, as on the web).
    static func resolvingTargets(_ rows: [TableRow], _ targets: [String: TableTarget]) -> [TableRow] {
        rows.map { row in
            var copy = row
            copy.relations = row.relations.mapValues { $0.compactMap { targets[$0.noteId] } }
            copy.children = resolvingTargets(row.children, targets)
            return copy
        }
    }

    /// The rows (and nested rows) in the order a saved sort asks for: numbers by value, flags unset before set,
    /// dates and everything else by text, as Tabulator's sorters do. No sort keeps branch order.
    static func sortedTableRows(_ rows: [TableRow], by sort: [TableConfig.Sort], columns: [TableColumn]) -> [TableRow] {
        guard let first = sort.first, let field = TableField(key: first.field) else { return rows }
        let column = columns.first { $0.field == field }
        let keyed = rows.enumerated().map { (index: $0.offset, row: $0.element, key: tableSortKey($0.element, field: field, column: column)) }
        let ordered = keyed.sorted { lhs, rhs in
            let order = lhs.key.compare(rhs.key)
            if order == .orderedSame { return lhs.index < rhs.index }
            return first.descending ? order == .orderedDescending : order == .orderedAscending
        }
        return ordered.map { entry in
            var row = entry.row
            row.children = sortedTableRows(row.children, by: sort, columns: columns)
            return row
        }
    }

    enum TableSortKey: Comparable {
        case number(Double)
        case flag(Bool)
        case text(String)

        static func < (lhs: TableSortKey, rhs: TableSortKey) -> Bool {
            switch (lhs, rhs) {
            case (.number(let a), .number(let b)): return a < b
            case (.flag(let a), .flag(let b)): return !a && b
            case (.text(let a), .text(let b)): return a.localizedCaseInsensitiveCompare(b) == .orderedAscending
            case (.number, _): return true
            case (_, .number): return false
            case (.flag, _): return true
            case (_, .flag): return false
            }
        }

        func compare(_ other: TableSortKey) -> ComparisonResult {
            if self < other { return .orderedAscending }
            if other < self { return .orderedDescending }
            return .orderedSame
        }
    }

    static func tableSortKey(_ row: TableRow, field: TableField, column: TableColumn?) -> TableSortKey {
        switch field {
        case .rowNumber: return .text("")
        case .noteId: return .text(row.child.noteId)
        case .title: return .text(row.child.title)
        case .dateCreated: return .text(row.dateCreated ?? "")
        case .dateModified: return .text(row.dateModified ?? "")
        case .label(let name):
            let values = row.labels[name] ?? []
            switch column?.labelType {
            case .number where column?.isMulti != true:
                return .number(values.first.flatMap { Double($0.trimmingCharacters(in: .whitespaces)) } ?? -.greatestFiniteMagnitude)
            case .boolean where column?.isMulti != true:
                return .flag(values.first == "true")
            default:
                return .text(values.joined(separator: ", "))
            }
        case .relation(let name):
            return .text((row.relations[name] ?? []).map(\.title).joined(separator: ", "))
        }
    }
}
