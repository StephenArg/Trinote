import CryptoKit
import Foundation
import os

/// TEMP (2026-10-22): why a relaunch lands on the server login page. Records which `trilium.sid` the cookie jar, the
/// Keychain and each launch hold, as a short hash (never the value), plus 401s and the background/foreground steps.
/// Console: subsystem `com.trinote`, category `SessionTrace`. Also appended to
/// `Library/Application Support/SessionTrace.log` so it can be pulled off a device with `devicectl`.
enum SessionCookieTrace {
    private static let logger = Logger(subsystem: "com.trinote", category: "SessionTrace")
    private static let fileQueue = DispatchQueue(label: "com.trinote.session-trace")
    private static let watched = OSAllocatedUnfairLock(initialState: [String: (url: URL, tag: String)]())
    private static let observerInstalled = OSAllocatedUnfairLock(initialState: false)
    private static let maxFileBytes = 512 * 1024

    static func log(_ message: String) {
        logger.notice("\(message, privacy: .public)")
        let line = "\(timestamp()) \(message)\n"
        fileQueue.async { append(line) }
    }

    /// First 8 hex digits of the value's SHA-256; "none" when there is no value.
    static func tag(cookieValue: String?) -> String {
        guard let cookieValue, !cookieValue.isEmpty else { return "none" }
        return SHA256.hash(data: Data(cookieValue.utf8)).prefix(4).map { String(format: "%02x", $0) }.joined()
    }

    static func tag(cookies: [HTTPCookie]) -> String {
        let sids = cookies.filter { $0.name == "trilium.sid" }.map { tag(cookieValue: $0.value) }
        return sids.isEmpty ? "none(\(cookies.count) cookies)" : sids.joined(separator: "+")
    }

    /// The `trilium.sid` inside a `TriliumCookieArchive` export.
    static func tag(archive data: Data?) -> String {
        guard let data else { return "nil" }
        guard let raw = try? JSONSerialization.jsonObject(with: data) as? [[String: Any]] else { return "unreadable" }
        let sids = raw.filter { ($0["Name"] as? String) == "trilium.sid" }.map { tag(cookieValue: $0["Value"] as? String) }
        return sids.isEmpty ? "none(\(raw.count) cookies)" : sids.joined(separator: "+")
    }

    static func jarTag(for url: URL) -> String {
        tag(cookies: HTTPCookieStorage.shared.cookies(for: url) ?? [])
    }

    /// Logs every change of the shared jar's `trilium.sid` for `url`'s host from now on.
    static func watchJar(for url: URL) {
        guard let host = url.host?.lowercased() else { return }
        let current = jarTag(for: url)
        watched.withLock { $0[host] = (url, current) }
        let install = observerInstalled.withLock { installed -> Bool in
            defer { installed = true }
            return !installed
        }
        guard install else { return }
        NotificationCenter.default.addObserver(
            forName: .NSHTTPCookieManagerCookiesChanged,
            object: nil,
            queue: nil
        ) { _ in
            let entries = watched.withLock { $0 }
            for (host, entry) in entries {
                let now = jarTag(for: entry.url)
                guard now != entry.tag else { continue }
                watched.withLock { $0[host] = (entry.url, now) }
                log("jar \(host) sid \(entry.tag) -> \(now)")
            }
        }
    }

    private static func timestamp() -> String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss.SSS"
        return formatter.string(from: Date())
    }

    private static func append(_ line: String) {
        guard let dir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first else { return }
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        let file = dir.appendingPathComponent("SessionTrace.log")
        if let size = (try? FileManager.default.attributesOfItem(atPath: file.path)[.size]) as? Int, size > maxFileBytes {
            let old = dir.appendingPathComponent("SessionTrace.old.log")
            try? FileManager.default.removeItem(at: old)
            try? FileManager.default.moveItem(at: file, to: old)
        }
        let data = Data(line.utf8)
        if let handle = try? FileHandle(forWritingTo: file) {
            defer { try? handle.close() }
            _ = try? handle.seekToEnd()
            try? handle.write(contentsOf: data)
        } else {
            try? data.write(to: file)
        }
    }
}
