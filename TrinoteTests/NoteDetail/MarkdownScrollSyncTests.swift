import SwiftUI
import UIKit
import WebKit
import XCTest
@testable import Trinote

/// A Markdown split's two panes kept at the same point of their lengths.
@MainActor
final class MarkdownScrollSyncTests: XCTestCase {
    private func pane(contentHeight: CGFloat) -> UIScrollView {
        let view = UIScrollView(frame: CGRect(x: 0, y: 0, width: 300, height: 200))
        view.contentSize = CGSize(width: 300, height: contentHeight)
        return view
    }

    func testTheEditorScrollingTakesThePreviewToTheSamePoint() {
        let sync = MarkdownScrollSync(sourceScrollsItself: true)
        let source = pane(contentHeight: 1200)
        let preview = pane(contentHeight: 600)
        sync.attach(source, as: .source)
        sync.attach(preview, as: .preview)

        source.contentOffset.y = 500  // halfway: (1200 - 200) / 2

        XCTAssertEqual(preview.contentOffset.y, 200, accuracy: 0.5, "halfway down the preview too")
    }

    func testOnlyAUserScrollOfTheReadersPanesIsFollowed() {
        let sync = MarkdownScrollSync(sourceScrollsItself: false)
        let source = pane(contentHeight: 1200)
        let preview = pane(contentHeight: 600)
        sync.attach(source, as: .source)
        sync.attach(preview, as: .preview)

        source.contentOffset.y = 500
        preview.contentOffset.y = 100

        XCTAssertEqual(preview.contentOffset.y, 100, "a scroll nobody made by hand isn't followed")
        XCTAssertEqual(source.contentOffset.y, 500)
    }

    func testThePreviewGrowingKeepsItInStep() {
        let sync = MarkdownScrollSync(sourceScrollsItself: true)
        let source = pane(contentHeight: 1200)
        let preview = pane(contentHeight: 600)
        sync.attach(source, as: .source)
        sync.attach(preview, as: .preview)
        source.contentOffset.y = 1000  // the end

        preview.contentSize.height = 1000  // re-rendered after typing

        XCTAssertEqual(preview.contentOffset.y, 800, accuracy: 0.5, "still at the end")
    }

