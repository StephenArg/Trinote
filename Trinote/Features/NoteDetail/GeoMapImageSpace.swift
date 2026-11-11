import CoreGraphics
import CryptoKit
import Foundation
import ImageIO
import UniformTypeIdentifiers

/// What a map's coordinates are: places on the Earth, or positions on an image (Trilium v0.107's `geomap/space.ts`).
/// The map engine only knows longitude and latitude, so everything on a map is held in those and converted at the
/// edge, where a position is read off a note's label or written back onto one.
enum GeoMapSpace: Equatable, Sendable {
    case geo
    case image(GeoMapImageSpace)

    var isImage: Bool {
        if case .image = self { return true }
        return false
    }

    /// The label a marker note stores its position in.
    var locationLabel: String { isImage ? "mapPosition" : "geolocation" }
    /// The label a shape note stores its geometry in.
    var shapeLabel: String { isImage ? "mapShape" : GeoMapShape.label }

    func parseLocation(_ value: String) -> (lat: Double, lng: Double)? {
        switch self {
        case .geo: return GeoMapCoordinateParser.parse(value)
        case .image(let space): return space.parseLocation(value)
        }
    }

    func serializeLocation(lat: Double, lng: Double) -> String {
        switch self {
        case .geo: return "\(lat),\(lng)"
        case .image(let space): return space.serializeLocation(lat: lat, lng: lng)
        }
    }

    func shape(noteId: String, title: String, value: String, color: String?) -> GeoMapShape? {
        switch self {
        case .geo: return GeoMapShape(noteId: noteId, title: title, value: value, color: color)
        case .image(let space): return space.shape(noteId: noteId, title: title, value: value, color: color)
        }
    }

    func serializeShape(kind: GeoMapShape.Kind, coordinates: [[Double]], radiusMeters: Double?) -> String? {
        switch self {
        case .geo: return GeoMapShape.serializedValue(kind: kind, coordinates: coordinates, radiusMeters: radiusMeters)
        case .image(let space): return space.serializeShape(kind: kind, coordinates: coordinates, radiusMeters: radiusMeters)
        }
    }
}

/// The space of a map drawn over an image of a given size: Trilium's `imageSpace`. Positions are stored in a coordinate
/// system the map names for its image (`#map:imageBounds`), its own pixels from the top-left corner if it names none.
/// The image is laid onto the engine's world in Mercator units, half the world across, so a pixel maps to them linearly.
struct GeoMapImageSpace: Equatable, Sendable {
    /// The coordinates of the image's corners. Either axis can run either way: a top larger than the bottom is a world
    /// whose y grows upwards.
    struct Extent: Equatable, Sendable {
        var left: Double
        var top: Double
        var right: Double
        var bottom: Double

        /// A `#map:imageBounds` value, `x,y x,y` for the top-left and the bottom-right corner. `nil` where it names
        /// none; corners sharing an x or a y span nothing and name none.
        init?(label value: String?) {
            guard let parts = value?.split(whereSeparator: \.isWhitespace), parts.count == 2,
                  let topLeft = GeoMapImageSpace.parsePair(String(parts[0])),
                  let bottomRight = GeoMapImageSpace.parsePair(String(parts[1])),
                  topLeft.x != bottomRight.x, topLeft.y != bottomRight.y else { return nil }
            left = topLeft.x
            top = topLeft.y
            right = bottomRight.x
            bottom = bottomRight.y
        }

        init(left: Double, top: Double, right: Double, bottom: Double) {
            self.left = left
            self.top = top
            self.right = right
            self.bottom = bottom
        }
    }

    /// Where the image stands in the world (0–1 each way): half of it, in the middle, leaving a quarter on every side.
    private static let imageOrigin = 0.25
    private static let imageSpan = 0.5
    /// How far past the image the camera can be taken, as a share of its longer side.
    private static let cameraMargin = 0.25
    /// How many zoom levels past the image's own resolution the camera can go.
    private static let overzoom = 2.0
    /// How finely a stored coordinate resolves the image, in parts of a pixel.
    private static let storedPartsOfPixel = 100.0
    private static let circleSegments = 64
    private static let earthRadiusMeters = 6371008.8

