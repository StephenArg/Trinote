import Foundation
import SwiftUI

// MARK: - Pin / track payloads

struct GeoMapPin: Identifiable, Sendable, Hashable {
    let noteId: String
    let title: String
    let lat: Double
    let lng: Double
    var iconClass: String?
    var color: String?

    var id: String { noteId }

    /// Hex color for MapLibre markers (`#RRGGBB`).
    var markerColorHex: String {
        if let color, let canonical = TriliumNoteColorMapper.canonicalColorLabel(from: color) {
            if canonical.hasPrefix("#") { return canonical.uppercased() }
            if let ui = TriliumNoteColorMapper.swiftUIColor(for: canonical) {
                return ui.hexString
            }
        }
        return "#3388FF"
    }
}

struct GeoMapWaypoint: Sendable, Hashable {
    let lng: Double
    let lat: Double
    let name: String?
}

struct GeoMapTrack: Identifiable, Sendable, Hashable {
    let noteId: String
    let title: String
    /// Label for the zoomed-out center mark (first GPX track name, then file name, then note title).
    let summaryTitle: String
    let gpxXML: String
    /// Each line is an array of `[longitude, latitude]` pairs.
    let lines: [[[Double]]]
    /// Segment names aligned with `lines` (from GPX `<trk>` / `<rte>` names).
    let lineNames: [String]
    let waypoints: [GeoMapWaypoint]
    var iconClass: String?
    var color: String?

    var id: String { noteId }

    /// Hex color for MapLibre track marks (`#RRGGBB`).
    var markerColorHex: String {
        if let color, let canonical = TriliumNoteColorMapper.canonicalColorLabel(from: color) {
            if canonical.hasPrefix("#") { return canonical.uppercased() }
            if let ui = TriliumNoteColorMapper.swiftUIColor(for: canonical) {
                return ui.hexString
            }
        }
        return "#3388FF"
    }

    static func make(
        noteId: String,
        title: String,
        gpxXML: String,
        iconClass: String?,
        color: String?
    ) -> GeoMapTrack? {
        let lines = GeoMapGPXParser.readTrackLines(from: gpxXML)
        guard !lines.isEmpty else { return nil }
        return GeoMapTrack(
            noteId: noteId,
            title: title,
            summaryTitle: GeoMapGPXParser.summaryTitle(gpxXML: gpxXML, noteTitle: title),
            gpxXML: gpxXML,
            lines: lines,
            lineNames: GeoMapGPXParser.readLineNames(from: gpxXML),
            waypoints: GeoMapGPXParser.readWaypoints(from: gpxXML),
            iconClass: iconClass,
            color: color
        )
    }
}

enum GeoMapFeatureKind: String, Sendable {
    case pin
    case track
}

struct GeoMapSelection: Identifiable, Sendable, Equatable {
    let noteId: String
    let kind: GeoMapFeatureKind

    var id: String { "\(kind.rawValue)-\(noteId)" }
}

/// Target for centering/highlighting a specific GPX track or waypoint mark on the map.
struct GeoMapMarkFocus: Sendable, Equatable {
    let noteId: String
    let markId: String
    let lat: Double
    let lng: Double

    static func normalizedListMarkId(_ raw: String) -> String {
        if raw.hasPrefix("line-end:") {
            return "line-start:" + raw.dropFirst("line-end:".count)
        }
        return raw
    }

    static func scrollAnchorId(for markId: String) -> String {
        "geoMapMark-\(markId)"
    }

    func matchesDetailList(focusedMarkId: String?, journeyIndex: Int, section: GeoMapDetailMarkSection) -> Bool {
        guard let focusedMarkId else { return false }
        if focusedMarkId == "summary" {
            return section == .tracks && journeyIndex == 0
        }
        return markId == Self.normalizedListMarkId(focusedMarkId)
    }
}

enum GeoMapDetailMarkSection {
    case tracks
    case waypoints
}

