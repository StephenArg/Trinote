import SwiftUI
import UIKit

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
    var onApplied: () -> Void

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
        var onApplied: () -> Void
        private var applyToken: UUID?
        private var pendingFraction: CGFloat?
        private weak var attachedScrollView: UIScrollView?
        private var contentSizeObservation: NSKeyValueObservation?
        private var boundsObservation: NSKeyValueObservation?
        private var stabilityWorkItem: DispatchWorkItem?
        private var giveUpWorkItem: DispatchWorkItem?

        private static let stabilityWindow: TimeInterval = 0.28
        private static let maxWaitWindow: TimeInterval = 3.5
        private static let minOffsetReapplyDelta: CGFloat = 0.5
        private static let fractionEpsilon: CGFloat = 0.004

        init(onApplied: @escaping () -> Void) {
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

            stabilityWorkItem?.cancel()
            stabilityWorkItem = nil

            giveUpWorkItem?.cancel()
            let giveUp = DispatchWorkItem { [weak self] in
                guard let self, self.applyToken == token else { return }
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
                        self.applyAndRestartStability()
                        return
                    }
                }
                self.fireOnApplied()
            }
            stabilityWorkItem = work
            DispatchQueue.main.asyncAfter(deadline: .now() + Self.stabilityWindow, execute: work)
        }

        private func fireOnApplied() {
            stabilityWorkItem?.cancel()
            stabilityWorkItem = nil
            giveUpWorkItem?.cancel()
            giveUpWorkItem = nil
            applyToken = nil
            pendingFraction = nil
            detachObservations()
            onApplied()
        }

        private func detachObservations() {
            contentSizeObservation?.invalidate()
            contentSizeObservation = nil
            boundsObservation?.invalidate()
            boundsObservation = nil
            attachedScrollView = nil
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
