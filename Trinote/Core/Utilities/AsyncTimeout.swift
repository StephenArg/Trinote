import Foundation

/// Runs `operation`, throwing `APIError.timeout` if it hasn't finished within `seconds`; the operation is cancelled then.
/// The client's session waits for connectivity and allows 30 s per request, so a call to an unreachable server can
/// otherwise hang for a minute or more.
func withTimeout<T: Sendable>(
    seconds: TimeInterval,
    operation: @escaping @Sendable () async throws -> T
) async throws -> T {
    try await withThrowingTaskGroup(of: T.self) { group in
        group.addTask { try await operation() }
        group.addTask {
            try await Task.sleep(nanoseconds: UInt64(max(0, seconds) * 1_000_000_000))
            throw APIError.timeout
        }
        defer { group.cancelAll() }
        return try await group.next()!
    }
}
