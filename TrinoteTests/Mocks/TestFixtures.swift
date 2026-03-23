import Foundation
@testable import Trinote

enum TestFixtures {
    static func noteResponse(
        id: String = "note1",
        title: String = "Test Note",
        type: String = "text",
        mime: String = "text/html",
        isProtected: Bool = false,
        parentNoteIds: [String] = ["root"],
        childNoteIds: [String] = [],
        childBranchIds: [String] = [],
        attributes: [AttributeResponse] = []
    ) -> NoteResponse {
        NoteResponse(
            noteId: id,
            isProtected: isProtected,
            title: title,
            type: type,
            mime: mime,
            blobId: "blob-\(id)",
            isDeleted: false,
            dateCreated: "2024-01-15 12:00:00",
            dateModified: "2024-01-15 13:00:00",
            utcDateCreated: "2024-01-15T12:00:00.000Z",
            utcDateModified: "2024-01-15T13:00:00.000Z",
            parentNoteIds: parentNoteIds,
            childNoteIds: childNoteIds,
            parentBranchIds: parentNoteIds.map { "branch_\($0)_\(id)" },
            childBranchIds: childBranchIds,
            attributes: attributes
        )
    }

    static func branchResponse(
        branchId: String = "branch1",
        noteId: String = "note1",
        parentNoteId: String = "root",
        prefix: String? = nil,
        notePosition: Int = 10
    ) -> BranchResponse {
        BranchResponse(
            branchId: branchId,
            noteId: noteId,
            parentNoteId: parentNoteId,
            prefix: prefix,
            notePosition: notePosition,
            isExpanded: false,
            utcDateModified: "2024-01-15T12:00:00.000Z"
        )
    }

    static func attributeResponse(
        attributeId: String = "attr1",
        noteId: String = "note1",
        type: String = "label",
        name: String = "testLabel",
        value: String = "testValue"
    ) -> AttributeResponse {
        AttributeResponse(
            attributeId: attributeId,
            noteId: noteId,
            type: type,
            name: name,
            value: value,
            position: 0,
            isInheritable: false,
            utcDateModified: "2024-01-15T12:00:00.000Z"
        )
    }

    static func attachmentResponse(
        attachmentId: String = "att1",
        ownerId: String = "note1",
        title: String = "file.txt",
        mime: String = "text/plain"
    ) -> AttachmentResponse {
        AttachmentResponse(
            attachmentId: attachmentId,
            ownerId: ownerId,
            role: "file",
            mime: mime,
            title: title,
            position: 0,
            blobId: "blob-\(attachmentId)",
            dateModified: "2024-01-15",
            utcDateModified: "2024-01-15T00:00:00.000Z",
            utcDateScheduledForErasureSince: nil,
            contentLength: 1024
        )
    }

    static func rootNoteWithChildren(childIds: [String]) -> NoteResponse {
        noteResponse(
            id: "root",
            title: "Root",
            parentNoteIds: [],
            childNoteIds: childIds,
            childBranchIds: childIds.map { "branch_root_\($0)" }
        )
    }
}
