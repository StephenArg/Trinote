import XCTest
@testable import Trinote

final class TriliumSessionCookieImporterTests: XCTestCase {
    private let baseURL = URL(string: "https://trilium.example.com")!

    func testCookieDomainMatchesHost() {
        XCTAssertTrue(TriliumSessionCookieImporter.cookieDomainMatchesHost("trilium.example.com", host: "trilium.example.com"))
        XCTAssertTrue(TriliumSessionCookieImporter.cookieDomainMatchesHost(".example.com", host: "trilium.example.com"))
        XCTAssertFalse(TriliumSessionCookieImporter.cookieDomainMatchesHost("other.example.com", host: "trilium.example.com"))
    }

    func testArchiveDataFiltersForeignHostCookies() throws {
        let triliumCookie = makeCookie(name: "connect.sid", domain: "trilium.example.com")
        let googleCookie = makeCookie(name: "SID", domain: "accounts.google.com")
        let data = try TriliumSessionCookieImporter.archiveData(from: [triliumCookie, googleCookie], baseURL: baseURL)
        let decoded = try decodeArchive(data)
        XCTAssertEqual(decoded.count, 1)
        XCTAssertEqual(decoded.first?["Name"] as? String, "connect.sid")
    }

    func testArchiveDataNormalizesPathAndDomain() throws {
        let cookie = makeCookie(name: "_csrf", domain: "trilium.example.com", path: "/login")
        let data = try TriliumSessionCookieImporter.archiveData(from: [cookie], baseURL: baseURL)
        let decoded = try decodeArchive(data)
        XCTAssertEqual(decoded.first?["Domain"] as? String, "trilium.example.com")
        XCTAssertEqual(decoded.first?["Path"] as? String, "/")
    }

    func testArchiveDataRejectsEmptyHostCookies() {
        let foreign = makeCookie(name: "connect.sid", domain: "other.example.com")
        XCTAssertThrowsError(try TriliumSessionCookieImporter.archiveData(from: [foreign], baseURL: baseURL)) { error in
            guard case APIError.browserLoginFailed = error else {
                return XCTFail("Expected browserLoginFailed, got \(error)")
            }
        }
    }

    func testRoundTripThroughTriliumCookieArchive() throws {
        let cookie = makeCookie(name: "connect.sid", domain: "trilium.example.com")
        let data = try TriliumSessionCookieImporter.archiveData(from: [cookie], baseURL: baseURL)
        let jar = HTTPCookieStorage.shared
        TriliumCookieArchive.load(into: jar, data: data, defaultURL: baseURL)
        defer {
            for c in jar.cookies(for: baseURL) ?? [] {
                jar.deleteCookie(c)
            }
        }
        let loaded = jar.cookies(for: baseURL) ?? []
        XCTAssertFalse(loaded.isEmpty)
        XCTAssertTrue(loaded.contains { $0.name == "connect.sid" })
    }

    private func makeCookie(name: String, domain: String, path: String = "/") -> HTTPCookie {
        HTTPCookie(properties: [
            .name: name,
            .value: "test-value",
            .domain: domain,
            .path: path,
            .secure: "TRUE",
        ])!
    }

    private func decodeArchive(_ data: Data) throws -> [[String: Any]] {
        guard let raw = try JSONSerialization.jsonObject(with: data) as? [[String: Any]] else {
            throw APIError.decodingFailed("test archive")
        }
        return raw
    }
}
