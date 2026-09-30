import UIKit
import WebKit

/// Where the read-only web view sits inside the space reserved for the note body.
///
/// The note body reserves its full document height in the note's outer `ScrollView`. A web view that
/// tall makes WebKit paint and composite the whole document (it treats its own frame as the viewport),
/// which stutters on older iPhones. Instead a screen-sized web view is pinned over the visible part of
/// that space and its own page is scrolled to match, so WebKit only paints what's on screen — the way
/// the editor's self-scrolling web view does.
enum ReadOnlyWebViewport {
    struct Layout: Equatable {
        /// The web view's `frame.minY` in the container.
        var frameY: CGFloat
        var frameHeight: CGFloat
        /// The web view's own `scrollView.contentOffset.y`; always equals `frameY`, so a point in the web
        /// view's viewport maps to the same document point it did when the web view was full height.
        var innerOffsetY: CGFloat
        var pinned: Bool
    }

    /// - Parameters:
    ///   - containerHeight: Height reserved for the note body (the document's height).
    ///   - visibleMinY: Top of the outer scroll view's visible area in container coordinates (negative
    ///     while the note's header is on screen).
    ///   - viewportHeight: Height of the outer scroll view, or nil when there isn't one.
    static func layout(containerHeight: CGFloat, visibleMinY: CGFloat, viewportHeight: CGFloat?) -> Layout {
        let height = max(containerHeight, 0)
        guard let viewportHeight, viewportHeight > 0, height > viewportHeight else {
            return Layout(frameY: 0, frameHeight: height, innerOffsetY: 0, pinned: false)
        }
        let maxY = height - viewportHeight
        // Not rounded: a whole-point frame would leave a sliver of the visible area uncovered.
        let y = min(max(visibleMinY, 0), maxY)
        return Layout(frameY: y, frameHeight: viewportHeight, innerOffsetY: y, pinned: true)
    }
}

/// Hosts the read-only `WKWebView` and keeps it pinned over the visible part of the note body
/// (see `ReadOnlyWebViewport`). Falls back to a full-size web view when there's no enclosing scroll view
/// or the note fits on screen.
final class ReadOnlyWebViewportContainer: UIView {
    let webView: WKWebView
    /// The container is as tall as the page will be (a remembered height, or one the page reported after loading),
    /// not a placeholder, so a scroll position can be applied now.
    var hasKnownHeight = false

    private weak var outerScrollView: UIScrollView?
    private var outerOffsetObservation: NSKeyValueObservation?
    private var outerBoundsObservation: NSKeyValueObservation?
    private var outerContentSizeObservation: NSKeyValueObservation?
    private var innerOffsetObservation: NSKeyValueObservation?
    private var isApplyingLayout = false
    private var currentLayout: ReadOnlyWebViewport.Layout?
    /// TEMP (`NoteOpenTrace`).
    private var innerRestoreCount = 0

