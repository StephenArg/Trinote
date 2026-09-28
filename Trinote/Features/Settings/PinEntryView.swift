import SwiftUI
import UIKit

private enum PinEntryHaptics {
    private static let medium = UIImpactFeedbackGenerator(style: .medium)
    private static let notification = UINotificationFeedbackGenerator()

    static func keypadTap() {
        medium.prepare()
        medium.impactOccurred(intensity: 1.0)
    }

    static func rejected() {
        notification.notificationOccurred(.error)
    }
}

/// App PIN lengths offered in PIN setup. Only the PIN's hash is in the keychain, so the length is kept
/// under `storageKey`; PINs set before 6 digits existed have no stored value and are 4 digits.
enum AppPinLength {
    static let storageKey = "appPinLength"
    static let `default` = 4
    static let options = [4, 6]
}

/// What `PinEntryView` does with the entered digits once the caller has checked them.
enum PinEntryResult {
    /// Accepted and the screen is going away: keep the dots filled.
    case done
    /// Accepted and the caller moved to its next step: clear the dots for the next entry.
    case advance
    /// Wrong PIN: shake, then clear the dots.
    case rejected
}

enum PinEntryIcon {
    case appMark
    case symbol(String)
}

/// Full-screen PIN keypad shared by the lock screen and PIN setup.
struct PinEntryView<Accessory: View>: View {
    let title: String
    let subtitle: String
    /// Shown in place of the subtitle; cleared when the user starts typing again.
    @Binding var errorMessage: String?
    let pinLength: Int
    let icon: PinEntryIcon
    /// When not `.none`, the keypad's bottom-left key offers biometric unlock.
    let biometricKind: BiometricKind
    let onBiometric: (() -> Void)?
    let onComplete: @MainActor (String) async -> PinEntryResult
    let accessory: Accessory

    @State private var digits: [String] = []
    @State private var isSubmitting = false
    @State private var isShowingRejection = false
    @State private var shakeCount = 0

    init(
        title: String,
        subtitle: String,
        errorMessage: Binding<String?>,
        pinLength: Int,
        icon: PinEntryIcon = .appMark,
        biometricKind: BiometricKind = .none,
        onBiometric: (() -> Void)? = nil,
        onComplete: @escaping @MainActor (String) async -> PinEntryResult,
        @ViewBuilder accessory: () -> Accessory
    ) {
        self.title = title
        self.subtitle = subtitle
        self._errorMessage = errorMessage
        self.pinLength = pinLength
        self.icon = icon
        self.biometricKind = biometricKind
        self.onBiometric = onBiometric
        self.onComplete = onComplete
        self.accessory = accessory()
    }

