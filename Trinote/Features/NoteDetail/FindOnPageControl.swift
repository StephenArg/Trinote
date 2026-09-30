import Foundation
import Observation
import UIKit
import WebKit

/// A heading in the read-only note, for the iPad table of contents.
struct NoteHeading: Identifiable, Equatable {
    /// Position among the page's h1–h6 elements; `FindOnPageControl.scrollToHeading(at:)` takes it.
    let index: Int
    let level: Int
    let text: String

    var id: Int { index }
}

/// Coordinates in-page find for read-only HTML (WKWebView) and code (UITextView) notes, and the iPad table of
/// contents (headings of the same web view).
@MainActor
@Observable
final class FindOnPageControl {
    var isPresented = false
    var query = ""
    /// Number of matches after the last successful search (0 if none or empty query).
    private(set) var matchCount = 0
    /// 1-based index of the active match for UI, or 0 when none.
    private(set) var activeMatchIndex = 0

    private weak var htmlWebView: WKWebView?
    private weak var codeTextView: UITextView?
    private var codePlainText: String = ""
    /// Syntax-highlighted (or plain) base text; find overlays only add background colors.
    private var codeBaseAttributedText: NSAttributedString = NSAttributedString()

    private var htmlSearchTask: Task<Void, Never>?
    /// After search completes, activate this 1-based match (e.g. from search results deep link).
    private var pendingJumpToMatch1Based: Int?
    /// Keeps a deep-linked match in view while the note is still laying out.
    private var matchScrollSettler: FindMatchScrollSettler?
    /// Whether the find bar should focus its field when it appears: not for a deep link, whose match the keyboard
    /// would cover.
    private(set) var focusesFieldOnPresent = true
    /// Bumped each time the read-only web view finishes loading a document, so the iPad table of contents
    /// re-reads its headings.
    private(set) var loadedHTMLDocumentCount = 0

    /// Opens the find bar with the given text and jumps to `matchIndex1Based` once matches are computed.
    func prepareFindDeepLink(findQuery: String, matchIndex1Based: Int) {
        let trimmed = findQuery.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, matchIndex1Based >= 1 else { return }
        query = trimmed
        pendingJumpToMatch1Based = matchIndex1Based
        focusesFieldOnPresent = false
        isPresented = true
        // The bar opens with this text already in it, so its field-change hook never runs: search now when the note's
        // view is there. A web view still loading runs it when it finishes (`reapplyHTMLSearchIfNeeded`).
        if codeTextView != nil {
            applyCodeQuery()
        } else if htmlWebView != nil {
            applyHTMLQueryDebounced(immediate: true)
        }
    }

    /// Called by the find bar when it appears; later opens (toolbar) focus the field again.
    func consumeFocusOnPresent() -> Bool {
        defer { focusesFieldOnPresent = true }
        return focusesFieldOnPresent
    }

    func registerHTMLWebView(_ webView: WKWebView) {
        htmlWebView = webView
        codeTextView = nil
        codePlainText = ""
        codeBaseAttributedText = NSAttributedString()
    }

    /// Called on every update of the code view; finds again only when the view or its text changed, keeping the
    /// active match (a refresh shouldn't send the reader back to match 1).
    func registerCodeTextView(_ textView: UITextView, plainText: String, baseAttributedText: NSAttributedString) {
        let changed = codeTextView !== textView
            || codeBaseAttributedText !== baseAttributedText
            || codePlainText != plainText
        codeTextView = textView
        codePlainText = plainText
        codeBaseAttributedText = baseAttributedText
        htmlWebView = nil
        if changed, !query.isEmpty {
            keepActiveMatchForNextSearch()
            applyCodeQuery()
        }
    }

    func unregisterAll() {
        htmlSearchTask?.cancel()
        if let wv = htmlWebView {
            wv.evaluateJavaScript("window.__trinoteFind && window.__trinoteFind.clear();", completionHandler: nil)
        }
        if let tv = codeTextView {
            tv.attributedText = codeBaseAttributedText
        }
        htmlWebView = nil
        codeTextView = nil
        codePlainText = ""
        codeBaseAttributedText = NSAttributedString()
        matchCount = 0
        activeMatchIndex = 0
        query = ""
        isPresented = false
        pendingJumpToMatch1Based = nil
        stopMatchScrollSettling()
    }

