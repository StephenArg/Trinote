import XCTest
@testable import Trinote

/// Autosave (issue #26): saving while the editor stays open, Cancel after an autosave, and the cases that
/// mustn't save. Uses the app's shared store under a server id of its own, cleared after each test.
@MainActor
final class NoteDetailAutosaveTests: XCTestCase {
    private let profileId = "autosave-test-server"
    private let noteId = "autosaveTestNote"
    private var appState: AppState!

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func makeViewModel(type: NoteType, body: String) async throws -> NoteDetailViewModel {
        // `AppState` reads the app's shared store, which the test host creates at launch.
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        self.appState = appState
        let vm = NoteDetailViewModel(noteId: noteId, appState: appState)
        let mime = type == .text ? "text/html" : "text/plain"
        vm.note = NoteItem(from: TestFixtures.noteResponse(id: noteId, type: type.rawValue, mime: mime))
        vm.contentString = body
        return vm
    }

    private func queuedBody() -> String? {
        let rows = (try? PersistenceManager.shared.fetchPendingNoteBodyUploads(serverProfileId: profileId)) ?? []
        return rows.first { $0.noteId == noteId }.map { String(decoding: $0.body, as: UTF8.self) }
    }

    func testAutosaveQueuesTheBodyAndKeepsEditing() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        vm.editableContent = "changed"

        XCTAssertTrue(vm.noteEditedBody(vm.editableContent))
        XCTAssertEqual(vm.autosaveStatus, .edited)
        XCTAssertTrue(vm.autosaveEditedBody(vm.editableContent))

