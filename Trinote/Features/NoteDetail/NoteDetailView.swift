import Combine
import SwiftUI
import UIKit
import UniformTypeIdentifiers
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

private enum EditorFullscreenCover: String, Identifiable {
    case photoLibrary
    case camera
    var id: String { rawValue }
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

private struct NoteEditTarget: Hashable {
    let noteId: String
    let title: String
}

private struct EditorAttachmentRenameContext {
    let attachmentId: String
    let nodePos: Int
    let fileExtension: String
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
    /// Share-import file attachment to insert once the rich-text editor is ready (toolbar-equivalent chip).
    var attachmentIdToInsert: String? = nil
    var attachmentTitleToInsert: String? = nil

    init(
        noteId: String,
        title: String,
        seedChildSummaries: [ChildNoteSummary]? = nil,
        startInEditMode: Bool = false,
        pendingFindQuery: String? = nil,
        pendingFindMatchIndex: Int? = nil,
        openTabId: String? = nil,
        retargetActiveOpenTab: Bool = true,
        attachmentIdToInsert: String? = nil,
        attachmentTitleToInsert: String? = nil
    ) {
        self.noteId = noteId
        self.title = title
        self.seedChildSummaries = seedChildSummaries
        self.startInEditMode = startInEditMode
        self.pendingFindQuery = pendingFindQuery
        self.pendingFindMatchIndex = pendingFindMatchIndex
        self.openTabId = openTabId
        self.retargetActiveOpenTab = retargetActiveOpenTab
        self.attachmentIdToInsert = attachmentIdToInsert
        self.attachmentTitleToInsert = attachmentTitleToInsert
        _activeNoteId = State(initialValue: noteId)
        _activeOpenTabId = State(initialValue: openTabId)

        if let aid = attachmentIdToInsert, !aid.isEmpty {
            let titleForInsert = (attachmentTitleToInsert?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false)
                ? attachmentTitleToInsert!
                : "attachment"
            _attachmentToInsert = State(initialValue: EditorAttachmentInsert(
                noteId: noteId,
                attachmentId: aid,
                title: titleForInsert
            ))
        }

        // Seed scroll restoration before the first read-only render (avoids top-then-jump on launch / tab bar).
        if let id = openTabId, let f = OpenTabSessionStore.readReadScrollFraction(for: id) {
            _readOnlyScrollFraction = State(initialValue: f)
            _readOnlyScrollFractionPendingRestore = State(initialValue: f)
            _isReadOnlyScrollRevealPending = State(initialValue: f > Self.readOnlyScrollRevealMaskThreshold)
            _lastAppliedReadScrollTabId = State(initialValue: id)
        } else {
            _lastAppliedReadScrollTabId = State(initialValue: openTabId)
        }
    }

    @Environment(AppState.self) private var appState
    @Environment(\.colorScheme) private var colorScheme
    @Environment(\.dismiss) private var dismiss
    @Environment(\.scenePhase) private var scenePhase
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @State private var activeNoteId: String
    @State private var viewModel: NoteDetailViewModel?
    @State private var navigateToNoteId: String?
    @State private var navigateToNoteForEdit: NoteEditTarget?

    // Inline image insertion state
    @State private var showEditorImageSourceDialog = false
    @State private var editorFullscreenCover: EditorFullscreenCover?
    @State private var showEditorFilePicker = false
    @State private var imageToInsert: String?
    @State private var attachmentToInsert: EditorAttachmentInsert?
    @State private var attachmentRenameContext: EditorAttachmentRenameContext?
    @State private var attachmentRenameBasename = ""
    @State private var pendingAttachmentUpload: PendingAttachmentUpload?
    @State private var pendingAttachmentUploadBasename = ""
    @State private var showDeleteAllAttachmentsConfirm = false
    @State private var protectedDocumentPassword = ""
    @State private var favoriteNoteIds: Set<String> = []
    @State private var findControl = FindOnPageControl()
    @State private var findDeepLinkConsumed = false
    @State private var noteDetailShareURLSheetItem: NoteDetailShareURLSheetItem?
    @State private var showMoveParentPicker = false
    @State private var showShareLocally = false
    @State private var moveNoteDetailConfirm: MoveNoteDetailConfirm?
    /// Last note menu action repeated on the trailing toolbar (persists across notes and launches).
    @AppStorage("noteDetailLastToolbarMenuAction") private var lastToolbarQuickActionRaw: String = NoteDetailToolbarQuickAction.noteDetails.rawValue
    @AppStorage("showNoteTabsBar") private var showNoteTabsBar: Bool = false
    @AppStorage("useCustomTreeColors") private var useCustomTreeColors: Bool = false
    @AppStorage("useTriliumNoteColors") private var useTriliumNoteColors: Bool = true
    @AppStorage("treeLightTextColor") private var treeLightTextColor: String = "#1c1c1e"
    @AppStorage("treeDarkTextColor") private var treeDarkTextColor: String = "#e5e5e7"
    /// When `true`, hide the floating edit FAB and instead require a 1.5-second hold on the read-only view to start editing. Mirrors `SettingsView`'s toggle of the same key.
    @AppStorage("noteEditorLongPressToEdit") private var noteEditorLongPressToEdit: Bool = false
    /// When `true`, Image–Code block tools appear in a top toolbar below the nav header instead of the bottom bar.
    @AppStorage("noteEditorInsertToolsAtTop") private var noteEditorInsertToolsAtTop: Bool = false
    @State private var activeOpenTabId: String?
    @State private var openNoteTabListNonEmpty: Bool = false
    @State private var isTabBarReordering = false

    private var persistedLastActiveOpenTabId: String {
        LastActiveOpenTabStore.get(profileId: appState.activeProfile?.id)
    }

    /// Aligns “Copy share link” / “Share link…” with the Share/Sharing title (after `scale.3d` column).
    private static let sharingSubmenuTitleLeadingInset: CGFloat = 36

    /// Floating Edit chip: shown when opening an editable note; hides on scroll **up**, shows on scroll **down**.
    @State private var showFloatingEditButton = false
    @State private var lastScrollContentOffsetY: CGFloat = 0
    @State private var floatingEditScrollBaselineReady = false
    /// While true, ignore scroll-direction hide/show (layout + scroll restoration during note open).
    @State private var floatingEditIgnoreDirectionalScroll = true
    @State private var floatingEditSettlingEndWorkItem: DispatchWorkItem?
    /// Scroll fraction (0–1) of the read-only ScrollView, used to restore position in the editor.
    @State private var readOnlyScrollFraction: CGFloat = 0
    /// After save leaves the rich-text editor, applied once to the read-only `ScrollView` (same fraction as the web editor).
    @State private var readOnlyScrollFractionPendingRestore: CGFloat?
    /// Hides read-only content until tab scroll restoration settles (avoids top-then-jump).
    @State private var isReadOnlyScrollRevealPending = false
    /// Dedupes `applyReadScrollStateFromStoreForOpenTabId` when the same tab is applied twice after load.
    @State private var lastAppliedReadScrollTabId: String?

    /// Saved scroll fractions at or below this count as "top of note" and skip the reveal mask.
    private static let readOnlyScrollRevealMaskThreshold: CGFloat = 0.01

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

    /// Bridge to communicate with the spreadsheet editor WKWebView (call getWorkbook on save).
    @StateObject private var spreadsheetEditorBridge = SpreadsheetEditorBridge()
    @State private var spreadsheetHasUnsavedChanges = false

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

    private var principalBarTitleForegroundColor: Color {
        guard let note = viewModel?.note else { return .primary }
        return noteDetailTitleForegroundColor(for: note)
    }

