import XCTest
@testable import Trinote

/// Setting a to-do item's state in stored text-note HTML, as Trilium's editor stores it (issue #37).
final class TodoTaskStateHTMLTests: XCTestCase {

    /// An item as stored. Trinote adds `checked` after the other attributes; Trilium writes it before `disabled`
    /// (`checkedFirst`), which reads the same.
    private func item(_ text: String, li: String = "<li>", checked: Bool = false, checkedFirst: Bool = false) -> String {
        let input = checkedFirst
            ? "<input type=\"checkbox\" checked=\"checked\" disabled=\"disabled\">"
            : "<input type=\"checkbox\" disabled=\"disabled\"\(checked ? " checked=\"checked\"" : "")>"
        return "\(li)<label class=\"todo-list__label\">\(input)"
            + "<span class=\"todo-list__label__description\">\(text)</span></label></li>"
    }

    private func set(_ state: String, completed: Bool = false, title: String? = nil, at index: Int, in html: String) -> String? {
        TodoTaskStateHTML.settingState(state, isCompleted: completed, title: title, checkboxIndex: index, in: html)
    }

    func testCustomStateGoesOnTheListItem() {
        let html = "<ul class=\"todo-list\">\(item("a"))\(item("b"))</ul>"
        let out = set("doing", title: "Doing", at: 1, in: html)
        XCTAssertEqual(out, "<ul class=\"todo-list\">\(item("a"))\(item("b", li: "<li data-trilium-task-state=\"doing\" title=\"Doing\">"))</ul>")
    }

    func testCompletedCustomStateIsChecked() {
        let html = "<ul class=\"todo-list\">\(item("a"))</ul>"
        let out = set("_review", completed: true, title: "Review \"quick\"", at: 0, in: html)
        XCTAssertEqual(out, "<ul class=\"todo-list\">\(item("a", li: "<li data-trilium-task-state=\"_review\" title=\"Review &quot;quick&quot;\">", checked: true))</ul>")
    }

    func testDoneAndNoneOnlyChangeCheckedAndDropTheState() {
        let custom = "<ul class=\"todo-list\">\(item("a", li: "<li data-trilium-task-state=\"maybe\" title=\"Maybe\">"))</ul>"
        XCTAssertEqual(set("done", completed: true, at: 0, in: custom), "<ul class=\"todo-list\">\(item("a", checked: true))</ul>")
        let done = "<ul class=\"todo-list\">\(item("a", checkedFirst: true))</ul>"
        XCTAssertEqual(set("none", at: 0, in: done), "<ul class=\"todo-list\">\(item("a"))</ul>")
        XCTAssertNil(set("none", at: 0, in: "<ul class=\"todo-list\">\(item("a"))</ul>"), "nothing to change")
        XCTAssertNil(set("done", completed: true, at: 3, in: done), "no such checkbox")
    }

    func testNestedItemsKeepTheirOwnState() {
        let nested = "<ul class=\"todo-list\">\(item("child"))</ul>"
        let parent = "<li><label class=\"todo-list__label\"><input type=\"checkbox\" disabled=\"disabled\">"
            + "<span class=\"todo-list__label__description\">parent</span></label>\(nested)</li>"
        let html = "<ul class=\"todo-list\">\(parent)</ul>"
        let out = try? XCTUnwrap(set("doing", title: "Doing", at: 1, in: html))
        XCTAssertEqual(out, "<ul class=\"todo-list\"><li><label class=\"todo-list__label\"><input type=\"checkbox\" disabled=\"disabled\">"
            + "<span class=\"todo-list__label__description\">parent</span></label><ul class=\"todo-list\">"
            + item("child", li: "<li data-trilium-task-state=\"doing\" title=\"Doing\">") + "</ul></li></ul>")
    }

    func testIncludedNoteCheckboxesAreNotCounted() {
        let include = "<section class=\"trinote-include\" data-note-id=\"n\"><div class=\"trinote-include__inner\">"
            + "<ul class=\"todo-list\">\(item("included"))</ul></div></section>"
        let html = "\(include)<ul class=\"todo-list\">\(item("mine"))</ul>"
        let out = set("cancelled", title: "Cancelled", at: 0, in: html)
        XCTAssertEqual(out, "\(include)<ul class=\"todo-list\">\(item("mine", li: "<li data-trilium-task-state=\"cancelled\" title=\"Cancelled\">"))</ul>")
    }

    func testCheckedAttributeForms() {
        XCTAssertEqual(TodoTaskStateHTML.settingChecked(true, inInputTag: "<input type=\"checkbox\" disabled>"),
                       "<input type=\"checkbox\" disabled checked=\"checked\">")
        XCTAssertEqual(TodoTaskStateHTML.settingChecked(true, inInputTag: "<input type=\"checkbox\" />"),
                       "<input type=\"checkbox\" checked=\"checked\" />")
        XCTAssertEqual(TodoTaskStateHTML.settingChecked(false, inInputTag: "<input type=\"checkbox\" checked disabled>"),
                       "<input type=\"checkbox\" disabled>")
        XCTAssertEqual(TodoTaskStateHTML.settingChecked(false, inInputTag: "<input data-checked=\"1\" type=\"checkbox\">"),
                       "<input data-checked=\"1\" type=\"checkbox\">", "only the real attribute")
    }
}
