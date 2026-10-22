import Foundation

/// A note's effective attributes, worked out the way Trilium does (`BNote.__getAttributes` in
/// `packages/trilium-core/src/becca/entities/bnote.ts`):
/// - the note's own attributes;
/// - each parent's inheritable attributes, recursively (root and `_hidden` don't inherit);
/// - every attribute of the notes those attributes point at with `~template` / `~inherit`, without the
///   templates' own `#template` / `#workspacetemplate` markers.
///
/// Read from two lookups, so it runs on a `tree/load` response (online) or on the device cache (offline).
/// Results are memoized per note for the life of the resolver, as Trilium caches them per note.
final class TriliumAttributeInheritance {
    /// A note's own attributes, ordered by position.
    private let ownedAttributes: (String) -> [AttributeItem]
    private let parentNoteIds: (String) -> [String]
    private var cache: [String: (all: [AttributeItem], inheritable: [AttributeItem])] = [:]

    init(
        ownedAttributes: @escaping (String) -> [AttributeItem],
        parentNoteIds: @escaping (String) -> [String]
    ) {
        self.ownedAttributes = ownedAttributes
        self.parentNoteIds = parentNoteIds
    }

    /// Own attributes first, then inherited and template ones, each once.
    func effectiveAttributes(of noteId: String) -> [AttributeItem] {
        attributes(of: noteId, path: [])
    }

    /// The effective attributes that belong to other notes (parents, ancestors, templates).
    func inheritedAttributes(of noteId: String) -> [AttributeItem] {
        effectiveAttributes(of: noteId).filter { $0.noteId != noteId }
    }

    private func attributes(of noteId: String, path: [String]) -> [AttributeItem] {
        // A note already on the path is a cycle (clone or template loop): it adds nothing.
        if path.contains(noteId) { return [] }
        if let cached = cache[noteId] { return cached.all }

        var parentAttributes = ownedAttributes(noteId)
        let newPath = path + [noteId]
        // Inheritable attributes on root aren't meant for the hidden subtree (Trilium #3537).
        if noteId != "root", noteId != "_hidden" {
            for parentId in parentNoteIds(noteId) {
                parentAttributes += inheritableAttributes(of: parentId, path: newPath)
            }
        }

        var templateAttributes: [AttributeItem] = []
        // Inherited `~template`s count too, which is why this reads `parentAttributes`.
        for attribute in parentAttributes
        where attribute.type == .relation && (attribute.name == "template" || attribute.name == "inherit") {
            templateAttributes += attributes(of: attribute.value, path: newPath).filter {
                !($0.type == .label && ($0.name == "template" || $0.name == "workspacetemplate"))
            }
        }

        var seen = Set<String>()
        let all = (parentAttributes + templateAttributes).filter { seen.insert($0.attributeId).inserted }
        cache[noteId] = (all, all.filter(\.isInheritable))
        return all
    }

    private func inheritableAttributes(of noteId: String, path: [String]) -> [AttributeItem] {
        if path.contains(noteId) { return [] }
        if cache[noteId] == nil {
            _ = attributes(of: noteId, path: path)
        }
        return cache[noteId]?.inheritable ?? []
    }
}

extension TriliumAttributeInheritance {
    /// The attributes `noteId` inherits, from the notes the device has cached: its ancestors and the templates they
    /// point at, read up front. Templates in Trilium's `_hidden` subtree aren't synced, so what they define is
    /// missing offline.
    @MainActor
    static func cachedInheritedAttributes(
        of noteId: String,
        serverProfileId: String,
        persistence: PersistenceManager = .shared
    ) -> [AttributeItem] {
        var owned: [String: [AttributeItem]] = [:]
        var parents: [String: [String]] = [:]
        var pending = [noteId]
        while let id = pending.popLast() {
            guard owned[id] == nil else { continue }
            let attributes = ((try? persistence.fetchCachedAttributes(noteId: id, serverProfileId: serverProfileId)) ?? [])
                .map {
                    AttributeItem(
                        attributeId: $0.attributeId,
                        noteId: $0.noteId,
                        type: AttributeItem.AttributeKind(rawValue: $0.type) ?? .label,
                        name: $0.name,
                        value: $0.value,
                        position: $0.position,
                        isInheritable: $0.isInheritable
                    )
                }
            owned[id] = attributes
            let parentIds = (try? persistence.fetchCachedNote(id: id, serverProfileId: serverProfileId))?.parentNoteIds ?? []
            parents[id] = parentIds
            if id != "root", id != "_hidden" {
                pending += parentIds
            }
            pending += attributes
                .filter { $0.type == .relation && ($0.name == "template" || $0.name == "inherit") }
                .map(\.value)
        }
        return TriliumAttributeInheritance(
            ownedAttributes: { owned[$0] ?? [] },
            parentNoteIds: { parents[$0] ?? [] }
        ).inheritedAttributes(of: noteId)
    }
}
