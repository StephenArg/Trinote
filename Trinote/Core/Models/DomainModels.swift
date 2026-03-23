import Foundation

/// In-memory value types for UI consumption, mapped from API responses.
/// These are separate from SwiftData cache models and API response models.

struct NoteItem: Identifiable, Hashable, Sendable {
    let noteId: String
    var title: String
    let type: NoteType
    let mime: String
    let isProtected: Bool
    let dateCreated: String
    let dateModified: String
    let parentNoteIds: [String]
    let childNoteIds: [String]
    let parentBranchIds: [String]
    let childBranchIds: [String]
    let attributes: [AttributeItem]

    var id: String { noteId }
    var hasChildren: Bool { !childNoteIds.isEmpty }
    var isRoot: Bool { noteId == "root" }

    var iconClass: String? {
        attributes.first { $0.type == .label && $0.name == "iconClass" }?.value
    }

    /// SF Symbol name: uses custom Trilium icon if set, otherwise falls back to note type default.
    var resolvedIconName: String {
        NoteIconMapper.sfSymbol(for: iconClass) ?? type.iconName
    }

    var sortableTitle: String { title.lowercased() }
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
/// Hashable is identity-based (branchId only) to avoid deep recursion.
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
            && lhs.children?.map(\.id) == rhs.children?.map(\.id)
    }
}

extension TreeNode: Hashable {
    func hash(into hasher: inout Hasher) {
        hasher.combine(branch.branchId)
    }
}

struct BreadcrumbItem: Identifiable, Hashable, Sendable {
    let noteId: String
    let title: String
    let branchId: String?

    var id: String { branchId ?? noteId }
}
