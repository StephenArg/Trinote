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

        var id: String { noteId }
    }

    struct Column: Identifiable, Equatable, Sendable {
        let value: String
        var cards: [Card]
        /// Header text when it differs from `value`: the inbox's name, or a relation target's note title.
        var title: String?

        init(value: String, cards: [Card], title: String? = nil) {
            self.value = value
            self.cards = cards
            self.title = title
        }

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
    static func buildColumns(storedColumns: [BoardColumn]?, cards: [Card], showInbox: Bool = false) -> [Column] {
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

        return ordered.map { entry in
            Column(value: entry.value, cards: buckets[entry.value] ?? [], title: entry.title)
        }
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
