import WebKit
import XCTest
@testable import Trinote

/// iPhone sideways typing in the real editor: one toolbar row with Hide Keyboard at its end, and the person's
/// top/bottom choice for the insert tools kept for when it ends.
@MainActor
final class LandscapeTypingEditorTests: XCTestCase {
    private final class Loader: NSObject, WKNavigationDelegate {
        var finished: CheckedContinuation<Void, Never>?
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            finished?.resume()
            finished = nil
        }
    }

    private struct ToolbarState: Decodable, Equatable {
        var topRowShown: Bool
        var hideKeyboardShown: Bool
        var swapShown: Bool
        var imageInBottomRow: Bool
    }

    private var web: WKWebView!
    private let loader = Loader()

    override func setUp() async throws {
        try await super.setUp()
        web = WKWebView(frame: CGRect(x: 0, y: 0, width: 800, height: 360), configuration: WKWebViewConfiguration())
        web.navigationDelegate = loader
        let url = try XCTUnwrap(Bundle.main.url(forResource: "editor", withExtension: "html"))
        await withCheckedContinuation { continuation in
            loader.finished = continuation
            web.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
        }
    }

    private func call(_ script: String) async throws -> Any? {
        try await web.callAsyncJavaScript(script, arguments: [:], contentWorld: .page)
    }

    private func toolbarState() async throws -> ToolbarState {
        let json = try await call("""
            const shown = (el) => !!el && getComputedStyle(el).display !== 'none';
            const image = document.querySelector('[title="Image"]');
            return JSON.stringify({
              topRowShown: shown(document.getElementById('toolbar-top-wrap')),
              hideKeyboardShown: shown(document.getElementById('toolbar-hide-keyboard')),
              swapShown: shown(document.getElementById('toolbar-swap')),
              imageInBottomRow: !!image && document.getElementById('toolbar').contains(image)
            });
            """) as? String ?? "{}"
        return try JSONDecoder().decode(ToolbarState.self, from: Data(json.utf8))
    }

    func testSidewaysTypingShowsOneRowWithHideKeyboardThenRestoresTheTopRow() async throws {
        _ = try await call("editorBridge.setInsertToolsAtTop(true); return 1")
        let upright = try await toolbarState()
        XCTAssertEqual(upright, ToolbarState(topRowShown: true, hideKeyboardShown: false, swapShown: true, imageInBottomRow: false))

        _ = try await call("editorBridge.setLandscapeTyping(true); return 1")
        let sideways = try await toolbarState()
        XCTAssertEqual(sideways, ToolbarState(topRowShown: false, hideKeyboardShown: true, swapShown: false, imageInBottomRow: true))

        _ = try await call("editorBridge.setLandscapeTyping(false); return 1")
        let after = try await toolbarState()
        XCTAssertEqual(after, upright)
    }

    func testChoiceChangedWhileTypingSidewaysAppliesWhenItEnds() async throws {
        _ = try await call("editorBridge.setInsertToolsAtTop(false); return 1")
        _ = try await call("editorBridge.setLandscapeTyping(true); return 1")
        _ = try await call("editorBridge.setInsertToolsAtTop(true); return 1")
        let sideways = try await toolbarState()
        XCTAssertFalse(sideways.topRowShown, "The top row stays folded into the bottom one while typing sideways")

        _ = try await call("editorBridge.setLandscapeTyping(false); return 1")
        let after = try await toolbarState()
        XCTAssertTrue(after.topRowShown)
        XCTAssertFalse(after.imageInBottomRow)
    }

    func testHideKeyboardBlursTheEditor() async throws {
        _ = try await call("editorBridge.setLandscapeTyping(true); editor.commands.focus(); return 1")
        let blurred = try await call("""
            document.getElementById('toolbar-hide-keyboard').click();
            return editor.view.hasFocus() ? 0 : 1;
            """) as? Int
        XCTAssertEqual(blurred, 1)
    }
}
