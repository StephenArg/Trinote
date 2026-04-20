import SwiftUI
import UIKit

/// After leaving the rich-text editor, restores the read-only `ScrollView` to match the editor’s vertical position
/// (same 0–1 fraction as `editorBridge.scrollToFraction` / `getScrollFraction`).
struct NoteDetailReadOnlyScrollRestoration: UIViewRepresentable {
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
        }
    }

    final class Coordinator {
        var onApplied: () -> Void
        private var applyToken: UUID?

        init(onApplied: @escaping () -> Void) {
            self.onApplied = onApplied
        }

        func scheduleApply(fraction: CGFloat, from view: UIView) {
            let token = UUID()
            applyToken = token
            DispatchQueue.main.async { [weak self, weak view] in
                guard let self else { return }
                guard let view else {
                    onApplied()
                    return
                }
                tryApply(fraction: fraction, view: view, token: token, attempts: 0)
            }
        }

        private func tryApply(fraction: CGFloat, view: UIView, token: UUID, attempts: Int) {
            guard applyToken == token else { return }
            guard let sv = Self.findEnclosingScrollView(from: view) else {
                if attempts < 15 {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.03) { [weak self, weak view] in
                        guard let self else { return }
                        guard let view else {
                            onApplied()
                            return
                        }
                        tryApply(fraction: fraction, view: view, token: token, attempts: attempts + 1)
                    }
                } else {
                    onApplied()
                }
                return
            }

            sv.layoutIfNeeded()
            let maxOffset = max(sv.contentSize.height - sv.bounds.height, 0)
            if maxOffset <= 0 && attempts < 15 {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.03) { [weak self, weak view] in
                    guard let self else { return }
                    guard let view else {
                        onApplied()
                        return
                    }
                    tryApply(fraction: fraction, view: view, token: token, attempts: attempts + 1)
                }
                return
            }

            if maxOffset > 0 {
                let y = min(max(fraction * maxOffset, 0), maxOffset)
                sv.setContentOffset(CGPoint(x: sv.contentOffset.x, y: y), animated: false)
            }
            onApplied()
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
