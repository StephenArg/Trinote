import XCTest
@testable import Trinote

final class CollectionNoteModelsTests: XCTestCase {
    typealias M = CollectionNoteModels

    private func relation(_ name: String, _ value: String) -> AttributeItem {
        AttributeItem(attributeId: "r-\(name)-\(value)", noteId: "coll", type: .relation, name: name, value: value, position: 0, isInheritable: false)
    }

    func testExpandDepthFollowsTrilium() {
        XCTAssertEqual(M.expandDepth(label: nil), 0)
        XCTAssertEqual(M.expandDepth(label: ""), 1)
        XCTAssertEqual(M.expandDepth(label: "all"), Int.max)
        XCTAssertEqual(M.expandDepth(label: "3"), 3)
        XCTAssertEqual(M.expandDepth(label: "3x"), 3)
        XCTAssertEqual(M.expandDepth(label: "abc"), 0)
    }

    func testPageSizeDefaultsToTwenty() {
        XCTAssertEqual(M.pageSize(label: nil), 20)
        XCTAssertEqual(M.pageSize(label: "0"), 20)
        XCTAssertEqual(M.pageSize(label: "-1"), 20)
        XCTAssertEqual(M.pageSize(label: "x"), 20)
        XCTAssertEqual(M.pageSize(label: "7"), 7)
    }

    func testPaging() {
        let items = Array(1...12)
        XCTAssertEqual(M.pageCount(total: 12, pageSize: 5), 3)
        XCTAssertEqual(M.pageCount(total: 0, pageSize: 5), 1)
        XCTAssertEqual(M.pageItems(items, page: 1, pageSize: 5), [1, 2, 3, 4, 5])
        XCTAssertEqual(M.pageItems(items, page: 3, pageSize: 5), [11, 12])
        XCTAssertEqual(M.pageItems(items, page: 9, pageSize: 5), [11, 12], "past the end clamps to the last page")
        XCTAssertEqual(M.pageItems(items, page: 0, pageSize: 5), [1, 2, 3, 4, 5])
        XCTAssertEqual(M.pageItems([Int](), page: 1, pageSize: 5), [])
    }

    func testTruthyLabel() {
        XCTAssertFalse(M.isTruthyLabel(nil))
        XCTAssertTrue(M.isTruthyLabel(""))
        XCTAssertTrue(M.isTruthyLabel("true"))
        XCTAssertFalse(M.isTruthyLabel("false"))
        XCTAssertFalse(M.isTruthyLabel(" False "))
    }

    func testTopLevelFilterDropsHiddenEmbeddedAndArchived() {
        let relations = [relation("imageLink", "img"), relation("includeNoteLink", "inc"), relation("template", "tpl")]
        let ids = ["a", "_hidden", "img", "inc", "arch", "tpl"]
        let archived: Set<String> = ["arch"]
        XCTAssertEqual(
            M.filterTopLevel(childIds: ids, collectionRelations: relations, includeArchived: false, isArchived: { archived.contains($0) }),
            ["a", "tpl"]
        )
        XCTAssertEqual(
            M.filterTopLevel(childIds: ids, collectionRelations: relations, includeArchived: true, isArchived: { archived.contains($0) }),
            ["a", "arch", "tpl"]
        )
    }

    func testNestedFilterIgnoresIncludeNoteLinks() {
        let relations = [relation("imageLink", "img"), relation("includeNoteLink", "inc")]
        XCTAssertEqual(
            M.filterNested(childIds: ["img", "inc", "x"], parentRelations: relations, includeArchived: false, isArchived: { _ in false }),
            ["inc", "x"]
        )
    }

    func testDashboardLayoutDecoding() {
        let json = """
        {"widgets":{"a":{"x":0,"y":0,"w":4,"h":3},"b":{"x":4,"y":"1","w":8.0,"h":2},"c":{"x":1,"y":2},"d":{"x":11,"y":0,"w":4,"h":0}}}
        """
        let layout = M.DashboardLayout.decode(Data(json.utf8))
        XCTAssertEqual(layout?.widgets["a"], M.DashboardGeometry(x: 0, y: 0, w: 4, h: 3))
        XCTAssertEqual(layout?.widgets["b"], M.DashboardGeometry(x: 4, y: 1, w: 8, h: 2))
        XCTAssertNil(layout?.widgets["c"], "incomplete geometry is dropped")
        XCTAssertEqual(layout?.widgets["d"], M.DashboardGeometry(x: 11, y: 0, w: 4, h: 1), "sizes are clamped to at least one cell")
        XCTAssertEqual(M.DashboardLayout.decode(Data("{}".utf8))?.widgets.isEmpty, true)
        XCTAssertNil(M.DashboardLayout.decode(Data("not json".utf8)))
    }

