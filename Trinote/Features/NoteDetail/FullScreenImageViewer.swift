import SwiftUI
import UIKit

/// Full-screen, photo-app–style image viewer used by read-only note views.
///
/// Supports pinch-to-zoom, double-tap-to-zoom, pan when zoomed, swipe-down-to-dismiss when at
/// fit-scale, plus close + share buttons. Designed to be presented via `.fullScreenCover`.
struct FullScreenImageViewer: View {
    let image: UIImage
    let title: String?
    let onDismiss: () -> Void

    @State private var scale: CGFloat = 1
    @State private var lastScale: CGFloat = 1
    @State private var offset: CGSize = .zero
    @State private var lastOffset: CGSize = .zero
    @State private var dismissDrag: CGFloat = 0
    @State private var showShareSheet = false

    private let minScale: CGFloat = 1
    private let maxScale: CGFloat = 6
    private let doubleTapScale: CGFloat = 2.5

    var body: some View {
        GeometryReader { proxy in
            ZStack {
                // Background fades as the user drags the image down to dismiss, mirroring
                // iOS Photos. `dismissDrag` is only non-zero while the image is at fit scale.
                let dragProgress = min(abs(dismissDrag) / max(proxy.size.height, 1), 1)
                Color.black
                    .opacity(1 - dragProgress * 0.85)
                    .ignoresSafeArea()

                Image(uiImage: image)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: proxy.size.width, height: proxy.size.height)
                    .scaleEffect(scale)
                    .offset(x: offset.width, y: offset.height + dismissDrag)
                    .gesture(magnification(in: proxy.size))
                    .simultaneousGesture(panGesture(in: proxy.size))
                    .onTapGesture(count: 2) { handleDoubleTap() }

                topBar
            }
            .contentShape(Rectangle())
        }
        .background(Color.black.ignoresSafeArea())
        .statusBarHidden(true)
        .preferredColorScheme(.dark)
        .sheet(isPresented: $showShareSheet) {
            ShareSheet(items: [image])
        }
        .accessibilityAction(named: Text(String(localized: "Close", comment: "Close full-screen image"))) {
            dismiss()
        }
    }

    // MARK: - Top bar

    private var topBar: some View {
        VStack {
            HStack {
                Button(action: dismiss) {
                    Image(systemName: "xmark")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(.white)
                        .frame(width: 36, height: 36)
                        .background(Color.black.opacity(0.45), in: Circle())
                }
                .accessibilityLabel(String(localized: "Close", comment: "Close full-screen image"))

                Spacer()

                Button { showShareSheet = true } label: {
                    Image(systemName: "square.and.arrow.up")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(.white)
                        .frame(width: 36, height: 36)
                        .background(Color.black.opacity(0.45), in: Circle())
                }
                .accessibilityLabel(String(localized: "Share Image", comment: "Share full-screen image"))
            }
            .padding(.horizontal, 16)
            .padding(.top, 8)

            Spacer()
        }
        .opacity(scale > minScale + 0.01 ? 0.35 : 1)
        .animation(.easeInOut(duration: 0.18), value: scale)
    }

    // MARK: - Gestures

    private func magnification(in size: CGSize) -> some Gesture {
        MagnificationGesture()
            .onChanged { value in
                let newScale = min(max(lastScale * value, minScale * 0.7), maxScale)
                scale = newScale
            }
            .onEnded { _ in
                if scale < minScale {
                    withAnimation(.spring(response: 0.32, dampingFraction: 0.86)) {
                        scale = minScale
                        offset = .zero
                        lastOffset = .zero
                    }
                } else if scale > maxScale {
                    withAnimation(.spring(response: 0.32, dampingFraction: 0.86)) {
                        scale = maxScale
                    }
                }
                lastScale = scale
                clampOffset(in: size)
            }
    }

    private func panGesture(in size: CGSize) -> some Gesture {
        DragGesture()
            .onChanged { value in
                if scale <= minScale + 0.01 {
                    // At fit scale: only allow downward drag for swipe-to-dismiss.
                    dismissDrag = max(0, value.translation.height)
                } else {
                    offset = CGSize(
                        width: lastOffset.width + value.translation.width,
                        height: lastOffset.height + value.translation.height
                    )
                }
            }
            .onEnded { value in
                if scale <= minScale + 0.01 {
                    let shouldDismiss = value.translation.height > 120 ||
                        (value.translation.height > 40 && value.predictedEndTranslation.height > 220)
                    if shouldDismiss {
                        dismiss()
                    } else {
                        withAnimation(.spring(response: 0.32, dampingFraction: 0.86)) {
                            dismissDrag = 0
                        }
                    }
                } else {
                    lastOffset = offset
                    clampOffset(in: size)
                }
            }
    }

    private func handleDoubleTap() {
        withAnimation(.spring(response: 0.32, dampingFraction: 0.86)) {
            if scale > minScale + 0.01 {
                scale = minScale
                lastScale = minScale
                offset = .zero
                lastOffset = .zero
            } else {
                scale = doubleTapScale
                lastScale = doubleTapScale
            }
        }
    }

    /// Keeps the image from being panned past the visible bounds when zoomed in.
    private func clampOffset(in size: CGSize) {
        guard scale > minScale else {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.86)) {
                offset = .zero
                lastOffset = .zero
            }
            return
        }
        let imgSize = image.size
        guard imgSize.width > 0, imgSize.height > 0, size.width > 0, size.height > 0 else { return }
        // Approximate the rendered fit-size of the image, then scale by the current zoom.
        let aspectFit = min(size.width / imgSize.width, size.height / imgSize.height)
        let renderedW = imgSize.width * aspectFit * scale
        let renderedH = imgSize.height * aspectFit * scale
        let maxX = max(0, (renderedW - size.width) / 2)
        let maxY = max(0, (renderedH - size.height) / 2)
        let clamped = CGSize(
            width: min(max(offset.width, -maxX), maxX),
            height: min(max(offset.height, -maxY), maxY)
        )
        if clamped != offset {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.86)) {
                offset = clamped
                lastOffset = clamped
            }
        } else {
            lastOffset = offset
        }
    }

    private func dismiss() {
        withAnimation(.easeOut(duration: 0.18)) {
            dismissDrag = 0
        }
        onDismiss()
    }
}
