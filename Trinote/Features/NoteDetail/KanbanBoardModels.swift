import Foundation

/// Pure models / parsers for Trilium Kanban boards (`#viewType=board`).
enum KanbanBoardModels {
    static let boardConfigAttachmentTitle = "board.json"
    static let defaultGroupByAttribute = "status"
    /// `board.json` key holding the default grouping's columns (every grouping's before Trilium v0.106).
    static let defaultColumnsKey = "columns"
    /// Suffix of the per-grouping column lists Trilium v0.106+ keeps for non-default groupings.
    static let groupedColumnsKeySuffix = "ViewColumns"
    /// `#board:showInbox` adds a column for cards with no grouping value.
    static let showInboxLabel = "board:showInbox"
    /// The inbox column's value: the empty string, which is what a card with no grouping value has.
    static let inboxColumnValue = ""

    /// Any JSON value, so `board.json` fields Trinote doesn't model are written back unchanged.
    enum JSONValue: Codable, Equatable, Hashable, Sendable {
        case bool(Bool)
        case int(Int)
        case double(Double)
        case string(String)
        case array([JSONValue])
        case object([String: JSONValue])
        case null

        init(from decoder: Decoder) throws {
            let container = try decoder.singleValueContainer()
            if container.decodeNil() {
                self = .null
            } else if let value = try? container.decode(Bool.self) {
                self = .bool(value)
            } else if let value = try? container.decode(Int.self) {
                self = .int(value)
            } else if let value = try? container.decode(Double.self) {
                self = .double(value)
            } else if let value = try? container.decode(String.self) {
                self = .string(value)
            } else if let value = try? container.decode([JSONValue].self) {
                self = .array(value)
            } else {
                self = .object(try container.decode([String: JSONValue].self))
            }
        }

        func encode(to encoder: Encoder) throws {
            var container = encoder.singleValueContainer()
            switch self {
            case .bool(let value): try container.encode(value)
            case .int(let value): try container.encode(value)
            case .double(let value): try container.encode(value)
            case .string(let value): try container.encode(value)
            case .array(let value): try container.encode(value)
            case .object(let value): try container.encode(value)
            case .null: try container.encodeNil()
            }
        }

        var stringValue: String? {
            if case .string(let value) = self { return value }
            return nil
        }

        var arrayValue: [JSONValue]? {
            if case .array(let value) = self { return value }
            return nil
        }

        var objectValue: [String: JSONValue]? {
            if case .object(let value) = self { return value }
            return nil
        }
    }

    /// What `#board:groupBy` names: a label (default `status`) or, written with `~`, a relation.
    struct GroupBy: Equatable, Hashable, Sendable {
        let name: String
        let isRelation: Bool

        static let `default` = GroupBy(name: KanbanBoardModels.defaultGroupByAttribute, isRelation: false)

        /// Strips the `#` a label may be written with; a leading `~` marks a relation. Mirrors Trilium's
        /// `normalizeBoardGroupBy`, where a relation and a label of the same name are different groupings.
        init(_ raw: String?) {
            var trimmed = (raw ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
            if trimmed.hasPrefix("#") {
                trimmed = String(trimmed.dropFirst()).trimmingCharacters(in: .whitespacesAndNewlines)
            }
            if trimmed.hasPrefix("~") {
                let relation = String(trimmed.dropFirst()).trimmingCharacters(in: .whitespacesAndNewlines)
                if !relation.isEmpty {
                    self.init(name: relation, isRelation: true)
                    return
                }
                trimmed = ""
            }
            self.init(name: trimmed.isEmpty ? KanbanBoardModels.defaultGroupByAttribute : trimmed, isRelation: false)
        }

        init(name: String, isRelation: Bool) {
            self.name = name
            self.isRelation = isRelation
        }

        /// The form `#board:groupBy` and the board's API calls use: `~name` for a relation.
        var rawValue: String { isRelation ? "~\(name)" : name }

        var attributeType: String { isRelation ? "relation" : "label" }

        /// Where `board.json` keeps this grouping's columns. Trilium v0.106+ keeps a list per grouping
        /// (`columns` for `status`, `<attr>ViewColumns` otherwise); older servers only read `columns`.
        func columnsKey(perGroupingLists: Bool) -> String {
            guard perGroupingLists, rawValue != KanbanBoardModels.defaultGroupByAttribute else {
                return KanbanBoardModels.defaultColumnsKey
            }
            return rawValue + KanbanBoardModels.groupedColumnsKeySuffix
        }
    }

