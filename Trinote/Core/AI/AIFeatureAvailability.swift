import Foundation

/// Whether Trilium's AI chat can be used right now, and if not, why. Built from what `AppState` knows; pure so the
/// screens and tests can reason about it without a server.
enum AIFeatureAvailability: Equatable, Sendable {
    /// The server predates the chat this app speaks (Trilium 0.105). Existing transcripts still show.
    case unsupportedServer(appVersion: String)
    /// No connection: cached transcripts show read-only; nothing can be sent or changed.
    case offline
    /// The server's AI options haven't been read yet.
    case unknown
    /// Trilium's AI switch (`aiEnabled`) is off.
    case disabled
    /// AI is on, but no provider is set up (Trilium → Options → AI).
    case noProviders
    case ready

    init(serverInfo: AppInfoResponse?, isOnline: Bool, config: TriliumAIConfig?) {
        if let serverInfo, !TriliumServerCompatibility.supportsLlmChat(serverInfo) {
            self = .unsupportedServer(appVersion: serverInfo.appVersion)
            return
        }
        guard isOnline else {
            self = .offline
            return
        }
        guard serverInfo != nil, let config else {
            self = .unknown
            return
        }
        guard config.aiEnabled else {
            self = .disabled
            return
        }
        guard config.hasProviders else {
            self = .noProviders
            return
        }
        self = .ready
    }

    /// Messages can be sent and chats made.
    var canSend: Bool { self == .ready }

    /// Whether the AI screens are offered at all: the server supports the chat and Trilium's AI switch was on when
    /// the options were last read. Being offline doesn't hide them (the screens then say so), as on desktop, where
    /// the switch alone governs the UI.
    static func showsEntryPoints(serverInfo: AppInfoResponse?, config: TriliumAIConfig?) -> Bool {
        TriliumServerCompatibility.supportsLlmChat(serverInfo) && config?.aiEnabled == true
    }
}
