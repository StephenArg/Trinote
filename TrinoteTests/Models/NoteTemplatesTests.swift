import XCTest
@testable import Trinote

@MainActor
final class NoteTemplatesTests: XCTestCase {
    private func relation(_ target: String, on noteId: String, inheritable: Bool = false, position: Int = 0) -> AttributeItem {
        AttributeItem(
            attributeId: "\(noteId)-\(target)", noteId: noteId, type: .relation, name: NoteTemplates.defaultParentRelation,
            value: target, position: position, isInheritable: inheritable
        )
    }

    private typealias Context = TriliumLabelResolver.NoteContext

    func testTemplatesOwnRelationsWinInOrder() {
        let ids = NoteTemplates.destinationIds(
            templateNoteId: "tpl",
            ownAttributes: [relation("advisors", on: "tpl", position: 1), relation("people", on: "tpl", position: 0)],
            parentNoteIds: ["folder"],
            ancestor: { _ in Context(attributes: [self.relation("elsewhere", on: "folder", inheritable: true)], parentNoteIds: ["root"]) }
        )
        XCTAssertEqual(ids, ["people", "advisors"])
    }

    func testInheritableRelationsFromFoldersAboveApply() {
        let ancestors: [String: Context] = [
            "templates": Context(attributes: [relation("people", on: "templates", inheritable: true)], parentNoteIds: ["root"]),
            "root": Context(attributes: [relation("inbox", on: "root", inheritable: false)], parentNoteIds: []),
        ]
        let ids = NoteTemplates.destinationIds(templateNoteId: "tpl", ownAttributes: [], parentNoteIds: ["templates"], ancestor: { ancestors[$0] })
        XCTAssertEqual(ids, ["people"], "a relation on a folder above counts only when inheritable")
    }

    func testChoiceSendsTheNoteToTheTemplatesDestinationUnlessTurnedOff() {
        let template = UserNoteTemplate(noteId: "tpl", title: "Person", type: "text", mime: "text/html")
        var choice = NewNoteTemplateChoice(template: template)
        XCTAssertEqual(choice.parentNoteId(defaultParentNoteId: "here"), "here", "no destinations: create where the sheet was opened")
        XCTAssertEqual(choice.cloneParentNoteIds, [])

        choice.destinations = [TemplateDestination(noteId: "people", title: "People"), TemplateDestination(noteId: "advisors", title: "Advisors")]
        XCTAssertEqual(choice.parentNoteId(defaultParentNoteId: "here"), "people")
        XCTAssertEqual(choice.cloneParentNoteIds, ["advisors"])

        choice.followsDestination = false
        XCTAssertEqual(choice.parentNoteId(defaultParentNoteId: "here"), "here")
        XCTAssertEqual(choice.cloneParentNoteIds, [])
    }

    func testNoRelationsMeansCreateInPlace() {
        XCTAssertEqual(NoteTemplates.destinationIds(templateNoteId: "tpl", ownAttributes: [], parentNoteIds: [], ancestor: { _ in nil }), [])
    }
}
