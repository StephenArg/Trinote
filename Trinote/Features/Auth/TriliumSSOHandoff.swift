import Foundation

/// Safari cannot share cookies with the app. After Face ID in Safari, a Trilium
/// `#customRequestHandler` note opens `trinote://sso-complete` with the session.
enum TriliumSSOHandoff {
    static let callbackScheme = "trinote"
    static let callbackHost = "sso-complete"
    static let nonceQueryName = "n"
    static let payloadQueryName = "p"

    struct CookieDTO: Codable, Equatable {
        let name: String
        let value: String
    }

    struct Payload: Codable, Equatable {
        let n: String
        let cookies: [CookieDTO]
    }

    static func responseIndicatesMissingHandler(_ body: String) -> Bool {
        body.localizedCaseInsensitiveContains("No handler matched for custom")
    }

    static func isHandoffURL(_ url: URL) -> Bool {
        url.scheme == callbackScheme && url.host == callbackHost
    }

    static func startURL(baseURL: URL, nonce: String) -> URL {
        let handoff = baseURL
            .appendingPathComponent("custom")
            .appendingPathComponent("trinote-sso-handoff")
        var components = URLComponents(url: handoff, resolvingAgainstBaseURL: false) ?? URLComponents()
        if components.url == nil {
            components = URLComponents(string: handoff.absoluteString) ?? URLComponents()
        }
        var items = components.queryItems ?? []
        items.removeAll { $0.name == nonceQueryName }
        items.append(URLQueryItem(name: nonceQueryName, value: nonce))
        components.queryItems = items
        return components.url ?? handoff
    }

    static func cookieArchive(from url: URL, expectedNonce: String, baseURL: URL) throws -> Data {
        guard isHandoffURL(url) else { throw SSOLoginError.sessionProbeFailed }
        guard let payload = decodePayload(from: url) else { throw SSOLoginError.sessionProbeFailed }
        guard payload.n == expectedNonce else { throw SSOLoginError.sessionProbeFailed }
        guard payload.cookies.contains(where: { $0.name == "trilium.sid" && !$0.value.isEmpty }) else {
            throw SSOLoginError.sessionProbeFailed
        }

        let cookies: [HTTPCookie] = payload.cookies.compactMap { dto in
            guard !dto.name.isEmpty else { return nil }
            return HTTPCookie(properties: [
                .name: dto.name,
                .value: dto.value,
                .domain: baseURL.host ?? "",
                .path: "/",
            ])
        }
        let normalized = TriliumCookieNormalizer.normalizeForSharedJar(cookies, requestURL: baseURL)
        guard let data = TriliumCookieArchive.export(cookies: normalized, for: baseURL) else {
            throw SSOLoginError.sessionProbeFailed
        }
        return data
    }

    static func decodePayload(from url: URL) -> Payload? {
        let encoded = payloadValue(from: url)
        guard let encoded, let data = Data(trinoteBase64URLEncoded: encoded) else { return nil }
        return try? JSONDecoder().decode(Payload.self, from: data)
    }

    static func payloadValue(from url: URL) -> String? {
        let items = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems
        if let value = items?.first(where: { $0.name == payloadQueryName })?.value, !value.isEmpty {
            return value
        }
        guard let fragment = url.fragment, !fragment.isEmpty else { return nil }
        if let value = URLComponents(string: "https://dummy.local?\(fragment)")?
            .queryItems?
            .first(where: { $0.name == payloadQueryName })?
            .value,
           !value.isEmpty {
            return value
        }
        return fragment
    }

