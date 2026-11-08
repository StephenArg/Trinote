import SwiftUI

/// The search bar in a geo map's top leading corner, as on Trilium's web map (`geomap/SearchBox.tsx`). It rests as
/// a magnifying glass button, which opens the field with the keyboard up; it folds back once the field is left empty.
///
/// The map's own notes are matched by title as the reader types. The geocoder (OpenStreetMap's Nominatim) is not:
/// its usage policy rules out a request per keystroke, so it sits at the foot of the list as a row that runs it, and
/// the keyboard's Search key runs it too. A query naming coordinates offers to go straight there. A place taken from
/// the list stays marked on the map until another is taken or the field is emptied, and can be kept as a pin note.
struct GeoMapSearchBar: View {
    let pins: [GeoMapPin]
    let shapes: [GeoMapShape]
    let tracks: [GeoMapTrack]
    /// What the map shows, `[west, south, east, north]`: nearby places come first and distances are measured from
    /// its middle.
    let visibleBounds: () async -> [Double]?
    let onPickNote: (_ noteId: String, _ kind: GeoMapFeatureKind) -> Void
    let onShowPlace: (GeoMapPlace) -> Void
    let onAddPin: (GeoMapPlace) -> Void
    /// The search was taken back: unmark the searched place.
    let onClear: () -> Void

    @FocusState private var isFocused: Bool
    /// The field is showing rather than the magnifying glass button.
    @State private var isOpen = false
    @State private var query = ""
    /// Whether the result list is open. It outlives the keyboard, so results stay in view after Search.
    @State private var listOpen = false
    @State private var bounds: [Double]?
    @State private var geocode: GeocodeRun?
    @State private var geocodeTask: Task<Void, Never>?
    @State private var pickedPlace: GeoMapPlace?

    /// A geocoder run, kept so its places are listed under the query they answer.
    private struct GeocodeRun: Equatable {
        enum Status: Equatable {
            case loading
            case done([GeoMapPlace])
            case failed
        }

        let query: String
        var status: Status
    }

    private enum Footer {
        case searchOnline, loading, failed, noPlaces, hidden
    }

    private struct ListContent {
        var point: GeoMapPlace?
        var groups: [GeoMapSearch.Group]
        var footer: Footer
    }

    private static let cornerRadius: CGFloat = 12

    private var trimmedQuery: String {
        query.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private var showsList: Bool {
        listOpen && trimmedQuery.count >= GeoMapSearch.minQueryLength
    }

    var body: some View {
        ZStack(alignment: .topLeading) {
            if listOpen {
                // While the list is open, a tap on the map closes it rather than moving the map under it.
                Color.clear
                    .contentShape(Rectangle())
                    .onTapGesture { closeList() }
                    .accessibilityHidden(true)
            }
            VStack(alignment: .leading, spacing: 6) {
                field
                if showsList {
                    resultList
                } else if let place = pickedPlace, !isFocused {
                    placeBar(place)
                }
            }
            .frame(maxWidth: 420, alignment: .leading)
            .padding(10)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .animation(.snappy(duration: 0.2), value: isOpen)
        .onChange(of: isFocused) { _, focused in
            guard focused else {
                // Left with nothing to list (a tap elsewhere on the screen): nothing should stay over the map.
                if trimmedQuery.count < GeoMapSearch.minQueryLength { listOpen = false }
                foldIfIdle()
                return
            }
            listOpen = true
            Task { bounds = await visibleBounds() ?? bounds }
        }
        .onChange(of: query) { old, new in
            if isFocused { listOpen = true }
            // Emptying the field is how the search is taken back off the map.
            if !old.isEmpty, new.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                pickedPlace = nil
                onClear()
            }
        }
        .onDisappear { geocodeTask?.cancel() }
    }

    // MARK: Field

    @ViewBuilder
    private var field: some View {
        if isOpen {
            openField
                .transition(.opacity.combined(with: .scale(scale: 0.6, anchor: .leading)))
        } else {
            Button(action: open) {
                Image(systemName: "magnifyingglass")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.secondary)
                    .frame(width: 36, height: 36)
                    .contentShape(Rectangle())
                    .floatingPanel(cornerRadius: Self.cornerRadius)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(String(localized: "Search for a place", comment: "Geo map search field"))
            .transition(.opacity)
        }
    }

    private var openField: some View {
        HStack(spacing: 6) {
            Image(systemName: "magnifyingglass")
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)
            TextField(String(localized: "Search for a place", comment: "Geo map search field"), text: $query)
                .focused($isFocused)
                .submitLabel(.search)
                .autocorrectionDisabled()
                .onSubmit(submit)
            if !query.isEmpty {
                Button {
                    query = ""
                    isFocused = true
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundStyle(.secondary)
                }
                .buttonStyle(.plain)
                .accessibilityLabel(String(localized: "Clear search", comment: "Geo map search: empty the field"))
            }
        }
        .font(.subheadline)
        .padding(.horizontal, 10)
        .frame(height: 36)
        .floatingPanel(cornerRadius: Self.cornerRadius)
    }

