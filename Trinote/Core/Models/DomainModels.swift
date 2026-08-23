import Foundation

/// In-memory value types for UI consumption, mapped from API responses.
/// These are separate from SwiftData cache models and API response models.

struct NoteItem: Identifiable, Hashable, Sendable {
    let noteId: String
    var title: String
    let type: NoteType
    var mime: String
    let isProtected: Bool
    let dateCreated: String
    let dateModified: String
    let parentNoteIds: [String]
    let childNoteIds: [String]
    let parentBranchIds: [String]
    let childBranchIds: [String]
    let attributes: [AttributeItem]

    var id: String { noteId }
    /// Branch placements are canonical; `childNoteIds` alone can be stale after a server delete until reconcile runs.
    var hasChildren: Bool { !childBranchIds.isEmpty }
    var isRoot: Bool { noteId == "root" }

    var iconClass: String? {
        attributes.first { $0.type == .label && $0.name == "iconClass" }?.value
    }

    /// Raw value of Trilium’s `#color` label (tree / links), if present.
    var colorLabelValue: String? {
        guard let raw = attributes.first(where: {
            $0.type == .label && $0.name.caseInsensitiveCompare("color") == .orderedSame
        })?.value else { return nil }
        let t = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        return t.isEmpty ? nil : t
    }

    /// Trilium `#iconClass` label when present on this note (may be empty or `bx bx-empty`).
    var resolvedIconClass: String? {
        BoxiconsResolver.usableIconClass(from: iconClass)
    }

    var sortableTitle: String { title.lowercased() }

    /// True when this note is a Trilium Journal / calendar root (has `#calendarRoot` label).
    var isCalendarRoot: Bool {
        attributes.contains { $0.type == .label && $0.name == "calendarRoot" }
    }

    /// Value of the `#dateNote` label (e.g. "2026-04-01"), if present.
    var dateNoteValue: String? {
        attributes.first { $0.type == .label && $0.name == "dateNote" }?.value
    }

    /// Value of the `#yearNote` label (e.g. "2026"), if present.
    var yearNoteValue: String? {
        attributes.first { $0.type == .label && $0.name == "yearNote" }?.value
    }

    /// Value of the `#monthNote` label (e.g. "2026-04"), if present.
    var monthNoteValue: String? {
        attributes.first { $0.type == .label && $0.name == "monthNote" }?.value
    }

    /// Trilium `#viewType` label (e.g. `geoMap`, `calendar`, `list`).
    var viewTypeLabelValue: String? {
        guard let raw = attributes.first(where: {
            $0.type == .label && $0.name.caseInsensitiveCompare("viewType") == .orderedSame
        })?.value else { return nil }
        let t = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        return t.isEmpty ? nil : t
    }

    /// Target of `~template` relation (note id or title), if present.
    var templateRelationValue: String? {
        guard let raw = attributes.first(where: {
            $0.type == .relation && $0.name == "template"
        })?.value else { return nil }
        let t = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        return t.isEmpty ? nil : t
    }

    /// True when the `~template` relation points at the built-in geo map template.
    /// Server may store the type as `book`, `geoMap`, or even `file`; the template is the reliable indicator.
    private var hasGeoMapTemplateRelation: Bool {
        guard let v = templateRelationValue else { return false }
        return v.caseInsensitiveCompare("_template_geo_map") == .orderedSame
    }

    /// True when `~template` targets a Trilium built-in **Note List** / collection presentation (list, grid, table, …).
    /// These notes are often `type: book` with **no** `#collection` label; the template relation is the reliable signal (e.g. `_template_list_view`).
    /// Kanban (`_template_board`) and Presentation (`_template_presentation`) are excluded — they have dedicated semantic overlays.
    private var hasTriliumNoteListCollectionTemplateRelation: Bool {
        guard let raw = templateRelationValue else { return false }
        let v = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        if v.isEmpty { return false }
        let lower = v.lowercased()
        if lower == "_template_geo_map" || lower == "_template_board" || lower == "_template_presentation" {
            return false
        }
        let known: Set<String> = [
            "_template_list_view",
            "_template_grid_view",
            "_template_table",
        ]
        if known.contains(lower) { return true }
        // Forward-compatible: `_template_<name>_view` for note-list style templates (never geo: `_template_geo_map` ends with `_map`).
        if lower.hasPrefix("_template_"), lower.hasSuffix("_view"), !lower.contains("geo") {
            return true
        }
        return false
    }

