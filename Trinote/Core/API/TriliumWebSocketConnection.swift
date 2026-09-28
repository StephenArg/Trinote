import Foundation

/// A Trilium `taskProgressCount` message: how far a server task (a delete, an import) has got.
struct ServerTaskProgress: Equatable, Sendable {
    let taskId: String
    let progressCount: Int
    /// Only when the request that started the task said how much there is to do.
    let totalCount: Int?
}

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
    /// `(pulled, total)` while the server pulls from its own sync server; `nil` once it finishes.
    private let onServerPullProgress: (@Sendable (_ progress: (pulled: Int, total: Int)?) -> Void)?
    /// Every client hears every task's progress, so the receiver keeps only the tasks it started.
    private let onTaskProgress: (@Sendable (ServerTaskProgress) -> Void)?
    /// Called when the socket opens again after dropping (the server restarted), not on the first open.
    private let onReconnected: (@Sendable () -> Void)?
    private var hasOpenedBefore = false

    init(
        baseURL: URL,
        cookieStorage: HTTPCookieStorage,
        cloudflareAccessCredentials: CloudflareAccessCredentials? = nil,
        onEvent: @escaping @Sendable () -> Void,
        onProtectedSessionLogout: (@Sendable () -> Void)? = nil,
        onServerPullProgress: (@Sendable (_ progress: (pulled: Int, total: Int)?) -> Void)? = nil,
        onTaskProgress: (@Sendable (ServerTaskProgress) -> Void)? = nil,
        onReconnected: (@Sendable () -> Void)? = nil
    ) {
        self.baseURL = baseURL
        self.cookieStorage = cookieStorage
        self.cloudflareAccessCredentials = cloudflareAccessCredentials?.isComplete == true ? cloudflareAccessCredentials : nil
        self.onEvent = onEvent
        self.onProtectedSessionLogout = onProtectedSessionLogout
        self.onServerPullProgress = onServerPullProgress
        self.onTaskProgress = onTaskProgress
        self.onReconnected = onReconnected
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
        onServerPullProgress?(nil)
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
        case "frontend-update":
            scheduleDebouncedNotify()
        case "sync-finished":
            onServerPullProgress?(nil)
            scheduleDebouncedNotify()
        case "sync-pull-in-progress":
            // The server is pulling from its own sync server. What it applies reaches us as `frontend-update`, and
            // `sync-finished` pulls once more at the end, so a pull per progress message would only repeat work.
            if let progress = Self.pullProgress(from: obj) {
                onServerPullProgress?(progress)
            }
        case "sync-push-in-progress":
            // The server sending its own changes upstream: nothing new for us.
            break
        case "taskProgressCount":
            if let progress = Self.taskProgress(from: obj) {
                onTaskProgress?(progress)
            }
        case "protectedSessionLogout":
            onProtectedSessionLogout?()
        case "ping":
            sendPingAck()
        default:
            break
        }
    }

    /// Trilium v0.106+ `progress: { pulled, total }` on `sync-pull-in-progress`.
    nonisolated static func pullProgress(from message: [String: Any]) -> (pulled: Int, total: Int)? {
        guard let progress = message["progress"] as? [String: Any],
              let pulled = (progress["pulled"] as? NSNumber)?.intValue,
              let total = (progress["total"] as? NSNumber)?.intValue,
              total > 0
        else { return nil }
        return (max(0, pulled), total)
    }

    /// `{ type: "taskProgressCount", taskId, progressCount, totalCount? }`. Trilium sends at most one every 300 ms.
    nonisolated static func taskProgress(from message: [String: Any]) -> ServerTaskProgress? {
        guard let taskId = message["taskId"] as? String, !taskId.isEmpty,
              let count = (message["progressCount"] as? NSNumber)?.intValue
        else { return nil }
        let total = (message["totalCount"] as? NSNumber)?.intValue
        return ServerTaskProgress(taskId: taskId, progressCount: max(0, count), totalCount: total.flatMap { $0 > 0 ? $0 : nil })
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
            if self.hasOpenedBefore {
                self.onReconnected?()
            }
            self.hasOpenedBefore = true
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
