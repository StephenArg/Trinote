import SwiftUI
import UIKit

/// Reads the enclosing `UIScrollView`’s `contentOffset.y`.
///
/// SwiftUI `ScrollView` + `GeometryReader` / `PreferenceKey` often **does not** refresh during a drag,
/// so the floating edit chip never sees scroll deltas. KVO on `contentOffset` matches what the user actually scrolls.
struct NoteDetailScrollOffsetReader: UIViewRepresentable {
    var onOffsetChange: (CGFloat) -> Void

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
        var onOffsetChange: (CGFloat) -> Void
        private weak var scrollView: UIScrollView?
        private var observation: NSKeyValueObservation?

        init(onOffsetChange: @escaping (CGFloat) -> Void) {
            self.onOffsetChange = onOffsetChange
        }

        func attachIfNeeded(from view: UIView) {
            guard scrollView == nil else { return }
            DispatchQueue.main.async { [weak self, weak view] in
                guard let self, let view, self.scrollView == nil else { return }
                guard let sv = Self.findEnclosingScrollView(from: view) else { return }
                self.scrollView = sv
                self.observation = sv.observe(\.contentOffset, options: [.new]) { scrollView, _ in
                    let y = scrollView.contentOffset.y
                    DispatchQueue.main.async {
                        self.onOffsetChange(y)
                    }
                }
                self.onOffsetChange(sv.contentOffset.y)
            }
        }

        func detach() {
            observation?.invalidate()
            observation = nil
            scrollView = nil
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
