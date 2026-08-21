import Photos
import UIKit
import UniformTypeIdentifiers

struct PhotoLibraryAlbum: Identifiable, Hashable {
    let id: String
    let title: String
    let collection: PHAssetCollection?
}

/// Encoded bytes for one picked photo: `data` is uploaded as the note's attachment, `preview` is the
/// smaller copy the editor displays until the note is reopened.
struct PhotoLibraryImage: Sendable {
    let data: Data
    let mime: String
    let preview: Data
    let previewMime: String
}

private let photoJPEGQuality: CGFloat = 0.8
private let photoMaxPixelDimension: CGFloat = 3000

private let previewJPEGQuality: CGFloat = 0.6

@Observable
@MainActor
final class PhotoLibraryAssetStore {
    private(set) var albums: [PhotoLibraryAlbum] = []
    private(set) var selectedAlbumID: String?
    private(set) var assets: [PHAsset] = []
    private(set) var isLoading = false

    var selectedAlbumTitle: String {
        albums.first(where: { $0.id == selectedAlbumID })?.title
            ?? String(localized: "Recents", comment: "Default photo album title")
    }

    private let imageManager = PHCachingImageManager()
    private var changeObserver: ChangeObserver?

    private static var imageFetchOptions: PHFetchOptions {
        let options = PHFetchOptions()
        options.predicate = NSPredicate(format: "mediaType == %d", PHAssetMediaType.image.rawValue)
        options.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
        return options
    }

    func start() {
        if changeObserver == nil {
            let observer = ChangeObserver()
            observer.store = self
            PHPhotoLibrary.shared().register(observer)
            changeObserver = observer
        }
        reload()
    }

    func stop() {
        changeObserver?.unregisterIfNeeded()
        changeObserver = nil
        imageManager.stopCachingImagesForAllAssets()
    }

    func selectAlbum(_ album: PhotoLibraryAlbum) {
        selectedAlbumID = album.id
        fetchAssets(for: album)
    }

    func requestThumbnail(
        for asset: PHAsset,
        size: CGSize,
        completion: @escaping (UIImage?) -> Void
    ) -> PHImageRequestID {
        let options = PHImageRequestOptions()
        options.deliveryMode = .opportunistic
        options.resizeMode = .fast
        options.isNetworkAccessAllowed = true
        options.isSynchronous = false
        return imageManager.requestImage(
            for: asset,
            targetSize: size,
            contentMode: .aspectFill,
            options: options
        ) { image, info in
            let cancelled = (info?[PHImageCancelledKey] as? Bool) ?? false
            if cancelled { return }
            Task { @MainActor in
                completion(image)
            }
        }
    }

    func cancelThumbnailRequest(_ requestID: PHImageRequestID) {
        imageManager.cancelImageRequest(requestID)
    }

    /// Web-ready bytes for one asset. Animated GIFs pass through untouched (transcoding would drop
    /// the animation); everything else, HEIC included, becomes a size-capped JPEG so the editor's
    /// `<img>` can always display it.
    func loadImage(for asset: PHAsset) async -> PhotoLibraryImage? {
        if let raw = await requestImageData(for: asset) {
            if Self.isAnimatedGIF(uti: raw.uti) {
                return PhotoLibraryImage(
                    data: raw.data,
                    mime: "image/gif",
                    preview: raw.data,
                    previewMime: "image/gif"
                )
            }
            if let encoded = await Self.encodedCopies(from: raw.data) {
                return encoded
            }
        }
        // Data requests come back empty for some assets (iCloud originals that never finish
        // downloading, edits whose sidecar is missing); a rendered request still succeeds there.
        return await renderCopies(for: asset)
    }

    private func requestImageData(for asset: PHAsset) async -> (data: Data, uti: String?)? {
        await withCheckedContinuation { continuation in
            let options = PHImageRequestOptions()
            options.deliveryMode = .highQualityFormat
            options.isNetworkAccessAllowed = true
            options.isSynchronous = false
            options.version = .current
            let box = ResumeBox()
            PHImageManager.default().requestImageDataAndOrientation(for: asset, options: options) { data, uti, _, _ in
                guard box.tryResume() else { return }
                guard let data, !data.isEmpty else {
                    continuation.resume(returning: nil)
                    return
                }
                continuation.resume(returning: (data, uti))
            }
        }
    }

    private func renderCopies(for asset: PHAsset) async -> PhotoLibraryImage? {
        let image: UIImage? = await withCheckedContinuation { continuation in
            let options = PHImageRequestOptions()
            options.deliveryMode = .highQualityFormat
            options.resizeMode = .none
            options.isNetworkAccessAllowed = true
            options.isSynchronous = false
            let box = ResumeBox()
            PHImageManager.default().requestImage(
                for: asset,
                targetSize: PHImageManagerMaximumSize,
                contentMode: .aspectFit,
                options: options
            ) { image, _ in
                guard box.tryResume() else { return }
                continuation.resume(returning: image)
            }
        }
        guard let image else { return nil }
        return await Self.encodedCopies(from: image)
    }

    private static func isAnimatedGIF(uti: String?) -> Bool {
        guard let uti, let type = UTType(uti) else { return false }
        return type.conforms(to: .gif)
    }

