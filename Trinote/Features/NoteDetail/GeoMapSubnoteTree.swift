import SwiftUI

/// Where the geo map's sub-note tree stands: the notes opened into (deepest last) and the rows folded shut. Kept by
/// the map screen, so it survives the detail panel taking the list's place for a while.
struct GeoMapSubnoteTreeState: Equatable {
    struct Level: Hashable {
        let noteId: String
        let title: String
    }

    var path: [Level] = []
    /// First-level rows folded open; every row with sub-notes starts shut.
    var expanded: Set<String> = []
}

/// The notes under a geo map as a small tree two levels deep, so places kept in folders show below the map too.
///
/// A first-level row with sub-notes starts shut and folds open in place. A second-level one's chevron opens that note's
/// own two levels in the list's place, with a back button beside the header. Tapping a row opens its note; a row on
/// the map ends in a pin that moves the map to it.
struct GeoMapSubnoteTree: View {
    /// The map's own children, as the screen loaded them.
    let rootChildren: [ChildNoteSummary]
    let isLoadingRoot: Bool
    @Binding var state: GeoMapSubnoteTreeState
    /// Changes when the map was reloaded, so the levels below the first are read again.
    let reloadKey: Int
    let title: (ChildNoteSummary) -> String
    let mapFeature: (String) -> GeoMapFeatureKind?
    let cachedChildren: ([String]) -> [String: [ChildNoteSummary]]
    let serverChildren: ([String]) async -> [String: [ChildNoteSummary]]?
    let onOpen: (String) -> Void
    let onShowOnMap: (String, GeoMapFeatureKind) -> Void

    @State private var childrenByParent: [String: [ChildNoteSummary]] = [:]
    /// The `reloadKey` each parent's server answer was read for.
    @State private var serverReadFor: [String: Int] = [:]

    private static let indent: CGFloat = 22
    private static let disclosureWidth: CGFloat = 28

    private struct Row: Identifiable {
        let id: String
        /// Nil for the spinner row under a folder still loading.
        let note: ChildNoteSummary?
        let level: Int
    }

    private struct LoadKey: Equatable {
        let path: [String]
        let rootIds: [String]
        let expanded: Set<String>
        let reload: Int
    }

    /// The first level shown: the map's children, or those of the note opened into (nil while it loads).
    private var firstLevel: [ChildNoteSummary]? {
        guard let opened = state.path.last else { return rootChildren }
        return childrenByParent[opened.noteId]
    }

    private var rows: [Row] {
        guard let firstLevel else { return [] }
        var rows: [Row] = []
        for note in firstLevel {
            rows.append(Row(id: "0:\(note.noteId)", note: note, level: 0))
            guard note.childCount > 0, state.expanded.contains(note.noteId) else { continue }
            if let children = childrenByParent[note.noteId] {
                // A note cloned into two folders is a row in each.
                rows += children.map { Row(id: "1:\(note.noteId):\($0.noteId)", note: $0, level: 1) }
            } else {
                rows.append(Row(id: "1:\(note.noteId):loading", note: nil, level: 1))
            }
        }
        return rows
    }

    var body: some View {
        Group {
            if state.path.isEmpty && rootChildren.isEmpty {
                if isLoadingRoot { spinner.padding() }
            } else {
                VStack(alignment: .leading, spacing: 0) {
                    Divider()
                    header
                    content
                }
                .padding(.bottom, 8)
            }
        }
        .task(id: LoadKey(
            path: state.path.map(\.noteId),
            rootIds: state.path.isEmpty ? rootChildren.map(\.noteId) : [],
            expanded: state.expanded,
            reload: reloadKey
        )) {
            await loadShownLevels()
        }
    }

    // MARK: Header

    private var header: some View {
        HStack(spacing: 2) {
            if !state.path.isEmpty {
                Button {
                    withAnimation(.snappy(duration: 0.2)) { _ = state.path.popLast() }
                } label: {
                    Image(systemName: "chevron.left")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.tint)
                        .frame(width: 28, height: 24)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(String(localized: "Back", comment: "Geo map sub-note tree: back to the level above"))
            }
            Text(String(localized: "Sub-notes", comment: "Child notes section header"))
            if let opened = state.path.last {
                Text(verbatim: "› " + opened.title)
                    .lineLimit(1)
                    .truncationMode(.middle)
            }
        }
        .font(.caption.weight(.medium))
        .foregroundStyle(.secondary)
        .padding(.leading, state.path.isEmpty ? 16 : 8)
        .padding(.trailing, 16)
        .padding(.top, state.path.isEmpty ? 12 : 8)
        .padding(.bottom, 4)
    }

    // MARK: Rows

