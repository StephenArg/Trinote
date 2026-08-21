import XCTest
@testable import Trinote

/// The byte-level probes replace `contains` / `localizedCaseInsensitiveContains` on multi-megabyte note
/// bodies, so they have to agree with the stdlib for every ASCII marker we look for.
final class ASCIISubstringSearchTests: XCTestCase {
    private let sample = """
    <p>Réunion – café ☕ naïve façade 日本語</p>\
    <figure class="image"><img src="api/attachments/aBc123_x/image/photo.jpg" alt="p"></figure>\
    <ul class="todo-list"><li><label class="todo-list__label"><input type="checkbox" checked></label></li></ul>
    """

    func testMatchesStdlibContains() {
        let needles = [
            "api/attachments/", "api/images/", "include-note", "math-tex", "data-trinote-original-src",
            "checkbox", "<img", "☕", "", "photo.jpg"
        ]
        for needle in needles {
            XCTAssertEqual(
                sample.containsASCII(needle),
                sample.contains(needle),
                "containsASCII disagreed with contains for \(needle.debugDescription)"
            )
        }
    }

    func testMatchesStdlibCaseInsensitiveContains() {
        let needles = [
            "API/Attachments/", "api/ATTACHMENTS/", "Api/Images/", "CHECKBOX", "Todo-List",
            "MATH-TEX", "aBc123_X"
        ]
        for needle in needles {
            XCTAssertEqual(
                sample.containsASCIICaseInsensitive(needle),
                sample.localizedCaseInsensitiveContains(needle),
                "containsASCIICaseInsensitive disagreed for \(needle.debugDescription)"
            )
        }
    }

    func testEdges() {
        XCTAssertFalse("abc".containsASCII(""), "matches contains(\"\")")
        XCTAssertFalse("abc".containsASCIICaseInsensitive(""))
        XCTAssertFalse("ab".containsASCII("abc"))
        XCTAssertFalse("ab".containsASCIICaseInsensitive("ABC"))
        XCTAssertTrue("xxdata:".containsASCII("data:"), "match at the very end")
        XCTAssertTrue("xxDATA:".containsASCIICaseInsensitive("data:"), "folded match at the very end")
        XCTAssertTrue("abXabc".containsASCII("abc"), "false start before the real match")
        XCTAssertTrue("aBxABc".containsASCIICaseInsensitive("abc"), "folded false start")
        XCTAssertFalse("".containsASCII("a"))
        XCTAssertTrue("日本語 math-tex".containsASCII("math-tex"), "ASCII needle in a non-ASCII body")
    }

    /// `NSMutableString as String` is what the image inliner returns, and bridged strings have no contiguous
    /// UTF-8 storage until `withUTF8` materializes it.
    func testWorksOnBridgedStrings() {
        let bridged = NSMutableString(string: sample) as String
        XCTAssertTrue(bridged.containsASCII("api/attachments/"))
        XCTAssertFalse(bridged.containsASCII("api/images/"))
        XCTAssertTrue(bridged.containsASCIICaseInsensitive("API/ATTACHMENTS/"))
        XCTAssertFalse(bridged.containsASCIICaseInsensitive("api/images/"))
    }
}
