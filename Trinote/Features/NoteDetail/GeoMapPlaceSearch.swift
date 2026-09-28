import Foundation

/// A place found by the geo map's search.
struct GeoMapPlace: Identifiable, Hashable, Sendable {
    let id: String
    /// Short name (the place itself), or the first part of the address when it has none.
    let name: String
    /// Full address line, as OpenStreetMap writes it.
    let label: String
    let lat: Double
    let lng: Double
    /// `[west, south, east, north]`, when the place covers an area.
    let bounds: [Double]?
    /// No name of its own (an address or a bare point): the pin gets the default title instead.
    let isUnnamed: Bool
}

/// Place search through Nominatim, the OpenStreetMap Foundation's geocoder, as Trilium's web map does
/// (`geomap/nominatim.ts`): only when the user submits a search (its usage policy rules out search-as-you-type), at
/// most one request a second, identified by a User-Agent, in the device's language; places in view first, then the
/// rest of the world.
actor GeoMapPlaceSearch {
    static let shared = GeoMapPlaceSearch()

    private static let endpoint = URL(string: "https://nominatim.openstreetmap.org/search")!
    private static let maxResults = 8
    private static let minimumInterval: TimeInterval = 1

    private var nextRequestAt = Date.distantPast
    private let session: URLSession

    init(session: URLSession = .shared) {
        self.session = session
    }

    /// `viewport` is what the map shows, `[west, south, east, north]`.
    func search(_ query: String, viewport: [Double]?) async throws -> [GeoMapPlace] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return [] }
        var nearby: [GeoMapPlace] = []
        if let viewbox = Self.viewbox(viewport) {
            nearby = try await request(trimmed, extra: ["viewbox": viewbox, "bounded": "1"])
            if nearby.count >= Self.maxResults { return nearby }
        }
        let elsewhere = try await request(trimmed, extra: Self.viewbox(viewport).map { ["viewbox": $0] } ?? [:])
        return Array(Self.deduplicated(nearby + elsewhere).prefix(Self.maxResults))
    }

    private func request(_ query: String, extra: [String: String]) async throws -> [GeoMapPlace] {
        var components = URLComponents(url: Self.endpoint, resolvingAgainstBaseURL: false)!
        var items = [
            URLQueryItem(name: "q", value: query),
            URLQueryItem(name: "format", value: "jsonv2"),
            URLQueryItem(name: "limit", value: String(Self.maxResults)),
        ]
        if let language = Locale.preferredLanguages.first {
            items.append(URLQueryItem(name: "accept-language", value: language))
        }
        items += extra.sorted(by: { $0.key < $1.key }).map { URLQueryItem(name: $0.key, value: $0.value) }
        components.queryItems = items
        var request = URLRequest(url: components.url!)
        request.setValue(Self.userAgent, forHTTPHeaderField: "User-Agent")
        request.timeoutInterval = 20

        let wait = nextRequestAt.timeIntervalSinceNow
        if wait > 0 { try await Task.sleep(for: .seconds(wait)) }
        nextRequestAt = Date().addingTimeInterval(Self.minimumInterval)

        let (data, response) = try await session.data(for: request)
        guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
            throw APIError.serverError(statusCode: (response as? HTTPURLResponse)?.statusCode ?? 0, message: "Place search failed")
        }
        return Self.places(from: data)
    }

    /// Nominatim `jsonv2` search results.
    nonisolated static func places(from data: Data) -> [GeoMapPlace] {
        guard let rows = try? JSONSerialization.jsonObject(with: data) as? [[String: Any]] else { return [] }
        return rows.compactMap { row in
            guard let lat = Double(row["lat"] as? String ?? ""), let lng = Double(row["lon"] as? String ?? "") else { return nil }
            let label = (row["display_name"] as? String) ?? ""
            let ownName = (row["name"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
            let firstPart = label.split(separator: ",").first.map { $0.trimmingCharacters(in: .whitespaces) } ?? ""
            let id = [row["osm_type"], row["osm_id"]].compactMap { $0.map { "\($0)" } }.joined(separator: ":")
            var bounds: [Double]?
            if let box = row["boundingbox"] as? [String], box.count == 4 {
                let values = box.compactMap(Double.init)
                // Nominatim: [south, north, west, east].
                if values.count == 4 { bounds = [values[2], values[0], values[3], values[1]] }
            }
            return GeoMapPlace(
                id: id.isEmpty ? "\(lat),\(lng)" : id,
                name: ownName.isEmpty ? (firstPart.isEmpty ? label : firstPart) : ownName,
                label: label,
                lat: lat,
                lng: lng,
                bounds: bounds,
                isUnnamed: ownName.isEmpty
            )
        }
    }

    /// Drops a place already offered (by id, or by the same address line), keeping the nearer first.
    nonisolated static func deduplicated(_ places: [GeoMapPlace]) -> [GeoMapPlace] {
        var seen = Set<String>()
        return places.filter { place in
            guard !seen.contains(place.id), !seen.contains(place.label) else { return false }
            seen.insert(place.id)
            seen.insert(place.label)
            return true
        }
    }

    /// Nominatim's `viewbox` (two corners, longitude first) for `[west, south, east, north]`.
    nonisolated static func viewbox(_ viewport: [Double]?) -> String? {
        guard let viewport, viewport.count == 4, viewport.allSatisfy(\.isFinite) else { return nil }
        let west = max(-180, viewport[0]), south = max(-90, viewport[1]), east = min(180, viewport[2]), north = min(90, viewport[3])
        guard east > west, north > south else { return nil }
        return "\(west),\(north),\(east),\(south)"
    }

    private static let userAgent: String = {
        let version = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "1.0"
        return "Trinote/\(version) (iOS; Trilium Notes client)"
    }()
}
