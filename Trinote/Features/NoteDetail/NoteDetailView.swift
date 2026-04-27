import Combine
import SwiftUI
import PhotosUI
import UIKit
import WebKit

/// Which ⋯ menu command to mirror on the trailing toolbar; stored in `UserDefaults` via `@AppStorage`.

/// Tracked ⋯ menu actions mirrored on the trailing toolbar (delete, edit, rename, and cancel editing are never tracked).
private enum NoteDetailToolbarQuickAction: String, CaseIterable {
    case cancelEditing
    case newChild
    case duplicate
    case noteDetails
    case favorite
    case findOnPage
}

private struct NoteDetailShareURLSheetItem: Identifiable {
    let id = UUID()
    let url: URL
}

private struct MoveNoteDetailConfirm {
    let targetParentNoteId: String
    let targetTitle: String
    let targetParentBranchId: String
}

struct NoteDetailView: View {
    let noteId: String
    let title: String
    /// Populated when opening from the tree so sub-notes match expanded in-memory children offline.
    var seedChildSummaries: [ChildNoteSummary]? = nil
    var startInEditMode: Bool = false
    /// When set (e.g. from search), opens find-on-page after content loads and jumps to this 1-based match.
    var pendingFindQuery: String? = nil
    var pendingFindMatchIndex: Int? = nil
    /// When set (e.g. open tabs bar), which `OpenNoteTab` row to restore scroll for.
    var openTabId: String? = nil
    /// When `true` (default), the **last active** open tab (or a chosen row) is retargeted to the note you navigated to from the tree, search, etc. Set `false` for pushed in-note link destinations so the tab strip is not remapped.
    var retargetActiveOpenTab: Bool = true

    init(
        noteId: String,
        title: String,
        seedChildSummaries: [ChildNoteSummary]? = nil,
        startInEditMode: Bool = false,
        pendingFindQuery: String? = nil,
        pendingFindMatchIndex: Int? = nil,
        openTabId: String? = nil,
        retargetActiveOpenTab: Bool = true
    ) {
        self.noteId = noteId
        self.title = title
        self.seedChildSummaries = seedChildSummaries
        self.startInEditMode = startInEditMode
        self.pendingFindQuery = pendingFindQuery
        self.pendingFindMatchIndex = pendingFindMatchIndex
        self.openTabId = openTabId
        self.retargetActiveOpenTab = retargetActiveOpenTab
        _activeNoteId = State(initialValue: noteId)
        _activeOpenTabId = State(initialValue: openTabId)
    }

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var activeNoteId: String
    @State private var viewModel: NoteDetailViewModel?
    @State private var navigateToNoteId: String?

    // Inline image insertion state
    @State private var showEditorImageSourceDialog = false
    @State private var showEditorImagePicker = false
    @State private var showEditorCamera = false
    @State private var editorImageItem: PhotosPickerItem?
    @State private var imageToInsert: String?
    @State private var protectedDocumentPassword = ""
    @State private var favoriteNoteIds: Set<String> = []
    @State private var findControl = FindOnPageControl()
    @State private var findDeepLinkConsumed = false
    @State private var noteDetailShareURLSheetItem: NoteDetailShareURLSheetItem?
    @State private var showMoveParentPicker = false
    @State private var moveNoteDetailConfirm: MoveNoteDetailConfirm?
    /// Last note menu action repeated on the trailing toolbar (persists across notes and launches).
    @AppStorage("noteDetailLastToolbarMenuAction") private var lastToolbarQuickActionRaw: String = NoteDetailToolbarQuickAction.noteDetails.rawValue
    @AppStorage("showNoteTabsBar") private var showNoteTabsBar: Bool = false
    @AppStorage("lastActiveOpenTabId") private var lastActiveOpenTabIdStorage: String = ""
    @State private var activeOpenTabId: String?
    @State private var openNoteTabListNonEmpty: Bool = false

    /// Aligns “Copy share link” / “Share link…” with the Share/Sharing title (after `scale.3d` column).
    private static let sharingSubmenuTitleLeadingInset: CGFloat = 36

    /// Floating Edit chip: shown when opening an editable note; hides on scroll **up**, shows on scroll **down**.
    @State private var showFloatingEditButton = false
    @State private var lastScrollContentOffsetY: CGFloat = 0
    @State private var floatingEditScrollBaselineReady = false
    /// Scroll fraction (0–1) of the read-only ScrollView, used to restore position in the editor.
    @State private var readOnlyScrollFraction: CGFloat = 0
    /// After save leaves the rich-text editor, applied once to the read-only `ScrollView` (same fraction as the web editor).
    @State private var readOnlyScrollFractionPendingRestore: CGFloat?

    /// Save/cancel chip while editing: hide on scroll up, show on scroll down (same rules as read-mode edit FAB).
    @State private var showEditorSaveCancelChip = true
    @State private var lastEditorScrollOffsetY: CGFloat = 0
    @State private var editorSaveCancelScrollBaselineReady = false
    /// True while the table context toolbar is visible in the editor.
    @State private var editorTableToolsVisible = false
    /// After typing activity, show the save chip again after this delay (unless scroll/table logic overrides).
    @State private var editorSaveChipIdleWorkItem: DispatchWorkItem?
    /// Ignore `editorTypingActivity` until this time (avoids hiding the chip from ProseMirror init updates).
    @State private var editorSaveChipIgnoreTypingUntil: Date = .distantPast
    /// Latest editor scroll `y` / `scrollTop` (for gating typing-hide vs. “at top, always show”).
    @State private var lastSaveChipEditorScrollY: CGFloat = 0
    @State private var lastSaveChipEditorVerticallyScrollable: Bool = true
    /// Reference to the rich-text editor WKWebView so the save button can call JS `getContent()`.
    @State private var editorWebView: WKWebView?
    @State private var showIncludeNotePicker = false

    /// Bridge to communicate with the canvas editor WKWebView (call getSceneData on save).
    @StateObject private var canvasEditorBridge = CanvasEditorBridge()
    @State private var canvasHasUnsavedChanges = false

    /// Bridge to communicate with the mind map editor WKWebView (call getMapData on save).
    @StateObject private var mindMapEditorBridge = MindMapEditorBridge()
    @State private var mindMapHasUnsavedChanges = false

    /// Bridge to communicate with the geo map editor WKWebView.
    @StateObject private var geoMapEditorBridge = GeoMapEditorBridge()
    @State private var geoMapPins: [GeoMapPin] = []

    private var principalTitleText: String {
        if let n = viewModel?.note {
            return n.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
        }
        return title
    }

    private func uiTitle(for note: NoteItem) -> String {
        note.uiTitle(forProtectedSessionActive: appState.protectedSessionActive)
    }

    /// Shown under the note title (replaces duplicate full path).
    private func lastChangedCaption(for note: NoteItem) -> String? {
        guard !note.dateModified.isEmpty else { return nil }
        let formatted: String
        if let d = note.dateModified.triliumDate() {
            formatted = d.shortDisplay
        } else {
            formatted = note.dateModified
        }
        return String(localized: "Last changed \(formatted)", comment: "Subtitle under note title; formatted is date/time")
    }

    /// `contentOffset` / `scrollTop` at or below this (including small negative bounce) counts as “at top of content” — always show the floating edit (read mode) and save (editing) chips; typing does not hide the save chip in this range.
    private static let noteDetailFloatingChipsAtTopY: CGFloat = 8

    /// Uses `UIScrollView.contentOffset.y` (via `NoteDetailScrollOffsetReader`): increases when scrolling **down**, decreases when scrolling **up**.
    private func updateFloatingEditVisibility(contentOffsetY: CGFloat, vm: NoteDetailViewModel, note: NoteItem) {
        guard note.type.isEditable, !vm.needsProtectedSession, !vm.isEditing else {
            if showFloatingEditButton {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = false
                }
            }
            lastScrollContentOffsetY = contentOffsetY
            floatingEditScrollBaselineReady = false
            return
        }

