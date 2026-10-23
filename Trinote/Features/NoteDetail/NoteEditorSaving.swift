import Foundation
import UIKit

/// Settings → Note Editor saving options (issue #26): save a few seconds after you stop typing, hide the Save
/// button, and save when tapping Back. Global like the other Note Editor settings, and all off by default.
enum NoteEditorSaving {
    static let autosaveKey = "noteEditorAutosave"
    /// Seconds without changes before an autosave; one of `autosaveDelayOptions`.
    static let autosaveDelayKey = "noteEditorAutosaveDelay"
    /// Only applies while Autosave is on.
    static let hideSaveButtonKey = "noteEditorHideSaveButton"
    static let backButtonSavesKey = "noteEditorBackButtonSaves"

    static let autosaveDelayOptions: [Int] = [1, 2, 3, 5, 7, 10, 12]
    static let defaultAutosaveDelay = 5

    /// The stored delay, or the default when it isn't one of the options.
    static func autosaveDelay(forStored seconds: Int) -> Int {
        autosaveDelayOptions.contains(seconds) ? seconds : defaultAutosaveDelay
    }

    /// "5 seconds", localized by the system.
    static func delayTitle(for seconds: Int) -> String {
        Duration.seconds(seconds).formatted(.units(allowed: [.seconds], width: .wide))
    }

    /// Whether the editor shows its save button. Without Autosave it always does. With Autosave it shows only
    /// while there are changes it hasn't saved yet, so it hides once they're saved and comes back with the next
    /// edit; Hide Save Button keeps it hidden.
    static func showsSaveButton(autosave: Bool, hideSaveButton: Bool, status: EditorAutosaveStatus) -> Bool {
        guard autosave else { return true }
        return !hideSaveButton && status == .edited
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

/// What an editor does when iOS ends its web view's content process, which it often does while the app is in the
/// background. Left to WebKit, the page reloads and the editor shows the note as it was when editing began; the next
/// save then puts that back on the server over the edits (issue #26). So each editor reloads its page itself and
/// seeds it with the newest content it has.
struct EditorReloadRecovery {
    /// Reloads allowed within `window`. A note that ends the process every time it loads would otherwise loop.
    static let maxReloads = 3
    static let window: TimeInterval = 60

    private var reloadTimes: [Date] = []

    /// Counts a reload at `now`. False once the page has already reloaded `maxReloads` times within `window`.
    mutating func allowsReload(at now: Date = .now) -> Bool {
        reloadTimes.removeAll { now.timeIntervalSince($0) >= Self.window }
        guard reloadTimes.count < Self.maxReloads else { return false }
        reloadTimes.append(now)
        return true
    }

    /// What the reloaded page shows: content queued for it, else the newest the editor sent, else what it opened with.
    static func content<Content>(pending: Content?, latest: Content?, initial: Content) -> Content {
        pending ?? latest ?? initial
    }

    /// Whether the reloaded text editor reports its first serialization (autosave's baseline). Only when the first
    /// page never did and nothing was edited: a baseline taken from restored edits would count them as saved, so
    /// Back wouldn't save them.
    static func reportsLoadedContentAfterReload(alreadyReported: Bool, receivedChanges: Bool) -> Bool {
        !alreadyReported && !receivedChanges
    }
}

/// One web view's handling of its content process ending: reloads within `EditorReloadRecovery`'s budget, and while
/// the app is in the background waits until it returns. iOS would likely end a page started in the background too,
/// using up the budget, and WebKit's own reload also waits until the page can be seen.
///
/// Not actor-isolated so the web view coordinators that keep one stay as they are; it's only used on the main thread
/// (WebKit calls `webViewWebContentProcessDidTerminate` there, and the foreground observer runs on `.main`).
final class WebContentProcessRecovery: @unchecked Sendable {
    private let label: String
    private var budget = EditorReloadRecovery()
    private var pendingReload: (() -> Void)?
    private var foregroundObserver: OneShotObserver?

    init(label: String) {
        self.label = label
    }

    /// Call from `webViewWebContentProcessDidTerminate`; `reload` loads the page again.
    func pageProcessEnded(reload: @escaping () -> Void) {
        let inBackground = MainActor.assumeIsolated { UIApplication.shared.applicationState == .background }
        guard inBackground else {
            reloadIfAllowed(reload)
            return
        }
        pendingReload = reload
        guard foregroundObserver == nil else { return }
        Log.ui.info("\(self.label, privacy: .public) web content process ended in the background; reloading when the app returns")
        let observer = OneShotObserver()
        foregroundObserver = observer
        observer.token = NotificationCenter.default.addObserver(
            forName: UIApplication.willEnterForegroundNotification,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            observer.remove()
            guard let self else { return }
            self.foregroundObserver = nil
            guard let reload = self.pendingReload else { return }
            self.pendingReload = nil
            self.reloadIfAllowed(reload)
        }
    }

    private func reloadIfAllowed(_ reload: () -> Void) {
        guard budget.allowsReload() else {
            Log.ui.error("\(self.label, privacy: .public) keeps ending its web content process; not reloading it again")
            return
        }
        Log.ui.warning("\(self.label, privacy: .public) web content process ended; reloading the page")
        reload()
    }
}

/// Holds a block observer's token so the block can remove itself.
private final class OneShotObserver: @unchecked Sendable {
    var token: NSObjectProtocol?

    func remove() {
        if let token { NotificationCenter.default.removeObserver(token) }
        token = nil
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
