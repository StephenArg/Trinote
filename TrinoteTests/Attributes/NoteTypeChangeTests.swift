import XCTest
@testable import Trinote

final class NoteTypeChangeTests: XCTestCase {

    private func info(_ version: String) -> AppInfoResponse {
        AppInfoResponse(
            appVersion: version, dbVersion: 240, syncVersion: 39, buildDate: "", buildRevision: "",
            dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil
        )
    }

    func testEntriesFollowDesktopOrderAndServerVersion() {
        XCTAssertEqual(
            NoteTypeChange.entries(serverInfo: info("0.106.0")),
            [.text, .spreadsheet, .collection, .canvas, .mermaid, .mindMap, .relationMap, .render, .webView, .code, .markdown]
        )
        XCTAssertFalse(NoteTypeChange.entries(serverInfo: info("0.102.0")).contains(.spreadsheet))
        XCTAssertFalse(NoteTypeChange.collectionViews(serverInfo: info("0.105.0")).contains(.dashboard))
        XCTAssertTrue(NoteTypeChange.collectionViews(serverInfo: info("0.106.0")).contains(.dashboard))
        XCTAssertFalse(NoteTypeChange.collectionViews(serverInfo: info("0.97.0")).contains(.board))
    }

    func testAIChatEntryNeedsAIOnAndTriliumV105() {
        XCTAssertFalse(NoteTypeChange.entries(serverInfo: info("0.106.0")).contains(.llmChat))
        XCTAssertFalse(NoteTypeChange.entries(serverInfo: info("0.104.0"), aiEnabled: true).contains(.llmChat))
        XCTAssertEqual(
            NoteTypeChange.entries(serverInfo: info("0.106.0"), aiEnabled: true),
            [.text, .spreadsheet, .collection, .canvas, .mermaid, .mindMap, .relationMap, .llmChat, .render, .webView, .code, .markdown]
        )
        XCTAssertEqual(NoteTypeChange.Entry.llmChat.target, .init(serverType: "llmChat", mime: "application/json"))
        XCTAssertEqual(NoteTypeChange.Entry.llmChat.noteType, .llmChat)
        XCTAssertTrue(NoteTypeChange.Entry.llmChat.isShownInApp)
        let chat = NoteTypeChange.Target(serverType: "llmChat", mime: "application/json")
        XCTAssertEqual(NoteTypeChange.contentOutcome(fromServerType: "text", content: "<p>hi</p>", to: chat), .replacedOnEdit)
        XCTAssertEqual(NoteTypeChange.contentOutcome(fromServerType: "code", content: "{\"version\":1,\"messages\":[]}", to: chat), .kept)
        XCTAssertEqual(NoteTypeChange.contentOutcome(fromServerType: "llmChat", content: "{}", to: .init(serverType: "text", mime: "text/html")), .reformatted)
    }

    func testEntriesStoreDesktopsTypeAndMime() {
        XCTAssertEqual(NoteTypeChange.Entry.collection.target, .init(serverType: "book", mime: ""))
        XCTAssertEqual(NoteTypeChange.Entry.mermaid.target, .init(serverType: "mermaid", mime: "text/mermaid"))
        XCTAssertEqual(NoteTypeChange.Entry.markdown.target, .init(serverType: "code", mime: "text/x-markdown"))
        XCTAssertEqual(NoteTypeChange.Entry.relationMap.target, .init(serverType: "relationMap", mime: "application/json"))
        XCTAssertEqual(NoteTypeChange.Entry.webView.target, .init(serverType: "webView", mime: ""))
    }

    func testCurrentEntry() {
        XCTAssertEqual(NoteTypeChange.currentEntry(serverType: "code", mime: "text/x-markdown"), .markdown)
        XCTAssertEqual(NoteTypeChange.currentEntry(serverType: "code", mime: "application/javascript;env=frontend"), .code)
        XCTAssertEqual(NoteTypeChange.currentEntry(serverType: "book", mime: ""), .collection)
        XCTAssertEqual(NoteTypeChange.currentEntry(serverType: "text", mime: "text/html"), .text)
        XCTAssertEqual(NoteTypeChange.currentEntry(serverType: "llmChat", mime: "application/json"), .llmChat)
        XCTAssertNil(NoteTypeChange.currentEntry(serverType: "collection", mime: ""))
    }

    func testTypesDesktopWontChange() {
        for type in ["file", "image", "launcher", "doc", "contentWidget", "search", "noteMap"] {
            XCTAssertFalse(NoteTypeChange.canChange(serverType: type), type)
        }
        for type in ["text", "code", "book", "canvas", "mindMap", "llmChat", "geoMap"] {
            XCTAssertTrue(NoteTypeChange.canChange(serverType: type), type)
        }
    }