    // MARK: Results

    private var listContent: ListContent {
        let text = trimmedQuery
        let origin = GeoMapSearch.center(of: bounds)
        let notes = GeoMapSearch.noteEntries(query: text, pins: pins, shapes: shapes, tracks: tracks, origin: origin)
        var places: [GeoMapSearch.Entry] = []
        var footer = Footer.searchOnline
        if let run = geocode, run.query == text {
            switch run.status {
            case .loading:
                footer = .loading
            case .failed:
                footer = .failed
            case .done(let found):
                footer = found.isEmpty ? .noPlaces : .hidden
                places = found.map { GeoMapSearch.placeEntry($0, origin: origin) }
            }
        }
        return ListContent(
            point: GeoMapSearch.coordinate(in: text).map(GeoMapSearch.place(at:)),
            groups: GeoMapSearch.groups(notes: notes, places: places),
            footer: footer
        )
    }

    private var resultList: some View {
        let content = listContent
        return ViewThatFits(in: .vertical) {
            resultRows(content)
            ScrollView {
                resultRows(content)
            }
            .scrollBounceBehavior(.basedOnSize)
        }
        .floatingPanel(cornerRadius: Self.cornerRadius)
    }

    private func resultRows(_ content: ListContent) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            if let point = content.point {
                row(
                    icon: "scope",
                    title: String(localized: "Go to \(point.name)", comment: "Geo map search: fly to typed coordinates")
                ) { show(point) }
            }
            // Headings only where more than one kind of result was found.
            let showsHeadings = content.groups.count > 1
            ForEach(content.groups) { group in
                if showsHeadings {
                    heading(group.kind)
                }
                ForEach(group.entries) { entry in
                    entryRow(entry)
                }
            }
            footerRow(content.footer)
        }
        .padding(.vertical, 4)
    }

    private func heading(_ kind: GeoMapSearch.Group.Kind) -> some View {
        let title: String
        switch kind {
        case .onMap: title = String(localized: "On this map", comment: "Geo map search: heading over the map's own notes")
        case .nearby: title = String(localized: "Nearby", comment: "Geo map search: heading over places near the map's view")
        case .far: title = String(localized: "Far away", comment: "Geo map search: heading over places far from the map's view")
        }
        return Text(title)
            .font(.caption.weight(.semibold))
            .foregroundStyle(.secondary)
            .padding(.horizontal, 12)
            .padding(.top, 8)
            .padding(.bottom, 2)
            .accessibilityAddTraits(.isHeader)
    }

    private func entryRow(_ entry: GeoMapSearch.Entry) -> some View {
        HStack(spacing: 4) {
            row(icon: icon(for: entry), title: entry.title, detail: entry.detail, trailing: entry.distance.map(Self.distanceText)) {
                take(entry)
            }
            if case .place(let place) = entry.target {
                Button {
                    addPin(place)
                } label: {
                    Image(systemName: "mappin.and.ellipse")
                        .font(.body)
                        .frame(width: 36, height: 36)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.borderless)
                .padding(.trailing, 4)
                .accessibilityLabel(String(
                    format: String(localized: "Add pin at %@", comment: "Geo map search: add pin accessibility"),
                    place.name
                ))
            }
        }
    }

    @ViewBuilder
    private func footerRow(_ footer: Footer) -> some View {
        let attribution = "OpenStreetMap Nominatim"
        switch footer {
        case .searchOnline:
            row(
                icon: "globe",
                title: String(localized: "Search online for “\(trimmedQuery)”", comment: "Geo map search: row that runs the place search"),
                detail: attribution,
                italic: true
            ) { runGeocoder(trimmedQuery) }
        case .loading:
            statusRow(String(localized: "Searching online…", comment: "Geo map search: place search running"), detail: attribution) {
                ProgressView().controlSize(.small)
            }
        case .failed:
            statusRow(String(localized: "Couldn't search for places", comment: "Geo map search: place search failed"), detail: attribution) {
                Image(systemName: "exclamationmark.triangle").foregroundStyle(.secondary)
            }
        case .noPlaces:
            statusRow(String(localized: "No places found.", comment: "Geo map search: nothing found"), detail: attribution) {
                Image(systemName: "info.circle").foregroundStyle(.secondary)
            }
        case .hidden:
            EmptyView()
        }
    }

    private func row(
        icon: String,
        title: String,
        detail: String? = nil,
        trailing: String? = nil,
        italic: Bool = false,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            HStack(spacing: 10) {
                Image(systemName: icon)
                    .foregroundStyle(.secondary)
                    .frame(width: 20)
                    .accessibilityHidden(true)
                rowText(title: title, detail: detail, italic: italic)
                Spacer(minLength: 4)
                if let trailing {
                    Text(trailing)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .monospacedDigit()
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }

    private func statusRow<Icon: View>(_ title: String, detail: String, @ViewBuilder icon: () -> Icon) -> some View {
        HStack(spacing: 10) {
            icon().frame(width: 20)
            rowText(title: title, detail: detail, italic: false)
            Spacer(minLength: 0)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .accessibilityElement(children: .combine)
    }

    private func rowText(title: String, detail: String?, italic: Bool) -> some View {
        VStack(alignment: .leading, spacing: 1) {
            Text(title)
                .font(.subheadline)
                .italic(italic)
                .lineLimit(1)
            if let detail {
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
            }
        }
    }

    private func icon(for entry: GeoMapSearch.Entry) -> String {
        switch entry.target {
        case .note(_, .pin): return "mappin"
        case .note(_, .shape): return "pentagon"
        case .note(_, .track): return "point.bottomleft.forward.to.point.topright.scurvepath"
        case .place: return "mappin.circle"
        }
    }

    private static func distanceText(_ meters: Double) -> String {
        Measurement(value: meters, unit: UnitLength.meters)
            .formatted(.measurement(width: .abbreviated, usage: .road))
    }

    // MARK: Picked place

    private func placeBar(_ place: GeoMapPlace) -> some View {
        HStack(spacing: 8) {
            Image(systemName: "mappin")
                .foregroundStyle(.red)
                .accessibilityHidden(true)
            Text(place.name)
                .font(.subheadline)
                .lineLimit(1)
            Spacer(minLength: 4)
            Button {
                addPin(place)
            } label: {
                Label(String(localized: "Add Pin", comment: "Geo map search: add a marker note here"), systemImage: "plus")
                    .font(.subheadline.weight(.semibold))
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.small)
        }
        .padding(.leading, 10)
        .padding(.trailing, 6)
        .padding(.vertical, 6)
        .floatingPanel(cornerRadius: Self.cornerRadius)
    }

    // MARK: Actions

    private func open() {
        isOpen = true
        // The field is only in the hierarchy from the next update on.
        DispatchQueue.main.async { isFocused = true }
    }

    /// Back to the magnifying glass once nothing is being searched for.
    private func foldIfIdle() {
        guard !isFocused, !listOpen, trimmedQuery.isEmpty, pickedPlace == nil else { return }
        isOpen = false
    }

    private func closeList() {
        listOpen = false
        isFocused = false
        foldIfIdle()
    }

    private func take(_ entry: GeoMapSearch.Entry) {
        switch entry.target {
        case .note(let noteId, let kind):
            closeList()
            if pickedPlace != nil {
                pickedPlace = nil
                onClear()
            }
            onPickNote(noteId, kind)
        case .place(let place):
            show(place)
        }
    }

    private func show(_ place: GeoMapPlace) {
        closeList()
        pickedPlace = place
        onShowPlace(place)
    }

    private func addPin(_ place: GeoMapPlace) {
        closeList()
        pickedPlace = nil
        onAddPin(place)
    }

    /// The keyboard's Search key: goes to typed coordinates, else takes the nearest place found for this query, else
    /// asks the geocoder. The list stays open as the keyboard goes, so what was found is in view.
    private func submit() {
        let text = trimmedQuery
        guard text.count >= GeoMapSearch.minQueryLength else { return }
        listOpen = true
        if let point = GeoMapSearch.coordinate(in: text) {
            show(GeoMapSearch.place(at: point))
            return
        }
        if let run = geocode, run.query == text {
            switch run.status {
            case .loading:
                return
            case .done:
                let places = listContent.groups.flatMap(\.entries).filter {
                    if case .place = $0.target { return true }
                    return false
                }
                if let first = places.first {
                    take(first)
                    return
                }
            case .failed:
                break
            }
        }
        runGeocoder(text)
    }

    private func runGeocoder(_ text: String) {
        guard !text.isEmpty else { return }
        geocodeTask?.cancel()
        geocode = GeocodeRun(query: text, status: .loading)
        geocodeTask = Task {
            // Where the map is looking now, so a shop searched for from Corfu is the one in Corfu.
            if let current = await visibleBounds() { bounds = current }
            let status: GeocodeRun.Status
            do {
                status = .done(try await GeoMapPlaceSearch.shared.search(text, viewport: bounds))
            } catch {
                status = .failed
            }
            guard !Task.isCancelled, geocode?.query == text else { return }
            geocode = GeocodeRun(query: text, status: status)
        }
    }
}

private extension View {
    /// The surface the map's floating controls share.
    func floatingPanel(cornerRadius: CGFloat) -> some View {
        let shape = RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
        return background(.regularMaterial, in: shape)
            .clipShape(shape)
            .overlay(shape.strokeBorder(Color(uiColor: .separator).opacity(0.6), lineWidth: 0.5))
            .shadow(color: .black.opacity(0.15), radius: 6, y: 2)
    }
}