    var body: some View {
        // Largest layout that fits: roomy portrait, tighter portrait (small phones, sheets), then side by side (landscape).
        ViewThatFits(in: .vertical) {
            stackedLayout(metrics: .regular)
            stackedLayout(metrics: .compact)
            sideBySideLayout(metrics: .landscape)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(.horizontal, 16)
        .background { PinEntryBackground() }
        .onChange(of: pinLength) { _, _ in
            digits = []
        }
    }

    // MARK: - Layouts

    private func stackedLayout(metrics: PinEntryMetrics) -> some View {
        VStack(spacing: metrics.sectionSpacing) {
            header(metrics: metrics)
            accessory
            dots
            keypad(metrics: metrics)
        }
        .padding(.vertical, 20)
    }

    private func sideBySideLayout(metrics: PinEntryMetrics) -> some View {
        HStack(spacing: 48) {
            VStack(spacing: metrics.sectionSpacing) {
                header(metrics: metrics)
                accessory
                dots
            }
            .frame(maxWidth: 320)
            keypad(metrics: metrics)
        }
        .padding(.vertical, 12)
    }

    // MARK: - Header

    private func header(metrics: PinEntryMetrics) -> some View {
        VStack(spacing: 12) {
            iconView(size: metrics.iconSize)

            VStack(spacing: 6) {
                Text(title)
                    .font(.title2.weight(.semibold))
                    .multilineTextAlignment(.center)
                    .id(title)
                    .transition(.opacity)

                Text(errorMessage ?? subtitle)
                    .font(.subheadline)
                    .foregroundStyle(errorMessage == nil ? AnyShapeStyle(.secondary) : AnyShapeStyle(.red))
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
                    .contentTransition(.opacity)
            }
            .animation(.easeInOut(duration: 0.2), value: title)
            .animation(.easeInOut(duration: 0.2), value: errorMessage)
        }
        .accessibilityElement(children: .combine)
    }

    @ViewBuilder
    private func iconView(size: CGFloat) -> some View {
        switch icon {
        case .appMark:
            LaunchAppMark(size: size)
                .shadow(color: .black.opacity(0.12), radius: 8, y: 3)
        case .symbol(let name):
            Image(systemName: name)
                .font(.system(size: size * 0.42, weight: .semibold))
                .foregroundStyle(.tint)
                .frame(width: size, height: size)
                .background(Circle().fill(.tint.opacity(0.14)))
                .contentTransition(.symbolEffect(.replace))
                .accessibilityHidden(true)
        }
    }

    // MARK: - Dots

    private var dots: some View {
        HStack(spacing: pinLength > 4 ? 16 : 22) {
            ForEach(0..<pinLength, id: \.self) { index in
                let isFilled = index < digits.count
                ZStack {
                    Circle()
                        .strokeBorder(Color.primary.opacity(0.28), lineWidth: 1.5)
                        .opacity(isFilled ? 0 : 1)
                    Circle()
                        .fill(isShowingRejection ? AnyShapeStyle(.red) : AnyShapeStyle(.tint))
                        .scaleEffect(isFilled ? 1 : 0.4)
                        .opacity(isFilled ? 1 : 0)
                }
                .frame(width: 14, height: 14)
                .animation(.spring(response: 0.22, dampingFraction: 0.55), value: isFilled)
            }
        }
        .padding(.vertical, 6)
        .keyframeAnimator(initialValue: 0.0, trigger: shakeCount) { content, offset in
            content.offset(x: offset)
        } keyframes: { _ in
            KeyframeTrack {
                CubicKeyframe(-16, duration: 0.06)
                CubicKeyframe(14, duration: 0.08)
                CubicKeyframe(-10, duration: 0.07)
                CubicKeyframe(7, duration: 0.06)
                CubicKeyframe(-3, duration: 0.05)
                CubicKeyframe(0, duration: 0.05)
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(
            String(localized: "\(digits.count) of \(pinLength) digits entered", comment: "PIN entry: VoiceOver progress")
        )
    }

    // MARK: - Keypad

    private func keypad(metrics: PinEntryMetrics) -> some View {
        Grid(horizontalSpacing: metrics.keySpacing.width, verticalSpacing: metrics.keySpacing.height) {
            ForEach([["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]], id: \.self) { row in
                GridRow {
                    ForEach(row, id: \.self) { digitKey($0, metrics: metrics) }
                }
            }
            GridRow {
                biometricKey(metrics: metrics)
                digitKey("0", metrics: metrics)
                deleteKey(metrics: metrics)
            }
        }
    }

    private func digitKey(_ digit: String, metrics: PinEntryMetrics) -> some View {
        Button {
            appendDigit(digit)
        } label: {
            VStack(spacing: 0) {
                Text(verbatim: digit)
                    .font(.system(size: metrics.keySize * 0.42, weight: .regular, design: .rounded))
                    .monospacedDigit()
                if metrics.showsLetters {
                    // Blank for 1 and 0 so every digit sits at the same height.
                    Text(verbatim: pinKeyLetters[digit] ?? " ")
                        .font(.system(size: metrics.keySize * 0.12, weight: .semibold))
                        .tracking(1.6)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .buttonStyle(PinDigitKeyStyle(diameter: metrics.keySize))
        .accessibilityLabel(Text(verbatim: digit))
    }

    @ViewBuilder
    private func biometricKey(metrics: PinEntryMetrics) -> some View {
        if biometricKind != .none, let onBiometric {
            Button(action: onBiometric) {
                Image(systemName: biometricKind.symbolName)
                    .font(.system(size: metrics.keySize * 0.36, weight: .regular))
                    .foregroundStyle(.tint)
            }
            .buttonStyle(PinUtilityKeyStyle(diameter: metrics.keySize))
            .accessibilityLabel(biometricKind.localizedUseButtonTitle)
        } else {
            Color.clear.frame(width: metrics.keySize, height: metrics.keySize)
        }
    }

    private func deleteKey(metrics: PinEntryMetrics) -> some View {
        Button {
            guard !digits.isEmpty, !isSubmitting else { return }
            PinEntryHaptics.keypadTap()
            digits.removeLast()
        } label: {
            Image(systemName: "delete.left")
                .font(.system(size: metrics.keySize * 0.3, weight: .regular))
        }
        .buttonStyle(PinUtilityKeyStyle(diameter: metrics.keySize))
        .opacity(digits.isEmpty ? 0 : 1)
        .animation(.easeInOut(duration: 0.15), value: digits.isEmpty)
        .disabled(digits.isEmpty)
        .accessibilityLabel(String(localized: "Delete", comment: "PIN keypad: delete last digit"))
        .accessibilityHidden(digits.isEmpty)
    }

    // MARK: - Entry

    private func appendDigit(_ digit: String) {
        guard digits.count < pinLength, !isSubmitting else { return }
        PinEntryHaptics.keypadTap()
        if digits.isEmpty { errorMessage = nil }
        digits.append(digit)
        guard digits.count == pinLength else { return }

        isSubmitting = true
        let pin = digits.joined()
        Task { @MainActor in
            // Let the last dot fill before the screen reacts.
            try? await Task.sleep(for: .milliseconds(150))
            switch await onComplete(pin) {
            case .done:
                break
            case .advance:
                digits = []
                isSubmitting = false
            case .rejected:
                PinEntryHaptics.rejected()
                isShowingRejection = true
                shakeCount += 1
                try? await Task.sleep(for: .milliseconds(450))
                digits = []
                isShowingRejection = false
                isSubmitting = false
            }
        }
    }
}

extension PinEntryView where Accessory == EmptyView {
    init(
        title: String,
        subtitle: String,
        errorMessage: Binding<String?>,
        pinLength: Int,
        icon: PinEntryIcon = .appMark,
        biometricKind: BiometricKind = .none,
        onBiometric: (() -> Void)? = nil,
        onComplete: @escaping @MainActor (String) async -> PinEntryResult
    ) {
        self.init(
            title: title,
            subtitle: subtitle,
            errorMessage: errorMessage,
            pinLength: pinLength,
            icon: icon,
            biometricKind: biometricKind,
            onBiometric: onBiometric,
            onComplete: onComplete,
            accessory: { EmptyView() }
        )
    }
}

/// Backdrop for PIN screens: the system background with a soft wash of the theme color at the top.
struct PinEntryBackground: View {
    var body: some View {
        ZStack {
            Color(.systemBackground)
            Rectangle()
                .fill(.tint)
                .opacity(0.13)
                .mask {
                    LinearGradient(colors: [.black, .clear], startPoint: .top, endPoint: .center)
                }
        }
        .ignoresSafeArea()
    }
}

// MARK: - Metrics & key styles

/// Phone-keypad letters under the digits, as on the system passcode screen.
private let pinKeyLetters: [String: String] = [
    "2": "ABC", "3": "DEF", "4": "GHI", "5": "JKL",
    "6": "MNO", "7": "PQRS", "8": "TUV", "9": "WXYZ",
]

private struct PinEntryMetrics {
    let keySize: CGFloat
    let keySpacing: CGSize
    let iconSize: CGFloat
    let sectionSpacing: CGFloat

    var showsLetters: Bool { keySize >= 64 }

    static let regular = PinEntryMetrics(keySize: 78, keySpacing: CGSize(width: 26, height: 16), iconSize: 64, sectionSpacing: 28)
    static let compact = PinEntryMetrics(keySize: 66, keySpacing: CGSize(width: 24, height: 12), iconSize: 48, sectionSpacing: 18)
    static let landscape = PinEntryMetrics(keySize: 54, keySpacing: CGSize(width: 22, height: 8), iconSize: 44, sectionSpacing: 14)
}

private struct PinDigitKeyStyle: ButtonStyle {
    let diameter: CGFloat

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .frame(width: diameter, height: diameter)
            .background {
                Circle().fill(Color.primary.opacity(configuration.isPressed ? 0.2 : 0.07))
            }
            .overlay {
                Circle().strokeBorder(Color.primary.opacity(0.06), lineWidth: 0.5)
            }
            .contentShape(Circle())
            .scaleEffect(configuration.isPressed ? 0.93 : 1)
            .animation(.easeOut(duration: configuration.isPressed ? 0.05 : 0.3), value: configuration.isPressed)
    }
}

private struct PinUtilityKeyStyle: ButtonStyle {
    let diameter: CGFloat

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .frame(width: diameter, height: diameter)
            .contentShape(Circle())
            .opacity(configuration.isPressed ? 0.45 : 1)
            .scaleEffect(configuration.isPressed ? 0.9 : 1)
            .animation(.easeOut(duration: 0.15), value: configuration.isPressed)
    }
}

extension BiometricKind {
    /// SF Symbol for keypad and button icons.
    var symbolName: String {
        switch self {
        case .none, .faceID: "faceid"
        case .touchID: "touchid"
        case .opticID: "opticid"
        }
    }
}
