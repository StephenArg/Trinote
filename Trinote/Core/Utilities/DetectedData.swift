import Foundation

/// The reading view's "Phone Numbers, Addresses & Tracking" setting: phone numbers, street addresses and parcel
/// tracking numbers in a note's text are underlined and open the phone, maps or the carrier's tracking page.
enum DetectedDataSettings {
    static let enabledKey = "readingDetectsData"
    static let enabledDefault = true
    static let mapsAppKey = "detectedAddressMapsApp"

    /// Where a tapped address opens.
    enum MapsApp: String, CaseIterable, Identifiable, Sendable {
        case apple
        case google

        var id: String { rawValue }

        var title: String {
            switch self {
            case .apple: String(localized: "Apple Maps", comment: "Settings picker option: open detected addresses in Apple Maps")
            case .google: String(localized: "Google Maps", comment: "Settings picker option: open detected addresses in Google Maps")
            }
        }
    }
}

/// What the reading view's page needs to find and link details; nil (no config) means the setting is off.
struct DataDetectionConfig: Equatable, Sendable {
    var mapsApp: DetectedDataSettings.MapsApp
}

/// One detail found in a block of text, with the link it opens.
struct DetectedDataMatch: Equatable, Sendable {
    enum Kind: String, Sendable {
        case phone
        case address
        case tracking
    }

    /// Index of the text segment it was found in.
    var segment: Int
    /// UTF-16 offset and length in that segment (the same units as JavaScript string indices).
    var start: Int
    var length: Int
    var kind: Kind
    var url: URL
}

/// Finds phone numbers and addresses (`NSDataDetector`, which knows local formats and multi-line addresses) and
/// parcel tracking numbers (patterns checked by their check digit) in plain text.
enum DetectedDataScanner {
    nonisolated(unsafe) private static let detector = try? NSDataDetector(
        types: NSTextCheckingResult.CheckingType.phoneNumber.rawValue | NSTextCheckingResult.CheckingType.address.rawValue
    )

    static func scan(_ segments: [String], mapsApp: DetectedDataSettings.MapsApp) -> [DetectedDataMatch] {
        var all: [DetectedDataMatch] = []
        for (index, text) in segments.enumerated() {
            all += scan(text, segment: index, mapsApp: mapsApp)
        }
        return all
    }

    /// Matches in one segment, in order and never overlapping. An address beats anything inside it; a tracking
    /// number beats a phone number on the same digits (a bare run of 10–22 digits that passes a carrier's check digit
    /// is far more likely a parcel than a phone).
    static func scan(_ text: String, segment: Int = 0, mapsApp: DetectedDataSettings.MapsApp) -> [DetectedDataMatch] {
        let ns = text as NSString
        guard ns.length > 0 else { return [] }
        var addresses: [DetectedDataMatch] = []
        var phones: [DetectedDataMatch] = []
        detector?.enumerateMatches(in: text, range: NSRange(location: 0, length: ns.length)) { result, _, _ in
            guard let result else { return }
            let matched = ns.substring(with: result.range)
            switch result.resultType {
            case .address:
                if let url = addressURL(matched, mapsApp: mapsApp) {
                    addresses.append(DetectedDataMatch(segment: segment, start: result.range.location,
                                                       length: result.range.length, kind: .address, url: url))
                }
            case .phoneNumber:
                if let url = phoneURL(result.phoneNumber ?? matched) {
                    phones.append(DetectedDataMatch(segment: segment, start: result.range.location,
                                                    length: result.range.length, kind: .phone, url: url))
                }
            default:
                break
            }
        }
        let tracking = TrackingNumber.find(in: text).map {
            DetectedDataMatch(segment: segment, start: $0.range.location, length: $0.range.length,
                              kind: .tracking, url: $0.number.url)
        }

        var accepted: [DetectedDataMatch] = []
        for candidate in addresses + tracking + phones {
            let overlaps = accepted.contains {
                candidate.start < $0.start + $0.length && $0.start < candidate.start + candidate.length
            }
            if !overlaps { accepted.append(candidate) }
        }
        return accepted.sorted { $0.start < $1.start }
    }

    // MARK: - Links