    private static func encodedCopies(from data: Data) async -> PhotoLibraryImage? {
        await Task.detached(priority: .userInitiated) {
            guard let image = UIImage(data: data) else { return nil }
            return encodeCopies(image)
        }.value
    }

    private static func encodedCopies(from image: UIImage) async -> PhotoLibraryImage? {
        await Task.detached(priority: .userInitiated) {
            encodeCopies(image)
        }.value
    }

    /// One decode, two encodes: the upload copy and the editor preview.
    private nonisolated static func encodeCopies(_ image: UIImage) -> PhotoLibraryImage? {
        guard let full = image
            .constrained(to: photoMaxPixelDimension)
            .jpegData(compressionQuality: photoJPEGQuality)
        else { return nil }
        let preview = image
            .constrained(to: EditorImagePreview.maxPixelDimension)
            .jpegData(compressionQuality: previewJPEGQuality)
        return PhotoLibraryImage(
            data: full,
            mime: "image/jpeg",
            preview: preview ?? full,
            previewMime: "image/jpeg"
        )
    }

    func reload() {
        isLoading = true
        let previousID = selectedAlbumID
        albums = Self.fetchAlbums()
        let album = albums.first(where: { $0.id == previousID }) ?? albums.first
        selectedAlbumID = album?.id
        if let album {
            fetchAssets(for: album)
        } else {
            assets = []
        }
        isLoading = false
    }

    private func fetchAssets(for album: PhotoLibraryAlbum) {
        let result: PHFetchResult<PHAsset>
        if let collection = album.collection {
            result = PHAsset.fetchAssets(in: collection, options: Self.imageFetchOptions)
        } else {
            result = PHAsset.fetchAssets(with: .image, options: Self.imageFetchOptions)
        }
        var next: [PHAsset] = []
        next.reserveCapacity(result.count)
        result.enumerateObjects { asset, _, _ in
            next.append(asset)
        }
        assets = next
    }

    private static func fetchAlbums() -> [PhotoLibraryAlbum] {
        var albums: [PhotoLibraryAlbum] = []
        var seen = Set<String>()

        func append(collection: PHAssetCollection, fallbackTitle: String) {
            let id = collection.localIdentifier
            guard !seen.contains(id) else { return }
            let count = PHAsset.fetchAssets(in: collection, options: imageFetchOptions).count
            if count == 0, collection.assetCollectionSubtype != .smartAlbumUserLibrary { return }
            seen.insert(id)
            albums.append(
                PhotoLibraryAlbum(
                    id: id,
                    title: collection.localizedTitle?.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty
                        ?? fallbackTitle,
                    collection: collection
                )
            )
        }

        let recents = PHAssetCollection.fetchAssetCollections(
            with: .smartAlbum,
            subtype: .smartAlbumUserLibrary,
            options: nil
        )
        recents.enumerateObjects { collection, _, _ in
            append(
                collection: collection,
                fallbackTitle: String(localized: "Recents", comment: "Default photo album title")
            )
        }

        let favorites = PHAssetCollection.fetchAssetCollections(
            with: .smartAlbum,
            subtype: .smartAlbumFavorites,
            options: nil
        )
        favorites.enumerateObjects { collection, _, _ in
            append(
                collection: collection,
                fallbackTitle: String(localized: "Favorites", comment: "Photo album title")
            )
        }

        let screenshots = PHAssetCollection.fetchAssetCollections(
            with: .smartAlbum,
            subtype: .smartAlbumScreenshots,
            options: nil
        )
        screenshots.enumerateObjects { collection, _, _ in
            append(
                collection: collection,
                fallbackTitle: String(localized: "Screenshots", comment: "Photo album title")
            )
        }

        let userAlbums = PHAssetCollection.fetchAssetCollections(
            with: .album,
            subtype: .albumRegular,
            options: nil
        )
        userAlbums.enumerateObjects { collection, _, _ in
            append(collection: collection, fallbackTitle: collection.localizedTitle ?? "")
        }

        if albums.isEmpty {
            albums.append(
                PhotoLibraryAlbum(
                    id: "all",
                    title: String(localized: "Recents", comment: "Default photo album title"),
                    collection: nil
                )
            )
        }
        return albums
    }
}

private final class ResumeBox: @unchecked Sendable {
    private let lock = NSLock()
    private var didResume = false

    func tryResume() -> Bool {
        lock.lock()
        defer { lock.unlock() }
        if didResume { return false }
        didResume = true
        return true
    }
}

private final class ChangeObserver: NSObject, PHPhotoLibraryChangeObserver {
    weak var store: PhotoLibraryAssetStore?
    private let lock = NSLock()
    private var registered = true

    func photoLibraryDidChange(_ changeInstance: PHChange) {
        Task { @MainActor [weak store] in
            store?.reload()
        }
    }

    func unregisterIfNeeded() {
        lock.lock()
        let shouldUnregister = registered
        registered = false
        lock.unlock()
        guard shouldUnregister else { return }
        PHPhotoLibrary.shared().unregisterChangeObserver(self)
    }

    deinit {
        unregisterIfNeeded()
    }
}
