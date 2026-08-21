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
    /// SF Symbol for the top-level-under-root notebook (computed when the note is opened).
    var listIconSystemName: String?

    init(noteId: String, title: String, noteType: String, serverProfileId: String, listIconSystemName: String? = nil) {
        self.id = "\(serverProfileId):\(noteId)"
        self.noteId = noteId
        self.title = title
        self.noteType = noteType
        self.accessedAt = .now
        self.serverProfileId = serverProfileId
        self.listIconSystemName = listIconSystemName
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

/// Child note created offline; flushed via `createNote` when online (ordered with `queuedAt`).
@Model
final class PendingNoteCreation {
    @Attribute(.unique) var id: String
    var serverProfileId: String
    var localNoteId: String
    var localBranchId: String
    var parentNoteId: String
    var title: String
    var noteType: String
    var mime: String
    var initialContent: String
    /// JSON array of attributes to create on the server after the note is created.
    /// Format: `[{"type":"label","name":"geolocation","value":"lat,lng"}, ...]`; optional `"isInheritable": true`.
    var initialAttributesJSON: String
    var queuedAt: Date

    init(
        id: String = UUID().uuidString,
        serverProfileId: String,
        localNoteId: String,
        localBranchId: String,
        parentNoteId: String,
        title: String,
        noteType: String,
        mime: String,
        initialContent: String,
        initialAttributesJSON: String = "[]",
        queuedAt: Date = .now
    ) {
        self.id = id
        self.serverProfileId = serverProfileId
        self.localNoteId = localNoteId
        self.localBranchId = localBranchId
        self.parentNoteId = parentNoteId
        self.title = title
        self.noteType = noteType
        self.mime = mime
        self.initialContent = initialContent
        self.initialAttributesJSON = initialAttributesJSON
        self.queuedAt = queuedAt
    }
}

/// Note body waiting for `PUT` after offline edit (CSRF/session unavailable until `restoreSession` succeeds).
@Model
final class PendingNoteBodyUpload {
    @Attribute(.unique) var id: String
    var noteId: String
    var serverProfileId: String
    @Attribute(.externalStorage) var body: Data
    var mime: String
    var queuedAt: Date
    /// Server `utcDateModified` when this offline edit was queued; used to detect remote changes before flush.
    var baseUtcDateModified: String

    init(
        noteId: String,
        serverProfileId: String,
        body: Data,
        mime: String,
        queuedAt: Date = .now,
        baseUtcDateModified: String = ""
    ) {
        self.id = "\(serverProfileId):\(noteId)"
        self.noteId = noteId
        self.serverProfileId = serverProfileId
        self.body = body
        self.mime = mime
        self.queuedAt = queuedAt
        self.baseUtcDateModified = baseUtcDateModified
    }
}

/// Title (and optional MIME) change queued while offline; flushed via `updateNote` when online.
/// One row per note (latest patch wins). `mime` is set when the code-note language was changed.
@Model
final class PendingNotePatch {
    @Attribute(.unique) var id: String
    var serverProfileId: String
    var noteId: String
    var title: String
    /// When non-nil, flush also updates the note MIME (code-language change).
    var mime: String?
    var queuedAt: Date

    init(
        serverProfileId: String,
        noteId: String,
        title: String,
        mime: String? = nil,
        queuedAt: Date = .now
    ) {
        self.id = "\(serverProfileId):\(noteId)"
        self.serverProfileId = serverProfileId
        self.noteId = noteId
        self.title = title
        self.mime = mime
        self.queuedAt = queuedAt
    }
}

/// Note deletion queued while offline; flushed via `deleteNote` when online.
@Model
final class PendingNoteDeletion {
    @Attribute(.unique) var id: String
    var serverProfileId: String
    var noteId: String
    var queuedAt: Date

    init(
        id: String = UUID().uuidString,
        serverProfileId: String,
        noteId: String,
        queuedAt: Date = .now
    ) {
        self.id = id
        self.serverProfileId = serverProfileId
        self.noteId = noteId
        self.queuedAt = queuedAt
    }
}

/// Tree move queued while offline; flushed via `moveBranchToParent` when online. One row per source branch (latest target wins).
@Model
final class PendingBranchMove {
    @Attribute(.unique) var id: String
    var serverProfileId: String
    var sourceBranchId: String
    var targetParentBranchId: String
    var sourceNoteId: String
    var oldParentNoteId: String
    var targetParentNoteId: String
    var queuedAt: Date

    init(
        id: String = UUID().uuidString,
        serverProfileId: String,
        sourceBranchId: String,
        targetParentBranchId: String,
        sourceNoteId: String,
        oldParentNoteId: String,
        targetParentNoteId: String,
        queuedAt: Date = .now
    ) {
        self.id = id
        self.serverProfileId = serverProfileId
        self.sourceBranchId = sourceBranchId
        self.targetParentBranchId = targetParentBranchId
        self.sourceNoteId = sourceNoteId
        self.oldParentNoteId = oldParentNoteId
        self.targetParentNoteId = targetParentNoteId
        self.queuedAt = queuedAt
    }
}

/// Attachment bytes received via local transfer; uploaded after the owning note syncs to the server.
@Model
final class PendingAttachmentImport {
    @Attribute(.unique) var id: String
    var serverProfileId: String
    var noteId: String
    var role: String
    var mime: String
    var title: String
    var position: Int
    @Attribute(.externalStorage) var data: Data
    var queuedAt: Date

    init(
        id: String = UUID().uuidString,
        serverProfileId: String,
        noteId: String,
        role: String,
        mime: String,
        title: String,
        position: Int,
        data: Data,
        queuedAt: Date = .now
    ) {
        self.id = id
        self.serverProfileId = serverProfileId
        self.noteId = noteId
        self.role = role
        self.mime = mime
        self.title = title
        self.position = position
        self.data = data
        self.queuedAt = queuedAt
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

/// Cursor for `GET /api/sync/changed` (`lastEntityChangeId`), per server profile.
@Model
final class EntityPullCursor {
    @Attribute(.unique) var serverProfileId: String
    var lastEntityChangeId: Int64

    init(serverProfileId: String, lastEntityChangeId: Int64 = 0) {
        self.serverProfileId = serverProfileId
        self.lastEntityChangeId = lastEntityChangeId
    }
}

/// Top-level notebook (child of Trilium `root`) excluded from offline cache for this server profile.
@Model
final class CacheExcludedRootNote {
    @Attribute(.unique) var id: String
    var rootNoteId: String
    var serverProfileId: String

    init(rootNoteId: String, serverProfileId: String) {
        self.id = "\(serverProfileId):\(rootNoteId)"
        self.rootNoteId = rootNoteId
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
