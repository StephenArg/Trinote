import SwiftUI

/// Settings → Navigation Tabs: which tabs the iPhone tab bar shows, in what order, and the places behind the
/// Add Note and Pinned Note tabs. Changes apply to the bar as they are made.
struct MainTabsSettingsView: View {
    @Environment(AppState.self) private var appState
    @AppStorage(MainTabPreferences.shownTabsKey) private var shownTabsRaw: String = ""
    @AppStorage(MainTabPreferences.customIconsKey) private var customIconsRaw: String = ""
    @State private var iconPickerTab: MainTab?
    @State private var addNoteDefault: AddNoteDefault?
    @State private var addNoteKindDefault: AddNoteKindDefault?
    @State private var pinnedNote: NoteReference?
    @State private var showAddNoteParentPicker = false
    @State private var showAddNoteKindSheet = false
    @State private var showPinnedNotePicker = false
    @State private var addNoteInboxDestination: InboxDestination?

    private var shown: [MainTab] { MainTabPreferences.tabs(fromStored: shownTabsRaw) }

    private var available: [MainTab] {
        MainTab.allCases.filter { !shown.contains($0) && ($0 != .aiChat || appState.showsAIEntryPoints) }
    }

    private var customIcons: [MainTab: String] { MainTabPreferences.customIcons(fromStored: customIconsRaw) }

    private func icon(for tab: MainTab) -> String {
        MainTabPreferences.icon(for: tab, customIcons: customIcons)
    }

    private var isDefault: Bool { shown == MainTabPreferences.defaultTabs && customIcons.isEmpty }

