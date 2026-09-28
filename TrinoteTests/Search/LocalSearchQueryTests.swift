import XCTest
@testable import Trinote

final class LocalSearchQueryTests: XCTestCase {
    func testWordsAreTerms() {
        let query = LocalSearchQuery("milk  eggs")
        XCTAssertEqual(query.terms, ["milk", "eggs"])
        XCTAssertTrue(query.labels.isEmpty)
        XCTAssertFalse(query.hasUnsupportedOperators)
    }

    func testQuotedPhraseStaysTogether() {
        XCTAssertEqual(LocalSearchQuery("\"red apple\" pie").terms, ["red apple", "pie"])
        XCTAssertEqual(LocalSearchQuery("'two words'").terms, ["two words"])
    }

    func testDuplicateTermsIgnoringCaseAndAccents() {
        XCTAssertEqual(LocalSearchQuery("Café cafe CAFE").terms, ["Café"])
    }

    func testAndIsImplied() {
        let query = LocalSearchQuery("salt and pepper")
        XCTAssertEqual(query.terms, ["salt", "pepper"])
        XCTAssertFalse(query.hasUnsupportedOperators)
    }

    func testLabelFilters() {
        let query = LocalSearchQuery("#todo #year=2024 #status = \"in progress\" #area=\"home office\"")
        XCTAssertEqual(query.labels, [
            .init(name: "todo", value: nil),
            .init(name: "year", value: "2024"),
            .init(name: "status", value: "in progress"),
            .init(name: "area", value: "home office"),
        ])
        XCTAssertTrue(query.terms.isEmpty)
        XCTAssertFalse(query.hasUnsupportedOperators)
    }

    func testRelationsAndPropertiesAreLeftOut() {
        let relation = LocalSearchQuery("~author=Bob soup")
        XCTAssertEqual(relation.terms, ["soup"])
        XCTAssertTrue(relation.hasUnsupportedOperators)

        let property = LocalSearchQuery("note.title *=* foo bar")
        XCTAssertEqual(property.terms, ["bar"])
        XCTAssertTrue(property.hasUnsupportedOperators)
    }

    func testLabelComparisonsOtherThanEqualsAreLeftOut() {
        let query = LocalSearchQuery("#year >= 2020 soup #rating>3")
        XCTAssertEqual(query.terms, ["soup"])
        XCTAssertTrue(query.labels.isEmpty)
        XCTAssertTrue(query.hasUnsupportedOperators)
    }

    func testOrParenthesesAndOrderingAreFlagged() {
        let or = LocalSearchQuery("tomato or potato")
        XCTAssertEqual(or.terms, ["tomato", "potato"])
        XCTAssertTrue(or.hasUnsupportedOperators)

        let grouped = LocalSearchQuery("(tomato)")
        XCTAssertEqual(grouped.terms, ["tomato"])
        XCTAssertTrue(grouped.hasUnsupportedOperators)

        let ordered = LocalSearchQuery("soup orderBy note.dateModified desc limit 5")
        XCTAssertEqual(ordered.terms, ["soup"])
        XCTAssertTrue(ordered.hasUnsupportedOperators)
    }

    func testEmptyQuery() {
        XCTAssertTrue(LocalSearchQuery("   ").isEmpty)
        XCTAssertTrue(LocalSearchQuery("\"\"").isEmpty)
    }
}
