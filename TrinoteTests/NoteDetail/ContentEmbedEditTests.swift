import SwiftUI
import UIKit
import XCTest
@testable import Trinote

/// The ⋮ menu of a note excerpt: what each option writes into the note, following Trilium's embed commands.
@MainActor
final class ContentEmbedEditTests: XCTestCase {
    private let sized = #"<figure class="include-note" data-note-id="n1" data-box-size="resizable" style="--include-note-width:30em;--include-note-height:12em"><figcaption>Cap</figcaption></figure>"#

    private func apply(_ change: ContentEmbedEdit.Change, to html: String, index: Int = 0) -> String {
        ContentEmbedEdit.applying(change, toEmbedAt: index, in: html) ?? "nil"
    }

    func testOnlyTheChosenEmbedChanges() {
        let first = #"<figure class="include-note" data-note-id="a" data-box-size="full"></figure>"#
        let second = #"<figure class="include-note" data-note-id="b" data-box-size="full"></figure>"#
        let html = "<p>x</p>\(first)<p>y</p>\(second)<p>z</p>"
        XCTAssertEqual(apply(.delete, to: html, index: 1), "<p>x</p>\(first)<p>y</p><p>z</p>")
        XCTAssertEqual(apply(.size("compact"), to: html, index: 1), "<p>x</p>\(first)<p>y</p>\(second.replacingOccurrences(of: "full", with: "compact"))<p>z</p>")
        XCTAssertNil(ContentEmbedEdit.applying(.delete, toEmbedAt: 2, in: html))
    }

    func testResizableKeepsItsSizeAndFullDropsIt() {
        let expandable = apply(.size("expandable"), to: sized)
        XCTAssertFalse(expandable.contains("--include-note-width"), "expandable takes the full width")
        XCTAssertTrue(expandable.contains("--include-note-height:12em"))
        let full = apply(.size("full"), to: sized)
        XCTAssertFalse(full.contains("style="), full)
        XCTAssertTrue(full.contains("<figcaption>Cap</figcaption>"), "a full box keeps its caption")
    }