    /// True when the `~template` relation points at the built-in Kanban Board template (`_template_board`).
    private var hasKanbanTemplateRelation: Bool {
        guard let v = templateRelationValue else { return false }
        return v.caseInsensitiveCompare("_template_board") == .orderedSame
    }

    /// True when the `~template` relation points at the built-in Presentation template.
    private var hasPresentationTemplateRelation: Bool {
        guard let v = templateRelationValue else { return false }
        return v.caseInsensitiveCompare("_template_presentation") == .orderedSame
    }

    /// True when this note should use geo map UI:
    /// - native `geoMap` type, OR
    /// - `book` + `#viewType=geoMap`, OR
    /// - any non-calendar note with `~template=_template_geo_map`
    var isSemanticGeoMap: Bool {
        if type == .geoMap { return true }
        if isCalendarRoot { return false }
        if (type == .book || type == .collection), let v = viewTypeLabelValue, v.caseInsensitiveCompare("geoMap") == .orderedSame {
            return true
        }
        return hasGeoMapTemplateRelation
    }

    /// True when this note should use Kanban Board UI:
    /// - client-only `kanban` type, OR
    /// - `book`/`collection` + `#viewType=board`, OR
    /// - (no `#viewType`) `~template=_template_board`
    ///
    /// `#viewType` is authoritative: any other view type (including `presentation`) is never kanban,
    /// even if a board template relation is somehow also present.
    var isSemanticKanban: Bool {
        if type == .kanban { return true }
        if isCalendarRoot { return false }
        if isSemanticGeoMap { return false }
        guard type == .book || type == .collection else { return false }
        if let v = viewTypeLabelValue {
            return v.caseInsensitiveCompare("board") == .orderedSame
        }
        if hasPresentationTemplateRelation { return false }
        return hasKanbanTemplateRelation
    }

    /// True when this note should use Presentation UI:
    /// - client-only `presentation` type, OR
    /// - `book`/`collection` + `#viewType=presentation`, OR
    /// - (no `#viewType`) `~template=_template_presentation`
    ///
    /// `#viewType` is authoritative and checked independently of `isSemanticKanban` so a mistaken
    /// board template relation cannot hide a presentation.
    var isSemanticPresentation: Bool {
        if type == .presentation { return true }
        if isCalendarRoot { return false }
        if isSemanticGeoMap { return false }
        guard type == .book || type == .collection else { return false }
        if let v = viewTypeLabelValue {
            return v.caseInsensitiveCompare("presentation") == .orderedSame
        }
        if hasKanbanTemplateRelation { return false }
        return hasPresentationTemplateRelation
    }

    /// True when Trilium marks this note as a Collection container (`type: collection`, `#collection` on `book`, or built-in list/grid/table `~template` on `book`).
    /// Excludes geo maps, journal calendar roots, kanban boards, and presentations (they have dedicated UIs).
    var isTriliumCollectionNote: Bool {
        if type == .collection {
            if isCalendarRoot { return false }
            if isSemanticGeoMap { return false }
            if isSemanticKanban { return false }
            if isSemanticPresentation { return false }
            return true
        }
        guard type == .book else { return false }
        if isCalendarRoot { return false }
        if isSemanticGeoMap { return false }
        if isSemanticKanban { return false }
        if isSemanticPresentation { return false }
        return hasTriliumCollectionAttributeLabel || hasTriliumNoteListCollectionTemplateRelation
    }

    private var hasTriliumCollectionAttributeLabel: Bool {
        attributes.contains { $0.type == .label && $0.name.caseInsensitiveCompare("collection") == .orderedSame }
    }

    /// User-facing type string for tree accessibility and metadata (maps semantic overlays over raw `book`).
    var uiNoteTypeDisplayName: String {
        if isSemanticGeoMap { return NoteType.geoMap.displayName }
        if isSemanticPresentation { return NoteType.presentation.displayName }
        if isSemanticKanban { return NoteType.kanban.displayName }
        if isTriliumCollectionNote {
            return String(localized: "Collection", comment: "Note type: Trilium collection container")
        }
        return type.displayName
    }
}

extension NoteItem {
    init(from response: NoteResponse) {
        self.noteId = response.noteId
        self.title = response.title
        self.type = NoteType(rawValue: response.type) ?? .text
        self.mime = response.mime
        self.isProtected = response.isProtected
        self.dateCreated = response.dateCreated
        self.dateModified = response.dateModified
        self.parentNoteIds = response.parentNoteIds
        self.childNoteIds = response.childNoteIds
        self.parentBranchIds = response.parentBranchIds
        self.childBranchIds = response.childBranchIds
        self.attributes = response.attributes.map(AttributeItem.init)
    }