    func testInsetsCount() {
        let view = pane(contentHeight: 600)
        view.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: 100, right: 0)
        let range = MarkdownScrollSync.scrollRange(of: view)
        XCTAssertEqual(range.range, 500)
        view.contentOffset.y = 250
        XCTAssertEqual(MarkdownScrollSync.fraction(of: view), 0.5, accuracy: 0.001)
    }

    func testAPaneTooShortToScrollStaysPut() {
        let sync = MarkdownScrollSync(sourceScrollsItself: true)
        let source = pane(contentHeight: 1200)
        let preview = pane(contentHeight: 100)
        sync.attach(source, as: .source)
        sync.attach(preview, as: .preview)

        source.contentOffset.y = 500

        XCTAssertEqual(preview.contentOffset.y, 0)
    }

    // MARK: In a real split

    private func scrollViews(in view: UIView) -> [UIScrollView] {
        var found: [UIScrollView] = []
        var queue = [view]
        while !queue.isEmpty {
            let next = queue.removeFirst()
            if let scrollView = next as? UIScrollView, scrollView.isScrollEnabled { found.append(scrollView) }
            queue.append(contentsOf: next.subviews)
        }
        return found
    }

    /// Hosts a split of a text editor over a scroll view, and returns the two once they're laid out.
    private func hostSplit(ignoringSafeArea: Bool) async throws -> (window: UIWindow, source: UITextView, preview: UIScrollView) {
        let scene = try XCTUnwrap(UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.first)
        let window = UIWindow(windowScene: scene)
        window.frame = CGRect(x: 0, y: 0, width: 390, height: 700)
        let text = (1...200).map { "Line \($0)" }.joined(separator: "\n")
        let split = MarkdownSplitLayout(sourceScrollsItself: true) {
            TextEditor(text: .constant(text))
        } preview: {
            ScrollView {
                Text(text + "\n" + text).frame(maxWidth: .infinity, alignment: .leading)
            }
        }
        window.rootViewController = UIHostingController(rootView: Group {
            if ignoringSafeArea { split.ignoresSafeArea() } else { split }
        })
        window.makeKeyAndVisible()
        for _ in 0..<40 {
            try await Task.sleep(nanoseconds: 50_000_000)
            let all = scrollViews(in: window)
            if let source = all.compactMap({ $0 as? UITextView }).first,
               let preview = all.first(where: { !($0 is UITextView) && $0.contentSize.height > $0.bounds.height }) {
                // The probes attach on the next turn after layout.
                try await Task.sleep(nanoseconds: 300_000_000)
                return (window, source, preview)
            }
        }
        window.isHidden = true
        throw XCTSkip("the split never laid out")
    }

    func testARealSplitHasEqualHalves() async throws {
        let (window, source, preview) = try await hostSplit(ignoringSafeArea: true)
        defer { window.isHidden = true }
        XCTAssertEqual(source.bounds.height, preview.bounds.height, accuracy: 2, "each pane is half")
        XCTAssertEqual(source.bounds.height, 349.5, accuracy: 2)
    }

    func testARealSplitScrollsTogetherEvenReachingIntoTheSafeArea() async throws {
        let (window, source, preview) = try await hostSplit(ignoringSafeArea: false)
        defer { window.isHidden = true }
        let range = MarkdownScrollSync.scrollRange(of: source)
        source.contentOffset.y = range.top + range.range / 2
        XCTAssertEqual(MarkdownScrollSync.fraction(of: preview), 0.5, accuracy: 0.02, "the preview follows to halfway")
    }

    func testTheReadersSplitFitsTheVisibleNoteBelowItsHeader() async throws {
        let defaults = UserDefaults.standard
        let previous = defaults.string(forKey: "markdownReadingViewMode")
        defaults.set("split", forKey: "markdownReadingViewMode")
        defer { defaults.set(previous, forKey: "markdownReadingViewMode") }
        let scene = try XCTUnwrap(UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.first)
        let window = UIWindow(windowScene: scene)
        window.frame = CGRect(x: 0, y: 0, width: 390, height: 700)
        defer { window.isHidden = true }
        let markdown = (1...120).map { "Line \($0) with some **bold** text" }.joined(separator: "\n\n")
        let note = NavigationStack {
            ScrollView {
                VStack(spacing: 0) {
                    Text(verbatim: "Title").font(.largeTitle).frame(height: 150)
                    CodeNoteView(content: markdown, mime: "text/markdown")
                }
            }
            .navigationTitle("Note")
            .navigationBarTitleDisplayMode(.inline)
        }
        window.rootViewController = UIHostingController(rootView: note)
        window.makeKeyAndVisible()

        var source: UITextView?
        var outer: UIScrollView?
        for _ in 0..<60 {
            try await Task.sleep(nanoseconds: 50_000_000)
            let all = scrollViews(in: window)
            source = all.compactMap { $0 as? UITextView }.first
            outer = all.first { !($0 is UITextView) && $0.frame.height >= 600 }
            if source != nil, outer != nil { break }
        }
        // Settles after the space below is measured.
        try await Task.sleep(nanoseconds: 800_000_000)
        let sourcePane = try XCTUnwrap(source)
        let noteScroll = try XCTUnwrap(outer)
        let paneFrame = sourcePane.convert(sourcePane.bounds, to: window)
        let visibleBottom = noteScroll.convert(noteScroll.bounds, to: window).maxY - noteScroll.adjustedContentInset.bottom
            - (noteScroll.contentOffset.y + noteScroll.adjustedContentInset.top)
        // Source, a divider, then a preview pane of the same height, ending at the bottom of what's visible.
        let splitBottom = paneFrame.maxY + 1 + paneFrame.height
        XCTAssertEqual(splitBottom, visibleBottom, accuracy: 4, "the split fills the visible note below its header")
        XCTAssertGreaterThan(paneFrame.height, 120)
    }

    // MARK: Block by block

    func testPanesLineUpAtEachBlockAndMoveAtTheirOwnSpeedBetween() {
        let anchors = [
            MarkdownScrollSync.Anchor(source: 100, preview: 300),  // a short source block that renders tall
            MarkdownScrollSync.Anchor(source: 400, preview: 400),
        ]
        let points = MarkdownScrollSync.alignment(anchors, sourceRange: 1000, previewRange: 600)
        XCTAssertEqual(points.map(\.source), [0, 100, 400, 1000])
        XCTAssertEqual(points.map(\.preview), [0, 300, 400, 600])

        let pairs = points.map { ($0.source, $0.preview) }
        XCTAssertEqual(MarkdownScrollSync.interpolate(100, through: pairs), 300, "a block at the top of one is at the top of the other")
        XCTAssertEqual(MarkdownScrollSync.interpolate(50, through: pairs), 150, accuracy: 0.01, "three times as fast through that block")
        XCTAssertEqual(MarkdownScrollSync.interpolate(250, through: pairs), 350, accuracy: 0.01)
        XCTAssertEqual(MarkdownScrollSync.interpolate(1000, through: pairs), 600, "the ends line up")
    }

    func testBlocksOutOfOrderOrPastTheEndAreLeftOut() {
        let anchors = [
            MarkdownScrollSync.Anchor(source: 100, preview: 200),
            MarkdownScrollSync.Anchor(source: 200, preview: 150),  // backwards in the preview
            MarkdownScrollSync.Anchor(source: 990, preview: 500),  // can't reach the top of the source
        ]
        let points = MarkdownScrollSync.alignment(anchors, sourceRange: 900, previewRange: 600)
        XCTAssertEqual(points.map(\.source), [0, 100, 900])
    }

    func testWithoutBlocksThePanesMatchByHowFarAlong() {
        let points = MarkdownScrollSync.alignment([], sourceRange: 1000, previewRange: 500)
        let pairs = points.map { ($0.source, $0.preview) }
        XCTAssertEqual(MarkdownScrollSync.interpolate(500, through: pairs), 250)
    }

    func testTheEditorAndItsLivePreviewLineUpByHeading() async throws {
        let scene = try XCTUnwrap(UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.first)
        let window = UIWindow(windowScene: scene)
        window.frame = CGRect(x: 0, y: 0, width: 390, height: 800)
        defer { window.isHidden = true }
        // Sections of different shapes, so matching by proportion alone would drift: long wrapped paragraphs (taller in
        // the monospaced source), and tables (taller in the preview).
        var sections: [String] = []
        for index in 1...30 {
            if index.isMultiple(of: 3) {
                sections.append("## Section \(index)\n\n| A | B |\n|---|---|\n| 1 | 2 |\n| 3 | 4 |\n| 5 | 6 |")
            } else {
                let words = String(repeating: "word ", count: index.isMultiple(of: 2) ? 60 : 8)
                sections.append("## Section \(index)\n\n\(words)")
            }
        }
        let markdown = sections.joined(separator: "\n\n")
        let split = MarkdownSplitLayout(sourceScrollsItself: true) {
            TextEditor(text: .constant(markdown))
        } preview: {
            MarkdownLivePreview(source: markdown)
        }
        window.rootViewController = UIHostingController(rootView: split.ignoresSafeArea())
        window.makeKeyAndVisible()

        var source: UITextView?
        var preview: UIScrollView?
        var page: WKWebView?
        for _ in 0..<100 {
            try await Task.sleep(nanoseconds: 50_000_000)
            let all = scrollViews(in: window)
            source = all.compactMap { $0 as? UITextView }.first
            preview = all.first { !($0 is UITextView) && $0.contentSize.height > $0.bounds.height * 2 }
            if let preview { page = webView(in: preview) }
            if source != nil, page != nil { break }
        }
        let editor = try XCTUnwrap(source)
        let rendered = try XCTUnwrap(preview)
        let webView = try XCTUnwrap(page)
        // The page draws, reports its height, and the blocks are measured after a pause.
        try await Task.sleep(nanoseconds: 1_500_000_000)

        let lines = markdown.components(separatedBy: "\n")
        let line = try XCTUnwrap(lines.firstIndex(of: "## Section 20"))
        let tops = MarkdownScrollSync.lineTops(in: editor, lines: [line])
        let sourceTop = try XCTUnwrap(tops[line])
        editor.contentOffset.y = sourceTop - editor.adjustedContentInset.top

        let headingOnPage = try await webView.evaluateJavaScript(
            "document.querySelector('[data-source-line=\"\(line)\"]').getBoundingClientRect().top + (window.scrollY || 0)"
        ) as? Double
        let headingInPreview = MarkdownScrollSync.pageYInScrollView(CGFloat(try XCTUnwrap(headingOnPage)), webView: webView, scrollView: rendered)
        let previewTop = rendered.contentOffset.y + rendered.adjustedContentInset.top
        XCTAssertEqual(previewTop, headingInPreview, accuracy: 6, "Section 20 is at the top of both panes")
    }

    private func webView(in view: UIView) -> WKWebView? {
        var queue = [view]
        while !queue.isEmpty {
            let next = queue.removeFirst()
            if let webView = next as? WKWebView { return webView }
            queue.append(contentsOf: next.subviews)
        }
        return nil
    }
}

