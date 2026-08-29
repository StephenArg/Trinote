import SwiftUI

/// Native swipeable presentation viewer for Trilium `#viewType=presentation` collections.
struct PresentationNoteView: View {
    @Bindable var viewModel: NoteDetailViewModel
    let note: NoteItem
    var onOpenSlide: (String) -> Void

    @State private var slides: [PresentationModels.Slide] = []
    @State private var theme: String = PresentationModels.defaultTheme
    @State private var isLoading = true
    @State private var isMutating = false
    @State private var currentIndex: Int = 0

    @State private var showAddSlide = false
    @State private var newSlideTitle = ""
    @State private var showThemePicker = false
    @State private var showReorderSheet = false
    @State private var showBackgroundEditor = false
    @State private var backgroundDraft = ""
    @State private var slideToDelete: PresentationModels.Slide?
    @State private var showDeleteConfirm = false

    var body: some View {
        VStack(spacing: 0) {
            toolbar
            Divider()
            if isLoading {
                ProgressView()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else if slides.isEmpty {
                ContentUnavailableView {
                    Label(
                        String(localized: "No Slides", comment: "Presentation empty title"),
                        systemImage: "rectangle.on.rectangle"
                    )
                } description: {
                    Text(String(localized: "Add a slide to start the presentation.", comment: "Presentation empty description"))
                } actions: {
                    Button(String(localized: "Add Slide", comment: "Presentation add slide")) {
                        showAddSlide = true
                    }
                    .buttonStyle(.borderedProminent)
                }
            } else {
                TabView(selection: $currentIndex) {
                    ForEach(Array(slides.enumerated()), id: \.element.id) { index, slide in
                        slidePage(slide)
                            .tag(index)
                    }
                }
                .tabViewStyle(.page(indexDisplayMode: .automatic))
                .background(themeBackground)
            }
        }
        .disabled(isMutating)
        .overlay {
            if isMutating {
                ProgressView()
                    .padding()
                    .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
            }
        }
        .task(id: note.noteId) {
            await reload()
        }
        .alert(
            String(localized: "Add Slide", comment: "Presentation add slide"),
            isPresented: $showAddSlide
        ) {
            TextField(String(localized: "Slide title", comment: "Presentation slide title"), text: $newSlideTitle)
            Button(String(localized: "Cancel", comment: "Cancel")) { newSlideTitle = "" }
            Button(String(localized: "Add", comment: "Add")) {
                Task { await addSlide() }
            }
        }
        .confirmationDialog(
            String(localized: "Delete Slide?", comment: "Presentation delete slide"),
            isPresented: $showDeleteConfirm,
            titleVisibility: .visible
        ) {
            Button(String(localized: "Delete", comment: "Delete"), role: .destructive) {
                Task { await deleteCurrentSlide() }
            }
            Button(String(localized: "Cancel", comment: "Cancel"), role: .cancel) {}
        } message: {
            if let slide = slideToDelete {
                Text(slide.title)
            }
        }
        .sheet(isPresented: $showThemePicker) {
            themePickerSheet
        }
        .sheet(isPresented: $showReorderSheet) {
            reorderSheet
        }
        .alert(
            String(localized: "Slide Background", comment: "Presentation slide background"),
            isPresented: $showBackgroundEditor
        ) {
            TextField(
                String(localized: "Hex color or CSS gradient", comment: "Presentation background field"),
                text: $backgroundDraft
            )
            Button(String(localized: "Cancel", comment: "Cancel")) {}
            Button(String(localized: "Save", comment: "Save")) {
                Task { await saveBackground() }
            }
            Button(String(localized: "Clear", comment: "Clear background"), role: .destructive) {
                Task {
                    backgroundDraft = ""
                    await saveBackground()
                }
            }
        }
    }

    private var themeBackground: Color {
        PresentationModels.themeColors(for: theme).background
    }

    @ViewBuilder
    private var toolbar: some View {
        HStack(spacing: 10) {
            if !slides.isEmpty {
                Text("\(currentIndex + 1) / \(slides.count)")
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Button {
                showAddSlide = true
            } label: {
                Image(systemName: "plus.rectangle.on.folder")
            }
            .accessibilityLabel(String(localized: "Add Slide", comment: "Presentation add slide"))

            Menu {
                Button {
                    showThemePicker = true
                } label: {
                    Label(String(localized: "Theme", comment: "Presentation theme"), systemImage: "paintpalette")
                }
                Button {
                    showReorderSheet = true
                } label: {
                    Label(String(localized: "Reorder Slides", comment: "Presentation reorder"), systemImage: "arrow.up.arrow.down")
                }
                if let slide = currentSlide {
                    Button {
                        onOpenSlide(slide.noteId)
                    } label: {
                        Label(String(localized: "Edit Slide", comment: "Presentation edit slide"), systemImage: "pencil")
                    }
                    Button {
                        backgroundDraft = slide.background ?? ""
                        showBackgroundEditor = true
                    } label: {
                        Label(String(localized: "Background…", comment: "Presentation slide background menu"), systemImage: "paintbrush")
                    }
                    Button(role: .destructive) {
                        slideToDelete = slide
                        showDeleteConfirm = true
                    } label: {
                        Label(String(localized: "Delete Slide", comment: "Presentation delete slide"), systemImage: "trash")
                    }
                }
                Button {
                    Task { await reload() }
                } label: {
                    Label(String(localized: "Refresh", comment: "Refresh"), systemImage: "arrow.clockwise")
                }
            } label: {
                Image(systemName: "ellipsis.circle")
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
    }

    private var currentSlide: PresentationModels.Slide? {
        guard currentIndex >= 0, currentIndex < slides.count else { return nil }
        return slides[currentIndex]
    }

    @ViewBuilder
    private func slidePage(_ slide: PresentationModels.Slide) -> some View {
        let colors = PresentationModels.themeColors(for: theme)
        Group {
            if slide.verticalSlides.isEmpty {
                slideContent(slide, colors: colors)
            } else {
                TabView {
                    slideContent(slide, colors: colors)
                    ForEach(slide.verticalSlides) { vertical in
                        slideContent(vertical, colors: colors)
                    }
                }
                .tabViewStyle(.page(indexDisplayMode: .automatic))
            }
        }
    }

    @ViewBuilder
    private func slideContent(
        _ slide: PresentationModels.Slide,
        colors: (background: Color, foreground: Color)
    ) -> some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                Text(slide.title)
                    .font(.title2.weight(.semibold))
                    .foregroundStyle(colors.foreground)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 16)
                    .padding(.top, 16)

                if slide.html.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                    Text(String(localized: "Empty slide — tap Edit to add content.", comment: "Presentation empty slide body"))
                        .foregroundStyle(.secondary)
                        .padding(.horizontal, 16)
                } else {
                    HTMLNoteView(
                        html: slide.html,
                        baseURL: viewModel.serverBaseURL,
                        onNoteLinkTapped: { noteId in
                            onOpenSlide(noteId)
                        },
                        imageBytes: { routeType, entityId in
                            await viewModel.loadImageBytes(routeType: routeType, entityId: entityId)
                        },
                        allowCollapsibleReorder: false
                    )
                    .padding(.horizontal, 8)
                }
            }
            .padding(.bottom, 24)
        }
        .background(slideBackground(slide, themeBackground: colors.background))
        .onTapGesture(count: 2) {
            onOpenSlide(slide.noteId)
        }
    }

    @ViewBuilder
    private func slideBackground(_ slide: PresentationModels.Slide, themeBackground: Color) -> some View {
        if let bg = slide.background?.trimmingCharacters(in: .whitespacesAndNewlines), !bg.isEmpty {
            if PresentationModels.isGradientBackground(bg) {
                themeBackground
            } else if let color = Color(hexOrCSS: bg) {
                color
            } else {
                themeBackground
            }
        } else {
            themeBackground
        }
    }

    private var themePickerSheet: some View {
        NavigationStack {
            List {
                ForEach(PresentationModels.knownThemes, id: \.self) { name in
                    Button {
                        Task {
                            showThemePicker = false
                            await setTheme(name)
                        }
                    } label: {
                        HStack {
                            Text(name.capitalized)
                            Spacer()
                            if PresentationModels.normalizedTheme(theme) == name {
                                Image(systemName: "checkmark")
                            }
                        }
                    }
                }
            }
            .navigationTitle(String(localized: "Theme", comment: "Presentation theme"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Done", comment: "Done")) { showThemePicker = false }
                }
            }
        }
        .presentationDetents([.medium])
    }

    private var reorderSheet: some View {
        NavigationStack {
            List {
                ForEach(slides) { slide in
                    Text(slide.title)
                }
                .onMove { source, destination in
                    slides.move(fromOffsets: source, toOffset: destination)
                }
            }
            .environment(\.editMode, .constant(.active))
            .navigationTitle(String(localized: "Reorder Slides", comment: "Presentation reorder"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Cancel")) {
                        showReorderSheet = false
                        Task { await reload() }
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Save", comment: "Save")) {
                        Task { await saveReorder() }
                    }
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private func reload() async {
        isLoading = true
        defer { isLoading = false }
        let result = await viewModel.loadPresentationSlides(for: note)
        var rewritten: [PresentationModels.Slide] = []
        rewritten.reserveCapacity(result.slides.count)
        for slide in result.slides {
            let html = await viewModel.htmlForReadOnlyDisplay(slide.html)
            var vertical: [PresentationModels.Slide] = []
            vertical.reserveCapacity(slide.verticalSlides.count)
            for nested in slide.verticalSlides {
                vertical.append(
                    PresentationModels.Slide(
                        noteId: nested.noteId,
                        branchId: nested.branchId,
                        title: nested.title,
                        html: await viewModel.htmlForReadOnlyDisplay(nested.html),
                        background: nested.background,
                        verticalSlides: []
                    )
                )
            }
            rewritten.append(
                PresentationModels.Slide(
                    noteId: slide.noteId,
                    branchId: slide.branchId,
                    title: slide.title,
                    html: html,
                    background: slide.background,
                    verticalSlides: vertical
                )
            )
        }
        slides = rewritten
        theme = result.theme
        if currentIndex >= slides.count {
            currentIndex = max(0, slides.count - 1)
        }
    }

    private func addSlide() async {
        let title = newSlideTitle
        newSlideTitle = ""
        isMutating = true
        defer { isMutating = false }
        if let id = await viewModel.createPresentationSlide(title: title) {
            await reload()
            if let idx = slides.firstIndex(where: { $0.noteId == id }) {
                currentIndex = idx
            } else if !slides.isEmpty {
                currentIndex = slides.count - 1
            }
        }
    }

    private func deleteCurrentSlide() async {
        guard let slide = slideToDelete else { return }
        slideToDelete = nil
        isMutating = true
        defer { isMutating = false }
        if await viewModel.deleteChildNote(noteId: slide.noteId) {
            await reload()
        }
    }

    private func setTheme(_ name: String) async {
        isMutating = true
        defer { isMutating = false }
        if await viewModel.setNoteLabel(noteId: note.noteId, name: "presentation:theme", value: name) {
            theme = name
        }
    }

    private func saveBackground() async {
        guard let slide = currentSlide else { return }
        isMutating = true
        defer { isMutating = false }
        let value = backgroundDraft.trimmingCharacters(in: .whitespacesAndNewlines)
        if value.isEmpty {
            // Clear: delete existing label by setting empty then deleting via get+delete would be cleaner;
            // use set with empty then reload — Trilium treats empty as absent for display.
            if await viewModel.setNoteLabel(noteId: slide.noteId, name: "slide:background", value: "") {
                await reload()
            }
        } else if await viewModel.setNoteLabel(noteId: slide.noteId, name: "slide:background", value: value) {
            await reload()
        }
    }

    private func saveReorder() async {
        let branchIds = slides.map(\.branchId).filter { !$0.isEmpty }
        guard branchIds.count == slides.count, let first = branchIds.first else {
            showReorderSheet = false
            return
        }
        isMutating = true
        defer { isMutating = false }
        // placeBranchInSiblingOrder places one branch relative to neighbors; walk the desired order.
        var ok = true
        for branchId in branchIds {
            let placed = await viewModel.reorderPresentationSlide(
                branchId: branchId,
                orderedSiblingBranchIds: branchIds
            )
            if !placed {
                ok = false
                break
            }
        }
        _ = first
        showReorderSheet = false
        if ok {
            await reload()
        }
    }
}

// MARK: - Color helpers

private extension Color {
    /// Parses `#RRGGBB`, `#RGB`, or `rgb(...)` loosely for slide backgrounds.
    init?(hexOrCSS: String) {
        var s = hexOrCSS.trimmingCharacters(in: .whitespacesAndNewlines)
        if s.hasPrefix("#") {
            s.removeFirst()
            if s.count == 3 {
                s = s.map { "\($0)\($0)" }.joined()
            }
            guard s.count == 6, let value = UInt32(s, radix: 16) else { return nil }
            let r = Double((value >> 16) & 0xFF) / 255
            let g = Double((value >> 8) & 0xFF) / 255
            let b = Double(value & 0xFF) / 255
            self = Color(red: r, green: g, blue: b)
            return
        }
        return nil
    }
}
