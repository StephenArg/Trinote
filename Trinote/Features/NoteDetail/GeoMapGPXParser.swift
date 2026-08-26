import Foundation

/// Swift-side GPX stats for the geo map detail panel (mirrors Trilium `parseGpxStats`).
enum GeoMapGPXParser {

    struct Point: Sendable {
        var lat: Double
        var lon: Double
        var elevation: Double?
        var time: Date?
    }

    struct Journey: Sendable {
        enum Kind: String, Sendable { case track, route }
        let kind: Kind
        var name: String?
        let segments: [[Point]]
    }

    struct ElevationStats: Sendable {
        let min: Double
        let max: Double
        let gain: Double
        let loss: Double
    }

    struct TimeStats: Sendable {
        let start: Date
        let end: Date
        let duration: TimeInterval
    }

    struct JourneySummary: Sendable {
        let kind: Journey.Kind
        var name: String?
        let distance: Double
    }

    struct TrackSegment: Sendable, Hashable {
        var name: String?
        /// `[longitude, latitude]` pairs for MapLibre.
        let coordinates: [[Double]]
    }

    struct Stats: Sendable {
        var name: String?
        var description: String?
        let trackCount: Int
        let routeCount: Int
        let segmentCount: Int
        let pointCount: Int
        var distance: Double
        var elevation: ElevationStats?
        var time: TimeStats?
        var journeys: [JourneySummary]
    }

    private static let elevationNoiseM = 5.0
    private static let journeyJumpM = 1000.0
    private static let earthRadiusM = 6_371_000.0

    static func parse(_ xml: String) -> Stats? {
        let journeys = readJourneys(from: xml)
        guard !journeys.isEmpty else { return nil }

        var stats = Stats(
            name: firstTagText("name", in: xml),
            description: firstTagText("desc", in: xml),
            trackCount: countTags("trk", in: xml),
            routeCount: countTags("rte", in: xml),
            segmentCount: countTags("trkseg", in: xml),
            pointCount: journeys.reduce(0) { $0 + $1.segments.reduce(0) { $0 + $1.count } },
            distance: 0,
            journeys: []
        )

        var gain = 0.0
        var loss = 0.0
        var minElev = Double.infinity
        var maxElev = -Double.infinity
        var startTime: Date?
        var endTime: Date?

        for journey in journeys {
            var journeyDistance = 0.0
            for segment in journey.segments {
                var anchor: Double?
                for index in segment.indices {
                    let point = segment[index]
                    if index > 0 {
                        journeyDistance += haversine(segment[index - 1], point)
                    }
                    if let elev = point.elevation {
                        minElev = min(minElev, elev)
                        maxElev = max(maxElev, elev)
                        if anchor == nil {
                            anchor = elev
                        } else if elev - anchor! >= elevationNoiseM {
                            gain += elev - anchor!
                            anchor = elev
                        } else if anchor! - elev >= elevationNoiseM {
                            loss += anchor! - elev
                            anchor = elev
                        }
                    }
                    if let t = point.time {
                        if startTime == nil || t < startTime! { startTime = t }
                        if endTime == nil || t > endTime! { endTime = t }
                    }
                }
            }
            stats.journeys.append(JourneySummary(kind: journey.kind, name: journey.name, distance: journeyDistance))
            stats.distance += journeyDistance
        }

        if minElev.isFinite, maxElev.isFinite {
            stats.elevation = ElevationStats(min: minElev, max: maxElev, gain: gain, loss: loss)
        }
        if let startTime, let endTime, startTime <= endTime {
            stats.time = TimeStats(start: startTime, end: endTime, duration: endTime.timeIntervalSince(startTime))
        }
        return stats
    }

    /// Returns track lines as `[longitude, latitude]` coordinate pairs for MapLibre.
    static func readTrackLines(from xml: String) -> [[[Double]]] {
        readTrackSegments(from: xml).map(\.coordinates)
    }

    /// Track/route segment names aligned with `readTrackLines(from:)`.
    static func readLineNames(from xml: String) -> [String] {
        readTrackSegments(from: xml).map { $0.name?.trimmingCharacters(in: .whitespacesAndNewlines) ?? "" }
    }

    /// First `<trk><name>` in the file, matching Trilium's zoomed-out GPX mark label.
    static func readFirstTrackName(from xml: String) -> String? {
        for block in containerBlocks(named: "trk", in: xml) {
            if let name = firstTagText("name", in: block)?
                .trimmingCharacters(in: .whitespacesAndNewlines), !name.isEmpty {
                return name
            }
        }
        return nil
    }

