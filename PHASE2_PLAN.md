# Phase 2 — Hardening Plan

## Audit Summary

Critical bugs found:
1. `deleteAllTokens()` has no service filter — nukes all keychain passwords
2. `HTMLNoteView` disables JavaScript but relies on JS for auto-sizing
3. `TriliumClient.deviceName()` references UIDevice without importing UIKit
4. `PersistenceManager.init()` calls fatalError on failure — crashes on corrupt DB
5. `HTMLNoteView.updateUIView` reloads content on every SwiftUI state change
6. Alert bindings use `.constant()` — can't be dismissed by SwiftUI
7. Server error responses discard the body (ETAPI returns error details)

Architecture gaps:
- No protocols/DI → untestable ViewModels and services
- PersistenceManager = god object (237 lines, 6 entity types)
- NoteDetailViewModel = 265 lines, 20+ state properties
- No NetworkMonitor for connectivity awareness
- Duplicate state between in-memory caches and SwiftData
- No cache TTL / expiry logic
- No draft system for edit resilience

## Execution Order

### M1: Critical Bug Fixes
- Fix keychain deleteAllTokens() service filter
- Fix HTMLNoteView: enable JS, WKScriptMessageHandler, track html changes
- Add UIKit import to TriliumClient (or extract deviceName)
- Replace fatalError in PersistenceManager with graceful fallback
- Fix alert bindings to use proper @State booleans
- Parse error response bodies in TriliumClient
- Wrap encoding errors in APIError

### M2: Protocol Abstractions + DI
- TriliumClientProtocol for testability
- PersistenceProtocol / split into repositories
- NetworkMonitor (NWPathMonitor-based)
- Inject dependencies via Environment or init params
- Make Sendable conformances explicit

### M3: Offline Cache Hardening
- Recursive tree caching (not just root children)
- Attribute caching
- Cache TTL with configurable staleness thresholds
- SyncStatus model per server profile
- Offline search fallback (title-based from cache)
- Attachment metadata caching

### M4: Sync / Refresh Reliability
- Foreground refresh on scene phase change
- Partial failure handling (one failing endpoint ≠ blank UI)
- Request cancellation on view disappear / search term change
- Per-screen loading states with stale-data tolerance
- Last refresh timestamp per entity domain

### M5: Mutation Safety + Drafts
- DraftStore (SwiftData model) for in-progress edits
- Autosave draft at intervals
- Restore draft on note re-open
- Discard-draft confirmation
- Compare draft vs server content before save
- Block mutations while offline (with draft preservation)
- Deletion confirmation improvements

### M6: HTML Rendering + Attachment Polish
- Internal note link interception → in-app navigation
- External links → Safari
- Loading placeholder for heavy content
- Attachment download caching
- Better image/document previews
- Progress indicators for uploads/downloads
- Retry for interrupted transfers

### M7: Performance
- Cache DateFormatters as statics
- Add SwiftData indexes on frequently queried fields
- Batch SwiftData saves during tree loading
- Tree diffing / update-in-place instead of full rebuild
- Remove recursive Hashable on TreeNode

### M8: Settings / Diagnostics
- Last sync time display
- Cache size estimate
- Recent sync errors log
- Debug logging toggle
- App version / build info
- Cache clear per profile

### M9: Tests
- Protocol-based mocks for TriliumClient and Persistence
- ViewModel tests (TreeVM, NoteDetailVM, SearchVM, AuthVM, AppState)
- Persistence repository tests
- Draft store tests
- Extension/utility tests
- Network monitor tests
- UI smoke tests if practical

### M10: README + Dev Notes
- Updated feature list
- Offline behavior docs
- Known limitations
- Testing instructions
- Phase 2 summary + phase 3 recommendations
