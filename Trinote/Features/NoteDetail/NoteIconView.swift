import SwiftUI
import UIKit
import CoreText

/// Cached icon data for list rows that resolve from SwiftData (recents, favorites, tabs).
struct NoteRowIconContext: Sendable {
    let iconClass: String?
    let fallbackNoteType: NoteType
}

enum NoteIconSize {
    case compact
    case regular
    case title
    case picker

    var pointSize: CGFloat {
        switch self {
        case .compact: return 16
        case .regular: return 20
        case .title: return 22
        case .picker: return 30
        }
    }

    var relativeTextStyle: Font.TextStyle {
        switch self {
        case .compact: return .callout
        case .regular: return .body
        case .title: return .title2
        case .picker: return .title
        }
    }
}

/// Renders a Trilium note icon from `#iconClass` (Boxicons) or falls back to the note-type SF Symbol.
struct NoteIconView: View {
    let iconClass: String?
    let fallbackNoteType: NoteType
    var size: NoteIconSize = .regular
    var foregroundStyle: Color = .primary

    private static let boxiconsAvailable: Bool = UIFont(name: BoxiconsCatalog.fontPostScriptName, size: 12) != nil

    var body: some View {
        if let glyph = Self.renderableGlyph(from: iconClass) {
            Text(String(glyph))
                .font(.custom(BoxiconsCatalog.fontPostScriptName, size: size.pointSize, relativeTo: size.relativeTextStyle))
                .foregroundStyle(foregroundStyle)
        } else {
            Image(systemName: fallbackNoteType.iconName)
                .font(iconFont)
                .foregroundStyle(foregroundStyle)
        }
    }

    /// Boxicons glyph when the font is loaded and contains the character; otherwise nil (use note-type fallback).
    private static func renderableGlyph(from iconClass: String?) -> Character? {
        guard boxiconsAvailable,
              BoxiconsResolver.isCatalogIcon(iconClass),
              let glyph = BoxiconsResolver.glyphCharacter(from: iconClass),
              glyph.isContainedInBoxiconsFont
        else { return nil }
        return glyph
    }

    private var iconFont: Font {
        switch size {
        case .compact: return .callout
        case .regular: return .body
        case .title: return .title2
        case .picker: return .title
        }
    }
}

extension NoteItem {
    /// Note type used when `#iconClass` is absent or not renderable.
    var iconFallbackNoteType: NoteType {
        if isSemanticGeoMap { return .geoMap }
        if isSemanticPresentation { return .presentation }
        if isSemanticKanban { return .kanban }
        if isTriliumCollectionNote { return .collection }
        return type
    }
}

extension ChildNoteSummary {
    var iconFallbackNoteType: NoteType { type }
}

private extension Character {
    var isContainedInBoxiconsFont: Bool {
        guard let font = UIFont(name: BoxiconsCatalog.fontPostScriptName, size: 12) else { return false }
        var utf16 = Array(String(self).utf16)
        guard !utf16.isEmpty else { return false }
        var glyphs = [CGGlyph](repeating: 0, count: utf16.count)
        return CTFontGetGlyphsForCharacters(font as CTFont, &utf16, &glyphs, utf16.count)
            && glyphs.allSatisfy { $0 != 0 }
    }
}
