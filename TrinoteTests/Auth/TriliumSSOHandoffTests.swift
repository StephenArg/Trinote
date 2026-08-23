import XCTest
@testable import Trinote

final class TriliumSSOHandoffTests: XCTestCase {
    private let baseURL = URL(string: "https://trilium.example.com")!

    func testDetectsMissingHandlerMessage() {
        XCTAssertTrue(TriliumSSOHandoff.responseIndicatesMissingHandler(
            "No handler matched for custom 'trinote-sso-handoff' request."
        ))
        XCTAssertFalse(TriliumSSOHandoff.responseIndicatesMissingHandler("<html>Return to Trinote</html>"))
    }

    func testIsHandoffURL() {
        XCTAssertTrue(TriliumSSOHandoff.isHandoffURL(URL(string: "trinote://sso-complete?p=abc")!))
        XCTAssertFalse(TriliumSSOHandoff.isHandoffURL(URL(string: "trinote://share-import")!))
        XCTAssertFalse(TriliumSSOHandoff.isHandoffURL(URL(string: "https://example.com")!))
    }

    func testStartURLIncludesNonce() {
        let url = TriliumSSOHandoff.startURL(baseURL: baseURL, nonce: "nonce-1")
        XCTAssertEqual(url.path, "/custom/trinote-sso-handoff")
        XCTAssertEqual(URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems?.first(where: { $0.name == "n" })?.value, "nonce-1")
    }

    func testCookieArchiveFromQueryPayload() throws {
        let nonce = "abc-123"
        let json = """
        {"n":"\(nonce)","cookies":[{"name":"trilium.sid","value":"sid-value"},{"name":"_csrf","value":"csrf-value"}]}
        """
        let encoded = Data(json.utf8).base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
        let url = URL(string: "trinote://sso-complete?p=\(encoded)")!
        let data = try TriliumSSOHandoff.cookieArchive(from: url, expectedNonce: nonce, baseURL: baseURL)
        XCTAssertFalse(data.isEmpty)
    }

    func testRejectsNonceMismatch() {
        let json = #"{"n":"other","cookies":[{"name":"trilium.sid","value":"sid-value"}]}"#
        let encoded = Data(json.utf8).base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
        let url = URL(string: "trinote://sso-complete?p=\(encoded)")!
        XCTAssertThrowsError(try TriliumSSOHandoff.cookieArchive(from: url, expectedNonce: "expected", baseURL: baseURL))
    }

    func testHandlerNoteSourceMatchesDocs() throws {
        let testsDir = URL(fileURLWithPath: #filePath).deletingLastPathComponent()
        let docsURL = testsDir
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .appendingPathComponent("docs/trinote-sso-handoff.js")
        let docs = try String(contentsOf: docsURL, encoding: .utf8)
        let docsBody = docs
            .split(separator: "\n", omittingEmptySubsequences: false)
            .drop(while: { $0.hasPrefix("//") || $0.trimmingCharacters(in: .whitespaces).isEmpty })
            .joined(separator: "\n")
            .trimmingCharacters(in: .whitespacesAndNewlines)
        let bundled = TriliumSSOHandoff.handlerNoteSource.trimmingCharacters(in: .whitespacesAndNewlines)
        XCTAssertEqual(bundled, docsBody)
    }

    func testRejectsMissingSessionCookie() {
        let json = #"{"n":"n1","cookies":[{"name":"_csrf","value":"csrf-value"}]}"#
        let encoded = Data(json.utf8).base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
        let url = URL(string: "trinote://sso-complete?p=\(encoded)")!
        XCTAssertThrowsError(try TriliumSSOHandoff.cookieArchive(from: url, expectedNonce: "n1", baseURL: baseURL))
    }
}
