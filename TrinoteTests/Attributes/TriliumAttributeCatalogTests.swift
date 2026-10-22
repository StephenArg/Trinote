import XCTest
@testable import Trinote

final class TriliumAttributeCatalogTests: XCTestCase {

    func testBundledCatalogHasTheBuiltinsAndTheirKinds() throws {
        let catalog = TriliumAttributeCatalog.shared
        let viewType = try XCTUnwrap(catalog.builtin(.label, "viewType"))
        XCTAssertEqual(viewType.valueType, .select)
        XCTAssertTrue(viewType.selectOptions.contains("board"))
        XCTAssertEqual(catalog.builtin(.label, "color")?.valueType, .color)
        XCTAssertEqual(catalog.builtin(.label, "archived")?.valueType, .boolean)
        XCTAssertEqual(catalog.builtin(.relation, "shareJs")?.isDangerous, true)
        XCTAssertEqual(catalog.builtin(.relation, "template")?.isDangerous, false)
        XCTAssertNil(catalog.builtin(.label, "myOwnLabel"))
        // `template` is both a label and a relation, each with its own explanation.
        XCTAssertNotEqual(catalog.help(.label, "template"), catalog.help(.relation, "template"))
        XCTAssertNotNil(catalog.help(.label, "archived"))
    }

    func testHelpIsConvertedToInlineMarkdown() throws {
        let run = try XCTUnwrap(TriliumAttributeCatalog.shared.help(.label, "run"))
        XCTAssertFalse(run.contains("<"))
        XCTAssertTrue(run.contains("\n• "))
        XCTAssertTrue(run.contains("`runAtHour`"))
        let attributed = try XCTUnwrap(TriliumAttributeCatalog.shared.attributedHelp(.label, "run"))
        XCTAssertFalse(String(attributed.characters).contains("`"))
    }

    func testLanguageFallsBackToEnglishPerExplanation() {
        let data = Data("""
        {"attributes": [{"type": "label", "name": "a"}, {"type": "label", "name": "b"}],
         "help": {"en": {"label:a": "A in English", "label:b": "B in English"}, "de": {"label:a": "A auf Deutsch"}}}
        """.utf8)
        let german = TriliumAttributeCatalog(data: data, languages: ["de-DE"])
        XCTAssertEqual(german.help(.label, "a"), "A auf Deutsch")
        XCTAssertEqual(german.help(.label, "b"), "B in English")
        let hungarian = TriliumAttributeCatalog(data: data, languages: ["hu", "de"])
        XCTAssertEqual(hungarian.help(.label, "a"), "A auf Deutsch")
        let other = TriliumAttributeCatalog(data: data, languages: ["ja"])
        XCTAssertEqual(other.help(.label, "a"), "A in English")
    }

    func testSuggestionsPutPrefixMatchesFirstAndSkipAutoLinks() {
        let catalog = TriliumAttributeCatalog.shared
        let sorted = catalog.suggestions(.label, matching: "sort").map(\.name)
        XCTAssertEqual(Array(sorted.prefix(5)), ["sortDirection", "sorted", "sortFoldersFirst", "sortLocale", "sortNatural"])
        XCTAssertFalse(catalog.suggestions(.relation, matching: "").contains { $0.name == "internalLink" })
        XCTAssertFalse(catalog.suggestions(.label, matching: "").contains { $0.name == "internalBookmark" })
        XCTAssertTrue(catalog.suggestions(.label, matching: "").allSatisfy { $0.type == .label })
        // A word from the explanation finds the attribute too.
        XCTAssertTrue(catalog.suggestions(.label, matching: "search results").contains { $0.name == "archived" })
    }
}
