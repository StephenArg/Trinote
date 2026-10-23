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

    /// Trilium v0.107: a clipping shows its `#clipType` (migration 241 drops the clipper's globe `#iconClass`).
    func testClippingsTakeTheIconOfTheirClipType() {
        func icon(_ labels: [String: String], isTextNote: Bool = true) -> String? {
            NoteIconClassResolver.defaultIconClass(isTextNote: isTextNote) { labels[$0] }
        }
        XCTAssertEqual(icon(["clipType": "clippings"]), "bx bx-paperclip")
        XCTAssertEqual(icon(["clipType": "page"]), "bx bx-globe")
        XCTAssertEqual(icon(["clipType": "note"]), "bx bx-bookmark")
        XCTAssertEqual(icon(["clipType": "tabs"]), "bx bx-window-alt")
        XCTAssertEqual(icon(["clipType": "share"]), "bx bx-share")
        XCTAssertNil(icon(["clipType": "something-new"]))
        XCTAssertNil(icon(["clipType": "page"], isTextNote: false), "only text notes, as in Trilium")
        XCTAssertEqual(icon(["clipType": "page", "geolocation": "48.85,2.29"]), "bx bx-pin", "a place outranks it")
    }
}