    private var noteDetailTreeTextColor: Color? {
        guard useCustomTreeColors else { return nil }
        return colorScheme == .dark ? Color(hex: treeDarkTextColor) : Color(hex: treeLightTextColor)
    }

    /// Same rules as `TreeView.resolvedTreeTitleColor`: Trilium `#color`, else custom tree text, else primary.
    private func resolvedNoteDetailTriliumOrThemeTitleColor(for note: NoteItem) -> Color {
        if useTriliumNoteColors, let c = TriliumNoteColorMapper.swiftUIColor(for: note.colorLabelValue) {
            return c
        }
        return noteDetailTreeTextColor ?? .primary
    }

    private func noteDetailTitleForegroundColor(for note: NoteItem) -> Color {
        if note.isProtected, !appState.protectedSessionActive { return .secondary }
        return resolvedNoteDetailTriliumOrThemeTitleColor(for: note)
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
    /// Delay before treating scroll deltas as user-driven when no read-only scroll restoration runs.
    private static let floatingEditSettlingDuration: TimeInterval = 0.4

    private func floatingEditFABEligible(vm: NoteDetailViewModel, note: NoteItem) -> Bool {
        !noteEditorLongPressToEdit && note.type.isEditable && !vm.needsProtectedSession && !vm.isEditing
    }

    /// Always show the edit FAB when a note opens; suppress directional hide until layout / scroll restore settles.
    private func presentFloatingEditOnNoteOpen(vm: NoteDetailViewModel, note: NoteItem) {
        floatingEditSettlingEndWorkItem?.cancel()
        floatingEditSettlingEndWorkItem = nil
        floatingEditScrollBaselineReady = false
        lastScrollContentOffsetY = 0
        floatingEditIgnoreDirectionalScroll = true
        guard floatingEditFABEligible(vm: vm, note: note) else {
            if showFloatingEditButton {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = false
                }
            }
            return
        }
        if !showFloatingEditButton {
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showFloatingEditButton = true
            }
        }
    }

    private func scheduleFloatingEditScrollSettlingEndIfNeeded() {
        guard readOnlyScrollFractionPendingRestore == nil else { return }
        floatingEditSettlingEndWorkItem?.cancel()
        let work = DispatchWorkItem {
            floatingEditIgnoreDirectionalScroll = false
            floatingEditScrollBaselineReady = false
            floatingEditSettlingEndWorkItem = nil
        }
        floatingEditSettlingEndWorkItem = work
        DispatchQueue.main.asyncAfter(deadline: .now() + Self.floatingEditSettlingDuration, execute: work)
    }

    /// Same note, different open tab — `onAppear` does not run; reset FAB like a fresh open.
    private func presentFloatingEditOnOpenTabSwitch() {
        guard let vm = viewModel, let note = vm.note else { return }
        presentFloatingEditOnNoteOpen(vm: vm, note: note)
        scheduleFloatingEditScrollSettlingEndIfNeeded()
    }

