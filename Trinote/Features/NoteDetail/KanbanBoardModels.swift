import Foundation

/// Pure models / parsers for Trilium Kanban boards (`#viewType=board`).
enum KanbanBoardModels {
    static let boardConfigAttachmentTitle = "board.json"
    static let defaultGroupByAttribute = "status"

    struct BoardConfig: Codable, Equatable, Sendable {
        var columns: [BoardColumn]?
    }

    struct BoardColumn: Codable, Equatable, Sendable, Hashable {
        var value: String
    }

    struct Card: Identifiable, Equatable, Sendable, Hashable {
        let noteId: String
        let branchId: String
        let title: String
        let columnValue: String
        let notePosition: Int

        var id: String { noteId }
    }

    struct Column: Identifiable, Equatable, Sendable {
        let value: String
        var cards: [Card]

        var id: String { value }
    }

    /// Strips a leading `#` or `~` from `#board:groupBy` values (Trilium accepts both).
    static func normalizedGroupByAttributeName(_ raw: String?) -> String {
        guard let raw else { return defaultGroupByAttribute }
        var name = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        if name.hasPrefix("#") || name.hasPrefix("~") {
            name.removeFirst()
        }
        name = name.trimmingCharacters(in: .whitespacesAndNewlines)
        return name.isEmpty ? defaultGroupByAttribute : name
    }

    static func decodeBoardConfig(from data: Data) -> BoardConfig? {
        try? JSONDecoder().decode(BoardConfig.self, from: data)
    }

    static func encodeBoardConfig(_ config: BoardConfig) throws -> Data {
        try JSONEncoder().encode(config)
    }

    /// Merges `board.json` column order (including empty columns) with cards discovered via the group-by attribute.
    static func buildColumns(config: BoardConfig?, cards: [Card]) -> [Column] {
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

        var orderedValues: [String] = []
        var seen = Set<String>()
        for col in config?.columns ?? [] {
            let value = col.value.trimmingCharacters(in: .whitespacesAndNewlines)
            guard !value.isEmpty, seen.insert(value).inserted else { continue }
            orderedValues.append(value)
        }
        let discovered = buckets.keys.sorted { $0.localizedCaseInsensitiveCompare($1) == .orderedAscending }
        for value in discovered where seen.insert(value).inserted {
            orderedValues.append(value)
        }

        return orderedValues.map { value in
            Column(value: value, cards: buckets[value] ?? [])
        }
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
}
