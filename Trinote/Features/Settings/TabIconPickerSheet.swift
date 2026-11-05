import SwiftUI

/// Picks an SF Symbol for one navigation tab: groups to browse, or a search over every symbol iOS 18 knows.
struct TabIconPickerSheet: View {
    let tab: MainTab
    /// The symbol chosen before, if any.
    let current: String?
    /// The chosen symbol name, or nil for the tab's own icon.
    let onPick: (String?) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var selection: String
    @State private var query = ""

    init(tab: MainTab, current: String?, onPick: @escaping (String?) -> Void) {
        self.tab = tab
        self.current = current
        self.onPick = onPick
        _selection = State(initialValue: current ?? "")
    }

    private var previewSymbol: String { selection.isEmpty ? tab.icon : selection }
    private var trimmedQuery: String { query.trimmingCharacters(in: .whitespaces) }

    private static let columns = [GridItem(.adaptive(minimum: 44), spacing: 10)]

    var body: some View {
        NavigationStack {
            List {
                Section {
                    HStack(spacing: 12) {
                        Image(systemName: previewSymbol)
                            .font(.title2)
                            .frame(width: 32)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(tab.title)
                            Text(verbatim: previewSymbol)
                                .font(.caption.monospaced())
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                        if !selection.isEmpty {
                            Button(String(localized: "Use Default Icon", comment: "Tab icon picker: back to the tab's own icon")) {
                                selection = ""
                            }
                            .buttonStyle(.borderless)
                            .font(.subheadline)
                        }
                    }
                }

                if trimmedQuery.isEmpty {
                    ForEach(TabIconCatalog.groups, id: \.title) { group in
                        Section(group.title) {
                            grid(group.symbols)
                        }
                    }
                } else {
                    let matches = TabIconCatalog.search(trimmedQuery)
                    Section {
                        if matches.isEmpty {
                            Text(String(localized: "No symbols match.", comment: "Tab icon picker: empty search result"))
                                .foregroundStyle(.secondary)
                        } else {
                            grid(matches)
                        }
                    } header: {
                        Text(String(localized: "Matches", comment: "Tab icon picker: search results header"))
                    } footer: {
                        if matches.count == TabIconCatalog.searchLimit {
                            Text(String(localized: "Showing the first matches. Type more of the name to narrow them.", comment: "Tab icon picker: search capped"))
                        }
                    }
                }
            }
            .searchable(
                text: $query,
                placement: .navigationBarDrawer(displayMode: .always),
                prompt: Text(String(localized: "Search symbols", comment: "Tab icon picker: search field prompt"))
            )
            .autocorrectionDisabled()
            .textInputAutocapitalization(.never)
            .navigationTitle(String(localized: "Tab Icon", comment: "Tab icon picker title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss sheet")) { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Done", comment: "Tab icon picker: keep the chosen icon")) {
                        onPick(selection.isEmpty ? nil : selection)
                        dismiss()
                    }
                }
            }
        }
    }

    private func grid(_ symbols: [String]) -> some View {
        LazyVGrid(columns: Self.columns, spacing: 10) {
            ForEach(symbols, id: \.self) { symbol in
                Button {
                    selection = symbol
                } label: {
                    Image(systemName: symbol)
                        .font(.title3)
                        .frame(width: 44, height: 44)
                        .background(
                            RoundedRectangle(cornerRadius: 10, style: .continuous)
                                .fill(symbol == selection ? Color.accentColor.opacity(0.18) : Color.clear)
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 10, style: .continuous)
                                .stroke(symbol == selection ? Color.accentColor : Color.clear, lineWidth: 1.5)
                        )
                }
                .buttonStyle(.plain)
                .accessibilityLabel(symbol)
                .accessibilityAddTraits(symbol == selection ? .isSelected : [])
            }
        }
        .padding(.vertical, 4)
    }
}

/// The symbols the tab icon picker offers: hand-picked groups to browse, and every name iOS 18.0 ships for search
/// (`SFSymbolNames.txt`, from Apple's catalog). Names the device doesn't know are dropped.
enum TabIconCatalog {
    struct Group {
        let title: String
        let symbols: [String]
    }

    static let searchLimit = 240

    static let groups: [Group] = curated.map { Group(title: $0.title, symbols: $0.symbols.filter(MainTabPreferences.isSymbol)) }