        if contentOffsetY <= Self.noteDetailFloatingChipsAtTopY {
            if !floatingEditScrollBaselineReady {
                floatingEditScrollBaselineReady = true
            }
            lastScrollContentOffsetY = contentOffsetY
            if !showFloatingEditButton {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = true
                }
            }
            return
        }

        if !floatingEditScrollBaselineReady {
            floatingEditScrollBaselineReady = true
            lastScrollContentOffsetY = contentOffsetY
            return
        }

        let directionalThreshold: CGFloat = 10
        let delta = contentOffsetY - lastScrollContentOffsetY
        lastScrollContentOffsetY = contentOffsetY

        let nextVisible: Bool
        if delta < -directionalThreshold {
            // Offset decreased → user scrolled **up** → hide.
            nextVisible = false
        } else if delta > directionalThreshold {
            // User scrolled **down** → show again.
            nextVisible = true
        } else {
            return
        }

        if nextVisible != showFloatingEditButton {
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showFloatingEditButton = nextVisible
            }
        }
    }

    /// Save pill: show on scroll-down sooner than hide on scroll-up (asymmetric thresholds).
    /// When `verticallyScrollable` is false, the pill always stays visible (no scroll means no scroll events to recover from a hidden state).
    private func updateEditorSaveCancelChipVisibility(contentOffsetY: CGFloat, verticallyScrollable: Bool = true) {
        lastSaveChipEditorScrollY = contentOffsetY
        lastSaveChipEditorVerticallyScrollable = verticallyScrollable
        if !verticallyScrollable {
            lastEditorScrollOffsetY = contentOffsetY
            editorSaveCancelScrollBaselineReady = true
            if !showEditorSaveCancelChip {
                withAnimation(.spring(response: 0.30, dampingFraction: 0.78)) {
                    showEditorSaveCancelChip = true
                }
            }
            return
        }

        if contentOffsetY <= Self.noteDetailFloatingChipsAtTopY {
            lastEditorScrollOffsetY = contentOffsetY
            editorSaveCancelScrollBaselineReady = true
            if !showEditorSaveCancelChip {
                withAnimation(.spring(response: 0.30, dampingFraction: 0.78)) {
                    showEditorSaveCancelChip = true
                }
            }
            return
        }

        if !editorSaveCancelScrollBaselineReady {
            editorSaveCancelScrollBaselineReady = true
            lastEditorScrollOffsetY = contentOffsetY
            return
        }

        /// Minimum `contentOffset.y` change to count as scrolling **up** (hide pill). Slightly higher avoids jitter.
        let scrollUpThreshold: CGFloat = 10
        /// Lower than `scrollUpThreshold` so a small scroll **down** brings the save pill back quickly.
        let scrollDownThreshold: CGFloat = 3

        let delta = contentOffsetY - lastEditorScrollOffsetY
        lastEditorScrollOffsetY = contentOffsetY

        let nextVisible: Bool
        if delta < -scrollUpThreshold {
            nextVisible = false
        } else if delta > scrollDownThreshold {
            nextVisible = true
        } else {
            return
        }

        if nextVisible != showEditorSaveCancelChip {
            withAnimation(.spring(response: 0.30, dampingFraction: 0.78)) {
                showEditorSaveCancelChip = nextVisible
            }
        }
    }

    /// Delay after last typing activity before the save chip fades back in (shorter = snappier; too low flickers on brief pauses).
    private static let editorSaveChipIdleDelay: TimeInterval = 1
    private static let editorSaveChipIgnoreTypingAfterAppear: TimeInterval = 0.5

    private func cancelEditorSaveChipIdleShowTask() {
        editorSaveChipIdleWorkItem?.cancel()
        editorSaveChipIdleWorkItem = nil
    }

    private func handleEditorSaveChipTypingActivity() {
        guard Date() >= editorSaveChipIgnoreTypingUntil else { return }
        if !lastSaveChipEditorVerticallyScrollable { return }
        if lastSaveChipEditorScrollY <= Self.noteDetailFloatingChipsAtTopY { return }
        cancelEditorSaveChipIdleShowTask()

        if showEditorSaveCancelChip {
            withAnimation(.spring(response: 0.30, dampingFraction: 0.78)) {
                showEditorSaveCancelChip = false
            }
        }

        let work = DispatchWorkItem {
            withAnimation(.spring(response: 0.30, dampingFraction: 0.78)) {
                showEditorSaveCancelChip = true
            }
        }
        editorSaveChipIdleWorkItem = work
        DispatchQueue.main.asyncAfter(deadline: .now() + Self.editorSaveChipIdleDelay, execute: work)
    }

    @ViewBuilder
    private func floatingEditFAB(vm: NoteDetailViewModel) -> some View {
        Button {
            vm.startEditing()
        } label: {
            Image("EditNoteFloating")
                .resizable()
                .renderingMode(.template)
                .aspectRatio(contentMode: .fit)
                .frame(width: 24, height: 24)
                .foregroundStyle(.primary)
                .padding(12)
                .background(.ultraThinMaterial, in: Circle())
                .shadow(color: .black.opacity(0.12), radius: 5, y: 2)
        }
        .buttonStyle(.plain)
        .accessibilityLabel(String(localized: "Edit note", comment: "Floating scroll edit button"))
    }

    /// Fetches HTML + scroll fraction from `editor.html` in one round-trip (see `getScrollFraction` / `scrollToFraction`).
    private static let richTextEditorSavePayloadScript = """
    (function(){
      try {
        var html = window.editorBridge.getContent();
        var f = window.editorBridge.getScrollFraction();
        return JSON.stringify({ html: html, f: f });
      } catch (e) {
        return JSON.stringify({ html: null, f: 0 });
      }
    })();
    """

    /// WKWebView may return `JSON.stringify` as a `String` or as a bridged dictionary; the latter used to force a
    /// `saveContent()` fallback without `freshHTML`, losing editor-only state (e.g. math restored by undo).
    private static func parseRichTextEditorSavePayload(_ result: Any?) -> (html: String?, scrollFraction: CGFloat?) {
        if let obj = javaScriptResultAsStringKeyedDictionary(result) {
            return parseRichTextSavePayloadFromDictionary(obj)
        }
        guard let s = result as? String, !s.isEmpty else { return (nil, nil) }
        guard s.first == "{",
              let data = s.data(using: .utf8),
              let obj = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            return (s, nil)
        }
        return parseRichTextSavePayloadFromDictionary(obj)
    }

    private static func javaScriptResultAsStringKeyedDictionary(_ result: Any?) -> [String: Any]? {
        if let d = result as? [String: Any] { return d }
        guard let raw = result as? [AnyHashable: Any] else { return nil }
        var out: [String: Any] = [:]
        for (k, v) in raw {
            if let ks = k as? String { out[ks] = v }
            else if let ks = k as? NSString { out[ks as String] = v }
        }
        return out.isEmpty ? nil : out
    }

    private static func parseRichTextSavePayloadFromDictionary(_ obj: [String: Any]) -> (html: String?, scrollFraction: CGFloat?) {
        let html: String?
        switch obj["html"] {
        case is NSNull, nil:
            html = nil
        case let str as String:
            html = str
        case let ns as NSString:
            html = ns as String
        default:
            html = nil
        }
        let f: CGFloat?
        if let n = obj["f"] as? NSNumber {
            f = CGFloat(truncating: n)
        } else if let d = obj["f"] as? Double {
            f = CGFloat(d)
        } else {
            f = nil
        }
        return (html, f)
    }

    private func queueReadOnlyScrollRestoreAfterRichTextSave(fraction: CGFloat) {
        let f = min(max(fraction, 0), 1)
        readOnlyScrollFraction = f
        readOnlyScrollFractionPendingRestore = f
    }

    /// Escape for use inside a JS template literal (same pattern as `RichTextEditorView.setContent`).
    private static func javaScriptTemplateLiteralContent(_ string: String) -> String {
        string
            .replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "`", with: "\\`")
            .replacingOccurrences(of: "${", with: "\\${")
    }

    private static func insertIncludeNoteInEditor(webView: WKWebView?, noteId: String, title: String, boxSize: String) {
        guard let webView else { return }
        let idEsc = javaScriptTemplateLiteralContent(noteId)
        let titleEsc = javaScriptTemplateLiteralContent(title)
        let boxEsc = javaScriptTemplateLiteralContent(boxSize)
        let script = "window.editorBridge.insertIncludeNote(`\(idEsc)`, `\(boxEsc)`, `\(titleEsc)`);"
        webView.evaluateJavaScript(script, completionHandler: nil)
    }

    private static func pushIncludeNoteTitleToEditor(webView: WKWebView?, noteId: String, title: String) {
        guard let webView else { return }
        let idEsc = javaScriptTemplateLiteralContent(noteId)
        let titleEsc = javaScriptTemplateLiteralContent(title)
        webView.evaluateJavaScript("window.editorBridge.setIncludeNoteTitle(`\(idEsc)`, `\(titleEsc)`);", completionHandler: nil)
    }

    private static func pushIncludeNotePreviewToEditor(webView: WKWebView?, previewId: String, html: String) {
        guard let webView else { return }
        let payload: [String: String] = ["previewId": previewId, "html": html]
        guard let data = try? JSONSerialization.data(withJSONObject: payload),
              let json = String(data: data, encoding: .utf8) else { return }
        let escaped = javaScriptTemplateLiteralContent(json)
        webView.evaluateJavaScript("window.editorBridge.applyIncludeNotePreviewJSON(`\(escaped)`);", completionHandler: nil)
    }

    /// Fetches the latest HTML from the rich-text editor (including non-ProseMirror state like
    /// table captions) and then saves. Falls back to the debounce-cached content when the
    /// WKWebView is unavailable (e.g. non-rich-text note types).
    private func saveRichTextContent(vm: NoteDetailViewModel) {
        if let wv = editorWebView {
            wv.evaluateJavaScript(Self.richTextEditorSavePayloadScript) { result, _ in
                DispatchQueue.main.async {
                    let (html, frac) = Self.parseRichTextEditorSavePayload(result)
                    if let frac {
                        queueReadOnlyScrollRestoreAfterRichTextSave(fraction: frac)
                    }
                    if let html {
                        vm.saveContent(freshHTML: html)
                    } else {
                        vm.saveContent()
                    }
                }
            }
        } else {
            vm.saveContent()
        }
    }

    /// Save-only floating chip (cancel is in the note toolbar menu / quick action while editing).
    @ViewBuilder
    private func editorSaveChip(vm: NoteDetailViewModel) -> some View {
        Button {
            saveRichTextContent(vm: vm)
        } label: {
            ZStack {
                if vm.isSaving {
                    ProgressView()
                        .controlSize(.small)
                } else {
                    Image("SaveNoteFloating")
                        .resizable()
                        .renderingMode(.template)
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 24, height: 24)
                }
            }
            .foregroundStyle(.primary)
            .frame(width: 48, height: 48)
            .background(.ultraThinMaterial, in: Circle())
            .shadow(color: .black.opacity(0.12), radius: 5, y: 2)
        }
        .buttonStyle(.plain)
        .disabled(vm.isSaving)
        .accessibilityLabel(String(localized: "Save", comment: "Editor save chip"))
    }

    var body: some View {
        bodyCore
            .background(NavigationPopGestureBlocker(blocked: viewModel?.isEditing == true || isGeoMapNote(viewModel?.note, contentString: viewModel?.contentString, vm: viewModel)).frame(width: 0, height: 0))
            .task(id: activeNoteId) { await initialLoad() }
            .navigationDestination(item: $navigateToNoteId) { linkedNoteId in
                NoteDetailView(noteId: linkedNoteId, title: "", startInEditMode: false)
            }
            .safeAreaInset(edge: .bottom, spacing: 0) {
                if showNoteTabsBar, openNoteTabListNonEmpty, viewModel?.isEditing != true {
                    NoteTabsBar(
                        currentOpenTabId: activeOpenTabId,
                        onSelect: { selectOpenNoteTab($0) },
                        onOpenTabRemoved: { handleOpenTabRemoved($0) },
                        onTabsBecameEmpty: {
                            lastActiveOpenTabIdStorage = ""
                        }
                    )
                    .transition(.move(edge: .bottom))
                }
            }
            .toolbar(viewModel?.isEditing == true ? .hidden : .visible, for: .tabBar)
            .animation(.easeInOut(duration: 0.2), value: viewModel?.isEditing == true)
            .onChange(of: viewModel?.note?.noteId) { _, _ in refreshOpenNoteTabListNonEmpty() }
            .onChange(of: showNoteTabsBar) { _, _ in refreshOpenNoteTabListNonEmpty() }
            .onChange(of: activeOpenTabId) { _, t in
                if let t {
                    lastActiveOpenTabIdStorage = t
                } else {
                    lastActiveOpenTabIdStorage = ""
                }
            }
            .onReceive(NotificationCenter.default.publisher(for: .openNoteTabsChanged)) { _ in
                refreshOpenNoteTabListNonEmpty()
                validateOrphanedActiveOpenTabId()
            }
            .onAppear {
                refreshOpenNoteTabListNonEmpty()
                if showNoteTabsBar, let t = activeOpenTabId { lastActiveOpenTabIdStorage = t }
                if showNoteTabsBar, retargetActiveOpenTab { restoreActiveOpenTabToCurrentNoteIfDrifted() }
            }
            .onChange(of: navigateToNoteId) { oldValue, newValue in
                guard oldValue != nil, newValue == nil else { return }
                if showNoteTabsBar, retargetActiveOpenTab { restoreActiveOpenTabToCurrentNoteIfDrifted() }
            }
            .overlay { bodyChangeListeners }
    }

    private func refreshOpenNoteTabListNonEmpty() {
        guard let p = appState.activeProfile?.id else {
            openNoteTabListNonEmpty = false
            return
        }
        let n = PersistenceManager.shared.openNoteTabCount(serverProfileId: p)
        openNoteTabListNonEmpty = n > 0
    }

    @ViewBuilder
    private var bodyCore: some View {
        Group {
            if let viewModel {
                noteContent(viewModel)
            } else {
                ProgressView()
            }
        }
        .navigationBarBackButtonHidden(viewModel?.isEditing == true)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            if viewModel?.isEditing == true {
                ToolbarItem(placement: .topBarLeading) {
                    Button {
                        dismiss()
                    } label: {
                        Label(String(localized: "Back", comment: "Back from note detail"), systemImage: "chevron.left")
                            .labelStyle(.iconOnly)
                    }
                    .accessibilityLabel(String(localized: "Back", comment: "Back button on note detail"))
                }
            }
            ToolbarItem(placement: .principal) {
                HStack(spacing: 6) {
                    if viewModel?.serverVerified == false && viewModel?.note != nil {
                        Image(systemName: "icloud.slash")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Text(principalTitleText)
                        .font(.headline)
                        .lineLimit(1)
                }
            }
        }
        .sheet(item: $noteDetailShareURLSheetItem) { item in
            ShareSheet(items: [item.url])
                .presentationDetents([.large])
                .presentationDragIndicator(.visible)
        }
    }

    private func initialLoad() async {
        if viewModel == nil {
            let vm = NoteDetailViewModel(noteId: activeNoteId, appState: appState, seedChildSummaries: seedChildSummaries)
            viewModel = vm
            await vm.load()
            async let contentTask: () = vm.loadContent()
            async let attachTask: () = vm.loadAttachments()
            await vm.loadChildNotes()
            _ = await (contentTask, attachTask)
            await vm.prefetchChildNotesForGeoMapBookIfNeeded()
            if startInEditMode, vm.note != nil {
                vm.isEditing = true
            }
        }
        if showNoteTabsBar { reconcileOpenTabsAfterLoad() }
    }

    private func reconcileOpenTabsAfterLoad() {
        guard showNoteTabsBar, let p = appState.activeProfile?.id, let n = viewModel?.note else { return }
        let pm = PersistenceManager.shared
        let count = pm.openNoteTabCount(serverProfileId: p)
        refreshOpenNoteTabListNonEmpty()

        if !retargetActiveOpenTab {
            if count == 0 {
                if let newId = try? pm.ensureFirstOpenNoteTabIfEmpty(
                    noteId: n.noteId, title: n.title, noteType: n.type.rawValue, serverProfileId: p
                ) { activeOpenTabId = newId }
            } else {
                if activeOpenTabId == nil, !lastActiveOpenTabIdStorage.isEmpty,
                   (try? pm.fetchOpenNoteTab(id: lastActiveOpenTabIdStorage, serverProfileId: p)) != nil {
                    activeOpenTabId = lastActiveOpenTabIdStorage
                }
                if activeOpenTabId == nil, let t = try? pm.findPreferredOpenTabId(
                    for: n.noteId, serverProfileId: p
                ) { activeOpenTabId = t }
            }
            if let t = activeOpenTabId { applyReadScrollStateFromStoreForOpenTabId(t) }
            return
        }

        if count == 0 {
            if let newId = try? pm.ensureFirstOpenNoteTabIfEmpty(
                noteId: n.noteId, title: n.title, noteType: n.type.rawValue, serverProfileId: p
            ) { activeOpenTabId = newId }
            if let t = activeOpenTabId { applyReadScrollStateFromStoreForOpenTabId(t) }
            return
        }

        if let cur = activeOpenTabId, (try? pm.fetchOpenNoteTab(id: cur, serverProfileId: p)) != nil {
            resolveRetargetToCurrentNote(pm: pm, p: p, n: n, tabId: cur)
            return
        }

        if let o = self.openTabId, (try? pm.fetchOpenNoteTab(id: o, serverProfileId: p)) != nil {
            activeOpenTabId = o
            resolveRetargetToCurrentNote(pm: pm, p: p, n: n, tabId: o)
            return
        }

        if !lastActiveOpenTabIdStorage.isEmpty,
           (try? pm.fetchOpenNoteTab(id: lastActiveOpenTabIdStorage, serverProfileId: p)) != nil {
            activeOpenTabId = lastActiveOpenTabIdStorage
        }
        if activeOpenTabId == nil, let m = try? pm.mostRecentlyAddedOpenNoteTabId(serverProfileId: p) {
            activeOpenTabId = m
        }
        if let t = activeOpenTabId { resolveRetargetToCurrentNote(pm: pm, p: p, n: n, tabId: t) }
    }

    /// Re-runs after popping back from a pushed sub-note so the active tab points at *this* view's note again. Skips work if the tab already matches; only retargets, never alters scroll state.
    private func restoreActiveOpenTabToCurrentNoteIfDrifted() {
        guard let p = appState.activeProfile?.id,
              let n = viewModel?.note,
              let t = activeOpenTabId else { return }
        let pm = PersistenceManager.shared
        guard let row = try? pm.fetchOpenNoteTab(id: t, serverProfileId: p) else { return }
        if row.noteId == n.noteId { return }
        do {
            try pm.retargetOpenNoteTab(
                id: t,
                to: n.noteId,
                title: n.title,
                noteType: n.type.rawValue,
                serverProfileId: p
            )
        } catch {}
    }

    private func resolveRetargetToCurrentNote(
        pm: PersistenceManager, p: String, n: NoteItem, tabId: String
    ) {
        guard let row = try? pm.fetchOpenNoteTab(id: tabId, serverProfileId: p) else { return }
        if row.noteId == n.noteId {
            applyReadScrollStateFromStoreForOpenTabId(tabId)
            return
        }
        do {
            try pm.retargetOpenNoteTab(
                id: tabId,
                to: n.noteId,
                title: n.title,
                noteType: n.type.rawValue,
                serverProfileId: p
            )
        } catch {}
        OpenTabSessionStore.clearReadScrollState(for: tabId)
        readOnlyScrollFraction = 0
        readOnlyScrollFractionPendingRestore = 0
    }

    private func applyReadScrollStateFromStoreForOpenTabId(_ id: String) {
        if let f = OpenTabSessionStore.readReadScrollFraction(for: id) {
            readOnlyScrollFraction = f
            readOnlyScrollFractionPendingRestore = f
        } else {
            readOnlyScrollFraction = 0
            readOnlyScrollFractionPendingRestore = 0
        }
    }

    private func selectOpenNoteTab(_ tab: OpenNoteTab) {
        guard appState.activeProfile?.id == tab.serverProfileId else { return }
        if let prev = activeOpenTabId, prev != tab.id {
            OpenTabSessionStore.saveReadScrollFraction(readOnlyScrollFraction, for: prev)
        }
        if tab.noteId == activeNoteId {
            if tab.id == activeOpenTabId { return }
            activeOpenTabId = tab.id
            applyReadScrollStateFromStoreForOpenTabId(tab.id)
            return
        }
        activeOpenTabId = tab.id
        applyReadScrollStateFromStoreForOpenTabId(tab.id)
        viewModel = nil
        activeNoteId = tab.noteId
    }

    private func handleOpenTabRemoved(_ removed: OpenNoteTab) {
        OpenTabSessionStore.clearReadScrollState(for: removed.id)
        guard removed.id == activeOpenTabId, let p = appState.activeProfile?.id else { return }
        activeOpenTabId = nil
        let all = (try? PersistenceManager.shared.fetchOpenNoteTabs(serverProfileId: p)) ?? []
        if all.isEmpty {
            lastActiveOpenTabIdStorage = ""
        } else if let n = viewModel?.note, let m = all.filter({ $0.noteId == n.noteId }).max(by: { $0.addedAt < $1.addedAt }) {
            selectOpenNoteTab(m)
        } else if let a = all.max(by: { $0.addedAt < $1.addedAt }) {
            selectOpenNoteTab(a)
        }
    }

    private func validateOrphanedActiveOpenTabId() {
        guard let p = appState.activeProfile?.id else { return }
        if PersistenceManager.shared.openNoteTabCount(serverProfileId: p) == 0 {
            activeOpenTabId = nil
            lastActiveOpenTabIdStorage = ""
            return
        }
        guard let t = activeOpenTabId else { return }
        if (try? PersistenceManager.shared.fetchOpenNoteTab(id: t, serverProfileId: p)) != nil { return }
        activeOpenTabId = nil
        guard let n = viewModel?.note else { return }
        if let u = try? PersistenceManager.shared.findPreferredOpenTabId(
            for: n.noteId, serverProfileId: p
        ), let row = try? PersistenceManager.shared.fetchOpenNoteTab(id: u, serverProfileId: p) {
            selectOpenNoteTab(row)
        } else {
            lastActiveOpenTabIdStorage = ""
        }
    }

    @ViewBuilder
    private var bodyChangeListeners: some View {
        let needsProtected: Bool? = viewModel?.needsProtectedSession
        let protectedActive: Bool = appState.protectedSessionActive
        let content: String? = viewModel?.contentString
        let loading: Bool? = viewModel?.isLoadingContent
        let editing: Bool? = viewModel?.isEditing

        Color.clear
            .frame(width: 0, height: 0)
            .onReceive(NotificationCenter.default.publisher(for: .trinoteOfflineNoteIdReplaced)) { notification in
                guard let from = notification.userInfo?["from"] as? String,
                      let to = notification.userInfo?["to"] as? String,
                      from == activeNoteId
                else { return }
                viewModel = nil
                activeNoteId = to
            }
            .onChange(of: needsProtected) { _, needs in
                if needs == false { protectedDocumentPassword = "" }
                if needs == false, pendingFindQuery != nil {
                    findDeepLinkConsumed = false
                    consumeFindDeepLinkIfNeeded()
                }
            }
            .onChange(of: protectedActive) { _, _ in
                guard let vm = viewModel else { return }
                Task { await vm.resyncNoteTitlesWithProtectedSession() }
            }
            .onChange(of: content) { _, _ in
                consumeFindDeepLinkIfNeeded()
            }
            .onChange(of: loading) { _, isLoading in
                if isLoading == false {
                    consumeFindDeepLinkIfNeeded()
                }
            }
            .onChange(of: editing) { _, isEditing in
                if isEditing == true {
                    findDeepLinkConsumed = true
                }
            }
            .onChange(of: appState.syncManager.phase) { _, phase in
                guard phase == .done else { return }
                guard let vm = viewModel else { return }
                Task {
                    await vm.loadChildNotes()
                    guard let n = vm.note,
                          isGeoMapNote(n, contentString: vm.contentString, vm: vm) else { return }
                    loadGeoMapPins(vm: vm, note: n)
                }
            }
            .onReceive(NotificationCenter.default.publisher(for: .trinoteTreeShouldRefresh)) { notification in
                guard let vm = viewModel, let n = vm.note,
                      isGeoMapNote(n, contentString: vm.contentString, vm: vm) else { return }
                if let rid = notification.userInfo?["noteId"] as? String {
                    guard rid == n.noteId || vm.childNotes.contains(where: { $0.noteId == rid }) else { return }
                } else {
                    return
                }
                Task {
                    await vm.refreshDirectChildrenMetadataFromServer()
                    guard let parent = vm.note else { return }
                    loadGeoMapPins(vm: vm, note: parent)
                }
            }
    }

    /// Opens the find bar and jumps to a match after the note body is available (search → note deep link).
    private func consumeFindDeepLinkIfNeeded() {
        guard !findDeepLinkConsumed else { return }
        guard let q = pendingFindQuery, !q.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
              let idx = pendingFindMatchIndex, idx >= 1,
              let vm = viewModel, let note = vm.note,
              note.type.supportsReadOnlyOnPageFind,
              !vm.isEditing,
              !vm.needsProtectedSession,
              !vm.isLoadingContent,
              vm.contentString != nil
        else { return }
        findDeepLinkConsumed = true
        findControl.prepareFindDeepLink(findQuery: q, matchIndex1Based: idx)
    }

    @ViewBuilder
    private func noteContent(_ vm: NoteDetailViewModel) -> some View {
        @Bindable var vm = vm
        if vm.isLoading && vm.note == nil {
            ProgressView(String(localized: "Loading note…", comment: "Note detail loading"))
        } else if let error = vm.error, vm.note == nil {
            ContentUnavailableView {
                Label(String(localized: "Error", comment: "Generic error title"), systemImage: "exclamationmark.triangle")
            } description: {
                Text(error)
            } actions: {
                Button(String(localized: "Retry", comment: "Retry load")) { Task { await vm.load() } }
                    .buttonStyle(.bordered)
            }
        } else if let note = vm.note {
            let _ = vm.geoMapDetectionTick
            VStack(spacing: 0) {
                if vm.needsProtectedSession {
                    protectedNoteOverlay(vm, note: note)
                } else if note.isCalendarRoot {
                    calendarDetailView(vm, note: note)
                } else if isGeoMapNote(note, contentString: vm.contentString, vm: vm) {
                    geoMapDetailView(vm, note: note)
                } else if vm.isEditing && note.type == .text {
                    VStack(spacing: 0) {
                        editorStatusBanner(vm)
                        richTextEditingView(vm)
                            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
                    }
                    .background(Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal]))
                } else if vm.isEditing && note.type == .mermaid {
                    mermaidEditingView(vm)
                } else if vm.isEditing && note.type == .mindMap {
                    mindMapEditingView(vm)
                } else if vm.isEditing && note.type == .canvas {
                    canvasEditingView(vm)
                } else if note.type == .mindMap {
                    mindMapReadOnlyView(vm, note: note)
                } else {
                    ZStack(alignment: .bottomTrailing) {
                        ScrollView {
                            VStack(alignment: .leading, spacing: 0) {
                                editorStatusBanner(vm)
                                draftBanner(vm)
                                breadcrumbsBar(vm)
                                titleSection(vm, note: note)
                                Divider()
                                noteBody(vm, note: note, findControl: findControl)
                                childNotesSection(vm)

                                if vm.showDetails {
                                    attachmentsSection(vm)
                                    metadataSection(note)
                                }
                            }
                            .background(
                                ZStack {
                                    NoteDetailScrollOffsetReader { y, _, fraction in
                                        readOnlyScrollFraction = fraction
                                        updateFloatingEditVisibility(
                                            contentOffsetY: y,
                                            vm: vm,
                                            note: note
                                        )
                                    }
                                    NoteDetailReadOnlyScrollRestoration(fraction: readOnlyScrollFractionPendingRestore) {
                                        readOnlyScrollFractionPendingRestore = nil
                                    }
                                }
                                .frame(width: 0, height: 0)
                            )
                        }

                        if showFloatingEditButton {
                            floatingEditFAB(vm: vm)
                                .padding(.trailing, 16)
                                .padding(.bottom, findControl.isPresented ? 56 : 12)
                                .transition(.scale(scale: 0.88).combined(with: .opacity))
                                .zIndex(2)
                        }
                    }
                    .animation(.easeInOut(duration: 0.22), value: findControl.isPresented)
                    .refreshable { await vm.refresh() }
                    .safeAreaInset(edge: .bottom, spacing: 0) {
                        if findControl.isPresented {
                            FindOnPageBar(control: findControl)
                        }
                    }
                    .onAppear {
                        floatingEditScrollBaselineReady = false
                        lastScrollContentOffsetY = 0
                        let eligible = note.type.isEditable && !vm.needsProtectedSession && !vm.isEditing
                        if eligible {
                            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                                showFloatingEditButton = true
                            }
                        } else {
                            showFloatingEditButton = false
                        }
                    }
                    .onChange(of: vm.isEditing) { _, editing in
                        if editing {
                            readOnlyScrollFractionPendingRestore = nil
                            findControl.close()
                            floatingEditScrollBaselineReady = false
                            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                                showFloatingEditButton = false
                            }
                        } else if note.type.isEditable && !vm.needsProtectedSession {
                            floatingEditScrollBaselineReady = false
                            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                                showFloatingEditButton = true
                            }
                        }
                    }
                    .onChange(of: vm.needsProtectedSession) { _, needs in
                        if needs {
                            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                                showFloatingEditButton = false
                            }
                            floatingEditScrollBaselineReady = false
                        } else if note.type.isEditable && !vm.isEditing {
                            floatingEditScrollBaselineReady = false
                            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                                showFloatingEditButton = true
                            }
                        }
                    }
                    .onDisappear {
                        findControl.unregisterAll()
                    }
                }
            }
            .toolbar { noteToolbar(vm, note: note) }
            .onAppear { loadFavoriteNoteIds() }
            .onChange(of: appState.activeProfile?.id) { _, _ in loadFavoriteNoteIds() }
            .alert(String(localized: "Error", comment: "Save error alert"), isPresented: $vm.showSaveError) {
                Button(String(localized: "OK", comment: "Alert dismiss")) { vm.showSaveError = false }
            } message: {
                Text(vm.saveError ?? String(localized: "An unknown error occurred.", comment: "Generic error"))
            }
            .sheet(isPresented: $vm.showCreateChild) {
                CreateChildNoteSheet(viewModel: vm)
            }
            .sheet(isPresented: $showMoveParentPicker) {
                ParentPickerSheet(
                    navigationTitle: String(localized: "Move to…", comment: "Sheet title: pick parent for move"),
                    instruction: String(
                        localized: "Choose where to move the note. Open folders, then tap a note to select it as the new parent.",
                        comment: "Instructions for move note parent picker"
                    ),
                    topLevelButtonTitle: String(localized: "Top level (under Notes)", comment: "Move under root"),
                    onPick: { parentNoteId, title, parentBranchId in
                        if parentNoteId == activeNoteId {
                            vm.saveError = String(localized: "A note cannot be moved under itself.", comment: "Move validation")
                            vm.showSaveError = true
                            showMoveParentPicker = false
                            return
                        }
                        moveNoteDetailConfirm = MoveNoteDetailConfirm(
                            targetParentNoteId: parentNoteId,
                            targetTitle: title,
                            targetParentBranchId: parentBranchId
                        )
                        showMoveParentPicker = false
                    }
                )
                .environment(appState)
            }
            .alert(
                String(localized: "Move Note", comment: "Move confirmation title"),
                isPresented: Binding(
                    get: { moveNoteDetailConfirm != nil },
                    set: { if !$0 { moveNoteDetailConfirm = nil } }
                )
            ) {
                Button(String(localized: "Cancel", comment: "Dismiss move confirm"), role: .cancel) {
                    moveNoteDetailConfirm = nil
                }
                Button(String(localized: "Move", comment: "Confirm move note")) {
                    guard let c = moveNoteDetailConfirm else { return }
                    moveNoteDetailConfirm = nil
                    Task {
                        await vm.moveNoteToParent(
                            targetParentNoteId: c.targetParentNoteId,
                            targetParentBranchId: c.targetParentBranchId
                        )
                    }
                }
            } message: {
                if let c = moveNoteDetailConfirm {
                    Text(
                        String(
                            localized: "Move “\(uiTitle(for: note))” under “\(c.targetTitle)”? The note will appear in the new location in the tree.",
                            comment: "Move confirmation from note detail"
                        )
                    )
                }
            }
            .alert(String(localized: "Delete Note?", comment: "Delete confirm title"), isPresented: $vm.showDeleteConfirm) {
                Button(String(localized: "Cancel", comment: "Cancel delete"), role: .cancel) {}
                Button(String(localized: "Delete", comment: "Confirm delete"), role: .destructive) {
                    Task {
                        if await vm.deleteNote() { dismiss() }
                    }
                }
            } message: {
                Text(
                    String(
                        localized: "This will delete “\(uiTitle(for: note))” and all its sub-notes. This cannot be undone easily.",
                        comment: "Delete confirmation; note title"
                    )
                )
            }
            .confirmationDialog(String(localized: "Unsaved Draft", comment: "Draft dialog title"), isPresented: $vm.showDiscardDraft) {
                Button(String(localized: "Restore Draft", comment: "Draft dialog")) { vm.restoreDraft() }
                Button(String(localized: "Discard Draft", comment: "Draft dialog"), role: .destructive) { vm.discardDraft() }
                Button(String(localized: "Cancel", comment: "Draft dialog"), role: .cancel) {}
            } message: {
                Text(String(localized: "You have an unsaved draft for this note. Would you like to restore it?", comment: "Draft dialog message"))
            }
        }
    }

    @ViewBuilder
    private func protectedNoteOverlay(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        VStack(spacing: 20) {
            Spacer()

            Image(systemName: "lock.shield")
                .font(.system(size: 56))
                .foregroundStyle(.secondary)

            Text(String(localized: "Protected Note", comment: "Protected note gate title"))
                .font(.title2.bold())

            Text(String(localized: "Enter the same document password you use in Trilium for protected notes. It stays active until you sign out or the server ends the session.", comment: "Protected note gate"))
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 28)

            SecureField(String(localized: "Document password", comment: "Protected note placeholder"), text: $protectedDocumentPassword)
                .textContentType(.password)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .padding(.horizontal, 32)

            if let err = vm.protectedUnlockError {
                Text(err)
                    .font(.caption)
                    .foregroundStyle(.red)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 24)
            }

            Button {
                let pwd = protectedDocumentPassword
                Task { await vm.unlockProtectedNote(documentPassword: pwd) }
            } label: {
                Group {
                    if vm.isUnlockingProtected {
                        ProgressView()
                            .tint(.white)
                    } else {
                        Text(String(localized: "Unlock", comment: "Protected note button"))
                            .frame(maxWidth: .infinity)
                    }
                }
                .padding(.vertical, 10)
                .frame(maxWidth: 280)
            }
            .buttonStyle(.borderedProminent)
            .disabled(vm.isUnlockingProtected)

            Spacer()
        }
        .frame(maxWidth: .infinity)
    }

    @ViewBuilder
    private func editorStatusBanner(_ vm: NoteDetailViewModel) -> some View {
        if let msg = vm.transientEditorMessage {
            HStack(spacing: 8) {
                Image(systemName: "icloud.and.arrow.up")
                    .font(.caption)
                Text(msg)
                    .font(.caption.weight(.medium))
                    .multilineTextAlignment(.leading)
                Spacer(minLength: 0)
            }
            .foregroundStyle(.secondary)
            .padding(.horizontal)
            .padding(.vertical, 8)
            .background(.ultraThinMaterial)
        }
    }

    @ViewBuilder
    private func draftBanner(_ vm: NoteDetailViewModel) -> some View {
        if vm.hasDraft && !vm.isEditing {
            HStack(spacing: 8) {
                Image(systemName: "doc.badge.clock")
                    .font(.caption)
                Text(String(localized: "Unsaved draft available", comment: "Draft banner"))
                    .font(.caption.weight(.medium))
                Spacer()
                Button(String(localized: "Restore", comment: "Draft banner")) { vm.restoreDraft() }
                    .font(.caption)
                    .buttonStyle(.bordered)
                    .controlSize(.mini)
                Button(String(localized: "Discard", comment: "Draft banner")) { vm.discardDraft() }
                    .font(.caption)
                    .buttonStyle(.bordered)
                    .controlSize(.mini)
                    .tint(.red)
            }
            .foregroundStyle(.blue)
            .padding(.horizontal)
            .padding(.vertical, 8)
            .background(.blue.opacity(0.08))
        }
    }

    @ViewBuilder
    private func breadcrumbsBar(_ vm: NoteDetailViewModel) -> some View {
        // Drop synthetic "Root" — it’s on every note. Hide entirely for top-level notes (only self left).
        let crumbs = vm.breadcrumbs.filter { $0.noteId != "root" }
        if crumbs.count > 1 {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 4) {
                    ForEach(crumbs) { crumb in
                        if crumb.noteId != vm.noteId {
                            Text(crumb.title)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                            Image(systemName: "chevron.right")
                                .font(.caption2)
                                .foregroundStyle(.quaternary)
                        } else {
                            Text(crumb.title)
                                .font(.caption.weight(.medium))
                                .foregroundStyle(.primary)
                        }
                    }
                }
                .padding(.horizontal)
                .padding(.vertical, 6)
            }
            .background(.bar)
        }
    }

    @ViewBuilder
    private func titleSection(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        @Bindable var vm = vm
        VStack(alignment: .leading, spacing: 4) {
            /// Keeps the path aligned with the title text (same inset as the note icon column).
            let titleIconColumnWidth: CGFloat = 24
            let titleIconSpacing: CGFloat = 8

            if vm.editingTitle {
                HStack(alignment: .top, spacing: titleIconSpacing) {
                    Color.clear
                        .frame(width: titleIconColumnWidth)
                        .accessibilityHidden(true)
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            TextField(String(localized: "Title", comment: "Note title field"), text: $vm.editedTitle)
                                .font(.title2.bold())
                                .textFieldStyle(.roundedBorder)
                            Button(String(localized: "Save", comment: "Save title")) {
                                Task { await vm.renameNote() }
                            }
                            .buttonStyle(.borderedProminent)
                            .controlSize(.small)
                            .disabled(vm.isSaving)
                            Button(String(localized: "Cancel", comment: "Cancel title edit")) { vm.editingTitle = false }
                                .buttonStyle(.bordered)
                                .controlSize(.small)
                        }
                        if let modified = lastChangedCaption(for: note) {
                            Text(modified)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .accessibilityLabel(String(localized: "Last changed \(modified)", comment: "Accessibility"))
                        }
                    }
                }
            } else {
                HStack(alignment: .top, spacing: 0) {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack(alignment: .firstTextBaseline, spacing: titleIconSpacing) {
                            Image(systemName: note.resolvedIconName)
                                .font(.title2)
                                .foregroundStyle(.secondary)
                                .frame(width: titleIconColumnWidth, alignment: .center)
                                .accessibilityHidden(true)
                            Text(uiTitle(for: note))
                                .font(.title2.bold())
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        if let modified = lastChangedCaption(for: note) {
                            Text(modified)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.leading, titleIconColumnWidth + titleIconSpacing)
                                .accessibilityLabel(String(localized: "Last changed \(modified)", comment: "Accessibility"))
                        }
                    }
                    Spacer(minLength: 0)
                }
                .onTapGesture {
                    vm.editedTitle = note.title
                    vm.editingTitle = true
                }
                .accessibilityLabel(String(localized: "Note title: \(uiTitle(for: note)). Tap to edit.", comment: "VoiceOver note title"))
            }

            HStack(spacing: 12) {
                // Label(note.type.displayName, systemImage: note.type.iconName)
                //     .font(.caption)
                //     .foregroundStyle(.secondary)

                if note.isSharedWithMultipleTreePlacements {
                    Label(String(localized: "Sharing", comment: "Note badge"), systemImage: "scale.3d")
                        .font(.caption)
                        .foregroundStyle(Color.green)
                    Label(String(localized: "Cloned (\(note.parentNoteIds.count) parents)", comment: "Note badge clone count"), systemImage: "arrow.triangle.branch")
                        .font(.caption)
                        .foregroundStyle(.orange)
                } else if note.showsSharingBadge {
                    Label(String(localized: "Sharing", comment: "Note badge"), systemImage: "scale.3d")
                        .font(.caption)
                        .foregroundStyle(Color.green)
                } else if note.showsMultiCloneBadge {
                    Label(String(localized: "Cloned (\(note.parentNoteIds.count) parents)", comment: "Note badge clone count"), systemImage: "arrow.triangle.branch")
                        .font(.caption)
                        .foregroundStyle(.orange)
                }

                if note.isProtected {
                    Label(String(localized: "Protected", comment: "Note badge"), systemImage: "lock.fill")
                        .font(.caption)
                        .foregroundStyle(.yellow)
                }
            }
            .padding(.leading, titleIconColumnWidth + titleIconSpacing)
        }
        .padding()
    }

    @ViewBuilder
    private func noteBody(_ vm: NoteDetailViewModel, note: NoteItem, findControl: FindOnPageControl) -> some View {
        if vm.isLoadingContent {
            ProgressView(String(localized: "Loading content…", comment: "Note body loading"))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
        } else if vm.isEditing && note.type != .text {
            codeEditingView(vm)
        } else {
            readingView(vm, note: note, findControl: findControl)
        }
    }

    @ViewBuilder
    private func readingView(_ vm: NoteDetailViewModel, note: NoteItem, findControl: FindOnPageControl) -> some View {
        switch note.type {
        case .text:
            if let html = vm.contentString {
                HTMLNoteView(
                    html: html,
                    baseURL: vm.serverBaseURL,
                    onNoteLinkTapped: { linkedNoteId in
                        navigateToNoteId = linkedNoteId
                    },
                    onCheckboxToggled: { index, checked in
                        vm.toggleCheckbox(index: index, checked: checked)
                    },
                    findControl: findControl
                )
            }
        case .mermaid:
            if let source = vm.contentString {
                MermaidNoteView(source: source)
            }
        case .code:
            if let code = vm.contentString {
                CodeNoteView(content: code, mime: note.mime, findControl: findControl)
            }
        case .image:
            if let data = vm.content {
                ImageNoteView(data: data, title: uiTitle(for: note))
            }
        case .file:
            FileNoteView(note: note, attachments: vm.attachments, viewModel: vm)
        case .canvas:
            CanvasNoteView(noteId: note.noteId, attachments: vm.attachments, client: vm.client, excalidrawJSON: vm.contentString)
        case .mindMap:
            if let json = vm.contentString {
                MindMapNoteView(json: json)
            }
        case .geoMap:
            GeoMapNoteView(viewportJSON: effectiveGeoMapViewportJSONForDisplay(vm.contentString), markers: geoMapPins) { navigateToNoteId = $0 }
        case .book:
            if isGeoMapNote(note, contentString: vm.contentString, vm: vm) {
                GeoMapNoteView(viewportJSON: effectiveGeoMapViewportJSONForDisplay(vm.contentString), markers: geoMapPins) { navigateToNoteId = $0 }
            } else {
                BookNoteView(note: note)
            }
        default:
            UnsupportedNoteView(note: note, serverURL: appState.activeProfile?.normalizedBaseURL)
        }
    }

    @ViewBuilder
    private func childNotesSection(_ vm: NoteDetailViewModel) -> some View {
        if !vm.childNotes.isEmpty {
            VStack(alignment: .leading, spacing: 0) {
                Divider()
                Text(String(localized: "Sub-notes", comment: "Child notes section header"))
                    .font(.caption.weight(.medium))
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)
                    .padding(.top, 12)
                    .padding(.bottom, 4)

                ForEach(vm.childNotes) { child in
                    Button {
                        navigateToNoteId = child.noteId
                    } label: {
                        HStack(spacing: 10) {
                            Image(systemName: child.resolvedIconName)
                                .font(.body)
                                .foregroundStyle(.secondary)
                                .frame(width: 22)
                            Text(NoteItem.maskedStoredTitle(child.title, isProtected: child.isProtected, protectedSessionActive: appState.protectedSessionActive))
                                .font(.body)
                                .lineLimit(2)
                                .multilineTextAlignment(.leading)
                            Spacer()
                            if child.childCount > 0 {
                                Text("\(child.childCount)")
                                    .font(.caption2)
                                    .foregroundStyle(.tertiary)
                            }
                            Image(systemName: "chevron.right")
                                .font(.caption2)
                                .foregroundStyle(.tertiary)
                        }
                        .padding(.horizontal)
                        .padding(.vertical, 10)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)

                    if child.id != vm.childNotes.last?.id {
                        Divider().padding(.leading, 48)
                    }
                }
            }
            .padding(.bottom, 8)
        } else if vm.isLoadingChildren {
            HStack {
                Spacer()
                ProgressView()
                    .controlSize(.small)
                Spacer()
            }
            .padding()
        }
    }

    @ViewBuilder
    private func richTextEditingView(_ vm: NoteDetailViewModel) -> some View {
        // `editorDisplayContent` is the decorated copy of `editableContent` (canvas/mermaid/imageLink → inlined data
        // URIs), populated asynchronously by `prepareEditorDisplayContent`. While that's in flight we show a brief
        // spinner so the editor never mounts with broken `<img src="api/images/…">` references — the previous behavior
        // was to render the editor immediately, which left linked canvas/mermaid notes as broken-image placeholders.
        if let displayHTML = vm.editorDisplayContent {
            richTextEditingViewBody(vm, displayHTML: displayHTML)
        } else {
            ZStack {
                Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal])
                ProgressView()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
            .task {
                // Defensive: `startEditing` already kicks this off; this `.task` only ever fires if the view appeared
                // before the model could schedule the prep (e.g. state restoration paths).
                await vm.prepareEditorDisplayContent()
            }
        }
    }

    @ViewBuilder
    private func richTextEditingViewBody(_ vm: NoteDetailViewModel, displayHTML: String) -> some View {
        ZStack(alignment: .bottomTrailing) {
            RichTextEditorView(
                initialHTML: displayHTML,
                onContentChanged: { html in vm.receiveEditorUpdate(html) },
                onPickImage: { showEditorImageSourceDialog = true },
                onEditorScroll: { y, verticallyScrollable in
                    updateEditorSaveCancelChipVisibility(contentOffsetY: y, verticallyScrollable: verticallyScrollable)
                },
                onTypingActivity: {
                    handleEditorSaveChipTypingActivity()
                },
                onTableToolsVisibilityChanged: { visible in
                    editorTableToolsVisible = visible
                    if visible {
                        cancelEditorSaveChipIdleShowTask()
                    } else {
                        withAnimation(.spring(response: 0.30, dampingFraction: 0.78)) {
                            showEditorSaveCancelChip = true
                        }
                    }
                },
                onRequestSave: { html, scrollFraction in
                    queueReadOnlyScrollRestoreAfterRichTextSave(fraction: scrollFraction)
                    if let html {
                        vm.saveContent(freshHTML: html)
                    } else {
                        vm.saveContent()
                    }
                },
                onEditorBridgeRequest: { req in
                    switch req {
                    case .pickIncludeNote:
                        showIncludeNotePicker = true
                    case .resolveNoteTitle(let nid):
                        Task { @MainActor in
                            let t = await vm.resolveDisplayTitle(forReferencedNoteId: nid)
                            Self.pushIncludeNoteTitleToEditor(webView: editorWebView, noteId: nid, title: t)
                        }
                    case .openNote(let nid):
                        navigateToNoteId = nid
                    case .includePreview(let previewId, let nid, let box):
                        Task { @MainActor in
                            let html = await vm.resolvedIncludePreviewHTML(noteId: nid, boxSize: box)
                            Self.pushIncludeNotePreviewToEditor(webView: editorWebView, previewId: previewId, html: html)
                        }
                    }
                },
                imageToInsert: $imageToInsert,
                webViewBinding: $editorWebView,
                initialScrollFraction: readOnlyScrollFraction
            )
            // Fill remaining height so the WKWebView isn’t vertically compressed in a way that clips
            // the HTML toolbar when the keyboard steals space (minHeight: 400 overflowed the layout).
            .frame(maxWidth: .infinity, minHeight: 200, maxHeight: .infinity)

            if showEditorSaveCancelChip && !editorTableToolsVisible {
                editorSaveChip(vm: vm)
                    .padding(.trailing, 16)
                    .padding(.bottom, 62)
                    .transition(.scale(scale: 0.88).combined(with: .opacity))
                    .zIndex(2)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .background(Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal]))
        .animation(.easeInOut(duration: 0.15), value: editorTableToolsVisible)
        .onAppear {
            editorSaveCancelScrollBaselineReady = false
            lastEditorScrollOffsetY = 0
            cancelEditorSaveChipIdleShowTask()
            editorSaveChipIgnoreTypingUntil = Date().addingTimeInterval(Self.editorSaveChipIgnoreTypingAfterAppear)
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showEditorSaveCancelChip = true
            }
        }
        .onDisappear {
            cancelEditorSaveChipIdleShowTask()
        }
        .confirmationDialog(String(localized: "Add Image", comment: "Editor image dialog title"), isPresented: $showEditorImageSourceDialog) {
            Button(String(localized: "Photo Library", comment: "Image source")) { showEditorImagePicker = true }
            if UIImagePickerController.isSourceTypeAvailable(.camera) {
                Button(String(localized: "Camera", comment: "Image source")) { showEditorCamera = true }
            }
            Button(String(localized: "Cancel", comment: "Image dialog"), role: .cancel) {}
        } message: {
            Text(String(localized: "Choose a source for the image", comment: "Editor image dialog"))
        }
        .photosPicker(isPresented: $showEditorImagePicker, selection: $editorImageItem, matching: .images)
        .onChange(of: editorImageItem) { _, item in
            guard let item else { return }
            Task { await handleEditorImagePick(item) }
        }
        .fullScreenCover(isPresented: $showEditorCamera) {
            CameraPickerView(imageToInsert: $imageToInsert) { showEditorCamera = false }
        }
        .sheet(isPresented: $showIncludeNotePicker) {
            NotePickerSheet(excludeNoteId: activeNoteId) { pickedId, pickedTitle in
                Self.insertIncludeNoteInEditor(webView: editorWebView, noteId: pickedId, title: pickedTitle, boxSize: "medium")
            }
            .environment(appState)
        }
    }

    // MARK: - Mermaid editing

    @ViewBuilder
    private func mermaidEditingView(_ vm: NoteDetailViewModel) -> some View {
        @Bindable var vm = vm
        VStack(spacing: 0) {
            editorStatusBanner(vm)
            MermaidEditorView(
                editableContent: $vm.editableContent,
                onSave: { vm.saveContent() },
                isSaving: vm.isSaving
            )
        }
    }

    // MARK: - Canvas editing

    @ViewBuilder
    private func canvasEditingView(_ vm: NoteDetailViewModel) -> some View {
        ZStack(alignment: .bottomTrailing) {
            CanvasEditorView(
                initialJSON: vm.editableContent,
                bridge: canvasEditorBridge,
                onSceneChanged: { canvasHasUnsavedChanges = true }
            )
            .onAppear {
                canvasHasUnsavedChanges = false
            }

            canvasSaveChip(vm: vm)
                .padding(.trailing, 16)
                .padding(.bottom, 72)
                .transition(.scale(scale: 0.88).combined(with: .opacity))
                .zIndex(2)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(uiColor: .trinoteCanvasBackground).ignoresSafeArea(edges: [.bottom, .horizontal]))
    }

    @ViewBuilder
    private func canvasSaveChip(vm: NoteDetailViewModel) -> some View {
        Button {
            saveCanvasContent(vm: vm)
        } label: {
            ZStack {
                if vm.isSaving {
                    ProgressView()
                        .controlSize(.small)
                } else {
                    Image("SaveNoteFloating")
                        .resizable()
                        .renderingMode(.template)
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 24, height: 24)
                }
            }
            .foregroundStyle(.primary)
            .frame(width: 48, height: 48)
            .background(.ultraThinMaterial, in: Circle())
            .shadow(color: .black.opacity(0.12), radius: 5, y: 2)
        }
        .buttonStyle(.plain)
        .disabled(vm.isSaving)
        .accessibilityLabel(String(localized: "Save", comment: "Canvas save chip"))
    }

    private func saveCanvasContent(vm: NoteDetailViewModel) {
        canvasEditorBridge.getSceneData { json, svg in
            DispatchQueue.main.async {
                vm.saveCanvasContent(json: json, svg: svg)
                canvasHasUnsavedChanges = false
            }
        }
    }

    // MARK: - Mind Map read-only

    @ViewBuilder
    private func mindMapReadOnlyView(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        ZStack(alignment: .bottomTrailing) {
            VStack(spacing: 0) {
                editorStatusBanner(vm)
                draftBanner(vm)
                breadcrumbsBar(vm)
                titleSection(vm, note: note)
                Divider()

                if let json = vm.contentString {
                    MindMapNoteView(json: json)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    Spacer()
                }
            }

            if showFloatingEditButton {
                floatingEditFAB(vm: vm)
                    .padding(.trailing, 16)
                    .padding(.bottom, 12)
                    .transition(.scale(scale: 0.88).combined(with: .opacity))
                    .zIndex(2)
            }
        }
        .onAppear {
            let eligible = note.type.isEditable && !vm.needsProtectedSession && !vm.isEditing
            if eligible {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = true
                }
            }
        }
        .onChange(of: vm.isEditing) { _, editing in
            if editing {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = false
                }
            } else if note.type.isEditable && !vm.needsProtectedSession {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = true
                }
            }
        }
    }

    // MARK: - Mind Map editing

    @ViewBuilder
    private func mindMapEditingView(_ vm: NoteDetailViewModel) -> some View {
        ZStack(alignment: .bottomTrailing) {
            MindMapEditorView(
                initialJSON: vm.editableContent,
                bridge: mindMapEditorBridge,
                onMapChanged: { mindMapHasUnsavedChanges = true }
            )
            .onAppear {
                mindMapHasUnsavedChanges = false
            }

            mindMapSaveChip(vm: vm)
                .padding(.trailing, 16)
                .padding(.bottom, 72)
                .transition(.scale(scale: 0.88).combined(with: .opacity))
                .zIndex(2)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    @ViewBuilder
    private func mindMapSaveChip(vm: NoteDetailViewModel) -> some View {
        Button {
            saveMindMapContent(vm: vm)
        } label: {
            ZStack {
                if vm.isSaving {
                    ProgressView()
                        .controlSize(.small)
                } else {
                    Image("SaveNoteFloating")
                        .resizable()
                        .renderingMode(.template)
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 24, height: 24)
                }
            }
            .foregroundStyle(.primary)
            .frame(width: 48, height: 48)
            .background(.ultraThinMaterial, in: Circle())
            .shadow(color: .black.opacity(0.12), radius: 5, y: 2)
        }
        .buttonStyle(.plain)
        .disabled(vm.isSaving)
        .accessibilityLabel(String(localized: "Save", comment: "Mind map save chip"))
    }

    private func saveMindMapContent(vm: NoteDetailViewModel) {
        mindMapEditorBridge.getMapData { json in
            DispatchQueue.main.async {
                vm.editableContent = json
                vm.saveContent()
                mindMapHasUnsavedChanges = false
            }
        }
    }

    // MARK: - Calendar (own layout to avoid nested ScrollViews)

    @ViewBuilder
    private func calendarDetailView(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        VStack(spacing: 0) {
            editorStatusBanner(vm)
            draftBanner(vm)
            breadcrumbsBar(vm)
            titleSection(vm, note: note)
            Divider()
            CalendarNoteView(calendarRootNote: note)
        }
    }

    // MARK: - Geo Map (map + scrollable sub-notes; long-press map to add pins)

    /// Fixed band height for the map editor. A `GeometryReader` wrapping the whole column (including a flexible `ScrollView`) often collapses the WKWebView in navigation, so Leaflet sees 0×0 and shows nothing.
    private static func geoMapEditorBandHeight() -> CGFloat {
        let screenH = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .map { $0.screen.bounds.height }
            .max() ?? 736
        return min(460, max(280, screenH * 0.38))
    }

    @ViewBuilder
    private func geoMapDetailView(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        VStack(spacing: 0) {
            editorStatusBanner(vm)
            draftBanner(vm)
            breadcrumbsBar(vm)
            titleSection(vm, note: note)
            Divider()

            GeoMapEditorView(
                viewportJSON: effectiveGeoMapViewportJSONForDisplay(vm.contentString),
                markers: geoMapPins,
                bridge: geoMapEditorBridge,
                onCreatePin: { lat, lng in
                    handleGeoMapCreatePin(vm: vm, note: note, lat: lat, lng: lng)
                },
                onMovePin: { noteId, lat, lng in
                    handleGeoMapMovePin(vm: vm, noteId: noteId, lat: lat, lng: lng)
                },
                onRemovePin: { noteId in
                    handleGeoMapRemovePin(vm: vm, noteId: noteId)
                },
                onViewportChanged: { json in
                    let canon = Self.canonicalGeoMapViewportJSONForTriliumDesktop(json)
                    let trimmed = (vm.contentString ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
                    guard canon != trimmed else { return }
                    vm.editableContent = canon
                    vm.saveContent()
                },
                onOpenPinNote: { pinNoteId in
                    navigateToNoteId = pinNoteId
                }
            )
            .frame(height: Self.geoMapEditorBandHeight())
            .frame(maxWidth: .infinity)
            .clipped()

            geoMapSubnotesScrollArea(vm: vm, mapParentNote: note)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .onAppear {
            if !vm.hasDraft {
                vm.editableContent = vm.contentString ?? ""
            }
            loadGeoMapPins(vm: vm, note: note)
        }
        .onChange(of: note.noteId) { _, _ in
            geoMapPins = []
            if !vm.hasDraft {
                vm.editableContent = vm.contentString ?? ""
            }
            loadGeoMapPins(vm: vm, note: note)
        }
    }

    @ViewBuilder
    private func geoMapSubnotesScrollArea(vm: NoteDetailViewModel, mapParentNote: NoteItem) -> some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                Color.clear.frame(height: 16)
                if vm.childNotes.isEmpty && !vm.isLoadingChildren {
                    Text(
                        String(
                            localized: "Sub-notes appear here. Long-press the map to add a location.",
                            comment: "Geo map: empty sub-note list hint below map"
                        )
                    )
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: .infinity)
                    .padding(.horizontal, 20)
                    .padding(.bottom, 12)
                }
                childNotesSection(vm)
                Color.clear.frame(minHeight: 80)
            }
            .frame(maxWidth: .infinity)
        }
        .refreshable {
            await vm.refresh()
            loadGeoMapPins(vm: vm, note: mapParentNote)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private func loadGeoMapPins(vm: NoteDetailViewModel, note: NoteItem) {
        Task {
            let pins: [GeoMapPin]
            if vm.client != nil, vm.isOnline {
                pins = await vm.fetchGeoMapPinsFromServer(note: note)
            } else {
                pins = vm.geoMapPinsFromCache()
            }
            geoMapPins = pins
        }
    }

    private func handleGeoMapCreatePin(vm: NoteDetailViewModel, note: NoteItem, lat: Double, lng: Double) {
        Task {
            guard let profileId = vm.serverProfileId else { return }
            let title = String(localized: "New Location", comment: "Default title for new geo map pin")
            do {
                let (newNoteId, _) = try PersistenceManager.shared.createOfflineChildNote(
                    parentNoteId: note.noteId,
                    title: title,
                    noteType: "text",
                    mime: "text/html",
                    initialContent: "",
                    serverProfileId: profileId,
                    initialAttributes: [
                        NoteCreationAttribute(type: "label", name: "geolocation", value: "\(lat),\(lng)"),
                        NoteCreationAttribute(type: "label", name: "iconClass", value: "bx bx-map-pin")
                    ]
                )

                let pin = GeoMapPin(noteId: newNoteId, title: title, lat: lat, lng: lng)
                geoMapPins.append(pin)
                geoMapEditorBridge.addPin(noteId: newNoteId, title: title, lat: lat, lng: lng)
                await vm.loadChildNotes()
                appState.backgroundSyncPendingChanges()
            } catch {
                Log.geoMap.error("Failed to create geo map pin: \(error.localizedDescription)")
            }
        }
    }

    private func handleGeoMapMovePin(vm: NoteDetailViewModel, noteId: String, lat: Double, lng: Double) {
        Task {
            guard let client = vm.client else { return }
            do {
                let noteResp = try await client.getNote(noteId)
                let noteItem = NoteItem(from: noteResp)
                if let existingAttr = noteItem.attributes.first(where: { $0.type == .label && $0.name == "geolocation" }) {
                    try await client.deleteAttribute(noteId: noteId, attributeId: existingAttr.attributeId)
                }
                try await client.createAttribute(CreateAttributeRequest(
                    noteId: noteId, type: "label", name: "geolocation",
                    value: "\(lat),\(lng)", isInheritable: nil, position: nil
                ))
                if let idx = geoMapPins.firstIndex(where: { $0.noteId == noteId }) {
                    geoMapPins[idx] = GeoMapPin(noteId: noteId, title: geoMapPins[idx].title, lat: lat, lng: lng)
                }
                if let n = vm.note {
                    loadGeoMapPins(vm: vm, note: n)
                }
            } catch {
                Log.geoMap.error("Failed to move geo map pin: \(error.localizedDescription)")
            }
        }
    }

    private func handleGeoMapRemovePin(vm: NoteDetailViewModel, noteId: String) {
        Task {
            let ok = await vm.deleteChildNote(noteId: noteId)
            guard ok else { return }
            if vm.client != nil, vm.isOnline {
                await vm.refreshDirectChildrenMetadataFromServer()
            } else {
                await vm.loadChildNotes()
            }
            if let n = vm.note {
                loadGeoMapPins(vm: vm, note: n)
            }
        }
    }

    /// Rewrites geo map blob to Trilium desktop’s shape: `{ "view": { "center": { "lat", "lng" }, "zoom" } }`.
    /// Fixes legacy top-level `{ center, zoom }`, and bad longitude keys (`Ing` vs `lng`) so Leaflet on desktop can parse.
    private static func canonicalGeoMapViewportJSONForTriliumDesktop(_ raw: String) -> String {
        guard let data = raw.data(using: .utf8),
              var root = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            return raw
        }
        var view = root["view"] as? [String: Any]
        if view == nil, root["center"] != nil, root["zoom"] != nil {
            view = ["center": root["center"] as Any, "zoom": root["zoom"] as Any]
        }
        guard var viewDict = view, let zoom = viewDict["zoom"] else { return raw }

        let centerAny = viewDict["center"]
        var latVal: Double?
        var lngVal: Double?

        if let arr = centerAny as? [Any], arr.count >= 2 {
            latVal = doubleFromJSONNumber(arr[0])
            lngVal = doubleFromJSONNumber(arr[1])
        } else if let dict = centerAny as? [String: Any] {
            latVal = doubleFromJSONNumber(dict["lat"])
            lngVal = doubleFromJSONNumber(dict["lng"])
                ?? doubleFromJSONNumber(dict["Ing"])
                ?? doubleFromJSONNumber(dict["long"])
                ?? doubleFromJSONNumber(dict["lon"])
        }

        guard let lat = latVal, let lng = lngVal else { return raw }

        let canonical: [String: Any] = [
            "view": [
                "center": ["lat": lat, "lng": lng],
                "zoom": zoom
            ]
        ]
        guard let out = try? JSONSerialization.data(withJSONObject: canonical, options: [.sortedKeys]),
              let s = String(data: out, encoding: .utf8) else { return raw }
        return s
    }

    private static func doubleFromJSONNumber(_ any: Any?) -> Double? {
        if let n = any as? NSNumber { return n.doubleValue }
        if let d = any as? Double { return d }
        if let i = any as? Int { return Double(i) }
        if let s = any as? String { return Double(s) }
        return nil
    }

    /// JSON body shape Trilium uses for geo map viewport (`view.center` + `view.zoom`).
    /// Also accepts legacy Trinote saves that omitted the `view` wrapper.
    private func geoMapViewportJSONMatches(_ contentString: String?) -> Bool {
        guard let content = contentString, !content.isEmpty,
              let data = content.data(using: .utf8),
              let obj = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            return false
        }
        func hasZoom(_ any: Any?) -> Bool { any is NSNumber }
        if let view = obj["view"] as? [String: Any], view["center"] != nil, hasZoom(view["zoom"]) {
            return true
        }
        if obj["center"] != nil, hasZoom(obj["zoom"]) { return true }
        return false
    }

    /// Detects geo map notes: semantic geo (`geoMap` or `book` + `#viewType=geoMap`), viewport JSON in the body, or `book` with a child that has `#geolocation` in cache.
    /// Calendar roots are excluded even if children have geolocation labels.
    private func isGeoMapNote(_ note: NoteItem?, contentString: String?, vm: NoteDetailViewModel?) -> Bool {
        guard let note else { return false }
        if note.isCalendarRoot { return false }
        if note.isSemanticGeoMap { return true }
        if geoMapViewportJSONMatches(contentString) { return true }
        if note.type == .book, let vm, vm.cachedAnyChildHasGeolocationLabel() { return true }
        return false
    }

    /// Valid Trilium-shaped viewport JSON for map WebViews; defaults when body is empty or not yet loaded.
    private func effectiveGeoMapViewportJSONForDisplay(_ contentString: String?) -> String {
        let trimmed = (contentString ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, geoMapViewportJSONMatches(contentString) else {
            return NoteType.emptyGeoMapJSON
        }
        return Self.canonicalGeoMapViewportJSONForTriliumDesktop(trimmed)
    }

    private func handleEditorImagePick(_ item: PhotosPickerItem) async {
        defer { editorImageItem = nil }
        guard let data = try? await item.loadTransferable(type: Data.self) else { return }

        let mime = item.supportedContentTypes.first?.preferredMIMEType ?? "image/jpeg"

        // Compress to JPEG if it's not already a small image
        let imageData: Data
        let imageMime: String
        if let uiImage = UIImage(data: data) {
            imageData = uiImage.jpegData(compressionQuality: 0.8) ?? data
            imageMime = "image/jpeg"
        } else {
            imageData = data
            imageMime = mime
        }

        let base64 = imageData.base64EncodedString()
        imageToInsert = "data:\(imageMime);base64,\(base64)"
    }

    @ViewBuilder
    private func codeEditingView(_ vm: NoteDetailViewModel) -> some View {
        @Bindable var vm = vm
        VStack(spacing: 0) {
            editorStatusBanner(vm)
            ZStack(alignment: .bottomTrailing) {
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text(String(localized: "Source", comment: "Code editor label"))
                        .font(.caption.weight(.medium))
                        .foregroundStyle(.secondary)
                    Spacer()
                }
                .padding(.horizontal)
                .padding(.top, 8)

                TextEditor(text: $vm.editableContent)
                    .font(.system(.body, design: .monospaced))
                    .frame(minHeight: 300)
                    .padding(.horizontal, 8)
                    .scrollContentBackground(.hidden)
                    .background(Color(.systemGroupedBackground))
                    .background(
                        NoteDetailScrollOffsetReader { y, verticallyScrollable, _ in
                            updateEditorSaveCancelChipVisibility(contentOffsetY: y, verticallyScrollable: verticallyScrollable)
                        }
                        .frame(width: 0, height: 0)
                    )
            }

            if showEditorSaveCancelChip {
                editorSaveChip(vm: vm)
                    .padding(.trailing, 16)
                    .padding(.bottom, 12)
                    .transition(.scale(scale: 0.88).combined(with: .opacity))
                    .zIndex(2)
            }
            }
        }
        .onAppear {
            editorSaveCancelScrollBaselineReady = false
            lastEditorScrollOffsetY = 0
            cancelEditorSaveChipIdleShowTask()
            editorSaveChipIgnoreTypingUntil = Date().addingTimeInterval(Self.editorSaveChipIgnoreTypingAfterAppear)
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showEditorSaveCancelChip = true
            }
        }
        .onDisappear {
            cancelEditorSaveChipIdleShowTask()
        }
        .onChange(of: vm.editableContent) { _, _ in
            handleEditorSaveChipTypingActivity()
        }
    }

    @ViewBuilder
    private func attachmentsSection(_ vm: NoteDetailViewModel) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Divider()
            HStack {
                Text(String(localized: "Attachments", comment: "Note detail section"))
                    .font(.headline)
                Spacer()
                AttachmentUploadButton(noteId: vm.noteId, viewModel: vm)
            }
            .padding(.horizontal)
            .padding(.top, 8)

            if vm.attachments.isEmpty {
                Text(String(localized: "No attachments", comment: "Attachments empty"))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)
            } else {
                ForEach(vm.attachments) { attachment in
                    AttachmentRow(attachment: attachment, viewModel: vm)
                }
            }
        }
    }

    private func metadataSection(_ note: NoteItem) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Divider()
            Group {
                LabeledContent(String(localized: "Note ID", comment: "Metadata field"), value: note.noteId)
                LabeledContent(String(localized: "Type", comment: "Metadata field"), value: note.uiNoteTypeDisplayName)
                LabeledContent(String(localized: "MIME", comment: "Metadata field"), value: note.mime)
                if !note.dateCreated.isEmpty {
                    LabeledContent(String(localized: "Created", comment: "Metadata field"), value: note.dateCreated)
                }
                if !note.dateModified.isEmpty {
                    LabeledContent(String(localized: "Modified", comment: "Metadata field"), value: note.dateModified)
                }
            }
            .font(.caption)

            if !note.attributes.isEmpty {
                Text(String(localized: "Attributes", comment: "Metadata section"))
                    .font(.caption.weight(.medium))
                    .padding(.top, 4)
                ForEach(note.attributes) { attr in
                    HStack {
                        Image(systemName: attr.type == .label ? "tag" : "arrow.right")
                            .font(.caption2)
                        Text(attr.name)
                            .font(.caption.weight(.medium))
                        Text(attr.value)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
        }
        .padding()
    }

    @ToolbarContentBuilder
    private func noteToolbar(_ vm: NoteDetailViewModel, note: NoteItem) -> some ToolbarContent {
        ToolbarItemGroup(placement: .topBarTrailing) {
            // First in group sits at the outer trailing edge (last-used quick action); ⋯ is to its left.
            if let quick = firstAvailableToolbarQuickAction(vm: vm, note: note) {
                Button {
                    performToolbarQuickAction(quick, vm: vm, note: note)
                } label: {
                    toolbarQuickActionLabel(quick, vm: vm, note: note)
                }
                .disabled(isToolbarQuickActionDisabled(quick, vm: vm))
                .accessibilityLabel(toolbarQuickActionAccessibilityLabel(quick, vm: vm, note: note))
            }

            Menu {
                if note.type.isEditable {
                    Button {
                        if vm.isEditing {
                            if note.type == .canvas {
                                saveCanvasContent(vm: vm)
                            } else {
                                saveRichTextContent(vm: vm)
                            }
                        } else {
                            vm.startEditing()
                        }
                    } label: {
                        if vm.isEditing {
                            Label(
                                String(localized: "Save", comment: "Save note from editor overflow menu"),
                                systemImage: "checkmark.circle"
                            )
                        } else {
                            Label {
                                Text(String(localized: "Edit Note", comment: "Open note editor"))
                            } icon: {
                                Image("EditNoteFloating")
                                    .renderingMode(.template)
                            }
                        }
                    }
                    .disabled(vm.needsProtectedSession || (vm.isEditing && vm.isSaving))
                }

                if vm.isEditing {
                    Button {
                        vm.cancelEditing()
                    } label: {
                        Label(
                            String(localized: "Cancel Editing", comment: "Leave note editor from overflow menu"),
                            systemImage: "xmark"
                        )
                    }
                } else {
                    Button {
                        recordToolbarQuickAction(.newChild)
                        vm.showCreateChild = true
                    } label: {
                        Label(String(localized: "New Child Note", comment: "Note overflow menu"), systemImage: "plus")
                    }
                }

                if !note.isProtected || appState.protectedSessionActive {
                    Button {
                        recordToolbarQuickAction(.duplicate)
                        Task {
                            if let dup = await vm.duplicateNote() {
                                navigateToNoteId = dup.noteId
                            }
                        }
                    } label: {
                        Label(String(localized: "Duplicate", comment: "Note overflow menu"), systemImage: "doc.on.doc")
                    }
                    .disabled(vm.isSaving)
                }

                if note.noteId != TriliumTreeConstants.rootNoteId, !note.isProtected || appState.protectedSessionActive {
                    Button {
                        showMoveParentPicker = true
                    } label: {
                        Label(String(localized: "Move", comment: "Note overflow: move under another parent"), systemImage: "arrow.forward.folder")
                    }
                    .disabled(vm.client == nil || vm.isSaving)
                }

                Button {
                    vm.editedTitle = note.title
                    vm.editingTitle = true
                } label: {
                    Label(String(localized: "Rename", comment: "Note overflow menu"), systemImage: "pencil")
                }

                Divider()

                Button {
                    recordToolbarQuickAction(.noteDetails)
                    withAnimation { vm.showDetails.toggle() }
                } label: {
                    Label(
                        vm.showDetails
                            ? String(localized: "Hide Details", comment: "Note overflow toggle details")
                            : String(localized: "Note Details", comment: "Note overflow toggle details"),
                        systemImage: vm.showDetails ? "info.circle.fill" : "info.circle"
                    )
                }

                Divider()

                if note.isProtected || vm.needsProtectedSession {
                    Button {
                    } label: {
                        Label(
                            String(localized: "Sharing unavailable (protected note)", comment: "Share menu disabled"),
                            systemImage: "lock.fill"
                        )
                    }
                    .disabled(true)
                } else if vm.client == nil {
                    Button {
                    } label: {
                        Label(
                            String(localized: "Sharing requires connection", comment: "Share menu offline"),
                            systemImage: "wifi.slash"
                        )
                    }
                    .disabled(true)
                } else {
                    Button {
                        Task { await vm.setNoteSharing(enabled: !vm.isSharedPublicly) }
                    } label: {
                        // `Menu` often ignores arbitrary views in `Label`’s title (e.g. `HStack` + `Image`); use a single
                        // concatenated `Text` so the checkmark is part of the rendered title string.
                        Label {
                            if vm.isSharedPublicly {
                                Text(String(localized: "Sharing ✓", comment: "Note overflow: public link when enabled"))
                                    .font(.body.weight(.semibold))
                                    .foregroundStyle(.secondary)
                            } else {
                                Text(String(localized: "Share", comment: "Note overflow: public link when disabled"))
                            }
                        } icon: {
                            Image(systemName: "scale.3d")
                        }
                    }
                    .buttonStyle(.borderless)
                    .disabled(vm.isUpdatingShare)
                    .accessibilityAddTraits(vm.isSharedPublicly ? .isSelected : [])
                    .applyMenuKeepOpenOnAction()

                    if vm.isSharedPublicly {
                        noteDetailShareLinkButtons(vm: vm)
                    }
                }

                if appState.activeProfile != nil {
                    Button {
                        recordToolbarQuickAction(.favorite)
                        toggleFavorite(note: note, isFavorite: favoriteNoteIds.contains(note.noteId))
                    } label: {
                        if favoriteNoteIds.contains(note.noteId) {
                            Label(String(localized: "Remove from Favorites", comment: "Note overflow"), systemImage: "star.slash")
                        } else {
                            Label(String(localized: "Add to Favorites", comment: "Note overflow"), systemImage: "star")
                        }
                    }
                }

                if !vm.isEditing && note.type.supportsReadOnlyOnPageFind {
                    Button {
                        recordToolbarQuickAction(.findOnPage)
                        if findControl.isPresented {
                            findControl.close()
                        } else {
                            findControl.isPresented = true
                        }
                    } label: {
                        Label(
                            findControl.isPresented
                                ? String(localized: "Hide Find Bar", comment: "Close in-page search")
                                : String(localized: "Find on Page", comment: "Open in-page search for read-only note"),
                            systemImage: "magnifyingglass"
                        )
                    }
                }

                Divider()

                Button(role: .destructive) {
                    vm.showDeleteConfirm = true
                } label: {
                    Label(String(localized: "Delete Note", comment: "Note overflow"), systemImage: "trash")
                }
            } label: {
                Image(systemName: "ellipsis.circle")
            }
            .accessibilityLabel(String(localized: "Note actions", comment: "Overflow menu"))
        }
    }

    private func recordToolbarQuickAction(_ action: NoteDetailToolbarQuickAction) {
        lastToolbarQuickActionRaw = action.rawValue
    }

    private func toolbarQuickActionCandidates(preferred: NoteDetailToolbarQuickAction) -> [NoteDetailToolbarQuickAction] {
        [preferred] + NoteDetailToolbarQuickAction.allCases.filter { $0 != preferred }
    }

    private func firstAvailableToolbarQuickAction(vm: NoteDetailViewModel, note: NoteItem) -> NoteDetailToolbarQuickAction? {
        // Legacy "edit" / "rename" raw values no longer match a case → falls back to .noteDetails.
        let preferred = NoteDetailToolbarQuickAction(rawValue: lastToolbarQuickActionRaw) ?? .noteDetails
        let candidates: [NoteDetailToolbarQuickAction]
        if vm.isEditing {
            // Same slot as “New Child” in the menu: prefer cancel while editing.
            candidates = [.cancelEditing] + toolbarQuickActionCandidates(preferred: preferred).filter { $0 != .cancelEditing }
        } else {
            candidates = toolbarQuickActionCandidates(preferred: preferred)
        }
        for action in candidates where isToolbarQuickActionAvailable(action, vm: vm, note: note) {
            return action
        }
        return nil
    }

    private func isToolbarQuickActionAvailable(_ action: NoteDetailToolbarQuickAction, vm: NoteDetailViewModel, note: NoteItem) -> Bool {
        switch action {
        case .cancelEditing: return vm.isEditing
        case .newChild: return !vm.isEditing
        case .noteDetails: return true
        case .duplicate: return !note.isProtected || appState.protectedSessionActive
        case .findOnPage: return !vm.isEditing && note.type.supportsReadOnlyOnPageFind
        case .favorite: return appState.activeProfile != nil
        }
    }

    private func isToolbarQuickActionDisabled(_ action: NoteDetailToolbarQuickAction, vm: NoteDetailViewModel) -> Bool {
        switch action {
        case .duplicate: return vm.isSaving
        default: return false
        }
    }

    private func performToolbarQuickAction(_ action: NoteDetailToolbarQuickAction, vm: NoteDetailViewModel, note: NoteItem) {
        switch action {
        case .cancelEditing:
            vm.cancelEditing()
        case .newChild:
            vm.showCreateChild = true
        case .noteDetails:
            withAnimation { vm.showDetails.toggle() }
        case .duplicate:
            Task {
                if let dup = await vm.duplicateNote() {
                    navigateToNoteId = dup.noteId
                }
            }
        case .findOnPage:
            if findControl.isPresented {
                findControl.close()
            } else {
                findControl.isPresented = true
            }
        case .favorite:
            toggleFavorite(note: note, isFavorite: favoriteNoteIds.contains(note.noteId))
        }
    }

    @ViewBuilder
    private func toolbarQuickActionLabel(_ action: NoteDetailToolbarQuickAction, vm: NoteDetailViewModel, note: NoteItem) -> some View {
        switch action {
        case .cancelEditing:
            Image(systemName: "xmark")
                .font(.system(size: 16, weight: .semibold))
        case .newChild:
            Image(systemName: "plus")
        case .noteDetails:
            Image(systemName: vm.showDetails ? "info.circle.fill" : "info.circle")
        case .duplicate:
            Image(systemName: "doc.on.doc")
        case .findOnPage:
            Image(systemName: findControl.isPresented ? "magnifyingglass.circle.fill" : "magnifyingglass")
        case .favorite:
            Image(systemName: favoriteNoteIds.contains(note.noteId) ? "star.slash" : "star")
        }
    }

    private func toolbarQuickActionAccessibilityLabel(_ action: NoteDetailToolbarQuickAction, vm: NoteDetailViewModel, note: NoteItem) -> String {
        switch action {
        case .cancelEditing:
            return String(localized: "Cancel editing", comment: "Toolbar quick action while editing note")
        case .newChild:
            return String(localized: "New child note", comment: "Toolbar repeat last action")
        case .noteDetails:
            return vm.showDetails
                ? String(localized: "Hide note details", comment: "Toolbar repeat last action")
                : String(localized: "Show note details", comment: "Toolbar repeat last action")
        case .duplicate:
            return String(localized: "Duplicate note", comment: "Toolbar repeat last action")
        case .findOnPage:
            return findControl.isPresented
                ? String(localized: "Hide find bar", comment: "Toolbar repeat last action")
                : String(localized: "Find on page", comment: "Toolbar repeat last action")
        case .favorite:
            return favoriteNoteIds.contains(note.noteId)
                ? String(localized: "Remove from favorites", comment: "Toolbar repeat last action")
                : String(localized: "Add to favorites", comment: "Toolbar repeat last action")
        }
    }

    private func loadFavoriteNoteIds() {
        guard let profileId = appState.activeProfile?.id else {
            favoriteNoteIds = []
            return
        }
        do {
            let favs = try PersistenceManager.shared.fetchFavorites(serverProfileId: profileId)
            favoriteNoteIds = Set(favs.map(\.noteId))
        } catch {
            Log.persistence.error("Failed to load favorite IDs: \(error.localizedDescription)")
        }
    }

    @ViewBuilder
    private func noteDetailShareLinkButtons(vm: NoteDetailViewModel) -> some View {
        let shareURL = vm.shareURLForCurrentNote()
        Button {
            if let u = shareURL {
                UIPasteboard.general.string = u.absoluteString
            }
        } label: {
            Label(
                String(localized: "Copy share link", comment: "Copy public Trilium URL"),
                systemImage: "doc.on.doc"
            )
            .padding(.leading, NoteDetailView.sharingSubmenuTitleLeadingInset)
        }
        .disabled(shareURL == nil)

        Button {
            if let u = shareURL {
                scheduleNoteDetailShareURLSheet(url: u)
            }
        } label: {
            Label(
                String(localized: "Share link…", comment: "System share sheet for URL"),
                systemImage: "square.and.arrow.up"
            )
            .padding(.leading, NoteDetailView.sharingSubmenuTitleLeadingInset)
        }
        .disabled(shareURL == nil)
    }

    private func scheduleNoteDetailShareURLSheet(url: URL) {
        TrinoteDeferredSystemShareSheet.schedulePresentation {
            noteDetailShareURLSheetItem = NoteDetailShareURLSheetItem(url: url)
        }
    }

    private func toggleFavorite(note: NoteItem, isFavorite: Bool) {
        guard let profileId = appState.activeProfile?.id else { return }
        do {
            if isFavorite {
                try PersistenceManager.shared.removeFavorite(noteId: note.noteId, serverProfileId: profileId)
            } else {
                try PersistenceManager.shared.addFavorite(
                    noteId: note.noteId,
                    title: note.title,
                    noteType: note.type.rawValue,
                    serverProfileId: profileId
                )
            }
            loadFavoriteNoteIds()
        } catch {
            Log.persistence.error("Failed to toggle favorite: \(error.localizedDescription)")
        }
    }
}