    private func finishFloatingEditScrollSettling(vm: NoteDetailViewModel, note: NoteItem) {
        floatingEditSettlingEndWorkItem?.cancel()
        floatingEditSettlingEndWorkItem = nil
        floatingEditIgnoreDirectionalScroll = false
        floatingEditScrollBaselineReady = false
        lastScrollContentOffsetY = 0
        guard floatingEditFABEligible(vm: vm, note: note) else {
            if showFloatingEditButton {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = false
                }
            }
            return
        }
        if !showFloatingEditButton {
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showFloatingEditButton = true
            }
        }
    }

    /// Uses `UIScrollView.contentOffset.y` (via `NoteDetailScrollOffsetReader`): increases when scrolling **down**, decreases when scrolling **up**.
    private func updateFloatingEditVisibility(contentOffsetY: CGFloat, vm: NoteDetailViewModel, note: NoteItem) {
        guard !noteEditorLongPressToEdit, note.type.isEditable, !vm.needsProtectedSession, !vm.isEditing else {
            if showFloatingEditButton {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = false
                }
            }
            lastScrollContentOffsetY = contentOffsetY
            floatingEditScrollBaselineReady = false
            floatingEditIgnoreDirectionalScroll = true
            return
        }

        if floatingEditIgnoreDirectionalScroll {
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
            if !showFloatingEditButton {
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = true
                }
            }
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
    private static let editorSaveChipIdleDelay: TimeInterval = 0.75
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

    /// Length of the long-press hold (in seconds) that activates editing when the FAB is replaced
    /// by gesture-based editing. Matches the description in `SettingsView`'s footer.
    private static let noteEditorLongPressToEditDuration: TimeInterval = 1.5

    /// Long-press gesture used when `noteEditorLongPressToEdit` is on. Runs as a
    /// `simultaneousGesture` so it doesn't block scrolling, link taps, or the WebView's own
    /// long-press for text selection — pressing-and-holding (without moving) for 1.5s simply
    /// starts editing on top of whatever the underlying view does.
    private func longPressToEditGesture(vm: NoteDetailViewModel, note: NoteItem) -> some Gesture {
        LongPressGesture(minimumDuration: Self.noteEditorLongPressToEditDuration)
            .onEnded { _ in
                guard noteEditorLongPressToEdit,
                      note.type.isEditable,
                      !vm.needsProtectedSession,
                      !vm.isEditing
                else { return }
                let generator = UIImpactFeedbackGenerator(style: .medium)
                generator.impactOccurred()
                vm.startEditing()
            }
    }

    /// Re-evaluates the FAB visibility after the long-press setting toggles or the note's
    /// editability changes. Keeps the FAB in sync when the user flips the toggle while a note
    /// is on screen, without waiting for the next scroll event.
    private func refreshFloatingEditVisibility(vm: NoteDetailViewModel, note: NoteItem) {
        if floatingEditFABEligible(vm: vm, note: note) {
            presentFloatingEditOnNoteOpen(vm: vm, note: note)
            scheduleFloatingEditScrollSettlingEndIfNeeded()
        } else if showFloatingEditButton {
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showFloatingEditButton = false
            }
            floatingEditScrollBaselineReady = false
            floatingEditIgnoreDirectionalScroll = true
        }
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

    private static let richTextEditorScrollFractionScript = """
    (function(){
      try { return window.editorBridge.getScrollFraction(); } catch (e) { return 0; }
    })();
    """

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

    private static func parseRichTextEditorScrollFraction(_ result: Any?) -> CGFloat? {
        if let n = result as? NSNumber { return CGFloat(truncating: n) }
        if let d = result as? Double { return CGFloat(d) }
        if let s = result as? String, let d = Double(s) { return CGFloat(d) }
        return nil
    }

    private func queueReadOnlyScrollRestoreAfterRichTextSave(fraction: CGFloat) {
        let f = min(max(fraction, 0), 1)
        readOnlyScrollFraction = f
        readOnlyScrollFractionPendingRestore = f
        isReadOnlyScrollRevealPending = f > Self.readOnlyScrollRevealMaskThreshold
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

    private static func insertAttachmentLinkInEditor(webView: WKWebView?, noteId: String, attachmentId: String, title: String) {
        guard let webView else { return }
        guard let noteIdData = try? JSONSerialization.data(withJSONObject: noteId, options: [.fragmentsAllowed]),
              let attachmentIdData = try? JSONSerialization.data(withJSONObject: attachmentId, options: [.fragmentsAllowed]),
              let titleData = try? JSONSerialization.data(withJSONObject: title, options: [.fragmentsAllowed]),
              let noteIdJSON = String(data: noteIdData, encoding: .utf8),
              let attachmentIdJSON = String(data: attachmentIdData, encoding: .utf8),
              let titleJSON = String(data: titleData, encoding: .utf8) else { return }
        webView.evaluateJavaScript(
            "window.editorBridge.insertAttachmentLink(\(noteIdJSON), \(attachmentIdJSON), \(titleJSON));",
            completionHandler: nil
        )
    }

    private static func beginEditorImageBatch(webView: WKWebView?, count: Int) {
        webView?.evaluateJavaScript(
            "try{window.editorBridge.beginImageBatch(\(count))}catch(e){}",
            completionHandler: nil
        )
    }

    private static func insertBatchImageInEditor(webView: WKWebView?, insert: EditorImageInsert) {
        guard let webView else { return }
        var item = ["src": insert.src]
        if let originalSrc = insert.originalSrc {
            item["originalSrc"] = originalSrc
        }
        guard let data = try? JSONSerialization.data(withJSONObject: item),
              let json = String(data: data, encoding: .utf8) else { return }
        webView.evaluateJavaScript("window.editorBridge.insertBatchImage(\(json));", completionHandler: nil)
    }

    private static func endEditorImageBatch(webView: WKWebView?) {
        webView?.evaluateJavaScript(
            "try{window.editorBridge.endImageBatch()}catch(e){}",
            completionHandler: nil
        )
    }

    private static func updateAttachmentReferenceTitleInEditor(webView: WKWebView?, pos: Int, title: String) {
        guard let webView else { return }
        guard let titleData = try? JSONSerialization.data(withJSONObject: title, options: [.fragmentsAllowed]),
              let titleJSON = String(data: titleData, encoding: .utf8) else { return }
        webView.evaluateJavaScript(
            "window.editorBridge.updateAttachmentReferenceTitle(\(pos), \(titleJSON));",
            completionHandler: nil
        )
    }

    private func applyAttachmentRename() {
        guard let ctx = attachmentRenameContext else { return }
        let trimmed = attachmentRenameBasename.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        let newTitle = AttachmentFilename.join(basename: trimmed, ext: ctx.fileExtension)
        attachmentRenameContext = nil
        Self.updateAttachmentReferenceTitleInEditor(webView: editorWebView, pos: ctx.nodePos, title: newTitle)
        Task { @MainActor in
            guard let vm = viewModel else { return }
            await vm.renameAttachmentTitle(attachmentId: ctx.attachmentId, title: newTitle)
        }
    }

    private func presentAttachmentUploadNamePrompt(data: Data, mime: String, filename: String) {
        let pending = PendingAttachmentUpload(data: data, mime: mime, filename: filename)
        pendingAttachmentUploadBasename = pending.suggestedBasename
        pendingAttachmentUpload = pending
    }

    private func confirmPendingAttachmentUpload(
        _ item: PendingAttachmentUpload,
        basename: String,
        vm: NoteDetailViewModel
    ) async {
        let filename = item.resolvedFilename(basename: basename)
        if let attachment = await vm.uploadAttachment(data: item.data, filename: filename, mime: item.mime) {
            Self.insertAttachmentLinkInEditor(
                webView: editorWebView,
                noteId: vm.noteId,
                attachmentId: attachment.attachmentId,
                title: attachment.title
            )
        }
    }

    /// Leaves the rich-text editor and restores read-only scroll to the editor's current position.
    private func cancelRichTextEditing(vm: NoteDetailViewModel) {
        if let wv = editorWebView {
            wv.evaluateJavaScript(Self.richTextEditorScrollFractionScript) { result, _ in
                DispatchQueue.main.async {
                    let frac = Self.parseRichTextEditorScrollFraction(result) ?? readOnlyScrollFraction
                    queueReadOnlyScrollRestoreAfterRichTextSave(fraction: frac)
                    vm.cancelEditing()
                }
            }
        } else {
            vm.cancelEditing()
        }
    }

    private func cancelNoteEditing(vm: NoteDetailViewModel, note: NoteItem) {
        if vm.isEditing && note.type == .text {
            cancelRichTextEditing(vm: vm)
        } else {
            vm.cancelEditing()
        }
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

    /// Interactive back-swipe fights pan/zoom on full-bleed canvases (mind map, geo map) and edit surfaces.
    private var shouldBlockNavigationPopGesture: Bool {
        if isTabBarReordering { return true }
        if viewModel?.isEditing == true { return true }
        if isGeoMapNote(viewModel?.note, contentString: viewModel?.contentString, vm: viewModel) { return true }
        // Mind map (read or edit): edge swipes are used to pan the diagram.
        if viewModel?.note?.type == .mindMap { return true }
        return false
    }

    var body: some View {
        bodyWithLifecycle
            .fullScreenCover(item: $editorFullscreenCover, onDismiss: {
                EditorCameraCapture.endPortraitSession()
            }) { cover in
                editorFullscreenCoverContent(cover)
            }
    }

    @ViewBuilder
    private func editorFullscreenCoverContent(_ cover: EditorFullscreenCover) -> some View {
        switch cover {
        case .photoLibrary:
            PhotoLibraryPickerView { images in
                editorFullscreenCover = nil
                Task { await handleEditorPhotoPicks(images) }
            } onCancel: {
                editorFullscreenCover = nil
                editorWebView?.evaluateJavaScript(
                    "try{window.editorBridge.clearPendingMediaInsert()}catch(e){}",
                    completionHandler: nil
                )
            }
        case .camera:
            CameraPickerView(imageToInsert: $imageToInsert) {
                editorFullscreenCover = nil
            }
            .ignoresSafeArea()
        }
    }

    private var bodyWithLifecycle: some View {
        bodyCore
            // Full-size clear host — zero-frame backgrounds often never attach under NavigationStack.
            .background {
                NavigationPopGestureBlocker(blocked: shouldBlockNavigationPopGesture, label: "NoteDetail")
            }
            .onChange(of: shouldBlockNavigationPopGesture) { _, blocked in
                // TEMP: mind-map swipe-back diagnosis
                let type = viewModel?.note?.type.rawValue ?? "nil"
                Log.popGesture.info("NoteDetail shouldBlock=\(blocked) noteType=\(type, privacy: .public) editing=\(viewModel?.isEditing == true)")
            }
            .task(id: activeNoteId) { await initialLoad() }
            .navigationDestination(item: $navigateToNoteId) { linkedNoteId in
                NoteDetailView(noteId: linkedNoteId, title: "", startInEditMode: false)
            }
            .navigationDestination(item: $navigateToNoteForEdit) { target in
                NoteDetailView(noteId: target.noteId, title: target.title, startInEditMode: true)
            }
            .safeAreaInset(edge: .bottom, spacing: 0) {
                if showNoteTabsBar, openNoteTabListNonEmpty, viewModel?.isEditing != true {
                    NoteTabsBar(
                        currentOpenTabId: activeOpenTabId,
                        onSelect: { selectOpenNoteTab($0) },
                        onOpenTabRemoved: { handleOpenTabRemoved($0) },
                        onTabsBecameEmpty: {
                            LastActiveOpenTabStore.set("", profileId: appState.activeProfile?.id)
                        },
                        onReorderActiveChanged: { isTabBarReordering = $0 }
                    )
                    .transition(.move(edge: .bottom))
                }
            }
            .toolbar(viewModel?.isEditing == true ? .hidden : .visible, for: .tabBar)
            .animation(.easeInOut(duration: 0.2), value: viewModel?.isEditing == true)
            .onChange(of: viewModel?.note?.noteId) { _, _ in refreshOpenNoteTabListNonEmpty() }
            .onChange(of: viewModel?.shouldDismissAfterServerDeletion) { _, shouldDismiss in
                if shouldDismiss == true { dismiss() }
            }
            .onChange(of: showNoteTabsBar) { _, _ in refreshOpenNoteTabListNonEmpty() }
            .onChange(of: activeOpenTabId) { _, newTab in
                if let newTab {
                    LastActiveOpenTabStore.set(newTab, profileId: appState.activeProfile?.id)
                } else {
                    LastActiveOpenTabStore.set("", profileId: appState.activeProfile?.id)
                }
            }
            .onReceive(NotificationCenter.default.publisher(for: .openNoteTabsChanged)) { _ in
                refreshOpenNoteTabListNonEmpty()
                validateOrphanedActiveOpenTabId()
            }
            .onAppear {
                refreshOpenNoteTabListNonEmpty()
                if showNoteTabsBar, let t = activeOpenTabId { LastActiveOpenTabStore.set(t, profileId: appState.activeProfile?.id) }
                if showNoteTabsBar, retargetActiveOpenTab { restoreActiveOpenTabToCurrentNoteIfDrifted() }
            }
            .onDisappear {
                persistReadScrollFractionForActiveOpenTab()
                viewModel?.persistEditingDraftIfNeeded()
            }
            .onChange(of: scenePhase) { _, phase in
                if phase == .background || phase == .inactive {
                    persistReadScrollFractionForActiveOpenTab()
                    viewModel?.persistEditingDraftIfNeeded()
                }
            }
            .onChange(of: appState.activeProfile?.id) { _, _ in
                dismiss()
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
        .frame(maxWidth: .infinity, maxHeight: .infinity)
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
                        .foregroundStyle(principalBarTitleForegroundColor)
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
            if showNoteTabsBar, retargetActiveOpenTab { eagerRetargetActiveOpenTabFromCache() }
            async let loadTask: () = vm.load()
            async let contentTask: () = vm.loadContent()
            async let attachTask: () = vm.loadAttachments()
            async let childTask: () = vm.loadChildNotes()
            await loadTask
            // Flip into edit mode as soon as `note` is available so SwiftUI never renders the read
            // layout for a frame before the editor takes over. Only the new-note flow sets
            // `startInEditMode` (TreeView.noteEditDestination), so `editableContent` being empty at
            // this point is correct — there's no existing content to wait on.
            if startInEditMode, vm.note != nil {
                vm.startEditing()
            }
            _ = await (contentTask, attachTask, childTask)
            await vm.prefetchChildNotesForGeoMapBookIfNeeded()
        }
        if showNoteTabsBar { reconcileOpenTabsAfterLoad() }
    }

    /// Synchronously retargets the active open tab to `activeNoteId` using cached metadata, so the tab strip updates immediately when navigating instead of waiting for the destination note's network/file load.
    private func eagerRetargetActiveOpenTabFromCache() {
        guard let p = appState.activeProfile?.id else { return }
        let pm = PersistenceManager.shared
        guard pm.openNoteTabCount(serverProfileId: p) > 0 else { return }

        var tabId: String? = activeOpenTabId
        if tabId == nil, let o = self.openTabId,
           (try? pm.fetchOpenNoteTab(id: o, serverProfileId: p)) != nil {
            tabId = o
        }
        if tabId == nil, !persistedLastActiveOpenTabId.isEmpty,
           (try? pm.fetchOpenNoteTab(id: persistedLastActiveOpenTabId, serverProfileId: p)) != nil {
            tabId = persistedLastActiveOpenTabId
        }
        if tabId == nil, let m = try? pm.mostRecentlyAddedOpenNoteTabId(serverProfileId: p) {
            tabId = m
        }

        guard let t = tabId,
              let row = try? pm.fetchOpenNoteTab(id: t, serverProfileId: p),
              row.noteId != activeNoteId else { return }

        let cached = try? pm.fetchCachedNote(id: activeNoteId, serverProfileId: p)
        let resolvedTitle: String = {
            if let c = cached, !c.title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { return c.title }
            let t = title.trimmingCharacters(in: .whitespacesAndNewlines)
            return t.isEmpty ? row.title : title
        }()
        let resolvedType = cached?.noteType ?? row.noteType

        do {
            try pm.retargetOpenNoteTab(
                id: t,
                to: activeNoteId,
                title: resolvedTitle,
                noteType: resolvedType,
                serverProfileId: p
            )
        } catch {}
        if activeOpenTabId == nil { activeOpenTabId = t }
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
                if activeOpenTabId == nil, !persistedLastActiveOpenTabId.isEmpty,
                   (try? pm.fetchOpenNoteTab(id: persistedLastActiveOpenTabId, serverProfileId: p)) != nil {
                    activeOpenTabId = persistedLastActiveOpenTabId
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

        if !persistedLastActiveOpenTabId.isEmpty,
           (try? pm.fetchOpenNoteTab(id: persistedLastActiveOpenTabId, serverProfileId: p)) != nil {
            activeOpenTabId = persistedLastActiveOpenTabId
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
        readOnlyScrollFractionPendingRestore = nil
        isReadOnlyScrollRevealPending = false
        lastAppliedReadScrollTabId = tabId
    }

    private func applyReadScrollStateFromStoreForOpenTabId(_ id: String) {
        if lastAppliedReadScrollTabId == id { return }

        if let f = OpenTabSessionStore.readReadScrollFraction(for: id) {
            readOnlyScrollFraction = f
            readOnlyScrollFractionPendingRestore = f
            isReadOnlyScrollRevealPending = f > Self.readOnlyScrollRevealMaskThreshold
        } else {
            readOnlyScrollFraction = 0
            readOnlyScrollFractionPendingRestore = nil
            isReadOnlyScrollRevealPending = false
        }
        lastAppliedReadScrollTabId = id
    }

    /// Fraction to persist: target restore position while layout is settling, else live scroll.
    private var readOnlyScrollFractionToPersist: CGFloat {
        readOnlyScrollFractionPendingRestore ?? readOnlyScrollFraction
    }

    /// Writes the current read-only scroll fraction for the active open tab (same store as tab switches).
    private func persistReadScrollFractionForActiveOpenTab() {
        guard let tabId = activeOpenTabId ?? openTabId else { return }
        OpenTabSessionStore.saveReadScrollFraction(readOnlyScrollFractionToPersist, for: tabId)
    }

    private func selectOpenNoteTab(_ tab: OpenNoteTab) {
        guard appState.activeProfile?.id == tab.serverProfileId else { return }
        if let prev = activeOpenTabId, prev != tab.id {
            OpenTabSessionStore.saveReadScrollFraction(readOnlyScrollFractionToPersist, for: prev)
            lastAppliedReadScrollTabId = prev
        }
        if tab.noteId == activeNoteId {
            if tab.id == activeOpenTabId { return }
            activeOpenTabId = tab.id
            applyReadScrollStateFromStoreForOpenTabId(tab.id)
            presentFloatingEditOnOpenTabSwitch()
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
            LastActiveOpenTabStore.set("", profileId: appState.activeProfile?.id)
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
            LastActiveOpenTabStore.set("", profileId: appState.activeProfile?.id)
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
            LastActiveOpenTabStore.set("", profileId: appState.activeProfile?.id)
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
                // Migrate the existing view model in place rather than tearing it down. Rebuilding
                // would unmount the (possibly already open) editor and re-run `initialLoad`, producing
                // the "detail → editor → detail → editor" flash users see right after creating a note.
                viewModel?.migrateAfterOfflineIdReplacement(to: to)
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
                    loadGeoMapPins(vm: vm, note: n)
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
    private func readOnlyNoteSurface(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
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

                    if note.type.isEditable, !vm.needsProtectedSession, !noteEditorLongPressToEdit {
                        Color.clear.frame(
                            height: NoteDetailFloatingChipLayout.scrollClearance(
                                findBarPresented: findControl.isPresented,
                                editing: false
                            )
                        )
                    }
                }
                .background(
                    ZStack {
                        NoteDetailScrollOffsetReader { y, _, fraction in
                            if readOnlyScrollFractionPendingRestore == nil {
                                readOnlyScrollFraction = fraction
                            }
                            updateFloatingEditVisibility(
                                contentOffsetY: y,
                                vm: vm,
                                note: note
                            )
                        }
                        NoteDetailReadOnlyScrollRestoration(fraction: readOnlyScrollFractionPendingRestore) {
                            if let restored = readOnlyScrollFractionPendingRestore {
                                readOnlyScrollFraction = restored
                            }
                            readOnlyScrollFractionPendingRestore = nil
                            if isReadOnlyScrollRevealPending {
                                withAnimation(.easeOut(duration: 0.18)) {
                                    isReadOnlyScrollRevealPending = false
                                }
                            }
                            finishFloatingEditScrollSettling(vm: vm, note: note)
                        }
                    }
                    .frame(width: 0, height: 0)
                )
            }
            .simultaneousGesture(longPressToEditGesture(vm: vm, note: note))
            .opacity(isReadOnlyScrollRevealPending ? 0 : 1)

            if showFloatingEditButton && !noteEditorLongPressToEdit && !isReadOnlyScrollRevealPending {
                floatingEditFAB(vm: vm)
                    .padding(.trailing, 16)
                    .padding(.bottom, findControl.isPresented ? 56 : 12)
                    .transition(.scale(scale: 0.88).combined(with: .opacity))
                    .zIndex(2)
            }
        }
        .overlay {
            if isReadOnlyScrollRevealPending {
                ProgressView()
                    .controlSize(.regular)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color(uiColor: .systemBackground))
                    .transition(.opacity)
                    .allowsHitTesting(false)
            }
        }
        .animation(.easeInOut(duration: 0.22), value: findControl.isPresented)
        .refreshable { await vm.refresh(force: true) }
        .safeAreaInset(edge: .bottom, spacing: 0) {
            if findControl.isPresented {
                FindOnPageBar(control: findControl)
            }
        }
        .onAppear {
            presentFloatingEditOnNoteOpen(vm: vm, note: note)
            scheduleFloatingEditScrollSettlingEndIfNeeded()
        }
        .onChange(of: note.noteId) { _, _ in
            presentFloatingEditOnNoteOpen(vm: vm, note: note)
            scheduleFloatingEditScrollSettlingEndIfNeeded()
        }
        .onChange(of: vm.isEditing) { _, editing in
            if editing {
                readOnlyScrollFractionPendingRestore = nil
                isReadOnlyScrollRevealPending = false
                findControl.close()
                floatingEditSettlingEndWorkItem?.cancel()
                floatingEditSettlingEndWorkItem = nil
                floatingEditScrollBaselineReady = false
                floatingEditIgnoreDirectionalScroll = true
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = false
                }
            } else if floatingEditFABEligible(vm: vm, note: note) {
                presentFloatingEditOnNoteOpen(vm: vm, note: note)
                scheduleFloatingEditScrollSettlingEndIfNeeded()
            }
        }
        .onChange(of: vm.needsProtectedSession) { _, needs in
            if needs {
                floatingEditSettlingEndWorkItem?.cancel()
                floatingEditSettlingEndWorkItem = nil
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = false
                }
                floatingEditScrollBaselineReady = false
                floatingEditIgnoreDirectionalScroll = true
            } else if floatingEditFABEligible(vm: vm, note: note) {
                presentFloatingEditOnNoteOpen(vm: vm, note: note)
                scheduleFloatingEditScrollSettlingEndIfNeeded()
            }
        }
        .onChange(of: noteEditorLongPressToEdit) { _, _ in
            refreshFloatingEditVisibility(vm: vm, note: note)
        }
        .onDisappear {
            findControl.unregisterAll()
        }
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
                // Each branch is type-erased: without AnyView the runtime has to demangle
                // every note mode's view type as one nested generic, which overflows the
                // main thread stack while instantiating the metadata.
                if vm.needsProtectedSession {
                    AnyView(protectedNoteOverlay(vm, note: note))
                } else if note.isCalendarRoot {
                    AnyView(calendarDetailView(vm, note: note))
                } else if isPresentationNote(note) {
                    // Check presentation before kanban: both are book collections; viewType must win.
                    AnyView(presentationDetailView(vm, note: note))
                } else if isKanbanNote(note) {
                    AnyView(kanbanDetailView(vm, note: note))
                } else if isGeoMapNote(note, contentString: vm.contentString, vm: vm) {
                    AnyView(geoMapDetailView(vm, note: note))
                } else if vm.isEditing && note.type == .text {
                    AnyView(
                        VStack(spacing: 0) {
                            editorStatusBanner(vm)
                            richTextEditingView(vm)
                                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
                        }
                        .background(Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal]))
                    )
                } else if vm.isEditing && note.type == .code {
                    AnyView(
                        VStack(spacing: 0) {
                            editorStatusBanner(vm)
                            codeEditingView(vm)
                                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
                        }
                        .background(Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal]))
                    )
                } else if vm.isEditing && note.type == .mermaid {
                    AnyView(mermaidEditingView(vm))
                } else if vm.isEditing && note.type == .mindMap {
                    AnyView(mindMapEditingView(vm))
                } else if vm.isEditing && note.type == .canvas {
                    AnyView(canvasEditingView(vm))
                } else if vm.isEditing && note.type == .spreadsheet && horizontalSizeClass == .regular {
                    AnyView(spreadsheetEditingView(vm))
                } else if note.type == .mindMap {
                    AnyView(mindMapReadOnlyView(vm, note: note))
                } else {
                    AnyView(readOnlyNoteSurface(vm, note: note))
                }
            }
            .toolbar { noteToolbar(vm, note: note) }
            .onAppear { loadFavoriteNoteIds() }
            .onChange(of: appState.activeProfile?.id) { _, _ in loadFavoriteNoteIds() }
            .onReceive(NotificationCenter.default.publisher(for: .trinoteTreeShouldRefresh)) { _ in
                guard let vm = viewModel else { return }
                Task {
                    await vm.refreshDirectChildrenMetadataFromServer()
                    guard let n = vm.note else { return }
                    if isGeoMapNote(n, contentString: vm.contentString, vm: vm) {
                        loadGeoMapPins(vm: vm, note: n)
                    }
                }
            }
            .alert(String(localized: "Error", comment: "Save error alert"), isPresented: $vm.showSaveError) {
                Button(String(localized: "OK", comment: "Alert dismiss")) { vm.showSaveError = false }
            } message: {
                Text(vm.saveError ?? String(localized: "An unknown error occurred.", comment: "Generic error"))
            }
            .alert(
                String(localized: "Rename Attachment", comment: "Rename attachment alert title"),
                isPresented: Binding(
                    get: { attachmentRenameContext != nil },
                    set: { if !$0 { attachmentRenameContext = nil } }
                )
            ) {
                TextField(
                    String(localized: "Filename", comment: "Attachment rename basename field"),
                    text: $attachmentRenameBasename
                )
                Button(String(localized: "Cancel", comment: "Cancel"), role: .cancel) {
                    attachmentRenameContext = nil
                }
                Button(String(localized: "Rename", comment: "Rename attachment confirm")) {
                    applyAttachmentRename()
                }
                .disabled(attachmentRenameBasename.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            } message: {
                if let ext = attachmentRenameContext?.fileExtension, !ext.isEmpty {
                    Text(String(localized: "Extension: .\(ext)", comment: "Attachment rename extension hint"))
                }
            }
            .attachmentUploadNamePrompt(
                pending: $pendingAttachmentUpload,
                basename: $pendingAttachmentUploadBasename
            ) { item, basename in
                guard let vm = viewModel else { return }
                Task { @MainActor in
                    await confirmPendingAttachmentUpload(item, basename: basename, vm: vm)
                }
            }
            .sheet(isPresented: $vm.showCreateChild) {
                CreateChildNoteSheet(viewModel: vm) { noteId, title in
                    navigateToNoteForEdit = NoteEditTarget(noteId: noteId, title: title)
                }
            }
            .fullScreenCover(isPresented: Binding(
                get: { vm.isEditing && note.type == .spreadsheet && horizontalSizeClass != .regular },
                set: { newValue in
                    // Cover dismissal (programmatic only — no swipe-down) returns control
                    // to read-only mode. Cancel/Save buttons inside the cover already
                    // toggle vm.isEditing; this setter mainly catches edge cases.
                    if !newValue && vm.isEditing && note.type == .spreadsheet {
                        spreadsheetHasUnsavedChanges = false
                        vm.cancelEditing()
                    }
                }
            )) {
                spreadsheetEditorCover(vm: vm)
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
            .sheet(isPresented: $showShareLocally) {
                if let note = vm.note {
                    ShareLocallyView(note: note, client: vm.client)
                        .environment(appState)
                }
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
        if let msg = vm.mediaUploadStatus ?? vm.transientEditorMessage {
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
                                .foregroundStyle(noteDetailTitleForegroundColor(for: note))
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
                                .foregroundStyle(noteDetailTitleForegroundColor(for: note))
                                .frame(width: titleIconColumnWidth, alignment: .center)
                                .accessibilityHidden(true)
                            Text(uiTitle(for: note))
                                .font(.title2.bold())
                                .foregroundStyle(noteDetailTitleForegroundColor(for: note))
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
                    checkboxOnlyRevision: vm.checkboxOnlyContentRevision,
                    onNoteLinkTapped: { linkedNoteId in
                        navigateToNoteId = linkedNoteId
                    },
                    onCheckboxToggled: { index, checked in
                        vm.toggleCheckbox(index: index, checked: checked)
                    },
                    onCheckboxReordered: { fromIndex, beforeIndex in
                        vm.reorderListItem(fromIndex: fromIndex, beforeIndex: beforeIndex)
                    },
                    loadAttachmentPreview: { attachmentId in
                        if let attachment = vm.attachments.first(where: { $0.attachmentId == attachmentId }) {
                            return await vm.prepareAttachmentPreview(for: attachment)
                        }
                        return await vm.prepareAttachmentPreview(attachmentId: attachmentId)
                    },
                    imageBytes: { routeType, entityId in
                        await vm.loadImageBytes(routeType: routeType, entityId: entityId)
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
                CodeNoteView(
                    content: code,
                    mime: note.mime,
                    findControl: findControl,
                    onNoteLinkTapped: { linkedNoteId in
                        navigateToNoteId = linkedNoteId
                    },
                    loadAttachmentPreview: { attachmentId in
                        if let attachment = vm.attachments.first(where: { $0.attachmentId == attachmentId }) {
                            return await vm.prepareAttachmentPreview(for: attachment)
                        }
                        return await vm.prepareAttachmentPreview(attachmentId: attachmentId)
                    }
                )
            }
        case .image:
            if let data = vm.content {
                ImageNoteView(data: data, title: uiTitle(for: note))
            }
        case .file:
            FileNoteView(note: note, attachments: vm.attachments, viewModel: vm) { noteId, _ in
                navigateToNoteId = noteId
            }
        case .canvas:
            CanvasNoteView(noteId: note.noteId, attachments: vm.attachments, client: vm.client, excalidrawJSON: vm.contentString)
        case .mindMap:
            if let json = vm.contentString {
                MindMapNoteView(json: json)
            }
        case .spreadsheet:
            SpreadsheetNoteView(json: vm.contentString)
        case .geoMap:
            GeoMapNoteView(viewportJSON: effectiveGeoMapViewportJSONForDisplay(vm.contentString), markers: geoMapPins) { navigateToNoteId = $0 }
        case .kanban:
            KanbanBoardView(viewModel: vm, note: note) { navigateToNoteId = $0 }
                .frame(minHeight: 420)
        case .presentation:
            PresentationNoteView(viewModel: vm, note: note) { navigateToNoteId = $0 }
                .frame(minHeight: 420)
        case .book, .collection:
            if isGeoMapNote(note, contentString: vm.contentString, vm: vm) {
                GeoMapNoteView(viewportJSON: effectiveGeoMapViewportJSONForDisplay(vm.contentString), markers: geoMapPins) { navigateToNoteId = $0 }
            } else if isPresentationNote(note) {
                PresentationNoteView(viewModel: vm, note: note) { navigateToNoteId = $0 }
                    .frame(minHeight: 420)
            } else if isKanbanNote(note) {
                KanbanBoardView(viewModel: vm, note: note) { navigateToNoteId = $0 }
                    .frame(minHeight: 420)
            } else if note.isTriliumCollectionNote || note.type == .collection {
                CollectionNoteLimitedSupportBanner(
                    noteId: note.noteId,
                    serverURL: appState.activeProfile?.normalizedBaseURL
                )
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
        // `editorDisplayContent` is the decorated copy of `editableContent` (image refs → `trinote-img://`,
        // canvas/mermaid imageLinks → include cards), populated asynchronously by `prepareEditorDisplayContent`.
        // While that's in flight we show a brief spinner so the editor never mounts with broken
        // `<img src="api/images/…">` references.
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
                    case .renameAttachment(let attachmentId, _, let title, let pos):
                        let split = AttachmentFilename.split(title)
                        attachmentRenameBasename = split.basename
                        attachmentRenameContext = EditorAttachmentRenameContext(
                            attachmentId: attachmentId,
                            nodePos: pos,
                            fileExtension: split.ext
                        )
                    }
                },
                onPasteFile: { data, filename, mime in
                    presentAttachmentUploadNamePrompt(data: data, mime: mime, filename: filename)
                },
                imageBytes: { routeType, entityId in
                    await vm.loadImageBytes(routeType: routeType, entityId: entityId)
                },
                imageToInsert: $imageToInsert,
                attachmentToInsert: $attachmentToInsert,
                webViewBinding: $editorWebView,
                initialScrollFraction: readOnlyScrollFraction,
                insertToolsAtTop: noteEditorInsertToolsAtTop,
                onInsertToolsAtTopChanged: { noteEditorInsertToolsAtTop = $0 }
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

            if showEditorImageSourceDialog {
                EditorInsertMediaDialog(
                    showsCamera: UIImagePickerController.isSourceTypeAvailable(.camera),
                    onPhotoLibrary: {
                        showEditorImageSourceDialog = false
                        editorFullscreenCover = .photoLibrary
                    },
                    onCamera: {
                        showEditorImageSourceDialog = false
                        // Lock portrait first so the system camera gets upright bounds; present
                        // via fullScreenCover (not UIKit present) so note @State survives.
                        EditorCameraCapture.preparePortraitSession {
                            editorFullscreenCover = .camera
                        }
                    },
                    onChooseFile: {
                        showEditorImageSourceDialog = false
                        showEditorFilePicker = true
                    },
                    onCancel: {
                        showEditorImageSourceDialog = false
                        editorWebView?.evaluateJavaScript(
                            "try{window.editorBridge.clearPendingMediaInsert()}catch(e){}",
                            completionHandler: nil
                        )
                    }
                )
                .transition(.opacity.combined(with: .scale(scale: 0.96)))
                .zIndex(50)
            }
        }
        .animation(.easeOut(duration: 0.2), value: showEditorImageSourceDialog)
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
        .fileImporter(
            isPresented: $showEditorFilePicker,
            allowedContentTypes: [.item],
            allowsMultipleSelection: false
        ) { result in
            Task { await handleEditorFilePick(result) }
        }
        .sheet(isPresented: $showIncludeNotePicker) {
            NotePickerSheet(
                excludeNoteId: activeNoteId,
                navigationTitleOverride: String(
                    localized: "Select a note to link to this note",
                    comment: "Include/link note picker title"
                ),
                hidesEmbeddedTreeToolbar: true,
                hidesEmbeddedTreeRootHeader: true,
                hidesEmbeddedTreeTabsBar: true
            ) { pickedId, pickedTitle in
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

    // MARK: - Spreadsheet editing

    /// iPad/regular-size-class inline editor. Mirrors `canvasEditingView` so the
    /// floating save chip + WKWebView host fill the note pane.
    @ViewBuilder
    private func spreadsheetEditingView(_ vm: NoteDetailViewModel) -> some View {
        ZStack(alignment: .bottomTrailing) {
            SpreadsheetEditorView(
                initialJSON: vm.editableContent,
                bridge: spreadsheetEditorBridge,
                colorScheme: colorScheme,
                onWorkbookChanged: { spreadsheetHasUnsavedChanges = true }
            )
            .onAppear {
                spreadsheetHasUnsavedChanges = false
            }

            spreadsheetSaveChip(vm: vm)
                .padding(.trailing, 16)
                .padding(.bottom, 72)
                .transition(.scale(scale: 0.88).combined(with: .opacity))
                .zIndex(2)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(uiColor: .trinoteSpreadsheetBackground).ignoresSafeArea(edges: [.bottom, .horizontal]))
    }

    @ViewBuilder
    private func spreadsheetSaveChip(vm: NoteDetailViewModel) -> some View {
        Button {
            saveSpreadsheetContent(vm: vm)
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
        .accessibilityLabel(String(localized: "Save", comment: "Spreadsheet save chip"))
    }

    private func saveSpreadsheetContent(vm: NoteDetailViewModel) {
        spreadsheetEditorBridge.getWorkbook { json in
            DispatchQueue.main.async {
                vm.saveSpreadsheetContent(json: json)
                spreadsheetHasUnsavedChanges = false
            }
        }
    }

    /// iPhone/compact-size-class modal editor — Univer's chrome (formula bar +
    /// toolbar) is cramped at 390 pt inline, so we present it full-screen with a
    /// native nav bar that hosts Cancel/Save.
    @ViewBuilder
    private func spreadsheetEditorCover(vm: NoteDetailViewModel) -> some View {
        NavigationStack {
            SpreadsheetEditorView(
                initialJSON: vm.editableContent,
                bridge: spreadsheetEditorBridge,
                colorScheme: colorScheme,
                onWorkbookChanged: { spreadsheetHasUnsavedChanges = true }
            )
            .ignoresSafeArea(edges: .bottom)
            .navigationTitle(vm.note?.uiTitle(forProtectedSessionActive: appState.protectedSessionActive) ?? "")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button {
                        spreadsheetHasUnsavedChanges = false
                        vm.cancelEditing()
                    } label: {
                        Text(String(localized: "Cancel", comment: "Spreadsheet editor cancel button"))
                    }
                    .disabled(vm.isSaving)
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        saveSpreadsheetContent(vm: vm)
                    } label: {
                        if vm.isSaving {
                            ProgressView().controlSize(.small)
                        } else {
                            Text(String(localized: "Save", comment: "Spreadsheet editor save button"))
                                .fontWeight(.semibold)
                        }
                    }
                    .disabled(vm.isSaving)
                }
            }
            .onAppear {
                spreadsheetHasUnsavedChanges = false
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
            .simultaneousGesture(longPressToEditGesture(vm: vm, note: note))

            if showFloatingEditButton && !noteEditorLongPressToEdit {
                floatingEditFAB(vm: vm)
                    .padding(.trailing, 16)
                    .padding(.bottom, 12)
                    .transition(.scale(scale: 0.88).combined(with: .opacity))
                    .zIndex(2)
            }
        }
        .onAppear {
            presentFloatingEditOnNoteOpen(vm: vm, note: note)
            scheduleFloatingEditScrollSettlingEndIfNeeded()
        }
        .onChange(of: vm.isEditing) { _, editing in
            if editing {
                floatingEditSettlingEndWorkItem?.cancel()
                floatingEditSettlingEndWorkItem = nil
                withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                    showFloatingEditButton = false
                }
            } else if floatingEditFABEligible(vm: vm, note: note) {
                presentFloatingEditOnNoteOpen(vm: vm, note: note)
                scheduleFloatingEditScrollSettlingEndIfNeeded()
            }
        }
        .onChange(of: noteEditorLongPressToEdit) { _, _ in
            refreshFloatingEditVisibility(vm: vm, note: note)
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

    // MARK: - Kanban Board

    private func isKanbanNote(_ note: NoteItem?) -> Bool {
        guard let note else { return false }
        if note.isCalendarRoot { return false }
        return note.isSemanticKanban
    }

    @ViewBuilder
    private func kanbanDetailView(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        VStack(spacing: 0) {
            editorStatusBanner(vm)
            draftBanner(vm)
            breadcrumbsBar(vm)
            titleSection(vm, note: note)
            Divider()
            KanbanBoardView(viewModel: vm, note: note) { navigateToNoteId = $0 }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    // MARK: - Presentation

    private func isPresentationNote(_ note: NoteItem?) -> Bool {
        guard let note else { return false }
        if note.isCalendarRoot { return false }
        return note.isSemanticPresentation
    }

    @ViewBuilder
    private func presentationDetailView(_ vm: NoteDetailViewModel, note: NoteItem) -> some View {
        VStack(spacing: 0) {
            editorStatusBanner(vm)
            draftBanner(vm)
            breadcrumbsBar(vm)
            titleSection(vm, note: note)
            Divider()
            PresentationNoteView(viewModel: vm, note: note) { navigateToNoteId = $0 }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
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
            await vm.refresh(force: true)
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
        if (note.type == .book || note.type == .collection), let vm, vm.cachedAnyChildHasGeolocationLabel() { return true }
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

    private func handleEditorPhotoPicks(_ images: [PhotoLibraryImage]) async {
        let batch = Array(images.prefix(20))
        guard !batch.isEmpty, let vm = viewModel else { return }
        // Reserve a slot per photo before the first upload, then fill them as each one lands.
        let webView = editorWebView
        Self.beginEditorImageBatch(webView: webView, count: batch.count)
        await vm.uploadPhotosAsAttachments(batch) { insert in
            Self.insertBatchImageInEditor(webView: webView, insert: insert)
        }
        Self.endEditorImageBatch(webView: webView)
    }

    private func handleEditorFilePick(_ result: Result<[URL], Error>) async {
        do {
            let urls = try result.get()
            guard let url = urls.first else { return }

            guard url.startAccessingSecurityScopedResource() else { return }
            defer { url.stopAccessingSecurityScopedResource() }

            let data = try Data(contentsOf: url)
            let mime = UTType(filenameExtension: url.pathExtension)?.preferredMIMEType ?? "application/octet-stream"
            let filename = url.lastPathComponent.isEmpty ? "attachment" : url.lastPathComponent

            if mime.hasPrefix("image/") {
                let imageData: Data
                let imageMime: String
                if let uiImage = UIImage(data: data), let jpeg = uiImage.jpegData(compressionQuality: 0.8) {
                    imageData = jpeg
                    imageMime = "image/jpeg"
                } else {
                    imageData = data
                    imageMime = mime
                }
                imageToInsert = "data:\(imageMime);base64,\(imageData.base64EncodedString())"
            } else {
                presentAttachmentUploadNamePrompt(data: data, mime: mime, filename: filename)
            }
        } catch {
            Log.ui.error("Editor file pick failed: \(error.localizedDescription)")
        }
    }

    @ViewBuilder
    private func codeEditingView(_ vm: NoteDetailViewModel) -> some View {
        @Bindable var vm = vm
        ZStack(alignment: .bottomTrailing) {
            TextEditor(text: $vm.editableContent)
                .font(.system(.body, design: .monospaced))
                .padding(.horizontal, 8)
                .scrollContentBackground(.hidden)
                .contentMargins(
                    .bottom,
                    NoteDetailFloatingChipLayout.scrollClearance(findBarPresented: false, editing: true),
                    for: .scrollContent
                )
                .background(Color(.systemGroupedBackground))
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(
                    NoteDetailScrollOffsetReader { y, verticallyScrollable, _ in
                        updateEditorSaveCancelChipVisibility(contentOffsetY: y, verticallyScrollable: verticallyScrollable)
                    }
                    .frame(width: 0, height: 0)
                )

            if showEditorSaveCancelChip {
                editorSaveChip(vm: vm)
                    .padding(.trailing, 16)
                    .padding(.bottom, 62)
                    .transition(.scale(scale: 0.88).combined(with: .opacity))
                    .zIndex(2)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
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
                if !vm.attachments.isEmpty {
                    Button {
                        showDeleteAllAttachmentsConfirm = true
                    } label: {
                        Label(
                            String(localized: "Remove All", comment: "Delete every attachment on the note"),
                            systemImage: "trash"
                        )
                    }
                    .disabled(vm.isSaving || !vm.isOnline)
                    .accessibilityLabel(
                        String(localized: "Remove all attachments", comment: "Accessibility label for delete-all attachments")
                    )
                }
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
                    AttachmentRow(attachment: attachment, viewModel: vm) { noteId, _ in
                        navigateToNoteId = noteId
                    }
                }
            }
        }
        .alert(
            String(localized: "Remove All Attachments?", comment: "Delete-all attachments confirm title"),
            isPresented: $showDeleteAllAttachmentsConfirm
        ) {
            Button(String(localized: "Cancel", comment: "Cancel delete-all attachments"), role: .cancel) {}
            Button(
                String(localized: "Remove All", comment: "Confirm delete-all attachments"),
                role: .destructive
            ) {
                Task { await vm.deleteAllAttachments() }
            }
        } message: {
            Text(
                String(
                    localized: "Delete all \(vm.attachments.count) attachments from this note? This cannot be undone.",
                    comment: "Delete-all attachments confirm message; count is substituted"
                )
            )
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
                            switch note.type {
                            case .canvas:
                                saveCanvasContent(vm: vm)
                            case .spreadsheet:
                                saveSpreadsheetContent(vm: vm)
                            default:
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
                        cancelNoteEditing(vm: vm, note: note)
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
                            String(localized: "Share locally unavailable (protected note)", comment: "Local share disabled"),
                            systemImage: "lock.fill"
                        )
                    }
                    .disabled(true)
                } else {
                    Button {
                        showShareLocally = true
                    } label: {
                        Label(
                            String(localized: "Share locally", comment: "Note overflow: nearby device transfer"),
                            systemImage: "square.and.arrow.up"
                        )
                    }
                }

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
            cancelNoteEditing(vm: vm, note: note)
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

/// Note types offered when creating a child note. Spreadsheet / Kanban / Presentation are gated by server version.
struct NewNoteTypePicker: View {
    @Binding var selection: NoteType
    var supportsSpreadsheet: Bool
    var supportsKanban: Bool = true
    var supportsPresentation: Bool = true
    /// When `false`, the picker stays on Text and cannot be changed (share-import flow).
    var isEnabled: Bool = true

    var body: some View {
        Picker(String(localized: "Type", comment: "New note type"), selection: $selection) {
            Text(String(localized: "Text", comment: "Note type")).tag(NoteType.text)
            Text(String(localized: "Code", comment: "Note type")).tag(NoteType.code)
            Text(String(localized: "Canvas", comment: "Note type")).tag(NoteType.canvas)
            Text(String(localized: "Mermaid", comment: "Note type")).tag(NoteType.mermaid)
            Text(String(localized: "Mind Map", comment: "Note type")).tag(NoteType.mindMap)
            if supportsSpreadsheet {
                Text(String(localized: "Spreadsheet", comment: "Note type")).tag(NoteType.spreadsheet)
            }
            Text(String(localized: "Geo Map", comment: "Note type")).tag(NoteType.geoMap)
            Text(String(localized: "Calendar", comment: "Note type: Trilium journal / calendar root")).tag(NoteType.calendar)
            if supportsKanban {
                Text(String(localized: "Kanban Board", comment: "Note type")).tag(NoteType.kanban)
            }
            if supportsPresentation {
                Text(String(localized: "Presentation", comment: "Note type")).tag(NoteType.presentation)
            }
        }
        .disabled(!isEnabled)
        .onChange(of: supportsSpreadsheet) { _, supported in
            if !supported, selection == .spreadsheet {
                selection = .text
            }
        }
        .onChange(of: supportsKanban) { _, supported in
            if !supported, selection == .kanban {
                selection = .text
            }
        }
        .onChange(of: supportsPresentation) { _, supported in
            if !supported, selection == .presentation {
                selection = .text
            }
        }
        .onChange(of: isEnabled) { _, enabled in
            if !enabled {
                selection = .text
            }
        }
    }
}

struct CreateChildNoteSheet: View {
    @Bindable var viewModel: NoteDetailViewModel
    var onNoteCreated: ((String, String) -> Void)?
    @Environment(\.dismiss) private var dismiss
    @Environment(AppState.self) private var appState

    private var supportsSpreadsheetNoteType: Bool {
        TriliumServerCompatibility.supportsSpreadsheetNotes(appState.serverAppInfo)
    }

    private var supportsKanbanNoteType: Bool {
        TriliumServerCompatibility.supportsKanbanNotes(appState.serverAppInfo)
    }

    private var supportsPresentationNoteType: Bool {
        TriliumServerCompatibility.supportsPresentationNotes(appState.serverAppInfo)
    }

    var body: some View {
        NavigationStack {
            Form {
                TextField(
                    String(localized: "Note Title (leave blank for default)", comment: "New child sheet"),
                    text: $viewModel.newNoteTitle
                )
                    .textInputAutocapitalization(.sentences)

                NewNoteTypePicker(
                    selection: $viewModel.newNoteType,
                    supportsSpreadsheet: supportsSpreadsheetNoteType,
                    supportsKanban: supportsKanbanNoteType,
                    supportsPresentation: supportsPresentationNoteType
                )
            }
            .navigationTitle(String(localized: "New Note", comment: "New child sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "New child sheet")) { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Create", comment: "New child sheet")) {
                        Task { await createAndDismiss() }
                    }
                    .disabled(viewModel.isSaving)
                }
            }
        }
        .presentationDetents([.medium])
    }

    private func createAndDismiss() async {
        let title = NoteCreationTitle.resolved(from: viewModel.newNoteTitle)
        if let noteId = await viewModel.createChildNote() {
            dismiss()
            onNoteCreated?(noteId, title)
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

// Make String Identifiable for navigationDestination
extension String: @retroactive Identifiable {
    public var id: String { self }
}

