import WebKit
import XCTest
@testable import Trinote

/// Loads the real `editor.html` and checks that what Trilium v0.107 stores in a text note comes back out of the
/// editor unchanged, including after an edit elsewhere in the note. A block lost here is lost on the server too, and
/// the server then erases any attachment the body no longer names.
@MainActor
final class EditorBlockPreservationTests: XCTestCase {

    private final class LoadWaiter: NSObject, WKNavigationDelegate {
        var continuation: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            continuation?.resume()
            continuation = nil
        }
    }

    @MainActor
    private final class MessageRecorder: NSObject, WKScriptMessageHandler {
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {}
    }

    private static let messageNames = [
        "editorReady", "contentChanged", "pickImage", "editorScroll", "editorTypingActivity", "tableToolsVisible",
        "requestSave", "editorRequest", "debugLog", "pasteImageRequest", "insertToolsAtTopChanged",
    ]

    private var webView: WKWebView!
    private let waiter = LoadWaiter()
    private let recorder = MessageRecorder()

    override func setUp() async throws {
        try await super.setUp()
        let url = try XCTUnwrap(Bundle.main.url(forResource: "editor", withExtension: "html"))
        let controller = WKUserContentController()
        for name in Self.messageNames { controller.add(recorder, name: name) }
        let config = WKWebViewConfiguration()
        config.userContentController = controller
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800), configuration: config)
        webView.navigationDelegate = waiter
        await withCheckedContinuation { continuation in
            waiter.continuation = continuation
            webView.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        self.webView = webView
        let deadline = Date().addingTimeInterval(15)
        while Date() < deadline {
            if let ready = try await call("return typeof window.editorBridge === 'object' && typeof editor === 'object';") as? Bool, ready { return }
            try await Task.sleep(for: .milliseconds(100))
        }
        XCTFail("editor.html never finished starting")
    }

    override func tearDown() async throws {
        webView?.configuration.userContentController.removeAllScriptMessageHandlers()
        webView = nil
        try await super.tearDown()
    }

    private func call(_ body: String, _ arguments: [String: Any] = [:]) async throws -> Any? {
        try await webView.callAsyncJavaScript(body, arguments: arguments, contentWorld: .page)
    }

    private func roundTrip(_ html: String) async throws -> String {
        let result = try await call("editorBridge.setContent(html); return editorBridge.getContent();", ["html": html])
        return try XCTUnwrap(result as? String)
    }

    /// Types into the note's first paragraph, then reads the body back.
    private func typeThenRead() async throws -> String {
        let result = try await call("editor.commands.insertContentAt(1, 'typed '); return editorBridge.getContent();")
        return try XCTUnwrap(result as? String)
    }

    private func assertSurvives(_ block: String, file: StaticString = #filePath, line: UInt = #line) async throws {
        let body = "<p>before</p>\(block)<p>after</p>"
        let first = try await roundTrip(body)
        XCTAssertTrue(first.contains(block), "lost on load: \(first)", file: file, line: line)
        let second = try await roundTrip(first)
        XCTAssertEqual(second, first, "not stable across a second round trip", file: file, line: line)
        let edited = try await typeThenRead()
        XCTAssertTrue(edited.contains(block), "lost after an edit: \(edited)", file: file, line: line)
        XCTAssertTrue(edited.contains("typed before"), file: file, line: line)
    }

    func testNoteEmbedWithEveryAttributeAndCaption() async throws {
        try await assertSurvives(#"<figure class="include-note" data-note-id="abc123" data-box-size="resizable" data-block="b1:b2" data-hide-title="true" data-position="wrap-left" style="--include-note-width:30em;--include-note-height:20em;"><figcaption>A <strong>caption</strong></figcaption></figure>"#)
    }

    func testAttachmentEmbed() async throws {
        try await assertSurvives(#"<figure class="include-note" data-attachment-id="att123" data-box-size="full"></figure>"#)
    }

    func testCaptionedMedia() async throws {
        try await assertSurvives(#"<figure class="captioned-content-embed"><section class="link-embed" data-url="https://example.com/v.mp4" data-embed-type="video" data-box-size="resizable" style="--include-note-width:30em;"></section><figcaption>Clip</figcaption></figure>"#)
    }

    func testUnknownEmbedKind() async throws {
        try await assertSurvives(#"<section class="some-kind" data-trilium-embed="future" data-note-id="n1" data-attachment-id="a1"><p>fallback</p></section>"#)
    }

    func testColumnsSurvive() async throws {
        try await assertSurvives(#"<div class="trilium-multicolumn-layout" data-trilium-column-ratios="1-3"><div class="trilium-multicolumn-column"><p data-trilium-block-id="b1">Left</p></div><div class="trilium-multicolumn-column"><p>Right</p></div></div>"#)
    }

    func testAColumnKeepsATableAndItsFigure() async throws {
        let out = try await roundTrip(#"<p>x</p><div class="trilium-multicolumn-layout"><div class="trilium-multicolumn-column"><p>a</p></div><div class="trilium-multicolumn-column"><figure class="table" style="width:50%;"><table><tbody><tr><td>cell</td></tr></tbody></table></figure></div></div>"#)
        XCTAssertTrue(out.contains(#"<figure class="table" style="width:50%;">"#), out)
        XCTAssertEqual(occurrences(of: #"class="trilium-multicolumn-column""#, in: out), 2, out)
    }

    func testAnUnusualNumberOfColumnsKeepsThemAll() async throws {
        let columns = (1...5).map { #"<div class="trilium-multicolumn-column"><p>c\#($0)</p></div>"# }.joined()
        try await assertSurvives(#"<div class="trilium-multicolumn-layout">\#(columns)</div>"#)
    }

    /// The position just inside the first textblock of the first node called `name`.
    private func textPosition(inside name: String) async throws -> Int {
        let pos = try await call("""
            let found = -1;
            editor.state.doc.descendants((node, pos) => {
              if (found >= 0) return false;
              if (node.type.name === name) {
                node.descendants((child, offset) => {
                  if (found < 0 && child.isTextblock) found = pos + 1 + offset + 1;
                });
                if (node.isTextblock) found = pos + 1;
              }
            });
            return found;
            """, ["name": name]) as? Int
        return try XCTUnwrap(pos)
    }

    func testTextInAColumnCanBeEdited() async throws {
        _ = try await roundTrip(#"<div class="trilium-multicolumn-layout"><div class="trilium-multicolumn-column"><p>Left</p></div><div class="trilium-multicolumn-column"><p>Right</p></div></div>"#)
        let at = try await textPosition(inside: "multicolumnColumn")
        let out = try await runCommands("editor.commands.insertContentAt(\(at), 'typed ');")
        XCTAssertTrue(out.contains("<p>typed Left</p>"), out)
        XCTAssertEqual(occurrences(of: #"class="trilium-multicolumn-column""#, in: out), 2, out)
    }

    private let twoColumns = #"<div class="trilium-multicolumn-layout"><div class="trilium-multicolumn-column"><p>Left</p></div><div class="trilium-multicolumn-column"><p>Right</p></div></div>"#

    func testRemovingColumnsRemovesTheirTextAndNothingElse() async throws {
        _ = try await roundTrip("<p>before</p>" + twoColumns + "<p>after</p>")
        // Undo groups changes made within half a second, and loading the note counts as one here.
        try await Task.sleep(nanoseconds: 700_000_000)
        let out = try await runCommands("document.querySelector('.tn-block-frame__bar button').click();")
        XCTAssertEqual(out, "<p>before</p><p>after</p>")
        let undone = try await runCommands("editor.commands.undo();")
        XCTAssertTrue(undone.contains(">Left<") && undone.contains(">Right<"), undone)
    }

    func testRemovingColumnsThatAreTheWholeNoteLeavesAnEmptyLine() async throws {
        _ = try await roundTrip(twoColumns)
        let out = try await runCommands("document.querySelector('.tn-block-frame__bar button').click();")
        XCTAssertFalse(out.contains("Left") || out.contains("multicolumn"), out)
        let blocks = try await call("return editor.state.doc.childCount + ':' + editor.state.doc.firstChild.type.name") as? String
        XCTAssertEqual(blocks, "1:paragraph")
    }

    private let oneTab = #"<div class="trilium-tabs"><section class="trilium-tab"><p class="trilium-tab-title">One</p><div class="trilium-tab-panel"><p>Body</p></div></section></div>"#

    func testTextInATabCanBeEdited() async throws {
        _ = try await roundTrip(oneTab)
        let title = try await textPosition(inside: "triliumTabTitle")
        var out = try await runCommands("editor.commands.insertContentAt(\(title), 'New ');")
        XCTAssertTrue(out.contains(#"<p class="trilium-tab-title">New One</p>"#), out)
        let panel = try await textPosition(inside: "triliumTabPanel")
        out = try await runCommands("editor.commands.insertContentAt(\(panel), 'typed ');")
        XCTAssertTrue(out.contains("<p>typed Body</p>"), out)
    }

    func testEnterInATabTitleMovesToItsContent() async throws {
        _ = try await roundTrip(oneTab)
        let title = try await textPosition(inside: "triliumTabTitle")
        let parent = try await call("""
            editor.commands.setTextSelection(\(title));
            editor.view.someProp('handleKeyDown', f => f(editor.view, new KeyboardEvent('keydown', { key: 'Enter' })));
            return editor.state.selection.$from.node(-1).type.name;
            """) as? String
        XCTAssertEqual(parent, "triliumTabPanel")
        let out = try await call("return editorBridge.getContent();") as? String
        XCTAssertEqual(occurrences(of: "trilium-tab-title", in: try XCTUnwrap(out)), 1, out ?? "")
    }

    private let twoTabs = #"<div class="trilium-tabs"><section class="trilium-tab"><p class="trilium-tab-title">One</p><div class="trilium-tab-panel"><p>First</p></div></section><section class="trilium-tab"><p class="trilium-tab-title">Two</p><div class="trilium-tab-panel"><p>Second</p></div></section></div>"#

    func testRemovingTabsRemovesTheirTitlesAndTextAndNothingElse() async throws {
        _ = try await roundTrip("<p>before</p>" + twoTabs + "<p>after</p>")
        let out = try await runCommands(#"document.querySelector('button[aria-label="Remove tabs and their text"]').click();"#)
        XCTAssertEqual(out, "<p>before</p><p>after</p>")
    }

    func testRemovingOneTabLeavesTheOthers() async throws {
        _ = try await roundTrip(twoTabs)
        let out = try await runCommands("document.querySelector('.tn-tab-frame__remove').click();")
        XCTAssertFalse(out.contains("First"), out)
        XCTAssertTrue(out.contains("Second") && out.contains("trilium-tabs"), out)
    }

    func testRemovingTheLastTabRemovesTheBlockAndItsText() async throws {
        _ = try await roundTrip("<p>before</p>" + oneTab + "<p>after</p>")
        let out = try await runCommands("document.querySelector('.tn-tab-frame__remove').click();")
        XCTAssertEqual(out, "<p>before</p><p>after</p>")
    }

    func testRemovingTabsThatAreTheWholeNoteLeavesAnEmptyLine() async throws {
        _ = try await roundTrip(oneTab)
        let out = try await runCommands("document.querySelector('.tn-tab-frame__remove').click();")
        XCTAssertFalse(out.contains("Body") || out.contains("trilium-tabs"), out)
        let blocks = try await call("return editor.state.doc.childCount + ':' + editor.state.doc.firstChild.type.name") as? String
        XCTAssertEqual(blocks, "1:paragraph")
    }

    func testBlockIdsStayOnTabsAndColumns() async throws {
        let out = try await roundTrip(#"<div class="trilium-tabs"><section class="trilium-tab" data-trilium-block-id="t1"><p class="trilium-tab-title">One</p><div class="trilium-tab-panel"><p data-trilium-block-id="p1">Body</p></div></section></div>"#)
        XCTAssertTrue(out.contains(#"data-trilium-block-id="t1""#), out)
        XCTAssertTrue(out.contains(#"data-trilium-block-id="p1""#), out)
    }

    func testAnEmbedInsideAColumnStillSurvives() async throws {
        let embed = #"<figure class="include-note" data-attachment-id="att1" data-box-size="full"></figure>"#
        try await assertSurvives(#"<div class="trilium-multicolumn-layout"><div class="trilium-multicolumn-column">\#(embed)</div><div class="trilium-multicolumn-column"><p>b</p></div></div>"#)
    }

    func testTabs() async throws {
        try await assertSurvives(#"<div class="trilium-tabs" data-trilium-tab-alignment="bottom"><section class="trilium-tab"><p class="trilium-tab-title">One</p><div class="trilium-tab-panel"><p>Body</p></div></section></div>"#)
    }

    func testMathScriptInsideAColumn() async throws {
        let out = try await roundTrip(#"<p>x</p><div class="trilium-multicolumn-layout"><div class="trilium-multicolumn-column"><p><script type="math/tex">a^2</script></p></div></div>"#)
        XCTAssertTrue(out.contains(#"<script type="math/tex">a^2</script>"#), out)
    }

    func testMathScriptInsideALockedBlock() async throws {
        let out = try await roundTrip(#"<p>x</p><section data-trilium-embed="future"><script type="math/tex">a^2</script></section>"#)
        XCTAssertTrue(out.contains(#"<script type="math/tex">a^2</script>"#), out)
    }

    func testFigureEmbedIsAnIncludeNodeSoItGetsANotePreview() async throws {
        _ = try await roundTrip(#"<figure class="include-note" data-note-id="abc123" data-box-size="full"></figure>"#)
        let noteId = try await call("""
            let id = null;
            editor.state.doc.descendants((node) => { if (node.type.name === 'includeNote') id = node.attrs.noteId; });
            return id;
            """) as? String
        XCTAssertEqual(noteId, "abc123")
    }

    func testOldSectionIncludeIsUnchanged() async throws {
        let out = try await roundTrip(#"<section class="include-note" data-note-id="n1" data-box-size="small"></section><p>x</p>"#)
        XCTAssertTrue(out.contains(#"<section class="include-note" data-note-id="n1" data-box-size="small"></section>"#), out)
    }

    // MARK: Block ids

    private func occurrences(of needle: String, in text: String) -> Int {
        text.components(separatedBy: needle).count - 1
    }

    func testBlockIdsStayOnEveryKindOfBlock() async throws {
        let out = try await roundTrip(#"<p data-trilium-block-id="p1">a</p><h2 data-trilium-block-id="h1">b</h2><blockquote data-trilium-block-id="q1"><p>c</p></blockquote><ul><li><p data-trilium-block-id="li1">d</p></li></ul><aside class="admonition note" data-trilium-block-id="a1"><p>e</p></aside><details class="trilium-collapsible" open data-trilium-block-id="c1"><summary>s</summary><p>f</p></details><hr data-trilium-block-id="hr1">"#)
        for id in ["p1", "h1", "q1", "li1", "a1", "c1", "hr1"] {
            XCTAssertEqual(occurrences(of: #"data-trilium-block-id="\#(id)""#, in: out), 1, "\(id) in \(out)")
        }
        let again = try await roundTrip(out)
        XCTAssertEqual(again, out)
    }

    func testBlockIdsOnImagesTablesAndCode() async throws {
        let out = try await roundTrip(#"<figure class="image" data-trilium-block-id="img1"><img src="api/images/x/y.png"></figure><figure class="table" style="width:50%;" data-trilium-block-id="tbl1"><table style="--tn-border-color:#112233;border-color:#112233;"><tbody><tr><td>c</td></tr></tbody></table></figure><pre><code class="language-text-x-python" data-trilium-block-id="code1">x = 1</code></pre>"#)
        XCTAssertTrue(out.contains(#"<figure class="image" data-trilium-block-id="img1">"#) , out)
        XCTAssertTrue(out.contains(#"data-trilium-block-id="tbl1""#), out)
        XCTAssertTrue(out.contains(#"style="width:50%;""#), out)
        XCTAssertTrue(out.contains("--tn-border-color:#112233"), out)
        XCTAssertTrue(out.contains(#"data-trilium-block-id="code1""#), out)
        XCTAssertTrue(out.contains("language-text-x-python"), out)
        XCTAssertFalse(out.contains("data-trinote-"), out)
    }

    private func runCommands(_ js: String) async throws -> String {
        let result = try await call(js + " return editorBridge.getContent();")
        return try XCTUnwrap(result as? String)
    }

    func testEnterInTheMiddleKeepsTheIdOnTheFirstHalf() async throws {
        _ = try await roundTrip(#"<p data-trilium-block-id="p1">abcd</p>"#)
        let out = try await runCommands("editor.commands.setTextSelection(3); editor.commands.splitBlock();")
        XCTAssertEqual(occurrences(of: "data-trilium-block-id", in: out), 1, out)
        XCTAssertTrue(out.contains(#"<p data-trilium-block-id="p1">ab</p>"#), out)
    }

    func testEnterAtTheStartLeavesTheIdWithTheText() async throws {
        _ = try await roundTrip(#"<p data-trilium-block-id="p1">abcd</p>"#)
        let out = try await runCommands("editor.commands.setTextSelection(1); editor.commands.splitBlock();")
        XCTAssertEqual(occurrences(of: "data-trilium-block-id", in: out), 1, out)
        XCTAssertTrue(out.contains(#"<p data-trilium-block-id="p1">abcd</p>"#), out)
    }

    func testEnterAtTheEndAddsNoSecondId() async throws {
        _ = try await roundTrip(#"<p data-trilium-block-id="p1">abcd</p>"#)
        let out = try await runCommands("editor.commands.setTextSelection(5); editor.commands.splitBlock();")
        XCTAssertEqual(occurrences(of: "data-trilium-block-id", in: out), 1, out)
    }

    func testAPastedCopyLosesTheIdEvenAboveTheOriginal() async throws {
        _ = try await roundTrip(#"<p>first</p><p data-trilium-block-id="p1">abcd</p>"#)
        let out = try await runCommands(#"editor.commands.insertContentAt(0, { type: 'paragraph', attrs: { blockId: 'p1' }, content: [{ type: 'text', text: 'copy' }] });"#)
        XCTAssertEqual(occurrences(of: "data-trilium-block-id", in: out), 1, out)
        XCTAssertTrue(out.contains(#"<p data-trilium-block-id="p1">abcd</p>"#), out)
    }

    // MARK: To-dos

    func testToDoWithABlockIdKeepsItsText() async throws {
        let stored = #"<ul class="todo-list"><li><label class="todo-list__label todo-list__label_without-description"><input type="checkbox" disabled="disabled"></label><p data-trilium-block-id="t1">do it</p></li></ul>"#
        let out = try await roundTrip(stored)
        XCTAssertTrue(out.contains(#"<p data-trilium-block-id="t1">do it</p>"#), out)
        XCTAssertTrue(out.contains("todo-list__label_without-description"), out)
        let again = try await roundTrip(out)
        XCTAssertEqual(again, out)
    }

    func testToDoWithTwoParagraphsKeepsBoth() async throws {
        let stored = #"<ul class="todo-list"><li><label class="todo-list__label todo-list__label_without-description"><input type="checkbox" disabled="disabled" checked="checked"></label><p>one</p><p>two</p></li></ul>"#
        let out = try await roundTrip(stored)
        XCTAssertTrue(out.contains("<p>one</p><p>two</p>"), out)
        XCTAssertTrue(out.contains("checked"), out)
    }

    func testPlainToDoKeepsItsUsualForm() async throws {
        let stored = #"<ul class="todo-list"><li><label class="todo-list__label"><input type="checkbox" disabled="disabled"><span class="todo-list__label__description">do it</span></label></li></ul>"#
        let out = try await roundTrip(stored)
        XCTAssertTrue(out.contains(#"<span class="todo-list__label__description">do it</span>"#), out)
    }

    // MARK: Code, link previews, colours, lists

    func testCodeEmbedAttributesSurvive() async throws {
        let out = try await roundTrip(#"<pre class="extended-code-block" data-box-size="full" style="--include-note-height:20em;"><code class="language-application-javascript-env-frontend">let a;</code></pre><pre data-box-size="resizable" data-hide-title="true" data-editable="true"><code class="language-mermaid">flowchart LR</code></pre>"#)
        XCTAssertTrue(out.contains(#"class="extended-code-block""#), out)
        XCTAssertTrue(out.contains(#"data-box-size="full""#), out)
        XCTAssertTrue(out.contains("--include-note-height:20em"), out)
        XCTAssertTrue(out.contains(#"data-hide-title="true""#), out)
        XCTAssertTrue(out.contains(#"data-editable="true""#), out)
        XCTAssertTrue(out.contains("language-mermaid"), out)
        XCTAssertFalse(out.contains("data-trinote-"), out)
    }

    func testChangingACodeBlocksTextKeepsItsAttributes() async throws {
        _ = try await roundTrip(#"<pre data-box-size="resizable"><code class="language-mermaid">a</code></pre>"#)
        let out = try await runCommands("editor.commands.insertContentAt(1, 'b');")
        XCTAssertTrue(out.contains("ba</code>"), out)
        XCTAssertTrue(out.contains(#"data-box-size="resizable""#), out)
    }

    func testLinkEmbedKeepsItsVideoAttributes() async throws {
        let out = try await roundTrip(#"<section class="link-embed" data-url="https://example.com/a.mp4" data-embed-type="video" data-aspect-ratio="9/16" data-box-size="resizable" data-hide-title="true" data-position="right" style="--include-note-width:30em;"></section>"#)
        for fragment in [#"data-aspect-ratio="9/16""#, #"data-box-size="resizable""#, #"data-hide-title="true""#, #"data-position="right""#, "--include-note-width", "30em"] {
            XCTAssertTrue(out.contains(fragment), "\(fragment) in \(out)")
        }
    }

    func testColoursGetTheirAdaptiveVariables() async throws {
        let out = try await roundTrip(#"<p><span style="color:#e64d4d;--tn-color:#e64d4d;">red</span> <span style="background-color:#e5e64d;--tn-background:#e5e64d;">mark</span></p>"#)
        XCTAssertTrue(out.contains("--tn-color:"), out)
        XCTAssertTrue(out.contains("--tn-background:"), out)
    }

    func testCellColoursGetTheirAdaptiveVariables() async throws {
        let out = try await roundTrip(#"<figure class="table"><table><tbody><tr><td style="background-color:#e5e64d;border-color:#112233;">c</td></tr></tbody></table></figure>"#)
        XCTAssertTrue(out.contains("--tn-background:"), out)
        XCTAssertTrue(out.contains("--tn-border-color:"), out)
    }

    func testReversedListStaysReversed() async throws {
        let out = try await roundTrip(#"<ol start="3" reversed><li><p>a</p></li></ol>"#)
        XCTAssertTrue(out.contains("reversed"), out)
        XCTAssertTrue(out.contains(#"start="3""#), out)
    }

    func testLinkedDrawingFigureComesBackWhole() async throws {
        let figure = #"<figure class="image image_resized" style="width:50%;" data-trilium-block-id="b1"><img src="api/images/n1/d.png"><figcaption>Cap</figcaption></figure>"#
        let encoded = try XCTUnwrap(figure.addingPercentEncoding(withAllowedCharacters: .alphanumerics))
        let section = "<section class=\"include-note\" data-note-id=\"n1\" data-box-size=\"medium\" data-trinote-imagelink-original-src=\"api/images/n1/d.png\" data-trinote-imagelink-original-html=\"\(encoded)\"></section>"

        let out = try await roundTrip("<p>x</p>" + section)
        XCTAssertTrue(out.contains("data-trinote-imagelink-original-html"), out)

        XCTAssertEqual(NoteDetailViewModel.undecorateLinkedImagesFromEditor(in: out), "<p>x</p>" + figure)
    }

    func testRemovingALockedBlockTakesItOut() async throws {
        _ = try await roundTrip(#"<p>x</p><figure class="include-note" data-attachment-id="att123" data-box-size="full"></figure>"#)
        let out = try await call("""
            let from = -1, size = 0;
            editor.state.doc.descendants((node, pos) => { if (node.type.name === 'trinoteRawBlock') { from = pos; size = node.nodeSize; } });
            editor.commands.deleteRange({ from, to: from + size });
            return editorBridge.getContent();
            """) as? String
        XCTAssertFalse(try XCTUnwrap(out).contains("att123"))
    }
}
