import Foundation

/// The attributes Trilium itself gives a meaning to: the kind of value each built-in label holds, its choices,
/// and desktop's explanation of it, from `TriliumAttributeCatalog.json`. That file is generated from the Trilium
/// source by `Scripts/generate_trilium_attribute_catalog.py`; rerun it to pick up a newer Trilium.
final class TriliumAttributeCatalog: Sendable {
    struct Builtin: Hashable, Sendable, Identifiable {
        let type: AttributeItem.AttributeKind
        let name: String
        /// What a built-in label holds; `nil` for relations.
        let valueType: TriliumLabelType?
        /// The values a `select` label offers, in order.
        let selectOptions: [String]
        /// Makes Trilium run code or embed content, on desktop or on shared pages (Trilium disables these on
        /// a safe import).
        let isDangerous: Bool

        var id: String { TriliumAttributeCatalog.key(type, name) }
    }

    static let shared: TriliumAttributeCatalog = {
        guard let url = Bundle.main.url(forResource: "TriliumAttributeCatalog", withExtension: "json"),
              let data = try? Data(contentsOf: url) else {
            return TriliumAttributeCatalog(data: Data(), languages: [])
        }
        return TriliumAttributeCatalog(data: data, languages: Bundle.main.preferredLocalizations)
    }()

    private let builtins: [Builtin]
    private let builtinsByKey: [String: Builtin]
    /// Explanations in the language in use, English where that language has none. Inline Markdown.
    private let helpByKey: [String: String]

    /// - Parameter languages: The app's localizations in order of preference (`Bundle.preferredLocalizations`).
    init(data: Data, languages: [String]) {
        let file = (try? JSONDecoder().decode(CatalogFile.self, from: data)) ?? CatalogFile(attributes: [], help: [:])
        let builtins = file.attributes.compactMap { entry -> Builtin? in
            guard let type = AttributeItem.AttributeKind(rawValue: entry.type) else { return nil }
            return Builtin(
                type: type,
                name: entry.name,
                valueType: entry.valueType.flatMap(TriliumLabelType.init(rawValue:)),
                selectOptions: entry.selectOptions ?? [],
                isDangerous: entry.isDangerous ?? false
            )
        }
        self.builtins = builtins
        self.builtinsByKey = Dictionary(builtins.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })

        var help = file.help["en"] ?? [:]
        if let language = languages.lazy.map(Self.languageCode).first(where: { file.help[$0] != nil }),
           language != "en", let localized = file.help[language] {
            help.merge(localized) { _, localized in localized }
        }
        self.helpByKey = help
    }

    func builtin(_ type: AttributeItem.AttributeKind, _ name: String) -> Builtin? {
        builtinsByKey[Self.key(type, name)]
    }

    /// Desktop's explanation of a built-in attribute, as inline Markdown (code spans, "• " lines, links).
    func help(_ type: AttributeItem.AttributeKind, _ name: String) -> String? {
        helpByKey[Self.key(type, name)]
    }

    /// The explanation ready to show; its links are only ever `http(s)` (the generator drops any other).
    func attributedHelp(_ type: AttributeItem.AttributeKind, _ name: String) -> AttributedString? {
        help(type, name).map(Self.attributed)
    }

    /// The first line of the explanation, for a suggestion row.
    func helpSummary(_ type: AttributeItem.AttributeKind, _ name: String) -> AttributedString? {
        guard let help = help(type, name) else { return nil }
        let firstLine = help.split(separator: "\n", maxSplits: 1).first.map(String.init) ?? help
        return Self.attributed(firstLine)
    }

    /// Built-in names for an attribute name field: every one (A–Z) for an empty query; otherwise names
    /// containing the query, names starting with it first as on desktop, then names whose explanation mentions
    /// it. Attributes Trilium manages from note content are left out, as the server does.
    func suggestions(_ type: AttributeItem.AttributeKind, matching query: String) -> [Builtin] {
        let candidates = builtins.filter { $0.type == type && !AttributeNames.isAutoLink(type: type, name: $0.name) }
        let needle = query.trimmingCharacters(in: .whitespaces).lowercased()
        guard !needle.isEmpty else {
            return candidates.sorted(by: Self.byName)
        }
        var prefixed: [Builtin] = []
        var containing: [Builtin] = []
        var described: [Builtin] = []
        for builtin in candidates {
            let name = builtin.name.lowercased()
            if name.hasPrefix(needle) {
                prefixed.append(builtin)
            } else if name.contains(needle) {
                containing.append(builtin)
            } else if help(type, builtin.name)?.lowercased().contains(needle) == true {
                described.append(builtin)
            }
        }
        return prefixed.sorted(by: Self.byName) + containing.sorted(by: Self.byName) + described.sorted(by: Self.byName)
    }

    private static func byName(_ lhs: Builtin, _ rhs: Builtin) -> Bool {
        lhs.name.localizedCaseInsensitiveCompare(rhs.name) == .orderedAscending
    }

    private static func key(_ type: AttributeItem.AttributeKind, _ name: String) -> String {
        "\(type.rawValue):\(name)"
    }

    /// `pt-BR` → `pt`; the catalog is keyed by language only.
    private static func languageCode(_ localization: String) -> String {
        String(localization.prefix { $0 != "-" && $0 != "_" }).lowercased()
    }

    private static func attributed(_ markdown: String) -> AttributedString {
        let options = AttributedString.MarkdownParsingOptions(interpretedSyntax: .inlineOnlyPreservingWhitespace)
        return (try? AttributedString(markdown: markdown, options: options)) ?? AttributedString(markdown)
    }

    private struct CatalogFile: Decodable {
        struct Entry: Decodable {
            let type: String
            let name: String
            let valueType: String?
            let selectOptions: [String]?
            let isDangerous: Bool?
        }

        let attributes: [Entry]
        let help: [String: [String: String]]
    }
}
