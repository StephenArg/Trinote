import XCTest
@testable import Trinote

final class BoxiconsResolverTests: XCTestCase {

    func testParsesOutlineIconClass() {
        XCTAssertEqual(BoxiconsResolver.iconKey(from: "bx bx-calendar"), "bx-calendar")
        XCTAssertEqual(BoxiconsResolver.codepoint(for: "bx-calendar"), 0xea15)
        XCTAssertNotNil(BoxiconsResolver.glyphCharacter(from: "bx bx-calendar"))
    }

    func testParsesSolidIconClass() {
        XCTAssertEqual(BoxiconsResolver.iconKey(from: "bx bxs-sushi"), "bxs-sushi")
        XCTAssertEqual(BoxiconsResolver.codepoint(for: "bxs-sushi"), 0xef46)
    }

    func testParsesBrandIconClass() {
        XCTAssertEqual(BoxiconsResolver.iconKey(from: "bx bxl-github"), "bxl-github")
        XCTAssertEqual(BoxiconsResolver.codepoint(for: "bxl-github"), 0xe93a)
    }

    func testParsesMalformedTriplePrefixIconClass() {
        XCTAssertEqual(BoxiconsResolver.iconKey(from: "bx bx bx-list-ul"), "bx-list-ul")
        XCTAssertEqual(BoxiconsResolver.usableIconClass(from: "bx bx bx-list-ul"), "bx bx-list-ul")
        XCTAssertNotNil(BoxiconsResolver.glyphCharacter(from: "bx bx bx-list-ul"))
    }

    func testParsesQuotedIconClassTokens() {
        XCTAssertEqual(BoxiconsResolver.iconKey(from: "\"bx bx bx-list-ul\""), "bx-list-ul")
        XCTAssertNotNil(BoxiconsResolver.glyphCharacter(from: "\"bx bx bx-list-ul\""))
    }

    func testEmptyIconClassReturnsNil() {
        XCTAssertNil(BoxiconsResolver.iconKey(from: "bx bx-empty"))
        XCTAssertNil(BoxiconsResolver.glyphCharacter(from: "bx bx-empty"))
        XCTAssertNil(BoxiconsResolver.glyphCharacter(from: nil))
        XCTAssertNil(BoxiconsResolver.glyphCharacter(from: ""))
    }

    func testUnknownIconReturnsNilGlyph() {
        XCTAssertFalse(BoxiconsResolver.isCatalogIcon("bx bx-not-a-real-icon-name"))
        XCTAssertNil(BoxiconsResolver.usableIconClass(from: "bx bx-not-a-real-icon-name"))
        XCTAssertNil(BoxiconsResolver.glyphCharacter(from: "bx bx-not-a-real-icon-name"))
    }

    func testNonBoxiconsCustomIconClassIsNotCatalogIcon() {
        XCTAssertFalse(BoxiconsResolver.isCatalogIcon("fa fa-star"))
        XCTAssertNil(BoxiconsResolver.usableIconClass(from: "fa fa-star"))
    }

    func testTriliumIconClassRoundTrip() {
        let key = "bx-map-pin"
        XCTAssertEqual(BoxiconsResolver.triliumIconClass(for: key), "bx bx-map-pin")
        XCTAssertEqual(BoxiconsResolver.iconKey(from: BoxiconsResolver.triliumIconClass(for: key)), key)
    }

    func testCatalogContainsExpectedCount() {
        XCTAssertGreaterThan(BoxiconsCatalog.allIconClasses.count, 1600)
        XCTAssertEqual(BoxiconsCatalog.version, "2.1.4")
    }
}
