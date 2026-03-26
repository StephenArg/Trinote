import Foundation
@testable import Trinote

actor MockTriliumClient: TriliumClientProtocol {
    let baseURL: URL
    var isSessionValid = false

    // Stubs
    var appInfoResult: Result<AppInfoResponse, Error> = .success(AppInfoResponse(appVersion: "0.63.7", dbVersion: 227, syncVersion: 32, buildDate: "2024-01-15", buildRevision: "abc", dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil))

    var noteResults: [String: Result<NoteResponse, Error>] = [:]
    var noteContentResults: [String: Result<Data, Error>] = [:]
    var branchResults: [String: Result<BranchResponse, Error>] = [:]
    var searchResult: Result<SearchResponse, Error> = .success(SearchResponse(results: [], debugInfo: nil))
    var createNoteResult: Result<CreateNoteResponse, Error>?
    var updateNoteResult: Result<NoteResponse, Error>?
    var deleteNoteError: Error?
    var attachmentsResult: Result<[AttachmentResponse], Error> = .success([])
    var attachmentContentResult: Result<Data, Error>?
    var createAttachmentResult: Result<AttachmentResponse, Error>?
    var syncCheckResult: Result<SyncCheckResponse, Error> = .success(SyncCheckResponse())
    var syncPullResult: Result<SyncPullResponse, Error> = .success(SyncPullResponse(
        entityChanges: [], maxEntityChangeId: 0, outstandingPullCount: 0,
        notes: [], branches: [], attributes: [], blobs: []
    ))

    // Call tracking
    var loginCalled = false
    var logoutCalled = false
    var getNoteCalls: [String] = []
    var getNoteContentCalls: [String] = []
    var updateNoteCalls: [(String, UpdateNoteRequest)] = []
    var updateNoteContentCalls: [(String, Data)] = []
    var deleteNoteCalls: [String] = []
    var searchCalls: [String] = []
    var getBranchCalls: [(String, String)] = []
    var createAttributeCalls: [CreateAttributeRequest] = []
    var deleteAttributeCalls: [(noteId: String, attributeId: String)] = []
    var cloneToParentCalls: [(noteId: String, parentNoteId: String)] = []
    var deleteBranchWithTaskCalls: [String] = []
    var branchIdLookupCalls: [(parent: String, child: String)] = []

    init(baseURL: URL = URL(string: "https://test.trilium.local")!) {
        self.baseURL = baseURL
    }

    func exportSessionCookieData() -> Data? { nil }

    func login(password: String, rememberMe: Bool) async throws {
        loginCalled = true
        _ = password
        _ = rememberMe
        isSessionValid = true
    }

    func restoreSession() async throws {
        _ = try appInfoResult.get()
        isSessionValid = true
    }

    func logout() async throws { logoutCalled = true; isSessionValid = false }

    var enterProtectedSessionResult: Result<Void, Error> = .success(())
    var touchProtectedSessionCallCount = 0

    func enterProtectedSession(password: String) async throws {
        _ = password
        try enterProtectedSessionResult.get()
    }

    func touchProtectedSession() async throws {
        touchProtectedSessionCallCount += 1
    }

    func exitProtectedSession() async throws {}

    func getAppInfo() async throws -> AppInfoResponse {
        try appInfoResult.get()
    }

    func syncCheck() async throws -> SyncCheckResponse {
        try syncCheckResult.get()
    }

    func syncPull(instanceId: String, lastEntityChangeId: Int64) async throws -> SyncPullResponse {
        _ = instanceId
        _ = lastEntityChangeId
        return try syncPullResult.get()
    }

    func getNote(_ noteId: String) async throws -> NoteResponse {
        getNoteCalls.append(noteId)
        if let result = noteResults[noteId] { return try result.get() }
        return TestFixtures.noteResponse(id: noteId, title: "Note \(noteId)")
    }

    func getNoteContent(_ noteId: String) async throws -> Data {
        getNoteContentCalls.append(noteId)
        if let result = noteContentResults[noteId] { return try result.get() }
        return Data("<p>Content of \(noteId)</p>".utf8)
    }

    func updateNote(_ noteId: String, request: UpdateNoteRequest) async throws -> NoteResponse {
        updateNoteCalls.append((noteId, request))
        if let result = updateNoteResult { return try result.get() }
        return TestFixtures.noteResponse(id: noteId, title: request.title ?? "Updated")
    }

    func updateNoteContent(_ noteId: String, content: Data, contentType: String) async throws {
        updateNoteContentCalls.append((noteId, content))
    }

    func deleteNote(_ noteId: String) async throws {
        deleteNoteCalls.append(noteId)
        if let error = deleteNoteError { throw error }
    }

    func createNote(_ request: CreateNoteRequest) async throws -> CreateNoteResponse {
        if let result = createNoteResult { return try result.get() }
        let note = TestFixtures.noteResponse(id: "new-\(UUID().uuidString.prefix(8))", title: request.title, type: request.type)
        let branch = TestFixtures.branchResponse(noteId: note.noteId, parentNoteId: request.parentNoteId)
        return CreateNoteResponse(note: note, branch: branch)
    }

    func duplicateNoteAsChild(sourceNoteId: String, parentNoteId: String) async throws -> CreateNoteResponse {
        let src = try await getNote(sourceNoteId)
        let data = try await getNoteContent(sourceNoteId)
        let title = src.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            ? "Note (copy)"
            : "\(src.title) (copy)"
        return try await createChildNoteWithContent(
            parentNoteId: parentNoteId,
            title: title,
            noteType: src.type,
            mime: src.mime,
            body: data
        )
    }

    func createChildNoteWithContent(parentNoteId: String, title: String, noteType: String, mime: String, body: Data) async throws -> CreateNoteResponse {
        let content = String(data: body, encoding: .utf8) ?? ""
        let req = CreateNoteRequest(
            parentNoteId: parentNoteId,
            title: title,
            type: noteType,
            mime: mime,
            content: content,
            notePosition: nil,
            prefix: nil,
            isProtected: false,
            noteId: nil,
            branchId: nil
        )
        return try await createNote(req)
    }

    func searchNotes(query: String, fastSearch: Bool, includeArchived: Bool, ancestorNoteId: String?, orderBy: String?, orderDirection: String?, limit: Int?) async throws -> SearchResponse {
        searchCalls.append(query)
        return try searchResult.get()
    }

    func getBranch(_ branchId: String, parentNoteId: String) async throws -> BranchResponse {
        getBranchCalls.append((branchId, parentNoteId))
        if let result = branchResults[branchId] { return try result.get() }
        return TestFixtures.branchResponse(branchId: branchId)
    }

    func placeBranchInSiblingOrder(_ branchId: String, orderedSiblingBranchIds: [String]) async throws {
        _ = branchId
        _ = orderedSiblingBranchIds
    }

    func createBranch(_ request: CreateBranchRequest) async throws -> BranchResponse {
        TestFixtures.branchResponse(noteId: request.noteId, parentNoteId: request.parentNoteId)
    }

    func updateBranch(_ branchId: String, request: UpdateBranchRequest) async throws -> BranchResponse {
        TestFixtures.branchResponse(branchId: branchId)
    }

    func deleteBranch(_ branchId: String) async throws {}

    func deleteBranchWithNoProgressTask(_ branchId: String) async throws {
        deleteBranchWithTaskCalls.append(branchId)
    }

    func cloneNoteToParentNote(_ noteId: String, parentNoteId: String) async throws {
        cloneToParentCalls.append((noteId, parentNoteId))
    }

    func branchId(fromParentNoteId parentNoteId: String, toChildNoteId childNoteId: String) async throws -> String? {
        branchIdLookupCalls.append((parentNoteId, childNoteId))
        if parentNoteId == "_share", childNoteId == "n1" { return "brS1" }
        return nil
    }

    func getAttribute(_ attributeId: String) async throws -> AttributeResponse {
        TestFixtures.attributeResponse(attributeId: attributeId)
    }

    func createAttribute(_ request: CreateAttributeRequest) async throws {
        createAttributeCalls.append(request)
    }

    func deleteAttribute(noteId: String, attributeId: String) async throws {
        deleteAttributeCalls.append((noteId: noteId, attributeId: attributeId))
    }

    /// Fixture for `SharedNotesSubtreeLoader` tests: `_share` → `n1` (explicit share) → `n2` (subnote; not a direct `_share` child).
    func seedSharedNotesSubtreeDemo() {
        let brS1 = TestFixtures.branchResponse(branchId: "brS1", noteId: "n1", parentNoteId: "_share")
        let brN2 = TestFixtures.branchResponse(branchId: "brN2", noteId: "n2", parentNoteId: "n1")
        noteResults["_share"] = .success(
            TestFixtures.noteResponse(
                id: "_share",
                title: "Shared",
                parentNoteIds: ["root"],
                childNoteIds: ["n1"],
                childBranchIds: ["brS1"]
            )
        )
        branchResults["brS1"] = .success(brS1)
        branchResults["brN2"] = .success(brN2)
        noteResults["n1"] = .success(
            TestFixtures.noteResponse(
                id: "n1",
                title: "Alpha",
                parentNoteIds: ["_share"],
                childNoteIds: ["n2"],
                childBranchIds: ["brN2"],
                attributes: [
                    TestFixtures.attributeResponse(attributeId: "sh1", noteId: "n1", name: TriliumSharing.sharedLabelName, value: ""),
                ]
            )
        )
        noteResults["n2"] = .success(
            TestFixtures.noteResponse(
                id: "n2",
                title: "Sub under shared",
                parentNoteIds: ["n1"]
            )
        )
    }

    func getNoteAttachments(_ noteId: String) async throws -> [AttachmentResponse] {
        try attachmentsResult.get()
    }

    func getAttachment(_ attachmentId: String) async throws -> AttachmentResponse {
        TestFixtures.attachmentResponse(attachmentId: attachmentId)
    }

    func getAttachmentContent(_ attachmentId: String) async throws -> Data {
        if let result = attachmentContentResult { return try result.get() }
        return Data("file-content".utf8)
    }

    func uploadAttachmentContent(_ attachmentId: String, data: Data, contentType: String) async throws {}

    func createAttachment(_ request: CreateAttachmentRequest) async throws -> AttachmentResponse {
        if let result = createAttachmentResult { return try result.get() }
        return TestFixtures.attachmentResponse(ownerId: request.ownerId, title: request.title)
    }

    func deleteAttachment(_ attachmentId: String) async throws {}
}
