import WebKit
import XCTest
@testable import Trinote

/// Choosing a heading or paragraph to link to, and the blocks the editor's Insert menu adds.
final class BlockReferenceTests: XCTestCase {
    func testTheOutlineListsHeadingsAndParagraphsWithTheirIds() {
        let html = #"<h2 data-trilium-block-id="abc">Intro &amp; more</h2><p>First <strong>one</strong></p><p></p><figure class="table"><table><tr><td><p>cell</p></td></tr></table></figure><ul><li><p>item</p></li></ul>"#
        let blocks = NoteBlockOutline.blocks(in: html)
        XCTAssertEqual(blocks.map(\.text), ["Intro & more", "First one", "item"])
        XCTAssertEqual(blocks.map(\.headingLevel), [2, nil, nil])
        XCTAssertEqual(blocks.map(\.blockId), ["abc", nil, nil])
    }

    func testTabTitlesAreNotBlocksButTheirPanelsHaveThem() {
        let html = #"<div class="trilium-tabs"><section class="trilium-tab"><p class="trilium-tab-title">One</p><div class="trilium-tab-panel"><p>Body</p></div></section></div>"#
        XCTAssertEqual(NoteBlockOutline.blocks(in: html).map(\.text), ["Body"])
    }

    func testGivingABlockAnIdChangesNothingElse() throws {
        let html = #"<p>héllo</p><!-- <p>not this</p> --><h1 class="a">Título</h1>"#
        let blocks = NoteBlockOutline.blocks(in: html)
        XCTAssertEqual(blocks.map(\.text), ["héllo", "Título"])
        let updated = try XCTUnwrap(NoteBlockOutline.html(html, assigning: "ID1", atTagOffset: try XCTUnwrap(blocks[1].tagOffset)))
        XCTAssertEqual(updated, #"<p>héllo</p><!-- <p>not this</p> --><h1 data-trilium-block-id="ID1" class="a">Título</h1>"#)
    }

    func testNewIdsLookLikeTriliums() {
        XCTAssertNotNil(NoteBlockOutline.newBlockId().range(of: "^[A-Za-z0-9]{12}$", options: .regularExpression))
    }

    // MARK: The editor

    @MainActor
    private final class Loader: NSObject, WKNavigationDelegate {
        var finished: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            finished?.resume()
            finished = nil
        }
    }

