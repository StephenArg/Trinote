import XCTest
@testable import Trinote

final class CollectionViewResolutionTests: XCTestCase {
    private func note(
        type: NoteType = .book,
        attributes: [AttributeItem] = [],
        inherited: [AttributeItem] = []
    ) -> NoteItem {
        var item = NoteItem(
            noteId: "coll",
            title: "Collection",
            type: type,
            mime: "",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: ["root"],
            childNoteIds: [],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: attributes
        )
        item.inheritedAttributes = inherited
        return item
    }

    private func label(_ name: String, _ value: String) -> AttributeItem {
        AttributeItem(attributeId: "a-\(name)", noteId: "coll", type: .label, name: name, value: value, position: 0, isInheritable: false)
    }

    private func relation(_ name: String, _ value: String) -> AttributeItem {
        AttributeItem(attributeId: "r-\(name)", noteId: "coll", type: .relation, name: name, value: value, position: 0, isInheritable: false)
    }

    func testOwnLabelWins() {
        let item = note(attributes: [label("viewType", "list")], inherited: [label("viewType", "grid")])
        XCTAssertEqual(NoteTypeChange.currentView(for: item), .list)
    }

    func testInheritedLabelIsUsedWithoutAnOwnOne() {
        let item = note(inherited: [label("viewType", "dashboard")])
        XCTAssertEqual(NoteTypeChange.currentView(for: item), .dashboard)
    }

    /// Switching a collection made from the map template to List must show the list: `#viewType` wins over the
    /// template, as it does for boards and presentations.
    func testOwnViewTypeOverridesTheGeoMapTemplate() {
        let list = note(attributes: [relation("template", "_template_geo_map"), label("viewType", "list")])
        XCTAssertFalse(list.isSemanticGeoMap)
        XCTAssertEqual(NoteTypeChange.currentView(for: list), .list)

        let map = note(attributes: [relation("template", "_template_geo_map")])
        XCTAssertTrue(map.isSemanticGeoMap)
        XCTAssertEqual(NoteTypeChange.currentView(for: map), .geoMap)
    }

    func testBuiltInTemplateSuppliesTheViewOffline() {
        XCTAssertEqual(NoteTypeChange.currentView(for: note(attributes: [relation("template", "_template_list_view")])), .list)
        XCTAssertEqual(NoteTypeChange.currentView(for: note(attributes: [relation("template", "_template_dashboard")])), .dashboard)
        XCTAssertEqual(NoteTypeChange.currentView(for: note(attributes: [relation("template", "_template_table")])), .table)
        XCTAssertEqual(NoteTypeChange.currentView(for: note(attributes: [relation("template", "_template_grid_view")])), .grid)
    }

    func testUnknownOrMissingValuesShowAsGrid() {
        XCTAssertEqual(NoteTypeChange.currentView(for: note()), .grid)
        XCTAssertEqual(NoteTypeChange.currentView(for: note(attributes: [label("viewType", "searchPreview")])), .grid)
        XCTAssertEqual(NoteTypeChange.currentView(for: note(attributes: [label("viewType", "  ")])), .grid)
        XCTAssertEqual(NoteTypeChange.currentView(for: note(attributes: [relation("template", "_template_text_snippet")])), .grid)
    }

    func testResolverAnswersViewTypeForBuiltInTemplates() {
        XCTAssertEqual(TriliumBuiltinTemplateLabels.value(of: "viewType", templateNoteId: "_template_calendar", boardHidesChildren: true), "calendar")
        XCTAssertEqual(TriliumBuiltinTemplateLabels.value(of: "viewType", templateNoteId: "_template_board", boardHidesChildren: true), "board")
        XCTAssertNil(TriliumBuiltinTemplateLabels.value(of: "viewType", templateNoteId: "_template_text_snippet", boardHidesChildren: true))
        XCTAssertEqual(TriliumBuiltinTemplateLabels.value(of: "subtreeHidden", templateNoteId: "_template_board", boardHidesChildren: true), "")
    }

    func testGridListAndDashboardAreShownInApp() {
        XCTAssertTrue(NoteTypeChange.CollectionView.grid.isShownInApp)
        XCTAssertTrue(NoteTypeChange.CollectionView.list.isShownInApp)
        XCTAssertTrue(NoteTypeChange.CollectionView.dashboard.isShownInApp)
        XCTAssertTrue(NoteTypeChange.CollectionView.table.isShownInApp)
        XCTAssertFalse(NoteTypeChange.CollectionView.calendar.isShownInApp)
    }
}