    let width: Double
    let height: Double
    let extent: Extent
    private let mercatorPerPixel: Double
    private let unitsPerPixelX: Double
    private let unitsPerPixelY: Double
    private let storedDecimals: Int
    private let shownDecimals: Int

    /// The image's natural size, and the corners a `#map:imageBounds` names where there is one.
    init?(width: Double, height: Double, extent: Extent? = nil) {
        guard width > 0, height > 0, width.isFinite, height.isFinite else { return nil }
        self.width = width
        self.height = height
        let extent = extent ?? Extent(left: 0, top: 0, right: width, bottom: height)
        self.extent = extent
        mercatorPerPixel = Self.imageSpan / max(width, height)
        let unitsX = (extent.right - extent.left) / width
        let unitsY = (extent.bottom - extent.top) / height
        unitsPerPixelX = unitsX
        unitsPerPixelY = unitsY
        let finest = min(abs(unitsX), abs(unitsY))
        storedDecimals = Self.decimals(for: finest / Self.storedPartsOfPixel)
        shownDecimals = Self.decimals(for: finest)
    }

    // MARK: Conversions

    /// A position in the image's pixels, from its top-left corner.
    func pixelToLngLat(_ px: Double, _ py: Double) -> (lng: Double, lat: Double) {
        Self.lngLat(
            mercatorX: Self.imageOrigin + px * mercatorPerPixel,
            mercatorY: Self.imageOrigin + py * mercatorPerPixel
        )
    }

    /// A position in the map's coordinates.
    func toLngLat(_ x: Double, _ y: Double) -> (lng: Double, lat: Double) {
        pixelToLngLat((x - extent.left) / unitsPerPixelX, (y - extent.top) / unitsPerPixelY)
    }

    /// An engine position in the map's coordinates, unrounded.
    func toWorld(lng: Double, lat: Double) -> (x: Double, y: Double) {
        let point = Self.mercator(lng: lng, lat: lat)
        return (
            extent.left + ((point.x - Self.imageOrigin) / mercatorPerPixel) * unitsPerPixelX,
            extent.top + ((point.y - Self.imageOrigin) / mercatorPerPixel) * unitsPerPixelY
        )
    }

    private func toStored(lng: Double, lat: Double) -> (x: Double, y: Double) {
        let world = toWorld(lng: lng, lat: lat)
        return (Self.rounded(world.x, storedDecimals), Self.rounded(world.y, storedDecimals))
    }

    // MARK: Labels

    func parseLocation(_ value: String) -> (lat: Double, lng: Double)? {
        guard let point = Self.parsePair(value) else { return nil }
        let position = toLngLat(point.x, point.y)
        return (position.lat, position.lng)
    }

    func serializeLocation(lat: Double, lng: Double) -> String {
        let point = toStored(lng: lng, lat: lat)
        return "\(Self.text(point.x)),\(Self.text(point.y))"
    }

    /// A position as it is shown, or with `full` as it is copied.
    func formatLocation(lat: Double, lng: Double, full: Bool = false) -> String {
        let world = toWorld(lng: lng, lat: lat)
        // Rounded to what's stored first: a 120.5 read back through the conversion can come out a hair under.
        let x = Self.rounded(world.x, storedDecimals)
        let y = Self.rounded(world.y, storedDecimals)
        let decimals = full ? storedDecimals : shownDecimals
        return "\(Self.text(Self.rounded(x, decimals))), \(Self.text(Self.rounded(y, decimals)))"
    }