    init(webView: WKWebView) {
        self.webView = webView
        super.init(frame: .zero)
        backgroundColor = .clear
        webView.scrollView.showsVerticalScrollIndicator = false
        webView.scrollView.showsHorizontalScrollIndicator = false
        addSubview(webView)
        innerOffsetObservation = webView.scrollView.observe(\.contentOffset, options: [.new]) { [weak self] _, _ in
            // WebKit moved its own page (text-selection autoscroll, a layout pass): put it back so the
            // viewport keeps showing the part of the note under the web view's frame.
            MainActor.assumeIsolated { self?.restoreInnerOffsetIfNeeded() }
        }
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    override func didMoveToWindow() {
        super.didMoveToWindow()
        // Off screen (a linked note pushed on top): keep the pinned layout. Growing the web view to the note's
        // full height would make WebKit lay the page out again on the way out and again on the way back.
        guard window != nil else { return }
        attachToOuterScrollView()
        applyLayout()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        applyLayout()
    }

    /// Re-applies the inner offset after the document changed height (images decoding, a reload).
    func resync() {
        currentLayout = nil
        applyLayout()
    }

    private func attachToOuterScrollView() {
        let found = Self.findEnclosingScrollView(from: self)
        guard found !== outerScrollView else { return }
        outerOffsetObservation?.invalidate()
        outerBoundsObservation?.invalidate()
        outerContentSizeObservation?.invalidate()
        outerOffsetObservation = nil
        outerBoundsObservation = nil
        outerContentSizeObservation = nil
        outerScrollView = found
        guard let found else { return }
        // Synchronous KVO (no async hop): the web view has to move in the same frame the note scrolls.
        outerOffsetObservation = found.observe(\.contentOffset, options: [.new]) { [weak self] _, _ in
            MainActor.assumeIsolated { self?.applyLayout() }
        }
        outerBoundsObservation = found.observe(\.bounds, options: [.new]) { [weak self] _, _ in
            MainActor.assumeIsolated { self?.applyLayout() }
        }
        // Something above the note body changed height (a banner, the journal's edited-notes list loading, the
        // title wrapping): the body moved inside the scroll view without the scroll offset changing. The move
        // lands in the same layout pass, after this fires, so lay out then.
        outerContentSizeObservation = found.observe(\.contentSize, options: [.new]) { [weak self] _, _ in
            MainActor.assumeIsolated {
                guard let self else { return }
                self.setNeedsLayout()
                DispatchQueue.main.async { [weak self] in self?.applyLayout() }
            }
        }
    }

    private func applyLayout() {
        // See `didMoveToWindow`; the first layout still happens off screen so the web view has a size.
        guard window != nil || currentLayout == nil else { return }
        let viewportHeight: CGFloat?
        let visibleMinY: CGFloat
        if let sv = outerScrollView, sv.window != nil {
            viewportHeight = sv.bounds.height
            visibleMinY = convert(sv.bounds.origin, from: sv).y
        } else {
            viewportHeight = nil
            visibleMinY = 0
        }
        let layout = ReadOnlyWebViewport.layout(
            containerHeight: bounds.height,
            visibleMinY: visibleMinY,
            viewportHeight: viewportHeight
        )
        let frame = CGRect(x: 0, y: layout.frameY, width: bounds.width, height: layout.frameHeight)
        guard layout != currentLayout || webView.frame != frame else { return }
        if layout.pinned != currentLayout?.pinned || layout.frameHeight != currentLayout?.frameHeight {
            NoteOpenTrace.log(
                "viewport pinned=\(layout.pinned) webH=\(layout.frameHeight) containerH=\(bounds.height) viewportH=\(viewportHeight.map { "\($0)" } ?? "none") y=\(layout.frameY) inWindow=\(window != nil)"
            )
        }
        currentLayout = layout
        isApplyingLayout = true
        defer { isApplyingLayout = false }
        if webView.frame != frame {
            webView.frame = frame
        }
        let inner = webView.scrollView
        if abs(inner.contentOffset.y - layout.innerOffsetY) > 0.25 || inner.contentOffset.x != 0 {
            inner.contentOffset = CGPoint(x: 0, y: layout.innerOffsetY)
        }
    }

    private func restoreInnerOffsetIfNeeded() {
        guard !isApplyingLayout, let layout = currentLayout else { return }
        let inner = webView.scrollView
        guard abs(inner.contentOffset.y - layout.innerOffsetY) > 0.25 || inner.contentOffset.x != 0 else { return }
        innerRestoreCount += 1
        if innerRestoreCount <= 30 {
            NoteOpenTrace.log(
                "viewport WebKit moved page to \(inner.contentOffset.y), restoring \(layout.innerOffsetY) (innerContentH=\(inner.contentSize.height) #\(innerRestoreCount))"
            )
        }
        isApplyingLayout = true
        inner.contentOffset = CGPoint(x: 0, y: layout.innerOffsetY)
        isApplyingLayout = false
    }

    private static func findEnclosingScrollView(from view: UIView) -> UIScrollView? {
        var current = view.superview
        while let c = current {
            if let sv = c as? UIScrollView { return sv }
            current = c.superview
        }
        return nil
    }
}
