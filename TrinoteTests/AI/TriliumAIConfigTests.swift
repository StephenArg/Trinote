import XCTest
@testable import Trinote

final class TriliumAIConfigTests: XCTestCase {

    /// `llmProviders` as Trilium stores it, API keys included.
    static let providersJSON = """
    [
      {"id": "anthropic_1700000000000", "name": "Anthropic", "provider": "anthropic", "apiKey": "sk-ant-secret",
       "selectedModels": [
         {"id": "claude-sonnet-4-5", "name": "Claude Sonnet 4.5", "pricing": {"input": 3, "output": 15}, "isDefault": true, "contextWindow": 200000},
         {"id": "claude-opus-4-1", "name": "Claude Opus 4.1", "pricing": {"input": 15, "output": 75}, "isLegacy": true}
       ]},
      {"id": "ollama_1700000000001", "name": "Home Ollama", "provider": "ollama", "apiKey": "", "baseURL": "http://nas:11434"},
      {"id": "openai_1700000000002", "name": "OpenAI", "provider": "openai", "apiKey": "sk-secret",
       "selectedModels": [{"id": "gpt-5", "name": "GPT-5", "reasoningEfforts": ["low", "medium", "high"], "defaultReasoningEffort": "medium"}]}
    ]
    """

    private func options(_ values: [String: String]) -> TriliumOptionsResponse {
        TriliumOptionsResponse(values: values)
    }

    func testParsesOptionsAndDropsApiKeys() throws {
        let config = TriliumAIConfig(options: options([
            "aiEnabled": "true",
            "llmProviders": Self.providersJSON,
            "aiAssistantModel": #"{"model":"gpt-5","provider":"openai","providerId":"openai_1700000000002"}"#,
            "mcpEnabled": "false",
            "protectedSessionTimeout": "600"
        ]))
        XCTAssertTrue(config.aiEnabled)
        XCTAssertFalse(config.mcpEnabled)
        XCTAssertEqual(config.providers.map(\.id), ["anthropic_1700000000000", "ollama_1700000000001", "openai_1700000000002"])
        XCTAssertEqual(config.providers.map(\.hasApiKey), [true, false, true])
        XCTAssertEqual(config.providers[1].baseURL, "http://nas:11434")
        XCTAssertNil(config.providers[0].baseURL)
        XCTAssertEqual(config.providers[1].selectedModels, [])
        XCTAssertEqual(config.assistantModel, AIAssistantModel(model: "gpt-5", provider: "openai", providerId: "openai_1700000000002"))
        // The key is nowhere in what's kept.
        let mirror = Mirror(reflecting: config.providers[0])
        XCTAssertFalse(mirror.children.contains { "\($0.value)".contains("sk-ant-secret") })
    }

    func testModelsAreTaggedWithTheirProvider() throws {
        let config = TriliumAIConfig(options: options(["llmProviders": Self.providersJSON]))
        let models = config.availableModels
        XCTAssertEqual(models.map(\.id), ["claude-sonnet-4-5", "claude-opus-4-1", "gpt-5"])
        XCTAssertEqual(models.map(\.provider), ["anthropic", "anthropic", "openai"])
        XCTAssertEqual(models.map(\.providerId), ["anthropic_1700000000000", "anthropic_1700000000000", "openai_1700000000002"])
        XCTAssertEqual(models.map(\.providerName), ["Anthropic", "Anthropic", "OpenAI"])
        XCTAssertEqual(models[0].pricing, LlmModelPricing(input: 3, output: 15))
        XCTAssertEqual(models[0].contextWindow, 200_000)
        XCTAssertEqual(models[2].reasoningEfforts, [.low, .medium, .high])
        XCTAssertTrue(models[2].hasReasoningLevels)
        XCTAssertFalse(models[0].hasReasoningLevels)
        XCTAssertEqual(config.defaultModel?.id, "claude-sonnet-4-5")
        XCTAssertTrue(config.hasProviders)
    }

