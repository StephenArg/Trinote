import SwiftUI

struct GeoMapSettingsSheet: View {
    @Binding var settings: GeoMapDisplaySettings
    let onSave: () -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Section(String(localized: "Map style", comment: "Geo map settings section")) {
                    ForEach(GeoMapStyleID.allCases) { style in
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
