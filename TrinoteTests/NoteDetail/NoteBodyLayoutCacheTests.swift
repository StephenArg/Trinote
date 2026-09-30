import XCTest
@testable import Trinote

@MainActor
final class NoteBodyLayoutCacheTests: XCTestCase {
    private var fileURL: URL!

    override func setUp() async throws {
        fileURL = FileManager.default.temporaryDirectory
            .appendingPathComponent("NoteBodyLayoutCacheTests-\(UUID().uuidString).json")
        NoteBodyLayoutCache.resetForTesting(fileURL: fileURL)
    }

    override func tearDown() async throws {
        try? FileManager.default.removeItem(at: fileURL)
    }

    func testNothingIsRememberedAtFirst() {
        XCTAssertNil(NoteBodyLayoutCache.height(forKey: "p/n", width: 390, signature: 1))
    }

    func testRemembersHeightForTheSamePageAndWidth() {
        NoteBodyLayoutCache.store(height: 10_508, forKey: "p/n", width: 390, signature: 42)
        XCTAssertEqual(NoteBodyLayoutCache.height(forKey: "p/n", width: 390, signature: 42), 10_508)
    }

    func testAnotherWidthOrChangedPageIsNotAMatch() {
        NoteBodyLayoutCache.store(height: 10_508, forKey: "p/n", width: 390, signature: 42)
        XCTAssertNil(NoteBodyLayoutCache.height(forKey: "p/n", width: 844, signature: 42))
        XCTAssertNil(NoteBodyLayoutCache.height(forKey: "p/n", width: 390, signature: 43))
        XCTAssertNil(NoteBodyLayoutCache.height(forKey: "p/other", width: 390, signature: 42))
    }

    func testEachWidthKeepsItsOwnHeight() {
        NoteBodyLayoutCache.store(height: 10_508, forKey: "p/n", width: 390, signature: 42)
        NoteBodyLayoutCache.store(height: 6_200, forKey: "p/n", width: 844, signature: 42)
        XCTAssertEqual(NoteBodyLayoutCache.height(forKey: "p/n", width: 390, signature: 42), 10_508)
        XCTAssertEqual(NoteBodyLayoutCache.height(forKey: "p/n", width: 844, signature: 42), 6_200)
    }

    func testANewHeightReplacesTheOldOne() {
        NoteBodyLayoutCache.store(height: 900, forKey: "p/n", width: 390, signature: 1)
        NoteBodyLayoutCache.store(height: 1_400, forKey: "p/n", width: 390, signature: 2)
        XCTAssertNil(NoteBodyLayoutCache.height(forKey: "p/n", width: 390, signature: 1))
        XCTAssertEqual(NoteBodyLayoutCache.height(forKey: "p/n", width: 390, signature: 2), 1_400)
    }

    func testHeightsSurviveARelaunch() {
        NoteBodyLayoutCache.store(height: 2_345, forKey: "p/n", width: 390, signature: .max)
        NoteBodyLayoutCache.flush()
        NoteBodyLayoutCache.resetForTesting(fileURL: fileURL)
        XCTAssertEqual(NoteBodyLayoutCache.height(forKey: "p/n", width: 390, signature: .max), 2_345)
    }

    func testOldEntriesAreDroppedPastTheLimit() {
        for i in 0...NoteBodyLayoutCache.maxEntries {
            NoteBodyLayoutCache.store(height: 500, forKey: "p/\(i)", width: 390, signature: 1)
        }
        XCTAssertLessThanOrEqual(NoteBodyLayoutCache.entryCount, NoteBodyLayoutCache.maxEntries)
        XCTAssertGreaterThan(NoteBodyLayoutCache.entryCount, 0)
    }

    func testSignatureFollowsThePageAndTheTextSize() {
        let a = NoteBodyLayoutCache.signature(ofPage: "<p>Hello</p>", contentSizeCategory: "UICTContentSizeCategoryL")
        XCTAssertEqual(a, NoteBodyLayoutCache.signature(ofPage: "<p>Hello</p>", contentSizeCategory: "UICTContentSizeCategoryL"))
        XCTAssertNotEqual(a, NoteBodyLayoutCache.signature(ofPage: "<p>Hello!</p>", contentSizeCategory: "UICTContentSizeCategoryL"))
        XCTAssertNotEqual(a, NoteBodyLayoutCache.signature(ofPage: "<p>Hello</p>", contentSizeCategory: "UICTContentSizeCategoryXL"))
    }
}

final class OpenTabSessionStoreOffsetTests: XCTestCase {
    private let tabId = "test-tab-\(UUID().uuidString)"

    override func tearDown() {
        OpenTabSessionStore.clearReadScrollState(for: tabId)
    }

    func testPositionInPointsRoundTrips() {
        let offset = ReadScrollOffset(offsetY: 2_021.5, layoutWidth: 402)
        OpenTabSessionStore.saveReadScrollOffset(offset, for: tabId)
        XCTAssertEqual(OpenTabSessionStore.readReadScrollOffset(for: tabId), offset)
    }

    func testSavingNoPositionRemovesTheOldOne() {
        OpenTabSessionStore.saveReadScrollOffset(ReadScrollOffset(offsetY: 10, layoutWidth: 402), for: tabId)
        OpenTabSessionStore.saveReadScrollOffset(nil, for: tabId)
        XCTAssertNil(OpenTabSessionStore.readReadScrollOffset(for: tabId))
    }

    func testClearingATabRemovesBothFractionAndPoints() {
        OpenTabSessionStore.saveReadScrollFraction(0.4, for: tabId)
        OpenTabSessionStore.saveReadScrollOffset(ReadScrollOffset(offsetY: 10, layoutWidth: 402), for: tabId)
        OpenTabSessionStore.clearReadScrollState(for: tabId)
        XCTAssertNil(OpenTabSessionStore.readReadScrollFraction(for: tabId))
        XCTAssertNil(OpenTabSessionStore.readReadScrollOffset(for: tabId))
    }
}
