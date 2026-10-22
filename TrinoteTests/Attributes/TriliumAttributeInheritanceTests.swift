import XCTest
@testable import Trinote

final class TriliumAttributeInheritanceTests: XCTestCase {

    private var owned: [String: [AttributeItem]] = [:]
    private var parents: [String: [String]] = [:]

    private func add(
        _ noteId: String,
        _ type: AttributeItem.AttributeKind,
        _ name: String,
        _ value: String = "",
        inheritable: Bool = false
    ) {
        let position = (owned[noteId]?.count ?? 0) * 10 + 10
        owned[noteId, default: []].append(AttributeItem(
            attributeId: "\(noteId)-\(name)-\(position)",
            noteId: noteId,
            type: type,
            name: name,
            value: value,
            position: position,
            isInheritable: inheritable
        ))
    }

    private func inherited(_ noteId: String) -> [String] {
        TriliumAttributeInheritance(
            ownedAttributes: { [owned] in owned[$0] ?? [] },
            parentNoteIds: { [parents] in parents[$0] ?? [] }
        )
        .inheritedAttributes(of: noteId)
        .map { "\($0.noteId):\($0.name)" }
    }

    func testInheritsOnlyInheritableAttributesThroughEveryAncestor() {
        parents = ["child": ["parent"], "parent": ["grandparent"], "grandparent": ["root"]]
        add("child", .label, "own")
        add("parent", .label, "shared", inheritable: true)
        add("parent", .label, "private")
        add("grandparent", .label, "family", inheritable: true)
        add("root", .label, "everywhere", inheritable: true)

        XCTAssertEqual(inherited("child"), ["parent:shared", "grandparent:family", "root:everywhere"])
    }

    func testTheHiddenSubtreeDoesNotInheritFromRoot() {
        parents = ["_hidden": ["root"], "_lbRoot": ["_hidden"]]
        add("root", .label, "everywhere", inheritable: true)
        add("_hidden", .label, "hiddenOnly", inheritable: true)

        XCTAssertEqual(inherited("_lbRoot"), ["_hidden:hiddenOnly"])
    }

    func testTemplatesGiveAllTheirAttributesExceptTheTemplateMarker() {
        add("note", .relation, "template", "tpl")
        add("tpl", .label, "template")
        add("tpl", .label, "status", "todo")
        add("tpl", .label, "label:status", "promoted,single,text", inheritable: true)

        XCTAssertEqual(inherited("note"), ["tpl:status", "tpl:label:status"])
    }

    func testInheritedTemplateRelationsCountToo() {
        parents = ["card": ["board"]]
        add("board", .relation, "template", "tpl", inheritable: true)
        add("tpl", .label, "priority", "high")

        XCTAssertEqual(inherited("card"), ["board:template", "tpl:priority"])
    }

    func testCyclesStopAndSharedAncestorsCountOnce() {
        // A clone under two parents that share a grandparent.
        parents = ["note": ["left", "right"], "left": ["top"], "right": ["top"]]
        add("top", .label, "fromTop", inheritable: true)
        XCTAssertEqual(inherited("note"), ["top:fromTop"])

        // Two templates pointing at each other.
        owned = [:]
        parents = [:]
        add("a", .relation, "template", "b")
        add("b", .relation, "template", "a")
        add("b", .label, "fromB")
        XCTAssertEqual(inherited("a"), ["b:template", "b:fromB"])
    }

    func testOwnAttributesComeFirstInEffectiveAttributes() {
        parents = ["note": ["parent"]]
        add("note", .label, "mine")
        add("parent", .label, "theirs", inheritable: true)
        let resolver = TriliumAttributeInheritance(
            ownedAttributes: { [owned] in owned[$0] ?? [] },
            parentNoteIds: { [parents] in parents[$0] ?? [] }
        )
        XCTAssertEqual(resolver.effectiveAttributes(of: "note").map(\.name), ["mine", "theirs"])
    }
}
