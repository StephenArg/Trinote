import WebKit
import XCTest
@testable import Trinote

/// A note excerpt in the real editor: its ⋮ button, and Editable mode writing to the note the blocks belong to.
@MainActor
final class NoteExcerptEditingTests: XCTestCase {
    private final class Sink: NSObject, WKScriptMessageHandler {
        var messages: [[String: Any]] = []
        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            if let body = message.body as? [String: Any] { messages.append(body) }
        }
    }

    private final class Loader: NSObject, WKNavigationDelegate {
        var finished: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            finished?.resume()
            finished = nil
        }
    }

    private let excerpt = #"<figure class="include-note" data-note-id="other" data-block="b1" data-box-size="full"></figure>"#
    private let body = #"<p data-trilium-block-id="b1">Body</p>"#
    private let sink = Sink()
    private let loader = Loader()
    private var window: UIWindow?

    /// In a window, because the editor draws table captions in an animation frame.
    private func makeEditor(_ html: String) async throws -> WKWebView {
        let config = WKWebViewConfiguration()
        config.userContentController.add(sink, name: "editorRequest")
        let web = WKWebView(frame: CGRect(x: 0, y: 0, width: 400, height: 600), configuration: config)
        let window = UIWindow(frame: web.frame)
        window.addSubview(web)
        window.isHidden = false
        self.window = window
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
        _ = try await web.callAsyncJavaScript("window.editorBridge.setContent(h); return 1", arguments: ["h": html], contentWorld: .page)
        return web
    }

    @discardableResult
    private func run(_ web: WKWebView, _ script: String, _ arguments: [String: Any] = [:]) async throws -> Any? {
        try await web.callAsyncJavaScript(script, arguments: arguments, contentWorld: .page)
    }

    private func saved(_ web: WKWebView) async throws -> String {
        try await run(web, "return window.editorBridge.getContent()") as? String ?? ""
    }

    private func position(_ web: WKWebView, _ type: String = "trinoteExcerptEdit") async throws -> Int {
        let found = try await run(web, """
            let at = -1;
            editor.state.doc.descendants((node, pos) => { if (at < 0 && node.type.name === t) at = pos; return at < 0; });
            return at;
            """, ["t": type]) as? Int
        return try XCTUnwrap(found)
    }

    private func nextRequest(_ action: String, after count: Int = 0) async throws -> [String: Any] {
        for _ in 0..<80 {
            if let message = sink.messages.dropFirst(count).first(where: { $0["action"] as? String == action }) { return message }
            try await Task.sleep(nanoseconds: 25_000_000)
        }
        XCTFail("the editor didn't ask for \(action)")
        throw CancellationError()
    }

    /// Turns Editable on and answers with `content`.
    private func beginEditing(_ web: WKWebView, content: String? = nil) async throws {
        let card = try await position(web, "includeNote")
        let count = sink.messages.count
        try await run(web, "window.editorBridge.setExcerptEditing(p, true); return 1", ["p": card])
        let load = try await nextRequest("excerptLoad", after: count)
        XCTAssertEqual(load["noteId"] as? String, "other")
        XCTAssertEqual(load["block"] as? String, "b1")
        try await run(web, "window.editorBridge.applyExcerptContent(id, h); return 1", ["id": load["requestId"] as Any, "h": content ?? body])
    }

    private func type(_ web: WKWebView, _ text: String, depth: Int = 2) async throws {
        let at = try await position(web)
        try await run(web, "editor.chain().setTextSelection(p).insertContent(t).run(); return 1", ["p": at + depth, "t": text])
    }

    private func flush(_ web: WKWebView) async throws -> [String: Any] {
        let count = sink.messages.count
        try await run(web, "window.editorBridge.flushExcerptEdits(); return 1")
        return try await nextRequest("excerptSave", after: count)
    }

    private func answer(_ web: WKWebView, _ save: [String: Any], saved: Bool) async throws {
        try await run(web, "window.editorBridge.excerptSaved(k, s, b); return 1", ["k": save["key"] as Any, "s": saved, "b": save["newBlock"] as Any])
    }

    private func setEditableOff(_ web: WKWebView) async throws {
        let at = try await position(web)
        try await run(web, "window.editorBridge.setExcerptEditing(p, false); return 1", ["p": at])
    }

    // MARK: The card

    func testOnlyExcerptsGetTheMenuButton() async throws {
        let plain = #"<figure class="include-note" data-note-id="plain" data-box-size="full"></figure>"#
        let web = try await makeEditor("<p>x</p>\(plain)\(excerpt)")
        let result = try await run(web, """
            const cards = Array.from(document.querySelectorAll('.tn-include-readonly'));
            const button = (card) => card.querySelector('button[aria-label="More Actions"]');
            button(cards[1]).click();
            return [button(cards[0]).style.display, button(cards[1]).style.display,
                    cards[0].querySelector('.tn-include-readonly__subtitle').textContent,
                    cards[1].querySelector('.tn-include-readonly__subtitle').textContent];
            """) as? [String]
        XCTAssertEqual(result, ["none", "", "Included", "Excerpt"])
        let menu = try await nextRequest("excerptMenu")
        XCTAssertEqual(menu["noteId"] as? String, "other")
        XCTAssertEqual(menu["raw"] as? String, excerpt)
        XCTAssertEqual(menu["canEdit"] as? Bool, true)
    }

    func testTheIncludeButtonLightsOnlyForAPlainInclude() async throws {
        let plain = #"<figure class="include-note" data-note-id="plain" data-box-size="full"></figure>"#
        let web = try await makeEditor("\(plain)\(excerpt)")
        let result = try await run(web, """
            const include = Array.from(document.querySelectorAll('button')).find((b) => b.title === 'Include');
            const positions = [];
            editor.state.doc.descendants((node, pos) => { if (node.type.name === 'includeNote') positions.push(pos); });
            return positions.map((pos) => { editor.commands.setNodeSelection(pos); return include._isActive(); });
            """) as? [Bool]
        XCTAssertEqual(result, [true, false])
    }

    // MARK: Editable

    func testTheBlocksAreEditableButNotSavedIntoTheNoteAroundThem() async throws {
        let web = try await makeEditor("<p>Before</p>\(excerpt)<p>After</p>")
        try await beginEditing(web)
        let visible = try await run(web, "return document.querySelector('.tn-excerpt-edit__content').textContent") as? String
        XCTAssertEqual(visible, "Body")
        let host = try await saved(web)
        XCTAssertFalse(host.contains("Body"), host)
        XCTAssertTrue(host.contains(#"data-editable="true""#), host)
        XCTAssertTrue(host.hasPrefix("<p>Before</p><figure"), host)
        XCTAssertTrue(host.hasSuffix("</figure><p>After</p>"), host)
    }

    func testAChangeIsSentToItsOwnNote() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web)
        try await type(web, "New ")
        let save = try await flush(web)
        XCTAssertEqual(save["noteId"] as? String, "other")
        XCTAssertEqual(save["block"] as? String, "b1")
        XCTAssertEqual(save["newBlock"] as? String, "b1")
        XCTAssertEqual(save["html"] as? String, #"<p data-trilium-block-id="b1">New Body</p>"#)
    }

    func testOpeningAndSavingNothingSendsNothing() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web)
        try await run(web, "window.editorBridge.flushExcerptEdits(); return 1")
        try await Task.sleep(nanoseconds: 100_000_000)
        XCTAssertFalse(sink.messages.contains { $0["action"] as? String == "excerptSave" })
    }

    func testAddingABlockGrowsTheReferenceAndLaterSavesUseIt() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web)
        let at = try await position(web)
        try await run(web, """
            const end = p + 1 + editor.state.doc.nodeAt(p).firstChild.nodeSize - 1;
            editor.chain().setTextSelection(end).splitBlock().insertContent('Second').run();
            return 1;
            """, ["p": at])
        let first = try await flush(web)
        let newBlock = try XCTUnwrap(first["newBlock"] as? String)
        XCTAssertEqual(first["block"] as? String, "b1", "the server still knows the old range")
        XCTAssertTrue(newBlock.hasPrefix("b1:"), newBlock)
        XCTAssertEqual(newBlock.count, "b1:".count + 12)
        let host = try await saved(web)
        XCTAssertTrue(host.contains(#"data-block="\#(newBlock)""#), "the note around it can be saved first: \(host)")

        try await type(web, "More ")
        let second = try await flush(web)
        XCTAssertEqual(second["block"] as? String, newBlock, "sent before the first answer, which native runs in order")
    }

    func testAnotherCardOfTheSameBlocksMovesWithTheRange() async throws {
        let web = try await makeEditor("\(excerpt)<p>x</p>\(excerpt)")
        try await beginEditing(web)
        let at = try await position(web)
        try await run(web, """
            const end = p + 1 + editor.state.doc.nodeAt(p).firstChild.nodeSize - 1;
            editor.chain().setTextSelection(end).splitBlock().insertContent('Second').run();
            return 1;
            """, ["p": at])
        let save = try await flush(web)
        let newBlock = try XCTUnwrap(save["newBlock"] as? String)
        let host = try await saved(web)
        XCTAssertEqual(host.components(separatedBy: #"data-block="\#(newBlock)""#).count - 1, 2, host)
    }

    func testAFailedSaveKeepsTheOldReferenceAndTheText() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web)
        let at = try await position(web)
        try await run(web, """
            const end = p + 1 + editor.state.doc.nodeAt(p).firstChild.nodeSize - 1;
            editor.chain().setTextSelection(end).splitBlock().insertContent('Second').run();
            return 1;
            """, ["p": at])
        let save = try await flush(web)
        try await answer(web, save, saved: false)
        let host = try await saved(web)
        XCTAssertTrue(host.contains(#"data-block="b1""#), host)
        let retry = try await flush(web)
        XCTAssertEqual(retry["block"] as? String, "b1")
        XCTAssertTrue((retry["html"] as? String)?.contains("Second") == true)
    }

    func testTurningOffWaitsForTheSaveThenGoesBackToACard() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web)
        try await type(web, "New ")
        let count = sink.messages.count
        try await setEditableOff(web)
        let save = try await nextRequest("excerptSave", after: count)
        var isOpen = try await position(web)
        XCTAssertGreaterThan(isOpen, -1, "still open until the save is answered")
        try await answer(web, save, saved: true)
        isOpen = try await position(web)
        XCTAssertEqual(isOpen, -1)
        let host = try await saved(web)
        XCTAssertEqual(host, "<p>x</p>\(excerpt)")
    }

    func testTurningOffStaysOpenWhenTheSaveFails() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web)
        try await type(web, "New ")
        let count = sink.messages.count
        try await setEditableOff(web)
        let save = try await nextRequest("excerptSave", after: count)
        try await answer(web, save, saved: false)
        let isOpen = try await position(web)
        XCTAssertGreaterThan(isOpen, -1, "the text isn't thrown away")
    }

    func testAFailedLoadLeavesTheCardAsItWas() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        let card = try await position(web, "includeNote")
        try await run(web, "window.editorBridge.setExcerptEditing(p, true); return 1", ["p": card])
        let load = try await nextRequest("excerptLoad")
        try await run(web, "window.editorBridge.applyExcerptContent(id, null); return 1", ["id": load["requestId"] as Any])
        _ = try await nextRequest("excerptLoadFailed")
        let host = try await saved(web)
        XCTAssertEqual(host, "<p>x</p>\(excerpt)")
    }

    func testTwoExcerptsOfTheSameBlocksCantBothBeOpen() async throws {
        let web = try await makeEditor("\(excerpt)<p>x</p>\(excerpt)")
        try await beginEditing(web)
        try await beginEditing(web)
        _ = try await nextRequest("excerptLoadFailed")
    }

    func testAStoredEditableExcerptOpensQuietlyWithTheNote() async throws {
        let stored = excerpt.replacingOccurrences(of: "<figure ", with: #"<figure data-editable="true" "#)
        let web = try await makeEditor("<p>x</p>\(stored)")
        let load = try await nextRequest("excerptLoad")
        try await run(web, "window.editorBridge.applyExcerptContent(id, null); return 1", ["id": load["requestId"] as Any])
        try await Task.sleep(nanoseconds: 100_000_000)
        XCTAssertFalse(sink.messages.contains { $0["action"] as? String == "excerptLoadFailed" }, "offline, it just stays a card")

        let second = sink.messages.count
        try await run(web, "window.editorBridge.setContent(h); return 1", ["h": "<p>x</p>\(stored)"])
        let again = try await nextRequest("excerptLoad", after: second)
        try await run(web, "window.editorBridge.applyExcerptContent(id, h); return 1", ["id": again["requestId"] as Any, "h": body])
        let isOpen = try await position(web)
        XCTAssertGreaterThan(isOpen, -1)
        let host = try await saved(web)
        XCTAssertEqual(host, "<p>x</p>\(stored)", "opening it doesn't change the note around it")
    }

    func testEdgeBlocksWithoutIdsGetThem() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web, content: "<ul><li><p>One</p></li><li><p>Two</p></li></ul>")
        try await type(web, "A", depth: 4)
        let save = try await flush(web)
        let html = try XCTUnwrap(save["html"] as? String)
        XCTAssertEqual(html.components(separatedBy: "data-trilium-block-id=").count - 1, 2, html)
        let parts = try XCTUnwrap(save["newBlock"] as? String).split(separator: ":")
        XCTAssertEqual(parts.count, 2)
        XCTAssertTrue(parts.allSatisfy { html.contains(#"data-trilium-block-id="\#($0)""#) }, html)
    }

    func testAnExcerptsTablesDontShiftTheNotesCaptions() async throws {
        let table = "<figure class=\"table\"><table><tbody><tr><td><p>cell</p></td></tr></tbody></table><figcaption>Host caption</figcaption></figure>"
        let web = try await makeEditor("\(excerpt)\(table)")
        for _ in 0..<80 {
            if try await run(web, "return document.querySelectorAll('.table-caption-box').length") as? Int == 1 { break }
            try await Task.sleep(nanoseconds: 25_000_000)
        }
        let plainTable = #"<figure class="table"><table><tbody><tr><td><p data-trilium-block-id="b1">in excerpt</p></td></tr></tbody></table></figure>"#
        try await beginEditing(web, content: #"<p data-trilium-block-id="b1">a</p>"# + plainTable.replacingOccurrences(of: #" data-trilium-block-id="b1""#, with: ""))
        let host = try await saved(web)
        XCTAssertTrue(host.contains("Host caption"), host)
        XCTAssertFalse(host.contains("in excerpt"), host)
    }

    // MARK: Pictures and files added inside

    func testUploadsAtTheInsertPointBelongToTheExcerptsNote() async throws {
        let web = try await makeEditor("<p>Mine</p>\(excerpt)")
        try await beginEditing(web)
        let at = try await position(web)
        let owners = try await run(web, """
            pendingMediaInsertPos = { from: p + 2, to: p + 2 };
            const inside = window.editorBridge.excerptNoteAtInsertPoint();
            pendingMediaInsertPos = { from: 2, to: 2 };
            const outside = window.editorBridge.excerptNoteAtInsertPoint();
            pendingMediaInsertPos = null;
            return [inside, outside];
            """, ["p": at]) as? [String]
        XCTAssertEqual(owners, ["other", ""])
    }

    func testAPhotoStillUploadingIsntSavedOrReferenced() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web)
        let at = try await position(web)
        try await run(web, """
            const end = p + 1 + editor.state.doc.nodeAt(p).firstChild.nodeSize - 1;
            pendingMediaInsertPos = { from: end, to: end };
            window.editorBridge.beginImageBatch(1);
            return 1;
            """, ["p": at])
        let waiting = try await flush(web)
        XCTAssertEqual(waiting["newBlock"] as? String, "b1", "the upload might never finish")
        XCTAssertEqual(waiting["html"] as? String, body)

        try await run(web, """
            window.editorBridge.insertBatchImage({ src: 'trilium-image://attachments/a1', originalSrc: 'api/attachments/a1/image/p.jpg' });
            window.editorBridge.endImageBatch();
            return 1;
            """)
        let filled = try await flush(web)
        XCTAssertEqual(filled["block"] as? String, "b1")
        let newBlock = try XCTUnwrap(filled["newBlock"] as? String)
        XCTAssertTrue(newBlock.hasPrefix("b1:"), newBlock)
        let html = try XCTUnwrap(filled["html"] as? String)
        XCTAssertTrue(html.contains("api/attachments/a1/image/p.jpg"), html)
        XCTAssertTrue(html.contains(#"data-trilium-block-id="\#(newBlock.dropFirst(3))""#), html)
    }

    func testAnExcerptHoldingOnlyAnUploadingPhotoWaits() async throws {
        let web = try await makeEditor("<p>x</p>\(excerpt)")
        try await beginEditing(web, content: #"<p data-trilium-block-id="b1"></p>"#)
        let at = try await position(web)
        let count = sink.messages.count
        try await run(web, """
            pendingMediaInsertPos = { from: p + 2, to: p + 2 };
            window.editorBridge.beginImageBatch(1);
            window.editorBridge.flushExcerptEdits();
            return 1;
            """, ["p": at])
        try await Task.sleep(nanoseconds: 100_000_000)
        XCTAssertFalse(sink.messages.dropFirst(count).contains { $0["action"] as? String == "excerptSave" }, "an empty body would lose the range")
    }

    func testTheBlockPickerLeavesOutTheExcerpt() async throws {
        let web = try await makeEditor("<p>Mine</p>\(excerpt)")
        try await beginEditing(web)
        let outline = try await run(web, "return window.editorBridge.blockOutlineJSON()") as? String ?? ""
        XCTAssertTrue(outline.contains("Mine"), outline)
        XCTAssertFalse(outline.contains("Body"), outline)
    }

    // MARK: Included notes

    private let included = #"<figure class="include-note" data-note-id="whole" data-box-size="full"></figure>"#

    func testIncludedNotesGetTheMenuOnceTheServerStoresTheNewEmbeds() async throws {
        let legacy = #"<section class="include-note" data-note-id="old" data-box-size="small">&nbsp;</section>"#
        let web = try await makeEditor("<p>x</p>\(included)\(legacy)")
        let displays = "return Array.from(document.querySelectorAll('.tn-include-readonly button[aria-label=\"More Actions\"]')).map((b) => b.style.display)"
        let before = try await run(web, displays) as? [String]
        XCTAssertEqual(before, ["none", "none"], "an older server reads only the older form")

        try await run(web, "window.editorBridge.setContentBlockSupport(true); return 1")
        let after = try await run(web, displays) as? [String]
        XCTAssertEqual(after, ["", ""])

        try await run(web, "document.querySelectorAll('.tn-include-readonly button[aria-label=\"More Actions\"]')[1].click(); return 1")
        let menu = try await nextRequest("excerptMenu")
        XCTAssertEqual(menu["noteId"] as? String, "old")
        XCTAssertEqual(menu["isExcerpt"] as? Bool, false)
        XCTAssertEqual(menu["raw"] as? String, legacy, "an older embed goes to the menu as it is")
    }

    func testTheEmbedWhoseMenuIsOpenIsSelectedAndOutlined() async throws {
        let web = try await makeEditor("\(included)<p>x</p>\(excerpt)")
        try await run(web, "window.editorBridge.setContentBlockSupport(true); return 1")
        let state = try await run(web, """
            const positions = [];
            editor.state.doc.descendants((node, pos) => { if (node.type.name === 'includeNote') positions.push(pos); });
            editor.commands.setNodeSelection(positions[0]);
            const cards = document.querySelectorAll('.tn-include-readonly');
            cards[1].querySelector('button[aria-label="More Actions"]').click();
            const selected = editor.state.selection.from === positions[1];
            const outlined = Array.from(cards).map((card) => card.classList.contains('tn-embed-menu-target'));
            window.editorBridge.embedMenuClosed();
            const afterClose = Array.from(cards).some((card) => card.classList.contains('tn-embed-menu-target'));
            return [selected, outlined[0], outlined[1], afterClose];
            """) as? [Bool]
        XCTAssertEqual(state, [true, false, true, false], "the second card, not the one selected before")
    }

    func testAWholeIncludedNoteIsEditedAndSavedWithoutARange() async throws {
        let web = try await makeEditor("<p>x</p>\(included)")
        try await run(web, "window.editorBridge.setContentBlockSupport(true); return 1")
        let card = try await position(web, "includeNote")
        try await run(web, "window.editorBridge.setExcerptEditing(p, true); return 1", ["p": card])
        let load = try await nextRequest("excerptLoad")
        XCTAssertEqual(load["block"] as? String, "", "the whole note")
        try await run(web, "window.editorBridge.applyExcerptContent(id, h); return 1", ["id": load["requestId"] as Any, "h": "<p>Whole body</p><p>Second</p>"])

        let label = try await run(web, "return document.querySelector('.tn-excerpt-edit .tn-block-frame__label').textContent") as? String
        XCTAssertTrue(label?.hasPrefix("Included: ") == true, label ?? "")
        try await type(web, "New ")
        let save = try await flush(web)
        XCTAssertEqual(save["noteId"] as? String, "whole")
        XCTAssertEqual(save["block"] as? String, "")
        XCTAssertEqual(save["newBlock"] as? String, "")
        XCTAssertEqual(save["html"] as? String, "<p>New Whole body</p><p>Second</p>", "no block ids added to a whole note")
        let host = try await saved(web)
        XCTAssertFalse(host.contains("data-block"), host)
    }

    func testOnlyOneEditableEmbedOfANoteAtATime() async throws {
        let web = try await makeEditor("\(included)<p>x</p>\(included)")
        try await run(web, "window.editorBridge.setContentBlockSupport(true); return 1")
        for _ in 0..<2 {
            let card = try await position(web, "includeNote")
            let count = sink.messages.count
            try await run(web, "window.editorBridge.setExcerptEditing(p, true); return 1", ["p": card])
            let load = try await nextRequest("excerptLoad", after: count)
            try await run(web, "window.editorBridge.applyExcerptContent(id, h); return 1", ["id": load["requestId"] as Any, "h": "<p>Body</p>"])
        }
        _ = try await nextRequest("excerptLoadFailed")
    }

    func testAWholeNoteStoredAsEditableOpensOnceTheServersSupportIsKnown() async throws {
        let stored = included.replacingOccurrences(of: "<figure ", with: #"<figure data-editable="true" "#)
        let web = try await makeEditor("<p>x</p>\(stored)")
        try await Task.sleep(nanoseconds: 200_000_000)
        XCTAssertFalse(sink.messages.contains { $0["action"] as? String == "excerptLoad" }, "not before the server is known to store these")

        try await run(web, "window.editorBridge.setContentBlockSupport(true); window.editorBridge.setContentBlockSupport(true); return 1")
        let load = try await nextRequest("excerptLoad")
        XCTAssertEqual(load["noteId"] as? String, "whole")
        XCTAssertEqual(load["block"] as? String, "")
        XCTAssertEqual(sink.messages.filter { $0["action"] as? String == "excerptLoad" }.count, 1, "asked once")
        try await run(web, "window.editorBridge.applyExcerptContent(id, h); return 1", ["id": load["requestId"] as Any, "h": "<p>Whole body</p>"])
        let isOpen = try await position(web)
        XCTAssertGreaterThan(isOpen, -1)
    }

    // MARK: Links back to embeds

    /// Taps the link with `text` and returns the menu's rows.
    private func tapLink(_ web: WKWebView, _ text: String) async throws -> [String] {
        try await run(web, """
            const link = Array.from(document.querySelectorAll('.tiptap a')).find((a) => a.textContent === t);
            link.click();
            return 1
            """, ["t": text])
        return try await run(web, "return Array.from(document.querySelectorAll('.link-menu-popup.visible .image-popup-row')).map((r) => r.textContent)") as? [String] ?? []
    }

    private func pickRow(_ web: WKWebView, _ title: String) async throws {
        try await run(web, """
            const row = Array.from(document.querySelectorAll('.link-menu-popup.visible .image-popup-row')).find((r) => r.textContent === t);
            row.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
            return 1
            """, ["t": title])
    }

    func testAnExcerptTurnedIntoALinkTurnsBackAsItWas() async throws {
        let sized = #"<figure class="include-note" data-note-id="other" data-block="b1" data-box-size="resizable" data-position="left" style="--include-note-height:12em"><figcaption>Cap</figcaption></figure>"#
        let web = try await makeEditor("<p>x</p>\(sized)")
        try await run(web, "window.editorBridge.setContentBlockSupport(true); return 1")
        let card = try await position(web, "includeNote")
        try await run(web, "window.editorBridge.replaceIncludeEmbed(p, h); return 1", ["p": card, "h": ##"<p><a class="reference-link" href="#root/other?block=b1">Source</a></p>"##])

        let rows = try await tapLink(web, "Source")
        XCTAssertEqual(rows, ["Open Note", "Convert to Excerpt", "Remove Link"])
        try await pickRow(web, "Convert to Excerpt")

        let host = try await saved(web)
        XCTAssertEqual(host, "<p>x</p>\(sized)", "size, position, height and caption as before")
        XCTAssertFalse(sink.messages.contains { $0["action"] as? String == "noteLinkToEmbed" }, "nothing to ask for")
    }

    func testANoteLinkBecomesAnEmbedOfTheSizeNativeGives() async throws {
        let web = try await makeEditor(##"<p><a class="reference-link" href="#root/abc/whole">Whole</a></p>"##)
        try await run(web, "window.editorBridge.setContentBlockSupport(true); return 1")
        let rows = try await tapLink(web, "Whole")
        XCTAssertTrue(rows.contains("Convert to Included Note"), "\(rows)")
        try await pickRow(web, "Convert to Included Note")
        let ask = try await nextRequest("noteLinkToEmbed")
        XCTAssertEqual(ask["noteId"] as? String, "whole")
        XCTAssertEqual(ask["block"] as? String, "")

        let figure = ContentEmbedEdit.embedHTML(noteId: "whole", block: nil, boxSize: "resizable")
        try await run(web, "window.editorBridge.convertNoteLinkToEmbed(p, h, r, t); return 1", ["p": ask["from"] as Any, "h": ask["href"] as Any, "r": figure, "t": "Whole"])
        let host = try await saved(web)
        XCTAssertEqual(host, figure)
    }

    func testAnOlderServerGetsTheOlderEmbed() async throws {
        let web = try await makeEditor(##"<p><a class="reference-link" href="#root/whole">Whole</a></p>"##)
        let rows = try await tapLink(web, "Whole")
        XCTAssertTrue(rows.contains("Convert to Included Note"), "\(rows)")
        try await pickRow(web, "Convert to Included Note")
        let host = try await saved(web)
        XCTAssertTrue(host.hasPrefix(#"<section class="include-note" data-note-id="whole""#), host)
    }

    func testABlockLinkOnAnOlderServerOffersNoExcerpt() async throws {
        let web = try await makeEditor(##"<p><a class="reference-link" href="#root/n?block=b1">Part</a></p>"##)
        let rows = try await tapLink(web, "Part")
        XCTAssertFalse(rows.contains("Convert to Excerpt"), "\(rows)")
    }

    func testALinkAmongOtherTextLeavesTheTextAndGoesBelowIt() async throws {
        let web = try await makeEditor(##"<p>See <a class="reference-link" href="#root/whole">Whole</a> here</p>"##)
        _ = try await tapLink(web, "Whole")
        try await pickRow(web, "Convert to Included Note")
        let host = try await saved(web)
        XCTAssertTrue(host.hasPrefix("<p>See  here</p><section class=\"include-note\""), host)
    }
}