    func testResolvingModels() {
        let config = TriliumAIConfig(options: options(["llmProviders": Self.providersJSON]))
        XCTAssertEqual(config.resolveModel(id: "gpt-5")?.providerId, "openai_1700000000002")
        XCTAssertEqual(config.resolveModel(id: "gpt-5", provider: "openai", providerId: "openai_1700000000002")?.name, "GPT-5")
        XCTAssertNil(config.resolveModel(id: "gpt-5", provider: "anthropic"))
        XCTAssertNil(config.resolveModel(id: "gpt-5", providerId: "openai_other"))
        XCTAssertNil(config.resolveModel(id: "gpt-4"))
        XCTAssertNil(config.resolveModel(id: ""))
        XCTAssertEqual(config.resolveModel(id: "claude-opus-4-1", provider: "", providerId: "")?.name, "Claude Opus 4.1")
        XCTAssertEqual(config.resolvedAssistantModel?.id, "claude-sonnet-4-5", "no stored choice: the default")
        let stored = TriliumAIConfig(options: options(["llmProviders": Self.providersJSON, "aiAssistantModel": #"{"model":"gpt-5"}"#]))
        XCTAssertEqual(stored.resolvedAssistantModel?.id, "gpt-5")
        let gone = TriliumAIConfig(options: options(["llmProviders": Self.providersJSON, "aiAssistantModel": #"{"model":"gpt-4"}"#]))
        XCTAssertEqual(gone.resolvedAssistantModel?.id, "claude-sonnet-4-5", "a deselected model falls back to the default")
    }

    func testMalformedOrEmptyOptions() {
        XCTAssertEqual(TriliumAIConfig(options: options([:])).providers, [])
        XCTAssertFalse(TriliumAIConfig(options: options([:])).aiEnabled)
        XCTAssertNil(TriliumAIConfig(options: options([:])).defaultModel)
        XCTAssertEqual(TriliumAIConfig.providers(fromOption: "not json"), [])
        XCTAssertEqual(TriliumAIConfig.providers(fromOption: "{}"), [])
        XCTAssertEqual(TriliumAIConfig.providers(fromOption: #"[{"id":"x"}, {"id":"ok","name":"OK","provider":"openai","apiKey":"k"}]"#).map(\.id), ["ok"])
        XCTAssertNil(TriliumAIConfig.assistantModel(fromOption: ""))
        XCTAssertNil(TriliumAIConfig.assistantModel(fromOption: nil))
        XCTAssertNil(TriliumAIConfig.assistantModel(fromOption: "{bad"))
        XCTAssertNil(TriliumAIConfig.assistantModel(fromOption: #"{"model":""}"#))
        XCTAssertEqual(TriliumAIConfig.assistantModelOptionValue(nil), "")
        XCTAssertEqual(
            TriliumAIConfig.assistantModelOptionValue(LlmModelInfo(id: "m", name: "M", provider: "openai", providerId: "p1")),
            #"{"model":"m","provider":"openai","providerId":"p1"}"#
        )
    }

    /// Trilium 0.107+: `llmPermissionMode`, and web search providers kept in `llmProviders` beside the chat ones.
    func testPermissionModeAndSearchProviders() {
        let config = TriliumAIConfig(options: options([
            "llmPermissionMode": "always_ask",
            "llmProviders": #"[{"id":"tavily_1","name":"Tavily","provider":"tavily","kind":"search","apiKey":"k"},{"id":"ok","name":"OK","provider":"openai","apiKey":"k","kind":"llm"},{"id":"old","name":"Old","provider":"anthropic","apiKey":"k"}]"#
        ]))
        XCTAssertEqual(config.permissionMode, .alwaysAsk)
        XCTAssertEqual(config.providers.map(\.id), ["ok", "old"], "search providers aren't chat providers")
        XCTAssertNil(TriliumAIConfig(options: options([:])).permissionMode)
        XCTAssertNil(TriliumAIConfig(options: options(["llmPermissionMode": " "])).permissionMode)
    }

    func testProviderTypeNamesFollowDesktop() {
        XCTAssertEqual(LlmProviderTypeNames.displayName("google"), "Google Gemini")
        XCTAssertEqual(LlmProviderTypeNames.displayName("claude-agent"), "Claude Code")
        XCTAssertEqual(LlmProviderTypeNames.displayName("openai-compatible"), "OpenAI-compatible")
        XCTAssertEqual(LlmProviderTypeNames.displayName("something-new"), "something-new")
    }

    func testServerGate() {
        func info(_ version: String) -> AppInfoResponse {
            AppInfoResponse(appVersion: version, dbVersion: 240, syncVersion: 39, buildDate: "", buildRevision: "", dataDirectory: nil, clipperProtocolVersion: nil, utcDateTime: nil)
        }
        XCTAssertFalse(TriliumServerCompatibility.supportsLlmChat(nil))
        XCTAssertFalse(TriliumServerCompatibility.supportsLlmChat(info("0.104.2")))
        XCTAssertTrue(TriliumServerCompatibility.supportsLlmChat(info("0.105.0")))
        XCTAssertTrue(TriliumServerCompatibility.supportsLlmChat(info("v0.106.0")))
    }
}
