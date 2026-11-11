import SwiftUI
import WebKit

/// How a Markdown note shows: its source, the rendered preview, or both at once.
enum MarkdownViewMode: String, CaseIterable, Identifiable {
    case source
    case split
    case preview

    var id: String { rawValue }

    /// Reading a note offers all three; the editor offers the source alone or with the preview beside it.
    static let readingModes: [MarkdownViewMode] = [.source, .split, .preview]
    static let editingModes: [MarkdownViewMode] = [.source, .split]

    var title: String {
        switch self {
        case .source:
            String(localized: "Source", comment: "Markdown note view: the raw text")
        case .split:
            String(localized: "Split", comment: "Markdown note view: the raw text and the rendered preview together")
        case .preview:
            String(localized: "Preview", comment: "Markdown note view: the rendered text")
        }
    }

    /// A stored choice, or `fallback` for a missing or unknown one (or one this place doesn't offer).
    static func stored(_ raw: String, offering modes: [MarkdownViewMode], fallback: MarkdownViewMode) -> MarkdownViewMode {
        guard let mode = MarkdownViewMode(rawValue: raw), modes.contains(mode) else { return fallback }
        return mode
    }
}

/// The segmented control that switches a Markdown note's view.
struct MarkdownViewModePicker: View {
    @Binding var mode: MarkdownViewMode
    let modes: [MarkdownViewMode]

    var body: some View {
        Picker(String(localized: "Markdown View", comment: "Accessibility: the control that switches how a Markdown note shows"), selection: $mode) {
            ForEach(modes) { mode in
                Text(mode.title).tag(mode)
            }
        }
        .pickerStyle(.segmented)
        .labelsHidden()
    }
}

/// A Markdown note's source above its preview, each exactly half the height, on every device. Each pane scrolls on its
/// own, and scrolling one takes the other to the same point (see `MarkdownScrollSync`).
struct MarkdownSplitLayout<Source: View, Preview: View>: View {
    private let source: Source
    private let preview: Preview
    @State private var sync: MarkdownScrollSync

    /// - Parameter sourceScrollsItself: The source is an editor, which scrolls by itself to keep the caret in sight; the
    ///   preview follows that too.
    init(sourceScrollsItself: Bool, @ViewBuilder source: () -> Source, @ViewBuilder preview: () -> Preview) {
        self.source = source()
        self.preview = preview()
        _sync = State(initialValue: MarkdownScrollSync(sourceScrollsItself: sourceScrollsItself))
    }

    var body: some View {
        GeometryReader { geometry in
            let half = max(0, (geometry.size.height - 1) / 2)
            VStack(spacing: 0) {
                source
                    .frame(width: geometry.size.width, height: half)
                    .background(MarkdownScrollProbe(sync: sync, pane: .source))
                Divider()
                preview
                    .frame(width: geometry.size.width, height: half)
                    .background(MarkdownScrollProbe(sync: sync, pane: .preview))
            }
        }
    }
}

/// Keeps the two panes of a Markdown split showing the same part of the note. Each block the preview draws (a paragraph,
/// heading, list item, table row…) is marked with the Markdown line it starts on, so the panes are lined up block by
/// block: when a block reaches the top of one pane, it's at the top of the other, and between blocks the other pane moves
/// faster or slower to keep it so. Both panes' ends line up too. Until the blocks are measured (and for a code note,
/// which has none) the panes are matched by how far along each is. Only a scroll the user makes is followed (and, in
/// the editor, the editor's own scrolling to the caret), so the two never chase each other.
@MainActor
final class MarkdownScrollSync {
    enum Pane {
        case source
        case preview
    }

    /// A block both panes show: where it starts in each, from the top of the pane's content.
    struct Anchor: Equatable {
        var source: CGFloat
        var preview: CGFloat
    }

    private let sourceScrollsItself: Bool
    private weak var sourceView: UIScrollView?
    private weak var previewView: UIScrollView?
    private var sourceObservations: [NSKeyValueObservation] = []
    private var previewObservations: [NSKeyValueObservation] = []
    nonisolated(unsafe) private var textObserver: NSObjectProtocol?
    private var isApplying = false
    /// The pane last scrolled; when either pane's length changes, the other is put back in step with it.
    private var leader: Pane = .source
    /// The marked blocks, measured in both panes.
    private(set) var anchors: [Anchor] = []
    private var anchorRefresh: DispatchWorkItem?

