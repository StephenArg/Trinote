import UIKit

/// Process-wide interface orientation lock so the note-editor camera can force portrait.
/// Apple’s camera picker is portrait-only; a SwiftUI host that still advertises landscape
/// leaves the preview black or stretched.
final class AppDelegate: NSObject, UIApplicationDelegate {
    static let lockPortraitOrientationKey = "lockPortraitOrientation"
    static let defaultOrientationMask: UIInterfaceOrientationMask = .allButUpsideDown

    static var preferredOrientationMask: UIInterfaceOrientationMask {
        UserDefaults.standard.bool(forKey: lockPortraitOrientationKey) ? .portrait : defaultOrientationMask
    }

    @MainActor
    private static var orientationLock: UIInterfaceOrientationMask = defaultOrientationMask

    @MainActor
    private static var maskBeforeTemporaryLock: UIInterfaceOrientationMask?

    func application(
        _ application: UIApplication,
        supportedInterfaceOrientationsFor window: UIWindow?
    ) -> UIInterfaceOrientationMask {
        MainActor.assumeIsolated { Self.orientationLock }
    }

    /// Restrict allowed orientations and ask the foreground scene to match.
    @MainActor
    static func lock(_ mask: UIInterfaceOrientationMask) {
        orientationLock = mask
        applyGeometryUpdate(mask)
    }

    /// Lock to `mask` while remembering the previous mask for `restore()`.
    @MainActor
    static func lockTemporarily(_ mask: UIInterfaceOrientationMask) {
        if maskBeforeTemporaryLock == nil {
            maskBeforeTemporaryLock = orientationLock
        }
        lock(mask)
    }

    /// Restore the mask from before the last `lockTemporarily`.
    @MainActor
    static func restore() {
        let previous = maskBeforeTemporaryLock ?? preferredOrientationMask
        maskBeforeTemporaryLock = nil
        lock(previous)
    }

    /// Applies the portrait-lock setting from Settings (skipped while a temporary lock is active).
    @MainActor
    static func applyUserOrientationPreference() {
        guard maskBeforeTemporaryLock == nil else { return }
        lock(preferredOrientationMask)
    }

    @MainActor
    static var isInterfaceLandscape: Bool {
        guard let orientation = foregroundWindowScene?.interfaceOrientation else {
            return false
        }
        return orientation.isLandscape
    }

    /// Waits until the foreground scene’s interface orientation is in `mask`, then calls `completion`.
    /// Times out after a short poll so a failed geometry update still presents the camera.
    @MainActor
    static func waitUntilInterfaceMatches(
        _ mask: UIInterfaceOrientationMask,
        completion: @escaping () -> Void
    ) {
        applyGeometryUpdate(mask)
        if interfaceMatches(mask) {
            completion()
            return
        }
        Task { @MainActor in
            for _ in 0..<15 {
                try? await Task.sleep(for: .milliseconds(40))
                if interfaceMatches(mask) { break }
            }
            completion()
        }
    }

    @MainActor
    private static func interfaceMatches(_ mask: UIInterfaceOrientationMask) -> Bool {
        guard let orientation = foregroundWindowScene?.interfaceOrientation else {
            return false
        }
        return mask.contains(Self.mask(for: orientation))
    }

    @MainActor
    private static func applyGeometryUpdate(_ mask: UIInterfaceOrientationMask) {
        guard let scene = foregroundWindowScene else { return }
        scene.keyWindow?.rootViewController?.setNeedsUpdateOfSupportedInterfaceOrientations()
        scene.requestGeometryUpdate(.iOS(interfaceOrientations: mask)) { error in
            Log.ui.error("Orientation geometry update failed: \(error.localizedDescription, privacy: .public)")
        }
    }

    @MainActor
    static var foregroundWindowScene: UIWindowScene? {
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        return scenes.first(where: { $0.activationState == .foregroundActive }) ?? scenes.first
    }

    private static func mask(for orientation: UIInterfaceOrientation) -> UIInterfaceOrientationMask {
        switch orientation {
        case .portrait: return .portrait
        case .portraitUpsideDown: return .portraitUpsideDown
        case .landscapeLeft: return .landscapeLeft
        case .landscapeRight: return .landscapeRight
        default: return []
        }
    }
}
