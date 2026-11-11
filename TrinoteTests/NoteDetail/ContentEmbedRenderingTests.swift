import SwiftData
import WebKit
import XCTest
@testable import Trinote

/// How Trilium v0.107's embeds show in read mode and editor previews.
@MainActor
final class ContentEmbedRenderingTests: XCTestCase {
    private var persistence: PersistenceManager!
    private var client: MockTriliumClient!

    override func setUp() {
        super.setUp()
        let schema = Schema([
            ServerProfile.self, CachedNote.self, CachedBranch.self, CachedAttribute.self, RecentNote.self, OpenNoteTab.self,
            FavoriteNote.self, RecentSearch.self, DraftContent.self, PendingNoteCreation.self, PendingNoteBodyUpload.self,
            PendingBranchMove.self, PendingNoteDeletion.self, PendingAttachmentImport.self, SyncStatus.self, CachedImageData.self,
            CacheExcludedRootNote.self,
        ])
        let container = try! ModelContainer(for: schema, configurations: [ModelConfiguration(isStoredInMemoryOnly: true)])
        persistence = PersistenceManager(container: container)
        client = MockTriliumClient()
    }

    private func resolve(_ html: String, online: Bool = true, seen: Set<String> = ["host"]) async -> String {
        await IncludeNoteResolver(
            client: online ? client : nil,
            persistence: persistence,
            profileId: "p1",
            protectedSessionActive: false,
            isOnline: online,
            inlineAttachmentImages: { $0 }
        ).resolve(html: html, seenNoteIds: seen)
    }

    private func givenNote(_ id: String, title: String = "Included", body: String) async {
        await client.setNoteResult(id, .success(TestFixtures.noteResponse(id: id, title: title)))
        await client.setNoteContentResult(id, .success(Data(body.utf8)))
    }

    // MARK: What the markup says

    func testOlderBoxSizesReadAsTheCurrentOnes() {
        func markup(_ size: String) -> ContentEmbedMarkup {
            ContentEmbedMarkup(openTag: "<section class=\"include-note\" data-note-id=\"a\" data-box-size=\"\(size)\">", innerHTML: "")
        }
        XCTAssertEqual(markup("tiny").boxSize, "compact")
        XCTAssertEqual(markup("small").boxSize, "resizable")
        XCTAssertEqual(markup("small").height, "10em")
        XCTAssertEqual(markup("medium").height, "20em")
        XCTAssertEqual(markup("expandable").boxSize, "expandable")
        XCTAssertEqual(markup("full").boxSize, "full")
    }