    init(sourceScrollsItself: Bool) {
        self.sourceScrollsItself = sourceScrollsItself
    }

    deinit {
        if let textObserver { NotificationCenter.default.removeObserver(textObserver) }
    }

    func attach(_ scrollView: UIScrollView, as pane: Pane) {
        guard self.scrollView(pane) !== scrollView else { return }
        let observations = [
            scrollView.observe(\.contentOffset, options: [.new]) { [weak self] _, _ in
                MainActor.assumeIsolated { self?.offsetChanged(pane) }
            },
            scrollView.observe(\.contentSize, options: [.new]) { [weak self] _, _ in
                MainActor.assumeIsolated {
                    self?.lengthChanged()
                    self?.scheduleAnchorRefresh()
                }
            },
            // Scrolling moves the bounds too; only a new size (the keyboard, a rotation) counts here.
            scrollView.observe(\.bounds, options: [.old, .new]) { [weak self] _, change in
                guard change.oldValue?.size != change.newValue?.size else { return }
                MainActor.assumeIsolated {
                    self?.lengthChanged()
                    self?.scheduleAnchorRefresh()
                }
            },
        ]
        switch pane {
        case .source:
            sourceObservations.forEach { $0.invalidate() }
            sourceView = scrollView
            sourceObservations = observations
            if let textObserver { NotificationCenter.default.removeObserver(textObserver) }
            // Typing moves the blocks in the source.
            textObserver = NotificationCenter.default.addObserver(
                forName: UITextView.textDidChangeNotification, object: scrollView, queue: .main
            ) { [weak self] _ in
                MainActor.assumeIsolated { self?.scheduleAnchorRefresh() }
            }
        case .preview:
            previewObservations.forEach { $0.invalidate() }
            previewView = scrollView
            previewObservations = observations
        }
        lengthChanged()
        scheduleAnchorRefresh()
    }

    private func scrollView(_ pane: Pane) -> UIScrollView? {
        pane == .source ? sourceView : previewView
    }

    private func offsetChanged(_ pane: Pane) {
        guard !isApplying, let moved = scrollView(pane), let other = scrollView(pane == .source ? .preview : .source) else { return }
        let byUser = moved.isTracking || moved.isDragging || moved.isDecelerating
        guard byUser || (pane == .source && sourceScrollsItself) else { return }
        leader = pane
        follow(moved, as: pane, with: other)
    }

    private func lengthChanged() {
        guard !isApplying, let leading = scrollView(leader), let following = scrollView(leader == .source ? .preview : .source) else { return }
        follow(leading, as: leader, with: following)
    }

    /// Scrolls `following` to show what `leading` shows at its top.
    private func follow(_ leading: UIScrollView, as pane: Pane, with following: UIScrollView) {
        let leadingRange = Self.scrollRange(of: leading)
        let followingRange = Self.scrollRange(of: following)
        guard followingRange.range > 0 else { return }
        let points = Self.alignment(
            anchors,
            sourceRange: pane == .source ? leadingRange.range : followingRange.range,
            previewRange: pane == .source ? followingRange.range : leadingRange.range
        )
        let pairs = pane == .source ? points.map { ($0.source, $0.preview) } : points.map { ($0.preview, $0.source) }
        let shown = Self.interpolate(leading.contentOffset.y - leadingRange.top, through: pairs)
        let y = followingRange.top + min(max(shown, 0), followingRange.range)
        guard abs(following.contentOffset.y - y) > 0.5 else { return }
        isApplying = true
        defer { isApplying = false }
        following.setContentOffset(CGPoint(x: following.contentOffset.x, y: y), animated: false)
    }

    // MARK: Lining up

    /// Where scrolling starts and how far it can go, counting the insets (the editor keeps room under its text).
    static func scrollRange(of scrollView: UIScrollView) -> (top: CGFloat, range: CGFloat) {
        let top = -scrollView.adjustedContentInset.top
        let bottom = scrollView.contentSize.height + scrollView.adjustedContentInset.bottom - scrollView.bounds.height
        return (top, max(0, bottom - top))
    }