    /// Call after WebKit finishes loading document HTML so highlights can be restored (on the same match: the note
    /// reloads when fresher content arrives, and that shouldn't send the reader back to match 1).
    func reapplyHTMLSearchIfNeeded() {
        loadedHTMLDocumentCount += 1
        guard htmlWebView != nil, !query.isEmpty else { return }
        keepActiveMatchForNextSearch()
        applyHTMLQueryDebounced(immediate: true)
    }

    private func keepActiveMatchForNextSearch() {
        if pendingJumpToMatch1Based == nil, activeMatchIndex > 1 {
            pendingJumpToMatch1Based = activeMatchIndex
        }
    }

    func applyQueryFromFieldChange() {
        if htmlWebView != nil {
            // Clear highlights immediately when the field is empty; otherwise debounce typing.
            applyHTMLQueryDebounced(immediate: query.isEmpty)
        } else {
            applyCodeQuery()
        }
    }

    private func applyHTMLQueryDebounced(immediate: Bool) {
        htmlSearchTask?.cancel()
        let q = query
        if immediate {
            runHTMLSearch(query: q)
            return
        }
        htmlSearchTask = Task { [weak self] in
            try? await Task.sleep(nanoseconds: 180_000_000)
            guard !Task.isCancelled else { return }
            await MainActor.run {
                self?.runHTMLSearch(query: q)
            }
        }
    }

    private func runHTMLSearch(query q: String) {
        guard let wv = htmlWebView else {
            matchCount = 0
            activeMatchIndex = 0
            return
        }
        let escaped = Self.javascriptStringLiteral(q)
        let js = """
        (function(){
          if (!window.__trinoteFind) return { ready: false, count: 0, active: 0 };
          window.__trinoteFind.search(\(escaped));
          return { ready: true, count: window.__trinoteFind.matchCount(), active: window.__trinoteFind.active1Based() };
        })();
        """
        wv.evaluateJavaScript(js) { [weak self] result, _ in
            guard let self else { return }
            Task { @MainActor in
                let dict = result as? [String: Any]
                let ready = (dict?["ready"] as? NSNumber)?.boolValue ?? (dict?["ready"] as? Bool) ?? false
                guard ready else {
                    // The page isn't loaded yet: keep any deep-link jump for the search its load runs.
                    self.matchCount = 0
                    self.activeMatchIndex = 0
                    return
                }
                if let dict {
                    let count = (dict["count"] as? NSNumber)?.intValue ?? (dict["count"] as? Int) ?? 0
                    let active = (dict["active"] as? NSNumber)?.intValue ?? (dict["active"] as? Int) ?? 0
                    self.matchCount = count
                    self.activeMatchIndex = active > 0 ? active : (count > 0 ? 1 : 0)
                } else {
                    self.matchCount = 0
                    self.activeMatchIndex = 0
                }

                let jump = self.pendingJumpToMatch1Based
                if let j = jump, self.matchCount > 0 {
                    self.pendingJumpToMatch1Based = nil
                    let goJs = """
                    (function(){
                      if (!window.__trinoteFind || !window.__trinoteFind.goToMatch) return { count: 0, active: 0 };
                      window.__trinoteFind.goToMatch(\(j));
                      return { count: window.__trinoteFind.matchCount(), active: window.__trinoteFind.active1Based() };
                    })();
                    """
                    wv.evaluateJavaScript(goJs) { [weak self] r2, _ in
                        guard let self else { return }
                        Task { @MainActor in
                            if let d2 = r2 as? [String: Any] {
                                let c2 = (d2["count"] as? NSNumber)?.intValue ?? (d2["count"] as? Int) ?? self.matchCount
                                let a2 = (d2["active"] as? NSNumber)?.intValue ?? (d2["active"] as? Int) ?? 0
                                self.matchCount = c2
                                self.activeMatchIndex = a2
                            }
                            self.scrollHTMLActiveIntoOuterScroll(animated: false)
                            self.settleHTMLMatchScroll(in: wv)
                        }
                    }
                } else {
                    self.pendingJumpToMatch1Based = nil
                    self.scrollHTMLActiveIntoOuterScroll()
                }
            }
        }
    }

