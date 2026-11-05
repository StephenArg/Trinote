import XCTest
@testable import Trinote

final class MarkdownToNoteHTMLTests: XCTestCase {
    func testHeadingsBoldItalicAndLists() {
        let md = """
        # Title
        ## Sub
        ###### Tiny
        Paragraph with **bold** and *italic*.

        - one
        - two

        1. first
        2. second
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<h1>Title</h1>"))
        XCTAssertTrue(html.contains("<h2>Sub</h2>"))
        XCTAssertTrue(html.contains("<h6>Tiny</h6>"))
        XCTAssertTrue(html.contains("<strong>bold</strong>"))
        XCTAssertTrue(html.contains("<em>italic</em>"))
        XCTAssertTrue(html.contains("<ul>"))
        XCTAssertTrue(html.contains("<li>one</li>"))
        XCTAssertTrue(html.contains("<ol>"))
        XCTAssertTrue(html.contains("<li>first</li>"))
    }

    func testStrikethroughMarkUnderlineSubSup() {
        let md = "~~strike~~ ==mark== ++ins++ H~2~O 19^th^"
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<s>strike</s>"))
        XCTAssertTrue(html.contains("<mark>mark</mark>"))
        XCTAssertTrue(html.contains("<u>ins</u>"))
        XCTAssertTrue(html.contains("<sub>2</sub>"))
        XCTAssertTrue(html.contains("<sup>th</sup>"))
    }

    func testHorizontalRuleAndBlockquote() {
        let md = """
        before

        ---

        > quoted
        > still
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<hr>"))
        XCTAssertTrue(html.contains("<blockquote>"))
        XCTAssertTrue(html.contains("quoted"))
    }

    func testBlockquoteHardLineBreak() {
        // Trailing two spaces after the first quote line → CommonMark hard break.
        let md = "> Synthetic note for [Trinote #21](https://github.com/StephenArg/Trinote/issues/21).\u{0020}\u{0020}\n> No private servers, companies, or credentials."
        let html = MarkdownToNoteHTML.convert(md, options: .preview)
        XCTAssertTrue(html.contains("<blockquote>"), html)
        XCTAssertTrue(html.contains("<br>"), "expected hard break between quote lines, got: \(html)")
        XCTAssertTrue(html.contains("Trinote #21"), html)
        XCTAssertTrue(html.contains("No private servers"), html)
        // Soft-joined quotes without a hard break stay one line (space, not <br>).
        let soft = MarkdownToNoteHTML.convert("> one\n> two")
        XCTAssertFalse(soft.contains("<br>"), soft)
        XCTAssertTrue(soft.contains("one two") || (soft.contains("one") && soft.contains("two")), soft)
    }