    /// How far along `scrollView` is, from 0 at the top to 1 at the end.
    static func fraction(of scrollView: UIScrollView) -> CGFloat {
        let (top, range) = scrollRange(of: scrollView)
        guard range > 0 else { return 0 }
        return min(max((scrollView.contentOffset.y - top) / range, 0), 1)
    }

    /// The points the panes are lined up by, in how far each has scrolled: both tops, each block that can reach the top
    /// of both panes, and both ends. A block out of order with the ones before it (a wrapped table cell, an image still
    /// loading) is left out, so scrolling one pane never moves the other backwards.
    static func alignment(_ anchors: [Anchor], sourceRange: CGFloat, previewRange: CGFloat) -> [Anchor] {
        var points = [Anchor(source: 0, preview: 0)]
        for anchor in anchors.sorted(by: { $0.source < $1.source }) {
            guard anchor.source < sourceRange - 1, anchor.preview < previewRange - 1,
                  let last = points.last, anchor.source > last.source + 1, anchor.preview > last.preview + 1 else { continue }
            points.append(anchor)
        }
        if let last = points.last, sourceRange > last.source, previewRange > last.preview {
            points.append(Anchor(source: sourceRange, preview: previewRange))
        }
        return points
    }

    /// `x` carried along the straight segments between `points` (each `(x, y)`, rising in both).
    static func interpolate(_ x: CGFloat, through points: [(CGFloat, CGFloat)]) -> CGFloat {
        guard let first = points.first, let last = points.last else { return x }
        if x <= first.0 { return first.1 }
        if x >= last.0 { return last.1 }
        for index in 1..<points.count where x <= points[index].0 {
            let (x0, y0) = points[index - 1]
            let (x1, y1) = points[index]
            guard x1 > x0 else { return y1 }
            return y0 + (x - x0) * (y1 - y0) / (x1 - x0)
        }
        return last.1
    }

    // MARK: Measuring the blocks

    /// Waits for a pause: the preview redraws after typing, and pictures load in.
    private func scheduleAnchorRefresh() {
        anchorRefresh?.cancel()
        let work = DispatchWorkItem { [weak self] in
            MainActor.assumeIsolated { self?.refreshAnchors() }
        }
        anchorRefresh = work
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2, execute: work)
    }

    /// Each marked block's line and top, in the preview's page.
    private static let blockTopsScript = """
        (function () {
          var out = [];
          var blocks = document.querySelectorAll('[data-source-line]');
          for (var i = 0; i < blocks.length; i++) {
            var rect = blocks[i].getBoundingClientRect();
            if (!rect.width && !rect.height) continue;
            out.push([Number(blocks[i].getAttribute('data-source-line')), rect.top + (window.scrollY || 0)]);
          }
          return JSON.stringify(out);
        })();
        """

    private func refreshAnchors() {
        guard let textView = sourceView as? UITextView, let preview = previewView, let webView = Self.webView(in: preview) else {
            anchors = []
            return
        }
        webView.evaluateJavaScript(Self.blockTopsScript) { [weak self, weak textView, weak preview, weak webView] result, _ in
            MainActor.assumeIsolated {
                guard let self, let textView, let preview, let webView,
                      let json = result as? String,
                      let rows = try? JSONDecoder().decode([[Double]].self, from: Data(json.utf8)) else { return }
                let blocks = rows.filter { $0.count == 2 }.map { (line: Int($0[0]), top: CGFloat($0[1])) }
                let sourceTops = Self.lineTops(in: textView, lines: Set(blocks.map(\.line)))
                var seen = Set<Int>()
                var measured: [Anchor] = []
                for block in blocks where seen.insert(block.line).inserted {
                    guard let sourceTop = sourceTops[block.line] else { continue }
                    let previewTop = Self.pageYInScrollView(block.top, webView: webView, scrollView: preview)
                    measured.append(Anchor(source: sourceTop, preview: previewTop))
                }
                guard measured != self.anchors else { return }
                self.anchors = measured
                self.lengthChanged()
            }
        }
    }

    /// Where each of `lines` (0-based) starts in the text view.
    static func lineTops(in textView: UITextView, lines: Set<Int>) -> [Int: CGFloat] {
        guard !lines.isEmpty else { return [:] }
        let text = textView.text as NSString? ?? ""
        let lastWanted = lines.max() ?? 0
        var starts = [0]
        var searchFrom = 0
        while starts.count <= lastWanted, searchFrom < text.length {
            let newline = text.range(of: "\n", range: NSRange(location: searchFrom, length: text.length - searchFrom))
            guard newline.location != NSNotFound else { break }
            starts.append(newline.location + 1)
            searchFrom = newline.location + 1
        }
        // Text is laid out as it scrolls into view, and the rest only estimated, which would put far blocks in the wrong
        // place. (`layoutManager` is asked only of a TextKit 1 view: asking a TextKit 2 one switches it over.)
        if let layout = textView.textLayoutManager {
            layout.ensureLayout(for: layout.documentRange)
        } else {
            textView.layoutManager.ensureLayout(for: textView.textContainer)
        }
        var tops: [Int: CGFloat] = [:]
        for line in lines where line < starts.count {
            guard let position = textView.position(from: textView.beginningOfDocument, offset: starts[line]) else { continue }
            tops[line] = textView.caretRect(for: position).minY
        }
        return tops
    }

    /// Where a point of the preview's page sits in the preview's scroll view. The read-only web view is pinned to what's
    /// visible and scrolls its page to match (see `HTMLNoteView`), so the page's own offset comes off first.
    static func pageYInScrollView(_ pageY: CGFloat, webView: WKWebView, scrollView: UIScrollView) -> CGFloat {
        webView.convert(CGPoint(x: 0, y: pageY - webView.scrollView.contentOffset.y), to: scrollView).y
    }

    private static func webView(in view: UIView) -> WKWebView? {
        var queue = [view]
        while !queue.isEmpty {
            let next = queue.removeFirst()
            if let webView = next as? WKWebView { return webView }
            queue.append(contentsOf: next.subviews)
        }
        return nil
    }
}

