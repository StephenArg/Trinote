import Foundation

/// What the geo map's search bar offers for a query, as Trilium's web map builds its list (`geomap/SearchBox.tsx`):
/// the map's own notes matched by title as the reader types, a point when the query names coordinates, and places
/// from the geocoder once the reader asks for them, each list nearest first.
enum GeoMapSearch {
    /// Shorter queries aren't matched.
    static let minQueryLength = 2
    /// How many of the map's own notes the list offers, the nearest of those that match.
    static let maxNoteResults = 8
    /// Places within this distance of the middle of the map are "Nearby", the rest "Far away".
    static let nearbyRadiusMeters: Double = 25_000
    /// The mean radius of the Earth, which great-circle distances are measured on.
    static let earthRadiusMeters = 6_371_008.8

    struct Coordinate: Hashable, Sendable {
        let lat: Double
        let lng: Double
    }

    /// One row the reader can take: a note on the map or a place.
    struct Entry: Identifiable, Hashable, Sendable {
        enum Target: Hashable, Sendable {
            case note(noteId: String, kind: GeoMapFeatureKind)
            case place(GeoMapPlace)
        }

        let target: Target
        let title: String
        /// The place's full address, when it says more than its name.
        let detail: String?
        /// Metres from the middle of the map; nil for a GPX track, which stands on no one point.
        let distance: Double?

        var id: String {
            switch target {
            case .note(let noteId, _): return "note:\(noteId)"
            case .place(let place): return "place:\(place.id)"
            }
        }
    }

    struct Group: Identifiable, Hashable, Sendable {
        enum Kind: String, Sendable {
            case onMap, nearby, far
        }

        let kind: Kind
        let entries: [Entry]
        var id: String { kind.rawValue }
    }

    // MARK: Matching

    /// The query's words, folded for matching: case and accents are ignored on both sides.
    static func tokens(_ query: String) -> [String] {
        fold(query).split(whereSeparator: \.isWhitespace).map(String.init)
    }

    /// Whether `title` holds every word of the query, in any order: "zurich" finds "Zürich Hauptbahnhof", and
    /// "hotel paris" finds "Paris Hotel".
    static func matches(_ tokens: [String], title: String) -> Bool {
        guard !tokens.isEmpty else { return false }
        let folded = fold(title)
        return tokens.allSatisfy { folded.contains($0) }
    }

    private static func fold(_ text: String) -> String {
        text.folding(options: [.caseInsensitive, .diacriticInsensitive, .widthInsensitive], locale: nil)
    }

    /// The map's notes whose titles hold every word of `query`, nearest first, at most `maxNoteResults`. A note on
    /// the map more than one way (a marker that also carries a shape) is listed once, as a marker.
    static func noteEntries(
        query: String,
        pins: [GeoMapPin],
        shapes: [GeoMapShape],
        tracks: [GeoMapTrack],
        origin: Coordinate?
    ) -> [Entry] {
        let words = tokens(query)
        guard !words.isEmpty else { return [] }
        var seen = Set<String>()
        var entries: [Entry] = []
        func add(_ noteId: String, _ kind: GeoMapFeatureKind, _ title: String, _ center: Coordinate?) {
            guard matches(words, title: title), seen.insert(noteId).inserted else { return }
            let distance = origin.flatMap { from in center.map { meters(from: from, to: $0) } }
            entries.append(Entry(target: .note(noteId: noteId, kind: kind), title: title, detail: nil, distance: distance))
        }
        for pin in pins { add(pin.noteId, .pin, pin.title, Coordinate(lat: pin.lat, lng: pin.lng)) }
        for shape in shapes {
            add(shape.noteId, .shape, shape.title, shape.focusCoordinate.map { Coordinate(lat: $0.lat, lng: $0.lng) })
        }
        for track in tracks { add(track.noteId, .track, track.title, nil) }
        return Array(nearestFirst(entries).prefix(maxNoteResults))
    }

    /// A place from the geocoder as a row, measured from `origin`.
    static func placeEntry(_ place: GeoMapPlace, origin: Coordinate?) -> Entry {
        Entry(
            target: .place(place),
            title: place.name,
            detail: place.label == place.name || place.label.isEmpty ? nil : place.label,
            distance: origin.map { meters(from: $0, to: Coordinate(lat: place.lat, lng: place.lng)) }
        )
    }

