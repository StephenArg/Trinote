import XCTest
@testable import Trinote

final class DetectedDataScannerTests: XCTestCase {
    private func scan(_ text: String, mapsApp: DetectedDataSettings.MapsApp = .apple) -> [DetectedDataMatch] {
        DetectedDataScanner.scan(text, mapsApp: mapsApp)
    }

    private func matched(_ text: String, _ match: DetectedDataMatch) -> String {
        (text as NSString).substring(with: NSRange(location: match.start, length: match.length))
    }

    // MARK: Phone numbers

    func testPhoneNumberOpensTel() throws {
        let text = "Call (555) 123-4567 today"
        let match = try XCTUnwrap(scan(text).first)
        XCTAssertEqual(match.kind, .phone)
        XCTAssertEqual(matched(text, match), "(555) 123-4567")
        XCTAssertEqual(match.url.absoluteString, "tel:5551234567")
    }

    func testInternationalPhoneKeepsPlus() throws {
        let match = try XCTUnwrap(scan("Office: +44 20 7946 0958").first)
        XCTAssertEqual(match.kind, .phone)
        XCTAssertEqual(match.url.absoluteString, "tel:+442079460958")
    }

    func testOffsetsAreUTF16() throws {
        let text = "😀 Call 555-123-4567"
        let match = try XCTUnwrap(scan(text).first)
        XCTAssertEqual(match.start, 8)
        XCTAssertEqual(matched(text, match), "555-123-4567")
    }

    // MARK: Addresses

    func testTwoLineAddressOpensAppleMaps() throws {
        let text = "Ship to:\n1 Infinite Loop\nCupertino, CA 95014\nThanks"
        let match = try XCTUnwrap(scan(text).first { $0.kind == .address })
        XCTAssertTrue(matched(text, match).contains("Cupertino"))
        XCTAssertEqual(match.url.absoluteString, "https://maps.apple.com/?q=1%20Infinite%20Loop%2C%20Cupertino%2C%20CA%2095014")
    }

    func testAddressURLForGoogleMaps() {
        let url = DetectedDataScanner.addressURL("1 Infinite Loop\nCupertino, CA 95014", mapsApp: .google)
        XCTAssertEqual(
            url?.absoluteString,
            "https://www.google.com/maps/search/?api=1&query=1%20Infinite%20Loop%2C%20Cupertino%2C%20CA%2095014"
        )
    }

    func testAddressQueryEncodesReservedCharacters() {
        let url = DetectedDataScanner.addressURL("Unit #4 & 5, 10 Main St+", mapsApp: .apple)
        XCTAssertEqual(url?.absoluteString, "https://maps.apple.com/?q=Unit%20%234%20%26%205%2C%2010%20Main%20St%2B")
    }

    // MARK: Tracking numbers

    func testUPSNumberWithValidCheckDigit() throws {
        let text = "Your parcel 1Z999AA10123456784 is on its way"
        let match = try XCTUnwrap(scan(text).first)
        XCTAssertEqual(match.kind, .tracking)
        XCTAssertEqual(matched(text, match), "1Z999AA10123456784")
        XCTAssertEqual(match.url.absoluteString, "https://www.ups.com/track?tracknum=1Z999AA10123456784")
    }

    func testUPSNumberWithSpacesAndLowerCase() throws {
        let found = try XCTUnwrap(TrackingNumber.find(in: "ups: 1z 999 aa1 01 2345 678 4").first)
        XCTAssertEqual(found.number, TrackingNumber(carrier: .ups, value: "1Z999AA10123456784"))
    }

    func testUPSNumberWithWrongCheckDigitIsIgnored() {
        XCTAssertTrue(TrackingNumber.find(in: "1Z999AA10123456785").isEmpty)
    }

    func testUSPSNumbers() {
        XCTAssertEqual(
            TrackingNumber.find(in: "9400111899223197428497").first?.number,
            TrackingNumber(carrier: .usps, value: "9400111899223197428497")
        )
        XCTAssertEqual(
            TrackingNumber.find(in: "USPS 9400 1118 9922 3197 4284 97 arriving").first?.number,
            TrackingNumber(carrier: .usps, value: "9400111899223197428497")
        )
        XCTAssertEqual(
            TrackingNumber.find(in: "42012345" + "9400111899223197428497").first?.number.carrier,
            .usps
        )
        XCTAssertTrue(TrackingNumber.find(in: "9400111899223197428490").isEmpty)
        XCTAssertEqual(
            TrackingNumber(carrier: .usps, value: "9400111899223197428497").url.absoluteString,
            "https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223197428497"
        )
    }

    func testFedExNumbers() {
        XCTAssertEqual(TrackingNumber.find(in: "986578788855").first?.number,
                       TrackingNumber(carrier: .fedex, value: "986578788855"))
        XCTAssertEqual(TrackingNumber.find(in: "041441760228964").first?.number,
                       TrackingNumber(carrier: .fedex, value: "041441760228964"))
        XCTAssertTrue(TrackingNumber.find(in: "986578788856").isEmpty)
        XCTAssertEqual(TrackingNumber(carrier: .fedex, value: "986578788855").url.absoluteString,
                       "https://www.fedex.com/fedextrack/?trknbr=986578788855")
    }

    func testAmazonNumber() throws {
        let found = try XCTUnwrap(TrackingNumber.find(in: "Amazon TBA123456789012.").first)
        XCTAssertEqual(found.number, TrackingNumber(carrier: .amazon, value: "TBA123456789012"))
        XCTAssertEqual(found.number.url.absoluteString, "https://track.amazon.com/tracking/TBA123456789012")
    }

    func testDHLNeedsTheWordDHL() {
        XCTAssertEqual(TrackingNumber.find(in: "DHL Express: 3318810025").first?.number,
                       TrackingNumber(carrier: .dhl, value: "3318810025"))
        XCTAssertTrue(TrackingNumber.find(in: "Order 3318810025").isEmpty)
    }

    func testInternationalPostNumbers() {
        XCTAssertEqual(TrackingNumber.find(in: "EA123456785US").first?.number.carrier, .usps)
        let foreign = TrackingNumber.find(in: "RR 123 456 785 GB").first?.number
        XCTAssertEqual(foreign, TrackingNumber(carrier: .post, value: "RR123456785GB"))
        XCTAssertEqual(foreign?.url.absoluteString, "https://www.google.com/search?q=RR123456785GB")
        XCTAssertTrue(TrackingNumber.find(in: "EA123456784US").isEmpty)
    }

    func testDigitsInsideLongerWordsAreIgnored() {
        XCTAssertTrue(TrackingNumber.find(in: "id986578788855x").isEmpty)
        XCTAssertTrue(TrackingNumber.find(in: "1986578788855").isEmpty)
    }

    func testBareTrackingNumberBeatsPhone() {
        let matches = scan("FedEx 986578788855")
        XCTAssertEqual(matches.count, 1)
        XCTAssertEqual(matches.first?.kind, .tracking)
    }

    func testSegmentsKeepTheirIndex() {
        let matches = DetectedDataScanner.scan(["nothing here", "call 555-123-4567"], mapsApp: .apple)
        XCTAssertEqual(matches.map(\.segment), [1])
    }
}
