import SwiftData
import XCTest
@testable import Trinote

/// A model only these tests use, so the store round trip doesn't depend on the app's schema.
@Model
final class StoreMoveProbeItem {
    var name: String
    @Attribute(.externalStorage) var blob: Data?

    init(name: String, blob: Data?) {
        self.name = name
        self.blob = blob
    }
}

/// Moving the SwiftData store out of the App Group container (`PersistentStoreLocation`), in temporary folders.
final class PersistentStoreLocationTests: XCTestCase {
    private var root: URL!
    private var legacy: URL { root.appending(path: "group/Library/Application Support", directoryHint: .isDirectory) }
    private var app: URL { root.appending(path: "app/Library/Application Support", directoryHint: .isDirectory) }
    private let storeFiles = ["Trinote.store", "Trinote.store-wal", "Trinote.store-shm", ".Trinote_SUPPORT/_EXTERNAL_DATA/blob-1"]

    override func setUpWithError() throws {
        root = FileManager.default.temporaryDirectory
            .appending(path: "StoreMove-\(UUID().uuidString)", directoryHint: .isDirectory)
        try FileManager.default.createDirectory(at: legacy, withIntermediateDirectories: true)
    }

    override func tearDownWithError() throws {
        try? FileManager.default.removeItem(at: root)
    }

    private func write(_ text: String, to name: String, in directory: URL) throws {
        let url = directory.appending(path: name)
        try FileManager.default.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
        try Data(text.utf8).write(to: url)
    }

    private func read(_ name: String, in directory: URL) throws -> String {
        try String(contentsOf: directory.appending(path: name), encoding: .utf8)
    }

    private func exists(_ name: String, in directory: URL) -> Bool {
        FileManager.default.fileExists(atPath: directory.appending(path: name).path)
    }

    private func makeLegacyStoreFiles() throws {
        try write("db", to: "Trinote.store", in: legacy)
        try write("wal", to: "Trinote.store-wal", in: legacy)
        try write("shm", to: "Trinote.store-shm", in: legacy)
        try write("blob", to: ".Trinote_SUPPORT/_EXTERNAL_DATA/blob-1", in: legacy)
    }

    private func assertSameFile(_ url: URL, _ expected: URL, file: StaticString = #filePath, line: UInt = #line) {
        XCTAssertEqual(url.standardizedFileURL.path, expected.standardizedFileURL.path, file: file, line: line)
    }

    func testMovesTheStoreWithItsFilesAndExternalData() throws {
        try makeLegacyStoreFiles()

        let url = PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy)

        assertSameFile(url, app.appending(path: "Trinote.store"))
        for name in storeFiles {
            XCTAssertTrue(exists(name, in: app), name)
            XCTAssertFalse(exists(name, in: legacy), name)
        }
        XCTAssertEqual(try read(".Trinote_SUPPORT/_EXTERNAL_DATA/blob-1", in: app), "blob")
        XCTAssertEqual(try read("Trinote.store-wal", in: app), "wal")