    /// `board.json`, kept whole so a save changes only the column list it means to.
    struct BoardConfig: Equatable, Sendable {
        var fields: [String: JSONValue]

        init(fields: [String: JSONValue] = [:]) {
            self.fields = fields
        }

        init(columns: [BoardColumn]?) {
            self.fields = columns.map { [KanbanBoardModels.defaultColumnsKey: .array($0.map(\.jsonValue))] } ?? [:]
        }

        /// The default grouping's columns.
        var columns: [BoardColumn]? {
            columns(forKey: KanbanBoardModels.defaultColumnsKey)
        }

        /// The stored columns under `key`, falling back to a pre-v0.106 `columns` list that has not been
        /// moved under its grouping yet.
        func columns(forKey key: String) -> [BoardColumn]? {
            if let stored = fields[key]?.arrayValue {
                return stored.compactMap(BoardColumn.init(json:))
            }
            if adoptsLegacyColumns(forKey: key) {
                return fields[KanbanBoardModels.defaultColumnsKey]?.arrayValue?.compactMap(BoardColumn.init(json:))
            }
            return nil
        }

        /// Replaces the column list under `key`, keeping every other key. A legacy `columns` list read in its
        /// place is moved there, as Trilium's `adoptLegacyColumns` does, so it is not later read as the
        /// default grouping's.
        func settingColumns(_ columns: [BoardColumn], forKey key: String) -> BoardConfig {
            var next = fields
            if adoptsLegacyColumns(forKey: key) {
                next.removeValue(forKey: KanbanBoardModels.defaultColumnsKey)
            }
            next[key] = .array(columns.map(\.jsonValue))
            return BoardConfig(fields: next)
        }

        private func adoptsLegacyColumns(forKey key: String) -> Bool {
            guard key != KanbanBoardModels.defaultColumnsKey, fields[key] == nil,
                  fields[KanbanBoardModels.defaultColumnsKey]?.arrayValue?.isEmpty == false
            else { return false }
            return !fields.keys.contains(where: KanbanBoardModels.isGroupedColumnsKey)
        }
    }

    /// One stored column: its grouping `value` plus every other field Trilium keeps for it
    /// (`id`, `icon`, `color`, `archived`, `collapsed`, `limit`, `displayName`, …).
    struct BoardColumn: Equatable, Sendable, Hashable {
        var value: String
        var fields: [String: JSONValue]

        init(value: String, fields: [String: JSONValue] = [:]) {
            self.value = value
            self.fields = fields
        }

        init?(json: JSONValue) {
            guard var object = json.objectValue, let value = object["value"]?.stringValue else { return nil }
            object.removeValue(forKey: "value")
            self.init(value: value, fields: object)
        }

        var jsonValue: JSONValue {
            var object = fields
            object["value"] = .string(value)
            return .object(object)
        }

        var isArchived: Bool { fields["archived"] == .bool(true) }

        /// Icon class shown before the title, e.g. `bx bx-bug`.
        var icon: String? { nonEmpty(fields["icon"]?.stringValue) }
        /// CSS color the column is tinted with.
        var color: String? { nonEmpty(fields["color"]?.stringValue) }
        /// Card limit; the header shows `count/limit` and warns past it.
        var limit: Int? {
            switch fields["limit"] {
            case .int(let value): return value > 0 ? value : nil
            case .double(let value): return value > 0 ? Int(value) : nil
            default: return nil
            }
        }
        var isCollapsed: Bool { fields["collapsed"] == .bool(true) }
        /// "Keep column collapsed": opening the column lasts only until the board is left.
        var keepsCollapsed: Bool { fields["keepCollapsed"] == .bool(true) }