    /// Backend JS note: label `#customRequestHandler` = `trinote-sso-handoff`
    static let handlerNoteSource = #"""
const { req, res } = api;

function parseCookies(header) {
    const out = [];
    if (!header) return out;
    for (const part of String(header).split(";")) {
        const i = part.indexOf("=");
        if (i < 0) continue;
        const name = part.slice(0, i).trim();
        const value = part.slice(i + 1).trim();
        if (name) out.push({ name, value });
    }
    return out;
}

function keepCookie(cookie) {
    const name = cookie.name.toLowerCase();
    return name === "trilium.sid"
        || name === "_csrf"
        || name === "csrf-token"
        || name.startsWith("trilium")
        || name.startsWith("cf_")
        || name.indexOf("authelia") !== -1;
}

function toBase64Url(text) {
    const bytes = typeof Buffer !== "undefined"
        ? Buffer.from(text, "utf8").toString("base64")
        : btoa(unescape(encodeURIComponent(text)));
    return bytes.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sendHtml(html) {
    res.status(200);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.send(html);
}

function signInPageHtml(returnTo) {
    const authenticate = "/authenticate?returnTo=" + encodeURIComponent(returnTo);
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sign in</title>
<style>
body { font-family: -apple-system, system-ui, sans-serif; margin: 0; padding: 24px; max-width: 40rem; }
h1 { font-size: 1.4rem; }
p { color: #444; line-height: 1.45; }
a.btn { display: block; width: 100%; box-sizing: border-box; padding: 14px 16px; margin: 12px 0 0; border-radius: 12px; background: #0a84ff; color: #fff; text-align: center; text-decoration: none; font-size: 17px; }
</style>
</head>
<body>
<h1>Taking you to sign-in…</h1>
<p>Finish Face ID / your SSO provider. When your notes appear, return to Trinote and tap Continue.</p>
<a class="btn" id="login" href="/login">Sign in</a>
<script>
const authenticate = ${JSON.stringify(authenticate)};
function goToLogin() { location.replace("/login"); }
function goToAuthenticate() { location.replace(authenticate); }
fetch(authenticate, { method: "GET", redirect: "manual", credentials: "same-origin" })
    .then(function (r) {
        if (r.status === 404 || r.status === 405) goToLogin();
        else goToAuthenticate();
    })
    .catch(goToLogin);
</script>
</body>
</html>`;
}

try {
    const nonce = String((req.query && req.query.n) || "");
    const cookies = parseCookies(req.headers.cookie || req.headers.Cookie || "").filter(keepCookie);
    const hasSid = cookies.some((c) => c.name === "trilium.sid" && c.value);
    const returnTo = "/custom/trinote-sso-handoff" + (nonce ? ("?n=" + encodeURIComponent(nonce)) : "");

    if (!hasSid) {
        sendHtml(signInPageHtml(returnTo));
        return;
    }

    const payload = toBase64Url(JSON.stringify({ n: nonce, cookies }));
    const appUrl = "trinote://sso-complete#p=" + payload;
    sendHtml(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Open Trinote</title>
<style>
body { font-family: -apple-system, system-ui, sans-serif; margin: 0; padding: 24px; max-width: 40rem; }
a.btn { display: block; width: 100%; box-sizing: border-box; padding: 14px 16px; margin-top: 16px; border-radius: 12px; background: #0a84ff; color: #fff; text-align: center; text-decoration: none; font-size: 17px; }
p { color: #444; line-height: 1.45; }
</style>
</head>
<body>
<h1 id="status">Checking session…</h1>
<p id="hint">Verifying your Trilium sign-in before opening Trinote.</p>
<a class="btn" id="open" href="#" style="display:none">Open Trinote</a>
<script>
const appUrl = ${JSON.stringify(appUrl)};
const returnTo = ${JSON.stringify(returnTo)};
const authenticate = "/authenticate?returnTo=" + encodeURIComponent(returnTo);

function goToLogin() { location.replace("/login"); }
function goToAuthenticate() { location.replace(authenticate); }

function goSignIn() {
    document.getElementById("status").textContent = "Taking you to sign-in…";
    document.getElementById("hint").textContent = "Your previous Safari session expired.";
    fetch(authenticate, { method: "GET", redirect: "manual", credentials: "same-origin" })
        .then(function (r) {
            if (r.status === 404 || r.status === 405) goToLogin();
            else goToAuthenticate();
        })
        .catch(goToLogin);
}

function openApp() {
    document.getElementById("status").textContent = "Opening Trinote…";
    document.getElementById("hint").textContent = "If the app does not open, tap the button below.";
    const btn = document.getElementById("open");
    btn.style.display = "block";
    btn.href = appUrl;
    location.href = appUrl;
}

function tryAppInfo() {
    return fetch("/api/app-info", { credentials: "same-origin", cache: "no-store" })
        .then(function (r) { if (r.ok) openApp(); else goSignIn(); })
        .catch(goSignIn);
}

fetch("/bootstrap", { credentials: "same-origin", cache: "no-store" })
    .then(function (r) {
        if (!r.ok) return tryAppInfo();
        return r.json().then(function (data) {
            if (!data || data.loggedIn === false || data.login) return goSignIn();
            if (data.csrfToken || data.triliumVersion) return openApp();
            return tryAppInfo();
        });
    })
    .catch(goSignIn);
</script>
</body>
</html>`);
} catch (e) {
    res.status(200);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("Trinote handoff error: " + String((e && e.message) || e));
}
"""#
}

extension Data {
    init?(trinoteBase64URLEncoded value: String) {
        var base64 = value
            .replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")
        let remainder = base64.count % 4
        if remainder > 0 {
            base64.append(String(repeating: "=", count: 4 - remainder))
        }
        self.init(base64Encoded: base64)
    }
}
