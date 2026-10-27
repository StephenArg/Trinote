import SwiftUI

/// Full-screen "Connecting…" page shown over the login form (and the SSO cover) while Trinote signs in or
/// reconnects to a server. Looks like the launch screen so the app has one loading identity.
struct ConnectingView: View {
    let state: AuthViewModel.ConnectingState
    var onCancel: (() -> Void)? = nil

    @State private var showsSlowHint = false

    var body: some View {
        ZStack {
            Color(.systemBackground)
                .ignoresSafeArea()

            VStack(spacing: 28) {
                PulsingLaunchAppMark(size: 88, useTransparentGlyphForBootstrap: true)

                VStack(spacing: 6) {
                    Text(state.title)
                        .font(.title3.weight(.semibold))
                        .multilineTextAlignment(.center)
                    if let detail = state.detail, !detail.isEmpty {
                        Text(detail)
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                            .truncationMode(.middle)
                    }
                }

                Text(String(localized: "Still trying to reach the server. Check the address and that your server is online.", comment: "Connecting screen hint after several seconds"))
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .opacity(showsSlowHint ? 1 : 0)
                    .accessibilityHidden(!showsSlowHint)
            }
            .padding(.horizontal, 32)
            .frame(maxWidth: 420)
            .accessibilityElement(children: .combine)
            .accessibilityAddTraits(.updatesFrequently)
        }
        .safeAreaInset(edge: .bottom) {
            if state.isCancellable, let onCancel {
                Button(role: .cancel, action: onCancel) {
                    Text(String(localized: "Cancel", comment: "Cancel connecting"))
                        .fontWeight(.semibold)
                        .frame(maxWidth: .infinity, minHeight: 50)
                }
                .buttonStyle(.bordered)
                .buttonBorderShape(.roundedRectangle(radius: 14))
                .padding(.horizontal, 24)
                .padding(.bottom, 8)
                .frame(maxWidth: 420)
            }
        }
        .task {
            try? await Task.sleep(for: .seconds(8))
            guard !Task.isCancelled else { return }
            withAnimation(.easeInOut(duration: 0.3)) { showsSlowHint = true }
        }
    }
}

#Preview("Connecting") {
    ConnectingView(
        state: .init(title: "Connecting to Home…", detail: "trilium.example.com", isCancellable: true),
        onCancel: {}
    )
}