        private func nonEmpty(_ value: String?) -> String? {
            let trimmed = value?.trimmingCharacters(in: .whitespacesAndNewlines)
            return trimmed?.isEmpty == false ? trimmed : nil
        }

        var displayName: String? {
            let name = fields["displayName"]?.stringValue?.trimmingCharacters(in: .whitespacesAndNewlines)
            return name?.isEmpty == false ? name : nil
        }
    }

    struct Card: Identifiable, Equatable, Sendable, Hashable {
        let noteId: String
        let branchId: String
        let title: String
        var columnValue: String
        let notePosition: Int
        /// Own, template or inherited `#iconClass`, as the note tree shows it.
        var iconClass: String? = nil
        var fallbackNoteType: NoteType = .text
        /// Raw `#color` label value.
        var colorLabel: String? = nil
        /// `utcDateCreated`, the tie-break (and the `creationDate` key) when a column sorts its cards.
        var creationDate: String? = nil
        /// First value per label name, and first target note id per relation name.
        var labels: [String: String] = [:]
        var relations: [String: String] = [:]
        /// How many parents the note has; more than one means it is also cloned elsewhere in the tree.
        var parentNoteCount: Int = 1

        var id: String { noteId }

        var isClonedElsewhere: Bool { parentNoteCount > 1 }

        /// `~board:cardRedirectTo` (or its old name): the note opening this card navigates to instead.
        var redirectNoteId: String? {
            relations["board:cardRedirectTo"] ?? relations["boardCardRedirectTo"]
        }

        /// Builds the lookups from a note's attributes (owned ones, as the server and cache give them).
        static func attributeMaps(_ attributes: [AttributeItem]) -> (labels: [String: String], relations: [String: String]) {
            var labels: [String: String] = [:]
            var relations: [String: String] = [:]
            for attribute in attributes.sorted(by: { $0.position < $1.position }) {
                switch attribute.type {
                case .label: if labels[attribute.name] == nil { labels[attribute.name] = attribute.value }
                case .relation: if relations[attribute.name] == nil { relations[attribute.name] = attribute.value }
                }
            }
            return (labels, relations)
        }
    }

    struct Column: Identifiable, Equatable, Sendable {
        let value: String
        var cards: [Card]
        /// Header text when it differs from `value`: the inbox's name, or a relation target's note title.
        var title: String?
        var icon: String?
        var color: String?
        var limit: Int?
        /// Stored as collapsed (`collapsed`).
        var isCollapsed: Bool
        /// Stored as "Keep column collapsed" (`keepCollapsed`).
        var isKeptCollapsed: Bool
        /// Stored `orderBy`: `manual`, `default` (or none), `title`, `creationDate` or `attr:<name>`.
        var storedOrderBy: String?
        /// Stored `descendingOrder`.
        var isStoredDescending: Bool
        /// The order the cards are drawn in (the column's own or the board's); `nil` is tree order.
        var effectiveSort: ColumnSort?

        init(
            value: String,
            cards: [Card],
            title: String? = nil,
            icon: String? = nil,
            color: String? = nil,
            limit: Int? = nil,
            isCollapsed: Bool = false,
            isKeptCollapsed: Bool = false,
            storedOrderBy: String? = nil,
            isStoredDescending: Bool = false,
            effectiveSort: ColumnSort? = nil
        ) {
            self.value = value
            self.cards = cards
            self.title = title
            self.icon = icon
            self.color = color
            self.limit = limit
            self.isCollapsed = isCollapsed
            self.isKeptCollapsed = isKeptCollapsed
            self.storedOrderBy = storedOrderBy
            self.isStoredDescending = isStoredDescending
            self.effectiveSort = effectiveSort
        }

        /// The Sort menu's current choice: `default`, `manual` or the stored key.
        var sortSelection: String { KanbanBoardModels.sortSelection(storedOrderBy: storedOrderBy) }

