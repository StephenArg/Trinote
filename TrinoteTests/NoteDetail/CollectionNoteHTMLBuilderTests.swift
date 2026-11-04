import XCTest
@testable import Trinote

final class CollectionNoteHTMLBuilderTests: XCTestCase {
    typealias M = CollectionNoteModels
    typealias B = CollectionNoteHTMLBuilder

    private func child(_ id: String, title: String = "Title", type: NoteType = .text, archived: Bool = false, color: String? = nil, hasChildren: Bool = false) -> M.Child {
        M.Child(noteId: id, title: title, type: type, mime: "text/html", isProtected: false, iconClass: "bx bx-note", isArchived: archived, hasChildren: hasChildren, colorLabel: color)
    }

    private func count(_ needle: String, in haystack: String) -> Int {
        haystack.components(separatedBy: needle).count - 1
    }

    func testGridCardsLinkToEveryChildInOrder() {
        let html = B.grid(items: [
            M.PageItem(child: child("a"), body: .html(kind: "text", html: "<p>Hello</p>")),
            M.PageItem(child: child("b", archived: true), body: .none),
            M.PageItem(child: child("c", color: "#ff0000"), body: .protected),
        ])
        XCTAssertTrue(html.contains("class=\"\(B.markerClass) \(B.markerClass)--grid\""))
        XCTAssertEqual(count("class=\"note-book-card ", in: html), 3)
        XCTAssertEqual(count("href=\"#/", in: html), 3)
        XCTAssertLessThan(html.range(of: "href=\"#/a\"")!.lowerBound, html.range(of: "href=\"#/b\"")!.lowerBound)
        XCTAssertTrue(html.contains("<span class=\"tn-icon bx bx-note\"></span>"))
        XCTAssertTrue(html.contains("note-book-card type-text"))
        XCTAssertTrue(html.contains("note-book-card type-none archived"))
        XCTAssertTrue(html.contains("type-protectedSession"))
        XCTAssertTrue(html.contains("use-note-color\" data-note-id=\"c\" style=\"--custom-color: #ff0000;\""))
        XCTAssertTrue(html.contains("<div class=\"rendered-content\"><p>Hello</p></div>"))
    }

    func testTitlesAndIdsAreEscaped() {
        let html = B.grid(items: [M.PageItem(child: child("x\"y", title: "<script>alert(1)</script>"), body: .none)])
        XCTAssertFalse(html.contains("<script>"))
        XCTAssertTrue(html.contains("&lt;script&gt;alert(1)&lt;/script&gt;"))
        XCTAssertTrue(html.contains("href=\"#/x&quot;y\""))
    }

    func testUnsafeColorIsIgnored() {
        let html = B.grid(items: [M.PageItem(child: child("a", color: "red; background: url(x)"), body: .none)])
        XCTAssertFalse(html.contains("use-note-color"))
        XCTAssertFalse(html.contains("url(x)"))
    }

    func testListRowsCarryLevelsAndHydration() {
        let nested = M.ListRow(child: child("b"), level: 2)
        let open = M.ListRow(child: child("a", hasChildren: true), level: 1, isExpanded: true, isHydrated: true, body: .html(kind: "text", html: "<p>A</p>"), children: [nested])
        let closed = M.ListRow(child: child("c"), level: 1)
        let html = B.list(rows: [open, closed])
        XCTAssertTrue(html.contains("class=\"\(B.markerClass) \(B.markerClass)--list\""))
        XCTAssertFalse(html.contains("hidden"), "nothing is drawn above the rows")
        // The stylesheet carries both chevrons even when every row starts closed, for the toggle in the page.
        let allClosed = B.list(rows: [closed])
        XCTAssertFalse(allClosed.contains("bx-chevron-down"))
        let styles = CollectionNoteWebStyles.css(forHTML: allClosed)
        XCTAssertTrue(styles.contains(".tn-icon.bx-chevron-down::before{content:"))
        XCTAssertTrue(styles.contains(".tn-icon.bx-chevron-right::before{content:"))
        XCTAssertFalse(CollectionNoteWebStyles.css(forHTML: B.grid(items: [])).contains("bx-chevron"))
        XCTAssertTrue(html.contains("class=\"nested-note-list-item expanded hydrated\" data-note-id=\"a\" data-level=\"1\""))
        XCTAssertTrue(html.contains("note-expander tn-icon bx bx-chevron-down"))
        XCTAssertTrue(html.contains("<div class=\"note-content-preview\"><div class=\"note-book-content type-text\"><div class=\"rendered-content\"><p>A</p></div></div></div>"))
        XCTAssertTrue(html.contains("class=\"nested-note-list-item\" data-note-id=\"b\" data-level=\"2\""))
        XCTAssertTrue(html.contains("class=\"nested-note-list-item\" data-note-id=\"c\" data-level=\"1\""))
        XCTAssertEqual(count("note-row-sub", in: html), 1, "collapsed rows carry nothing until they are hydrated")
        XCTAssertTrue(html.contains("<a class=\"note-book-title\" href=\"#/c\">Title</a>"))
    }

