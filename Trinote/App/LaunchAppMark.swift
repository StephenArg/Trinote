import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

/// In-app branding mark. Uses `LaunchAppIcon` (light / dark / tinted) by default, or `BootstrapAppIcon` for cold launch / connecting (transparent glyph on `systemBackground`).
struct LaunchAppMark: View {
    var size: CGFloat = 72
    /// When `true`, uses `BootstrapAppIcon` (same art as the transparent App Icon dark master)—only for the first-load panels in `TrinoteApp`.
    var useTransparentGlyphForBootstrap: Bool = false

    private var launchIconCornerRadius: CGFloat { size * (16 / 72) }

    private var assetName: String {
        useTransparentGlyphForBootstrap ? "BootstrapAppIcon" : "LaunchAppIcon"
    }

    var body: some View {
        Group {
            #if canImport(UIKit)
            if UIImage(named: assetName) != nil {
                Image(assetName)
                    .resizable()
                    .interpolation(.high)
                    .aspectRatio(contentMode: .fit)
                    .frame(width: size, height: size)
                    // Fills letterboxing and matches rounded-clip edges to the scene (avoids white bleed-through).
                    .background(Color(.systemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: launchIconCornerRadius, style: .continuous))
            } else {
                fallbackMark
            }
            #else
            fallbackMark
            #endif
        }
        .accessibilityHidden(true)
    }

    private var fallbackMark: some View {
        Image(systemName: "note.text")
            .font(.system(size: size * 0.78))
            .foregroundStyle(.tint)
            .frame(width: size, height: size)
    }
}
