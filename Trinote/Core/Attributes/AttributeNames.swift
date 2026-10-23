import Foundation

/// Trilium's rules for attribute names (`packages/commons/src/lib/attribute_names.ts`): letters, numbers,
/// underscore and colon, in any script. Desktop strips every other character as you type.
enum AttributeNames {
    /// Whether `name` is non-empty and holds only allowed characters.
    static func isValid(_ name: String) -> Bool {
        !name.isEmpty && name.unicodeScalars.allSatisfy(isAllowed)
    }

    /// `name` without the characters an attribute name may not hold (possibly empty).
    static func filter(_ name: String) -> String {
        String(String.UnicodeScalarView(name.unicodeScalars.filter(isAllowed)))
    }

    /// Attributes Trilium keeps in step with the note's content (links, images, includes, bookmarks).
    /// Desktop's attribute editor hides them, and its bulk save never deletes them.
    static func isAutoLink(type: AttributeItem.AttributeKind, name: String) -> Bool {
        switch type {
        case .relation:
            return ["internalLink", "imageLink", "relationMapLink", "includeNoteLink"].contains(name)
        case .label:
            return name == "internalBookmark"
        }
    }

    /// The attribute a definition label (`#label:status`, `#relation:author`) describes, or `nil` when `name`
    /// isn't a definition. Only labels are definitions.
    static func definedAttribute(byDefinitionName name: String) -> (type: AttributeItem.AttributeKind, name: String)? {
        if name.hasPrefix("label:") {
            return (.label, String(name.dropFirst("label:".count)))
        }
        if name.hasPrefix("relation:") {
            return (.relation, String(name.dropFirst("relation:".count)))
        }
        return nil
    }

    /// The label name that defines `name` (`label:status` for the `status` label).
    static func definitionName(for type: AttributeItem.AttributeKind, name: String) -> String {
        "\(type.rawValue):\(name)"
    }

    // `\p{L}\p{N}_:` in JavaScript, which tests each code point.
    private static func isAllowed(_ scalar: Unicode.Scalar) -> Bool {
        if scalar == "_" || scalar == ":" { return true }
        switch scalar.properties.generalCategory {
        case .uppercaseLetter, .lowercaseLetter, .titlecaseLetter, .modifierLetter, .otherLetter,
             .decimalNumber, .letterNumber, .otherNumber:
            return true
        default:
            return false
        }
    }
}

/// Trilium's note, attribute and branch ids: ASCII letters, digits and `_` (`root`, `_hidden`, `aB3dE5fG7hJ9`).
/// Ids read from server data are checked before they go into a request path, so a crafted value such as `..`
/// can't turn into another route (`DELETE …/attributes/..` would otherwise reach `DELETE /api/notes/X` behind a
/// proxy that normalizes paths).
enum TriliumEntityId {
    /// A new random 12-character id in that character set (letters and digits), as Trilium's `randomString(12)` makes.
    static func random() -> String {
        let alphabet = Array("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
        return String((0..<12).map { _ in alphabet.randomElement()! })
    }

    static func isValid(_ id: String) -> Bool {
        guard !id.isEmpty, id.utf8.count <= 128 else { return false }
        return id.utf8.allSatisfy { byte in
            (byte >= 0x30 && byte <= 0x39) // 0-9
                || (byte >= 0x41 && byte <= 0x5A) // A-Z
                || (byte >= 0x61 && byte <= 0x7A) // a-z
                || byte == 0x5F // _
        }
    }
}
