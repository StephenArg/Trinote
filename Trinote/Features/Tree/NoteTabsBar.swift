import SwiftUI
import UIKit

struct NoteTabsBar: View {
    /// The `OpenNoteTab.id` of the currently visible open-tab row, if any.
    let currentOpenTabId: String?
    let onSelect: (OpenNoteTab) -> Void
    var onOpenTabRemoved: ((OpenNoteTab) -> Void)? = nil
    var onTabsBecameEmpty: (() -> Void)? = nil

    @Environment(AppState.self) private var appState
    @State private var tabs: [OpenNoteTab] = []
    @State private var showAddNotePicker = false
    @State private var draggingTabId: String?
    @State private var dragTranslation: CGFloat = 0

    private static let reorderLongPressDuration: TimeInterval = 0.3

    private static let addButtonWidth: CGFloat = 44
    private static let horizontalPadding: CGFloat = 10
    private static let tabGap: CGFloat = 5
    /// Slightly more than 3 “full” columns so the last tab peeks (scroll affordance).
    private static let visibleTabSlots: CGFloat = 3.3
    /// Outer bar height; matches the original single-line look while still fitting 2 wrapped lines of footnote text.
    private static let barHeight: CGFloat = 50
    /// Inner cell height — leaves a small vertical pad inside the bar.
    fileprivate static let cellHeight: CGFloat = 46

    var body: some View {
        Group {
            if tabs.isEmpty {
                Color.clear.frame(height: 0)
            } else {
                GeometryReader { geo in
                    let scrollW = max(0, geo.size.width - Self.addButtonWidth)
                    let tabW = tabWidth(scrollInnerWidth: scrollW)
                    HStack(alignment: .center, spacing: 0) {
                        ScrollView(.horizontal, showsIndicators: false) {
                            ScrollViewReader { proxy in
                                HStack(spacing: Self.tabGap) {
                                    ForEach(tabs) { tab in
                                        let title = displayTitle(for: tab)
                                        let icon = rowIcon(for: tab)
                                        let isDragging = draggingTabId == tab.id
                                        NoteTabCell(
                                            displayTitle: title,
                                            systemImage: icon,
                                            isActive: currentOpenTabId != nil && tab.id == currentOpenTabId,
                                            width: tabW,
                                            onTap: {
                                                guard draggingTabId == nil else { return }
                                                onSelect(tab)
                                            },
                                            onClose: { removeTab(tab) }
                                        )
                                        .offset(x: isDragging ? dragTranslation : 0)
                                        .scaleEffect(isDragging ? 1.04 : 1)
                                        .shadow(color: isDragging ? .black.opacity(0.18) : .clear, radius: 6, y: 2)
                                        .zIndex(isDragging ? 10 : 0)
                                        .opacity(isDragging ? 0.92 : 1)
                                        .gesture(tabReorderGesture(tab: tab, tabWidth: tabW))
                                        .accessibilityHint(
                                            String(
                                                localized: "Hold, then drag to reorder tabs.",
                                                comment: "A11y: open note tab reorder hint"
                                            )
                                        )
                                        .id(tab.id)
                                    }
                                }
                                .padding(.vertical, 2)
                                .padding(.leading, Self.horizontalPadding)
                                .onAppear { scrollToActive(using: proxy) }
                                .onChange(of: currentOpenTabId) { _, _ in scrollToActive(using: proxy) }
                                .onChange(of: tabs.map(\.id)) { _, _ in scrollToActive(using: proxy) }
                            }
                        }
                        .frame(maxWidth: .infinity, maxHeight: Self.barHeight, alignment: .center)

                        addTabButton
                            .frame(width: Self.addButtonWidth, height: Self.barHeight, alignment: .center)
                    }
                }
                .frame(height: Self.barHeight)
                .background(.bar)
                .overlay(alignment: .top) { Divider() }
            }
        }
        .accessibilityElement(children: .contain)
        .accessibilityLabel(String(localized: "Open notes", comment: "A11y: open note tab strip"))
        .task { reload() }
        .onChange(of: appState.activeProfile?.id) { _, _ in reload() }
        .onReceive(NotificationCenter.default.publisher(for: .openNoteTabsChanged)) { _ in
            reload()
        }
        .sheet(isPresented: $showAddNotePicker) {
            NotePickerSheet(
                excludeNoteId: nil,
                navigationTitleOverride: String(
                    localized: "Add to open tabs",
                    comment: "Open-tab picker: navigation title (search to add a note as a tab)"
                )
            ) { id, title in
                addTabForPickedNote(noteId: id, title: title)
            }
        }
    }