    /// Shown in lists when the document-password session is locked but SwiftData still has a decrypted title from a prior session.
    static let protectedTitlePlaceholder = String(localized: "Protected note", comment: "Title placeholder for protected notes when locked")

    /// Returns a copy with Trilium `#color` replaced (removed when `nil` or empty).
    func replacingColorLabel(_ colorLabel: String?) -> NoteItem {
        let normalized = TriliumNoteColorMapper.canonicalColorLabel(from: colorLabel)
        let filtered = attributes.filter {
            !($0.type == .label && $0.name.caseInsensitiveCompare("color") == .orderedSame)
        }
        let nextAttributes: [AttributeItem]
        if let normalized {
            nextAttributes = filtered + [
                AttributeItem(
                    attributeId: "local-color-\(noteId)",
                    noteId: noteId,
                    type: .label,
                    name: "color",
                    value: normalized,
                    position: 0,
                    isInheritable: false
                ),
            ]
        } else {
            nextAttributes = filtered
        }
        return NoteItem(
            noteId: noteId,
            title: title,
            type: type,
            mime: mime,
            isProtected: isProtected,
            dateCreated: dateCreated,
            dateModified: dateModified,
            parentNoteIds: parentNoteIds,
            childNoteIds: childNoteIds,
            parentBranchIds: parentBranchIds,
            childBranchIds: childBranchIds,
            attributes: nextAttributes
        )
    }

    /// Returns a copy with `#iconClass` replaced (removed when `nil` or empty).
    func replacingIconClass(_ iconClass: String?) -> NoteItem {
        let trimmed = iconClass?.trimmingCharacters(in: .whitespacesAndNewlines)
        let normalized: String? = {
            guard let trimmed, !trimmed.isEmpty, trimmed != "bx bx-empty" else { return nil }
            return trimmed
        }()
        let filtered = attributes.filter { !($0.type == .label && $0.name == "iconClass") }
        let nextAttributes: [AttributeItem]
        if let normalized {
            nextAttributes = filtered + [
                AttributeItem(
                    attributeId: "local-iconClass-\(noteId)",
                    noteId: noteId,
                    type: .label,
                    name: "iconClass",
                    value: normalized,
                    position: 0,
                    isInheritable: false
                ),
            ]
        } else {
            nextAttributes = filtered
        }
        return NoteItem(
            noteId: noteId,
            title: title,
            type: type,
            mime: mime,
            isProtected: isProtected,
            dateCreated: dateCreated,
            dateModified: dateModified,
            parentNoteIds: parentNoteIds,
            childNoteIds: childNoteIds,
            parentBranchIds: parentBranchIds,
            childBranchIds: childBranchIds,
            attributes: nextAttributes
        )
    }

    func uiTitle(forProtectedSessionActive sessionActive: Bool) -> String {
        if isProtected, !sessionActive { return Self.protectedTitlePlaceholder }
        return title
    }

    /// For SwiftData-backed rows (recents/favorites) that only store `title` + separate `isProtected`.
    static func maskedStoredTitle(_ storedTitle: String, isProtected: Bool, protectedSessionActive: Bool) -> String {
        if isProtected, !protectedSessionActive { return protectedTitlePlaceholder }
        return storedTitle
    }
}

struct BranchItem: Identifiable, Hashable, Sendable {
    let branchId: String
    let noteId: String
    let parentNoteId: String
    let prefix: String?
    let notePosition: Int
    var isExpanded: Bool

    var id: String { branchId }
}

extension BranchItem {
    init(from response: BranchResponse) {
        self.branchId = response.branchId
        self.noteId = response.noteId
        self.parentNoteId = response.parentNoteId
        self.prefix = response.prefix
        self.notePosition = response.notePosition
        self.isExpanded = response.isExpanded
    }
}

struct AttributeItem: Identifiable, Hashable, Sendable {
    let attributeId: String
    let noteId: String
    let type: AttributeKind
    let name: String
    let value: String
    let position: Int
    let isInheritable: Bool

    var id: String { attributeId }

    enum AttributeKind: String, Codable, Sendable {
        case label
        case relation
    }
}

extension AttributeItem {
    init(from response: AttributeResponse) {
        self.attributeId = response.attributeId
        self.noteId = response.noteId
        self.type = AttributeKind(rawValue: response.type) ?? .label
        self.name = response.name
        self.value = response.value
        self.position = response.position
        self.isInheritable = response.isInheritable
    }
}

