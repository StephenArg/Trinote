import Foundation
import XCTest
@testable import Trinote

final class ProtectedSessionLockTests: XCTestCase {
    private var defaults: UserDefaults!
    private let suite = "ProtectedSessionLockTests"

    override func setUp() {
        super.setUp()
        defaults = UserDefaults(suiteName: suite)
        defaults.removePersistentDomain(forName: suite)
    }

    override func tearDown() {
        defaults.removePersistentDomain(forName: suite)
        super.tearDown()
    }

    // MARK: Policy

    func testPolicyDefaultsToLockingWhenLeavingTheApp() {
        XCTAssertEqual(ProtectedSessionLockPolicy.current(defaults: defaults), .whenLeavingApp)
        defaults.set("somethingElse", forKey: ProtectedSessionLockPolicy.storageKey)
        XCTAssertEqual(ProtectedSessionLockPolicy.current(defaults: defaults), .whenLeavingApp)
    }

    func testPolicyReadsTheStoredChoice() {
        defaults.set(ProtectedSessionLockPolicy.serverTimeout.rawValue, forKey: ProtectedSessionLockPolicy.storageKey)
        XCTAssertEqual(ProtectedSessionLockPolicy.current(defaults: defaults), .serverTimeout)
    }

    // MARK: Server timeout value

    func testReadsTriliumsOptionValue() {
        XCTAssertEqual(ProtectedSessionTimeout.seconds(fromOptionValue: "600"), 600)
        XCTAssertEqual(ProtectedSessionTimeout.seconds(fromOptionValue: " 90 "), 90)
        XCTAssertEqual(ProtectedSessionTimeout.seconds(fromOptionValue: "3600"), 3600)
    }

    func testRejectsValuesThatCannotBeATimeout() {
        XCTAssertNil(ProtectedSessionTimeout.seconds(fromOptionValue: nil))
        XCTAssertNil(ProtectedSessionTimeout.seconds(fromOptionValue: ""))
        XCTAssertNil(ProtectedSessionTimeout.seconds(fromOptionValue: "0"))
        XCTAssertNil(ProtectedSessionTimeout.seconds(fromOptionValue: "-5"))
        XCTAssertNil(ProtectedSessionTimeout.seconds(fromOptionValue: "ten"))
        XCTAssertNil(ProtectedSessionTimeout.seconds(fromOptionValue: "inf"))
    }

    func testOptionsResponseReadsTheTimeoutAndKeepsOtherValuesAsText() throws {
        let json = #"{"protectedSessionTimeout":"600","protectedSessionTimeoutTimeScale":"60","isPasswordSet":"true","someCount":12,"someFlag":false}"#
        let options = try JSONDecoder().decode(TriliumOptionsResponse.self, from: Data(json.utf8))
        XCTAssertEqual(options.protectedSessionTimeoutSeconds, 600)
        XCTAssertEqual(options["isPasswordSet"], "true")
        XCTAssertEqual(options["someCount"], "12")
        XCTAssertEqual(options["someFlag"], "false")
        XCTAssertNil(options["missing"])
    }