    /// `tel:` with only the digits and a leading `+`.
    static func phoneURL(_ value: String) -> URL? {
        let digits = value.filter { $0.isASCII && ($0.isNumber || $0 == "+") }
        guard digits.contains(where: \.isNumber) else { return nil }
        return URL(string: "tel:\(digits)")
    }

    /// A maps search for the address, its lines joined with commas. Google's link opens the Google Maps app when it
    /// is installed (a universal link) and the website otherwise.
    static func addressURL(_ address: String, mapsApp: DetectedDataSettings.MapsApp) -> URL? {
        let lines = address
            .components(separatedBy: .newlines)
            .map { $0.split(whereSeparator: \.isWhitespace).joined(separator: " ") }
            .map { $0.trimmingCharacters(in: CharacterSet(charactersIn: ",")) }
            .filter { !$0.isEmpty }
        guard !lines.isEmpty else { return nil }
        let query = lines.joined(separator: ", ")
        var components: URLComponents?
        switch mapsApp {
        case .apple:
            components = URLComponents(string: "https://maps.apple.com/")
            components?.queryItems = [URLQueryItem(name: "q", value: query)]
        case .google:
            components = URLComponents(string: "https://www.google.com/maps/search/")
            components?.queryItems = [URLQueryItem(name: "api", value: "1"), URLQueryItem(name: "query", value: query)]
        }
        return components?.urlWithStrictQuery
    }
}

extension URLComponents {
    /// The URL with `+`, `&`, `=`, `#` and `?` in query values percent-encoded too (`URLComponents` leaves `+`, which
    /// search sites read as a space, and `?`).
    var urlWithStrictQuery: URL? {
        var copy = self
        copy.percentEncodedQueryItems = queryItems?.map {
            URLQueryItem(name: $0.name, value: $0.value?.addingPercentEncoding(withAllowedCharacters: .strictQueryValue))
        }
        return copy.url
    }
}

extension CharacterSet {
    static let strictQueryValue: CharacterSet = {
        var set = CharacterSet.alphanumerics.intersection(CharacterSet(charactersIn: Unicode.Scalar(0)...Unicode.Scalar(127)))
        set.insert(charactersIn: "-._~")
        return set
    }()
}

// MARK: - Tracking numbers

/// A parcel tracking number recognised by its shape and check digit.
struct TrackingNumber: Equatable, Sendable {
    enum Carrier: String, Sendable {
        case ups
        case usps
        case fedex
        case amazon
        case dhl
        /// A UPU international postal item (`AA123456785GB`) from a post other than USPS.
        case post
    }

    var carrier: Carrier
    /// The number without spaces, upper case.
    var value: String

    /// The carrier's tracking page, or a web search for the number when the carrier has no single page.
    var url: URL {
        var components: URLComponents?
        switch carrier {
        case .ups:
            components = URLComponents(string: "https://www.ups.com/track")
            components?.queryItems = [URLQueryItem(name: "tracknum", value: value)]
        case .usps:
            components = URLComponents(string: "https://tools.usps.com/go/TrackConfirmAction")
            components?.queryItems = [URLQueryItem(name: "tLabels", value: value)]
        case .fedex:
            components = URLComponents(string: "https://www.fedex.com/fedextrack/")
            components?.queryItems = [URLQueryItem(name: "trknbr", value: value)]
        case .amazon:
            components = URLComponents(string: "https://track.amazon.com/tracking/\(value)")
        case .dhl:
            components = URLComponents(string: "https://www.dhl.com/global-en/home/tracking/tracking-express.html")
            components?.queryItems = [URLQueryItem(name: "submit", value: "1"), URLQueryItem(name: "tracking-id", value: value)]
        case .post:
            components = URLComponents(string: "https://www.google.com/search")
            components?.queryItems = [URLQueryItem(name: "q", value: value)]
        }
        // Every value is letters and digits only, so these always form a URL.
        return components?.urlWithStrictQuery ?? URL(string: "https://www.google.com/search?q=\(value)")!
    }

    struct Found: Equatable, Sendable {
        var number: TrackingNumber
        /// UTF-16 range in the searched text, including any spaces inside the number.
        var range: NSRange
    }