    func testListRowInnerIsWhatHydrationInserts() {
        let row = M.ListRow(child: child("a"), level: 1, isExpanded: true, isHydrated: true, body: .notDownloaded, children: [M.ListRow(child: child("b"), level: 2)])
        let inner = B.listRowInner(row)
        XCTAssertTrue(inner.hasPrefix("<div class=\"note-content-preview\">"))
        XCTAssertTrue(inner.contains("bx bx-cloud-download"))
        XCTAssertTrue(inner.contains("data-note-id=\"b\" data-level=\"2\""))
        XCTAssertFalse(inner.contains("data-note-id=\"a\""))
    }

    func testDashboardWidgetsArePlacedFromTheLayout() {
        let layout = M.DashboardLayout(widgets: ["a": M.DashboardGeometry(x: 4, y: 1, w: 8, h: 2)])
        let html = B.dashboard(items: [
            M.PageItem(child: child("a"), body: .html(kind: "code", html: "<pre>x</pre>")),
            M.PageItem(child: child("b", archived: true), body: .tooLarge),
        ], layout: layout)
        XCTAssertTrue(html.contains("class=\"\(B.markerClass) \(B.markerClass)--dashboard\""))
        XCTAssertTrue(html.contains("class=\"dashboard-widget type-code\" data-note-id=\"a\" style=\"grid-column: 5 / span 8; grid-row: 2 / span 2; --h: 2;\""))
        XCTAssertTrue(html.contains("class=\"dashboard-widget type-none archived\" data-note-id=\"b\" style=\"grid-column: span 4; grid-row: span 3; --h: 3;\""))
        XCTAssertTrue(html.contains("<div class=\"dashboard-widget-header\"><span class=\"tn-icon bx bx-note\"></span><a class=\"note-book-title\" href=\"#/a\">Title</a></div>"))
        XCTAssertFalse(html.contains("note-book-card-link"), "widget bodies are not links")
        XCTAssertTrue(html.contains("Too large to preview"))
    }

    @MainActor func testWrapperInjectsCollectionStylesOnlyWithTheMarker() {
        XCTAssertEqual(CollectionNoteWebStyles.css(forHTML: "<p>plain</p>"), "")
        XCTAssertEqual(CollectionNoteWebStyles.script(forHTML: "<p>plain</p>"), "")
        let html = B.grid(items: [])
        XCTAssertTrue(CollectionNoteWebStyles.css(forHTML: html).contains(".note-book-card"))
        XCTAssertTrue(CollectionNoteWebStyles.script(forHTML: html).contains("window.trinoteCollection"))
        let page = HTMLNoteView.pageForTesting(html)
        XCTAssertTrue(page.contains(".trinote-collection--grid .note-list-container"))
        XCTAssertTrue(page.contains("messageHandlers.collectionRow"))
        XCTAssertFalse(HTMLNoteView.pageForTesting("<p>plain</p>").contains("trinoteCollection"))
    }

