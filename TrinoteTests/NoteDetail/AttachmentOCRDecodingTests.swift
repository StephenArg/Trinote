import XCTest
@testable import Trinote

final class AttachmentOCRDecodingTests: XCTestCase {
    private let decoder = JSONDecoder()

    func testGetTextUsesCanonicalFields() throws {
        let data = Data(#"{"success":true,"text":"hello world","hasOcr":true}"#.utf8)
        let response = try decoder.decode(AttachmentOCRTextResponse.self, from: data)
        XCTAssertEqual(response.extractedText, "hello world")
    }

    func testGetTextDoesNotRequireHasOcr() throws {
        let data = Data(#"{"success":true,"text":"scanned"}"#.utf8)
        let response = try decoder.decode(AttachmentOCRTextResponse.self, from: data)
        XCTAssertEqual(response.extractedText, "scanned")
        XCTAssertTrue(response.hasOcr)
    }

    func testProcessResultNestedText() throws {
        let data = Data(#"{"success":true,"result":{"text":"from result","confidence":0.8},"minConfidence":0}"#.utf8)
        let response = try decoder.decode(ProcessAttachmentOCRResponse.self, from: data)
        XCTAssertEqual(response.extractedText, "from result")
    }

    func testProcessResultTopLevelText() throws {
        let data = Data(#"{"success":true,"text":"top level"}"#.utf8)
        let response = try decoder.decode(ProcessAttachmentOCRResponse.self, from: data)
        XCTAssertEqual(response.extractedText, "top level")
    }
}