        var isOverLimit: Bool { limit.map { cards.count > $0 } ?? false }

        var id: String { value }

        var isInbox: Bool { value == KanbanBoardModels.inboxColumnValue }

        var displayTitle: String {
            if let title, !title.isEmpty { return title }
            if isInbox { return String(localized: "Inbox", comment: "Kanban inbox column title") }
            return value
        }
    }

    static func isGroupedColumnsKey(_ key: String) -> Bool {
        key.hasSuffix(groupedColumnsKeySuffix) && key.count > groupedColumnsKeySuffix.count
    }

    /// Strips a leading `#` or `~` from `#board:groupBy` values (Trilium accepts both).
    static func normalizedGroupByAttributeName(_ raw: String?) -> String {
        GroupBy(raw).name
    }

    /// Parses `board.json`. Empty content is an empty config. Also reads the base64 text earlier Trinote versions
    /// stored when they created the attachment, so those boards keep their columns instead of failing to save.
    static func decodeBoardConfig(from data: Data) -> BoardConfig? {
        if let fields = try? JSONDecoder().decode([String: JSONValue].self, from: data) {
            return BoardConfig(fields: fields)
        }
        let text = String(decoding: data, as: UTF8.self).trimmingCharacters(in: .whitespacesAndNewlines)
        if text.isEmpty { return BoardConfig() }
        guard let decoded = Data(base64Encoded: text),
              let fields = try? JSONDecoder().decode([String: JSONValue].self, from: decoded)
        else { return nil }
        return BoardConfig(fields: fields)
    }

    static func decodeBoardConfig(from json: JSONValue?) -> BoardConfig? {
        json?.objectValue.map(BoardConfig.init(fields:))
    }

    static func encodeBoardConfig(_ config: BoardConfig) throws -> Data {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        return try encoder.encode(config.fields)
    }

    /// Merges `board.json` column order (including empty columns) with cards discovered via the group-by attribute.
    static func buildColumns(config: BoardConfig?, cards: [Card]) -> [Column] {
        buildColumns(storedColumns: config?.columns, cards: cards)
    }

    /// Archived columns are left out together with their cards, as Trilium's board does. With `showInbox`,
    /// cards without a grouping value (`inboxColumnValue`) get the inbox column, placed where it is stored or first.
    /// Cards keep their tree order unless the column (or, for a column set to "default", the board) sorts them.
    static func buildColumns(
        storedColumns: [BoardColumn]?,
        cards: [Card],
        showInbox: Bool = false,
        boardSort: ColumnSort? = nil,
        relationTitle: (String) -> String? = { _ in nil }
    ) -> [Column] {
        var buckets: [String: [Card]] = [:]
        for card in cards {
            buckets[card.columnValue, default: []].append(card)
        }
        for key in buckets.keys {
            buckets[key]?.sort { lhs, rhs in
                if lhs.notePosition != rhs.notePosition {
                    return lhs.notePosition < rhs.notePosition
                }
                return lhs.title.localizedCaseInsensitiveCompare(rhs.title) == .orderedAscending
            }
        }

        var ordered: [(value: String, title: String?)] = []
        var seen: Set<String> = [inboxColumnValue]
        var inboxPlaced = false
        for col in storedColumns ?? [] {
            let value = col.value.trimmingCharacters(in: .whitespacesAndNewlines)
            if value == inboxColumnValue {
                guard showInbox, !inboxPlaced, !col.isArchived else { continue }
                inboxPlaced = true
                ordered.append((inboxColumnValue, col.displayName))
                continue
            }
            guard seen.insert(value).inserted, !col.isArchived else { continue }
            ordered.append((value, nil))
        }
        if showInbox, !inboxPlaced {
            ordered.insert((inboxColumnValue, nil), at: 0)
        }
        let discovered = buckets.keys.sorted { $0.localizedCaseInsensitiveCompare($1) == .orderedAscending }
        for value in discovered where seen.insert(value).inserted {
            ordered.append((value, nil))
        }

        var storedByValue: [String: BoardColumn] = [:]
        for column in storedColumns ?? [] where storedByValue[column.value] == nil {
            storedByValue[column.value] = column
        }
        return ordered.map { entry in
            let stored = storedByValue[entry.value]
            let sort = columnSort(for: stored, boardSort: boardSort)
            return Column(
                value: entry.value,
                cards: orderedCards(buckets[entry.value] ?? [], by: sort, relationTitle: relationTitle),
                title: entry.title,
                icon: stored?.icon ?? (entry.value == inboxColumnValue ? "bx bxs-inbox" : nil),
                color: stored?.color,
                limit: stored?.limit,
                isCollapsed: stored?.isCollapsed ?? false,
                isKeptCollapsed: stored?.keepsCollapsed ?? false,
                storedOrderBy: stored?.fields["orderBy"]?.stringValue,
                isStoredDescending: stored?.fields["descendingOrder"] == .bool(true),
                effectiveSort: sort
            )
        }
    }

