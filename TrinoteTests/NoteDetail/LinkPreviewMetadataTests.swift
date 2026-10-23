import XCTest
@testable import Trinote

/// When the editor's request for a link preview reaches the server, and what comes back (issue #35).
@MainActor
final class LinkPreviewMetadataTests: XCTestCase {
    private let profileId = "link-preview-test-server"
    private let noteId = "linkHost"
    private let url = "https://github.com/StephenArg/Trinote/issues"
    private var appState: AppState!

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func makeViewModel(noteId: String? = nil, serverVersion: String, client: MockTriliumClient) async throws -> NoteDetailViewModel {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        await client.setAppInfoResult(.success(AppInfoResponse(
            appVersion: serverVersion, dbVersion: 240, syncVersion: 39, buildDate: "", buildRevision: "",
            dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil
        )))
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = client
        self.appState = appState
        // A fresh AppState's network monitor reports the connection a moment after it starts.
        for _ in 0..<40 where !appState.isOnline {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(appState.isOnline, "link previews need a connection")
        await appState.refreshServerAppInfo()
        let id = noteId ?? self.noteId
        let vm = NoteDetailViewModel(noteId: id, appState: appState)
        vm.note = NoteItem(from: TestFixtures.noteResponse(id: id, type: "text", mime: "text/html"))
        return vm
    }

    func testAResolvedPageComesBackForThisNote() async throws {
        let mock = MockTriliumClient()
        let metadata = LinkPreviewMetadata(
            url: url, title: "Issues", favicon: "api/attachments/a1/image/github.com.svg", siteName: "GitHub",
            embedType: "opengraph"
        )
        await mock.setLinkPreviewMetadataResult(url: url, .success(metadata))
        let vm = try await makeViewModel(serverVersion: "0.106.0", client: mock)
        XCTAssertEqual(vm.linkPreviewSupport, LinkPreviewSupport(available: true, auto: true))

        let answer = await vm.linkPreviewAnswer(url: url, explicit: false)
        XCTAssertEqual(answer.metadata, metadata)
        XCTAssertNil(answer.problem)
        let calls = await mock.linkPreviewMetadataCalls
        XCTAssertEqual(calls, [LinkPreviewMetadataRequest(url: url, noteId: noteId)])
    }

    func testAPageTheServerCouldNotReadIsReadOnTheDevice() async throws {
        let mock = MockTriliumClient()
        await mock.setLinkPreviewMetadataResult(url: url, .success(
            LinkPreviewMetadata(url: url, title: "github.com", embedType: "opengraph", unresolved: true)
        ))
        let vm = try await makeViewModel(serverVersion: "0.106.0", client: mock)
        let faviconURL = URL(string: "https://github.githubassets.com/favicons/favicon.svg")!
        let svg = Data(#"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"/>"#.utf8)
        vm.linkPreviewPageReader = FakeLinkPreviewPageReader(
            page: LinkPreviewPage(
                title: "Issues · StephenArg/Trinote",
                description: "Trilium client for iOS.",
                siteName: "GitHub",
                imageURLs: [URL(string: "https://example.invalid/missing.png")!],
                faviconURLs: [faviconURL]
            ),
            downloads: [faviconURL: svg]
        )

        let answer = await vm.linkPreviewAnswer(url: url, explicit: false)
        XCTAssertNil(answer.problem)
        XCTAssertEqual(answer.metadata?.title, "Issues · StephenArg/Trinote")
        XCTAssertEqual(answer.metadata?.description, "Trilium client for iOS.")
        XCTAssertEqual(answer.metadata?.siteName, "GitHub")
        XCTAssertEqual(answer.metadata?.embedType, "opengraph")
        XCTAssertNil(answer.metadata?.unresolved)
        XCTAssertEqual(answer.metadata?.favicon, "api/attachments/att1/image/github.com.svg")
        XCTAssertNil(answer.metadata?.image, "a cover that can't be downloaded is left out")
        let created = await mock.createAttachmentRequests
        XCTAssertEqual(created.map(\.role), ["favicon"])
        XCTAssertEqual(created.first?.ownerId, noteId)
    }

    func testAPageTheServerCouldNotReadComesBackMarked() async throws {
        let mock = MockTriliumClient()
        let unresolved = LinkPreviewMetadata(url: url, title: "github.com", embedType: "opengraph", unresolved: true)
        await mock.setLinkPreviewMetadataResult(url: url, .success(unresolved))
        let vm = try await makeViewModel(serverVersion: "0.106.0", client: mock)
        vm.linkPreviewPageReader = FakeLinkPreviewPageReader(page: nil)
        let answer = await vm.linkPreviewAnswer(url: url, explicit: true)
        XCTAssertEqual(answer.metadata, unresolved)
        XCTAssertEqual(answer.problem, .pageUnreadable)
        XCTAssertNotNil(answer.problem?.message(explicit: true))
        XCTAssertNil(answer.problem?.message(explicit: false), "a paste keeps its plain link without a word")
    }

    func testAFailedRequestSaysWhy() async throws {
        let mock = MockTriliumClient()
        let vm = try await makeViewModel(serverVersion: "0.106.0", client: mock)
        vm.linkPreviewPageReader = FakeLinkPreviewPageReader(page: nil)
        let answer = await vm.linkPreviewAnswer(url: url, explicit: false)
        XCTAssertNil(answer.metadata)
        guard case .requestFailed = answer.problem else { return XCTFail("expected a failed request, got \(String(describing: answer.problem))") }
        XCTAssertNotNil(answer.problem?.message(explicit: false))
    }

    func testTrilium0104CanMakePreviews() async throws {
        let mock = MockTriliumClient()
        await mock.setLinkPreviewMetadataResult(url: url, .success(LinkPreviewMetadata(url: url, title: "T", embedType: "opengraph")))
        let vm = try await makeViewModel(serverVersion: "0.104.1", client: mock)
        XCTAssertEqual(vm.linkPreviewSupport, LinkPreviewSupport(available: true, auto: true))
        let answer = await vm.linkPreviewAnswer(url: url, explicit: true)
        XCTAssertEqual(answer.metadata?.title, "T")
    }

    func testAServerWithoutLinkPreviewsIsNeverAsked() async throws {
        let mock = MockTriliumClient()
        await mock.setLinkPreviewMetadataResult(url: url, .success(LinkPreviewMetadata(url: url, embedType: "opengraph")))
        let vm = try await makeViewModel(serverVersion: "0.103.2", client: mock)
        XCTAssertEqual(vm.linkPreviewSupport, .none)
        let answer = await vm.linkPreviewAnswer(url: url, explicit: true)
        XCTAssertNil(answer.metadata)
        XCTAssertEqual(answer.problem, .serverTooOld)
        let calls = await mock.linkPreviewMetadataCalls
        XCTAssertTrue(calls.isEmpty)
    }

    func testANoteNotYetOnTheServerIsNeverAsked() async throws {
        let mock = MockTriliumClient()
        await mock.setLinkPreviewMetadataResult(url: url, .success(LinkPreviewMetadata(url: url, embedType: "opengraph")))
        let vm = try await makeViewModel(noteId: "ol_pending1", serverVersion: "0.106.0", client: mock)
        XCTAssertEqual(vm.linkPreviewSupport, LinkPreviewSupport(available: true, auto: false))
        let answer = await vm.linkPreviewAnswer(url: url, explicit: true)
        XCTAssertNil(answer.metadata)
        XCTAssertEqual(answer.problem, .noteNotOnServer)
        let calls = await mock.linkPreviewMetadataCalls
        XCTAssertTrue(calls.isEmpty)
    }
}
