import Foundation

extension AIFeatureAvailability {
    /// Why chatting isn't possible right now, for the screens; `nil` when it is, or isn't known yet.
    var noticeText: String? {
        switch self {
        case .unsupportedServer(let appVersion):
            return String(
                format: String(
                    localized: "AI chat needs Trilium %1$@ or newer; this server runs %2$@.",
                    comment: "AI chat: the server is too old; %1$@ is the needed version, %2$@ the server's"
                ),
                locale: .current,
                TriliumServerCompatibility.llmChatMinAppVersion,
                appVersion
            )
        case .offline:
            return String(localized: "You're offline. Messages can be sent when you're back online.", comment: "AI chat: no connection")
        case .disabled:
            return String(localized: "AI features are turned off in Trilium.", comment: "AI chat: Trilium's AI switch is off")
        case .noProviders:
            return String(localized: "Add a provider in Trilium under Options → AI to start chatting.", comment: "AI chat: no provider is set up")
        case .unknown, .ready:
            return nil
        }
    }

    var noticeSystemImage: String {
        switch self {
        case .unsupportedServer: return "exclamationmark.triangle"
        case .offline: return "wifi.slash"
        case .disabled, .noProviders, .unknown, .ready: return "sparkles"
        }
    }
}
