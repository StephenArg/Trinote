import SwiftUI
import UIKit

/// Coordinates portrait lock for the note-editor camera, then presents via SwiftUI
/// `fullScreenCover` (not a UIKit `present`). UIKit presentation + geometry updates
/// were popping the note off the NavigationStack and dropping the captured image.
@MainActor
enum EditorCameraCapture {
    /// Locks to portrait (and waits if currently landscape) before `show`.
    static func preparePortraitSession(then show: @escaping () -> Void) {
        AppDelegate.lockTemporarily(.portrait)
        if AppDelegate.isInterfaceLandscape {
            AppDelegate.waitUntilInterfaceMatches(.portrait, completion: show)
        } else {
            show()
        }
    }

    static func endPortraitSession() {
        AppDelegate.restore()
    }
}

/// System camera in a SwiftUI cover. Kept as a representable child of `fullScreenCover`
/// so `@State` on the note editor (including `imageToInsert`) survives capture.
struct CameraPickerView: UIViewControllerRepresentable {
    @Binding var imageToInsert: String?
    var onDismiss: () -> Void

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(imageToInsert: $imageToInsert, onDismiss: onDismiss)
    }

    final class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        @Binding var imageToInsert: String?
        var onDismiss: () -> Void

        init(imageToInsert: Binding<String?>, onDismiss: @escaping () -> Void) {
            _imageToInsert = imageToInsert
            self.onDismiss = onDismiss
        }

        func imagePickerController(
            _ picker: UIImagePickerController,
            didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]
        ) {
            if let image = info[.originalImage] as? UIImage {
                let upright = image.normalizedToUpOrientation()
                if let data = upright.jpegData(compressionQuality: 0.8) {
                    imageToInsert = "data:image/jpeg;base64,\(data.base64EncodedString())"
                }
            }
            onDismiss()
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            onDismiss()
        }
    }
}

private extension UIImage {
    /// Bakes `imageOrientation` into pixels so the editor does not insert a sideways JPEG.
    func normalizedToUpOrientation() -> UIImage {
        guard imageOrientation != .up else { return self }
        let format = UIGraphicsImageRendererFormat.default()
        format.scale = scale
        format.opaque = false
        let renderer = UIGraphicsImageRenderer(size: size, format: format)
        return renderer.image { _ in
            draw(in: CGRect(origin: .zero, size: size))
        }
    }
}
