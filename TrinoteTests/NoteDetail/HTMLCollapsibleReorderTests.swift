import XCTest
@testable import Trinote

final class HTMLCollapsibleReorderTests: XCTestCase {

    private let mixed = """
    <p>Intro</p>
    <details class="trilium-collapsible" open><summary>A</summary><p>a-body</p></details>
    <p>Middle</p>
    <details class="trilium-collapsible"><summary>B</summary><p>b-body</p></details>
    <p>Outro</p>
    """

    func testMoveFirstCollapsibleBeforeLaterSibling() {
        // Siblings: p Intro, details A, p Middle, details B, p Outro
        // fromIndex 0 = A at sibling 1; move before Outro (sibling 4)
        let result = HTMLCollapsibleReorder.movingDetails(in: mixed, fromIndex: 0, beforeChildIndex: 4)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(summaryTitles(in: html), ["B", "A"])
        XCTAssertEqual(topLevelTags(in: html), ["p", "p", "details", "details", "p"])
        XCTAssertTrue(html.contains("<p>Intro</p>"))
        XCTAssertTrue(html.contains("<p>Middle</p>"))
        XCTAssertTrue(html.contains("<p>Outro</p>"))
    }

    func testMoveLastCollapsibleToFront() {
        // B is fromIndex 1, sibling index 3; move before Intro (sibling 0)
        let result = HTMLCollapsibleReorder.movingDetails(in: mixed, fromIndex: 1, beforeChildIndex: 0)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(summaryTitles(in: html), ["B", "A"])
        XCTAssertEqual(topLevelTags(in: html), ["details", "p", "details", "p", "p"])
    }

    func testAppendToEnd() {
        let result = HTMLCollapsibleReorder.movingDetails(in: mixed, fromIndex: 0, beforeChildIndex: nil)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(topLevelTags(in: html), ["p", "p", "details", "p", "details"])
        XCTAssertEqual(summaryTitles(in: html), ["B", "A"])
    }

    func testNoOpWhenAlreadyInPlace() {
        XCTAssertNil(HTMLCollapsibleReorder.movingDetails(in: mixed, fromIndex: 0, beforeChildIndex: 2))
        XCTAssertNil(HTMLCollapsibleReorder.movingDetails(in: mixed, fromIndex: 1, beforeChildIndex: 4))
    }

    func testPreservesOpenState() {
        let result = HTMLCollapsibleReorder.movingDetails(in: mixed, fromIndex: 0, beforeChildIndex: nil)
        let html = try! XCTUnwrap(result)
        let titles = summaryTitles(in: html)
        XCTAssertEqual(titles.last, "A")
        XCTAssertTrue(html.contains("trilium-collapsible\" open>") || html.contains("trilium-collapsible\" open >") || html.contains(" open><summary>A</summary>"))
    }

    func testNestedReordersOnlySiblings() {
        let nested = """
        <details class="trilium-collapsible" open><summary>Outer</summary>
        <p>Keep</p>
        <details class="trilium-collapsible"><summary>InnerA</summary><p>ia</p></details>
        <details class="trilium-collapsible"><summary>InnerB</summary><p>ib</p></details>
        </details>
        <p>After</p>
        """
        // Indices: 0=Outer, 1=InnerA, 2=InnerB
        // Inner siblings of Outer body (excluding summary): p Keep, InnerA, InnerB
        let swapped = HTMLCollapsibleReorder.movingDetails(in: nested, fromIndex: 2, beforeChildIndex: 1)
        let html = try! XCTUnwrap(swapped)
        XCTAssertEqual(summaryTitles(in: html), ["Outer", "InnerB", "InnerA"])

        XCTAssertNil(HTMLCollapsibleReorder.movingDetails(in: nested, fromIndex: 1, beforeChildIndex: 2))
    }

    func testSkipsIncludeNoteDetails() {
        let withInclude = """
        <div class="trinote-include"><div class="trinote-include__body">
        <details class="trilium-collapsible"><summary>Inc</summary><p>x</p></details>
        </div></div>
        <details class="trilium-collapsible"><summary>A</summary><p>a</p></details>
        <details class="trilium-collapsible"><summary>B</summary><p>b</p></details>
        """
        XCTAssertEqual(HTMLCollapsibleReorder.interactiveDetails(in: withInclude).count, 2)
        let result = HTMLCollapsibleReorder.movingDetails(in: withInclude, fromIndex: 1, beforeChildIndex: 0)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(summaryTitles(in: html), ["Inc", "B", "A"])
    }

    func testSettingOpenAddsAndRemovesAttribute() {
        let opened = try! XCTUnwrap(HTMLCollapsibleReorder.settingOpen(in: mixed, index: 1, open: true))
        XCTAssertTrue(opened.contains("<summary>B</summary>"))
        let bTag = openingDetailsTags(in: opened)[1]
        XCTAssertTrue(openAttributePresent(in: bTag))
        XCTAssertNil(HTMLCollapsibleReorder.settingOpen(in: opened, index: 1, open: true))

        let closed = try! XCTUnwrap(HTMLCollapsibleReorder.settingOpen(in: mixed, index: 0, open: false))
        let aTag = openingDetailsTags(in: closed)[0]
        XCTAssertFalse(openAttributePresent(in: aTag))
        XCTAssertNil(HTMLCollapsibleReorder.settingOpen(in: closed, index: 0, open: false))
    }

    func testSettingOpenOutOfRange() {
        XCTAssertNil(HTMLCollapsibleReorder.settingOpen(in: mixed, index: 9, open: true))
        XCTAssertNil(HTMLCollapsibleReorder.settingOpen(in: mixed, index: -1, open: true))
    }

    // MARK: - Helpers

    private func summaryTitles(in html: String) -> [String] {
        let pattern = try! NSRegularExpression(pattern: #"<summary>(.*?)</summary>"#, options: [.dotMatchesLineSeparators])
        let ns = html as NSString
        return pattern.matches(in: html, range: NSRange(location: 0, length: ns.length)).map {
            ns.substring(with: $0.range(at: 1))
        }
    }

    private func topLevelTags(in html: String) -> [String] {
        HTMLCollapsibleReorder.findAllElements(in: html)
            .filter { el in
                !HTMLCollapsibleReorder.findAllElements(in: html).contains { outer in
                    outer.openStart != el.openStart
                        && el.openStart >= outer.openEnd
                        && el.closeEnd <= outer.closeStart
                }
            }
            .map(\.tag)
    }

    private func openingDetailsTags(in html: String) -> [String] {
        HTMLCollapsibleReorder.interactiveDetails(in: html).map { el in
            (html as NSString).substring(with: NSRange(location: el.openStart, length: el.openEnd - el.openStart))
        }
    }

    private func openAttributePresent(in openTag: String) -> Bool {
        openTag.range(of: #"\sopen(?:\s*=|\s*>|\s/>)"#, options: .regularExpression) != nil
    }
}
