import AppIntents
import Foundation

// Shortcuts actions (issue #36). The work lives in `JournalShortcut`, `CreateNoteShortcut` and `ExternalOpenInbox`;
// these types only describe the actions to the system. They run in the app's process: with Trinote not running, iOS
// starts it in the background without a window (`ShortcutSession` then restores the login itself).

// MARK: - Add to Today's Journal

struct AddToJournalIntent: AppIntent {
    static let title: LocalizedStringResource = LocalizedStringResource("Add to Today's Journal", comment: "Shortcuts action title")
    static let description = IntentDescription(
        LocalizedStringResource("Adds text to the end of today's journal note. Without a connection, the text is kept on this device and added when Trinote next connects.", comment: "Shortcuts action description: Add to Today's Journal")
    )
    static let openAppWhenRun = false

    @Parameter(
        title: LocalizedStringResource("Text", comment: "Shortcuts parameter: text to add or put in the note"),
        inputOptions: String.IntentInputOptions(multiline: true),
        requestValueDialog: IntentDialog(LocalizedStringResource("What would you like to add to today's journal?", comment: "Shortcuts: asks for the text to add to the journal"))
    )
    var text: String

    @Parameter(
        title: LocalizedStringResource("Add Time", comment: "Shortcuts parameter: start the journal text with the current time"),
        default: false
    )
    var addTime: Bool

    static var parameterSummary: some ParameterSummary {
        Summary("Add \(\.$text) to today's journal") {
            \.$addTime
        }
    }

    @MainActor
    func perform() async throws -> some IntentResult & ReturnsValue<String> & ProvidesDialog {
        switch try await JournalShortcut.add(text: text, addTime: addTime) {
        case .added(let noteTitle):
            return .result(
                value: noteTitle,
                dialog: IntentDialog(LocalizedStringResource("Added to today's journal.", comment: "Shortcuts: text was added to the journal note"))
            )
        case .savedOnDevice(let reason):
            return .result(value: "", dialog: IntentDialog(Self.savedOnDeviceMessage(reason)))
        }
    }

    static func savedOnDeviceMessage(_ reason: ShortcutError) -> LocalizedStringResource {
        switch reason {
        case .sessionExpired:
            LocalizedStringResource("Saved on this device. Sign in again in Trinote and it will be added to your journal.", comment: "Shortcuts: journal text kept on the device because the login expired")
        case .journalNoteProtected:
            LocalizedStringResource("Saved on this device. It will be added to your journal when you unlock protected notes in Trinote.", comment: "Shortcuts: journal text kept on the device because the journal is protected and locked")
        default:
            LocalizedStringResource("Saved on this device. It will be added to your journal when Trinote next connects to your server.", comment: "Shortcuts: journal text kept on the device because the server couldn't be reached")
        }
    }
}

// MARK: - Create Note

extension CaptureDestination: AppEnum {
    static let typeDisplayRepresentation = TypeDisplayRepresentation(
        name: LocalizedStringResource("Destination", comment: "Shortcuts parameter type: where the new note goes")
    )
    static let caseDisplayRepresentations: [CaptureDestination: DisplayRepresentation] = [
        .inbox: DisplayRepresentation(title: LocalizedStringResource("Inbox", comment: "Inbox destination without a title")),
        .todaysJournal: DisplayRepresentation(title: LocalizedStringResource("Today's journal note", comment: "Inbox destination: the journal's day note")),
        .topLevel: DisplayRepresentation(title: LocalizedStringResource("Top of the tree", comment: "Inbox destination: the root note")),
    ]
}

struct CreateNoteIntent: AppIntent {
    static let title: LocalizedStringResource = LocalizedStringResource("Create Note", comment: "Shortcuts action title")
    static let description = IntentDescription(
        LocalizedStringResource("Creates a text note in your inbox, today's journal note, or at the top of the tree, and opens it in Trinote to edit.", comment: "Shortcuts action description: Create Note")
    )
    /// Opens Trinote on the new note in the editor; it runs there, so it also works offline.
    static let openAppWhenRun = true

    @Parameter(title: LocalizedStringResource("Title", comment: "Shortcuts parameter: the new note's title"))
    var noteTitle: String?

    @Parameter(
        title: LocalizedStringResource("Text", comment: "Shortcuts parameter: text to add or put in the note"),
        inputOptions: String.IntentInputOptions(multiline: true)
    )
    var text: String?

    @Parameter(
        title: LocalizedStringResource("Destination", comment: "Shortcuts parameter type: where the new note goes"),
        default: .inbox
    )
    var destination: CaptureDestination

    static var parameterSummary: some ParameterSummary {
        Summary("Create \(\.$noteTitle) in \(\.$destination)") {
            \.$text
        }
    }

    @MainActor
    func perform() async throws -> some IntentResult & ReturnsValue<String> {
        let title = try await CreateNoteShortcut.createAndOpen(title: noteTitle, text: text, destination: destination)
        return .result(value: title)
    }
}

// MARK: - Open Today's Journal

struct OpenTodaysJournalIntent: AppIntent {
    static let title: LocalizedStringResource = LocalizedStringResource("Open Today's Journal", comment: "Shortcuts action title")
    static let description = IntentDescription(
        LocalizedStringResource("Opens today's journal note in Trinote, making it when it doesn't exist yet.", comment: "Shortcuts action description: Open Today's Journal")
    )
    static let openAppWhenRun = true

    @MainActor
    func perform() async throws -> some IntentResult {
        ExternalOpenInbox.post(.todaysJournal)
        // Already running: open it now. On a cold launch the app picks the request up once it has started.
        await AppState.current?.handleExternalOpenRequests()
        return .result()
    }
}

// MARK: - App Shortcuts (Spotlight, Siri, the Action Button)

struct TrinoteShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: AddToJournalIntent(),
            phrases: [
                "Add to my journal in \(.applicationName)",
                "Add to today's journal in \(.applicationName)",
                "Write in my \(.applicationName) journal",
            ],
            shortTitle: LocalizedStringResource("Add to Journal", comment: "App Shortcut short title: Add to Today's Journal"),
            systemImageName: "book.pages"
        )
        AppShortcut(
            intent: CreateNoteIntent(),
            phrases: [
                "Create a note in \(.applicationName)",
                "New \(.applicationName) note",
            ],
            shortTitle: LocalizedStringResource("Create Note", comment: "Shortcuts action title"),
            systemImageName: "square.and.pencil"
        )
        AppShortcut(
            intent: OpenTodaysJournalIntent(),
            phrases: [
                "Open today's journal in \(.applicationName)",
                "Show my \(.applicationName) journal",
            ],
            shortTitle: LocalizedStringResource("Today's Journal", comment: "App Shortcut short title: Open Today's Journal"),
            systemImageName: "calendar"
        )
    }
}