    func testDashboardPlacement() {
        XCTAssertEqual(M.dashboardPlacement(M.DashboardGeometry(x: 2, y: 1, w: 4, h: 3)), "grid-column: 3 / span 4; grid-row: 2 / span 3; --h: 3;")
        XCTAssertEqual(M.dashboardPlacement(M.DashboardGeometry(x: 10, y: 0, w: 6, h: 2)), "grid-column: 11 / span 2; grid-row: 1 / span 2; --h: 2;", "a widget never spills past the last column")
        XCTAssertEqual(M.dashboardPlacement(nil), "grid-column: span 4; grid-row: span 3; --h: 3;")
    }

    private func item(_ id: String) -> M.PageItem {
        M.PageItem(
            child: M.Child(noteId: id, title: id, type: .text, mime: "text/html", isProtected: false, iconClass: "bx bx-note", isArchived: false, hasChildren: false, colorLabel: nil),
            body: .none
        )
    }

    func testStackedOrderReadsTheGridRowByRow() {
        let layout = M.DashboardLayout(widgets: [
            "a": M.DashboardGeometry(x: 8, y: 0, w: 4, h: 3),
            "b": M.DashboardGeometry(x: 0, y: 3, w: 4, h: 3),
            "c": M.DashboardGeometry(x: 0, y: 0, w: 4, h: 3),
        ])
        let ordered = M.stackedOrder([item("a"), item("b"), item("c"), item("d")], layout: layout).map(\.id)
        XCTAssertEqual(ordered, ["c", "a", "b", "d"])
        XCTAssertEqual(M.stackedOrder([item("a"), item("b")], layout: nil).map(\.id), ["a", "b"])
    }

    func testDefaultIcons() {
        XCTAssertEqual(M.defaultIconClass(type: .text, hasChildren: false), "bx bx-note")
        XCTAssertEqual(M.defaultIconClass(type: .text, hasChildren: true), "bx bx-folder")
        XCTAssertEqual(M.defaultIconClass(type: .code, hasChildren: true), "bx bx-code")
        XCTAssertEqual(M.defaultIconClass(type: .file, hasChildren: false), "bx bx-file")
        XCTAssertEqual(M.defaultIconClass(type: .book, hasChildren: true), "bx bx-book")
    }

    // MARK: Table view

    private func label(_ name: String, _ value: String, on noteId: String = "coll", position: Int = 0) -> AttributeItem {
        AttributeItem(attributeId: "a-\(noteId)-\(name)-\(position)", noteId: noteId, type: .label, name: name, value: value, position: position, isInheritable: false)
    }

    private func tableChild(_ id: String, title: String = "Title") -> M.Child {
        M.Child(noteId: id, title: title, type: .text, mime: "text/html", isProtected: false, iconClass: "bx bx-note", isArchived: false, hasChildren: false, colorLabel: nil)
    }

    func testTableDefinitionsTakeTheNearestOfEachName() {
        let own = [
            label("label:due", "promoted,alias=Due,single,date", position: 20),
            label("relation:owner", "promoted,single", position: 10),
            label("label:tags", "multi,select,options=a;b", position: 30),
            label("color", "red", position: 40),
        ]
        let inherited = [label("label:due", "promoted,single,text", on: "parent"), label("label:done", "boolean", on: "template")]
        let definitions = M.tableDefinitions(from: own + inherited)
        XCTAssertEqual(definitions.map(\.name), ["due", "owner", "tags", "done"], "every definition makes a column, promoted or not")
        XCTAssertEqual(definitions[0].labelType, .date, "the collection's own definition wins over an inherited one")
        XCTAssertEqual(definitions[0].title, "Due")
        XCTAssertEqual(definitions[1].kind, .relation)
        XCTAssertEqual(definitions[1].field, .relation("owner"))
        XCTAssertTrue(definitions[2].isMulti)
        XCTAssertNil(definitions[2].title)
        XCTAssertEqual(definitions[3].field, .label("done"))
        XCTAssertEqual(definitions[3].labelType, .boolean)
    }

