import SwiftUI
import UIKit

/// Bottom search bar for read-only note find: query field, previous/next match, close.
struct FindOnPageBar: View {
    @Bindable var control: FindOnPageControl
    @FocusState private var findFieldFocused: Bool
    /// Keyboard overlap with screen bottom; used to add a small gap above the keyboard.
    @State private var keyboardScreenOverlap: CGFloat = 0

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: "magnifyingglass")
                .font(.body)
                .foregroundStyle(.secondary)

            TextField(
                String(localized: "Find on page", comment: "Placeholder for in-note search"),
                text: $control.query
            )
            .textInputAutocapitalization(.never)
            .autocorrectionDisabled()
            .submitLabel(.search)
            .focused($findFieldFocused)
            .onSubmit { control.applyQueryFromFieldChange() }
            .accessibilityLabel(String(localized: "Find on page", comment: "Accessibility label for find field"))

            if control.matchCount > 0 {
                Text("\(control.activeMatchIndex)/\(control.matchCount)")
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(.secondary)
                    .accessibilityLabel("Match \(control.activeMatchIndex) of \(control.matchCount)")
            }

            Button {
                control.findPrevious()
            } label: {
                Image(systemName: "chevron.up")
            }
            .buttonStyle(.bordered)
            .controlSize(.small)
            .disabled(control.query.isEmpty || control.matchCount == 0)
            .accessibilityLabel(String(localized: "Previous match", comment: "Find previous button"))

            Button {
                control.findNext()
            } label: {
                Image(systemName: "chevron.down")
            }
            .buttonStyle(.bordered)
            .controlSize(.small)
            .disabled(control.query.isEmpty || control.matchCount == 0)
            .accessibilityLabel(String(localized: "Next match", comment: "Find next button"))

            Button {
                control.close()
            } label: {
                Image(systemName: "xmark.circle.fill")
                    .symbolRenderingMode(.hierarchical)
            }
            .buttonStyle(.borderless)
            .foregroundStyle(.secondary)
            .accessibilityLabel(String(localized: "Close find bar", comment: "Dismiss find on page"))
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 13)
        .background(.bar)
        // Gap between the bar and the keyboard (outside the bar background).
        .padding(.bottom, keyboardScreenOverlap > 1 ? 3 : 0)
        .onChange(of: control.query) { _, _ in
            control.applyQueryFromFieldChange()
        }
        .onAppear {
            findFieldFocused = true
        }
        .onReceive(NotificationCenter.default.publisher(for: UIResponder.keyboardWillChangeFrameNotification)) { notification in
            guard
                let frame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect
            else { return }
            let screenMaxY = UIScreen.main.bounds.maxY
            let overlap = max(0, screenMaxY - frame.minY)
            keyboardScreenOverlap = overlap
        }
        .onReceive(NotificationCenter.default.publisher(for: UIResponder.keyboardWillHideNotification)) { _ in
            keyboardScreenOverlap = 0
        }
    }
}
