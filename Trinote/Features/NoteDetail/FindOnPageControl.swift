import Foundation
import Observation
import UIKit
import WebKit

/// Coordinates in-page find for read-only HTML (WKWebView) and code (UITextView) notes.
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

    private var htmlSearchTask: Task<Void, Never>?

    func registerHTMLWebView(_ webView: WKWebView) {
        htmlWebView = webView
        codeTextView = nil
        codePlainText = ""
    }

    func registerCodeTextView(_ textView: UITextView, plainText: String) {
        codeTextView = textView
        codePlainText = plainText
        htmlWebView = nil
    }

    func unregisterAll() {
        htmlSearchTask?.cancel()
        if let wv = htmlWebView {
            wv.evaluateJavaScript("window.__trinoteFind && window.__trinoteFind.clear();", completionHandler: nil)
        }
        if let tv = codeTextView {
            let font = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
            tv.attributedText = NSAttributedString(
                string: codePlainText,
                attributes: [.font: font, .foregroundColor: UIColor.label]
            )
        }
        htmlWebView = nil
        codeTextView = nil
        codePlainText = ""
        matchCount = 0
        activeMatchIndex = 0
        query = ""
        isPresented = false
    }

    /// Call after WebKit finishes loading document HTML so highlights can be restored.
    func reapplyHTMLSearchIfNeeded() {
        guard htmlWebView != nil, !query.isEmpty else { return }
        applyHTMLQueryDebounced(immediate: true)
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
          if (!window.__trinoteFind) return { count: 0, active: 0 };
          window.__trinoteFind.search(\(escaped));
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
                    self.activeMatchIndex = active > 0 ? active : (count > 0 ? 1 : 0)
                } else {
                    self.matchCount = 0
                    self.activeMatchIndex = 0
                }
                self.scrollHTMLActiveIntoOuterScroll()
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
        let baseFont = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
        let attr = NSMutableAttributedString(
            string: full,
            attributes: [
                .font: baseFont,
                .foregroundColor: UIColor.label
            ]
        )
        let highlight = UIColor.systemYellow.withAlphaComponent(0.45)
        let activeHighlight = UIColor.systemOrange.withAlphaComponent(0.65)

        var ranges: [NSRange] = []
        if !q.isEmpty {
            let nsFull = full as NSString
            let lowerFull = full.lowercased() as NSString
            let lowerQ = q.lowercased()
            var searchStart = 0
            while searchStart < lowerFull.length {
                let found = lowerFull.range(of: lowerQ, range: NSRange(location: searchStart, length: lowerFull.length - searchStart))
                if found.location == NSNotFound { break }
                ranges.append(found)
                searchStart = found.location + found.length
            }
            for (i, r) in ranges.enumerated() {
                let color = (i == 0) ? activeHighlight : highlight
                attr.addAttribute(.backgroundColor, value: color, range: r)
            }
        }

        tv.attributedText = attr
        matchCount = ranges.count
        activeMatchIndex = ranges.isEmpty ? 0 : 1

        if let first = ranges.first {
            tv.selectedRange = first
            Self.scrollCodeMatchToCenter(tv, range: first)
        } else {
            tv.selectedRange = NSRange(location: 0, length: 0)
        }
    }

    func findNext() {
        if htmlWebView != nil {
            runHTMLStep(direction: 1)
        } else {
            stepCode(direction: 1)
        }
    }

    func findPrevious() {
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

    private func scrollHTMLActiveIntoOuterScroll() {
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
                Self.scrollOuterScrollViewToCenterMatch(for: wv, matchRectInWebView: rect)
            }
        }
    }

    private static func cgFloat(from value: Any?) -> CGFloat? {
        if let n = value as? CGFloat { return n }
        if let n = value as? Double { return CGFloat(n) }
        if let n = value as? NSNumber { return CGFloat(truncating: n) }
        return nil
    }

    /// Scroll the first outer `UIScrollView` (e.g. SwiftUI `ScrollView`) to vertically center the match when possible, then nudge so the full match stays visible.
    private static func scrollOuterScrollViewToCenterMatch(for webView: WKWebView, matchRectInWebView: CGRect) {
        var v: UIView? = webView.superview
        while let view = v {
            if let sv = view as? UIScrollView, sv !== webView.scrollView {
                let r = webView.convert(matchRectInWebView, to: sv)
                let topInset = sv.adjustedContentInset.top
                let bottomInset = sv.adjustedContentInset.bottom
                let visibleH = max(1, sv.bounds.height - topInset - bottomInset)

                // `r` is in scroll content coordinates; `contentOffset.y` is the top of the visible slice.
                var targetY = r.midY - visibleH / 2

                if r.height >= visibleH - 2 {
                    targetY = r.minY
                }

                let minY: CGFloat = 0
                let maxY = max(minY, sv.contentSize.height - sv.bounds.height)
                targetY = max(minY, min(targetY, maxY))

                // Nudge so the entire match rect lies in [y, y + visibleH], then clamp.
                var y = targetY
                if r.maxY > y + visibleH {
                    y += r.maxY - (y + visibleH)
                }
                if r.minY < y {
                    y = r.minY
                }
                y = max(minY, min(y, maxY))

                sv.setContentOffset(CGPoint(x: sv.contentOffset.x, y: y), animated: true)
                return
            }
            v = view.superview
        }
    }

    private func stepCode(direction: Int) {
        guard let tv = codeTextView, !query.isEmpty else { return }
        let full = codePlainText as NSString
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

        let baseFont = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
        let attr = NSMutableAttributedString(
            string: codePlainText,
            attributes: [
                .font: baseFont,
                .foregroundColor: UIColor.label
            ]
        )
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
    private static func scrollCodeMatchToCenter(_ textView: UITextView, range: NSRange) {
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

        textView.setContentOffset(CGPoint(x: textView.contentOffset.x, y: y), animated: true)
    }

    func clearHighlights() {
        htmlSearchTask?.cancel()
        query = ""
        matchCount = 0
        activeMatchIndex = 0
        if let wv = htmlWebView {
            wv.evaluateJavaScript("window.__trinoteFind && window.__trinoteFind.clear();", completionHandler: nil)
        }
        if let tv = codeTextView {
            let baseFont = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
            tv.attributedText = NSAttributedString(
                string: codePlainText,
                attributes: [
                    .font: baseFont,
                    .foregroundColor: UIColor.label
                ]
            )
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
