import XCTest
@testable import Trinote

final class SettingsTabPreferencesTests: XCTestCase {
    override func setUp() {
        super.setUp()
        UserDefaults.standard.removeObject(forKey: SettingsTabPreferences.lastOpenedTabKey)
    }

    override func tearDown() {
        UserDefaults.standard.removeObject(forKey: SettingsTabPreferences.lastOpenedTabKey)
        super.tearDown()
    }

    func testLastOpenedTabDefaultsToAppearance() {
        XCTAssertEqual(SettingsTabPreferences.lastOpenedTab, .appearance)
    }

    func testLastOpenedTabPersists() {
        SettingsTabPreferences.lastOpenedTab = .account
        XCTAssertEqual(SettingsTabPreferences.lastOpenedTab, .account)

        SettingsTabPreferences.lastOpenedTab = .data
        XCTAssertEqual(SettingsTabPreferences.lastOpenedTab, .data)
    }

    func testLastOpenedTabCanBeRestoredToAppearance() {
        SettingsTabPreferences.lastOpenedTab = .data
        SettingsTabPreferences.lastOpenedTab = .appearance
        XCTAssertEqual(SettingsTabPreferences.lastOpenedTab, .appearance)
    }

    func testInvalidStoredValueFallsBackToAppearance() {
        UserDefaults.standard.set("not-a-tab", forKey: SettingsTabPreferences.lastOpenedTabKey)
        XCTAssertEqual(SettingsTabPreferences.lastOpenedTab, .appearance)
    }
}
