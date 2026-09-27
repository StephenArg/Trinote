import Foundation
import SwiftUI

/// Pure models for Trilium Presentation collections (`#viewType=presentation`).
enum PresentationModels {
    static let defaultTheme = "white"

    /// Known reveal.js theme names used by Trilium desktop.
    static let knownThemes: [String] = [
        "white", "black", "beige", "serif", "simple", "solarized",
        "moon", "dracula", "sky", "blood",
    ]

    /// Themes Trilium v0.106 added; older servers fall back to white for them, so they're offered only on v0.106+.
    static let extendedThemes: [String] = ["black-contrast", "white-contrast", "league", "night"]

    static func availableThemes(includeExtended: Bool) -> [String] {
        includeExtended ? knownThemes + extendedThemes : knownThemes
    }

    static func displayName(for theme: String) -> String {
        switch theme {
        case "black-contrast":
            return String(localized: "Black (High Contrast)", comment: "Presentation theme name")
        case "white-contrast":
            return String(localized: "White (High Contrast)", comment: "Presentation theme name")
        default:
            return theme.capitalized
        }
    }

    /// The colors of a reveal.js theme (its `--r-*` variables in reveal.js 6.0), which Trilium presents slides with.
    struct ThemeStyle: Equatable, Sendable {
        /// `--r-background-color`.
        let background: String
        /// `--r-main-color`: body text.
        let text: String
        /// `--r-heading-color`.
        let heading: String
        /// `--r-link-color`.
        let link: String
        /// `--r-background` stops, for the themes that paint a radial gradient over the background color.
        var radialGradient: [String]? = nil
    }

    static let themeStyles: [String: ThemeStyle] = [
        "black": ThemeStyle(background: "#191919", text: "#ffffff", heading: "#ffffff", link: "#42affa"),
        "white": ThemeStyle(background: "#ffffff", text: "#222222", heading: "#222222", link: "#2a76dd"),
        "beige": ThemeStyle(background: "#f7f3de", text: "#333333", heading: "#333333", link: "#8b743d",
                            radialGradient: ["#ffffff", "#f7f2d3"]),
        "serif": ThemeStyle(background: "#f0f1eb", text: "#000000", heading: "#383d3d", link: "#51483d"),
        "simple": ThemeStyle(background: "#ffffff", text: "#000000", heading: "#000000", link: "#00008b"),
        "solarized": ThemeStyle(background: "#fdf6e3", text: "#657b83", heading: "#586e75", link: "#268bd2"),
        "moon": ThemeStyle(background: "#002b36", text: "#93a1a1", heading: "#eee8d5", link: "#268bd2"),
        "dracula": ThemeStyle(background: "#191919", text: "#f8f8f2", heading: "#bd93f9", link: "#ff79c6"),
        "sky": ThemeStyle(background: "#f7fbfc", text: "#333333", heading: "#333333", link: "#2a76dd",
                          radialGradient: ["#f7fbfc", "#add9e4"]),
        "blood": ThemeStyle(background: "#222222", text: "#eeeeee", heading: "#eeeeee", link: "#aa2233"),
        "black-contrast": ThemeStyle(background: "#000000", text: "#ffffff", heading: "#ffffff", link: "#42affa"),
        "white-contrast": ThemeStyle(background: "#ffffff", text: "#000000", heading: "#000000", link: "#2a76dd"),
        "league": ThemeStyle(background: "#1c1e20", text: "#eeeeee", heading: "#eeeeee", link: "#13daec",
                             radialGradient: ["#555a5f", "#1c1e20"]),
        "night": ThemeStyle(background: "#111111", text: "#ffffff", heading: "#ffffff", link: "#e7ad52"),
    ]

    /// An unknown theme falls back to white, as Trilium's own presentation view does.
    static func style(for theme: String?) -> ThemeStyle {
        themeStyles[normalizedTheme(theme)] ?? themeStyles[defaultTheme]!
    }

    struct Slide: Identifiable, Equatable, Sendable {
        let noteId: String
        let branchId: String
        let title: String
        let html: String
        let background: String?
        var verticalSlides: [Slide]

        var id: String { noteId }
    }

    /// Builds a horizontal slide list; each slide's `verticalSlides` are its direct children (Trilium nesting).
    static func buildSlides(
        horizontal: [(noteId: String, branchId: String, title: String, html: String, background: String?)],
        verticalByParent: [String: [(noteId: String, branchId: String, title: String, html: String, background: String?)]]
    ) -> [Slide] {
        horizontal.map { h in
            let vertical = (verticalByParent[h.noteId] ?? []).map { v in
                Slide(
                    noteId: v.noteId,
                    branchId: v.branchId,
                    title: v.title,
                    html: v.html,
                    background: v.background,
                    verticalSlides: []
                )
            }
            return Slide(
                noteId: h.noteId,
                branchId: h.branchId,
                title: h.title,
                html: h.html,
                background: h.background,
                verticalSlides: vertical
            )
        }
    }

    static func normalizedTheme(_ raw: String?) -> String {
        guard let raw else { return defaultTheme }
        let t = raw.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return t.isEmpty ? defaultTheme : t
    }

    /// Whether `#slide:background` looks like a CSS gradient (Trilium allows hex or gradient).
    static func isGradientBackground(_ value: String) -> Bool {
        value.lowercased().contains("gradient(")
    }
}