    /// A `#mapShape` value's shape: `line:x,y x,y…`, `polygon:x,y …` or `circle:x,y radius`. A radius is in the map's
    /// units, so where the two axes' units differ the circle is an ellipse on the image and carries its ring.
    func shape(noteId: String, title: String, value: String, color: String?) -> GeoMapShape? {
        guard let divide = value.firstIndex(of: ":"),
              let kind = GeoMapShape.Kind(rawValue: String(value[..<divide])) else { return nil }
        let rest = String(value[value.index(after: divide)...])

        if kind == .circle {
            let parts = rest.split(whereSeparator: \.isWhitespace)
            guard parts.count == 2,
                  let centers = Self.parsePoints(String(parts[0])), centers.count == 1,
                  let radius = Double(parts[1]), radius.isFinite, radius > 0 else { return nil }
            let center = centers[0]
            let centerPosition = toLngLat(center[0], center[1])
            let ring = Self.worldCircle(center: center, radius: radius).map { point -> [Double] in
                let position = toLngLat(point[0], point[1])
                return [position.lng, position.lat]
            }
            let centerMercator = Self.mercator(lng: centerPosition.lng, lat: centerPosition.lat)
            // The ring's mean reach, in meters at the centre.
            let reach = ring.map { point -> Double in
                let mercator = Self.mercator(lng: point[0], lat: point[1])
                return hypot(mercator.x - centerMercator.x, mercator.y - centerMercator.y)
            }.reduce(0, +) / Double(ring.count)
            let metersUnit = 1 / (2 * .pi * Self.earthRadiusMeters) / cos(centerPosition.lat * .pi / 180)
            return GeoMapShape(
                noteId: noteId, title: title, kind: .circle,
                coordinates: [[centerPosition.lng, centerPosition.lat]],
                radiusMeters: reach / metersUnit, ring: ring, color: color
            )
        }

        guard let points = Self.parsePoints(rest), points.count >= (kind == .line ? 2 : 3) else { return nil }
        let coordinates = points.map { point -> [Double] in
            let position = toLngLat(point[0], point[1])
            return [position.lng, position.lat]
        }
        return GeoMapShape(noteId: noteId, title: title, kind: kind, coordinates: coordinates, radiusMeters: nil, ring: nil, color: color)
    }

    /// A shape in engine coordinates as its label value. A circle is read back off its ring, so it keeps the size it
    /// was drawn at wherever on the image it stands, measured in the map's units.
    func serializeShape(kind: GeoMapShape.Kind, coordinates: [[Double]], radiusMeters: Double?, ring: [[Double]]? = nil) -> String? {
        let points = coordinates.filter { $0.count == 2 && $0[0].isFinite && $0[1].isFinite }
        switch kind {
        case .circle:
            guard let center = points.first else { return nil }
            let outline: [[Double]]
            if let ring, !ring.isEmpty {
                outline = ring
            } else if let radiusMeters, radiusMeters.isFinite, radiusMeters > 0 {
                outline = Self.circleRing(center: center, radiusMeters: radiusMeters)
            } else {
                return nil
            }
            let world = outline.map { point -> [Double] in
                let converted = toWorld(lng: point[0], lat: point[1])
                return [converted.x, converted.y]
            }
            let centerX = world.map { $0[0] }.reduce(0, +) / Double(world.count)
            let centerY = world.map { $0[1] }.reduce(0, +) / Double(world.count)
            let radius = world.map { hypot($0[0] - centerX, $0[1] - centerY) }.reduce(0, +) / Double(world.count)
            return "circle:\(Self.text(Self.rounded(centerX, storedDecimals))),\(Self.text(Self.rounded(centerY, storedDecimals))) \(Self.text(Self.rounded(radius, storedDecimals)))"
        case .line, .polygon:
            var ring = points
            if kind == .polygon, ring.count > 1, ring.first == ring.last { ring.removeLast() }
            guard ring.count >= (kind == .line ? 2 : 3) else { return nil }
            let written = ring.map { point -> String in
                let stored = toStored(lng: point[0], lat: point[1])
                return "\(Self.text(stored.x)),\(Self.text(stored.y))"
            }
            return "\(kind.rawValue):" + written.joined(separator: " ")
        }
    }

    // MARK: Camera

    /// `[lng, lat]`: top-left, top-right, bottom-right, bottom-left, as an image source wants them.
    var corners: [[Double]] {
        [pixelToLngLat(0, 0), pixelToLngLat(width, 0), pixelToLngLat(width, height), pixelToLngLat(0, height)]
            .map { [$0.lng, $0.lat] }
    }