// MARK: - Create Child Sheet

struct CreateChildNoteSheet: View {
    @Bindable var viewModel: NoteDetailViewModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                TextField(String(localized: "Note Title", comment: "New child sheet"), text: $viewModel.newNoteTitle)
                    .textInputAutocapitalization(.sentences)

                Picker(String(localized: "Type", comment: "New note type"), selection: $viewModel.newNoteType) {
                    Text(String(localized: "Text", comment: "Note type")).tag(NoteType.text)
                    Text(String(localized: "Code", comment: "Note type")).tag(NoteType.code)
                    Text(String(localized: "Canvas", comment: "Note type")).tag(NoteType.canvas)
                    Text(String(localized: "Mermaid", comment: "Note type")).tag(NoteType.mermaid)
                    Text(String(localized: "Mind Map", comment: "Note type")).tag(NoteType.mindMap)
                    Text(String(localized: "Geo Map", comment: "Note type")).tag(NoteType.geoMap)
                    Text(String(localized: "Calendar", comment: "Note type: Trilium journal / calendar root")).tag(NoteType.calendar)
                }
            }
            .navigationTitle(String(localized: "New Note", comment: "New child sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "New child sheet")) { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Create", comment: "New child sheet")) {
                        Task { _ = await viewModel.createChildNote() }
                    }
                    .disabled(viewModel.newNoteTitle.trimmingCharacters(in: .whitespaces).isEmpty || viewModel.isSaving)
                }
            }
        }
        .presentationDetents([.medium])
    }
}

