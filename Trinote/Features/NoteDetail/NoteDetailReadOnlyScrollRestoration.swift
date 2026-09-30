import SwiftUI
import UIKit
import WebKit

/// Restores the read-only `ScrollView` to a saved 0–1 vertical fraction (same fraction emitted by
/// `NoteDetailScrollOffsetReader` and the rich-text editor's `getScrollFraction`).
///
/// HTML/WKWebView content reports its height asynchronously: `HTMLNoteView` starts at 200pt and grows
/// via `onHeightChanged`, so a one-shot `setContentOffset` based on the first non-zero `contentSize`
/// lands at a tiny offset and the user is left near the top once the body finishes laying out. The
/// coordinator observes `contentSize` and `bounds` and re-applies the same fraction on every change
/// until the size stays stable for `stabilityWindow`, then signals completion. A hard `maxWaitWindow`
/// guarantees the caller's mask never sticks if layout never settles (e.g. infinite-scroll children).
struct NoteDetailReadOnlyScrollRestoration: UIViewRepresentable {
    /// Set to a saved fraction (0…1) to request a restore. `nil` cancels any in-flight restore.
    var fraction: CGFloat?
    /// Called once the restore finishes or gives up, with the fraction the scroll view actually reached
    /// (0 when there is nothing to scroll), or nil when no scroll view was found.
    var onApplied: (_ reachedFraction: CGFloat?) -> Void

    func makeCoordinator() -> Coordinator {
        Coordinator(onApplied: onApplied)
    }

    func makeUIView(context: Context) -> UIView {
        let v = UIView()
        v.isUserInteractionEnabled = false
        v.backgroundColor = .clear
        return v
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        context.coordinator.onApplied = onApplied
        if let f = fraction {
            context.coordinator.scheduleApply(fraction: f, from: uiView)
        } else {
            context.coordinator.cancel()
        }
    }

    static func dismantleUIView(_ uiView: UIView, coordinator: Coordinator) {
        coordinator.cancel()
    }

    final class Coordinator {
        var onApplied: (_ reachedFraction: CGFloat?) -> Void
        private var applyToken: UUID?
        private var pendingFraction: CGFloat?
        private weak var attachedScrollView: UIScrollView?
        private var contentSizeObservation: NSKeyValueObservation?
        private var boundsObservation: NSKeyValueObservation?
        private var stabilityWorkItem: DispatchWorkItem?
        private var giveUpWorkItem: DispatchWorkItem?
        private var applyCount = 0

        private static let stabilityWindow: TimeInterval = 0.28
        private static let maxWaitWindow: TimeInterval = 3.5
        /// How long to wait for a note that fits on screen to grow tall enough to scroll, once no web view in it is
        /// still loading (a web view reports its height as it finishes). A note that got shorter since its position
        /// was saved stops here instead of at `maxWaitWindow`.
        private static let nothingToScrollWindow: TimeInterval = 1.5
        private var scheduledAt: CFAbsoluteTime = 0
        private static let minOffsetReapplyDelta: CGFloat = 0.5
        private static let fractionEpsilon: CGFloat = 0.004

        init(onApplied: @escaping (_ reachedFraction: CGFloat?) -> Void) {
            self.onApplied = onApplied
        }

        func cancel() {
            applyToken = nil
            pendingFraction = nil
            stabilityWorkItem?.cancel()
            stabilityWorkItem = nil
            giveUpWorkItem?.cancel()
            giveUpWorkItem = nil
            detachObservations()
        }

        func scheduleApply(fraction: CGFloat, from view: UIView) {
            if let pending = pendingFraction, abs(pending - fraction) < 0.0005, applyToken != nil {
                return
            }

            pendingFraction = fraction
            let token = UUID()
            applyToken = token
            applyCount = 0
            scheduledAt = CFAbsoluteTimeGetCurrent()
            NoteOpenTrace.log("restore scheduleApply fraction=\(fraction)")

            stabilityWorkItem?.cancel()
            stabilityWorkItem = nil

            giveUpWorkItem?.cancel()
            let giveUp = DispatchWorkItem { [weak self] in
                guard let self, self.applyToken == token else { return }
                NoteOpenTrace.log("restore GAVE UP after \(Self.maxWaitWindow)s applies=\(self.applyCount)")
                self.fireOnApplied()
            }
            giveUpWorkItem = giveUp
            DispatchQueue.main.asyncAfter(deadline: .now() + Self.maxWaitWindow, execute: giveUp)

            DispatchQueue.main.async { [weak self, weak view] in
                guard let self else { return }
                guard let view else {
                    self.fireOnApplied()
                    return
                }
                self.attachAndApply(view: view, token: token, attempts: 0)
            }
        }

        private func attachAndApply(view: UIView, token: UUID, attempts: Int) {
            guard applyToken == token else { return }
            guard let sv = Self.findEnclosingScrollView(from: view) else {
                if attempts < 30 {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.03) { [weak self, weak view] in
                        guard let self, let view else { return }
                        self.attachAndApply(view: view, token: token, attempts: attempts + 1)
                    }
                } else {
                    NoteOpenTrace.log("restore no enclosing scroll view after 30 attempts")
                    fireOnApplied()
                }
                return
            }

