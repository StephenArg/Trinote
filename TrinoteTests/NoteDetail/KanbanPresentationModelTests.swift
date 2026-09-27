import XCTest
@testable import Trinote

final class KanbanPresentationModelTests: XCTestCase {

    // MARK: - Board config

    func testDecodeBoardConfigColumns() throws {
        let json = #"{"columns":[{"value":"To Do"},{"value":"In Progress"},{"value":"Done"}]}"#
        let config = KanbanBoardModels.decodeBoardConfig(from: Data(json.utf8))
        XCTAssertEqual(config?.columns?.map(\.value), ["To Do", "In Progress", "Done"])
    }

    func testEncodeRoundTripBoardConfig() throws {
        let config = KanbanBoardModels.BoardConfig(columns: [
            .init(value: "Backlog"),
            .init(value: "Done"),
        ])
        let data = try KanbanBoardModels.encodeBoardConfig(config)
        let decoded = KanbanBoardModels.decodeBoardConfig(from: data)
        XCTAssertEqual(decoded, config)
    }

    // MARK: - Group-by normalization

    func testNormalizedGroupByDefaultStatus() {
        XCTAssertEqual(KanbanBoardModels.normalizedGroupByAttributeName(nil), "status")
        XCTAssertEqual(KanbanBoardModels.normalizedGroupByAttributeName(""), "status")
        XCTAssertEqual(KanbanBoardModels.normalizedGroupByAttributeName("  "), "status")
    }

    func testNormalizedGroupByStripsHashAndTilde() {
        XCTAssertEqual(KanbanBoardModels.normalizedGroupByAttributeName("#priority"), "priority")
        XCTAssertEqual(KanbanBoardModels.normalizedGroupByAttributeName("~owner"), "owner")
        XCTAssertEqual(KanbanBoardModels.normalizedGroupByAttributeName("status"), "status")
    }

    // MARK: - Column build / grouping

    func testBuildColumnsMergesConfigOrderAndDiscoveredCards() {
        let config = KanbanBoardModels.BoardConfig(columns: [
            .init(value: "To Do"),
            .init(value: "Done"),
            .init(value: "Empty"),
        ])
        let cards = [
            KanbanBoardModels.Card(noteId: "c1", branchId: "b1", title: "A", columnValue: "Done", notePosition: 20),
            KanbanBoardModels.Card(noteId: "c2", branchId: "b2", title: "B", columnValue: "To Do", notePosition: 10),
            KanbanBoardModels.Card(noteId: "c3", branchId: "b3", title: "C", columnValue: "Later", notePosition: 5),
        ]
        let columns = KanbanBoardModels.buildColumns(config: config, cards: cards)
        XCTAssertEqual(columns.map(\.value), ["To Do", "Done", "Empty", "Later"])
        XCTAssertEqual(columns[0].cards.map(\.noteId), ["c2"])
        XCTAssertEqual(columns[1].cards.map(\.noteId), ["c1"])
        XCTAssertTrue(columns[2].cards.isEmpty)
        XCTAssertEqual(columns[3].cards.map(\.noteId), ["c3"])
    }

    func testBuildColumnsSortsCardsByNotePosition() {
        let cards = [
            KanbanBoardModels.Card(noteId: "c2", branchId: "b2", title: "Second", columnValue: "To Do", notePosition: 200),
            KanbanBoardModels.Card(noteId: "c1", branchId: "b1", title: "First", columnValue: "To Do", notePosition: 100),
        ]
        let columns = KanbanBoardModels.buildColumns(config: nil, cards: cards)
        XCTAssertEqual(columns.count, 1)
        XCTAssertEqual(columns[0].cards.map(\.noteId), ["c1", "c2"])
    }

    func testBuildColumnsHonorsReorderedBoardConfig() {
        let config = KanbanBoardModels.BoardConfig(columns: [
            .init(value: "Done"),
            .init(value: "To Do"),
            .init(value: "In Progress"),
        ])
        let cards = [
            KanbanBoardModels.Card(noteId: "c1", branchId: "b1", title: "A", columnValue: "To Do", notePosition: 0),
            KanbanBoardModels.Card(noteId: "c2", branchId: "b2", title: "B", columnValue: "Done", notePosition: 0),
            KanbanBoardModels.Card(noteId: "c3", branchId: "b3", title: "C", columnValue: "In Progress", notePosition: 0),
        ]
        let columns = KanbanBoardModels.buildColumns(config: config, cards: cards)
        XCTAssertEqual(columns.map(\.value), ["Done", "To Do", "In Progress"])
    }