/// Finds the scroll view a split pane is (the editor's text view, the source's, or the preview's scroll view) and hands
/// it to the sync. Sits behind the pane, the same size.
private struct MarkdownScrollProbe: UIViewRepresentable {
    let sync: MarkdownScrollSync
    let pane: MarkdownScrollSync.Pane

    func makeUIView(context: Context) -> ProbeView {
        let view = ProbeView()
        view.isUserInteractionEnabled = false
        view.backgroundColor = .clear
        return view
    }

    func updateUIView(_ uiView: ProbeView, context: Context) {
        let sync = sync
        let pane = pane
        uiView.found = { sync.attach($0, as: pane) }
        uiView.scheduleSearch()
    }

    final class ProbeView: UIView {
        var found: ((UIScrollView) -> Void)?
        private var searchScheduled = false

        override func didMoveToWindow() {
            super.didMoveToWindow()
            scheduleSearch()
        }

        override func layoutSubviews() {
            super.layoutSubviews()
            scheduleSearch()
        }

        /// After SwiftUI's update and layout, once however often it was asked.
        func scheduleSearch() {
            guard !searchScheduled else { return }
            searchScheduled = true
            DispatchQueue.main.async { [weak self] in
                guard let self else { return }
                self.searchScheduled = false
                if let scrollView = Self.scrollView(matching: self) { self.found?(scrollView) }
            }
        }

        /// The smallest scrolling view that covers this one: the pane SwiftUI puts beside the probe. A scroll view can
        /// reach past its pane into the safe area (under the status bar, the home indicator or the keyboard), so it's
        /// matched by covering the pane, not by size. Views that don't scroll themselves (the preview's web view, as tall
        /// as its page) don't count.
        static func scrollView(matching probe: UIView) -> UIScrollView? {
            guard let window = probe.window, probe.bounds.width > 0, probe.bounds.height > 0 else { return nil }
            let target = probe.convert(probe.bounds, to: window)
            let targetArea = target.width * target.height
            var ancestor = probe.superview
            for _ in 0..<6 {
                guard let container = ancestor else { break }
                var best: (view: UIScrollView, area: CGFloat)?
                var queue: [UIView] = [container]
                while !queue.isEmpty {
                    let view = queue.removeFirst()
                    if let scrollView = view as? UIScrollView, scrollView.isScrollEnabled {
                        let frame = scrollView.convert(scrollView.bounds, to: window)
                        let covered = frame.intersection(target)
                        let area = frame.width * frame.height
                        if !covered.isNull, covered.width * covered.height >= targetArea * 0.9, area < (best?.area ?? .infinity) {
                            best = (scrollView, area)
                        }
                    }
                    queue.append(contentsOf: view.subviews)
                }
                if let best { return best.view }
                ancestor = container.superview
            }
            return nil
        }
    }
}

