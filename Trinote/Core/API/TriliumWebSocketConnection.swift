import Foundation

/// Minimal Trilium-style WebSocket client: same host/path as HTTP, shared cookies, debounced sync trigger.
@MainActor
final class TriliumWebSocketConnection: NSObject, URLSessionWebSocketDelegate {
    private var task: URLSessionWebSocketTask?
    private var session: URLSession!
    private var reconnectAttempt = 0
    private var debounceTask: Task<Void, Never>?
    /// Invalidates receive loops belonging to sockets we have already torn down, so a stale
    /// completion cannot drive a reconnect for a connection nobody is using any more.
    private var connectionGeneration = 0
    private var isReconnectScheduled = false
    private var lastPingAckAt: Date?

    /// We answer the server's `ping` with a message of the same type, so without a floor the two
    /// sides can trade pings as fast as the socket allows. Trilium's own client pings once a second.
    private static let pingAckMinimumInterval: TimeInterval = 1

    private let cookieStorage: HTTPCookieStorage
    private let baseURL: URL
    private let cloudflareAccessCredentials: CloudflareAccessCredentials?
    private let onEvent: @Sendable () -> Void
    private let onProtectedSessionLogout: (@Sendable () -> Void)?

    init(
        baseURL: URL,
        cookieStorage: HTTPCookieStorage,
        cloudflareAccessCredentials: CloudflareAccessCredentials? = nil,
        onEvent: @escaping @Sendable () -> Void,
        onProtectedSessionLogout: (@Sendable () -> Void)? = nil
    ) {
        self.baseURL = baseURL
        self.cookieStorage = cookieStorage
        self.cloudflareAccessCredentials = cloudflareAccessCredentials?.isComplete == true ? cloudflareAccessCredentials : nil
        self.onEvent = onEvent
        self.onProtectedSessionLogout = onProtectedSessionLogout
        super.init()
        let config = URLSessionConfiguration.default
        config.httpCookieStorage = cookieStorage
        config.timeoutIntervalForRequest = 30
        self.session = URLSession(configuration: config, delegate: self, delegateQueue: nil)
    }

    func start() {
        stop()
        guard let wsURL = Self.webSocketURL(from: baseURL) else { return }
        var request = URLRequest(url: wsURL)
        if let cloudflareAccessCredentials {
            for (name, value) in cloudflareAccessCredentials.httpHeaders {
                request.setValue(value, forHTTPHeaderField: name)
            }
        }
        let t = session.webSocketTask(with: request)
        task = t
        t.resume()
        let generation = connectionGeneration
        receiveLoop(generation: generation)
    }

    func stop() {
        connectionGeneration &+= 1
        task?.cancel(with: .goingAway, reason: nil)
        task = nil
        debounceTask?.cancel()
        debounceTask = nil
    }

    private func receiveLoop(generation: Int) {
        guard generation == connectionGeneration, let task else { return }
        task.receive { [weak self] result in
            Task { @MainActor [weak self] in
                guard let self, generation == self.connectionGeneration else { return }
                switch result {
                case .success(let message):
                    switch message {
                    case .string(let text):
                        self.handleMessageText(text)
                    case .data(let data):
                        if let text = String(data: data, encoding: .utf8) {
                            self.handleMessageText(text)
                        }
                    @unknown default:
                        break
                    }
                    self.receiveLoop(generation: generation)
                case .failure:
                    self.scheduleReconnect()
                }
            }
        }
    }

    private func handleMessageText(_ text: String) {
        guard let data = text.data(using: .utf8),
              let obj = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let type = obj["type"] as? String else { return }

        switch type {
        case "frontend-update", "sync-finished", "sync-pull-in-progress", "sync-push-in-progress":
            scheduleDebouncedNotify()
        case "protectedSessionLogout":
            onProtectedSessionLogout?()
        case "ping":
            sendPingAck()
        default:
            break
        }
    }

    private func scheduleDebouncedNotify() {
        debounceTask?.cancel()
        debounceTask = Task { [onEvent] in
            try? await Task.sleep(nanoseconds: 500_000_000)
            guard !Task.isCancelled else { return }
            onEvent()
        }
    }

    private func sendPingAck() {
        let now = Date()
        if let lastPingAckAt, now.timeIntervalSince(lastPingAckAt) < Self.pingAckMinimumInterval {
            return
        }
        lastPingAckAt = now
        let payload = #"{"type":"ping"}"#
        task?.send(.string(payload)) { _ in }
    }

    private func scheduleReconnect() {
        guard !isReconnectScheduled else { return }
        isReconnectScheduled = true
        stop()
        reconnectAttempt = min(reconnectAttempt + 1, 8)
        let delay = min(Double(reconnectAttempt) * 1.5, 30)
        Task { @MainActor in
            try? await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
            self.isReconnectScheduled = false
            self.start()
        }
    }

    private static func webSocketURL(from baseURL: URL) -> URL? {
        guard var c = URLComponents(url: baseURL, resolvingAgainstBaseURL: false) else { return nil }
        c.scheme = (c.scheme == "https") ? "wss" : "ws"
        guard let u = c.url else { return nil }
        return u
    }

    nonisolated func urlSession(
        _ session: URLSession,
        webSocketTask: URLSessionWebSocketTask,
        didOpenWithProtocol protocol: String?
    ) {
        Task { @MainActor in
            self.reconnectAttempt = 0
        }
    }

    nonisolated func urlSession(
        _ session: URLSession,
        webSocketTask: URLSessionWebSocketTask,
        didCloseWith closeCode: URLSessionWebSocketTask.CloseCode,
        reason: Data?
    ) {
        Task { @MainActor in
            self.scheduleReconnect()
        }
    }
}
