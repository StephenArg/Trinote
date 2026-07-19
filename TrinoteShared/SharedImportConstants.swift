import Foundation

/// Constants shared by the Share Extension and the main Trinote app.
enum SharedImportConstants {
    static let appGroupIdentifier = "group.com.trinote"
    static let hostURLScheme = "trinote"
    static let hostURLHost = "share-import"
    static let hostOpenURL = URL(string: "trinote://share-import")!

    static let metadataFileName = "pending-share-import.json"
    static let binaryFileName = "pending-share-import.bin"
}
