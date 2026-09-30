import Foundation

/// Settings → Note Editor saving options (issue #26): save a few seconds after you stop typing, hide the Save
/// button, and save when tapping Back. Global like the other Note Editor settings, and all off by default.
enum NoteEditorSaving {
    static let autosaveKey = "noteEditorAutosave"
    /// Seconds without changes before an autosave; one of `autosaveDelayOptions`.
    static let autosaveDelayKey = "noteEditorAutosaveDelay"
    /// Only applies while Autosave is on.
    static let hideSaveButtonKey = "noteEditorHideSaveButton"
    static let backButtonSavesKey = "noteEditorBackButtonSaves"

    static let autosaveDelayOptions: [Int] = [3, 5, 7, 10, 12]
    static let defaultAutosaveDelay = 5

    /// The stored delay, or the default when it isn't one of the options.
    static func autosaveDelay(forStored seconds: Int) -> Int {
        autosaveDelayOptions.contains(seconds) ? seconds : defaultAutosaveDelay
    }

    /// "5 seconds", localized by the system.
    static func delayTitle(for seconds: Int) -> String {
        Duration.seconds(seconds).formatted(.units(allowed: [.seconds], width: .wide))
    }

    /// The Save button can only be hidden while Autosave is on.
    static func hidesSaveButton(autosave: Bool, hideSaveButton: Bool) -> Bool {
        autosave && hideSaveButton
    }

    /// Autosave always saves when you leave the note; without it, Back Button Saves decides.
    static func savesWhenLeaving(autosave: Bool, backButtonSaves: Bool) -> Bool {
        autosave || backButtonSaves
    }

    // MARK: - Editor payloads

    // The canvas, mind map and spreadsheet bridges hand back a placeholder (`{}`, an empty string, or an
    // empty workbook) when their editor hasn't loaded or the call failed. Saving that would replace the note.

    /// Excalidraw scene from `canvasBridge.getSceneData()`: always has an `elements` array.
    static func isUsableCanvasJSON(_ json: String) -> Bool {
        jsonObject(json)?["elements"] is [Any]
    }

    /// Mind Elixir data from `mindmapEditor.getData()`: always has the root `nodeData`.
    static func isUsableMindMapJSON(_ json: String) -> Bool {
        jsonObject(json)?["nodeData"] is [String: Any]
    }

    /// `{ version, workbook }` from `univerBridge.getWorkbook()`; the workbook is empty when none is loaded.
    static func isUsableSpreadsheetJSON(_ json: String) -> Bool {
        guard let workbook = jsonObject(json)?["workbook"] as? [String: Any] else { return false }
        return !workbook.isEmpty
    }

    private static func jsonObject(_ json: String) -> [String: Any]? {
        guard let data = json.data(using: .utf8) else { return nil }
        return (try? JSONSerialization.jsonObject(with: data)) as? [String: Any]
    }
}

/// Autosave's state for the open editor, shown under the note title while Autosave is on.
enum EditorAutosaveStatus: Equatable {
    /// Nothing changed yet this edit.
    case idle
    /// Changed since the last save.
    case edited
    case saved
}
