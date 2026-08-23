import Foundation

/// Default `#iconClass` values for Trilium built-in `~template` targets when the template note is not cached.
enum TriliumBuiltinTemplateIcons {

    private static let byNoteId: [String: String] = [
        "_template_list_view": "bx bx-list-ul",
        "_template_grid_view": "bx bxs-grid",
        "_template_table": "bx bx-table",
        "_template_geo_map": "bx bx-map-alt",
        "_template_board": "bx bx-columns",
        "_template_presentation": "bx bx-slideshow",
        "_template_calendar": "bx bx-calendar",
    ]

    private static let byTitle: [String: String] = [
        "geo map": "bx bx-map-alt",
        "calendar": "bx bx-calendar",
    ]

    /// Resolves a built-in template note id or title to a canonical `#iconClass`, if known.
    static func iconClass(for templateTarget: String) -> String? {
        let trimmed = templateTarget.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return nil }

        if let icon = byNoteId[trimmed] ?? byNoteId[trimmed.lowercased()] {
            return icon
        }

        let titleKey = trimmed.lowercased()
        if let icon = byTitle[titleKey] {
            return icon
        }

        return nil
    }
}
