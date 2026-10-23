import XCTest
@testable import Trinote

/// The realtime connection must be freed once it is replaced, and sockets it already stopped must not reconnect it.
@MainActor
final class TriliumWebSocketLifecycleTests: XCTestCase {
    /// Nothing listens on the discard port, so a socket attempt fails at once and stays on this machine.
    private func makeConnection() -> TriliumWebSocketConnection {
        TriliumWebSocketConnection(
            baseURL: URL(string: "http://127.0.0.1:9")!,
            cookieStorage: HTTPCookieStorage.shared,
            onEvent: {}
        )
    }

    func testAnInvalidatedConnectionIsFreed() async throws {
        weak var weakConnection: TriliumWebSocketConnection?
        do {
            let connection = makeConnection()
            weakConnection = connection
            connection.start()
            connection.invalidate()
        }
        let deadline = Date().addingTimeInterval(5)
        while weakConnection != nil, Date() < deadline {
            try await Task.sleep(nanoseconds: 20_000_000)
        }
        XCTAssertNil(weakConnection, "its URLSession lets go of it once invalidated")
    }

    func testAnInvalidatedConnectionDoesNotStartAgain() {
        let connection = makeConnection()
        connection.invalidate()

        connection.start()

        XCTAssertNil(connection.currentSocketIdentifier)
    }

    func testTheCloseOfAStoppedSocketDoesNotReconnect() throws {
        let connection = makeConnection()
        defer { connection.invalidate() }
        connection.start()
        let stoppedSocket = try XCTUnwrap(connection.currentSocketIdentifier)
        connection.stop()

        connection.socketDidClose(taskIdentifier: stoppedSocket)

        XCTAssertFalse(connection.isReconnectScheduled)
    }

    func testTheCloseOfTheCurrentSocketReconnects() throws {
        let connection = makeConnection()
        defer { connection.invalidate() }
        connection.start()
        let currentSocket = try XCTUnwrap(connection.currentSocketIdentifier)

        connection.socketDidClose(taskIdentifier: currentSocket)

        XCTAssertTrue(connection.isReconnectScheduled)
    }
}