    func testNestedBlockquote() {
        let md = """
        > outer
        >> inner
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<blockquote>"))
        // Nested convert produces nested blockquotes
        XCTAssertTrue(html.contains("outer"))
        XCTAssertTrue(html.contains("inner"))
    }

    func testLinkAndCode() {
        let md = "See [Trilium](https://example.com) and `code`."
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<a href=\"https://example.com\">Trilium</a>"))
        XCTAssertTrue(html.contains("<code>code</code>"))
    }

    func testLinkWithTitleAndAutolink() {
        let md = #"[pica](https://example.com/pica "demo") and https://github.com/nodeca/pica"#
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("title=\"demo\""))
        XCTAssertTrue(html.contains("<a href=\"https://github.com/nodeca/pica\">https://github.com/nodeca/pica</a>"))
    }

    func testFencedCodeBlockWithLanguage() {
        let md = """
        ```js
        var foo = 1;
        ```
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<pre><code class=\"language-js\">"))
        XCTAssertTrue(html.contains("var foo = 1;"))
    }

    func testIndentedCodeBlock() {
        let md = """
        Para

            line 1
            line 2

        After
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<pre><code>"))
        XCTAssertTrue(html.contains("line 1"))
        XCTAssertTrue(html.contains("line 2"))
    }

    func testTable() {
        let md = """
        | Option | Description |
        | ------ | -----------:|
        | data   | path to data |
        | engine | handlebars |
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<table>"))
        XCTAssertTrue(html.contains("<th>Option</th>"))
        XCTAssertTrue(html.contains("text-align:right"))
        XCTAssertTrue(html.contains("<td>data</td>"))
    }

    func testImageAndReferenceLink() {
        let md = """
        ![Minion](https://example.com/minion.png "Hero")

        [link text][ref]

        [ref]: http://dev.nodeca.com "title text!"
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<figure class=\"image\">"))
        XCTAssertTrue(html.contains("src=\"https://example.com/minion.png\""))
        XCTAssertTrue(html.contains("alt=\"Minion\""))
        XCTAssertTrue(html.contains("title=\"Hero\""))
        XCTAssertTrue(html.contains("<a href=\"http://dev.nodeca.com\" title=\"title text!\">link text</a>"))
    }

    func testTypographicAndEmoji() {
        let md = "(c) (tm) +- --- :wink:"
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("&copy;"))
        XCTAssertTrue(html.contains("&trade;"))
        XCTAssertTrue(html.contains("&plusmn;"))
        XCTAssertTrue(html.contains("&mdash;"))
        XCTAssertTrue(html.contains("😉"))
    }

    func testFootnotes() {
        let md = """
        Note[^one].

        [^one]: Footnote **here**
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("fnref-one"))
        XCTAssertTrue(html.contains("fn-one"))
        XCTAssertTrue(html.contains("<strong>here</strong>"))
        XCTAssertTrue(html.contains("class=\"footnotes\""))
    }

    func testAbbreviation() {
        let md = """
        This is HTML example.

        *[HTML]: HyperText Markup Language
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains(#"<abbr title="HyperText Markup Language">HTML</abbr>"#))
    }

    func testDefinitionList() {
        let md = """
        Term 1

        :   Definition 1

        Term 2

        :   Definition 2
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<dl>"))
        XCTAssertTrue(html.contains("<dt>Term 1</dt>"))
        XCTAssertTrue(html.contains("<dd>Definition 1</dd>"))
    }

    func testCustomContainer() {
        let md = """
        ::: warning
        *here be dragons*
        :::
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("markdown-container-warning"))
        XCTAssertTrue(html.contains("<em>here be dragons</em>"))
    }

    func testOrderedListStartOffset() {
        let md = """
        57. foo
        1. bar
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<ol start=\"57\">"))
        XCTAssertTrue(html.contains("foo"))
        XCTAssertTrue(html.contains("bar"))
    }

    func testNestedUnorderedList() {
        let md = """
        + parent
          - child
        + again
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<ul>"))
        XCTAssertTrue(html.contains("parent"))
        XCTAssertTrue(html.contains("child"))
        // Nested list must open a second `<ul>` inside the parent `<li>`, not flatten.
        XCTAssertTrue(html.contains("<li>parent<ul>"), "expected nested ul inside parent li, got: \(html)")
    }

    /// Tab-indented nesting (Obsidian, Logseq): a tab is 4 columns of depth but 1 character, and slicing the line by
    /// columns used to run past the end of short lines and trap.
    func testTabIndentedNestedListDoesNotTrap() {
        let html = MarkdownToNoteHTML.convert("- a\n\t- b\n\t\t- c\n\t\t\t- d")
        XCTAssertTrue(html.contains("<li>a<ul><li>b<ul><li>c<ul><li>d</li>"), html)
    }

    func testMixedSpaceAndTabIndentNests() {
        let html = MarkdownToNoteHTML.convert("- a\n  \t- b\n  \tx")
        XCTAssertTrue(html.contains("<li>a<ul><li>b"), html)
    }

    func testTabIndentedOrderedListNests() {
        let html = MarkdownToNoteHTML.convert("1. a\n\t1. b")
        XCTAssertTrue(html.contains("<li>a<ol><li>b</li>"), html)
    }

    func testAutolinkPrefixIsCaseInsensitive() {
        let html = MarkdownToNoteHTML.convert("see HTTPS://example.com/z and Http://example.org.")
        XCTAssertTrue(html.contains("<a href=\"HTTPS://example.com/z\">"), html)
        XCTAssertTrue(html.contains("<a href=\"Http://example.org\">"), html)
    }

    func testNestedListThreeLevelsDeep() {
        let md = """
        - Infrastructure
          - Kubernetes
            - HPA
            - Helm rollback
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<li>Infrastructure<ul>"), html)
        XCTAssertTrue(html.contains("<li>Kubernetes<ul>"), html)
        XCTAssertTrue(html.contains("<li>HPA</li>"), html)
        XCTAssertTrue(html.contains("<li>Helm rollback</li>"), html)
    }

    func testPreviewMermaidFenceBecomesDiagramDiv() {
        let md = """
        ```mermaid
        flowchart LR
          A --> B
        ```
        """
        let preview = MarkdownToNoteHTML.convert(md, options: .preview)
        XCTAssertTrue(preview.contains("<div class=\"mermaid\">"), preview)
        XCTAssertTrue(preview.contains("flowchart LR"), preview)
        XCTAssertFalse(preview.contains("<pre><code"), preview)

        let imported = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(imported.contains("<pre><code class=\"language-mermaid\">"), imported)
        XCTAssertFalse(imported.contains("<div class=\"mermaid\">"), imported)
    }

    func testPreviewTaskLists() {
        let md = """
        - [x] Define SLI
        - [ ] Wire alerts to runbooks
        - [/] Game day in progress
        - [?] Maybe add chaos in Q3
        - [-] Cancelled idea
        """
        let html = MarkdownToNoteHTML.convert(md, options: .preview)
        XCTAssertTrue(html.contains("<ul class=\"todo-list\">"), html)
        XCTAssertTrue(html.contains("<input type=\"checkbox\" checked disabled>"), html)
        XCTAssertTrue(html.contains("Define SLI"), html)
        XCTAssertTrue(html.contains("Wire alerts to runbooks"), html)
        XCTAssertTrue(html.contains("data-trilium-task-state=\"doing\""), html)
        XCTAssertTrue(html.contains("data-trilium-task-state=\"maybe\""), html)
        XCTAssertTrue(html.contains("data-trilium-task-state=\"cancelled\""), html)
        XCTAssertTrue(html.contains("title=\"Doing\""), html)
        XCTAssertTrue(html.contains("title=\"Maybe\""), html)
        XCTAssertTrue(html.contains("Game day in progress"), html)
        XCTAssertTrue(html.contains("Maybe add chaos in Q3"), html)
        XCTAssertFalse(html.contains("[/]"), html)
        XCTAssertFalse(html.contains("[?]"), html)
        XCTAssertFalse(html.contains("[-] Cancelled"), html)
    }

    /// Trilium's markup: the state and its title on the `<li>` only; `checked` only for completed states.
    func testPreviewTaskStateMarkupMatchesTrilium() {
        let html = MarkdownToNoteHTML.convert("- [/] Doing it", options: .preview)
        XCTAssertTrue(html.contains("<li data-trilium-task-state=\"doing\" title=\"Doing\"><label class=\"todo-list__label\"><input type=\"checkbox\" disabled>"), html)
        XCTAssertFalse(html.contains("<input type=\"checkbox\" data-trilium-task-state"), html)
    }

    func testPreviewUsesServerSymbolsAndCompletion() {
        var wontDo = TaskStateCatalog.defaultCustom[2]
        wontDo.name = "_wontdo"
        wontDo.title = "Won't do"
        wontDo.markdownSymbol = "~"
        wontDo.isCompleted = true
        let states = [TaskStateCatalog.none, TaskStateCatalog.done, wontDo]
        let html = MarkdownToNoteHTML.convert("- [~] Skip it\n- [/] Not a state here", options: .preview(taskStates: states))
        XCTAssertTrue(html.contains("data-trilium-task-state=\"_wontdo\" title=\"Won&#39;t do\""), html)
        XCTAssertTrue(html.contains("<input type=\"checkbox\" checked disabled>"), html)
        // A symbol no state defines stays plain text.
        XCTAssertTrue(html.contains("[/] Not a state here"), html)
    }

    func testSettingTaskStateWritesSymbol() {
        let md = """
        - [ ] a
        - [/] b
        * [x] c
        """
        XCTAssertEqual(MarkdownToNoteHTML.settingTaskState(in: md, at: 1, symbol: "?"), """
        - [ ] a
        - [?] b
        * [x] c
        """)
        XCTAssertEqual(MarkdownToNoteHTML.settingTaskState(in: md, at: 2, symbol: " "), """
        - [ ] a
        - [/] b
        * [ ] c
        """)
        var tilde = TaskStateCatalog.defaultCustom[0]
        tilde.markdownSymbol = "~"
        XCTAssertEqual(MarkdownToNoteHTML.settingTaskState(in: "- [~] custom", at: 0, symbol: "x", states: [tilde]), "- [x] custom")
        // `[a]` isn't a task item in the preview, so it isn't counted either.
        XCTAssertEqual(MarkdownToNoteHTML.settingTaskState(in: "- [a] note\n- [ ] task", at: 0, symbol: "x"), "- [a] note\n- [x] task")
        XCTAssertNil(MarkdownToNoteHTML.settingTaskState(in: md, at: 9, symbol: "x"))
        XCTAssertNil(MarkdownToNoteHTML.settingTaskState(in: md, at: 0, symbol: " "), "no change")
    }

    func testEqualsIgnoringTaskMarkers() {
        let a = "- [ ] one\n- [/] two"
        let b = "- [x] one\n- [~] two"
        XCTAssertTrue(MarkdownToNoteHTML.equalsIgnoringTaskMarkers(a, b))
        XCTAssertFalse(MarkdownToNoteHTML.equalsIgnoringTaskMarkers(a, "- [ ] one\n- [/] changed"))
    }

    func testPreviewTaskListsOffByDefault() {
        let md = """
        - [x] Define SLI
        - [ ] Wire alerts
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertFalse(html.contains("todo-list"), html)
        XCTAssertTrue(html.contains("[x] Define SLI"), html)
    }

    func testPreviewMixedTableMermaidAndParagraph() {
        let md = """
        | Check | Pass |
        |-------|------|
        | Tables | ? |

        ```mermaid
        flowchart LR
            OK[Rendered OK] --> SHIP[Ship fix]
        ```

        End of sample.
        """
        let html = MarkdownToNoteHTML.convert(md, options: .preview)
        XCTAssertTrue(html.contains("<table>"), html)
        XCTAssertTrue(html.contains("<th>Check</th>"), html)
        XCTAssertTrue(html.contains("<div class=\"mermaid\">"), html)
        XCTAssertTrue(html.contains("Rendered OK"), html)
        XCTAssertTrue(html.contains("<p>End of sample.</p>"), html)
    }

    func testTableCellInlineCode() {
        let md = """
        | Component | First check |
        |-----------|-------------|
        | MySQL | `SHOW SLAVE STATUS` |
        """
        let html = MarkdownToNoteHTML.convert(md)
        XCTAssertTrue(html.contains("<code>SHOW SLAVE STATUS</code>"), html)
    }

    func testEscapesHTMLInPlainText() {
        let html = PlainTextToNoteHTML.convert("a <b> & c")
        XCTAssertEqual(html, "<p>a &lt;b&gt; &amp; c</p>")
    }

    func testPlainTextParagraphs() {
        let html = PlainTextToNoteHTML.convert("one\n\ntwo")
        XCTAssertEqual(html, "<p>one</p><p>two</p>")
    }
}