extension GeoMapTrack {
    /// Center of the track bounds for opening in Apple Maps.
    var mapsFocusCoordinate: (lat: Double, lng: Double)? {
        var minLat = Double.greatestFiniteMagnitude
        var maxLat = -Double.greatestFiniteMagnitude
        var minLng = Double.greatestFiniteMagnitude
        var maxLng = -Double.greatestFiniteMagnitude
        for line in lines {
            for point in line where point.count >= 2 {
                let lng = point[0]
                let lat = point[1]
                minLat = min(minLat, lat)
                maxLat = max(maxLat, lat)
                minLng = min(minLng, lng)
                maxLng = max(maxLng, lng)
            }
        }
        guard minLat.isFinite, maxLat.isFinite, minLng.isFinite, maxLng.isFinite else { return nil }
        return ((minLat + maxLat) / 2, (minLng + maxLng) / 2)
    }

    func lineStartFocus(lineIndex: Int) -> GeoMapMarkFocus? {
        guard lineIndex >= 0, lineIndex < lines.count,
              let first = lines[lineIndex].first, first.count >= 2 else { return nil }
        return GeoMapMarkFocus(
            noteId: noteId,
            markId: "line-start:\(lineIndex)",
            lat: first[1],
            lng: first[0]
        )
    }

    func journeyFocus(at journeyIndex: Int, stats: GeoMapGPXParser.Stats) -> GeoMapMarkFocus? {
        guard journeyIndex >= 0, journeyIndex < stats.journeys.count else { return nil }
        let journey = stats.journeys[journeyIndex]
        if let name = journey.name?.trimmingCharacters(in: .whitespacesAndNewlines), !name.isEmpty,
           let lineIndex = lineNames.firstIndex(of: name) {
            return lineStartFocus(lineIndex: lineIndex)
        }
        return lineStartFocus(lineIndex: min(journeyIndex, max(lines.count - 1, 0)))
    }

    func waypointFocus(at index: Int) -> GeoMapMarkFocus? {
        guard index >= 0, index < waypoints.count else { return nil }
        let waypoint = waypoints[index]
        return GeoMapMarkFocus(
            noteId: noteId,
            markId: "waypoint:\(index)",
            lat: waypoint.lat,
            lng: waypoint.lng
        )
    }
}

// MARK: - Display settings (Trilium labels on map parent)

enum GeoMapScaleUnit: String, CaseIterable, Identifiable, Sendable {
    case metric
    case imperial

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .metric: return String(localized: "Metric", comment: "Geo map scale units")
        case .imperial: return String(localized: "Imperial", comment: "Geo map scale units")
        }
    }

    init(rawStored: String?) {
        let trimmed = rawStored?.trimmingCharacters(in: .whitespacesAndNewlines).lowercased() ?? ""
        self = GeoMapScaleUnit(rawValue: trimmed) ?? .metric
    }
}

struct GeoMapDisplaySettings: Equatable, Sendable {
    var mapStyle: GeoMapStyleID
    var showScale: Bool
    var scaleUnit: GeoMapScaleUnit
    /// When `true`, marker titles are hidden (Trilium `map:hideLabels`).
    var hideLabels: Bool
    var cluster: Bool

    static let gpxMIME = "application/gpx+xml"

    init(from note: NoteItem) {
        func label(_ name: String) -> String? {
            note.attributes.first(where: { $0.type == .label && $0.name == name })?.value
        }
        mapStyle = GeoMapStyleID(rawStored: label("map:style"))
        showScale = Self.boolLabel(label("map:scale"), default: false)
        scaleUnit = GeoMapScaleUnit(rawStored: label("map:scaleUnit"))
        hideLabels = Self.boolLabel(label("map:hideLabels"), default: true)
        cluster = Self.boolLabel(label("map:cluster"), default: true)
    }

    init(
        mapStyle: GeoMapStyleID = .openstreetmap,
        showScale: Bool = false,
        scaleUnit: GeoMapScaleUnit = .metric,
        hideLabels: Bool = true,
        cluster: Bool = true
    ) {
        self.mapStyle = mapStyle
        self.showScale = showScale
        self.scaleUnit = scaleUnit
        self.hideLabels = hideLabels
        self.cluster = cluster
    }

    private static func boolLabel(_ raw: String?, default defaultValue: Bool) -> Bool {
        guard let raw else { return defaultValue }
        let v = raw.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        if v == "true" { return true }
        if v == "false" { return false }
        return defaultValue
    }

