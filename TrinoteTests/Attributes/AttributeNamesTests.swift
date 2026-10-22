import XCTest
@testable import Trinote

final class AttributeNamesTests: XCTestCase {

    func testValidNamesMatchTrilium() {
        XCTAssertTrue(AttributeNames.isValid("valid_name:1"))
        XCTAssertTrue(AttributeNames.isValid("étiquette"))
        XCTAssertTrue(AttributeNames.isValid("label:status"))
        XCTAssertFalse(AttributeNames.isValid("has space"))
        XCTAssertFalse(AttributeNames.isValid("has#hash"))
        XCTAssertFalse(AttributeNames.isValid("has-dash"))
        XCTAssertFalse(AttributeNames.isValid(""))
    }

    func testFilterStripsDisallowedCharacters() {
        XCTAssertEqual(AttributeNames.filter("my label-1!"), "mylabel1")
        XCTAssertEqual(AttributeNames.filter("#iconClass"), "iconClass")
        XCTAssertEqual(AttributeNames.filter("日本語_ok"), "日本語_ok")
        // A combining accent is not a letter on its own, as in Trilium's per-code-point test.
        XCTAssertEqual(AttributeNames.filter("e\u{0301}"), "e")
        for name in ["a b", "x.y", "", "ok"] {
            let filtered = AttributeNames.filter(name)
            XCTAssertEqual(AttributeNames.isValid(filtered), !filtered.isEmpty)
        }
    }

    func testAutoLinkAttributes() {
        XCTAssertTrue(AttributeNames.isAutoLink(type: .relation, name: "internalLink"))
        XCTAssertTrue(AttributeNames.isAutoLink(type: .relation, name: "includeNoteLink"))
        XCTAssertTrue(AttributeNames.isAutoLink(type: .label, name: "internalBookmark"))
        XCTAssertFalse(AttributeNames.isAutoLink(type: .label, name: "internalLink"))
        XCTAssertFalse(AttributeNames.isAutoLink(type: .relation, name: "template"))
    }

    func testDefinitionNames() {
        XCTAssertEqual(AttributeNames.definedAttribute(byDefinitionName: "label:status")?.type, .label)
        XCTAssertEqual(AttributeNames.definedAttribute(byDefinitionName: "label:status")?.name, "status")
        XCTAssertEqual(AttributeNames.definedAttribute(byDefinitionName: "relation:author")?.type, .relation)
        XCTAssertEqual(AttributeNames.definedAttribute(byDefinitionName: "label:TEST:TEST1")?.name, "TEST:TEST1")
        XCTAssertNil(AttributeNames.definedAttribute(byDefinitionName: "status"))
        XCTAssertEqual(AttributeNames.definitionName(for: .relation, name: "author"), "relation:author")
    }

    func testEntityIdsRejectAnythingThatCouldChangeTheRoute() {
        XCTAssertTrue(TriliumEntityId.isValid("root"))
        XCTAssertTrue(TriliumEntityId.isValid("_hidden"))
        XCTAssertTrue(TriliumEntityId.isValid("aB3dE5fG7hJ9"))
        XCTAssertTrue(TriliumEntityId.isValid("_template_board"))
        for bad in ["", ".", "..", "../x", "a/b", "a?b=c", "a#b", "a%2Fb", "a b", "é", String(repeating: "a", count: 129)] {
            XCTAssertFalse(TriliumEntityId.isValid(bad), bad)
        }
    }
}
