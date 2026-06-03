import SwiftUI

/// Top-level notebooks (children of Trilium `root`) the user wants excluded from offline cache.
struct CacheExcludedRootNotesView: View {
    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss

    @State private var rootNoteRows: [RootNoteRow] = []
    @State private var draftCachingEnabled: [String: Bool] = [:]
    @State private var persistedExcluded: Set<String> = []
    @State private var isLoading = false
    @State private var loadError: String?
    @State private var showSaveConfirm = false
    @State private var isApplying = false

    private let policy = CacheExclusionPolicy()
    private static let hiddenNoteIds: Set<String> = TriliumSharing.hiddenSystemChildNoteIds

    private struct RootNoteRow: Identifiable {
        let noteId: String
        let title: String
        var id: String { noteId }
    }

    var body: some View {
        List {
            if isLoading && rootNoteRows.isEmpty {
                HStack {
                    ProgressView()
                    Text(String(localized: "Loading notebooks…", comment: "Cache exclusion list loading"))
                }
            } else if let loadError {
                Text(loadError)
                    .foregroundStyle(.red)
            } else if rootNoteRows.isEmpty {
                Text(String(localized: "No top-level notebooks found.", comment: "Cache exclusion empty"))
                    .foregroundStyle(.secondary)
            } else {
                ForEach(rootNoteRows) { row in
                    Toggle(isOn: cachingEnabledBinding(for: row.noteId)) {
                        Text(row.title)
                    }
                }
            }
        }
        .navigationTitle(String(localized: "Cached Notebooks", comment: "Cache exclusion settings title"))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button(String(localized: "Save", comment: "Save cache exclusion")) {
                    showSaveConfirm = true
                }
                .disabled(!hasPendingChanges || isApplying || appState.client == nil)
            }
        }
        .safeAreaInset(edge: .bottom) {
            Text(
                String(
                    localized: "Unchecked notebooks stay available online but are not stored offline. Clones under other top-level notebooks may still cache. Clearing all cache does not reset these choices.",
                    comment: "Cache exclusion footer"
                )
            )
            .font(.caption)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal)
            .padding(.vertical, 8)
            .background(.bar)
        }
        .task { await reload() }
        .onReceive(NotificationCenter.default.publisher(for: .trinoteTreeShouldRefresh)) { _ in
            Task {
                guard !hasPendingChanges else { return }
                await reload()
            }
        }
        .alert(
            String(localized: "Update cache settings?", comment: "Cache exclusion confirm title"),
            isPresented: $showSaveConfirm
        ) {
            Button(String(localized: "Cancel", comment: "Alert dismiss"), role: .cancel) {}
            Button(String(localized: "Apply", comment: "Confirm cache exclusion"), role: .destructive) {
                Task { await applyChanges() }
            }
        } message: {
            Text(confirmMessage)
        }
        .overlay {
            if isApplying {
                ZStack {
                    Color.black.opacity(0.2).ignoresSafeArea()
                    ProgressView(String(localized: "Updating cache…", comment: "Applying cache exclusion"))
                        .padding()
                        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
                }
            }
        }
    }

    private var hasPendingChanges: Bool {
        Set(rootNoteRows.map(\.noteId).filter { draftCachingEnabled[$0] == false }) != persistedExcluded
    }

    private var confirmMessage: String {
        let newExcluded = Set(rootNoteRows.map(\.noteId).filter { draftCachingEnabled[$0] == false })
        let added = newExcluded.subtracting(persistedExcluded)
        let removed = persistedExcluded.subtracting(newExcluded)
        var parts: [String] = []
        if !added.isEmpty {
            parts.append(
                String(
                    localized: "Stop caching \(added.count) notebook(s) and remove their local data.",
                    comment: "Cache exclusion confirm exclude"
                )
            )
        }
        if !removed.isEmpty {
            parts.append(
                String(
                    localized: "Download and cache \(removed.count) notebook(s) and their sub-notes.",
                    comment: "Cache exclusion confirm include"
                )
            )
        }
        return parts.joined(separator: " ")
    }

    private func cachingEnabledBinding(for noteId: String) -> Binding<Bool> {
        Binding(
            get: { draftCachingEnabled[noteId] ?? true },
            set: { draftCachingEnabled[noteId] = $0 }
        )
    }

    private func reload() async {
        guard let profileId = appState.activeProfile?.id else {
            rootNoteRows = []
            return
        }
        isLoading = true
        loadError = nil
        defer { isLoading = false }

        persistedExcluded = policy.excludedRootNoteIds(serverProfileId: profileId)

        if appState.isOnline, let client = appState.client {
            do {
                try await client.restoreSession()
                let (_, branches) = try await client.getNoteWithBranches(TriliumTreeConstants.rootNoteId)
                var rows: [RootNoteRow] = []
                for branch in branches.sorted(by: { $0.notePosition < $1.notePosition }) {
                    let noteId = branch.noteId
                    guard !Self.hiddenNoteIds.contains(noteId) else { continue }
                    let note = try await client.getNote(noteId)
                    rows.append(RootNoteRow(noteId: noteId, title: note.title))
                }
                rootNoteRows = rows
                let liveIds = Set(rows.map(\.noteId))
                try? policy.pruneStaleExcludedRoots(
                    liveRootChildIds: liveIds,
                    serverProfileId: profileId,
                    authoritativeLiveList: true
                )
                persistedExcluded = policy.excludedRootNoteIds(serverProfileId: profileId)
                var draft: [String: Bool] = [:]
                for row in rows {
                    draft[row.noteId] = !persistedExcluded.contains(row.noteId)
                }
                draftCachingEnabled = draft
                return
            } catch {
                loadError = APIError.from(error).localizedDescription
            }
        }

        let pairs = (try? PersistenceManager.shared.fetchCachedChildren(
            parentNoteId: TriliumTreeConstants.rootNoteId,
            serverProfileId: profileId
        )) ?? []
        var rows: [RootNoteRow] = []
        for (_, note) in pairs where !Self.hiddenNoteIds.contains(note.noteId) {
            rows.append(RootNoteRow(noteId: note.noteId, title: note.title))
        }
        rows.sort { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }
        rootNoteRows = rows
        persistedExcluded = policy.excludedRootNoteIds(serverProfileId: profileId)
        var draft: [String: Bool] = [:]
        for row in rows {
            draft[row.noteId] = !persistedExcluded.contains(row.noteId)
        }
        draftCachingEnabled = draft
    }

    private func applyChanges() async {
        guard let profileId = appState.activeProfile?.id,
              let client = appState.client,
              await appState.refreshTriliumSession()
        else { return }

        let newExcluded = Set(rootNoteRows.map(\.noteId).filter { draftCachingEnabled[$0] == false })
        let newlyExcluded = newExcluded.subtracting(persistedExcluded)
        let newlyIncluded = persistedExcluded.subtracting(newExcluded)

        isApplying = true
        defer { isApplying = false }

        do {
            try policy.setExcludedRootNoteIds(newExcluded, serverProfileId: profileId)
            persistedExcluded = newExcluded
            await CacheExclusionCoordinator.applyPreferenceChanges(
                newlyExcluded: newlyExcluded,
                newlyIncluded: newlyIncluded,
                profileId: profileId,
                client: client,
                syncManager: appState.syncManager
            )
            dismiss()
        } catch {
            loadError = error.localizedDescription
        }
    }
}
