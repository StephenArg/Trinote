import SwiftUI

/// Search for a place and show it on the map, or drop a pin there.
struct GeoMapPlaceSearchSheet: View {
    /// What the map shows, `[west, south, east, north]`, so nearby places come first.
    let viewport: [Double]?
    let onShow: (GeoMapPlace) -> Void
    let onAddPin: (GeoMapPlace) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var query = ""
    @State private var results: [GeoMapPlace] = []
    @State private var isSearching = false
    @State private var errorMessage: String?
    @State private var hasSearched = false

    var body: some View {
        NavigationStack {
            List {
                if isSearching {
                    HStack {
                        Spacer()
                        ProgressView()
                        Spacer()
                    }
                    .listRowSeparator(.hidden)
                } else if let errorMessage {
                    Text(errorMessage).foregroundStyle(.secondary)
                } else if hasSearched && results.isEmpty {
                    Text(String(localized: "No places found.", comment: "Geo map search: nothing found"))
                        .foregroundStyle(.secondary)
                }
                ForEach(results) { place in
                    HStack(spacing: 12) {
                        Button {
                            onShow(place)
                            dismiss()
                        } label: {
                            VStack(alignment: .leading, spacing: 2) {
                                Text(place.name).font(.body)
                                if place.label != place.name {
                                    Text(place.label)
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                        .lineLimit(2)
                                }
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                        Button {
                            onAddPin(place)
                            dismiss()
                        } label: {
                            Label(String(localized: "Add Pin", comment: "Geo map search: add a marker note here"), systemImage: "mappin.and.ellipse")
                                .labelStyle(.iconOnly)
                                .font(.title3)
                        }
                        .buttonStyle(.borderless)
                        .accessibilityLabel(String(
                            format: String(localized: "Add pin at %@", comment: "Geo map search: add pin accessibility"),
                            place.name
                        ))
                    }
                }
            }
            .listStyle(.plain)
            .searchable(
                text: $query,
                placement: .navigationBarDrawer(displayMode: .always),
                prompt: String(localized: "Search for a place", comment: "Geo map search field")
            )
            .onSubmit(of: .search) {
                Task { await runSearch() }
            }
            .navigationTitle(String(localized: "Find a Place", comment: "Geo map search title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Geo map search")) { dismiss() }
                }
            }
            .safeAreaInset(edge: .bottom) {
                Text(String(localized: "Search by OpenStreetMap Nominatim", comment: "Geo map search attribution"))
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
                    .padding(.bottom, 6)
            }
        }
    }

    private func runSearch() async {
        let text = query
        guard !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        isSearching = true
        errorMessage = nil
        defer { isSearching = false }
        do {
            results = try await GeoMapPlaceSearch.shared.search(text, viewport: viewport)
        } catch {
            results = []
            errorMessage = String(localized: "Place search isn't available right now. Check your connection and try again.", comment: "Geo map search failed")
        }
        hasSearched = true
    }
}