    /// `[[west, south], [east, north]]`: the box the image fills.
    var bounds: [[Double]] {
        let topLeft = pixelToLngLat(0, 0)
        let bottomRight = pixelToLngLat(width, height)
        return [[topLeft.lng, bottomRight.lat], [bottomRight.lng, topLeft.lat]]
    }

    /// `[[west, south], [east, north]]`: the box the camera is kept inside, the image and a margin around it.
    var maxBounds: [[Double]] {
        let margin = max(width, height) * Self.cameraMargin
        let topLeft = pixelToLngLat(-margin, -margin)
        let bottomRight = pixelToLngLat(width + margin, height + margin)
        return [[topLeft.lng, bottomRight.lat], [bottomRight.lng, topLeft.lat]]
    }

    /// The deepest zoom worth having: a few levels past the one that draws a pixel per pixel. The engine's world is
    /// 512 pixels across at zoom 0.
    var maxZoom: Double {
        log2(max(width, height) / (Self.imageSpan * 512)) + Self.overzoom
    }

    /// The middle of the image, for the moment before it's fitted.
    var center: (lat: Double, lng: Double) {
        let box = bounds
        return ((box[0][1] + box[1][1]) / 2, (box[0][0] + box[1][0]) / 2)
    }

    // MARK: Helpers

    /// `x,y`, read as JavaScript's `parseFloat` reads each half.
    static func parsePair(_ value: String) -> (x: Double, y: Double)? {
        let parts = value.components(separatedBy: ",")
        guard parts.count >= 2, let x = parseFloat(parts[0]), let y = parseFloat(parts[1]) else { return nil }
        return (x, y)
    }

    private static func parseFloat(_ text: String) -> Double? {
        guard let range = text.range(of: #"^\s*[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?"#, options: .regularExpression),
              let number = Double(text[range].trimmingCharacters(in: .whitespacesAndNewlines)), number.isFinite else { return nil }
        return number
    }

    /// `x,y` pairs separated by spaces, every number strict; `nil` if any isn't.
    private static func parsePoints(_ value: String) -> [[Double]]? {
        var points: [[Double]] = []
        for point in value.split(whereSeparator: \.isWhitespace) {
            let parts = point.split(separator: ",", omittingEmptySubsequences: false)
            guard parts.count == 2, let x = Double(parts[0]), let y = Double(parts[1]), x.isFinite, y.isFinite else { return nil }
            points.append([x, y])
        }
        return points.isEmpty ? nil : points
    }

    /// A circle in the map's coordinates as a ring, without the closing repeat.
    private static func worldCircle(center: [Double], radius: Double) -> [[Double]] {
        (0..<circleSegments).map { index in
            let angle = 2 * Double.pi * Double(index) / Double(circleSegments)
            return [center[0] + radius * cos(angle), center[1] + radius * sin(angle)]
        }
    }

    /// A circle's radius walked out on the sphere, as the map's drawing tool and Trilium's `circleRing` do.
    private static func circleRing(center: [Double], radiusMeters: Double) -> [[Double]] {
        let toRadians = Double.pi / 180
        let angular = radiusMeters / earthRadiusMeters
        let lat = center[1] * toRadians
        let lng = center[0] * toRadians
        return (0..<circleSegments).map { index in
            let bearing = 2 * Double.pi * Double(index) / Double(circleSegments)
            let pointLat = asin(sin(lat) * cos(angular) + cos(lat) * sin(angular) * cos(bearing))
            let pointLng = lng + atan2(sin(bearing) * sin(angular) * cos(lat), cos(angular) - sin(lat) * sin(pointLat))
            return [pointLng / toRadians, pointLat / toRadians]
        }
    }

    private static func lngLat(mercatorX x: Double, mercatorY y: Double) -> (lng: Double, lat: Double) {
        (x * 360 - 180, 360 / .pi * atan(exp((180 - y * 360) * .pi / 180)) - 90)
    }

    private static func mercator(lng: Double, lat: Double) -> (x: Double, y: Double) {
        ((180 + lng) / 360, (180 - (180 / .pi * log(tan(.pi / 4 + lat * .pi / 360)))) / 360)
    }

    private static func decimals(for unit: Double) -> Int {
        max(0, Int(ceil(-log10(unit))))
    }

    /// JavaScript's `toFixed`: a tie goes away from zero.
    private static func rounded(_ value: Double, _ decimals: Int) -> Double {
        let factor = pow(10, Double(decimals))
        return (value * factor).rounded() / factor
    }

    /// JavaScript's way of writing these numbers: no trailing zeros, no `-0`.
    private static func text(_ value: Double) -> String {
        if value == 0 { return "0" }
        if value == value.rounded(), abs(value) < 1e15 { return String(Int64(value)) }
        return String(value)
    }
}

/// What a map note with `~map:image` asks to be drawn over. A switched-off `~disabled:map:image` isn't read, so such a
/// note is a world map again.
struct GeoMapImageRequest: Equatable, Sendable {
    let imageNoteId: String
    let extent: GeoMapImageSpace.Extent?
    let darkLabels: Bool

