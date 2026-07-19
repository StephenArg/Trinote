import Foundation

/// Metadata written by the Share Extension for the main app to consume.
struct SharedImportPayload: Codable, Sendable, Equatable {
    var id: String
    var createdAt: Date
    var filename: String?
    var mimeType: String?
    var uti: String?
    var kind: SharedImportKind
    /// UTF-8 text when kind is `.plainText` or `.markdown`, or a shared URL string.
    var text: String?
    /// When true, binary bytes live at `SharedImportConstants.binaryFileName` in the App Group.
    var hasBinaryData: Bool

    init(
        id: String = UUID().uuidString,
        createdAt: Date = .now,
        filename: String?,
        mimeType: String?,
        uti: String?,
        kind: SharedImportKind,
        text: String?,
        hasBinaryData: Bool
    ) {
        self.id = id
        self.createdAt = createdAt
        self.filename = filename
        self.mimeType = mimeType
        self.uti = uti
        self.kind = kind
        self.text = text
        self.hasBinaryData = hasBinaryData
    }
}

/// Payload plus optional binary bytes loaded from the App Group.
struct SharedImportPackage: Sendable, Equatable {
    var payload: SharedImportPayload
    var binaryData: Data?
}
