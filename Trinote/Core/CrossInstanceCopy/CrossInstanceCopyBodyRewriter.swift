import Foundation

/// Rewrites Trilium `api/attachments` / `api/images` (and local `trinote-img://`) URLs after a cross-instance copy.
enum CrossInstanceCopyBodyRewriter {
    private static let apiPattern = try! NSRegularExpression(
        pattern: #"(?i)api/(attachments|images)/([a-zA-Z0-9_-]+)"#,
        options: []
    )
    private static let schemePattern = try! NSRegularExpression(
        pattern: #"trinote-img://(attachments|images)/([a-zA-Z0-9_-]+)"#,
        options: []
    )

    static func referencedEntityIDs(in data: Data) -> (attachmentIds: Set<String>, imageNoteIds: Set<String>) {
        guard let text = String(data: data, encoding: .utf8) else {
            return ([], [])
        }
        return referencedEntityIDs(in: text)
    }

    static func referencedEntityIDs(in text: String) -> (attachmentIds: Set<String>, imageNoteIds: Set<String>) {
        var attachments = Set<String>()
        var imageNotes = Set<String>()
        collectIDs(in: text, pattern: apiPattern, attachments: &attachments, imageNotes: &imageNotes)
        collectIDs(in: text, pattern: schemePattern, attachments: &attachments, imageNotes: &imageNotes)
        return (attachments, imageNotes)
    }

    /// Maps source entity ids to destination ids in UTF-8 text bodies (HTML, JSON, SVG). Binary bodies are unchanged.
    static func rewrite(
        _ data: Data,
        attachmentIdMap: [String: String],
        imageNoteIdMap: [String: String],
        imageNoteToAttachmentId: [String: String]
    ) -> Data {
        guard var text = String(data: data, encoding: .utf8) else { return data }
        text = normalizeTrinoteImageScheme(text)
        text = applyPrefixMap(text, pathPrefix: "api/attachments/", map: attachmentIdMap)
        text = rewriteImageRoutes(
            text,
            imageNoteIdMap: imageNoteIdMap,
            imageNoteToAttachmentId: imageNoteToAttachmentId
        )
        guard let out = text.data(using: .utf8) else { return data }
        return out
    }

    static func attachmentImageSrc(attachmentId: String, filename: String) -> String {
        let encoded = filename.addingPercentEncoding(withAllowedCharacters: attachmentFilenameAllowed) ?? filename
        return "api/attachments/\(attachmentId)/image/\(encoded)"
    }

    private static let attachmentFilenameAllowed = CharacterSet.alphanumerics
        .union(CharacterSet(charactersIn: "-_.!~*'()"))

    private static func collectIDs(
        in text: String,
        pattern: NSRegularExpression,
        attachments: inout Set<String>,
        imageNotes: inout Set<String>
    ) {
        let ns = text as NSString
        let range = NSRange(location: 0, length: ns.length)
        for match in pattern.matches(in: text, options: [], range: range) {
            guard match.numberOfRanges >= 3 else { continue }
            let route = ns.substring(with: match.range(at: 1)).lowercased()
            let entityId = ns.substring(with: match.range(at: 2))
            if route == "attachments" {
                attachments.insert(entityId)
            } else if route == "images" {
                imageNotes.insert(entityId)
            }
        }
    }

    /// `trinote-img://attachments/{id}` → `api/attachments/{id}/image/image.png` so dest HTML is server-valid.
    private static func normalizeTrinoteImageScheme(_ text: String) -> String {
        let ns = text as NSString
        let range = NSRange(location: 0, length: ns.length)
        let matches = schemePattern.matches(in: text, options: [], range: range)
        guard !matches.isEmpty else { return text }
        let result = NSMutableString(string: text)
        for match in matches.reversed() {
            let route = ns.substring(with: match.range(at: 1)).lowercased()
            let entityId = ns.substring(with: match.range(at: 2))
            let replacement: String
            if route == "attachments" {
                replacement = attachmentImageSrc(attachmentId: entityId, filename: "image.png")
            } else {
                replacement = "api/images/\(entityId)/image/image.png"
            }
            result.replaceCharacters(in: match.range, with: replacement)
        }
        return result as String
    }

    private static func rewriteImageRoutes(
        _ text: String,
        imageNoteIdMap: [String: String],
        imageNoteToAttachmentId: [String: String]
    ) -> String {
        let ns = text as NSString
        let range = NSRange(location: 0, length: ns.length)
        let matches = apiPattern.matches(in: text, options: [], range: range)
        guard !matches.isEmpty else { return text }
        let result = NSMutableString(string: text)
        for match in matches.reversed() {
            let route = ns.substring(with: match.range(at: 1)).lowercased()
            guard route == "images" else { continue }
            let oldId = ns.substring(with: match.range(at: 2))
            if let newNoteId = imageNoteIdMap[oldId] {
                result.replaceCharacters(in: match.range, with: "api/images/\(newNoteId)")
            } else if let newAttId = imageNoteToAttachmentId[oldId] {
                result.replaceCharacters(in: match.range, with: "api/attachments/\(newAttId)")
            }
        }
        return result as String
    }

    private static func applyPrefixMap(_ text: String, pathPrefix: String, map: [String: String]) -> String {
        guard !map.isEmpty else { return text }
        var result = text
        let sorted = map.keys.sorted { $0.count > $1.count }
        var tokens: [(token: String, replacement: String)] = []
        for oldId in sorted {
            guard let newId = map[oldId] else { continue }
            let token = "@@COPY_\(oldId.count)_\(tokens.count)@@"
            let needle = "\(pathPrefix)\(oldId)"
            if result.contains(needle) {
                result = result.replacingOccurrences(of: needle, with: "\(pathPrefix)\(token)")
                tokens.append((token, newId))
            }
        }
        for item in tokens {
            result = result.replacingOccurrences(of: item.token, with: item.replacement)
        }
        return result
    }
}
