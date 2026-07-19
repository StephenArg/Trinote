import SwiftUI
import WebKit

/// Reads the visible height of the outer note `ScrollView` (skips nested `WKScrollView`s).
/// Used so canvas/mermaid bodies can use the on-screen viewport as a minimum height for pinch-zoom.
struct EnclosingScrollViewportHeightReader: UIViewRepresentable {
    var onChange: (CGFloat) -> Void

    func makeUIView(context: Context) -> ProbeView {
        let view = ProbeView()
        view.onChange = onChange
        view.isUserInteractionEnabled = false
        view.backgroundColor = .clear
        return view
    }

    func updateUIView(_ uiView: ProbeView, context: Context) {
        uiView.onChange = onChange
        uiView.report()
    }

    final class ProbeView: UIView {
        var onChange: ((CGFloat) -> Void)?

        override func didMoveToWindow() {
            super.didMoveToWindow()
            report()
        }

        override func layoutSubviews() {
            super.layoutSubviews()
            report()
        }

        func report() {
            guard let height = Self.enclosingScrollViewportHeight(from: self), height > 1 else { return }
            onChange?(height)
        }

        private static func enclosingScrollViewportHeight(from view: UIView) -> CGFloat? {
            // Prefer the outermost non-WK scroll view (SwiftUI note ScrollView).
            var outermost: UIScrollView?
            var current: UIView? = view
            while let c = current {
                if let scroll = c as? UIScrollView,
                   !(scroll is UITableView),
                   !(scroll.superview is WKWebView),
                   !NSStringFromClass(type(of: scroll)).contains("WKScroll") {
                    outermost = scroll
                }
                current = c.superview
            }
            if let outermost {
                return outermost.bounds.height
            }
            return view.window?.windowScene?.screen.bounds.height
        }
    }
}
