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

    /// What a slide shows when that isn't its note's body, as in Trilium's `model.ts`.
    enum SlideKind: Equatable, Sendable {
        case content
        /// A web view note's page across the whole slide; `nil` when it names no http(s) page.
        case webPage(URL?)
        case board
        case table

        /// The children of a board or table are what it shows, so they aren't vertical slides.
        var showsItsChildren: Bool { self == .board || self == .table }
    }

    static func slideKind(type: NoteType?, viewType: String?, webViewSrc: String?) -> SlideKind {
        if type == .webView { return .webPage(webPageURL(webViewSrc)) }
        if type == .kanban { return .board }
        guard type == .book || type == .collection else { return .content }
        switch viewType?.trimmingCharacters(in: .whitespacesAndNewlines).lowercased() {
        case "board": return .board
        case "table": return .table
        default: return .content
        }
    }

    private static func webPageURL(_ source: String?) -> URL? {
        guard let source = source?.trimmingCharacters(in: .whitespacesAndNewlines), !source.isEmpty,
              let url = URL(string: source), let scheme = url.scheme?.lowercased(), scheme == "http" || scheme == "https",
              url.host != nil else { return nil }
        return url
    }

    struct Slide: Identifiable, Equatable, Sendable {
        let noteId: String
        let branchId: String
        let title: String
        let html: String
        let background: String?
        var verticalSlides: [Slide]
        var kind: SlideKind = .content

        var id: String { noteId }
    }

    /// Builds a horizontal slide list; each slide's `verticalSlides` are its direct children (Trilium nesting).
    static func buildSlides(
        horizontal: [(noteId: String, branchId: String, title: String, html: String, background: String?)],
        verticalByParent: [String: [(noteId: String, branchId: String, title: String, html: String, background: String?)]],
        kinds: [String: SlideKind] = [:]
    ) -> [Slide] {
        horizontal.map { h in
            let kind = kinds[h.noteId] ?? .content
            let vertical = kind.showsItsChildren ? [] : (verticalByParent[h.noteId] ?? []).map { v in
                Slide(
                    noteId: v.noteId,
                    branchId: v.branchId,
                    title: v.title,
                    html: v.html,
                    background: v.background,
                    verticalSlides: [],
                    kind: kinds[v.noteId] ?? .content
                )
            }
            return Slide(
                noteId: h.noteId,
                branchId: h.branchId,
                title: h.title,
                html: h.html,
                background: h.background,
                verticalSlides: vertical,
                kind: kind
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
