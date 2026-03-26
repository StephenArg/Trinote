import Combine
import SwiftUI
import PhotosUI
import UIKit

/// Which ⋯ menu command to mirror on the trailing toolbar; stored in `UserDefaults` via `@AppStorage`.

/// Tracked ⋯ menu actions mirrored on the trailing toolbar (delete, edit, and cancel editing are never tracked).
private enum NoteDetailToolbarQuickAction: String, CaseIterable {
    case cancelEditing
    case newChild
    case duplicate
    case rename
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

    init(
        noteId: String,
        title: String,
        seedChildSummaries: [ChildNoteSummary]? = nil,
        startInEditMode: Bool = false,
        pendingFindQuery: String? = nil,
        pendingFindMatchIndex: Int? = nil
    ) {
        self.noteId = noteId
        self.title = title
        self.seedChildSummaries = seedChildSummaries
        self.startInEditMode = startInEditMode
        self.pendingFindQuery = pendingFindQuery
        self.pendingFindMatchIndex = pendingFindMatchIndex
        _activeNoteId = State(initialValue: noteId)
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
    @AppStorage("noteDetailLastToolbarMenuAction") private var lastToolbarQuickActionRaw: String = NoteDetailToolbarQuickAction.rename.rawValue

    /// Aligns “Copy share link” / “Share link…” with the Share/Sharing title (after `scale.3d` column).
    private static let sharingSubmenuTitleLeadingInset: CGFloat = 36

    /// Floating Edit chip: shown when opening an editable note; hides on scroll **up**, shows on scroll **down**.
    @State private var showFloatingEditButton = false
    @State private var lastScrollContentOffsetY: CGFloat = 0
    @State private var floatingEditScrollBaselineReady = false

    /// Save/cancel chip while editing: hide on scroll up, show on scroll down (same rules as read-mode edit FAB).
    @State private var showEditorSaveCancelChip = true
    @State private var lastEditorScrollOffsetY: CGFloat = 0
    @State private var editorSaveCancelScrollBaselineReady = false

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

    /// Uses the same delta rules as `updateFloatingEditVisibility` (`contentOffset.y` / `scrollTop` increases when scrolling down).
    private func updateEditorSaveCancelChipVisibility(contentOffsetY: CGFloat) {
        if !editorSaveCancelScrollBaselineReady {
            editorSaveCancelScrollBaselineReady = true
            lastEditorScrollOffsetY = contentOffsetY
            return
        }

        let directionalThreshold: CGFloat = 10
        let delta = contentOffsetY - lastEditorScrollOffsetY
        lastEditorScrollOffsetY = contentOffsetY

        let nextVisible: Bool
        if delta < -directionalThreshold {
            nextVisible = false
        } else if delta > directionalThreshold {
            nextVisible = true
        } else {
            return
        }

        if nextVisible != showEditorSaveCancelChip {
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showEditorSaveCancelChip = nextVisible
            }
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

    /// Save-only floating chip (cancel is in the note toolbar menu / quick action while editing).
    @ViewBuilder
    private func editorSaveChip(vm: NoteDetailViewModel) -> some View {
        Button {
            Task { await vm.saveContent() }
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
            .task(id: activeNoteId) { await initialLoad() }
            .navigationDestination(item: $navigateToNoteId) { linkedNoteId in
                NoteDetailView(noteId: linkedNoteId, title: "")
            }
            .toolbar(viewModel?.isEditing == true ? .hidden : .visible, for: .tabBar)
            .animation(.easeInOut(duration: 0.2), value: viewModel?.isEditing)
            .overlay { bodyChangeListeners }
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
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
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
            if startInEditMode, vm.note != nil {
                vm.isEditing = true
            }
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
                Task { await vm.loadChildNotes() }
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
            ProgressView("Loading note…")
        } else if let error = vm.error, vm.note == nil {
            ContentUnavailableView {
                Label("Error", systemImage: "exclamationmark.triangle")
            } description: {
                Text(error)
            } actions: {
                Button("Retry") { Task { await vm.load() } }
                    .buttonStyle(.bordered)
            }
        } else if let note = vm.note {
            VStack(spacing: 0) {
                if vm.needsProtectedSession {
                    protectedNoteOverlay(vm, note: note)
                } else if vm.isEditing && note.type == .text {
                    VStack(spacing: 0) {
                        editorStatusBanner(vm)
                        richTextEditingView(vm)
                            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
                    }
                    .background(Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal]))
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
                                NoteDetailScrollOffsetReader { y in
                                    updateFloatingEditVisibility(
                                        contentOffsetY: y,
                                        vm: vm,
                                        note: note
                                    )
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
            .alert("Error", isPresented: $vm.showSaveError) {
                Button("OK") { vm.showSaveError = false }
            } message: {
                Text(vm.saveError ?? "An unknown error occurred.")
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
                Button("Cancel", role: .cancel) {
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
            .alert("Delete Note?", isPresented: $vm.showDeleteConfirm) {
                Button("Cancel", role: .cancel) {}
                Button("Delete", role: .destructive) {
                    Task {
                        if await vm.deleteNote() { dismiss() }
                    }
                }
            } message: {
                Text("This will delete \"\(uiTitle(for: note))\" and all its sub-notes. This cannot be undone easily.")
            }
            .confirmationDialog("Unsaved Draft", isPresented: $vm.showDiscardDraft) {
                Button("Restore Draft") { vm.restoreDraft() }
                Button("Discard Draft", role: .destructive) { vm.discardDraft() }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("You have an unsaved draft for this note. Would you like to restore it?")
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

            Text("Protected Note")
                .font(.title2.bold())

            Text("Enter the same document password you use in Trilium for protected notes. It stays active until you sign out or the server ends the session.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 28)

            SecureField("Document password", text: $protectedDocumentPassword)
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
                        Text("Unlock")
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
                Text("Unsaved draft available")
                    .font(.caption.weight(.medium))
                Spacer()
                Button("Restore") { vm.restoreDraft() }
                    .font(.caption)
                    .buttonStyle(.bordered)
                    .controlSize(.mini)
                Button("Discard") { vm.discardDraft() }
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
                            TextField("Title", text: $vm.editedTitle)
                                .font(.title2.bold())
                                .textFieldStyle(.roundedBorder)
                            Button("Save") {
                                Task { await vm.renameNote() }
                            }
                            .buttonStyle(.borderedProminent)
                            .controlSize(.small)
                            .disabled(vm.isSaving)
                            Button("Cancel") { vm.editingTitle = false }
                                .buttonStyle(.bordered)
                                .controlSize(.small)
                        }
                        if let modified = lastChangedCaption(for: note) {
                            Text(modified)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .accessibilityLabel("Last changed \(modified)")
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
                                .accessibilityLabel("Last changed \(modified)")
                        }
                    }
                    Spacer(minLength: 0)
                }
                .onTapGesture {
                    vm.editedTitle = note.title
                    vm.editingTitle = true
                }
                .accessibilityLabel("Note title: \(uiTitle(for: note)). Tap to edit.")
            }

            HStack(spacing: 12) {
                // Label(note.type.displayName, systemImage: note.type.iconName)
                //     .font(.caption)
                //     .foregroundStyle(.secondary)

                if note.isSharedWithMultipleTreePlacements {
                    Label("Sharing", systemImage: "scale.3d")
                        .font(.caption)
                        .foregroundStyle(Color.green)
                    Label("Cloned (\(note.parentNoteIds.count) parents)", systemImage: "arrow.triangle.branch")
                        .font(.caption)
                        .foregroundStyle(.orange)
                } else if note.showsSharingBadge {
                    Label("Sharing", systemImage: "scale.3d")
                        .font(.caption)
                        .foregroundStyle(Color.green)
                } else if note.showsMultiCloneBadge {
                    Label("Cloned (\(note.parentNoteIds.count) parents)", systemImage: "arrow.triangle.branch")
                        .font(.caption)
                        .foregroundStyle(.orange)
                }

                if note.isProtected {
                    Label("Protected", systemImage: "lock.fill")
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
            ProgressView("Loading content…")
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
        case .book:
            BookNoteView(note: note)
        default:
            UnsupportedNoteView(note: note, serverURL: appState.activeProfile?.normalizedBaseURL)
        }
    }

    @ViewBuilder
    private func childNotesSection(_ vm: NoteDetailViewModel) -> some View {
        if !vm.childNotes.isEmpty {
            VStack(alignment: .leading, spacing: 0) {
                Divider()
                Text("Sub-notes")
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
        ZStack(alignment: .bottomTrailing) {
            RichTextEditorView(
                initialHTML: vm.editableContent,
                onContentChanged: { html in vm.receiveEditorUpdate(html) },
                onPickImage: { showEditorImageSourceDialog = true },
                onEditorScroll: { y in
                    updateEditorSaveCancelChipVisibility(contentOffsetY: y)
                },
                imageToInsert: $imageToInsert
            )
            // Fill remaining height so the WKWebView isn’t vertically compressed in a way that clips
            // the HTML toolbar when the keyboard steals space (minHeight: 400 overflowed the layout).
            .frame(maxWidth: .infinity, minHeight: 200, maxHeight: .infinity)

            if showEditorSaveCancelChip {
                editorSaveChip(vm: vm)
                    .padding(.trailing, 16)
                    .padding(.bottom, 12)
                    .transition(.scale(scale: 0.88).combined(with: .opacity))
                    .zIndex(2)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .background(Color(uiColor: .trinoteEditorCanvas).ignoresSafeArea(edges: [.bottom, .horizontal]))
        .onAppear {
            editorSaveCancelScrollBaselineReady = false
            lastEditorScrollOffsetY = 0
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showEditorSaveCancelChip = true
            }
        }
        .confirmationDialog("Add Image", isPresented: $showEditorImageSourceDialog) {
            Button("Photo Library") { showEditorImagePicker = true }
            if UIImagePickerController.isSourceTypeAvailable(.camera) {
                Button("Camera") { showEditorCamera = true }
            }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("Choose a source for the image")
        }
        .photosPicker(isPresented: $showEditorImagePicker, selection: $editorImageItem, matching: .images)
        .onChange(of: editorImageItem) { _, item in
            guard let item else { return }
            Task { await handleEditorImagePick(item) }
        }
        .fullScreenCover(isPresented: $showEditorCamera) {
            CameraPickerView(imageToInsert: $imageToInsert) { showEditorCamera = false }
        }
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
                    Text("Source")
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
                        NoteDetailScrollOffsetReader { y in
                            updateEditorSaveCancelChipVisibility(contentOffsetY: y)
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
            withAnimation(.spring(response: 0.38, dampingFraction: 0.82)) {
                showEditorSaveCancelChip = true
            }
        }
    }

    @ViewBuilder
    private func attachmentsSection(_ vm: NoteDetailViewModel) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Divider()
            HStack {
                Text("Attachments")
                    .font(.headline)
                Spacer()
                AttachmentUploadButton(noteId: vm.noteId, viewModel: vm)
            }
            .padding(.horizontal)
            .padding(.top, 8)

            if vm.attachments.isEmpty {
                Text("No attachments")
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
                LabeledContent("Note ID", value: note.noteId)
                LabeledContent("Type", value: note.type.displayName)
                LabeledContent("MIME", value: note.mime)
                if !note.dateCreated.isEmpty {
                    LabeledContent("Created", value: note.dateCreated)
                }
                if !note.dateModified.isEmpty {
                    LabeledContent("Modified", value: note.dateModified)
                }
            }
            .font(.caption)

            if !note.attributes.isEmpty {
                Text("Attributes")
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
                            vm.cancelEditing()
                        } else {
                            vm.startEditing()
                        }
                    } label: {
                        if vm.isEditing {
                            Label(
                                String(localized: "Read Mode", comment: "Leave note editor"),
                                systemImage: "eye"
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
                    .disabled(vm.needsProtectedSession)
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
                        Label("New Child Note", systemImage: "plus")
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
                        Label("Duplicate", systemImage: "doc.on.doc")
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
                    recordToolbarQuickAction(.rename)
                    vm.editedTitle = note.title
                    vm.editingTitle = true
                } label: {
                    Label("Rename", systemImage: "pencil")
                }

                Divider()

                Button {
                    recordToolbarQuickAction(.noteDetails)
                    withAnimation { vm.showDetails.toggle() }
                } label: {
                    Label(vm.showDetails ? "Hide Details" : "Note Details", systemImage: vm.showDetails ? "info.circle.fill" : "info.circle")
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
                            Label("Remove from Favorites", systemImage: "star.slash")
                        } else {
                            Label("Add to Favorites", systemImage: "star")
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
                    Label("Delete Note", systemImage: "trash")
                }
            } label: {
                Image(systemName: "ellipsis.circle")
            }
            .accessibilityLabel("Note actions")
        }
    }

    private func recordToolbarQuickAction(_ action: NoteDetailToolbarQuickAction) {
        lastToolbarQuickActionRaw = action.rawValue
    }

    private func toolbarQuickActionCandidates(preferred: NoteDetailToolbarQuickAction) -> [NoteDetailToolbarQuickAction] {
        [preferred] + NoteDetailToolbarQuickAction.allCases.filter { $0 != preferred }
    }

    private func firstAvailableToolbarQuickAction(vm: NoteDetailViewModel, note: NoteItem) -> NoteDetailToolbarQuickAction? {
        // Legacy "edit" raw value no longer matches a case → falls back to .rename.
        let preferred = NoteDetailToolbarQuickAction(rawValue: lastToolbarQuickActionRaw) ?? .rename
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
        case .rename, .noteDetails: return true
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
        case .rename:
            vm.editedTitle = note.title
            vm.editingTitle = true
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
        case .rename:
            Image(systemName: "square.and.pencil")
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
        case .rename:
            return String(localized: "Rename note", comment: "Toolbar repeat last action")
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
                TextField("Note Title", text: $viewModel.newNoteTitle)
                    .textInputAutocapitalization(.sentences)

                Picker("Type", selection: $viewModel.newNoteType) {
                    Text("Text").tag(NoteType.text)
                    Text("Code").tag(NoteType.code)
                }
            }
            .navigationTitle("New Note")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Create") {
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

// Make String Identifiable for navigationDestination
extension String: @retroactive Identifiable {
    public var id: String { self }
}

