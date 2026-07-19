import XCTest
@testable import Trinote

final class HTMLTodoListReorderTests: XCTestCase {

    private let sampleList = """
    <p>Intro</p>
    <ul class="todo-list">
    <li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">A</span></label></li>
    <li><label class="todo-list__label"><input type="checkbox" disabled checked="checked"><span class="todo-list__label__description">B</span></label></li>
    <li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">C</span></label></li>
    </ul>
    """

    func testMoveFirstBeforeLast() {
        let result = HTMLTodoListReorder.movingListItem(in: sampleList, fromIndex: 0, beforeIndex: 2)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(todoDescriptions(in: html), ["B", "A", "C"])
    }

    func testMoveLastToFront() {
        let result = HTMLTodoListReorder.movingListItem(in: sampleList, fromIndex: 2, beforeIndex: 0)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(todoDescriptions(in: html), ["C", "A", "B"])
    }

    func testAppendToEnd() {
        let result = HTMLTodoListReorder.movingListItem(in: sampleList, fromIndex: 0, beforeIndex: nil)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(todoDescriptions(in: html), ["B", "C", "A"])
    }

    func testNoOpWhenAlreadyInPlace() {
        XCTAssertNil(HTMLTodoListReorder.movingListItem(in: sampleList, fromIndex: 0, beforeIndex: 1))
        XCTAssertNil(HTMLTodoListReorder.movingListItem(in: sampleList, fromIndex: 2, beforeIndex: nil))
    }

    func testPreservesCheckedState() {
        let result = HTMLTodoListReorder.movingListItem(in: sampleList, fromIndex: 1, beforeIndex: 0)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(todoDescriptions(in: html), ["B", "A", "C"])
        XCTAssertTrue(html.contains("checked=\"checked\""))
        XCTAssertTrue(html.contains("description\">B</span>"))
    }

    func testNestedListReordersOnlySiblings() {
        let nested = """
        <ul class="todo-list">
        <li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">Parent1</span></label>
        <ul class="todo-list">
        <li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">ChildA</span></label></li>
        <li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">ChildB</span></label></li>
        </ul>
        </li>
        <li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">Parent2</span></label></li>
        </ul>
        """
        // Indices: 0=Parent1, 1=ChildA, 2=ChildB, 3=Parent2
        let swappedChildren = HTMLTodoListReorder.movingListItem(in: nested, fromIndex: 2, beforeIndex: 1)
        let html = try! XCTUnwrap(swappedChildren)
        XCTAssertEqual(todoDescriptions(in: html), ["Parent1", "ChildB", "ChildA", "Parent2"])

        XCTAssertNil(HTMLTodoListReorder.movingListItem(in: nested, fromIndex: 1, beforeIndex: 3))
    }

    func testSkipsIncludeNoteListItems() {
        let withInclude = """
        <div class="trinote-include"><div class="trinote-include__body">
        <ul class="todo-list"><li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">Inc</span></label></li></ul>
        </div></div>
        <ul class="todo-list">
        <li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">A</span></label></li>
        <li><label class="todo-list__label"><input type="checkbox" disabled><span class="todo-list__label__description">B</span></label></li>
        </ul>
        """
        XCTAssertEqual(HTMLTodoListReorder.interactiveListItems(in: withInclude).count, 2)
        let result = HTMLTodoListReorder.movingListItem(in: withInclude, fromIndex: 1, beforeIndex: 0)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(todoDescriptions(in: html), ["Inc", "B", "A"])
    }

    func testBulletListReorder() {
        let bullets = """
        <ul>
        <li>Alpha</li>
        <li>Bravo</li>
        <li>Charlie</li>
        </ul>
        """
        let result = HTMLTodoListReorder.movingListItem(in: bullets, fromIndex: 2, beforeIndex: 0)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(plainListTexts(in: html), ["Charlie", "Alpha", "Bravo"])
    }

    func testNumberedListReorder() {
        let numbered = """
        <ol>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        </ol>
        """
        let result = HTMLTodoListReorder.movingListItem(in: numbered, fromIndex: 0, beforeIndex: nil)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(plainListTexts(in: html), ["Two", "Three", "One"])
    }

    func testMixedListsUseSeparateSiblingGroups() {
        let mixed = """
        <ul><li>A</li><li>B</li></ul>
        <ol><li>1</li><li>2</li></ol>
        """
        // Indices: 0=A, 1=B, 2=1, 3=2 — moving B before A
        let result = HTMLTodoListReorder.movingListItem(in: mixed, fromIndex: 1, beforeIndex: 0)
        let html = try! XCTUnwrap(result)
        XCTAssertEqual(plainListTexts(in: html), ["B", "A", "1", "2"])
        // Cross-list move must no-op
        XCTAssertNil(HTMLTodoListReorder.movingListItem(in: mixed, fromIndex: 0, beforeIndex: 2))
    }

    private func todoDescriptions(in html: String) -> [String] {
        let pattern = try! NSRegularExpression(
            pattern: #"todo-list__label__description">(.*?)</span>"#,
            options: []
        )
        let ns = html as NSString
        return pattern.matches(in: html, range: NSRange(location: 0, length: ns.length)).map {
            ns.substring(with: $0.range(at: 1))
        }
    }

    private func plainListTexts(in html: String) -> [String] {
        let pattern = try! NSRegularExpression(pattern: #"<li>(.*?)</li>"#, options: [.dotMatchesLineSeparators])
        let ns = html as NSString
        return pattern.matches(in: html, range: NSRange(location: 0, length: ns.length)).map {
            ns.substring(with: $0.range(at: 1))
        }
    }
}
