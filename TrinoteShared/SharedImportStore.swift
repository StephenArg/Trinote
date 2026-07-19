import Foundation

enum SharedImportStoreError: Error, LocalizedError {
    case appGroupUnavailable
    case noPendingPayload
    case encodeFailed
    case decodeFailed

    var errorDescription: String? {
        switch self {
        case .appGroupUnavailable:
            "App Group container is unavailable. Check that both targets use group.com.trinote."
        case .noPendingPayload:
            "No pending shared import was found."
        case .encodeFailed:
            "Could not encode the shared import payload."
        case .decodeFailed:
            "Could not decode the shared import payload."
        }
    }
}

/// Read/write pending share imports via the App Group container.
enum SharedImportStore {
    private static var containerURL: URL? {
        FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: SharedImportConstants.appGroupIdentifier
        )
    }

    private static var metadataURL: URL? {
        containerURL?.appendingPathComponent(SharedImportConstants.metadataFileName)
    }

    private static var binaryURL: URL? {
        containerURL?.appendingPathComponent(SharedImportConstants.binaryFileName)
    }

    static func write(payload: SharedImportPayload, binaryData: Data?) throws {
        guard let metadataURL, let binaryURL else {
            throw SharedImportStoreError.appGroupUnavailable
        }
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        guard let data = try? encoder.encode(payload) else {
            throw SharedImportStoreError.encodeFailed
        }
        try data.write(to: metadataURL, options: .atomic)
        if let binaryData, payload.hasBinaryData {
            try binaryData.write(to: binaryURL, options: .atomic)
        } else if FileManager.default.fileExists(atPath: binaryURL.path) {
            try? FileManager.default.removeItem(at: binaryURL)
        }
    }

    static func load() throws -> SharedImportPackage {
        guard let metadataURL else {
            throw SharedImportStoreError.appGroupUnavailable
        }
        guard FileManager.default.fileExists(atPath: metadataURL.path) else {
            throw SharedImportStoreError.noPendingPayload
        }
        let data = try Data(contentsOf: metadataURL)
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        guard let payload = try? decoder.decode(SharedImportPayload.self, from: data) else {
            throw SharedImportStoreError.decodeFailed
        }
        var binary: Data?
        if payload.hasBinaryData, let binaryURL,
           FileManager.default.fileExists(atPath: binaryURL.path) {
            binary = try Data(contentsOf: binaryURL)
        }
        return SharedImportPackage(payload: payload, binaryData: binary)
    }

    static func peekExists() -> Bool {
        guard let metadataURL else { return false }
        return FileManager.default.fileExists(atPath: metadataURL.path)
    }

    static func clear() {
        guard let metadataURL, let binaryURL else { return }
        try? FileManager.default.removeItem(at: metadataURL)
        try? FileManager.default.removeItem(at: binaryURL)
    }
}
