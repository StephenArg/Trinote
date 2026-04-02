import Foundation

// MARK: - App Info

struct AppInfoResponse: Decodable {
    let appVersion: String
    let dbVersion: Int?
    let syncVersion: Int?
    let buildDate: String?
    let buildRevision: String?
    let dataDirectory: String?
    let clipperProtocolVersion: String?
    let utcDateTime: String?
}

// MARK: - Note

struct NoteResponse: Decodable {
    let noteId: String
    let isProtected: Bool
    let title: String
    let type: String
    let mime: String
    let blobId: String?
    /// `true` when the server still returns the note row but it has been
    /// soft-deleted (branch/blob erased). Defaults to `false` when absent.
    let isDeleted: Bool
    let dateCreated: String
    let dateModified: String
    let utcDateCreated: String
    let utcDateModified: String
    let parentNoteIds: [String]
    let childNoteIds: [String]
    let parentBranchIds: [String]
    let childBranchIds: [String]
    let attributes: [AttributeResponse]

    enum CodingKeys: String, CodingKey {
        case noteId, isProtected, title, type, mime, blobId, isDeleted
        case dateCreated, dateModified, utcDateCreated, utcDateModified
        case parentNoteIds, childNoteIds, parentBranchIds, childBranchIds
        case attributes
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        noteId = try c.decode(String.self, forKey: .noteId)
        isProtected = try c.decode(Bool.self, forKey: .isProtected)
        title = try c.decode(String.self, forKey: .title)
        type = try c.decode(String.self, forKey: .type)
        mime = try c.decode(String.self, forKey: .mime)
        blobId = try c.decodeIfPresent(String.self, forKey: .blobId)
        isDeleted = (try? c.decode(Bool.self, forKey: .isDeleted)) ?? false
        dateCreated = try c.decode(String.self, forKey: .dateCreated)
        dateModified = try c.decode(String.self, forKey: .dateModified)
        utcDateCreated = try c.decode(String.self, forKey: .utcDateCreated)
        utcDateModified = try c.decode(String.self, forKey: .utcDateModified)
        parentNoteIds = try c.decode([String].self, forKey: .parentNoteIds)
        childNoteIds = try c.decode([String].self, forKey: .childNoteIds)
        parentBranchIds = try c.decode([String].self, forKey: .parentBranchIds)
        childBranchIds = try c.decode([String].self, forKey: .childBranchIds)
        attributes = try c.decode([AttributeResponse].self, forKey: .attributes)
    }

    init(noteId: String, isProtected: Bool, title: String, type: String, mime: String,
         blobId: String?, isDeleted: Bool = false, dateCreated: String, dateModified: String,
         utcDateCreated: String, utcDateModified: String,
         parentNoteIds: [String], childNoteIds: [String],
         parentBranchIds: [String], childBranchIds: [String],
         attributes: [AttributeResponse]) {
        self.noteId = noteId
        self.isProtected = isProtected
        self.title = title
        self.type = type
        self.mime = mime
        self.blobId = blobId
        self.isDeleted = isDeleted
        self.dateCreated = dateCreated
        self.dateModified = dateModified
        self.utcDateCreated = utcDateCreated
        self.utcDateModified = utcDateModified
        self.parentNoteIds = parentNoteIds
        self.childNoteIds = childNoteIds
        self.parentBranchIds = parentBranchIds
        self.childBranchIds = childBranchIds
        self.attributes = attributes
    }
}

extension NoteResponse {
    /// Builds an API-shaped note payload from a `NoteItem` so live updates (e.g. sharing toggles) can be written to SwiftData.
    init(forSwiftDataCache item: NoteItem) {
        self.init(
            noteId: item.noteId,
            isProtected: item.isProtected,
            title: item.title,
            type: item.type.rawValue,
            mime: item.mime,
            blobId: nil,
            isDeleted: false,
            dateCreated: item.dateCreated,
            dateModified: item.dateModified,
            utcDateCreated: "",
            utcDateModified: "",
            parentNoteIds: item.parentNoteIds,
            childNoteIds: item.childNoteIds,
            parentBranchIds: item.parentBranchIds,
            childBranchIds: item.childBranchIds,
            attributes: item.attributes.map { a in
                AttributeResponse(
                    attributeId: a.attributeId,
                    noteId: a.noteId,
                    type: a.type.rawValue,
                    name: a.name,
                    value: a.value,
                    position: a.position,
                    isInheritable: a.isInheritable,
                    utcDateModified: nil
                )
            }
        )
    }
}

// MARK: - Branch

struct BranchResponse: Decodable {
    let branchId: String
    let noteId: String
    let parentNoteId: String
    let prefix: String?
    let notePosition: Int
    let isExpanded: Bool
    /// Omitted in some native payloads (e.g. `/api/tree/load`).
    let utcDateModified: String?
}

struct CreateBranchRequest: Encodable {
    let noteId: String
    let parentNoteId: String
    let prefix: String?
    let notePosition: Int?
    let isExpanded: Bool?
}

