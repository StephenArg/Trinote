# Trinote — iOS Trilium Client

<img width="360" height="360" alt="AppIcon-1024-dark" src="https://github.com/user-attachments/assets/d94bb6a9-904e-49b6-9261-213809fbd248" />


A native iOS client for self-hosted [TriliumNext](https://github.com/TriliumNext/Trilium) note-taking servers.

## Features

- **Connect** with the same **web session** as Trilium (password + cookies + CSRF), not ETAPI
- **Browse** the full note tree with lazy loading and proper clone/branch semantics
- **Read** text notes (HTML), code notes, image notes, and file notes
- **Search** full-text across all notes via the server search API
- **Edit** note titles, content (HTML source or code), create/delete notes
- **Attachments** — upload from Photos/Files, download, share
- **Offline cache** — tree structure and recently opened notes cached locally
- **Multiple servers** — save and switch between server profiles
- **Dark mode** and numerous color options

## Requirements

- iOS 17.0+
- Xcode 16.0+
- Swift 5.9+
- A self-hosted TriliumNext server (**v0.95.x – v0.103.x** supported; native `/api` routes are pinned in `local_notes/trilium_native_api_v0.95.md`, with v0.103 deltas noted at the bottom of that file)

## Setup

### 1. Generate the Xcode project

This project uses [XcodeGen](https://github.com/yonaskolb/XcodeGen) to generate the `.xcodeproj`:

```bash
brew install xcodegen
cd Trinote
xcodegen generate
```

### 2. Open in Xcode

```bash
open Trinote.xcodeproj
```

### 3. Configure signing

- Open the project settings
- Select the **Trinote** target
- Under **Signing & Capabilities**, set your development team
- Adjust the bundle identifier if needed

### 4. Build & Run

Select an iOS 17+ simulator or device and press **Cmd+R**.

## Connecting to a Server

1. Enter your server URL (same origin you use in the browser)
2. Enter your Trilium **password** (same as the web UI)
3. Optional: **Remember me** — matches Trilium’s longer-lived session cookie
4. **TOTP / SSO**: complete login in the browser first if your server requires it

### Self-signed certificates

If your server uses a self-signed certificate, you'll need to install and trust
the CA certificate on your iOS device first (Settings → General → VPN & Device
Management). The app allows arbitrary HTTP loads via ATS to support local networks.

## Architecture

```
Trinote/
├── App/                     # App entry, state, tab navigation
├── Core/
│   ├── API/                 # TriliumClient (session + `/api`), models, WebSocket
│   ├── Models/              # Domain models, SwiftData cache models
│   ├── Persistence/         # SwiftData container, cache manager
│   ├── Security/            # Keychain token storage
│   └── Utilities/           # Logger, extensions
├── Features/
│   ├── Auth/                # Login, server profile management
│   ├── Tree/                # Note tree browsing
│   ├── Search/              # Full-text search with recents
│   ├── NoteDetail/          # Note viewing, editing, renderers
│   ├── Attachments/         # Photo/file upload
│   └── Settings/            # Settings, recents list
└── Resources/               # Info.plist, Assets
```

### Key Design Decisions

- **Native `/api` + sync** — session cookies, `sync/check` + `sync/changed`, entity-change cursor; WebSocket debounces incremental sync
- **Notes ≠ Branches** — notes and branches are separate entities; a note can appear in multiple tree locations (clones)
- **Lazy tree loading** — fetches children on demand to avoid loading the entire tree upfront
- **Cache-first offline** — falls back to cached data when the server is unreachable
- **No embedded server** — pure client that talks to your existing Trilium server

## Testing

Run tests in Xcode (**Cmd+U**) or from the command line:

```bash
xcodebuild test -scheme Trinote -destination 'platform=iOS Simulator,name=iPhone 16'
```

Tests cover:
- API client (mock URLProtocol, request/response validation)
- Keychain save/load/delete
- Domain model mapping (notes, branches, attributes, tree nodes)
- Clone semantics (multi-parent notes)
- Error classification (auth, network, server errors)

## Known Limitations

- **Text editing** includes many toolbar options mirroring the desktop and browser applications
- **Canvas/Mermaid/GeoMap** notes show a placeholder image of the diagram.
- **Spreadsheet notes** (Trilium v0.103+, Univer Sheets) are read-only — the Univer editor is not bundled on iOS. The cell grid renders for preview; use the desktop or web client to edit.
- **Protected notes** are able to be read (when password is entered) but not generated on this client
- **Background sync** — data refreshes in the background and on pull-to-refresh. When starting out manually do a full-sync.
- **Search is server-side only** — no offline full-text search. Can jump to text references

---

If you want to discuss future work on Trinote (new features, bug fixes, style changes, feedback in general) you can join the [discord](https://discord.com/invite/ghjJG56EUS).

---

<a href="https://buymeacoffee.com/vero.fide">Buy me a coffee</a> ☕️ 

<img width="100" height="100" alt="qr-code" src="https://github.com/user-attachments/assets/2ebab2dd-4bf6-4d86-a29c-4cf75fcf834e" />


## License

This project is not affiliated with TriliumNext. It is a community-built iOS client.
