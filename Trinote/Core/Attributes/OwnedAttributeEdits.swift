import Foundation

/// An attribute as the Attributes sheet edits it: what `PUT /api/notes/:id/attributes` takes for one row.
struct AttributeDraft: Equatable, Sendable {
    var type: AttributeItem.AttributeKind
    var name: String
    var value: String
    var isInheritable: Bool

    init(type: AttributeItem.AttributeKind, name: String, value: String = "", isInheritable: Bool = false) {
        self.type = type
        self.name = name
        self.value = value
        self.isInheritable = isInheritable
    }

    init(_ attribute: AttributeItem) {
        self.init(type: attribute.type, name: attribute.name, value: attribute.value, isInheritable: attribute.isInheritable)
    }

    var update: OwnedAttributeUpdate {
        OwnedAttributeUpdate(type: type.rawValue, name: name, value: value, isInheritable: isInheritable)
    }
}

/// One change to a note's own attributes.
enum OwnedAttributeEdit: Equatable, Sendable {
    case add(AttributeDraft)
    case update(attributeId: String, AttributeDraft)
    case delete(attributeId: String)
    /// To `index` among the attributes the sheet lists (auto-link ones aren't listed).
    case move(attributeId: String, toIndex: Int)
}

/// Desktop's attribute editor saves the note's whole list of own attributes. The app does the same, but applies each
/// change to a copy of the list fetched just before saving, by attribute id, so an attribute added or changed on
/// another device in the meantime isn't lost.
enum OwnedAttributeEdits {
    enum Failure: Error, Equatable {
        /// The attribute being changed is gone (deleted or re-created on another device).
        case changedElsewhere
    }

    /// The list to send for `edit`, from the note's current own attributes. Attributes Trilium keeps in step with the
    /// content (`internalLink`, …) are left out: the server keeps them whatever the list says.
    static func apply(_ edit: OwnedAttributeEdit, to current: [AttributeItem]) throws -> [OwnedAttributeUpdate] {
        var rows: [(id: String?, draft: AttributeDraft)] = editable(current).map { ($0.attributeId, AttributeDraft($0)) }
        switch edit {
        case .add(let draft):
            rows.append((nil, draft))
        case .update(let attributeId, let draft):
            guard let index = rows.firstIndex(where: { $0.id == attributeId }) else { throw Failure.changedElsewhere }
            rows[index].draft = draft
        case .delete(let attributeId):
            guard let index = rows.firstIndex(where: { $0.id == attributeId }) else { throw Failure.changedElsewhere }
            rows.remove(at: index)
        case .move(let attributeId, let toIndex):
            guard let index = rows.firstIndex(where: { $0.id == attributeId }) else { throw Failure.changedElsewhere }
            let row = rows.remove(at: index)
            rows.insert(row, at: min(max(toIndex, 0), rows.count))
        }
        return rows.map(\.draft.update)
    }

    /// The attributes the sheet lists and edits, in position order.
    static func editable(_ attributes: [AttributeItem]) -> [AttributeItem] {
        attributes
            .filter { !AttributeNames.isAutoLink(type: $0.type, name: $0.name) }
            .sorted { $0.position < $1.position }
    }
}