struct UpdateBranchRequest: Encodable {
    let prefix: String?
    let notePosition: Int?
    let isExpanded: Bool?
}

// MARK: - Attribute

struct AttributeResponse: Decodable {
    let attributeId: String
    let noteId: String
    let type: String
    let name: String
    let value: String
    let position: Int
    let isInheritable: Bool
    let utcDateModified: String?

    enum CodingKeys: String, CodingKey {
        case attributeId, noteId, type, name, value, position, isInheritable, utcDateModified
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        attributeId = try c.decode(String.self, forKey: .attributeId)
        noteId = try c.decode(String.self, forKey: .noteId)
        type = try c.decode(String.self, forKey: .type)
        name = try c.decode(String.self, forKey: .name)
        value = (try c.decodeIfPresent(String.self, forKey: .value)) ?? ""
        position = (try c.decodeIfPresent(Int.self, forKey: .position)) ?? 0
        isInheritable = (try c.decodeIfPresent(Bool.self, forKey: .isInheritable)) ?? false
        utcDateModified = try c.decodeIfPresent(String.self, forKey: .utcDateModified)
    }

    init(
        attributeId: String,
        noteId: String,
        type: String,
        name: String,
        value: String,
        position: Int,
        isInheritable: Bool,
        utcDateModified: String?
    ) {
        self.attributeId = attributeId
        self.noteId = noteId
        self.type = type
        self.name = name
        self.value = value
        self.position = position
        self.isInheritable = isInheritable
        self.utcDateModified = utcDateModified
    }
}

struct CreateAttributeRequest: Encodable {
    let noteId: String
    let type: String
    let name: String
    let value: String
    let isInheritable: Bool?
    let position: Int?
}

// MARK: - Attachment

struct AttachmentResponse: Decodable {
    let attachmentId: String
    let ownerId: String
    let role: String
    let mime: String
    let title: String
    let position: Int
    let blobId: String?
    let dateModified: String
    let utcDateModified: String
    let utcDateScheduledForErasureSince: String?
    let contentLength: Int
}

struct CreateAttachmentRequest: Encodable {
    let ownerId: String
    let role: String
    let mime: String
    let title: String
    let content: String
    let position: Int?
}

// MARK: - Create Note

struct CreateNoteRequest: Encodable {
    let parentNoteId: String
    let title: String
    let type: String
    let mime: String?
    let content: String
    let notePosition: Int?
    let prefix: String?
    let isProtected: Bool?
    let noteId: String?
    let branchId: String?
    /// When set, the server applies the template atomically: copies content/type/mime/children
    /// and adds a `~template` relation. Matches Trilium desktop's `createNote` behaviour.
    let templateNoteId: String?
}

struct CreateNoteResponse: Decodable {
    let note: NoteResponse
    let branch: BranchResponse
}

struct UpdateNoteRequest: Encodable {
    let title: String?
    let type: String?
    let mime: String?

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encodeIfPresent(type, forKey: .type)
        try container.encodeIfPresent(mime, forKey: .mime)
    }

    enum CodingKeys: String, CodingKey {
        case title, type, mime
    }
}

// MARK: - Search

struct SearchResponse: Decodable {
    let results: [NoteResponse]
    let debugInfo: DebugInfo?

    struct DebugInfo: Decodable {
        let description: String?
    }
}

// MARK: - History

struct RecentChange: Decodable {
    let noteId: String
    let title: String
    let utcDateModified: String
}

// MARK: - Revision

struct RevisionResponse: Decodable {
    let revisionId: String
    let noteId: String
    let type: String
    let mime: String
    let isProtected: Bool
    let title: String
    let blobId: String?
    let dateLastEdited: String
    let dateCreated: String
    let utcDateLastEdited: String
    let utcDateCreated: String
    let utcDateModified: String
    let contentLength: Int
}

// MARK: - Native `/api/tree/load`

struct TreeLoadResponse: Decodable {
    let notes: [TreeLoadNoteRow]
    let branches: [TreeLoadBranchRow]
    let attributes: [TreeLoadAttributeRow]
}

struct TreeLoadNoteRow: Decodable {
    let noteId: String
    let title: String
    let isProtected: Bool
    let type: String
    let mime: String
    let blobId: String?
    let isDeleted: Bool?
}

struct TreeLoadBranchRow: Decodable {
    let branchId: String
    let noteId: String
    let parentNoteId: String
    let prefix: String?
    let notePosition: Int
    let isExpanded: Bool
    /// When present, branch is soft-deleted (Trilium often omits child rows from `notes[]` but may flag the branch).
    let isDeleted: Bool?
}

struct TreeLoadAttributeRow: Decodable {
    let attributeId: String
    let noteId: String
    let type: String
    let name: String
    let value: String
    let position: Int
    let isInheritable: Bool
}

// MARK: - Native `/api/sync/*`

/// `GET /api/sync/check` — used to read the server's max entity change ID on startup / before pull.
struct SyncCheckResponse: Decodable {
    let entityHashes: [String: [String: String]]?
    let maxEntityChangeId: Int64