        // The next launch finds it in place.
        assertSameFile(PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy), url)
    }

    func testAFreshInstallUsesTheAppContainer() {
        let url = PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy)
        assertSameFile(url, app.appending(path: "Trinote.store"))
        XCTAssertTrue(FileManager.default.fileExists(atPath: app.path), "the folder is created for SwiftData")
        XCTAssertFalse(exists("Trinote.store", in: app))
    }

    func testWithoutAnAppGroupTheAppContainerIsUsed() {
        assertSameFile(PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: nil), app.appending(path: "Trinote.store"))
    }

    private var superseded: URL { app.appending(path: "Superseded stores", directoryHint: .isDirectory) }

    /// What is set aside under `Superseded stores`, one folder per older copy.
    private func setAsideFolders() -> [URL] {
        (try? FileManager.default.contentsOfDirectory(at: superseded, includingPropertiesForKeys: nil)) ?? []
    }

    /// Builds before the App Group (April to July 2026) left their store in the app container under the same name.
    /// The App Group store is the live one: it replaces that copy, which is set aside and deleted once the store has
    /// opened from the app container.
    func testTheAppGroupStoreReplacesAnOlderCopyInTheAppContainer() throws {
        try makeLegacyStoreFiles()
        try write("old db", to: "Trinote.store", in: app)
        try write("old wal", to: "Trinote.store-wal", in: app)
        try write("old blob", to: ".Trinote_SUPPORT/_EXTERNAL_DATA/old-blob", in: app)

        let url = PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy)

        assertSameFile(url, app.appending(path: "Trinote.store"))
        XCTAssertEqual(try read("Trinote.store", in: app), "db")
        XCTAssertEqual(try read("Trinote.store-wal", in: app), "wal")
        XCTAssertEqual(try read(".Trinote_SUPPORT/_EXTERNAL_DATA/blob-1", in: app), "blob")
        XCTAssertFalse(exists(".Trinote_SUPPORT/_EXTERNAL_DATA/old-blob", in: app))
        for name in storeFiles {
            XCTAssertFalse(exists(name, in: legacy), name)
        }
        let setAside = setAsideFolders()
        XCTAssertEqual(setAside.count, 1)
        if let folder = setAside.first {
            XCTAssertEqual(try read("Trinote.store", in: folder), "old db")
            XCTAssertEqual(try read(".Trinote_SUPPORT/_EXTERNAL_DATA/old-blob", in: folder), "old blob")
        }

        PersistentStoreLocation.removeSupersededStores(afterOpening: url, in: app)

        XCTAssertFalse(FileManager.default.fileExists(atPath: superseded.path))
        XCTAssertEqual(try read("Trinote.store", in: app), "db")
    }

    /// Nothing is deleted while the store isn't open from the app container (it opened from the App Group instead).
    func testSetAsideCopiesStayUntilTheStoreOpensFromTheAppContainer() throws {
        try write("old db", to: "Superseded stores/earlier/Trinote.store", in: app)

        PersistentStoreLocation.removeSupersededStores(afterOpening: legacy.appending(path: "Trinote.store"), in: app)

        XCTAssertEqual(try read("Superseded stores/earlier/Trinote.store", in: app), "old db")
    }

    /// When the older copy can't be set aside, both stores stay as they were and the App Group store is used.
    func testAnOlderCopyThatCannotBeSetAsideLeavesBothStoresInPlace() throws {
        try makeLegacyStoreFiles()
        try write("old db", to: "Trinote.store", in: app)
        try write("old wal", to: "Trinote.store-wal", in: app)
        // The store file moves last, so its failure comes after the older copy's log has moved.
        let fileManager = FailingMoveFileManager(failingName: "Trinote.store")

        let url = PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy, fileManager: fileManager)

        assertSameFile(url, legacy.appending(path: "Trinote.store"))
        XCTAssertEqual(try read("Trinote.store", in: app), "old db")
        XCTAssertEqual(try read("Trinote.store-wal", in: app), "old wal")
        for name in storeFiles {
            XCTAssertTrue(exists(name, in: legacy), name)
        }
        XCTAssertTrue(setAsideFolders().isEmpty)
    }

    /// The whole case with real SwiftData stores: the April-to-July copy in the app container and the live store in
    /// the App Group. The live one opens from the app container, and the older copy is gone afterwards.
    func testTheLiveSwiftDataStoreReplacesAnOlderCopy() throws {
        let schema = Schema([StoreMoveProbeItem.self])
        func makeStore(at url: URL, itemName: String) throws {
            try autoreleasepool {
                let container = try ModelContainer(
                    for: schema,
                    configurations: [ModelConfiguration("Trinote", schema: schema, url: url)]
                )
                let context = ModelContext(container)
                context.insert(StoreMoveProbeItem(name: itemName, blob: Data(repeating: 7, count: 1 << 18)))
                try context.save()
            }
        }
        try FileManager.default.createDirectory(at: app, withIntermediateDirectories: true)
        try makeStore(at: app.appending(path: "Trinote.store"), itemName: "older copy")
        try makeStore(at: legacy.appending(path: "Trinote.store"), itemName: "live")

        let url = PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy)
        let container = try ModelContainer(
            for: schema,
            configurations: [ModelConfiguration("Trinote", schema: schema, url: url)]
        )
        PersistentStoreLocation.removeSupersededStores(afterOpening: url, in: app)

        assertSameFile(url, app.appending(path: "Trinote.store"))
        let items = try ModelContext(container).fetch(FetchDescriptor<StoreMoveProbeItem>())
        XCTAssertEqual(items.map(\.name), ["live"])
        XCTAssertEqual(items.first?.blob?.count, 1 << 18)
        XCTAssertFalse(FileManager.default.fileExists(atPath: superseded.path))
        XCTAssertFalse(exists("Trinote.store", in: legacy))
    }

    /// The store file moves last, so a move cut off midway (the app killed) still has it in the old place, and the
    /// next launch finishes the move.
    func testAMoveCutOffMidwayFinishesOnTheNextLaunch() throws {
        try makeLegacyStoreFiles()
        try FileManager.default.createDirectory(at: app, withIntermediateDirectories: true)
        try FileManager.default.moveItem(
            at: legacy.appending(path: "Trinote.store-wal"),
            to: app.appending(path: "Trinote.store-wal")
        )

        let url = PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy)

        assertSameFile(url, app.appending(path: "Trinote.store"))
        for name in storeFiles {
            XCTAssertTrue(exists(name, in: app), name)
            XCTAssertFalse(exists(name, in: legacy), name)
        }
    }

    func testAFailedMovePutsEverythingBackAndKeepsTheOldStore() throws {
        try makeLegacyStoreFiles()
        let fileManager = FailingMoveFileManager(failingName: ".Trinote_SUPPORT")

        let url = PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy, fileManager: fileManager)

        assertSameFile(url, legacy.appending(path: "Trinote.store"))
        for name in storeFiles {
            XCTAssertTrue(exists(name, in: legacy), name)
            XCTAssertFalse(exists(name, in: app), name)
        }
        XCTAssertEqual(try read("Trinote.store-wal", in: legacy), "wal")
    }

    /// A real SwiftData store whose data is large enough for external storage opens with that data after the move.
    func testASwiftDataStoreOpensWithItsDataAfterTheMove() throws {
        let blob = Data((0..<(1 << 20)).map { UInt8(truncatingIfNeeded: $0 &* 31) })
        let schema = Schema([StoreMoveProbeItem.self])
        try autoreleasepool {
            let configuration = ModelConfiguration("Trinote", schema: schema, url: legacy.appending(path: "Trinote.store"))
            let container = try ModelContainer(for: schema, configurations: [configuration])
            let context = ModelContext(container)
            context.insert(StoreMoveProbeItem(name: "big", blob: blob))
            try context.save()
        }
        XCTAssertTrue(exists(".Trinote_SUPPORT", in: legacy), "the data should be stored outside the database file")

        let url = PersistentStoreLocation.storeURL(in: app, movingLegacyStoreFrom: legacy)

        assertSameFile(url, app.appending(path: "Trinote.store"))
        XCTAssertFalse(exists("Trinote.store", in: legacy))
        let container = try ModelContainer(
            for: schema,
            configurations: [ModelConfiguration("Trinote", schema: schema, url: url)]
        )
        let items = try ModelContext(container).fetch(FetchDescriptor<StoreMoveProbeItem>())
        XCTAssertEqual(items.map(\.name), ["big"])
        XCTAssertEqual(items.first?.blob, blob)
    }
}

/// Fails to move the item with one name, as a full disk or a permission problem would.
private final class FailingMoveFileManager: FileManager {
    private let failingName: String

    init(failingName: String) {
        self.failingName = failingName
        super.init()
    }

    override func moveItem(at srcURL: URL, to dstURL: URL) throws {
        if srcURL.lastPathComponent == failingName { throw CocoaError(.fileWriteNoPermission) }
        try super.moveItem(at: srcURL, to: dstURL)
    }
}