    // Not a letter, digit or underscore on either side.
    private static let before = #"(?<![\p{L}\p{N}_])"#
    private static let after = #"(?![\p{L}\p{N}_])"#

    nonisolated(unsafe) private static let upsPattern = try? NSRegularExpression(
        pattern: before + #"1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]"# + after,
        options: [.caseInsensitive]
    )
    nonisolated(unsafe) private static let amazonPattern = try? NSRegularExpression(
        pattern: before + #"TBA\d{12}"# + after, options: [.caseInsensitive]
    )
    /// UPU S10: two letters, eight digits, a check digit, the country (upper case only: fewer false hits).
    nonisolated(unsafe) private static let s10Pattern = try? NSRegularExpression(
        pattern: before + #"[A-Z]{2} ?\d{3} ?\d{3} ?\d{3} ?[A-Z]{2}"# + after
    )
    /// A bare run of digits.
    nonisolated(unsafe) private static let digitsPattern = try? NSRegularExpression(
        pattern: before + #"\d{10,34}"# + after
    )
    /// USPS's printed grouping: `9400 1000 0000 0000 0000 00`.
    nonisolated(unsafe) private static let uspsSpacedPattern = try? NSRegularExpression(
        pattern: before + #"9[1-5]\d{2}(?: \d{4}){4} \d{2}"# + after
    )
    nonisolated(unsafe) private static let dhlKeyword = try? NSRegularExpression(
        pattern: #"\bDHL\b"#, options: [.caseInsensitive]
    )

    /// Every tracking number in `text`, in order and never overlapping.
    static func find(in text: String) -> [Found] {
        let ns = text as NSString
        let all = NSRange(location: 0, length: ns.length)
        var found: [Found] = []

        func add(_ pattern: NSRegularExpression?, _ parse: (String, NSRange) -> TrackingNumber?) {
            pattern?.enumerateMatches(in: text, range: all) { match, _, _ in
                guard let range = match?.range,
                      !found.contains(where: { NSIntersectionRange($0.range, range).length > 0 }) else { return }
                let raw = ns.substring(with: range).replacingOccurrences(of: " ", with: "").uppercased()
                if let number = parse(raw, range) { found.append(Found(number: number, range: range)) }
            }
        }

        add(upsPattern) { raw, _ in
            isValidUPS(raw) ? TrackingNumber(carrier: .ups, value: raw) : nil
        }
        add(amazonPattern) { raw, _ in TrackingNumber(carrier: .amazon, value: raw) }
        add(s10Pattern) { raw, _ in
            guard isValidS10(raw) else { return nil }
            return TrackingNumber(carrier: raw.hasSuffix("US") ? .usps : .post, value: raw)
        }
        add(uspsSpacedPattern) { raw, _ in
            isValidMod10(raw) ? TrackingNumber(carrier: .usps, value: raw) : nil
        }
        add(digitsPattern) { raw, range in
            parseDigits(raw, hasDHLKeyword: hasDHLKeyword(in: ns, before: range.location))
        }
        return found.sorted { $0.range.location < $1.range.location }
    }

    /// A bare digit run: USPS (Intelligent Mail package barcodes, with or without the `420` + ZIP routing prefix,
    /// and older 20-digit numbers), FedEx (12 and 15 digits), or DHL Express (10 digits, only after the word "DHL").
    static func parseDigits(_ digits: String, hasDHLKeyword: Bool) -> TrackingNumber? {
        let count = digits.count
        // `420` + 5- or 9-digit ZIP before a 22-digit IMpb.
        if digits.hasPrefix("420"), count == 30 || count == 34 {
            let impb = String(digits.suffix(22))
            if isUSPSIMpb(impb) { return TrackingNumber(carrier: .usps, value: digits) }
            return nil
        }
        switch count {
        case 22, 26:
            // FedEx SmartPost `92…` numbers are delivered by USPS, so USPS's page tracks them too.
            return isUSPSIMpb(digits) ? TrackingNumber(carrier: .usps, value: digits) : nil
        case 20:
            return isValidMod10(digits) ? TrackingNumber(carrier: .usps, value: digits) : nil
        case 12:
            return isValidFedEx12(digits) ? TrackingNumber(carrier: .fedex, value: digits) : nil
        case 15:
            return isValidMod10(digits) ? TrackingNumber(carrier: .fedex, value: digits) : nil
        case 10:
            return hasDHLKeyword && isValidDHL(digits) ? TrackingNumber(carrier: .dhl, value: digits) : nil
        default:
            return nil
        }
    }

