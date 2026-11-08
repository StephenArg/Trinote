import XCTest
@testable import Trinote

final class GeoMapSubtreeTests: XCTestCase {
    /// map
    /// ├── Paris (folder)
    /// │   ├── Louvre
    /// │   └── Old trips (folder, archived)
    /// │       └── Hotel 2019
    /// ├── Rome
    /// └── Spain (folder)
    ///     └── Madrid (folder)
    ///         └── Prado
    private let tree: [String: [String]] = [
        "map": ["paris", "rome", "spain"],
        "paris": ["louvre", "old"],
        "old": ["hotel2019"],
        "louvre": [], "hotel2019": [], "rome": [],
        "spain": ["madrid"],
        "madrid": ["prado"],
        "prado": [],
    ]

    private func walk(
        _ tree: [String: [String]],
        options: GeoMapSubtree.Options = .init(),
        limit: Int = GeoMapSubtree.noteLimit,
        archived: Set<String> = ["old"]
    ) -> [String] {
        GeoMapSubtree.noteIds(
            mapNoteId: "map",
            options: options,
            limit: limit,
            children: { tree[$0] },
            isArchived: { archived.contains($0) }
        )
    }

    func testWalksTheWholeSubtreeDepthFirstLikeTrilium() {
        XCTAssertEqual(walk(tree), ["paris", "louvre", "rome", "spain", "madrid", "prado"])
    }

    func testArchivedNotesAndWhatIsUnderThemCountOnlyWithIncludeArchived() {
        XCTAssertFalse(walk(tree).contains("hotel2019"))
        XCTAssertEqual(
            walk(tree, options: .init(includeArchived: true)),
            ["paris", "louvre", "old", "hotel2019", "rome", "spain", "madrid", "prado"]
        )
    }

    func testMaxNestingDepthCountsLevelsBelowTheChildren() {
        XCTAssertEqual(walk(tree, options: .init(maxDepth: 0)), ["paris", "rome", "spain"])
        XCTAssertEqual(walk(tree, options: .init(maxDepth: 1)), ["paris", "louvre", "rome", "spain", "madrid"])
        XCTAssertEqual(walk(tree, options: .init(maxDepth: -1)), walk(tree))
    }

    func testAClonedNoteCountsOnceAndTheMapItselfIsNeverWalkedAgain() {
        var cloned = tree
        cloned["rome"] = ["louvre", "map"]
        XCTAssertEqual(walk(cloned), ["paris", "louvre", "rome", "spain", "madrid", "prado"])
    }

    func testNotesThatWereNotLoadedAreLeftOutAndTheWalkGoesOn() {
        var partial = tree
        partial["spain"] = nil
        XCTAssertEqual(walk(partial), ["paris", "louvre", "rome"])
    }

    func testStopsAtTheLimit() {
        XCTAssertEqual(walk(tree, limit: 3), ["paris", "louvre", "rome"])
    }

    func testMaxNestingDepthLabelReadsLikeTrilium() {
        XCTAssertEqual(CollectionNoteModels.maxNestingDepth(label: nil), -1)
        XCTAssertEqual(CollectionNoteModels.maxNestingDepth(label: "2"), 2)
        XCTAssertEqual(CollectionNoteModels.maxNestingDepth(label: "abc"), -1)
    }
}
