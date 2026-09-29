import SwiftUI

/// A screen's large title drawn in its content, the way the Notes tree draws "Notes", rather than as the
/// navigation bar's large title (which sits at the bar's own, narrower margin). Keeps Favorites, Search
/// and Recents lined up with Notes.
enum ScreenLargeTitle {
    /// The Notes tree header row's insets.
    static let insets = EdgeInsets(top: 8, leading: 20, bottom: 8, trailing: 20)
}

/// The title text itself, shared with the Notes tree header.
struct ScreenLargeTitleText: View {
    let title: String

    var body: some View {
        Text(title)
            .font(.largeTitle)
            .fontWeight(.bold)
            .foregroundStyle(.primary)
            .accessibilityAddTraits(.isHeader)
    }
}

extension View {
    /// Shows `title` above this content with the Notes header's insets, and leaves the navigation bar
    /// untitled like the Notes tree root.
    func screenLargeTitle(_ title: String, background: Color) -> some View {
        VStack(spacing: 0) {
            ScreenLargeTitleText(title: title)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(ScreenLargeTitle.insets)
                .background(background)
            self
        }
        .navigationTitle("")
        .toolbarTitleDisplayMode(.inline)
    }
}
