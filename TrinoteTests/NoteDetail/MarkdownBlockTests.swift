import XCTest
@testable import Trinote

/// Sanity coverage for `MarkdownBlock.parse` — the block-level splitter behind the optional
/// "Rendered" toggle in `CodeNoteView` for Trilium v0.103+ `text/markdown` notes.
final class MarkdownBlockTests: XCTestCase {

    func testParagraphMergesConsecutiveLines() {
        let blocks = MarkdownBlock.parse("Hello\nworld")
        XCTAssertEqual(blocks.count, 1)
        if case .paragraph(let text) = blocks[0] {
            XCTAssertEqual(text, "Hello world")
        } else {
            XCTFail("Expected paragraph block")
        }
    }

    func testHeadingsParsedAtSixLevels() {
        let blocks = MarkdownBlock.parse("# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6")
        XCTAssertEqual(blocks.count, 6)
        for (i, b) in blocks.enumerated() {
            if case .heading(let level, let text) = b {
                XCTAssertEqual(level, i + 1)
                XCTAssertEqual(text, "h\(i + 1)")
            } else {
                XCTFail("Expected heading at index \(i)")
            }
        }
    }

    func testNonHeadingWithSevenHashesFallsThroughToParagraph() {
        let blocks = MarkdownBlock.parse("####### nope")
        XCTAssertEqual(blocks.count, 1)
        if case .paragraph = blocks[0] {} else { XCTFail("Expected paragraph") }
    }

    func testBulletListMergesConsecutiveItems() {
        let blocks = MarkdownBlock.parse("- one\n- two\n* three\n+ four")
        XCTAssertEqual(blocks.count, 1)
        if case .bulletList(let items) = blocks[0] {
            XCTAssertEqual(items, ["one", "two", "three", "four"])
        } else {
            XCTFail("Expected bullet list")
        }
    }

    func testOrderedListAcceptsBothDotAndParen() {
        let blocks = MarkdownBlock.parse("1. one\n2) two")
        XCTAssertEqual(blocks.count, 1)
        if case .orderedList(let items) = blocks[0] {
            XCTAssertEqual(items, ["one", "two"])
        } else {
            XCTFail("Expected ordered list")
        }
    }

    func testFencedCodeBlockCapturesLanguageAndContent() {
        let src = """
        ```swift
        let x = 1
        ```
        """
        let blocks = MarkdownBlock.parse(src)
        XCTAssertEqual(blocks.count, 1)
        if case .fencedCode(let lang, let code) = blocks[0] {
            XCTAssertEqual(lang, "swift")
            XCTAssertEqual(code, "let x = 1")
        } else {
            XCTFail("Expected fenced code block")
        }
    }

    func testBlockquoteMergesAcrossLines() {
        let blocks = MarkdownBlock.parse("> first\n> second")
        XCTAssertEqual(blocks.count, 1)
        if case .blockquote(let text) = blocks[0] {
            XCTAssertEqual(text, "first second")
        } else {
            XCTFail("Expected blockquote")
        }
    }

    func testHorizontalRule() {
        let blocks = MarkdownBlock.parse("alpha\n\n---\n\nbeta")
        XCTAssertEqual(blocks.count, 3)
        if case .horizontalRule = blocks[1] {} else { XCTFail("Expected hr in middle") }
    }

    @MainActor
    func testMarkdownLinkOpeningExternalHTTPSOpensInBrowser() {
        let url = URL(string: "https://example.com/path")!
        let result = MarkdownLinkOpening.handle(
            url: url,
            onNoteLinkTapped: { _ in XCTFail("External link should not open a note") },
            onAttachmentLinkTapped: { _ in XCTFail("External link should not open an attachment") }
        )
        XCTAssertEqual(result, .openedInBrowser)
    }

    func testMarkdownLinkNormalizedURLAddsHTTPSForBareHost() {
        let url = MarkdownLinkOpening.normalizedURL(from: "example.com/foo")
        XCTAssertEqual(url?.absoluteString, "https://example.com/foo")
    }

    func testMarkdownLinkNormalizedURLPreservesHTTPS() {
        let url = MarkdownLinkOpening.normalizedURL(from: URL(string: "https://example.com/x")!)
        XCTAssertEqual(url?.absoluteString, "https://example.com/x")
    }

    @MainActor
    func testMarkdownLinkOpeningInternalNoteHashCallsCallback() {
        var opened: String?
        let url = URL(string: "https://trilium.local/#root/parent/childNote")!
        let result = MarkdownLinkOpening.handle(
            url: url,
            onNoteLinkTapped: { opened = $0 },
            onAttachmentLinkTapped: nil
        )
        XCTAssertEqual(result, .handledInternally)
        XCTAssertEqual(opened, "childNote")
    }

    @MainActor
    func testMarkdownLinkOpeningAttachmentHashCallsCallback() {
        var opened: String?
        let url = URL(string: "https://trilium.local/#root/n1?viewMode=attachments&attachmentId=att42")!
        let result = MarkdownLinkOpening.handle(
            url: url,
            onNoteLinkTapped: { _ in XCTFail("Attachment link should not open a note") },
            onAttachmentLinkTapped: { opened = $0 }
        )
        XCTAssertEqual(result, .handledInternally)
        XCTAssertEqual(opened, "att42")
    }

    @MainActor
    func testMarkdownLinkOpeningBareHashRootURL() {
        var opened: String?
        let url = URL(string: "#root/abcNote")!
        let result = MarkdownLinkOpening.handle(
            url: url,
            onNoteLinkTapped: { opened = $0 },
            onAttachmentLinkTapped: nil
        )
        XCTAssertEqual(result, .handledInternally)
        XCTAssertEqual(opened, "abcNote")
    }
}
