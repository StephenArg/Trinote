import Foundation

/// Resolves the effective Trilium `#iconClass` for display, including template and inheritable labels.
enum NoteIconClassResolver {

    /// Trilium v0.106 draws a text note placed on a geo map, when it has no icon of its own, as the pin
    /// (`#geolocation`) or the shape it draws (`#geoShape`); a place outranks the folder icon. See `getNoteIcon`
    /// in Trilium's `packages/commons/src/lib/notes.ts`.
    static func geoDefaultIconClass(isTextNote: Bool, labelValue: (String) -> String?) -> String? {
        guard isTextNote else { return nil }
        if let location = labelValue("geolocation"), !location.trimmingCharacters(in: .whitespaces).isEmpty {
            return "bx bx-pin"
        }
        guard let shape = labelValue("geoShape"), !shape.trimmingCharacters(in: .whitespaces).isEmpty else {
            return nil
        }
        switch shape.split(separator: ":", maxSplits: 1).first.map(String.init) {
        case "polygon": return "bx bx-shape-polygon"
        case "circle": return "bx bx-shape-circle"
        default: return "bx bx-vector"
        }
    }

    struct ParentNoteContext: Sendable {
        let attributes: [AttributeItem]
        let parentNoteIds: [String]
    }

    /// Own `#iconClass`, else template `#iconClass`, else the nearest inheritable `#iconClass` on an ancestor.
    static func effectiveIconClass(
        noteId: String,
        ownIconClass: String?,
        templateRelationValue: String?,
        parentNoteProvider: (String) -> ParentNoteContext?,
        templateIconClassProvider: (String) -> String?
    ) -> String? {
        if let own = BoxiconsResolver.usableIconClass(from: ownIconClass) {
            return own
        }

        if let templateTarget = templateRelationValue?.trimmingCharacters(in: .whitespacesAndNewlines),
           !templateTarget.isEmpty,
           let templateIcon = templateIconClassProvider(templateTarget) {
            return templateIcon
        }

        var visited = Set<String>([noteId])
        var queue = parentNoteProvider(noteId)?.parentNoteIds ?? []

        while let parentId = queue.first {
            queue.removeFirst()
            guard visited.insert(parentId).inserted else { continue }
            guard let parent = parentNoteProvider(parentId) else { continue }

            if let inherited = parent.attributes.first(where: {
                $0.type == .label && $0.name == "iconClass" && $0.isInheritable
            }).flatMap({ BoxiconsResolver.usableIconClass(from: $0.value) }) {
                return inherited
            }

            queue.append(contentsOf: parent.parentNoteIds)
        }

        return nil
    }
}