    /// Display label for a zoomed-out GPX mark: first track name, then file `<name>`, then note title.
    static func summaryTitle(gpxXML: String, noteTitle: String) -> String {
        if let firstTrack = readFirstTrackName(from: gpxXML) { return firstTrack }
        if let fileName = parse(gpxXML)?.name?
            .trimmingCharacters(in: .whitespacesAndNewlines), !fileName.isEmpty {
            return fileName
        }
        let trimmed = noteTitle.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? noteTitle : trimmed
    }

    static func readTrackSegments(from xml: String) -> [TrackSegment] {
        var segments: [TrackSegment] = []
        for block in containerBlocks(named: "trk", in: xml) {
            let trackName = firstTagText("name", in: block)
            for segment in segmentBlocks(in: block) {
                let line = readCoordinates(tag: "trkpt", in: segment)
                if line.count >= 2 {
                    segments.append(TrackSegment(name: trackName, coordinates: line))
                }
            }
        }
        for block in containerBlocks(named: "rte", in: xml) {
            let routeName = firstTagText("name", in: block)
            let line = readCoordinates(tag: "rtept", in: block)
            if line.count >= 2 {
                segments.append(TrackSegment(name: routeName, coordinates: line))
            }
        }
        if segments.isEmpty {
            let coords = readPoints(tag: "trkpt", in: xml, withTime: false) + readPoints(tag: "rtept", in: xml, withTime: false)
            if !coords.isEmpty {
                segments.append(TrackSegment(name: nil, coordinates: coords.map { [$0.lon, $0.lat] }))
            }
        }
        return segments
    }

    /// GPX `<wpt>` elements for map marks.
    static func readWaypoints(from xml: String) -> [GeoMapWaypoint] {
        containerBlocks(named: "wpt", in: xml).compactMap { block in
            let points = readPoints(tag: "wpt", in: block, withTime: false)
            guard let point = points.first else { return nil }
            let name = firstTagText("name", in: block)
            return GeoMapWaypoint(lng: point.lon, lat: point.lat, name: name)
        }
    }

    // MARK: - XML-ish parsing

    private static func readJourneys(from xml: String) -> [Journey] {
        var journeys: [Journey] = []
        for block in containerBlocks(named: "trk", in: xml) {
            let segments = segmentBlocks(in: block).map { readPoints(tag: "trkpt", in: $0, withTime: true) }
                .filter { !$0.isEmpty }
            let name = firstTagText("name", in: block)
            for run in splitAtJumps(segments: segments) {
                journeys.append(Journey(kind: .track, name: name, segments: run))
            }
        }
        for block in containerBlocks(named: "rte", in: xml) {
            let segments = [readPoints(tag: "rtept", in: block, withTime: false)].filter { !$0.isEmpty }
            let name = firstTagText("name", in: block)
            for run in splitAtJumps(segments: segments) {
                journeys.append(Journey(kind: .route, name: name, segments: run))
            }
        }
        if journeys.isEmpty {
            let points = readPoints(tag: "trkpt", in: xml, withTime: true) + readPoints(tag: "rtept", in: xml, withTime: false)
            if !points.isEmpty {
                journeys.append(Journey(kind: .track, name: nil, segments: [points]))
            }
        }
        return journeys
    }

    private static func containerBlocks(named tag: String, in xml: String) -> [String] {
        guard let regex = try? NSRegularExpression(
            pattern: "<\(tag)\\b[^>]*>([\\s\\S]*?)</\(tag)>",
            options: [.caseInsensitive]
        ) else { return [] }
        let range = NSRange(xml.startIndex..., in: xml)
        return regex.matches(in: xml, range: range).compactMap { match in
            guard let r = Range(match.range, in: xml) else { return nil }
            return String(xml[r])
        }
    }

    private static func segmentBlocks(in trkXML: String) -> [String] {
        guard let regex = try? NSRegularExpression(
            pattern: "<trkseg\\b[^>]*>([\\s\\S]*?)</trkseg>",
            options: [.caseInsensitive]
        ) else { return [trkXML] }
        let range = NSRange(trkXML.startIndex..., in: trkXML)
        let blocks = regex.matches(in: trkXML, range: range).compactMap { match -> String? in
            guard let r = Range(match.range, in: trkXML) else { return nil }
            return String(trkXML[r])
        }
        return blocks.isEmpty ? [trkXML] : blocks
    }

