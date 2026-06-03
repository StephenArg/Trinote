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

    private static func topViewController(from root: UIViewController) -> UIViewController {
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

/// Blocks iOS interactive back-swipe while `blocked` is true.
struct NavigationPopGestureBlocker: UIViewControllerRepresentable {
    let blocked: Bool

    func makeUIViewController(context: Context) -> Controller {
        let vc = Controller()
        vc.blocked = blocked
        return vc
    }

    func updateUIViewController(_ uiViewController: Controller, context: Context) {
        uiViewController.blocked = blocked
        uiViewController.applyBlocking()
    }

    final class Controller: UIViewController, UIGestureRecognizerDelegate {
        var blocked = true
        private weak var previousDelegate: UIGestureRecognizerDelegate?
        private var savedPopGestureEnabled: Bool?

        override func viewDidAppear(_ animated: Bool) {
            super.viewDidAppear(animated)
            applyBlocking()
        }

        override func viewWillDisappear(_ animated: Bool) {
            super.viewWillDisappear(animated)
            restorePopGesture()
        }

        func applyBlocking() {
            guard let navigationController = enclosingNavigationController(),
                  let gesture = navigationController.interactivePopGestureRecognizer else { return }
            if blocked {
                if savedPopGestureEnabled == nil {
                    savedPopGestureEnabled = gesture.isEnabled
                }
                if gesture.delegate !== self {
                    previousDelegate = gesture.delegate
                    gesture.delegate = self
                }
                gesture.isEnabled = false
            } else {
                restorePopGesture()
            }
        }

        private func restorePopGesture() {
            guard let navigationController = enclosingNavigationController(),
                  let gesture = navigationController.interactivePopGestureRecognizer else { return }
            if gesture.delegate === self {
                gesture.delegate = previousDelegate
            }
            if let savedPopGestureEnabled {
                gesture.isEnabled = savedPopGestureEnabled
                self.savedPopGestureEnabled = nil
            } else {
                gesture.isEnabled = true
            }
        }

        private func enclosingNavigationController() -> UINavigationController? {
            navigationController ?? NavigationControllerFinder.navigationController(from: view)
        }

        func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
            !blocked
        }
    }
}

/// Synchronously disables the navigation interactive-pop gesture during tab reorder.
enum TabReorderNavigationPopSuppressor {
    private static var savedPopGestureEnabled: Bool?

    static func suppress(from view: UIView?) {
        guard savedPopGestureEnabled == nil,
              let navigationController = NavigationControllerFinder.navigationController(from: view),
              let gesture = navigationController.interactivePopGestureRecognizer else { return }
        savedPopGestureEnabled = gesture.isEnabled
        gesture.isEnabled = false
    }

    static func restore(from view: UIView?) {
        guard let savedPopGestureEnabled,
              let navigationController = NavigationControllerFinder.navigationController(from: view),
              let gesture = navigationController.interactivePopGestureRecognizer else {
            Self.savedPopGestureEnabled = nil
            return
        }
        gesture.isEnabled = savedPopGestureEnabled
        Self.savedPopGestureEnabled = nil
    }
}