    init?(note: NoteItem) {
        guard let target = note.attributes.first(where: { $0.type == .relation && $0.name == "map:image" })?.value
            .trimmingCharacters(in: .whitespacesAndNewlines), !target.isEmpty else { return nil }
        func label(_ name: String) -> String? {
            note.attributes.first { $0.type == .label && $0.name == name }?.value
        }
        imageNoteId = target
        extent = GeoMapImageSpace.Extent(label: label("map:imageBounds"))
        darkLabels = CollectionNoteModels.isTruthyLabel(label("map:darkStyle"))
    }
}

/// An image map's picture, ready for the map's web view.
struct GeoMapImage: Equatable, Sendable {
    /// Changes when the picture or its corners do. The map is built afresh then: its camera limits are the image's.
    let key: String
    let dataURL: String
    let space: GeoMapImageSpace
    let darkLabels: Bool

    static func == (lhs: GeoMapImage, rhs: GeoMapImage) -> Bool { lhs.key == rhs.key }

    /// JSON for the engine's `init`. `fit` frames the whole image once it's drawn.
    func bridgeJSON(fit: Bool) -> String {
        let payload: [String: Any] = [
            "url": dataURL,
            "corners": space.corners,
            "bounds": space.bounds,
            "maxBounds": space.maxBounds,
            "maxZoom": space.maxZoom,
            "fit": fit,
            "darkLabels": darkLabels,
        ]
        guard let data = try? JSONSerialization.data(withJSONObject: payload, options: [.withoutEscapingSlashes]),
              let json = String(data: data, encoding: .utf8) else { return "null" }
        return json
    }

    /// Where the camera starts on an image with no saved view, the moment before it's fitted.
    var defaultViewportJSON: String {
        let center = space.center
        return "{\"view\":{\"center\":{\"lat\":\(center.lat),\"lng\":\(center.lng)},\"zoom\":1}}"
    }
}

/// The outcome of looking up an image map's picture, and what it was looked up for.
struct GeoMapImageLoaded: Equatable, Sendable {
    let request: GeoMapImageRequest
    let state: GeoMapImageState
}

enum GeoMapImageState: Equatable, Sendable {
    /// A world map: the note names no image.
    case geo
    case loading
    case unavailable(isSVG: Bool)
    case image(GeoMapImage)
}

/// A map note's body keeps one camera per kind of map: `view` for the world map and `imageView` for its image, whose
/// positions say nothing about each other, so that switching between the two restores each.
enum GeoMapViewConfig {
    static let geoKey = "view"
    static let imageKey = "imageView"

    /// The saved camera over the image, in the form the engine's `init` takes; `nil` if there's none.
    static func savedImageView(in stored: String?) -> String? {
        guard let view = parse(stored)?[imageKey] as? [String: Any], view["center"] != nil, view["zoom"] is NSNumber,
              let data = try? JSONSerialization.data(withJSONObject: ["view": view], options: [.sortedKeys]),
              let json = String(data: data, encoding: .utf8) else { return nil }
        return json
    }