    private static func readCoordinates(tag: String, in xml: String) -> [[Double]] {
        readPoints(tag: tag, in: xml, withTime: false).map { [$0.lon, $0.lat] }
    }

    private static func readPoints(tag: String, in xml: String, withTime: Bool) -> [Point] {
        guard let regex = try? NSRegularExpression(
            pattern: "<\(tag)\\b[^>]*lat=\"([^\"]+)\"[^>]*lon=\"([^\"]+)\"[^>]*>([\\s\\S]*?)</\(tag)>|<\(tag)\\b[^>]*lon=\"([^\"]+)\"[^>]*lat=\"([^\"]+)\"[^>]*>([\\s\\S]*?)</\(tag)>",
            options: [.caseInsensitive]
        ) else { return [] }
        let range = NSRange(xml.startIndex..., in: xml)
        return regex.matches(in: xml, range: range).compactMap { match in
            let ns = xml as NSString
            let latStr = match.range(at: 1).location != NSNotFound ? ns.substring(with: match.range(at: 1))
                : ns.substring(with: match.range(at: 5))
            let lonStr = match.range(at: 2).location != NSNotFound ? ns.substring(with: match.range(at: 2))
                : ns.substring(with: match.range(at: 4))
            let innerRange = match.range(at: 3).location != NSNotFound ? match.range(at: 3) : match.range(at: 6)
            guard let lat = Double(latStr), let lon = Double(lonStr) else { return nil }
            var point = Point(lat: lat, lon: lon)
            if innerRange.location != NSNotFound {
                let inner = ns.substring(with: innerRange)
                if let eleStr = firstTagText("ele", in: inner), let elev = Double(eleStr) {
                    point.elevation = elev
                }
                if withTime, let timeStr = firstTagText("time", in: inner) {
                    point.time = parseGPXDate(timeStr)
                }
            }
            return point
        }
    }

    private static func firstTagText(_ tag: String, in xml: String) -> String? {
        guard let regex = try? NSRegularExpression(
            pattern: "<\(tag)\\b[^>]*>([\\s\\S]*?)</\(tag)>",
            options: [.caseInsensitive]
        ) else { return nil }
        let range = NSRange(xml.startIndex..., in: xml)
        guard let match = regex.firstMatch(in: xml, range: range) else { return nil }
        let text = (xml as NSString).substring(with: match.range(at: 1))
            .replacingOccurrences(of: "<![CDATA[", with: "")
            .replacingOccurrences(of: "]]>", with: "")
            .trimmingCharacters(in: .whitespacesAndNewlines)
        return text.isEmpty ? nil : text
    }

    private static func countTags(_ tag: String, in xml: String) -> Int {
        guard let regex = try? NSRegularExpression(pattern: "<\(tag)\\b", options: [.caseInsensitive]) else { return 0 }
        return regex.numberOfMatches(in: xml, range: NSRange(xml.startIndex..., in: xml))
    }

    private static func parseGPXDate(_ raw: String) -> Date? {
        let trimmed = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter.date(from: trimmed) ?? ISO8601DateFormatter().date(from: trimmed)
    }

    private static func splitAtJumps(segments: [[Point]]) -> [[[Point]]] {
        var runs: [[[Point]]] = []
        var current: [[Point]] = []
        for segment in segments {
            if let lastSegment = current.last, let previous = lastSegment.last, let first = segment.first {
                if haversine(previous, first) > journeyJumpM {
                    if !current.isEmpty { runs.append(current) }
                    current = []
                }
            }
            current.append(segment)
        }
        if !current.isEmpty { runs.append(current) }
        return runs.isEmpty ? (segments.isEmpty ? [] : [segments]) : runs
    }

    private static func haversine(_ a: Point, _ b: Point) -> Double {
        haversineCoords([a.lon, a.lat], [b.lon, b.lat])
    }

    private static func haversineCoords(_ a: [Double], _ b: [Double]) -> Double {
        let toRad = Double.pi / 180
        let dLat = (b[1] - a[1]) * toRad
        let dLon = (b[0] - a[0]) * toRad
        let lat1 = a[1] * toRad
        let lat2 = b[1] * toRad
        let h = sin(dLat / 2) * sin(dLat / 2)
            + cos(lat1) * cos(lat2) * sin(dLon / 2) * sin(dLon / 2)
        return 2 * earthRadiusM * asin(min(1, sqrt(h)))
    }
}
