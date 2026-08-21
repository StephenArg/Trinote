import Photos
import PhotosUI
import SwiftUI
import UIKit

enum PhotoLibraryAccess: Equatable {
    case notDetermined
    case authorized
    case limited
    case denied
}

enum PhotoLibraryAuthorization {
    static func current() -> PhotoLibraryAccess {
        map(PHPhotoLibrary.authorizationStatus(for: .readWrite))
    }

    static func request() async -> PhotoLibraryAccess {
        let status = await PHPhotoLibrary.requestAuthorization(for: .readWrite)
        return map(status)
    }

    @MainActor
    static func openSettings() {
        guard let url = URL(string: UIApplication.openSettingsURLString) else { return }
        UIApplication.shared.open(url)
    }

    private static func map(_ status: PHAuthorizationStatus) -> PhotoLibraryAccess {
        switch status {
        case .authorized:
            return .authorized
        case .limited:
            return .limited
        case .notDetermined:
            return .notDetermined
        default:
            return .denied
        }
    }
}

/// Zero-size host so `PHPhotoLibrary.presentLimitedLibraryPicker` has a `UIViewController`.
struct LimitedLibraryPickerHost: UIViewControllerRepresentable {
    @Binding var isPresented: Bool

    func makeCoordinator() -> Coordinator {
        Coordinator(isPresented: $isPresented)
    }

    func makeUIViewController(context: Context) -> HostController {
        let controller = HostController()
        controller.coordinator = context.coordinator
        return controller
    }

    func updateUIViewController(_ uiViewController: HostController, context: Context) {
        context.coordinator.isPresented = $isPresented
        uiViewController.coordinator = context.coordinator
        if isPresented {
            uiViewController.presentLimitedPicker()
        }
    }

    final class Coordinator {
        var isPresented: Binding<Bool>

        init(isPresented: Binding<Bool>) {
            self.isPresented = isPresented
        }
    }

    final class HostController: UIViewController {
        var coordinator: Coordinator?
        private var isPresenting = false

        override func viewDidLoad() {
            super.viewDidLoad()
            view.isUserInteractionEnabled = false
            view.backgroundColor = .clear
            view.isOpaque = false
        }

        func presentLimitedPicker() {
            guard !isPresenting, view.window != nil else { return }
            isPresenting = true
            PHPhotoLibrary.shared().presentLimitedLibraryPicker(from: self) { [weak self] _ in
                Task { @MainActor [weak self] in
                    self?.isPresenting = false
                    self?.coordinator?.isPresented.wrappedValue = false
                }
            }
        }
    }
}
