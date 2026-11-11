import SwiftUI

/// A saved search note: like Trilium, it runs its query every time it's opened and lists what it finds.
struct SavedSearchNoteView: View {
    let viewModel: NoteDetailViewModel
    let note: NoteItem
    let onOpenNote: (String) -> Void

    @Environment(AppState.self) private var appState

    private enum Phase: Equatable {
        case loading
        case offline
        case failed
        case ready(NoteDetailViewModel.SavedSearchResults)
    }

    /// Results are loaded this many at a time; a search can match thousands of notes.
    private static let pageSize = 50

    @State private var phase: Phase = .loading
    @State private var shown: [NoteItem] = []
    /// How many of the result ids have been asked for. Can pass `shown.count`: a result may have been deleted since.
    @State private var requested = 0
    @State private var isLoadingMore = false
    @State private var retries = 0

    /// Changes whenever the search should run again: pull-to-refresh or a sync (both reload the sub-notes), coming
    /// back online, or the protected session opening or closing.
    private var runKey: String {
        "\(note.noteId)|\(viewModel.childrenRevision)|\(appState.isOnline)|\(appState.protectedSessionActive)|\(retries)"
    }

    private var searchString: String? {
        guard let value = note.attributes.first(where: { $0.type == .label && $0.name == "searchString" })?.value
            .trimmingCharacters(in: .whitespacesAndNewlines), !value.isEmpty else { return nil }
        return value
    }

    var body: some View {
        content
            .frame(maxWidth: .infinity, alignment: .leading)
            .task(id: runKey) { await run() }
    }

    @ViewBuilder
    private var content: some View {
        switch phase {
        case .loading:
            ProgressView()
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
        case .offline:
            message(String(localized: "Connect to your server to run this search.", comment: "Saved search note while offline"), systemImage: "wifi.slash")
        case .failed:
            VStack(spacing: 12) {
                message(String(localized: "This search couldn’t be run.", comment: "Saved search note: the request failed"), systemImage: "exclamationmark.triangle")
                Button(String(localized: "Try Again", comment: "Retry")) { retries += 1 }
                    .buttonStyle(.bordered)
            }
            .frame(maxWidth: .infinity)
        case .ready(let results):
            if let error = results.error {
                // Trilium's own words about the query, such as a parse error.
                message(error, systemImage: "exclamationmark.triangle")
            } else if results.noteIds.isEmpty {
                message(String(localized: "No notes match this search.", comment: "Saved search note with no results"), systemImage: "magnifyingglass")
            } else {
                resultsList(results)
            }
        }
    }

    private func message(_ text: String, systemImage: String) -> some View {
        VStack(spacing: 12) {
            Image(systemName: systemImage)
                .font(.title2)
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)
            Text(text)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 32)
        .padding(.horizontal)
    }

    private func resultsList(_ results: NoteDetailViewModel.SavedSearchResults) -> some View {
        LazyVStack(alignment: .leading, spacing: 0) {
            VStack(alignment: .leading, spacing: 2) {
                Text(
                    results.noteIds.count == 1
                        ? String(localized: "1 result", comment: "Search results count")
                        : String(localized: "\(results.noteIds.count) results", comment: "Search results count")
                )
                .font(.footnote.weight(.semibold))
                .foregroundStyle(.secondary)
                if let searchString {
                    Text(searchString)
                        .font(.caption.monospaced())
                        .foregroundStyle(.secondary)
                        .textSelection(.enabled)
                }
            }
            .padding(.horizontal)
            .padding(.vertical, 10)

            ForEach(shown, id: \.noteId) { result in
                Divider().padding(.leading)
                Button {
                    onOpenNote(result.noteId)
                } label: {
                    SearchResultRow(note: result, highlightTerms: results.highlightTerms)
                        .padding(.horizontal)
                        .padding(.vertical, 10)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
            }

            if requested < results.noteIds.count {
                Divider().padding(.leading)
                Button {
                    Task { await loadMore(results) }
                } label: {
                    Group {
                        if isLoadingMore {
                            ProgressView()
                        } else {
                            Text(String(localized: "Show More", comment: "Saved search note: load the next page of results"))
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                }
                .disabled(isLoadingMore)
            }
        }
    }

    private func run() async {
        guard appState.isOnline, viewModel.client != nil else {
            phase = .offline
            return
        }
        // The list stays up while a refresh runs.
        if case .ready = phase {} else { phase = .loading }
        do {
            let results = try await viewModel.runSavedSearch()
            let firstPage = Array(results.noteIds.prefix(Self.pageSize))
            let notes = await viewModel.savedSearchNotes(ids: firstPage)
            guard !Task.isCancelled else { return }
            shown = notes
            requested = firstPage.count
            phase = .ready(results)
        } catch {
            if case .cancelled = APIError.from(error) { return }
            guard !Task.isCancelled else { return }
            Log.api.warning("Saved search failed: \(error)")
            phase = .failed
        }
    }

    private func loadMore(_ results: NoteDetailViewModel.SavedSearchResults) async {
        guard !isLoadingMore else { return }
        isLoadingMore = true
        defer { isLoadingMore = false }
        let nextPage = Array(results.noteIds.dropFirst(requested).prefix(Self.pageSize))
        let notes = await viewModel.savedSearchNotes(ids: nextPage)
        shown += notes
        requested += nextPage.count
    }
}
