import SwiftUI
import UIKit

/// Full-screen, photo-app–style image viewer used by read-only note views.
///
/// Zoom and pan run through a `UIScrollView` so a two-finger pinch can drag and scale at the
/// same time (SwiftUI’s `MagnificationGesture` + `DragGesture` cannot share that touch stream).
/// Swipe-down-to-dismiss still applies only while the image is at fit scale.
struct FullScreenImageViewer: View {
    let image: UIImage
    let title: String?
    let onDismiss: () -> Void

    @State private var isZoomed = false
    @State private var dismissDrag: CGFloat = 0
    @State private var showShareSheet = false

    var body: some View {
        GeometryReader { proxy in
            ZStack {
                let dragProgress = min(abs(dismissDrag) / max(proxy.size.height, 1), 1)
                Color.black
                    .opacity(1 - dragProgress * 0.85)
                    .ignoresSafeArea()

                ZoomableImageScrollView(
                    image: image,
                    maxRelativeScale: 6,
                    doubleTapRelativeScale: 2.5,
                    onZoomedChanged: { zoomed in
                        if isZoomed != zoomed {
                            isZoomed = zoomed
                        }
                    },
                    onDismissDragChanged: { translation in
                        dismissDrag = translation
                    },
                    onDismissDragEnded: { translation, predicted in
                        let shouldDismiss = translation > 120 ||
                            (translation > 40 && predicted > 220)
                        if shouldDismiss {
                            dismiss()
                        } else {
                            withAnimation(.spring(response: 0.32, dampingFraction: 0.86)) {
                                dismissDrag = 0
                            }
                        }
                    }
                )
                .offset(y: dismissDrag)

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
        .opacity(isZoomed ? 0.35 : 1)
        .animation(.easeInOut(duration: 0.18), value: isZoomed)
    }

    private func dismiss() {
        // Leaving `dismissDrag` where it is lets the cover carry the image off in one motion. Animating
        // it back to 0 first ran concurrently with the cover's slide-out and briefly flashed the image
        // back into center before it disappeared.
        onDismiss()
    }
}

/// UIScrollView subclass that pushes a hook on every `layoutSubviews`, so the coordinator can react
/// to the first real bounds (SwiftUI does not re-invoke `updateUIView` for UIKit-driven size changes).
private final class ZoomableScrollView: UIScrollView {
    var onLayoutSubviews: ((UIScrollView) -> Void)?

    override func layoutSubviews() {
        super.layoutSubviews()
        onLayoutSubviews?(self)
    }
}

// MARK: - UIScrollView zoom host

/// UIKit zoom host: pinch and pan share one recognizer graph, so two fingers can drag while zooming.
private struct ZoomableImageScrollView: UIViewRepresentable {
    let image: UIImage
    /// Maximum zoom as a multiple of the fit-to-screen scale (Photos-style).
    let maxRelativeScale: CGFloat
    let doubleTapRelativeScale: CGFloat
    let onZoomedChanged: (Bool) -> Void
    let onDismissDragChanged: (CGFloat) -> Void
    let onDismissDragEnded: (_ translation: CGFloat, _ predicted: CGFloat) -> Void

    func makeCoordinator() -> Coordinator {
        Coordinator(
            onZoomedChanged: onZoomedChanged,
            onDismissDragChanged: onDismissDragChanged,
            onDismissDragEnded: onDismissDragEnded
        )
    }

    func makeUIView(context: Context) -> UIScrollView {
        let scroll = ZoomableScrollView()
        scroll.delegate = context.coordinator
        scroll.onLayoutSubviews = { [weak coordinator = context.coordinator] scrollView in
            guard let coordinator else { return }
            let size = scrollView.bounds.size
            guard size != coordinator.lastBoundsSize else { return }
            coordinator.lastBoundsSize = size
            // First real bounds after mount: SwiftUI does not call `updateUIView` for a size change
            // coming from UIKit layout, so without this pass the image would stay at natural pixel
            // size (i.e. show a corner of a full-resolution photo).
            coordinator.layoutImage(in: scrollView, resettingZoom: true)
        }
        scroll.backgroundColor = .clear
        scroll.showsVerticalScrollIndicator = false
        scroll.showsHorizontalScrollIndicator = false
        scroll.bouncesZoom = true
        scroll.alwaysBounceVertical = false
        scroll.alwaysBounceHorizontal = false
        scroll.contentInsetAdjustmentBehavior = .never
        scroll.decelerationRate = .fast

        let imageView = UIImageView(image: image)
        imageView.contentMode = .scaleAspectFit
        imageView.isUserInteractionEnabled = true
        imageView.backgroundColor = .clear
        scroll.addSubview(imageView)

        context.coordinator.scrollView = scroll
        context.coordinator.imageView = imageView
        context.coordinator.maxRelativeScale = maxRelativeScale
        context.coordinator.doubleTapRelativeScale = doubleTapRelativeScale

        let doubleTap = UITapGestureRecognizer(
            target: context.coordinator,
            action: #selector(Coordinator.handleDoubleTap(_:))
        )
        doubleTap.numberOfTapsRequired = 2
        scroll.addGestureRecognizer(doubleTap)

        let dismissPan = UIPanGestureRecognizer(
            target: context.coordinator,
            action: #selector(Coordinator.handleDismissPan(_:))
        )
        dismissPan.delegate = context.coordinator
        dismissPan.maximumNumberOfTouches = 1
        scroll.addGestureRecognizer(dismissPan)
        context.coordinator.dismissPan = dismissPan
        // At fit scale scrolling is off so this pan owns swipe-to-dismiss; once zoomed,
        // `isScrollEnabled` turns on and UIScrollView pans (including during an active pinch).
        scroll.isScrollEnabled = false

        return scroll
    }

    func updateUIView(_ scroll: UIScrollView, context: Context) {
        let coordinator = context.coordinator
        coordinator.onZoomedChanged = onZoomedChanged
        coordinator.onDismissDragChanged = onDismissDragChanged
        coordinator.onDismissDragEnded = onDismissDragEnded
        coordinator.maxRelativeScale = maxRelativeScale
        coordinator.doubleTapRelativeScale = doubleTapRelativeScale

        if coordinator.imageView?.image !== image {
            coordinator.imageView?.image = image
            coordinator.needsLayoutPass = true
        }

        let boundsChanged = scroll.bounds.size != coordinator.lastBoundsSize
        if boundsChanged || coordinator.needsLayoutPass {
            coordinator.lastBoundsSize = scroll.bounds.size
            coordinator.needsLayoutPass = false
            coordinator.layoutImage(in: scroll, resettingZoom: true)
        }
    }

    final class Coordinator: NSObject, UIScrollViewDelegate, UIGestureRecognizerDelegate {
        weak var scrollView: UIScrollView?
        weak var imageView: UIImageView?
        weak var dismissPan: UIPanGestureRecognizer?
        var maxRelativeScale: CGFloat = 6
        var doubleTapRelativeScale: CGFloat = 2.5
        var onZoomedChanged: (Bool) -> Void
        var onDismissDragChanged: (CGFloat) -> Void
        var onDismissDragEnded: (CGFloat, CGFloat) -> Void
        var lastBoundsSize: CGSize = .zero
        var needsLayoutPass = true
        private var reportedZoomed = false
        private var fitScale: CGFloat = 1

        init(
            onZoomedChanged: @escaping (Bool) -> Void,
            onDismissDragChanged: @escaping (CGFloat) -> Void,
            onDismissDragEnded: @escaping (CGFloat, CGFloat) -> Void
        ) {
            self.onZoomedChanged = onZoomedChanged
            self.onDismissDragChanged = onDismissDragChanged
            self.onDismissDragEnded = onDismissDragEnded
        }

        func viewForZooming(in scrollView: UIScrollView) -> UIView? {
            imageView
        }

        func scrollViewDidZoom(_ scrollView: UIScrollView) {
            centerImage(in: scrollView)
            let zoomed = scrollView.zoomScale > fitScale + 0.02
            scrollView.isScrollEnabled = zoomed
            publishZoomedIfNeeded(scrollView)
        }

        func scrollViewDidEndZooming(_ scrollView: UIScrollView, with view: UIView?, atScale scale: CGFloat) {
            if scale < fitScale + 0.01 {
                scrollView.setZoomScale(fitScale, animated: true)
            }
            let zoomed = scrollView.zoomScale > fitScale + 0.02
            scrollView.isScrollEnabled = zoomed
            publishZoomedIfNeeded(scrollView)
        }

        func scrollViewDidScroll(_ scrollView: UIScrollView) {
            publishZoomedIfNeeded(scrollView)
        }

        // MARK: Double-tap

        @objc func handleDoubleTap(_ gesture: UITapGestureRecognizer) {
            guard let scrollView, let imageView else { return }
            if scrollView.zoomScale > fitScale + 0.01 {
                scrollView.setZoomScale(fitScale, animated: true)
                return
            }
            let point = gesture.location(in: imageView)
            let target = min(fitScale * doubleTapRelativeScale, scrollView.maximumZoomScale)
            let size = scrollView.bounds.size
            let width = size.width / target
            let height = size.height / target
            let rect = CGRect(
                x: point.x - width / 2,
                y: point.y - height / 2,
                width: width,
                height: height
            )
            scrollView.zoom(to: rect, animated: true)
        }

        // MARK: Swipe-down dismiss (fit scale only)

        @objc func handleDismissPan(_ gesture: UIPanGestureRecognizer) {
            guard let scrollView else { return }
            let translation = gesture.translation(in: scrollView)
            let velocity = gesture.velocity(in: scrollView)

            switch gesture.state {
            case .changed:
                onDismissDragChanged(max(0, translation.y))
            case .ended, .cancelled, .failed:
                let predicted = translation.y + velocity.y * 0.2
                onDismissDragEnded(max(0, translation.y), predicted)
            default:
                break
            }
        }

        func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
            guard gestureRecognizer === dismissPan, let scrollView, let dismissPan else {
                return true
            }
            // Only intercept one-finger vertical swipes while the image is at fit scale.
            guard scrollView.zoomScale <= fitScale + 0.02 else { return false }
            let velocity = dismissPan.velocity(in: scrollView)
            return velocity.y > 0 && abs(velocity.y) > abs(velocity.x)
        }

        func gestureRecognizer(
            _ gestureRecognizer: UIGestureRecognizer,
            shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
        ) -> Bool {
            false
        }

        // MARK: Layout

        func layoutImage(in scrollView: UIScrollView, resettingZoom: Bool) {
            guard let imageView, let image = imageView.image else { return }
            let bounds = scrollView.bounds
            guard bounds.width > 1, bounds.height > 1, image.size.width > 0, image.size.height > 0 else {
                return
            }

            imageView.frame = CGRect(origin: .zero, size: image.size)
            scrollView.contentSize = image.size

            let widthScale = bounds.width / image.size.width
            let heightScale = bounds.height / image.size.height
            let fit = min(widthScale, heightScale)
            fitScale = fit

            scrollView.minimumZoomScale = fit
            scrollView.maximumZoomScale = fit * maxRelativeScale

            if resettingZoom {
                scrollView.zoomScale = fit
            } else {
                scrollView.zoomScale = min(max(scrollView.zoomScale, fit), fit * maxRelativeScale)
            }

            let zoomed = scrollView.zoomScale > fitScale + 0.02
            scrollView.isScrollEnabled = zoomed
            centerImage(in: scrollView, resettingOffset: resettingZoom)
            publishZoomedIfNeeded(scrollView)
        }

        private func centerImage(in scrollView: UIScrollView, resettingOffset: Bool = false) {
            guard let imageView else { return }
            let bounds = scrollView.bounds.size
            let frame = imageView.frame
            let insetX = max(0, (bounds.width - frame.width) / 2)
            let insetY = max(0, (bounds.height - frame.height) / 2)
            scrollView.contentInset = UIEdgeInsets(top: insetY, left: insetX, bottom: insetY, right: insetX)
            // `contentInset` extends the scrollable area but does not move existing content. When the
            // fit-scaled image is smaller than the bounds, it lands at `contentOffset = (0, 0)` — top-left
            // — with the centering inset sitting above it as empty scroll space. Placing the offset at
            // `(-insetX, -insetY)` puts the content inside its inset area, which is the visual center.
            if resettingOffset {
                scrollView.contentOffset = CGPoint(x: -insetX, y: -insetY)
            }
        }

        private func publishZoomedIfNeeded(_ scrollView: UIScrollView) {
            let zoomed = scrollView.zoomScale > fitScale + 0.02
            guard zoomed != reportedZoomed else { return }
            reportedZoomed = zoomed
            DispatchQueue.main.async { [onZoomedChanged] in
                onZoomedChanged(zoomed)
            }
        }
    }
}
