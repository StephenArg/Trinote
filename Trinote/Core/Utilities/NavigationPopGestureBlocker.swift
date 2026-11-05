import SwiftUI
import UIKit

enum NavigationControllerFinder {
    /// Walks the responder chain from `view` to find an enclosing navigation controller.
    static func navigationController(from view: UIView?) -> UINavigationController? {
        var responder: UIResponder? = view
        while let current = responder {
            if let viewController = current as? UIViewController,
               let navigationController = viewController.navigationController {
                return navigationController
            }
            responder = current.next
        }
        return topNavigationController(in: view?.window)
    }

    private static func topNavigationController(in window: UIWindow?) -> UINavigationController? {
        guard let root = window?.rootViewController else { return nil }
        let top = topViewController(from: root)
        return top.navigationController
            ?? (top as? UINavigationController)
            ?? (root as? UINavigationController)
    }

    /// Foreground key-window topmost controller (presented / nav / tab).
    @MainActor
    static func topViewController() -> UIViewController? {
        let window = AppDelegate.foregroundWindowScene?.keyWindow
            ?? UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap(\.windows)
            .first(where: \.isKeyWindow)
        guard let root = window?.rootViewController else { return nil }
        return topViewController(from: root)
    }

    static func topViewController(from root: UIViewController) -> UIViewController {
        if let presented = root.presentedViewController {
            return topViewController(from: presented)
        }
        if let navigation = root as? UINavigationController, let visible = navigation.visibleViewController {
            return topViewController(from: visible)
        }
        if let tab = root as? UITabBarController, let selected = tab.selectedViewController {
            return topViewController(from: selected)
        }
        return root
    }
}

/// Process-wide refcount so nested blockers (NoteDetail + mind map + WKWebView) don't
/// re-enable interactive pop while another host still needs it blocked.
///
/// On iOS 26+, UINavigationController also has `interactiveContentPopGestureRecognizer`
/// (anywhere-in-content swipe-to-pop). Disabling only `interactivePopGestureRecognizer`
/// is not enough — mind-map pans hit the content pop gesture instead.
enum NavigationPopGestureSuppression {
    private static var suppressCount = 0
    private static var savedEdgePopEnabled: Bool?
    private static var savedContentPopEnabled: Bool?
    private static weak var navigationController: UINavigationController?
    private static weak var previousEdgeDelegate: UIGestureRecognizerDelegate?
    private static weak var previousContentDelegate: UIGestureRecognizerDelegate?
    private static let denyDelegate = PopGestureDenyDelegate()

    private static func contentPopGesture(on nav: UINavigationController) -> UIGestureRecognizer? {
        if #available(iOS 26.0, *) {
            return nav.interactiveContentPopGestureRecognizer
        }
        return nil
    }

    private static func applyDisabled(_ nav: UINavigationController) {
        if let edge = nav.interactivePopGestureRecognizer {
            if edge.delegate !== denyDelegate {
                previousEdgeDelegate = edge.delegate
                edge.delegate = denyDelegate
            }
            edge.isEnabled = false
        }
        if let content = contentPopGesture(on: nav) {
            if content.delegate !== denyDelegate {
                previousContentDelegate = content.delegate
                content.delegate = denyDelegate
            }
            content.isEnabled = false
        }
    }

    private static func applyRestored(_ nav: UINavigationController) {
        if let edge = nav.interactivePopGestureRecognizer {
            if edge.delegate === denyDelegate {
                edge.delegate = previousEdgeDelegate
            }
            edge.isEnabled = savedEdgePopEnabled ?? true
        }
        if let content = contentPopGesture(on: nav) {
            if content.delegate === denyDelegate {
                content.delegate = previousContentDelegate
            }
            content.isEnabled = savedContentPopEnabled ?? true
        }
    }

    /// Call when a host that needs blocking enters the hierarchy.
    /// - Returns: `true` when this call took a retain token (caller must later `release`).
    @discardableResult
    static func retain(from view: UIView?) -> Bool {
        guard let navigationController = NavigationControllerFinder.navigationController(from: view) else {
            return false
        }
        // Edge gesture is always present on a real UINavigationController; content gesture is iOS 26+.
        guard navigationController.interactivePopGestureRecognizer != nil
                || contentPopGesture(on: navigationController) != nil else {
            return false
        }

        if suppressCount == 0 {
            savedEdgePopEnabled = navigationController.interactivePopGestureRecognizer?.isEnabled
            if #available(iOS 26.0, *) {
                savedContentPopEnabled = navigationController.interactiveContentPopGestureRecognizer?.isEnabled
            }
            Self.navigationController = navigationController
        }
        applyDisabled(navigationController)
        suppressCount += 1
        return true
    }

    /// Call when that host leaves. Restores only when the last retainer exits.
    static func release(from view: UIView?) {
        guard suppressCount > 0 else { return }
        suppressCount -= 1
        guard suppressCount == 0 else {
            navigationController.map { applyDisabled($0) }
            return
        }

        if let nav = navigationController ?? NavigationControllerFinder.navigationController(from: view) {
            applyRestored(nav)
        }
        savedEdgePopEnabled = nil
        savedContentPopEnabled = nil
        previousEdgeDelegate = nil
        previousContentDelegate = nil
        navigationController = nil
    }

    /// Re-assert disabled while any retainer is active (SwiftUI / NavigationStack often flips it back on).
    static func reassertIfNeeded(from view: UIView?) {
        guard suppressCount > 0 else { return }
        guard let nav = navigationController ?? NavigationControllerFinder.navigationController(from: view) else { return }
        if navigationController == nil {
            navigationController = nav
            if savedEdgePopEnabled == nil {
                savedEdgePopEnabled = nav.interactivePopGestureRecognizer?.isEnabled
            }
            if #available(iOS 26.0, *), savedContentPopEnabled == nil {
                savedContentPopEnabled = nav.interactiveContentPopGestureRecognizer?.isEnabled
            }
        }

        let edgeOn = nav.interactivePopGestureRecognizer?.isEnabled == true
        var contentOn = false
        if #available(iOS 26.0, *) {
            contentOn = nav.interactiveContentPopGestureRecognizer?.isEnabled == true
        }
        let edgeDelStolen = nav.interactivePopGestureRecognizer.map { $0.delegate !== denyDelegate } ?? false
        var contentDelStolen = false
        if #available(iOS 26.0, *), let content = nav.interactiveContentPopGestureRecognizer {
            contentDelStolen = content.delegate !== denyDelegate
        }

        if edgeOn || contentOn || edgeDelStolen || contentDelStolen {
            applyDisabled(nav)
        }
    }

    private final class PopGestureDenyDelegate: NSObject, UIGestureRecognizerDelegate {
        func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
            false
        }
    }
}

