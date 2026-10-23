import Foundation

/// What the rich text editor may do with Trilium link previews in a note.
struct LinkPreviewSupport: Equatable, Sendable {
    /// The server understands link previews (Trilium v0.104+): a link's menu can turn it into one.
    var available: Bool
    /// Pasted and autolinked URLs become previews by themselves (Trilium's auto link previews option is on and the
    /// note is on the server).
    var auto: Bool

    static let none = LinkPreviewSupport(available: false, auto: false)
}

/// The answer to one of the editor's link preview requests.
struct LinkPreviewAnswer: Sendable {
    /// The page's details; present for a page the server could not read too, with only its host as the title.
    var metadata: LinkPreviewMetadata?
    /// Why there are no (or no real) details.
    var problem: LinkPreviewProblem?
}

/// Why a link preview came without the page's details.
enum LinkPreviewProblem: Equatable, Sendable, CustomStringConvertible {
    case serverTooOld
    case autoPreviewsOff
    case noteNotOnServer
    case offline
    case pageUnreadable
    case requestFailed(String)

    /// The editor's name for it (`applyLinkPreviewJSON`'s `problem`).
    var code: String {
        switch self {
        case .serverTooOld: return "serverTooOld"
        case .autoPreviewsOff: return "autoPreviewsOff"
        case .noteNotOnServer: return "noteNotOnServer"
        case .offline: return "offline"
        case .pageUnreadable: return "pageUnreadable"
        case .requestFailed: return "requestFailed"
        }
    }

    var description: String {
        if case .requestFailed(let reason) = self { return "requestFailed(\(reason))" }
        return code
    }

    /// What the editor tells the user, or nil when it says nothing. A conversion the user asked for always happens
    /// (as in Trilium), so its message explains a preview that shows only the site's address. An automatic one keeps
    /// the plain link, and only an outright failed request is worth a word.
    func message(explicit: Bool) -> String? {
        if !explicit {
            guard case .requestFailed(let reason) = self else { return nil }
            return String(
                localized: "Couldn’t get a link preview: \(reason)",
                comment: "Editor toast when a pasted URL's link preview request failed"
            )
        }
        switch self {
        case .serverTooOld:
            return String(
                localized: "Link previews need Trilium v0.104 or newer.",
                comment: "Editor toast when the server predates link previews"
            )
        case .autoPreviewsOff:
            return nil
        case .noteNotOnServer:
            return String(
                localized: "This note isn’t on the server yet, so the preview shows only the site’s address.",
                comment: "Editor toast when a link preview was made for a note not yet uploaded"
            )
        case .offline:
            return String(
                localized: "You’re offline, so the preview shows only the site’s address.",
                comment: "Editor toast when a link preview was made offline"
            )
        case .pageUnreadable:
            return String(
                localized: "Neither the server nor this device could read this page, so the preview shows only the site’s address.",
                comment: "Editor toast when neither Trilium nor the phone could read the linked page"
            )
        case .requestFailed(let reason):
            return String(
                localized: "Couldn’t get the page’s details (\(reason)), so the preview shows only the site’s address.",
                comment: "Editor toast when the link preview request failed"
            )
        }
    }
}