    enum CodingKeys: String, CodingKey {
        case entityHashes, maxEntityChangeId
    }

    init(entityHashes: [String: [String: String]]? = nil, maxEntityChangeId: Int64 = 0) {
        self.entityHashes = entityHashes
        self.maxEntityChangeId = maxEntityChangeId
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        entityHashes = try c.decodeIfPresent([String: [String: String]].self, forKey: .entityHashes)
        maxEntityChangeId = FlexJSON.int64(from: c, key: .maxEntityChangeId)
    }
}

/// Normalized sync pull response used by `SyncManager`.
/// Parsed from `GET /api/sync/changed` whose items are
/// `{ entityChange: {...}, entity: {...} | null }`.
struct SyncPullResponse {
    struct EntityChange {
        let entityName: String
        let entityId: String
        let isErased: Bool
    }

    let entityChanges: [EntityChange]
    let maxEntityChangeId: Int64
    let outstandingPullCount: Int

    /// Entity rows grouped by entity type, extracted from each item's `entity` field.
    let notes: [[String: Any]]
    let branches: [[String: Any]]
    let attributes: [[String: Any]]
    let blobs: [[String: Any]]

    /// Parses the `GET /api/sync/changed` response format:
    /// ```
    /// { entityChanges: [{ entityChange: {…}, entity: {…} }],
    ///   lastEntityChangeId, outstandingPullCount }
    /// ```
    static func parseFromChanged(jsonData: Data) throws -> SyncPullResponse {
        let top = try JSONSerialization.jsonObject(with: jsonData) as? [String: Any]
        guard let top else {
            throw DecodingError.dataCorrupted(.init(codingPath: [], debugDescription: "sync/changed: not a JSON object"))
        }

        let maxId = FlexJSON.int64(top["lastEntityChangeId"]) ?? 0
        let outstanding = FlexJSON.int(top["outstandingPullCount"]) ?? 0

        let rawList = top["entityChanges"] as? [[String: Any]] ?? []
        var changes: [EntityChange] = []
        var notes: [[String: Any]] = []
        var branches: [[String: Any]] = []
        var attributes: [[String: Any]] = []
        var blobs: [[String: Any]] = []
        changes.reserveCapacity(rawList.count)

        for item in rawList {
            guard let ec = item["entityChange"] as? [String: Any],
                  let name = ec["entityName"] as? String,
                  let eid = FlexJSON.string(ec["entityId"])
            else { continue }

            let erased = FlexJSON.bool(ec["isErased"])
            changes.append(EntityChange(entityName: name, entityId: eid, isErased: erased))

            // Group entity data by type (nil / NSNull for erased entities).
            if !erased, let entity = item["entity"] as? [String: Any] {
                switch name {
                case "notes":       notes.append(entity)
                case "branches":    branches.append(entity)
                case "attributes":  attributes.append(entity)
                case "blobs":       blobs.append(entity)
                default: break
                }
            }
        }

        return SyncPullResponse(
            entityChanges: changes,
            maxEntityChangeId: maxId,
            outstandingPullCount: outstanding,
            notes: notes,
            branches: branches,
            attributes: attributes,
            blobs: blobs
        )
    }
}

// MARK: - Flexible JSON helpers

enum FlexJSON {
    static func string(_ any: Any?) -> String? {
        switch any {
        case let s as String where !s.isEmpty: return s
        case let n as NSNumber: return n.stringValue
        case let i as Int: return String(i)
        case let i as Int64: return String(i)
        default: return nil
        }
    }

    static func bool(_ any: Any?) -> Bool {
        switch any {
        case let b as Bool: return b
        case let n as NSNumber: return n.intValue != 0
        case let i as Int: return i != 0
        default: return false
        }
    }

    static func int(_ any: Any?) -> Int? {
        switch any {
        case let i as Int: return i
        case let n as NSNumber: return n.intValue
        case let s as String: return Int(s)
        default: return nil
        }
    }

    static func int64(_ any: Any?) -> Int64? {
        switch any {
        case let i as Int64: return i
        case let i as Int: return Int64(i)
        case let n as NSNumber: return n.int64Value
        case let s as String: return Int64(s)
        default: return nil
        }
    }

    static func int64<K: CodingKey>(from c: KeyedDecodingContainer<K>, key: K) -> Int64 {
        guard c.contains(key) else { return 0 }
        if let v = try? c.decode(Int64.self, forKey: key) { return v }
        if let v = try? c.decode(Int.self, forKey: key) { return Int64(v) }
        if let s = try? c.decode(String.self, forKey: key), let v = Int64(s) { return v }
        return 0
    }

    /// Sync / loose JSON dictionaries may use `[String]` or mixed `[Any]`.
    static func stringArray(_ any: Any?) -> [String]? {
        if let a = any as? [String] { return a }
        if let a = any as? [Any] { return a.compactMap { $0 as? String } }
        return nil
    }
}
