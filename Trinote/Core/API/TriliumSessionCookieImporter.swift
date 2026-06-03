import Foundation

/// Converts cookies captured from a WKWebView OAuth login into the Keychain archive format used by `TriliumClient`.
enum TriliumSessionCookieImporter {
    static let sessionCookieName = "trilium.sid"

    /// Clears only Trilium session cookies from the shared jar before a fresh sign-in, so a stale
    /// `trilium.sid` from a previous session can't be mistaken for a new one. Leaves unrelated cookies
    /// (e.g. Cloudflare clearance) intact.
    static func clearStaleTriliumSessionCookies(for baseURL: URL) {
        guard let host = baseURL.host?.lowercased(), !host.isEmpty else { return }
        let jar = HTTPCookieStorage.shared
        let staleNames: Set<String> = [sessionCookieName, "_csrf", "csrf-token"]
        var removed: [String] = []
        for cookie in jar.cookies ?? [] {
            guard cookieDomainMatchesHost(cookie.domain, host: host) else { continue }
            guard staleNames.contains(cookie.name) || staleNames.contains(cookie.name.lowercased()) else { continue }
            jar.deleteCookie(cookie)
            removed.append(cookie.name)
        }
        Log.openID.info("clearStaleTriliumSessionCookies: host=\(host, privacy: .public) removed=[\(removed.joined(separator: ", "))]")
    }

    static func hasSessionCookie(in cookies: [HTTPCookie], for baseURL: URL) -> Bool {
        guard let host = baseURL.host?.lowercased(), !host.isEmpty else { return false }
        return cookies.contains { cookie in
            cookieDomainMatchesHost(cookie.domain, host: host) && cookie.name == sessionCookieName
        }
    }

    static func archiveData(from cookies: [HTTPCookie], baseURL: URL) throws -> Data {
        guard let host = baseURL.host?.lowercased(), !host.isEmpty else {
            Log.openID.error("archiveData: invalid baseURL host")
            throw APIError.invalidURL
        }

        let filtered = cookies.filter { cookieDomainMatchesHost($0.domain, host: host) }
        guard hasSessionCookie(in: filtered, for: baseURL) else {
            Log.openID.notice("\(OpenIDAuthDiagnostics.describeCookies("archiveData.missingSid", cookies: cookies, matchingHost: host), privacy: .public)")
            throw APIError.browserLoginFailed(
                String(
                    localized: "No Trilium session cookie was found after sign-in. Complete sign-in in the browser window and try again.",
                    comment: "OpenID browser login: missing trilium.sid"
                )
            )
        }

        let normalized = normalizeCookies(filtered, for: baseURL)
        guard !normalized.isEmpty else {
            Log.openID.error("archiveData: normalizeCookies produced empty list")
            throw APIError.browserLoginFailed(
                String(
                    localized: "No session cookies were found for this server after sign-in.",
                    comment: "OpenID browser login: empty cookie jar"
                )
            )
        }

        var out: [[String: Any]] = []
        out.reserveCapacity(normalized.count)
        for cookie in normalized {
            guard let properties = cookie.properties else { continue }
            var dict: [String: Any] = [:]
            for (key, value) in properties {
                if let string = value as? String { dict[key.rawValue] = string }
                else if let date = value as? Date { dict[key.rawValue] = date.timeIntervalSinceReferenceDate }
                else if let number = value as? NSNumber { dict[key.rawValue] = number }
                else if let flag = value as? Bool { dict[key.rawValue] = flag }
            }
            out.append(dict)
        }

        guard !out.isEmpty else {
            throw APIError.browserLoginFailed(
                String(
                    localized: "Could not serialize session cookies.",
                    comment: "OpenID browser login: serialization failed"
                )
            )
        }

        guard let data = try? JSONSerialization.data(withJSONObject: out, options: []) else {
            Log.openID.error("archiveData: JSONSerialization failed")
            throw APIError.encodingFailed("session cookies")
        }
        Log.openID.info("\(OpenIDAuthDiagnostics.describeArchive("archiveData.ok", data: data, baseURL: baseURL), privacy: .public)")
        return data
    }

    static func cookieDomainMatchesHost(_ cookieDomain: String, host: String) -> Bool {
        let domain = cookieDomain.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let normalizedHost = host.lowercased()
        if domain.isEmpty { return false }
        if domain.hasPrefix(".") {
            let suffix = String(domain.dropFirst())
            return normalizedHost == suffix || normalizedHost.hasSuffix("." + suffix)
        }
        return normalizedHost == domain
    }

    /// Matches `TriliumCookieResponseParser.normalizeCookiesForSharedJar` — path `/`, host domain, no SameSite.
    static func normalizeCookies(_ cookies: [HTTPCookie], for baseURL: URL) -> [HTTPCookie] {
        guard let host = baseURL.host?.lowercased() else { return [] }
        let https = baseURL.scheme?.lowercased() == "https"

        return cookies.compactMap { original in
            var props: [HTTPCookiePropertyKey: Any] = [
                .name: original.name,
                .value: original.value,
                .domain: host,
                .path: "/",
            ]
            if https {
                props[.secure] = "TRUE"
            }
            if let originalProps = original.properties {
                if let expires = originalProps[.expires] {
                    props[.expires] = expires
                }
                if let maxAge = originalProps[.maximumAge] {
                    props[.maximumAge] = maxAge
                }
                if let version = originalProps[.version] {
                    props[.version] = version
                }
            }
            return HTTPCookie(properties: props) ?? original
        }
    }
}
