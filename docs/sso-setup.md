# Sign in with SSO (Trinote + Trilium)

Trinote can sign in to Trilium servers that use **OpenID / OAuth** (Authelia, Authentik, Keycloak, PocketID, Google OIDC, and similar). Face ID, WebAuthn, and security keys work because sign-in happens in **Safari**, not inside the app.

SSO only replaces **server login**. Protected notes still need your Trilium **document password** after you are signed in.

---

## What you need

1. A Trilium server with **OAuth/OpenID** enabled (the same login you use in a desktop browser).
2. The **same server URL** you would type in a browser (for example `https://notes.example.com`).
3. A **one-time setup** on the Trilium server: a small script called a *custom request handler*. Without it, Safari cannot hand the session back to Trinote.

You do **not** need to change your identity provider, reverse proxy, or Trilium OAuth settings beyond what already works in the browser.

---

## One-time server setup

Do this once per Trilium instance. You need access to Trilium’s note tree (usually from the desktop or web app after signing in there).

### 1. Create the handler note

1. In Trilium, create a new note.
2. Set its type to **JS backend** (sometimes shown as “Code” with backend execution).
3. Give it a clear title, for example `Trinote SSO handoff`.

### 2. Add the handler label

On that note, add a label:

| Label | Value |
|-------|--------|
| `#customRequestHandler` | `trinote-sso-handoff` |

This tells Trilium to run the note when something requests:

`https://<your-server>/custom/trinote-sso-handoff`

### 3. Paste the script

Copy the handler script from one of these places:

- This repository: [`docs/trinote-sso-handoff.js`](trinote-sso-handoff.js)
- The Trinote app: tap **Sign in with SSO** → on the setup warning (or the waiting screen), tap **Copy handler script**

Paste the full script into the JS backend note and save.

**After upgrading Trilium to v0.105 or newer**, paste the script again even if SSO worked before. v0.105 tightened SSO session checks; the current handler validates via `/api/app-info` (not `/bootstrap`) and refreshes cookies before opening Trinote.

### 4. Confirm it works

In Safari on your phone (or any browser), open:

`https://<your-server>/custom/trinote-sso-handoff`

You should see one of:

- **“Taking you to sign-in…”** — then your SSO provider (Authelia, etc.), or  
- **“Checking session…”** — if you are already signed in to Trilium in that browser.

If you see **“No handler matched”**, the label or note type is wrong, or the note was not saved.

---

## Sign in from the Trinote app

1. Open Trinote and enter your **server URL** (same host you use in the browser).
2. Tap **Sign in with SSO**.
3. Read the **Set up Trilium first** screen and confirm you already added the JS Backend handler. You can copy the script there. Turn the reminder off on that screen, or later in **Settings → SSO**.
4. Safari opens. Complete Face ID / your SSO provider if asked.
5. When your Trilium notes appear in Safari, **switch back to Trinote**.
6. On the waiting screen, tap **Continue**.

Trinote imports your session and connects.

### Tips

- Stay on the Trinote waiting screen until you tap **Continue** after sign-in.
- If Safari does not open your provider, tap **Continue** on the waiting screen to try again.
- Signing out in Trinote does not always clear Safari’s cookies. The handler checks that your session is still valid before opening the app.

---

## Saved servers and reconnect

If you signed in with SSO once, Trinote remembers that server used SSO. When the session expires, choose the server under **Saved Servers** and connect again — you will go through the Safari flow instead of being asked for a Trilium password.

You can still use **password + TOTP** on servers that do not use SSO.

---

## Cloudflare Access (optional)

If your Trilium URL is only reachable through **Cloudflare Access** (Zero Trust service tokens), expand **Advanced** on the login screen and enter:

- **Cloudflare Access Client ID**
- **Cloudflare Access Client Secret**

This is only needed when API calls from the app require those headers in addition to a normal Trilium session. A Cloudflare proxy alone (without Access policies) usually does not need this.

---

## Troubleshooting

| Symptom | What to try |
|--------|-------------|
| Safari says **“No handler matched”** | Create the JS backend note, set `#customRequestHandler=trinote-sso-handoff`, paste the latest script, save. |
| Jumps to **“Opening Trinote…”** but the app says authentication failed | Safari had an old cookie, or the handler script is outdated. On Trilium **v0.105+**, re-copy the latest handler script, then tap **Continue** in the app to sign in again. |
| Stuck on **“Taking you to sign-in…”** | Confirm Trilium OAuth works in Safari at your server URL. Check Trilium logs and your IdP redirect URI (`https://<your-server>/callback`). |
| **Too many redirects** | Often Cloudflare Access or a proxy loop. Add Access service-token credentials under **Advanced**, or fix proxy auth so `/api/app-info` is reachable after login. |
| Face ID never appears | You must use **Sign in with SSO** (Safari). In-app browsers cannot run WebAuthn reliably. |
| Protected notes still ask for a password | Expected. SSO is server login only; document encryption is separate. |

---

## How it works (short)

iOS does not let apps read Safari’s cookies. Trinote therefore:

1. Opens Safari to your server’s handoff page.
2. You sign in with your normal SSO flow in Safari.
3. The handoff script checks that the Trilium session is valid via `/api/app-info`, reloads once to capture fresh cookies, then opens `trinote://sso-complete` with the session cookies.
4. Trinote stores those cookies and uses them like a normal Trilium web session.

The handoff page must **link** to `trinote://` (user tap or JavaScript `location.href`). An HTTP redirect to a custom URL scheme is unreliable behind some proxies.

---

## Provider notes

- **Self-hosted IdPs** (Authelia, Authentik, Keycloak, PocketID, etc.): supported when Trilium’s built-in OAuth is configured for them.
- **Google OIDC**: works when Trilium is configured for Google and login works in Safari. Use the Safari handoff flow, not password-only login.
- **Password + TOTP**: still available on the login screen for servers without OAuth.

For Trilium OAuth configuration, see the [Trilium MFA / OpenID documentation](https://github.com/TriliumNext/Trilium/blob/main/docs/User%20Guide/User%20Guide/Installation%20%26%20Setup/Server%20Installation/Multi-Factor%20Authentication.md).