    func testASavedHeightBeatsTheOneAnOlderSizeImplies() {
        let embed = ContentEmbedMarkup(openTag: #"<figure class="include-note" data-note-id="a" data-box-size="medium" style="--include-note-height:7em;">"#, innerHTML: "")
        XCTAssertEqual(embed.height, "7em")
    }

    func testOnlyRealLengthsAndPositionsAreTaken() {
        let embed = ContentEmbedMarkup(openTag: #"<figure class="include-note" data-note-id="a" data-position="sideways" style="--include-note-width:url(x);--include-note-height:1em;background:red">"#, innerHTML: "")
        XCTAssertNil(embed.width)
        XCTAssertEqual(embed.height, "1em")
        XCTAssertNil(embed.position)
    }

    func testAttributeNamesHaveToMatchWhole() {
        XCTAssertNil(ContentEmbedMarkup.attribute("data-note-id", in: #"<figure x-data-note-id="no">"#))
        XCTAssertEqual(ContentEmbedMarkup.attribute("data-note-id", in: #"<figure x-data-note-id="no" data-note-id='yes'>"#), "yes")
    }

    func testACompactBoxAlwaysShowsItsTitle() {
        let embed = ContentEmbedMarkup(openTag: #"<figure class="include-note" data-note-id="a" data-box-size="compact" data-hide-title="true">"#, innerHTML: "")
        XCTAssertFalse(embed.isTitleHidden)
    }

    // MARK: Note embeds

    func testFigureEmbedBecomesACardWithItsCaptionAndPlacement() async {
        await givenNote("n1", body: "<p>inner</p>")
        let html = await resolve(#"<p>a</p><figure class="include-note" data-note-id="n1" data-box-size="resizable" data-position="wrap-left" style="--include-note-width:30em;--include-note-height:9em;"><figcaption>The <b>caption</b></figcaption></figure><p>b</p>"#)
        XCTAssertTrue(html.contains(#"class="trinote-include""#), html)
        XCTAssertTrue(html.contains("Included"), html)
        XCTAssertTrue(html.contains("<p>inner</p>"), html)
        XCTAssertTrue(html.contains(#"data-position="wrap-left""#), html)
        XCTAssertTrue(html.contains("--trinote-include-width:30em"), html)
        XCTAssertTrue(html.contains("--trinote-include-height:9em"), html)
        XCTAssertTrue(html.contains("The <b>caption</b>"), html)
        XCTAssertFalse(html.contains(#"class="include-note""#), html)
    }

    func testCompactEmbedIsATitleRowAndFetchesNoBody() async {
        await givenNote("n1", body: "<p>inner</p>")
        let html = await resolve(#"<figure class="include-note" data-note-id="n1" data-box-size="compact"></figure>"#)
        let calls = await client.getNoteContentCalls
        XCTAssertTrue(calls.isEmpty)
        XCTAssertTrue(html.contains("Included"), html)
        XCTAssertFalse(html.contains("trinote-include__body"), html)
    }

    func testOldSectionsStillResolve() async {
        await givenNote("n1", body: "<p>inner</p>")
        let html = await resolve(#"<section class="include-note" data-note-id="n1" data-box-size="small"></section>"#)
        XCTAssertTrue(html.contains("<p>inner</p>"), html)
        XCTAssertTrue(html.contains(#"data-box-size="resizable""#), html)
        XCTAssertTrue(html.contains("--trinote-include-height:10em"), html)
    }

    func testAResizedVideoIsNotMistakenForAnInclude() async {
        let video = #"<section class="link-embed" data-url="https://example.com/a.mp4" style="--include-note-width:30em;"></section>"#
        let html = await resolve("<p>x</p>" + video)
        XCTAssertEqual(html, "<p>x</p>" + video)
    }

    func testAnEmbedInsideAFigureClosesAtTheRightTag() {
        let html = #"<figure class="include-note" data-note-id="a"><figure class="image"><img src="x"></figure><figcaption>c</figcaption></figure><p>after</p>"#
        XCTAssertEqual(IncludeNoteResolver.stripIncludeSections(html), "<p>after</p>")
    }

    func testACycleStillStops() async {
        await givenNote("host", body: "<p>host</p>")
        let html = await resolve(#"<figure class="include-note" data-note-id="host" data-box-size="full"></figure>"#)
        XCTAssertFalse(html.contains("<p>host</p>"), html)
    }

    // MARK: Excerpts

    func testExcerptCarriesItsBlocksAndTurnsNestedEmbedsIntoLinks() async {
        await givenNote("n1", body: #"<p data-trilium-block-id="b1">one</p><figure class="include-note" data-note-id="n2" data-box-size="full"></figure>"#)
        let html = await resolve(#"<figure class="include-note" data-note-id="n1" data-block="b1:b2" data-box-size="full"></figure>"#)
        XCTAssertTrue(html.contains(#"data-trinote-block="b1:b2""#), html)
        XCTAssertTrue(html.contains(#"data-trinote-block-broken="#), html)
        XCTAssertTrue(html.contains(##"href="#/n2""##), html)
        XCTAssertFalse(html.contains("include-note\""), html)
    }

    func testANoteCanExcerptItself() async {
        await givenNote("host", body: #"<p data-trilium-block-id="b1">own</p>"#)
        let html = await resolve(#"<figure class="include-note" data-note-id="host" data-block="b1" data-box-size="full"></figure>"#)
        XCTAssertTrue(html.contains("<p data-trilium-block-id=\"b1\">own</p>"), html)
    }

    // MARK: Attachments

    private let png = Data([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0, 0, 0, 13, 0x49, 0x48, 0x44, 0x52])

    func testAPictureShowsInline() async {
        await client.setAttachment(TestFixtures.attachmentResponse(attachmentId: "img1", ownerId: "owner", title: "Photo.png", mime: "image/png"))
        await client.setAttachmentBytes(id: "img1", png)
        let html = await resolve(#"<figure class="include-note" data-attachment-id="img1" data-box-size="full"></figure>"#)
        XCTAssertTrue(html.contains(TriliumImageScheme.url(routeType: "attachments", entityId: "img1")), html)
        XCTAssertTrue(html.contains("Photo.png"), html)
    }

    func testADrawingShowsThePictureItsNoteKeeps() async {
        await client.setAttachment(TestFixtures.attachmentResponse(attachmentId: "d1", ownerId: "owner", title: "Canvas.excalidraw", mime: "application/vnd.excalidraw+json"))
        await client.setAttachments(noteId: "owner", [
            TestFixtures.attachmentResponse(attachmentId: "pic1", ownerId: "owner", title: "d1.svg", mime: "image/svg+xml"),
        ])
        await client.setAttachmentBytes(id: "pic1", Data("<svg xmlns='http://www.w3.org/2000/svg'></svg>".utf8))
        let html = await resolve(#"<figure class="include-note" data-attachment-id="d1" data-box-size="full"></figure>"#)
        XCTAssertTrue(html.contains(TriliumImageScheme.url(routeType: "attachments", entityId: "pic1")), html)
        XCTAssertTrue(html.contains(#"data-note-type="canvas""#), html)
    }

    func testOtherFilesAreARowThatOpensTheViewer() async {
        await client.setAttachment(TestFixtures.attachmentResponse(attachmentId: "pdf1", ownerId: "owner", title: "Report.pdf", mime: "application/pdf"))
        let html = await resolve(#"<figure class="include-note" data-attachment-id="pdf1" data-box-size="full"></figure>"#)
        XCTAssertTrue(html.contains("Report.pdf"), html)
        XCTAssertTrue(html.contains("application/pdf"), html)
        XCTAssertTrue(html.contains(#"data-attachment-id="pdf1""#), html)
        XCTAssertTrue(html.contains("viewMode=attachments&amp;attachmentId=pdf1"), html)
    }

    func testCompactAttachmentIsItsTitleRow() async {
        await client.setAttachment(TestFixtures.attachmentResponse(attachmentId: "pdf1", title: "Report.pdf", mime: "application/pdf"))
        let html = await resolve(#"<figure class="include-note" data-attachment-id="pdf1" data-box-size="compact"></figure>"#)
        XCTAssertTrue(html.contains("Report.pdf"), html)
        XCTAssertFalse(html.contains("trinote-include__body"), html)
    }

    func testOfflineAttachmentSaysSoInsteadOfBeingBlank() async {
        let html = await resolve(#"<figure class="include-note" data-attachment-id="pdf1" data-box-size="full"></figure>"#, online: false)
        XCTAssertTrue(html.contains(String(localized: "Not available offline.")), html)
        XCTAssertFalse(html.contains(#"class="include-note""#), html)
    }

    func testADrawingWithNoPictureFallsBackToARow() async {
        await client.setAttachment(TestFixtures.attachmentResponse(attachmentId: "d1", ownerId: "owner", title: "Canvas.excalidraw", mime: "application/vnd.excalidraw+json"))
        await client.setAttachments(noteId: "owner", [])
        let html = await resolve(#"<figure class="include-note" data-attachment-id="d1" data-box-size="full"></figure>"#)
        XCTAssertTrue(html.contains("trinote-include__filelink"), html)
    }

    func testUnknownKindGetsAPlaceholderAndTheLoopEnds() async {
        let html = await resolve(#"<section class="x" data-trilium-embed="future"><p>fallback</p></section>"#)
        XCTAssertTrue(html.contains(String(localized: "This embed needs a newer version of Trinote.")), html)
        XCTAssertFalse(html.contains("data-trilium-embed"), html)
    }

    // MARK: Trimming an excerpt in the page

    private func sliced(_ html: String, _ value: String) async throws -> (kept: Bool, html: String) {
        let webView = WKWebView(frame: .zero)
        let script = try XCTUnwrap(ContentEmbedHTML.blockSliceScript)
        _ = try await webView.callAsyncJavaScript(script, contentWorld: .page)
        let result = try await webView.callAsyncJavaScript("""
            const root = document.createElement('div');
            root.innerHTML = html;
            const kept = trinoteBlockSlice.sliceToReference(root, value);
            return [kept, root.innerHTML];
            """, arguments: ["html": html, "value": value], contentWorld: .page) as? [Any]
        return (try XCTUnwrap(result?[0] as? Bool), try XCTUnwrap(result?[1] as? String))
    }

    func testKeepsASingleBlockInsideItsAncestors() async throws {
        let (kept, html) = try await sliced(#"<p>before</p><blockquote><p>a</p><p data-trilium-block-id="b">b</p><p>c</p></blockquote><p>after</p>"#, "b")
        XCTAssertTrue(kept)
        XCTAssertEqual(html, #"<blockquote><p data-trilium-block-id="b">b</p></blockquote>"#)
    }

    func testKeepsARangeInDocumentOrderEvenWrittenBackwards() async throws {
        let (kept, html) = try await sliced(#"<p>0</p><p data-trilium-block-id="a">1</p><p>2</p><p data-trilium-block-id="c">3</p><p>4</p>"#, "c:a")
        XCTAssertTrue(kept)
        XCTAssertEqual(html, #"<p data-trilium-block-id="a">1</p><p>2</p><p data-trilium-block-id="c">3</p>"#)
    }

    func testAMissingBlockChangesNothing() async throws {
        let body = #"<p data-trilium-block-id="a">1</p>"#
        var result = try await sliced(body, "a:x")
        XCTAssertFalse(result.kept)
        XCTAssertEqual(result.html, body)
        result = try await sliced(body, "a:b:c")
        XCTAssertFalse(result.kept)
    }

    func testAnOrderedListKeepsItsNumbers() async throws {
        let (_, html) = try await sliced(#"<ol><li>1</li><li>2</li><li data-trilium-block-id="x">3</li></ol>"#, "x")
        XCTAssertEqual(html, #"<ol start="3"><li data-trilium-block-id="x">3</li></ol>"#)
    }

    func testALayoutLeftWithOneColumnIsUnwrapped() async throws {
        let (_, html) = try await sliced(#"<div class="trilium-multicolumn-layout"><div class="trilium-multicolumn-column"><p data-trilium-block-id="b">b</p></div><div class="trilium-multicolumn-column"><p>other</p></div></div>"#, "b")
        XCTAssertEqual(html, #"<p data-trilium-block-id="b">b</p>"#)
    }

    func testApplyShowsTheBrokenMessage() async throws {
        let webView = WKWebView(frame: .zero)
        let script = try XCTUnwrap(ContentEmbedHTML.blockSliceScript)
        _ = try await webView.callAsyncJavaScript(script, contentWorld: .page)
        let html = try await webView.callAsyncJavaScript("""
            document.body.innerHTML = '<div data-trinote-block="gone" data-trinote-block-broken="It went"><p>x</p></div>';
            trinoteBlockSlice.apply(document);
            return document.body.innerHTML;
            """, contentWorld: .page) as? String
        XCTAssertEqual(html, #"<div data-trinote-block-broken="It went"><p class="trinote-include__broken">It went</p></div>"#)
    }

    // MARK: Columns, tabs, diagrams

    private func blocksPage(_ html: String) async throws -> WKWebView {
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800))
        let script = try XCTUnwrap(ContentEmbedHTML.contentBlocksScript)
        _ = try await webView.callAsyncJavaScript(script, contentWorld: .page)
        _ = try await webView.callAsyncJavaScript("document.body.innerHTML = html; trinoteContentBlocks.apply(document);", arguments: ["html": html], contentWorld: .page)
        return webView
    }

    private let tabs = #"<div class="trilium-tabs"><section class="trilium-tab"><p class="trilium-tab-title">One</p><div class="trilium-tab-panel"><p>first</p></div></section><section class="trilium-tab"><p class="trilium-tab-title">Two</p><div class="trilium-tab-panel"><p id="deep">second</p></div></section></div>"#

    func testTabsGetAStripAndShowTheFirstOne() async throws {
        let page = try await blocksPage(tabs)
        let titles = try await page.callAsyncJavaScript("return Array.from(document.querySelectorAll('.trinote-tab-title')).map(b => b.textContent);", contentWorld: .page) as? [String]
        XCTAssertEqual(titles, ["One", "Two"])
        let active = try await page.callAsyncJavaScript("return Array.from(document.querySelectorAll('.trilium-tab')).map(t => t.classList.contains('trinote-tab--active'));", contentWorld: .page) as? [Bool]
        XCTAssertEqual(active, [true, false])
    }

    func testTappingATitleSwitchesTabs() async throws {
        let page = try await blocksPage(tabs)
        let selected = try await page.callAsyncJavaScript("""
            document.querySelectorAll('.trinote-tab-title')[1].click();
            return [document.querySelectorAll('.trilium-tab')[1].classList.contains('trinote-tab--active'), document.querySelectorAll('.trinote-tab-title')[1].getAttribute('aria-selected')];
            """, contentWorld: .page) as? [Any]
        XCTAssertEqual(selected?[0] as? Bool, true)
        XCTAssertEqual(selected?[1] as? String, "true")
    }

    func testRevealingAnElementOpensItsTab() async throws {
        let page = try await blocksPage(tabs)
        let shown = try await page.callAsyncJavaScript("""
            trinoteContentBlocks.revealTab(document.getElementById('deep'));
            return document.querySelectorAll('.trilium-tab')[1].classList.contains('trinote-tab--active');
            """, contentWorld: .page) as? Bool
        XCTAssertEqual(shown, true)
    }

    func testBottomAlignedTabsPutTheStripLast() async throws {
        let page = try await blocksPage(#"<div class="trilium-tabs" data-trilium-tab-alignment="bottom"><section class="trilium-tab"><p class="trilium-tab-title">One</p><div class="trilium-tab-panel"><p>x</p></div></section></div>"#)
        let last = try await page.callAsyncJavaScript("return document.querySelector('.trilium-tabs').lastElementChild.className;", contentWorld: .page) as? String
        XCTAssertEqual(last, "trinote-tabs-bar")
    }

    func testApplyingTwiceDoesntAddASecondStrip() async throws {
        let page = try await blocksPage(tabs)
        let count = try await page.callAsyncJavaScript("trinoteContentBlocks.apply(document); return document.querySelectorAll('.trinote-tabs-bar').length;", contentWorld: .page) as? Int
        XCTAssertEqual(count, 1)
    }

    func testMermaidCodeBlockBecomesADiagramKeepingItsBlockId() async throws {
        let page = try await blocksPage(#"<pre data-box-size="full" data-trilium-block-id="m1"><code class="language-mermaid">a --&gt; b</code></pre><pre><code class="language-javascript">x</code></pre>"#)
        let out = try await page.callAsyncJavaScript("return document.body.innerHTML;", contentWorld: .page) as? String
        XCTAssertTrue(try XCTUnwrap(out).contains(#"<div class="mermaid" data-trilium-block-id="m1">a --&gt; b</div>"#), out ?? "")
        XCTAssertTrue(try XCTUnwrap(out).contains("language-javascript"), out ?? "")
    }

    func testTheReadingPageOnlyGetsThisWhenTheNoteNeedsIt() {
        XCTAssertEqual(ContentEmbedHTML.readingViewSnippet(forBody: "<p>plain</p>"), "")
        for body in [#"<div class="trilium-multicolumn-layout"></div>"#, #"<div class="trilium-tabs"></div>"#, #"<pre><code class="language-mermaid">a</code></pre>"#, #"<span style="--tn-color:#000">x</span>"#] {
            XCTAssertTrue(ContentEmbedHTML.readingViewSnippet(forBody: body).contains("trinoteContentBlocks.apply(document)"), body)
        }
        XCTAssertTrue(ContentEmbedHTML.readingViewSnippet(forBody: #"<div data-trinote-block="b1"></div>"#).contains("trinoteBlockSlice.apply(document)"))
    }

    func testAdaptiveColoursResolveInThisWebKit() async throws {
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800))
        let css = try XCTUnwrap(ContentEmbedHTML.contentBlocksStylesheet)
        let color = try await webView.callAsyncJavaScript("""
            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
            document.body.innerHTML = '<span id="t" style="color:#e64d4d;--tn-color:#e64d4d">x</span>';
            return getComputedStyle(document.getElementById('t')).color;
            """, arguments: ["css": css], contentWorld: .page) as? String
        // The rule applied: the computed colour is the derived one, not the stored rgb(230, 77, 77).
        XCTAssertNotEqual(color, "rgb(230, 77, 77)")
        XCTAssertFalse(try XCTUnwrap(color).isEmpty)
    }

    // MARK: Links into a note

    private final class PageWaiter: NSObject, WKNavigationDelegate {
        var continuation: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            continuation?.resume()
            continuation = nil
        }
    }

    @MainActor
    private final class MessageSink: NSObject, WKScriptMessageHandler {
        var messages: [(name: String, body: Any)] = []
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            messages.append((message.name, message.body))
        }
    }

    private let pageWaiter = PageWaiter()
    private let sink = MessageSink()

    private func readingPage(_ body: String) async throws -> WKWebView {
        let controller = WKUserContentController()
        for name in ["heightUpdate", "noteLink", "noteJumpLink", "attachmentLink", "debugLog", "taskStateSet", "taskStateMenu",
                     "checkboxReorder", "checkboxDragScroll", "checkboxDragState", "collapsibleReorder", "collapsibleToggle",
                     "imagePreview", "collectionRow"] {
            controller.add(sink, name: name)
        }
        let config = WKWebViewConfiguration()
        config.userContentController = controller
        let webView = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 800), configuration: config)
        webView.navigationDelegate = pageWaiter
        let html = HTMLNoteWebView.wrapHTML(body, theme: HTMLThemeColors(lightText: "#000000", darkText: "#ffffff", lightLink: "#0000ff", darkLink: "#8888ff"))
        await withCheckedContinuation { continuation in
            pageWaiter.continuation = continuation
            webView.loadHTMLString(html, baseURL: nil)
        }
        return webView
    }

    func testReadingCardsHaveNoMenu() async throws {
        await givenNote("n1", body: "<p>Hello</p>")
        let html = await resolve(#"<figure class="include-note" data-note-id="n1" data-block="b1" data-box-size="full"></figure>"#)
        XCTAssertFalse(html.contains("trinote-include__more"), html)
    }

    func testJumpFindsTheBlockShowsItsTabAndFlashesIt() async throws {
        let page = try await readingPage(#"<div class="trilium-tabs"><section class="trilium-tab"><p class="trilium-tab-title">One</p><div class="trilium-tab-panel"><p>x</p></div></section><section class="trilium-tab"><p class="trilium-tab-title">Two</p><div class="trilium-tab-panel"><p data-trilium-block-id="b1">target</p></div></section></div>"#)
        let result = try await page.callAsyncJavaScript("""
            const top = window.trinoteJumpToBlock('b1');
            const target = document.querySelector('[data-trilium-block-id="b1"]');
            return [typeof top, target.classList.contains('trinote-block-flash'), target.closest('.trilium-tab').classList.contains('trinote-tab--active')];
            """, contentWorld: .page) as? [Any]
        XCTAssertEqual(result?[0] as? String, "number")
        XCTAssertEqual(result?[1] as? Bool, true)
        XCTAssertEqual(result?[2] as? Bool, true)
    }

    func testJumpOpensTheCollapsibleAroundTheBlock() async throws {
        let page = try await readingPage(#"<details class="trilium-collapsible"><summary>s</summary><p data-trilium-block-id="b1">inside</p></details>"#)
        let isOpen = try await page.callAsyncJavaScript("window.trinoteJumpToBlock('b1'); return document.querySelector('details').open;", contentWorld: .page) as? Bool
        XCTAssertEqual(isOpen, true)
    }

    func testJumpIgnoresBlocksInsideIncludeCards() async throws {
        let page = try await readingPage(#"<section class="trinote-include"><p data-trilium-block-id="b1">in a card</p></section>"#)
        let top = try await page.callAsyncJavaScript("return window.trinoteJumpToBlock('b1');", contentWorld: .page)
        XCTAssertNil(top as? Double)
    }

    func testARangeFlashesEverythingBetweenWrittenEitherWay() async throws {
        let page = try await readingPage(#"<p data-trilium-block-id="a">1</p><p id="middle">2</p><p data-trilium-block-id="c">3</p><p id="outside">4</p>"#)
        let result = try await page.callAsyncJavaScript("""
            window.trinoteJumpToBlock('c:a');
            return [document.getElementById('middle').classList.contains('trinote-block-flash'), document.getElementById('outside').classList.contains('trinote-block-flash')];
            """, contentWorld: .page) as? [Bool]
        XCTAssertEqual(result, [true, false])
    }

    func testJumpToABookmark() async throws {
        let page = try await readingPage(#"<p><a id="Rights"></a>text</p>"#)
        let top = try await page.callAsyncJavaScript("return typeof window.trinoteJumpToBookmark('Rights');", contentWorld: .page) as? String
        XCTAssertEqual(top, "number")
    }

    func testTappingABlockLinkTellsTheAppWhereItPoints() async throws {
        let page = try await readingPage(##"<p><a id="l" class="reference-link" href="#root/a/n2?block=b1:b2">go</a></p>"##)
        _ = try await page.callAsyncJavaScript("document.getElementById('l').click();", contentWorld: .page)
        try await Task.sleep(for: .milliseconds(150))
        let message = sink.messages.first { $0.name == "noteJumpLink" }?.body as? [String: Any]
        XCTAssertEqual(message?["noteId"] as? String, "n2")
        XCTAssertEqual(message?["block"] as? String, "b1:b2")
        XCTAssertFalse(sink.messages.contains { $0.name == "noteLink" })
    }

    func testAPlainLinkStillOpensTheNote() async throws {
        let page = try await readingPage(##"<p><a id="l" class="reference-link" href="#root/a/n2">go</a></p>"##)
        _ = try await page.callAsyncJavaScript("document.getElementById('l').click();", contentWorld: .page)
        try await Task.sleep(for: .milliseconds(150))
        XCTAssertEqual(sink.messages.first { $0.name == "noteLink" }?.body as? String, "n2")
    }

    // MARK: Video and audio

    func testAVideoFileShowsAFacadeUntilTapped() async throws {
        let page = try await readingPage(#"<section class="link-embed" data-url="https://example.com/a.mp4" data-embed-type="video" data-title="Clip" data-aspect-ratio="9/16"></section>"#)
        let before = try await page.callAsyncJavaScript("""
            const f = document.querySelector('.link-embed-media-facade');
            return [f.getAttribute('data-media-url'), f.style.aspectRatio, document.querySelectorAll('video').length];
            """, contentWorld: .page) as? [Any]
        XCTAssertEqual(before?[0] as? String, "https://example.com/a.mp4")
        XCTAssertEqual((before?[1] as? String)?.replacingOccurrences(of: " ", with: ""), "9/16")
        XCTAssertEqual(before?[2] as? Int, 0, "nothing loads from the host until the tap")
        let after = try await page.callAsyncJavaScript("""
            document.querySelector('.link-embed-media-facade').click();
            const v = document.querySelector('video.link-embed-media-player');
            return [v ? v.getAttribute('src') : null, document.querySelectorAll('.link-embed-media-facade').length];
            """, contentWorld: .page) as? [Any]
        XCTAssertEqual(after?[0] as? String, "https://example.com/a.mp4")
        XCTAssertEqual(after?[1] as? Int, 0)
    }

    func testAnAudioFileGetsAPlayerWhenTapped() async throws {
        let page = try await readingPage(#"<section class="link-embed" data-url="https://example.com/a.mp3" data-embed-type="audio" data-title="Song"></section>"#)
        let result = try await page.callAsyncJavaScript("""
            const title = document.querySelector('.link-embed-audio-title').textContent;
            document.querySelector('.link-embed-media-facade').click();
            return [title, document.querySelectorAll('audio.link-embed-media-player').length];
            """, contentWorld: .page) as? [Any]
        XCTAssertEqual(result?[0] as? String, "Song")
        XCTAssertEqual(result?[1] as? Int, 1)
    }

    func testACompactVideoIsItsTitleRow() async throws {
        let page = try await readingPage(#"<section class="link-embed" data-url="https://example.com/a.mp4" data-embed-type="video" data-title="Clip" data-box-size="compact"></section>"#)
        let result = try await page.callAsyncJavaScript("return [document.querySelectorAll('.link-embed-media-facade').length, document.querySelector('.link-embed-mention-title').textContent];", contentWorld: .page) as? [Any]
        XCTAssertEqual(result?[0] as? Int, 0)
        XCTAssertEqual(result?[1] as? String, "Clip")
    }

    func testOnlyHttpMediaGetsAPlayer() async throws {
        let page = try await readingPage(#"<section class="link-embed" data-url="javascript:alert(1)" data-embed-type="video"></section>"#)
        let count = try await page.callAsyncJavaScript("return document.querySelectorAll('.link-embed-media-facade').length;", contentWorld: .page) as? Int
        XCTAssertEqual(count, 0)
    }

    func testYouTubeStillOpensOutsideTheApp() async throws {
        let page = try await readingPage(#"<section class="link-embed" data-url="https://youtu.be/dQw4w9WgXcQ" data-embed-type="youtube"></section>"#)
        let count = try await page.callAsyncJavaScript("return [document.querySelectorAll('a.link-embed-video').length, document.querySelectorAll('.link-embed-media-facade').length];", contentWorld: .page) as? [Int]
        XCTAssertEqual(count, [1, 0])
    }

    // MARK: Attachment lists and viewers

    private func item(_ id: String, title: String, mime: String) -> AttachmentItem {
        AttachmentItem(from: TestFixtures.attachmentResponse(attachmentId: id, title: title, mime: mime))
    }

    func testAttachmentListsHideADrawingsGeneratedPicture() {
        let list = [
            item("d1", title: "Canvas.excalidraw", mime: "application/vnd.excalidraw+json"),
            item("p1", title: "d1.svg", mime: "image/svg+xml"),
            item("p2", title: "logo.svg", mime: "image/svg+xml"),
            item("h1", title: "pdfHistory.json", mime: "application/json"),
        ]
        XCTAssertEqual(list.userVisible.map(\.attachmentId), ["d1", "p2"])
    }

    func testDrawingsAndDiagramsOpenInTheirOwnViewers() throws {
        let drawing = try XCTUnwrap(AttachmentPreviewItem.make(title: "Canvas.excalidraw", mime: "application/vnd.excalidraw+json", data: Data("{}".utf8)))
        guard case .drawing = drawing.kind else { return XCTFail("expected a drawing") }
        let diagram = try XCTUnwrap(AttachmentPreviewItem.make(title: "Diagram.mmd", mime: "text/vnd.mermaid", data: Data("flowchart LR".utf8)))
        guard case .mermaid = diagram.kind else { return XCTFail("expected a diagram") }
        let text = try XCTUnwrap(AttachmentPreviewItem.make(title: "a.txt", mime: "text/plain", data: Data("x".utf8)))
        guard case .text = text.kind else { return XCTFail("expected text") }
    }

    func testOnlyAPasswordChangeCountsAsTheSessionEnding() {
        XCTAssertTrue(TriliumWebSocketConnection.isSessionRevocation(reloadFrontendMessage: ["type": "reload-frontend", "reason": "password changed"]))
        XCTAssertFalse(TriliumWebSocketConnection.isSessionRevocation(reloadFrontendMessage: ["type": "reload-frontend", "reason": "leaving protected session"]))
        XCTAssertFalse(TriliumWebSocketConnection.isSessionRevocation(reloadFrontendMessage: ["type": "reload-frontend"]))
    }
}