    // MARK: - Column sorting (Trilium v0.106 `collections/sorting.ts`)

    enum SortKey: Equatable, Sendable {
        case title
        case creationDate
        case attribute(String)

        /// `title`, `creationDate` or `attr:<name>`; anything else is no key.
        init?(_ raw: String?) {
            switch raw {
            case "title": self = .title
            case "creationDate": self = .creationDate
            case let raw? where raw.hasPrefix("attr:") && raw.count > "attr:".count:
                self = .attribute(String(raw.dropFirst("attr:".count)))
            default: return nil
            }
        }
    }

    struct ColumnSort: Equatable, Sendable {
        let key: SortKey
        let descending: Bool
    }

    /// The board-wide order from `#board:sortColumns` / `#board:sortColumnsDescending`, if it names a key.
    static func boardSort(_ attributes: [AttributeItem]) -> ColumnSort? {
        func label(_ name: String) -> AttributeItem? {
            attributes.first { $0.type == .label && $0.name == name }
        }
        guard let key = SortKey(label("board:sortColumns")?.value) else { return nil }
        let descending = label("board:sortColumnsDescending").map { $0.value.lowercased() != "false" } ?? false
        return ColumnSort(key: key, descending: descending)
    }

    /// A column's own key wins; `manual` keeps tree order; no `orderBy` (or `default`) takes the board's order.
    static func columnSort(for stored: BoardColumn?, boardSort: ColumnSort?) -> ColumnSort? {
        let raw = stored?.fields["orderBy"]?.stringValue
        if raw == "manual" { return nil }
        if raw == nil || raw == "" || raw == "default" { return boardSort }
        guard let key = SortKey(raw) else { return nil }
        return ColumnSort(key: key, descending: stored?.fields["descendingOrder"] == .bool(true))
    }

    private enum SortValue {
        case number(Double)
        case text(String)
    }

    /// Cards without a value go last whichever the direction; ties fall back to creation date, then tree order.
    static func sortedCards(_ cards: [Card], by sort: ColumnSort, relationTitle: (String) -> String?) -> [Card] {
        func value(_ card: Card) -> SortValue? {
            let raw: String?
            switch sort.key {
            case .title: raw = card.title
            case .creationDate: raw = card.creationDate
            case .attribute(let name):
                raw = card.labels[name] ?? card.relations[name].map { relationTitle($0) ?? $0 }
            }
            guard let raw, !raw.isEmpty else { return nil }
            if sort.key != .title, let number = Double(raw) { return .number(number) }
            return .text(raw)
        }
        func compare(_ a: SortValue?, _ b: SortValue?) -> ComparisonResult {
            switch (a, b) {
            case (nil, nil): return .orderedSame
            case (nil, _): return .orderedDescending
            case (_, nil): return .orderedAscending
            case let (.number(x)?, .number(y)?): return x == y ? .orderedSame : (x < y ? .orderedAscending : .orderedDescending)
            case let (.number(x)?, .text(y)?): return String(x).localizedStandardCompare(y)
            case let (.text(x)?, .number(y)?): return x.localizedStandardCompare(String(y))
            case let (.text(x)?, .text(y)?): return x.localizedStandardCompare(y)
            }
        }
        let entries = cards.enumerated().map { (index: $0.offset, card: $0.element, value: value($0.element)) }
        return entries.sorted { a, b in
            let primary = compare(a.value, b.value)
            if primary != .orderedSame {
                let bothDefined = a.value != nil && b.value != nil
                return (bothDefined && sort.descending) ? primary == .orderedDescending : primary == .orderedAscending
            }
            let created = (a.card.creationDate ?? "").compare(b.card.creationDate ?? "")
            if created != .orderedSame { return created == .orderedAscending }
            return a.index < b.index
        }.map(\.card)
    }

