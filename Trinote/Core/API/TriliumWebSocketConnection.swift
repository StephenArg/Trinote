import Foundation

/// Minimal Trilium-style WebSocket client: same host/path as HTTP, shared cookies, debounced sync trigger.
@MainActor
final class TriliumWebSocketConnection: NSObject, URLSessionWebSocketDelegate {
    private var task: URLSessionWebSocketTask?
    private var session: URLSession!
    private var reconnectAttempt = 0
    private var debounceTask: Task<Void, Never>?

    private let cookieStorage: HTTPCookieStorage
    private let baseURL: URL
    private let onEvent: @Sendable () -> Void

    init(baseURL: URL, cookieStorage: HTTPCookieStorage, onEvent: @escaping @Sendable () -> Void) {
        self.baseURL = baseURL
        self.cookieStorage = cookieStorage
        self.onEvent = onEvent
        super.init()
        let config = URLSessionConfiguration.default
        config.httpCookieStorage = cookieStorage
        config.timeoutIntervalForRequest = 30
        self.session = URLSession(configuration: config, delegate: self, delegateQueue: nil)
    }

    func start() {
        stop()
        guard let wsURL = Self.webSocketURL(from: baseURL) else { return }
        let t = session.webSocketTask(with: wsURL)
        task = t
        t.resume()
        reconnectAttempt = 0
        receiveLoop()
    }

    func stop() {
        task?.cancel(with: .goingAway, reason: nil)
        task = nil
        debounceTask?.cancel()
        debounceTask = nil
    }

    private func receiveLoop() {
        task?.receive { [weak self] result in
            guard let self else { return }
            switch result {
            case .success(let message):
                switch message {
                case .string(let text):
                    Task { @MainActor [weak self] in self?.handleMessageText(text) }
                case .data(let data):
                    if let text = String(data: data, encoding: .utf8) {
                        Task { @MainActor [weak self] in self?.handleMessageText(text) }
                    }
                @unknown default:
                    break
                }
                Task { @MainActor in self.receiveLoop() }
            case .failure:
                Task { @MainActor in self.scheduleReconnect() }
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
        let payload = #"{"type":"ping"}"#
        task?.send(.string(payload)) { _ in }
    }

    private func scheduleReconnect() {
        stop()
        reconnectAttempt = min(reconnectAttempt + 1, 8)
        let delay = min(Double(reconnectAttempt) * 1.5, 30)
        Task { @MainActor in
            try? await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
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
        didCloseWith closeCode: URLSessionWebSocketTask.CloseCode,
        reason: Data?
    ) {
        Task { @MainActor in
            self.scheduleReconnect()
        }
    }
}
