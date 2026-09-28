import Foundation

/// Per-server sync and offline-cache choices: Settings → Sync & Offline Cache, and the sheet before the first full sync.
struct OfflineCacheSettings: Equatable, Sendable, Codable {
    /// Walk the whole tree on every cold launch. Off, launch pulls only what changed; a full sync still runs on first
    /// login, from Settings, once a week, and when the server's change history can't be followed.
    var fullSyncOnLaunch = true
    /// Keep bodies of image and file notes (videos, audio and PDFs are file notes) for offline use.
    var cachesMediaBodies = true
    /// With `cachesMediaBodies`, also keep those over `largeMediaThreshold`.
    var cachesLargeMediaBodies = true
    /// The user has answered the first-sync sheet (or had a full sync before it existed).
    var hasChosenFirstSync = false

    static let largeMediaThreshold = 5 * 1024 * 1024

    /// The most a media body may weigh for sync to keep it; `nil` when there is no limit.
    var maxMediaBodyBytes: Int? {
        cachesLargeMediaBodies ? nil : Self.largeMediaThreshold
    }

    /// Image and file notes (Trilium's types for pictures, videos, audio, PDFs and other uploads).
    static func isMediaNote(type: String) -> Bool {
        type == NoteType.image.rawValue || type == NoteType.file.rawValue
    }

    // MARK: - Storage (UserDefaults, per server profile)

    private static func key(profileId: String) -> String {
        "trinote.offlineCacheSettings." + profileId
    }

    static func load(profileId: String, defaults: UserDefaults = .standard) -> OfflineCacheSettings {
        guard let data = defaults.data(forKey: key(profileId: profileId)),
              let settings = try? JSONDecoder().decode(OfflineCacheSettings.self, from: data)
        else { return OfflineCacheSettings() }
        return settings
    }

    func save(profileId: String, defaults: UserDefaults = .standard) {
        guard let data = try? JSONEncoder().encode(self) else { return }
        defaults.set(data, forKey: Self.key(profileId: profileId))
    }

    static func remove(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: key(profileId: profileId))
    }
}

/// Which note bodies a sync may download, from `OfflineCacheSettings`.
struct MediaBodyPolicy: Sendable, Equatable {
    var cachesMediaBodies = true
    var cachesLargeMediaBodies = true

    init(cachesMediaBodies: Bool = true, cachesLargeMediaBodies: Bool = true) {
        self.cachesMediaBodies = cachesMediaBodies
        self.cachesLargeMediaBodies = cachesLargeMediaBodies
    }

    init(_ settings: OfflineCacheSettings) {
        self.init(cachesMediaBodies: settings.cachesMediaBodies, cachesLargeMediaBodies: settings.cachesLargeMediaBodies)
    }

    /// Whether sync may download this note's body. A media body skipped for its size isn't tried again until it
    /// changes or large bodies are allowed again.
    func allowsBody(type: String, blobId: String?, skippedBlobId: String?) -> Bool {
        guard OfflineCacheSettings.isMediaNote(type: type) else { return true }
        guard cachesMediaBodies else { return false }
        if !cachesLargeMediaBodies, let skippedBlobId, skippedBlobId == blobId { return false }
        return true
    }
}
