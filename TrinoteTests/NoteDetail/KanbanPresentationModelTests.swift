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

    func testArchivedColumnsAndCardsShowOnlyWhenTheBoardShowsArchivedNotes() {
        let stored = [Models.BoardColumn(value: "Todo"), Models.BoardColumn(value: "Old", fields: ["archived": .bool(true)])]
        let cards = [
            Models.Card(noteId: "c1", branchId: "b1", title: "Live", columnValue: "Todo", notePosition: 0),
            Models.Card(noteId: "c2", branchId: "b2", title: "Filed", columnValue: "Todo", notePosition: 1, labels: ["archived": ""]),
            Models.Card(noteId: "c3", branchId: "b3", title: "Old card", columnValue: "Old", notePosition: 0),
        ]
        let hidden = Models.buildColumns(storedColumns: stored, cards: cards)
        XCTAssertEqual(hidden.map(\.value), ["Todo"])
        XCTAssertEqual(hidden[0].cards.map(\.noteId), ["c1"])

        let shown = Models.buildColumns(storedColumns: stored, cards: cards, showArchived: true)
        XCTAssertEqual(shown.map(\.value), ["Todo", "Old"])
        XCTAssertEqual(shown.map(\.isArchived), [false, true])
        XCTAssertEqual(shown[0].cards.map(\.noteId), ["c1", "c2"])

        let attrs = [AttributeItem(attributeId: "a", noteId: "board", type: .label, name: "includeArchived", value: "", position: 0, isInheritable: false)]
        XCTAssertTrue(Models.showsArchived(attrs))
        XCTAssertFalse(Models.showsArchived([]))
    }

    func testReorderWithArchivedColumnsShownMovesThemToo() {
        let stored = [Models.BoardColumn(value: "A"), Models.BoardColumn(value: "Old", fields: ["archived": .bool(true)]), Models.BoardColumn(value: "B")]
        let reordered = Models.reorderedColumns(stored: stored, shownOrder: ["B", "Old", "A"], showInbox: false, showArchived: true, makeColumnId: { "x" })
        XCTAssertEqual(reordered.map(\.value), ["B", "Old", "A"])
        XCTAssertTrue(reordered[1].isArchived)
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

    func testColumnAddedBesideAnotherIsStoredInPlace() {
        let stored = [
            Models.BoardColumn(value: "A"),
            Models.BoardColumn(value: "Old", fields: ["archived": .bool(true)]),
            Models.BoardColumn(value: "B"),
        ]
        let left = Models.reorderedColumns(stored: stored, shownOrder: ["New", "A", "B"], showInbox: false, makeColumnId: { "n1" })
        // The archived column keeps its stored slot; the shown columns take the new order around it.
        XCTAssertEqual(left.map(\.value), ["New", "Old", "A", "B"])
        XCTAssertEqual(left.first?.fields["id"], .string("n1"))

        let right = Models.reorderedColumns(stored: stored, shownOrder: ["A", "New", "B"], showInbox: false, makeColumnId: { "n1" })
        XCTAssertEqual(right.filter { !$0.isArchived }.map(\.value), ["A", "New", "B"])
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

    func testGroupingOptionsListStatusSelectDefinitionsAndTheCurrentGrouping() {
        func definition(_ name: String, _ value: String, position: Int) -> AttributeItem {
            AttributeItem(attributeId: name, noteId: "board", type: .label, name: name, value: value, position: position, isInheritable: true)
        }
        let attrs = [
            definition("label:status", "promoted,alias=Stage,single,select", position: 0),
            definition("label:priority", "promoted,single,select", position: 1),
            definition("label:due", "promoted,single,date", position: 2),
            definition("label:area", "promoted,alias=Area,single,select", position: 3),
        ]
        let byDefault = Models.groupingOptions(boardAttributes: attrs, current: .default)
        XCTAssertEqual(byDefault, [
            Models.GroupingOption(value: "status", title: "Stage"),
            Models.GroupingOption(value: "priority", title: "priority"),
            Models.GroupingOption(value: "area", title: "Area"),
        ])
        let byRelation = Models.groupingOptions(boardAttributes: [], current: Models.GroupBy("~owner"))
        XCTAssertEqual(byRelation.map(\.value), ["status", "~owner"])
        XCTAssertEqual(byRelation[0].title, "Status")
    }

    func testRelationGroupingReadsRelationsOnly() {
        let attrs = [
            AttributeItem(attributeId: "a1", noteId: "c1", type: .label, name: "owner", value: "label-value", position: 0, isInheritable: false),
            AttributeItem(attributeId: "a2", noteId: "c1", type: .relation, name: "owner", value: "person1", position: 1, isInheritable: false),
        ]
        XCTAssertEqual(Models.columnValue(from: attrs, groupBy: Models.GroupBy("~owner")), "person1")
        XCTAssertEqual(Models.columnValue(from: attrs, groupBy: Models.GroupBy("owner")), "label-value")
    }

    func testColumnFieldsReachTheBoard() {
        let stored = [
            Models.BoardColumn(value: "To Do", fields: ["icon": .string("bx bx-bug"), "color": .string("#f00"), "limit": .int(1), "collapsed": .bool(true)]),
        ]
        let cards = [
            Models.Card(noteId: "c1", branchId: "b1", title: "A", columnValue: "To Do", notePosition: 0),
            Models.Card(noteId: "c2", branchId: "b2", title: "B", columnValue: "To Do", notePosition: 1),
        ]
        let column = Models.buildColumns(storedColumns: stored, cards: cards)[0]
        XCTAssertEqual(column.icon, "bx bx-bug")
        XCTAssertEqual(column.color, "#f00")
        XCTAssertEqual(column.limit, 1)
        XCTAssertTrue(column.isOverLimit)
        XCTAssertTrue(column.isCollapsed)
        XCTAssertFalse(Models.buildColumns(storedColumns: [Models.BoardColumn(value: "To Do", fields: ["limit": .int(0)])], cards: cards)[0].isOverLimit)
    }

    func testCollapseFlagsAreWrittenLikeTheWebBoard() {
        let stored = [
            Models.BoardColumn(value: "A", fields: ["id": .string("a1"), "icon": .string("bx bx-bug")]),
            Models.BoardColumn(value: "C", fields: ["collapsed": .bool(true), "keepCollapsed": .bool(true)]),
        ]
        let kept = Models.settingCollapse(ofColumn: "A", collapsed: true, keepCollapsed: true, stored: stored, shownOrder: ["A", "C"])
        XCTAssertEqual(kept[0].fields, ["id": .string("a1"), "icon": .string("bx bx-bug"), "collapsed": .bool(true), "keepCollapsed": .bool(true)])

        // Off is removed, not stored as false; `nil` leaves a flag alone.
        let released = Models.settingCollapse(ofColumn: "C", collapsed: nil, keepCollapsed: false, stored: stored, shownOrder: ["A", "C"])
        XCTAssertEqual(released[1].fields, ["collapsed": .bool(true)])
        let opened = Models.settingCollapse(ofColumn: "C", collapsed: false, keepCollapsed: false, stored: stored, shownOrder: ["A", "C"])
        XCTAssertEqual(opened[1].fields, [:])

        let columns = Models.buildColumns(storedColumns: stored, cards: [])
        XCTAssertEqual(columns.map(\.isKeptCollapsed), [false, true])
    }

    func testCollapsingAColumnWithoutAnEntryStoresItWhereTheBoardDrawsIt() {
        let stored = [Models.BoardColumn(value: "A"), Models.BoardColumn(value: "C")]
        let shown = ["", "A", "B", "C", "D"]
        XCTAssertEqual(Models.settingCollapse(ofColumn: "B", collapsed: true, keepCollapsed: nil, stored: stored, shownOrder: shown).map(\.value), ["A", "B", "C"])
        XCTAssertEqual(Models.settingCollapse(ofColumn: "", collapsed: true, keepCollapsed: nil, stored: stored, shownOrder: shown).map(\.value), ["", "A", "C"])
        XCTAssertEqual(Models.settingCollapse(ofColumn: "D", collapsed: true, keepCollapsed: nil, stored: stored, shownOrder: shown).map(\.value), ["A", "C", "D"])
        let inserted = Models.settingCollapse(ofColumn: "B", collapsed: true, keepCollapsed: nil, stored: stored, shownOrder: shown)
        XCTAssertEqual(inserted[1].fields, ["collapsed": .bool(true)])
    }

    // MARK: - Card order

    private func label(_ name: String, _ value: String, inheritable: Bool = false) -> AttributeItem {
        AttributeItem(attributeId: name, noteId: "board", type: .label, name: name, value: value, position: 0, isInheritable: inheritable)
    }

    func testSortKeyParsing() {
        XCTAssertEqual(Models.SortKey("title"), .title)
        XCTAssertEqual(Models.SortKey("creationDate"), .creationDate)
        XCTAssertEqual(Models.SortKey("attr:priority"), .attribute("priority"))
        XCTAssertNil(Models.SortKey("attr:"))
        XCTAssertNil(Models.SortKey("manual"))
        XCTAssertNil(Models.SortKey(nil))
    }

    func testColumnOrderWinsOverBoardOrderAndManualKeepsTreeOrder() {
        let board = Models.boardSort([label("board:sortColumns", "title"), label("board:sortColumnsDescending", "")])
        XCTAssertEqual(board, Models.ColumnSort(key: .title, descending: true))
        XCTAssertNil(Models.boardSort([label("board:sortColumns", "nonsense")]))

        XCTAssertEqual(Models.columnSort(for: nil, boardSort: board), board)
        XCTAssertEqual(Models.columnSort(for: Models.BoardColumn(value: "A", fields: ["orderBy": .string("default")]), boardSort: board), board)
        XCTAssertNil(Models.columnSort(for: Models.BoardColumn(value: "A", fields: ["orderBy": .string("manual")]), boardSort: board))
        XCTAssertEqual(
            Models.columnSort(for: Models.BoardColumn(value: "A", fields: ["orderBy": .string("attr:due"), "descendingOrder": .bool(true)]), boardSort: board),
            Models.ColumnSort(key: .attribute("due"), descending: true)
        )
    }

    func testSortedCardsPutsMissingValuesLastInEitherDirection() {
        func card(_ id: String, priority: String?, created: String) -> Models.Card {
            Models.Card(noteId: id, branchId: id, title: id, columnValue: "A", notePosition: 0, creationDate: created,
                        labels: priority.map { ["priority": $0] } ?? [:])
        }
        let cards = [
            card("none", priority: nil, created: "2026-01-01"),
            card("ten", priority: "10", created: "2026-01-02"),
            card("two", priority: "2", created: "2026-01-03"),
            card("twoOlder", priority: "2", created: "2025-12-31"),
        ]
        let ascending = Models.sortedCards(cards, by: Models.ColumnSort(key: .attribute("priority"), descending: false), relationTitle: { _ in nil })
        XCTAssertEqual(ascending.map(\.noteId), ["twoOlder", "two", "ten", "none"], "numbers compare numerically, ties by creation date")
        let descending = Models.sortedCards(cards, by: Models.ColumnSort(key: .attribute("priority"), descending: true), relationTitle: { _ in nil })
        XCTAssertEqual(descending.map(\.noteId), ["ten", "twoOlder", "two", "none"])
    }

    func testSortedCardsUsesRelationTargetTitles() {
        let cards = [
            Models.Card(noteId: "c1", branchId: "b1", title: "c1", columnValue: "A", notePosition: 0, relations: ["owner": "zed"]),
            Models.Card(noteId: "c2", branchId: "b2", title: "c2", columnValue: "A", notePosition: 1, relations: ["owner": "amy"]),
        ]
        let titles = ["zed": "Alice", "amy": "Bob"]
        let sorted = Models.sortedCards(cards, by: Models.ColumnSort(key: .attribute("owner"), descending: false), relationTitle: { titles[$0] })
        XCTAssertEqual(sorted.map(\.noteId), ["c1", "c2"])
    }

    func testBuildColumnsAppliesBoardOrderToColumnsWithoutTheirOwn() {
        let stored = [Models.BoardColumn(value: "A"), Models.BoardColumn(value: "B", fields: ["orderBy": .string("manual")])]
        let cards = [
            Models.Card(noteId: "a2", branchId: "1", title: "Zulu", columnValue: "A", notePosition: 0),
            Models.Card(noteId: "a1", branchId: "2", title: "Alpha", columnValue: "A", notePosition: 1),
            Models.Card(noteId: "b2", branchId: "3", title: "Zulu", columnValue: "B", notePosition: 0),
            Models.Card(noteId: "b1", branchId: "4", title: "Alpha", columnValue: "B", notePosition: 1),
        ]
        let columns = Models.buildColumns(storedColumns: stored, cards: cards, boardSort: Models.ColumnSort(key: .title, descending: false))
        XCTAssertEqual(columns[0].cards.map(\.noteId), ["a1", "a2"])
        XCTAssertEqual(columns[1].cards.map(\.noteId), ["b2", "b1"])
    }

    func testColumnSortPatchKeepsBoardDefaultAndDropsFalseDirection() {
        let stored = [Models.BoardColumn(value: "A", fields: ["orderBy": .string("title"), "descendingOrder": .bool(true), "icon": .string("bx bx-bug")])]
        let toDefault = Models.patchingColumn("A", with: ["orderBy": .string("default")], stored: stored, shownOrder: ["A"])
        XCTAssertEqual(toDefault[0].fields["orderBy"], .string("default"), "Board's Default is stored, not dropped")
        XCTAssertEqual(toDefault[0].fields["descendingOrder"], .bool(true))
        let ascending = Models.patchingColumn("A", with: ["descendingOrder": .bool(false)], stored: stored, shownOrder: ["A"])
        XCTAssertNil(ascending[0].fields["descendingOrder"])
        XCTAssertEqual(ascending[0].fields["icon"], .string("bx bx-bug"))

        XCTAssertEqual(Models.sortSelection(storedOrderBy: nil), "default")
        XCTAssertEqual(Models.sortSelection(storedOrderBy: "default"), "default")
        XCTAssertEqual(Models.sortSelection(storedOrderBy: "manual"), "manual")
        XCTAssertEqual(Models.sortSelection(storedOrderBy: "attr:due"), "attr:due")
    }

    func testColumnLimitIsStoredAsANumberAndRemovedWhenOff() {
        let stored = [Models.BoardColumn(value: "A", fields: ["id": .string("a1")])]
        let limited = Models.patchingColumn("A", with: ["limit": .int(3)], stored: stored, shownOrder: ["A"])
        XCTAssertEqual(limited[0].fields["limit"], .int(3))
        XCTAssertEqual(limited[0].limit, 3)
        let json = try? String(decoding: Models.encodeBoardConfig(Models.BoardConfig().settingColumns(limited, forKey: "columns")), as: UTF8.self)
        XCTAssertTrue(json?.contains(#""limit":3"#) == true)

        let unlimited = Models.patchingColumn("A", with: ["limit": nil], stored: limited, shownOrder: ["A"])
        XCTAssertNil(unlimited[0].fields["limit"])
        XCTAssertEqual(unlimited[0].fields["id"], .string("a1"))
    }

    func testResortedColumnReordersCardsAtOnce() {
        let cards = [
            Models.Card(noteId: "z", branchId: "1", title: "Zulu", columnValue: "A", notePosition: 0),
            Models.Card(noteId: "a", branchId: "2", title: "Alpha", columnValue: "A", notePosition: 1),
            Models.Card(noteId: "m", branchId: "3", title: "Mike", columnValue: "A", notePosition: 2),
        ]
        let column = Models.Column(value: "A", cards: cards)
        let byTitle = Models.resorted(column, orderBy: "title", descending: true, boardSort: nil, relationTitle: { _ in nil })
        XCTAssertEqual(byTitle.cards.map(\.noteId), ["z", "m", "a"])
        XCTAssertEqual(byTitle.effectiveSort, Models.ColumnSort(key: .title, descending: true))
        XCTAssertEqual(byTitle.sortSelection, "title")

        let manual = Models.resorted(byTitle, orderBy: "manual", descending: true, boardSort: nil, relationTitle: { _ in nil })
        XCTAssertEqual(manual.cards.map(\.noteId), ["z", "a", "m"], "manual is tree order")
        XCTAssertNil(manual.effectiveSort)

        let boardOrder = Models.ColumnSort(key: .title, descending: false)
        let followingBoard = Models.resorted(manual, orderBy: "default", descending: false, boardSort: boardOrder, relationTitle: { _ in nil })
        XCTAssertEqual(followingBoard.cards.map(\.noteId), ["a", "m", "z"])
        XCTAssertEqual(followingBoard.sortSelection, "default")
    }

    func testClonedCardKnowsItHasOtherParents() {
        XCTAssertFalse(Models.Card(noteId: "c", branchId: "b", title: "C", columnValue: "A", notePosition: 0).isClonedElsewhere)
        XCTAssertTrue(Models.Card(noteId: "c", branchId: "b", title: "C", columnValue: "A", notePosition: 0, parentNoteCount: 2).isClonedElsewhere)
    }

    // MARK: - Card properties, redirect and template

    func testCardPropertiesFollowBoardSettingsAndSkipTheGrouping() {
        let attributes = [
            label("label:due", "promoted,alias=Due date,single,date", inheritable: true),
            label("relation:owner", "promoted,single", inheritable: true),
            label("label:status", "promoted,single,text", inheritable: true),
            label("label:secret", "promoted,single,text", inheritable: true),
            label("label:local", "promoted", inheritable: false),
        ]
        let settings: Models.JSONValue = .array([
            .object(["name": .string("owner")]),
            .object(["name": .string("secret"), "hidden": .bool(true)]),
        ])
        let properties = Models.cardProperties(boardAttributes: attributes, settings: settings, groupBy: .default)
        XCTAssertEqual(properties, [
            Models.CardProperty(name: "owner", title: "owner", isRelation: true),
            Models.CardProperty(name: "due", title: "Due date", isRelation: false),
        ])
    }

    func testCardRedirectReadsCurrentAndLegacyRelation() {
        let current = Models.Card.attributeMaps([
            AttributeItem(attributeId: "r", noteId: "c", type: .relation, name: "board:cardRedirectTo", value: "target", position: 0, isInheritable: false),
        ])
        XCTAssertEqual(Models.Card(noteId: "c", branchId: "b", title: "C", columnValue: "A", notePosition: 0, relations: current.relations).redirectNoteId, "target")
        let legacy = Models.Card(noteId: "c", branchId: "b", title: "C", columnValue: "A", notePosition: 0, relations: ["boardCardRedirectTo": "old"])
        XCTAssertEqual(legacy.redirectNoteId, "old")
    }

    func testCardTemplateReadsTypeAndTemplateIds() {
        func config(_ fields: [String: Models.JSONValue]) -> Models.BoardConfig { Models.BoardConfig(fields: fields) }
        XCTAssertEqual(Models.CardTemplate(config: config(["template": .string("template:tpl123")])), .template(noteId: "tpl123"))
        XCTAssertEqual(Models.CardTemplate(config: config(["template": .string("type:code:text/x-markdown")])), .noteType(type: "code", mime: "text/x-markdown"))
        XCTAssertEqual(Models.CardTemplate(config: config(["templates": .array([.string("type:canvas")])])), .noteType(type: "canvas", mime: nil))
        XCTAssertNil(Models.CardTemplate(config: config(["template": .string("_template_text")])))
        XCTAssertNil(Models.CardTemplate(config: nil))
    }

    // MARK: - Template lookup query

    func testTemplateTitleSearchQueryTargetsTemplateNoteTitles() {
        XCTAssertEqual(AppState.templateTitleSearchQuery(title: "Geo Map"), #"#template note.title = "Geo Map""#)
        XCTAssertEqual(AppState.templateTitleSearchQuery(title: #"A "B" \ C"#), #"#template note.title = "A \"B\" \\ C""#)
    }
}
