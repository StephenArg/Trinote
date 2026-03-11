# Trilium iOS — Execution Plan

## API Surface (ETAPI)

The iOS client uses Trilium's ETAPI exclusively (not the internal sync API).

### Authentication
- `POST /etapi/auth/login` — password → authToken
- `POST /etapi/auth/logout` — invalidate token
- `Authorization: Bearer <token>` header on all requests

### Core Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/etapi/app-info` | GET | Validate connectivity |
| `/etapi/notes/:id` | GET | Note metadata + parent/child IDs |
| `/etapi/notes/:id/content` | GET | Raw note content |
| `/etapi/notes/:id/content` | PUT | Update note content |
| `/etapi/notes/:id` | PATCH | Update note metadata |
| `/etapi/notes/:id` | DELETE | Delete note |
| `/etapi/create-note` | POST | Create note + branch |
| `/etapi/notes?search=` | GET | Full-text search |
| `/etapi/branches/:id` | GET/POST/PATCH/DELETE | Branch CRUD |
| `/etapi/attributes/:id` | GET/POST/PATCH/DELETE | Attribute CRUD |
| `/etapi/attachments` | POST | Create attachment |
| `/etapi/attachments/:id` | GET/PATCH/DELETE | Attachment CRUD |
| `/etapi/attachments/:id/content` | GET/PUT | Attachment content |
| `/etapi/notes/:id/attachments` | GET | List attachments |

### Tree Strategy
ETAPI has no dedicated tree endpoint. Strategy:
1. Fetch root note → get `childNoteIds` + `childBranchIds`
2. Batch-fetch child notes and branches
3. Lazily expand on user interaction
4. Cache tree structure locally

### Key Entities
- **Note**: noteId, title, type, mime, parentNoteIds[], childNoteIds[], attributes[]
- **Branch**: branchId, noteId, parentNoteId, notePosition, isExpanded, prefix
- **Attribute**: attributeId, noteId, type (label/relation), name, value
- **Attachment**: attachmentId, ownerId, role, mime, title, contentLength

## Milestones

### M1: Core Infrastructure + Auth
- Project skeleton with XcodeGen
- API client (typed, async/await, URLSession)
- Keychain manager for token storage
- Server profile model + SwiftData persistence
- Login flow (password + direct token)
- Connection validation via app-info
- Error handling for cert/host/token/proxy issues

### M2: App Shell + Tree Browsing
- Tab-based navigation (Tree, Search, Settings)
- Root note loading → lazy child expansion
- Correct clone representation (note → multiple branches)
- Breadcrumbs / parent path display
- Pull to refresh
- Local tree cache for fast re-open

### M3: Note Detail / Reading
- Text notes: HTML rendering via WKWebView
- Code notes: monospace display
- File/image notes: preview or download
- Internal note link handling
- External link → Safari
- Unsupported types: graceful placeholder

### M4: Search
- Full-text search via ETAPI
- Debounced input
- Recent searches persistence
- Result cells with title, path, type
- Navigate to note from result

### M5: Editing
- Rename / edit title
- Edit note content (text → HTML source, code → direct)
- Create child / sibling note
- Delete note/branch with confirmation
- Move note within tree

### M6: Attachments
- Upload via Photos picker / Files picker
- Download attachments
- Share sheet integration
- Progress indication

### M7: Caching, Polish, Tests
- Offline tree + recent note body cache
- Failed mutation handling
- Unit tests: API, Keychain, tree logic
- UI tests: login flow, open note
- README with setup instructions
