import XCTest
@testable import Trinote

final class SSEFrameParserTests: XCTestCase {

    private func frames(_ chunks: [String]) -> [String] {
        var parser = SSEFrameParser()
        var out: [String] = []
        for chunk in chunks { out += parser.feed(bytes: Array(chunk.utf8)) }
        if let last = parser.finish() { out.append(last) }
        return out
    }

    func testFramesArriveWhole() {
        XCTAssertEqual(
            frames(["data: {\"type\":\"text\",\"content\":\"Hi\"}\n\ndata: {\"type\":\"done\"}\n\n"]),
            ["{\"type\":\"text\",\"content\":\"Hi\"}", "{\"type\":\"done\"}"]
        )
    }

    func testFramesSplitAnywhereAcrossChunks() {
        let expected = ["{\"type\":\"text\",\"content\":\"Hel\"}", "{\"type\":\"text\",\"content\":\"lo\"}", "{\"type\":\"done\"}"]
        XCTAssertEqual(frames(["da", "ta: {\"type\":\"te", "xt\",\"content\":\"Hel\"}\n", "\ndata: {\"type\":\"text\",\"content\":\"lo\"}\n\ndata: {\"type\":\"done\"}\n\n"]), expected)
        XCTAssertEqual(frames(Array("data: {\"type\":\"text\",\"content\":\"Hel\"}\n\ndata: {\"type\":\"text\",\"content\":\"lo\"}\n\ndata: {\"type\":\"done\"}\n\n").map(String.init)), expected)
    }

    func testCRLFAndHeartbeatsAndOtherFields() {
        XCTAssertEqual(
            frames([":\r\n\r\nevent: message\r\nid: 7\r\ndata: {\"a\":1}\r\n\r\n: keep-alive\n\ndata:{\"b\":2}\n\n"]),
            ["{\"a\":1}", "{\"b\":2}"]
        )
    }

    func testMultiLineDataJoinsWithNewline() {
        XCTAssertEqual(frames(["data: first\ndata: second\ndata\n\n"]), ["first\nsecond\n"])
    }

    func testTrailingFrameWithoutEmptyLineComesOutOnFinish() {
        XCTAssertEqual(frames(["data: {\"type\":\"error\",\"error\":\"x\"}"]), ["{\"type\":\"error\",\"error\":\"x\"}"])
        XCTAssertEqual(frames(["data: {\"type\":\"error\",\"error\":\"x\"}\n"]), ["{\"type\":\"error\",\"error\":\"x\"}"])
        XCTAssertEqual(frames([]), [])
        XCTAssertEqual(frames(["\n\n\n"]), [])
    }

    func testLineFeeding() {
        var parser = SSEFrameParser()
        XCTAssertNil(parser.feed(line: "data: {\"x\":1}"))
        XCTAssertNil(parser.feed(line: ": heartbeat"))
        XCTAssertEqual(parser.feed(line: ""), "{\"x\":1}")
        XCTAssertNil(parser.feed(line: ""))
        XCTAssertNil(parser.feed(line: "retry: 1000"))
        XCTAssertNil(parser.finish())
    }

    func testUTF8SplitInsideACharacter() {
        let text = "data: {\"content\":\"héllo — ✓\"}\n\n"
        let bytes = Array(text.utf8)
        let cut = 20
        var parser = SSEFrameParser()
        var out = parser.feed(bytes: bytes[..<cut])
        out += parser.feed(bytes: bytes[cut...])
        XCTAssertEqual(out, ["{\"content\":\"héllo — ✓\"}"])
    }
}
