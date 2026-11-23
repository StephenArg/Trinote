import Foundation
import Network
import Observation

@Observable
@MainActor
final class NetworkMonitor {
    static let shared = NetworkMonitor()

    /// Starts pessimistic until `NWPathMonitor` reports a path (avoids treating the device as “online” during cold launch while offline).
    var isConnected = false
    var connectionType: ConnectionType = .unknown
    /// Goes up when the network changes while staying connected (a VPN turning on or off, Wi-Fi to cellular). The
    /// phone was online before and after, but the server may have come into reach or gone out of it.
    private(set) var pathRevision = 0
    @ObservationIgnored private var lastPath: NWPath?

    enum ConnectionType: String {
        case wifi
        case cellular
        case wiredEthernet
        case unknown
    }

    private let monitor = NWPathMonitor()
    private let queue = DispatchQueue(label: "com.trinote.networkmonitor")

    private init() {
        monitor.pathUpdateHandler = { [weak self] path in
            Task { @MainActor in
                self?.apply(path: path)
            }
        }
        monitor.start(queue: queue)
        apply(path: monitor.currentPath)
    }

    /// Re-reads the system's current network. For tests that set `isConnected` themselves: putting back a value
    /// read earlier can leave it wrong for good, since the system only reports changes.
    func resync() {
        apply(path: monitor.currentPath)
    }

    private func apply(path: NWPath) {
        let connected = path.status == .satisfied
        if connected, isConnected, let lastPath, lastPath != path {
            pathRevision &+= 1
        }
        lastPath = path
        isConnected = connected
        connectionType = Self.mapConnectionType(path)
    }

    private static func mapConnectionType(_ path: NWPath) -> ConnectionType {
        if path.usesInterfaceType(.wifi) { return .wifi }
        if path.usesInterfaceType(.cellular) { return .cellular }
        if path.usesInterfaceType(.wiredEthernet) { return .wiredEthernet }
        return .unknown
    }
}