/// Blocks iOS interactive back-swipe while `blocked` is true.
///
/// Prefer attaching as a full-size `.background { NavigationPopGestureBlocker(blocked: true) }`
/// on the interactive surface. A zero-size host often never joins the hierarchy under
/// SwiftUI `NavigationStack`.
struct NavigationPopGestureBlocker: UIViewControllerRepresentable {
    let blocked: Bool

    func makeUIViewController(context: Context) -> Controller {
        let vc = Controller()
        vc.blocked = blocked
        return vc
    }

    func updateUIViewController(_ uiViewController: Controller, context: Context) {
        uiViewController.blocked = blocked
        uiViewController.syncSuppression()
    }

    final class Controller: UIViewController {
        var blocked = true
        private var isRetaining = false

        override func viewDidLoad() {
            super.viewDidLoad()
            view.isUserInteractionEnabled = false
            view.backgroundColor = .clear
            view.isOpaque = false
        }

        override func viewDidAppear(_ animated: Bool) {
            super.viewDidAppear(animated)
            syncSuppression()
        }

        override func viewDidLayoutSubviews() {
            super.viewDidLayoutSubviews()
            if isRetaining {
                NavigationPopGestureSuppression.reassertIfNeeded(from: view)
            } else {
                syncSuppression()
            }
        }

        override func viewDidDisappear(_ animated: Bool) {
            super.viewDidDisappear(animated)
            releaseSuppression()
        }

        deinit {
            if isRetaining {
                NavigationPopGestureSuppression.release(from: nil)
            }
        }

        func syncSuppression() {
            if blocked {
                retainSuppression()
                NavigationPopGestureSuppression.reassertIfNeeded(from: view)
            } else {
                releaseSuppression()
            }
        }

        private func retainSuppression() {
            guard !isRetaining else { return }
            isRetaining = NavigationPopGestureSuppression.retain(from: view)
        }

        private func releaseSuppression() {
            guard isRetaining else { return }
            NavigationPopGestureSuppression.release(from: view)
            isRetaining = false
        }
    }
}

/// Synchronously disables the navigation interactive-pop gesture during tab reorder.
enum TabReorderNavigationPopSuppressor {
    private static var savedEdgePopEnabled: Bool?
    private static var savedContentPopEnabled: Bool?

    static func suppress(from view: UIView?) {
        guard savedEdgePopEnabled == nil,
              let navigationController = NavigationControllerFinder.navigationController(from: view) else { return }
        savedEdgePopEnabled = navigationController.interactivePopGestureRecognizer?.isEnabled
        navigationController.interactivePopGestureRecognizer?.isEnabled = false
        if #available(iOS 26.0, *) {
            savedContentPopEnabled = navigationController.interactiveContentPopGestureRecognizer?.isEnabled
            navigationController.interactiveContentPopGestureRecognizer?.isEnabled = false
        }
    }

    static func restore(from view: UIView?) {
        guard let navigationController = NavigationControllerFinder.navigationController(from: view) else {
            savedEdgePopEnabled = nil
            savedContentPopEnabled = nil
            return
        }
        if let savedEdgePopEnabled {
            navigationController.interactivePopGestureRecognizer?.isEnabled = savedEdgePopEnabled
        }
        if #available(iOS 26.0, *), let savedContentPopEnabled {
            navigationController.interactiveContentPopGestureRecognizer?.isEnabled = savedContentPopEnabled
        }
        savedEdgePopEnabled = nil
        savedContentPopEnabled = nil
    }
}