    func testColumnValueFromLabelOrRelation() {
        let attrs: [AttributeItem] = [
            AttributeItem(
                attributeId: "a1", noteId: "n1", type: .label, name: "status",
                value: "In Progress", position: 0, isInheritable: false
            ),
        ]
        XCTAssertEqual(KanbanBoardModels.columnValue(from: attrs, groupByName: "status"), "In Progress")
        XCTAssertNil(KanbanBoardModels.columnValue(from: attrs, groupByName: "priority"))

        let relAttrs: [AttributeItem] = [
            AttributeItem(
                attributeId: "r1", noteId: "n1", type: .relation, name: "owner",
                value: "person1", position: 0, isInheritable: false
            ),
        ]
        XCTAssertEqual(KanbanBoardModels.columnValue(from: relAttrs, groupByName: "owner"), "person1")
    }

    // MARK: - Presentation models

    func testBuildSlidesHorizontalAndVertical() {
        let horizontal = [
            (noteId: "s1", branchId: "b1", title: "Intro", html: "<p>Hi</p>", background: "#ffffff" as String?),
            (noteId: "s2", branchId: "b2", title: "Deep", html: "<p>Main</p>", background: nil as String?),
        ]
        let vertical: [String: [(noteId: String, branchId: String, title: String, html: String, background: String?)]] = [
            "s2": [
                (noteId: "s2a", branchId: "b2a", title: "Nested", html: "<p>V</p>", background: nil),
            ],
        ]
        let slides = PresentationModels.buildSlides(horizontal: horizontal, verticalByParent: vertical)
        XCTAssertEqual(slides.count, 2)
        XCTAssertEqual(slides[0].title, "Intro")
        XCTAssertTrue(slides[0].verticalSlides.isEmpty)
        XCTAssertEqual(slides[1].verticalSlides.count, 1)
        XCTAssertEqual(slides[1].verticalSlides[0].noteId, "s2a")
    }

    func testNormalizedThemeDefaultsToWhite() {
        XCTAssertEqual(PresentationModels.normalizedTheme(nil), "white")
        XCTAssertEqual(PresentationModels.normalizedTheme("  "), "white")
        XCTAssertEqual(PresentationModels.normalizedTheme("Dracula"), "dracula")
    }

    func testThemeStyleUsesRevealColorsAndFallsBackToWhite() {
        let moon = PresentationModels.style(for: "Moon")
        XCTAssertEqual(moon.background, "#002b36")
        XCTAssertEqual(moon.text, "#93a1a1")
        XCTAssertEqual(moon.heading, "#eee8d5")
        XCTAssertEqual(PresentationModels.style(for: "no-such-theme"), PresentationModels.style(for: "white"))
        XCTAssertEqual(PresentationModels.style(for: nil), PresentationModels.style(for: "white"))
        XCTAssertNotNil(PresentationModels.style(for: "league").radialGradient)
        for theme in PresentationModels.availableThemes(includeExtended: true) {
            XCTAssertNotNil(PresentationModels.themeStyles[theme], "missing style for \(theme)")
        }
    }

    func testExtendedThemesOnlyOfferedWhenServerSupportsThem() {
        XCTAssertFalse(PresentationModels.availableThemes(includeExtended: false).contains("league"))
        XCTAssertTrue(PresentationModels.availableThemes(includeExtended: true).contains("black-contrast"))
        XCTAssertEqual(PresentationModels.displayName(for: "dracula"), "Dracula")
    }

    func testIsGradientBackground() {
        XCTAssertTrue(PresentationModels.isGradientBackground("linear-gradient(red, blue)"))
        XCTAssertFalse(PresentationModels.isGradientBackground("#ff0000"))
    }

    // MARK: - Board config (Trilium v0.106 board overhaul)

    private typealias Models = KanbanBoardModels

