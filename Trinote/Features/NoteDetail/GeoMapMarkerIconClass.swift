import Foundation

/// Trilium-compatible marker icon resolution (`getNoteIcon` + `tn-icon` wrapper).
/// See Trilium `packages/commons/src/lib/notes.ts` and `FNote.getIcon()`.
enum GeoMapMarkerIconClass {
    private static let emptyIcon = "bx bx-empty"

    /// Full icon class string for map marker rasterization (`tn-icon …`).
    static func forNote(
        type: NoteType,
        mime: String,
        iconClassLabel: String?,
        childNoteCount: Int
    ) -> String {
        let icon = resolvedIcon(type: type, mime: mime, iconClassLabel: iconClassLabel, childNoteCount: childNoteCount)
        return "tn-icon \(icon)"
    }

    static func forNoteItem(_ note: NoteItem) -> String {
        forNote(
            type: note.type,
            mime: note.mime,
            iconClassLabel: note.iconClass,
            childNoteCount: note.childNoteIds.count
        )
    }

    private static func resolvedIcon(
        type: NoteType,
        mime: String,
        iconClassLabel: String?,
        childNoteCount: Int
    ) -> String {
        if let label = sanitizedLabel(iconClassLabel), label != emptyIcon {
            return label
        }

        switch type {
        case .text:
            return childNoteCount > 0 ? "bx bx-folder" : "bx bx-note"
        case .file:
            if mime == GeoMapDisplaySettings.gpxMIME {
                return "bx bx-trip"
            }
            if mime.hasPrefix("video/") { return "bx bx-video" }
            if mime.hasPrefix("audio/") { return "bx bx-music" }
            return "bx bx-file"
        case .image:
            return "bx bx-image"
        case .code:
            return "bx bx-code"
        case .book, .collection:
            return "bx bx-book"
        case .geoMap:
            return "bx bx-map-alt"
        default:
            return "bx bx-map-pin"
        }
    }

    private static func sanitizedLabel(_ raw: String?) -> String? {
        guard let raw else { return nil }
        let trimmed = raw
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .trimmingCharacters(in: CharacterSet(charactersIn: "\"'"))
        return trimmed.isEmpty ? nil : trimmed
    }
}
