import XCTest
@testable import Trinote

final class MermaidSVGCacheTests: XCTestCase {
    func testKeepsAtMostTheEntryLimitDroppingTheLeastRecentlyUsed() {
        var cache = MermaidSVGCache(maxEntries: 2, maxBytes: 1_000)
        cache.insert("<svg>a</svg>", forKey: "a")
        cache.insert("<svg>b</svg>", forKey: "b")
        XCTAssertEqual(cache.value(forKey: "a"), "<svg>a</svg>", "reading a makes b the least recently used")

        cache.insert("<svg>c</svg>", forKey: "c")

        XCTAssertEqual(cache.count, 2)
        XCTAssertNil(cache.value(forKey: "b"))
        XCTAssertNotNil(cache.value(forKey: "a"))
        XCTAssertNotNil(cache.value(forKey: "c"))
    }

    func testStaysWithinTheByteLimit() {
        var cache = MermaidSVGCache(maxEntries: 10, maxBytes: 100)
        cache.insert(String(repeating: "x", count: 60), forKey: "first")
        cache.insert(String(repeating: "y", count: 60), forKey: "second")

        XCTAssertEqual(cache.totalBytes, 60)
        XCTAssertNil(cache.value(forKey: "first"))
        XCTAssertNotNil(cache.value(forKey: "second"))
    }

    func testDoesNotKeepAnSVGLargerThanTheWholeCache() {
        var cache = MermaidSVGCache(maxEntries: 10, maxBytes: 100)
        cache.insert("<svg/>", forKey: "small")

        cache.insert(String(repeating: "z", count: 101), forKey: "huge")

        XCTAssertNil(cache.value(forKey: "huge"))
        XCTAssertEqual(cache.value(forKey: "small"), "<svg/>")
    }

    func testReplacingAKeyCountsOnlyTheNewSize() {
        var cache = MermaidSVGCache(maxEntries: 10, maxBytes: 100)
        cache.insert(String(repeating: "a", count: 40), forKey: "k")
        cache.insert(String(repeating: "b", count: 10), forKey: "k")

        XCTAssertEqual(cache.count, 1)
        XCTAssertEqual(cache.totalBytes, 10)
    }

    func testRemoveAllEmptiesIt() {
        var cache = MermaidSVGCache()
        cache.insert("<svg/>", forKey: "k")

        cache.removeAll()

        XCTAssertEqual(cache.count, 0)
        XCTAssertEqual(cache.totalBytes, 0)
        XCTAssertNil(cache.value(forKey: "k"))
    }
}