// MARK: - Camera Picker

struct CameraPickerView: UIViewControllerRepresentable {
    @Binding var imageToInsert: String?
    var onDismiss: () -> Void

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(imageToInsert: $imageToInsert, onDismiss: onDismiss)
    }

    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        @Binding var imageToInsert: String?
        var onDismiss: () -> Void

        init(imageToInsert: Binding<String?>, onDismiss: @escaping () -> Void) {
            _imageToInsert = imageToInsert
            self.onDismiss = onDismiss
        }

        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
            if let image = info[.originalImage] as? UIImage,
               let data = image.jpegData(compressionQuality: 0.8) {
                imageToInsert = "data:image/jpeg;base64,\(data.base64EncodedString())"
            }
            onDismiss()
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            onDismiss()
        }
    }
}

private extension View {
    /// Keeps the ⋯ menu open after this action (iOS 17+).
    @ViewBuilder
    func applyMenuKeepOpenOnAction() -> some View {
        if #available(iOS 17.0, *) {
            self.menuActionDismissBehavior(.disabled)
        } else {
            self
        }
    }
}

// MARK: - Navigation pop-gesture blocker

/// Blocks iOS interactive back-swipe while this view is visible.
private struct NavigationPopGestureBlocker: UIViewControllerRepresentable {
    let blocked: Bool

