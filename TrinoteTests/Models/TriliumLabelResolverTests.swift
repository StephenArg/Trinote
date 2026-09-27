import XCTest
@testable import Trinote

final class TriliumLabelResolverTests: XCTestCase {

    private typealias Context = TriliumLabelResolver.NoteContext

    private func label(_ name: String, _ value: String = "", on noteId: String, inheritable: Bool = false, position: Int = 0) -> AttributeItem {
        AttributeItem(attributeId: "\(noteId)-\(name)", noteId: noteId, type: .label, name: name, value: value, position: position, isInheritable: inheritable)
    }

    private func relation(_ name: String, to target: String, on noteId: String) -> AttributeItem {
        AttributeItem(attributeId: "\(noteId)-\(name)", noteId: noteId, type: .relation, name: name, value: target, position: 10, isInheritable: false)
    }

    private func resolver(_ notes: [String: Context], boardHidesChildren: Bool = true) -> TriliumLabelResolver {
        TriliumLabelResolver(
            context: { notes[$0] },
            builtinTemplateLabel: { id, name in
                TriliumBuiltinTemplateLabels.value(of: name, templateNoteId: id, boardHidesChildren: boardHidesChildren)
            }
        )
    }

    func testOwnLabelIsTruthyUnlessFalse() {
        let notes: [String: Context] = [
            "hidden": Context(attributes: [label("subtreeHidden", on: "hidden")], parentNoteIds: ["root"]),
            "shown": Context(attributes: [label("subtreeHidden", "false", on: "shown")], parentNoteIds: ["root"]),
            "plain": Context(attributes: [], parentNoteIds: ["root"]),
            "root": Context(attributes: [], parentNoteIds: []),
        ]
        let resolver = resolver(notes)
        XCTAssertTrue(resolver.isTruthy("subtreeHidden", noteId: "hidden"))
        XCTAssertFalse(resolver.isTruthy("subtreeHidden", noteId: "shown"))
        XCTAssertFalse(resolver.isTruthy("subtreeHidden", noteId: "plain"))
    }

    func testOnlyInheritableAncestorLabelsReachDescendants() {
        let notes: [String: Context] = [
            "root": Context(attributes: [], parentNoteIds: []),
            "folder": Context(attributes: [label("subtreeHidden", on: "folder", inheritable: true)], parentNoteIds: ["root"]),
            "child": Context(attributes: [], parentNoteIds: ["folder"]),
            "grandchild": Context(attributes: [], parentNoteIds: ["child"]),
            "own": Context(attributes: [label("subtreeHidden", on: "own")], parentNoteIds: ["root"]),
            "underOwn": Context(attributes: [], parentNoteIds: ["own"]),
        ]
        let resolver = resolver(notes)
        XCTAssertTrue(resolver.isTruthy("subtreeHidden", noteId: "grandchild"))
        XCTAssertFalse(resolver.isTruthy("subtreeHidden", noteId: "underOwn"), "a label that is not inheritable stays on its note")
    }

    func testTemplateLabelAppliesAndOwnValueWins() {
        let notes: [String: Context] = [
            "root": Context(attributes: [], parentNoteIds: []),
            "tpl": Context(attributes: [label("template", on: "tpl"), label("subtreeHidden", on: "tpl")], parentNoteIds: ["root"]),
            "instance": Context(attributes: [relation("template", to: "tpl", on: "instance")], parentNoteIds: ["root"]),
            "override": Context(
                attributes: [relation("template", to: "tpl", on: "override"), label("subtreeHidden", "false", on: "override")],
                parentNoteIds: ["root"]
            ),
        ]
        let resolver = resolver(notes)
        XCTAssertTrue(resolver.isTruthy("subtreeHidden", noteId: "instance"))
        XCTAssertFalse(resolver.isTruthy("subtreeHidden", noteId: "override"))
    }

    func testBuiltInBoardTemplateHidesCardsFromV0106Only() {
        let notes: [String: Context] = [
            "root": Context(attributes: [], parentNoteIds: []),
            "board": Context(attributes: [relation("template", to: "_template_board", on: "board")], parentNoteIds: ["root"]),
            "map": Context(attributes: [relation("template", to: "_template_geo_map", on: "map")], parentNoteIds: ["root"]),
        ]
        XCTAssertTrue(resolver(notes, boardHidesChildren: true).isTruthy("subtreeHidden", noteId: "board"))
        XCTAssertFalse(resolver(notes, boardHidesChildren: false).isTruthy("subtreeHidden", noteId: "board"))
        XCTAssertFalse(resolver(notes).isTruthy("subtreeHidden", noteId: "map"))
    }

    func testTemplateLoopEnds() {
        let notes: [String: Context] = [
            "root": Context(attributes: [], parentNoteIds: []),
            "a": Context(attributes: [relation("template", to: "b", on: "a")], parentNoteIds: ["root"]),
            "b": Context(attributes: [relation("template", to: "a", on: "b")], parentNoteIds: ["a"]),
        ]
        XCTAssertFalse(resolver(notes).isTruthy("subtreeHidden", noteId: "a"))
    }

    func testFlattenLeavesHiddenSubtreesClosed() {
        func note(_ id: String, children: [String]) -> NoteItem {
            NoteItem(
                noteId: id, title: id, type: .text, mime: "text/html",
                isProtected: false, dateCreated: "", dateModified: "",
                parentNoteIds: ["root"], childNoteIds: children, parentBranchIds: ["b-\(id)"], childBranchIds: children.map { "b-\($0)" },
                attributes: []
            )
        }
        func node(_ id: String, children: [TreeNode]? = nil) -> TreeNode {
            TreeNode(
                branch: BranchItem(branchId: "b-\(id)", noteId: id, parentNoteId: "root", prefix: nil, notePosition: 0, isExpanded: true),
                note: note(id, children: children?.map(\.note.noteId) ?? []),
                children: children
            )
        }
        let tree = [node("board", children: [node("card")]), node("folder", children: [node("page")])]
        let rows = TreeViewModel.flatten(tree, hidesChildren: { $0.noteId == "board" })
        XCTAssertEqual(rows.map { $0.node.note.noteId }, ["board", "folder", "page"])
    }
}
