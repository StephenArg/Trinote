import Foundation

/// The notes a geo map draws, chosen as Trilium's web map chooses them (`useNoteIds` in `NoteList.tsx`, then
/// `FNote.getSubtreeNoteIds`): the map's whole subtree, so places kept in folders under the map show too, not only
/// its direct children.
enum GeoMapSubtree {
    /// Most notes a map reads from its subtree, so a huge tree under a map can't stall it.
    static let noteLimit = 5000

    /// The map's labels that shape the walk.
    struct Options: Equatable, Sendable {
        /// `#includeArchived`: archived notes, and the notes under them, count too.
        var includeArchived = false
        /// `#maxNestingDepth` as Trilium reads it for a map: 0 is the direct children only, n goes n levels below
        /// them, and a negative or missing value has no limit.
        var maxDepth = -1

        /// Whether notes at `depth` (0 for the map's own children) have their children walked too.
        func descends(below depth: Int) -> Bool {
            maxDepth < 0 || depth < maxDepth
        }
    }

    /// The map's descendants in Trilium's order, depth first: a folder, then what is in it, then its next sibling.
    /// A note cloned into several places under the map counts once, where it is first met. An archived note is
    /// left out with everything under it unless `options.includeArchived`.
    /// - Parameters:
    ///   - children: a note's children in tree order (the map's own for `mapNoteId`), or `nil` for a note that
    ///     wasn't loaded, which is then left out.
    ///   - isArchived: Trilium's `isArchived`, which counts an inherited `#archived` too.
    static func noteIds(
        mapNoteId: String,
        options: Options,
        limit: Int = noteLimit,
        children: (String) -> [String]?,
        isArchived: (String) -> Bool
    ) -> [String] {
        guard let top = children(mapNoteId) else { return [] }
        var seen: Set<String> = [mapNoteId]
        var result: [String] = []
        var stack: [(id: String, depth: Int)] = top.reversed().map { ($0, 0) }
        while result.count < limit, let (id, depth) = stack.popLast() {
            guard seen.insert(id).inserted, let below = children(id) else { continue }
            if !options.includeArchived && isArchived(id) { continue }
            result.append(id)
            if options.descends(below: depth) {
                stack.append(contentsOf: below.reversed().map { ($0, depth + 1) })
            }
        }
        return result
    }
}
