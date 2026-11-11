import XCTest
@testable import Trinote

/// The collection loader (issue #38) against the offline cache and the mock server: branch order, Trilium's
/// filters, preview bodies, the dashboard layout attachment and list rows.
@MainActor
final class CollectionLoaderTests: XCTestCase {
    typealias M = CollectionNoteModels

    private let profileId = "collection-loader-test-server"
    private var appState: AppState!
    private var persistence: PersistenceManager { PersistenceManager.shared }
    /// Made on first use, inside a test: building it reads the shared store, which the test host may not have opened yet
    /// when XCTest creates the test case.
    private lazy var policy = CacheExclusionPolicy()

    override func tearDown() async throws {
        if PersistenceManager.isInitialized {
            try? PersistenceManager.shared.clearCache(for: profileId)
        }
        appState = nil
        try await super.tearDown()
    }

    private func makeViewModel(noteId: String, client: MockTriliumClient? = nil) async throws -> NoteDetailViewModel {
        for _ in 0..<100 where !PersistenceManager.isInitialized {
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        try XCTSkipUnless(PersistenceManager.isInitialized, "the test host hasn't created the shared store")
        try? persistence.clearCache(for: profileId)
        let appState = AppState()
        appState.activeProfile = ServerProfile(id: profileId, name: "Test", baseURL: "https://example.invalid")
        appState.client = client
        self.appState = appState
        return NoteDetailViewModel(noteId: noteId, appState: appState)
    }

    private func cache(_ response: NoteResponse) throws {
        try persistence.cacheNoteIfAllowed(from: response, serverProfileId: profileId, policy: policy)
        for attribute in response.attributes {
            try persistence.cacheAttributeBatchIfAllowed(from: attribute, parentNoteIds: response.parentNoteIds, serverProfileId: profileId, policy: policy)
        }
    }

    private func cacheChild(_ id: String, of parent: String, position: Int, type: String = "text", title: String? = nil,
                            isProtected: Bool = false, attributes: [AttributeResponse] = [], body: String? = nil,
                            childBranchIds: [String] = []) throws {
        try cache(TestFixtures.noteResponse(
            id: id, title: title ?? "Note \(id)", type: type, isProtected: isProtected, parentNoteIds: [parent],
            childBranchIds: childBranchIds, attributes: attributes
        ))
        _ = persistence.upsertBranchForFullSync(
            TestFixtures.branchResponse(branchId: "b_\(parent)_\(id)", noteId: id, parentNoteId: parent, notePosition: position),
            existing: nil, serverProfileId: profileId
        )
        if let body {
            try persistence.cacheNoteContentIfAllowed(id, content: Data(body.utf8), parentNoteIds: [parent], serverProfileId: profileId, utcDateModified: nil, policy: policy)
        }
    }

    private func label(_ name: String, _ value: String = "", on noteId: String, inheritable: Bool = false) -> AttributeResponse {
        AttributeResponse(attributeId: "a_\(noteId)_\(name)", noteId: noteId, type: "label", name: name, value: value, position: 0, isInheritable: inheritable, utcDateModified: nil)
    }

    private func relation(_ name: String, _ value: String, on noteId: String) -> AttributeResponse {
        AttributeResponse(attributeId: "r_\(noteId)_\(name)_\(value)", noteId: noteId, type: "relation", name: name, value: value, position: 0, isInheritable: false, utcDateModified: nil)
    }

    /// A collection with five children in the cache: one hidden, one archived, one embedded by an image link.
    private func seedCollection(includeArchived: Bool = false) throws -> NoteItem {
        var attributes = [relation("imageLink", "img", on: "coll")]
        if includeArchived { attributes.append(label("includeArchived", on: "coll")) }
        let collection = TestFixtures.noteResponse(id: "coll", title: "Collection", type: "book", attributes: attributes)
        try cache(collection)
        try cacheChild("_hidden", of: "coll", position: 5)
        try cacheChild("b", of: "coll", position: 10, attributes: [label("archived", on: "b")])
        try cacheChild("c", of: "coll", position: 20, body: "<p>C</p>", childBranchIds: ["b_c_c1"])
        try cacheChild("a", of: "coll", position: 30, type: "code")
        try cacheChild("img", of: "coll", position: 40, type: "image")
        try persistence.commitBatch()
        return NoteItem(from: collection)
    }

    func testChildrenFollowBranchOrderAndTriliumFilters() async throws {
        let vm = try await makeViewModel(noteId: "coll")
        let collection = try seedCollection()

        let result = await vm.loadCollectionChildren(for: collection)

        XCTAssertEqual(result.children.map(\.noteId), ["c", "a"], "archived, hidden and image-linked children are left out, the rest in branch order")
        XCTAssertFalse(result.includeArchived)
        let c = result.children[0]
        XCTAssertEqual(c.iconClass, "bx bx-folder", "a text note with children takes the folder icon")
        XCTAssertTrue(c.hasChildren)
        XCTAssertEqual(result.children[1].iconClass, "bx bx-code")
        XCTAssertEqual(result.children[1].type, .code)
    }

    func testIncludeArchivedKeepsArchivedChildren() async throws {
        let vm = try await makeViewModel(noteId: "coll")
        let collection = try seedCollection(includeArchived: true)

        let result = await vm.loadCollectionChildren(for: collection)

        XCTAssertEqual(result.children.map(\.noteId), ["b", "c", "a"])
        XCTAssertTrue(result.includeArchived)
        XCTAssertTrue(result.children[0].isArchived)
    }

    func testArchivedIsInheritedThroughAnInheritableParentLabel() async throws {
        let vm = try await makeViewModel(noteId: "coll")
        // The collection's parent carries an inheritable #archived: every child counts as archived.
        try cache(TestFixtures.noteResponse(id: "parent", title: "Parent", attributes: [label("archived", on: "parent", inheritable: true)]))
        let collection = TestFixtures.noteResponse(id: "coll", title: "Collection", type: "book", parentNoteIds: ["parent"])
        try cache(collection)
        try cacheChild("x", of: "coll", position: 10)
        try persistence.commitBatch()

        let result = await vm.loadCollectionChildren(for: NoteItem(from: collection))

        XCTAssertEqual(result.children.map(\.noteId), [])
    }

    func testPreviewBodiesOfflineUseTheCacheOnly() async throws {
        let vm = try await makeViewModel(noteId: "coll")
        try cache(TestFixtures.noteResponse(id: "coll", title: "Collection", type: "book"))
        try cacheChild("c", of: "coll", position: 10, body: "<p>C</p>")
        try cacheChild("a", of: "coll", position: 20)
        try cacheChild("p", of: "coll", position: 30, isProtected: true, body: "<p>secret</p>")
        try cacheChild("empty", of: "coll", position: 40, body: "", childBranchIds: ["b_empty_e1"])
        try cacheChild("e1", of: "empty", position: 1, title: "Inside")
        try persistence.commitBatch()
        let children = await vm.loadCollectionChildren(for: NoteItem(from: TestFixtures.noteResponse(id: "coll", type: "book"))).children
        XCTAssertEqual(children.map(\.noteId), ["c", "a", "p", "empty"])

        let bodies = await vm.loadCollectionPreviewBodies(for: children, trim: true, noChildrenList: false, includeArchived: false, capped: true)

        guard case .html(let kind, let html) = bodies["c"] else { return XCTFail("cached body renders: \(String(describing: bodies["c"]))") }
        XCTAssertEqual(kind, "text")
        XCTAssertTrue(html.contains("<p>C</p>"))
        XCTAssertEqual(bodies["a"], .notDownloaded)
        XCTAssertEqual(bodies["p"], .protected, "a protected note stays closed while the session is locked")
        guard case .html(_, let list) = bodies["empty"] else { return XCTFail("an empty note lists its children") }
        XCTAssertTrue(list.contains("href=\"#/e1\""))
        XCTAssertTrue(list.contains("Inside"))
        XCTAssertTrue(list.contains("text-with-ellipsis"))
    }

    func testDashboardLayoutReadsTheAttachment() async throws {
        let mock = MockTriliumClient()
        let attachment = TestFixtures.attachmentResponse(attachmentId: "dash", ownerId: "coll", title: "dashboard.json", mime: "application/json")
        await mock.setAttachments(noteId: "coll", [attachment])
        await mock.setAttachmentBytes(id: "dash", Data(#"{"widgets":{"a":{"x":2,"y":1,"w":6,"h":4}}}"#.utf8))
        let vm = try await makeViewModel(noteId: "coll", client: mock)
        vm.attachments = [AttachmentItem(from: attachment)]

        let layout = await vm.loadDashboardLayout(for: NoteItem(from: TestFixtures.noteResponse(id: "coll", type: "book")))

        XCTAssertEqual(layout?.widgets["a"], M.DashboardGeometry(x: 2, y: 1, w: 6, h: 4))
    }

    func testListRowLoadsItsPreviewAndNestedRowsOffline() async throws {
        let vm = try await makeViewModel(noteId: "coll")
        try cache(TestFixtures.noteResponse(id: "coll", title: "Collection", type: "book"))
        try cacheChild("a", of: "coll", position: 10, body: "<p>Row body</p>", childBranchIds: ["b_a_a1", "b_a_a2"])
        try cacheChild("a2", of: "a", position: 1, attributes: [label("archived", on: "a2")])
        try cacheChild("a1", of: "a", position: 2)
        try persistence.commitBatch()

        let row = await vm.loadCollectionListRow(noteId: "a", level: 1, includeArchived: false, expandDepth: 0)

        XCTAssertEqual(row?.level, 1)
        XCTAssertEqual(row?.isHydrated, true)
        XCTAssertEqual(row?.isExpanded, true)
        guard case .html(_, let html) = row?.body else { return XCTFail("the row's content is its full preview") }
        XCTAssertTrue(html.contains("<p>Row body</p>"))
        XCTAssertEqual(row?.children.map(\.id), ["a1"], "archived nested rows are left out")
        XCTAssertEqual(row?.children.first?.level, 2)
        XCTAssertEqual(row?.children.first?.isHydrated, false)
    }

    func testListRowsOpenToTheExpandDepth() async throws {
        let vm = try await makeViewModel(noteId: "coll")
        try cache(TestFixtures.noteResponse(id: "coll", title: "Collection", type: "book"))
        try cacheChild("a", of: "coll", position: 10, body: "<p>A</p>", childBranchIds: ["b_a_a1"])
        try cacheChild("a1", of: "a", position: 1, body: "<p>A1</p>", childBranchIds: ["b_a1_a11"])
        try cacheChild("a11", of: "a1", position: 1, body: "<p>A11</p>")
        try persistence.commitBatch()

        let row = await vm.loadCollectionListRow(noteId: "a", level: 1, includeArchived: false, expandDepth: 2)

        XCTAssertEqual(row?.children.first?.isHydrated, true, "level 2 is within #expanded=2")
        XCTAssertEqual(row?.children.first?.children.first?.id, "a11")
        XCTAssertEqual(row?.children.first?.children.first?.isHydrated, false, "level 3 stays closed")
    }

    func testRowTreeHelpers() {
        let child = M.Child(noteId: "x", title: "x", type: .text, mime: "", isProtected: false, iconClass: "bx bx-note", isArchived: false, hasChildren: false, colorLabel: nil)
        let leaf = M.ListRow(child: M.Child(noteId: "leaf", title: "leaf", type: .text, mime: "", isProtected: false, iconClass: "bx bx-note", isArchived: false, hasChildren: false, colorLabel: nil), level: 2)
        let rows = [M.ListRow(child: child, level: 1, isExpanded: true, isHydrated: true, children: [leaf])]
        XCTAssertEqual(CollectionNoteView.level(of: "leaf", in: rows), 2)
        XCTAssertNil(CollectionNoteView.level(of: "missing", in: rows))
        let replaced = CollectionNoteView.replacing(M.ListRow(child: leaf.child, level: 2, isExpanded: true, isHydrated: true), in: rows)
        XCTAssertEqual(replaced[0].children[0].isHydrated, true)
        let toggled = CollectionNoteView.updating("x", in: rows) { $0.isExpanded = false }
        XCTAssertEqual(toggled[0].isExpanded, false)
    }

    // MARK: Table view

    func testTableRowsOfflineCarryValuesRelationsAndNesting() async throws {
        let vm = try await makeViewModel(noteId: "coll")
        let collection = TestFixtures.noteResponse(id: "coll", title: "Collection", type: "book", attributes: [
            label("viewType", "table", on: "coll"),
            AttributeResponse(attributeId: "def-due", noteId: "coll", type: "label", name: "label:due", value: "promoted,alias=Due,single,date", position: 0, isInheritable: true, utcDateModified: nil),
            AttributeResponse(attributeId: "def-owner", noteId: "coll", type: "label", name: "relation:owner", value: "promoted,single", position: 1, isInheritable: true, utcDateModified: nil),
            AttributeResponse(attributeId: "def-prio", noteId: "coll", type: "label", name: "label:prio", value: "single,number", position: 2, isInheritable: true, utcDateModified: nil),
        ])
        try cache(collection)
        try cache(TestFixtures.noteResponse(id: "person", title: "Person", attributes: [label("iconClass", "bx bx-user", on: "person")]))
        try cacheChild("t1", of: "coll", position: 10, attributes: [
            label("due", "2026-01-02", on: "t1"),
            AttributeResponse(attributeId: "r-t1-owner", noteId: "t1", type: "relation", name: "owner", value: "person", position: 0, isInheritable: false, utcDateModified: nil),
        ], childBranchIds: ["b_t1_t1a"])
        try cacheChild("t1a", of: "t1", position: 10, attributes: [label("prio", "3", on: "t1a")])
        try cacheChild("t2", of: "coll", position: 20, attributes: [label("prio", "7", on: "t2")])
        try persistence.commitBatch()

        let item = NoteItem(from: collection)
        let children = await vm.loadCollectionChildren(for: item, embedsHidden: false)
        let table = await vm.loadCollectionTable(for: item, children: children)

        XCTAssertEqual(table.columns.filter(\.isVisible).map(\.field.key), ["#", "title", "labels.due", "relations.owner", "labels.prio"])
        XCTAssertEqual(table.rows.map(\.id), ["t1", "t2"])
        XCTAssertEqual(table.rows[0].labels["due"], ["2026-01-02"])
        XCTAssertEqual(table.rows[0].relations["owner"]?.map(\.title), ["Person"])
        XCTAssertEqual(table.rows[0].relations["owner"]?.first?.iconClass, "bx bx-user")
        XCTAssertEqual(table.rows[0].children.map(\.id), ["t1a"], "children get rows under their parent")
        XCTAssertEqual(table.rows[0].children[0].level, 1)
        XCTAssertEqual(table.rows[0].children[0].labels["prio"], ["3"])
        XCTAssertEqual(table.rows[1].labels["prio"], ["7"])
        XCTAssertNil(table.rows[1].labels["due"])
    }

    func testTableNestingStopsAtMaxNestingDepth() async throws {
        let vm = try await makeViewModel(noteId: "coll")
        let collection = TestFixtures.noteResponse(id: "coll", title: "Collection", type: "book", attributes: [label("maxNestingDepth", "0", on: "coll")])
        try cache(collection)
        try cacheChild("t1", of: "coll", position: 10, childBranchIds: ["b_t1_t1a"])
        try cacheChild("t1a", of: "t1", position: 10)
        try persistence.commitBatch()

        let item = NoteItem(from: collection)
        let children = await vm.loadCollectionChildren(for: item, embedsHidden: false)
        XCTAssertEqual(children.maxNestingDepthLabel, "0")
        let table = await vm.loadCollectionTable(for: item, children: children)

        XCTAssertEqual(table.rows.map(\.id), ["t1"])
        XCTAssertTrue(table.rows[0].children.isEmpty)
        XCTAssertTrue(table.rows[0].child.hasChildren)
    }
}
