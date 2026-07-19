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

    /// Approximate page chrome colors for native presentation themes (not full reveal.js CSS).
    static func themeColors(for theme: String) -> (background: Color, foreground: Color) {
        switch normalizedTheme(theme) {
        case "black", "moon", "dracula", "blood":
            return (Color(red: 0.11, green: 0.11, blue: 0.12), Color.white.opacity(0.92))
        case "beige":
            return (Color(red: 0.96, green: 0.94, blue: 0.86), Color(red: 0.2, green: 0.18, blue: 0.14))
        case "solarized":
            return (Color(red: 0.99, green: 0.96, blue: 0.89), Color(red: 0.40, green: 0.48, blue: 0.51))
        case "sky":
            return (Color(red: 0.95, green: 0.97, blue: 1.0), Color(red: 0.13, green: 0.22, blue: 0.35))
        case "serif", "simple", "white":
            return (Color.white, Color(red: 0.13, green: 0.13, blue: 0.13))
        default:
            return (Color(.systemBackground), Color(.label))
        }
    }
}
