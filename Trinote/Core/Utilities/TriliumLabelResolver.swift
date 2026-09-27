import Foundation

/// Finds a note's effective label the way Trilium's client does (`FNote.__getCachedAttributes`): the note's own
/// labels, then the inheritable ones of each parent (which carry their ancestors' and templates' in turn), then
/// its `~template` / `~inherit` notes' labels. The first match wins. Results are remembered for the resolver's
/// lifetime, so make one per pass over the tree.
final class TriliumLabelResolver {
    struct NoteContext {
        let attributes: [AttributeItem]
        let parentNoteIds: [String]
    }

    private let context: (String) -> NoteContext?
    private let builtinTemplateLabel: (_ templateNoteId: String, _ name: String) -> String?
    private var memo: [String: String?] = [:]

    /// - Parameters:
    ///   - context: a note's own attributes and parents, or `nil` when the note is not known locally.
    ///   - builtinTemplateLabel: a built-in template's own label, for templates missing from `context`
    ///     (the hidden subtree is not cached).
    init(
        context: @escaping (String) -> NoteContext?,
        builtinTemplateLabel: @escaping (_ templateNoteId: String, _ name: String) -> String? = { _, _ in nil }
    ) {
        self.context = context
        self.builtinTemplateLabel = builtinTemplateLabel
    }

    func value(of name: String, noteId: String) -> String? {
        resolve(name, noteId: noteId, inheritableOnly: false, path: [])
    }

    /// Trilium's `isLabelTruthy`: the label is there and its value is not `false`.
    func isTruthy(_ name: String, noteId: String) -> Bool {
        guard let value = value(of: name, noteId: noteId) else { return false }
        return value != "false"
    }

    private func resolve(_ name: String, noteId: String, inheritableOnly: Bool, path: Set<String>) -> String? {
        // Notes cannot form tree cycles, but templates can point back at an ancestor.
        guard !path.contains(noteId) else { return nil }
        let key = "\(name)|\(noteId)|\(inheritableOnly)"
        if let known = memo[key] { return known }

        let result: String?
        if let note = context(noteId) {
            result = resolveKnown(name, noteId: noteId, note: note, inheritableOnly: inheritableOnly, path: path.union([noteId]))
        } else {
            // A built-in template's labels are its own (not inheritable), so they only reach its instances.
            result = inheritableOnly ? nil : builtinTemplateLabel(noteId, name)
        }
        memo[key] = result
        return result
    }

    private func resolveKnown(
        _ name: String,
        noteId: String,
        note: NoteContext,
        inheritableOnly: Bool,
        path: Set<String>
    ) -> String? {
        let ordered = note.attributes.sorted { $0.position < $1.position }
        if let own = ordered.first(where: {
            $0.type == .label && $0.name == name && (!inheritableOnly || $0.isInheritable)
        }) {
            return own.value
        }
        // Inheritable labels on root are not meant for the hidden subtree, and root has no parents anyway.
        if noteId != "root" && noteId != "_hidden" {
            for parentId in note.parentNoteIds {
                if let inherited = resolve(name, noteId: parentId, inheritableOnly: true, path: path) {
                    return inherited
                }
            }
        }
        for relation in ordered where relation.type == .relation
            && (relation.name == "template" || relation.name == "inherit")
            && relation.value != noteId {
            if let fromTemplate = resolve(name, noteId: relation.value, inheritableOnly: inheritableOnly, path: path) {
                return fromTemplate
            }
        }
        return nil
    }
}

/// Labels Trilium's built-in collection templates carry, for when the template note is not cached.
enum TriliumBuiltinTemplateLabels {
    /// `#subtreeHidden` ("Hide child notes in tree") on the built-in templates. Calendar, table and geo map show
    /// their children (`false`); the board shows them only up to Trilium v0.105 and hides them from v0.106, since
    /// its cards would repeat in the tree.
    static func value(of name: String, templateNoteId: String, boardHidesChildren: Bool) -> String? {
        guard name == "subtreeHidden" else { return nil }
        switch templateNoteId {
        case "_template_board": return boardHidesChildren ? "" : "false"
        case "_template_calendar", "_template_table", "_template_geo_map": return "false"
        default: return nil
        }
    }
}