    func testCompactIsATitleRowAlone() {
        let hidden = sized.replacingOccurrences(of: "<figure ", with: #"<figure data-hide-title="true" "#)
        let compact = apply(.size("compact"), to: hidden)
        XCTAssertTrue(compact.contains(#"data-box-size="compact""#))
        XCTAssertFalse(compact.contains("figcaption"), compact)
        XCTAssertFalse(compact.contains("data-hide-title"), compact)
    }

    func testDefaultDropsAResizedBox() {
        let result = apply(.defaultSize("resizable"), to: sized)
        XCTAssertTrue(result.contains(#"data-box-size="resizable""#))
        XCTAssertFalse(result.contains("style="), result)
    }

    func testPositionTitleAndEditableAreAttributes() {
        let left = apply(.position("wrap-left"), to: sized)
        XCTAssertTrue(left.contains(#"data-position="wrap-left""#), left)
        XCTAssertFalse(apply(.position(nil), to: left).contains("data-position"), "centered is the absence of one")

        let untitled = apply(.showTitle(false), to: sized)
        XCTAssertTrue(untitled.contains(#"data-hide-title="true""#), untitled)
        XCTAssertFalse(apply(.showTitle(true), to: untitled).contains("data-hide-title"))

        let editable = apply(.editable(true), to: sized)
        XCTAssertTrue(editable.contains(#"data-editable="true""#), editable)
        XCTAssertFalse(apply(.editable(false), to: editable).contains("data-editable"))
    }

    func testCaptionsAreEscapedAndCanBeRemoved() {
        let bare = #"<figure class="include-note" data-note-id="n1" data-box-size="full"></figure>"#
        let captioned = apply(.caption("a <b> & c"), to: bare)
        XCTAssertTrue(captioned.contains("<figcaption>a &lt;b&gt; &amp; c</figcaption>"), captioned)
        XCTAssertEqual(apply(.caption(nil), to: captioned), bare)
    }

    func testConvertingMakesAReferenceLinkKeepingTheBlock() {
        let excerpt = #"<figure class="include-note" data-note-id="n1" data-block="b1:b2" data-box-size="full"></figure>"#
        XCTAssertEqual(
            apply(.convertToLink(title: "A & B"), to: "<p>x</p>" + excerpt),
            ##"<p>x</p><p><a class="reference-link" href="#root/n1?block=b1:b2">A &amp; B</a></p>"##
        )
    }

    func testAnOlderEmbedBecomesTodaysFormOnAnyChange() {
        let older = #"<section class="include-note" data-note-id="n1" data-box-size="medium">&nbsp;</section>"#
        XCTAssertEqual(
            apply(.showTitle(false), to: older),
            #"<figure class="include-note" data-note-id="n1" data-box-size="resizable" data-hide-title="true" style="--include-note-height:20em"></figure>"#
        )
    }

    func testMarkupIgnoresPlacementsItsSizeCantUse() {
        func markup(_ size: String, _ extra: String) -> ContentEmbedMarkup {
            ContentEmbedMarkup(openTag: #"<figure class="include-note" data-note-id="n" data-box-size="\#(size)" \#(extra)>"#, innerHTML: "")
        }
        XCTAssertNil(markup("full", #"data-position="left""#).position)
        XCTAssertNil(markup("expandable", #"data-position="wrap-left""#).position)
        XCTAssertEqual(markup("expandable", #"data-position="left""#).position, "left")
        XCTAssertEqual(markup("resizable", #"data-position="wrap-right""#).position, "wrap-right")
        XCTAssertFalse(markup("expandable", #"data-hide-title="true""#).isTitleHidden)
    }

    func testMovingAnExcerptChangesOnlyItsReference() {
        let moved = #"<figure class="include-note" data-note-id="n1" data-block="a:b" data-box-size="full"><figcaption>Cap</figcaption></figure>"#
        let otherRange = #"<figure class="include-note" data-note-id="n1" data-block="z" data-box-size="full"></figure>"#
        let otherNote = #"<figure class="include-note" data-note-id="n2" data-block="a:b" data-box-size="full"></figure>"#
        let html = "<p>x</p>\(moved)\(otherRange)\(otherNote)\(moved)<p>a:b</p>"
        let expected = moved.replacingOccurrences(of: #"data-block="a:b""#, with: #"data-block="c:b""#)
        XCTAssertEqual(
            ContentEmbedEdit.movingExcerpts(of: "n1", from: "a:b", to: "c:b", in: html),
            "<p>x</p>\(expected)\(otherRange)\(otherNote)\(expected)<p>a:b</p>"
        )
    }

    // MARK: What the menu offers

    private func model(_ tag: String, type: String = "text", canChange: Bool = true) -> IncludeEmbedMenuModel {
        let html = #"<figure class="include-note" data-note-id="n" \#(tag)></figure>"#
        return IncludeEmbedMenuModel(
            state: ContentEmbedEdit.state(ofEmbedAt: 0, in: html),
            noteType: type, canChange: canChange, canOpenInNewTab: false
        )
    }

    func testAResizableEmbedOffersEverything() {
        let menu = model(#"data-box-size="resizable""#)
        XCTAssertEqual(menu.sizes.map(\.value), ["compact", "resizable", "full", "expandable"])
        XCTAssertEqual(menu.breakPositions.map(\.value), ["left", "center", "right"])
        XCTAssertEqual(menu.wrapPositions.map(\.value), ["wrap-left", "wrap-right"])
        XCTAssertTrue(menu.canToggleTitle)
        XCTAssertTrue(menu.canToggleCaption)
        XCTAssertTrue(menu.isAtDefaultSize)
        XCTAssertTrue(menu.offersEditable)
    }

    func testPositionsAndTogglesFollowTheSize() {
        let expandable = model(#"data-box-size="expandable""#)
        XCTAssertEqual(expandable.breakPositions.count, 3)
        XCTAssertTrue(expandable.wrapPositions.isEmpty)
        XCTAssertFalse(expandable.canToggleTitle)
        XCTAssertTrue(expandable.isTitleShown)

        let compact = model(#"data-box-size="compact""#)
        XCTAssertTrue(compact.breakPositions.isEmpty)
        XCTAssertFalse(compact.canToggleTitle)
        XCTAssertFalse(compact.canToggleCaption)
        XCTAssertTrue(model(#"data-box-size="full""#).breakPositions.isEmpty)
    }

    func testDefaultSizeFollowsTheContent() {
        XCTAssertEqual(model(#"data-box-size="full""#, type: "code").defaultSize, "full")
        XCTAssertEqual(model(#"data-box-size="full" data-block="b""#).defaultSize, "full")
        XCTAssertEqual(model(#"data-box-size="full""#).defaultSize, "resizable")
        XCTAssertFalse(model(#"data-box-size="full""#).isAtDefaultSize)
        XCTAssertEqual(model(#"data-box-size="compact""#, type: "relationMap").defaultSize, "compact")
    }

    func testAReadOnlyNoteOnlyOpens() {
        let menu = model(#"data-box-size="full""#, canChange: false)
        XCTAssertFalse(menu.canChange)
        XCTAssertTrue(menu.sizes.isEmpty)
    }

    // MARK: The menu fits

    private func hostMenu(height: CGFloat, onHeight: @escaping (CGFloat) -> Void) async throws -> (UIWindow, UIView) {
        let scene = try XCTUnwrap(UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.first)
        let window = UIWindow(windowScene: scene)
        window.frame = CGRect(x: 0, y: 0, width: IncludeEmbedMenuView.width, height: height)
        let menu = IncludeEmbedMenuView(model: model(#"data-box-size="resizable""#), onAction: { _ in }, onHeightChange: onHeight)
        let host = UIHostingController(rootView: menu.ignoresSafeArea())
        window.rootViewController = host
        window.makeKeyAndVisible()
        try await Task.sleep(nanoseconds: 300_000_000)
        return (window, host.view)
    }

    func testTheMenuReportsItsRealHeight() async throws {
        var reported: CGFloat = 0
        let (window, _) = try await hostMenu(height: 800) { reported = $0 }
        defer { window.isHidden = true }
        // Open, Editable, Size, Position, Show Title, Show Caption, Delete Block, Convert to Link, two dividers, padding.
        XCTAssertEqual(reported, 8 * 44 + 2 * (1 / UIScreen.main.scale) + 12, accuracy: 2)
    }

    func testAShortPopoverScrollsInsteadOfCuttingRowsOff() async throws {
        let (window, view) = try await hostMenu(height: 200) { _ in }
        defer { window.isHidden = true }
        var queue: [UIView] = [view]
        var scrollView: UIScrollView?
        while !queue.isEmpty, scrollView == nil {
            let next = queue.removeFirst()
            scrollView = next as? UIScrollView
            queue.append(contentsOf: next.subviews)
        }
        let rows = try XCTUnwrap(scrollView)
        XCTAssertGreaterThan(rows.contentSize.height, rows.bounds.height, "the rows that don't fit can be scrolled to")
        XCTAssertEqual(rows.contentOffset.y + rows.adjustedContentInset.top, 0, accuracy: 1, "starting from the first row")
    }
}

