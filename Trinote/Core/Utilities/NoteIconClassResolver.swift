import Foundation

/// Resolves the effective Trilium `#iconClass` for display, including template and inheritable labels.
enum NoteIconClassResolver {

    /// The icon Trilium draws a text note with when it has no icon of its own, read off its labels (`getNoteIcon` in
    /// Trilium's `packages/commons/src/lib/notes.ts`). Since v0.106 a note placed on a geo map is the pin
    /// (`#geolocation`) or the shape it draws (`#geoShape`), a place outranking the folder icon. Since v0.107 a note
    /// the web clipper or the share target made shows its `#clipType` (migration 241 deletes the globe `#iconClass`
    /// the clipper used to write).
    static func defaultIconClass(isTextNote: Bool, labelValue: (String) -> String?) -> String? {
        guard isTextNote else { return nil }
        if let location = labelValue("geolocation"), !location.trimmingCharacters(in: .whitespaces).isEmpty {
            return "bx bx-pin"
        }
        if let shape = labelValue("geoShape"), !shape.trimmingCharacters(in: .whitespaces).isEmpty {
            switch shape.split(separator: ":", maxSplits: 1).first.map(String.init) {
            case "polygon": return "bx bx-shape-polygon"
            case "circle": return "bx bx-shape-circle"
            default: return "bx bx-vector"
            }
        }
        return labelValue("clipType").flatMap { clipTypeIconClasses[$0] }
    }

    /// A clipping's icon by its `#clipType` (Trilium's `CLIP_TYPE_ICONS`).
    static let clipTypeIconClasses: [String: String] = [
        "clippings": "bx bx-paperclip",
        "page": "bx bx-globe",
        "note": "bx bx-bookmark",
        "tabs": "bx bx-window-alt",
        "share": "bx bx-share"
    ]

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