    /// Cards in `sort`'s order, or in tree order (position, then title) when there is none.
    static func orderedCards(_ cards: [Card], by sort: ColumnSort?, relationTitle: (String) -> String?) -> [Card] {
        let treeOrder = cards.sorted { lhs, rhs in
            if lhs.notePosition != rhs.notePosition { return lhs.notePosition < rhs.notePosition }
            return lhs.title.localizedCaseInsensitiveCompare(rhs.title) == .orderedAscending
        }
        guard let sort else { return treeOrder }
        return sortedCards(treeOrder, by: sort, relationTitle: relationTitle)
    }

    /// What the Sort menu shows as picked for a stored `orderBy`: nothing (or `default`) takes the board's order.
    static func sortSelection(storedOrderBy: String?) -> String {
        switch storedOrderBy {
        case nil, "", "default": return "default"
        case let raw?: return raw
        }
    }

    /// `column` with a new stored sort, its cards put in the order that now applies.
    static func resorted(
        _ column: Column,
        orderBy: String?,
        descending: Bool,
        boardSort: ColumnSort?,
        relationTitle: (String) -> String?
    ) -> Column {
        var fields: [String: JSONValue] = [:]
        if let orderBy { fields["orderBy"] = .string(orderBy) }
        if descending { fields["descendingOrder"] = .bool(true) }
        let sort = columnSort(for: BoardColumn(value: column.value, fields: fields), boardSort: boardSort)
        var updated = column
        updated.storedOrderBy = orderBy
        updated.isStoredDescending = descending
        updated.effectiveSort = sort
        updated.cards = orderedCards(column.cards, by: sort, relationTitle: relationTitle)
        return updated
    }

    // MARK: - Card properties (Trilium v0.106 "Board properties")

    struct CardProperty: Equatable, Sendable, Hashable {
        let name: String
        let title: String
        let isRelation: Bool
    }

    /// The board's inheritable `#label:<name>` / `#relation:<name>` definitions, ordered and hidden per `board.json`'s
    /// `promotedAttributes`, without the attribute the board groups by. Mirrors `resolvePromotedAttributes`.
    static func cardProperties(
        boardAttributes: [AttributeItem],
        settings: JSONValue?,
        groupBy: GroupBy
    ) -> [CardProperty] {
        var defined: [(property: CardProperty, isRelation: Bool)] = []
        for attribute in boardAttributes where attribute.type == .label && attribute.isInheritable {
            let parts = attribute.name.split(separator: ":", maxSplits: 1).map(String.init)
            guard parts.count == 2, parts[0] == "label" || parts[0] == "relation", !parts[1].isEmpty,
                  !defined.contains(where: { $0.property.name == parts[1] }) else { continue }
            let alias = attribute.value.split(separator: ",")
                .map { $0.trimmingCharacters(in: .whitespaces) }
                .first { $0.hasPrefix("alias=") }
                .map { String($0.dropFirst("alias=".count)) }
                .flatMap { $0.isEmpty ? nil : $0 }
            let isRelation = parts[0] == "relation"
            defined.append((CardProperty(name: parts[1], title: alias ?? parts[1], isRelation: isRelation), isRelation))
        }

        var ordered: [CardProperty] = []
        var hidden = Set<String>()
        for setting in settings?.arrayValue ?? [] {
            guard let object = setting.objectValue, let name = object["name"]?.stringValue,
                  let match = defined.first(where: { $0.property.name == name }),
                  !ordered.contains(match.property) else { continue }
            if object["hidden"] == .bool(true) { hidden.insert(name) }
            ordered.append(match.property)
        }
        for entry in defined where !ordered.contains(entry.property) {
            ordered.append(entry.property)
        }
        return ordered.filter { property in
            !hidden.contains(property.name)
                && !(property.name == groupBy.name && property.isRelation == groupBy.isRelation)
        }
    }

