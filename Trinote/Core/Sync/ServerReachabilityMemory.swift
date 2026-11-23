import Foundation

/// Whether a server answered when Trinote last checked, kept between launches (UserDefaults, per server profile).
/// A launch away from the server's network (a VPN that is off, say) then starts from the cache at once instead of
/// treating the server as reachable until the launch check gives up.
enum ServerReachabilityMemory {
    private static func key(profileId: String) -> String {
        "trinote.serverUnreachable." + profileId
    }

    static func wasUnreachable(profileId: String, defaults: UserDefaults = .standard) -> Bool {
        defaults.bool(forKey: key(profileId: profileId))
    }

    static func remember(unreachable: Bool, profileId: String, defaults: UserDefaults = .standard) {
        if unreachable {
            defaults.set(true, forKey: key(profileId: profileId))
        } else {
            defaults.removeObject(forKey: key(profileId: profileId))
        }
    }

    static func forget(profileId: String, defaults: UserDefaults = .standard) {
        defaults.removeObject(forKey: key(profileId: profileId))
    }
}
