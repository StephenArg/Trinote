import SwiftUI

struct GeoMapSettingsSheet: View {
    @Binding var settings: GeoMapDisplaySettings
    /// The styles the server's Trilium offers (`GeoMapStyleID.available(for:)`).
    let styles: [GeoMapStyleID]
    let onSave: () -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    ForEach(styles) { style in
                        Button {
                            settings.mapStyle = style
                        } label: {
                            HStack {
                                Text(style.displayName)
                                    .foregroundStyle(.primary)
                                Spacer()
                                if settings.mapStyle == style {
                                    Image(systemName: "checkmark")
                                        .foregroundStyle(Color.accentColor)
                                }
                            }
                        }
                    }
                } header: {
                    Text(String(localized: "Map style", comment: "Geo map settings section"))
                } footer: {
                    if settings.mapStyle.followsDarkMode {
                        Text(String(
                            localized: "Switches to its dark version when Trinote is in dark mode.",
                            comment: "Geo map settings: light/dark style footer"
                        ))
                    }
                }

                Section(String(localized: "Display", comment: "Geo map settings section")) {
                    Toggle(String(localized: "Show scale", comment: "Geo map setting"), isOn: $settings.showScale)
                    if settings.showScale {
                        Picker(String(localized: "Scale units", comment: "Geo map setting"), selection: $settings.scaleUnit) {
                            ForEach(GeoMapScaleUnit.allCases) { unit in
                                Text(unit.displayName).tag(unit)
                            }
                        }
                    }
                    Toggle(
                        String(localized: "Show marker names", comment: "Geo map setting"),
                        isOn: Binding(
                            get: { !settings.hideLabels },
                            set: { settings.hideLabels = !$0 }
                        )
                    )
                    Toggle(String(localized: "Group nearby markers", comment: "Geo map setting"), isOn: $settings.cluster)
                }
            }
            .navigationTitle(String(localized: "Map settings", comment: "Geo map settings sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Cancel settings")) { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Save", comment: "Save settings")) {
                        onSave()
                        dismiss()
                    }
                }
            }
        }
    }
}