        XCTAssertTrue(vm.isEditing)
        XCTAssertEqual(queuedBody(), "changed")
        XCTAssertEqual(vm.autosaveStatus, .saved)
        XCTAssertTrue(vm.hasAutosavedThisSession)
    }

    func testUnchangedBodyIsNotSaved() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()

        XCTAssertFalse(vm.noteEditedBody(vm.editableContent))
        XCTAssertFalse(vm.autosaveEditedBody(vm.editableContent))
        XCTAssertNil(queuedBody())
    }

    func testSavingTheSameBodyTwiceQueuesItOnce() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()

        XCTAssertTrue(vm.autosaveEditedBody("changed"))
        XCTAssertFalse(vm.autosaveEditedBody("changed"))
    }

    func testBodyBackToWhatsSavedLeavesNothingToSave() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        XCTAssertTrue(vm.noteEditedBody("changed"))

        // Undone before autosave ran.
        XCTAssertFalse(vm.autosaveEditedBody("original"))
        XCTAssertEqual(vm.autosaveStatus, .idle)
        XCTAssertNil(queuedBody())

        XCTAssertTrue(vm.autosaveEditedBody("changed"))
        XCTAssertTrue(vm.noteEditedBody("changed again"))
        XCTAssertFalse(vm.autosaveEditedBody("changed"))
        XCTAssertEqual(vm.autosaveStatus, .saved)
    }

    func testTextChangeBeforeTheEditorLoadedIsntAnEdit() async throws {
        // Compared with the stored HTML, which the editor then tidies the same way.
        let vm = try await makeViewModel(type: .text, body: "<p>Hello</p>\n")
        vm.startEditing()
        XCTAssertTrue(vm.receiveEditorUpdate("<p>Hello</p>"))
        XCTAssertEqual(vm.autosaveStatus, .edited)

        vm.setAutosaveBaselineFromEditor("<p>Hello</p>")

        XCTAssertEqual(vm.autosaveStatus, .idle)
    }

    func testNothingIsSavedOutsideTheEditor() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")

        XCTAssertFalse(vm.autosaveEditedBody("changed"))
        XCTAssertNil(queuedBody())
    }

    func testNothingIsSavedWhilePhotosUpload() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>original</p>")
        vm.startEditing()
        vm.mediaUploadStatus = "Uploading photo 1 of 2…"

        XCTAssertFalse(vm.autosaveEditedBody("<p>changed</p>"))
        XCTAssertNil(queuedBody())
    }

    func testNothingIsSavedAfterSwitchingServers() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        appState.activeProfile = ServerProfile(id: "autosave-other-server", name: "Other", baseURL: "https://other.invalid")

        XCTAssertFalse(vm.autosaveEditedBody("changed"))
        try? PersistenceManager.shared.clearCache(for: "autosave-other-server")
    }

    func testTextNoteIsComparedWithTheEditorsOwnSerialization() async throws {
        // The editor tidies the stored HTML; that alone mustn't count as an edit.
        let vm = try await makeViewModel(type: .text, body: "<p>Hello</p>\n")
        vm.startEditing()
        vm.setAutosaveBaselineFromEditor("<p>Hello</p>")

        XCTAssertFalse(vm.receiveEditorUpdate("<p>Hello</p>"))
        XCTAssertFalse(vm.autosaveRichText(freshHTML: "<p>Hello</p>"))
        XCTAssertNil(queuedBody())

        XCTAssertTrue(vm.receiveEditorUpdate("<p>Hello world</p>"))
        XCTAssertTrue(vm.autosaveRichText(freshHTML: "<p>Hello world</p>"))
        XCTAssertEqual(queuedBody(), "<p>Hello world</p>")
    }

    func testLatestKnownTextIsSavedWhenTheEditorGoesAway() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>Hello</p>")
        vm.startEditing()
        vm.setAutosaveBaselineFromEditor("<p>Hello</p>")
        vm.receiveEditorUpdate("<p>Hello again</p>")

        vm.autosaveLatestKnownContent()

        XCTAssertEqual(queuedBody(), "<p>Hello again</p>")
        XCTAssertTrue(vm.isEditing)
    }

    func testCancelAfterAutosavePutsBackTheOriginal() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        XCTAssertFalse(vm.cancelEditingNeedsConfirmation)
        XCTAssertTrue(vm.autosaveEditedBody("changed"))
        XCTAssertTrue(vm.cancelEditingNeedsConfirmation)

        vm.cancelEditing()

        XCTAssertFalse(vm.isEditing)
        XCTAssertEqual(queuedBody(), "original")
        XCTAssertEqual(vm.contentString, "original")
        XCTAssertEqual(vm.editableContent, "original")
    }

    func testCancelWithoutAutosaveQueuesNothing() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        vm.editableContent = "changed"

        vm.cancelEditing()

        XCTAssertFalse(vm.isEditing)
        XCTAssertNil(queuedBody())
        XCTAssertEqual(vm.editableContent, "original")
    }

    func testSaveAfterAutosaveClosesTheEditor() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        vm.editableContent = "changed"
        XCTAssertTrue(vm.autosaveEditedBody(vm.editableContent))

        vm.saveContent()

        XCTAssertFalse(vm.isEditing)
        XCTAssertEqual(vm.contentString, "changed")
        XCTAssertEqual(queuedBody(), "changed")
        XCTAssertEqual(vm.autosaveStatus, .idle)
    }

    func testSaveWithoutChangesQueuesNothing() async throws {
        // Back with Back Button Saves on after opening the editor by mistake.
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()

        vm.saveContent()

        XCTAssertFalse(vm.isEditing)
        XCTAssertNil(queuedBody())
    }

    func testRestoredDraftIsSavedByAutosaveOnceItChanges() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.hasDraft = true
        vm.editableContent = "draft text"

        vm.restoreDraft()
        XCTAssertTrue(vm.editSessionStartedFromDraft)
        XCTAssertEqual(vm.autosaveStatus, .edited)
        vm.autosaveLatestKnownContent()

        XCTAssertNil(queuedBody())
        XCTAssertTrue(vm.resumedDraftIsUnchanged)

        vm.editableContent = "draft text, edited"
        XCTAssertFalse(vm.resumedDraftIsUnchanged)
        vm.autosaveLatestKnownContent()

        XCTAssertEqual(queuedBody(), "draft text, edited")
        XCTAssertFalse(vm.hasDraft)
    }

    func testSaveButtonSendsAnUnchangedRestoredDraft() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.hasDraft = true
        vm.editableContent = "draft text"
        vm.restoreDraft()

        XCTAssertTrue(vm.autosaveEditedBody(vm.editableContent, userRequested: true))

        XCTAssertEqual(queuedBody(), "draft text")
    }

    func testRestoredTextDraftTheEditorOnlyTidiedIsntUploaded() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>saved</p>")
        vm.hasDraft = true
        vm.editableContent = "<p>draft</p>\n"
        vm.restoreDraft()

        vm.setAutosaveBaselineFromEditor("<p>draft</p>")
        vm.autosaveLatestKnownContent()
        XCTAssertFalse(vm.autosaveRichText(freshHTML: "<p>draft</p>"))
        XCTAssertNil(queuedBody())

        XCTAssertTrue(vm.autosaveRichText(freshHTML: "<p>draft, typed</p>"))
        XCTAssertEqual(queuedBody(), "<p>draft, typed</p>")
    }

    func testNoDraftIsKeptForTheEditorsOwnCopyOfTheNote() async throws {
        let vm = try await makeViewModel(type: .text, body: "<figure class=\"include-note\" data-note-id=\"a\"></figure><p>x</p>")
        vm.startEditing()
        vm.setAutosaveBaselineFromEditor("<p>x</p>")
        vm.receiveEditorUpdate("<p>x</p>")

        vm.persistEditingDraftIfNeeded()

        XCTAssertNil(try PersistenceManager.shared.loadDraft(noteId: noteId, serverProfileId: profileId))
    }

    func testTypedChangesStillMakeADraft() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>x</p>")
        vm.startEditing()
        vm.setAutosaveBaselineFromEditor("<p>x</p>")
        vm.receiveEditorUpdate("<p>x y</p>")

        vm.persistEditingDraftIfNeeded()

        XCTAssertEqual(try PersistenceManager.shared.loadDraft(noteId: noteId, serverProfileId: profileId)?.content, "<p>x y</p>")
    }

    func testSaveWithoutChangesKeepsTheStoredBody() async throws {
        let stored = "<figure class=\"include-note\" data-note-id=\"a\"></figure><p>x</p>"
        let vm = try await makeViewModel(type: .text, body: stored)
        vm.startEditing()
        vm.setAutosaveBaselineFromEditor("<p>x</p>")

        vm.saveContent(freshHTML: "<p>x</p>")

        XCTAssertFalse(vm.isEditing)
        XCTAssertNil(queuedBody())
        XCTAssertEqual(vm.contentString, stored)
    }

    func testDraftMissingEmbedsIsFlagged() {
        let saved = #"<figure class="include-note" data-attachment-id="att1"></figure><p data-trilium-block-id="b1">x</p>"#
        XCTAssertTrue(NoteDetailViewModel.draftLacksEmbeddedContent(draft: "<p>x</p>", saved: saved))
        XCTAssertFalse(NoteDetailViewModel.draftLacksEmbeddedContent(draft: saved + "<p>more</p>", saved: saved))
        XCTAssertFalse(NoteDetailViewModel.draftLacksEmbeddedContent(draft: "<p>new</p>", saved: "<p>old</p>"))
    }

    func testCanvasPlaceholderIsNeverAutosaved() async throws {
        let vm = try await makeViewModel(type: .canvas, body: #"{"type":"excalidraw","version":2,"elements":[]}"#)
        vm.startEditing()

        XCTAssertFalse(vm.autosaveCanvas(json: "{}"))
        XCTAssertNil(queuedBody())
    }

    func testDeletingWhileEditingLeavesNoQueuedUpload() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        XCTAssertTrue(vm.autosaveEditedBody("changed"))

        // No client, so the deletion is queued for later.
        let deleted = await vm.deleteNote()

        XCTAssertTrue(deleted)
        XCTAssertFalse(vm.isEditing)
        XCTAssertNil(queuedBody())
        vm.autosaveLatestKnownContent()
        XCTAssertNil(queuedBody())
    }

    // MARK: Back from the editor

    func testBackWithoutSavingShowsTheNoteAndKeepsWhatWasTyped() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        vm.editableContent = "changed"

        vm.closeEditorKeepingDraft()

        XCTAssertFalse(vm.isEditing)
        XCTAssertEqual(vm.contentString, "original", "the note shows as last saved")
        XCTAssertNil(queuedBody(), "nothing is uploaded")
        XCTAssertTrue(vm.hasDraft, "the banner offers it back")
        XCTAssertEqual(vm.editableContent, "changed")

        vm.restoreDraft()
        XCTAssertTrue(vm.isEditing)
        XCTAssertEqual(vm.editableContent, "changed")
    }

    func testBackAfterChangingNothingLeavesNoDraft() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()

        vm.closeEditorKeepingDraft()

        XCTAssertFalse(vm.isEditing)
        XCTAssertFalse(vm.hasDraft)
        XCTAssertEqual(vm.editableContent, "original")
    }

    func testBackKeepsTheEditorsLastKeystrokes() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>original</p>")
        vm.startEditing()

        vm.closeEditorKeepingDraft(freshHTML: "<p>typed last</p>")

        XCTAssertTrue(vm.hasDraft)
        XCTAssertEqual(vm.editableContent, "<p>typed last</p>")
    }

    func testBackWithSavingShowsTheEditEvenAfterAnAutosave() async throws {
        let vm = try await makeViewModel(type: .code, body: "original")
        vm.startEditing()
        XCTAssertTrue(vm.autosaveEditedBody("changed"))
        XCTAssertEqual(vm.contentString, "original", "read mode isn't updated until the editor closes")

        vm.editableContent = "changed"
        vm.saveContent()

        XCTAssertFalse(vm.isEditing)
        XCTAssertEqual(vm.contentString, "changed")
        XCTAssertEqual(queuedBody(), "changed")
    }

    // MARK: Note excerpts

    func testExcerptSavesRunInTheOrderTheyWereAskedFor() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>x</p>")
        let client = MockTriliumClient()
        await client.delayNoteBlocksUpdate(of: "a", nanoseconds: 100_000_000)
        appState.client = client

        async let first = vm.saveExcerpt(noteId: "other", block: "a", newBlock: "a", html: "<p>1</p>")
        try await Task.sleep(nanoseconds: 10_000_000)
        async let second = vm.saveExcerpt(noteId: "other", block: "a:b", newBlock: "a:b", html: "<p>2</p>")
        let results = await [first, second]

        XCTAssertEqual(results, [true, true])
        let blocks = await client.updateNoteBlocksCalls.map(\.block)
        XCTAssertEqual(blocks, ["a", "a:b"], "the second names the range the first leaves")
    }

    func testAnExcerptOfTheOpenNoteCantBeEditedInsideIt() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>x</p>")
        let client = MockTriliumClient()
        await client.setNoteBlocks("<p>y</p>")
        appState.client = client
        try XCTSkipUnless(vm.isOnline, "the simulator has no network")

        let own = await vm.excerptContentForEditor(noteId: vm.noteId, block: "a")
        XCTAssertNil(own)
        let other = await vm.excerptContentForEditor(noteId: "other", block: "a")
        XCTAssertEqual(other, "<p>y</p>")
    }

    func testPhotosAddedInsideAnExcerptAttachToItsNote() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>x</p>")
        let client = MockTriliumClient()
        appState.client = client
        try XCTSkipUnless(vm.isOnline, "the simulator has no network")
        let photo = PhotoLibraryImage(data: Data([1]), mime: "image/jpeg", preview: Data([1]), previewMime: "image/jpeg")

        await vm.uploadPhotosAsAttachments([photo], ownerNoteId: "other") { _ in }
        await vm.uploadPhotosAsAttachments([photo]) { _ in }

        let owners = await client.uploadNoteAttachmentCalls.map(\.noteId)
        XCTAssertEqual(owners, ["other", vm.noteId])
    }

    func testAFileAddedInsideAnExcerptAttachesToItsNote() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>x</p>")
        let client = MockTriliumClient()
        appState.client = client

        _ = await vm.uploadAttachment(data: Data([1]), filename: "a.pdf", mime: "application/pdf", ownerNoteId: "other")

        let owners = await client.uploadNoteAttachmentCalls.map(\.noteId)
        XCTAssertEqual(owners, ["other"])
    }

    // MARK: An excerpt's range changing

    private func excerptFigure(_ block: String) -> String {
        #"<figure class="include-note" data-note-id="other" data-block="\#(block)" data-box-size="full"></figure>"#
    }

    private func editedExcerptNote(body: String) async throws -> NoteDetailViewModel {
        let vm = try await makeViewModel(type: .text, body: body)
        appState.client = MockTriliumClient()
        vm.startEditing()
        return vm
    }

    func testCancelKeepsTheRangeTheExcerptMovedTo() async throws {
        let vm = try await editedExcerptNote(body: "<p>x</p>" + excerptFigure("a:b"))
        vm.receiveEditorUpdate("<p>typed</p>" + excerptFigure("c:b"))

        let saved = await vm.saveExcerpt(noteId: "other", block: "a:b", newBlock: "c:b", html: "<p>new</p>")
        XCTAssertTrue(saved)
        vm.cancelEditing()

        XCTAssertEqual(queuedBody(), "<p>x</p>" + excerptFigure("c:b"), "the text is dropped, the reference isn't")
        XCTAssertEqual(vm.editableContent, "<p>x</p>" + excerptFigure("c:b"), "the next edit starts from it too")
    }

    func testCancelAfterAnAutosavePutsBackTheOldTextWithTheNewRange() async throws {
        let vm = try await editedExcerptNote(body: "<p>x</p>" + excerptFigure("a"))
        XCTAssertTrue(vm.autosaveEditedBody("<p>typed</p>" + excerptFigure("a")))

        _ = await vm.saveExcerpt(noteId: "other", block: "a", newBlock: "a:n", html: "<p>new</p>")
        XCTAssertEqual(queuedBody(), "<p>typed</p>" + excerptFigure("a:n"))
        vm.cancelEditing()

        XCTAssertEqual(queuedBody(), "<p>x</p>" + excerptFigure("a:n"))
    }

    func testAnExcerptEditThatKeepsItsRangeDoesntTouchTheNote() async throws {
        let vm = try await editedExcerptNote(body: "<p>x</p>" + excerptFigure("a"))

        _ = await vm.saveExcerpt(noteId: "other", block: "a", newBlock: "a", html: "<p>new</p>")

        XCTAssertNil(queuedBody())
    }

    func testAFailedExcerptSaveLeavesTheReferenceAlone() async throws {
        let vm = try await makeViewModel(type: .text, body: excerptFigure("a"))
        let client = MockTriliumClient()
        await client.failNoteBlocksUpdate()
        appState.client = client

        let saved = await vm.saveExcerpt(noteId: "other", block: "a", newBlock: "a:n", html: "<p>new</p>")

        XCTAssertFalse(saved)
        XCTAssertNil(queuedBody())
    }

    func testCancelRedrawsTheExcerptsInReadingView() async throws {
        let vm = try await editedExcerptNote(body: "<p>x</p>" + excerptFigure("a"))
        _ = await vm.saveExcerpt(noteId: "other", block: "a", newBlock: "a:n", html: "<p>new</p>")
        vm.contentString = "<p>x</p><p>drawn before the edit</p>"

        vm.cancelEditing()

        for _ in 0..<40 where vm.contentString?.contains("drawn before the edit") == true {
            try await Task.sleep(nanoseconds: 25_000_000)
        }
        XCTAssertEqual(vm.contentString?.contains("drawn before the edit"), false)
    }

    // MARK: Canvas reading view after editing

    func testLeavingTheCanvasEditorGivesReadingViewTheNewDrawing() async throws {
        let original = NoteType.emptyCanvasNoteJSON
        let vm = try await makeViewModel(type: .canvas, body: original)
        vm.startEditing()
        let drawn = #"{"type":"excalidraw","version":2,"elements":[{"id":"a"}],"files":{},"appState":{}}"#
        XCTAssertTrue(vm.autosaveCanvas(json: drawn))

        vm.saveCanvasContent(json: drawn, svg: "<svg>new</svg>")

        XCTAssertFalse(vm.isEditing)
        let preview = try XCTUnwrap(vm.savedCanvasPreview)
        XCTAssertEqual(preview.drawing(for: vm.contentString), .svg(Data("<svg>new</svg>".utf8)))
        XCTAssertNil(preview.drawing(for: original), "a newer body from the server is drawn the usual way")
    }

    func testACanvasSavedWithoutAnExportIsDrawnFromItsScene() async throws {
        let vm = try await makeViewModel(type: .canvas, body: NoteType.emptyCanvasNoteJSON)
        vm.startEditing()
        let drawn = #"{"type":"excalidraw","version":2,"elements":[{"id":"a"}],"files":{},"appState":{}}"#
        vm.saveCanvasContent(json: drawn, svg: "<svg>first</svg>")
        let first = try XCTUnwrap(vm.savedCanvasPreview?.generation)
        vm.startEditing()

        vm.saveCanvasContent(json: drawn, svg: "")

        XCTAssertEqual(vm.savedCanvasPreview?.drawing(for: drawn), .scene, "not the export of the save before")
        XCTAssertEqual(vm.savedCanvasPreview?.generation, first + 1)
    }

    func testAWholeIncludedNoteLoadsAndSavesAsItsContent() async throws {
        let vm = try await makeViewModel(type: .text, body: "<p>x</p>")
        let client = MockTriliumClient()
        await client.setNoteContentResult("whole", .success(Data("<p>Included body</p>".utf8)))
        appState.client = client
        try XCTSkipUnless(vm.isOnline, "the simulator has no network")

        let loaded = await vm.excerptContentForEditor(noteId: "whole", block: "")
        XCTAssertEqual(loaded, "<p>Included body</p>")
        let saved = await vm.saveExcerpt(noteId: "whole", block: "", newBlock: "", html: "<p>Changed</p>")

        XCTAssertTrue(saved)
        let writes = await client.updateNoteContentCalls
        XCTAssertEqual(writes.map(\.0), ["whole"])
        XCTAssertEqual(writes.first.map { String(decoding: $0.1, as: UTF8.self) }, "<p>Changed</p>")
        let blockWrites = await client.updateNoteBlocksCalls
        XCTAssertTrue(blockWrites.isEmpty)
    }

    func testTheEmbedMenuPresentsFromTheEditorsOwnScreen() throws {
        let scene = try XCTUnwrap(UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.first)
        let window = UIWindow(windowScene: scene)
        let screen = UIViewController()
        window.rootViewController = screen
        window.makeKeyAndVisible()
        defer { window.isHidden = true }
        let editor = UIView()
        screen.view.addSubview(editor)

        XCTAssertIdentical(IncludeEmbedMenuPresenter.presenter(for: editor), screen)
    }
}

