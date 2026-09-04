import XCTest
@testable import Trinote

final class SSOLoginPreferencesTests: XCTestCase {
    override func setUp() {
        super.setUp()
        UserDefaults.standard.removeObject(forKey: SSOLoginPreferences.showSetupWarningKey)
    }

    override func tearDown() {
        UserDefaults.standard.removeObject(forKey: SSOLoginPreferences.showSetupWarningKey)
        super.tearDown()
    }

    func testSetupWarningDefaultsToOn() {
        XCTAssertTrue(SSOLoginPreferences.showSetupWarning)
    }

    func testSetupWarningCanBeTurnedOff() {
        SSOLoginPreferences.showSetupWarning = false
        XCTAssertFalse(SSOLoginPreferences.showSetupWarning)
    }

    func testSetupWarningCanBeTurnedBackOn() {
        SSOLoginPreferences.showSetupWarning = false
        SSOLoginPreferences.showSetupWarning = true
        XCTAssertTrue(SSOLoginPreferences.showSetupWarning)
    }

    @MainActor
    func testConfirmSSOSetupWarningCanSkipFuturePrompts() {
        SSOLoginPreferences.showSetupWarning = true
        let viewModel = AuthViewModel()
        viewModel.confirmSSOSetupWarning(appState: AppState(), skipFutureWarnings: true)
        XCTAssertFalse(SSOLoginPreferences.showSetupWarning)
    }

    @MainActor
    func testConfirmSSOSetupWarningKeepsPromptWhenNotSkipped() {
        SSOLoginPreferences.showSetupWarning = true
        let viewModel = AuthViewModel()
        viewModel.confirmSSOSetupWarning(appState: AppState(), skipFutureWarnings: false)
        XCTAssertTrue(SSOLoginPreferences.showSetupWarning)
    }
}
