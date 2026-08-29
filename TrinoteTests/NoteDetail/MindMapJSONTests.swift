import XCTest
@testable import Trinote

/// Locks in the MindElixir JSON shape Trilium stores for mind-map notes, matching
/// `IncludeNoteResolver.mindMapTreePreview` (root `nodeData.topic` + first-level `children`).
///
/// The editor lives in WKWebView (`window.mindmapEditor.getData()` → `mind.getData()`), so these
/// tests exercise the Swift-side parse of that payload, including a v0.105 styled fixture.
final class MindMapJSONTests: XCTestCase {

    private func fixtureData(_ name: String) throws -> Data {
        let bundle = Bundle(for: MindMapJSONTests.self)
        let fileURL = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .appendingPathComponent("Fixtures/\(name).json")
        let candidates: [URL?] = [
            bundle.url(forResource: name, withExtension: "json", subdirectory: "Fixtures"),
            bundle.url(forResource: name, withExtension: "json"),
            bundle.resourceURL?.appendingPathComponent("Fixtures/\(name).json"),
            FileManager.default.fileExists(atPath: fileURL.path) ? fileURL : nil,
        ]
        return try Data(contentsOf: try XCTUnwrap(candidates.compactMap { $0 }.first))
    }

    /// Mirrors `IncludeNoteResolver.mindMapTreePreview`: require `nodeData`, read `topic` + `children`.
    private func parseMindMapTree(_ json: String) -> (topic: String, childTopics: [String])? {
        let trimmed = json.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmed.hasPrefix("{") else { return nil }
        guard let data = trimmed.data(using: .utf8),
              let root = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let nodeData = root["nodeData"] as? [String: Any] else { return nil }
        let topic = (nodeData["topic"] as? String).flatMap {
            $0.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? nil : $0
        } ?? "Mind map"
        var childTopics: [String] = []
        if let children = nodeData["children"] as? [[String: Any]] {
            for child in children.prefix(12) {
                let childTopic = (child["topic"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
                if !childTopic.isEmpty {
                    childTopics.append(childTopic)
                }
            }
        }
        return (topic, childTopics)
    }

    func testEmptyMindMapJSONRoundTrips() throws {
        let json = NoteType.emptyMindMapJSON
        let data = try XCTUnwrap(json.data(using: .utf8))
        let obj = try XCTUnwrap(JSONSerialization.jsonObject(with: data) as? [String: Any])
        let nodeData = try XCTUnwrap(obj["nodeData"] as? [String: Any])
        XCTAssertEqual(nodeData["id"] as? String, "root")
        XCTAssertEqual(nodeData["topic"] as? String, "New Mind Map")
        XCTAssertEqual(nodeData["root"] as? Bool, true)
        let children = try XCTUnwrap(nodeData["children"] as? [Any])
        XCTAssertTrue(children.isEmpty)

        let roundTrip = try JSONSerialization.data(withJSONObject: obj)
        let again = try XCTUnwrap(JSONSerialization.jsonObject(with: roundTrip) as? [String: Any])
        XCTAssertEqual((again["nodeData"] as? [String: Any])?["topic"] as? String, "New Mind Map")

        let tree = try XCTUnwrap(parseMindMapTree(json))
        XCTAssertEqual(tree.topic, "New Mind Map")
        XCTAssertTrue(tree.childTopics.isEmpty)
    }

    func testParsesFirstLevelChildrenTree() throws {
        let json = """
        {
          "nodeData": {
            "id": "root",
            "topic": "Root",
            "children": [
              { "id": "a", "topic": "Alpha" },
              { "id": "b", "topic": "Beta", "children": [{ "id": "b1", "topic": "Nested" }] },
              { "id": "c", "topic": "  " }
            ]
          }
        }
        """
        let tree = try XCTUnwrap(parseMindMapTree(json))
        XCTAssertEqual(tree.topic, "Root")
        XCTAssertEqual(tree.childTopics, ["Alpha", "Beta"])
    }

    func testReturnsNilForNonMindMapJSON() {
        XCTAssertNil(parseMindMapTree(#"{"foo":"bar"}"#))
        XCTAssertNil(parseMindMapTree("not-json"))
        XCTAssertNil(parseMindMapTree(""))
    }

    /// Fixture mirrors MindElixir `getData()` at 5.15.1 / Trilium v0.105, including style, icons,
    /// image, note, arrows, and unknown keys the iOS preview must ignore.
    func testParsesV0105StyledFixtureWithoutCrashing() throws {
        let data = try fixtureData("mindmap-v0.105-styled-node")
        let obj = try XCTUnwrap(JSONSerialization.jsonObject(with: data) as? [String: Any])
        let nodeData = try XCTUnwrap(obj["nodeData"] as? [String: Any])
        XCTAssertEqual(nodeData["topic"] as? String, "Project Plan")
        XCTAssertEqual(obj["direction"] as? Int, 2)
        XCTAssertNotNil(obj["unknownRootExtension"], "Unknown root keys must remain in JSON (preview ignores them).")

        let children = try XCTUnwrap(nodeData["children"] as? [[String: Any]])
        XCTAssertEqual(children.count, 2)

        let styled = children[0]
        XCTAssertEqual(styled["topic"] as? String, "Styled node")
        XCTAssertEqual((styled["style"] as? [String: Any])?["background"] as? String, "#e64553")
        XCTAssertEqual(styled["icons"] as? [String], ["🎯"])
        XCTAssertEqual(styled["note"] as? String, "<p>Rich-text memo from Trilium v0.105</p>")
        XCTAssertNotNil(styled["unknownFutureKey"])

        let imageNode = children[1]
        XCTAssertEqual(imageNode["topic"] as? String, "Image node")
        let image = try XCTUnwrap(imageNode["image"] as? [String: Any])
        XCTAssertNotNil(image["url"])
        XCTAssertEqual(image["width"] as? Int, 48)

        let arrows = try XCTUnwrap(obj["arrows"] as? [[String: Any]])
        XCTAssertEqual(arrows.first?["from"] as? String, "n-styled")
        XCTAssertEqual(arrows.first?["to"] as? String, "n-image")

        let json = String(decoding: data, as: UTF8.self)
        let tree = try XCTUnwrap(parseMindMapTree(json))
        XCTAssertEqual(tree.topic, "Project Plan")
        XCTAssertEqual(tree.childTopics, ["Styled node", "Image node"])
    }

    func testUnknownNodeKeysDoNotBlockTopicParse() throws {
        let json = """
        {
          "nodeData": {
            "id": "root",
            "topic": "Keep me",
            "futurePluginBlob": [1, 2, 3],
            "children": [
              { "id": "x", "topic": "Child", "experimental": { "a": true } }
            ]
          },
          "meta": { "app": "trilium", "schema": 99 }
        }
        """
        let tree = try XCTUnwrap(parseMindMapTree(json))
        XCTAssertEqual(tree.topic, "Keep me")
        XCTAssertEqual(tree.childTopics, ["Child"])
    }

    /// Trilium desktop uploads a node photo as an attachment and stores a relative API URL.
    /// The mind-map WKWebView is file://, so display rewrites that to `trinote-img://` without
    /// mutating the JSON that round-trips back to the server.
    func testDesktopAttachmentImageURLMapsOntoImageScheme() throws {
        let sources = [
            "api/attachments/attAbc123/image/photo.png",
            "https://example.com/api/attachments/attAbc123/image/photo.png",
            "../api/attachments/attAbc123/image/photo.png",
            "api/images/noteId99/image/shot.jpg",
        ]
        for source in sources {
            let ref = try XCTUnwrap(TriliumAttachmentURLParser.entityReference(in: source), source)
            let schemeURL = TriliumImageScheme.url(routeType: ref.routeType, entityId: ref.entityId)
            if source.contains("images") {
                XCTAssertEqual(schemeURL, "trinote-img://images/noteId99", source)
            } else {
                XCTAssertEqual(schemeURL, "trinote-img://attachments/attAbc123", source)
            }
        }

        XCTAssertNil(TriliumAttachmentURLParser.entityReference(in: "data:image/png;base64,AAA"))
        XCTAssertNil(TriliumAttachmentURLParser.entityReference(in: "trinote-img://attachments/attAbc123"))
    }
}
