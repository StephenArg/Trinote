import XCTest
@testable import Trinote

final class TriliumNoteBodyPolicyTests: XCTestCase {
    func testKnownEmptyBlobId() {
        XCTAssertTrue(TriliumNoteBodyPolicy.isKnownEmptyBlobId(TriliumNoteBodyPolicy.emptyBlobId))
        XCTAssertFalse(TriliumNoteBodyPolicy.isKnownEmptyBlobId("other"))
        XCTAssertFalse(TriliumNoteBodyPolicy.isKnownEmptyBlobId(nil))
    }

    func testConfirmedEmptyCachedBody() {
        XCTAssertTrue(
            TriliumNoteBodyPolicy.isConfirmedEmptyCachedBody(content: Data(), contentFetchedAt: .now)
        )
        XCTAssertFalse(
            TriliumNoteBodyPolicy.isConfirmedEmptyCachedBody(content: Data(), contentFetchedAt: nil)
        )
        XCTAssertFalse(
            TriliumNoteBodyPolicy.isConfirmedEmptyCachedBody(content: Data("x".utf8), contentFetchedAt: .now)
        )
    }

    func testSkipWhenMetaFreshAndEmptyBlob() {
        XCTAssertTrue(
            TriliumNoteBodyPolicy.shouldSkipGetNoteContentWhenMetaIsFresh(
                serverUtc: "2026-01-01",
                cachedUtc: "2026-01-01",
                serverBlobId: TriliumNoteBodyPolicy.emptyBlobId,
                cachedContent: Data(),
                contentFetchedAt: .now,
                hasUsableBody: false,
                shouldFetchDespiteFreshMeta: false,
                forceFetchProtected: false
            )
        )
    }

    func testNoSkipWhenGeoMapNeedsBody() {
        let geo = NoteItem(
            noteId: "g",
            title: "Map",
            type: .book,
            mime: "text/html",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: [],
            childNoteIds: ["c1"],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: [
                AttributeItem(
                    attributeId: "a1",
                    noteId: "g",
                    type: .label,
                    name: "viewType",
                    value: "geoMap",
                    position: 0,
                    isInheritable: false
                )
            ]
        )
        XCTAssertTrue(geo.isSemanticGeoMap)
        XCTAssertTrue(
            TriliumNoteBodyPolicy.shouldFetchBodyDespiteFreshMeta(
                note: geo,
                hasUsableBody: false,
                childNoteIds: ["c1"]
            )
        )
        XCTAssertFalse(
            TriliumNoteBodyPolicy.shouldSkipGetNoteContentWhenMetaIsFresh(
                serverUtc: "2026-01-01",
                cachedUtc: "2026-01-01",
                serverBlobId: TriliumNoteBodyPolicy.emptyBlobId,
                cachedContent: Data(),
                contentFetchedAt: .now,
                hasUsableBody: false,
                shouldFetchDespiteFreshMeta: true,
                forceFetchProtected: false
            )
        )
    }
}