    private func applyCodeQuery() {
        guard let tv = codeTextView else {
            matchCount = 0
            activeMatchIndex = 0
            return
        }
        let full = codePlainText
        let q = query
        let attr = NSMutableAttributedString(attributedString: codeBaseAttributedText)
        // Ensure find works even if base attribution length drifted.
        if attr.string != full {
            let font = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
            attr.setAttributedString(NSAttributedString(
                string: full,
                attributes: [.font: font, .foregroundColor: UIColor.label]
            ))
        }
        let highlight = UIColor.systemYellow.withAlphaComponent(0.45)
        let activeHighlight = UIColor.systemOrange.withAlphaComponent(0.65)

        var ranges: [NSRange] = []
        if !q.isEmpty {
            let lowerFull = full.lowercased() as NSString
            let lowerQ = q.lowercased()
            var searchStart = 0
            while searchStart < lowerFull.length {
                let found = lowerFull.range(of: lowerQ, range: NSRange(location: searchStart, length: lowerFull.length - searchStart))
                if found.location == NSNotFound { break }
                ranges.append(found)
                searchStart = found.location + found.length
            }

            let jump = pendingJumpToMatch1Based
            pendingJumpToMatch1Based = nil
            let activeZero: Int
            if let j = jump, j >= 1, j <= ranges.count {
                activeZero = j - 1
            } else {
                activeZero = 0
            }

            for (i, r) in ranges.enumerated() {
                let color = i == activeZero ? activeHighlight : highlight
                attr.addAttribute(.backgroundColor, value: color, range: r)
            }

            matchCount = ranges.count
            activeMatchIndex = ranges.isEmpty ? 0 : activeZero + 1

            tv.attributedText = attr
            if activeZero < ranges.count {
                let activeRange = ranges[activeZero]
                tv.selectedRange = activeRange
                Self.scrollCodeMatchToCenter(tv, range: activeRange, animated: jump == nil)
                if jump != nil {
                    // A deep link lands before the text view is laid out; center again as it settles.
                    stopMatchScrollSettling()
                    matchScrollSettler = FindMatchScrollSettler(scrollView: tv) { [weak tv] in
                        guard let tv else { return }
                        Self.scrollCodeMatchToCenter(tv, range: activeRange, animated: false)
                    }
                }
            } else {
                tv.selectedRange = NSRange(location: 0, length: 0)
            }
        } else {
            pendingJumpToMatch1Based = nil
            tv.attributedText = attr
            tv.selectedRange = NSRange(location: 0, length: 0)
            matchCount = 0
            activeMatchIndex = 0
        }
    }

    func findNext() {
        stopMatchScrollSettling()
        if htmlWebView != nil {
            runHTMLStep(direction: 1)
        } else {
            stepCode(direction: 1)
        }
    }

    func findPrevious() {
        stopMatchScrollSettling()
        if htmlWebView != nil {
            runHTMLStep(direction: -1)
        } else {
            stepCode(direction: -1)
        }
    }

    private func runHTMLStep(direction: Int) {
        guard let wv = htmlWebView else { return }
        let js = """
        (function(){
          if (!window.__trinoteFind) return { count: 0, active: 0 };
          \(direction > 0 ? "window.__trinoteFind.next();" : "window.__trinoteFind.prev();")
          return { count: window.__trinoteFind.matchCount(), active: window.__trinoteFind.active1Based() };
        })();
        """
        wv.evaluateJavaScript(js) { [weak self] result, _ in
            guard let self else { return }
            Task { @MainActor in
                if let dict = result as? [String: Any] {
                    let count = (dict["count"] as? NSNumber)?.intValue ?? (dict["count"] as? Int) ?? 0
                    let active = (dict["active"] as? NSNumber)?.intValue ?? (dict["active"] as? Int) ?? 0
                    self.matchCount = count
                    self.activeMatchIndex = active
                }
                self.scrollHTMLActiveIntoOuterScroll()
            }
        }
    }