struct AttachmentItem: Identifiable, Hashable, Sendable {
    let attachmentId: String
    let ownerId: String
    let role: String
    let mime: String
    let title: String
    let position: Int
    let contentLength: Int

    var id: String { attachmentId }
    var isImage: Bool { mime.hasPrefix("image/") }
    var humanReadableSize: String { ByteCountFormatter.string(fromByteCount: Int64(contentLength), countStyle: .file) }
}

extension AttachmentItem {
    init(from response: AttachmentResponse) {
        self.attachmentId = response.attachmentId
        self.ownerId = response.ownerId
        self.role = response.role
        self.mime = response.mime
        self.title = response.title
        self.position = response.position
        self.contentLength = response.contentLength
    }
}

/// A tree node combines a note with its branch placement.
/// A single note can appear in multiple tree nodes (clones).
/// `Equatable` / `Hashable` include `note` so rows update when note metadata changes (e.g. sharing); children are compared by id only.
struct TreeNode: Identifiable, Sendable {
    let branch: BranchItem
    let note: NoteItem
    var children: [TreeNode]?
    var isLoading: Bool

    var id: String { branch.branchId }
    var noteId: String { note.noteId }
    var title: String {
        if let prefix = branch.prefix, !prefix.isEmpty {
            return "\(prefix) - \(note.title)"
        }
        return note.title
    }

    /// Tree row / navigation title with protected-note masking (pass `AppState.protectedSessionActive`).
    func displayTitle(protectedSessionActive: Bool) -> String {
        let base = note.uiTitle(forProtectedSessionActive: protectedSessionActive)
        if let prefix = branch.prefix, !prefix.isEmpty {
            return "\(prefix) - \(base)"
        }
        return base
    }
    var hasChildren: Bool { note.hasChildren }
    var isExpanded: Bool { branch.isExpanded }

    init(branch: BranchItem, note: NoteItem, children: [TreeNode]? = nil, isLoading: Bool = false) {
        self.branch = branch
        self.note = note
        self.children = children
        self.isLoading = isLoading
    }
}

extension TreeNode: Equatable {
    static func == (lhs: TreeNode, rhs: TreeNode) -> Bool {
        lhs.branch.branchId == rhs.branch.branchId
            && lhs.isLoading == rhs.isLoading
            && lhs.note == rhs.note
            && lhs.children?.map(\.id) == rhs.children?.map(\.id)
    }
}

extension TreeNode: Hashable {
    func hash(into hasher: inout Hasher) {
        hasher.combine(branch.branchId)
        hasher.combine(note)
    }
}

struct BreadcrumbItem: Identifiable, Hashable, Sendable {
    let noteId: String
    let title: String
    let branchId: String?

    var id: String { branchId ?? noteId }
}

// MARK: - Trilium tree (API / ETAPI)

/// Values that match Trilium / TriliumNext’s tree and branch routes.
enum TriliumTreeConstants {
    /// Trilium’s top-level container note id.
    static let rootNoteId = "root"
    /// Branch id for the `root` note (top-level “Notes” container). Used as `move-to` parent for placing notes at top level.
    static let rootBranchId = "none_root"
    /// Max 0-based depth for inline expand/collapse on a tree page. At this depth and below,
    /// the chevron drills into a nested `TreeView` instead of expanding inline.
    static let maxInlineDepth = 2
}

/// Pure path math for revealing a note on the current tree page (no drill-down).
enum TreePathReveal {
    /// Which ancestors to expand, and which path note to scroll into view, given a path from
    /// this tree’s direct children down to the target (e.g. `[C1, C2, C3, C4]`).
    static func ancestorsToExpandAndRevealNoteId(
        pathFromTreeChildrenToTarget: [String],
        maxInlineDepth: Int = TriliumTreeConstants.maxInlineDepth
    ) -> (expandNoteIds: [String], revealNoteId: String?) {
        guard !pathFromTreeChildrenToTarget.isEmpty else {
            return ([], nil)
        }
        let expandCount = min(pathFromTreeChildrenToTarget.count - 1, maxInlineDepth)
        let expandNoteIds = Array(pathFromTreeChildrenToTarget.prefix(expandCount))
        let revealIndex = min(pathFromTreeChildrenToTarget.count, maxInlineDepth + 1) - 1
        let revealNoteId = pathFromTreeChildrenToTarget[revealIndex]
        return (expandNoteIds, revealNoteId)
    }
}