    /// Every symbol name, loaded once.
    static let allSymbols: [String] = {
        guard let url = Bundle.main.url(forResource: "SFSymbolNames", withExtension: "txt"),
              let text = try? String(contentsOf: url, encoding: .utf8)
        else { return curated.flatMap(\.symbols) }
        return text.split(separator: "\n").map(String.init)
    }()

    /// Names containing `query` (case-insensitive), those starting with it first; a full name the device knows but the
    /// list lacks (a newer symbol) comes first.
    static func search(_ query: String) -> [String] {
        let q = query.lowercased()
        var results = allSymbols.filter { $0.contains(q) }
        results.sort { ($0.hasPrefix(q) ? 0 : 1, $0) < ($1.hasPrefix(q) ? 0 : 1, $1) }
        if !results.contains(q), MainTabPreferences.isSymbol(q) {
            results.insert(q, at: 0)
        }
        return Array(results.prefix(searchLimit))
    }

    private static let curated: [Group] = [
        Group(title: String(localized: "Notes & Documents", comment: "Tab icon picker: symbol group"), symbols: [
            "note.text", "doc.text.fill", "doc.fill", "doc.on.doc.fill", "doc.richtext.fill", "doc.plaintext.fill",
            "text.document.fill", "book.fill", "book.closed.fill", "text.book.closed.fill", "books.vertical.fill",
            "magazine.fill", "newspaper.fill", "pencil", "pencil.line", "square.and.pencil", "highlighter",
            "scribble", "paperclip", "folder.fill", "folder.badge.plus", "tray.fill", "tray.full.fill",
            "tray.2.fill", "archivebox.fill", "clipboard.fill", "list.clipboard.fill", "list.bullet", "list.number",
            "checklist", "text.alignleft", "quote.bubble.fill", "character.book.closed.fill",
        ]),
        Group(title: String(localized: "Organize", comment: "Tab icon picker: symbol group"), symbols: [
            "star.fill", "bookmark.fill", "pin.fill", "tag.fill", "flag.fill", "checkmark.circle.fill",
            "checkmark.square.fill", "square.grid.2x2.fill", "square.grid.3x3.fill", "rectangle.3.group.fill",
            "tablecells.fill", "rectangle.split.3x1.fill", "chart.bar.fill", "chart.pie.fill",
            "chart.line.uptrend.xyaxis", "number", "link", "arrow.triangle.branch",
            "point.3.connected.trianglepath.dotted", "circle.grid.3x3.fill", "tray.and.arrow.down.fill",
            "magnifyingglass", "slider.horizontal.3", "line.3.horizontal", "filemenu.and.selection", "target",
            "scope", "trash.fill", "square.stack.fill", "rectangle.stack.fill",
        ]),
        Group(title: String(localized: "Time", comment: "Tab icon picker: symbol group"), symbols: [
            "clock.fill", "clock.arrow.circlepath", "alarm.fill", "timer", "hourglass", "calendar",
            "calendar.badge.clock", "calendar.badge.plus", "calendar.circle.fill", "sun.max.fill", "sunrise.fill",
            "sunset.fill", "moon.fill", "moon.stars.fill", "sparkles", "bell.fill", "bell.badge.fill",
            "stopwatch.fill", "deskclock.fill", "clock.badge.checkmark.fill", "arrow.counterclockwise.circle.fill",
        ]),
        Group(title: String(localized: "People & Talk", comment: "Tab icon picker: symbol group"), symbols: [
            "person.fill", "person.2.fill", "person.3.fill", "person.crop.circle.fill", "figure.wave",
            "hand.raised.fill", "hand.thumbsup.fill", "heart.fill", "envelope.fill", "phone.fill", "message.fill",
            "bubble.left.fill", "bubble.left.and.bubble.right.fill", "megaphone.fill", "mic.fill", "video.fill",
            "at", "brain", "brain.head.profile", "face.smiling.fill", "graduationcap.fill", "lightbulb.fill",
            "questionmark.bubble.fill", "text.bubble.fill",
        ]),
        Group(title: String(localized: "Places & Travel", comment: "Tab icon picker: symbol group"), symbols: [
            "house.fill", "building.2.fill", "building.columns.fill", "map.fill", "mappin.and.ellipse",
            "location.fill", "globe", "globe.americas.fill", "globe.europe.africa.fill", "airplane", "car.fill",
            "bus.fill", "tram.fill", "bicycle", "figure.walk", "sailboat.fill", "tent.fill", "mountain.2.fill",
            "signpost.right.fill", "safari.fill", "binoculars.fill", "suitcase.fill", "bed.double.fill",
            "fork.knife", "cup.and.saucer.fill", "wineglass.fill", "birthday.cake.fill", "cart.fill", "bag.fill",
            "gift.fill", "key.horizontal.fill", "door.left.hand.open",
        ]),
        Group(title: String(localized: "Work & Money", comment: "Tab icon picker: symbol group"), symbols: [
            "briefcase.fill", "case.fill", "creditcard.fill", "dollarsign.circle.fill", "eurosign.circle.fill",
            "banknote.fill", "chart.bar.doc.horizontal.fill", "building.fill", "wrench.and.screwdriver.fill",
            "hammer.fill", "screwdriver.fill", "gearshape.fill", "gearshape.2.fill", "cpu.fill", "server.rack",
            "terminal.fill", "chevron.left.forwardslash.chevron.right", "curlybraces", "shippingbox.fill",
            "printer.fill", "paperplane.fill", "signature", "percent", "function", "sum", "chart.xyaxis.line",
            "network", "lock.doc.fill",
        ]),
        Group(title: String(localized: "Health & Activity", comment: "Tab icon picker: symbol group"), symbols: [
            "heart.text.square.fill", "cross.case.fill", "pills.fill", "stethoscope", "dumbbell.fill", "figure.run",
            "figure.yoga", "figure.hiking", "sportscourt.fill", "soccerball", "basketball.fill", "tennis.racket",
            "drop.fill", "carrot.fill", "flame.fill", "bolt.fill", "waveform.path.ecg", "lungs.fill", "eye.fill",
            "ear.fill", "figure.mind.and.body", "bandage.fill", "bed.double.fill", "zzz", "fork.knife.circle.fill",
        ]),
        Group(title: String(localized: "Nature & Weather", comment: "Tab icon picker: symbol group"), symbols: [
            "cloud.fill", "cloud.sun.fill", "cloud.rain.fill", "cloud.bolt.fill", "snowflake", "wind", "tornado",
            "leaf.fill", "tree.fill", "water.waves", "pawprint.fill", "bird.fill", "fish.fill", "tortoise.fill",
            "hare.fill", "ant.fill", "ladybug.fill", "cat.fill", "dog.fill", "globe.asia.australia.fill", "sparkle",
            "star.circle.fill", "sun.horizon.fill", "rainbow", "umbrella.fill", "thermometer.medium", "camera.macro",
        ]),
        Group(title: String(localized: "Devices & Media", comment: "Tab icon picker: symbol group"), symbols: [
            "iphone", "ipad", "laptopcomputer", "desktopcomputer", "tv.fill", "headphones", "music.note",
            "music.note.list", "play.fill", "playpause.fill", "speaker.wave.2.fill", "camera.fill", "photo.fill",
            "photo.on.rectangle.angled", "film.fill", "gamecontroller.fill", "paintbrush.fill", "paintpalette.fill",
            "theatermasks.fill", "puzzlepiece.fill", "dice.fill", "wand.and.stars", "keyboard.fill", "display",
            "externaldrive.fill", "wifi", "antenna.radiowaves.left.and.right", "radio.fill", "guitars.fill",
            "pianokeys", "ticket.fill", "popcorn.fill",
        ]),
        Group(title: String(localized: "Shapes & Symbols", comment: "Tab icon picker: symbol group"), symbols: [
            "circle.fill", "square.fill", "triangle.fill", "diamond.fill", "hexagon.fill", "seal.fill",
            "shield.fill", "lock.fill", "lock.open.fill", "key.fill", "exclamationmark.triangle.fill",
            "questionmark.circle.fill", "info.circle.fill", "plus.circle.fill", "minus.circle.fill",
            "xmark.circle.fill", "arrow.right.circle.fill", "arrow.up.circle.fill", "arrow.clockwise",
            "arrow.triangle.2.circlepath", "infinity", "asterisk", "bolt.circle.fill", "crown.fill", "trophy.fill",
            "medal.fill", "rosette", "flag.checkered", "heart.circle.fill", "star.square.fill",
            "moonphase.first.quarter", "atom",
        ]),
    ]
}
