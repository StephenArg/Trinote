import Foundation
import SwiftData

@Model
final class CachedNote {
    @Attribute(.unique) var noteId: String
    var title: String
    var noteType: String
    var mime: String
    var isProtected: Bool
    var parentNoteIds: [String]
    var childNoteIds: [String]
    var parentBranchIds: [String]
    var childBranchIds: [String]
    @Attribute(.externalStorage) var content: Data?
    var contentFetchedAt: Date?
    var metadataFetchedAt: Date
    var utcDateModified: String?
    var serverProfileId: String

    init(
        noteId: String,
        title: String,
        noteType: String,
        mime: String,
        isProtected: Bool = false,
        parentNoteIds: [String] = [],
        childNoteIds: [String] = [],
        parentBranchIds: [String] = [],
        childBranchIds: [String] = [],
        content: Data? = nil,
        contentFetchedAt: Date? = nil,
        metadataFetchedAt: Date = .now,
        utcDateModified: String? = nil,
        serverProfileId: String
    ) {
        self.noteId = noteId
        self.title = title
        self.noteType = noteType
        self.mime = mime
        self.isProtected = isProtected
        self.parentNoteIds = parentNoteIds
        self.childNoteIds = childNoteIds
        self.parentBranchIds = parentBranchIds
        self.childBranchIds = childBranchIds
        self.content = content
        self.contentFetchedAt = contentFetchedAt
        self.metadataFetchedAt = metadataFetchedAt
        self.utcDateModified = utcDateModified
        self.serverProfileId = serverProfileId
    }

    var parsedType: NoteType? {
        NoteType(rawValue: noteType)
    }
}

@Model
final class CachedBranch {
    @Attribute(.unique) var branchId: String
    var noteId: String
    var parentNoteId: String
    var prefix: String?
    var notePosition: Int
    var isExpanded: Bool
    var serverProfileId: String
    var fetchedAt: Date

    init(
        branchId: String,
        noteId: String,
        parentNoteId: String,
        prefix: String? = nil,
        notePosition: Int = 0,
        isExpanded: Bool = false,
        serverProfileId: String,
        fetchedAt: Date = .now
    ) {
        self.branchId = branchId
        self.noteId = noteId
        self.parentNoteId = parentNoteId
        self.prefix = prefix
        self.notePosition = notePosition
        self.isExpanded = isExpanded
        self.serverProfileId = serverProfileId
        self.fetchedAt = fetchedAt
    }
}

@Model
final class CachedAttribute {
    @Attribute(.unique) var attributeId: String
    var noteId: String
    var type: String
    var name: String
    var value: String
    var position: Int
    var isInheritable: Bool
    var serverProfileId: String

    init(
        attributeId: String,
        noteId: String,
        type: String,
        name: String,
        value: String,
        position: Int = 0,
        isInheritable: Bool = false,
        serverProfileId: String
    ) {
        self.attributeId = attributeId
        self.noteId = noteId
        self.type = type
        self.name = name
        self.value = value
        self.position = position
        self.isInheritable = isInheritable
        self.serverProfileId = serverProfileId
    }
}

@Model
final class RecentNote {
    @Attribute(.unique) var id: String
    var noteId: String
    var title: String
    var noteType: String
    var accessedAt: Date
    var serverProfileId: String

    init(noteId: String, title: String, noteType: String, serverProfileId: String) {
        self.id = "\(serverProfileId):\(noteId)"
        self.noteId = noteId
        self.title = title
        self.noteType = noteType
        self.accessedAt = .now
        self.serverProfileId = serverProfileId
    }
}

@Model
final class FavoriteNote {
    @Attribute(.unique) var id: String
    var noteId: String
    var title: String
    var noteType: String
    var serverProfileId: String

    init(noteId: String, title: String, noteType: String, serverProfileId: String) {
        self.id = "\(serverProfileId):\(noteId)"
        self.noteId = noteId
        self.title = title
        self.noteType = noteType
        self.serverProfileId = serverProfileId
    }
}

@Model
final class RecentSearch {
    @Attribute(.unique) var id: String
    var query: String
    var searchedAt: Date
    var serverProfileId: String

    init(query: String, serverProfileId: String) {
        self.id = "\(serverProfileId):\(query)"
        self.query = query
        self.searchedAt = .now
        self.serverProfileId = serverProfileId
    }
}

@Model
final class DraftContent {
    @Attribute(.unique) var id: String
    var noteId: String
    var content: String
    var savedAt: Date
    var serverProfileId: String

    init(noteId: String, content: String, serverProfileId: String) {
        self.id = "\(serverProfileId):\(noteId)"
        self.noteId = noteId
        self.content = content
        self.savedAt = .now
        self.serverProfileId = serverProfileId
    }
}

@Model
final class SyncStatus {
    @Attribute(.unique) var id: String
    var domain: String
    var lastSyncedAt: Date
    var lastError: String?
    var serverProfileId: String

    init(domain: String, serverProfileId: String) {
        self.id = "\(serverProfileId):\(domain)"
        self.domain = domain
        self.lastSyncedAt = .now
        self.lastError = nil
        self.serverProfileId = serverProfileId
    }
}

@Model
final class CachedImageData {
    @Attribute(.unique) var id: String
    var entityId: String
    var entityType: String
    @Attribute(.externalStorage) var data: Data
    var mime: String
    var fetchedAt: Date
    var serverProfileId: String

    init(entityId: String, entityType: String, data: Data, mime: String, serverProfileId: String) {
        self.id = "\(serverProfileId):\(entityType):\(entityId)"
        self.entityId = entityId
        self.entityType = entityType
        self.data = data
        self.mime = mime
        self.fetchedAt = .now
        self.serverProfileId = serverProfileId
    }
}
