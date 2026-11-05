import UIKit
import XCTest
@testable import Trinote

@MainActor
final class FindOnPageControlTests: XCTestCase {
    private let text = (1...40).map { "line \($0) needle" }.joined(separator: "\n")

    private func makeCodeFind() -> (FindOnPageControl, UITextView, NSAttributedString) {
        let control = FindOnPageControl()
        let textView = UITextView(frame: CGRect(x: 0, y: 0, width: 320, height: 200))
        let base = NSAttributedString(string: text)
        control.registerCodeTextView(textView, plainText: text, baseAttributedText: base)
        return (control, textView, base)
    }

    private func range(ofMatch oneBased: Int) -> NSRange {
        var location = 0
        var found = NSRange(location: NSNotFound, length: 0)
        let ns = text as NSString
        for _ in 0..<oneBased {
            found = ns.range(of: "needle", range: NSRange(location: location, length: ns.length - location))
            location = found.location + found.length
        }
        return found
    }

    func testDeepLinkSelectsItsMatchWhenTheNoteIsAlreadyShowing() {
        let (control, textView, _) = makeCodeFind()

        control.prepareFindDeepLink(findQuery: "needle", matchIndex1Based: 30)

        XCTAssertTrue(control.isPresented)
        XCTAssertEqual(control.matchCount, 40)
        XCTAssertEqual(control.activeMatchIndex, 30)
        XCTAssertEqual(textView.selectedRange, range(ofMatch: 30))
    }

    func testViewUpdatesKeepTheDeepLinkedMatch() {
        let (control, textView, base) = makeCodeFind()
        control.prepareFindDeepLink(findQuery: "needle", matchIndex1Based: 30)

        // SwiftUI re-registers the same view on every update.
        control.registerCodeTextView(textView, plainText: text, baseAttributedText: base)

        XCTAssertEqual(control.activeMatchIndex, 30)
        XCTAssertEqual(textView.selectedRange, range(ofMatch: 30))
    }

    func testRefreshedTextKeepsTheActiveMatch() {
        let (control, textView, _) = makeCodeFind()
        control.prepareFindDeepLink(findQuery: "needle", matchIndex1Based: 12)

        control.registerCodeTextView(textView, plainText: text, baseAttributedText: NSAttributedString(string: text))

        XCTAssertEqual(control.activeMatchIndex, 12)
    }

    func testDeepLinkDoesNotFocusTheFindField() {
        let (control, _, _) = makeCodeFind()
        control.prepareFindDeepLink(findQuery: "needle", matchIndex1Based: 2)

        XCTAssertFalse(control.consumeFocusOnPresent())
        XCTAssertTrue(control.consumeFocusOnPresent(), "later opens from the toolbar focus the field")
    }

    /// Ranges come from the text itself. "İ" lowercases to two UTF-16 units, so ranges found in a lowercased copy
    /// drifted one unit per "İ", and the last one ran past the end of the text.
    func testCaseInsensitiveMatchRangesStayOnTheTextAfterDottedCapitalI() {
        let text = "İstanbul needle İzmir NEEDLE"
        let ns = text as NSString
        let ranges = FindOnPageControl.caseInsensitiveMatchRanges(in: text, query: "Needle")
        XCTAssertEqual(ranges.count, 2)
        for range in ranges {
            XCTAssertLessThanOrEqual(NSMaxRange(range), ns.length)
            XCTAssertEqual(ns.substring(with: range).lowercased(), "needle")
        }
        XCTAssertEqual(FindOnPageControl.caseInsensitiveMatchRanges(in: text, query: ""), [])
    }

    func testCodeFindAfterDottedCapitalISelectsTheMatch() {
        let text = "İİ needle"
        let control = FindOnPageControl()
        let textView = UITextView(frame: CGRect(x: 0, y: 0, width: 320, height: 200))
        control.registerCodeTextView(textView, plainText: text, baseAttributedText: NSAttributedString(string: text))
        control.prepareFindDeepLink(findQuery: "NEEDLE", matchIndex1Based: 1)
        XCTAssertEqual(control.matchCount, 1)
        XCTAssertEqual(textView.selectedRange, (text as NSString).range(of: "needle"))
    }
}