    func testTableConfigRestoresOrderWidthsAndVisibility() throws {
        let definitions = M.tableDefinitions(from: [label("label:due", "single,date"), label("label:new", "single,text")])
        let json = """
        {"tableData":{"columns":[{"title":"#","width":60},{"field":"labels.due","title":"Due","width":120,"visible":true},\
        {"field":"title","title":"Title","width":250},{"field":"dateCreated","title":"Date created","visible":true},\
        {"field":"labels.gone","width":50}],"sort":[{"column":"labels.due","dir":"desc"}]}}
        """
        let config = try XCTUnwrap(M.TableConfig.decode(Data(json.utf8)))
        XCTAssertEqual(config.sort, [M.TableConfig.Sort(field: "labels.due", descending: true)])
        XCTAssertEqual(config.columns.map(\.field), ["#", "labels.due", "title", "dateCreated", "labels.gone"])

        let columns = M.tableColumns(definitions: definitions, config: config)
        XCTAssertEqual(columns.map(\.field.key), ["#", "labels.due", "title", "dateCreated", "noteId", "dateModified", "labels.new"],
                       "the saved order first, then the columns it doesn't know; a saved column that no longer exists is dropped")
        XCTAssertNil(columns[0].width, "the row-number column keeps sizing itself")
        XCTAssertEqual(columns[1].width, 120)
        XCTAssertEqual(columns[2].width, 250)
        XCTAssertTrue(columns[3].isVisible, "a saved configuration can show a hidden built-in column")
        XCTAssertFalse(columns[4].isVisible)
        XCTAssertTrue(columns[6].isVisible)

        let plain = M.tableColumns(definitions: definitions, config: nil)
        XCTAssertEqual(plain.map(\.field.key), ["#", "noteId", "title", "dateCreated", "dateModified", "labels.due", "labels.new"])
        XCTAssertEqual(plain[2].width, M.tableTitleWidth)
        XCTAssertEqual(plain.filter(\.isVisible).map(\.field.key), ["#", "title", "labels.due", "labels.new"])
        XCTAssertNil(M.TableConfig.decode(Data("{}".utf8)))
    }

    func testTableRowsSortByNumberFlagAndText() {
        let columns = M.tableColumns(
            definitions: M.tableDefinitions(from: [label("label:n", "single,number"), label("label:f", "single,boolean")]), config: nil
        )
        let rows = [
            M.TableRow(child: tableChild("a", title: "b"), level: 0, labels: ["n": ["10"], "f": ["true"]],
                       children: [M.TableRow(child: tableChild("a2", title: "z"), level: 1), M.TableRow(child: tableChild("a1", title: "y"), level: 1)]),
            M.TableRow(child: tableChild("b", title: "a"), level: 0, labels: ["n": ["9"], "f": ["false"]]),
            M.TableRow(child: tableChild("c", title: "C"), level: 0),
        ]
        XCTAssertEqual(M.sortedTableRows(rows, by: [.init(field: "labels.n", descending: false)], columns: columns).map(\.id), ["c", "b", "a"],
                       "numbers sort by value, a note without one first")
        XCTAssertEqual(M.sortedTableRows(rows, by: [.init(field: "labels.f", descending: true)], columns: columns).map(\.id), ["a", "b", "c"])
        let byTitle = M.sortedTableRows(rows, by: [.init(field: "title", descending: false)], columns: columns)
        XCTAssertEqual(byTitle.map(\.id), ["b", "a", "c"], "titles compare without case")
        XCTAssertEqual(byTitle[1].children.map(\.id), ["a1", "a2"], "nested rows sort too")
        XCTAssertEqual(M.sortedTableRows(rows, by: [], columns: columns).map(\.id), ["a", "b", "c"], "no sort keeps branch order")
        XCTAssertEqual(M.sortedTableRows(rows, by: [.init(field: "nonsense", descending: false)], columns: columns).map(\.id), ["a", "b", "c"])
    }

    func testMaxNestingDepth() {
        XCTAssertEqual(M.maxNestingDepth(label: nil), -1)
        XCTAssertEqual(M.maxNestingDepth(label: "0"), 0)
        XCTAssertEqual(M.maxNestingDepth(label: "2 levels"), 2)
        XCTAssertEqual(M.maxNestingDepth(label: "abc"), -1)
    }

    func testResolvingTargetsDropsNotesNobodyCanSee() {
        let owner = M.TableTarget(noteId: "o", title: "Owner", iconClass: "bx bx-user", colorLabel: nil)
        let rows = [M.TableRow(child: tableChild("a"), level: 0, relations: ["owner": [
            M.TableTarget(noteId: "o", title: "", iconClass: "", colorLabel: nil),
            M.TableTarget(noteId: "gone", title: "", iconClass: "", colorLabel: nil),
        ]])]
        let resolved = M.resolvingTargets(rows, ["o": owner])
        XCTAssertEqual(resolved[0].relations["owner"], [owner])
    }
}
