import SwiftUI
import UIKit

/// Settings → AI: Trilium's own AI options, read from and written to the server (they live there, not in the app).
/// The "Lite" scope: the master switch, the writing assistant's model and the MCP switch; providers and their API
/// keys are listed read-only and managed in Trilium.
struct AISettingsSection: View {
    @Environment(AppState.self) private var appState
    @State private var isWriting = false
    @State private var errorMessage: String?
    /// The switch as just flipped, until the server confirms it.
    @State private var pendingAIEnabled: Bool?
    @State private var pendingMCPEnabled: Bool?

    private var config: TriliumAIConfig? { appState.aiConfig }

    private var serverSupportsAI: Bool { TriliumServerCompatibility.supportsLlmChat(appState.serverAppInfo) }

    private var canEdit: Bool { appState.isOnline && appState.client != nil && serverSupportsAI && config != nil && !isWriting }

    var body: some View {
        Section {
            if !serverSupportsAI {
                Text(String(
                    format: String(localized: "AI features need Trilium %@ or newer.", comment: "Settings → AI: the server is too old; %@ is the version"),
                    locale: .current,
                    TriliumServerCompatibility.llmChatMinAppVersion
                ))
                .foregroundStyle(.secondary)
            } else if config == nil {
                HStack {
                    Text(String(localized: "AI settings", comment: "Settings → AI: row while the options load"))
                    Spacer()
                    if appState.isOnline {
                        ProgressView()
                    } else {
                        Text(String(localized: "Offline", comment: "Network status")).foregroundStyle(.secondary)
                    }
                }
            } else {
                Toggle(String(localized: "Enable AI", comment: "Settings → AI: Trilium's master switch for its AI features"), isOn: aiEnabledBinding)
                    .disabled(!canEdit)

                if aiEnabledBinding.wrappedValue {
                    assistantModelPicker
                    Toggle(String(localized: "MCP server", comment: "Settings → AI: publish Trilium's tools to MCP clients"), isOn: mcpEnabledBinding)
                        .disabled(!canEdit)
                    if mcpEnabledBinding.wrappedValue, let endpoint = mcpEndpoint {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text(String(localized: "Endpoint", comment: "Settings → AI: the MCP server's address"))
                                Text(endpoint)
                                    .font(.footnote.monospaced())
                                    .foregroundStyle(.secondary)
                                    .textSelection(.enabled)
                            }
                            Spacer()
                            Button {
                                UIPasteboard.general.string = endpoint
                            } label: {
                                Image(systemName: "doc.on.doc")
                            }
                            .buttonStyle(.borderless)
                            .accessibilityLabel(String(localized: "Copy", comment: "Copy to clipboard"))
                        }
                    }
                    NavigationLink {
                        AIProvidersListView(providers: config?.providers ?? [])
                            .environment(appState)
                    } label: {
                        LabeledContent(
                            String(localized: "Providers", comment: "Settings → AI: the configured LLM providers"),
                            value: String(config?.providers.count ?? 0)
                        )
                    }
                }
            }
        } header: {
            Text(String(localized: "AI", comment: "Settings section: Trilium's AI features"))
        } footer: {
            // The footer carries the section's side effects: List draws a plain Section reliably, and a view
            // modifier on the Section itself would wrap it in a type List doesn't treat as a section.
            VStack(alignment: .leading, spacing: 8) {
                Text(String(
                    localized: "These settings live on your Trilium server (Options → AI). Providers and their API keys are managed there.",
                    comment: "Settings → AI footer"
                ))
                if serverSupportsAI, !appState.isOnline {
                    Text(String(localized: "Changing AI settings needs a connection.", comment: "Settings → AI footer: offline"))
                }
            }
            .task(id: appState.activeProfile?.id) {
                await appState.refreshAIConfig()
            }
            .alert(
                String(localized: "Couldn't change the setting.", comment: "Settings → AI: writing an option failed"),
                isPresented: Binding(get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } }),
                presenting: errorMessage
            ) { _ in
                Button(String(localized: "OK", comment: "Dismiss alert"), role: .cancel) {}
            } message: { message in
                Text(message)
            }
        }
    }

    // MARK: Rows

    private var aiEnabledBinding: Binding<Bool> {
        Binding(
            get: { pendingAIEnabled ?? config?.aiEnabled ?? false },
            set: { value in
                pendingAIEnabled = value
                write(["aiEnabled": value ? "true" : "false"]) { pendingAIEnabled = nil }
            }
        )
    }

    private var mcpEnabledBinding: Binding<Bool> {
        Binding(
            get: { pendingMCPEnabled ?? config?.mcpEnabled ?? false },
            set: { value in
                pendingMCPEnabled = value
                write(["mcpEnabled": value ? "true" : "false"]) { pendingMCPEnabled = nil }
            }
        )
    }

    /// The MCP endpoint, as desktop shows it: the server's base URL plus `/mcp`.
    private var mcpEndpoint: String? {
        guard let base = appState.activeProfile?.normalizedBaseURL, !base.isEmpty else { return nil }
        return base + "/mcp"
    }

    private var assistantModelPicker: some View {
        let models = config?.availableModels ?? []
        let stored = config?.assistantModel
        let storedKey = stored.flatMap { stored in
            models.first { $0.id == stored.model && (stored.providerId == nil || $0.providerId == stored.providerId) }
        }.map(Self.key) ?? ""
        return Picker(
            String(localized: "Writing assistant model", comment: "Settings → AI: the model the text editor's AI assistant uses"),
            selection: Binding(
                get: { storedKey },
                set: { key in
                    let model = models.first { Self.key($0) == key }
                    write(["aiAssistantModel": TriliumAIConfig.assistantModelOptionValue(model)]) {}
                }
            )
        ) {
            Text(defaultModelTitle(models)).tag("")
            ForEach(Array(models.enumerated()), id: \.offset) { _, model in
                VStack(alignment: .leading, spacing: 2) {
                    Text(model.name)
                    if let provider = model.providerName {
                        Text(provider).font(.caption).foregroundStyle(.secondary)
                    }
                }
                .tag(Self.key(model))
            }
        }
        .pickerStyle(.navigationLink)
        .disabled(!canEdit || models.isEmpty)
    }

    private static func key(_ model: LlmModelInfo) -> String {
        "\(model.providerId ?? "")|\(model.id)"
    }

    private func defaultModelTitle(_ models: [LlmModelInfo]) -> String {
        if let fallback = models.first(where: { $0.isDefault == true }) ?? models.first {
            return String(
                format: String(localized: "Default (%@)", comment: "AI chat reasoning effort: the model's own default; %@ is its name"),
                locale: .current,
                fallback.name
            )
        }
        return String(localized: "Default", comment: "AI chat reasoning effort: the model's own default")
    }

    private func write(_ values: [String: String], done: @escaping () -> Void) {
        isWriting = true
        Task {
            defer {
                isWriting = false
                done()
            }
            do {
                try await appState.updateAIOptions(values)
            } catch {
                errorMessage = APIError.from(error).localizedDescription
            }
        }
    }
}

