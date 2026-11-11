import UIKit
import WebKit
import XCTest
@testable import Trinote

/// The real spreadsheet page with the bundled Univer: it starts in its mobile layout, opens a workbook, keeps what's in
/// it, and reports edits. Trinote patches Univer's touch handling, so an upgrade can break it without a build error.
@MainActor
final class UniverEditorSmokeTests: XCTestCase {
    /// The page's web process ended, which says nothing about the page: on the iOS 26.2 simulator it sometimes dies with
    /// a bus error inside dyld or JavaScriptCore while this page loads, with Univer 0.25.1 as well as 1.3.1.
    private struct PageProcessEnded: Error {}

    private final class Recorder: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
        var ready = false
        var changes = 0
        var cells: [String] = []
        var logs: [String] = []
        var processEnded = false
        var finished: CheckedContinuation<Void, Never>?

        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "univerReady": ready = true
            case "workbookChanged": changes += 1
            case "cellSelection": cells.append("\(message.body)")
            default: logs.append("\(message.body)")
            }
        }

        func finishLoading() {
            finished?.resume()
            finished = nil
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            finishLoading()
        }

        func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
            processEnded = true
            finishLoading()
        }

        // How it shows when the process dies while launching.
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            processEnded = true
            finishLoading()
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            processEnded = true
            finishLoading()
        }
    }

    private var recorder = Recorder()
    private var web: WKWebView!

    override func tearDown() async throws {
        web?.removeFromSuperview()
        web = nil
        try await super.tearDown()
    }

    private func until(_ what: String, seconds: Double = 30, _ condition: () async throws -> Bool) async throws {
        let deadline = Date().addingTimeInterval(seconds)
        while Date() < deadline {
            if recorder.processEnded { throw PageProcessEnded() }
            if try await condition() { return }
            try await Task.sleep(nanoseconds: 100_000_000)
        }
        XCTFail("timed out waiting for \(what). Page log: \(recorder.logs.suffix(12)); cells reported: \(recorder.cells.suffix(3))")
        throw XCTSkip("no point going on")
    }

    /// Runs a script, giving up after a while so a page that stops answering can't hold up the whole test run.
    private func call(_ script: String, _ arguments: [String: Any] = [:]) async throws -> Any? {
        let web: WKWebView = self.web
        do {
            return try await withCheckedThrowingContinuation { continuation in
                var isDone = false
                func finish(_ result: Result<Any?, Error>) {
                    guard !isDone else { return }
                    isDone = true
                    continuation.resume(with: result)
                }
                web.callAsyncJavaScript(script, arguments: arguments, in: nil, in: .page) { result in
                    finish(result.map { $0 })
                }
                Task { @MainActor in
                    try? await Task.sleep(nanoseconds: 30_000_000_000)
                    finish(.failure(URLError(.timedOut)))
                }
            }
        } catch {
            // WebKit can report the failed script a moment before it reports the process.
            for _ in 0..<20 where !recorder.processEnded { try await Task.sleep(nanoseconds: 50_000_000) }
            if recorder.processEnded { throw PageProcessEnded() }
            XCTFail("page script failed: \(script.prefix(90)) — \(error)")
            throw error
        }
    }

    func testOpensAWorkbookInItsMobileLayoutAndKeepsIt() async throws {
        for _ in 0..<3 {
            do {
                try await openAndCheckWorkbook()
                return
            } catch is PageProcessEnded {
                continue
            }
        }
        // A web process that ended or never ran any script says nothing about the page. A page that ran and then
        // never started, such as one with a broken bundle, logs an error and fails here.
        XCTAssertTrue(recorder.processEnded || recorder.logs.isEmpty, "the page never started. Page log: \(recorder.logs.suffix(12))")
        throw XCTSkip("The simulator's web process ended on every try, so the page couldn't be checked.")
    }

    private func openAndCheckWorkbook() async throws {
        try await openPage()
        try await checkWorkbook()
    }

    /// Opens the real page in the app's window and waits for Univer to start.
    private func openPage() async throws {
        recorder = Recorder()
        let window = try XCTUnwrap(
            UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.flatMap(\.windows).first,
            "the test host has no window"
        )
        let controller = WKUserContentController()
        for name in ["univerReady", "workbookChanged", "univerLog", "trinoteImageRequest", "cellSelection"] {
            controller.add(recorder, name: name)
        }
        controller.addUserScript(WKUserScript(source: """
            (function () {
              var origError = console.error;
              console.error = function () {
                try { window.webkit.messageHandlers.univerLog.postMessage('ERROR: ' + Array.from(arguments).join(' ')); } catch (e) {}
                origError.apply(console, arguments);
              };
              window.addEventListener('error', function (e) {
                try { window.webkit.messageHandlers.univerLog.postMessage('ERROR: ' + e.message); } catch (x) {}
              });
            })();
            """, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        let configuration = WKWebViewConfiguration()
        configuration.userContentController = controller
        web = WKWebView(frame: CGRect(x: 0, y: 0, width: 390, height: 700), configuration: configuration)
        window.addSubview(web)
        web.navigationDelegate = recorder
        let url = try XCTUnwrap(Bundle.main.url(forResource: "univer-editor", withExtension: "html"))
        let loading = recorder
        let web: WKWebView = self.web
        await withCheckedContinuation { continuation in
            loading.finished = continuation
            web.loadFileURL(url, allowingReadAccessTo: Bundle.main.bundleURL)
            Task { @MainActor in
                try? await Task.sleep(nanoseconds: 15_000_000_000)
                loading.finishLoading()
            }
        }
        // A process that dies while launching doesn't always say so, and a loaded page starts within seconds.
        let deadline = Date().addingTimeInterval(15)
        while !recorder.ready {
            if recorder.processEnded || Date() >= deadline { throw PageProcessEnded() }
            try await Task.sleep(nanoseconds: 100_000_000)
        }
    }

    private func checkWorkbook() async throws {

        let workbook = #"""
        {"version":1,"workbook":{"id":"wb1","name":"Test","appVersion":"0.25.1","locale":"enUS","styles":{"s1":{"bl":1}},"sheetOrder":["sheet1"],"sheets":{"sheet1":{"id":"sheet1","name":"First","rowCount":20,"columnCount":10,"mergeData":[{"startRow":3,"endRow":3,"startColumn":0,"endColumn":1}],"cellData":{"0":{"0":{"v":"Hello","s":"s1"},"1":{"v":3,"f":"=1+2"}},"1":{"0":{"v":42}}}}}}}
        """#
        _ = try await call("await window.univerBridge.loadWorkbook(json); return 1", ["json": workbook])

        var saved: [String: Any] = [:]
        try await until("the workbook to open") {
            let text = try await self.call("return window.univerBridge.getWorkbook()") as? String ?? "{}"
            saved = try XCTUnwrap(JSONSerialization.jsonObject(with: Data(text.utf8)) as? [String: Any])
            let book = saved["workbook"] as? [String: Any]
            return (book?["sheets"] as? [String: Any])?["sheet1"] != nil
        }

        let book = try XCTUnwrap(saved["workbook"] as? [String: Any])
        XCTAssertEqual(saved["version"] as? Int, 1, "the stored envelope is unchanged")
        let sheet = try XCTUnwrap((book["sheets"] as? [String: Any])?["sheet1"] as? [String: Any])
        XCTAssertEqual(sheet["name"] as? String, "First")
        let cells = try XCTUnwrap(sheet["cellData"] as? [String: Any])
        let firstRow = try XCTUnwrap(cells["0"] as? [String: Any])
        XCTAssertEqual((firstRow["0"] as? [String: Any])?["v"] as? String, "Hello")
        XCTAssertEqual((firstRow["1"] as? [String: Any])?["f"] as? String, "=1+2", "formulas are stored as written")
        XCTAssertEqual(((cells["1"] as? [String: Any])?["0"] as? [String: Any])?["v"] as? Int, 42)
        XCTAssertEqual((sheet["mergeData"] as? [[String: Any]])?.count, 1)

        // The touch patches reach into Univer's internals; each reports a failure through the log.
        let patchErrors = recorder.logs.filter { $0.contains("configureMobile") && $0.contains("error") }
        XCTAssertEqual(patchErrors, [], "Trinote's touch patches failed to install")

        // A selection gets Trinote's fill and resize handles in place of Univer's own corners.
        _ = try await call("window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(1, 1, 2, 2).activate(); return 1")
        struct Handles: Decodable { let controls: Int; let withHandles: Int; let builtInCornersOff: Bool }
        var handles: Handles?
        // The patches install once the workbook's renderer exists, a moment after it opens.
        try await until("the selection's handles", seconds: 10) {
            let text = try await self.call("return window.univerBridge.debugSelectionHandles()") as? String ?? "{}"
            handles = try? JSONDecoder().decode(Handles.self, from: Data(text.utf8))
            return (handles?.withHandles ?? 0) > 0
        }
        XCTAssertEqual(handles?.withHandles, handles?.controls, "every selection has Trinote's handles")
        XCTAssertEqual(handles?.builtInCornersOff, true, "only Trinote's handles take touches")

        // An edit through the live API reaches the app.
        _ = try await call("await window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(5, 5).setValue('edited'); return 1")
        try await until("the edit to be reported") { recorder.changes > 0 }
        let value = try await call("return JSON.stringify(window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(5, 5).getValue())") as? String
        XCTAssertEqual(value, "\"edited\"")

        try await checkCellBarBridge()
        let errors = recorder.logs.filter { $0.hasPrefix("ERROR") }
        XCTAssertEqual(errors, [], "the page logged errors")
    }

    /// What the native cell bar asks of the page: the selected cell, typed values and formulas, clearing, undo.
    private func checkCellBarBridge() async throws {
        _ = try await call("window.univerBridge.selectCell('sheet1', 0, 1); return 1")
        let direct = try await call("return window.univerBridge.activeCell()") as? String ?? ""
        XCTAssertTrue(direct.contains(#""address":"B1""#), "activeCell: \(direct); reported: \(recorder.cells.suffix(3))")
        try await until("the selected cell to be reported", seconds: 10) {
            recorder.cells.last.map { $0.contains(#""address":"B1""#) } == true
        }
        let selected = try JSONDecoder().decode(SpreadsheetCell.self, from: Data(XCTUnwrap(recorder.cells.last).utf8))
        XCTAssertEqual(selected.text, "=1+2", "a formula shows as written")
        XCTAssertEqual(selected.sheetId, "sheet1")

        // Nothing is reported while a finger is down: an update then could disturb a drag of the selection's corners.
        _ = try await call("""
            document.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 7, bubbles: true }));
            window.univerBridge.selectCell('sheet1', 1, 0);
            return 1
            """)
        try await Task.sleep(nanoseconds: 300_000_000)
        XCTAssertFalse(recorder.cells.last?.contains(#""address":"A2""#) == true, "reported mid-gesture")
        _ = try await call("document.dispatchEvent(new PointerEvent('pointerup', { pointerId: 7, bubbles: true })); return 1")
        try await until("the report held back until the finger lifted", seconds: 5) {
            recorder.cells.last.map { $0.contains(#""address":"A2""#) } == true
        }
        XCTAssertTrue(recorder.cells.last?.contains(#""fromTap":true"#) == true, "a lifted finger counts as a tap: \(recorder.cells.last ?? "")")
        XCTAssertFalse(selected.fromTap == true, "Trinote's own selecting isn't a tap")

        _ = try await call("""
            window.univerBridge.setCellInput('sheet1', 6, 0, '12');
            window.univerBridge.setCellInput('sheet1', 6, 1, '=A7*2');
            window.univerBridge.setCellInput('sheet1', 6, 2, '25%');
            window.univerBridge.setCellInput('sheet1', 6, 3, 'words');
            return 1
            """)
        let text = try await call("return window.univerBridge.getWorkbook()") as? String ?? "{}"
        let saved = try XCTUnwrap(JSONSerialization.jsonObject(with: Data(text.utf8)) as? [String: Any])
        let book = try XCTUnwrap(saved["workbook"] as? [String: Any])
        XCTAssertNil(book["id"], "dropped on save, as Trilium v0.107 does")
        XCTAssertNil(book["locale"])
        let sheet = try XCTUnwrap((book["sheets"] as? [String: Any])?["sheet1"] as? [String: Any])
        let row = try XCTUnwrap((sheet["cellData"] as? [String: Any])?["6"] as? [String: Any])
        func cell(_ column: String) -> [String: Any] { row[column] as? [String: Any] ?? [:] }
        XCTAssertEqual(cell("0")["v"] as? Double, 12, "a typed number is a number")
        XCTAssertEqual(cell("1")["f"] as? String, "=A7*2")
        XCTAssertEqual(cell("1")["v"] as? Double, 24, "the save waits for the formula's result")
        XCTAssertEqual(cell("2")["v"] as? Double, 0.25)
        XCTAssertEqual(cell("3")["v"] as? String, "words")

        // What's typed shows in the cell at once, isn't an edit (nothing to save, nothing to undo), and is put back on
        // Cancel, formula and all.
        // The writes above report themselves after a pause; that comes first.
        try await Task.sleep(nanoseconds: 700_000_000)
        let changesBefore = recorder.changes
        _ = try await call("window.univerBridge.previewCellInput('sheet1', 0, 1, 'typing'); return 1")
        let shown = try await call("return window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(0, 1).getValue()") as? String
        XCTAssertEqual(shown, "typing")
        _ = try await call("window.univerBridge.endCellPreview('sheet1', 0, 1); return 1")
        let back = try await call("const r = window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(0, 1); return r.getFormula() + ' ' + r.getValue()") as? String
        XCTAssertEqual(back, "=1+2 3")
        try await Task.sleep(nanoseconds: 600_000_000)
        XCTAssertEqual(recorder.changes, changesBefore, "a preview doesn't mark the note changed")

        // Confirming replaces the preview with one real edit; one undo takes it back to empty, not to the preview.
        _ = try await call("""
            window.univerBridge.previewCellInput('sheet1', 8, 0, '4');
            window.univerBridge.previewCellInput('sheet1', 8, 0, '42');
            window.univerBridge.setCellInput('sheet1', 8, 0, '42');
            return 1
            """)
        let confirmed = try await call("return JSON.stringify(window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(8, 0).getValue())") as? String
        XCTAssertEqual(confirmed, "42", "a number, as typed values are")
        _ = try await call("await window.univerBridge.undo(); return 1")
        let undone = try await call("return JSON.stringify(window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(8, 0).getValue())") as? String
        XCTAssertEqual(undone, "null")

        _ = try await call("""
            window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(6, 0, 1, 4).activate();
            window.univerBridge.clearSelectedCells();
            return 1
            """)
        let cleared = try await call("return JSON.stringify(window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(6, 0, 1, 4).getValues())") as? String
        XCTAssertEqual(cleared, "[[null,null,null,null]]")
        _ = try await call("await window.univerBridge.undo(); return 1")
        let restored = try await call("return JSON.stringify(window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(6, 0).getValue())") as? String
        XCTAssertEqual(restored, "12", "one undo brings the whole selection back")
    }

    // MARK: Dragging a selection's corners

    func testDraggingASelectionsCornersResizesAndFillsIt() async throws {
        for _ in 0..<3 {
            do {
                try await openPageAndDragCorners()
                return
            } catch is PageProcessEnded {
                continue
            }
        }
        throw XCTSkip("The simulator's web process ended on every try, so the page couldn't be checked.")
    }

    private struct HandlePoints: Decodable {
        struct Point: Decodable { let x: Double; let y: Double }
        let points: [String: Point?]
        let visible: [String: Bool]
    }

    /// Touches a handle and drags it, through the page's own pointer events, as a finger would.
    private func drag(_ handle: String, by dx: Double, _ dy: Double) async throws -> String {
        var found: HandlePoints?
        var lastText = ""
        defer { if (found?.points[handle] ?? nil) == nil { print("HANDLE DEBUG: \(lastText)") } }
        try await until("the \(handle) handle on screen", seconds: 10) {
            let text = try await self.call("return window.univerBridge.debugHandlePoints()") as? String ?? "null"
            lastText = text
            found = try? JSONDecoder().decode(HandlePoints.self, from: Data(text.utf8))
            guard let point = found?.points[handle] ?? nil else { return false }
            // Univer's toolbar and sheet tabs render a moment after the canvas, and move it as they do.
            let onCanvas = try await self.call("return document.elementFromPoint(x, y)?.tagName === 'CANVAS'", ["x": point.x, "y": point.y]) as? Bool
            let stillLoading = try await self.call("return !!document.querySelector('.univer-animate-pulse')") as? Bool ?? true
            return onCanvas == true && !stillLoading
        }
        let point = try XCTUnwrap(found?.points[handle] ?? nil)
        let result = try await call("""
            const target = document.elementFromPoint(x, y);
            const fire = (type, px, py, buttons) => target.dispatchEvent(new PointerEvent(type, {
              pointerId: 21, pointerType: 'touch', isPrimary: true, clientX: px, clientY: py,
              button: 0, buttons, bubbles: true, cancelable: true, composed: true
            }));
            const pause = () => new Promise((resolve) => setTimeout(resolve, 20));
            fire('pointerdown', x, y, 1);
            for (let i = 1; i <= 10; i++) { await pause(); fire('pointermove', x + dx * i / 10, y + dy * i / 10, 1); }
            await pause();
            fire('pointerup', x + dx, y + dy, 0);
            await pause();
            return target.tagName + ' ' + window.univerAPI.getActiveWorkbook().getActiveSheet().getSelection().getActiveRange().getA1Notation();
            """, ["x": point.x, "y": point.y, "dx": dx, "dy": dy]) as? String ?? ""
        return result
    }

    private func openPageAndDragCorners() async throws {
        try await openPage()
        let workbook = #"{"version":1,"workbook":{"sheetOrder":["sheet1"],"sheets":{"sheet1":{"id":"sheet1","name":"First","rowCount":40,"columnCount":12,"cellData":{"1":{"1":{"v":1}},"2":{"1":{"v":2}}}}}}}"#
        _ = try await call("await window.univerBridge.loadWorkbook(json); return 1", ["json": workbook])
        try await until("the workbook to open") {
            try await self.call("return !!window.univerAPI.getActiveWorkbook()") as? Bool == true
        }

        // B2:B3, then the bottom-right handle dragged two columns right and three rows down.
        _ = try await call("window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(1, 1, 2, 1).activate(); return 1")
        let resized = try await drag("resizeBottomRight", by: 2 * 88, 3 * 24)
        XCTAssertTrue(resized.hasPrefix("CANVAS"), "the touch landed on \(resized)")
        XCTAssertNotEqual(resized.split(separator: " ").last, "B2:B3", "the resize handle didn't move the selection: \(resized)")

        // B2:B3 again, scrolled back (the drag scrolled right), then the fill handle at the bottom-left dragged two rows
        // down: B4:B5 get filled.
        _ = try await call("""
            const sheet = window.univerAPI.getActiveWorkbook().getActiveSheet();
            sheet.scrollToCell(0, 0);
            sheet.getRange(1, 1, 2, 1).activate();
            await new Promise((resolve) => setTimeout(resolve, 300));
            return 1
            """)
        let filled = try await drag("fillBottomLeft", by: 0, 2 * 24)
        XCTAssertTrue(filled.hasPrefix("CANVAS"), "the touch landed on \(filled)")
        let values = try await call("return JSON.stringify(window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(3, 1, 2, 1).getValues())") as? String
        XCTAssertEqual(values, "[[1],[2]]", "the fill handle copies B2:B3 down (selection after: \(filled))")

        // The options chip opens by itself after a touch fill; Fill Series turns the copy into 3 and 4.
        var options: [String] = []
        try await until("the fill options menu", seconds: 5) {
            let text = try await self.call("return JSON.stringify(Array.from(document.querySelectorAll('[role=menuitemradio]')).map((item) => item.textContent.trim()))") as? String ?? "[]"
            options = (try? JSONDecoder().decode([String].self, from: Data(text.utf8))) ?? []
            return !options.isEmpty
        }
        XCTAssertTrue(options.contains { $0.localizedCaseInsensitiveContains("series") }, "\(options)")
        _ = try await call("""
            const item = Array.from(document.querySelectorAll('[role=menuitemradio]')).find((el) => /series/i.test(el.textContent));
            item.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' }));
            item.click();
            await new Promise((resolve) => setTimeout(resolve, 300));
            return 1
            """)
        let series = try await call("return JSON.stringify(window.univerAPI.getActiveWorkbook().getActiveSheet().getRange(3, 1, 2, 1).getValues())") as? String
        XCTAssertEqual(series, "[[3],[4]]", "Fill Series continues 1, 2")
        let autoFillErrors = recorder.logs.filter { $0.contains("AutoFill") && $0.contains("error") }
        XCTAssertEqual(autoFillErrors, [], "the fill options chip couldn't be set up")
        let errors = recorder.logs.filter { $0.hasPrefix("ERROR") }
        XCTAssertEqual(errors, [], "the page logged errors")
    }
}