    var body: some View {
        List {
            shownSection
            if !available.isEmpty {
                availableSection
            }
            if shown.contains(.addNote) {
                addNoteSection
            }
            if shown.contains(.pinnedNote) {
                pinnedNoteSection
            }
        }
        .listStyle(.insetGrouped)
        .navigationTitle(String(localized: "Navigation Tabs", comment: "Settings: tab bar tabs screen title"))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItemGroup(placement: .topBarTrailing) {
                Button(String(localized: "Reset", comment: "Navigation tabs: back to the default tabs")) {
                    save(MainTabPreferences.defaultTabs)
                    customIconsRaw = ""
                }
                .disabled(isDefault)
                EditButton()
            }
        }
        .task(id: appState.activeProfile?.id) { loadNoteChoices() }
        .sheet(item: $iconPickerTab) { tab in
            TabIconPickerSheet(tab: tab, current: customIcons[tab]) { symbol in
                var icons = customIcons
                icons[tab] = symbol
                customIconsRaw = icons.isEmpty ? "" : MainTabPreferences.encodeIcons(icons)
            }
        }
        .sheet(isPresented: $showAddNoteParentPicker) { addNoteParentPicker }
        .sheet(isPresented: $showAddNoteKindSheet) {
            AddNoteKindSheet(isCreating: false, rememberKind: nil) { _, kind in
                guard let profileId = appState.activeProfile?.id else { return }
                kind.save(profileId: profileId)
                addNoteKindDefault = kind
                noteChoicesChanged()
            }
            .environment(appState)
        }
        .sheet(isPresented: $showPinnedNotePicker) { pinnedNotePicker }
    }

    // MARK: - Tabs

    private var shownSection: some View {
        Section {
            ForEach(shown) { tab in
                Button {
                    iconPickerTab = tab
                } label: {
                    HStack {
                        Label(tab.title, systemImage: icon(for: tab))
                            .foregroundStyle(.primary)
                        Spacer()
                        if customIcons[tab] != nil {
                            Text(String(localized: "Custom", comment: "Navigation tabs: the tab has its own icon"))
                                .foregroundStyle(.secondary)
                        }
                        Image(systemName: "chevron.right")
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(.tertiary)
                    }
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .deleteDisabled(tab.isRequired)
            }
            .onMove { offsets, destination in
                var tabs = shown
                tabs.move(fromOffsets: offsets, toOffset: destination)
                save(tabs)
            }
            .onDelete { offsets in
                var tabs = shown
                tabs.remove(atOffsets: offsets)
                save(tabs)
            }
        } header: {
            Text(String(localized: "Shown", comment: "Navigation tabs: header of the tabs in the bar"))
        } footer: {
            if shown == [.notes] {
                Text(String(
                    localized: "With only Notes shown, the tab bar is hidden. Settings is in the … menu on the Notes screen.",
                    comment: "Navigation tabs: footer when Notes is the only tab"
                ))
            } else {
                Text(String(
                    localized: "Tap Edit to reorder or remove. Notes stays. With more than five tabs, iPhone keeps the rest under a More tab. Every location is also in the Go to menu on the Notes screen.",
                    comment: "Navigation tabs: footer under the tabs in the bar"
                ))
                + Text(verbatim: " ")
                + Text(String(localized: "Tap a tab to choose its icon.", comment: "Navigation tabs: footer sentence about custom icons"))
            }
        }
    }

    private var availableSection: some View {
        Section {
            ForEach(available) { tab in
                Button {
                    save(shown + [tab])
                } label: {
                    HStack(spacing: 12) {
                        Image(systemName: "plus.circle.fill")
                            .font(.title3)
                            .foregroundStyle(Color.green)
                        Label(tab.title, systemImage: icon(for: tab))
                            .foregroundStyle(.primary)
                    }
                }
                .buttonStyle(.plain)
                .accessibilityLabel(String(
                    format: String(localized: "Add %@", comment: "Navigation tabs: accessibility label of a row that adds a tab"),
                    tab.title
                ))
            }
        } header: {
            Text(String(localized: "Available", comment: "Navigation tabs: header of the tabs not in the bar"))
        }
    }

    private func save(_ tabs: [MainTab]) {
        shownTabsRaw = MainTabPreferences.encode(tabs)
    }

    // MARK: - Add Note

    private var addNoteSection: some View {
        Section {
            choiceRow(
                String(localized: "Default Location", comment: "Navigation tabs: where the Add Note tab creates notes"),
                value: addNoteDefault?.displayTitle,
                choose: { showAddNoteParentPicker = true },
                askEveryTime: {
                    guard let profileId = appState.activeProfile?.id else { return }
                    AddNoteDefault.remove(profileId: profileId)
                    addNoteDefault = nil
                    noteChoicesChanged()
                }
            )
            choiceRow(
                String(localized: "Note Type", comment: "Navigation tabs: the Add Note tab's default kind"),
                value: addNoteKindDefault?.displayTitle,
                choose: { showAddNoteKindSheet = true },
                askEveryTime: {
                    guard let profileId = appState.activeProfile?.id else { return }
                    AddNoteKindDefault.remove(profileId: profileId)
                    addNoteKindDefault = nil
                    noteChoicesChanged()
                }
            )
        } header: {
            Text(MainTab.addNote.title)
        } footer: {
            Text(String(
                localized: "With defaults, the Add Note tab makes the note there, of that kind, right away. Set to Ask every time, it asks, and each picker can remember your choice.",
                comment: "Navigation tabs: footer under the Add Note defaults"
            ))
        }
    }

    private var addNoteParentPicker: some View {
        ParentPickerSheet(
            navigationTitle: String(localized: "Default Location", comment: "Navigation tabs: where the Add Note tab creates notes"),
            instruction: String(localized: "Choose where the Add Note tab creates notes.", comment: "Navigation tabs: Add Note default picker instruction"),
            topLevelButtonTitle: "",
            showsTopLevelButton: false,
            rootHeaderPlacementTitle: String(localized: "Add as root note", comment: "Share import: place note at top level"),
            onPick: { parentNoteId, title, _ in
                setAddNoteDefault(.note(id: parentNoteId, title: title))
            },
            quickDestination: ParentPickerSheet.QuickDestination(
                title: String(localized: "Add to Inbox", comment: "Share import: put the note where Trilium puts captures"),
                subtitle: addNoteInboxDestination?.displayTitle,
                systemImage: "tray.and.arrow.down",
                isBusy: false,
                action: { setAddNoteDefault(.inbox) }
            )
        )
        .environment(appState)
        .task { addNoteInboxDestination = await InboxDestination.resolve(appState: appState) }
    }

    private func setAddNoteDefault(_ destination: AddNoteDefault) {
        guard let profileId = appState.activeProfile?.id else { return }
        destination.save(profileId: profileId)
        addNoteDefault = destination
        showAddNoteParentPicker = false
        noteChoicesChanged()
    }

    // MARK: - Pinned Note

    private var pinnedNoteSection: some View {
        Section {
            Button {
                showPinnedNotePicker = true
            } label: {
                valueRow(
                    String(localized: "Note", comment: "Navigation tabs: the pinned note row"),
                    value: pinnedNote?.title ?? String(localized: "None", comment: "Navigation tabs: no pinned note")
                )
            }
            .buttonStyle(.plain)
            if pinnedNote != nil {
                Button(String(localized: "Remove", comment: "Navigation tabs: forget the pinned note"), role: .destructive) {
                    guard let profileId = appState.activeProfile?.id else { return }
                    PinnedNoteTab.remove(profileId: profileId)
                    pinnedNote = nil
                    noteChoicesChanged()
                }
            }
        } header: {
            Text(MainTab.pinnedNote.title)
        } footer: {
            Text(String(
                localized: "The Pinned Note tab shows this note. Its title is the tab's name.",
                comment: "Navigation tabs: footer under the pinned note"
            ))
        }
    }

    private var pinnedNotePicker: some View {
        NotePickerSheet(
            excludeNoteId: nil,
            navigationTitleOverride: String(localized: "Pin a Note", comment: "Navigation tabs: pinned note picker title")
        ) { noteId, title in
            guard let profileId = appState.activeProfile?.id else { return }
            let note = NoteReference(noteId: noteId, title: title)
            PinnedNoteTab.save(note, profileId: profileId)
            pinnedNote = note
            noteChoicesChanged()
        }
        .environment(appState)
    }

    // MARK: - Shared

    /// A remembered choice, or "Ask every time": a menu to choose one or go back to asking.
    private func choiceRow(
        _ title: String,
        value: String?,
        choose: @escaping () -> Void,
        askEveryTime: @escaping () -> Void
    ) -> some View {
        let ask = String(localized: "Ask every time", comment: "Navigation tabs: no default place for new notes")
        return Menu {
            Button(String(localized: "Choose…", comment: "Navigation tabs: pick a default"), action: choose)
            Button(action: askEveryTime) {
                if value == nil {
                    Label(ask, systemImage: "checkmark")
                } else {
                    Text(ask)
                }
            }
        } label: {
            valueRow(title, value: value ?? ask)
        }
    }

    private func valueRow(_ title: String, value: String) -> some View {
        HStack {
            Text(title)
                .foregroundStyle(.primary)
            Spacer()
            Text(value)
                .foregroundStyle(.secondary)
                .lineLimit(1)
            Image(systemName: "chevron.right")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.tertiary)
        }
        .contentShape(Rectangle())
    }

    private func loadNoteChoices() {
        guard let profileId = appState.activeProfile?.id else {
            addNoteDefault = nil
            addNoteKindDefault = nil
            pinnedNote = nil
            return
        }
        addNoteDefault = AddNoteDefault.load(profileId: profileId)
        addNoteKindDefault = AddNoteKindDefault.load(profileId: profileId)
        pinnedNote = PinnedNoteTab.load(profileId: profileId)
    }

    private func noteChoicesChanged() {
        NotificationCenter.default.post(name: .trinoteTabNotePreferencesChanged, object: nil)
    }
}