    /// A loaded board, as the view draws it.
    struct BoardLoad: Equatable, Sendable {
        var columns: [Column]
        var groupBy: String
        /// `#board:columnWidth`: `narrow` (default), `medium` or `wide`.
        var columnWidth: String?
        /// The board's search filter, when it was applied.
        var filterQuery: String?
        var cardProperties: [CardProperty]
        var relationTitles: [String: String]
        /// `#board:sortColumns` / `#board:sortColumnsDescending`, which columns set to the board's default follow.
        var boardSort: ColumnSort?
    }

    // MARK: - Card templates

    /// What `board.json`'s `template` (or the first of `templates`) says a new card is made from: a `type:<type>:<mime>`
    /// blank note or a `template:<noteId>` note. `nil` means a plain text card.
    enum CardTemplate: Equatable, Sendable {
        case noteType(type: String, mime: String?)
        case template(noteId: String)

        init?(config: BoardConfig?) {
            let id = config?.fields["template"]?.stringValue
                ?? config?.fields["templates"]?.arrayValue?.first?.stringValue
            guard let id else { return nil }
            if id.hasPrefix("template:") {
                let noteId = String(id.dropFirst("template:".count))
                guard !noteId.isEmpty else { return nil }
                self = .template(noteId: noteId)
            } else if id.hasPrefix("type:") {
                let rest = id.dropFirst("type:".count)
                let parts = rest.split(separator: ":", maxSplits: 1, omittingEmptySubsequences: false).map(String.init)
                guard let type = parts.first, !type.isEmpty else { return nil }
                let mime = parts.count > 1 && !parts[1].isEmpty ? parts[1] : nil
                self = .noteType(type: type, mime: mime)
            } else {
                return nil
            }
        }
    }

    /// The stored list with one column's `collapsed` / `keepCollapsed` set (`nil` leaves a flag as it is), as Trilium's
    /// board writes them: a flag turned off is removed rather than stored as `false`, and a column without an entry
    /// gets one after the nearest column before it (in `shownOrder`) that has one.
    static func settingCollapse(
        ofColumn value: String,
        collapsed: Bool?,
        keepCollapsed: Bool?,
        stored: [BoardColumn],
        shownOrder: [String]
    ) -> [BoardColumn] {
        var patch: [String: JSONValue?] = [:]
        if let collapsed { patch["collapsed"] = .bool(collapsed) }
        if let keepCollapsed { patch["keepCollapsed"] = .bool(keepCollapsed) }
        return patchingColumn(value, with: patch, stored: stored, shownOrder: shownOrder)
    }

