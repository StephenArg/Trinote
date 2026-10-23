import Foundation

/// Why a Shortcuts action couldn't finish, in words the Shortcuts app shows.
enum ShortcutError: Error, LocalizedError, Equatable, CustomLocalizedStringResourceConvertible {
    case needsText
    /// No server is signed in on this device.
    case notSignedIn
    /// The stored login no longer works (signed out on the server, or expired).
    case sessionExpired
    /// The server couldn't be reached.
    case offline
    /// The journal note is protected and protected notes are locked.
    case journalNoteProtected
    /// The journal's day note isn't a text note, so text can't be added to it.
    case journalNoteNotText
    /// An action that opens Trinote ran before the app finished starting.
    case appNotReady
    case server(String)

    var errorDescription: String? {
        switch self {
        case .needsText:
            String(localized: "Enter some text to add.", comment: "Shortcuts: Add to Today's Journal ran without text")
        case .notSignedIn:
            String(localized: "Sign in to your Trilium server in Trinote first.", comment: "Shortcuts: no server signed in")
        case .sessionExpired:
            String(localized: "Trinote is signed out of your Trilium server. Open Trinote and sign in again.", comment: "Shortcuts: stored login no longer works")
        case .offline:
            String(localized: "Couldn't reach your Trilium server.", comment: "Shortcuts: server unreachable")
        case .journalNoteProtected:
            String(localized: "Today's journal note is protected. Unlock protected notes in Trinote to add to it.", comment: "Shortcuts: journal day note is protected and locked")
        case .journalNoteNotText:
            String(localized: "Today's journal note isn't a text note, so text can't be added to it.", comment: "Shortcuts: journal day note has another note type")
        case .appNotReady:
            String(localized: "Trinote didn't finish starting. Try again.", comment: "Shortcuts: an action that opens the app timed out waiting for it")
        case .server(let message):
            String(format: String(localized: "Trilium couldn't save it: %@", comment: "Shortcuts: server refused the change; argument is the server's message"), locale: .current, message)
        }
    }

    /// How Shortcuts shows the error (it reads this before `errorDescription`). The text is already localized.
    var localizedStringResource: LocalizedStringResource {
        LocalizedStringResource(stringLiteral: errorDescription ?? "")
    }

    /// A journal capture that failed this way stays on the device and is added later: once the server can be
    /// reached, after signing in again, or once protected notes are unlocked.
    var keepsJournalCapture: Bool {
        switch self {
        case .offline, .sessionExpired, .journalNoteProtected: true
        case .needsText, .notSignedIn, .journalNoteNotText, .appNotReady, .server: false
        }
    }

    static func from(_ error: Error) -> ShortcutError {
        if let shortcutError = error as? ShortcutError { return shortcutError }
        // Lost connections, DNS failures and the like aren't all named by `APIError.from`; any URL loading error
        // means the server wasn't reached.
        let nsError = error as NSError
        if nsError.domain == NSURLErrorDomain { return .offline }
        let apiError = APIError.from(error)
        if apiError.isNetworkError || apiError.isRetryable { return .offline }
        if apiError.isAuthError { return .sessionExpired }
        switch apiError {
        case .cancelled:
            // The system stopped the action (it ran too long); keep what was captured.
            return .offline
        default:
            return .server(apiError.localizedDescription)
        }
    }
}
