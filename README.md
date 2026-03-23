# Trinote — iOS Trilium Client

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
- **Dark mode** and Dynamic Type support throughout

## Requirements

- iOS 17.0+
- Xcode 16.0+
- Swift 5.9+
- A self-hosted TriliumNext server (**v0.95.x** recommended; native `/api` routes are pinned in `local_notes/trilium_native_api_v0.95.md`)

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
4. **TOTP / SSO**: complete login in the browser first if your server requires it; password-only flow may not be enough yet

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

- **Text editing** is HTML source mode only — rich text WYSIWYG editing is planned for a future release
- **Canvas/Mermaid/GeoMap** notes show a placeholder with "Open in Web" fallback
- **Protected notes** display as protected but decryption is not implemented client-side
- **No background sync** — data refreshes on app foreground and pull-to-refresh
- **No file/image note content editing** — only text/code notes can be edited
- **Search is server-side only** — no offline full-text search

## Roadmap

- [ ] Rich text editing (block editor or Markdown)
- [ ] Protected note decryption
- [ ] Note move/reorder in tree
- [ ] Widgets / home screen shortcuts
- [ ] iPad sidebar layout
- [ ] Share extension (save to Trilium)
- [ ] Offline search index

## License

This project is not affiliated with TriliumNext. It is a community-built iOS client.
