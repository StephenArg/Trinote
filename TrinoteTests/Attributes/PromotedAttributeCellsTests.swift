import XCTest
@testable import Trinote

final class PromotedAttributeCellsTests: XCTestCase {

    private func attribute(_ id: String, owner: String = "n", _ name: String, _ value: String = "",
                           type: AttributeItem.AttributeKind = .label, position: Int = 10, inheritable: Bool = false) -> AttributeItem {
        AttributeItem(attributeId: id, noteId: owner, type: type, name: name, value: value,
                      position: position, isInheritable: inheritable)
    }

    private func note(own: [AttributeItem], inherited: [AttributeItem] = []) -> NoteItem {
        var item = NoteItem(from: TestFixtures.noteResponse(id: "n"))
        item = item.withAttributes(own)
        item.inheritedAttributes = inherited
        return item
    }

    func testFieldsComeFromPromotedDefinitionsAndOwnValues() {
        let cells = PromotedAttributeCells.cells(for: note(
            own: [attribute("v1", "status", "todo", position: 20)],
            inherited: [
                attribute("d1", owner: "parent", "label:status", "promoted,alias=Status,single,select,options=todo;done", inheritable: true),
                attribute("d2", owner: "parent", "label:notPromoted", "single,text", position: 20, inheritable: true),
                // An inherited value isn't the note's own: the field shows empty.
                attribute("v2", owner: "parent", "due", "2026-01-01", inheritable: true),
                attribute("d3", owner: "parent", "label:due", "promoted,single,date", position: 30, inheritable: true),
            ]
        ))
        XCTAssertEqual(cells.map(\.name), ["status", "due"])
        XCTAssertEqual(cells[0].title, "Status")
        XCTAssertEqual(cells[0].value, "todo")
        XCTAssertEqual(cells[0].labelType, .select)
        XCTAssertEqual(cells[0].definition.selectOptions, ["todo", "done"])
        XCTAssertNil(cells[1].valueAttribute)
        XCTAssertEqual(cells[1].labelType, .date)
    }

    func testOwnDefinitionWinsAndInheritedOnesStayGroupedByNote() {
        let cells = PromotedAttributeCells.cells(for: note(
            own: [attribute("d0", "label:status", "promoted,single,text", position: 50)],
            inherited: [
                attribute("dB", owner: "b", "label:second", "promoted,single,text", position: 10, inheritable: true),
                attribute("dA2", owner: "a", "label:firstLater", "promoted,single,text", position: 20, inheritable: true),
                attribute("dA1", owner: "a", "label:first", "promoted,single,text", position: 10, inheritable: true),
                attribute("dX", owner: "a", "label:status", "promoted,single,number", position: 30, inheritable: true),
            ]
        ))
        XCTAssertEqual(cells.map(\.name), ["first", "firstLater", "second", "status"])
        XCTAssertEqual(cells.first { $0.name == "status" }?.labelType, .text)
    }

    func testMultiValueFieldsHoldTheWholeSet() {
        let cells = PromotedAttributeCells.cells(for: note(own: [
            attribute("d", "label:tag", "promoted,multi,text"),
            attribute("v2", "tag", "b", position: 30),
            attribute("v1", "tag", "a", position: 20),
            attribute("v3", "tag", "", position: 40),
        ]))
        XCTAssertEqual(cells.count, 1)
        XCTAssertTrue(cells[0].isMulti)
        XCTAssertEqual(cells[0].values, ["a", "b"])
    }

    func testRelationDefinitionsAndUnspecifiedMultiplicity() {
        let cells = PromotedAttributeCells.cells(for: note(own: [
            attribute("d", "label:relation:author", "promoted,single"),
            attribute("r1", "relation:author", "someone", type: .relation),
            attribute("dl", "label:size", "promoted,number", position: 20),
            attribute("s1", "size", "1", position: 30),
            attribute("s2", "size", "2", position: 40),
        ]))
        // A definition name like `label:relation:author` defines the label `relation:author`.
        XCTAssertEqual(cells.first?.type, .label)
        // Without single or multi, every value gets a field, as on desktop.
        XCTAssertEqual(cells.filter { $0.name == "size" }.map(\.value), ["1", "2"])

        let relation = PromotedAttributeCells.cells(for: note(own: [
            attribute("d", "relation:author", "promoted,single"),
            attribute("r1", "author", "someone", type: .relation),
        ]))
        XCTAssertEqual(relation.first?.type, .relation)
        XCTAssertEqual(relation.first?.value, "someone")
    }

    func testHiddenByHidePromotedAttributesOrTableView() {
        let definition = attribute("d", "label:status", "promoted,single,text")
        XCTAssertTrue(PromotedAttributeCells.cells(for: note(own: [definition, attribute("h", "hidePromotedAttributes", position: 5)])).isEmpty)
        XCTAssertFalse(PromotedAttributeCells.cells(for: note(own: [definition, attribute("h", "hidePromotedAttributes", "false", position: 5)])).isEmpty)
        XCTAssertTrue(PromotedAttributeCells.cells(for: note(own: [definition], inherited: [attribute("t", owner: "p", "viewType", "table", inheritable: true)])).isEmpty)
    }

    func testValueWritesFollowDesktop() {
        let existing = [
            attribute("a", "tag", "x", position: 10),
            attribute("b", "tag", "y", position: 20),
            attribute("c", "tag", "z", position: 30),
        ]
        let writes = PromotedAttributeCells.valueWrites(type: .label, name: "tag", values: ["x", "new"], existing: existing)
        XCTAssertEqual(writes.updates.map(\.attributeId), ["b"])
        XCTAssertEqual(writes.updates.map(\.value), ["new"])
        XCTAssertEqual(writes.deletions, ["c"])

        let grow = PromotedAttributeCells.valueWrites(type: .label, name: "tag", values: ["x", "y", "z", "w"], existing: existing)
        XCTAssertEqual(grow.updates.count, 1)
        XCTAssertNil(grow.updates[0].attributeId)
        XCTAssertTrue(grow.deletions.isEmpty)
    }
}