    @ViewBuilder
    private var content: some View {
        if firstLevel == nil {
            spinner.padding(.vertical, 12)
        } else if rows.isEmpty {
            Text(String(localized: "No sub-notes", comment: "Geo map sub-note tree: an opened note has none"))
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .padding(.horizontal)
                .padding(.vertical, 10)
        } else {
            let rows = rows
            ForEach(Array(rows.enumerated()), id: \.element.id) { index, row in
                if index > 0 {
                    Divider().padding(.leading, 8 + Self.disclosureWidth + CGFloat(row.level) * Self.indent)
                }
                if let note = row.note {
                    noteRow(note, level: row.level)
                } else {
                    spinner
                        .padding(.leading, Self.disclosureWidth + Self.indent)
                        .padding(.vertical, 8)
                }
            }
        }
    }

    private var spinner: some View {
        HStack {
            Spacer()
            ProgressView().controlSize(.small)
            Spacer()
        }
    }

    private func noteRow(_ note: ChildNoteSummary, level: Int) -> some View {
        let feature = mapFeature(note.noteId)
        return HStack(spacing: 0) {
            disclosure(note, level: level)
            Button {
                onOpen(note.noteId)
            } label: {
                HStack(spacing: 10) {
                    NoteIconView(
                        iconClass: note.iconClass,
                        fallbackNoteType: note.iconFallbackNoteType,
                        size: level == 0 ? .regular : .compact,
                        foregroundStyle: .secondary
                    )
                    .frame(width: 22)
                    Text(title(note))
                        .font(level == 0 ? .body : .subheadline)
                        .lineLimit(2)
                        .multilineTextAlignment(.leading)
                    Spacer(minLength: 4)
                    if note.childCount > 0 {
                        Text("\(note.childCount)")
                            .font(.caption2)
                            .foregroundStyle(.tertiary)
                    }
                }
                .padding(.trailing, feature == nil ? 16 : 4)
                .padding(.vertical, level == 0 ? 10 : 8)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)

            if let feature {
                Button {
                    onShowOnMap(note.noteId, feature)
                } label: {
                    Image(systemName: "mappin.circle")
                        .font(level == 0 ? .title3 : .body)
                        .foregroundStyle(.tint)
                        .frame(width: 44, height: level == 0 ? 44 : 36)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .padding(.trailing, 8)
                .accessibilityLabel(String(localized: "Show on map", comment: "Geo map sub-note row: move the map to this note's location"))
            }
        }
        .padding(.leading, 8 + CGFloat(level) * Self.indent)
    }

    /// The chevron before a row with sub-notes: folds a first-level row open or shut, and opens a second-level one
    /// in the list's place.
    @ViewBuilder
    private func disclosure(_ note: ChildNoteSummary, level: Int) -> some View {
        if note.childCount > 0 {
            let isOpen = level == 0 && state.expanded.contains(note.noteId)
            Button {
                withAnimation(.snappy(duration: 0.2)) {
                    if level == 0 {
                        if isOpen { state.expanded.remove(note.noteId) } else { state.expanded.insert(note.noteId) }
                    } else {
                        state.path.append(GeoMapSubnoteTreeState.Level(noteId: note.noteId, title: title(note)))
                    }
                }
            } label: {
                Image(systemName: "chevron.right")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                    .rotationEffect(.degrees(isOpen ? 90 : 0))
                    .frame(width: Self.disclosureWidth, height: 36)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(level == 0
                ? (isOpen
                    ? String(localized: "Collapse", comment: "Geo map sub-note tree: fold a row shut")
                    : String(localized: "Expand", comment: "Geo map sub-note tree: fold a row open"))
                : String(localized: "Show sub-notes", comment: "Geo map sub-note tree: open a note's own sub-notes in the list"))
        } else {
            Color.clear.frame(width: Self.disclosureWidth, height: 1)
        }
    }

    // MARK: Loading

    /// The note opened into (when there is one), then the second level under the first-level rows folded open.
    private func loadShownLevels() async {
        if let opened = state.path.last {
            await load([opened.noteId])
            if Task.isCancelled { return }
        }
        guard let firstLevel else { return }
        await load(firstLevel.filter { $0.childCount > 0 && state.expanded.contains($0.noteId) }.map(\.noteId))
    }

    /// From the cache at once, then from the server once per reload.
    private func load(_ parentIds: [String]) async {
        guard !parentIds.isEmpty else { return }
        let unknown = parentIds.filter { childrenByParent[$0] == nil }
        if !unknown.isEmpty {
            for (id, children) in cachedChildren(unknown) { childrenByParent[id] = children }
        }
        let stale = parentIds.filter { serverReadFor[$0] != reloadKey }
        let fresh = stale.isEmpty ? nil : await serverChildren(stale)
        if Task.isCancelled { return }
        if let fresh {
            for id in stale {
                if let children = fresh[id] { childrenByParent[id] = children }
                serverReadFor[id] = reloadKey
            }
        }
        // Nothing to be had for these (offline, or not cached): no spinner forever.
        for id in parentIds where childrenByParent[id] == nil { childrenByParent[id] = [] }
    }
}
