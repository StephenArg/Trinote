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

    // TEMP debug helpers — remove with PopGesture logs.
    private static func gestureSnapshot(nav: UINavigationController?) -> String {
        let edge = nav?.interactivePopGestureRecognizer
        let edgeEn = edge.map { String($0.isEnabled) } ?? "nil"
        let edgeDel = edge.flatMap { $0.delegate.map { String(describing: type(of: $0)) } } ?? "nil"
        var contentEn = "n/a"
        var contentDel = "n/a"
        if #available(iOS 26.0, *), let content = nav?.interactiveContentPopGestureRecognizer {
            contentEn = String(content.isEnabled)
            contentDel = content.delegate.map { String(describing: type(of: $0)) } ?? "nil"
        }
        let stack = nav.map { $0.viewControllers.count } ?? -1
        let navPtr = nav.map { String(describing: ObjectIdentifier($0)) } ?? "nil"
        return "edgeEnabled=\(edgeEn) edgeDel=\(edgeDel) contentEnabled=\(contentEn) contentDel=\(contentDel) stack=\(stack) nav=\(navPtr) count=\(suppressCount)"
    }

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
    static func retain(from view: UIView?, source: String = #function) -> Bool {
        guard let navigationController = NavigationControllerFinder.navigationController(from: view) else {
            Log.popGesture.warning("retain FAIL source=\(source, privacy: .public) window=\(view?.window != nil) nav=false count=\(suppressCount)")
            return false
        }
        // Edge gesture is always present on a real UINavigationController; content gesture is iOS 26+.
        guard navigationController.interactivePopGestureRecognizer != nil
                || contentPopGesture(on: navigationController) != nil else {
            Log.popGesture.warning("retain FAIL source=\(source, privacy: .public) no pop gestures count=\(suppressCount)")
            return false
        }

        let before = gestureSnapshot(nav: navigationController)
        if suppressCount == 0 {
            savedEdgePopEnabled = navigationController.interactivePopGestureRecognizer?.isEnabled
            if #available(iOS 26.0, *) {
                savedContentPopEnabled = navigationController.interactiveContentPopGestureRecognizer?.isEnabled
            }
            Self.navigationController = navigationController
            applyDisabled(navigationController)
        } else {
            let edgeOn = navigationController.interactivePopGestureRecognizer?.isEnabled == true
            var contentOn = false
            if #available(iOS 26.0, *) {
                contentOn = navigationController.interactiveContentPopGestureRecognizer?.isEnabled == true
            }
            if edgeOn || contentOn {
                Log.popGesture.error("retain: pop gesture RE-ENABLED while count=\(suppressCount) source=\(source, privacy: .public) before=\(before, privacy: .public)")
            }
            applyDisabled(navigationController)
        }
        suppressCount += 1
        Log.popGesture.info("retain OK source=\(source, privacy: .public) savedEdge=\(String(describing: savedEdgePopEnabled), privacy: .public) savedContent=\(String(describing: savedContentPopEnabled), privacy: .public) after=\(gestureSnapshot(nav: navigationController), privacy: .public)")
        return true
    }

    /// Call when that host leaves. Restores only when the last retainer exits.
    static func release(from view: UIView?, source: String = #function) {
        guard suppressCount > 0 else {
            Log.popGesture.warning("release ignored (count already 0) source=\(source, privacy: .public)")
            return
        }
        suppressCount -= 1
        guard suppressCount == 0 else {
            navigationController.map { applyDisabled($0) }
            Log.popGesture.debug("release partial source=\(source, privacy: .public) count=\(suppressCount)")
            return
        }

        let nav = navigationController ?? NavigationControllerFinder.navigationController(from: view)
        let before = gestureSnapshot(nav: nav)
        if let nav {
            applyRestored(nav)
        }
        Log.popGesture.info("release FINAL source=\(source, privacy: .public) before=\(before, privacy: .public) after=\(gestureSnapshot(nav: nav), privacy: .public)")
        savedEdgePopEnabled = nil
        savedContentPopEnabled = nil
        previousEdgeDelegate = nil
        previousContentDelegate = nil
        navigationController = nil
    }

    /// Re-assert disabled while any retainer is active (SwiftUI / NavigationStack often flips it back on).
    static func reassertIfNeeded(from view: UIView?, source: String = #function) {
        guard suppressCount > 0 else { return }
        let nav = navigationController ?? NavigationControllerFinder.navigationController(from: view)
        guard let nav else {
            Log.popGesture.warning("reassert: no nav source=\(source, privacy: .public) count=\(suppressCount)")
            return
        }
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
            Log.popGesture.error("reassert: fixing source=\(source, privacy: .public) \(gestureSnapshot(nav: nav), privacy: .public)")
            applyDisabled(nav)
        }
    }

    private final class PopGestureDenyDelegate: NSObject, UIGestureRecognizerDelegate {
        func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
            let kind: String
            if #available(iOS 26.0, *),
               let nav = navigationController,
               gestureRecognizer === nav.interactiveContentPopGestureRecognizer {
                kind = "contentPop"
            } else if gestureRecognizer === navigationController?.interactivePopGestureRecognizer {
                kind = "edgePop"
            } else {
                kind = "other"
            }
            Log.popGesture.error("pop shouldBegin kind=\(kind, privacy: .public) — returning false. enabled=\(gestureRecognizer.isEnabled) count=\(suppressCount)")
            return false
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
    /// TEMP: identify which host attached this blocker (e.g. "NoteDetail", "MindMapNote").
    var label: String = "Blocker"

    func makeUIViewController(context: Context) -> Controller {
        let vc = Controller()
        vc.blocked = blocked
        vc.label = label
        Log.popGesture.info("Blocker[\(label, privacy: .public)] make blocked=\(blocked)")
        return vc
    }

    func updateUIViewController(_ uiViewController: Controller, context: Context) {
        if uiViewController.blocked != blocked {
            Log.popGesture.info("Blocker[\(uiViewController.label, privacy: .public)] blocked \(uiViewController.blocked) → \(blocked)")
        }
        uiViewController.blocked = blocked
        uiViewController.label = label
        uiViewController.syncSuppression()
    }

    final class Controller: UIViewController {
        var blocked = true
        var label = "Blocker"
        private var isRetaining = false

        override func viewDidLoad() {
            super.viewDidLoad()
            view.isUserInteractionEnabled = false
            view.backgroundColor = .clear
            view.isOpaque = false
            Log.popGesture.debug("Blocker[\(self.label, privacy: .public)] viewDidLoad frame=\(String(describing: self.view.frame), privacy: .public)")
        }

        override func viewDidAppear(_ animated: Bool) {
            super.viewDidAppear(animated)
            Log.popGesture.info("Blocker[\(self.label, privacy: .public)] viewDidAppear blocked=\(self.blocked) retaining=\(self.isRetaining) nav=\(self.navigationController != nil) frame=\(String(describing: self.view.bounds.size), privacy: .public)")
            syncSuppression()
        }

        override func viewDidLayoutSubviews() {
            super.viewDidLayoutSubviews()
            if isRetaining {
                NavigationPopGestureSuppression.reassertIfNeeded(from: view, source: "Blocker[\(label)].layout")
            } else {
                syncSuppression()
            }
        }

        override func viewDidDisappear(_ animated: Bool) {
            super.viewDidDisappear(animated)
            Log.popGesture.info("Blocker[\(self.label, privacy: .public)] viewDidDisappear releasing=\(self.isRetaining)")
            releaseSuppression()
        }

        deinit {
            if isRetaining {
                Log.popGesture.warning("Blocker[\(self.label, privacy: .public)] deinit still retaining — releasing")
                NavigationPopGestureSuppression.release(from: nil, source: "Blocker[\(label)].deinit")
            }
        }

        func syncSuppression() {
            if blocked {
                retainSuppression()
                NavigationPopGestureSuppression.reassertIfNeeded(from: view, source: "Blocker[\(label)].sync")
            } else {
                releaseSuppression()
            }
        }

        private func retainSuppression() {
            guard !isRetaining else { return }
            isRetaining = NavigationPopGestureSuppression.retain(from: view, source: "Blocker[\(label)]")
            if !isRetaining {
                Log.popGesture.warning("Blocker[\(self.label, privacy: .public)] retain deferred (no nav yet)")
            }
        }

        private func releaseSuppression() {
            guard isRetaining else { return }
            NavigationPopGestureSuppression.release(from: view, source: "Blocker[\(label)]")
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
        Log.popGesture.info("TabReorder suppress")
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
        Log.popGesture.info("TabReorder restore")
    }
}
