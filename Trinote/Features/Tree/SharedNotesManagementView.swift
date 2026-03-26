import SwiftUI

/// Loads notes **directly** under Trilium’s `_share` root (explicit public placements).
/// Descendants of those clones (subnotes of a shared note) are omitted — they inherit the parent’s share but are not separate “shared” toggles.
enum SharedNotesSubtreeLoader {
    static func loadAllSharedNotes(client: any TriliumClientProtocol) async throws -> [NoteItem] {
        let rootResponse = try await client.getNote("_share")
        let root = NoteItem(from: rootResponse)
        var branchCache: [String: BranchItem] = [:]
        var noteCache: [String: NoteItem] = [root.noteId: root]
        var collected: [NoteItem] = []
        var seen = Set<String>()

        func visit(_ note: NoteItem) async throws {
            if note.noteId != "_share", seen.insert(note.noteId).inserted {
                collected.append(note)
            }
            let kids = try await fetchDirectChildren(
                of: note,
                client: client,
                branchCache: &branchCache,
                noteCache: &noteCache
            )
            for k in kids {
                try await visit(k)
            }
        }

        try await visit(root)
        let explicitOnly = collected.filter { TriliumSharing.isPublishedUnderShareRoot(note: $0) }
        return explicitOnly.sorted { a, b in
            let ta = a.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? a.noteId : a.title
            let tb = b.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? b.noteId : b.title
            return ta.localizedCaseInsensitiveCompare(tb) == .orderedAscending
        }
    }

    private static func fetchDirectChildren(
        of note: NoteItem,
        client: any TriliumClientProtocol,
        branchCache: inout [String: BranchItem],
        noteCache: inout [String: NoteItem]
    ) async throws -> [NoteItem] {
        guard !note.childBranchIds.isEmpty else { return [] }

        let missingBranchIds = note.childBranchIds.filter { branchCache[$0] == nil }
        if !missingBranchIds.isEmpty {
            let responses = try await withThrowingTaskGroup(of: BranchResponse.self) { group in
                for bid in missingBranchIds {
                    group.addTask { try await client.getBranch(bid, parentNoteId: note.noteId) }
                }
                var out: [BranchResponse] = []
                for try await r in group { out.append(r) }
                return out
            }
            for r in responses {
                branchCache[r.branchId] = BranchItem(from: r)
            }
        }

        let childNoteIds = note.childBranchIds.compactMap { branchCache[$0]?.noteId }
        let missingNoteIds = Set(childNoteIds).subtracting(noteCache.keys)
        if !missingNoteIds.isEmpty {
            let responses = try await withThrowingTaskGroup(of: NoteResponse?.self) { group in
                for nid in missingNoteIds {
                    group.addTask { try? await client.getNote(nid) }
                }
                var out: [NoteResponse] = []
                for try await opt in group {
                    if let r = opt { out.append(r) }
                }
                return out
            }
            for r in responses where !r.isDeleted {
                noteCache[r.noteId] = NoteItem(from: r)
            }
        }

        var pairs: [(Int, NoteItem)] = []
        for branchId in note.childBranchIds {
            guard let branch = branchCache[branchId], let childNote = noteCache[branch.noteId] else { continue }
            if TriliumSharing.hiddenSystemChildNoteIds.contains(childNote.noteId) { continue }
            pairs.append((branch.notePosition, childNote))
        }
        pairs.sort { $0.0 < $1.0 }
        return pairs.map(\.1)
    }
}

struct SharedNotesManagementView: View {
    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss

    @State private var notes: [NoteItem] = []
    @State private var loadError: String?
    @State private var isLoading = true
    @State private var isEditMode = false
    @State private var selectedIds = Set<String>()
    @State private var navigateToNote: (String, String)?
    @State private var confirmStopSharing = false
    @State private var isBulkWorking = false
    @State private var bulkError: String?

    private var selectedCount: Int { selectedIds.count }

    private var navigateToNoteBinding: Binding<SharedNoteNavItem?> {
        Binding(
            get: { navigateToNote.map { SharedNoteNavItem(noteId: $0.0, title: $0.1) } },
            set: { navigateToNote = $0.map { ($0.noteId, $0.title) } }
        )
    }

