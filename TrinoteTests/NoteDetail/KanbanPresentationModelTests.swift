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

    func testIsGradientBackground() {
        XCTAssertTrue(PresentationModels.isGradientBackground("linear-gradient(red, blue)"))
        XCTAssertFalse(PresentationModels.isGradientBackground("#ff0000"))
    }
}