    private var addTabButton: some View {
        Button {
            showAddNotePicker = true
        } label: {
            Image(systemName: "plus.circle.fill")
                .font(.title3)
                .symbolRenderingMode(.hierarchical)
                .foregroundStyle(.tint)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .buttonStyle(.plain)
        .accessibilityLabel(String(localized: "Add open tab", comment: "A11y: add note to tab bar"))
    }

    /// Width of one tab column: ~3.3 “slots” in the scroll area, with a little space for the gaps.
    private func tabWidth(scrollInnerWidth: CGFloat) -> CGFloat {
        let inner = max(0, scrollInnerWidth)
        let w = (inner - Self.tabGap * 2) / Self.visibleTabSlots
        return max(64, w)
    }

    private func reload() {
        guard let profileId = appState.activeProfile?.id else {
            tabs = []
            return
        }
        tabs = (try? PersistenceManager.shared.fetchOpenNoteTabs(serverProfileId: profileId)) ?? []
    }

    private func addTabForPickedNote(noteId: String, title: String) {
        guard let profileId = appState.activeProfile?.id else { return }
        let noteType = (try? PersistenceManager.shared.fetchCachedNote(id: noteId, serverProfileId: profileId))?.noteType
            ?? NoteType.text.rawValue
        if let newId = try? PersistenceManager.shared.addOpenNoteTab(
            noteId: noteId, title: title, noteType: noteType, serverProfileId: profileId
        ),
           let row = try? PersistenceManager.shared.fetchOpenNoteTab(id: newId, serverProfileId: profileId) {
            onSelect(row)
        }
    }

    private func removeTab(_ tab: OpenNoteTab) {
        guard let profileId = appState.activeProfile?.id else { return }
        let removed = tab
        try? PersistenceManager.shared.removeOpenNoteTab(id: tab.id, serverProfileId: profileId)
        onOpenTabRemoved?(removed)
        reload()
        if tabs.isEmpty { onTabsBecameEmpty?() }
    }

    private func tabReorderGesture(tab: OpenNoteTab, tabWidth: CGFloat) -> some Gesture {
        LongPressGesture(minimumDuration: Self.reorderLongPressDuration)
            .sequenced(before: DragGesture(minimumDistance: 0, coordinateSpace: .local))
            .onChanged { value in
                switch value {
                case .first(true):
                    UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                case .second(true, let drag?):
                    if draggingTabId == nil { draggingTabId = tab.id }
                    dragTranslation = drag.translation.width
                default:
                    break
                }
            }
            .onEnded { value in
                guard case .second(true, _) = value else {
                    draggingTabId = nil
                    dragTranslation = 0
                    return
                }
                let draggedId = draggingTabId ?? tab.id
                let translation = dragTranslation
                draggingTabId = nil
                dragTranslation = 0
                guard let from = tabs.firstIndex(where: { $0.id == draggedId }) else { return }
                let to = dropIndex(movingFrom: from, translation: translation, tabWidth: tabWidth)
                guard from != to else { return }
                applyTabReorder(from: from, to: to)
            }
    }

    private func dropIndex(movingFrom source: Int, translation: CGFloat, tabWidth: CGFloat) -> Int {
        let slot = tabWidth + Self.tabGap
        guard slot > 0 else { return source }
        let delta = Int(round(translation / slot))
        return min(max(source + delta, 0), tabs.count - 1)
    }

    private func applyTabReorder(from source: Int, to destination: Int) {
        guard source != destination,
              source >= 0, source < tabs.count,
              destination >= 0, destination < tabs.count else { return }
        var reordered = tabs
        let item = reordered.remove(at: source)
        reordered.insert(item, at: destination)
        tabs = reordered
        guard let profileId = appState.activeProfile?.id else { return }
        try? PersistenceManager.shared.reorderOpenNoteTabs(
            orderedIds: reordered.map(\.id),
            serverProfileId: profileId
        )
    }

    private func rowIcon(for tab: OpenNoteTab) -> String {
        if let profileId = appState.activeProfile?.id {
            return PersistenceManager.shared.cachedNoteIconSystemName(
                noteId: tab.noteId,
                fallbackNoteType: tab.noteType,
                serverProfileId: profileId
            )
        }
        if let s = tab.listIconSystemName, !s.isEmpty { return s }
        return (NoteType(rawValue: tab.noteType) ?? .text).iconName
    }

    private func displayTitle(for tab: OpenNoteTab) -> String {
        guard let profileId = appState.activeProfile?.id else { return tab.title }
        if let cached = try? PersistenceManager.shared.fetchCachedNote(id: tab.noteId, serverProfileId: profileId) {
            let stored: String
            if cached.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                stored = tab.title
            } else {
                stored = cached.title
            }
            return NoteItem.maskedStoredTitle(
                stored,
                isProtected: cached.isProtected,
                protectedSessionActive: appState.protectedSessionActive
            )
        }
        return tab.title
    }

