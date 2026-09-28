import CoreLocation
import Foundation

/// One-shot "where am I" for the geo map's Locate button: asks for When-In-Use permission the first time, then
/// watches positions until one is close enough, settling for the best one seen when none gets there in time.
@MainActor
final class GeoMapLocator: NSObject, CLLocationManagerDelegate {
    enum Failure: Error {
        /// Location is off for Trinote (or restricted); only Settings can change it.
        case denied
        /// No position could be read (e.g. no signal).
        case unavailable
    }

    /// How a position compares with what the Locate button wants.
    enum FixQuality: Equatable {
        /// Not a position (negative accuracy).
        case invalid
        /// Older than `freshAge`: from before the tap, so only a last resort.
        case stale
        /// Fresh, but wider than `goodAccuracy`.
        case coarse
        /// Fresh and within `goodAccuracy`: shown at once.
        case good
    }

    static let goodAccuracy: CLLocationAccuracy = 65
    static let freshAge: TimeInterval = 15
    /// A position older than this isn't shown even as a last resort.
    static let staleLimit: TimeInterval = 10 * 60
    /// Without a good fix by then, the best fresh one so far is shown.
    static let settleDelay: Duration = .seconds(4)
    /// Without any fresh fix by then, the lookup gives up (or shows a recent stale one).
    static let timeout: Duration = .seconds(15)

    nonisolated static func quality(of location: CLLocation, now: Date) -> FixQuality {
        guard location.horizontalAccuracy >= 0 else { return .invalid }
        guard now.timeIntervalSince(location.timestamp) <= freshAge else { return .stale }
        return location.horizontalAccuracy <= goodAccuracy ? .good : .coarse
    }

    private let manager = CLLocationManager()
    /// Everyone waiting for the current lookup: a second tap joins it rather than cancelling it.
    private var waiters: [CheckedContinuation<Result<CLLocation, Failure>, Never>] = []
    private var best: CLLocation?
    private var lastResort: CLLocation?
    private var isUpdating = false
    private var deadline: Task<Void, Never>?

    override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyNearestTenMeters
    }

    func currentLocation() async -> Result<CLLocation, Failure> {
        await withCheckedContinuation { continuation in
            waiters.append(continuation)
            guard waiters.count == 1 else { return }
            best = nil
            lastResort = nil
            switch manager.authorizationStatus {
            case .notDetermined:
                // Continues in `locationManagerDidChangeAuthorization`.
                manager.requestWhenInUseAuthorization()
            case .authorizedWhenInUse, .authorizedAlways:
                startLocating()
            default:
                finish(.failure(.denied))
            }
        }
    }

    private func startLocating() {
        if let known = manager.location {
            consider(known)
            guard !waiters.isEmpty else { return }
        }
        guard !isUpdating else { return }
        isUpdating = true
        manager.startUpdatingLocation()
        deadline?.cancel()
        deadline = Task { [weak self] in
            try? await Task.sleep(for: Self.settleDelay)
            guard !Task.isCancelled, let self else { return }
            if let best = self.best {
                self.finish(.success(best))
                return
            }
            try? await Task.sleep(for: Self.timeout - Self.settleDelay)
            guard !Task.isCancelled else { return }
            if let fix = self.best ?? self.lastResort {
                self.finish(.success(fix))
            } else {
                self.finish(.failure(.unavailable))
            }
        }
    }

    private func consider(_ location: CLLocation) {
        let now = Date()
        switch Self.quality(of: location, now: now) {
        case .invalid:
            break
        case .stale:
            if now.timeIntervalSince(location.timestamp) <= Self.staleLimit,
               lastResort.map({ location.timestamp > $0.timestamp }) ?? true {
                lastResort = location
            }
        case .coarse:
            if best.map({ location.horizontalAccuracy < $0.horizontalAccuracy }) ?? true {
                best = location
            }
        case .good:
            finish(.success(location))
        }
    }

    private func finish(_ result: Result<CLLocation, Failure>) {
        deadline?.cancel()
        deadline = nil
        if isUpdating {
            manager.stopUpdatingLocation()
            isUpdating = false
        }
        let pending = waiters
        waiters = []
        for waiter in pending {
            waiter.resume(returning: result)
        }
    }

    nonisolated func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        let status = manager.authorizationStatus
        Task { @MainActor in
            guard !self.waiters.isEmpty else { return }
            switch status {
            case .authorizedWhenInUse, .authorizedAlways:
                self.startLocating()
            case .notDetermined:
                break
            default:
                self.finish(.failure(.denied))
            }
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        Task { @MainActor in
            for location in locations where !self.waiters.isEmpty {
                self.consider(location)
            }
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        let code = (error as? CLError)?.code
        let description = error.localizedDescription
        Task { @MainActor in
            if code == .denied {
                self.finish(.failure(.denied))
            } else {
                // `locationUnknown` (no fix yet) and other hiccups pass: Core Location keeps trying, and the
                // deadline decides when to stop.
                Log.geoMap.info("Locate: \(description), still trying")
            }
        }
    }
}