    func makeUIViewController(context: Context) -> Controller {
        let vc = Controller()
        vc.blocked = blocked
        return vc
    }

    func updateUIViewController(_ uiViewController: Controller, context: Context) {
        uiViewController.blocked = blocked
        uiViewController.applyBlocking()
    }

    final class Controller: UIViewController, UIGestureRecognizerDelegate {
        var blocked = true
        private weak var previousDelegate: UIGestureRecognizerDelegate?

        override func viewDidAppear(_ animated: Bool) {
            super.viewDidAppear(animated)
            applyBlocking()
        }

        override func viewWillDisappear(_ animated: Bool) {
            super.viewWillDisappear(animated)
            restoreDelegate()
        }

        func applyBlocking() {
            guard let gesture = navigationController?.interactivePopGestureRecognizer else { return }
            if blocked {
                if gesture.delegate !== self {
                    previousDelegate = gesture.delegate
                    gesture.delegate = self
                }
                gesture.isEnabled = true
            } else {
                restoreDelegate()
            }
        }

        private func restoreDelegate() {
            guard let gesture = navigationController?.interactivePopGestureRecognizer else { return }
            if gesture.delegate === self {
                gesture.delegate = previousDelegate
            }
            gesture.isEnabled = true
        }

        func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
            !blocked
        }
    }
}

// Make String Identifiable for navigationDestination
extension String: @retroactive Identifiable {
    public var id: String { self }
}