    /// After a deep-link jump the note is still laying out: the web view reports its full height after loading, and
    /// images and math render later, so the first scroll lands short (clamped to the content laid out so far). Centers
    /// the match again whenever the outer scroll view's content changes size, until the user scrolls.
    private func settleHTMLMatchScroll(in webView: WKWebView) {
        stopMatchScrollSettling()
        guard let outer = Self.outerScrollView(for: webView) else { return }
        matchScrollSettler = FindMatchScrollSettler(scrollView: outer) { [weak self] in
            self?.scrollHTMLActiveIntoOuterScroll(animated: false)
        }
    }

    private func stopMatchScrollSettling() {
        matchScrollSettler?.stop()
        matchScrollSettler = nil
    }

    private func scrollHTMLActiveIntoOuterScroll(animated: Bool = true) {
        guard let wv = htmlWebView else { return }
        let js = """
        (function(){
          if (!window.__trinoteFind || !window.__trinoteFind.activeRectInViewport) return null;
          return window.__trinoteFind.activeRectInViewport();
        })();
        """
        wv.evaluateJavaScript(js) { result, _ in
            guard let dict = result as? [String: Any] else { return }
            let top = Self.cgFloat(from: dict["top"]) ?? 0
            let left = Self.cgFloat(from: dict["left"]) ?? 0
            let width = Self.cgFloat(from: dict["width"]) ?? 0
            let height = Self.cgFloat(from: dict["height"]) ?? 0
            let rect = CGRect(x: left, y: top, width: max(width, 1), height: max(height, 1))
            Task { @MainActor in
                Self.scrollOuterScrollViewToCenterMatch(for: wv, matchRectInWebView: rect, animated: animated)
            }
        }
    }

    // MARK: - Table of contents (iPad note inspector)

    /// Headings of the read-only HTML note in document order, as rendered (includes expanded included notes).
    func readHeadings(completion: @escaping ([NoteHeading]) -> Void) {
        guard let wv = htmlWebView else {
            completion([])
            return
        }
        let js = """
        (function(){
          return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(function(h){
            return [parseInt(h.tagName.substring(1), 10), (h.innerText || h.textContent || '').trim()];
          });
        })();
        """
        wv.evaluateJavaScript(js) { result, _ in
            let rows = result as? [[Any]] ?? []
            let headings = rows.enumerated().compactMap { index, row -> NoteHeading? in
                guard row.count == 2,
                      let level = (row[0] as? NSNumber)?.intValue,
                      let text = row[1] as? String,
                      !text.isEmpty
                else { return nil }
                return NoteHeading(index: index, level: level, text: text)
            }
            Task { @MainActor in completion(headings) }
        }
    }

    /// Scrolls the note so heading `index` (from `readHeadings`) sits at the top of the visible area.
    func scrollToHeading(at index: Int) {
        guard let wv = htmlWebView else { return }
        let js = """
        (function(){
          var h = document.querySelectorAll('h1,h2,h3,h4,h5,h6')[\(index)];
          if (!h) return null;
          var r = h.getBoundingClientRect();
          return { top: r.top, left: r.left, width: r.width, height: r.height };
        })();
        """
        wv.evaluateJavaScript(js) { result, _ in
            guard let dict = result as? [String: Any] else { return }
            let top = Self.cgFloat(from: dict["top"]) ?? 0
            Task { @MainActor in
                Self.scrollOuterScrollView(for: wv, toShowTopOf: top)
            }
        }
    }

    /// Puts web-view point `y` just below the navigation bar in the note's outer scroll view.
    static func scrollOuterScrollView(for webView: WKWebView, toShowTopOf y: CGFloat) {
        guard let sv = outerScrollView(for: webView) else { return }
        let point = webView.convert(CGPoint(x: 0, y: y), to: sv)
        let inset = sv.adjustedContentInset
        let margin: CGFloat = 12
        let minY = -inset.top
        let maxY = max(minY, sv.contentSize.height - sv.bounds.height + inset.bottom)
        let target = min(max(point.y - inset.top - margin, minY), maxY)
        sv.setContentOffset(CGPoint(x: sv.contentOffset.x, y: target), animated: true)
    }

