import Foundation

enum LocalNoteTransferCompatibility {
    struct Result: Equatable, Sendable {
        var allowed: Bool
        var reason: String?
    }

    /// Whether the sender may offer this note to a receiver whose Trilium server reports `receiverServerInfo`.
    static func canSend(
        note: NoteItem,
        receiverServerInfo: LocalTransferServerInfo?
    ) -> Result {
        if note.isProtected {
            return Result(
                allowed: false,
                reason: String(
                    localized: "Protected notes cannot be shared locally.",
                    comment: "Local transfer blocked for protected note"
                )
            )
        }

        guard let receiverServerInfo else {
            return Result(
                allowed: false,
                reason: String(
                    localized: "Waiting for the receiver’s server version…",
                    comment: "Local transfer compatibility pending handshake"
                )
            )
        }

        let receiverAppInfo = receiverServerInfo.asAppInfoResponse()

        if note.type == .spreadsheet,
           !TriliumServerCompatibility.supportsSpreadsheetNotes(receiverAppInfo) {
            return Result(
                allowed: false,
                reason: String(
                    format: String(
                        localized: "Spreadsheet notes require Trilium %1$@ or newer on the receiver’s server (their server is %2$@).",
                        comment: "Local transfer spreadsheet blocked. %1$@ min version, %2$@ receiver version."
                    ),
                    TriliumServerCompatibility.spreadsheetMinAppVersion,
                    receiverServerInfo.appVersion
                )
            )
        }

        switch note.type {
        case .launcher, .shortcut, .search, .book, .collection, .noteMap, .relationMap, .render, .webView, .contentWidget, .doc, .geoMap, .calendar, .kanban, .presentation:
            return Result(
                allowed: false,
                reason: String(
                    localized: "This note type cannot be shared locally yet.",
                    comment: "Local transfer unsupported note type"
                )
            )
        default:
            break
        }

        return Result(allowed: true, reason: nil)
    }
}