    /// `stored` with `key` set to the camera in `canonicalJSON` (`{"view":…}`), keeping everything else in the body.
    static func merging(_ canonicalJSON: String, as key: String, into stored: String?) -> String {
        guard let camera = parse(canonicalJSON)?[geoKey] else { return canonicalJSON }
        var root = parse(stored) ?? [:]
        // The old flat form is what `camera` replaces.
        root["center"] = nil
        root["zoom"] = nil
        root[key] = camera
        guard let data = try? JSONSerialization.data(withJSONObject: root, options: [.sortedKeys]),
              let json = String(data: data, encoding: .utf8) else { return canonicalJSON }
        return json
    }

    private static func parse(_ json: String?) -> [String: Any]? {
        guard let data = json?.data(using: .utf8) else { return nil }
        return (try? JSONSerialization.jsonObject(with: data)) as? [String: Any]
    }
}

/// Turns an image note's bytes into what the map's web view can draw, measuring it on the way.
enum GeoMapImageDecoder {
    /// The longest side handed to the map. Some devices can't draw a larger texture and show nothing; the coordinates
    /// are the original's either way, since they come from its natural size.
    nonisolated static let maxSide = 4096

    struct Decoded: Sendable {
        let dataURL: String
        let width: Double
        let height: Double
        let digest: String
    }

    nonisolated static func decode(_ data: Data) -> Decoded? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil), CGImageSourceGetCount(source) > 0,
              let properties = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [CFString: Any],
              let rawWidth = (properties[kCGImagePropertyPixelWidth] as? NSNumber)?.doubleValue,
              let rawHeight = (properties[kCGImagePropertyPixelHeight] as? NSNumber)?.doubleValue,
              rawWidth > 0, rawHeight > 0 else { return nil }
        // A browser measures an image the way it shows it, so a sideways photo's sides trade places.
        let orientation = (properties[kCGImagePropertyOrientation] as? NSNumber)?.intValue ?? 1
        let (width, height) = (5...8).contains(orientation) ? (rawHeight, rawWidth) : (rawWidth, rawHeight)

        let mime = (CGImageSourceGetType(source) as String?).flatMap { UTType($0)?.preferredMIMEType }
        let drawable = ["image/jpeg", "image/png", "image/webp", "image/gif"].contains(mime ?? "")
        let dataURL: String?
        if drawable, let mime, max(width, height) <= Double(maxSide) {
            dataURL = "data:\(mime);base64,\(data.base64EncodedString())"
        } else {
            dataURL = reencoded(source, longerSide: min(Int(max(width, height)), maxSide))
        }
        guard let dataURL else { return nil }
        let digest = SHA256.hash(data: data).prefix(8).map { String(format: "%02x", $0) }.joined()
        return Decoded(dataURL: dataURL, width: width, height: height, digest: digest)
    }

    private nonisolated static func reencoded(_ source: CGImageSource, longerSide: Int) -> String? {
        let options: [CFString: Any] = [
            kCGImageSourceCreateThumbnailFromImageAlways: true,
            kCGImageSourceCreateThumbnailWithTransform: true,
            kCGImageSourceThumbnailMaxPixelSize: longerSide,
        ]
        guard let scaled = CGImageSourceCreateThumbnailAtIndex(source, 0, options as CFDictionary) else { return nil }
        let hasAlpha = ![.none, .noneSkipFirst, .noneSkipLast].contains(scaled.alphaInfo)
        let type = hasAlpha ? UTType.png : UTType.jpeg
        let output = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(output, type.identifier as CFString, 1, nil) else { return nil }
        let quality: [CFString: Any] = [kCGImageDestinationLossyCompressionQuality: 0.85]
        CGImageDestinationAddImage(destination, scaled, hasAlpha ? nil : quality as CFDictionary)
        guard CGImageDestinationFinalize(destination), let mime = type.preferredMIMEType else { return nil }
        return "data:\(mime);base64,\((output as Data).base64EncodedString())"
    }
}
