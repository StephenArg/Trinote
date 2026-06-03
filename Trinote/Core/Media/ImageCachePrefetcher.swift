import Foundation
import Observation
import UIKit

@Observable
@MainActor
final class ImageCachePrefetcher {
    private(set) var isRunning = false
    private(set) var prefetchedCount = 0
    private(set) var totalImageRefs = 0
    private(set) var lastError: String?

    private var prefetchTask: Task<Void, Never>?
    private var backgroundTaskId: UIBackgroundTaskIdentifier = .invalid
    private let persistence = PersistenceManager.shared
    private let cacheExclusion = CacheExclusionPolicy()
    private static let maxConcurrency = 8

    func prefetchAllInlineImages(client: any TriliumClientProtocol, profileId: String) {
        cancel()
        prefetchTask = Task {
            await self.performPrefetch(client: client, profileId: profileId)
        }
    }

    func cancel() {
        prefetchTask?.cancel()
        prefetchTask = nil
        if isRunning {
            isRunning = false
        }
        endBackgroundTimeExtension()
    }

    func beginBackgroundTimeExtensionIfNeeded() {
        guard isRunning else { return }
        guard backgroundTaskId == .invalid else { return }
        backgroundTaskId = UIApplication.shared.beginBackgroundTask(withName: "TrinoteImagePrefetch") { [weak self] in
            Task { @MainActor in
                self?.cancel()
            }
        }
    }

    private func endBackgroundTimeExtension() {
        guard backgroundTaskId != .invalid else { return }
        UIApplication.shared.endBackgroundTask(backgroundTaskId)
        backgroundTaskId = .invalid
    }

    private func performPrefetch(client: any TriliumClientProtocol, profileId: String) async {
        isRunning = true
        prefetchedCount = 0
        totalImageRefs = 0
        lastError = nil
        beginBackgroundTimeExtensionIfNeeded()
        defer {
            isRunning = false
            prefetchTask = nil
            endBackgroundTimeExtension()
        }

        do {
            let bodies = try persistence.cachedNoteBodies(serverProfileId: profileId)
            var refs: [(TriliumInlineImageCaching.Reference, String, [String])] = []
            for (noteId, content) in bodies {
                if Task.isCancelled { return }
                let parentNoteIds = (try? persistence.fetchCachedNote(id: noteId, serverProfileId: profileId))?.parentNoteIds ?? []
                if cacheExclusion.isNoteExcludedFromCache(
                    noteId: noteId,
                    parentNoteIds: parentNoteIds,
                    serverProfileId: profileId
                ) {
                    continue
                }
                guard let html = String(data: content, encoding: .utf8) else { continue }
                for ref in TriliumInlineImageCaching.extractImageReferences(from: html) {
                    refs.append((ref, noteId, parentNoteIds))
                }
            }

            totalImageRefs = refs.count
            guard !refs.isEmpty else { return }

            for batchStart in stride(from: 0, to: refs.count, by: Self.maxConcurrency) {
                if Task.isCancelled { return }

                let batchEnd = min(batchStart + Self.maxConcurrency, refs.count)
                let batch = Array(refs[batchStart..<batchEnd])

                await withTaskGroup(of: Void.self) { group in
                    for item in batch {
                        group.addTask {
                            if Task.isCancelled { return }
                            _ = await TriliumInlineImageCaching.fetchAndCache(
                                reference: item.0,
                                client: client,
                                persistence: self.persistence,
                                serverProfileId: profileId,
                                sourceNoteId: item.1,
                                parentNoteIds: item.2
                            )
                        }
                    }
                    for await _ in group {}
                }

                prefetchedCount = batchEnd
            }
        } catch {
            if Task.isCancelled { return }
            lastError = error.localizedDescription
            Log.sync.warning("Image prefetch failed: \(error)")
        }
    }
}