    private static func hasDHLKeyword(in text: NSString, before location: Int) -> Bool {
        let start = max(0, location - 30)
        let window = NSRange(location: start, length: location - start)
        guard window.length > 0, let dhlKeyword else { return false }
        return dhlKeyword.firstMatch(in: text as String, range: window) != nil
    }

    // MARK: Check digits

    private static func digitValues(_ s: String) -> [Int]? {
        let values = s.compactMap(\.wholeNumberValue)
        return values.count == s.count && s.allSatisfy(\.isASCII) ? values : nil
    }

    /// IMpb: starts with 9[1-5] and passes the mod 10 check.
    static func isUSPSIMpb(_ digits: String) -> Bool {
        guard let first = digits.first, first == "9",
              let second = digits.dropFirst().first?.wholeNumberValue, (1...5).contains(second) else { return false }
        return isValidMod10(digits)
    }

    /// USPS / FedEx Ground mod 10: from the right, ignoring the check digit, odd places ×3 and even places ×1; the
    /// check digit brings the sum to a multiple of 10.
    static func isValidMod10(_ digits: String) -> Bool {
        guard let values = digitValues(digits), values.count >= 2 else { return false }
        let body = values.dropLast().reversed()
        let sum = body.enumerated().reduce(0) { $0 + $1.element * ($1.offset % 2 == 0 ? 3 : 1) }
        return (10 - sum % 10) % 10 == values.last
    }

    /// FedEx Express 12 digits: the first 11 weighted 1, 3, 7 from the right, sum mod 11 (10 counts as 0).
    static func isValidFedEx12(_ digits: String) -> Bool {
        guard let values = digitValues(digits), values.count == 12 else { return false }
        let weights = [1, 3, 7]
        let sum = values.dropLast().reversed().enumerated().reduce(0) { $0 + $1.element * weights[$1.offset % 3] }
        return sum % 11 % 10 == values.last
    }

    /// DHL Express 10 digits: the first nine as a number, mod 7.
    static func isValidDHL(_ digits: String) -> Bool {
        guard let values = digitValues(digits), values.count == 10, let body = Int(digits.prefix(9)) else { return false }
        return body % 7 == values.last
    }

    /// UPS `1Z`: the 15 characters after `1Z` and before the check digit, letters as `(ASCII − 63) mod 10`, odd places
    /// ×1 and even places ×2; the check digit brings the sum to a multiple of 10.
    static func isValidUPS(_ value: String) -> Bool {
        let chars = Array(value)
        guard chars.count == 18, value.hasPrefix("1Z"), let check = chars[17].wholeNumberValue else { return false }
        var sum = 0
        for (offset, char) in chars[2..<17].enumerated() {
            let v: Int
            if let digit = char.wholeNumberValue, char.isASCII {
                v = digit
            } else if let ascii = char.asciiValue, char.isUppercase {
                v = (Int(ascii) - 63) % 10
            } else {
                return false
            }
            sum += offset % 2 == 0 ? v : v * 2
        }
        return (10 - sum % 10) % 10 == check
    }

    /// UPU S10: eight serial digits weighted 8 6 4 2 3 5 9 7; check = 11 − sum mod 11 (10 → 0, 11 → 5).
    static func isValidS10(_ value: String) -> Bool {
        let chars = Array(value)
        guard chars.count == 13 else { return false }
        let digits = String(chars[2..<11])
        guard let values = digitValues(digits) else { return false }
        let weights = [8, 6, 4, 2, 3, 5, 9, 7]
        let sum = zip(values.prefix(8), weights).reduce(0) { $0 + $1.0 * $1.1 }
        var check = 11 - sum % 11
        if check == 10 { check = 0 } else if check == 11 { check = 5 }
        return check == values[8]
    }
}
