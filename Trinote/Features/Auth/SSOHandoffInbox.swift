import Foundation

@MainActor
enum SSOHandoffInbox {
    private static var continuation: CheckedContinuation<URL, Error>?
    private static var pending: URL?

    static func prepare() {
        pending = nil
        if let continuation {
            self.continuation = nil
            continuation.resume(throwing: SSOLoginError.cancelled)
        }
    }

    static func wait() async throws -> URL {
        if let pending {
            self.pending = nil
            return pending
        }
        return try await withCheckedThrowingContinuation { continuation in
            self.continuation = continuation
        }
    }

    @discardableResult
    static func deliver(_ url: URL) -> Bool {
        guard TriliumSSOHandoff.isHandoffURL(url) else { return false }
        if let continuation {
            self.continuation = nil
            continuation.resume(returning: url)
        } else {
            pending = url
        }
        return true
    }

    static func cancel() {
        pending = nil
        if let continuation {
            self.continuation = nil
            continuation.resume(throwing: SSOLoginError.cancelled)
        }
    }
}
