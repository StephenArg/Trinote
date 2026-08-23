import SwiftUI
import UIKit

struct NoteTabsBar: View {
    /// The `OpenNoteTab.id` of the currently visible open-tab row, if any.
    let currentOpenTabId: String?
    let onSelect: (OpenNoteTab) -> Void
    var onOpenTabRemoved: ((OpenNoteTab) -> Void)? = nil
    var onTabsBecameEmpty: (() -> Void)? = nil
    var onReorderActiveChanged: ((Bool) -> Void)? = nil

    @Environment(AppState.self) private var appState
    @State private var tabs: [OpenNoteTab] = []
    @State private var showAddNotePicker = false
    @State private var draggingTabId: String?
    @State private var dragTranslation: CGFloat = 0
    @State private var suppressTabSelection = false
    @State private var tabSelectionSuppressionReset: DispatchWorkItem?

    private static let reorderLongPressDuration: TimeInterval = 0.45
    private static let reorderHandleWidth: CGFloat = 14

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
                    let contentW = tabsContentWidth(tabWidth: tabW, count: tabs.count)
                    HStack(alignment: .center, spacing: 0) {
                        NoteTabsHorizontalScrollView(
                            contentWidth: contentW,
                            isScrollEnabled: draggingTabId == nil,
                            activeTabId: currentOpenTabId,
                            tabIds: tabs.map(\.id),
                            tabWidth: tabW,
                            tabGap: Self.tabGap,
                            horizontalPadding: Self.horizontalPadding,
                            reorderHandleWidth: Self.reorderHandleWidth,
                            reorderLongPressDuration: Self.reorderLongPressDuration,
                            onReorderBegan: { index in
                                guard tabs.indices.contains(index) else { return }
                                tabSelectionSuppressionReset?.cancel()
                                suppressTabSelection = true
                                draggingTabId = tabs[index].id
                                dragTranslation = 0
                                onReorderActiveChanged?(true)
                            },
                            onReorderChanged: { translation in
                                dragTranslation = translation
                            },
                            onReorderEnded: { translation in
                                defer {
                                    draggingTabId = nil
                                    dragTranslation = 0
                                    onReorderActiveChanged?(false)
                                    scheduleTabSelectionSuppressionReset()
                                }
                                guard let draggedId = draggingTabId,
                                      let from = tabs.firstIndex(where: { $0.id == draggedId }) else { return }
                                let to = dropIndex(movingFrom: from, translation: translation, tabWidth: tabW)
                                guard from != to else { return }
                                applyTabReorder(from: from, to: to)
                            },
                            onReorderCancelled: {
                                draggingTabId = nil
                                dragTranslation = 0
                                onReorderActiveChanged?(false)
                                scheduleTabSelectionSuppressionReset()
                            }
                        ) {
                            HStack(spacing: Self.tabGap) {
                                ForEach(tabs) { tab in
                                    let title = displayTitle(for: tab)
                                    let icon = rowIconContext(for: tab)
                                    let isDragging = draggingTabId == tab.id
                                    NoteTabCell(
                                        displayTitle: title,
                                        iconClass: icon.iconClass,
                                        fallbackNoteType: icon.fallbackNoteType,
                                        isActive: currentOpenTabId != nil && tab.id == currentOpenTabId,
                                        width: tabW,
                                        reorderHandleWidth: Self.reorderHandleWidth,
                                        onTap: {
                                            guard draggingTabId == nil, !suppressTabSelection else { return }
                                            onSelect(tab)
                                        },
                                        onClose: { removeTab(tab) }
                                    )
                                    .offset(x: isDragging ? dragTranslation : 0)
                                    .scaleEffect(isDragging ? 1.04 : 1)
                                    .shadow(color: isDragging ? .black.opacity(0.18) : .clear, radius: 6, y: 2)
                                    .zIndex(isDragging ? 10 : 0)
                                    .opacity(isDragging ? 0.92 : 1)
                                }
                            }
                            .padding(.vertical, 2)
                            .padding(.leading, Self.horizontalPadding)
                            .frame(width: contentW, alignment: .leading)
                        }
                        .frame(width: scrollW, height: Self.barHeight, alignment: .leading)

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

    private func tabsContentWidth(tabWidth: CGFloat, count: Int) -> CGFloat {
        guard count > 0 else { return 0 }
        return Self.horizontalPadding
            + CGFloat(count) * tabWidth
            + CGFloat(count - 1) * Self.tabGap
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

    /// Prevents the tab button from firing after a long-press reorder ends.
    private func scheduleTabSelectionSuppressionReset() {
        suppressTabSelection = true
        tabSelectionSuppressionReset?.cancel()
        let reset = DispatchWorkItem {
            suppressTabSelection = false
        }
        tabSelectionSuppressionReset = reset
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.35, execute: reset)
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

    private func rowIconContext(for tab: OpenNoteTab) -> NoteRowIconContext {
        if let profileId = appState.activeProfile?.id {
            return PersistenceManager.shared.tabRowIconContext(
                noteId: tab.noteId,
                fallbackNoteType: tab.noteType,
                serverProfileId: profileId
            )
        }
        return NoteRowIconContext(
            iconClass: nil,
            fallbackNoteType: NoteType(rawValue: tab.noteType) ?? .text
        )
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
}

// MARK: - Horizontal scroll

/// UIKit-backed horizontal scroller so tab gestures don't block pan-to-scroll.
private struct NoteTabsHorizontalScrollView<Content: View>: UIViewRepresentable {
    let contentWidth: CGFloat
    let isScrollEnabled: Bool
    let activeTabId: String?
    let tabIds: [String]
    let tabWidth: CGFloat
    let tabGap: CGFloat
    let horizontalPadding: CGFloat
    let reorderHandleWidth: CGFloat
    let reorderLongPressDuration: TimeInterval
    let onReorderBegan: (Int) -> Void
    let onReorderChanged: (CGFloat) -> Void
    let onReorderEnded: (CGFloat) -> Void
    let onReorderCancelled: () -> Void
    @ViewBuilder var content: () -> Content

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> UIScrollView {
        let scrollView = UIScrollView()
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.showsVerticalScrollIndicator = false
        scrollView.alwaysBounceHorizontal = true
        scrollView.alwaysBounceVertical = false
        scrollView.delaysContentTouches = false
        scrollView.canCancelContentTouches = true
        scrollView.clipsToBounds = true
        scrollView.backgroundColor = .clear

        let hosting = UIHostingController(rootView: content())
        hosting.view.backgroundColor = .clear
        hosting.view.translatesAutoresizingMaskIntoConstraints = false
        hosting.view.isUserInteractionEnabled = true
        scrollView.addSubview(hosting.view)

        let widthConstraint = hosting.view.widthAnchor.constraint(equalToConstant: contentWidth)
        NSLayoutConstraint.activate([
            hosting.view.leadingAnchor.constraint(equalTo: scrollView.contentLayoutGuide.leadingAnchor),
            hosting.view.trailingAnchor.constraint(equalTo: scrollView.contentLayoutGuide.trailingAnchor),
            hosting.view.topAnchor.constraint(equalTo: scrollView.contentLayoutGuide.topAnchor),
            hosting.view.bottomAnchor.constraint(equalTo: scrollView.contentLayoutGuide.bottomAnchor),
            hosting.view.heightAnchor.constraint(equalTo: scrollView.frameLayoutGuide.heightAnchor),
            widthConstraint,
        ])

        context.coordinator.hostingController = hosting
        context.coordinator.widthConstraint = widthConstraint
        context.coordinator.scrollView = scrollView
        context.coordinator.installReorderGesture(on: scrollView)
        return scrollView
    }

    func updateUIView(_ scrollView: UIScrollView, context: Context) {
        context.coordinator.hostingController?.rootView = content()
        context.coordinator.widthConstraint?.constant = contentWidth
        context.coordinator.tabCount = tabIds.count
        context.coordinator.tabWidth = tabWidth
        context.coordinator.tabGap = tabGap
        context.coordinator.horizontalPadding = horizontalPadding
        context.coordinator.reorderHandleWidth = reorderHandleWidth
        context.coordinator.reorderLongPressRecognizer?.minimumPressDuration = reorderLongPressDuration
        context.coordinator.onReorderBegan = onReorderBegan
        context.coordinator.onReorderChanged = onReorderChanged
        context.coordinator.onReorderEnded = onReorderEnded
        context.coordinator.onReorderCancelled = onReorderCancelled

        if !context.coordinator.isReordering {
            scrollView.isScrollEnabled = isScrollEnabled
        }

        let scrollSignature = "\(activeTabId ?? "")|\(tabIds.joined(separator: ","))"
        if scrollSignature != context.coordinator.lastScrollSignature {
            context.coordinator.lastScrollSignature = scrollSignature
            context.coordinator.scrollToActiveTab(
                activeTabId: activeTabId,
                tabIds: tabIds,
                tabWidth: tabWidth,
                tabGap: tabGap,
                horizontalPadding: horizontalPadding
            )
        }
    }

    final class Coordinator: NSObject, UIGestureRecognizerDelegate {
        var hostingController: UIHostingController<Content>?
        var widthConstraint: NSLayoutConstraint?
        weak var scrollView: UIScrollView?
        var lastScrollSignature = ""

        var tabCount = 0
        var tabWidth: CGFloat = 0
        var tabGap: CGFloat = 0
        var horizontalPadding: CGFloat = 0
        var reorderHandleWidth: CGFloat = 0
        var reorderLongPressRecognizer: UILongPressGestureRecognizer?

        var onReorderBegan: ((Int) -> Void)?
        var onReorderChanged: ((CGFloat) -> Void)?
        var onReorderEnded: ((CGFloat) -> Void)?
        var onReorderCancelled: (() -> Void)?

        private var reorderSourceIndex: Int?
        private var reorderStartX: CGFloat = 0

        var isReordering: Bool { reorderSourceIndex != nil }

        func installReorderGesture(on scrollView: UIScrollView) {
            let longPress = UILongPressGestureRecognizer(
                target: self,
                action: #selector(handleReorderLongPress(_:))
            )
            longPress.minimumPressDuration = 0.45
            longPress.allowableMovement = 10
            longPress.delegate = self
            scrollView.addGestureRecognizer(longPress)
            reorderLongPressRecognizer = longPress
        }

        func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
            guard gestureRecognizer === reorderLongPressRecognizer else { return true }
            let contentX = contentX(for: gestureRecognizer)
            return tabIndex(at: contentX) != nil
        }

        func gestureRecognizer(
            _ gestureRecognizer: UIGestureRecognizer,
            shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
        ) -> Bool {
            gestureRecognizer === reorderLongPressRecognizer
        }

        @objc private func handleReorderLongPress(_ recognizer: UILongPressGestureRecognizer) {
            guard let scrollView else { return }
            let contentX = contentX(for: recognizer)

            switch recognizer.state {
            case .began:
                guard let index = tabIndex(at: contentX) else { return }
                reorderSourceIndex = index
                reorderStartX = contentX
                scrollView.isScrollEnabled = false
                TabReorderNavigationPopSuppressor.suppress(from: hostingController?.view ?? scrollView)
                UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                onReorderBegan?(index)
            case .changed:
                guard reorderSourceIndex != nil else { return }
                onReorderChanged?(contentX - reorderStartX)
            case .ended:
                guard reorderSourceIndex != nil else { return }
                onReorderEnded?(contentX - reorderStartX)
                finishReorder()
            case .cancelled, .failed:
                guard reorderSourceIndex != nil else { return }
                onReorderCancelled?()
                finishReorder()
            default:
                break
            }
        }

        private func contentX(for recognizer: UIGestureRecognizer) -> CGFloat {
            let contentView = hostingController?.view ?? scrollView
            return recognizer.location(in: contentView).x
        }

        private func finishReorder() {
            reorderSourceIndex = nil
            reorderStartX = 0
            if let scrollView {
                scrollView.isScrollEnabled = true
                TabReorderNavigationPopSuppressor.restore(from: hostingController?.view ?? scrollView)
            }
        }

        private func tabIndex(at x: CGFloat) -> Int? {
            guard x >= horizontalPadding, tabWidth > 0, tabCount > 0 else { return nil }
            var cursor = horizontalPadding
            for index in 0..<tabCount {
                if x >= cursor, x < cursor + tabWidth {
                    return index
                }
                cursor += tabWidth + tabGap
            }
            return nil
        }

        func scrollToActiveTab(
            activeTabId: String?,
            tabIds: [String],
            tabWidth: CGFloat,
            tabGap: CGFloat,
            horizontalPadding: CGFloat
        ) {
            guard let scrollView, let activeTabId, let index = tabIds.firstIndex(of: activeTabId) else { return }
            scrollView.layoutIfNeeded()
            let slot = tabWidth + tabGap
            let tabCenter = horizontalPadding + CGFloat(index) * slot + tabWidth / 2
            let targetX = max(0, tabCenter - scrollView.bounds.width / 2)
            let maxX = max(0, scrollView.contentSize.width - scrollView.bounds.width)
            UIView.animate(withDuration: 0.2) {
                scrollView.contentOffset.x = min(targetX, maxX)
            }
        }
    }
}

// MARK: - Cell

private struct NoteTabCell: View {
    let displayTitle: String
    let iconClass: String?
    let fallbackNoteType: NoteType
    let isActive: Bool
    let width: CGFloat
    let reorderHandleWidth: CGFloat
    let onTap: () -> Void
    let onClose: () -> Void

    @Environment(\.colorScheme) private var colorScheme

    var body: some View {
        HStack(alignment: .center, spacing: 0) {
            Color.clear
                .frame(width: reorderHandleWidth, height: NoteTabsBar.cellHeight)
                .overlay {
                    Image(systemName: "line.3.horizontal")
                        .font(.system(size: 9, weight: .bold))
                        .foregroundStyle(.tertiary)
                }
                .allowsHitTesting(false)
                .accessibilityHidden(true)

            Button(action: onTap) {
                HStack(alignment: .center, spacing: 4) {
                    NoteIconView(
                        iconClass: iconClass,
                        fallbackNoteType: fallbackNoteType,
                        size: .compact,
                        foregroundStyle: isActive ? Color.accentColor : Color.secondary
                    )
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
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)

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