    func testAsksOnlyWhenTheTypeChangesAndTheNoteHasContent() {
        let code = NoteTypeChange.Target(serverType: "code", mime: "text/plain")
        XCTAssertFalse(NoteTypeChange.requiresConfirmation(fromServerType: "text", to: code, content: "  \n", isShared: false))
        XCTAssertTrue(NoteTypeChange.requiresConfirmation(fromServerType: "text", to: code, content: "<p>Hi</p>", isShared: false))
        // A language (mime) change never asks.
        XCTAssertFalse(NoteTypeChange.requiresConfirmation(fromServerType: "code", to: code, content: "x", isShared: true))
        // Shared notes always ask; unreadable content asks.
        XCTAssertTrue(NoteTypeChange.requiresConfirmation(fromServerType: "text", to: code, content: "", isShared: true))
        XCTAssertTrue(NoteTypeChange.requiresConfirmation(fromServerType: "text", to: code, content: nil, isShared: false))
    }

    func testContentOutcomes() {
        func outcome(_ from: String, _ content: String, _ entry: NoteTypeChange.Entry) -> NoteTypeChange.ContentOutcome {
            NoteTypeChange.contentOutcome(fromServerType: from, content: content, to: entry.target)
        }
        XCTAssertEqual(outcome("text", "<p>Hi</p>", .code), .shownAsSource)
        XCTAssertEqual(outcome("text", "<p>Hi</p>", .markdown), .shownAsSource)
        XCTAssertEqual(outcome("code", "graph TD; A-->B", .mermaid), .kept)
        XCTAssertEqual(outcome("mermaid", "graph TD; A-->B", .text), .reformatted)
        XCTAssertEqual(outcome("book", "<p>Old</p>", .text), .kept)
        XCTAssertEqual(outcome("text", "<p>Hi</p>", .collection), .hidden)
        XCTAssertEqual(outcome("text", "<p>Hi</p>", .webView), .hidden)
        XCTAssertEqual(outcome("text", "<p>Hi</p>", .canvas), .replacedOnEdit)
        XCTAssertEqual(outcome("code", NoteType.emptyCanvasNoteJSON, .canvas), .kept)
        XCTAssertEqual(outcome("text", "<p>Hi</p>", .mindMap), .replacedOnEdit)
        XCTAssertEqual(outcome("code", NoteType.emptyMindMapJSON, .mindMap), .kept)
        XCTAssertEqual(outcome("code", NoteType.emptySpreadsheetJSON, .spreadsheet), .kept)
        XCTAssertEqual(outcome("code", #"{"id":"w","sheets":{"s1":{}}}"#, .spreadsheet), .kept)
        XCTAssertEqual(outcome("canvas", NoteType.emptyCanvasNoteJSON, .spreadsheet), .replacedOnEdit)
        XCTAssertEqual(outcome("text", "<p>Hi</p>", .relationMap), .replacedOnEdit)
        XCTAssertEqual(outcome("code", #"{"notes":[],"links":[]}"#, .relationMap), .kept)
    }

    func testConfirmationIsDestructiveOnlyWhenContentWillBeReplaced() throws {
        let replaces = try XCTUnwrap(NoteTypeChange.confirmation(
            fromServerType: "text", to: NoteTypeChange.Entry.canvas.target, targetTitle: "Canvas",
            content: "<p>Hi</p>", isShared: false
        ))
        XCTAssertTrue(replaces.replacesContent)
        XCTAssertTrue(replaces.title.contains("Canvas"))

        let keeps = try XCTUnwrap(NoteTypeChange.confirmation(
            fromServerType: "code", to: NoteTypeChange.Entry.mermaid.target, targetTitle: "Mermaid",
            content: "graph TD", isShared: false
        ))
        XCTAssertFalse(keeps.replacesContent)

        let shared = try XCTUnwrap(NoteTypeChange.confirmation(
            fromServerType: "text", to: NoteTypeChange.Entry.code.target, targetTitle: "Code",
            content: "", isShared: true
        ))
        XCTAssertFalse(shared.message.isEmpty)
        XCTAssertFalse(shared.replacesContent)

        let unknown = try XCTUnwrap(NoteTypeChange.confirmation(
            fromServerType: "text", to: NoteTypeChange.Entry.code.target, targetTitle: "Code",
            content: nil, isShared: false
        ))
        XCTAssertTrue(unknown.replacesContent)

        XCTAssertNil(NoteTypeChange.confirmation(
            fromServerType: "text", to: NoteTypeChange.Entry.canvas.target, targetTitle: "Canvas",
            content: "", isShared: false
        ))
    }

    func testCollectionViewDefaultsToGrid() {
        XCTAssertEqual(NoteTypeChange.currentView(viewTypeLabel: nil), .grid)
        XCTAssertEqual(NoteTypeChange.currentView(viewTypeLabel: "board"), .board)
        XCTAssertEqual(NoteTypeChange.currentView(viewTypeLabel: "unknown"), .grid)
    }

    func testFormerGeoMapShowsAsItsNewType() {
        let template = AttributeResponse(
            attributeId: "t1", noteId: "m", type: "relation", name: "template", value: "_template_geo_map",
            position: 0, isInheritable: false, utcDateModified: nil
        )
        let asText = NoteItem(from: TestFixtures.noteResponse(id: "m", type: "text", attributes: [template]))
        XCTAssertFalse(asText.isSemanticGeoMap)
        let asBook = NoteItem(from: TestFixtures.noteResponse(id: "m", type: "book", mime: "", attributes: [template]))
        XCTAssertTrue(asBook.isSemanticGeoMap)
    }
}
