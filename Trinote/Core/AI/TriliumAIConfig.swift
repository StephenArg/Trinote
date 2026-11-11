import Foundation

/// A provider the user set up in Trilium (Options → AI), without its API key.
struct LlmProviderSummary: Equatable, Sendable, Identifiable {
    let id: String
    /// The user's name for it ("My Ollama").
    let name: String
    /// Provider type: `anthropic`, `openai`, `google`, `deepseek`, `ollama`, `lmstudio`, `openai-compatible`, or an agent.
    let provider: String
    let hasApiKey: Bool
    let baseURL: String?
    /// The models picked for it, with their metadata, so no live listing is needed to chat.
    let selectedModels: [LlmModelInfo]

    init(id: String, name: String, provider: String, hasApiKey: Bool, baseURL: String? = nil, selectedModels: [LlmModelInfo] = []) {
        self.id = id
        self.name = name
        self.provider = provider
        self.hasApiKey = hasApiKey
        self.baseURL = baseURL
        self.selectedModels = selectedModels
    }

    /// The models tagged with this configuration, as desktop's `readSelectedModels` lists them.
    var taggedModels: [LlmModelInfo] {
        selectedModels.map { model in
            var tagged = model
            tagged.provider = provider
            tagged.providerId = id
            tagged.providerName = name
            return tagged
        }
    }
}

/// Trilium's AI options as this app keeps them: read from `GET /api/options`, held in memory only.
///
/// Deliberately not `Codable`: nothing may persist it. `llmProviders` carries API keys in plain text; they are
/// dropped while parsing (`hasApiKey` is all that remains) and never logged.
struct TriliumAIConfig: Equatable, Sendable {
    /// Trilium's master switch for its AI UI (the server doesn't enforce it).
    let aiEnabled: Bool
    let providers: [LlmProviderSummary]
    /// The text editor assistant's model (`aiAssistantModel`), when one was picked.
    let assistantModel: AIAssistantModel?
    /// Whether the server publishes its tools over MCP (per server, not synced).
    let mcpEnabled: Bool
    /// Which tool calls wait for the user in a chat that didn't choose (`llmPermissionMode`, Trilium 0.107+).
    let permissionMode: LlmPermissionMode?
    /// The search provider chats search the web through (`llmWebSearchProvider`, Trilium 0.107+). `nil` when that names
    /// none configured, which means the model's built-in search.
    let webSearchProviderId: String?
    /// Whether this server has that option at all, which is what makes it Trilium 0.107+ for web search's rules.
    let knowsSearchProviders: Bool

    init(
        aiEnabled: Bool, providers: [LlmProviderSummary], assistantModel: AIAssistantModel? = nil, mcpEnabled: Bool = false,
        permissionMode: LlmPermissionMode? = nil, webSearchProviderId: String? = nil, knowsSearchProviders: Bool = false
    ) {
        self.aiEnabled = aiEnabled
        self.providers = providers
        self.assistantModel = assistantModel
        self.mcpEnabled = mcpEnabled
        self.webSearchProviderId = webSearchProviderId
        self.knowsSearchProviders = knowsSearchProviders
        self.permissionMode = permissionMode
    }

    init(options: TriliumOptionsResponse) {
        let permissionMode = options["llmPermissionMode"]?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        self.init(
            aiEnabled: options["aiEnabled"] == "true",
            providers: Self.providers(fromOption: options["llmProviders"]),
            assistantModel: Self.assistantModel(fromOption: options["aiAssistantModel"]),
            mcpEnabled: options["mcpEnabled"] == "true",
            permissionMode: permissionMode.isEmpty ? nil : LlmPermissionMode(rawValue: permissionMode),
            webSearchProviderId: Self.webSearchProviderId(
                fromOption: options["llmWebSearchProvider"],
                providersOption: options["llmProviders"]
            ),
            knowsSearchProviders: options["llmWebSearchProvider"] != nil
        )
    }

    // MARK: Options

    /// What `llmProviders` stores (`LlmProviderSetup` in `packages/trilium-core/src/services/llm/index.ts`).
    /// Private so the key never leaves this parse.
    private struct ProviderSetup: Decodable {
        let id: String
        let name: String
        let provider: String
        let apiKey: String?
        let baseURL: String?
        let selectedModels: [LlmModelInfo]?
        /// `llm` (chat models; also when absent) or `search` (a web search provider, Trilium 0.107+).
        let kind: String?
    }