    /// The rows under what they are: the map's own notes, then places near the middle of the map, then the rest.
    /// Empty groups are left out.
    static func groups(notes: [Entry], places: [Entry]) -> [Group] {
        let sortedPlaces = nearestFirst(places)
        let isNearby = { (entry: Entry) in (entry.distance ?? .infinity) <= nearbyRadiusMeters }
        return [
            Group(kind: .onMap, entries: notes),
            Group(kind: .nearby, entries: sortedPlaces.filter(isNearby)),
            Group(kind: .far, entries: sortedPlaces.filter { !isNearby($0) }),
        ].filter { !$0.entries.isEmpty }
    }

    /// Nearest first, rows standing on no one point last, otherwise in the order given.
    private static func nearestFirst(_ entries: [Entry]) -> [Entry] {
        entries.enumerated()
            .sorted { a, b in
                let da = a.element.distance ?? .infinity, db = b.element.distance ?? .infinity
                return da == db ? a.offset < b.offset : da < db
            }
            .map(\.element)
    }

    // MARK: Points

    private static let number = #"[+-]?\d+(?:\.\d+)?"#

    /// The forms a point is pasted in, latitude first, from the most exact to the loosest: a bare pair (as Google
    /// Maps, OpenStreetMap and `#geolocation` write one), a `geo:` URI, and the URLs of OpenStreetMap and Google Maps.
    private static let pointForms: [NSRegularExpression] = [
        #"^(\#(number))\s*(?:,\s*|\s+)(\#(number))$"#,
        #"^geo:(\#(number)),(\#(number))"#,
        #"[?&]mlat=(\#(number))&mlon=(\#(number))"#,
        #"#map=\#(number)/(\#(number))/(\#(number))"#,
        #"[?&](?:q|query|ll)=(\#(number)),(\#(number))"#,
        #"@(\#(number)),(\#(number))"#,
    ].compactMap { try? NSRegularExpression(pattern: $0, options: [.caseInsensitive]) }

    /// The point `query` names, or nil when it names none. A pair that stands off the Earth (`1234, 5678`) is not one.
    static func coordinate(in query: String) -> Coordinate? {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        let range = NSRange(trimmed.startIndex..., in: trimmed)
        for form in pointForms {
            guard let match = form.firstMatch(in: trimmed, range: range),
                  let latRange = Range(match.range(at: 1), in: trimmed),
                  let lngRange = Range(match.range(at: 2), in: trimmed),
                  let lat = Double(trimmed[latRange]), let lng = Double(trimmed[lngRange]),
                  abs(lat) <= 90, abs(lng) <= 180
            else { continue }
            return Coordinate(lat: lat, lng: lng)
        }
        return nil
    }

    /// A typed point as a place, so it can be shown and pinned like one found by the geocoder. It has no name of its
    /// own, so it is named by its coordinates.
    static func place(at point: Coordinate) -> GeoMapPlace {
        let name = "\(formatted(point.lat)), \(formatted(point.lng))"
        return GeoMapPlace(id: "point:\(name)", name: name, label: name, lat: point.lat, lng: point.lng, bounds: nil, isUnnamed: true)
    }

    private static func formatted(_ value: Double) -> String {
        value.formatted(.number.precision(.fractionLength(0...6)).grouping(.never).locale(Locale(identifier: "en_US_POSIX")))
    }

    // MARK: Distance

    /// The middle of `[west, south, east, north]`.
    static func center(of bounds: [Double]?) -> Coordinate? {
        guard let bounds, bounds.count == 4, bounds.allSatisfy(\.isFinite) else { return nil }
        return Coordinate(lat: (bounds[1] + bounds[3]) / 2, lng: (bounds[0] + bounds[2]) / 2)
    }

    /// Great-circle metres between two points.
    static func meters(from a: Coordinate, to b: Coordinate) -> Double {
        let toRadians = Double.pi / 180
        let deltaLat = (b.lat - a.lat) * toRadians
        let deltaLng = (b.lng - a.lng) * toRadians
        let h = pow(sin(deltaLat / 2), 2) + cos(a.lat * toRadians) * cos(b.lat * toRadians) * pow(sin(deltaLng / 2), 2)
        return 2 * earthRadiusMeters * asin(min(1, sqrt(h)))
    }
}
