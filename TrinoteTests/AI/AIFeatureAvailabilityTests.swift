import XCTest
@testable import Trinote

final class AIFeatureAvailabilityTests: XCTestCase {

    private func info(_ version: String) -> AppInfoResponse {
        AppInfoResponse(appVersion: version, dbVersion: 240, syncVersion: 39, buildDate: "", buildRevision: "", dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil)
    }

    private let ready = TriliumAIConfig(
        aiEnabled: true,
        providers: [LlmProviderSummary(id: "p", name: "P", provider: "openai", hasApiKey: true, selectedModels: [LlmModelInfo(id: "m", name: "M")])]
    )

    func testStatesInOrderOfPrecedence() {
        XCTAssertEqual(AIFeatureAvailability(serverInfo: info("0.104.0"), isOnline: true, config: ready), .unsupportedServer(appVersion: "0.104.0"))
        XCTAssertEqual(AIFeatureAvailability(serverInfo: info("0.104.0"), isOnline: false, config: nil), .unsupportedServer(appVersion: "0.104.0"))
        XCTAssertEqual(AIFeatureAvailability(serverInfo: info("0.106.0"), isOnline: false, config: ready), .offline)
        XCTAssertEqual(AIFeatureAvailability(serverInfo: nil, isOnline: false, config: nil), .offline)
        XCTAssertEqual(AIFeatureAvailability(serverInfo: nil, isOnline: true, config: ready), .unknown)
        XCTAssertEqual(AIFeatureAvailability(serverInfo: info("0.106.0"), isOnline: true, config: nil), .unknown)
        XCTAssertEqual(AIFeatureAvailability(serverInfo: info("0.106.0"), isOnline: true, config: TriliumAIConfig(aiEnabled: false, providers: ready.providers)), .disabled)
        XCTAssertEqual(AIFeatureAvailability(serverInfo: info("0.106.0"), isOnline: true, config: TriliumAIConfig(aiEnabled: true, providers: [])), .noProviders)
        XCTAssertEqual(AIFeatureAvailability(serverInfo: info("0.105.0"), isOnline: true, config: ready), .ready)
        XCTAssertTrue(AIFeatureAvailability.ready.canSend)
        XCTAssertFalse(AIFeatureAvailability.noProviders.canSend)
        XCTAssertFalse(AIFeatureAvailability.offline.canSend)
    }

    func testEntryPointsFollowTheServerAndTheSwitchOnly() {
        XCTAssertTrue(AIFeatureAvailability.showsEntryPoints(serverInfo: info("0.105.0"), config: ready))
        XCTAssertTrue(AIFeatureAvailability.showsEntryPoints(serverInfo: info("0.106.0"), config: TriliumAIConfig(aiEnabled: true, providers: [])))
        XCTAssertFalse(AIFeatureAvailability.showsEntryPoints(serverInfo: info("0.104.0"), config: ready))
        XCTAssertFalse(AIFeatureAvailability.showsEntryPoints(serverInfo: nil, config: ready))
        XCTAssertFalse(AIFeatureAvailability.showsEntryPoints(serverInfo: info("0.106.0"), config: nil))
        XCTAssertFalse(AIFeatureAvailability.showsEntryPoints(serverInfo: info("0.106.0"), config: TriliumAIConfig(aiEnabled: false, providers: ready.providers)))
    }
}