    /// The `llmWebSearchProvider` option, when it names a `search` provider that's still configured.
    static func webSearchProviderId(fromOption value: String?, providersOption json: String?) -> String? {
        let id = value?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        guard !id.isEmpty, let json, let data = json.data(using: .utf8),
              let rows = try? JSONDecoder().decode([JSONValue].self, from: data) else { return nil }
        let decoder = JSONDecoder()
        let encoder = JSONEncoder()
        let isConfigured = rows.contains { row in
            guard let rowData = try? encoder.encode(row), let setup = try? decoder.decode(ProviderSetup.self, from: rowData) else { return false }
            return setup.id == id && setup.kind == "search"
        }
        return isConfigured ? id : nil
    }

    /// The chat providers in the `llmProviders` option. A row that doesn't parse is skipped, as are web search
    /// providers; a value that isn't a JSON array (or is missing) gives none, as desktop's `getConfiguredProviders` does.
    static func providers(fromOption json: String?) -> [LlmProviderSummary] {
        guard let json, let data = json.data(using: .utf8),
              let rows = try? JSONDecoder().decode([JSONValue].self, from: data) else { return [] }
        let decoder = JSONDecoder()
        let encoder = JSONEncoder()
        return rows.compactMap { row -> LlmProviderSummary? in
            guard let rowData = try? encoder.encode(row), let setup = try? decoder.decode(ProviderSetup.self, from: rowData),
                  (setup.kind ?? "llm") == "llm" else {
                return nil
            }
            let baseURL = (setup.baseURL ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
            return LlmProviderSummary(
                id: setup.id,
                name: setup.name,
                provider: setup.provider,
                hasApiKey: !(setup.apiKey ?? "").isEmpty,
                baseURL: baseURL.isEmpty ? nil : baseURL,
                selectedModels: setup.selectedModels ?? []
            )
        }
    }

    /// The `aiAssistantModel` option: `{model, provider, providerId}` JSON, or `""` when nothing was picked.
    static func assistantModel(fromOption json: String?) -> AIAssistantModel? {
        guard let json, !json.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
              let data = json.data(using: .utf8),
              let stored = try? JSONDecoder().decode(AIAssistantModel.self, from: data),
              !stored.model.isEmpty else { return nil }
        return stored
    }

    /// The value `aiAssistantModel` takes for `model`, or `""` for none.
    static func assistantModelOptionValue(_ model: LlmModelInfo?) -> String {
        guard let model else { return "" }
        let stored = AIAssistantModel(model: model.id, provider: model.provider, providerId: model.providerId)
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys, .withoutEscapingSlashes]
        return String(decoding: (try? encoder.encode(stored)) ?? Data(), as: UTF8.self)
    }

    // MARK: Models

    var hasProviders: Bool { !providers.isEmpty }

    /// Every selected model across the providers, in configuration order, tagged with its provider.
    var availableModels: [LlmModelInfo] { providers.flatMap(\.taggedModels) }

    /// The first model marked default, else the first model (desktop's choice for a new chat).
    var defaultModel: LlmModelInfo? {
        let models = availableModels
        return models.first { $0.isDefault == true } ?? models.first
    }

    /// The offered model matching an id and, when given, its provider type and configuration id (desktop's
    /// `resolveSelectedModel`). `nil` when the saved model is no longer offered.
    func resolveModel(id: String, provider: String? = nil, providerId: String? = nil) -> LlmModelInfo? {
        guard !id.isEmpty else { return nil }
        let provider = provider.flatMap { $0.isEmpty ? nil : $0 }
        let providerId = providerId.flatMap { $0.isEmpty ? nil : $0 }
        return availableModels.first { model in
            model.id == id
                && (provider == nil || model.provider == provider)
                && (providerId == nil || model.providerId == providerId)
        }
    }

    /// The model the editor assistant would use: the stored one while it's still offered, else the default.
    var resolvedAssistantModel: LlmModelInfo? {
        if let stored = assistantModel, let model = resolveModel(id: stored.model, provider: stored.provider, providerId: stored.providerId) {
            return model
        }
        return defaultModel
    }
}
