import Foundation
import Observation
import SwiftData

@Observable
@MainActor
final class SearchViewModel {
    var query = ""
    var results: [NoteItem] = []
    var isSearching = false
    var error: String?
    var recentSearches: [RecentSearch] = []
    var hasSearched = false
    var isOfflineResults = false

    private var searchTask: Task<Void, Never>?
    private let appState: AppState
    private let persistence = PersistenceManager.shared

    init(appState: AppState) {
        self.appState = appState
    }

    var client: (any TriliumClientProtocol)? { appState.client }
    var serverProfileId: String? { appState.activeProfile?.id }

    func onQueryChanged() {
        searchTask?.cancel()
        guard !query.trimmingCharacters(in: .whitespaces).isEmpty else {
            results = []
            hasSearched = false
            isOfflineResults = false
            return
        }

        searchTask = Task {
            try? await Task.sleep(milliseconds: 400)
            guard !Task.isCancelled else { return }
            await performSearch()
        }
    }

    func performSearch() async {
        let trimmed = query.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }

        isSearching = true
        error = nil
        hasSearched = true
        isOfflineResults = false
        defer { isSearching = false }

        if let client {
            do {
                let response = try await client.searchNotes(query: trimmed, fastSearch: false, includeArchived: false, ancestorNoteId: nil, orderBy: nil, orderDirection: nil, limit: 50)
                guard !Task.isCancelled else { return }
                results = response.results.map(NoteItem.init)

                if let profileId = serverProfileId {
                    try? persistence.recordRecentSearch(query: trimmed, serverProfileId: profileId)
                    loadRecentSearches()
                }
            } catch {
                guard !Task.isCancelled else { return }
                let apiError = APIError.from(error)
                if case .cancelled = apiError { return }

                self.error = apiError.localizedDescription
                Log.api.error("Search failed: \(error)")

                // Fall back to local title search
                performOfflineSearch(trimmed)
            }
        } else {
            performOfflineSearch(trimmed)
        }
    }

    private func performOfflineSearch(_ query: String) {
        guard let profileId = serverProfileId else { return }
        let lowered = query.lowercased()
        do {
            let allNotes = try persistence.context.fetch(
                FetchDescriptor<CachedNote>(
                    predicate: #Predicate<CachedNote> { $0.serverProfileId == profileId }
                )
            )
            let matched = allNotes
                .filter { $0.title.lowercased().contains(lowered) }
                .prefix(30)
                .map { cached in
                    NoteItem(
                        noteId: cached.noteId,
                        title: cached.title,
                        type: NoteType(rawValue: cached.noteType) ?? .text,
                        mime: cached.mime,
                        isProtected: cached.isProtected,
                        dateCreated: "",
                        dateModified: "",
                        parentNoteIds: cached.parentNoteIds,
                        childNoteIds: cached.childNoteIds,
                        parentBranchIds: cached.parentBranchIds,
                        childBranchIds: cached.childBranchIds,
                        attributes: []
                    )
                }
            results = Array(matched)
            isOfflineResults = true
        } catch {
            Log.persistence.error("Offline search failed: \(error)")
        }
    }

    func loadRecentSearches() {
        guard let profileId = serverProfileId else { return }
        do {
            recentSearches = try persistence.fetchRecentSearches(serverProfileId: profileId)
        } catch {
            Log.persistence.error("Failed to load recent searches: \(error)")
        }
    }

    func selectRecentSearch(_ search: RecentSearch) {
        query = search.query
        searchTask?.cancel()
        Task { await performSearch() }
    }

    func clearSearch() {
        query = ""
        results = []
        hasSearched = false
        isOfflineResults = false
        searchTask?.cancel()
    }
}
