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

/// A shape drawn on a Trilium v0.106+ geo map: a child note whose `#geoShape` label holds its geometry, as
/// `line:lat,lng lat,lng…`, `polygon:lat,lng …` (the ring without its closing point) or `circle:lat,lng radiusMeters`.
/// Mirrors `parseGeoShape` in Trilium's `geomap/shapes.ts`; a value it can't read is not drawn.
struct GeoMapShape: Identifiable, Sendable, Hashable {
    enum Kind: String, Sendable {
        case line, polygon, circle
    }

    static let label = "geoShape"

    let noteId: String
    let title: String
    let kind: Kind
    /// `[longitude, latitude]` pairs: the line or ring, or the circle's center alone.
    let coordinates: [[Double]]
    /// Circles only.
    let radiusMeters: Double?
    var color: String?

    var id: String { noteId }

    /// Hex color for the map layers (`#RRGGBB`), matching markers and tracks.
    var colorHex: String {
        if let color, let canonical = TriliumNoteColorMapper.canonicalColorLabel(from: color) {
            if canonical.hasPrefix("#") { return canonical.uppercased() }
            if let ui = TriliumNoteColorMapper.swiftUIColor(for: canonical) {
                return ui.hexString
            }
        }
        return "#3388FF"
    }

    /// A point to open in Maps: the circle's center, or the mean of the line or ring.
    var focusCoordinate: (lat: Double, lng: Double)? {
        guard !coordinates.isEmpty else { return nil }
        let lng = coordinates.map { $0[0] }.reduce(0, +) / Double(coordinates.count)
        let lat = coordinates.map { $0[1] }.reduce(0, +) / Double(coordinates.count)
        return (lat, lng)
    }

    init?(noteId: String, title: String, value: String, color: String?) {
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        guard let colon = trimmed.firstIndex(of: ":"),
              let kind = Kind(rawValue: String(trimmed[..<colon])) else { return nil }
        let rest = String(trimmed[trimmed.index(after: colon)...])

        switch kind {
        case .circle:
            let parts = rest.split(whereSeparator: \.isWhitespace)
            guard parts.count == 2,
                  let center = Self.parsePoints(String(parts[0])), center.count == 1,
                  let radius = Double(parts[1]), radius.isFinite, radius > 0 else { return nil }
            coordinates = center
            radiusMeters = radius
        case .line, .polygon:
            guard let points = Self.parsePoints(rest), points.count >= (kind == .line ? 2 : 3) else { return nil }
            coordinates = points
            radiusMeters = nil
        }
        self.noteId = noteId
        self.title = title
        self.kind = kind
        self.color = color
    }

    /// The `#geoShape` value for a shape, as Trilium's `serializeGeoShape` writes it: `lat,lng` points to 6 decimals
    /// without trailing zeros, space-separated after the kind; a ring without its closing repeat; a circle's
    /// centre and radius (to 0.1 m). `coordinates` are `[longitude, latitude]` pairs.
    static func serializedValue(kind: Kind, coordinates: [[Double]], radiusMeters: Double? = nil) -> String? {
        let points = coordinates.filter { $0.count == 2 && $0[0].isFinite && $0[1].isFinite }
        switch kind {
        case .circle:
            guard let center = points.first, let radiusMeters, radiusMeters.isFinite, radiusMeters > 0 else { return nil }
            return "circle:\(formatCoordinate(center[1])),\(formatCoordinate(center[0])) \(formatNumber((radiusMeters * 10).rounded() / 10))"
        case .line, .polygon:
            var ring = points
            if kind == .polygon, ring.count > 1, ring.first == ring.last { ring.removeLast() }
            guard ring.count >= (kind == .line ? 2 : 3) else { return nil }
            return "\(kind.rawValue):" + ring.map { "\(formatCoordinate($0[1])),\(formatCoordinate($0[0]))" }.joined(separator: " ")
        }
    }

    private static func formatCoordinate(_ value: Double) -> String {
        formatNumber((value * 1_000_000).rounded() / 1_000_000)
    }

    /// JavaScript's number formatting for these values: no trailing zeros, no `-0`.
    private static func formatNumber(_ value: Double) -> String {
        if value == 0 { return "0" }
        var text = String(format: "%.6f", value)
        while text.hasSuffix("0") { text.removeLast() }
        if text.hasSuffix(".") { text.removeLast() }
        return text
    }