    private let richBoardJSON = #"""
    {"columns":[{"value":"To Do","id":"c1","icon":"bx bx-bug","color":"#f00","limit":3},{"value":"Done","archived":true}],
     "priorityViewColumns":[{"value":"High","collapsed":true}],
     "templates":["_template_text"],"promotedAttributes":[{"name":"due","visible":true}],"filterQuery":"#urgent"}
    """#

    /// Earlier Trinote versions created `board.json` with base64 text as its content.
    func testDecodeBoardConfigReadsLegacyBase64AndEmptyContent() throws {
        let json = #"{"columns":[{"value":"A"},{"value":"B"}]}"#
        let legacy = Data(Data(json.utf8).base64EncodedString().utf8)
        XCTAssertEqual(Models.decodeBoardConfig(from: legacy)?.columns?.map(\.value), ["A", "B"])
        XCTAssertEqual(Models.decodeBoardConfig(from: Data("  ".utf8)), Models.BoardConfig())
        XCTAssertNil(Models.decodeBoardConfig(from: Data("not json".utf8)))
    }

    func testGroupByParsesLabelsAndRelations() {
        XCTAssertEqual(Models.GroupBy(nil), .default)
        XCTAssertEqual(Models.GroupBy("#priority"), Models.GroupBy(name: "priority", isRelation: false))
        XCTAssertEqual(Models.GroupBy("~owner"), Models.GroupBy(name: "owner", isRelation: true))
        XCTAssertEqual(Models.GroupBy("~owner").rawValue, "~owner")
        XCTAssertEqual(Models.GroupBy("~").rawValue, "status")
    }

    func testColumnsKeyFollowsGroupingOnlyForPerGroupingServers() {
        XCTAssertEqual(Models.GroupBy("status").columnsKey(perGroupingLists: true), "columns")
        XCTAssertEqual(Models.GroupBy("#status").columnsKey(perGroupingLists: true), "columns")
        XCTAssertEqual(Models.GroupBy("priority").columnsKey(perGroupingLists: true), "priorityViewColumns")
        XCTAssertEqual(Models.GroupBy("~owner").columnsKey(perGroupingLists: true), "~ownerViewColumns")
        XCTAssertEqual(Models.GroupBy("priority").columnsKey(perGroupingLists: false), "columns")
    }

    func testSavingColumnsKeepsUnknownKeysAndColumnFields() throws {
        let config = try XCTUnwrap(Models.decodeBoardConfig(from: Data(richBoardJSON.utf8)))
        let stored = try XCTUnwrap(config.columns(forKey: "columns"))
        let reordered = Models.reorderedColumns(
            stored: stored,
            shownOrder: ["Doing", "To Do"],
            showInbox: false,
            makeColumnId: { "newid" }
        )
        let saved = config.settingColumns(reordered, forKey: "columns")
        let roundTripped = try XCTUnwrap(Models.decodeBoardConfig(from: Models.encodeBoardConfig(saved)))

        XCTAssertEqual(roundTripped.fields["templates"], .array([.string("_template_text")]))
        XCTAssertEqual(roundTripped.fields["filterQuery"], .string("#urgent"))
        XCTAssertNotNil(roundTripped.fields["promotedAttributes"])
        XCTAssertEqual(roundTripped.columns(forKey: "priorityViewColumns")?.first?.fields["collapsed"], .bool(true))

        let columns = try XCTUnwrap(roundTripped.columns(forKey: "columns"))
        XCTAssertEqual(columns.map(\.value), ["Doing", "Done", "To Do"])
        XCTAssertEqual(columns[0].fields["id"], .string("newid"))
        XCTAssertTrue(columns[1].isArchived, "hidden archived column keeps its slot")
        XCTAssertEqual(columns[2].fields["icon"], .string("bx bx-bug"))
        XCTAssertEqual(columns[2].fields["limit"], .int(3))
    }

    func testLegacyColumnsAreReadAndMovedUnderTheirGrouping() throws {
        let legacy = try XCTUnwrap(Models.decodeBoardConfig(from: Data(#"{"columns":[{"value":"P1"}],"template":"t"}"#.utf8)))
        XCTAssertEqual(legacy.columns(forKey: "priorityViewColumns")?.map(\.value), ["P1"])

        let saved = legacy.settingColumns([Models.BoardColumn(value: "P1"), Models.BoardColumn(value: "P2")], forKey: "priorityViewColumns")
        XCTAssertNil(saved.fields["columns"])
        XCTAssertEqual(saved.columns(forKey: "priorityViewColumns")?.map(\.value), ["P1", "P2"])
        XCTAssertEqual(saved.fields["template"], .string("t"))

        // Once any grouping has its own list, `columns` belongs to the default grouping alone.
        let switched = try XCTUnwrap(Models.decodeBoardConfig(from: Data(#"{"columns":[{"value":"S"}],"ownerViewColumns":[]}"#.utf8)))
        XCTAssertNil(switched.columns(forKey: "priorityViewColumns"))
    }

    func testBuildColumnsHidesArchivedColumnsAndTheirCards() {
        let stored = [
            Models.BoardColumn(value: "To Do"),
            Models.BoardColumn(value: "Old", fields: ["archived": .bool(true)]),
        ]
        let cards = [
            Models.Card(noteId: "c1", branchId: "b1", title: "A", columnValue: "To Do", notePosition: 0),
            Models.Card(noteId: "c2", branchId: "b2", title: "B", columnValue: "Old", notePosition: 0),
        ]
        let columns = Models.buildColumns(storedColumns: stored, cards: cards)
        XCTAssertEqual(columns.map(\.value), ["To Do"])
    }

    func testBuildColumnsAddsInboxForCardsWithoutValue() {
        let cards = [
            Models.Card(noteId: "c1", branchId: "b1", title: "A", columnValue: "", notePosition: 0),
            Models.Card(noteId: "c2", branchId: "b2", title: "B", columnValue: "Done", notePosition: 0),
        ]
        let stored = [Models.BoardColumn(value: "Done"), Models.BoardColumn(value: "", fields: ["displayName": .string("Triage")])]

        let withInbox = Models.buildColumns(storedColumns: stored, cards: cards, showInbox: true)
        XCTAssertEqual(withInbox.map(\.value), ["Done", ""])
        XCTAssertTrue(withInbox[1].isInbox)
        XCTAssertEqual(withInbox[1].displayTitle, "Triage")
        XCTAssertEqual(withInbox[1].cards.map(\.noteId), ["c1"])

        let unplaced = Models.buildColumns(storedColumns: [Models.BoardColumn(value: "Done")], cards: cards, showInbox: true)
        XCTAssertEqual(unplaced.map(\.value), ["", "Done"])

        let withoutInbox = Models.buildColumns(storedColumns: stored, cards: cards.filter { !$0.columnValue.isEmpty })
        XCTAssertEqual(withoutInbox.map(\.value), ["Done"])
    }

    func testReorderKeepsHiddenInboxEntryWhileInboxIsOff() {
        let stored = [Models.BoardColumn(value: "", fields: ["icon": .string("bx bxs-inbox")]), Models.BoardColumn(value: "A"), Models.BoardColumn(value: "B")]
        let reordered = Models.reorderedColumns(stored: stored, shownOrder: ["B", "A"], showInbox: false, makeColumnId: { "x" })
        XCTAssertEqual(reordered.map(\.value), ["", "B", "A"])
        XCTAssertEqual(reordered[0].fields["icon"], .string("bx bxs-inbox"))
    }

    func testShowsInboxReadsBooleanLabel() {
        func label(_ value: String) -> [AttributeItem] {
            [AttributeItem(attributeId: "a", noteId: "n", type: .label, name: "board:showInbox", value: value, position: 0, isInheritable: false)]
        }
        XCTAssertFalse(Models.showsInbox([]))
        XCTAssertTrue(Models.showsInbox(label("")))
        XCTAssertTrue(Models.showsInbox(label("true")))
        XCTAssertFalse(Models.showsInbox(label("false")))
    }

    func testRelationGroupingReadsRelationsOnly() {
        let attrs = [
            AttributeItem(attributeId: "a1", noteId: "c1", type: .label, name: "owner", value: "label-value", position: 0, isInheritable: false),
            AttributeItem(attributeId: "a2", noteId: "c1", type: .relation, name: "owner", value: "person1", position: 1, isInheritable: false),
        ]
        XCTAssertEqual(Models.columnValue(from: attrs, groupBy: Models.GroupBy("~owner")), "person1")
        XCTAssertEqual(Models.columnValue(from: attrs, groupBy: Models.GroupBy("owner")), "label-value")
    }

    // MARK: - Template lookup query

    func testTemplateTitleSearchQueryTargetsTemplateNoteTitles() {
        XCTAssertEqual(AppState.templateTitleSearchQuery(title: "Geo Map"), #"#template note.title = "Geo Map""#)
        XCTAssertEqual(AppState.templateTitleSearchQuery(title: #"A "B" \ C"#), #"#template note.title = "A \"B\" \\ C""#)
    }
}