    private static func cgFloat(from value: Any?) -> CGFloat? {
        if let n = value as? CGFloat { return n }
        if let n = value as? Double { return CGFloat(n) }
        if let n = value as? NSNumber { return CGFloat(truncating: n) }
        return nil
    }

    /// The first scroll view around the web view (the note's SwiftUI `ScrollView`), not its own.
    private static func outerScrollView(for webView: WKWebView) -> UIScrollView? {
        var v: UIView? = webView.superview
        while let view = v {
            if let sv = view as? UIScrollView, sv !== webView.scrollView { return sv }
            v = view.superview
        }
        return nil
    }

    /// Scrolls the note's outer scroll view so the match sits in the middle of the visible area (below the navigation
    /// bar, above the find bar), or its top edge when it's taller than that.
    private static func scrollOuterScrollViewToCenterMatch(for webView: WKWebView, matchRectInWebView: CGRect, animated: Bool) {
        guard let sv = outerScrollView(for: webView) else { return }
        let r = webView.convert(matchRectInWebView, to: sv)
        let inset = sv.adjustedContentInset
        let visibleH = max(1, sv.bounds.height - inset.top - inset.bottom)

        // An offset of `y` shows content from `y + inset.top` down.
        var y = r.height >= visibleH - 2
            ? r.minY - inset.top
            : r.midY - visibleH / 2 - inset.top
        let minY = -inset.top
        let maxY = max(minY, sv.contentSize.height - sv.bounds.height + inset.bottom)
        y = min(max(y, minY), maxY)

        guard abs(sv.contentOffset.y - y) > 0.5 else { return }
        sv.setContentOffset(CGPoint(x: sv.contentOffset.x, y: y), animated: animated)
    }

    private func stepCode(direction: Int) {
        guard let tv = codeTextView, !query.isEmpty else { return }
        let lowerFull = (codePlainText.lowercased()) as NSString
        let lowerQ = query.lowercased()
        var ranges: [NSRange] = []
        var searchStart = 0
        while searchStart < lowerFull.length {
            let found = lowerFull.range(of: lowerQ, range: NSRange(location: searchStart, length: lowerFull.length - searchStart))
            if found.location == NSNotFound { break }
            ranges.append(found)
            searchStart = found.location + found.length
        }
        guard !ranges.isEmpty else { return }

        let current = max(0, activeMatchIndex - 1)
        let next = (current + direction) % ranges.count
        let idx = next < 0 ? next + ranges.count : next
        activeMatchIndex = idx + 1

        let attr = NSMutableAttributedString(attributedString: codeBaseAttributedText)
        if attr.string != codePlainText {
            let baseFont = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
            attr.setAttributedString(NSAttributedString(
                string: codePlainText,
                attributes: [.font: baseFont, .foregroundColor: UIColor.label]
            ))
        }
        let highlight = UIColor.systemYellow.withAlphaComponent(0.45)
        let activeHighlight = UIColor.systemOrange.withAlphaComponent(0.65)
        for (i, r) in ranges.enumerated() {
            let color = i == idx ? activeHighlight : highlight
            attr.addAttribute(.backgroundColor, value: color, range: r)
        }
        tv.attributedText = attr
        let activeRange = ranges[idx]
        tv.selectedRange = activeRange
        Self.scrollCodeMatchToCenter(tv, range: activeRange)
    }

    /// Vertically center the glyph range in the code `UITextView` when possible; clamp so the range stays visible.
    private static func scrollCodeMatchToCenter(_ textView: UITextView, range: NSRange, animated: Bool = true) {
        textView.layoutIfNeeded()
        let lm = textView.layoutManager
        let tc = textView.textContainer
        let glyphRange = lm.glyphRange(forCharacterRange: range, actualCharacterRange: nil)
        var rect = lm.boundingRect(forGlyphRange: glyphRange, in: tc)
        rect.origin.x += textView.textContainerInset.left
        rect.origin.y += textView.textContainerInset.top

        let topInset = textView.adjustedContentInset.top
        let bottomInset = textView.adjustedContentInset.bottom
        let visibleH = max(1, textView.bounds.height - topInset - bottomInset)

        var targetY = rect.midY - visibleH / 2
        if rect.height >= visibleH - 2 {
            targetY = rect.minY
        }

        let minY: CGFloat = 0
        let maxY = max(minY, textView.contentSize.height - textView.bounds.height)
        targetY = max(minY, min(targetY, maxY))

        var y = targetY
        if rect.maxY > y + visibleH {
            y += rect.maxY - (y + visibleH)
        }
        if rect.minY < y {
            y = rect.minY
        }
        y = max(minY, min(y, maxY))

        guard abs(textView.contentOffset.y - y) > 0.5 else { return }
        textView.setContentOffset(CGPoint(x: textView.contentOffset.x, y: y), animated: animated)
    }

