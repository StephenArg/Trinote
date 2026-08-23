import Foundation

/// Resolves the effective Trilium `#iconClass` for display, including template and inheritable labels.
enum NoteIconClassResolver {

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
