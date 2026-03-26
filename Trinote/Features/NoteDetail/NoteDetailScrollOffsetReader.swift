import SwiftUI
import UIKit

/// Reads the enclosing `UIScrollView`’s `contentOffset.y` and whether content exceeds the viewport vertically.
///
/// SwiftUI `ScrollView` + `GeometryReader` / `PreferenceKey` often **does not** refresh during a drag,
/// so the floating edit chip never sees scroll deltas. KVO on `contentOffset` matches what the user actually scrolls.
struct NoteDetailScrollOffsetReader: UIViewRepresentable {
    /// `offset` increases when scrolling **down**. `verticallyScrollable` is false when there is nothing to scroll.
    var onOffsetChange: (CGFloat, Bool) -> Void

    func makeCoordinator() -> Coordinator {
        Coordinator(onOffsetChange: onOffsetChange)
    }

    func makeUIView(context: Context) -> UIView {
        let v = UIView()
        v.isUserInteractionEnabled = false
        v.backgroundColor = .clear
        return v
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        context.coordinator.onOffsetChange = onOffsetChange
        context.coordinator.attachIfNeeded(from: uiView)
    }

    static func dismantleUIView(_ uiView: UIView, coordinator: Coordinator) {
        coordinator.detach()
    }

    final class Coordinator: NSObject {
        var onOffsetChange: (CGFloat, Bool) -> Void
        private weak var scrollView: UIScrollView?
        private var offsetObservation: NSKeyValueObservation?
        private var contentSizeObservation: NSKeyValueObservation?
        private var boundsObservation: NSKeyValueObservation?

        init(onOffsetChange: @escaping (CGFloat, Bool) -> Void) {
            self.onOffsetChange = onOffsetChange
        }

        func attachIfNeeded(from view: UIView) {
            guard scrollView == nil else { return }
            DispatchQueue.main.async { [weak self, weak view] in
                guard let self, let view, self.scrollView == nil else { return }
                guard let sv = Self.findEnclosingScrollView(from: view) else { return }
                self.scrollView = sv
                self.offsetObservation = sv.observe(\.contentOffset, options: [.new]) { [weak self] scrollView, _ in
                    self?.emit(from: scrollView)
                }
                self.contentSizeObservation = sv.observe(\.contentSize, options: [.new]) { [weak self] scrollView, _ in
                    self?.emit(from: scrollView)
                }
                self.boundsObservation = sv.observe(\.bounds, options: [.new]) { [weak self] scrollView, _ in
                    self?.emit(from: scrollView)
                }
                self.emit(from: sv)
            }
        }

        func detach() {
            offsetObservation?.invalidate()
            offsetObservation = nil
            contentSizeObservation?.invalidate()
            contentSizeObservation = nil
            boundsObservation?.invalidate()
            boundsObservation = nil
            scrollView = nil
        }

        private func emit(from scrollView: UIScrollView) {
            let y = scrollView.contentOffset.y
            let verticallyScrollable = scrollView.contentSize.height > scrollView.bounds.height + 0.5
            DispatchQueue.main.async { [onOffsetChange] in
                onOffsetChange(y, verticallyScrollable)
            }
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
