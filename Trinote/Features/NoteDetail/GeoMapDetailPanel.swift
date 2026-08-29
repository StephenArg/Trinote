import MapKit
import SwiftUI

struct GeoMapDetailPanel: View {
    let selection: GeoMapSelection
    let pin: GeoMapPin?
    let track: GeoMapTrack?
    let pinHTML: String?
    let gpxStats: GeoMapGPXParser.Stats?
    let onClose: () -> Void
    let onOpenNote: () -> Void
    let onMovePin: (() -> Void)?
    let onDelete: () -> Void
    var onNoteLinkTapped: ((String) -> Void)?
    var onFocusMark: ((GeoMapMarkFocus) -> Void)?
    @Binding var focusedMarkId: String?

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            header
            if selection.kind == .pin {
                pinBody
            } else {
                trackBody
            }
        }
        .padding(.top, 12)
        .padding(.horizontal, 16)
        .padding(.bottom, 12)
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(alignment: .top, spacing: 10) {
                if selection.kind == .pin {
                    pinHeaderIcon
                }
                Text(titleText)
                    .font(.headline)
                    .fixedSize(horizontal: false, vertical: true)
                    .frame(maxWidth: .infinity, alignment: .leading)
                Button(action: onClose) {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title3)
                        .symbolRenderingMode(.hierarchical)
                        .foregroundStyle(.secondary)
                }
                .buttonStyle(.plain)
                .accessibilityLabel(String(localized: "Close", comment: "Close detail panel"))
            }

            if selection.kind == .track, let track {
                Text(track.title)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
            }

            if selection.kind == .pin, let pin {
                coordinatesActionRow(lat: pin.lat, lng: pin.lng) {
                    pinActionRow
                }
            } else if selection.kind == .track, let track {
                if let coordinate = track.mapsFocusCoordinate {
                    coordinatesActionRow(lat: coordinate.lat, lng: coordinate.lng) {
                        trackActionRow
                    }
                } else {
                    HStack {
                        Spacer(minLength: 0)
                        trackActionRow
                    }
                }
            }
        }
    }

    @ViewBuilder
    private var pinHeaderIcon: some View {
        if let pin {
            NoteIconView(iconClass: pin.iconClass, fallbackNoteType: .text, size: .title)
                .frame(width: 28, height: 28, alignment: .center)
                .overlay(alignment: .bottomTrailing) {
                    if let color = pin.color, TriliumNoteColorMapper.swiftUIColor(for: color) != nil {
                        Circle()
                            .fill(TriliumNoteColorMapper.swiftUIColor(for: color)!)
                            .frame(width: 10, height: 10)
                            .overlay(Circle().stroke(Color(.systemBackground), lineWidth: 1.5))
                            .offset(x: 2, y: 2)
                    }
                }
                .accessibilityHidden(true)
        }
    }

    @ViewBuilder
    private var pinBody: some View {
        if let html = pinHTML, !html.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            HTMLNoteView(
                html: html,
                baseURL: nil,
                onNoteLinkTapped: onNoteLinkTapped,
                listInteractionEnabled: false,
                allowCollapsibleReorder: false
            )
            .background(Color(.secondarySystemGroupedBackground))
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
    }

    @ViewBuilder
    private var trackBody: some View {
        if let stats = gpxStats {
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                statCell(
                    title: String(localized: "Distance", comment: "GPX stat"),
                    value: formatDistance(stats.distance)
                )
                if let time = stats.time {
                    statCell(
                        title: String(localized: "Duration", comment: "GPX stat"),
                        value: formatDuration(time.duration)
                    )
                    statCell(
                        title: String(localized: "Avg speed", comment: "GPX stat"),
                        value: formatSpeed(distance: stats.distance, duration: time.duration)
                    )
                    statCell(
                        title: String(localized: "Recorded", comment: "GPX stat"),
                        value: formatDate(time.start)
                    )
                }
                if let elev = stats.elevation {
                    statCell(
                        title: String(localized: "Elevation gain", comment: "GPX stat"),
                        value: formatElevation(elev.gain)
                    )
                    statCell(
                        title: String(localized: "Elevation loss", comment: "GPX stat"),
                        value: formatElevation(elev.loss)
                    )
                    statCell(
                        title: String(localized: "Max elevation", comment: "GPX stat"),
                        value: formatElevation(elev.max)
                    )
                }
                statCell(
                    title: String(localized: "Points", comment: "GPX stat"),
                    value: "\(stats.pointCount)"
                )
            }
            if let desc = stats.description, !desc.isEmpty {
                Text(desc)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .padding(.top, 4)
            }
        }

        if let stats = gpxStats, !stats.journeys.isEmpty, let track {
            focusableListSection(
                title: String(localized: "Tracks", comment: "GPX detail section"),
                section: .tracks,
                items: stats.journeys.enumerated().map { index, journey in
                    let label = journey.name?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
                        ? journey.name!
                        : String(localized: "Unnamed track", comment: "GPX track without name")
                    return (
                        label,
                        formatDistance(journey.distance),
                        track.journeyFocus(at: index, stats: stats)
                    )
                }
            )
        }

        if let track, !track.waypoints.isEmpty {
            focusableListSection(
                title: String(localized: "Waypoints", comment: "GPX detail section"),
                section: .waypoints,
                items: track.waypoints.enumerated().map { index, waypoint in
                    let label = waypoint.name?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
                        ? waypoint.name!
                        : coordinateText(lat: waypoint.lat, lng: waypoint.lng)
                    return (label, nil as String?, track.waypointFocus(at: index))
                }
            )
        }
    }

    private func focusableListSection(
        title: String,
        section: GeoMapDetailMarkSection,
        items: [(String, String?, GeoMapMarkFocus?)]
    ) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.subheadline.weight(.semibold))
                .padding(.top, 4)
            VStack(spacing: 0) {
                ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                    let focus = item.2
                    let isFocused = focus?.matchesDetailList(
                        focusedMarkId: focusedMarkId,
                        journeyIndex: index,
                        section: section
                    ) ?? false
                    Button {
                        guard let focus else { return }
                        focusedMarkId = focus.markId
                        onFocusMark?(focus)
                    } label: {
                        HStack(alignment: .firstTextBaseline, spacing: 8) {
                            Text(item.0)
                                .font(.subheadline)
                                .foregroundStyle(.primary)
                                .frame(maxWidth: .infinity, alignment: .leading)
                            if let detail = item.1 {
                                Text(detail)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .padding(.vertical, 8)
                        .padding(.horizontal, 10)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .disabled(focus == nil)
                    .background(isFocused ? Color.accentColor.opacity(0.15) : Color.clear)
                    .id(focus.map { GeoMapMarkFocus.scrollAnchorId(for: $0.markId) })
                    if index < items.count - 1 {
                        Divider()
                    }
                }
            }
            .background(Color(.secondarySystemGroupedBackground))
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
    }

    private func coordinatesActionRow<Actions: View>(
        lat: Double,
        lng: Double,
        @ViewBuilder actions: () -> Actions
    ) -> some View {
        HStack(alignment: .center, spacing: 8) {
            HStack(spacing: 6) {
                Text(coordinateText(lat: lat, lng: lng))
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: true, vertical: false)
                Button {
                    UIPasteboard.general.string = "\(lat), \(lng)"
                } label: {
                    Image(systemName: "doc.on.doc")
                        .font(.caption)
                }
                .buttonStyle(.plain)
                .accessibilityLabel(String(localized: "Copy coordinates", comment: "Geo map detail"))
            }
            .layoutPriority(1)
            Spacer(minLength: 8)
            actions()
                .fixedSize(horizontal: true, vertical: false)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var pinActionRow: some View {
        HStack(spacing: 8) {
            detailIconButton(
                systemName: "arrow.right.to.line",
                label: String(localized: "Open note", comment: "Geo map detail action"),
                action: onOpenNote
            )
            if let onMovePin {
                detailIconButton(
                    systemName: "arrow.up.and.down.and.arrow.left.and.right",
                    label: String(localized: "Move pin…", comment: "Geo map detail action"),
                    action: onMovePin
                )
            }
            detailIconButton(
                systemName: "trash",
                label: String(localized: "Delete", comment: "Geo map detail action"),
                tint: .red,
                action: onDelete
            )
            if mapsCoordinate != nil {
                detailIconButton(
                    systemName: "map",
                    label: String(localized: "Open in maps", comment: "Geo map detail action"),
                    action: openInMaps
                )
            }
        }
    }

    private var trackActionRow: some View {
        HStack(spacing: 8) {
            detailIconButton(
                systemName: "arrow.right.to.line",
                label: String(localized: "Open note", comment: "Geo map detail action"),
                action: onOpenNote
            )
            detailIconButton(
                systemName: "trash",
                label: String(localized: "Delete", comment: "Geo map detail action"),
                tint: .red,
                action: onDelete
            )
            if mapsCoordinate != nil {
                detailIconButton(
                    systemName: "map",
                    label: String(localized: "Open in maps", comment: "Geo map detail action"),
                    action: openInMaps
                )
            }
        }
    }

    private func detailIconButton(
        systemName: String,
        label: String,
        tint: Color = .primary,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            Image(systemName: systemName)
                .font(.body.weight(.medium))
                .foregroundStyle(tint)
                .frame(width: 34, height: 34)
                .background(Color(.secondarySystemGroupedBackground))
                .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .buttonStyle(.plain)
        .accessibilityLabel(label)
    }

    private var titleText: String {
        switch selection.kind {
        case .pin: return pin?.title ?? selection.noteId
        case .track: return track?.summaryTitle ?? track?.title ?? selection.noteId
        }
    }

    private var mapsCoordinate: (lat: Double, lng: Double)? {
        switch selection.kind {
        case .pin:
            guard let pin else { return nil }
            return (pin.lat, pin.lng)
        case .track:
            return track?.mapsFocusCoordinate
        }
    }

    private func openInMaps() {
        guard let coordinate = mapsCoordinate else { return }
        let placemark = MKPlacemark(coordinate: CLLocationCoordinate2D(
            latitude: coordinate.lat,
            longitude: coordinate.lng
        ))
        let item = MKMapItem(placemark: placemark)
        item.name = titleText
        item.openInMaps()
    }

    private func statCell(title: String, value: String) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(title)
                .font(.caption2)
                .foregroundStyle(.secondary)
            Text(value)
                .font(.subheadline.weight(.medium))
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(8)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }

    private func coordinateText(lat: Double, lng: Double) -> String {
        String(format: "%.5f, %.5f", lat, lng)
    }

    private func formatDistance(_ meters: Double) -> String {
        if meters >= 1000 {
            return String(format: "%.2f km", meters / 1000)
        }
        return String(format: "%.0f m", meters)
    }

    private func formatDuration(_ seconds: TimeInterval) -> String {
        let total = Int(seconds)
        let h = total / 3600
        let m = (total % 3600) / 60
        let s = total % 60
        if h > 0 { return String(format: "%d:%02d:%02d", h, m, s) }
        return String(format: "%d:%02d", m, s)
    }

    private func formatSpeed(distance: Double, duration: TimeInterval) -> String {
        guard duration > 0 else { return "—" }
        let mps = distance / duration
        return String(format: "%.1f km/h", mps * 3.6)
    }

    private func formatElevation(_ meters: Double) -> String {
        String(format: "%.0f m", meters)
    }

    private func formatDate(_ date: Date) -> String {
        date.formatted(date: .abbreviated, time: .shortened)
    }
}
