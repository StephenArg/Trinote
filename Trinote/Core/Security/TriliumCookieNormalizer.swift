import Foundation

/// Normalizes cookies for `HTTPCookieStorage.shared` so native requests send session + CSRF reliably.
enum TriliumCookieNormalizer {
    /// Parsed cookies often use a `Path` scoped to `/login` (or odd `Domain`); `HTTPCookieStorage.cookies(for: https://host/)` then returns **zero**, so `GET /` sends no session.
    static func normalizeForSharedJar(_ parsed: [HTTPCookie], requestURL: URL) -> [HTTPCookie] {
        guard let host = requestURL.host?.lowercased() else { return parsed }
        let https = requestURL.scheme?.lowercased() == "https"

        return parsed.compactMap { original in
            var props: [HTTPCookiePropertyKey: Any] = [
                .name: original.name,
                .value: original.value,
                .domain: host,
                .path: "/",
            ]
            if https {
                props[.secure] = "TRUE"
            }
            if let orig = original.properties {
                if let expires = orig[.expires] {
                    props[.expires] = expires
                }
                if let maxAge = orig[.maximumAge] {
                    props[.maximumAge] = maxAge
                }
                if let version = orig[.version] {
                    props[.version] = version
                }
                // Intentionally omit SameSite: iOS may refuse to send SameSite=Strict
                // cookies from a native app, breaking CSRF double-submit validation.
            }
            return HTTPCookie(properties: props) ?? original
        }
    }

    static func cookieMatchesHost(_ cookie: HTTPCookie, host: String) -> Bool {
        let normalizedHost = host.lowercased()
        let domain = cookie.domain.lowercased()
        return domain == normalizedHost || domain == ".\(normalizedHost)"
    }
}