    @MainActor
    private func makeEditor() async throws -> WKWebView {
        let web = WKWebView(frame: CGRect(x: 0, y: 0, width: 400, height: 400), configuration: WKWebViewConfiguration())
        let loader = Loader()
        web.navigationDelegate = loader
        let url = try XCTUnwrap(Bundle.main.url(forResource: "editor", withExtension: "html"))
        await withCheckedContinuation { continuation in
            loader.finished = continuation
            web.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        for _ in 0..<100 {
            if try await web.evaluateJavaScript("typeof window.editorBridge !== 'undefined' && typeof editor !== 'undefined'") as? Bool == true { break }
            try await Task.sleep(nanoseconds: 50_000_000)
        }
        return web
    }

    @MainActor
    private func html(_ web: WKWebView) async throws -> String {
        try await web.evaluateJavaScript("window.editorBridge.getContent()") as? String ?? ""
    }

    @MainActor
    private func set(_ web: WKWebView, _ html: String) async throws {
        _ = try await web.callAsyncJavaScript("window.editorBridge.setContent(h); return 1", arguments: ["h": html], contentWorld: .page)
    }

    @MainActor
    private func call(_ web: WKWebView, _ script: String) async throws -> Any? {
        try await web.callAsyncJavaScript(script, arguments: [:], contentWorld: .page)
    }

    @MainActor
    func testColumnsAreInsertedTheWayTriliumStoresThem() async throws {
        let web = try await makeEditor()
        try await set(web, "<p>x</p>")
        _ = try await call(web, "window.editorBridge.insertColumns(3); return 1")
        let saved = try await html(web)
        XCTAssertTrue(saved.contains(#"data-trilium-column-ratios="1-1-1""#), saved)
        XCTAssertEqual(saved.components(separatedBy: "trilium-multicolumn-column").count - 1, 3, saved)
    }

    @MainActor
    func testTabsAreInsertedWithTwoTitledTabs() async throws {
        let web = try await makeEditor()
        try await set(web, "<p></p>")
        _ = try await call(web, "window.editorBridge.insertTabs(); return 1")
        let saved = try await html(web)
        XCTAssertTrue(saved.contains(">Tab 1<"), saved)
        XCTAssertTrue(saved.contains(">Tab 2<"), saved)
        XCTAssertEqual(saved.components(separatedBy: "trilium-tab-panel").count - 1, 2, saved)
    }

    @MainActor
    func testAParagraphGetsAnIdOnceAndALinkPointsAtIt() async throws {
        let web = try await makeEditor()
        try await set(web, "<h2>Title</h2><p>Body</p>")
        let json = try await web.evaluateJavaScript("window.editorBridge.blockOutlineJSON()") as? String ?? "[]"
        let blocks = try JSONDecoder().decode([NoteBlock].self, from: Data(json.utf8))
        XCTAssertEqual(blocks.map(\.text), ["Title", "Body"])
        XCTAssertEqual(blocks.first?.headingLevel, 2)

        let pos = try XCTUnwrap(blocks.last?.id)
        let id = try await call(web, "return window.editorBridge.assignBlockId(\(pos))") as? String ?? ""
        XCTAssertEqual(id.count, 12)
        let again = try await call(web, "return window.editorBridge.assignBlockId(\(pos))") as? String
        XCTAssertEqual(again, id, "a block keeps the id it has")

        _ = try await call(web, "window.editorBridge.insertBlockLink('note1', '\(id)', 'Note - Body'); return 1")
        let saved = try await html(web)
        XCTAssertTrue(saved.contains(#"data-trilium-block-id="\#(id)""#), saved)
        XCTAssertTrue(saved.contains(##"href="#root/note1?block=\##(id)""##), saved)
        XCTAssertTrue(saved.contains("reference-link"), saved)
    }

    @MainActor
    func testAnExcerptIsStoredAsTriliumsFullWidthEmbed() async throws {
        let web = try await makeEditor()
        try await set(web, "<p></p>")
        _ = try await call(web, "window.editorBridge.insertBlockExcerpt('note2', 'blk1', 'Other'); return 1")
        let saved = try await html(web)
        XCTAssertTrue(saved.contains("<figure"), saved)
        XCTAssertTrue(saved.contains(#"class="include-note""#), saved)
        XCTAssertTrue(saved.contains(#"data-note-id="note2""#), saved)
        XCTAssertTrue(saved.contains(#"data-block="blk1""#), saved)
        XCTAssertTrue(saved.contains(#"data-box-size="full""#), saved)
    }

    @MainActor
    func testAVideoFileBecomesAPlayer() async throws {
        let web = try await makeEditor()
        try await set(web, "<p></p>")
        _ = try await call(web, "return window.editorBridge.insertMediaEmbed('https://example.com/clips/a%20b.mp4')")
        let saved = try await html(web)
        XCTAssertTrue(saved.contains("link-embed"), saved)
        XCTAssertTrue(saved.contains(#"data-embed-type="video""#), saved)
        XCTAssertTrue(saved.contains(#"data-title="a b.mp4""#), saved)
    }

    @MainActor
    func testTheInsertMenuAppearsOnlyWhenTheServerStoresTheseBlocks() async throws {
        let web = try await makeEditor()
        let hidden = "return document.querySelector('[title=\"Insert\"]').parentElement.style.display"
        let before = try await call(web, hidden) as? String
        XCTAssertEqual(before, "none")
        _ = try await call(web, "window.editorBridge.setContentBlockSupport(true); return 1")
        let after = try await call(web, hidden) as? String
        XCTAssertNotEqual(after, "none")
    }

    // MARK: Leaving columns and tabs with Return

    @MainActor
    private func press(_ web: WKWebView, _ steps: [String]) async throws {
        for step in steps {
            if step == "⏎" {
                _ = try await call(web, "editor.view.someProp('handleKeyDown', (f) => f(editor.view, new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 }))); return 1")
            } else {
                _ = try await web.callAsyncJavaScript("editor.commands.insertContent(t); return 1", arguments: ["t": step], contentWorld: .page)
            }
        }
    }

    /// The note's top-level blocks as `type:text`, and how deep the caret is (1 is a line of the note itself).
    @MainActor
    private func outline(_ web: WKWebView) async throws -> (blocks: [String], caretDepth: Int, caretBlock: Int) {
        let json = try await call(web, """
            const blocks = [];
            editor.state.doc.forEach((n) => blocks.push(n.type.name + ':' + n.textContent));
            const $from = editor.state.selection.$from;
            return JSON.stringify({ blocks, depth: $from.depth, block: $from.index(0) });
            """) as? String ?? "{}"
        struct Result: Decodable { let blocks: [String]; let depth: Int; let block: Int }
        let result = try JSONDecoder().decode(Result.self, from: Data(json.utf8))
        return (result.blocks, result.depth, result.block)
    }

    @MainActor
    func testTwoReturnsLeaveAColumnAtTheEndOfTheNote() async throws {
        let web = try await makeEditor()
        try await set(web, "<p></p>")
        _ = try await call(web, "window.editorBridge.insertColumns(2); return 1")
        try await press(web, ["hello", "⏎", "⏎"])
        let result = try await outline(web)
        XCTAssertEqual(result.blocks, ["multicolumnLayout:hello", "paragraph:"], "the empty line doesn't stay in the column")
        XCTAssertEqual(result.caretDepth, 1)
        XCTAssertEqual(result.caretBlock, 1)
        try await press(web, ["below"])
        let typed = try await outline(web)
        XCTAssertEqual(typed.blocks.last, "paragraph:below")
    }

    @MainActor
    func testLeavingAColumnLandsBetweenItAndWhatFollows() async throws {
        let web = try await makeEditor()
        try await set(web, "<p></p><p>after</p>")
        _ = try await call(web, "editor.commands.setTextSelection(1); window.editorBridge.insertColumns(2); return 1")
        try await press(web, ["x", "⏎", "⏎"])
        let result = try await outline(web)
        XCTAssertEqual(result.blocks, ["multicolumnLayout:x", "paragraph:", "paragraph:after"])
        XCTAssertEqual(result.caretBlock, 1)
    }

    @MainActor
    func testOneReturnInANewColumnStaysInIt() async throws {
        let web = try await makeEditor()
        try await set(web, "<p></p>")
        _ = try await call(web, "window.editorBridge.insertColumns(2); return 1")
        try await press(web, ["⏎"])
        let result = try await outline(web)
        XCTAssertEqual(result.blocks.count, 1)
        XCTAssertGreaterThan(result.caretDepth, 1)
    }

    @MainActor
    func testReturnOnAnEmptyLineMidColumnStaysInIt() async throws {
        let web = try await makeEditor()
        try await set(web, "<p></p>")
        _ = try await call(web, "window.editorBridge.insertColumns(2); return 1")
        try await press(web, ["a", "⏎", "b"])
        // Makes an empty line above "b" and puts the caret on it.
        _ = try await call(web, """
            const $from = editor.state.selection.$from;
            editor.commands.setTextSelection($from.start());
            return 1
            """)
        try await press(web, ["⏎"])
        _ = try await call(web, """
            let empty = null;
            editor.state.doc.descendants((n, pos) => { if (n.type.name === 'paragraph' && !n.content.size && empty === null) empty = pos; });
            editor.commands.setTextSelection(empty + 1);
            return 1
            """)
        try await press(web, ["⏎"])
        let result = try await outline(web)
        XCTAssertEqual(result.blocks.count, 1, "text still follows this line, so it isn't the column's last")
        XCTAssertGreaterThan(result.caretDepth, 1)
    }

    @MainActor
    func testTwoReturnsLeaveATab() async throws {
        let web = try await makeEditor()
        try await set(web, "<p></p>")
        _ = try await call(web, "window.editorBridge.insertTabs(); return 1")
        try await press(web, ["⏎", "body", "⏎", "⏎"])
        let result = try await outline(web)
        XCTAssertEqual(result.blocks.count, 2)
        XCTAssertEqual(result.blocks.last, "paragraph:")
        XCTAssertEqual(result.caretDepth, 1)
    }
}
