import XCTest
@testable import Trinote

final class SpreadsheetWorkbookImageURLsTests: XCTestCase {
    private let sampleWithImages = """
    {
      "version": 1,
      "workbook": {
        "sheets": {
          "sheet-1": {
            "id": "sheet-1",
            "name": "Images",
            "cellData": {
              "0": {
                "0": {
                  "p": {
                    "drawings": {
                      "d1": {
                        "drawingId": "d1",
                        "imageSourceType": "URL",
                        "source": "api/attachments/att-abc/image/photo.png"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "resources": [
          {
            "name": "SHEET_DRAWING_PLUGIN",
            "data": "{\\"sheet-1\\":{\\"data\\":{\\"float-1\\":{\\"drawingId\\":\\"float-1\\",\\"subUnitId\\":\\"sheet-1\\",\\"imageSourceType\\":\\"URL\\",\\"source\\":\\"api/attachments/att-float/image/chart.png\\"}}}}"
          }
        ]
      }
    }
    """

    func testDecorateRewritesAttachmentURLs() {
        let decorated = SpreadsheetWorkbookImageURLs.decorateForEditor(sampleWithImages)
        XCTAssertNotEqual(decorated, sampleWithImages)
        XCTAssertTrue(decorated.contains("trinote-img:"))
        XCTAssertTrue(decorated.contains("att-abc"))
        XCTAssertTrue(decorated.contains("att-float"))
        XCTAssertTrue(decorated.contains("trinoteOriginalSrc"))
    }

    func testUndecorateRestoresOriginalAttachmentURLs() {
        let decorated = SpreadsheetWorkbookImageURLs.decorateForEditor(sampleWithImages)
        let restored = SpreadsheetWorkbookImageURLs.undecorateFromEditor(decorated)
        XCTAssertTrue(restored.contains("att-abc"))
        XCTAssertTrue(restored.contains("photo.png"))
        XCTAssertTrue(restored.contains("att-float"))
        XCTAssertTrue(restored.contains("chart.png"))
        XCTAssertFalse(restored.contains("trinote-img:"))
        XCTAssertFalse(restored.contains("trinoteOriginalSrc"))
    }

    func testUndecorateRestoresBase64InlinedEditorImages() {
        let inlined = """
        {
          "version": 1,
          "workbook": {
            "resources": [
              {
                "name": "SHEET_DRAWING_PLUGIN",
                "data": "{\\"sheet-1\\":{\\"data\\":{\\"float-1\\":{\\"drawingId\\":\\"float-1\\",\\"imageSourceType\\":\\"BASE64\\",\\"source\\":\\"data:image/png;base64,AAA\\",\\"trinoteOriginalSrc\\":\\"api/attachments/att-float/image/chart.png\\"}}}}"
              }
            ]
          }
        }
        """
        let restored = SpreadsheetWorkbookImageURLs.undecorateFromEditor(inlined)
        XCTAssertTrue(restored.contains("att-float"))
        XCTAssertTrue(restored.contains("chart.png"))
        XCTAssertTrue(restored.contains("imageSourceType"))
        XCTAssertTrue(restored.contains("URL"))
        XCTAssertFalse(restored.contains("data:image/png;base64"))
        XCTAssertFalse(restored.contains("trinoteOriginalSrc"))
    }

    func testCollectReferencesFindsCellAndFloatImages() {
        let refs = SpreadsheetWorkbookImageURLs.collectReferences(in: sampleWithImages)
        XCTAssertEqual(refs.count, 2)
        XCTAssertTrue(refs.contains(.init(routeType: "attachments", entityId: "att-abc")))
        XCTAssertTrue(refs.contains(.init(routeType: "attachments", entityId: "att-float")))
    }

    func testFloatImagePreviewsParsed() {
        let floats = SpreadsheetWorkbookImageURLs.floatImagePreviews(in: sampleWithImages)
        XCTAssertEqual(floats.count, 1)
        XCTAssertEqual(floats.first?.id, "float-1")
        XCTAssertEqual(floats.first?.reference.entityId, "att-float")
    }

    func testCellImageReferenceLookup() throws {
        let data = try XCTUnwrap(sampleWithImages.data(using: .utf8))
        let root = try XCTUnwrap(JSONSerialization.jsonObject(with: data) as? [String: Any])
        let workbook = try XCTUnwrap((root["workbook"] as? [String: Any]))
        let sheet = try XCTUnwrap((workbook["sheets"] as? [String: Any])?["sheet-1"] as? [String: Any])
        let ref = SpreadsheetWorkbookImageURLs.imageReference(in: sheet, row: 0, col: 0)
        XCTAssertEqual(ref?.entityId, "att-abc")
    }
}
