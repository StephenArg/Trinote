import XCTest
@testable import Trinote

final class OwnedAttributeEditsTests: XCTestCase {

    private func attribute(_ id: String, _ type: AttributeItem.AttributeKind, _ name: String, _ value: String = "",
                           position: Int, inheritable: Bool = false) -> AttributeItem {
        AttributeItem(attributeId: id, noteId: "n", type: type, name: name, value: value,
                      position: position, isInheritable: inheritable)
    }

    private var current: [AttributeItem] {
        [
            attribute("b", .label, "status", "todo", position: 20),
            attribute("a", .label, "archived", position: 10),
            attribute("link", .relation, "internalLink", "other", position: 30),
            attribute("c", .relation, "template", "tpl", position: 40, inheritable: true),
        ]
    }

    func testListLeavesOutAutoLinksAndFollowsPositions() throws {
        let list = try OwnedAttributeEdits.apply(.add(AttributeDraft(type: .label, name: "new", value: "1")), to: current)
        XCTAssertEqual(list.map(\.name), ["archived", "status", "template", "new"])
        XCTAssertEqual(list.last, OwnedAttributeUpdate(type: "label", name: "new", value: "1", isInheritable: false))
        XCTAssertEqual(list[2], OwnedAttributeUpdate(type: "relation", name: "template", value: "tpl", isInheritable: true))
    }

    func testUpdateDeleteAndMoveWorkByAttributeId() throws {
        let updated = try OwnedAttributeEdits.apply(
            .update(attributeId: "b", AttributeDraft(type: .label, name: "status", value: "done", isInheritable: true)),
            to: current
        )
        XCTAssertEqual(updated[1], OwnedAttributeUpdate(type: "label", name: "status", value: "done", isInheritable: true))

        let deleted = try OwnedAttributeEdits.apply(.delete(attributeId: "a"), to: current)
        XCTAssertEqual(deleted.map(\.name), ["status", "template"])

        let moved = try OwnedAttributeEdits.apply(.move(attributeId: "c", toIndex: 0), to: current)
        XCTAssertEqual(moved.map(\.name), ["template", "archived", "status"])
        let movedToEnd = try OwnedAttributeEdits.apply(.move(attributeId: "a", toIndex: 99), to: current)
        XCTAssertEqual(movedToEnd.map(\.name), ["status", "template", "archived"])
    }

    func testAnAttributeChangedElsewhereIsReported() {
        XCTAssertThrowsError(try OwnedAttributeEdits.apply(.delete(attributeId: "gone"), to: current)) {
            XCTAssertEqual($0 as? OwnedAttributeEdits.Failure, .changedElsewhere)
        }
        // Auto-link attributes aren't editable from the sheet.
        XCTAssertThrowsError(try OwnedAttributeEdits.apply(.delete(attributeId: "link"), to: current))
    }

    func testAttributesAddedElsewhereSurvive() throws {
        // Fetched just before saving: "x" was added on another device after the sheet opened.
        let fresh = current + [attribute("x", .label, "fromDesktop", position: 50)]
        let list = try OwnedAttributeEdits.apply(.delete(attributeId: "a"), to: fresh)
        XCTAssertTrue(list.contains { $0.name == "fromDesktop" })
    }
}
