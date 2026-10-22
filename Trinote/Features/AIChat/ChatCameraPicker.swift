import SwiftUI
import UIKit

/// The system camera for a chat attachment: hands back the photo as an upright, scaled-down JPEG.
struct ChatCameraPicker: UIViewControllerRepresentable {
    var onImage: (Data) -> Void
    var onDismiss: () -> Void

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    func makeCoordinator() -> Coordinator { Coordinator(onImage: onImage, onDismiss: onDismiss) }

    final class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        let onImage: (Data) -> Void
        let onDismiss: () -> Void

        init(onImage: @escaping (Data) -> Void, onDismiss: @escaping () -> Void) {
            self.onImage = onImage
            self.onDismiss = onDismiss
        }

        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
            if let image = info[.originalImage] as? UIImage, let data = ChatAttachments.jpegData(image) {
                onImage(data)
            }
            onDismiss()
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            onDismiss()
        }
    }
}
