import XCTest
@testable import Trinote

final class GPXParsingTests: XCTestCase {

    private var ashlandXML: String {
        let fixtureURL = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .appendingPathComponent("Fixtures/ashland.gpx")
        let bundleURL = Bundle(for: GPXParsingTests.self).url(forResource: "ashland", withExtension: "gpx")
            ?? Bundle(for: GPXParsingTests.self).url(forResource: "ashland", withExtension: "gpx", subdirectory: "Fixtures")
        let url = bundleURL ?? (FileManager.default.fileExists(atPath: fixtureURL.path) ? fixtureURL : nil)
        guard let url, let xml = try? String(contentsOf: url, encoding: .utf8) else {
            XCTFail("ashland.gpx fixture missing")
            return ""
        }
        return xml
    }

    func testParseAshlandStats() throws {
        let stats = try XCTUnwrap(GeoMapGPXParser.parse(ashlandXML))
        XCTAssertGreaterThan(stats.distance, 1000)
        XCTAssertGreaterThan(stats.pointCount, 10)
        XCTAssertNotNil(stats.elevation)
        XCTAssertNotNil(stats.time)
    }

    func testReadAshlandTrackLines() throws {
        let lines = GeoMapGPXParser.readTrackLines(from: ashlandXML)
        XCTAssertFalse(lines.isEmpty)
        XCTAssertGreaterThanOrEqual(lines[0].count, 2)
        XCTAssertEqual(lines[0][0].count, 2)
    }

    func testAshlandSummaryTitleUsesFirstTrackName() throws {
        XCTAssertEqual(
            GeoMapGPXParser.summaryTitle(gpxXML: ashlandXML, noteTitle: "ashland.gpx"),
            "ASP QUARRY"
        )
        XCTAssertEqual(GeoMapGPXParser.readFirstTrackName(from: ashlandXML), "ASP QUARRY")
    }

    func testAshlandLineNamesAlignWithLines() throws {
        let lines = GeoMapGPXParser.readTrackLines(from: ashlandXML)
        let names = GeoMapGPXParser.readLineNames(from: ashlandXML)
        XCTAssertEqual(lines.count, names.count)
        XCTAssertEqual(names.first, "ASP QUARRY")
    }

    /// Points whose coordinates `Double` reads as non-finite ("nan", "inf") are skipped, and so is a non-finite
    /// elevation: the map's JSON can't hold them.
    func testTrackPointsWithNonFiniteCoordinatesAreSkipped() {
        let xml = """
        <gpx><trk><name>T</name><trkseg>
        <trkpt lat="nan" lon="1"></trkpt>
        <trkpt lat="48.1" lon="16.1"><ele>inf</ele></trkpt>
        <trkpt lat="48.2" lon="inf"></trkpt>
        <trkpt lat="48.3" lon="16.3"><ele>200</ele></trkpt>
        </trkseg></trk></gpx>
        """
        XCTAssertEqual(GeoMapGPXParser.readTrackLines(from: xml), [[[16.1, 48.1], [16.3, 48.3]]])
    }
}
