import SwiftUI

struct CalendarJournalSettingsSheet: View {
    @AppStorage(CalendarJournalSettings.defaultOpenToMonthTab) private var defaultOpenToMonthTab = false
    @AppStorage(CalendarJournalSettings.hideWeekends) private var hideWeekends = false
    @AppStorage(CalendarJournalSettings.hideChildNotesInTree) private var hideChildNotesInTree = false
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Toggle(
                    String(localized: "Default open to month tab", comment: "Calendar journal setting: always open the Month tab"),
                    isOn: $defaultOpenToMonthTab
                )
                Toggle(
                    String(localized: "Hide weekends", comment: "Calendar journal setting: hide weekend columns and rows"),
                    isOn: $hideWeekends
                )
                Toggle(
                    String(localized: "Hide child notes in tree", comment: "Calendar journal setting: hide notes under journal roots in the notes tree"),
                    isOn: $hideChildNotesInTree
                )
            }
            .navigationTitle(String(localized: "Calendar settings", comment: "Calendar journal settings sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Done", comment: "Dismiss calendar journal settings")) {
                        dismiss()
                    }
                }
            }
        }
    }
}