    private static func parsePoints(_ value: String) -> [[Double]]? {
        var points: [[Double]] = []
        for point in value.split(whereSeparator: \.isWhitespace) {
            let parts = point.split(separator: ",", omittingEmptySubsequences: false)
            guard parts.count == 2, let lat = Double(parts[0]), let lng = Double(parts[1]),
                  lat.isFinite, lng.isFinite else { return nil }
            points.append([lng, lat])
        }
        return points.isEmpty ? nil : points
    }
}

extension Array where Element == GeoMapShape {
    /// JSON for the map engine's `loadShapesData`.
    func bridgeJSONArray() -> String? {
        let payload = map { shape -> [String: Any] in
            var dict: [String: Any] = [
                "noteId": shape.noteId,
                "title": shape.title,
                "type": shape.kind.rawValue,
                "coordinates": shape.coordinates,
                "color": shape.colorHex,
            ]
            if let radius = shape.radiusMeters { dict["radiusMeters"] = radius }
            return dict
        }
        guard let data = try? JSONSerialization.data(withJSONObject: payload) else { return nil }
        return String(data: data, encoding: .utf8)
    }
}

enum GeoMapFeatureKind: String, Sendable {
    case pin
    case track
    case shape
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

    /// - Parameter defaultStyle: The style when the note has none (`GeoMapStyleID.triliumDefault(for:)`).
    init(from note: NoteItem, defaultStyle: GeoMapStyleID) {
        func label(_ name: String) -> String? {
            note.attributes.first(where: { $0.type == .label && $0.name == name })?.value
        }
        mapStyle = GeoMapStyleID(rawStored: label("map:style"), default: defaultStyle)
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

/// Trilium's map styles (`#map:style`), in its menu's order. The raw values are Trilium's keys, including the
/// "versatile-" spelling of the light/dark ones.
enum GeoMapStyleID: String, CaseIterable, Identifiable, Sendable {
    case openstreetmap
    case versatilesColorful = "versatiles-colorful"
    case versatilesEclipse = "versatiles-eclipse"
    case versatilesColorfulEclipse = "versatile-colorful-eclipse"
    case versatilesGraybeard = "versatiles-graybeard"
    case versatilesShadow = "versatiles-shadow"
    case versatilesGraybeardShadow = "versatile-graybeard-shadow"
    case versatilesNeutrino = "versatiles-neutrino"

    var id: String { rawValue }

    /// A stored style, or `defaultStyle` when there is none or Trinote doesn't know it (as Trilium falls back).
    init(rawStored: String?, default defaultStyle: GeoMapStyleID) {
        let trimmed = rawStored?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        self = GeoMapStyleID(rawValue: trimmed) ?? defaultStyle
    }

    /// Light in light mode and dark in dark mode (Trilium 0.106+).
    var followsDarkMode: Bool {
        self == .versatilesColorfulEclipse || self == .versatilesGraybeardShadow
    }

    /// What Trilium draws a map with no style with: Colorful/Eclipse from v0.106, Colorful before.
    static func triliumDefault(for info: AppInfoResponse?) -> GeoMapStyleID {
        TriliumServerCompatibility.supportsDarkModeMapStyles(info) ? .versatilesColorfulEclipse : .versatilesColorful
    }

    /// The styles this server's Trilium offers, so a style Trinote saves is one Trilium can draw.
    static func available(for info: AppInfoResponse?) -> [GeoMapStyleID] {
        let lightDark = TriliumServerCompatibility.supportsDarkModeMapStyles(info)
        return allCases.filter { lightDark || !$0.followsDarkMode }
    }

    var displayName: String {
        switch self {
        case .openstreetmap: return String(localized: "OpenStreetMap", comment: "Geo map raster style")
        case .versatilesColorful: return String(localized: "VersaTiles Colorful", comment: "Geo map vector style")
        case .versatilesEclipse: return String(localized: "VersaTiles Eclipse", comment: "Geo map vector style (dark)")
        case .versatilesColorfulEclipse:
            return String(localized: "VersaTiles Colorful/Eclipse", comment: "Geo map vector style: light, dark in dark mode")
        case .versatilesGraybeard: return String(localized: "VersaTiles Graybeard", comment: "Geo map vector style")
        case .versatilesShadow: return String(localized: "VersaTiles Shadow", comment: "Geo map vector style (dark)")
        case .versatilesGraybeardShadow:
            return String(localized: "VersaTiles Graybeard/Shadow", comment: "Geo map vector style: light, dark in dark mode")
        case .versatilesNeutrino: return String(localized: "VersaTiles Neutrino", comment: "Geo map vector style")
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
