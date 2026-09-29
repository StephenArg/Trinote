import SwiftUI

/// Settings → Appearance → Maximum Content Width (iPad only), like Trilium's "Max content width": keeps
/// long lines readable when the note pane is wide. Applies to reading and editing.
enum NoteContentWidth {
    static let storageKey = "noteMaxContentWidth"
    /// Stored points; 0 means full width.
    static let options: [Int] = [0, 700, 850, 1000, 1200]

    static func title(for width: Int) -> String {
        width == 0
            ? String(localized: "Full Width", comment: "Settings: maximum note content width off")
            : String(localized: "\(width) pt", comment: "Settings: maximum note content width in points")
    }

    /// The cap for the stored value; `.infinity` when off or not on iPad.
    @MainActor
    static func limit(forStored width: Int) -> CGFloat {
        guard AppDelegate.isPad, width > 0 else { return .infinity }
        return CGFloat(width)
    }
}