            if attachedScrollView !== sv {
                detachObservations()
                attachedScrollView = sv
                contentSizeObservation = sv.observe(\.contentSize, options: [.new]) { [weak self] _, _ in
                    DispatchQueue.main.async { self?.applyAndRestartStability() }
                }
                boundsObservation = sv.observe(\.bounds, options: [.new]) { [weak self] _, _ in
                    DispatchQueue.main.async { self?.applyAndRestartStability() }
                }
            }
            applyAndRestartStability()
        }

        private func applyAndRestartStability() {
            guard let sv = attachedScrollView, let fraction = pendingFraction, let token = applyToken else { return }
            sv.layoutIfNeeded()
            let maxOffset = max(sv.contentSize.height - sv.bounds.height, 0)
            applyCount += 1
            if applyCount <= 40 {
                NoteOpenTrace.log(
                    "restore apply #\(applyCount) contentH=\(sv.contentSize.height) boundsH=\(sv.bounds.height) offsetY=\(sv.contentOffset.y) target=\(maxOffset > 0 ? min(max(fraction * maxOffset, 0), maxOffset) : -1)"
                )
            }
            if maxOffset > 0 {
                let y = min(max(fraction * maxOffset, 0), maxOffset)
                if abs(sv.contentOffset.y - y) > Self.minOffsetReapplyDelta {
                    sv.setContentOffset(CGPoint(x: sv.contentOffset.x, y: y), animated: false)
                }
            }

            stabilityWorkItem?.cancel()
            let work = DispatchWorkItem { [weak self] in
                guard let self, self.applyToken == token else { return }
                guard let sv = self.attachedScrollView, let fraction = self.pendingFraction else {
                    self.fireOnApplied()
                    return
                }
                let maxOffset = max(sv.contentSize.height - sv.bounds.height, 0)
                if fraction > Self.fractionEpsilon, maxOffset <= 0 {
                    if CFAbsoluteTimeGetCurrent() - self.scheduledAt >= Self.nothingToScrollWindow,
                       !Self.containsLoadingWebView(sv) {
                        NoteOpenTrace.log("restore: still nothing to scroll after \(Self.nothingToScrollWindow)s (contentH=\(sv.contentSize.height)), showing the note")
                        self.fireOnApplied()
                        return
                    }
                    NoteOpenTrace.log("restore stability check: nothing to scroll yet (contentH=\(sv.contentSize.height)), retrying")
                    self.applyAndRestartStability()
                    return
                }
                if maxOffset > 0 {
                    let y = min(max(fraction * maxOffset, 0), maxOffset)
                    if abs(sv.contentOffset.y - y) > Self.minOffsetReapplyDelta {
                        sv.setContentOffset(CGPoint(x: sv.contentOffset.x, y: y), animated: false)
                    }
                    if fraction > Self.fractionEpsilon,
                       maxOffset > 0,
                       abs(sv.contentOffset.y - y) > Self.minOffsetReapplyDelta {
                        NoteOpenTrace.log("restore stability check: offset \(sv.contentOffset.y) didn't stick at \(y), retrying")
                        self.applyAndRestartStability()
                        return
                    }
                }
                NoteOpenTrace.log("restore settled after applies=\(self.applyCount) offsetY=\(sv.contentOffset.y)")
                self.fireOnApplied()
            }
            stabilityWorkItem = work
            DispatchQueue.main.asyncAfter(deadline: .now() + Self.stabilityWindow, execute: work)
        }

        private func fireOnApplied() {
            let reached: CGFloat? = attachedScrollView.map { sv in
                let maxOffset = sv.contentSize.height - sv.bounds.height
                return maxOffset > 0 ? min(max(sv.contentOffset.y / maxOffset, 0), 1) : 0
            }
            stabilityWorkItem?.cancel()
            stabilityWorkItem = nil
            giveUpWorkItem?.cancel()
            giveUpWorkItem = nil
            applyToken = nil
            pendingFraction = nil
            detachObservations()
            onApplied(reached)
        }

        private func detachObservations() {
            contentSizeObservation?.invalidate()
            contentSizeObservation = nil
            boundsObservation?.invalidate()
            boundsObservation = nil
            attachedScrollView = nil
        }

        /// True while a web view in the note (the body, a Markdown preview) is still loading; its height isn't known yet.
        private static func containsLoadingWebView(_ view: UIView) -> Bool {
            if let webView = view as? WKWebView { return webView.isLoading }
            return view.subviews.contains(where: containsLoadingWebView)
        }

        private static func findEnclosingScrollView(from view: UIView) -> UIScrollView? {
            var current: UIView? = view.superview
            while let c = current {
                if let sv = c as? UIScrollView { return sv }
                current = c.superview
            }
            return nil
        }
    }
}