/// The providers set up in Trilium, read-only: name, kind, how many models, whether a key is stored.
struct AIProvidersListView: View {
    let providers: [LlmProviderSummary]

    var body: some View {
        List {
            if providers.isEmpty {
                ContentUnavailableView {
                    Label(String(localized: "No Providers", comment: "Settings → AI → Providers: empty state"), systemImage: "sparkles")
                } description: {
                    Text(String(localized: "Add or edit providers in Trilium under Options → AI.", comment: "Settings → AI → Providers footer"))
                }
            } else {
                Section {
                    ForEach(providers) { provider in
                        VStack(alignment: .leading, spacing: 3) {
                            Text(provider.name)
                            Text(LlmProviderTypeNames.displayName(provider.provider))
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                            HStack(spacing: 10) {
                                Text(String(
                                    format: String(localized: "%lld models", comment: "Settings → AI → Providers: how many models are selected"),
                                    locale: .current,
                                    provider.selectedModels.count
                                ))
                                Text(provider.hasApiKey
                                     ? String(localized: "API key set", comment: "Settings → AI → Providers: a key is stored on the server")
                                     : String(localized: "No API key", comment: "Settings → AI → Providers: no key is stored"))
                            }
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            if let baseURL = provider.baseURL {
                                Text(baseURL)
                                    .font(.caption.monospaced())
                                    .foregroundStyle(.secondary)
                                    .lineLimit(1)
                                    .truncationMode(.middle)
                            }
                        }
                        .padding(.vertical, 2)
                    }
                } footer: {
                    Text(String(localized: "Add or edit providers in Trilium under Options → AI.", comment: "Settings → AI → Providers footer"))
                }
            }
        }
        .navigationTitle(String(localized: "Providers", comment: "Settings → AI: the configured LLM providers"))
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// Desktop's names for the provider types (`AddProviderModal.tsx`).
enum LlmProviderTypeNames {
    static func displayName(_ type: String) -> String {
        switch type {
        case "anthropic": return "Anthropic"
        case "openai": return "OpenAI"
        case "google": return "Google Gemini"
        case "deepseek": return "DeepSeek"
        case "claude-agent": return "Claude Code"
        case "copilot-agent": return "GitHub Copilot"
        case "antigravity-agent": return "Google Antigravity"
        case "codex-agent": return "Codex"
        case "ollama": return "Ollama"
        case "lmstudio": return "LM Studio"
        case "openai-compatible": return "OpenAI-compatible"
        default: return type
        }
    }
}