    /// JSON for `geoMapEditor.applySettings`.
    func bridgeJSON() -> String {
        let dict: [String: Any] = [
            "mapStyle": mapStyle.rawValue,
            "showScale": showScale,
            "scaleUnit": scaleUnit.rawValue,
            "hideLabels": hideLabels,
            "cluster": cluster,
        ]
        guard let data = try? JSONSerialization.data(withJSONObject: dict, options: [.sortedKeys]),
              let s = String(data: data, encoding: .utf8) else { return "{}" }
        return s
    }

    func apply(to note: NoteItem, via client: any TriliumClientProtocol) async throws -> NoteItem {
        var updated = note
        updated = try await upsertLabel(on: updated, via: client, name: "map:style", value: mapStyle.rawValue)
        updated = try await upsertLabel(on: updated, via: client, name: "map:scale", value: showScale ? "true" : "false")
        updated = try await upsertLabel(on: updated, via: client, name: "map:scaleUnit", value: scaleUnit.rawValue)
        updated = try await upsertLabel(on: updated, via: client, name: "map:hideLabels", value: hideLabels ? "true" : "false")
        updated = try await upsertLabel(on: updated, via: client, name: "map:cluster", value: cluster ? "true" : "false")
        return updated
    }

    private func upsertLabel(on note: NoteItem, via client: any TriliumClientProtocol, name: String, value: String) async throws -> NoteItem {
        if let existing = note.attributes.first(where: { $0.type == .label && $0.name == name }) {
            if existing.value == value { return note }
            try await client.deleteAttribute(noteId: note.noteId, attributeId: existing.attributeId)
        }
        try await client.createAttribute(CreateAttributeRequest(
            noteId: note.noteId, type: "label", name: name,
            value: value, isInheritable: nil, position: nil
        ))
        var attrs = note.attributes.filter { !($0.type == .label && $0.name == name) }
        attrs.append(AttributeItem(
            attributeId: "local-\(name)-\(note.noteId)",
            noteId: note.noteId,
            type: .label,
            name: name,
            value: value,
            position: attrs.count,
            isInheritable: false
        ))
        return note.withAttributes(attrs)
    }
}

enum GeoMapStyleID: String, CaseIterable, Identifiable, Sendable {
    case openstreetmap
    case versatilesColorful = "versatiles-colorful"

    var id: String { rawValue }

    init(rawStored: String?) {
        let trimmed = rawStored?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        switch trimmed {
        case GeoMapStyleID.versatilesColorful.rawValue:
            self = .versatilesColorful
        case GeoMapStyleID.openstreetmap.rawValue:
            self = .openstreetmap
        case let s where s.hasPrefix("versatiles-"):
            // Trilium supports more vector styles; Trinote offers VersaTiles Colorful only.
            self = .versatilesColorful
        default:
            self = .openstreetmap
        }
    }

    var displayName: String {
        switch self {
        case .openstreetmap: return String(localized: "OpenStreetMap", comment: "Geo map raster style")
        case .versatilesColorful: return String(localized: "VersaTiles Colorful", comment: "Geo map vector style")
        }
    }
}

extension Array where Element == GeoMapTrack {
    func bridgeJSONArray() -> String {
        let arr = map { track -> [String: Any] in
            var dict: [String: Any] = [
                "noteId": track.noteId,
                "title": track.title,
                "summaryTitle": track.summaryTitle,
                "lineNames": track.lineNames,
                "lines": track.lines,
                "color": track.markerColorHex,
                "waypoints": track.waypoints.map { waypoint -> [String: Any] in
                    var wpt: [String: Any] = ["lng": waypoint.lng, "lat": waypoint.lat]
                    if let name = waypoint.name, !name.isEmpty { wpt["name"] = name }
                    return wpt
                },
            ]
            if let icon = track.iconClass { dict["iconClass"] = icon }
            return dict
        }
        guard let data = try? JSONSerialization.data(withJSONObject: arr),
              let s = String(data: data, encoding: .utf8) else { return "[]" }
        return s
    }
}

// MARK: - NoteItem helper

private extension NoteItem {
    func withAttributes(_ attributes: [AttributeItem]) -> NoteItem {
        NoteItem(
            noteId: noteId,
            title: title,
            type: type,
            mime: mime,
            isProtected: isProtected,
            dateCreated: dateCreated,
            dateModified: dateModified,
            parentNoteIds: parentNoteIds,
            childNoteIds: childNoteIds,
            parentBranchIds: parentBranchIds,
            childBranchIds: childBranchIds,
            attributes: attributes
        )
    }
}