    func clearHighlights() {
        htmlSearchTask?.cancel()
        pendingJumpToMatch1Based = nil
        stopMatchScrollSettling()
        query = ""
        matchCount = 0
        activeMatchIndex = 0
        if let wv = htmlWebView {
            wv.evaluateJavaScript("window.__trinoteFind && window.__trinoteFind.clear();", completionHandler: nil)
        }
        if let tv = codeTextView {
            tv.attributedText = codeBaseAttributedText
            tv.selectedRange = NSRange(location: 0, length: 0)
        }
    }

    func close() {
        isPresented = false
        clearHighlights()
    }

    /// Escape a Swift string as a JS single-quoted literal (handles Unicode).
    private static func javascriptStringLiteral(_ s: String) -> String {
        var out = "'"
        for ch in s.unicodeScalars {
            switch ch.value {
            case 0x5C: out += "\\\\" // backslash
            case 0x27: out += "\\'" // apostrophe
            case 0x0A: out += "\\n"
            case 0x0D: out += "\\r"
            case 0x2028: out += "\\u2028"
            case 0x2029: out += "\\u2029"
            default:
                if ch.value < 32 {
                    out += String(format: "\\u%04x", ch.value)
                } else {
                    out.unicodeScalars.append(ch)
                }
            }
        }
        out += "'"
        return out
    }
}

/// Keeps a find match in view while the note around it is still laying out. Calls `recenter` after each change to the
/// scroll view's content size or bounds (debounced), until the user drags it or a few seconds pass. The owner calls
/// `stop()` when it's replaced.
@MainActor
private final class FindMatchScrollSettler {
    private let recenter: () -> Void
    private var observations: [NSKeyValueObservation] = []
    private var recenterTask: Task<Void, Never>?
    private var giveUpTask: Task<Void, Never>?

    private static let debounce: Duration = .milliseconds(100)
    private static let maxDuration: Duration = .seconds(4)

    init(scrollView: UIScrollView, recenter: @escaping () -> Void) {
        self.recenter = recenter
        // UIKit changes these on the main thread, so the handlers run there.
        observations = [
            scrollView.observe(\.contentSize, options: [.new]) { [weak self] _, _ in
                MainActor.assumeIsolated { self?.layoutChanged() }
            },
            scrollView.observe(\.bounds, options: [.new]) { [weak self] _, _ in
                MainActor.assumeIsolated { self?.layoutChanged() }
            },
            // A drag means the user has taken over.
            scrollView.observe(\.contentOffset, options: [.new]) { [weak self] scrollView, _ in
                MainActor.assumeIsolated {
                    guard scrollView.isTracking || scrollView.isDragging else { return }
                    // Not from inside the observation's own handler.
                    Task { self?.stop() }
                }
            },
        ]
        giveUpTask = Task { [weak self] in
            try? await Task.sleep(for: Self.maxDuration)
            guard !Task.isCancelled else { return }
            self?.stop()
        }
    }

    private func layoutChanged() {
        guard !observations.isEmpty else { return }
        recenterTask?.cancel()
        recenterTask = Task { [weak self] in
            try? await Task.sleep(for: Self.debounce)
            guard !Task.isCancelled, let self, !self.observations.isEmpty else { return }
            self.recenter()
        }
    }

    func stop() {
        observations.forEach { $0.invalidate() }
        observations = []
        recenterTask?.cancel()
        recenterTask = nil
        giveUpTask?.cancel()
        giveUpTask = nil
    }
}