/// The rendered preview beside the Markdown editor, following the text as it's typed. Looking only: its links and
/// to-dos don't act, since the source is being edited next to it.
struct MarkdownLivePreview: View {
    let source: String
    var baseURL: URL?
    var taskStates: TaskStateWebConfig = .plain

    @State private var html = ""

    var body: some View {
        ScrollView {
            HTMLNoteView(
                html: html.isEmpty ? "<p></p>" : html,
                baseURL: baseURL,
                listInteractionEnabled: false,
                taskStates: taskStates,
                allowListReorder: false,
                allowCollapsibleReorder: false
            )
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .background(Color(.secondarySystemGroupedBackground))
        .task(id: source) {
            // Waits for a pause in typing, so the preview isn't redrawn on every key.
            if !html.isEmpty {
                try? await Task.sleep(nanoseconds: 250_000_000)
            }
            guard !Task.isCancelled else { return }
            let text = source
            let states = taskStates.states
            let converted = await Task.detached(priority: .userInitiated) {
                MarkdownToNoteHTML.convert(text, options: .markdownNote(taskStates: states))
            }.value
            guard !Task.isCancelled else { return }
            html = converted
        }
    }
}

/// How much of the note's visible height is left below this view when the note is scrolled to the top: what the Markdown
/// split shares between its halves. The note's scroll view runs under the navigation and tab bars, so their insets come
/// off, and the title and anything else above this view take their share.
struct NoteSpaceBelowReader: UIViewRepresentable {
    var onChange: (CGFloat) -> Void

    func makeUIView(context: Context) -> ProbeView {
        let view = ProbeView()
        view.isUserInteractionEnabled = false
        view.backgroundColor = .clear
        return view
    }

    func updateUIView(_ uiView: ProbeView, context: Context) {
        uiView.onChange = onChange
        uiView.scheduleReport()
    }

    final class ProbeView: UIView {
        var onChange: ((CGFloat) -> Void)?
        private weak var noteScrollView: UIScrollView?
        private var observations: [NSKeyValueObservation] = []
        private var reportScheduled = false

        override func didMoveToWindow() {
            super.didMoveToWindow()
            scheduleReport()
        }

        override func layoutSubviews() {
            super.layoutSubviews()
            scheduleReport()
        }

        /// On the next main-queue turn: `onChange` writes SwiftUI state, which isn't allowed during its own update.
        func scheduleReport() {
            guard !reportScheduled else { return }
            reportScheduled = true
            DispatchQueue.main.async { [weak self] in
                guard let self else { return }
                self.reportScheduled = false
                self.report()
            }
        }

        private func report() {
            guard let scrollView = attachedScrollView() else { return }
            let visible = scrollView.bounds.height - scrollView.adjustedContentInset.top - scrollView.adjustedContentInset.bottom
            let top = convert(bounds.origin, to: scrollView).y
            let space = visible - top
            if space > 1 { onChange?(space) }
        }

        /// The note's own scroll view: the outermost one above this view (not a web view's). Watched, so what's above
        /// (attributes arriving) and a new size (rotation) report again.
        private func attachedScrollView() -> UIScrollView? {
            if let noteScrollView { return noteScrollView }
            var outermost: UIScrollView?
            var current: UIView? = superview
            while let view = current {
                if let scrollView = view as? UIScrollView, !(scrollView is UITableView),
                   !NSStringFromClass(type(of: scrollView)).contains("WKScroll") {
                    outermost = scrollView
                }
                current = view.superview
            }
            guard let outermost else { return nil }
            noteScrollView = outermost
            observations = [
                outermost.observe(\.contentSize, options: [.new]) { [weak self] _, _ in
                    MainActor.assumeIsolated { self?.scheduleReport() }
                },
                outermost.observe(\.bounds, options: [.old, .new]) { [weak self] _, change in
                    guard change.oldValue?.size != change.newValue?.size else { return }
                    MainActor.assumeIsolated { self?.scheduleReport() }
                },
                outermost.observe(\.contentInset, options: [.new]) { [weak self] _, _ in
                    MainActor.assumeIsolated { self?.scheduleReport() }
                },
            ]
            return outermost
        }
    }
}