    /// The stored list with `patch` written onto column `value`, as Trilium's board `withColumn` does: a field set to
    /// `nil`, `false`, `""` or `0` is removed rather than stored, and a column without an entry gets one after the
    /// nearest column before it (in `shownOrder`) that has one.
    static func patchingColumn(
        _ value: String,
        with patch: [String: JSONValue?],
        stored: [BoardColumn],
        shownOrder: [String]
    ) -> [BoardColumn] {
        func patched(_ column: BoardColumn) -> BoardColumn {
            var column = column
            for (key, newValue) in patch {
                switch newValue {
                case nil, .bool(false)?, .string("")?, .int(0)?, .null?: column.fields[key] = nil
                case let kept?: column.fields[key] = kept
                }
            }
            return column
        }

        if let index = stored.firstIndex(where: { $0.value == value }) {
            var columns = stored
            columns[index] = patched(columns[index])
            return columns
        }
        var columns = stored
        let insertAt: Int
        if let shownIndex = shownOrder.firstIndex(of: value) {
            let previous = shownOrder[..<shownIndex].reversed().first { candidate in
                stored.contains { $0.value == candidate }
            }
            insertAt = previous.flatMap { candidate in stored.firstIndex { $0.value == candidate } }.map { $0 + 1 } ?? 0
        } else {
            insertAt = columns.count
        }
        columns.insert(patched(BoardColumn(value: value)), at: insertAt)
        return columns
    }

    /// The stored list with the board's shown columns in `shownOrder`. Stored fields survive, columns the
    /// board does not show (archived ones, the inbox while it is off) keep their place, and a new column
    /// gets an `id` from `makeColumnId`, as Trilium v0.106 assigns one to every column it creates.
    static func reorderedColumns(
        stored: [BoardColumn],
        shownOrder: [String],
        showInbox: Bool,
        makeColumnId: () -> String
    ) -> [BoardColumn] {
        func isShown(_ column: BoardColumn) -> Bool {
            guard !column.isArchived else { return false }
            return column.value != inboxColumnValue || showInbox
        }

        var storedByValue: [String: BoardColumn] = [:]
        for column in stored where storedByValue[column.value] == nil {
            storedByValue[column.value] = column
        }
        var queue = shownOrder.map { value in
            storedByValue[value] ?? BoardColumn(value: value, fields: ["id": .string(makeColumnId())])
        }[...]

        var result: [BoardColumn] = []
        var used = Set<String>()
        for column in stored {
            if !isShown(column) {
                guard used.insert(column.value).inserted else { continue }
                result.append(column)
            } else if let next = queue.popFirst() {
                guard used.insert(next.value).inserted else { continue }
                result.append(next)
            }
        }
        for column in queue where used.insert(column.value).inserted {
            result.append(column)
        }
        return result
    }

    /// Random column id in the character set Trilium's own ids use.
    static func makeColumnId() -> String {
        let alphabet = Array("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
        return String((0..<12).map { _ in alphabet.randomElement()! })
    }

    /// Reads the group-by label/relation value from a note's attributes.
    static func columnValue(from attributes: [AttributeItem], groupByName: String) -> String? {
        if let label = attributes.first(where: {
            $0.type == .label && $0.name.caseInsensitiveCompare(groupByName) == .orderedSame
        }) {
            let v = label.value.trimmingCharacters(in: .whitespacesAndNewlines)
            return v.isEmpty ? nil : v
        }
        if let relation = attributes.first(where: {
            $0.type == .relation && $0.name.caseInsensitiveCompare(groupByName) == .orderedSame
        }) {
            let v = relation.value.trimmingCharacters(in: .whitespacesAndNewlines)
            return v.isEmpty ? nil : v
        }
        return nil
    }

    /// A relation grouping reads relations only; a label grouping keeps the label-then-relation lookup.
    static func columnValue(from attributes: [AttributeItem], groupBy: GroupBy) -> String? {
        guard groupBy.isRelation else {
            return columnValue(from: attributes, groupByName: groupBy.name)
        }
        let relation = attributes.first {
            $0.type == .relation && $0.name.caseInsensitiveCompare(groupBy.name) == .orderedSame
        }
        let value = relation?.value.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        return value.isEmpty ? nil : value
    }

    /// `#board:showInbox` is a boolean label: present and not `false`.
    static func showsInbox(_ attributes: [AttributeItem]) -> Bool {
        guard let label = attributes.first(where: {
            $0.type == .label && $0.name.caseInsensitiveCompare(showInboxLabel) == .orderedSame
        }) else { return false }
        return label.value.trimmingCharacters(in: .whitespacesAndNewlines).lowercased() != "false"
    }
}