    func testTableMarkup() {
        func definition(_ id: String, _ name: String, _ value: String, position: Int) -> AttributeItem {
            AttributeItem(attributeId: id, noteId: "coll", type: .label, name: name, value: value, position: position, isInheritable: false)
        }
        let definitions = M.tableDefinitions(from: [
            definition("d1", "label:due", "promoted,alias=Due,single,date", position: 0),
            definition("d2", "label:done", "single,boolean", position: 1),
            definition("d3", "label:site", "single,url", position: 2),
            definition("d4", "relation:owner", "single", position: 3),
            definition("d5", "label:tags", "multi,text", position: 4),
        ])
        let columns = M.tableColumns(definitions: definitions, config: nil)
        let owner = M.TableTarget(noteId: "o", title: "Owner <1>", iconClass: "bx bx-user", colorLabel: nil)
        let rows = [
            M.TableRow(
                child: child("a", title: "A & B", hasChildren: true), level: 0,
                labels: ["due": ["2026-03-05"], "done": ["true"], "site": ["https://example.com/x"], "tags": ["one", "two"]],
                relations: ["owner": [owner]],
                children: [M.TableRow(child: child("a1", archived: true), level: 1, labels: ["done": ["false"], "site": ["javascript:alert(1)"]])]
            ),
            M.TableRow(child: child("b", color: "#00ff00"), level: 0),
        ]
        let html = B.table(columns: columns, rows: rows, locale: Locale(identifier: "en_US_POSIX"), timeZone: TimeZone(identifier: "UTC")!)

        XCTAssertTrue(html.contains("class=\"\(B.markerClass) \(B.markerClass)--table\""))
        // Hidden built-in columns are left out; the rest head the table in order, the title at the web client's width.
        XCTAssertTrue(html.contains("<thead><tr><th class=\"col-rownum\">#</th><th class=\"col-title\" style=\"width: 400px; min-width: 400px;\">"))
        XCTAssertFalse(html.contains("col-noteid"))
        XCTAssertEqual(count("<th ", in: html), 7)
        XCTAssertTrue(html.contains(">Due</th>"))
        XCTAssertTrue(html.contains(">owner</th>"), "a definition without an alias is titled by its name")
        // Rows: numbered in order, nested ones with their level and path, a toggle on the parent and a spacer on leaves.
        XCTAssertTrue(html.contains("<tr class=\"table-row has-children\" data-note-id=\"a\" data-level=\"0\" data-path=\"a\"><td class=\"col-rownum\">1</td>"))
        XCTAssertTrue(html.contains("<tr class=\"table-row archived\" data-note-id=\"a1\" data-level=\"1\" data-path=\"a/a1\"><td class=\"col-rownum\">2</td>"))
        XCTAssertTrue(html.contains("<tr class=\"table-row use-note-color\" data-note-id=\"b\" data-level=\"0\" data-path=\"b\" style=\"--custom-color: #00ff00;\"><td class=\"col-rownum\">3</td>"))
        XCTAssertTrue(html.contains("<button class=\"tree-toggle\" type=\"button\"><span class=\"tn-icon bx bx-chevron-down\"></span></button>"))
        XCTAssertTrue(html.contains("<span class=\"tree-indent\" style=\"width: 20px;\"></span>"))
        XCTAssertEqual(count("tree-toggle-spacer", in: html), 2)
        XCTAssertTrue(html.contains("<a class=\"reference-link\" href=\"#/a\">A &amp; B</a>"))
        // Cells by type.
        XCTAssertTrue(html.contains("<td class=\"col-label col-type-date\">3/5/26</td>"))
        XCTAssertTrue(html.contains("<td class=\"col-label col-type-boolean\"><span class=\"tn-icon bx bx-check label-flag-set\" title=\"true\"></span></td>"))
        XCTAssertTrue(html.contains("<td class=\"col-label col-type-url\"><a href=\"https://example.com/x\">https://example.com/x</a></td>"))
        XCTAssertTrue(html.contains("<td class=\"col-label col-type-url\">javascript:alert(1)</td>"), "only web links become links")
        XCTAssertTrue(html.contains("<td class=\"col-relation\"><a class=\"reference-link\" href=\"#/o\"><span class=\"tn-icon bx bx-user\"></span>Owner &lt;1&gt;</a></td>"))
        XCTAssertTrue(html.contains("<td class=\"col-label col-type-text\"><span class=\"tn-chip\">one</span><span class=\"tn-chip\">two</span></td>"))
        XCTAssertTrue(html.contains("<td class=\"col-label col-type-text\"></td>"), "a note without the label has an empty cell")
        // The table's styles, both chevrons and the fold script come with the marker.
        let css = CollectionNoteWebStyles.css(forHTML: html)
        XCTAssertTrue(css.contains(".trinote-collection--table .table-scroll"))
        XCTAssertTrue(css.contains(".tn-icon.bx-chevron-right::before"))
        XCTAssertTrue(CollectionNoteWebStyles.script(forHTML: html).contains("tree-toggle"))
        XCTAssertFalse(CollectionNoteWebStyles.script(forHTML: B.grid(items: [])).contains("tree-toggle"))
    }

    func testLabelValuesByType() {
        let locale = Locale(identifier: "en_US_POSIX")
        let utc = TimeZone(identifier: "UTC")!
        // Foundation puts a narrow no-break space before "PM"; the assertions read it as a space.
        func plain(_ text: String) -> String {
            text.replacingOccurrences(of: "\u{202F}", with: " ").replacingOccurrences(of: "\u{00A0}", with: " ")
        }
        XCTAssertEqual(plain(B.labelValue("2026-03-05T14:30", type: .datetime, locale: locale, timeZone: utc)), "3/5/26, 2:30 PM")
        XCTAssertEqual(B.labelValue("not a date", type: .date, locale: locale, timeZone: utc), "not a date")
        XCTAssertEqual(B.labelValue("a@b.c", type: .email), "<a href=\"mailto:a@b.c\">a@b.c</a>")
        XCTAssertEqual(B.labelValue("mailto:a@b.c", type: .email), "<a href=\"mailto:a@b.c\">mailto:a@b.c</a>")
        XCTAssertEqual(B.labelValue("+1 555", type: .phone), "<a href=\"tel:+1 555\">+1 555</a>")
        XCTAssertEqual(B.labelValue("#ff8800", type: .color), "<span class=\"tn-color-chip\"><span class=\"tn-swatch\" style=\"background-color: #ff8800;\"></span>#ff8800</span>")
        XCTAssertEqual(B.labelValue("url(x)", type: .color), "url(x)", "only colour-like values become swatches")
        XCTAssertEqual(B.labelValue("URL(https://evil.example/x)", type: .color), "URL(https://evil.example/x)")
        XCTAssertEqual(B.labelValue("<b>", type: .text), "&lt;b&gt;")
        XCTAssertEqual(plain(B.formattedLabelDate("2026-03-05 10:20:30.123+00:00", withTime: true, locale: locale, timeZone: utc)), "3/5/26, 10:20 AM")
    }
}
