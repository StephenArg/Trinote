import XCTest
@testable import Trinote

final class NoteIconClassResolverTests: XCTestCase {

    func testPrefersOwnIconClassOverInherited() {
        let result = NoteIconClassResolver.effectiveIconClass(
            noteId: "child",
            ownIconClass: "bx bx bx-list-ul",
            templateRelationValue: "_template_grid_view",
            parentNoteProvider: { noteId in
                guard noteId == "child" else { return nil }
                return NoteIconClassResolver.ParentNoteContext(
                    attributes: [],
                    parentNoteIds: ["parent"]
                )
            },
            templateIconClassProvider: { _ in "bx bxs-grid" }
        )
        XCTAssertEqual(result, "bx bx-list-ul")
    }

    func testUsesTemplateIconClassWhenOwnIsAbsent() {
        let result = NoteIconClassResolver.effectiveIconClass(
            noteId: "projects",
            ownIconClass: nil,
            templateRelationValue: "_template_list_view",
            parentNoteProvider: { _ in nil },
            templateIconClassProvider: { target in
                TriliumBuiltinTemplateIcons.iconClass(for: target)
            }
        )
        XCTAssertEqual(result, "bx bx-list-ul")
    }

    func testUsesNearestInheritableAncestorIconClass() {
        let result = NoteIconClassResolver.effectiveIconClass(
            noteId: "child",
            ownIconClass: nil,
            templateRelationValue: nil,
            parentNoteProvider: { noteId in
                switch noteId {
                case "child":
                    return NoteIconClassResolver.ParentNoteContext(attributes: [], parentNoteIds: ["parent"])
                case "parent":
                    return NoteIconClassResolver.ParentNoteContext(
                        attributes: [
                            AttributeItem(
                                attributeId: "a1",
                                noteId: "parent",
                                type: .label,
                                name: "iconClass",
                                value: "bx bx bx-list-ul",
                                position: 0,
                                isInheritable: true
                            )
                        ],
                        parentNoteIds: []
                    )
                default:
                    return nil
                }
            },
            templateIconClassProvider: { _ in nil }
        )
        XCTAssertEqual(result, "bx bx-list-ul")
    }
}
