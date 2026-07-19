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