    private func scrollToActive(using proxy: ScrollViewProxy) {
        guard let tid = currentOpenTabId, let t = tabs.first(where: { $0.id == tid }) else { return }
        withAnimation(.easeInOut(duration: 0.2)) {
            proxy.scrollTo(t.id, anchor: .center)
        }
    }
}

// MARK: - Cell

private struct NoteTabCell: View {
    let displayTitle: String
    let systemImage: String
    let isActive: Bool
    let width: CGFloat
    let onTap: () -> Void
    let onClose: () -> Void

    @Environment(\.colorScheme) private var colorScheme

    var body: some View {
        HStack(alignment: .center, spacing: 0) {
            HStack(alignment: .center, spacing: 4) {
                Image(systemName: systemImage)
                    .font(.footnote.weight(.semibold))
                    .foregroundStyle(isActive ? Color.accentColor : Color.secondary)
                    .frame(width: 16, alignment: .center)
                Text(displayTitle)
                    .font(.footnote)
                    .lineLimit(2)
                    .truncationMode(.tail)
                    .multilineTextAlignment(.leading)
                    .foregroundStyle(isActive ? Color.accentColor : Color.primary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .minimumScaleFactor(0.82)
            }
            .padding(.leading, 2)
            .contentShape(Rectangle())
            .onTapGesture(perform: onTap)

            Button(action: onClose) {
                Image(systemName: "xmark")
                    .font(.caption2.weight(.semibold))
                    .foregroundStyle(.secondary)
                    .frame(width: 22, height: 32)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(String(localized: "Close tab", comment: "A11y: close open note tab"))
        }
        .frame(width: width, height: NoteTabsBar.cellHeight, alignment: .center)
        .background(activeBackground, in: RoundedRectangle(cornerRadius: 8, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 8, style: .continuous)
                .strokeBorder(borderColor, lineWidth: 0.5)
        )
    }

    private var activeBackground: Color {
        guard isActive else { return .clear }
        return colorScheme == .dark ? Color.accentColor.opacity(0.28) : Color.accentColor.opacity(0.18)
    }

    private var borderColor: Color {
        if isActive { return Color.accentColor.opacity(colorScheme == .dark ? 0.6 : 0.5) }
        return Color.primary.opacity(colorScheme == .dark ? 0.18 : 0.14)
    }
}
