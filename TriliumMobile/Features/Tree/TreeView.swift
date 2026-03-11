import SwiftUI

private struct SubTreeTarget: Hashable {
    let noteId: String
    let title: String
}

struct TreeView: View {
    let parentNoteId: String
    let parentTitle: String

    init(parentNoteId: String = "root", parentTitle: String = "Notes") {
        self.parentNoteId = parentNoteId
        self.parentTitle = parentTitle
    }

    @Environment(AppState.self) private var appState
    @State private var viewModel: TreeViewModel?
    @State private var navigateToNote: NoteItem?
    @State private var drillDownTarget: SubTreeTarget?

    var body: some View {
        Group {
            if let viewModel {
                treeContent(viewModel)
            } else {
                ProgressView("Loading…")
            }
        }
        .navigationTitle(parentTitle)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    Task { await viewModel?.refresh() }
                } label: {
                    Image(systemName: "arrow.trianglehead.2.clockwise")
                }
                .disabled(viewModel?.isRefreshing ?? false)
                .accessibilityLabel("Refresh tree")
            }
        }
        .task {
            if viewModel == nil {
                let vm = TreeViewModel(appState: appState, parentNoteId: parentNoteId)
                viewModel = vm
                await vm.loadTree()
            }
        }
        .navigationDestination(item: $navigateToNote) { note in
            NoteDetailView(noteId: note.noteId, title: note.title)
        }
        .navigationDestination(item: $drillDownTarget) { target in
            TreeView(parentNoteId: target.noteId, parentTitle: target.title)
        }
    }

    @ViewBuilder
    private func treeContent(_ vm: TreeViewModel) -> some View {
        if vm.isLoading && vm.rootChildren.isEmpty {
            VStack(spacing: 12) {
                ProgressView()
                Text("Loading note tree…")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        } else if let error = vm.error, vm.rootChildren.isEmpty {
            ContentUnavailableView {
                Label("Connection Error", systemImage: "wifi.exclamationmark")
            } description: {
                Text(error)
            } actions: {
                Button("Retry") {
                    Task { await vm.loadTree() }
                }
                .buttonStyle(.bordered)
            }
        } else {
            VStack(spacing: 0) {
                if vm.isFromCache {
                    HStack(spacing: 6) {
                        Image(systemName: "icloud.slash")
                            .font(.caption)
                        Text("Showing cached data")
                            .font(.caption)
                        if vm.isRefreshing {
                            ProgressView()
                                .controlSize(.mini)
                        }
                    }
                    .foregroundStyle(.orange)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 6)
                    .background(.orange.opacity(0.1))
                }

                if let error = vm.error, !vm.rootChildren.isEmpty {
                    HStack(spacing: 6) {
                        Image(systemName: "exclamationmark.triangle")
                            .font(.caption)
                        Text(error)
                            .font(.caption)
                            .lineLimit(1)
                    }
                    .foregroundStyle(.red)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 4)
                    .padding(.horizontal)
                    .background(.red.opacity(0.08))
                }

                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 0) {
                        ForEach(vm.visibleNodes) { flat in
                            TreeNodeRow(
                                node: flat.node,
                                depth: flat.depth,
                                viewModel: vm,
                                onSelect: { note in navigateToNote = note },
                                onDrillDown: { noteId, title in
                                    drillDownTarget = SubTreeTarget(noteId: noteId, title: title)
                                }
                            )
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.vertical, 8)
                            .padding(.leading, CGFloat(flat.depth) * 20 + 16)
                            .padding(.trailing, 16)

                            Divider()
                                .padding(.leading, CGFloat(flat.depth) * 20 + 16)
                        }
                    }
                }
                .refreshable { await vm.refresh() }
            }
            .overlay {
                if vm.isRefreshing && !vm.isFromCache {
                    ProgressView()
                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topTrailing)
                        .padding()
                }
            }
        }
    }
}

// MARK: - Tree Node Row

struct TreeNodeRow: View {
    static let maxInlineDepth = 2

    let node: TreeNode
    let depth: Int
    let viewModel: TreeViewModel
    let onSelect: (NoteItem) -> Void
    let onDrillDown: (String, String) -> Void

    private var isExpanded: Bool { node.children != nil }
    private var shouldDrillDown: Bool { depth >= Self.maxInlineDepth }

    var body: some View {
        HStack(spacing: 0) {
            expandChevron

            noteLabel
        }
    }

    @ViewBuilder
    private var expandChevron: some View {
        if node.note.hasChildren {
            Button {
                if shouldDrillDown {
                    onDrillDown(node.note.noteId, node.title)
                } else {
                    Task { await viewModel.toggleExpand(node) }
                }
            } label: {
                Group {
                    if node.isLoading {
                        ProgressView()
                            .controlSize(.small)
                    } else if shouldDrillDown {
                        Image(systemName: "chevron.right")
                            .font(.caption2.weight(.semibold))
                            .foregroundStyle(.secondary)
                    } else {
                        Image(systemName: isExpanded ? "chevron.down" : "chevron.right")
                            .font(.caption2.weight(.semibold))
                            .foregroundStyle(.secondary)
                    }
                }
                .frame(width: 32, height: 32)
                .contentShape(Rectangle())
            }
            .buttonStyle(.borderless)
            .accessibilityLabel(shouldDrillDown ? "Open sub-notes" : (isExpanded ? "Collapse" : "Expand"))
        } else {
            Spacer()
                .frame(width: 32)
        }
    }

    private var displayTitle: String {
        guard node.note.isProtected else { return node.title }
        let t = node.title.trimmingCharacters(in: .whitespaces)
        let hasNonASCII = t.unicodeScalars.contains { !$0.isASCII && !CharacterSet.whitespaces.contains($0) }
        return (t.isEmpty || hasNonASCII) ? "Protected note" : t
    }

    private var noteLabel: some View {
        Button {
            onSelect(node.note)
        } label: {
            HStack(spacing: 8) {
                ZStack(alignment: .bottomTrailing) {
                    Image(systemName: node.note.resolvedIconName)
                        .foregroundStyle(.secondary)
                        .font(.callout)
                        .frame(width: 20)
                        .accessibilityHidden(true)

                    if node.note.isProtected {
                        Image(systemName: "lock.fill")
                            .font(.system(size: 8))
                            .foregroundStyle(.yellow)
                            .offset(x: 4, y: 2)
                    }
                }

                VStack(alignment: .leading, spacing: 1) {
                    Text(displayTitle)
                        .font(.body)
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)
                        .fixedSize(horizontal: false, vertical: true)
                        .foregroundStyle(node.note.isProtected ? .secondary : .primary)
                }

                Spacer()

                if node.note.parentNoteIds.count > 1 {
                    Image(systemName: "arrow.triangle.branch")
                        .font(.caption2)
                        .foregroundStyle(.orange)
                        .accessibilityLabel("Cloned note")
                }

                Image(systemName: "chevron.right")
                    .font(.caption2)
                    .foregroundStyle(.quaternary)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.borderless)
        .accessibilityLabel("\(displayTitle), \(node.note.type.displayName) note")
    }
}

#Preview {
    NavigationStack {
        TreeView()
    }
    .environment(AppState())
    .modelContainer(PersistenceManager.shared.container)
}
