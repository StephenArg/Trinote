import Foundation

/// One field of a note's promoted attributes.
struct PromotedAttributeCell: Identifiable, Equatable, Sendable {
    /// The `#label:<name>` / `#relation:<name>` label defining the field; often a parent's or template's.
    let definitionAttribute: AttributeItem
    let definition: PromotedAttributeDefinition
    /// What the field holds: a label or a relation, and its name.
    let type: AttributeItem.AttributeKind
    let name: String
    /// The note's own attribute holding the value; `nil` for an empty field (or a field holding a set).
    let valueAttribute: AttributeItem?
    /// Every value, for a definition allowing several (`multi`); empty otherwise.
    let values: [String]
    /// The field's place among fields from the same definition.
    let index: Int

    var id: String { "\(definitionAttribute.attributeId):\(index)" }
    var isMulti: Bool { definition.multiplicity == .multi }
    var title: String { definition.promotedAlias ?? name }
    var labelType: TriliumLabelType { definition.labelType ?? .text }
    var value: String { valueAttribute?.value ?? "" }
}

/// The fields a note's promoted definitions ask for, as desktop builds them (`buildPromotedCells` and
/// `getPromotedDefinitionAttributes` in `apps/client/src/widgets/PromotedAttributes.tsx` and `entities/fnote.ts`).
enum PromotedAttributeCells {
    static func cells(for note: NoteItem) -> [PromotedAttributeCell] {
        let own = note.attributes.sorted { $0.position < $1.position }
        let effective = own + note.inheritedAttributes
        if isTruthyLabel("hidePromotedAttributes", in: effective) || labelValue("viewType", in: effective) == "table" {
            return []
        }

        // The first definition of each name counts, own before inherited.
        var seen = Set<String>()
        var definitions: [(attribute: AttributeItem, parsed: PromotedAttributeDefinition)] = []
        for attribute in effective where attribute.type == .label
            && AttributeNames.definedAttribute(byDefinitionName: attribute.name) != nil
            && seen.insert(attribute.name).inserted {
            let parsed = PromotedAttributeDefinition(parsing: attribute.value)
            if parsed.isPromoted {
                definitions.append((attribute, parsed))
            }
        }
        // Inherited definitions stay grouped by the note they come from (Trilium #3761).
        definitions.sort { lhs, rhs in
            lhs.attribute.noteId == rhs.attribute.noteId
                ? lhs.attribute.position < rhs.attribute.position
                : lhs.attribute.noteId < rhs.attribute.noteId
        }

        var cells: [PromotedAttributeCell] = []
        for (definitionAttribute, parsed) in definitions {
            guard let defined = AttributeNames.definedAttribute(byDefinitionName: definitionAttribute.name) else { continue }
            let held = own.filter { $0.type == defined.type && $0.name == defined.name }
            if parsed.multiplicity == .multi {
                cells.append(PromotedAttributeCell(
                    definitionAttribute: definitionAttribute,
                    definition: parsed,
                    type: defined.type,
                    name: defined.name,
                    valueAttribute: nil,
                    values: held.map(\.value).filter { !$0.isEmpty },
                    index: 0
                ))
                continue
            }
            // As on desktop, a definition that names no multiplicity shows every value the note holds.
            var valueAttributes: [AttributeItem?] = held.isEmpty ? [nil] : held
            if parsed.multiplicity == .single {
                valueAttributes = Array(valueAttributes.prefix(1))
            }
            for (index, valueAttribute) in valueAttributes.enumerated() {
                cells.append(PromotedAttributeCell(
                    definitionAttribute: definitionAttribute,
                    definition: parsed,
                    type: defined.type,
                    name: defined.name,
                    valueAttribute: valueAttribute,
                    values: [],
                    index: index
                ))
            }
        }
        return cells
    }

    /// Trilium's `isLabelTruthy`: the label is there and isn't `false`.
    private static func isTruthyLabel(_ name: String, in attributes: [AttributeItem]) -> Bool {
        guard let label = attributes.first(where: { $0.type == .label && $0.name == name }) else { return false }
        return label.value != "false"
    }

    private static func labelValue(_ name: String, in attributes: [AttributeItem]) -> String? {
        attributes.first { $0.type == .label && $0.name == name }?.value
    }

    /// The writes that make the note hold exactly `values` under `name`, as desktop's `setAttributeValues` does: each
    /// position updated in place (or created), then the spare attributes deleted.
    static func valueWrites(
        type: AttributeItem.AttributeKind,
        name: String,
        values: [String],
        existing: [AttributeItem]
    ) -> (updates: [(attributeId: String?, value: String)], deletions: [String]) {
        let held = existing
            .filter { $0.type == type && $0.name == name }
            .sorted { $0.position < $1.position }
        var updates: [(attributeId: String?, value: String)] = []
        for (index, value) in values.enumerated() {
            let current = index < held.count ? held[index] : nil
            if current?.value == value { continue }
            updates.append((current?.attributeId, value))
        }
        let deletions = held.count > values.count ? held[values.count...].map(\.attributeId) : []
        return (updates, deletions)
    }
}
