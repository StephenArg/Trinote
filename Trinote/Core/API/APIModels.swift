import Foundation

// MARK: - Auth

struct LoginRequest: Encodable {
    let password: String
    let tokenName: String?
}

struct LoginResponse: Decodable {
    let authToken: String
}

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
    let dateCreated: String
    let dateModified: String
    let utcDateCreated: String
    let utcDateModified: String
    let parentNoteIds: [String]
    let childNoteIds: [String]
    let parentBranchIds: [String]
    let childBranchIds: [String]
    let attributes: [AttributeResponse]
}

// MARK: - Branch

struct BranchResponse: Decodable {
    let branchId: String
    let noteId: String
    let parentNoteId: String
    let prefix: String?
    let notePosition: Int
    let isExpanded: Bool
    let utcDateModified: String
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
    let utcDateModified: String
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
