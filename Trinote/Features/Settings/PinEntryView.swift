import SwiftUI
import UIKit

private enum PinEntryHaptics {
    private static let medium = UIImpactFeedbackGenerator(style: .medium)

    static func keypadTap() {
        medium.prepare()
        medium.impactOccurred(intensity: 1.0)
    }
}

struct PinEntryView: View {
    let title: String
    let subtitle: String?
    let onComplete: (String) -> Void

    @State private var digits: [String] = []
    @State private var shake = false

    private let pinLength = 4

    init(
        title: String,
        subtitle: String? = nil,
        onComplete: @escaping (String) -> Void
    ) {
        self.title = title
        self.subtitle = subtitle
        self.onComplete = onComplete
    }

    var body: some View {
        VStack(spacing: 32) {
            Spacer()

            VStack(spacing: 8) {
                Text(title)
                    .font(.title2.weight(.semibold))
                if let subtitle {
                    Text(subtitle)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }
            }

            dotIndicators
                .offset(x: shake ? -12 : 0)

            keypad

            Spacer()
            Spacer()
        }
        .padding()
    }

    // MARK: - Dot Indicators

    private var dotIndicators: some View {
        HStack(spacing: 16) {
            ForEach(0..<pinLength, id: \.self) { index in
                Circle()
                    .fill(index < digits.count ? Color.accentColor : Color(.tertiarySystemFill))
                    .frame(width: 14, height: 14)
                    .animation(.easeInOut(duration: 0.1), value: digits.count)
            }
        }
        .padding(.vertical, 8)
    }

    // MARK: - Keypad

    private var keypad: some View {
        Grid(horizontalSpacing: 24, verticalSpacing: 16) {
            GridRow {
                digitButton("1")
                digitButton("2")
                digitButton("3")
            }
            GridRow {
                digitButton("4")
                digitButton("5")
                digitButton("6")
            }
            GridRow {
                digitButton("7")
                digitButton("8")
                digitButton("9")
            }
            GridRow {
                Color.clear
                    .frame(width: 72, height: 72)
                digitButton("0")
                deleteButton
            }
        }
    }

    private func digitButton(_ digit: String) -> some View {
        Button {
            guard digits.count < pinLength else { return }
            PinEntryHaptics.keypadTap()
            digits.append(digit)
            if digits.count == pinLength {
                let pin = digits.joined()
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                    onComplete(pin)
                }
            }
        } label: {
            Text(digit)
                .font(.title.weight(.medium))
                .frame(width: 72, height: 72)
                .background(Color(.secondarySystemFill), in: Circle())
        }
        .buttonStyle(.plain)
    }

    private var deleteButton: some View {
        Button {
            guard !digits.isEmpty else { return }
            PinEntryHaptics.keypadTap()
            digits.removeLast()
        } label: {
            Image(systemName: "delete.backward")
                .font(.title2)
                .frame(width: 72, height: 72)
        }
        .buttonStyle(.plain)
        .disabled(digits.isEmpty)
        .opacity(digits.isEmpty ? 0.3 : 1)
    }

    // MARK: - Public reset with shake animation

    func shakeAndClear() {
        withAnimation(.default.speed(3).repeatCount(3, autoreverses: true)) {
            shake = true
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) {
            shake = false
            digits = []
        }
    }
}

/// Wrapper that manages shake state externally so callers can trigger it.
struct ManagedPinEntryView: View {
    let title: String
    let subtitle: String?
    let onComplete: (String) -> Void

    @Binding var triggerShake: Bool

    @State private var digits: [String] = []
    @State private var shakeOffset: CGFloat = 0

    private let pinLength = 4

    var body: some View {
        VStack(spacing: 32) {
            Spacer()

            VStack(spacing: 8) {
                Text(title)
                    .font(.title2.weight(.semibold))
                if let subtitle {
                    Text(subtitle)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }
            }

            dotIndicators
                .offset(x: shakeOffset)

            keypad

            Spacer()
            Spacer()
        }
        .padding()
        .onChange(of: triggerShake) { _, shouldShake in
            guard shouldShake else { return }
            withAnimation(.default.speed(3).repeatCount(3, autoreverses: true)) {
                shakeOffset = -12
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) {
                shakeOffset = 0
                digits = []
                triggerShake = false
            }
        }
    }

    private var dotIndicators: some View {
        HStack(spacing: 16) {
            ForEach(0..<pinLength, id: \.self) { index in
                Circle()
                    .fill(index < digits.count ? Color.accentColor : Color(.tertiarySystemFill))
                    .frame(width: 14, height: 14)
                    .animation(.easeInOut(duration: 0.1), value: digits.count)
            }
        }
        .padding(.vertical, 8)
    }

    private var keypad: some View {
        Grid(horizontalSpacing: 24, verticalSpacing: 16) {
            GridRow {
                digitButton("1")
                digitButton("2")
                digitButton("3")
            }
            GridRow {
                digitButton("4")
                digitButton("5")
                digitButton("6")
            }
            GridRow {
                digitButton("7")
                digitButton("8")
                digitButton("9")
            }
            GridRow {
                Color.clear
                    .frame(width: 72, height: 72)
                digitButton("0")
                deleteButton
            }
        }
    }

    private func digitButton(_ digit: String) -> some View {
        Button {
            guard digits.count < pinLength else { return }
            PinEntryHaptics.keypadTap()
            digits.append(digit)
            if digits.count == pinLength {
                let pin = digits.joined()
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                    onComplete(pin)
                }
            }
        } label: {
            Text(digit)
                .font(.title.weight(.medium))
                .frame(width: 72, height: 72)
                .background(Color(.secondarySystemFill), in: Circle())
        }
        .buttonStyle(.plain)
    }

    private var deleteButton: some View {
        Button {
            guard !digits.isEmpty else { return }
            PinEntryHaptics.keypadTap()
            digits.removeLast()
        } label: {
            Image(systemName: "delete.backward")
                .font(.title2)
                .frame(width: 72, height: 72)
        }
        .buttonStyle(.plain)
        .disabled(digits.isEmpty)
        .opacity(digits.isEmpty ? 0.3 : 1)
    }
}