    func testOptionsResponseWithoutTheTimeoutGivesNoValue() throws {
        let options = try JSONDecoder().decode(TriliumOptionsResponse.self, from: Data(#"{"theme":"next"}"#.utf8))
        XCTAssertNil(options.protectedSessionTimeoutSeconds)
    }

    func testTriliumDefaultIsTenMinutes() {
        XCTAssertEqual(ProtectedSessionTimeout.triliumDefaultSeconds, 600)
    }

    // MARK: Lock moment

    func testLocksOnceTheTimeoutHasPassedSinceTheLastActivity() {
        let activity = Date(timeIntervalSince1970: 1_000_000)
        XCTAssertEqual(
            ProtectedSessionTimeout.lockDate(lastActivity: activity, timeout: 600),
            Date(timeIntervalSince1970: 1_000_600)
        )
        XCTAssertFalse(ProtectedSessionTimeout.hasExpired(lastActivity: activity, timeout: 600, now: Date(timeIntervalSince1970: 1_000_599)))
        XCTAssertTrue(ProtectedSessionTimeout.hasExpired(lastActivity: activity, timeout: 600, now: Date(timeIntervalSince1970: 1_000_600)))
        XCTAssertTrue(ProtectedSessionTimeout.hasExpired(lastActivity: activity, timeout: 600, now: Date(timeIntervalSince1970: 1_900_000)))
    }

    // MARK: Remembered per server

    func testRemembersTheServersValuePerProfile() {
        XCTAssertNil(ProtectedSessionTimeout.rememberedServerValue(profileId: "a", defaults: defaults))
        ProtectedSessionTimeout.rememberServerValue(900, profileId: "a", defaults: defaults)
        ProtectedSessionTimeout.rememberServerValue(120, profileId: "b", defaults: defaults)
        XCTAssertEqual(ProtectedSessionTimeout.rememberedServerValue(profileId: "a", defaults: defaults), 900)
        XCTAssertEqual(ProtectedSessionTimeout.rememberedServerValue(profileId: "b", defaults: defaults), 120)
        ProtectedSessionTimeout.forgetServerValue(profileId: "a", defaults: defaults)
        XCTAssertNil(ProtectedSessionTimeout.rememberedServerValue(profileId: "a", defaults: defaults))
        XCTAssertEqual(ProtectedSessionTimeout.rememberedServerValue(profileId: "b", defaults: defaults), 120)
    }

    // MARK: Display

    func testDescribesTheTimeoutInWords() {
        let en = Locale(identifier: "en_US")
        XCTAssertEqual(ProtectedSessionTimeout.localizedDuration(600, locale: en), "10 minutes")
        XCTAssertEqual(ProtectedSessionTimeout.localizedDuration(3600, locale: en), "1 hour")
        XCTAssertEqual(ProtectedSessionTimeout.localizedDuration(5400, locale: en), "1 hour, 30 minutes")
        XCTAssertEqual(ProtectedSessionTimeout.localizedDuration(90, locale: en), "1 minute, 30 seconds")
    }

    // MARK: Reopening after a relaunch

    func testAnOpenSessionIsRememberedPerServerUntilForgotten() {
        let date = Date(timeIntervalSince1970: 1_790_000_000)
        XCTAssertNil(ProtectedSessionTimeout.rememberedLastActivity(profileId: "p1", defaults: defaults))
        ProtectedSessionTimeout.rememberLastActivity(date, profileId: "p1", defaults: defaults)
        XCTAssertEqual(ProtectedSessionTimeout.rememberedLastActivity(profileId: "p1", defaults: defaults), date)
        XCTAssertNil(ProtectedSessionTimeout.rememberedLastActivity(profileId: "p2", defaults: defaults))
        ProtectedSessionTimeout.forgetLastActivity(profileId: "p1", defaults: defaults)
        XCTAssertNil(ProtectedSessionTimeout.rememberedLastActivity(profileId: "p1", defaults: defaults))
    }

    func testARelaunchReopensTheSessionOnlyWithinTheServerTimeout() {
        let now = Date(timeIntervalSince1970: 1_790_000_000)
        func canResume(_ secondsAgo: TimeInterval?, _ policy: ProtectedSessionLockPolicy = .serverTimeout) -> Bool {
            ProtectedSessionTimeout.canResume(
                lastActivity: secondsAgo.map { now.addingTimeInterval(-$0) },
                timeout: 600,
                policy: policy,
                now: now
            )
        }
        XCTAssertTrue(canResume(0))
        XCTAssertTrue(canResume(599))
        XCTAssertFalse(canResume(600), "at the timeout it locks, as the server would")
        XCTAssertFalse(canResume(3_000))
        XCTAssertFalse(canResume(nil), "no open session was remembered")
        XCTAssertFalse(canResume(10, .whenLeavingApp), "that policy locks on leaving the app")
    }
}
