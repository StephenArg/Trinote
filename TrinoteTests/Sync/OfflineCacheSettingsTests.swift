import XCTest
@testable import Trinote

final class OfflineCacheSettingsTests: XCTestCase {
    private let profileId = "offline-cache-settings-tests"

    override func tearDown() {
        OfflineCacheSettings.remove(profileId: profileId)
        super.tearDown()
    }

    func testDefaultsKeepEverythingAndFullSyncOnLaunch() {
        let settings = OfflineCacheSettings.load(profileId: profileId)
        XCTAssertTrue(settings.fullSyncOnLaunch)
        XCTAssertTrue(settings.cachesMediaBodies)
        XCTAssertTrue(settings.cachesLargeMediaBodies)
        XCTAssertFalse(settings.hasChosenFirstSync)
        XCTAssertNil(settings.maxMediaBodyBytes)
    }

    func testSavedPerProfile() {
        OfflineCacheSettings(fullSyncOnLaunch: false, cachesLargeMediaBodies: false, hasChosenFirstSync: true).save(profileId: profileId)
        let loaded = OfflineCacheSettings.load(profileId: profileId)
        XCTAssertFalse(loaded.fullSyncOnLaunch)
        XCTAssertFalse(loaded.cachesLargeMediaBodies)
        XCTAssertEqual(loaded.maxMediaBodyBytes, 5 * 1024 * 1024)
        XCTAssertEqual(OfflineCacheSettings.load(profileId: profileId + "-other"), OfflineCacheSettings())
    }

    func testMediaPolicyOnlyAppliesToImageAndFileNotes() {
        let off = MediaBodyPolicy(cachesMediaBodies: false)
        XCTAssertFalse(off.allowsBody(type: "image", blobId: "b", skippedBlobId: nil))
        XCTAssertFalse(off.allowsBody(type: "file", blobId: "b", skippedBlobId: nil))
        XCTAssertTrue(off.allowsBody(type: "text", blobId: "b", skippedBlobId: nil))

        let noLarge = MediaBodyPolicy(cachesLargeMediaBodies: false)
        XCTAssertFalse(noLarge.allowsBody(type: "file", blobId: "b", skippedBlobId: "b"), "skipped for its size, unchanged")
        XCTAssertTrue(noLarge.allowsBody(type: "file", blobId: "b2", skippedBlobId: "b"), "changed since")
        XCTAssertTrue(MediaBodyPolicy().allowsBody(type: "file", blobId: "b", skippedBlobId: "b"), "large files allowed again")
    }
}
