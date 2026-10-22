import SwiftUI

/// A chat's settings, as desktop's reply bar offers them: the model, web search, the note tools, and how much the
/// model reasons. Saved with the chat.
struct ChatOptionsSheet: View {
    @Bindable var session: LlmChatSession
    /// The note the chat is about, when it was opened from one.
    var contextNoteTitle: String?

    @Environment(\.dismiss) private var dismiss

    /// One picker row per offered model; the same model id can come from two providers.
    private struct ModelChoice: Identifiable {
        let model: LlmModelInfo
        var id: String { "\(model.providerId ?? "")|\(model.id)" }
    }

    private var choices: [ModelChoice] { session.availableModels.map(ModelChoice.init) }

    private var groupedChoices: [(provider: String, choices: [ModelChoice])] {
        var order: [String] = []
        var groups: [String: [ModelChoice]] = [:]
        for choice in choices {
            let key = choice.model.providerName ?? choice.model.provider ?? ""
            if groups[key] == nil { order.append(key) }
            groups[key, default: []].append(choice)
        }
        return order.map { ($0, groups[$0] ?? []) }
    }

    private var selectedChoiceId: String {
        session.selectedModel.map { "\($0.providerId ?? "")|\($0.id)" } ?? ""
    }

    var body: some View {
        NavigationStack {
            Form {
                // The switches first: the status button under the message opens this sheet at half height.
                toolsSection
                if let model = session.selectedModel {
                    reasoningSection(for: model)
                }
                modelSection
                if session.contextNoteId != nil {
                    contextSection
                }
            }
            .navigationTitle(String(localized: "Chat Options", comment: "AI chat options sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(String(localized: "Done", comment: "Close sheet")) { dismiss() }
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private var modelSection: some View {
        Section {
            if choices.isEmpty {
                Text(String(localized: "No models are selected for your providers. Pick them in Trilium under Options → AI.", comment: "AI chat options: the providers list no models"))
                    .foregroundStyle(.secondary)
            } else {
                Picker(String(localized: "Model", comment: "AI chat options: model picker"), selection: Binding(
                    get: { selectedChoiceId },
                    set: { id in
                        if let choice = choices.first(where: { $0.id == id }) { session.setModel(choice.model) }
                    }
                )) {
                    if session.selectedModel == nil {
                        Text(String(localized: "No model selected", comment: "AI chat options: the chat's model is no longer offered")).tag("")
                    }
                    ForEach(groupedChoices, id: \.provider) { group in
                        Section(group.provider) {
                            ForEach(group.choices) { choice in
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(choice.model.name)
                                    if let cost = Self.costDescription(choice.model) {
                                        Text(cost).font(.caption).foregroundStyle(.secondary)
                                    }
                                }
                                .tag(choice.id)
                            }
                        }
                    }
                }
                .pickerStyle(.navigationLink)
            }
        } footer: {
            if session.selectedModel == nil, !choices.isEmpty {
                Text(String(localized: "The model this chat used is no longer offered. Pick another to continue.", comment: "AI chat options: footer when the saved model is gone"))
            }
        }
    }

    private var toolsSection: some View {
        Section {
            Toggle(isOn: $session.enableWebSearch) {
                described(ChatToolDescriptions.webSearchTitle, ChatToolDescriptions.webSearchDescription, systemImage: "globe")
            }
            .disabled(session.webSearchUnavailable)
            Toggle(isOn: $session.enableNoteTools) {
                described(ChatToolDescriptions.noteToolsTitle, ChatToolDescriptions.noteToolsDescription, systemImage: "doc.text.magnifyingglass")
            }
        } footer: {
            VStack(alignment: .leading, spacing: 6) {
                if session.webSearchUnavailable {
                    Text(String(localized: "Gemini can't use web search together with the note tools.", comment: "AI chat options: Google models can't combine the two tools"))
                }
            }
        }
    }

    @ViewBuilder
    private func reasoningSection(for model: LlmModelInfo) -> some View {
        if model.hasReasoningLevels {
            Section {
                Picker(selection: Binding(
                    get: { session.reasoningEffort?.rawValue ?? "" },
                    set: { session.reasoningEffort = $0.isEmpty ? nil : LlmReasoningEffort(rawValue: $0) }
                )) {
                    Text(Self.defaultEffortTitle(model)).tag("")
                    ForEach(model.reasoningEfforts ?? [], id: \.rawValue) { effort in
                        Text(Self.effortTitle(effort)).tag(effort.rawValue)
                    }
                } label: {
                    described(ChatToolDescriptions.effortTitle, ChatToolDescriptions.effortDescription, systemImage: "brain")
                }
            }
        } else {
            Section {
                Toggle(isOn: $session.enableExtendedThinking) {
                    described(ChatToolDescriptions.thinkingTitle, ChatToolDescriptions.thinkingDescription, systemImage: "brain")
                }
            }
        }
    }

    private var contextSection: some View {
        Section {
            HStack {
                Label(contextNoteTitle ?? session.contextNoteId ?? "", systemImage: "doc.text")
                    .lineLimit(1)
                Spacer()
                Button(String(localized: "Remove", comment: "AI chat options: stop using the note as context")) {
                    session.contextNoteId = nil
                }
                .buttonStyle(.borderless)
            }
        } header: {
            Text(String(localized: "Context note", comment: "AI chat options: the note the chat is about"))
        } footer: {
            Text(String(localized: "The model is told which note you're looking at.", comment: "AI chat options: what the context note does"))
        }
    }

    /// A switch's name with the icon the reply box shows for it, and what it does underneath.
    private func described(_ title: String, _ description: String, systemImage: String) -> some View {
        Label {
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                Text(description)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
        } icon: {
            Image(systemName: systemImage)
        }
    }

    // MARK: Labels

    static func costDescription(_ model: LlmModelInfo) -> String? {
        if let pricing = model.pricing {
            let formatter = NumberFormatter()
            formatter.numberStyle = .currency
            formatter.currencyCode = "USD"
            formatter.maximumFractionDigits = 2
            let input = formatter.string(from: NSNumber(value: pricing.input)) ?? "\(pricing.input)"
            let output = formatter.string(from: NSNumber(value: pricing.output)) ?? "\(pricing.output)"
            return String(
                format: String(localized: "%1$@ in · %2$@ out per 1M tokens", comment: "AI chat options: a model's price; %1$@ input and %2$@ output cost"),
                locale: .current,
                input,
                output
            )
        }
        if model.isSubscription == true {
            return String(localized: "Subscription", comment: "AI chat options: a model covered by a subscription")
        }
        return nil
    }

    static func effortTitle(_ effort: LlmReasoningEffort) -> String {
        switch effort {
        case .disabled: return String(localized: "None", comment: "AI chat reasoning effort")
        case .minimal: return String(localized: "Minimal", comment: "AI chat reasoning effort")
        case .low: return String(localized: "Low", comment: "AI chat reasoning effort")
        case .medium: return String(localized: "Medium", comment: "AI chat reasoning effort")
        case .high: return String(localized: "High", comment: "AI chat reasoning effort")
        case .xhigh: return String(localized: "Extra high", comment: "AI chat reasoning effort")
        case .max: return String(localized: "Max", comment: "AI chat reasoning effort")
        default: return effort.rawValue
        }
    }

    static func defaultEffortTitle(_ model: LlmModelInfo) -> String {
        if let effort = model.defaultReasoningEffort {
            return String(
                format: String(localized: "Default (%@)", comment: "AI chat reasoning effort: the model's own default; %@ is its name"),
                locale: .current,
                effortTitle(effort)
            )
        }
        return String(localized: "Default", comment: "AI chat reasoning effort: the model's own default")
    }
}
