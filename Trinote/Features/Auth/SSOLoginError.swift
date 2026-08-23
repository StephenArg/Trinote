import Foundation

enum SSOLoginError: LocalizedError, Equatable {
    case cancelled
    case sessionProbeFailed
    case staleSafariSession
    case handlerMissing
    case redirectLoop
    case invalidURL

    var errorDescription: String? {
        switch self {
        case .cancelled:
            return String(
                localized: "Sign-in was cancelled.",
                comment: "SSO login cancelled"
            )
        case .sessionProbeFailed:
            return String(
                localized: "Could not import your Trilium session. Finish signing in in Safari, then return here and tap Continue. If Safari says the handoff page is missing, add the Trilium custom request handler from the sign-in screen.",
                comment: "SSO session probe failed"
            )
        case .staleSafariSession:
            return String(
                localized: "Safari still had an old Trilium sign-in cookie. Tap Continue to open Safari again and sign in fresh.",
                comment: "SSO stale Safari session"
            )
        case .handlerMissing:
            return String(
                localized: "Your Trilium server has no SSO handoff note yet. In Trilium, create a JS Backend note, add #customRequestHandler=trinote-sso-handoff, paste the handler script, then try again.",
                comment: "SSO custom handler missing"
            )
        case .redirectLoop:
            return String(
                localized: "The server redirected too many times. If the site is behind Cloudflare Access, add the Client ID and Client Secret under Advanced, then try SSO again.",
                comment: "SSO redirect loop"
            )
        case .invalidURL:
            return String(
                localized: "Invalid server URL.",
                comment: "SSO invalid URL"
            )
        }
    }
}
