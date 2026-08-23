import XCTest
@testable import Trinote

final class TriliumBuiltinTemplateIconsTests: XCTestCase {

    func testListViewTemplateIcon() {
        XCTAssertEqual(
            TriliumBuiltinTemplateIcons.iconClass(for: "_template_list_view"),
            "bx bx-list-ul"
        )
    }

    func testGridViewTemplateIcon() {
        XCTAssertEqual(
            TriliumBuiltinTemplateIcons.iconClass(for: "_template_grid_view"),
            "bx bxs-grid"
        )
    }
}
