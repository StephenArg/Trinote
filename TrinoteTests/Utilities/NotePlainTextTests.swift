import XCTest
@testable import Trinote

final class NotePlainTextTests: XCTestCase {
    func testHTMLBecomesPlainText() {
        let html = "<p>Hello&nbsp;<b>world</b></p><p>A &amp; B &#x41;&#66;</p>"
        XCTAssertEqual(NotePlainText.fromHTML(html), "Hello world\n\nA & B AB")
    }

    func testNumericEntitiesOutsideTheBasicPlane() {
        XCTAssertEqual(NotePlainText.fromHTML("<p>&#128512; &#xD800;ok</p>"), "😀 ok")
    }

    func testSearchableTextDropsDataURIs() throws {
        let html = "<p>Photo <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUg\">caption</p><a href='data:text/plain,hidden'>link</a>"
        let text = try XCTUnwrap(NotePlainText.searchableText(noteType: NoteType.text.rawValue, data: Data(html.utf8)))
        XCTAssertFalse(text.contains("base64"))
        XCTAssertFalse(text.contains("hidden"))
        XCTAssertTrue(text.contains("Photo caption"))
        XCTAssertTrue(text.contains("link"))
    }

    func testCodeNotesKeepTheirSource() {
        let source = "let x = \"<b>not html</b>\""
        XCTAssertEqual(NotePlainText.searchableText(noteType: NoteType.code.rawValue, data: Data(source.utf8)), source)
    }

    func testOnlyTextTypesAreSearchable() {
        XCTAssertNil(NotePlainText.searchableText(noteType: NoteType.image.rawValue, data: Data("x".utf8)))
        XCTAssertNil(NotePlainText.searchableText(noteType: NoteType.canvas.rawValue, data: Data("{}".utf8)))
        XCTAssertNil(NotePlainText.searchableText(noteType: NoteType.text.rawValue, data: Data([0xFF, 0xFE, 0xFD])))
    }

    func testFoldIgnoresCaseAccentsAndSpacing() {
        XCTAssertEqual(NotePlainText.fold("Café  Ünïcode\nTEXT"), "cafe unicode text")
    }
}
