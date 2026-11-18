import SwiftUI
import UIKit

/// iPhone sideways typing. The on-screen keyboard covers about half of the short screen there, so while it's up the
/// note editors hide the note's top bar (it comes back when the keyboard goes down, with Back and ⋯) and their extra
/// rows, and offer a Hide Keyboard button instead.
enum LandscapeTyping {
    /// Shorter than this is a hardware keyboard's shortcut bar (or no keyboard), which leaves room for the top bar.
    static let minimumKeyboardHeight: CGFloat = 100

    /// Sideways on an iPhone: the only place the height is compact.
    static func appliesTo(verticalSizeClass: UserInterfaceSizeClass?) -> Bool {
        verticalSizeClass == .compact
    }

    /// The on-screen keyboard is up after `note`, a keyboard will-change-frame or will-hide notification.
    @MainActor
    static func softwareKeyboardRaised(after note: Notification) -> Bool {
        guard note.name != UIResponder.keyboardWillHideNotification else { return false }
        return softwareKeyboardRaised(keyboardFrameEnd: note.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect)
    }

    /// The on-screen keyboard is up with its end frame (screen coordinates) at `keyboardFrameEnd`; nil means it's
    /// going down. Measured against the window, not the editor: SwiftUI moves the editor above the keyboard, so the
    /// two don't overlap once the keyboard has come up.
    @MainActor
    static func softwareKeyboardRaised(keyboardFrameEnd: CGRect?) -> Bool {
        guard let frame = keyboardFrameEnd, let window = AppDelegate.foregroundWindowScene?.keyWindow else { return false }
        let keyboard = window.convert(frame, from: window.screen.coordinateSpace)
        return window.bounds.intersection(keyboard).height >= minimumKeyboardHeight
    }
}

/// The round Hide Keyboard button the Code and Markdown editors show while typing sideways (the text editor has
/// one at the end of its toolbar).
struct HideKeyboardButton: View {
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: "keyboard.chevron.compact.down")
                .font(.body.weight(.medium))
                .frame(width: 44, height: 36)
                .contentShape(Capsule())
        }
        .buttonStyle(.plain)
        .foregroundStyle(.primary)
        .background(.regularMaterial, in: Capsule())
        .overlay(Capsule().strokeBorder(Color.primary.opacity(0.08)))
        .shadow(color: .black.opacity(0.12), radius: 6, y: 2)
        .accessibilityLabel(String(localized: "Hide Keyboard", comment: "Button that lowers the on-screen keyboard while typing sideways"))
    }
}
