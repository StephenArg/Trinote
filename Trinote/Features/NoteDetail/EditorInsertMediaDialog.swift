import SwiftUI

/// Centered modal for picking an image or file to insert into the rich-text editor.
/// Replaces `confirmationDialog`, which on iPad presents as a top popover with an arrow.
struct EditorInsertMediaDialog: View {
    var showsCamera: Bool
    let onPhotoLibrary: () -> Void
    let onCamera: () -> Void
    let onChooseFile: () -> Void
    let onCancel: () -> Void

    var body: some View {
        ZStack {
            Color.black.opacity(0.35)
                .ignoresSafeArea()
                .onTapGesture(perform: onCancel)

            VStack(spacing: 0) {
                VStack(spacing: 8) {
                    Text(String(localized: "Add Image", comment: "Editor insert media dialog title"))
                        .font(.headline)
                    Text(
                        String(
                            localized: "Choose photo library, camera, or a file from your device.",
                            comment: "Editor insert media dialog subtitle"
                        )
                    )
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                }
                .padding(.horizontal, 20)
                .padding(.top, 20)
                .padding(.bottom, 16)

                Divider()

                optionRow(
                    title: String(localized: "Photo Library", comment: "Image source"),
                    systemImage: "photo.on.rectangle",
                    action: onPhotoLibrary
                )

                if showsCamera {
                    Divider()
                    optionRow(
                        title: String(localized: "Camera", comment: "Image source"),
                        systemImage: "camera",
                        action: onCamera
                    )
                }

                Divider()

                optionRow(
                    title: String(localized: "Choose File", comment: "File source for editor insert"),
                    systemImage: "folder",
                    action: onChooseFile
                )

                Divider()

                Button(action: onCancel) {
                    Text(String(localized: "Cancel", comment: "Image dialog"))
                        .font(.body.weight(.semibold))
                        .foregroundStyle(.primary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                }
                .buttonStyle(.plain)
            }
            .background(Color(.systemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .shadow(color: .black.opacity(0.18), radius: 24, y: 8)
            .frame(maxWidth: 320)
            .padding(.horizontal, 40)
        }
        .accessibilityAddTraits(.isModal)
    }

    private func optionRow(title: String, systemImage: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: systemImage)
                    .font(.body)
                    .frame(width: 22)
                Text(title)
                    .font(.body)
                Spacer(minLength: 0)
            }
            .foregroundStyle(.primary)
            .padding(.horizontal, 20)
            .padding(.vertical, 14)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}