    var body: some View {
        NavigationStack {
            Group {
                if isLoading {
                    ProgressView(String(localized: "Loading shared notes…", comment: "Shared notes sheet progress"))
                } else if let loadError {
                    ContentUnavailableView {
                        Label(String(localized: "Couldn’t load", comment: "Shared notes load failure title"), systemImage: "exclamationmark.triangle")
                    } description: {
                        Text(loadError)
                    } actions: {
                        Button(String(localized: "Retry", comment: "Retry loading shared notes")) {
                            Task { await load() }
                        }
                    }
                } else if notes.isEmpty {
                    ContentUnavailableView {
                        Label(String(localized: "No shared notes", comment: "Empty shared notes list title"), systemImage: "scale.3d")
                    } description: {
                        Text(String(localized: "Share a note from its details panel to see it here.", comment: "Empty shared notes hint"))
                    }
                } else {
                    List {
                        ForEach(notes) { note in
                            sharedNoteListRow(note)
                        }
                    }
                    .listStyle(.insetGrouped)
                    .disabled(isBulkWorking)
                }
            }
            .navigationTitle(String(localized: "Shared notes", comment: "Modal title for shared notes manager"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Close", comment: "Dismiss shared notes sheet")) {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    HStack(spacing: 16) {
                        if isEditMode, !selectedIds.isEmpty {
                            Menu {
                                Button(role: .destructive) {
                                    confirmStopSharing = true
                                } label: {
                                    Label(String(localized: "Stop sharing", comment: "Bulk remove public sharing"), systemImage: "link.slash")
                                }
                                .disabled(isBulkWorking)
                            } label: {
                                Image(systemName: "ellipsis.circle")
                            }
                            .accessibilityLabel(String(localized: "Bulk actions", comment: "Shared notes edit mode overflow menu"))
                        }
                        Button(isEditMode ? String(localized: "Done", comment: "Leave shared notes edit mode") : String(localized: "Edit", comment: "Enter shared notes edit mode for bulk actions")) {
                            isEditMode.toggle()
                            if !isEditMode { selectedIds.removeAll() }
                        }
                        .disabled(isBulkWorking || notes.isEmpty)
                    }
                }
            }
            .navigationDestination(item: navigateToNoteBinding) { item in
                NoteDetailView(noteId: item.noteId, title: item.title)
            }
        }
        .task {
            await load()
        }
        .confirmationDialog(
            String(localized: "Stop sharing selected notes?", comment: "Bulk unshare confirm title"),
            isPresented: $confirmStopSharing,
            titleVisibility: .visible
        ) {
            Button(String(localized: "Stop sharing", comment: "Confirm bulk unshare"), role: .destructive) {
                Task { await stopSharingSelected() }
            }
            Button(String(localized: "Cancel", comment: "Cancel bulk unshare"), role: .cancel) {}
        } message: {
            Text(
                String(
                    localized: "These \(selectedCount) notes will no longer be publicly accessible.",
                    comment: "Bulk unshare confirmation detail; includes count"
                )
            )
        }
        .alert(
            String(localized: "Couldn’t update sharing", comment: "Bulk unshare error alert title"),
            isPresented: Binding(
                get: { bulkError != nil },
                set: { if !$0 { bulkError = nil } }
            )
        ) {
            Button("OK", role: .cancel) { bulkError = nil }
        } message: {
            if let bulkError {
                Text(bulkError)
            }
        }
    }

    @ViewBuilder
    private func sharedNoteListRow(_ note: NoteItem) -> some View {
        Group {
            if isEditMode {
                Button {
                    toggleSelection(note.noteId)
                } label: {
                    sharedNoteRowContent(note)
                }
                .buttonStyle(.plain)
            } else {
                Button {
                    let title = note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
                    navigateToNote = (note.noteId, title)
                } label: {
                    sharedNoteRowContent(note)
                }
                .buttonStyle(.plain)
            }
        }
        .contentShape(Rectangle())
    }

    private func sharedNoteRowContent(_ note: NoteItem) -> some View {
        HStack(spacing: 12) {
            if isEditMode {
                Image(systemName: selectedIds.contains(note.noteId) ? "checkmark.circle.fill" : "circle")
                    .foregroundStyle(selectedIds.contains(note.noteId) ? Color.accentColor : Color.secondary)
            }
            Image(systemName: note.resolvedIconName)
                .foregroundStyle(.secondary)
                .frame(width: 24)
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 2) {
                Text(note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive))
                    .font(.body)
                    .foregroundStyle(.primary)
                    .lineLimit(2)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .multilineTextAlignment(.leading)
                Text(note.noteId)
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
                    .lineLimit(1)
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            if note.isProtected {
                Image(systemName: "lock.fill")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            if !isEditMode {
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.quaternary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .contentShape(Rectangle())
    }

    private func toggleSelection(_ noteId: String) {
        if selectedIds.contains(noteId) {
            selectedIds.remove(noteId)
        } else {
            selectedIds.insert(noteId)
        }
    }

    private func load() async {
        guard let client = appState.client else {
            loadError = String(localized: "Not connected to a server.", comment: "Shared notes without client")
            isLoading = false
            return
        }
        isLoading = true
        loadError = nil
        defer { isLoading = false }
        do {
            notes = try await SharedNotesSubtreeLoader.loadAllSharedNotes(client: client)
            selectedIds = []
        } catch {
            loadError = APIError.from(error).localizedDescription
            notes = []
        }
    }

    private func stopSharingSelected() async {
        guard let client = appState.client, !selectedIds.isEmpty else { return }
        isBulkWorking = true
        defer { isBulkWorking = false }
        var failures: [String] = []
        for nid in selectedIds {
            do {
                guard let branchId = try await client.branchId(
                    fromParentNoteId: TriliumSharing.shareRootNoteId,
                    toChildNoteId: nid
                ) else { continue }
                try await client.deleteBranchWithNoProgressTask(branchId)
                let response = try await client.getNote(nid)
                let item = NoteItem(from: response)
                if let attrId = TriliumSharing.sharedLabelAttributeId(note: item) {
                    try? await client.deleteAttribute(noteId: nid, attributeId: attrId)
                }
            } catch {
                failures.append(nid)
                Log.api.error("Stop sharing failed for \(nid): \(error)")
            }
        }
        selectedIds.removeAll()
        isEditMode = false
        await load()
        if !failures.isEmpty {
            bulkError = String(
                localized: "Some notes could not be updated (\(failures.count) failed).",
                comment: "Bulk unshare partial failure; count is failures.count"
            )
        }
    }
}

private struct SharedNoteNavItem: Identifiable, Hashable {
    let noteId: String
    let title: String
    var id: String { noteId }
}
