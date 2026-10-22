import Foundation

/// The kinds of value a label can hold: Trilium's `LABEL_TYPES`, in the order desktop offers them.
enum TriliumLabelType: String, CaseIterable, Sendable {
    case text, textarea, number, boolean, select, date, datetime, time, url, email, phone, color
}

/// A promoted-attribute definition: the value of a `#label:<name>` or `#relation:<name>` label, such as
/// `promoted,alias=Due,single,date`. Parsed and written like Trilium's
/// `packages/commons/src/lib/promoted_attribute_definition_parser.ts`, so a definition survives a round trip
/// through either app.
struct PromotedAttributeDefinition: Equatable, Sendable {
    enum Multiplicity: String, CaseIterable, Sendable {
        case single, multi
    }

    var isPromoted = false
    var labelType: TriliumLabelType?
    var multiplicity: Multiplicity?
    var numberPrecision: Int?
    /// The values a `select` field offers, in order.
    var selectOptions: [String]?
    var promotedAlias: String?
    var inverseRelation: String?

    init() {}

    /// Tokens are matched leniently, as in Trilium: whitespace around them is trimmed, a later token of the same
    /// kind wins, and an unrecognized token is skipped.
    init(parsing value: String) {
        for raw in value.split(separator: ",", omittingEmptySubsequences: false) {
            let token = raw.trimmingCharacters(in: .whitespaces)
            if token == "promoted" {
                isPromoted = true
            } else if let type = TriliumLabelType(rawValue: token) {
                labelType = type
            } else if let multiplicity = Multiplicity(rawValue: token) {
                self.multiplicity = multiplicity
            } else if token.hasPrefix("precision") {
                numberPrecision = Self.parseLeadingInteger(Self.parameterValue(token) ?? "")
            } else if token.hasPrefix("options") {
                selectOptions = (Self.parameterValue(token) ?? "")
                    .split(separator: ";", omittingEmptySubsequences: true)
                    .map { Self.decodeOption(String($0)) }
            } else if token.hasPrefix("alias") {
                promotedAlias = Self.parameterValue(token)
            } else if token.hasPrefix("inverse") {
                inverseRelation = AttributeNames.filter(Self.parameterValue(token) ?? "")
            }
        }
    }

    /// The comma-separated form stored in the definition's value. Multiplicity and label type are always
    /// written, falling back to `single` and `text` as Trilium does.
    func serialized(for type: AttributeItem.AttributeKind) -> String {
        var props: [String] = []
        if isPromoted {
            props.append("promoted")
        }
        if let promotedAlias, !promotedAlias.isEmpty {
            props.append("alias=\(promotedAlias)")
        }
        props.append((multiplicity ?? .single).rawValue)

        switch type {
        case .label:
            let labelType = labelType ?? .text
            props.append(labelType.rawValue)
            if labelType == .number, let numberPrecision {
                props.append("precision=\(numberPrecision)")
            }
            if labelType == .select, let selectOptions, !selectOptions.isEmpty {
                props.append("options=" + selectOptions.map(Self.encodeOption).joined(separator: ";"))
            }
        case .relation:
            if let inverseRelation, !inverseRelation.trimmingCharacters(in: .whitespaces).isEmpty {
                props.append("inverse=\(AttributeNames.filter(inverseRelation))")
            }
        }
        return props.joined(separator: ",")
    }

    /// Everything after the first `=` (an alias may itself contain `=`), or `nil` when there is none.
    private static func parameterValue(_ token: String) -> String? {
        guard let separator = token.firstIndex(of: "=") else { return nil }
        return String(token[token.index(after: separator)...])
    }

    /// JavaScript's `parseInt`: optional leading whitespace and sign, then as many digits as there are.
    private static func parseLeadingInteger(_ text: String) -> Int? {
        var rest = Substring(text).drop { $0.isWhitespace }
        var sign = 1
        if let first = rest.first, first == "-" || first == "+" {
            sign = first == "-" ? -1 : 1
            rest = rest.dropFirst()
        }
        let digits = rest.prefix { $0.isASCII && $0.isNumber }
        guard !digits.isEmpty, let magnitude = Int(digits) else { return nil }
        return sign * magnitude
    }

    // `;` separates options and `,` separates tokens, so both are escaped URL-style, `%` first.
    private static func encodeOption(_ option: String) -> String {
        option
            .replacingOccurrences(of: "%", with: "%25")
            .replacingOccurrences(of: ",", with: "%2C")
            .replacingOccurrences(of: ";", with: "%3B")
    }

    // The exact inverse of `encodeOption`, `%25` last so a decoded `%` can't start another escape.
    private static func decodeOption(_ option: String) -> String {
        option
            .replacingOccurrences(of: "%2C", with: ",", options: .caseInsensitive)
            .replacingOccurrences(of: "%3B", with: ";", options: .caseInsensitive)
            .replacingOccurrences(of: "%25", with: "%", options: .caseInsensitive)
    }
}
