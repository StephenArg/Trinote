import XCTest
@testable import Trinote

/// What the New Note sheet's Collection submenu makes: a `book` from the built-in template of the chosen view.
final class NewNoteKindTests: XCTestCase {
    func testCollectionKindsAreBooksMadeFromTheirTemplates() {
        let expected: [(NoteTypeChange.CollectionView, String)] = [
            (.grid, "_template_grid_view"), (.list, "_template_list_view"), (.table, "_template_table"), (.dashboard, "_template_dashboard"),
        ]
        for (view, template) in expected {
            let kind = NewNoteKind.collection(view)
            XCTAssertEqual(kind.triliumStorageType, "book")
            XCTAssertEqual(kind.creationMime, "")
            XCTAssertEqual(kind.creationInitialContent, "")
            let attributes = kind.creationInitialAttributes
            XCTAssertEqual(
                attributes.first, NoteCreationAttribute(type: "relation", name: "template", value: template),
                "the template comes first, so the queue sends it as templateNoteId"
            )
            XCTAssertTrue(attributes.contains(NoteCreationAttribute(type: "label", name: "viewType", value: view.rawValue)))
            XCTAssertTrue(attributes.contains(NoteCreationAttribute(type: "label", name: "collection", value: "")))
            XCTAssertTrue(attributes.contains { $0.name == "iconClass" && $0.value == view.iconClass })
        }
    }

    func testTypeKindsKeepTheTypesParameters() {
        XCTAssertEqual(NewNoteKind.type(.kanban).triliumStorageType, NoteType.kanban.triliumStorageType)
        XCTAssertEqual(NewNoteKind.type(.kanban).creationInitialAttributes, NoteType.kanban.creationInitialAttributes)
        XCTAssertEqual(NewNoteKind.type(.canvas).creationInitialContent, NoteType.emptyCanvasNoteJSON)
        XCTAssertEqual(NewNoteKind.type(.markdown).creationMime, "text/x-markdown")
        XCTAssertEqual(NewNoteKind.text, .type(.text))
    }

    func testMenuOffersGridListTableAndDashboardWhenSupported() {
        XCTAssertEqual(NewNoteKind.collectionViews(supportsDashboard: false), [.grid, .list, .table])
        XCTAssertEqual(NewNoteKind.collectionViews(supportsDashboard: true), [.grid, .list, .table, .dashboard])
    }

    func testTitlesNameTheTypeOrTheCollectionWithItsView() {
        XCTAssertEqual(NewNoteKind.type(.text).title, NewNoteKind.title(of: .text))
        let grid = NewNoteKind.collection(.grid).title
        XCTAssertTrue(grid.hasPrefix(String(localized: "Collection")))
        XCTAssertTrue(grid.hasSuffix(NoteTypeChange.CollectionView.grid.title))
    }
}
